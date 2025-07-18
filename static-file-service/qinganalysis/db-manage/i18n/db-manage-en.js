(function()
{
	var oMLS = com.kingdee.bos.qing.framework.common.MultilanguageManager;
	var oPackage = com.kingdee.bos.qing.dbmanage;
	oMLS.registPackageResources(oPackage,
	{
		create: "New",
		del: "Delete",
		edit: "Edit",
		refresh: "Refresh",
		checkRefInfo: "Check Reference",
		refFromName: "Refer from name",
		refFromType: "Refer from type",
		refTypeMacro: "Macro",
		refTypeExtreport: "Extreport",
		fullPath: "Refer from full path",
		dbRefInfo: "DB reference",
		dbDetail: "Detail info",
		dbDetailText: "Type:#1;Server:#2;Port:#3;UserName:#4",
		neverRefered: "No reference for now",
		uploading: "Uploading.",
		uploadFail: "Upload failed.",
		uploadSuccess: "Upload success.",
		fileTypeIncorrect: "File type incorrect.",
		DBConnection: "DB Connection",
		dbCenterConn: "DB Center Connection",
		createDBConnection: "Create DB Connection",
		createDBCenterConn: "Create DB Center Connection",
		createSourceConnection: "Create data Source Connection",
		createSourceConnectionWithPlus: "Create data Source Connection",
		editDBConnection: "Edit data Source Connection",
		editDBCenterConn: "Edit DB Center Connection",
		/**openAPI**/
		editOpenAPIConnection: "Edit OpenAPI Connection",
		RESTfulDataSet: "RESTful data set ",
		programDataSet: "Program data set ",
		RESTfulDataSetUrlPlaceholder: "please enter the full URL path",
		programDataSetPlaceholder: "please enter Java classes full path",
		urlNotNull :"URL cannot be empty.",
		classNameNotNull: "The Java class full path cannot be empty.",
		connectDbServer: "Connect to database server",
		dbInfoNotFound: "DB Connection not found or has been deleted.",
		yes: "yes",
		no: "no",
		deleteSuccess: "Delete success.",
		authorizationSucceeds: "Authorization succeeds.",
		authorizationFailed: "Authorization failed.",
		emptyName: "Please enter name.",
		saveSuccess: "Save success.",
		editSuccess: "Edit success.",
		connect: "connect",
		connectTest: "test connect",
		connectSuccess: "Connect success.",
		dataCenter: "Data center",
		appNameWithColon: "APP Name:",
		createFailed: "Create failed",
		updateFailed: "Edit failed",
		editDBCenterNotSupport: "Edit dbcenter is not support for now!",
		singleRowAllowed: "Please select single db info to #1.",
		check: "check",
		pleaseUploadFile: "Please upload file first.",
		
		authSpecified: "Authorize to specified roles or users",
		authAll: "Authorize all users",
		authority: "Authority",
		ByUser: "User",
		ByRole: "Role",
		selectNoRole: "Have not selected any role",
		selectMultiRole: "#2 Roles:#1,etc.",
		selectSingleRole: "1Role:#1",
		selectNoUser: "Have not selected any user",
		selectMultiUser: "#2 Users:#1,etc.",
		selectSingleUser: "1User:#1",
		confirmClearAuthority: "Confirm clear authority?",
		
		duplicateHashcode: "The DB connection info is exist!",
		duplicateDataCenter: "The data center info is exist.",
		duplicateName: "Name already exists.",
		nameTooLong: "Name cannot be longer than 50 characters.",
		invalidName: "Name can only use Chinese,letter or number.",
		nameWithSpace: "Name cannot contain space.",
		dbNamePrefixForbid : "Name should not start with #1.",
		noDBCenterPermission: "No DB center permissions, please contact the administrator to assign permissions.",
		noQuery: "Please enter query.",
		onlyAllowSelection: "Only allow selection.",
		sqlError: "Sql has error.",
		sqlTooLong: "SQL cannot be longer than 10000 characters.",
		
		dbAddress: "IP",
		operation: "operation",
		emptyDBAddress: "Address cannot be empty.",
		emptyDBPort: "Port cannot be empty.",
		dbConnectError: "Error.",
		dbConnectFailed: "Connect to database failed, please check the connection and network.",
		confirmDelDB: "Are you sure to delete selected connection source permanently?",
		dbAlreadyReferred: "The data source connection is already referenced #1 time(s), are you sure you want to delete it?",
		neverCreateDB: "No DB connection to show",
		noMenuPermission: "You do not have the permissions of this menu.",
		
		creator: "creator",
		createtime: "creation time",
		modifier: "modifier",
		modifytime: "modification time",
		name: "name",
		type: "type",
		version: "version",
		db: "database",
		dbWithColon: "database:",
		dbInfo: "database info",
		content: "content",
		shared: "shared",
		server: "server",
		serverWithColon: "server:",
		port: "port",
		user: "user",
		password: "password",
		
		cancel: "cancel",
		confirm: "confirm",
		close: "close",

		advanceSetting: " Advance Setting",
		characterSet: "Character set",
		timeZone: "Time zone",
		otherParameters: "Other Parameters",
		fullURL: "Full URL",

		editSuperQueryConnection: "Edit Super Query Link",
		SuperQuery: "Super Query",
		ServiceAddress: "Service Address",
		dbCenter: "Data Center",
		serviceAddressNotNull: "Service address cannot be empty.",
		dbCenterNotNull: "Data center cannot be empty.",
		noAuthentication: "There are no available schemas. Please contact the administrator to authorize the mode first.",
		noSchemaPerm: "User “#1” does not have permission for “#2” schema. Please reselect the schema or contact the administrator for authorization.",
		serviceAddress: "Service Address: ",
		dbCenterName: "Data Center: ",
		dbNameNotNull: "Database name cannot be empty.",
		selectOneSchema: "Please select a schema.",
		schemas: "schema",
		enterCosmicAddress: "Please enter the address of the Cosmic Service, for example: ",
		SQNotDeploy: "The current environment has not deployed or started the super query service. Please contact the administrator to check the deployment status of the super query.",
		enterCosmicUser: "Please enter the login information of the Sky System that needs to be connected, only the phone number is supported as the username",

		logininfo: "Server login info:",
		serverName: "Server name",
		SIDOrserverNameWithColon: "SID/Server name:",
		initDbName: "Init database",
		schema: "Schema",
		mode: "Mode",
		modeWithColon: "Mode:",
		singleContainer: "Single container",
		multiContainer: "Multiple container",
		dbVersion: "Database version",
		direct: "Direct",
		connectType: "Connect type",
		searchBoxPlaceholder: "Please enter the search content",
		noSearchResult: "No results match the search"
	});
})();