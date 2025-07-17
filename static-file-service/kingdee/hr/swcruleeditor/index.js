(function (KDApi, $) {
    function MyComponent (model) {
      this._setModel(model)
    }
    MyComponent.prototype = {
      _setModel: function (model) {
        this.model = model
      },
      init: function (props) {
        this.model.swcEditor = null
        if(props.data){
          setHtml(this.model, props)
        }
      },
      update: function (props) {
        var self = this
        if (props.data) {
          var method = props.data.method
          switch (method) {
			case 'init':
				this.model.swcEditor = null
				if(props.data){
				  setHtml(this.model, props)
				}
				break
            case 'insertValue':
            insertValue(self.model, props)
            break
            case 'getValue':
            getValue(self.model)
            break
            case 'setValue':
            setValue(self.model, props)
            break
			case 'setReadOnly':
			setReadOnly(self.model, props)
			break
          }
        }
      },
      destroy: function (props) {
        this.model.swcEditor = null
      }
    }
    var setHtml = function (model, props) {
      KDApi.loadFile(['./js/codemirror.js','./css/codemirror.css'], model, function(){
        KDApi.loadFile('./js/swcMode.js', model, function () {
          var key = props.data.key
		  var itemKey = key.itemKey || []
		  var conditionKey = key.conditionKey || []
		  var preKey = key.preKey || []
		  var propertyKeyWord = [].concat(conditionKey, itemKey, preKey)
          var tokenCComment = function (stream, state) {
            var maybeEnd = false; var ch
            while ((ch = stream.next()) != null) {
              if (maybeEnd && ch === '/') {
                state.tokenize = null
                break
              }
              maybeEnd = (ch === '*')
            }
			stream.backUp(1)
            return 'remark'
          }
          var tokenLineComment = function (stream, state) {
            var maybeEnd = false; var ch
            while ((ch = stream.next()) != null) {
              if (maybeEnd && /\n/.test(ch)) {
                state.tokenize = null
                break
              }
              maybeEnd = /\n/.test(ch)
            }
            return 'remark'
          }
          CodeMirror.defineMIME('text/swc', {
            conditionKey: conditionKey,
			itemKey: itemKey,
			preKey: preKey,
            propertyKeyWord: propertyKeyWord,
            lineComment: '//',
            tokenHooks: {
              '/': function (stream, state) {
                if (stream.eat('/')) return tokenLineComment(stream, state)
                if (!stream.eat('*')) return false
                state.tokenize = tokenCComment
                return tokenCComment(stream, state)
              }
            },
            name: 'swc'
          })
          var dataPageId = model.pageId + '_' + 'swccode'
          var template = '<textarea id="swccode" data-page-id="' + dataPageId + '" name="swccode"></textarea>'
          model.dom.innerHTML = KDApi.getHTMLStringBytemplate(template, {})
          $(model.dom).css({
            'display': 'flex',
            'flex-direction': 'column'
          })
          model.swcEditor = CodeMirror.fromTextArea($('[data-page-id="' + dataPageId + '"]')[0], {
            value: props.data.value || '',
            lineNumbers: true, // 是否显示行号
            extraKeys: { 'Alt-/': 'autocomplete' }, // 定义自动补全的快捷键
            // matchBrackets: true,  // 这个接口好像废弃了，使用addKeyMap添加自动补全
            mode: 'swc', // 自定义的mode名称
            readOnly: props.data.readOnly === 'true'? true:false,
            lineWrapping: 'wrap'
          })
          setValue(model, props)
          model.swcEditor.on('changes',function(){
            getValue(model)
          })
          model.swcEditor.addKeyMap({
            name: 'autoInsertParentheses',
            "'['": completeKey('[]'),
            "'{'": completeKey('{}'),
            "'('": completeKey('()'),
            "'\''": completeKey('\'\''),
            "'\"'": completeKey('\"\"')
          })
        })      
      })
      
    }
    // 自动补全设置
    var completeKey = function (key) {
      return function(cm) {
        const cur = cm.getCursor()
        cm.replaceRange(key, cur, cur, '+insert')
        cm.doc.setCursor({ line: cur.line, ch: cur.ch + 1 })
      }
    }
    var insertValue = function (model, props) {
      model.swcEditor.replaceSelection(props.data.value)
	   const cur = model.swcEditor.getCursor()
		// 符号正则匹配
		let chIndex = 0
		if (/\(|\"/.test(props.data.value)) {
		  chIndex = -1
		} else if (/\/\*/.test(props.data.value)) {
		  chIndex = -3
		}else if(props.data.value != null && props.data.value.indexOf('VR[]') != -1){
			chIndex = -1
		}
		// 设置光标
		model.swcEditor.setCursor(cur.line, cur.ch + chIndex)
		model.swcEditor.focus()
    }
    var getValue = function (model) {
      var swcValue = model.swcEditor.getValue()
      model.invoke('getValue', swcValue)
    }
    var setValue = function(model, props) {
      if(props.data){
		  if(props.data.readOnly != null){
			  setOption('readOnly', model, props.data.readOnly)
		  }
        model.swcEditor.setValue(props.data.value)
        model.swcEditor.save()
      }
    }
    // 设置只读
    var setReadOnly = function(model, props){
      setOption('readOnly', model, props.data.readOnly)
    }
    // 动态修改公式平台配置
    var setOption = function(property, model, value){
      model.swcEditor.setOption(property, value)
    }
    KDApi.register('swcruleeditor', MyComponent)
  })(window.KDApi, jQuery)
  