(function()
{
	var IconsFile = com.kingdee.bos.qing.framework.common.IconsFile;
	var Icons = com.kingdee.bos.qing.core.Icons;
	
	var oIconsFile = new IconsFile();
	oIconsFile.setFilePath("schema-manage/skin/ierp/res/schema.png");
	oIconsFile.setStartPosition(1, 1);
	oIconsFile.setGap(1);
	oIconsFile.setIconSize(16, 16);
	
	var funRegist = function(iRow, iCol, sIconName)
	{
		var arrDescription = oIconsFile.createDescription(iRow, iCol);
		Icons.regist(sIconName, arrDescription);
	}
	
	funRegist(0, 0, "btn_schema");
	funRegist(1, 0, "btn_schema_hover");
	funRegist(2, 0, "icon_undefault");
	funRegist(3, 0, "icon_default");
})();