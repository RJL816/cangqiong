(function ()
{
    if(typeof(com) == "undefined") com = {};
    if(typeof(com.kingdee) == "undefined") com.kingdee = {};
    if(typeof(com.kingdee.bos) == "undefined") com.kingdee.bos = {};
    if(typeof(com.kingdee.bos.qing) == "undefined") com.kingdee.bos.qing = {};
    if(typeof(com.kingdee.bos.qing.prepare) == "undefined") com.kingdee.bos.qing.prepare = {};

    var NS=com.kingdee.bos.qing.prepare;

    NS.MyIcons = new (function()
    {
        com.kingdee.bos.qing.framework.common.AbstractIcons.call(this);
        var _super = this.protectedMethod;

        this.protectedInit = function(mapComboIcons, oIconsFile)
        {
            oIconsFile.setFilePath("prepare/skin/pioneer/res/prepare-sprite.png");
            oIconsFile.setGap(1);
            oIconsFile.setStartPosition(1, 1);

            oIconsFile.setIconSize(16, 16);
            regist(0,0,"errorClose");
            
            oIconsFile.setFilePath("common/skin/pioneer/res/loading.gif");
            oIconsFile.setGap(0);
            oIconsFile.setStartPosition(0, 0);
            oIconsFile.setIconSize(40, 40);
            regist(0, 0, "loading");
        }

        var regist = function(iRow, iCol, sIconName)
        {
            _super.registIcon(iRow, iCol, sIconName);
        }
    })();
})();
