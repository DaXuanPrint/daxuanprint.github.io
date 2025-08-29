var html='<span class="btn icon-home3"></span><span class="btn icon-question"></span><span class="btn icon-pencil"></span><span class="btn icon-floppy-disk"></span><span class="btn icon-display"></span><span class="btn icon-amazon"></span><span class="btn icon-eye"></span><input type="color" id="bcolor" value="#FAF9DE"/><input type="color" id="tcolor" value="#6E7A6C"/><select id="gbgsd" style="overflow:hidden;width:36px;"><option value="lighter">细</option><option value="normal" selected="selected">中</option><option value="bold">粗</option></select><input type="checkbox" id="gbgs"checked="checked">光标跟随<hr/><button onClick="expand_all()">展开</button><button onClick="collapse_all()">收缩</button><select id="screenAlign" style="overflow:hidden;width:48px;"><option value="2">纵右</option><option value="-2">纵左</option><option value="1" selected="selected">横排</option></select><input type="checkbox" id="autoPage">自动滚屏 速度<input id="autoPageVal" type="text" value="0" size="1"/>时间<input id="autoPageTVal" type="text" value="40000" size="2"/><hr/>';
ByID("stck0").innerHTML=html;
var scrtime=null;
var capsIdx=0;
var lock=0;
var RWH=getTWH(window.parent);
window.onload = function() {
	try{
	    if(localStorage.readSetCaps){
	        caps=JSON.parse(localStorage.readSetCaps);
	        if(caps[caps.length-1].name=="##")caps.pop();
	        if(caps.length>100)caps.pop();
	        caps.push(readSet());
	    }
	}catch(e){}
	ByCLS(".nav__icon").onclick = function (e) {
		ByCLS(".iphone__screen").classList.toggle('nav--active');
	}
	ByCLS(".icon-point-up").onmousedown = function (e) {
		if(this.innerHTML=="向下滚动"){
			if(scrtime)clearInterval(scrtime);
			scrtime=self.setInterval(function clock(){
				bkdiv.scrollTop+=5;	
			},50)
		}		
		else
		stdiv.scrollTop=0;
	}
	ByCLS(".icon-display").onmouseup = function (e) {
		location.href="/index_pc.html";
	}
    ByCLS(".icon-amazon").onmouseup = function (e) {
		var userInput = prompt("请输入文字大小数值",getStyle(bkdiv,"fontSize",1));
		bkdiv.style.fontSize=userInput+"px";
		ByCLS(".iphone__screen").classList.toggle('nav--active');
	}
	gbgsd.onchange=function (e) {
		bkdiv.style.fontWeight=this.value;
		ByCLS(".iphone__screen").classList.toggle('nav--active');
	}
	ByCLS(".icon-point-up").onmouseup = function (e) {
		if(scrtime)scrtime=clearInterval(scrtime);
	}
	ByCLS(".icon-question").onclick = function (e) {
		stck1.style.display=stck1.style.display=="none"?"block":"none";
	}
	ByCLS(".icon-eye").onclick = function (e) {
	    var arr=["#FAF9DE,#6E7A6C","#ffffff,#333333","#99FF66,#0000FF","#CCE8CF,#000000","#6E7B6C,#C7EDCC","#E9EBFE,#068043","#FFF2E2,#6BC235"];
		var idx=this.getAttribute('idx')?parseInt(this.getAttribute('idx')):0;
		if(idx>(arr.length-1))idx=0;
		var sty=arr[idx].split(",");
		bcolor.value=sty[0];
		tcolor.value=sty[1];
		setStyle(bkdiv,{backgroundColor:bcolor.value,color:tcolor.value});
		this.setAttribute('idx',++idx);
	}
	bcolor.onchange=tcolor.onchange=function (e) {
	   		setStyle(bkdiv,{backgroundColor:bcolor.value,color:tcolor.value});
	}
	ByCLS(".icon-pencil").onclick = function (e) {
		window.win = window.open("/book/book.html", "_blank");
	}
	ByCLS(".icon-floppy-disk").onclick = function (e) {
		down(bkname.innerHTML+".txt", localStorage.cxval)
	}
	ByCLS(".icon-home3").onclick = function (e) {
		location.href="/";
	}
	var book_name=getUVAL("name")?getUVAL("name")[1]:"三国演义";
	var book_type=getUVAL("type")?getUVAL("type")[1]:"文学艺术";
	var turl=_host.txt+"0&b=0&e=0&t=" +book_name+ "&p=" +book_type;
	var txtcon=function (txt) {	
		txt=txt.replace(/\[book_dec\][^\n]*\n/,"");
		txt=txt.replace(/\[book_img\][^\n]*\n/,"");
		txt=txt.replace(/\[book_name\][^\n]*\n/,"");
		txt=txt.replace(/\[book_author\][^\n]*\n/,"");
		txt=txt.replace(/\[book_date\][^\n]*\n/,"");
		txt=txt.replace(/\[book_copyright\][^\n]*\n/,"");
		txt=txt.replace(/\[book_type\][^\n]*\n/,"");
		txt=txt.replace(/\[book_length\][^\n]*\n/,"");
		txt=txt.replace(/\[config\]([\W\w]+)\[config\]\n*/,"\n");
		return txt;
	}
	var sxtcon=function (txt) {	
		var mat=txt.match(/\[book_name\]([^\n]+)/);
		bkname.innerHTML=mat?mat[1]:"";
		if(!bkname.innerHTML){
			mat=txt.match(/ptname@([^\n\/]+)/);
			bkname.innerHTML=mat?mat[1]:"无书名";
		}
		mat=txt.match(/\[book_author\]([^\n]+)/);
		bkauthor.innerHTML=mat?mat[1]:"";
		if(!bkauthor.innerHTML){
			mat=txt.match(/ptauthor@([^\n\/]+)/);
			bkauthor.innerHTML=mat?mat[1].split("=").length>1?mat[1].split("=")[1]:"佚名":"佚名";
		}
		if(/\d/.test(bkauthor.innerHTML))bkauthor.innerHTML="佚名";
		if(bkauthor.innerHTML[bkauthor.innerHTML.length-1]!=="㊣")bkauthor.innerHTML+="㊣";
		set_doc_title(bkname.innerHTML+" - "+bkauthor.innerHTML);
		mat=txt.match(/\[book_date\]([^\n]+)/);		
		bkdate.innerHTML=mat?mat[1]:"";
		if(!bkdate.innerHTML){
			mat=txt.match(/ptauthor@([^\n\/]+)/);
			bkdate.innerHTML=mat?mat[1].split("=")[0]:"未知";		
		}
		mat=txt.match(/\[book_copyright\]([^\n]+)/);
		bkcopyright.innerHTML=mat?mat[1]:"";
		if(!bkcopyright.innerHTML){
			mat=txt.match(/ptcopyright@([^\n\/]+)/);
			bkcopyright.innerHTML=mat?mat[1]:"玄之又玄 謂之大玄=學海無涯君是岸=書山絕頂吾为峰=大玄古籍書店獨家出版";
		}
		mat=txt.match(/\[book_type\]([^\n]+)/);
		bktype.innerHTML=mat?mat[1]:"未分类";
		mat=txt.match(/\[book_img\]([^\n]+)/);
		bkimg.innerHTML=mat?mat[1]:"null";
		mat=txt.match(/\[book_dec\]([^\n]+)/);
		bkdec.innerHTML=mat?mat[1]:"null";
		mat=txt.match(/\[book_length\]([^\n]+)/);
		bknum.innerHTML=mat?mat[1]:"";
		if(bkimg.innerHTML.indexOf('.')>0){
			//var ty=_Tconst.getBookType(book_type);
			//bkimgdv.src=_host.txt+"0&b=0&e=0&t=" +bkimg.innerHTML+ "&p="+ty;
		}
	}
	var txtrep=function (txt) {	
		if(lock==1)return;
		lock=1;
		txt=txt.replace(/\r/g,"");
		sxtcon(txt.slice(0,1500));
		txt=txtcon(txt);			
		var bk_i=[0,0,0,0];
		var bk_node=[null,null,null,null];			
		bk_node[0] = tree.createNode(bkname.innerHTML,false,'/images/star.png',null,null,'context1');
	    txt=txt.replace(/\[book_(chapter|title|node|point)\]([^\r\n]+)/g,
		function (a,b,c){
				switch (b) {
				case "chapter":
					bk_i[0]++;
					bk_node[1]=bk_node[0].createChildNode(a.replace("[book_chapter]",""), false, '/images/magic_ball.png',"setidx('cbk"+bk_i[0]+"',e)",'context1');	
					return '<span id="cbk'+bk_i[0]+'">✪</span>'+c;
					break;
				case "title":
					bk_i[1]++;
					bk_node[2]=bk_node[0].createChildNode(a.replace("[book_title]",""), false, '/images/blue_key.png',"setidx('tbk"+bk_i[1]+"',e)",'context1');	
					return '<span id="tbk'+bk_i[1]+'">■</span>'+c;
					break;
				case "node":
					bk_i[2]++;
					bk_node[3]=bk_node[2].createChildNode(a.replace("[book_node]",""), false, '/images/tree.png',"setidx('nbk"+bk_i[2]+"',e)",'context1');	
					return '<span id="nbk'+bk_i[2]+'">❖</span>'+c;
					break;
				case "point":
					bk_i[3]++;
					bk_node[4]=bk_node[3].createChildNode(a.replace("[book_point]",""), false, '/images/leaf.png',"setidx('pbk"+bk_i[3]+"',e)",'context1');
					return '<span id="pbk'+bk_i[3]+'">▲</span>'+c;
					break;
				default:
					return a;
					break;
				}
			})
		txt='<a href="https://daxuanguji.github.io/"><div style="text-decoration:underline;color:#00f;width:100%;height:44px;line-height:44px;text-align:center;">大玄古籍制作工具 >> 生成自己的独特专属古籍</div></a>'+txt;

        bkdiv.innerHTML=txt.replace(/\n(.)/g,function (a,b){
			b=b=="<"?b:"&emsp;"+b;
			return '<br/><hr/>'+b;
		})
		readGet();
		tree.drawTree();
		lock=0;	
	}
	bkdiv.oncontextmenu = function (e) {return false;};
	document.onselectionchange = function (e) {
	    var txs=window.getSelection()||document.selection.createRange().text.toString();
	    if(!txs||!/[\da-z\u3400-\uFAD9]/i.test(txs))return;
	   if(ByID("keyword")){
	       ByID("keyword").value=txs;
	   }
	};
	var contex_menu = {};
	tree = createTree('div_tree','white',contex_menu);
	tree.nodeBeforeOpenEvent = function(node) {stck1.style.display="none";}
	tree.nodeAfterOpenEvent = function(node) {}
	tree.nodeBeforeCloseEvent = function(node) {}
	var geturl=function(url,fun,type,prog) {
		fun(bkdiv.textContent);
	}
geturl(turl,function (txt) {
	txt+="\n\n";	
	if("undefined"!==typeof node1 )node1.removeNode();
	txtrep(txt.replace(/<\s*([\d+a-zA-Z]+)[^>]+>/g,function (a,b){
		a=a.replace(/\s[a-zA-Z\d+-_]+\s*=\s*(['"][\u3400-\uFAD9])/g,'title=$1')
		return a+"⚠</"+b+">";
	}));
    double_click(bkdiv,function(k){
        if(k){
            if(ByCLS(".nav__trigger").style.display=ByCLS(".toolbar").style.display=="none"){
    			ByCLS(".nav__trigger").style.display=ByCLS(".toolbar").style.display="block";
    			if(RWH.footer.Obj&&getStyle(RWH.footer.Obj,"opacity")=="0"){
    			    var t=RWH.wind.H-RWH.footer.H;
    				setStyle(RWH.frame.Obj,{height:t+"px"});
    				setStyle(RWH.footer.Obj,{opacity:1});
    				if(/2/.test(screenAlign.value)){
    				    setStyle(bkdiv,{height:(getStyle(bkdiv,"height",1)-RWH.footer.H)+"px"});
    				}
    			}
    		}
    		else{
    			ByCLS(".nav__trigger").style.display=ByCLS(".toolbar").style.display="none";
    			if(RWH.footer.Obj&&getStyle(RWH.footer.Obj,"opacity")!=="0"){
    			    var t=RWH.frame.H+RWH.footer.H;
    				setStyle(RWH.frame.Obj,{height:t+"px"});
    				setStyle(RWH.footer.Obj,{opacity:0});
    				if(/2/.test(screenAlign.value)){
    				    setStyle(bkdiv,{height:(getStyle(bkdiv,"height",1)+RWH.footer.H)+"px"});
    				}
    			}
    		}
        }
        else{
            if(ByID("vprc"))return;
			if(!bkdiv.hasAttribute("ck"))return;
			var ckXY=JSON.parse(bkdiv.getAttribute('ck'));
			var Wdf = bkdiv.offsetWidth+2;
			var Hdf = bkdiv.offsetHeight+2;
			var line=getStyle(bkdiv,"fontSize",1)+2;//font-weight: bold
			var s=line/2;
			var m=function(n,tm){
			     if(n){
			         if(tm)clearTimeout(tm);
			         setTimeout(function(){ByID("prodiv").style.opacity=0;},2000);
			     }
			     else ByID("prodiv").style.opacity=1;			 }
            m();
            if(/2/.test(screenAlign.value)){ 
        		var c=Wdf/3;
        		var t=Wdf;	
        		var g=function(k){var tm=setTimeout(function(){
        		    bkdiv.scrollLeft+=k*s;
        		   // console.log([t,bkdiv.scrollLeft, bkdiv.scrollWidth,bkdiv.scrollWidth-Wdf]);
        		    if(k>0){if(bkdiv.scrollLeft<t)g(k);else m(1,tm);}
        		    if(k<0){if(bkdiv.scrollLeft>t)g(k);else m(1,tm);}
        		 
        		},10)}

                if (ckXY[0]>(c*2)&&ckXY[1]>(Hdf/2)) {
                    if(screenAlign.value=="2"){
            			 t=bkdiv.scrollLeft+(t-(1*line));
            			 t=Math.min(t,0);
    			    	 g(1);
                    }
                    else{
                         t=bkdiv.scrollLeft+(t-(1*line));
            		        t=Math.min(t,(bkdiv.scrollWidth-Wdf));
    			    	 g(1);

                    }
        		} 
        		else if (ckXY[0]<c&&ckXY[1]>(Hdf/2)) {
					
        		  if(screenAlign.value=="2"){

                    t=bkdiv.scrollLeft-(t-(1*line));
        			t=Math.max(t,-(bkdiv.scrollWidth-Wdf));
			    	g(-1);
        		  }
        		  else{
        		          t=bkdiv.scrollLeft-(t-(1*line));
                         t=Math.max(t,0);

    			    	g(-1);
        		  }
                }

            }
			else{
        		var c=Hdf/2;
				var t=Hdf;
			   if(ByID("vprc"))t-RWH.header.H;
	               var p=bkdiv.scrollTop;
			    var g=function(k){
					var tm=setTimeout(function(){
					bkdiv.scrollTop+=k*s;
					if(k>0){if(bkdiv.scrollTop<t)g(k);else m(1,tm);}
					if(k<0){if(bkdiv.scrollTop>t)g(k);else m(1,tm);}				
				},10)}

			   
			    if (ckXY[1]>c) {
			         t=bkdiv.scrollTop+(t-(2*line));
			         t=Math.min(t,bkdiv.scrollHeight-Hdf);
			    	 g(1);
        		} 
        		else{
                    t=bkdiv.scrollTop-(t-(2*line));
                    t=Math.max(t,0);
			    	g(-1);
                }
			}
        }
	});
	long_press(bkdiv,function(){ 
	        if(!bkdiv.hasAttribute("ck"))return;
			var ckXY=JSON.parse(bkdiv.getAttribute('ck'));
			var c=bkdiv.offsetHeight/3;
			if (ckXY[1]>c)return;
    	    var obj={
    	        idx:0,
    	        node:null
    	    };
    	    if(ByID("vprc")){
    	        ByCLS(".btn-left").onclick();
    	    }
            else{
                var t=RWH.wind.H-RWH.footer.H;
    			setStyle(RWH.frame.Obj,{height:t+"px"});
    			setStyle(RWH.footer.Obj,{opacity:1});
	            var gtc = document.createElement('div');
    	        gtc.style="cursor: default; position: fixed; top: 0px; left: 2px;height:44px;z-index: 2147483647;"
    			gtc.id = "vprc";
    			gtc.className="header";
    			gtc.innerHTML='<a class="btn-left">❎0/0</a> <input id="keyword" type="text" style="width:50%" placeholder="请输入搜索关键词" value=""/><span class="btn-right"><span id="s_so">🔍&nbsp;&nbsp; </span> &nbsp;&nbsp;<span id="s_pre"> &nbsp;&nbsp;⏪&nbsp;&nbsp; </span> <span id="s_next"> &nbsp;&nbsp;⏩&nbsp;&nbsp; </span></span>';
    			document.body.appendChild(gtc);
    			try{if(localStorage.cxkeyword)ByID("keyword").value=localStorage.cxkeyword;}catch(e){}
    			var WH=getTWH(window);
    	        ByID("s_so").onclick=function (e) {
    	            ByCLS(".btn-left").innerHTML="0/0";
    	            bkdiv.innerHTML=bkdiv.innerHTML.replace(/<[\s\/]*i\s*>/g,'');
    	            var reg=new RegExp(ByID("keyword").value,"g");
    				bkdiv.innerHTML=bkdiv.innerHTML.replace(reg,"<i>"+ByID("keyword").value+"</i>");
    				obj.node=bkdiv.getElementsByTagName("i");
    				if(obj.node&&obj.node.length){
    					ByCLS(".btn-left").innerHTML=(obj.idx+1)+"/"+obj.node.length;
                        if(/2/.test(screenAlign.value)){ 
    					    bkdiv.scrollLeft=obj.node[obj.idx].offsetLeft-WH.header.H;
    					}
    					else{
    					    bkdiv.scrollTop=obj.node[obj.idx].offsetTop-WH.header.H;	
    					}
						try{localStorage.cxkeyword =ByID("keyword").value;}catch(e){}
    				}
    			}
                ByID("s_pre").onclick=ByID("s_next").onclick=function (e) {
    				if(obj.node&&obj.node.length){
    					obj.idx=this.id=="s_pre"?Math.max(0,--obj.idx):Math.min(obj.node.length-1,++obj.idx);
    					ByCLS(".btn-left").innerHTML=(obj.idx+1)+"/"+obj.node.length;
    					if(/2/.test(screenAlign.value)){ 
    					    bkdiv.scrollLeft=obj.node[obj.idx].offsetLeft-WH.header.H;
    					}
    					else{
    					    bkdiv.scrollTop=obj.node[obj.idx].offsetTop-WH.header.H;	
    					}
    				}
    	        }
    	        if(/2/.test(screenAlign.value)){
    			    var line=getStyle(bkdiv,"fontSize",1)+2;//font-weight: bold
    	           setStyle(bkdiv,{paddingTop:WH.header.H+"px",height:(RWH.frame.H-WH.header.H-line)+"px"});
    			}
    	         ByCLS(".btn-left").onclick = function (e) {
    	           document.body.removeChild(ByID("vprc"));
    	           if(/2/.test(screenAlign.value)){
    	               setStyle(bkdiv,{paddingTop:"0px",height:(RWH.doc.H-RWH.footer.H)+"px"});
    	           }
    	         }
            }
	});
	setTimeout(function () {stck1.style.display="none";expand_all();},3000);
	try{localStorage.cxval =txt;}catch(e){}
},'text',function (e) {	
	pr[0].value=Math.floor(e.loaded/e.total*100);
	pr[1].innerHTML="进度"+pr[0].value+"/100"+"<hr>"+(e.total/1024/1024).toFixed(2).fontcolor("Red")+"[M]";
	if(pr[0].value=="100")progress(pr);
})
window.onbeforeunload=function (e) {
    if(RWH.footer.Obj&&getStyle(RWH.footer.Obj,"opacity")=="0"){
		setStyle(RWH.frame.Obj,{height:(RWH.frame.H-RWH.footer.H)+"px"});
		setStyle(RWH.footer.Obj,{opacity:1});
	}
}
window.onmessage=function (e) {	
	if(e.data[0]=="$"){
			txtrep(localStorage.cxval);
			setTimeout(function () {stck1.style.display="none";expand_all();},3000);
		}
}
};
function expand_all() {tree.expandTree();}
function collapse_all() {tree.collapseTree();}
function readSet(){
    var readObj={
    	name:bkname.innerHTML+"#"+bkauthor.innerHTML+"#"+bknum.innerHTML,
    	checks:[gbgs.checked,autoPage.checked,],
    	font:[bcolor.value,tcolor.value,gbgsd.value,bkdiv.style.fontSize],
    	leftTop:[screenAlign.value,bkdiv.scrollLeft,bkdiv.scrollTop]
    };
    return readObj;
}
screenAlign.onchange=function (e) {
    caps[capsIdx]=readSet();
	try{localStorage.readSetCaps=JSON.stringify(caps)}catch(e){}
	//setTimeout(function () {re_url(1);},1500)
	ByCLS(".iphone__screen").classList.toggle('nav--active');
	readGet();
}
function readGet(){
	var so=false;
	for(var i=0;i<caps.length;i++){
	    if(caps[i].name==bkname.innerHTML+"#"+bkauthor.innerHTML+"#"+bknum.innerHTML){
	    	capsIdx=i;so=true;break;
	   	}
	}
	if(!so){caps.unshift(readSet());capsIdx=0;}
	gbgs.checked=caps[capsIdx].checks[0];
	autoPage.checked=caps[capsIdx].checks[1];
	screenAlign.value=caps[capsIdx].leftTop[0];
	bcolor.value=caps[capsIdx].font[0];
	tcolor.value=caps[capsIdx].font[1];
	gbgsd.value=caps[capsIdx].font[2];
	setStyle(bkdiv,{backgroundColor:bcolor.value,color:tcolor.value,fontWeight:gbgsd.value,fontSize:caps[capsIdx].font[3]});
	bkdiv.classList.remove('vertical-text2');
	bkdiv.classList.remove('vertical-text-2');
    if(ByID("prodiv"))document.body.removeChild(ByID("prodiv"));
	var line=getStyle(bkdiv,"fontSize",1)+2;//font-weight: bold
    var tg = document.createElement('div');
    tg.id="prodiv";
     setStyle(tg,{
            position:"fixed",
	        opacity:0,
	        transition:"opacity 1s ease-in-out",
			backgroundColor:"rgba(255,0,0,0.2)",
			top:0,
			zIndex:1050,								
			pointerEvents:'none'
		});
	if(/2/.test(screenAlign.value)){

	    setStyle(bkdiv,{overflowY:"hidden",overflowX:"auto",height:(RWH.doc.H-RWH.footer.H)+"px"});
	    bkdiv.classList.add('vertical-text'+screenAlign.value);
	    bkdiv.scrollLeft=caps[capsIdx].leftTop[1];
	    setStyle(tg,{
          width: line+"px",
          height:"100%"
		});
	    if(screenAlign.value=="2")tg.style.right=0;	
	    else tg.style.left=0;
	}
	else{
	    setStyle(bkdiv,{overflowX:"hidden",overflowY:"auto",height:"100%"});
	    bkdiv.scrollTop=caps[capsIdx].leftTop[2];
	    setStyle(tg,{
	      top:0,
          height: line+"px",
          width:"100%"
		});
	}
	document.body.appendChild(tg);
	ByCLS(".nav__trigger").style.display=ByCLS(".toolbar").style.display="none";
}
var caps=[readSet()];
function setidx(id,e) {
	if(!e)return;
	var obj=ByID(id);
	var rtop =obj.offsetTop;
	var rleft =obj.offsetLeft;
	if(bkdiv.offsetHeight-e.clientY<15)gbgs.checked=false;									
	if(/2/.test(screenAlign.value))bkdiv.scrollLeft =gbgs.checked?rleft-e.clientX:rleft-parseInt(bkhet.clientWidth-obj.offsetWidth);
	else bkdiv.scrollTop =gbgs.checked?rtop-(e.clientY):rtop;
	if(ByID("ndiv"))document.body.removeChild(ByID("ndiv"));
		var tg = document.createElement('div');
		var lfpx=0;	
		if(/2/.test(screenAlign.value)){if(gbgs.checked){if(rleft>0){if(screenAlign.value=="2"){lfpx=rleft+"px";}else{if(rleft<bkhet.clientWidth){lfpx=rleft+"px";}else{lfpx=e.clientX+"px";}}}else{lfpx=e.clientX+"px";}}else{if(rleft>bkhet.clientWidth||screenAlign.value=="2"){lfpx=parseInt(bkhet.clientWidth-obj.offsetWidth)+"px";}else{lfpx=rleft+"px";}}}else{lfpx=bkhet.style.left;}
		setStyle(tg,{position:"absolute",
			backgroundColor:"rgba(255,0,0,0.3)",
			left:lfpx,
		    top:/2/.test(screenAlign.value)?bkhet.style.top:!gbgs.checked?2+"px":bkdiv.scrollTop?(e.clientY+2)+"px":(rtop+2)+"px",
			width:/2/.test(screenAlign.value)?obj.offsetWidth+"px":bkhet.style.width,
			height:/2/.test(screenAlign.value)?bkhet.style.height:obj.offsetHeight+"px",
		    zIndex:10012,								
			transition:"all 0.2s",
			pointerEvents:'none'
		})	
		if(bkdiv.scrollTop==bkdiv.scrollHeight-bkdiv.offsetHeight){
			tg.style.top =(rtop-bkdiv.scrollTop+2)+"px";
		}
		tg.id="ndiv";			
		document.body.appendChild(tg);
		ByCLS(".iphone__screen").classList.remove('nav--active');	
		ByCLS(".nav__trigger").style.display=ByCLS(".toolbar").style.display="none";
}
bkdiv.onscroll=bkdiv.onwheel=function (e) {
	caps[capsIdx]=readSet();
	try{localStorage.readSetCaps=JSON.stringify(caps)}catch(e){}
	if(ByID("ndiv")){
		setTimeout(function () {
			if(ByID("ndiv"))document.body.removeChild(ByID("ndiv"));
		},2000)
	}
}
autoPageVal.onchange=autoPageTVal.onchange=autoPage.onchange=function (e) {
	var g=function(i){setTimeout(function (){
		var c=parseInt(autoPageVal.value);
		if(!c){var px=parseInt(bkdiv.style.fontSize.replace(/[^0-9]+/g,""));c=bkdiv.offsetHeight-(2*px);}
		bkdiv.scrollTop+=c;
		if(autoPage.checked)g();},parseInt(autoPageTVal.value))}
	if(autoPage.checked){
		ByCLS(".iphone__screen").classList.toggle('nav--active');g();
	}	
}