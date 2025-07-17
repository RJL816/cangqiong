// 20211018
(function (KDApi, $) {
  function MyComponent(model) {
    this._setModel(model)
  }
  MyComponent.prototype = {
    // 将元数据和业务数据传给自定义控件
    _setModel: function (model) {
      this.model = model
    },
    // 初始化自定义控件，加载数据
    init: function (props) {
	  // themeColor = getThemeColor(props.themeColor)
      if (!$.isEmptyObject(props.data)) { //初始化数据
        setHtml(this, this.model, props)
      }
    },
    // 更新阶段，当数据发生改变时，调用该方法
    update: function (props) {
     

    },
    // 页面关闭销毁时，自定义控件随之销毁，调用此方法释放资源等等
    destroy: function (props) {

    }
  }
  var listId = 'intercoList';
  var setHtml = function (self, model, props) {
	// 不能使用Object.values方法，无法保证顺序性
	var scrollList = props.data;
	var scrollData = {}
	scrollList.reduce(function(pre,cur){
		pre[cur.id] = cur
		return pre
	}, scrollData)
    // console.log('服务端发送的scrollList数据', scrollList)
    var data = {
      list: scrollList,
    };
    if (scrollList) {
      KDApi.loadFile('./css/index.css', model, function () {
        KDApi.getTemplateStringByFilePath('./html/autoScrollList.html', model, {
          advertData: data
        }).then(
          function (result) {
            model.dom.innerHTML = result
            if (scrollList.length > 0) {
              KDApi.loadFile('./js/jcarousellite_1.0.1.pack.js',model,function (){
				handleClick(model,scrollData)
                initActive();
              })
            }
          }
        )
      })
    }
  }
  function initActive() {
    if ($("#advUl li").length > 6) { //最多展示6条数据
      $('#' + listId).jCarouselLite({
        vertical: true,
        hoverPause: true,
        visible: 6,
        auto: 5000,
        speed: 1500
      });
    }
  }

  function handleClick(model,scrollData){
	//点击li的事件
    $('#advUl li').click(function(){
      var id = $(this).attr("id");
	  var data = scrollData[id];
      //向服务端发送指令
      model.invoke("position", data);
    })
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
      case 'red':
        return '#E94E4F'
      default:
        return '#5582F3'
    }
  }
  KDApi.register('intrecoscrolllist', MyComponent)
})(window.KDApi, jQuery)
