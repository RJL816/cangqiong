
var dealKeyUp = function(keyEvent){
    if(keyEvent.code == "Space"){
    }
}

//添加新节点
var addNewNode = function(newNode,pageId){
    var editorInstance = getEditorInstance(pageId);
    var inputedit = editorInstance.editor;
    var editorRange = editorInstance.range;
    if(window.getSelection){
        var editorSelection = window.getSelection();
        if(inputedit!=document.activeElement){
//			inputedit.focus();
//			setTimeout(function(){inputedit.focus()},100);
            if(editorInstance.range == null){
                inputedit.appendChild(newNode);
                editorSelection.removeAllRanges();
                editorSelection.selectAllChildren(inputedit);  //本来直接调用focus就可以了，但是不知道为啥火狐的时候，focus之后，取得焦点了，但是selection还是没
            }else{
                editorRange = editorInstance.range;
                editorRange.insertNode(newNode);
                editorSelection.removeAllRanges();
                editorSelection.addRange(editorRange);
            }
        }else{
            if(editorRange == null){
                editorRange = editorSelection.getRangeAt(0);
                editorInstance.range = editorRange;
            }
            editorRange.insertNode(newNode[i]);
            editorSelection.removeAllRanges();
            editorSelection.addRange(editorRange);
        }
        editorSelection.collapseToEnd();
    }
    else if(document.seletion){

    }
}

//创建一个成员显示节点（input框）
var createInputNode = function (id,name){
    var newInputNode = document.createElement('input');
    newInputNode.setAttribute("type","text") ;
    newInputNode.setAttribute("class", "membinput") ;
    newInputNode.setAttribute("readonly", "readonly") ;
    newInputNode.setAttribute("value", name) ;
    newInputNode.setAttribute("id", id) ;
    newInputNode.setAttribute("onclick", "membClick(this)") ;
    newInputNode.setAttribute("onmousedown","return false;");
    var textLength = getTextLength(name);
    newInputNode.style.cssText = 'width:'+textLength*7+'px;';
    return newInputNode;
}

var createNode = function (id,text) {
    var node;
    if(id == 'text'){
        node = document.createTextNode(text);
    }else {
        node = createInputNode(id,text);
    }
    return node;
}

var getTextLength = function(str) {
    ///<summary>获得字符串实际长度，中文2，英文1</summary>
    ///<param name="str">要获得长度的字符串</param>
    var realLength = 0, len = str.length, charCode = -1;
    for (var i = 0; i < len; i++) {
        charCode = str.charCodeAt(i);
        if(charCode >= 64 && charCode <= 90){
            realLength += 1.5;
        }else if(charCode>=128){
            realLength += 2;
        }else{
            realLength += 1;
        }
    }
    return realLength;
}


var focusMembPosition = function(memb){
    var editor = memb.parentNode;
    var editorInstance = formulaEditorInstance.get(editor.id);
    var editorSelection = null;
    if(editor!=document.activeElement){   //未选中,点击文本框的时候，选中的是文本框，而不是公式编辑框
        editor.focus();
        editorSelection = window.getSelection();
        editorSelection.removeAllRanges();
        editorSelection.selectAllChildren(editor);
    }else{
        editorSelection = window.getSelection();
    }
    editorRange = editorSelection.getRangeAt(0);
    editorRange.selectNode(memb);
    editorSelection.removeAllRanges();
    editorSelection.addRange(editorRange);
    editorSelection.collapseToEnd();
    editorInstance.range = editorRange;
}

//获取编辑器内文本串（成员只包含id）
var getEditorText = function (pageId){
    //这里只遍历第一层
    var editorInstance = getEditorInstance(pageId);
    var editor = editorInstance.editor;
    var childNodes = editor.childNodes;
    var nodeName,text = '';
    for(var i=0;i<childNodes.length;i++){
        nodeName = childNodes[i].nodeName;
        if(nodeName=='#text'){
            var val = childNodes[i].data.replace(' ','');
            text = text+val;
        }else if(nodeName=='INPUT'){
            text =text+'{"'+childNodes[i].id+'"}';
        }
    }
    return text.replace(/\s+/g,"");
}
//保存公式框的选中区
var saveEditorRange = function(editor){
    var editorInstance = formulaEditorInstance.get(editor.id);
    var editorSelection = window.getSelection();
    var editorRange = null;
    if(editorSelection!=null&&checkIsOnEditor(editorSelection.focusNode)){
        editorRange = editorSelection.getRangeAt(0);
    }
    editorInstance.range = editorRange;
}

var checkIsOnEditor = function(focusNode){
    var result;
    if(focusNode != null){
        if(focusNode.id == 'formulaeditor'){
            result = true;
        }else{
            result = checkIsOnEditor(focusNode.parentNode);
        }
    }else{
        result = false;
    }
    return result;

}

//处理刷新功能
var dealrebuildCommand = function(data,model){
    var pageId = model.pageId.substring(18,model.pageId.length);
    var editorElement = getEditorInstance(pageId).editor;
    //1、先清空所有内容
    editorElement.innerHTML = '';
    var tempData = data;
    while(tempData.length>0){
        tempData = buildUpdateData(editorElement,tempData);
    }
}

var buildUpdateData = function(editorElement,data){
    var beginPosition = data.indexOf('{');
    if (beginPosition>0){
        //大于0表示第一个不是键值，是文本；
        var tempData = data.substring(0,beginPosition);
        var textNode = document.createTextNode(tempData);
        data = data.substring(beginPosition,data.length);
        editorElement.appendChild(textNode);
    }else if (beginPosition ===-1){
        //等于-1表明剩下的全是文本
        var textNode = document.createTextNode(data);
        editorElement.appendChild(textNode);
        data ='';
    }else{
        var tempStr = data.substring(beginPosition+1,data.indexOf('}')).replace(/"/g,'');
        var tempList = tempStr.split('||');
        var membNode = createInputNode(tempList[0],tempList[1]);
        editorElement.appendChild(membNode);
        data = data.substring(data.indexOf('}')+1,data.length);
    }
    return data;
}

var setEditorInstance = function(model){
    console.log("setEditorInstance begin")
    var editorId = 'inputarea'+model.pageId.substring(18,model.pageId.length);
    var editor = document.getElementById(editorId);
    if( typeof formulaEditorInstance =='undefined'){
        formulaEditorInstance = new Map();
    }
    var editorObj = new Object();
    editorObj.editor = editor;
    editorObj.model = model;
    editorObj.range = null;
    editorObj.matchAccountInfo = null;   //空格匹配上的信息
    formulaEditorInstance.set(editorId,editorObj);
    console.log("setEditorInstance end")
}

var getEditorInstance = function(pageId){
    var editorId = 'inputarea'+pageId;
    var editorInstance = formulaEditorInstance.get(editorId);
    return editorInstance;
}

var deleteEditorInstance = function(pageId){
    var editorId = 'inputarea'+pageId;
    formulaEditorInstance.delete(editorId);
}
