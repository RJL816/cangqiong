(function()
{
	var oManager = com.kingdee.bos.qing.framework.common.MultilanguageManager;
	var oPackage = com.kingdee.bos.qing.lapp.scene;
	oManager.registPackageResources(oPackage, 
	{
		//qing-lapp-longer-scene.js
        promptReExecute: "请退出后重新执行",
        promptNotEnoughMemory: "服务器忙，稍后重试……",
        promptErrorOccurred: "出错了",
        
        //card-error
        themeIsDeleted: "对应主题不存在或已被删除",
        themeHasNoData: "对应主题没有定义数据",
        componentSourceHasNotFound: "该组件来源已被删除",
        lackDataEntityAuthority: "尚未获得实体数据表的查看权限",
        subjectEntityMySQLMoreThan61Table: "当前实体关联数据表太多，请减少实体的分析字段或删除不需要的实体分录",
        subjectDataSourceError: "数据源发生异常，请联系发布人检查数据源",
        qingStorageFileSizeLimit: "轻存储空间不足",
        qingStorageNoSpace:"磁盘空间不足，请联系运维人员添加磁盘",
        subjectDBDataSourceError: "数据源对应的数据库连接异常，请联系发布人检查数据源",
        noDBCenterPermission: "没有数据中心权限，请联系管理员分配权限",
		noSuperQueryAuth: "没有当前超级查询模式的权限，请联系管理员分配权限",
        noDmoOwnerPermission: "发布人“#1”没有数据开发平台权限，请联系发布人检查权限",
        noDmoPermission: "没有数据开发平台权限，请联系管理员分配权限",
        dmoPermission: "没有数据开发平台#1权限，请检查数据开发平台权限",
        entityDestroyed: "对应主题的数据表被损坏，请联系发布人检查数据源",
        noDBCenterOwnerPermission: "发布人“#1”没有数据中心权限，请联系发布人检查权限",
		noSuperQueryPerm: "发布人“#1”没有超级查询相关模式的权限，请联系发布人检查权限",
		notExistTable: "无法在模式“#1”中找到该实体数据表",
		ownerNotExistTable: "数据源异常，请联系发布人检查数据源",
        cardHasNotFound: "该卡片已被删除",
        componentSourceNoAuthority: "没有该组件来源的查看权限",
        cardNoAuthority: "没有该卡片的查看权限",
        cardNoDefaultSchema: "该卡片没有定义默认方案",
        unsupportedDsbRefSource: "当前系统不支持该组件来源",
        illegalLicense: "当前系统没有【轻分析】模块的使用许可，请与系统管理员联系。",
        noQingModulePermission: "您所使用的账户没有被分配【轻分析】模块的使用许可，请与系统管理员联系。",
        illegalQingReportLicense:"当前系统没有【轻报表】模块的使用许可，请与系统管理员联系。",
        noQingReportModulePermission:"您所使用的账户没有被分配【轻报表】模块的使用许可，请与系统管理员联系。",
        noAuthorityForTheseEntities: "尚未获得以下实体数据表的查看权限：",
        qingRuntimeException: "程序发生错误",
        extractDataFail: "准备数据失败",
        executeFail: "图表执行失败",
        unknownException: "发生了未知错误",
        copyErrorLog: "复制错误日志",
        hasCopied: "已复制到剪贴板",
        semicolon: "；",
		entityNotSupportQingAnalysis: "业务实体未开启“支持轻分析”设置项，请在开发平台的对应表单中进行设置  ",
		viewDocument: "查看帮助文档",
		viewDetails: "查看详情",
		DetailInfo: "详细信息",
		notSupportQingAnalysis: "以下业务实体尚未开启“支持轻分析”设置项：",
		iknow: "我知道了",
		confirm: "确定",
		showMessage: "消息提示",
		loadError: "获取失败，请重试"
	});
})();