(function()
{
	var oComboIcon = new (function()
	{
		this.define = function(oIconsFile, sKey)
		{
			var sPath = "dashboard/skin/pioneer/res/";
			oIconsFile.setStartPosition(1, 1);
			oIconsFile.setGap(1);
			switch(sKey)
			{
				case "toolbar":
					var sPath = "core/skin/pioneer/res/";
					oIconsFile.setFilePath(sPath + "toolbar.png");
					oIconsFile.setIconSize(16, 16);
					break;
				case "toolbox":
					oIconsFile.setFilePath(sPath + "dsb_toolbox.png");
					oIconsFile.setIconSize(28, 28);
					break;
				case "outline":
					oIconsFile.setStartPosition(117, 1);
					oIconsFile.setFilePath(sPath + "dsb_toolbox.png");
					oIconsFile.setIconSize(16, 16);
					break;
				case "operate":
					oIconsFile.setFilePath(sPath + "dsb_operate.png");
					oIconsFile.setIconSize(10, 10);
					break;
				case "card":
					oIconsFile.setStartPosition(1, 12);
					oIconsFile.setFilePath(sPath + "dsb_operate.png");
					oIconsFile.setIconSize(16, 16);
					break;
				case "ctrl":
					oIconsFile.setStartPosition(1, 48);
					oIconsFile.setFilePath(sPath + "dsb_operate.png");
					oIconsFile.setIconSize(16, 16);
					break;
				case "exhibitionmode":
					oIconsFile.setFilePath(sPath + "dsb_exhibitionmode.png");
					oIconsFile.setIconSize(48, 48);
					break;
				default:
					throw new Error("Unknow key: " + sKey);
			}
		}
	})();
	com.kingdee.bos.qing.dsb.Icons.setComboIconImpl(oComboIcon);
	
})();