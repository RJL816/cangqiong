{
	if(typeof(com) == "undefined") com = {};
	if(typeof(com.kingdee) == "undefined") com.kingdee = {};
	if(typeof(com.kingdee.bos) == "undefined") com.kingdee.bos = {};
	if(typeof(com.kingdee.bos.qing) == "undefined") com.kingdee.bos.qing = {};
	if(typeof(com.kingdee.bos.qing.modeler) == "undefined") com.kingdee.bos.qing.modeler = {};
	if(typeof(com.kingdee.bos.qing.modeler.deploy) == "undefined") com.kingdee.bos.qing.modeler.deploy = {};

	var NS = com.kingdee.bos.qing.modeler.deploy;

	NS.ComboIcon = new (function()
	{
		this.define = function(oIconsFile, sKey)
		{
			var sPath = "qingmodeler/deploy-manage/skin/ierp/res/";
			oIconsFile.setStartPosition(1, 1);
			oIconsFile.setGap(1);
			switch(sKey)
			{
				case "model-common":
					oIconsFile.setFilePath("qingmodeler/common/skin/pioneer/res/model-common.png");
					break;
				case "deploy":
					oIconsFile.setFilePath(sPath + "deploy.png");
					break;
				default:
					throw new Error("Unknow key: " + sKey);
			}
		}
	})();
}