(function (KDApi, $, _) {
	function MyComponent(model) {
		this._setModel(model);
	}

	MyComponent.prototype = {
		_setModel: function (model) {
			this.model = model;
		},
		init: function (props) {
			console.log("----初始中台设计器----", this.model, props);
			var paramsMap = new Object();
			paramsMap["Action"] = "Initial";
			props.data = paramsMap;
			initContainer(this.model, props);
		},
		update: function (props) {
			console.log("----更新中台设计器----", this.model, props);
			if (props&&props.data) {
				this.model.invoke("ClearControlData", this.model.schemaId);
				var paramsMap = props.data;
				var mgAction = paramsMap["Action"];
				if (!(mgAction=="Initial")){
					invokeMGDesigner(this.model, props);
				}
			}
		},
		destoryed: function () {
			console.log("----关闭中台设计器----", this.model);
		}
	}

	var initContainer = function (model, props) {
		if (!props || !model) return;
		var paramsMap = props.data;
		var schemeID = model.schemaId;
		if (!paramsMap || typeof (paramsMap) != "object") return;
		if (!schemeID || typeof (schemeID) != "string") return;
		var mgAction = paramsMap["Action"];
		if (!mgAction || typeof (mgAction) != "string") return;
		if (mgAction == "Initial") {
			KDApi.loadFile(['./src/layui/css/layui.css','./src/layui/layui.js','./src/fonts/iconfont.css', './src/css/demo.css'], model, function () {
				KDApi.templateFilePath("./bizDesigner.html", model, null).then(
					function (result) {
						model.dom.innerHTML = result;
						KDApi.loadFile("../mxClient.js", model, function () {
							if (mxClient == null) {
								alert('加载mxClient失败');
								return;
							} else {
								KDApi.loadFile("./bizDesigner.js", model, function () {
									var mgDesignerContainer = document.getElementById('mgDesignerContainer');
									mgDesignerContainer.id = Math.ceil(Math.random()*100000000);
									if (mgDesignerContainer != null) {
										var graph = bizinitial(model, mgDesignerContainer);
										model.invoke("getElementGroup", "");
										model.graph = graph;
									}
								});

							}
						});
					}
				);
			});
		}
	}

	var invokeMGDesigner = function (model, props) {
		if (!props || !model) return;
		var paramsMap = props.data;
		var schemeID = model.schemaId;
		if (!paramsMap || typeof (paramsMap) != "object") return;
		if (!schemeID || typeof (schemeID) != "string") return;
		var mgAction = paramsMap["Action"];
		if (!mgAction || typeof (mgAction) != "string") return;
		var graph = model.graph;
		if (mgAction == "init") {
			bizInit(paramsMap, graph);
		} else if (mgAction == "showAll") {
			showAll(paramsMap, graph);
		} else if (mgAction == "deleteDetailById") {
			removeDetail(paramsMap, graph);
		}else if (mgAction == "deleteCells") {
			deleteCells(paramsMap, graph);
		}else if (mgAction == "setMxValue") {
			setMxValue(model, paramsMap, graph);
		} else if (mgAction == "updateStyle") {
			updateStyle(paramsMap, graph);
		} else if (mgAction=="updateLabel") {
			updateLabel(paramsMap, graph);
		} else if (mgAction=="changeDetailPage") {
			changeDetailPage(paramsMap["detail"], graph.container.id, graph);
		} else if(mgAction=="updateTxt"){
			updateTxt(paramsMap, graph);
		} else if(mgAction=="addStyle"){
			addStyle(paramsMap, graph);
		} else if(mgAction=="removeCells"){
			removeCells(paramsMap, graph);
		} else if(mgAction=="importFlowFromXML"){
			importFlowFromXML(paramsMap, graph);
		} else if(mgAction=="updateDetailStyle"){
			updateDetailStyle(paramsMap, graph);
		} else if(mgAction=="setDetailVisible"){
			setDetailVisible(paramsMap, graph);
		} else if(mgAction=="showDrillingDetail"){
			goDrDetail(paramsMap, graph);
		} else if(mgAction=="updateEdgeHeight"){
			updateEdgeHeight(paramsMap, graph);
		} else if (mgAction=="updataValueById"){
			updataValueById(graph,paramsMap["dataMap"]);
		} else if(mgAction=="updateXmlAndDetailXY"){
			updateXmlAndDetailXY(paramsMap, graph);
		} else if(mgAction=="updateQueryHeight"){
			updateQueryHeight(paramsMap, graph);
		} else if(mgAction=="cancelSelect"){
			cancelSelect(paramsMap, graph);
		} else if(mgAction=="restoreSelect"){
			restoreSelect(paramsMap, graph);
		} else if(mgAction=="setBackground"){
			setBackground(paramsMap, graph);
		}  else if(mgAction=="initElementGroup") {
			KDApi.getTemplateStringByFilePath("./src/temp.html", model, {data:paramsMap["returnData"]}).then(
				function(result) {
					var container = $("div[data-page-id='" + model.pageId + "_customcontrolap']").find("#element_panel")[0];
					// var container = document.querySelector("#element_panel");
					container.innerHTML = result;
					initLeftPanelEvent();
					function initLeftPanelEvent(mgGraph, dataMap) {
						var tabs = $("div[data-page-id='" + model.pageId + "_customcontrolap']").children("#mmc_bizDesigner").children(".left-panel").find(".tabs").children("span");
						tabs.each(function (index) {
						$(this).click(function () {
							$(this).siblings().removeClass("active");
							$(this).addClass("active");
							$("div[data-page-id='" + model.pageId + "_customcontrolap']").children("#mmc_bizDesigner").children(".left-panel").find(".transform-box").css({
								transform: `translateX(${-260 * index}px)`
							});
						});
						});
						var cardTitle = $("div[data-page-id='" + model.pageId + "_customcontrolap']").children("#mmc_bizDesigner").children(".left-panel").find(".card-item-title");
						cardTitle.each(function (index) {
							$(this).click(function () {
								var _this = $(this).parent();
								_this.hasClass("unactive") ? _this.removeClass("unactive") : _this.addClass("unactive");
							});
						});
						$("div[data-page-id='" + model.pageId + "_customcontrolap']").children("#mmc_bizDesigner").children(".left-panel").children(".panel-toggle").click(function () {
							var _this = $(this).parent();
							var _mb_box = _this.parent();
							if (_this.hasClass("unactive")) {
							  _this.removeClass("unactive");
							  _mb_box.removeClass("large");
							} else {
							  _this.addClass("unactive");
							  _mb_box.addClass("large");
							}
						});
					};
					if (paramsMap["isRun"]) {
						$("div[data-page-id='" + model.pageId + "_customcontrolap']").children("#mmc_bizDesigner").addClass("running");
					}
					bizinitData(model, paramsMap);
				}
			);
		} else if(mgAction=="eigen_detail"){
			eigenDetail(paramsMap, graph);
		}
	}
	console.log("----注册中台设计器----");
	KDApi.register("bizdesigner", MyComponent);
})(window.KDApi, jQuery, _);
