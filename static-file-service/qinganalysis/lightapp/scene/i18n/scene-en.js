(function()
{
	var oManager = com.kingdee.bos.qing.framework.common.MultilanguageManager;
	var oPackage = com.kingdee.bos.qing.lapp.scene;
	oManager.registPackageResources(oPackage, 
	{
		//qing-lapp-longer-scene.js
        promptReExecute: "Please exit and execute again",
        promptNotEnoughMemory: "The server is busy, please try again later...",
        promptErrorOccurred: "Error occurred",
        
        //card-error
        themeIsDeleted: "The theme has been deleted",
		themeHasNoData: "The theme lack of datasource",
		componentSourceHasNotFound: "This component source has been deleted",
		lackDataEntityAuthority: "You don't have authority to this data entity",
		subjectEntityMySQLMoreThan61Table: "Too many tables associated with the current entity. Please reduce the analysis fields of the entity or delete the unnecessary entity entries",
		subjectDataSourceError: "Datasource access error",
		qingStorageFileSizeLimit: "Qing resource files space is not enough",
		qingStorageNoSpace:"No space left on device",
		subjectDBDataSourceError: "Database of datasource isnot available",
		noDBCenterPermission: "No permission to use DB Center.",
		noSuperQueryAuth: "Do not have permission for the current super query schema. Please contact the administrator to assign permissions",
		entityDestroyed:"DataTable is destoryed in this subject",
		noDBCenterOwnerPermission: "The owner don't  have permission to use DB Center.",
		noSuperQueryPerm: "The publisher '#1' does not have the permission to super query the relevant schema. Please contact the publisher to check the permission",
		notExistTable: "Unable to find the entity data table in schema \"#1\"",
		ownerNotExistTable: "The data source is abnormal. Please contact the publisher to check the data source",
		noDmoOwnerPermission: "The publisher '#1' does not have DMO permissions. Please contact the publisher to check the permission",
		noDmoPermission: "No DMO permissions, please contact the administrator to assign permissions",
		dmoPermission: "No DMO permissions for #1, please check the DMO permissions",
		cardHasNotFound: "This card has been deleted",
		componentSourceNoAuthority: "You don't have authority to this component source",
		cardNoAuthority: "You don't have authority to this card",
		cardNoDefaultSchema: "The card don't have default schema",
		unsupportedDsbRefSource: "Unsupported source of widget",
		illegalLicense: "The current system does not have the license to use the [QING] module , Please contact the administrator.",
		noQingModulePermission: "The account you are using has not been assigned a license for the [Qing] module,Please contact the administrator.",
		illegalQingReportLicense: "The current system does not have the license to use the [QING REPORT] module , Please contact the administrator.",
		noQingReportModulePermission: "The account you are using has not been assigned a license for the [QING REPORT] module,Please contact the administrator.",
		noAuthorityForTheseEntities: "Have not yet obtained the permission to view the following entity data tables:",
		qingRuntimeException: "An error occured",
		extractDataFail: "Failed to prepare data",
		executeFail: "Chart execute failed",
		unknownException: "Unknown error occured",
		copyErrorLog: "Copy Error Log",
		hasCopied: "Copied to clipboard",
		semicolon: "；",
		entityNotSupportQingAnalysis: "Entities do not enabled QingAnalysis, please set in the development platform  ",
		viewDocument: "View document",
		viewDetails: "View details",
		DetailInfo: "Detailed information", 
		notSupportQingAnalysis: "The following entities do not enabled QingAnalysis:",
		iknow: "I know",
		confirm: "Confirm",
		showMessage: "Message prompt",
		loadError: "Failed to load, please try again"
	});
})();