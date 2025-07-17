(function()
{
    var _sFilePath = "qingmodeler/scene/skin/ierp/res/";

    if(com.kingdee.bos.qing.modeler.designer)
    {
        var oDesignerIcons = com.kingdee.bos.qing.modeler.designer.Icons;
        if(oDesignerIcons)
        {
            var regist = function(iRow, iCol, sIconName)
            {
                var arrDescription = oIconsFile.createDescription(iRow, iCol);
                oDesignerIcons.regist(sIconName, arrDescription);
            }

            var oIconsFile = new com.kingdee.bos.qing.framework.common.IconsFile();
            oIconsFile.setFilePath(_sFilePath + "msg-success.png");
            oIconsFile.setGap(1);
            oIconsFile.setStartPosition(0, 0);
            oIconsFile.setIconSize(168, 96);
            regist(0, 0, "msg-success");

            oIconsFile.setFilePath(_sFilePath + "model-common.png");
            oIconsFile.setGap(1);
            oIconsFile.setStartPosition(9, -3);
            oIconsFile.setIconSize(16, 16);

            regist(5, 5, "icon-tablemodel");
            oIconsFile.setStartPosition(12, -3);
            regist(5, 6, "relation-model-icon-small");
            oIconsFile.setStartPosition(11, -3);
            regist(5, 7, "entity-model-icon-small");
            regist(5, 8, "icon-metricmodel");
        }
    }

    if (com.kingdee.bos.qing.modeler.scene.metricanalysis)
    {
        var Icons = com.kingdee.bos.qing.modeler.scene.metricanalysis.Icons;
        if(Icons) {
            var oComboIcon = new (function () {
                this.define = function (oIconsFile, sKey) {
                    switch (sKey) {
                        case "scene-error-image-sprite":
                            oIconsFile.setFilePath("scene/skin/ierp/res/scene-error-image-sprite.png");
                            break;
                        case "nodata":
                            oIconsFile.setFilePath("common/skin/ierp/res/icon-empty-error-display/no_data_background.png");
                            break;
                        case "publish-resource-sprite":
                            oIconsFile.setFilePath("scene/skin/ierp/res/publish-resource-sprite.png");
                            break;
                        default:
                            throw new Error("Unknown key: " + sKey);
                    }
                }
            })();
            Icons.setComboIconImpl(oComboIcon)
        }
    }
})();