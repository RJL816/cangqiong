(function (KDApi, $) {
  // 构造函数
  function MyComponent (model) {
    this._setModel(model)
  }

  MyComponent.prototype = {
    // 绑定model
    _setModel: function (model) {
      this.model = model
    },
    // 生命周期：初始化
    init: function (props) {
      setHtml(this.model, props)
    },
	// 生命周期：更新
    update: function (props) {
		if (this.model.dom.ue && this.model.dom.ue.body){
			//编辑器已经准备好了，直接更新数据
			updateHtml(this.model, props)
		}else{
			//编辑器还没有准备好，先记录下状态和数据
			this.model.dom.formulaState = 1
			this.model.dom.formulaData = props
		}
      
    },
    // 生命周期：销毁
    destoryed: function () {
		if (this.model.dom.ue){
			this.model.dom.ue.destroy()
		}
		
    }

  }
  
  //初始化编辑器
  var setHtml = function (model, props, isUpdate) {
	var editName = 'cvteditor'+model.pageId.substring(18,model.pageId.length);
    var template = '<div>'+
				   '<script id="'+editName+'" type="text/plain" style="width:100%;height:102px;"></script>' +
				   '</div>'
    var result = KDApi.template(template, {text:''})
    model.dom.innerHTML = result 
	KDApi.loadFile("cvtformulaeditor.min.js", model, function(){
		model.dom.ue = UE_CVT.getEditor(editName,{allowDivTransToP: false},model);
		//在dom结构完全准备好后才执行
		model.dom.ue.ready(function(){
			//如果状态为1，表明之前因为编辑器还没准备好就已经接收了更新数据命令，此时需要将数据更新
			if (model.dom.formulaState === 1){
				updateHtml(model,model.dom.formulaData)
				model.dom.formulaState = 0
			}	
		});
		
	})  
  }

  //修改编辑内容--包含新增
  var updateHtml = function (model, props) {
	var operate = props.data.operate;
	var data = props.data.data;
	if ('1'==props.data.ishide){
		$("[title]",".edui-toolbar").each(function(e){
			if ('abs'===$(this).attr('title') || 'if'===$(this).attr('title')|| 'and'===$(this).attr('title')|| 'or'===$(this).attr('title')|| 'round'===$(this).attr('title')){
				$(this).css('display','none');
				$(this).parent().css('display','none');
				$(this).parent().parent().css('display','none');
			}
		});	
	}else if(null != props.data.ishide && props.data.ishide.length>0){
		var titles = props.data.ishide.split(',');
		titles.forEach(function(title,index,arr){
			$("[title]",".edui-toolbar").each(function(e){
				if (title===$(this).attr('title')){
					$(this).css('display','none');
					$(this).parent().css('display','none');
					$(this).parent().parent().css('display','none');
				}
			});
		})
	}
    if ('getText'==operate){
		//获取编辑器里的内容，供后台调用	
		var formula = model.dom.ue.getEditorContent().trim();
		model.invoke('getText', formula);
	}else if ('updateText'==operate){
		//更新编辑器里的内容，在已保存信息、修改等时候调用
		if (model.dom.ue.body){
			dealUpdateCommand(data,model);			
		}else{
			setTimeout(dealUpdateCommand(data,model),1000);
		}
		
	}else if ('addText'==operate){
		//新增，用于点击f(x)按钮、表格双击单元格
		var addKeyText = data.replace(/"/g,'').replace('{','').replace('}','').split(','); 
		var textLength = (addKeyText[1].length+1)*12;
		var newItem ='&nbsp;<input type="text" id="'+addKeyText[0]+'" class="cvtformulasettingtext" value="'+addKeyText[1]+'"  onfocus="this.blur()" style="width:'+textLength+'px;"/>&nbsp;'
		if(addKeyText.length == 3 && addKeyText[0].startsWith('dvbformulacb')){
			textLength = textLength + (addKeyText[2].length)*12;
			newItem ='&nbsp;<input type="text" id="'+addKeyText[0]+'" class="cvtformulasettingtext" value="'+addKeyText[1]+','+addKeyText[2]+'"  onfocus="this.blur()" style="width:'+textLength+'px;"/>&nbsp;'
		}
		model.dom.ue.execCommand('inserthtml',newItem,true);
		//绑定事件
		$("input",model.dom.ue.body).unbind('click').bind('click',function(){
			model.invoke('f(x)', $(this).attr('id'));	
		});
	}else if('addTextNoEdit'==operate){
		//新增，用于点击f(x)按钮、表格双击单元格
		var addKeyText = data.replace(/"/g,'').replace('{','').replace('}','').split(','); 
		var textLength = (addKeyText[1].length+1)*12;
		var newItem ='&nbsp;<input type="text" id="'+addKeyText[0]+'" class="cvtformulasettingtext" value="'+addKeyText[1]+'"  onfocus="this.blur()" style="width:'+textLength+'px;background:none"/>&nbsp;'
		if(addKeyText.length == 3 && addKeyText[0].startsWith('dvbformulacb')){
			textLength = textLength + (addKeyText[2].length)*12;
			newItem ='&nbsp;<input type="text" id="'+addKeyText[0]+'" class="cvtformulasettingtext" value="'+addKeyText[1]+','+addKeyText[2]+'"  onfocus="this.blur()" style="width:'+textLength+'px;background:none"/>&nbsp;'
		}
		model.dom.ue.execCommand('inserthtml',newItem,true);
		//绑定事件
		$("input",model.dom.ue.body).unbind('click').bind('click',function(){
			model.invoke('f(x)', $(this).attr('id'));	
		});
	}
  }
  
  var dealUpdateCommand = function(data,model){
		//1、先清空所有内容
		var pNode = model.dom.ue.body.childNodes;
		for (var j = pNode.length-1;j>=0;j--){
			var childList = pNode[j].childNodes;
			for (var i = childList.length-1;i>=0;i--){
				pNode[j].removeChild(childList[i]);
			}
		}
		//2、插入空字符，避免格式混乱
		model.dom.ue.execCommand('inserthtml','&nbsp;',true);
		//3、解析内容，转换成显示的格式
		//var dataList = data.split(';');
		//for(var k =0;k<dataList.length;k++){
			var tempData = data;
			while(tempData.length>0){
				tempData = buildUpdateData(model,tempData);
			}
		//}
		
		//4、清除多余的空行
		var newChild = model.dom.ue.body.childNodes;
		for(var i=newChild.length-1;i>=0;i--){
			if ('#text'==newChild[i].nodeName){
				model.dom.ue.body.removeChild(newChild[i]);
			}
		}
		//5、绑定点击事件
		$("input",model.dom.ue.body).unbind('click').bind('click',function(){
			model.invoke('f(x)', $(this).attr('id'));	
		});  
  }
  
  //将后台传递过来要更新的数据进行转换，用来显示在页面上
  var buildUpdateData = function(model,data){
	var beginPosition = data.indexOf('{');
	if (beginPosition>0){
		//大于0表示第一个不是键值，是文本；
		var tempData = data.substring(0,beginPosition)+'&nbsp;';
		model.dom.ue.execCommand('inserthtml',tempData,true);
		data = data.substring(beginPosition,data.length);
	}else if (beginPosition ===-1){
		//等于-1表明剩下的全是文本
		model.dom.ue.execCommand('inserthtml',data+'&nbsp;',true);
		data ='';
	}else{
		var tempStr = data.substring(beginPosition+1,data.indexOf('}')).replace(/"/g,'');
		var tempList = tempStr.split(',');
		var textLength = (tempList[1].length+1)*12;
		var buildStr;
		if(tempList[0].startsWith('cvtformulacb'))	{
			buildStr = '<input type="text" id="'+tempList[0]+'" class="cvtformulasettingtext" value="'+tempList[1]+'"  onfocus="this.blur()"  style="width:'+textLength+'px;background:none"/>'
		}else if(tempList.length == 3 && tempList[0].startsWith('dvbformulacb')){
			textLength = textLength + (tempList[2].length)*12;
			buildStr = '&nbsp;<input type="text" id="'+tempList[0]+'" class="cvtformulasettingtext" value="'+tempList[1]+','+tempList[2]+'"  onfocus="this.blur()"  style="width:'+textLength+'px;"/>&nbsp;'
		}else{
			buildStr = '&nbsp;<input type="text" id="'+tempList[0]+'" class="cvtformulasettingtext" value="'+tempList[1]+'"  onfocus="this.blur()"  style="width:'+textLength+'px;"/>&nbsp;'
		}
		model.dom.ue.execCommand('inserthtml',buildStr,true);
		data = data.substring(data.indexOf('}')+1,data.length);
	}
	return data;
  }

  
  // 注册自定义控件
  KDApi.register('cvtformulasettingtext', MyComponent)
})(window.KDApi, jQuery)
