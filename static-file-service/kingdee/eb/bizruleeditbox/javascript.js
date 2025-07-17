var addRuleRow = function(pageId,ruleRowId,model){
    var rowHtml = '<div class="seq float-Div ruleRowLeft">1</div>'
        +'<div class="float-Div ruleRowRight">'
        +'<div class="rangeFlex">'
        +'<span class="rangeLabel">'+KDApi.getLangMsg(model,'nameshow1')+' : </span>'
        +'<div class = "rangeEditor" contenteditable = "true" editBoxType = "range" onblur = "saveEditorRange(this)" onkeyup = "dealKeyUp(event)"></div>'
        +'<span class="addDimBtn" onclick="showDimForRuleRow(this)">'+KDApi.getLangMsg(model,'nameshow0')+'</span>'
        +'</div>'
        +'<div class = "formulaEdit" contenteditable = "true" editBoxType = "formula" onblur = "saveEditorRange(this)" onkeyup = "dealKeyUp(event)"></div>'
        +'</div>'
        +'</div>'
        +'<div class="float-Div ruleRowEnd">'
        +'<div><span class="switchBox" data="false" onclick="rowSwitchClick(this)"><span /></span></div>'
        +'<div><span><span>适用成员范围</span><label class="need_label">*</label><select class="executerange_select"><option value=""></option><option value="ALL">都适用</option><option value="LEAF">仅明细</option><option value="NOTLEAF">仅非明细</option></select></span></div>'
        +'</div>';

    var editor = getFormulaContainer(pageId);
    var newDivNode = document.createElement('div');
    newDivNode.setAttribute("class","ruleRow");
    newDivNode.setAttribute("isFocusRow","false");
    newDivNode.setAttribute("onclick","setFocusRow(this)");
    newDivNode.setAttribute("id",ruleRowId)
    newDivNode.innerHTML = rowHtml;
    newDivNode.childNodes[0].innerText = editor.childNodes.length+1;
    editor.appendChild(newDivNode);
    if(editor.childNodes.length == 1){
        setFocusRow(newDivNode);
    }
    //BT-00481256,子规则默认开启
    setUseable(null,ruleRowId,true,pageId);
    return newDivNode;
}

var getRowIdOrPageIdForItem = function (item,needRowId) {
    var parentNode = item.parentNode;
    var result = null;
    while (parentNode != null){
        if(needRowId){
            var className = parentNode.getAttribute("class");
            if("ruleRow" == className){
                result = parentNode.getAttribute("id");
                break;
            }
        }else{
            var id = parentNode.getAttribute("id");
            if(id != null && id.startsWith("formulaeditor")){
                result = id.substring("formulaeditor".length,id.length);
                break;
            }
        }
        parentNode = parentNode.parentNode;
    }
    return result;
}

var showDimForRuleRow = function (btnItem) {
    var editor = btnItem.parentNode.childNodes[1];
    var dimRangeText = getRangeDimText(editor);
    var pageId = getRowIdOrPageIdForItem(btnItem,false);
    var editorInstance = getEditorInstance(pageId);
    var rowId = getRowIdOrPageIdForItem(btnItem,true);
    var fomulaEdit = btnItem.parentNode.parentNode.childNodes[1];  //懒得按照rowid找了
    var firstMembKey = getFirstMemebKey(fomulaEdit);
    var data = new Object();
    data.dimRangeText = dimRangeText;
    data.rowId = rowId;
    data.firstFormulaMembKey = firstMembKey;
    editorInstance.model.invoke('addDimForRuleRow',data);
}


var addDimForRuleRow = function (dimInfo,pageId) {
    if(dimInfo !=null){
        var dimNumStrs = dimInfo.dimNumbers;
        var ruleRowId = dimInfo.ruleRowId;
        var showType = dimInfo.showType;
        var dimNums = dimNumStrs.split(',');
        var ruleRowItem = getItemByIdForPage(ruleRowId,pageId);
        var dimRangeEditor = ruleRowItem.getElementsByClassName("rangeEditor")[0];
        var textNode;
        if(dimRangeEditor.childNodes.length>0){
            dimRangeEditor.appendChild(createNode(",","text",null));
        }
        for(var i=0;i<dimNums.length;i++){
            var dim = dimNums[i].split("-!-");
            var dimNode = createRangeDimNode(dim[0],dim[1],formateNameAndNum(false,dim[0],dim[1],showType));
            dimRangeEditor.appendChild(dimNode);
            if(i != dimNums.length-1){
                textNode = createNode("{ },","text",null);
            }else{
                textNode = createNode("{ }","text",null);
            }
            dimRangeEditor.appendChild(textNode);
        }
    }
}

var copyRuleRow = function (pageId,paramData) {
    var sourceRowId = paramData.sourceRuleRowId;
    var newRuleRowId = paramData.newRuleRowId;
    var replaceKeys =  paramData.replaceKeys;
    var ruleContainer = getFormulaContainer(pageId);
    var sourceRowItem = getItemByIdForPage(sourceRowId,pageId);
    var newRowItem = sourceRowItem.cloneNode(true);
    newRowItem.setAttribute("id",newRuleRowId);
    newRowItem.setAttribute("isFocusRow","false");
    var seqItem = newRowItem.getElementsByClassName("seq")[0];
    seqItem.innerText = ruleContainer.childNodes.length+1;
    var formulaItem = newRowItem.getElementsByClassName("formulaEdit")[0];
    replaceMembKeys(formulaItem,replaceKeys);
    ruleContainer.appendChild(newRowItem);
    setFocusRow(newRowItem);
    newRowItem.scrollIntoView();
}

