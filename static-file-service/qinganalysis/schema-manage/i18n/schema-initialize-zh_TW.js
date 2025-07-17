(function()
{
	var oManager = com.kingdee.bos.qing.framework.common.MultilanguageManager;
	var oPackage = com.kingdee.bos.qing.schemamanage;
	oManager.registPackageResources(oPackage, 
	{
		analysisScheme: "分析方案",
		infoTip: "提示",
		unmatchedType: "文檔類型與當前環境不匹配。",
		parseError: "方案解析出錯",
		compatibleHighVersion: "此方案是由高版本的輕分析所創建，系統已自動相容其中的可識別部分。",
		ok: "確定",
		save: "保存",
		saveAs: "另存為",
		saveScheme : "保存方案",
		saveAsScheme: "另存方案",
		existSchemeName: "方案名稱已存在",
		exeError: "執行錯誤，錯誤碼：",
		contactSupport: "，請聯繫支持人員",
		currentScheme: "當前方案：",
		schemeName: "方案名稱：",
		editScheme: "修改方案名稱",
		editSuccess: "編輯成功",
		saveSuccess: "保存成功。",
		cancelDefaultScheme: "取消默認方案",
		setDefaultScheme: "設為默認方案",
		schemaNotExist: "方案已被刪除",
		chooseMap: "請選擇地圖模板",
		
		databaseConnectionException: "數據庫連接異常：",
		publishNoOperAuthException: "沒有操作權限。",

		//多方案發佈
		publishSchema: "發佈方案",
		ThemeIsDel: "該發佈記錄的來源被刪除",
		publishInfoExist: "發佈記錄不存在或已被刪除",
		notAuthority: "您沒有該發佈記錄的查看權限，請聯系發佈人",
		authority: "授權",
		publishPlanExist: "該分析方案不存在或已被刪除"
	});
})();