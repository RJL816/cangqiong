(function (KDApi, $) {
  //构造函数
  function MyComponent(model) {
    this._setModel(model)
  }

  MyComponent.prototype = {
    //绑定model
    _setModel: function (model) {
      this.model = model
    },
    //生命周期：初始化
    init: function (props) {
      setHtml(this.model, props);
      // //中文输入后清空输入的内容
      // window.addEventListener("compositionend", function (e) {
      //   var data = e.data;
      //   var divElement = document.getElementById("analyse_text_formula");
      //   var innerHTML = divElement.innerHTML;
      //   divElement.innerHTML = innerHTML.replace(data, "");
      //   moveToEnd("");
      // });
      //禁用粘贴
      // window.addEventListener("paste", function () {
      //   console.log("paste");
      //   return false;
      // });
      document.onpaste = function (e) {
        return !isCurComponent();
      };
      document.oncut = function (e) {
        return !isCurComponent();
      };
      document.onselectionchange = function () {
        if (!isCurComponent()) {
          return;
        }
        var selection = document.getSelection();
        if (selection && selection.rangeCount) {
          var range = selection.getRangeAt(selection.rangeCount - 1);
          if (isCurDivRange(range)) {
            model.curRange = range;
          }
        }
      };
      document.onkeydown = function (e) {
        if (!isCurComponent()) {
          return;
        }
        checkKeyDown();
      }
    },
    //生命周期：更新
    update: function (props) {
      //页面加载的时候第一次不用执行
      if (this.model.inited) {
        updateHtml(this.model, props);
      } else {
        this.model.inited = true;
      }
    },
    //生命周期：销毁
    destoryed: function () {
    }
  }

  //初始化页面,该方法只会执行一次
  var setHtml = function (model, props) {
    KDApi.loadFile('./css/analyse.css', model, function () {
      KDApi.getTemplateStringByFilePath('./analyse.html', model, {
        text: 'Hello, World!',
        formulaAnalyseTip: KDApi.getLangMsg(model,'formula.analysetip')
      }).then(function (result) {
        console.log(result);
        // KDApi.loadFile('./methods.js', model, function () {
        //   console.log("jsField Ok");
        //   model.dom.innerHTML = result;
        //   updateHtml(model, props);
        // })
        console.log("jsField Ok");
        model.dom.innerHTML = result;
        updateHtml(model, props);
      })
    })
  }

  //监听对象发生变化则更新页面
  var updateHtml = function (model, props) {
    console.log("updatehtml: " + writeObj(props.data));
    if (!props || !props.data || !props.data.frontMethod) {
      console.log("return");
      return;
    }
    console.log("getFrontMethod: " + props.data.frontMethod);
    //调用前端方法
    invokeFrontMethod(model, props.data);
  }

  var checkKeyDown = function () {
    var event = window.event;
    var key = event.key;
    // console.log("keyDown: keyCode: " + event.keyCode + " key: " + key);
    // 禁用undo
    if (event.ctrlKey == true && event.keyCode == 90) {//Ctrl+Z
      event.returnvalue = false;
      event.preventDefault();
    }
  }

  var createSpanNode = function (id, text, nodeType) {
    console.log("id: " + id + ", text: " + text);
    var newSpanNode = document.createElement('span');
    newSpanNode.innerText = text;
    newSpanNode.setAttribute("cid", id);
    newSpanNode.setAttribute("contenteditable", false);
    var classType = "analyse_text_formula_" + nodeType;
    newSpanNode.setAttribute("class", classType);
    return newSpanNode;
  }

  var moveToEnd = function (node, range) {
    var selection = document.getSelection();
    if (typeof range == "undefined" || range == null) {
      console.log("createRange");
      range = document.createRange();
    }
    range.selectNode(node);
    selection.removeAllRanges();
    selection.addRange(range);
    selection.collapseToEnd();
  }

  var invokeFrontMethod = function (model, propData) {
    var frontMethod = propData.frontMethod;
    var retCallBackData;
    switch (frontMethod) {
      case "addNode":
        addNode(propData.dataObject);
        break;
      case "deleteNode":
        deleteNode(false);
        break;
      case "deleteAllNodes":
        deleteNode(true);
        break;
      case "addFunNode":
        addFunNode(propData.dataObject);
        break;
      case "getFormula":
        retCallBackData = getAllNodes();
        break;
      case "initFormula":
        console.log("initFormula");
        initAllNodes(propData.dataObject);
        break;
      case "focusFormula":
        focusFormulaDiv();
        break;
      case "setUnableEdit":
        setDivUnableEdit();
        break;
      default:
        break;
    }
    console.log("invokeFrontMethod: " + frontMethod);

    if (propData.callbackEndMethod) {
      console.log("propData.callbackEndMethod: " + propData.callbackEndMethod);
      if (retCallBackData == "" || retCallBackData == undefined || typeof(retCallBackData) == undefined) {
        console.log("propData.callbackEndMethod: without retCallBackData");
        model.invoke(propData.callbackEndMethod);
      } else {
        console.log("propData.callbackEndMethod：with retCallBackData");
        model.invoke(propData.callbackEndMethod, retCallBackData);
      }
    }
  }

  var addNode = function (nodeInfo) {
    var id = nodeInfo.id;
    var name = nodeInfo.name;
    var divElement = document.getElementById("analyse_text_formula");
    var node;
    if (id == "0") {
      node = document.createTextNode(name);
    } else {
      node = createSpanNode(id, name, "dimGroup");
    }

    var range = insertNode(node);
    moveToEnd(node, range);
  }

  var insertNode = function (node) {
    var range;
    var curRange = model.curRange;
    var divElement = document.getElementById("analyse_text_formula");
    if (typeof curRange == "undefined" || curRange == null) {
      divElement.appendChild(node);
    } else {
      curRange.insertNode(node);
      range = curRange;
    }
    return range;
  }

  var deleteNode = function (needDeleteAll) {
    var divElement = document.getElementById("analyse_text_formula");
    if (needDeleteAll) {
      divElement.innerHTML = "";
      divElement.focus();
    } else {
      var childNodes = divElement.childNodes;
      var length = childNodes.length;
      if (length != 0) {
        var childNode = childNodes[length - 1];
        var nodeName = childNode.nodeName;
        var nodeData = childNode.data;
        if (nodeName != "#text" || nodeData.length == 1) {
          divElement.removeChild(childNode);
          if (length == 1) {
            divElement.focus();
          } else {
            moveToEnd(childNodes[length - 2], null);
          }
        } else {
          childNode.data = nodeData.substring(0, nodeData.length - 1);
          moveToEnd(childNode, null);
        }
      }
    }
  }

  var addFunNode = function (nodeInfo) {
    var id = nodeInfo.id;
    var name = nodeInfo.name;
    var node = createSpanNode(id, name, "function");
    var textNode = document.createTextNode("(");
    var textNode1 = document.createTextNode(")");
    var divElement = document.getElementById("analyse_text_formula");
    insertNode(textNode1);
    insertNode(textNode);
    var range = insertNode(node);
    moveToEnd(textNode, range);
    model.curRange = document.createRange();
    curRange.selectNode(textNode);
  }

  var getAllNodes = function () {
    console.log("getAllNodes");
    var divElement = document.getElementById("analyse_text_formula");
    var childNodes = divElement.childNodes;
    var retNodeInfos = new Array();
    var length = childNodes.length;
    for (let index = 0; index < length; index++) {
      var childNode = childNodes[index];
      var nodeName = childNode.nodeName;
      console.log(nodeName);
      var nodeInfo = new Map();
      if (nodeName == "#text") {
        nodeInfo.set("type", "text");
        nodeInfo.set("data", childNode.data);
      } else {
        nodeInfo.set("type", "element");
        nodeInfo.set("data", childNode.innerText);
        nodeInfo.set("id", childNode.getAttribute("cid"));
      }
      console.log(nodeInfo);
      retNodeInfos.push(JSON.stringify(Object.fromEntries(nodeInfo)));
    }
    return retNodeInfos;
  }

  var initAllNodes = function (nodeList) {
    console.log("nodeList: " + writeObj(nodeList));
    var length = nodeList.length;
    if (length == 0) {
      return;
    }
    var divElement = document.getElementById("analyse_text_formula");
    var node;
    console.log("nodeData: " + nodeList);

    for (let index = 0; index < length; index++) {
      var nodeData = nodeList[index];
      var type = nodeData.type;
      if ("text" == type) {
        node = document.createTextNode(nodeData.data);
      } else if ("function" == type || "dimGroup" == type) {
        node = createSpanNode(nodeData.id, nodeData.name, type);
      } else {
        console.log("错误的节点类型：" + type);
      }
      divElement.appendChild(node);
    }
    if (typeof node != "undefined") {
      moveToEnd(node);
    }
  }

  var isCurDiv = function (container) {
	if (container == null || typeof container == "undefined") {
      return false;
    }
    var nodeName = container.nodeName;
    if ("DIV" == nodeName) {
      return "analyse_text_formula" == container.getAttribute("id");
    } else if ("SPAN" == nodeName || "#text" == nodeName) {
      var parentElement = container.parentElement;
      if (typeof parentElement == "undefined") {
        parentElement = container.parentNode;
        if ("DIV" == parentElement.nodeName && "analyse_text_formula" == parentElement.getAttribute("id")) {
          return true;
        }
        var parentNode = parentElement.parentNode;
        return "DIV" == parentNode.nodeName && "analyse_text_formula" == parentNode.getAttribute("id");
      } else {
        return "DIV" == parentElement.nodeName && "analyse_text_formula" == parentElement.getAttribute("id");
      }
    }
    return false;
  }

  var isCurDivRange = function (range) {
    var startContainer = range.startContainer;
    var endContainer = range.endContainer;
    if (isCurDiv(startContainer) && isCurDiv(endContainer)) {
      return true;
    }
    return false;
  }

  var writeObj = function(obj){
    var description = "";
    for(var i in obj){
      var property=obj[i];
      description+=i+" = "+property+"\n";
    }
    return description;
  }

  var focusFormulaDiv = function() {
    var divElement = document.getElementById("analyse_text_formula");
    divElement.focus();
  }

  var isCurComponent = function() {
    var activeElement = document.activeElement;
    return isCurDiv(activeElement);
  }

  var setDivUnableEdit = function() {
    var divElement = document.getElementById("analyse_text_formula");
    divElement.setAttribute("contenteditable", false);
  }

  //注册自定义控件
  window.KDApi.register('formula_analyse', MyComponent, {
    isMulLang: true
  })
})(window.KDApi, jQuery)