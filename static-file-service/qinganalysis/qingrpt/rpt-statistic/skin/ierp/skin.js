(function (){
	if(typeof(com) == "undefined") com = {};
	if(typeof(com.kingdee) == "undefined") com.kingdee = {};
	if(typeof(com.kingdee.bos) == "undefined") com.kingdee.bos = {};
	if(typeof(com.kingdee.bos.extreport) == "undefined") com.kingdee.bos.extreport = {};
	if(typeof(com.kingdee.bos.extreport.mancenter) == "undefined") com.kingdee.bos.extreport.mancenter = {};
	var NS = com.kingdee.bos.extreport.mancenter;
	NS.ComboIcon = new (
		function ()
		{
			this.define = function(oIconsFile, sKey)
			{
				switch(sKey)
				{
					case "nodata":
						oIconsFile.setFilePath("qingrpt/rpt-statistic/skin/ierp/res/no_data_background.png");
						break;
					case "tips-background":
						oIconsFile.setFilePath("qingrpt/rpt-statistic/skin/ierp/res/ctrl_prop.svg");
						break;
					case "tm":
						oIconsFile.setFilePath("qingrpt/rpt-statistic/skin/ierp/res/tm.png");
						break;
					case "dm":
						oIconsFile.setFilePath("qingrpt/rpt-statistic/skin/ierp/res/dm.png");
						break;
					case "extreport":
						oIconsFile.setFilePath("qingrpt/rpt-statistic/skin/ierp/res/extreport.png");
						break;
					default:
						throw new Error("Unknow key: " + sKey);
				}
			}
		}
	)();
})();
