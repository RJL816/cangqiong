(function ()
{
	var oManager = com.kingdee.bos.qing.framework.common.MultilanguageManager;
	var oPackage = com.kingdee.bos.qing.modeler.metriclibrary;
	
	oManager.registPackageResources(oPackage,
		{
			// 指标分类体系
			noMenuPermission: "You do not have the permissions of this menu.",
			name: "Name",
			code: "Code",
			codeWithColon: "Code: ",
			description: "Description",
			descriptionWithColon: "Description: ",
			create: "Create",
			creator: "Creator",
			status: "Status",
			createSth: "Create \"#1\"",
			createSuccess: "Create metric system \"#1\" success.",
			nameTooLong: "Name can not exceed 50 characters.",
			codeTooLong: "Code length must not exceed 25 characters.",
			descriptionTooLong: "Description can not exceed 500 characters.",
			nameExist: "The name of \"#1\" has already existed.",
			codeExist: "The code of \"#1\" has already existed.",
			nameCannotBeEmpty: "Please input #1 name.",
			codeEmpty: "Please enter the code.",
			nameEmpty: "Please enter the name.",
			edit: "Edit",
			editSth: "Edit #1",
			editSuccess: "Edit metric system \"#1\" success.",
			del: "Delete",
			disabledCLick: "Click to disabled",
			enableClick: "Click to enable",
			disabled: "Disabled",
			disabledStatus: "Disabled",
			enable: "Enable",
			enableStatus: "Enabled",
			refresh: "Refresh",
			preset: "Preset",
			presetTag: "Preset",
			authoritySystem: "Authority",
			authorizationSucceeds: "Authorization success.",
			authorizationFailed: "Authorization failed.",
			authPermHelpTip: "1. After authorization, users or roles can use the indicator system in applications such as the data workbench;<br/>2. Being authorized to an indicator system does not mean that all indicators under the system can be used. The indicators that users or roles can use are still subject to data permissions.",
			authExplain: "Authorization Instructions",
			authSpecified: "Authorize to specified roles or users",
			authAll: "Authorize all users",
			authority: "Authority",
			ByUser: "User",
			ByRole: "Role",
			selectNoRole: "Have not selected any role",
			selectMultiRole: "#2 Roles:#1, etc.",
			selectSingleRole: "1Role:#1",
			selectNoUser: "Have not selected any user",
			selectMultiUser: "#2 Users:#1, etc.",
			selectSingleUser: "1User:#1",
			confirmClearAuthority: "Confirm clear authority?",
			copy: "Copy",
			copySystem: "Copy Metric System",
			copySystemWithMetric: "Copy metric system with metrics",
			copySystemSuccess: "Copy metric system successful.",
			closeTab: "Exit",
			showOnlyEnable: "Show only enabled metric systems",
			searchBoxPlaceholder: "Search code/name/description",
			searchTotalRecords: "'#1' results are found.",
			selectOneModelAtLeastDel: "Please select at least one metric system to delete.",
			selectEnableSystem: "Please select the metric system in the available status.",
			selectDisableSystem: "Please select the metric system in the disabled state.",
			selectOneModelAtLeastEnable: "Please select at least one metric system for #1.",
			delMetricStandardConfirm: "After deleting the \"#1\" metric system, it will not be restored (including the catalogues and metrics created under the system, and the metrics under the ModelSet will not be deleted), are you sure to delete?",
			delMultiMetricStandardConfirm: "After deleting \"#1\" and other #2 metric system, it will not be restored (including catalogues and metrics created under the system, metrics under the ModelSet will not be deleted), are you sure to delete?",
			deleteMetricStandardBefore: "Please delete the metrics under this system first, and then delete the metric system.",
			deleteOneSuccess: "The metric system was deleted successfully.",
			deleteMultiSuccess: "Deletion of #2 metric systems including \"#1\" was successful.",
			enableConfirm: "Are you sure you want to enable the \"#1\" metric system?",
			enableMultiConfirm: "Are you sure you want to enable the #2 metric system like \"#1\"?",
			disableConfirm: "After the \"#1\" metric system is disabled, the metrics added under this system will not be available. Are you sure to disable it?",
			enableOneSuccess: "Enable the system \"#1\" successfully.",
			enableMultiSuccess: "Enabling #2 indicator systems including \"#1\" was successful.",
			disableMultiConfirm: "After #2 metric system such as \"#1\" are disabled, the metrics added under the system will not be available. Are you sure to disable it?",
			disableOneSuccess: "Disable the system \"#1\" successfully.",
			disableMultiSuccess: "Disable the #2 indicator systems including \"#1\" successfully.",
			editStandard: "Edit metric system",
			createStandard: "Create metric system",
			presetEditTips: "Unable to edit preset metric taxonomies.",
			systemPreset: "System Preset",
			singlePresetMetricDisableTips: "The preset metric is not allowed #1.",
			numberPlaceholder: "The code must contain letters, digits, or underscores (_) and cannot start with a digit",
			numberPlaceholderPromt: "The code must contain letters, digits, or underscores (_) and cannot start with a digit.",
			deletePrompt: "Total #1 metric system, #2 successfully deleted, #3 failed",
			enablePrompt: "Total #1 metric system, #2 successfully enabled, #3 failed",
			disablePrompt: "Total #1 metric system, #2 successfully disabled, #3 failed",
			presetPrompt: "The preset metric system does not allow operation",
			presetMetricDeleteFail: "The preset metric system does not allow to delete.",
			existMetricPrompt: "There are still metrics under the metric system and cannot be deleted.",
			removeMetricFirst: "Please delete the metrics added under the metric system first, and then delete the metric system.",
			enableAlready: "The indicator system is enabled",
			disableAlready: "The indicator system is disabled",
			noPermDelEG: "You do not have permission to delete the \"Enterprise Common\" metric system",
			noPermEnableEG: "You do not have permission to enable the \"Enterprise Common\" indicator system",
			noPermEnablePersonal: "You do not have permission to enable the \"Personal\" indicator system",
			noPermDisableEG: "You do not have permission to disable the \"Enterprise Common\" indicator system",
			noPermDisablePersonal: "You do not have permission to disable the \"Personal\" indicator system",
			noPermEditEG: "You do not have permission to edit the \"Enterprise Common\" indicator system.",
			noPermEditPersonal: "You do not have permission to edit the \"Personal\" indicator system.",
			period: ".",
			type: "Type",
			allType: "All Type",
			publicSystem: "Public System",
			presetSystem: "Preset System",
			EGType: "Enterprise Common",
			presetType: "Preset",
			personalType: "Personal",
			iknow: "I know",
			metricSystemDisappeared: "The metric system does not exist or has been deleted.",
			noPresetSystem: "There is no preset metric system",

			//指标库管理
			addMetric: "Add Metric",
			removeMetric: "Remove Metric",
			moveMetric: "Move Metric",
			referenceInfo: "ViewRefInfo",
			metricSystemManage: "MetricSystemManage",
			exit: "Esc",
			searchContent: "Please enter your search",
			tableView: "Table View",
			cardView: "Card View",
			noSystemTips: "No metric system is available",
			createSystemTips: "Create ",
			metricSystem: "Metric System",
			inputCatalogName: "Please enter catalogue name",
			search: "search",
			nothingSearched: "No results matching the search criteria were found",
			catalog: "Catalogue",
			addDir: "Add peer catalogue",
			addSubDir: "Add sub catalogue",
			editCatalog: "Edit Catalogue",
			deleteCatalog: "Delete Catalogue",
			moveUp: "Move Up",
			moveDown: "Move Down",
			modelGroupMaxLevel: "The maximum level of the catalogue is 4. You are already at level 4.",
			unableMoveUp: "The first catalogue of the same level cannot be moved up.",
			unableMoveDown: "The last catalogue of the same level cannot be moved down.",
			addSameLevelCatalog: "Add peer catalogue",
			addSubLevelCatalog: "Add sub catalogue",
			updateModelCatalogText: "Edit Catalogue",
			deleteChildCatalog: "Delete the sub catalogues in the catalogue before deleting the catalogue.",
			deleteMetricBeforeCatalog: "Delete metric in the catalogue and then delete the catalogue.",
			confirmToDelCatalogPrefix: "Delete ”",
			confirmToDelCatalogSuffix: "” catalogue after never revert, are you sure to delete?",
			addCatalog: "Add New Catalogue",
			containSubLevel: "Include sublevels",
			metricName: "Name",
			metricDesc: "Desc",
			expr: "Expr",
			dimension: "Dimension",
			filterCondition: "Filter Condition",
			operation: "operation",
			dimensionDetailInfo: "detail>",
			path: "Path",
			pathTips: "The path format is: ModelSet name/catalogue name/model name. The catalogue may have multiple levels, separated by \"/\" between each level.",
			metricCreator: "Metric Creator",
			addTime: "Add Time",
			dataUpdateTime: "Data Update Time",
			noMetric: "No Metric",
			openQingModeler:"Go Qing Modeler ",
			createMetric:"New Metric",
			tipsCode: "Code:",
			tipsName: "Name:",
			tipsDesc: "Desc:",
			tipsExpr: "Expr:",
			tipsDimension: "Dimension:",
			tipsFilterCondition: "Filter Condition：",
			tipsPath: "Path:",
			tipsMetricCreator: "Metric Creator:",
			tipsAddTime: "Add Time:",
			tipsAddPeople: "Add People：",
			addPeople: "Add People",
			tipsDataUpdateTime: "Data Update Time:",
			rootNode: "All",
			removeMetricTips: "Please select the metrics that need to be removed.",
			deleteMetricTips: "Select the metric that you want to remove.",
			confirmDeleteMetric: "After the metric is removed, the function of using the metric system will be affected. Are you sure to remove the metric?",
			confirmDeleteMetrics: "Programs that use these metrics after removal will be affected, are you sure about removal?",
			removeMetricSuccess: "Remove Metric Success.",
			moveMetricTips: "Select the metric that you want to move.",
			referenceMetricTips: "Select the metric that you want to view ref info.",
			multipleMetricTips: "Select one metric to view reference information.",
			confirm: "OK",
			cancel: "Cancel",
			catalogName: "Name",
			catalogNameTooLong: "Name can not exceed 50 characters.",
			catalogNameCannotEmpty: "Please enter catalogue name",
			duplicateName: "Name is duplicate.",
			createCatalogSuccess: "Create Catalogue Success.",
			editCatalogSuccess: "Edit Catalogue Success.",
			catalogNotExist: "'#1' catalogue not exist.",
			deleteCatalogSuccess: "Delete Catalogue Success.",
			moveTo: "Move To",
			moveMetricSuccess: "Move Metric Success.",
			referenceType: "Ref Type",
			referencePath: "Ref Path",
			referencer: "Ref Person",
			referenceTime: "Ref Time",
			metricReferenceInfo: "Metric referenced information",
			metricNoReference: "The Metric is not referenced",
			close: "Close",
			referenceNum: "#1 articles in total",
			metricCardInValidTips:"The metric does not exist or has been deleted",
			metricHaveNotAuth:"This metric has not been obtained",
			dataText:" data",
			authText:" auth",
			metricTableInValidTips:"The metric does not exist or has been deleted",
			metricAnalysis:"metric analysis",
			enterprise:"enterprise",
			personal:"personal",
			presetSystemTips: "The preset metric system does not allow adding indicators, editing catalogues, and other operations. If necessary, you can copy and then proceed with the operation.",
			rootNodeNotAddMetric: "Unable to add metrics on the root node, please select a new catalogue.",
			createCatalogTips: "Please create a catalogue first before adding metrics.",
			noLicenceTips: "The current system does not have a license to use the Qing Modeler module. Please contact the system administrator",

			//添加指标
			addMetricSuccess: "Add success.",
			noMatchModelSet: "No match results.",
			someFail: "There is a total of #1 Metric, with #2 successfully added and #3 failed.",
			quotation: "\"" + "\"",
			addFail: "Add failed.",
			noSelectMetric: "There are currently no available metrics, let's",
			systemNotExist: "“#1” Metric system does not exist.",
			systemDisabled: "“#1” Metric system has been disabled.",
			operateWithoutAuth: "You do not have permission to operate this metric system.",
			metricNotExist: "Metric does not exist or has been deleted:",
			metricNoAuth: "Metric has no data permission:",
			metricIsExist: "Metric already exists:",
			operatingTips: "Operating Tips",
			iSee: "I see",
			all: "All",
			modelSet: "ModelSet",
			showNoAddMetric: "Show only Metrics that have not been added",
			selectedMetric: "Selected Metrics",
			allClear: "Clear all",
			metricExist: "This Metric has been added to the catalogue of the current Metric system。",
			metricType: "Metric type",
			enterpriseBuild: "Enterprise Metrics",
			myMetric: "My Metric",
			presetMetric: "Preset Metrics",

			relativeDateRange: "Relative date range",
			equalRelativeDateRange: "Equal to (relative date)",
			equal: "equal",
			notEqual: "not equal",
			greater: "greater",
			equalOrGreater: "equal or greater",
			less: "less",
			equalOrLess: "equal or less",
			include: "include",
			notInclude: "not include",
			startWith: "start with",
			endWith: "end with",
			compareNull: "compare null",
			compareNotNull: "compare notNull",
			compareIn: "compare in ......",
			compareNotIn: "compare not in ......",
			and: "and",
			or: "or",
			dataTypeTrue: "data type true",
			dataTypeFalse: "data type false"
		});
})();