(function ()
{
	var oManager = com.kingdee.bos.qing.framework.common.MultilanguageManager;
	var oPackage = com.kingdee.bos.qing.modeler.common.ui;
	oManager.registPackageResources(oPackage,
		{
			rootNode:"All",
			group: "Catalog",
			noDataTips: "No data",
			containChildren: "Include sublevels",
			searchNoDataTips: "No results match your search criteria",
			searchNoDataShortTips: "No match results"
		});

	oPackage = com.kingdee.bos.qing.modeler.common.model;
	oManager.registPackageResources(oPackage,
		{
			dataTableModelType: "Data Table Model",
			entityModelType: "Entity Model",
			relationModelType: "Relation Model",
			metricsModelType:"Metric Model"
		});
})();