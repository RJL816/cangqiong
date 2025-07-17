(function()
{
	var oManager = com.kingdee.bos.qing.framework.common.MultilanguageManager;
	var oPackage = com.kingdee.bos.qing.message.ui;
	oManager.registPackageResources(oPackage, 
	{
		message: "Message",
		allType: "All Type",
		biz: "Business message",
		featureUpdate: "Feature update",
		system: "System message",
		clearUnreadMessage: "Clear all unread messages",
		clearUnReadLabel: "Clear unread message",
		search: "Search",
		searchContent: "Please input search content.",
		clearAllUnreadMessageWarn: "No unread messages",
		confirmClearAllUnreadMessage: "Are you sure you want to clear all unread messages？",
		clearAllUnreadMessageSuccess: "All unread messages have been cleared",
		noMoreDataNotice: "No more message",
		handlerUnReadMessageSuccess: "Mark read success",
		deleteNoBizMessageNotice: "Only “business messages” can be deleted",
		confirmDelMessage: "It will not be recovered after deletion. Are you sure to delete this message？",
		deleteMessageSuccess: "The message has been deleted",
		noSearchMessageNotice: "No results match the search",
		noMessageNotice: "No message",
		messageSeeTitle: "Message view",
		lastLabelText: "Last item",
		close: "Close",
		nextLabelText: "Next item",
		noMoreMessage: "No more messages.",
		clickToView: "Click to view",
		markToRead: "Mark read",
		markToUnRead: "Mark unread",
		deleteSth: "Delete...",
		messageISee : "I see",
		allAppType : "All app",
		qingApp : "Qing Analysis",
		qrtApp : "Qing Report",
		qdmApp : "Qing Modeler"
	});

	var oPackage = com.kingdee.bos.qing.message.common;
	oManager.registPackageResources(oPackage,
	{
		messageSeeTitle: "Message view",
		lastLabelText: "Last item",
		close: "Close",
		nextLabelText: "Next item",
		messageISee : "I see"
	});
})();