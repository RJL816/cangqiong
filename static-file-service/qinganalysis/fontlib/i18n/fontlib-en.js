(function()
{
    var oMLS = com.kingdee.bos.qing.framework.common.MultilanguageManager;
    var oPackage = com.kingdee.bos.qing.fontlib.common;
    oMLS.registPackageResources(oPackage, {
            newFontBtn: "New",
            deleteFontBtn: "Delete",
            importBtn: "Import",
            exportBtn: "Export",
            refreshFontBtn: "Refresh",
            saveFontBtn: "Save",
            searchBoxPlaceholder: "Search for font code/font display name",
            closeTab: "Exit",

            fontNotExist: "The font does not exist. Please refresh and try again.",

            noFont: "Please click the [New] button in the toolbar to create a new font",
            noMatchingFont: "No results match the search criteria",
            editFont: "Edit font - ",
            newFont: "New font",
            deleteSuccess: "Successfully delete.",
            deleteFailure: "Fail to delete.",
            exportFailure: "Export failure.",
            noPermissionExportPresetFonts: "Preset fonts cannot be exported.",
            noDeletePermission: "Preset fonts cannot be deleted.",
            saveSuccess: "Save successfully.",
            refreshSuccess: "Refresh successfully.",
            fontNameAndDisplayNameDuplicated: "The font code and font display name already exist.",
            fontNameDuplicated: "The font code already exist.",
            fontDisplayNameDuplicated: "The font display name already exist.",
            saveError: "Failed to save font.",
            addFontResourceSuccess: "Adding the font source succeeded.",
            deleteFontResourceSuccess: "Deleting the font source succeeded. ",
            fontInfoOutdated: "The current page is invalid. Please refresh the page and try again.",


            creator: "creator",
            createTime: "creation time",
            modifier: "modifier",
            modifyTime: "modification time",

            fontCode:"Font code",
            fontDisplayName: "Font display name",
            basicInfo: "Basic information",
            fontResourcePrompt: "Due to browser compatibility issues, a font can be set to multiple sources, and the font source with the highest priority is used.",
            fontResource: "Font source",

            localFont: "Client local font",
            uploadFont: "Upload font file",
            fontLink: "Network linking",
            presetFont: "System initialization",

            preset: "Preset",

            name: "font name",
            attachment: "Font file",
            link: "URL",

            moveUp: "Up",
            moveDown: "Down",
            edit: "Edit",
            delete: "Delete",

            newFontResource: "Add source",
            deleteFontResourcePrompt: "The selected font source cannot be recovered after deletion. Are you sure to delete the font source?",
            deleteFontPrompt: "The selected font cannot be recovered after deletion. Are you sure to delete the font?",

            noFontResource: "No font source is available",

            priority: "Priority",
            sourceType: "Source mode",
            sourceDetail: "Source details",
            operation: "Operation",

            addFontResource: "Add font source",
            editFontResource: "Edit font source",
            fontResourceNameType: "The name here refers to the name of the font installed on the local computer.",
            fontResourceLinkType: "The URL here refers to the remote storage address of the font, through which the font file can be obtained.",

            fileTypeIncorrect: "File type incorrect, please upload it again.",
            uploadFileIsNull: "The uploaded file is empty. Please upload it again.",
            fileTooLarge: "The file is too large, please upload it again.",

            fontNameOverLength: "The font code cannot exceed 50 characters.",
            displayNameOverLength: "The font display name cannot exceed 50 characters",
            illegalFontName: "The font code must start with a letter and contains alphanumeric or underscores.",
            illegalFontDisplayName: "The font display name cannot contain special characters.",
            illegalFontLocalName: "The local font name of the client cannot contain single quotation marks or double quotation marks.",
            illegalFontLinkName: "Network links cannot contain single quotation marks or double quotation marks.",
            noFoundFontCodingAndDisplayName:  "Please enter the font code and font display name.",
            noFoundFontCoding: "Please enter the font code.",
            noFoundDisplayName: "Please enter the font to display the name.",
            noFoundFontResource: "Please add font source.",
            fontInfoNoExist: "The font does not exist or has been deleted.",

            fileUploading: "The file is uploading, please try again later.",
            uploading: "Uploading, please hold on.",
            uploadFailed: "Fail to upload.",

            uploadFile: "Upload file",
            uploadFileTip: "Supports ttf, ttc, otf, woff, and woff2 files.",
            fileDuplicated: "The font source already exists.",

            uploadAttachment: "Please upload the attachment.",
            inputName: "Please enter the name.",
            inputURL: "please enter the URL.",

            previewCss: "Preview CSS",

            noPermission: "Your menu permissions have changed and you cannot continue.",


            importFileIsNull: "The uploaded file is empty. Please upload it again.",
            exportFonts: "Import font",
            noFontSelected: "Please select at least one font.",
            noFoundImportFont: "No font information available for import was found in the selected file.",
            parseImportFileError: "Parsing the imported font file is abnormal.",
            noFoundUploadFile: "Failed to upload the file.",
            saveFontFileFailure: "Failed to save the font file.",
            updateDynamicFileFailure: "Failed to update the static file.",
            importFontsFailed: "Failed to import font.",
            importFontsSuccessSimple: "Import successfully.",
            importFontsSuccessComplex: "Import successfully. The fonts that conflict with the preset font code have been renamed.",
            importResultTips: "#1 fonts are imported successfully. If the following font codes conflict, rectify the fault.",
            importResultTips2: "#1 font is imported successfully. If the following font codes conflict, rectify the fault.",
            ignoreAllBtn: "All ignore",
            overwriteAllBtn: "Full coverage",
            renameAllBtn: "All Rename",
            ignoreBtn: "Ignore",
            overwriteBtn: "Coverage",
            renameBtn: "Rename",
            fontDisplay: "Font display name",
            handleType: "Treatment strategy",
            handleConflictFontsFailed: "Processing failure.",
            other: "other"
    })
})()