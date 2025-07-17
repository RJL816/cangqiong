(function()
{
	var oComboIcon = new (function()
	{
		this.define = function(oIconsFile, sKey)
		{
			var sPath = "qingmodeler/designer/skin/pioneer/res/";
			oIconsFile.setStartPosition(1, 1);
			oIconsFile.setGap(1);
			switch(sKey)
			{
				case "designer":
					oIconsFile.setFilePath(sPath + "designer.png");
					break;
				case "source":
					oIconsFile.setFilePath(sPath + "source.png");
					break;
				case "metatree":
					oIconsFile.setFilePath(sPath + "metatree.png");
					break;
				case "metric":
					oIconsFile.setFilePath(sPath + "metric.png");
					break;
				default:
					throw new Error("Unknow key: " + sKey);
			}
		}
	})();
	com.kingdee.bos.qing.modeler.designer.Icons.setComboIconImpl(oComboIcon);
})();