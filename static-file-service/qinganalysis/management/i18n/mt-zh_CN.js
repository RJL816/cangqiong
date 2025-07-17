(function()
{
	var oManager = com.kingdee.bos.qing.framework.common.MultilanguageManager;
	var oPackage = com.kingdee.bos.qing.management.handover;
	oManager.registPackageResources(oPackage, 
	{
		handOverRecordDesc: "管理员 #1 将数据内容从 #2 移交给 #3",
		sourceName: "来源名称",
		sourceType: "来源类型",
		sourcePathName: "来源路径",
		sourceCreator: "拥有者",
		publishName: "发布/推送名称",
		publishType: "类型",
		publishPath: "发布路径",
		searchBoxPlaceholder: "搜索来源名称/来源路径/发布名称/推送名称/发布路径",
		lightapp: "移动轻应用：",
		currentUserLackOpenId: "获取当前用户轻应用信息失败，请先同步当前用户轻应用信息。",
		loadLappFailed: "获取移动端发布信息失败，无法移交移动端发布信息。"
	});
})();