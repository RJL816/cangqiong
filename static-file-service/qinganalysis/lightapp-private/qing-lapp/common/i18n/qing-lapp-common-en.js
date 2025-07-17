(function()
{
	var oManager = com.kingdee.bos.qing.lapp.framework.common.MultilanguageManager;
	var oPackage = com.kingdee.bos.qing.lapp.component;
	oManager.registPackageResources(oPackage, 
	{
		//qing-lapp-component.js
		
		confirmTips: "Confirm",
		done: "Done",
		search: "Search",
		clear: "Clear",
		fixError: "Error, the programmer is trying to fix it...",
		understand: "I see",
		cancel: "Cancel",
		OK: "OK",
		pullDownToRefresh: "Pull down to refresh",
		releaseToRefresh: "Release and refresh",
		refreshing: "refreshing...",
		refreshSuccess: "Refresh succeeded",
		refreshFailed: "Refresh Failed"
	});
	
	oPackage = com.kingdee.bos.qing.lapp.common.ui;
	oManager.registPackageResources(oPackage, 
	{
		noDesc: "no description",
		desc: "description：",
		thumbnail: "thumbnail：",
		bottomAnnotation: "bottom annotation：",
		noBottomAnnotation: "no bottom annotation"
	});
})();