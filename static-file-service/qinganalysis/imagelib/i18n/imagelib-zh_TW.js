(function()
{
	var oManager = com.kingdee.bos.qing.framework.common.MultilanguageManager;
	var oPackage = com.kingdee.bos.qing.imagelib.common;
	oManager.registPackageResources(oPackage, 
	{
		// choose-ui
		chooseImage: "選擇圖片",
		allType: "全部類型",
		inputSearch: "請輸入搜索內容",
		imageLibrary: "圖片庫",
		noImageSelected: "未選中任何圖片。",
		noDataPrompt: "沒有符合條件的結果",
		uploadImageTips: "建議選擇長寬比2 : 1的圖片",
		editThumbnail: "編輯縮略圖",
		choosePicture: "選擇圖片",
		deleteThumbnail: "删除縮略圖",
		deletePicture: "删除圖片",
		deleteThumbnailConfirm: "刪除縮略圖后將恢復使用系統預置縮略圖，確定要刪除該縮略圖嗎？",
		imageCanNotBeFind: "找不到對應的圖片",
		setThumbnail: "設定縮略圖",
		reSetThumbnailBecauseOfDeleted: "該圖片已被删除，請重新設定縮略圖。",
		setThumbnailTipsForYourDsb: "請為您的儀錶板設定縮略圖（如未設定，則使用系統預置縮略圖）：",
		noImageLibraryPermission: "沒有圖片庫權限，請聯繫管理員分配權限。",
		thumbnailNotSupportGif: "縮略圖不支持 gif 圖片格式。",
		imageManagement: "圖片管理",
		fullPoint: "。",
		imageNotExist: "圖片不存在或已被刪除。",
		imageNotExistWithPath: "圖片“#1”不存在或已被刪除。",
		imageNotExistReSelect: "圖片不存在，請重新選擇圖片。",

		// common-ui、common
		category: "目錄",
		noPublicCategoryPermission: "沒有操作公共目錄的權限。",
		import: "導入",
		export: "導出",
		refresh: "刷新",
		exit: "退出",
		private: "個人",
		public: "公共",
		noSearchedResults: "沒有符合搜索條件的結果",
		allHitsNumberPrompt: "共搜索到 “#1” 個結果",
		close: "關閉",
		nullInput: "不能為空",
		imageNameRule: "圖片名稱不能包含\"/\"。",
		preview: "預覽",
		copyLink: "複製鏈接",
		moreOp: "更多操作",
		rename: "重命名",
		moveTo: "移動到",
		move: "移動",
		edit: "編輯",
		remove: "刪除",
		imageName: "圖片名稱",
		success: "成功",
		deleteImageSuccess: "刪除圖片成功。",
		save: "保存",
		selectPath: "請選擇目錄",
		selectPathTips: "請選擇目錄。",
		imageNameExist: "圖片名稱已存在。",
		noCategoriesToMove: "沒有可供移動的分組。",
		copiedToClipboard: "已複製到剪貼板。",
		confirmDeleteImageHasRef: "該圖片被引用了#1次，確定要刪除嗎？",
		confirmDeleteImage: "確定要刪除該圖片嗎？",
		renameImageName: "修改圖片名稱",
		inputImageNameFirst: "請輸入圖片名稱。",
		noCategory: "暫無目錄",
		noCategoryAndAdd: "沒有目錄，請先新建目錄。",
		noImage: "暫無圖片",
		noImageAndAdd: "沒有圖片，請先上傳圖片。",
		noSearchData: "沒有符合搜索條件的結果",
		moveImage: "移動圖片",
		previewImageFail: "圖片預覽失敗",
		imageNameNoChange: "图片名称未修改。",

		// ui
		gallery: "云素材",
		catalogue: "目錄",
		userUploadFile: "上傳的圖片",
		downloadGallery: "來自云素材",
		fileTypeIncorrect: "文件類型不正確，請重新上傳。",
		uploadFileIsNull: "上傳的文件為空，請重新上傳。",
		fileTooLarge: "文件太大，請重新上傳。",
		addCategory: "添加目錄",
		groupNameExist: "目錄名稱已存在。",
		nameExceeded: "名稱不能超過#1個字符。",
		groupNameRule: "名稱衹能使用中文、數字、字母、或下劃綫。",
		type: "目錄",
		preset: "預置",
		orderUp: "上移",
		deleteImageFirst: "請先刪除目錄下的圖片再刪除目錄。",
		deleteCategoryFirst: "請先刪除目錄下的子目錄再刪除目錄。",
		confirmDeleteCategory: "刪除目錄“#1”后將無法恢復，確定刪除該目錄嗎？",
		groupModelIsNull: "當前分組不存在，請刷新后重試。",
		noImagesExist: "暫無圖片。",
		uploadImage: "上傳圖片",
		uploadCardPrompt: "圖片格式支持#1，最大不超過#2M。",
		imageOverSize: "圖片大小不能大於#1M。",
		notImage: "該文件類型不是圖片。",
		imageNameToLong: "圖片名稱不能超過50個字符。",
		nameWithSpace: "名稱不能攜帶空格。",
		uploadingImage: "正在上傳圖片",
		failToUploadImg: "上傳圖片失敗。",
		uploadImgSuccess: "上傳圖片成功。",
		nullImageType: "無法識別圖片的類型无法识别图片的类型。",
		searchImageName: "搜索圖片名稱",
		saveCategory: "新增目錄",
		addBroCategory: "新建同級目錄",
		addChildCategory: "新建子級目錄",
		editCategory: "修改目錄",
		deleteCategory: "刪除目錄",
		deleteLastCategory: "至少需要保留壹個用戶目錄。",
		qingStorageFileSizeLimit: "您的輕存儲空間不足，無法完成該操作。",
		saveCategorySuccess: "新增目錄成功。",
		theMaxDirenctoryLevel:"最多可支持4級目錄，當前目錄為第4級目錄，無法新增下級目錄。",

		// imexport-ui
		hitsNumberPrompt: "(已選擇 #1 項)",
		noQualifiedResults: "沒有符合條件的結果",
		importNoPermPrompt: "沒有公共目錄編輯權限，請聯繫管理員分配權限。",
		showOnlyChecked: "僅顯示選中項",
		exportImage: "導出圖片",
		notSelectImages: "未選中圖片。",
		uploading: "正在上傳中，請稍後。",
		uploadFail: "上傳失敗。",
		noImportableImages: "未找到可導入的圖片。",
		importImage: "導入圖片",
		allIgnore: "全部忽略",
		allOverwrite: "全部覆蓋",
		allRename: "全部重命名",
		conflictHandingPrompt: "成功導入#1張圖片。以下圖片路徑衝突，請處理。",
		categoryType: "目錄類型",
		categoryName: "目錄名稱",
		handleStrategy: "處理策略",
		ignore: "忽略",
		overwrite: "覆蓋",
		downloadGalleryNotAllowedRename: " 來自云素材中的圖片不允許重命名。"
	})
})();