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
      console.log('-----init', this.model, props)
      
      setHtml(this.model, props)
    },
    // 生命周期：更新
    update: function (props) {
      console.log('-----update', this.model, props)
     
      //updateHtml(this.model, props)
	  setHtml(this.model, props)
    },
    // 生命周期：销毁
    destoryed: function () {
      console.log('-----destoryed', this.model)
    }

  }
  
  var setHtml = function (model, props, isUpdate) {
	var popsData=props.data; 
	if(popsData){
		var type=popsData['type'];
		var pageid=popsData['pageid'];
		var addrule=popsData['addrule'];
		var addprivaterule=popsData['addprivaterule'];
		var addpublicrule=popsData['addpublicrule'];
		  KDApi.getTemplateStringByFilePath('./html/addrule.html', model.schemaId, {
			type: type,
			pageid: pageid,
			addrule: addrule,
			addprivaterule: addprivaterule,
			addpublicrule: addpublicrule
		  }).then(
			result => {
			  if (model.dom.innerHTML === "" || isUpdate) {
				model.dom.innerHTML = result;
				updateHtml(model, props);
			  }
			}
		  )
	}
  }

  var updateHtml = function (model, props) {
   
	var popsData=props.data; 
	var template=popsData['template'];
	var pageid=popsData['pageid'];
    //model.dom.innerHTML = template
    // 绑定DOM操作事件
    initEvent(model, props)
	
	$("#" + pageid + "rolloutflexpanelap72").mouseenter(function(){
			console.log('-----rolloutflexpanelap72');
			$("#" + pageid + "rolloutflexpanelap72").hide();
			$("#" + pageid + "rolloutflexpanelap711").show();
		})
		
	$("#" + pageid + "rolloutflexpanelap711").mouseleave(function(){
			console.log('-----rolloutflexpanelap711');
			$("#" + pageid + "rolloutflexpanelap72").show();
			$("#" + pageid + "rolloutflexpanelap711").hide();
		})
	
	$("#" + pageid + "incomeflexpanelap72").mouseenter(function(){
			console.log('-----incomeflexpanelap72');
			$("#" + pageid + "incomeflexpanelap72").hide();
			$("#" + pageid + "incomeflexpanelap711").show();
		})
		
	$("#" + pageid + "incomeflexpanelap711").mouseleave(function(){
			console.log('-----incomeflexpanelap711');
			$("#" + pageid + "incomeflexpanelap72").show();
			$("#" + pageid + "incomeflexpanelap711").hide();
		})
	
	$("#" + pageid + "periodflexpanelap72").mouseenter(function(){
			console.log('-----periodflexpanelap72');
			$("#" + pageid + "periodflexpanelap72").hide();
			$("#" + pageid + "periodflexpanelap711").show();
		})
		
	$("#" + pageid + "periodflexpanelap711").mouseleave(function(){
			console.log('-----periodflexpanelap711');
			$("#" + pageid + "periodflexpanelap72").show();
			$("#" + pageid + "periodflexpanelap711").hide();
		})
	
	$("#" + pageid + "ajustflexpanelap72").mouseenter(function(){
			console.log('-----ajustflexpanelap72');
			$("#" + pageid + "ajustflexpanelap72").hide();
			$("#" + pageid + "ajustflexpanelap711").show();
		})
		
	$("#" + pageid + "ajustflexpanelap711").mouseleave(function(){
			console.log('-----ajustflexpanelap711');
			$("#" + pageid + "ajustflexpanelap72").show();
			$("#" + pageid + "ajustflexpanelap711").hide();
		})
		
	$("#" + pageid + "dsaleflexpanelap72").mouseenter(function(){
			console.log('-----dsaleflexpanelap72');
			$("#" + pageid + "dsaleflexpanelap72").hide();
			$("#" + pageid + "dsaleflexpanelap711").show();
		})
		
	$("#" + pageid + "dsaleflexpanelap711").mouseleave(function(){
			console.log('-----dsaleflexpanelap711');
			$("#" + pageid + "dsaleflexpanelap72").show();
			$("#" + pageid + "dsaleflexpanelap711").hide();
		})
		
	$("#" + pageid + "zcajustflexpanelap72").mouseenter(function(){
			console.log('-----zcajustflexpanelap72');
			$("#" + pageid + "zcajustflexpanelap72").hide();
			$("#" + pageid + "zcajustflexpanelap711").show();
		})
		
	$("#" + pageid + "zcajustflexpanelap711").mouseleave(function(){
			console.log('-----zcajustflexpanelap711');
			$("#" + pageid + "zcajustflexpanelap72").show();
			$("#" + pageid + "zcajustflexpanelap711").hide();
		})
		
	$("#" + pageid + "srajustflexpanelap72").mouseenter(function(){
			console.log('-----srajustflexpanelap72');
			$("#" + pageid + "srajustflexpanelap72").hide();
			$("#" + pageid + "srajustflexpanelap711").show();
		})
		
	$("#" + pageid + "srajustflexpanelap711").mouseleave(function(){
			console.log('-----srajustflexpanelap711');
			$("#" + pageid + "srajustflexpanelap72").show();
			$("#" + pageid + "srajustflexpanelap711").hide();
		})
	
	$("#" + pageid + "tssxflexpanelap72").mouseenter(function(){
			console.log('-----tssxflexpanelap72');
			$("#" + pageid + "tssxflexpanelap72").hide();
			$("#" + pageid + "tssxflexpanelap711").show();
		})
		
	$("#" + pageid + "tssxflexpanelap711").mouseleave(function(){
			console.log('-----tssxflexpanelap711');
			$("#" + pageid + "tssxflexpanelap72").show();
			$("#" + pageid + "tssxflexpanelap711").hide();
		})

	$("#" + pageid + "otherflexpanelap72").mouseenter(function(){
			console.log('-----otherflexpanelap72');
			$("#" + pageid + "otherflexpanelap72").hide();
			$("#" + pageid + "otherflexpanelap711").show();
	})
		
	$("#" + pageid + "otherflexpanelap711").mouseleave(function(){
			console.log('-----otherflexpanelap711');
			$("#" + pageid + "otherflexpanelap72").show();
			$("#" + pageid + "otherflexpanelap711").hide();
		})
		
	$("#" + pageid + "ssyhflexpanelap72").mouseenter(function(){
			console.log('-----ssyhflexpanelap72');
			$("#" + pageid + "ssyhflexpanelap72").hide();
			$("#" + pageid + "ssyhflexpanelap711").show();
	})
		
	$("#" + pageid + "ssyhflexpanelap711").mouseleave(function(){
			console.log('-----ssyhflexpanelap711');
			$("#" + pageid + "ssyhflexpanelap72").show();
			$("#" + pageid + "ssyhflexpanelap711").hide();
		})
		
	$("#" + pageid + "deductionflexpanelap72").mouseenter(function(){
			console.log('-----deductionflexpanelap72');
			$("#" + pageid + "deductionflexpanelap72").hide();
			$("#" + pageid + "deductionflexpanelap711").show();
		})
		
	$("#" + pageid + "deductionflexpanelap711").mouseleave(function(){
			console.log('-----deductionflexpanelap711');
			$("#" + pageid + "deductionflexpanelap72").show();
			$("#" + pageid + "deductionflexpanelap711").hide();
		})
		$("#" + pageid + "depreciateflexpanelap72").mouseenter(function(){
			console.log('-----depreciateflexpanelap72');
			$("#" + pageid + "depreciateflexpanelap72").hide();
			$("#" + pageid + "depreciateflexpanelap711").show();
		})
	$("#" + pageid + "depreciateflexpanelap711").mouseleave(function(){
			console.log('-----depreciateflexpanelap711');
			$("#" + pageid + "depreciateflexpanelap72").show();
			$("#" + pageid + "depreciateflexpanelap711").hide();
		})
	}
  
  // DOM节点操作函数
  var initEvent = function (model, props) {
	var popsData=props.data; 
	var pageid=popsData['pageid'];
    $('#' + pageid + 'incomeflexpanelap111 .privaterule',model.dom).click(function(){ 
		model.invoke('addNewRule',{"ruletype":"private"}); 
	})  
		
	$('#' + pageid + 'incomeflexpanelap131 .publicrule',model.dom).click(function(){ 
		model.invoke('addNewRule',{"ruletype":"public"}); 
	})  
	$('#' + pageid + 'rolloutflexpanelap111 .privaterule',model.dom).click(function(){ 
		model.invoke('addNewRule',{"ruletype":"private"}); 
	})  
		
	$('#' + pageid + 'rolloutflexpanelap131 .publicrule',model.dom).click(function(){ 
		model.invoke('addNewRule',{"ruletype":"public"}); 
	})  
	
	$('#' + pageid + 'periodflexpanelap111 .privaterule',model.dom).click(function(){ 
		model.invoke('addNewRule',{"ruletype":"private"}); 
	})  
		
	$('#' + pageid + 'periodflexpanelap131 .publicrule',model.dom).click(function(){ 
		model.invoke('addNewRule',{"ruletype":"public"}); 
	})  
	$('#' + pageid + 'ajustflexpanelap111 .privaterule',model.dom).click(function(){ 
		model.invoke('addNewRule',{"ruletype":"private"}); 
	})  
		
	$('#' + pageid + 'ajustflexpanelap131 .publicrule',model.dom).click(function(){ 
		model.invoke('addNewRule',{"ruletype":"public"}); 
	})
	
	$('#' + pageid + 'dsaleflexpanelap111 .privaterule',model.dom).click(function(){ 
		model.invoke('addNewRule',{"ruletype":"private"}); 
	})  
		
	$('#' + pageid + 'dsaleflexpanelap131 .publicrule',model.dom).click(function(){ 
		model.invoke('addNewRule',{"ruletype":"public"}); 
	})
	
	$('#' + pageid + 'zcajustflexpanelap111 .privaterule',model.dom).click(function(){ 
		model.invoke('addNewRule',{"ruletype":"private"}); 
	})  
		
	$('#' + pageid + 'zcajustflexpanelap131 .publicrule',model.dom).click(function(){ 
		model.invoke('addNewRule',{"ruletype":"public"}); 
	})
	
	$('#' + pageid + 'srajustflexpanelap111 .privaterule',model.dom).click(function(){ 
		model.invoke('addNewRule',{"ruletype":"private"}); 
	})  
		
	$('#' + pageid + 'srajustflexpanelap131 .publicrule',model.dom).click(function(){ 
		model.invoke('addNewRule',{"ruletype":"public"}); 
	})
	
	$('#' + pageid + 'tssxflexpanelap111 .privaterule',model.dom).click(function(){ 
		model.invoke('addNewRule',{"ruletype":"private"}); 
	})  
		
	$('#' + pageid + 'tssxflexpanelap131 .publicrule',model.dom).click(function(){ 
		model.invoke('addNewRule',{"ruletype":"public"}); 
	})

	$('#' + pageid + 'otherflexpanelap111 .privaterule',model.dom).click(function(){ 
		model.invoke('addNewRule',{"ruletype":"private"}); 
	})  
		
	$('#' + pageid + 'otherflexpanelap131 .publicrule',model.dom).click(function(){ 
		model.invoke('addNewRule',{"ruletype":"public"}); 
	})
	
	$('#' + pageid + 'ssyhflexpanelap111 .privaterule',model.dom).click(function(){ 
		model.invoke('addNewRule',{"ruletype":"private"}); 
	})  
		
	$('#' + pageid + 'ssyhflexpanelap131 .publicrule',model.dom).click(function(){ 
		model.invoke('addNewRule',{"ruletype":"public"}); 
	})
	
	$('#' + pageid + 'deductionflexpanelap111 .privaterule',model.dom).click(function(){ 
		model.invoke('addNewRule',{"ruletype":"private"}); 
	})  
		
	$('#' + pageid + 'deductionflexpanelap131 .publicrule',model.dom).click(function(){ 
		model.invoke('addNewRule',{"ruletype":"public"}); 
	})
	$('#' + pageid + 'depreciateflexpanelap111 .privaterule',model.dom).click(function(){ 
		model.invoke('addNewRule',{"ruletype":"private"}); 
	})  
		
	$('#' + pageid + 'depreciateflexpanelap131 .publicrule',model.dom).click(function(){ 
		model.invoke('addNewRule',{"ruletype":"public"}); 
	})
  }
  console.log('-----------------init')
  // 注册自定义控件
  KDApi.register('taxrule', MyComponent)
})(window.KDApi, jQuery)
