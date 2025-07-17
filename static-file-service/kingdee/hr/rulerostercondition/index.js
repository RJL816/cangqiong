(function (KDApi, $) {

    function Roster(model) {
        this._setModel(model)
    }

    Roster.prototype = {
        _setModel: function (model) {
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
            if(this.model.dom.innerHTML){
				updateFunc(this.model, props.data)
			}
        },
        destoryed: function () {
        },
		handleDirective:function(object, method, args){
			var model = this.model;
			if(model && model.dom && model.dom.innerHTML){
				updateFunc(model, args[0]);
			}else{
				var interval = setInterval(function(){			
					if(model && model.dom && model.dom.innerHTML){
						clearInterval(interval);
						updateFunc(model, args[0]);
					}
				}, 100);
			}
		}
    }

	
    var initFunc = function (model, props) {
		KDApi.loadFile(['../rule/css/pingtai.css','../rule/css/selectivity-jquery.css', '../rule/css/customStyle.css'], model, function () {
			KDApi.loadFile('../rule/js/selectivity-jquery.js', model, function(){
				// KDApi.loadFile可以通过路径加载js或css文件，并且在html文件头生成script或者link标签，第一个参数是路径，第二个参数是model，第三个参数是加载完成后执行的回调函数
				KDApi.loadFile('./css/ruleroster.css', model, function () {
					// 后端插件通过setData传给前端的数据，前端可以通过props.data去获取
					var text = props.data && props.data.text || ''
					// 通过路径去获取html字符串，第一个参数是路径，第二个参数是model，第三个参数是HTML模板中变量的值
					KDApi.getTemplateStringByFilePath('./html/ruleroster.html', model, {
						text: text,
						conditionconfig:KDApi.getLangMsg(model, 'conditionconfig'),
						selectlogic:KDApi.getLangMsg(model, 'selectlogic'),
						addcondition:KDApi.getLangMsg(model, 'addcondition'),
						onthelist:KDApi.getLangMsg(model, 'onthelist'),
						inlist:KDApi.getLangMsg(model, 'inlist'),
						deleterow:KDApi.getLangMsg(model, 'deleterow')
					}).then(function (data) {
						model.dom.innerHTML = data;
						createConditionLogicControl(model);
						// 绑定DOM事件
						initEvent(model, props)
					})
				})
			})
		})
    }
	
	var updateFunc = function (model, data) {
		try{		
			model.initing = data.initing || "false";
			
			if(data.initing == "true"){
				model._defaultRows = data.defaultRows
				model._showDeleteOnlyOneRow = data.showDeleteOnlyOneRow;
				model._hideButton = data.hideButton;
				hideButton(model);
			}
			if (data.param) {
				model._param = data.param;
				
				clearCondition(model);
			}
			if (data.paramValue) {
				updateTextValue(model, data.paramValue);
			}
			if (data.value) {
				model.initing = "true";
				initControl(model, JSON.parse(data.value));
				model.initing = "false";
			}
			if(data.pageState){
				changePageState(model, data.pageState);
			}
			if(data.clear){
				clearCondition(model);
			}
			if(data.clearAll){
				model._param = [];
				model._valueParam = [];
				clearCondition(model);
			}
			model.initing = "false";
		}catch(err){
			// 框架代码有问题，报错会无限循环调用，必须catch住
			//console.log(err);
		}
    }
	
	var clearCondition = function(model){	
		$('.ruleRoster tr', model.dom).remove();
		
		if(model._defaultRows){
			addRosterRows(model, model._defaultRows);
		}
	}
	
	var changePageState = function(model, pageState){
		if(pageState.toLocaleLowerCase() == "view"){//查看态
			$(".rosterTop .conditionLogic", model.dom).selectivity('setOptions', { readOnly: true })
			$(".ruleRoster .rosterParam", model.dom).selectivity('setOptions', { readOnly: true })
			$(".ruleRoster .rosterValueTd", model.dom).attr("disabled", true)	
			$(".ruleRoster .rosterValueText", model.dom).css("color","#808080");
			$(".ruleRoster .rosterValueSearch", model.dom).hide();
			$(".ruleRoster .rosterDeleteTd", model.dom).hide();
			$(".addRoster", model.dom).hide();	
			
			//hover样式调整
			$(".rosterControl .FieldItem_value-wrap_3cGJ", model.dom).removeClass("kd-field-border-all").removeClass("kd-hover-color")
			//F7样式调整
			$("._1vTTLSCX", model.dom).addClass("_2yUPiMGU").addClass("disabled-fc").attr("readonly", "")
			$("._3iC3Zk0Q", model.dom).addClass("_3tYRLrHQ");
			
			//下拉样式调整
			$(".rosterControl .Select_iconBox_1WJ3", model.dom).hide();			
			$(".rosterControl .selectivity-single-selected-item", model.dom).css("color","#808080");		
			$(".rosterControl .selectivity-single-select", model.dom).css("cursor","default");			
			$(".rosterControl .selectivity-caret", model.dom).hide();
		}else{//编辑态
			$(".rosterTop .conditionLogic", model.dom).selectivity('setOptions', { readOnly: false });
			$(".ruleRoster .rosterParam", model.dom).selectivity('setOptions', { readOnly: false });
			$(".ruleRoster .rosterValueTd", model.dom).attr("disabled", false)
			$(".ruleRoster .rosterValueText", model.dom).css("color","#000000");
			$(".ruleRoster .rosterValueSearch", model.dom).show();	
			changeDeleteButton(model);			
			hideButton(model);			
			
			//hover样式调整
			$(".rosterControl .FieldItem_value-wrap_3cGJ", model.dom).addClass("kd-field-border-all").addClass("kd-hover-color")
			//F7样式调整
			$("._1vTTLSCX", model.dom).removeClass("_2yUPiMGU").removeClass("disabled-fc").removeAttr("readonly", "")
			$("._3iC3Zk0Q", model.dom).removeClass("_3tYRLrHQ");
			
			//下拉样式调整			
			$(".rosterControl .Select_iconBox_1WJ3", model.dom).show();
			$(".rosterControl .selectivity-single-selected-item", model.dom).css("color","#000000");
			$(".rosterControl .selectivity-single-select", model.dom).css("cursor","pointer");		
			$(".rosterControl .selectivity-caret", model.dom).show();
		}
		//名单不能输入
		$(".ruleRoster .rosterValueText", model.dom).attr("disabled", true);
	}
	
	var hideButton = function(model){
		//隐藏按钮
		if(model._hideButton){
			$(".addRoster", model.dom).hide();
		}else{
			$(".addRoster", model.dom).show();
		}
	}	
	
	var changeDeleteButton = function(model){
		if(model._showDeleteOnlyOneRow || $(".ruleRoster tr", model.dom).length > 0){
			$(".ruleRoster .rosterDeleteTd", model.dom).show();
		}else{
			$(".ruleRoster .rosterDeleteTd", model.dom).hide();
		}
	}
	
    //事件绑定
    var initEvent = function (model, props) {
        $(model.dom).on('click', '.ruleRoster .rosterValueSearch', function () {
            var $tr = $(this).parents("tr");
            model.invokeCustomMethod("openRosterF7", {rosterCategory : getRosterCategory(model, $tr), index: $tr.index()});
        })		

        $(model.dom).on('click', '.deleteRoster', function () {
			$(this).parents("tr").remove();			
			rosterJsonChange(model);
			changeDeleteButton(model);
        })

        $('.addRoster', model.dom).click(function () {
            addRosterRows(model, 1);
        })
    }
	
	var getRosterParamValue = function($tr){
		return $tr.find(".rosterParam").selectivity('value');
	}
	
	var getRosterParamType = function($tr){
		return ($tr.find(".rosterParam").selectivity('data') && $tr.find(".rosterParam").selectivity('data').type) || "";
	}
	
	var isEnum4ParamType = function($tr){
		return $tr.find(".rosterParam").selectivity('data') && $tr.find(".rosterParam").selectivity('data').enumList ? true : false;
	}
	
	var isAdminOrg4ParamType = function($tr){
		return $tr.find(".rosterParam").selectivity('data') && $tr.find(".rosterParam").selectivity('data').category == "adminOrg";
	}
	
	var isPerson4ParamType = function($tr){
		return $tr.find(".rosterParam").selectivity('data') && $tr.find(".rosterParam").selectivity('data').category === "person";
	}
	
	//获取名单类别：字符串、人员、行政组织
	var getRosterCategory = function(model, $tr){
		//不支持bool和枚举		
		var rosterType = getRosterParamType($tr);
		if(rosterType == "" || rosterType == "boolean" || isEnum4ParamType($tr)){
			return "";
		}
		
		if(rosterType != "dynamicObject"){
			return "string";
		}else if(isAdminOrg4ParamType($tr) || isPerson4ParamType($tr)){
			return $tr.find(".rosterParam").selectivity('data').entityNumber;		
		}else{
			return "";
		}		
	}
	
	var rosterJsonChange = function(model){
		if(model.initing !== "true"){
			var json = JSON.stringify(getRosterControlJson(model));
			//console.log(json);
			model.invokeCustomMethod("setValue", json);
		}
	}

    //创建参数控件
    var createParamControl = function (model, $tr) {
        //业务对象
        var dom = $tr || model.dom;
		$('.rosterParam', dom).selectivity({
			allowClear: true,
			items: model._param
		});
		
		//参数改变时，初始化比较符（可以优化，比较参数类型是否改变）
		$('.rosterParam', dom).off('change').on('change', function(e){
			if(e.target.className != "rosterParam"){
				return;
			}
			$(this).parents("tr").find(".rosterValueText").val('').data("value","");
			
			rosterJsonChange(model);
		});
    } 
	
	    //创建参数控件
    var createConditionLogicControl = function(model) {
        //业务对象
		$('.conditionLogic', model.dom).selectivity({
			allowClear: true,
			items: [{"id":"0","text":KDApi.getLangMsg(model, 'allcondition')},{"id":"1","text":KDApi.getLangMsg(model, 'anycondition')}]
		});
		//设置默认值
		$('.conditionLogic', model.dom).selectivity('value', "0");
		
		$('.conditionLogic', model.dom).off('change').on('change', function(e){	
			if(e.target.className != "conditionLogic"){
				return;
			}
			rosterJsonChange(model);
		});
    }
	
    //F7更新值
    var updateTextValue = function (model, data) {
		$(".rosterValueText", model.dom).eq(data.index).val(data.nameList).data("value", data.idList);
		
		rosterJsonChange(model);
    }
	
    var initControl = function (model, data) {
        insertRoster(model, data.rosterList);
		
		//$(".conditionLogic", model.dom).val(data.conditionExpressType)
		$(".conditionLogic", model.dom).selectivity('value', data.conditionExpressType);
    }

    var insertRoster = function (model, rosterList) {
        if (rosterList && rosterList.length > 0) {
			$('.ruleRoster tr', model.dom).remove();
			addRosterRows(model, rosterList.length);
			
            for (var i = 0; i < rosterList.length; i++) {
                var $tr = $(".ruleRoster tr", model.dom).eq(i);
				
				$tr.find(".rosterParam").selectivity('value', rosterList[i].param)					
				
				$tr.find(".rosterValueText").val(rosterList[i].displayValue).data("value", rosterList[i].value);				
            }
        }
    }
	
	var addRosterRows = function(model, rows){
		for (var i = 0; i < rows; i++) {
			var $tr = $('#templeteTrRoster', model.dom).clone().removeAttr('id').show();
			$('.ruleRoster', model.dom).append($tr);
			createParamControl(model, $tr);			
		}
		changeDeleteButton(model);
	}

    //条件控件的返回值
    var getRosterControlJson = function(model){
        var data = {};
        data.rosterList = getRosterJson(model);
		data.conditionExpressType = $(".conditionLogic", model.dom).selectivity('value');
        return data;
    }

    //获取结果的List
    var getRosterJson = function(model){
        var rosterList = new Array();
        $(".ruleRoster tr", model.dom).each(function(i){
            var rosterObj = {};
            rosterObj.index = i;
            rosterObj.param = getRosterParamValue($(this));
            rosterObj.displayValue = $(this).find(".rosterValueText").val();
            rosterObj.value = $(this).find(".rosterValueText").data("value");
            rosterList.push(rosterObj);
        });
		return rosterList;
    }

    KDApi.register('rulerostercondition', Roster, {isMulLang: true})
})(window.KDApi, jQuery)