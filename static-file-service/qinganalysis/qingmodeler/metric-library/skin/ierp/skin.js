{
    if(typeof(com) == "undefined") com = {};
    if(typeof(com.kingdee) == "undefined") com.kingdee = {};
    if(typeof(com.kingdee.bos) == "undefined") com.kingdee.bos = {};
    if(typeof(com.kingdee.bos.qing) == "undefined") com.kingdee.bos.qing = {};
    if(typeof(com.kingdee.bos.qing.modeler) == "undefined") com.kingdee.bos.qing.modeler = {};
    if(typeof(com.kingdee.bos.qing.modeler.metriclibrary) == "undefined") com.kingdee.bos.qing.modeler.metriclibrary = {};

    var NS = com.kingdee.bos.qing.modeler.metriclibrary;

    NS.ComboIcon = new (function()
    {
        this.define = function(oIconsFile, sKey)
        {
            var sPath = "qingmodeler/metric-library/svgicon/";
            var sPngPath = "qingmodeler/metric-library/skin/ierp/res/";
            switch (sKey)
            {
                case "model-common":
                    oIconsFile.setFilePath("qingmodeler/common/skin/ierp/res/model-common.png");
                    break;
                case "model-common2x":
                    oIconsFile.setFilePath("qingmodeler/common/skin/ierp/res/model-common2x.png");
                    break;
                case "icon_f7":
                    oIconsFile.setFilePath("qingmodeler/common/skin/ierp/res/icon_f7.svg");
                    oIconsFile.setIconSize(15, 15);
                    break;
                case "switch-button":
                    oIconsFile.setFilePath(sPath + "switch-button.png");
                    break;
                case "table-view":
                    oIconsFile.setFilePath(sPath + "table-view.svg");
                    oIconsFile.setIconSize(16, 16);
                    break;
                case "table-view-on":
                    oIconsFile.setFilePath(sPath + "table-view-on.svg");
                    oIconsFile.setIconSize(16, 16);
                    break;
                case "card-view":
                    oIconsFile.setFilePath(sPath + "card-view.svg");
                    oIconsFile.setIconSize(16, 16);
                    break;
                case "card-view-on":
                    oIconsFile.setFilePath(sPath + "card-view-on.svg");
                    oIconsFile.setIconSize(16, 16);
                    break;
                case "metricLibrary":
                    oIconsFile.setFilePath(sPngPath + "metricLibrary.png");
                    oIconsFile.setIconSize(96, 96);
                    break;
            }
        }
    })();
}