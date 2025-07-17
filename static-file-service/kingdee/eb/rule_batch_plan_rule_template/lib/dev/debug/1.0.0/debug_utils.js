var DebugUtils = {
  //判断对象是否为null或empty
  notEmptyBoolean: function (...objectArray) {
    if (objectArray == null || objectArray.length === 0) {
      return false;
    }
    for (var object of objectArray) {
      //判断该值是否未定义
      if (object === undefined) {
        return false;
      }
      //判断是否为null
      if (object == null) {
        return false;
      }
      //判断是否为空字符串
      if (object === "") {
        return false;
      }
      //判断是否为数组
      if (Object.prototype.toString.call(object) === '[object Array]') {
        //判断数组长度是否大于0
        if (object.length === 0) {
          return false;
        }
      } else {
        //判断是否为空对象({})
        if (Object.values(object).length === 0) {
          return false;
        }
      }
    }
    return true;
  },
  //获取时间格式的字符串
  //20210826_00015_544
  getFormatDateString: function () {
    var date = new Date();
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    var minute = date.getMinutes();
    minute = minute < 10 ? ('0' + minute) : minute;
    var second = date.getSeconds();
    second = second < 10 ? ('0' + second) : second;
    var milliseconds = date.getMilliseconds();
    if (milliseconds < 10) {
      milliseconds = '00' + milliseconds;
    } else if (milliseconds < 100) {
      milliseconds = '0' + milliseconds;
    }
    return y + m + d + "_" + h + minute + second + "_" + milliseconds;
  },
  //输出日志
  log: function (...objectArray) {
    if (objectArray == null || objectArray.length === 0) {
      console.log("objectArray is null or empty.", objectArray);
      return;
    }
    var formatDateString = DebugUtils.getFormatDateString();
    var i = 1;
    var objectArrayLengthInt = objectArray.length;
    for (var object of objectArray) {
      var map = new Map();
      map.set("formatDateString", formatDateString);
      map.set("index", i);
      map.set("Object.prototype.toString.call(object)", Object.prototype.toString.call(object));
      map.set("objectArrayLengthInt", objectArrayLengthInt);
      try {
        map.set("JSON.stringify(object)", JSON.stringify(object));
      } catch (e) {
        map.set("e", e);
      }
      var logString = "";
      map.forEach(function (value, key, map) {
        logString = logString + "[" + key + " : " + value + "]";
      });
      console.log(logString, "object:", object);
      i++;
    }
  },
  //获取随机颜色
  getRandomColorString: function getRandomColorString() {
    return 'rgb(' +
      Math.floor(Math.random() * 255) + ',' +
      Math.floor(Math.random() * 255) + ',' +
      Math.floor(Math.random() * 255) + ')';
  },
  //判断是否为HTMLElement
  isHTMLElement: function (object) {
    if (!object) {
      return false;
    }
    if (typeof HTMLElement === 'object') {
      return object instanceof HTMLElement;
    }
    return !!(object && typeof object === 'object' && (object.nodeType === 1 || object.nodeType === 9) && typeof object.nodeName === 'string');
  },
  //判断是否为HTMLCollection
  isHTMLCollection: function (object) {
    if (!object) {
      return false;
    }
    var prototypeString = Object.prototype.toString.call(object);
    return prototypeString === '[object HTMLCollection]' || prototypeString === '[object NodeList]';
  },
  //给页面元素设置随机背景色
  setRandomColor: function (...elementArray) {
    if (elementArray == null || elementArray.length === 0) {
      return;
    }
    for (var element of elementArray) {
      if (DebugUtils.isHTMLCollection(element)) {
        for (var itemElement of element) {
          DebugUtils.setRandomColor(itemElement);
        }
        continue;
      }
      if (DebugUtils.isHTMLElement(element)) {
        element.style.setProperty('background-color', DebugUtils.getRandomColorString());
      }
    }
  }
}