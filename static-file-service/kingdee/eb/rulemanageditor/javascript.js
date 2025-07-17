var itemClick =  function (element){
    var val = element.textContent.trim();
    var pageId = element.getAttribute("name");
    var formula = getEditorText(pageId);
    //如果是空的  就设置等式左侧节点
    if(typeof formula == "undefined" || formula == null || formula == ""){
        editorInstance = getEditorInstance(pageId);
        editorInstance.model.invoke('firstMembEdit',"");
    }else if(val=='Account'){
//		newModel.invoke('f(x)','');

        showAddNewForm('',pageId);
    }else if(val=='f(x)'){
//		newModel.invoke('f(x)','');

        showFunctionForm('',pageId);
    }else if (val == 'IF' || val == 'AND' || val == 'OR'||val == 'Round'){
        var newNode = null;
        if(val != 'Round'){
            if(val == 'IF'){
                newNode = document.createTextNode(val+'(  ,  ,  )');
            }else{
                newNode = document.createTextNode(val+'(  ,  )');
            }
        }else{
            newNode = document.createTextNode('@'+val+'(  ,  )');
        }
        var newNodes = new Array();
        newNodes.push(newNode);
        getEditorInstance(pageId).range = null;
        addNewNode(newNodes,element.getAttribute("name"));
    }else{
        var newNode = document.createTextNode(val);
        getEditorInstance(pageId).range = null;
        var newNodes = new Array();
        newNodes.push(newNode);
        addNewNode(newNodes,element.getAttribute("name"));
    }
}

var showFunctionForm = function(functionId,pageId){
    var editorInstance ;
    if(functionId!=null&&functionId!=''){

    }else{
        editorInstance = getEditorInstance(pageId);
        editorInstance.model.invoke('functionEdit',"");
    }
}

var dealKeyUp = function(keyEvent){
    if(keyEvent.code == "Space"){
        var pageId = keyEvent.target.id.replace("inputarea","")
        var testNode = createDivNode("ttt");
        var newNodes = new Array();
        newNodes.push(testNode);
        saveEditorRange(keyEvent.target);
        addNewNode(newNodes,pageId);
        var matchObj = matchAccountText(testNode,keyEvent.target.childNodes);
        var position = getPosition(testNode);
        testNode.remove();
        if(matchObj.accountText != ""){
            matchObj.position = position;
            var editorInstance = getEditorInstance(pageId);
            editorInstance.matchAccountInfo = matchObj;
            editorInstance.model.invoke('matchAccount',matchObj.accountText);
        }
    }
}

var showAccountPanel = function (accountInfo,pageId) {
    var matchAccount = JSON.parse(accountInfo);
    if(matchAccount.length==0)return;
    var accountPanel = document.getElementById("acoountPanel"+pageId);
    var accountDiv = document.getElementById("accountDiv"+pageId);
    var metricDiv = document.getElementById("metricDiv"+pageId);
    var accountInfoStr = '<p>科目：</p><ol>';
    for(var index = 0;index<matchAccount.length;index++){
        accountInfoStr = accountInfoStr+'<li onclick="selectAccount(this)" data = '+matchAccount[index].key+'>'+matchAccount[index].value+'</li>';
    }
    var metricInfoStr = '<p>度量：</p>';
    metricDiv.innerHTML = metricInfoStr;
    accountInfoStr = accountInfoStr+'</ol>';
    accountDiv.innerHTML=accountInfoStr;
    var editorInstance = getEditorInstance(pageId);
    var matchObj = editorInstance.matchAccountInfo;
    accountPanel.style.left = matchObj.position.left+'px';
    accountPanel.style.top = matchObj.position.top+15+'px';
    accountPanel.style.display = "block";
    accountPanel.focus();
}

