function getSrceenWH(){
	var w = $(window).width();
	var h = $(window).height();
	$('#dialogBg').width(w).height(h);
}

window.onresize = function(){  
	getSrceenWH();
}   
$(document).ready(function(){
	$.getScript(location.protocol+"//do.yunzhijia.com/pub/js/qingjs.js");
	//设置图片根据窗口进行等比例缩放
	//弹窗口宽度 dialog
	var wDialog = parseInt($("div#dialog").css("width"));
	var wImg = wDialog-24;
	$("div#dialog img").css({"width":wImg+"px","height":"auto"});
	getSrceenWH();
	$(window.parent.document.getElementById('iframe1')).parent('div').scroll(function(){
		$("#dialog").css("top",((parseInt($(this).get(0).offsetHeight)-parseInt($("#dialog").css("height")))/2-40+$(this).scrollTop())+'px');
	});
	$("#dialog").height($("#dialog").width());
});
//显示弹框
function showDialog(id){
	//禁止滚动
	$(window.parent.document.getElementById('iframe1')).parent('div').css({"overflow":"hidden"});
	$(window.parent.document.getElementById('iframe1')).parent("div").on("touchmove",function(event){
		event.preventDefault;
	}, false);
	//获得点击城市标语
	var poemData = $("div#bounceIn"+id).attr("data-poem");
	var poem = poemData;
	//多行处理
	if(poemData.indexOf("-") > -1){
		poem = poemData.split("-");
		$("#dialog").find("span").eq(0).text(poem[0]);
		$("#dialog").find("span").eq(1).text(poem[1]);
	}else{
		$("#dialog").find("span").eq(0).text(poem);
		$("#dialog").find("span").eq(1).text("");
	}
	//console.log($("#dialog"))
	//定位城市名字
	$('#dialog').attr("data-city",$("div#bounceIn"+id).attr("data-city"));
	//定位城市切图链接
	$('#dialog').attr("data-citybg",$("div#bounceIn"+id).attr("data-citybg"));
	//图片url到弹出层
	$("#dialog img").attr("src",$("div#bounceIn"+id+" img").eq(0).attr("src"));
	$('#dialogBg').fadeIn(300);
	$('#dialog').removeAttr('class').addClass('animated bounceIn').fadeIn();
}
//关闭弹窗
function hideDialog(){
	//恢复滚动
	$(window.parent.document.getElementById('iframe1')).parent('div').css({"overflow":"auto"});
	$(window.parent.document.getElementById('iframe1')).parent("div").off("touchmove");
	$('#dialogBg').fadeOut(300,function(){
		$('#dialog').addClass('bounceOutUp').fadeOut();
	});
}

//进行分享
function share(){
	XuntongJSBridge.call('hideWebViewTitle');
	var imgUrl = $("#dialog img").attr("src");
	var city = $('#dialog').attr("data-city");//小图
	var cityBgUrl = $('#dialog').attr("data-citybg");//分享图
	console.log(imgUrl,city,cityBgUrl);
	//获得点击城市标语
	var poem = $("#dialog").find("span").eq(0).text();
	var emptyPoem = $("#dialog").find("span").eq(1).text();
	if(emptyPoem != ""){
		poem = poem+","+emptyPoem;
	}
	var img = new Image();  
	img.src = imgUrl;
	img.crossOrigin = 'anonymous';
	img.onload = function(){
		var canvas = document.createElement("canvas");  
		canvas.width = img.width;  
		canvas.height = img.height;  
		var ctx = canvas.getContext("2d");  
		ctx.drawImage(img, 0, 0, img.width, img.height);
		var ext = img.src.substring(img.src.lastIndexOf(".")+1).toLowerCase();  
		console.log("ext",ext);
		var dataURL = canvas.toDataURL("image/"+ext).replace("data:image/"+ext+";base64,", "");
		XuntongJSBridge.call("share", {
			"shareType": "4",
			"appId": "XT-9105d076-f022-4c57-8631-6c859624d602",
			"appName": "人人差旅",
			"theme": "组名",
			"title": city+"足迹",
			"toChat":true,
			"content": poem,
			"thumbData": dataURL,//缩略图  
			"webpageUrl": location.origin+location.pathname.slice(0,location.pathname.lastIndexOf("/"))+"/sharepage.html?time="+(new Date()%100000)+"&url="+cityBgUrl,
			"cellContent": poem,
			"sharedObject": "all"
		}, function(result) {
			console.log("result",result);
		});
	}	
}

