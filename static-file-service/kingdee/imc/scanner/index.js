(function(KDApi,$,_){
    function MyComponent(model){
        this._setModel(model);
    }

    var isUpdate = false;
	var pwyWebsocket =null;
	var pwyScanFiles;
	var animateObj = null;

	function startScan(model,props){
		console.log('-----startScan',props);		
		var popsData=props.data; 
		var loadMsg=popsData['loadMsg'];
		if(!loadMsg){
			loadMsg="扫描上传中..";
		}
		showLoading('#'+model.pageId, [loadMsg]);
		
		var savePath=popsData['savePath']; 
		var operate=popsData['operate']; 
		var fid=popsData['fid']; 
		var timestamp=popsData['time'];
		
		pwyScanFiles.startScan({			
			data: {},			
			stepUploadStart: function(item){
                console.log('stepUploadStart', item)
				return {
                    errcode: '0000',
                    otherData: { // 需要上传时添加的数据
                    url: savePath+item.name,
					"appId":"rim",
					"fId":fid
					}
                };
            },
			stepUploadFinish: function(itemData, fileInfo) { // 每一步上传处理完成后的回调
                var filePath = fileInfo.localUrl;  
                console.log('上传成功',itemData);
				var file=fileInfo.file; 
				var data={"errcode":itemData.errcode,"status":itemData.status,"size":file.size,"type":file.type,"name":file.name||fileInfo.name,"url":itemData.url,"uploadTimeStamp":timestamp,"index":fileInfo.index}
				model.invoke('scanner_success', {"operate":operate,"data":data});   
            },
			uploadFinish: function(res) {
				if(res.errcode&&'0000'!=res.errcode){
					console.log('-----scanner_fail',res);
					hideLoading('#'+model.pageId);
					model.invoke('scanner_fail', res);  
				}else{
					hideLoading('#'+model.pageId);
					model.invoke('scanner_uploadFinish', res);  
				}
				console.log(res);
			}
		});
	}
    MyComponent.prototype = {
        _setModel: function(model) {
            this.model = model;
        },
        init:function(props){
			console.log('-----init',props);
			isUpdate = false;  
			var mode=this.model;			
        },
        update:function(props){
			console.log('-----update',props);
            isUpdate = true; 
			setHtml(this.model,props,isUpdate);
			if(props!=null&&props.data!=null&&props.data.ifDuplexEnabled!=null && pwyScanFiles){
                pwyScanFiles.setDuplexEnabled(props.data.ifDuplexEnabled);
            }
        },
        destoryed:function(){
            console.log('-----destoryed',this.model);
			document.getElementById('outDwtcontrolContainer').remove();
        }

    }
	var setHtml = function(model,props,isUpdate){
		var data={};
		var uploadUrl='';
		var fid='';
		var operate=null;
		var resolution='100';
		var downloadUrl=null;
		var scannerType=null;
		var contextPath=null;
		var fileLimitPixel=null;
		var productKey='';
		if(props!=null&&props.data!=null){
			var popsData=props.data;
			uploadUrl=popsData['uploadUrl'];
			operate=popsData['operate']; 
			downloadUrl=popsData['downloadUrl']; 
			fid=popsData['fid'];
			resolution=popsData['resolution'];
			contextPath=popsData['contextPath'];
			scannerType=popsData['scannerType'];
			fileLimitPixel=popsData['fileLimitPixel'];
			productKey=popsData['productKey'];
			ifDuplexEnabled=popsData['ifDuplexEnabled'];
		}
		if(operate){ 
			if (!pwyScanFiles) { 
				if('dm'==scannerType){
					var staticPathUrl=contextPath+'/kingdee/imc/scanner';
					window.staticPathUrl=contextPath+'/kingdee/imc/scanner';
					window.productKey=productKey;
					KDApi.loadFile(['./dm-scanner/pwyPolyfill.js','./dm-scanner/scanFill.js','./dialog.css'], model, function() {
							pwyScanFiles = new ScanFiles.PwyAsyncScanFiles({
							uploadData:{ 'appId': 'rim', 'fId': fid },
							version: 17,
							limit: 2, // 上传时的并发控制
							IfDuplexEnabled: true, // 允许双面扫描
							staticPathUrl: staticPathUrl, // 指定加载扫描仪库文件的根路径
							needRegonizeQr: false, // 开启识别二维码
							uploadUrl: uploadUrl // 上传路径	
						});
						dialog('#'+model.pageId);
						startScan(model,props);  
					});

				}else{
					KDApi.loadFile(['./rq-scanner/pwyPolyfill.js','./rq-scanner/scanFiles.js','./dialog.css'], model, function() {
						pwyScanFiles = new ScanFiles.scanFiles({
							uploadData:{"appId":"rim","fId":fid},
							fileLimitSize: 3,
							fileQuality: 0.98,
							fileLimitPixel: fileLimitPixel,
							limit: 2, // 上传时的并发控制
							staticUrl: '', // 指定加载扫描仪库文件的根路径
							uploadUrl: uploadUrl, // 上传路径
							downloadUrl: downloadUrl,
							resolution: resolution, // 设置扫描仪图片的dpi,目前支持100,150,300,400
							scanFileStaticJs: [],
							version: 16 // 目前16是最新版本,不传默认还是15.若更新到17则需要新增v17的文件夹
						});
						dialog('#'+model.pageId);
						console.log('-----loadFile',props); 
						startScan(model,props); 
					});
				}
			}else{
				startScan(model,props);
			}
		
		}
    }
	
	
	
	// Other Code
    var destoryedFunc = function() {
		console.log('destoryedFunc。。。')
		if (loading) {
		    hideLoading();
			loading = false;
		}
    }
	
	function dialog(divname) {
		var html = "<div class='loadModal'>" + 
			"<div class='dialog'>" + 
				"<div class='loading'>" +
					"<div class='round0'><a class='cirle col1'></a></div>" +
					"<div class='round1'><a class='cirle col2'></a></div>" +
					"<div class='round3'><a class='cirle col3'></a></div>" +
					"<div class='round2'><a class='cirle col4'></a></div>" +
				"</div>" + 
				"<div class='contentTxt'></div>" +
			"</div></div>";
		$(divname).append(html);
	}

	function showLoading(divname, content){
		var length=$(divname).find('.loadModal').length;
		if(length<1){
			dialog(divname);
		} 
		var contentHtml = '';
		if (content) {
		   for (var j=0; j< content.length; j++) {
			contentHtml += '<p>'+ content[j] +'<p>';
		   }
		}
		$(divname).find('.dialog').find('.contentTxt').empty().append(contentHtml);
		var index = 0;
		animateObj = setInterval(function() {
			var current = $('.loading').find('.round' + index).find('.cirle');
			index +=1;
			scaleRound(current);
			if (index == 4) {
				index = 0;
			}
		}, 400);
		
		function scaleRound(name){
			name.animate({
				width: '20px',
				height: '20px'
			}, 300, function() {
				name.animate({
					width: '16px',
					height: '16px'
				}, 200);
			});
		}
	}

	function hideLoading(divname) {
		clearInterval(animateObj);
		$(divname).find('.loadModal').remove();
	}
    KDApi.register('scanner', MyComponent)
})(window.KDApi,jQuery);
