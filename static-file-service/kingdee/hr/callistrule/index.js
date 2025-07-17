(function(KDApi, $){
	var CSS_XUANZHONG = 'kdfont-fuxuankuangxuanzhong_fang';
	var CSS_WEIXUANZHONG = 'kdfont-fuxuankuangweixuanzhong_fang';
	var CSS_BUFENXUANZHONG = 'kdfont-fuxuankuang5';
	var CSS_OTHER = "theme-fc";
	
	var LOGIC_OR = ' or ';
	var LOGIC_AND = ' and ';
	var LOGIC_OR_EN = ' or ';
	var LOGIC_AND_EN = ' and ';
	var LEFT_BRACKET = ' ( ';
	var RIGHT_BRACKET = ' ) ';
	var valueControlList = ['valueParamSelectDiv', 'valueBooleanSelectDiv', 'valueTextDiv', 'valueNumberDiv', 'valueEnumSelectDiv', 'valueDateDiv'];
	var valueTypeMap = {"param" : "1", "value" : "2", "target" : "3"}
	
    function Condition (model) {
        this._setModel(model)
    }

    Condition.prototype = {
        _setModel: function(model) {
            this.model = model;
			this.model._conditionExpressList = new Array();
			model.pageDom = $("#" + model.pageId);
        },
        init: function(props){
            //选择js替换多语言
            var text = props.data && props.data.text || ''
            localStorage.setItem('noResults', text.noResults);
            initFunc(this.model, props)
        },
        update: function(props){
			updateFunc(this.model, props.data)
        },
        destoryed: function(){
        }
    }

    // Other Code
    var initFunc = function(model, props) {
        // KDApi.loadFile可以通过路径加载js或css文件，并且在html文件头生成script或者link标签，第一个参数是路径，第二个参数是model，第三个参数是加载完成后执行的回调函数		
		KDApi.loadFile(['./css/jquery-ui.min.css','./css/condition.css','./css/selectivity-jquery.css','./css/codemirror.css'], model, function(){
			KDApi.loadFile('./js/jquery-ui.min.js', model, function(){
				KDApi.loadFile('./js/selectivity-jquery.js', model, function () {
					KDApi.loadFile('./js/codemirror.js', model, function() {
						KDApi.loadFile('./js/customruleMode.js', model, function() {
                            // 后端插件通过setData传给前端的数据，前端可以通过data去获取
                            var text = props.data && props.data.text || ''

                            LOGIC_OR=' '+text.or+' ';
                            LOGIC_AND=' '+text.and+' ';
                            // 通过路径去获取html字符串，第一个参数是路径，第二个参数是model，第三个参数是HTML模板中变量的值
                            KDApi.getTemplateStringByFilePath('./html/condition.html', model, text).then(function(data) {
                                model.dom.innerHTML = data
                                //因为单选按钮的原因，不能写到html中
                                createConditionTypeRadio(model,props);
                                // 绑定DOM事件
                                initEvent(model, props)
								//初始化是异步可能会
                                if(model.initing != "true"){
                                    updateFunc(model,props.data)
                                }
                            })
						})
					})
				})
			})
		})
    }

    var updateFunc = function(model, data) {
        if(!(model.dom.innerHTML &&data)){
           return
        }

		model.initing = data.init;
		
		if(model.initing == "true"){
			model._defaultRows = data.defaultRows
			model._showDeleteOnlyOneRow = data.showDeleteOnlyOneRow;
			model._hideButton = data.hideButton;
			model._comparisonOptMap = data.comparisonOpt;
			model._containTarget = data.containTarget;
			hideButton(model);
			if(model._containTarget === false){
				$('.valueType option[value="3"]', model.dom).remove();
			}
		}
		if(data.conditionExpress){
			// 必须要在CodeMirror加载完成后，才初始化
			createConditionExpress(model, data);
		}
		if(data.param){					
			model._param = data.param;	
			model._valueParam = data.valueParam;
			
			clearCondition(model);//放到后面，初始化时需要用到param		
		}
		if(data.paramValue){
			updateTextValue(model, data.paramValue);
		}
		if(data.date && model.dateIndex){
			updateDateValue(model, data.date);			
			model.dateIndex = "";
		}				
		if(data.value){//这个要放最后，防止控件还没初始化完成
			initControl(model, JSON.parse(data.value));
		}
		if(data.clear){
			clearCondition(model);
		}
		if(data.pageState){
			model.pageState=data.pageState;
			changePageState(model, data.pageState);
		}
		model.initing = "false";
    }
	
	var changePageState = function(model, pageState){
		if(pageState.toLocaleLowerCase() == "view"){//查看态
			$(".conditionParam:not(:first)", model.dom).selectivity('setOptions', { readOnly: true })
			$(".comparisonOpt:not(:first)", model.dom).attr("disabled", true)
			$(".valueType:not(:first)", model.dom).attr("disabled", true)
			//显示的输入框的值都禁用
			$(".valueTd select:visible", model.dom).attr("disabled", true)
			$(".valueTd input:visible", model.dom).attr("readonly", true)
            $(".valueEnumText:visible",model.dom).attr("disabled",true);
			$(".valueParam:visible", model.dom).selectivity('setOptions', { readOnly: true })
			$(".copyTd:not(:first)", model.dom).hide();
			$(".deleteTd:not(:first)", model.dom).hide();
			$(".deleteTh", model.dom).hide();
			$("#addCondition", model.dom).hide();
			$(".conditionValueSearch", model.dom).hide();
            $(".valueText").css("padding-right","0px");

            $(".selectivity-single-selected-item", model.dom).css("color","#808080");
			$(".selectivity-single-result-container", model.dom).css("cursor","default");
			$(".valueText", model.dom).css("color","#808080");
            $(".valueTd input:visible", model.dom).css("color","#808080");
			$(".selectivity-caret", model.dom).hide();
			$(".kdfont-riqixuanze", model.dom).hide();
			
			$("input[type='radio']", model.dom).attr("disabled", true)
			$("#expressDiv button",model.dom).hide();
			setOption(model, "readOnly", true);
			//查看界面不需要演示预览
			//$(".expressView",model.dom).hide();

			//取消拖动
			$( "#ruleCondition", model.dom).sortable("disable");			
		}else{//编辑态
			$(".conditionParam:not(:first)", model.dom).selectivity('setOptions', { readOnly: false })
			$(".comparisonOpt:not(:first)", model.dom).attr("disabled", false)
			$(".valueType:not(:first)", model.dom).attr("disabled", false)
			//显示的输入框的值都启用
			$(".valueTd select:visible", model.dom).attr("disabled", false)
			$(".valueTd input:visible", model.dom).attr("readonly", false)
            $(".valueEnumText:visible",model.dom).attr("disabled",false);
            $(".valueParam:visible", model.dom).selectivity('setOptions', { readOnly: false })
			$(".copyTd:not(:first)", model.dom).show();
			changeDeleteButton(model);
			hideButton(model);
			
			$("#ruleCondition tr:not(:first)", model.dom).each(function(){
				showValueSearch(model, $(this));
			});
            $("#ruleCondition tr:not(:first)", model.dom).each(function(){
                disableParamTypeAndValueControl(model, $(this));
            });
			$(".selectivity-single-selected-item", model.dom).css("color","#000000");
			$(".selectivity-single-result-container", model.dom).css("cursor","pointer");
			$(".valueText", model.dom).css("color","#000000");
            $(".valueTd input:visible", model.dom).css("color","#000000");
			$(".selectivity-caret", model.dom).show();
			$(".kdfont-riqixuanze", model.dom).show();
			
			$("input[type='radio']", model.dom).attr("disabled", false);
			$("#expressDiv button",model.dom).show();
			setOption(model, "readOnly", false);
			$(".expressView",model.dom).show();
			
			$( "#ruleCondition", model.dom).sortable("enable");

		}
	}
	
	var hideButton = function(model){
		//隐藏按钮
		if(model._hideButton){
			$("#addCondition", model.dom).hide();
		}else{
			$("#addCondition", model.dom).show();
		}
	}
	
	var clearCondition = function(model){	
		$('#ruleCondition tr:not(:first):not(#templeteTr)', model.dom).remove();
		model._conditionExpressList=new Array();		
		
		if(model._defaultRows){
			addConditionRows(model, model._defaultRows);
		}
	}
	
	var getAllOption4Select = function(model, selectName){
		var ret = new Array();
		$("#templeteTr ."+selectName+" option", model.dom).each(function(){
			ret.push($(this).val());
		});
		return ret;
	}
	
	var createConditionTypeRadio = function(model,props){
		var html = "<div class='conditionTypeDiv'><label><input type='radio' name='conditionType" + model.pageId + "' value='0' checked>{{FitAllCondition}}</label></div>"
			+ "<div class='conditionTypeDiv'><label><input type='radio' name='conditionType" + model.pageId + "' value='1'>{{JustFitOne}}</label></div>"
			+ "<div class='conditionTypeDiv'><label><input type='radio' name='conditionType" + model.pageId + "' value='2'>{{CustomCondition}}</label></div>";
        html=KDApi.getHTMLStringBytemplate(html, props.data.text)
		$("#conditionTypeRadioDiv", model.dom).append(html);	
	}
	
	var initControl = function(model, data){
		//插入条件
		insertCondition(model, data.conditionList);
		//初始化逻辑连接符
		$("input[name='conditionType" + model.pageId + "'][value='" + data.conditionExpressType + "']", model.dom).attr('checked','true');
		
		//初始化逻辑表达式
		model._conditionExpressList = data.conditionExpressList || new Array();
		updateConditionExpress(model);
	}

    var disableParamTypeAndValueControl = function(model, $tr){
		var value = $tr.find(".comparisonOpt").val();
		if("is_not_null" == value || "is_null" == value || /^[+-]*\dd$/.test(value) || /^[+-]*\dw$/.test(value)
			|| /^[+-]*\dm$/.test(value) || /^[+-]*\dq$/.test(value) || /^[+-]*\dp$/.test(value) || /^[+-]*\dy$/.test(value)
			|| /^[+-]*\d+~[+-]*\dm$/.test(value) || "<=0d" == value || ">=0d" == value){
			disableInputValue(model, $tr);
		}
    }
	
	var disableInputValue = function(model, $tr){
        $tr.find(".valueType").val(0).attr("disabled",true);
        if($tr.find(".valueParam .selectivity-single-select").length > 0){
            $tr.find(".valueParam").selectivity('value', '').selectivity("setOptions",{"readOnly":true});
        }
        $tr.find(".valueEnumText").val('').attr("disabled",true);
        $tr.find(".valueBoolean").val('').attr("disabled",true);
        $tr.find(".valueNumber").val('').attr("disabled",true);
        $tr.find(".valueText").val('').attr("readonly",true);
        $tr.find(".valueDate").val('').attr("disabled",true);
        $tr.find(".value").val('');
        $tr.find(".displayValue").val('');

        $tr.find(".valueDateDiv").off('click');
        showNumberDiv(model, $tr);
	}
	
	var enableInputValue = function(model, $tr){
        $tr.find(".valueType").attr("disabled",false);
        if(!$tr.find(".valueType").val()){
            $tr.find(".valueType").val("2").change()
		}
        if($tr.find(".valueParam .selectivity-single-select").length > 0){
            $tr.find(".valueParam").selectivity("setOptions",{"readOnly":false});
        }
        $tr.find(".valueEnumText").attr("disabled",false);
        //$tr.find(".valueEnum").get(0).selectedIndex=0;
        $tr.find(".valueBoolean").val("true").attr("disabled",false);
        $tr.find(".valueNumber").attr("disabled",false);
        $tr.find(".valueText").attr("readonly",false);
        showValueSearch(model, $tr);

        bindDateControl(model,$tr)
	}

	var bindDateControl=function(model, $tr){
        $(".valueDateDiv", $tr).off('click').on('click', function(){
            model.dateIndex = $(this).parent().parent().index();
            if(!model.pageState||model.pageState.toLocaleLowerCase()== "view"){
                return;
            }
            $("#ruledate", $("#" + model.pageId)).find("input").attr("readonly","readonly");
            var top = $(this).offset().top;
            var left = $(this).offset().left;

            $("#ruledate", $("#" + model.pageId)).css("position", "fixed");
            $("#ruledate", $("#" + model.pageId)).css("top", top);
            $("#ruledate", $("#" + model.pageId)).css("left", left);
            $("#ruledate", $("#" + model.pageId)).find("input").click();
            var pageHeight=$(document).height();


            /*var interval = setInterval(function(){
                if($(".j-left").length > 0){
                    var height= $(".j-left").height();
                    if(pageHeight<(top+height)){
                        $(".j-left").parent().css("top", (top-28-height))
                        $(".j-left").parent().css("left", left)
                        $(".j-left").attr("id", model.pageId + "date")
                    }else{
                        $(".j-left").parent().css("top", top)
                        $(".j-left").parent().css("left", left)
                        $(".j-left").attr("id", model.pageId + "date")

                    }
                    clearInterval(interval);
                }
            }, 50);*/
        });
    }
	
	var getConditionDisplayParamValue = function(model, $tr){
		return $tr.find(".conditionParam").selectivity('data') && $tr.find(".conditionParam").selectivity('data').text;
	}
	
	var getConditionParamValue = function(model, $tr){
		return $tr.find(".conditionParam").selectivity('value');
	}
	
	var getConditionParamType = function(model, $tr){
		return $tr.find(".conditionParam").selectivity('data') && $tr.find(".conditionParam").selectivity('data').type;
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
		return $tr.find(".conditionParam").selectivity('data') && $tr.find(".conditionParam").selectivity('data').isadminorg ===  "true";
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
		var paramType = getConditionParamType(model, $tr);
		if(paramType == "boolean"){
			return;
		}
		if(paramType == "date"&& ($tr.find(".valueType").val() != "1")) {
            if ("<dom" == value || ">dom" == value || "<=dom" == value || ">=dom" == value) {
                clearValue(model, $tr)
                showNumberDiv(model, $tr)
            }else{
                clearValue(model, $tr)
                showDateDiv(model, $tr)
			}
        }
		
		// 天（/^[+-]*\dd$/）、周（/^[+-]*\dw$/）、月（/^[+-]*\dm$/）、季度（/^[+-]*\dq$/）、年（/^[+-]*\dy$/）
		// 过去/未来3个月（/^[+-]*\d+~[+-]*\dm$/）、小于等于今天（<=0d）、大于等于今天（>=0d）
		if("is_not_null" == value || "is_null" == value || /^[+-]*\dd$/.test(value) || /^[+-]*\dw$/.test(value)
			 || /^[+-]*\dm$/.test(value) || /^[+-]*\dq$/.test(value)|| /^[+-]*\dp$/.test(value) || /^[+-]*\dy$/.test(value)
			 || /^[+-]*\d+~[+-]*\dm$/.test(value) || "<=0d" == value || ">=0d" == value){
			disableInputValue(model, $tr);
		}else{
			var mysel = $tr.find(".comparisonOpt");
			var oldvalue = mysel.data("last");//这次改变之前的值
			mysel.data("last", mysel.val()); //每次改变都附加上去，以便下次变化时获取
			var newvalue = mysel.val();

            if(isAdminOrg4ParamType(model, $tr) && (newvalue == "is_or_isSub"||newvalue == "not_and_notSub")){
                $tr.find(".valueType").val("2").change();
                $tr.find(".valueType option[value='1']").hide();
            }else{
                $tr.find(".valueType option[value='1']").show();
            }

			if(paramType == "dynamicObject" || isEnum4ParamType(model, $tr)){//object类型多选切换成单选时，清空value值
				if((oldvalue == "==" || oldvalue == "!=" || oldvalue == "is_or_isSub" || oldvalue == "not_and_notSub") && (newvalue == "in" || newvalue == "not_in")){
					clearValue(model, $tr);
				}
				if((newvalue == "==" || newvalue == "!=" || newvalue == "is_or_isSub" || oldvalue == "not_and_notSub") && (oldvalue == "in" || oldvalue == "not_in")){
					clearValue(model, $tr);
				}
			}
			enableInputValue(model, $tr);			
		}	
	}
	
	var showValueSearch = function(model, $tr){
		//显示搜索框（参数类型为object，值类型为值；值类型为指标）
		var paramType = getConditionParamType(model, $tr);
		
		var valueType = $tr.find(".valueType option:selected").val();
		if((paramType == 'dynamicObject' && valueType == valueTypeMap.value) || valueType == valueTypeMap.target){
			$tr.find(".conditionValueSearch").show();
            $tr.find(".valueText").css("padding-right","24px");
			$(".conditionValueSearch", $tr).off('click').on('click', function(){
				var $tr = $(this).parent().parent().parent();
				var index = $tr.index();//从1开始
				var valueType = $tr.find(".valueType").val();
				if(valueType == valueTypeMap.value){//值
                    var opt = $tr.find(".comparisonOpt").val();
                    var isMulti = opt == "==" || opt == "!=" ? false : true;//下级支持多选 || opt == "is_or_isSub"
                    model.invoke("openParamF7", {entityNumber : getConditionParamValue(model, $tr), index : index, isMulti : isMulti});
				}else if(valueType == valueTypeMap.target){//指标
					model.invoke("openTargetF7", {paramType : getConditionParamType(model, $tr), index : index});	
				}			
			});
			
			$tr.find(".valueText").attr("readonly", true);
		}else{
			$tr.find(".conditionValueSearch").hide();
            $tr.find(".valueText").css("padding-right","0px");
            $tr.find(".conditionValueSearch").off('click');
			$tr.find(".valueText").attr("readonly", false);
		}
	}
	
	var getNextConditionName = function(model){
		var max = 0;
		$("#ruleCondition", model.dom).find(".name:not(:first)").each(function(i){	
			var temp = parseInt($(this).html().replace("T", ""));
			if(temp > max){
				max = temp;
			}
		});
		max = max+1;
		return max < 10 ? "T0" + max : "T" + max;	
	}
	
	var updateConditionExpressListName = function(model){
		$("#ruleCondition", model.dom).find(".name:not(:first)").each(function(i){			
			model._conditionExpressList[i].name = $(this).html();
		});
		updateConditionExpress(model);
	}
	
	//事件绑定
    var initEvent = function(model, props){
		$("#ruleCondition", model.dom).sortable({  
			cursor: "move",  
			items: "tr",                       //只是tr可以拖动  
			opacity: 1.0,                      //拖动时，透明度为0.6  
			revert: false,                      //释放时，增加动画  
			update: function(event, ui) {      //更新排序之后  
				var categoryids = $(this).sortable("toArray");  
				var $this = $(this);  
				//更新expressList
				//updateConditionExpressListName(model);
			}  
		});  
		$("#ruleCondition", model.dom).disableSelection(); 
		
		$(model.dom).on('keydown', '.valueDate:not(:first)', function(e){
			return false;
		});		
		
		//比较符改变（主要是日期类型需要做特殊处理）
		$(model.dom).on('change', '.comparisonOpt:not(:first)', function(){
			comparisonOptChangeEvent(model, $(this).parent().parent(), $(this).val());
			conditionJsonChange(model);
		});

        $("#kd-theme").on("click", '#' + model.pageId + "date td div[data-value]", function(){
            setTimeout(function(){
                $("#ruledate", model.pageDom).find("input").blur();
            }, 100);
        })

        //值类型改变时，需要显示/隐藏值控件
		$(model.dom).on('change', '.valueType:not(:first)', function(){		
			var $tr = $(this).parent().parent();	
			clearValue(model, $tr);

            var opt = $tr.find(".comparisonOpt").val();
			var valueType = $(this).val();
			if(valueType == valueTypeMap.param){//参数
				showParamSelectDiv(model, $tr);
			}else if(valueType == valueTypeMap.value){//值	
				var paramType = getConditionParamType(model, $tr);
				if(paramType == 'boolean'){					
					showBooleanSelectDiv(model, $tr);
				}else if(isEnum4ParamType(model, $tr)){//枚举和boolean应该是不能切换的，先放着
					showEnumSelectDiv(model, $tr);
				}else if(paramType == 'date'){
                    if("<dom" == opt || ">dom" == opt || "<=dom"== opt || ">=dom"== opt){
                        showNumberDiv(model, $tr);
                    }else{
                        showDateDiv(model, $tr);
					}
				}else if(paramType == 'number'){
					showNumberDiv(model, $tr);
				}else{
					showTextDiv(model, $tr);
				}				
			}else if(valueType == valueTypeMap.target){//指标
				showTextDiv(model, $tr);
			}

			conditionJsonChange(model);			
        })
		
		$(model.dom).on('change', '.valueBoolean:not(:first)', function(){	
			setValue(model, $(this).parent().parent(), $(this).find("option:selected").html(), $(this).val());
		})
		
		//$(model.dom).on('change', '.valueEnum:not(:first)', function(){	
		//	setValue(model, $(this).parent().parent(), $(this).find("option:selected").html(), $(this).val());
		//})
		
		$(model.dom).on('click', '.valueEnumText:not(:first)', function(e){	
			var $tr = $(this).parent().parent().parent();
			var isOld = $tr.index() == $(".multiDropDownControl", model.dom).attr("index");
			$(this).attr("index", $tr.index());	
			
			if(!isOld || $(".multiDropDownControl", model.dom).is(":hidden")){// 点击其他枚举控件时或者未显示下拉，展示下拉			
				if($tr.find(".comparisonOpt").val() == ""){//如果未选择比较符，隐藏下拉
					$(".multiDropDownControl", model.dom).hide();
					e.stopPropagation();
					return;
				}
				
				createValueEnumControl(model, $tr, $(this).css("width"));
				//能够选择全枚举
                var pageHeight=$(document).height();
				var top = $(this).offset().top + 28;
                var left = $(this).offset().left;

                $(".multiDropDownControl", model.dom).css("top", top).css("left", left).attr("index", $tr.index()).show();
				//弹框显示不全的问题
                var height= $(".j-right",model.dom).height();
                if(pageHeight<(top+height)){
                    top=top-28-height
                    $(".multiDropDownControl", model.dom).css("top", top).show();
                }
			}else{
				$(".multiDropDownControl", model.dom).hide();
			}
		})
		
		$(document).on("click", function(e){
            //点击id为menu之外的元素，则触发        
            if($(e.target).closest("#multiDropDownControl").length == 0 && !$(e.target).hasClass("valueEnumText")){
                $(".multiDropDownControl", model.dom).hide();
            }
        })
		
		$(model.dom).on('click', '.multiDropDownControl li.HrRaujUh', function(){
			var index = $(".multiDropDownControl", model.dom).attr("index");
			var $tr = $("#ruleCondition tr:eq(" + index + ")", model.dom);
			var displayValue = $(this).find("._29ItSKLv").html();
			
			if($tr.find(".comparisonOpt").val() == "==" || $tr.find(".comparisonOpt").val() == "!="){
				var value = $(this).find("._29ItSKLv").attr('value');
				$tr.find(".valueEnumText").val(displayValue);
				setValue(model, $tr, displayValue, value);
				$(".multiDropDownControl", model.dom).hide();
			}else{
				var value = $(this).find("input[type='checkbox']").val();
				if($(this).find("._2SDEtkdF").hasClass(CSS_WEIXUANZHONG)){//选中
					//枚举值修改
					var newDisplayValue = $tr.find(".valueEnumText").val() ? $tr.find(".valueEnumText").val() + "," + displayValue : displayValue;
					var newValue = $tr.find(".value").val() ? $tr.find(".value").val() + "," + value : value;
					$tr.find(".valueEnumText").val(newDisplayValue);
					setValue(model, $tr, newDisplayValue, newValue);
					//复选框选中
					$(this).find("._2SDEtkdF").removeClass(CSS_WEIXUANZHONG).addClass(CSS_OTHER).addClass(CSS_XUANZHONG);
					//已选值加1
					var $selectedNumber = $(".multiDropDownControl ._1dE_uwAW>span", model.dom);
					var selectedNumber = parseInt($selectedNumber.html()) + 1;
					$selectedNumber.html(selectedNumber);
					//如果是第一次选择，修改样式
					if($("._3NkTlfWy", model.dom).hasClass(CSS_WEIXUANZHONG)){
						$("._3NkTlfWy", model.dom).removeClass(CSS_WEIXUANZHONG).addClass(CSS_OTHER).addClass(CSS_BUFENXUANZHONG);
					}
					//如果是最后一个选中的，修改全选样式
					if(selectedNumber == $(this).parent().children().length){
						$("._3NkTlfWy", model.dom).removeClass(CSS_BUFENXUANZHONG).addClass(CSS_XUANZHONG);
					}
				}else{//取消选中
					//枚举值修改
					var newDisplayValue = $tr.find(".valueEnumText").val() == displayValue ? "" : $tr.find(".valueEnumText").val().replace(displayValue+',','').replace(','+displayValue,'');
					var newValue = $tr.find(".value").val() == value ? "" : $tr.find(".value").val().replace(value+',','').replace(','+value,'');
					$tr.find(".valueEnumText").val(newDisplayValue);
					setValue(model, $tr, newDisplayValue, newValue);
					//复选框反选
					$(this).find("._2SDEtkdF").removeClass(CSS_XUANZHONG).removeClass(CSS_OTHER).addClass(CSS_WEIXUANZHONG);
					//已选值减1
					var $selectedNumber = $(".multiDropDownControl ._1dE_uwAW>span", model.dom);
					var selectedNumber = parseInt($selectedNumber.html()) - 1;
					$selectedNumber.html(selectedNumber);
					//如果是全选时第一次反选，修改样式
					if($("._3NkTlfWy", model.dom).hasClass(CSS_XUANZHONG)){
						$("._3NkTlfWy", model.dom).removeClass(CSS_XUANZHONG).addClass(CSS_BUFENXUANZHONG);
					}
					//如果是最后一个反选的，修改全选样式
					if(selectedNumber == 0){
						$("._3NkTlfWy", model.dom).removeClass(CSS_BUFENXUANZHONG).removeClass(CSS_OTHER).addClass(CSS_WEIXUANZHONG);
					}
				}
			}			
		})
		
		//下拉全选事件
		$(model.dom).on('click', '.multiDropDownControl ._1IQJn1P-', function(){
			if($(this).children("._3NkTlfWy").hasClass(CSS_WEIXUANZHONG)){//未选中->全选中
				$(this).children("._3NkTlfWy").removeClass(CSS_WEIXUANZHONG).addClass(CSS_OTHER).addClass(CSS_XUANZHONG);
				$('.multiDropDownControl ._2SDEtkdF', model.dom).removeClass(CSS_WEIXUANZHONG).addClass(CSS_OTHER).addClass(CSS_XUANZHONG);					 
				$(this).parent().find("._1dE_uwAW>span").html($(".multiDropDownControl li", model.dom).length);
			}else{//全选中/部分选中->未选中
				$(this).children("._3NkTlfWy").removeClass(CSS_BUFENXUANZHONG).removeClass(CSS_XUANZHONG).removeClass(CSS_OTHER).addClass(CSS_WEIXUANZHONG);
				$('.multiDropDownControl ._2SDEtkdF', model.dom).removeClass(CSS_BUFENXUANZHONG).removeClass(CSS_XUANZHONG).removeClass(CSS_OTHER).addClass(CSS_WEIXUANZHONG);				
				$(this).parent().find("._1dE_uwAW>span").html(0);
			}
		})
		
		$(model.dom).on('blur', '.valueNumber:not(:first)', function(){
			var value = $(this).val();
			value.replace(/^0*/, "").replace(/^0*\./, "0.");
			$(this).val(value)
			setValue(model, $(this).parent().parent(), value, value);
		})
		
		$(model.dom).on('blur', '.valueText:not(:first)', function(){
            var readonly=$(this).attr("readonly");
            if(!readonly){
                setValue(model, $(this).parent().parent(), $(this).val(), $(this).val());
            }
		})
		
		//点击复制
		$(model.dom).on('click', '.copy:not(:first)', function(){
			model.copy = true;
			var $tr = $(this).parent().parent();
			var $tr2 = $tr.clone();
            $('#ruleCondition', model.dom).append($tr2);

            createParamControl(model, $tr2);
			$tr2.find(".conditionParam").selectivity('value', $tr.find(".conditionParam").selectivity('value'));
			$tr2.find(".comparisonOpt").val($tr.find(".comparisonOpt").val());
			$tr2.find(".valueType").val($tr.find(".valueType").val());
			if($tr.find(".valueParam .selectivity-single-select").length > 0){
				createValueParamControl(model, $tr2);
				$tr2.find(".valueParam").selectivity('value', $tr.find(".valueParam").selectivity('value'));
			}
			$tr2.find(".valueBoolean").val($tr.find(".valueBoolean").val());
			$tr2.find(".valueEnumText").val($tr.find(".valueEnumText").val());
			$tr2.find(".valueDate").val($tr.find(".valueDate").val());
			$tr2.find(".valueNumber").val($tr.find(".valueNumber").val());
			$tr2.find(".valueText").val($tr.find(".valueText").val());
			$tr2.find(".displayValue").val($tr.find(".displayValue").val());
			$tr2.find(".value").val($tr.find(".value").val());
			
			var name = getNextConditionName(model);			
			$tr2.find(".name").html(name);
			model._conditionExpressList.push({name:name});
			updateConditionExpress(model);  
			
			changeDeleteButton(model);
			model.copy = false;


			//日期控件复制的时候 没有绑定点击事件
            var value = $tr.find(".comparisonOpt").val();
            if("is_not_null" == value || "is_null" == value || /^[+-]*\dd$/.test(value) || /^[+-]*\dw$/.test(value)
                || /^[+-]*\dm$/.test(value) || /^[+-]*\dq$/.test(value)|| /^[+-]*\dp$/.test(value) || /^[+-]*\dy$/.test(value)
                || /^[+-]*\d+~[+-]*\dm$/.test(value) || "<=0d" == value || ">=0d" == value) {

            }else{
                enableInputValue(model,$tr2);
			}
        })
		
		//点击删除
		$(model.dom).on('click', '.delete:not(:first)', function(){
			$tr = $(this).parent().parent();
			var index = $tr.index();//从1开始,先获取index，再remove
			var name=$tr.find(".name").html();
			$tr.closest("tr").remove();
			

            model._conditionExpressList = $.grep(model._conditionExpressList, function(value) {
                return value.name != name;
            });
			//最后一个条件是没有逻辑的
            model._conditionExpressList[model._conditionExpressList.length-1].logical="";

			updateConditionExpress(model);      
			
			changeDeleteButton(model);
        })
		
		$('#addCondition', model.dom).click(function(){
            addConditionRows(model, 1);
        })
		
		$('.expressView', model.dom).click(function(){
			model.invoke("openExpressView");
        });
		
		$('#and', model.dom).click(function(){
			insertEditorValue(model, LOGIC_AND);
        })
		
		$('#or', model.dom).click(function(){
            insertEditorValue(model, LOGIC_OR);
        })

		$('#leftBracket', model.dom).click(function(){
            insertEditorValue(model, LEFT_BRACKET);
        })
		
		$('#rightBracket', model.dom).click(function(){
            insertEditorValue(model, RIGHT_BRACKET);
        })

        //逻辑连接符改变时
		$("input[name='conditionType" + model.pageId + "']", model.dom).change(function(){
			var conditionType = $("input[name='conditionType" + model.pageId + "']:checked", model.dom).val();
			if(conditionType == 0 || conditionType == 1){
				var logical=LOGIC_AND_EN;
				if(conditionType == 1){
                    logical=LOGIC_OR_EN;
				}
                model._conditionExpressList=new Array();
                $("#ruleCondition", model.dom).find(".name:not(:first)").each(function(i){
                	var name=$(this).html();
                    model._conditionExpressList.push({name:name,logical:logical});
                });
                var expressList=model._conditionExpressList;
                expressList[expressList.length-1].logical='';
                $("#expressDiv", model.dom).hide();
			}else{
				$("#expressDiv", model.dom).show();
			}
			
			updateConditionExpress(model);
			
			//conditionJsonChange(model);
        });	
    }
	
	var changeDeleteButton = function(model){
		if(model._showDeleteOnlyOneRow || $("#ruleCondition tr:not(:first)", model.dom).length > 1){
			$(".deleteTd", model.dom).show();
			$(".deleteTh", model.dom).show();
		}else{
			$(".deleteTd", model.dom).hide();
			$(".deleteTh", model.dom).hide();
		}
	}
	
	var setValue = function(model, $td, displayValue, value){
		$td.find(".displayValue").val(displayValue);
		$td.find(".value").val(value);
		
		conditionJsonChange(model);
	}
	
	var clearValue = function(model, $tr){	    
		if($tr.find(".valueParam .selectivity-single-select").length > 0){
			$tr.find(".valueParam").selectivity('value', '');
		}
		
		$tr.find(".valueBoolean").val('');
		$tr.find(".valueNumber").val('');
		$tr.find(".valueDate").val('');
		$tr.find(".valueEnumText").val('');
		
		$tr.find(".valueText").val('');
		$tr.find(".displayValue").val('');
		$tr.find(".value").val('');
	}
	
	var conditionJsonChange = function(model){
		if(model.initing !== "true"){
			var conditionJson = JSON.stringify(getConditionContrlJson(model));
			console.log(conditionJson);
			model.invoke("setValue", conditionJson);
		}
	}
	
	var insertCondition = function(model, conditionList){
		if(conditionList && conditionList.length > 0){
			$('#ruleCondition tr:not(:first)', model.dom).remove();
			for(var i=0;i<conditionList.length;i++){
				var $tr = $('#templeteTr', model.dom).clone().removeAttr('id').show();
				$('#ruleCondition', model.dom).append($tr);				
				createParamControl(model, $tr);
			}
			changeDeleteButton(model);
			
			$.each(conditionList, function(i, conditionObj){
				var index = conditionObj.index + 1;
				$tr = $('#ruleCondition tr', model.dom).eq(index);
				$tr.find(".name").html(conditionObj.name);				
				
				/*if("is_or_isSub" == conditionObj.operators){
					//行政组织并且比较符是包含下级时，org.number修改为org.id,不然参数控件无法反写
					conditionObj.param = conditionObj.param.substring(0, conditionObj.param.lastIndexOf('.') + 1) + "id";			
					$tr.find(".value").data("number", conditionObj.value);					
				}*/
				$tr.find(".conditionParam").selectivity('value', conditionObj.param);
				
				var paramType = conditionObj.paramType;
				//初始化比较符控件并赋值
				createComparisonOptControl(model, $tr);
				$tr.find(".comparisonOpt").val(conditionObj.operators)
				comparisonOptChangeEvent(model, $tr, conditionObj.operators);
				
				//更新值类型
				$tr.find(".valueType").val(conditionObj.valueType)
				if(conditionObj.valueType == valueTypeMap.param){//参数
					//显示下拉
					showParamSelectDiv(model, $tr);
					$tr.find(".valueParam").selectivity('value', conditionObj.value);
				}else if(conditionObj.valueType == valueTypeMap.value){//值
					//参数初始化时，已经初始化了值控件，故不需要再显示
					if(paramType == "boolean"){
						$tr.find(".valueBoolean").val(conditionObj.value);						
					}else if(isEnum4ParamType(model, $tr)){
						$tr.find(".valueEnumText").val(conditionObj.displayValue);						
					}else if(paramType == "date"){
						var value=conditionObj.operators;
                        if ("<dom" == value || ">dom" == value || "<=dom" == value || ">=dom" == value) {
                            $tr.find(".valueNumber").val(conditionObj.value);
                        }else{
                            $tr.find(".valueDate").val(conditionObj.value);
                        }
					}else if(paramType == "number"){
						$tr.find(".valueNumber").val(conditionObj.value);
					}else{
						$tr.find(".valueText").val(conditionObj.displayValue);
					}	
				}else if(conditionObj.valueType == valueTypeMap.target){//指标
					showTextDiv(model, $tr);
					$tr.find(".valueText").val(conditionObj.displayValue);
					//$tr.find(".valueText").data("type", conditionObj.valueRealyType);
				}
				
				$tr.find(".displayValue").val(conditionObj.displayValue)
				$tr.find(".value").val(conditionObj.value)
			});
		}
	}
	
	var addConditionRows = function(model, rows){
		for (var i = 0; i < rows; i++) {
			var tn = getNextConditionName(model);	
		
			var $tr = $('#templeteTr', model.dom).clone().removeAttr('id').show();
			$tr.find(".name").html(tn);
			$('#ruleCondition', model.dom).append($tr);			
			
			createParamControl(model, $tr);
			
			model._conditionExpressList.push({name:tn});		
			
			updateConditionExpress(model);
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
	
	var showParamSelectDiv = function(model, $tr){
		showControl(model, $tr, 'valueParamSelectDiv');
		createValueParamControl(model, $tr);
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
	}
	
	var showEnumSelectDiv = function(model, $tr){
		showControl(model, $tr, 'valueEnumSelectDiv');
	}
	
	var showDateDiv = function(model, $tr){
		showControl(model, $tr, 'valueDateDiv');
	}
	
	var contains = function(model, express, n){
        if($(".name:not(:first)", model.dom).eq(n) && express.indexOf($(".name:not(:first)", model.dom).eq(n).html()) != -1){
            return true;
        }
        return false;
    }

    var getExpressObj = function(logical, express){
        var name = express.replaceAll("(",'').replaceAll(")",'').replaceAll(' ','');
        var bracket = express.split(name);
        var leftBracket = bracket[0] || '';
        var rightBracket = bracket[1] || '';
        var conditionExpressObject={name:name,logical:logical,leftBracket:leftBracket,rightBracket:rightBracket};
        return conditionExpressObject;
    }
	
	//只更新conditionExpressList
	var updateConditionExpressList = function(model){
		var conditionExpress = getEditorValue(model);
        model._conditionExpressList=new Array();
        var _conditionExpressList = model._conditionExpressList;
		var index_or = conditionExpress.indexOf(LOGIC_OR);
		var index_and = conditionExpress.indexOf(LOGIC_AND);	
		var n=0;
		for(var i=0;index_or >= 0 || index_and >= 0;i++){
			if(index_or == 0){
				conditionExpress = conditionExpress.substring(LOGIC_OR.length);
                var logical = LOGIC_OR_EN;
                _conditionExpressList.push(getExpressObj(logical, express));
			}else if(index_and == 0){
				conditionExpress = conditionExpress.substring(LOGIC_AND.length);
                var logical = LOGIC_AND_EN;
                _conditionExpressList.push(getExpressObj(logical, express));
			}else if(0 < index_or && (index_or < index_and || index_and == -1)){//|在前
				var express = conditionExpress.substring(0, index_or);
				var logical = LOGIC_OR_EN;
				_conditionExpressList.push(getExpressObj(logical, express));
				conditionExpress = conditionExpress.substring(index_or + LOGIC_OR.length);
			}else if(0 < index_and && (index_and < index_or || index_or == -1)){//&在前
				var express = conditionExpress.substring(0, index_and);
                var logical = LOGIC_AND_EN;
                _conditionExpressList.push(getExpressObj(logical, express));
				conditionExpress = conditionExpress.substring(index_and + LOGIC_AND.length);
			}
			index_or = conditionExpress.indexOf(LOGIC_OR);
			index_and = conditionExpress.indexOf(LOGIC_AND);
		}
        if(conditionExpress){
            _conditionExpressList.push(getExpressObj('', conditionExpress));
        }
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
		
		setEditorValue(model, conditionExpressStr.replaceAll(LOGIC_AND_EN,LOGIC_AND).replaceAll(LOGIC_OR_EN,LOGIC_OR), false);
	}
	
	//创建参数控件
	var createParamControl = function(model, $tr){
		var dom = $tr || model.dom;
		$('.conditionParam', dom).selectivity({
			allowClear: true,
			items: model._param
		});
		
		//参数改变时，初始化比较符（可以优化，比较参数类型是否改变）
		$('.conditionParam', dom).off('change').on('change', function(){
			if(model.copy){
				return;
			}
			
			var $tr = $(this).parent().parent();
			clearValue(model, $tr);

			var paramType = getConditionParamType(model, $tr);
			if($tr.find(".valueType").val() == "1"){
				createValueParamControl(model, $tr);
			}else if($tr.find(".valueType").val() == "2"){				
				if(paramType == 'boolean'){	
					showBooleanSelectDiv(model, $tr);
				}else if(isEnum4ParamType(model, $tr)){
					showEnumSelectDiv(model, $tr);
				}else if(paramType == 'date'){
					showDateDiv(model, $tr);
				}else if(paramType == 'number'){
					showNumberDiv(model, $tr);
				}else{
					showTextDiv(model, $tr);
				}
			}
			
			createComparisonOptControl(model, $tr);	
			
			conditionJsonChange(model);
		});
	}
	
	//创建比较符控件
	var createComparisonOptControl = function(model, $tr){
		var type = getConditionParamType(model, $tr);
		var isTarget = isTarget4ParamType(model, $tr);
		if(type != "boolean" && isEnum4ParamType(model, $tr)){
			type = "enum";
		}else if(isAdminOrg4ParamType(model, $tr)){
			type = "adminorg";
		}
		
		$tr.find(".comparisonOpt").html('');//清空
		$.each(model._comparisonOptMap[type], function(i, comparisonOperator){
			if(!isTarget || (isTarget && (comparisonOperator.value != "is_null" || comparisonOperator.value != "is_not_null"))){
				$tr.find(".comparisonOpt").append("<option value='" + comparisonOperator.value + "'>" + comparisonOperator.name + "</option>");
			}
		});
		enableInputValue(model, $tr);
	}
	
	//创建值参数控件
	var createValueParamControl = function(model, $tr){
		var dom = $tr || model.dom;
		var type = getConditionParamType(model, $tr);
		$('.valueParam', dom).selectivity({
			allowClear: true,
			items: model._valueParam[type] || null
		});

		//参数改变时，初始化比较符（可以优化，比较参数类型是否改变）
		$('.valueParam', dom).off('change').on('change', function(){		
			if(model.copy){
				return;
			}
			
			var displayValue = $(this).selectivity('data') && $(this).selectivity('data').text || $(this).selectivity('value');
			setValue(model, $(this).parent().parent(), displayValue, $(this).selectivity('value'));			
			conditionJsonChange(model);
		});
	}
	
	var createValueEnumControl = function(model, $tr, width){
		$(".multiDropDownControl", model.dom).html('');
		var enumList = JSON.parse(getConditionEnumList(model, $tr));		
		var value = $tr.find(".value").val();
						
		var html = '<div class="_3ak_aqbF _1osxfpCo undefined j-right" style="min-width: 210.656px; max-width: 600px; width:' + width + ';">';
		if($tr.find(".comparisonOpt").val() == "==" || $tr.find(".comparisonOpt").val() == "!="){//单选
			html+='<ul class="_3amG2q1H">';
			$.each(enumList,function(i, obj){
				html+='<li class="kd-hover primary-text-in-light HrRaujUh">'
						+'<span title="' + obj.name.zh_CN + '" value="' + obj.value + '" class="_29ItSKLv">' + obj.name.zh_CN + '</span>'			
					 +'</li>';
			});						  
			html+='</ul>';
		}
		html += '</div>';
		
		$(".multiDropDownControl", model.dom).append(html);
	}
	
	//更新值
	var updateTextValue = function(model, data){
		var index = data.index;
		var $tr = $(".conditionTr", model.dom).eq(index);
		$tr.find(".valueText").val(data.nameList)//.data("type", data.valueRealyType);
		$tr.find(".displayValue").val(data.nameList);
		$tr.find(".value").val(data.idList);
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
		$("#ruleCondition tr:not(:first)", model.dom).each(function(i){
			var conditionObj = {};
			conditionObj.index = i;
			conditionObj.name = $(this).find(".name").html();		
			conditionObj.displayParam = getConditionDisplayParamValue(model, $(this));
			conditionObj.param = getConditionParamValue(model, $(this));			
			conditionObj.paramType = getConditionParamType(model, $(this));		
			conditionObj.target = isTarget4ParamType(model, $(this));		
			conditionObj.operators = $(this).find(".comparisonOpt").val();		
			
			var selectValue = $(this).find('.valueTd select:visible').val();
			conditionObj.valueType = $(this).find(".valueType").val();
			/** valueRealyType用来校验参数是否和值类型一致，现在已经从输入选择时控制住了，无需再校验
			if(conditionObj.valueType == "1"){//参数
				conditionObj.valueRealyType = $(this).find(".valueParam").selectivity('data') && $(this).find(".valueParam").selectivity('data').type;
			}else if(conditionObj.valueType == "3"){//指标
				conditionObj.valueRealyType = $(this).find(".valueText").data("type");
			}else{//值
				conditionObj.valueRealyType = getConditionParamType(model, $(this));
			}	*/		
			conditionObj.displayValue = $(this).find(".displayValue").val() || $(this).find('.valueTd select:visible option[value="' + selectValue + '"]').html();			
			conditionObj.value = $(this).find(".value").val() || selectValue;
			
			/*if(isAdminOrg4ParamType(model, $(this)) && "is_or_isSub" == conditionObj.operators){
				//行政组织并且比较符是包含下级时，org.id修改为org.number
				conditionObj.param = conditionObj.param.substring(0, conditionObj.param.lastIndexOf('.') + 1) + "number";
				conditionObj.value = $(this).find(".value").data("number") && $(this).find(".value").data("number").toString() || "";
			}*/
			conditionList.push(conditionObj);
		});		
		return conditionList;
	}
	
	//条件控件的返回值
	var getConditionContrlJson = function(model){
		var data = {};
		data.conditionList = getConditionList(model);
		data.conditionExpressType = $("input[name='conditionType" + model.pageId + "']:checked", model.dom).val();
		data.conditionExpressList = model._conditionExpressList;		
		data.conditionExpressStr = getEditorValue(model).replaceAll(LOGIC_AND, LOGIC_AND_EN).replaceAll(LOGIC_OR, LOGIC_OR_EN);
		return data;
	}
	
	var createConditionExpress = function (model, data) {
		if(data.value && JSON.parse(data.value).conditionExpressType == "2"){
			$("#expressDiv", model.dom).show();
		}
		
		var conditionExpressValue = data.conditionExpress.value;
		conditionExpressValue = conditionExpressValue.replaceAll(LOGIC_AND_EN, LOGIC_AND).replaceAll(LOGIC_OR_EN, LOGIC_OR);

		if(!model.swcEditor){
            model.swcEditor = RuleConditionCodeMirror.fromTextArea($('#conditionExpress', model.dom)[0], {
                value: conditionExpressValue || '',
                lineNumbers: false, // 是否显示行号
                extraKeys: { 'Alt-/': 'autocomplete' }, // 定义自动补全的快捷键
                mode: 'customrule', // 自定义的mode名称
                lineWrapping: 'wrap'
            })
		}

		setEditorValue(model, conditionExpressValue, true)
		
		model.swcEditor.on("blur",function(){
            //非编辑态不需要更新值
            if(!model.pageState||model.pageState.toLocaleLowerCase()!= "view"){
                updateConditionExpressList(model);
                conditionJsonChange(model);
            }
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
	
    var setEditorValue = function(model, value, isInit) {
		if(model.swcEditor){
			model.swcEditor.setValue(value)
			model.swcEditor.save()
			if(!isInit){
				conditionJsonChange(model);
			}
		}
    }
	
    // 动态修改公式平台配置
    var setOption = function(model, property, value){
		model.swcEditor.setOption(property, value)
    }

    function sleep(numberMillis) {
        var now = new Date();
        var exitTime = now.getTime() + numberMillis;
        while (true) {
            now = new Date();
            if (now.getTime() > exitTime)
                return;
        }
    }
	
    KDApi.register('callistrule', Condition)
})(window.KDApi, jQuery)
