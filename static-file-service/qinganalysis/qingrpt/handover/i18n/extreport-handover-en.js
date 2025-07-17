(function()
{
	var oManager = com.kingdee.bos.qing.framework.common.MultilanguageManager;
	var oPackage = com.kingdee.bos.extreport.handover;
	oManager.registPackageResources(oPackage,
		{
			searchBoxPlaceholder: "Search Source Name/Source Path/Publishing Name/Publishing Path",
			handOverRecordDesc: " <b style='color: rgb(51, 51, 51)'>#1</b> transfers the data content from <b style='color: rgb(51, 51, 51)'>#2</b> to <b style='color: rgb(51, 51, 51)'>#3</b>",
			sourceName: "Source name",
			sourceType: "Source type",
			sourcePathName: "Source path",
			sourceCreator: "Owner",
			publishName: "Publish name",
			publishPath: "Publish path"
		});
})();