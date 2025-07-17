(function()
{
	if(typeof(com) == "undefined") com = {};
	if(typeof(com.kingdee) == "undefined") com.kingdee = {};
	if(typeof(com.kingdee.bos) == "undefined") com.kingdee.bos = {};
	if(typeof(com.kingdee.bos.qing) == "undefined") com.kingdee.bos.qing = {};
	if(typeof(com.kingdee.bos.qing.ai) == "undefined") com.kingdee.bos.qing.ai = {};
	if(typeof(com.kingdee.bos.qing.ai.analysis) == "undefined") com.kingdee.bos.qing.ai.analysis = {};

	var NS = com.kingdee.bos.qing.ai.analysis;

	NS.MyIcons = new (function()
	{
		com.kingdee.bos.qing.framework.common.AbstractIcons.call(this);
		var _super = this.protectedMethod;
		
		this.protectedInit = function(mapComboIcons, oIconsFile)
		{
			oIconsFile.setFilePath("ai-analysis/skin/ierp/res/analysisAI_max.png");
			oIconsFile.setIconSize(40, 40);
			oIconsFile.setStartPosition(1, 1);
			oIconsFile.setGap(1);
			registerButton(0, 0, "save_btn");
			registerButton(0, 1, "edit_btn");
			registerButton(0, 2, "insight_btn");
			registerButton(0, 3, "exchange_chart_btn");
			registerButton(0, 4, "send_btn");
			registerButton(0, 5, "message_btn");
			registerButton(0, 6, "summary_info_btn");
			registerButton(0, 7, "insight_info_btn");

			regist(3, 1, "edit_white_btn");
			regist(3, 4, "send_white_btn");

			// oIconsFile.setIconSize(40, 40);
			// oIconsFile.setStartPosition(1, 120);
			// oIconsFile.setGap(1);
			// regist(0, 0, "question_avatar");
			// regist(0, 3, "comparative");
			// regist(0, 4, "trend");
			// regist(0, 5, "ai_avatar");
			// regist(0, 6, "index");
			// regist(0, 7, "proportion");

			oIconsFile.setIconSize(80, 80);
			oIconsFile.setStartPosition(1, 195);
			oIconsFile.setGap(1);
			regist(0, 0, "question_avatar");
			regist(0, 1, "question_avatar_click");
			regist(0, 2, "question_avatar_hover");
			regist(0, 3, "comparative_max");
			regist(1, 0, "trend_max");
			regist(1, 1, "index_max");
			regist(1, 2, "proportion_max");
			regist(1, 3, "ai_avatar");

			oIconsFile.setStartPosition(1, 1);
			oIconsFile.setGap(1);
			oIconsFile.setFilePath("ai-analysis/skin/ierp/res/charttypes.png");
			oIconsFile.setIconSize(28, 21);
			registChartTypes();
			oIconsFile.setStartPosition(2, 2);
			oIconsFile.setGap(3);
			oIconsFile.setIconSize(26, 19);
			registerChartTypesNoBorder();

			oIconsFile.setFilePath("ai-analysis/skin/ierp/res/bigRobertPortrait.png");
			oIconsFile.setIconSize(200, 200);
			oIconsFile.setStartPosition(0, 0);
			oIconsFile.setGap(1);
			regist(0, 0, "big_ai_portrait");

			oIconsFile.setFilePath("common/skin/ierp/res/msg.png");
			oIconsFile.setStartPosition(1, 1);
			oIconsFile.setGap(1);

			oIconsFile.setIconSize(100, 80);
			regist(1, 2, "msg-warning");
			regist(1, 1, "msg-operatorTips");
			regist(2, 0, "msg-jurisdiction");
		}

		var registerButton = function(iRow, iCol, sName)
		{
			regist(iRow, iCol, sName);
			regist(iRow + 1, iCol, sName + "_click");
			regist(iRow + 2, iCol, sName + "_hover");
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
		
		var regist = function(iRow, iCol, sIconName)
		{
			_super.registIcon(iRow, iCol, sIconName);
		}
	})();

	NS.IconTool = new function()
	{
		this.shrink = function(jqIcons, iScale, iInitWidth, iInitHeight)
		{
			var iTargetWidth = Math.ceil(iInitWidth * iScale);
			var iTargetHeight = Math.ceil(iInitHeight * iScale);
			var jqWrap = $("<div>");
			jqWrap.css("overflow", "hidden");
			jqWrap.css("width", iTargetWidth);
			jqWrap.css("height", iTargetHeight);

			jqIcons.css("position", "relative");
			jqIcons.css("transform", "scale(" + iScale +")");
			jqIcons.css("left", "-" + (iInitWidth - iTargetWidth)/2 + "px");
			jqIcons.css("top", "-" + (iInitHeight - iTargetHeight)/2 + "px");
			jqIcons.appendTo(jqWrap);
			return jqWrap;
		}
	}
})();