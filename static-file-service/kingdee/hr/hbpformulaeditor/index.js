(function (KDApi, $) {
  function MyComponent(model) {
    this._setModel(model)
  }
  MyComponent.prototype = {
    _setModel: function (model) {
      this.model = model
    },
    init: function (props) {
      this.model.hbpFormulaEditor = null
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
      this.model.hbpFormulaEditor = null
    }
  }
  var setHtml = function (model, props) {
    KDApi.loadFile(['./js/codemirror.js', './css/codemirror.css'], model, function () {
      KDApi.loadFile('./js/hbpFormulaMode.js', model, function () {
        // 初始化一个textarea元素用于渲染codemirror
        var dataPageId = model.pageId + '_' + 'hbpFormulaCode'
        var template = '<textarea id="hbpFormulaCode" data-page-id="' + dataPageId + '" name="hbpFormulaCode"></textarea>'
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
    model.hbpFormulaEditor.replaceSelection(props.data.value)
    const cur = model.hbpFormulaEditor.getCursor()
    // 符号正则匹配
    let chIndex = 0
    if ('()' === props.data.value|| '""' === props.data.value) {
      chIndex = -1
    } else if ('/*  */' === props.data.value) {
      chIndex = -3
    }
    // 设置光标
    model.hbpFormulaEditor.setCursor(cur.line, cur.ch + chIndex)
    model.hbpFormulaEditor.focus()
  }
  var getValue = function (model) {
    var hbpFormulaValue = model.hbpFormulaEditor.getValue()
    model.invoke('getValue', hbpFormulaValue)
  }
  var setValue = function (model, props) {
    if (props.data) {
      model.hbpFormulaEditor.setValue(props.data.value)
      model.hbpFormulaEditor.save()
    }
  }
  // 设置只读
  var setReadOnly = function (model, props) {
    setOption('readOnly', model, props.data.readOnly)
  }
  // 动态修改公式平台配置
  var setOption = function (property, model, value) {
    model.hbpFormulaEditor.setOption(property, value)
  }
  var refreshKey = function (model, props) {
    initCodeMirror(model,props)
  }
  var initCodeMirror = function (model, props) {
    if (props.data) {
      if(model.hbpFormulaEditor){
        props.data.history = model.hbpFormulaEditor.getHistory()
        props.data.value = model.hbpFormulaEditor.getValue()
        props.data.readOnly = model.hbpFormulaEditor.getOption('readOnly').toString()
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
      var conditionKey = key.conditionKey || ['如果', '那么', '再滤', '其余', '结果']
      var joinKey = key.joinKey || ['并且', '或者']
      var calItemKey = key.calItemKey || ['ceshi']
      var funcKey = key.funcKey || ['求和', '四舍五入', '取当前年']
      var resultKey = key.resultKey || ['结果']
      var propertyKeyWord = [].concat(conditionKey, joinKey, calItemKey, funcKey, resultKey)
      CodeMirror.defineMIME('text/hbpFormula', {
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
        name: 'hbpFormula'
      })
      var dataPageId = model.pageId + '_' + 'hbpFormulaCode'
      if($('.CodeMirror', model.dom)){
        $('.CodeMirror', model.dom).remove()
      }
      model.hbpFormulaEditor = CodeMirror.fromTextArea($('[data-page-id="' + dataPageId + '"]')[0], {
        value: props.data.value || '',
        lineNumbers: true, // 是否显示行号
        extraKeys: { 'Alt-/': 'autocomplete' }, // 定义自动补全的快捷键
        // matchBrackets: true,  // 这个接口好像废弃了，使用addKeyMap添加自动补全
        mode: 'hbpFormula', // 自定义的mode名称
        readOnly: props.data.readOnly,
        lineWrapping: 'wrap'
      })
      setValue(model, props)
      model.hbpFormulaEditor.on('changes',function(){
        getValue(model)
      })
      model.hbpFormulaEditor.addKeyMap({
        name: 'autoInsertParentheses',
        "'['": completeKey('[]'),
        "'{'": completeKey('{}'),
        "'('": completeKey('()'),
        "'\''": completeKey('\'\''),
        "'\"'": completeKey('\"\"')
      })
      if(props.data.history){
        model.hbpFormulaEditor.setHistory(props.data.history)
      }
    }
  }
  KDApi.register('hbpformulaeditor', MyComponent)
})(window.KDApi, jQuery)
