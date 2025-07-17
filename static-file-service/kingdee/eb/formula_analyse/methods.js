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

var createSpanNode = function (id, text) {
    console.log("id: " + id + ", text: " + text);
    var newSpanNode = document.createElement('span');
    newSpanNode.innerText = text;
    newSpanNode.setAttribute("cid", id);
    newSpanNode.setAttribute("contenteditable", false);
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
        node = createSpanNode(id, name);
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
    var node = createSpanNode(id, name);
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
    for (var childNode of childNodes) {
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
        retNodeInfos.push(nodeInfo);
    }
    return retNodeInfos;
}

var initAllNodes = function (nodeList) {
    console.log("nodeList: " + writeObj(nodeList));
    if (nodeList.length == 0) {
        return;
    }
    var divElement = document.getElementById("analyse_text_formula");
    var node;
    console.log("nodeData: " + nodeList);
    for (var nodeData of nodeList) {
        var type = nodeData.type;
        if ("text" == type) {
            node = document.createTextNode(nodeData.data);
        } else if ("function" == type || "dimGroup" == type) {
            node = createSpanNode(nodeData.id, nodeData.name);
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
    var nodeName = container.nodeName;
    if ("DIV" == nodeName) {
        return "analyse_text_formula" == container.getAttribute("id");
    } else if ("SPAN" == nodeName || "#text" == nodeName) {
        var parentElement = container.parentElement;
        return "DIV" == parentElement.nodeName && "analyse_text_formula" == parentElement.getAttribute("id");
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