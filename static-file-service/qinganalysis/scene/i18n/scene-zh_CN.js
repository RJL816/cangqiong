(function()
{
	var oManager = com.kingdee.bos.qing.framework.common.MultilanguageManager;
	var oPackage = com.kingdee.bos.qing.scene;
	oManager.registPackageResources(oPackage, 
	{
		ERPCloudEntity: "金蝶云苍穹",
		bussinessEntity:"业务实体",
		dataCenter: "当前数据中心",
		selectEntity:"选择实体",
		saveSuccess: "保存成功。",
		save: "保存",
		
		fullScreen: "全屏显示",
		exitFullScreen: "退出全屏",
		toAppMenu: "发布到应用菜单...",
		toAnalysisCenter: "发布到数据工作台阅览夹...",
		toMobile: "发布到移动轻应用...",
		toCardRepository: "发布到卡片库...",
		timedPush: "定时推送",
		yzjCommunicate: "云之家沟通...",
		emailSchedulePush: "邮件定时推送...",
		mobileSchedulePush: "移动端定时推送",
		resourceFileLimit: "保存失败，轻存储空间不足。",
		publishTo: "发布",
		publishManager: "发布管理",
		pushManager: "定时推送管理",
		manager: "管理",
		closeTab: "退出",
		refresh : "数据更新",
		sysPublishScheme: "系统默认方案",

		category: "分类",
		SchemeSynced: "同步与另存",
		TPSourceColons: "推送来源：",
		SyncSchemaToDSB: "同步回原仪表板",
		SyncSchemaToNewDSB: "另存为新仪表板",
		SyncSchemaPublishConfirm: "同步后，当前仪表板内容将会覆盖发布来源，确定同步吗？",
		SyncSchemaPublishRefuse: "正在编辑该发布记录对应的发布来源，请先关闭发布来源页面再进行同步操作。",
		SyncSchemaPublishDeleted: "该发布记录对应的发布来源已删除，无法进行同步操作。",
		SyncSchemaPublishLogDeleted: "该发布记录已被删除，无法进行同步操作。",
		SyncSchemaTPLogDeleted: "该推送记录已被删除，无法进行同步操作。",
		SyncSchemaTPConfirm: "同步后，当前仪表板内容将会覆盖推送来源，确定同步吗？",
		SyncSchemaTPRefuse: "正在编辑该推送记录对应的推送来源，请先关闭推送来源页面再进行同步操作。",
		SyncSchemaTPDeleted: "该推送记录对应的推送来源已删除，无法进行同步操作。",
		duplicateDSBNameInCategory: "该分类下存在同名仪表板。",
		SyncSchemaToNewDSBCategoryDeleted: "新仪表板的分类不存在或已被删除",
		themeName: "名称",
		description: "描述",
		publishSourceColons: "发布来源：",

		noEditCurtain: "仪表板内容没有修改",
		noContentChange: "内容没有修改",
		saveDsbSuccess: "保存仪表板成功。",
		failToSaveDsb: "保存仪表板失败。",
		failToLoadDsb: "加载仪表板内容失败",
		noWidgets: "仪表板没有内容。",
		extractDataFailToRefresh: "准备数据失败，请刷新出数据再进行该操作。",
		dsbIsDeleted: "对应仪表板不存在或已被删除",
		
		dataAnalysis: "数据分析",
		saveAndBack: "保存并返回",
		reset: "重置",
		resetAndBack: "重置并返回",
		resetAndExit: "重置并退出",
		resetConfirmTips: "您确定要重置到发布最初始的状态，并退出吗？",
		failToLoadRefContent: "加载引用內容失败。",
		dsbContentParseError: "仪表板模型内容转换失败。",
		refContentParseError: "引用模型内容转换失败。",
		saveRefContentSuccess: "保存引用模型内容成功",
		resetRefContentSuccess: "重置引用模型内容到发布状态成功。",
		
		//data
		themeHasBeenDeleted: "对应主题不存在或已被删除",
		noOperationPermissions: "没有操作权限",
		noDBCenterPermission: "没有数据中心权限，请联系管理员分配权限。",
		noSuperQueryAuth: "没有当前超级查询模式的权限，请联系管理员分配权限",
		tooManyTablesSelectFieldOneEntityError: "当前实体关联的数据表过多，请反选不需要的字段。",
		tooManyTablesSelectFieldMoreEntityError: "当前实体关联的数据表过多，请在右侧反选不需要的分析字段，或在左侧删除不需要的实体分录。",
		noDBCenterOwnerPermission: "发布人“#1”没有数据中心权限，请联系发布人检查权限",
		noSuperQueryPerm: "发布人“#1”没有超级查询相关模式的权限，请联系发布人检查权限",
		notExistTable: "无法在模式“#1”中找到该实体数据表",
		ownerNotExistTable: "数据源异常，请联系发布人检查数据源",
		chartExpired: "图表信息已过期",
		noDmoOwnerPermission: "发布人“#1”没有数据开发平台权限，请联系发布人检查权限",
		noDmoPermission: "没有数据开发平台权限，请联系管理员分配权限。",
		dmoPermission: "没有数据开发平台#1权限，请检查数据开发平台权限",
		app: "应用",
		chooseApp: "请选择一个应用",
		chooseAppCurtain: "请选择一个应用。",
		loadAppNameError: "获取应用名称失败。",
		presetDMTips: "预置的主题不允许保存，如有需要，可复制后再进行操作。",
		
		//card-error
		themeIsDeleted: "对应主题不存在或已被删除",
		themeHasNoData: "对应主题没有定义数据",
		lackDataEntityAuthority: "尚未获得实体数据表的查看权限",
		haveNotGetDataEntityAuthority: "尚未获得实体数据表的查看权限",
		subjectEntityMySQLMoreThan61Table: "当前实体关联数据表太多，请减少实体的分析字段或删除不需要的实体分录",
		lackDataAuthority: "没有该业务单据的查看权限",
		extractDataFail: "准备数据失败",
		errorLog: "错误日志",
		errorCode: "错误码：",
		showErrorLog: "显示错误日志",
		cardHasNotFound: "该卡片已被删除",
		cardNoAuthority: "没有该卡片的查看权限",
		componentSourceHasNotFound: "该组件来源已被删除",
		componentSourceNoAuthority: "没有该组件来源的查看权限",
		subjectDataSourceError: "数据源发生异常",
		subjectDBDataSourceError: "数据源对应的数据库连接异常",
		unsupportedDsbRefSource: "当前系统不支持该组件来源",
		qingStorageFileSizeLimit: "轻存储空间不足",
		qingStorageNoSpace:"磁盘空间不足，请联系运维人员添加磁盘",
		illegalLicense: "当前系统没有【轻分析】模块的使用许可，请与系统管理员联系。",
		noQingModulePermission: "您所使用的账户没有被分配【轻分析】模块的使用许可，请与系统管理员联系。",
		illegalQingReportLicense:"当前系统没有【轻报表】模块的使用许可，请与系统管理员联系。",
		noQingReportModulePermission:"您所使用的账户没有被分配【轻报表】模块的使用许可，请与系统管理员联系。",
		noMoreQingConcurrent: "【轻分析】模块的当前使用人数已超过【轻分析】许可并发数。",
		replicatedLogin: "您的账号在其他地方登录，请重新登录当前系统。",
		qingRuntimeException: "程序发生错误",
		unknownException: "发生了未知错误",
		executeFail: "图表执行失败",
		entityDestroyed:"对应主题的数据表被损坏",
		permissionTitle: "权限提示",
		entityNotSupportQingAnalysis: "业务实体未开启“支持轻分析”设置项，请在开发平台的对应表单中进行设置  ",
		viewDocument: "查看帮助文档",
		DetailInfo: "详细信息",
		notSupportQingAnalysis: "以下业务实体尚未开启“支持轻分析”设置项：",
		notSupportQingAnalysisTip: "以下业务实体尚未开启“支持轻分析”设置项，请在开发平台的对应表单中进行设置  ",
		noAuthorityForTheseEntities: "尚未获得以下实体数据表的查看权限：",
		unsetCardSource: "请选择卡片来源",
		extreportNotFound: "该报表不存在或已被删除",
		serverBusy: "当前服务器繁忙，请稍后重试。",
		
		//card-exhibition
		cardEdit: "编辑卡片",
		cardGotoAnalysis: "进入分析",
		cardRefresh: "刷新",
		cardMoreOperate: "更多",
		cardFilter: "过滤条件",
		cardEditUnaccessable: "您没有#1的权限",
		enterEdit: "进入设计器",
		enterAnalysis: "进入“数据分析”",
		analysisIntoDesigner: "进入“数据分析”工具个性化修改",
		squareIntoDesigner: "进入设计器个性化修改",
		squareOpenAnalysis: "打开“数据分析”工具",
		fullScreenBtn: "全屏",
		landscapeBtn: "横屏",
		verticalScreenBtn: "竖屏",
		lappFilter: "过滤",
		
		//card
		selectCard: "选择要复制的卡片",
		noModeling: "该卡片对应的主题没有进行数据准备，卡片无法使用。",
		noTheme: "该卡片对应的主题已被删除，卡片无法使用。",
		failToloadCardContent: "加载卡片方案失败。",
		chooseImportCard: "请选择要引入的卡片。",
		fromCardLibrary: "从卡片库复制方案",
		
		//邮件
		anonymousViewTips: "您正在以匿名方式查阅当前轻分析内容",

		cardNoDefaultSchema: "该卡片没有定义默认方案",
		
		//dashboard
		finish: "完成",
		presetDsbTips: "预置的仪表板不允许保存、发布等操作，如有需要，可复制后再进行操作。",
		preset: "预置",

		//error
		errorBtn: "显示错误日志",
		viewDetails:"查看详情",
		
		systemMapCanNotEdit: "系统地图不允许直接修改，若需修改地图模板，请复制后再进行修改。",
		
		//编辑发布
		editPublishedContent: "编辑发布方案-",
		
		//编辑推送
		editTimedPushContent: "编辑推送方案-",
		editSchemaNotFound: "方案已被删除",
		emailConfigNotFound: "该推送配置已被删除",
		
		noEditMap: "未修改，不需要保存。",
		saveMapSuccess: "保存地图成功。",
		failToLoadMap: "加载地图失败。",
		overSize: "图片大小不能大于20M。",
		fileNotImage: "该文件类型不是图片。",
		failToUploadImg: "上传图片失败。",
		
		noSelectMapTemplate: "请选择地图模板",
		iknow: "我知道了",
		uploadBackgroundImageTips: "正在上传背景图片",
		
		//金蝶多维数据库
		ERPCloudMDD:"金蝶多维数据库",
		ERPCloudMDDApp:"应用",
		ERPCloudMDDsystem:"体系",
		ERPCloudMDDMemberRange:"成员范围",
		selectApp:"请选择应用",
		selectAppCurtain:"请选择应用。",
		selectCube:"请选择体系",
		selectCubeCurtain:"请选择体系。",
		noERPCloudMDDPermission:"没有金蝶多维库权限，请先联系管理员分配权限。",
		ERPCloudMDDOneEntityLimit:"当前主题存在其他的数据表，不允许引入金蝶多维库数据表。",
		ERPCloudMDDExistLimit:"当前主题存在1个金蝶多维库数据表, 不允许引入其他的数据表。",

		selectModel: "选择模型",
		dppSourceName: "轻建模",
		noModelerPermission: "没有轻建模权限，请联系管理员分配权限。",

		/**超级查询**/
		businessEntity: "业务实体",
		schemas: "模式",
		superQuery: "超级查询",
		currentSystem: "当前系统",
		otherSystem: "其它系统",
		noAuthentication: "没有可用的模式，请先联系管理员授权模式。",
		SQNotDeploy: "当前环境未部署超级查询服务或服务未启动，请联系管理员检查超级查询部署情况。",
		noSchemaPerm: "“#1”用户没有“#2”模式的权限，请重新选择模式或联系管理员授权。",

		//analysis
		myLonger: "我的分析",
		presetLonger: "预置分析",
		presetAnalysisTips: "预置的数据分析不允许保存分析方案、发布等操作，如有需要，可复制后再进行操作",
		presetPublishAnalysisTips: "预置的数据分析不允许发布等操作，如有需要，可复制后再进行操作",
		searchBoxPlaceholder: "搜索发布名称",
		//square
		presetSquareTips: "预置的数据斗方不允许保存分析方案、发布等操作，如有需要，可复制后再进行操作",
		operateForbidden: "当前场景不支持该操作",
		//title
		entityNumber: "实体编码",
		entityName: "实体名称",
		
		//应用菜单
		fromAppMenu: "从应用菜单复制方案",
		fromAppMenuRef: "从应用菜单引用",
		noPublish: "暂无发布。",
		failToGetAppMenu: "获取应用菜单失败。",
		selectAppmenu: "选择已发布项",
		publishName: "发布名称",
		publishPerson: "发布人",
		publishTime: "发布时间",
		noData: "暂无记录",
		failToGetPublish: "获取发布失败",
		publishOfSubjectNoModeling: "该发布对应的主题没有进行数据准备，无法使用。",
		publishOfSubjectBeDeleted: "该发布对应的主题已被删除，无法使用。",
		failToGetPublishSchemaList: "获取发布方案列表失败。",
		noSearchData: "没有符合搜索条件的结果",
		
		//仪表板关于信息
		about: "关于",
		publishInformation: "发布信息",
		publisher: "发布人：",
		envInformation: "环境信息",
		dsbUrlInformation: "仪表板链接",
		hasCopied: "已复制到剪贴板",
		copyfailed: "复制失败",
		copy: "复制",
		confirm: "确定",
		
		//db-manage
		dataCenterAppId: "应用编码：#1；应用名称：#2",
		dbmanage: "公共数据源",
		appNotFound: "应用#1不存在或已被删除",
		
		// 加密预置内容许可检测
		noPermission: "尚未获得数据的许可权限。",

		semicolon: "；",
		publishNoOperAuthException: "没有操作权限",

		//查看发布记录时，检查相关信息的错误提示
		ThemeIsDel: "该发布记录的来源被删除",
		publishInfoExist: "发布记录不存在或已被删除",
		notAuthority: "您没有该发布记录的查看权限, 请联系发布人",
		authority: "授权",
		publishPlanExist: "该分析方案不存在或已被删除",
		ISee: "我知道了",

		//云素材
		cannotAccess: "无法访问到云端素材库",
		cannotAccessCloudGallery: "云端素材库为在线图片素材下载中心，访问此页面需要连接到互联网，请检查您的网络环境。",

		/**
		 * 数据开发平台
		 */
		dmo: "数据开发平台",
		noDmoPermission: "没有数据开发平台权限，请联系管理员分配权限。",
		noDmoConfig:"数据开发平台配置不正确，请联系管理员。",
		labelModel: "标签模型",
		noProjectPrompt: "暂无可用项目，请进入数据开发平台配置相关信息。",
		noDataSourcePrompt: "该项目还没有配置对应的数据源。",
		noUserInDmo: "您还未进入数据开发平台进行同步账号，请先进入[数据开发平台]进行初始化。",
		chooseProject: "请选择一个项目。",
		ProjectName: "项目",
		type: "类型",
		database: "数据库",
		labelModel: "标签模型",
		actOnTheSameDatabase: "同时修改当前主题中其他同源数据表",
		schema: "方案",
		dbschema: "模式",
		table: "表",
		customSql: "自定义",
		chooseProject: "请选择一个项目",
		chooseEntityType: "请选择项目下类型。",
		chooseDatasource:"数据源不能为空。",
		chooseSchema:"请选择数据源的模式。",

		/**
		 * 无代码统计卡片
		 */
		refreshChart:"刷新图表",
		editChart:"编辑图表",
		filter:"过滤",
		delete:"删除",

		noModelerLicense: "当前系统没有【轻建模】模块的使用许可，请与系统管理员联系。",
		nonSupportModeler: "当前版本不支持【轻建模】模块，请与系统管理员联系。",

		dataTableModel: "数据表模型",
		metricModel: "指标模型",
		unableSelectMetricModel: "轻建模指标模型不允许与其他类型的数据表同时存在，当前已存在其他类型的数据表，无法添加指标模型。",
		unableSelectOtherDataTable: "轻建模指标模型不允许与其他类型的数据表同时存在，当前已存在指标模型，无法添加其他类型的数据表。",
		selectADppModel: "请选中一项模型",
		selectDataTableModel: "选择数据表模型",
		selectMetricModel: "选择指标模型",
		existMetricModel: "当前数据准备中已存在指标模型，请删除已创建的指标模型再新建数据表。",
		noAuthorizedModelTip: "暂无可选择的模型"+"<br/>现在去轻建模",
		gotoQingModeler: "新建模型",
		qing_modeler: "轻建模",

		confirmExit: "检测到您有更改内容，是否不保存直接退出？若不保存，将丢失这些更改。",
		sureExit: "直接退出",
		sureReturn: "返回编辑",

		permLabelManage: "权限标签管理"
	});
	
	oPackage = com.kingdee.bos.qing.linkage;
	oManager.registPackageResources(oPackage, 
	{
		navigationSetting: "单据联查设置",
		noNavigationTarget: "数据模型中没有引用任何“业务实体”，所以您无法进行单据联查的设置。",
		showMorePages: "显示更多页面",
		whatsLayoutPage: "显示基于实体的“布局页面”",
		failToLoadSchema: "加载方案失败。",
		failToTemporarySchema: "暂存方案失败。"
	});
})();