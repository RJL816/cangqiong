(function()
{
	var oManager = com.kingdee.bos.qing.framework.common.MultilanguageManager;
	var oPackage = com.kingdee.bos.extreport.handover;
	oManager.registPackageResources(oPackage,
		{
			searchBoxPlaceholder: "蒐索來源名稱/來源路徑/發佈名稱/發佈路徑",
			handOverRecordDesc: " <b style='color: rgb(51, 51, 51)'>#1</b> 將數據內容從 <b style='color: rgb(51, 51, 51)'>#2</b> 移交給 <b style='color: rgb(51, 51, 51)'>#3</b>",
			sourceName: "來源名稱",
			sourceType: "來源類型",
			sourcePathName: "來源路徑",
			sourceCreator: "擁有者",
			publishName: "發布名稱",
			publishPath: "發布路徑"
		});
})();