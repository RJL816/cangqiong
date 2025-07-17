(function (KDApi, $) {
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
      console.log('-----init', this.model, props)
      themeColor = getThemeColor(props.themeColor)
      setHtml(this.model, props)
    },
    // 生命周期：更新
    update: function (props) {
      console.log('-----update', this.model, props)
      themeColor = getThemeColor(props.theme)
      updateHtml(this.model, props)
    },
    // 生命周期：销毁
    destoryed: function () {
      console.log('-----destoryed', this.model)
    }

  }

  // 加载文件和模板
  var setHtml = function (model, props, isUpdate) {
    var cssHref = KDApi.getNameSpace(model) + './css/bar.css'  
    if ($('link[href="' + cssHref + '"]').length === 0) {
      // 加载css文件
      KDApi.loadFile('./css/bar.css', model, function () {
        updateHtml(model, props)
      })
    }
    // 加载模板
    updateHtml(model, props)
  }

  var updateHtml = function (model, props) {
    // 模板字符串
    var template = './html/proprogressbar.art';
    // 根据接收的参数将字符串模板转为innerHTML
    var nodes = props.data;
    var len = (nodes.length-1)>0?(nodes.length-1):0;
    var pageNum = parseInt(len/6)+1
    var result = KDApi.getTemplateStringByFilePath(template,model, {
      text: '标签',
      nodes:nodes,
      pageSize:6,
      pageNum:pageNum
    }).then(function(result){
      model.dom.innerHTML = result
      // 绑定DOM操作事件
      initEvent(model, props,pageNum)
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
  var initEvent = function (model, props, pageNum) {
    function toggleBtn(index,pageNum){
      if(index>=pageNum-1){
        $(".rightarrow",model.dom).hide();
      }else{
        $(".rightarrow",model.dom).show();
      }
      if(index<=0){
        $(".leftarrow",model.dom).hide();
      }else{
        $(".leftarrow",model.dom).show();
      }
    }
    let index = 0;
    $("[data-index='"+index+"']", model.dom).show()
    toggleBtn(index,pageNum)
    $(".rightarrow",model.dom).click(function(){
      if(index<pageNum-1){
        index++;
        $(".barbody .barcell", model.dom).hide()
        $("[data-index='"+index+"']", model.dom).show()
        toggleBtn(index,pageNum)
      }
    })
    $(".leftarrow",model.dom).click(function(){
      if(index>0){
        index--;
        $(".barbody .barcell", model.dom).hide()
        $("[data-index='"+index+"']", model.dom).show()
        toggleBtn(index,pageNum)
      }
    })
  }
  
  console.log('-----------------init')
  // 注册自定义控件
  KDApi.register('processprogressbar', MyComponent)
})(window.KDApi, jQuery)
