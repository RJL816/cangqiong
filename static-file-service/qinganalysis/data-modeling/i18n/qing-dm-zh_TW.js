(function()
{
	var oManager = com.kingdee.bos.qing.framework.common.MultilanguageManager;
	var oPackage = com.kingdee.bos.qing.data;
	oManager.registPackageResources(oPackage, 
	{
		/*ui */
		/*Main */
		entity: "數據表",
		relation: "關係",
		config: "設置",
		docTooModern: "文檔的版本比環境更高，已最大兼容性加載。",
		/*TabEntity */
		createEntity: "新建數據表",
		field: "欄位",
		filter: "過濾",
		noEntity: "未創建數據表",
		fieldSelect: "選擇欄位",
		tableAndFieldSelect: "選擇數據表及字段",
		editSql: "編輯",
		modifyConnection: "數據源",
		addCustomField: "新建自定義欄位",
		refreshEntity: "刷新預覽數據",
		editInnerRelation: "編輯內部關係",
		checkInnerRelation:"查看內部關係",
		modifyCustomField: "編輯自定義欄位",
		deleteUnExistedField: "刪除該字段後將無法恢復，確認刪除該字段嗎？",
		deleteCustomField: "刪除該字段後將無法恢復，確認刪除該字段嗎？",
		renameEntity: "重命名",
		deleteEntity: "刪除",
		"delete":"刪除",
		confirmDelEntity: "刪除數據表“#1”後將無法恢復，確認刪除該數據表嗎？",
		deleteRelationMeanwhile: "與其連接的關係也將一起刪除",
		invalidEntityName: "數據表名稱只能由漢字、字母、數字或下劃綫組成，且不能包含空格。",
		entityNameNull: "數據表名稱不能為空。",
		entityNotExist:"數據表不存在",
		entityFileNotFound: "數據表文件不存在。",
		abandonModify: "，已放棄修改。",
		abandonModifys: "數據表名稱只能由漢字、字母、數字或下劃線組成，且不能包含空格，已放棄修改。",
		abandonModifysAndEntityNameNull: "數據表名稱不能為空，已放棄修改。",
		abandonModifysAndFieldNameNull: "字段名稱不可為空，已放棄修改。",
		abandonModifyAndFielNameValid: "字段名稱只能由漢字、字母、數字或下劃線組成，且不能包含空格，已放棄修改。",
		entityNameExist: "已存在數據表名稱：",
		errorInfo: "錯誤碼：#1\r\n錯誤信息：#2",
		filterCriteria: "過濾條件",
		noPreviewData: "沒有數據",
		dataShownRows: "僅預覽前#1行數據",
		dataShownCols: "僅預覽前#1列數據",
		dataShownRowsAndCols: "僅預覽前#1行、前#2列數據",
		refreshPreviewData: "編輯完成后，點擊此處刷新預覽數據。",
		loadingPreviewData: "正在獲取預覽數據，請稍候……",
		kSQLTranUnknError: "KSQL轉換過程中出現未知錯誤，請檢查語法是否正確。",
		kSQLTranFail: "KSQL轉換失敗，失敗信息：",
		showMore: "展示更多",
		collapseHierachy: "收起",
		/** merge entity*/
		dataTypeDifferent:"數據類型不一致",
		mergeDataSource: "合併數據表...",
		mergeDataSourceTitle: "合併數據表",
		setFieldRelation:"字段匹配",
		modifyMergedDataSource:"修改合併状态...",
		modifyMergedTable:"修改合併状态",
		mergeEntityAndMatchField:"實體合併與字段匹配",
		selectEntityAndField: "選擇數據表及字段",
		mergeEntity:"實體合併",
		relationDiffErrMsg:"當前數據表#1與#2之間的內部關系類型為#3，與左側數據表#4與#5之間的內部關系類型#6不一致，請重新選擇",
		customBizEntityNameField:"實體名稱",
		selectTableAndField:"選擇數據表及字段",
		selectBizEntity:"選擇業務實體",
		flexField:"彈性域",
		flexFieldInConsistent:"數據表\"#1\"中的\"#2\"字段為彈性域字段，彈性域只能與彈性域字段合併，請重新選擇",
		customFieldInConsistent:"數據表\"#1\"中的\"#2\"字段為自定義字段，自定义只能與自定義字段合併，請重新選擇",
		allPropNotSelectError:"數據表\"#1\"至少選擇一個字段",
		relationDiffTips: "業務實體\"#1\"中， 存在數據表有2個及以上字段與其他數據表創建關係，請刪除不滿足的合併條件的數據表。",
		relationDiffTips1: "業務實體\"#1\"中， 存在數據表有2個及以上字段與其他數據表創建關係，請取消勾選不滿足合併條件的數據表。",
		/**TabRelation */
		createRelation: "新建關係",
		relationNotCreate: "未創建與其它數據表的關係",
		relatedfield: "關聯欄位",
		deleteRelation: "刪除",
		moveUpRelation : "上移",
        moveDownRelation : "下移",
		confirmDelRelation: "刪除該關系後將無法恢復，確認刪除該關系嗎？",
		relationNeedTwoEntity: "兩個及以上的數據表才可以建立關係。",
		cannotAddMoreRelation: "不能新建更多的關係。",
		noRelationCreated: "未創建數據表間的關係",
		relationRefNotExistedProp:"關聯關系引用了不存在或該未開啟\"支持輕分析\"設置項的字段：",
		notExistProperty: "關聯關系引用了不存在的字段：",
		fullStop: "。",
		relationRefInvalidCalculateProp:"關聯關系引用了無效的計算字段：",
		/**TabSchedule */
		dataExtract: "數據提取",
		disposableExtract: "實時提取",
		timingExtract: "定時預提取",
		dataTableUnsupportScheduleSetting:"數據表不支持定時預提取",
		cronErrorMessage: "請輸入表達式。",
		extractUsers: "提取時的用戶身份：",
		extractByCreator: "按業務主題創建人提取",
		extractByUsers: "按指定用戶分別提取",
		selectUsers: "指定用戶",
		selectUsersWarning: "請選擇用戶。",
		selectUsersLimitWaring: "指定用戶數量超過最大限制。",
		selectUsersPlaceholder: "請選擇用戶（默認包含業務主題創建人）",
		otherUserPolicy: "其他用戶提取策略",
		/**FieldPane */
		fieldName: "欄位名稱",
		modifyFieldName:"修改欄位名稱",
		editSuccess:"修改成功。",
		fieldNameCanNotExceedLimit:"長度不能超過50個字符",
		showName: "顯示名稱",
		dataType: "數據類型",
		numberFormat: "數字格式",
		hideWhileAnalyze: "在分析中隱藏",
		subViweFieldDisplayName:"欄位分表",
		groupingPropertyFieldDisplayName:"分組欄位",
		customFieldDisplayName: "自定義欄位",
		parentChildDimensionFieldDisplayName:"父子維",
		duplicatedName: "重複的欄位顯示名稱：",
		invalidFieldName: "欄位名稱只能由漢字、字母、數字或下劃綫組成，且不能包含空格。",
		fieldNameNull: "欄位名稱不可為空。",
		fieldNameIsNull: "字段名稱不可為空",
		text: "文本",
		number: "數值",
		integer: "整數",
		dataTypeDate: "日期",
		dateTime: "日期時間",
		compareVariable: "匹配變量",
		currentUserId: "當前用戶ID",
		currentUserName: "當前用戶名稱",
		currentGroupID: "當前組織ID",
		currentGroupNAME: "當前組織名稱",
		currentGroupRangeID: "當前用戶業務組織範圍(ID)",
		currentDepartmentIds: "當前用戶所屬部門(ID)",
		currentBizUnitOrgRangeIds: "當前用戶業務單元範圍(ID)",
		currentDeptAndSubIds: "當前用戶所屬部門及下級(ID)",
		currentChargeDeptId: "當前用戶負責的部門(ID)",
		currentChargeDeptAndSubIds: "當前用戶負責的部門及下級(ID)",
		currentSystemLanguage: "當前繫統語言",
		bool: "布爾",
		origin: "原始",
		columnToRowPropertyNotExists: "列轉行字段不存在，請重新配置列轉行",
		/**FilterPane */
		leftBracket: "左括號",
		compare: "比較",
		value: "值",
		rightBracket: "右括號",
		logic: "邏輯",
		insert: "插入",
		deleteRow: "刪除",
		equal: "等於",
		notEqual: "不等於",
		greater: "大於",
		equalOrGreater: "大於等於",
		less: "小於",
		equalOrLess: "小於等於",
		include: "包含",
		notInclude: "不包含",
		startWith: "開頭是",
		endWith: "結尾是",
		compareNull: "為空",
		compareNotNull: "不為空",
		dataTypeTrue: "真",
		dataTypeFalse: "假",
		and: "並且",
		or: "或",
		relativeDateRange: "相對日期",
		/**RelationSetting */
		keepFifthWheel: "保留無法關聯的行",
		oneToOne: "一對一",
		oneToN: "一對多",
		nToOne: "多對一",
		/**NewRelationDialog */
		forbidRelateToItself: "不允許創建數據表與其自身的關係，請選擇兩個不同的數據表。",
		relationExist: "已存在“#1”和“#2”之間的關係，不能重複創建。",
		ringlikeRelation: "由於可能使已存在的關係形成環狀，不允許創建“#1”和“#2”之間的關係。",
		fieldIncomplete: "欄位不完整",
		inconsistentDataType: "兩個欄位的數據類型不一致。如果確認沒有邏輯問題，可以忽略此警告。",
		filedIsNotUnique: "欄位“#1.#2”不唯一",
		filedUniqueCheckError: "欄位“#1.#2”唯一性檢測失敗",
		/**FormatStringDialog */
		numberFormatOfField: "欄位[#1]的數字格式",
		/**EditCustomSqlDialog */
		sqlError: "sql執行出錯，請檢查sql語句",
		
		/*ui-source */
		wrongConnInfo: "錯誤的連接信息",
		selectDataSource: "選擇數據源",
		database: "數據庫",
		schema: "方案",
		dbschema: "模式",
		file: "文件",
		currentUsed: "當前使用",
		recentlyUsed: "最近使用",
		selectADataSource: "請選中一項數據源。",
		disabledTypeList: "（當前輕分析許可模式下，以下數據源類型不可用）",
		modelerDisabledTypeList: "（當前輕建模許可模式下，以下數據源類型不可用）",
		comingSoon: "未開放功能，敬請期待。",
		IPAddress: "服務器",
		ProjectName:"項目名稱",
		port: "端口",
		mode: "模式",
		singleContainer: "单容器",
		multiContainer: "多容器",
		loginInfo: "服務器登錄信息：",
		userName: "用戶名",
		password: "密碼",
		connect: "連接",
		connecting: "連接中...",
		connectionSuccessful: "連接成功。",
		IPAddressError: "服務器地址不正確。",
		initDbName: "數據庫",
		type: "類型",
		table: "表",
		customSql: "自定義",
		serverName: "實例名",
		connectDbServer: "連接數據庫服務器",
		connectionFailure: "無法連接到數據庫服務器，請確認登錄信息是否正確。",
		selectTable: "選擇表",
		enterSearchText: "搜索實體名稱",
		enterSearchTable: "搜索數據表名稱",
		enterSearchModel: "搜索模型名稱",
		enterSearchTextMark: "實體標識",
		enterSearchModerMark: "模型編碼",
		enterSearchField: "搜索字段名稱",
		enterSearchFieldMark: "字段標識",
		priview: "預覽",
		enablePriview: "啟用預覽",
		loadingData: "加載中，請稍候……",
		noData: "沒有數據",
		noDataAndUnableToSelect: "該表沒有數據，無法被選中。",
		loadingTotalRows: "正在計算總行數，請稍後……",
		loadingTotalRowsError: "獲取總行數失敗",
		totalRows: "總共#1行數據",
		previewTipsComma:"，",
		selectedTable: "已選表",
		selected: "已選",
		clearAll: "清空",
		selectATable: "請至少選中一個數據表。",
		selectOneTable: "請選中一個數據表。",
		selectField: "選擇欄位",
		atLeastSelectAField: "至少選中一個字段。",
		atLeastSelectAFieldExceptLockField: "除了鎖定的關聯字段，至少選中一個字段。",
		fieldToExtract: "選擇需要抽取的欄位 ",
		ensureHasSelectedField: "請確保每個數據表都有選中欄位。",
		ensureHasSelectedFieldWithLock: "請確保每個數據表除鎖定的關聯欄位外，至少有一個選中欄位。",
		selectAll: "全選",
		theRalationWillBeDeletedWhenDeleteTheField: "此欄位為關聯欄位，刪除欄位的同時會刪除關係",
		customSqlName: "名稱",
		inputNameNotNull : "名稱不能為空。",
		inputSqlNotNull: "不能為空。",
		onlyAllowSelection: "只允许查询操作",
		previewRuntimeSQL: "查看執行期SQL",
		actOnTheSameDatabase: "衕時修改噹前主題中其他衕源數據錶",
		someTableNotExistInThisDatabase: "數據表#1在該數據庫中不存在",
		theTableNotExistInThisDatabase: "數據庫中沒有該數據表",
		noDataInThisDatabase: "該數據表中沒有數據",
		dataTypeNotMatch: "字段#1的數據類型為#2，與字段#3的#4類型不一致",
		insertVariate: "插入變量",
		systemVar: "系統變量",
		macroVar: "宏變量",
		insertSystemVar: "插入系統變量",
		selectVariate: "選擇變量",
		noVarSelected: "請選擇一個變量。",
		dbAddress: "服務器地址不能為空。",
		dbPortNotNull: "端口不能為空。",
		dbNameNotNull: "數據庫名稱不能為空。",
		projectNotNull: "項目名稱不能為空。",
		dbVersion: "數據庫版本",
		connectType: "連接類型",
		direct: "直連",
		quorum: "法定數量",
		clusterId: "集群ID",
		unsupportedJDKVersion: "當前JDB版本不支持，請升級到JDK1.8版本。",
		noDBCenterPermission: "沒有數據中心權限，請聯系管理員分配權限。",
		noModelerPermission: "您沒有該#1的運行權限。",
		noModelerEntityPermission: "該#1不存在或已被刪除，無法使用。",
		damagedDppEntity: "該#1已損壞，無法使用。",
        noModelerLicense: "當前系統沒有【輕建模】模塊的使用許可，請於系統管理員聯繫。",
		modelDestroyed: "該模型已損壞，無法預覽數據。",
		modelDestroyedUnableToSelect: "該模型已損壞，無法被選中。",
		modelNotExisted: "該模型不存在或已被刪除，無法被選中。",
		modelUnAvailable: "沒有該模型的運行權限，無法被選中。",
		modelNoData: "該模型沒有數據，無法被選中。",
		connectDbCenter: "數據中心",
		tooManyTablesCanNotPreviewError: "當前實體關聯的數據表過多，不能正常預覽數據，妳可以進入“下壹步”減少數據表的關聯數量。",
		tooManyTablesSelectFieldOneEntityError: "當前實體關聯的數據表過多，請反選不需要的字段。",
		tooManyTablesSelectFieldMoreEntityError: "當前實體關聯的數據表過多，請在右側反選不需要的分析字段，或在左側刪除不需要的實體分錄。",
		selectedCount: "（已選擇 #1 項）",
		showOnlySelected: "僅顯示選中項",

		/**超级查询**/
		businessEntity: "業務實體",
		schemas: "模式",
		selectOneSchema: "請選擇一個模式。",
		selectSchemaTips: "請選擇一個模式",
		superQuery: "超級查詢",
		searchSchema: "搜索模式",
		currentSystem: "當前系統",
		otherSystem: "其它系統",
		noAuthentication: "沒有可用的模式，請先聯繫管理員授權模式。",
		missPhysicalTable: "查詢的實體缺少物理表。",
		SQNotDeploy: "當前環境未部署超級查詢服務或服務未啟動，請聯系管理員檢查超級查詢部署情況。",
		needWhereTips: "為了防止查詢的數據量過多造成性能問題，請在SQL語句中使用where/limit子句",

		/**openAPI**/
		RESTfulDataSet: "RESTful數據集",
		programDataSet: "程序數據集",
		RESTfulDataSetUrlPlaceholder: "請輸入URL全路徑",
		programDataSetPlaceholder: "請輸入Java類全路徑",
		urlNotNull:"URL不能為空。",
		classNameNotNull:"Java類全路徑不能為空。",
		OpenAPI: "OpenAPI",		
		noCorrespondingTable: "沒有對應的表，請重新填寫URL。",
		error2061100: "請填寫正確的URL，如果是根路徑，必須以.QData結尾。",
		error2061103: "pageSize的值必須在2000至20000之間。",
		error2061104: "參數異常,pageNo，selectedFields為系統自動補齊參數,不需用戶手動填寫。",
		error2062100: "沒有實現接口ITableDataProvider。",
		error2061301: "請填寫正確的認證信息。",
		error2061302: "請填寫完整的的認證信息。",
		error2061303: "摘要認證服務器質詢頭參數異常。",
		authType: "認證方式",
		noAuth: "無",
		cosmicAuth: "蒼穹認證",
		httpAuthHelpIconTips: "提供常見HTTP身份認證，可以指定認證方式，進行身份認證鑒權  ",
		clientId: "客戶端編碼",
		clientSecret: "客戶端密鑰",
		scope: "權限範圍",
		authURL: "認證URL",
		local: "當前系統",
		other: "其他系統",
		auto: "自動獲取當前用戶信息",
		custom: "自定義填寫用戶信息",
		mobile: "手機",
		email: "郵箱",
		appId: "系統編碼",
		appSecret: "認證密鑰",
		cosmicType: "認證服務器",
		serverAddress: "服務器地址",
		forExample: "例如：",
		accountid: "數據中心id",
		tenantid: "租戶id",
		userValue: "用戶類型值",
		userSourceType: "用戶來源類型",
		usertype: "用戶類型",
		proxyUser: "代理用戶名",
		tokenEnhanced: "增強型Token認證",
		userNameNotNull: "用戶名不能為空。",
		userNameTooLong: "用戶名長度不能超過50個字符。",
		userNameNotSpecial: "用戶名不能包含特殊字符=,。",
		passwordNotNull: "密碼不能為空。",
		passwordTooLong: "密碼長度不能超過100個字符。",
		clientIdNotNull: "客戶端編碼不能為空。",
		clientIdTooLong: "客戶端編碼長度不能超過50個字符。",
		clientSecretNotNull: "客戶端密鑰不能為空。",
		clientSecretTooLong: "客戶端密鑰長度不能超過100個字符。",
		scopeTooLong: "權限範圍長度不能超過50個字符。",
		authURLNotNull: "認證URL不能為空。",
		authURLTooLong: "認證URL長度不能超過50個字符。",
		appIdNotNull: "系統編碼不能為空。",
		appIdTooLong: "系統編碼長度不能超過50個字符。",
		appSecretNotNull: "認證密鑰不能為空。",
		appSecretTooLong: "認證密鑰長度不能超過100個字符。",
		serverAddressNotNull: "服務器地址不能為空。",
		serverAddressTooLong: "服務器地址长度不能超過100個字符。",
		accountIdTooLong: "數據中心id長度不能超過50個字符。",
		userInfoNotNull: "用戶信息不能為空。",
		userInfoTooLong: "用戶信息長度不能超過50個字符。",
		tenantIdTooLong: "租戶id長度不能超過50個字符。",
		classPath: "類路徑",
		authSettings: "認證設置",
		
		/**uploadFile*/
		reupload: "重新上傳",
		pleaseUploadFile: "請先上傳文件。",
		customSplitSignShouldNotNull: "自定義分隔符不能為空。",
		uploadSameNameFile: "請上傳同名文件",
		noCorrespondingSheetInThisFile: "上傳的文件中沒有名稱為“#1”的工作表，請重新上傳。",
		uploadFile: "上傳文件",
		comma: "逗號",
		semicolon: "分號",
		space: "空格",
		tabs: "製錶符",
		custom: "自定義",
		doubleQuotationMark: "雙引號",
		singleQuotationMark: "單引號",
		checkFirstFiftyLines: "僅檢測前50行",
		checkFirstOneHundredLines: "僅檢測前100行",
		checkWholeFile: "檢測整個文件",
		acceptFile: "支持#1文件，且單個文件不大於#2M",
		acceptDBFile: "支持#1文件，且文件不大於100M",
		splitSign: "分隔符",
		characterSet: "編碼",
		textLimitSign: "文本限定符",
		defineTypeRowCount: "數據類型檢測",
		unsupportedBrowser: "當前瀏覽器不支持該功能。",
		fileTooLarge: "文件大小超出最大限制，請重新上傳文件",
		fileTypeIncorrect: "文件類型不正確。",
		uploadSuccess: "上傳成功。",
		uploadFail: "上傳失敗。",
		uploadFileNoAccess: "無上傳文件權限。",
		networkError: "網絡連接異常。",
		clickOrDrag: "點擊或將文件拖拽到這裡上傳",
		clickForUploadFile: "點擊這裡上傳文件",
		uploadFileIsNull: "上傳的文件為空，請重新上傳。",
		noCorrespondingXmlNodeInThisFile: "上傳的文件中沒有“#1”節點，請重新上傳。",
		download: "下載",
		duplicateFileExists: "存在重名文件，",
		fileTypeIncorrectError: "文件類型錯誤，",
		uploadSuccessFileNum: "成功上傳#1個文件。",
		duplicateFileExistsNum: "#1個文件存在重名文件，",
		fileTypeIncorrectNum: "#1個文件類型錯誤，",
		theFileIsUploading: "文件正在上傳中，請稍後再試。",
		fileNumberExceeds: "最多上傳#1個文件。",
		selectFile: "選擇文件",
		upladCanceled: "暫停上傳文件，請重新上傳。",

		/**dm-model*/
		entityFilterCriteria: "數據表“#1”過濾條件",
		lackField: "第#1行字段不存在。",
		incompleteFilter: "第#1行不完整，",
		bracketMismatch: "左右括號不匹配",
		lackLogicalSymbol: "第#1行缺少邏輯符",
		lackComparisonOperator: "缺少比較符",
		comparisionMismatch: "比較符不匹配。",
		lackValue: "缺少值。",
		valueMustBeNum: "值必須為數字。",
		invalidDateValue: "無效的日期值。",
		wrongBoolean: "錯誤的布爾值。",
        invalidProperty:"第#1行無效的字段",
        invalidSystemVarType:"第#1行無效的系統變量",
        
        /**存储过程**/
        storedProcedure: "存儲過程",
		selectStoredProcedure: "選擇存儲過程",
		selectAStoredProcedure: "請選擇一個存儲過程。",
		selectedStoredProcedure: "已選存儲過程",
		parameterName: "參數名稱",
		storedProceParameter: "存儲過程參數",
		direction: "傳輸方向",
		dataType: "數據類型",
		parameterValue: "參數值",
		inParameter: "輸入參數",
		outParameter: "輸出參數",
		inOutParameter: "輸入輸出參數",
		previewResultSet: "預覽結果集",
		editStoredProcedure: "編輯存儲過程",
		parametersPrompt: "存儲過程#1，參數值",
		cursor: "游標",
		cursorResult: "游標結果集字段：",
		outSetResultBefore: "使用第",
		outSetResultAfter: "個結果集",
		outParameterNotNeedSet: "輸出參數無需設置",
		notFindIdxResult: "沒有獲取到存儲過程 #1 第#2個的結果集。",
		notFindResult: "沒有獲取到存儲過程 #1 的結果集。",
        tipsHtml: "存儲過程操作說明："
				+ "<br/>1、界面中設置的存儲過程的輸入輸出參數，順序必須和存儲過程定義的參數順序一致；"
				+ "<br/>2、如果輸入參數沒有默認值，則需要設置參數值，否則可能出現執行出錯；"
				+ "<br/>3、如果輸出參數不是結果集，則提示找不到對應的結果集；"
				+ "<br/>4、只能選擇一個結果集作為輸出字段。",
		propertiesChangeTips: "數據字段已發生變動，已刪除了部分原字段，您也可以重新設置字段。",
		storedProcedureSetChangeTips: "您修改了存儲過程參數設置，數據結果集可能發生變動，您也可以重新設置字段。",
		dbStoredProcedureNameRepeat: "檢測到存在重復的存儲過程名稱，請確保存儲過程名稱不重復。",
		
        /**ChoosePropertyPane*/
        search: "搜索",
        
         /**dm-ui-source and dm-ui*/
        nothingSearched: "找不到符合的結果",
		nothingTable: "暫無數據表",
		noAuthorizedModel: "暫無獲得數據權限的模型",
        initialName: "初始名稱",
        compareIn: "在......之内",
        compareNotIn: "不在......之内",
        showFieldName: "顯示原字段名稱",
        enterSplit : "精確匹配多值，各項之間使用回車作為分隔符號",
        matchTooLong:"匹配項不能超過50000個字符",
        emptyData: "暫無相關數據",
        viewSystemVariable: "查看系統變量",
        sqlParse: "SQL解析",
        sqlContent: "腳本內容",
        unPushdownFilterConditions: "不可下推的過濾條件",
        unSupportSqlParse: "當前數據類型暫不支持SQL解析",
        closePanel: "關閉",
        cancel: "取消",
		confirm: "確定",
		entityNotSupportQingAnalysis: "業務實體未開啟“支持輕分析”設置項，請在開發平台的對應表單中進行設置  ",
		viewDocument: "查看幫助文檔",
		noSupportCreateRelation: "不支持創建#1簡的關係。",
		noSupportExtractTimingData: "#1類型的數據表不支持定時預提取",
		columnName: "名稱：",

        /**宏*/
        macroNotFound: "當前實體引用的宏不存在或已被刪除，宏id為：#1。",
        macroNoAuthority: "當前實體引用了沒有權限查看的宏，宏名稱為：#1。",
        invalidMacroFilter: "第#1行引用的宏變量已被刪除或沒有權限訪問。",
		invalidFilterDBNoExist: "第#1行引用的宏變量“#2”，其使用的數據庫連接不存在或已被刪除，請重新設置。",
		invalidFilterEntityNoExist: "第#1行引用的宏變量“#2”，其使用的基礎資料不存在，請重新設置。",
        macroDBUnset: "當前實體引用的宏未設置數據庫連接，宏名稱為：#1。",
		macroNoFoundEntity: "當前實體引用的宏，其使用的基礎資料不存在，宏名稱為：#1。",
		appNotExist:"第#1行引用的宏變量“#2”，其使用的應用“#3”不存在或已被刪除，請重新設置。",
		appDisabled:"第#1行引用的宏變量“#2”，其使用的應用“#3”被禁用，請重新設置。",
		appCloudDisabled:"第#1行引用的宏變量“#2”，其使用的應用“#3”所在雲被禁用，請重新設置。",
		appNotExistFilter:"宏變量“#1”使用的應用“#2”不存在或已被刪除，請重新設置。",
		appDisabledFilter:"宏變量“#1”使用的應用“#2”被禁用，請重新設置。",
		appCloudDisabledFilter:"宏變量“#1”使用的應用“#2”所在雲被禁用，請重新設置。",
        
        /**列转行*/
        modifyColumnToRow: "修改列轉行",
		columnToRow: "列轉行",
		configColumnDesc: '請在"目標值列"中選擇需要轉置的列',
        existColumnToRowErrorItem: "存在不完整的配置項",
        existsUnconfigColumn: '"目標值列#1"未設置',
        targetFieldName: "目標屬性列",
        targetFieldValue: "目標值列",
        operate: "操作",
        addColumnButton: '添加"目標值列"',
        advancedSetting: "高級",
        headNameComponentCheckError: "名稱只能有漢字、字母、數字或下劃線組成",
        headNameRepeatCheckError: "字段名稱已存在",
        clearColumnToRowSetting: '清空"列轉行"設置',
        existsSameColumnName: '當前設置的第#1列列名稱"#2"與已存在的列名稱重複',
        columnToRowHelpIconTips:  "“列轉行”功能可將原始數據中的同一行多列數據轉換為多行數據 ",
        viewDetails:"查看幫助文檔",
		tokenURL: "獲取access_token的API地址",

		/**
		 * 数据准备中数据表和字段的信息提示语
		 */
		fileNotFound:"文件未找到",
		DBConnectionInfo: "數據庫連接失敗",
		DataSourcesInfo: "該數據源中不存在",
		OpenAPIInfo: "OpenAPI的URL無效",
		SelectAuthorityInfo: "沒有該業務實體的查看權限",
		SupportLightAnalysisInfo: "該實體未開啟“支持輕分析”設置項",
		CalculatingField: "計算字段",
		invalid: "無效",
		fieldNotExistInfo: "該數據源中不存在字段",
		fieldNotSupportQing: "或該字段未開啟\"支持輕分析\"設置項",
		table: "表",
		ksqlNotSupport: "當前數據源不支持“自定義KSQL”，請重新選擇數據源",
		storedProcedureNotSupport: "當前數據源不支持“存儲過程”，請重新選擇數據源。",
		childEntityHaveProblem: "構成該數據表的子表存在異常",
		sqlExeException: "自定義SQL執行異常。",
		ksqlExeException: "自定義KSQL執行異常。",
		spExeException: "存儲過程不存在或執行異常。",

		undefinePreviewError:"錯誤類型:#1,錯誤描述:未定義",

		/**
		 * 新建数据表--选择实体，显示实体标识按钮。
		 */
		displayEntityMark: "顯示實體標識",
		displayModelCode: "顯示模型編碼",
		displayFieldMark: "顯示實體/字段標識",
		/**
		 * 更换不同类型数据源
		 */
		changeDataSource: "更換數據源",
		changeDataSourceTips: "可更換當前數據源的類型，例如將Excel數據源更換為MySQL數據源",
		uploadFixedNameFile: "請上傳名稱為“#1”的#2文件",
		advancedSetting: "高級",
		selectedSourceDoNotSupport: "當前選擇的數據源不支持“#1”，請重新選擇。",
		changeSourceResult: "更新數據表成功#1張，失敗#2張",
		followingEntityChangeSourceFailed: "以下數據表更換數據源失敗：",
		iSee: "我知道了",
		unsupportedSourceTips: "同一數據源的其他數據表中，存在使用#1取數的數據表，更換的數據源不支持這#1種取數類型。",
		quotationMark: "“#1”",
		splitMark: "、",

		/**
		 * 数据开发平台
		 */
		dmo: "數據開發平台",
		noDmoPermission: "沒有數據開發平台權限，請聯繫管理員分配權限。",
		noDmoConfig:"您尚未配置數據開發平台應用，請聯繫管理員配置數據開發平台應用",
		labelModel: "標籤模型",
		noProjectPrompt: "您還沒有數據開發平台應用的項目關係，請先進入【數據開發平台】配置相關信息！",
		noDataSourcePrompt: "該項目還沒有配置對應的數據源，請先進入【數據開發平台】應用進行配置",
		chooseProject:"請選擇一個項目",

		macroException: "宏變量執行異常，請重新選擇。",

		dataCenter: "當前數據中心",
		moreThanMaxFieldNum: "每張數據表最多允許選擇#1個字段，請重新選擇字段。",
		sqlMoreThanMaxFieldNum: "每張數據表最多允許查詢#1個字段，請重新編輯SQL。",
		selectedFieldNum: "已選擇#1個字段"
	});
})();