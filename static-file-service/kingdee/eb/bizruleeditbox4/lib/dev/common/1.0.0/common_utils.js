/**
 * 对js中不同数据的布尔值类型总结:false:空字符串("");null;undefined;0;NaN
 * true:除了上面的false的情况其他都为true
 */
(function (global, factory) {
  "use strict";
  if (typeof module === "object" && typeof module.exports === "object") {
    module.exports = global.document ?
      factory(global, true) :
      function (w) {
        if (!w.document) {
          throw new Error("Require a window with a document");
        }
        return factory(w);
      };
  } else {
    factory(global);
  }
})(typeof window !== "undefined" ? window : this, function (window) {
  //定义CommonUtils
  var CommonUtils = {
    //是否启用日志功能
    enableLogBoolean: true,
    //是否不为null且不为undefined
    notNullOrUndefined(...objectArray) {
      if (objectArray === null || objectArray === undefined || objectArray.length === 0) {
        return false;
      }
      for (var object of objectArray) {
        if (object === null || object === undefined) {
          return false;
        }
      }
      return true;
    },
    //打印日志的工具类,在最前面打印Error以便定位
    log(...argArray) {
      if (!(CommonUtils.enableLogBoolean === true)) {
        return;
      }
      var uuidString = CommonUtils.getUuidString();
      console.group(uuidString);
      console.log(new Error('debugError'));
      if (argArray && argArray.length > 0) {
        for (var arg of argArray) {
          console.log(arg);
        }
      }
      console.groupEnd(uuidString);
    },
    //生成UUID,为防止以数字开头报如下错误,在最前面拼上'uuid',不要忘记了"()"否则变为"赋"为方法
    //Uncaught DOMException: Failed to execute 'querySelector' on 'Document': '#72b565e3604c4266957c00da87f285bb' is not a valid selector.
    getUuidString() {
      return 'uuidxxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0;
        var v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    },
    //判断是否为Map
    mapBoolean(map) {
      if (!map) {
        return false;
      }
      return map instanceof Map;
    },
    //将Map转为Object
    //Object.fromEntries方法在低版本的chrome浏览器可能会报:"is not a function",因此最好使用下面工具类进行转换
    convertMapToObject(argsMap) {
      if (!argsMap) {
        return null;
      }
      var object = {};
      for (var keyString of argsMap.keys()) {
        object[keyString] = argsMap.get(keyString);
      }
      return object;
    },
    //将偶数对的数组转为Map
    //!argArray为false
    getArgMap(argArray) {
      if (!CommonUtils.notNullOrUndefined(argArray) || argArray.length % 2 !== 0) {
        throw new Error("Fail to convert to map.");
      }
      var argMap = new Map();
      for (var i = 0; i < argArray.length; i = i + 2) {
        if (argArray[i]) {
          argMap.set(argArray[i], argArray[i + 1]);
        }
      }
      return argMap;
    },
    //合并多个数组
    getConcatArray(...itemArrayArray) {
      var concatArray = [];
      if (!CommonUtils.notNullOrUndefined(itemArrayArray) || itemArrayArray.length === 0) {
        return concatArray;
      }
      for (var itemArray of itemArrayArray) {
        if (itemArray && itemArray.length > 0) {
          for (var item of itemArray) {
            concatArray.push(item);
          }
        }
      }
      return concatArray;
    },
    //阻止默认事件
    eventPreventDefault(event) {
      //判断原生事件对象是否存在
      if (event && event.preventDefault) {
        //阻止默认事件
        event.preventDefault()
      }
    },
    //将光标移动到element的最后
    selectionToEnd(element) {
      //IE9 and non-IE
      if (!element || !window.getSelection) {
        return;
      }
      if (element.focus) {
        element.focus();
      }
      //创建一个虚拟的节点对象，或者说，是用来创建文档碎片节点。它可以包含各种类型的节点，在创建之初是空的
      //文档片段存在于内存中，并不在DOM中，所以将子元素插入到文档片段中时不会引起页面回流（对元素位置和几何上的计算）
      //因此使用DocumentFragment可以起到性能优化的作用
      var fragment = document.createDocumentFragment();
      //每一个节点(临时变量)
      var itemChildNode = null;
      //最后一个子节点
      var lastChildNode = null;
      while ((itemChildNode = element.firstChild)) {
        //fragment.appendChild()具有移动性,相当于把el中节点移动过去
        lastChildNode = fragment.appendChild(itemChildNode);
      }
      //一般来说，插入光标的位置可通过 Selection 获取，这时它被标记为 Collapsed，这表示选区被压缩至一点，即光标位置
      var selection = window.getSelection();
      //返回选区包含的指定区域（Range）的引用
      var range = selection.getRangeAt(0);
      //删除当前 Range 对象表示的文档区域
      range.deleteContents();
      //把指定的节点插入文档范围的开始点
      range.insertNode(fragment);
      //判断lastChildNode是否存在
      if (lastChildNode) {
        //如果你需要保留这个子节点在原先位置的显示,则你需要先用Node.cloneNode方法复制出一个节点的副本,然后在插入到新位置
        range = range.cloneRange();
        //在指定的节点后开始范围
        range.setStartAfter(lastChildNode);
        //collapse(true)移动光标到range的开始
        //设置选中区域为一个点
        range.collapse(true);
        //将所有的区域都从选区中移除
        //移除所有的选中范围
        selection.removeAllRanges();
        //一个区域（Range）对象将被加入选区
        selection.addRange(range);
      }
    },
    //获取元素的绝对位置坐标(像对于页面左上角)
    getElementPagePositionObject(element) {
      if (!element) {
        return null;
      }
      //计算x坐标
      var actualLeftInteger = element.offsetLeft;
      var current = element.offsetParent;
      while (current !== null) {
        actualLeftInteger += current.offsetLeft;
        current = current.offsetParent;
      }
      //计算y坐标
      var actualTopInteger = element.offsetTop;
      current = element.offsetParent;
      while (current !== null) {
        actualTopInteger += (current.offsetTop + current.clientTop);
        current = current.offsetParent;
      }
      //返回结果
      var resultObject = {};
      resultObject.actualLeftInteger = actualLeftInteger;
      resultObject.actualTopInteger = actualTopInteger;
      return resultObject;
    },
    //获取方法名称,如果是在函数内部调用(获取当前方法名称)则传入(arguments.callee)
    getFunctionNameString(functionMethod) {
      if (!functionMethod) {
        return null;
      }
      if (!(typeof functionMethod === 'function')) {
        return null;
      }
      return functionMethod.name || functionMethod.toString().match(/function\s*([^(]*)\(/)[1];
    },
    //获取字符串真实的长度,中文占两位,其他占一位
    getStringRealLength(string) {
      if (!string || string.length === 0) {
        return 0;
      }
      var lengthInt = 0;
      for (var i=0; i < string.length; i++) {
        if (string.charCodeAt && (string.charCodeAt(i) > 127 || string.charCodeAt(i) === 94)) {
          lengthInt += 2;
        } else {
          lengthInt++;
        }
      }
      return lengthInt;
    }
  }
  if (!window.CommonUtils) {
    //将该工具类挂载到window中作为全局变量
    window.CommonUtils = CommonUtils;
  }
  return CommonUtils;
});