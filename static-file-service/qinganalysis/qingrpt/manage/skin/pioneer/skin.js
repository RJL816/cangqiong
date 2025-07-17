(function()
{
	if(typeof(com) == "undefined") com = {};
	if(typeof(com.kingdee) == "undefined") com.kingdee = {};
	if(typeof(com.kingdee.bos) == "undefined") com.kingdee.bos = {};
	if(typeof(com.kingdee.bos.extreport) == "undefined") com.kingdee.bos.extreport = {};
	if(typeof(com.kingdee.bos.extreport.manage) == "undefined") com.kingdee.bos.extreport.manage = {};

	var NS = com.kingdee.bos.extreport.manage;

	NS.ComboIcon = new (function()
	{
		this.define = function(oIconsFile, sKey)
		{
			var sPath = "qingrpt/manage/skin/pioneer/res/";
			switch(sKey)
			{
				case "tm":
					oIconsFile.setFilePath(sPath + "extreport.png");
					break;
				case "icon_search":
					oIconsFile.setFilePath(sPath + "icon_search.png");
					break;
				case "icon_search_hover":
					oIconsFile.setFilePath(sPath + "icon_search_hover.png");
					break;
				case "btn-add-classification":
					oIconsFile.setFilePath(sPath + "btn-add-classification.png");
					break;
				case "btn-add-classification_hover":
					oIconsFile.setFilePath(sPath + "btn-add-classification_hover.png");
					break;
				default:
					throw new Error("Unknow key: " + sKey);
			}
		}
	})();
})();