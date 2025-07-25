(function ()
{
    var oManager = com.kingdee.bos.qing.framework.common.MultilanguageManager;
    var oPackage = com.kingdee.bos.qing.modeler.modelset.auth.ui;
    oManager.registPackageResources(oPackage,
    {
        //輕建模數據權限
        viewType: "展示方式：",
        showByModel: "按模型展示",
        showByUser: "按用戶或角色展示",
        deployedModels: "已部署的模型",
        refreshModels: "刷新模型",
        searchContent: "請輸入搜索內容",
        noMatchedResult: "沒有符合搜索條件的結果",
        noDeployedModel: "暫無已部署的模型",
        invalidModeler:  "當前選中模型已失效",
        operationInstructions: "請點擊左側模型進行數據權限設置",
        addUsers: "添加用戶",
        deleteUsers: "移除用戶",
        successToAddUsers: "成功添加用戶。",
        successfullyAdded: "添加成功。",
        selectUsersToDelete: "請選擇需要移除的用戶。",
        confirmDeleteUsers: "確定要移除“#1”等#2個用戶嗎？",
        successToDeleteUsers: "成功移除用戶。",
        currentSysUser: "當前系統用戶",
        currentSysRole: "當前系統角色",
        currentModelSetRole: "當前模型集角色",
        modelSetRoleManage: "模型集角色管理",
        deleteRoles: "移除角色",
        addRoles: "添加角色",
        selectRolesToDelete: "請選擇需要移除的角色。",
        confirmDeleteRoles: "確定要移除“#1”等#2個角色嗎？",
        successToDeleteRoles: "成功移除角色。",
        deleteSucceeded: "移除成功。",
        successToAddRoles: "成功添加角色。",
        confirmDeleteUser: "確定要移除用戶“#1”嗎？",
        confirmDeleteRole: "確定要移除角色“#1”嗎？",
        modelSetRoleManagement: "模型集角色管理",
        modelException: "模型異常，無法設置數據權限",
        viewModel: "查看該模型",
        rowAuth: "行級權限：",
        notExistFilter: "過濾條件第#1行字段不存在",
        notDeployed: "未進行部署的模型無法添加用戶。",
        operationConfirmation: "操作確認",
        noUser: "請先添加用戶",
        noRole: "請先添加角色",
        operatorTips: "操作提示",
        authorized: "當前目錄及其子目錄下的所有模型的啟用狀態已開啟，該目錄下未來新增的模型的啟用狀態也將自動開啟。",
        iKnow: "我知道了",

        userName: "用戶名稱",
        userId: "工號",
        roleName: "角色名稱",
        code: "編碼",
        enable: "啟用狀態",
        editPermission: "設置數據權限",
        editPermissionTitle: "設置數據權限",
        settings: "數據權限設置",
        abstract: "數據權限摘要",
        sysUserSummary: "當前系統用戶的數據權限摘要",
        sysRoleSummary: "當前系統角色的數據權限摘要",
        modelSetRoleSummary: "當前模型集角色的數據權限摘要",
        permissionInherited: "本條權限同時受用戶權限和角色權限的影響。點擊圖標可調整為以單獨設置的用戶權限為準。",
        noPermissionInherited: "本條權限以單獨設置的用戶權限為準，不受角色權限的影響。點擊圖標可恢復為同時受用戶權限和角色權限的影響。",
        deleteDataPermission: "清空行級和列級數據權限設置後將無法恢復，確定清空嗎？",
        deleteAllPermissions: "清空行級和列級數據權限設置",
        successToDeletePermission: "刪除成功。",
        loadDataAuth: "正在獲取權限摘要，請稍候……",
        onlyShowDataAuth: "模型異常，無法設置數據權限。由於當前模型已存在物化數據，以下僅展示對物化數據生效的數據權限內容。",

        modelName: "模型名稱",
        modelNameAndNumber: "模型名稱（編碼）",
        selectNull: "當前未選中任何用戶或角色。",
        selectDataRole: "選擇模型集角色",
        noModelSetRole: "暫無可選的模型集角色",
        selectOne: "請選擇一行數據。",
        verificationFailed: "行級權限設置不完整。",
        dataRoleName: "數據角色名稱",
        assignedUsers: "分配用戶",
        selectedRoles: "（已選擇#1項）",
        clearAll: "全部清空",
        searchRoleName: "搜索角色名稱",
        showSelected: "僅顯示選中項",
        selectAll: "全選",

        inheritRoleAuth: "顯示全部生效的權限",
        viewAllAuth: "默認顯示該用戶單獨設置的數據權限，開啟後可查看該用戶全部生效的權限，包括用戶擁有的系統橘色、模型集角色的數據權限。",
        rowLevelPermission: "行級權限",
        colLevelPermission: "列級權限",
        leftBracket: "左括弧",
        field: "字段",
        compare: "比較",
        value: "值",
        rightBracket: "右括弧",
        logic: "邏輯",
        insert: "插入",
        deleteRow: "刪除",
        search: "搜索",
        showFieldName: "顯示原字段名稱",
        nothingSearched: "沒有符合搜索條件的結果",
        noSelectField: "暫無可選字段",
        compareVariable: "匹配變量",
        equal: "等於",
        notEqual: "不等於",
        greater: "大於",
        equalOrGreater: "大於等於",
        less: "小於",
        equalOrLess: "小於等於",
        include: "包含",
        notInclude: "不包含",
        startWith: "開頭是",
        endWith: "結尾是",
        compareNull: "為空",
        compareNotNull: "不為空",
        compareIn: "在......之內",
        compareNotIn: "不在......之內",
        enterSplit: "精確匹配多值，各項之間使用回車作為分隔符號",
        matchTooLong: "匹配項不能超過50000個字符",
        ok: "確定",
        cancel: "取消",
        dataTypeTrue: "真",
        dataTypeFalse: "假",
        and: "且",
        or: "或",
        intersection: "交集",
        union: "並集",
        searchFieldContent: "請輸入字段名稱",
        searchPrompt: "請輸入模型名稱/編碼",
        allFields: "全部字段",
        viewableField: "可查看字段",
        unViewableField: "禁止查看字段",
        effectiveFields: "生效的可見字段集合是用戶/角色的",
        fieldIndex: "序號",
        fieldDataType: "字段類型",
        fieldName: "字段名稱",
        roleEnable: "角色級別字段可見性",
        userEnable: "用戶級別字段可見性",
        effectiveEnable: "生效的字段可見性",
        viewEnable: "可查看字段",
        duplicatedName: "重複的字段顯示名稱：",
        abandonModify: "，已放棄修改。",
        origin: "原始",
        numberFormatOfField: "字段[#1]的數位格式",
        text: "文本",
        number: "數值",
        integer: "整數",
        dataTypeDate: "日期",
        dateTime: "日期時間",
        bool: "布爾",
        dataTypeNotMatch: "字段“#1”的數據類型為#2，與字段“#3”的#4數據類型不一致",
        noFieldToSelect: "無可選字段",
        bracketMismatch: "左右括弧不匹配。",
        lackLogicalSymbol: "第#1行缺少邏輯符",
        lackField: "第#1行字段不存在。",
        incompleteFilter: "第#1行不完整，",
        lackValue: "缺少值。",
        valueMustBeNum: "值必須為數位。",
        wrongBoolean: "錯誤的布爾值。",
        lackComparisonOperator: "缺少比較符。",
        comparisonMismatch: "比較符不匹配。",
        modelSetRoleNoExists: "該模型集角色不存在或已被刪除",
        userNoExists: "該系統用戶不存在或已被刪除",
        roleNoExists: "該系统角色不存在或已被删除",
        userDisabled: "該系统用户已被禁用",
        roleDisabled: "該系统角色已被禁用",
        noRoleAuth: "該用戶不屬於任何角色或所屬角色未設置權限。",
        modelNoDeploy: "模型已取消部署，無法設置數據權限。",
        preset: "預置",
        noPermission: "沒有該模型集的查看權限",
        userIsCoop: "該用戶是本模型集的協作成員，擁有模型集下所有模型的全部數據權限，本條權限設置無效。"
    });

    oPackage = com.kingdee.bos.qing.modeler.modelset.auth.model;
    oManager.registPackageResources(oPackage,
    {
        rowAuth: "行級權限：",
        filterItems: "等#1行過濾項",
        semicolon: "；",
        notExistFilterItems: "行級權限：過濾項未設置",
        columnAuth: "列級權限：不可見字段有",
        fields: "等#1個字段",
        fullStop: "。",
        comma: "、",
        notExistUnviewableFields: "列級權限：所有字段可見",
        compareEqual: "等於",
        compareNotEqual: "不等於",
        compareGreater: "大於",
        compareGreaterEqual: "大於等於",
        compareLess: "小於",
        compareLessEqual: "小於等於",
        compareInclude: "包含",
        compareNotInclude: "不包含",
        compareStartWith: "開頭是",
        compareEndWith: "結尾是",
        compareNull: "為空",
        compareNotNull: "不為空",
        compareIn: "在#1之內",
        compareNotIn: "不在#1之內",
        logicAnd: "並且",
        logicOr: "或者",
        compareVariable: "匹配變量"
    });

})();