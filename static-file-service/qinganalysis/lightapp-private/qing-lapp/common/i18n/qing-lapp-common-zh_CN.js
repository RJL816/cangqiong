(function()
{
	var oManager = com.kingdee.bos.qing.lapp.framework.common.MultilanguageManager;
	var oPackage = com.kingdee.bos.qing.lapp.component;
	oManager.registPackageResources(oPackage, 
	{
		//qing-lapp-component.js
		
		confirmTips: "操作确认",
		done: "完成",
		search: "搜索",
		clear: "清除",
		fixError: "出错了，程序猿正在努力修复中…",
		understand: "我知道了",
		cancel: "取消",
		OK: "确定",
		pullDownToRefresh: "下拉刷新",
		releaseToRefresh: "松手刷新",
		refreshing: "刷新中...",
		refreshSuccess: "刷新成功",
		refreshFailed: "刷新失败"
	});
	
	oPackage = com.kingdee.bos.qing.lapp.common.ui;
	oManager.registPackageResources(oPackage, 
	{
		noDesc: "暂无描述",
		desc: "描述：",
		thumbnail: "缩略图：",
		bottomAnnotation: "底部备注：",
		noBottomAnnotation: "暂无底部备注"
	});
})();