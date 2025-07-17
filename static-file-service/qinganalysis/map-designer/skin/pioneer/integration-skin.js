(function()
{
	if(typeof(com) == "undefined") com = {};
	if(typeof(com.kingdee) == "undefined") com.kingdee = {};
	if(typeof(com.kingdee.bos) == "undefined") com.kingdee.bos = {};
	if(typeof(com.kingdee.bos.qing) == "undefined") com.kingdee.bos.qing = {};
	if(typeof(com.kingdee.bos.qing.map) == "undefined") com.kingdee.bos.qing.map = {};
	if(typeof(com.kingdee.bos.qing.map.ui) == "undefined") com.kingdee.bos.qing.map.ui = {};//先创建ui包，让map-imexport.js能使用ui包的多语言

	var NS = com.kingdee.bos.qing.map;

	NS.ComboIcon = new (function()
	{
		this.define = function(oIconsFile, sKey)
		{
			var sPath = "map-designer/skin/pioneer/res/";
			switch(sKey)
			{
				case "map-integration":
					oIconsFile.setFilePath(sPath + "map-integration.png");
					break;
				case "map-integration-sprite":
					oIconsFile.setFilePath(sPath + "map-integration-sprite.png");
					break;
				default:
					throw new Error("Unknow key: " + sKey);
			}
		}
	})();
})();