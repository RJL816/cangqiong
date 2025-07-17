(function()
{
	var DeskSkin = 
	{
		DESK_SPLIT_GAP_H: 8,
		DESK_SPLIT_GAP_V: 8,
		DESK_PADDING_TOP: 4,
		DESK_PADDING_BOTTOM: 4,
		DESK_PADDING_LEFT: 4,
		DESK_PADDING_RIGHT: 4,
		CARD_GAP: 3,
		CARD_TITLE_WIDTH: 50,
		CARD_TITLE_HEIGHT: 22,
		CARD_ITEM_HEIGHT: 22,
		CARD_ITEM_WIDTH: 120,
		CARD_ITEM_H_SPACING: 4,
		CARD_ITEM_V_SPACING: 4,
		FILTER_LANE_WIDTH: 150,
		FILTER_LANE_GAP: 6
	};
	try
	{
		com.kingdee.bos.qing.longer.ui.LongPaintingDesk.setSkin(DeskSkin);
		com.kingdee.bos.qing.square.ui.SquareDesk.setSkin(DeskSkin);
	}
	catch(err)
	{
		window.console && console.log(err);
	}
	
	var oComboIcon = new (function()
	{
		this.define = function(oIconsFile, sKey)
		{
			var sPath = "core/skin/pioneer/res/";
			oIconsFile.setStartPosition(1, 1);
			oIconsFile.setGap(1);
			switch(sKey)
			{
				case "card-item":
					oIconsFile.setFilePath(sPath + "carditem.png");
					oIconsFile.setIconSize(16, 16);
					break;
				case "chart-type":
					oIconsFile.setFilePath(sPath + "charttypes.png");
					oIconsFile.setIconSize(28, 21);
					break;
				case "sort":
					oIconsFile.setFilePath(sPath + "exhibition.png");
					oIconsFile.setStartPosition(2, 2);
					oIconsFile.setGap(3);
					oIconsFile.setIconSize(13, 13);
					break;
				case "roll":
					oIconsFile.setFilePath(sPath + "exhibition.png");
					oIconsFile.setStartPosition(1, 101);
					oIconsFile.setIconSize(12, 12);
					break;
				case "tooltips-bar":
					oIconsFile.setFilePath(sPath + "exhibition.png");
					oIconsFile.setStartPosition(55, 101);
					oIconsFile.setIconSize(12, 12);
					break;
				case "extra":
					oIconsFile.setFilePath(sPath + "exhibition.png");
					oIconsFile.setStartPosition(1, 129);
					oIconsFile.setIconSize(12, 12);
					break;
				case "meta-tree":
					oIconsFile.setFilePath(sPath + "metatree.png");
					oIconsFile.setIconSize(16, 16);
					break;
				case "operate":
					oIconsFile.setFilePath(sPath + "operate.png");
					oIconsFile.setIconSize(16, 16);
					break;
				case "toolbar":
					oIconsFile.setFilePath(sPath + "toolbar.png");
					oIconsFile.setIconSize(16, 16);
					break;
				default:
					throw new Error("Unknow key: " + sKey);
			}
		}
	})();
	com.kingdee.bos.qing.core.Icons.setComboIconImpl(oComboIcon);
	
})();