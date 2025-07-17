(function(KDApi,$,_){ 
	
    function MyComponent(model){
        this._setModel(model);
    }

	
    MyComponent.prototype = {
        _setModel: function(model) {
            this.model = model;
        },
        init:function(props){
          console.log('-----init',this.model,props)
          isUpdate = false; 
          initHtml(this.model,props);
        },
        update:function(props){
          console.log('-----update',this.model,props)
          updateHtml(this.model,props);
        },
        destoryed:function(){
            console.log('-----destoryed',this.model)
        }
    }     
	var updateHtml = function(model,props){   
		var popsData = {};
		if (props != null && props.data != null) {
			popsData = props.data;
		}  
		// var pageId = props.data['pageId'];
		console.log('-----popsData',popsData);
		var eventkey=popsData.eventKey; 
		console.log('-----eventkey',eventkey);
		if(eventkey == 'updatePrint') {
		console.log('-----eventkey',eventkey);
			$('#printseq-content').html(popsData['printseq']);
			$('#invoicecode-content').html(popsData['invoicecode']);
			$('#invoiceno-content').html(popsData['invoiceno']);
			$('#printtype-content').html(popsData['printtype']);
			foreachEvent(model,popsData);
		}
	};

	var initHtml = function(model,props){   
		var popsData = {};
		if (props != null && props.data != null) {
			popsData = props.data;
		}  
		KDApi.loadFile('./css/paperinvoiceprint.css', model,function(){
            KDApi.templateFilePath('./html/paperinvoiceprint.html', model,popsData).then(
                function(result){
                    if(model.dom.innerHTML === ""){
                        model.dom.innerHTML = result;
					}
					setEvent(model)
                }
            )
        }) 
	};
	function setEvent(model) {
		$('#close-btn').on('click', function() {
			console.log('click close!!!!');
			model.invoke('closePrint','close');
		})
	}
	var foreachEvent = function(model,popsData){ 
		console.log('-----timeflag',popsData.timeflag);
		if(popsData.timeflag > 0){
			setTimeout(function(){
				console.log('-----setTimeout','setTimeout');
				model.invoke('foreachData',popsData);
			}, 1000);
		}else{
			model.invoke('closePrint','finish');
		}
	}
    KDApi.register('paperinvoiceprint', MyComponent);
})(window.KDApi,jQuery);