var replaceMembKeys = function (parentItem,replaceKeys) {
    if(checkItemNotNull(parentItem)){
        var childs = parentItem.childNodes;
        for(var i=0;i<childs.length;i++){
            var nodeType = childs[i].nodeName;
            if(nodeType == "INPUT"){
                var key = childs[i].getAttribute("id");
                var newKey = replaceKeys[key];
                if(checkItemNotNull(newKey)){
                    childs[i].setAttribute("id",newKey);
                }
            }else if(nodeType != "#text"){
                replaceMembKeys(childs[i],replaceKeys);
            }
        }
    }
}

var dealKeyUp = function(keyEvent){
    if(keyEvent.code == "Space"){
        var pageId = getRowIdOrPageIdForItem(keyEvent.target,false);
        var dimNum = null;
        var testNode = createDivNode("ttt");
        var newNodes = new Array();
        newNodes.push(testNode);
        saveEditorRange(keyEvent.target);
        addNewNode(newNodes,pageId);
        var matchObj = matchAccountText(testNode,keyEvent.target.childNodes);
        var position = getPosition(testNode);
        if(matchObj.memberText != ""){
            var editorType = keyEvent.target.getAttribute("editBoxType");
            if(editorType == "range"){
                dimNum = getDimNumForFocusNode(testNode,keyEvent.target.childNodes);
            }
            matchObj.position = position;
            var editorInstance = getEditorInstance(pageId);
            editorInstance.matchMemberInfo = matchObj;
            var param = new Object();
            param.text = matchObj.memberText;
            param.editorType = editorType;
            param.rowId = getRowIdOrPageIdForItem(keyEvent.target,true);
            param.dimNumber = dimNum;
            editorInstance.model.invoke('matchDimMember',param);
        }
        testNode.remove();
    }
}

var showDimMembPanel = function (dimMembInfo,pageId,model) {
    var ruleRowId = dimMembInfo.ruleRowId;
    var editorType = dimMembInfo.editorType;
    var matchedMembers = JSON.parse(dimMembInfo.members);
    if(matchedMembers.length==0)return;
    var memberPanel = document.getElementById("memberPanel"+pageId);
    var memberDiv = document.getElementById("memberDiv"+pageId);
    var rangeDiv = document.getElementById("rangeDiv"+pageId);
    var memberInfoStr = '<p>'+KDApi.getLangMsg(model,'nameshow2')+'</p><div class="memblist"><ol>';
    for(var index = 0;index<matchedMembers.length;index++){
        var showText = matchedMembers[index].value+'('+matchedMembers[index].key+')';
        memberInfoStr = memberInfoStr+'<li onclick="selectDimMember(this)" title="'+showText+'" data = '+matchedMembers[index].key+'>'+showText+'</li>';
    }
    var rangeInfoStr = '<p>'+KDApi.getLangMsg(model,'nameshow3')+'</p><ol>'
        +'<li onclick="selectRange(this)" data = "This" title="'+KDApi.getLangMsg(model,'nameshow4')+'">'+KDApi.getLangMsg(model,'nameshow4')+'(This)</li>'
        +'<li onclick="selectRange(this)" data = "children" title="'+KDApi.getLangMsg(model,'nameshow5')+'">'+KDApi.getLangMsg(model,'nameshow5')+'(children)</li>'
        +'<li onclick="selectRange(this)" data = "all" title="'+KDApi.getLangMsg(model,'nameshow6')+'">'+KDApi.getLangMsg(model,'nameshow6')+'(all)</li>'
        +'<li onclick="selectRange(this)" data = "Detail" title="'+KDApi.getLangMsg(model,'nameshow7')+'">'+KDApi.getLangMsg(model,'nameshow7')+'(Detail)</li>'
        +'<li onclick="selectRange(this)" data = "Item" title="'+KDApi.getLangMsg(model,'nameshow8')+'">'+KDApi.getLangMsg(model,'nameshow8')+'(Item)</li>';
    rangeDiv.innerHTML = rangeInfoStr+'</ol>';
    memberInfoStr = memberInfoStr+'</ol></div>';
    memberDiv.innerHTML=memberInfoStr;
    if(editorType == 'range'){
        rangeDiv.style.display = "block";
        memberDiv.style.width = "150px";
    }else{
        rangeDiv.style.display = "none";
        memberDiv.style.width = "300px";
    }
    memberDiv.setAttribute("editorType",editorType);
    memberDiv.getElementsByTagName("li")[0].style.backgroundColor = "#5DB8E1" ; //选中第一个
    var editorInstance = getEditorInstance(pageId);
    var matchObj = editorInstance.matchMemberInfo;
    memberPanel.style.left = matchObj.position.left+'px';
    memberPanel.style.top = matchObj.position.top+15+'px';
    memberPanel.style.display = "block";
    memberPanel.focus();
}

var selectDimMember = function (data) {
    var membNum = data.getAttribute("data");
    dealSelect(data);
    var membDiv = data.parentNode.parentNode.parentNode;
    var editorType = membDiv.getAttribute("editorType");
    if(editorType != "range"){
        var pageId = membDiv.id.replace("memberDiv","");
        var editorInstance = getEditorInstance(pageId);
        editorInstance.model.invoke('selectDimMemb4Formula',membNum);
    }
}

