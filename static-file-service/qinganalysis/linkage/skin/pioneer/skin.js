(function ()
{
    if(typeof(com) == "undefined") com = {};
    if(typeof(com.kingdee) == "undefined") com.kingdee = {};
    if(typeof(com.kingdee.bos) == "undefined") com.kingdee.bos = {};
    if(typeof(com.kingdee.bos.qing) == "undefined") com.kingdee.bos.qing = {};
    if(typeof(com.kingdee.bos.qing.linkage) == "undefined") com.kingdee.bos.qing.linkage = {};
    if(typeof(com.kingdee.bos.qing.linkage.common) == "undefined") com.kingdee.bos.qing.linkage.common = {};

    var NS=com.kingdee.bos.qing.linkage.common;

    NS.MyIcons = new (function()
    {
        com.kingdee.bos.qing.framework.common.AbstractIcons.call(this);
        var _super = this.protectedMethod;

        this.protectedInit = function (mapComboIcons, oIconsFile)
        {
            oIconsFile.setFilePath("linkage/skin/pioneer/res/linkage-sprite.png");
            oIconsFile.setGap(1);
            oIconsFile.setStartPosition(0, 0);

            oIconsFile.setIconSize(88, 80);
            regist(0, 0, "icon-warning");
        }

        var regist = function(iRow, iCol, sIconName)
        {
            _super.registIcon(iRow, iCol, sIconName);
        }
    })();
})();