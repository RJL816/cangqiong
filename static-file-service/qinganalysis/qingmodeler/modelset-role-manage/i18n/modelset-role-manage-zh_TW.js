(function ()
{
    var oManager = com.kingdee.bos.qing.framework.common.MultilanguageManager;
    var oPackage = com.kingdee.bos.qing.modeler.modelset.role.ui;
    oManager.registPackageResources(oPackage,
        {
            //模型集角色管理
            modelSetRole: "模型集角色",
            new: "新增",
            cooperationer: "協作成員",
            editRoleNameSuccess: "修改模型集角色成功。",
            addModelSetRoleSuccess: "新增模型集角色成功。",
            modelSetNameHasExist: "角色名稱已存在。",
            nameTooLong: "名稱長度不能超過50個字符。",
            deleteModelSetRoleSuccess: "删除模型集角色成功。",
            deleteUserSuccess: "删除用户成功。",
            comfirmToDeleteModelSetRole: "刪除模型集角色“#1”後會同時移除角色下的用戶，確定刪除嗎？",
            addUser: "添加用戶",
            delete: "刪除",
            comfirmToDeleteUser: "確定要移除用戶“#1”嗎？",
            addSuccess: "添加成功。",
            editRole: "編輯角色",
            deleteRole: "删除角色",
            noRole:"請先添加角色",
            userNotExist: "找不到該用戶",
            modelSetNotExist: "模型集已被刪除，操作失敗。",
        });

})();