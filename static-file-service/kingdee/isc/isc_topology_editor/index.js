var ISC_BIZ_FLOW_GRAPH_COUNT = 0;

(function(KDApi, $) {
	// 构造函数
	function MyComponent(model) {
		this._setModel(model)
	}

	MyComponent.prototype = {
		// 绑定model
		_setModel : function(model) {
			this.model = model
		},

		// 生命周期：初始化，用于生成流程图编辑器
		init : function(props) {
			console.log('-----init', this.model, props);
			window.ISC_FLOW_EDITOR = this;
			this.data = props.data;
			this.id="ISC_BIZ_FLOW_GRAPH" + (++ ISC_BIZ_FLOW_GRAPH_COUNT);

			// 模板字符串
			var template = '<iframe id="'+this.id+'" style="width:<%=width%>px;height:<%=height%>px;border:none" src="<%=href%>"></iframe>';

			var w = $(window);
			var metajs = this.data["meta.js"];
			if("meta.js" == metajs || "subFlowMeta.js" == metajs){
				var offsetW = 54;
				var offsetH = 142;
			}else{//节点块
				var offsetW = 60;
				var offsetH = 160;
				
				if(w.width() < 1860){
					offsetW = 4;
				}
				if(w.height() < 840){
					offsetH = 120;
				}
			}
			
			var href = KDApi.getNameSpace(this.model) + 'editor.html'
			var result = KDApi.getHTMLStringBytemplate(template, {
				height : w.height() - offsetH,
				width : w.width() - offsetW,
				href : href
			});
			
			this.model.dom.innerHTML = result;
		},

		// 生命周期：更新，用于更新流程图节点和连接的标题
		update : function(props) {
			if (this.data == props.data) {
				return;// 初始化不需要再执行
			}

			console.log('-----update', this.model, props)
			var iframe = document.getElementById(this.id);
			iframe.contentWindow.updateView(props.data);
		},

		// 生命周期：销毁
		destoryed : function() {
			console.log('-----destoryed', this.model);
		}
	}

	// 注册自定义控件
	KDApi.register('isc_topology_editor', MyComponent);
})(window.KDApi, jQuery)
