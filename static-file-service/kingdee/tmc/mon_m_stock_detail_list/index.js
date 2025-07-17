/*
 * @Author: Yun(shujia.wu)
 * @Date: 2021-02-02 14:07:23
 * @LastEditors: Yun(shujia.wu)
 * @LastEditTime: 2021-02-04 15:57:56
 * @Description: 资金洞察 图片控件
 */
(function (KDApi, $) {
  console.log('mon_m_stock_detail_list版本：', '202102041456')
  // 构造函数
  function MyComponent (model) {
    this._setModel(model)
  }

  var themeColor

  MyComponent.prototype = {
    // 绑定model
    _setModel: function (model) {
      this.model = model
    },
    // 生命周期：初始化
    init: function (props) {
      // console.log('自定义控件初始化', this.model.pageId)
      themeColor = getThemeColor(props.themeColor)
      setHtml(this.model, props)
    },
    // 生命周期：更新
    update: function (props) {
      // console.log('自定义控件更新', this.model.pageId, props)
      // console.log('-----update', this.model, props)
      themeColor = getThemeColor(props.theme)
      setHtml(this.model, props, true)
    },
    // 生命周期：销毁
    destoryed: function () {
      // console.log('自定义控件销毁', this.model.pageId)
      // console.log('-----destoryed', this.model)
    }

  }

  // 加载文件和模板
  var setHtml = function (model, props, isUpdate) {
    KDApi.loadFile('./css/index.css', model, function () {
      // 加载模板
      updateHtml(model, props, isUpdate)
    })
  }

  var updateHtml = function (model, props, isUpdate) {
    // 模板字符串
    var template = `
    <ul class="mon-m-stock-detail-list">
      ${getListItemHtml(props.data)}
    </ul>
    `
    model.dom.innerHTML = template

  }

  // 获取主题色
  function getThemeColor (themeColor) {
    switch (themeColor) {
      case 'blue':
        return '#5582F3'
      case 'green':
        return '#29C392'
      case 'orange':
        return '#FC8555'
      case 'purple':
        return '#6869FB'
      default:
        return '#5582F3'
    }
  }

  function getListItemHtml(data) {
    if (!data || data.length === 0) {
      return
    }
    let result = ''
    data.forEach(item => {
      result += `
        <li class="mon-m-stock-detail-list__item">
        <div class="header">
          <div class="bank-name">${item.bankName}</div>
          <div class="bank-account">${item.bankAccountNumber}</div>
        </div>
        <ul class="detail-list">
          ${getCurrencyDetailItemHtml(item.currencyList)}
        </ul>
      </li>`
    })
    return result
  }

  function getCurrencyDetailItemHtml(data) {
    if (!data || data.length === 0) {
      return
    }
    let result = ''
    data.forEach(item => {
      result += `
        <li class="detail-list__item">
          <div class="currency">${item.currencyName}</div>
          <div class="value">${item.amount}</div>
        </li>
      `
    })

    return result
  }

  // 注册自定义控件
  KDApi.register('mon_m_stock_detail_list', MyComponent)
})(window.KDApi)
