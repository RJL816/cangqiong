if (!window.ai_ids) {
  window.ai_ids = {}
}
window.ai_ids['initScript'] = (function () {
  return {
    _listeners: {},
    $$template: {},
    $$events: [],
    $$curTemplateKey: '',
    $$gobalEvents: {
      mouseup: {
        isRegistered: false, //是否已注册
        eventFns: [],
      },
    },

    $on: function (chartType, eventName, eventFn) {
      if (this._listeners.hasOwnProperty(chartType)) {
        var eventObj = this._listeners[chartType]
        //注册事件
        var keys = Object.keys(eventObj)
        if (!keys.includes(eventName)) {
          eventObj[eventName] = [eventFn]
          return
        }
      } else {
        // 为了兼容IE11,将对象简写方法改成es5 的写法 模板字符串 qhx_0117 特性：兼容IE11
        // this._listeners[chartType] = {
        //   [eventName]: [eventFn],
        // }
        if (this._listeners[chartType]) {
          this._listeners[chartType][eventName] = [eventFn]
        }
      }
    },
    $off: function (chartType, eventName) {
      if (!chartType) {
        console.error('注销监听器必须指定chartType!')
        return
      }
      var keys = Object.keys(this._listeners)
      if (!keys || keys.length == 0) return
    },
    $init: function (options) {
      // const {
      //   chartType,
      //   componentName,
      //   componentList,
      //   bindData,
      //   globalEvent,
      //   offset,
      //   show,
      //   pageId,
      //   chartEl,
      // } = options
      // 为了兼容IE11,将对象简写方法改成es5 的写法 模板字符串 qhx_0117 特性：兼容IE11
      var chartType = options && options.chartType,
        componentName = options && options.componentName,
        componentList = options && options.componentList,
        globalEvent = options && options.globalEvent,
        offset = options && options.offset,
        show = options && options.show,
        pageId = options && options.pageId,
        chartEl = options && options.chartEl
      // console.log('templateScript pageId is ', pageId)
      // console.log('componentList is ', componentList)
      // 注册全局事件
      this.registerGlobalEvent()
      if (!chartType) {
        console.error('请指定chartType!')
        return
      }
      if (!componentName) {
        console.error('请指定comonentName！')
        return
      }
      // 为了兼容IE11,将对象简写方法改成es5 的写法 模板字符串 qhx_0117 特性：兼容IE11
      // let uniqueKey = `${chartType}_${componentName}`
      let uniqueKey = chartType + '_' + componentName
      if (!Object.hasOwnProperty.call(this.$$template, uniqueKey)) {
        this._addGlobalEvent(globalEvent)
        if (componentName) {
          //   var $$template = document.querySelector('#' + componentName)
          //   document
          //     .querySelector('.ids__report_wrapper')
          //     .appendChild($$template.content)
          // 为了兼容IE11,将对象简写方法改成es5 的写法 模板字符串 qhx_0117 特性：兼容IE11
          this._initToolTip({
            uniqueKey: uniqueKey,
            componentList: componentList,
          })
        }
      } else {
        const changedNodes = this._getChangedNodes(uniqueKey)
        console.log('udpate is ', changedNodes)
        let btnList = changedNodes.btnList.node.children
        for (let i = 0; i < btnList.length; i++) {
          let sourceOnClick = btnList[i].onclick
          btnList[i].onclick = sourceOnClick.bind(null, { pageId: pageId })
        }
        // 为了兼容IE11,将对象简写方法改成es5 的写法 模板字符串 qhx_0117 特性：兼容IE11
        this._update({
          uniqueKey: uniqueKey,
          componentList: componentList,
        })
      }

      if (show) {
        // 为了兼容IE11,将对象简写方法改成es5 的写法 模板字符串 qhx_0117 特性：兼容IE11
        this.$show({
          chartType: chartType,
          componentName: componentName,
          offset: offset,
          chartEl: chartEl,
        })
      }
      this.$$curTemplateKey = uniqueKey
      return this
    },
    _update: function (options) {
      let _this = this
      // 为了兼容IE11,将对象简写方法改成es5 的写法 模板字符串 qhx_0117 特性：兼容IE11
      // const { uniqueKey, componentList } = options
      var uniqueKey = options && options.uniqueKey,
        componentList = options && options.componentList
      const changedNodes = this._getChangedNodes(uniqueKey)
      const componentKeys = Object.keys(componentList)
      componentKeys.forEach(function (componentKey) {
        let upperKey =
          componentKey.charAt(0).toUpperCase() + componentKey.substring(1)
        // let renderMethod = `_update${upperKey}`
        // 为了兼容IE11,将对象简写方法改成es5 的写法 模板字符串 qhx_0117 特性：兼容IE11
        let renderMethod = '_update' + upperKey // `_update${upperKey}`
        if (componentKey == 'select') {
          const selectCom = componentList[componentKey]
          const opFun = selectCom.options
          const opArr = opFun && opFun()
          _this._updateSelectOptions(opArr)
        }
        if (!Object.hasOwnProperty.call(_this, renderMethod)) {
          console.error('没有实现' + renderMethod + '的组件更新方法!')
          return
        }
        _this[renderMethod](componentList[componentKey], changedNodes)
      })
    },
    _updateBtnList: function (options, changeNodes) {},
    _updateTextList: function (options, changeNodes) {
      options.forEach(function (option) {
        // 为了兼容IE11,将对象简写方法改成es5 的写法 模板字符串 qhx_0117 特性：兼容IE11
        // const { isChanged, key, value } = option
        var isChanged = option && option.isChanged,
          key = option && option.key,
          value = option && option.value
        if (isChanged) {
          changeNodes[key].node.textContent = value
        }
      })
    },
    _updateInput: function (option, changeNodes) {
      // 为了兼容IE11,将对象简写方法改成es5 的写法 模板字符串 qhx_0117 特性：兼容IE11
      // const { isChanged, key, value } = option
      var isChanged = option && option.isChanged,
        key = option && option.key,
        value = option && option.value
      if (isChanged && changeNodes[key] && changeNodes[key].node) {
        changeNodes[key].node.value = value
      }
    },
    _setSelectValue: function (selectNode, selectedVal) {
      if (selectNode) {
        let optionList = selectNode.options
        let optionsListArr = Array.prototype.slice.call(optionList, 0)
        let valueArr = []
        // 为了兼容IE11,将对象简写方法改成es5 的写法 模板字符串 qhx_0117 特性：兼容IE11
        optionsListArr.forEach(function (optionNode) {
          valueArr.push(optionNode.value)
        })

        let curIdx = valueArr.findIndex(function (value) {
          return value == selectedVal
        })
        optionList[curIdx].selected = true
      }
    },
    _updateSelect: function (options, changeNodes) {
      // debugger
      // let { isChanged, key, curSelected } = options
      var isChanged = options && options.isChanged,
        key = options && options.key,
        curSelected = options && options.curSelected
      if (!curSelected) {
        curSelected = ''
      }
      if (isChanged && changeNodes[key]) {
        let selectNode = changeNodes[key].node
        this._setSelectValue(selectNode, curSelected)
      }
    },
    //注册全局的事件，只注册一次
    registerGlobalEvent: function () {
      let _this = this
      const eventNames = Object.keys(this.$$gobalEvents)
      eventNames.forEach(function (eventName) {
        let eventObj = _this.$$gobalEvents[eventName]
        // const { isRegistered } = eventObj
        var isRegistered = eventObj && eventObj.isRegistered
        if (isRegistered) return
        let parsedEventFn =
          eventName.charAt(0).toUpperCase() + eventName.substring(1)
        // let eventMethod = `_handle${parsedEventFn}`
        let eventMethod = '_handle' + parsedEventFn //`_handle${parsedEventFn}`
        if (!Object.hasOwnProperty.call(_this, eventMethod)) {
          console.error('没有实现' + eventMethod + '的方法!')
          return
        }
        //qhx_0117
        // document.addEventListener(
        //   eventName,
        //   _this[eventMethod].bind(_this),
        //   false,
        // )
        eventObj.isRegistered = true
      })
    },
    _addGlobalEvent: function (events) {
      for (let eventKey in events) {
        if (Object.hasOwnProperty.call(this.$$gobalEvents, eventKey)) {
          this.$$gobalEvents[eventKey].eventFns.push(events[eventKey])
        }
      }
    },
    //处理鼠标抬起动作
    _handleMouseup: function (event) {
      var target = event.target
      const eventType = event.type
      const eventFns = this.$$gobalEvents[eventType].eventFns
      eventFns.forEach(function (fn) {
        fn(event)
      })
    },
    $remove: function (option) {
      const uniqueKey = _getUniqueKey(option)

      if (Object.prototype.hasOwnProperty.call(this.$$template, uniqueKey)) {
        delete this.$$template.uniqueKey
      }
    },
    _initToolTip: function (options) {
      var _this = this
      // 为了兼容IE11,将对象简写方法改成es5 的写法 模板字符串 qhx_0117 特性：兼容IE11
      // const { uniqueKey, componentList } = options
      var uniqueKey = options && options.uniqueKey,
        componentList = options && options.componentList
      var $$toolTipWrapper = document.createElement('DIV')
      $$toolTipWrapper.className = 'ids__sma__mask'
      this.$$template[uniqueKey] = {
        $$domWrapper: $$toolTipWrapper,
      }
      // console.log('componentList is ', componentList)
      if (componentList) {
        const componentKeys = Object.keys(componentList)
        componentKeys.forEach(function (componentKey) {
          let upperKey =
            componentKey.charAt(0).toUpperCase() + componentKey.substring(1)
          // let renderMethod = `_render${upperKey}`
          let renderMethod = '_render' + upperKey //`${upperKey}`
          if (!Object.hasOwnProperty.call(_this, renderMethod)) {
            console.error('没有实现' + renderMethod + '的组件渲染方法!')
            return
          }
          //qhx_0117  origin
          // _this[renderMethod](
          //   $$toolTipWrapper,
          //   componentList[componentKey],
          //   uniqueKey,
          // )
        })
      }
      // window.IDS_ModelAna_RenderUtils.$$container.appendChild($$toolTipWrapper)
      document.body.appendChild($$toolTipWrapper)

      //   document.body.appendChild($$toolTipWrapper)
    },
    //单个文本
    _renderSingleText: function (container, option, uniqueKey) {
      // 为了兼容IE11,将对象简写方法改成es5 的写法 模板字符串 qhx_0117 特性：兼容IE11
      // const {
      //   label,
      //   value: text,
      //   labelStyle,
      //   valueStyle,
      //   key,
      //   isChanged,
      //   rowStyle,
      // } = option
      var label = option && option.label,
        text = option && option.value,
        labelStyle = option && option.labelStyle,
        valueStyle = option && option.valueStyle,
        key = option && option.key,
        isChanged = option && option.isChanged,
        rowStyle = option && option.rowStyle
      let labelStyleStr = this._getStyle2Str(labelStyle)
      let valueStyleStr = this._getStyle2Str(valueStyle)
      let rowStyleStr = this._getStyle2Str(rowStyle)
      var $$basicText = document.createElement('span')
      $$basicText.className = 'block'
      if (rowStyleStr) {
        container.style.cssText = rowStyleStr
      }

      let $$label = document.createElement('label')
      // 为了兼容IE11,将对象简写方法改成es5 的写法 模板字符串 qhx_0117 特性：兼容IE11
      // $$label.textContent = `${label}${label ? '：' : ''}`
      $$label.textContent = label + label ? '：' : '' // `${label}${label ? '：' : ''}`
      $$label.className = 'ai-ids__text__label'
      $$label.style.cssText = labelStyleStr

      let $$value = document.createElement('span')
      $$value.className = 'ai-ids__text__value'
      $$value.style.cssText = valueStyleStr

      $$value.textContent = text

      if (isChanged) {
        this._saveChangedNode({
          uniqueKey: uniqueKey,
          node: $$value,
          nodeKey: key,
          nodeType: 'text',
        })
      }

      $$basicText.appendChild($$label)
      $$basicText.appendChild($$value)
      container.appendChild($$basicText)
    },
    _renderTextList: function (container, options, uniqueKey) {
      let _this = this

      var $$wrapper = document.createElement('UL')
      $$wrapper.className = 'ai-ids__text--list__ul'
      var $$firstChild = document.createElement('LI')
      $$firstChild.className = 'ai-ids__text--list__li'

      options.forEach(function (option, idx) {
        if (idx != 0) {
          $$firstChild = $$firstChild.cloneNode()
        }
        $$wrapper.appendChild($$firstChild)
        _this._renderSingleText($$firstChild, option, uniqueKey)
      })
      container.appendChild($$wrapper)
    },

    //基础组件  select
    _renderSelect: function (container, optionsPars, uniqueKey) {
      // 为了兼容IE11,将对象简写方法改成es5 的写法 模板字符串 qhx_0117 特性：兼容IE11
      // let { options, isChanged, key, curSelected } = optionsPars
      var options = optionsPars && optionsPars.options,
        isChanged = optionsPars && optionsPars.isChanged,
        key = optionsPars && optionsPars.key,
        curSelected = optionsPars && optionsPars.curSelected
      if (Object.prototype.toString.call(options) === '[object Function]') {
        options = options()
      }

      options.unshift({ name: '请选择', value: '' })
      var $$basicSelect = document.createElement('SPAN')
      $$basicSelect.className = 'block'
      let $$selectWrapper = document.createElement('SELECT')
      if (isChanged) {
        this._saveChangedNode({
          uniqueKey: uniqueKey,
          node: $$selectWrapper,
          nodeKey: key,
          nodeType: 'select',
        })
      }
      $$selectWrapper.className = 'ai-ids__select'
      this._renderOptions(options, $$selectWrapper)
      // options.map((option) => {
      //   let optionDom = document.createElement('option')
      //   optionDom.innerText = option.name
      //   optionDom.value = option.value
      //   $$selectWrapper.appendChild(optionDom)
      // })
      this._setSelectValue($$selectWrapper, curSelected)
      $$basicSelect.appendChild($$selectWrapper)
      container.appendChild($$basicSelect)
    },
    _renderOptions: function (optionArr, $$selectWrapper) {
      optionArr.map(function (option) {
        let optionDom = document.createElement('option')
        optionDom.innerText = option.name
        optionDom.value = option.value
        $$selectWrapper.appendChild(optionDom)
      })
    },
    //更新列表选项
    _updateSelectOptions: function (optionArr) {
      // debugger
      console.log('optionsArr is ', optionArr)
      optionArr.unshift({ name: '请选择', value: '' })
      var $$containerWrapper = document.querySelector('.ai-ids__select')
      $$containerWrapper.innerHTML = ''
      this._renderOptions(optionArr, $$containerWrapper)
    },
    //基础组件 button
    _renderBtnList: function (container, options, uniqueKey) {
      let _this = this
      //   var $$basicBtn = document.querySelector('#ai-ids__btns')
      let $$basicBtn = document.createElement('SPAN')
      $$basicBtn.className = 'block'
      var btnDom = document.createElement('span')
      options.forEach(function (option, idx) {
        // const { btnStyle, onClick, btnPars } = option
        var btnStyle = option && option.btnStyle,
          onClick = option && option.onClick,
          btnPars = option && option.btnPars
        if (idx != 0) {
          btnDom = btnDom.cloneNode()
        }
        btnDom.textContent = option.btnName
        btnDom.className = 'ai-ids__btn ai-ids__btn-item'
        btnDom.onclick = onClick.bind(null, btnPars)
        let btnStyleStr = _this._getStyle2Str(btnStyle)
        btnDom.style.cssText = btnStyleStr
        $$basicBtn.appendChild(btnDom)
      })
      this._saveChangedNode({
        uniqueKey: uniqueKey,
        node: $$basicBtn,
        nodeKey: 'btnList',
        nodeType: 'btn',
      })
      container.appendChild($$basicBtn)
    },
    //根据isChanged字段保存一张单的node，来修改和要提交的内容
    _saveChangedNode: function (options) {
      // 为了兼容IE11,将对象简写方法改成es5 的写法 模板字符串 qhx_0117 特性：兼容IE11
      // const { uniqueKey, node, nodeKey, nodeType } = options
      var uniqueKey = options && options.uniqueKey,
        node = options && options.node,
        nodeKey = options && options.nodeKey,
        nodeType = options && options.nodeType
      if (!this.$$template.hasOwnProperty(uniqueKey)) {
        console.error('_saveChangedNode 该单据没有初始化!')
        return
      }
      if (!this.$$template[uniqueKey].hasOwnProperty('changedNodes')) {
        this.$$template[uniqueKey].changedNodes = {}
      }
      this.$$template[uniqueKey].changedNodes[nodeKey] = {
        node: node,
        nodeKey: nodeKey,
        nodeType: nodeType,
      }
    },
    _getChangedNodes: function (uniqueKey) {
      return this.$$template[uniqueKey].changedNodes
    },
    _getUniqueKey: function (options) {
      // 为了兼容IE11,将对象简写方法改成es5 的写法 模板字符串 qhx_0117 特性：兼容IE11
      // const { chartType, componentName } = options
      var chartType = options && options.chartType,
        componentName = options && options.componentName
      // return `${chartType}_${componentName}`
      return chartType + '' + componentName
    },
    //获取某个单据的form data
    $getFormValue: function (options) {
      // const { chartType, componentName } = options
      let uniqueKey = this._getUniqueKey(options)
      if (!Object.prototype.hasOwnProperty.call(this.$$template, uniqueKey)) {
        console.error('_saveChangedNode 该单据没有初始化!')
        return
      }
      let changedNodes = this.$$template[uniqueKey].changedNodes
      const keys = Object.keys(changedNodes)
      let result = {}
      keys.forEach(function (key) {
        const re = changedNodes[key]
        // 为了兼容IE11,将对象简写方法改成es5 的写法 模板字符串 qhx_0117 特性：兼容IE11
        // const { node, nodeKey, nodeType } = changedNodes[key]
        var node = re && re.node,
          nodeKey = re && re.nodeKey,
          nodeType = re && re.nodeType
        if (nodeType == 'input') {
          result[nodeKey] = node.value
        } else if (nodeType == 'select') {
          const selectedIdx = node.selectedIndex

          result[nodeKey] = node.options[selectedIdx].value
        } else if (nodeType == 'text') {
          result[nodeKey] = node.textContent
        }
      })
      return result
    },
    _getStyle2Str: function (styleObj) {
      let styleStr = ''
      for (let key in styleObj) {
        // 为了兼容IE11,将对象简写方法改成es5 的写法 模板字符串 qhx_0117 特性：兼容IE11
        styleStr += key + ':' + styleObj[key] + ';' //`${key}:${styleObj[key]};`
      }

      return styleStr
    },
    _renderInput: function (container, options, uniqueKey) {
      // 为了兼容IE11,将对象简写方法改成es5 的写法 模板字符串 qhx_0117 特性：兼容IE11
      // const { placeholder, value } = options
      const placeholder = options && options.placeholder,
        value = options && options.value
      var wrapper = document.createElement('SPAN')
      wrapper.className = 'block'
      var $$input = document.createElement('INPUT')
      $$input.className = 'ai-ids__input'
      $$input.placeholder = placeholder || '请输入'
      $$input.value = value
      this._saveChangedNode({
        uniqueKey: uniqueKey,
        node: $$input,
        nodeKey: options.key,
        nodeType: 'input',
      })
      wrapper.appendChild($$input)
      container.appendChild(wrapper)
    },
    _setLeftAndTop: function (wrapperRect, targetDom, offset) {
      let bodyW = document.body.clientWidth
      let bodyH = document.body.clientHeight
      console.log('bodyW is ', bodyW)
      console.log('bodyH is ', bodyH)
      let offsetX = offset[0]
      let offsetY = offset[1]
      // 为了兼容IE11,将对象简写方法改成es5 的写法 模板字符串 qhx_0117 特性：兼容IE11
      // const { top, left, width, height } = wrapperRect
      var top = wrapperRect && wrapperRect.top,
        left = wrapperRect && wrapperRect.left,
        width = wrapperRect && wrapperRect.width,
        height = wrapperRect && wrapperRect.height
      console.log('offsetX is ', offsetX)
      console.log('offsetY is ', offsetY)

      let realX = offsetX - left // 在canvas 内的真实X偏移
      let realY = offsetY - top // 在canvas 内的真实Y偏移
      let finalOffsetX = 0,
        finalOffsetY = 0
      if (realX > (width / 3) * 2) {
        finalOffsetX = bodyW - offsetX - 183 / 2
        // 为了兼容IE11,将对象简写方法改成es5 的写法 模板字符串 qhx_0117 特性：兼容IE11
        targetDom.style.right = finalOffsetX + 'px' //`${finalOffsetX}px`
        targetDom.style.left = ''
      } else {
        finalOffsetX = offsetX + 20 + left
        targetDom.style.left = finalOffsetX + 'px' //`${finalOffsetX}px`
        targetDom.style.right = ''
      }
      if (offsetY < height / 2) {
        finalOffsetY = offsetY - 200 / 2 + top
      } else {
        finalOffsetY = offsetY + 20
      }
      // 为了兼容IE11,将对象简写方法改成es5 的写法 模板字符串 qhx_0117 特性：兼容IE11
      targetDom.style.top = finalOffsetY + 'px' // `${finalOffsetY}px`
    },
    $show: function (options) {
      // 为了兼容IE11,将对象简写方法改成es5 的写法 模板字符串 qhx_0117 特性：兼容IE11
      // let { chartType, componentName, offset, chartEl } = options
      var chartType = options && options.chartType,
        componentName = options && options.componentName,
        offset = options && options.offset,
        chartEl = options && options.chartEl
      let uniqueName = chartType + '_' + componentName //`${chartType}_${componentName}`
      if (!uniqueName in this.$$template) {
        console.error('$show 组件为初始化!')
        return
      }
      let targetDom = this.$$template[uniqueName].$$domWrapper
      if (options.offset) {
        if (chartEl) {
          let domQuerySel = chartEl._dom
          const rect = domQuerySel.getBoundingClientRect()
          console.log('templateScript rect is ', rect)
          this._setLeftAndTop(rect, targetDom, offset)
        } else {
          targetDom.style.left = offset[0] + 80 + 'px' //`${offset[0] + 80}px`
          targetDom.style.top = offset[1] + 'px' //`${offset[1]}px`
        }
      }
      targetDom.style['display'] = 'block'
    },
    $hide: function (options) {
      // const { chartType, componentName } = options
      var chartType = options && options.chartType,
        componentName = options && options.componentName
      let uniqueKey = chartType + '_' + componentName //`${chartType}_${componentName}`
      if (!uniqueKey in this.$$template) {
        console.error('该组件未被初始化')
        return
      }
      const displayStatus = this.$$template[uniqueKey].$$domWrapper.style[
        'display'
      ]
      if (displayStatus != 'none') {
        this.$$template[uniqueKey].$$domWrapper.style['display'] = 'none'
      }
    },
    $emit: function () {},
    $get: function (options) {
      // const { chartType, componentName } = options
      var chartType = options && options.chartType,
        componentName = options && options.componentName
      let uniqueKey = chartType + '_' + componentName //`${chartType}_${componentName}`
      if (!Object.hasOwnProperty.call(this.$$template, uniqueKey)) {
        console.error('该组件未被初始化')
        return
      }
      return this.$$template[uniqueKey].$$domWrapper
    },
  }
})()
