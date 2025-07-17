(function(){
	if(typeof(com) == "undefined") com = {};
	if(typeof(com.kingdee) == "undefined") com.kingdee = {};
	if(typeof(com.kingdee.bos) == "undefined") com.kingdee.bos = {};
	if(typeof(com.kingdee.bos.qing) == "undefined") com.kingdee.bos.qing = {};
	if(typeof(com.kingdee.bos.qing.collaboration) == "undefined") com.kingdee.bos.qing.collaboration = {};
	if(typeof(com.kingdee.bos.qing.collaboration.common) == "undefined") com.kingdee.bos.qing.collaboration.common = {};

	var NS = com.kingdee.bos.qing.collaboration.common;
	
	NS.ComboIcon = new (function()
	{
		this.define = function(oIconsFile, sKey)
		{
			var sPath = "collaboration/skin/ierp/res/";
			switch(sKey)
			{
				case "collaboration-mgmt":
					oIconsFile.setFilePath(sPath + "collaboration-mgmt.png");
					break;
				case "collaboration-group":
					oIconsFile.setFilePath(sPath + "collaboration-group.png");
					break;
				case "collaboration-icon":
					oIconsFile.setFilePath(sPath + "collaboration-icon.png");
					break;
				case "collaboration-common":
					oIconsFile.setFilePath(sPath + "collaboration-common.png");
					break;
					case "collaboration-designer":
					oIconsFile.setFilePath(sPath + "collaboration-designer.png");
					break;
				case "schema-manage-sprite":
					oIconsFile.setFilePath("schema-manage/skin/ierp/res/schema-manage-sprite.png");
					break;
				default:
					throw new Error("Unknow key: " + sKey);
			}
		}
	})();
})();