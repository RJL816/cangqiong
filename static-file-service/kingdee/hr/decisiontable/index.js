(function (KDApi, $) {
	var CSS_XUANZHONG = 'kdfont-fuxuankuangxuanzhong_fang';
	var CSS_WEIXUANZHONG = 'kdfont-fuxuankuangweixuanzhong_fang';
	var CSS_BUFENXUANZHONG = 'kdfont-fuxuankuang5';
	var CSS_OTHER = "theme-fc";
	
	
    function Decisiontable(model) {
        this._setModel(model)
    }

    Decisiontable.prototype = {
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
            if(this.model.dom.innerHTML && props.data){				
				updateFunc(this.model, props.data)
			}
        },
        destoryed: function () {
			$('[data-page-id=${'+model.pageId+'_ruledate]').remove()
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
		KDApi.loadFile(['../rule/css/pingtai.css','../rule/css/selectivity-jquery.css','./css/decisiontable.css', '../rule/css/customStyle.css'], model, function () {			
			KDApi.loadFile('../rule/js/selectivity-jquery.js', model, function() {
				// KDApi.loadFile可以通过路径加载js或css文件，并且在html文件头生成script或者link标签，第一个参数是路径，第二个参数是model，第三个参数是加载完成后执行的回调函数			
				// 后端插件通过setData传给前端的数据，前端可以通过props.data去获取
				var text = props.data && props.data.text || ''
				// 通过路径去获取html字符串，第一个参数是路径，第二个参数是model，第三个参数是HTML模板中变量的值
				KDApi.getTemplateStringByFilePath('./html/decisiontable.html', model, {
					text: text,
					paramconfig:KDApi.getLangMsg(model, 'paramconfig'),
					addRow:KDApi.getLangMsg(model, 'addRow'),
					insertRow:KDApi.getLangMsg(model, 'insertRow'),
					deleteRow:KDApi.getLangMsg(model, 'deleteRow'),
					moveUp:KDApi.getLangMsg(model, 'moveUp'),
					moveDown:KDApi.getLangMsg(model, 'moveDown'),
					importdata:KDApi.getLangMsg(model, 'importdata'),
					exportdata:KDApi.getLangMsg(model, 'exportdata'),
					nodata:KDApi.getLangMsg(model, 'nodata'),
					nodataconfig:KDApi.getLangMsg(model, 'nodataconfig'),
					picshow:KDApi.getLangMsg(model, 'picshow')
				}).then(function (data) {
					model.dom.innerHTML = data
					// 绑定DOM事件
					initEvent(model)
					
					//设置高度，表头固定
					$(model.dom).css("max-height", $(model.dom).parent().height() - 30).css("overflow-y", "hidden");
					$(".decisionTableBodyDiv", model.dom).css("max-height", $(model.dom).parent().height() - 159);
				})		
			})	
		})
    }
	
	//1.导入2.导入后新增参数3.新增参数4.新增参数后再新增
	var updateFunc = function (model, data) {
		try{		
			model.initing = data.initing;
			if(data.value){
				model.initing = "true";				
			}else if(model.initing == "true" && !data.tableHead){	
				$(".emptyImg", model.dom).show();
			}
			
			if(data.tableHead || data.value){				
				model._tableHead = data.tableHead ? JSON.parse(data.tableHead) : JSON.parse(data.value).tableHead;
				if($(".decisionTableHead tr th", model.dom).length > 0){
					updateTable(model);
				}else{
					initTableTH(model);
					
					var conditionParams = model._tableHead.conditionParams;
					// 是否只有行政组织条件，策略页面新增决策表配置组织明细优先时，第一次进入的场景
					var paramIsEmpty = !conditionParams || conditionParams.length == 0;
					var isOnlyAdminOrg = conditionParams && conditionParams.length == 1 && conditionParams[0].minOrgFirst && !model._tableHead.resultParams;
					if(paramIsEmpty || isOnlyAdminOrg){
						$(".emptyImg", model.dom).show();
					}else{
						$(".emptyImg", model.dom).hide();
						$(".emptyContent", model.dom).show();
						$(".decisionTableControl", model.dom).css("border","1px solid #d9d9d9");
					}
				}				
			}
			if(data.tableBody || data.value){			
				clearData(model);
				model._tableBody = data.tableBody ? JSON.parse(data.tableBody) : JSON.parse(data.value).tableBody;
				addRows(model, model._tableBody.length);
				initValue(model);
			}
			if (data.date && model._datePosition){//这个要放最后，防止控件还没初始化完成
				updateDateValue(model, data.date);			
				model._datePosition = "";
			}
			if(data.paramValue){
				updateValue(model, data.paramValue);
			}
			if(data.addRow){
				addRows(model, data.number);
				changeCheckBoxAllStyle(model);
			}
			if(data.insertRow){
				insertRows(model, data.index);
				changeCheckBoxAllStyle(model);
			}
			if(data.deleteRow){
				deleteRows(model, data.index);
				changeCheckBoxAllStyle(model);
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
	
	var listIsEmpty = function(list){
		return !list || list.length == 0;
	}
	
	var initTableTH = function(model){
		if(!model._tableHead || listIsEmpty(model._tableHead.conditionParams) || listIsEmpty(model._tableHead.resultParams)){
			return;
		}
		let conidtionLen = model._tableHead.conditionParams.length + 1;
		let resultLen =  model._tableHead.resultParams.length + conidtionLen;			
		let lastlen = resultLen + 1
		var colgroup = "<colgroup class='colgroup'>" + getColgroupHtml(model) + "</colgroup>";	
		var th_html = colgroup + "<thead>";
		th_html += "<tr class='titleTr'><th class='lockCell'  cellIndex=0></th><th class='lockCell'  cellIndex=1></th><th cellIndex="+conidtionLen+" class='titleCondition' colspan='" + model._tableHead.conditionParams.length + "'>"+KDApi.getLangMsg(model, 'condition')+"</th><th cellIndex="+resultLen+" class='titleResult' colspan='" + model._tableHead.resultParams.length + "'>"+KDApi.getLangMsg(model, 'result')+"</th><th cellIndex="+lastlen+"></th></tr>";
		
		th_html += "<tr class='headTr'><th cellIndex=0  class='lockCell CellClass_header-all-selection-space_3KVF row-selection-icon checkBoxTh'><span class='checkBoxAll kdfont hover-theme-hover-fc active-theme-active-fc " + CSS_WEIXUANZHONG + "'></span></th><th  cellIndex=1 class='lockCell seqTh'>"+KDApi.getLangMsg(model, 'priority')+"</th>"
		$.each(model._tableHead.conditionParams, function(i, col){
			var name = (col.displayName || col.name) + "【" + col.opt.name + "】";
			let cellIndex = col.index + 1
			th_html += "<th cellIndex="+cellIndex+" class='conditionTh' paramid='" + col.id + "' index='" + col.index + "' number='" + col.number + "' type='" + col.type + "' data='" + col.data + "' category='"+col.category+"' opt='" + col.opt.value + "' title='" + name + "' dateFormat='" + (col.dateFormat || "") + "' isMulti='" + col.multiple + "' isMinOrgFirst='" + col.minOrgFirst + "'>";
			if(col.minOrgFirst){
				th_html += "<span style='color: red; padding-right: 1px;'>*</span>"
			}
			th_html += "<span class='displayName'>" + name + "</span></th>";
		})
		$.each(model._tableHead.resultParams, function(i, col){
			var name = col.displayName || col.name;
			let cellIndex = model._tableHead.conditionParams.length + col.index + 1
			th_html += "<th cellIndex="+cellIndex+" class='resultTh' paramid='" + col.id + "' index='" + col.index + "' number='" + col.number + "' type='" + col.type + "' data='" + col.data + "' category='"+col.category+"' title='" + name + "' dateFormat='" + (col.dateFormat || "") + "' isMulti='" + col.multiple + "'><span class='displayName'>" + name + "</span></th>";
		})
		th_html += "<th></th></tr>"
		th_html += "</thead>";
		$(".decisionTableHead", model.dom).append(th_html);		
		
		$(".decisionTableBody", model.dom).append(colgroup);
		
		$(".decisionTable", model.dom).css("width", getBodyWidth(model) + "px");
	}
	
	var getBodyWidth = function(model){
		var	decisionTableHeadWidth = parseInt($(".decisionTableHead", model.dom).css("width").replace("px", ""));
		var	decisionTableHeadDivWidth = parseInt($(".decisionTableHeadDiv", model.dom).css("width").replace("px", ""));
		return getMax(decisionTableHeadWidth, decisionTableHeadDivWidth);		 
	}
	
	var getMax = function(x, y){
		return x > y ? x : y;
	}
	
	var isConditionParamNoChange = function(model, col){
		var $conditionTh = $(".decisionTableHead .conditionTh[paramid='"+col.id+"']", model.dom);
		return $conditionTh.length == 1 && $conditionTh.attr("number") == col.number;//id与参数均没变		
	}
	
	var isResultParamNoChange = function(model, col){
		var $resultTh = $(".decisionTableHead .resultTh[paramid='"+col.id+"']", model.dom);
		return $resultTh.length == 1 && $resultTh.attr("number") == col.number;//id与参数均没变		
	}
	
	var getColgroupHtml = function(model){
		var colgroup = "<col style='width:32px;'></col><col style='width:52px;'></col>";
		var colLength = model._tableHead.conditionParams.length + model._tableHead.resultParams.length;
		for(var i=0;i<colLength;i++){
			colgroup += "<col style='width:160px'></col>"
		}
		
		return colgroup;
	}
	
	var disableInputValue = function(model, $column){
		$column.find(".valueEnumText").attr("disabled",true);
		$column.find(".valueNumber").attr("disabled",true);
		$column.find(".valueString").attr("disabled",true);
		$column.find(".valueObject").attr("disabled",true);
		
		$(model.dom).off('click', '.valueDateDiv');
		$(model.dom).off('click', '.valueSearch');
	}
	
	var enableInputValue = function(model, $column){
		$column.find(".valueEnumText").attr("disabled",false);
		$column.find(".valueNumber").attr("disabled",false);
		$column.find(".valueString").attr("disabled",false);
		$column.find(".valueObject").attr("disabled",false);
		
		$(model.dom).off('click', '.valueDateDiv').on('click', '.valueDateDiv', function () {
			valueDateDivEvent(model, $(this));
		});
		$(model.dom).off('click', '.valueSearch').on('click', '.valueSearch', function () {
			valueSearchEvent(model, $(this));
		});
	}
	
	var valueSearchEvent = function(model, $element){
		var $td = $element.parents("td");
		model.invokeCustomMethod("openParamF7", {entityNumber : getThTd(model, $td.index()).attr("number"), index : $td.parent().index()+","+$td.index(), isMulti : isMulti(model, $td.index()), value : getValue(model, $td)});
	}
	
	var valueDateDivEvent = function(model, $element){		
		if(model.pageState && model.pageState.toLocaleLowerCase() == "view"){
			return;
		}
			
		model._datePosition = $element.parents("tr").index() + "," + $element.parents("td").index();
		model.invokeCustomMethod("setDateFormat", {dateFormat : getDateFormat(model, $element.parents("td").index())});
	}
	
	// 是否显示值控件（为空或者日期类型比较符，无需显示控件）
	var isDisableValue = function(newOpt){	
		return "is_not_null" == newOpt || "is_null" == newOpt || /^[+-]*\dd$/.test(newOpt) || /^[+-]*\dw$/.test(newOpt) || /^[+-]*\dm$/.test(newOpt) || /^[+-]*\dq$/.test(newOpt) 
					|| /^[+-]*\dy$/.test(newOpt) || /^[+-]*\d+~[+-]*\dm$/.test(newOpt) || "<=0d" == newOpt || ">=0d" == newOpt;
	}
	
	var updateTable = function(model){
		var colgroup = getColgroupHtml(model);
		$("colgroup", model.dom).html('').append(colgroup);
		
		$(".decisionTableHead .titleCondition", model.dom).attr("colspan", model._tableHead.conditionParams.length);
		$(".decisionTableHead .titleResult", model.dom).attr("colspan", model._tableHead.resultParams.length);
	
		$(".decisionTableHead .conditionTh", model.dom).attr("index","-1");//顺序重置为-1
		$(".decisionTableBody .conditionTd", model.dom).attr("index","-1");//顺序重置为-1
		$.each(model._tableHead.conditionParams, function(i, col){
			var name = (col.displayName || col.name) + "【" + col.opt.name + "】";
			if(isConditionParamNoChange(model, col)){//如果参数没变，更新顺序，更新比较符，显示名
				var oldOpt = $(".decisionTableHead .conditionTh[paramid='"+col.id+"']", model.dom).attr("opt");
				var newOpt = col.opt.value;
				$(".decisionTableHead .conditionTh[paramid='"+col.id+"']", model.dom).attr("index", col.index).attr("opt", newOpt).attr("title", name);
				$(".decisionTableHead .conditionTh[paramid='"+col.id+"']", model.dom).find(".displayName").html(name);			
				$(".decisionTableBody .conditionTd[paramid='"+col.id+"']", model.dom).attr("index", col.index);
				
				if(isDisableValue(newOpt)){
					// 清空控件						
					$(".decisionTableBody .conditionTd[paramid='"+col.id+"']", model.dom).html('');
				}else{ 
					if(isDisableValue(oldOpt)){
						$(".decisionTableBody .conditionTd[paramid='"+col.id+"']", model.dom).append(createTdControl(model, col));
					}else{
						//多选切换单选时，清空值
						if((oldOpt == "in" || oldOpt == "not_in" || oldOpt == "is_or_isSub") && (newOpt == "==" || newOpt == "!=")){
							clearValues(model, col.id);
						}
					}					
				}
			}else{//如果参数已经改变，新增
				var th_html = "<th class='conditionTh' paramid='" + col.id + "' index='" + col.index + "' number='" + col.number + "' type='" + col.type + "' data='" + col.data + "' category='"+col.category+"' opt='" + col.opt.value + "' title='" + name + "' dateFormat='" + (col.dateFormat || "") + "' isMulti='" + col.multiple + "' isMinOrgFirst='" + col.minOrgFirst + "'>";
				if(col.minOrgFirst){
					th_html += "<span style='color: red; padding-right: 1px;'>*</span>";
				}
				th_html += "<span class='displayName'>" + name + "</span></th>";
				
				var td_html = "<td class='conditionTd' paramid='" + col.id + "' index='" + col.index + "' number='" + col.number + "'>";								
				td_html += createTdControl(model, col);
				td_html += "</td>";
							
				$(".decisionTableHead .conditionTh[index='" +(col.index-1)+ "']:eq(0)", model.dom).after(th_html);
				$(".decisionTableBody .bodyTr", model.dom).find(".conditionTd[index='" +(col.index-1)+ "']:eq(0)").after(td_html);
			}
		})
		//循环完后，如果还有index=0的列，则为需要删除的
		$(".decisionTableHead .conditionTh[index='-1']", model.dom).remove();
		$(".decisionTableBody .conditionTd[index='-1']", model.dom).remove();
		
		// 重排顺序
		// 1.把第一个条件放到序号后面，再排2-N
		var startIdx = 0;
		while($(".decisionTableHead .conditionTh[index='" + startIdx + "']", model.dom).length == 0){
			startIdx++;
		}
		$(".decisionTableHead .seqTh", model.dom).after($(".decisionTableHead .conditionTh[index='"+startIdx+"']", model.dom));
		for(var i=startIdx+1;i<=model._tableHead.conditionParams.length;i++){
			$(".decisionTableHead .conditionTh[index='"+(i-1)+"']", model.dom).after($(".decisionTableHead .conditionTh[index='"+i+"']", model.dom));				
		}
		$(".decisionTableBody .bodyTr" ).each(function(row){			
			$(".decisionTableBody .seqTd:eq("+row+")", model.dom).after($(".decisionTableBody .conditionTd[index='1']:eq(" + row + ")", model.dom));
			for(var col=startIdx+1;col<=model._tableHead.conditionParams.length;col++){				
				$(".decisionTableBody .conditionTd[index='"+(col-1)+"']:eq("+row+")", model.dom).after($(".decisionTableBody .conditionTd[index='"+col+"']:eq("+row+")", model.dom));
			}
		});
		
		
		$(".decisionTableHead .resultTh", model.dom).attr("index","-1");//顺序重置为0
		$(".decisionTableBody .resultTd", model.dom).attr("index","-1");//顺序重置为0
		$.each(model._tableHead.resultParams, function(i, col){
			var name = col.displayName || col.name;
			if(isResultParamNoChange(model, col)){//如果参数没变，更新顺序，显示名
				$(".decisionTableHead .resultTh[paramid='"+col.id+"']", model.dom).attr("index", col.index).attr("title", name);
				$(".decisionTableHead .resultTh[paramid='"+col.id+"']", model.dom).find(".displayName").html(name);
				$(".decisionTableBody .resultTd[paramid='"+col.id+"']", model.dom).attr("index", col.index)
			}else{//如果参数改变，新增
				var th_html = "<th class='resultTh' paramid='" + col.id + "' index='" + col.index + "' number='" + col.number + "' type='" + col.type + "' data='" + col.data + "' category='"+col.category+"' title='" + name + "' dateFormat='" + (col.dateFormat || "") + "' isMulti='" + col.multiple + "'><span class='displayName'>" + name + "</span></th>";	

				var td_html = "<td class='resultTd' paramid='" + col.id + "' index='" + col.index + "' number='" + col.number + "'>" + createTdControl(model, col) + "</td>";
				
				$(".decisionTableHead .resultTh[index='" +(col.index-1)+ "']:eq(0)", model.dom).after(th_html);
				$(".decisionTableBody .bodyTr", model.dom).find(".resultTd[index='" +(col.index-1)+ "']:eq(0)").after(td_html);
			}
		})
		
		//重排顺序
		$(".decisionTableHead .conditionTh:last", model.dom).after($(".decisionTableHead .resultTh[index='1']", model.dom));
		for(var i=2;i<=model._tableHead.resultParams.length;i++){
			$(".decisionTableHead .resultTh[index='"+(i-1)+"']", model.dom).after($(".decisionTableHead .resultTh[index='"+i+"']", model.dom));
		}
		$(".decisionTableBody .bodyTr" ).each(function(row){			
			$(".decisionTableBody .bodyTr:eq("+row+") .conditionTd:last", model.dom).after($(".decisionTableBody .resultTd[index='1']:eq("+row+")", model.dom));
			for(var col=2;col<=model._tableHead.resultParams.length;col++){
				$(".decisionTableBody .resultTd[index='"+(col-1)+"']:eq("+row+")", model.dom).after($(".decisionTableBody .resultTd[index='"+col+"']:eq("+row+")", model.dom));
			}
		});
		$(".decisionTableHead .resultTh[index='-1']", model.dom).remove();
		$(".decisionTableBody .resultTd[index='-1']", model.dom).remove();
		
		$(".decisionTable", model.dom).css("width", getBodyWidth(model) + "px");
		
		createValueBooleanControl(model);
		//删除参数时，需要更新body
		jsonChange(model);
		updateCellIndex(model)

	}
	var updateCellIndex = function(model) {
		let headThDom = $('.headTr', model.dom).children('th')
		for (let i = 2; i < headThDom.length; i++) {
			$(headThDom[i]).attr('cellIndex', i)
		}

	}
	// row:新增行数，index:在第几行前新增
	var addRows = function(model, row, index){	
		if(!model._tableHead || !row || row <= 0){
			return;
		}
		
		var seq = parseInt($(".decisionTableBody .bodyTr:last .seqTd", model.dom) && $(".decisionTableBody .bodyTr:last .seqTd", model.dom).html()) || 0; 
		for(var i=0;i<row;i++){
			var th_html = "<tr class='bodyTr' traggable='true'><td class='checkBoxTd'><span class='checkBox kdfont hover-theme-hover-fc active-theme-active-fc " + CSS_WEIXUANZHONG + "'></span></td><td class='seqTd'>" + (++seq) + "</td>"		
			$.each(model._tableHead.conditionParams, function(index, col){//根据TH循环
				th_html += "<td class='conditionTd' paramid='" + col.id + "' index='" + col.index + "' number='" + col.number + "'>";		
				th_html += createTdControl(model, col);
				th_html += "</td>";
			})
			$.each(model._tableHead.resultParams, function(index, col){//根据TH循环
				th_html += "<td class='resultTd' paramid='" + col.id + "' index='" + col.index + "' number='" + col.number + "'>";				
				th_html += createTdControl(model, col);
				th_html += "</td>";
			})
			th_html += "<td></td></tr>"
			
			if(index > 0){
				$(".decisionTableBody tr", model.dom).eq(index - 1).before(th_html);
			}else{
				$(".decisionTableBody", model.dom).append(th_html);
			}			
		}
		
		$(".emptyContent", model.dom).hide();
		createValueBooleanControl(model);		
		
		jsonChange(model);
	}
	
	var insertRows = function(model, index){
		var size = $(".decisionTableBody .bodyTr", model.dom).length;
		if(index < 0){
			index += size + 1;
		}
		addRows(model, 1, index);
	}
	
	var deleteRows = function(model, index){
		if(index !== undefined){
			// 从大到小排序，负数转换为正数
			var arr = sortArr(index, $(".decisionTableBody .bodyTr", model.dom).length);
			for(var i=0;i<arr.length;i++){
				$(".decisionTableBody .bodyTr", model.dom).eq(arr[i] - 1).remove();
			}
		}else{
			$(".decisionTableBody .bodyTr ." + CSS_XUANZHONG, model.dom).parents("tr").remove();
		}
		
		if($(".decisionTableBody .bodyTr", model.dom).length == 0 && $(".emptyImg", model.dom).is(':hidden')){
			$(".emptyContent", model.dom).show();
		}

		jsonChange(model);
	}
	
	// 对删除的数组排序（arr：要删除的行，size：决策表行数）
	var sortArr = function(arr, size){
		//N:第N行；-N：倒数第N行
		arr.sort(function(a,b){
			if(a < 0){
				a += size + 1;
			}
			if(b < 0){
				b += size + 1;
			}
			return b-a;
		});
		return arr;
	}
	
	var clearData = function(model){
		$(".decisionTableBody .bodyTr", model.dom).remove();
		
		jsonChange(model);
	}
	
	var createTdControl = function(model, col){
		if(col.opt && isDisableValue(col.opt.value)){//不用填参数
			return "";
		}
		
		if(col.type == "dynamicObject"){
			return $(".tdTemplete .valueObjectDiv", model.dom).prop("outerHTML");	
		}else if(col.type == "boolean"){	
			return $(".tdTemplete .valueBooleanSelectDiv", model.dom).prop("outerHTML");	
		}else if(col.data){
			return $(".tdTemplete .valueEnumSelectDiv", model.dom).prop("outerHTML");		
		}else if(col.type == "date"){
			return $(".tdTemplete .valueDateDiv", model.dom).prop("outerHTML");
		}else if(col.type == "number"){
			return $(".tdTemplete .valueNumberDiv", model.dom).prop("outerHTML");				
		}else if(col.type == "string"){
			return $(".tdTemplete .valueStringDiv", model.dom).prop("outerHTML");
		}
	}	
	
	var createValueBooleanControl = function(model){
		// 一个控件只能初始化一次，不然会报错
		$('.decisionTableBodyDiv .valueBoolean', model.dom).each(function(){
			if($(this).find(".selectivity-single-select").length == 0){
				$(this).selectivity({
					allowClear: true,
					items: [{"id":"true","text":KDApi.getLangMsg(model, 'yes')},{"id":"false","text":KDApi.getLangMsg(model, 'no')}]
				});
			}
		});
		
		$('.decisionTableBodyDiv .valueBoolean', model.dom).off('change').on('change', function(e){
			if(e.target.className != "valueBoolean"){
				return;
			}
			jsonChange(model);
		});
	}

	var initValue = function(model){
		if(!model._tableHead || !model._tableBody){
			return;
		}
		
		$.each(model._tableBody, function(seq, row){
			var $tr = $(".decisionTableBody .bodyTr:eq(" + seq + ")", model.dom)
			$.each(model._tableHead.conditionParams, function(index, col){//根据TH循环
				if(row.conditionValue[col.id]){
					if(col.type == "boolean"){						
						$tr.find(".conditionTd[paramid='" + col.id + "']").find(".valueBoolean").selectivity("value", row.conditionValue[col.id].value);
					}else{
						$tr.find(".conditionTd[paramid='" + col.id + "']").find("input").val(row.conditionValue[col.id].displayValue).data("value", row.conditionValue[col.id].value).data("objectNumber", row.conditionValue[col.id].objectNumber).data("objectId", row.conditionValue[col.id].objectId);
					}
				}
			})
			$.each(model._tableHead.resultParams, function(index, col){//根据TH循环	
				if(row.resultValue[col.id]){
					if(col.type == "boolean"){
						$tr.find(".resultTd[paramid='" + col.id + "']").find(".valueBoolean").selectivity("value", row.resultValue[col.id].value);
					}else{
						$tr.find(".resultTd[paramid='" + col.id + "']").find("input").val(row.resultValue[col.id].displayValue).data("value", row.resultValue[col.id].value).data("objectNumber", row.resultValue[col.id].objectNumber).data("objectId", row.resultValue[col.id].objectId);
					}
				}
			})
		})
	}
	
	var changeCheckBoxAllStyle = function(model){
		var isXuanZhong = $(".checkBox").hasClass(CSS_XUANZHONG);
		var isWeiXuanZhong = $(".checkBox").hasClass(CSS_WEIXUANZHONG);
		if(isXuanZhong && isWeiXuanZhong){
			$(".checkBoxAll", model.dom).removeClass(CSS_WEIXUANZHONG).removeClass(CSS_XUANZHONG).removeClass(CSS_OTHER).addClass(CSS_OTHER).addClass(CSS_BUFENXUANZHONG);
		}else if(isXuanZhong){
			$(".checkBoxAll", model.dom).removeClass(CSS_BUFENXUANZHONG).removeClass(CSS_WEIXUANZHONG).removeClass(CSS_OTHER).addClass(CSS_OTHER).addClass(CSS_XUANZHONG);
		}else{
			$(".checkBoxAll", model.dom).removeClass(CSS_BUFENXUANZHONG).removeClass(CSS_XUANZHONG).removeClass(CSS_OTHER).addClass(CSS_WEIXUANZHONG);
		}
	}
	
	var updateSeq = function(model, $tr){
		var oldSeq = $(".seqTd", $tr).html();
		var newSeq = $tr.index() + 1;
		var min = oldSeq < newSeq ? oldSeq : newSeq;
		var max = oldSeq > newSeq ? oldSeq : newSeq;
		for(var i=min;i<=max;i++){
			$(".bodyTr:eq(" + (i-1) + ") .seqTd").html(i);
		}
		
		jsonChange(model);
	}
	
	var dragTabel = function(model) {
		let temp = model
		$(model.dom).on('mouseover', '.conditionTh, .resultTh,.checkBoxTh,.seqTh', function() {	
			if (($(this).find("div").length <= 0)) {
				var cellIndex = $(this).attr('cellIndex')

				//1.鼠标移动到表头上时，在th内部添加一个div 元素，用于处理后续拖动事件
				$(this).append("<div cellIndex="+cellIndex+" class='th-sisehandler'></div>")
				//2.处理上面添加的元素的鼠标按下事件
				$(".th-sisehandler").mousedown(function (evt) {
					//3.在添加的元素上按下时，记录下当前的th表头
					let dragTh = $(this).parent()
					//4.记录按下时的鼠标位置
					let oldClientX = evt.clientX;
					//5.获取当前鼠标按下时的表头的宽度
					let oldWidth = dragTh.width();
					/*6.添加一个全局layer层，用于处理鼠标按下时鼠标移动事件，因为不能在第一步添加的元素上处理鼠标移动事件，添加的元素太小，
						鼠标容易跑出范围，就捕获不到后续事件
						所以添加一个全局的遮罩层，捕获鼠标移动事件。
					 */
					let cellIndex = $(this).attr('cellIndex')
					let changeSizeLayer = $('<div cellIndex='+cellIndex+' class="siselayer"></div>');
					$("body").append(changeSizeLayer);
					changeSizeLayer.on('mousemove', function (evt) {
						//7.处理遮罩层的鼠标移动事件，计算新的表头宽度
						var newWidth =evt.clientX - oldClientX + oldWidth;
						//设置新的宽度
						let cellIndex = $(this).attr('cellIndex')
						// 第一第二列不得小于32，其他列不得小于60
						if (cellIndex == "0" || cellIndex == "1") {
							newWidth = Number(newWidth) < 32 ? 32 : newWidth
						} else {
							newWidth = Number(newWidth) < 60 ? 60 : newWidth
						}
						let colgroups = $('.colgroup', temp.dom)  // length == 2
						$(colgroups[0].children[cellIndex]).css({width: '${Math.max(newWidth, 1)}px'})
						$(colgroups[1].children[cellIndex]).css({width: '${Math.max(newWidth, 1)}px'})

	 
					});
					changeSizeLayer.on('mouseup', function (evt) {
						//8.鼠标按键复位时，要清楚遮罩层
						changeSizeLayer.remove();
						dragTh.find('.th-sisehandler').remove();
					});
				})
			}
	 
			$(this).mouseleave(function () {
				//9.鼠标离开表头时，要移除第一步添加的div
				$(this).find("div").remove()
			})
		})
	}
	
	// 检查参数配置
	var checkParamConfig = function(model){
		return $(".decisionTableHead .titleTr", model.dom).length != 0 || model.invoke("noParam");
	}
	// 请选中一行再进行操作
	var checkSelectOne = function(model){
		return $(".decisionTableBody .bodyTr ." + CSS_XUANZHONG, model.dom).length > 0 || model.invoke("selectOne");
	}
	// 只能对选中的一行进行该操作
	var checkOnlyOne = function(model){
		return $(".decisionTableBody .bodyTr ." + CSS_XUANZHONG, model.dom).length == 1 || model.invoke("onlyOne");
	}
	// 序号重排
	var sortSeq = function(model){
		$(".decisionTableBody .seqTd").each(function(i, obj){
			$(this).html(i + 1);
		})
	}
	
	var showDate = function(model){	
		// 等待修改日期格式
		setTimeout(function(){
			// $("#ruledate", $("#" + model.pageId)).find("input").click();
			dateRelocation(model, true);
		}, 100);
	}
	
	var dateRelocation = function(model, triggerClick){
		var $element = getTrTd(model, model._datePosition.split(",")).find(".valueDateDiv");
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
		
		var interval = setInterval(function(){
			num++;
			if(num > 10){
				closeDate(model);
				clearInterval(interval);
				return;
			}
			
			if($(".j-left").length > 0){
				// if(document.body.scrollHeight < top + 28 + $(".j-left").parent().height()){//规则页面结果
				// 	$(".j-left").parent().css("top", top - $(".j-left").parent().height());
				// }else{//策略默认结果
				// 	$(".j-left").parent().css("top", top + 28)
				// }
				// $(".j-left").parent().css("left", left)
				$(".j-left").attr("id", getRuleDateId(model))
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
			// $("#ruledate", model.pageDom).find("input").blur(); 
		}, 100);
	}
	
    //事件绑定
    var initEvent = function (model) {
		dragTabel(model)
		let dateDom = $("#ruledate", $("#" + model.pageId))
		if (dateDom[0]) {
			dateDom.css({position: 'absolute', height: '30px', width: '230px'})
			dateDom.find('.kd-cq-field-title-wrap').css({display: 'none'})
			document.body.appendChild(dateDom[0])
		}
		// 链接事件
		$(model.dom).on('click', '.decisionTableControlAp .invoke', function () {
			model.invoke($(this).attr("id"));
		})		
		$(model.dom).on('click', '#addRow', function () {
			addRowEvent(model);
		})
		$(model.dom).on('click', '#insertRow', function () {
			insertRowEvent(model);
		})
		$(model.dom).on('click', '#deleteRow', function () {
			deleteRowEvent(model);
		})
		$(model.dom).on('click', '#moveUp', function () {
			moveUpEvent(model);
		})		
		$(model.dom).on('click', '#moveDown', function () {
			moveDownEvent(model);
		})		
		$(model.dom).on('click', '.valueSearch', function () {
			valueSearchEvent(model, $(this));
        })
		
		//head复选框事件
		$(model.dom).on('click', '.checkBoxAll', function () {			
			if($(this).hasClass(CSS_XUANZHONG)){//全选中 -> 全不选中
				$(this).removeClass(CSS_XUANZHONG).removeClass(CSS_OTHER).addClass(CSS_WEIXUANZHONG);
				$(".checkBox", model.dom).removeClass(CSS_XUANZHONG).removeClass(CSS_OTHER).addClass(CSS_WEIXUANZHONG);
			}else if($(this).hasClass(CSS_WEIXUANZHONG)){//全不选中 -> 全选中
				$(this).removeClass(CSS_WEIXUANZHONG).addClass(CSS_XUANZHONG).addClass(CSS_OTHER);
				$(".checkBox", model.dom).removeClass(CSS_WEIXUANZHONG).addClass(CSS_XUANZHONG).addClass(CSS_OTHER);
			}else{//部分选中 -> 全选中
				$(this).removeClass(CSS_BUFENXUANZHONG).addClass(CSS_XUANZHONG);
				$(".checkBox", model.dom).removeClass(CSS_WEIXUANZHONG).removeClass(CSS_XUANZHONG).removeClass(CSS_OTHER).addClass(CSS_XUANZHONG).addClass(CSS_OTHER);
			}
        })
		
		//body复选框事件
		$(model.dom).on('click', '.checkBox', function () {
			if($(this).hasClass(CSS_WEIXUANZHONG)){
				$(this).removeClass(CSS_WEIXUANZHONG).addClass(CSS_XUANZHONG).addClass(CSS_OTHER);
			}else{
				$(this).removeClass(CSS_XUANZHONG).removeClass(CSS_OTHER).addClass(CSS_WEIXUANZHONG);
			}
			changeCheckBoxAllStyle(model);
        })
		
		$(model.dom).off('click', '.valueDateDiv').on('click', '.valueDateDiv', function () {
			valueDateDivEvent(model, $(this));
		});
		
		$("#kd-theme").on("click", '#' + getRuleDateId(model) + " td div[data-value]", function(){
			closeDate(model);
		})	
		
		$("#kd-theme").on("click", '#' + getRuleDateId(model) + " .calendar-header-hover a", function(){
			if(model._datePosition){
				dateRelocation(model, false);
			}
		})
		
		$("#kd-theme").on("click", '#' + getRuleDateId(model) + " td div", function(){
			if(model._datePosition && $(this).closest("table").children("thead").length == 0){
				dateRelocation(model, false);
			}
		})

		// 枚举修改valueEnumText
		$(model.dom).on('blur', '.valueEnumText', function(e){
			//获取text和enumList，对比校验，有问题清除
			var displayValue = $(this).val();
			var value = $(this).val();
			var $td = $(this).parents("td");
			var enumList = getEnumList(model, $td.index());
			
			var displayValues = displayValue.split(",");
			var newDisplayValue = new Array();
			var newValue = new Array();
			$.each(enumList, function(i, obj){
				$.each(displayValues, function(j, val){
					if(getName(model, obj) == val){
						newDisplayValue.push(getName(model, obj));
						newValue.push(obj.value);
					}
				})
			})
			if(newDisplayValue.join(",") != displayValue){
				$(this).val(newDisplayValue.join(","));
				$(this).data("value", newValue.join(","));
				jsonChange(model);
			}
		})
		
		//枚举
		$(model.dom).on('click', '.valueEnumSelectDiv', function(e){
			valueEnumEvent(model, $(this));
		})
		
		$(document).on("click", function(e){
            //点击id为menu之外的元素，则触发        
            if($(e.target).closest("#multiDropDownControl").length == 0 && $(e.target).closest(".valueEnumSelectDiv").length == 0){
                $(".multiDropDownControl", model.dom).hide();
				$(e.target).closest(".valueEnumSelectDiv").find(".xialajiantou").removeClass("xiangshangjiantou")
            }
        })
		
		//下拉单选事件
		$(model.dom).on('click', '.multiDropDownControl li.Select_item_1M8z', function(){
			var position = $(".multiDropDownControl", model.dom).attr("position");
			
			var $element = getTrTd(model, position.split(",")).find(".valueEnumText");			
			var displayValue = $(this).find(".Select_text_3aTn").html();
			if(!isMulti(model, position.split(",")[1])){// 单选
				var value = $(this).find(".Select_text_3aTn").attr('value');
				setValue(model, $element, displayValue, value);
				$(".multiDropDownControl", model.dom).hide();
				$element.closest(".valueEnumSelectDiv").find(".xialajiantou").removeClass("xiangshangjiantou")
			}else{
				var value = $(this).find("input[type='checkbox']").val();
				if($(this).find(".Select_item-checkbox_P1pH").hasClass(CSS_WEIXUANZHONG)){//选中
					//枚举值修改
					var newDisplayValue = $element.val() ? $element.val() + "," + displayValue : displayValue;
					var newValue = $element.data("value") ? $element.data("value") + "," + value : value;
					setValue(model, $element, newDisplayValue, newValue);
					
					//复选框选中
					$(this).find(".Select_item-checkbox_P1pH").removeClass(CSS_WEIXUANZHONG).addClass(CSS_OTHER).addClass(CSS_XUANZHONG);
					//已选值加1
					var $selectedNumber = $(".multiDropDownControl .Select_select-totalSelected_3wgi>span", model.dom);
					$selectedNumber.html(parseInt($selectedNumber.html()) + 1);
					//如果是第一次选择，修改样式
					if($(".Select_all-checkbox_DrTC", model.dom).hasClass(CSS_WEIXUANZHONG)){
						$(".Select_all-checkbox_DrTC", model.dom).removeClass(CSS_WEIXUANZHONG).addClass(CSS_OTHER).addClass(CSS_BUFENXUANZHONG);
					}
					//如果是最后一个选中的，修改全选样式
					if(!$(".multiDropDownControl .Select_item-checkbox_P1pH", model.dom).hasClass(CSS_WEIXUANZHONG)){						
						$(".Select_all-checkbox_DrTC", model.dom).removeClass(CSS_BUFENXUANZHONG).addClass(CSS_XUANZHONG);
					}
				}else{//取消选中
					//枚举值修改
					var newDisplayValue = $element.val() == displayValue ? "" : replaceValue($element.val(), displayValue);
					var newValue = $element.data("value") == value ? "" : replaceValue($element.data("value"), value);
					setValue(model, $element, newDisplayValue, newValue);
					
					//复选框反选
					$(this).find(".Select_item-checkbox_P1pH").removeClass(CSS_XUANZHONG).removeClass(CSS_OTHER).addClass(CSS_WEIXUANZHONG);
					//已选值减1
					var $selectedNumber = $(".multiDropDownControl .Select_select-totalSelected_3wgi>span", model.dom);
					$selectedNumber.html(parseInt($selectedNumber.html()) - 1);
					//如果是全选时第一次反选，修改样式
					if($(".Select_all-checkbox_DrTC", model.dom).hasClass(CSS_XUANZHONG)){
						$(".Select_all-checkbox_DrTC", model.dom).removeClass(CSS_XUANZHONG).addClass(CSS_BUFENXUANZHONG);
					}
										
					//如果是最后一个反选的，修改全不选样式
					if(!$(".multiDropDownControl .Select_item-checkbox_P1pH", model.dom).hasClass(CSS_XUANZHONG)){
						$(".Select_all-checkbox_DrTC", model.dom).removeClass(CSS_BUFENXUANZHONG).removeClass(CSS_OTHER).addClass(CSS_WEIXUANZHONG);
					}
				}
			}			
		})
		
		//下拉全选事件
		$(model.dom).on('click', '.multiDropDownControl .Select_select-all_1f0Q', function(){
			var position = $(".multiDropDownControl", model.dom).attr("position");
			var $element = getTrTd(model, position.split(",")).find(".valueEnumText");			
			
			if($(this).children(".Select_all-checkbox_DrTC").hasClass(CSS_WEIXUANZHONG)){//未选中->全选中
				var newDisplayValue = "";
				var newValue = ""
				$(".multiDropDownControl li.Select_item_1M8z", model.dom).each(function(){
					newDisplayValue += $(this).find(".Select_text_3aTn").html() + ",";
					newValue += $(this).find(".Select_select_checkbox_16Sj").val() + ",";
				})
				newDisplayValue = newDisplayValue.substring(0, newDisplayValue.length - 1);
				newValue = newValue.substring(0, newValue.length - 1);
			
				setValue(model, $element, newDisplayValue, newValue);
			
				$(this).children(".Select_all-checkbox_DrTC").removeClass(CSS_WEIXUANZHONG).addClass(CSS_OTHER).addClass(CSS_XUANZHONG);
				$('.multiDropDownControl .Select_item-checkbox_P1pH', model.dom).removeClass(CSS_WEIXUANZHONG).addClass(CSS_OTHER).addClass(CSS_XUANZHONG);					 
				$(this).parent().find(".Select_select-totalSelected_3wgi>span").html($(".multiDropDownControl li", model.dom).length);
				//修改值
			}else{//全选中/部分选中->未选中
				setValue(model, $element, "", "");
					
				$(this).children(".Select_all-checkbox_DrTC").removeClass(CSS_BUFENXUANZHONG).removeClass(CSS_XUANZHONG).removeClass(CSS_OTHER).addClass(CSS_WEIXUANZHONG);
				$('.multiDropDownControl .Select_item-checkbox_P1pH', model.dom).removeClass(CSS_BUFENXUANZHONG).removeClass(CSS_XUANZHONG).removeClass(CSS_OTHER).addClass(CSS_WEIXUANZHONG);				
				$(this).parent().find(".Select_select-totalSelected_3wgi>span").html(0);				
			}
		})
		
		//数字
		$(model.dom).on('blur', '.valueNumber', function(){
			var value = $(this).val();
			value.replace(/^0*/, "").replace(/^0*\./, "0.");
			$(this).val(value)
			setValue(model, $(this), value, value);
		})
		
		//文本
		$(model.dom).on('blur', '.valueString', function(){
			setValue(model, $(this), $(this).val(), $(this).val());
		})
    }
	
	var replaceValue = function(oldValue, flag){
		var temp = oldValue.split(",");
		temp = temp.filter(function(str){
			return str != flag;
		});
		return temp.toString();
	}
	
	var changePageState = function(model, pageState){
		if(pageState.toLocaleLowerCase() == "view"){//查看态
			// 链接样式改变
			$(".decisionTableControlAp .AdvConToolbar_toolbarItemSingle_cursor_nVC2", model.dom).removeClass('AdvConToolbar_toolbarItemSingle_cursor_nVC2').addClass("_brc5K_TU");
			// 链接事件取消
			$(model.dom).off('click', '.decisionTableControlAp .invoke');		
			$(model.dom).off('click', '#addRow');
			$(model.dom).off('click', '#insertRow');
			$(model.dom).off('click', '#deleteRow');
			$(model.dom).off('click', '#moveUp');			
			$(model.dom).off('click', '#moveDown');	
			// 取消枚举事件
			$(model.dom).off('click', '.valueEnumSelectDiv');
			// 取消布尔事件
			$('.decisionTableBodyDiv .valueBoolean', model.dom).selectivity('setOptions', { readOnly: true })
			// 不允许编辑
			$(".bodyTr input:visible", model.dom).attr("disabled", true).css("color","#808080");	
			$(".selectivity-single-selected-item", model.dom).css("color","#808080");
			$(".selectivity-single-result-container", model.dom).css("cursor","default");			
			// 隐藏F7
			$(".valueSearch", model.dom).hide();	
			// 隐藏日期  kdfont-riqixuanze
			$(".kdfont-riqixuanze", model.dom).hide();			
			// 隐藏下拉箭头
			$(".xialajiantou", model.dom).removeClass('kdfont-xiala');			
			// 隐藏边框高亮显示
			$(".decisionTableBody tr td div.kd-hover-color", model.dom).removeClass("kd-field-border-all");
		}else{//编辑态
			// 链接样式改变
			$(".decisionTableControlAp ._brc5K_TU", model.dom).removeClass('_brc5K_TU').addClass("AdvConToolbar_toolbarItemSingle_cursor_nVC2");
			// 链接绑定事件
			$(model.dom).off('click', '.decisionTableControlAp .invoke').on('click', '.decisionTableControlAp .invoke', function () {
				model.invoke($(this).attr("id"));
			})		
			$(model.dom).off('click', '#addRow').on('click', '#addRow', function () {
				addRowEvent(model);
			})
			$(model.dom).off('click', '#insertRow').on('click', '#insertRow', function () {
				insertRowEvent(model);
			})
			$(model.dom).off('click', '#deleteRow').on('click', '#deleteRow', function () {
				deleteRowEvent(model);
			})
			$(model.dom).off('click', '#moveUp').on('click', '#moveUp', function () {
				moveUpEvent(model);
			})			
			$(model.dom).off('click', '#moveDown').on('click', '#moveDown', function () {
				moveDownEvent(model);
			})	
			// 绑定枚举事件
			$(model.dom).off('click', '.valueEnumSelectDiv').on('click', '.valueEnumSelectDiv', function(e){	
				valueEnumEvent(model, $(this));
			})
			// 绑定布尔事件
			$('.decisionTableBodyDiv .valueBoolean', model.dom).selectivity('setOptions', { readOnly: false })
			// 允许编辑
			$(".bodyTr input:visible", model.dom).attr("disabled", false).css("color","#000000");
			$(".selectivity-single-selected-item", model.dom).css("color","#000000");
			$(".selectivity-single-result-container", model.dom).css("cursor","pointer");
			// 显示F7
			$(".valueSearch", model.dom).show();	
			// 显示日期
			$(".kdfont-riqixuanze", model.dom).show();
			// 显示下拉箭头
			$(".xialajiantou", model.dom).addClass('kdfont-xiala');
			// 显示下划线高亮
			$(".decisionTableBody tr td div.kd-hover-color", model.dom).addClass("kd-field-border-all");
		}
	}
	
	var valueEnumEvent = function(model, $element){
		var $td = $element.parents("td");
		var $tr = $td.parent();
		var position = $tr.index() + "," + $td.index();
		var isOld = (position == $(".multiDropDownControl", model.dom).attr("position"));
		$element.attr("position", position);	
		
		if(!isOld || $(".multiDropDownControl", model.dom).is(":hidden")){// 点击其他枚举控件时或者未显示下拉，展示下拉
			var enumList = getEnumList(model, $td.index());
			createValueEnumControl(model, enumList, $element.find(".valueEnumText").val() || "", $td.index(), $element.css("width"));
			$(".multiDropDownControl", model.dom).show();
			var top = $element.offset().top + 28;
			if(document.body.scrollHeight < top + $(".multiDropDownControl .j-right", model.dom).height()){
				top = top - $(".multiDropDownControl .j-right", model.dom).height() - 28 - 11;
			}
			var left = $element.offset().left;
			$(".multiDropDownControl", model.dom).css("top", top).css("left", left).attr("position", position);
			$element.find(".xialajiantou").addClass("xiangshangjiantou");
		}else{
			$(".multiDropDownControl", model.dom).hide();
			$element.find(".xialajiantou").removeClass("xiangshangjiantou");
		}
	}
	
	// 链接绑定事件		
	var addRowEvent = function(model){
		if(!checkParamConfig(model)){				
			return;
		}
		
		addRows(model, 1);
		changeCheckBoxAllStyle(model);
	}
	
	var insertRowEvent = function(model){
		if(!checkParamConfig(model) || !checkSelectOne(model) || !checkOnlyOne(model)){				
			return;
		}
		
		var index = $(".decisionTableBody .bodyTr .kdfont-fuxuankuangxuanzhong_fang", model.dom).parent().parent().find(".seqTd").html();
		
		insertRows(model, index);
		changeCheckBoxAllStyle(model);			
		sortSeq(model);
	}
	
	var deleteRowEvent = function(model){
		if(!checkParamConfig(model) || !checkSelectOne(model)){				
			return;
		}
		
		deleteRows(model);
		changeCheckBoxAllStyle(model);
		sortSeq(model);		
	}
	
	var moveUpEvent = function(model){			
		if(!checkParamConfig(model) || !checkSelectOne(model) || !checkOnlyOne(model)){	
			return;
		}
		
		var $tr = $(".decisionTableBody .bodyTr ." + CSS_XUANZHONG, model.dom).parents("tr");			
		if($tr.prev().hasClass('colgroup') || $tr.prev().length == 0){
			model.invoke("noMoveUp");
			return;
		}
		$tr.prev().before($tr);		
		sortSeq(model);
		
		jsonChange(model);	
	}
	
	var moveDownEvent = function(model){				
		if(!checkParamConfig(model) || !checkSelectOne(model) || !checkOnlyOne(model)){	
			return;
		}
		
		var $tr = $(".decisionTableBody .bodyTr ." + CSS_XUANZHONG, model.dom).parents("tr");
		if($tr.next().length == 0){
			model.invoke("noMoveDown"); //只能对选中的一行进行该操作
			return;
		}
		$tr.next().after($tr);
		sortSeq(model);
		
		jsonChange(model);			
	}
		
	// 获取枚举显示值，对应多语言没值时取中文
	var getName = function(model, obj){
		return obj.name[model.lang] || obj.name['zh_CN'];
	}
	
	var createValueEnumControl = function(model, enumList, displayValue, col, width){
		$(".multiDropDownControl", model.dom).html('');
		
		var html = '<div class="Select_panel_ih2B commonAnimation_panel-drop-down-animation_Pq1y j-right" style="min-width: ' + width + '; max-width: 600px; width:' + width + ';">';
		if(!isMulti(model, col)){//单选
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
						+'<span class="Select_select-all-selected_22q_">' + KDApi.getLangMsg(model, 'allselect') + '</span>'
					+'</div>'
					+'<span class="Select_select-hasSelected_3dsH">' + KDApi.getLangMsg(model, 'selected') + '</span>'
					+'<span class="Select_select-selectedCount_n-4v">'
						+'<a class="Select_select-totalSelected_3wgi theme-fc"><span>'+selectedNumber+'</span></a>'
						+'<span>' + KDApi.getLangMsg(model, 'term') + '</span>'
					+'</span>'
				+'</div>';
		}
		html += '</div>';
		
		$(".multiDropDownControl", model.dom).append(html);
	}
	
	//更新日期
	var updateDateValue = function(model, date){
		getTrTd(model, model._datePosition.split(",")).find(".valueDate").val(date).data("value", date);
		
		jsonChange(model);
	}

	//更新参数值
	var updateValue = function(model, data){
		$td = getTrTd(model, data.index.split(","));
		$input = $td.find("input");
		$input.val(data.nameList.join(",") || data.idList.join(",")).data("value", data.idList.join(","));
		if(isAdminOrg4ParamType(model, $td)){
			$input.data("objectNumber", data.numberList.join(","));
			$input.data("objectId", data.idList.join(","));
		}
		
		jsonChange(model);
	}	
	
	var clearValues = function(model, id){
		$(".conditionTd[paramid='"+id+"'] input", model.dom).val('').data('value', '');
	}
	
	var setValue = function(model, $element, displayValue, value){
		$element.val(displayValue).data("value", value);
		jsonChange(model);
	}
	
	var isAdminOrg4ParamType = function(model, $td){
		//只有条件才判断是否是特殊类型
		if($td.hasClass("conditionTd") && getCondtionThTd(model, $td.attr("paramid")).attr("category") == "adminOrg"){	
			return true;			
		}
		return false;
	}
	
	var getCondtionThTd = function(model, id){
		return $(".conditionTh[paramid='" + id + "']", model.dom);
	}
	
	var getThTd = function(model, col){
		return $(".decisionTableHead .headTr th:eq("+col+")", model.dom);
	}
	
	var getTrTd = function(model, position){
		// 可能会在tr上面加上tbody，所以必须改成这样....
		return $(".decisionTableBody tr:eq(0)", model.dom).parent().children().eq(position[0]).find("td:eq(" + position[1] + ")");
	}	
	var getDateFormat = function(model, col){
		return getThTd(model, col).attr("dateFormat");
	}
	var isMinOrgFirst = function(model, col){
		return getThTd(model, col).attr("isminorgfirst");
	}
	var getType = function(model, col){
		return getThTd(model, col).attr("type");
	}
	var getOpt = function(model, col){
		return getThTd(model, col).attr("opt");
	}
	var getDisplayCondition = function(model, col){
		return getThTd(model, col).find(".displayName").html();
	}
	var isEnum = function(model, col){
		return getType(model, col) != "dynamicObject" && getThTd(model, col).attr("data") ? true : false;
	}
	var isMulti = function(model, col){
		var opt = getOpt(model, col);
		return (opt == "~==" || opt == "~!=" || opt == "in" || opt == "not_in" || opt == "is_or_isSub") || getThTd(model, col).attr("isMulti") == "true";
	}	
	var getEnumList = function(model, col){	
		if(isEnum(model, col)){
			var enumList = JSON.parse(getThTd(model, col).attr("data"));
			var newList = new Array();
			$.each(enumList, function(i, obj){				
				if(obj.itemVisible == undefined || obj.itemVisible){
					newList.push(obj)
				}
			});
			return newList;
		}
		return [];
	}
	var getValue = function(model, $td){
		var value = "";	
		var type = getType(model, $td.index());		
		if(isAdminOrg4ParamType(model, $td)){
			value = $td.find("input").data("objectId") || "";
		}else if(type == "boolean"){
			// 由于boolean类型的input被样式隐藏了，只能这么写
			value = $td.find(".valueBoolean").selectivity("value") || "";
		}else{
			value = $td.find("input").data("value") || "";
		}
		return value;
	}
	var getData = function(model, $td){
		var type = getType(model, $td.index());
		var objectId = $td.find("input").data("objectId") || "";
		var objectNumber = $td.find("input").data("objectNumber") && $td.find("input").data("objectNumber").toString() || "";
		
		// 如果是行政组织包含下级，则value为number
		var opt = getOpt(model, $td.index());
		var value = "";
		if(isAdminOrg4ParamType(model, $td) && "is_or_isSub" == opt){
			value = objectNumber;
		}else{
			if(type == "boolean"){
				// 由于boolean类型的input被样式隐藏了，只能这么写
				value = $td.find(".valueBoolean").selectivity("value");
			}else{
				value = $td.find("input").data("value");
			}
		} 
		
		var displayValue = $td.find("input").val();		
		return {
			displayCondition : getDisplayCondition(model, $td.index()),
			opt : opt,//必须传，为空的时候判断
			displayValue : displayValue || "",
			value : value || "",
			type : type,
			dateFormat : getDateFormat(model, $td.index()),
			objectId : objectId,
			objectNumber : objectNumber,
			isMinOrgFirst : isMinOrgFirst(model, $td.index())
		}
	}
	
	var jsonChange = function(model){
		if(model.initing !== "true"){//只需要更新body，head由配置参数更新
			model._tableBody = getDecisionBodyJson(model);
			var decisionBodyJson = JSON.stringify(model._tableBody);
			//console.log(decisionBodyJson);
			model.invokeCustomMethod("setTableBody", decisionBodyJson);
		}
	}	
	
	var getDecisionBodyJson = function(model){
		var result = [];
		$(".decisionTableBody .bodyTr", model.dom).each(function(i){
			result[i]={}
			result[i].conditionValue={};
			result[i].resultValue={};
			$(this).find("td").each(function(){
				if($(this).hasClass("conditionTd")){
					result[i].conditionValue[$(this).attr("paramid")] = getData(model, $(this));
				}
				if($(this).hasClass("resultTd")){
					result[i].resultValue[$(this).attr("paramid")] = getData(model, $(this));
				}				
			});
		});
		return result;
	}
	
    KDApi.register('decisiontable', Decisiontable, {isMulLang: true})
})(window.KDApi, jQuery)