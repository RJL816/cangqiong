(function()
{
    var oMLS = com.kingdee.bos.qing.framework.common.MultilanguageManager;
    var oPackage = com.kingdee.bos.qing.ai.analysis;
    oMLS.registPackageResources(oPackage,
        {
			summaryInfo: "圖表信息",
			insight: "洞察",
			translateChart: "切換圖表",
			edit: "編輯",
			save: "保存",

            summaryXPrefixContent: "按照",
            summaryXMiddleContent: "的",
            summaryXSuffixContent: "字段分組",

            summaryYPrefixContent: "按照",
            summaryYMiddleContent: "的",
            summaryYSuffixContent: "字段計數",

            horizontal: "橫軸",
            vertical: "縱軸",

            generateReport: "生成報告",
            refresh: "刷新",
            exit: "退出",

            subtitleIntroduction: "通過自然語言對話，即可輕鬆獲得可視化分析",

            closeFooter: "取消",
            confirmFooter: "確認生成",

            previewChart: "圖表預覽",
            descriptionHeadline: "選擇報告中文字説明風格",

            brief: "簡要",
            detailed: "詳細",
            nothing: "無",

            descriptionStyleTip: "選擇“簡要/詳細”，GPT將根據簡要/詳細級別的洞察内容生成文字説明。選擇“無”，報告中不展示圖表對應的文字説明。",
            selectChartHeadline: "選擇圖表，右側查看預覽樣式",

            loadingImg: "正在創建縮略圖...",

            selectAll: "全部",
            alreadySelectedLeft: "（已選擇",
            alreadySelectedRight: "項）",

            saveScheme: "保存方案",
            schemeNameCanNotNull: "請輸入方案名稱",
            schemeNameCanNotExceedLimit: "長度不能超過50個字符",
            schemeNameCanNotRepeat: "方案名稱已存在",
            saveSuccess: "方案保存成功，可在當前業務主題的數據斗方中查看該分析方案",
            setDataModelBeforeAnalysis: "該數據分析沒有定義數據，請先進行數據準備",
            dataModeling: "數據準備",

			inputQuestionTips: "試著問我問題，我將根據您的問題，自動為您生成圖表",
			answerTips: "AI生成的內容僅供參考，請結合您的經驗使用",
			more: "更多",
			chartDesc: "「#1」的數據鬥方已生成。",
			generateReportTip1: "生成報告中...",
			generateReportTip2: "共需處理 #1 張圖表，正在處理第 1 張。",

			generateChartTips: "正在生成圖表，請稍候...",
			generateChartError1: "對不起，我無法理解您的問題，請提供更具體的信息，或者您也可以按照以下方式提問：",
			generateChartError2: "抱歉，服務調用失敗，請聯系相關人員處理，或稍後重試。",
			generateChartError3: "服務調用異常，請稍後再試。",
			generateChartError4: "您選擇的業務主題的字段過多，超過當前模型限製。請結合實際需求，簡化數據表後重新進入。",
			gptTips: "蒼穹GPT助手",

			sureExit: "直接退出",
			sureReturn: "返回對話",
			confirmExit: "是否直接退出？退出後已生成的圖表不會被自動保存，建議您保存需要的圖表後再退出。",

			userAgreementDetail: "隱私政策詳情",
			userAgreementTips: "為了給您提供更好的服務，請先閱讀并同意隱私政策。",
			privacy: "隱私",
			privacyAgreementTips: "同意隱私政策后方可使用",
            illegalGPTLicenseDialogTips: "當前系統沒有【AI數據分析助手】模塊的使用許可，無法使用智能數據分析功能，請與系統管理員聯繫。",
            noGPTLicenseDialogTips: "您所使用的賬戶沒有被分配【AI數據分析助手】模塊的使用許可，無法使用智能數據分析功能，請與系統管理員聯繫。",

            gptPromptLengthExceed: "非常抱歉，您想要分析的內容超出大模型輸入token最大字數限制，無法為您生成推薦問題。請在數據準備中適當減少字段後重試。"
        });

	oPackage = com.kingdee.bos.qing.ai.analysis.model;
	oMLS.registPackageResources(oPackage,
		{
			comparativeAnalysis: "比較分析",
			proportionAnalysis: "佔比分析",
			trendAnalysis: "趨勢分析",
			indexAnalysis: "指標分析"
		});
})()