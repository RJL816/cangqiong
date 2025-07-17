(function()
{
    var oMLS = com.kingdee.bos.qing.framework.common.MultilanguageManager;
    var oPackage = com.kingdee.bos.qing.fontlib.common;
    oMLS.registPackageResources(oPackage, {
            newFontBtn: "新建",
            deleteFontBtn: "刪除",
            importBtn: "導入",
            exportBtn: "導出",
            refreshFontBtn: "刷新",
            saveFontBtn: "保存",
            searchBoxPlaceholder: "搜索字體編碼/字體顯示名稱",
            closeTab: "退出",

            fontNotExist: "字體不存在，請刷新后重試。",

            noFont: "請點擊工具欄【新建】按鈕，新建字體",
            noMatchingFont: "沒有符合搜索條件的結果",
            editFont: "編輯字體 - ",
            newFont: "新建字體",
            deleteSuccess: "刪除成功。",
            deleteFailure: "刪除失敗。",
            exportFailure: "導出失敗。",
            noPermissionExportPresetFonts: "預置的字體無法導出。",
            noDeletePermission: "預置的字體無法刪除。",
            saveSuccess: "保存成功。",
            refreshSuccess: "刷新成功。",
            fontNameAndDisplayNameDuplicated: "字體編碼和字體顯示名稱已存在。",
            fontNameDuplicated: "字體編碼已存在。",
            fontDisplayNameDuplicated: "字體顯示名稱已存在。",
            saveError: "保存字體失敗。",
            addFontResourceSuccess: "添加字體來源成功。",
            deleteFontResourceSuccess: "刪除字體來源成功。",
            fontInfoOutdated: "當前頁面已失效，請刷新頁面后重試。",

            creator: "創建人",
            createTime: "創建時間",
            modifier: "最後修改人",
            modifyTime: "最後修改時間",

            fontCode:"字體編碼",
            fontDisplayName: "字體顯示名稱",
            basicInfo: "基本信息",
            fontResourcePrompt: "由於瀏覽器兼容性的問題，一個字體允許設置多個來源，優先使用優先級靠前的字體來源。",
            fontResource: "字體來源",

            localFont: "客户端本地字體",
            uploadFont: "上傳字體文件",
            fontLink: "網絡鏈接",
            presetFont: "系統預置",

            preset: "預置",

            name: "字體名稱",
            attachment: "字體文件",
            link: "URL",

            moveUp: "上移",
            moveDown: "下移",
            edit: "編輯",
            delete: "刪除",

            newFontResource: "添加字體來源",
            deleteFontResourcePrompt: "所選字體來源刪除后無法恢復，確定刪除該字體來源嗎？",
            deleteFontPrompt: "所選字體刪除后無法恢復，確定刪除該字體嗎？",

            noFontResource: "暫無字體來源",

            priority: "優先級",
            sourceType: "來源方式",
            sourceDetail: "來源詳情",
            operation: "操作",

            addFontResource: "添加字體來源",
            editFontResource: "編輯字體來源",
            fontResourceNameType: "此處的名稱是指本地計算機上已安裝字體的名稱。",
            fontResourceLinkType: "此處的URL是指字體的遠程存儲地址，通過該鏈接可以獲取字體文件。",

            fileTypeIncorrect: "文件類型不正確，請重新上傳。",
            uploadFileIsNull: "上傳的文件為空，請重新上傳。",
            fileTooLarge: "文件太大，請重新上傳。",

            fontNameOverLength: "字體編碼不能超過50個字符。",
            displayNameOverLength: "字體顯示名稱不能超過50個字符。",
            illegalFontName: "字體編碼必須以字母開頭，只能包含字母、數字、下劃線。",
            illegalFontDisplayName: "字體顯示名稱不允許包含特殊字符。",
            illegalFontLocalName: "客戶端本地字體不能包含單引號、雙引號。",
            illegalFontLinkName: "網絡鏈接不能包含單引號、雙引號。",
            noFoundFontCodingAndDisplayName: "字體編碼必須以字母開頭，只能包含字母、數字、下劃綫。",
            noFoundFontCoding: "請輸入字體編碼",
            noFoundDisplayName: "請輸入字體顯示名稱",
            noFoundFontResource: "請添加字體來源",
            fontInfoNoExist: "字體不存在或已被刪除。",

            fileUploading: "文件正在上傳中，請稍後重試。",
            uploading: "正在上傳中，請稍后。",
            uploadFailed: "上傳失敗。",

            uploadFile: "上傳文件",
            uploadFileTip: "支持ttf、ttc、otf、woff、woff2文件。",
            fileDuplicated: "字體來源已存在。",

            uploadAttachment: "請上傳附件。",
            inputName: "請輸入名稱。",
            inputURL: "請輸入URL。",

            previewCss: "預覽CSS",
            noPermission: "您的菜單權限已發生變更，無法繼續操作。",

            importFileIsNull: "上傳的文件爲空，請重新上傳。",
            exportFonts: "導入字體",
            noFontSelected: "請至少選擇一個字體。",
            noFoundImportFont: "所選文件中未發現可導入的字體信息。",
            noFoundUploadFile: "上傳文件失敗。",
            parseImportFileError: "導入字體文件解析異常。",
            saveFontFileFailure: "保存字體文件失敗。",
            updateDynamicFileFailure: "更新靜態文件失敗。",
            importFontsFailed: "导入字体失败。",
            importFontsSuccessSimple: "導入成功。",
            importFontsSuccessComplex: "導入成功，與預置字體編碼衝突的字體已進行重命名操作。",
            importResultTips: "成功導入#1個字體，以下字體編碼衝突，請處理。",
            importResultTips2: "成功導入#1個字體，以下字體編碼衝突，請處理。",
            ignoreAllBtn: "全部忽略",
            overwriteAllBtn: "  全部覆蓋",
            renameAllBtn: "全部重命名",
            ignoreBtn: "忽略",
            overwriteBtn: "覆蓋",
            renameBtn: "重命名",
            fontDisplay: "字體顯示名稱",
            handleType: "處理策略",
            handleConflictFontsFailed: "處理失敗。",
            other: "other"
    })
})()