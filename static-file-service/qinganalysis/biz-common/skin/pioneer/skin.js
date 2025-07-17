(function(){
	if(typeof(com) == "undefined") com = {};
	if(typeof(com.kingdee) == "undefined") com.kingdee = {};
	if(typeof(com.kingdee.bos) == "undefined") com.kingdee.bos = {};
	if(typeof(com.kingdee.bos.qing) == "undefined") com.kingdee.bos.qing = {};
	if(typeof(com.kingdee.bos.qing.biz) == "undefined") com.kingdee.bos.qing.biz = {};
	if(typeof(com.kingdee.bos.qing.biz.common) == "undefined") com.kingdee.bos.qing.biz.common = {};

	var NS = com.kingdee.bos.qing.biz.common;

	NS.ComboIcon = new (function()
	{
		this.define = function(oIconsFile, sKey)
		{
			var sPath = "biz-common/skin/pioneer/res/";
			oIconsFile.setStartPosition(0, 0);
			oIconsFile.setGap(1);

			switch(sKey)
			{
				case "pagination":
					oIconsFile.setFilePath(sPath + "pagination.png");
					oIconsFile.setIconSize(16,16);
					break;
				case "icon_f7.svg":
					oIconsFile.setFilePath(sPath + "icon_f7.svg");
					oIconsFile.setIconSize(15, 15);
					break;
				case "tm-publish":
					oIconsFile.setFilePath(sPath + "tm-publish.png");
					break;
				default:
					throw new Error("Unknow key: " + sKey);
			}
		}
	})();
})();