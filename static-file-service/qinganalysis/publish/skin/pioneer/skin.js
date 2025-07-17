(function()
{
	if(typeof(com) == "undefined") com = {};
	if(typeof(com.kingdee) == "undefined") com.kingdee = {};
	if(typeof(com.kingdee.bos) == "undefined") com.kingdee.bos = {};
	if(typeof(com.kingdee.bos.qing) == "undefined") com.kingdee.bos.qing = {};
	if(typeof(com.kingdee.bos.qing.publish) == "undefined") com.kingdee.bos.qing.publish = {};
	if(typeof(com.kingdee.bos.qing.publish.common) == "undefined") com.kingdee.bos.qing.publish.common = {};

	var NS = com.kingdee.bos.qing.publish.common;

	NS.PublishTableSkin = 
	{
		HEAD_ROW_BACKGROUND_COLOR: "#d5f6ff",
		HEAD_ROW_BORDER_COLOR: "#ccc",
		ODD_ROW_BACKGROUND_COLOR: "ffffff",
		EVEN_ROW_BACKGROUND_COLOR: "#f7f7f7",
		COLOR: "#666"
	};

	NS.ComboIcon = new (function()
	{
		this.define = function(oIconsFile, sKey)
		{
			var sPath = "publish/skin/pioneer/res/";
			oIconsFile.setStartPosition(0, 0);
			oIconsFile.setGap(0);
			switch(sKey)
			{
				case "icon_f7.svg":
					oIconsFile.setFilePath(sPath + "icon_f7.svg");
					oIconsFile.setIconSize(15, 15);
					break;
				case "public-iconandimage":
					oIconsFile.setFilePath(sPath + "public-iconandimage.png");
					break;
				case "no-data.png":
					oIconsFile.setFilePath("common/skin/pioneer/res/icon-empty-error-display/no-data.png");
					break;
				case "icon_open_tips_background.png":
					oIconsFile.setFilePath("common/skin/pioneer/res/icon-empty-error-display/icon_open_tips_background.png");
					break;
				case "icon_help.png":
					oIconsFile.setFilePath(sPath + "icon_help.png");
					oIconsFile.setIconSize(16, 16);
					break;
                case "tm":
                    oIconsFile.setFilePath(sPath + "tm.png");
                    break;
				case "tm-publish":
					oIconsFile.setFilePath(sPath + "tm-publish.png");
					break;
				case "schema-manage-sprite.png":
					oIconsFile.setFilePath("schema-manage/skin/pioneer/res/schema-manage-sprite.png");
					break;
				case "public-no-data":
					oIconsFile.setFilePath("common/skin/pioneer/res/icon-empty-error-display/no-search-data.png");
					oIconsFile.setStartPosition(0, 0);
					oIconsFile.setGap(0);
					oIconsFile.setIconSize(103, 130);
					break;
				case "common":
					oIconsFile.setFilePath("common/skin/pioneer/res/common.png");
					break;
				case "msg":
					oIconsFile.setFilePath("common/skin/pioneer/res/msg.png");
					break;
				case "extreport":
					oIconsFile.setFilePath(sPath + "extreport.png");
					break;
				case "perm-label":
					oIconsFile.setFilePath(sPath + "perm-label.png");
					break;
				case "perm-label-hover":
					oIconsFile.setFilePath(sPath + "perm-label-hover.png");
					break;
				case "dm":
					oIconsFile.setFilePath(sPath + "dm.png");
					break;
				default:
					throw new Error("Unknow key: " + sKey);
			}
		}
	})();
})();