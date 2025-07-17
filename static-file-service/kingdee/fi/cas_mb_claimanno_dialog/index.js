(function (KDApi, $) {
  console.log('cas_mb_claimanno_dialog版本：', '202108101057')
  // 构造函数
  function MyComponent (model) {
    this._setModel(model)
  }

  var themeColor

  let currentProps = null

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
      removeDialog(this.model.pageId)
    }

  }

  // 加载文件和模板
  var setHtml = function (model, props, isUpdate) {
    currentProps = props
    KDApi.loadFile('./css/index.css', model, function () {
      // 加载模板
      updateHtml(model, props, isUpdate)
    })
  }

  var updateHtml = function (model, props, isUpdate) {
    let config = getConfig(model)
    if (!isUpdate) {
      let container = document.getElementById(`cas_mb_claimanno_dialog_${model.pageId}`)
      if (!container) {
        // 模板字符串
        var template = `
        <div class="custom-control-cas-mb-claimanno-dialog-container" id="cas_mb_claimanno_dialog_container_${model.pageId}">
          <div class="custom-control-cas-mb-claimanno-dialog-container-container—box" id="custom-control-cas-mb-claimanno-dialog-container-container—box_${model.pageId}">
            <div class="cas-mb-dialog">
              <div class="cas-mb-dialog_title">${config.title || KDApi.getLangMsg(model, 'cas_mb_claimanno_dialog.key_0001')}</div>
              <div class="cas-mb-dialog_msg">
                ${config.msg || KDApi.getLangMsg(model, 'cas_mb_claimanno_dialog.key_0002')}
              </div>
              <div class="cas_mb_claimanno_dialog_ignore_confirm" id="cas_mb_claimanno_dialog_ignore_confirm_${model.pageId}">
                <input type="checkbox" id="cas_mb_claimanno_dialog_cb_${model.pageId}">
                <label for="cas_mb_claimanno_dialog_cb_${model.pageId}">${KDApi.getLangMsg(model, 'cas_mb_claimanno_dialog.key_0003')}</label>
              </div>
              <div class="cas-mb-dialog_btns">
                <div class="btn" id="cas_mb_claimanno_dialog_btn_cancel_${model.pageId}">${config.cancelBtn || KDApi.getLangMsg(model, 'cas_mb_claimanno_dialog.key_0004')}</div>
                <div class="btn" id="cas_mb_claimanno_dialog_btn_ok_${model.pageId}">${config.okBtn || KDApi.getLangMsg(model, 'cas_mb_claimanno_dialog.key_0005')}</div>
              </div>
            </div>
          </div>
        </div>`
        // 根据接收的参数将字符串模板转为innerHTML
        var result = KDApi.getHTMLStringBytemplate(template, {})
        model.dom.innerHTML = result

        // 绑定DOM操作事件
        initEvent(model, props)


      }
    } else {
      document.getElementById(`cas_mb_claimanno_dialog_cb_${model.pageId}`).checked = false
      if (props.data) {
        if (props.data.show === true) {
          // 显示对话框
          showDialog(model.pageId)
        }
        if (props.data.show === false) {
          // 显示对话框
          removeDialog(model.pageId)
        }
      }
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


  // DOM节点操作函数
  var initEvent = function (model, props) {
    let btnCancel = document.getElementById(`cas_mb_claimanno_dialog_btn_cancel_${model.pageId}`)
    let btnOK = document.getElementById(`cas_mb_claimanno_dialog_btn_ok_${model.pageId}`)
    // let checkboxConfirm = document.getElementById(`cas_mb_claimanno_dialog_ignore_confirm_${model.pageId}`)

    // 确定按钮
    btnOK.addEventListener('click', function () {
      // removeDialog(model.pageId)
      let data = Object.assign({},
        currentProps.data || {},
        {
          ignore: document.getElementById(`cas_mb_claimanno_dialog_cb_${model.pageId}`).checked,
          show: false
        })

      // console.log('回传给插件的数据为：\r\n', data)

      model.invoke('click', {
        nodeKey: 'btn_ok',
        data: data
      })
      removeDialog(model.pageId)
    })

    // 取消按钮
    btnCancel.addEventListener('click', function () {
      let data = Object.assign({},
        currentProps.data || {},
        {
          ignore: document.getElementById(`cas_mb_claimanno_dialog_cb_${model.pageId}`).checked,
          show: false
        })

      // console.log('回传给插件的数据为：\r\n', data)

      model.invoke('click', {
        nodeKey: 'btn_cancel',
        data: data
      })

      removeDialog(model.pageId)
    })

    // checkboxConfirm.addEventListener('click', function() {
    //   console.log('点击')
    // })

  }

  function showDialog (pageId) {
    // 显示对话框
    document.body.append(document.getElementById(`custom-control-cas-mb-claimanno-dialog-container-container—box_${pageId}`))
  }

  function removeDialog (pageId) {
    // 隐藏对话框
    let container = document.getElementById(`cas_mb_claimanno_dialog_container_${pageId}`)
    if (container) {
      let ele = document.getElementById(`custom-control-cas-mb-claimanno-dialog-container-container—box_${pageId}`);
      if (ele) {
        container.append(ele)
      }
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
  KDApi.register('cas_mb_claimanno_dialog', MyComponent, {
    isMulLang: true
  })
})(window.KDApi)
