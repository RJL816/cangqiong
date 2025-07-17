(function()
{
	var oManager = com.kingdee.bos.qing.framework.common.MultilanguageManager;
	var oPackage = com.kingdee.bos.qing.modeler.message.panel;
	oManager.registPackageResources(oPackage, 
	{
		operation: "操作",
		wOpen: "打開",
		dataTableModelType: "數據表模型",
		entityModelType: "實體模型",
		relationModelType: "關係模型",
		metricModelType: "指標模型",
		modelSetName: "模型集名稱",
		modelSetDesc: "模型集描述",
		modelSetNotExistsOrDelete: "該模型集不存在或已被刪除",
		add: "新增",
		update: "修改",
		delete: "刪除",
		undeploy: "取消部署",
		modelName: "模型名稱",
		modelDesc: "模型描述",
		path: "路徑",
		status: "狀態",
		modelDeployedNotExistsOrDelete: "該模型的部署記錄不存在或已被刪除",
		modelNotExistsOrDelete: "該模型不存在或已被删除",
		noDataTips: "暫無數據",
		noChangedModelTips: "暫無變更的模型",
		noModelPermission: "您不是該模型集的協作成員或者該模型集已被刪除，無法打開該模型。",
		noModelSetPermission: "您不是該模型集的協作成員或者該模型集已被刪除，無法打開該模型。",
		scheduleName: "調度名稱",
		executeStartTime:"執行開始時間",
		executeEndTime:"執行結束時間",
		executeState: "狀態",
		fail: "失敗",
		detail: "詳情",
		errorCodeMessage: "錯誤信息：#1\r\n錯誤碼：#2",
		errorMessage: "錯誤信息：#1。",
		errorCode: "錯誤碼：#1。",
		noErrorCodeMessage: "暫無錯誤碼和錯誤信息，請查看詳情。",
		notFindExceptionLog: "未找到相應的日誌。",
		pathTips: "路徑格式為：模型集名稱/目錄名稱。目錄可能存在多層級，各層級之間由“/”分隔。",
		pathTips2: "路徑格式為：模型集名稱/目錄名稱/模型名稱。目錄可能存在多層級，各層級之間由“/”分隔。"
	});
})();