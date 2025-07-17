(function ()
{
    var oManager = com.kingdee.bos.qing.framework.common.MultilanguageManager;
    var oPackage = com.kingdee.bos.qing.modeler.modelset.role.ui;
    oManager.registPackageResources(oPackage,
        {
            //模型集角色管理
            modelSetRole: "ModelSetRole",
            new: "New",
            cooperationer: "Members of the collaboration",
            editRoleNameSuccess: "Successfully modified the ModelSet role.",
            addModelSetRoleSuccess: "The ModelSet role was added successfully.",
            modelSetNameHasExist: "The role name already exists.",
            nameTooLong: "The name cannot exceed 50 characters.",
            deleteModelSetRoleSuccess: "Successfully deleted the ModelSet role.",
            deleteUserSuccess: "Successfully deleted the user.",
            comfirmToDeleteModelSetRole: "Deleting ModelSet role “#1” will also remove users under the role. Are you sure you want to delete it?",
            addUser: "Add user",
            delete: "Delete",
            comfirmToDeleteUser: "Are you sure you want to delete user ”#1“?",
            addSuccess: "Successfully added.",
            editRole: "Edit Role",
            deleteRole: "Delete Role",
            noRole:"Please add a role first",
            userNotExist: "The user is not found",
            modelSetNotExist: "ModelSet is deleted, operation failure.",
        });

})();