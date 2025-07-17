(function()
{
    var oMLS = com.kingdee.bos.qing.framework.common.MultilanguageManager;
    var oPackage = com.kingdee.bos.qing.ai.analysis;
    oMLS.registPackageResources(oPackage,
        {
			summaryInfo: "Chart info",
			insight: "Insight",
			translateChart: "Translate chart",
			edit: "Edit",
			save: "Save",

            summaryXPrefixContent: "Group by field",
            summaryXMiddleContent: "of",
            summaryXSuffixContent: "",

            summaryYPrefixContent: "Count by field",
            summaryYMiddleContent: "of",
            summaryYSuffixContent: "",

            horizontal: "Horizontal axis",
            vertical: "Vertical axis",

            generateReport: "Generate report",
            refresh: "Refresh",
            exit: "Exit",

            subtitleIntroduction: "Visual analysis is easy to obtain through natural language dialogue",

            closeFooter: "Cancel",
            confirmFooter: "Confirm generation",

            previewChart: "Chart preview",
            descriptionHeadline: "Select the text description style",

            brief: "brief",
            detailed: "detailed",
            nothing: "nothing",

            descriptionStyleTip: "Select \"Brief/Detailed\" and GPT will generate a text description based on the insight content at the brief/detailed level. If you select None, the chart description is not displayed in the report.",
            selectChartHeadline: "Select the chart and view the preview",

            loadingImg: "Creating thumbnails...",

            selectAll: "All",
            alreadySelectedLeft: "(Selected",
            alreadySelectedRight: "items)",

            saveScheme: "Preservation scheme",
            schemeNameCanNotNull: "Please enter a scheme name",
            schemeNameCanNotExceedLimit: "The length cannot exceed 50 characters",
            schemeNameCanNotRepeat: "The solution name already exists",
            saveSuccess: "The solution is saved successfully, and the analysis solution can be viewed in the data cube of the current business topic.",
            setDataModelBeforeAnalysis: "No data is defined in this data analysis. Prepare the data first",
            dataModeling: "Data preparation",

			inputQuestionTips: "Try to ask me a question and I will automatically generate a graph for you based on your question ",
			answerTips: "The AI-generated content is for reference only, please use it with your experience ",
			more: "More",
			chartDesc: "Data square for #1 has been generated." ,
            generateReportTip1: "Generate report..." ,
            generateReportTip2: "A total of #1 charts need to be processed, and the first is being processed." ,

            generateChartTips: "Generating chart, please wait..." ,
            generateChartError1: "Sorry, I cannot understand your question, please provide more specific information, or you can also ask in the following way: ",
            generateChartError2: "Sorry, the service call failed, please contact the relevant person for processing, or try again later." ,
            generateChartError3: "Service call exception, please try again later." ,
			generateChartError4: "The business topic you selected has too many fields beyond the current model limit. Simplify the data table based on actual requirements and re-enter.",
            gptTips: "Cosmic GPT Assistant",

			sureExit: "Exit",
			sureReturn: "Return",
			confirmExit: "Change detected, do you want to exit without saving?",

			userAgreementDetail: "Privacy detail",
			userAgreementTips: "In order to provide you with better service, please read and agree to the privacy policy first.",
			privacy: "Privacy",
			privacyAgreementTips: "Use only if you agree to the privacy policy",
            illegalGPTLicenseDialogTips: "The current system does not have the license to use the [AI Qing Analysis Assistant] module, and hence the intelligent data analysis feature cannot be used. Please contact the administrator.",
            noGPTLicenseDialogTips: "You don't have a license assigned for Module [AI Qing Analysis Assistant], and hence the intelligent data analysis feature cannot be used. Please contact the administrator.",

            gptPromptLengthExceed: "Sorry, the content you want to analyze exceeds the maximum word limit of the input token for the large language model. I am unable to help you recommend questions. please reduce the selected fields of the theme."        });

	oPackage = com.kingdee.bos.qing.ai.analysis.model;
	oMLS.registPackageResources(oPackage,
		{
			comparativeAnalysis: "Comparative Analysis",
			proportionAnalysis: "Proportion Analysis",
			trendAnalysis: "Trend Analysis",
			indexAnalysis: "Index Analysis"
		});
})()