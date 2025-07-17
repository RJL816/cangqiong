(function()
{
    if(typeof(com) == "undefined") com = {};
    if(typeof(com.kingdee) == "undefined") com.kingdee = {};
    if(typeof(com.kingdee.bos) == "undefined") com.kingdee.bos = {};
    if(typeof(com.kingdee.bos.qing) == "undefined") com.kingdee.bos.qing = {};
    if(typeof(com.kingdee.bos.qing.resourcestatistics) == "undefined") com.kingdee.bos.qing.resourcestatistics = {};

    var NS = com.kingdee.bos.qing.resourcestatistics;

    NS.ComboIcon = new (function()
    {
        this.define = function(oIconsFile, sKey)
        {
            var sPath = "resource-statistics/skin/ierp/res/";
            switch(sKey)
            {
                case "tips-background":
                    oIconsFile.setFilePath("common/skin/ierp/res/icon-empty-error-display/icon_open_tips_background.png");
                    break;
                case "nodata":
                    oIconsFile.setFilePath("common/skin/ierp/res/icon-empty-error-display/no_data_background.png");
                    break;
                case "tm":
                    oIconsFile.setFilePath("theme-manage/skin/ierp/res/tm.png");
                    break;
                default:
                    throw new Error("Unknow key: " + sKey);
            }
        }

    })();
})();