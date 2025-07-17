define([
	"jquery",
	"jqTmpl",
	"js/layer.js",
	"text!../pages/dialog.htm",
	], function($,jqTmpl,layer,dialogTmpl) {
	return {
		init: function(data,id) {
			var _self = this;
			_self.viewJS = require("js/view.js");
			_self['#'+id+'_tableData'] = data;
		},
		initTemplate:function(data,id,multiselect,params, editable){
			var _self=this,table = $('<div class="layer-format-table"><div class="table-content"><table multiselect="'+multiselect+'"></table></div></div>'),tHead,tbody;
			tHead = _self.createThead(data,multiselect);
			tbody = _self.createTbody(data, editable);
			table.find('table').append(tHead);
			table.find('table').append(tbody);
			if(params){
				table.find('.table-content').before(_self.initTableTitle(params));
				table.find('.table-content').before(_self.initSubToorBar(params));
			}
			if(table.find('tr.linked').length>0){
				table.find('tbody tr').addClass('hide');
				table.find('tbody tr.linked').removeClass('hide');
			}else{
				table.find('tbody tr').removeClass('hide');
				table.find('.switch span').replaceWith('<span type="all">显示全部</span>');
				//table.find('.switch').addClass('hide');
			}
			return table;
		},
		initEvents:function(id,data){
			var _self = this;
			$('#'+id).on('click',function(e){
				if($(e.target).closest('td.editing').length<1){
					$('td.editing input').trigger("eblur");
				}
			});
			$('#'+id).on('click', '.layer-format-table tbody td[name="cb"]',function(e){
				if($(this).closest('table').attr('multiselect') === "false"){
					$(this).closest('tr').siblings('tr').find('input[type="checkbox"]')['prop' ? 'prop': 'attr']("checked",false);
					$(this).closest('tr').siblings('tr').removeClass('selected');
				}
				if($(e.target).attr('type')){
					if($(e.target).is(':checked')){
					    $(e.target).closest('tr').addClass('selected');
				    }else{
					    $(e.target).closest('tr').removeClass('selected');
				    }
				}else{
					$(e.target).find('input').trigger('click');
				}
				e.stopPropagation() ? e.stopPropagation() : e.cancelBubble = true;
			});
			$('#'+id).on('click', '.layer-format-table tbody tr',function(e){
				var fileId,content;
				fileId = $('.tab.active').attr('file_id');
				content = $('.publishMenuDialog').find('.main-content');
				if($(this).hasClass('selected')){
					$(this).removeClass('selected');
					$(this).find('td[name="cb"]').find('input[type="checkbox"]')['prop' ? 'prop': 'attr']("checked",false);
				}else{
					$(this).siblings('tr').removeClass('selected');
					$(this).addClass('selected');
					$(this).siblings('tr').find('td[name="cb"]').find('input[type="checkbox"]')['prop' ? 'prop': 'attr']("checked",false);
					$(this).find('td[name="cb"]').find('input[type="checkbox"]')['prop' ? 'prop': 'attr']("checked",true);
					if('app-moudle' === id){
						var mid;
				    	mid = $(this).attr("fid");
				    	_self.renderTable('menu-group',{viewid:fileId,moduleid:mid},content,true);
				    	content.find('#app-moudle').addClass('hide');
				    	content.find('#menu-group').removeClass('hide');
					}else if('menu-group' === id){
						var gid;
				    	gid = $(this).attr("fid");
				    	_self.renderTable('menu-list',{viewid:fileId,groupid:gid},content,true);
					}
				}
			});
			$('#'+id).on('click', '.layer-format-table tbody tr input',function(e){
				var fileId,content;
				fileId = $('.tab.active').attr('file_id');
				content = $('.publishMenuDialog').find('.main-content');
				let parentTr = $(this).parent().parent()
				if(!parentTr.hasClass('selected')){
					parentTr.siblings('tr').removeClass('selected');
					parentTr.addClass('selected');
					parentTr.siblings('tr').find('td[name="cb"]').find('input[type="checkbox"]')['prop' ? 'prop': 'attr']("checked",false);
					parentTr.find('td[name="cb"]').find('input[type="checkbox"]')['prop' ? 'prop': 'attr']("checked",true);
					if('app-moudle' === id){
						var mid;
						mid = parentTr.attr("fid");
						_self.renderTable('menu-group',{viewid:fileId,moduleid:mid},content,true);
						content.find('#app-moudle').addClass('hide');
						content.find('#menu-group').removeClass('hide');
					}else if('menu-group' === id){
						var gid;
						gid = parentTr.attr("fid");
						_self.renderTable('menu-list',{viewid:fileId,groupid:gid},content,true);
					}
				}
				e.stopPropagation() ? e.stopPropagation() : e.cancelBubble = true;
			});

			//多选表格全选功能
			$('#'+id).on('click', '.layer-format-table thead td[name="cb"]',function(e){
				if($(this).find('input').is(':checked')){
					$(this).closest('.layer-format-table').find('td[name="cb"] input')['prop' ? 'prop': 'attr']("checked",true);
					$(this).closest('.layer-format-table').find('tbody tr').addClass('selected');
				}else{
					$(this).closest('.layer-format-table').find('td[name="cb"] input')['prop' ? 'prop': 'attr']("checked",false);
					$(this).closest('.layer-format-table').find('tbody tr').removeClass('selected');
				}
				e.stopPropagation() ? e.stopPropagation() : e.cancelBubble = true;
			});
			$('#'+id).on('dblclick', '.layer-format-table td',function(e){
				if($(this).attr('name') === "cb" || (!(data['edit'])&&!(data['edit-inline']))) return;
				if($(this).closest('.layer-format-table').find('.tools[type="edit"]').length>0) return;
				var w = $(this).width();
				$('.editing input').trigger("eblur");
				$('.editing').removeClass('editing');
				$(this).html('<input type="text" name="'+$(this).attr("name")+'" value="'+$(this).text()+'"/>');
				$(this).addClass('editing');
				$(this).width(w);
				$(this).find('input').focus();
				e.stopPropagation() ? e.stopPropagation() : e.cancelBubble = true;
			});
			$('#'+id).bind('eblur','.layer-format-table td.editing input',function(e){
				if($('.editing input').length>0){
					$('.editing input').closest('td').html($('.editing input').val());
				}
				$('.editing').removeClass('editing');
			});
			//更改显示顺序
			/**$('#'+id).on('change','.layer-format-table td.editing input',function(e){
				var _this = e.target,oldIndex;
				oldIndex = parseInt($(_this).attr("value"));
				oldIndex = isNaN(oldIndex) ? 0 : oldIndex;
				if($(_this).closest('td').attr('name') === "index"){
					var trArray = [];
					$(_this).closest('tbody').find('tr').each(function(i,v){
						var trindex = 0;
						if($(v).find('td[name="index"]').hasClass('editing')){
							trindex = $(v).find('td[name="index"] input').val();
							$(v).find('td[name="index"] input').attr("value",trindex);
						}else{
							trindex = $(v).find('td[name="index"]').text();
						}
						trindex = parseInt(trindex);
						trindex = isNaN(trindex) ? 0 : trindex;
						if(!trArray[trindex]){
							trArray[trindex] = v.outerHTML;
						}else{
							if($(v).find('td[name="index"]').hasClass('editing')){
								var old = trArray[trindex];
								trArray[oldIndex] = old;
								trArray[trindex] = v.outerHTML;
							}else{
								trArray[oldIndex] = v.outerHTML;
							}
						}	
					});
					if(trArray.length>0){
						$.each(trArray,function(i,v){
							if($(v).find('td[name="index"]').hasClass('editing')){
								textindex = $(v).find('td[name="index"] input').val();
							}else{
								textindex = $(v).find('td[name="index"]').text();
							}
							if(eval(i - textindex) !== 0){
								var node = $(v);
								if(node.find('td[name="index"]').hasClass('editing')){
									node.find('td[name="index"] input').val(i);
								}else{
									node.find('td[name="index"]').text(i);
								}
								trArray[i] = node[0].outerHTML;
							}
						});
						$(_this).closest('tbody').empty().append(trArray.join(""));
					}
				}
				e.stopPropagation() ? e.stopPropagation() : e.cancelBubble = true;
			});*/
			$('#'+id).on('click','.layer-format-table .tools',function(e){
				var _this = e.currentTarget,type,data;
				type = $(_this).attr("type");
				data = _self['#'+id+'_tableData'];
				switch(type){
				    case "edit":
				    	var selectedRow = $(_this).closest('.layer-format-table').find('tbody').find('tr.selected');
				    	if(selectedRow.length>0){
				    		if(selectedRow.length>1){
				    			_self.showTips("每次只能编辑一行");
				    		}else{
					    		var obj = _self.getEditReqData(id);
					    		_self.editTable(id,obj);
				    		}
				    	}else{
				    		_self.showTips("请选择编辑项");
				    	}
				    	break;
				    case "delete":
				    	var selectedRows = $(_this).closest('.layer-format-table').find('tr.selected'),fid,selections;
				    	if(selectedRows.length>0){
				    		selectedRows.remove();
							selections = _self.getRowPKValue(selectedRows);
							var obj = _self.getMappingFileId(id);
				    		_self.ToolBarAction(id,"delete",obj['fileId'],selections);
				    	}else{
				    		_self.showTips("请选择删除项");
				    	}
				    	break;
				    case "create":
				    	if($(_this).closest('.layer-format-table').find('.table-title').attr('type') === "blue"){
				    		var obj = _self.getEditReqData(id,true);
				    		_self.editTable(id,obj);
				    	}else{
				    		$(_this).closest('.layer-format-table').find('tbody').append(_self.createTr(data));
				    	}
				    	break;
				    default:break;
				}
				e.preventDefault();
			});
			$('#'+id).on('mouseover','.layer-format-table .tools',function(e){
				if($(this).find('.tools-select-box').length>0){
					$(this).find('.tools-select-box').show();
				}else{
					$('.tools-select-box').hide();
				}
			});
			$('#'+id).on('mouseleave','.layer-format-table .tools-select-box',function(e){
				$('.tools-select-box').hide();
			});
			$('#'+id).on('click','.layer-format-table .select-list',function(e){
				if($(this).next().hasClass('option-box')){
					$(this).next().show();
				}else{
					$(this).next().hide();
				}
			});
			$('#'+id).on('mouseleave','.layer-format-table .option-box',function(e){
				$(this).hide();
			});
			$('#'+id).on('selectAction','.layer-format-table .option-box li',function(e){
				if($(this).parent().prev().hasClass('select-list')){
					$(this).parent().prev().find('span').text($(this).text());
					$(this).parent().prev().find('span').attr("fid",$(this).attr("fid"));
				}
				$(this).parent().hide();
				e.stopPropagation() ? e.stopPropagation() : e.cancelBubble = true;
			});
			$('#'+id).on('click','.tools-select-box li',function(e){
				var type = $(this).attr("value"),iservice,fid,selections;
				var selectedRows = $(this).closest('.layer-format-table').find('tr.selected');
				if(selectedRows.length>0){
					selections = _self.getRowPKValue(selectedRows);
				}else{
					_self.showTips("请选择操作项");
					return false;
				}
				var obj = _self.getMappingFileId(id);
				switch(type){
				   case "enable":iservice="enable";break;
				   case "mydisable":iservice="mydisable";break;
				   case "show":iservice="show";break;
				   case "hide":iservice="hide";break;
				}
				_self.ToolBarAction(id,iservice,obj['fileId'],selections);
			});
			$('#'+id).on('mouseover','.sub-toolbar .switch',function(e){
				var type = $(this).find('span').attr('type');
				$(this).siblings('.switch-box').find('li[type="'+type+'"]').addClass('hide');
				$(this).siblings('.switch-box').show();
			});
			$('#'+id).on('mouseleave','.sub-toolbar .switch-box',function(e){
				$(this).hide();
				$(this).find('li').removeClass('hide');
			});
			$('#'+id).on('click','.switch-box li',function(e){
				$('.switch span').text($(this).text()).attr('type',$(this).attr('type'));
				if($(this).attr('type') === 'relate'){
					//显示相关
					$(this).closest('.layer-format-table').find('tbody tr').addClass('hide');
					$(this).closest('.layer-format-table').find('tbody tr.linked').removeClass('hide');
				}else{
					//显示全部
					$(this).closest('.layer-format-table').find('tbody tr').removeClass('hide');
				}
				$(this).parent().hide();
				$(this).parent().find('li').removeClass('hide');
				e.stopPropagation() ? e.stopPropagation() : e.cancelBubble = true;
			});
			$('#'+id).on('click','.export-btn',function(){
				if($(this).closest('.layer-format-table').find('tr.selected').length<1){
					_self.showTips("请选择导出项"); 
					return false;
				}
				var obj = {},fileId,list=[];
				fileId = $('.tab-container .tab.active').attr("file_id");
				obj['extag'] = new Date().getTime() + Math.round(Math.random(200)*100);
				obj['exname'] = _self.viewJS.mainObj[fileId].getAttribute('name');
				$(this).closest('.layer-format-table').find('table td[name="status"]').removeAttr('class');
				$('.exportDialog').find('.e-download').hide();
				_self.showTips("正在导出...",[0.3,'#141C31']);
				$(this).closest('.layer-format-table').find('tr.selected').each(function(i,v){
					list.push({extype:$(v).attr('fid'),excode:$(v).attr('excode')?$(v).attr('excode'):""});
				});
				if(list[0]){
					obj['extype'] = list[0]['extype'];
					obj['excode'] = list[0]['excode'];
					_self.exportAction(id,obj);
					list.splice(0,1);
				}
				_self[obj['extag']+'_interval'] = window.setInterval(function(){
					if($('#'+id).attr('exportFlag')){
						if(list[0]){
							obj['extype'] = list[0]['extype'];
							obj['excode'] = list[0]['excode'];
							_self.exportAction(id,obj);
							list.splice(0,1);
						}else{
							if($('.exportDialog').find('table td[name="status"].success').length>0){
								$('.exportDialog').find('.e-download a').attr("href",window.location.origin+"/jfsEditor/exportDownload.jhtml?extag="+obj['extag']+"&&"+"exname="+encodeURI(obj['exname']));
								$('.exportDialog').find('.e-download').show();
							}
							clearInterval(_self[obj['extag']+'_interval']);
						}
					}
				},500);
			});
		},
		initTableTitle:function(params){
			var _self = this;
			var head = $('<div class="table-title" style="background:#649FFF;"><div class="left"></div><div class="right"></div></div>');
			if(params['bg']){
				head.css("background",params['bg']);
			}
			if(params['return']){
				head.find('.left').append(_self.getReturn());
			}
			if(params['title']){
				params['type'] === "blue" ? head.find('.left').after(_self.getTitle(params['title'])) : head.find('.left').append(_self.getTitle(params['title']));
				head.attr("type",params['type']);
			}
			if(params['statusTools']){
				head.find('.right').append(_self.getStatusTools(params['statusTools']));
			}
			if(params['edit']){
				head.find('.right').append(_self.getEdit());
			}
			if(params['create']){
				head.find('.right').append(_self.getCreate());
			}
			if(params['delete']){
				head.find('.right').append(_self.getDelete());
			}
			if(params['export']){
				head.find('.right').append(_self.getExport());
			}
			return head;
		},
		initSubToorBar:function(params){
			var _self = this;
			var head = $('<div class="sub-toolbar"></div>');
			if(params['selectBox']){
				head.append(_self.getSelectBox(params['selectBox']['datas'],params['selectBox']['defaultValue']));
			}
			if(params['switch']){
				head.append(_self.getSwitch());
			}
			if(head.children().length>0){
				return head;
			}
		},
		getReturn:function(){
		    return '<i class="iconfont icon-fanhui"></i>';	
		},
		getTitle:function(title){
			return '<span>'+title+'</span>';
		},
		getEdit:function(){
			return '<span class="tools" type="edit"><i class="iconfont icon-bianji"></i></span>';
		},
		getDelete:function(){
			return '<span class="tools" type="delete"><i class="iconfont icon-shanchu1"></i></span>';
		},
		getCreate:function(){
			return '<span class="tools" type="create"><i class="iconfont icon-xinzeng1"></i></span>';
		},
		getStatusTools:function(actionList){
			var container = $('<div class="tools"><i class="iconfont icon-guanli"></i><ul class="tools-select-box"></ul></div>');
			for(var i = 0; i<actionList.length;i++){
				container.find('ul').append('<li value="'+actionList[i].value+'">'+actionList[i].name+'</li>');
			}
			return container[0].outerHTML;
		},
		getSelectBox:function(datas,defaultValue){
			var container = $('<div></div>'),ul = $('<ul class="option-box"></ul>');
			var select = $('<div class="select-list"><span></span><i class="iconfont icon-select"></i></div>');
			select.find('span').attr('fid',datas[defaultValue - 1]['FID']);
			select.find('span').text(datas[defaultValue - 1]['FNAME']);
			for(var i = 0;i<datas.length;i++){
				ul.append('<li fid="'+datas[i]["FID"]+'">'+datas[i]["FNAME"]+'</li>');
			}
			container.append(select);
			container.append(ul);
			return container[0].innerHTML;
		},
		getSwitch:function(){
			return '<div class="switch"><i class="iconfont icon-paixu"></i><span type="relate">显示相关</span></div><ul class="switch-box"><li type="relate">显示相关</li><li type="all">显示全部</li></ul>';
		},
		getExport:function(){
			return '<span class="export-btn hide">开始导出</span>';
		},
		createThead:function(data,multiselect){
			var _self=this,tHead = $('<thead><tr></tr></thead>');
			for(var j = 0; j < data['head'].length;j++){
				for(var z in data['head'][j]){
					if(z === "cb"){
						multiselect ? tHead.find('tr').append('<td name="cb"><input type="checkbox"/></td>'):tHead.find('tr').append('<td></td>');
					}else{
						tHead.find('tr').append('<td>'+data['head'][j][z]+'</td>');
					}
				}
			}
			return tHead;
		},
		createTbody:function(data, editable){
			var _self=this,tbody = $('<tbody></tbody>');
			for(var i = 0; i < data['body'].length;i++){
				var tr = _self.createTr(data);
				for(var k in data['body'][i]){
					if("cb" === k){
						if(data['body'][i][k] === "1"){
							tr.find('td[name="cb"] input').click();
						}
					}else{
						if(editable) {
							tr.find('td[name="'+k+'"]').html('<input class="tabel-input" value="'+data['body'][i][k]+'"/>');
						}else {
							tr.find('td[name="'+k+'"]').text(data['body'][i][k])
						}
					}
					if(tr.find('td[type="fixdata"]').length>0 && tr.find('td[type="fixdata"]').text().trim().length<1){
						var fixname = tr.find('td[type="fixdata"]').attr("name").split("/"),t1,t2;
						t1 = _self.dataMapping(fixname[0],data['body'][i][fixname[0]]);
						t2 = _self.dataMapping(fixname[1],data['body'][i][fixname[1]]);
						tr.find('td[type="fixdata"]').text(t1+"/"+t2);
					}
				}
				if(data['body'][i]['FLINKID']&&(''+data['body'][i]['FLINKID']).trim().length>0){
					tr.addClass("linked");
				}
				if(data['body'][i]['FLINKID']){tr.attr('flinkid',data['body'][i]['FLINKID']);}
				if(data['body'][i]['FID']){tr.attr('fid',data['body'][i]['FID']);}
				if(data['body'][i]['viewid']){tr.attr('viewid',data['body'][i]['viewid']);}
				if(data['body'][i]['excode']){tr.attr('excode',data['body'][i]['excode']);}
				tbody.append(tr);
			}
			return tbody;
		},
		createTr:function(data){
			var _self=this,standardTr = $("<tr></tr>");
			for(var j = 0; j < data['head'].length;j++){
				for(var z in data['head'][j]){
					if(z === "cb"){
						standardTr.append('<td name="cb"><input type="checkbox"/></td>');
					}else{
						z.match("/") ? standardTr.append('<td type="fixdata" name="'+z+'"></td>') : standardTr.append('<td name="'+z+'"></td>');
					}
				}
			}
			return standardTr;
		},
		getRowData:function(selectedRows){
			var datas = [];
			selectedRows.each(function(i,v){
				var data = {};
				$(v).find('td').each(function(ii,vv){
					var value;
					if($(vv).hasClass('editing')){
						value = $(vv).find('input').val();
					}else{
						value = $(vv).text();
					}
					if("cb" !== $(vv).attr('name')){
						data[$(vv).attr('name')] = value;
					}
				});
				datas.push(data);
			});
			return datas;
		},
		getRowPKValue:function(selectedRows){
			var datas = [];
			selectedRows.each(function(i,v){
				var data = {};
				data['pkValue'] = $(v).attr('fid');
				datas.push(data);
			});
			return datas;
		},
		getSelectRowData:function(selectedRows){
			var datas = [];
			selectedRows.each(function(i,v){
				$(v).find('td').each(function(ii,vv){
					var data = {},value;
					if($(vv).hasClass('editing')){
						value = $(vv).find('input').val();
					}else{
						value = $(vv).text();
					}
					if("cb" !== $(vv).attr('name')){
						data['id'] = $(vv).attr('name');
						data['name'] = $(vv).closest('.layer-format-table').find('thead td:eq('+ii+')').text();
						data['value'] = value;
						data['placeholder'] = "请输入"+name;
						data['required'] = true;
						data['disabled'] = false;
						datas.push(data);
					}
				});
			});
			return datas;
		},
		showTips:function(content,shade){
		    var index = layer.open({
		    	skin:"layer-format-tips",
		    	type:1,
		    	title:false,
		    	closeBtn:0,
		    	shade:shade ? shade : 0,
		    	time:3000,
		    	content:content
		    });
		},
		showEditDialog:function(data){
			var _self=this,content;
			content = $('<div></div>').append($(dialogTmpl).tmpl(data['datas']));
			var index = layer.open({
				skin:"layer-format-edit jfsEditor-d",
				type:1,
				title:data.title,
				content:content[0].outerHTML,
				area:['380px','300px'],
				btn:['确定','取消'],
				yes:function(index,layero){
		            layer.close(index);
				}
			});
		},
		getEditDialogData:function(inputArr){
			var data = {};
			inputArr.each(function(i,v){
				data[$(v).attr('id')] = $(v).val();
			});
			return data;
		},
		dataMapping:function(key,value){
			var text = "";
			switch(key){
			    case "FENABLE":
				    text = value === "0" ? "禁用" : "启用";
			    	break;
			    case "FDISPLAY":
			    	text = value === "0" ? "隐藏" : "显示";
				    break;
				default:break;
			}
			return text;
		},
		getMappingFileId:function(id){
			var viewid = "",fileId = "",head,settings,reqData;
			viewid = $('.tab.active').attr('file_id');
			switch(id){
			    case "app-moudle":
			    	var apptypeid = parseInt($('.layer-format-table .select-list').find('span').attr("fid"));
			    	apptypeid = isNaN(apptypeid) ? 2 : apptypeid;
			    	reqData = {viewid:viewid,apptypeid:apptypeid};
			    	fileId="ModuleListView";
			    	efileId="ModuleEditView";
			    	head = [{"cb":""},{"FNUMBER":"应用模块编码"},{"FNAME":"应用模块名称"},{"FENABLE/FDISPLAY":"状态"}];
			    	var platformData = [
						{FID:1,FNAME:"PC前台门户"},
						{FID:2,FNAME:"PC后台业务中心"},
						{FID:3,FNAME:"掌上分销"},
						{FID:4,FNAME:"掌上BBC"},
						{FID:5,FNAME:"掌上门店"}
					];
			    	var actionList = [
						{name:"启用",value:"enable"},
						{name:"禁用",value:"mydisable"},
						{name:"显示",value:"show"},
						{name:"隐藏",value:"hide"}
					];
			    	settings = {
							"statusTools":actionList,
							"edit":true,
							"create":true,
							"delete":true,
							"switch":true,
							"type":"blue",
							"title":"应用模块",
							"bg":"#649FFF",
							"selectBox":{
								"datas":platformData,
								"defaultValue":2
							}
					}
			    break;
			    case "menu-group": 
			    	fileId="MenuGroupListView";
			    	var mid = $('#app-moudle').find('tr.selected').attr('fid');
			    	reqData = {viewid:viewid,moduleid:mid};
			    	efileId="MenuGroupEditView";
			    	head = [{"cb":""},{"FNUMBER":"菜单分组编码"},{"FNAME":"菜单分组名称"}];
			    	var actionList = [
					    {name:"启用",value:"enable"},
						{name:"禁用",value:"mydisable"}
					]
					settings = {
						"statusTools":actionList,
						"edit":true,
						"create":true,
						"delete":true,
						"switch":true,
						"return":true,
						"type":"blue",
						"title":"菜单分组",
						"bg":"#649FFF"
					}
			    	break;
			    case "menu-list":  
			    	fileId="MenuListView";
			    	var gid = $('#menu-group').find('tr.selected').attr('fid');
			    	reqData = {viewid:viewid,groupid:gid};
			    	efileId="MenuEditView";
			    	head = [{"cb":""},{"FNUMBER":"菜单编码"},{"FNAME":"菜单名称"},{"FICON":"图标"},{"FURL":"关联链接"},{"FORDER":"显示顺序"},{"FENABLE":"启用状态"}];
			    	var actionList = [
						{name:"启用",value:"enable"},
						{name:"禁用",value:"mydisable"}
					]
					settings = {
							"statusTools":actionList,
							"edit":true,
							"switch":true,
							"create":true,
							"delete":true,
							"type":"blue",
							"title":"菜单",
							"bg":"#507FCC"
					}
			    	break;
			    default:break;
			}
			return {
				fileId:fileId,
				efileId:efileId,
				head:head,
				reqData:reqData,
				settings:settings
			};
		},
		ToolBarAction:function(id,iservice,fileId,selections){
			var _self = this;
			var selectData = JSON.stringify({"selections":JSON.stringify(selections)});
			var event = {optarget: "datagrid",async: true,isentrybutton: false,iservice: iservice,pageId: "",id: iservice,type: "onToolBarClick",pageSessionId: fileId,datagridid: "datagrid",data: selectData,isDataChanged: false};
			var data = {Portal:"S",pageId: "",id: fileId,event:JSON.stringify(event)};
			$.ajax({
				type:'POST',
				url:'/dynamicForm/callService.jhtml',
				dataType:'json',
				data:data,
				async:false,
				error:function(err){console.log(err)},
				success:function(res){
					_self.callback(id,res);
				}
		    });
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
		callback:function(id,res){
			var _self = this;
			for(var i = 0; i<res.length;i++){
				var action = res[i]['action'];
				switch(action){
				    case "showMessage":_self.infoDialog(res[i]['object']['message']);break;
				    case "refresh":
				    var obj = _self.getMappingFileId(id);
				    var oldSwitch = $('#app-moudle .switch').find('span').not('.hide')[0].className; 
				    _self.renderTable(id,obj['reqData'],$('.publishMenuDialog').find('.main-content'),true);
				    if((id==="app-moudle") && 'all' === oldSwitch){
				    	$('#app-moudle .switch').trigger('click');
				    }
				    break;
				    default:break;
				}
			}
		},
		renderTable:function(id,reqData,content,refresh){
			var _self = this,bdata = [],data,table,params;
			$.ajax({
				type:'POST',
				url:'/admin/querymenupublish.jhtml',
				dataType:'json',
				data:reqData,
				async:false,
				error:function(data){console.log(data)},
				success:function(res){
					bdata = refresh ? res.datas : [];
					params = _self.getMappingFileId(id);
					data = {
					    head:params['head'],
					    body:bdata
					}
					if(reqData['apptypeid']){
						reqData['apptypeid'] = reqData['apptypeid'] ? reqData['apptypeid'] : 2;
						params['settings']['selectBox']["defaultValue"] = reqData['apptypeid'];
					}
					table = _self.initTemplate(data,id,false,params['settings']);
					_self.init(data,id);
					content.find('#'+id).empty();
					content.find('#'+id).append(table);
				}
			});
		},
		getEditReqData:function(id,create){
			var _self = this,reqData={},url,saveUrl,keyId;
			switch(id){
			    case "app-moudle":
			    	reqData['moduleid'] = create ? "0" : $('#'+id).find('.layer-format-table tr.selected').attr('fid');
			    	reqData['apptypeid'] = create ? "2" : $('#'+id).find('.layer-format-table .select-list span').attr('fid');
			    	reqData['apptypename'] = create ? "PC后台业务中心" : $('#'+id).find('.layer-format-table .select-list span').text();
			    	reqData['moduleid'] = reqData['moduleid'] ? reqData['moduleid'] : "0";
			    	url = '/admin/loadmodule.jhtml';
			    	saveUrl="/admin/savemodule.jhtml";
			    	keyId = reqData['moduleid'];
			    	break;
			    case "menu-group":
			    	reqData['groupid'] = create ? "0" : $('#'+id).find('.layer-format-table tr.selected').attr('fid');
			    	reqData['moduleid'] = $('#app-moudle').find('.layer-format-table tr.selected').attr('fid');
			    	reqData['modulename'] = $('#app-moudle').find('.layer-format-table tr.selected td[name="FNAME"]').text();
			    	reqData['groupid'] = reqData['groupid'] ? reqData['groupid'] : "0";
			    	url = '/admin/loadmenugroup.jhtml';
			    	saveUrl="/admin/savemenugroup.jhtml";
			    	keyId = reqData['groupid'];
			    	break;
			    case "menu-list":
			    	reqData['menuid'] = create ? "0" : $('#'+id).find('.layer-format-table tr.selected').attr('fid');
			    	reqData['viewid'] = $('.tab-container .tab.active').attr('file_id');
			    	reqData['groupid'] = $('#menu-group').find('.layer-format-table tr.selected').attr('fid');
			    	reqData['groupname'] = $('#menu-group').find('.layer-format-table tr.selected td[name="FNAME"]').text();
			    	reqData['menuid'] = reqData['menuid'] ? reqData['menuid'] : "0";
			    	url = '/admin/loadmenu.jhtml';
			    	saveUrl="/admin/savemenu.jhtml";
			    	keyId = reqData['menuid'];
			    	break;
			    default:break;
			}
			return {
				reqData:reqData,
				url:url,
				saveUrl:saveUrl,
				keyId:keyId
			};
		},
		editDialogPanel:function(id,res){
			var data = {};
			switch(id){
			    case "app-moudle":
			    	data = {
			    		title:"应用模块编辑",
			    		icon:res['icon'],
						datas:[{
						    id:"number",
						    name:"模块编码",
							placeholder:"请输入模块编码",
							value:res['number'],
							required:true,
							disabled:false
						},{
							id:"name",
							name:"模块名称",
							placeholder:"请输入模块名称",
							value:res['name'],
							required:true,
							disabled:false
						},{
							id:"typeId_name",
							name:"平台类型",
							placeholder:"请输入平台类型",
						    value:res['typeId_name'],
							required:true,
							disabled:true
						},{
						    id:"icon",
						    name:"图标",
							placeholder:"请输入图标",
							value:res['icon'],
							required:false,
							disabled:false
						},{
							id:"href",
							name:"链接",
							placeholder:"请输入链接",
							value:res['href'],
							required:false,
							disabled:false
						},{
							id:"moduleOrder",
							name:"显示顺序",
							placeholder:"请输入显示顺序",
						    value:res['moduleOrder'],
							required:false,
							disabled:false
						}]
					};
			    	break;
			    case "menu-group":
			    	data = {
			    		title:"菜单分组编辑",
			    		icon:res['icon'],
						datas:[{
						    id:"moduleId_name",
						    name:"应用",
							placeholder:"",
							value:res['moduleId_name'],
							required:true,
							disabled:true
						},{
							id:"groupNumber",
							name:"分组编码",
							placeholder:"请输入分组编码",
							value:res['groupNumber'],
							required:true,
							disabled:false
						},{
							id:"name",
							name:"分组名称",
							placeholder:"请输入分组名称",
						    value:res['name'],
							required:true,
							disabled:false
						},{
						    id:"icon",
						    name:"图标",
							placeholder:"请输入图标",
							value:res['icon'],
							required:false,
							disabled:false
						},{
							id:"groupOrder",
							name:"显示顺序",
							placeholder:"请输入显示顺序",
						    value:res['groupOrder'],
							required:false,
							disabled:false
						}]
					};
			    	break;
			    case "menu-list":
			    	data = {
			    		title:"菜单编辑",
			    		icon:res['icon'],
						datas:[{
							id:"groupId_name",
							name:"分组",
							placeholder:"",
							value:res['groupId_name'],
							required:true,
							disabled:true
						},{
							id:"menuNumber",
							name:"菜单编码",
							placeholder:"请输入菜单编码",
						    value:res['menuNumber'],
							required:true,
							disabled:false
						},{
							id:"name",
							name:"菜单名称",
							placeholder:"请输入菜单名称",
						    value:res['name'],
							required:true,
							disabled:false
						},{
						    id:"icon",
						    name:"图标",
							placeholder:"请输入图标",
							value:res['icon'],
							required:false,
							disabled:false
						},{
						    id:"url",
						    name:"关联链接",
							placeholder:"关联链接",
							value:res['url'],
							required:false,
							disabled:false
						},{
							id:"menuOrder",
							name:"显示顺序",
							placeholder:"请输入显示顺序",
						    value:res['menuOrder'],
							required:false,
							disabled:false
						}]
					};
			    	break;
			    default:break;
			}
			if(this.viewJS.currentEnv !== "productEnv"){
				data['datas'].push({
					id:"issystem",
					name:"系统预置",
					placeholder:"系统预置",
				    value:res['issystem'],
					required:false,
					disabled:false
				});
			}
			return data;
		},
		editTable:function(id,obj){
			var _self = this;
			$.ajax({
				type:'POST',
				url:obj['url'],
				dataType:'json',
				data:obj['reqData'],
				async:false,
				error:function(err){console.log(err)},
				success:function(res){
					var data = _self.editDialogPanel(id,res),content;
					content = $('<div></div>').append($(dialogTmpl).tmpl(data['datas']));
					content.attr("allData",JSON.stringify(res));
					var obj = _self.getMappingFileId(id);
					var index = layer.open({
						skin:"layer-format-edit jfsEditor-d",
						type:1,
						title:data.title,
						content:content[0].outerHTML,
						area:['380px','300px'],
						btn:['确定','取消'],
						success:function(layero, index){
						    layero.find('input#icon').val(data['icon']);
						},
						yes:function(index,layero){
							if(_self.viewJS.validateDialog($('.layer-format-edit'))){
								var allData={},dataobject,event,data;
								allData = JSON.parse(layero.find('.layui-layer-content div[allData]').attr('allData'));
								layero.find('.layui-layer-content input').each(function(i,v){
									if($(v).attr('type') === "checkbox"){
										$(v).is(':checked')?allData[$(v).attr('id')] = "1":allData[$(v).attr('id')] = "0";
									}else{
										allData[$(v).attr('id')] = $(v).val();
									}
								});
								dataobject = {data:JSON.stringify(allData)};
								_self.saveAction(id,dataobject);
								layer.close(index);
							}
						}
					});
				}
			});
		},
		saveAction(id,dataStr){
		    var _self = this;
			var obj = _self.getEditReqData(id);
			$.ajax({
				type:'POST',
				url:obj['saveUrl'],
				dataType:'json',
				data:dataStr,
				async:false,
				error:function(err){console.log(err)},
				success:function(res){
					//$('#'+id).find('tr[fid="'+obj['keyId']+'"]')
					var obj = _self.getMappingFileId(id);
				    var oldSwitch = $('#app-moudle .switch').find('span').not('.hide')[0].className; 
				    _self.renderTable(id,obj['reqData'],$('.publishMenuDialog').find('.main-content'),true);
				    if((id==="app-moudle") && 'all' === oldSwitch){
				    	$('#app-moudle .switch').trigger('click');
				    }
					console.log(res);
				}
		    });
		},
		exportAction:function(id,data){
			 var _self = this;
			 $('#'+id).removeAttr("exportFlag");
			 $.ajax({
					type:'POST',
					url:'/jfsEditor/exportData.jhtml',
					dataType:'json',
					async:false,
					data:data,
					error:function(err){
						console.log(err);
						$('#'+id).find('tr[fid="'+data['extype']+'"]').find('td[name="status"]').removeClass('success').addClass('failed');
						$('#'+id).attr("exportFlag",true);
					},
					success:function(res){
						$('#'+id).attr("exportFlag",true);
				        if(0 === res.success){
				        	$('#'+id).find('tr[fid="'+data['extype']+'"]').find('td[name="status"]').removeClass('failed').addClass('success').text("成功");
				        	console.log("导出成功");
				        }else{
				        	$('#'+id).find('tr[fid="'+data['extype']+'"]').find('td[name="status"]').removeClass('success').addClass('failed').text(res.errMsg);
				        	//_self.infoDialog(res.errMsg);
				        }
					}
			});
		 }
	}
});