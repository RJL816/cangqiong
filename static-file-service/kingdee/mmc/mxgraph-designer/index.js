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
			initData(this.model);
		},
		update: function (props) {
			console.log("----更新中台设计器----", this.model, props);
			if (props && props.data) {
				this.model.invoke("clear", "");
				const params = props.data;
				updateData(this.model, params);
			}
		},
		destoryed: function () {
			console.log("----关闭中台设计器----", this.model);
		}
	}

	function initData(model) {
		KDApi.templateFilePath("./designer.html", model, null).then(
			function (result) {
				model.dom.innerHTML = result;
				KDApi.loadFile("../mxClient.js", model, function () {
					if (mxClient == null) {
						console.log("----mxClient.js load faield----");
						return;
					}
					KDApi.loadFile("./designer.js", model, function () {
						let designerContainer = document.getElementById('designerContainer');
						designerContainer.id = Math.random();
						if (designerContainer != null) {
							let graph = designerInit(designerContainer, model);
							addListener(graph);
							// 发送请求到后端，请求数据初始化画板
							model.invoke("init", "");
							model.graph = graph;
						}
					});
				});
			}
		);
	};

	function updateData(model, params) {
		const action = params["action"];
		let graph = model.graph;
		switch (action) {
			case "import":
				importGraphXml(graph, params);
				break;
			case "showEigenvalue":
				showEigenvalue(graph, params);
				break;
			default:
				break;
		}
	};

	function importGraphXml(graph, params) {
		var xml = params["returnData"];
		if (typeof(xml) == "undefined" || xml.trim().length == 0) {
			console.log("参数XML为空");
			return;
		}
		var running = params["running"];
		graph.isRun = running;
		graph.setEnabled(false);
		graph.isImporting = true;
		graph.getModel().beginUpdate();
		try {
			var rootxml = mxUtils.parseXml(xml);
			var root = rootxml.documentElement;
			var dec = new mxCodec(root.getDocumentElement);
			dec.decode(root, graph.getModel());
		} finally {
			graph.getModel().endUpdate();
			graph.isImporting = false;
		}
		if (running) {
			graph.pageModel.invoke("afterImportGraphXml", "");
		}
	};

	function showEigenvalue(graph, params) {
		var dataMap = params["returnData"];
		graph.getModel().beginUpdate();
		try {
			var map = JSON.parse(dataMap);
			for (var key in map) {
				var cell = graph.getModel().getCell(key);
				if (cell != null && cell != undefined) {
					cell.value = map[key];
				}
			}
			graph.refresh();
		} finally {
			graph.getModel().endUpdate();
		}
	};

	console.log("----注册中台设计器----");
	KDApi.register('mxgraph-designer', MyComponent);
})(window.KDApi, jQuery, _);
