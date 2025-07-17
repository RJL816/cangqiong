(function(KDApi,$,_){
	function MyComponent(model){
		this._setModel(model);
	}

	var isUpdate = false;
	var animateObj = null;
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
			KDApi.loadFile(['../common/UploadFiles.min.js','./dialog.css'], model,function(){
				initEvent(model,props);
			})
		}else if("upload"==operate){
			upload(model,props);
		}
	}

	function initEvent(model,props){
		console.log('initEvent');
		var fileId='rimUpload'+model.pageId;
		var cardentry="cardentryrowap";
		if($('#'+fileId).length<1){
			var popsData=props.data;
			var uploadUrl=popsData['uploadUrl'];
			var savePath=popsData['savePath'];
			var fileLimitSize=popsData['fileLimitSize'];
			var fid=popsData['fid'];
			var fileQuality=popsData['fileQuality'];
			var maxFileSize=popsData['maxFileSize'];
			var title=popsData['title'];
			var loadMsg=popsData['loadMsg'];
			var paracardentry=popsData['cardentry'];
			if(paracardentry){
				fileId=fileId+paracardentry;
				cardentry=paracardentry;
			}
			if(!loadMsg){
				loadMsg="上传中..";
			}
			if (!title){
				title="从电脑本地选择发票（增值税电子/纸质发票、火车汽车飞机票、定额发票等）上传，支持文件格式PDF、OFD、图片、EXCEL";
			}
			if($('#'+fileId).length>0){
				return;
			}
			var fileLimitPixel=popsData['fileLimitPixel'];
			var canImportExcels=popsData['canImportExcels'];
			var excelFilter = ".gif, .jpg, .jpeg, .png, .ofd, .xml, .zip, .xls, .xlsx, .pdf, application/pdf, application/zip, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
			var accept=/\.(gif|jpg|jpeg|png|GIF|JPG|PNG|PDF|pdf|OFD|ofd|xls|xlsx|zip|ZIP|xml|XML)$/;
			if(!canImportExcels){
				accept = /\.(gif|jpg|jpeg|png|GIF|JPG|PNG|PDF|pdf|OFD|ofd|zip|ZIP|xml|XML)$/;
				excelFilter = ".gif, .jpg, .jpeg, .png, .ofd, .xml, .zip, .pdf, application/pdf, application/zip";
			}
			var fileHtml="<input type='file' id='"+fileId+"' title=\""+title+"\" accept='"+excelFilter+"' multiple=\"multiple\" style=\"position: absolute;left: 0;top: 0;font-size: 100px;opacity: 0;\" />";
			//$('#'+model.pageId).append(fileHtml);
			$("[data-page-id='" + model.pageId + "_"+cardentry+"']").eq(0).css({overflow: 'hidden'}).append(fileHtml);
			var timestamp=popsData['time'];
			var fileIndex=0;

			$('#'+fileId).off("change").change(function(e) {
				//$(document).on('change', '#'+fileId, function(e) {
				UploadFiles.upload(uploadUrl, e.target.files, {
					uploadData:{"appId":"rim","fId":fid},
					maxFileSize:maxFileSize,
					fileLimitSize: fileLimitSize, // 大于3M才压缩
					fileQuality: fileQuality, // 清晰度
					fileLimitPixel: fileLimitPixel, // 原始像素小于该值则不处理
					accept:accept,
					stepUploadFinish: function(res) {
						console.log('单个文件上传结束', res); //.kdfont-loadingbeijing
						var file=res.file;
						var fileId=res.uid;
						$("#status"+fileId).hide();
						fileIndex=fileIndex+1;
						model.invoke('uploadfile_upload', {"errcode":res.errcode,"description":res.description,"status":res.status,"size":file.size,"type":file.type,"name":file.name,"url":res.url,"uploadTimeStamp":timestamp,"index":fileIndex});
					},
					uploadFinish: function() {
						/****
						 var start = (new Date()).getTime();
						 while ((new Date()).getTime() - start < 5000) {
							continue;
						} ***/
						hideLoading('#'+model.pageId);
						console.log('全部文件上传完成');
						var fileObj = document.getElementById(fileId);
						fileObj.value = '';
						fileIndex=0;
					},
					uploadStart: function(res) {
						showLoading('#'+model.pageId, [loadMsg]);
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
	function upload(model,props){
		//$('#rimUpload'+model.pageId).click();
	}
	KDApi.register('compressUpload', MyComponent)
})(window.KDApi,jQuery);
