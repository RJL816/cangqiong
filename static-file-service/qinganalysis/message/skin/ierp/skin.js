(function()
{
	if(typeof(com) == "undefined") com = {};
	if(typeof(com.kingdee) == "undefined") com.kingdee = {};
	if(typeof(com.kingdee.bos) == "undefined") com.kingdee.bos = {};
	if(typeof(com.kingdee.bos.qing) == "undefined") com.kingdee.bos.qing = {};
	if(typeof(com.kingdee.bos.qing.message) == "undefined") com.kingdee.bos.qing.message = {};

	var NS = com.kingdee.bos.qing.message;

	NS.ComboIcon = new (function()
	{
		this.define =  function(oIconsFile, sKey)
		{
			var sPath = "message/skin/ierp/res/";
			switch(sKey)
			{
				case "message_img":
					oIconsFile.setFilePath(sPath + "message-img.png");
					break;
				case "common_img":
					oIconsFile.setFilePath(sPath + "common.png");
					break;
				case "model-common":
					oIconsFile.setFilePath(sPath + "message-model-common.png");
					break;
				case "nodata":
					oIconsFile.setFilePath("common/skin/ierp/res/icon-empty-error-display/no-data.png");
					break;
				default:
					throw new Error("Unknow key: " + sKey);
			}
		}
		
	})();
})();