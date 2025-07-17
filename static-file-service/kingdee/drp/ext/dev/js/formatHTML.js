;
(function() {
	function FormatHTML(allXML, panel) {
		this.allXML = allXML;
		this.idName = 'custom';
		this.count = 1;
		this.getModule = require("js/getModule.js");
		this.view = require("js/view.js");
		this.setProperty = require("js/setProperty.js");
		this.target = panel;
		this.target.innerHTML = ''; //清空view下面的元素
		this.platform = allXML.getAttribute('platform') || 'pc'
		this.name = allXML.getAttribute('name')
		var themecolor = allXML.getAttribute('themecolor') || "#5582F3"
		var navcolor = allXML.getAttribute('navcolor') || themecolor || "#5582F3"
		$(".show").attr('style', "--themecolor:"+themecolor+";"+"--navcolor:"+navcolor+";")
		this.intialization(this.allXML.children);
		this.arrFilter(this.allXML.childNodes);
	}
	FormatHTML.prototype.intialization = function(node) { //自定义id
		var self = this;
		for(var i = 0, len = node.length; i < len; i++) {
			if(!node[i].getAttribute('viewid')){
				node[i].setAttribute("viewid",node[i].nodeName.toLowerCase()+"_"+self.count++);
			}
			if(node[i].hasChildNodes()) {
				self.intialization(node[i].children);
			}
		}
	};
	// extendData是父层数据
	FormatHTML.prototype.arrFilter = function(arr, parentsType=[], extendData={}) {
		var self = this;
		extendData = JSON.parse(JSON.stringify(extendData))
		Array.prototype.map.call(arr, function(item, index, array) {
			var parentNode;
			var parentId = (item.parentElement && item.parentElement.getAttribute('viewid')) ? item.parentElement.getAttribute('viewid') : "";
			if(parentId.match(/pageview/)){
			    parentNode = self.target; //获取当前节点的父节点
			}else{
				parentNode = parentId ? self.target.querySelector('[viewid="'+parentId+'"]') : self.target; //获取当前节点的父节点
			}
			if(item.nodeType === 1) { //筛选节点
				var obj = {};
				var content = item.textContent.replace(/\n/g, "");
				var property = Array.prototype.slice.call(item.attributes);
				for(var a in property) {
					var node = property[a];
					obj[node.nodeName] = node.nodeValue;
				}
				obj['xml'] = item.nodeName.toLowerCase();
				self.initCustomData(obj, item, extendData);
				self.appendElement(obj, parentNode, item, parentsType,index);
				if(obj._customData.hasChild) { //遍历子节点
					var extendData2 = {}
					if(obj.xml === 'datagrid' && self.platform === 'mobile' && (obj.selectbox === undefined || obj.selectbox === '4' || obj.selectbox==='1' || obj.selectbox==='3' )) {
						extendData2 = {showCheckbox: true};
					}else if(obj.xml === 'steps' && self.platform === 'pc' && obj.inputstyle) {
						extendData2 = {inputstyle: obj.inputstyle};
					}else if(obj.xml === 'queryfilter') {
						extendData2 = {filterType: obj.queryfiltertype || 'simple'};
					}else if(obj.xml === 'list'){
					    extendData2 = {cardheight:obj.cardheight,cardwidth:obj.cardwidth};
					}else {
					    extendData2 = {};
					}
					if(obj.unactivestyle) {
						extendData2.style = (extendData2.style || '') + obj.unactivestyle
					}
					if(obj.activestyle) {
						extendData2.activestyle = obj.activestyle
					}
					if(['select'].includes(obj.xml)) {
						extendData2.active = obj.value
					}
					self.arrFilter(item.childNodes, [...parentsType, obj.xml], extendData2);
				}
			}
		})
	}
	FormatHTML.prototype.appendElement = function(obj, target, item, parentsType,index) { //生成html节点然后插入到目标父节点
		var self = this,viewId,
			xmlName = obj.xml.toLowerCase(),
			file_id = $(target).closest('.show').attr('file_id');
		try{
			var targetXmlName = target.getAttribute("xml")
			element = self.getModule.whichModule(obj, xmlName, item, parentsType);
			viewId = target.getAttribute("viewid");
			$(element).attr('xml') ? $(element).attr("draggable",true) : $(element).find('[xml]').attr("draggable",true);
			if(obj.xml === 'view' && self.platform === 'mobile') {
				$(element).find('#nav-header').text(self.name)
			}
			if("htmltext" === xmlName || ("text" === xmlName && item.innerHTML.length>0)){
				var c = element.innerHTML.replace(/&lt;/g,"<").replace(/&gt;/g,">");
				$(element).empty().append(c);
				$(element).find('img[src]').attr("src","image/default.png");
			}else if(xmlName === 'img'){
				element.onerror = function(e){
				    console.log(e);
				    e.target.src = "image/default.png";
				}
			}else if(xmlName === 'style'){
				var c = element.innerHTML.replace(/&#34;/g,'\"');
				$(element).empty().append(c);
			}
			if($(self.target).find('[viewid="' + viewId + '"]').length < 1) {
				$(self.target).append(element);
			} else {
				// 针对子组件插入父组件的特殊的插入点处理
				if(targetXmlName==='switchtabbaritem' || targetXmlName === 'switchtabbarcitem' || targetXmlName === 'tab') {
					$(self.target).find('[viewid="' + viewId + '"]').find('.tab-content').append(element)
				}
				// 针对移动端的
				if(self.platform === 'mobile') {
					if(obj.xml === 'tab') {
						let num = $(self.target).find('[viewid="' + viewId + '"]').find('[xml="tab"]').length			
						$(element).find('.tab-content').css('left', (-num * 100) +'%')
					}
					if(targetXmlName==='fields') {
						var data = JSON.parse(target.getAttribute("data"))
						if(data._customData && data._customData.allowLeftMove) {
							$(element).addClass('swiper-slide')
						}
						if(obj.xml === 'leftslipbuttongroup') {
							$(self.target).find('[viewid="' + viewId + '"]').find('.fields-content').after(element)
						} else {
							$(self.target).find('[viewid="' + viewId + '"]').find('.fields-content').append(element)
						}
					} else if(/filter$/.test(targetXmlName)){
						$(self.target).find('[viewid="' + viewId + '"]').find('.filter-container').append(element)
					} else if(targetXmlName==='latticepanel'){
						var cols = target.getAttribute("cols");
						if(cols && !isNaN(cols) && Number(cols)>0){
							var g = Math.floor(index/cols);
							var i = index - cols*g;
							$(self.target).find('[viewid="' + viewId + '"]').find('.group').eq(g).find('.group-item').eq(i).append(element);
						}else{
							$(self.target).find('[viewid="' + viewId + '"]').append(element);
						}
					} else if(targetXmlName==='groupfooter') {
						$(self.target).find('[viewid="' + viewId + '"]').parent().find('[xml="fields"]').addClass('no-bblf-mb')
						$(self.target).find('[viewid="' + viewId + '"]').append(element);
					} else {
						$(self.target).find('[viewid="' + viewId + '"]').append(element);
					}
				} else if(self.platform === 'pc') {
					// 针对pc端
					if(targetXmlName==='defaultfilter' && $(target).parents('.simple-queryfilter').length) {
						if(obj.xml==='radiogroup' || obj.position === 'left') {
							$(self.target).find('[viewid="' + viewId + '"]').find('.filter-left').append(element)
						} else {
							if(obj.xml === 'text') {
								$(element).append('<i class="iconfont iconsousuoicon">搜索</i>')
							}
							$(self.target).find('[viewid="' + viewId + '"]').find('.filter-right').append(element)
						}
					} else if(targetXmlName === 'morefilter'){
						$(self.target).find('[viewid="' + viewId + '"]').find('.morefilter-content').append(element)
					} else {
						$(self.target).find('[viewid="' + viewId + '"]').append(element);
					}
				}
			}
			// 为当前组件需要添加占位符的盒子组件添加占位符
			handleEmptyClass($(element), obj.xml)
			// 为父组件盒子占位符处理
			handleEmptyClass($(target), targetXmlName)
		}catch(e){
		}
		var platform = item.parentElement.getAttribute("platform");
		if(platform && platform.match(/mobile/)){
			$(self.target).attr("platform","mobile");
		}
		//self.view.mainObj[file_id] = main;
	}
	FormatHTML.prototype.mainSetter = function(element, target) { //重写全局main变量节点
		var self = this,viewId,
			file_id = $(target).closest('.show').attr('file_id');
		target = target ? target : self.target;
		viewId = target.getAttribute("viewid");
		if(target.id === 'view') { //新增的组件不嵌套
			main.appendChild(self.view.createXML(element));
		} else {
			main.querySelector('[viewid="' + viewId + '"]').appendChild(self.view.createXML(element));
		}
	}
	// 初始化自定义数据用于渲染html节点
	FormatHTML.prototype.initCustomData = function(obj, item, extendData = {}) {
		var hasChild = item.hasChildNodes() && "htmltext" !== obj['xml'] && "text" !== obj['xml']
		obj._customData = obj._customData || {}
		if(extendData) obj._customData = Object.assign({}, extendData, obj._customData)
		obj._customData.plat = this.platform
		obj._customData.hasChild = hasChild
		if(obj.xml==='groupfooter') {
			obj._customData.style = $(item).parent().find('fields').attr('style')
		}
		if(obj._customData.active && obj.value && obj._customData.active === obj.value) {
			obj._customData.style = obj._customData.style + obj._customData.activestyle
		}
		if(hasChild) {
			if(obj.xml === 'fields') {
				var index = -1
				for(let i=0; i< item.childNodes.length; i++) {
					if(item.childNodes[i].tagName && item.childNodes[i].tagName.toLowerCase() === 'leftslipbuttongroup') {
						index = i
						break
					}
				}
				if(index !== -1) {
					obj._customData.allowLeftMove = true
				}
			}
		}
	}
	window.FormatHTML = function(allXML, panel) {
		return new FormatHTML(allXML, panel);
	}
	function getTargetElem(target, xmlName) {
		var emptyBoxWidgets = ["panel", "flexpanel", "queryfilter", "defaultfilter", "datagrid", "fields", "leftslipbuttongroup", "groupfooter"] // 需要有占位符的盒子组件
		var platform = $('.show-container .show>.view')[0].getAttribute('platform')
		if(emptyBoxWidgets.includes(xmlName)) {
			if((xmlName === 'fields' || xmlName === 'datagrid')) {
				if(platform === 'mobile') return target.find('.fields-content')
				if(platform === 'pc') {
					if(target.attr('xml') === 'fields') {
						return target
					} else {
						return target.find('[xml="fields"]')
					}
				}
			}
			if(xmlName === 'queryfilter' && platform === 'mobile') {
				target = target.find('.filter-container')
				return target
			}
			return target
		}
	}
	// 为盒子组件添加占位符
	// action: 1为add, 0为remove
	window.handleEmptyClass = function(target, xmlName, action) {
		target = getTargetElem(target, xmlName)
		if(target) {
			if(target.find('[xml]').length) {
				target.removeClass('empty-box')
			} else {
				if(!target.attr('data-content-after')) {
					target.attr('data-content-after', '可在此区域为'+($('#menu .menu-content li[node='+xmlName+']').attr('title') || xmlName)+'添加子组件')
				}
				target.addClass('empty-box')
			}
		}
	}
})();