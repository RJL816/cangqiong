(function()
{
	var _sFilePath = "scene/skin/pioneer/res/";
	
	//CoreIcons
	if(com.kingdee.bos.qing.core)
	{
		var CoreIcons = com.kingdee.bos.qing.core.Icons;
		if(CoreIcons)
		{
			var regist = function(iRow, iCol, sIconName)
			{
				var arrDescription = oIconsFile.createDescription(iRow, iCol);
				CoreIcons.regist(sIconName, arrDescription);
				
				var arrDescriptionHover = oIconsFile.createDescription(iRow + 1, iCol);
				CoreIcons.regist(sIconName + "_hover", arrDescriptionHover);

				if(sIconName == "btn_communicate" || sIconName == "publish_to")
				{
					var arrDescriptionHover = oIconsFile.createDescription(iRow + 2, iCol);
					CoreIcons.regist(sIconName + "_disabled", arrDescriptionHover);
				}
			}
			
			var oIconsFile = new com.kingdee.bos.qing.framework.common.IconsFile();
			oIconsFile.setFilePath(_sFilePath + "impl.png");
			oIconsFile.setGap(1);
			oIconsFile.setStartPosition(1, 1);
			oIconsFile.setIconSize(16, 16);
			
			regist(0, 0, "btn_communicate");
			regist(0, 1, "publish_to");
			regist(0, 2, "publish_manager");
			regist(0, 3, "btn_save");
			regist(0, 4, "btn_reset");
			regist(0, 5, "error_close");
		}
	}

	//DataModeling
	if(com.kingdee.bos.qing.data)
		{
			var DmIcons = com.kingdee.bos.qing.data.Icons;
			if(DmIcons)
			{
				var regist = function(iRow, iCol, sIconName)
				{
					var arrDescription = oIconsFile.createDescription(iRow, iCol);
					DmIcons.regist(sIconName, arrDescription);

					var arrDescriptionHover = oIconsFile.createDescription(iRow + 1, iCol);
					DmIcons.regist(sIconName + "_hover", arrDescriptionHover);
				}

				var oIconsFile = new com.kingdee.bos.qing.framework.common.IconsFile();
				oIconsFile.setFilePath(_sFilePath + "impl.png");
				oIconsFile.setGap(1);
				oIconsFile.setStartPosition(1, 1);
				oIconsFile.setIconSize(16, 16);

				regist(0, 3, "btn_save");
				regist(0, 5, "error_close");
			}
		}
	
	//DsbIcons
	if(com.kingdee.bos.qing.dsb)
	{
		var DsbIcons = com.kingdee.bos.qing.dsb.Icons;
		if(DsbIcons)
		{
			var regist = function(iRow, iCol, sIconName)
			{
				var arrDescription = oIconsFile.createDescription(iRow, iCol);
				DsbIcons.regist(sIconName, arrDescription);
				
				var arrDescriptionHover = oIconsFile.createDescription(iRow + 1, iCol);
				DsbIcons.regist(sIconName + "_hover", arrDescriptionHover);

				if(sIconName == "btn_communicate" || sIconName == "publish_to")
				{
					var arrDescriptionHover = oIconsFile.createDescription(iRow + 2, iCol);
					DsbIcons.regist(sIconName + "_disabled", arrDescriptionHover);
				}
			}
			
			var oIconsFile = new com.kingdee.bos.qing.framework.common.IconsFile();
			oIconsFile.setFilePath(_sFilePath + "impl.png");
			oIconsFile.setGap(1);
			oIconsFile.setStartPosition(1, 1);
			oIconsFile.setIconSize(16, 16);

			regist(0, 0, "btn_communicate");
			regist(0, 1, "publish_to");
			regist(0, 2, "publish_manager");
			regist(0, 3, "btn_save");
			regist(0, 4, "btn_reset");
			regist(0, 5, "error_close");
		}
	}
	
	//ErrorUiIcons
	if(com.kingdee.bos.qing.scene.common 
		&& com.kingdee.bos.qing.scene.common.square
		&& com.kingdee.bos.qing.scene.common.square.exhibition)
	{
		var Icons = com.kingdee.bos.qing.scene.common.square.exhibition.Icons;
		if(Icons)
		{
			var oComboIcon = new (function()
			{
				this.define = function(oIconsFile, sKey)
				{
					var sPath = _sFilePath;
					switch(sKey)
					{
						case "scene-error-image-sprite":
							oIconsFile.setFilePath(sPath + "scene-error-image-sprite.png");
							break;
						case "errorbackground":
							oIconsFile.setFilePath("common/skin/pioneer/res/icon-empty-error-display/error_background.png");
							break;
						case "nodata":
							oIconsFile.setFilePath("common/skin/pioneer/res/icon-empty-error-display/no_data_background.png");
							break;
						default:
							throw new Error("Unknow key: " + sKey);
					}
				}
			})();
			Icons.setComboIconImpl(oComboIcon)
		}
	}
	
	if(com.kingdee.bos.qing.scene.common 
			&& com.kingdee.bos.qing.scene.common.exhibitioner)
		{
			var DsbExhibitionerIcons = com.kingdee.bos.qing.scene.common.exhibitioner.Icons;
			if(DsbExhibitionerIcons)
			{
				var oDsbExhibitionerComboIcon = new (function()
				{
					this.define = function(oIconsFile, sKey)
					{
						switch(sKey)
						{
							case "tm":
								oIconsFile.setFilePath(_sFilePath + "tm.png");
								break;
							default:
								throw new Error("Unknow key: " + sKey);
						}
					}
				})();
				DsbExhibitionerIcons.setComboIconImpl(oDsbExhibitionerComboIcon)
			}
		}
	
	if (com.kingdee.bos.qing.scene.cardExhibition)
	{
		com.kingdee.bos.qing.scene.cardExhibition.ComboIcon = new (function()
		{
			this.define = function(oIconsFile, sKey)
			{
				oIconsFile.setStartPosition(0, 0);
				oIconsFile.setGap(0);
				
				var sPath = _sFilePath;
				switch(sKey)
				{
					case "publish-resource-sprite":
						oIconsFile.setFilePath(sPath + "publish-resource-sprite.png");
						break;
					default:
						throw new Error("Unknow key: " + sKey);
				}
			}	
		})();
	}
	
	if(com.kingdee.bos.qing.scene.common
		&& com.kingdee.bos.qing.scene.common.designer)
	{
		var Icons = com.kingdee.bos.qing.scene.common.designer.Icons;
		if(Icons)
		{
			var oComboIcon = new (function()
			{
				this.define = function(oIconsFile, sKey)
				{
					switch(sKey)
					{
						case "no-data":
							oIconsFile.setFilePath("common/skin/pioneer/res/icon-empty-error-display/no-data.png");
							break;
						default:
							throw new Error("Unknow key: " + sKey);
					}
				}
			})();
			Icons.setComboIconImpl(oComboIcon)
		}
	}
})();