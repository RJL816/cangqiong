{
    if(typeof(com) == "undefined") com = {};
    if(typeof(com.kingdee) == "undefined") com.kingdee = {};
    if(typeof(com.kingdee.bos) == "undefined") com.kingdee.bos = {};
    if(typeof(com.kingdee.bos.qing) == "undefined") com.kingdee.bos.qing = {};
    if(typeof(com.kingdee.bos.qing.modeler) == "undefined") com.kingdee.bos.qing.modeler = {};
    if(typeof(com.kingdee.bos.qing.modeler.modelset) == "undefined") com.kingdee.bos.qing.modeler.modelset = {};
    if(typeof(com.kingdee.bos.qing.modeler.modelset.source) == "undefined") com.kingdee.bos.qing.modeler.source = {};

    var NS = com.kingdee.bos.qing.modeler.modelset.source;

    NS.ComboIcon = new (function()
    {
        this.define = function(oIconsFile, sKey)
        {
            var sPath = "qingmodeler/modelset-source-manage/skin/ierp/res/";
            oIconsFile.setStartPosition(1, 1);
            oIconsFile.setGap(1);
            switch(sKey)
            {
                case "source":
                    oIconsFile.setFilePath(sPath + "source.png");
                    oIconsFile.setIconSize(90, 45);
                    break;
                case "file":
                    oIconsFile.setFilePath(sPath + "file.png");
                    oIconsFile.setIconSize(30, 35);
                    break;
                case "source-error":
                    oIconsFile.setFilePath(sPath + "source-error.png");
                    //oIconsFile.setIconSize(90, 70);
                    break;
                case "dm":
                    oIconsFile.setFilePath(sPath + "dm.png");
                    oIconsFile.setIconSize(16, 16);
                    break;
                case "source-round":
                    oIconsFile.setFilePath(sPath + "source-round.png");
                    break;
                default:
                    throw new Error("Unknow key: " + sKey);
            }
        }
    })();
}