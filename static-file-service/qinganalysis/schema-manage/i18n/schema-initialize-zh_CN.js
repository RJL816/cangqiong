(function()
{
	var oManager = com.kingdee.bos.qing.framework.common.MultilanguageManager;
	var oPackage = com.kingdee.bos.qing.schemamanage;
	oManager.registPackageResources(oPackage, 
	{
		analysisScheme: "分析方案",
		infoTip: "提示",
		unmatchedType: "文档类型与当前环境不匹配。",
		parseError: "方案解析出错",
		compatibleHighVersion: "此方案是由高版本的轻分析所创建，系统已自动兼容其中的可识别部分。",
		ok: "确定",
		save: "保存",
		saveAs: "另存为",
		saveScheme: "保存方案",
		saveAsScheme: "另存方案",
		existSchemeName: "方案名称已存在",
		exeError: "执行错误，错误码：",
		contactSupport: "，请联系支持人员",
		currentScheme: "当前方案：",
		schemeName: "方案名称：",
		editScheme: "修改方案名称",
		editSuccess: "编辑成功",
		saveSuccess: "保存成功。",
		cancelDefaultScheme: "取消默认方案",
		setDefaultScheme: "设为默认方案",
		schemaNotExist: "方案已被删除",
		chooseMap: "请选择地图模板",
		
		databaseConnectionException: "数据库连接异常：",
		publishNoOperAuthException: "没有操作权限。",

		//多方案发布
		publishSchema: "发布方案",
		ThemeIsDel: "该发布记录的来源被删除",
		publishInfoExist: "发布记录不存在或已被删除",
		notAuthority: "您没有该发布记录的查看权限, 请联系发布人",
		authority: "授权",
		publishPlanExist: "该分析方案不存在或已被删除"
	});
})();