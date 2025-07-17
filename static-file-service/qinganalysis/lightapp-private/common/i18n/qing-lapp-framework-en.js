(function()
{
	var oManager = com.kingdee.bos.qing.lapp.framework.common.MultilanguageManager;
	var oPackage = com.kingdee.bos.qing.lapp.framework.common;
	oManager.registPackageResources(oPackage, 
	{
		promotForNetworkError: "network loading failure",
		promotForNetworkErrorRetry: "Please check the network settings or touch the screen to reload",
		promptForErrorCode0: "Can not connect to server.",
		remoteCallException: "Visiting server error:",
		errorCode: "Error Code:"
	});
})();