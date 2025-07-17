(function(KDApi, $) {
  function ShortCutQuickInput(model) {
    this._setModel(model);
  }

  var KEYS = {
    16: "",
    17: "",
    18: "",
    91: "",
    93: "",

    48: 0,
    49: 1,
    50: 2,
    51: 3,
    52: 4,
    53: 5,
    54: 6,
    55: 7,
    56: 8,
    57: 9,

    65: "A",
    66: "B",
    67: "C",
    68: "D",
    69: "E",
    70: "F",
    71: "G",
    72: "H",
    73: "I",
    74: "J",
    75: "K",
    76: "L",
    77: "M",
    78: "N",
    79: "O",
    80: "P",
    81: "Q",
    82: "R",
    83: "S",
    84: "T",
    85: "U",
    86: "V",
    87: "W",
    88: "X",
    89: "Y",
    90: "Z",

    96: 0,
    97: 1,
    98: 2,
    99: 3,
    100: 4,
    101: 5,
    102: 6,
    103: 7,
    104: 8,
    105: 9,

    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",

    8: "BackSpace",
    9: "Tab",
    13: "Enter",
    27: "Esc",

    32: "Space",
    33: "PgUp",
    34: "PgDn",
    35: "End",
    36: "Home",
    37: "←",
    38: "↑",
    39: "→",
    40: "↓",

    46: "Delete",

    106: "*",
    107: "+",
    108: "Enter",
    109: "-",
    110: ".",
    186: ";",
    187: "=",
    188: ",",
    189: "-",
    190: ".",
    191: "/",
    192: "`",
    219: "[",
    221: "]"
    // 需要讨论显示问题
    // '\: 220
  }

  var shiftKey, ctrlKey, altKey, keyCode, metaKey, key

  var isMac =
    window.navigator.platform == "Mac68K" ||
    window.navigator.platform == "MacPPC" ||
    window.navigator.platform == "Macintosh" ||
    window.navigator.platform == "MacIntel";

  var _that = {}

  function invert (obj) {
    for (var k in obj) {
        var value = obj[k]
        if (value !== '') {
          obj[value] = k - 0
        }
        delete obj[k]
    }
    return obj
  }

  function cloneObj (obj) {
    var newObj = {};
    if (obj instanceof Array) {
      newObj = [];
    }
    for (var key in obj) {
      var val = obj[key];
      newObj[key] = typeof val === 'object' ? cloneObj(val) : val;
    }
    return newObj;
  }

  function stopBubble(event) { // 封装兼容性良好的‘阻止冒泡’
    if (event.stopPropagation) {
        event.stopPropagation()  // IE9以下不兼容
    } else {  //  兼容IE
        event.cancelBubble = true;
    }
  }

  function stopDefualtHandler(event) {  // 封装兼容性良好的阻止默认事件方法
    if (event.preventDefault) {
      event.preventDefault();  // 非IE，阻止默认事件
    } else {
      event.returnValue = false;  // 兼容IE，阻止默认事件
    }
  }

  function isNeedListentKeyBorad (ev) {
    // Ctrl Atl Shift Meta(window下的window键)不予监听
    if (ev.ctrlKey && ev.keyCode === 17) return false
    if (ev.altKey && ev.keyCode === 18) return false
    if (ev.shiftKey && ev.keyCode === 16) return false
    if (ev.metaKey && ev.keyCode === 91) return false
    return true
  }

  function handleKeyDown(e) {
    stopDefualtHandler(e)
    stopBubble(e)
    if (!isNeedListentKeyBorad(e)) return
    shiftKey = e.shiftKey
    ctrlKey = e.ctrlKey
    altKey = e.altKey
    keyCode = e.keyCode
    metaKey = e.metaKey
    key = e.key
    _that.newKeys = invert(cloneObj(KEYS))
    if (keyCode === 229) {  // 中文输入法下keyCode 都是229, 可根据key 属性来判断
      keyCode = _that.newKeys[key]
    }
    if (KEYS[keyCode] === 'BackSpace') {
      _that.inputVal = '';
      shiftKey = ctrlKey = altKey = keyCode = metaKey = false
    } else if (KEYS[keyCode] === undefined && _that.inputVal !== undefined) {
      e.target.value = _that.inputVal;
      return;
    } else {
      _that.inputVal =
      (ctrlKey ? "+Ctrl" : "")
      .concat(metaKey ? "+⌘" : "")
      .concat(shiftKey ? (isMac ? "+⇧" : "+Shift") : "")
      .concat(altKey ? (isMac ? "+⌥" : "+Alt") : "")
      .concat(KEYS[keyCode] !== "" ? ("+" + KEYS[keyCode]) : "")
      .substr(1);
    }
    e.target.value = _that.inputVal;
    if (_that.timer !== null) {
      clearTimeout(_that.timer);
    }
    _that.timer = setTimeout(function() {
      _that.model.invoke("changeShortCutKeyInfo", { name: _that.inputVal, info: { shiftKey: shiftKey, ctrlKey: ctrlKey, altKey: altKey, keyCode: keyCode, metaKey: metaKey } });
    }, 300);
  }

  function handleInput (e) {
    if (_that.inputVal !== undefined && e.target.value !== _that.inputVal) {
      e.target.value = _that.inputVal
    }
  }

  ShortCutQuickInput.prototype = {
    _setModel: function(model) {
      this.model = model;
    },
    init: function(props) {
      // TO DO
      initFunc(this.model, props);
    },
    update: function(props) {
      // TO DO
      updateFunc(this.model, props);
    },
    destoryed: function() {
      // TO DO
      document.getElementById("kd-custom-shortCut").removeEventListener("keydown", handleKeyDown);
      document.getElementById("kd-custom-shortCut").removeEventListener("input", handleInput);
      // document.getElementById("kd-custom-shortCut").removeEventListener("compositionstart", handleCompositionStart);
      // document.getElementById("kd-custom-shortCut").removeEventListener("compositionend", handleCompositionEnd);
      _that.model = null
      _that.timer = null
    }
  };

  // Other Code
  var initFunc = function(model, props) {
    // KDApi.loadFile可以通过路径加载js或css文件，并且在html文件头生成script或者link标签，第一个参数是路径，第二个参数是model，第三个参数是加载完成后执行的回调函数
    KDApi.loadFile("./css/shortCutQuickInput.css", model, function() {
      // 后端插件通过setData传给前端的数据，前端可以通过props.data去获取
      var shortCutName = (props.data && props.data.name) || "";
      // 通过路径去获取html字符串，第一个参数是路径，第二个参数是model，第三个参数是HTML模板中变量的值
      KDApi.getTemplateStringByFilePath(
        "./html/shortCutQuickInput.art",
        model
      ).then(function(result) {
        model.dom.innerHTML = result;
        // 绑定DOM事件
        initEvent(model, props, shortCutName);
      });
    });
  };

  var updateFunc = function(model, props) {
    var updateShortCutName = (props.data && props.data.name) || "";
    $(".kd-custom-shortCut-input", model.dom).val(updateShortCutName);
    _that.inputVal = updateShortCutName
  };

  var initEvent = function(model, props, shortCutName) {
    $(".kd-custom-shortCut-input", model.dom).val(shortCutName);
    _that.inputVal = shortCutName
    _that.model = model
    document.getElementById("kd-custom-shortCut").focus()
    document.getElementById("kd-custom-shortCut").addEventListener("keydown", handleKeyDown);
    document.getElementById("kd-custom-shortCut").addEventListener("input", handleInput);
  };

  KDApi.register("shortCutQuickInput", ShortCutQuickInput);
})(window.KDApi, jQuery);
