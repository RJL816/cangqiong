(function()
{
	if(typeof(com) == "undefined") com = {};
	if(typeof(com.kingdee) == "undefined") com.kingdee = {};
	if(typeof(com.kingdee.bos) == "undefined") com.kingdee.bos = {};
	if(typeof(com.kingdee.bos.extreport) == "undefined") com.kingdee.bos.extreport = {};
	if(typeof(com.kingdee.bos.extreport.manage) == "undefined") com.kingdee.bos.extreport.manage = {};

	var NS = com.kingdee.bos.extreport.manage;

	NS.ComboIcon = new (function()
	{
		this.define = function(oIconsFile, sKey)
		{
			var sPath = "qingrpt/manage/skin/ierp/res/";
			switch(sKey)
			{
				case "extreport":
					oIconsFile.setFilePath(sPath + "extreport.png");
					break;
				case "icon_search":
					oIconsFile.setFilePath(sPath + "icon_search.png");
					break;
				case "icon_search_hover":
					oIconsFile.setFilePath(sPath + "icon_search_hover.png");
					break;
				case "btn-add-classification":
					oIconsFile.setFilePath(sPath + "btn-add-classification.png");
					break;
				case "btn-add-classification_hover":
					oIconsFile.setFilePath(sPath + "btn-add-classification_hover.png");
					break;
				case "btn_orderup":
					oIconsFile.setFilePath(sPath + "btn_orderup.png");
					break;
				case "btn_orderup_hover":
					oIconsFile.setFilePath(sPath + "btn_orderup_hover.png");
					break;
				case "no-data":
					oIconsFile.setFilePath(sPath + "no-data.png");
					break;
				case "group-extreport-no-data":
				    oIconsFile.setFilePath(sPath + "group-extreport-no-data.png");
				    break;
				case "extreport-icons":
					oIconsFile.setFilePath(sPath + "extreport-icons.png");
					break;
				case "search_category":
					oIconsFile.setFilePath(sPath + "search_category.png");
					break;
				case "search_category_hover":
					oIconsFile.setFilePath(sPath + "search_category_hover.png");
					break;
				case "all_expand":
					oIconsFile.setFilePath(sPath + "all_expand.png");
					break;
				case "all_expand_hover":
					oIconsFile.setFilePath(sPath + "all_expand_hover.png");
					break;
				case "all_collapse":
					oIconsFile.setFilePath(sPath + "all_collapse.png");
					break;
				case "all_collapse_hover":
					oIconsFile.setFilePath(sPath + "all_collapse_hover.png");
					break;
				case "extreport_search":
					oIconsFile.setFilePath(sPath + "extreport_search.png");
					break;
				case "list-view.svg":
					oIconsFile.setFilePath(sPath + "list-view.svg");
					oIconsFile.setIconSize(16, 16);
					break;
				case "list-view-click.svg":
					oIconsFile.setFilePath(sPath + "list-view-on.svg");
					oIconsFile.setIconSize(16, 16);
					break;
				case "card-view.svg":
					oIconsFile.setFilePath(sPath + "card-view.svg");
					oIconsFile.setIconSize(16, 16);
					break;
				case "card-view-click.svg":
					oIconsFile.setFilePath(sPath + "card-view-on.svg");
					oIconsFile.setIconSize(16, 16);
					break;
				case "list_view_edit":
					oIconsFile.setFilePath(sPath + "list_view_edit.png");
					oIconsFile.setIconSize(16, 16);
					break;
				case "list_view_edit_hover":
					oIconsFile.setFilePath(sPath + "list_view_edit_hover.png");
					oIconsFile.setIconSize(16, 16);
					break;
				case "qingrpt":
					oIconsFile.setFilePath(sPath + "qingrpt.png");
					oIconsFile.setIconSize(16, 16);
					break;
				case "report_designer":
					oIconsFile.setFilePath(sPath + "report_designer.png");
					oIconsFile.setIconSize(24, 24);
					break;
				case "report_designer_hover":
					oIconsFile.setFilePath(sPath + "report_designer_hover.png");
					oIconsFile.setIconSize(24, 24);
					break;
				case "dataset_designer":
					oIconsFile.setFilePath(sPath + "dataset_designer.png");
					oIconsFile.setIconSize(24, 24);
					break;
				case "dataset_designer_hover":
					oIconsFile.setFilePath(sPath + "dataset_designer_hover.png");
					oIconsFile.setIconSize(24, 24);
					break;
				case "extreport_preview":
					oIconsFile.setFilePath(sPath + "extreport_preview.png");
					oIconsFile.setIconSize(24, 24);
					break;
				case "extreport_preview_hover":
					oIconsFile.setFilePath(sPath + "extreport_preview_hover.png");
					oIconsFile.setIconSize(24, 24);
					break;
				case "dataset_preview":
					oIconsFile.setFilePath(sPath + "extreport_preview.png");
					oIconsFile.setIconSize(24, 24);
					break;
				case "dataset_preview_hover":
					oIconsFile.setFilePath(sPath + "extreport_preview_hover.png");
					oIconsFile.setIconSize(24, 24);
					break;
				default:
					throw new Error("Unknow key: " + sKey);
			}
		}
	})();
})();