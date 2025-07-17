(function()
{
	var oManager = com.kingdee.bos.qing.framework.common.MultilanguageManager;
	var oPackage = com.kingdee.bos.qing.modeler.message.panel;
	oManager.registPackageResources(oPackage, 
	{
		operation: "操作",
		wOpen: "打开",
		dataTableModelType: "数据表模型",
		entityModelType: "实体模型",
		relationModelType: "关系模型",
		metricModelType: "指标模型",
		modelSetName: "模型集名称",
		modelSetDesc: "模型集描述",
		modelSetNotExistsOrDelete: "该模型集不存在或已被删除",
		add: "新增",
		update: "修改",
		delete: "删除",
		undeploy: "取消部署",
		modelName: "模型名称",
		modelDesc: "模型描述",
		path: "路径",
		status: "状态",
		modelDeployedNotExistsOrDelete: "该模型的部署记录不存在或已被删除",
		modelNotExistsOrDelete: "该模型不存在或已被删除",
		noDataTips: "暂无数据",
		noChangedModelTips: "暂无变更的模型",
		noModelPermission: "您不是该模型集的协作成员或者该模型集已被删除，无法打开该模型。",
		noModelSetPermission: "您不是该模型集的协作成员或者该模型集已被删除，无法打开该模型集。",
		scheduleName: "调度名称",
		executeStartTime:"执行开始时间",
		executeEndTime:"执行结束时间",
		executeState: "状态",
		fail: "失败",
		detail: "详情",
		errorCodeMessage: "错误信息：#1\r\n错误码：#2",
		errorMessage: "错误信息：#1。",
		errorCode: "错误码：#1。",
		noErrorCodeMessage: "暂无错误码和错误信息，请查看详情。",
		notFindExceptionLog: "未找到对应的日志。",
		pathTips: "路径格式为：模型集名称/目录名称。目录可能存在多层级，各层级之间由“/”分隔。",
		pathTips2: "路径格式为：模型集名称/目录名称/模型名称。目录可能存在多层级，各层级之间由“/”分隔。"
	});
})();