(function()
{
	if(typeof(com) == "undefined") com = {};
	if(typeof(com.kingdee) == "undefined") com.kingdee = {};
	if(typeof(com.kingdee.bos) == "undefined") com.kingdee.bos = {};
	if(typeof(com.kingdee.bos.qing) == "undefined") com.kingdee.bos.qing = {};
	if(typeof(com.kingdee.bos.qing.data) == "undefined") com.kingdee.bos.qing.data = {};
	
	var NS = com.kingdee.bos.qing.data;
	
	NS.ComboIcon = new (function()
	{
		this.define = function(oIconsFile, sKey)
		{
			var sPath = "data-modeling/skin/ierp/res/";
			oIconsFile.setStartPosition(1, 1);
			oIconsFile.setGap(1);
			switch(sKey)
			{
				case "dm":
					oIconsFile.setFilePath(sPath + "dm.png");
					oIconsFile.setIconSize(16, 16);
					break;
				case "source":
					oIconsFile.setFilePath(sPath + "source.png");
					oIconsFile.setIconSize(90, 45);
					break;
				case "file":
					oIconsFile.setFilePath(sPath + "file.png");
					oIconsFile.setIconSize(30, 35);
					break;
				default:
					throw new Error("Unknow key: " + sKey);
			}
		}
	})();
})();