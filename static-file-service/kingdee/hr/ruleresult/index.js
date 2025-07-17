(function (KDApi, $) {
	var CSS_XUANZHONG = 'kdfont-fuxuankuangxuanzhong_fang';
	var CSS_WEIXUANZHONG = 'kdfont-fuxuankuangweixuanzhong_fang';
	var CSS_BUFENXUANZHONG = 'kdfont-fuxuankuang5';
	var CSS_OTHER = "theme-fc";
	
	var valueControlList = ['resultValueParamSelectDiv', 'resultValueBooleanSelectDiv', 'resultValueTextDiv', 'resultValueNumberDiv', 'resultValueEnumSelectDiv', 'resultValueDateDiv'];
	var valueTypeMap = {"param" : "1", "value" : "2", "target" : "3"}

    function Result(model) {
        this._setModel(model)
    }

    Result.prototype = {
        _setModel: function (model) {
			// 隐藏控件滚动条，火狐浏览器兼容处理
			model.dom.style.overflow = "hidden";
			
            this.model = model
			model.pageDom = $("#" + model.pageId);
			localStorage.setItem('loading', KDApi.getLangMsg(model, 'loading'));
			localStorage.setItem('loadMore', KDApi.getLangMsg(model, 'loadMore'));
			localStorage.setItem('noResults', KDApi.getLangMsg(model, 'noResults'));
			localStorage.setItem('noResultsForTerm', KDApi.getLangMsg(model, 'noResultsForTerm'));
        },
        init: function (props) {			
            initFunc(this.model, props)			
        },
        update: function (props) {
            if(this.model.dom.innerHTML && props.data){				
				updateFunc(this.model, props.data)
			}
        },
        destoryed: function () {
			$('[data-page-id='+this.model.pageId+'_ruledate]').remove()
        },
		handleDirective:function(object, method, args){
			var model = this.model;
			if(model && model.dom && model.dom.innerHTML){
				updateFunc(model, args[0]);
			}else{
				var interval = setInterval(function(){			
					if(model && model.dom && model.dom.innerHTML){
						updateFunc(model, args[0]);
						clearInterval(interval);
					}
				}, 100);
			}
		}
    }

	
    var initFunc = function (model, props) {		
		KDApi.loadFile(['../rule/css/pingtai.css','../rule/css/selectivity-jquery.css','./css/ruleresult.css', '../rule/css/customStyle.css'], model, function () {
			// KDApi.loadFile可以通过路径加载js或css文件，并且在html文件头生成script或者link标签，第一个参数是路径，第二个参数是model，第三个参数是加载完成后执行的回调函数
			KDApi.loadFile('../rule/js/selectivity-jquery.js', model, function(){
				// 后端插件通过setData传给前端的数据，前端可以通过props.data去获取
				var text = props.data && props.data.text || ''
				// 通过路径去获取html字符串，第一个参数是路径，第二个参数是model，第三个参数是HTML模板中变量的值
				KDApi.getTemplateStringByFilePath('./html/ruleresult.html', model, {
					text: text,
					returnresult:KDApi.getLangMsg(model, 'returnresult'),
					addresult:KDApi.getLangMsg(model, 'addresult'),
					equal:KDApi.getLangMsg(model, 'equal'),	
					deleterow:KDApi.getLangMsg(model, 'deleterow')
				}).then(function (data) {
					model.dom.innerHTML = data
					// 绑定DOM事件
					initEvent(model, props)
				})
			})
		})
    }
	
	var updateFunc = function (model, data) {	
		try{			
			model.initing = data.initing;
			if(model._paramChange == undefined){
				model._paramChange = true;
			}			
			if(model.initing == "true"){
				model._defaultRows = data.defaultRows
				model._showDeleteOnlyOneRow = data.showDeleteOnlyOneRow;
				model._hideButton = data.hideButton;
				model._paramChange = data.paramChange;
				hideButton(model);
				showTop(model);
			}
			if (data.param) {				
				model._param = data.param;
				model._valueParam = data.valueParam;
				
				clearResult(model);
			}
			if (data.paramValue) {
				updateTextValue(model, data.paramValue);
			}
			if (data.date && model.dateIndex != -1){//这个要放最后，防止控件还没初始化完成
				updateDateValue(model, data.date);			
				model.dateIndex = -1;
			}
			if (data.value) {
				// 更新值时，由于是从控件触发的，不用再触发控件值更新
				model.initing = "true";
				initControl(model, JSON.parse(data.value));
				model.initing = "false";
			}
			if(data.clear){
				model.initing = "true";
				clearResult(model);
				model.initing = "false";
			}
			if(data.clearAll){
				model.initing = "true";
				model._param = [];
				model._valueParam = [];
				clearResult(model);
				model.initing = "false";
			}			
			if(data.showDate){
				showDate(model);
			}
			if(data.pageState){
				model.pageState = data.pageState;
				changePageState(model, data.pageState);
			}
			
			model.initing = "false";
		}catch(err){
			// 框架代码有问题，报错会无限循环调用，必须catch住
			//console.log(err);
		}
    }
	
	var clearResult = function(model){
		$('.ruleResult tr', model.dom).remove();
		if(model._defaultRows){
			addResultRows(model, model._defaultRows);
		}
	}
	
	var changePageState = function(model, pageState){
		if(pageState.toLocaleLowerCase() == "view"){//查看态
			$(".ruleResult .resultParam", model.dom).selectivity('setOptions', { readOnly: true })
			$(".ruleResult .resultValueType", model.dom).selectivity('setOptions', { readOnly: true })
			$(".ruleResult .resultValueTd select", model.dom).attr("disabled", true)
			$(".ruleResult .resultValueTd input", model.dom).attr("disabled", true)
			$(model.dom).off('click', '.ruleResult .resultValueDateDiv');
			if($(".ruleResult .resultValueParam:visible .selectivity-single-select", model.dom).length > 0){
				$(".ruleResult .resultValueParam:visible", model.dom).selectivity('setOptions', { readOnly: true })
			}
			if($(".ruleResult .resultValueBoolean:visible .selectivity-single-select", model.dom).length > 0){
				$(".ruleResult .resultValueBoolean:visible", model.dom).selectivity('setOptions', { readOnly: true })
			}
			$(".ruleResult .resultDeleteTd", model.dom).hide();			
			$(".ruleResult .resultValueSearch", model.dom).hide();
			
			$(".addResult", model.dom).hide();
			changeParamStyle(model.dom, false);			
			$(".kdfont-riqixuanze", model.dom).hide();
			
			//hover样式调整
			$(".ruleResult .FieldItem_value-wrap_3cGJ", model.dom).removeClass("kd-field-border-all").removeClass("kd-hover-color")
			//F7样式调整			
			$("._1vTTLSCX", model.dom).addClass("_2yUPiMGU").addClass("disabled-fc").attr("readonly", "")
			$("._3iC3Zk0Q", model.dom).addClass("_3tYRLrHQ");
			
			//下拉样式调整
			$(".Select_iconBox_1WJ3", model.dom).hide()			
			$(".ruleResult input", model.dom).css("color","#808080");
			$(".ruleResult .selectivity-single-select", model.dom).css("cursor","default");
			
			// 取消枚举事件
			$(model.dom).off('click', '.ruleResult .resultValueEnumSelectDiv');
		}else{//编辑态
			$(".ruleResult .resultParam", model.dom).selectivity('setOptions', { readOnly: !model._paramChange})
			$(".ruleResult .resultValueType", model.dom).selectivity('setOptions', { readOnly: false })
			$(".ruleResult .resultValueTd select", model.dom).attr("disabled", false)
			$(".ruleResult .resultValueTd input", model.dom).attr("disabled", false)
			$(model.dom).off('click', '.ruleResult .resultValueDateDiv').on('click', '.ruleResult .resultValueDateDiv', function () {
				dateClickEvent(model, $(this));
			});
			if($(".ruleResult .resultValueParam:visible .selectivity-single-select", model.dom).length > 0){
				$(".ruleResult .resultValueParam:visible", model.dom).selectivity('setOptions', { readOnly: !model._paramChange})
			}
			if($(".ruleResult .resultValueBoolean:visible .selectivity-single-select", model.dom).length > 0){
				$(".ruleResult .resultValueBoolean:visible", model.dom).selectivity('setOptions', { readOnly: !model._paramChange})
			}
			changeDeleteButton(model);
			hideButton(model);
			
			$(".ruleResult tr", model.dom).each(function(){
				showValueSearch(model, $(this));
			});
			
			changeParamStyle(model.dom, model._paramChange);
			$(".kdfont-riqixuanze", model.dom).show();
			
			//hover样式调整
			$(".ruleResult .FieldItem_value-wrap_3cGJ", model.dom).addClass("kd-field-border-all").addClass("kd-hover-color")
			//F7样式调整			
			$("._1vTTLSCX", model.dom).removeClass("_2yUPiMGU").removeClass("disabled-fc").removeAttr("readonly", "")
			$("._3iC3Zk0Q", model.dom).removeClass("_3tYRLrHQ");
			
			//下拉样式调整
			$(".Select_iconBox_1WJ3", model.dom).show()			
			$(".ruleResult input", model.dom).css("color","#000000");
			$(".ruleResult .selectivity-single-select", model.dom).css("cursor","pointer");
			
			// 绑定枚举事件
			$(model.dom).off('click', '.ruleResult .resultValueEnumSelectDiv').on('click', '.ruleResult .resultValueEnumSelectDiv', function(e){	
				valueEnumEvent(model, $(this))
			})
		}
	}
	
	var showTop = function(model){
		if(model.key != "defaultresultap"){
			$(".ruleTitle", model.dom).show();
		}
	}
	
	var hideButton = function(model){
		//隐藏按钮
		if(model._hideButton){
			$(".addResult", model.dom).hide();
		}else{
			$(".addResult", model.dom).show();
		}
	}
	
	var valueEnumEvent = function(model, $element){
		var $tr = $element.parents("tr");
		var isOld = $tr.index() == $(".multiDropDownControl", model.dom).attr("index");
		$element.attr("index", $tr.index());	
		
		if(!isOld || $(".multiDropDownControl", model.dom).is(":hidden")){// 点击其他枚举控件时或者未显示下拉，展示下拉				
			createValueEnumControl(model, $tr, $element.css("width"));
			$(".multiDropDownControl", model.dom).show();
			
			var top = $element.offset().top + 28;
			if(document.body.scrollHeight < top + $(".multiDropDownControl .j-right", model.dom).height()){
				//下面空间不够时，需要向上显示控件
				top = top - $(".multiDropDownControl .j-right", model.dom).height() - 28 - 11;
			}
			$element.find(".xialajiantou").addClass("xiangshangjiantou");
			$(".multiDropDownControl", model.dom).css("top", top).css("left", $element.offset().left).attr("index", $tr.index());
		}else{
			$element.find(".xialajiantou").removeClass("xiangshangjiantou");
			$(".multiDropDownControl", model.dom).hide();
		}
	}
	
	var initDateEvent = function(model){
		$(model.dom).off('click', '.ruleResult .resultValueDateDiv').on('click', '.ruleResult .resultValueDateDiv', function () {
			dateClickEvent(model, $(this));
		});	

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
		
		// 选年的时候重定向
		$("#kd-theme").on("click", '#' + getRuleDateId(model) + " .calendar-header-hover a", function(){
			if(model.dateIndex >= 0){
				dateRelocation(model, false, 200);
			}
		})
		
		// 年、月
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
    var initEvent = function (model, props) {
		initDateEvent(model);
		let dateDom = $("#ruledate", $("#" + model.pageId))
		if (dateDom[0]) {
			dateDom.css({position: 'absolute', height: '30px', width: '230px'})
			dateDom.find('.kd-cq-field-title-wrap').css({display: 'none'})
			document.body.appendChild(dateDom[0])
		}

		$(model.dom).on('keydown', '.ruleResult .resultValueDate', function(){
			return false;
		});
		
		$(model.dom).on('click', '.ruleResult .resultValueEnumSelectDiv', function(e){	
			valueEnumEvent(model, $(this))
		})
		
		$(document).on("click", function(e){
            //点击id为menu之外的元素，则触发        
            if($(e.target).closest("#multiDropDownControl").length == 0 && $(e.target).closest(".resultValueEnumSelectDiv").length == 0){
                $(".multiDropDownControl", model.dom).hide();
				$(e.target).closest(".resultValueEnumSelectDiv").find(".xialajiantou").removeClass("xiangshangjiantou");
            }
        })
		
		$(model.dom).on('click', '.multiDropDownControl li.Select_item_1M8z', function(){
			var index = $(".multiDropDownControl", model.dom).attr("index");
			var $tr = $(".ruleResult tr:eq(" + index + ")", model.dom);
			var displayValue = $(this).find(".Select_text_3aTn").html();
			
			if(!getResultParamIsMulti(model, $tr)){			
				var value = $(this).find(".Select_text_3aTn").attr('value');
				$tr.find(".resultValueEnum").val(displayValue);
				setValue(model, $tr, displayValue, value);
				$(".multiDropDownControl", model.dom).hide();
				$tr.find(".valueEnumSelectDiv").find(".xialajiantou").removeClass("xiangshangjiantou");
			}else{			
				var value = $(this).find("input[type='checkbox']").val();
				if($(this).find(".Select_item-checkbox_P1pH").hasClass(CSS_WEIXUANZHONG)){//选中
					//枚举值修改
					var newDisplayValue = $tr.find(".resultDisplayValue").val() ? $tr.find(".resultDisplayValue").val() + "," + displayValue : displayValue;
					var newValue = $tr.find(".resultValue").val() ? $tr.find(".resultValue").val() + "," + value : value;
					$tr.find(".resultValueEnum").val(newDisplayValue);
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
					var newDisplayValue = $tr.find(".resultDisplayValue").val() == displayValue ? "" : replaceValue($tr.find(".resultDisplayValue").val(), displayValue);
					var newValue = $tr.find(".resultValue").val() == value ? "" : replaceValue($tr.find(".resultValue").val(), value);
					$tr.find(".resultValueEnum").val(newDisplayValue);
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
			var $tr = $(".ruleResult tr:eq(" + index + ")", model.dom);			
			
			if($(this).children(".Select_all-checkbox_DrTC").hasClass(CSS_WEIXUANZHONG)){//未选中->全选中
				var displayValue = "";
				var value = ""
				$(".multiDropDownControl li.Select_item_1M8z", model.dom).each(function(){
					displayValue += $(this).find(".Select_text_3aTn").html() + ",";
					value += $(this).find(".Select_select_checkbox_16Sj").val() + ",";
				})
				displayValue = displayValue.substring(0, displayValue.length - 1);
				value = value.substring(0, value.length - 1);
			
				$tr.find(".resultValueEnum").val(displayValue);
				setValue(model, $tr, displayValue, value);
			
				$(this).children(".Select_all-checkbox_DrTC").removeClass(CSS_WEIXUANZHONG).addClass(CSS_OTHER).addClass(CSS_XUANZHONG);
				$('.multiDropDownControl .Select_item-checkbox_P1pH', model.dom).removeClass(CSS_WEIXUANZHONG).addClass(CSS_OTHER).addClass(CSS_XUANZHONG);					 
				$(this).parent().find(".Select_select-totalSelected_3wgi>span").html($(".multiDropDownControl li", model.dom).length);
				//修改值
			}else{//全选中/部分选中->未选中
				$tr.find(".resultValueEnum").val("");
				setValue(model, $tr, "", "");
					
				$(this).children(".Select_all-checkbox_DrTC").removeClass(CSS_BUFENXUANZHONG).removeClass(CSS_XUANZHONG).removeClass(CSS_OTHER).addClass(CSS_WEIXUANZHONG);
				$('.multiDropDownControl .Select_item-checkbox_P1pH', model.dom).removeClass(CSS_BUFENXUANZHONG).removeClass(CSS_XUANZHONG).removeClass(CSS_OTHER).addClass(CSS_WEIXUANZHONG);				
				$(this).parent().find(".Select_select-totalSelected_3wgi>span").html(0);				
			}
		})
		
		$(model.dom).on('blur', '.ruleResult .resultValueNumber', function(){
			var value = $(this).val();
			value.replace(/^0*/, "").replace(/^0*\./, "0.");
			$(this).val(value)
			setValue(model, $(this), value, value);
		})
		
		$(model.dom).on('blur', '.ruleResult .resultValueText', function(){
			setValue(model, $(this), $(this).val(), $(this).val());
		})

        $(model.dom).on('click', '.ruleResult .resultValueSearch', function () {			
			var $tr = $(this).parents("tr");
			var index = $tr.index();//从1开始
			var valueType = getResultValueTypeValue(model, $tr);
			if(valueType == valueTypeMap.value){//值
				var opt = $tr.find(".comparisonOpt").val();
				// 只有基础资料和动态对象存在打开F7的情况，基础资料根据配置打开，动态对象暂时都是单选
				model.invokeCustomMethod("openParamF7", {entityNumber : getResultParamValue(model, $tr), index : index, isMulti : getResultParamIsMulti(model, $tr), value : $tr.find(".resultValue").val() || "", filters : getParamFilter(model, $tr)});	
			}else if(valueType == valueTypeMap.target){//指标
				// 结果只能打开运算指标，条件都可以打开
				model.invokeCustomMethod("openTargetF7", {targetType:"function", paramType : getResultParamType(model, $tr), index : index, value : $tr.find(".resultValue").val()});	
			}	
        })
		
        $(model.dom).on('click', '.deleteResult', function () {
			$(this).parents("tr").remove();
			resultJsonChange(model);
			
			changeDeleteButton(model);
        })

        $('.addResult', model.dom).click(function () {
            addResultRows(model, 1);
        })
    }	
	
	var replaceValue = function(oldValue, flag){
		var temp = oldValue.split(",");
		temp = temp.filter(function(str){
			return str != flag;
		});
		return temp.toString();
	}
	
	var showDate = function(model){	
		// 等待修改日期格式
		setTimeout(function(){
			// $("#ruledate", $("#" + model.pageId)).find("input").click();
			dateRelocation(model, true, 200);
		}, 100);
	}
	
	var dateRelocation = function(model, triggerClick, waitTime){
		var $element = $('.resultValueDateDiv', model.dom).eq(model.dateIndex);
		var top = $element.offset().top;
		var left = $element.offset().left;
		var num = 0;
		let dateDom =$('[data-page-id='+model.pageId+'_ruledate]')
		// let parentDomRect = model.dom.parentElement.parentElement.getBoundingClientRect()
		// let parentDomRect = dateDom[0].parentElement.getBoundingClientRect()
		let elemRect = $element[0].getBoundingClientRect()
		// let dateLeft = elemRect.left - parentDomRect.left
		// let dateTop = elemRect.top - parentDomRect.top
		dateDom.css({position: 'absolute',left: elemRect.left, top: elemRect.top})
		// $("#ruledate", $("#" + model.pageId)).find("input").click()
		dateDom.find('input').click()
		var interval = setInterval(function(){
			num++;
			if(num > 10){
				closeDate(model);
				clearInterval(interval);
				return;
			}
			
			if($(".j-left").length > 0){
				if(document.body.scrollHeight < top + 28 + $(".j-left").parent().height()){//规则页面结果
					top = top - $(".j-left").parent().height();
				}else{//策略默认结果
					top = top + 28;
				}
				
				var $date = $(".j-left").attr("id", getRuleDateId(model));
				// 防止平台重定位导致控件闪烁
				// $date.hide();
				
				// 给平台80ms重定位				
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
			$('[data-page-id='+model.pageId+'_ruledate]').find('input').blur()
		}, 100);
	}
	
	var dateClickEvent = function(model, $element){
		if(model.pageState && model.pageState.toLocaleLowerCase() == "view"){
			return;
		}
		
		var $tr = $element.parents("tr");
		model.dateIndex = $tr.index();
		model.invokeCustomMethod("setDateFormat", {dateFormat : getDateFormat(model, $tr)});
	}
	
	var changeDeleteButton = function(model){
		if(model._showDeleteOnlyOneRow || $(".ruleResult tr", model.dom).length > 1){
			$(".ruleResult .resultDeleteTd", model.dom).show();
		}else{
			$(".ruleResult .resultDeleteTd", model.dom).hide();
		}
	}

	var getResultDisplayParamValue = function(model, $tr){
		return $tr.find(".resultParam").selectivity('data') && $tr.find(".resultParam").selectivity('data').text;
	}
	
	var getResultParamValue = function(model, $tr){
		return $tr.find(".resultParam").selectivity('value');
	}
	
	var getResultParamType = function(model, $tr){
		return $tr.find(".resultParam").selectivity('data') && $tr.find(".resultParam").selectivity('data').type;
	}
	
	var getResultParamTypeDetail = function(model, $tr){
		return $tr.find(".resultParam").selectivity('data') && $tr.find(".resultParam").selectivity('data').typeDetail;
	}
		
	var getDynamicObjectTypeDetail = function(model, $tr){
		return $tr.find(".resultParam").selectivity('data') && ($tr.find(".resultParam").selectivity('data').typeDetail + "_" + $tr.find(".resultParam").selectivity('data').entityNumber);
	}
	
	var getResultParamIsTarget = function(model, $tr){
		return $tr.find(".resultParam").selectivity('data') && $tr.find(".resultParam").selectivity('data').target === "true";
	}
	
	var getResultParamIsMulti = function(model, $tr){
		return $tr.find(".resultParam").selectivity('data') && $tr.find(".resultParam").selectivity('data').multiple === "1";
	}
	
	var getResultEnumList = function(model, $tr){
		return $tr.find(".resultParam").selectivity('data') && $tr.find(".resultParam").selectivity('data').enumList;
	}
	
	var isEnum4ParamType = function(model, $tr){
		return $tr.find(".resultParam").selectivity('data') && $tr.find(".resultParam").selectivity('data').enumList ? true : false;
	}
		
	var getDateFormat = function(model, $tr){
		return $tr.find(".resultParam").selectivity('data') && $tr.find(".resultParam").selectivity('data').dateFormat;
	}
	
	var getParamFilter = function(model, $tr){
		return $tr.find(".resultParam").selectivity('data') && $tr.find(".resultParam").selectivity('data').filters;
	}
	
	var getValueDateFormat = function(model, $tr){
		return $tr.find(".resultValueParam").selectivity('data') && $tr.find(".resultValueParam").selectivity('data').dateFormat;
	}
	
	var getResultValueTypeName = function(model, $tr){
		return $tr.find(".resultValueType").selectivity('data') && $tr.find(".resultValueType").selectivity('data').text
	}	
	
	var getResultValueTypeValue = function(model, $tr){
		return $tr.find(".resultValueType").selectivity('value');
	}
	
	var setValue = function(model, $element, displayValue, value){
		var $td = "";
		if($element.hasClass("resultValueTd")){
			$td = $element;
		}else if($element.closest(".resultValueTd").length > 0){
			$td = $element.closest(".resultValueTd");
		}else if($element.find(".resultValueTd").length > 0){
			$td = $element.find(".resultValueTd");
		}else{
			//console.log("赋值出错，无法找到resultValueTd：" + $element.attr("class"));
			return;
		}
		
		$td.find(".resultDisplayValue").val(displayValue);
		$td.find(".resultValue").val(value);
		
		resultJsonChange(model);
	}
	
	var resultJsonChange = function(model){
		if(model.initing !== "true"){
			var resultControlJson = JSON.stringify(getResultControlJson(model));
			//console.log(resultControlJson);
			model.invokeCustomMethod("setValue", resultControlJson);
		}
	}

	var changeParamStyle = function($dom, isCanEdit){		
		if(isCanEdit){
			$(".selectivity-single-selected-item", $dom).css("color","#000000");
			$(".selectivity-single-result-container", $dom).css("cursor","pointer");
			$(".selectivity-caret", $dom).show();
			$(".Select_iconBox_1WJ3", $dom).show()	
		}else{
			$(".selectivity-single-selected-item", $dom).css("color","#808080");
			$(".selectivity-single-result-container", $dom).css("cursor","default");
			$(".selectivity-caret", $dom).hide();
			$(".Select_iconBox_1WJ3", $dom).hide();
		}
	}
	
    //创建参数控件
    var createParamControl = function (model, $tr) {
        //业务对象
        var dom = $tr || model.dom;
		$('.resultParam', dom).selectivity({
			allowClear: true,
			items: model._param,
			readOnly: !model._paramChange
		});
		changeParamStyle($('.resultParam', dom), model._paramChange);		
		
		//参数改变时，初始化比较符（可以优化，比较参数类型是否改变）
		$('.resultParam', dom).off('change').on('change', function(e){
			if(model.initing == "true"){
				return;
			}
			if(e.target.className != "resultParam"){
				return;
			}
			
			var $tr = $(this).parents("tr");
			clearValue(model, $tr);
			
			var paramType = getResultParamType(model, $tr);
			if(getResultValueTypeValue(model, $tr) == "1"){
				createValueParamControl(model, $tr);
			}else if(getResultValueTypeValue(model, $tr) == "2"){	
				if(isEnum4ParamType(model, $tr)){
					showEnumSelectDiv(model, $tr);
				}else if(paramType == 'boolean'){
					showBooleanSelectDiv(model, $tr);
				}else if(paramType == 'date'){
					showDateDiv(model, $tr);
				}else if(paramType == 'number'){
					showNumberDiv(model, $tr);
				}else{ 
					showTextDiv(model, $tr);
				}
			}
			
			if(model.isResultJsonChange !== 'false'){
				resultJsonChange(model);
			}
		});
    } 
	
	//创建值参数控件
	var createValueParamControl = function(model, $tr){
		var dom = $tr || model.dom;
		var type = getResultParamTypeDetail(model, $tr);
		if(type == "dynamicObject" || type == "mul_dynamicObject" || type == "adminOrg" || type == "mul_adminOrg"){
			type = getDynamicObjectTypeDetail(model, $tr);
		}
		$('.resultValueParam', dom).selectivity({
			allowClear: true,
			items: model._valueParam[type] || null
		});
		
		//参数改变时，初始化比较符（可以优化，比较参数类型是否改变）
		$('.resultValueParam', dom).off('change').on('change', function(e){
			e.stopPropagation();
			if(model.initing == "true"){
				return;
			}
			// jquery.min.js("selectivity-search-input")和selectivity-jquery.js("resultValueParam")都会进。
			if(e.target.className != "resultValueParam"){
				return;
			}
			
			var displayValue = $(this).selectivity('data') && $(this).selectivity('data').text || $(this).selectivity('value');
			setValue(model, $(this), displayValue, $(this).selectivity('value'));
		});
	}
	
	var createValueTypeControl = function(model, $tr){
		var dom = $tr || model.dom;
		$('.resultValueType', dom).selectivity({
			allowClear: true,
			items: [{"id":"1","text":KDApi.getLangMsg(model, 'param')},{"id":"2","text":KDApi.getLangMsg(model, 'value')},{"id":"3","text":KDApi.getLangMsg(model, 'operationtarget')}]
		});
		
		//设置默认值
		$('.resultValueType', dom).selectivity('value', valueTypeMap.value);
		
		//参数改变时，初始化比较符（可以优化，比较参数类型是否改变）
		$('.resultValueType', dom).off('change').on('change', function(e){
			if(model.initing == "true"){
				return;
			}
			if(e.target.className != "resultValueType"){
				return;
			}
			
			var $tr = $(this).parents("tr");	
			clearValue(model, $tr);
			
			var valueType = $(this).selectivity('value');
			if(valueType == valueTypeMap.param){//参数
				showParamSelectDiv(model, $tr);
			}else if(valueType == valueTypeMap.value){//值	
				var paramType = getResultParamType(model, $tr);
				if(paramType == 'boolean'){					
					showBooleanSelectDiv(model, $tr);
				}else if(isEnum4ParamType(model, $tr)){//枚举和boolean应该是不能切换的，先放着
					showEnumSelectDiv(model, $tr);
				}else if(paramType == 'date'){
					showDateDiv(model, $tr);
				}else if(paramType == 'number'){
					showNumberDiv(model, $tr);
				}else{
					showTextDiv(model, $tr);
				}				
			}else if(valueType == valueTypeMap.target){//指标
				showTextDiv(model, $tr);
			}

			resultJsonChange(model);
		});
	}
	
	// 获取枚举显示值，对应多语言没值时取中文
	var getName = function(model, obj){
		return obj.name[model.lang] || obj.name['zh_CN'];
	}
	
	var createValueEnumControl = function(model, $tr, width){
		$(".multiDropDownControl", model.dom).html('');
		var enumList = JSON.parse(getResultEnumList(model, $tr));		
		//var value = $tr.find(".resultValue").val() || "";
		var displayValue = $tr.find(".resultDisplayValue").val() || "";
		
		var html = '<div class="Select_panel_ih2B commonAnimation_panel-drop-down-animation_Pq1y j-right" style="min-width: 210.656px; max-width: 600px; width:' + width + ';">';
		if(!getResultParamIsMulti(model, $tr)){//单选
			html+='<ul class="Select_list_2q7q">';
			$.each(enumList,function(i, obj){
				html+='<li class="kd-hover primary-text-in-light Select_item_1M8z">'
						+'<span title="' + getName(model, obj) + '" value="' + obj.value + '" class="Select_text_3aTn">' + getName(model, obj) + '</span>'			
					 +'</li>';
			});						  
			html+='</ul>';
		}else{//多选
			html+='<ul class="Select_list_2q7q">';
			var selectedNumber = 0;
			$.each(enumList,function(i, obj){
				html += '<li class="kd-hover primary-text-in-light Select_item_1M8z">';
				if($.inArray(getName(model, obj), displayValue.split(",")) >= 0){
					html += '<span class="kdfont Select_item-checkbox_P1pH theme-fc kdfont-fuxuankuangxuanzhong_fang">'
								+'<input type="checkbox" class="Select_select_checkbox_16Sj" readonly="" value="' + obj.value + '" checked="">'
						   +'</span>';						   
					selectedNumber++;
				}else{					
					html += '<span class="kdfont Select_item-checkbox_P1pH kdfont-fuxuankuangweixuanzhong_fang">'
								+'<input type="checkbox" class="Select_select_checkbox_16Sj" readonly="" value="' + obj.value + '" checked="">'
						   +'</span>';
				}		
				html += '<span title="' + getName(model, obj) + '" class="Select_text_3aTn">' + getName(model, obj) + '</span>'
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
	
	var createValueBooleanControl = function(model, $tr){
		var dom = $tr || model.dom;
		$('.resultValueBoolean', dom).selectivity({
			allowClear: true,
			items: [{"id":"true","text":KDApi.getLangMsg(model, 'yes')},{"id":"false","text":KDApi.getLangMsg(model, 'no')}]
		});
				
		$('.resultValueBoolean', dom).off('change').on('change', function(e){			
			if(model.initing == "true"){
				return;
			}
			
			if(e.target.className != "resultValueBoolean"){
				return;
			}
			
			var displayValue = $(this).selectivity('data') && $(this).selectivity('data').text || $(this).selectivity('value');
			setValue(model, $(this), displayValue, $(this).selectivity('value'));
		});
		
		//设置默认值
		$('.resultValueBoolean', dom).selectivity('value', "true");
	}
	
	var clearValue = function(model, $tr){		
		if($tr.find(".resultValueParam .selectivity-single-select").length > 0){
			$tr.find(".resultValueParam").selectivity('value', '');
		}
		
		//$tr.find(".resultValueBoolean").val('');
		if($tr.find(".resultValueBoolean .selectivity-single-select").length > 0){
			$tr.find(".resultValueBoolean").selectivity('value', '');
		}
		$tr.find(".resultValueEnum").val('');
		$tr.find(".resultValueNumber").val('');
		$tr.find(".resultValueDate").val('');
		$tr.find(".resultValueText").val('');
		$tr.find(".resultDisplayValue").val('');
		$tr.find(".resultValue").val('');
	}

    //F7更新值
    var updateTextValue = function (model, data) {
        var index = data.index;
		$(".resultValueText", model.dom).eq(index).val(data.nameList || data.idList);
        $(".resultDisplayValue", model.dom).eq(index).val(data.nameList || data.idList);
        $(".resultValue", model.dom).eq(index).val(data.idList);
		
		resultJsonChange(model);
    }
	
	var updateDateValue = function(model, date){
		var index = model.dateIndex;
		$(".resultValueDate", model.dom).eq(index).val(date);
		$(".resultDisplayValue", model.dom).eq(index).val(date);
		$(".resultValue", model.dom).eq(index).val(date);
		resultJsonChange(model);
	}

    var initControl = function (model, data) {
        initResult(model, data.resultList);	
    }

    var initResult = function (model, resultList) {
        if (resultList && resultList.length > 0) {
			$('.ruleResult tr', model.dom).remove();
			addResultRows(model, resultList.length);

            $.each(resultList, function (i, resultObj) {
				$tr = $('.ruleResult tr', model.dom).eq(resultObj.index);
				
				$tr.find(".resultParam").selectivity('value', resultObj.param);
				
				//更新值类型
				if(!resultObj.valueType){
					resultObj.valueType = "2";
				}
				
				$tr.find(".resultValueType").selectivity('value', resultObj.valueType);
				var paramType = resultObj.paramType || getResultParamType(model, $tr);
				if(resultObj.valueType == valueTypeMap.param){//参数
					//显示下拉
					showParamSelectDiv(model, $tr);
					$tr.find(".resultValueParam").selectivity('value', resultObj.value);
				}else if(resultObj.valueType == valueTypeMap.value){//值
					if(isEnum4ParamType(model, $tr)){
						showEnumSelectDiv(model, $tr);
						$tr.find(".resultValueEnum").val(resultObj.displayValue);
					}else if(paramType == 'boolean'){
						showBooleanSelectDiv(model, $tr);
						$tr.find(".resultValueBoolean").selectivity('value', resultObj.value || '');
					}else if(paramType == 'date'){
						showDateDiv(model, $tr);
						$tr.find(".resultValueDate").val(resultObj.value);
					}else if(paramType == 'number'){
						showNumberDiv(model, $tr);
						$tr.find(".resultValueNumber").val(resultObj.value);
					}else{ 
						showTextDiv(model, $tr);
						$tr.find(".resultValueText").val(resultObj.displayValue);
					}	
				}else if(resultObj.valueType == valueTypeMap.target){//指标
					showTextDiv(model, $tr);
					$tr.find(".resultValueText").val(resultObj.displayValue);
				}				
				
				// 如果预置了过滤条件
				if(resultObj.filters){
					$tr.find(".resultParam").selectivity('data').filters = resultObj.filters;
				}
				
				$tr.find(".resultDisplayValue").val(resultObj.displayValue)
				$tr.find(".resultValue").val(resultObj.value)
            });
        }
    }
	
	var addResultRows = function(model, rows){
		for (var i = 0; i < rows; i++) {
			var $tr = $('#templeteTrResult', model.dom).clone().removeAttr('id').show();
			$('.ruleResult', model.dom).append($tr);
			createValueTypeControl(model, $tr);
			createParamControl(model, $tr);
		}
		changeDeleteButton(model);
		resultJsonChange(model);
	}
	
	var showValueSearch = function(model, $tr){
		var paramType = getResultParamType(model, $tr);
		var valueType = getResultValueTypeValue(model, $tr);
		if((paramType == 'dynamicObject' && valueType == valueTypeMap.value) || valueType == valueTypeMap.target){
			$tr.find(".resultValueSearch").show();
			$tr.find(".resultValueText").attr("disabled", true);
		}else{
			$tr.find(".resultValueSearch").hide();
			$tr.find(".resultValueText").attr("disabled", false);
		}
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
	
	var showParamSelectDiv = function(model, $tr){
		showControl(model, $tr, 'resultValueParamSelectDiv');
		if(model.copy || $tr.find(".resultValueParamSelectDiv .selectivity-single-select").length == 0){
			createValueParamControl(model, $tr);
		}
	}
	
	var showNumberDiv = function(model, $tr){
		showControl(model, $tr, 'resultValueNumberDiv');
	}
	
	var showTextDiv = function(model, $tr){
		showControl(model, $tr, 'resultValueTextDiv');
		showValueSearch(model, $tr);
	}
	
	var showBooleanSelectDiv = function(model, $tr){
		showControl(model, $tr, 'resultValueBooleanSelectDiv');
		if(model.copy || $tr.find(".resultValueBooleanSelectDiv .selectivity-single-select").length == 0){
			createValueBooleanControl(model, $tr);
		}
	}
	
	var showEnumSelectDiv = function(model, $tr){
		showControl(model, $tr, 'resultValueEnumSelectDiv');
	}
	
	var showDateDiv = function(model, $tr){
		showControl(model, $tr, 'resultValueDateDiv');
	}

    //条件控件的返回值
    var getResultControlJson = function(model){
        var data = {};
        data.resultList = getResultJson(model);
        return data;
    }

    //获取结果的List
    var getResultJson = function(model){
        var resultList = new Array();
        $(".ruleResult tr", model.dom).each(function(i){
            var resultObj = {};
            resultObj.index = i;
			resultObj.displayParam = getResultDisplayParamValue(model, $(this));
            resultObj.param = getResultParamValue(model, $(this));
            resultObj.paramType = getResultParamType(model, $(this));
            resultObj.operators = "==";
			
			var selectValue = $(this).find('.resultValueTd select:visible').val();
			resultObj.valueType = getResultValueTypeValue(model, $(this));
			
            resultObj.displayValue = $(this).find(".resultDisplayValue").val() || $(this).find('.resultValueTd select:visible option[value="' + selectValue + '"]').html();
            resultObj.value = $(this).find(".resultValue").val() || selectValue;
			resultObj.dateFormat = getDateFormat(model, $(this));
			if(resultObj.paramType == "date" && resultObj.valueType == "1"){
				resultObj.valueDateFormat = getValueDateFormat(model, $(this));
			}			
			
            resultList.push(resultObj);
        });
        return resultList;
    }

    KDApi.register('ruleresult', Result, {isMulLang: true})
})(window.KDApi, jQuery)