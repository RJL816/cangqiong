(function()
{
	var oManager = com.kingdee.bos.qing.framework.common.MultilanguageManager;
	var oPackage = com.kingdee.bos.extreport.snapcenter.ui;
	oManager.registPackageResources(oPackage, 
	{
		category: "目錄",
		preview: "查看",
		quit: "退出",
		extreport: "輕報表",
		addExtReportSnapGroup: "添加目錄",
		editExtReportSnapCategory: "編輯目錄",
		deleteExtReportSnapCategory: "刪除目錄",
		extreportGroupNameHasExist: "該目錄名稱已存在。",
		confirmToDeleteCategory: "删除分類“#1”後將無法恢復，確定删除該分類嗎？",
		deleteSnapInfoBeforeSnapGroup: "請先刪除目錄下的快照再刪除目錄。",
		addCategorySuccess: "新增目錄成功。",
		editCategorySuccess: "修改目錄成功。",
		categoryNameCanNotExceedLimit: "目錄名稱长度不能超過50個字元",
		createCategoryFirst: "您需要先創建一個目錄。",
		atLeastNeedOneUserExtReportGroup: "至少需要保留壹個用戶目錄。",
		searchContent: "請輸入搜索內容",
		searchNoResult: "沒有符合搜索條件的結果",
		noOperatePermission :"誤操作權限，請聯繫管理員。",
		extreportName: "名稱",
		description: "描述",
		create: "新建",
		createSth: "新建#1",
		createSuccess: "新建成功",
		nameTooLong: "名稱长度不能超過50個字元",
		descriptionTooLong: "描述长度不能超過500個字元",
		nameExist: "#1名稱已存在",
		nameCannotBeEmpty: "請輸入#1名稱",
		noDescription: "暫無描述",
		duplicateNameInCategory: "存在同名",
		edit: "編輯",
		editSth: "編輯#1",
		editSuccess: "編輯成功",
		deleteExtReport: "刪除",
		operateConfirm: "操作確認",
		confirmToDeleteExtReport: "刪除#1“#2”后將無法恢復，確定刪除該#3嗎？",
		deleteExtReportSuccess: "刪除成功",
		refresh: "刷新",
		scheduleMgr: "調度管理",
		schedule: "調度",
		sort: "排序",
		nameField: "名稱",
		modifyTime: "修改時間",
		closePanel: "關閉",
		type: "類型",
		invalidName: "名稱只能由漢字、字母、數字或下劃線組成，且不能以數字開頭",
		publishSuccess: "發佈成功",
		noSnapInfo: "暫無報表快照",
		noSnapGroup: "沒有目錄，請先新建目錄",
		name: "名稱",
		owner: "擁有者",
		createtime: "創建時間",
		modifier: "修改人",
		modifytime: "修改時間",
		editSnapInfo: "修改信息",
		personalCategory: "個人目錄",
		publicCategory: "公共目錄",
		personal: "個人",
		public: "公共",
		searchBoxPlaceholder: "請輸入搜索內容",
		noData: "請先選擇一條數據。",
		onlyOne: "只能選擇一條數據進行操作。",
		noSnap: "快照不存在",
		noSnapPermission: "您沒有該報表的權限",
		noSnapViewPermission: "無法查看由此報表生成的快照。",
		noOperationPerm: "無法執行當前操作。",
		contactCreator: "，請聯繫“#1”進行授權。",
		confirmMessage: "刪除選中的#1条數據后將無法恢復，確定刪除嗎？",
		deleteExtReportGroupSuccess: "刪除目錄成功。",
		moveupExtReportGroup: "上移目錄",
		deleteOthersSnapInfoBeforeSnapGroup: "當前目錄存在其他用戶已保存的快照，無法刪除。",
		existsOthersSnapInGroup: "當前目錄存在其他用戶已保存的快照",
		commaSymbol: "，",
		extReportDeleted: "該報表已被刪除",
		noSnapEditPermission: "您沒有該報表的快照編輯權限"
	});

	var oPackage = com.kingdee.bos.extreport.snapcenter.common.ui;
	oManager.registPackageResources(oPackage,
		{
			personalCategory: "個人目錄",
			publicCategory: "公共目錄",
			personal: "個人",
			public: "公共",
			othersMore: "更多",
			saveSnap: "保存快照",
			saveSnapSuccess: "保存快照成功。",
			selectPathType: "請選擇目錄類型",
			selectPath: "請選擇目錄",
			selectPathWithPeriod: "請選擇目錄。",
			snapName: "快照名稱",
			HistorySnapName: "歷史快照名稱",
			snapSavePathType: "目錄類型",
			snapSavePath: "目錄",
			saveSnapHyperLink: "保存聯查/聯動設置",
			snapNameNotEmpty: "請輸入快照名稱。",
			snapNameTooLong: "名稱长度不能超過50個字元。",
			invalidName: "名稱只能由漢字、字母、數字或下劃線組成，且不能以數字開頭。",
			isKeywords: "無法使用\"#1\"作為名稱，請重新輸入。",
			saveAs: "另存為",
			querySnapCenterPermExp: "查詢快照中心權限異常。",
			noQuerySnapCenterPermExp: "當前用戶沒有快照中心權限。",
			checkReportPermExp: "檢查用戶是否擁有保存快照權限異常。",
			noReportPerm: "當前用戶沒有保存快照權限。",
			reportNotFound: "該報表不存在或已被刪除。",
			userNotFound: "未找到用戶。",
			snapGroupNotFound: "目錄不存在或已被刪除.",
			sameSnapNameExist: "相同快照名稱已存在。",
			checkSnapCenterModulePermExp: "檢測快照中心模塊許可異常。",
			noSnapCenterModulePerm: "當前用戶沒有快照中心模塊許可。",
			operateConfirm: "操作確認",
			sameSnapNameConfirmMessage: "快照名稱已存在，確定覆蓋嗎？",
			viewSpaceMember: "查看協作空間成員",
		});
})();