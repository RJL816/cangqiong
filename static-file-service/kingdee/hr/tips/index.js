"use strict";

(function (KDApi) {
  function Tips(model) {
    this._setModel(model);
  }
  // windwo.deviceType == pc or mobile
  var $ = void 0;
  if (window.deviceType == "pc") {
    $ = jQuery;
  }
  Tips.prototype = {
    _setModel: function _setModel(model) {
      this.model = model;
    },
    init: function init(props) {
      // 如果传递过来是undefined，就没必要加载控件了
      this.model.Tips = {};
      if (props.data == undefined || props.data == null) return;
      var dataSign = JSON.stringify(props.data);
      this.model.Tips.dataSign = dataSign;
      initFunc(this.model, props);
    },
    update: function update(props) {
      updateDataFunc(this.model, props);
    },
    destoryed: function destoryed() {
      this.model.dom.remove();
    },
    handleDirective: function handleDirective(props, directive, args) {
      if (directive == "getHintScroll") {
        var isScroll = args[0];
        this.model.Tips.isScroll = isScroll;
        // 不是滚动加载，且没超过长度才需要显示title
        if (!isScroll) {
          var wrapDom = this.model.dom.querySelector("#TipsWrap");
          wrapDom.parentNode.style.overflow = 'hidden';
          setTipsExt(TipsWrap, wrapDom.textContent);
        }
      } else if (directive == "clickContent") {
        if (window.deviceType == "mobile") {
          showMobileTipsDialog(this.model, args[0]);
        } else if (window.deviceType == "pc") {
          showTipsDialog(this.model, args[0]);
        }
      } else if (directive == "expand") {
        // 条件1：是否设置了展开收起
        // 条件2：有滚动加载就不要展开收起，展开收起，默认滚动加载是关闭，这个要在控件做处理
        // 条件3：判断内容的高度是否大于控件高度，若大于才会显示展开收起
        var parentNode = this.model.dom;
        if (args[0] && !this.model.Tips.isScroll && parentNode.scrollHeight > parentNode.clientHeight) {
          // calculateShowLines(this.model)  //计算有问题，暂时去掉
          setIsExpand(this.model, args[0]);
        }
      }
    }

  };
  var initFunc = function initFunc(model, props) {
    var dom = model.dom.getElementsByClassName('TipsWrap')[0];
    dom && dom.remove();
    KDApi.loadFile('./css/tips.css', model, function () {
      KDApi.loadFile('./js/tips.js', model, function () {
        KDApi.getTemplateStringByFilePath('./html/tips.html', model, {}).then(function (result) {
          model.dom.innerHTML = result;
          initTipsDOM(model, props);
        });
      });
    });
  };
  /** 
  * 给超出长度的设置title
  */
  function setTipsExt(element, value) {
    if (!element) {
      return;
    }
    if (element.parent().get(0).scrollHeight > element.parent().get(0).offsetHeight) {
      element.attr('title', value);
    }
  }

  /** 
   * updateFunc
   * 1.无->无 2、无->有 3、有->无 4、有->有
   * 2.dataSign是用来记录上一个数据的
   * props.data 可能是undefined null
   * 初始化的时候生成model.Tips
  */
  var updateDataFunc = function updateDataFunc(model, props) {
    var dataSign = model.Tips.dataSign;

    if (dataSign) {
      // 有->无  null undefined ''  有->有
      if (dataSign != JSON.stringify(props.data)) {
        if (props.data == undefined || props.data == null) props.data = "";
        initFunc(model, props);
      }
    } else {
      // 无->无  无=>有
      if (props.data == undefined || props.data == null) return;
      initFunc(model, props);
    }
    if (props.data != undefined && props.data != null) {
      model.Tips.dataSign = JSON.stringify(props.data);
    }
  };
  KDApi.register('tips', Tips, { isMulLang: true });
})(window.KDApi);