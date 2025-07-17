(function()
{
	var oManager = com.kingdee.bos.qing.lapp.framework.common.MultilanguageManager;
	var oPackage = com.kingdee.bos.qing.lapp.framework.common;
	oManager.registPackageResources(oPackage, 
	{
		promotForNetworkError: "哎呀，网络加载失败了",
		promotForNetworkErrorRetry: "请检查网络设置或轻触屏幕重新加载",
		promptForErrorCode0: "由于网络问题，不能正常连接到服务器。",
		remoteCallException: "访问服务器过程出现错误：",
		errorCode: "错误码："
	});
})();