(function ()
{
	var oManager = com.kingdee.bos.qing.framework.common.MultilanguageManager;
	var oPackage = com.kingdee.bos.qing.modeler.common.ui;
	oManager.registPackageResources(oPackage,
		{
			rootNode:"全部",
			group: "目錄",
			noModelTips: "暫無數據",
			containChildren: "包含下級",
			searchNoDataTips: "沒有符合搜索條件的結果",
			searchNoDataShortTips: "沒有符合搜索條件的結果"
		});

	oPackage = com.kingdee.bos.qing.modeler.common.model;
	oManager.registPackageResources(oPackage,
		{
			dataTableModelType: "數據表模型",
			entityModelType: "實體模型",
			relationModelType: "關係模型",
			metricsModelType:"指標模型"
		});
})();