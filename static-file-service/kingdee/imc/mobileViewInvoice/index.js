
(function(KDApi,_){ 
    function MyComponent(model){
        this._setModel(model);
    }

    var isUpdate = false;
    MyComponent.prototype = {
        _setModel: function(model) {
            this.model = model;
        },
        init:function(props){
          console.log('-----init',this.model,props);
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
		var flexKey;
		var list=[];
		if(props!=null&&props.data!=null){
			var popsData = props.data; 
			pageId = popsData['pageId'];  
			flexKey = popsData['flexKey']; 
			list = popsData.list; 
		}
		
		if(isUpdate&&pageId&&list){
			KDApi.loadFile(['../common/pwyPolyfill.js', './showImage.min.js'], model, () => {
				let obj = ''; 
				if(flexKey.indexOf('#') != -1) {
				    obj = flexKey.substr(1);
				} else {
				    obj = flexKey;
				}
				//可公用
				var startTag = document.getElementById(obj);
				var parentNodes = getParentTag(startTag);
				function getParentTag(startTag, parentTagList = []){
					if (!(startTag instanceof HTMLElement)){
						return false;
					}
					if ('BODY' !== startTag.parentNode.tagName) {
						parentTagList.push(startTag.parentNode);
						return getParentTag(startTag.parentNode, parentTagList)
					} else {
						return parentTagList;
					}
				}

				let pageDom = '';
				for (var i=0; i< parentNodes.length ; i++) {
					if (parentNodes[i].getAttribute('data-page-id') && parentNodes[i].getAttribute('data-page-id') == pageId){
						pageDom = parentNodes[i];
						break;
					}
				}
				//
				const shortDeg = list[0].shortDeg || 0;
				var imgCom = React.createElement(ShowImage.default, {
					src: list[0].snapshotUrl,
					localUrl: list[0].localUrl,
					width: document.getElementById(obj).clientWidth,
					height: document.getElementById(obj).clientHeight,
					pixel:list[0].pixel,
					region: list[0].region,
					fileType: list[0].fileType,
					shortDeg,
					orientation: list[0].rotationAngle - shortDeg,
					pageDom
				});
				var flexKeyDom = document.getElementById(obj);
				var showImageMobilsArr = flexKeyDom.getElementsByClassName('showImageMobile');
				if (showImageMobilsArr.length > 0) {
					try {
						ReactDOM.unmountComponentAtNode(document.getElementById(flexKey.replace('#','')));
					} catch(e) {
						console.log('unmountComponentAtNode');
					}					
				}
				ReactDOM.render(imgCom, document.getElementById(flexKey.replace('#','')));
			});
			
		}
    }
	
	KDApi.register('mobileViewInvoice', MyComponent);
})(window.KDApi);
