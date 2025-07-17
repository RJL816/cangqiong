(function ()
{
	var oManager = com.kingdee.bos.qing.framework.common.MultilanguageManager;
	var oPackage = com.kingdee.bos.qing.modeler.common.ui;
	oManager.registPackageResources(oPackage,
		{
            rootNode:"全部",
            group: "目录",
            noDataTips: "暂无数据",
            containChildren: "包含下级",
			searchNoDataTips: "没有符合搜索条件的结果",
			searchNoDataShortTips: "没有符合搜索条件的结果"
		});

	oPackage = com.kingdee.bos.qing.modeler.common.model;
	oManager.registPackageResources(oPackage,
		{
			dataTableModelType: "数据表模型",
			entityModelType: "实体模型",
			relationModelType: "关系模型",
			metricsModelType:"指标模型"
		});
})();