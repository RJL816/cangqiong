var itemClick =  function (element){
	var val = element.textContent;
	var editorInstance = getEditorInstance(element.getAttribute("name"));
	var spanshow5 = KDApi.getLangMsg(editorInstance.model,'spanshow5');
	var spanshow6 = KDApi.getLangMsg(editorInstance.model,'spanshow6');
   if(val==spanshow5){
		editorInstance.model.invoke('isTemplate','');
   }else if(val==spanshow6){
   		editorInstance.model.invoke('isDim','');
   }else if(val=='f(x)'){
   		editorInstance.model.invoke('f(x)','');
		//newModel.invoke('f(x)','');
//		showAddNewForm('',element.getAttribute("name"));
   }else if(val=='IF'){
        var newNode = document.createTextNode('IF(,,)');
        var pageId = element.getAttribute("name");
        getEditorInstance(pageId).range = null;
        addNewNode(newNode,element.getAttribute("name"));
   }else if(val=='AND'){
        var newNode = document.createTextNode('AND(,)');
        var pageId = element.getAttribute("name");
        getEditorInstance(pageId).range = null;
        addNewNode(newNode,element.getAttribute("name"));
   }else if(val=='OR'){
        var newNode = document.createTextNode('OR(,)');
        var pageId = element.getAttribute("name");
        getEditorInstance(pageId).range = null;
        addNewNode(newNode,element.getAttribute("name"));
   }else if(val=='@NOTNULL'){
        var newNode = document.createTextNode('@NOTNULL()');
        var pageId = element.getAttribute("name");
        getEditorInstance(pageId).range = null;
        addNewNode(newNode,element.getAttribute("name"));
   }else{
    var newNode = document.createTextNode(val);
    var pageId = element.getAttribute("name");
    getEditorInstance(pageId).range = null;
    addNewNode(newNode,element.getAttribute("name"));
   }
}


var showAddNewForm = function(member,pageId){
	
	var preKey = '';
	var currentKey = '';
    var editorInstance ;
	if(member!=null&&member!=''){   //编辑成员
	    var editor = member.parentNode;
		currentKey = member.id;
		editorInstance = getEditorInstance(editor.id.replace("inputarea",''));
	    preKey = getPreMembKey(member,editor.childNodes,currentKey);
		$('.membinput').css("background-color","");
        $('#'+currentKey).css("background-color","#e5e5e5");
	}else{    //新增成员
	   	editorInstance = getEditorInstance(pageId);
		var editor = editorInstance.editor;
		if(editor==document.activeElement){
			var editorRange = window.getSelection().getRangeAt(0);
			editorInstance.range = editorRange;
		    var endNode = editorRange.endContainer;
		    if(endNode==editor&&editorRange.endOffset>0){  
			    endNode = editor.childNodes[editorRange.endOffset-1];
			}
	        if(endNode!=editor){    //这里不用else，是因为在上一个if中会改变他的值，这里需要处理
			    preKey = getPreMembKey(endNode,editor.childNodes,'');
			}
	   }
		else{
			editorInstance.range = null;
			if(editor.childNodes.length>0){
			   preKey = getPreMembKey(editor.childNodes[editor.childNodes.length-1],editor.childNodes,'');
			}
		}
	}
   var member = new Object();
   member.preKey = preKey;
   member.currentKey = currentKey;
   editorInstance.model.invoke('membEdit',member);
}



var getPreMembKey = function(endNode,childNodes,currentKey){
   var preKey = '';
   var findPosition = false;
       for(var i=childNodes.length-1;i>-1;i--){
       	   if(findPosition){
                if(childNodes[i].nodeName=="INPUT"&&childNodes[i].id!=currentKey){
                   preKey = childNodes[i].id;
                   break;
                }
       	    }else{
       	   	   if(childNodes[i]==endNode){
       	   	       findPosition = true;
       	   	       i++;  //回退一下
       	        }
       	    }
       }
	 return preKey;
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
        	}
			editorInstance.range = editorRange;
			editorRange.insertNode(newNode);
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
    var newInputNode = document.createElement('span');
    newInputNode.setAttribute("contenteditable","false") ;
    newInputNode.setAttribute("type","text") ;
    newInputNode.setAttribute("class", "membinput") ;
	newInputNode.setAttribute("readonly", "readonly") ;
	newInputNode.innerHTML=name;
　　 newInputNode.setAttribute("value", name) ;
    newInputNode.setAttribute("id", id) ;
	newInputNode.setAttribute("onclick", "membClick(this)") ;
	newInputNode.setAttribute("onmousedown","return false;");
	newInputNode
	/*newInputNode.style.cssText = 'width:'+(name.length+1)*13+'px;';*/
    return newInputNode;
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
	   }else if(nodeName=='SPAN'){
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

//更新成员信息
var updataText = function (id,name){
   var inputedit = document.getElementById(id);
   inputedit.innerHTML = name;
   inputedit.value  = name;
  /* inputedit.style.cssText = 'width:'+(name.length+1)*13+'px;';*/
 /*  var childNodes = inputedit.childNodes;
   name = name;
   for(var i=0;i<childNodes.length;i++){
	   if(childNodes[i].nodeName=='INPUT'&&childNodes[i].id==id){
		   childNodes[i].value  = name;
		   childNodes[i].style.cssText = 'width:'+(name.length+1)*13+'px;';
		   break;
	   }
   }   */
}

//处理刷新功能
   var dealrebuildCommand = function(data,model){
		//1、先清空所有内容
		var pageId = model.pageId.substring(18,model.pageId.length);
        var editorElement = getEditorInstance(pageId).editor;
		if((typeof editorElement =='undefined')||editorElement == null){
			console.log("editorElement is null")
			return;
		}
		editorElement.innerHTML = '';
		//2、插入空字符，避免格式混乱
     	//	model.dom.ue.execCommand('inserthtml','&nbsp;',true);
		//3、解析内容，转换成显示的格式
		//var dataList = data.split(';');
		//for(var k =0;k<dataList.length;k++){
		var childs = editorElement.childNodes;
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
		var tempList = tempStr.split(',');
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
  
  
  
  
  