(function (KDApi, $) {
    function MyComponent (model) {
      this._setModel(model)
    }
    MyComponent.prototype = {
      _setModel: function (model) {
        this.model = model
      },
      init: function (props) {
        this.model.hrcsEditor = null
        if(props.data){
          setHtml(this.model, props)
        }
      },
      update: function (props) {
        var self = this
        if (props.data) {
          var method = props.data.method
          switch (method) {
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
        this.model.hrcsEditor = null
      }
    }
    var setHtml = function (model, props) {
      KDApi.loadFile(['./js/codemirror.js','./css/codemirror.css'], model, function(){
        KDApi.loadFile('./js/hrcsMode.js', model, function () {
          var key = props.data.key
          var conditionKey = key.conditionKey || ['如果', '那么', '再滤', '其余', '结果']
          var joinKey = key.joinKey || ['并且', '或者']
          var calItemKey =  key.calItemKey
          var funcKey = key.funcKey || ['求和', '四舍五入', '取当前年']
          var resultKey = key.resultKey || ['结果']
          var propertyKeyWord = [].concat(conditionKey, joinKey, calItemKey, funcKey, resultKey)
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
            return 'comment'
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
            return 'comment'
          }
          CodeMirror.defineMIME('text/hrcs', {
            conditionKey: conditionKey,
            joinKey: joinKey,
            calItemKey: calItemKey,
            funcKey: funcKey,
            resultKey: resultKey,
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
            name: 'hrcs'
          })
          var dataPageId = model.pageId + '_' + 'hrcscode'
          var template = '<textarea id="hrcscode" data-page-id="' + dataPageId + '" name="hrcscode"></textarea>'
          model.dom.innerHTML = KDApi.getHTMLStringBytemplate(template, {})
          $(model.dom).css({
            'display': 'flex',
            'flex-direction': 'column'
          })
          model.hrcsEditor = CodeMirror.fromTextArea($('[data-page-id="' + dataPageId + '"]')[0], {
            value: props.data.value || '',
            lineNumbers: true, // 是否显示行号
            extraKeys: { 'Alt-/': 'autocomplete' }, // 定义自动补全的快捷键
            // matchBrackets: true,  // 这个接口好像废弃了，使用addKeyMap添加自动补全
            mode: 'hrcs', // 自定义的mode名称
            readOnly: props.data.readOnly === 'true'? true:false,
            lineWrapping: 'wrap'
          })
          setValue(model, props)
          model.hrcsEditor.addKeyMap({
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
      model.hrcsEditor.replaceSelection(props.data.value)
    }
    var getValue = function (model) {
      var hrcsValue = model.hrcsEditor.getValue()
      model.invoke('getValue', hrcsValue)
    }
    var setValue = function(model, props) {
      if(props.data){
        model.hrcsEditor.setValue(props.data.value)
        model.hrcsEditor.save()
      }
    }
    // 设置只读
    var setReadOnly = function(model, props){
      setOption('readOnly', model, props.data.readOnly)
    }
    // 动态修改公式平台配置
    var setOption = function(property, model, value){
      model.hrcsEditor.setOption(property, value)
    }
    KDApi.register('hrcsruleeditor', MyComponent)
  })(window.KDApi, jQuery)
  