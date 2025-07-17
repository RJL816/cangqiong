(function()
{
	if(typeof(com) == "undefined") com = {};
	if(typeof(com.kingdee) == "undefined") com.kingdee = {};
	if(typeof(com.kingdee.bos) == "undefined") com.kingdee.bos = {};
	if(typeof(com.kingdee.bos.qing) == "undefined") com.kingdee.bos.qing = {};
	if(typeof(com.kingdee.bos.qing.workbench) == "undefined") com.kingdee.bos.qing.workbench = {};

	var NS = com.kingdee.bos.qing.workbench;

	NS.MyIcons = new (function()
	{
		com.kingdee.bos.qing.framework.common.AbstractIcons.call(this);
		var _super = this.protectedMethod;
		
		this.protectedInit = function(mapComboIcons, oIconsFile)
		{
			oIconsFile.setFilePath("workbench/skin/ierp/res/workbench-sprite.png");
			oIconsFile.setGap(1);
			oIconsFile.setStartPosition(1, 1);

			oIconsFile.setIconSize(17, 17);
			regist(1, 0, "icon_dir_open");
			regist(0, 1, "icon_dir_close_on");
			regist(1, 1, "icon_dir_close");
			regist(1, 0, "icon_dir_open_on");
			regist(2, 1, "icon_copy");
			// regist(2, 3, "icon_schema_list");

			oIconsFile.setStartPosition(0,106);
			oIconsFile.setIconSize(16, 16);
			oIconsFile.setGap(1, 1);
			regist(0, 0, "icon_left");
			regist(1, 0, "icon_left_on");
			regist(0, 1, "icon_order");
			regist(1, 1, "icon_order_on");
			regist(0, 2, "icon_refresh");
			regist(1, 2, "icon_refresh_on");
			regist(0, 4, "preview");
			regist(0, 5, "lock");
			regist(1, 5, "unlock");

			oIconsFile.setStartPosition(0, 0);
			oIconsFile.setGap(0);
			oIconsFile.setFilePath("workbench/skin/ierp/res/no-data.png");
			oIconsFile.setIconSize(200, 200);
			regist(0, 0, "icon_empty_background");

			oIconsFile.setStartPosition(0, 0);
			oIconsFile.setGap(0);
			oIconsFile.setFilePath("workbench/skin/ierp/res/no-search-data.png");
			oIconsFile.setIconSize(200, 200);
			regist(0, 0, "icon_search_no_data_background");

			oIconsFile.setFilePath("common/skin/pioneer/res/icon-empty-error-display/icon_open_tips_background.png");
			oIconsFile.setIconSize(264, 191);
			regist(0, 0, "icon_open_tips_background");

			oIconsFile.setStartPosition(0, 0);
			oIconsFile.setGap(0);
			oIconsFile.setFilePath("workbench/skin/ierp/res/workbench-sprite2.png");
			oIconsFile.setIconSize(90, 90);
			regist(0, 0, "icon_Square");
			regist(0, 1, "icon_LongPainting");
			regist(0, 2, "icon_Dashboard");
			regist(0, 3, "icon_QingReport");
			regist(0, 4, "icon_Metrics");

			oIconsFile.setFilePath("schema-manage/skin/ierp/res/schema-manage-sprite.png");
			oIconsFile.setStartPosition(1,21);
			oIconsFile.setGap(1);
			oIconsFile.setIconSize(16,16);

			regist(0, 2, "icon_up_schema");
			regist(1, 2, "icon_up_schema_on");


			oIconsFile.setFilePath("workbench/skin/ierp/res/workbench-operate.png");
			oIconsFile.setGap(1);
			oIconsFile.setStartPosition(1, 12);
			oIconsFile.setIconSize(16, 16);
			regist(0, 4, "fullscreen");
			regist(1, 4, "quitFullscreen");

			oIconsFile.setFilePath("workbench/skin/ierp/res/workbench-background-tips.png");
			oIconsFile.setStartPosition(0, 0);
			oIconsFile.setIconSize(293, 174);
			regist(0, 0, "icon_open_tips_background");

			registAssistant(oIconsFile);

			oIconsFile.setFilePath("workbench/skin/ierp/res/workbench-sprite3.png");
			oIconsFile.setStartPosition(1, 1);
			oIconsFile.setGap(0);
			oIconsFile.setIconSize(17, 17);
			regist(0, 0, "QingReport");
			regist(1, 0, "QingReport-on");
			regist(0, 1, "Dashboard");
			regist(1, 1, "Dashboard-on");
			regist(0, 2, "Square");
			regist(1, 2, "Square-on");
			regist(0, 4, "LongPainting");
			regist(1, 4, "LongPainting-on");
			regist(0, 3, "Metrics");
			regist(1, 3, "Metrics-on");
			regist(0, 4, "LongPainting");
			regist(1, 4, "LongPainting-on");

			regist(2, 0, "icon_undefault");
			regist(3, 0, "icon_default");
			regist(2, 2, "icon_delete");
			regist(3, 2, "icon_delete_hover");
			regist(2, 3, "icon_workbench");
			regist(3, 3, "icon_workbench_on");
			regist(3, 3, "icon_workbench-on");
			regist(2, 4, "icon_edit");
			regist(3, 4, "icon_edit_hover");

			regist(4, 1, "icon_search");
			regist(5, 1, "icon_search_on");
			regist(4, 3, "icon_add");
			regist(5, 3, "icon_add_on");

			regist(6, 0, "QingReport-selected");
			regist(6, 1, "Dashboard-selected");
			regist(6, 2, "Square-selected");
			regist(6, 3, "Metrics-selected");
			regist(6, 4, "LongPainting-selected");

			regist(4, 4, "card_edit");
			regist(5, 4, "card_edit_hover");

			regist(6, 6, "icon_workbench_fixed");

            regist(4, 5, "icon_unlock");
            regist(5, 5, "icon_unlock_hover");
            regist(4, 6, "icon_lock");
            regist(5, 6, "icon_lock_hover");
            regist(4, 7, "icon_close");
            regist(5, 7, "icon_close_hover");

			oIconsFile.setStartPosition(1, 120);
			oIconsFile.setGap(1);
			oIconsFile.setIconSize(17, 17);
			regist(0, 0, "icon_schema_list");
			regist(1, 0, "icon_schema_list_hover");
			regist(0, 1, "icon_open_tab");
			regist(1, 1, "icon_open_tab_hover");

		}
		
		var regist = function(iRow, iCol, sIconName)
		{
			_super.registIcon(iRow, iCol, sIconName);
		}

		var registAssistant = function(oIconsFile)
		{
			oIconsFile.setFilePath("workbench/skin/ierp/res/assistant/bg-panel.png");
			regist(0, 0, "assistant-bg");
			oIconsFile.setFilePath("workbench/skin/ierp/res/assistant/bg-panel-fullscreen.png");
			regist(0, 0, "assistant-bg-fullscreen");
			oIconsFile.setFilePath("workbench/skin/ierp/res/assistant/icon-bot.png");
			regist(0, 0, "assistant-bot");
			oIconsFile.setFilePath("workbench/skin/ierp/res/assistant/icon-cosmic.png");
			regist(0, 0, "assistant-cosmic");
			oIconsFile.setFilePath("workbench/skin/ierp/res/assistant/icon-cosmic-banner-1.png");
			regist(0, 0, "assistant-cosmic-banner-1");
			oIconsFile.setFilePath("workbench/skin/ierp/res/assistant/icon-cosmic-banner-2.png");
			regist(0, 0, "assistant-cosmic-banner-2");

			oIconsFile.setFilePath("workbench/skin/ierp/res/assistant/icon-assistant-common@3x.png");
			oIconsFile.setGap(0, 0);
			oIconsFile.setIconSize(24, 24);
			regist(0, 0, "assistant-new-chat");
			regist(1, 0, "assistant-new-chat_hover");
			regist(0, 1, "assistant-history-chat");
			regist(1, 1, "assistant-history-chat_hover");
			regist(0, 2, "assistant-pin");
			regist(1, 2, "assistant-pin_hover");
			regist(0, 3, "assistant-pinned");
			regist(1, 3, "assistant-pinned_hover");
			regist(0, 4, "assistant-expand");
			regist(1, 4, "assistant-expand_hover");
			regist(0, 5, "assistant-contract");
			regist(1, 5, "assistant-contract_hover");
			regist(0, 6, "assistant-close");
			regist(1, 6, "assistant-close_hover");
			regist(0, 7, "assistant-send");
			regist(1, 7, "assistant-send_hover");

			oIconsFile.setFilePath("workbench/skin/ierp/res/assistant/icon-assistant-edit@3x.png");
			oIconsFile.setGap(0, 0);
			oIconsFile.setIconSize(16, 16);
			regist(0, 0, "assistant-edit");
			regist(1, 0, "assistant-edit_hover");

			oIconsFile.setFilePath("workbench/skin/ierp/res/assistant/icon-drop.png");
			regist(0, 0, "assistant-drop");
			oIconsFile.setFilePath("workbench/skin/ierp/res/assistant/icon-attachment.png");
			regist(0, 0, "assistant-attachment");
			oIconsFile.setFilePath("workbench/skin/ierp/res/assistant/email-tool-bar.png");
			regist(0, 0, "assistant-email-tool-bar");

			oIconsFile.setStartPosition(1, 1);
			oIconsFile.setGap(1);
			oIconsFile.setFilePath("workbench/skin/ierp/res/assistant/charttypes.png");
			oIconsFile.setIconSize(28, 21);
			registChartTypes();
			oIconsFile.setStartPosition(2, 2);
			oIconsFile.setGap(3);
			oIconsFile.setIconSize(26, 19);
			registerChartTypesNoBorder();

			oIconsFile.setFilePath("workbench/skin/ierp/res/assistant/gpt-chartpane-icon.png");
			oIconsFile.setIconSize(16, 16);
			oIconsFile.setStartPosition(1, 1);
			oIconsFile.setGap(1);
			registerButton(0, 0, "edit_btn");
			registerButton(0, 1, "summary_info_btn");
			registerButton(0, 2, "exchange_chart_btn");
			registerButton(0, 3, "question_edit_btn");

			oIconsFile.setFilePath("workbench/skin/ierp/res/assistant/assistant-icon.png");
			// oIconsFile.setIconSize(24, 24);
			// oIconsFile.setStartPosition(1, 1);
			// oIconsFile.setGap(2);
			// regist(0, 0, "assistant-edit-email");
			// regist(1, 0, "assistant-edit-email_hover");
			// regist(0, 1, "assistant-send-email");
			// regist(1, 1, "assistant-send-email_hover");

			oIconsFile.setIconSize(72, 72);
			oIconsFile.setStartPosition(53, 1);
			oIconsFile.setGap(1);
			regist(0, 0, "assistant-edit-email");
			regist(1, 0, "assistant-edit-email_hover");
			regist(0, 1, "assistant-send-email");
			regist(1, 1, "assistant-send-email_hover");

			oIconsFile.setFilePath("workbench/skin/ierp/res/assistant/guide-intelligent.png");
			oIconsFile.setStartPosition(0, 0);
			oIconsFile.setIconSize(20, 20);
			regist(0, 0, "icon_guide_intelligent");

			oIconsFile.setFilePath("workbench/skin/ierp/res/assistant/guide-background.png");
			oIconsFile.setStartPosition(0, 0);
			oIconsFile.setIconSize(316, 87);
			regist(0, 0, "icon_guide_background");

			oIconsFile.setFilePath("workbench/skin/ierp/res/assistant/gpt-guide.png");
			oIconsFile.setStartPosition(0, 0);
			oIconsFile.setGap(2, 2);
			oIconsFile.setIconSize(16, 16);
			regist(0, 0, "card_type_rpt_hover");
			regist(1, 0, "card_type_rpt");
			regist(0, 1, "edit_recommended_question");
			regist(1, 1, "edit_recommended_question_hover");
			regist(0, 2, "card_type_square_hover");
			regist(1, 2, "card_type_square");
			regist(0, 3, "card_type_longer_hover");
			regist(1, 3, "card_type_longer");
			regist(0, 4, "card_type_metric_hover");
			regist(1, 4, "card_type_metric");
			regist(0, 5, "card_type_dashboard_hover");
			regist(1, 5, "card_type_dashboard");

			oIconsFile.setFilePath("common/skin/ierp/res/msg.png");
			oIconsFile.setStartPosition(1, 1);
			oIconsFile.setGap(1);
			oIconsFile.setIconSize(100, 80);
			regist(1, 2, "msg-warning");
			regist(1, 1, "msg-operatorTips");
			regist(2, 0, "msg-jurisdiction");
		}

		var registerChartTypesNoBorder = function()
		{
			regist(0, 0, "no_border_Table");
			regist(0, 1, "no_border_Pie");
			regist(0, 2, "no_border_Ring");
			regist(0, 3, "no_border_Rose");
			regist(0, 4, "no_border_Sunburst");

			regist(1, 0, "no_border_Heatmap");
			regist(1, 1, "no_border_Treemap");

			regist(2, 0, "no_border_Bar");
			regist(2, 1, "no_border_Msbar");
			regist(2, 2, "no_border_Stackbar");
			regist(2, 3, "no_border_Percentbar");

			regist(3, 0, "no_border_Horizontalbar");
			regist(3, 1, "no_border_Horizontalmsbar");
			regist(3, 2, "no_border_Horizontalstackbar");
			regist(3, 3, "no_border_Horizontalpercentbar");

			regist(4, 0, "no_border_Line");
			regist(4, 1, "no_border_Mline");
			regist(4, 2, "no_border_Area");
			regist(4, 3, "no_border_PercentArea");

			regist(5, 0, "no_border_Scatter");
			regist(5, 1, "no_border_Bubble");

			regist(6, 0, "no_border_Kpi");
			regist(6, 1, "no_border_Map");
			regist(6, 2, "no_border_Radar");
			regist(6, 3, "no_border_Composite");
			regist(6, 4, "no_border_Dial");

			regist(1, 4, "no_border_ProgressCircle");
			regist(2, 4, "no_border_ProgressBar");
			regist(2, 4, "no_border_ProgressVbar");
			regist(3, 4, "no_border_ProgressHbar");

			regist(7, 0, "no_border_Grid");
			regist(8, 0, "no_border_CustomList");

			regist(7, 1, "no_border_Gis");
			regist(4, 4, "no_border_Waterfall");
			regist(5, 4, "no_border_Funnel");
		}

		var registChartTypes = function()
		{
			regist(0, 0, "Table");
			regist(0, 1, "Pie");
			regist(0, 2, "Ring");
			regist(0, 3, "Rose");
			regist(0, 4, "Sunburst");

			regist(1, 0, "Heatmap");
			regist(1, 1, "Treemap");

			regist(2, 0, "Bar");
			regist(2, 1, "Msbar");
			regist(2, 2, "Stackbar");
			regist(2, 3, "Percentbar");

			regist(3, 0, "Horizontalbar");
			regist(3, 1, "Horizontalmsbar");
			regist(3, 2, "Horizontalstackbar");
			regist(3, 3, "Horizontalpercentbar");

			regist(4, 0, "Line");
			regist(4, 1, "Mline");
			regist(4, 2, "Area");
			regist(4, 3, "PercentArea");

			regist(5, 0, "Scatter");
			regist(5, 1, "Bubble");

			regist(6, 0, "Kpi");
			regist(6, 1, "Map");
			regist(6, 2, "Radar");
			regist(6, 3, "Composite");
			regist(6, 4, "Dial");

			regist(1, 4, "ProgressCircle");
			regist(2, 4, "ProgressBar");
			regist(2, 4, "ProgressVbar");
			regist(3, 4, "ProgressHbar");

			regist(7, 0, "Grid");
			regist(8, 0, "CustomList");

			regist(7, 1, "Gis");
			regist(4, 4, "Waterfall");
			regist(5, 4, "Funnel");
		}

		var registerButton = function(iRow, iCol, sName)
		{
			regist(iRow, iCol, sName);
			regist(iRow + 1, iCol, sName + "_hover");
		}
	})();
})();