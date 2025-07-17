(function () {
    var oManager = com.kingdee.bos.qing.framework.common.MultilanguageManager;
    var oPackage = com.kingdee.bos.qing.analysiscenter;
    oManager.registPackageResources(oPackage,
        {
            emptyTips: "暫無發佈記錄。",
            qingAnalysisCenter: "數據工作台閱覽夾",

            failToLoadPublishInfo: "獲取發布數據失敗",
            publishInfoNotFind: "該菜單不存在或已被刪除",
            publishedDsbNotFind: "該菜單對應的儀表板數據不存在或已被刪除",
            noPermission: "您沒有權限訪問該菜單",
            publishedThemeNotFind: "該菜單對應的業務主題不存在或已被刪除",
            publishedDsbNotFind: "該菜單對應的儀表板不存在或已被刪除",
            openTips: "請點擊左側菜單進行查看",
            enterSearchPublishName: "搜索發布名稱",
            nothingSearched: "沒有符合搜索條件的結果",
            preset: "預置",
            currentFirstDirectoryCannotMoveUp: "同層級第一個目錄或發佈記錄不支持上移。",
            menuCannotMoveUpToDirectory: "同層級發佈記錄不支持移動到目錄上方。",
            cannotBeMovedToAnnotherLevel: "非同層級目錄或發佈記錄不支持移動。",
            pleaseSelectedDirectory: "請先選中具體的木目錄。",
            currentLastDirectoryCannotMoveDown: "同層級最後一個目錄或發佈記錄不支持下移。",
            directoryCannotMoveDownToMenu: "同層級目錄不支持移動至發佈記錄下方。",
            maxTabCountError: "頁簽最多可同時打開10個，請關閉部分頁簽后再試",

            confirmExit: "“#1” 檢測到您有更改內容，是否不保存直接退出？若不保存，將丟失這些更改。",
            sureExit: "直接退出",
            sureReturn: "返回編輯",

            moveUp: "上移",
            moveDown: "下移",
            manualSort: "手工排序",
            retract: "收起",
            spread: "展開",
            refresh: "刷新",
            search: "搜索",
            confirmOK: "確定",
            cancle: "取消"
        });
})();