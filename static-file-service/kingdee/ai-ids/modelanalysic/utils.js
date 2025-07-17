window.IDS_ModelAna_Utils = (function () {
  ooS = Object.prototype.toString;
  return {
    $$createElement: function (label) {
      return document.createElement(label);
    },
    $$createDocFragment: function () {
      return document.createDocumentFragment();
    },
    getTypeOfData: function (data) {
      return ooS.apply(data);
    },
    isObject: function (obj) {},
    extend: function (target) {
      let sources = [].slice.call(arguments, 1);
      // 为了兼容IE11,将对象简写方法改成es5 的写法 箭头函数 qhx_0117 特性：兼容IE11
      // sources.forEach((source) => {
      //   for (let key in source) {
      //     target[key] = source[key]
      //   }
      // })
      sources.forEach(function (source) {
        for (let key in source) {
          target[key] = source[key];
        }
      });
      return target;
    },
    getMaxFromArr: function (arr) {
      return Math.max.apply(null, arr);
    },
    bindEvent: function (target, eventName, fn) {
      target.addEventListener(eventName, fn, false);
    },
    unBindEvent: function (target, eventName, fn) {
      target.removeEventListener(eventName, fn, false);
    },
    //节流函数
    throttle: function (fn, delay) {
      var _this = this;
      return function () {
        console.log("arguments is ", arguments);
        var args = [].slice.apply(arguments);
        console.log("throttle args is ", args);
        clearTimeout(fn.timeID);

        fn.timeID = setTimeout(function () {
          fn.apply(_this, args);
        }, delay);
      };
    },
    transformStyleStr: function (styleObj) {
      var styleStr = "";
      for (var key in styleObj) {
        styleStr += key + ":" + styleObj[key] + ";";
      }
      return styleStr;
    },
    //是否苍穹环境
    isCangQiong: function () {
      return IDS_ModelAna_RenderUtils.model ? true : false;
    },
    // 向苍穹系统发送信息
    sendEvent: function (eventName, eventData, model) {
      eventName = eventName || "click";
      if (model && typeof model == "string") {
        //根据pageId获取model 确保发送的事件是给相应的窗口的  2022/09/15
        model = ai_ids.setting.getModel(model);
      } else {
        model = model || IDS_ModelAna_RenderUtils.model;
      }
      console.log("sendEvent model is ", model);
      model && model.invoke && model.invoke(eventName, eventData);
    },
    //获取苍穹设计器上指定的高度
    getDesignContainerHeight: function (containerId) {
      // 为了兼容IE11,将对象简写方法改成es5 的写法 模板字符串 qhx_0117 特性：兼容IE11
      var containerIdStr = "#" + containerId;
      const container = document.querySelector(containerIdStr); // `#${containerId}`
      if (container) {
        let tempHeight = getComputedStyle(container).height; //container.getComputedStyle().clientHeight
        console.log("tempHeight is ", tempHeight);
        if (
          tempHeight.indexOf("px") > -1 ||
          typeof parseFloat(tempHeight) == "number"
        ) {
          return tempHeight;
        } else {
          return "392px";
        }
      }
      return;
    },
    //从一个对象获取多少层的数据
    getDepthFromArr: function (obj, initDepth, depth) {
      if (!depth) {
        depth = 3;
      }
      let depthCount = 1;
      let result = {};
      // 为了兼容IE11,将对象简写方法改成es5 的写法 模板字符串 qhx_0117 特性：兼容IE11
      // let { name, id, children } = obj
      var name = obj && obj.name,
        id = obj && obj.id,
        children = obj && obj.children;
      result = {
        id: id,
        name: id
      };
      function recuresionArr(arr) {
        for (let i = 0; i < arr.length - 1; i++) {}
        depthCount += 1;
      }
      recuresionArr(children);
    },
    //从圆圈图中保留一个对象
    getBackupObjFrom: function (displayRoot) {
      // 为了兼容IE11,将对象简写方法改成es5 的写法 模板字符串 qhx_0117 特性：兼容IE11
      let result = {};
      // const {} = displayRoot
    },
    isIEBrowser: function () {
      if (!!window.ActiveXObject || "ActiveXObject" in window) {
        return true;
      } else return false;
    }
  };
})();
