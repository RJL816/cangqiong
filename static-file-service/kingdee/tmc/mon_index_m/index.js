(function(KDApi, $) {
	function MyComponent(model) {
		this._setModel(model)
	}

	MyComponent.prototype = { // 内部函数不推荐修改
		_setModel : function(model) {
			this.model = model // 内部变量挂载
		},
		init : function(props) {
			console.log('-----init', this.model, props)
			setHtml(this.model, props);
		},
		update : function(props) {
			console.log('-----update', this.model, props)
			updateHtml(this.model, props);
		},
		destoryed : function() {
			console.log('-----destoryed', this.model)
		}

	}

	//var dataText_new_Template;
	//var noDataText;
	//var f7Key;

	/*
	 * 外部函数声明
	 */
	var setHtml = function(model, props, isUpdate) {
		// # 从元数据自定义组件配置项中读取组织文本描述
		var ciArr = model.metaData.ci;
		var f7Key;
		for(var i in ciArr){
			var ci = ciArr[i];
			if(ci['key'] == "f7Key"){
				f7Key = ci['value'];
			}
		}

		// # 将平台默认生成的文本展示div隐藏，另外再建立一个兄弟div
		var dataTextDom = document.querySelector("[data-page-id='"+model.pageId+"_"+ f7Key +"']>div>div>div:nth-of-type(1)");
		dataTextDom.style.display = 'none';
		dataTextDom.insertAdjacentHTML('afterEnd', '<div id="id_'+ model.pageId +'_'+ f7Key +'_TextNew" style="text-align: center;"></div>');
	}

	var updateHtml = function(model, props) {

    let metadata = model.metaData.ci
    let config = {}

    if (metadata) {
      metadata.forEach(element => {
        config[element.key] = element.value
      })
    }

    var dataText_new_Template = config[`dataDescTemplate_${model.lang}`] || config.dataDescTemplate;
		var noDataText = config[`noDataText_${model.lang}`] || config.noDataText;
		var f7Key = config.f7Key;

		// var ciArr = model.metaData.ci;
		// var dataText_new_Template;
		// var noDataText;
		// var f7Key;
		// for(var i in ciArr){
		// 	var ci = ciArr[i];
		// 	if(ci['key'] == "dataDescTemplate"){
		// 		dataText_new_Template = ci['value'];
		// 	}else if(ci['key'] == "noDataText"){
		// 		noDataText = ci['value'];
		// 	}else if(ci['key'] == "f7Key"){
		// 		f7Key = ci['value'];
		// 	}
		// }
	
		if(!props.data) return;
		var dataTextDom_new = document.querySelector("#id_"+ model.pageId +"_"+ f7Key +"_TextNew");
		if(props.data.noData){
			dataTextDom_new.innerHTML = noDataText;
		}else{
			var dataText = props.data.dataName;
			var dataCount = props.data.dataCount;
			if(dataCount > 1){
				dataText = formatStr(dataText_new_Template, dataText, dataCount);
			}
			dataTextDom_new.innerHTML = dataText;
		}
	}

	function formatStr(){
		var template = arguments[0];
		var args = [];
		for(var i = 1; i < arguments.length; i++){
			args.push(arguments[i]);
		}
	    return template.replace(/{(\d+)}/g, function(match, number) { 
	      return typeof args[number] != 'undefined'
	        ? args[number]
	        : match
	      ;
	    });
	}

	/*
	 * 将主题色转为对应色值
	 */
	function getThemeColor(themeColor) {
		switch (themeColor) {
		case 'blue':
			return '#5582F3'
		case 'green':
			return '#29C392'
		case 'orange':
			return '#FC8555'
		case 'purple':
			return '#6869FB'
		}
	}

	console.log('-----------------init')
	// 注册自定义控件
	KDApi.register('mon_index_m', MyComponent, {
		isMulLang : false
	})
})(window.KDApi)