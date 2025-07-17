(function ()
{
    var oManager = com.kingdee.bos.qing.framework.common.MultilanguageManager;
    var oPackage = com.kingdee.bos.qing.modeler.modelset.role.ui;
    oManager.registPackageResources(oPackage,
        {
            //模型集角色管理
            modelSetRole: "模型集角色",
            new: "新增",
            cooperationer: "协作成员",
            editRoleNameSuccess: "修改模型集角色成功。",
            addModelSetRoleSuccess: "新增模型集角色成功。",
            modelSetNameHasExist: "角色名称已存在。",
            nameTooLong: "名称长度不能超过50个字符。",
            deleteModelSetRoleSuccess: "删除模型集角色成功。",
            deleteUserSuccess: "删除用户成功。",
            comfirmToDeleteModelSetRole: "删除模型集角色“#1”后会同时移除角色下的用户，确定删除吗？",
            addUser: "添加用户",
            delete: "删除",
            comfirmToDeleteUser: "确定要移除用户“#1”吗？",
            addSuccess: "添加成功。",
            editRole: "编辑角色",
            deleteRole: "删除角色",
            noRole:"请先添加角色",
            userNotExist: "找不到该用户",
            modelSetNotExist: "模型集已被删除，操作失败。",
        });

})();