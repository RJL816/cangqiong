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
            if (props.data) {
			  updateFunc(this.model, props)
			}
        },
        destoryed: function(){
		
        }
    }
	
	var initFunc = function(model, props) {
        // KDApi.loadFile可以通过路径加载js或css文件，并且在html文件头生成script或者link标签，第一个参数是路径，第二个参数是model，第三个参数是加载完成后执行的回调函数
        KDApi.loadFile(['./js/codemirror.js','./css/codemirror.css'], model, function(){
			KDApi.loadFile('./js/titleTargetMode.js', model, function () {
				KDApi.loadFile('./css/warnmsg.css', model, function() {
					// 后端插件通过setData传给前端的数据，前端可以通过props.data去获取
					var text = props.data && props.data.text || ''
					// 通过路径去获取html字符串，第一个参数是路径，第二个参数是model，第三个参数是HTML模板中变量的值
					KDApi.getTemplateStringByFilePath('./html/warnmsgtitle.html', model, {
						text: text,
						// disabled: ["VIEW","SUBMIT",'AUDIT'].includes(props.data.viewStatus),
						placeholder: KDApi.getLangMsg(model, 'placeholder'),
						tips: KDApi.getLangMsg(model, 'tips')
					}).then(function(data) {
						model.dom.innerHTML = data
						// 绑定DOM事件
						initEvent(model, props)
					})        
				})
			})
		})
    }
	
	// 事件绑定
    var initEvent = function(model, props){
		// 表达式编辑框数据改变时需要向后台传数据
		$(model.dom).on('change', '#msgTitleText', function(){
			model.invoke('returnMsgTitleText', $("#msgTitleText").val());
			let dom1 = $(model.dom).find('#msgTitleDiv')[0]
			dom1.style.borderBottom = "1px solid #d9d9d9"
			let dom  = $(model.dom).find('.tips')[0]
			dom.style.display = "none"
			// 去掉为空提示
			
		});
	
		$(model.dom).on('mouseup', '#msgTitleDiv', function() {
			model.invoke('returnCurFocusText', 'msgtitle');
		});
		
		$(model.dom).on('keyup', '.CodeMirror', function() {
			var maxlength = 255;
			var text = this.CodeMirror.getValue();
			if(text.length > maxlength){
				text = text.substring(0,maxlength);
				this.CodeMirror.setValue(text);
				// 设置焦点在第一行末尾
				this.CodeMirror.setCursor(1,0);
			}
			if(text.length === maxlength){
				$('#msgTitleCount').css('color','red');
			}else{
				$('#msgTitleCount').css('color','#cccccc');
			}
			$('#msgTitleCount').text(maxlength - text.length + "/255");
		});
	}
	
	var updateFunc = function(model, props) {
		if(props.data.method === "tip"){
			// 提示为空
			let dom1 = $(model.dom).find('#msgTitleDiv')[0]
			dom1.style.borderBottom = "1px solid red"
			
			let dom  = $(model.dom).find('.tips')[0]
			dom.style.display = "inline"
		}else{
			if(props.data){
				if (props.data.displayContent) {
					if (props.data.method === "init") {
						model.fields = props.data.fields;
						model.viewStatus = props.data.viewStatus
						createExpression(model, props, "edit");
					} else if (props.data.method === "change") {
						changeFields(model, props);
					} else {
						updateValue(model, props.data.displayContent);
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
		
    }
	
	function changeFields(model, props) {
		// 修改字段列表
		model.fields = props.data.fields;
		model.exprEditor.toTextArea();
		createExpression(model, props, "edit");
	}
	
	var updateValue = function(model, data){
		insertAtCursor(model, data);
	}
	
	function insertAtCursor(model, text) {
	    var expressionField = window.document.getElementById('msgTitleText')
        
		model.exprEditor.replaceSelection(text)
	}
	
	var createExpression = function(model, props, createMethod) {
		var propertyKeyWord = ['+', '-', '(', ')', '*', '/', '<', '>', '>=', '<=', '=', '!='];
		var inputParams = model.fields;
		TargetExpressionCodeMirror.defineMIME('text/msgTitleTarget', {
			propertyKeyWord: propertyKeyWord,
			inputParams: inputParams,
            tokenHooks: {},
            name: 'msgTitleTarget'
		})
		
		model.exprEditor = TargetExpressionCodeMirror.fromTextArea($('#msgTitleText', model.dom)[0], {
            value: createMethod === 'edit' ? props.data.displayContent : '',
            lineNumbers: false, // 是否显示行号
            extraKeys: { 'Alt': 'autocomplete' }, // 定义自动补全的快捷键
            mode: 'msgTitleTarget', // 自定义的mode名称
            readOnly:  ["VIEW","SUBMIT",'AUDIT'].includes(props.data.viewStatus),
            lineWrapping: 'wrap'
		})
		
		model.exprEditor.on("change",function(){
						let dom1 = $(model.dom).find('#msgTitleDiv')[0]
			dom1.style.borderBottom = "1px solid #d9d9d9"
			let dom  = $(model.dom).find('.tips')[0]
			dom.style.display = "none"
			model.invoke('returnMsgTitleText', getEditorValue(model));
		});
		
		setEditorValue(model, createMethod === 'edit' ? props.data.displayContent : '')
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
  
	
    KDApi.register('warnmsgtitlemulaeditor', Expression, {isMulLang: true})
})(window.KDApi, jQuery)