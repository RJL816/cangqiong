(function(KDApi,$,_){ 
	
    function MyComponent(model){
        this._setModel(model);
	}
	let orgName = ''
	let qrCode = ''
	
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
		console.log('-----popsData',popsData);
		var eventkey=popsData.eventKey; 
		console.log('-----eventkey',eventkey);
		if(eventkey == 'download') {
			html2canvas(document.getElementById("qrcode"),{backgroundColor: '#ffffff'}).then(function (canvas) {
                var imgUri = canvas.toDataURL("image/png"); // 获取生成的图片的url
				model.invoke('download', imgUri);
            });
		}
	};

	var initHtml = function(model,props){   
		var popsData = {};
		if (props != null && props.data != null) {
			popsData = props.data;
		}  
		KDApi.loadFile('./css/qrcode.css', model,function(){
            KDApi.templateFilePath('./html/qrcode.html', model,popsData).then(
                function(result){
                    if(model.dom.innerHTML === ""){
                        model.dom.innerHTML = result;
					}
					qrCode = 'data:image/png;base64,'+ popsData.qrCode
					orgName = popsData.orgName
                }
            )
		})
		KDApi.loadFile('./html2canvas.min.js', model, function () {
			
		})
	};
    KDApi.register('qrcode', MyComponent);
})(window.KDApi,jQuery);
