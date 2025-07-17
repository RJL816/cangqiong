(function ()
{
    if(typeof(com) == "undefined") com = {};
    if(typeof(com.kingdee) == "undefined") com.kingdee = {};
    if(typeof(com.kingdee.bos) == "undefined") com.kingdee.bos = {};
    if(typeof(com.kingdee.bos.qing) == "undefined") com.kingdee.bos.qing = {};
    if(typeof(com.kingdee.bos.qing.imagelib) == "undefined") com.kingdee.bos.qing.imagelib = {};

    var NS=com.kingdee.bos.qing.imagelib;

    NS.MyIcons = new (function ()
    {
        com.kingdee.bos.qing.framework.common.AbstractIcons.call(this);
        var _super = this.protectedMethod;
        var _this = this;

        this.protectedInit = function(mapComboIcons, oIconsFile)
        {
            _this.define(oIconsFile, "image-library-sprite");
            oIconsFile.setGap(0);
            oIconsFile.setStartPosition(1, 1);
            
            oIconsFile.setIconSize(18, 18);
            regist(0, 0, "icon-edit_hover");
            regist(1, 0, "icon-edit");
			regist(0, 1, "icon-delete_hover");
			regist(1, 1, "icon-delete");
			regist(0, 2, "icon-move_hover");
			regist(1, 2, "icon-move");
			regist(0, 3, "icon-copy_hover");
			regist(1, 3, "icon-copy");
			//regist(0, 4, "icon-order-up_hover");
			regist(1, 4, "icon-order-up");
			regist(0, 5, "icon-more_hover");
			regist(1, 5, "icon-more");
			regist(0, 6, "icon-preview_hover");
			regist(1, 6, "icon-preview");
			regist(2, 0, "icon-search");
			regist(3, 0, "icon-search_hover");
			regist(2, 1, "icon-small-delete");
			regist(3, 1, "icon-small-delete_hover");
			regist(2, 2, "icon-copy-link");
			regist(3, 2, "icon-copy-link_hover");
			
			oIconsFile.setStartPosition(1, 73);
			oIconsFile.setIconSize(54, 54);
			regist(0, 0, "icon-preset-big");
			
			oIconsFile.setStartPosition(55, 73);
			oIconsFile.setIconSize(40, 40);
			regist(0, 0, "icon-preset");
			
			oIconsFile.setStartPosition(91, 109);
			oIconsFile.setIconSize(18, 18);
			regist(0, 0, "icon-error-tips");
			regist(0, 1, "icon-image-library");

			oIconsFile.setStartPosition(91, 73);
			oIconsFile.setIconSize(36, 36);
			regist(0, 0, "icon-no-image");
			
			oIconsFile.setStartPosition(1, 127);
			oIconsFile.setIconSize(42, 42);
			regist(0, 0, "icon-round-delete");

			oIconsFile.setStartPosition(55, 127);
			oIconsFile.setIconSize(42, 42);
			regist(0, 0, "icon-round-edit");
			
			oIconsFile.setStartPosition(1, 181);
			oIconsFile.setIconSize(42, 42);
			regist(0, 0, "icon-round-delete_hover");

			oIconsFile.setStartPosition(55, 181);
			oIconsFile.setIconSize(42, 42);
			regist(0, 0, "icon-round-edit_hover");
			
            _this.define(oIconsFile, "no-data");
            oIconsFile.setStartPosition(0, 0);
            oIconsFile.setGap(0);
            oIconsFile.setIconSize(220, 220);
            regist(0, 0, "no-data");
            
            _this.define(oIconsFile, "icon-error-tips");
            oIconsFile.setStartPosition(0, 0);
            oIconsFile.setGap(1);
            oIconsFile.setIconSize(16, 16);
            regist(0, 0, "icon-error-tips");

	        _this.define(oIconsFile, "image-library-icons");
	        oIconsFile.setStartPosition(0, 0);
	        oIconsFile.setGap(1);
	        oIconsFile.setIconSize(16, 16);
	        regist(6, 0, "menu");
	        regist(7, 0, "menu_hover");
	        //regist(8, 14, "icon-order-up");
	        regist(9, 14, "icon-order-up_hover");
			regist(6, 8, "refresh");
        }

        var regist = function(iRow, iCol, sIconName)
        {
            _super.registIcon(iRow, iCol, sIconName);
        }

        this.define = function(oIconsFile, sKey)
        {
            var sPath = "imagelib/skin/ierp/res/";
            switch(sKey)
            {
                case "image-library-sprite":
                    oIconsFile.setFilePath(sPath + "image-library-sprite.png");
                    break;
                case "no-data":
                    oIconsFile.setFilePath("common/skin/ierp/res/icon-empty-error-display/no-data.png");
                    break;
				case "icon-error-tips":
					oIconsFile.setFilePath(sPath + "icon-error-tips.png");
					break;
	            case "image-library-icons":
		            oIconsFile.setFilePath(sPath + "image-library-icons.png");
		            break;
                default:
                    throw new Error("Unknow key: " + sKey);
            }
        }
    })();
})();