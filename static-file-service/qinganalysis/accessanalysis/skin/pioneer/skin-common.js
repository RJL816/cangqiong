(function()
{
    if(typeof(com) == "undefined") com = {};
    if(typeof(com.kingdee) == "undefined") com.kingdee = {};
    if(typeof(com.kingdee.bos) == "undefined") com.kingdee.bos = {};
    if(typeof(com.kingdee.bos.qing) == "undefined") com.kingdee.bos.qing = {};
    if(typeof(com.kingdee.bos.qing.accessanalysis) == "undefined") com.kingdee.bos.qing.accessanalysis = {};
    if(typeof(com.kingdee.bos.qing.accessanalysis.skin) == "undefined") com.kingdee.bos.qing.accessanalysis.skin = {};

    var NS = com.kingdee.bos.qing.accessanalysis.skin;

    NS.ComboIcon = new (function()
    {
        this.define = function(oIconsFile, sKey)
        {
            switch(sKey)
            {
                case "nodata":
                    oIconsFile.setFilePath("common/skin/ierp/res/icon-empty-error-display/no_data_background.png");
                    break;
                case "tips-background":
                    oIconsFile.setFilePath("common/skin/ierp/res/icon-empty-error-display/icon_open_tips_background.png");
                    break;
                case "tm":
                    oIconsFile.setFilePath("theme-manage/skin/ierp/res/tm.png");
                    break;
                case "tm-publish":
                    oIconsFile.setFilePath("publish/skin/ierp/res/tm-publish.png");
                    break;
                case "dm":
                    oIconsFile.setFilePath("data-modeling/skin/ierp/res/dm.png");
                    break;
                case "select-menu":
                    oIconsFile.setFilePath("accessanalysis/skin/ierp/res/select-menu.svg");
                    break;
                default:
                    throw new Error("Unknow key: " + sKey);
            }
        }

    })();
})();