(function()
{
	var oManager = com.kingdee.bos.qing.framework.common.MultilanguageManager;
	var oPackage = com.kingdee.bos.qing.scene;
	oManager.registPackageResources(oPackage, 
	{
		ERPCloudEntity: "Kingdee cloud cosmic",
		bussinessEntity:"Bussiness entity",
		dataCenter: "DB center",
		selectEntity:"Select entity",
		saveSuccess: "Save success.",
		save: "Save",
		superQuery: "SuperQuery",

		fullScreen: "Full screen",
		exitFullScreen: "Exit full screen",
		toAppMenu: "Publish to App menu...",
		toAnalysisCenter: "Publish to Data workbench...",
		toMobile: "Publish to Mobile light app...",
		toCardRepository: "Publish to Card repository...",
		timedPush: "Timed Push",
		yzjCommunicate: "Cloud hub communicate...",
		emailSchedulePush: "Timed email push...",
		mobileSchedulePush: "Mobile timed push",
		resourceFileLimit: "Failed to save, Qing resource files space is not enough.",
		publishTo: "Publish ",
		publishManager: "Publish manager",
		pushManager: "Push manager",
		manager: "Manager",
		closeTab: "Exit",
		refresh	:"Data update",
		sysPublishScheme: "System default schema",

		category: "category",
		SchemeSynced: "Sync scheme",
		TPSourceColons: "Push source:",
		SyncSchemaToDSB: "Sync to original dashboard",
		SyncSchemaToNewDSB: "Save as new dashboard",
		SyncSchemaPublishConfirm: "After syncing, the current dashboard content will overwrite the publishing source. Are you sure you want to sync?",
		SyncSchemaPublishRefuse: "The release source corresponding to the release record is being edited, please close the release source page before synchronizing.",
		SyncSchemaPublishDeleted: "The release source corresponding to the release record has been deleted and cannot be synchronized.",
		SyncSchemaPublishLogDeleted: "The release source has been deleted and cannot be synchronized.",
		SyncSchemaTPLogDeleted: "The push source has been deleted and cannot be synchronized.",
		SyncSchemaTPConfirm: "After synchronization, the current dashboard content will overwrite the push source. Are you sure you want to synchronize?",
		SyncSchemaTPRefuse: "The push source corresponding to the push record is being edited, please close the release source page before synchronizing.",
		SyncSchemaTPDeleted: "The push source corresponding to the push record has been deleted and cannot be synchronized.",
		duplicateDSBNameInCategory: "A dashboard with the same name exists under this category.",
		SyncSchemaToNewDSBCategoryDeleted: "The category for the new dashboard does not exist or has been deleted",
		themeName: "Name",
		description: "Description",
		publishSourceColons: "Source:",

		noEditCurtain: "Dashboard content has not been modified.",
		noContentChange: "Content has not been modified.",
		saveDsbSuccess: "Save dashboard success.",
		failToSaveDsb: "Failed to save dashboard.",
		failToLoadDsb: "Fail to load dashboard",
		noWidgets: "No Widgets.",
		extractDataFailToRefresh: "Failed to prepare data, Please refresh the data and do this again.",
		dsbIsDeleted: "The dashboard does not exist or has been deleted",
		
		dataAnalysis: "Data analysis",
		saveAndBack: "Save and return",
		reset: "Reset",
		resetAndBack: "Reset and return",
		resetAndExit: "Reset and exit",
		resetConfirmTips: "Are you sure you want to reset to the original state of publish and exit?",
		failToLoadRefContent: "Fail to load reference content.",
		dsbContentParseError: "The dashboard of content parse error.",
		refContentParseError: "The reference of content parse error.",
		saveRefContentSuccess: "Save the reference of content success",
		resetRefContentSuccess: "Reset the reference of content to publish status success.",
		
		//data
		themeHasBeenDeleted: "The theme does not exist or has been deleted",
		noOperationPermissions: "No operation permissions",
		noDBCenterPermission: "No DB center permissions, please contact the administrator to assign permissions.",
		noSuperQueryAuth: "Do not have permission for the current super query schema. Please contact the administrator to assign permissions",
		tooManyTablesSelectFieldOneEntityError: "There are too many data tables associated with the current entity, Please reverse select unnecessary fields.",
		tooManyTablesSelectFieldMoreEntityError: "There are too many data tables associated with the current entity, Please reverse select unnecessary analysis fields on the right, or delete unnecessary entity entries on the left.",
		noDBCenterOwnerPermission: "The publisher '#1' does not have DB center permissions. Please contact the publisher to check the permission",
		noSuperQueryPerm: "The publisher '#1' does not have the permission to super query the relevant schema. Please contact the publisher to check the permission",
		notExistTable: "Unable to find the entity data table in schema \"#1\"",
		ownerNotExistTable: "The data source is abnormal. Please contact the publisher to check the data source",
		chartExpired: "The chart has expired",
		noDmoOwnerPermission: "The publisher '#1' does not have Data dev platform permissions. Please contact the publisher to check the permission",
		noDmoPermission: "No Data dev platform permissions, please contact the administrator to assign permissions.",
		dmoPermission: "No Data dev platform permissions for #1, please check the Data dev platform permissions",
		app: "App",
		chooseApp: "Please select an app",
		chooseAppCurtain: "Please select an app.",
		loadAppNameError: "Failed to get app name.",
		presetDMTips: "The preset subject is not allowed to save. If necessary, you can copy it and then operate.",
		
		//card-error
		themeIsDeleted: "The theme has been deleted",
		themeHasNoData: "The theme lack of datasource",
		lackDataEntityAuthority: "You don't have authority to the data entity",
		subjectEntityMySQLMoreThan61Table: "Too many tables associated with the current entity. Please reduce the analysis fields of the entity or delete the unnecessary entity entries",
		lackDataAuthority: "You don't have authority to this form data",
		extractDataFail: "Failed to prepare data",
		errorLog: "Error log",
		errorCode: "Error code:",
		showErrorLog: "Show error log",
		viewDetails:"View Details",
		cardHasNotFound: "This card has been deleted",
		cardNoAuthority: "You don't have authority to this card",
		componentSourceHasNotFound: "This component source has been deleted",
		componentSourceNoAuthority: "You don't have authority to this component source",
		subjectDataSourceError: "Datasource access error",
		subjectDBDataSourceError: "Database of datasource isnot available",
		unsupportedDsbRefSource: "Unsupported source of widget",
		qingStorageFileSizeLimit: "Qing resource files space is not enough",
		qingStorageNoSpace:"No space left on device",
		illegalLicense: "The current system does not have the license to use the [QING] module , Please contact the administrator.",
		noQingModulePermission: "The account you are using has not been assigned a license for the [Qing] module,Please contact the administrator.",
		illegalQingReportLicense: "The current system does not have the license to use the [QING REPORT] module , Please contact the administrator.",
		noQingReportModulePermission: "The account you are using has not been assigned a license for the [QING REPORT] module,Please contact the administrator.",
		noMoreQingConcurrent: "No more [QING] modules to assign.",
		replicatedLogin: "Your account has been logged somewhere else. Please login again.",
		qingRuntimeException: "An error occured",
		unknownException: "Unknown error occured",
		executeFail: "Chart execute failed",
		entityDestroyed:"DataTable is destoryed in this subject",
		permissionTitle: "permission prompt",
		entityNotSupportQingAnalysis: "Entities do not enabled QingAnalysis, please set in the development platform  ",
		viewDocument: "View document",
		DetailInfo: "Detailed information", 
		notSupportQingAnalysis: "The following entities do not enabled QingAnalysis:",
		notSupportQingAnalysisTip: "The following entities do not enabled QingAnalysis, please set in the development platform  ",
		noAuthorityForTheseEntities: "Have not yet obtained the permission to view the following entity data tables:",
		unsetCardSource: "Please select card source",
		extreportNotFound: "The extreport not found",
		serverBusy: "The server is busy,Please try again later.",
		
		//card-exhibition
		cardEdit: "Edit card",
		cardGotoAnalysis: "Analysis",
		cardRefresh: "Refresh",
		cardMoreOperate: "More",
		cardFilter: "Filter",
		cardEditUnaccessable: "No permission to #1",
		enterEdit: "Enter Designer",
		enterAnalysis: "Enter Analysis",
		analysisIntoDesigner: "Enter the Analysis tool for personalized modification",
		squareIntoDesigner: "Enter designer for personalized modification",
		squareOpenAnalysis: "Open the Analysis tool with the current datasource",
		fullScreenBtn: "Full Screen",
		landscapeBtn: "Landscape",
		verticalScreenBtn: "Vertical",
		lappFilter: "Filter",
		
		//card
		selectCard: "Select the card to copy",
		noModeling: "The corresponding subject of the card is not modeled and the card can not be used.",
		noTheme: "The corresponding subject of the card has been deleted and the card can not be used.",
		failToloadCardContent: "Fail to load card content.",
		chooseImportCard: "Please select the card to import.",
		fromCardLibrary: "Copy schema from the card library",
		
		//邮件
		anonymousViewTips: "You are looking up the current Qing Analysis content anonymously",

		cardNoDefaultSchema: "No default scheme for this card",
		
		//dashboard
		finish: "Finish",
		presetDsbTips: "The preset dashboard is not allowed to save, publish and other operations. If necessary, you can copy it and then operate.",
		preset: "preset",

		//error
		errorBtn: "Show error detail",
		
		systemMapCanNotEdit: "The system map can not be modified directly,if you need to modify the map template,please copy it and then modify it.",
		
		//编辑发布
		editPublishedContent: "Edit published schema-",
		
		//编辑推送
		editTimedPushContent: "Edit timed push schema-",
		editSchemaNotFound: "This schema has been deleted",
		emailConfigNotFound: "Configuration of Email timed push not found",
		
		noEditMap: "Not modified,no need to save.",
		saveMapSuccess: "Map saved successfully.",
		failToLoadMap: "Failed to load map.",
		overSize: "Picture can not be greater than 20M.",
		fileNotImage: "The file type is not a picture.",
		failToUploadImg: "Upload picture failed.",
		
		noSelectMapTemplate: "Please select a map template",
		iknow: "I got it",
		uploadBackgroundImageTips: "Uploading background image",
		
		//金蝶多维数据库
		ERPCloudMDD:"Kingdee MDD",
		ERPCloudMDDApp:"App",
		ERPCloudMDDsystem:"Cube",
		ERPCloudMDDMemberRange:"Member Range",
		selectApp:"Please select App",
		selectAppCurtain:"Please select App.",
		selectCube:"Please select Cube",
		selectCubeCurtain:"Please select Cube.",
		noERPCloudMDDPermission:"No Kingdee MDD permissions, please contact the administrator to assign permissions.",
		ERPCloudMDDOneEntityLimit:"Create Data-table limit, only one Kingdee MDD Data-table allowed.",
		ERPCloudMDDExistLimit:"Create Data-table limit, other Data-table not allowed if Kingdee MDD Data-table existed.",

		selectModel: "Please select Model",
		dppSourceName: "Qing Modeler",
		noModelerPermission: "No Modeler permissions, please contact the administrator to assign permissions.",

		/**超级查询**/
		businessEntity: "Business Entity",
		schemas: "Schemas",
		superQuery: "Super Query",
		currentSystem: "Current System",
		otherSystem: "Other System",
		noAuthentication: "There are no available schemas. Please contact the administrator to authorize the mode first.",
		SQNotDeploy: "The current environment has not deployed or started the super query service. Please contact the administrator to check the deployment status of the super query.",
		noSchemaPerm: "User “#1” does not have permission for “#2” schema. Please reselect the schema or contact the administrator for authorization.",

		//analysis
		myLonger: "My Longer",
		presetLonger: "Preset Longer",
		presetAnalysisTips: "The preset analysis is not allowed to save analysis scheme, publish and other operations. If necessary, you can copy and then operate",
		presetPublishAnalysisTips: "The preset analysis is not allowed to publish and other operations. If necessary, you can copy and then operate",
		searchBoxPlaceholder: "Search publishing name",
		//square
		presetSquareTips: "The preset square is not allowed to save analysis scheme, publish and other operations. If necessary, you can copy and then operate",
		operateForbidden: "Current scene can not support this operation.",
		//title
		entityNumber: "Entity number",
		entityName: "Entity name",
		
		//应用菜单
		fromAppMenu: "Copy schema from application menu",
		fromAppMenuRef: "Reference from application menu",
		noPublish: "No Publish.",
		failToGetAppMenu: "Fail to get appmenu.",
		selectAppmenu: "Select published item",
		publishName: "Publish name",
		publishPerson: "Publisher",
		publishTime: "Publish time",
		noData: "No data",
		failToGetPublish: "Fail to get publish",
		publishOfSubjectNoModeling: "The subject corresponding to this publication is not data prepared and cannot be used.",
		publishOfSubjectBeDeleted: "The subject corresponding to this publication has been deleted and cannot be used.",
		failToGetPublishSchemaList: "Fail to get publish schema list.",
		noSearchData: "no search data",
		
		//仪表板关于信息
		about: "About",
		publishInformation: "Publish Infomation",
		publisher: "Publisher: ",
		envInformation: "Environment Infomation",
		dsbUrlInformation: "Dashboard URL",
		hasCopied: "Copied to clipboard",
		copyfailed: "Copy failed",
		copy: "Copy",
		confirm: "Confirm",
		
		//db-manage
		dataCenterAppId: "App number:#1;App name:#2",
		dbmanage: "Public Data source",
		appNotFound: "App #1 not found",
		
		// 加密预置内容许可检测
		noPermission: "No License Permission for the data.",

		semicolon: ";",
		publishNoOperAuthException: "No Auth",

		//查看发布记录时，检查相关信息的错误提示
		ThemeIsDel: "The source of this release record was removed",
		publishInfoExist: "Release record does not exist or has been deleted",
		notAuthority: "You do not have permission to view the release record, Please contact the publisher",
		authority: "Authority",
		publishPlanExist: "The analysis scheme  has been deleted",
		ISee: "I See",

		//云素材
		cannotAccess: "Cannot Access Cloud Gallery",
		cannotAccessCloudGallery: "Cloud Gallery is an online image download center, accessing this center requires a connection to the Internet, please check your network environment.",

		 // 数据开发平台
		dmo: "Data dev platform",
		noDmoPermission: "No Data dev platform permissions, please contact the administrator to assign permissions.",
		noDmoConfig:"Data dev platform url config error,please contact the administrator.",
		labelModel: "Label",
		noProjectPrompt: "You have not projects in Data dev platform,please enter [Data dev platform] to configure project.",
		noUserInDmo: "Your accont has not been synced,please enter[Data dev platform] to init.",
		noDataSourcePrompt: "There is no data sources for the project.",
		chooseProject:"Please choose a project.",
		ProjectName:"Project",
		type: "Type",
		database: "Database",
		actOnTheSameDatabase: "Modify other same source data tables in the current subject",
		schema: "Schema",
		dbschema: "Schema",
		table: "Table",
		customSql: "Custom ",
		chooseEntityType: "Please choose the type.",
		chooseDatasource:"The Datasource can't be empty.",
		chooseSchema:"Please choose the Schema.",

		/**
		 * 无代码统计卡片
		 */
		refreshChart:"Refresh",
		editChart:"Edit",
		filter:"Filter",
		delete:"Delete",

		noModelerLicense: "The current system does not have permission for the 'Qing Modeler' module. Please contact the administrator.",
		nonSupportModeler: "The current version does not support the [QING MODELER] module, please contact your system administrator.",

		dataTableModel: "DataTable Model",
		metricModel: "Metric Model",
		unableSelectMetricModel: "QingModeler's metric model cannot exist with other types of data table, and other types of data table already exist and cannot be added.",
		unableSelectOtherDataTable: "QingModeler's metric model cannot exist with other types of data table, and metric model already exist and cannot be added.",
		selectADppModel: "please choose the model.",
		selectDataTableModel: "select Data Table Model",
		selectMetricModel: "select Metric Model",
		existMetricModel: "Metric model has already existed, please delete it and try again.",
		noAuthorizedModelTip: "no model for obtaining data authority limits"+"<br/>goto qingModeler",
		gotoQingModeler: "create modeler",
		qing_modeler: "qingModeler",

		confirmExit: "Change detected, do you want to exit without saving?",
		sureExit: "Exit",
		sureReturn: "Return",
		permLabelManage: "Permission Label Management"
	});
	
	oPackage = com.kingdee.bos.qing.linkage;
	oManager.registPackageResources(oPackage, 
	{
		navigationSetting: "Bill navigation setting",
		noNavigationTarget: "No BUSINESS ENTITY found in the current data model, so you can not perform this operation.",
		showMorePages: "Show more pages",
		whatsLayoutPage: "Display entity based \"layout pages\"",
		failToLoadSchema: "Failed to load scheme.",
		failToTemporarySchema: "Failed to stage scheme."
	});
})();