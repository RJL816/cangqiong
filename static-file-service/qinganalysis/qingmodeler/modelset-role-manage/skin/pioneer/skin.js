{
    if(typeof(com) == "undefined") com = {};
    if(typeof(com.kingdee) == "undefined") com.kingdee = {};
    if(typeof(com.kingdee.bos) == "undefined") com.kingdee.bos = {};
    if(typeof(com.kingdee.bos.qing) == "undefined") com.kingdee.bos.qing = {};
    if(typeof(com.kingdee.bos.qing.modeler) == "undefined") com.kingdee.bos.qing.modeler = {};
    if(typeof(com.kingdee.bos.qing.modeler.modelset) == "undefined") com.kingdee.bos.qing.modeler.modelset = {};
    if(typeof(com.kingdee.bos.qing.modeler.modelset.role) == "undefined") com.kingdee.bos.qing.modeler.modelset.role = {};

    var NS = com.kingdee.bos.qing.modeler.modelset.role;

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
                default:
                    throw new Error("Unknow key: " + sKey);
            }
        }
    })();
}