require(["./js/built-compare-amd.js"], function(Compare) {
	var urlParams = getUrlParams();
    var URI = {
		base: "/" + location.pathname.split("/")[1]
	};
	URI.getScriptContent = URI.base + "/svnmanager/getScriptContent.do";
	$.ajax({
		type: "POST",
		url:URI.getScriptContent,
		dataType: "json",
		data:{
			id:urlParams.id,
			type:urlParams.type,
			svnpath:urlParams.svnPath,
			oldversion:urlParams.oldVersion,
			newversion:urlParams.newVersion,
			filename:urlParams.fileName,
			svnmsg:localStorage.getItem("svnmsg")
		},
		success: function (data){
			if(data.errorinfo != null){
				alert(data.errorinfo);
				return;
			}
			if(urlParams.type == "page"||"app"==urlParams.type||"cloud"==urlParams.type){
				for(var i=0;i<data.svncontent.length;i++){
					var fileName = data.svncontent[i].filename;
					var pageNumber = fileName.replace(".","_");
					$(".page-title").append("<li><a href='#"+fileName+"' title="+fileName+">"+fileName+"</a></li>");
					var content =   "<div class='filecontent' id="+fileName+">" +
											"<div class='svn_toolbar'>" +
											"<span id='"+pageNumber+"_commard'></span>" +
											"</div>" +
											"<hr>" +
											"<div>" +
													"<div id='"+pageNumber+"_container' class='compareContainer'></div>"+
											"</div>" +
										 "</div>";
					$(".page-content").append(content);
					var options = {
						parentDivId: pageNumber+"_container",
						newFile: {
							Name: data.svnname + " " + fileName,
							Content: data.svncontent[i].filecontent
						},
						oldFile: {
							Name: data.localename + " " + fileName,
							Content: data.localecontent[i].filecontent,
							readonly: false
						},
						showTitle:true
					};
					var compare = new Compare(options, pageNumber+"_commard", "twoWay", true);
					window.compares = window.compares || {};
					window.compares[fileName] = compare;
				}
				$(".page-title li:first").addClass("active");
				$(".page-title").on("click","li",function(){
					$(".page-title li").removeClass("active");
					$(this).addClass("active");
				})
			}else{
				var options = {
			        parentDivId: "compareParentDiv",
			        newFile: {
			        	Name: data.svnname,
			            Content: data.svncontent
			        },
			        oldFile: {
			            Name: data.localename,
			            Content: data.localecontent,
			            readonly: false
			        },
			        showTitle:true
			    };
			    var compare = new Compare(options, "compareCommandHolder", "twoWay", true);
			    window.compares = window.compares || {};
			    window.compares[urlParams.id] = compare;
			}
		},
		error: function(data){
			$(".tipinfoarea").addClass("error");
			$(".tip").html("操作失败");
			$(".info").html(result.submitinfo);
		}
	});
});

function closeTipInfo(e){
	$(".tipinfoarea").removeClass("error");
	var parentElementExist;
	var submitElement = window.parent.document.getElementById("submittosvn");
	var saveElement = window.parent.document.getElementById("save");
	if(submitElement){
		parentElementExist = submitElement.parentElement;
	}else if(saveElement){
		parentElementExist = saveElement.parentElement;
	}
	$(parentElementExist).css("z-index",1);
	$(".tipinfoarea").hide();
}

function submitToSvn(annotation){
	var urlParams = getUrlParams();
	var compare,fileName;
	if("page"==urlParams.type||"app"==urlParams.type||"cloud"==urlParams.type){
		fileName = $(".active a").html();
		compare = window.compares[fileName];
	}else if(urlParams.type == "apage"){
		fileName = urlParams.fileName;
		compare = window.compares[urlParams.id];
	}else{
		compare = window.compares[urlParams.id];
	}
	var newContent = compare.compareView._widget._editors[0].getText();
	var URI = {
		base: "/" + location.pathname.split("/")[1]
	};
	URI.submitToSvn = URI.base + "/svnmanager/submitToSvn.do";
	$.ajax({
		type: "POST",
		url:URI.submitToSvn,
		dataType: "json",
		data:{
			id:urlParams.id,
			bizappid:urlParams.bizappid,
			type:urlParams.type,
			content:newContent,
			svnmsg:localStorage.getItem("svnmsg"),
			svnpath:urlParams.svnPath,
			filename:fileName,
			annotation:annotation
		},
		success: function (result){
			$(".tipinfoarea").show();
			$(window.parent.document.getElementById("submittosvn").parentElement).css("z-index",-1);
			if(!result.success){
				$(".tipinfoarea").addClass("error");
				$(".tip").html("提交失败");
				$(".info").html(result.submitinfo);
				return;
			}
			$(".tip").html(result.submitinfo);
			updateComare(compare,newContent);
			setTimeout(function(self = this){
				$(".tipinfoarea").hide();
				$(window.parent.document.getElementById("submittosvn").parentElement).css("z-index",1);
	        },3000);
		},
		error: function(result){
			$(".tipinfoarea").addClass("error");
			$(".tip").html("操作失败");
			$(".info").html(result.submitinfo);
		}
	});
}

