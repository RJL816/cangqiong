{
    if(typeof(com) == "undefined") com = {};
    if(typeof(com.kingdee) == "undefined") com.kingdee = {};
    if(typeof(com.kingdee.bos) == "undefined") com.kingdee.bos = {};
    if(typeof(com.kingdee.bos.qing) == "undefined") com.kingdee.bos.qing = {};
    if(typeof(com.kingdee.bos.qing.modeler) == "undefined") com.kingdee.bos.qing.modeler = {};
    if(typeof(com.kingdee.bos.qing.modeler.modelset) == "undefined") com.kingdee.bos.qing.modeler.modelset = {};

    var NS = com.kingdee.bos.qing.modeler.modelset;

    NS.ComboIcon = new (function()
    {
        this.define = function(oIconsFile, sKey)
        {
            var sPath = "qingmodeler/common/skin/pioneer/res/";
            switch(sKey)
            {
                case "model-common":
                    oIconsFile.setFilePath(sPath + "model-common.png");
                    break;
                case "model-common2x":
                    oIconsFile.setFilePath(sPath + "model-common2x.png");
                    break;
                case "no-data.png":
                    oIconsFile.setFilePath("common/skin/pioneer/res/icon-empty-error-display/no-data.png");
                    break;
                default:
                    throw new Error("Unknow key: " + sKey);
            }
        }
    })();
}