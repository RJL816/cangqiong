(function()
{
	var oManager = com.kingdee.bos.qing.framework.common.MultilanguageManager;
	var oPackage = com.kingdee.bos.extreport.handover;
	oManager.registPackageResources(oPackage,
		{
			searchBoxPlaceholder: "搜索名称/路径/发布名称/发布路径",
			handOverRecordDesc: " <b style='color: rgb(51, 51, 51)'>#1</b> 将数据内容从 <b style='color: rgb(51, 51, 51)'>#2</b> 移交给 <b style='color: rgb(51, 51, 51)'>#3</b>",
			sourceName: "名称",
			sourceType: "类型",
			sourcePathName: "路径",
			sourceCreator: "拥有者",
			publishName: "发布名称",
			publishPath: "发布路径"
		});
})();