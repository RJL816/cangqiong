(function (KDApi, $) {
  function MyComponent (model) {
    this._setModel(model)
  }
  var themeColor = null
  MyComponent.prototype = {
    _setModel: function (model) {
      this.model = model
    },
    init: function (props) {
      if (props.data) {
        this.model.start = props.data.nextStart
        this.model.nodeId = props.data.nodeId
        themeColor = getThemeColor(props.themeColor)
        setHtml(this, this.model, props)
      }
    },
    update: function (props) {
      if (props.data) {
        this.model.start = props.data.nextStart
        this.model.nodeId = props.data.nodeId
        this.model.isEnd = props.data.isEnd
        if(props.data.isAppend === 'true' || props.data.isSearchInit === 'true') {
          appendListItems(this.model, props)
        }else{
          // 重新初始化搜索栏
          this.model.searchValue = ''
          themeColor = getThemeColor(props.themeColor)
          setHtml(this, this.model, props)
        }
      }
    },
    destroy: function (props) {
      
      $(window).off('click resize', this.hideFloatingPanel)
      document.removeEventListener('scroll', this.hideFloatingPanel, true)
      clearLocalStorage(this.model)
      document.removeEventListener('click', this.hideFloatingPanel, false)
    }
  }


  function FormulaItemsFloatingPanel (model, props) {
    var isExtend = getLocalStorage(model) === 'true' || false
    // 点击树节点后，定位到树形控件旁
    this.setPosition = function (treeDom, floatingPanel) {
      var top = treeDom.offset().top
      var left = treeDom.offset().left
      var treeDomWidth = treeDom.width()
      floatingPanel.css({
        'top': top + 'px',
        'left': (left + treeDomWidth) + 'px'
      })
    }

    // 搜索
    this.search = function (e) {
      var value = e.target.value
      model.searchValue = value
      getSearchListItem(model,value)
    }

    // 值回填
    this.insertValue = function (e) {
      var value = e.target.getAttribute('data-value')
      model.invoke('insertValue', value)
    }

    this.hideFloatingPanel = function (e) {
      if (isExtend) return
      var target = e.target
      var ele = $('.formulaItemsFloatingPanel', model.dom)[0]
      while (target) {
        if (target !== ele) {
          target = target.parentNode
        } else {
          return
        }
      }
      $('.formulaItemsFloatingPanel', model.dom).css({
        'top': '-10000px',
        'left': '-10000px'
      })
    }
    this.handleExtend = function (e) {
      if (!isExtend) {
        isExtend = true
        // $(e.target).css({
        //   'transform': 'rotate(180deg)'
        // })
        $(e.target).removeClass('kdfont-yibiaoji')
        $(e.target).addClass('kdfont-biaoji')
        $('.formulaItemsFloatingPanel', model.dom).removeClass('extend')
      } else {
        isExtend = false
        // $(e.target).css({
        //   'transform': 'rotate(360deg)'
        // })
        $(e.target).removeClass('kdfont-biaoji')
        $(e.target).addClass('kdfont-yibiaoji')
        $('.formulaItemsFloatingPanel', model.dom).addClass('extend')
      }
      updateLocalStorage(model, isExtend)
    }
  }
  var createLocalStorageKey = function (model) {
    return model.pageId + model.key + '_isExtend'
  }
  var getLocalStorage = function (model) {
    var localStorageKey = createLocalStorageKey(model)
    var isExtendCacher = window.localStorage.getItem(localStorageKey)
    return isExtendCacher
  }
  var updateLocalStorage = function (model, newCacher) {
    var localStorageKey = createLocalStorageKey(model)
    window.localStorage.setItem(localStorageKey, newCacher)
  }
  var clearLocalStorage = function (model) {
    var localStorageKey = createLocalStorageKey(model)
    window.localStorage.removeItem(localStorageKey)
  }
  var getThemeColor = function (themeColor) {
    switch (themeColor) {
      case 'blue':
        return '#5582F3'
      case 'green':
        return '#29C392'
      case 'orange':
        return '#FC8555'
      case 'purple':
        return '#6869FB'
      case 'red' :
        return '#E94E4F'
      default:
        return '#5582F3'
    }
  }
  var setHtml = function (self, model, props) {
    var data = props.data
    KDApi.loadFile('./css/formulaitemsfloatingpanel.css', model, function () {
      KDApi.getTemplateStringByFilePath('./html/formulaitemsfloatingpanel.html', model, {
        listItem: data.listItem
      }).then(
        function (result) {
          model.dom.innerHTML = result
          initEvent(self, model, props)
        }
      )
    })
  }
  var initEvent = function (self, model, props) {
    $(model.dom).css({
      'display': 'flex',
      'flex-direction': 'column',
      'align-items': 'stretch'
    })
    var floatingPanel = $('.formulaItemsFloatingPanel', model.dom)
    if (getLocalStorage(model) === 'true') {
      $('.floatingPanel-positionFont', model.dom).removeClass('kdfont-yibiaoji')
      $('.floatingPanel-positionFont', model.dom).addClass('kdfont-biaoji')
      floatingPanel.removeClass('extend')
    }
    var dataPageId = model.pageId + '_' + props.data.treeDom
    var treeDom = $('[data-page-id=' + dataPageId + ']')
    var formulaItemsFloatingPanel = new FormulaItemsFloatingPanel(model, props)
    self.hideFloatingPanel = function (e) {
      formulaItemsFloatingPanel.hideFloatingPanel(e)
    }
    formulaItemsFloatingPanel.setPosition(treeDom, floatingPanel)
    $('.floatingPanel-extend', model.dom).on('click', function (e) {
      formulaItemsFloatingPanel.handleExtend(e)
    })
    $('.floatingPanel-searchInput', model.dom).on({
      'keyup': function (e) {
        var flag = e.target.isNeedPrevent
        if (flag) return
        formulaItemsFloatingPanel.search(e)
        e.target.keyEvent = false
      },
      'keydown': function (e) {
        e.target.keyEvent = true
      },
      'input': function (e) {
        if (!e.target.keyEvent) formulaItemsFloatingPanel.search(e)
      },
      'compositionstart': function (e) {
        e.target.isNeedPrevent = true
      },
      'compositionend': function (e) {
        e.target.isNeedPrevent = false
      }
    })
    $('.floatingPanel-list', model.dom).on('click', '.floatingPanel-list-item', function (e) {
      formulaItemsFloatingPanel.insertValue(e)
    })
    $('.floatingPanel-list-item', model.dom).on('mouseenter', function (e) {
      $(this).css({
        'color': themeColor
      })
    }).on('mouseleave', function (e) {
      $(this).css({
        'color': '#333333'
      })
    })
    $('.floatingPanel-list-content', model.dom).on('scroll', function(e) {
      let scrollHeight = e.target.scrollHeight
      let scrollTop = e.target.scrollTop
      let clientHeight = e.target.clientHeight
      let scrollBottom = scrollHeight - scrollTop - clientHeight
      if (scrollBottom < 1) {
        if(model.isEnd != 'true'){
          getAppendListItem(e, model)
        }
        console.log('滚到底了')
      }
    })
    // $(window).on('click resize', self.hideFloatingPanel)
    document.addEventListener('click', self.hideFloatingPanel, false)
    document.addEventListener('scroll', self.hideFloatingPanel, true)

  }

  var appendListItems = function (model, props) {
    var listItem = props.data.listItem
    var listItemStr = createListItems(listItem)
    // 初始化搜索框或者搜索不到结果就清空元素
    if(props.data.isSearchInit === 'true' || (props.data.isEnd === 'true' && listItem.length == 0)){
      $('.floatingPanel-list', model.dom).empty()
    }
    $('.floatingPanel-list', model.dom).append(listItemStr)
  }

  // 请求后端加载更多的数据
  var getAppendListItem = function (e, model) {
    model.invoke('appendLoadData', {"nodeId":model.nodeId,"start":model.start, "searchValue":model.searchValue, "isAppend":"true"})
  }

  // 获取搜索的数据
  var getSearchListItem = function (model, searchValue) {
    model.invoke('searchListItem', {"nodeId":model.nodeId,"start":0,"searchValue":searchValue})
  }

  // 判断是否显示加载更多字符串
  var isShowMore = function (props,model) {
    var isEnd = props.data.isEnd
    if(isEnd === 'true'){
      $('.floatingPanel-list-appendMore', model.dom).hide()
    }else{
      $('.floatingPanel-list-appendMore', model.dom).show()
    }
  }

  // 创建下拉数据
  var createListItems = function (listItem) {
    return listItem.reduce(function (pre, cur) {
      return pre + "<div class='floatingPanel-list-item' data-value='"+cur.showKey+"' title="+ cur.showValue + ">"+ cur.showValue + "</div>"
    }, '')
  }

  KDApi.register('formulaitemsfloatingpanel', MyComponent)
})(window.KDApi, jQuery)
