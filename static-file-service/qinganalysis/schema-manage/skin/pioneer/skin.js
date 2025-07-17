(function ()
{
    if(typeof(com) == "undefined") com = {};
    if(typeof(com.kingdee) == "undefined") com.kingdee = {};
    if(typeof(com.kingdee.bos) == "undefined") com.kingdee.bos = {};
    if(typeof(com.kingdee.bos.qing) == "undefined") com.kingdee.bos.qing = {};
    if(typeof(com.kingdee.bos.qing.schemamanage) == "undefined") com.kingdee.bos.qing.schemamanage = {};

    var NS=com.kingdee.bos.qing.schemamanage;

    NS.MyIcons=new (function ()
    {
        com.kingdee.bos.qing.framework.common.AbstractIcons.call(this);
        var _super = this.protectedMethod;

        this.protectedInit = function (mapComboIcons, oIconsFile) {
            oIconsFile.setFilePath("schema-manage/skin/pioneer/res/schema-manage-sprite.png");
            oIconsFile.setGap(1);
            oIconsFile.setStartPosition(1, 1);

            oIconsFile.setIconSize(13,13);
            regist(0,0,"icon_search");

            oIconsFile.setIconSize(12,11);
            oIconsFile.setStartPosition(16,2);
            oIconsFile.setGap(2);
            regist(0,1,"icon_user");
            regist(0,0,"icon_system");

            oIconsFile.setStartPosition(1,21);
            oIconsFile.setGap(1);
            oIconsFile.setIconSize(16,16);
            regist(0, 0, "icon_undefault");
            regist(1, 0, "icon_default");

            regist(0, 1, "icon_edit");
            regist(1, 1, "icon_edit_hover");

            regist(0, 2, "icon_up_schema");
            regist(1, 2, "icon_up_schema_on");

            regist(0, 3, "icon_delete");
            regist(1, 3, "icon_delete_hover");

            oIconsFile.setFilePath("common/skin/pioneer/res/common.png");
            oIconsFile.setGap(1);
            oIconsFile.setStartPosition(1, 1);

            oIconsFile.setIconSize(16, 16);
            regist2(0, 6, "tree-collapsed");
            regist2(0, 7, "tree-expanded");

            oIconsFile.setFilePath("common/skin/pioneer/res/msg.png");
            oIconsFile.setStartPosition(1, 1);
            oIconsFile.setGap(1);

            oIconsFile.setIconSize(100, 80);
            regist(1, 2, "msg-warning");
            regist(2, 0, "msg-jurisdiction");

            oIconsFile.setFilePath("common/skin/pioneer/res/icon-empty-error-display/no-search-data.png");
            oIconsFile.setStartPosition(0, 0);
            oIconsFile.setGap(0);
            oIconsFile.setIconSize(103, 130);
            regist(0, 0, "public-no-data");
        }

        var regist2 = function(iRow, iCol, sName)
        {
            regist(iRow, iCol, sName + "_hover");
            regist(iRow + 1, iCol, sName);
        }

        var regist = function(iRow, iCol, sIconName)
        {
            _super.registIcon(iRow, iCol, sIconName);
        }
    })();
})();