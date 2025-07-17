(function(KDApi,_){
    function MyComponent(model){
        this._setModel(model);
    }

    MyComponent.prototype = {
        _setModel: function(model) {
            this.model = model;
        },
        init:function(props){
			console.log('-----init',this.model,props);
        },
        update:function(props){
			console.log('-----update',this.model,props);
			addFunc(this.model, props);
        },
        destoryed:function(){
            console.log('-----destoryed',this.model)
        }
    }

	function addFunc(model, props) {
		console.log('微信卡包方法--------');
		var operate;
		var tableId;
		let uploadUrl = '';
		if(props!=null&&props.data!=null){
			var popsData=props.data;
			operate=popsData['operate'];
			uploadUrl = popsData['uploadUrl'];
		}
		if(operate=='load'){
			console.log('user_info  load');
			KDApi.loadFile(['../common/pwyPolyfill.js', '../common/UploadFiles.min.js','./trd/MuHybrid.3.1.24.js'], model,function(){
				try{
					console.log('user_info  load1');
					 MuHybrid.MuInvoice.getInvoice().then((result) => {
						console.log('卡包数据:', JSON.stringify(result));
						model.invoke('showmsg1',"微信卡数据:"+JSON.stringify(result));
						const { invoices } = result.data; //发票列表
						if (invoices) {
							const { user_info } = invoices; //发票详细信息
							console.log('user_info-------', user_info);
							//改造pdf_rul
							const pdfList = [];
							for (const item of invoices) {
								const userInfo = item.user_info;
								if (userInfo) {
									if(userInfo.pdf_url){
										pdfList.push({
											url: userInfo.pdf_url,
											invoiceNo: userInfo.billing_code,
											invoiceCode: userInfo.billing_no
										});
									}
								}
							}
							console.log('卡包pdfList数据:', pdfList);
							if (pdfList.length > 0) {
								downloadAndProcessPdfList(pdfList, invoices, model,uploadUrl);
							} else {
								model.invoke('imageap_wxcard',{"operate":"getInvoice","invoice":invoices});
							}
							//改造pdf_rul
						}else{
							model.invoke('imageap_wxcard',{"operate":"dataEmpty"});
						}
					 });
				} catch (error) {
					model.invoke('showmsg',"获取微信卡包数据失败:"+error);
				};
			});
		}
	}

	async function downloadAndProcessPdfList(pdfList, invoices, model,uploadUrl) {
		const waitFiles = [];
		for (const item of pdfList) {
			try {
				const res = await downloadAndUploadForSingleUrl(item);
				// 处理响应...
				console.log('卡包下载response', res);
				if (res.errcode === '0000') {
					waitFiles.push(res.data);
				}
			} catch (error) {
				console.error('处理pdfList时发生错误:', error);
			}
		}
		updateFile(model, waitFiles, invoices,uploadUrl);
	}

	async function downloadAndUploadForSingleUrl(item) {
		try {
			const res = await downloadFile(item, "get", 60000);
			console.log('卡包下载文件:',item, res);
			if (res.errcode === '0000') {
				const fileName = item.invoiceCode + item.invoiceNo;
				return await getBase64(res.data, fileName);
			}
			return { errcode: '0001', msg: '文件下载失败' }
		} catch (error) {
			console.error('文件下载或上传失败:', error);
		}
	}

	// 将pdf下载到本地
	function downloadFile(item, method, timeout) {
		return new Promise((resolve, reject) => {
			MuHybrid.MuHttpClient.download({
				url: item.url,
				method,
				timeout
			}, (successCb = res => {
				// 文件位置的URL路径
				let filePath = res.data.filePath;
				resolve({ errcode: '0000', data: filePath });
			}),
			(errorCb = error => {
				resolve({ errcode: '0001', description: '当下载失败时' });
			}))
		});
	}

	// 读取Base64
	function getBase64(filePath, fileName) {
		console.log('卡包下载文件1:',filePath);
		return new Promise((resolve, reject) => {
			MuHybrid.MuFileManager.readBase64({
				path: filePath
			}).then(result => {
				console.log('卡包下载文件result:',result);
				const base64Data = "data:application/pdf;base64,"+result.data.content;
				const fileObj = getFileObj(base64Data, fileName)
				resolve({ errcode: '0000', data: fileObj });
			}).catch(err => {
				resolve({ errcode: '0001', description: '转base64失败' });
			});
		});
	}


	function getFileObj(dataBase64, fileName) { //获取文件对象： dataBase64文件流，fileName文件名，fileType文件类型
		var arr = dataBase64.split(','), mime = arr[0].match(/:(.*?);/)[1],bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
		while(n--){
			u8arr[n] = bstr.charCodeAt(n);
		}
		var blob = new Blob([u8arr], {type:mime});
		fileName = fileName + '.pdf';
		return new File([blob], fileName, {type: 'application/pdf'});
	}

	function updateFile(model, files, invoices, uploadUrl){
		console.log('updateFile files:',files);
		const result = invoices;
		UploadFiles.upload(uploadUrl, files, {
			uploadData:{"appId":"rim","fId":"rim_mobile_index"},
			fileLimitSize: 3, // 大于3M才压缩
			fileQuality: 0.98, // 清晰度
			fileLimitPixel: 1500, // 原始像素小于该值则不处理
			stepUploadFinish: function(res) {
				console.log('卡包upload response', res);
				const file= res.file;
				console.log('file--名称------', file.name);
				for (const item of result) {
					const { user_info } = item;
					const name = user_info.billing_no + user_info.billing_code + '.pdf';
					console.log('item--名称------', name);
					if (name === file.name) {
						item.user_info.pdf_url = res.url;
					}
				}
			},
			uploadFinish: function() {
				console.log('全部上传完成后-----', result);
				model.invoke('imageap_wxcard',{"operate":"getInvoice","invoice":result});
			}
		});
	}

	/****
	// 发送消息
	function sendMessage(msg, target){
		//var targetWindow; // 记录页面是否已经跳转过页面
		//if (targetWindow){ // 已经跳转过页面
			//targetWindow.close();
		//}
		console.log("打开窗口:" + target)
		var targetWindow = window.open(target, 'test', 'location=no');
		setTimeout(() => {
                targetWindow.postMessage(msg, target)
            },500)
	}

	// 监听返回消息
	window.addEventListener('message', (e) => {
		console.log('接收消息' + e.data);
		var pageId = e.data.pageId;
		//if (e.origin !== "")
		//return;
		window.invokeCustomEvent(pageId, null, [
			"wxcard_data",
			"imageap_wxcard",
			eventArgs
		]);
	})



	// ------------------------  工具方法   ------------------------
	// 调用后台
	function invokeCustomEvent(eventName, eventArgs, pageId) {
		top.window.invokeCustomEvent(pageId, null, [
			"wxcard",
			eventName,
			eventArgs
		]);
	}
	****/

	KDApi.register('h5WxCard', MyComponent);
})(window.KDApi);
