(function(KDApi, $, _){
  function MyComponent(model){
    this._setModel(model);
  }
  MyComponent.prototype = {
    _setModel: function(model){
      this.model = model;
    },
    init: function(props){
      setHtml(this.model, props);
    },
    update: function(props){
      setHtml(this.model, props);
    },
    destory: function(props){

    }
  }
  function XiaoK(model, props){
    //动画options
    var animationOptions = {
      container: document.getElementById(model.pageId + "_lottie"),
      renderer: "svg",
      autoplay: true
    }
    //状态改变
    this.changeState = function(path, isloop){
      animationOptions.path = path;
      animationOptions.loop = isloop;
    }
    //动画
    this.createAnimation = function(){
      var animation = window.bodymovin.loadAnimation(animationOptions);
      return animation;
    }
    //销毁动画
    this.destoryAnimation = function(animation){
      animation.destroy();
    }
  }

  var setHtml = function(model,props){
    $(model.dom).css({
      'overflow':'visible',
      'display':'flex',
      'align-items':'center',
      'justify-content':'center'
    })
    var data = props.data ? props.data : {"flexList":[]};
    //先将相关的flex面板隐藏
    var flexList = _.map(data.flexList, function (n) {
      return model.pageId + '_' + n;
    });  
    initStyle(props, flexList);
    KDApi.loadFile("./css/xiaoK.css",model, function(){
      //加载动画所需要的lottie库
      KDApi.loadFile("./js/lottie_svg.min.js", model, function(){
        var template = '<div id="' + model.pageId + '_lottie" style="width:100%;height:100%;transform:translate3d(0,0,0);"></div>';
        var result = KDApi.getHTMLStringBytemplate(template,{});
        model.dom.innerHTML = result;

        //执行一系列的动画
        initEvent(model, props, flexList);

      })      
    })

  }

  var initEvent = function(model,props,flexList){
    var xiaoK = new XiaoK(model, props);
    var direction = props.configItems[0].value;
    var testingpath = KDApi.nameSpace(model) + './json/testing.json';
    xiaoK.changeState(testingpath, false);
    var testingAnimation = xiaoK.createAnimation();
    handleDirection(model, props, direction);
    testingAnimation.addEventListener("complete", function(){
      //xiaoK.destoryAnimation(testingAnimation);
      var completepath = KDApi.nameSpace(model) + './json/complete.json';
      xiaoK.changeState(completepath,false);
      //xiaoK.destoryAnimation();
      var completeAnimation = xiaoK.createAnimation();
      xiaoK.destoryAnimation(testingAnimation);
      completeAnimation.addEventListener("complete", function(){
        //xiaoK.destoryAnimation(completeAnimation);
        returnDirection(model, direction);
        //显示之前被隐藏的flex             
        showReporter(flexList);
        var normalpath = KDApi.nameSpace(model) + './json/normal.json';
        xiaoK.changeState(normalpath,true);
        //xiaoK.destoryAnimation();
        var normalAnimation = xiaoK.createAnimation();
        xiaoK.destoryAnimation(completeAnimation);
      })
    })
  }

  var initStyle = function(props, flexList){
    flexList.forEach(function(value,index){
      $('[data-page-id="' + flexList[index] + '"]').css({
        "marginTop": props.configItems[2] && props.configItems[2].value === 'fadeOut' ? "0px" : "100px",
        "display":"none"
      })
    })
  }

  var showReporter = function(flexList){
    flexList.forEach(function(value,index){
      $('[data-page-id="' + flexList[index] + '"]').fadeIn(1000,function(){
        $('[data-page-id="' + flexList[index] + '"]').animate({"marginTop":"0px"},"slow");
      })
    })
  }

  var handleDirection = function(model, props, direction){
    if(direction === 'down'){
      $('#' + model.pageId + '_lottie',model.dom).animate({
        'marginTop':props.configItems[1].value || '100px',
        'width':'100px',
        'height':'100px'
      },1000)
    }
    if(direction === 'right'){
      $('#' + model.pageId + '_lottie',model.dom).animate({
        'marginLeft':props.configItems[1].value||'100px'
      },1000)
    }
  }

  var returnDirection = function(model, direction){
    if(direction === 'down'){
      $('#' + model.pageId + '_lottie',model.dom).animate({
        'marginTop':'0px',
        'width':'80px',
        'height':'80px'
      },'slow')
    }
    if(direction === 'right'){
      $('#' + model.pageId + '_lottie',model.dom).animate({
        'marginLeft':'0px'
      },'slow')
    }
  }
  KDApi.register("xiaok",MyComponent);
})(window.KDApi, jQuery, _)