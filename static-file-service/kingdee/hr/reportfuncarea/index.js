(function(KDApi, $){
	function Expression (model) {
        this._setModel(model)
    }

    Expression.prototype = {
        _setModel: function(model) {
            this.model = model;
			globalModel = model;
			this.model.fields = new Array();
        },
        init: function(props){
            initFunc(this.model, props)
        },
        update: function(props){
            updateFunc(this.model, props)
        },
        destoryed: function(){
		
        }
    }
	
	var initFunc = function(model, props) {
        // KDApi.loadFile可以通过路径加载js或css文件，并且在html文件头生成script或者link标签，第一个参数是路径，第二个参数是model，第三个参数是加载完成后执行的回调函数
        KDApi.loadFile(['./js/codemirror.js','./css/codemirror.css'], model, function(){
			KDApi.loadFile('./js/customTargetMode.js', model, function () {
				KDApi.loadFile('./css/reportfuncarea.css', model, function() {
					// 后端插件通过setData传给前端的数据，前端可以通过props.data去获取
					var text = props.data && props.data.text || ''
					// 通过路径去获取html字符串，第一个参数是路径，第二个参数是model，第三个参数是HTML模板中变量的值
					KDApi.getTemplateStringByFilePath('./html/reportfuncarea.html', model, {
						text: text
					}).then(function(data) {
						model.dom.innerHTML = data
						// 绑定DOM事件
						initEvent(model, props)
						//初始化数据
						model.invoke('initExpressionTextDataEvent');
					})        
				})
			})
		})
    }
	
	// 事件绑定
    var initEvent = function(model, props){
		// 表达式编辑框数据改变时需要向后台传数据
		$(model.dom).on('change', '#expressionText', function(){
			model.invoke('returnExpressionText', $("#expressionText").val());
		});
	}
	
	var updateFunc = function(model, props) {
		if(props.data){
			if (props.data.displayExpression !== null) {
				if (props.data.method === "init") {
				    model.fields = props.data.fields;
					createExpression(model, props, "edit");
				} else if (props.data.method === "change") {
					changeFields(model, props);
				} else {
					updateValue(model, props.data.displayExpression, props.data.updateType);
				}
			} else {
				if (props.data.method === "change") {
					changeFields(model, props);
				} else {
					if (props.data.fields) {
						model.fields = props.data.fields;	
					}
					createExpression(model, props, "new");
				}
			}
		}
    }
	
	function changeFields(model, props) {
		// 修改字段列表
		model.fields = props.data.fields;
		model.exprEditor.toTextArea();
		createExpression(model, props, "edit");
	}
	
	var updateValue = function(model, data, updateType){
		if (updateType === "replaceAll") {
			model.exprEditor.setValue(data);
		} else {
			insertAtCursor(model, data);
		}
	}
	
	function insertAtCursor(model, text) {
	    var expressionField = window.document.getElementById('expressionText')
        
		model.exprEditor.replaceSelection(text)
	}
	
	var createExpression = function(model, props, createMethod) {
		var propertyKeyWord = ['+', '-', '(', ')', '*', '/', '<', '>', '>=', '<=', '=', '!='];
		var inputParams = model.fields;
		TargetExpressionCodeMirror.defineMIME('text/customTarget', {
            propertyKeyWord: propertyKeyWord,
			inputParams: inputParams,
            tokenHooks: {},
            name: 'customTarget'
		})
		
		model.exprEditor = TargetExpressionCodeMirror.fromTextArea($('#expressionText', model.dom)[0], {
            value: createMethod === 'edit' ? props.data.displayExpression : '',
            lineNumbers: false, // 是否显示行号
            extraKeys: { 'Alt': 'autocomplete' }, // 定义自动补全的快捷键
            mode: 'customTarget', // 自定义的mode名称
            readOnly: false,
            lineWrapping: 'wrap'
		})
		
		model.exprEditor.on("change",function(){
			model.invoke('returnExpressionText', getEditorValue(model));
		});
		
		setEditorValue(model, createMethod === 'edit' ? props.data.displayExpression : '')
	}
	
	var getEditorValue = function (model) {
		return model.exprEditor.getValue();
    }
	
	var setEditorValue = function(model, value) {
        model.exprEditor.setValue(value)
        model.exprEditor.save()
    }
	
	var insertEditorValue = function (model, value) {
		model.exprEditor.replaceSelection(value)
    }
	
	// 动态修改公式平台配置
	var setOption = function(property, model, value){
		model.exprEditor.setOption(property, value)
	}
	
    KDApi.register('reportfuncarea', Expression)
})(window.KDApi, jQuery)