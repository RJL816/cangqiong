(function()
{
	var oManager = com.kingdee.bos.qing.framework.common.MultilanguageManager;
	var oPackage = com.kingdee.bos.qing.functions;
	var sNextLineTab = "<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
	oManager.registPackageResources(oPackage, 
	{
		//函数开始
		all:"全部",
		string: "字符串",
		dateAndTime: "日期和时间",
		logic: "逻辑",
		mathAndTriangle: "数学与三角",
		conversion: "类型转换",
		aggregate: "聚合",
		viewCalculating: "视图计算",
		misc: "其它",
		
		LEN_PARAM:"目标字符串。",
		LEN_DESC:"计算字符串中的字符个数。",
		LEN_RETURN:"整数",
		LEN_EXAMPLE:"例1：LEN(\"ABCDE\")，返回值为5。"
					+sNextLineTab+"例2：LEN(\"BOS轻分析\")，返回值为6。",
		
		LEFT_PARAM1:"要截取的字符串。",
		LEFT_PARAM2:"长度值。",
		LEFT_DESC:"截取字符串左边指定长度的子串。",
		LEFT_RETURN:"字符串",
		LEFT_EXAMPLE:"，返回值为\"ABC\"。",
		
		MID_PARAM1:"目标字符串。",
		MID_PARAM2:"开始位置。",
		MID_PARAM3:"截取长度。",
		MID_DESC:"截取字符串中间的子串。",
		MID_RETURN:"字符串",
		MID_EXAMPLE:"，返回值为\"BCD\"。",
		
		RIGHT_PARAM1:"要截取的字符串。",
		RIGHT_PARAM2:"长度值。",
		RIGHT_DESC:"截取字符串右边指定长度的子串。",
		RIGHT_RETURN:"截取长度。",
		RIGHT_EXAMPLE:"，返回值为\"CDE\"。",
		
		TRIM_PARAM: "目标字符串。",
		TRIM_DESC: "去除字符串前后的空格。",
		TRIM_RETURN: "字符串",
		TRIM_EXAMPLE: "，返回值为\"ABD\"。",
		
		LOWER_PARAM: "目标字符串。",
		LOWER_DESC: "将字符串中的所有大写字母转换为小写字母。",
		LOWER_RETURN: "大写字母替换成小写字母后的字符串",
		LOWER_EXAMPLE: "，返回值为\"abcde\"。",
		
		UPPER_PARAM: "目标字符串。",
		UPPER_DESC: "将字符串中的所有小写字母转换为大写字母。",
		UPPER_RETURN: "小写字母替换成大写字母后的字符串",
		UPPER_EXAMPLE: "，返回值为\"ABCDE\"。",
		
		FIND_PARAM1: "要查找的子串。",
		FIND_PARAM2: "目标字符串。",
		FIND_PARAM3: "从目标字符串的此位置开始查找，缺省为1。",
		FIND_DESC: "查找子串在字符串中的位置。如果定义了起始参数，则会忽略在起始位置之前出现的所有子字符串实例。字符串中的第一个字符为位置1。"
										+sNextLineTab+"FIND函数区分大小写并且不允许使用通配符。另参考SEARCH函数。",
		FIND_RETURN: "正整数。"+sNextLineTab+"如果未找到子字符串，则返回0。",
		FIND_EXAMPLE: "例1：FIND(\"M\", \"Miriam McGovern\")，返回\"Miriam McGovern\"中第一个\"M\"的位置1。"
												+sNextLineTab+"例2：FIND(\"m\", \"Miriam McGovern\") ，返回\"Miriam McGovern\"中第一个\"m\"的位置6。"
												+sNextLineTab+"例3：FIND(\"M\", \"Miriam McGovern\", 3)，返回从\"Miriam McGovern\"的第三个字符开始查找的第一个\"M\"的位置8。",
		
		SUBSTITUTE_PARAM1: "目标字符串。",
		SUBSTITUTE_PARAM2: "目标字符串中将被替换的子串。",
		SUBSTITUTE_PARAM3: "新的子串。",
		SUBSTITUTE_PARAM4: "该数值指定第几次出现的oldSubStr才被替换。如果此参数缺省，所有oldSubStr都被替换。",
		SUBSTITUTE_DESC: "将字符串中指定的子串替换成新的内容。",
		SUBSTITUTE_RETURN: "替换后的字符串。"+sNextLineTab+"如果未找到子字符串oldSubStr，则字符串保持不变，返回str。",
		SUBSTITUTE_EXAMPLE: "SUBSTITUTE(\"销售数据\", \"销售\", \"成本\")，返回\"成本数据\"。",
		
		SEARCH_PARAM1: "要查找的子串。",
		SEARCH_PARAM2: "目标字符串。",
		SEARCH_PARAM3: "从目标字符串的此位置开始查找，缺省为1。",
		SEARCH_DESC: "查找子串在字符串中的位置。"+sNextLineTab+"SEARCH函数忽略大小写。另参考FIND函数。",
		SEARCH_RETURN: "正整数。"+sNextLineTab+"如果未找到子字符串，则返回0。",
		SEARCH_EXAMPLE: "例1：SEARCH(\"e\", \"Statements\", 6)，从\"Statements\"的第6个字符开始找e，结果为7。"
													+sNextLineTab+"例2：SEARCH(\"margin\", \"Profit Margin\")，返回\"margin\"在\"Profit Margin\"中的位置8。",
		
		REPLACE_PARAM1: "目标字符串。",
		REPLACE_PARAM2: "替换的起始位置。",
		REPLACE_PARAM3: "将被替换掉的字符个数。",
		REPLACE_PARAM4: "指定部分替换成该子串。",
		REPLACE_DESC: "将字符串中指定部分替换成新的内容。",
		REPLACE_RETURN: "替换后的字符串",
		REPLACE_EXAMPLE: "，从第6个字符开始的5个字符替换成*，结果为abcde*k。",
		
		REPT_PARAM1: "要重复的字符串。",
		REPT_PARAM2: "重复次数。",
		REPT_DESC: "重复字符串。",
		REPT_RETURN: "字符串重复对应次数后的新字符串。"+sNextLineTab+"如果times为 0，则返回空串(\"\")。"
								+sNextLineTab+"如果 times不是整数，则将被截尾取整后使用。",
		REPT_EXAMPLE: "，返回值为\"ABABAB\"。",

        SPLIT_PARAM1:"分隔符，根据此参数对字符串进行分割。",
        SPLIT_PARAM2:"索引，字符串根据separator参数分割成几个子串，此参数指定保留其中的第几个子串，正数从字符串的开头算起，负数从字符串的末尾算起。",
        SPLIT_DESC:"根据分隔符截取字符串中间的子串。",
        SPLIT_RETURN:"截取的子串。",
        SPLIT_EXAMPLE:"例1：SPLIT(\"CN-2017-ccb36601\",\"-\",2)，返回值为2017。" +
                      sNextLineTab+ "例2：SPLIT(\"CN:2017:ccb36601\",\":\",-1)，返回值为ccb36601。",

		YEAR_PARAM: "日期。",
		YEAR_DESC: "取出日期值中的年份。",
		YEAR_RETURN: "整数",
		YEAR_EXAMPLE: "，返回值为2008。",
		
		MONTH_PARAM: "日期。",
		MONTH_DESC: "取出日期值中的月份。",
		MONTH_RETURN: "整数（1~12）",
		MONTH_EXAMPLE: "，返回值为10。",
		
		DAY_PARAM: "日期。",
		DAY_DESC: "取出日期值中的日的值。",
		DAY_RETURN: "整数（1~31）",
		DAY_EXAMPLE: "，返回值为1。",
		
		QUARTER_PARAM: "日期。",
		QUARTER_DESC: "返回该日期在当年的第几个季度。",
		QUARTER_RETURN: "整数（1~4）",
		QUARTER_EXAMPLE: "，返回值为2。",
		
		DATE_PARAM1: "可以为一到四位数字（使用1900日期系统）。",
		DATE_PARAM2: "代表每年中月份的数字。",
		DATE_PARAM3: "在上述年月中第几天。",
		DATE_EXTRADESC: "如果year位于0~1899（含）之间，则系统会将该值加上1900，再计算年份。例如：DATE(108,1,2) 将返回2008年1月2日 (1900+108)。"
															+sNextLineTab+"如果year位于1900~9999（含）之间，则系统将使用该数值作为年份。例如：DATE(2008,1,2) 将返回2008年1月2日。",
		DATE_DESC: "返回特定日期对象。",
		DATE_RETURN: "日期值",
		DATE_EXAMPLE: "例1：DATE(2008, 2, 1)，返回2008年2月1日。"
											+sNextLineTab+"例2：如果所输入的月份大于12，将从指定年份的一月份开始往上加算。例如DATE(2008,14,2)返回2009年2月2日。"
											+sNextLineTab+"例3：如果day大于该月份的最大天数，则将从指定月份的第一天开始往上累加。例如DATE(2008,1,35) 返回2008年2月4日。",
	
		DATEDIFF_PARAM1: "起始日期。",
		DATEDIFF_PARAM2: "终止日期。",
		DATEDIFF_PARAM3: "取值包括：\"Y\" / \"M\" / \"D\" / \"MD\" / \"YM\" / \"YD\"。",
		DATEDIFF_EXTRADESC: "type参数的取值："
											+sNextLineTab+"\"Y\" 一段时期内的整年数；"
											+sNextLineTab+"\"M\" 一段时期内的整月数； "
											+sNextLineTab+"\"D\" 一段时期内的天数；"
											+sNextLineTab+"\"MD\" startDate 和 endDate 之间相差的天数，忽略日期中的月份和年份； "
											+sNextLineTab+"\"YM\" startDate 和 endDate 之间相差的月数，忽略日期中的年份； "
											+sNextLineTab+"\"YD\" startDate 和 endDate 之间相差的天数，忽略日期中的年份。 ",
		DATEDIFF_DESC: "计算两个日期间相差的天数、月数或年数。",
		DATEDIFF_RETURN: "整数。当startDate小于endDate且相差年/月/天数不为0时返回正整数；当startDate大于endDate且相差年/月/天数不为0时返回负整数。",
		DATEDIFF_EXAMPLE: "例1：DATEDIFF(TODATE(\"2001-1-1\"), TODATE(\"2003-1-1\"), \"Y\")=2，这段时期包含两个整年。"
											+sNextLineTab+"例2：DATEDIFF(TODATE(\"2001-6-1\"), TODATE(\"2002-8-15\"), \"D\")=440，2001年6月1日和2002年8月15日之间相差440 天。"
											+sNextLineTab+"例3： DATEDIFF(DATE(2001, 6, 1), DATE(2002, 8, 15), \"YD\")=75，6月1日和8月15日之间相差75天，忽略日期中的年份。"
											+sNextLineTab+"例4：DATEDIFF(DATE(2001, 6, 1), DATE(2002, 8, 15), \"MD\")=14，1日和15日（startDate和endDate日期中的相应日）之间相差的天数，忽略日期中的月份和年份。",

		NEXTDAY_PARAM1: "日期。",
		NEXTDAY_PARAM2: "偏移天数，支持小数。",
		NEXTDAY_PARAM3: "偏移月数，整数。",
		NEXTDAY_PARAM4: "偏移年数，整数。",
		NEXTDAY_EXTRADESC: "（当dayOffset，monthOffset和yearOffset全部缺省时相当于dayOffset为1。） ",
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
		MONTHDAYS_DESC: "取出日期所在月份的天数。",
		MONTHDAYS_RETURN: "整数",
		MONTHDAYS_EXAMPLE: "，2008年2月份有29天，所以函数返回值为29。",
		
		WEEKDAY_PARAM1: "日期值。",
		WEEKDAY_PARAM2: "类型，取值为1（缺省）、2、3。",
		WEEKDAY_DESC: "返回某日期为星期几。",
		WEEKDAY_RETURN: "当type = 1时，返回1~7，分别代表星期日~星期六。"
												+sNextLineTab+"当type = 2时，返回1~7，分别代表星期一~星期日。"
												+sNextLineTab+"当type = 3时，返回0~6，分别代表星期一~星期日。",
		WEEKDAY_EXAMPLE: "例1：WEEKDAY(TODATE(\"2008-2-14\"))，返回5，表示星期四。"
											+sNextLineTab+"例2：WEEKDAY(TODATE(\"2008-2-14\"), 2)，返回4，表示星期四。"
											+sNextLineTab+"例3：WEEKDAY(TODATE(\"2008-2-14\"), 3)，返回3，表示星期四。",
		
		WEEK_PARAM1: "日期值。",
		WEEK_PARAM2: '每周从星期几开始，字符串"Sunday"（默认）或"Monday"。',
		WEEK_DESC: "自然年中的第几周。1月1日所在周为该年的第1周。跨年份的同一个星期分别属于不同年份的不同周。",
		WEEK_RETURN: "返回整数1~54。",
		WEEK_EXAMPLE: "例1：WEEK(DATE(2022,1,1))，返回1，表示2022年的第1周。"
					+sNextLineTab+'例2：WEEK(DATE(2021,12,31),"Monday")，每周从星期一开始，返回53，表示2021年的第53周。',
		
		ISOWEEK_PARAM: "日期值。",
		ISOWEEK_DESC: "符合 ISO 8601 周日历的一年中第几周。自然年年初的几天可能是上一年的52或53周，年底的几天可能是下一年的第1周，所以应该配合ISOWEEKYEAR()函数使用。",
		ISOWEEK_RETURN: "返回整数1~53，代表周日历一年当中的第几周。",
		ISOWEEK_EXAMPLE: "例1：ISOWEEK(DATE(2022,12,31))，返回52，表示周日历2022年的第52周。"
					+sNextLineTab+"例2：ISOWEEK(DATE(2023,1,1))，返回52，表示周日历2022年的第52周。"
					+sNextLineTab+"例3：ISOWEEK(DATE(2023,12,31))，返回52，表示周日历2023年的第52周。",		
		
		ISOWEEKYEAR_DESC: "符合 ISO 8601 周日历的年。配合ISOWEEK()函数使用。",
		ISOWEEKYEAR_RETURN: "返回年份数值。大部分时间与自然年相同，年初和年底的几天可能与自然年有差异。",
		
		ISOWEEKDAY_DESC: "符合 ISO 8601 周日历的一周中第几天。每周是从星期一开始。",
		ISOWEEKDAY_RETURN: "返回1~7，代表星期一至星期日。",
		ISOWEEKDAY_EXAMPLE: "ISOWEEKDAY(DATE(2023,1,1))，返回7，表示周日历的当周第7天。",
		
		HOUR_PARAM: "日期值。",
		HOUR_DESC: "取出日期值中的小时。",
		HOUR_RETURN: "整数（0~23）",
		HOUR_EXAMPLE: "，返回值为12。",
		
		MINUTE_PARAM: "日期值。",
		MINUTE_DESC: "取出日期值中的分钟。",
		MINUTE_RETURN: "整数（0~59）",
		MINUTE_EXAMPLE: "，返回值为34。",
		
		SECOND_PARAM: "日期值。",
		SECOND_DESC: "取出日期值中的秒。",
		SECOND_RETURN: "整数（0~59）",
		SECOND_EXAMPLE: "，返回值为56。",
		
		TIME_PARAM1: "小时（0~23）。",
		TIME_PARAM2: "分钟（0~59）。",
		TIME_PARAM3: "秒（0~59）。",
		TIME_DESC: "返回某一特定时间的小数值。",
		TIME_RETURN: "返回0~0.999999之间的小数，代表从0:00:00到23:59:59之间的时间。",
		
		NOW_DESC: "返回包含当前日期和时间的日期对象。",
		
		WORKDAY_PARAM1: "起始时间。",
		WORKDAY_PARAM2: "终止时间。",
		WORKDAY_PARAM3: "行政组织编码。",
		WORKDAY_DESC: "计算指定时间段内跨几个工作日。",
		WORKDAY_RETURN: "整数。当传入组织不存在时，返回空。当传入时间超过指定组织的工作日历有效范围，返回空。",
		WORKDAY_EXAMPLE: '例1：WORKDAY(TODATE("2021-9-1"), TODATE("2021-9-10"), [组织编码])，从9月1日零点至9月10日零点可能包含了7个工作日，返回7。'
						+sNextLineTab+'例2：WORKDAY(TODATE("2021-9-1 12:00"), TODATE("2021-9-2 12:00"), [组织编码])，从9月1日中午至9月2日中午，包含了9月2日的工作时间起始点，算一个工作日，返回1。',
		
		WORKHOUR_PARAM1: "起始时间。",
		WORKHOUR_PARAM2: "终止时间。",
		WORKHOUR_PARAM3: "行政组织编码。",
		WORKHOUR_DESC: "计算指定时间段内的工时。",
		WORKHOUR_RETURN: "整数部分表示小时，不足1小时表示为小数部分。当传入组织不存在时，返回空。当传入时间超过指定组织的工作日历有效范围，返回空。",
		WORKHOUR_EXAMPLE: '例1：WORKHOUR(TODATE("2021-9-1"), TODATE("2021-9-2"), [组织编码])，从9月1日零点至9月2日零点可能包含了8个工时，返回8。',
		
		IF_PARAM1: "计算结果为true或false的逻辑表达式。",
		IF_PARAM2: "条件为真时所要返回的值。",
		IF_PARAM3: "条件为假时所要返回的值。",
		IF_DESC: "根据条件返回相应值。",
		IF_RETURN: "数据类型不定，由exp1或exp2决定。",
		IF_EXAMPLE: "IF([订单数] > 500, \"合格\", \"不合格\")。当\"订单数\"字段对应值大于500，则返回\"合格\"，否则返回\"不合格\"。",
		
		CASE_PARAM1: "逻辑表达式，如果结果为真，则返回对应的值表达式计算结果。",
		CASE_PARAM2: "值表达式，和逻辑表达式一一对应。",
		CASE_PARAM3: "缺省值表达式，如果所有逻辑表达式结果都为假，则返回本表达式计算结果。",
		CASE_DESC: "根据多分支条件取值。",
		CASE_RETURN: "数据类型不定，由valueExp(n)或defaultValueExp的运算结果决定。",
		CASE_EXAMPLE: "CASE"
										 +sNextLineTab+"("
										 +sNextLineTab+"[利润率]>0.8, \"高\","
										 +sNextLineTab+"[利润率]>0.6, \"中\","
										 +sNextLineTab+"\"低\""
										 +sNextLineTab+")"
										 +sNextLineTab+"当\"利润率\"字段值大于80%时，则返回\"高\"；若介于60%~80%之间，则返回\"中\"，否则返回\"低\"。",

		AND_PARAM: "计算结果为true或false的逻辑表达式。",
		AND_DESC: "返回所有参数的逻辑与值。",
		AND_RETURN: "逻辑值true或false",
		AND_EXAMPLE: "IF(AND([出生日期] >=TODATE(\"1990-1-1\"), [出生日期] 	<TODATE(\"2000-1-1\")), \"90后\", \"其他\")，当\"出生日期\"字段值在1990-1-1~1999-12-31之间时，则返回\"90后\"，否则返回\"其他\"。",

		OR_PARAM: "计算结果为true或false的逻辑表达式。",
		OR_DESC: "返回所有参数的逻辑或值。",
		OR_RETURN: "逻辑值true或false",
		OR_EXAMPLE: "IF(OR([年龄] >30, [公司工作年限] >=10), \"符合\", \"不符合\")，某公司对升职设置了条件：若年龄大于30岁，或在本公司工作年限大于10年（含），则返回\"符合\"，否则返回\"不符合\"。",

		NOT_PARAM: "计算结果为true或false的逻辑表达式。",
		NOT_DESC: "返回参数的逻辑非值。",
		NOT_RETURN: "逻辑值true或false",
		NOT_EXAMPLE: 'IF(NOT([年龄]>=18), "未成年", "成年")  如果年龄小于18岁，返回"未成年"，否则返回"成年"。',
		
		ABS_PARAM: "需要计算其绝对值的实数。",
		ABS_DESC: "返回数字的绝对值。",
		ABS_EXAMPLE: "例1：ABS(2)，2的绝对值2。"
										 +sNextLineTab+"例2：ABS(-2)，-2的绝对值2。",
		
		MOD_PARAM1: "被除数。",
		MOD_PARAM2: "除数。",
		MOD_DESC: "返回两数相除的余数。",
		MOD_RETURN: "两数相除的余数，结果的正负号与除数相同。如果divisor为零，则返回null。",
		MOD_EXAMPLE: "例1：MOD(3, 2)，3/2 的余数 (1)。"
										 +sNextLineTab+"例2：MOD(-3, 2)，-3/2 的余数，符号与除数相同1。"
										 +sNextLineTab+"例3：MOD(3, -2)，3/-2 的余数，符号与除数相同 -1。"
										 +sNextLineTab+"例4：MOD(-3, -2)，-3/-2 的余数，符号与除数相同 -1。",
		
		ROUND_PARAM1: "需要进行四舍五入的数字。",
		ROUND_PARAM2: "指定的位数，按此位数进行四舍五入。可以取负数，表示小数点左侧。",
		ROUND_DESC: "对数字按指定位数进行四舍五入。",
		ROUND_EXAMPLE: "例1：ROUND(2.15, 1)，将2.15 四舍五入到一个小数位2.2。"
										 +sNextLineTab+"例2：ROUND(2.149, 1)，将2.149 四舍五入到一个小数位2.1。"
										 +sNextLineTab+"例3：ROUND(-1.475, 2)，将-1.475 四舍五入到两小数位-1.48。"
										 +sNextLineTab+"例4：ROUND(21.5, -1)，将21.5 四舍五入到小数点左侧一位20。",
		
		INT_PARAM1: "需要进行取整的数字。",
		INT_PARAM2: '可选参数，表示取整的舍入模式，取值如下：'
					+sNextLineTab+'"ceiling"，取大于等于number的最小整数；'
			        +sNextLineTab+'"floor"，取小于等于number的最大整数，缺省为此模式；'
			        +sNextLineTab+'"up"，取离0远的方向的最近整数；'
			        +sNextLineTab+'"down"，取离0近的方向的最近整数；'
			        +sNextLineTab+'"half_up"，取距离最近的整数，两头距离一样时相当于"up"（通常的四舍五入，见ROUND函数）；'
			        +sNextLineTab+'"half_down"，取距离最近的整数，两头距离一样时相当于"down"。',
		INT_DESC: "将数字舍入到最接近的整数。",
		INT_RETURN: "取整后的整数",
		INT_EXAMPLE: "例1：INT(8.9)，将8.9 向下舍入到最接近的整数8。"
										 +sNextLineTab+"例2：INT(-8.9)，将-8.9 向下舍入到最接近的整数 -9。",
		
		EXP_PARAM: "为底数e的指数。",
		EXP_DESC: "将返回e的n次幂。常数e等于2.71828182845904，是自然对数的底数。",
		EXP_EXAMPLE: "例1：EXP(1)，返回e的近似值2.718282。"
										 +sNextLineTab+"例2：EXP(2)，返回自然对数的底数e的 2次幂7.389056。",
		
		LN_PARAM: "是用于计算其自然对数的正实数。",
		LN_DESC: "返回一个数的自然对数。自然对数以常数项e(2.71828182845904)为底。",
		LN_EXAMPLE: "例1：LN(86)，86的自然对数4.454347。"
									    	+sNextLineTab+"例2：LN(2.7182818) ，常数项e的自然对数1。"
										    +sNextLineTab+"例3：LN(EXP(3))，e的3次幂的自然对数3。",

		LOG_PARAM1: "为用于计算对数的正实数。",
		LOG_PARAM2: "为对数的底数。如果省略底数，假定其值为10。",
		LOG_DESC: "按所指定的底数，返回一个数的对数。",
		LOG_EXAMPLE: "例1：LOG(10)，10的对数1。"
									    	+sNextLineTab+"例2：LOG(8, 2)，以2为底时，8 的对数3。"
										    +sNextLineTab+"例3：LOG(86, 2.7182818)，以e为底时，86的对数4.454347。",
		
		POWER_PARAM1: "底数，可以为任意实数。",
		POWER_PARAM2: "指数，底数按该指数次幂乘方。",
		POWER_DESC: "返回给定数字的乘幂。",
		POWER_RETURN: "给定数字的乘幂",
		POWER_EXAMPLE: "例1：POWER(5,2)，5的平方25。"
									    	+sNextLineTab+"例2：POWER(98.6, 3.2)，98.6的3.2次方2401077。"
										    +sNextLineTab+"例3：POWER(4, 5/4)，4的5/4次方5.656854。",
		
		SIGN_PARAM: "任意的实数。",
		SIGN_DESC: "返回数字的符号。",
		SIGN_RETURN: "当数字为正数时返回1，为零时返回0，为负数时返回-1。",
		SIGN_EXAMPLE: "例1：SIGN(10)，正数的符号1。"
									    	+sNextLineTab+"例2：SIGN(4-4)，0的符号0。"
										    +sNextLineTab+"例3：SIGN(-0.00001)，负数的符号-1。",
		
		SQRT_PARAM: "要计算平方根的数值。",
		SQRT_DESC: "返回正平方根。",
		SQRT_RETURN: "正实数",
		SQRT_EXAMPLE: "，16 的平方根4。",
		
		PI_DESC: "获取常量pi的值，为3.141593，精确到小数点后6位。",
		
		SIN_PARAM: "弧度。",
		SIN_DESC: "计算给定角度的正弦值。",
		SIN_RETURN: "参数的正弦值",
		SIN_EXAMPLE: "例1：SIN(PI())，pi弧度的正弦值0。"
										 +sNextLineTab+"例2：SIN(PI()/2)，pi/2弧度的正弦值1。"
										 +sNextLineTab+"例3：SIN(30*PI()/180)，30度的正弦值0.5。"
										 +sNextLineTab+"例4：SIN(RADIANS(30))，30度的正弦值0.5。",
		
		ASIN_PARAM: "角度的正弦值，必须介于-1到1之间。",
		ASIN_DESC: "计算参数的反正弦值。",
		ASIN_RETURN: "参数的反正弦值。反正弦值为一个角度，该角度的正弦值即等于此函数的 number 参数。返回的角度值将以弧度表示，范围为 -pi/2 到 pi/2。"
											+sNextLineTab+"（说明：若要用度表示反正弦值，请将结果再乘以180/PI()或用DEGREES函数表示。）",
		ASIN_EXAMPLE: "例1：ASIN(-0.5)，以弧度表示-0.5的反正弦值，即-pi/6 (-0.5236)。"
										 +sNextLineTab+"例2：ASIN(-0.5)*180/PI()，以度表示-0.5的反正弦值-30。"
										 +sNextLineTab+"例3：DEGREES(ASIN(-0.5))，以度表示-0.5的反正弦值-30。",
		
		COS_PARAM: "为需要求余弦的角度，以弧度表示。",
		COS_EXTRADESC: "（说明：如果参数的单位是度，则可以乘以PI()/180或使用RADIANS函数将其转换成弧度。）",
		COS_DESC: "计算给定角度的余弦值。",
		COS_RETURN: "参数的余弦值",
		COS_EXAMPLE: "例1：COS(1.047)，1.047弧度的余弦值0.500171。"
										 +sNextLineTab+"例2：COS(60*PI()/180)，60度的余弦值0.5。"
										 +sNextLineTab+"例3：COS(RADIANS(60))，60度的余弦值0.5。",

		ACOS_PARAM: "角度的余弦值，必须介于-1到1之间。",
		ACOS_DESC: "计算给定角度的反余弦值。",
		ACOS_RETURN: "参数的反余弦值",
		ACOS_EXAMPLE: "例1：ACOS(-0.5)，以弧度表示-0.5，即2*pi/3 的反余弦值2.094395。"
										 +sNextLineTab+"例2：ACOS(-0.5)*180/PI()，以度表示-0.5的反余弦值120。"
										 +sNextLineTab+"例3：DEGREES(ACOS(-0.5))，以度表示-0.5的反余弦值120。",
		
		TAN_PARAM: "弧度。如果参数的单位是度，则可以乘以PI()/180或使用RADIANS函数将其转换为弧度。",
		TAN_DESC: "计算给定角度的正切值。",
		TAN_RETURN: "参数的正切值",
		TAN_EXAMPLE: "例1：TAN(0.785)，0.785弧度的正切值0.99920。"
										 +sNextLineTab+"例2：TAN(45*PI()/180)，45度的正切值1。"
										 +sNextLineTab+"例3：TAN(RADIANS(45))，45度的正切值1。",

		ATAN_PARAM: "为角度的正切值。",
		ATAN_DESC: "计算反正切值。",
		ATAN_RETURN: "反正切值。反正切值为角度，其正切值即等于number参数值。返回的角度值将以弧度表示，范围为-pi/2到pi/2。"
											+sNextLineTab+"(说明：若要用度表示反正切值，请将结果再乘以180/PI()或使用 DEGREES函数。)",
		ATAN_EXAMPLE: "例1：ATAN(1)，以弧度表示1的反正切值，即 pi/4(0.785398)。"
										 +sNextLineTab+"例2：ATAN(1)*180/PI()，以度表示1的反正切值45。"
										 +sNextLineTab+"例3：DEGREES(ATAN(1))，以度表示1的反正切值45。",
		
		ATAN2_PARAM1: "点的x坐标。",
		ATAN2_PARAM2: "点的y坐标。",
		ATAN2_DESC: "计算给定的 X及Y坐标值的反正切值。反正切的角度值等于X轴与通过原点和给定坐标点(x, y)的直线之间的夹角。结果以弧度表示并介于-pi到pi之间（不包括-pi）。",
		ATAN2_RETURN: "结果为正表示从X轴逆时针旋转的角度，结果为负表示从X轴顺时针旋转的角度。如果 x和 y都为零，ATAN2返回NULL。",
		ATAN2_EXAMPLE: "例1：ATAN2(1, 1)，以弧度表示点 (1,1)的反正切值，即 pi/4(0.785398)。"
										 +sNextLineTab+"例2：ATAN2(-1, -1)，以弧度表示点 (-1,-1)的反正切值，即 -3*pi/4(-2.35619)。"
										 +sNextLineTab+"例3：ATAN2(-1, -1)*180/PI()，以度表示点 (1,1)的反正切值-135。"
										 +sNextLineTab+"例4：DEGREES(ATAN2(-1, -1))，以度表示点 (1,1)的反正切值-135。",
		
		RADIANS_PARAM: "需要转换成弧度的角度。",
		RADIANS_DESC: "将角度转换为弧度。",
		RADIANS_RETURN: "弧度",
		RADIANS_EXAMPLE: "，将角度270度转换为弧度4.712389 或 3π/2 弧度。",
		
		DEGREES_PARAM: "需要转换成角度的弧度。",
		DEGREES_DESC: "将弧度转换为角度。",
		DEGREES_RETURN: "角度",
		DEGREES_EXAMPLE: "，pi弧度转换为度数180。",
		
		MAXIMUM_PARAM: "表达式。",
		MAXIMUM_DESC: "返回多个表达式中的最大值。",
		MAXIMUM_EXAMPLE: "例1：MAXIMUM(1,2,3)，返回值为3。"
												+sNextLineTab+"例2：MAXIMUM([培训开始时间], TODATE(\"2000-1-1\"))，取两值中的较大者，早于2000-1-1的都将被置为2000-1-1。",
		
		MINIMUM_PARAM: "表达式。",
		MINIMUM_DESC: "返回多个表达式中的最小值。",
		MINIMUM_EXAMPLE: "例1：MINIMUM(1,2,3)，返回值为1。"
												+sNextLineTab+"例2：MINIMUM([培训开始时间], TODATE(\"2000-12-31\"))，取两值中的较小者，晚于2008-12-31的都将被置为2008-12-31。",
		
		TOSTRING_PARAM: "表达式。",
		TOSTRING_DESC: "将表达式转换为字符串。",
		TOSTRING_RETURN: "字符串",
		TOSTRING_EXAMPLE: "TOSTRING([年龄])，以字符串的形式返回\"年龄\"字段的所有值。",
		
		TODATE_PARAM: "表达式。",
		TODATE_DESC: "将表达式转换为日期对象。",
		TODATE_RETURN: "日期值",
		TODATE_EXAMPLE: "相当于DATE(2006, 6, 15)。",
		
		TONUMBER_PARAM: "表达式。",
		TONUMBER_DESC: "将表达式转换为数值类型。",
		TONUMBER_RETURN: "数值",
		TONUMBER_EXAMPLE: "，返回数字23.2。",
		
		ZN_PARAM: "数值表达式。",
		ZN_DESC: "如果数值表达式为null，则返回零，否则返回本身。",
		ZN_EXAMPLE: "ZN([利润])",
		
		SUM_PARAM: "数值表达式。",
		SUM_DESC: "返回数值表达式所有值的总计，忽略null值。",
		SUM_EXAMPLE: "SUM([销售额])，返回\"销售额\"字段对应的所有非空值的总和。",
		
		AVG_PARAM: "数值表达式。",
		AVG_DESC: "返回数值表达式所有值的平均值，忽略null值。",
		AVG_EXAMPLE: "AVG([销售额])，返回\"销售额\"字段对应的所有非空值的平均值。",
		
		MEDIAN_PARAM: "数值表达式。",
		MEDIAN_DESC: "返回数值表达式所有值的中位数，忽略null值。",
		MEDIAN_EXAMPLE: "MEDIAN([销售额])，返回\"销售额\"字段对应的所有非空值的中位数。",
		
		COUNT_PARAM: "表达式。",
		COUNT_DESC: "返回数据条目数，且表达式的值为null时不会计数。",
		COUNT_EXAMPLE: "COUNT([销售额]),返回\"销售额\"字段对应的所有非空值的数据条目数。如销售额字段有1000，1000，500 共三个数值，则COUNT([销售额])结果为3。",
		
		MAX_PARAM: "数值表达式。",
		MAX_DESC: "返回数值表达式所有值的最大值。",
		MAX_EXAMPLE: "MAX([销售额])，返回\"销售额\"字段对应值的最大值。",
		
		MIN_PARAM: "数值表达式。",
		MIN_DESC: "返回数值表达式所有值的最小值。",
		MIN_EXAMPLE: "MIN([销售额])，返回\"销售额\"字段对应值的最小值。",
		
		COUNTD_PARAM: "表达式。",
		COUNTD_DESC: "返回指定字段不重复的值的个数，当值为null时不参与计数。",
		COUNTD_EXAMPLE: "假设若干行数据中，\"性别\"字段有\"男\"、\"女\"两个不同的值，则COUNTD([性别])，返回2。",

		SPLY_PARAM1:"指标表达式。",
		SPLY_PARAM2:"日期维度函数表达式。",
		SPLY_PARAM3:"缺省相当于\"ratio\"，表示同比增长率；\"value\"表示取去年同期值；\"diff\"表示同比差额",
		SPLY_DESC:"指定日期维度，获取指标的同比、去年同期值或同比差额。",
		SPLY_EXAMPLE:"SamePeriodLastYear(SUM([金额]), DATEPART([订单日期_年月日], \"YMD\"),value) " +
			"计算金额合计值按日期维度的去年同期值。",

		LP_PARAM1:"指标表达式。",
		LP_PARAM2:"日期维度函数表达式。",
		LP_PARAM3:"缺省相当于\"ratio\"，表示同比增长率；\"value\"表示取去年同期值；\"diff\"表示同比差额",
		LP_DESC:"指定日期维度，获取指标的环比、上期值或环比差额。",
		LP_EXAMPLE:"LastPeriod (SUM([金额]), DATEPART([订单日期_年月日], \"YMD\")) 计算金额合计值按日期维度的环比。",
		
		FORMAT_PARAM1: "数值或日期表达式。",
		FORMAT_PARAM2: "数值或日期的格式化串。",
		FORMAT_EXTRADESC: "其中日期格式化串形式如yyyy-MM-dd HH:mm:ss，具体标识字符如下。",
		FORMAT_EXTRADESC1: "2位或4位的年",
		FORMAT_EXTRADESC2: "1位或2位的月，或中文几月",
		FORMAT_EXTRADESC3: "1位或2位的日",
		FORMAT_EXTRADESC4: "1位或2位的小时(0~23)",
		FORMAT_EXTRADESC5: "1位或2位的分钟",
		FORMAT_EXTRADESC6: "1位或2位的秒",
		FORMAT_EXTRADESC7: "上午/下午",
		FORMAT_EXTRADESC8: "1位或2位的小时(1~12)",
		FORMAT_EXTRADESC9: "星期几",
		FORMAT_DESC: "将数值或日期对象，按格式化串的描述，转换成字符串。",
		FORMAT_EXAMPLE1: "FORMAT(12345.666, \"#,##0.00元\")，返回\"12,345.67元\"。",	
		FORMAT_EXAMPLE2: "FORMAT(DATE(2022,2,2), \"yyyy年MM月dd日 E\")，返回\"2022年02月02日 星期三\"。",
		
		TOTAL_PARAM1: "聚合函数。",
		TOTAL_PARAM2: "基于表格视图，单元格横向向外第几层分组，缺省是最外层。",
		TOTAL_PARAM3: "基于表格视图，单元格纵向向外第几层分组，缺省是最外层。",
		TOTAL_DESC: "获取到小计值（以便进一步做占比计算）。",
		TOTAL_EXAMPLE: "SUM([金额])/TOTAL(SUM([金额]),2) 金额合计值相对于表格中同一行向外第2层分组小计的占比。",
		
		RUNNINGSUM_PARAM1: "聚合函数。",
		RUNNINGSUM_PARAM2: '取值"Y"表示年内累计，缺省是跨年的累计。',
		RUNNINGSUM_DESC: "累计，基于日期维度的视图计算。",
		RUNNINGSUM_EXAMPLE: "RUNNINGSUM(SUM([金额])) 在有日期维度的情况下，对金额合计值按日期维度依次累计。",
		
		LASTPERIOD_PARAM1: "聚合函数。",
		LASTPERIOD_PARAM2: '缺省相当于"ratio"，表示环比增长率；"value"表示取上期值；"diff"表示环比差额。',
		LASTPERIOD_DESC: "环比，基于日期维度的视图计算。",
		LASTPERIOD_EXAMPLE: "LASTPERIOD(SUM([金额])) 在有日期维度的情况下，计算金额合计值按日期维度的环比增长率。",
		
		SAMEPERIODLASTYEAR_PARAM1: "聚合函数。",
		SAMEPERIODLASTYEAR_PARAM2: '缺省相当于"ratio"，表示同比增长率；"value"表示取去年同期值；"diff"表示同比差额。',
		SAMEPERIODLASTYEAR_DESC: "同比，基于日期维度的视图计算。",
		SAMEPERIODLASTYEAR_EXAMPLE: "SAMEPERIODLASTYEAR(SUM([金额])) 在有日期维度的情况下，计算金额合计值按日期维度的同比增长率。",
		
		PARAM_PARAM1: "参数名称，字符串。",
		PARAM_PARAM2: "当取不到参数值时用此缺省值代替，字符串。",
		PARAM_DESC: "获取参数值。从仪表板组件间联动可以指定参数名称传入参数值，通过该函数可以获取到相应的值。",
		PARAM_EXAMPLE: 'PARAM(\"hello\") 获取名称为hello的参数值。'
	});
})();