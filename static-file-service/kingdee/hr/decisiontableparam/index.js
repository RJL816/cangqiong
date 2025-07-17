(function (KDApi, $) {
	// 参数类型
	var PARAM_TYPE_MAP = {};
	
    function DecisionTableParam(model) {
        this._setModel(model)
    }

    DecisionTableParam.prototype = {
        _setModel: function (model) {
            this.model = model;
			localStorage.setItem('loading', KDApi.getLangMsg(model, 'loading'));
			localStorage.setItem('loadMore', KDApi.getLangMsg(model, 'loadMore'));
			localStorage.setItem('noResults', KDApi.getLangMsg(model, 'noResults'));
			localStorage.setItem('noResultsForTerm', KDApi.getLangMsg(model, 'noResultsForTerm'));
			PARAM_TYPE_MAP = {
				"enum":KDApi.getLangMsg(model, 'enum'),
				"mul_enum":KDApi.getLangMsg(model, 'enum'),
				"boolean":KDApi.getLangMsg(model, 'boolean'),
				"date":KDApi.getLangMsg(model, 'date'),
				"string":KDApi.getLangMsg(model, 'string'),
				"number":KDApi.getLangMsg(model, 'number'),
				"dynamicObject":KDApi.getLangMsg(model, 'dynamicObject'),
				"mul_dynamicObject":KDApi.getLangMsg(model, 'dynamicObject'),
				"adminOrg":KDApi.getLangMsg(model, 'dynamicObject'),
				"mul_adminOrg":KDApi.getLangMsg(model, 'dynamicObject'),
				"basedata":KDApi.getLangMsg(model, 'basedata')};
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
		KDApi.loadFile(['../rule/css/pingtai.css','./css/decisiontableparam.css','../rule/css/selectivity-jquery.css', '../rule/css/customStyle.css'], model, function () {
			KDApi.loadFile('../rule/js/selectivity-jquery.js', model, function() {
				// KDApi.loadFile可以通过路径加载js或css文件，并且在html文件头生成script或者link标签，第一个参数是路径，第二个参数是model，第三个参数是加载完成后执行的回调函数			
				// 后端插件通过setData传给前端的数据，前端可以通过props.data去获取
				var text = props.data && props.data.text || ''
				// 通过路径去获取html字符串，第一个参数是路径，第二个参数是model，第三个参数是HTML模板中变量的值
				KDApi.getTemplateStringByFilePath('./html/decisiontableparam.html', model, {
					text: text,
					configconditionparam:KDApi.getLangMsg(model, 'configconditionparam'),
					addRow:KDApi.getLangMsg(model, 'addRow'),
					deleteRow:KDApi.getLangMsg(model, 'deleteRow'),
					moveUp:KDApi.getLangMsg(model, 'moveUp'),
					moveDown:KDApi.getLangMsg(model, 'moveDown'),
					paramname:KDApi.getLangMsg(model, 'paramname'),
					displayname:KDApi.getLangMsg(model, 'displayname'),
					paramkey:KDApi.getLangMsg(model, 'paramkey'),
					paramtype:KDApi.getLangMsg(model, 'paramtype'),
					comparator:KDApi.getLangMsg(model, 'comparator')
				}).then(function (data) {
					model.dom.innerHTML = data
					// 绑定DOM事件
					initEvent(model, props)
					let tempH = $(model.dom).parent().height() - 40
					$(".decisionTableParamDiv", model.dom).css("height",  '${tempH}px');
					$('.tbodySign', model.dom).css({'max-height': '${tempH-40}px'})
				})	
			})			
		})
    }
	
	var initEvent = function (model, data) {
		$(model.dom).on('blur', ".decisionTableParam .paramDisplayName", function(){			
			jsonChange(model);
		});
		
		$(model.dom).on('click', ".decisionTableParam .paramRadio", function(){			
			var index = $(this).parents('tr').index();//减去列头tr
			if($(this).hasClass('kdfont-fuxuankuangweixuanzhong_yuan')){
				setRadioSeleted($(this), true);
				setRadioSeleted($(".paramRadio:not(:eq(" + index + "))", model.dom), false);
			}else{
				setRadioSeleted($(this), false);
			}
		});
		
		$(model.dom).on('click', '#newRows', function () {
			addRow(model, 1);
		})
		$(model.dom).on('click', '#delRows', function () {
			deleteRow(model);
		})
		$(model.dom).on('click', '#moveUp', function () {
			moveUp(model);
		})		
		$(model.dom).on('click', '#moveDown', function () {
			moveDown(model);
		})
	}
	
	var setRadioSeleted = function($element, seleted){
		if(seleted){//设置选中
			$element.removeClass('hover-theme-hover-fc').removeClass('active-theme-active-fc').removeClass('kdfont-fuxuankuangweixuanzhong_yuan').addClass('theme-fc').addClass('kdfont-liebiaodanxuankuangxuanzhong');
		}else{//设置未选中
			$element.removeClass('theme-fc').removeClass('kdfont-liebiaodanxuankuangxuanzhong').addClass('hover-theme-hover-fc').addClass('active-theme-active-fc').addClass('kdfont-fuxuankuangweixuanzhong_yuan');
		}
	}
	
	var updateFunc = function (model, data) {
		try{	
			model.initing = data.initing;
			if(model.initing){
				model._defaultRows = data.defaultRows
				model._paramOptMap = getparamOptMap(data.comparisonOpt);
				model._param = data.param;
				model._showOpt = data.paramType == "input";//输入参数显示比较符
				if(!model._showOpt){
					$(".paramTitle", model.dom).html(KDApi.getLangMsg(model, 'configconditionresult'));
				}
				if(!model._showOpt){
					$(".optTh", model.dom).hide();
				}
			}
			if(data.value){
				initControl(model, JSON.parse(data.value));
			}
			if(model.initing){
				//初始化中时，等所有都初始化完成，生成ID
				initParamId(model);
			}
			model.initing = false;
		}catch(err){
			// 框架代码有问题，报错会无限循环调用，必须catch住
			//console.log(err);
		}
    }
	
	var getparamOptMap = function(paramOptMap){
		var str = JSON.stringify(paramOptMap);
		//name->text,value->id
		str = str.replaceAll("\"name\":","\"text\":").replaceAll("\"value\":","\"id\":");
		
		return JSON.parse(str);
	}
	
	var initControl = function(model, data){
		addRow(model, data.length);
	
		$.each(data, function(i, param){
			if(param.id >= 0){
				$(".decisionTableParam .bodyTr:eq("+i+")", model.dom).attr("paramid", param.id);
			}			
			if(param.number){
				$(".decisionTableParam .bodyTr:eq("+i+")", model.dom).find(".paramName").selectivity("value", param.number);			
			}
			if(param.displayName){
				$(".decisionTableParam .bodyTr:eq("+i+")", model.dom).find(".paramDisplayName").val(param.displayName);			
			}
			if(model._showOpt && param.opt){
				$(".decisionTableParam .bodyTr:eq("+i+")", model.dom).find(".paramOpt").selectivity("value", param.opt.value);
			}
			if(param.minOrgFirst){				
				$(".decisionTableParam .bodyTr:eq("+i+")", model.dom).attr("isMinOrgFirst", param.minOrgFirst);
				$(".decisionTableParam .bodyTr:eq("+i+")", model.dom).find(".paramRadio").hide();
				$(".decisionTableParam .bodyTr:eq("+i+")", model.dom).find(".paramNameDiv").removeClass("kd-field-border-all");				
				$(".decisionTableParam .bodyTr:eq("+i+")", model.dom).find(".paramOptDiv").removeClass("kd-field-border-all");				
				$(".decisionTableParam .bodyTr:eq("+i+")", model.dom).find(".paramName").selectivity('setOptions', { readOnly: true });
				$(".decisionTableParam .bodyTr:eq("+i+")", model.dom).find(".paramOpt").selectivity('setOptions', { readOnly: true });
				$(".decisionTableParam .bodyTr:eq("+i+")", model.dom).find(".selectivity-single-result-container", model.dom).css("cursor","default");
			}
		})
	}
	var addRow = function (model, rows) {
		var $templeteTr = $('.templeteTable tr', model.dom);
		if(!model._showOpt){
			$templeteTr.find(".optTd").remove();
		}
		//需要设置唯一ID标识，不能用number比较		
		var seq = getSeq(model);
		for (var i = 0; i < rows; i++) {
			var $tr = $templeteTr.clone().attr("paramid", generateId(model));			
			$tr.find(".CellClass_lightRender_293x").html(++seq);
			$('.decisionTableParam', model.dom).append($tr);
			createParamNameControl(model, $tr);
		}
		jsonChange(model);
	}
	var getSeq = function(model){
		if($(".decisionTableParam .CellClass_lightRender_293x", model.dom).length == 0){
			return 0;
		}else{
			return $(".decisionTableParam .CellClass_lightRender_293x:last", model.dom).html();
		}
	}	
	var generateId = function(model){
		if(model.paramId){
			return ++model.paramId;
		}else{
			return initParamId(model);			
		}		
	}
	var initParamId = function(model){
		var id = 1;
		$('.decisionTableParam .bodyTr', model.dom).each(function(){
			var tempId = parseInt($(this).attr("paramid"));
			if(tempId && tempId > id){
				id = tempId;
			}
		})
		model.paramId = id;
		return model.paramId;
	}
	var createParamNameControl = function (model, $tr) {
		var dom = $tr || model.dom;
		$('.paramName', dom).selectivity({
			allowClear: true,
			items: model._param
		});
		
		//参数改变时，初始化比较符（可以优化，比较参数类型是否改变）
		$('.paramName', dom).off('change').on('change', function(e){
			if(e.target.className != "paramName"){
				return;
			}
			updateParamName(model, $(this));
			jsonChange(model);
			$(this).find('.xialajiantou').removeClass('active')
		});
	}
	var updateParamName = function (model, $paramName) {
		var $tr = $paramName.parent().parent().parent();
		var paramName = getSelectivityValue($paramName, "text");		
		var paramNumber = getSelectivityValue($paramName, "id");
		var paramType = getSelectivityValue($paramName, "typeDetail");
		//if(paramNumber.indexOf('.') > -1){
		//	var number = paramNumber.split(".");
		//	paramNumber = paramName.indexOf('.') > -1 ? number[0] + "." + number[2] : number[0];
		//	paramType = paramName.indexOf('.') > -1 ? paramType : "basedata";
		//}		
    	
		$tr.find(".paramNumber").html(paramNumber);
		$tr.find(".paramType").html(PARAM_TYPE_MAP[paramType]);
		createOptControl(model, $tr, $paramName);
	}
	var createOptControl = function (model, $tr, $paramName) {
		if(!model._showOpt){
			return;
		}
		var dom = $tr || model.dom;
		var type = getSelectivityValue($(".paramName", dom), "typeDetail");	
		$('.paramOpt', dom).selectivity({
			allowClear: true,
			items: model._paramOptMap[type]
		});
		
		$('.paramOpt', dom).selectivity("value", "");
		
		$('.paramOpt', dom).off('change').on('change', function(e){
			if(e.target.className != "paramOpt"){
				return;
			}
			jsonChange(model);
		});
		$paramName.find('.xialajiantou').removeClass('active')
	}	
	var deleteRow = function (model) {
		$(".decisionTableParam .kdfont-liebiaodanxuankuangxuanzhong", model.dom).parents('tr').remove();
		// 序号重排
		$(".decisionTableParam .bodyTr .seqTd .CellClass_lightRender_293x", model.dom).each(function(i){
			$(this).html(i+1);
		})
		jsonChange(model);
	}
	var moveUp = function (model) {
		var $cur = $(".decisionTableParam .kdfont-liebiaodanxuankuangxuanzhong", model.dom).parents('tr');
		if($cur.length == 0){
			model.invoke("moveUp", "selectOne");//请选中一行再进行操作
			return;
		}
		
		var $prev = $cur.prev();		
		if($prev.hasClass("headTr") || $prev.length == 0){
			model.invoke("moveUp", "noMoveUp");
			return;
		}
		if($prev.attr("isMinOrgFirst")){
			model.invoke("moveUp", "noMoveUpToMinOrgFirst");
			return;
		}
		
		var curSeq = $cur.find(".CellClass_lightRender_293x").html();
		var prevSeq = $prev.find(".CellClass_lightRender_293x").html();
		$prev.before($cur);
		$cur.find(".CellClass_lightRender_293x").html(prevSeq);
		$prev.find(".CellClass_lightRender_293x").html(curSeq)
		jsonChange(model);
	}
	var moveDown = function (model) {
		var $cur = $(".decisionTableParam .kdfont-liebiaodanxuankuangxuanzhong", model.dom).parents('tr');
		if($cur.length == 0){
			model.invoke("moveDown", "selectOne");//请选中一行再进行操作
			return;
		}
		
		var $next = $cur.next();
		if($next.length == 0){
			model.invoke("moveDown", "noMoveDown");
			return;
		}
		
		var curSeq = $cur.find(".CellClass_lightRender_293x").html();
		var nextSeq = $next.find(".CellClass_lightRender_293x").html();
		$next.after($cur);
		$cur.find(".CellClass_lightRender_293x").html(nextSeq);
		$next.find(".CellClass_lightRender_293x").html(curSeq)
		jsonChange(model);
	}
	var getSelectivityValue = function($element, field){
		if($element.find(".selectivity-single-select").length == 0){
			return "";
		}
		return $element.selectivity('data') && $element.selectivity('data')[field];
	}
	var getParamName = function($tr){
		return getSelectivityValue($tr.find(".paramName"), "name") || getSelectivityValue($tr.find(".paramName"), "text");
	}
	var getParamDisplayName = function($tr){
		return $tr.find(".paramDisplayName").val();
	}
	var getParamNumber = function($tr){
		return getSelectivityValue($tr.find(".paramName"), "id");
	}
	var getParamEntityNumber = function($tr){
		return getSelectivityValue($tr.find(".paramName"), "entityNumber");
	}
	var getParamCategory = function($tr){
		return getSelectivityValue($tr.find(".paramName"), "category");
	}
	var getDateFormat = function($tr){
		return getSelectivityValue($tr.find(".paramName"), "dateFormat");
	}
	var isMinOrgFirst = function($tr){
		return $tr.attr("isMinOrgFirst");
	}
	var isMulti = function($tr){
		return getSelectivityValue($tr.find(".paramName"), "multiple") == "1";
	}
	var getParamType = function($tr){
		return getSelectivityValue($tr.find(".paramName"), "type");
	}
	var getOptName = function($tr){
		return getSelectivityValue($tr.find(".paramOpt"), "text");
	}
	var getOptNumber = function($tr){
		return getSelectivityValue($tr.find(".paramOpt"), "id");
	}
	var getParamOpt = function($tr){		
		return {
			name : getOptName($tr),
			value : getOptNumber($tr)
		}
	}
	var getParamData = function($tr){
		if(getParamType($tr) == "dynamicObject"){
			return getParamEntityNumber($tr);
		}
		if(isEnum4ParamType($tr)){			
			return getParamEnumList($tr);
		}
	}
	var getParamEnumList = function($tr){
		return getSelectivityValue($tr.find(".paramName"), "enumList");
	}
	var isEnum4ParamType = function($tr){
		return getParamEnumList($tr) ? true : false;
	}	
	var isAdminOrg4ParamType = function($tr){
		return getParamCategory($tr) == "adminOrg";
	}
	var getParamJson = function(model){
		var resultList = [];
		$(".decisionTableParam .bodyTr", model.dom).each(function(i){
			var param = {};
			param.id = $(this).attr("paramid");
			param.index = i+1;
			param.name = getParamName($(this));
			param.displayName = getParamDisplayName($(this));
			param.number = getParamNumber($(this));
			param.type = getParamType($(this));
			if(model._showOpt){
				param.opt = getParamOpt($(this));
			}
			param.data = getParamData($(this));
			param.category = getParamCategory($(this));
			param.multiple = isMulti($(this));
			param.dateFormat = getDateFormat($(this));
			param.minOrgFirst = isMinOrgFirst($(this));
			resultList[i] = param;
		})
		return resultList;
	}
	var jsonChange = function(model){
		if(!model.initing){
			var paramJson = JSON.stringify(getParamJson(model));
			model.invokeCustomMethod("setValue", paramJson);
		}
	}
    KDApi.register('decisiontableparam', DecisionTableParam, {isMulLang: true})

})(window.KDApi, jQuery)