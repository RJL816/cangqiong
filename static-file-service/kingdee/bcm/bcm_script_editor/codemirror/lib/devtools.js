;
/**
 * 调试脚本
 * 
 */
(function(window, $) {
	
	$(document).ready(function(){
		initialize();
		initialize0();
	});

	function initialize(){
		// 初始化界面拖动布局
		initialSplit();
		// 初始化控制台面板
		intialConsolePanel();
		// 初始化调试面板
		initialDebugPanel();
		//初始化表单调试信息
		initializeDebugInfo();
		//获取脚本操作日志
		getScriptLogs();
	}

	function getScriptLogs(){
		//更新操作日志信息
	    $.post(URI.getScriptLogs, {}, function(data) {
			if(data && data.length>0){
				for(var i=0;i<data.length;i++){
					let item = "Date: "+data[i].currenttime+ "    log:  " + data[i].data;
					var template = '<div class="console-wrapper">' +
							'<span class="fa fa-chevron-right navbar-btn-active" aria-hidden="true">"'+item+'"</span>' +
						'</div>';
					var $template = $(template);
					$("#main-console").append($template);
				}
			}
			window.setTimeout(()=>{getScriptLogs()},5000);
        });
	}
	
	/****
	 * 
	 * 脚本初始化代码区域
	 * 
	 */
	
	function initialize0(){
		$.ajaxSetup({
			'cache': false
			});
		window.onbeforeunload = function(){
			terminate();
		};
		function terminate(){
			if(__DEBUG_ID != null){
				step("exit");
				__DEBUG_ID=null;
			}
		};
		
	}
	/**
	 *	初始化调试信息
	 *
	 */
	function initializeDebugInfo(){
	    //设置定时器 心跳
		window.setTimeout(()=>{timerTask1()},500);
		function timerTask1(){
			//检测表单页面是否有事件触发
			var eventListener = sessionStorage.getItem("eventListener");
			if(eventListener && eventListener!=null){
				var split = eventListener.split("&");
				if(split && split.length>2){
					var methodName = split[0];
					var pageId = split[1];
					var debugId = split[2];
					//页面有点击事件
					if(methodName.indexOf("click")!=-1){
						getAtCurrentBreakPoint();
					}else if(methodName.indexOf("Click")!=-1){
						getAtCurrentBreakPoint();
					}else if(methodName.indexOf("loadData")!=-1){//页面有打开子级页面事件
						sessionStorage.removeItem("eventListener");
						__DEBUG_ID = debugId;
						sessionStorage.setItem("debugId",__DEBUG_ID);
						if(pageId == __PAGE_ID){
							__TEMP_DEBUG_SCRIPT.debugId = __DEBUG_ID;
							sessionStorage.setItem(__NOW_FORMNUMBER,JSON.stringify(__TEMP_DEBUG_SCRIPT));
							//首次打开调试页面，初始化脚本的树结构
							initializeTree();
						}else{
							//打开子级页面
							__PAGE_ID = pageId;
							openChildForm(pageId);
						}
					}else if(methodName.indexOf("release")!=-1){//页面有关闭子级页面事件
						sessionStorage.removeItem("eventListener");
						closeChildForm();
						getAtCurrentBreakPoint();
					}else if(methodName.indexOf("updateValue")!=-1){//页面有即时触发事件
						getAtCurrentBreakPoint();
					}
				}
			}
			if(__DEBUG_ID){
				//检测断点信息是否变化
				if(__PRE_BREAKPOINT != __NOW_BREAKPOINT){
					__PRE_BREAKPOINT = __NOW_BREAKPOINT;
					// get all enable breakpoints
				    var breakpoints = getBreakPointLines(State.enable);
					//更新断点信息
				    $.post(URI.updateBreakPoint+"?debugId="+__DEBUG_ID+"&cmd=true", {breakpoints: breakpoints,debugId:__DEBUG_ID}, function(data) {
						if(!data.success){
							__NOW_BREAKPOINT = (new Date()).valueOf();
						}
			        });
				}
			}
			window.setTimeout(()=>{timerTask1()},500);
		};
		window.setTimeout(()=>{timerTask2()},30000);
		function timerTask2(){
			if(__DEBUG_ID){
				// 保持心跳，避免超时服务端移除debug环境
			    $.post(URI.keepAlive+"?debugId="+__DEBUG_ID+"&cmd=true", {debugId:__DEBUG_ID}, function(data) {
					if(data.success == true || data.success == 'true'){
						if(!(data.keepAlive && data.keepAlive==true)){
							window.clearTimeout(timer2);
						}
					}
		        });
		        var timer2 = window.setTimeout(()=>{timerTask2()},30000);
			}
		};

	    //获取url中 pageId 
	    var args = location.search;     
	    if (args.indexOf("?") != -1) {
		    var str = args.substr(1);   
		    var strs = str.split("&");   
		    for(var i = 0; i < strs.length; i ++) {     
		        if("pageId" == strs[i].split("=")[0]){
		        	__PAGE_ID = strs[i].split("=")[1];
		        }
		    }   
	    }
	    let tempscript = JSON.parse(sessionStorage.getItem(__NOW_FORMNUMBER));
	    if(tempscript){
	    	__TEMP_DEBUG_SCRIPT = tempscript;
	    }
		__TEMP_DEBUG_SCRIPT.pageId = __PAGE_ID;
		sessionStorage.setItem(__NOW_FORMNUMBER,JSON.stringify(__TEMP_DEBUG_SCRIPT));

		//初始化要调试的页面
		initialForm();
	}

	//初始化表单，并进入调试模式
	function initialForm(){
		//用于刷新页面时，刷新iframe
		var random = (new Date()).valueOf();
		var formurl = location.origin + "/" + location.pathname.split("/")[1] + "/#/dform?byPageId="+__PAGE_ID +"&kde_debug=true"+random;
		if(location.href.includes("kdweb_debug=true")){
			formurl = formurl + "&kdweb_debug=true"
		}
		document.getElementById("form").src = formurl;
	}

	//初始化脚本的树结构
	function initializeTree(){
		$.post(URI.initialize, {pageId: __PAGE_ID}, function(data) {
			if(data.success == true || data.success == 'true'){
				$(".maintree").find(".form_caption").html(data.formname);
				var scripts=data.scripts;
				for(var i=0; i<scripts.length; i++){
					$(".maintree").find(".treeChild").before(`
    					<div class='script'>
				        	<span class='tree_indent'></span>
				          	<span class=''></span>
				          	<span class='file_icon'></span>
				          	<span class='script_caption' style="cursor:pointer">${scripts[i].scriptnumber}</span>
				        </div>
					`);	
					//将code储存到前端缓存中
					sessionStorage.setItem(scripts[i].scriptnumber,scripts[i].scriptcode);
				}
				// 初始化脚本数据（缓存中的数据）
				initialScriptData();
			}
		});
  		//点击脚本树结构
  		$(".tree").on('click',".script",function(e){
  			$(".script").removeClass("selected");
  			$(e.currentTarget).addClass("selected");
  			var scriptnumber = $(e.currentTarget).find(".script_caption").text();
  			//页签
  			$(".active").removeClass("actived");
  			var tabs = $(".scriptTitle").find(".scriptname_tab");
  			var isNewTab = true;
  			for (var i = 0; i < tabs.length; i++) {
  				if($(tabs[i]).text() == scriptnumber){
  					$(tabs[i]).closest(".active").addClass("actived");
  					isNewTab=false;
  				}
  			}
  			if(isNewTab == true){
	  			$("#scriptTab").before(`
					<li class='active actived' >
		          		<span title=${scriptnumber} class="scriptname_tab">${scriptnumber}</span>
		          		<span class='close_btn'></span>
		      		</li>
				`);
				$("#editcode").after(`
					<div class="editcode">
						<textarea id=${scriptnumber} class="code" name="code" ></textarea>
					</div>
				`);
				addCodeEditor(scriptnumber);
				//将新打开的脚本暂存到缓存
				__TEMP_DEBUG_SCRIPT.scriptNumbers.push(scriptnumber);
  			}
  			//code编辑框
  			$(".code").parent().addClass("hidden");
			$("#"+scriptnumber).parent().removeClass("hidden");
			//将激活的脚本暂存到缓存
			__TEMP_DEBUG_SCRIPT.activedScript = scriptnumber;
			sessionStorage.setItem(__NOW_FORMNUMBER,JSON.stringify(__TEMP_DEBUG_SCRIPT));
  		});
  		//右键codeMirror面板
  		$(".scriptCode").on('contextmenu',".editcode",function(e){
	        var scriptNumber = __TEMP_DEBUG_SCRIPT.activedScript;
	        let editor = window.ScriptCodeEditors[scriptNumber];
			let expr = editor.doc.getSelection();
			if(!expr || expr==null || expr.trim==""){
				return false;
			}
			$(".operate").addClass("hidden");
	        $(".operate-codeMirror").removeClass("hidden").css({"top":e.clientY+"px","left":e.clientX+"px"});
	        //add-to-watches 将选中的文本添加到watch列表中
	        $("#add-to-watches").unbind().click(function(){
	        	var $watch =  $('.watch-expressions');
	  			// 如果没有展开，先展开页签
	  			if(!$watch.is(":visible")){
	  				$watch.siblings().trigger("click");
	  			}
	  			var $info = $watch.find('.info');
	  			if($info){
	  				$info.remove();
	  			}
	  			var $input = $watch.find('input');
	  			if($input){
	  				$input.parent().remove();
	  			}
	  			//获取当前点击的脚本文件名称
	        	var scriptNumber = __TEMP_DEBUG_SCRIPT.activedScript;
	        	if(!scriptNumber || scriptNumber==null){
	        		scriptNumber = $($(".maintree").find(".script_caption")[0]).text();
	        	}
	        	var fileName = scriptNumber + ".js";
                //将watch添加到缓存中
				var watches = __TEMP_DEBUG_SCRIPT.watches;
				var w = {
					fileName: fileName,
					expr: expr
				}
				watches.push(w);
				sessionStorage.setItem(__NOW_FORMNUMBER,JSON.stringify(__TEMP_DEBUG_SCRIPT));
				var tempObj = {};
				tempObj[expr] = '(not available)';
				updateWatches( null, null, tempObj, ".debug-content.watch-expressions", callback);
				// 步骤： 1. 增加watch  2. 立即执行获取watch
				$.post( URI.addWatch+"?debugId="+__DEBUG_ID+"&cmd=true", {debugId: __DEBUG_ID, scriptNumber: scriptNumber, expr: expr }, function(data) {
		      		if(data.success || data.success == 'true'){
		      			$.post( URI.getWatches+"?debugId="+__DEBUG_ID+"&cmd=true", {debugId: __DEBUG_ID}, function(w){
	        				if(w.success || w.success == 'true'){
	        					var watches = w.watches;
	        					if(watches && Object.keys(watches).length>0){
	        						$(".debug-content.watch-expressions").children().remove();
	        						for(var key in watches){
	        							if(key == __DEBUG_ID){
	        								delete watches[key];
	        							}
	        							if(watches[key] && typeof watches[key]=="string"){
											if(watches[key].indexOf("undefined")!=-1 || watches[key].indexOf("ReferenceError")!=-1){
												delete watches[key];
												watches[key] = '(not available)';
											}
										}
	        						}
	        						updateWatches( null, null, watches, ".debug-content.watch-expressions", callback);
	        					}
	        				}
	        			});
		      		}else{
        				alert('从服务器获取watch变量列表失败！');
        			}
		      	});
	        });
	        //复制选中的文本
	        $("#copy").unbind().click(function(){
	        	//copy(expr);
	        });
			return false;
  		});

  		//点击脚本页签
  		$(".scriptTitle").on('click',".active",function(e){
  			//关闭页签
  			if($(e.target).attr("class") == "close_btn"){
  				if(e.currentTarget == $(".scriptTitle").find(".actived")[0]){
  					$(".code").parent().addClass("hidden");
  					if($(e.currentTarget).prev().text() != ""){
  						$(e.currentTarget).prev().addClass("actived");
  						var scriptnumber = $(e.currentTarget).prev().find(".scriptname_tab").text();
  						__TEMP_DEBUG_SCRIPT.activedScript = scriptnumber;
  						//code编辑框
						$("#"+scriptnumber).parent().removeClass("hidden");
  					}else if($(e.currentTarget).next().text() != ""){
  						$(e.currentTarget).next().addClass("actived");
  						var scriptnumber = $(e.currentTarget).next().find(".scriptname_tab").text();
		  				__TEMP_DEBUG_SCRIPT.activedScript = scriptnumber;
		  				//code编辑框
						$("#"+scriptnumber).parent().removeClass("hidden");
  					}else{
  						$("#code").parent().removeClass("hidden");
  					}
  					//tree
  					$(".script").removeClass("selected");
					var treeChildren = $(".maintree").find(".script_caption");
					for (var i = 0; i < treeChildren.length; i++) {
						if($(treeChildren[i]).text() == scriptnumber){
							$(treeChildren[i]).closest(".script").addClass("selected");
						}
					}
  				}
  				//删除该脚本上的断点
				var currentScript = $(e.currentTarget).find(".scriptname_tab").text();
				window.ScriptCodeEditors[currentScript].clearGutter("breakpoints");
				var breakpoints = __TEMP_DEBUG_SCRIPT.breakpoints;
				var deleteBreakPoints = [];
				for(var i=0;i<breakpoints.length;i++){
					if(breakpoints[i].fileName.split(".js")[0] == currentScript){
						deleteBreakPoints.push(breakpoints[i]);
					}
				}
				for(var i=0;i<deleteBreakPoints.length;i++){
					var line = deleteBreakPoints[i].line;
					var source = deleteBreakPoints[i].source;
					var fileName = deleteBreakPoints[i].fileName;
					removeBreakpoint(line,source,fileName);
				}
				//删除该的脚本codemirror
				delete window.ScriptCodeEditors[currentScript];
				//删除页签
  				$(e.currentTarget).remove();
  				var currentScript = $(e.currentTarget).find(".scriptname_tab").text();
  				var scriptNumbers = __TEMP_DEBUG_SCRIPT.scriptNumbers;
  				for(var i=0;i<scriptNumbers.length;i++){
  					if(currentScript == scriptNumbers[i]){
  						scriptNumbers.splice(i,1);
  					}
  				}
  				sessionStorage.setItem(__NOW_FORMNUMBER,JSON.stringify(__TEMP_DEBUG_SCRIPT));
  			}else{
  				$(".active").removeClass("actived");
  				$(e.currentTarget).addClass("actived");
  				var scriptnumber = $(e.currentTarget).find(".scriptname_tab").text();
  				//tree
  				var treeChildren = $(".maintree").find(".script_caption");
  				for (var i = 0; i < treeChildren.length; i++) {
  					if($(treeChildren[i]).text() == scriptnumber){
  						$(".script").removeClass("selected");
  						$(treeChildren[i]).closest(".script").addClass("selected");
  					}
  				}
  				//code编辑框
	  			$(".code").parent().addClass("hidden");
				$("#"+scriptnumber).parent().removeClass("hidden");
				//将激活的脚本暂存到缓存
				__TEMP_DEBUG_SCRIPT.activedScript = scriptnumber;
				sessionStorage.setItem(__NOW_FORMNUMBER,JSON.stringify(__TEMP_DEBUG_SCRIPT));
  			}	
  		});
	}

	function initialSplit(){
		Split(['#form','#debug'], {
			direction: 'vertical',
			sizes: [60,40],
			gutterSize: 6
		});
		Split(['#main-box'], {
			direction: 'vertical',
			sizes: [100],
			gutterSize: 6
		});
		Split(['#main-left', '#main-center', "#main-right"], {
			sizes: [15, 67, 18],
			gutterSize: 6
		});
	}
	
	function addCodeEditor(scriptnumber){
		$code = $("#"+scriptnumber);
		var editor = CodeMirror.fromTextArea($code.get(0), {
			  mode: "javascript",
			  styleActiveLine: true,
			  lineNumbers: true,
			  foldGutter: true,
			  scrollbarStyle: "simple",
			  gutters: ["breakpoints","CodeMirror-linenumbers", "CodeMirror-foldgutter"],
			  extraKeys: {"Alt-F": "findPersistent"},
			  readOnly: true,
		});
		var cacheCode = sessionStorage.getItem(scriptnumber);
		if(cacheCode) editor.setValue(cacheCode);
		$code.data("data-editor", editor);
		//断点
		var breakpoints = __TEMP_DEBUG_SCRIPT.breakpoints;
		if(__TEMP_DEBUG_SCRIPT.breakpointState == breakpointState.deactivate){
			for(var i=0;i<breakpoints.length;i++){
				var lineno = breakpoints[i].lineno;
				if(scriptnumber == breakpoints[i].fileName.split(".js")[0]){
					editor.setGutterMarker(lineno-1,"breakpoints", $('<div class="bk" style="color:#822">' + BreakPoint.disable + '</div>').get(0));
				}
			}
		}else{
			for(var i=0;i<breakpoints.length;i++){
				if(scriptnumber == breakpoints[i].fileName.split(".js")[0]){
					var lineno = breakpoints[i].lineno;
					if(breakpoints[i].state == State.enable){
						editor.setGutterMarker(lineno-1,"breakpoints", $('<div class="bk" style="color:#822">' + BreakPoint.enable + '</div>').get(0));
					}else if(breakpoints[i].state == State.disable){
						editor.setGutterMarker(lineno-1,"breakpoints", $('<div class="bk" style="color:#822">' + BreakPoint.disable + '</div>').get(0));
					}
				}
			}
		}
		//将codemirror对象存为全局变量
		window.ScriptCodeEditors = window.ScriptCodeEditors || {} ;
		window.ScriptCodeEditors[scriptnumber] = editor;
		//codemirror行前断点的点击
		editor.on("gutterClick", function(cm, n, gutter, e) {
			if(!e.trggerBreakpoint){
				return;
			}
			var info = cm.lineInfo(n);
			var hasBreakPoint = (info.gutterMarkers && info.gutterMarkers.breakpoints);
			cm.setGutterMarker(n, "breakpoints", hasBreakPoint ? removeMarker(cm, n) : buildMarker(cm, n));
		});
		editor.on("change",  function(cm, n) {
			var content = cm.getValue();
			if(content.trim().length == 0){
				// reset
				__TEMP_DEBUG_SCRIPT.breakpoints = [];
				$(".list-breakpoint").children().remove();
			}
		});
		editor.focus();
		
		function removeMarker(cm, n){
			var scriptFileName = $(".scriptTitle").find(".actived").text().trim();
			var info = cm.lineInfo(n);
			var line = scriptFileName +".js:" + (n + 1);
			return invoke();

			function invoke(){
				var source = info.text.trim();
				removeBreakpoint(line, source);
				return null;
			}
		}
		
		function buildMarker(cm, n) {
			// debug窗口增加一条记录
			var scriptFileName = $(".scriptTitle").find(".actived").text().trim();
			var info = cm.lineInfo(n);
			var lineno = (n + 1);
			var line = scriptFileName +".js:" + lineno;
			return invoke();

			function invoke(){
				var source = info.text.trim();
				var $marker = $('<div class="bk" style="color:#822">' + BreakPoint.enable + '</div>');
				addBreakpoint(lineno, line, source,{
					// 断点复选框勾选触发
					checkedClick: function(e, o){
						$marker.html(BreakPoint.enable);
						var editor = window.ScriptCodeEditors[o.fileName.split(".js")[0]];
			        	editor.setGutterMarker(o.lineno - 1,"breakpoints", $('<div class="bk" style="color:#822">' + BreakPoint.enable + '</div>').get(0));
						var breakPoints = __TEMP_DEBUG_SCRIPT.breakpoints;
						for(var i=0;i<breakPoints.length;i++){
						  	if(breakPoints[i].line == o.line){
						  		breakPoints[i].state = State.enable;
						  	}
						}
				        sessionStorage.setItem(__NOW_FORMNUMBER,JSON.stringify(__TEMP_DEBUG_SCRIPT));
				        __NOW_BREAKPOINT = (new Date()).valueOf();
					},
					// 断点复选框取消勾选触发
					unCheckedClick: function(e, o){
						$marker.html(BreakPoint.disable);
						var editor = window.ScriptCodeEditors[o.fileName.split(".js")[0]];
			        	editor.setGutterMarker(o.lineno - 1,"breakpoints", $('<div class="bk" style="color:#822">' + BreakPoint.disable + '</div>').get(0));
						var breakPoints = __TEMP_DEBUG_SCRIPT.breakpoints;
						for(var i=0;i<breakPoints.length;i++){
						  	if(breakPoints[i].line == o.line){
						  		breakPoints[i].state = State.disable;
						  	}
						}
				        sessionStorage.setItem(__NOW_FORMNUMBER,JSON.stringify(__TEMP_DEBUG_SCRIPT));
				        __NOW_BREAKPOINT = (new Date()).valueOf();
					},
					// 断点源代码行点击触发
					souceClick: function(){
						
					}
				});
				return $marker.get(0);
			}
			return null;
		}
	}
	
	function intialConsolePanel(option){
		if(!option) {
			var option = {};
		}
		var option = $.extend({
			  mode: "javascript",
			  scrollbarStyle: "simple"
		}, option, true);

		var id = buildCodeWrapperId();
		var template = '<div class="console-wrapper">' +
							'<span class="fa fa-chevron-right navbar-btn-active" aria-hidden="true"></span>' +
							'<textarea id="' + id + '" name="main-console-code"></textarea>' +
						'</div>';
		var $template = $(template);
		$("#main-console").append($template);
		var consolePanel = document.getElementById(id);
		var editor = CodeMirror.fromTextArea(consolePanel, option);
		$template.data("_data-cm", editor);
		$(consolePanel).siblings(".CodeMirror").css({"height": "100%","border": "none"});
       	var charWidth = editor.defaultCharWidth(), basePadding = 4;
       	editor.on("renderLine", function(cm, line, elt){
            var off = CodeMirror.countColumn(line.text, null, cm.getOption("tabSize")) * charWidth;
            elt.style.textIndent = "-" + off + "px";
            elt.style.paddingLeft = (basePadding + off) + "px";
        });
        editor.on("keydown", function(cm, e){
        	if(e.keyCode == 13){//enter
  			    var echo = cm.getValue();
  			 	if(echo.trim().length == 0) {
  			 		e.preventDefault();
  				 	return true;
  			 	}
  			 	e.returnValue = false;
  			 	cm.setReadOnly = "nocursor";
  			 	var _id = 'o$' + id;
  			 	// 发请求执行输入脚本
  			 	var expr = echo.trim();
  			 	//暂时记录控制台输入的历史记录	
  			 	__TEMP_CONSOLE_RECORD.push(expr);
	          	sessionStorage.setItem("temprecord",JSON.stringify(__TEMP_CONSOLE_RECORD));
  			 	if(__DEBUG_ID != null){
  			 		if(__PRE_LINE_INFO){
  			 			$.post( URI.eval+"?debugId="+__DEBUG_ID+"&cmd=true", {debugId: __DEBUG_ID, expr: expr}, function(data){
	  					 	if(data.success || data.success == 'true'){
    							var val = data.value;
    							if(val && typeof val=="string"){
									if(val.indexOf("undefined")!=-1 || val.indexOf("ReferenceError")!=-1){
										val = "undefined";
									}
								}
	  							invoke(_id, val);
	  					 	}
	  				 	});
  			 		}else{
  			 			try{
  			 				invoke(_id, eval(expr));
  			 			}catch(e){
  			 				invoke(_id, "undefined");
  			 			}	
  			 		}
  			 	}else {
  					invoke(_id, 'Please start debug first !');
  			 	}
  				function invoke(_id, _value){
  					var oTemplate = '<div class="console-output-wrapper">' +
										'<span class="fa fa-chevron-left navbar-btn-deactive" aria-hidden="true"></span>' +
							 		'</div>';
					var vTemplate = '<div class="main-console-value">'+
										'<span class="value object-value-object">value</span>'+
									'</div>';
					var $console = $("#main-console");
					var $oTemplate = $(oTemplate);
					var $vTemplate = $(vTemplate);
					$console.append($oTemplate);
					
					if(_value && typeof _value == 'object'){
						
						$vTemplate.prepend($('<span class="fa fa-caret-right" style="margin-right: 2px;"> </span>').click(function(e){
							e.stopPropagation();
							$this = $(this);
							if($this.hasClass('fa-caret-right')){
								$this.removeClass('fa-caret-right').addClass('fa-caret-down').parent().next('ol').slideDown('fast');
							}else{
								$this.removeClass('fa-caret-down').addClass('fa-caret-right').parent().next('ol').slideUp('fast');
							}
						}));

						$vTemplate.find(".value").html(_value.$$type);
						$oTemplate.append($vTemplate);
						delete _value.$$type;

						var $p = $('<li></li>');
						$oTemplate.append($('<ol style="display: none;margin-left: 17px;"></ol>').append($p));
						resolveObject(_value, $p);

						function resolveObject(o, $parent){
							for(var key in o) {
								if(o[key] && typeof o[key] == 'object'){
									var obj = o[key];
									var kvTemplate = '<div class="console-expression-title">' + 
														'<span class="name">key</span>' +
														'<span class="console-expressions-separator"> : </span>' +
														'<span class="value object-value-object">value</span>' +
													'</div>';
									var $kvTemplate = $(kvTemplate);
									$kvTemplate.find(".name").html(key);
									$kvTemplate.find(".value").html(obj.$$type);
									delete obj.$$type;

									$kvTemplate.prepend($('<span class="fa fa-caret-right" style="margin-right: 2px;"> </span>').click(function(e){
										e.stopPropagation();
										$this = $(this);
										if($this.hasClass('fa-caret-right')){
											$this.removeClass('fa-caret-right').addClass('fa-caret-down').parent().next('ol').slideDown('fast');
										}else{
											$this.removeClass('fa-caret-down').addClass('fa-caret-right').parent().next('ol').slideUp('fast');
										}
									}));
									
									var $localParent;
									var $p = $('<li></li>');
									$p.append($kvTemplate);
									$parent.append($('<ol></ol>').append($p));
									// store current property
									var popParent = $('<li></li>');
									$p.append($('<ol style="display: none"></ol>').append(popParent));
									$localParent = popParent;
									
									// 有孩子节点
									resolveObject(obj, $localParent)
								}else{
									if(key == '$$type'){
										continue;
									}
									var label = '<li style="margin-left: 10px;">' +
													'<span class="name">' + key +'</span>' +
													'<span class="watch-expressions-separator"> : </span>' +
													'<span class="value object-value-object">' + o[key] + '</span>' +
												'</li>';
									var p = $parent.parent();
									var ol = p.find('ol').last();
									if(ol.lenth > 0 ){
										ol.append($(label));
									}else {
										p.append(label);
									}	
								}
							}
						}
					}else{
						$vTemplate.find(".value").html(_value);
						$oTemplate.append($vTemplate);
					}
					intialConsolePanel();

				}
  			 	__TEMP_RECORD_SEQ=-1;

    	    }else if(e.keyCode == 38){//up
    	    	e.preventDefault();
    	    	var temprecords = JSON.parse(sessionStorage.getItem("temprecord"))
    	    	if(temprecords!=null && temprecords.length>0){
    	    		var count = temprecords.length;
    	    		//获取当前记录的序号
    	    		if(__TEMP_RECORD_SEQ == -1){
    	    			__TEMP_RECORD_SEQ = count-1 ;
    	    			//获取当前记录并赋值到控制台
	    	    		if(__TEMP_RECORD_SEQ>-1 && __TEMP_RECORD_SEQ<count){
	    	    			var temprecord = temprecords[__TEMP_RECORD_SEQ];
	    	    			$template.find("textarea").val(temprecord);
	    	    		}
    	    		}else if(__TEMP_RECORD_SEQ == 0){
    	    		}else{
    	    			__TEMP_RECORD_SEQ = __TEMP_RECORD_SEQ-1 ;
    	    			//获取当前记录并赋值到控制台
	    	    		if(__TEMP_RECORD_SEQ>-1 && __TEMP_RECORD_SEQ<count){
	    	    			var temprecord = temprecords[__TEMP_RECORD_SEQ];
	    	    			$template.find("textarea").val(temprecord);
	    	    		}
    	    		}	
    	    	}
    	    }else if(e.keyCode == 40){//down
    	    	e.preventDefault();
    	    	var temprecords = JSON.parse(sessionStorage.getItem("temprecord"))
    	    	if(temprecords!=null && temprecords.length>0){
    	    		var count = temprecords.length;
    	    		//获取当前记录的序号
    	    		if(__TEMP_RECORD_SEQ>-1 && __TEMP_RECORD_SEQ<count){
    	    			__TEMP_RECORD_SEQ = __TEMP_RECORD_SEQ+1 ;
    	    			//获取当前记录并赋值到控制台
	    	    		if(__TEMP_RECORD_SEQ>-1 && __TEMP_RECORD_SEQ<count){
	    	    			var temprecord = temprecords[__TEMP_RECORD_SEQ];
	    	    			$template.find("textarea").val(temprecord);
	    	    		}else if(__TEMP_RECORD_SEQ==count){
	    	    			$template.find("textarea").val("");
    	    			}
    	    		}
    	    	}
    	    }
       	});
//      editor.refresh();
      	editor.focus();
      	function buildCodeWrapperId(){
    	  	var $wrapper = $("#main-console").find(".console-wrapper");
    	  	var $last = $wrapper.last();
    	  	if($last.length == 0){
    		  	return "main-console-code$0";
    	  	}else{
    		  	$wrapper.each(function(){
	    			var $w = $(this);
	    			var _editor = $w.data("_data-cm");
	    			if(_editor) _editor.setOption("readOnly", true);
    			}).children(".navbar-btn-active").removeClass("navbar-btn-active").addClass("navbar-btn-deactive");

    		  	var id = $last.children("textarea").last().attr("id");
    		  	var i;
    		  	if(id && (i = id.lastIndexOf("$")) >= 0){
    			  	id = +id.substring(i + 1);
    			  	id++;
    			  	return "main-console-code$" + id;
    		  	}
    	  	}
      	}
	}
	
	function initialDebugPanel(){
		$(".window").find("div[role='navigation']").filter(":not(.fixed)").click(function(){
			var $this = $(this);
			var right = "glyphicon-chevron-right";
			var down = "glyphicon-chevron-down";
			$this.find("li > a > span").each(function(){
				var $e = $(this);
				if($e.hasClass(right)){
					$e.removeClass(right).addClass(down);
					var $s = $this.siblings();
					//刷新观察watch列表
					refreshWatches();
					$s.slideDown("fast");
				}else if($e.hasClass(down)){
					$e.removeClass(down).addClass(right);
					$this.siblings().slideUp("fast");
				}
			});
		});
	}

	//初始化脚本数据
	function initialScriptData(){
	    //从浏览器缓存中取得脚本调试信息
	    var tempscript = JSON.parse(sessionStorage.getItem(__NOW_FORMNUMBER));
		if(tempscript && tempscript.debugId == __DEBUG_ID){
			__TEMP_DEBUG_SCRIPT = tempscript;
			var activedScriptNumber = __TEMP_DEBUG_SCRIPT.activedScript;
			var scriptNumbers = __TEMP_DEBUG_SCRIPT.scriptNumbers;
			//tree
			var treeChildren = $("#main-left").find(".script_caption");
			if(treeChildren && treeChildren.length>0){
				for (var i = 0; i < treeChildren.length; i++) {
					if($(treeChildren[i]).text() == activedScriptNumber){
						$(".script").removeClass("selected");
						$(treeChildren[i]).closest(".script").addClass("selected");
					}
				}
			}
			//页签
			if(scriptNumbers && scriptNumbers.length>0){
				for(var i=0;i<scriptNumbers.length;i++){
	  				var scriptnumber = scriptNumbers[i];
	  				if(scriptnumber == activedScriptNumber){
	  					$(".code").parent().addClass("hidden");
	  					$(".active").removeClass("actived");
	  					$("#scriptTab").before(`
							<li class='active actived' >
				          		<span title=${scriptnumber} class="scriptname_tab">${scriptnumber}</span>
				          		<span class='close_btn'></span>
				      		</li>
						`);
						$("#editcode").after(`
							<div class="editcode">
								<textarea id=${scriptnumber} class="code" name="code" ></textarea>
							</div>
						`);
						addCodeEditor(scriptnumber);
					}else{
						$("#scriptTab").before(`
							<li class='active' >
				          		<span title=${scriptnumber} class="scriptname_tab">${scriptnumber}</span>
				          		<span class='close_btn'></span>
				      		</li>
						`);
						$("#editcode").after(`
							<div class="editcode">
								<textarea id=${scriptnumber} class="code" name="code" ></textarea>
							</div>
						`);
						addCodeEditor(scriptnumber);
						$("#"+scriptnumber).parent().addClass("hidden");
					}	
	  			}
			}
  			
  			//调试信息
  			//断点
  			if(__TEMP_DEBUG_SCRIPT.breakpointState==breakpointState.deactivate){
				$("#deactiveBreakpoint").find('span').removeClass("fa-active").addClass("fa-deactive");
  				$("#deactiveBreakpoint").find("a").attr("title", "active breakpoints");
				$(".list-breakpoint").addClass("covering");
			}
  			var breakpoints = __TEMP_DEBUG_SCRIPT.breakpoints;
  			if(breakpoints && breakpoints.length > 0){
	  			for(var i=0;i<breakpoints.length;i++){
	  				initialBreakpoint(breakpoints[i],{
					  	// 断点复选框勾选触发
					  	checkedClick: function(e, o){	  
						  	var editor = window.ScriptCodeEditors[o.fileName.split(".js")[0]];
		        		  	editor.setGutterMarker(o.lineno - 1,"breakpoints", $('<div class="bk" style="color:#822">' + BreakPoint.enable + '</div>').get(0));
						    var breakPoints = __TEMP_DEBUG_SCRIPT.breakpoints;
						    for(var i=0;i<breakPoints.length;i++){
						  		if(breakPoints[i].line == o.line){
						  			breakPoints[i].state = State.enable;
						  		}
						  	}
				          	sessionStorage.setItem(__NOW_FORMNUMBER,JSON.stringify(__TEMP_DEBUG_SCRIPT));
				          	__NOW_BREAKPOINT = (new Date()).valueOf();
					  	},
					  	// 断点复选框取消勾选触发
					  	unCheckedClick: function(e, o){
						  	var editor = window.ScriptCodeEditors[o.fileName.split(".js")[0]];
		        		  	editor.setGutterMarker(o.lineno - 1,"breakpoints", $('<div class="bk" style="color:#822">' + BreakPoint.disable + '</div>').get(0));
						  	var breakPoints = __TEMP_DEBUG_SCRIPT.breakpoints;
						  	for(var i=0;i<breakPoints.length;i++){
							  	if(breakPoints[i].line == o.line){
							  		breakPoints[i].state = State.disable;
							  	}
						  	}
				          	sessionStorage.setItem(__NOW_FORMNUMBER,JSON.stringify(__TEMP_DEBUG_SCRIPT));
				          	__NOW_BREAKPOINT = (new Date()).valueOf();
					  	},
					  	// 断点源代码行点击触发
					  	souceClick: function(){
						  	
					  	}
				    });
			  	}
			  	var $info = $(".list-breakpoint").find('.info');
	  			if($info){
	  				$info.remove();
	  			}	
			}else{
				var $breakpoint = $(".debug-content.list-breakpoint");
				var $ol = $breakpoint.find("ol");
				if($ol.length == 0) {
					$ol = $("<ol></ol>");
					$breakpoint.append($ol);
					$ol.append('<div class="info" style="padding-left: 10px;">No Breakpoints</div>');
				}
			}
			//观察 watches
			var watches = __TEMP_DEBUG_SCRIPT.watches;
			if (watches && watches.length > 0) {
				var tempObj = {};
				for(var i=0;i<watches.length;i++){
					tempObj[watches[i].expr] = '(not available)';
				}
				updateWatches( null, null, tempObj, ".debug-content.watch-expressions", callback);
				var $info = $(".watch-expressions").find('.info');
	  			if($info){
	  				$info.remove();
	  			}
			}
			//变量
			var $variable =  $('.variable-expressions');
			if(!$variable.children() || $variable.children().length == 0){
				$variable.append('<div class="info" style="padding-left: 10px;">No Variable Expressions</div>');
			}
		}else{
			//断点
			var $breakpoint = $(".list-breakpoint");
			var $ol = $breakpoint.find("ol");
			if($ol.length == 0) {
				$ol = $("<ol></ol>");
				$breakpoint.append($ol);
				$ol.append('<div class="info" style="padding-left: 10px;">No Breakpoints</div>');
			}
			//观察
			var $watch =  $('.watch-expressions');
			if(!$watch.children() || $watch.children().length == 0){
				$watch.append('<div class="info" style="padding-left: 10px;">No Watch Expressions</div>');
			}
			//变量
			var $variable =  $('.variable-expressions');
			if(!$variable.children() || $variable.children().length == 0){
				$variable.append('<div class="info" style="padding-left: 10px;">No Variable Expressions</div>');
			}
		}
		//初始化自动启动脚本调试	
	    var breakpoints = getBreakPointLines(State.enable);
	    //获取当前页面上的所有观察watch
	    var watches = [];
	    var tempWatches = __TEMP_DEBUG_SCRIPT.watches;
	    if (tempWatches && tempWatches.length > 0) {
		    for(var i=0;i<tempWatches.length;i++){
		    	var scriptNumber = (tempWatches[i].fileName).split(".js")[0];
		    	watches.push(scriptNumber +"&"+ tempWatches[i].expr);
		    }
	    }
		//启动调试模式
	    $.post(URI.debug+"?debugId="+__DEBUG_ID+"&cmd=true", {breakpoints: breakpoints,watches: watches,debugId:__DEBUG_ID}, function(data) {
			if(data.success == true || data.success == 'true'){
				callbackSuccess(data);
				sessionStorage.removeItem("eventListener");
			}
        });
	}

	//******************** 初始化结束区域***************************
	
	function addBreakpoint(lineno, line, source, callback){
		if(callback && typeof callback == 'object'){
			var checkedClick = callback.checkedClick;
			var unCheckedClick = callback.unCheckedClick;
			var souceClick = callback.souceClick;
		}
		var $breakpoint = $(".debug-content.list-breakpoint");
		var $ol = $breakpoint.find("ol");
		if($ol.length == 0) {
			$ol = $("<ol></ol>");
			$breakpoint.append($ol);
		}
		var scriptFileName = $(".scriptTitle").find(".actived").text().trim();
		var o = {
		    line: line,
		    lineno: lineno,
		   	state: State.enable, 
		   	fileName: scriptFileName +'.js',
		   	source: source
		}
		updateDebugModel(o, 'add');
		var template = '<li class="every-breakpoint">' + 
		   					'<div class="checkbox">' +
		     					'<label>' +
						       		'<input type="checkbox" checked="true">' +
						       		'<span>' + line + '</span>' +
						       	'</label>' +
						     '</div>' +
						     '<div class="source-text">' + source + '</div>'
					   '</li>';
		var $template =  $(template);
		$template.data("data-model", o);
		$template.find("input[type=checkbox]").change(function(e){
			if($(this).is(":checked")){
				o.state = State.enable;
				if(checkedClick && typeof checkedClick == 'function'){
					checkedClick.call(this, e, o);
				}
			}else{
				o.state = State.disable;
				if(unCheckedClick && typeof unCheckedClick == 'function'){
					unCheckedClick.call(this, e, o);
				}
			}
		});
		if(souceClick && typeof souceClick == 'function'){
			$template.find(".source-text").click(function(e){
				souceClick.call(this, e);
			})
		}
		$ol.append($template);
		$info = $breakpoint.find(".info");
		if($info){
			$info.remove();
		}
		if(!$breakpoint.is(":visible")){
			$breakpoint.siblings().trigger("click");
		}
	}
	
	function removeBreakpoint(line, source, fileName){
		var scriptFileName = $(".scriptTitle").find(".actived").text().trim();
		var $breakpoint = $(".debug-content.list-breakpoint");
		var $ol = $breakpoint.find("ol");
		$ol.children().each(function(i, e){
			var $template =  $(e);
			var _line = $template.find("label > span").text();
			var _source = $template.find(".source-text").text();
			if(line == _line && source == _source){
				$template.remove();
			}
			updateDebugModel({
				line: line,
				fileName: (fileName || scriptFileName +'.js'),
				source: source
			}, 'rm');
		})
		if(!$breakpoint.is(":visible") || $ol.children().length == 0){
			$ol.append('<div class="info" style="padding-left: 10px;">No Breakpoints</div>');
			//$breakpoint.siblings().trigger("click");
		}
	}
	
	function initialBreakpoint(bp, callback){
		var line = bp.line;
	  	var source = bp.source;
	  	var state = bp.state; 
		if(callback && typeof callback == 'object'){
			var checkedClick = callback.checkedClick;
			var unCheckedClick = callback.unCheckedClick;
			var souceClick = callback.souceClick;
		}
		var $breakpoint = $(".debug-content.list-breakpoint");
		var $ol = $breakpoint.find("ol");
		if($ol.length == 0) {
			$ol = $("<ol></ol>");
			$breakpoint.append($ol);
		}
		var template ;
		if(state == State.enable){
			template = '<li class="every-breakpoint">' + 
		   					'<div class="checkbox">' +
		     					'<label>' +
						       		'<input type="checkbox" checked="true">' +
						       		'<span>' + line + '</span>' +
						       	'</label>' +
						     '</div>' +
						     '<div class="source-text">' + source + '</div>'
					   '</li>';
		}else if(state == State.disable){
			template = '<li class="every-breakpoint">' + 
		   					'<div class="checkbox">' +
		     					'<label>' +
						       		'<input type="checkbox">' +
						       		'<span>' + line + '</span>' +
						       	'</label>' +
						     '</div>' +
						     '<div class="source-text">' + source + '</div>'
					   '</li>';
		}
		var $template =  $(template);
		$template.data("data-model", bp);
		$template.find("input[type=checkbox]").change(function(e){
			if($(this).is(":checked")){
				bp.state = State.enable;
				if(checkedClick && typeof checkedClick == 'function'){
					checkedClick.call(this, e, bp);
				}
			}else{
				bp.state = State.disable;
				if(unCheckedClick && typeof unCheckedClick == 'function'){
					unCheckedClick.call(this, e, bp);
				}
			}
		});
		if(souceClick && typeof souceClick == 'function'){
			$template.find(".source-text").click(function(e){
				souceClick.call(this, e);
			})
		}
		$ol.append($template);
		if(!$breakpoint.is(":visible")){
			$breakpoint.siblings().trigger("click");
		}
	}

	function updateLine(cm, lineInfo, lineno, scriptNumber){
		if(__PRE_LINE_INFO && (lineno!=__PRE_LINE_INFO.line || scriptNumber!=__PRE_LINE_INFO.scriptnumber)){
			var editor = window.ScriptCodeEditors[__PRE_LINE_INFO.scriptnumber];
			editor.removeLineClass(__PRE_LINE_INFO.handle, 'background', 'debug-active');
		}
		__PRE_LINE_INFO = {
			scriptnumber: scriptNumber,
			line: lineInfo.line,
			handle: lineInfo.handle
		};
		cm.addLineClass(lineInfo.handle, 'background', 'debug-active');
		cm.setCursor({line:lineInfo.line , ch:0}, {scroll: true});
		cm.focus();
	}
	
	function updateVariables(cm, lineno, variables, e, callback) {
		var $e = $(e)
		resolveObject(variables);
		if(!$e.is(":visible")){
			$e.siblings().trigger("click");
		}
		function resolveObject(o, $parent){
			for(var key in o) {
				if(o[key] && typeof o[key] == 'object'){
					var obj = o[key];
					var variableTemplate = '<div class="variable-expression-title">' + 
												'<span class="name">window</span>' +
												'<span class="variable-expressions-separator"> : </span>' +
												'<span class="value object-value-object">Window</span>' +
											'</div>';
					var $header = $(variableTemplate);
					$header.prepend($('<span class="fa fa-caret-right" style="margin-right: 2px;"> </span>').click(function(e){
						e.stopPropagation();
						$this = $(this);
						if($this.hasClass('fa-caret-right')){
							$this.removeClass('fa-caret-right').addClass('fa-caret-down').parent().next('ol').slideDown('fast');
						}else{
							$this.removeClass('fa-caret-down').addClass('fa-caret-right').parent().next('ol').slideUp('fast');
						}
					}));
					$header.find(".name").html(key);
					$header.find(".value").html(obj.$$type);
					delete obj.$$type;
					var $localParent;
					if(!$parent) {
						$e.append($header);
						var $p = $('<li></li>');
						$e.append($('<ol style="display: none"></ol>').append($p));
						$localParent = $p;
					}else{
						var $p = $('<li></li>');
						$p.append($header);
						$parent.append($('<ol></ol>').append($p));
						// store current property
						var popParent = $('<li></li>');
						$p.append($('<ol style="display: none"></ol>').append(popParent));
						$localParent = popParent;
					}
					// 有孩子节点
					resolveObject(obj, $localParent)
				}else{
					if(key == '$$type') continue;
					var variableTemplate = '<div class="variable-expression-title">' + 
												'<span class="name">window</span>' +
												'<span class="variable-expressions-separator"> : </span>' +
												'<span class="value object-value-object">Window</span>' +
											'</div>';
					var $header = $(variableTemplate);
					$header.find(".name").html(key);
					$header.find(".value").html(o[key]);
					if(!$parent){
						$e.append($header);
					}else{
						var label = '<li style="margin-left: 10px;">' +
										'<span class="name">' + key +'</span>' +
										'<span class="variable-expressions-separator"> : </span>' +
										'<span class="value object-value-object">' + o[key] + '</span>' +
									'</li>';
						var p = $parent.parent();
						var ol = p.find('ol').last();
						if(ol.lenth > 0 ){
							ol.append($(label));
						}else 
							p.append(label);
					}
					var $info = $e.find(".info");
					if($info){
						$info.remove();
					}
				}
			}
		}
	}
	
	function updateWatches(cm, lineno, watches, e, callback) {
		var $e = $(e)
		resolveObject(watches);
		if(!$e.is(":visible")){
			$e.siblings().trigger("click");
		}
		function resolveObject(o, $parent){
			for(var key in o) {
				if(o[key] && typeof o[key] == 'object'){
					var obj = o[key];
					var watchTemplate = '<div class="watch-expression-title">' + 
											'<span class="name">window</span>' +
											'<span class="watch-expressions-separator"> : </span>' +
											'<span class="value object-value-object">Window</span>' +
										'</div>';
					var $header = $(watchTemplate);
					$header.prepend($('<span class="fa fa-caret-right" style="margin-right: 2px;"> </span>').click(function(e){
						e.stopPropagation();
						$this = $(this);
						if($this.hasClass('fa-caret-right')){
							$this.removeClass('fa-caret-right').addClass('fa-caret-down').parent().next('ol').slideDown('fast');
						}else{
							$this.removeClass('fa-caret-down').addClass('fa-caret-right').parent().next('ol').slideUp('fast');
						}
					}));
					$header.find(".name").html(key);
					$header.find(".value").html(obj.$$type);
					delete obj.$$type;
					var $localParent;
					if(!$parent) {
						$e.append($header);
						var $p = $('<li></li>');
						$e.append($('<ol style="display: none"></ol>').append($p));
						$localParent = $p;
						registerDeleteHandler($header, callback);
					}else{
						var $p = $('<li></li>');
						$p.append($header);
						$parent.append($('<ol></ol>').append($p));
						// store current property
						var popParent = $('<li></li>');
						$p.append($('<ol style="display: none"></ol>').append(popParent));
						$localParent = popParent;
					}
					// 有孩子节点
					resolveObject(obj, $localParent)
				}else{
					if(key == '$$type') continue;
					var watchTemplate = '<div class="watch-expression-title">' + 
											'<span class="name">window</span>' +
											'<span class="watch-expressions-separator"> : </span>' +
											'<span class="value object-value-object">Window</span>' +
										'</div>';
					var $header = $(watchTemplate);
					$header.find(".name").html(key);
					$header.find(".value").html(o[key]);
					if(!$parent){
						$e.append($header);
						// 注册顶层 hover 事件
						registerDeleteHandler($header, callback);
					}else{
						var label = '<li style="margin-left: 10px;">' +
										'<span class="name">' + key +'</span>' +
										'<span class="watch-expressions-separator"> : </span>' +
										'<span class="value object-value-object">' + o[key] + '</span>' +
									'</li>';
						var p = $parent.parent();
						var ol = p.find('ol').last();
						if(ol.lenth > 0 ){
							ol.append($(label));
						}else 
							p.append(label);
					}
					var $info = $e.find(".info");
					if($info){
						$info.remove();
					}
				}
			}
		}
		function registerDeleteHandler($header, callback){
			if(callback && typeof callback == 'function'){
				var $minus = $('<span class="fa fa-minus debug-minus" style="display: none"> </span>');
				$header.prepend($minus).hover(function (){
					$minus.show();
				},function (){
					$minus.hide();
				}
				);
				var $h = $header;
				$minus.click(function(e){
					e.stopPropagation();
					callback.call(this, e, $h);
				});
			}
		}
	}
	
	function step(command){
	    //删除前一行代码的高亮显示样式
	    if(__PRE_LINE_INFO && __PRE_LINE_INFO.handle){
    		var cm = window.ScriptCodeEditors[__PRE_LINE_INFO.scriptnumber];
    		if(cm){
    			cm.removeLineClass(__PRE_LINE_INFO.handle, 'background', 'debug-active');
    		}
    		__PRE_LINE_INFO=null;
    	}
    	$("#resume").find('span').removeClass("fa-resume").addClass("fa-resume-off");
    	$("#stepOver").find('span').removeClass("fa-over").addClass("fa-over-off");
    	$("#stepInto").find('span').removeClass("fa-into").addClass("fa-into-off");
    	$("#stepOut").find('span').removeClass("fa-out").addClass("fa-out-off");
	    $.post( URI.debugCmd+"?debugId="+__DEBUG_ID+"&cmd=true", {debugId: __DEBUG_ID, command: command }, function(data) {
    		if(data.success == true || data.success == 'true'){
    			//callbackSuccess(data);
    			getAtCurrentBreakPoint(command);
    		}
    	});
	}
	
	function callbackSuccess(data){
		var lineno = data.currentLine;
		var scriptNumber = data.scriptName;
		__DEBUG_ID = data.debugId;
		lineno = (lineno -1);
		if(!data.running){
			//删除某一行代码的高亮显示样式
	    	if(__PRE_LINE_INFO && __PRE_LINE_INFO.handle){
	    		var cm = window.ScriptCodeEditors[__PRE_LINE_INFO.scriptnumber];
	    		if(cm){
	    			cm.removeLineClass(__PRE_LINE_INFO.handle, 'background', 'debug-active');
	    		}
	    	}
	    	$("#resume").find('span').removeClass("fa-resume").addClass("fa-resume-off");
	    	$("#stepOver").find('span').removeClass("fa-over").addClass("fa-over-off");
	    	$("#stepInto").find('span').removeClass("fa-into").addClass("fa-into-off");
	    	$("#stepOut").find('span').removeClass("fa-out").addClass("fa-out-off");
		}else{
			$("#resume").find('span').removeClass("fa-resume-off").addClass("fa-resume");
	    	$("#stepOver").find('span').removeClass("fa-over-off").addClass("fa-over");
	    	$("#stepInto").find('span').removeClass("fa-into-off").addClass("fa-into");
	    	$("#stepOut").find('span').removeClass("fa-out-off").addClass("fa-out");
		}
		__LASTBREAKLINE = data.currentLine;
		
		// 自动刷新watch
		$("#refresh-watch").trigger("click");
		if(lineno > -1) {
			//切换到断点所在的脚本文件和位置
			if(scriptNumber != __TEMP_DEBUG_SCRIPT.activedScript){
	  			//tree
				var treeChildren = $(".maintree").find(".script_caption");
				for (var i = 0; i < treeChildren.length; i++) {
					if($(treeChildren[i]).text() == scriptNumber){
						$(".script").removeClass("selected");
						$(treeChildren[i]).closest(".script").addClass("selected");
					}
				}
	  			//页签
	  			$(".active").removeClass("actived");
	  			var tabs = $(".scriptTitle").find(".scriptname_tab");
	  			var isNewTab = true;
	  			for (var i = 0; i < tabs.length; i++) {
	  				if($(tabs[i]).text() == scriptNumber){
	  					$(tabs[i]).closest(".active").addClass("actived");
	  					isNewTab=false;
	  				}
	  			}
	  			if(isNewTab == true){
		  			$("#scriptTab").before(`
						<li class='active actived' >
			          		<span title=${scriptNumber} class="scriptname_tab">${scriptNumber}</span>
			          		<span class='close_btn'></span>
			      		</li>
					`);
					$("#editcode").after(`
						<div class="editcode">
							<textarea id=${scriptNumber} class="code" name="code" ></textarea>
						</div>
					`);
					addCodeEditor(scriptNumber);
					//将新打开的脚本暂存到缓存
					__TEMP_DEBUG_SCRIPT.scriptNumbers.push(scriptNumber);
	  			}
	  			//code编辑框
	  			$(".code").parent().addClass("hidden");
				$("#"+scriptNumber).parent().removeClass("hidden");
				//将激活的脚本暂存到缓存
				__TEMP_DEBUG_SCRIPT.activedScript = scriptNumber;
				sessionStorage.setItem(__NOW_FORMNUMBER,JSON.stringify(__TEMP_DEBUG_SCRIPT));
			}
			//某一行的高亮
			var editor = window.ScriptCodeEditors[scriptNumber];
			var lineInfo = editor.lineInfo(lineno);
			updateLine(editor, lineInfo, lineno, scriptNumber);
		}
		//变量
		var variables = data.variables;
		if(variables){
			$(".debug-content.variable-expressions").children().remove();
			var $variable =  $('.variable-expressions');
			if(!$variable.children() || $variable.children().length == 0){
				$variable.append('<div class="info" style="padding-left: 10px;">No Variable Expressions</div>');
			}
			updateVariables(editor, lineno, variables, ".debug-content.variable-expressions");
		}
		//watch观察
		var watches = data.watches;
		if(watches){
			$(".debug-content.watch-expressions").children().remove();
			for(var key in watches){
				if(key == __DEBUG_ID){
					delete watches[key];
				}
				if(watches[key] && typeof watches[key]=="string"){
					if(watches[key].indexOf("undefined")!=-1 || watches[key].indexOf("ReferenceError")!=-1){
						delete watches[key];
						watches[key] = '(not available)';
					}
				}
			}
			updateWatches(editor, lineno, watches, ".debug-content.watch-expressions");
		}
	}

	// 调式窗口删除watch回调
	function callback(e, $header){
		var $h = $header;
		var expr = $(this).siblings('.name').text();
		var scriptNumber = __TEMP_DEBUG_SCRIPT.activedScript;
		$.post( URI.removeWatch+"?debugId="+__DEBUG_ID+"&cmd=true", {debugId: __DEBUG_ID, scriptNumber:scriptNumber, expr: expr }, function(data) {
			if(data.success || data.success == 'true'){
				invoke();
			}
		});
		function invoke(){
			var $prop = $h.siblings('ol').first();
			if($prop.length > 0) {
				$prop.remove();
			}
			$h.remove();
			//刷新观察watch列表
			refreshWatches();
			//删除一个watch后，刷新缓存中的watches
			var watches = __TEMP_DEBUG_SCRIPT.watches;
			for(var i=0;i<watches.length;i++){
				if((scriptNumber+".js") == watches[i].fileName && expr == watches[i].expr){
					watches.splice(i, 1);
				}
			}
			sessionStorage.setItem(__NOW_FORMNUMBER,JSON.stringify(__TEMP_DEBUG_SCRIPT));
		}
	}
	
	function updateDebugModel(o, opt){
		var bp = __TEMP_DEBUG_SCRIPT.breakpoints;
		if(o){
			if(opt == "add") bp.push(o);
			else if(opt == "rm") {
				for(var i=0;i<bp.length;i++){
					if(equals(o, bp[i])){
						bp.splice(i, 1);
						break;
					}
				}
			}else if(opt == 'updateState'){
				for(var i = 0; i < bp.length; i ++){
					if(bp[i].line == o.line && bp[i].fileName == o.fileName && bp[i].source == o.source){
						bp[i].state = o.state;
					}
				}
			}
		}
		
		function equals(f, t){
			return ( f.line == t.line && f.fileName == t.fileName && f.source == t.source );
		}
		sessionStorage.setItem(__NOW_FORMNUMBER,JSON.stringify(__TEMP_DEBUG_SCRIPT));
		__NOW_BREAKPOINT = (new Date()).valueOf();
	}

	//重新渲染codemirror行前的断点
	function renderBreakpoints(){
		var bp = __TEMP_DEBUG_SCRIPT.breakpoints;
		if(__TEMP_DEBUG_SCRIPT.breakpointState==breakpointState.deactivate){
			for(var i=0;i<bp.length;i++){
				var lineno = bp[i].lineno;
				var editor = window.ScriptCodeEditors[bp[i].fileName.split(".js")[0]];
		    	editor.setGutterMarker(lineno - 1,"breakpoints", $('<div class="bk" style="color:#822">' + BreakPoint.disable + '</div>').get(0));
			}
		}else{
			for(var i=0;i<bp.length;i++){
				var lineno = bp[i].lineno;
				var editor = window.ScriptCodeEditors[bp[i].fileName.split(".js")[0]];
				if(bp[i].state == State.enable){
					editor.setGutterMarker(lineno - 1,"breakpoints", $('<div class="bk" style="color:#822">' + BreakPoint.enable + '</div>').get(0));
				}else{
					editor.setGutterMarker(lineno - 1,"breakpoints", $('<div class="bk" style="color:#822">' + BreakPoint.disable + '</div>').get(0));
				}
			}
		}
	}

	//获取某一个状态的所有断点
	function getBreakPointLines(state){
		var array = [];
		if(__TEMP_DEBUG_SCRIPT.breakpointState==breakpointState.activate){
			var bp = __TEMP_DEBUG_SCRIPT.breakpoints;
			var map = {};
			for(var i = 0; i < bp.length; i ++){
				var o = bp[i];
				var scriptNumber = o.fileName.split(".js")[0];
				if(state && state == State.enable && state == o.state){
					var linenos = [];
					if(map[scriptNumber]){
						linenos=map[scriptNumber];
						linenos.push(o.lineno);
						map[scriptNumber] = linenos;
					}else{
						linenos.push(o.lineno);
						map[scriptNumber] = linenos;
					}
				}else if(state && state == State.disable && state == o.state){
					var linenos = [];
					if(map.scriptNumber){
						linenos=map.scriptNumber;
						linenos.push(o.lineno);
						map[scriptNumber] = linenos;
					}else{
						linenos.push(o.lineno);
						map[scriptNumber] = linenos;
					}
				}
			}
			for(var key in map){
				array.push(key + "&" + map[key].join(","));
			}
		}
		return array;
	}
	//从后端获取脚本执行的结果
	function getAtCurrentBreakPoint(command){
		$.post(URI.getAtCurrentBreakPoint+"?debugId="+__DEBUG_ID+"&cmd=true", {debugId:__DEBUG_ID}, function(data) {
			if(data.success == true || data.success == 'true'){
				if(command == "resume" && __LASTBREAKLINE == data.currentLine){
    				return;
    			}
				sessionStorage.removeItem("eventListener");
				callbackSuccess(data);
			}
		});
	}
	//刷新观察watch列表
	function refreshWatches(){
		var $watch =  $('.watch-expressions');
		var $input = $watch.find('input');
		if($input){
			$input.parent().remove();
		}
		if(!$watch.children() || $watch.children().length == 0){
			$watch.append('<div class="info" style="padding-left: 10px;">No Watch Expressions</div>');
		}
	}
	//前端向后端更新断点信息
	function updateBreakPoint(){
		// get all enable breakpoints
	    var breakpoints = getBreakPointLines(State.enable);
		//更新断点信息
	    $.post(URI.updateBreakPoint+"?debugId="+__DEBUG_ID+"&cmd=true", {breakpoints: breakpoints,debugId:__DEBUG_ID}, function(data) {
			if(data.success == true || data.success == 'true'){
				__PRE_BREAKPOINT = __NOW_BREAKPOINT;
			}
        });
	}
	//页面有打开子级页面事件
	function openChildForm(pageId){
		var formnumber;
		$.post(URI.initialize, {pageId: pageId}, function(data) {
			if(data.success == true || data.success == 'true'){
				formnumber = data.formnumber;
				$("#main-left").append(`
					<div class="treeRoot">
				        <div id=${formnumber} class="tree ${formnumber}">
				        	<div class="page">
					        	<span class="tree_indent"></span>
					          	<a href="javascript:void(0)" class="formArrowClass arrow_down"></a>
					          	<span class="folder_icon"></span>
					          	<span class="form_caption">${data.formname}</span>
					        </div>
					        <div class="treeChild hidden"></div>
		    			</div>
					</div>
				`);
				var scripts=data.scripts;
				for(var i=0; i<scripts.length; i++){
					$("."+formnumber).find(".treeChild").before(`
    					<div class='script'>
				        	<span class='tree_indent'></span>
				          	<span class=''></span>
				          	<span class='file_icon'></span>
				          	<span class='script_caption' style="cursor:pointer">${scripts[i].scriptnumber}</span>
				        </div>
					`);	
					//将code储存到前端缓存中
					sessionStorage.setItem(scripts[i].scriptnumber,scripts[i].scriptcode);
				}
				//启动一个新的调试环境 pageId  formnumber
				__FORMNUMBERS.push(formnumber);
				__NOW_FORMNUMBER = formnumber;
				
				let tempscript = JSON.parse(sessionStorage.getItem(__NOW_FORMNUMBER));
			    if(tempscript){
			    	__TEMP_DEBUG_SCRIPT = tempscript;
			    	__TEMP_DEBUG_SCRIPT.pageId = __PAGE_ID;
			    	__TEMP_DEBUG_SCRIPT.debugId = __DEBUG_ID;
			    }else{
			    	__TEMP_DEBUG_SCRIPT = {
						pageId: __PAGE_ID,
						debugId: __DEBUG_ID,
						scriptNumbers: [],
						activedScript: null,
						breakpoints: [],
						watches: [],
						breakpointState: 1
					};
			    }
			    sessionStorage.setItem(__NOW_FORMNUMBER,JSON.stringify(__TEMP_DEBUG_SCRIPT));
    			// 初始化脚本数据（缓存中的数据）
				initialScriptData();
			}
		});
		//展开和合并脚本列表
		$("#main-left").on("click",".page",function(e){
			var $e = $(e.currentTarget);
			var $formArrowClass = $e.find(".formArrowClass");
			if($formArrowClass.hasClass("arrow_down")){
				$formArrowClass.removeClass("arrow_down").addClass("arrow_left");
				$e.parent().find(".script").addClass("hidden");
			}else{
				$formArrowClass.removeClass("arrow_left").addClass("arrow_down");
				$e.parent().find(".script").removeClass("hidden");
			}
		});
  		//点击脚本树结构
  		$("#main-left").on('click',".script",function(e){
  			$(".script").removeClass("selected");
  			$(e.currentTarget).addClass("selected");
  			var scriptnumber = $(e.currentTarget).find(".script_caption").text();
  			//页签
  			$(".active").removeClass("actived");
  			var tabs = $(".scriptTitle").find(".scriptname_tab");
  			var isNewTab = true;
  			for (var i = 0; i < tabs.length; i++) {
  				if($(tabs[i]).text() == scriptnumber){
  					$(tabs[i]).closest(".active").addClass("actived");
  					isNewTab=false;
  				}
  			}
  			if(isNewTab == true){
	  			$("#scriptTab").before(`
					<li class='active actived' >
		          		<span title=${scriptnumber} class="scriptname_tab">${scriptnumber}</span>
		          		<span class='close_btn'></span>
		      		</li>
				`);
				$("#editcode").after(`
					<div class="editcode">
						<textarea id=${scriptnumber} class="code" name="code" ></textarea>
					</div>
				`);
				addCodeEditor(scriptnumber);
				//将新打开的脚本暂存到缓存
				__TEMP_DEBUG_SCRIPT.scriptNumbers.push(scriptnumber);
  			}
  			//code编辑框
  			$(".code").parent().addClass("hidden");
			$("#"+scriptnumber).parent().removeClass("hidden");
			//将激活的脚本暂存到缓存
			__TEMP_DEBUG_SCRIPT.activedScript = scriptnumber;
			sessionStorage.setItem(__NOW_FORMNUMBER,JSON.stringify(__TEMP_DEBUG_SCRIPT));
  		});
  		//右键codeMirror面板
  		$(".scriptCode").on('contextmenu',".editcode",function(e){
	        var scriptNumber = __TEMP_DEBUG_SCRIPT.activedScript;
	        let editor = window.ScriptCodeEditors[scriptNumber];
			let expr = editor.doc.getSelection();
			if(!expr || expr==null || expr.trim==""){
				return false;
			}
			$(".operate").addClass("hidden");
	        $(".operate-codeMirror").removeClass("hidden").css({"top":e.clientY+"px","left":e.clientX+"px"});
	        //add-to-watches 将选中的文本添加到watch列表中
	        $("#add-to-watches").unbind().click(function(){
	        	var $watch =  $('.watch-expressions');
	  			// 如果没有展开，先展开页签
	  			if(!$watch.is(":visible")){
	  				$watch.siblings().trigger("click");
	  			}
	  			var $info = $watch.find('.info');
	  			if($info){
	  				$info.remove();
	  			}
	  			var $input = $watch.find('input');
	  			if($input){
	  				$input.parent().remove();
	  			}
	  			//获取当前点击的脚本文件名称
	        	var scriptNumber = __TEMP_DEBUG_SCRIPT.activedScript;
	        	if(!scriptNumber || scriptNumber==null){
	        		scriptNumber = $($("."+formnumber).find(".script_caption")[0]).text();
	        	}
	        	var fileName = scriptNumber + ".js";
                //将watch添加到缓存中
				var watches = __TEMP_DEBUG_SCRIPT.watches;
				var w = {
					fileName: fileName,
					expr: expr
				}
				watches.push(w);
				sessionStorage.setItem(__NOW_FORMNUMBER,JSON.stringify(__TEMP_DEBUG_SCRIPT));
				var tempObj = {};
				tempObj[expr] = '(not available)';
				updateWatches( null, null, tempObj, ".debug-content.watch-expressions", callback);
				// 步骤： 1. 增加watch  2. 立即执行获取watch
				$.post( URI.addWatch+"?debugId="+__DEBUG_ID+"&cmd=true", {debugId: __DEBUG_ID, scriptNumber: scriptNumber, expr: expr }, function(data) {
		      		if(data.success || data.success == 'true'){
		      			$.post( URI.getWatches+"?debugId="+__DEBUG_ID+"&cmd=true", {debugId: __DEBUG_ID}, function(w){
	        				if(w.success || w.success == 'true'){
	        					var watches = w.watches;
	        					if(watches && Object.keys(watches).length>0){
	        						$(".debug-content.watch-expressions").children().remove();
	        						for(var key in watches){
	        							if(key == __DEBUG_ID){
	        								delete watches[key];
	        							}
	        							if(watches[key] && typeof watches[key]=="string"){
											if(watches[key].indexOf("undefined")!=-1 || watches[key].indexOf("ReferenceError")!=-1){
												delete watches[key];
												watches[key] = '(not available)';
											}
										}
	        						}
	        						updateWatches( null, null, watches, ".debug-content.watch-expressions", callback);
	        					}
	        				}
	        			});
		      		}else{
        				alert('从服务器获取watch变量列表失败！');
        			}
		      	});
	        });
	        //复制选中的文本
	        $("#copy").unbind().click(function(){
	        	//copy(expr);
	        });
			return false;
  		});

  		//点击脚本页签
  		$(".scriptTitle").on('click',".active",function(e){
  			//关闭页签
  			if($(e.target).attr("class") == "close_btn"){
  				if(e.currentTarget == $(".scriptTitle").find(".actived")[0]){
  					$(".code").parent().addClass("hidden");
  					if($(e.currentTarget).prev().text() != ""){
  						$(e.currentTarget).prev().addClass("actived");
  						var scriptnumber = $(e.currentTarget).prev().find(".scriptname_tab").text();
  						__TEMP_DEBUG_SCRIPT.activedScript = scriptnumber;
  						//code编辑框
						$("#"+scriptnumber).parent().removeClass("hidden");
  					}else if($(e.currentTarget).next().text() != ""){
  						$(e.currentTarget).next().addClass("actived");
  						var scriptnumber = $(e.currentTarget).next().find(".scriptname_tab").text();
		  				__TEMP_DEBUG_SCRIPT.activedScript = scriptnumber;
		  				//code编辑框
						$("#"+scriptnumber).parent().removeClass("hidden");
  					}else{
  						$("#code").parent().removeClass("hidden");
  					}
  					//tree
  					$(".script").removeClass("selected");
					var treeChildren = $("."+formnumber).find(".script_caption");
					for (var i = 0; i < treeChildren.length; i++) {
						if($(treeChildren[i]).text() == scriptnumber){
							$(treeChildren[i]).closest(".script").addClass("selected");
						}
					}
  				}
  				//删除该脚本上的断点
				var currentScript = $(e.currentTarget).find(".scriptname_tab").text();
				window.ScriptCodeEditors[currentScript].clearGutter("breakpoints");
				var breakpoints = __TEMP_DEBUG_SCRIPT.breakpoints;
				var deleteBreakPoints = [];
				for(var i=0;i<breakpoints.length;i++){
					if(breakpoints[i].fileName.split(".js")[0] == currentScript){
						deleteBreakPoints.push(breakpoints[i]);
					}
				}
				for(var i=0;i<deleteBreakPoints.length;i++){
					var line = deleteBreakPoints[i].line;
					var source = deleteBreakPoints[i].source;
					var fileName = deleteBreakPoints[i].fileName;
					removeBreakpoint(line,source,fileName);
				}
				//删除该的脚本codemirror
				delete window.ScriptCodeEditors[currentScript];
				//删除页签
  				$(e.currentTarget).remove();
  				var currentScript = $(e.currentTarget).find(".scriptname_tab").text();
  				var scriptNumbers = __TEMP_DEBUG_SCRIPT.scriptNumbers;
  				for(var i=0;i<scriptNumbers.length;i++){
  					if(currentScript == scriptNumbers[i]){
  						scriptNumbers.splice(i,1);
  					}
  				}
  				sessionStorage.setItem(__NOW_FORMNUMBER,JSON.stringify(__TEMP_DEBUG_SCRIPT));
  			}else{
  				$(".active").removeClass("actived");
  				$(e.currentTarget).addClass("actived");
  				var scriptnumber = $(e.currentTarget).find(".scriptname_tab").text();
  				//tree
  				var treeChildren = $("."+formnumber).find(".script_caption");
  				for (var i = 0; i < treeChildren.length; i++) {
  					if($(treeChildren[i]).text() == scriptnumber){
  						$(".script").removeClass("selected");
  						$(treeChildren[i]).closest(".script").addClass("selected");
  					}
  				}
  				//code编辑框
	  			$(".code").parent().addClass("hidden");
				$("#"+scriptnumber).parent().removeClass("hidden");
				//将激活的脚本暂存到缓存
				__TEMP_DEBUG_SCRIPT.activedScript = scriptnumber;
				sessionStorage.setItem(__NOW_FORMNUMBER,JSON.stringify(__TEMP_DEBUG_SCRIPT));
  			}	
  		});
	}
	//页面有关闭子级页面事件
	function closeChildForm(){
		//退出子级页面调试环境
		if(__DEBUG_ID != null){
			step("exit");
		}
		//删除子级页面脚本树结构
		$("#"+__NOW_FORMNUMBER).parent().remove();
		//删除子级页面调试信息
		let tempscript = JSON.parse(sessionStorage.getItem(__NOW_FORMNUMBER));
		if(tempscript){
			//断点
			var breakpoints = tempscript.breakpoints;
	  		if(breakpoints && breakpoints.length > 0){
	  			for(var i=0;i<breakpoints.length;i++){
	  				var o = breakpoints[i];
				  	removeBreakpoint(o.line, o.source, o.fileName);
			  	}
			}
			//观察 watches
			var $watch =  $('.watch-expressions');
			$watch.children().remove();
			if(!$watch.children() || $watch.children().length == 0){
				$watch.append('<div class="info" style="padding-left: 10px;">No Watch Expressions</div>');
			}
			//变量
			var $variable =  $('.variable-expressions');
			$variable.children().remove();
			if(!$variable.children() || $variable.children().length == 0){
				$variable.append('<div class="info" style="padding-left: 10px;">No Variable Expressions</div>');
			}
			//页签和code面板
			var scriptNumbers = __TEMP_DEBUG_SCRIPT.scriptNumbers;
			if (scriptNumbers && scriptNumbers.length > 0) {
				for(var i=0;i<scriptNumbers.length;i++){
					var scriptNumber = scriptNumbers[i];
					//页签
		  			var tabs = $(".scriptTitle").find(".scriptname_tab");
		  			for (var i = 0; i < tabs.length; i++) {
		  				if($(tabs[i]).text() == scriptNumber){
		  					$(tabs[i]).closest(".active").remove();
		  				}
		  			}
		  			//code面板
					$("#"+scriptNumber).parent().remove();
					//激活父级页面脚本
					let newtempscript = JSON.parse(sessionStorage.getItem(__FORMNUMBERS[__FORMNUMBERS.length-2]));
					let newActivedScript = newtempscript.activedScript;
					if(newActivedScript && newActivedScript!=null){
						var tabs = $(".scriptTitle").find(".scriptname_tab");
			  			for (var i = 0; i < tabs.length; i++) {
			  				if($(tabs[i]).text() == newActivedScript){
			  					$(tabs[i]).closest(".active").addClass("actived");
			  				}
			  			}
			  			$("#"+newActivedScript).parent().removeClass("hidden");
			  			//tree
			  			var treeChildren = $("#main-left").find(".script_caption");
						if(treeChildren && treeChildren.length>0){
							for (var i = 0; i < treeChildren.length; i++) {
								if($(treeChildren[i]).text() == newActivedScript){
									$(treeChildren[i]).closest(".script").addClass("selected");
								}
							}
						}
					}else{
						$("#code").parent().removeClass("hidden");
					}
					
				}
			}
		}

		//父级页面调试信息
		if(__FORMNUMBERS[__FORMNUMBERS.length-1] == __NOW_FORMNUMBER){
			__FORMNUMBERS.pop();
			__NOW_FORMNUMBER = __FORMNUMBERS[__FORMNUMBERS.length-1];
		}
		__TEMP_DEBUG_SCRIPT = JSON.parse(sessionStorage.getItem(__NOW_FORMNUMBER));
		if(!__TEMP_DEBUG_SCRIPT || __TEMP_DEBUG_SCRIPT==null){
			__TEMP_DEBUG_SCRIPT = {
				pageId: null,
				debugId: null,
				scriptNumbers: [],
				activedScript: null,
				breakpoints: [],
				watches: [],
				breakpointState: 1
			};
		}
		__PAGE_ID = __TEMP_DEBUG_SCRIPT.pageId;
		__DEBUG_ID = __TEMP_DEBUG_SCRIPT.debugId;
		sessionStorage.setItem("debugId",__DEBUG_ID);
	}

	/**************************************************
	 *				 调试界面事件注册区域                    
	 *												  
	 *************************************************/
	//脚本树结构注册事件区域
	registerEvent("click", [{
		//展开脚本列表
		target: ".page",
		callback: function(e, args){
			e.stopPropagation();
			var $e = $(e.currentTarget);
			var $formArrowClass = $e.find(".formArrowClass");
			if($formArrowClass.hasClass("arrow_down")){
				$formArrowClass.removeClass("arrow_down").addClass("arrow_left");
				$e.parent().find(".script").addClass("hidden");
			}else{
				$formArrowClass.removeClass("arrow_left").addClass("arrow_down");
				$e.parent().find(".script").removeClass("hidden");
			}
		}
	}]);

	// 调试窗口菜单注册事件区域
	registerEvent("click", [{
		//打开控制台
		target: "#open-console",
  		callback: function(e, args){
  			e.stopPropagation();
  			var $console = $("#main-console");
  			var $source = $("#main-box");
  			if($console.hasClass("hidden")){
  				$console.removeClass("hidden");
  				$source.addClass("hidden");
  				Split(['#main-console'], {
  					direction: 'vertical',
  					sizes: [100],
  					gutterSize: 6
  				});
  				$("#open-console").addClass("consoleOpened");
  				$("#open-sources").removeClass("consoleOpened");
  			}
  		},
	},{
		//打开源码
		target: "#open-sources",
  		callback: function(e, args){
  			e.stopPropagation();
  			var $console = $("#main-console");
  			var $source = $("#main-box");
  			if(!$console.hasClass("hidden")){
  				$console.addClass("hidden");
  				$source.removeClass("hidden");
  				Split(['#main-box'], {
  					direction: 'vertical',
  					sizes: [100],
  					gutterSize: 6
  				});
  				$("#open-console").removeClass("consoleOpened");
  				$("#open-sources").addClass("consoleOpened");
  			}
  		},
	}
	]);
	
	// 单步调试执行注册事件区域 
	registerEvent("click", [{
		target: "#resume",
  		callback: function(e, args){
  			e.stopPropagation();
  			if($(this).find('span').hasClass("fa-resume")){
  				step("resume");
  			}
  		}
	},{
		target: "#stepOver",
	  	callback: function(e, args){
	  		e.stopPropagation();
	  		if($(this).find('span').hasClass("fa-over")){
  				step("stepOver");
  			}
	  	} 
	},{
		target: "#stepInto",
	  	callback: function(e, args){
	  		e.stopPropagation();
	  		if($(this).find('span').hasClass("fa-into")){
  				step("stepInto");
  			}
	  	} 
	},{
		target: "#stepOut",
	  	callback: function(e, args){
	  		e.stopPropagation();
	  		if($(this).find('span').hasClass("fa-out")){
  				step("stepOut");
  			}
	  	} 
	},{
		target: "#deactiveBreakpoint",
	  	callback: function(e, args){
	  		e.stopPropagation();
	  		var $this = $(this);
  			if(__TEMP_DEBUG_SCRIPT.breakpointState==breakpointState.deactivate){
  				$this.find('span').removeClass("fa-deactive").addClass("fa-active");
  				$this.find("a").attr("title", "Deactive breakpoints");
  				// 复选框全部激活
  				$(".list-breakpoint").removeClass("covering");
  			   	__TEMP_DEBUG_SCRIPT.breakpointState=breakpointState.activate;
  			   	sessionStorage.setItem(__NOW_FORMNUMBER,JSON.stringify(__TEMP_DEBUG_SCRIPT));
  			   	renderBreakpoints();
  			   	__NOW_BREAKPOINT = (new Date()).valueOf();
  			}else {
  				$this.find('span').removeClass("fa-active").addClass("fa-deactive");
  				$this.find("a").attr("title", "Active breakpoints");
				// 复选框全部冻结
			    $(".list-breakpoint").addClass("covering");
  			   	__TEMP_DEBUG_SCRIPT.breakpointState=breakpointState.deactivate;
  			   	sessionStorage.setItem(__NOW_FORMNUMBER,JSON.stringify(__TEMP_DEBUG_SCRIPT));
  			   	renderBreakpoints();
  			   	__NOW_BREAKPOINT = (new Date()).valueOf();
  			}
	  	} 
	}]);
	
	// watch注册事件区域
	registerEvent("click", [{
		// add-watch
		target: "#add-watch",
  		callback: function(e, args){
  			e.stopPropagation();
  			var $watch =  $('.watch-expressions');
  			// 如果没有展开，请帮我展开页签
  			if(!$watch.is(":visible")){
  				$watch.siblings().trigger("click");
  			}
  			var $info = $watch.find('.info');
  			if($info){
  				$info.remove();
  			}
  			var $input = $watch.find('input');
  			if($input){
  				$input.parent().remove();
  			}
  			var $div = $('<div class="watch-expression-title"><input type="text" class="debug-input"></div>');
  			var input = $div.appendTo($watch).find('input');
  			input.focus()
  			//回车 enter
  			input.keydown(function(e) {
  		        if (e.keyCode == 13) {
  		        	//fileName
  		        	var scriptNumber = __TEMP_DEBUG_SCRIPT.activedScript;
  		        	if(!scriptNumber || scriptNumber==null){
  		        		scriptNumber = $($(".maintree").find(".script_caption")[0]).text();
  		        	}
  		        	var fileName = scriptNumber + ".js";
  		        	var $input = $(this);
  		        	var expr = $input.val();
  		        	$div.remove();
  	                if(expr == null || expr.trim() == '') {
  	                	return;
  	                }
  	                //将watch添加到缓存中
					var watches = __TEMP_DEBUG_SCRIPT.watches;
					var w = {
						fileName: fileName,
						expr: expr
					}
					watches.push(w);
					sessionStorage.setItem(__NOW_FORMNUMBER,JSON.stringify(__TEMP_DEBUG_SCRIPT));
					var tempObj = {};
					tempObj[expr] = '(not available)';
					updateWatches( null, null, tempObj, ".debug-content.watch-expressions", callback);
					// 步骤： 1. 增加watch  2. 立即执行获取watch
					$.post( URI.addWatch+"?debugId="+__DEBUG_ID+"&cmd=true", {debugId: __DEBUG_ID, scriptNumber: scriptNumber, expr: expr }, function(data) {
			      		if(data.success || data.success == 'true'){
			      			$.post( URI.getWatches+"?debugId="+__DEBUG_ID+"&cmd=true", {debugId: __DEBUG_ID}, function(w){
  		        				if(w.success || w.success == 'true'){
		        					var watches = w.watches;
		        					if(watches && Object.keys(watches).length>0){
		        						$(".debug-content.watch-expressions").children().remove();
		        						for(var key in watches){
		        							if(key == __DEBUG_ID){
		        								delete watches[key];
		        							}
		        							if(watches[key] && typeof watches[key]=="string"){
												if(watches[key].indexOf("undefined")!=-1 || watches[key].indexOf("ReferenceError")!=-1){
													delete watches[key];
													watches[key] = '(not available)';
												}
											}
		        						}
		        						updateWatches( null, null, watches, ".debug-content.watch-expressions", callback);
		        					}
		        				}
  		        			});
			      		}else{
	        				alert('从服务器获取watch变量列表失败！');
	        			}
			      	});
				}  
  			});  
  		}
	},{
		//刷新watch列表
		target: "#refresh-watch",
	  	callback: function(e, args){
	  		e.stopPropagation();
  		    $.post( URI.getWatches+"?debugId="+__DEBUG_ID+"&cmd=true", {debugId: __DEBUG_ID}, function(w){
				if(w.success || w.success == 'true'){
					var watches = w.watches;
					if(watches && Object.keys(watches).length>0){
						$(".debug-content.watch-expressions").children().remove();
						for(var key in watches){
							if(key == __DEBUG_ID){
								delete watches[key];
							}
							if(watches[key] && typeof watches[key]=="string"){
								if(watches[key].indexOf("undefined")!=-1 || watches[key].indexOf("ReferenceError")!=-1){
									delete watches[key];
									watches[key] = '(not available)';
								}
							}
						}
						updateWatches( null, null, watches, ".debug-content.watch-expressions", callback);
					}
				}
			});
        	//刷新观察watch列表
	  		refreshWatches();
	  	}
	}]);
	
	// 控制台事件注册事件区域
	registerEvent("click", [{
		//清空控制台
		target: "#clear-console",
  		callback: function(e, args){
  			var $this = $(this);
  			$this.parents("div[role='navigation']").siblings().remove();
  			intialConsolePanel();
  		}
	},{
		//关闭控制台
		target: "#close-console",
	  	callback: function(e, args){
  			var $this = $(this);
  			var $parents = $this.parents("#main-console");
  			$parents.addClass("hidden");
  			$parents.prev(".gutter.gutter-vertical").remove();
  			Split(['#main-box'], {
  				direction: 'vertical',
  				sizes: [100],
  				gutterSize: 6
  			});
  			$("#open-console").removeClass("consoleOpened");
  			$("#open-sources").addClass("consoleOpened");
	  	}
	}]);

	// 调试信息右键事件注册事件区域
	registerEvent("contextmenu", [{
		//breakpoint  断点
		target: ".list-breakpoint",
  		callback: function(e, args){
  			e.preventDefault();
			//断点右键菜单项
			if(__TEMP_DEBUG_SCRIPT.breakpointState==breakpointState.deactivate){
				$("#deactivate-breakpoints").addClass("hidden");
				$("#activate-breakpoints").removeClass("hidden");
			}else {
				$("#deactivate-breakpoints").removeClass("hidden");
				$("#activate-breakpoints").addClass("hidden");
			}
			var o = __TEMP_DEBUG_SCRIPT.breakpoints;
			var enable ;
			var disable ;
			for(var i=0;i<o.length;i++){
				if(o[i].state==State.enable){
					enable=true;
				}else if(o[i].state==State.disable){
					disable=true;
				}
			}
			if(!disable && enable){
				$("#enable-all-breakpoints").addClass("grayness");
				$("#disable-all-breakpoints").removeClass("grayness");
			}else if(!enable && disable){
				$("#disable-all-breakpoints").addClass("grayness");
				$("#enable-all-breakpoints").removeClass("grayness");
			}else{
				$("#disable-all-breakpoints").removeClass("grayness");
				$("#enable-all-breakpoints").removeClass("grayness");
			}
			$(".operate").addClass("hidden");
	        $(".operate-breakpoint").removeClass("hidden").css({"top":e.clientY+"px","left":e.clientX+"px"});
	        $(".every-breakpoint").removeClass("selected");
	        var breakpoint = $(e.target).closest(".every-breakpoint");
	        breakpoint.addClass("selected");
	        //delete breakpoint  删除断点
	        $("#remove-breakpoint").unbind().click(function(){
	        	var fileName = breakpoint.find("span").text().split(":")[0];
	        	var lineno = breakpoint.find("span").text().split(":")[1];
	        	var line = breakpoint.find("span").text();
	        	var source = breakpoint.find(".source-text").text();
	        	removeBreakpoint(line, source, fileName);
	        	//同步codemirror
	        	var editor = window.ScriptCodeEditors[fileName.split(".js")[0]];
	        	editor.setGutterMarker(lineno - 1,"breakpoints", null);
	        });
	        //delete all breakpoints 删除所有断点
	        $("#remove-all-breakpoints").unbind().click(function(){
	        	$(".every-breakpoint").remove();
	        	$ol = $(".list-breakpoint").find("ol")
				$ol.append('<div class="info" style="padding-left: 10px;">No Breakpoints</div>');
	        	//$(e.currentTarget).siblings().trigger("click");
	        	var breakPoints = __TEMP_DEBUG_SCRIPT.breakpoints;
	        	var scriptNumbers = [] ;
	        	for(var i=0;i<breakPoints.length;i++){
	        		var scriptNumber = breakPoints[i].fileName.split(".js")[0];
	        		if(scriptNumbers.indexOf(scriptNumber)==-1){
	        			scriptNumbers.push(scriptNumber);
	        		}
	        	}
	        	//同步codemirror
	        	for(var i=0;i<scriptNumbers.length;i++){
	        		var editor = window.ScriptCodeEditors[scriptNumbers[i]];
	        		editor.clearGutter("breakpoints");
	        	}
	        	__TEMP_DEBUG_SCRIPT.breakpoints = [];
	        	sessionStorage.setItem(__NOW_FORMNUMBER,JSON.stringify(__TEMP_DEBUG_SCRIPT));
	        	__NOW_BREAKPOINT = (new Date()).valueOf();
	        });
	        //Deactivate breakpoints 冻结断点
	        $("#deactivate-breakpoints").unbind().click(function(){
	        	$("#deactiveBreakpoint").find('span').addClass("activate-button");
					$("#deactiveBreakpoint").find("a").attr("title", "Active breakpoints");
	        	$(".list-breakpoint").addClass("covering");
  			   	__TEMP_DEBUG_SCRIPT.breakpointState=breakpointState.deactivate;
  			   	sessionStorage.setItem(__NOW_FORMNUMBER,JSON.stringify(__TEMP_DEBUG_SCRIPT));
  			   	__NOW_BREAKPOINT = (new Date()).valueOf();
  			   	renderBreakpoints();
	        });
	        //Activate breakpoints  激活断点
	        $("#activate-breakpoints").unbind().click(function(){
	        	$("#deactiveBreakpoint").find('span').removeClass("activate-button");
					$("#deactiveBreakpoint").find("a").attr("title", "Deactive breakpoints");
	        	$(".list-breakpoint").removeClass("covering");
  			   	__TEMP_DEBUG_SCRIPT.breakpointState=breakpointState.activate;
  			   	sessionStorage.setItem(__NOW_FORMNUMBER,JSON.stringify(__TEMP_DEBUG_SCRIPT));
  			   	__NOW_BREAKPOINT = (new Date()).valueOf();
  			   	renderBreakpoints();
	        });
	        //Enable all breakpoints 启用所有断点
	        $("#enable-all-breakpoints").unbind().click(function(){
        		var bp = __TEMP_DEBUG_SCRIPT.breakpoints;
        		for(var i=0;i<bp.length;i++){
        			if(bp[i].state == State.disable){
        				bp[i].state=State.enable;
        			}
        		}
        		sessionStorage.setItem(__NOW_FORMNUMBER,JSON.stringify(__TEMP_DEBUG_SCRIPT));
        		__NOW_BREAKPOINT = (new Date()).valueOf();
	        	var inputs = $(".list-breakpoint").find("input");
	        	for(var i=0;i<inputs.length;i++){
	        		if(!($(inputs[i]).prop("checked"))){
	        			$(inputs[i]).prop("checked",true);
	        		}
	        	}
	        	renderBreakpoints();
	        });
	        //Disable all breakpoints 禁用所有断点
	        $("#disable-all-breakpoints").unbind().click(function(){
	        	var bp = __TEMP_DEBUG_SCRIPT.breakpoints;
        		for(var i=0;i<bp.length;i++){
        			if(bp[i].state == State.enable){
        				bp[i].state=State.disable;
        			}
        		}
        		sessionStorage.setItem(__NOW_FORMNUMBER,JSON.stringify(__TEMP_DEBUG_SCRIPT));
        		__NOW_BREAKPOINT = (new Date()).valueOf();
	        	var inputs = $(".list-breakpoint").find("input");
	        	for(var i=0;i<inputs.length;i++){
	        		if($(inputs[i]).prop("checked")){
	        			$(inputs[i]).removeAttr("checked");
	        		}
	        	}
	        	renderBreakpoints();
	        });
  		}
  	},{
  		//watch  观察
  		target: ".watch-expressions",
  		callback: function(e, args){
  			e.preventDefault();
			$(".operate").addClass("hidden");
	        $(".operate-watch").removeClass("hidden").css({"top":e.clientY+"px","left":e.clientX+"px"});
	        $(".variable-expression-title").removeClass("selected");
	        var watch = $(e.target).closest(".variable-expression-title");
	        watch.addClass("selected");
	        //添加观察
	        $("#addnew-watch").unbind().click(function(){
	        	$(".variable-expression-title").removeClass("selected");
	        	$("#add-watch").trigger("click");
	        });
	        //删除观察
	        $("#remove-watch").unbind().click(function(){
	        	watch.find(".debug-minus").trigger("click");
	        });
	        //删除所有观察
	        $("#remove-all-watches").unbind().click(function(){
	        	$(".variable-expression-title").remove();
	        	refreshWatches();
	        	__TEMP_DEBUG_SCRIPT.watches = [];
	        	sessionStorage.setItem(__NOW_FORMNUMBER,JSON.stringify(__TEMP_DEBUG_SCRIPT));
	        });
  		}
  	}]);

	//点击页面
	registerEvent("click", [{
		//breakpoint
		target: "#main",
  		callback: function(e, args){
  			//关闭调试信息列表右键弹出的菜单项
    		$(".operate").addClass("hidden");
		    $(".every-breakpoint").removeClass("selected");
    		//关闭新增观察watch 的输入框
    		//右键点击新增不刷新
    		if(e.target != $("#addnew-watch")[0] && e.target != $("#addnew-watch").find("span")[0]){
    			//点击输入框不刷新
    			if(e.target != $(".debug-input")[0]){
    				refreshWatches();
    			}
    		}
  		}
	}]);
	// 设置快捷键
	document.onkeydown = function(e){
		var keyCode=e.keyCode||e.which;
		if(keyCode == "119"){ // F8 下一个断点
			$("#resume").trigger("click");
		}else if(keyCode == "121"){ // F10 下一步
			$("#stepOver").trigger("click");
		}else if(keyCode == "122"){ // F11 进入方法
			$("#stepInto").trigger("click");
		}else if(keyCode == "123"){ // F12 跳出方法
			$("#stepOut").trigger("click");
		}else if(keyCode == "120"){ // F9 冻结/激活所有断点
			$("#deactiveBreakpoint").trigger("click");
		}
	};

	/**
	 * 为dom注册事件
	 * e代表事件，比如click
	 * options是一个对象数组，格式：
	 * [{
	 * 		target: "#element",
	 * 		args: {},
	 * 		callback: function(e, data){
	 * 			
	 * 		}
	 * },{
	 * 		....
	 * }]
	 */
	function registerEvent(e, options){
		if(!options) return;
		if(typeof options == 'object' && $.isArray(options)){
			$.each(options, function(i, o){
				register(e, o);
			})
		}else if(typeof options == 'object' && typeof options != 'function'){
			register(e, options);
		}
		
		function register(e, option){
			var target = option.target;
			var args = option.args || {};
			var callback = option.callback;
			if(typeof callback != 'function' || !target) return;
			$(target).bind(e, function(event){
				callback.call(this, event, args);
			});
		}
	}

	//定义的url请求
	var URI = {
		base: "/" + location.pathname.split("/")[1]
	};
	URI.debug = URI.base + "/serverscript/debug.do";
	URI.debugCmd = URI.base + "/serverscript/debugCommand.do";
	URI.addWatch = URI.base + "/serverscript/addWatch.do";
	URI.removeWatch = URI.base + "/serverscript/removeWatch.do";
	URI.getWatches = URI.base + "/serverscript/getWatches.do";
	URI.eval = URI.base + "/serverscript/eval.do";
	URI.addBreakpoint = URI.base + "/serverscript/addBreakpoint.do";
	URI.removeBreakPoint = URI.base + "/serverscript/removeBreakPoint.do";
	URI.initialize = URI.base + "/serverscript/initialize.do";
	URI.getUUID = URI.base + "/serverscript/getUUID.do";
	URI.updateBreakPoint = URI.base + "/serverscript/updateBreakPoint.do";
	URI.getAtCurrentBreakPoint = URI.base + "/serverscript/getAtCurrentBreakPoint.do";
	URI.keepAlive = URI.base + "/serverscript/keepAlive.do";
	URI.getScriptLogs = URI.base + "/serverscript/getScriptLogs.do";

	// 常量定义和变量定义区域
	var __DEBUG_ID = null;
	var __PAGE_ID = null;
	var __LASTBREAKLINE = null;
	//当前和上一个页面编码
	var __FORMNUMBERS = new Array("tempscript");
	var __NOW_FORMNUMBER = "tempscript";
	// 记录上一行调试高亮行位置，清除使用
	//__PRE_LINE_INFO: scriptnumber, line, handle
	var __PRE_LINE_INFO = null;
	//记录上一次和现在断点变化的时间戳
	var __PRE_BREAKPOINT = (new Date()).valueOf();
	var __NOW_BREAKPOINT = __PRE_BREAKPOINT;
	//脚本信息
	//breakpoint：lineno,line,tate,fileName,source
	//watch: fileName,expr
	var __TEMP_DEBUG_SCRIPT = {
		pageId: null,
		debugId: null,
		scriptNumbers: [],
		activedScript: null,
		breakpoints: [],
		watches: [],
		breakpointState: 1
	};
	//记录输出控制台输入的历史记录
	var __TEMP_CONSOLE_RECORD = [];
	//记录当前显示第几条历史记录
	var __TEMP_RECORD_SEQ = -1;
	//codeMirror行前，断点样式
	var BreakPoint = {
		enable: "●",
		disable: "o"
	};
	//单个断点是否可用
	var State = {
		disable : -1,
		enable: 1
	};
	//所有断点信息是否冻结
	var breakpointState = {
		deactivate : -1,
		activate: 1
	};
	
})(window, jQuery);
