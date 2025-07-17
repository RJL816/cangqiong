(function()
{
	if(typeof(com) == "undefined") com = {};
	if(typeof(com.kingdee) == "undefined") com.kingdee = {};
	if(typeof(com.kingdee.bos) == "undefined") com.kingdee.bos = {};
	if(typeof(com.kingdee.bos.extreport) == "undefined") com.kingdee.bos.extreport = {};
	if(typeof(com.kingdee.bos.extreport.runtime) == "undefined") com.kingdee.bos.extreport.runtime = {};

	var NS = com.kingdee.bos.extreport.runtime;
	NS.MyIcons = new (function()
	{
		com.kingdee.bos.qing.framework.common.AbstractIcons.call(this);
		var _super = this.protectedMethod;
		var sPath = "qingrpt/runtime/skin/pioneer/res/";
		
		this.protectedInit = function(mapComboIcons, oIconsFile)
		{
			oIconsFile.setFilePath(sPath + "extreport-runtime.png");
			oIconsFile.setGap(1);
			oIconsFile.setStartPosition(1, 1);

			oIconsFile.setIconSize(16, 16);
			regist2(0, 0, "delete");
			regist2(0, 1, "search");
			regist2(0, 2, "arrow-down");
			regist2(0, 3, "arrow-up");
			regist2(0, 4, "prev_page");
			regist2(0, 5, "next_page");

			oIconsFile.setFilePath(sPath + "card_operate.png");
			oIconsFile.setGap(1);
			oIconsFile.setStartPosition(1, 12);
			
			oIconsFile.setIconSize(16, 16);
			regist(0, 0, "edit");
			regist(0, 2, "refresh");
			regist(0, 3, "filter");
			regist(0, 4, "fullscreen");
			regist(1, 4, "quitFullscreen");
			regist(1, 0, "others");
			
			oIconsFile.setFilePath("common/skin/ierp/res/icon-empty-error-display/no_data_background.png");
			oIconsFile.setStartPosition(1, 1);
			oIconsFile.setIconSize(220, 220);
			regist(0, 0, "noData");
		}
		var regist = function(iRow, iCol, sIconName)
		{
			_super.registIcon(iRow, iCol, sIconName);
		}
		
		var regist2 = function(iRow, iCol, sName)
		{
			regist(iRow, iCol, sName);
			regist(iRow + 1, iCol, sName + "_hover");
		}
	})();	
})();