(function()
{
	var oManager = com.kingdee.bos.qing.framework.common.MultilanguageManager;
	var oPackage = com.kingdee.bos.qing.scene;
	oManager.registPackageResources(oPackage, 
	{
		ERPCloudEntity: "金蝶雲蒼穹",
		bussinessEntity:"業務實體",
		dataCenter: "當前數據中心",
		selectEntity:"選擇實體",
		saveSuccess: "保存成功。",
		save: "保存",
		superQuery: "超級查詢",
		
		fullScreen: "全屏顯示",
		exitFullScreen: "退出全屏",
		toAppMenu: "發佈到應用菜單...",
		toAnalysisCenter: "發佈到數據工作台閱覽夾...",
		toMobile: "發佈到移動輕應用...",
		toCardRepository: "發佈到卡片庫...",
		timedPush: "定時溝通",
		yzjCommunicate: "雲之家溝通...",
		emailSchedulePush: "郵件定時推送...",
		mobileSchedulePush: "移動端定時推送",
		resourceFileLimit: "保存失敗，輕存儲空間不足。",
		publishTo: "發佈",
		publishManager: "發佈管理",
		pushManager: "定時推送管理",
		manager: "管理",
		closeTab: "退出",
		refresh	:"數據更新",
		sysPublishScheme: "系統默認方案",

		category: "分類",
		SchemeSynced: "同步與另存",
		TPSourceColons: "推送來源：",
		SyncSchemaToDSB: "同步回原儀表板",
		SyncSchemaToNewDSB: "另存爲新儀表板",
		SyncSchemaPublishConfirm: "同步後，當前儀錶板內容將會覆蓋發佈來源，確定同步嗎？",
		SyncSchemaPublishRefuse: "正在編輯該發佈記錄對應的發佈來源，請先關閉發佈來源頁面在進行同步操作",
		SyncSchemaPublishDeleted: "該發佈記錄對應的發佈來源已刪除，無法進行同步操作。",
		SyncSchemaPublishLogDeleted: "該發佈記錄已被刪除，無法進行同步操作。",
		SyncSchemaTPLogDeleted: "該推送記錄已被刪除，無法進行同步操作。",
		SyncSchemaTPConfirm: "同步後，當前儀錶板內容將會覆蓋推送來源，確定同步嗎？",
		SyncSchemaTPRefuse: "正在編輯該推送記錄對應的推送來源，請先關閉推送來源頁面在進行同步操作。",
		SyncSchemaTPDeleted: "該推送記錄對應的推送來源已刪除，無法進行同步操作",
		duplicateDSBNameInCategory: "該分類下存在同名儀錶板。",
		SyncSchemaToNewDSBCategoryDeleted: "新儀錶板的分類不存在或已被刪除",
		themeName: "名稱",
		description: "描述",
		publishSourceColons: "發佈來源：",

		noEditCurtain: "仪表板內容沒有修改",
		noContentChange: "內容沒有修改",
		saveDsbSuccess: "保存儀表板成功。",
		failToSaveDsb: "保存儀表板失敗。",
		failToLoadDsb: "加載儀表板內容失敗",
		noWidgets: "儀錶板沒有內容。",
		extractDataFailToRefresh: "準備數據失敗，請刷新出數據再進行該操作。",
		dsbIsDeleted: "對應仪表板不存在或者已被刪除",
		
		dataAnalysis: "數據分析",
		saveAndBack: "保存並返回",
		reset: "重置",
		resetAndBack: "重置並返回",
		resetAndExit: "重置並退出",
		resetConfirmTips: "您確定要重置到發布最初始的狀態，並退出嗎？",
		failToLoadRefContent: "加載引用內容失敗。",
		dsbContentParseError: "儀表板模型內容轉換失敗。",
		refContentParseError: "引用模型內容轉換失敗。",
		saveRefContentSuccess: "保存引用模型內容成功",
		resetRefContentSuccess: "重置引用模型內容到發佈狀態成功。",
		
		//data
		themeHasBeenDeleted: "對應主題不存在或者已被刪除",
		noOperationPermissions: "沒有操作權限",
		noDBCenterPermission: "沒有數據中心權限，請聯系管理員分配權限。",
		noSuperQueryAuth: "沒有當前超級查詢模式的權限，請聯系管理員分配權限",
		tooManyTablesSelectFieldOneEntityError: "當前實體關聯的資料表過多，請反選不需要的欄位。",
		tooManyTablesSelectFieldMoreEntityError: "當前實體關聯的資料表過多，請在右側反選不需要的分析欄位，或在左側删除不需要的實體分錄。",
		noDBCenterOwnerPermission: "發布人“#1”沒有數據中心權限，請聯系發布人檢查權限",
		noSuperQueryPerm: "發佈人“#1”沒有超級查詢相關模式的權限，請聯繫發佈人檢查權限",
		notExistTable: "無法在模式“#1”中找到該實體數據表",
		ownerNotExistTable: "數據源異常，請聯系發布人檢查數據源",
		chartExpired: "圖表信息已過期",
		noDmoOwnerPermission: "發布人“#1”没有數據開發平台權限，請聯系發布人檢查權限",
		noDmoPermission: "没有數據開發平台權限，請聯繫管理員分配權限。",
		dmoPermission: "没有數據開發平台#1權限，請檢查數據開發平台權限",
		app: "应用",
		chooseApp: "請選擇壹個應用",
		chooseAppCurtain: "請選擇壹個應用。",
		loadAppNameError: "獲取應用名稱失敗。",
		presetDMTips: "預置的主題不允許保存，如有需要，可復制後再進行操作。",
		
		//card-error
		themeIsDeleted: "對應主題不存在或者已被刪除",
		themeHasNoData: "對應主題沒有定義數據",
		lackDataEntityAuthority: "尚未獲得實體數據表的查看權限",
		subjectEntityMySQLMoreThan61Table: "當前實體關聯數據表太多，請減少實體的分析字段或刪除不需要的實體分錄",
		lackDataAuthority: "沒有該業務單據的查看權限",
		extractDataFail: "準備數據失敗",
		errorLog: "錯誤日誌",
		errorCode: "錯誤碼：",
		showErrorLog: "顯示錯誤日誌",
		viewDetails:"查看詳情",
		cardHasNotFound: "該卡片已被刪除",
		cardNoAuthority: "沒有該卡片的查看權限",
		componentSourceHasNotFound: "該組件來源已被發布者刪除",
		componentSourceNoAuthority: "沒有該組件來源的查看權限",
		subjectDataSourceError: "數據源發生異常",
		subjectDBDataSourceError: "數據源對應的數據庫連接異常",
		unsupportedDsbRefSource: "當前系統不支持該組件來源",
		qingStorageFileSizeLimit: "輕存儲空間不足",
		qingStorageNoSpace:"磁盤空間不足，請聯繫運維人員添加磁盤",
		illegalLicense: "當前系統沒有【輕分析】模塊的使用許可，請與系統管理員聯繫。",
		noQingModulePermission: "您所使用的賬戶沒有被分配【輕分析】模塊的使用許可，輕與系統管理員聯繫。",
		noMoreQingConcurrent: "【輕分析】模塊的當前使用人數已超過【輕分析】許可並發數。",
		illegalQingReportLicense:"當前系統沒有【輕報表】模塊的使用許可，請與系統管理員聯繫。",
		noQingReportModulePermission:"您所使用的賬戶沒有被分配【輕報表】模塊的使用許可，輕與系統管理員聯繫。",
		replicatedLogin: "您的賬號在其他地方登錄，請重新登錄當前系統。",
		qingRuntimeException: "程序發生錯誤",
		unknownException: "發生了未知錯誤",
		executeFail: "圖表執行失敗",
		entityDestroyed:"對應主題的數據表被損壞",
		permissionTitle: "權限提示",
		entityNotSupportQingAnalysis: "業務實體未開啟“支持輕分析”設置項，請在開發平台的對應表單中進行設置  ",
		viewDocument: "查看幫助文檔",
		DetailInfo: "詳細信息",
		notSupportQingAnalysis: "以下業務實體尚未開啟“支持輕分析”設置項:",
		notSupportQingAnalysisTip: "以下業務實體尚未開啟“支持輕分析”設置項，請在開發平台的對應表單中進行設置  ",
		noAuthorityForTheseEntities: "尚未獲得以下實體數據表的查看權限：",
		unsetCardSource: "請選擇卡片來源",
		extreportNotFound: "該報表不存在或已被刪除",
		serverBusy: "當前服務器繁忙，請稍後重試。",
		
		//card-exhibition
		cardEdit: "編輯卡片",
		cardGotoAnalysis: "進入分析",
		cardRefresh: "刷新",
		cardMoreOperate: "更多",
		cardFilter: "過濾條件",
		cardEditUnaccessable: "您没有#1的權限",
		enterEdit: "進入設計器",
		enterAnalysis: "進入“數據分析”",
		analysisIntoDesigner: "進入“數據分析”工具個性化修改",
		squareIntoDesigner: "進入設計器個性化修改",
		squareOpenAnalysis: "打開“數據分析”工具",
		fullScreenBtn: "全屏",
		landscapeBtn: "橫屏",
		verticalScreenBtn: "豎屏",
		lappFilter: "過濾",
		
		//card
		selectCard: "選擇要複製的卡片",
		noModeling: "該卡片對應的主題沒有進行數據準備，卡片無法使用。",
		noTheme: "該卡片對應的主題已被刪除，卡片無法使用。",
		failToloadCardContent: "加載卡片內容失敗。",
		chooseImportCard: "請選擇要引入的卡片。",
		fromCardLibrary: "從卡片庫複製方案",
		
		//邮件
		anonymousViewTips: "您正在以匿名方式查閱當前輕分析內容",

		cardNoDefaultSchema: "該卡片沒有定義默認方案",
		
		//dashboard
		finish: "完成",
		presetDsbTips: "預置的儀表板不允許保存、發布等操作，如有需要，可復制後再進行操作。",
		preset: "預置",
		
		//error
		errorBtn: "顯示錯誤日誌",
		
		systemMapCanNotEdit: "系統地圖不允許直接修改，若需修改地圖模板，請複製后再進行修改。",
		
		//编辑发布
		editPublishedContent: "編輯發佈方案-",
		
		//编辑推送
		editTimedPushContent: "編輯推送方案-",
		editSchemaNotFound: "方案已被刪除",
		emailConfigNotFound: "該推送配置已被刪除",
		
		noEditMap: "未修改，不需要保存。",
		saveMapSuccess: "保存地圖成功。",
		failToLoadMap: "加載地圖失敗。",
		overSize: "圖片大小不能大於20M。",
		fileNotImage: "該文件類型不是圖片。",
		failToUploadImg: "上傳圖片失敗。",
		
		noSelectMapTemplate: "請選擇地圖模板",
		iknow: "我知道了",
		uploadBackgroundImageTips: "正在上傳背景圖片",
		
		//金蝶多维数据库
		ERPCloudMDD:"金蝶多維數據庫",
		ERPCloudMDDApp:"應用",
		ERPCloudMDDsystem:"體系",
		ERPCloudMDDMemberRange:"成員範圍",
		selectApp:"請選擇應用",
		selectAppCurtain:"請選擇應用。",
		selectCube:"請選擇體系",
		selectCubeCurtain:"請選擇體系。",
		noERPCloudMDDPermission:"沒有金蝶多維庫權限，請先聯繫管理員分配權限。",
		ERPCloudMDDOneEntityLimit:"當前主題存在其他的數據表，不允许引入金蝶多維庫數據表。",
		ERPCloudMDDExistLimit:"當前主體存在1個金蝶多維庫數據表，不允許引入其他的數據表。",

		selectModel: "選擇模型",
		dppSourceName: "輕建模",
		noModelerPermission: "沒有輕建模權限，請聯系管理員分配權限。",

		/**超级查询**/
		businessEntity: "業務實體",
		schemas: "模式",
		superQuery: "超級查詢",
		currentSystem: "當前系統",
		otherSystem: "其它系統",
		noAuthentication: "沒有可用的模式，請先聯繫管理員授權模式。",
		SQNotDeploy: "當前環境未部署超級查詢服務或服務未啟動，請聯系管理員檢查超級查詢部署情況。",
		noSchemaPerm: "“#1”用戶沒有“#2”模式的權限，請重新選擇模式或聯繫管理員授權。",
		
		//analysis
		myLonger: "我的分析",
		presetLonger: "預置分析",
		presetAnalysisTips: "預置的數據分析不允許保存分析方案、發布等操作，如有需要，可復制後再進行操作",
		presetPublishAnalysisTips: "預置的數據分析不允許發布等操作，如有需要，可復制後再進行操作",
		searchBoxPlaceholder: "搜索發布名稱",
		//square
		presetSquareTips: "預置的數據斗方不允許保存分析方案、發布等操作，如有需要，可復制後再進行操作",
		operateForbidden: "當前場景不支持該操作",
		//title
		entityNumber: "實體編碼",
		entityName: "實體名稱",
		
		//应用菜单
		fromAppMenu: "從應用菜單複製方案",
		fromAppMenuRef: "從應用菜單引用",
		noPublish: "暫無發佈。",
		failToGetAppMenu: "獲取應用菜單失敗。",
		selectAppmenu: "選擇已發佈項",
		publishName: "發佈名稱",
		publishPerson: "發佈人",
		publishTime: "發佈時間",
		noData: "暫無記錄",
		failToGetPublish: "獲取發布失敗",
		publishOfSubjectNoModeling: "該發佈對應的主題沒有進行數據準備，無法使用。",
		publishOfSubjectBeDeleted: "該發佈對應的主題已被刪除，無法使用。",
		failToGetPublishSchemaList: "獲取發佈方案列表失敗。",
		noSearchData: "沒有符合搜索條件的結果",
		
		//仪表板关于信息
		about: "關於",
		publishInformation: "發佈信息",
		publisher: "發佈人：",
		envInformation: "環境信息",
		dsbUrlInformation: "儀錶板鏈接",
		hasCopied: "已複製到剪貼板",
		copyfailed: "複製失敗",
		copy: "複製",
		confirm: "確定",
		
		//db-manage
		dataCenterAppId: "應用編碼：#1；應用名稱：#2",
		dbmanage: "公共數據源",
		appNotFound: "應用#1不存在或已被刪除",
		
		// 加密预置内容许可检测
		noPermission: "尚未獲得數據的許可權限。",

		semicolon: "；",
		publishNoOperAuthException: "沒有操作權限",

		//查看发布记录时，检查相关信息的错误提示
		ThemeIsDel: "該發佈記錄的來源被刪除",
		publishInfoExist: "發佈記錄不存在或已被刪除",
		notAuthority: "您沒有該發佈記錄的查看權限，輕聯繫發佈人",
		authority: "授權",
		publishPlanExist: "該分析方案不存在或已被刪除",
		ISee: "我知道了",

		//云素材
		cannotAccess: "無法訪問到雲端素材庫",
		cannotAccessCloudGallery: "雲端素材庫為在綫圖片素材下載中心，訪問此頁面需要連接到互聯網，請檢查您的網絡環境。",

		/**
		 * 数据开发平台
		 */
		dmo: "數據開發平台",
		noDmoPermission: "沒有數據開發平台權限，請聯繫管理員分配權限。",
		noDmoConfig:"數據開發平台配置不正確，請聯繫管理員。",
		labelModel: "標籤模型",
		noProjectPrompt: "暫無可用項目，請進入數據開發平台配置相關信息！",
		noUserInDmo: "您尚未進入數據開發平台進行同步賬號，請先進入【數據開發平台】进行初始化。",
		noDataSourcePrompt: "該項目還沒有配置對應的數據源。",
		chooseProject:"請選擇一個項目。",
		ProjectName: "項目",
		type: "類型",
		database: "數據庫",
		labelModel: "標籤模型",
		actOnTheSameDatabase: "衕時修改噹前主題中其他衕源數據錶",
		schema: "方案",
		dbschema: "模式",
		table: "表",
		customSql: "自定義",
		chooseProject: "請選擇一個項目",
		chooseEntityType: "請選擇項目下類型。",
		chooseDatasource:"數據源不能為空。",
		chooseSchema:"請選擇數據源的模式。",
		
		/**
		 * 无代码统计卡片
		 */
		refreshChart:"刷新圖表",
		editChart:"編輯圖表",
		filter:"過濾",
		delete:"刪除",

		noModelerLicense: "當前系統沒有【輕建模】模塊的使用許可，請於系統管理員聯繫。",
		nonSupportModeler: "當前版本不支持【輕建模】模塊，請與系統管理員聯繫。",
		dataTableModel: "數據表模型",
		metricModel: "指標模型",
		unableSelectMetricModel: "輕建模指標模型不允許與其他類型的數據表同時存在，當前已存在其他類型的數據表，無法添加指標模型。",
		unableSelectOtherDataTable: "輕建模指標模型不允許與其他類型的數據表同時存在，當前已存在指標模型，無法添加其他類型的數據表。",
		selectADppModel: "請選中一項模型。",
		selectDataTableModel: "選擇數據表模型",
		selectMetricModel: "選擇指標模型",
		existMetricModel: "當前數據準備中已存在指標模型，請刪除已創建的指標模型再新建數據表。",
		noAuthorizedModelTip: "暫無可選擇的模型"+"<br/>現在去輕建模",
		gotoQingModeler: "新建模型",
		qing_modeler: "輕建模",

		confirmExit: "檢測到您有更改內容，是否不保存直接退出？若不保存，將丟失這些更改。",
		sureExit: "直接退出",
		sureReturn: "返回編輯",

		permLabelManage: "權限標簽管理"
	});
	
	oPackage = com.kingdee.bos.qing.linkage;
	oManager.registPackageResources(oPackage, 
	{
		navigationSetting: "單據聯查設置",
		noNavigationTarget: "數據模型中沒有引用任何“業務實體”，所以無法進行單據聯查的設置。",
		showMorePages: "顯示更多頁面",
		whatsLayoutPage: "顯示基於實體的“佈局頁面”",
		failToLoadSchema: "加載方案失敗。",
		failToTemporarySchema: "暫存方案失敗。"
	});
})();