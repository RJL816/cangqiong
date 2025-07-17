(function(){
	if(typeof(com) == "undefined") com = {};
	if(typeof(com.kingdee) == "undefined") com.kingdee = {};
	if(typeof(com.kingdee.bos) == "undefined") com.kingdee.bos = {};
	if(typeof(com.kingdee.bos.qing) == "undefined") com.kingdee.bos.qing = {};
	if(typeof(com.kingdee.bos.qing.macro) == "undefined") com.kingdee.bos.qing.macro = {};
	
	var NS = com.kingdee.bos.qing.macro;
	
	NS.ComboIcon = new (function()
	{
		this.define = function(oIconsFile, sKey)
		{
			var sPath = "macro/skin/ierp/res/";
			oIconsFile.setStartPosition(0, 0);
			oIconsFile.setGap(0);
			
			switch(sKey)
			{
				case "nodata":
					oIconsFile.setFilePath("common/skin/ierp/res/icon-empty-error-display/no-data.png");
					oIconsFile.setIconSize(220, 220);
					break;
				case "macro-common":
					oIconsFile.setFilePath(sPath + "macro-common.png");
					oIconsFile.setIconSize(18, 18);
					break;
				case "icon":
					//pointless
					break;
				case "macro_error":
					oIconsFile.setFilePath(sPath + "macro_error.png");
					oIconsFile.setIconSize(200, 200);
					break;
				default:
					throw new Error("Unknow key: " + sKey);
			}
		}	
	})();
})();