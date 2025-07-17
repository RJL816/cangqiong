
(function(KDApi,_){ 
    function MyComponent(model){
        this._setModel(model);
    }

    MyComponent.prototype = {
        _setModel: function(model) {
            this.model = model;
        },
        init:function(props){					
			var model = this.model;			
        },
        update:function(props){
			console.log('-----update',this.model,props);
			addFunc(this.model,props);
        },
        destoryed:function(){
            console.log('-----destoryed',this.model)
        }
    }
	
	var addFunc = function(model, props) {
		let flexKey;
		let multiple = true;//是否支持多选
		let fileType = '*ofd, application/pdf';//默认图片, 上传pdf/ofd   "*ofd, application/pdf"
		let fileSet = {
			fileLimitSize: 3, // 大于3M才压缩
            fileQuality: 0.98, // 清晰度
            fileLimitPixel: 1500, // 原始像素小于该值则不处理
		};//压缩比例
		let url = '';
		let fid;
		if (props != null && props.data != null) {
			let popsData = props.data; 
			flexKey = popsData['flexKey'];
			fid=popsData['fid'];
			url = popsData['uploadUrl'];
			if (popsData['multiple']) {
				multiple = popsData['multiple'];
			}
			if (popsData['fileType']) {
				fileType = popsData['fileType'];
			}
			if (popsData['fileSet']) {
				fileSet = popsData['fileSet'];
			}
		}
		
		KDApi.loadFile(['./style.css', './common/jquery.mobile-min.js', '../common/pwyPolyfill.js', '../common/UploadFiles.min.js'], model, () => {
			const opt = {
				multiple, //选择本地文件默认选多张， false： 单张选择
				fileType,  //默认图片, 上传pdf/ofd   "*ofd, application/pdf"     
				fileSet,
				url
			};
			
			console.log('flexKey的值',flexKey);
			if (flexKey) {
				var arr = flexKey.split(',');
				for(var i=0; i< arr.length; i++) {
				    var flexName = arr[i];
					console.log('flexName的值', flexName);
					const divId = 'inputUpload'+flexName+model.pageId;
					const outEl = document.createElement('div');
					outEl.className = 'photoBox';
					const inputEl = document.createElement('input');
					inputEl.className = 'inputFile';
					inputEl.type = 'file';
					//inputEl.setAttribute('accept', opt.fileType);
					inputEl.setAttribute('multiple', opt.multiple);
					inputEl.setAttribute('flexName', flexName);
					inputEl.onchange = function(e){
						const files = e.target.files;
						console.log('文件个数', files.length);
						if (files.length == 0) {
							return false;
						}
						const flexName = e.target.getAttribute('flexName');
						console.log('告诉后台flexName--',flexName);
						model.invoke('cameraUploadStart', flexName);
						const successArr = [];
						UploadFiles.upload(opt.url, files, {
							uploadData:{"appId":"rim","fId":fid},
							fileLimitSize: 3, // 大于3M才压缩
							fileQuality: 0.98, // 清晰度
							fileLimitPixel: 1500, // 原始像素小于该值则不处理
							stepUploadFinish: function(res) { 
								var file=res.file;  
								successArr.push({"errcode":res.errcode,"status":res.status,"size":file.size,"type":file.type,"name":file.name,"url":res.url});
								console.log('单个文件上传结束', res);
							},
							uploadFinish: function() {							
								e.target.value = '';
								const successDatas = {
									"flex":flexName,
									"fileArray":successArr
								};
								console.log('全部文件上传完成', successDatas);
								model.invoke('mobileFileUpload', successDatas);							
							}
						});
					};
					outEl.appendChild(inputEl);
					document.getElementById(flexName).appendChild(outEl);
				}
			}			
		});
    }
	
	KDApi.register('mobileFileUpload', MyComponent);
})(window.KDApi);
