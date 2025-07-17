(function(){
	if(typeof(com) == "undefined") com = {};
	if(typeof(com.kingdee) == "undefined") com.kingdee = {};
	if(typeof(com.kingdee.bos) == "undefined") com.kingdee.bos = {};
	if(typeof(com.kingdee.bos.qing) == "undefined") com.kingdee.bos.qing = {};
	if(typeof(com.kingdee.bos.qing.dbmanage) == "undefined") com.kingdee.bos.qing.dbmanage = {};
	
	var NS = com.kingdee.bos.qing.dbmanage;
	
	NS.ComboIcon = new (function()
	{
		this.define = function(oIconsFile, sKey)
		{
			var sPath = "db-manage/skin/pioneer/res/";
			oIconsFile.setStartPosition(0, 0);
			oIconsFile.setGap(1);
			
			switch(sKey)
			{
				case "nodata":
					oIconsFile.setFilePath("common/skin/ierp/res/icon-empty-error-display/no-data.png");
					oIconsFile.setIconSize(220, 220);
					break;
				case "icon_f7":
					oIconsFile.setFilePath(sPath + "icon_f7.svg");
					oIconsFile.setIconSize(15, 15);
					break;
				case "db-manage":
					oIconsFile.setFilePath(sPath + "dbInfo-source.png");
					break;
				case "icon":
				 	oIconsFile.setFilePath(sPath + "icon.png");
					oIconsFile.setIconSize(16, 16);
					break;
				default:
					throw new Error("Unknow key: " + sKey);
			}
		}	
	})();
})();