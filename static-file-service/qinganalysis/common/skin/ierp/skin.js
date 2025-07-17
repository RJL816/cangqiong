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
		HEAD_ROW_BACKGROUND_COLOR: "#f0f0f0",
		HEAD_ROW_BORDER_COLOR: "#ccc",
		ODD_ROW_BACKGROUND_COLOR: "ffffff",
		EVEN_ROW_BACKGROUND_COLOR: "#f7f7f7",
		COLOR: "#666"
	};
	
	NS.ComboIcon = new (function()
	{
		this.define = function(oIconsFile, sKey)
		{
			var sPath = "common/skin/ierp/res/";
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
	
	NS.SkinColorTheme_ORANGE = {
		"--color-main": "#fc8555",
		"--color-lightish": "#fca987",
		"--color-tint": "#fcc2aa",
		"--color-pale": "#fff1e6"
	};
	
	NS.SkinColorTheme_BLUE = {
		"--color-main": "#5582f3",
		"--color-lightish": "#88a7f6",
		"--color-tint": "#a4befa",
		"--color-pale": "#eff3fd"
	};
	
	NS.SkinColorTheme_CYAN = {
		"--color-main": "#29c392",
		"--color-lightish": "#69d5b2",
		"--color-tint": "#acdcc9",
		"--color-pale": "#e9f9f1"
	};
	
	NS.SkinColorTheme_GRAPE = {
		"--color-main": "#6869fb",
		"--color-lightish": "#9596fc",
		"--color-tint": "#b1b5fb",
		"--color-pale": "#f0f1fe"
	};
	
	NS.SkinColorTheme_RED = {
		"--color-main": "#e94e4f",
		"--color-lightish": "#f18e8e",
		"--color-tint": "#f1b8b8",
		"--color-pale": "#fdf0f1"
	};
})();