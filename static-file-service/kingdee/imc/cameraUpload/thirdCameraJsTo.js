var CamareJs = function(){
	console.log('通用第三方的拍照系统');
};
CamareJs.prototype = {
	constructor : CamareJs,
	init : function(opt, flexKey, fileType, cback){
        //return new Promise((resolve, reject) => {
            var arr = flexKey.split(',');
            var farrs = fileType.split('|');
            for(var i=0; i< arr.length; i++) {
                var flexName = arr[i];
                console.log('flexName的值', flexName);
                const outEl = document.createElement('div');
                outEl.className = 'photoBox';
                const inputEl = document.createElement('input');
                inputEl.className = 'inputFile';
                inputEl.type = 'file';
                if(farrs.length>i){
                    inputEl.setAttribute('accept', farrs[i]);
                }else{
                    inputEl.setAttribute('accept', farrs[0]);
                } 
                inputEl.setAttribute('multiple', opt.multiple); 
                const u = navigator.userAgent;
                const isiOS = u.indexOf('iPhone') > -1;
                if(!isiOS ){ 
                    inputEl.setAttribute('capture', 'camera');
                } 
                inputEl.setAttribute('flexName', flexName); 
                outEl.appendChild(inputEl);
                document.getElementById(flexName).appendChild(outEl);
                inputEl.onchange = function(e){
                    const files = e.target.files;
                    console.log('文件个数', files.length);
                    if (files.length == 0) {
                        cback({ errcode: '0001', description: '选择文件不能为空' });
                    } else {
						const flexName = e.target.getAttribute('flexName');
						cback({ errcode: '0000', uploadFile: 'file', inputObj: e, data: files, flexName: flexName });
                    }
                }
            }
        //})
	},
	updateFile : function(model,opt,result){
		console.log('result---->>44>--', result);
		const { errcode, uploadFile, flexName } = result;
		if (errcode == '0000') {
			//const flexName = result.inputObj.target.getAttribute('flexName');
			console.log('告诉后台flexName--',flexName);
			model.invoke('cameraUploadStart', flexName);						
			if (uploadFile === 'file') { //需要转为地址
				let { data , inputObj } = result; 
				for(let i=0; i< data.length; i++) { 
					if(data[i].name){
						const fdStart = data[i].name.indexOf(".");
						if(fdStart == 0){
							data[i].name=new Date().getTime()+data[i].name;
						}
					}else{
						data[i].name+new Date().getTime()+".jpg";
					}
				}
				const successArr = [];
				UploadFiles.upload(opt.url, data, {
					uploadData:{"appId":"rim","fId":opt.fid},
					fileLimitSize: 3, // 大于3M才压缩
					fileQuality: 0.98, // 清晰度
					fileLimitPixel: 1500, // 原始像素小于该值则不处理
					stepUploadFinish: function(res) { 
						var file=res.file;  
						successArr.push({"errcode":res.errcode,"status":res.status,"size":file.size,"type":file.type,"name":file.name,"url":res.url});
						console.log('单个文件上传结束', res);
					},
					uploadFinish: function() {					
						inputObj.target.value = '';
						const successDatas = {
							"flex":flexName,
							"fileArray":successArr
						};
						console.log('全部文件上传完成', successDatas);
						model.invoke('cameraUpload', successDatas);							
					}
				});
							
			} else if (uploadFile === 'url') {
				const { data } = result;
				console.log('全部文件上传完成-2--', data);
				const successDatas = {
					"flex":flexName,
					"fileArray":data
				};
				model.invoke('cameraUpload', successDatas);
			}
		} else {
			console.log('上传失败----', result.description);
		}
	}
}