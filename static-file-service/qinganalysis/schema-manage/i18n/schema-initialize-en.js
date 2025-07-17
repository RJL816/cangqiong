(function()
{
	var oManager = com.kingdee.bos.qing.framework.common.MultilanguageManager;
	var oPackage = com.kingdee.bos.qing.schemamanage;
	oManager.registPackageResources(oPackage, 
	{
		analysisScheme: "Schemas",
		infoTip: "Prompt",
		unmatchedType: "Document type does not match the current environment.",
		parseError: "Parse schema error",
		compatibleHighVersion: "This schema is created by qing analysis with high version, therefore identifiable parts has been compatible automatically by the system.",
		ok: "OK",
		save: "Save",
		saveAs: "Save As",
		saveScheme : "Save",
		saveAsScheme: "Save As",
		existSchemeName: "Schema name already exists",
		exeError: "Execution error, Error Code:",
		contactSupport: ", Please contact support personnel.",
		currentScheme: "Current Schema:",
		schemeName: "Schema Name:",
		editScheme: "edit schema",
		editSuccess: "Edit success",
		saveSuccess: "Save success.",
		cancelDefaultScheme: "Cancel default schema",
		setDefaultScheme: "Set as default schema",
		schemaNotExist: "This schema has been deleted",
		chooseMap: "Please select a map template",
		
		databaseConnectionException: "Database Connection Exception：",
		publishNoOperAuthException: "No Auth.",

		//多方案發佈
		publishSchema: "Publish Schema",
		ThemeIsDel: "The source of this release record was removed",
		publishInfoExist: "Release record does not exist or has been deleted",
		notAuthority: "You do not have permission to view the release record, Please contact the publisher",
		authority: "authority",
		publishPlanExist: "The analysis scheme  has been deleted"
	});
})();