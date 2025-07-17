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
			paramsMap["Action"]="Initial";
			props.data=paramsMap;
			invokeMGDesigner(this.model, props);
		},
		update: function (props) {
			console.log("----更新中台设计器----", this.model, props);
			if (props&&props.data) {
				var paramsMap = props.data;
				var mgAction = paramsMap["Action"];
				if (!(mgAction=="Initial")){
					invokeMGDesigner(this.model, props);
				}
			}
			if (props && props.data){
				this.model.invoke("ClearControlData", this.model.schemaId);
			}
		},
		destoryed: function () {
			console.log("----关闭中台设计器----", this.model);
			
		}
	} 
	
	var invokeMGDesigner = function (model, props) {
		if (!props || !model) return;
		var paramsMap = props.data;
		var schemeID = model.schemaId;
		if (!paramsMap || typeof(paramsMap)!="object") return;
		if (!schemeID || typeof(schemeID)!="string") return;
		var mgAction = paramsMap["Action"];
		if (!mgAction || typeof(mgAction)!="string") return;
		if (mgAction=="Initial"){
			KDApi.templateFilePath("./phmDesigner.html", model,null).then(
				function (result) {
					model.dom.innerHTML = result;
					KDApi.loadFile("../mxClient.js", model, function()
					{
						if (mxClient==null) {
							alert('加载mxClient失败');
							return;
						}else{
							// 注册算法模型所需js脚本
							if ($("div[data-form-id='mrp_businessplan']").length > 0) {
								KDApi.loadFile("./phmDesigner.js", model, function() 
								{
									
									KDApi.loadFile("./algoModelDes.js", model, function() 
									{
										mgDesigner=model;
										var mgDesignerContainer=document.getElementById('mgDesignerContainer');
										mgDesignerContainer.id=Math.random();
										if (mgDesignerContainer!=null){
											var phmMgGraph = initialPHM(mgDesignerContainer,model);
											initPHMData(model,paramsMap);
											model.graph = phmMgGraph;
										}
									});
								});
							} else {
								KDApi.loadFile("./phmDesigner.js", model, function()
								{
									var mgDesignerContainer=document.getElementById('mgDesignerContainer');
									mgDesignerContainer.id=Math.random();
									if (mgDesignerContainer!=null){
										var phmMgGraph = initialPHM(mgDesignerContainer,model);
										initPHMData(model,paramsMap);
										model.graph = phmMgGraph;
									}
								});
							}
						}
					});
				}
			);
		}else if (mgAction=="addElement"){
			addElement(model,paramsMap);
		}else if(mgAction=="saveMxgraph"){
			savePHMMxgraph(model);
		}else if(mgAction=="addxml"){
			addPHMxml(model,paramsMap);
		}else if(mgAction=="cleanGraph"){
			cleanGraph(model,paramsMap);
		}else if(mgAction=="deleteCells"){
			deleteCells(model,paramsMap);
		}else if(mgAction=="updateGraph"){
			updateGraph(model,paramsMap);
		}else if(mgAction=="setMxValue"){
			setMxValue(model,paramsMap);
		}else if(mgAction=="updateModelname"){
			updateModelname(model,paramsMap);
		}else if(mgAction=="initPHMXmlData"){
			initPHMXmlData(model,paramsMap);
		}else if(mgAction=="phmF7Import"){
			phmF7Import(model,paramsMap);
		}else if(mgAction=="deletePHMCell"){
			deletePHMCell(model,paramsMap);
		}else if(mgAction=="addPHMNode"){
			addPHMNode(model,paramsMap);
		}
	}
	console.log("----注册中台设计器----");
	KDApi.register("phmdesigner", MyComponent);
})(window.KDApi, jQuery, _);
