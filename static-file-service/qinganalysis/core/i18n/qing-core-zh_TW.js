(function()
{
	var oManager = com.kingdee.bos.qing.framework.common.MultilanguageManager;
	
	var oPackage = com.kingdee.bos.qing.chart;
	oManager.registPackageResources(oPackage,
	{
		ratio: "佔比",
		completion: "完成率",
		scope: "範圍"
	});
	
	var oPackage = com.kingdee.bos.qing.core.commonui;
	oManager.registPackageResources(oPackage,
	{
		canNotRun: "不能正常執行。\n由於龐大的維度成員數量，為防止系統崩潰，執行引擎在處理能力上作了限制。",
		dataEmpty: "沒有資料可供分析和展現",
		relationMissing: "數據表之間缺少關聯關係。",
		necessaryDimensionMissing: "當前分析方案缺少必要的欄位：",
		autoAppendNecessaryDimensions: "將必要欄位添加到篩選器",
		rowsInTotal: "共 #1 行",
		rowNum: "序號",
		linkageFromDetailRow: "第#1行，單據聯查：",
		linkageJumpTo: "聯查到“#1”",
		linkageJumping: "正在跳轉到業務單據",
		linkageJumpingError1: "關聯欄位不存在。",
		linkageJumpingError2: "關聯欄位無法與展現數據建立關係。",
		linkageJumpingError3: "由於未使用到該聯查目標的欄位，當前明細數據與該聯查目標無關。",
		linkageJumpingError4: "聯查目標沒有數據。",
		confirmGoOnLinkageJump: "聯查目標已超出#1條記錄的上限，將無法列出全部結果。",
		executingWaiting: "方案執行中",
		executingWaitingPrompt: "累計耗時#1秒。",
		executingWaitingPromptA1: "數據訪問至#2行，累計耗時#1秒。",
		executingWaitingPromptB1: "視覺化引擎耗時#1秒。",
		tableJoinWaitingPrompt: "正在關聯表，耗時#1秒。",
		tableJoin: "關聯",
		tableJoining: "關聯中"
	});
	
	var oPackage = com.kingdee.bos.qing.core.shared;
	oManager.registPackageResources(oPackage,
	{
		fullValue: "全部",
		excludeValue: "排除",
		includeNull: "包含空值",
		parameter: "参数",
		viewData: "查看數據",
		showAllFields: "顯示所有欄位",
		exporting: "正在匯出...",
		exportToExcel: "匯出到Excel",
		linkage: "單據聯查"
	});
	
	var oPackage = com.kingdee.bos.qing.core.ui;
	oManager.registPackageResources(oPackage, 
	{
		//scene.js
		moduleLonger: "數據分析",
		moduleSquare: "數據斗方",
		confirmQuittingModalDesigner: "是否放棄修改并退出？",
		cardPromptErrorOccurred: "出錯了",
		cardPromptShowErrorDetail: "查看更多...",
		cardPromptNotEnoughMemory: "伺服器繁忙，稍後重試...",
		cardPromptTryAgainRightNow: "立即刷新",
		cardPromptTrying: "嘗試中...",
		cardPromptReExecute: "重新執行",
		
		//core-ui.js
		loadHighVersion: "相容性載入高版本文檔",
		undo: "撤消",
		redo: "反撤消",
		busyServer: "伺服器忙，請稍後重試。",
		tryAgain: "再試試",
		giveUp: "放棄",
		field: "欄位",
		ctrlSelectMoreField: "[Ctrl]+滑鼠，可以選擇多個欄位。",
		dropdownMenu: "下拉式功能表",
		dataFormat: "數位格式",
		fiscalYear: "會計年度",
		sortAccording: "自定義順序",
		createCalculatedField: "創建自定義欄位",
		editCalculatedField: "編輯自定義欄位",
		deleteCalculatedField: "刪除自定義欄位",
		usedAndQuotedPromot: "一個或多個選中欄位已在視圖中使用，並且將會影響以下欄位：",
		sureDelete: "確定刪除嗎？",
		quotedPromot: "將會影響以下欄位：",
		usedPromot: "選中欄位已在視圖中使用，",
		calculatedFieldInvalid: "自定義欄位#1无效",
		executedNotVisible: "等待刷新...",
		fieldSearchPlaceholder: "搜索",
		searchField: "查找欄位",
		fieldNothingSearched: "找不到符合的結果",
		viewMetaTableData: "查看原始數據",
		additionalFilters: "儀錶板聯動的篩選條件",
		additionalFiltersWatching: "查看儀錶板聯動的篩選條件。",
		additionalFiltersOn: "已應用仪表板联动的筛选条件。可點擊按鈕使其忽略。",
		additionalFiltersOff: "已忽略仪表板联动的筛选条件。可點擊按鈕使其生效。",
		
		//core-ui-setting.js
		formatTabNormal: "常規",
		formatTabCustom: "自定義",
		formatString: "格式化串",
		formatStringEmptyPrompt: "自定義格式化串不能為空。",
		setDefaultDataFormat: "預設#1的數位格式",
		selectedFields: "多個選中欄位",
		reset: "重置",
		apply: "應用",
		clearDataFormat: "清除#1數位格式",
		setDataFormat: "設置#1數位格式",
		dateFormatTitle: "設置#1日期格式",
		dateFormatDefault: "系統默認",
		dateFormatCustom: "自定義",
		dateFormatPreview: "預覽：",
		setFiscalYear: "預設#1的會計年度",
		fiscalYearFromMonth: "會計年度從幾月份開始？",
		January: "一月",
		February: "二月",
		March: "三月",
		April: "四月",
		May: "五月",
		June: "六月",
		July: "七月",
		August: "八月",
		September: "九月",
		October: "十月",
		November: "十一月",
		December: "十二月",
		dataFilter: "數值篩選",
		whatValueToFilter: "對#1的什麼值進行篩選？",
		originalValue: "原始值",
		sumValue: "求和",
		avgValue: "平均值",
		medianValue: "中位數",
		count: "計數",
		countDistinct: "去重計數",
		maxValue: "最大值",
		minValue: "最小值",
		year: "年",
		quarter: "季度",
		month: "月",
		day: "日",
		yearQuarter: "年季",
		yearMonth: "年月",
		yearMonthDay: "年月日",
		dateRange: "日期範圍",
		reflineAdd: "添加參考線",
		reflineType: "取值",
		reflineValue: "自定義值",
		reflineLabel: "標籤",
		reflinePromptValueEmpty: "自定義值不能為空。",
		reflinePromptValueInvalid: "自定義值不是正確的數字。",
		reflineTypeAvg: "平均值",
		reflineTypeMed: "中位數",
		reflineTypeConst: "自定義",
		reflineNthMeasure: "第#1個度量的",
		sortAccordingModified: "設置自定義順序",
		sortAccordingPrompt: "第#1項，#2。",
		sortAccordingPromptDuplicated: "與第#1項“目標欄位”重複",
		sortAccordingPromptSame: "“依據欄位”與“目標欄位”相同",
		sortAccordingPromptIncomplete: "設置不完整",
		sortAccordingAddItem: "添加排序依據",
		sortAccordingTargetField: "目標欄位",
		sortAccordingType: "排序依據",
		sortAccordingBound: "依據欄位",
		sortAccordingBoundTitle: "按此欄位排序",
		sortAccordingBoundPlaceholder: "（請確保此欄位與目標欄位的值壹壹對應）",
		sortAccordingManual: "手動",
		sortAccordingManualTitle: "手動排序",
		sortAccordingManualPrompt1: "請先指定“目標欄位”。",
		sortAccordingManualPrompt2: "沒有數據。",
		sortAccordingManualPrompt3: "目標欄位超過#1個值，不建議進行手動排序。",
		paletteMoveUp: "上移",
		paletteMoveDown: "下移",
		paletteMoveLeft: "左移",
		paletteMoveRight: "右移",
		palettePromptDuplication: "與第#1行第#2個顏色重複。",
		paletteMappingAuto: "自動",
		paletteMappingAppointed: "按顏色順序指定值",
		paletteMappingColor: "顏色",
		paletteMappingText: "維度成員（顯示值）",
		paletteMappingOperation: "操作",
		paletteMappingSelect: "選擇",
		paletteMappingClear: "清除",
		paletteMappingFillAll: "自動全填",
		paletteMappingFillAllConfirmer: "清除全部已指定的值，并重新自動填寫嗎？",
		paletteMappingClearAll: "全清除",
		paletteMappingClearAllConfirmer: "清除全部已指定的值嗎？",
		paletteMappingSelectorTitle: "選擇第 #1 個顏色對應的值",
		paletteMappingUnbound: "未指定",
		paletteMappingPromptOrder: "必須按順序依次指定值，中間不能出現“未指定”項。",
		paletteMappingPromptDuplication: "第#1行與第#2行重複，都是“#3”。",
		dataNull: "（空）",
		continuousColorDefault: "系統默認",
		continuousColorCustom: "自定義",
		continuousColorMode: "漸變模式",
		continuousColorModeBoth: "正負向雙色漸變",
		continuousColorModePositve: "正向單色漸變",
		continuousColorModeNegative: "負向單色漸變",
		continuousColorMin: "指定數據最小值",
		continuousColorMax: "指定數據最大值",
		continuousColorMiddle: "指定數據中心點",
		continuousColorSegment: "分段",
		continuousColorWholeRange: "使用完整顏色範圍",
		continuousColorInputNumber: "在此處填寫數值",
		brief: "摘要",
		briefOutputParam: "輸出參數",
		briefAskAbort: "是否取消對“輸出參數”的修改？",
		briefCommandCaption: "設置輸出參數",
		briefCheckConditionLack: "篩選條件未設置。",
		briefCheckOutputTargetLack: "未指定輸出欄位。",
		briefCheckNameDuplicated: "名稱重複。",
		briefCheckNameLack: "必須定義名稱，以供使用場景引用。",
		briefCheckNameInvalid: "名稱必須以字母開頭，只能包含字母、數字、下劃線。",
		briefCheckNameTooLong: "名稱不能超過#1個字元。",
		briefModelCurrent: "當前模型",
		briefModelN: "模型#1",
		briefAppend: "添加輸出參數",
		briefDelete: "刪除",
		briefAskDelete: "刪除輸出參數？",
		briefNonameDisplay: "未命名",
		briefModelOverviewDimension: "#1有#2個維度。",
		briefModelOverviewMeasure: "#1有#2個度量。",
		briefPreview: "嘗試執行以查看結果",
		briefAttrCaptionName: "名稱",
		briefAttrCaptionDescription: "簡要描述",
		briefAttrCaptionFilter: "計算結果定位到",
		briefAttrCaptionTarget: "輸出欄位",
		briefAttrCaptionSort: "排序依據（當存在多行時）",
		briefAttrCaptionPostscript: "後處理腳本（自定義顯示文字）",
		briefPickerField: "欄位",
		briefPickerType: "定位方式",
		briefPickerSetting: "詳細設置",
		briefPickerFullSetting: "定位方式為“全部”，不必詳細設置。",
		briefPickerConditionNone: "未設置",
		briefPickerTypeFull: "全部",
		briefPickerTypeCondition: "篩選條件",
		briefPickerTypeMax: "最大前幾名",
		briefPickerTypeMin: "最小前幾名",
		briefSortAsc: "升序",
		briefSortDesc: "降序",
		briefDimension: "維度",
		briefProperty: "屬性",
		briefMeasure: "度量",
		briefPostScriptDemo1: "拼接所有行第1列文字，用頓號分隔。",
		briefPostScriptDemo2: "拼接前3名的所有行的第1列第2列文字，用分號号分隔。",
		briefPostScriptDemo3: "拼接前2行的第1列文字，用頓號分隔。",
		briefPostScriptDemo4: "拼接第2名（存在并列）的前3行的第1列文字，用&號分隔。",
		briefPostScriptDemo5: "概要計算結果總共有多少行。",
		briefPostScriptDemo6: "排名第一的有多少行。",
		briefConditionDemo1: "維度成員單選：",
		briefConditionDemo2: "維度成員多選：",
		briefConditionDemo3: "日期維度按年：",
		briefConditionDemo4: "日期維度按年月：",
		briefConditionDemo5: "度量值大于：",
		briefConditionDemo6: "度量值範圍：",
		briefScriptContent: "腳本",
		briefScriptDemo: "語法示例",
		briefFieldSelectable: "可選欄位",
		briefFieldSelected: "已選欄位",
		briefFieldPrompt1: "未選中“可選欄位”。",
		briefFieldPrompt2: "“已選欄位”中已存在#1。",
		briefFieldPrompt3: "最多允許#1個輸出欄位。",
		briefFieldPrompt4: "未選中“已選欄位”。",
		briefPreviewTitle: "預覽執行結果",
		briefPreviewClose: "關閉",
		briefPreviewMatrix: "定位后的概要計算結果",
		briefPreviewDisplay: "顯示文字",
		briefPreviewMatrixRanking: "排名",
		briefPreviewMatrixColumn: "列",
		warningRule: "預警規則",
		warningRuleAskAbort: "是否取消對“預警規則”的修改？",
		warningRuleCommandCaption: "設置預警規則",
		warningRuleAppend: "添加預警規則",
		warningRuleAskDelete: "刪除預警規則？",
		warningRuleError1: "原先使用的分析欄位已不存在",
		warningRuleError2: "分析欄位屬性發生變化，原先設置的比較符不匹配",
		warningRulePrompt1: "左右括號不匹配。",
		warningRulePrompt2: "條件不完整。",
		warningRuleAttrCaptionFilter: "預警條件",
		warningRuleAttrCaptionPostscript: "後處理腳本（自定義判斷條件）",
		warningRuleFilterLeftBracket: "左括號",
		warningRuleFilterField: "欄位",
		warningRuleFilterOperation: "比較",
		warningRuleFilterComparing: "值",
		warningRuleFilterRightBracket: "右括號",
		warningRuleFilterLogic: "邏輯",
		warningRuleFilterRowAdd: "插入",
		warningRuleFilterRowDelete: "刪除",
		warningRuleFilterCustomScript: "自定義腳本",
		warningRulePostScriptDemo1: "符合預警條件的計算結果超過2行。",
		warningRulePostScriptDemo2: "注：函數#1，可以獲得符合預警條件的計算結果行數。未設置後處理腳本時，相當于#2。",
		warningRuleLogicAnd: "並且",
		warningRuleLogicOr: "或",
		warningRuleOpCustom: "自定義",
		warningRuleOpEqual: "等於",
		warningRuleOpNotEqual: "不等於",
		warningRuleOpGreater: "大於",
		warningRuleOpGreaterEqual: "大於等於",
		warningRuleOpLess: "小於",
		warningRuleOpLessEqual: "小於等於",
		warningRuleOpNull: "為空",
		warningRuleOpNotNull: "不為空",
		warningRulePreviewMatrix1: "符合預警條件的計算結果共#1行",
		warningRulePreviewMatrix2: "僅顯示前#1行",
		warningRulePreviewResult: "判斷結果",
		warningRulePreviewResultTrue: "是",
		warningRulePreviewResultFalse: "否",
							
		//core-ui-filter.js
		searcherTitle: "搜索",
		searcherModeAutoSelect: "搜索結果自動選中",
		searcherModeSearching: "僅搜索，不影響選中狀態",
		searcherTips: "搜索內容",
		searchInclude: "包含",
		searchNotInclude: "不包含",
		searchEqual: "等於",
		searchNotEqual: "不等於",
		searchStartOf: "開頭是",
		searchNotStartOf: "開頭不是",
		searchEndOf: "結尾是",
		searchNotEndOf: "結尾不是",
		showOnlySelected: "僅顯示選中項",
		selectAll: "全選",
		selectedCount: "（已選擇 #1 項）",
		includeSubs: "選擇時包含下級節點",
		dateFilterAbsolute: "指定日期",
		dateFilterRelative: "相對日期",
		dateFilterIncludeNull: "包含空值",
		nothingSearched: "找不到符合的結果",
		
		//core-ui-filter-extra.js
		extraNoFilters: "未設置篩選器",
		extraOk: "確定",
		extraCancel: "取消",
		nothingSelectable: "沒有可選擇的內容",
		treeIncludeSubs: "選擇時包含下級節點 （僅對#1，在樹狀視圖）",
		ignored: "不限",
		dateFrom: "從：",
		dateTo: "到：",
		currentDay: "今天",
		currentWeek: "本周",
		currentMonth: "本月",
		currentYear: "本年",
		tinyDateYear: "年",
		tinyDateMonth: "月",
		tinyDateDay: "日",
		
		//core-ui-conductor.js
		warningRuleUsageCaptionSelectable: "已定義的預警規則",
		warningRuleUsageCaptionSelected: "選中的預警規則及其描述",
		warningRuleUsageSelectableEmpty: "未定義預警規則",
		warningRuleUsageNoSelected: "未選擇預警規則。",
		warningRuleUsageNoDescription: "該預警規則無描述。",
		warningRuleUsageNotExistName: "該名稱不存在。"
	});
		
	var oPackage = com.kingdee.bos.qing.longer.ui;
	oManager.registPackageResources(oPackage, 
	{	
		//longer-ui.js
		analysis: "分析",
		rowColReverse:"行列置換",
		clear: "清除",
		exeImmediately: "即時執行",
		exeImmediatelyCurrent: "當前為“暫緩執行”模式，點擊切換為“即時執行”",
		exeDelay: "暫緩執行",
		exeDelayCurrent: "當前為“即時執行”模式，點擊切換為“暫緩執行”",
		exportMenuMix: "匯出/列印",
		exportMenuMormal: "匯出",
		exportMenuDoing:"正在生成...",
		printMenuNormal: "列印",
		printSubMenuPreview: "列印",
		printSubMenuSetting: "頁面設置",	
		collapseDesignPanel: "收起設計面板",
		filterFieldCardTitle: "篩選器",
		columnCardTitle: "列",
		columnCardTitleWithAxis: "列（橫軸）",
		rowCardTitle: "行",
		rowCardTitleWithAxis: "行（縱軸）",
		markCardTitle: "值展現方式",
		markCardTitleForTable: "數值區域",
		chartTypeCardTitle: "圖表類型",
		showChartLabel: "顯示圖表標籤",
		showChartLabelYes: "顯示圖表標籤",
		showChartLabelNo: "不顯示圖表標籤",
		chartSetting: "圖表設置",
		total: "合計",
		showRowTotal: "顯示行總計",
		showRowTotalYes: "顯示行總計",
		showRowTotalNo: "不顯示行總計",
		showColTotal: "顯示列總計",
		showColTotalYes: "顯示列總計",
		showColTotalNo: "不顯示列總計",
		legend: "圖例",
		dataFormatForNumber: "數位格式",
		dataFormatForDate: "日期格式",
		showSubtotal: "小計",
		showSubtotalYes: "顯示小計",
		showSubtotalNo: "不顯示小計",
		rename: "重命名",
		reset: "重置",
		remove: "移除",
		filterSelectData: "數據篩選",
		filterOnShowSwitch: "顯示篩選器",
		filterHide: "隱藏篩選器",
		filterShow: "顯示篩選器",
		dimension: "維度",
		measure: "度量",
		exactValue: "精確值",
		totalUsing: "匯總計算方式",
		totalUsingAuto: "跟隨度量",
		totalUsingHidden: "隱藏",
		quickSetup1: "按日期計算",
		quickSetup2: "佔比",
		changeChartTypeTo: "圖表類型切換為",
		move: "移動",
		markTypeNumber: "數字",
		markTypeColor: "顏色",
		markTypeSize: "大小",
		markTypeAngle: "角度",
		invalidRole: "維度/度量用法不正確",
		invalidPcdDimension: "行/列上的維度必須是父子維",
		notExistField: "不存在的欄位",
		invalidField: "無效的欄位",
		invalidAggregation: "聚合方式不正確",
		addFilterField: "添加#1作為篩選欄位",
		noOptionValue: "沒有相關值選項\n您可以嘗試切換到全部值",
		noAlternativeValues: "沒有備選值",
		totalItemsAll: "(已選擇 全部 選項)",
		totalItemsCount: "(已選擇 #1 項)",
		selectAll: "全選",
		selectAllFilterValue: "全選篩選值",
		clearAllFilterValue: "全清篩選值",
		filterChangeProperty: "篩選器#1: #2",
		optionForAllValues: "備選值為全部值",
		optionForRelevantValues: "備選值僅為相關值",
		rangeForAllValues: "範圍包括全部值",
		rangeForRelevantValues: "範圍僅包括相關值",
		mode: "模式",
		multiSelectedList: "多選列表",
		multiSelectedPopup: "多選彈窗選擇器",
		singleSelectedList: "單選列表",
		singleSelectedPopup: "單選彈窗選擇器",
		dateFilterFormat: "yyyy年M月d日",
		nothingSearched: "找不到符合的結果",
		executingCanceled: "當前執行已被取消，點擊這里重新執行。",
		linkage: "單據聯查",
		linkageSetting: "單據聯查設置",
		buttonConfirm: "我知道了",
		
		//longer-ui-setting.js
		general: "全部圖表",
		showLegend: "顯示圖例",
		showTop: "顯示前",
		otherAs: "項，其餘項顯示為\"其它\"。",
		showChartLabelAs: "當顯示圖表標籤時，展現：",
		chartLabelAsName: "名稱",
		chartLabelAsNumber: "數值",
		chartLabelAsPercent: "百分比",
		pieChartNegative: "當數據為負值時：",
		hideNegative: "忽略",
		absNegative: "按絕對值計算",
		parallelMeasureLayout: "多個度量並列排布：",
		parallelMeasureAtColumn: "左右（度量名稱顯示在上表頭）",
		parallelMeasureAtRow: "上下（度量名稱顯示在左表頭）",
		totalPosition: "小計/總計顯示在：",
		totalAhead: "前面",
		totalBehind: "後面",
		frozen: "凍結表頭：",
		frozenTop: "上表頭",
		frozenLeft: "左表頭",
		
		//longer-ui-exhibition.js
		viewData: "查看數據",
		tooMuchColumns: "列數太多不能顯示完整，嘗試把資料多的欄位放到行上。",
		dragRowHeight: "調整行高",
		dragColumnWidth: "調整列寬",
		sort: "排序",
		sortField: "修改#1的排序方式為：",
		sortRows: "行排序：",
		sortColumns: "列排序：",
		incompleteTemplate: "無可視化內容。可能是：\n1、篩選器過濾掉全部數據；\n2、缺少分析字段。",
		promptLazyLoading: "共#1行，已加載#2行。",
		promptAllRowsLoaded: "共#1行，已全部加載。",
		expandOrCollapse: "展開/收起",
		
		//longer-charts.js
		dragTextField: "將文本欄位拖到這裡。",
		tryDragTextField: "嘗試將文本欄位拖到這裡。",
		tryDragTextFieldAsSeries: "嘗試將文本欄位拖到這裡作為系列。",
		dragNumField: "將數值欄位拖到這裡。",
		dragNumAndTextField: "將一個數值欄位和一個文本欄位拖到這裡。",
		tryDragDateField: "嘗試將日期欄位拖到這裡。",
		onlyOneFieldForColor: "只能有一個欄位展現為顏色。",
		onlyOneFieldForAngle: "只能有一個欄位作為角度。",
		onlyOneFieldForSize: "只能有一個欄位表示大小。",
		useDimensionForColor: "用維度表示顏色。",
		useMeasureForSize: "用度量表示大小。",
		seriesConflictPrompt: "已使用維度值表示多個顏色（系列），不能同時出現多個度量。",
		table: "表格",
		tableRowColCardPrompt: "當圖表類型為“表格”，行/列上不能有度量。",
		tableMarkCardPrompt: "數值區域中不能有維度，嘗試拖到行/列上。",
		heatmap: "熱力圖",
		heatmapRowColCardPrompt: "當圖表類型為“熱力圖”，行/列上不能有度量。",
		heatmapMarkCardPrompt: "數值區域中不能有維度，嘗試拖到行/列上。",
		chartPie: "餅圖",
		pieRowColCardPrompt: "當圖表類型為“餅圖”，行/列上不能有度量。",
		pieMarkCardPrompt: "用維度表示顏色，用度量表示角度。",
		chartLine: "折線圖",
		chartLineRowCardPrompt: "當圖表類型為“折線圖”，行上只能有一個度量。",
		chartLineColCardPrompt: "當圖表類型為“折線圖”，列上不能有度量。",
		chartMLine: "多系列折線圖",
		chartMLineColCardPrompt: "當圖表類型為“多系列折線圖”，列上不能有度量。",
		chartArea: "面積圖",
		chartAreaColCardPrompt: "當圖表類型為“面積圖”，列上不能有度量。",
		chartBar: "柱形圖",
		chartBarRowColCardPrompt: "當圖表類型為“柱形圖”，度量不能同時出現在行、列上。",
		chartStackedBar: "多系列/堆疊 柱形圖",
		chartStackedBarRowColCardPrompt: "當圖表類型為“多系列/堆疊柱形圖”，度量不能同時出現在行、列上。",
		chartTreeMap: "樹圖",
		chartTreeMapRowColCardPrompt: "當圖表類型為“樹圖”，行/列上不能有度量。",
		chartScatter: "散點/氣泡圖",
		chartScatterRowColCardPrompt: "當圖表類型為“散點圖”，要求行列上各有且只有一個度量。",
		chartScatterMarkCardPrompt: "只能有一個表示類別的維度。"
	});
	
	oPackage = com.kingdee.bos.qing.core.model;
	oManager.registPackageResources(oPackage, 
	{
		sum: "求和",
		avg: "平均",
		count: "計數",
		cntd: "去重計數",
		max: "最大",
		min: "最小",
		median: "中位數",
		aggregation: "聚合",
		year: "年",
		quarter: "季度",
		month: "月",
		day: "日",
		yearQuarter: "年季",
		yearMonth: "年月",
		yearMonthDay: "年月日",
		lastPeriodValue: "上期值",
		lastPeriodDiff: "環比差額",
		lastPeriodRatio: "環比增長率",
		samePeriodLastYearValue: "去年同期值",
		samePeriodLastYearDiff: "同比差額",
		samePeriodLastYearRatio: "同比增長率",
		runningSum: "累計",
		runningSumY: "年內累計",
		ratio10: "分組內同一行",
		ratio01: "分組內同一列",
		ratio11: "分組內同一塊",
		ratio90: "整行",
		ratio09: "整列",
		ratio99: "整表",
		sortDesc: "降序",
		sortAsc: "升序",
		sortNone: "無",
		filterFieldInvalid: "無效的欄位",
        filterDataTypeUnmatched: "欄位數據類型\n與篩選器不匹配"
	});
	
	oPackage = com.kingdee.bos.qing.core.controller;
	oManager.registPackageResources(oPackage, 
	{
		changeAggregation: "改變#1聚合方式",
		changeRole: "改變#1維度/度量",
		addFilterValue: "添加篩選值",
		moveFilterValue: "移除篩選值",
		modifyFilterValue: "修改篩選值",
		appendAllNecessaryDimensions: "一鍵添加必要欄位"
	});
	
	oPackage = com.kingdee.bos.qing.longer.controller;
	oManager.registPackageResources(oPackage, 
	{
		clearModel: "清除",
		moveField: "移動",
		addField: "添加",
		replaceField: "替換分析欄位",
		removeField: "刪除",
		setMarkType: "設置#1值展現方式",
		expandHierachy: "展開",
		collapseHierachy: "收起"
	});
	
	oPackage = com.kingdee.bos.qing.square.controller;
	oManager.registPackageResources(oPackage, 
	{
		moveItem: "在#1中移動#2",
		appendItem: "添加#1到#2",
		removeItem: "从#1刪除#2",
		rollInTo: "下鉆#1到：#2",
		rollInToNext: "下一層",
		rollOutTo: "上鉆回#1",
		rollOutToTop: "頂層"
	});
	
	oPackage = com.kingdee.bos.qing.square.model;
	oManager.registPackageResources(oPackage, 
	{
		invalidRole: "維度/度量用法不正確",
		onlyDimensionAllowed: "此處只能出現維度。",
		onlyMeasureAllowed: "此處只能出現度量。",
		seriesConflictPrompt: "已使用維度值表示多個系列，不能同時出現多個度量。",
		exceedCountLimit: "超出個數限制",
		progressCompletedRate: "完成率"
	});
	
	oPackage = com.kingdee.bos.qing.square.ui;
	oManager.registPackageResources(oPackage, 
	{
		//square-ui.js
		clear: "清除",
		exeImmediately: "即時執行",
		exeImmediatelyCurrent: "當前為“暫緩執行”模式，點擊切換為“即時執行”",
		exeDelay: "暫緩執行",
		exeDelayCurrent: "當前為“即時執行”模式，點擊切換為“暫緩執行”",
		previewSetup: "預覽尺寸",
		changePreviewSetup: "切換預覽尺寸為：#1",
		defaultExhibitionTitle: "卡片預覽",
		prepareToStart: "請開始你的表演~~~",
		missingNecessaryField: "以下位置缺少欄位",
		filterCardTitle: "篩選器",
		chartTypeCardTitle: "圖表類型",
		changeChartTypeTo: "圖表類型切換為：#1",
		moveItemBetweenCards: "移動#1，从#2到#3",
		dataFormatForNumber: "數位格式",
		dataFormatForDate: "日期格式",
		rename: "重命名",
		remove: "移除",
		mode: "模式",
		sort: "排序",
		dimension: "維度",
		measure: "度量",
		exactValue: "精確值",
		quickSetup: "按日期計算",
		rangeForAllValues: "範圍包括全部值",
		rangeForRelevantValues: "範圍僅包括相關值",
		optionForAllValues: "備選值為全部值",
		optionForRelevantValues: "備選值僅為相關值",
		multiSelected: "多選",
		singleSelected: "單選",
		filterSelectData: "數據篩選",
		filterChangeProperty: "篩選器#1: #2",
		outsideAllowed: "允許閱讀者自行篩選",
		outsideAllowedTrue: "是",
		outsideAllowedFalse: "否",
		notExistField: "不存在的欄位",
		invalidField: "無效的欄位",
		invalidAggregation: "聚合方式不正確",
		exceedCountLimit: "超出個數限制",
		filterDialogTitle: "#1數據篩選",
		executingCanceled: "當前執行已被取消。",
		executingRetry: "重新執行",
		
		//square-charts.js
		chartColumn: "多系列柱形圖",
		chartBar: "多系列條形圖",
		chartStackColumn: "堆疊柱形圖",
		chartPercentStackColumn: "百分比堆疊柱形圖",
		chartStackBar: "堆疊條形圖",
		chartPercentStackBar: "百分比堆疊條形圖",
		chartLine: "折線圖",
		chartArea: "面積圖",
		chartPercentArea: "百分比面積圖",
		chartPie: "餅圖",
		chartRing: "環形圖",
		chartRose: "玫瑰圖",
		chartKpi: "業務指標",
		chartMap: "地圖",
		chartGis: "GIS地圖",
		chartRadar: "雷達圖",
		chartProgressBar: "條形進度圖",
		chartProgressColumn: "柱形進度圖",
		chartProgressCircle: "環形進度圖",
		chartDial: "儀錶圖",
		chartComposite: "組合圖",
		chartGrid: "列表",
		chartCustomList: "自定義列表",
		chartWaterfall: "瀑布圖",
		chartFunnel: "漏斗圖",
		chartScatter: "散點/氣泡圖",
		chartRectTree: "樹圖",
		chartSunburst: "旭日圖",
		roll: "可鉆取到",
		xAxis: "橫軸",
		yAxis: "縱軸",
		series: "系列",
		stack: "堆疊",
		angle: "角度",
		color: "顏色",
		size: "大小",
		radius: "半徑",
		caption: "名稱",
		infomation: "詳細信息",
		longitudeLatitude: "經度、緯度",
		detail: "細分",
		primaryKpi: "主指標",
		secondaryKpi: "副指標",
		dimensionForMap: "地域",
		measureForMap: "數值（顏色）",
		dimensionForRadar: "維度",
		measureForRadar: "度量",
		desiredProgress: "目標值",
		completedProgress: "實際值",
		pointerValue: "指針值",
		leftYAxis: "左軸",
		rightYAxis: "右軸",
		leftSeries: "系列（左）",
		rightSeries: "系列（右）",
		gridColumnSet: "列",
		customListFieldSet: "欄位",
		waterfallMeasure: "縱軸",
		waterfallClause: "橫軸（條目）",
		waterfallStage: "橫軸（階段）",
		dragTextFieldHere: "將文本欄位拖到這里。",
		dragDateFieldHere: "將日期欄位拖到這里。",
		dragNumberFieldHere: "將數值欄位拖到這里。",
		dragAnyFieldHere: "將任意欄位拖到這裡。",
		dragGeographicFieldHere: "將表示地域的欄位拖到這里。",
		dragLongitudeLatitudeFieldHere: "將表示經度、緯度的兩個欄位依次拖到這里。",
		tryDragTextFieldHere: "嘗試將文本欄位拖到這里。",
		tryDragDateFieldHere: "嘗試將日期欄位拖到這里，并設置為更小的時間粒度。",
		tryDragNumberFieldHere: "嘗試將數值欄位拖到這里。",
		chartmapTemplateNeeded: "未設置地圖模板。",
		
		//squre-ui-setting.js
		changeProperty: "修改屬性",
		data: "數據",
		plotArea: "繪圖區",
		legend: "圖例",
		animation : "動畫",
		chartProgress: "進度圖",
		itemNone: "(無)",
		itemEmpty: "未設置",
		dataAssociation: "數據穿透",
		dataExamining: "查看數據",
		dataExaminingDescription: "支持點擊查看",
		dataExaminingOn: "開啟",
		dataExaminingOff: "關閉",
		linkage: "單據聯查",
		linkageTarget: "聯查目標",
		linkageInputterDisplay: "已設置#1項目標",
		linkageDisabledPrompt: "當前數據源類型不支持單據聯查。",
		affection: "聯動",
		affectionSrcField: "聯動源欄位",
		common: "通用",
		showDataEmptyTips: "無數據時提示",
		showDataEmptyTipsAuto: "（按圖表）自動",
		showDataEmptyTipsYes: "開",
		showDataEmptyTipsNo: "關",
		introduction: "卡片說明",
		conditionStyle: "條件樣式",
		conditionStyleInputterDisplay: "已設置#1項",
		conditionStyleAppend: "添加一行腳本",
		palette: "調色板",
		paletteCustom: "自定義",
		paletteDefault: "系統默認",
		paletteDefaultPrompt: "（自動適配外觀風格）",
		paletteResetToPreset: "重置",
		paletteResetToPresetWhite: "適配“淡雅白”",
		paletteResetToPresetDarkBlue: "適配“深邃藍”",
		paletteResetToPresetGold: "適配“土豪金”",
		paletteResetToPresetCyan: "適配“靜謐青”",
		paletteCopy: "複製",
		paletteCopyAsk: "是否將當前自定義設置複製到剪貼板？",
		paletteCopySuccess: "已複製到剪貼板。",
		paletteCopyInvalid: "無效的自定義設置，不能複製。",
		palettePaste: "粘貼",
		palettePasteAsk: "是否從剪貼板復原自定義設置？",
		palettePasteSuccess: "已從剪貼板復原。",
		palettePasteInvalid: "剪貼板沒有內容。",
		paletteSettingTabColor: "顏色",
		paletteSettingTabMapping: "值映射",
		paletteMappingNoColorField: "沒有表示顏色的維度欄位，不能做值映射。",
		paletteMappingToContinue: "繼續",
		paletteMappingPrompt1: "如果確實不使用中間的顏色（接下一頁）",
		paletteMappingPrompt2: "（承上一頁）應該在顏色“自定義”中將用不到的顏色調整到后面或者刪除掉。",
		dataLabelFormat: "標籤數字格式",
		dataLabelFormatFollowAxis: "跟隨數軸",
		dataLabelOverlappable: "標籤允許重疊",
		dataLabel: "數據標籤",
		dataLabelForColumn: "柱子",
		dataLabelForLine: "折線",
		dataLabelForColumnLine: "柱子+折線",
		dataLabelNone: "無",
		showDataLabelAs: "標籤顯示",
		showDataLabelAsName: "名稱",
		showDataLabelAsNumber: "數值",
		showDataLabelAsPercent: "百分比",
		topN: "前N項",
		topNItem: "前 #1 項及“其它”",
		negativeAs: "負數",
		negativeAsNone: "忽略",
		negativeAsAbs: "按絕對值計算",
		showTotal: "顯示總計",
		averageAngle: "平分角度",
		legendOrderBy: "條目順序",
		legendOrderByAuto: "自動",
		legendOrderByValue: "按大小",
		legendOrderByName: "按名稱",
		legendPosition: "位置",
		legendHide: "隱藏",
		legendRight: "右側",
		legendBottom: "底部",
		axisUnit: "標題/單位",
		axisAssistantLine: "網格線",
		numberFormat: "數字格式",
		numberFormatFollowField: "跟隨度量欄位",
		rulerScale: "標尺比例",
		rulerScaleAuto: "自動識別",
		rulerScaleLinear: "線性",
		rulerScaleLog: "對數",
		rulerScope: "數軸範圍",
		rulerScopeMin: "最小值",
		rulerScopeMax: "最大值",
		rulerScopeAuto: "自動",
		rulerScopeFixed: "固定",
		rulerStart: "零刻度",
		rulerStartZero: "包含零刻度",
		rulerStartNonzero: "允許不包含零刻度",
		refline: "參考線",
		reflineItem: "已設置#1條參考線",
		order: "排序",
		orderAsc: "升序",
		orderDesc: "降序",
		orderNone: "無",
		orderByRatio: "（按完成率）",
		sortAccording: "排序依據",
		sortAccordingDefault: "系統默認",
		sortAccordingMeasure: "指定度量",
		sortAccordingCustom: "自定義",
		sortAccordingMeasureIndex: "第#1個度量",
		sortAccordingPrompt1: "當前綁定的欄位少于2個度量，已自動將之前設置的“指定度量”修復為“系統默認”。",
		sortAccordingPrompt2: "之前指定的第#1個度量不存在，已修復為第1個度量。",
		sortAccordingPrompt3: "無效的欄位#1，已自動將之前設置的“自定義”修復為“系統默認”。",
		sortAccordingPrompt4: "由于欄位數據類型變化、內容變化或其它相關原因，已自動將之前設置的聚合方式“#1”修復為“#2”。",
		sortAccordingPrompt5: "找不到欄位“#1”，已自動將之前設置的“自定義”修復為“系統默認”。",
		sortAccordingPromptPostfix: "按“確定”按鈕完成修改。",
		topnItems: "條目數",
		topnOthers: "其它條目",
		topnOthersNone: "不顯示",
		topnOthersAsAnItem: "合併成一項",
		dataEmptyInstead: "無數據時顯示",
		kpiCaptionLine: "摘要",
		kpiPreText: "前置文字",
		kpiPostText: "後置文字",
		kpiStyleGroup: "樣式",
		kpiStyleCaption: "主指標摘要",
		kpiStylePrimaryValue: "主指標數值",
		kpiStylePrimaryText: "主指標文字",
		kpiStyleSecondaryValue: "副指標數值",
		kpiStyleSecondaryText: "副指標文字",
		kpiRowOfCaption: "主指標摘要所在行",
		kpiRowOfPrimary: "主指標所在行",
		kpiRowOfSecondary: "副指標所在行",
		mapTemplate: "地圖模板",
		mapRegionMapping: "地域映射",
		mapNoTemplatePrompt: "請先指定地圖模板。",
		mapNoDimensionPrompt: "請先綁定表示地域的欄位。",
		mapTemplateNotFound: "找不到模板",
		mapRegionNotFound: "找不到地圖信息。",
		mapRegion: "地圖上的區域",
		mapDimensionMember: "數據",
		mapRegionItemText: "已映射#1項",
		//dimensionForMap: "地域"
		gisThird: "地圖類型",
		gisThirdBaidu: "百度地圖",
		gisUsage: "標記",
		gisUsageMarker: "位置標記",
		gisUsageBubble: "氣泡",
		gisCustomScript: "自定義腳本",
		radarOuterCircleMode: "多邊形模式",
		radarRulerMarkLabel: "刻度值",
		radarRulerMarkLabelFormat: "刻度值格式",
		radarAreaFillColor: "填充顏色",
		radarDimension: "維度值",
		radarMeasure: "度量欄位",
		radarAsOuterCircle: "#1與頂點對應",
		progressCompletion: "完成率",
		progressDecimalDigit: "百分比小數位",
		progressPercentageCeiling: "封頂",
		progressPercentageCeilingY: "最大100%",
		progressPercentageCeilingN: "允許超過100%",
		progressLabelText: "標籤",
		progressThickness: "進度條內徑",
		dialPan: "錶盤",
		dialPointer: "指針",
		dialSection: "分段",
		dialSectionCount: "#1個分段",
		dialSectionAppend: "添加分段",
		dialSectionFrom: "從",
		dialSectionTo: "到",
		dialSectionColor: "顏色",
		dialSectionColorDefault: "預設",
		dialSectionLabel: "標籤",
		dialSectionBoundaryBindField: "欄位",
		dialSectionBoundaryConstant: "數值",
		dialSectionPromptA1: "未設置完整。",
		dialSectionPromptA2: "分段數值必須遞增。",
		dialSectionPromptA3: "當只有一個分段時才可以選擇顏色為“#1”。",
		dialSectionPromptB1: "無效的自定義欄位#1。",
		dialSectionPromptB2: "由于欄位的數據類型變化、自定義欄位的內容變化或其它相關原因，之前設置的聚合方式“#1”已不適用。",
		dialSectionPromptB3: "找不到欄位“#1”。",
		dialArc: "盤面圓弧",
		dialArcSemiCircle: "半圓",
		dialArcQuasiCircle: "準圓",
		dialPanStyle: "盤面風格",
		dialPanStyleMark: "刻度型",
		dialPanStyleTrack: "色塊型",
		dialRulerMark: "刻度值",
		dialRulerMarkFormat: "刻度值格式",
		dialPointerName: "名稱",
		gridShowHeader: "表頭",
		gridShowRowNum: "行號",
		gridRowNumTitle: "行號標題",
		gridShowTopN: "顯示前幾行",
		gridShowTopRows: "顯示行數",
		gridSortField: "排序欄位",
		gridNoSortField: "無（按維度）",
		gridSortord: "排序方式",
		gridAutoScroll: "自動滾動",
		gridStickTopN: "凍結前幾行",
		gridStickTopRows: "凍結行數",
		clistContent: "內容",
		clistContentDisplay: "#1個顯示區域",
		clistSplitlineColor: "分隔線顏色",
		clistAskAbort: "是否放棄當前的修改？",
		clistPromptWarning: "存在未解決的問題。",
		clistPrompt1: "顯示區域範圍超出行寬#1。",
		clistPrompt2: "顯示區域範圍超出行高#1。",
		clistPrompt3: "在表頭、表尾綁定維度沒有意義，但可以綁定度量作為總計。",
		clistPrompt4: "只有在綁定度量時才可以繪製數據條。",
		clistSettingGroupWhole: "表",
		clistSettingGroupPreview: "預覽",
		clistSettingGroupAttr: "#1屬性",
		clistSettingGroupContent: "#1內容",
		clistHead: "表頭",
		clistTail: "表尾",
		clistBody: "表體",
		clistRowHeight: "行高",
		clistAppendArea: "添加顯示區域",
		clistRectX: "位置-左",
		clistRectY: "位置-上",
		clistRectWidth: "大小-寬",
		clistRectHeight: "大小-高",
		clistCustomTextPlaceholder: "在此處填寫文字",
		clistCustomText: "填寫文字",
		clistBindField: "綁定欄位",
		clistBindFieldWhich: "第#1個欄位",
		clistColorBar: "數據條",
		clistColorBarPositive: "正數顏色",
		clistColorBarNegative: "負數顏色",
		clistColorBarNegativeDefault: "與正數相同",
		clistColorBarAxis: "零刻度軸顏色",
		clistColorBarAxisDefault: "無",
		clistColorBarScopeMin: "最小值",
		clistColorBarScopeMax: "最大值",
		clistColorBarScopeNumber: "數值",
		clistColorBarScopeAuto: "自動",
		clistBodyVAlign: "垂直方向",
		clistBodyVAlignTop: "總是從頂部開始",
		clistBodyVAlignMiddle: "空間充足時居中",
		clistBodyShareToRow: "動態行高",
		clistBodyShareToRowNone: "關閉",
		clistBodyShareToRowReducable: "當出現滾動時壓縮",
		clistBodyShareToRowIncreasable: "當空間充足時伸展",
		clistBodyShareToRowAdjustable: "壓縮或伸展",
		styleAlign: "對齊",
		styleAlignLeft: "左對齊",
		styleAlignCenter: "居中",
		styleAlignRight: "右對齊",
		styleColor: "顏色",
		styleBackgroundColor: "背景顏色",
		styleFontSize: "字號",
		styleFontStyle: "字形",
		styleFontStyleNormal: "常規",
		styleFontStyleBold: "粗體",
		tooltips: "懸停信息",
		tooltipsAutoDisplayOn: "自動展示",
		tooltipsAutoDisplayDuration: "每項時長(秒)",
		tooltipsSorted: "按數值有序",
		waterfallSingleDim: "單維度模式",
		waterfallDoubleDim: "雙維度模式（有階段）",
		waterfallStartFrom: "起始於",
		waterfallStartFromClause: "條目",
		waterfallStartFromStage: "第一階段彙總",
		waterfallSortBy: "條目順序",
		waterfallSortByMeasure: "按度量",
		waterfallSortByName: "按名稱",
		waterfallNegitiveOrder: "負值",
		waterfallNegitiveOrderAsc: "大塊在前",
		waterfallNegitiveOrderDesc: "小塊在前",
		waterfallNegativeTopN: "負值前N項",
		waterfallPositiveTopN: "正值前N項",
		waterfallPatettePositive: "條目正值",
		waterfallPatetteNegative: "條目負值",
		lineSmooth: "平滑曲線",
		linePoint: "折線數據點",
		lineNullAsZero: "空值繪製為零",
		funnelLadder: "梯形外觀",
		funnelLadderPerfect: "整體梯形",
		funnelLadderActual: "逐級梯形",
		funnelLabelName: "名稱標籤位置",
		funnelLabelValue: "數值標籤位置",
		funnelLabelPercent: "比率標籤位置",
		funnelLabelPositionLeft: "左",
		funnelLabelPositionCenter: "中",
		funnelLabelPositionRight: "右",
		funnelLabelPositionHide: "隱藏",
		funnelSortBy: "排序",
		funnelSortByName: "按名稱",
		funnelSortByMeasure: "按度量從大到小",
		funnelRatioBy: "比率計算方式",
		funnelRatioByStep: "逐級差異",
		funnelRatioByStart: "占第一層百分比",
		funnelRatioByTotal: "占合計百分比",
		funnelRatioFormat: "比率格式",
		
		//square-ui-exhibition
		itemsAndSoOn: "其它#1項",
		drillDownPcd: "鉆取到欄位#1的維度成員“#2”的下一層級",
		drillDownField: "鉆取到欄位#1",
		drillDown: "向下鉆取",
		drillUp: "返回",
		drillUpToTop: "返回到頂層",
		affectionConfirm: "聯動",
		affectionCancel: "取消聯動",
		linkageJumper: "單據聯查",
		waiting: "請稍候",
		chartInfo: "圖表信息",
		chartInfoMoreFilters: "更多外部篩選器",
		chartInfoAffectionFilters: "聯動篩選器",
		insight: "洞察",
		insightNoMeasure: "沒有度量欄位。",
		insightNoData: "沒有數據。",
		insightLevel: "级别",
		insightLevelBasic: "簡要",
		insightLevelAdvanced: "詳細",
				
		//Integration
		cardFullArea: "全畫面",
		cardCommonName: "卡片"
	});
})();