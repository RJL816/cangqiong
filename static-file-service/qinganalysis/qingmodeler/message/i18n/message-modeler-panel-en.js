(function()
{
	var oManager = com.kingdee.bos.qing.framework.common.MultilanguageManager;
	var oPackage = com.kingdee.bos.qing.modeler.message.panel;
	oManager.registPackageResources(oPackage, 
	{
		operation: "Operation",
		wOpen: "Open",
		dataTableModelType: "Data Table Model",
		entityModelType: "Entity Model",
		relationModelType: "Relation Model",
		metricModelType: "Metric Model",
		modelSetName: "ModelSet Name",
		modelSetDesc: "ModelSet Desc",
		modelSetNotExistsOrDelete: "The ModelSet does not exist or has been deleted",
		add: "Add",
		update: "Update",
		delete: "Delete",
		undeploy: "UnDeploy",
		modelName: "Model Name",
		modelDesc: "Model Desc",
		path: "Path",
		status: "Status",
		modelDeployedNotExistsOrDelete: "The deployment record for this model does not exist or has been deleted",
		modelNotExistsOrDelete: "The Model does not exist or has been deleted",
		noDataTips: "No data",
		noChangedModelTips: "No changed models",
		noModelPermission: "You are not a collaborative member of this modeSet or the modeSet has been deleted, so the model cannot be opened.",
		noModelSetPermission: "You are not a collaborative member of this ModelSet or the ModelSet has been deleted, so the ModelSet cannot be opened.",
		scheduleName: "Schedule name",
		executeStartTime:"Start time",
		executeEndTime:"End time",
		executeState: "State",
		fail: "Fail",
		detail: "Details",
		errorCodeMessage: "Error message:#1\r\nError code:#2",
		errorMessage: "error message: #1.",
		errorCode: "Error code: #1.",
		noErrorCodeMessage: "There is no error code and error message, Please view details.",
		notFindExceptionLog: "No corresponding log found.",
		pathTips:"The path format is: model set name/directory name. The directory may have multiple levels, separated by \"/\" between each level.",
		pathTips2:"The path format is: model set name/directory name/model name. The directory may have multiple levels, separated by \"/\" between each level."
	});
})();