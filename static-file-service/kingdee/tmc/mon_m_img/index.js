/*
 * @Author: Yun(shujia.wu)
 * @Date: 2021-02-02 14:07:23
 * @LastEditors: Yun(shujia.wu)
 * @LastEditTime: 2021-03-03 20:15:17
 * @Description: 资金洞察 图片控件
 */
(function (KDApi, $) {
  console.log('mon_m_img版本：', '202102041050')
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
    let config = getConfig(model)
    let parent = model.dom.parentElement
    let urlEle = parent.querySelector(`[data-page-id="${model.pageId}_${config['img_url_id']}"]${config['url_path'] || ''}`)
    if (!urlEle) {
      console.error('请检查元素层级路径')
      return
    }
    let url = urlEle.innerHTML || config['default_url'] || ''

    if (!isUpdate) {
      // 模板字符串
      var template = `
        <div style="width:100%;height:100%;line-height:1">
          <img style="width:100%;height:100%" src="${url}">
        </div>
      `
      
      model.dom.innerHTML = template

    } else {
      model.dom.querySelector('img').src = url
    }
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

  function getConfig (model) {
    let metadata = model.metaData.ci
    let config = {}

    if (metadata) {
      metadata.forEach(element => {
        config[element.key] = element.value
      })
    }

    return config
  }

  // 注册自定义控件
  KDApi.register('mon_m_img', MyComponent)
})(window.KDApi)
