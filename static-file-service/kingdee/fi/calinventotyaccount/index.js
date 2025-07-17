(function (KDApi, $) {
  function MyComponent (model) {
    this._setModel(model)
  }

  var themeColor // 顶层变量声明
  var isUpdate = false
   var oldColorCss//框选中前样式

  // 成员变量
  var self = {}

  // 节点信息
  
    var systemNodeInfos 
		
    var settingNodeInfos 
  
    var baseNodeInfos 
  
   var modleNodeInfos 
  
   var beginNodeInfos 
			
	function getLanguageNode (model, nodeName) {
	   return KDApi.getLangMsg(model, nodeName)
  }


  MyComponent.prototype = { // 内部函数不推荐修改
    _setModel: function (model) {
      this.model = model // 内部变量挂载
    },
    init: function (props) {
      console.log('-----init', this.model, props)
	  var model = this.model
	  systemNodeInfos = getLanguageNode(model, 'systemNodeInfos')
	  settingNodeInfos = getLanguageNode(model, 'settingNodeInfos')
	  baseNodeInfos = getLanguageNode(model, 'baseNodeInfos')
	  modleNodeInfos = getLanguageNode(model, 'modleNodeInfos')
	  beginNodeInfos = getLanguageNode(model, 'beginNodeInfos')
	  setHtml(model, props)
    },
    update: function (props) {
      console.log('-----update', this.model, props)
	  var model = this.model
      themeColor = getThemeColor(props.theme)
	  updateHtml(model, props)
    },
    destoryed: function () {
      console.log('-----destoryed', this.model)
    }

  }

  /*
   * 外部函数声明
   */
  var setHtml = function (model, props) {
    setCtrlHtml(model, props)
	setNodeHtml(model, props, 'system', systemNodeInfos)
	setNodeHtml(model, props, 'calsetting', settingNodeInfos)
	setNodeHtml(model, props, 'calbase', baseNodeInfos)
	setNodeHtml(model, props, 'model', modleNodeInfos)
	setNodeHtml(model, props, 'begin', beginNodeInfos)
  }

  function setCtrlHtml (model, props) {
    var div = $('<div id="guideTipsTxt" class="_1ir-IzK4 _3wxkawCQ" style="color: rgb(130, 130, 130); font-size: 16px;"></div>')
    div.append('<span> ' + getLanguageNode(model, 'key0001') + ' </span>')
    div.append('<span id="itemcount" style="color: rgb(85, 130, 243);"></span>')
    div.append('<span> ' + getLanguageNode(model, 'key0002') + ' </span>')
	$('div#guidetips').wait('div#guidetips', function () {
	  $('div#guidetips').append(div).append($('<div id="nodeTipsTxt" class="_1ir-IzK4 _3wxkawCQ" style="color: rgb(130, 130, 130); font-size: 16px; display:none"></div>'))
	})
  }

  function setNodeHtml (model, props, head, useNodes) {
    $('#' + head + '_nodelock').wait('#' + head + '_nodelock', function () {
	 var systemNodeLock = $('#' + head + '_nodelock')
	  systemNodeLock.css('display', 'none')
	 var nodesHtml = '';
	 for (var key in useNodes) {
	  var templateNode = $('#' + head + '_temple')
	  templateNode.attr('title', useNodes[key][0])
      var html = templateNode.prop('outerHTML')
      html = html.replace(head + '_temple', key)
	  var containStr = templateNode.find('span').eq(0).html()
	  var reg = new RegExp(containStr)
	   html = html.replace(new RegExp(containStr, 'gm'), useNodes[key][0])
      html = html.replace(head + '_nodeclick', key + '_nodeclick')
      html = html.replace(head + '_nodelock', key + '_nodelock')
      nodesHtml = nodesHtml + html
      self[key] = {}
    }
      var nodes = $(nodesHtml)
		nodes.css('display', 'inherit').find('div').removeAttr('title')
		var headTitle
		$('#' + head + '_title').wait('#' + head + '_title', function () {
		  var systembaseTitle = $('#' + head + '_title')
		  headTitle = systembaseTitle
		})
		$('#' + head + '_node').wait('#' + head + '_node', function () {
		  var systemNode = $('#' + head + '_node')
		  systemNode.html('')
		  systemNode.append(headTitle)
		  systemNode.append(nodes)
		})
		initEvent(model, props, useNodes)
	})
	
  }

  var updateHtml = function (model, props) {
    updateCtrlHtml(model, props)
	updateGreenHead(model, props)
    updateNodeHtml(model, props)
  }
  function updateCtrlHtml (model, props) {
    var data = props.data
    if (!data) return
    if (data.itemcount != undefined) {
      $('span#itemcount').text(data.itemcount)
	  if (data.itemcount == 0) {
	   $('span#itemcount').next().text(getLanguageNode(model, 'key0003'))
	  }else {
	   $('span#itemcount').next().text(getLanguageNode(model, 'key0002'))
	  }
    }
  }

  function updateGreenHead (model, props) {
    var data = props.data
    if (!data) return
	if (data.isBaseGreenHead) {
		 $('#calbase_title').css('background-color', '#34c382')
	}else {
		 $('#calbase_title').css('background-color', '#829efe')
	}
    if (data.isSystemGreenHead) {
		 $('#system_title').css('background-color', '#34c382')
	}else {
		 $('#system_title').css('background-color', '#829efe')
	}
    if (data.isSettingGreenHead) {
		 $('#calsetting_title').css('background-color', '#34c382')
	}else {
		 $('#calsetting_title').css('background-color', '#829efe')
	}
    if (data.isModelGreenHead) {
		 $('#model_title').css('background-color', '#34c382')
	}else {
		 $('#model_title').css('background-color', '#829efe')
	}
    if (data.isBeginGreenHead) {
		 $('#begin_title').css('background-color', '#34c382')
	}else {
		 $('#begin_title').css('background-color', '#829efe')
	}
  }

  var unconfirmedCSS = {
    'background-color': 'rgba(251,251,252,1)',
    border: '1px solid rgba(204,204,204,1)',
    'border-radius': '2px'
  }

  var confirmedCSS = {
    'background-color': 'rgba(230,245,241,1)',
    border: '1px solid rgba(46,190,127,1)',
    'border-radius': '2px'
  }
  function updateNodeHtml (model, props) {
    var data = props.data
    if (!data) return
    if (data.refreshNodes != undefined) {
      for (var index in data.refreshNodes) {
        refreshNode(model, data.refreshNodes[index])
      }
    }else {
      refreshNode(model, data)
    }
  }

  function refreshNode (model, data) {
    var prefix = model.pageId + '_' + data.nodeKey + '_';
    $('#' + data.nodeKey + '_nodelock').wait('#' + data.nodeKey + '_nodelock', function () {
	   if (data.lock) {
        $('#' + data.nodeKey + '_nodelock').css('display', 'inherit')
       }else {
	     $('#' + data.nodeKey + '_nodelock').css('display', 'none')
	  }
    })

    $('#' + data.nodeKey).wait('#' + data.nodeKey, function () {
	  if (data.confirmed) {
        $('#' + data.nodeKey).css(confirmedCSS)
      }else {
	   $('#' + data.nodeKey).css(unconfirmedCSS)
	  }
    })
  }

  // 标签类控件没有id属性，因此用 data-page-id 获取
  function getObj (prefix, suffix) {
    return $('[data-page-id="' + prefix + suffix + '"]')
  }

  /*
   * 将主题色转为对应色值
   */
  function getThemeColor (themeColor) {
    switch (themeColor) {
      case 'blue':
        return '#5582F3'
        break
      case 'green':
        return '#29C392'
        break
      case 'orange':
        return '#FC8555'
        break
      case 'purple':
        return '#6869FB'
        break
    }
  }

  /*
   * 通过自定义控件，向平台后端发送点击事件
   */
  var initEvent = function (model, props, nodeInfos) {
    initNodeEvent(model, props, nodeInfos)
  }
  var inNode
  function initNodeEvent (model, props, nodeInfos) {
    var selector = '';
	 for (var key in nodeInfos) {
      selector = selector += ('#' + key + ',')
    }
    $(selector.substr(0, selector.length - 1)).mouseenter(function () {
	 var keyId = $('#' + this.id)
	 var nodelock = $('#' + this.id + '_nodelock')
	  oldColorCss = keyId.css('border')
      inNode = true
      var guideTipsObj = $('div#guidetips')
      var guideTipsTxt = $('div#guideTipsTxt')
      var nodeTipsTxt = $('div#nodeTipsTxt')
      guideTipsObj.hide()
	  var displayCss = nodelock.css('display')
	  if (displayCss != 'none') {
	       var showMsg = getLanguageNode(model, 'key0004')
		   var keyStr = this.id
		   if (systemNodeInfos[keyStr] != undefined) {
		   showMsg = systemNodeInfos[keyStr][2]
		   } else if (settingNodeInfos[keyStr] != undefined) {
		   showMsg = settingNodeInfos[keyStr][2]
		   } else if (baseNodeInfos[keyStr] != undefined) {
		   showMsg = baseNodeInfos[keyStr][2]
		   } else if (modleNodeInfos[keyStr] != undefined) {
		   showMsg = modleNodeInfos[keyStr][2]
		   } else if (beginNodeInfos[keyStr] != undefined) {
		   showMsg = beginNodeInfos[keyStr][2]
		   }
	       nodeTipsTxt.html(showMsg)
	  }else {
	       nodeTipsTxt.html(nodeInfos[this.id][1])
	  }
      nodeTipsTxt.css('display', 'inherit')
      guideTipsTxt.css('display', 'none')
      keyId.css('border', '1px solid rgba(85,130,243,1)')
      guideTipsObj.fadeIn(1)
    }).mouseleave(function () {
	    var keyId = $('#' + this.id)
         inNode = false
        if (inNode) {
        return
        }
      var guideTipsObj = $('div#guidetips')
      var guideTipsTxt = $('div#guideTipsTxt')
        var nodeTipsTxt = $('div#nodeTipsTxt')
        keyId.css('border', oldColorCss)
        guideTipsObj.hide()
        nodeTipsTxt.css('display', 'none')
        guideTipsTxt.css('display', 'inherit')
        guideTipsObj.fadeIn(1)
    })

    $(selector.substr(0, selector.length - 1)).click(function () {
      var nodeKey = this.id
	  var nodelock = $('#' + nodeKey + '_nodelock')
	  var displayCss = nodelock.css('display')
	  if (displayCss != 'none') {
	       return
	  }
      model.invoke('click', {
        initGuideEvent: true,
        nodeKey: nodeKey,
        type: 'clicklink',
        'top.outerWidth': top.outerWidth,
        'top.outerHeight': top.outerHeight
      })
    })
  }

  // 等待某个节点加载完后才执行操作
  $.fn.wait = function (selector, func, times, interval) {
    var _times = times || -1; //100次
            var _interval = interval || 20; //20毫秒每次 
            var _self = this;
            var _selector = selector; //选择器
            var _iIntervalID //定时器id
        if (this.length) { // 如果已经获取到了，就直接执行函数
      func && func.call(this)
        } else {
      _iIntervalID = setInterval(function () {
        if (!_times) { // 是0就退出
          clearInterval(_iIntervalID)
                }
        _times <= 0 || _times-- //如果是正数就 --

                _self = $(_selector) //再次选择
                if (_self.length) { // 判断是否取到
          func && func.call(_self)
                    clearInterval(_iIntervalID)
                }
      }, _interval)
        }
    return this
    }

  console.log('-----------------init')
  // 注册自定义控件
  KDApi.register('calinventotyaccount', MyComponent, {
    isMulLang: true
  })
})(window.KDApi, jQuery)
