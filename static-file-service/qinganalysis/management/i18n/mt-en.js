(function()
{
	var oManager = com.kingdee.bos.qing.framework.common.MultilanguageManager;
	var oPackage = com.kingdee.bos.qing.management.handover;
	oManager.registPackageResources(oPackage, 
	{
		handOverRecordDesc: "The administrator #1 transfers the data content from #2 to #3",
		sourceName: "Source name",
		sourceType: "Source type",
		sourcePathName: "Source path",
		sourceCreator: "Owner",
		publishName: "Publish/Push name",
		publishType: "Publish type",
		publishPath: "Publish path",
		searchBoxPlaceholder: "Search Source Name/Source Path/Publishing Name/Push Name/Publishing Path",
		lightapp: "Light App:",
		currentUserLackOpenId: "Failed to get current user light app information, please synchronize current user light app information first.",
		loadLappFailed: "Failed to get current light app publish information,lapp publish can not be handover."
	});
	
})();