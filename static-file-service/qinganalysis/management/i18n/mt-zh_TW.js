(function()
{
	var oManager = com.kingdee.bos.qing.framework.common.MultilanguageManager;
	var oPackage = com.kingdee.bos.qing.management.handover;
	oManager.registPackageResources(oPackage, 
	{
		handOverRecordDesc: "管理員 #1 將數據內容從 #2 移交給 #3",
		search: "搜索",
		hasDeleted: "來源已被刪除",
		sourceName: "來源名稱",
		sourceType: "來源類型",
		sourcePathName: "來源路徑",
		sourceCreator: "擁有者",
		publishName: "發布/推送名稱",
		publishType: "類型",
		searchBoxPlaceholder: "蒐索來源名稱/來源路徑/發佈名稱/推送名稱/發佈路徑",
		publishPath: "發布路徑",
		lightapp: "移動輕應用：",
		currentUserLackOpenId: "獲取當前用戶輕應用信息失敗，請先同步當前用戶輕應用信息。",
		loadLappFailed: "獲取移動端發佈信息失敗，無法移交移動端發佈信息。"
	});
	
})();