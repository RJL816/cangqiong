(function()
{
	if(typeof(com) == "undefined") com = {};
	if(typeof(com.kingdee) == "undefined") com.kingdee = {};
	if(typeof(com.kingdee.bos) == "undefined") com.kingdee.bos = {};
	if(typeof(com.kingdee.bos.qing) == "undefined") com.kingdee.bos.qing = {};
	if(typeof(com.kingdee.bos.qing.handover) == "undefined") com.kingdee.bos.qing.handover = {};

	var NS = com.kingdee.bos.qing.handover;

	NS.ComboIcon = new (function()
	{
		this.define = function(oIconsFile, sKey)
		{
			var sPath = "handover/skin/ierp/res/";
			switch(sKey)
			{
				case "management-sprite":
					oIconsFile.setFilePath(sPath + "management-sprite.png");
					break;
				case "tips-background":
					oIconsFile.setFilePath("common/skin/ierp/res/icon-empty-error-display/icon_open_tips_background.png");
					break;
				case "nodata":
					oIconsFile.setFilePath("common/skin/ierp/res/icon-empty-error-display/no-data.png");
					break;
				default:
					throw new Error("Unknow key: " + sKey);
			}
		}
		
	})();
})();