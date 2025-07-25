(function()
{
	var oManager = com.kingdee.bos.qing.framework.common.MultilanguageManager;
	var oPackage = com.kingdee.bos.qing.timedpush;
	oManager.registPackageResources(oPackage, 
	{
		//邮件
		Email: "郵件",
		nameRuleEmpty: "請輸入郵箱名稱",
		scheduleEmpty: "請輸入推送時間",
		senderEmpty: "請輸入發件郵箱",
		receiversEmpty: "請輸入收件郵箱",
		receiversFormatError: "收件郵箱格式不正確",
		receiversTooLong: "收件郵箱不能超過2000個字符",
		contentTooLong: "郵件正文不能超過65535個字符",
		emailNameEmpty: "請輸入名稱",
		emailNameTooLong: "長度不能超過100個字符",
		smtpHostEmpty: "请输入郵箱服務器",
		smtpHostTooLong: "郵箱服務器不能超過100個字符",
		sendTypeEmpty: "請輸入郵件發送方式",
		accountEmpty: "請輸入郵箱地址",
		accountFormatError: "郵箱地址格式不正確",
		accountTooLong: "郵箱地址不能超過100個字符",
		pwdEmpty: "郵箱密碼/授權碼不能為空",
		pwdTooLong: "郵箱密碼/授權碼不能超過100個字符",
		nameFixed: "固定名稱",
		nameDate: "名稱-系統日期",
		nameSerial: "名稱-流水號",
		nameDateStr: "#1-系統日期",
		nameSerialStr: "#1-流水號 起始值：#2，步長：#3",
		nameEmpty: "請輸入名稱",
		nameTooLong: "長度不能超過100個字符",
		pleaseSelectRule: "請選擇規則",
		pleaseSelectTheDateFormat: "請選擇日期格式",
		serialStartValueEmpty: "流水號起始值不能為空",
		serialStartValueBeNum: "流水號起始值必須為自然數",
		serialStepSizeEmpty: "流水號步長不能為空",
		serialStepSizeBeNum: "流水號步長必須為正整數",
		sendersManager: "郵箱管理",
		emailName: "郵件名稱",
		emailNameEdit: "編輯郵件名稱",
		pushSchedule: "推送頻率",
		pushScheduleEdit: "編輯推送時間",
		senderEmail: "發件郵箱",
		receiverEmails: "收件郵箱",
		receiverEmailsTips: "多個郵箱可用逗號或分號分隔",
		rName: "名稱",
		rule: "規則",
		smtpHost: "郵箱服務器",
		sendType: "郵件發送方式",
		emailAccount: "郵箱地址",
		emailPwd: "郵箱密碼/授權碼",
		targetEmail: "目標郵箱",
		clickTableToSelectRow: "請點擊表格選中行",
		connectedSuccessfully: "連接成功",
		errorLoading: "加載出錯",
		saveSuceess: "保存成功。",
		addRow: "新增行",
		deleteRow: "刪除行",
		testConnect: "測試連接",
		emailContent: "郵件正文",
		dateFormat: "日期格式",
		seria: "流水號",
		startValue: "起始值",
		stepSize: "步長",
		emailSenderManager: "郵箱設置",
		emailSenderNameRepeat: "名稱'#1'出現多次，請勿重復",
		yes: "是",
		no: "否",
		noData: "暫無相關數據",
		noSearchData: "沒有符合搜索條件的結果",
		source: "來源",
		viewPushDetails: "推送記錄",
		emailDelTips: "刪除該記錄后將同時清空該記錄下生成的所有推送明細數據，確定刪除該記錄嗎？",
		isSSL: "是否SSL",
		port: "端口",
		emailSchedulePushManager: "郵件定時推送管理",
		schedulePushManager: "定時推送管理",
		managerBtn: "郵件定時推送管理",
		emailSchedulePush: "郵件定時推送",
		isSSLEmpty: "是否SSL不能為空",
		portEmpty: "請輸入端口",
		portMustNum: "端口必須為正整數",
		portTooLong: "端口不能超過6位正整數",
		on: "開啟",
		off: "暫停",
		emailPushEdit: "編輯郵件定時推送",
		scheduleDetails: "推送明細",
		createTime: "生成時間",
		PushCreateTime: "創建時間",
		DESC: "降序",
		ASC: "昇冪",
		pushName: "名稱",
		searchPushContent: "蒐索推送名稱",
		emailPublishedDelTips: "刪除該記錄后將無法恢復，確認刪除該記錄嗎？",
		scheduleOnOff: "啟用狀態",
		enabled: "啟用",
		open: "打開",
		anonymousView: "匿名查看",
		loading: "加載中",
		sendEmailsStatus: "推送狀態",
		sendEmailsStatusSuccess: "成功",
		sendEmailsStatusFail: "失败",
		sendEmailsStatusPartSuccess: "部分成功",
		clickToViewFailInfo: "失敗信息",
		sendEmailsInvalidReceiversException: "部分收件郵箱推送失敗，請仔細核實收件郵箱，推送失敗的收件郵箱有：#1",
		publishSourceSubjectNotExist: "原業務主體不存在或已被刪除",
		publishSourceDashboardNotExist: "原儀錶板不存在或已被刪除",
		sendEmailsSenderException: "發件郵箱配置有誤，請重新配置。",
		sendEmailsOtherException: "其他錯誤：#1",
		notFindExceptionLog: "未找到相應的信息。",
		sourceIsPublishNoPermissionOrNotFound: "原發布不存在或未授權",
		sourceIsPublishAndNoPermission: "原發布未授權。",
		connectedFail: "連接郵箱失敗：",
		insufficientSchedulingTimes: "調度次數不足",
		themeFileSizeLimit: "輕存儲空間不足。",
		qingStorageNoSpace:"磁盤空間不足，請聯繫運維人員添加磁盤。",
		noQingModelerLicense: "當前系統沒有【輕建模】模塊的使用許可，請與系統管理員聯繫",
		noModelerPermission: "尚未獲得數據表模型的數據權限。",
		connectEmail: "正在連接郵箱",
		lackDataEntityAuthority: "尚未獲得實體數據表的查看權限",
		noAuthorityForTheseEntities: "尚未獲得以下實體數據表的查看權限：",
		entityNotSupportQingAnalysis: "業務實體未開啟“支持輕分析”設置項，請在開發平台的對應表單中進行設置  ",
		notSupportQingAnalysis: "以下業務實體尚未開啟“支持輕分析”設置項:",
		pushError: "推送失敗",
		warningRuleNotExist: "預警規則不存在",
		saveWarningRuleTips: "預警規則不存在，請重新選擇或刪除。",
		warningRuleUnMatched: "不滿足預警規則",
		warningRule: "預警規則",
		warningRuleEdit: "編輯預警規則",
		warningRuleTips: "請選擇預警規則",
		selectedWarningRule: "已選擇預警規則",
		TheWarningRuleNotExist: "預警規則#1不存在",
		cronErrorMessage: "請輸入表達式。",

		emptySearchTips: "沒有符合搜索條件的結果",
		emptyPublish: "暫無發佈記錄",
		operate: "操作",
		edit: "編輯",
		del: "刪除",
		publishName: "名稱",
		publishPath:"發佈路徑",
		selectPublishPath: "請選擇發佈路徑",
		publishSuccess: "發佈成功",
		publishManage: "發布管理",

		permission: "授權",
		selectNoRole: "尚未選擇角色",
		selectMultiRole: "已選擇#1等#2个角色",
		selectSingleRole: "已選擇角色#1",
		selectNoUser: "尚未選擇用戶",
		selectMultiUser: "已選擇#1等#2个用戶",
		selectSingleUser: "已選擇用戶#1",
		confirmClearAuthority: "確定清空授權？",
		description: "描述",
		noDescFornow: "暫無描述",
		displayStyle: "呈現方式",
		displayStyleThumbnail: "縮略圖",
		displayStyleExecute: "立即執行",
		editThumbnailAndSchedule: "編輯縮略圖和更新策略",
		editThumbnailAndSchedule: "查看縮略圖和編輯更新策略",
		thumbnail:"縮略圖",
		creatThumbnail: "生成縮略圖",
		creatThumbnailForAnalysis: "點擊這裡為您的分析創建縮略圖",
		updateStrategy: "更新策略",
		disposableExtract:"不更新",
		timingExtract:"定時更新",
		loadingSquareImg:"正在創建縮略圖...",
		selectPath: "請選擇發佈路徑",
		imgHasBeenDeleted: "“縮略圖”引用的圖片已被删除，請重新設定。",
		inLoadTip: "正在生成縮略圖，請稍後重試。",
		
		authorizedPersion: "授權成功人數：",
		authorizationFailures: "授權失敗人數：",
		detailOfFailures: "獲取以下用戶移動輕應用用戶信息失敗，請先同步移動輕應用賬號：",
		connectImageServerFail:"當前服務器無法連接雲端服務器，縮略圖調度更新功能無法正常使用。",
		
		bottomAnnotation: "底部備註",
		carryData:"以後不再更新數據",
		refreshData:"更新數據",
        notRefreshData:"不再更新數據",
		landscapeDefault:"默認橫屏打開",
		addToHomepage:"添加到當前用戶首頁",
		
		layoutType:"展示模式",
		mobilePreview: "移動預覽",
		standard: "標準",
		fitWidth: "適應寬度",
		fitHeight: "適應高度",
		fitScreen: "適應屏幕",
		
		publishSourceColons: "發佈來源：",
		descriptionColons: "描述：",
		permissionColons: "授權：",
		isCarryDataColons: "以後不再更新數據：",
		
		//群组机器人定时推送
		pushNameCanNotEmpty: "請輸入推送名稱。",
		pushNameToLong: "長度不能超過50個字符。",
		pushTimeCanNotEmpty: "請輸入推送時間",
		webhookCanNotEmpty: "請輸入群組機器人Webhook地址",
		webhookTooMuch: "Webhook地址不可超过5个。",
		successToSaveConfig: "保存配置信息成功",
		failToSaveConfig: "保存配置信息失敗。",
		pushManagement: "定時推送管理",
		failToLoadPushRecord: "獲取推送記錄失敗。",
		pushName: "名稱",
		systemDate: "系统日期",
		pushTime: "推送頻率",
		whatsWebhook: "群組管理員添加群組機器人后，即可查看群組機器人的Webhook地址。操作管道請參攷",
		enterWebhook: "請輸入群組機器人Webhook地址，多個地址可用英文分號分隔，最多可輸入5個",
		describe: "描述",
		thumbnail: "縮略圖",
		editSchedule: "編輯更新策略",
		nameFixed: "固定名稱",
		nameRule: "規則",
		dateFormat: "日期格式",
		schedulePushManage: "定時推送管理",
		editSchedulePush: "編輯定時推送",
		close: "關閉",
		pushFrom: "來源",
		scheduleEnable: "啟用狀態",
		operation: "操作",
		pushRecord: "查看推送記錄",
		editPushConfig: "編輯",
		DeletePushConfig: "刪除",
		confirmDeleteTheConfig: "删除該記錄後將同時清空該記錄下生成的所有推送明細數據，確定删除該記錄嗎？",
		failToChangScheduleState: "修改狀態失敗。",
		failToGetPushRecord: "獲取推送信息失敗。",
		successToEditConfig: "編輯定時推送配置成功。",
		failToEditConfig: "編輯定時推送配置失敗。",
		operateConfirm: "確認操作",
		pushRecord: "推送記錄",
		pushState: "推送狀態",
		pushFailure: "失敗",
		someFailure: "部分失敗",
		unPush:"未推送",
		pushSuccess: "成功",
		errorDetail: "詳情",
		deletePushRecord: "删除",
		confirmDeleteRecord: "刪除該記錄後將無法恢復，確定刪除該記錄嗎？",
		successToDeletePushRecord: "刪除推送記錄成功.",
		failToDeletePushRecord: "刪除推送記錄失敗。",
		sendErrorDetail: "失敗詳情",
		errorWebhook: "部分Webhook定時推送失敗",
		allWebhookFailure: "全部Webhook定時推送失敗",
		errorCode: "狀態碼",
		errorMsg: "狀態信息",
		successToSaveConfigInfo: "保存配置信息成功。",
		errorMsg: "錯誤信息：",
		errorCode: "錯誤碼：",
		onlyOneWebhook: "目前僅支持單壹群組推送",
		webhookToLong: "Webhook地址過長，請檢查地址是否正確",
		descToLong: "長度不能超過100個字符",
		successToDeletePushConfig: "刪除推送配置信息成功。",
		failToDeletePushConfig: "刪除推送配置信息失敗。",
		failToDeleteAnalysis: "網絡連接異常，刪除分析失敗。",
		webhookWrongFormat: "Webhook地址格式錯誤",
		pushTarget: "推送目標",
		user: "用戶", 
		group: "群組",
		enterUserId: "請輸入用戶id，多个用戶id用英文逗號分割",
		enterGroupTag: "請輸入粉絲分組id，多个分組id用英文逗號分割",
		canNotBeEmpty: "不能為空",
		inputTooLong: "長度不能超過#1個字元",
		illegalGroupInput: "群組只能輸入數字和英文逗號",
		corpId: "企業ID",
		editPushInfoItem: "編輯推送信息",
		editPushContentItem: "編輯推送方案",
		sourceHadBeDelete: "該#已被刪除",
		dingdingPushNotSupport: "釘釘定時推送功能正在研發中，敬請期待。", 
		missionCloudPushNotSupport: "輕分析移動端支持推送到美信云，但當前系統未集成美信云。",
		wxqyhPushDisable: "當前環境暫未配置企業微信，請聯繫管理員配置后使用",
		missionCloudPushDisable: "當前環境暫未配置美信云，請聯繫管理員配置后使用",
		missionCloud: "美信云",
		enterpriseWeChat: "企業微信",
		dingding: "釘釘",
		cloudHub: "云之家",
		"4300108": "調度次數不足",
		"4300106": "網絡連接失敗，請檢查網絡",
		"4300104": "發送請求失敗",
		"4300103": "發送消息失敗",
		"1001013": "機器人已被移除",
		"4300114": "部分推送失敗",
		dashboardDeleted: "該儀錶板已刪除",
		pushImmediately: "立即推送",
		sendMessageError: "機器人發送消息失敗，請檢查機器人webhook地址知否正確。",
		entityNotEnableQingAnalysis: "業務實體未開啟“支持輕分析”設置項，請在開發平台的對應表單中進行設置  ",
		viewDocument: "查看幫助文檔",
		notSupportQingAnalysis: "以下業務實體尚未開啟“支持輕分析”設置項:",
		semicolon: "；",
		pushImmediatelySuccess: "推送成功。",
		tryCancelPush: "嘗試取消推送",
		pushing: "推送中",
		pushConfirm: "推送確認",
		mobileApplicationGroup: "移動應用群組",
		
		publishSource: "發佈來源",
		subject: "業務主題",
		dashboard: "儀錶板",
		bill: "單據",
		control: "控件",
		report: "賬表",
		extreport: "輕報表",
		qReport: "報表",
		subjectDeleted: "該業務主題已删除",
		ButtonMessageAfterSubjectDeleted: "該業務主題已被刪除，無法啟動推送配置",
		dashboardDeleted: "該儀錶板已刪除",
		ButtonMessageAfterDashboardDeleted: "該儀表板已被刪除，無法啟動推送配置",
		warningRuleInvalidTips: "預警規則不存在",
		ButtonMessageAfterWarningRuleInvalidTips: "預警規則不存在，無法啟動推送配置",
		permissionRolesText: "角色#1個",
		permissionUsersText: "用戶#1個",
		permissionNoRoleAndUserText: "未選擇角色或用戶",
		permissionRolesAndUsersText: "角色#1個，用戶#2個",
		roleAndUserNames: "角色：#1，用戶：#2",
		roleNames: "角色：#1",
		userNames: "用戶：#1",
		presetDivide: "預 置",
		preset: "預置",
		
		editPublishInfoItem: "編輯發佈信息",
		editPublishContentItem: "編輯發佈方案",
		allType: "全部類型",
		moduleLonger: "數據分析",
		moduleSquare: "數據斗方",
		searchContent: "請輸入搜索內容",
		sort: "排序",
		lapp:"移動輕應用",
		setting: "設置",

		publishNameNotEmptyTip: "請輸入發佈名稱。",
		NameAndDesAndAnnoCanNotExceedLimit50Tip: "發布名稱、描述長度和底部備注長度不能超過50個字符。",
		NameAndDesCanNotExceedLimit50Tip: "發布名稱、描述長度不能超過50個字符。",
		NameAndAnnoCanNotExceedLimit50Tip: "發布名稱、底部備注長度不能超過50個字符。",
		DesAndAnnoCanNotExceedLimit50Tip: "描述長度、底部備注長度不能超過50個字符。",
		publishNameTooLongTip: "發佈名稱長度不能超過50個字符。",
		publishPathNotEmptyTip:"請輸入發佈路徑。",
		descriptionCanNotExceedLimit50Tip: "描述長度不能超過50個字符。",
		bottomAnnotationCanNotExceedLimit50Tip: "底部備注長度不能超過50個字符。",

		openIdNull:"獲取雲之家信息失敗",
		lappUserIdNullTips: "獲取輕應用用戶資訊失敗，請聯系管理員同步用戶資訊。操作管道請參攷",
		helpDocument: "幫助文檔",
		lappUserIdNullDDTips: "獲取輕應用用戶信息失敗，請您在釘釘移動端的星空輕應用中綁定用戶信息，操作管道請參攷",
		lappUserIdNull:"獲取輕應用用户信息失敗",
		CLoudHubUnavailable: "雲之家未啟用，暫無法使用該功能",
		datacenter: "數據中心",
		datacenterName: "數據中心名稱",
		datacenterNameCanNotEmpty: "數據中心名稱不能為空。",
		datacenterNameToLong: "數據中心名稱不能超過50個字符。",
		modifyDatacenterName: "修改數據中心名稱",
		datacenterSyncFailed: "數據中心未同步成功，",
		clickToSync: "點擊手動同步",
		syncDatacenterSuccess: "數據中心同步成功",
		syncDatacenterFail: "數據中心同步失敗，請稍後重試",
		syncLappRoles: "壹鍵同步所有角色",
		setting: "設置",
		synchronizationCompleted: "同步完成",
		datacenterHelpIconTips: "指定在輕分析移動輕應用中切換數據中心時數據中心的顯示名稱 ",
		rolesHelpIconTips: "由於發布到“移動輕應用”的發布項本身的特殊性，僅在發布當時記錄下用戶信息（角色統壹轉換成用戶）。當系統中角色所包含的用戶發生變化，可在此處刷新授權。",
		getLappUserFail: "獲取以下#1個用戶的移動輕應用用戶信息失敗，請先同步移動輕應用賬號：",
		updateLappRolesSucess: "已成功更新以下#1個角色：",
		noUpdateLappRoles: "沒有已授權的角色，本次同步未對角色進行更新",
		viewDetails: "查看幫助文檔",
		lappManager: "移動輕應用管理",
		defineLappOrder: "移動辦公平臺配置",
		defineLappOrderDesc: "已配置的移動辦公平臺",
		publishConfigHelpIconTips: "可定義發布到移動輕應用時，移動辦公平臺的顯示順序，還可添加移動辦公平臺 ",
		configuredLappTips: "當系統配置多個移動辦公平臺時，可通過上移按鈕定義發布到移動輕應用時，移動辦公平臺的顯示順序，調整後，發布時默認使用第一個已同步用戶信息的移動辦公平臺",
		addLapp: "添加移動辦公平臺",
		lappNull: "請先配置移動辦公平臺。",
		thirdPartyConfig: "編輯移動辦公平臺",
		appId: "移動辦公平臺ID",
		userIndentity: "用戶標識",
		userName: "用戶名",
		phone: "手機號",
		email: "電子郵箱",
		appIdTooLong: "移動辦公平臺ID不能超過50個字符。",
		appIdEmpty: "請輸入移動辦公平臺ID。",
		appIdNotFound: "請根據配置文檔輸入正確的移動辦公平臺ID。",
		appIconEmpty: "請上傳移動辦公平臺圖標。",
		appIdHelpTips: "輕分析產品研發團隊頒發的移動辦公平臺ID，詳情請參考配置文檔",
		appIcon: "移動辦公平臺圖標",
		userIndentityHelpTips: "構建單點登錄鏈接時使用的用戶標識類型，詳情請參考配置文檔",
		uploadIconHelpTips: "建議上傳長寬比為8:3的圖片",
		uploadImage: "點擊上傳圖片",
		uploadSuccess: "上傳成功",
		move: "上移",
		thirdpartyConfigDelTips: "僅刪除該移動辦公平臺的配置信息，在此移動辦公平臺上的發布記錄將會保留，確認刪除嗎？",
		deletePublishInfo: "同時刪除發布信息",
		downloadThirdpartyConfigFile: "點擊下載  輕分析集成移動辦公平臺配置文檔",
		fileNotImage: "保存配置信息失敗，該文件類型不是圖片。",
		resourceLimit: "保存配置信息失敗，輕存儲空間不足。",
		
		//推送失败
		2100001: "磁盤空間不足，請聯繫運維人員添加磁盤",
		2101001: "業務主題被刪除了",
		2101002: "對應主題沒有定義數據",
		2101003: "對應主題沒有定義數據",
		2101004: "對應主題沒有定義數據",
		2101005: "對應主題沒有定義數據",
		2101006: "尚未獲得實體數據表的查看權限",
		2101009: "數據源發生異常",
		2101010: "輕存儲空間不足",
		2101011: "數據源對應胡數據庫連接異常",
		2101012: "沒有數據中心權限，請聯繫管理員分配權限",
		2101013: "數據表被破壞",
		2101014: "數據表被破壞",
		2101015: "發佈人沒有數據中心權限，請聯繫發佈人檢查權限",
		2103001: "發佈不存在",
		2103002: "儀錶板引用的原發布不存在",
		2106001: "儀錶板被刪除了",
		2301013: "找不到引用的地圖模板，無法推送.",
		//钉钉的错误码
		310000: "消息內容不包含關鍵詞或者IP地址不在白名單內，請檢查釘釘機器人的安全設置",
		confirmPushImmediately: "即將推送“#1”至#2，確定推送嗎？",

		semicolon: "；",
		publishNoOperAuthException: "沒有操作權限。",

		//输入发布名称时支持联想历史名称
		HistoryPublishName: "歷史發佈名稱",
		duplicateName: "發佈路徑下已存在相同的發佈名稱。",

		//定时管理界面优化
		total: "共",
		row: "行",
		pushRecordDetailSet: "推送明細設置",
		totalFileSize: "總文件大小：",
		chooseDelPushRecord: "請選擇要刪除的推送記錄。",
		pushRecordDelTips: "刪除記錄后將無法恢復，對應時間點推送的數據內容將無法查看，確定刪除選中記錄嗎？",
		day: "天",
		week: "周",
		month: "月",
		quarter: "季度",
		year: "年",
		allPushDetailTip: "確定保留所有的推送明細嗎?若保存設置,可能會導致生成大量的定時推送數據文件",
		saveRecentTip: "確定保留最近",
		savePushDetailByTimeTip: "的推送明細嗎？若保存設置，其他推送明細將會被刪除",
		savePushDetailByNumTip: "條推送明細嗎？若保存設置，其他推送明細將會被刪除",
		eachPushSet: "針對每個推送設置：",
		saveAllPushRecord: "保留所有的推送明細(不推薦)",
		saveAllPushRecordSuggestion: "保留所有的推送明細可能會導致生成大量的定時推送數據文件,建議只保留部分推送明細.",
		saveRecent: "保留最近",
		pushOfRecord: "的推送明細",
		pushRecordItem: "條推送明細",
		savePushDetailConfigInfo: "正在保存推送明細設置",
		emailPushStorageSetError: "郵件的推送明細設置失敗。",
		emailPushStorageSetSuccess: "郵件推送明細設置保存成功",
		fileSize: "文件大小",
		updateSuccess: "修改成功。",
		deleteSuccess: "删除成功。",
		confirmToDelPublish: "删除該記錄後將無法恢復，確定删除該記錄嗎？",
		yzj: "云之家",
		enterPriseWx: "企業微信",
		mxy: "美信云",
		pushStorageSetError: "的推送明細設置失敗。",
		pushStorageSetSuccess: "的推送記錄存儲配置信息設置成功",
		pushDetailSetSuccess: "推送明細設置保存成功。",
		deleteNotEmpty: "請先刪除目錄下的發佈記錄。",

		//邮件定时推送添加高级设置
		advanceSetting: "高級設置",

		publishSetting: "發布設置：",
		preview: "預覽",
		configPermLabel: "設置權限標簽",
		selectPublish: "請選擇發布記錄。",
		settingSuccess: "設置成功。",
		publishDeleteTips: "删除記錄後將無法恢復，確定删除嗎？",
		permLabelCount: "權限標簽#1個",
		noAuthTarget: "未選擇授權目標",
		deleteNotEmpty: "請先刪除目錄下的發佈記錄。",
		mobileOfficePlatform: "移動辦公平臺"
	});
})();