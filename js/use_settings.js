var right_bar_style = document.createElement('style');
	right_bar_style .innerHTML=".toolbar{position:fixed;right:0px;bottom:20px;cursor:default;z-index:99999999999;}.toolbar-item{padding:4px;border: 2px solid #003;border-radius:5px;background-color:#eaedf1;color:#72B08E;display:block;font-size:3.8vmin;width:4vmin;height:4vmin;margin-top:1px;position:relative;}.toolbar-item:hover{font-size:4vmin;}._orange {color: #E8601B;}";
	document.body.appendChild(right_bar_style);	
	var right_bar = document.createElement('div');
	right_bar.className="toolbar";
	right_bar.innerHTML = '<span title="首页" class="toolbar-item icon-home3"></span><span title="搜索" class="toolbar-item icon-search"></span><span title="制作书籍" class="toolbar-item icon-book"></span><span title="回到顶部" class="toolbar-item icon-eject"></span>';
	document.body.appendChild(right_bar);
if(localStorage.right_bar_favorites&&localStorage.right_bar_favorites.indexOf(location.href)>0){	
 	document.querySelector(".icon-heart").classList.add('_orange');
}

right_bar.onclick = function (e) {	
	if(e.target.classList.contains("icon-eject")){
		scroll(0,0);
		if(ByID("bkdiv"))ByID("bkdiv").scrollTop=0;
		return;
	}
	if(!e.target.classList.contains("_orange")){
		if(e.target.classList.contains("icon-home3")){re_url(5,"https://daxuanprint.github.io/");}
		if(e.target.classList.contains("icon-search")){re_url(5,"https://daxuanprint.github.io/search.html");}
		if(e.target.classList.contains("icon-book")){re_url(5,"https://daxuanguji.github.io/");}
	}
	else{
		if(e.target.classList.contains("icon-home3")){re_url(5,"https://daxuanprint.github.io/");}
		if(e.target.classList.contains("icon-search")){re_url(5,"https://daxuanprint.github.io/search.html");}
		if(e.target.classList.contains("icon-book")){re_url(5,"https://daxuanguji.github.io/");}
	}
	e.target.classList.add('_orange');
		


};