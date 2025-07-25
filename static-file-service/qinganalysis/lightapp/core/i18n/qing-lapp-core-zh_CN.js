(function()
{
	var oManager = com.kingdee.bos.qing.framework.common.MultilanguageManager;
	var oPackage = com.kingdee.bos.qing.lapp.ui;
	oManager.registPackageResources(oPackage, 
	{
		//qing-lapp-longer-ui.js
		
		busyServer: "服务器忙，请稍后重试。",
		tryAgain: "再试试",
		giveUp: "放弃",
		canNotRun: "不能正常执行。\n由于庞大的数据规模，为防止系统崩溃，执行引擎在处理能力上作了限制。",
		dataEmpty: "没有数据可供分析和展现",
		relationMissing: "分析引擎一脸懵圈。可能是：\n1、您错误地使用了不同数据表中的字段，它们逻辑上不能同时出现。\n2、数据表之间缺少关联关系。可能数据模型不完整，请先在“数据准备”中建立关系。",
		nessaryDimensionMissing: "缺少必要的维度：",
		followed: "已关注",
		follow: "关注",
		share: "分享",
		horizontalScreen: "横屏",
		verticalScreen: "竖屏",
		refresh: "刷新",
		rollout: "上卷",
		filter: "过滤",
		rowCount: "共#1行",
		viewData: "查看数据",
		showAllFields: "显示所有字段",
		legend: "图例",
		cellNum:"序号",
		cancel: "取消",
		close: "关闭",
		OK: "确定",
		noMatchedSearch: "没有符合搜索条件的结果",
		invalidField: "无效的字段",
		theFieldDataTypeDoesNotMatchTheFilter: "字段数据类型与筛选器不匹配",
		all: "（全选）",
		selectAllFilterValue: "全选筛选值",
		clearAllFilterValue: "清空筛选值",
		noAlternativeValues: "没有备选值",
		noOptionValue: "没有相关值选项",
		custom: "自定义",
		today: "今天",
		thisWeek: "本周",
		thisMonth: "本月",
		itemsAndSoOn: "其它#1项",
		selectAll: "全选",
        selectedCount: "（已选择 #1 项）",
		about: "信息",
		cardInfo: "数据卡片信息",
		dsbInfo: "仪表板信息",
		publishTime: "发布时间：",
		publisher: "发布人：",
		extractDataTime: "数据更新时间：",
		loginOrg: "当前登录组织：",
		dataUrl: "数据内容链接 ",
		copySuccess: "复制成功",
		copyFail: "复制失败",
	});
	
	var oPackage = com.kingdee.bos.qing.lapp.component;
	oManager.registPackageResources(oPackage, 
	{
		cancel: "取消",
		OK: "确定",
		close: "关闭",
		search: "搜索",
		dateSliderSelectorYear: "年",
		dateSliderSelectorMonth: "月",
		dateSliderSelectorDay: "日",
		calendarYear: "年",
		calendarYearCharacter: "年",
		calendarMonth:"月",
		calendarMonthCharacter: "月",
		calendarDay: "日",
		dateSliderQuarter: "季度",
		fromDate: "开始日期",
		toDate: "结束日期",
		noMatchedSearch: "没有符合搜索条件的结果",
		selectAll: "全选",
		selectedCount: "（已选择#1项）",
		clear: "清除"
	});
})();