(function()
{
    var oMLS = com.kingdee.bos.qing.framework.common.MultilanguageManager;
    var oPackage = com.kingdee.bos.qing.ai.analysis;
    oMLS.registPackageResources(oPackage,
        {
            summaryInfo: "图表信息",
            insight: "洞察",
            translateChart: "切换图表",
            edit: "编辑",
            save: "保存",

            summaryXPrefixContent: "按照",
            summaryXMiddleContent: "的",
            summaryXSuffixContent: "字段分组",

            summaryYPrefixContent: "按照",
            summaryYMiddleContent: "的",
            summaryYSuffixContent: "字段计数",

            horizontal: "横轴",
            vertical: "纵轴",

            generateReport: "生成报告",
            refresh: "刷新",
            exit: "退出",

            subtitleIntroduction: "通过自然语言对话，即可轻松获得可视化分析",

            closeFooter: "取消",
            confirmFooter: "确认生成",

            previewChart: "图表预览",
            descriptionHeadline: "选择报告中文字说明风格",

            brief: "简要",
            detailed: "详细",
            nothing: "无",

            descriptionStyleTip: "选择“简要/详细”，GPT将根据简要/详细级别的洞察内容生成文字说明。选择“无”，报告中不展示图表对应的文字说明。",
            selectChartHeadline: "选择图表，右侧查看预览样式",

            loadingImg: "正在创建缩略图...",

            selectAll: "全部",
            alreadySelectedLeft: "（已选择",
            alreadySelectedRight: "项）",

            saveScheme: "保存方案",
            schemeNameCanNotNull: "请输入方案名称",
            schemeNameCanNotExceedLimit: "长度不能超过50个字符",
            schemeNameCanNotRepeat: "方案名称已存在",
            saveSuccess: "方案保存成功，可在当前业务主题的数据斗方中查看该分析方案。",
            setDataModelBeforeAnalysis: "该数据分析没有定义数据，请先进行数据准备",
            dataModeling: "数据准备",

			inputQuestionTips: "试着问我问题，我将根据您的问题，自动为您生成图表",
			answerTips: "AI生成的内容仅供参考，请结合您的经验使用",
            more: "更多",
			chartDesc: "“#1”的数据斗方已生成。",
            generateReportTip1: "生成报告中...",
            generateReportTip2: "共需处理 #1 张图表，正在处理第 1 张。",

            generateChartTips: "正在生成图表，请稍候...",
            generateChartError1: "对不起，我无法理解您的问题，请提供更具体的信息，或者您也可以按照以下方式提问：",
			generateChartError2: "抱歉，服务调用失败，请联系相关人员处理，或稍后重试。",
			generateChartError3: "服务调用异常，请稍后再试。",
			generateChartError4: "您选择的业务主题的字段过多，超过当前模型限制。请结合实际需求，简化数据表后重新进入。",
            gptTips: "苍穹GPT助手",

			sureExit: "直接退出",
			sureReturn: "返回对话",
			confirmExit: "是否直接退出？退出后已生成的图表不会被自动保存，建议您保存需要的图表后再退出。",

			userAgreementDetail: "隐私政策详情",
			userAgreementTips: "为了给您提供更好的服务，请先阅读并同意隐私政策。",
			privacy: "隐私",
			privacyAgreementTips: "同意隐私政策后方可使用",
            illegalGPTLicenseDialogTips: "当前系统没有【AI数据分析助手】模块的使用许可，无法使用智能数据分析功能，请与系统管理员联系。",
            noGPTLicenseDialogTips: "您所使用的账户没有被分配【AI数据分析助手】模块的使用许可，无法使用智能数据分析功能，请与系统管理员联系。",

            gptPromptLengthExceed: "非常抱歉，您想要分析的内容超出大模型输入token最大字数限制，无法为您生成推荐问题，请在数据准备中适当减少字段后重试。"
        });

	oPackage = com.kingdee.bos.qing.ai.analysis.model;
	oMLS.registPackageResources(oPackage,
		{
			comparativeAnalysis: "比较分析",
			proportionAnalysis: "占比分析",
			trendAnalysis: "趋势分析",
			indexAnalysis: "指标分析"
		});
})()