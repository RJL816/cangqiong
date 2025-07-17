(function()
{
	if (typeof(com) == "undefined") com = {};
	if (typeof(com.kingdee) == "undefined") com.kingdee = {};
	if (typeof(com.kingdee.bos) == "undefined") com.kingdee.bos = {};
	if (typeof(com.kingdee.bos.qing) == "undefined") com.kingdee.bos.qing = {};
	if (typeof(com.kingdee.bos.qing.lapp) == "undefined") com.kingdee.bos.qing.lapp = {};
	
	var NS = com.kingdee.bos.qing.lapp;

	NS.ComboIcon = new (function()
	{
		this.define =  function(oIconsFile, sKey)
		{
			var sPath = "lightapp/common/skin/ierp/res/";
			switch(sKey)
			{
				case "lapp-sprite":
					oIconsFile.setFilePath(sPath + "lapp-sprite.png");
					break;
				case "loading": 
					oIconsFile.setFilePath(sPath + "loading.gif");
					break;
				case "dashboard_building":
					oIconsFile.setFilePath(sPath + "icon_dashboard_building.png");
					break;
				case "chart_building":
					oIconsFile.setFilePath(sPath + "icon_chart_building.png");
					break;
				case "tm":
					oIconsFile.setFilePath(sPath + "tm.png");
					break;
				default:
					throw new Error("Unknow key: " + sKey);
			}
		}
	})();
})();
