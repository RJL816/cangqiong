(function(KDApi, $){
	var CSS_XUANZHONG = 'kdfont-fuxuankuangxuanzhong_fang';
	var CSS_WEIXUANZHONG = 'kdfont-fuxuankuangweixuanzhong_fang';
	var CSS_BUFENXUANZHONG = 'kdfont-fuxuankuang5';
	var CSS_OTHER = "theme-fc";
	// TODO这里要调试下
	var DIS_LOGIC_OR;
	var DIS_LOGIC_AND;
	var LOGIC_OR_EN = ' or ';
	var LOGIC_AND_EN = ' and ';
	var LEFT_BRACKET = ' ( ';
	var RIGHT_BRACKET = ' ) ';
	var valueControlList = ['valueParamSelectDiv', 'valueBooleanSelectDiv', 'valueTextDiv', 'valueNumberDiv', 'valueEnumSelectDiv', 'valueDateDiv'];
	var valueTypeMap = {"param" : "1", "value" : "2", "target" : "3"}
	var valueTypeList;
	var valueTypeListNoTarget;
	var valueTypeListOnlyValue;
	
    function Condition (model) {
        this._setModel(model);
		DIS_LOGIC_OR = " " + KDApi.getLangMsg(model, 'or') + " ";
		DIS_LOGIC_AND = " " + KDApi.getLangMsg(model, 'and') + " ";
		valueTypeList = [{"id":"1","text":KDApi.getLangMsg(model, 'param')},{"id":"2","text":KDApi.getLangMsg(model, 'value')},{"id":"3","text":KDApi.getLangMsg(model, 'target')}];
		valueTypeListNoTarget = [{"id":"1","text":KDApi.getLangMsg(model, 'param')},{"id":"2","text":KDApi.getLangMsg(model, 'value')}];
		valueTypeListOnlyValue = [{"id":"2","text":KDApi.getLangMsg(model, 'value')}];
		localStorage.setItem('loading', KDApi.getLangMsg(model, 'loading'));
		localStorage.setItem('loadMore', KDApi.getLangMsg(model, 'loadMore'));
		localStorage.setItem('noResults', KDApi.getLangMsg(model, 'noResults'));
		localStorage.setItem('noResultsForTerm', KDApi.getLangMsg(model, 'noResultsForTerm'));		
    }

    Condition.prototype = {
        _setModel: function(model) {
            this.model = model;
			this.model._conditionExpressList = new Array();
			model.pageDom = $("#" + model.pageId);
        },
        init: function(props){
            initFunc(this.model, props)
        },
        update: function(props){
			var model = this.model;
			if(model && model.dom && model.dom.innerHTML && ConditionCodeMirror){
				updateFunc(model, props.data);
			}else{
				var interval = setInterval(function(){			
					if(model && model.dom && model.dom.innerHTML && ConditionCodeMirror){
						clearInterval(interval);
						updateFunc(model, props.data);		
					}
				}, 100);
			}			
        },
        destoryed: function(){
			var selectivityJSDom = document.getElementById('selectivityJS')
			if (selectivityJSDom) selectivityJSDom.remove()
			$('[data-page-id='+this.model.pageId+'_ruledate]').remove()
        },
		handleDirective:function(object, method, args){	
			var model = this.model;
			if(model && model.dom && model.dom.innerHTML && ConditionCodeMirror){
				updateFunc(model, args[0]);
			}else{
				var interval = setInterval(function(){			
					if(model && model.dom && model.dom.innerHTML && ConditionCodeMirror){
						clearInterval(interval);
						updateFunc(model, args[0]);		
					}
				}, 100);
			}
		}
    }
	
    // Other Code
    var initFunc = function(model, props) {
        // KDApi.loadFile可以通过路径加载js或css文件，并且在html文件头生成script或者link标签，第一个参数是路径，第二个参数是model，第三个参数是加载完成后执行的回调函数		
		KDApi.loadFile(['../rule/css/pingtai.css','../rule/css/jquery-ui.min.css','./css/condition.css','../rule/css/selectivity-jquery.css','./css/codemirror.css', '../rule/css/customStyle.css'], model, function(){
			KDApi.loadFile('../rule/js/jquery-ui.min.js', model, function(){
				KDApi.loadFile('../rule/js/selectivity-jquery.js', model, function(){
					KDApi.loadFile('./js/codemirror.js', model, function() {
						KDApi.loadFile('./js/customruleMode.js', model, function() {
							// 后端插件通过setData传给前端的数据，前端可以通过data去获取
							var text = props.data && props.data.text || ''
							// 通过路径去获取html字符串，第一个参数是路径，第二个参数是model，第三个参数是HTML模板中变量的值
							KDApi.getTemplateStringByFilePath('./html/condition.html', model, {
								text: text,
								condition:KDApi.getLangMsg(model, 'condition'),
								addcondition:KDApi.getLangMsg(model, 'addcondition'),
								conditionlogic:KDApi.getLangMsg(model, 'conditionlogic'),
								or:KDApi.getLangMsg(model, 'or'),
								and:KDApi.getLangMsg(model, 'and'),
								copyrow:KDApi.getLangMsg(model, 'copyrow'),
								deleterow:KDApi.getLangMsg(model, 'deleterow'),
								value:KDApi.getLangMsg(model, 'value')
							}).then(function(data) {
								model.dom.innerHTML = data
								//因为单选按钮的原因，不能写到html中
								createConditionTypeRadio(model);
								// 绑定DOM事件
								initEvent(model, props)
							})        
						}) 
					})
				})
			})
		})
    }

    var updateFunc = function(model, data) {
		if(!data){
			return;
		}
		
		model.initing = data.initing;
		model.onlyUpdateWeb = data.onlyUpdateWeb;
		try{
			if(model.initing == "true"){
				model._defaultRows = data.defaultRows
				model._showDeleteOnlyOneRow = data.showDeleteOnlyOneRow;
				model._hideButton = data.hideButton;
				model._comparisonOptMap = JSON.parse(JSON.stringify(data.comparisonOpt).replaceAll("name","text").replaceAll("value","id"));
				model._containTarget = data.containTarget;
				model._showParam = data.showParam == undefined ? true : data.showParam;
				model._showValueType = data.showValueType == undefined ? true : data.showValueType;				
				model.ruleEngine = data.ruleEngine;
				hideButton(model);
				
				if(!model._showValueType){
					model._valueTypeList = valueTypeListOnlyValue;
				}else if(model._containTarget){
					model._valueTypeList = valueTypeList;
				}else{
					model._valueTypeList = valueTypeListNoTarget;
				}
			}
			if(data.conditionExpress){
				// 必须要在CodeMirror加载完成后，才初始化
				createConditionExpress(model, data);
			}
			if(data.param){
				//console.log(data.param);
				//console.log(data.valueParam);
				model._param = data.param//formatParam(data.param, 0);
				model._defaultParam = data.defaultParam;
				model._valueParam = data.valueParam//formatValueParam(data.valueParam);
				
				clearCondition(model);//放到后面，初始化时需要用到param		
			}
			if(data.paramValue){
				updateTextValue(model, data.paramValue);
			}
			if(data.date && model.dateIndex != -1){
				updateDateValue(model, data.date);			
				model.dateIndex = -1;
			}				
			if(data.value){//这个要放最后，防止控件还没初始化完成
				// 更新值时，由于是从控件触发的，不用再触发控件值更新
				model.initing = "true";
				initControl(model, JSON.parse(data.value));
				model.initing = "false";
			}
			if(data.clear){
				clearCondition(model);
			}
			if(data.clearAll){
				model._param = [];
				model._valueParam = [];
				clearCondition(model);
			}
			if(data.showDate){
				showDate(model);
			}
			if(data.pageState){
				model.pageState = data.pageState;
				changePageState(model, data.pageState);
			}
		}catch(err){
			// 框架代码有问题，报错会无限循环调用，必须catch住
			console.log(err);
		}
		
		model.initing = "false";
		model.onlyUpdateWeb = "false";
    }
	
	var formatParam = function(nodes, n){		
		if(n > 10){
			return nodes;
		}
		$.each(nodes, function(i, node){		
			if(node.children){
				node.children = JSON.parse(node.children);
			}else{
				formatParam(node, ++n)
			}
		});
		return nodes;
	}
	
	var formatValueParam = function(nodes){
		$.each(nodes, function(i, node){
			if(node.children){
				node.children = JSON.parse(node.children);
			}
		});
		return nodes;
	}
	
	var changePageState = function(model, pageState){
		let radios = $('.ConditionTypeRadio ', model.dom)
		// undefined当edit状态处理
		if (!pageState) pageState = 'edit'
		if(pageState.toLocaleLowerCase() == "view"){//查看态
		    // 修改查看条单选按钮样式
			for (let i = 0; i < radios.length; i++) {
				let temp = $(radios[i])
				if (temp.hasClass('kd-hover-color')) temp.removeClass('kd-hover-color')
				// if (temp.hasClass('theme-fc')) temp.removeClass('theme-fc')
				temp.addClass('disabled-fc')
			}
			// 取消拖动
			$( ".ruleCondition", model.dom).sortable("disable");
			// 取消枚举事件（事件必须放前面，否则影响样式）
			$('.ruleCondition .valueEnumSelectDiv', model.dom).off('click');
			// 条件编辑禁用，并且修改样式
			$(".ruleCondition .conditionParam", model.dom).selectivity('setOptions', { readOnly: true })
			if($(".ruleCondition .comparisonOpt", model.dom).find(".selectivity-single-select").length > 0){
				$(".ruleCondition .comparisonOpt", model.dom).selectivity('setOptions', { readOnly: true })
			}
			$(".ruleCondition .valueType", model.dom).selectivity('setOptions', { readOnly: true })			
			$(".valueTd select:visible", model.dom).attr("disabled", true).css("color","#808080")
			$(".valueTd input:visible", model.dom).attr("disabled", true).css("color","#808080")
			$(".valueParam:visible", model.dom).selectivity('setOptions', { readOnly: true })
			$(".valueBoolean:visible", model.dom).selectivity('setOptions', { readOnly: true })
			$(".ruleCondition .copyTd", model.dom).hide();
			$(".ruleCondition .deleteTd", model.dom).hide();
			$(".addCondition", model.dom).hide();
			// 隐藏F7图标
			$(".conditionValueSearch", model.dom).hide();
			// 隐藏日期图标
			$(".selectivity-caret", model.dom).hide();
			$(".kdfont-riqixuanze", model.dom).hide();
			// 隐藏下拉图标，并修改相关样式
			$(".Select_iconBox_1WJ3", model.dom).hide();
			$(".selectivity-single-selected-item", model.dom).css("color","#808080");
			$(".selectivity-single-result-container", model.dom).css("cursor","default");
			// 条件逻辑编辑禁用，并且隐藏按钮，取消事件
			setOption(model, "readOnly", true);
			$("input[type='radio']", model.dom).attr("disabled", true)
			$(".expressDiv button").hide();			
			// 隐藏下划线高亮
			$(".ruleCondition tr td div.kd-hover-color", model.dom).removeClass("kd-field-border-all");
		}else{//编辑态
					// 修改编辑态的样式
			for (let i = 0; i < radios.length; i++) {
				let temp = $(radios[i])
				if (!temp.hasClass('kd-hover-color')) temp.addClass('kd-hover-color')
				// if (temp.hasClass('theme-fc')) temp.removeClass('theme-fc')
				temp.removeClass('disabled-fc')
			}
			// 绑定拖动
			$( ".ruleCondition", model.dom).sortable("enable");
			// 绑定枚举事件（事件必须放前面，否则影响样式）
			$('.ruleCondition .valueEnumSelectDiv', model.dom).off('click').on('click', function(e){	
				valueEnumEvent(model, $(this));
			});
			// 条件编辑启用，并且修改样式
			$(".ruleCondition .conditionParam", model.dom).selectivity('setOptions', { readOnly: false })
			if($(".ruleCondition .comparisonOpt", model.dom).find(".selectivity-single-select").length > 0){
				$(".ruleCondition .comparisonOpt", model.dom).selectivity('setOptions', { readOnly: false })
			}
			$(".ruleCondition .valueType", model.dom).selectivity('setOptions', { readOnly: false })
			$(".valueTd select:visible", model.dom).attr("disabled", false).css("color", "#000000")
			$(".valueTd input:visible", model.dom).attr("disabled", false).css("color", "#000000")
			$(".valueParam:visible", model.dom).selectivity('setOptions', { readOnly: false })
			$(".valueBoolean:visible", model.dom).selectivity('setOptions', { readOnly: false })
			$(".ruleCondition .copyTd", model.dom).show();
			changeDeleteButton(model);
			hideButton(model);
			// 显示F7图标
			$(".ruleCondition tr", model.dom).each(function(){
				showValueSearch(model, $(this));
			});
			// 显示日期图标
			$(".selectivity-caret", model.dom).show();
			$(".kdfont-riqixuanze", model.dom).show();
			// 显示下拉图标，并修改相关样式
			$(".Select_iconBox_1WJ3", model.dom).show();
			$(".selectivity-single-selected-item", model.dom).css("color","#000000");
			$(".selectivity-single-result-container", model.dom).css("cursor","pointer");
			// 条件逻辑编辑启用，并且显示按钮，绑定事件
			$("input[type='radio']", model.dom).attr("disabled", false)
			$(".expressDiv button").show();
			setOption(model, "readOnly", false);			
			// 显示下划线高亮
			$(".ruleCondition tr td div.kd-hover-color", model.dom).addClass("kd-field-border-all");
		}
	}
	
	var hideButton = function(model){
		//隐藏按钮
		if(model._hideButton){
			$(".addCondition", model.dom).hide();
		}else{
			$(".addCondition", model.dom).show();
		}
	}
	
	var clearCondition = function(model){	
		$('.ruleCondition tr', model.dom).remove();
		model._conditionExpressList=new Array();		
		
		if(model._defaultRows){
			addConditionRows(model, model._defaultRows);
		}
	}
	
	var getAllOption4Select = function(model, selectName){
		var ret = new Array();
		$("#templeteTrCondition ."+selectName+" option", model.dom).each(function(){
			ret.push($(this).val());
		});
		return ret;
	}
	
	var createConditionTypeRadio = function(model){
		var html = "<div class='conditionTypeDiv'><label class='labelSign'><span  class='ConditionTypeRadio kdfont kdfont-danxuankuang-weixuan kd-hover-color'><input class='inputRadio' tabindex='-1' type='radio'  name='conditionType"+model.pageId+"' value='0'></span>"+KDApi.getLangMsg(model, 'allconditionand')+"</label></div>"
			+ "<div class='conditionTypeDiv'><label class='labelSign'><span class='ConditionTypeRadio kdfont kdfont-danxuankuang-weixuan  kd-hover-color'><input class='inputRadio' tabindex='-1' type='radio'  name='conditionType"+model.pageId+"' value='1'></span>"+KDApi.getLangMsg(model, 'allconditionor')+"</label></div>"
			+ "<div class='conditionTypeDiv'><label class='labelSign'><span class='ConditionTypeRadio kdfont kdfont-danxuankuang-weixuan  kd-hover-color'><input class='inputRadio' tabindex='-1' type='radio'  name='conditionType"+model.pageId+"' value='2'></span>"+KDApi.getLangMsg(model, 'customlogic')+"</label></div>";
		$(".conditionTypeRadioDiv", model.dom).append(html);	
	}
	
	var initControl = function(model, data){
		//插入条件
		insertCondition(model, data.conditionList);		
		
		// BT-01077179,去除其他单选的选中状态
		$("input[name='conditionType" + model.pageId + "']", model.dom).parent().removeClass('kdfont-liebiaodanxuankuangxuanzhong').removeClass('theme-fc');
		// 选中值
		let selectDom = $("input[name='conditionType" + model.pageId + "'][value='" + data.conditionExpressType + "']", model.dom)		
		selectDom.attr('checked','true');
		selectDom.parent().removeClass('kdfont-danxuankuang-weixuan')
		selectDom.parent().addClass('kdfont-liebiaodanxuankuangxuanzhong')
		selectDom.parent().addClass('theme-fc')
		if(data.conditionExpressType == "2"){
			$(".expressDiv", model.dom).show();
		}
		//初始化逻辑表达式
		model._conditionExpressList = data.conditionExpressList || new Array();
		updateConditionExpressListName(model);
	}
	
	var disableInputValue = function(model, $tr){
		if($tr.find(".valueParam .selectivity-single-select", model.dom).length > 0){
			$tr.find(".valueParam").selectivity('value', '').selectivity("setOptions", {"readOnly":true});
		}
		if($tr.find(".valueType .selectivity-single-select", model.dom).length > 0){
			$tr.find(".valueType").selectivity('value', '').selectivity("setOptions", {"readOnly":true});
		}
		$tr.find(".valueEnumText").val('').attr("disabled",true);
		if($tr.find(".valueBoolean .selectivity-single-select", model.dom).length > 0){
			$tr.find(".valueBoolean").selectivity('value', '').selectivity("setOptions", {"readOnly":true});
		}
		$tr.find(".valueNumber").val('').attr("disabled",true);
		$tr.find(".valueText").val('').attr("disabled",true);
		$tr.find(".valueDate").val('').attr("disabled",true);
		$tr.find(".value").val('');
		$tr.find(".displayValue").val('');
		
		
		$(".valueTypeTd .FieldItem_value-wrap_3cGJ", $tr).removeClass("kd-field-border-all").removeClass("kd-hover-color");
		$(".valueTd .FieldItem_value-wrap_3cGJ", $tr).removeClass("kd-field-border-all").removeClass("kd-hover-color");
		$(".valueTypeTd .Select_iconBox_1WJ3", $tr).hide();
		$(".valueTd ._1BExD8h0", $tr).hide();
		$(".valueTd .Select_iconBox_1WJ3", $tr).hide();
		$(".valueTd .BaseData_base-data-iconArea_h_gc", $tr).hide();
		$(".valueTypeTd .selectivity-single-select", $tr).css("cursor","default");
		$(".valueTd .kdfont-riqixuanze", $tr).hide();
		 
		$tr.find(".valueDateDiv").off('click');
		$tr.find(".valueEnumSelectDiv").off('click');
	}
	
	var enableInputValue = function(model, $tr){
		if($tr.find(".valueParam .selectivity-single-select", model.dom).length > 0){
			$tr.find(".valueParam").selectivity("setOptions", {"readOnly":false});
		}
		if($tr.find(".valueType .selectivity-single-select", model.dom).length > 0){
			$tr.find(".valueType").selectivity("setOptions", {"readOnly":false});
			//$tr.find(".valueType").selectivity("value", valueTypeMap.value);
		}
		$tr.find(".valueEnumText").attr("disabled",false);
		if($tr.find(".valueBoolean .selectivity-single-select", model.dom).length > 0){
			$tr.find(".valueBoolean").selectivity("setOptions", {"readOnly":false});
		}
		$tr.find(".valueNumber").attr("disabled",false);
		$tr.find(".valueText").attr("disabled",false);
		
		$(".valueTypeTd .FieldItem_value-wrap_3cGJ", $tr).addClass("kd-field-border-all").addClass("kd-hover-color");
		$(".valueTd .FieldItem_value-wrap_3cGJ", $tr).addClass("kd-field-border-all").addClass("kd-hover-color");
		$(".valueTypeTd .Select_iconBox_1WJ3", $tr).show();
		$(".valueTd ._1BExD8h0", $tr).show();
		$(".valueTd .Select_iconBox_1WJ3", $tr).show();	
		$(".valueTd .BaseData_base-data-iconArea_h_gc", $tr).show();
		$(".valueTypeTd .selectivity-single-select", $tr).css("cursor","pointer");
		$(".valueTd .kdfont-riqixuanze", $tr).show();
		
		showValueSearch(model, $tr);
		
		$(".valueDateDiv", $tr).off('click').on('click', function(){
			if(model.pageState && model.pageState.toLocaleLowerCase() == "view"){
				return;
			}
			
			model.dateIndex = $(this).parents("tr").index();
			model.invokeCustomMethod("setDateFormat", {dateFormat : getDateFormat(model, $tr)});
		});
		
		$(".valueEnumSelectDiv", $tr).off('click').on('click', function(){
			if(model.pageState && model.pageState.toLocaleLowerCase() == "view"){
				return;
			}
			
			valueEnumEvent(model, $(this));
		})
	}
	
	var showDate = function(model){	
		// 等待修改日期格式
		setTimeout(function(){
			// $("#ruledate", $("#" + model.pageId)).find("input").click();
			dateRelocation(model, true, 200);
		}, 100);
	}
	
	var getConditionDisplayParamValue = function(model, $tr){
		return $tr.find(".conditionParam").selectivity('data') && ($tr.find(".conditionParam").selectivity('data').name || $tr.find(".conditionParam").selectivity('data').text);
	}
	
	var getConditionParamValue = function(model, $tr){
		return $tr.find(".conditionParam").selectivity('value');
	}
	
	var getConditionParamEntityNumber = function(model, $tr){
		return $tr.find(".conditionParam").selectivity('data') && $tr.find(".conditionParam").selectivity('data').entityNumber;
	}
	
	var getConditionParamType = function(model, $tr){
		return $tr.find(".conditionParam").selectivity('data') && $tr.find(".conditionParam").selectivity('data').type;
	}
	
	var getConditionParamTypeDetail = function(model, $tr){
		return $tr.find(".conditionParam").selectivity('data') && $tr.find(".conditionParam").selectivity('data').typeDetail;
	}
	
	var getConditionValueDataType = function(model, $tr){
		return $tr.find(".value").data("valueDataType") || getConditionParamTypeDetail(model, $tr);
	}
	
	var getDynamicObjectTypeDetail = function(model, $tr){
		return $tr.find(".conditionParam").selectivity('data') && ($tr.find(".conditionParam").selectivity('data').typeDetail + "_" + $tr.find(".conditionParam").selectivity('data').entityNumber);
	}
	
	var getDateFormat = function(model, $tr){
		return $tr.find(".conditionParam").selectivity('data') && $tr.find(".conditionParam").selectivity('data').dateFormat;
	}
	
	var getValueDateFormat = function(model, $tr){
		return $tr.find(".valueParam").selectivity('data') && $tr.find(".valueParam").selectivity('data').dateFormat;
	}
	
	var getConditionEnumList = function(model, $tr){
		return $tr.find(".conditionParam").selectivity('data') && $tr.find(".conditionParam").selectivity('data').enumList;
	}
	
	var isTarget4ParamType = function(model, $tr){
		return $tr.find(".conditionParam").selectivity('data') && $tr.find(".conditionParam").selectivity('data').target === "true";
	}
	
	var isEnum4ParamType = function(model, $tr){
		return $tr.find(".conditionParam").selectivity('data') && $tr.find(".conditionParam").selectivity('data').enumList ? true : false;
	}
	
	var isAdminOrg4ParamType = function(model, $tr){
		return $tr.find(".conditionParam").selectivity('data') && $tr.find(".conditionParam").selectivity('data').category === "adminOrg";
	}
	
	var getConditionParamIsMulti = function(model, $tr){
		return $tr.find(".conditionParam").selectivity('data') && $tr.find(".conditionParam").selectivity('data').multiple === "1";
	}
	
	var isMulti = function(model, $tr){
		var opt = getComparisonOptValue(model, $tr);
		return (opt == "~==" || opt == "~!=" || opt == "in" || opt == "not_in" || opt == "is_or_isSub") || getConditionParamIsMulti(model, $tr);
	}
	
	var getComparisonOptName = function(model, $tr){
		return $tr.find(".comparisonOpt").selectivity('data') && $tr.find(".conditionParam").selectivity('data').text
	}
	
	var getComparisonOptValue = function(model, $tr){
		return $tr.find(".comparisonOpt").selectivity('value');
	}
	
	var getValueTypeName = function(model, $tr){
		return $tr.find(".valueType").selectivity('data') && $tr.find(".valueType").selectivity('data').text
	}
	
	var getValueTypeValue = function(model, $tr){
		return $tr.find(".valueType").selectivity('value') || valueTypeMap.value;
	}
	
	
	/**
	 * 1.先获取参数类型
	 *   object:多选/单选切换时，清空值,is_null等操作时，解绑事件，否则绑定事件
	 *   date：is_null等操作时，解绑事件，否则绑定事件
	 *   string：is_null等操作时，解绑事件，否则绑定事件
	 *   number：is_null等操作时，解绑事件，否则绑定事件
	 *   boolean：不影响(只有等于/不等于)
	 *   enum:不影响(只有等于/不等于)
	 */
	var comparisonOptChangeEvent = function(model, $tr, value){
		// 天（/^[+-]*\dd$/）、周（/^[+-]*\dw$/）、月（/^[+-]*\dm$/）、季度（/^[+-]*\dq$/）、年（/^[+-]*\dy$/）
		// 过去/未来3个月（/^[+-]*\d+~[+-]*\dm$/）、小于等于今天（<=0d）、大于等于今天（>=0d）
		// 天、周、月、季、年
		if("is_not_null" == value || "is_null" == value || /^.+d$/.test(value) || /^.+w$/.test(value)
			 || /^.+m$/.test(value) || /^.+q$/.test(value) || /^.+y$/.test(value)){
			disableInputValue(model, $tr);
		}else{
			var mysel = $tr.find(".comparisonOpt");
			var oldvalue = mysel.data("last");//这次改变之前的值
			var newvalue = mysel.selectivity('value');
			mysel.data("last", newvalue); //每次改变都附加上去，以便下次变化时获取
			
			enableInputValue(model, $tr);
			
			if(getConditionParamType(model, $tr) == "dynamicObject" || isEnum4ParamType(model, $tr)){
				if(oldvalue == "is_or_isSub"){
					if($tr.find(".valueType .selectivity-single-select", model.dom).length > 0){
						$tr.find(".valueType").selectivity("setOptions", {"readOnly":false});
					}
					if($tr.find(".value").val()){
						$tr.find(".value").val($tr.find(".value").data("objectId"))
					}
				}
				if(newvalue == "is_or_isSub"){// 包含下级只能选值
					if($tr.find(".valueType .selectivity-single-select", model.dom).length > 0){
						if(getValueTypeValue(model, $tr) != valueTypeMap.value){
							$tr.find(".valueType").selectivity('value', valueTypeMap.value)
						}
						$tr.find(".valueType").selectivity("setOptions", {"readOnly":true});
					}
					
					if($tr.find(".value").val()){
						$tr.find(".value").val($tr.find(".value").data("objectNumber"))
					}
				}
				//多选切换成单选时，清空value值
				if((oldvalue == "in" || oldvalue == "not_in" || oldvalue == "is_or_isSub") && (newvalue == "==" || newvalue == "!=")){
					clearValue(model, $tr);
				}				
			}			
		}	
	}
	
	var showValueSearch = function(model, $tr){
		//显示搜索框（参数类型为object，值类型为值；值类型为指标）
		var paramType = getConditionParamType(model, $tr);
		
		//var valueType = $tr.find(".valueType option:selected").val();
		var valueType = getValueTypeValue(model, $tr);
		if((paramType == 'dynamicObject' && valueType == valueTypeMap.value) || valueType == valueTypeMap.target){
			$tr.find(".conditionValueSearch").show();
			$(".conditionValueSearch", $tr).off('click').on('click', function(){
				var $tr = $(this).parents("tr");
				var index = $tr.index();//从1开始
				//var valueType = $tr.find(".valueType").val();
				var valueType = getValueTypeValue(model, $tr);
				if(valueType == valueTypeMap.value){//值			
					// 传已选择的值	
					var entityNumber;
					if(model.ruleEngine == "true"){
						entityNumber = getConditionParamValue(model, $tr);
					}else{
						entityNumber = getConditionParamEntityNumber(model, $tr) || getConditionParamValue(model, $tr);
					}
					var value = $tr.find(".value").val();
					if("adminOrg" == getConditionParamTypeDetail(model, $tr)){
						value = ($tr.find(".value").data("objectId") && $tr.find(".value").data("objectId").toString()) || "";
					}
					model.invokeCustomMethod("openParamF7", {entityNumber : entityNumber, index : index, isMulti : isMulti(model, $tr), value : value});
				}else if(valueType == valueTypeMap.target){//指标
					// 结果只能打开运算指标，条件都可以打开
					model.invokeCustomMethod("openTargetF7", {targetType:"all", paramType : getConditionParamType(model, $tr), index : index, value : $tr.find(".value").val()});	
				}
			});
			
			$tr.find(".valueText").attr("disabled", true);
		}else{
			$tr.find(".conditionValueSearch").hide();
			$tr.find(".conditionValueSearch").off('click');
			
			$tr.find(".valueText").attr("disabled", false);
		}
	}
	
	/*
	 * 新增、删除、复制、移动条件时，更新标识
	 */
	var updateConditionName = function(model){
		$(".ruleCondition .name", model.dom).each(function(i){
			var number = i + 1;
			var name = number < 10 ? "T0" + number : "T" + number;
			$(this).html(name);
			if(model._conditionExpressList[i]){
				model._conditionExpressList[i].name = name;
			}else{
				model._conditionExpressList[i] = {name:name}
			}
		});
		updateConditionExpress(model);
	}
	
	/*
	 * 新增或者复制时，获取条件标识
	 */
	var getNextConditionName = function(model){
		var max = 0;
		$(".ruleCondition .name", model.dom).each(function(i){	
			var temp = parseInt($(this).html().replace("T", ""));
			if(temp > max){
				max = temp;
			}
		});
		max = max + 1;
		return max < 10 ? "T0" + max : "T" + max;	
	}
	
	var updateConditionExpressListName = function(model){
		$(".ruleCondition .name", model.dom).each(function(i){			
			var name = $(this).html();
			if(model._conditionExpressList[i]){
				model._conditionExpressList[i].name = name;
			}else{
				model._conditionExpressList[i] = {name:name}
			}
		});
		updateConditionExpress(model);
	}
	
	var valueEnumEvent = function(model, $element){
		var $tr = $element.parents("tr");
		var isOld = $tr.index() == $(".multiDropDownControl", model.dom).attr("index");
		$element.attr("index", $tr.index());	
		
		if(!isOld || $(".multiDropDownControl", model.dom).is(":hidden")){// 点击其他枚举控件时或者未显示下拉，展示下拉		
			if(getComparisonOptValue(model, $tr) == ""){//如果未选择比较符，隐藏下拉
				$(".multiDropDownControl", model.dom).hide();
				$element.find(".xialajiantou").removeClass("xiangshangjiantou");
				//e.stopPropagation();
				return;
			}
			
			createValueEnumControl(model, $tr, $element.css("width"));
			$(".multiDropDownControl", model.dom).show();
			var top = $element.offset().top + 28;
			if(document.body.scrollHeight < top + $(".multiDropDownControl .j-right", model.dom).height()){
				top = top - $(".multiDropDownControl .j-right", model.dom).height() - 28 - 11;
			}
			var left = $element.offset().left;
			$element.find(".xialajiantou").addClass("xiangshangjiantou");
			$(".multiDropDownControl", model.dom).css("top", top).css("left", left).attr("index", $tr.index());
		}else{
			$element.find(".xialajiantou").removeClass("xiangshangjiantou");
			$(".multiDropDownControl", model.dom).hide();				
		}
	}
	
	var dateRelocation = function(model, triggerClick, waitTime){
		var $element = $('.valueDateDiv', model.dom).eq(model.dateIndex);
		var top = $element.offset().top + 28;
		var left = $element.offset().left;			
		var num = 0;
		let dateDom =$('[data-page-id='+model.pageId+'_ruledate]')
		// let parentDomRect = model.dom.parentElement.parentElement.getBoundingClientRect()
		// let parentDomRect = dateDom[0].parentElement.getBoundingClientRect()
		let elemRect = $element[0].getBoundingClientRect()
		// let dateLeft = elemRect.left - parentDomRect.left
		// let dateTop = elemRect.top - parentDomRect.top
		dateDom.css({position: 'absolute',left: elemRect.left, top: elemRect.top})
		var interval = setInterval(function(){
			num++;
			if(num > 10){
				closeDate(model);
				clearInterval(interval);
				return;
			}
			
			if($(".j-left").length > 0){
				var $date = $(".j-left").attr("id", getRuleDateId(model));
				// 防止平台重定位导致控件闪烁
				// $date.hide();
				
				var interval2 = setInterval(function(){
					num++;
					// 子元素个数等于一，平台已经重定位完，再重定位
					if($(".j-left").children("div").length == 1 || num > 10){
						// $date.parent().css("top", top)
						// $date.parent().css("left", left)
						// $date.show();
						clearInterval(interval2);
					}
				}, waitTime || 10);
				clearInterval(interval);
			}else if(triggerClick){
				dateDom.find('input').click()

				// $("#ruledate", $("#" + model.pageId)).find("input").click()
			}
		}, 10);
	}
	
	var getRuleDateId = function(model){
		return model.pageId + model.key + "date";
	}
	
	var closeDate = function(model){
		setTimeout(function(){
			// $("#ruledate", model.pageDom).find("input").blur(); 
			$('[data-page-id='+model.pageId+'_ruledate]').find('input').blur()
		}, 100);
	}
	
	var initDateEvent = function(model){
		$(model.dom).on('keydown', '.ruleCondition .valueDate', function(e){
			return false;
		});		
		
		$("#kd-theme").on("click", '#' + getRuleDateId(model) + " .calendar-header-hover a", function(){
			if(model.dateIndex >= 0){
				dateRelocation(model, false, 200);
			}
		})
		
		$("#kd-theme").on("click", '#' + getRuleDateId(model) + " .kdfont-qianfanshuangjiantou", function(){
			if(model.dateIndex >= 0){
				dateRelocation(model, false, 200);
			}
		})
		
		$("#kd-theme").on("click", '#' + getRuleDateId(model) + " .kdfont-shangyiyue", function(){
			if(model.dateIndex >= 0){
				dateRelocation(model, false, 200);
			}
		})
		
		$("#kd-theme").on("click", '#' + getRuleDateId(model) + " .kdfont-xiayiyue", function(){
			if(model.dateIndex >= 0){
				dateRelocation(model, false, 200);
			}
		})
		
		$("#kd-theme").on("click", '#' + getRuleDateId(model) + " .kdfont-houfanshuangjiantou", function(){
			if(model.dateIndex >= 0){
				dateRelocation(model, false, 200);
			}
		})
		
		// 年/月
		$("#kd-theme").on("click", '#' + getRuleDateId(model) + " td div", function(){
			if(model.dateIndex >= 0 && $(this).closest("table").children("thead").length == 0){
				dateRelocation(model, false);
			}
		})
		
		// 日
		$("#kd-theme").on("click", '#' + getRuleDateId(model) + " td div[data-value]", function(){
			closeDate(model);
		})
	}
	
	//事件绑定
    var initEvent = function(model, props){
		initDateEvent(model);
		let dateDom = $("#ruledate", $("#" + model.pageId))
		if (dateDom[0]){
			dateDom.css({position: 'absolute', height: '30px', width: '230px'})
			dateDom.find('.kd-cq-field-title-wrap').css({display: 'none'})
			// model.pageDom.append(dateDom[0])
			document.body.append(dateDom[0])
		}
		$(".ruleCondition", model.dom).sortable({  
			cursor: "move",  
			items: "tr",                       //只是tr可以拖动  
			opacity: 1.0,                      //拖动时，透明度为0.6  
			revert: false,                      //释放时，增加动画  
			update: function(event, ui) {      //更新排序之后  
				var categoryids = $(this).sortable("toArray");  
				var $this = $(this);  
				//更新expressList
				updateConditionName(model);
			}  
		});  
		$(".ruleCondition", model.dom).disableSelection();
		
		$(document).on("click", function(e){
            //点击id为menu之外的元素，则触发        
            if($(e.target).closest("#multiDropDownControl").length == 0 && $(e.target).closest(".valueEnumSelectDiv").length == 0){
                $(".multiDropDownControl", model.dom).hide();
				$(e.target).closest(".valueEnumSelectDiv").find(".xialajiantou").removeClass("xiangshangjiantou");
            }
        })
		
		$(model.dom).on('click', '.multiDropDownControl li.Select_item_1M8z', function(){
			var index = $(".multiDropDownControl", model.dom).attr("index");
			var $tr = $(".ruleCondition tr:eq(" + index + ")", model.dom);
			var displayValue = $(this).find(".Select_text_3aTn").html();
			
			if(!isMulti(model, $tr)){
				var value = $(this).find(".Select_text_3aTn").attr('value');
				$tr.find(".valueEnumText").val(displayValue);
				setValue(model, $tr, displayValue, value);
				$(".multiDropDownControl", model.dom).hide();
				$tr.find(".valueEnumSelectDiv").find(".xialajiantou").removeClass("xiangshangjiantou");
			}else{
				var value = $(this).find("input[type='checkbox']").val();
				if($(this).find(".Select_item-checkbox_P1pH").hasClass(CSS_WEIXUANZHONG)){//选中
					//枚举值修改
					var newDisplayValue = $tr.find(".valueEnumText").val() ? $tr.find(".valueEnumText").val() + "," + displayValue : displayValue;
					var newValue = $tr.find(".value").val() ? $tr.find(".value").val() + "," + value : value;
					$tr.find(".valueEnumText").val(newDisplayValue);
					setValue(model, $tr, newDisplayValue, newValue);
					//复选框选中
					$(this).find(".Select_item-checkbox_P1pH").removeClass(CSS_WEIXUANZHONG).addClass(CSS_OTHER).addClass(CSS_XUANZHONG);
					//已选值加1
					var $selectedNumber = $(".multiDropDownControl .Select_select-totalSelected_3wgi>span", model.dom);
					var selectedNumber = parseInt($selectedNumber.html()) + 1;
					$selectedNumber.html(selectedNumber);
					//如果是第一次选择，修改样式
					if($(".Select_all-checkbox_DrTC", model.dom).hasClass(CSS_WEIXUANZHONG)){
						$(".Select_all-checkbox_DrTC", model.dom).removeClass(CSS_WEIXUANZHONG).addClass(CSS_OTHER).addClass(CSS_BUFENXUANZHONG);
					}
					//如果是最后一个选中的，修改全选样式
					if(selectedNumber == $(this).parent().children().length){
						$(".Select_all-checkbox_DrTC", model.dom).removeClass(CSS_BUFENXUANZHONG).addClass(CSS_XUANZHONG);
					}
				}else{//取消选中
					//枚举值修改
					var newDisplayValue = $tr.find(".valueEnumText").val() == displayValue ? "" : replaceValue($tr.find(".valueEnumText").val(), displayValue);
					var newValue = $tr.find(".value").val() == value ? "" : replaceValue($tr.find(".value").val(), value);
					$tr.find(".valueEnumText").val(newDisplayValue);
					setValue(model, $tr, newDisplayValue, newValue);
					//复选框反选
					$(this).find(".Select_item-checkbox_P1pH").removeClass(CSS_XUANZHONG).removeClass(CSS_OTHER).addClass(CSS_WEIXUANZHONG);
					//已选值减1
					var $selectedNumber = $(".multiDropDownControl .Select_select-totalSelected_3wgi>span", model.dom);
					var selectedNumber = parseInt($selectedNumber.html()) - 1;
					$selectedNumber.html(selectedNumber);
					//如果是全选时第一次反选，修改样式
					if($(".Select_all-checkbox_DrTC", model.dom).hasClass(CSS_XUANZHONG)){
						$(".Select_all-checkbox_DrTC", model.dom).removeClass(CSS_XUANZHONG).addClass(CSS_BUFENXUANZHONG);
					}
					//如果是最后一个反选的，修改全选样式
					if(selectedNumber == 0){
						$(".Select_all-checkbox_DrTC", model.dom).removeClass(CSS_BUFENXUANZHONG).removeClass(CSS_OTHER).addClass(CSS_WEIXUANZHONG);
					}
				}
			}			
		})
		
		//下拉全选事件
		$(model.dom).on('click', '.multiDropDownControl .Select_select-all_1f0Q', function(){
			var index = $(".multiDropDownControl", model.dom).attr("index");
			var $tr = $(".ruleCondition tr:eq(" + index + ")", model.dom);			
			
			if($(this).children(".Select_all-checkbox_DrTC").hasClass(CSS_WEIXUANZHONG)){//未选中->全选中
				var displayValue = "";
				var value = ""
				$(".multiDropDownControl li.Select_item_1M8z", model.dom).each(function(){
					displayValue += $(this).find(".Select_text_3aTn").html() + ",";
					value += $(this).find(".Select_select_checkbox_16Sj").val() + ",";
				})
				displayValue = displayValue.substring(0, displayValue.length - 1);
				value = value.substring(0, value.length - 1);
			
				$tr.find(".valueEnumText").val(displayValue);
				setValue(model, $tr, displayValue, value);
			
				$(this).children(".Select_all-checkbox_DrTC").removeClass(CSS_WEIXUANZHONG).addClass(CSS_OTHER).addClass(CSS_XUANZHONG);
				$('.multiDropDownControl .Select_item-checkbox_P1pH', model.dom).removeClass(CSS_WEIXUANZHONG).addClass(CSS_OTHER).addClass(CSS_XUANZHONG);					 
				$(this).parent().find(".Select_select-totalSelected_3wgi>span").html($(".multiDropDownControl li", model.dom).length);
				//修改值
			}else{//全选中/部分选中->未选中
				$tr.find(".valueEnumText").val("");
				setValue(model, $tr, "", "");
					
				$(this).children(".Select_all-checkbox_DrTC").removeClass(CSS_BUFENXUANZHONG).removeClass(CSS_XUANZHONG).removeClass(CSS_OTHER).addClass(CSS_WEIXUANZHONG);
				$('.multiDropDownControl .Select_item-checkbox_P1pH', model.dom).removeClass(CSS_BUFENXUANZHONG).removeClass(CSS_XUANZHONG).removeClass(CSS_OTHER).addClass(CSS_WEIXUANZHONG);				
				$(this).parent().find(".Select_select-totalSelected_3wgi>span").html(0);				
			}
		})
		
		$(model.dom).on('blur', '.ruleCondition .valueNumber', function(){
			var value = $(this).val();
			value.replace(/^0*/, "").replace(/^0*\./, "0.");
			$(this).val(value)
			setValue(model, $(this), value, value);
		})
		
		$(model.dom).on('blur', '.ruleCondition .valueText', function(){
			setValue(model, $(this), $(this).val(), $(this).val());
		})
		
		//点击复制
		$(model.dom).on('click', '.ruleCondition .copy', function(){
			model.copy = true;
			var $tr = $(this).parents("tr");
			var $tr2 = $('#templeteTrCondition', model.dom).clone().removeAttr('id').show();
			if(!model._showValueType){
				$tr2.find('.valueTypeTd').hide();
			}
			$tr.after($tr2);
			
			// 参数
			createParamControl(model, $tr2);
			$tr2.find(".conditionParam").selectivity('value', $tr.find(".conditionParam").selectivity('value'));
			if(!model._showParam){
				$tr2.find('.conditionParamTd').hide();
			}
			
			// 值类型
			var paramType = getConditionParamType(model, $tr);
			var valueType = $tr.find(".valueType").selectivity('value');
			createValueTypeControl(model, $tr2, true, paramType);
			$tr2.find(".valueType").selectivity('value', valueType);			
			
			// 值
			var displayValue = $tr.find(".displayValue").val();
			var value = $tr.find(".value").val();
			if(valueType == valueTypeMap.param){//参数
				showParamSelectDiv(model, $tr2);
				$tr2.find(".valueParam").selectivity('value', value);
			}else if(valueType == valueTypeMap.value){//值					
				showControlAndSetValue(model, $tr2, {displayValue:displayValue, value:value});
			}else if(valueType == valueTypeMap.target){//指标
				showTextDiv(model, $tr2);
				$tr2.find(".valueText").val(displayValue);
			}			
			$tr2.find(".displayValue").val(displayValue)
			$tr2.find(".value").val(value)
			
			// 比较符,必须放最后，enableInputValue里面涉及到了ValueType、ValueParam等元素
			createComparisonOptControl(model, $tr2);
			$tr2.find(".comparisonOpt").selectivity('value', $tr.find(".comparisonOpt").selectivity('value'));

			updateConditionName(model);
			// 按钮

			changeDeleteButton(model);
			
			model.copy = false;
        })
		
		//点击删除
		$(model.dom).on('click', '.ruleCondition .delete', function(){
			$tr = $(this).parents("tr");
			var index = $tr.index();//从1开始,先获取index，再remove
			
			$tr.closest("tr").remove();
			
			model._conditionExpressList.splice(index, 1);
			
			updateConditionName(model);
			changeDeleteButton(model);
        })
		
		$('.addCondition', model.dom).click(function(){
            addConditionRows(model, 1);
        })
		
		$('.expressView', model.dom).click(function(){
			model.invokeCustomMethod("openExpressView");
        });
		
		$('.and', model.dom).click(function(){
			insertEditorValue(model, DIS_LOGIC_AND);
        })
		
		$('.or', model.dom).click(function(){
            insertEditorValue(model, DIS_LOGIC_OR);
        })
		
		$('.leftBracket', model.dom).click(function(){
            insertEditorValue(model, LEFT_BRACKET);
        })
		
		$('.rightBracket', model.dom).click(function(){
            insertEditorValue(model, RIGHT_BRACKET);
        })
		
		$(model.dom).on('click', '.ConditionTypeRadio', function(e) {
			// model.pageState 为undefined的时候认为是编辑态
			if (model.pageState && model.pageState.toLocaleLowerCase() == "view") return
			// if (model?.pageState?.toLocaleLowerCase() == "view") return
			let selectDom = $('.kdfont-liebiaodanxuankuangxuanzhong', model.dom)
			selectDom.removeClass('kdfont-liebiaodanxuankuangxuanzhong')
			selectDom.removeClass('theme-fc')
			selectDom.addClass('kdfont-danxuankuang-weixuan')
			let changeDom = $(e.currentTarget).find('input')
			var conditionType = changeDom.val();
			changeDom.parent().removeClass('kdfont-danxuankuang-weixuan')
			changeDom.parent().addClass('kdfont-liebiaodanxuankuangxuanzhong')
			changeDom.parent().addClass('theme-fc')
			var _conditionExpressList = model._conditionExpressList;
			if(conditionType == 0 || conditionType == 1){
				$(".expressDiv", model.dom).hide();
				var length = _conditionExpressList.length;
				if(length > 0){
					_conditionExpressList[length-1].logical = '';
					_conditionExpressList[length-1].leftBracket = '';			
					_conditionExpressList[length-1].rightBracket = '';
					if(conditionType == 0){
						for(var i=0;i<length-1;i++){//最后一个表达式不需要逻辑连接符
							_conditionExpressList[i].logical = LOGIC_AND_EN;
							_conditionExpressList[i].leftBracket = '';			
							_conditionExpressList[i].rightBracket = '';
						}
					}else{
						for(var i=0;i<length-1;i++){//最后一个表达式不需要逻辑连接符
							_conditionExpressList[i].logical = LOGIC_OR_EN;
							_conditionExpressList[i].leftBracket = '';			
							_conditionExpressList[i].rightBracket = '';
						}
					}
				}				
			}else{
				$(".expressDiv", model.dom).show();
			}
			
			updateConditionExpress(model);
		})
    }
	
	var replaceValue = function(oldValue, flag){
		var temp = oldValue.split(",");
		temp = temp.filter(function(str){
			return str != flag;
		});
		return temp.toString();
	}
	
	var changeDeleteButton = function(model){
		if(model._showDeleteOnlyOneRow || $(".ruleCondition tr", model.dom).length > 1){
			$(".deleteTd", model.dom).show();
		}else{
			$(".deleteTd", model.dom).hide();
		}
	}
	
	var setValue = function(model, $element, displayValue, value){
		var $td = "";
		if($element.hasClass("valueTd")){
			$td = $element;
		}else if($element.closest(".valueTd").length > 0){
			$td = $element.closest(".valueTd");
		}else if($element.find(".valueTd").length > 0){
			$td = $element.find(".valueTd");
		}else{
			return;
		}
		
		$td.find(".displayValue").val(displayValue);
		$td.find(".value").val(value);
		$td.find("input:visible").attr("title", displayValue);
		conditionJsonChange(model);
	}
	
	var clearValue = function(model, $tr){	    
		if($tr.find(".valueParam .selectivity-single-select").length > 0){
			$tr.find(".valueParam").selectivity('value', '');
		}
		
		if($tr.find(".valueBoolean .selectivity-single-select").length > 0){
			$tr.find(".valueBoolean").selectivity('value', '');
		}
		$tr.find(".valueNumber").val('');
		$tr.find(".valueDate").val('');
		$tr.find(".valueEnumText").val('');
		
		$tr.find(".valueText").val('');
		$tr.find(".displayValue").val('');
		$tr.find(".value").val('');
	}
	
	var conditionJsonChange = function(model){
		if(model.initing !== "true" && model.onlyUpdateWeb !== "true"){
			var conditionJson = JSON.stringify(getConditionContrlJson(model));
			model.invokeCustomMethod("setValue", conditionJson);
		}
	}
	
	var insertCondition = function(model, conditionList){
		if(conditionList && conditionList.length > 0){
			$('.ruleCondition tr', model.dom).remove();
			for(var i=0;i<conditionList.length;i++){
				var $tr = $('#templeteTrCondition', model.dom).clone().removeAttr('id').show();
				if(!model._showValueType){
					$tr.find('.valueTypeTd').hide();
				}
				$('.ruleCondition', model.dom).append($tr);
				
				createValueTypeControl(model, $tr);
				createParamControl(model, $tr);
				if(!model._showParam){
					$tr.find('.conditionParamTd').hide();
				}
			}
			changeDeleteButton(model);
			
			$.each(conditionList, function(i, conditionObj){
				var index = conditionObj.index;
				$tr = $('.ruleCondition tr', model.dom).eq(index);
				$tr.find(".name").html(conditionObj.name);				
				
				if("is_or_isSub" == conditionObj.operators){
					//行政组织并且比较符是包含下级时，org.number修改为org.id,不然参数控件无法反写
					conditionObj.param = conditionObj.param.substring(0, conditionObj.param.lastIndexOf('.') + 1) + "id";
				}
				$tr.find(".value").data("objectId", conditionObj.objectId);
				$tr.find(".value").data("objectNumber", conditionObj.objectNumber);
				$tr.find(".value").data("valueDataType", conditionObj.valueDataType);
				$tr.find(".conditionParam").selectivity('value', conditionObj.param);
				
				var paramType = conditionObj.paramType || getConditionParamType(model, $tr);
				//初始化比较符控件并赋值
				createComparisonOptControl(model, $tr);
				$tr.find(".comparisonOpt").selectivity('value', conditionObj.operators);
				$tr.find(".comparisonOpt").data("last", conditionObj.operators);
				comparisonOptChangeEvent(model, $tr, conditionObj.operators);
				
				//更新值类型
				$tr.find(".valueType").selectivity('value', conditionObj.valueType);
				if(conditionObj.valueType == valueTypeMap.param){//参数
					//显示下拉
					showParamSelectDiv(model, $tr);
					$tr.find(".valueParam").selectivity('value', conditionObj.value);
				}else if(conditionObj.valueType == valueTypeMap.value){//值					
					showControlAndSetValue(model, $tr, conditionObj);
				}else if(conditionObj.valueType == valueTypeMap.target){//指标
					showTextDiv(model, $tr);
					$tr.find(".valueText").val(conditionObj.displayValue);
				}
				
				$tr.find(".displayValue").val(conditionObj.displayValue)
				$tr.find(".value").val(conditionObj.value)
			});
		}
	}
	
	var addConditionRows = function(model, rows){
		for (var i = 0; i < rows; i++) {
			//var tn = getNextConditionName(model);	
		
			var $tr = $('#templeteTrCondition', model.dom).clone().removeAttr('id').show();			
			if(!model._showValueType){
				$tr.find('.valueTypeTd').hide();
			}
			$('.ruleCondition', model.dom).append($tr);			
			
			createValueTypeControl(model, $tr);
			createParamControl(model, $tr);
			if(!model._showParam){
				$tr.find('.conditionParamTd').hide();
			}
			//model._conditionExpressList.push({name:tn});
			
			//updateConditionExpress(model);
			updateConditionName(model);
		}
		changeDeleteButton(model);
	}
	
	var showControl = function(model, $tr, controlKey){
		$.each(valueControlList, function(i, valueControlKey){
			if(valueControlKey == controlKey){
				$tr.find('.' + valueControlKey).show();
			}else{
				$tr.find('.' + valueControlKey).hide();
			}
		});	
	}
	
	var showControlAndSetValue = function(model, $tr, data){
		var paramType = getConditionParamType(model, $tr);
		if(paramType == "boolean"){
			showBooleanSelectDiv(model, $tr);
			if(data){
				$tr.find(".valueBoolean").selectivity('value', data.value);
			}			
		}else if(isEnum4ParamType(model, $tr)){
			showEnumSelectDiv(model, $tr);
			if(data){
				$tr.find(".valueEnumText").val(data.displayValue);		
			}			
		}else if(paramType == "date"){
			showDateDiv(model, $tr);
			if(data){
				$tr.find(".valueDate").val(data.value);
			}	
		}else if(paramType == "number"){
			showNumberDiv(model, $tr);
			if(data){
				$tr.find(".valueNumber").val(data.value);
			}	
		}else{
			showTextDiv(model, $tr);
			if(data){
				$tr.find(".valueText").val(data.displayValue);
			}
		}
	}
	
	var showParamSelectDiv = function(model, $tr){
		showControl(model, $tr, 'valueParamSelectDiv');
		if(model.copy || $tr.find(".valueParamSelectDiv .selectivity-single-select").length == 0){
			createValueParamControl(model, $tr);
		}
	}
	
	var showNumberDiv = function(model, $tr){
		showControl(model, $tr, 'valueNumberDiv');
	}
	
	var showTextDiv = function(model, $tr){
		showControl(model, $tr, 'valueTextDiv');
		showValueSearch(model, $tr);
	}
	
	var showBooleanSelectDiv = function(model, $tr){
		showControl(model, $tr, 'valueBooleanSelectDiv');
		if(model.copy || $tr.find(".valueBooleanSelectDiv .selectivity-single-select").length == 0){
			createValueBooleanControl(model, $tr);
		}
	}
	
	var showEnumSelectDiv = function(model, $tr){
		showControl(model, $tr, 'valueEnumSelectDiv');
	}
	
	var showDateDiv = function(model, $tr){
		showControl(model, $tr, 'valueDateDiv');
	}
	
	var contains = function(model, express, n){
		if($(".ruleCondition .name", model.dom).eq(n) && express.indexOf($(".ruleCondition .name", model.dom).eq(n).html()) != -1){
			return true;
		}
		return false;
	}
	
	//只更新conditionExpressList
	var updateConditionExpressList = function(model){
		var conditionExpress = getEditorValue(model);
		var _conditionExpressList = model._conditionExpressList;
		var expressTemp = new Array();
		var index_or = conditionExpress.indexOf(DIS_LOGIC_OR);
		var index_and = conditionExpress.indexOf(DIS_LOGIC_AND);	
		var n=0;
		for(var i=0;index_or >= 0 || index_and >= 0;i++){
			if(index_or == 0){
				conditionExpress = conditionExpress.substring(DIS_LOGIC_OR.length);
			}else if(index_and == 0){
				conditionExpress = conditionExpress.substring(DIS_LOGIC_AND.length);
			}else if(0 < index_or && (index_or < index_and || index_and == -1)){//|在前
				var express = conditionExpress.substring(0, index_or);
				if(contains(model, express, n)){
					n++;
					expressTemp.push(express);					
					_conditionExpressList[i].logical = LOGIC_OR_EN;	
				}		
				conditionExpress = conditionExpress.substring(index_or + DIS_LOGIC_OR.length);
			}else if(0 < index_and && (index_and < index_or || index_or == -1)){//&在前
				var express = conditionExpress.substring(0, index_and);
				if(contains(model, express, n)){
					n++;
					expressTemp.push(express);					
					_conditionExpressList[i].logical = LOGIC_AND_EN;	
				}							
				conditionExpress = conditionExpress.substring(index_and + DIS_LOGIC_AND.length);
			}
			index_or = conditionExpress.indexOf(DIS_LOGIC_OR);
			index_and = conditionExpress.indexOf(DIS_LOGIC_AND);
		}
		if(contains(model, conditionExpress, n)){
			expressTemp.push(conditionExpress);
		}		

		$.each(expressTemp, function(i, conditionExpress){			
			_conditionExpressList[i].name = $(".ruleCondition .name", model.dom).eq(i).html();
			var bracket = conditionExpress.split(_conditionExpressList[i].name);
			_conditionExpressList[i].leftBracket = bracket[0] || '';			
			_conditionExpressList[i].rightBracket = bracket[1] || '';	
		});
	}
	
	//更新conditionExpressList和conditionExpressStr
	var updateConditionExpress = function(model){
		var conditionExpressStr = '';
		$.each(model._conditionExpressList,function(i, conditionExpress){
			if(conditionExpress.name){
				conditionExpressStr += conditionExpress.leftBracket || '';
				conditionExpressStr += conditionExpress.name || '';
				conditionExpressStr += conditionExpress.rightBracket || '';
				if(i != model._conditionExpressList.length - 1){
					var logical = conditionExpress.logical;
					if(!logical){
						var conditionType = $("input[name='conditionType" + model.pageId + "']:checked", model.dom).val();
						if(conditionType == 1){
							conditionExpress.logical = LOGIC_OR_EN;
						}else{
							conditionExpress.logical = LOGIC_AND_EN;
						}
					}
					conditionExpressStr += conditionExpress.logical;
				}				
			}
		})
		
		setEditorValue(model, conditionExpressStr.replaceAll(LOGIC_AND_EN,DIS_LOGIC_AND).replaceAll(LOGIC_OR_EN,DIS_LOGIC_OR), false);
	}
	
	//创建参数控件
	var createParamControl = function(model, $tr){
		var dom = $tr || model.dom;
		$('.conditionParam', dom).selectivity({
			allowClear: true,
			items: model._param
		});
		
		//参数改变时，初始化比较符（可以优化，比较参数类型是否改变）
		$('.conditionParam', dom).off('change').on('change', function(e){
			if(model.copy || model.initing == "true"){
				return;
			}
			if(e.target.className != "conditionParam"){
				return;
			}
			
			var $tr = $(this).parents("tr");
			clearValue(model, $tr);
			$tr.find(".value").data("valueDataType", "");
			var paramType = getConditionParamType(model, $tr);
			if(paramType == "dynamicObject"){
				$tr.find(".valueType").selectivity({
					items: valueTypeListNoTarget
				});
				if(getValueTypeValue(model, $tr) == "3"){
					$tr.find(".valueType").selectivity("value", "2");
				}
			}else{
				$tr.find(".valueType").selectivity({
					items: model._valueTypeList
				});				
			}
			if(getValueTypeValue(model, $tr) == "1"){
				createValueParamControl(model, $tr);			
			}else if(getValueTypeValue(model, $tr) == "2"){
				showControlAndSetValue(model, $tr);
			}
			
			createComparisonOptControl(model, $tr);	
			
			conditionJsonChange(model);
		});
		
		if(!model._showParam){
			$tr.find(".conditionParam").selectivity('value', model._defaultParam);
		}	
	}
	
	//创建比较符控件
	var createComparisonOptControl = function(model, $tr){
		var type = getConditionParamTypeDetail(model, $tr);
		if(!type){
			return;
		}
		var isTarget = isTarget4ParamType(model, $tr);
		
		var dom = $tr || model.dom;
		$('.comparisonOpt', dom).selectivity({
			allowClear: true,
			items: model._comparisonOptMap[type]
		});
		
		$('.comparisonOpt', dom).selectivity("value", "");
	
		$('.comparisonOpt', dom).off('change').on('change', function(e){
			if(model.initing == "true"){//copy时，需要触发比较符改变事件，为空或不为空时，禁用参数和结果
				return;
			}
			if(e.target.className != "comparisonOpt"){
				return;
			}
			
			comparisonOptChangeEvent(model, $(this).parents("tr"), $(this).selectivity('value'));
			conditionJsonChange(model);
		});
		
	}
	
	var createValueTypeControl = function(model, $tr, notDefault, paramType){
		var dom = $tr || model.dom;
		// 如果参数类型是基础资料，则不显示指标类型
		var items = (paramType == "dynamicObject") ? valueTypeListNoTarget : model._valueTypeList;
		$('.valueType', dom).selectivity({
			allowClear: true,
			items: items
		});
				
		//设置默认值
		if(!notDefault){
			$('.valueType', dom).selectivity('value', valueTypeMap.value);
		}
		
		//参数改变时，初始化比较符（可以优化，比较参数类型是否改变）
		$('.valueType', dom).off('change').on('change', function(e){
			if(model.copy || model.initing == "true"){
				return;
			}
			if(e.target.className != "valueType"){
				return;
			}
			
			var $tr = $(this).parents("tr");	
			clearValue(model, $tr);
			
			var valueType = $(this).selectivity('value');
			if(valueType == valueTypeMap.param){//参数
				showParamSelectDiv(model, $tr);
			}else if(valueType == valueTypeMap.value){//值
				showControlAndSetValue(model, $tr);
			}else if(valueType == valueTypeMap.target){//指标
				showTextDiv(model, $tr);
			}

			conditionJsonChange(model);		
		});
	}
	
	//创建值参数控件
	var createValueParamControl = function(model, $tr){
		var dom = $tr || model.dom;
		var type = getConditionParamTypeDetail(model, $tr);
		if(type == "dynamicObject" || type == "mul_dynamicObject" || type == "adminOrg" || type == "mul_adminOrg"){
			type = getDynamicObjectTypeDetail(model, $tr);
		}
		$('.valueParam', dom).selectivity({
			allowClear: true,
			items: model._valueParam[type] || null
		});
		
		//参数改变时，初始化比较符（可以优化，比较参数类型是否改变）
		$('.valueParam', dom).off('change').on('change', function(e){		
			if(model.copy || model.initing == "true"){
				return;
			}
			if(e.target.className != "valueParam"){
				return;
			}
			
			var displayValue = $(this).selectivity('data') && $(this).selectivity('data').text || $(this).selectivity('value');
			setValue(model, $(this), displayValue, $(this).selectivity('value'));			
			conditionJsonChange(model);
		});
	}	
	
	var valueBooleanEvent = function(model, $element){
		if(model.initing == "true" || model.copy){
			return;
		}
		
		var displayValue = $element.selectivity('data') && $element.selectivity('data').text || $element.selectivity('value');
		setValue(model, $element, displayValue, $element.selectivity('value'));
	}
	
	var createValueBooleanControl = function(model, $tr){
		var dom = $tr || model.dom;
		$('.valueBoolean', dom).selectivity({
			allowClear: true,
			items: [{"id":"true","text":KDApi.getLangMsg(model, 'yes')},{"id":"false","text":KDApi.getLangMsg(model, 'no')}]
		});	
		
		//参数改变时，初始化比较符（可以优化，比较参数类型是否改变）
		$('.valueBoolean', dom).off('change').on('change', function(e){
			if(e.target.className != "valueBoolean"){
				return;
			}
			valueBooleanEvent(model, $(this));
		});
		//设置默认值
		$('.valueBoolean', dom).selectivity('value', "true");
	}
	
	var createValueEnumControl = function(model, $tr, width){
		$(".multiDropDownControl", model.dom).html('');
		var enumList = JSON.parse(getConditionEnumList(model, $tr));		
		var displayValue = $tr.find(".valueEnumText").val() || "";
		//var value = $tr.find(".value").val() || "";
						
		var html = '<div class="Select_panel_ih2B commonAnimation_panel-drop-down-animation_Pq1y j-right" style="min-width: 210.656px; max-width: 600px; width:' + width + ';">';
		if(!isMulti(model, $tr)){//单选		
			html+='<ul class="Select_list_2q7q">';
			$.each(enumList,function(i, obj){
				html+='<li class="kd-hover primary-text-in-light Select_item_1M8z">'
						+'<span title="' + obj.name[model.lang] + '" value="' + obj.value + '" class="Select_text_3aTn">' + obj.name[model.lang] + '</span>'			
					 +'</li>';
			});						  
			html+='</ul>';
		}else{//多选
			html+='<ul class="Select_list_2q7q">';
			var selectedNumber = 0;
			$.each(enumList,function(i, obj){
				html += '<li class="kd-hover primary-text-in-light Select_item_1M8z">';
				if($.inArray(obj.name[model.lang], displayValue.split(",")) >= 0){
					html += '<span class="kdfont Select_item-checkbox_P1pH theme-fc kdfont-fuxuankuangxuanzhong_fang">'
								+'<input type="checkbox" class="Select_select_checkbox_16Sj" readonly="" value="' + obj.value + '" checked="">'
						   +'</span>';						   
					selectedNumber++;
				}else{					
					html += '<span class="kdfont Select_item-checkbox_P1pH kdfont-fuxuankuangweixuanzhong_fang">'
								+'<input type="checkbox" class="Select_select_checkbox_16Sj" readonly="" value="' + obj.value + '" checked="">'
						   +'</span>';
				}		
				html += '<span title="' + obj.name[model.lang] + '" class="Select_text_3aTn">' + obj.name[model.lang] + '</span>'
			    +'</li>';
			});	
			html+='</ul>';
			
			html+='<div class="Select_select-panel-buttom_3pyT">'
					+'<div class="Select_select-all_1f0Q">';
						if(selectedNumber == 0){
							html+='<span class="kdfont Select_all-checkbox_DrTC kdfont-fuxuankuangweixuanzhong_fang">'
						}else if(selectedNumber == enumList.length){
							html+='<span class="kdfont Select_all-checkbox_DrTC theme-fc kdfont-fuxuankuangxuanzhong_fang">'
						}else{
							html+='<span class="kdfont Select_all-checkbox_DrTC theme-fc kdfont-fuxuankuang5">'
						}
						
							html+='<input type="checkbox" class="Select_select_checkbox_16Sj" readonly="" value="all" checked="">'
						+'</span>'
						+'<span class="Select_select-all-selected_22q_">'+KDApi.getLangMsg(model, 'allselect')+'</span>'
					+'</div>'
					+'<span class="Select_select-hasSelected_3dsH">'+KDApi.getLangMsg(model, 'selected')+'</span>'
					+'<span class="Select_select-selectedCount_n-4v">'
						+'<a class="Select_select-totalSelected_3wgi theme-fc"><span>'+selectedNumber+'</span></a>'
						+'<span>'+KDApi.getLangMsg(model, 'term')+'</span>'
					+'</span>'
				+'</div>';
		}
		html += '</div>';
		
		$(".multiDropDownControl", model.dom).append(html);
	}
	
	//更新值
	var updateTextValue = function(model, data){
		var index = data.index;
		var $tr = $(".templeteTrCondition", model.dom).eq(index);
		$tr.find(".valueText").val(data.nameList || data.idList)
		$tr.find(".displayValue").val(data.nameList || data.idList);
		$tr.find(".value").val(data.idList);	
		if(data.valueIdIsString != undefined){
			$tr.find(".value").data("valueDataType", data.valueIdIsString ? "string" : "number");		
		}		
		if(isAdminOrg4ParamType(model, $tr)){
			$tr.find(".value").data("objectNumber", data.numberList);
			$tr.find(".value").data("objectId", data.idList);
		}
		
		conditionJsonChange(model);
	}
	
	var updateDateValue = function(model, date){
		var index = model.dateIndex;
		$(".valueDate", model.dom).eq(index).val(date);
		$(".displayValue", model.dom).eq(index).val(date);
		$(".value", model.dom).eq(index).val(date);
		conditionJsonChange(model);
	}
	
	//获取条件的List
	var getConditionList = function(model){
		var conditionList = new Array();
		$(".ruleCondition tr", model.dom).each(function(i){
			var conditionObj = {};
			conditionObj.index = i;
			conditionObj.name = $(this).find(".name").html();		
			conditionObj.displayParam = getConditionDisplayParamValue(model, $(this));
			conditionObj.param = getConditionParamValue(model, $(this));			
			conditionObj.paramType = getConditionParamType(model, $(this));		
			conditionObj.target = isTarget4ParamType(model, $(this));			
			conditionObj.operators = getComparisonOptValue(model, $(this));
			// 不显示值类型时，值类型写死为值
			if(!model._showValueType){
				conditionObj.valueType = valueTypeMap.value;
			}else{
				conditionObj.valueType = getValueTypeValue(model, $(this));
			}			
			var selectValue = $(this).find('.valueTd select:visible').val();
			conditionObj.displayValue = $(this).find(".displayValue").val() || $(this).find('.valueTd select:visible option[value="' + selectValue + '"]').html();			
			conditionObj.value = $(this).find(".value").val() || selectValue;
			conditionObj.valueDataType = getConditionValueDataType(model, $(this));
			conditionObj.objectId = $(this).find(".value").data("objectId") && $(this).find(".value").data("objectId").toString() || "";
			conditionObj.objectNumber = $(this).find(".value").data("objectNumber") && $(this).find(".value").data("objectNumber").toString() || "";
			conditionObj.dateFormat = getDateFormat(model, $(this));
			if(conditionObj.paramType == "date" && conditionObj.valueType == "1"){
				conditionObj.valueDateFormat = getValueDateFormat(model, $(this));
			}
			
			if(isAdminOrg4ParamType(model, $(this)) && "is_or_isSub" == conditionObj.operators){
				//行政组织并且比较符是包含下级时，org.id修改为org.number
				conditionObj.param = conditionObj.param.substring(0, conditionObj.param.lastIndexOf('.') + 1) + "number";
				conditionObj.value = conditionObj.objectNumber;
			}
			conditionList.push(conditionObj);
		});		
		return conditionList;
	}
	
	//条件控件的返回值
	var getConditionContrlJson = function(model){
		var data = {};
		data.conditionList = getConditionList(model);
		data.conditionExpressType = $(".conditionTypeRadioDiv .kdfont-liebiaodanxuankuangxuanzhong input", model.dom).val();
		data.conditionExpressList = model._conditionExpressList;		
		data.conditionExpressStr = getEditorValue(model).replaceAll(DIS_LOGIC_AND, LOGIC_AND_EN).replaceAll(DIS_LOGIC_OR, LOGIC_OR_EN);
		return data;
	}
	
	var createConditionExpress = function (model, data) {
		if (!(data.value && JSON.parse(data.value).conditionExpressType))  {
			let initDom = $('.ConditionTypeRadio', model.dom)[0]
			$(initDom).addClass('kdfont-liebiaodanxuankuangxuanzhong')
			$(initDom).addClass('theme-fc')
		}
		if(data.value && JSON.parse(data.value).conditionExpressType == "2"){
			$(".expressDiv", model.dom).show();
		}
		
		var conditionExpressValue = data.conditionExpress.value;
		conditionExpressValue = conditionExpressValue.replaceAll(LOGIC_AND_EN, DIS_LOGIC_AND).replaceAll(LOGIC_OR_EN, DIS_LOGIC_OR);
		
		model.swcEditor = ConditionCodeMirror.fromTextArea($('.conditionExpress', model.dom)[0], {
            value: conditionExpressValue || '',
            lineNumbers: false, // 是否显示行号
            extraKeys: { 'Alt-/': 'autocomplete' }, // 定义自动补全的快捷键
            mode: 'customrule', // 自定义的mode名称
            readOnly:true,
			lineWrapping: 'wrap'
		})
		
		setEditorValue(model, conditionExpressValue, true)	
		
		model.swcEditor.on("blur",function(){
			updateConditionExpressList(model);
			conditionJsonChange(model);
		});
    }
   
    var insertEditorValue = function (model, value) {	
		var pos = model.swcEditor.getCursor();
		if(!pos.sticky && pos.ch == 0 && pos.line == 0){
			model.swcEditor.setCursor(model.swcEditor.lineCount(), 0);
		}
		model.swcEditor.replaceSelection(value);
		model.swcEditor.focus();
		updateConditionExpressList(model);
		conditionJsonChange(model);
    }
	
    var getEditorValue = function (model) {
		if(model.swcEditor){
			return model.swcEditor.getValue().replace(/\s+/g,' ');//去除多余空格
		}else{
			return "";
		}
    }
	
	var saveEditor = function(model, value, isInit){
		// 表达式没有值，或者非初始化和页面初始化更新时，覆盖表达式的值（延迟设值会导致更新值在初始化之前执行）
		if(!(isInit && getEditorValue(model))){
			model.swcEditor.setValue(value)
			model.swcEditor.save()
		}
		
		if(!isInit){
			conditionJsonChange(model);
		}
	}
	
    var setEditorValue = function(model, value, isInit) {
		if(model.swcEditor){
			if($('.conditionControl', model.dom).is(":visible")){
				saveEditor(model, value, isInit);
			}else{
				// 没有显示页面的时候，设值不生效
				var interval = setInterval(function(){
					if($('.conditionControl', model.dom).is(":visible")){
						saveEditor(model, value, isInit);
						clearInterval(interval);
					}
				}, 50);
			}
		}
    }
	
    // 动态修改公式平台配置
    var setOption = function(model, property, value){
		model.swcEditor.setOption(property, value)
    }
	
    KDApi.register('condition', Condition, {isMulLang: true})
})(window.KDApi, jQuery)