var selectAccount = function (data) {
    var accountNum = data.getAttribute("data");
    dealSelect(data);
    var accountDiv = data.parentNode.parentNode;
    var pageId = accountDiv.id.replace("accountDiv","");
    var editorInstance = getEditorInstance(pageId);
    editorInstance.model.invoke('selectAccountOfDiv',accountNum);
}
var matchAccountText = function (signNode,allNodes) {
    var nodeName,accountText = "";
    var matchSign = false;
    var matchNode = null;
    for(var i=0;i<allNodes.length;i++){
        if(signNode == allNodes[i]){
            if(i>0){
                matchNode = allNodes[i-1];
                nodeName = matchNode.nodeName;
                if(nodeName=='#text'){
                    var text = matchNode.data.replace(/\s/g," ");
                    var texts = text.split("");
                    if(texts.length>1&&texts[texts.length-1]==' '&&texts[texts.length-2]!=' '){
                        text = "";
                        for(var j=0;j<texts.length-1;j++){
                            if(texts[j]==' '||texts[j]=='+'||texts[j]=='-'||texts[j]=='*'||texts[j]=='/'||texts[j]=='('||texts[j]==')'||texts[j]=='>'||texts[j]=='<'||texts[j]=='='){
                                text = "";
                            }else{
                                text = text+texts[j];
                            }
                        }
                        accountText = accountText + text;
                    }
                }else{
                    matchNode = null;
                }
            }
            matchSign = true;
            break;
        }
        if(allNodes[i].childNodes.length >0){
            var matchObj = matchAccountText(signNode,allNodes[i].childNodes);
            if(matchObj.matchSign == true)return matchObj;
        }
    }
    var matchResult = new Object();
    matchResult.accountText = accountText.replace(' ','');
    matchResult.matchSign = matchSign;
    matchResult.matchNode = matchNode;
    return matchResult;
}


var showMetricList = function (metricInfo,pageId) {
    var metricList = JSON.parse(metricInfo);
    var metricDiv = document.getElementById("metricDiv"+pageId);
    var metricInfoStr = '<p>度量：</p><ol>';
    for(var index = 0;index<metricList.length;index++){
        metricInfoStr = metricInfoStr+'<li onclick="selectMetric(this)" data = '+metricList[index].key+'>'+metricList[index].value+'</li>';
    }
    metricInfoStr = metricInfoStr+'</ol>'
    metricDiv.innerHTML = metricInfoStr;
}

var selectMetric = function (metric) {
    var metricNum = metric.getAttribute("data");
    dealSelect(metric);
    var metricDiv = metric.parentNode.parentNode;
    var pageId = metricDiv.id.replace("metricDiv","");
    var editorInstance = getEditorInstance(pageId);
    editorInstance.model.invoke('selectMetricOfDiv',metricNum);
    removeMatchAccountInfo(editorInstance);
}

var dealSelect = function (currentItem) {
    var allListItem = currentItem.parentNode.childNodes;
    for(var i = 0;i<allListItem.length;i++){
        allListItem[i].style.backgroundColor = "";
    }
    currentItem.style.backgroundColor = "#5DB8E1";
}

var getPosition = function (element){
    var box = element.getBoundingClientRect(), doc = element.ownerDocument, body = doc.body, docElem = doc.documentElement;
    var clientTop = docElem.clientTop || body.clientTop || 0, clientLeft = docElem.clientLeft || body.clientLeft || 0;
    var top = box.top + (self.pageYOffset || docElem.scrollTop) - clientTop, left = box.left + (self.pageXOffset || docElem.scrollLeft) - clientLeft;
    return {
        left: left,
        top: top,
        right: left + box.width,
        bottom: top + box.height
    };
}

var showAddNewForm = function(member,pageId){

    var preKey = '';
    var currentKey = '';
    var editorInstance ;
    if(member!=null&&member!=''){   //编辑成员
        var editor = member.parentNode;
        currentKey = member.id;
        editorInstance = getEditorInstance(editor.id.replace("inputarea",''));
    }else{
        editorInstance = getEditorInstance(pageId);
    }
    var member = new Object();
    member.preKey = preKey;
    member.currentKey = currentKey;
    editorInstance.model.invoke('membEdit',member);
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
                for(var i = newNode.length-1;i>=0;i--){
                    inputedit.appendChild(newNode[i]);
                }
                editorSelection.removeAllRanges();
                editorSelection.selectAllChildren(inputedit);  //本来直接调用focus就可以了，但是不知道为啥火狐的时候，focus之后，取得焦点了，但是selection还是没
            }else{
                editorRange = editorInstance.range;
                for(var i = newNode.length-1;i>=0;i--){
                    editorRange.insertNode(newNode[i]);
                }
                editorSelection.removeAllRanges();
                editorSelection.addRange(editorRange);
            }
        }else{
            if(editorRange == null){
                editorRange = editorSelection.getRangeAt(0);
                editorInstance.range = editorRange;
            }
            for(var i = newNode.length-1;i>=0;i--){
                editorRange.insertNode(newNode[i]);
            }
            editorSelection.removeAllRanges();
            editorSelection.addRange(editorRange);
        }
        editorSelection.collapseToEnd();
    }
    else if(document.seletion){

    }
}

