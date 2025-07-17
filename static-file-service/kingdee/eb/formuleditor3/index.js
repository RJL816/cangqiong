(function (KDApi, $) {
  // 构造函数
  function MyComponent (model) {
    this._setModel(model)
  }

  var editor // 顶层变量声明
  var isUpdate = false
  MyComponent.prototype = {
    // 绑定model
    _setModel: function (model) {
      this.model = model
//	  newModel = model
    },
    // 生命周期：初始化
    init: function (props) {
	  console.log("setHtml begin-into")
      setHtml(this.model, props)
	  console.log("setHtml begin-back")
    },
	// 生命周期：更新
    update: function (props) {
		updateHtml(this.model,props);
    },
    // 生命周期：销毁
    destoryed: function () {
		var pageId = this.model.pageId.substring(18,this.model.pageId.length);
		deleteEditorInstance(pageId);
    }

  }

  //初始化编辑器
  var setHtml = function (model, props, isUpdate) {
	console.log("setHtml begin")
	editorRange = null;  //定义
    var cssHref = KDApi.getNameSpace(model) + './scheme.css'
	model.isInit = true;
	var pageId = model.pageId.substring(18,model.pageId.length);
    var template = '<div id = "formulaeditor" class="'+'formula'+pageId+'">'
    +'<div id = "toolbar" class="'+'toolbar'+pageId+'" unselectable="on" onmousedown="return false;">'
     +  '<span class="ebexaminebox"> '
         +  '  <div> '
		     +  ' <span class="ebexamineitemtitle">'+KDApi.getLangMsg(model,'spanshow4')+'</span>'
           //   +  '<span class="ebexamineitem" name = "'+pageId+'" onclick ="itemClick(this)">f(x)</span>'
			   +  '<span class="ebexamineitem" name = "'+pageId+'" onclick ="itemClick(this)">'+KDApi.getLangMsg(model,'spanshow5')+'</span>'
         +  '</div>'
       +  '</span>'
//       +'<span class="ebexaminebox" >'
//		 +  '  <div> '
//		  //   +  ' <span class="ebexamineitemtitle">'+KDApi.getLangMsg(model,'spanshow1')+'</span>'
//           //   +  '<span class="ebexamineitem" name = "'+pageId+'" onclick ="itemClick(this)">f(x)</span>'
//			   +  '<span class="ebexamineitem" name = "'+pageId+'" onclick ="itemClick(this)">'+KDApi.getLangMsg(model,'spanshow6')+'</span>'
//         +  '</div>'
//   //    +  '</span><span class="ebexaminebox" >'
//        //    +'<div>'
//       //        +'<span class="ebexamineitemtitle"><font color="black">'+KDApi.getLangMsg(model,'spanshow4')+' </font></span>'
//      //      +'</div>'
//       +  '</span>'
       +'<span class="ebexaminebox" >'
           +'<div>'
		      +'<span class="ebexamineitemtitle">'+KDApi.getLangMsg(model,'spanshow2')+'</span>'
              +'<span class="ebexamineitem" name = "'+pageId+'" onclick ="itemClick(this)">+</span>'
              +'<span class="ebexamineitem" name = "'+pageId+'" onclick ="itemClick(this)">-</span>'
              +'<span class="ebexamineitem" name = "'+pageId+'" onclick ="itemClick(this)">*</span>'
              +'<span class="ebexamineitem" name = "'+pageId+'"  onclick ="itemClick(this)">/</span>'
			  +'<span class="ebexamineitem" name = "'+pageId+'"  onclick ="itemClick(this)">(</span>'
			  +'<span class="ebexamineitem" name = "'+pageId+'"  onclick ="itemClick(this)">)</span>'
           +'</div>'
       +'</span><span class="ebexaminebox">'
           +'<div>'
		       +'<span class="ebexamineitemtitle">'+KDApi.getLangMsg(model,'spanshow3')+'</span>'
               +'<span class="ebexamineitem" name = "'+pageId+'"  onclick ="itemClick(this)">IF</span>'
               +'<span class="ebexamineitem" name = "'+pageId+'"  onclick ="itemClick(this)">AND</span>'
               +'<span class="ebexamineitem" name = "'+pageId+'"  onclick ="itemClick(this)">OR</span>'
               +'<span class="ebexamineitem" name = "'+pageId+'"  onclick ="itemClick(this)"><</span>'
               +'<span class="ebexamineitem" name = "'+pageId+'"  onclick ="itemClick(this)">></span>'
               +'<span class="ebexamineitem" name = "'+pageId+'"  onclick ="itemClick(this)">=</span>'
               +'<span class="ebexamineitem" name = "'+pageId+'"  onclick ="itemClick(this)">>=</span>'
               +'<span class="ebexamineitem" name = "'+pageId+'"  onclick ="itemClick(this)"><=</span>'
               +'<span class="ebexamineitem" name = "'+pageId+'"  onclick ="itemClick(this)"><></span>'
               +'<span class="ebexamineitem" name = "'+pageId+'"  onclick ="itemClick(this)">@NOTNULL</span>'
           +'</div>'
       +'</span>'
   +'</div>'
   +'<div id = "inputarea'+pageId+'" class = "exexamineinputarea" contenteditable="true" onblur = "saveEditorRange(this)"  onpaste = "return false;">'
   +'</div>'
 +'</div>';
    model.dom.innerHTML = template
	console.log("setHtml end")

	if ($('link[href="' + cssHref + '"]').length === 0) {
      // 加载css文件
      KDApi.loadFile('./scheme.css', model, function () {
         //updateHtml(model, props)
		  console.log("cssField Ok")
      })
    }
	  KDApi.loadFile('./javascript.js', model, function () {
         //updateHtml(model, props)
		 console.log("jsField Ok")
		 setEditorInstance(model);
		 model.isInit = false;
		 updateHtml(model, props);
      })
	}

   //修改编辑内容--包含新增
  var updateHtml = function (model, props) {
	if(model.isInit==true)return;
	var pageId = model.pageId.substring(18,model.pageId.length);
	var operate = props.data.operate;
	console.log("updateHtml begin"+operate);
	var data = props.data.data;
    if ('getText'==operate){
        var formulaStr = getEditorTextWithMark(pageId);
		model.invoke('getText', formulaStr);
	}else if ('updateText'==operate){
		//更新编辑器里的内容，在已保存信息、修改等时候调用
        var addKeyText = data.replace(/"/g,'').replace('{','').replace('}','').split(',');
		//循环addKeyText处理
		for (var i = 0; i*2+1 < addKeyText.length; i++) {
			updataText(addKeyText[i*2],addKeyText[i*2+1]);
		}
	}else if ('addText'==operate){
		//新增，用于点击f(x)按钮、表格双击单元格
		var addKeyText = data.replace(/"/g,'').replace('{','').replace('}','').split(',');
		var newInputNode = createInputNode(addKeyText[0],addKeyText[1]);
		addNewNode(newInputNode,pageId);
		//绑定事件
	}else if('getNewText'==operate){
	    //保存前返回当前串
		var formula = getEditorText(pageId);
		model.invoke('getNewText', formula);
	}else if('refreshCache'==operate){
		//缺少一个刷新后台缓存对应的方法
		var formula = getEditorText(pageId);
		model.invoke('refreshCache', formula);
	}  else if('rebuildText'==operate){
	    //重新加载
	    var isView = props.data.isView;
	    if('true'==isView){
	        $(".formula"+pageId).css("opacity","0.6");
            $(".toolbar"+pageId).css("pointer-events","none");
	    }
		console.log("rebuildText begin");
		dealrebuildCommand(data,model);
		console.log("rebuildText end");
		
	    //dealrebuildCommand(data,model);		
	}
	console.log("updateHtml end"+operate);
  }

  // 注册自定义控件
  KDApi.register('formuleditor3', MyComponent,{isMulLang:true})
})(window.KDApi, jQuery)
