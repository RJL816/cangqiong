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
		var operate='';
		if(props!=null&&props.data!=null){
			var popsData=props.data; 
			operate=popsData['operate'];  
		}
		if("init"==operate){ 	
			KDApi.loadFile('../common/UploadFiles.min.js', model,function(){
				KDApi.templateFilePath('./UploadFiles.html', model,popsData).then(
					function(result){
						if(model.dom.innerHTML === "" || isUpdate){
							model.dom.innerHTML = result;
						}    		
						initEvent(model,props);
					}
				)
			}) 
		}else if("upload"==operate){
			upload(model,props);
		}			
    }   
	
	function initEvent(model,props){
		console.log('initEvent'); 
		var fileId='rimUpload'+model.pageId;
		if($('#'+fileId).length<1){
			var popsData=props.data; 
			var uploadUrl=popsData['uploadUrl'];
			var savePath=popsData['savePath'];
			var fileLimitSize=popsData['fileLimitSize'];
			var fileQuality=popsData['fileQuality'];
			var fileLimitPixel=popsData['fileLimitPixel'];
			var fileHtml="<input type='file' id='"+fileId+"' accept='image/*,.ofd,application/pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' multiple=\"multiple\" style=\"display:none;\" />";
			$('#'+model.pageId).append(fileHtml);
			$(document).on('change', '#'+fileId, function(e) {
				UploadFiles.upload(uploadUrl, e.target.files, {
					fileLimitSize: fileLimitSize, // 大于3M才压缩
					fileQuality: fileQuality, // 清晰度
					fileLimitPixel: fileLimitPixel, // 原始像素小于该值则不处理
					stepUploadFinish: function(res) {
						console.log('单个文件上传结束', res); //.kdfont-loadingbeijing
						var file=res.file;    
						var fileId=res.uid;
						$("#status"+fileId).hide();
						model.invoke('uploadfile_upload', {"errcode":res.errcode,"status":res.status,"size":file.size,"type":file.type,"name":file.name,"url":res.url});  
					},
					uploadFinish: function() {
						console.log('全部文件上传完成');
					},
					uploadStart: function(res) {
						for(var i=0;i<res.length;i++){
							var fileObj=res[i];
							var fileId=fileObj.uid;
							var file=fileObj.file;
							var msg = "<li class=\"c9Xy7igs\">"+
										"<img style='height: 12px;vertical-align: middle;margin-right: 2px;' id='status"+fileId+"' src='data:image/gif;base64,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'  />"+
										"<span class=\"_1l2_8NhW\" style=\"font-size: 12px;margin-right: 8px;line-height: 12px;color: #333;\">"+file.name+"</span>"+
										"<span class=\"_2FHFJLN2\" style=\"font-size: 12px;margin-right: 8px;line-height: 12px;color: #333;\">"+parseFloat(file.size/1024).toFixed(2)+"kb</span>"+
										"<span class=\"kdfont kdfont-shanchu kd-hover-color _3KO3Y9V0\"  style=\"vertical-align: bottom;\" fileUrl=\""+res.url+"\"> </span><span class=\"_17JGnt04\"/>"+
										"</li> ";
							$("#file_list"+model.pageId).append(msg);   
						}
						console.log('uploadStart',res);
					},
				});
			})	
			console.log('delete'+model.pageId); 
			
		}
		
		$("#file_list" + model.pageId).on("click", "li .kdfont-shanchu", function() {
			console.log($(this).attr('fileUrl')); 
			$(this).parent("li").remove();
			model.invoke('uploadfile_delete', {"fileUrl":$(this).attr('fileUrl')});  
		});
	}
	
	
	function upload(model,props){
		$('#rimUpload'+model.pageId).click();
	}
    KDApi.register('uploadfile', MyComponent)
})(window.KDApi,jQuery);
