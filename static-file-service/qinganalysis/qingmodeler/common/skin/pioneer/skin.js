{
	if(typeof(com) == "undefined") com = {};
	if(typeof(com.kingdee) == "undefined") com.kingdee = {};
	if(typeof(com.kingdee.bos) == "undefined") com.kingdee.bos = {};
	if(typeof(com.kingdee.bos.qing) == "undefined") com.kingdee.bos.qing = {};
	if(typeof(com.kingdee.bos.qing.modeler) == "undefined") com.kingdee.bos.qing.modeler = {};
	if(typeof(com.kingdee.bos.qing.modeler.common) == "undefined") com.kingdee.bos.qing.modeler.common = {};

	var NS = com.kingdee.bos.qing.modeler.common;

	NS.ComboIcon = new (function()
	{
		this.define = function(oIconsFile, sKey)
		{
			switch(sKey)
			{
				case "model-common":
					oIconsFile.setFilePath("qingmodeler/common/skin/pioneer/res/model-common.png");
					break;
				case "model-common2x":
					oIconsFile.setFilePath("qingmodeler/common/skin/ierp/res/model-common2x.png");
					break;
				default:
					throw new Error("Unknow key: " + sKey);
			}
		}
	})();
}