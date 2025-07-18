(function ()
{
	var oManager = com.kingdee.bos.qing.framework.common.MultilanguageManager;
	var oPackage = com.kingdee.bos.qing.modeler.mainpage.ui;
	oManager.registPackageResources(oPackage,
		{
			noDeployTips: "暫無需要部署的模型，請重新選擇“未部署”或“部署後更改”的模型。",
			metricsName: "指標名稱",
			metricsDesc: "指標描述",
			allType:"全部类型",
			dataTableModelType: "數據表模型",
			dataTableModelDesc: "基於一個或多個數據表，通過一系列的處理步驟創建一個數據表模型",
			entityModelType: "實體模型",
			entityModelDesc: "通過構造數據表間的層級關係創建樹形結構的模型",
			relationModelType: "關係模型",
			relationModelDesc: "基於多個數據表，建立數據表間的邏輯關係，創建一個關係模型",
			metricsModelType:"指標模型",
			metricsModelDesc:"基於數據表或指標，定義計算公式及統計口徑創建一個指標模型",
			new:"新建",
			rootNode:"全部",
			noSelectedModelGroup: "請選擇一個目錄。",
			createModelOnRootNode: "不能在根節點上創建模型，請重新選擇目錄。",
			group: "目錄",
			searchGroupName: "請輸入目錄名稱",
			addGroup:"新建目錄",
			addGroupSuccess:"新建目錄成功。",
			addDir:"新增同級",
			addSubDir:"新增子級",
			editGroup:"編輯目錄",
			editGroupSuccess:"編輯目錄成功。",
			deleteGroup:"刪除目錄",
			confirmToDelGroupPrefix: "刪除“",
			confirmToDelGroupSuffix: "”目錄後將無法恢復，確定刪除嗎？",
			deleteModelGroupSuccess: "刪除目錄成功。",
			deleteModelBeforeModelGroup: "請先刪除目錄下的模型再刪除目錄。",
			deleteChildModelGroup: "請先刪除目錄下的子目錄再刪除目錄。",
			modelGroupNotExist: "#1目錄不存在。",
			modelSetNotExist: "模型集已被刪除，操作失敗。",
			addModelGroup: "新建目錄",
			modelGroupName:"名稱",
			modelNameExist:"已存在。",
			groupHasSameDataModel:"該目錄下存在同名#1。",
			moveUp: "上移",
			moveDown: "下移",
			unableMoveUp: "同層級的第一個目錄不支持上移。",
			unableMoveDown: "同層級的最後一個目錄不支持下移。",
			containChildren: "包含下級",
			addModelSuccess:"新建模型成功。",
			editModelSuccess:"編輯模型成功。",
			addModelFail:"新建失敗。",
			noModelTips: "暫無模型",
			modelNoDesc: "該模型暫無描述",
			modelName: "名稱",
			modelDesc: "描述",
			modelType: "類型",
			currentLocker: "當前鎖定人",
			deployStatus: "部署狀態",
			creator: "創建人",
			systemPreset: "系統預置",
			preset : "預置",
			createTime: "創建時間",
			modifier: "最後修改人",
			modifyTime: "最後修改時間",
			listView: "列表視圖",
			cardView: "卡片視圖",
			createSth: "新建#1",
			numberTips:"模型編碼是模型的唯一標識，創建模型後無法修改。",
			dataModelName:"名稱",
			dataModelDesc:"描述",
			modelNameTooLong: "名稱長度不能超過50個字符。",
			modelNameCannotBeEmpty: "請輸入名稱。",
			number:"編碼",
			modelNumberCannotBeEmpty:"請輸入編碼。",
			numberDuplicate:"編碼已存在，請重新輸入。",
			modelNumberTooLong:"編碼長度不能超過25個字符。",
			numberStandard: "編碼必須由字母、數字或下劃線組成，不能以數字開頭。",
			numberPlaceholder: "必須由字母、數字或下劃線組成，不能以數字開頭。",
			nameCannotBeEmpty: "名稱不可為空。",
			descriptionTooLong: "描述長度不能超過500個字符。",
			groupNameExist: "名稱重複。",
			addModelGroupText: "新建目錄",
			updateModelGroupText: "編輯目錄",
			parentModelGroup: "上級目錄",
			copyDataModel: "複製模型",
			copyTo: "複製到",
			copyModelSuccess: "複製模型成功。",
			duplicateNameInGroup: "該目錄下存在同名#1。",
			modelDuplicateNameInGroup: "該目錄下存在同名數據模型。",
			sameModelInGroup: "該目錄下存在同名模型。",
			modelGroupNotFound: "對應#1不存在或已被刪除。",
			moveDataModel: "移動模型",
			moveTo: "移動到",
			modelExistTargetModelGroup: "模型已經在目標目錄下。",
			moveModelSuccess: "移動模型成功。",
			modelGroupMaxLevel: "最多可支持4級目錄，當前目錄為第四級目錄，無法新增下級目錄。",
			dataSourceManage: "數據源管理",
			dataPermission: "數據權限",
			deleteModelBtn: "刪除",
			editModelBtn: "編輯",
			refresh: "刷新",
			batchDeploy: "批量部署",
			deployManager: "部署管理",
			dataAuth: "數據權限",
			deploy: "部署",
			import: "導入",
			export: "導出",
			move: "移動",
			copy: "複製",
			moreButton: "更多",
			searchContent: "請輸入搜索內容",
			selectEditModel: "請選擇需要編輯的模型。",
			editSingleModel: "請選擇單個模型進行編輯。",
			editModelProp: "編輯模型屬性",
			deleteModel: "請選擇需要刪除的模型。",
			confirmDeleteModel: "刪除“#1”模型後將無法恢復，確定刪除嗎？",
			confirmDeleteArrModel: "删除“#1”等#2个模型後將無法恢復，確定刪除嗎？",
			deleteModelRefer: "'#1'模型已被引用，確定要刪除嗎？",
			deleteDeployedModel: "“已部署”狀態的模型無法刪除。",
			deleteDeployedUpdateModel: "“部署後更改”狀態的模型無法刪除。",
			deleteArrDeployedModel: "“已部署”、“部署後更改”狀態的模型無法刪除。",
			deleteArrModelRefer: "'#1'模型已被引用，確定要刪除嗎？",
			operateConfirm:"操作確認",
			deleteModelSuccess: "刪除模型成功。",
			moveModel: "請選擇需要移動的模型。",
			copyModel: "請選擇需要複製的模型。",
			copyModelNum: "請選擇單個模型進行複製。",
			createGroup: "創建目錄",
			name: "名稱",
			groupNameCannotBeEmpty: "請輸入目錄名稱。",
			groupNameTooLong: "名稱長度不能超過50個字符。",
			modelManageException: "模型管理功能異常。",
			modelNotExist: "#1模型不存在或已被刪除。",
			modelNotExistOrBeDeleted: "模型不存在或已被刪除",
			deployed: "已部署",
			notDeployed: "未部署",
			deployedUpdate: "部署後更改",
			haveNotDeployed: "沒部署",
			nothingDeployed: "沒有部署",
			noDeployed: "非部署",
			moveModelNotExist: "模型不存在或已被刪除。",
			batchDeployGroupTips: "已爲您自動隱藏只有“已部署”狀態模型的目錄。",
			colon:"：",
			tipsModelNumber:"編碼",
			tipsModelDesc:"描述",
			tipsModelType:"類型",
			tipsModelLocker:"當前鎖定人",
			tipsModelDeployStatus:"部署狀態",
			tipsModelCreator:"創建人",
			tipsModelCreateTime:"創建時間",
			tipsModelModifier:"最後修改人",
			tipsModelModifyTime:"最後修改時間",
			noLocked:"暫未鎖定",
			previewMetrics:"查看指標",
			metricsPreview:"指標指标",
			close:"關閉",
			cancel: "取消",
			confirm: "確定",

			desc:"描述",
			description: "描述",
			descTooLong:"部署描述不能超過500個字符。",
			enterDeployDesc:"請輸入部署描述。",
			duplicateDeployException:"模型已部署，請勿重複部署。",
			modelNotExistException:"模型不存在或已被刪除，部署失敗。",
			operatorTips:"操作提示",
			iSee:"我知道了",
			deploySucceeded:"已成功部署",
			nowGoSetting:"現在去設置",
			dataRole:"數據權限",
			lockUser:"鎖定人",
			configIncompleteReason:"設置不完整原因",
			batchDeployModelLockCheckFailedTips:"選中的模型中存在被其他用戶鎖定的模型、以及設置不完整的模型，部署失敗。",
			deployModelLockCheckFailedTips:"模型已被其他用戶鎖定，並且設置不完整，部署失敗。",
			lockedModelPathAndLockUser:"被鎖定的模型路徑和鎖定人",
			configIncompleteModelPath:"設置不完整的模型路徑",
			batchDeployModelCheckFailedTips:"選中的模型中存在設置不完整的模型，部署失敗。",
			deployModelCheckFailedTips:"模型設置不完整，部署失敗。",
			batchDeployLockCheckFailedTips:"選中的模型中存在被其他用戶鎖定的模型，部署失敗。",
			deployLockCheckFailedTips:"模型已被其他用戶鎖定，部署失敗。",

			deployDeleteCheckFailedTips: "選中的模型中存在已被刪除的模型，部署失敗。",
			deployModelDeleteCheckFailedTips: "選中的模型中存在已被刪除的模型、以及設置不完整的模型，部署失敗。",
			deployModelDeleteLockFailedTips: "選中的模型中存在已被刪除的模型、以及被其他用戶鎖定的模型，部署失敗。",
			deployModelDeleteLockCheckFailedTips: "選中的模型中存在已被刪除的模型、被其他用戶鎖定的模型、以及設置不完整的模型，部署失敗。",
			deletedModel: "已被刪除的模型",
			lockedModelCannotDeploy: "被其他用戶鎖定的模型不允許部署，#1模型已被#2鎖定",
			notDeployedHelpIconTips: "在同一個模型集下，模型設計時可使用其他模型設計期的狀態，但在執行期(最新部署狀態執行時)只能使用其他模型的最新部署狀態。因此需要將引用的“未部署”狀態的模型一同部署。",
			deployedUpdateHelpIconTips: "在同一個模型集下，模型設計時可使用其他模型設計期的狀態，但在執行期(最新部署狀態執行時)只能使用其他模型的最新部署狀態。如果需要執行期與設計期的狀態保持一致，請將引用的“部署后更改“狀態的模型再次部署。",
			deployHelpIconTips: "如果需要執行期與設計期的狀態保持一致，請將引用的“部署后更改“狀態的模型再次部署。",
			deleteSingleRefModelTips: '該模型被"#1"模型在設計期引用，部署"#2"模型需要將引用的"未部署狀態的模型"一同部署。',
			deleteBatchRefModelTips: '該模型被"#1"等"#2"個模型在設計期引用，部署"#3"等模型需要將引用的"未部署狀態的模型"一同部署。',

			modelPath:"模型路徑",
			pleaseEnterSearchText:"請輸入搜索內容",
			selectedModel:"已選模型",
			clearAll:"全部清除",
			deployDesc:"部署描述",
			selectOneModelAtLeast:"請至少選中一個模型。",
			confirmDeploy:"模型部署並授權後可被其他用戶引用，確定部署嗎？",
			importModel: "導入模型",
			exportModel: "導出模型",
			importSuccessPrompt: "成功導入#1個模型。以下模型名稱沖突，請處理。",
			allIgnore: "全部忽略",
			allOverwrite: "全部覆蓋",
			allRename: "全部重命名",
			selectNone: "未選中模型。",
			resourceFileLimit: "保存失敗，輕存儲空間不足。",
			noModelAndGroup: "找不到對應的模型。",
			searchModelOrNumber: "搜索模型名稱/編碼",
			publicSourceException: "公共數據源異常",
			resourceFileIncomplete: "導入失敗，數據包不完整。",
			invalidPermissionForExport: "無導出權限",
			invalidPermissionForExportModel: "您沒有導出模型的權限。",
			noModelForExport: "沒有可供導出的模型。",
			importModelSuccess: "模型導入成功。",
			exportModelCorruptionException: "導出模型“#1”失敗，模型數據損壞或數據版本不相容。",
			importModelCorruptionException: "導入模型失敗，模型數據損壞或數據版本不相容。",
			noDataWarehouseConfigForImport: "目前環境未配置“輕數倉資料來源”參數，請聯絡管理員在MC中進行配置。",
			dataWarehouseConfigParseException: "“輕數倉資料來源”參數解析異常，請聯絡管理員在MC中重新配置。",
			MaterializedExceptionForImport: "導入失敗，模型物化儲存設定解析異常。",

			viewSystemVariable: "查看系統變量",
			emptyData: "暫無相關數據",

			selectedModelCycleRef: '"#1"模型存在循環引用，無法選擇。',
			batchSelectedModelCycleRef: '"#1"等"#2"個个模型存在循環引用，無法選擇。',

			modelNumberConflictPrompt: "以下模型與其他模型存在模型編碼衝突，已將模型編碼重命名。",
			modelNumber: "模型編碼",
			renameModelNumber: "重命名后的模型編碼"
		});

	oPackage = com.kingdee.bos.qing.modeler.mainpage.model;
	oManager.registPackageResources(oPackage,
		{
			systemPreset: "系統預置",
			deployed: "已部署",
			notDeployed: "未部署",
			deployedUpdate: "部署後更改"
		});
	var oPackage = com.kingdee.bos.qing.modeler.mainpage.imexport;
	oManager.registPackageResources(oPackage,{
		confirmDeploy:"模型部署並授權後可被其他用戶引用，確定部署嗎？",
		importModel: "導入模型",
		exportModel: "導出模型",
		sourceStrategy: "資源沖突處理策略(模型集中的數據源)",
		importSuccessPrompt: "成功導入#1個模型。以下模型名稱沖突，請處理。",
		allIgnore: "全部忽略",
		allOverwrite: "全部覆蓋",
		allRename: "全部重命名",
		selectNone: "未選中模型。",
		resourceFileLimit: "保存失敗，輕存儲空間不足。",
		noModelAndGroup: "找不到對應的模型。",
		searchModelOrNumber: "搜索模型名稱/編碼",
		publicSourceException: "公共數據源異常",
		resourceFileIncomplete: "導入失敗，數據包不完整。",
		invalidPermissionException: "權限檢查失敗",
		invalidPermissionForExportModel: "您沒有導出模型的權限。",
		noModelForExport: "沒有可供導出的模型。",
		importModelSuccess: "模型導入成功。",
		exportModelCorruptionException: "導出模型“#1”失敗，模型數據損壞或數據版本不相容。",
		importModelCorruptionException: "導入模型失敗，模型數據損壞或數據版本不相容。",
		noDataWarehouseConfigForImport: "目前環境未配置“輕數倉資料來源”參數，請聯絡管理員在MC中進行配置。",
		dataWarehouseConfigParseException: "“輕數倉資料來源”參數解析異常，請聯絡管理員在MC中重新配置。",
		MaterializedExceptionForImport: "導入失敗，模型物化儲存設定解析異常。",
		checkedNumberPrompt: "(已選擇 #1 項)",
		groupName: "模型目錄",
		modelName: "名稱",
		strategy: "處理策略",
		showOnlyChecked: "僅顯示選中項",
		ignore: "忽略",
		overwrite: "覆蓋",
		rename: "重命名",
		uploading: "正在上傳中...",
		uploadFail: "上傳失敗",
		fileTypeIncorrect: "文件類型不正確，請重新上傳。",
		uploadFileIsNull: "上傳的文件為空，請重新上傳。",
		fileTooLarge: "文件太大，請重新上傳。",
		iSee:"我知道了",
		modelNumberConflictPrompt: "以下模型與其他模型存在模型編碼衝突，已將模型編碼重命名。",
		modelNumber: "模型編碼",
		renameModelNumber: "重命名后的模型編碼"
	});
})();