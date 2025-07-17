class inputFunc {
    constructor(opt, obj){
        const { title, multiple, sources, localFile, localFileType, fileSet} = opt;
        this.title = title || '采集发票';  //当 sources为空，或者 localFile 为 true 时 传递
        this.multiple = multiple || false; //选择本地文件默认选多张， false： 单张选择
        this.sources = sources || '';  //单选或多选 拍照，相机 是传入
        this.localFile = localFile || false;  //true = 选择本地文件夹上传  pdf ofd; 默认 false
        this.localFileType = localFileType || 'image/*'; //上传本地文件 "*ofd, application/pdf"
        this.fileSet = fileSet || {};
        this.father = obj;
        this.creatInput();
    }

    async creatInput() {
        if(this.localFile){
            this.father.innerHTML += this.creatInputPdf();
            const inputObj = document.getElementById('inputUpload');
			console.log('进入本地上传--', inputObj);
            if (inputObj) {
                inputObj.multiple = this.multiple || true;
                inputObj.accept= this.localFileType || '';
            }
        } else {
            let singleChoose = false; //单选
			console.log('相册--', singleChoose);
            if (this.sources.length == 0 || this.sources.length == 2) { //多选
                singleChoose = false;
            } else {
                singleChoose = true;
            }
            this.father.innerHTML += this.camera_Album(singleChoose);
        }
    }

    async onChangeFile(cback) {
            const that = this;
			console.log('进入onchangeFile方法--', cback);
            if(this.localFile){
                const inputObj = document.getElementById('inputUpload');
				console.log('进入拍照上传--', inputObj);
                inputObj.onchange= async function(){
                    const result = that.uploadPdf(this.files);

                    if (result.errcode == '0000') {
                        const waitFiles = result.data;
                        console.log('文件上传--', result);
                        const res = await that.uploadForm(waitFiles, 'file');
                        console.log('res---', res[0].data.get('file').name);
                        if (typeof cback == 'function') {
                            cback(res)
                        }
                    } else {
                        if (typeof cback == 'function') {
                            cback(result)
                        }
                    }
                }
            } else {
                const cameraObj = document.getElementById('camera');
				console.log('进入拍照上传--', cameraObj);
                cameraObj.onchange=async function(){
                    const result = that.uploadImg(this.files); 
                    if (result.errcode == '0000') {
                        const waitFiles = result.data;
                        console.log('文件上传--', result);
                        const res = await that.uploadForm(waitFiles, 'file')
                        if (typeof cback == 'function') {
                            cback(res)
                        }
                    } else {
						console.log('返回结果错误--', result);
                        if (typeof cback == 'function') {
                            cback(result)
                        }
                    }
                }
            }
    }

    creatInputPdf() { //上传本地文件
        const title = this.title || '文件上传';
        return  '<div class="photoBox"><span>'+ title +'</span><input class="inputFile" type="file" id="inputUpload" /> </div>';
    }
    
    camera_Album(singleChoose) { //拍照或相册
        if(singleChoose){ //单选
            const sources= this.sources;
            console.log('this--', this);
            const item = sources[0];
            if(item.source == 'photo'){ //仅拍照
                const title = this.title || '拍照采集';
                return '<div class="photoBox"><span>'+ title +'</span><input class="inputFile" type="file" capture="camera" accept="image/*" id="camera" /></div>';
            } else {
                const title = this.title || '采集发票';
                return '<div class="photoBox"><span>'+ title +'</span><input class="inputFile" type="file" accept="image/*" id="camera" /></div>';
            }
        } else {
            const title = this.title || '采集发票';
            return '<div class="photoBox"><span>'+ title +'</span><input class="inputFile" type="file" accept="image/*" id="camera" /></div>';
        }
    }

    uploadPdf(files) { //上传pdf,ofd
        console.log('files--', files);
        const waitFiles = [];
        let isPdf = 1; //pdf文件
        for (let i = 0; i < files.length; i++) {
            const name = files[i].name;
            console.log('name--', name);
            if (name.indexOf('.pdf') == -1 && name.indexOf('.ofd') == -1 && !this.photoCheck(name)) { //不是图片，也不pdf
                isPdf = 0;
            } else {
                waitFiles.push({
                    errFlag: 'init',
                    file: files[i],
                    localTempUrl: URL.createObjectURL(files[i]),
                    recognitionSerialNo: (+new Date()) + '-' + Math.random()
                });
            }
        }
        if (isPdf == 1) {
            return { errcode: '0000', data: waitFiles };
        } else {
            const u = navigator.userAgent;
            const isiOS = u.indexOf('iPhone') > -1;
            if (isiOS) {
				console.log('苹果手机系统--');
                return { errcode: 'fail', data: [], description: '请升级IOS系统版本' };
            } else {
				console.log('非苹果手机系统--');
                return { errcode: 'fail', data: [], description: '请选择PDF、OFD或图片等文件格式' };
            }
        }
    }

    photoCheck(text) {
        let photo_flag = true;
        if (!/.(gif|jpg|jpeg|png|gif|jpg|png)$/.test(text.toLowerCase())) {
            photo_flag = false;
        }
        return photo_flag;
    }

    uploadImg(files) { //上传图片
        const waitFiles = [];
		console.log('上传图片', files);
        for (let i = 0; i < files.length; i++) {
            waitFiles.push({
                errFlag: 'init',
                file: files[i],
                localTempUrl: URL.createObjectURL(files[i]),
                recognitionSerialNo: (+new Date()) + '-' + Math.random()
            });
        }
        return { errcode: '0000', data: waitFiles };
    }

    async uploadForm(fileList, name, fileSets) {
        const fileSet = fileSets || {};
        const maxSize = fileSet.maxSize || 10;
        const fromDatas = [];
		console.log('进入上传校验');
        for(const fileInfo of fileList) {
            const formData = new FormData();
            const filename = fileInfo.file.name;
            const currentSize = fileInfo.file.size / 1024 / 1024;
            let currentForm = '';
            if (currentSize > maxSize) {
                currentForm = { errcode: 'uploadFail', data: '', description: '文件超过' + maxSize + 'M，上传失败' };
            } else {
                const fileLimitSize = fileSet.fileLimitSize || 3;
                const fileLimitWidth = fileSet.fileLimitWidth || 2000;
                const fileLimitHeight = fileSet.fileLimitHeight || 1500;
                const fileQuality = fileSet.fileQuality || 0.98;
                console.log('--', fileInfo.file.size);
                if (fileInfo.file.size < parseFloat(fileLimitSize) * 1024 * 1024) { //不压缩
                    console.log('不压缩');
                    formData.append(name, fileInfo.file, filename);
                } else {
                    console.log('压缩');
                    const resCompress =  await this.compreseImgToBase64(
                        fileInfo.localTempUrl,
                        parseInt(fileLimitWidth),
                        parseInt(fileLimitHeight),
                        parseFloat(fileQuality)
                    );
                    console.log('resCompress---', resCompress);
                    // 对于不支持压缩的浏览器使用直接上传原图
                    if (resCompress.errcode !== '0000') {
                        formData.append(name, fileInfo.file, filename);
                    } else {
                        const bFile = await this.base64ToFile(resCompress.data, filename);
                        formData.append(name, bFile.data, filename);
                    }
                    console.log('name==', formData, formData.get(name));
                }
                currentForm = { errcode: '0000', data: formData };
            }
            fromDatas.push(currentForm);
        }
        return fromDatas;
    }
     
    adjustSize(width, height, maxWidth, maxHeight) {
        const tempRateW = parseFloat(maxWidth / width);
        const tempRateH = parseFloat(maxHeight / height);
        const rate = parseFloat(width / height);
        if (width > maxWidth || height > maxHeight) {
            if (tempRateW < tempRateH) {
                width = maxWidth;
                height = Math.floor(width / rate);
            } else {
                height = maxHeight;
                width = Math.floor(height * rate);
            }
        }
        return {
            width,
            height,
            rate
        };
    }
    
    
    async base64ToFile(baseStr, filename = 'filename.jpg') {
        const arr = baseStr.split(',');
        const mime = arr[0].match(/:(.*?);/)[1];
        const suffix = mime.split('/')[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        filename = filename.split('.')[0];
    
        const newFile = new File([u8arr], `${filename}.${suffix}`, { type: mime });
    
        if (newFile instanceof File) {
            return { errcode: '0000', data: newFile };
        } else {
            return { errcode: '90002', description: 'base64转换为图片异常，请检查图片是否正常' };
        }
    }
    
    
    async compreseImgToBase64(localUrl, maxWidth = 1800, maxHeight = 1200, quality = 0.98) {
        return new Promise((resolve) => {
            try {
                var img = new Image();
                img.onload = function() {
                    var originWidth = this.width;
                    var orginHeight = this.height;
                    // 尽量让长边和短边保持与缩放后的效果一致
                    if ((originWidth < orginHeight && maxWidth > maxHeight) || (originWidth > orginHeight && maxWidth < maxHeight)) {
                        var temp = maxWidth;
                        maxWidth = maxHeight;
                        maxHeight = temp;
                    }
    
                    var newSize = this.adjustSize(originWidth, orginHeight, maxWidth, maxHeight);
                    var imageWidth = newSize.width;
                    var imageHeight = newSize.height;
                    var canvas = document.createElement('canvas');
                    canvas.width = imageWidth;
                    canvas.height = imageHeight;
                    var context = canvas.getContext('2d');
                    context.clearRect(0, 0, imageWidth, imageHeight);
                    context.drawImage(this, 0, 0, imageWidth, imageHeight);
                    var dataurl = canvas.toDataURL('image/jpeg', quality);
                    canvas = null;
                    resolve({ errcode: '0000', description: '成功', data: dataurl });
                };
    
                img.onerror = function() {
                    resolve({ errcode: '90001', description: '图片转换异常, 请检查图片是否正常' });
                };
    
                img.src = localUrl;
            } catch (error) {
                resolve({ errcode: '90001', description: '图片转换异常, 请检查图片是否正常' });
            }
        });
    }
}