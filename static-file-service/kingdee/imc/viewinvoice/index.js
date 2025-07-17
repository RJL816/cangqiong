
(function(KDApi,$,_){ 
    function MyComponent(model){
        this._setModel(model);
    }

    var isUpdate = false;
	var boxWidth = 0;
	var boxHeight = 0;
	var isLoadLibs = false;
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
		var data={};   
		var pageId;
		var flexKey;
		var list=[];
		var areaInfo=[];
		var displayFlag;
		var currentIndex=0;
		var previewType=0;
		var showBtn=true;
		if(props!=null&&props.data!=null){
			var popsData=props.data; 
			pageId=popsData['pageId'];  
			flexKey=popsData['flexKey'];  
			displayFlag=popsData['displayFlag'];  
			previewType=popsData['previewType'];  
			list=popsData.list;
			if (popsData.currentIndex != null){
				currentIndex=popsData.currentIndex;
			}
			showBtn=popsData['showBtn'];  
			if(showBtn==null){
				showBtn=true;
			}
		}  
		
		var uploadImgShow = function() {
			var curRef=React.createRef();
			var boxSelect = '';
			if(flexKey.indexOf('#') != -1) {
				boxSelect = flexKey.substr(1);
			} else {
				boxSelect = flexKey;
			}			
			
			var selectorStr = '[data-page-id="' + pageId + '_' + boxSelect + '"]';	
			var domEl = $(selectorStr)[0];
			if (domEl.clientWidth > 0 && domEl.clientHeight > 0) {
				boxWidth = domEl.clientWidth;
				boxHeight = domEl.clientHeight;
			}	
			const scanImages  = React.createElement(ScanImages, {
				index: currentIndex,
				style: { width: boxWidth, height: boxHeight, background: '#ccc' },
				// 图片位置的回调
				onChangeIndex: function(index, type){
					console.log('imageIndex', index, type);
					model.invoke('imageIndex', {"index":index,"type":type});
					return true;
				},
				disabledHandlerIcon: true,
				ref: curRef,
				disabledDots: true,
				children: list.map(function(item){
					// 兼容旧版单个文件的查看
					if (item.displayFlag != null){
						displayFlag = item.displayFlag;
					}
					if (item.areaInfo != null){
						areaInfo = item.areaInfo;
					} else {
						areaInfo = list;
					} 
					var itemUrl=item.url;
					if(item.previewType && item.previewType!='0'){
						var ajaxResult;
						$.ajax({ 
							type : "POST",  
							dataType: 'json',
							url : item.url,  
							async : false,
							success : function(result) { 
								console.log(result.url+'  '+result.status);
								if(result.url){
									ajaxResult=result.url; 
								}
							}, 
							error : function(e){
								console.log(e.status);
								console.log(e.responseText);
							}
						}); 
						if(ajaxResult){
							itemUrl=ajaxResult;
						  //预览地址不是图片
							displayFlag='showOther';
							if( item.replaceurl && item.contextPath ){
								var arr=item.replaceurl.split("|");
								for(var i=0;i<arr.length;i++) {  
									itemUrl = itemUrl.replace(arr[i],item.contextPath); 
								}
							}
						}
					}
					var imgCom = React.createElement(ScanImage, {
						id: 0,
						width: boxWidth,
						height: boxHeight,
						rotateDeg: item.rotateDeg,
						areaInfo: areaInfo,
						displayFlag: displayFlag || 'markImage',
						visible: true,
						renderInBody: false,
						imgSrc: itemUrl,
						disabledBtns: false,
						showNewBtns: true,
						// emptyFillStyle: 'rgba(0, 0, 0, 0.5)',
						showChangePageBtn: showBtn,
						changeIndex: function(type) {
							console.log('changeIndex', type, curRef);
							curRef.current.onChangeIndexOutSide(type);
						}
					});	
					return imgCom; 
				})
			});			
			if ($(selectorStr + ' .showImageBox').length > 0 && domEl) {
				try {
					ReactDOM.unmountComponentAtNode(domEl);
				} catch(e) {
					console.log('unmountComponentAtNode');
				}					
			}			
			ReactDOM.render(scanImages, domEl);
		}
		if(isUpdate&&pageId&&list){
			if (!isLoadLibs) {
				KDApi.loadFile(['../common/pwyPolyfill.js','./fullScanImages.js'], model, function(){
					console.log('ScanImage', ScanImage);
					console.log('ScanImages', ScanImages);
					var obj = ''; 				
					if(flexKey.indexOf('#') != -1) {
						obj = flexKey.substr(1);
					} else {
						obj = flexKey;
					}
				
					isLoadLibs = true;
										
					uploadImgShow();
				});
			} else {
				uploadImgShow();
			}			
		}
    }
	
	KDApi.register('viewinvoice', MyComponent);
})(window.KDApi,jQuery);
