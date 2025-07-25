(function()
{
	if (typeof(com) == "undefined") com = {};
	if (typeof(com.kingdee) == "undefined") com.kingdee = {};
	if (typeof(com.kingdee.bos) == "undefined") com.kingdee.bos = {};
	if (typeof(com.kingdee.bos.qing) == "undefined") com.kingdee.bos.qing = {};
	if (typeof(com.kingdee.bos.qing.dashboard) == "undefined") com.kingdee.bos.qing.dashboard = {};
	
	var NS = com.kingdee.bos.qing.dashboard;

	NS.ComboIcon = new (function()
	{
		this.define =  function(oIconsFile, sKey)
		{
			var sPath = "dashboard/skin/ierp/res/";
			switch(sKey)
			{
				case "dsb-integration-sprite":
					oIconsFile.setFilePath(sPath + "dsb-integration-sprite.png");
					break;
				case "nodata":
					oIconsFile.setFilePath("common/skin/ierp/res/icon-empty-error-display/no-data.png");
					break;
				case "common":
					oIconsFile.setFilePath("common/skin/ierp/res/common.png");
					break;
				case "schema-manage-sprite.png":
					oIconsFile.setFilePath("schema-manage/skin/ierp/res/schema-manage-sprite.png");
					break;
				case "msg":
					oIconsFile.setFilePath("common/skin/ierp/res/msg.png");
					break;
				case "dsb_operate":
					oIconsFile.setFilePath("dashboard/skin/ierp/res/dsb_operate.png");
					break;
				default:
					throw new Error("Unknow key: " + sKey);
			}
		}
		
	})();
})();