function updateComare(compare,newContent){
	var options = compare.getCompareView().getWidget().options;
	options.oldFile.Content = newContent;
	options.newFile.Content = newContent;
	options.diffArray = {};
	options.highlighters = [];
	options.mapper=[];
	compare.getCompareView().getWidget().refresh(true);
}

function allSubmit(annotation){
	var urlParams = getUrlParams();
	var contents = [];
	var tabs = $(".page-title li a");
	for(var i=0;i<tabs.length;i++){
		var fileName = $(tabs[i]).html();
		var compare = window.compares[fileName];
		var content = compare.compareView._widget._editors[0].getText();
		var fileInfo = {};
		fileInfo.fileName = fileName;
		fileInfo.content = content;
		contents.push(fileInfo);
	}
	var URI = {
		base: "/" + location.pathname.split("/")[1]
	};
	URI.updateToLocale = URI.base + "/svnmanager/allsubmit.do";
	$.ajax({
		type: "POST",
		url:URI.updateToLocale,
		dataType: "json",
		data:{
			id:urlParams.id,
			bizappid:urlParams.bizappid,
			type:urlParams.type,
			content:JSON.stringify(contents),
			svnmsg:localStorage.getItem("svnmsg"),
			svnpath:urlParams.svnPath,
			annotation:annotation
		},
		success: function (result){
			$(".tipinfoarea").show();
			$(window.parent.document.getElementById("submittosvn").parentElement).css("z-index",-1);
			if(!result.success){
				$(".tipinfoarea").addClass("error");
				$(".tip").html("提交失败");
				$(".info").html(result.submitinfo);
				return;
			}
			$(".tip").empty();
			$(".info").html(result.submitinfo);
			var tabs = $(".page-title li a");
			for(var i=0;i<tabs.length;i++){
				var fileName = $(tabs[i]).html();
				var compare = window.compares[fileName];
				var content = compare.compareView._widget._editors[0].getText();
				updateComare(compare,content);
			}
			setTimeout(function(self = this){
				$(".tipinfoarea").hide();
				$(window.parent.document.getElementById("submittosvn").parentElement).css("z-index",1);
	        },3000);
		},
		error: function(result){
			$(".tipinfoarea").addClass("error");
			$(".tip").html("操作失败");
			$(".info").html(result.submitinfo);
		}
	});
}

function updateToLocale(){
	var urlParams = getUrlParams();
	var compare;
	if(urlParams.type == "page"){
		var fileName = $(".active a").html();
		compare = window.compares[fileName];
	}else if(urlParams.type == "app"){
		var fileName = $(".active a").html();
		compare = window.compares[fileName];
	}else{
		compare = window.compares[urlParams.id];
	}
	var newContent = compare.compareView._widget._editors[0].getText();
	var URI = {
		base: "/" + location.pathname.split("/")[1]
	};
	URI.updateToLocale = URI.base + "/svnmanager/updateToLocale.do";
	$.ajax({
		type: "POST",
		url:URI.updateToLocale,
		dataType: "json",
		data:{
			id:urlParams.id,
			type:urlParams.type,
			content:newContent
		},
		success: function (result){
			$(".tipinfoarea").show();
			$(window.parent.document.getElementById("submittosvn").parentElement).css("z-index",-1);
			if(!result.success){
				$(".tipinfoarea").addClass("error");
				$(".tip").html("更新失败");
				$(".info").html(result.submitinfo);
				return;
			}
			$(".info").html("已成功将右侧内容更新到数据库！");
			setTimeout(function(self = this){
				$(".tipinfoarea").hide();
				$(window.parent.document.getElementById("submittosvn").parentElement).css("z-index",1);
	        },3000);
		},
		error: function(result){
			$(".tipinfoarea").addClass("error");
			$(".tip").html("操作失败");
			$(".info").html(result.submitinfo);
		}
	});
}

