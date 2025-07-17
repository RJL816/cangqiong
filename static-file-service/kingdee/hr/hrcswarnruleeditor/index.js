(function (KDApi, $) {
  function MyComponent(model) {
    this._setModel(model)
  }
  MyComponent.prototype = {
    _setModel: function (model) {
      this.model = model
    },
    init: function (props) {
      this.model.hrcsWarnRuleEditor = null
      if (props.data) {
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
          case 'refreshKey':
            setValue(self.model, props)
            refreshKey(self.model, props)
            break
          case 'init':
            setValue(self.model, props)
            initCodeMirror(self.model, props)
            break
        }
      }
    },
    destroy: function (props) {
      this.model.hrcsWarnRuleEditor = null
    }
  }
  var setHtml = function (model, props) {
    KDApi.loadFile(['./js/codemirror.js', './css/codemirror.css'], model, function () {
      KDApi.loadFile('./js/hrcsWarnRuleMode.js', model, function () {
        // 初始化一个textarea元素用于渲染codemirror
        var dataPageId = model.pageId + '_' + 'hrcsWarnRuleCode'
        var template = '<textarea id="hrcsWarnRuleCode" data-page-id="' + dataPageId + '" name="hrcsWarnRuleCode"></textarea>'
        model.dom.innerHTML = KDApi.getHTMLStringBytemplate(template, {})
        $(model.dom).css({
          'display': 'flex',
          'flex-direction': 'column'
        })
        initCodeMirror(model,props)
      })
    })

  }
  // 自动补全设置
  var completeKey = function (key) {
    return function (cm) {
      const cur = cm.getCursor()
      cm.replaceRange(key, cur, cur, '+insert')
      cm.doc.setCursor({ line: cur.line, ch: cur.ch + 1 })
    }
  }
  var insertValue = function (model, props) {
    model.hrcsWarnRuleEditor.replaceSelection(props.data.value)
    const cur = model.hrcsWarnRuleEditor.getCursor()
    // 符号正则匹配
    let chIndex = 0
    if (/\(|\"/.test(props.data.value)) {
      chIndex = -1
    } else if (/\/\*/.test(props.data.value)) {
      chIndex = -3
    }
    // 设置光标
    model.hrcsWarnRuleEditor.setCursor(cur.line, cur.ch + chIndex)
    model.hrcsWarnRuleEditor.focus()
  }
  var getValue = function (model) {
    var hrcsWarnRuleValue = model.hrcsWarnRuleEditor.getValue()
    model.invoke('getValue', hrcsWarnRuleValue)
  }
  var setValue = function (model, props) {
    if (props.data) {
      model.hrcsWarnRuleEditor.setValue(props.data.value)
      model.hrcsWarnRuleEditor.save()
    }
  }
  // 设置只读
  var setReadOnly = function (model, props) {
    setOption('readOnly', model, props.data.readOnly)
  }
  // 动态修改公式平台配置
  var setOption = function (property, model, value) {
    model.hrcsWarnRuleEditor.setOption(property, value)
  }
  var refreshKey = function (model, props) {
    initCodeMirror(model,props)
  }
  var initCodeMirror = function (model, props) {
    if (props.data) {
      if(model.hrcsWarnRuleEditor){
        props.data.history = model.hrcsWarnRuleEditor.getHistory()
        props.data.value = model.hrcsWarnRuleEditor.getValue()
        props.data.readOnly = model.hrcsWarnRuleEditor.getOption('readOnly').toString()
      }
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
      var key = props.data.key
      var conditionKey = key.conditionKey
      var fieldItemKey = key.fieldItemKey
      var textKey = key.textKey
      var propertyKeyWord = [].concat(conditionKey, fieldItemKey, textKey)
      CodeMirror.defineMIME('text/hrcsWarnRule', {
        conditionKey: conditionKey,
        fieldItemKey: fieldItemKey,
        textKey: textKey,
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
        name: 'hrcsWarnRule'
      })
      var dataPageId = model.pageId + '_' + 'hrcsWarnRuleCode'
      if($('.CodeMirror', model.dom)){
        $('.CodeMirror', model.dom).remove()
      }
      model.hrcsWarnRuleEditor = CodeMirror.fromTextArea($('[data-page-id="' + dataPageId + '"]')[0], {
        value: props.data.value || '',
        lineNumbers: true, // 是否显示行号
        extraKeys: { 'Alt-/': 'autocomplete' }, // 定义自动补全的快捷键
        // matchBrackets: true,  // 这个接口好像废弃了，使用addKeyMap添加自动补全
        mode: 'hrcsWarnRule', // 自定义的mode名称
        readOnly: props.data.readOnly === 'true' ? true : false,
        lineWrapping: 'wrap'
      })
      setValue(model, props)
      model.hrcsWarnRuleEditor.on('changes',function(){
        getValue(model)
      })
      model.hrcsWarnRuleEditor.addKeyMap({
        name: 'autoInsertParentheses',
        "'['": completeKey('[]'),
        "'{'": completeKey('{}'),
        "'('": completeKey('()'),
        "'\''": completeKey('\'\''),
        "'\"'": completeKey('\"\"')
      })
      if(props.data.history){
        model.hrcsWarnRuleEditor.setHistory(props.data.history)
      }
    }
  }
  KDApi.register('hrcswarnruleeditor', MyComponent)
})(window.KDApi, jQuery)
