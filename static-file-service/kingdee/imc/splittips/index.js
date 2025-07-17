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
	};

	var initHtml = function(model,props){   
		var popsData = {};
		var keyId = ''
		if (props != null && props.data != null) {
			popsData = props.data;
			keyId = popsData.type
		}
		KDApi.loadFile('./css/splittips.css', model,function(){
            KDApi.templateFilePath('./html/splittips.html', model,popsData).then(
                function(result){
                    if(model.dom.innerHTML === ""){
                        model.dom.innerHTML = result;
					}
					$('#splittips>div').addClass('hide')
					keyId !== ''? $('#splittips' + keyId).removeClass('hide'): $('#splittips>div').eq(0).removeClass('hide')
                }
            )
        }) 
	};
	
    KDApi.register('splittips', MyComponent);
})(window.KDApi,jQuery);