function allUpate(){
	var urlParams = getUrlParams();
	var contents = [];
	var tabs = $(".page-title li a");
	for(var i=0;i<tabs.length;i++){
		var fileName = $(tabs[i]).html();
		var compare = window.compares[fileName];
		var content = compare.compareView._widget._editors[0].getText();
		var fileInfo = {};
		fileInfo.fileName = fileName;
		fileInfo.content = content;
		contents.push(fileInfo);
	}
	var URI = {
		base: "/" + location.pathname.split("/")[1]
	};
	URI.updateToLocale = URI.base + "/svnmanager/allupdate.do";
	$.ajax({
		type: "POST",
		url:URI.updateToLocale,
		dataType: "json",
		data:{
			id:urlParams.id,
			type:urlParams.type,
			content:JSON.stringify(contents)
		},
		success: function (result){
			$(".tipinfoarea").show();
			$(window.parent.document.getElementById("submittosvn").parentElement).css("z-index",-1);
			if(!result.success){
				$(".tipinfoarea").addClass("error");
				$(".tip").html("更新失败");
				$(".info").html(result.submitinfo);
				return;
			}
			$(".info").html(result.submitinfo);
			setTimeout(function(self = this){
				$(".tipinfoarea").hide();
				$(window.parent.document.getElementById("submittosvn").parentElement).css("z-index",1);
	        },3000);
		},
		error: function(result){
			$(".tipinfoarea").addClass("error");
			$(".tip").html("操作失败");
			$(".info").html(result.submitinfo);
		}
	});
}

function saveCurrentContentToLocaleFile(){
	var urlParams = getUrlParams();
	var compare;
	if(urlParams.type == "page"){
		var fileName = $(".active a").html();
		compare = window.compares[fileName];
	}else if(urlParams.type == "app"){
		var fileName = $(".active a").html();
		compare = window.compares[fileName];
	}else{
		compare = window.compares[urlParams.id];
	}
	var newContent = compare.compareView._widget._editors[0].getText();
	var URI = {
		base: "/" + location.pathname.split("/")[1]
	};
	URI.updateToLocale = URI.base + "/svnmanager/saveCurrentContentToLocaleFile.do";
	$.ajax({
		type: "POST",
		url:URI.updateToLocale,
		dataType: "json",
		data:{
			id:urlParams.id,
			type:urlParams.type,
			content:newContent,
			filename:fileName,
			traceidpath:urlParams.traceidpath
		},
		success: function (result){
			$(".tipinfoarea").show();
			var parentElementExist;
			var submitElement = window.parent.document.getElementById("submittosvn");
			var saveElement = window.parent.document.getElementById("save");
			if(submitElement){
				parentElementExist = submitElement.parentElement;
			}else if(saveElement){
				parentElementExist = saveElement.parentElement;
			}
			$(parentElementExist).css("z-index",-1);
			if(!result.success){
				$(".tipinfoarea").addClass("error");
				$(".tip").html("保存失败");
				$(".info").html(result.submitinfo);
				return;
			}
			$(".info").html("已将当前右侧local内容更新到本地文件！");
			setTimeout(function(self = this){
				$(".tipinfoarea").hide();
				$(parentElementExist).css("z-index",1);
	        },3000);
		},
		error: function(result){
			$(".tipinfoarea").addClass("error");
			$(".tip").html("操作失败");
			$(".info").html(result.submitinfo);
		}
	});
}

function saveAllContentToLocaleFile(){
	var urlParams = getUrlParams();
	var contents = [];
	var tabs = $(".page-title li a");
	for(var i=0;i<tabs.length;i++){
		var fileName = $(tabs[i]).html();
		var compare = window.compares[fileName];
		var content = compare.compareView._widget._editors[0].getText();
		var fileInfo = {};
		fileInfo.fileName = fileName;
		fileInfo.content = content;
		contents.push(fileInfo);
	}
	var URI = {
		base: "/" + location.pathname.split("/")[1]
	};
	URI.updateToLocale = URI.base + "/svnmanager/saveAllContentToLocaleFile.do";
	$.ajax({
		type: "POST",
		url:URI.updateToLocale,
		dataType: "json",
		data:{
			id:urlParams.id,
			type:urlParams.type,
			content:JSON.stringify(contents),
			traceidpath:urlParams.traceidpath
		},
		success: function (result){
			$(".tipinfoarea").show();
			$(window.parent.document.getElementById("saveall").parentElement).css("z-index",-1);
			if(!result.success){
				$(".tipinfoarea").addClass("error");
				$(".tip").html("保存失败");
				$(".info").html(result.submitinfo);
				return;
			}
			$(".info").html("将当前所有页签右侧local内容保存到本地文件！");
			setTimeout(function(self = this){
				$(".tipinfoarea").hide();
				$(window.parent.document.getElementById("saveall").parentElement).css("z-index",1);
	        },3000);
		},
		error: function(result){
			$(".tipinfoarea").addClass("error");
			$(".tip").html("操作失败");
			$(".info").html(result.submitinfo);
		}
	});
}

