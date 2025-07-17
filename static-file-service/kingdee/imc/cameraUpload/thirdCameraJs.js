var CamareJs = function(){
	 console.log('华夏的拍照系统');
};
CamareJs.prototype = {
	constructor : CamareJs,
	init : function(opt, flexKey, fileType, cback){
		var arr = flexKey.split(',');
		var farrs = fileType.split('|'); //可上传的文件类型
		for(var i=0; i< arr.length; i++) {
			var flexName = arr[i];
			console.log('flexName的值', flexName);
			const outEl = document.createElement('div');
			outEl.className = 'photoBox';
			const inputEl = document.createElement('div');
			inputEl.className = 'inputFile';
			if(farrs.length>i){
				inputEl.setAttribute('accept', farrs[i]);
			}else{
				inputEl.setAttribute('accept', farrs[0]);
			} 
			inputEl.setAttribute('flexName', flexName);
			outEl.appendChild(inputEl);
			document.getElementById(flexName).appendChild(outEl);
		}

		this.photoClick(flexName, (result)=>{ 
			cback(result);
		});
	},
	photoClick: function(flexName, cbFuc) { 
		$('.photoBox .inputFile').on('click',function(e){ 
			try {
				dsBridge.call('TestJsapi.photographUpload',{}, imageUrl => { 
					const fileTypes = ['.jpeg', '.jpg', '.png'];
					let suffixName = '';
					for (let i = 0; i < fileTypes.length; i++) {
						if (imageUrl.indexOf(fileTypes[i]) != -1) {
							suffixName = fileTypes[i];
						}
					}

					if (suffixName) {
						const fileType = 'image/' + suffixName.substring(1);
						const successArr = [];
						const fName = 'temp_' + (+new Date()) + '_' + Math.random().toString().replace(/0\./, '') +'.'+ suffixName.substring(1);
						successArr.push({
							"errcode": '0000',
							"status": 'success',
							"size": '',
							"type":fileType,
							"name":fName,
							"url": imageUrl
						});
						cbFuc({ errcode: '0000', uploadFile: 'url', inputObj: e, data: successArr});
					} else {
						alert('获取图片地址失败');
						cbFuc({ errcode: '0001', description: '获取图片地址失败'});
					}
				});
			} catch (error) {
				alert('获取dsBridge失败');
				cbFuc({ errcode: '0001', description: '获取dsBridge失败' });
			}
		});
	}
}