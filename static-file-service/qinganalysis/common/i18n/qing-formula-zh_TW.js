(function()
{
	var oManager = com.kingdee.bos.qing.framework.common.MultilanguageManager;
	var oPackage = com.kingdee.bos.qing.functions;
	var sNextLineTab = "<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
	oManager.registPackageResources(oPackage, 
	{
		//函數開始
		all:"全部",
		string: "字串",
		dateAndTime: "日期和時間",
		logic: "邏輯",
		mathAndTriangle: "數學與三角",
		conversion: "類型轉換",
		aggregate: "聚合",
		viewCalculating: "視圖計算",
		misc: "其它",
		
		LEN_PARAM:"目標字串。",
		LEN_DESC:"計算字串中的字元個數。",
		LEN_RETURN:"整數",
		LEN_EXAMPLE:"例1：LEN(\"ABCDE\")，返回值為5。"
					+sNextLineTab+"例2：LEN(\"BOS輕分析\")，返回值為6。",
		
		LEFT_PARAM1:"要截取的字串。",
		LEFT_PARAM2:"長度值。",
		LEFT_DESC:"截取字串左邊指定長度的字串。",
		LEFT_RETURN:"字串",
		LEFT_EXAMPLE:"，返回值為\"ABC\"。",
		
		MID_PARAM1:"目標字串。",
		MID_PARAM2:"開始位置。",
		MID_PARAM3:"截取長度。",
		MID_DESC:"截取字串中間的子串。",
		MID_RETURN:"字串",
		MID_EXAMPLE:"，返回值為\"BCD\"。",
		
		RIGHT_PARAM1:"要截取的字串。",
		RIGHT_PARAM2:"長度值。",
		RIGHT_DESC:"截取字串右邊指定長度的子串。",
		RIGHT_RETURN:"截取長度。",
		RIGHT_EXAMPLE:"，返回值為\"CDE\"。",
		
		TRIM_PARAM: "目標字串。",
		TRIM_DESC: "去除字串前后的空格。",
		TRIM_RETURN: "字串",
		TRIM_EXAMPLE: "，返回值為\"ABD\"。",
		
		LOWER_PARAM: "目標字串。",
		LOWER_DESC: "將字串中的所有大寫字母轉換為小寫字母。",
		LOWER_RETURN: "大寫字母替換成小寫字母后的字串",
		LOWER_EXAMPLE: "，返回值為\"abcde\"。",
		
		UPPER_PARAM: "目標字串。",
		UPPER_DESC: "將字串中的所有小寫字母轉換為大寫字母。",
		UPPER_RETURN: "小寫字母替換成大寫字母后的字串",
		UPPER_EXAMPLE: "，返回值為\"ABCDE\"。",
		
		FIND_PARAM1: "要查找的子串。",
		FIND_PARAM2: "目標字串。",
		FIND_PARAM3: "从目標字串的此位置開始查找，缺省為1。",
		FIND_DESC: "查找子串在字串中的位置。如果定義了起始參數，则會忽略在起始位置之前出現的所有子字串實例。字串中的第一個字元為位置1。"
										+sNextLineTab+"FIND函數区分大小寫并且不允许使用通配符。另參考SEARCH函數。",
		FIND_RETURN: "正整數。"+sNextLineTab+"如果未找到子字串，则返回0。",
		FIND_EXAMPLE: "例1：FIND(\"M\", \"Miriam McGovern\")，返回\"Miriam McGovern\"中第一個\"M\"的位置1。"
												+sNextLineTab+"例2：FIND(\"m\", \"Miriam McGovern\") ，返回\"Miriam McGovern\"中第一個\"m\"的位置6。"
												+sNextLineTab+"例3：FIND(\"M\", \"Miriam McGovern\", 3)，返回从\"Miriam McGovern\"的第三個字元開始查找的第一個\"M\"的位置8。",
		
		SUBSTITUTE_PARAM1: "目標字串。",
		SUBSTITUTE_PARAM2: "目標字串中將被替換的子串。",
		SUBSTITUTE_PARAM3: "新的子串。",
		SUBSTITUTE_PARAM4: "该數值指定第几次出现的oldSubStr才被替換。如果此參數缺省，所有oldSubStr都被替換。",
		SUBSTITUTE_DESC: "將字串中指定的子串替換成新的内容。",
		SUBSTITUTE_RETURN: "替換后的字串。"+sNextLineTab+"如果未找到子字串oldSubStr，则字串保持不變，返回str。",
		SUBSTITUTE_EXAMPLE: "SUBSTITUTE(\"销售數据\", \"销售\", \"成本\")，返回\"成本數据\"。",
		
		SEARCH_PARAM1: "要查找的子串。",
		SEARCH_PARAM2: "目標字串。",
		SEARCH_PARAM3: "从目標字串的此位置開始查找，缺省為1。",
		SEARCH_DESC: "查找子串在字串中的位置。"+sNextLineTab+"SEARCH函數忽略大小寫。另參考FIND函數。",
		SEARCH_RETURN: "正整數。"+sNextLineTab+"如果未找到子字串，则返回0。",
		SEARCH_EXAMPLE: "例1：SEARCH(\"e\", \"Statements\", 6)，从\"Statements\"的第6個字元開始找e，结果為7。"
													+sNextLineTab+"例2：SEARCH(\"margin\", \"Profit Margin\")，返回\"margin\"在\"Profit Margin\"中的位置8。",
		
		REPLACE_PARAM1: "目標字串。",
		REPLACE_PARAM2: "替換的起始位置。",
		REPLACE_PARAM3: "將被替換掉的字元個數。",
		REPLACE_PARAM4: "指定部分替換成该子串。",
		REPLACE_DESC: "將字串中指定部分替換成新的内容。",
		REPLACE_RETURN: "替換后的字串",
		REPLACE_EXAMPLE: "，从第6個字元開始的5個字元替換成*，结果為abcde*k。",
		
		REPT_PARAM1: "要重复的字串。",
		REPT_PARAM2: "重复次數。",
		REPT_DESC: "重复字串。",
		REPT_RETURN: "字串重复对应次數后的新字串。"+sNextLineTab+"如果times為 0，则返回空串(\"\")。"
								+sNextLineTab+"如果 times不是整數，则將被截尾取整后使用。",
		REPT_EXAMPLE: "，返回值為\"ABABAB\"。",

        SPLIT_PARAM1:"分隔符，根據此參數對字串進行分割。",
        SPLIT_PARAM2:"索引，字串根據separator參數分割成幾個子串，此參數指定保留其中的第幾個子串，正數從字串的開頭算起，負數從字串的末尾算起。",
        SPLIT_DESC:"根據分隔符截取字串中間的子串",
        SPLIT_RETURN:"截取的子串。",
        SPLIT_EXAMPLE:"例1：SPLIT(\"CN-2017-ccb36601\",\"-\",2)，返回值為2017。" +sNextLineTab+
            "例2：SPLIT(\"CN:2017:ccb36601\",\":\",-1)，返回值為ccb36601。",

		YEAR_PARAM: "日期。",
		YEAR_DESC: "取出日期值中的年份。",
		YEAR_RETURN: "整數",
		YEAR_EXAMPLE: "，返回值為2008。",
		
		MONTH_PARAM: "日期。",
		MONTH_DESC: "取出日期值中的月份。",
		MONTH_RETURN: "整數（1~12）",
		MONTH_EXAMPLE: "，返回值為10。",
		
		DAY_PARAM: "日期。",
		DAY_DESC: "取出日期值中的日的值。",
		DAY_RETURN: "整數（1~31）",
		DAY_EXAMPLE: "，返回值為1。",
		
		QUARTER_PARAM: "日期。",
		QUARTER_DESC: "返回该日期在當年的第几個季度。",
		QUARTER_RETURN: "整數（1~4）",
		QUARTER_EXAMPLE: "，返回值為2。",
		
		DATE_PARAM1: "可以為一到四位數字（使用1900日期系统）。",
		DATE_PARAM2: "代表每年中月份的數字。",
		DATE_PARAM3: "在上述年月中第几天。",
		DATE_EXTRADESC: "如果year位于0~1899（含）之间，则系统會將该值加上1900，再计算年份。例如：DATE(108,1,2) 將返回2008年1月2日 (1900+108)。"
															+sNextLineTab+"如果year位于1900~9999（含）之间，则系统將使用该數值作為年份。例如：DATE(2008,1,2) 將返回2008年1月2日。",
		DATE_DESC: "返回特定日期对象。",
		DATE_RETURN: "日期值",
		DATE_EXAMPLE: "例1：DATE(2008, 2, 1)，返回2008年2月1日。"
											+sNextLineTab+"例2：如果所输入的月份大于12，將从指定年份的一月份開始往上加算。例如DATE(2008,14,2)返回2009年2月2日。"
											+sNextLineTab+"例3：如果day大于该月份的最大天數，则將从指定月份的第一天開始往上累加。例如DATE(2008,1,35) 返回2008年2月4日。",
	
		DATEDIFF_PARAM1: "起始日期。",
		DATEDIFF_PARAM2: "终止日期。",
		DATEDIFF_PARAM3: "取值包括：\"Y\" / \"M\" / \"D\" / \"MD\" / \"YM\" / \"YD\"。",
		DATEDIFF_EXTRADESC: "type參數的取值："
											+sNextLineTab+"\"Y\" 一段時期内的整年數；"
											+sNextLineTab+"\"M\" 一段時期内的整月數； "
											+sNextLineTab+"\"D\" 一段時期内的天數；"
											+sNextLineTab+"\"MD\" startDate 和 endDate 之间相差的天數，忽略日期中的月份和年份； "
											+sNextLineTab+"\"YM\" startDate 和 endDate 之间相差的月數，忽略日期中的年份； "
											+sNextLineTab+"\"YD\" startDate 和 endDate 之间相差的天數，忽略日期中的年份。 ",
		DATEDIFF_DESC: "计算两個日期间相差的天數、月數或年數。",
		DATEDIFF_RETURN: "整數。當startDate小于endDate且相差年/月/天數不為0時返回正整數；當startDate大于endDate且相差年/月/天數不為0時返回负整數。",
		DATEDIFF_EXAMPLE: "例1：DATEDIFF(TODATE(\"2001-1-1\"), TODATE(\"2003-1-1\"), \"Y\")=2，这段時期包含两個整年。"
											+sNextLineTab+"例2：DATEDIFF(TODATE(\"2001-6-1\"), TODATE(\"2002-8-15\"), \"D\")=440，2001年6月1日和2002年8月15日之间相差440 天。"
											+sNextLineTab+"例3： DATEDIFF(DATE(2001, 6, 1), DATE(2002, 8, 15), \"YD\")=75，6月1日和8月15日之间相差75天，忽略日期中的年份。"
											+sNextLineTab+"例4：DATEDIFF(DATE(2001, 6, 1), DATE(2002, 8, 15), \"MD\")=14，1日和15日（startDate和endDate日期中的相应日）之间相差的天數，忽略日期中的月份和年份。",

		NEXTDAY_PARAM1: "日期。",
		NEXTDAY_PARAM2: "偏移天數，支持小數。",
		NEXTDAY_PARAM3: "偏移月數，整數。",
		NEXTDAY_PARAM4: "偏移年數，整數。",
		NEXTDAY_EXTRADESC: "（當dayOffset，monthOffset和yearOffset全部缺省時相當于dayOffset為1。） ",
		NEXTDAY_DESC: "获取指定偏移条件的日期。",
		NEXTDAY_RETURN: "日期值",
		NEXTDAY_EXAMPLE: "例1：NEXTDAY(TODATE(\"2008-2-15\"))，返回2008-2-16。"
											+sNextLineTab+"例2：NEXTDAY(TODATE(\"2008-2-15\"), 1.5)，返回2008-2-16 12:00。"
											+sNextLineTab+"例3：NEXTDAY(TODATE(\"2008-2-15\"), -1.5)，返回2008-2-13 12:00。"
											+sNextLineTab+"例4：NEXTDAY(TODATE(\"2008-2-15\"), 0, 1)，返回2008-3-15。"
											+sNextLineTab+"例5：NEXTDAY(DATE(2008, 2, 15), 0 , 0, 1)，返回2009-2-15。"
											+sNextLineTab+"例6：NEXTDAY(DATE(2008, 2, 15), 1, 1, 1)，返回2009-3-16。",
		
		FIRSTDAY_PARAM1: "日期。",
		FIRSTDAY_PARAM2: "取值包括：\"YD\"（本年第一天）、 \"MD\" （本月第一天）、 \"WD\"（本周第一天，星期日）。缺省取\"YD\"。",
		FIRSTDAY_DESC: "获取指定类型的第一天。",
		FIRSTDAY_RETURN: "日期值",
		FIRSTDAY_EXAMPLE: "例1：FIRSTDAY(TODATE(\"2008-2-15\"))，返回2008-1-1。"
											+sNextLineTab+"例2：FIRSTDAY(DATE(2008, 2, 15), \"MD\")，返回2008-2-1。"
											+sNextLineTab+"例3：FIRSTDAY(TODATE(\"2008-2-15\"), \"WD\")，返回2008-2-10。",

		LASTDAY_PARAM1: "日期。",
		LASTDAY_PARAM2: "取值包括：\"YD\"（本年最后一天）、 \"MD\" （本月最后一天）、 \"WD\"（本周最后一天，星期六）。缺省取\"YD\"。",
		LASTDAY_DESC: "获取指定类型的最后一天。",
		LASTDAY_RETURN: "日期值",
		LASTDAY_EXAMPLE: "例1：LASTDAY(TODATE(\"2008-2-15\"))，返回2008-12-31。"
											+sNextLineTab+"例2：LASTDAY(DATE(2008, 2, 15), \"MD\")，返回2008-2-29。"
											+sNextLineTab+"例3：LASTDAY(TODATE(\"2008-2-15\"), \"WD\")，返回2008-2-16。",
		
		MONTHDAYS_PARAM: "日期。",
		MONTHDAYS_DESC: "取出日期所在月份的天數。",
		MONTHDAYS_RETURN: "整數",
		MONTHDAYS_EXAMPLE: "，2008年2月份有29天，所以函數返回值為29。",
		
		WEEKDAY_PARAM1: "日期值。",
		WEEKDAY_PARAM2: "类型，取值為1（缺省）、2、3。",
		WEEKDAY_DESC: "返回某日期為星期几。",
		WEEKDAY_RETURN: "當type = 1時，返回1~7，分别代表星期日~星期六。"
												+sNextLineTab+"當type = 2時，返回1~7，分别代表星期一~星期日。"
												+sNextLineTab+"當type = 3時，返回0~6，分别代表星期一~星期日。",
		WEEKDAY_EXAMPLE: "例1：WEEKDAY(TODATE(\"2008-2-14\"))，返回5，表示星期四。"
											+sNextLineTab+"例2：WEEKDAY(TODATE(\"2008-2-14\"), 2)，返回4，表示星期四。"
											+sNextLineTab+"例3：WEEKDAY(TODATE(\"2008-2-14\"), 3)，返回3，表示星期四。",
		
		WEEK_PARAM1: "日期值。",
		WEEK_PARAM2: '每周從星期幾開始，字串"Sunday"（默認）或"Monday"。',
		WEEK_DESC: "自然年中的第幾周。1月1日所在周為該年的第1周。跨年份的同一個星期分別屬於不同年份的不同周。",
		WEEK_RETURN: "返回整數1~54。",
		WEEK_EXAMPLE: "例1：WEEK(DATE(2022,1,1))，返回1，表示2022年的第1周。"
					+sNextLineTab+'例2：WEEK(DATE(2021,12,31),"Monday")，每周從星期一開始，返回53，表示2021年的第53周。',
		
		ISOWEEK_PARAM: "日期值。",
		ISOWEEK_DESC: "符合 ISO 8601 周日曆的一年中第幾周。自然年年初的幾天可能是上一年的52或53周，年底的幾天可能是下一年的第1周，所以應該配合ISOWEEKYEAR()函數使用。",
		ISOWEEK_RETURN: "返回整數1~53，代表周日曆一年當中的第幾周。",
		ISOWEEK_EXAMPLE: "例1：ISOWEEK(DATE(2022,12,31))，返回52，表示周日曆2022年的第52周。"
					+sNextLineTab+"例2：ISOWEEK(DATE(2023,1,1))，返回52，表示周日曆2022年的第52周。"
					+sNextLineTab+"例3：ISOWEEK(DATE(2023,12,31))，返回52，表示周日曆2023年的第52周。",		
		
		ISOWEEKYEAR_DESC: "符合 ISO 8601 周日曆的年。配合ISOWEEK()函數使用。",
		ISOWEEKYEAR_RETURN: "返回年份數值。大部份時間與自然年相同，年初和年底的幾天可能與自然年有差異。",
		
		ISOWEEKDAY_DESC: "符合 ISO 8601 周日曆的一周中第幾天。每周是從星期一開始。",
		ISOWEEKDAY_RETURN: "返回1~7，代表星期一至星期日。",
		ISOWEEKDAY_EXAMPLE: "ISOWEEKDAY(DATE(2023,1,1))，返回7，表示周日曆的當周第7天。",
		
		HOUR_PARAM: "日期值。",
		HOUR_DESC: "取出日期值中的小時。",
		HOUR_RETURN: "整數（0~23）",
		HOUR_EXAMPLE: "，返回值為12。",
		
		MINUTE_PARAM: "日期值。",
		MINUTE_DESC: "取出日期值中的分钟。",
		MINUTE_RETURN: "整數（0~59）",
		MINUTE_EXAMPLE: "，返回值為34。",
		
		SECOND_PARAM: "日期值。",
		SECOND_DESC: "取出日期值中的秒。",
		SECOND_RETURN: "整數（0~59）",
		SECOND_EXAMPLE: "，返回值為56。",
		
		TIME_PARAM1: "小時（0~23）。",
		TIME_PARAM2: "分钟（0~59）。",
		TIME_PARAM3: "秒（0~59）。",
		TIME_DESC: "返回某一特定時间的小數值。",
		TIME_RETURN: "返回0~0.999999之间的小數，代表从0:00:00到23:59:59之间的時间。",
		
		NOW_DESC: "返回包含當前日期和時间的日期对象。",
		
		WORKDAY_PARAM1: "起始時間。",
		WORKDAY_PARAM2: "終止時間。",
		WORKDAY_PARAM3: "行政組織編碼。",
		WORKDAY_DESC: "計算指定時間段內跨幾個工作日。",
		WORKDAY_RETURN: "整數。當傳入組織不存在時，返回空。當傳入時間超過指定組織的工作日曆有效範圍，返回空。",
		WORKDAY_EXAMPLE: '例1：WORKDAY(TODATE("2021-9-1"), TODATE("2021-9-10"), [組織編碼])，從9月1日零點至9月10日零點可能包含了7個工作日，返回7。'
						+sNextLineTab+'例2：WORKDAY(TODATE("2021-9-1 12:00"), TODATE("2021-9-2 12:00"), [組織編碼])，從9月1日中午至9月2日中午，包含了9月2日的工作時間起始點，算一個工作日，返回1。',
		
		WORKHOUR_PARAM1: "起始時間。",
		WORKHOUR_PARAM2: "終止時間。",
		WORKHOUR_PARAM3: "行政組織編碼。",
		WORKHOUR_DESC: "計算指定時間段內的工時。",
		WORKHOUR_RETURN: "整數部份表示小時，不足1小時表示為小數部份。當傳入組織不存在時，返回空。當傳入時間超過指定組織的工作日曆有效範圍，返回空。",
		WORKHOUR_EXAMPLE: '例1：WORKHOUR(TODATE("2021-9-1"), TODATE("2021-9-2"), [組織編碼])，从9月1日零點至9月2日零點可能包含了8個工時，返回8。',
		
		IF_PARAM1: "计算结果為true或false的逻辑運算式。",
		IF_PARAM2: "条件為真時所要返回的值。",
		IF_PARAM3: "条件為假時所要返回的值。",
		IF_DESC: "根据条件返回相应值。",
		IF_RETURN: "數据类型不定，由exp1或exp2决定。",
		IF_EXAMPLE: "IF([订单數] > 500, \"合格\", \"不合格\")。當\"订单數\"字段对应值大于500，则返回\"合格\"，否则返回\"不合格\"。",
		
		CASE_PARAM1: "逻辑運算式，如果结果為真，则返回对应的值運算式计算结果。",
		CASE_PARAM2: "值運算式，和逻辑運算式一一对应。",
		CASE_PARAM3: "缺省值運算式，如果所有逻辑運算式结果都為假，则返回本運算式计算结果。",
		CASE_DESC: "根据多分支条件取值。",
		CASE_RETURN: "數据类型不定，由valueExp(n)或defaultValueExp的运算结果决定。",
		CASE_EXAMPLE: "CASE"
										 +sNextLineTab+"("
										 +sNextLineTab+"[利潤率]>0.8, \"高\","
										 +sNextLineTab+"[利潤率]>0.6, \"中\","
										 +sNextLineTab+"\"低\""
										 +sNextLineTab+")"
										 +sNextLineTab+"當\"利潤率\"字段值大于80%時，则返回\"高\"；若介于60%~80%之间，则返回\"中\"，否则返回\"低\"。",

		AND_PARAM: "计算结果為true或false的逻辑運算式。",
		AND_DESC: "返回所有參數的逻辑與值。",
		AND_RETURN: "逻辑值true或false",
		AND_EXAMPLE: "IF(AND([出生日期] >=TODATE(\"1990-1-1\"), [出生日期] 	<TODATE(\"2000-1-1\")), \"90后\", \"其他\")，當\"出生日期\"字段值在1990-1-1~1999-12-31之间時，则返回\"90后\"，否则返回\"其他\"。",

		OR_PARAM: "计算结果為true或false的逻辑運算式。",
		OR_DESC: "返回所有參數的逻辑或值。",
		OR_RETURN: "逻辑值true或false",
		OR_EXAMPLE: "IF(OR([年龄] >30, [公司工作年限] >=10), \"符合\", \"不符合\")，某公司对升职设置了条件：若年龄大于30岁，或在本公司工作年限大于10年（含），则返回\"符合\"，否则返回\"不符合\"。",

		NOT_PARAM: "计算结果為true或false的逻辑運算式。",
		NOT_DESC: "返回參數的逻辑非值。",
		NOT_RETURN: "逻辑值true或false",
		NOT_EXAMPLE: 'IF(NOT([年龄]>=18), "未成年", "成年")  如果年龄小于18岁，返回"未成年"，否则返回"成年"。',
		
		ABS_PARAM: "需要计算其绝对值的實數。",
		ABS_DESC: "返回數字的绝对值。",
		ABS_EXAMPLE: "例1：ABS(2)，2的绝对值2。"
										 +sNextLineTab+"例2：ABS(-2)，-2的绝对值2。",
		
		MOD_PARAM1: "被除數。",
		MOD_PARAM2: "除數。",
		MOD_DESC: "返回两數相除的余數。",
		MOD_RETURN: "两數相除的余數，结果的正负号與除數相同。如果divisor為零，则返回null。",
		MOD_EXAMPLE: "例1：MOD(3, 2)，3/2 的余數 (1)。"
										 +sNextLineTab+"例2：MOD(-3, 2)，-3/2 的余數，符号與除數相同1。"
										 +sNextLineTab+"例3：MOD(3, -2)，3/-2 的余數，符号與除數相同 -1。"
										 +sNextLineTab+"例4：MOD(-3, -2)，-3/-2 的余數，符号與除數相同 -1。",
		
		ROUND_PARAM1: "需要进行四舍五入的數字。",
		ROUND_PARAM2: "指定的位數，按此位數进行四舍五入。可以取负數，表示小數点左侧。",
		ROUND_DESC: "对數字按指定位數进行四舍五入。",
		ROUND_EXAMPLE: "例1：ROUND(2.15, 1)，將2.15 四舍五入到一個小數位2.2。"
										 +sNextLineTab+"例2：ROUND(2.149, 1)，將2.149 四舍五入到一個小數位2.1。"
										 +sNextLineTab+"例3：ROUND(-1.475, 2)，將-1.475 四舍五入到两小數位-1.48。"
										 +sNextLineTab+"例4：ROUND(21.5, -1)，將21.5 四舍五入到小數点左侧一位20。",

		INT_PARAM1: "需要进行取整的數字。",
		INT_PARAM2: '可选参数，表示取整的舍入模式，取值如下：'
					+sNextLineTab+'"ceiling"，取大于等于number的最小整数；'
			        +sNextLineTab+'"floor"，取小于等于number的最大整数，缺省为此模式；'
			        +sNextLineTab+'"up"，取离0远的方向的最近整数；'
			        +sNextLineTab+'"down"，取离0近的方向的最近整数；'
			        +sNextLineTab+'"half_up"，取距离最近的整数，两头距离一样时相当于"up"（通常的四舍五入，见ROUND函数）；'
			        +sNextLineTab+'"half_down"，取距离最近的整数，两头距离一样时相当于"down"。',
		INT_DESC: "將數字舍入到最接近的整數。",
		INT_RETURN: "取整后的整數",
		INT_EXAMPLE: "例1：INT(8.9)，將8.9 向下舍入到最接近的整數8。"
										 +sNextLineTab+"例2：INT(-8.9)，將-8.9 向下舍入到最接近的整數 -9。",
		
		EXP_PARAM: "為底數e的指數。",
		EXP_DESC: "將返回e的n次幂。常數e等于2.71828182845904，是自然对數的底數。",
		EXP_EXAMPLE: "例1：EXP(1)，返回e的近似值2.718282。"
										 +sNextLineTab+"例2：EXP(2)，返回自然对數的底數e的 2次幂7.389056。",
		
		LN_PARAM: "是用于计算其自然对數的正實數。",
		LN_DESC: "返回一個數的自然对數。自然对數以常數项e(2.71828182845904)為底。",
		LN_EXAMPLE: "例1：LN(86)，86的自然对數4.454347。"
									    	+sNextLineTab+"例2：LN(2.7182818) ，常數项e的自然对數1。"
										    +sNextLineTab+"例3：LN(EXP(3))，e的3次幂的自然对數3。",

		LOG_PARAM1: "為用于计算对數的正實數。",
		LOG_PARAM2: "為对數的底數。如果省略底數，假定其值為10。",
		LOG_DESC: "按所指定的底數，返回一個數的对數。",
		LOG_EXAMPLE: "例1：LOG(10)，10的对數1。"
									    	+sNextLineTab+"例2：LOG(8, 2)，以2為底時，8 的对數3。"
										    +sNextLineTab+"例3：LOG(86, 2.7182818)，以e為底時，86的对數4.454347。",
		
		POWER_PARAM1: "底數，可以為任意實數。",
		POWER_PARAM2: "指數，底數按该指數次幂乘方。",
		POWER_DESC: "返回给定數字的乘幂。",
		POWER_RETURN: "给定數字的乘幂",
		POWER_EXAMPLE: "例1：POWER(5,2)，5的平方25。"
									    	+sNextLineTab+"例2：POWER(98.6, 3.2)，98.6的3.2次方2401077。"
										    +sNextLineTab+"例3：POWER(4, 5/4)，4的5/4次方5.656854。",
		
		SIGN_PARAM: "任意的實數。",
		SIGN_DESC: "返回數字的符号。",
		SIGN_RETURN: "當數字為正數時返回1，為零時返回0，為负數時返回-1。",
		SIGN_EXAMPLE: "例1：SIGN(10)，正數的符号1。"
									    	+sNextLineTab+"例2：SIGN(4-4)，0的符号0。"
										    +sNextLineTab+"例3：SIGN(-0.00001)，负數的符号-1。",
		
		SQRT_PARAM: "要计算平方根的數值。",
		SQRT_DESC: "返回正平方根。",
		SQRT_RETURN: "正實數",
		SQRT_EXAMPLE: "，16 的平方根4。",
		
		PI_DESC: "获取常量pi的值，為3.141593，精確到小數点后6位。",
		
		SIN_PARAM: "弧度。",
		SIN_DESC: "计算给定角度的正弦值。",
		SIN_RETURN: "參數的正弦值",
		SIN_EXAMPLE: "例1：SIN(PI())，pi弧度的正弦值0。"
										 +sNextLineTab+"例2：SIN(PI()/2)，pi/2弧度的正弦值1。"
										 +sNextLineTab+"例3：SIN(30*PI()/180)，30度的正弦值0.5。"
										 +sNextLineTab+"例4：SIN(RADIANS(30))，30度的正弦值0.5。",
		
		ASIN_PARAM: "角度的正弦值，必须介于-1到1之间。",
		ASIN_DESC: "计算參數的反正弦值。",
		ASIN_RETURN: "參數的反正弦值。反正弦值為一個角度，该角度的正弦值即等于此函數的 number 參數。返回的角度值將以弧度表示，范围為 -pi/2 到 pi/2。"
											+sNextLineTab+"（说明：若要用度表示反正弦值，请將结果再乘以180/PI()或用DEGREES函數表示。）",
		ASIN_EXAMPLE: "例1：ASIN(-0.5)，以弧度表示-0.5的反正弦值，即-pi/6 (-0.5236)。"
										 +sNextLineTab+"例2：ASIN(-0.5)*180/PI()，以度表示-0.5的反正弦值-30。"
										 +sNextLineTab+"例3：DEGREES(ASIN(-0.5))，以度表示-0.5的反正弦值-30。",
		
		COS_PARAM: "為需要求余弦的角度，以弧度表示。",
		COS_EXTRADESC: "（说明：如果參數的单位是度，则可以乘以PI()/180或使用RADIANS函數將其轉換成弧度。）",
		COS_DESC: "计算给定角度的余弦值。",
		COS_RETURN: "參數的余弦值",
		COS_EXAMPLE: "例1：COS(1.047)，1.047弧度的余弦值0.500171。"
										 +sNextLineTab+"例2：COS(60*PI()/180)，60度的余弦值0.5。"
										 +sNextLineTab+"例3：COS(RADIANS(60))，60度的余弦值0.5。",

		ACOS_PARAM: "角度的余弦值，必须介于-1到1之间。",
		ACOS_DESC: "计算给定角度的反余弦值。",
		ACOS_RETURN: "參數的反余弦值",
		ACOS_EXAMPLE: "例1：ACOS(-0.5)，以弧度表示-0.5，即2*pi/3 的反余弦值2.094395。"
										 +sNextLineTab+"例2：ACOS(-0.5)*180/PI()，以度表示-0.5的反余弦值120。"
										 +sNextLineTab+"例3：DEGREES(ACOS(-0.5))，以度表示-0.5的反余弦值120。",
		
		TAN_PARAM: "弧度。如果參數的单位是度，则可以乘以PI()/180或使用RADIANS函數將其轉換為弧度。",
		TAN_DESC: "计算给定角度的正切值。",
		TAN_RETURN: "參數的正切值",
		TAN_EXAMPLE: "例1：TAN(0.785)，0.785弧度的正切值0.99920。"
										 +sNextLineTab+"例2：TAN(45*PI()/180)，45度的正切值1。"
										 +sNextLineTab+"例3：TAN(RADIANS(45))，45度的正切值1。",

		ATAN_PARAM: "為角度的正切值。",
		ATAN_DESC: "计算反正切值。",
		ATAN_RETURN: "反正切值。反正切值為角度，其正切值即等于number參數值。返回的角度值將以弧度表示，范围為-pi/2到pi/2。"
											+sNextLineTab+"(说明：若要用度表示反正切值，请將结果再乘以180/PI()或使用 DEGREES函數。)",
		ATAN_EXAMPLE: "例1：ATAN(1)，以弧度表示1的反正切值，即 pi/4(0.785398)。"
										 +sNextLineTab+"例2：ATAN(1)*180/PI()，以度表示1的反正切值45。"
										 +sNextLineTab+"例3：DEGREES(ATAN(1))，以度表示1的反正切值45。",
		
		ATAN2_PARAM1: "点的x坐標。",
		ATAN2_PARAM2: "点的y坐標。",
		ATAN2_DESC: "计算给定的 X及Y坐標值的反正切值。反正切的角度值等于X轴與通过原点和给定坐標点(x, y)的直线之间的夹角。结果以弧度表示并介于-pi到pi之间（不包括-pi）。",
		ATAN2_RETURN: "结果為正表示从X轴逆時针旋轉的角度，结果為负表示从X轴顺時针旋轉的角度。如果 x和 y都為零，ATAN2返回NULL。",
		ATAN2_EXAMPLE: "例1：ATAN2(1, 1)，以弧度表示点 (1,1)的反正切值，即 pi/4(0.785398)。"
										 +sNextLineTab+"例2：ATAN2(-1, -1)，以弧度表示点 (-1,-1)的反正切值，即 -3*pi/4(-2.35619)。"
										 +sNextLineTab+"例3：ATAN2(-1, -1)*180/PI()，以度表示点 (1,1)的反正切值-135。"
										 +sNextLineTab+"例4：DEGREES(ATAN2(-1, -1))，以度表示点 (1,1)的反正切值-135。",
		
		RADIANS_PARAM: "需要轉換成弧度的角度。",
		RADIANS_DESC: "將角度轉換為弧度。",
		RADIANS_RETURN: "弧度",
		RADIANS_EXAMPLE: "，將角度270度轉換為弧度4.712389 或 3π/2 弧度。",
		
		DEGREES_PARAM: "需要轉換成角度的弧度。",
		DEGREES_DESC: "將弧度轉換為角度。",
		DEGREES_RETURN: "角度",
		DEGREES_EXAMPLE: "，pi弧度轉換為度數180。",
		
		MAXIMUM_PARAM: "運算式。",
		MAXIMUM_DESC: "返回多個運算式中的最大值。",
		MAXIMUM_EXAMPLE: "例1：MAXIMUM(1,2,3)，返回值為3。"
												+sNextLineTab+"例2：MAXIMUM([培训開始時间], TODATE(\"2000-1-1\"))，取两值中的较大者，早于2000-1-1的都將被置為2000-1-1。",
		
		MINIMUM_PARAM: "運算式。",
		MINIMUM_DESC: "返回多個運算式中的最小值。",
		MINIMUM_EXAMPLE: "例1：MINIMUM(1,2,3)，返回值為1。"
												+sNextLineTab+"例2：MINIMUM([培训開始時间], TODATE(\"2000-12-31\"))，取两值中的较小者，晚于2008-12-31的都將被置為2008-12-31。",
		
		TOSTRING_PARAM: "運算式。",
		TOSTRING_DESC: "將運算式轉換為字串。",
		TOSTRING_RETURN: "字串",
		TOSTRING_EXAMPLE: "TOSTRING([年龄])，以字串的形式返回\"年龄\"字段的所有值。",
		
		TODATE_PARAM: "運算式。",
		TODATE_DESC: "將運算式轉換為日期对象。",
		TODATE_RETURN: "日期值",
		TODATE_EXAMPLE: "相當于DATE(2006, 6, 15)。",
		
		TONUMBER_PARAM: "運算式。",
		TONUMBER_DESC: "將運算式轉換為數值类型。",
		TONUMBER_RETURN: "數值",
		TONUMBER_EXAMPLE: "，返回數字23.2。",
		
		ZN_PARAM: "數值運算式。",
		ZN_DESC: "如果數值運算式為null，则返回零，否则返回本身。",
		ZN_EXAMPLE: "ZN([利潤])",
		
		SUM_PARAM: "數值運算式。",
		SUM_DESC: "返回數值運算式所有值的总计，忽略null值。",
		SUM_EXAMPLE: "SUM([销售额])，返回\"销售额\"字段对应的所有非空值的总和。",
		
		AVG_PARAM: "數值運算式。",
		AVG_DESC: "返回數值運算式所有值的平均值，忽略null值。",
		AVG_EXAMPLE: "AVG([销售额])，返回\"销售额\"字段对应的所有非空值的平均值。",
		
		MEDIAN_PARAM: "數值運算式。",
		MEDIAN_DESC: "返回數值運算式所有值的中位數，忽略null值。",
		MEDIAN_EXAMPLE: "MEDIAN([销售额])，返回\"销售额\"字段对应的所有非空值的中位數。",
		
		COUNT_PARAM: "運算式。",
		COUNT_DESC: "返回數据条目數，且運算式的值為null時不會计數。",
		COUNT_EXAMPLE: "COUNT([销售额]),返回\"销售额\"字段对应的所有非空值的數据条目數。如销售额字段有1000，1000，500 共三個數值，则COUNT([销售额])结果為3。",
		
		MAX_PARAM: "數值運算式。",
		MAX_DESC: "返回數值運算式所有值的最大值。",
		MAX_EXAMPLE: "MAX([销售额])，返回\"销售额\"字段对应值的最大值。",
		
		MIN_PARAM: "數值運算式。",
		MIN_DESC: "返回數值運算式所有值的最小值。",
		MIN_EXAMPLE: "MIN([销售额])，返回\"销售额\"字段对应值的最小值。",
		
		COUNTD_PARAM: "運算式。",
		COUNTD_DESC: "返回指定字段不重复的值的個數，當值為null時不參與计數。",
		COUNTD_EXAMPLE: "假设若干行數据中，\"性别\"字段有\"男\"、\"女\"两個不同的值，则COUNTD([性别])，返回2。",

		SPLY_PARAM1: "指標表達式。",
		SPLY_PARAM2: "日期維度函數表達式。",
		SPLY_PARAM3: "缺省相當於\"ratio\"，表示同比增長率；\"value\"表示取去年同期值；\"diff\"表示同比差額",
		SPLY_DESC: "指定日期維度，獲取指標的同比、去年同期值或同比差額。",
		SPLY_EXAMPLE: "SamePeriodLastYear(SUM([金額]), DATEPART([訂單日期_年月日], \"YMD\"),value) " +
			"計算金額合計值按日期維度的去年同期值。",

		LP_PARAM1: "指標表達式。",
		LP_PARAM2: "日期維度函數表達式。",
		LP_PARAM3: "缺省相當於\"ratio\"，表示環比增長率；\"value\"表示取上期值；\"diff\"表示環比差額",
		LP_DESC: "指定日期維度，獲取指標的環比、上期值或環比差額。",
		LP_EXAMPLE: "LastPeriod (SUM([金額]), DATEPART([訂單日期_年月日], \"YMD\")) 計算金額合計值按日期維度的環比。",

		FORMAT_PARAM1: "數值或日期運算式。",
		FORMAT_PARAM2: "數值或日期的格式化串。",
		FORMAT_EXTRADESC: "其中日期格式化串形式如yyyy-MM-dd HH:mm:ss，具體標識字元如下。",
		FORMAT_EXTRADESC1: "2位或4位的年",
		FORMAT_EXTRADESC2: "1位或2位的月，或中文幾月",
		FORMAT_EXTRADESC3: "1位或2位的日",
		FORMAT_EXTRADESC4: "1位或2位的小時(0~23)",
		FORMAT_EXTRADESC5: "1位或2位的分鐘",
		FORMAT_EXTRADESC6: "1位或2位的秒",
		FORMAT_EXTRADESC7: "上午/下午",
		FORMAT_EXTRADESC8: "1位或2位的小時(1~12)",
		FORMAT_EXTRADESC9: "星期幾",
		FORMAT_DESC: "將數值或日期運算式的結果，按格式化串的描述，轉換成字串。",
		FORMAT_EXAMPLE1: "FORMAT(12345.666, \"#,##0.00元\")，返回\"12,345.67元\"。",	
		FORMAT_EXAMPLE2: "FORMAT(DATE(2022,2,2), \"yyyy年MM月dd日 E\")，返回\"2022年02月02日 星期三\"。",
		
		TOTAL_PARAM1: "聚合函數。",
		TOTAL_PARAM2: "基於表格視圖，單元格橫向向外第幾層分組，缺省是最外層。",
		TOTAL_PARAM3: "基於表格視圖，單元格縱向向外第幾層分組，缺省是最外層。",
		TOTAL_DESC: "獲取到小計值（以便進一步做占比計算）。",
		TOTAL_EXAMPLE: "SUM([金額])/TOTAL(SUM([金額]),2) 金額合計值相對于表格中同一行向外第2層分組小計的佔比。",
		
		RUNNINGSUM_PARAM1: "聚合函數。",
		RUNNINGSUM_PARAM2: '取值"Y"表示年內累計，缺省是跨年的累計。',
		RUNNINGSUM_DESC: "累計，基於日期維度的視圖計算。",
		RUNNINGSUM_EXAMPLE: "RUNNINGSUM(SUM([金額])) 在有日期維度的情況下，對金額合計值按日期維度依次累計。",
		
		LASTPERIOD_PARAM1: "聚合函數。",
		LASTPERIOD_PARAM2: '缺省相當于"ratio"，表示環比增長率；"value"表示取上期值；"diff"表示環比差額。',
		LASTPERIOD_DESC: "環比，基於日期維度的視圖計算。",
		LASTPERIOD_EXAMPLE: "LASTPERIOD(SUM([金額])) 在有日期維度的情況下，計算金額合計值按日期維度的環比增長率。",
		
		SAMEPERIODLASTYEAR_PARAM1: "聚合函數。",
		SAMEPERIODLASTYEAR_PARAM2: '缺省相當于"ratio"，表示同比增長率；"value"表示取去年同期值；"diff"表示同比差額。',
		SAMEPERIODLASTYEAR_DESC: "同比，基於日期維度的視圖計算。",
		SAMEPERIODLASTYEAR_EXAMPLE: "SAMEPERIODLASTYEAR(SUM([金額])) 在有日期維度的情況下，計算金額合計值按日期維度的同比增長率。",
		
		PARAM_PARAM1: "參數名稱，字串。",
		PARAM_PARAM2: "當取不到參數值時用此缺省值代替，字串。",
		PARAM_DESC: "獲取參數值。從儀錶板組件間聯動可以指定參數名稱傳入參數值，通過該函數可以獲取到相應的值。",
		PARAM_EXAMPLE: 'PARAM("hello") 獲取名稱為hello的參數值。'
	});
})();