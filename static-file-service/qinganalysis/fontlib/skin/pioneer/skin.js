(function()
{
    if (typeof(com) == "undefined") com = {};
    if (typeof(com.kingdee) == "undefined") com.kingdee = {};
    if (typeof(com.kingdee.bos) == "undefined") com.kingdee.bos = {};
    if (typeof(com.kingdee.bos.qing) == "undefined") com.kingdee.bos.qing = {};
    if (typeof(com.kingdee.bos.qing.fontlib) == "undefined") com.kingdee.bos.qing.fontlib = {};
    if (typeof(com.kingdee.bos.qing.fontlib.skin) == "undefined") com.kingdee.bos.qing.fontlib.skin = {};

    var NS = com.kingdee.bos.qing.fontlib.skin;

    NS.ComboIcon = new (function()
    {
        this.define = function(oIconsFile, sKey)
        {
            var sPath = "fontlib/skin/ierp/res";
            oIconsFile.setStartPosition(0, 0);
            oIconsFile.setGap(0);

            switch(sKey)
            {
                case "background":
                    oIconsFile.setFilePath("common/skin/ierp/res/icon-empty-error-display/no-data.png");
                    oIconsFile.setIconSize(220, 220);
                    break;
                case "tm-publish":
                    oIconsFile.setFilePath("publish/skin/ierp/res/tm-publish.png");
                    oIconsFile.setIconSize(17, 14);
                    break;
                case "font-library":
                    oIconsFile.setFilePath(sPath + "/font-library.png");
                    oIconsFile.setIconSize(16, 16);
                    oIconsFile.setGap(1)
                    break;
                case "group-theme-no-data":
                    oIconsFile.setFilePath("theme-manage/skin/ierp/res/group-theme-no-data.png");
                    oIconsFile.setStartPosition(0, 0);
                    oIconsFile.setGap(0);
                    oIconsFile.setIconSize(264, 191);
                    break;
                case "no-font-resource":
                    oIconsFile.setFilePath(sPath + "/no-resource.png");
                    oIconsFile.setIconSize(170, 98);
                    oIconsFile.setGap(0);
                    oIconsFile.setStartPosition(0,151);
                    break;
                default:
                    throw new Error("Unknow fontlib icon key: " + sKey);
            }
        }
    })

})()