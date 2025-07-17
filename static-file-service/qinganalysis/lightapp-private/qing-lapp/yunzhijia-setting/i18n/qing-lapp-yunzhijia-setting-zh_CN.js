(function()
{
	var oManager = com.kingdee.bos.qing.lapp.framework.common.MultilanguageManager;
	var oPackage = com.kingdee.bos.qing.lapp.yunzhijia.setting.ui;
	oManager.registPackageResources(oPackage, 
	{
		cardContentSetting: "卡片内容设置",
		webAutoplay: "网页端轮播：",
		desktopAutoplay: "桌面端轮播：",
		mobileAutoplay: "移动端轮播：",
		open: "开启",
		close: "不开启",
		autoplayTime: "轮播时间(秒)：",
		contentSource: "内容源：",
		follow: "关注",
		followTips: "（选择“关注”时，卡片上将只展示用户在移动轻应用中“关注”页签下的前 5 项数据可视化内容）",
		custom: "自定义",
		customTips: "（选择“自定义”时，可选择当前用户有权限查看的数据可视化内容，最多选择 3 项）",
		noSelectCard: "请至少选择一项数据可视化内容",
		selectContent: "选择数据可视化内容",
		confirmClearSelectedAnalysis: "确认清空已选择的数据可视化内容吗？",
		selectedOneContent: "已选择 “#1”1 项数据可视化内容",
		selectedMoreContent: "已选择 #1 项数据可视化内容",
		selectedNumLimit: "最多选择3项数据可视化内容",
		datacenter: "数据中心：",
		clearAll: "全部清除",
		selected: "已选(#)",
		analysisNoFound: "该数据可视化内容已被删除或没有权限查看",
		noAnalysis: "暂无数据可视化内容",
		publishDirectory: "发布目录",
		noSearchAnalysis: "没有符合搜索条件的结果"
	});
})();