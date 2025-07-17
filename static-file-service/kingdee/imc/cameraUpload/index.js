
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
			console.log('-----addFunc',this.model,props);
			addFunc(this.model,props);
        },
        destoryed:function(){
            console.log('-----destoryed',this.model)
        }
    }
	
	var addFunc = function(model, props) {
		let flexKey;
		let multiple = true;//是否支持多选
		let fileType = 'image/*';//默认图片, 上传pdf/ofd   "*ofd, application/pdf"
		let fileSet = {
			fileLimitSize: 3, // 大于3M才压缩
            fileQuality: 0.98, // 清晰度
            fileLimitPixel: 1500 // 原始像素小于该值则不处理
		};//压缩比例
		let url = '';
		let fid;
		let cameraJs=['./thirdCameraJsTo.js'];
		let loadFileArray=['./style.css', '../common/jquery-min.js', '../common/pwyPolyfill.js', '../common/UploadFiles.min.js'];
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
			if (popsData['fileLimitSize']) {
				fileSet.fileLimitSize = popsData['fileLimitSize'];
			}
			if (popsData['fileQuality']) {
				fileSet.fileQuality = popsData['fileQuality'];
			}
			if (popsData['fileLimitPixel']) {
				fileSet.fileLimitPixel = popsData['fileLimitPixel'];
			}
			if (popsData['camerajs']) {
				cameraJs = popsData['camerajs']; 
				cameraJs = cameraJs.split(",")
			}
		}
		for(const cameraJsFile of cameraJs){
			loadFileArray.push(cameraJsFile);
		} 
		KDApi.loadFile(loadFileArray, model, () => {
			const opt = {
				multiple, //选择本地文件默认选多张， false： 单张选择
				fileType,  //默认图片, 上传pdf/ofd   "*ofd, application/pdf"     
				fileSet,
				url,
				fid
			}; 
			console.log('flexKey8888的值',flexKey);
			const thirdCameraJs = new CamareJs();
			if (flexKey) {
				thirdCameraJs.init(opt, flexKey, fileType, (result)=>{
					thirdCameraJs.updateFile(model,opt,result); 
				});
			};	
		});
    }
	KDApi.register('cameraUpload', MyComponent);
})(window.KDApi);
