(function()
{
	var oManager = com.kingdee.bos.qing.framework.common.MultilanguageManager;
	var oPackage = com.kingdee.bos.qing.message.ui;
	oManager.registPackageResources(oPackage, 
	{
		message: "消息",
		allType: "全部類型",
		biz: "業務消息",
		featureUpdate: "特性更新",
		system: "系統消息",
		clearUnreadMessage: "清除所有未讀消息",
		clearUnReadLabel: "清除未讀",
		search: "搜索",
		searchContent: "請輸入搜索內容",
		clearAllUnreadMessageWarn: "暫無未讀消息",
		confirmClearAllUnreadMessage: "確定清除消息盒子的所有未讀嗎？",
		clearAllUnreadMessageSuccess: "清除未讀成功",
		noMoreDataNotice: "沒有更多消息了",
		handlerUnReadMessageSuccess: "標記已讀成功",
		deleteNoBizMessageNotice: "只能刪除“業務消息”",
		confirmDelMessage: "刪除后將無法恢復，確定刪除該條消息嗎？",
		deleteMessageSuccess: "刪除消息成功刪",
		noMessageNotice: "暫無相關消息",
		noSearchMessageNotice: "沒有符合搜索條件的結果",
		messageSeeTitle: "消息查看",
		lastLabelText: "上一條",
		close: "關閉",
		nextLabelText: "下一條",
		noMoreMessage: "沒有更多了。",
		clickToView: "點擊查看",
		markToRead: "標記已讀",
		markToUnRead: "標記未讀",
		deleteSth: "删除...",
		messageISee : "我知道了",
		allAppType : "全部應用",
		qingApp : "輕分析",
		qrtApp : "輕報表",
		qdmApp : "輕建模"
	});

	var oPackage = com.kingdee.bos.qing.message.common;
	oManager.registPackageResources(oPackage,
	{
		messageSeeTitle: "消息查看",
		lastLabelText: "上一條",
		close: "關閉",
		nextLabelText: "下一條",
		messageISee : "我知道了"
	});
})();