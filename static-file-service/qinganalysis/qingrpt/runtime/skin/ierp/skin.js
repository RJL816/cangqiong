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
		var sPath = "qingrpt/runtime/skin/ierp/res/";
		
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

			oIconsFile.setStartPosition(0, 36);
			oIconsFile.setIconSize(24, 24);
			_super.registIcon(0, 0, "magnify");

			oIconsFile.setStartPosition(24, 36);
			oIconsFile.setIconSize(24, 24);
			_super.registIcon(0, 0, "magnify_hover");

			oIconsFile.setStartPosition(48, 36);
			oIconsFile.setIconSize(24, 24);
			_super.registIcon(0, 0, "lessen");

			oIconsFile.setStartPosition(72, 36);
			oIconsFile.setIconSize(24, 24);
			_super.registIcon(0, 0, "lessen_hover");

			oIconsFile.setStartPosition(96, 36);
			oIconsFile.setIconSize(24, 24);
			_super.registIcon(0, 0, "rotate");

			oIconsFile.setStartPosition(120, 36);
			oIconsFile.setIconSize(24, 24);
			_super.registIcon(0, 0, "rotate_hover");

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

			oIconsFile.setFilePath("common/skin/ierp/res/icon-empty-error-display/error_background.png");
			oIconsFile.setStartPosition(1, 1);
			oIconsFile.setIconSize(220, 220);
			regist(0, 0, "errorbackground");

			oIconsFile.setFilePath(sPath + "publish-resource-sprite.png");
			oIconsFile.setStartPosition(1, 1);
			oIconsFile.setGap(1);
			oIconsFile.setIconSize(16, 16);
			regist(0,4,"btn-more");
			regist(1,4,"btn-more-on");
			regist(0,2,"btn-filter");
			regist(1,2,"btn-filter-on");
			regist(0,3,"btn-refresh");
			regist(1,3,"btn-refresh-on");
			regist(2,3,"btn-fullscreen");

			oIconsFile.setFilePath(sPath + "workbench-sprite3.png");
			oIconsFile.setGap(0);
			oIconsFile.setStartPosition(1, 1);
			oIconsFile.setIconSize(17, 17);

			regist(0, 0, "extreport");
			regist(2, 2, "icon_delete");
			regist(3, 2, "icon_delete_hover");
			regist(4, 4, "card_edit");
			regist(5, 4, "card_edit_hover");

			oIconsFile.setFilePath("qingrpt/snapcenter/skin/ierp/res/view_member.png");
			oIconsFile.setGap(1);
			oIconsFile.setStartPosition(0, 117);
			oIconsFile.setIconSize(16, 16);
			regist(1, 4, "view_member");
			regist(0, 4, "view_member_hover");
			oIconsFile.setGap(1);
			oIconsFile.setStartPosition(0, 151);
			oIconsFile.setIconSize(170, 98);
			regist(0, 0, "icon-empty");
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