(function()
{
	var oManager = com.kingdee.bos.qing.framework.common.MultilanguageManager;
	var oPackage = com.kingdee.bos.qing.modeler.scene;
	oManager.registPackageResources(oPackage,
	{
		qingModeler: "轻建模",
		description: "描述",
		sourceManage: "数据源管理",
		businessEntity: "业务实体",
		dataCenter: "当前数据中心",
		save: "保存",
		saveSuccess: "保存成功。",
		refresh: "刷新",
		confirmRefresh: "刷新模型会丢失未保存的修改，确定要刷新吗？",
		saveSuccessButInvalid: "保存成功。模型设置不完整，不允许部署。",
		saveFail: "保存失败",
		deploy: "部署",
		needSaveBeforeDeploy: "部署前请先进行保存。",
		deploySuccess: "部署成功。",
		deployFailed: "部署失败",
		rollback: "模型回退",
		rollbackSuccess: "模型回退成功。",
		rollbackConfirmTips: "回退到最新部署状态后，当前#1会被最近一次部署状态覆盖，确定回退吗？",
		rollBackToLatest: "回退到最新部署状态",
		noDeployedToRollBack: "模型暂未部署，无法进行回退。",
		deployManage: "部署管理",
		closeTab: "退出",
		unlockFailed: "解锁失败",
		lockFailed: "锁定失败",
		refreshFailed: "刷新失败",
		loadModelFailed: "加载失败",
		presetModelCannotEdit: "预置的模型不允许保存、部署等操作，如有需要，可复制模型集后再进行操作。",
		deployDesc: "部署描述",
		deployDescTooLong: "部署描述不能超过500个字符。",
		enterDeployDesc: "请输入部署描述。",
		alreadyDeployed: "模型已部署，请勿重复部署。",
		modelIsClean: "模型内容未修改。",
		modelDuplicateNameInGroup:"#1，该目录下存在同名数据模型。",
		modelManageException: "模型管理功能异常。",
		modelNotFound: "#1，模型已被删除。",
		modelVersionIsNotNew: "模型在打开设计器后已被他人修改，将重新加载最新模型。",
		operatorTips: "操作提示",
		deploySucceeded: "已部署成功",
		nowGoSetting:"现在去设置",
		dataRole:"数据权限",
		modelerDeployFailed: "#1设置不完整，部署失败",
		dataModeling: "数据准备",
		editTimedPushContent: "编辑发布方案",
		modelSet: "模型集",
		incompleteMaterializedConfig: "物化存储设置不完整，部署失败。",
		duplicateMetricNumber: "#1。指标编码“#2”已被使用，请重新输入指标编码。",
		duplicateMetricNumber2: "#1。“#2”等#3个指标编码已被使用，请重新输入指标编码。",

		tableModel: "数据表模型",
		metricModel: "指标模型",
		relationModel: "关系模型",

		iSee: "我知道了",
		desc: "描述",
		notDeployedHelpIconTips: "在同一个模型集下，模型设计时可使用其他模型设计期的状态，但在执行期(最新部署状态执行时)只能使用其他模型的最新部署状态。因此需要将引用的“未部署”状态的模型一同部署。",
		deployedUpdateHelpIconTips: "在同一个模型集下，模型设计时可使用其他模型设计期的状态，但在执行期 (最新部署状态执行时)只能使用其他模型的最新部署状态。如果需要执行期与设计期的状态保持一致，请将引用的“部署后更改“状态的模型再次部署。",
		batchDeployModelLockCheckFailedTips: "选中的模型中存在被其他用户锁定的模型、以及设置不完整的模型，部署失败。",
		deployModelCheckFailedTips: "模型设置不完整，部署失败。",
		batchDeployLockCheckFailedTips: "选中的模型中存在被其他用户锁定的模型，部署失败。",
		configIncompleteReason: "设置不完整原因",
		deployLockByOtherFailedTips: "被其他用户锁定的模型不允许部署，’#1’模型已被#2锁定",
		modelIsInvalid: "模型解析异常，请重新设置模型。",
		deployModelCannotEdit: "您当前打开的是该模型的对应部署版本，不允许保存、部署等操作，如有需要，可从模型集主界面进入该模型设计器后再进行操作。",

		metricClassificationStandardManage : "指标体系管理",
		metricSystem: "指标体系"
	});

	if (com.kingdee.bos.qing.modeler.scene.metricanalysis)
	{
		oManager.registPackageResources(com.kingdee.bos.qing.modeler.scene.metricanalysis, {

		});
	}
})();