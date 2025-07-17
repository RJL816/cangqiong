(function(KDApi, $){

	var valueControlList = ['valueBooleanSelectDiv', 'valueTextDiv', 'valueNumberDiv', 'valueDateDiv'];
	
    function TargetResult (model) {
        this._setModel(model)
    }

    TargetResult.prototype = {
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
            if(this.model.dom.innerHTML && props.data){
				updateFunc(this.model, props.data)
			} 
        },
        destoryed: function(){
        },
		handleDirective:function(object, method, args){
			var model = this.model;
			if(model && model.dom && model.dom.innerHTML){
				updateFunc(model, args[0]);
			}
		}
    }

    // Other Code
    var initFunc = function(model, props) {
        // KDApi.loadFile可以通过路径加载js或css文件，并且在html文件头生成script或者link标签，第一个参数是路径，第二个参数是model，第三个参数是加载完成后执行的回调函数
		KDApi.loadFile(['./css/targetresult.css','../rule/css/selectivity-jquery.css'], model, function() {
			KDApi.loadFile('../rule/js/selectivity-jquery.js', model, function(){
				// 后端插件通过setData传给前端的数据，前端可以通过props.data去获取
				var text = props.data && props.data.text || ''
				// 通过路径去获取html字符串，第一个参数是路径，第二个参数是model，第三个参数是HTML模板中变量的值
				KDApi.getTemplateStringByFilePath('./html/targetresult.html', model, {
					text: text
				}).then(function(data) {
					model.dom.innerHTML = data				
					//初始化枚举控件
					createValueBooleanControl(model);
					// 绑定DOM事件
					initEvent(model, props)
				})   
			})			
		})
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
				
		$('.valueDateDiv', model.dom).on('click', function(){
			if(model.pageState && model.pageState.toLocaleLowerCase() == "view"){
				return;
			}
			
			model.dateIndex = 1;// 标明是当前控件触发，没有实际意义			
			model.invokeCustomMethod("setDateFormat", {dateFormat : model.dateFormat});
		});
		
		$("#kd-theme").on("click", '#' + getRuleDateId(model) + " .calendar-header-hover a", function(){
			if(model.dateIndex >= 0){
				dateRelocation(model, false, 200);
			}			
		})
		
		$("#kd-theme").on("click", '#' + getRuleDateId(model) + " td div", function(){
			if(model.dateIndex >= 0 && $(this).closest("table").children("thead").length == 0){
				dateRelocation(model, false);
			}
		})
		
		$("#kd-theme").on("click", '#' + getRuleDateId(model) + " td div[data-value]", function(){
			closeDate(model);
		})
	}
	
	//事件绑定
    var initEvent = function(model, props){
		initDateEvent(model);
		
		$(model.dom).on('keydown', '.valueDate:visible', function(){
			return false;
		});
		
		$(model.dom).on('blur', '.valueNumber:visible', function(){
			var value = $(this).val();
			value.replace(/^0*/, "").replace(/^0*\./, "0.");
			$(this).val(value)
			setValue(model, value);
		})
		
		$(model.dom).on('blur', '.valueText:visible', function(){
			setValue(model, $(this).val());
		})
    }
	

	var dateRelocation = function(model, triggerClick, waitTime){
		var $element = $('.valueDateDiv', model.dom).eq(0);
		var top = $element.offset().top;
		var left = $element.offset().left;
		var num = 0;
		var interval = setInterval(function(){
			num++;
			if(num > 10){
				closeDate(model);
				clearInterval(interval);
				return;
			}		
			if($(".j-left").length > 0){
				if(document.body.scrollHeight < top + 28 + $(".j-left").parent().height()){
					top = top - $(".j-left").parent().height();
				}else{
					top = top + 28;
				}
				
				var $date = $(".j-left").attr("id", getRuleDateId(model));
				// 防止平台重定位导致控件闪烁
				$date.hide();
				// 给平台80ms重定位
				setTimeout(function(){
					$date.parent().css("top", top)
				    $date.parent().css("left", left)
					$date.show(); 
				}, waitTime || 10);
				clearInterval(interval);
			}else if(triggerClick){
				$("#ruledate", model.pageDom).find("input").click();
			}
		}, 10);
	}
	
	var getRuleDateId = function(model){
		return model.pageId + model.key + "date";
	}
	
	var closeDate = function(model){
		setTimeout(function(){
			$("#ruledate", model.pageDom).find("input").blur(); 
		}, 100);
	}

	var showDate = function(model){	
		// 等待修改日期格式
		setTimeout(function(){
			$("#ruledate", $("#" + model.pageId)).find("input").click();
			dateRelocation(model, true, 200);
		}, 100);
	}
	
    var updateFunc = function(model, data) {
		try{	
			model.initing = data.initing;
			
			if(!data){
				return;
			}
			if(data.type){
				model._type = data.type;
				showControlByType(model, data);
			}
			if(data.value != undefined){//只要传了，就可以更新
				// 更新值时，由于是从控件触发的，不用再触发控件值更新
				model.initing = "true";
				updateValue(model, data.value);
				model.initing = "false";				
			}
			if(data.clear){//只要传了，就可以更新
				updateValue(model, "");
			}
			if(data.date != undefined && model.dateIndex >= 0){//只要传了，就可以更新
				updateValue(model, data.date);
				model.dateIndex = -1;
			}
			if(data.dateFormat){//只要传了，就可以更新
				model.dateFormat = data.dateFormat;
			}
			if(data.showDate){//只要传了，就可以更新
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
	
	var changePageState = function(model, pageState){
		if(pageState.toLocaleLowerCase() == "view"){//查看态
			// 取消布尔事件
			$('.targetResult .valueBoolean', model.dom).selectivity('setOptions', { readOnly: true })
			// 不允许编辑
			$(".targetResult input:visible", model.dom).attr("disabled", true).css("color","#808080");	
			$(".selectivity-single-selected-item", model.dom).css("color","#808080");
			$(".selectivity-single-result-container", model.dom).css("cursor","default");
			// 隐藏日期
			$(".kdfont-riqixuanze", model.dom).hide();
			// 隐藏下拉箭头
			$(".xialajiantou", model.dom).removeClass('kdfont-xiala');
			// 下划线高亮隐藏
			$(".targetResult", model.dom).removeClass('kd-field-item-border');
			$(".kd-field-no-tip", model.dom).addClass('weak-border');
		}else{//编辑态
			// 绑定布尔事件
			$('.targetResult .valueBoolean', model.dom).selectivity('setOptions', { readOnly: false })
			// 允许编辑
			$(".targetResult input:visible", model.dom).attr("disabled", false).css("color","#000000");
			$(".selectivity-single-selected-item", model.dom).css("color","#000000");
			$(".selectivity-single-result-container", model.dom).css("cursor","pointer");
			// 显示日期
			$(".kdfont-riqixuanze", model.dom).show();
			// 显示下拉箭头
			$(".xialajiantou", model.dom).addClass('kdfont-xiala');			
			// 下划线高亮显示
			$(".targetResult", model.dom).addClass('kd-field-item-border');
			$(".kd-field-no-tip", model.dom).removeClass('weak-border');
		}
	}
	
	var clearValue = function(model){
		$(".valueBoolean", model.dom).selectivity('value', '');		
		$("input:visible", model.dom).val('');
	}
	
	var showControlByType = function(model, data){
		clearValue(model);
		switch(data.type) {
			case "string":
				showTextDiv(model, data.F7);
				break;
			case "number":
				showNumberDiv(model);
				break;
			case "date":
				showDateDiv(model);
				break;
			case "boolean":
				showBooleanSelectDiv(model);
				break;
			default:
				showTextDiv(model, data.F7);
		} 
	}
	
	var showNumberDiv = function(model){
		showControl(model, 'valueNumberDiv');
	}
	
	var showTextDiv = function(model, flag){
		showControl(model, 'valueTextDiv');
		if(flag){							
			$(model.dom).find(".BaseData_base-data-iconArea_h_gc").show();
			$(model.dom).find(".valueText").attr("disabled", true);
		}else{
			$(model.dom).find(".BaseData_base-data-iconArea_h_gc").hide();
			$(model.dom).find(".valueText").attr("disabled", false);
		}
	}
	
	var showBooleanSelectDiv = function(model){
		showControl(model, 'valueBooleanSelectDiv');
	}	
	
	var showDateDiv = function(model){
		showControl(model, 'valueDateDiv');
	}	
	
	var showControl = function(model, controlKey){
		$.each(valueControlList, function(i, valueControlKey){
			if(valueControlKey == controlKey){
				$('.' + valueControlKey, model.dom).show();
			}else{
				$('.' + valueControlKey, model.dom).hide();
			}
		});	
	}
	
	var createValueBooleanControl = function(model){
		$('.valueBoolean', model.dom).selectivity({
			allowClear: true,
			items: [{"id":"true","text":KDApi.getLangMsg(model, 'yes')},{"id":"false","text":KDApi.getLangMsg(model, 'no')}]
		});
		
		//设置默认值
		$('.valueBoolean', model.dom).selectivity('value', "true");
		
		$('.valueBoolean', model.dom).off('change').on('change', function(e){
			if(e.target.className != "valueBoolean"){
				return;
			}
			setValue(model, $(this).selectivity('value'));
		});
	}
	
	//更新值
	var updateValue = function(model, value){
		if(model._type == "boolean"){
			$(".valueBoolean", model.dom).selectivity('value', value);
		}else{
			$("input:visible", model.dom).val(value);
		}
	}	
	
	var setValue = function(model, date){
		if(model.initing !== "true"){
			model.invokeCustomMethod("setValue", date);
		}		
	}	
	
    KDApi.register('targetresult', TargetResult, {isMulLang: true})
})(window.KDApi, jQuery)
