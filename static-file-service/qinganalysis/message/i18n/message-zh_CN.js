(function()
{
	var oManager = com.kingdee.bos.qing.framework.common.MultilanguageManager;
	var oPackage = com.kingdee.bos.qing.message.ui;
	oManager.registPackageResources(oPackage, 
	{
		message: "消息",
		allType: "全部类型",
		biz: "业务消息",
		featureUpdate: "特性更新",
		system: "系统消息",
		clearUnreadMessage: "清除所有未读消息",
		clearUnReadLabel: "清除未读",
		search: "搜索",
		searchContent: "请输入搜索内容",
		clearAllUnreadMessageWarn: "暂无未读消息",
		confirmClearAllUnreadMessage: "确定清除消息盒子的所有未读吗？",
		clearAllUnreadMessageSuccess: "清除未读成功",
		noMoreDataNotice: "没有更多消息了",
		handlerUnReadMessageSuccess: "标记已读成功",
		deleteNoBizMessageNotice: "只能删除“业务消息”",
		confirmDelMessage: "删除后将无法恢复，确定删除该条消息吗？",
		deleteMessageSuccess: "删除消息成功",
		noMessageNotice: "暂无相关消息",
		noSearchMessageNotice: "没有符合搜索条件的结果",
		messageSeeTitle: "消息查看",
		lastLabelText: "上一条",
		close: "关闭",
		nextLabelText: "下一条",
		noMoreMessage: "没有更多了。",
		clickToView: "点击查看",
		markToRead: "标记已读",
		markToUnRead: "标记未读",
		deleteSth: "删除...",
		messageISee : "我知道了",
		allAppType : "全部应用",
		qingApp : "轻分析",
		qrtApp : "轻报表",
		qdmApp : "轻建模"
	});

	var oPackage = com.kingdee.bos.qing.message.common;
	oManager.registPackageResources(oPackage,
		{
			messageSeeTitle: "消息查看",
			lastLabelText: "上一条",
			close: "关闭",
			nextLabelText: "下一条",
			messageISee : "我知道了"
		});
})();