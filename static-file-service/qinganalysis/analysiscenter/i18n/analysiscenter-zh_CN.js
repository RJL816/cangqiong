(function()
{
	var oManager = com.kingdee.bos.qing.framework.common.MultilanguageManager;
	var oPackage = com.kingdee.bos.qing.analysiscenter;
	oManager.registPackageResources(oPackage, 
	{
		emptyTips: "暂无发布记录。",
		qingAnalysisCenter: "数据工作台阅览夹",
		
		failToLoadPublishInfo: "获取发布数据失败",
		publishInfoNotFind: "该菜单不存在或已被删除",
		publishedDsbNotFind: "该菜单对应的仪表板数据不存在或已被删除",
		noPermission : "您没有权限访问该菜单",
		publishedThemeNotFind: "该菜单对应的业务主题不存在或已被删除",
		publishedDsbNotFind: "该菜单对应的仪表板不存在或已被删除",
		openTips: "请点击左侧菜单进行查看",
		enterSearchPublishName: "搜索发布名称",
		nothingSearched: "没有符合搜索条件的结果",
		preset: "预置",
		currentFirstDirectoryCannotMoveUp: "同层级第一个目录或发布记录不支持上移。",
		menuCannotMoveUpToDirectory: "同层级目录发布记录不支持移动到目录上方。",
		cannotBeMovedToAnnotherLevel: "非同层级目录或发布记录不支持移动。",
		pleaseSelectedDirectory: "请先选中具体的目录。",
		currentLastDirectoryCannotMoveDown: "同层级最后一个目录或发布记录不支持下移。",
		directoryCannotMoveDownToMenu: "同层级目录不支持移动到发布记录下方。",
		maxTabCountError: "页签最多可同时打开10个，请关闭部分页签后再试",
		
		confirmExit: "检测到您有更改内容，是否不保存直接退出？若不保存，将丢失这些更改。",
		sureExit: "直接退出",
		sureReturn: "返回编辑",
		
		moveUp: "上移",
		moveDown: "下移",
		manualSort: "手工排序",
		retract: "收起",
		spread: "展开",
		refresh: "刷新",
		search: "搜索",
		confirmOK: "确定",
		cancle: "取消"
	});
})();