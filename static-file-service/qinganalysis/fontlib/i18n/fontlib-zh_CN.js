(function()
{
    var oMLS = com.kingdee.bos.qing.framework.common.MultilanguageManager;
    var oPackage = com.kingdee.bos.qing.fontlib.common;
    oMLS.registPackageResources(oPackage, {
            newFontBtn: "新建",
            deleteFontBtn: "删除",
            importBtn: "导入",
            exportBtn: "导出",
            refreshFontBtn: "刷新",
            saveFontBtn: "保存",
            searchBoxPlaceholder: "搜索字体编码/字体显示名称",
            closeTab: "退出",

            fontNotExist: "字体不存在，请刷新后重试。",

            noFont: "暂未创建字体，请点击新建按钮进行创建",
            noMatchingFont: "没有符合搜索条件的结果",
            editFont: "编辑字体 - ",
            newFont: "新建字体",
            deleteSuccess: "删除成功。",
            deleteFailure: "删除失败。",
            exportFailure: "导出失败。",
            noPermissionExportPresetFonts: "预置的字体无法导出。",
            noDeletePermission: "预置的字体无法删除。",
            saveSuccess: "保存成功。",
            refreshSuccess: "刷新成功。",
            fontNameAndDisplayNameDuplicated: "字体编码和字体显示名称已存在。",
            fontNameDuplicated: "字体编码已存在。",
            fontDisplayNameDuplicated: "字体显示名称已存在。",
            saveError: "保存字体失败。",
            addFontResourceSuccess: "添加字体来源成功。",
            deleteFontResourceSuccess: "删除字体来源成功。",
            fontInfoOutdated: "当前页面已失效，请刷新页面后重试。",

            creator: "创建人",
            createTime: "创建时间",
            modifier: "最后修改人",
            modifyTime: "最后修改时间",

            fontCode:"字体编码",
            fontDisplayName: "字体显示名称",
            basicInfo: "基本信息",
            fontResourcePrompt: "由于浏览器兼容性的问题，一个字体允许设置多个来源，优先使用优先级靠前的字体来源。",
            fontResource: "字体来源",

            localFont: "客户端本地字体",
            uploadFont: "上传字体文件",
            fontLink: "字体链接",
            presetFont: "系统预置",

            preset: "预置",

            name: "字体名称",
            attachment: "字体文件",
            link: "URL",

            moveUp: "上移",
            moveDown: "下移",
            edit: "编辑",
            delete: "删除",

            newFontResource: "添加字体来源",
            deleteFontResourcePrompt: "所选字体来源删除后无法恢复，确定删除该字体来源吗？",
            deleteFontPrompt: "所选字体删除后无法恢复，确定删除该字体吗？",

            noFontResource: "暂无字体来源",

            priority: "优先级",
            sourceType: "来源方式",
            sourceDetail: "来源详情",
            operation: "操作",

            addFontResource: "添加字体来源",
            editFontResource: "编辑字体来源",
            fontResourceNameType: "此处的名称是指本地计算机上已安装字体的名称。",
            fontResourceLinkType: "此处的URL是指字体的远程存储地址，通过该链接可以获取字体文件。",

            fileTypeIncorrect: "文件类型不正确，请重新上传。",
            uploadFileIsNull: "上传的文件为空，请重新上传。",
            fileTooLarge: "文件太大，请重新上传。",

            fontNameOverLength: "字体编码不能超过50个字符。",
            displayNameOverLength: "字体显示名称不能超过50个字符。",
            illegalFontName: "字体编码必须以字母开头，只能包含字母、数字、下划线。",
            illegalFontDisplayName: "字体显示名称不允许包含特殊字符。",
            illegalFontLocalName: "客户端本地字体名称不能包含单引号、双引号。",
            illegalFontLinkName: "网络链接不能包含单引号、双引号。",
            noFoundFontCodingAndDisplayName: "请输入字体编码和字体显示名称。",
            noFoundFontCoding: "请输入字体编码。",
            noFoundDisplayName: "请输入字体显示名称。",
            noFoundFontResource: "请添加字体来源。",
            fontInfoNoExist: "字体不存在或已被删除。",

            fileUploading: "文件正在上传中，请稍后再试。",
            uploading: "正在上传中，请稍后。",
            uploadFailed: "上传失败。",

            uploadFile: "上传文件",
            uploadFileTip: "支持ttf、ttc、otf、woff、woff2文件。",
            fileDuplicated: "字体来源已存在。",

            uploadAttachment: "请上传附件。",
            inputName: "请输入名称。",
            inputURL: "请输入URL。",

            previewCss: "预览CSS",
            noPermission: "您的菜单权限已发生变更，无法继续操作。",
            importFileIsNull: "上传的文件为空，请重新上传。",
            exportFonts: "导入字体",
            noFontSelected: "请至少选择一个字体。",
            noFoundImportFont: "所选文件中未发现可导入的字体信息。",
            noFoundUploadFile: "上传文件失败。",
            parseImportFileError: "导入字体文件解析异常。",
            saveFontFileFailure: "保存字体文件失败。",
            updateDynamicFileFailure: "更新静态文件失败。",
            importFontsFailed: "导入字体失败。",
            importFontsSuccessSimple: "导入成功。",
            importFontsSuccessComplex: "导入成功，与预置字体编码冲突的字体已进行重命名操作。",
            importResultTips: "成功导入#1个字体，以下字体编码冲突，请处理。",
            importResultTips2: "成功导入#1个字体，以下字体编码冲突，请处理。",
            ignoreAllBtn: "全部忽略",
            overwriteAllBtn: "全部覆盖",
            renameAllBtn: "全部重命名",
            ignoreBtn: "忽略",
            overwriteBtn: "覆盖",
            renameBtn: "重命名",
            fontDisplay: "字体显示名称",
            handleType: "处理策略",
            handleConflictFontsFailed: "处理失败。",
            other: "other"
    })
})()