var selectRange = function (data) {

    //要获取前面选中的维度成员
    var membPanel = data.parentNode.parentNode.parentNode;
    var membDiv = membPanel.childNodes[0];
    var membList = membDiv.getElementsByTagName("li");
    var selectedMemb = null;
    for(var i=0;i<membList.length;i++){
        if(membList[i].style.backgroundColor != ""){
            selectedMemb = membList[i].getAttribute("data");
            break;
        }
    }
    var rangeNum = data.getAttribute("data");
    var selectInfo = new Object();
    selectInfo.membNumber = selectedMemb;
    selectInfo.rangeNumber = rangeNum;
    var pageId = membDiv.id.replace("memberDiv","");
    var editorInstance = getEditorInstance(pageId);
    editorInstance.model.invoke('selectDimMemb4Range',selectInfo);
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
                            if(texts[j]==' '||texts[j]=='+'||texts[j]=='-'||texts[j]=='*'||texts[j]=='/'||texts[j]=='('||texts[j]==')'||texts[j]=='>'||texts[j]=='<'||texts[j]=='='||texts[j]=='{'||texts[j]=='}'||texts[j]==','||texts[j]=='，'){
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
    matchResult.memberText = accountText.replace(' ','');
    matchResult.matchSign = matchSign;
    matchResult.matchNode = matchNode;
    return matchResult;
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

var showMembRange = function(member,pageId){

    var currentKey = '';
    var editorInstance ;
    if(member!=null&&member!=''){   //编辑成员
        var editor = member.parentNode;
        currentKey = member.id;
        var pageId = getRowIdOrPageIdForItem(member,false);
        var rowId = getRowIdOrPageIdForItem(member,true);
        var rowItem = getItemByIdForPage(rowId,pageId);
        var formulaEditItem = rowItem.getElementsByClassName("formulaEdit")[0];
        editorInstance = getEditorInstance(pageId);
        var member = new Object();
        member.firstKey = getFirstMemebKey(formulaEditItem);
        member.currentKey = currentKey;
        member.ruleRowId = rowId;
        editorInstance.model.invoke('membEdit',member);

    }
}


var getFirstMemebKey = function (formulaEditItem) {
    var result = "";
    if(checkItemNotNull(formulaEditItem)){
        var childNodes = formulaEditItem.childNodes;
        for(var i = 0;i<childNodes.length;i++){
            var nodeName = childNodes[i].nodeName;
            if(nodeName=='INPUT'){
                result = childNodes[i].id;
                break;
            }else if(nodeName == 'DIV'){
                result = getFirstMemebKey(childNodes[i]);
                if(result != "")break;
            }
        }
    }
    return result;
}

//添加新节点
var addNewNode = function(newNode,pageId){
    var editorInstance = getEditorInstance(pageId);
    var inputedit = editorInstance.editor;
    var editorRange = editorInstance.range;
    if(window.getSelection){
        var editorSelection = window.getSelection();
        if(inputedit!=document.activeElement){
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

var removeMatchMemberInfo = function (pageId) {
    var editorInstance = getEditorInstance(pageId);
    var matchObj = editorInstance.matchMemberInfo;
    if(matchObj!=null){
        var matchNode = matchObj.matchNode;
        var nodeText = matchNode.data.trim();
        var matchText = matchObj.memberText.trim();
        nodeText = nodeText.substring(0,nodeText.length-matchText.length);
        matchNode.data = nodeText;
        editorInstance.matchMemberInfo = null;
    }
}
//创建一个成员显示节点（input框）
var createInputNode = function (id,name,showType){
    var newInputNode = document.createElement('input');
    newInputNode.setAttribute("type","text") ;
    newInputNode.setAttribute("class", "membinput") ;
    newInputNode.setAttribute("readonly", "readonly") ;
    var sign = name.indexOf('-!-');
    if(sign!=-1){
        var numAndName = name.split("-!-");
        newInputNode.setAttribute("number", numAndName[0]) ;
        newInputNode.setAttribute("name", numAndName[1]) ;
        name = formateNameAndNum(false,numAndName[0],numAndName[1],showType);
    }
    newInputNode.setAttribute("value", name) ;
    newInputNode.setAttribute("id", id) ;
    newInputNode.setAttribute("onclick", "membClick(this)") ;
    newInputNode.setAttribute("onmousedown","return false;");
    var textLength = getTextLength(name);
    newInputNode.style.cssText = 'width:'+textLength+'px;';
    return newInputNode;
}

var createRangeDimNode = function(dimNumber,dimName,showInfo){
    var newInputNode = document.createElement('input');
    newInputNode.setAttribute("type","text") ;
    newInputNode.setAttribute("class", "rangDimInput") ;
    newInputNode.setAttribute("readonly", "readonly") ;
    newInputNode.setAttribute("value", showInfo) ;
    newInputNode.setAttribute("number", dimNumber);
    newInputNode.setAttribute("name", dimName) ;
    newInputNode.setAttribute("onclick", "rangeDimClick(this)") ;
    newInputNode.setAttribute("onmousedown","return false;");
    var textLength = getTextLength(showInfo);
    newInputNode.style.cssText = 'width:'+textLength+'px;';
    return newInputNode;
}

var formateNameAndNum = function(hasRange,objNum,objName,showType){
    var result = '';
    if(showType == '1'){
        result = objNum;
    }else if(showType == '2'){
        result = objName;
    }else if(showType == '3'){
        if(hasRange){
            var num = objNum.substring(0,objNum.lastIndexOf("."));
            var name = objName.substring(0,objName.lastIndexOf("."));
            var rangeNum = objNum.substring(objNum.lastIndexOf(".")+1,objNum.length);
            var rangeName = objName.substring(objName.lastIndexOf(".")+1,objName.length);
            result = name+'('+num+')'+'.'+rangeName+'('+rangeNum+')';
        }else{
            result = objName+'('+objNum+')';
        }
    }
    return result;
}

var createRangeDimMembNode = function (membNumber,membName,showInfo,nodeType) {
    var newInputNode = document.createElement('input');
    newInputNode.setAttribute("type","text") ;
    newInputNode.setAttribute("class", "rangDimMembInput") ;
    newInputNode.setAttribute("readonly", "readonly") ;
    newInputNode.setAttribute("value", showInfo) ;
    newInputNode.setAttribute("number", membNumber) ;
    newInputNode.setAttribute("name", membName) ;
    newInputNode.setAttribute("nodeType", nodeType) ; //成员或属性
    newInputNode.setAttribute("onmousedown","return false;");
    var textLength = getTextLength(showInfo);
    newInputNode.style.cssText = 'width:'+textLength+'px;';
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

var createBrNode = function (needBr) {
    var newDivNode = document.createElement('div');
    if(needBr){
        newDivNode.innerHTML = "<br/>"
    }
    return newDivNode;
}

var createFuncOrFormulaMemb = function(id,paramStr,showType){
    var nodes = new Array();
    if(id.startsWith("formult")){
        nodes[0] = createInputNode(id,paramStr,showType);
    }else if(id.startsWith("F`")){
        var params = JSON.parse(paramStr);
        var count = 0;
        var isCut = params.cut;
        if(isCut){
            var node = createNode(params.functionNum,params.functionKey,showType);
            nodes[count] = node;
            node = createNode("(","text",showType);
            nodes[++count] = node;
            for(var i = 0;i<params.paramPojos.length;i++){
                var param = params.paramPojos[i];
                if(i>0&&i<params.paramPojos.length){
                    node = createNode(',','text',showType);
                    nodes[++count] = node;
                }
                if(param.type == 'member'){
                    node = createNode(param.number+"-!-"+param.name,param.key,showType);
                }else{
                    node = createNode(param.name,"text",showType);
                }
                nodes[++count] = node;
            }
            node = createNode(")","text",showType);
            nodes[++count] = node;
        }else{
            var text = getNotCutFunctionText(params,showType);
            var node = createNode(text,id,showType);
            node.setAttribute("allText",paramStr);
            nodes[0] = node;
        }
    }else{
        nodes[0] = createNode(paramStr,id,showType);
    }
    return nodes;
}

var getNotCutFunctionText = function (params,showType) {
    var text = params.functionNum+"(";
    for(var i = 0;i<params.paramPojos.length;i++){
        var param = params.paramPojos[i];
        if(param.type == 'member'){
            text = text +formateNameAndNum(param.hasRange,param.number,param.name,showType);
        }else {
            text = text+param.name;
        }
        text = text+",";
    }
    text = text.substring(0, text.length - 1);
    text = text + ")";
    return text;
}

var createNode = function (text,id,showType) {
    var node;
    if(id == 'text'){
        node = document.createTextNode(text);
    }else {
        node = createInputNode(id,text,showType);
    }
    return node;
}

var getTextLength = function(str) {
    ///<summary>获得字符串实际长度，中文2，英文1</summary>
    ///<param name="str">要获得长度的字符串</param>
    var realLength = 0, len = str.length, charCode = -1;
    for (var i = 0; i < len; i++) {
        charCode = str.charCodeAt(i);
        if((charCode >= 64 && charCode <= 90)){
            realLength += 1.5;
        }else if(charCode>=128){
            realLength += 2;
        }else if((charCode >= 48 && charCode <= 57)){
            realLength += 1.15;
        }else if(charCode == 46||charCode == 45){
            realLength += 0.5;
        }else if(charCode == 40||charCode == 41){
            realLength += 0.65;
        }else{
            realLength += 1;
        }
    }
    return realLength*6+5;
}

//成员点击编辑
var membClick = function (memb){
    showMembRange(memb,null);
    // updataText(memb.id,"这是替换")
}

var rangeDimClick = function (dim) {
    var rowId = getRowIdOrPageIdForItem(dim,true);
    var pageId = getRowIdOrPageIdForItem(dim,false);
    var instance = getEditorInstance(pageId);
    var dimNumber = dim.getAttribute("number");
    var rangDimMembInfo = new Object();
    rangDimMembInfo.rowId = rowId;
    rangDimMembInfo.dimMemberRangeInfo = findDimRangeMemberStr(dim);
    var rowItem = getItemByIdForPage(rowId,pageId);
    var formulaEditBox = rowItem.getElementsByClassName("formulaEdit")[0];
    var firstMembKey = getFirstMemebKey(formulaEditBox);
    rangDimMembInfo.firstFormulaMembKey = firstMembKey;
    instance.model.invoke("showRangeDimMembForm",rangDimMembInfo);
}

var findDimRangeMemberStr = function (dimItem) {
    var result = "";
    var brothers = dimItem.parentNode.childNodes;
    var findedBegin = false;
    for(var i = 0;i<brothers.length;i++){
        if(findedBegin){
            var nodeName = brothers[i].nodeName;
            if(nodeName == "#text"){
                var str = brothers[i].data;
                var index = str.search('}');
                if(index>-1){
                    result = result +str.substring(0,index+1);
                    break;
                }else{
                    result = result +str;
                }
            }else if(nodeName == "INPUT"){
                if(brothers[i].getAttribute("class") == "rangDimInput"){
                    break;
                }else{
                    result = result +'['+brothers[i].getAttribute("number")+'|'+brothers[i].getAttribute("nodeType")+']';
                }
            }
        }else{
            if(brothers[i]==dimItem){
                findedBegin = true;
                result = result+'['+dimItem.getAttribute("number")+']';
            }
        }
    }
    return result;
}

var addRangeDimMemb = function (param,pageId) {
    var membNum = param.memberNum;
    var membName = param.memberName;
    var showType = param.showType;
    var showStr = formateNameAndNum(true,membNum,membName,showType);
    var rangeDimMembNode = createRangeDimMembNode(membNum,membName,showStr,"member");
    var nodes = new Array();
    nodes[0] = rangeDimMembNode;
    addNewNode(nodes,pageId);
}

var backRangeDimMemb = function (param,pageId) {
    var ruleRowId = param.ruleRowId;
    var dimNumber = param.dimNumber;
    var memberInfo = param.memberInfo;
    var showType = param.showType;
    var ruleRowItem = getItemByIdForPage(ruleRowId,pageId);
    var dimRangeEditor = ruleRowItem.getElementsByClassName("rangeEditor")[0];
    var childNodes = dimRangeEditor.childNodes;
    var findedCurrent = null;
    var endNode = null;
    var elementsToDel = new Array();
    var elementsToAdd = new Array();
    elementsToAdd.push(createNode('{',"text",null));
    for(var i = 0 ;i<childNodes.length;i++){
        var nodeType = childNodes[i].nodeName;
        if(findedCurrent){
            if(nodeType == 'INPUT' && childNodes[i].getAttribute("class") == 'rangDimInput'){
                endNode = childNodes[i];
                break;
            }else{
                elementsToDel.push(childNodes[i]);
            }
        }else{
            if(nodeType == 'INPUT' && dimNumber == childNodes[i].getAttribute("number")){
                findedCurrent = true;
            }
        }
    }
    for(var i = 0 ;i<elementsToDel.length;i++){
        dimRangeEditor.removeChild(elementsToDel[i]);
    }
    if(memberInfo != null){
        var members = JSON.parse(memberInfo);
        for(var i=0;i<members.length;i++){
            var memb = members[i];
            var membType = memb.type;
            var newNode = createRangeDimMembNode(memb.number,memb.name,formateNameAndNum(true,memb.number,memb.name,showType),membType);
            elementsToAdd.push(newNode);
            if(i!=members.length -1){
                elementsToAdd.push(createNode(',',"text",null));
            }
        }
    }
    if(endNode != null){
        elementsToAdd.push(createNode('},',"text",null));
        for(var i=0;i<elementsToAdd.length;i++){
            dimRangeEditor.insertBefore(elementsToAdd[i],endNode);
        }
    }else{
        elementsToAdd.push(createNode('}',"text",null));
        for(var i=0;i<elementsToAdd.length;i++){
            dimRangeEditor.appendChild(elementsToAdd[i]);
        }
    }
}

var focusMembPosition = function(memb){
    var editor = memb.parentNode;
    var pageId = getRowIdOrPageIdForItem(memb,false)
    var editorInstance = getEditorInstance(pageId);
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

var getRangeDimText = function (editor) {
    var childNodes = editor.childNodes;
    var nodeName,text = '';
    for(var i=0;i<childNodes.length;i++){
        nodeName = childNodes[i].nodeName;
        if(nodeName=='INPUT' && childNodes[i].getAttribute("class") == "rangDimInput"){
            text =text+childNodes[i].getAttribute("number");
            if(i!=childNodes.length-1){
                text = text +",";
            }
        }
    }
    return text.replace(/\s+/g,"");
}

var getAllFormulaKeyOneRow = function(pageId,data){
    var ruleRowId ;
    if(checkItemNotNull(data)){
        ruleRowId = data;
    }else{
        ruleRowId = getFocusRowId(pageId)
    }
    var keyList = new Array();
    var rowItem = getItemByIdForPage(ruleRowId,pageId);
    var formulaEditItem = rowItem.getElementsByClassName("formulaEdit")[0];
    getNodeText(formulaEditItem,keyList);
    var param = new Object();
    param.ruleRowId = ruleRowId;
    param.keyList = keyList;
    var instance = getEditorInstance(pageId);
    instance.model.invoke('getAllFormulaKeyOneRow', param);
}

var getNodeText = function (formulaEditItem,keyList){
    if(checkItemNotNull(formulaEditItem)){
        var childNodes = formulaEditItem.childNodes;
        for(var i = 0;i<childNodes.length;i++){
            var nodeName = childNodes[i].nodeName;
            if(nodeName=='INPUT'){
                keyList.push(childNodes[i].id);
            }else if(nodeName == 'DIV'){
                getNodeText(childNodes[i],keyList);
            }
        }
    }
}

var getAllRuleRowInfo = function (pageId) {
    var editor = getFormulaContainer(pageId);
    var rowItems = editor.childNodes;
    var rowInfos = new Array();
    var rangeEditBox,formulaEditBox,switchItem,executerange;
    for(var i=0;i<rowItems.length;i++){
        rangeEditBox = rowItems[i].getElementsByClassName("rangeEditor")[0];
        formulaEditBox = rowItems[i].getElementsByClassName("formulaEdit")[0];
        switchItem = rowItems[i].getElementsByClassName("switchBox")[0];
        executerange = rowItems[i].getElementsByClassName("executerange_select")[0];
        var rowObj = new Object();
        rowObj.rangeDimMembInfo = getItemAllText(rangeEditBox,false);
        rowObj.formulaInfo = getItemAllText(formulaEditBox,true);
        rowObj.rowId = rowItems[i].id;
        rowObj.rowSeq = i;
        rowObj.useable = switchItem.getAttribute("data");
        var executerangeSelectedIndex = executerange.selectedIndex;
        rowObj.executerangeString = executerange.options[executerangeSelectedIndex].value;
        rowInfos.push(rowObj);
    }
    return rowInfos;
}


var getItemAllText = function (item,isFormulaEdit) {
    var result = "";
    if(checkItemNotNull(item)){
        var childNodes = item.childNodes;
        for(var i = 0;i<childNodes.length;i++){
            var nodeName = childNodes[i].nodeName;
            if(nodeName=='INPUT'){
                if(isFormulaEdit){
                    result = result+'{"'+childNodes[i].id+'"}';
                }else{
                    var number = childNodes[i].getAttribute("number");
                    var nodeType = childNodes[i].getAttribute("nodeType");
                    if(nodeType != null){
                        result = result +'['+number+"|"+nodeType+']';
                    }else{
                        result = result +'['+number+']';
                    }
                }
            }else if(nodeName == '#text'){
                result = result + childNodes[i].data;
            }else if(nodeName == 'DIV'){
                result = result + getItemAllText(childNodes[i],isFormulaEdit);
            }else if(nodeName == "BR"){
                result = result + '|BR|';
            }
        }
    }
    result = result.replace(/\s/g,"");
    return result;
}

var checkItemNotNull = function (item) {
    return !!item;
}

//保存公式框的选中区
var saveEditorRange = function(editor){
    var pageId = getRowIdOrPageIdForItem(editor,false);
    var editorInstance = getEditorInstance(pageId);
    var editorSelection = window.getSelection();
    var editorRange = null;
    if(editorSelection!=null&&checkIsOnEditor(editorSelection.focusNode)){
        editorRange = editorSelection.getRangeAt(0);
    }
    editorInstance.range = editorRange;
    editorInstance.editor = editor;
}

var checkIsOnEditor = function(focusNode){
    var result;
    if(focusNode != null){
        var nodeName = focusNode.nodeName;
        if(nodeName == "DIV" && focusNode.getAttribute("contenteditable") == 'true'){
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
var updataText = function (id,name,pageId,showType){
    if(id.startsWith("F`")){
        updateFunction(id,name,pageId,showType);
    }else{
        var inputedit = getItemByIdForPage(id,pageId);
        var numAndName = name.split("-!-");
        name = formateNameAndNum(false,numAndName[0],numAndName[1],showType);
        inputedit.setAttribute("value",name);
        inputedit.setAttribute("number",numAndName[0]);
        inputedit.setAttribute("name",numAndName[1]);
        var nameLength = getTextLength(name);
        inputedit.style.cssText = 'width:'+(nameLength)*7+'px;';
    }
}

var getItemByIdForPage = function (id,pageId) {
    var container = getFormulaContainer(pageId);
    return getItemOnChild(container,id);
}

var getItemOnChild = function (item,id) {
    var childNodes = item.childNodes;
    var nodeId = item.id;
    var result;
    if(id == nodeId){
        return item;
    }
    for(var i=0;i<childNodes.length;i++){
        var node = childNodes[i];
        result = getItemOnChild(node,id);
        if(result != null){
            return result;
        }
    }
    return null;
}

var updateFunction = function(id,name,pageId,showType){

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
    var newNodes = createFuncOrFormulaMemb(id,name,showType);
    addNewNode(newNodes,pageId);
}

var getElementOfFunction = function(functionKey,pageId){


}

//清除所有的行，在新建一行
var clearAllRule = function (pageId,data,model) {
     var formulaContainer = getFormulaContainer(pageId);
     formulaContainer.innerHTML = "";
     var newRowId = data.ruleRowId;
     addRuleRow(pageId,newRowId,model);
}

//处理刷新功能
var dealrebuildCommand = function(data,model){
    var pageId = model.pageId.substring(18,model.pageId.length);
    var ruleList = JSON.parse(data.allData);
    var focusRowId = data.focusRowId;
    var showType = data.showType;
    var editBoxItem;
    var rowItem,focusRowItem = null;
    var tempData;
    var status;
    for(var i = 0;i<ruleList.length;i++){
        var ruleRowId = ruleList[i].rowId;
        rowItem = addRuleRow(pageId,ruleRowId,model);
        if(focusRowId == ruleRowId){
            focusRowItem = rowItem;
        }
        //重建范围
        editBoxItem = rowItem.getElementsByClassName("rangeEditor")[0];
        tempData = ruleList[i].rangeDimMembInfo;
        buildDimRangeData(editBoxItem,tempData,showType);
        //重建公式
        editBoxItem = rowItem.getElementsByClassName("formulaEdit")[0];
        tempData = ruleList[i].formulaInfo;
        while(tempData.length>0){
            tempData = buildFormulaData(editBoxItem,tempData,showType);
        }
        //重建注释
        tempData = ruleList[i].description;
        buildFormulaDescription(editBoxItem,tempData);
        //设置状态
        status = ruleList[i].useable;
        if(status){
            setUseable(rowItem,ruleRowId,true,pageId);
        }
        var executerangeSelectElement = rowItem.getElementsByClassName("executerange_select")[0];
        setSelectChecked(executerangeSelectElement, ruleList[i].executerangeString);
    }
    if(checkItemNotNull(focusRowItem)){
        setFocusRow(focusRowItem);
        focusRowItem.scrollIntoView();
    }
}

var setSelectChecked = function (selectElement, checkValue){
    if(!selectElement || !checkValue){
        return;
    }
    for (var i = 0; i < selectElement.options.length; i++){
        if (selectElement.options[i].value == checkValue){
            selectElement.options[i].selected = true;
            break;
        }
    }
}

var changeShowType = function (showType,pageId) {
    var editor = getFormulaContainer(pageId);
    var rangeEditItems = editor.getElementsByClassName("rangeEditor");
    for(var i=0;i<rangeEditItems.length;i++){
        changeValByShowType(rangeEditItems[i],showType);
    }
    var formulaEditItems = editor.getElementsByClassName("formulaEdit");
    for(var i=0;i<formulaEditItems.length;i++){
        changeValByShowType(formulaEditItems[i],showType);
    }
}

var changeValByShowType = function (item,showType) {
    var childNodes = item.childNodes;
    var name,number;
    for(var i=0;i<childNodes.length;i++){
        var nodeType = childNodes[i].nodeName;
        if(nodeType == "INPUT"){
            var id = childNodes[i].getAttribute("id");
            if(id!=null&&id.startsWith("F`")){
                var allText = childNodes[i].getAttribute("allText");
                if(allText != null){
                    var params = JSON.parse(allText);
                    var newText = getNotCutFunctionText(params,showType);
                    childNodes[i].setAttribute("value",newText);
                    var textLength = getTextLength(newText);
                    childNodes[i].style.cssText = 'width:'+textLength+'px;';
                }
            }else{
                name = childNodes[i].getAttribute("name");
                number = childNodes[i].getAttribute("number");
                var className = childNodes[i].getAttribute("class");
                var newText = formateNameAndNum("rangDimMembInput" == className,number,name,showType);
                childNodes[i].setAttribute("value",newText);
                var textLength = getTextLength(newText);
                childNodes[i].style.cssText = 'width:'+textLength+'px;';
            }
        }
    }
}

var buildDimRangeData = function (editorElement,data,showType) {
	if(data == "")return;
    var rangInfo = JSON.parse(data);
    for(var dimCount = 0;dimCount<rangInfo.length;dimCount++){
        var dimInfo = rangInfo[dimCount];
        var dimNum = dimInfo.dimNum;
        var dimNam = dimInfo.dimName;
        var membParams = dimInfo.membParams;
        var dimNode = createRangeDimNode(dimNum,dimNam,formateNameAndNum(false,dimNum,dimNam,showType));
        editorElement.appendChild(dimNode);
        editorElement.appendChild(createNode("{","text"),null)
        for(var membCount = 0;membCount<membParams.length;membCount++){
            var memb = membParams[membCount];
            var nodeType = memb.type;
            var membNode = createRangeDimMembNode(memb.number,memb.name,formateNameAndNum(nodeType == 'member',memb.number,memb.name,showType),nodeType);
            editorElement.appendChild(membNode);
            if(membCount<membParams.length-1){
                editorElement.appendChild(createNode(",","text"),null)
            }else{
                editorElement.appendChild(createNode("}","text"),null)
            }
        }
        if(dimCount<rangInfo.length-1){  //加逗号
            editorElement.appendChild(createNode(",","text"),null)
        }
    }
}


var buildFormulaDescription = function (editorElement, data) {
    if(data != null){
        //先加两个换行
        editorElement.appendChild(createBrNode(true));
        editorElement.appendChild(createBrNode(true));
        var descrips = data.split("//");
        for(var i = 0;i<descrips.length;i++){
            if(descrips[i].length>0){
                editorElement.appendChild(createNode("//"+descrips[i],"text",null));
                editorElement.appendChild(createBrNode(false));
            }
        }
    }
}

var buildFormulaData = function(editorElement,data,showType){
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
        var membNode = createInputNode(tempList[0],tempList[1],showType);
        editorElement.appendChild(membNode);
        data = data.substring(data.indexOf('}')+1,data.length);
    }
    return data;
}

var hideMembMatchPanel = function(panel){
    panel.style.display = "none";
}

var setEditorInstance = function(model){
    console.log("setEditorInstance begin")
    var editorId = 'inputarea'+model.pageId.substring(18,model.pageId.length);
    if( typeof formulaEditorInstance =='undefined'){
        formulaEditorInstance = new Map();
    }
    var editorObj = new Object();
    editorObj.editor = null;
    editorObj.model = model;
    editorObj.range = null;
    editorObj.matchMemberInfo = null;   //空格匹配上的信息
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


var setFocusRow = function (item) {
    var isFocusRow = item.getAttribute("isFocusRow");
    if(isFocusRow == 'true') return;
    item.setAttribute("isFocusRow",true);
    item.style.border = '2px solid #0E5FD8';
    var brothers = item.parentNode.childNodes;
    for(var i = 0;i<brothers.length;i++){
        isFocusRow = brothers[i].getAttribute("isFocusRow");
        if(isFocusRow== 'true'&&item != brothers[i]){
            brothers[i].setAttribute("isFocusRow",false);
            brothers[i].style.border = '1px solid gray';
        }
    }
    var pageId = getRowIdOrPageIdForItem(item,false);
    var instance = getEditorInstance(pageId);
    instance.currentRowId = item.getAttribute("id");
    var editBox = item.getElementsByClassName("formulaEdit")[0];
    if(instance.editor != editBox){
        instance.editor = editBox;
        instance.range = null;
    }
}


var updateRowAfterDel = function(editorBox,deledRowSeq){
    var rowRows = editorBox.childNodes;
    if(deledRowSeq>=rowRows.length){
        deledRowSeq = rowRows.length-1;
    }
    for(var i = 0;i<rowRows.length;i++){
        rowRows[i].childNodes[0].innerText = i+1;
        if(deledRowSeq == i){
            setFocusRow(rowRows[i]);
        }
    }
}

var delRuleRow = function (pageId) {
    var editorBox = getFormulaContainer(pageId);
    var ruleRows = editorBox.childNodes;
    var currentRow = null;
    var rowSeq = -1;
    for(var i = 0;i<ruleRows.length;i++){
        var isFocusRow = ruleRows[i].getAttribute("isFocusRow");
        if(isFocusRow == 'true'){
            currentRow = ruleRows[i];
            rowSeq = i;
            break;
        }
    }
    if(currentRow != null && ruleRows.length>1){
        editorBox.removeChild(currentRow);
        updateRowAfterDel(editorBox,rowSeq);
    }
}
var selectRowEditorEnd = function (editor) {
    var pageId = getRowIdOrPageIdForItem(editor,false);
    var instance = getEditorInstance(pageId);
    var childs = editor.childNodes;
    for(var i = childs.length;i>=0;i--){
        var nodeType = childs[i];

    }
}

var setFocusOnFormulaEditBox = function (pageId) {
    var instance = getEditorInstance(pageId);
    var editor = instance.editor;
    if(editor != null){
        var editBoxType = editor.getAttribute("editBoxType");
        if(editBoxType == "range"){
            var rowId = instance.currentRowId;
            var rowItem = getItemByIdForPage(rowId,pageId);
            var formulaEditBox = rowItem.getElementsByClassName("formulaEdit")[0];
            instance.editor = formulaEditBox;
            instance.range = null;
        }
    }
}

var getDimNumForFocusNode = function (node, childNodes) {
    var dimNum = null;
    var findNode = false;
    for(var i = childNodes.length -1;i>=0;i--){
        if(!findNode&&childNodes[i] == node){
            findNode = true;
        }else if(findNode&&childNodes[i].nodeName == 'INPUT' && childNodes[i].getAttribute("class")=='rangDimInput'){
            dimNum = childNodes[i].getAttribute("number");
            break;
        }
    }
    return dimNum;
}

var getFormulaContainer = function (pageId) {
    var item = document.getElementById("formulaeditor"+pageId);
    return item;
}

var rowSwitchClick = function (switchItem) {
    var rowId = getRowIdOrPageIdForItem(switchItem,true);
    var currentVal = switchItem.getAttribute("data");
    if(currentVal == "true"){
        var pageId = getRowIdOrPageIdForItem(switchItem,false);
        setUseable(null,rowId,false,pageId);
    }else{
        var boxItem = switchItem.childNodes[0];
        var pageId = getRowIdOrPageIdForItem(boxItem,false);
        var instance = getEditorInstance(pageId);
        instance.model.invoke("rowSwitchClick",rowId);
    }
}

var setUseable = function (rowItem,rowId,val,pageId) {
    if(rowItem == null){
        rowItem = getItemByIdForPage(rowId,pageId);
    }
    var switchItem = rowItem.getElementsByClassName("switchBox")[0];
    var switchBallItem = switchItem.getElementsByTagName("span")[0];
    if(val){
        switchBallItem.style['margin-left'] = "15px";
        switchItem.setAttribute("data",val);
        switchItem.style['background-color'] = "#5582f3";
    }else{
        switchBallItem.style['margin-left'] = "0px";
        switchItem.setAttribute("data",val);
        switchItem.style['background-color'] = "#c6c6c6";
    }
}

var updateAllRuleStatus = function (pageId, useable) {
    var container = getFormulaContainer(pageId);
    var ruleRows = container.childNodes;
    for(var i=0;i<ruleRows.length;i++){
        setUseable(ruleRows[i],null,useable,pageId);
    }
}

var getFocusRowId = function (pageId) {
    var container = getFormulaContainer(pageId);
    var rows = container.childNodes;
    var currentRowId = null;
    for(var i=0;i<rows.length;i++){
        var isFocusRow = rows[i].getAttribute("isFocusRow");
        if(isFocusRow == "true"){
            currentRowId = rows[i].getAttribute("id");
        }
    }
    return currentRowId;
}