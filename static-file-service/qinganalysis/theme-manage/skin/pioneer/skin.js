(function()
{
	if(typeof(com) == "undefined") com = {};
	if(typeof(com.kingdee) == "undefined") com.kingdee = {};
	if(typeof(com.kingdee.bos) == "undefined") com.kingdee.bos = {};
	if(typeof(com.kingdee.bos.qing) == "undefined") com.kingdee.bos.qing = {};
	if(typeof(com.kingdee.bos.qing.theme) == "undefined") com.kingdee.bos.qing.theme = {};

	var NS = com.kingdee.bos.qing.theme;

	NS.ComboIcon = new (function()
	{
		this.define = function(oIconsFile, sKey)
		{
			var sPath = "theme-manage/skin/pioneer/res/";
			switch(sKey)
			{
				case "tm":
					oIconsFile.setFilePath(sPath + "tm.png");
					break;
				case "theme-manage-sprite":
					oIconsFile.setFilePath(sPath + "theme-manage-sprite.png");
					break;
				case "no-data.png":
					oIconsFile.setFilePath("common/skin/pioneer/res/icon-empty-error-display/no-data.png");
					break;
				case "tm-larger-icon":
					oIconsFile.setFilePath(sPath + "tm-larger-icon.png");
					break;
				case "group-theme-no-data":
					oIconsFile.setFilePath(sPath + "group-theme-no-data.png");
					break;
				case "common":
					oIconsFile.setFilePath("common/skin/pioneer/res/common.png");
					break;
				default:
					throw new Error("Unknow key: " + sKey);
			}
		}
	})();
})();