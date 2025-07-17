(function(KDApi,$,_){ 
	
	// 输入搜索
	let isInputSearch = false;

	// 数据
	let items = [];
	
    function MyComponent(model){
        this._setModel(model);
    }

    var isUpdate = false;
	var model;
	
    MyComponent.prototype = {
        _setModel: function(model) {
            this.model = model;
        },
        init:function(props){
          console.log('-----init',this.model,props)
          isUpdate = false; 
		  model=this.model;
          initHtml(this.model,props,isUpdate);
        },
        update:function(props){
          console.log('-----update',this.model,props)
          isUpdate = true;  
		  model=this.model;
          updateHtml(this.model,props,isUpdate);
        },
        destoryed:function(){
            console.log('-----destoryed',this.model)
        }
    }     
	var updateHtml = function(model,props,isUpdate){   
		var popsData = {};
		if (props != null && props.data != null) {
			popsData = props.data;
		}  
		
		console.log('-----popsData',popsData);
		var eventkey=popsData['eventkey']; 
		if('queryTitle'==eventkey){
			items = popsData.companyInfos;
			// 渲染数据
			console.log('queryTitle response');
			showSearch(pageId);
		}
		if('btnflush'==eventkey){
			// 点击刷新
			console.log('flush response');
			$('#buyerNameTxt'+pageId).val('');
		}
		if('updateTitle'==eventkey){
			// 点击刷新
			var buyername = popsData.buyername;
			$('#buyerNameTxt'+pageId).val(buyername);
		}
		if('disable_title'==eventkey){
			// 点击刷新
			var buyername = popsData.buyername;
			$('#buyerNameTxt'+pageId).val(buyername);
			$('#buyerNameTxt'+pageId).attr("disabled","disabled");
		}
		if('doLocalComponentRequest'==eventkey){
			// 本地调用组件
			var url = popsData.url;
			var data = popsData.data;
			console.log(url);
			console.log(data);
			var xhr = new XMLHttpRequest();
			xhr.contentType = 'application/json';
			xhr.onload = function(){
				let result = xhr.responseText;
				console.log(result);
				model.invoke('doLocalComponentRequest',result);
			}
			xhr.onerror = function(){
				let result = {"errcode":"9999","description":"本地组件请求异常"};
				console.log(result);
				model.invoke('doLocalComponentRequest',result);
			}
			xhr.ontimeout  = function(){
				let result = {"errcode":"9999","description":"本地组件请求超时"};
				console.log(result);
				model.invoke('doLocalComponentRequest',result);
			}
			xhr.open('post', url, true);
			xhr.send(JSON.stringify(data));
		}
	}
	var initHtml = function(model,props,isUpdate){ 
		var popsData = {};
		if (props != null && props.data != null) {
			popsData = props.data;
		}  
		KDApi.loadFile('./css/index.css', model,function(){
            KDApi.templateFilePath('./html/invoiceBatch.html', model,popsData).then(
                function(result){
                    if(model.dom.innerHTML === "" || isUpdate){
                        model.dom.innerHTML = result;
                    }    		
					initEvent(model,props);
                }
            )
        }) 
    }
	
	var initEvent = function(model,props){ 
		
		// 点击搜索图标
		$('#confirmBatch').on('click', () => {
			model.invoke('confirmBatch','confirmBatch');
		});
		
	}
	
    KDApi.register('invoicebatch', MyComponent)
})(window.KDApi,jQuery);
