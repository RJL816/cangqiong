{
    if(typeof(com) == "undefined") com = {};
    if(typeof(com.kingdee) == "undefined") com.kingdee = {};
    if(typeof(com.kingdee.bos) == "undefined") com.kingdee.bos = {};
    if(typeof(com.kingdee.bos.qing) == "undefined") com.kingdee.bos.qing = {};
    if(typeof(com.kingdee.bos.qing.modeler) == "undefined") com.kingdee.bos.qing.modeler = {};
    if(typeof(com.kingdee.bos.qing.modeler.modelset) == "undefined") com.kingdee.bos.qing.modeler.modelset = {};
    if(typeof(com.kingdee.bos.qing.modeler.modelset.auth) == "undefined") com.kingdee.bos.qing.modeler.modelset.auth = {};

    var NS = com.kingdee.bos.qing.modeler.modelset.auth;

    NS.ComboIcon = new (function()
    {
        this.define = function(oIconsFile, sKey)
        {
            var sPath = "qingmodeler/modelset-data-auth/skin/pioneer/res/";
            switch(sKey)
            {
                case "model-auth":
                    oIconsFile.setFilePath(sPath + "model-auth.png");
                    break;
                default:
                    throw new Error("Unknow key: " + sKey);
            }
        }
    })();
}