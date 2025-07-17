(function()
{
	if(typeof(com) == "undefined") com = {};
	if(typeof(com.kingdee) == "undefined") com.kingdee = {};
	if(typeof(com.kingdee.bos) == "undefined") com.kingdee.bos = {};
	if(typeof(com.kingdee.bos.qing) == "undefined") com.kingdee.bos.qing = {};
	if(typeof(com.kingdee.bos.qing.analysiscenter) == "undefined") com.kingdee.bos.qing.analysiscenter = {};
	if(typeof(com.kingdee.bos.qing.analysiscenter.common) == "undefined") com.kingdee.bos.qing.analysiscenter.common = {};

	var NS = com.kingdee.bos.qing.analysiscenter.common;

	NS.MyIcons = new (function()
	{
		com.kingdee.bos.qing.framework.common.AbstractIcons.call(this);
		var _super = this.protectedMethod;
		
		this.protectedInit = function(mapComboIcons, oIconsFile)
		{
			oIconsFile.setFilePath("analysiscenter/skin/ierp/res/analysiscenter-sprite.png");
			oIconsFile.setGap(1);
			oIconsFile.setStartPosition(1, 1);

			oIconsFile.setIconSize(17, 17);
			regist(1, 0, "icon_dir_open");
			regist(0, 1, "icon_dir_close_on");
			regist(1, 1, "icon_dir_close");
			regist(0, 2, "analysis-on");
			regist(1, 0, "icon_dir_open_on");
			regist(1, 2, "analysis");
			regist(0, 3, "dashboard-on");
			regist(1, 3, "dashboard");
			regist(0, 6, "extreport-on");
			regist(1, 6, "extreport");

			oIconsFile.setStartPosition(0,106);
			oIconsFile.setIconSize(16, 16);
			oIconsFile.setGap(1, 1);
			regist(0, 0, "icon_left");
			regist(1, 0, "icon_left_on");
			regist(0, 3, "icon_search");
			regist(1, 3, "icon_search_on");
			regist(0, 1, "icon_order");
			regist(1, 1, "icon_order_on");
			regist(0, 2, "icon_refresh");
			regist(1, 2, "icon_refresh_on");

			oIconsFile.setStartPosition(0, 0);
			oIconsFile.setGap(0);
			oIconsFile.setFilePath("common/skin/ierp/res/icon-empty-error-display/icon_empty_background.png");
			oIconsFile.setIconSize(200, 200);
			regist(0, 0, "icon_empty_background");

			oIconsFile.setFilePath("common/skin/pioneer/res/icon-empty-error-display/icon_open_tips_background.png");
			oIconsFile.setIconSize(264, 191);
			regist(0, 0, "icon_open_tips_background");

		}
		
		var regist = function(iRow, iCol, sIconName)
		{
			_super.registIcon(iRow, iCol, sIconName);
		}
	})();	
})();