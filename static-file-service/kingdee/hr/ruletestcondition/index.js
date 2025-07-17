(function(KDApi, $){
	var CSS_XUANZHONG = 'kdfont-fuxuankuangxuanzhong_fang';
	var CSS_WEIXUANZHONG = 'kdfont-fuxuankuangweixuanzhong_fang';
	var CSS_BUFENXUANZHONG = 'kdfont-fuxuankuang5';
	var CSS_OTHER = 'theme-fc';
	
	var valueControlList = ['valueBooleanSelectDiv', 'valueTextDiv', 'valueNumberDiv', 'valueEnumSelectDiv', 'valueDateDiv'];
	
    function TestCondition (model) {
        this._setModel(model)
    }

    TestCondition.prototype = {
        _setModel: function(model) {
            this.model = model;
			model.pageDom = $("#" + model.pageId);
			localStorage.setItem('loading', KDApi.getLangMsg(model, 'loading'));
			localStorage.setItem('loadMore', KDApi.getLangMsg(model, 'loadMore'));
			localStorage.setItem('noResults', KDApi.getLangMsg(model, 'noResults'));
			localStorage.setItem('noResultsForTerm', KDApi.getLangMsg(model, 'noResultsForTerm'));
        },
        init: function(props){
            initFunc(this.model, props)
        },
        update: function(props){
            updateFunc(this.model, props)
        },
        destoryed: function(){
			$('[data-page-id='+this.model.pageId+'_ruledate]').remove()
        }
    }
	
    // Other Code
    var initFunc = function(model, props) {
        // KDApi.loadFile可以通过路径加载js或css文件，并且在html文件头生成script或者link标签，第一个参数是路径，第二个参数是model，第三个参数是加载完成后执行的回调函数
		KDApi.loadFile(['../rule/css/pingtai.css','../rule/js/selectivity-jquery.js','../rule/css/selectivity-jquery.css', '../rule/css/customStyle.css'], model, function(){
			KDApi.loadFile('../rule/js/selectivity-jquery.js', model, function(){
				KDApi.loadFile('./css/testcondition.css', model, function() {
					// 后端插件通过setData传给前端的数据，前端可以通过props.data去获取
					var text = props.data && props.data.text || ''
					// 通过路径去获取html字符串，第一个参数是路径，第二个参数是model，第三个参数是HTML模板中变量的值
					KDApi.getTemplateStringByFilePath('./html/testcondition.html', model, {
						text: text,
						inputconditionparam:KDApi.getLangMsg(model, 'inputconditionparam'),
						addrow:KDApi.getLangMsg(model, 'addrow'),
						deleterow:KDApi.getLangMsg(model, 'deleterow'),
						paramname:KDApi.getLangMsg(model, 'paramname'),
						paramvalue:KDApi.getLangMsg(model, 'paramvalue'),
						nodata:KDApi.getLangMsg(model, 'nodata'),
						first:KDApi.getLangMsg(model, 'first'),
						page:KDApi.getLangMsg(model, 'page'),
						last:KDApi.getLangMsg(model, 'last')
					}).then(function(data) {
						model.dom.innerHTML = data
						// 绑定DOM事件
						initEvent(model, props)
					})        
				})
			})
		})
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
	
	var showDate = function(model){	
		// 等待修改日期格式
		setTimeout(function(){
			// $('[data-page-id=${model.pageId}_ruledate]').find("input").click()
			// $("#ruledate", $("#" + model.pageId)).find("input").click();
			dateRelocation(model, true, 200);
		}, 100);
	}
	
	var closeDate = function(model){
		setTimeout(function(){
			$('[data-page-id='+model.pageId+'_ruledate]').find('input').blur()
			// $("#ruledate", model.pageDom).find("input").blur(); 
		}, 100);
	}
	
	var getRuleDateId = function(model){
		return model.pageId + model.key + "date";
	}
	
	var initDateEvent = function(model){
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
		
		$(model.dom).on('click', '.ruleTest .valueDateDiv', function(){
			var $tr = $(this).parents('.ag-row');
			model.dateIndex = $tr.index();
			model.invoke("setDateFormatEvent", {dateFormat : getDateFormat(model, $tr)});
		});				
		
		$("#kd-theme").on("click", '#' + getRuleDateId(model) + " td div", function(){
			if(model.dateIndex >= 0){
				dateRelocation(model, false);
			}
		})
		
		$("#kd-theme").on("click", '#' + getRuleDateId(model) + " .calendar-header-hover a", function(){
			if(model.dateIndex >= 0 && $(this).closest("table").children("thead").length == 0){
				dateRelocation(model, false, 200);
			}
		})	
		
		$("#kd-theme").on("click", '#' + getRuleDateId(model) + " td div[data-value]", function(){
			closeDate(model);
		})
	}
	
	//事件绑定
    var initEvent = function(model, props){
		initDateEvent(model);
		let dateDom = $("#ruledate", $("#" + model.pageId))
		if (dateDom[0]) {
			dateDom.css({position: 'absolute', height: '30px', width: '230px'})
			dateDom.find('.kd-cq-field-title-wrap').css({display: 'none'})
			document.body.appendChild(dateDom[0])
		}

		// 本地环境没有ID。。。。。。。。坑
		//$(model.pageDom).on('click', 'div[data-btn-key="ruletest"]', function(){
		$(model.pageDom).on('click', '#ruletest', function(){
			if(!$("#conditionpageap", model.pageDom).hasClass("hidden")){
				var conditionJson = getConditionJson(model);			
				model.invoke("testRuleEvent", conditionJson);
			}
		})
		
		$(model.dom).on('blur', '.ruleTest .valueNumber', function(){
			var value = $(this).val();
			value.replace(/^0*/, "").replace(/^0*\./, "0.");
			$(this).val(value)
		})
		
		$(model.dom).on('click', '.ruleTest .conditionValueSearch', function(){
			var $tr = $(this).parents('.ag-row');
			var index = $tr.index();//从1开始
			model.invoke("openConditionParamF7Event", {entityNumber : getConditionParamValue(model, $tr), index : index, isMulti : getConditionParamIsMulti(model, $tr), value : getValue($tr)});	
        })
		
		//点击行选中（框架不支持行反选）
		$(model.dom).on('click', '.ruleTest .ag-center-cols-container .ag-row', function(){
			selectRows(model, $(this));
        })
		
		//点击单元格选中
		$(model.dom).on('click', '.ruleTest .ag-center-cols-container .ag-cell', function(event){
			selectRows(model, $(this).parents(".ag-row"));
			
			$(this).addClass('ag-cell-focus');
			event.stopPropagation();
        })
		//点击多选按钮选中
		$(model.dom).on('click', '.ruleTest .ag-pinned-left-cols-container .row-selection-icon', function(){
			if($(this).hasClass(CSS_WEIXUANZHONG)){//未选中->选中				
				selectCheckBox(model, $(this), true);
			}else{
				selectCheckBox(model, $(this), false);
			}
        })
		
		//点击多选按钮选中
		$(model.dom).on('click', '.ruleTest .checkBoxAll', function(){	
			if($(this).hasClass(CSS_XUANZHONG)){//全选->全不选
				selectCheckBox(model, $('.ruleTest .ag-pinned-left-cols-container .row-selection-icon', model.dom), false);
			}else{//全不选/部分选中->全选
				selectCheckBox(model, $('.ruleTest .ag-pinned-left-cols-container .row-selection-icon', model.dom), true);
			}
        })
		
		//点击删除
		$(model.dom).on('click', '#delCondition', function(){			
			//如果是全选，则直接清空
			if($('.ruleTest .checkBoxAll', model.dom).hasClass(CSS_XUANZHONG)){
				clearCondition(model);
			}else{
				var firstDelSeq = $('.ruleTest .' + CSS_XUANZHONG, model.dom).parents('.ag-row').eq(0).find('.CellClass_lightRender_293x').html();
				
				$('.ruleTest .' + CSS_XUANZHONG, model.dom).parents('.ag-row').each(function(){
					var index = $(this).index();
					$('.ruleTest .ag-center-cols-container .ag-row', model.dom).eq(index).remove();
					$('.ruleTest .ag-pinned-left-cols-container .ag-row', model.dom).eq(index).remove();				
				});
				//重排序
				$(".ruleTest .CellClass_lightRender_293x", model.dom).each(function(i){
					$(this).html(i+1)
				})				
				setTrHeight(model, $(".ruleTest .CellClass_lightRender_293x", model.dom).length * 40);
				//选中上一行
				if(firstDelSeq - 2 >= 0){
					selectRows(model, $('.ruleTest .ag-center-cols-container .ag-row', model).eq(firstDelSeq - 2))
				}
				if(!$('.ruleTest .ag-pinned-left-cols-container .row-selection-icon', model.dom).hasClass(CSS_XUANZHONG)){
					selectCheckBoxAll(model, CSS_WEIXUANZHONG);
				}
				if($(".ruleTest .CellClass_lightRender_293x", model.dom).length == 0){
					$('.ruleTest .emptyContent', model.dom).show();
				}
			}
        })
		
		$(model.dom).on('click', '#addCondition', function(){
            //1.其他行取消选中
			cancelSelectRows(model);
			//2.新增并选中该行
			insertCondition(model);
			//3.全选改为部分选中
			if(!$('.ruleTest .ag-pinned-left-cols-container .row-selection-icon', model.dom).hasClass(CSS_WEIXUANZHONG)){//如果没有未选中的checkBox
				selectCheckBoxAll(model, CSS_XUANZHONG);
			}else if($('.ruleTest .checkBoxAll', model.dom).hasClass(CSS_WEIXUANZHONG)){
				selectCheckBoxAll(model, CSS_BUFENXUANZHONG);
			} 
        })
		
		//hover
		$(model.dom).on('mouseenter', '.ruleTest .ag-row', function(){
			$(this).addClass('ag-row-hover');
        })
		$(model.dom).on('mouseleave', '.ruleTest .ag-row', function(){
			$(this).removeClass('ag-row-hover');
        })
		//hover
		$(model.dom).on('mouseenter', '.ruleTest .ag-cell', function(){
			$(this).addClass('ag-column-hover');
        })
		$(model.dom).on('mouseleave', '.ruleTest .ag-cell', function(){
			$(this).removeClass('ag-column-hover');
        })		
		
		$(model.dom).on('click', '.ruleTest .valueEnumSelectDiv', function(e){	
			var $tr = $(this).parents(".ag-row");
			var isOld = $tr.index() == $(".multiDropDownControl", model.dom).attr("index");
			$(this).attr("index", $tr.index());	
			
			if(!isOld || $(".multiDropDownControl", model.dom).is(":hidden")){// 点击其他枚举控件时或者未显示下拉，展示下拉				
				createValueEnumControl(model, $tr, $(this).css("width"));
				$(".multiDropDownControl", model.dom).show();
				var top = $(this).offset().top + 28;
				if(document.body.scrollHeight < top + $(".multiDropDownControl .j-right", model.dom).height()){
					top = top - $(".multiDropDownControl .j-right", model.dom).height() - 28 - 11;
				}
				var left = $(this).offset().left;
				$(this).find(".xialajiantou").addClass("xiangshangjiantou");
				$(".multiDropDownControl", model.dom).css("width", "292px").css("top", top).css("left", left).attr("index", $tr.index());
			}else{
				$tr.find(".xialajiantou").removeClass("xiangshangjiantou");
				$(".multiDropDownControl", model.dom).hide();
			}
		})
		
		$(document).on("click", function(e){
            //点击id为menu之外的元素，则触发        
            if($(e.target).closest("#multiDropDownControl").length == 0 && $(e.target).closest(".valueEnumSelectDiv").length == 0){
                $(".multiDropDownControl", model.dom).hide();
				$(e.target).closest(".valueEnumSelectDiv").find(".xialajiantou").removeClass("xiangshangjiantou");
            }
        })
		
		//下拉单选事件
		$(model.dom).on('click', '.multiDropDownControl li.Select_item_1M8z', function(){
			var index = $(".multiDropDownControl", model.dom).attr("index");
			var $tr = $(".ag-center-cols-container .ag-row:eq(" + index + ")", model.dom);
			var $valueEnum = $tr.find(".valueEnum");
			var displayValue = $(this).find(".Select_text_3aTn").html();		
			
			if(!getConditionParamIsMulti(model, $tr)){
				var value = $(this).find(".Select_text_3aTn").attr('value');
				setEnumValue(model, $valueEnum, displayValue, value);
				$(".multiDropDownControl", model.dom).hide();
				$tr.find(".valueEnumSelectDiv").find(".xialajiantou").removeClass("xiangshangjiantou");
			}else{			
				var value = $(this).find("input[type='checkbox']").val();
				if($(this).find(".Select_item-checkbox_P1pH").hasClass(CSS_WEIXUANZHONG)){//选中
					//枚举值修改
					var newDisplayValue = $valueEnum.val() ? $valueEnum.val() + "," + displayValue : displayValue;
					var newValue = $valueEnum.data("value") ? $valueEnum.data("value") + "," + value : value;
					setEnumValue(model, $valueEnum, newDisplayValue, newValue);
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
					var newDisplayValue = $valueEnum.val() == displayValue ? "" : replaceValue($valueEnum.val(), displayValue);
					var newValue = $valueEnum.data("value") == value ? "" : replaceValue($valueEnum.data("value"), value);
					setEnumValue(model, $valueEnum, newDisplayValue, newValue);
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
			var $tr = $(".ag-center-cols-container .ag-row:eq(" + index + ")", model.dom);
			var $valueEnum = $tr.find(".valueEnum");			
			
			if($(this).children(".Select_all-checkbox_DrTC").hasClass(CSS_WEIXUANZHONG)){//未选中->全选中
				var newDisplayValue = "";
				var newValue = ""
				$(".multiDropDownControl li.Select_item_1M8z", model.dom).each(function(){
					newDisplayValue += $(this).find(".Select_text_3aTn").html() + ",";
					newValue += $(this).find(".Select_select_checkbox_16Sj").val() + ",";
				})
				newDisplayValue = newDisplayValue.substring(0, newDisplayValue.length - 1);
				newValue = newValue.substring(0, newValue.length - 1);
			
				setEnumValue(model, $valueEnum, newDisplayValue, newValue);
			
				$(this).children(".Select_all-checkbox_DrTC").removeClass(CSS_WEIXUANZHONG).addClass(CSS_OTHER).addClass(CSS_XUANZHONG);
				$('.multiDropDownControl .Select_item-checkbox_P1pH', model.dom).removeClass(CSS_WEIXUANZHONG).addClass(CSS_OTHER).addClass(CSS_XUANZHONG);					 
				$(this).parent().find(".Select_select-totalSelected_3wgi>span").html($(".multiDropDownControl li", model.dom).length);
				//修改值
			}else{//全选中/部分选中->未选中
				setEnumValue(model, $valueEnum, "", "");
					
				$(this).children(".Select_all-checkbox_DrTC").removeClass(CSS_BUFENXUANZHONG).removeClass(CSS_XUANZHONG).removeClass(CSS_OTHER).addClass(CSS_WEIXUANZHONG);
				$('.multiDropDownControl .Select_item-checkbox_P1pH', model.dom).removeClass(CSS_BUFENXUANZHONG).removeClass(CSS_XUANZHONG).removeClass(CSS_OTHER).addClass(CSS_WEIXUANZHONG);				
				$(this).parent().find(".Select_select-totalSelected_3wgi>span").html(0);				
			}
		})
    }
	
	var replaceValue = function(oldValue, flag){
		var temp = oldValue.split(",");
		temp = temp.filter(function(str){
			return str != flag;
		});
		return temp.toString();
	}
	
	var setEnumValue = function(model, $element, displayValue, value){
		$element.val(displayValue).data("value", value);
	}
	
	var selectRows = function(model, $tr){
		cancelSelectRows(model);
		
		selectCheckBox(model, $(".ruleTest .ag-pinned-left-cols-container .row-selection-icon", model.dom).eq($tr.index()), true);
		$tr.addClass('ag-row-selected');
	}
	
	var cancelSelectRows = function(model){
		selectCheckBox(model, $(".ruleTest .ag-pinned-left-cols-container .row-selection-icon", model.dom), false);
		$(".ruleTest .ag-row", model.dom).removeClass('ag-row-hover').removeClass('ag-row-selected');
		$(".ruleTest .ag-cell", model.dom).removeClass('ag-column-hover').removeClass('ag-cell-focus');
	}
	
	var selectCheckBoxAll = function(model, type){
		if(type == CSS_XUANZHONG){//全选
			$('.ruleTest .checkBoxAll', model.dom).removeClass(CSS_WEIXUANZHONG).removeClass(CSS_BUFENXUANZHONG).removeClass(CSS_OTHER).addClass(CSS_OTHER).addClass(CSS_XUANZHONG);
		}else if(type == CSS_BUFENXUANZHONG){//部分选中
			$('.ruleTest .checkBoxAll', model.dom).removeClass(CSS_WEIXUANZHONG).removeClass(CSS_XUANZHONG).removeClass(CSS_OTHER).addClass(CSS_OTHER).addClass(CSS_BUFENXUANZHONG);
		}else{//全不选
			$('.ruleTest .checkBoxAll', model.dom).removeClass(CSS_BUFENXUANZHONG).removeClass(CSS_XUANZHONG).removeClass(CSS_OTHER).addClass(CSS_WEIXUANZHONG);
		}
	}

	var selectCheckBox = function(model, $checkBox, flag){
		if(flag){
			$checkBox.removeClass(CSS_WEIXUANZHONG).addClass(CSS_OTHER).addClass(CSS_XUANZHONG);
			
			if(!$('.ruleTest .ag-pinned-left-cols-container .row-selection-icon', model.dom).hasClass(CSS_WEIXUANZHONG)){//如果没有未选中的checkBox
				selectCheckBoxAll(model, CSS_XUANZHONG);
			}else if($('.ruleTest .checkBoxAll', model.dom).hasClass(CSS_WEIXUANZHONG)){
				selectCheckBoxAll(model, CSS_BUFENXUANZHONG);
			} 
		}else{
			$checkBox.removeClass(CSS_OTHER).removeClass(CSS_XUANZHONG).addClass(CSS_WEIXUANZHONG);
			
			if(!$('.ruleTest .ag-pinned-left-cols-container .row-selection-icon', model.dom).hasClass(CSS_XUANZHONG)){//如果没有选中的checkBox
				selectCheckBoxAll(model, CSS_WEIXUANZHONG);
			}else if($('.ruleTest .checkBoxAll', model.dom).hasClass(CSS_XUANZHONG)){
				selectCheckBoxAll(model, CSS_BUFENXUANZHONG);
			}
		}
	}
	
    var updateFunc = function(model, props) {		
		if(props.data){		
			if(props.data.param){	
				model._param = props.data.param;
				clearCondition(model);
			}
			if(props.data.value){
				updateTextValue(model, props.data.value);
			}
			if(props.data.date && model.dateIndex >= 0){//这个要放最后，防止控件还没初始化完成
				updateDateValue(model, props.data.date);
				model.dateIndex = -1;
			}	
			if(props.data.showDate){
				showDate(model);
			}
		}
    }
	
	var clearCondition = function(model){
		$('.ruleTest .ag-pinned-left-cols-container', model.dom).html('');
		$('.ruleTest .ag-center-cols-container', model.dom).html('');
		selectCheckBoxAll(model, CSS_WEIXUANZHONG);
		$('.ruleTest .emptyContent', model.dom).show();
		setTrHeight(model, 40);
	}
	
	var setTrHeight = function(model, height){
		height = height < 40 ? 40 : height;
		$('.ruleTest .ag-pinned-left-cols-container', model.dom).css("height", height + "px");
		$('.ruleTest .ag-center-cols-clipper', model.dom).css("height", height + "px");
		$('.ruleTest .ag-center-cols-container', model.dom).css("height", height + "px");
		$('.ruleTest .ag-pinned-right-cols-container', model.dom).css("height", height + "px");
		$('.ruleTest .ag-full-width-container', model.dom).css("height", height + "px");
		$(".ruleTest #sceneinputparams", model.dom).css("height", (height + 46) + "px");
		$(".ruleTest .GridStyles_gridContainerI_3nhG", model.dom).css("height", (height + 44) + "px");
	}
	
	var getConditionParamValue = function(model, $tr){
		return $tr.find(".conditionParam").selectivity('value');
	}	
	
	var getConditionParamIsMulti = function(model, $tr){
		return $tr.find(".conditionParam").selectivity('data') && $tr.find(".conditionParam").selectivity('data').multiple === "1";
	}
	
	var getConditionParamType = function(model, $tr){
		return $tr.find(".conditionParam").selectivity('data') && $tr.find(".conditionParam").selectivity('data').type;
	}
	
	var getConditionParamTypeDetail = function(model, $tr){
		return $tr.find(".conditionParam").selectivity('data') && $tr.find(".conditionParam").selectivity('data').typeDetail;
	}
	
	var getDateFormat = function(model, $tr){
		return $tr.find(".conditionParam").selectivity('data') && $tr.find(".conditionParam").selectivity('data').dateFormat;
	}
	
	var getConditionEnumList = function(model, $tr){
		return $tr.find(".conditionParam").selectivity('data') && $tr.find(".conditionParam").selectivity('data').enumList;
	}
	
	var getDateFormat = function(model, $tr){
		return $tr.find(".conditionParam").selectivity('data') && $tr.find(".conditionParam").selectivity('data').dateFormat;
	}
	
	var isEnum4ParamType = function(model, $tr){
		return $tr.find(".conditionParam").selectivity('data') && $tr.find(".conditionParam").selectivity('data').enumList ? true : false;
	}
	
	var isAdminOrg4ParamType = function(model, $tr){
		return $tr.find(".conditionParam").selectivity('data') && $tr.find(".conditionParam").selectivity('data').category === "adminOrg";
	}
	
	var showValueSearch = function(model, $tr){
		if(getConditionParamType(model, $tr) == 'dynamicObject'){										
			$tr.find(".BaseData_icon_2ri7").addClass('conditionValueSearch');
			$tr.find(".valueText").attr("disabled", true);
		}else{
			$tr.find(".BaseData_icon_2ri7").removeClass('conditionValueSearch');
			$tr.find(".valueText").attr("disabled", false);
		}
	}
	
	var insertCondition = function(model){
		var index = $('.ruleTest .ag-pinned-left-cols-container', model.dom).children().length;
		var value = index + 1;
		
		var $seq = $('#seqTemplete', model.dom).clone().removeAttr('id').show();
		$seq.find(".CellClass_lightRender_293x").html(value).parent().attr("title", value);
		$('.ruleTest .ag-pinned-left-cols-container', model.dom).append($seq);
		
		var $param = $('#paramTemplete', model.dom).clone().removeAttr('id').show();
		$('.ruleTest .ag-center-cols-container', model.dom).append($param);		
		
		var height = ($('.ruleTest .ag-pinned-left-cols-container', model.dom).children().length * 40);
		setTrHeight(model, height);
		if($('.ruleTest .emptyContent', model.dom).is(":visible")){
			$('.ruleTest .emptyContent', model.dom).hide();
		}
		
		createParamControl(model, $param);
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
	
	var showNumberDiv = function(model, $tr){
		showControl(model, $tr, 'valueNumberDiv');
	}
	
	var showTextDiv = function(model, $tr){
		showControl(model, $tr, 'valueTextDiv');
		showValueSearch(model, $tr);
	}
	
	var showBooleanSelectDiv = function(model, $tr){
		showControl(model, $tr, 'valueBooleanSelectDiv');
		if($tr.find(".valueBoolean .selectivity-single-select").length == 0){
			createValueBooleanControl(model, $tr);
		}	
	}
	
	var showEnumSelectDiv = function(model, $tr){
		showControl(model, $tr, 'valueEnumSelectDiv');
	}
	
	var showDateDiv = function(model, $tr){
		showControl(model, $tr, 'valueDateDiv');
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
			if(e.target.className != "conditionParam"){
				return;
			}
			var $tr = $(this).parents('.ag-row');
			clearValue(model, $tr);
			
			var paramType = getConditionParamType(model, $tr);
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
		});
	}
	
	// 获取枚举显示值，对应多语言没值时取中文
	var getName = function(model, obj){
		return obj.name[model.lang] || obj.name['zh_CN'];
	}
	
	var createValueEnumControl = function(model, $tr, width){
		$(".multiDropDownControl", model.dom).html('');
		var enumList = JSON.parse(getConditionEnumList(model, $tr));
		var displayValue = $tr.find(".valueEnum").val() || "";
		//var value = $tr.find(".valueEnum").data("value") || "";
						
		var html = '<div class="Select_panel_ih2B commonAnimation_panel-drop-down-animation_Pq1y j-right" style="min-width: 210.656px; max-width: 600px; width:' + width + ';">';
		if(!getConditionParamIsMulti(model, $tr)){//单选
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
		$('.valueBoolean', dom).selectivity({
			allowClear: true,
			items: [{"id":"true","text":KDApi.getLangMsg(model, 'yes')},{"id":"false","text":KDApi.getLangMsg(model, 'no')}]
		});
		
		$('.valueBoolean', dom).selectivity('value', "true");
	}
	
	var clearValue = function(model, $tr){	
		$tr.find(".valueEnum").val('').data('value', '');
		$tr.find(".valueDate").val('').data('value', '');
		$tr.find(".valueBoolean").val('').data('value', '');
		$tr.find(".valueNumber").val('').data('value', '');
		$tr.find(".valueText").val('').data('value', '');
	}
	
	
	//F7更新值
	var updateTextValue = function(model, data){
		$(".ruleTest .valueText", model.dom).eq(data.index).val(data.nameList.join(",") || data.idList.join(",")).data("value", data.idList.join(","));
	}
	
	var updateDateValue = function(model, date){
		$(".ruleTest .valueDate", model.dom).eq(model.dateIndex).val(date).data("value", date);
	}
	
	var getValue = function($tr){
		return $tr.find('.valueDiv input:visible').data("value") || $tr.find('.valueDiv input:visible').val();
	}
	
	//获取条件的List
	var getConditionJson = function(model){
		var paramList = new Array();
		$(".ruleTest .ag-center-cols-container .ag-row", model.dom).each(function(){
			var key = getConditionParamValue(model, $(this));
			if(key){
				var obj = {};
				obj.param = key;
				obj.value = getValue($(this));
				obj.type = getConditionParamType(model, $(this));
				obj.typeDetail = getConditionParamTypeDetail(model, $(this));
				obj.dateFormat = getDateFormat(model, $(this));
				if(isAdminOrg4ParamType(model, $(this))){
					obj.isAdminOrg = true;
				}
				paramList.push(obj);
			}
		});
		return JSON.stringify(paramList);
	}
	
    KDApi.register('ruletestcondition', TestCondition, {isMulLang: true})
})(window.KDApi, jQuery)
