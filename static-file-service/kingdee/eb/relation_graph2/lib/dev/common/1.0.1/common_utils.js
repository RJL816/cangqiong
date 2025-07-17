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
  if (window.CommonUtils_1_0_1) {
    return window.CommonUtils_1_0_1;
  }
  //定义CommonUtils
  var CommonUtils = {
    //是否启用日志功能
    enableLogBoolean: true,
    //字符串常量
    event: "event",
    //px字符串,单位
    px: "px",
    //空字符串
    EMPTY_STRING: "",
    //方法名称
    METHOD_NAME_STRING: "METHOD_NAME_STRING",
    //函数的父对象Map中的KEY
    METHOD_PARENT_OBJECT_KEY_STRING: "METHOD_PARENT_OBJECT_KEY_STRING",
    //页面ID的KEY
    PAGE_ID_KEY_STRING: "PAGE_ID_KEY_STRING",
    //事件的KEY
    EVENT_NAME_STRING: "EVENT_NAME_STRING",
    //是否阻止默认事件(阻止:"true",不阻止:false或不设置该字段)
    PREVENT_DEFAULT_BOOLEAN: "PREVENT_DEFAULT_BOOLEAN",
    //从前端带回来的前端对象的名称,如:relationGraphModelPojo
    TAKE_BACK_FRONT_POJO_NAME_STRING: "TAKE_BACK_FRONT_POJO_NAME_STRING",
    //arguments
    arguments: "arguments",
    //unset
    unset: "unset",
    //argMap
    argMap: "argMap",
    //props
    props: "props",
    //mouseover
    mouseover: "mouseover",
    //mouseout
    mouseout: "mouseout",
    //click
    click: "click",
    //是否不为null且不为undefined
    notNullOrUndefined() {
      if (!arguments || !arguments.length || arguments.length === 0) {
        return false;
      }
      for (var arg of arguments) {
        if (arg === null || arg === undefined) {
          return false;
        }
      }
      return true;
    },
    //打印日志的工具类,在最前面打印Error以便定位
    log() {
      if (!(CommonUtils.enableLogBoolean === true)) {
        return;
      }
      var uuidString = CommonUtils.getUuidString();
      console.group(uuidString);
      console.log(new Error('DEBUG'));
      if (arguments && arguments.length > 0) {
        for (var arg of arguments) {
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
      if (!CommonUtils.notNullOrUndefined(argArray)) {
        return;
      }
      var resultArgArray = argArray;
      if (resultArgArray.length === 1 && Object.prototype.toString.call(resultArgArray[0]) === "[object Arguments]") {
        resultArgArray = Array.from(resultArgArray[0]);
        if (!CommonUtils.notNullOrUndefined(resultArgArray)) {
          return;
        }
      }
      if (resultArgArray.length % 2 !== 0) {
        return;
      }
      var argMap = new Map();
      for (var i = 0; i < resultArgArray.length; i = i + 2) {
        if (resultArgArray[i]) {
          argMap.set(resultArgArray[i], resultArgArray[i + 1]);
        }
      }
      return argMap;
    },
    //将偶数个数的可变长参数转为Map,如["age", 1]转为{"age":1}
    getMap() {
      //如果没有任何参数,则直接返回
      if (!arguments || arguments.length === 0 || !(arguments.length % 2 === 0)) {
        return;
      }
      //将偶数长度的数组转为Map
      return CommonUtils.getArgMap(arguments);
    },
    //对象转为数组
    getArray(object) {
      var array = [];
      array.push(object);
      return array;
    },
    //将偶数个数的可变长参数转为对象,如["age", 1]转为{"age":1}
    getObject() {
      var argMap = CommonUtils.getArgMap(arguments);
      return CommonUtils.convertMapToObject(argMap);
    },
    //合并多个数组
    getConcatArray() {
      var concatArray = [];
      if (!CommonUtils.notNullOrUndefined(arguments) || arguments.length === 0) {
        return concatArray;
      }
      for (var itemArray of arguments) {
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
    //字符串格式化,format("{},{}", "hello", "world")->"hello,world"
    format() {
      if (!arguments || arguments.length === 0) {
        throw new Error("Wrong parameter.");
      }
      var formatString = arguments[0];
      if (arguments.length === 1) {
        return formatString;
      }
      var itemFormantStringArray = formatString.split("{}");
      var itemFormantStringArrayLength = itemFormantStringArray.length;
      if (!(arguments.length === itemFormantStringArrayLength)) {
        throw new Error("Wrong parameter.");
      }
      var finalString = "";
      for (var i = 0; i < itemFormantStringArrayLength; i++) {
        finalString = finalString + itemFormantStringArray[i];
        if (arguments[i] === undefined || i + 1 === itemFormantStringArrayLength) {
          continue;
        }
        finalString = finalString + arguments[1 + i];
      }
      return finalString;
    },
    //获取元素的绝对位置
    getElementAbsPointPojo(element) {
      var x = element.offsetLeft;
      var y = element.offsetTop;
      while (element.offsetParent) {
        element = element.offsetParent
        x += element.offsetLeft;
        y += element.offsetTop;
      }
      var absPointPojo = {};
      absPointPojo.x = x;
      absPointPojo.y = y;
      return absPointPojo;
    },
    //获取格式化的JSON字符串
    getFormartJsonString(jsonObjectOrJsonString) {
      try {
        var jsonObject = jsonObjectOrJsonString;
        //判断是否字符串,如果是字符串则将字符串转为对象
        if (CommonUtils.stringBoolean(jsonObjectOrJsonString)) {
          jsonObject = JSON.parse(jsonObjectOrJsonString);
        }
        //格式化JSON字符串
        return JSON.stringify(jsonObject, null, 2);
      } catch (e) {
        return "";
      }
    },
    //判断字符串是否不为空
    notBlank(string) {
      if (!string) {
        return false;
      }
      if (!CommonUtils.stringBoolean(string)) {
        throw new Error("Not string.");
      }
      return string.trim().length !== 0;
    },
    //分割数组,从0开始,startIndexInt和endIndexInt均包含在新数组中,slice(["a","b","c","d"], 1, 2)则返回["b", "c"]
    slice(array, startIndexInt, endIndexInt) {
      if (!array || !array.length || !startIndexInt || startIndexInt < 0 || startIndexInt > array.length - 1) {
        return null;
      }
      if (endIndexInt) {
        if (endIndexInt < 0 || endIndexInt > array.length - 1) {
          return null;
        }
        if (endIndexInt < startIndexInt) {
          return null;
        }
      } else {
        endIndexInt = array.length - 1;
      }
      var sliceArray = [];
      for (var i = startIndexInt; i <= endIndexInt; i++) {
        sliceArray.push(array[i]);
      }
      return sliceArray;
    },
    //判断变量是否为字符串
    stringBoolean(string) {
      if (!string) {
        return false;
      }
      return Object.prototype.toString.call(string) === "[object String]";
    },
    //前端方法代理
    frontMethodProxy(argMap) {
      if (!argMap || !argMap.size || argMap.size < 2) {
        return;
      }
      var methodParentObject = argMap.get(CommonUtils.METHOD_PARENT_OBJECT_KEY_STRING);
      if (!methodParentObject) {
        return;
      }
      var methodNameString = argMap.get(CommonUtils.METHOD_NAME_STRING);
      if (!methodNameString || !CommonUtils.stringBoolean(methodNameString) || !methodParentObject[methodNameString]) {
        return;
      }
      //是否阻止默认事件
      var preventDefaultBooleanString = argMap.get(CommonUtils.PREVENT_DEFAULT_BOOLEAN);
      //不向上冒泡
      if (event && "true" === preventDefaultBooleanString) {
        if (event.stopPropagation) {
          event.stopPropagation();
        }
        if (event.preventDefault) {
          event.preventDefault();
        }
      }
      if (argMap.size === 2) {
        methodParentObject[methodNameString]();
        return;
      }
      methodParentObject[methodNameString](argMap);
    },
    /**
     * @param jsonStringOrJsonObject json对象或字符串
     * @param pojoObjectOrFunction 目标对象或对应的函数
     * @returns 目标对象或null
     */
    getPojo(jsonStringOrJsonObject, pojoObjectOrFunction) {
      if (!jsonStringOrJsonObject || !pojoObjectOrFunction) {
        return null;
      }
      var jsonObject = jsonStringOrJsonObject;
      if (Object.prototype.toString.call(jsonStringOrJsonObject) === "[object String]") {
        jsonObject = JSON.parse(jsonStringOrJsonObject);
      }
      if (!(Object.prototype.toString.call(jsonObject) === "[object Object]")) {
        return null;
      }
      var pojo = pojoObjectOrFunction;
      if (Object.prototype.toString.call(pojoObjectOrFunction) === "[object Function]") {
        pojo = pojoObjectOrFunction();
      }
      if (!(Object.prototype.toString.call(pojo) === "[object Object]")) {
        return null;
      }
      for (var keyString in jsonObject) {
        pojo[keyString] = jsonObject[keyString];
      }
      return pojo;
    },
    /**
     * @param jsonArrayStringOrJsonArray json数组对象或字符串
     * @param pojoFunction 目标函数
     * @returns 目标对象数组,null或[]
     */
    getPojoArray(jsonArrayStringOrJsonArray, pojoFunction) {
      if (!jsonArrayStringOrJsonArray || !pojoFunction) {
        return null;
      }
      var jsonArray = jsonArrayStringOrJsonArray;
      if (Object.prototype.toString.call(jsonArrayStringOrJsonArray) === "[object String]") {
        jsonArray = JSON.parse(jsonArrayStringOrJsonArray);
      }
      if (!(Object.prototype.toString.call(jsonArray) === "[object Array]")) {
        return null;
      }
      if (!(Object.prototype.toString.call(pojoFunction) === "[object Function]")) {
        return null;
      }
      var pojoList = [];
      for (var jsonObject of jsonArray) {
        var pojo = CommonUtils.getPojo(jsonObject, pojoFunction);
        if (!pojo) {
          continue;
        }
        pojoList.push(pojo);
      }
      return pojoList;
    },
    /**
     * @param objectList 集合
     * @returns {boolean} 集合是否为空
     */
    isEmpty(objectList) {
      return !CommonUtils.isNotEmpty(objectList);
    },
    /**
     * @param objectList 集合
     * @returns {*|boolean} 集合是否不为空
     */
    isNotEmpty(objectList) {
      return objectList && objectList.length && objectList.length > 0;
    },
    /**
     * @param objectList 集合
     * @param object 项
     * @returns {boolean} 判断集合是否包含指定项
     */
    contain(objectList, object) {
      if (CommonUtils.isEmpty(objectList) || !object) {
        return false;
      }
      for (var itemObject of objectList) {
        if (itemObject === object) {
          return true;
        }
      }
      return false;
    },
    /**
     * @param object 对象
     * @returns {boolean} 是否为字符串类型
     */
    isString(object) {
      if (!object) {
        return false;
      }
      return Object.prototype.toString.call(object) === "[object String]";
    },
    /**
     * @param object 对象
     * @returns {boolean} 是否不为字符串类型
     */
    isNotString(object) {
      return !CommonUtils.isString(object);
    }
  }
  //将该工具类挂载到window中作为全局变量
  window.CommonUtils_1_0_1 = CommonUtils;
  return window.CommonUtils_1_0_1;
});