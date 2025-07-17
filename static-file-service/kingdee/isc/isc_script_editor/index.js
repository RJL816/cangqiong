var ISC_SCRIPT_CACHE = {};
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

		// 生命周期：初始化脚本编辑器
		init : function(props) {
			console.log('-----init', this.model, props);
			
			this.id = "ISC_SCRIPT_EDITOR_" + new Date().getTime();

			// 模板字符串
			var template = '<iframe id="<%=id%>" style="width:<%=width%>px;height:<%=height%>px;border:none" src="<%=href%>"></iframe>';
			var href = KDApi.getNameSpace(this.model) + 'editor.html?id=' + this.id;			
			window.ISC_SCRIPT_CACHE[this.id] = { data: props.data, editor : this.model};
			
			var result = KDApi.getHTMLStringBytemplate(template, {id: this.id, height : props.data.height,width : props.data.width, href : href});
			this.model.dom.innerHTML = result;
			
		},

		// 生命周期：获取脚本编辑器的内容
		update : function(props) {
			console.log('-----update', this.model, props);
			
			if("get_script_data" == props.data.cmd){
				var iframe = document.getElementById(this.id);
				var script = iframe.contentWindow.getEncodedScript();
				console.info("script", script);
				this.model.invoke("return_script_data", script);
			}
			
			if("only_get_script_data" == props.data.cmd){
				var iframe = document.getElementById(this.id);
				var script = iframe.contentWindow.getEncodedScript();
				console.info("script", script);
				this.model.invoke("only_return_script_data", script);
			}
			
			if("set_script_data" == props.data.cmd){
				var iframe = document.getElementById(this.id);
				var script = props.data.script;
				var breakpoints = props.data.breakpoints;
				iframe.contentWindow.setValue(script, breakpoints);
			}
			 if("insert_script_example" == props.data.cmd){
				var iframe = document.getElementById(this.id);
				var script = props.data.script;
			    iframe.contentWindow.insertScriptExample(script);
			}
			 if("set_code_readOnly" == props.data.cmd){
				var iframe = document.getElementById(this.id);
				var readOnly = props.data.readOnly;
			    iframe.contentWindow.setReadOnly(readOnly);
			}
		},

		// 生命周期：销毁
		destoryed : function() {
			window.ISC_SCRIPT_CACHE[this.id] = null;
			console.log('-----destoryed', this.model);
		}
	}

	// 注册自定义控件
	KDApi.register('isc_script_editor', MyComponent);
})(window.KDApi, jQuery)
