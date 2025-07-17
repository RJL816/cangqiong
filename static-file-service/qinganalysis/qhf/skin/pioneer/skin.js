(function()
{
	if(typeof(com) == "undefined") com = {};
	if(typeof(com.kingdee) == "undefined") com.kingdee = {};
	if(typeof(com.kingdee.bos) == "undefined") com.kingdee.bos = {};
	if(typeof(com.kingdee.bos.qing) == "undefined") com.kingdee.bos.qing = {};
	if(typeof(com.kingdee.bos.qing.qhf) == "undefined") com.kingdee.bos.qing.qhf = {};

	var NS = com.kingdee.bos.qing.qhf;

	NS.MyIcons = new (function()
	{
		com.kingdee.bos.qing.framework.common.AbstractIcons.call(this);
		var _super = this.protectedMethod;
		
		this.protectedInit = function(mapComboIcons, oIconsFile)
		{
			oIconsFile.setGap(1);
			oIconsFile.setStartPosition(1, 1);

			oIconsFile.setFilePath("qhf/skin/ierp/res/qhf-sprite.png");
			oIconsFile.setIconSize(16, 16);
			regist(0, 1, "icon-right-low-arrow");
			regist(0, 0, "icon-timer");
		}
		
		var regist = function(iRow, iCol, sIconName)
		{
			_super.registIcon(iRow, iCol, sIconName);
		}
	})();	
})();