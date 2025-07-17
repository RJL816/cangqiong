(function (KDApi, $) {
  // 构造函数
  function MyComponent(model) {
    this._setModel(model)
  }
  var inited = false
  MyComponent.prototype = {
    // 绑定model
    _setModel: function (model) {
      this.model = model
    },
    // 生命周期：初始化
    init: function (props) {
      console.log('-----init------markcalendar')
      setHtml(this.model, props)
    },
    // 生命周期：更新
    update: function (props) {
      if (inited) {
        console.log('-----update------markcalendar')
        var itemKey = props.data.itemKey;
        updateHtml(this.model, props, true)
        
        if ($('#' + itemKey + '-pseudo-el').length === 0) {
          brushThemeColor(props.data.itemKey, props.themeColor)
        }
      }
    },
    // 生命周期：销毁
    destoryed: function () {
      console.log('-----destoryed------markcalendar')
    }
  }

  /**
   * 刷新控件颜色为主题色
   * @param {string} itemKey 控件标识
   * @param {string} themeColor 主题色
   */
  var brushThemeColor = function (itemKey, themeColor) {
    var themeColorNum = getThemeColor(themeColor)

    // 刷新伪元素相关的颜色为背景色
    var refreshPseudoEl = '<style id=' + itemKey + '-pseudo-el>' +
                            '#' + itemKey + ' .c-day:hover { border-color: ' + themeColorNum + '; }' +
                            '#' + itemKey + ' .c-today:after { background-color: ' + themeColorNum + ' !important; }' +
                          '</style>';
    $('#' + itemKey).append(refreshPseudoEl)
  }

  /**
   * 获取需要加载的资源文件
   */
  var getShouldLoadFiles = function (model) {
    var nameSpace = KDApi.getNameSpace(model);
    var loadCssFiles = [
      './css/jquery.mark-calendar.css'
    ];

    var loadJsFiles = [
      './js/jquery.mark-calendar.js'
    ];

    var shouldLoadFiles = [];

    for (var i = 0; i < loadCssFiles.length; i++) {
      if ($('link[href="' + nameSpace + loadCssFiles[i] + '"]').length === 0) {
        shouldLoadFiles.push(loadCssFiles[i])
      }
    }

    for (var i = 0; i < loadJsFiles.length; i++) {
      if ($('script[src="' + nameSpace + loadJsFiles[i] + '"]').length === 0) {
        shouldLoadFiles.push(loadJsFiles[i])
      }
    }

    return shouldLoadFiles
  }

  // 加载文件和模板
  var setHtml = function (model, props) {

    var shouldLoadFiles = getShouldLoadFiles(model)

    if (shouldLoadFiles.length > 0) {
      // 需要加载资源文件，先加载资源文件，然后再进行dom渲染
      KDApi.loadFile(shouldLoadFiles, model, function () {
        updateHtml(model, props, false)
        inited = true;
      })
    } else {
      updateHtml(model, props, false)
    }
  }

  var updateHtml = function (model, props, isUpdate) {
    if (!isUpdate) {
      // 模板字符串
      var template = '<div id="<%= itemKey %>" class="mark-calendar" style="height: 264px; width: 230px;"></div>'
      // 根据接收的参数将字符串模板转为innerHTML
      var result = KDApi.getHTMLStringBytemplate(template, {
        itemKey: props.data && props.data.itemKey ? props.data.itemKey : model.configItems ? model.configItems.getIn([0, 'itemKey']) : 'mbis-custom-control'
      })

      model.dom.innerHTML = result
    }

    // 绑定DOM操作事件
    initEvent(model, props)
  }

  // 获取主题色
  function getThemeColor(themeColor) {
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
    invokeCustomAction(props.data.itemKey, props.data.ca, props.data.cap, model.invoke)
  }

  /**
   * 执行自定义插件方法
   * @param {string} customAction 自定义方法
   * @param {object} customActionParams 自定义方法参数
   * @param {object} model 当前控件实例
   */
  var invokeCustomAction = function (itemKey, customAction, customActionParams, customEventInvoker) {
    switch (customAction) {
      case 'init':
        initMarkCalendar(itemKey, customActionParams, customEventInvoker)
        break

      case 'change_range':

        break

      case 'mark_days':
        $('#' + itemKey).markMonthDay(customActionParams.days);
        break

      default:

        break
    }
  }

  /**
   * 初始化MarkCalendar
   * @param {string} itemKey 控件标识
   * @param {object} customActionParams 自定义方法形参
   * @param {function} customEventInvoker 自定义事件执行器
   */
  var initMarkCalendar = function (itemKey, customActionParams, customEventInvoker) {
    $('#' + itemKey).markCalendar({
      minDate: customActionParams.min_date == null ? null : new Date(customActionParams.min_date),
      maxDate: customActionParams.max_date == null ? null : new Date(customActionParams.max_date),
      markDays: function (year, month) {
        var params = {
          currentYear: year,
          currentMonth: month
        }

        customEventInvoker('getCurrentMonthMarkDays', params)
      }
    });
  }

  console.log('-----------------register------markcalendar')
  // 注册自定义控件
  KDApi.register('markcalendar', MyComponent)
})(window.KDApi, jQuery)