var removeMatchAccountInfo = function (editorInstance) {
    var matchObj = editorInstance.matchAccountInfo;
    if(matchObj!=null){
        var matchNode = matchObj.matchNode;
        var nodeText = matchNode.data.trim();
        var matchText = matchObj.accountText.trim();
        nodeText = nodeText.substring(0,nodeText.length-matchText.length);
        matchNode.data = nodeText;
        editorInstance.matchAccountInfo = null;
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
    newInputNode.style.cssText = 'width:'+(textLength+1)*7+'px;';
    return newInputNode;
}

var createDivNode = function (id) {
    var newDivNode = document.createElement('div');
    newDivNode.style.background = "blue";
    newDivNode.setAttribute("id", id)
    newDivNode.style.width = "1px";
    newDivNode.style.display = "inline";
    newDivNode.style.height = "1px";
    return newDivNode;
}

var createFunction = function(id,paramStr){
    var nodes = new Array();
    if(id.startsWith("formult")){
        nodes[0] = createInputNode(id,paramStr);
    }else{
        var node;
        var params = paramStr.split('!!!');
        for(var i = 0,j = 0;i<params.length;i++,j++){
            var param = params[i].split("!!");
            if(i>2&&i<params.length-1){
                node = createNode(',','text');
                nodes[j] = node;
                j++;
            }
            node = createNode(param[0],param[1]);
            nodes[j] = node;
        }
    }
    return nodes;
}


var createNode = function (text,id) {
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

//成员点击编辑
var membClick = function (memb){
    showAddNewForm(memb,null);
    // updataText(memb.id,"这是替换")
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

var getNodeText = function (pageId){
    //这里只遍历第一层
    var editorInstance = getEditorInstance(pageId);
    var editor = editorInstance.editor;
    var childNodes = editor.childNodes;
    var nodeName,text = '';
    for(var i=0;i<childNodes.length;i++){
        nodeName = childNodes[i].nodeName;
        if(nodeName=='INPUT'){
            text =text+'{'+childNodes[i].id+'}';
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

//更新成员信息
var updataText = function (id,name,pageId){
    if(id.startsWith("F`")){
        updateFunction(id,name,pageId);
    }else{
        var inputedit = document.getElementById(id);
        inputedit.value  = name;
        var nameLength = getTextLength(name);
        inputedit.style.cssText = 'width:'+(nameLength+1)*7+'px;';
    }
}

var updateFunction = function(id,name,pageId){

    var editorInstance = getEditorInstance(pageId);
    var editor = editorInstance.editor;
    var childNodes = editor.childNodes;
    var leftCount = 0;
    var findFunction = false;
    var elements = new Array();
    for(var i=0;i<childNodes.length;i++){
        var nodeName = childNodes[i].nodeName;
        var text = childNodes[i].data;
        if(childNodes[i].id == id){
            findFunction = true;
            focusMembPosition(childNodes[i]);
            elements.push(childNodes[i]);
            if(i+1<childNodes.length){       //判断函数后第一个元素
                nodeName = childNodes[i+1].nodeName
                if(nodeName != "#text"){
                    break;
                }else{
                    text = childNodes[i+1].data;
                    var texts = text.replace(/\s/g,"").split("");
                    if(texts.length>0&&texts[0]!='('){
                        break;
                    }
                }
            }
            continue;
        }
        if(!findFunction)continue;
        if(nodeName == "#text"){
            var texts = text.replace(/\s/g,"").split("");
            if(texts.length == 0)continue;
            for( var j = 0;j<texts.length;j++){
                if(texts[j]=='('){
                    leftCount++;
                }else if(texts[j] == ')'){
                    leftCount--;
                }
                if(leftCount==0){
                    var newText = "";
                    for(var z = j+1;z<texts.length;z++){
                        newText = newText+texts[z];
                    }
                    if(newText == ""){
                        elements.push(childNodes[i]);
                    }else{
                        childNodes[i].data = newText;
                    }
                    break;
                }
            }
        }
        if(leftCount==0){
            break;
        }else{
            elements.push(childNodes[i]);
        }
    }
    for(var i=0;i<elements.length;i++){
        editor.removeChild(elements[i]);
    }
    var newNodes = createFunction(id,name);
    addNewNode(newNodes,pageId);
}

var getElementOfFunction = function(functionKey,pageId){


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

var hideAccountPanel = function(panel){
    panel.style.display = "none";
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
