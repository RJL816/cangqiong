(function (KDApi, $) {
  console.log('cas_claimanno_moblist_menu_more版本：','202108110932')
	// 构造函数
	function MyComponent (model) {
	  this._setModel(model)
  }
  
  let targetListItem = null;

  let intervalInstance = null;

  let tmpPageId = null;
  
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
      // console.log('自定义控件更新', this.model.pageId)
      // console.log('-----update', this.model, props)
      themeColor = getThemeColor(props.theme)
      setHtml(this.model, props, true)
	  },
	  // 生命周期：销毁
	  destoryed: function () {
      // console.log('自定义控件销毁', this.model.pageId)
      // console.log('-----destoryed', this.model)
      removeMenu(this.model.pageId)
      if (intervalInstance) {
        clearTimeout(intervalInstance)
      }
	  }
  
	}
  
	// 加载文件和模板
	var setHtml = function (model, props, isUpdate) {
		// var cssHref = KDApi.getNameSpace(model) + './css/index.css'
		// var prefix = model.pageId; 
		intervalInstance = setTimeout(func, 1000);

		function func() {
			if (document.querySelectorAll('[id="btn_menu_more"]').length > 0) {
				// console.log('==============初始化完成')
	  			// 加载css文件
				KDApi.loadFile('./css/index.css', model, function () {
					// 加载模板
          updateHtml(model, props, isUpdate)
				})
			} else {
        // console.log('==============初始化中')
				intervalInstance = setTimeout(func, 1000);
			}
		}
	  
	}
  
	var updateHtml = function (model, props, isUpdate) {
    if (!isUpdate) {
      let container = document.getElementById(`container_${model.pageId}`)
      if (!container) {
        // 模板字符串
        var template = `
        <div class="custom-control-container" id="container_${model.pageId}">
          <div class="menu-box" id="menu-box_${model.pageId}">
            <div class="menu-more" id="menu_more_${model.pageId}">
              <div class="menu-item" id="menu_item_ignore_${model.pageId}">${KDApi.getLangMsg(model, 'cas_claimanno_moblist_menu_more.key_0001')}</div>
              <div class="menu-item" id="menu_item_cancel_ignore_${model.pageId}">${KDApi.getLangMsg(model, 'cas_claimanno_moblist_menu_more.key_0002')}</div>
              <div class="menu-item" id="menu_item_hold_on_${model.pageId}">${KDApi.getLangMsg(model, 'cas_claimanno_moblist_menu_more.key_0003')}</div>
              <div class="menu-item" id="menu_item_cancel_merge_${model.pageId}">${KDApi.getLangMsg(model, 'cas_claimanno_moblist_menu_more.key_0004')}</div>
            </div>
          <div>
        </div>`
        // 根据接收的参数将字符串模板转为innerHTML
        var result = KDApi.getHTMLStringBytemplate(template, {})
        model.dom.innerHTML = result
  
        // let el = document.createElement('div');
        // el.id = "container"
        // el.classList.add("custom-control-container")
        // el.innerHTML = template;
        // document.body.prepend(el)
        // 绑定DOM操作事件
        setTimeout(() => {
          initEvent(model, props)
        }, 200);
      }
    } else {
      if (props.data && props.data.type) {
        // 1：忽略
        // 2：取消忽略
        // 4：稍后处理
        // 8：取消合并
        // 未处理：   忽略+稍后处理      5
        // 稍后处理： 忽略                1
        // 我忽略的： 取消忽略+稍后处理   6
        let eleMenuItemIgnore = document.getElementById(`menu_item_ignore_${model.pageId}`)
        let eleMenuItemCancelIgnore = document.getElementById(`menu_item_cancel_ignore_${model.pageId}`)
        let eleMenuItemHoldOn = document.getElementById(`menu_item_hold_on_${model.pageId}`)
  
        eleMenuItemIgnore.classList.remove('show')
        eleMenuItemCancelIgnore.classList.remove('show')
        eleMenuItemHoldOn.classList.remove('show')
  
        if (props.data.type & 1) {
          eleMenuItemIgnore.classList.add("show")
        }
        if (props.data.type & 2) {
          eleMenuItemCancelIgnore.classList.add("show")
        }
        if (props.data.type & 4) {
          eleMenuItemHoldOn.classList.add("show")
        }
      }
    }
    // 事件监听，代理到flexpanelapoperator
    let target = document.querySelectorAll('[id="tabap"]')
    target.forEach(element => {
      element.addEventListener('click', btnClickListener)
    })
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
    // console.log('==============initEvent:初始化事件==============', model.pageId)
    
    // 菜单事件监听
    document.getElementById(`menu_item_ignore_${model.pageId}`).addEventListener('click', menuItemIgnoreEventListener)
    document.getElementById(`menu_item_cancel_ignore_${model.pageId}`).addEventListener('click', menuItemCancelIgnoreEventListener)
    document.getElementById(`menu_item_hold_on_${model.pageId}`).addEventListener('click', menuItemHoldOnEventListener)
    document.getElementById(`menu_item_cancel_merge_${model.pageId}`).addEventListener('click', menuItemCancelMergeEventListener)

    // 点击其他地方的时候移除菜单
    document.getElementById(`menu-box_${model.pageId}`).addEventListener('click', removeMenu)

    // 忽略按钮事件
		function menuItemIgnoreEventListener (e) {
      menuItemClick("menu_item_ignore", e, true)
    }

    // 取消忽略
    function menuItemCancelIgnoreEventListener (e) {
      menuItemClick("menu_item_cancel_ignore", e, true)
    }

    // 稍后处理
    function menuItemHoldOnEventListener (e) {
      menuItemClick("menu_item_hold_on", e, true)
    }

    // 取消合并
    function menuItemCancelMergeEventListener (e) {
      menuItemClick("menu_item_cancel_merge", e)
    }
    
    function menuItemClick(key, e, removeItem) {
      let listItemId = window.sessionStorage.getItem('CAS_CLAIM_M_ID')
      model.invoke('click', {
        "nodeKey" : key,
        "targetId": listItemId
      })
      removeMenu(model.pageId)
      if (removeItem) {
        // 这里可以通过后端代码移除
        removeListItem(targetListItem)
      }
      
      console.log({
        "nodeKey" : key,
        "targetId": listItemId
      }, model.pageId)

			e.stopPropagation();
    }
  
    function removeListItem(target) {
      // target.classList.add("remove")
      // setTimeout(() => {
      //   // target.parentNode.removeChild(target)
      //   target.classList.add('hidden')
      // }, 900);
    }
    
  }

  function btnClickListener (e) {
    // console.log(e)
    if (e.target.id === 'btn_menu_more' || (e.target.parentNode && e.target.parentNode.id === 'btn_menu_more')) {
      let target = e.target.nodeName.toUpperCase() === 'SPAN' ? e.target.parentNode : e.target;
      // console.log(target.dataset);
      /([0-9a-zA-Z]+)_btn_menu_more/.test(target.dataset['pageId'])
      tmpPageId = RegExp.$1
      // 取消合并按钮
      let eleMenuItemCancelMerge = document.getElementById(`menu_item_cancel_merge_${tmpPageId}`)
      let mergeStatus = target.parentNode.querySelectorAll("[data-page-id$=_flex_is_merge]>div>div")[0].innerHTML
      if (mergeStatus === '已合并' || mergeStatus === 'Merged') {
        eleMenuItemCancelMerge.classList.add('show')
      } else {
        eleMenuItemCancelMerge.classList.remove('show')
      }
      // 添加菜单
      showMenu(target)
      // 记录ID
      let id = target.parentNode.querySelectorAll("[data-page-id$=_flex_id]>div>div")[0].innerHTML
      window.sessionStorage.setItem('CAS_CLAIM_M_ID', id)

      targetListItem = target.parentNode.parentNode.parentNode
    }
  }


  function showMenu (target) {
    // console.log('显示菜单',tmpPageId)
    let ele = document.getElementById(`menu_more_${tmpPageId}`);
    
    // 显示菜单
    document.body.append(document.getElementById(`menu-box_${tmpPageId}`))

    ele.style.bottom = window.innerHeight - target.getBoundingClientRect().top + 7 + 'px';
    ele.style.left = target.getBoundingClientRect().left - (target.clientWidth / 4) +  'px';
    // ele.style.left = target.getBoundingClientRect().left - (ele.clientWidth-target.clientWidth) +  'px';

  }

  function removeMenu() {
    // console.log('移除菜单', tmpPageId)
    let container = document.getElementById(`container_${tmpPageId}`)
    if (container) {
      let ele = document.getElementById(`menu-box_${tmpPageId}`);
      if (ele) {
        container.append(ele)
      }
    }
  }


	// 注册自定义控件
	KDApi.register('cas_claimanno_moblist_menu_more', MyComponent, {
    isMulLang: true
  })
  })(window.KDApi)
  