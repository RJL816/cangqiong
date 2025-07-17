(function (KDApi, $) {
  function MyComponent (model) {
    this._setModel(model)
  }

  var themeColor // 顶层变量声明
  var isUpdate = false
  var mouseDownKey = ''
  MyComponent.prototype = { // 内部函数不推荐修改
    _setModel: function (model) { 
      this.model = model // 内部变量挂载
    },
    init: function (props) {
	  setCustomStyle(this.model, props)
    },
    update: function (props) {
	  updateHtml(this.model, props)
    }, 
    destoryed: function () {
      console.log('-----destoryed', this.model)
    }

  } 

  /**
   * 加载自定义样式
   * @param {*} model 
   * @param {*} props 
   */
  var setCustomStyle = function(model, props) {
	  KDApi.loadFile('./customStyle.css', model, function () {
		//  加载完成$_fill_column_&
		handelDomEvent(model, props)
		// let setCol = $(`#${props.data.tabKey}`).find('div[data-code="$_fill_column_&"]')
		// let setColArr = Array.from(setCol)
		// setColArr.map(item => item.remove())
		// 监听滚动
		let scrollTimer;
		if ($(`#${props.data.tabKey}`).find('.kd-sticky-scroll').length == 0) return;
		$(`#${props.data.tabKey}`).find('.kd-sticky-scroll').get(0).addEventListener('scroll', function () {
			clearTimeout(scrollTimer);
			scrollTimer = setTimeout(() => {
			// todo something scroll end
			initEvent(model, props)
			handelDomEvent(model,props)
			}, 300);
		})
	  })
  }

  /**
   * 监听Dom事件
   * @param {*} model 
   * @param {*} props 
   */
  var handelDomEvent = function(model, props) {
	$(`#${props.data.tabKey}`).find('.kd-table-header-cell').on("mouseover", function(e) {
		//e.preventDefault()
		e.currentTarget.style.backgroundColor = "var(--theme-color-level3)"
		e.currentTarget.style.border = "1px solid var(--theme-color)"
		e.currentTarget.style.borderBottom = ""
		e.currentTarget.style.cursor = 'move'
		$(e.currentTarget).find('.kd-table-header-cell-content').css('color', 'var(--theme-color)')
		// data-code="number"
		let colId = e.currentTarget.getAttribute('data-code')
		if(colId === '' || colId === '$_fill_column_&' || colId === '__tableConfigPlaceholderColumn'){
			return;
		}
		let doms = $(`#${props.data.tabKey}`).find(`td[data-code=${colId}]`)
		let domsArr = Array.from(doms)
		domsArr.map((item,index) => {
			item.style.borderLeft = "1px solid var(--theme-color)"
			item.style.borderRight = "1px solid var(--theme-color)"
			if (index == domsArr.length - 1) {
			   item.style.borderBottom = "1px solid var(--theme-color)"
			}
		})
    })

	$(`#${props.data.tabKey}`).find('.kd-table-header-cell').on("mouseout", function(e) {
		// e.preventDefault()
		e.currentTarget.style.backgroundColor = ""
		e.currentTarget.style.border = ""
		e.currentTarget.style.cursor = ''
		$(e.currentTarget).find('.kd-table-header-cell-content').css('color', '')
		let colId = e.currentTarget.getAttribute('data-code')
		if(colId === '' || colId === '$_fill_column_&' || colId === '__tableConfigPlaceholderColumn'){
			return;
		}
		let doms = $(`#${props.data.tabKey}`).find(`td[data-code=${colId}]`)
		let domsArr = Array.from(doms)
		domsArr.map(item => {
			item.style.border = ""
		})

    })
  }

  /*
   * 外部函数声明
   */
  var updateHtml = function (model, props) {
	if(props.data.actionKey === 'merge'){
		// 合并表头
		mergeClick(model, props)
	}else if(props.data.actionKey === 'cancelmerge'){
		// 取消合并表头
		cancelMergeClick(model, props)
	}else if(props.data.actionKey === 'initDblClickEvent'){
		// 分支名称双击事件
		setTimeout(function(){initDblClickEvent(model, props)},1300)
	}else{
		// 给自定义控件增加事件
		initEvent(model, props)
		setTimeout(function(){initDblClickEvent(model, props)},1300)
	}

	setTimeout(function(){handelDomEvent(model, props)},1500)


  }
  
  
  /*
   * 合并按钮监听
   */ 
  var mergeClick = function (model, props) { 	
	let data =  $('#'+props.data.tabKey).find('.kd-table-cell-range-selected')
	  if(data.length === 0){
		return
	  }
	  data.sort(function(a,b) {
        return Number(a.style.left.split('px')[0]) - Number(b.style.left.split('px')[0])
      })
	  let res = new Set(Array.from(data).map(item => item.getAttribute('data-code')))
	  model.invoke('mergeClick', Array.from(res).toString())
  }
  
  /*
   * 取消合并按钮监听
   */ 
  var cancelMergeClick = function (model, props) { 		
	let data =  $('#'+props.data.tabKey).find('.kd-table-cell-range-selected')
	if(data.length === 0){
		return
	}
	data.sort(function(a,b) {
        return Number(a.style.left.split('px')[0]) - Number(b.style.left.split('px')[0])
    })
	let res = new Set(Array.from(data).map(item => item.getAttribute('data-code')))
	model.invoke('cancelMergeClick', Array.from(res).toString())
  }
  
  /*
   * 头部鼠标弹起事件监听
   */ 
  var agHeaderMouseUp = function(model, props){
	    // let hover = $('#'+props.data.tabKey).find('div.ag-column-hover')
		// if(hover === null || hover[0] === undefined){
		  // return
		// }
		// let colId = hover[0].getAttribute('data-code')
		if(mouseDownKey === '' || mouseDownKey === 'header' || mouseDownKey === '$_fill_column_&' || mouseDownKey === '__tableConfigPlaceholderColumn'){
			return
		}
		// let data = Array.from($('#'+props.data.tabKey).find('div.ag-cell[role="gridcell"]'))
		// 分2部分
		// let data2 = data.concat(data1)
		let data2 = Array.from($('#'+props.data.tabKey).find('tbody tr')[0].children)
		var res = []; // 用于接收去除重复元素后的数组 
		for(var i = 0; i < data2.length; i++){
			let temp = data2[i].getAttribute('data-code')
			// 判断arr数组中的元素是否存在于a数组种
			if(temp !== 'header' && temp !== '$_fill_column_&' && temp !== '__tableConfigPlaceholderColumn' && jQuery.inArray(temp,res) < 0){
				res.push(temp); // 不存在则将该元素存放于a数组中
			}
		}
		
		let index = res.findIndex(item => item == mouseDownKey)
		let afterMouseDownKey = res[index + 1]
		if(afterMouseDownKey === undefined){
			afterMouseDownKey = ' '
		}
		let beforeMouseDownKey =  res[index - 1]
		if(beforeMouseDownKey === undefined){
			beforeMouseDownKey = ' '
		}
		if(afterMouseDownKey === ' ' && beforeMouseDownKey === ' '){
			return
		}
		model.invoke('fieldMove', beforeMouseDownKey + ',' + mouseDownKey + ',' + afterMouseDownKey)
		// 清空，防止重复调用
		mouseDownKey = ''
  }
  
  /*
   * 双击监听
   */
  var initDblClickEvent = function (model, props) {
	  /*
	* 表头内容双击事件
	*/
	$('#'+props.data.tabKey).find('.kd-table-header-cell').on('dblclick', function(e) {
		e.preventDefault()
		if($(this)[0].getAttribute('colspan') > 1){
			let data =  Array.from($(this).parent().find('.kd-table-header-cell'))
			data.sort(function(a,b) {
				return Number(a.style.left.split('px')[0]) - Number(b.style.left.split('px')[0])
			})
			let index = data.findIndex(item => item === $(this)[0]) - 1
			let spanValue = $(this).find('.kd-table-header-title').text()
			model.invoke('editGroupName', index + '#' + spanValue)
		}
	})
  }
  

  /*
   * 列表拖动监听
   */ 
  var initEvent = function (model, props) {
	// 鼠标弹起事件
	$('#'+props.data.tabKey).find('.kd-table-cell').on("mouseup", function(e) {
		e.preventDefault()
		setTimeout(function(){agHeaderMouseUp(model, props)},300)	
    })
	$('#'+props.data.tabKey).find('.kd-table-header').on('mouseup', function(e) {	
		e.preventDefault()
		setTimeout(function(){agHeaderMouseUp(model, props)},300)	
	})
	
	$('#'+props.data.tabKey).find('.kd-table-header-cell').on("mousedown", function(e) {
		e.preventDefault()
		//let hover = $('#'+props.data.tabKey)
		//if(hover === null || hover[0] === undefined){
		//  return
		//}
		mouseDownKey = this.getAttribute('data-code')
    })
	
	// 鼠标弹起事件(给合并表头的)
	// $('#'+props.data.tabKey).find('.ag-header-group-cell').on('mouseup', function(e) {	
		// e.preventDefault()
		// agHeaderMouseUp(model, props)
	// })
	// $('#'+props.data.tabKey).find('.ag-header-cell').on('mouseup', function(e) {		
		// e.preventDefault()
		// agHeaderMouseUp(model, props)
	// })
  }
  
  // 注册自定义控件
  KDApi.register('fieldStyle', MyComponent)
})(window.KDApi, jQuery)