(function ()
{
	var oManager = com.kingdee.bos.qing.framework.common.MultilanguageManager;
	var oPackage = com.kingdee.bos.qing.workbench;
	oManager.registPackageResources(oPackage,
		{
			myDirectory: "閱覽夾",
			myCard: "卡片庫",
			myMetric: "指標庫",
			myMenu: "菜單項",
			//工作台方案相关
			mySchema: "我創建的",
			sharedSchema: "他人共享的",
			createSchema: "新建工作台",
			newWorkbenchSchema: "新建工作台",
			newWorkbenchSchemaName: "工作台名稱",
			defaultWorkbenchName: "我的工作台",
			deleteWorkbench: "刪除工作台",
			deleteWorkbenchTip: "無法刪除，默認需要保留一個工作台。",
			workbenchIsBlank: "請輸入工作台名稱。",
			workbenchNameDuplicate: "工作台名稱已存在。",
			createWorkbenchSuccess: "新建工作台成功。",
			setDefaultWorkbench: "設為默認工作台",
			cancelDefaultWorkbench: "取消設為默认工作台",
			setDefaultWorkbenchWarning: "工作台\"#1\"已經固定在頁簽欄中，不能設為默認工作台。",
			deleteWorkbenchWarning: "確定要刪除工作台\"#1\"嗎？",
			deleteWorkbenchPinWarning: "工作台\"#1\"已經在頁簽欄中固定，確認刪除該工作台嗎？",
			defaultWorkbenchPinWarning: "工作台\"#1\"為默認工作台，不能固定在頁簽欄中。",
			modifyWorkbenchName: "修改工作台名稱",
			workbenchNumLimit: "當前工作台數量已達到最大限制，不能新建更多的工作台",
			delete: "刪除",
			modifyWorkbenchLongerWidget: "編輯數據分析：#1",
			modifyWorkbenchSquareWidget: "編輯數據斗方：#1",
			switchScheme: "選擇分析方案",
			setDefaultOpenSchema: "下次以該方案打開",
			openNewTab: "在新頁簽打開",
			modifyWBNameSuc: "修改工作台名稱成功。",
			publishContent: "發佈內容",
			nothingSearched: "沒有符合搜索條件的結果",
			emptyTips: "暫無發佈記錄",
			appMenuHasBeenDeleted: "該應用菜單已被刪除",
			preset: "預置",
			presetContent: "預置內容",
			backgroundTips: "從左側拖入數據內容，開始使用數據工作台吧！",
			setDefaultWorkbenchSuc: "設置默認工作台成功。",
			cancelDefaultWorkbenchSuc: "取消設為默認工作台成功。",
			alreadyBeenOpenedInCurTab: "工作台 \"#1\" 已經在當前頁簽中打開。",
			alreadyBeenOpenedInRightTab: "工作台 \"#1\" 已經在右側頁簽中打開。",
			closeInCurTabBeforeDelete: "工作台 \"#1\" 已經在當前頁簽中打開，請關閉後再刪除。",
			searchPublishName: "搜索發佈內容的名稱",
			//GPT助手相关
			close: "關閉",
			noGPTLicenseTips: "獲得【AI數據分析助手】模塊的使用許可後方可使用",
			illegalGPTLicenseDialogTips: "當前系統沒有【AI數據分析助手】模塊的使用許可，無法使用智能數據分析功能，請與系統管理員聯繫。",
			noGPTLicenseDialogTips: "您所使用的賬戶沒有被分配【AI數據分析助手】模塊的使用許可，無法使用智能數據分析功能，請與系統管理員聯繫。",
			assistantNewDialog: "新對話",
			assistantHistoryDialog: "歷史對話",
			assistantPin: "固定至當前工作台",
			assistantUnpin: "取消固定",
			assistantExpand: "最大化",
			assistantContract: "還原",
			assistantClose: "關閉",
			assistantSend: "發送",
			assistantDropTips: "拖入對話區域即可進行分析",
			privacyTips: "AI生成的內容僅供參考，請結合您的經驗使用",
			privacyText: "隱私",
			privacyPlaceholder: "同意隱私政策後方可使用",
			userAgreementDetail: "隱私政策詳情",
			userAgreementTips: "為了給您提供更好的服務，請先閱讀并同意隱私政策。",
			assistantPanelTitle: "AI數據分析助手",
			assistantPlaceholder: "試着問我問題，我將根據您的問題分析相關數據內容",
			assistantAnswerRecordUserName: "蒼穹",
			byPublisher: "按發佈人",
			byDirectory: "按目錄",
			all: "全部",
			intelligentDataAnalysis: "智能數據分析",
			guideTips: "您可以從左側樹形菜單、當前工作台中拖動想要分析的內容至對話窗口，讓我幫你分析。",
			questionTips: "在當前工作台中，您可能關注以下問題：",
			guideWaitTips: "推薦問題生成中",
			confirmToDelete: "確定刪除#1 “#2” 吗?",
			expand: "展開",
			collapse: "收起",
			search: "搜索",
			refresh: "刷新",
			inputSchemaName: "搜索方案名稱",
			def: "(默认)",
			systemSchema: "系統方案",
			openSquareFailedTip: "數據斗方不能直接打開頁簽，您可以拖動該數據斗方到工作台中查看。",
			// generateChartError1: "抱歉，我的本職工作是幫您進行數據分析，暫時無法回答其他問題。如果您有任何與數據分析相關的問題或需求，歡迎隨時告訴我，我會盡力幫助您。",
			// generateChartError2: "服務器開了個小差，稍後再試試看。",
			// promptTokenTooLong: "非常抱歉，您想要分析的內容超出大模型輸入token最大字數限制，我無法幫您分析，您可以嘗試：\n" +
			// 	                "1、拖入想要分析數據內容至對話區域進行分析；\n" +
			// 	                "2、減少當前工作台數據內容中需要分析的字段數量；\n" +
			// 	                "3、聯繫系統管理員升級或更換大模型。",
			contentLoading: "內容加載中",
			loadSchemaError: "缺少生成圖表所需要的字段，建議您更換一下提問方式。",
			workbenchChartPaneDesc: "這是我針對“#1”#2生成的分析內容。",
			workbenchChartPaneWithSourceDesc: "以下是我為您推薦的幾個問題，或許能幫助您更好地分析“#1”#2：",
			workbenchChartPaneWithoutSourceDesc: "很抱歉，目前我還無法分析#1。您可以嘗試拖動其他類型的數據內容讓我分析。",
			addWorkBench: "添加至工作台",
			summaryInfo: "圖表信息",
			translateChart: "切換圖表",
			edit: "編輯",
			insight: "洞察與見解",
			youCanAsk: "您還可以問",
			widgetTypeSquare: "數據斗方",
			widgetTypeLonger: "數據分析",
			widgetTypeDashboard: "儀錶板",
			widgetTypeQingReport: "輕報表",
			widgetTypeMetrics: "指標",
			questionRecordContent: "請幫我分析“#1”#2。",
			this1: "這張",
			this2: "這個",
			notFindDataContent: "非常抱歉，我沒有在當前工作台內找到相關的數據內容。你可以嘗試將想要分析的數據內容拖入對話區域進行分析。",
			useCardAnalyze: "使用\"#1\"卡片進行分析。",
			dataContentNotExist: "非常抱歉，當前工作台內不存在您選擇的數據內容。你可以嘗試將想要分析的數據內容拖入對話區域進行分析。",
			findDataContent: "我在當前工作台內找到以下相關數據內容，您想要分析哪一個?",
			changeBatch: "换一批",
			changeCurrentCard: "看起來您的問題可能與其他數據內容有關，您可以選擇更換當前分析的卡片：",
			Square: "數據斗方",
			LongPainting: "數據分析",
			Dashboard: "儀錶板",
			QingReport: "報表",
			Metrics: "指標",
			nameTooLong: "名稱长度不能超過50個字符。",
			modifyCardTitle: "修改卡片名稱",
			cardName: "卡片名稱",
			cardNameIsBlank: "卡片名稱不能為空。",
			operationTips: "操作提醒",
			cosmicComingTips: "智能分析助手即將上線，敬請期待！",
			unSupportCosmicTips: "當前頁簽暫不支持“Cosmic 智能數據分析”功能，請前往“工作台”類型的頁簽中使用",
			modifyCardNameSuc: "修改卡片名稱成功。",
			workbenchIframeDragHintTitle: "提示",
			workbenchIframeDragHintText: "當前打開的頁簽不是工作台頁簽，無法將左側內容拖拽到當前頁簽",
			unknownException: "發生了未知錯誤",
			deleteSuccess: "删除成功。",
			// gpt 助手错误提示
			gptUserInputError: "抱歉，我的本職工作是幫您進行數據分析，暫時無法回答其他問題。如果您有任何與數據分析相關的問題或需求，歡迎隨時告訴我，我會盡力幫助您。",
			gptPromptIdNotFound: "抱歉，大模型配置有誤，無法為您推薦問題。",
			gptPromptServiceError: "服務器開了個小差，稍後再試試看。",
			gptPromptLengthExceed: "非常抱歉，您想要分析的內容超出大模型輸入token最大字數限制，我無法幫您分析，您可以嘗試拖入想要分析的數據內容至對話區域進行分析。",
			gptCheckPermissionError: "抱歉，您沒有該卡片的查看權限，無法為您推薦問題",
			gptGetRefMapDefaultError: "抱歉，獲取該數據內容時出錯，您可以換個數據內容分析。",
			gptLoadSingleCardRecommendQuestionSuffix: "無法為您推薦問題。",
			gptLoadSingleCardRecommendQuestionDefaultError1: "抱歉，推薦問題生產失敗，您可以換個數據內容分析。",
			gptLoadSingleCardRecommendQuestionDefaultError2: "推薦問題生成失敗。",
			gptLoadViewSuffix: "無法為您生成圖表。",
			gptLoadViewDefaultError: "抱歉，生成圖表失敗。您可以嘗試換個問法或稍後重試。",
			gptLoadViewGenerateError: "抱歉，大模型生成錯誤，您可以嘗試換個問法或稍後重試。",
			gptLoadMatchedCardSuffix: "無法為您匹配輸入問題。",
			gptLoadMatchedCardDefaultError: "抱歉，匹配輸入的問題失敗，您可以嘗試換個問法或稍後重試。",
			gptDataSourceThemeNotFoundError: "抱歉，對應主題不存在或已被刪除。",
			gptDataSourceSubjectModelNotDefinedError: "抱歉，對應主題沒有定義數據。",
			gptDataSourcePublishTargetNotFoundError: "抱歉，該組件來源已被刪除。",
			gptDataSourceRptNoDataSetError: "抱歉，對應輕報表沒有引用數據集。",
			gptDataSourceRptNoReportError: "抱歉，對應輕報表不存在或已被刪除。",
			switchSchemaPrompt: "當前顯示的方案為修改後的個性化方案，切換後該方案將不會保存。確認要切換方案嗎？"
		});

	var oPackage = com.kingdee.bos.qing.workbench.model;
	oManager.registPackageResources(oPackage,
		{
			myQingCenter: "我的輕分析"
		});
})();