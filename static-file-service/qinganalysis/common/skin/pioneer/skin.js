(function()
{
	if(typeof(com) == "undefined") com = {};
	if(typeof(com.kingdee) == "undefined") com.kingdee = {};
	if(typeof(com.kingdee.bos) == "undefined") com.kingdee.bos = {};
	if(typeof(com.kingdee.bos.qing) == "undefined") com.kingdee.bos.qing = {};
	if(typeof(com.kingdee.bos.qing.common) == "undefined") com.kingdee.bos.qing.common = {};
	
	var NS = com.kingdee.bos.qing.common;
	
	NS.CommonTableSkin = 
	{
		HEAD_ROW_BACKGROUND_COLOR: "#d5f6ff",
		HEAD_ROW_BORDER_COLOR: "#ccc",
		ODD_ROW_BACKGROUND_COLOR: "ffffff",
		EVEN_ROW_BACKGROUND_COLOR: "#f7f7f7",
		COLOR: "#666"
	};
	
	NS.ComboIcon = new (function()
	{
		this.define = function(oIconsFile, sKey)
		{
			var sPath = "common/skin/pioneer/res/";
			oIconsFile.setStartPosition(1, 1);
			oIconsFile.setGap(1);
			switch(sKey)
			{
				case "common":
					oIconsFile.setFilePath(sPath + "common.png");
					oIconsFile.setIconSize(16, 16);
					break;
				case "msg":
					oIconsFile.setFilePath(sPath + "msg.png");
					oIconsFile.setIconSize(100, 80);
					break;
				case "rich":
					oIconsFile.setFilePath(sPath + "rich.png");
					oIconsFile.setIconSize(16, 16);
					break;
				default:
					throw new Error("Unknow key: " + sKey);
			}
		}
	})();
})();