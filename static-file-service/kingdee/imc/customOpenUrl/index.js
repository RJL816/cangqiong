
(function(KDApi,$,_){ 
    function MyComponent(model){
        this._setModel(model);
    }

    var isUpdate = false;
    MyComponent.prototype = {
        _setModel: function(model) {
            this.model = model;
        },
        init:function(props){
          console.log('-----init',this.model,props)
          isUpdate = false; 
          setHtml(this.model,props,isUpdate);
        },
        update:function(props){
          console.log('-----update',this.model,props)
          isUpdate = true;  
          setHtml(this.model,props,isUpdate);
        },
        destoryed:function(){
            console.log('-----destoryed',this.model)
        }
    }     	
	var setHtml = function(model,props,isUpdate){   
		var pageId;
		var url;
		var openType;
		if(props!=null&&props.data!=null){
			var popsData=props.data; 
			pageId=popsData['pageId'];  
			openType=popsData['openType'];  
			url=popsData['url'];
            console.log('-----url',url)
            if (url) {
                if (openType === '1') {
                    window.location.replace(url);
                } else {
                    window.location.href = url;
                }
            } else {
                if (openType === '2') {
                    history.go(-1);
                }
            }
		}  
		

	}
	KDApi.register('customOpenUrl', MyComponent);
})(window.KDApi);
