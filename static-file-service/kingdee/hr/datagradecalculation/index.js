
(function (KDApi, $) {
	function datagradecalculation(model) {
		this._setModel(model);
	}
	datagradecalculation.prototype = {
		_setModel: function (model) {
			this.model = model;
		},
		init: function (props) {
        initFunc(this.model, props)
		},
		update: function (props) {
		},
		destoryed: function () {
		},
		handleDirective: function (props, directive, args) {
            // directive setCalResult. 返回计算结果
            if (directive == "setCalResult") {
              $('.partTwo', this.model.dom).hide()
              $('.partOne', this.model.dom).css({visibility:'visible'})
              let resData = args[0]
              // 结果的name是唯一的，在数据分级那边可以控制唯一性，结果至少有一个
              // 返回结果只有name这一个string值，理解应该object值
              let resArr = Object.keys(resData)
              let tempArr = JSON.parse(props.data).head.result
              let resStr = ''
              for (let i = 0; i < resArr.length; i++) {
                let resDom  = $(this.model.dom).find(`input[resultSign="${resArr[i]}"]`)
                let tempItem = tempArr.find(item => item.name == resArr[i])
                resStr = resData[resArr[i]] != null ? resData[resArr[i]] : ''
                if (tempItem.propsName == "number" || tempItem.propsName == "money") {
                  if (resStr != '') {
                    resStr = Number(resStr).toFixed(tempItem.precision)
                  }
                } else if (tempItem.propsName == "date") {
                  if (resStr != '') {
                    resStr = formatDate(new Date(resStr))
                  }
                }
                resDom.val(resStr)
              }

            } else if (directive == "updateBaseParam") {
              let {conditionID, name, id} = args[0]
              $(`[conditionID=${conditionID}]`).attr('valueId', id)
              $(`[conditionID=${conditionID}]`).attr('title', name)
              $(`[conditionID=${conditionID}]`).val(name)
            }
		}
  }
  var initFunc = function(model, props) {
    let propsData = props.data && JSON.parse(props.data)
    model.datagradecalculation = props.data
    KDApi.loadFile('./css/datagradecalculation.css', model, function() {
      KDApi.getTemplateStringByFilePath('./component/datagradecalculation.html', model, {
          condition: propsData.head.condition,
          result: propsData.head.result
      }).then(function (result) {
        model.dom.innerHTML = result;
        handleEvent(model, props)
      })
    })
  }
  var handleEvent = function(model, props) {
    $('.customDatepicker', model.dom).hide()
    $('.partOne', model.dom).css({visibility:'hidden'})
    $(model.dom).on('click', '.calculateBtn', function() {
      let conditionsDOM = $('.conditions', model.dom).find('.conditionItem')
      if (conditionsDOM.length == 0) return
      let conditionData = {}
      for (let i = 0; i < conditionsDOM.length; i++) {
        let conditionID = $(conditionsDOM[i]).find('input').attr('conditionID')
        let inputDom = $(conditionsDOM[i]).find('input')
        let isBase = inputDom.attr('basedataid') ? true : false
        let conditionValue = $(conditionsDOM[i]).find('input').val()
        conditionData[conditionID] = isBase ? inputDom.attr('valueId') : conditionValue
      }
      model.invokeCustomMethod('simulateCalculate',  {
        dataGradeTableStr: model.datagradecalculation,
        params: conditionData
      })
    })
    $(model.dom).on('click', '.closeBtn', function() {
      model.invokeCustomMethod('closeWindow')
    })

    $(model.dom).on('click', '.baseSearch', function() {
      // 条件是基础资料的 key: basedatafield 
      let baseDataId = $(this).attr('baseDataId')
      let conditionID = $(this).attr('conditionID')
      model.invokeCustomMethod('clickBase', {
        basedatafield: baseDataId,
        conditionID: conditionID
      })
    })
    $(model.dom).on('change', '.enterNumber', function() {
      let numberVal = $(this).val()
      let precisionID = $(this).attr('precisionID')
      $(this).val(Number(numberVal).toFixed(precisionID))

    }) 
    
    // number ，禁止输入特殊字符
    $(model.dom).on('keypress', '.enterNumber', function(event) {
      let val = $(this).val()
      let arr = val.indexOf('-') > -1 || val != ''  ? [101, 43, 45, 69] : [101, 43, 69] 
      if (arr.includes(event.keyCode)) {
          event.returnValue = false
          return false
      }
    })
    $(model.dom).on('click', '.calendarIcon', function() {
      let divDom =  document.createElement('div')
      divDom.setAttribute('class', 'i_customDatepicker')
      divDom.innerHTML = '<div class="customDatepicker">自定义</div>'
      let clickItemDoom = $(this).parent()[0]
      let clickItemRect = $(this).parent()[0].getBoundingClientRect()
      let conditionsDom = $('.conditions', model.dom).get(0)
      let leftDistance = clickItemDoom.offsetLeft - clickItemDoom.scrollLeft + clickItemDoom.clientLeft
      let topDistance = clickItemDoom.offsetTop - clickItemDoom.scrollTop +  clickItemDoom.clientTop
      $('.customDatepicker').css({left: `${leftDistance}px`, top: `${topDistance}px`})

      $('.customDatepicker', model.dom).show()
    })
  }
    var formatDate = function(date) {
      var y = date.getFullYear()
      var m = date.getMonth() + 1
      m = m < 10 ? '0' + m : m
      var d = date.getDate()
      d = d < 10 ? ('0' + d) : d
      return y + '/' + m + '/' + d
  }

	KDApi.register('datagradecalculation', datagradecalculation);

})(window.KDApi, jQuery)
