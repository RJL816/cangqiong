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
        themeColor = getThemeColor(props.themeColor)
        setHtml(this, this.model, props)
      }
    },
    update: function (props) {
      if (props.data) {
        themeColor = getThemeColor(props.themeColor)
        setHtml(this, this.model, props)
      }
    },
    destroy: function (props) {
      $(window).off('click resize', this.hideFloatingPanel)
      document.removeEventListener('scroll', this.hideFloatingPanel, true)
      clearLocalStorage(this.model)
    }
  }
  function ItemsFloatingPanel (model, props) {
    var isExtend = getLocalStorage(model) === 'true' || false
    var listItem = props.data.listItem
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
    this.createListItems = function (listItem) {
      return listItem.reduce(function (pre, cur) {
        return pre + '<div class="floatingPanel-list-item" title="' + cur + '">' + cur + '</div>'
      }, '')
    }

    // 搜索
    this.search = function (e) {
      var value = e.target.value
      var filterArr = []
      if (value === '') {
        filterArr = listItem
      } else {
        filterArr = listItem.filter(function (item) {
          return item.indexOf(value) > -1
        })
      }
      var listItemStr = this.createListItems(filterArr)
      $('.floatingPanel-list', model.dom).empty().append(listItemStr)
    }

    // 值回填
    this.insertValue = function (e) {
      var value = e.target.innerText
      model.invoke('insertValue', value)
    }

    this.hideFloatingPanel = function (e) {
      if (isExtend) return
      var target = e.target
      var ele = $('.itemsFloatingPanel', model.dom)[0]
      while (target) {
        if (target !== ele) {
          target = target.parentNode
        } else {
          return
        }
      }
      $('.itemsFloatingPanel', model.dom).css({
        'top': '-10000px',
        'left': '-10000px'
      })
    }
    this.handleExtend = function (e) {
      if (!isExtend) {
        isExtend = true
        $(e.target).css({
          'transform': 'rotate(180deg)'
        })
        $('.itemsFloatingPanel', model.dom).removeClass('extend')
      } else {
        isExtend = false
        $(e.target).css({
          'transform': 'rotate(360deg)'
        })
        $('.itemsFloatingPanel', model.dom).addClass('extend')
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
    KDApi.loadFile('./css/itemsfloatingpanel.css', model, function () {
      KDApi.getTemplateStringByFilePath('./html/itemsfloatingpanel.html', model, {
        title: data.title,
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
    var floatingPanel = $('.itemsFloatingPanel', model.dom)
    if (getLocalStorage(model) === 'true') {
      floatingPanel.removeClass('extend')
    }
    var dataPageId = model.pageId + '_' + props.data.treeDom
    var treeDom = $('[data-page-id=' + dataPageId + ']')
    var itemsFloatingPanel = new ItemsFloatingPanel(model, props)
    self.hideFloatingPanel = function (e) {
      itemsFloatingPanel.hideFloatingPanel(e)
    }
    itemsFloatingPanel.setPosition(treeDom, floatingPanel)
    $('.floatingPanel-extend', model.dom).on('click', function (e) {
      itemsFloatingPanel.handleExtend(e)
    })
    $('.floatingPanel-searchInput', model.dom).on({
      'keyup': function (e) {
        var flag = e.target.isNeedPrevent
        if (flag) return
        itemsFloatingPanel.search(e)
        e.target.keyEvent = false
      },
      'keydown': function (e) {
        e.target.keyEvent = true
      },
      'input': function (e) {
        if (!e.target.keyEvent) itemsFloatingPanel.search(e)
      },
      'compositionstart': function (e) {
        e.target.isNeedPrevent = true
      },
      'compositionend': function (e) {
        e.target.isNeedPrevent = false
      }
    })
    $('.floatingPanel-list', model.dom).on('click', '.floatingPanel-list-item', function (e) {
      itemsFloatingPanel.insertValue(e)
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
    $(window).on('click resize', self.hideFloatingPanel)
    document.addEventListener('scroll', self.hideFloatingPanel, true)
  }
  KDApi.register('itemsfloatingpanel', MyComponent)
})(window.KDApi, jQuery)
