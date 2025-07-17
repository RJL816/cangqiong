var CamareJs = function(){
	console.log('新东航的拍照系统3-----');
};
CamareJs.prototype = {
	constructor : CamareJs,
	init : function(opt, flexKey, fileType, cback){
        var arr = flexKey.split(',');
        var farrs = fileType.split('|');
        for(var i=0; i< arr.length; i++) {
            var flexName = arr[i];
            console.log('东航flexName的值', flexName);
            const outEl = document.createElement('div');
            outEl.className = 'photoBox';
			const inputEl = document.createElement('div');
			inputEl.className = 'inputFile';
			inputEl.setAttribute('flexName', flexName);
			outEl.appendChild(inputEl);
			document.getElementById(flexName).appendChild(outEl);
			var that=this;
			if(flexName == 'imageap_upload_file' || flexName == 'imageap_attach_file'){
				inputEl.onclick = function(e){
					const flexName = e.target.getAttribute('flexName');
					MuHybrid.MuDocCenter.upload().then(res => {
						const { status } = res;
						console.log('东航----upload----', res);
						if (status === 0) {
							const localFiles = res.data || [];
							console.log('localFiles-------', localFiles);
							that.checkFileType({
								localFiles,
								accept: ['pdf', 'ofd', 'png', 'jpg', 'jpeg'],
								uploadFinsh: (result) => {
									console.log('本地上传返回的内容------->>', result);
									if (result.errcode == '0001') {
										cback({ errcode: '0001', description: '仅允许选择pdf、ofd、图片等格式文件上传' });
									} else {
										that.batchGetFileStream(localFiles, (res) => {
											console.log('文件上传临时文件转换结果--------->>', res);
											if (res.errcode === '0000') {
												if (res.data.length > 0) {
													cback({ errcode: '0000', uploadFile: 'file', inputObj: e, data: res.data, flexName: flexName });
												} else {
													cback({ errcode: '0001', description: '本地文件处理失败！' });
												}
											} else {
												cback(res);
											}
										})
									}
								}
							});
						} else {
							console.log('选择文件失败-----');
						}
					}).catch(err => {
						console.log('MuDocCenter.upload------', err);
					});
				}
			}else{
				inputEl.onclick = function(e){
					const flexName = e.target.getAttribute('flexName');
					console.log('拍照,相册选择方法--------', MuHybrid, MuHybrid.MuImagePicker);
					MuHybrid.MuImagePicker.takePhoto({
						cameraType: 1,
						quality: 100,
						videoQuality: "medium",
						requestPermission: true
					}).then(result => {
						console.log('拍照,相册结果-------', result);
							const files = result.data.files || null;
							//const { path, size, name, type } = files[0];
							//path	String	本地文件路径
							//size	Number	本地文件大小，单位：B
							//name	String	包含扩展名的文件名称
							//type	String	文件类型 例如：image/png
							if(files){
								that.getFileStream(files, (res)=>{
									if (res.errcode === '0000') {
										cback({ errcode: '0000', uploadFile: 'file', inputObj: e, data: res.data, flexName: flexName });
									} else {
										cback(res);
									}
								})
							}else{
								cback({ errcode: '0001', description: '选择文件不能为空' });
							}
					}).catch(err => {
						console.log(err);
					});
				}
			}
        }
        //})
	},
	updateFile : function(model,opt,result){
		console.log('result---->>dh>--', result);
		model.invoke('showmsg-File',JSON.stringify(result));
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
			model.invoke('showmsg', result.description);
		}
	},
	checkFileType : function({localFiles, accept, uploadFinsh}){
		const fileSuffixObj = {
			pdf: 'application/pdf',
			ofd: 'application/vnd.ofdformat',
			png: 'image/png',
			jpg: 'image/jpg',
			jpeg: 'image/jpeg'
		};
		//遍历localFiles,获取path的地址后缀名称
		for(var i=0; i< localFiles.length; i++) {
			const filePath = localFiles[i].path;
			const fileType = filePath.substring(filePath.lastIndexOf('.') + 1, filePath.length);
			console.log('东航----fileType----', fileType);
			const lowerName = fileType.toLowerCase();
			console.log('东航----lowerName----', lowerName);
			const pathWithoutProtocol = filePath.replace(/^file:\/\//, '');
			const fileName = pathWithoutProtocol.split('/').pop();
			console.log('东航----fileName----', fileName);
			if (accept.indexOf(lowerName) == -1) {
				uploadFinsh({ errcode: '0001', description: '选择文件失败' });
				return;
			}
			localFiles[i].type = fileSuffixObj[fileType];
			localFiles[i].name = fileName;
		}
		uploadFinsh({ errcode: '0000', description: localFiles });
	},
	//循环处理本地文件
	batchGetFileStream: async function(localFiles, onfileBack) {
		var _that = this;
		const waitFiles = [];
		for (const item of localFiles) {
			const res = await _that.getBase64(item);
			console.log('东航转base64结果---------', res);
			if(res.errcode === '0000'){
				waitFiles.push(res.data);
			}
		}
		console.log('东航转base64结果---waitFiles------', waitFiles);
		onfileBack({ errcode: '0000', data: waitFiles });
	},
	getBase64: function(item) {
		console.log('东航单条本地文件---------', item);
		var _that = this;
		return new Promise((resolve, reject) => {
			MuHybrid.MuFileManager.readBase64({
				path: item.path
			}).then(result => {
				const content = result.data.content;
				const headerName = 'data:'+ item.type +';base64, '
				const baseCont = headerName + content;
				console.log('东航选择文件baseCont---------', baseCont);
				const fileObj = _that.getFileObj(baseCont, item.name, item.type);
				console.log('东航选择文件success---------', fileObj);
				resolve({ errcode: '0000', data: fileObj });
			}).catch(err => {
				console.log('东航选择文件err-------', err);
				resolve({ errcode: '0001', description: '转base64失败' });
			});
		});
	},
	getFileStream: function(files, callback) { //获取文件流
		var _that = this;
		MuHybrid.MuFileManager.readBase64({
            path: files[0].path
        }).then(result => {
			const content = result.data.content;
			var headerName = 'data:'+ files[0].type +';base64, '
			var baseCont = headerName + content;
			var fileObj = _that.getFileObj(baseCont, files[0].name, files[0].type);
			callback({	errcode: '0000', data: [fileObj]});
        }).catch(err => {
            callback({ errcode: '1111', data: null });
        });
	},
	getFileObj: function(dataBase64, fileName, fileType) { //获取文件对象： dataBase64文件流，fileName文件名，fileType文件类型
		var arr = dataBase64.split(','), mime = arr[0].match(/:(.*?);/)[1],bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
		while(n--){
			u8arr[n] = bstr.charCodeAt(n);
		}
		var blob = new Blob([u8arr], { type: mime });
		return new File([blob], fileName, {type: fileType});
	}
}