// JavaScript Document
var _host={
	img:"/php/getimg.php?guid=null&lnk=",
	txt:"/php/gettxt.php?guid=null&lnk=",
	timg:"/php/gettxt_img.php?guid=null&lnk=",
	info:"/php/getinfo.php?guid=null&lnk=",
	vimg:"/php/getvideo_img.php?guid=null&lnk=",
	book:"/php/getbook.php?guid=null&lnk=",
	music:"/php/getmusic.php?guid=null&lnk=",
	soft:"/php/getsoft.php?guid=null&lnk=",
	vfile:"/php/get_file.php?guid=null&lnk=",
	imjson:"/php/getimage_json.php?guid=null&lnk=",
	uptxt:"/php/updata_txt.php?guid=null&lnk=",
	upimg:"/php/updata_img.php?guid=null&lnk=",
	upvid:"/php/updata_vid.php?guid=null&lnk=",
	upfile:"/php/updata_file.php?guid=null&lnk=",
	cash:"/php/cash_val.php?guid=null&lnk=",
	setconf:"/php/conf_set.php?guid=null&lnk=",
	useLogin:"/php/use_login.php?guid=null&lnk=",
	useMsg:"/php/use_msg.php?guid=null&lnk=",
};
var _Tconst={
	book_all_type:',般若佛学=A,笔趣阁=B,筆趣閣=B,中医世家=C,恩赐小说=C,国学文摘=D,汉程文学=E,乐魔小说=F,内肉小说=G,人妻小说=H,人文小说=I,啃书小说=J,松鹏小说=K,中华典藏=Z,',
	getBookType:function(name) {
		var sy=name.split('♯');
		var ty=this.book_all_type.match(new RegExp(sy[0]+"=([A-Z]+)",""))[1];
		return sy[0]+"♯_img_"+ty;	
	}
}
function ByID(id) {
	return document.getElementById(id);
}
function ByCLS(cls) {
	return document.querySelector(cls);
}
function ByACLS(cls) {
	return document.querySelectorAll(cls);
}
function trim(str) {	
	return str.replace(/^\s+|\s+$/g,"");
}
function getUVAL(key,url) {
	var u=url?url:location.search;
	var r=decodeURIComponent(u)
	var reg=new RegExp(key+"=([^&=]+)","im");
	var v=r.match(reg);
	return v;
}
function getcook(key){
    if(!key)return '';
	var reg=new RegExp(key+"=([^;]+)","m");
	var v=document.cookie.match(reg);
	if(!v)return '';
	return v[1];
}
function hasName(obj,name){
    return obj.hasOwnProperty(name);
}

function gtime(flg,second) {
	var a = second?new Date(second):new Date;
	var b = a.getFullYear() + '-0' + (a.getMonth() + 1) + '-0' + a.getDate();
	b = b.replace(/-0(\d{2,})/g, "-$1");
	if(flg)return b;
	b+=':0' + a.getHours() + ':0' + a.getMinutes() + ':0' + a.getSeconds();
	b=b.replace(/:0(\d{2,})/g, ":$1");
	b=b.replace(/:/, ' ');
	return b;
}

