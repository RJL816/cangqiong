(function()
{
	var oManager = com.kingdee.bos.qing.lapp.framework.common.MultilanguageManager;
	var oPackage = com.kingdee.bos.qing.share;
	oManager.registPackageResources(oPackage, 
	{
		contentHasBeenDeleted: "分享记录已被删除，或分析已被删除。",
		reply: "回复",
		colon: "：",
		share: "分享",
		comment: "评论",
		like: "点赞",
		oneMinAgo: "1分钟前",
		liked: "已赞",
		peopleWhoLiked: "已赞：",
		comma: "，",
		send: "发送",
		cancel: "取消",
		fixError: "出错了，程序猿正在努力修复中…",
		understand: "我知道了",
		loading: "正在加载...",
		qingAnalysis: "轻分析"
	});
	
	oPackage = com.kingdee.bos.qing.share.framework;
	oManager.registPackageResources(oPackage, 
	{
		promotForNetworkError: "哎呀，网络加载失败了",
		promotForNetworkErrorRetry: "请检查网络设置或轻触屏幕重新加载",
		promptForErrorCode0: "由于网络问题，不能正常连接到服务器。",
		remoteCallException: "访问服务器过程出现错误：",
		errorCode: "错误码："
	});

	oPackage = com.kingdee.bos.qing.share.common.ui;
	oManager.registPackageResources(oPackage,
	{
		contentHasBeenDeleted: "分享记录已被删除，或分析已被删除。",
		reply: "回复",
		colon: "：",
		share: "分享",
		comment: "评论",
		like: "点赞",
		oneMinAgo: "1分钟前",
		liked: "已赞",
		peopleWhoLiked: "已赞：",
		comma: "，",
		send: "发送",
		cancel: "取消",
		fixError: "出错了，程序猿正在努力修复中…",
		understand: "我知道了",
		loading: "正在加载...",
		qingAnalysis: "轻分析"
	});

	oPackage = com.kingdee.bos.qing.exhibition.extend.ui;
	oManager.registPackageResources(oPackage,
	{
		comment: "评论",
		like: "点赞",
		oneMinAgo: "1分钟前",
		liked: "已赞",
		peopleWhoLiked: "已赞："
	});
})();