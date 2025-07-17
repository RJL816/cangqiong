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
		var data={};   
		var pageId;
		var operate;
		var rowId;
		var msg;
		var colId; 
		if(props!=null&&props.data!=null){
			var popsData=props.data; 
			pageId=popsData['pageId'];  
			rowId=popsData['rowId'];  
			operate=popsData['operate'];  
			msg=popsData['msg'];  
			colId=popsData['colId'];    
		}  
		if(pageId&&isUpdate&&'init'==operate && colId){
			KDApi.loadFile('./css/verifyresult.css', model, function () { 	
				var colIdFilter='';
				var colIds=colId.split(',');
				var colList = [];
				for(j = 0; j < colIds.length; j++) { 
					colList.push('[col-id='+colIds[j]+'] .ag-react-container');
				}
				colIdFilter = colList.join(',');				
				$("#" + pageId).on('mouseenter', colIdFilter, function(e){
					var exsitLen = $('.fpzsInvoiceIcon').length;
					var isErrCell = $(this).find('img').length > 0;
					if (exsitLen > 0) {
						$('.fpzsInvoiceIcon').remove();
					}
					if (exsitLen === 0 && isErrCell) {
						var box = $(this);
						box.css({'position': 'relative', 'overflow': 'inherit'});
						box.find('.ant-tooltip').css({'display': 'block'});
						box.closest('.ag-cell').css({'overflow': 'inherit', 'z-index': 9999});						
						var styleObj = {'overflow': 'visible'};						
						box.closest('.ag-row').css({'overflow': 'inherit', 'z-index': 9999})
						.closest('.ag-center-cols-viewport').css(styleObj)
						.closest('.ag-center-cols-clipper').css(styleObj)
						.closest('.ag-body-viewport').css(styleObj)
						.closest('.ag-root').css(styleObj)
						.closest('.ag-root-wrapper').css(styleObj)
						.parent().css(styleObj)
						.parent().css(styleObj)
						.closest('.ag-theme-material-kd').css(styleObj)
						.closest('[data-page-id]').css(styleObj);
						var index = $(this).closest('.ag-row').attr('row-id');		
						var colId = $(this).closest('.ag-cell').attr('col-id');
						model.invoke('getMsg', {"rowId":index,"colId":colId});  
					}							
				});				
				
				$("#"+pageId).on('mouseleave', colIdFilter, function(e){	
					$('.fpzsInvoiceIcon').remove();
					var box = $(this);
						box.css({'position': 'static', 'overflow': 'hidden'});
						box.closest('.ag-cell').css({'overflow': 'hidden', 'z-index': 0});	
						// box.find('.ant-tooltip').css({'display': 'none'});
						var styleObj = {'overflow': 'hidden'};						
						box.closest('.ag-row').css({'overflow': 'hidden', 'z-index': 0})
						.closest('.ag-center-cols-viewport').css(styleObj)
						.closest('.ag-center-cols-clipper').css(styleObj)
						.closest('.ag-body-viewport').css(styleObj)
						.closest('.ag-root').css(styleObj)
						.closest('.ag-root-wrapper').css(styleObj)
						.parent().css(styleObj)
						.parent().css(styleObj)
						.closest('.ag-theme-material-kd').css(styleObj)
						.closest('[data-page-id]').css(styleObj);
					//$(this).closest('.ag-cell').css({'overflow': 'hidden', 'z-index': 0});
					//$(this).closest('.ag-row').css({'overflow': 'hidden', 'z-index': 0});
					
				});
				
				/*
				$("#"+pageId).on('click', '[col-id=verify_status] .fpzsInvoiceIcon .copyBtn', function(e) {
					var index = $(this).closest('.ag-row').attr('row-id');
					e.stopPropagation();
					return false;
				});
				*/
				
			})
		}else if('showMsg'==operate&&msg&&rowId&&colId){
			var start='<div class="ant-tooltip fpzsInvoiceIcon ant-tooltip-placement-bottom ant-tooltip-hidden" style="transform-origin: 50% -4px 0px;z-index: 9999999 !important"><div style="position:absolute;width: 50px;top:-20px;left:0;height: 20px;"/><div class="ant-tooltip-content"><div class="ant-tooltip-arrow"/><div class="ant-tooltip-inner" role="tooltip"><div class="fpzsTipBox"><textarea name="copy" id="copyTxt0" cols="30" rows="10" class="copyTxt"/><div class="title"><span>提示信息</span> <a style="position: absolute; right: 15px;display:none;" class="copyBtn">复制</a></div><div class="content" id="tipTxt0">'
			$("#" + pageId + ' [row-index=' + rowId + ']' + ' [col-id='+colId+'] .ag-react-container').append(start+msg+'</div></div></div></div>');
		}
    }   
	
    KDApi.register('verifyresult', MyComponent)
})(window.KDApi,jQuery);