var randArr = function (arr) {
	if(!arr.length)return "null";
	if(arr.length==1)return 0;
	if(!arr[arr.length-1])arr.pop();
	var v=arr.length;
	return arr[(v*Math.random()>>0)%v];
}
function re_url(flg,url) {
	if(!flg)window.location.reload();
	if(flg<0) window.history.go(flg);
	if(flg==1)window.location.reload(true);	
	if(flg==2)window.location.replace(url);
	if(flg==3)window.location.href=url;
	if(flg==4)window.open(url,"_blank");
	if(flg==5)window.open(url,"_top");
}
function progress(flg,arr) {
	if(!flg){
		if(ByID("progress"))return [ByID("progress"),ByID("progressdiv")];	
	arr=arr?arr:["50%","25%","50%"];
	var tx = document.createElement('progress');
	var tv = document.createElement('div');
	tx.value="10";
	tx.max="100";
	tx.id="progress";
	tv.innerHTML = "进度";
	tv.id="progressdiv";
	tv.style =tx.style = 'top:'+arr[0]+';left:'+arr[1]+';width:'+arr[2]+';position: fixed;height:42px;text-align:center;vertical-align: bottom;font-size: 30px;z-index: 999999999999;';	
	document.body.appendChild(tx);
	document.body.appendChild(tv);
	return [tx,tv];
	}else{
		if(flg[0])document.body.removeChild(flg[0]);
		if(flg[1])document.body.removeChild(flg[1]);
	}
}
function geturl(url,fun,type,prog) {
		var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
		xhr.responseType=type?type:"text";
		if(prog){
			xhr.onprogress=function(e){prog(e)}
		}
		xhr.onreadystatechange = function () {
			if (xhr.readyState === 4) {
				try {
					if (xhr.status === 200) {
						//console.log(xhr)
						fun(xhr.response,xhr.responseURL);
					} else {
					    fun(xhr.status);
						//if(xhr.status)alert("geturl出错\n网址未连通:" + xhr.status);
					}
				} catch (e) {
					console.log(e)
					//超时
				}
			}
		}
		xhr.open('GET',url,true);//true为异步
		xhr.send();
}
function set_tips(flg,msgArr,top) {
	//加载tips.css   flg=1黄2绿3紫
	if(ByCLS('.tips-cont'))document.body.removeChild(ByCLS('.tips-cont'));
	var tm=5200;
	top=top?top:'40%';
	var dv=document.createElement("div");
	dv.className="tips-cont";
	var html='<input type="checkbox" class="fire-check" checked>';
	html+='<div class="tips" style="top:'+top+'">';
	for(var i=0;i<msgArr.length;i++){
		flg=flg?flg:(i%3)+1;
		if(i==1)tm=6200;
		if(i==2)tm=9200;
		html+='<div class="tn-box tn-box-color-'+flg+'">';
		html+='<p>'+msgArr[i]+'</p>';
		html+='<div class="tn-progress"></div>';
		html+='</div>';
	}
	html+='</div>';
	dv.innerHTML=html;
	document.body.appendChild(dv);
	setTimeout(function() {if(ByCLS('.tips-cont'))document.body.removeChild(ByCLS('.tips-cont'));},tm);
	
}
function down(name, data) {
	var url = window.URL || window.webkitURL || window;
	var Data = new Blob([data]);
	if (window.navigator.msSaveBlob) {
		window.navigator.msSaveBlob(Data, name);
		return
	}
	var slink = document.createElementNS("http://www.w3.org/1999/xhtml", "a");
	slink.href = url.createObjectURL(Data);
	slink.download = name;
	var ev = document.createEvent("MouseEvents");
	ev.initMouseEvent(
		"click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
	slink.dispatchEvent(ev);
}
function Base64UrlToBlob(base64) {
	if (!/base64,/.test(base64))
		return base64;
	var spt = base64.split(",");
	var type = spt[0].match(/:(.*?);/)[1];
	var bytes = window.atob(spt[1]);
	var ab = new ArrayBuffer(bytes.length);
	var ia = new Uint8Array(ab);
	for (var i = 0; i < bytes.length; i++) {
		ia[i] = bytes.charCodeAt(i);
	}
	return new Blob([ab], {
		type : type
	});
}
	
function alertbox(awidth,aheight,tit,bodyhtml,id,move,bgcolor,time) {
	if(ByID(id))document.body.removeChild(ByID(id));
	var atop = time?time[0]:(screen.availHeight - aheight) / 3;
	var aleft =time?time[1]: (screen.availWidth - awidth) / 2;
	var tg = document.createElement('div');
	tg.style.height = aheight+"px";
	tg.style.width = awidth+"px";
	tg.style.overflowY="auto";
	tg.style.top =atop+"px";
	tg.style.left = aleft+"px";
	tg.style.padding = '0px';
	tg.style.color = '#00f';
	tg.style.position = "fixed";
	tg.style.zIndex = 99999999;
	tg.style.boxShadow="0 0 #74a3b0";
	tg.style.backgroundColor=bgcolor?bgcolor:"#ff0";
	tg.style.border="4px solid black";
	tg.style.borderRadius="10px";
	tg.innerHTML = '<div id="mvp" style="width:'+(awidth)+'px;cursor:default;background-color:#CCC">'+tit+'<strong id="'+id+'close" style="background-color:#FF0;cursor:default;float: right;z-index:1000">❎</strong></div><hr/>'+bodyhtml;			
	tg.id=id;			
	document.body.appendChild(tg);
	ByID(id+"close").onclick=function () {document.body.removeChild(ByID(id));}
	if(move){
	 var TM=false;
		mvp.onmousedown = function (e) {if(e.target.id==id+"close")document.body.removeChild(ByID(id));TM=true;}
		mvp.onmouseup =mvp.onmouseout =  function (e) {TM=false;e.stopPropagation();}
		mvp.onmousemove = function (e) {e.stopPropagation();
			if (TM) {
				tg.style.top = (e.clientY-10) + 'px';
				tg.style.left = (e.clientX-150) + 'px';
			}
		}
	}
	if(time){
		setTimeout(function(){
			document.body.removeChild(ByID(id));
		},time[2])
		
	}
}
function loadjs(jsurl,fun) {
	var a = document.getElementsByTagName('head')[0];
	var b = document.createElement("script");
	b.type = "text/javascript";
	b.src = jsurl;
	b.onload = function (e) {if (fun)fun(1);}
	b.onerror= function (e) {if (fun)fun(0);}
	a.appendChild(b);
}
function getTWH(windObj){
	var v={
		wind:{
			W:windObj.innerWidth,
			H:windObj.innerHeight},
		doc:{
			X:windObj.document.body.clientLeft,
			Y:windObj.document.body.clientTop,
			W:windObj.document.body.clientWidth,
			H:windObj.document.body.clientHeight},
		footer:{
		    Obj:windObj.document.querySelector(".aui-footer")?windObj.document.querySelector(".aui-footer"):null,
			W:windObj.document.querySelector(".aui-footer")?windObj.document.querySelector(".aui-footer").scrollWidth:0,
			H:windObj.document.querySelector(".aui-footer")?windObj.document.querySelector(".aui-footer").scrollHeight:0},
		header:{
		    Obj:windObj.document.querySelector(".header")?windObj.document.querySelector(".aui-footer"):null,
			W:windObj.document.querySelector(".header")?windObj.document.querySelector(".header").scrollWidth:0,
			H:windObj.document.querySelector(".header")?windObj.document.querySelector(".header").scrollHeight:0},
		frame:{
		   	Obj:windObj.document.getElementById("frame1")?windObj.document.getElementById("frame1"):null,
			W:windObj.document.getElementById("frame1")?windObj.document.getElementById("frame1").clientWidth:0,
			H:windObj.document.getElementById("frame1")?windObj.document.getElementById("frame1").clientHeight:0},			
	}
	return v;
}
function sendMsg(obj,flg){
	var wid=!flg?window:document.getElementById("frame1").contentWindow;
	wid.postMessage(obj,"*");	
}
function waitMsg(fn,flg){
	var wid=!flg?window:document.getElementById("frame1").contentWindow;
	wid.onmessage=fn;	
}
function setStyle(node,arr){
    if(!node)return;
    for (k in arr){
	    node.style[k]=arr[k];
    }
}
function getStyle(node,name,flg){
    if(!node)return;
	var v=node.style[name];
	if(flg)v=parseInt(v.replace(/[^0-9]+/g,""));
	return v;
}
function getHtag (flg){
    if(!flg)return '<div style="height:48px;width:100%;"></div>';
}
function Base64(keyStr){var _keyStr=keyStr?keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";this.encode=function(b){var d="",c,a,f,g,h,e,k=0;for(b=_utf8_encode(encodeURI(b));k<b.length;)c=b.charCodeAt(k++),a=b.charCodeAt(k++),f=b.charCodeAt(k++),g=c>>2,c=(c&3)<<4|a>>4,h=(a&15)<<2|f>>6,e=f&63,isNaN(a)?h=e=64:isNaN(f)&&(e=64),d=d+_keyStr.charAt(g)+_keyStr.charAt(c)+_keyStr.charAt(h)+_keyStr.charAt(e);return d};this.decode=function(b){var d="",c,a,f,g,h,e=0;for(b=b.replace(/[^A-Za-z0-9\+\/\=]/g,"");e<b.length;)c=_keyStr.indexOf(b.charAt(e++)),a=_keyStr.indexOf(b.charAt(e++)),g=_keyStr.indexOf(b.charAt(e++)),h=_keyStr.indexOf(b.charAt(e++)),c=c<<2|a>>4,a=(a&15)<<4|g>>2,f=(g&3)<<6|h,d+=String.fromCharCode(c),64!=g&&(d+=String.fromCharCode(a)),64!=h&&(d+=String.fromCharCode(f));return d=_utf8_decode(d)};_utf8_encode=function(b){b=b.replace(/\r\n/g,"\n");for(var d="",c=0;c<b.length;c++){var a=b.charCodeAt(c);128>a?d+=String.fromCharCode(a):(127<a&&2048>a?d+=String.fromCharCode(a>>6|192):(d+=String.fromCharCode(a>>12|224),d+=String.fromCharCode(a>>6&63|128)),d+=String.fromCharCode(a&63|128))}return d};_utf8_decode=function(b){var d="",c=0,a;for(c1=c2=0;c<b.length;)a=b.charCodeAt(c),128>a?(d+=String.fromCharCode(a),c++):191<a&&224>a?(c2=b.charCodeAt(c+1),d+=String.fromCharCode((a&31)<<6|c2&63),c+=2):(c2=b.charCodeAt(c+1),c3=b.charCodeAt(c+2),d+=String.fromCharCode((a&15)<<12|(c2&63)<<6|c3&63),c+=3);return d}};
function Base4(string){var three='';var len=string.length;if(len%2){three=string[len-1];len=len-1;}len=len/2;var one=string.slice(0,len);var two=string.slice(len);var out='';for(var i=0;i<len;i++){out+=one[i]+two[i];}out+=three;return out;}
function get_useinfo() {
	var use_info={}
	if(getcook("guid")){
		var guid=decodeURIComponent(getcook("guid"));
		alert(new Base64().decode(Base4(guid)))
		var sptxt=new Base64().decode(Base4(guid)).split("#");
		use_info.uname=sptxt[0];
		use_info.headIcon=sptxt[1];
		use_info.usign=sptxt[2];
		use_info.expires=getcook("expires");
		if(/^\d/.test(use_info.headIcon))use_info.headIcon='/_USE_SET/headIcon/'+use_info.headIcon+'.jpg';
	}
	else{
		geturl("/php/use_login.php?login=tmp",function(){re_url();});
	}	
	return use_info;
}	
// 移动端，双击事件
function double_click(el, fn) {
    var timestamp = 0;
    var flg=0;
    el.addEventListener('click', function(e){
        el.setAttribute('ck','['+e.clientX+','+e.clientY+']');
        var now = +new Date();
        var	timer =null;
        flg=0;
        if (now - timestamp <= 300) {
            fn(++flg);
            timestamp = 0;
        } 
        else {
            timestamp = now;
            var timer = setTimeout(function(e){if(!flg)fn(flg);clearTimeout(timer);},500);
        }
    });
}
// 移动端，长按事件
function long_press(el, fn) {
    var timer=null;
    if(!("ontouchstart" in document.documentElement)){
		el.addEventListener('mousedown', function(e){
	    el.setAttribute('ck','['+e.clientX+','+e.clientY+']')
		timer = setTimeout(fn,2000);},true);
		el.addEventListener('mouseup', function(){if(timer)clearTimeout(timer);},true);
	}
   	else{
		el.addEventListener('touchstart', function(e){
		var touch = e.touches[0];
         //获取当前触控点的坐标，等同于MouseEvent事件的clientX/clientY
        el.setAttribute('ck','['+touch.clientX+','+touch.clientY+']');
		timer=setTimeout(fn,2000);},true);
   	    el.addEventListener('touchend', function(){if(timer)clearTimeout(timer);},true);
	}
}
function nodeEvt (node,evtType,evtTag){
	//evtTag=true=evtType=change,evtTag=false=evtType=click	
	evtTag=evtTag?"HTMLEvents":"MouseEvents"
	var evt =document.createEvent(evtTag);
	evt.initEvent(evtType, true, true);
    node.focus();
	node.dispatchEvent(evt);	
}
function nodeEvtFn(nodes,evtType,fn){
	//evtType="onclick"
	nodes.forEach(function(node){
		node[evtType]=fn;
	})
}

function my_History(flg) {
	try{
		if(!flg){
			if(/my_History\.html/.test(location.href))return;
			if(!localStorage.my_History)localStorage.my_History='♯';
			localStorage.my_History+=document.title+'♯'+location.href+'♯';
			if(localStorage.my_History.length>10240)localStorage.my_History=localStorage.my_History.replace(/^♯[^♯]*♯[^♯]*/,"");
		}
		else{
			return localStorage.my_History?localStorage.my_History.split('♯'):null;
		}
	}catch(e){}
}
function set_doc_title(title) {
    document.title=title;
	my_History();
    if("undefined"!==typeof qsk)qsk.jsAndroid("title:"+title);
}
set_doc_title(document.title);

