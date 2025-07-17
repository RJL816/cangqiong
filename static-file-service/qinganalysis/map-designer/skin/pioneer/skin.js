(function()
{
	var oComboIcon = new (function()
	{
		this.define = function(oIconsFile, sKey)
		{
			var sPath = "map-designer/skin/pioneer/res/";
			oIconsFile.setStartPosition(1, 1);
			oIconsFile.setGap(1);
			switch(sKey)
			{
				case "toolbar":
					oIconsFile.setFilePath(sPath + "map_toolbar.png");
					oIconsFile.setIconSize(16, 16);
					break;
				case "icons":
					oIconsFile.setFilePath(sPath + "map_icons.png");
					oIconsFile.setIconSize(16, 16);
					break;
				case "states":
					oIconsFile.setFilePath(sPath + "map_states.png");
					oIconsFile.setIconSize(24, 24);
					break;
				default:
					throw new Error("Unknow key: " + sKey);
			}
		}
	})();
	com.kingdee.bos.qing.map.Icons.setComboIconImpl(oComboIcon);
	
})();