function getUrlParams(){
	var urlParams={};
    var query = window.query;
	var params = query.split("?")[1];
    var vars = params.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("#");
        if(pair[0] == "type"){
       		urlParams.type = pair[1];
        }else if(pair[0] == "id"){
        	urlParams.id = pair[1];
        }else if(pair[0] == "svnpath"){
        	urlParams.svnPath = pair[1];
        }else if(pair[0] == "oldversion"){
        	urlParams.oldVersion = pair[1];
        }else if(pair[0] == "newversion"){
        	urlParams.newVersion = pair[1];
        }else if(pair[0] == "pageid"){
        	urlParams.pageId = pair[1];
        }else if(pair[0] == "compare"){
        	urlParams.compare = pair[1];
        }else if(pair[0] == "filename"){
        	urlParams.fileName = pair[1];
        }else if(pair[0] == "scene"){
        	urlParams.scene = pair[1];
        }else if(pair[0] == "traceidpath"){
			urlParams.traceidpath = pair[1];
		}else if(pair[0] == "uuid"){
			urlParams.uuid = pair[1];
		}else if(pair[0] == "bizappid"){
			urlParams.bizappid = pair[1];
		}
    }
    return urlParams;
}
function addEventListenerOfMessage(e){
	var data = JSON.parse(e.data);
	if('submittosvn' == data.type ||'allsubmit' == data.type){
		if('submittosvn'==data.type){
			submitToSvn(data.content);
		}else if('allsubmit'==data.type){
			allSubmit(data.content);
		}
	}
	if(data.type == 'updatetolocale') {
		updateToLocale();
    }else if(data.type == 'allupdate'){
    	allUpate();
    }else if(data.type == 'save'){
    	saveCurrentContentToLocaleFile();
    }else if(data.type == 'saveall'){
    	saveAllContentToLocaleFile();
    }
}
//为window注册message事件并绑定监听函数
window.onload = function (){
	if(window.addEventListener){
		window.addEventListener('message', addEventListenerOfMessage, false);
	}else{
		window.attachEvent('message', addEventListenerOfMessage);
	}
	window.query = window.location.href;
	var urlParams = getUrlParams()
	if(urlParams.compare == "true"){
		if(urlParams.type == "page"){
			$(".svn_toolbar").hide();
			$(".compareContainer").css("top","6px");
			if("app"==urlParams.scene){
				$(".page").css("padding-top","0px");
			}
		}else{
			var iframe = getCurrentIframe(urlParams.uuid);
			$($(iframe.closest("#flexpanelap").parentNode).find("#save")[0].parentElement).css("position","absolute").css("top","0px").css("z-index",1);
		}
	}else{
		//调整父页面的布局
		if("page"==urlParams.type || "app"==urlParams.type||"cloud" == urlParams.type){
			$(window.parent.document.getElementById("submittosvn").parentElement).css("top","48px");
			$(".page").css("padding-top","0px");
		}else{
			$(window.parent.document.getElementById("submittosvn").parentElement).css("position","absolute").css("top","0px").css("z-index",1);
		}
		$(window.parent.document.getElementById("submittosvn").parentElement).css("position","absolute").css("z-index",1);
	}
	//$("."+urlParams.type).show();
	if("page"==urlParams.type || "app"== urlParams.type||"cloud" == urlParams.type){
		$(".page").css("display","table-cell");
		$(".script").hide();
	}
}

function getCurrentIframe(uuid){
	var iframe;
	var iframes = window.parent.document.getElementsByTagName("iframe");
	for(var i=0;i<iframes.length;i++){
		var src = iframes[i].src;
		if(src.indexOf("uuid#"+uuid)!=-1){
			iframe = iframes[i];
			break;
		}
	}
	return iframe;
}
