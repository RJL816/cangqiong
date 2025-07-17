(function (KDApi, $, _) {
  function MyComponent(model) {
    this._setModel(model);
  }
  /* ————————————————————————————————设置初始化数据，方便生成面板————————————————————————————————————————————*/
 
  /* _____________________________________end_________________________________________________________________*/
  MyComponent.prototype = {
    _setModel: function (model) {
      this.model = model;
    },
    init: function (props) {
      setHtml(this.model, props);
    },
    update: function (props) {
      //外部传递参数
      setHtml(this.model, props);
    },
    destoryed: function () {
      console.log('-----destoryed')
    }
  }
 /*____________________________________________生成用来显示的dom结构——————————————————————————————————————————*/ 
  var setHtml = function (model, props) {
    KDApi.loadFile('./css/countdown.css', model, function() {
        var showPanelHtml =   '<div id="kd_date"><span id="kd_show_title">离截止时间还有 : </span>' +
                              '<span id="_d">00</span>' +
                              '<label>天</label>' +
                              '<span id="_h">00</span>' +
                              '<label>时</label>' +
                              '<span id="_m">00</span>' +
                              '<label>分</label>' +
                              '<span id="_s">00</span>' +
                              '<label>秒</label>' +
                              '</div>';
      var template = showPanelHtml;
      var result = KDApi.getHTMLStringBytemplate(template, {
        keyItem: []        
      })
      model.dom.innerHTML = result;
        
        initEvent(model, props);
    })
  }
  /*_________________________________________________end_____________________________________________________________*/
  
    //初始化事件
    var initEvent = function (model, props) {
        getRTime(model, props);
    }
    var setControl = function(props) {
      var buttonId = (JSON.parse(props.data)).buttonId;
      if(buttonId){
        $("#"+buttonId).hide();
      }
    }
    //倒计时
    var getRTime = function(model, props) {
        if(!props.data){
           return;
        }
        var EndTime = (JSON.parse(props.data)).endDate;
        var titleText = (JSON.parse(props.data)).title;
        var EndTime= new Date(EndTime);   //终止时间
        var NowTime = new Date();
        var t =EndTime.getTime() - NowTime.getTime();
        $("#kd_show_title",model.dom).html(titleText);
        if(t < 0){
            clearTimeout(getRTime);
            //结束计时器触发事件
            setControl(props);
            return false;
        }
        var d=parseInt(t/ 1000 / 60 / 60 / 24);
        h=parseInt(t/ 1000 / 60 / 60 % 24);
        m=parseInt(t/ 1000 / 60 % 60);
        s=parseInt(t/ 1000 % 60);
        d <10 ? d = '0' +d :d =d;
        h <10 ? h = '0' +h :h =h;
        m <10 ? m = '0' +m :m =m;
        s <10 ? s = '0' +s :s =s;

        //将倒计时赋值到div中
        $("#_d",model.dom).html(d);
        $("#_h",model.dom).html(h);
        $("#_m",model.dom).html(m);
        $("#_s",model.dom).html(s);
        setTimeout(getRTime,1000,model,props);
    }
  console.log("-----------------initEvent")
  /*__________________________________________初始化事件——————————————————————————————————————————————————————————————*/
  KDApi.register('countdown', MyComponent)
})(window.KDApi, jQuery, _)
