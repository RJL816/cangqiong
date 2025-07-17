define([
	"jquery",
	"jqTmpl",
	"js/layer.js",
	"js/pako.min.js",
	"js/getModule.js",
	"js/fileModule.js",
	"js/setProperty.js",
	"js/setSpecProperty.js",
	"js/formatTable.js",
	"js/dataMapping.js",
	"plugin/swiper-bundle.min.js",
	"text!../pages/control.htm",
	"text!../pages/fileTree.htm",
	"text!../pages/dialog.htm",
	"text!../pages/fileDialog.htm",
	"text!../pages/fileProperty.htm",
	"text!../pages/controlList.htm",
	"text!../pages/selectApp.htm",
], function($, jqTmpl, layer, pako, getModule, fileModule, setProperty, setSpecProperty, formatTable,dataMapping, Swiper, controlTmpl,fileTree,dialogTmpl,fileDialogTmpl,filePropertyTmpl,controlListTmpl,selectAppTmpl) {
	return {
		count: 0,
		vcount:1,
		mainObj: {},
		viewMain: {},
		formatXML: {},
		global_reminder: "",
		srcFlag: null,
		saveParam: {},
		commonProperties:[],
		commonPropIds:[],
		controlsMap: [],
		currentEnv:"",
		currentApp:"",
		prevpath:'',
		swiperobj:{},
		allowEdit:true,
		dropact:false,
		singleWidgets: ["creator","modifier","createdate","mltext","modifydate","mobilesearch","scancode","searcher","date","textarea","radio","number","datetime","price", "amount","html","text","auxpty","sku","image","qty","code","bottom","button","checkbox","editor","a","selectdata","menubutton","blank","navtab", "starscore", "countdown", "tabbaritem", 'palette', "admindivision", "searchhistory", "kswitch", "richtext", "imageupload", "step","label","img", "currency"],
		boxWidgets: ["view","pageview","chart","attachmentList","select","filtertabgroup","simplefilter","filtertab","filter","checkboxgroup","menubuttongroup","radiogroup","linkgroup","datagrid","panel","toolbar","tab","navtabgroup","scroller","latticerowpanel","tabgroup","bottomgroup","fields", "appmain", "flexpanel", "tabbar", "switchtabbar", "switchtabbaritem", "switchtabbarcitem", "leftslipbuttongroup", "groupfooter", "steps","queryfilter", "defaultfilter", "morefilter"],
		init: function() {
			var _self = this;
			if (window.location.href.match('/isv/')){
			    _self.prevpath = window.location.href.split('/isv/')[0];
            } else if (window.location.href.match('/kingdee/')){
                _self.prevpath = window.location.href.split('/kingdee/')[0];
            } else {
                _self.prevpath = window.location.origin;
            }
			//$("#input-reminder ul").css("visibility", "hidden");
			// $('.show-xmlOver').hide();
			_self.currentApp = localStorage.getItem('currentApp') || '';
			_self.getCurrentEnv();
			_self.getApps();
			_self.loadReminderText();
			_self.initEvents();
			_self.initTemplate();
			setInterval(function(){
				_self.refreshLoginStatus();
			},1200000);
			setSpecProperty.initEvents();
		},
		initTemplate:function(){
			var _self=this;
			_self.getControls();
			_self.updateFileHistory();
			_self.getFiles();
		},
		initEvents: function() { //registry event
			var _self = this;
			/**
			 * left toolbar menu event
			 */
			document.onkeydown = function(e){
			    if(_self.allowEdit && (e.keyCode === 8 || e.keyCode === 46) && !$('.show-container [data-item].show #view').hasClass('hide') && e.target.nodeName === "BODY"){
					var file_id,mainHtml,mainXml,viewid;
			    	file_id = $('.tab.active').attr("file_id");
			    	viewid = _self.returnXML($('.show .view').not('.hide').find('.focus-layer')[0]);
			    	mainHtml = _self.getMain(file_id+"_html");
					mainXml = _self.getMain(file_id);
					var parentNodes = $(mainHtml).find('[viewid="'+viewid+'"]').parents('[xml]');
					if($(mainHtml).find('[viewid="'+viewid+'"]').attr('xml')){
						$(mainHtml).find('[viewid="'+viewid+'"]').remove();
					}else{
						parentNodes = $(mainHtml).find('[viewid="'+viewid+'"]').closest('[xml]').parents('[xml]')
						$(mainHtml).find('[viewid="'+viewid+'"]').closest('[xml]').remove();
					}
					$(mainXml).find('[viewid="'+viewid+'"]').remove();
					if(parentNodes[0] && !$(parentNodes[0]).children('[xml]').length) {
						handleEmptyClass($(parentNodes[0]), $(parentNodes[0]).attr('xml'))
					}
					_self.mainObj[file_id+"_html"] = mainHtml;
					_self.mainObj[file_id] = mainXml;
			    }
			}
			$("body").on('click',function(e){
				if($(e.target).closest('.control-list').length<1 && $(e.target).closest('.control-search').length<1){
					$('.control-list').addClass('hide');
				}
				if($(this).closest('.right-fn-box').length<1){
					$('.right-fn-box').hide();
				}
				if($(this).closest('.right-package-box').length<1){
					$('.right-package-box').hide();
				}
			});
			$("body").on('click','#menu,.view_top,.file-action-list',function(e){
				if(document.body.clientWidth<1300 && $('.right-toggle').hasClass('expand')){//收起右边
					$('.right-toggle').removeClass('expand');
					$('.file-panel p.title span[refresh]').addClass('hide')
					$('.right-toggle').animate({right: 0},'fast');
				    $('#right-property-list').animate({width: 0},'fast');
				}
			});
			$("body").on('click','#menu li',function(){
				if($(this).closest('.menu-link-left').length>0){
					$(this).addClass('active').siblings('li').removeClass('active');
					$('.menu-content ul').addClass('hide');
					$('.menu-link-left li.active').each(function(i,v){
						var category = $(v).attr("link-category");
						$('.menu-content ul[category="'+category+'"]').removeClass('hide');
					});
				}else{
					$(this).addClass('active').siblings('li').removeClass('active');
				}
			});
			$("body").on("dragstart", '#menu li',function(ev) {
				_self.dropact = false;
				ev = ev.originalEvent;
				ev.dataTransfer.setData("obj", _self.getAttributesList(ev.target));
				ev.dataTransfer.setData("temp", ev.target.getAttribute('node'));
			});
			$("body").on("dragstart", '.show-container [xml]',function(ev) {
				_self.dropact = false;
				var viewId = _self.returnXML(ev.target);
				ev = ev.originalEvent;
				$(ev.target).addClass('viewDragTarget');
				ev.dataTransfer.setData("obj", _self.getAttributesList(ev.target));
				ev.dataTransfer.setData("temp", ev.target.getAttribute('xml'));
				ev.dataTransfer.setData("idInView", viewId);
			});
			$("body").on("click", '.selectAppDialog li',function(e) {
				$(this).addClass('active').siblings('li').removeClass('active');
			});
			/**
			 * middle container event
			 */
			$('.tab-container').on('click', '.tab', function() {
				var file_id = $(this).attr("file_id"),curFile,data,dflag,expandFlag,curNode,id,name;
				curNode = _self.mainObj[file_id];
				curFile = $('#right-property-list .file-box').find('[id="'+file_id+'"]');
				$(this).addClass('active').siblings().removeClass('active');
				_self.changeView(file_id);
				if(curFile.length>0){
					dflag = true;
					id = curFile.attr('id');
					name = curFile.attr('name');
					if($('.tab[file_id="'+curFile.attr('id')+'"]').attr('fileflag') === "expand"){
						expandFlag = true;
					}
				}else{
				    dflag = false;
					data = _self.mainObj[file_id+"_data"];
					expandFlag = (data && data['appendId']&&data['appendId'].trim().length>0) ? true : false;
					id = $(this).attr("file_id");
				    name = $('.tab.active').text();
				}
				data = {
				   'id':id,
				   'name':name,
				   'expand' : expandFlag,
				   'disable' : dflag,
				   'plugin': curNode.getAttribute('plugin'),
				   'ao': curNode.getAttribute('ao'),
				   'bo': curNode.getAttribute('bo'),
				   'tablename': curNode.getAttribute('tablename'),
				   'pkfield': curNode.getAttribute('pkfield'),
				   'datatype': curNode.getAttribute('datatype'),
				   'extendModel': curNode.getAttribute('extend'),
				   'needlogin': curNode.getAttribute('needlogin'),
				   'logintype': curNode.getAttribute('logintype')
				}
				_self.updateFilePPanel(data);
				$('.node-property .property').empty();
				$('#right-property-list [link-panel="property"]').trigger('click');
				$('.focus-layer').removeClass('focus-layer');
				$('.box-focus').removeClass('box-focus');
				$('.box-edit').hide();
				$('.box-edit-line').hide();
			});
			$('.tab-container').on('click', '.close', function() {
				var tag = $(this).parent();
				_self.closeDialog("关闭文件","确定关闭文件吗?",{'close-id':tag.attr("file_id")});
			});
			$('.tab-container .tab-new').on('mouseover',function(){
				$(this).find('ul').show();
			});
            $('.tab-container .tab-new').on('mouseleave',function(){
            	$(this).find('ul').hide();
			});
			$('.tab-container .tab-new li,.top-new').on('click', function(e,ctype) {
				var newFromTop = false,file_id,index,tabChildren,len,type,data;
				type = ctype ? ctype : $(this).attr("createType");
				type = type ? type : "listView";
				tabChildren = $(".tab-container").find('li').not('.create-fun-list li');
				len = tabChildren.length;
				if(e.currentTarget.className.indexOf('top-new') !== -1) {
					newFromTop = true;
				} else {
					newFromTop = false;
				}
				if(len > 0) {
					if(e.pageX > (tabChildren[len - 1].offsetLeft + 180) || newFromTop) {
						index = len + 1;
					}
				} else {
					index = 1;
				}
				data = {
						title:"新建文件",
						flag:"create",
						type:type,
						datas:[{
							id:"fileId_v",
							name:"页面ID",
							placeholder:"请输入页面ID",
							type:"input",
							value:"",
							required:true,
							disabled:false
						},{
							id:"displayName_v",
							name:"页面名称",
							placeholder:"请输入页面名称",
							type:"input",
							value:"",
							required:true,
							disabled:false
						},{
							id:"datatype_v",
							name:"数据模式",
							type:"select",
							options:["basedata","billdata","custom"],
							required:false,
							disabled:false
						},{
							id:"extendModel_v",
							name:"继承模板",
							type:"select",
							options:["无","epfp_basebillview"],
							required:false,
							disabled:false
						},{
							id:"platform_v",
							name:"平台",
							type:"radiogroup",
							value:"pc",
							groups:["pc","mobile"],
							required:false,
							disabled:false
						},{
							id:"needlogin_v",
							name:"登录",
							value:false,
							type:"checkbox",
							required:false,
							disabled:false
						},{
							id:"logintype_v",
							name:"登录类型",
							type:"select",
							options:["nextcloud","member"],
							required:false,
							disabled:false
						}]
				};
				_self.createDialog(data);
			});

			$(".show-container").on("dragover", '[xml]', function(ev) {
				console.log("left:"+ev.originalEvent.pageX+",top:"+ev.originalEvent.pageY);
				if(!_self.allowEdit) return;
				var data,name;
				ev.preventDefault();
				if($(this).attr('xml')) {
					$(this).addClass('over-xml');
					$('.show-container div').not($(this)).removeClass('over-xml');
					data = JSON.parse($(this).attr('data'));
					name = data['name'] ? data['name']:$('#menu .menu-content').find('[node="'+data['xml']+'"]').attr("name");
					name = name ? name : $(this).attr("xml");
					// $('.show-xmlOver').text(name);
					var h = ($(this).height() + $(this)[0].offsetTop) / 2;
					// $('.show-xmlOver').css({
					// 	"top": h + 'px'
					// });
					// $('.show-xmlOver').show();
					ev.stopPropagation();
				}
			});

			$(".show-container").on("drop", '#view', function(ev) {
				$('.box-focus').removeClass('box-focus');
				$('.box-edit').hide();
				$('.box-edit-line').hide();
				if(_self.dropact) return false
				var file_id,mainHtml,mainXml,locFlag,targetXMLName,targetWidget,obj,temp,ele,specEle,finalXml,viewId;
				ev = ev.originalEvent;
				file_id = $(ev.target).closest('.show').attr('file_id');
				mainHtml = _self.getMain(file_id+"_html");
				mainXml = _self.getMain(file_id);
				obj = JSON.parse(ev.dataTransfer.getData("obj"));
				locFlag = false;
				targetXMLName = "view";
				if($(ev.target).attr('xml')){
					targetWidget = $(ev.target);
				}else{
					targetWidget = $(ev.target).closest('[xml]');
				}
				targetXMLName = targetWidget.attr('xml').toLowerCase();
				$('.show-container .over-xml').removeClass('over-xml');
				// $('.show-xmlOver').hide();
				temp = ev.dataTransfer.getData("temp");
				viewId = _self.returnXML(targetWidget[0]);
				let targetPos = _self.getInsetPos(targetXMLName, temp,ev)
				if(ev.dataTransfer.getData("idInView")){
					ele = $('.show #view').find('.viewDragTarget').removeClass('viewDragTarget')[0];
					finalXml = $(mainXml).find('[viewid="'+ev.dataTransfer.getData("idInView")+'"]');
					var parentNodes = $(mainHtml).find('[viewid="'+ev.dataTransfer.getData("idInView")+'"]').parents('[xml]');
					if($(mainHtml).find('[viewid="'+ev.dataTransfer.getData("idInView")+'"]').attr('xml')){
						$(mainHtml).find('[viewid="'+ev.dataTransfer.getData("idInView")+'"]').remove();
					}else{
						parentNodes = $(mainHtml).find('[viewid="'+ev.dataTransfer.getData("idInView")+'"]').closest('[xml]').parents('[xml]')
						$(mainHtml).find('[viewid="'+ev.dataTransfer.getData("idInView")+'"]').closest('[xml]').remove();
					}
					$(mainXml).find('[viewid="'+ev.dataTransfer.getData("idInView")+'"]').remove();
					if(parentNodes[0] && !$(parentNodes[0]).children('[xml]').length) {
						handleEmptyClass($(parentNodes[0]), $(parentNodes[0]).attr('xml'))
					}
				}else{
					var parentXmls = []
					if(targetXMLName === 'panel' &&( ['selectdata', 'creator', 'modifier', 'currency', 'unit', 'select', 'billstatus'].includes(obj.xml) || $.inArray(obj.xml,_self.singleWidgets) !== -1) && _self.platform === 'pc') {
						obj.cols24 = '6'
					}
					if(targetPos) {
						let node1 = targetWidget.parents('[xml=datagrid]')
						let node2 = targetWidget.parents('[xml=fileds]')
						if(node1 && node1.attr('xml')) {
							parentXmls.push(node1.attr('xml'))
						}
						if(node2 && node2.attr('xml')) {
							parentXmls.push(node2.attr('xml'))
						}
						if(targetPos === 'insert') {
							parentXmls.push(targetXMLName)
						}
					}
					ele = getModule.whichModule(obj,temp, undefined, parentXmls);
					ele.setAttribute("draggable",true);
					// if(ele && obj.xml==='datagrid' && _self.platform === 'pc') {
					// 	ele =$(ele).find('[xml]')[0]
					// } 
					specEle = _self.getSpecEle(obj,temp);
					if(specEle && specEle['node']){
						specEle['node'].setAttribute("draggable",true);
						$(ele).append(specEle['node']);
					}
					if(ele){
						if($(ele).attr('xml')){
							finalXml = _self.createXML(ele)
						} else {
							finalXml = _self.createXML($(ele).find('[xml]')[0])
						}
					}
					if(specEle && specEle['xml']){$(finalXml).append(specEle['xml']);}
				}
				
				/* if($.inArray(targetXMLName,_self.singleWidgets) !== -1){//放置位置的节点是单元节点
					locFlag = false;//向单元组件前追加
					targetWidget.before(ele);
					$(mainXml).find('[viewid="' + viewId + '"]').before(finalXml);
				}else if($.inArray(targetXMLName,_self.boxWidgets) !== -1){//放置位置的节点是可包含单元节点的组合节点
					if(temp === targetXMLName || ($.inArray(temp,['radiogroup','checkboxgroup'])!==-1 && $.inArray(targetXMLName,['radiogroup','checkboxgroup'])!==-1)){
						locFlag = false;//两个相同控件的复合组件，添加到与复合组件同级前一个
						targetWidget.before(ele);
						$(mainXml).find('[viewid="' + viewId + '"]').before(finalXml);
					}else{
						locFlag = true;//添加到复合组件内部最后一个
						"datagrid" === targetXMLName ? targetWidget.find('[viewid="' + viewId + '"]').find('.fields-table').before(ele) : (targetWidget.attr('viewid') ? targetWidget.append(ele) : targetWidget.find('[viewid="' + viewId + '"]').append(ele));
						"datagrid" === targetXMLName ? $(mainXml).find('[viewid="' + viewId + '"]').find('fields').before(finalXml) : $(mainXml).find('[viewid="' + viewId + '"]').append(finalXml);
					}
				} */
				// 为需要添加占位符的盒子组件添加占位符
				handleEmptyClass($(ele), obj.xml ==='datagrid' ? 'fields' : obj.xml)
				if(_self.singleWidgets.includes(obj.xml)) {
					$(finalXml).attr('singletag', true)
				}
				if(targetPos === 'before') {
					//放置位置的节点是单元节点 || 放置位置的节点是可包含单元节点的组合节点
					locFlag = false;//向单元组件前追加 || 两个相同控件的复合组件，添加到与复合组件同级前一个
					targetWidget.before(ele);
					$(mainXml).find('[viewid="' + viewId + '"]').before(finalXml);
				} else if(targetPos === 'after'){
					//放置位置的节点是单元节点 || 放置位置的节点是可包含单元节点的组合节点
					locFlag = false;//向单元组件后追加 || 两个相同控件的复合组件，添加到与复合组件同级后一个
					targetWidget.after(ele);
					$(mainXml).find('[viewid="' + viewId + '"]').after(finalXml);
				}else if(targetPos === 'insert'){
					locFlag = true;//添加到复合组件内部最后一个
					if(targetXMLName === 'switchtabbaritem' || targetXMLName === 'switchtabbarcitem') {
						targetWidget.find('.tab-name').addClass('hide')
						targetWidget.find('.tab-content').removeClass('hide')
						targetWidget.find('.tab-content').append(ele)
					} else if(targetXMLName === 'tab') {
						targetWidget.find('.tab-content').append(ele)
					} else if((targetXMLName === 'datagrid' || targetXMLName === 'fields')&& $('.show-container .show>.view')[0].getAttribute('platform')==='mobile') {
						if(obj.xml === 'leftslipbuttongroup') {
							if(!targetWidget.find('.fields-content').parent().hasClass('allow-left-move')) {
								var fieldsContentElem = targetWidget.find('.fields-content')
								var allowLeftMoveElem = $(document.createElement('div')).addClass('allow-left-move')
								targetWidget.find('.fields-content').after(allowLeftMoveElem)
								targetWidget.find('.fields-content').remove()
								allowLeftMoveElem.append(fieldsContentElem)
							}
							targetWidget.find('.fields-content').after(ele)
						} else {
							targetWidget.find('.fields-content').append(ele)
						}
					} else if(/filter$/.test(targetXMLName) && _self.platform === 'mobile') {
						targetWidget.find('.filter-container').append(ele)
					} else if(targetWidget.parents(".simple-queryfilter").length && targetXMLName=== 'defaultfilter') {
						if(obj.xml === 'radiogroup') {
							targetWidget.find('.filter-left').append(ele)
						} else {
							targetWidget.find('.filter-right').append(ele)
						}
					} else if(targetXMLName === 'morefilter') {
						targetWidget.find('.morefilter-content').append(ele)
					} else {
						"datagrid" === targetXMLName ? targetWidget.find('[viewid="' + viewId + '"]').find('.fields-table').before(ele) : (targetWidget.attr('viewid') ? targetWidget.append(ele) : targetWidget.find('[viewid="' + viewId + '"]').append(ele));	
					}
					if("datagrid" === targetXMLName) {
						$(mainXml).find('[viewid="' + viewId + '"]').find('fields').before(finalXml)
						$(mainXml).find('[viewid="' + viewId + '"]').find('fields').removeAttr('singletag')
					} else {
						$(mainXml).find('[viewid="' + viewId + '"]').append(finalXml)
						$(mainXml).find('[viewid="' + viewId + '"]').removeAttr('singletag')
					}
					handleEmptyClass($(targetWidget), targetXMLName)
				}else{
					_self.dropact = true;
					alert("出现了新组件");
					return false;
				}
				if(obj.xml === 'tab' && _self.platform === 'mobile') {
					let tabNodes = $(ele).parents('[xml="tabgroup"]').find('[xml="tab"]')
					tabNodes.each(function(index, element){
						$(element).find('.tab-content').css('left', (-index * 100)+'%')
					})
				}
				_self.mainObj[file_id+"_html"] = mainHtml;
				_self.mainObj[file_id] = mainXml;
				_self.initSpecWidget(obj);
				_self.dropact = true;
			});
			//点击显示属性栏
			$(".show-container").on("click", '[xml]', function(e) {
				$('.box-focus').removeClass('box-focus');
				$('.box-edit').hide();
				$('.box-edit-line').hide();
				if(document.body.clientWidth<1300 && !$('.right-toggle').hasClass('expand')){//展开右边
					$('.right-toggle').addClass('expand');
					$('.file-panel p.title span[refresh]').removeClass('hide')
					$('.right-toggle').animate({right: 283},'fast');
				    $('#right-property-list').animate({width: 300},'fast');
				}
				var file_id = $(this).closest('.show').attr("file_id");
				var viewId = _self.returnXML(this); //返回点击目标的具有xml属性的节点id
				$('.file-property').addClass("hide");
				$('[link-panel="property"]').trigger("click");
				$('.property-tab [type="node-p"]').addClass('active').siblings().removeClass('active');
				$('.property-tab').find('span.title').text($('.property-tab').find('i.active').attr('title'));
				$('#right-property-list .node-property').removeClass('hide').siblings('.file-property').addClass('hide');
				$('.node-property ul.property').empty();
				$('.node-property ul.property').removeClass("empty-panel").attr("link-id",viewId).attr("file_id",file_id);
				$('.focus-layer').removeClass('focus-layer');
				$('.hover-layer2').removeClass('hover-layer2');
				$(this).addClass("focus-layer");
				if(_self.platform === 'mobile' && $(this).parent('[xml]').length>0 && $(this).parent('[xml]').attr('xml') !=='view'){
					$(this).parent('[xml]').addClass("box-focus");
					_self.setBoxEditPos($(this).parent('[xml]'));
				}
				$('.morefilter-content').hide();
				if(_self.platform === 'pc' && ($(this).attr('xml')==='morefilter' || $(this).parents('[xml="morefilter"]').length)) {
					$(this).find('.morefilter-content').show();
					$(this).parents('[xml="morefilter"]').find('.morefilter-content').show()
				}
				if(viewId) {
					$('.node-property ul.property').append("<ul id='"+viewId+"' class='private-tab-wrapper'><li class='private-tab'><div tab='base-prop' class='active'>基本属性</div><div tab='style-prop'>样式属性</div></li><ul link-tab='base-prop'></ul><ul link-tab='style-prop' class='hide'></ul></ul>");
					setProperty.xmlProperty(viewId,this,"ul.property #"+viewId);
				} else {
					e.preventDefault();
				}
				e.preventDefault();
				e.stopPropagation() ? e.stopPropagation() : e.cancelBubble = true;
			});
			$('.show-container').on('click', '.switch', function(e,focusEle) {
				$('.box-focus').removeClass('box-focus');
				$('.box-edit').hide();
				$('.box-edit-line').hide();
				var file_id = $(this).closest('.show').attr("file_id"),text;
				$(this).addClass('active').siblings().removeClass('active');
				//_self.blurXmlEditPanel();
				if($(this).hasClass('view-btn')) {
					$(this).closest('.button-group').find('.condition-switch').removeClass('hide');
					$(this).parents('.show').find('.view').removeClass('hide').siblings('.xml').addClass('hide');
					//$("#input-reminder ul").css("visibility", "hidden");
					text = $(this).parents('.show').find("#xml").text();
					if(!text.trim().match(/^<>$/)) {
						_self.vcount = 1;
						var viewPanel = $(this).parent().siblings('#view'),formatText,formatNode;
						if(!focusEle){
							text = $('.show-container .show').find("#xml").text();
						    var srcNode = _self.convertFileContent(text);
						    _self.mainObj[file_id] = srcNode;
						}
						formatNode = _self.mainObj[file_id];
						formatText = _self.removeInvalidText(formatNode.outerHTML);
						formatNode = $(formatText)[0];
						_self.platform = formatNode.getAttribute('platform') || 'pc'
						FormatHTML(formatNode, viewPanel[0]);
						_self.mainObj[file_id+"_html"] = viewPanel[0];
						_self.adjustTable(viewPanel);
					}
					if(focusEle){
						var n = $('.show-container .show .view ').find('[viewid="'+focusEle+'"]');
						if(n.attr('xml')){
                            n.trigger('click');
						}else{
							n.closest('[xml]').trigger('click');
						}
					}
				} else {
					$(this).closest('.button-group').find('.condition-switch').addClass('hide');
					$('#xml-property').removeAttr('item').find('.list').remove(); //移除属性栏
					var formatNode = _self.getMain(file_id);
					_self.formatXML = FormatXML.load(formatNode);
					$(this).parents('.show').find("#xml").html(_self.formatXML.template);
					_self.addlineNum($(this).parents('.show').find("#xml"));
					if(!_self.allowEdit){
						$(this).parents('.show').find("#xml").attr('contenteditable',false);
						$(this).parents('.show').find("#xml").find('[contenteditable]').attr('contenteditable',false);
					}
					_self.formatXML.watch($(this).parents('.show').find("#xml")[0]);
					$(this).parents('.show').find("#xml").removeClass('hide').siblings('#view').addClass('hide');
				}
			});

			// hover事件
			$(".show-container").on('mouseover', '[xml]', function(e){
				$('.hover-layer2').removeClass('hover-layer2');
				$(e.currentTarget).addClass("hover-layer2")
				e.preventDefault();
				e.stopPropagation() ? e.stopPropagation() : e.cancelBubble = true;
			})
			//right menu event
			$('.right-menu .head').on('click', function() {
				$(this).toggleClass('open');
				if($(this).hasClass('open')) {
					$('#r-menu').slideDown(200);
				} else {
					$('#r-menu').slideUp(200);
				}
			});
			$(".file-box").on('click', "div[type='file'],div.extendfile,div.expandfile",function(e) {
				$(".file-box div").removeClass('selected');
				$(this).addClass('selected');
				e.stopPropagation() ? e.stopPropagation() : e.cancelBubble = true;
			});
			$(".file-box").on('contextmenu', "div[type='file'], .expandfile",function(e) {
				$('.contextmenu-box').hide();
				$('.right-fn-box').css({"left":e.pageX+"px","top":e.pageY+"px"}).show();
				if($(e.currentTarget).hasClass('expandfile')){
					$('.right-fn-box').find('li').hide();
					if($(e.currentTarget).find('.expandfile').length<1){
					   $('.right-fn-box').find('li[type="expand"]').show();
					}
					$('.right-fn-box').find('li[type="delete"]').show();
					$('.right-fn-box').find('li[type="properties"]').show();
				}else{
				    $('.right-fn-box').find('li').show();
				    if($(e.currentTarget).find('.expandfile').length>0){
					   $('.right-fn-box').find('li[type="expand"]').hide();
					}
				}
				$(".file-box div").removeClass('selected');
				$(e.currentTarget).addClass('selected');
				e.preventDefault();
				e.stopPropagation() ? e.stopPropagation() : e.cancelBubble = true;
			});
			$("body").on('click', '.private-tab [tab]', function(e) {
			   $(this).closest('.private-tab-wrapper').find('[tab]').toggleClass('active');
			   $(this).closest('.private-tab-wrapper').find('[link-tab]').toggleClass('hide');
			});
			$('.right-fn-box li').on('click',function(){
				var type = $(this).attr('type'),src,id,name,platform,data,newid;
				src = $('.file-box').find('div.selected');
				id = src.attr('id');
				name = src.attr('name');
				platform = src.attr('platform') ? src.attr('platform') : "pc";
				datatype = src.attr('datatype') || "";
				extendModel = src.attr('extendModel') || "无";
				needlogin = src.attr('needlogin') || "否";
				logintype = src.attr('logintype') || "none";
				newid = _self.getUuid();
				switch(type){
				    case "extend" :
				    	data = {
								title:"新建文件",
								flag:"extend",
								type:"",
								datas:[{
									id:"fileId_v",
									name:"页面ID",
							        placeholder:"请输入页面ID",
							        type:"input",
									value:id+"_extend",
									required:true,
									disabled:false
								},{
									id:"displayName_v",
									name:"页面名称",
							        placeholder:"请输入页面名称",
							        type:"input",
									value:name,
									required:true,
									disabled:false
								},{
							        id:"datatype_v",
							        name:"数据模式",
							        type:"select",
							        options:["basedata","billdata","custom"],
							        required:false,
							        disabled:false
						        },{
							        id:"extendModel_v",
							        name:"继承模板",
							        type:"select",
							        options:["无","epfp_basebillview"],
							        required:false,
							        disabled:false
						        },{
							        id:"platform_v",
							        name:"平台",
							        type:"radiogroup",
							        value:"pc",
							        groups:["pc","mobile"],
							        required:false,
							        disabled:false
						        },{
							        id:"needlogin_v",
							        name:"登录",
							        value:false,
							        type:"checkbox",
							        required:false,
							        disabled:false
						        },{
							        id:"logintype_v",
							        name:"登录类型",
							        type:"select",
							        options:["nextcloud","member"],
							        required:false,
							        disabled:false
						        }]
						};
				    	_self.createDialog(data);
						break;
				    case "expand" :
				    	data = {
								title:"新建文件",
								flag:"expand",
								type:"",
								datas:[{
									id:"fileId_v",
									name:"页面ID",
							        placeholder:"请输入页面ID",
							        type:"input",
									value:newid,
									required:true,
									disabled:false
								},{
									id:"displayName_v",
									name:"页面名称",
							        placeholder:"请输入页面名称",
							        type:"input",
									value:name,
									required:true,
									disabled:false
								},{
							        id:"datatype_v",
							        name:"数据模式",
							        type:"select",
							        options:["basedata","billdata","custom"],
							        required:false,
							        disabled:true
						        },{
							        id:"extendModel_v",
							        name:"继承模板",
							        type:"select",
							        options:["无","epfp_basebillview"],
							        required:false,
							        disabled:true
						        },{
							        id:"platform_v",
							        name:"平台",
							        type:"radiogroup",
							        value:"pc",
							        groups:["pc","mobile"],
							        required:false,
							        disabled:true
						        },{
							        id:"needlogin_v",
							        name:"登录",
							        value:false,
							        type:"checkbox",
							        required:false,
							        disabled:false
						        },{
							        id:"logintype_v",
							        name:"登录类型",
							        type:"select",
							        options:["nextcloud","member"],
							        required:false,
							        disabled:false
						        }]
						};
				    	_self.createDialog(data);
				    	break;
				    case "delete" :
				    	_self.closeDialog("删除文件","确定删除文件吗?",{'delete-id':id});
				    	break;
				    case "properties" :
				    	var fileData = [
							{name:"页面ID",value:id},
							{name:"页面名称",value:name},
							{name:"数据模式",value:datatype},
							{name:"继承模板",value:extendModel},
							{name:"平台",value:platform},
							{name:"登录",value:needlogin}
						];
						if(needlogin){
						    fileData.push({name:"登录类型",value:logintype});
						}
				    	_self.fileDiaolog(fileData);
				    	break;
				    default:break;
				}
				$('.right-fn-box').hide();
			});
			$(".file-box").on('dblclick', 'div[type="file"] .icon-wenjian~span', function() {
				var _this = $(this).closest('div[type="file"]');
				_self.getFileContent("", _this.attr("name"), _this.attr("id"), "", _this.attr("platform"));
				//1.开发环境的都能修改
				//2.生产环境的只有非标准文件并且不是本地存储的可以修改
				//以上两个条件外的都不能修改
				if(_self.allowEdit){
					$('.top-save').removeAttr("disabled");
				}else{
					$('.top-save').attr("disabled",true);
				}
			});　
			$(".file-box").on('click', 'div[type="file"] .icon-wenjian,.expandfile .icon-kuozhan', function() {
				$(this).siblings('span').toggleClass('hide');
			});
			$(".file-box").on('dblclick', 'div.extendfile span,div.expandfile span', function() {
			    var _this = $(this).closest('div');
				if(_this.hasClass("extendfile")){
					srcFlag = "extend";
				}else{
					srcFlag = "expand";
				}
				_self.getFileContent(srcFlag, _this.attr('name'), _this.attr('id'), _this.attr('srcId'), _this.attr('platform'));
			});
			$('.file').on('contextmenu','[dirname] .package-i,[dirname] .package-i+span',function(e){
				$('.contextmenu-box').hide();
				$('.right-package-box').css({"left":e.pageX+"px","top":e.pageY+"px"}).show();
				$(".file").find('div').removeClass('selected');
				$(this).closest('[dirname]').addClass('selected');
				e.preventDefault();
			});
			$('.right-package-box').on('click','li',function(){
				var type = $(this).attr("type"),path,basePath,fid,cur,fileData,fdata,filename,index;
				index = $(".tab-container").find('li').not('.create-fun-list li').length + 1;
				cur = $('.file .selected').closest('[dirname]');
				path = cur.attr("package");
				basePath = cur.attr("basedir");
				switch(type){
				    case "deletePackage":_self.deletePackage(path,basePath);break;
				    case "createPackage":
				    	cur.find('[type="file"]').first().before('<div dirname="folder" package="system.admin.channel.folder"><i class="iconfont icon-more-"></i><i class="iconfont icon-wenjianjiadakai package-i"></i><span>folder</span></div>');
				    	_self.createPackage(path,basePath);break;
				    case "createFile":
						fid = "file_"+new Date().getTime();
				    	data = {
				    		title:"新建文件",
							flag:"create",
							type:$(this).attr("createType"),
							datas:[{
									id:"fileId_v",
									name:"页面ID",
							        placeholder:"请输入页面ID",
							        type:"input",
									value:fid,
									required:true,
									disabled:false
								},{
									id:"displayName_v",
									name:"页面名称",
							        placeholder:"请输入页面名称",
							        type:"input",
									value:"新建文件"+index,
									required:true,
									disabled:false
								},{
							        id:"datatype_v",
							        name:"数据模式",
							        type:"select",
							        options:["basedata","billdata","custom"],
							        required:false,
							        disabled:false
						        },{
							        id:"extendModel_v",
							        name:"继承模板",
							        type:"select",
							        options:["无","epfp_basebillview"],
							        required:false,
							        disabled:false
						        },{
							        id:"platform_v",
							        name:"平台",
							        type:"radiogroup",
							        value:"pc",
							        groups:["pc","mobile"],
							        required:false,
							        disabled:false
						        },{
							        id:"needlogin_v",
							        name:"登录",
							        value:false,
							        type:"checkbox",
							        required:false,
							        disabled:false
						        },{
							        id:"logintype_v",
							        name:"登录类型",
							        type:"select",
							        options:["nextcloud","member"],
							        required:false,
							        disabled:false
						        }]
						};
						_self.createDialog(data);
				        break;
				    default:break;
				}
			});
			$('.file').on('click','[dirname]>i',function(){
				if($(this).hasClass('icon-more-')){//当前是展开，要收起
					$(this).removeClass('icon-more-').addClass('icon-more-1');
					$(this).closest('[dirname]').find('div').hide();
					$(this).closest('[dirname]').find('.package-i').first().removeClass('icon-wenjianjiadakai').addClass('icon-wenjianjia');
				}else{//当前是收起,要展开
					$(this).removeClass('icon-more-1').addClass('icon-more-');
					$(this).closest('[dirname]').find('div').show();
					$(this).closest('[dirname]').find('.package-i').first().removeClass('icon-wenjianjia').addClass('icon-wenjianjiadakai');
				}
			});
			$('.right-top').on('click','li',function(){
				$(this).addClass("active").siblings('li').removeClass("active");
				var panel = $(this).attr("link-panel");
				$('.right-panel').children().addClass('hide');
				if(panel === "file-box"){
					$('.right-panel .file-panel').removeClass('hide');
					$('.right-panel .property-panel').addClass('hide');
				}else{
					$('.right-panel .file-panel').addClass('hide');
					$('.right-panel .property-panel').removeClass('hide');
				}
			});
			$(".property-panel").on('change', 'ul input, ul select, ul textarea', function() { //绑定右侧输入框的change事件
				if($(this).closest('.file-property').length>0){
					setProperty.editFileProperty($(this),_self.mainObj);
				}else{
					setProperty.editProperty($(this),_self.mainObj);
				}
			});
			$(".property-panel").on('focus', 'ul input', function() { //绑定右侧输入框的change事件
				$('.iframe-layer-focus').removeClass('iframe-layer-focus');
				if(!['radio','checkbox'].includes($(this)[0].type)){
				    $(this).css({background:"#ffffff",border:"1px solid #E0E0E0"});
				}
				var linkAttr = $(this).closest('li').attr('link-attr');
			});
			$(".property-panel").on('click', 'ul input+.iconfont', function(e) {
				var type,linkAttr,obj={},label,valuelist;
				type = $(this).attr("type");
				label = $(this).siblings('label').text();
				linkAttr = $(this).closest('li').attr('link-attr');
				try{
				    valuelist = JSON.parse($(this).attr('valuelist'));
				}catch(e){
				    valuelist = (type === 'popselectdata') ? {} : [];
				}
				$('.iframe-layer-focus').removeClass('iframe-layer-focus');
				switch(type){
				    case "popselectdata":
						obj = valuelist;
						_self.selectPDialog(obj['data'],obj['title'], true);
						$(this).siblings('input').not('.hide').addClass('iframe-layer-focus');
						$(this).siblings('input').not('.hide').blur();
				    	break;
				    case "selectdata":
				    	_self.selectdataPDialog(label,valuelist);
						$(this).siblings('input').addClass('iframe-layer-focus');
						$(this).siblings('input').blur();
				    	break;
				    default:break;
				}
				e.stopPropagation() ? e.stopPropagation() : e.cancelBubble = true;
			});
			$(".property-panel").on('blur', 'ul input', function() { //绑定右侧输入框的change事件
				if($(this)[0].type !== 'checkbox'){
				    $(this).css({background:"#ffffff",border:"1px solid #dcdfe6"});
				}
			});
			$('.top-file').on('click', function() {
				$(this).toggleClass('active');
				$('.file-action-list').toggleClass('hide');
				if(!$('.file-action-list').hasClass('hide') && _self.currentEnv === "cdevelopEnv"){
					$('li[type="env-settings"]').show();
				}else{
					$('li[type="env-settings"]').hide();
				}
			});
			$('.file-action-list li').not('.action-list-detail li').on('mouseenter',function(){
				if($(this).attr('type') === "file-settings"){
					$('.action-list-detail').removeClass("hide");
				}else{
					$('.action-list-detail').addClass("hide");
				}
			});
			$('.file-action-list').not('.action-list-detail').on('mouseleave',function(){
				$('.file-action-list').addClass('hide');
			});
			$('.action-list-detail').on('mouseleave',function(){
				$('.action-list-detail').addClass("hide");
			});
			$('.file-action-list li').on('click',function(){
				var type = $(this).attr('type');
				switch(type){
				case "file-settings":
					$('.top-file').toggleClass('active');
					$('.file-action-list').toggleClass('hide');
					break;
				case "env-settings":
					var data = {
						title:"设置环境目录窗口",
						datas:[{
							id:"basedir_v",
							name:"环境目录",
							placeholder:"请输入环境目录(工程的src目录的绝对路径)",
							value:"",
							required:true,
							disabled:false
						}]
				    };
				    _self.setEnvDialog(data);
					break;
				default:break;
				}
			});
			$('.top-save').on('click', function() {
				if($(this).attr("disabled")) return;
				var file_id,mainXml,flag,platform,appId;
				file_id = $('.show-container .show').attr("file_id");
				appId = $('.tab-container .tab.active').attr("appId");
				_self.saveParam = {};
				//_self.blurXmlEditPanel();
				if($('.show .button-group .switch.active').hasClass('xml-btn')){
					var text = $('.show-container .show').find("#xml").text();
					var srcNode = _self.convertFileContent(text);
					_self.mainObj[file_id] = srcNode;
				}
				mainXml = _self.getMain(file_id);
				$('.file-action-list').addClass('hide');
				flag = $('.show-container .show').attr("fileFlag");
				$(mainXml).find('.expand-editing').removeAttr('expand-editing').removeClass('expand-editing');
				$(mainXml).find('[viewid]').removeAttr("viewid");
				_self.saveParam = _self.mainObj[file_id+"_filedata"];
				if(flag === "expand"){
					_self.saveParam['appendId'] = $('.expandfile[id="'+file_id+'"]').length>0 ? $('.expandfile[id="'+file_id+'"]').attr("srcId") : _self.mainObj[file_id+"_data"]['appendId'];
				}else{
					_self.saveParam['appendId'] = "";
				}
				_self.initViewId(mainXml.children,true);
				var str = _self.formatForLineFeed(mainXml.outerHTML);
				var platform = mainXml.getAttribute('platform') ? mainXml.getAttribute('platform') : "pc";
				str = str.replace('bspace="0"',"").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&amp; lt;/g,"&lt;").replace(/&amp; gt;/g,"&gt;");
				//change the blank text to standred space
				str = encodeURI(str).replace(/%C2%A0/g, "%20");
				var pako = require("js/pako.min.js");
				_self.saveParam['content'] = window.btoa ? window.btoa(pako.gzip(decodeURI(str), { to: 'string' })) : Base64.encode(pako.gzip(decodeURI(str), { to: 'string' }));
				//_self.saveParam['content'] = str; //不想用压缩加编码的xml内容就用这句原始内容的
				_self.saveParam['platform'] = platform;
				_self.saveParam['appId'] = appId;
				_self.saveParam['EnableGzip'] = "btoa";
				_self.saveFiles(_self.saveParam);
			});
			$('.pop-box .cancel').on('click', function() {
				$(this).closest('.pop-box').addClass('hide');
			});
			$('.pop-box').on('click','.close .icon-delect',function(){
				$(this).closest('.pop-box').addClass('hide');
			});
			$('body').on('mouseover','.tab',function(){
				$(this).find('.close').css({"background":"#EB4335","color":"#fffff"});
			});
			$('body').on('mouseleave','.tab',function(){
				$(this).find('.close').css({"background":"#F5F9FA","color":"#F5F9FA"});
			});
			$('body').on('click','.smart-search .icon-search',function(){
				var val = $(this).siblings('input').val(),reg,list,next;
				reg = new RegExp(val,"gi");
				next = $(this).parent().next();
				if($(this).closest('.menu-search').length>0){
					list = $('ul.menu-content li');
				}
				if($(this).closest('.control-search').length>0){
					list = $('.control-list li');
				}
				if($(this).closest('.right-search').length>0){
					if("file-box" === $('.right-top').find('li.active').attr('link-panel')){
						list = $('.right-panel').find('.file-box').not('.hide').find('div[name]');
					}else{
						list = $('.node-property ul.property li');
					}
				}
				if(val.trim().length<1){
					if(list.attr("type") === "file"){
						$('.file-box').find('div').removeClass('hide');
					}else if(list.attr('category')){
						list.removeClass('hide');
						$('.menu-link-left li.active').trigger('click');
					}else{
						list.removeClass('hide');
					}
					return;
				}
				list.addClass('hide');
				list.not('.cate-title').not('.prop-title').each(function(i,v){
			        if($(v).attr('name').match(reg)||($(v).attr('id') && $(v).attr('id').match(reg))
			        		||($(v).attr('node') && $(v).attr('node').match(reg))||($(v).attr('link-attr') && $(v).attr('link-attr').match(reg))){
					    $(v).removeClass('hide');
					    if($(v).attr('category')){
					    	$(v).parents().removeClass('hide');
					    }
					    if($(v).attr('package')){
					    	$(v).parents().removeClass('hide');
					    }
					}else{
						$(v).addClass('hide');
					}
				});
				if($(this).closest('.right-search').length>0){
					$('.file-box').find('[dirname]').not('.hide').each(function(ii,vv){
						if($(vv).find('div[name]').not('.hide').length<1){
							$(vv).addClass("hide");
						}else{
							$(vv).removeClass("hide");
						}
					});	
				}
			});
			$('body').on('compositionstart keydown','.smart-search input',function(e){
				if("Process" === e.key || !e.key) {
					$(this).attr("isChinese",true);
				} else {
					$(this).attr("isChinese",false);
				}
			});
			$('body').on('compositionend','.smart-search input',function(e){
			    if("true" === $(this).attr("isChinese")){
			    	$(this).siblings('i').trigger('click');
			    }
			});
			$('body').on('keyup','.smart-search input',function(e){
			    if("false" === $(this).attr("isChinese")){
			    	$(this).siblings('.icon-search').trigger('click');
			    }
			});
			$('.control-search input').focus(function(e){
				$('.control-list').removeClass("hide");
			});
			$('.control-search .icon-select').click(function(e){
				$('.control-list').toggleClass("hide");
			});
			$('body').on('click','.control-list li',function(){
				var viewid = $(this).attr("viewid"),node;
				$('.control-search input').val($(this).attr("name"));
				node = $('.show-container .show .view').find('[viewid="'+viewid+'"]');
				if(node.attr('xml')){
					node.trigger('click');
				}else{
					node.closest('[xml]').trigger('click');
				}
				$(this).parent().addClass('hide');
			});
			$('body').on('click','.property-tab i',function(){
				var type = $(this).attr('type');
				$(this).addClass('active').siblings().removeClass('active');
				switch(type){
				case "file-p":
					    $(this).parent().siblings('span.title').text("文件属性");
					    $(".tab-container").find('tab.active').trigger('click');
					    $('#right-property-list .file-property').removeClass('hide');
				        $('#right-property-list .node-property').addClass('hide');
				        break;
				case "node-p":
					    $(this).parent().siblings('span.title').text("节点属性");
					    $(".show-container").find('[xml].focus-layer').trigger('click');
					    $('#right-property-list .file-property').addClass('hide');
				        $('#right-property-list .node-property').removeClass('hide');
				        break;
				    default:break;
				}
			});
			$('body').on('keydown','.fileDialog li span',function(e){
				if(e.keyCode !== 91){
					e.preventDefault();
				}
			});
			/**少数组件对应的点击事件**/
			$('body').on('click','[xml="menubuttongroup"] .dropdown-toggle',function(){
				$(this).siblings('ul.dropdown-menu').toggleClass('hide');
			});
			
			$('body').on('click','.to-new-page',function(){
				_self.newPageDialog($(this).attr('type'));
			});
			$("body").on('click','.cus-switch1',function(){
			    $(this).toggleClass('active');
				if($(this).closest('.button-group').length>0){
				    $('.show[data-item] .view').toggleClass('actual-view');
				    $('.box-focus').removeClass('box-focus');
				    $('.box-edit').hide();
				    $('.box-edit-line').hide();
				}
			});
			/**导出**/
			$('body').on('click','#fun-sub-list .export',function(){
				var file_id = $('.tab.active').attr('file_id');
				if(file_id){
					_self.exportDialog(file_id);
				}else{
					_self.infoDialog("请先打开待导出文件");
				}
			});
			/**发布菜单**/
			$('body').on('click','#fun-sub-list [type="publishMenu"]',function(){
				_self.publishMenuDialog();
			});
			$('body').on('click','#fun-sub-list [type="selectApp"]',function(){
				_self.selectAppDialog();
			});
			var top = 0,interval;
			$('body').on('scroll mousewheel','.file-history .file-box',function(){
				$(this).parent().find('p.title').addClass('scrolling');
				if(!interval){
					interval = setInterval(function(){
						if($('.file-history .file-box')[0].scrollTop === top){
							$('.file-history').find('p.title').removeClass('scrolling');
							clearInterval(interval);
		                    interval = null;
						}
					},1000);
				}
				top =  $(this)[0].scrollTop;
			});
			/**var top1 = 0,interval1;
			$('body').on('scroll mousewheel','.file .file-box',function(){
				$(this).parent().find('p.title').addClass('scrolling');
				if(!interval1){
					interval1 = setInterval(function(){
						if($('.file .file-box')[0].scrollTop === top1){
							$('.file').find('p.title').removeClass('scrolling');
							clearInterval(interval1);
		                    interval1 = null;
						}
					},3000);
				}
				top1 =  $(this)[0].scrollTop;
			});*/
		    $('body').on('mouseover','.hover-layer',function(e){
		    	var title = $(this).attr('title');
		    	$(this).addClass('hover-view');
		    	var index = layer.open({
		    		skin:"hover-tips",
					type:4,
					tips:[3,"#333333"],
					title:false,
					closeBtn: 0,
					shade: 0,
					area:['56px','24px'],
					content:[title,this]
				});
		    	$('.hover-tips').css({
		    		"left": ($(e.target).offset()['left']-20)+'px'
		    	});
		    	$('body').on('mouseleave','.hover-layer',function(){
		    		layer.close(index);
			    });
		    });
		    $('body').on('click','.createDialog [type="checkbox"]',function(){
		    	if($(this).attr('checked')){
		    		$(this).removeAttr('checked');
		    		$(this).parent().siblings('span').find('input').attr('checked',true);
				}else{
					$(this).attr('checked',true);
		    		$(this).parent().siblings('span').find('input').removeAttr('checked');
				}
		    });
		    $('body').on('click','.right-toggle',function(){
		    	if($(this).hasClass('expand')){//当前是展开状态
				   $(this).removeClass('expand');
				   $('.file-panel p.title span[refresh]').addClass('hide')
			       $(this).animate({right: 0},'fast');
			       $('#right-property-list').animate({width: 0},'fast');
			    }else{
				   $(this).addClass('expand');
				   $('.file-panel p.title span[refresh]').removeClass('hide')
			       $(this).animate({right: 283},'fast');
			       $('#right-property-list').animate({width: 300},'fast');
			    }
		    });
		    $('body').on('click','#menu-group .left',function(){
		    	var content = $('.publishMenuDialog').find('.main-content');
		    	content.find('#app-moudle').removeClass('hide');
		    	content.find('#menu-group').addClass('hide');
		    });
		    $('body').on('click','.option-box li',function(e){
		    	if($(this).closest('.layer-format-table').length>0){
		    		$(this).trigger('selectAction');
		    		var id,fileId,optionId,content,reqData;
		    		id = $(this).closest('.layer-format-table').parent().attr("id");
		    		fileId = $('.tab.active').attr('file_id');
		    		optionId = parseInt($(this).attr('fid'));
		    		content = $('.publishMenuDialog').find('.main-content');
		    		switch(id){
		    		    case "app-moudle": reqData = {viewid:fileId,apptypeid:optionId};break;
		    		    case "menu-group": reqData = {viewid:fileId,moduleid:optionId};break;
		    		    case "menu-list": reqData = {viewid:fileId,groupid:optionId};break;
		    		    default:break;
		    		}
		    		formatTable.renderTable(id,reqData,content,true);
		    	}
		    });
		    $('body').on('click','.file-panel span[refresh]',function(){
		    	_self[$(this).attr('refresh')]();
		    });
			$('body').on('click','#needlogin,#needlogin_v',function(){
			    if($(this)[0].checked){
				    $(this).closest('div').find('#logintype').closest('li').show();
					$(this).closest('.layui-layer-content').find('#logintype_v').closest('div').show();
				}else{
				    $(this).closest('div').find('#logintype').closest('li').hide();
					$(this).closest('.layui-layer-content').find('#logintype_v').closest('div').hide();
				}
			});
			$('body').on('click','.box-edit',function(){
			    $('.box-focus').trigger('click');
			});
			$(window).on('resize',function(){
				$('.box-focus').removeClass('box-focus');
				$('.box-edit').hide();
				$('.box-edit-line').hide();
			});
		},
		convertText: function(str) {
			var _self = this,fstr;
			var container = document.createElement("div");
			fstr = encodeURI(str);
			//change the blank text to standred space
			fstr = fstr.replace(/%C2%A0/g, "%20");
			str = decodeURI(fstr);
			var cd = str.replace(/<html/g, "<htmlText").replace(/<\/html/g, "</htmlText");
			var version = cd.match(/\<\?xml([\S\s]*?)?>/g);
			if(version && version.length > 0) {
				$.each(version, function(i, v) {
					var ver = v.replace(/</g, "&lt;").replace(/>/g, "&gt;");
					cd = cd.replace(v, "<xmlText>" + ver + "</xmlText>");
				});
			}
			var doctype = cd.match(/\<\!DOCTYPE([\S\s]*?)>/g);
			if(doctype && doctype.length > 0) {
				$.each(doctype, function(i, v) {
					var type = v.replace(/</g, "&lt;").replace(/>/g, "&gt;");
					cd = cd.replace(v, "<xmlText>" + type + "</xmlText>");
				});
			}
			//$(container).html(cd);
			//return $(container);
			return cd;
		},
		/**blurXmlEditPanel: function(){
			if($('#currentFocus').length>0){
				$('#currentFocus').replaceWith('<font color="'+$('#currentFocus').attr("color")+'">'+$('#currentFocus').val()+'</font>');
			}	
		},*/
		removeInvalidText: function(text){
			var _self = this;
			text = text.replace(/<!\[CDATA\[/gi,"").replace(/\]\]>/gi,"").replace(/(<script)([\S\s]*?)script>/ig,"").replace(/(<datasource)([\S\s]*?)datasource>/ig,"");
			text = text.replace(/&lt;!\[CDATA\[/gi,"").replace(/\]\]&gt;/gi,"").replace(/(&lt;script)([\S\s]*?)script&gt;/ig,"").replace(/(&lt;datasource)([\S\s]*?)datasource&gt;/ig,"");
			var arr = text.match(/(<htmlText)([\S\s]*?)htmlText>/ig);
			arr = arr ? arr : [];
			for(var i = 0;i<arr.length;i++){
				text = text.replace(arr[i],$(arr[i])[0].outerHTML);
			}
			return text;
		},
		fileModuleCreate: function(index, name, id,platform,flag,appId) {
			var _self = this,newFile;
			var eleTab, eleContent, file_id;
			file_id = id ? id : "file_" + new Date().getTime();
			eleTab = fileModule.FileTab(index, name,flag,appId).get(0);
			$(eleTab).attr("file_id", file_id);
			$(".tab-container").find('.tab-new').before(eleTab);
			eleContent = fileModule.FileContent(index,platform,flag).get(0);
			$(eleContent).attr("file_id", file_id);
			$(".show-container").append(eleContent);
		},
		changeView: function(fid) {
			$('.show-container [file_id=' + fid + ']').addClass('show').removeClass('hide').siblings().removeClass('show').addClass('hide');
		},
		removeView: function(fid) { //移除标签页
			var _self = this;
			var target = $('.show-container .show[file_id=' + fid + ']');
			target.remove();
		},
		getSpecEle:function(obj,temp){
			var _self = this,n,node,xml;
			n = _self.count++;
			switch(temp){
			    case "list":
			    case "datagrid":
			    	
					if($('.show-container .show>.view')[0].getAttribute('platform')==='mobile'){
						node = getModule.whichModule({id: "fields_"+n,name: "",node: "fields",viewid: "fields_"+n,xml: "fields",_customData: {showCheckbox: temp==='datagrid'}},"fields",undefined, [temp]);
						xml = _self.createXML(node);
					} else {
						node = getModule.whichModule({id: "fields_"+n,name: "",node: "fields",viewid: "fields_"+n,xml: "fields"},"fields",undefined, [temp]);
						xml = _self.createXML($(node).find('[xml]')[0]);
					}
			    	break;
			    default:break;
			}
			return {
				"node":node,
				"xml":xml
			}
		},
		/**创建xml节点**/ 
		createXML: function(ele) {
			var _self = this;
			var nodeList = Array.prototype.slice.call(ele.attributes); //获取html节点全部属性的数组
			var xmlNode, obj = {};
			for(var i in nodeList) { //将xml属性作为标签名，其余属性添加到xml节点
				if(nodeList[i].nodeName === 'xml') {
					xmlNode = document.createElement(nodeList[i].value);
				} else if(nodeList[i].nodeName === 'class' || nodeList[i].nodeName === 'synchro') {
					continue;
				} else {
					if(nodeList[i].value) {
						obj[nodeList[i].nodeName] = nodeList[i].value;
					}
				}
			}
			for(var j in obj) {
				if('data' === j) {
					try {
						obj['data'] = JSON.parse(obj['data']);
						for(var k in obj['data']) {
							if(k==='_customData') continue
							if(obj['data'][k] && obj['data'][k].toString().trim().length>0 
									&& $.inArray(k,["category","node","draggable","platform","properties","xml"])===-1){
								xmlNode.setAttribute(k, obj['data'][k]);
							}
						}
					} catch(e) {
						console.log("xml without data");
					}
				} else {
					if($.inArray(j,["category","node","draggable","platform","properties","xml"])===-1){
						xmlNode.setAttribute(j, obj[j]);
					}
				}
			}
			if(!xmlNode.getAttribute('id')){
				xmlNode.setAttribute('id',xmlNode.nodeName+"_"+new Date().getTime());
			}
			return xmlNode;
		},
		/*返回当前目标的ID */
		returnXML: function(target) {
			var data = {};
			try{
				data = JSON.parse($(target).attr("data"));
			}catch(e){
				data = {
					"viewid" : "view"
				}
			}
			return data.viewid;
		},

		/*temporary function for show xml content when click xml file*/
		showContentPart: function(node, formatXML) {
			var _self = this;
			var viewPart = '.show[data-item="' + node.attr('item') + '"] #view';
			var xmlPart = '.show[data-item="' + node.attr('item') + '"] #xml';
			var xmlBtn = '.show[data-item="' + node.attr('item') + '"] .button-group .xml-btn';
			var viewBtn = '.show[data-item="' + node.attr('item') + '"] .button-group .view-btn';
			$(xmlPart).empty();
			$(xmlPart).html(formatXML.template);
			_self.addlineNum($(xmlPart));
			formatXML.watch($(xmlPart)[0]);
			$(viewBtn).trigger('click');
			//$('[link-panel="property"]').trigger('click');
			//$(xmlPart).removeClass('hide').siblings(viewPart).addClass('hide');
			//$(xmlBtn).addClass('active').siblings().removeClass('active');
		},
		/** add line num style*/
		addlineNum:function(node){
		    var arr = node.find('[linenum]');
			for(var i = 0; i < arr.length; i++){
			    var left = 0 - 10 * ($($(node).find('[linenum]')[i]).parents('.children').length) - 18;
			    $($(node).find('[linenum]')[i]).find('font.line-num').css('left',left+'px');
			}
		},
		/*loading the reminder text for project*/
		loadReminderText: function() {
			var _self = this;
			/**$.get("dummy/directory.json", function(data) {
				_self.global_reminder = JSON.parse(data);
				for(var i in _self.global_reminder) {
					var arr = _self.global_reminder[i].split(" ");
					$(arr).each(function(i, value) {
						$("#input-reminder ul").append('<li class="hide">' + value + '</li>');
					});
				}
			}, "text");*/
		},
		fake_click: function(obj) {
			var _self = this;
			var ev = document.createEvent("MouseEvents");
			ev.initMouseEvent(
				"click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null
			);
			obj.dispatchEvent(ev);
		},
		export_raw: function(data) {
			var _self = this;
			var urlObject = window.URL || window.webkitURL || window;

			var export_blob = new Blob([data]);

			var save_link = document.createElementNS("http://www.w3.org/1999/xhtml", "a")
			save_link.href = urlObject.createObjectURL(export_blob);
			save_link.download = name;
			_self.fake_click(save_link);
		},
		getMain: function(id) {
			var _self = this;
			var newMain = $('<pageview id="pageview_new"><view id="view_new"></view></pageview>');
			id = id ? id : "fileId_"+new Date().getTime();
			_self.mainObj[id] ? _self.mainObj[id] : _self.mainObj[id] = newMain[0];
			return _self.mainObj[id];
		},
		adjustTable: function(panel){
			var _self = this;
			/** panel.find('table').each(function(i,v){
				var w = $(v).closest('[xml="datagrid"]').width(),tbody;
				tbody = $(v).find('tbody').first();
				if($(v).parent().prev().attr('xml') === "tree"){
					$(v).parent().width(w-$(v).parent().prev().width()); 
					if(tbody.find('tr[xml="fields"]').first().width()<$(v).parent().width()){
						tbody.find('tr[xml="fields"]').width(w-$(v).parent().prev().width()-45);
					}
				}else{
					$(v).parent().width(w);
					if(tbody.find('tr[xml="fields"]').first().width()<w){
						tbody.find('tr[xml="fields"]').width(w);
					}
				}
			}); */
			panel.find('[xml="kswiper"]').each(function(i,v){
				var obj = JSON.parse($(v).attr('data'));
				_self.initSpecWidget(obj);
			});
			panel.find('[xml="imggroup"]').each(function(i,v){
				var obj = JSON.parse($(v).attr('data'));
				_self.initSpecWidget(obj);
			});
		},
		getAttributesList: function(item){
		    var obj={},_self = this;
		    var property = Array.prototype.slice.call(item.attributes);
		    if(item.getAttribute('data')){
		    	obj = JSON.parse(item.getAttribute('data'));
		    }
			for(var a in property) {
				var node = property[a];
				if(!obj[node.nodeName]){
					obj[node.nodeName] = node.nodeValue;
				}
			}
			if(!obj["xml"]){obj["xml"] = obj['node'].toLowerCase();}
			if(!obj["viewid"]){obj["viewid"] = obj["xml"]+"_"+_self.randomString();}
			if(!obj["id"]){obj["id"] = obj["viewid"];}
			delete obj.title
			return JSON.stringify(obj);
		},
		refreshLoginStatus:function(){
			$.ajax({
				type:'POST',
				url:'/jfsEditor/hands.jhtml',
				dataType:'json',
				async:true,
				error:function(data){console.log(data)},
				success:function(res){
				   console.log("刷新登陆状态");
				}
		    });
		},
		getCurrentEnv: function(){
			var _self = this;
			$.ajax({
				type:'POST',
				url:_self.prevpath + '/kapi/app/ocepfp/editViewAction',
				dataType:'json',
				async:true,
				data:JSON.stringify({event:'initEnv'}),
				error:function(data){console.log(data)},
				beforeSend: function (request) {
                    request.setRequestHeader('Content-Type', 'application/json');
                },
				success:function(res){
					if(0 === res.data){
						_self.currentEnv = "productEnv";
						console.log("生产环境 环境验证通过");
					}else if(100 === res.data){
						_self.currentEnv = "developEnv";
						console.log("开发环境");
						var data = {
								title:"设置环境目录窗口",
								datas:[{
									id:"basedir_v",
									name:"环境目录",
									placeholder:"请输入环境目录",
									value:"",
									required:true,
									disabled:false
								}]
						};
						_self.setEnvDialog(data);
					}else if(101 === res.data){
					   _self.currentEnv = "developEnv";
						console.log("开发环境");
					}else{
						_self.infoDialog(res.errMsg || res.message);
					}
				}
		    });
		 },
		 getApps: function(){
		    var _self = this;
			$.ajax({
				type:'POST',
				url:_self.prevpath + '/kapi/app/ocepfp/editViewAction',
				dataType:'json',
				async:true,
				data:JSON.stringify({event:'getapps'}),
				error:function(data){console.log(data)},
				beforeSend: function (request) {
                    request.setRequestHeader('Content-Type', 'application/json');
                },
				success:function(res){
					if(res.success){
						_self.appData = res.data || [];
						if(!_self.currentApp){
						    _self.selectAppDialog(res.data);
						} else {
							let currentAppData = _self.appData.find(item=>item.id===_self.currentApp)
							$('#fun-sub-list .appNameWrapper').removeClass('hide')
							$('#fun-sub-list .appName').text(currentAppData.FNAME || '')
						}
					}else{
						_self.infoDialog(res.errMsg || res.message);
					}
				}
		    });
		 },
		 getControls:function(){
			 var _self = this;
			 let d = {}
			 d.event = 'getcontrols'
			 let d1 = JSON.stringify(d)
		     $.ajax({
				type:'POST',
				url:_self.prevpath + '/kapi/app/ocepfp/editViewAction',
				dataType:'json',
				async:true,
				data:JSON.stringify({event : 'getcontrols'}),
				error:function(data){console.log(data)},
				beforeSend: function (request) {
                    request.setRequestHeader('Content-Type', 'application/json');
                },
				success:function(res){
					_self.commonProperties = res.data.commonProperties;
					$.each(res.data.commonProperties,function(i,v){
						_self.commonProperties[i]['value'] = "";
						_self.commonPropIds.push(v['id']);
					});
					$('.menu-content').empty();
					res.data.controls.sort(function(a, b) {
						return a.id.localeCompare(b.id)
					})
					$.each(res.data.controls,function(i,v){
						v['id'] = v['id'].toLowerCase();
						_self.controlsMap.push({id:v['id'],name:v['name']});
						if($('[category="'+v['category']+'"]').length<1){
							$('.menu-content').append('<ul category="'+v['category']+'"></ul>');
							$('.menu-link-left').append('<li link-category="'+v['category']+'">'+v['category']+'</li>');
						}
						v['properties'] = v['properties'] ? JSON.stringify(v['properties']) : JSON.stringify([]);
						$(controlTmpl).tmpl(v).appendTo('ul[category="'+v['category']+'"]');
					});
					$('.menu-link-left').find('li').first().trigger('click');
				}
		    });
		 },
		 getFiles:function(){
			 var _self = this;
			 $('.right-panel .file').find('.file-box').empty();
			 $('.right-panel .file').find('.file-box').addClass('empty-panel');
			  $.ajax({
				type:'POST',
				url:_self.prevpath + '/kapi/app/ocepfp/editViewAction',
				dataType:'json',
				async:true,
				data:JSON.stringify({event:'getfiles',appId:_self.currentApp}),
				error:function(data){console.log(data)},
				beforeSend: function (request) {
                    request.setRequestHeader('Content-Type', 'application/json');
                },
				success:function(res){
					if(res.success){
						 $('.right-panel .file .file-box').removeClass('empty-panel');
						 $.each(res.data,function(i,v){
							 var arr = v["package"].split(".");
							 var selector = _self.appendDir(arr,$('.right-panel .file .file-box'));
							 selector = '.right-panel .file .file-box '+ selector;
							 if(!v['name'] || (v['name'] && v['name'].trim().length<1)){
								 v['name'] = v['id'];
							 }
							 $(fileTree).tmpl(v).appendTo(selector);
							 if(v["append"]&&v["append"].length>0){
								 for(var j = 0;j < v["append"].length;j++){
								     var expandNode = $('<div class="expandfile" id="'+v['append'][j]['id']+'" name="'+v['append'][j]['name']+'" srcId="'+v['id']+'" srcName="'+v['append'][j]['name']+'"><i class="iconfont icon-kuozhan"></i><span>'+v['append'][j]['name']+'</span><span class="hide">'+v['append'][j]['id']+'</span></div>');
								     $('.right-panel .file #'+v['id']).append(expandNode);
								 }
							 }
							 if(v["append"]&&v["append"].length>0){
							    _self.moreappendAndExtend(v,$('.right-panel .file'));
						     }
						 });
					}else{
						_self.infoDialog(res.message);
					}
				}
		    });
		 },
		appendDir: function(arr,node){
			 var selector = "";
			 for(var i = 0;i<arr.length;i++){
				 selector +='[dirname="'+arr[i]+'"] '; 
				 var isExsit = node.find(selector).length > 0;
				 if(i === 0 && !isExsit){
					 node.append('<div dirname="'+arr[0]+'"><i class="iconfont icon-more-"></i><i class="iconfont icon-wenjianjiadakai package-i"></i><span>'+arr[0]+'</span></div>');
				 }else if(!isExsit){
					 $('[dirname="'+arr[i-1]+'"]').append('<div dirname="'+arr[i]+'"><i class="iconfont icon-more-"></i><i class="iconfont icon-wenjianjiadakai package-i"></i><span>'+arr[i]+'</span></div>');
				 }
			 }
			 return selector;
		},
		getFileContent:function(flag,name,fileId,appendId,platform){
			 var _self = this;
			 if($('.tab[file_id="'+fileId+'"]').length>0){
				 $('.tab[file_id="'+fileId+'"]').trigger('click');
				 return;
			 }
		     $.ajax({
				type:'POST',
				url:_self.prevpath + '/kapi/app/ocepfp/editViewAction',
				dataType:'json',
				data:JSON.stringify({viewId:fileId,appendId:appendId,event:'getFileContent',appId:_self.currentApp}),
				async:false,
				error:function(data){console.log(data)},
				beforeSend: function (request) {
                    request.setRequestHeader('Content-Type', 'application/json');
                },
				success:function(res){
					if(res.success){
						var data = $(".tab-container").find('li').not('.create-fun-list li').length + 1,expandFlag,fdata;
						_self.fileModuleCreate(data, name, fileId,platform,flag,_self.currentApp);
						tabChildren = $(".tab-container").find('li').not('.create-fun-list li');
						len = tabChildren.length;
						var newFile = tabChildren[len - 1];
						$(newFile).addClass('active').siblings().removeClass('active');
						_self.changeView(fileId);
						
						var srcNode = _self.convertFileContent(res.data);
						//srcNode.setAttribute('tablename',res.metadata['tablename']);
						//srcNode.setAttribute('pkfield',res.metadata['pkfield']);
						_self.mainObj[fileId] = srcNode;
						_self.formatXML = FormatXML.load(srcNode);
						expandFlag = (appendId&&appendId.trim().length>0) ? true : false;
						fdata = {
						    'expand' : expandFlag,
				            'disable' : true,
							'id': fileId,
							'name': name,
				            'plugin': srcNode.getAttribute('plugin'),
				            'ao': srcNode.getAttribute('ao'),
				            'bo': srcNode.getAttribute('bo'),
				            'tablename': srcNode.getAttribute('tablename'),
				            'pkfield': srcNode.getAttribute('pkfield'),
				            'datatype': srcNode.getAttribute('datatype'),
				            'extendModel': srcNode.getAttribute('extend'),
				            'needlogin': srcNode.getAttribute('needlogin'),
				            'logintype': srcNode.getAttribute('logintype')
						}
						_self.updateFilePPanel(fdata);
						_self.showContentPart($(newFile), _self.formatXML);
						$('.show[file_id="'+fileId+'"] [platform="mobile"]').find("#nav-header").text(name)
						$('.node-property ul.property').empty();
					}else{
						_self.infoDialog(res.errMsg || res.message);
					}
				}
		    });
		 },
		 updateFileContent:function(fileId,resdata){
			 var _self = this;
			 var fileflag = $('.tab.active[file_id="'+fileId+'"]').attr('fileflag'),appendId,file_data={},fileNode,expandFlag;
			 fileNode = $('.expandfile[id="'+fileId+'"]');
			 if("expand" === fileflag){
				 appendId = fileNode.length>0 ? fileNode.attr('srcId') : _self.mainObj[fileId+"_data"]['appendId'];
				 expandFlag = true;
			 }else{
				 appendId = "";
			 }
			 file_data = JSON.parse($('.file-property').attr('file-data'));
			 if($('.tab-container .tab[file_id="'+fileId+'"]').hasClass('new-not-save')){
				 _self.appendFileToTree(_self.mainObj[fileId+"_data"]);
				$('.tab-container .tab[file_id="'+fileId+'"]').removeClass('new-not-save');
				if(resdata && resdata.autoListViewId){
					 var data = $.extend(true,{},_self.mainObj[fileId+"_data"]);
					 data['id'] = resdata.autoListViewId;
					 data['name'] = resdata.autoListViewName;
					 _self.mainObj[resdata.autoListViewId+"_data"] = data;
					 _self.appendFileToTree(_self.mainObj[resdata.autoListViewId+"_data"]);
				}
			 }
			 _self.updateFilePPanel(file_data);
			 $.ajax({
					type:'POST',
				    url:_self.prevpath + '/kapi/app/ocepfp/editViewAction',
				    dataType:'json',
				    data:JSON.stringify({viewId:fileId,appendId:appendId,event:'getFileContent',appId:_self.currentApp}),
				    async:false,
				    error:function(data){console.log(data)},
				    beforeSend: function (request) {
                        request.setRequestHeader('Content-Type', 'application/json');
                    },
					success:function(res){
						if(res.success){
							var fileData,fdata,viewpanel;
							tabpanel = $('.tab.active[file_id="'+fileId+'"]');
							var srcNode = _self.convertFileContent(res.data);
							_self.mainObj[fileId] = srcNode;
							_self.formatXML = FormatXML.load(srcNode);
							_self.showContentPart(tabpanel, _self.formatXML);
							$('.node-property ul.property').empty();
						}else{
							_self.infoDialog(res.errMsg || res.message);
						}
					}
			});
		 },
		 saveFiles:function(data){
		     var _self = this,flag;
		     var d = {
			    appId : data['appId'],
				needlogin:data['needlogin'],
				logintype:data['needlogin'] ? data['logintype'] : '',
				viewId : data.id,
			    event : 'save',
			    detail : data.content,
				datatype : data.datatype,
				extendId: data.extendModel
			 }
			 flag = _self.validateFilePPanel();
			 if(!flag) return;
		     $.ajax({
				type:'POST',
				url:_self.prevpath + '/kapi/app/ocepfp/editViewAction',
				dataType:'json',
				data:JSON.stringify(d),
				async:false,
				error:function(data){console.log(data)},
				beforeSend: function (request) {
                    request.setRequestHeader('Content-Type', 'application/json');
                },
				success:function(res){
					var msg,fileId;
					if(res.success){
						if(res.data != undefined && res.data.isAutoCreatedSuccess!=undefined){
						   if(res.data.isAutoCreatedSuccess){
							   $('.status-box').addClass('show-success').removeClass('show-failed');
							   msg = "保存成功";
						   }else{
							   $('.status-box').addClass('show-failed').removeClass('show-success');
							   msg = res.errMsg || res.message;
						   }
						}else{
							$('.status-box').addClass('show-success').removeClass('show-failed');
							msg = "保存成功";
						}
						$('.status-box').animate({
						    top:"12px"
					        },100);
					    $('.status-box').fadeIn();
					    setTimeout(function(){
						    $('.status-box').fadeOut(100,function(){
						        $('.status-box').removeClass('show-success').removeClass('show-failed');
							    $('.status-box').css("top","50px");
						    });
					    },5000);
					}else{
					   _self.infoDialog(res.errMsg || res.message);
					}
					fileId = $('.tab.active').attr('file_id');
					if(res.success){
						_self.updateFileContent(fileId,res.data);
					}
				}
		    });
		 },
		saveEnvParam:function(path){
		    var _self = this; 
			$.ajax({
				type:'POST',
				url:'/jfsEditor/setEnv.jhtml',
				dataType:'json',
				async:false,
				data:{workspace:path}, 
				error:function(data){console.log(data)},
				success:function(res){
				    if(res.success){
				        console.log("请求通过");
				        _self.updateFileHistory();
				    }else{
				        _self.infoDialog(res.errMsg || res.message);
				    }
				}
		    });
		 },
		 deleteFile:function(fileId){
			 var _self = this;
			 var fileflag = $('.tab.active[file_id="'+fileId+'"]').attr('fileflag'),appendId,appId;
			 fileNode = $('.expandfile[id="'+fileId+'"]');
			 appId = $('.tab.active[file_id="'+fileId+'"]').attr('appId');
			 if("expand" === fileflag || fileNode.length>0){
				 appendId = fileNode.attr('srcId');
			 }else{
				 appendId = "";
			 }
			 $.ajax({
					type:'POST',
					url:_self.prevpath + '/kapi/app/ocepfp/editViewAction',
					dataType:'json',
					async:false,
					data:JSON.stringify({viewId:fileId,appendId:appendId,event:'delete',appId:appId}),
					error:function(data){console.log(data)},
					beforeSend: function (request) {
                        request.setRequestHeader('Content-Type', 'application/json');
                    },
					success:function(res){
						if(res.success){
						   $('.file-box').find('div[id="'+fileId+'"]').remove();
					       $('.tab[file_id="'+fileId+'"]').remove();
					       $('.show-container [file_id="'+fileId+'"]').remove();
						}else{
						   _self.infoDialog(res.errMsg || res.message);
					    }
					}
			});
		 },
		 createFile:function(reqData,platform,flag,datatype,extendModel,needlogin,logintype){
			 var _self = this,fileId,name,packagen,basedir;
			 fileId = reqData["viewId"];
		     name = reqData['name'];
		     reqData['platform'] = platform;
			 reqData['event'] = 'createFileContent';
			 reqData['appId'] = _self.currentApp;
			 reqData['datatype'] = datatype;
			 reqData['extendId'] = extendModel;
			 reqData['needlogin'] = needlogin;
			 reqData['logintype'] = needlogin ? logintype : '';
			 $.ajax({
					type:'POST',
					url:_self.prevpath + '/kapi/app/ocepfp/editViewAction',
					dataType:'json',
					async:false,
					data:JSON.stringify(reqData),
					error:function(data){console.log(data)},
					beforeSend: function (request) {
                        request.setRequestHeader('Content-Type', 'application/json');
                    },
					success:function(res){
						if(res.success){
							var data = $(".tab-container").find('li').not('.create-fun-list li').length + 1,fileData,expandFlag;
							_self.fileModuleCreate(data, name, fileId,platform,flag,_self.currentApp);
							tabChildren = $(".tab-container").find('li').not('.create-fun-list li');
							len = tabChildren.length;
							var newFile = tabChildren[len - 1];
							$(newFile).addClass('active').siblings().removeClass('active');
							_self.changeView(fileId);
							$('.tab-container .tab[file_id="'+fileId+'"]').addClass('new-not-save');
							let resData = res.data.replace('<view/>', '<view></view>')
							var srcNode = _self.convertFileContent(resData);
							_self.mainObj[fileId] = srcNode;
							_self.formatXML = FormatXML.load(srcNode);
							expandFlag = (reqData['appendId']&&reqData['appendId'].trim().length>0) ? true : false;
							fileData = {
							    'expand' : expandFlag,
				                'disable' : false,
								'id' : fileId,
								'name' : name,
				                'plugin': srcNode.getAttribute('plugin'),
				                'ao': srcNode.getAttribute('ao'),
				                'bo': srcNode.getAttribute('bo'),
				                'tablename': srcNode.getAttribute('tablename'),
				                'pkfield': srcNode.getAttribute('pkfield'),
				                'datatype': srcNode.getAttribute('datatype'),
				                'extendModel': srcNode.getAttribute('extend'),
				                'needlogin': srcNode.getAttribute('needlogin'),
				                'logintype': srcNode.getAttribute('logintype')
				            }
							_self.updateFilePPanel(fileData);
							_self.showContentPart($(newFile), _self.formatXML);
							$('.node-property ul.property').empty();
							_self.allowEdit = true;
							$('.top-save').removeAttr("disabled",true);
							$('.file-property').find('input').removeAttr("disabled",true);
							$('.show[file_id="'+fileId+'"] [platform="mobile"]').find("#nav-header").text(name)
						}else{
							_self.infoDialog(res.errMsg || res.message);
						}
					}
			});
		 },
		 updateFileHistory:function(){
				var _self = this;
				$('#right-property-list .file-history').find('.file-box').empty();
				$('#right-property-list .file-history').find('.file-box').addClass('empty-panel');
				$.ajax({
					type:'POST',
					url:_self.prevpath + '/kapi/app/ocepfp/editViewAction',
					dataType:'json',
					async:true,
					data:JSON.stringify({event : 'history',appId:_self.currentApp}),
					error:function(data){console.log(data)},
					beforeSend: function (request) {
                        request.setRequestHeader('Content-Type', 'application/json');
                    },
					success:function(res){
						if(res.success){
							 $('#right-property-list .file-history .file-box').removeClass('empty-panel');
							 $.each(res.data,function(i,v){
							     if(v){
                                    var arr = v["package"].split(".");
								    if(!v['name'] || (v['name'] && v['name'].trim().length<1)){
									    v['name'] = v['id'];
								    }
								    $(fileTree).tmpl(v).appendTo('.right-panel .file-history .file-box');
								    if(v["append"]&&v["append"].length>0){
									    _self.moreappendAndExtend(v,$('.file-history'));
								    }								 
								 }
							 });
						}else{
							_self.infoDialog(res.errMsg || res.message);
						}
					}
			    });
		 },
		 moreappendAndExtend:function(v,selector){
		    var _self = this;
		    for(var j = 0;j < v["append"].length;j++){
		        var expandNode = $('<div class="expandfile" id="'+v['append'][j]['id']+'" name="'+v['append'][j]['name']+'" srcId="'+v['id']+'" srcName="'+v['append'][j]['name']+'"><i class="iconfont icon-kuozhan"></i><span>'+v['append'][j]['name']+'</span><span class="hide">'+v['append'][j]['id']+'</span></div>');
			    selector.find('#'+v['id']).append(expandNode);
			    if(v["append"][j]["append"]&&v["append"][j]["append"].length>0){
				    _self.moreappendAndExtend(v["append"][j],selector);
				}
			}
		 },
		 deletePackage:function(){
			 console.log("deletepackage");
			 /**$.ajax({
					type:'POST',
					url:'/jfsEditor/deletePackage.jhtml',
					dataType:'json',
					async:false,
					data:{},
					error:function(data){console.log(data)},
					success:function(res){
						console.log(res);
					}
			});*/
		 },
		 createPackage:function(){
			 console.log("createPackage");
			 /**$.ajax({
					type:'POST',
					url:'/jfsEditor/createPackage.jhtml',
					dataType:'json',
					async:false,
					data:{},
					error:function(data){console.log(data)},
					success:function(res){
						console.log(res);
					}
			});*/
		 },
		 convertFileContent:function(content){
			var _self = this,srcNode = $('<div></div>'),stylestr="";
			content = content ? content : "";
			content = content.replace(/expand-editing/gi,"");
			content = encodeURI(content).replace(/%C2%A0/g, "%20");
			content = decodeURI(content);
			var arr = content.match(/<!\[CDATA\[([\S\s]*?)\]\]>/gi);
			arr = arr ? arr : [];
			for(var i = 0;i<arr.length;i++){
				stylestr = _self.getCustomerStyle(arr[i]);
				var str = arr[i].replace(/</g, "&lt;").replace(/>/g, "&gt;");
				content = content.replace(arr[i],str);
			}
			content = content.replace(/linenum\d+/g,'');
			content = content.replace(/<html/g,"<htmlText").replace(/<\/html/g,"</htmlText").replace(/\/>/g,' singletag = "true" >').replace('','');
			var carr = content.split(">");
			carr.forEach(function(ci,cv){
			    if(ci.match(/singletag = "true"/)){
				   var tagsh = ci.trim().split(" ")[0];
				   tagsh = tagsh.replace("<","</");
				   carr[cv] = carr[cv] + ">" + tagsh;
				}
			});
			content = carr.join(">");
			if(stylestr && $(content).find('style').length<1){
			    content = content.replace(/<htmlText/,stylestr+'\n<htmlText');
			}
			srcNode.append(content);
			$('.control-list').empty();
			_self.initViewId(srcNode.find('pageview').children());
			return srcNode.find('pageview')[0];
		},
	    getCustomerStyle:function(cusStr){
	    	var stylestr = '';
	    	var istyle = cusStr.match(/<style([\S\s]*?)style>/ig)
	    	if(istyle&&istyle.length>0){
	    		istyle.forEach(function(s,i){
	    			var ss = s
	    		    var a1 =  ss.match(/.page_([\S\s]*?){/g)
	    		    if(a1 && a1.length>0){
	    			    a1.forEach(function(a,i){
	    				    ss = ss.replace(a,'')
	    			    })
	    		    }
	    		    var b1 =  ss.match(/}([\n\r]*?)}/g)
	    		    if(b1 && b1.length>0){
	    			    b1.forEach(function(b,i){
	    				    ss = ss.replace(b,'}')
	    			    })
	    	 	    }
	    	 	    stylestr += ss
	    		})
	    	}
	    	return stylestr
	    },
		//自定义viewid
		initViewId:function(node,fromSave) {
		    var _self = this,data;
			for(var i = 0, len = node.length; i < len; i++) {
			    if(fromSave){
			    	var parent = node[i].parentElement;
			    	if(parent.getAttribute("bspace")){
			    		node[i].setAttribute("bspace",eval(parent.getAttribute("bspace"))+1);
			    	}else{
			    		node[i].setAttribute("bspace",1);
			    		parent.setAttribute("bspace",0);
			    	}
			    }else{
			    	if(!node[i].getAttribute('viewid')){
					    node[i].setAttribute("viewid",node[i].nodeName.toLowerCase()+"_"+_self.randomString());
					}
			    	data = {viewid:node[i].getAttribute("viewid"),name:node[i].getAttribute("name")};
				    data['name'] =  data['name'] ? data['name'] : "无名称控件"+data['viewid'];
				    if(!node[i].nodeName.toLowerCase().match(/operation|plugin|validation|parameter/g)){
				    	$(controlListTmpl).tmpl(data).appendTo('.control-list');
				    }
			    }
				if(node[i].hasChildNodes()) {
					_self.initViewId(node[i].children,fromSave);
				}
			}
		},
		updateFilePPanel:function(data){
			var _self,fileData,fdata;
			_self = this;
			$('.file-property').empty();
			fileData = [
				{id:"viewId",name:"页面ID",type:"input",value:data['id'],placeholder:"请输入页面ID",required:true,disabled:data['disabled'] || false},
				{id:"name",name:"页面名称",type:"input",value:data['name'],placeholder:"请输入页面名称",required:true,disabled:false},
				{id:"plugin",name:"插件类",type:"input",value:data['plugin'] || "",placeholder:"请输入插件类",required:false,disabled:false},
				{id:"tablename",name:"表名",type:"input",value:data['tablename'] || "",placeholder:"请输入表名",required:false,disabled:false},
				{id:"pkfield",name:"主键字段名",type:"input",value:data['pkfield'] || "",placeholder:"请输入主键字段名",required:false,disabled:false},
				{id:"datatype",name:"数据模式",type:"select",options:["basedata","billdata","custom"],value:data['datatype'],required:false,disabled:false},
				{id:"extendModel",name:"继承模板",type:"select",options:["无","epfp_basebillview"],value:data['extendModel'],required:false,disabled:false},
				{id:"needlogin",name:"登录",value:data['needlogin'],type:"checkbox",required:false,disabled:false},
				{id:"logintype",name:"登录类型",type:"select",options:["nextcloud","member"],value:data['logintype'],required:false,disabled:false}
				/** {id:"ao",name:"权限对象",value:ao,placeholder:"请输入权限对象",required:false,disabled:false,valueList:'{"viewid":"PObjectListView","selectid":"FNUMBER"}',type:"selectdata"}*/
			];
			$(filePropertyTmpl).tmpl(fileData).appendTo('.file-property');
			if([false,'false','0'].includes(data['needlogin'])){
			    $('.file-property').find('#logintype').closest('li').hide();
			}
			fdata = data;
			$('.file-property').attr("file-data",JSON.stringify(fdata));
			$('.file-property').removeClass('hide').siblings('.node-property').addClass('hide');
			$('.property-tab').find('[type="file-p"]').addClass('active').siblings('[type="node-p"]').removeClass('active');
			$('.property-tab').find('span.title').text($('.property-tab').find('i.active').attr('title'));
			//1.开发环境的都能修改
			//2.生产环境的只有非标准文件并且不是本地存储的可以修改
			//以上两个条件外的都不能修改
			var standard = $('.file-panel .file-box div[id="'+data['id']+'"]').attr("standard");
			if(("developEnv" === _self.currentEnv) 
					|| (_self.currentEnv === "productEnv" && "true" !== standard)){
				_self.allowEdit = true;
				$('.top-save').removeAttr("disabled");
			}else{
				_self.allowEdit = false;
				$('.top-save').attr("disabled",true);
				$('.file-property').find('input').attr("disabled",true).removeAttr("placeholder");
			}
			_self.mainObj[data['id']+"_filedata"] = fdata;
		},
		validateFilePPanel:function(){
			var flag = "";
			$('.file-property').find('input[required="true"]').each(function(i,v){
				if($(v).val().trim().length<1){
					$(v).addClass('r-border');
					flag += "false ";
					return false;
				}else{
					flag +="true ";
					$(v).removeClass('r-border');
				}
			});
			if(flag.match(/false/)){
				$('.file-property').removeClass("hide");
				if(!$('[link-panel="property"]').hasClass('active')){
					$('[link-panel="property"]').trigger('click');
				}
				return false;
			}else{
				return true;
			}
		},
		formatForLineFeed:function(str){
			var _self = this,arr,reg,r,rr;
			reg = new RegExp(' bspace="[0-9]"', 'gi');
			str = str ? str : "";
			str = str.replace(/htmltext/g,"html");
			arr = str.split(">");
			for(var i = 0;i<arr.length;i++){
			    r = arr[i].match(reg);
			    if(r&&r[0]){
			    	arr[i] = _self.addSpace(arr[i]);
				}else{
				    var nodeName = arr[i].match(/[a-zA-Z]+\s*/);
				    for(var j = i-1; j>-1;j--){
				        var snodename = arr[j].match(/[a-zA-Z]+\s+/);
				        if(nodeName && snodename && nodeName[0].trim() === snodename[0].trim()){
				        	var r1 = arr[j].match(reg),preIndex = 0;
				        	if(r1&&r1[0]){
				        		var rr1 = r1[0];
					            var preIndex = eval(rr1.split("=")[1]);
					            arr[i] = _self.addSpace(arr[i],preIndex);
					            arr[j] = arr[j].replace(reg,"");
					            break;
				        	}
				        }
				    }
			    }
			    if(arr[i].indexOf("<") !== -1 && arr[i].indexOf(">") === -1){
			    	arr[i] = arr[i] + ">";
			    }
				if(arr[i].match(/singletag/)){
					arr[i] = arr[i].replace(/ singletag="true"/,"").replace(">","/>");
					var tag = arr[i].trim().split(" ")[0].replace('<','');
					if(arr[i+1] && arr[i+1].match(/\//) && arr[i+1].match(tag)){
						arr[i+1] = "";
					}
				}
		   }
		   return arr.join("").replace(reg,"");
	   },
		addSpace:function(item,preIndex){
	        var r,rr,reg,index,ss = "\n";
	        reg = new RegExp('bspace="[0-9]"', 'i');
			r = item.match(reg);
	        if(r&&r[0]){
	            rr = r[0];
	            index = eval(rr.split("=")[1]);
	            ss = "\n";
	            for(var j = 0;j<index*4;j++){
		            ss += " ";
	            }
	            item = item.replace(item,ss+r['input']+">");
	      }else{
	    	  preIndex = preIndex ? preIndex : 0;
	    	  for(var j = 0;j<preIndex*4;j++){
		            item = " "+item;
	          }
	    	  item = ss+item+">";
	      }
	      return item;
		},
		createNewFile:function(fid,fname,flag,type,platform,datatype,extendModel,needlogin,logintype){
			var _self = this,selector="",src,v;
			src = $(".file-box div.selected"),id = src.attr('id'),name = src.attr('name');
			platform = platform ? platform : "pc";
			v = {
					extend:"",
					editable:true,
					id:fid,
					name:fname,
					basedir:"",
					platform:platform,
					standard:"",
					flag:flag
			}
			if("extend" === flag){
				v['extend'] = id;
			}else if("expand" === flag){
				v['appendId'] = id;
				v['srcName'] = name;
			}
			_self.mainObj[v['id']+"_data"] = v;
			if("extend" === flag){
				_self.createFile({viewId:v['id'],appendId:"",extendId:v['extend'],name:fname,type:""},v['platform'],"extend",datatype,extendModel,needlogin,logintype);
			}else if("create" === flag){
				_self.createFile({viewId:v['id'],appendId:"",extendId:"",name:fname,type:type},v['platform'],"create",datatype,extendModel,needlogin,logintype);
			}else if("expand" === flag){
				_self.createFile({viewId:v['id'],appendId:v['appendId'],extendId:"",name:fname,type:""},v['platform'],"expand",datatype,extendModel,needlogin,logintype);
			}
		},
		appendFileToTree:function(data){
			var _self = this,arr,selector="",node;
			arr = arr ? arr : [];
			for(var i = 0;i<arr.length;i++){
				if($('[dirname="'+arr[i]+'"]').length>0){
					i === 0 ? selector += '[dirname="'+arr[i]+'"]' : selector += ' [dirname="'+arr[i]+'"]';
				}else{
					var dirNode = $('<div dirname="'+arr[i]+'"><i class="iconfont icon-more-"></i><i class="iconfont icon-wenjianjiadakai package-i"></i><span>'+arr[i]+'</span></div>');
					if(i === 0){
					    $('.right-panel').find('.file .file-box').append(dirNode);
						selector += '[dirname="'+arr[i]+'"]';
					}else{
						$('[dirname="'+arr[i-1]+'"]').append(dirNode);
						selector += ' [dirname="'+arr[i]+'"]';
				    }
			   }
			}
			if("expand" === data['flag']){
				 var expandNode = $('<div class="expandfile" id="'+data['id']+'" name="'+data['name']+'" srcId="'+data['appendId']+'" srcName="'+data['srcName']+'"><i class="iconfont icon-kuozhan"></i><span>'+data['name']+'</span><span class="hide">'+data['id']+'</span></div>');
				 expandNode.addClass('expandfile');
				 $('#right-property-list .file-box').find('#'+data['appendId']).append(expandNode);
			}else{
				node = $(fileTree).tmpl(data);
				if("extend" === data['flag']){
					node.addClass('extendfile').removeAttr('type');
				}
				if($('#right-property-list .file-history .file-box [type="file"]').length>0){
					$('#right-property-list .file-history .file-box [type="file"]').first().before(node[0].outerHTML);
				}else{
					$('#right-property-list .file-history .file-box').append(node[0].outerHTML);
				}
				if($('.file .file-box').find(selector).find('[type="file"]').length>0){
					$('.file .file-box').find(selector).children('div').first().before(node[0].outerHTML);
				}else{
					$('.file .file-box').find(selector).append(node[0].outerHTML);
				}
			}
		},
		infoDialog:function(content,title){
			title = title ? title : "提示";
			var index = layer.open({
				skin:"infoDialog jfsEditor-d",
				type:1,
				title:title,
				content:content,
				area:['280px','auto'],
				maxWidth:'300px',
				maxHeight:'400px',
				btn:['确认','取消'],
				yes:function(index,layero){
	                layer.close(index);
				}
			});
		},
		fileDiaolog:function(datas){
			var _self = this,content;
			content = $('<ul></ul>');
			for(var i = 0; i < datas.length;i++){
				content.append('<li><span contenteditable="true">'+datas[i]['name']+'</span><span contenteditable="true">'+datas[i]['value']+'</span></li>');
			}
			var index = layer.open({
				skin:"fileDialog jfsEditor-d",
				type:1,
				title:"文件属性",
				content:content[0].outerHTML,
				area:['360px','320px'],
				btn:['确认','取消'],
				yes:function(index,layero){
	                layer.close(index);
				}
			});
		},
		createDialog:function(data){
			var _self = this,content,data;
			content = $('<div flag="'+data['flag']+'" type="'+data['type']+'"></div>').append($(fileDialogTmpl).tmpl(data['datas']));
			var index = layer.open({
				skin:"createDialog jfsEditor-d",
				type:1,
				title:data['title'],
				content:content[0].outerHTML,
				area:['380px','480px'],
				btn:['确定','取消'],
				success: function(){
				    setTimeout(function(){
					    $('.createDialog').find('#logintype_v').closest('div').hide();
					},50);
				},
				yes:function(index,layero){
					if(_self.validateDialog($('.createDialog'))){
						var fid,name,flag,data,type,platform,datatype,extendModel,needlogin,logintype;
						fid = $('.createDialog').find('input#fileId_v').val().trim();
						name = $('.createDialog').find('input#displayName_v').val().trim();
						flag = $('.createDialog').find('div[flag]').attr("flag");
						type = $('.createDialog').find('div[type]').attr("type");
						platform = $('.createDialog').find('[name="platform"][checked]').val();
						datatype = $('.createDialog').find('#datatype_v').val();
						extendModel = $('.createDialog').find('#extendModel_v').val();
						needlogin = $('.createDialog').find('#needlogin_v')[0].checked;
						logintype = $('.createDialog').find('#logintype_v').val();
						extendModel = extendModel === "无" ? "" : extendModel; 
						_self.createNewFile(fid,name,flag,type,platform,datatype,extendModel,needlogin,logintype);
		                layer.close(index);
					}
				}
			});
		},
		closeDialog:function(title,content,data){
			var _self = this;
			var index = layer.open({
				skin:"closeDialog jfsEditor-d",
				type:1,
				title:title,
				content:content,
				area:['280px','167px'],
				btn:['确定','取消'],
				yes:function(index,layero){
					if(data['close-id']){
						var fid,tag,preTag,nextTag;
						fid = data['close-id'];
						tag = $('.tab-container .tab[file_id="'+fid+'"]');
						if(tag.hasClass('active')){
							preTag = tag.prev();
							nextTag = tag.next();
							_self.removeView(tag.attr("file_id"));
							tag.remove();
							//判断当前要关闭的标签页是否含有前后兄弟元素
							var a = preTag.length ? preTag : nextTag;
							if(a.length) {
								a.addClass('active');
								_self.changeView(a.attr('file_id'));
								$('.tab-container .tab.active[file_id=' + a.attr('file_id') + ']').trigger('click');
							}	
						}
					}else if(data['delete-id']){
						_self.deleteFile(data['delete-id']);
					}
					if($('.tab-container .tab.active').length<1){
						$('#right-property-list').find('ul.file-property').empty();
					}
					$('.node-property .property').empty();
					layer.close(index);
				}
			});
		},
		setEnvDialog:function(data){
			var _self = this,content,data;
			content = $('<div></div>').append($(dialogTmpl).tmpl(data['datas']));
			var index = layer.open({
				skin:"setEnvDialog jfsEditor-d",
				type:1,
				title:data['title'],
				content:content[0].outerHTML,
				area:['380px','200px'],
				btn:['确定'],
				yes:function(index,layero){
					var path = $('.setEnvDialog').find('input#basedir_v').val().trim();
					if(_self.validateDialog($('.setEnvDialog'))){
						_self.saveEnvParam(path);
						 layer.close(index);
					}
				}
			});
		},
		selectAppDialog:function(data){
		    var _self = this,content;
			data = data || _self.appData;
			content = $('<ul></ul>').append($(selectAppTmpl).tmpl(data));
			var index = layer.open({
				skin:"selectAppDialog jfsEditor-d",
				type:1,
				title:'选择应用',
				content:content[0].outerHTML,
				area:['360px','320px'],
				shadeClose:localStorage.getItem('currentApp'),
				btn:['确定'],
				success:function(){
				    setTimeout(function(){
					    var a = _self.currentApp || localStorage.getItem('currentApp');
					    $('.selectAppDialog li[id="' + a + '"]').addClass('active');
					},50)
				},
				yes:function(index,layero){
				    _self.currentApp = $('.selectAppDialog li.active').attr('id');
					localStorage.setItem('currentApp',_self.currentApp);
					let currentAppData = _self.appData.find(item=>item.id===_self.currentApp)
					$('#fun-sub-list .appNameWrapper').removeClass('hide')
					$('#fun-sub-list .appName').text(currentAppData.FNAME || '')
					layer.close(index);
					_self.getFiles();
					_self.updateFileHistory();
				}
			});
		},
		validateDialog:function(node){
			var flag = "";
			node.find('input[required="true"]').each(function(i,v){
				if($(v).val().trim().length<1){
					$(v).addClass('r-border');
					flag += "false ";
				}else{
					flag +="true ";
					$(v).removeClass('r-border');
				}
			});
			if(flag.match(/false/)){
				if(node.find('.layui-layer-content').length>0){node.find('.layui-layer-content')[0].scrollTop = 0;}
				return false;
			}else{
				return true;
			}
		},
		newPageDialog:function(type){
			var _self = this,fid,fname,url,title,info;
			fid = $('.tab.active').attr('file_id');
			fname = $('.tab.active').find('span.name').text().trim();
			if("preview" === type){
				url = window.location.origin+'/jfsEditor/preview.jhtml?id='+fid;
				title = "预览"+fname;
				info = "请先打开待预览文件";
			}
			if(!fid){
				_self.infoDialog(info);
				return false;
			}
			var index = layer.open({
				skin:"newPageDialog",
				type:2,
				title:title,
				content:url,
				area:['1200px','600px'],
				closeBtn:1,
				shadeClose:true
			});
		},
		selectdataPDialog:function(label,valuelist){
			var index = layer.open({
				skin:"newPageDialog pluginDialog jfsEditor-d",
				type:2,
				title:label,
				content:window.location.origin+'/jfsEditor/preview.jhtml?id='+valuelist['viewid'],
				area:['1200px','600px'],
				closeBtn:1,
				shadeClose:true,
				btn:['确定','取消'],
				yes:function(index, layero){
					var selarrrow = [],table,value="",vindex = 3,reg;
					reg = new RegExp(/,$/g);
					var iframeContent = layero.find('iframe')[0].contentWindow.document.body;
					$(iframeContent).find('#content .J_iframe').each(function(i,v){
						if(v.style.display !== "none"){
							table = $(v).find('.ui-jqgrid-bdiv table.table-bordered');
							selarrrow = table[0].p.selarrrow;
						}
					});
					$.each(table[0].p.colModel,function(i,v){
						if(v['name'] === valuelist['selectid']){
							vindex = i;
						}
					});
					$.each(selarrrow,function(i,v){
						var tr = table.find('tr.success[id="'+v+'"]');
						value += tr.find('td')[vindex].innerText+",";
					});
					value = value.replace(reg,"");
					$('.iframe-layer-focus').val(value);
					$('.iframe-layer-focus').trigger('change');
					layer.close(index);
				}
			});
		},
		getOptionsData:function(option){
			var selectData = JSON.parse(option.closest('[xml="select"],[xml="billstatus"]').attr('data')),obj={};
			var data = {
					head:[{"cb":""},{"name":"选项名称"},{"value":"选项值"},{"index":"显示顺序"}],
					body:[]
			}
			option.closest('[xml="select"],[xml="billstatus"]').find('li.option').each(function(i,v){
				var d = JSON.parse($(v).attr('data'));
				d['index'] = i;
				if($(v).attr('selected') === "selected" || $(v).attr('selected') === "true"){
					d['cb'] = "0";
				}else{
					d['cb'] = "1";
				}
				d['viewid'] = $(v).attr('viewid');
				data['body'].push(d);
			});
			obj['data'] = data;
			obj['title'] = selectData['name'];
			return obj;
		},
		selectPDialog:function(data,title, editable){
			var _self = this;
			var content = $('<div id="selectP_content"></div>');
			var settings = {
					"type":"white",
					"title":title,
					"bg":"#ffffff",
					"create":true,
					"delete":true,
					"edit-inline":true
			}
			var table = formatTable.initTemplate(data,'selectP_content',false,settings, editable);
			formatTable.init(data,'selectP_content');
			content.append(table);
			var index = layer.open({
				skin:"jfsEditor-d selectBoxDialog",
				type:1,
				title:false,
				content:content[0].outerHTML,
				area:['400px','auto'],
				btn:['保存','取消'],
				success:function(){
					formatTable.initEvents('selectP_content',settings);
				},
				yes:function(index, layero){
					var htmlstr="",xmlstr="";
					var curSelectNode = $('.focus-layer').closest('[xml="select"],[xml="billstatus"]')
					var curNode = curSelectNode.find('ul')
					let valuelist = JSON.parse($('.iframe-layer-focus').siblings('.icon-search').attr('valuelist') || {});
					data.body = data.body || []
				    layero.find('.layer-format-table tbody tr').each(function(i,v){
						var name,value,cb,oindex;
						name = $(v).find('td[name="name"] input').val() || $(v).find('td[name="name"]').text();
						value = $(v).find('td[name="value"] input').val() || $(v).find('td[name="value"]').text();
						oindex = $(v).find('td[name="index"] input').val() || $(v).find('td[name="index"]').text();
						if($(v).hasClass('selected')){
							cb = '1'
							htmlstr ="<li class='option' selected='true' name='"+name+"' value='"+value+"'>"+name+"</li>" + htmlstr;
							xmlstr ="<option selected='true' name='"+name+"' value='"+value+"'></option>" + xmlstr;
							$('.iframe-layer-focus').siblings('input.select_v').val(name);
							$('.iframe-layer-focus').val(value);
							// var curSelectData = JSON.parse(curSelectNode.attr('data'))
							// curSelectData.value = value
							// curSelectNode.attr('value', value)
							// $('.iframe-layer-focus').parents('[link-attr]').siblings('[link-attr="value"]').find('input').attr("value", value)
							// $('.iframe-layer-focus').parents('[link-attr]').siblings('[link-attr="value"]').find('input').val(value)
							// curSelectNode.attr('data', JSON.stringify(curSelectData))
						}else{
							cb = '0'
							htmlstr +="<li class='option' name='"+name+"' value='"+value+"'>"+name+"</li>";
							xmlstr +="<option name='"+name+"' value='"+value+"'></option>";
						}
						if(data.body[i]) {
							data.body[i].name = name
							data.body[i].value = value
						} else {
							data.body[i] = {
								name,
								value,
								cb,
								index: oindex || i,
								xml: 'option'
							}
						}
					});
					valuelist.data = data
					curNode.empty().append(htmlstr).attr('xmlstr',xmlstr);
					$('.iframe-layer-focus').siblings('.icon-search').attr('valuelist', JSON.stringify(valuelist))
					$('.iframe-layer-focus').siblings('input.select_v').trigger("change");
				    layer.close(index);
				}
			});
		},
		getSelectPData:function(title,valuelist){
			var obj={};
			var data = {
					head:[{"cb":""},{"key":"key"},{"val":"名称"}],
					body:[]
			}
			for(var i in valuelist){
				if(typeof valuelist[i] === "object"){
					for(var j in valuelist[i]){
						data['body'].push({key:j,val:valuelist[i][j]});
					}
				}else{
					data['body'].push({key:i,val:valuelist[i]});
				}
			}
			obj['data'] = data;
			obj['title'] = "选择"+title;
			return obj;
		},
		publishMenuDialog:function(){
			var _self = this,fileId,content,dataApp,dataGroup,dataMenu,table;
			fileId = $('.tab.active').attr('file_id');
			if(!fileId){
				_self.infoDialog("请先打开待发布文件");
				return false;
			}
			content = $('<div class="main-content"><div id="app-moudle"></div><div id="menu-group" class="hide"></div><div id="menu-list"></div></div>');
			formatTable.renderTable('app-moudle',{viewid:fileId,apptypeid:2},content,true);
			formatTable.renderTable('menu-list',{},content,false);
			var index = layer.open({
				skin:"jfsEditor-d publishMenuDialog",
				type:1,
				title:"发布菜单",
				closeBtn:1,
				shadeClose:true,
				content:content[0].outerHTML,
				area:['1115px','600px'],
				success:function(){
					formatTable.initEvents('app-moudle');
					formatTable.initEvents('menu-group');
					formatTable.initEvents('menu-list');
				},
				yes:function(){
				    layer.close(index);
				}
			});
		},
		exportDialog:function(file_id){
			var _self = this,content,settings,obj,table,index;
			content = $('<div id="exportList"></div>');
			obj = _self.getExportListData();
			settings = {
					"export":true,
					"type":"white",
					"title":obj['title'],
					"bg":"#ffffff"
			}
			table = formatTable.initTemplate(obj['data'],'exportList',true,settings);
			formatTable.init(obj['data'],'exportList');
			content.append(table);
			index = layer.open({
				skin:"jfsEditor-d exportDialog",
				type:1,
				title:false,
				content:content[0].outerHTML,
				area:['400px','auto'],
				btn:['导出','取消'],
				success:function(layero, index){
					formatTable.initEvents('exportList',settings);
					layero.find('.layui-layer-content').after('<p class="e-download">导出成功！文件已生成，<a>【点击下载】</a></p>');
				},
				yes:function(index, layero){
					layero.find('.export-btn').trigger('click');
				}
			});
		},
		getExportListData:function(){
			var _self = this,obj={},data,eObj={};
			eobj = _self.mappingExportParam();
			data = {
					head:[{"cb":""},{"name":"内容"},{"status":"导出状态"}],
					body:[
						{ cb: "0",name: "业务对象",status: "",FID:"bo",excode:eobj['bo']},
						//{ cb: "0",name: "前端页面",status: "",FID:"syspage"},
						{ cb: "0",name: "应用模块",status: "",FID:"module",excode:eobj['modulenameList'].join(",")},
						{ cb: "0",name: "菜单组",status: "",FID:"menugroup",excode:eobj['menugroupnameList'].join(",")},
						{ cb: "0",name: "菜单",status: "",FID:"menu",excode:eobj['menunameList'].join(",")},
						{ cb: "0",name: "权限对象",status: "",FID:"pobject",excode:eobj['pobject']},
						{ cb: "0",name: "编码规则",status: "",FID:"coderule",excode:eobj['coderule']},
						//{ cb: "0",name: "下拉选项",status: "",FID:"option"},
						{ cb: "0",name: "xml文件(二开)",status: "",FID:"xml",excode:eobj['xml']}
				    ]
			    }
			obj['data'] = data;
			obj['title'] = '基础资料导出';
			return obj;
		},
		mappingExportParam:function(){
			var _self = this,fileId,obj = {};
			fileId = $('.tab-container .tab.active').attr("file_id");
			//业务对象
			obj['bo'] = _self.mainObj[fileId].getAttribute('bo');
			//权限对象
			obj['pobject'] = _self.mainObj[fileId].getAttribute('ao');
			//编码规则
			var mainXml = _self.mainObj[fileId],arr=[];
        	$(mainXml).find('code[rule]').each(function(i,v){
        		arr.push($(v).attr('rule'));
        	});
        	obj['coderule'] = arr.toString();
        	obj['moduleidList'] = [];
        	obj['modulenameList'] = [];
        	obj['menugroupidList'] = [];
        	obj['menugroupnameList'] = [];
			obj['menuidList'] = [];
			obj['menunameList'] = [];
        	//应用模块
			for(var i = 1;i<6;i++){
				_self.getModuleByFile(fileId,i,obj);
			}
			//菜单分组
			for(var j = 0;j<obj['moduleidList'].length;j++){
				_self.getMenuGroupByFile(fileId,obj['moduleidList'][j],obj);
			}
			//菜单
			for(var k = 0;k<obj['menugroupidList'].length;k++){
				_self.getMenuByFile(fileId,obj['menugroupidList'][k],obj);
			}
			//xml
			obj['xml'] = fileId;
			return obj;
		},
		getModuleByFile:function(fileId,apptypeid,obj){
        	$.ajax({
				type:'POST',
				url:'/admin/querymenupublish.jhtml',
				dataType:'json',
				data:{viewid:fileId,apptypeid:apptypeid},
				async:false,
				error:function(data){console.log(data)},
				success:function(res){
					for(var i = 0;i<res.datas.length;i++){
						if(res.datas[i]["FLINKID"] && ((''+res.datas[i]["FLINKID"]).trim().length>0)){
							obj['moduleidList'].push(res.datas[i]["FID"]);
							obj['modulenameList'].push(res.datas[i]["FNUMBER"]);
						}
					}
				}
			});
		},
        getMenuGroupByFile:function(fileId,mid,obj){
        	$.ajax({
				type:'POST',
				url:'/admin/querymenupublish.jhtml',
				dataType:'json',
				data:{viewid:fileId,moduleid:mid},
				async:false,
				error:function(data){console.log(data)},
				success:function(res){
					for(var i = 0;i<res.datas.length;i++){
						if(res.datas[i]["FLINKID"] && ((''+res.datas[i]["FLINKID"]).trim().length>0)){
							obj['menugroupidList'].push(res.datas[i]["FID"]);
							obj['menugroupnameList'].push(res.datas[i]["FNUMBER"]);
						}
					}
				}
			});
		},
        getMenuByFile:function(fileId,gid,obj){
        	$.ajax({
				type:'POST',
				url:'/admin/querymenupublish.jhtml',
				dataType:'json',
				data:{viewid:fileId,groupid:gid},
				async:false,
				error:function(data){console.log(data)},
				success:function(res){
					for(var i = 0;i<res.datas.length;i++){
						obj['menuidList'].push(res.datas[i]["FID"]);
						obj['menunameList'].push(res.datas[i]["FNUMBER"]);
					}
				}
			});
		},
		getUuid:function() {
		    var s = [];
		    var hexDigits = "0123456789abcdef";
		    for (var i = 0; i < 36; i++) {
		        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
		    }
		    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
		    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
		    s[8] = s[13] = s[18] = s[23] = "-";
		 
		    var uuid = s.join("");
		    return uuid;
		},
		initSpecWidget:function(obj){
		    var _self = this;
			switch(obj.xml){
			    case "imggroup" :
			    case "kswiper" :
			        if($('#'+obj.id).find('.swiper-wrapper').length>0){
					    if(_self.swiperobj[obj.id]){ _self.swiperobj[obj.id] = null;}
		                _self.swiperobj[obj.id] = new Swiper ($('#'+obj.id)[0], {
                            direction: 'horizontal',
                            loop: true,
						    autoplay:true,
						    pagination: {
                                el: '.swiper-pagination',
                            }
                        });
					}
					break;
				default : break;
			}
		},
		//获取节点插入位置
		getInsetPos(targetXMLName, currentXMLName,event) {
			var ex = event.pageX;
			var ey = event.pageY;
			var d = event.target.getBoundingClientRect();
			var pos = (ex > d.left + d.width/2) ? 'after' : 'before';
			if($.inArray(targetXMLName,this.boxWidgets) !== -1){//放置位置的节点是可包含单元节点的组合节点
				if(targetXMLName === 'fields' && currentXMLName === 'groupfooter') return 'after'
				if(targetXMLName === 'groupfooter' && currentXMLName === 'fields') return 'before'
				var noInsertArr1 = ['radiogroup','checkboxgroup']
				var noInsertArr2 = ['switchtabbaritem', 'switchtabbarcitem', 'tabbaritem']
				if(targetXMLName === currentXMLName) {
					if (noInsertArr1.includes(currentXMLName) || noInsertArr2.includes(currentXMLName)) return pos
				} else {
					if ((noInsertArr1.includes(targetXMLName) && noInsertArr1.includes(currentXMLName)) || (noInsertArr2.includes(targetXMLName) && noInsertArr2.includes(currentXMLName))) return pos
				}

				// // if(currentXMLName === targetXMLName || ($.inArray(currentXMLName,['radiogroup','checkboxgroup'])!==-1 && $.inArray(targetXMLName,['radiogroup','checkboxgroup'])!==-1)){
				// if($.inArray(currentXMLName,['radiogroup','checkboxgroup'])!==-1 && $.inArray(targetXMLName,['radiogroup','checkboxgroup'])!==-1){
				// 	return pos
				// }
				if(/panel$/.test(targetXMLName.toLowerCase()) && /panel$/.test(currentXMLName.toLowerCase())) {
					if(ex >= (d.left + d.width/4) && ex <= (d.left + d.width * 3/4) && ey >= (d.top + d.height/5) && ey <= (d.top + d.height * 4/5)) {
						return 'insert'
					}
					return pos
				}
				//添加到复合组件内部最后一个
				return 'insert'
			}
			return pos
		},
		setBoxEditPos(box){
			var bpos = box[0].getBoundingClientRect();
			var vpos = box.closest('[xml="view"]')[0].getBoundingClientRect();
			var d = Math.min(bpos.left - vpos.left,vpos.right - bpos.right);
			var f = (bpos.left - vpos.left) < (vpos.right - bpos.right) ? 'left' : 'right';
			if(f == 'left'){
			    $('.box-edit').show().css({'left':(vpos.left-56 - d)+'px','top':(bpos.top-26)+'px','right':'unset'});
			    $('.box-edit-line').show().css({'width':(bpos.left - vpos.left + 30 + d)+'px','left':(vpos.left-30 - d)+'px','top':bpos.top+'px','right':'unset'});
			}else{
				$('.box-edit').show().css({'left':(vpos.left + vpos.width + 30)+'px','top':(bpos.top-26)+'px','right':'unset'});
				$('.box-edit-line').show().css({'width':(vpos.right - bpos.right + 30)+'px','left':(vpos.left + vpos.width - d)+'px','top':bpos.top+'px','right':'unset'});
			}
			$('.box-edit').attr('title','编辑父组件'+box.attr('id'));
		},
		// 随机生成字符串
		randomString(length = 4) {
			let str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
			let result = ''
			for (let i = length; i > 0; --i) {
			  	result += str[Math.floor(Math.random() * str.length)]
			}
			return result
		}
	}
});