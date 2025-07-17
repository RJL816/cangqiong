(function()
{
	var oManager = com.kingdee.bos.qing.lapp.framework.common.MultilanguageManager;
	var oPackage = com.kingdee.bos.qing.share;
	oManager.registPackageResources(oPackage, 
	{
		contentHasBeenDeleted: "The share record  or the analysis has been deleted.",
		reply: "reply",
		colon: ":",
		share: "Share",
		comment: "Comment",
		like: "Like",
		oneMinAgo: "1 minute ago",
		liked: "Liked",
		peopleWhoLiked: "Like:",
		comma: ",",
		send: "Send",
		deletes: "Delete",
		cancel: "Cancel",
		fixError: "Error, the programmer is trying to fix it...",
		understand: "I see",
		loading: "Loading...",
		qingAnalysis: "Qing Analysis"
	});
	
	oPackage = com.kingdee.bos.qing.share.framework;
	oManager.registPackageResources(oPackage, 
	{
		promotForNetworkError: "network loading failure",
		promotForNetworkErrorRetry: "Please check the network settings or touch the screen to reload",
		promptForErrorCode0: "Can not connect to server.",
		remoteCallException: "Visiting server error:",
		errorCode: "Error Code:"
	});

	oPackage = com.kingdee.bos.qing.share.common.ui;
	oManager.registPackageResources(oPackage,
	{
		contentHasBeenDeleted: "The share record  or the analysis has been deleted.",
		reply: "reply",
		colon: ":",
		share: "Share",
		comment: "Comment",
		like: "Like",
		oneMinAgo: "1 minute ago",
		liked: "Liked",
		peopleWhoLiked: "Like:",
		comma: ",",
		send: "Send",
		deletes: "Delete",
		cancel: "Cancel",
		fixError: "Error, the programmer is trying to fix it...",
		understand: "I see",
		loading: "Loading...",
		qingAnalysis: "Qing Analysis"
	});

	oPackage = com.kingdee.bos.qing.exhibition.extend.ui;
	oManager.registPackageResources(oPackage,
	{
		comment: "Comment",
		like: "Like",
		oneMinAgo: "1 minute ago",
		liked: "Liked",
		peopleWhoLiked: "Like:"
	});
})();