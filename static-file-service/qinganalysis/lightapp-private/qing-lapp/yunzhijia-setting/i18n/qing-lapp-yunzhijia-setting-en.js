(function()
{
	var oManager = com.kingdee.bos.qing.lapp.framework.common.MultilanguageManager;
	var oPackage = com.kingdee.bos.qing.lapp.yunzhijia.setting.ui;
	oManager.registPackageResources(oPackage, 
	{
		cardContentSetting: "Card Content Setting",
		webAutoplay: "Web Autoplay：",
		desktopAutoplay: "Desktop Autoplay：",
		mobileAutoplay: "Mobile Autoplay：",
		open: "open",
		close: "close",
		autoplayTime: "Autoplay Time(second)：",
		contentSource: "Content Source：",
		follow: "Follow",
		followTips: "(when “Follow” tab is selected, only the first five data visualization contents under the “Follow” tab of the mobile light application will be displayed on the card)",
		custom: "Custom",
		customTips:  "(when “Custom” tab is selected, you can select the data visualization content that the current user has permission to view, with a maximum of 3 items selected)",
		noSelectCard: "Please select at least one data visualization content",
		selectContent: "Select data visualization content",
		confirmClearSelectedAnalysis: "Are you sure to clear the selected data visualization?",
		selectedOneContent: "one data visualization content “#1” has been selected",
		selectedMoreContent: "selected #1 data visualization content",
		selectedNumLimit: "select up to three data visualization contents",
		datacenter: "Datacenter：",
		clearAll: "Clear All",
		selected: "selected(#)",
		analysisNoFound: "The data visualization content has been deleted or has no permission to view",
		noAnalysis: "No data visualization content",
		publishDirectory: "Publish Directory",
		noSearchAnalysis: "No results matching the search criteria"
	});
})();