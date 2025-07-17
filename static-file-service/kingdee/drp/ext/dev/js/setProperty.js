define([
	"jquery",
	"jqTmpl",
	"js/additionalProps.js",
	"text!../pages/property.htm",
	], function($,jqTmpl,additionalProps,propertyTmpl) {
	return {
		xmlProperty: function(data,node,selector) { //进行右侧的属性栏的操作
			var _self = this,dataArr = [],attributes,pArr=[],IdsArr = [],file_id,mainXml;
			this.viewJS = require("js/view.js");
			this.dataMapping = require("js/dataMapping.js");
			file_id = $('.tab-container .tab.active').attr("file_id");
			mainXml = this.viewJS.getMain(file_id);
			if($(node).attr("data")){
				dataArr = $.extend(true,[],this.viewJS.commonProperties);//属性列表默认是通用属性
			    dataArr = _self.filterPropByCtrl(node,dataArr,IdsArr);
                //IdsArr通用属性控件名
			    dataArr.forEach(item=>{
			       IdsArr.push(item.id);
			    })
				//加入此控件相关的properties
				if($('#menu li[node="'+node.getAttribute('xml')+'"]').length>0){
					pArr = JSON.parse($('#menu li[node="'+node.getAttribute('xml')+'"]').attr('properties'));
					for(var i =0;i < pArr.length;i++){
						if(("isshowinlist"  === pArr[i]['id'])&& ("listView" === $(mainXml).attr('type'))) continue;
						pArr[i]['value'] = "";
						pArr[i]['displayValue'] = "";
						if(pArr[i]['valueList']){
							pArr[i]['valueList'] = JSON.stringify(pArr[i]['valueList']);
						}else{
							if('popselectdata' === pArr[i]['type']){
								var valuelist = _self.viewJS.getOptionsData($('.focus-layer')),sname="",svalue="";
								pArr[i]['valueList'] = JSON.stringify(valuelist);
								$.each(valuelist.data.body,function(i,v){
									if(v['selected'] && (v['selected'] === true || v['selected'] === "true")){
										sname = v['name'] ? v['name'] : "";
										svalue = v['value'] ? v['value'] : "";
										var attributes = JSON.parse($(node).attr("data"));
										attributes.value = svalue
										$(node).attr("data",JSON.stringify(attributes))
									}
								});
								pArr[i]['displayValue'] = sname;
							    pArr[i]['value'] = svalue;
							}
						}
						//将控件私有properties以特定顺序追加到公有属性列表中
						var di = dataArr.findIndex(item=>{return item.id === pArr[i]['id']})
						if(di !== -1){
						    dataArr.splice(di,1);
							IdsArr.splice(di,1);
						}
						if(pArr[i]['index'] > dataArr[dataArr.length-1]['index']){
							dataArr.push(pArr[i]);
							IdsArr.push(pArr[i]['id']);
						}else{
							for(var j = 0;j<dataArr.length;j++){
								if(pArr[i]['index'] < dataArr[j]['index']){
									dataArr.splice(j,0,pArr[i]);
									IdsArr.splice(j,0,pArr[i]['id']);
									break;
								}
							}
						}
					}
				}
				attributes = JSON.parse($(node).attr("data"));
				for(var i in  attributes){
					// 剔除自定义处理数据
					if(i==='_customData') continue
					if($.inArray(i,["autocreated","category","node","draggable","platform","properties","data","xml","viewid","singletag"])=== -1){
						if($.inArray(i,IdsArr) !== -1){//是通用属性,控件属性值覆盖通用属性值
							var index = $.inArray(i,IdsArr);
							if(dataArr[index]["type"] === "bool" || dataArr[index]["type"] === "checkbox"){
								if(['false',false,0,'0'].includes(attributes[i])){
									dataArr[index]["value"] = false;
								}else{
									dataArr[index]["value"] = true;
								}
							}else{
								dataArr[index]["value"] = attributes[i];
								if(this.dataMapping[i]){
									dataArr[index]["displayValue"] = this.dataMapping[i][attributes[i]] ? this.dataMapping[i][attributes[i]] : attributes[i];
								}
							}
						}else{//不是通用属性 添加到属性列表中
							if(this.dataMapping[i]){
								var displayValue = this.dataMapping[i][attributes[i]];
								displayValue = displayValue ? displayValue : attributes[i];
								dataArr.push({id:i,name:i,value:attributes[i],displayValue:displayValue,type:"select"});
							}else{
								dataArr.push({id:i,name:i,value:attributes[i],type:"text"});
							}
						}
					}
				}
				let k = dataArr.findIndex(item=>{return item.id === 'controltype'})
				let n = this.viewJS.controlsMap.findIndex(item=>{return item.id === attributes['xml']})
				if(n !== -1){
				    dataArr[k].value = this.viewJS.controlsMap[n].name
				}
			}else{
				var dataArr = Array.prototype.slice.call(node.attributes); //获取html节点全部属性的数组
				var nodeName = {name:"nodeName",value:node.nodeName};
				var textContent = {name:"textContent",value:node.innerText};
				dataArr.push(nodeName);
				dataArr.push(textContent);
			}
			if(dataArr.length>0){
			    var stylearr = dataArr.filter(item=>{return item.category === "style"});
				var basearr = dataArr.filter(item=>{return item.category === ""});
				stylearr = stylearr.filter(item=>{return item.id !== "defaultvalue"});
				if($(node).closest('[xml="datagrid"]').length>0){
					basearr = basearr.filter(item=>{return item.id !== "cols24"});
				}
				if(node.getAttribute('xml') === 'menubutton'){
				    basearr.push({category: "",id: "ops",index: 20000,name: "操作代码",required: false,type: "operations",value: ""});
				}
			    $(selector+' [link-tab="base-prop"]').append($(propertyTmpl).tmpl(basearr));
				$(selector+' [link-tab="style-prop"]').append($(propertyTmpl).tmpl(stylearr));
				//1.开发环境的都能修改
				//2.生产环境的只有非标准文件并且不是本地存储的可以修改
				//以上两个条件外的都不能修改
				if(this.viewJS.allowEdit){
					$(selector).find('input').removeAttr("disabled");
				}else{
					$(selector).find('input').attr("disabled",true);
				}
				$(selector).find('[link-attr="controltype"] input').attr("disabled",true);
			}else{
				$(selector).remove();
			}
		},
		editProperty: function(ele,mainObj) { //编辑右侧属性栏信息
			var _self = this,name,value,viewid,index,mainHtml,mainXml,file_id;
			file_id = $(ele).closest('[link-id]').attr('file_id');
			mainHtml = mainObj[file_id+"_html"];
			mainXml = mainObj[file_id];
			name = $(ele).closest("[link-attr]").attr('link-attr');
			if($(ele).attr('type') === "checkbox"){
				value = $(ele).is(':checked');
			}else{
				value = $(ele).val();
			}
			if(['width','height','minwidth'].includes(name)){
				if(value.match(/\d+/) && !value.match(/px|%|calc|auto/g)){
					value = value + 'px';
				}
			}
			index = $(ele).closest('ul').attr('index');
			viewid = $(ele).closest('[link-id]').attr('link-id');
			if(index){
				this.synchroSrcNode($(mainHtml).find('[viewid="'+viewid+'"]')[0].childNodes[index],name,value);
				if(name.toLowerCase() === 'valuelist') {
					this.synchroSrcNode($(mainHtml).find('[viewid="'+viewid+'"]')[0].childNodes[index],'value',$(ele).closest("[link-attr]").find(".iframe-layer-focus").val());
				}
			}else{
				this.synchroSrcNode($(mainHtml).find('[viewid="'+viewid+'"]')[0],name,value);
				if(name.toLowerCase() === 'valuelist') {
					this.synchroSrcNode($(mainHtml).find('[viewid="'+viewid+'"]')[0],'value',$(ele).closest("[link-attr]").find(".iframe-layer-focus").val());
				}
			}
			if($.inArray(name,["hidden","disabled","required"]) === -1){
				mainXml.querySelector('[viewid="'+viewid+'"]').setAttribute(name, value);
			}else{
				if(value === true || value === "true"){
					mainXml.querySelector('[viewid="'+viewid+'"]').setAttribute(name, value);
				}else{
					mainXml.querySelector('[viewid="'+viewid+'"]').setAttribute(name, false);
				}
			}
			if("select" === $(mainXml).find('[viewid="'+viewid+'"]')[0].nodeName.toLowerCase()){
				var xmlstr = $(mainHtml).find('[viewid="'+viewid+'"]').attr('xmlstr');
				if(xmlstr){
					$(mainXml).find('[viewid="'+viewid+'"]').empty().append(xmlstr);
					if(name.toLowerCase() === 'valuelist') {
						mainXml.querySelector('[viewid="'+viewid+'"]').setAttribute('value', $(ele).closest("[link-attr]").find(".iframe-layer-focus").val());
					}
				}
			}
			if(file_id.split("_")[1]==="expand"){
				$(mainHtml).find('[viewid="'+viewid+'"]').addClass("expand-editing").parents().addClass("expand-editing");
				$(mainXml).find('[viewid="'+viewid+'"]').addClass("expand-editing").parents().addClass("expand-editing");
			}
			mainObj[file_id+"_html"] = mainHtml;
			mainObj[file_id] = mainXml;
			var activetab = $('.node-property ul.property .private-tab [tab].active').attr('tab');
			$('.show-container .show .switch.active').trigger('click',viewid);
			// 当前编辑属于morefilter，morefilter-content显示 
			$(mainHtml).find('[viewid="'+viewid+'"]').parents("[xml='morefilter']").find('.morefilter-content').show();
            if(activetab !== 'base-prop'){
            	$('.node-property ul.property .private-tab [tab="'+activetab+'"]').trigger('click');
            }
		},
		editFileProperty: function(ele,mainObj) { //编辑右侧文件属性栏信息;
			var _self = this,mainHtml,mainXml,name,value,file_id,fdata;
			name = $(ele).parent().attr("link-attr");
			if(ele[0].type === 'checkbox'){
			   value = ele[0].checked;
			}else{
			   value = $(ele).val().trim();
			}
			file_id = $('.tab.active').attr("file_id");
			fdata = JSON.parse($(ele).closest('.file-property').attr("file-data"));
			mainHtml = mainObj[file_id+"_html"];
			mainXml = mainObj[file_id];
			//更新filedata
			fdata[name] = value;
			$(ele).attr("value",value);
			$(ele).closest('.file-property').attr("file-data",JSON.stringify(fdata));
			//更新文件显示名
			if($.inArray(name,["name","plugin","ao","bo","tablename","pkfield","datatype","extendModel","needlogin","logintype"]) !== -1){
				if(name==="name"){$('.tab.active').find('span.name').text(value);}
				if(name === "extendModel"){
				    mainXml.setAttribute("extend",value);
				}else{
				    mainXml.setAttribute(name,value);
				}
				if(name === "needlogin" && [true,'true','1'].includes(value)){
			        $('.file-property').find('#logintype').closest('li').show();
			    }
				$('.show-container .show .xml-btn.active').trigger('click');
			}
			//更新文件列表中的id,name,package,basedir
			if($('.file-tab [type="history"]').hasClass('active')){
				$('#right-property-list .file-history').find('[id="'+file_id+'"]').attr(name,value);
			}else{
				$('#right-property-list .file').find('[id="'+file_id+'"]').attr(name,value);
			}
			//更新maindata
			if(mainObj[file_id+"_data"]){
				mainObj[file_id+"_data"][name] = value;
				if(name==="viewId"){
					mainObj[file_id+"_data"]['id'] = value;
				}
			}
			if(mainObj[file_id+"_filedata"]){
				mainObj[file_id+"_filedata"][name] = value;
				if(name==="viewId"){
					mainObj[file_id+"_filedata"]['id'] = value;
				}
			}
		},
		synchroSrcNode: function(node,name,value){
			var dataObj,oldAttr,reg;
			node = $(node).attr('xml') ? node : $(node).closest('[xml]')[0];
			dataObj = JSON.parse($(node).attr("data"));
			oldAttr = dataObj[name];
			dataObj[name] = value;
			$(node).attr("data",JSON.stringify(dataObj));
			if(node.getAttribute("xml") !== "datagrid"){node.innerHTML = node.innerHTML.replace(oldAttr,value);}
			if($.inArray(name,['width','height','minwidth',"color"]) !== -1){
				if(name === 'minwidth'){ name = "minWidth"}
				node.style.setProperty(name, value)
			} if(name === 'css'){
				node.setAttribute('style', value)
			}else{
				node.setAttribute(name, value);
			}
		},
		//同步组件的name，placeholder属性
		synchro: function(i, ele, value) {
			var _self = this;
			switch(i) {
				case 'name':
					var sy = ele.attr('xml')
					if(ele.attr('synchro')) {
						ele.text(value);
					}
					if(ele.find('[synchro=' + sy + ']')) {
						ele.find('[synchro=' + sy + ']').text(value);
					}
					break;
				case 'placeholder':
					var ph;
					if(ph = ele.find('input[placeholder]')) {
						ph.prop('placeholder', value);
					}
					break;
			}
		},
		filterPropByCtrl(node,dataArr){
		    var xml = node.getAttribute('xml')
			var findex = dataArr.findIndex(item=>{return item.id === "cols24"});
			if(this.viewJS.platform === 'mobile'){
				dataArr[findex]['id'] = 'flex';
				dataArr[findex]['name'] = 'flex占比';
			}
			var category = $('#menu ul li[node="'+xml+'"]').closest('ul').attr('category');
			if(category !== '基本控件' || ['button','menubutton','img','image','video','label'].includes(xml)){
			    dataArr = dataArr.filter(item=>{return !['editable','orm','table','formula','linkorm','labelwidth','index','labelstyle','inputstyle','value','async'].includes(item.id)});
			}
			if(additionalProps[xml] && additionalProps[xml]['common']){
			   dataArr = dataArr.concat(additionalProps[xml]['common']);
			}
			if(additionalProps[xml] && this.viewJS.platform === 'mobile' && additionalProps[xml]['mobile']){
			   dataArr = dataArr.concat(additionalProps[xml]['mobile']);
			}
			if(additionalProps[xml] && this.viewJS.platform === 'pc' && additionalProps[xml]['pc']){
			   dataArr = dataArr.concat(additionalProps[xml]['pc']);
			}
			return dataArr
		}
	}
});