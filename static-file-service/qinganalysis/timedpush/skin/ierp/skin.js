(function()
{
	if(typeof(com) == "undefined") com = {};
	if(typeof(com.kingdee) == "undefined") com.kingdee = {};
	if(typeof(com.kingdee.bos) == "undefined") com.kingdee.bos = {};
	if(typeof(com.kingdee.bos.qing) == "undefined") com.kingdee.bos.qing = {};
	if(typeof(com.kingdee.bos.qing.timedpush) == "undefined") com.kingdee.bos.qing.timedpush = {};
	if(typeof(com.kingdee.bos.qing.timedpush.common) == "undefined") com.kingdee.bos.qing.timedpush.common = {};

	var NS = com.kingdee.bos.qing.timedpush.common;

	NS.PublishTableSkin = 
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
			var sPath = "timedpush/skin/ierp/res/";
			oIconsFile.setStartPosition(0, 0);
			oIconsFile.setGap(0);
			switch(sKey)
			{
				case "icon_thirdapp.png":
					oIconsFile.setGap(1);
					oIconsFile.setFilePath(sPath + "icon_thirdapp.png");
					oIconsFile.setIconSize(78, 30);
					break;
				case "icon_help.png":
					oIconsFile.setFilePath(sPath + "icon_help.png");
					oIconsFile.setIconSize(16, 16);
					break;
				case "tm-publish":
					oIconsFile.setFilePath(sPath + "tm-publish.png");
					break;
				case "icon_blue_sprite":
					oIconsFile.setFilePath(sPath + "icon_blue_sprite.png");
					break;
				case "timedpush-sprite":
					oIconsFile.setFilePath(sPath + "timedpush-sprite.png");
					break;
				case "no-data.png":
					oIconsFile.setFilePath("common/skin/ierp/res/icon-empty-error-display/no-data.png");
					break;
				default:
					throw new Error("Unknow key: " + sKey);
			}
		}
	})();
})();