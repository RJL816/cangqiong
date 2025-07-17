(function()
{
	if(typeof(com) == "undefined") com = {};
	if(typeof(com.kingdee) == "undefined") com.kingdee = {};
	if(typeof(com.kingdee.bos) == "undefined") com.kingdee.bos = {};
	if(typeof(com.kingdee.bos.extreport) == "undefined") com.kingdee.bos.extreport = {};
	if(typeof(com.kingdee.bos.extreport.common) == "undefined") com.kingdee.bos.extreport.common = {};

	var NS = com.kingdee.bos.extreport.common;

	NS.ComboIcon = new (function()
	{
		this.define = function(oIconsFile, sKey)
		{
			var sPath = "qingrpt/common/skin/ierp/res/";
			if (sKey)
			{
				if (sKey.endsWith(".svg"))
				{
					oIconsFile.setFilePath(sPath + sKey);
				}
				else
				{
					oIconsFile.setFilePath(sPath + sKey + ".png");
				}
			}
		}
	})();
})();