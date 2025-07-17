{
	if(typeof(com) == "undefined") com = {};
	if(typeof(com.kingdee) == "undefined") com.kingdee = {};
	if(typeof(com.kingdee.bos) == "undefined") com.kingdee.bos = {};
	if(typeof(com.kingdee.bos.qing) == "undefined") com.kingdee.bos.qing = {};
	if(typeof(com.kingdee.bos.qing.modeler) == "undefined") com.kingdee.bos.qing.modeler = {};
	if(typeof(com.kingdee.bos.qing.modeler.modelset) == "undefined") com.kingdee.bos.qing.modeler.modelset = {};

	var NS = com.kingdee.bos.qing.modeler.modelset;

	NS.ComboIcon = new (function()
	{
		this.define = function(oIconsFile, sKey)
		{
			var sPath = "qingmodeler/modelset-main-page/skin/ierp/res/";
			switch(sKey)
			{
				case "model-common":
					oIconsFile.setFilePath("qingmodeler/common/skin/pioneer/res/model-common.png");
					break;
				case "deploy":
					oIconsFile.setFilePath(sPath + "deploy.png");
					break;
				case "create-right-arrows.svg":
					oIconsFile.setFilePath(sPath + "create-right-arrows.svg");
					oIconsFile.setIconSize(16, 16);
					break;
				case "btn-down-arrows.svg":
					oIconsFile.setFilePath(sPath + "btn-down-arrows.svg");
					oIconsFile.setIconSize(16, 16);
					break;
				case "list-view.svg":
					oIconsFile.setFilePath(sPath + "list-view.svg");
					oIconsFile.setIconSize(16, 16);
					break;
				case "list-view-click.svg":
					oIconsFile.setFilePath(sPath + "list-view-on.svg");
					oIconsFile.setIconSize(16, 16);
					break;
				case "card-view.svg":
					oIconsFile.setFilePath(sPath + "card-view.svg");
					oIconsFile.setIconSize(16, 16);
					break;
				case "card-view-click.svg":
					oIconsFile.setFilePath(sPath + "card-view-on.svg");
					oIconsFile.setIconSize(16, 16);
					break;
				case "msg-success.png":
					oIconsFile.setFilePath(sPath + "msg-success.png");
					oIconsFile.setIconSize(168, 96);
					break;
				default:
					throw new Error("Unknow key: " + sKey);
			}
		}
	})();
}