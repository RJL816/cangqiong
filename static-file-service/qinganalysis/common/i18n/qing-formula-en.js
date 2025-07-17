(function()
{
	var oManager = com.kingdee.bos.qing.framework.common.MultilanguageManager;
	var oPackage = com.kingdee.bos.qing.functions;
	var sNextLineTab = "<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
	oManager.registPackageResources(oPackage, 
	{
		//函数开始
		all:"All",
		string: "String",
		dateAndTime: "Data&Time",
		logic: "Logic",
		mathAndTriangle: "Math&Triangular",
		conversion: "Type Conversion",
		aggregate: "Aggregate",
		viewCalculating: "View calculation",
		misc: "Misc",
		
		LEN_PARAM:"The target string.",
		LEN_DESC:"Calculate the number of characters in the string.",
		LEN_RETURN:"Integer",
		LEN_EXAMPLE:"Example 1: LEN(\"ABCDE\"), the returned value is 5."
					+sNextLineTab+"Example 2: LEN(\"BOS Qing Analysis\"), the returned value is 6.",
		
		LEFT_PARAM1:"The string to be intercepted.",
		LEFT_PARAM2:"The length value.",
		LEFT_DESC:"To intercept the sub string with the specified length at the left of the string.",
		LEFT_RETURN:"String",
		LEFT_EXAMPLE:", the returned value is \"ABC\".",
		
		MID_PARAM1:"The target string.",
		MID_PARAM2:"The start location.",
		MID_PARAM3:"Intercept length.",
		MID_DESC:"Intercept the sub string in the string.",
		MID_RETURN:"String",
		MID_EXAMPLE:", the returned value is \"BCD\".",
		
		RIGHT_PARAM1:"The string to be intercepted.",
		RIGHT_PARAM2:"The length value.",
		RIGHT_DESC:"To intercept the sub string with the specified length at the left of the string.",
		RIGHT_RETURN:"Intercepted length.",
		RIGHT_EXAMPLE:", the returned value is \"CDE\".",
		
		TRIM_PARAM: "The target string.",
		TRIM_DESC: "Remove spaces before and after the string.",
		TRIM_RETURN: "String",
		TRIM_EXAMPLE: ", the returned value is \"ABD\".",
		
		LOWER_PARAM: "The target string.",
		LOWER_DESC: "Convert all the capital letters in the string into lower-case letters.",
		LOWER_RETURN: "The string with lower-case letters.",
		LOWER_EXAMPLE: ", the returned value is \"abcde\".",
		
		UPPER_PARAM: "The target string.",
		UPPER_DESC: "Convert all the lower-case letters in the string into capital letters.",
		UPPER_RETURN: "The string with capital letters.",
		UPPER_EXAMPLE: ", the returned value is \"ABCDE\".",
		
		FIND_PARAM1: " The string you want to query.",
		FIND_PARAM2: "The target string. ",
		FIND_PARAM3: " Start querying from this location of the target string, and the default value is 1.",
		FIND_DESC: "To query the location of the sub string in the string. If the start parameter is defined, then all the sub string instances appears before the start location will be ignored.The first character of the string is Location 1."
										+sNextLineTab+"'FIND' function is case sensitive, and wildcard characters are not allowed.  Please also refer to 'SEARCH' function.",
		FIND_RETURN: "Positive integer."+sNextLineTab+"If no sub string is found, then return 0.",
		FIND_EXAMPLE: "Example 1: FIND(\"M\", \"Miriam McGovern\"), returns Location 1 of the first \"M\" in \"Miriam McGovern\"."
												+sNextLineTab+"Example 2: FIND(\"M\", \"Miriam McGovern\"), returns Location 6 of the first \"M\" in \"Miriam McGovern\"."
												+sNextLineTab+"Example 3: FIND(\"M\", \"Miriam McGovern\", 3), returns Location 8 of the first \"M\" querying started from the third character of \"Miriam McGovern\".",
		
		SUBSTITUTE_PARAM1: "The target string.",
		SUBSTITUTE_PARAM2: "The sub string to be replaced in the target string.",
		SUBSTITUTE_PARAM3: "A new sub string.",
		SUBSTITUTE_PARAM4: "To specify when the oldSubStr will be replaced, indicating oldSubStr will be replaced when it appears for specified times.  If the parameter is defaulted, then all oldSubStr will be replaced.",
		SUBSTITUTE_DESC: "If the sub string \"oldSubStr\" is not found, then the string will not be changed, and \"str\" will be returned.",
		SUBSTITUTE_RETURN: "The replaced string."+sNextLineTab+"If the sub string \"oldSubStr\" is not found, then the string will not be changed, and \"str\" will be returned.",
		SUBSTITUTE_EXAMPLE: "SUBSTITUTE(\"Sales Data\", \"Sales\", \"Cost\"), return\"Cost Data\".",
		
		SEARCH_PARAM1: "The string you want to query.",
		SEARCH_PARAM2: "The target string.",
		SEARCH_PARAM3: "Start querying from this location of the target string, and the default value is 1.",
		SEARCH_DESC: "To query the location of the sub string in the string."+sNextLineTab+"SEARCH function is not case-sensitive.  Please also refer to \"FIND\" function.",
		SEARCH_RETURN: "Positive integer."+sNextLineTab+"If no sub string is found, then return 0.",
		SEARCH_EXAMPLE: "Example 1: SEARCH(\"e\", \"Statements\", 6), searching \"e\" started from the sixth character in \"Statements\", and the result is 7."
													+sNextLineTab+"Example 2: SEARCH(\"margin\", \"Profit Margin\"), returns Location 8 of \"margin\" in \"Profit Margin\".",
		
		REPLACE_PARAM1: "The target string.",
		REPLACE_PARAM2: "The start location to be replaced.",
		REPLACE_PARAM3: " The number of characters to be replaced.",
		REPLACE_PARAM4: "Replace the specified part with this string.",
		REPLACE_DESC: "Replace the specified part of the string with the new content.",
		REPLACE_RETURN: "The replaced string",
		REPLACE_EXAMPLE: ", replace five characters after the sixth character with *, the result is \"abcde*k\".",
		
		REPT_PARAM1: "Repeat the string.",
		REPT_PARAM2: "The string to be repeated.",
		REPT_DESC: "The repetition times.",
		REPT_RETURN: "The new string after the repetitions."+sNextLineTab+"If \"times\" is 0, then return a null string (\"\")."
								+sNextLineTab+"If \"times\" is not an integer, then the system will perform truncated rounding.",
		REPT_EXAMPLE: ", the returned value is \"ABABAB\".",

        SPLIT_PARAM1:"seperator,split string by this seperator",
        SPLIT_PARAM2:"location,the string is split into several sub string arrays,this param is used to select which sub string is returned",
        SPLIT_DESC:"get the  substring in the sub string arrays which is split by seperator",
        SPLIT_RETURN:"the substring in the sub string arrays ",
        SPLIT_EXAMPLE:"eg1:SPLIT(\"CN-2017-ccb36601\",\"-\",2),return value is 2017."+sNextLineTab+
                        "eg2:SPLIT(\"CN:2017:ccb36601\",\":\",-1),return value is ccb36601.",

		YEAR_PARAM: "The date.",
		YEAR_DESC: "Access the value of \"Year\".",
		YEAR_RETURN: "Integer",
		YEAR_EXAMPLE: ", the returned value is 2008.",
		
		MONTH_PARAM: "The date.",
		MONTH_DESC: "Access the value of \"Month\".",
		MONTH_RETURN: "An integer (1~12).",
		MONTH_EXAMPLE: ", the returned value is 10.",
		
		DAY_PARAM: " The date.",
		DAY_DESC: "Access the value of \"Day\".",
		DAY_RETURN: "An integer (1~31).",
		DAY_EXAMPLE: ", the returned value is 1.",
		
		QUARTER_PARAM: "The date.",
		QUARTER_DESC: "To return the quarter of the date in the current year.",
		QUARTER_RETURN: "An integer (1~4).",
		QUARTER_EXAMPLE: ", the returned value is 2.",
		
		DATE_PARAM1: "Allows one to four numbers (use 1900 date system).",
		DATE_PARAM2: "Indicating the month of the year.",
		DATE_PARAM3: "Which day in the above year and month.",
		DATE_EXTRADESC: "If year is between 0~1899 (include 1899), then the system will add 1900 to this value, and then calculate the year.  For example: DATE(108,1,2) will return 20080102 (1900+108)."
															+sNextLineTab+"If year is between 1900~9999 (include 9999), then the system will directly use this value as the year.  For example: DATE(2008,1,2) will return 20080102.",
		DATE_DESC: "Return specified date object.",
		DATE_RETURN: "Date value",
		DATE_EXAMPLE: "Example 1: If DATE(2008, 2, 1), then return 20080201."
											+sNextLineTab+"Example 2: If the number of month is greater than 12, then it will perform upward-accumulation starting from January of the specified year.  For example: If DATE(2008,14, 2,), then return 20090202."
											+sNextLineTab+"Example 3: If \"day\" is greater than the maximum days of the month, then it will perform upward-accumulation starting from the first day of the specified month.  For example: If DATE(2008,1, 35,), then return 20080204.",
	
		DATEDIFF_PARAM1: "The start date.",
		DATEDIFF_PARAM2: "The end date.",
		DATEDIFF_PARAM3: "The data access includes: \"Y\" / \"M\" / \"D\" / \"MD\" / \"YM\" / \"YD\".",
		DATEDIFF_EXTRADESC: "'type' parameter data access:"
											+sNextLineTab+"\"Y\" indicates the number of whole years in a specified period."
											+sNextLineTab+"\"M\" indicates the number of whole months in a specified period. "
											+sNextLineTab+"\"D\" indicates the number of whole days in a specified period."
											+sNextLineTab+"\"MD\" indicates the gap of days between startDate and endDate, and the month and the year will be ignored. "
											+sNextLineTab+"\"YM\" indicates the gap of months between startDate and endDate, and the year will be ignored. "
											+sNextLineTab+"\"YD\" indicates the gap of days between startDate and endDate, and the year will be ignored. ",
		DATEDIFF_DESC: "To calculate the gap of days, months or years between the two dates.",
		DATEDIFF_RETURN: "Integer.  When startDate is less than endDate and the gap of days/months/years is not 0, returns 0; when startDate is greater than endDate and the gap of days/months/years is not 0, returns a negative integer.",
		DATEDIFF_EXAMPLE: "Example 1: DATEDIFF(TODATE(\"2001-1-1\"), TODATE(\"2003-1-1\"), \"Y\")=2, indicating two whole years are included."
											+sNextLineTab+"Example 2: DATEDIFF(TODATE(\"2001-6-1\"), TODATE(\"2002-8-15\"), \"D\")=440, indicating the gap of days between 20010601 and 20020815 is 440."
											+sNextLineTab+"Example 3:   DATEDIFF(DATE(2001, 6, 1), DATE(2002, 8, 15), \"YD\")=75, indicating the gap of days between 0601 and 0815 is 75, and the year is ignored."
											+sNextLineTab+"Example 4: DATEDIFF(DATE(2001, 6, 1), DATE(2002, 8, 15), \"MD\")=14, indicating the gap of days between Day 1 and Day 15 (the corresponding days between startDate and endDate) is 14, and the month and the year is ignored.",

		NEXTDAY_PARAM1: "The date.",
		NEXTDAY_PARAM2: "The days of offset, support decimals.",
		NEXTDAY_PARAM3: "The months of offset, an integer.",
		NEXTDAY_PARAM4: "The years of offset, an integer.",
		NEXTDAY_EXTRADESC: "(When dayOffset, monthOffset and yearOffset are all defaulted, it means dayOffset is 1. ) ",
		NEXTDAY_DESC: "To acquire the date of specified offset conditions.",
		NEXTDAY_RETURN: "Date value",
		NEXTDAY_EXAMPLE: "Example 1: NEXTDAY(TODATE(\"2008-2-15\")), returns 2008-2-16."
											+sNextLineTab+"Example 2: NEXTDAY(TODATE(\"2008-2-15\"), 1.5), returns 2008-2-16 12:00."
											+sNextLineTab+"Example 3: NEXTDAY(TODATE(\"2008-2-15\"), -1.5), returns 2/13/2008 12:00."
											+sNextLineTab+"Example 4: NEXTDAY(TODATE(\"2008-2-15\"), 0, 1), returns 2008-3-15."
											+sNextLineTab+"Example 5: NEXTDAY(DATE(2008, 2, 15), 0 , 0, 1), returns 2009-2-15."
											+sNextLineTab+"Example 6: NEXTDAY(DATE(2008, 2, 15), 1, 1, 1), returns 2009-3-16.",
		
		FIRSTDAY_PARAM1: "The date.",
		FIRSTDAY_PARAM2: "\"type\" data accessing includes:\"YD\" (The first day of this year),\"MD\" (The first day of this month), \"WD\"(The first day of this week, Sunday) By default, it is\"YD\".",
		FIRSTDAY_DESC: "Acquire the first day of the specified type.",
		FIRSTDAY_RETURN: "The date.",
		FIRSTDAY_EXAMPLE: "Example 1: FIRSTDAY(TODATE(\"2008-2-15\")), return 2008-1-1."
											+sNextLineTab+"Example 2: FIRSTDAY(DATE(2008, 2, 15), \"MD\"), return 2008-2-1."
											+sNextLineTab+"Example 3: FIRSTDAY(TODATE(\"2008-2-15\"), \"WD\"), return 2008-2-10.",

		LASTDAY_PARAM1: "The date.",
		LASTDAY_PARAM2: "data accessing includes: \"YD\" (The last day of this year),\"MD\"(The last day of this month), \"WD\" (The last day of this week, Saturday). By default, it is\"YD\".",
		LASTDAY_DESC: "Acquire the last day of the specified type.",
		LASTDAY_RETURN: "Date value",
		LASTDAY_EXAMPLE: "Example 1: LASTDAY(TODATE(\"2008-2-15\")), return 2008-12-31."
											+sNextLineTab+"Example 2: LASTDAY(DATE(2008, 2, 15), \"MD\"), return 2008-2-29."
											+sNextLineTab+"Example 3: LASTDAY(TODATE(\"2008-2-15\"), \"WD\"), return 2008-2-16.",
		
		MONTHDAYS_PARAM: "The date.",
		MONTHDAYS_DESC: "To acquire the days of the month.",
		MONTHDAYS_RETURN: "Integer",
		MONTHDAYS_EXAMPLE: ", indicating that there are 29 days in February in 2008, thus the returned value is 29.",
		
		WEEKDAY_PARAM1: ": The value of the date.",
		WEEKDAY_PARAM2: ": The type, and the access value is 1 (default), 2 and 3.",
		WEEKDAY_DESC: "To return what day of the specified date.",
		WEEKDAY_RETURN: "When type = 1, returns 1~7, indicating Sunday~Saturday."
												+sNextLineTab+"When type = 2, returns 1~7, indicating Monday~Sunday."
												+sNextLineTab+"When type = 3, returns 0~6, indicating Monday~Sunday.",
		WEEKDAY_EXAMPLE: "Example 1: WEEKDAY(TODATE(\"2008-2-14\")), returns 5, indicating Thursday."
											+sNextLineTab+"Example 2: WEEKDAY(TODATE(\"2008-2-14\"), 2), returns 4, indicating Thursday."
											+sNextLineTab+"Example 3: WEEKDAY(TODATE(\"2008-2-14\"), 3), returns 3, indicating Thursday.",
		
		WEEK_PARAM1: "The date.",
		WEEK_PARAM2: 'The week starts on "Sunday"(default) or "Monday".',
		WEEK_DESC: "Week of the year. The 1st week always start from January 1st.",
		WEEK_RETURN: "To return 1~54.",
		WEEK_EXAMPLE: "Example 1: WEEK(DATE(2022,1,1)), return 1, represent the 1st week of 2022."
					+sNextLineTab+'Example 2: WEEK(DATE(2021,12,31),"Monday"), return 53, represent the 53rd week of 2021.',
		
		ISOWEEK_PARAM: "The date.",
		ISOWEEK_DESC: "Week of the year according to the ISO 8601 week calendar. Note that the first few days of the year may be the 52nd or 53rd week of the previous year, and the last few days of the year may be the 1st week of the next year. So, use with the ISOWEEKYEAR() function.",
		ISOWEEK_RETURN: "To return 1~53.",
		ISOWEEK_EXAMPLE: "Example 1: ISOWEEK(DATE(2022,12,31)), return 52, represent the 52nd week of 2022."
					+sNextLineTab+"Example 2: ISOWEEK(DATE(2023,1,1)), return 52, represent the 52nd week of 2022."
					+sNextLineTab+"Example 3: ISOWEEK(DATE(2023,12,31)), return 52, represent the 52nd week of 2023.",		
		
		ISOWEEKYEAR_DESC: "The year according to the ISO 8601 week calendar. Use with the ISOWEEK() function.",
		ISOWEEKYEAR_RETURN: "Integer.",
		
		ISOWEEKDAY_DESC: "The day of the week according to the ISO 8601 week calendar.",
		ISOWEEKDAY_RETURN: "To return 1~7, indicating Monday~Sunday.",
		ISOWEEKDAY_EXAMPLE: "ISOWEEKDAY(DATE(2023,1,1)), return 7, represent the 7th day of the week.",
		
		HOUR_PARAM: "The value of the date.",
		HOUR_DESC: "Access the value of \"Hours\".",
		HOUR_RETURN: "An integer (0~23).",
		HOUR_EXAMPLE: ", the returned value is 12.",
		
		MINUTE_PARAM: "The value of the date.",
		MINUTE_DESC: "Access the value of \"Minutes\".",
		MINUTE_RETURN: "An integer (0~59).",
		MINUTE_EXAMPLE: ", the returned value is 34.",
		
		SECOND_PARAM: "The value of the date.",
		SECOND_DESC: "Access the value of \"Second\".",
		SECOND_RETURN: "An integer (0~59).",
		SECOND_EXAMPLE: ", the returned value is 56.",
		
		TIME_PARAM1: "The hours (0~23).",
		TIME_PARAM2: "The minutes (0~59).",
		TIME_PARAM3: "The seconds (0~59).",
		TIME_DESC: "To return a decimal value of a specified time.",
		TIME_RETURN: "Return a decimal within the range of 0~0.999999, indicating a time between 0:00:00 and 23:59:59.",
		
		NOW_DESC: "To return the date object including the current date and time.",
		
		WORKDAY_PARAM1: "The start timestamp.",
		WORKDAY_PARAM2: "The end timestamp.",
		WORKDAY_PARAM3: "Organization number.",
		WORKDAY_DESC: "Calculate the working days within the specified time period.",
		WORKDAY_RETURN: "Integer. When the incoming organization does not exist, the return is empty. When the incoming time exceeds the validity period of the organization work calendar, the return is empty.",
		WORKDAY_EXAMPLE: 'Example 1: WORKDAY(TODATE("2021-9-1"), TODATE("2021-9-10"), [FOrgNumber]), From 0:00 on Sep.1 to 0:00 on Sep.10, may include 7 working days, return 7.'
						+sNextLineTab+'Example 2: WORKDAY(TODATE("2021-9-1 12:00"), TODATE("2021-9-2 12:00"), [FOrgNumber]), From 12:00 on Sep.1 to 12:00 on Sep.2, includes the starting point of working time on Sep.2, counted as one working day, return 1.',
		
		WORKHOUR_PARAM1: "The start timestamp.",
		WORKHOUR_PARAM2: "The end timestamp.",
		WORKHOUR_PARAM3: "Organization number.",
		WORKHOUR_DESC: "Calculate the working hours within the specified time period.",
		WORKHOUR_RETURN: "The integer part represents the hour, less than one hour is expressed as decimal part. When the incoming organization does not exist, the return is empty. When the incoming time exceeds the validity period of the organization work calendar, the return is empty.",
		WORKHOUR_EXAMPLE: 'Example 1: WORKHOUR(TODATE("2021-9-1"), TODATE("2021-9-2"), [FOrgNumber]), From 0:00 on Sep.1 to 0:00 on Sep.2, may include 8 working hours, return 8.',
		
		IF_PARAM1: "It is a logic expression which calculation result is true or false.",
		IF_PARAM2: "The value to be returned when the condition is true.",
		IF_PARAM3: "The value to be returned when the condition is false.",
		IF_DESC: "To return corresponding value by the conditions.",
		IF_RETURN: "Data type is uncertain, which is determined by exp1 or exp2.",
		IF_EXAMPLE: "IF([Order Qty] > 500, \"Qualified\", \"Unqualified\")。When the value of \"Order Qty\" field is greater than 500,then returns \"Qualified\"; otherwise, returns \"Unqualified\".",
		
		CASE_PARAM1: "boolExp(n): A logic expression, if the result is true, then returns the calculation result of the corresponding value expression.",
		CASE_PARAM2: "valueExp(n): A value expression, having one-to-one correspondence relationship with the logic expression.",
		CASE_PARAM3: "defaultValueExp: The default expression. If all the logic expression results are false, then returns the calculation reuslt of this expression.",
		CASE_DESC: "To access data based on multiple branch conditions.",
		CASE_RETURN: "The data type is uncertain, which is determined by the calculation result of valueExp(n) or defaultValueExp.",
		CASE_EXAMPLE: "CASE"
										 +sNextLineTab+"("
										 +sNextLineTab+"[Profit Rate]>0.8, \"High\","
										 +sNextLineTab+"[Profit Rate]>0.6, \"Medium\","
										 +sNextLineTab+"\"Low\""
										 +sNextLineTab+")"
										 +sNextLineTab+"When the value of \"Profit Rate\" is greater than 80%, then returns \"High\"; if the value is among 60%~80%, then returns \"Medium\"; otherwise, returns \"Low\".",

		AND_PARAM: "It is a logic expression which calculation result is true or false.",
		AND_DESC: "To return logics and values of all parameters.",
		AND_RETURN: "The logic value is true or false.",
		AND_EXAMPLE: "IF(AND([Date of birth] >=TODATE(\"1990-1-1\"), [Date of birth] 	<TODATE(\"2000-1-1\")), \"Post-90s\", \"Others\"),When the value of \"Date of birth\" field is between 1990-1-1~1999-12-31, then returns \"Post-90s\",otherwise, returns \"Others\".",

		OR_PARAM: "It is a logic expression which calculation result is true or false.",
		OR_DESC: "To return logics or values of all parameters.",
		OR_RETURN: "The logic value is true or false.",
		OR_EXAMPLE: "IF(OR([Age] >30, [Company Service Years] >=10), \"Eligible\", \"Not eligible\"), a company set conditions for promotion: If the age is greater than 30, or has been working for more than 10 years (include 10 years) in this company, then returns \"Eligible\"; otherwise, returns \"Not eligible\".",

		NOT_PARAM: "It is a logic expression which calculation result is true or false.",
		NOT_DESC: "To return non logic value of parameters.",
		NOT_RETURN: "The logic value is true or false.",
		NOT_EXAMPLE: 'IF(NOT([Age]>=18), "Under Aged", "Adult")  If the age is less than 18, then returns "Under Aged"; otherwise, returns "Adult".',
		
		ABS_PARAM: "Refers to a real number needing to calculate its absolute value.",
		ABS_DESC: "To return the absolute value of the number.",
		ABS_EXAMPLE: "Example 1: ABS(2), the absolute value of 2 is 2."
										 +sNextLineTab+"Example 2: ABS(-2), the absolute value of -2 is 2.",
		
		MOD_PARAM1: "Refers to a dividend.",
		MOD_PARAM2: "Refers to a divisor.",
		MOD_DESC: "To return the compliment number of the division.",
		MOD_RETURN: "The compliment number of the division, and the sign of the result is the same as the divisor.  If the divisor is 0, then returns null.",
		MOD_EXAMPLE: "Example 1: MOD(3, 2), the compliment number of 3/2 is (1)."
										 +sNextLineTab+"Example 2: MOD(-3, 2), the compliment number of-3/2, the sign is the same as the divisor, 1."
										 +sNextLineTab+"Example 3: MOD(3, -2), the compliment number of 3/-2, the sign is the same as the divisor, -1."
										 +sNextLineTab+"Example 4: MOD(-3, -2), the compliment number of -3/-2, the sign is the same as the divisor, -1.",
		
		ROUND_PARAM1: "The number needs to be rounded up/down.",
		ROUND_PARAM2: "Refers to the specified number of decimals, performing rounding according to this number.  Negative number is allowed, indicating the left side of the decimal.",
		ROUND_DESC: "To round up the number with a specified number of decimals.",
		ROUND_EXAMPLE: "Example 1: ROUND(2.15, 1), indicating 2.15 rounded up to one decimal place, is 2.2."
										 +sNextLineTab+"Example 2: ROUND(2.149, 1), indicating 2.149 rounded up to one decimal place, is 2.1."
										 +sNextLineTab+"Example 3: ROUND(-1.475, 2), indicating -1.475 rounded up to two decimal places, is -1.48."
										 +sNextLineTab+"Example 4: ROUND(21.5, -1), indicating 21.5 rounded up to one decimal place at the left side of the decimal, is 20.",
		
		INT_PARAM1: "The number which needs rounding.",
		INT_PARAM2: 'Optional, it can be:'
					+sNextLineTab+'"ceiling", the closest integer no less than the number,'
			        +sNextLineTab+'"floor"(default), the closest integer no more than the number,'
			        +sNextLineTab+'"up", the closest integer, far away from zero,'
			        +sNextLineTab+'"down", the closest integer, near to zero,'
			        +sNextLineTab+'"half_up", to the ends of the nearer, when the distance between two ends is the same, it is "up",'
			        +sNextLineTab+'"half_down", to the ends of the nearer, when the distance between two ends is the same, it is "down".',
		INT_DESC: "Round the number to the closest integer.",
		INT_RETURN: "Integer",
		INT_EXAMPLE: "Example 1: INT(8.9), round 8.9 downward to the closest integer 8."
										 +sNextLineTab+"Example 2: INT(-8.9), round -8.9 downward to the closest integer -9.",
		
		EXP_PARAM: "Refers to the index number of base e.",
		EXP_DESC: "It will return the nth power of 3.  The constant e is equal to 2.71828182845904, it is the base number of natural log.",
		EXP_EXAMPLE: "Example 1: EXP (1), returns the approximate value of e, 2.718282."
										 +sNextLineTab+"Example 2: EXP (2), returns the second power of base number e of natural log, 7.389056.",
		
		LN_PARAM: "Used to calculate the positive real number of the natural log.",
		LN_DESC: "To return a natural log of a number.  Constant e (2.71828182845904) is used as a base of natural log.",
		LN_EXAMPLE: "Example 1: LN(86), the natural log of 86 is 4.454347."
									    	+sNextLineTab+"Example 2: LN(2.7182818), the natural log of constant e is 1."
										    +sNextLineTab+"Example 3: LN(EXP(3)), the natural log of e^(-3) is 3.",

		LOG_PARAM1: "Used to calculate the positive real number of the natural log.",
		LOG_PARAM2: "The base number of the log.  If the base number is ignored, its value will be supposed to 10.",
		LOG_DESC: "To return a log of the number according to the specified base.",
		LOG_EXAMPLE: "Example 1: LOG(10), the log number of 10 is 1."
									    	+sNextLineTab+"Example 2: LOG(8, 2), when the base number is 2, the log number of 8 is 3."
										    +sNextLineTab+"Example 3: LOG(86, 2.7182818), when the base number is e, the log number of 86 is 4.454347.",
		
		POWER_PARAM1: "Base number, it can be any real number.",
		POWER_PARAM2: "Index number, the base number is the power of the index power.",
		POWER_DESC: "To return the power of the specified number.",
		POWER_RETURN: "The power of the specified number.",
		POWER_EXAMPLE: "Example 1: POWER(5,2), the square of 5 is 25."
									    	+sNextLineTab+"Example 2: POWER(98.6, 3.2), 3.2 power of 98.6 is 2401077."
										    +sNextLineTab+"Example 3: POWER(4, 5/4), 5/4 power of 4 is 5.656854.",
		
		SIGN_PARAM: "Refers to any real number.",
		SIGN_DESC: "To return the symbol of the number.",
		SIGN_RETURN: "When it is a positive number, returns 1; when it is 0, returns 0; when it is a negative number, returns -1.",
		SIGN_EXAMPLE: "Example 1: SIGN(10), the symbol of positive number is 1."
									    	+sNextLineTab+"Example 2: SIGN(4-4), the symbol of 0 is 0."
										    +sNextLineTab+"Example 3: SIGN(-0.00001), the symbol of negative number is -1.",
		
		SQRT_PARAM: "The value of square root.",
		SQRT_DESC: "To return a positive square root.",
		SQRT_RETURN: "Positive real number",
		SQRT_EXAMPLE: ", the square root of 16 is 4.",
		
		PI_DESC: "To acquire the value of constant pi, which is 3.141593, accurate to six decimal places.",
		
		SIN_PARAM: "radian.",
		SIN_DESC: "To calculate the sin of the specified angle.",
		SIN_RETURN: "The sin value of the parameter.",
		SIN_EXAMPLE: "Example 1: SIN(PI()), the sin value of pi radian is 0."
										 +sNextLineTab+"Example 2: SIN(PI()/2), the sin value of pi/2 radian is 1."
										 +sNextLineTab+"Example 3: SIN(30*PI()/180), the sin value of 30 degree is 0.5."
										 +sNextLineTab+"Example 4: SIN(RADIANS(30)), the sin value of 30 degree is 0.5.",
		
		ASIN_PARAM: "The SIN of the angle, between -1 and 1.",
		ASIN_DESC: "To calculate the arcsine value of the parameter.",
		ASIN_RETURN: "The arcsine value of the parameter. Arcsine value is an angle, and the SIN of this angle equals to \"number\" parameter of this function.  The returned angle value will be expressed in radians, ranging from -pi/2 to pi/2."
											+sNextLineTab+"(Description: if you need to use degree to represent arcsine value, please time the result by 180/PI() or use DEGREES function to show it.)",
		ASIN_EXAMPLE: "Example 1: ASIN (-0.5), use radian to represent arcsine value of -0.5, that is -pi/6 (-0.5236)."
										 +sNextLineTab+"Example 2: ASIN(-0.5)*180/PI(), use degree to represent the arcsine value of -0.5, -30."
										 +sNextLineTab+"Example 3: DEGREES(ASIN(-0.5)),use degree to represent the arcsine value of -0.5, -30.",
		
		COS_PARAM: "The angle which requires cosine value, represented by radian.",
		COS_EXTRADESC: "(Description: If the unit of parameter is degree, you can multiply it by PI()/180 or use RADIANS function to convert it into radian. )",
		COS_DESC: "To calculate the cosine value of the specified angle.",
		COS_RETURN: "The cosine value of the parameter.",
		COS_EXAMPLE: "Example 1: COS (1.047), the cosine value of 1.047 radian is 0.500171."
										 +sNextLineTab+"Example 2: COS (60*PI()/180), the cosine value of 60 degree is 0.5."
										 +sNextLineTab+"Example 3: COS (RADIANS(60)), the cosine value of 60 degree is 0.5.",

		ACOS_PARAM: "The arc cosine of the angle, between -1 and 1.",
		ACOS_DESC: "To calculate the arc cosine of the specified angle.",
		ACOS_RETURN: "The arc cosine value of the parameter.",
		ACOS_EXAMPLE: "Example 1: ACOS (-0.5), use radian to represent -0.5, that is, arc cosine value of 2*pi/3 is 2.094395."
										 +sNextLineTab+"Example 2: ACOS (-0.5) *180/PI(), use degree to represent the arc cosine value of -0.5, 120."
										 +sNextLineTab+"Example 3: DEGREES (ACOS(-0.5)), use degree to represent the arc cosine value of -0.5, 120.",
		
		TAN_PARAM: "radian. If the unit of parameter is degree, you can multiply it by PI()/180 or use RADIANS function to convert it into radian.",
		TAN_DESC: "To calculate the tan of the specified angle.",
		TAN_RETURN: "The tan value of the parameter.",
		TAN_EXAMPLE: "Example 1: TAN(0.785), the TAN value of 0.785 radian is 0.99920."
										 +sNextLineTab+"Example 2: TAN(45*PI()/180), the TAN value of 45 degree is 1."
										 +sNextLineTab+"Example 3: TAN(RADIANS(45)), the TAN of 45 degree is 1.",

		ATAN_PARAM: "Refers to TAN of the angle.",
		ATAN_DESC: "To calculate arc tangent value.",
		ATAN_RETURN: "Arc tangent value.  Arc tangent value is an angle, the tan value is equal to \"number\" parameter value.  The returned angle value will be expressed in radians, ranging from -pi/2 to pi/2."
											+sNextLineTab+"(Description: if you need to use degree to represent arc tangent value, please time the result by 180/PI() or use DEGREES function to show it.)",
		ATAN_EXAMPLE: "Example 1: ATAN(1), use radian to represent the arc tangent value of 1, that is, pi/4(0.785398)."
										 +sNextLineTab+"Example 2: ATAN(1)*180/PI(), use degree to represent the arc tangent value of 1, 45."
										 +sNextLineTab+"Example 3: DEGREES(ATAN(1)), use degree to represent the arc tangent value of 1, 45.",
		
		ATAN2_PARAM1: "coordinate of the point.",
		ATAN2_PARAM2: "coordinate of the point.",
		ATAN2_DESC: "To calculate the arc tangent value of specified X and Y coordinate.  The angle value of arc tangent is equal to the angle of X-axis and the line through the origin and given coordinate point (x,y).  The result will be represented by radian ranging from –pi to pi (-pi excluded).",
		ATAN2_RETURN: "If the result is positive, it represents the angle rotated anticlockwise from x-axis, if the result is negative, it represents the angle rotated clockwise from x-axis. If both x and y are 0, ATAN2 will return NULL.",
		ATAN2_EXAMPLE: "Example 1: ATAN2 (1, 1), use radian to represent the arc tangent value of point (1,1), that is, pi/4(0.785398)."
										 +sNextLineTab+"Example 2: ATAN2 (-1, -1), use radian to represent the arc tangent value of point (-1,-1), 45."
										 +sNextLineTab+"Example 3: ATAN2 (-1, -1)*180/PI(), use degree to represent the arc tangent value of (1,1), -135."
										 +sNextLineTab+"Example 4: DEGREES (ATAN2(-1, -1)), use degree to represent the arc tangent value of (1,1), -135.",
		
		RADIANS_PARAM: "It is the angle which needs to be converted into radian.",
		RADIANS_DESC: "To convert the angle to radian.",
		RADIANS_RETURN: "A radian",
		RADIANS_EXAMPLE: ", convert 270 degree (angle) to 4.712389 or 3π/2 radian.",
		
		DEGREES_PARAM: "It is the radian which needs to be converted into angle.",
		DEGREES_DESC: "To convert radian into degree.",
		DEGREES_RETURN: "Angle",
		DEGREES_EXAMPLE: ", convert pi radian into 180 degree.",
		
		MAXIMUM_PARAM: "Expression.",
		MAXIMUM_DESC: "To return the maximum value among several expressions.",
		MAXIMUM_EXAMPLE: "Example 1: MAXIMUM(1,2,3), the returned value is 3."
												+sNextLineTab+"Example 2: MAXIMUM([Training Start Time], TODATE(\"2000-1-1\")), adopt the greater one, the dates earlier than 2000-1-1will be set to 2000-1-1.",
		
		MINIMUM_PARAM: "Expression.",
		MINIMUM_DESC: "To return the minimum value among several expressions.",
		MINIMUM_EXAMPLE: "Example 1: MINIMUM(1,2,3), the returned value is 1."
												+sNextLineTab+"Example 2: MINIMUM([Training Start Time], TODATE(\"2000-12-31\")), adopt the less one, the dates later than 2008-12-31 will be set to 2008-12-31.",
		
		TOSTRING_PARAM: "Expression.",
		TOSTRING_DESC: "To convert the expression to the string.",
		TOSTRING_RETURN: "String",
		TOSTRING_EXAMPLE: "TOSTRING([Age]), returns all the values of \"Age\" field in form of string.",
		
		TODATE_PARAM: "Expression.",
		TODATE_DESC: "To convert the expression to the date object.",
		TODATE_RETURN: "Date value",
		TODATE_EXAMPLE: "TODATE(\"2006-06-15\") equals to DATE(2006, 6, 15).",
		
		TONUMBER_PARAM: "Expression.",
		TONUMBER_DESC: "To convert the expression to the value type.",
		TONUMBER_RETURN: "Value",
		TONUMBER_EXAMPLE: ", returns 23.2.",
		
		ZN_PARAM: "Value expression.",
		ZN_DESC: "If the value expression is null, then returns 0; otherwise, returns itself.",
		ZN_EXAMPLE: "ZN([Profit])",
		
		SUM_PARAM: "Value expression.",
		SUM_DESC: "To return the sum of all values of value expression, and null value will be ignored.",
		SUM_EXAMPLE: "SUM([Sales Amount]), returns the sum of all non-null values corresponded to \"Sales Amount\" field.",
		
		AVG_PARAM: "Value expression.",
		AVG_DESC: "To return the average value of all values of value expression, and null value will be ignored.",
		AVG_EXAMPLE: "AVG([Sales Amount]), returns the average value of all non null values corresponded to \"Sales Amount\" field.",
		
		MEDIAN_PARAM: "Value expression.",
		MEDIAN_DESC: "To return the median value of all values of value expression, and null value will be ignored.",
		MEDIAN_EXAMPLE: "MEDIAN([Sales Amount]), returns the median value of all non null values corresponded to \"Sales Amount\" field.",
		
		COUNT_PARAM: "Expression.",
		COUNT_DESC: "To return the number of data entries, and it will not be counted when the expression value is null.",
		COUNT_EXAMPLE: "COUNT([Sales Amount]), returns the number of data entries of all non-null values corresponded to \"Sales Amount\" field. If there are three values in \"Sales Amount\" field: 1000, 1000 and 500, then COUNT([Sales Amount]) result is 3.",
		
		MAX_PARAM: "Value expression.",
		MAX_DESC: "To return the maximum value.",
		MAX_EXAMPLE: "MAX([Sales Amount]), returns the maximum value of \"Sales Amount\" field.",
		
		MIN_PARAM: "Value expression.",
		MIN_DESC: "To return the minimum value.",
		MIN_EXAMPLE: "MIN([Sales Amount]), returns the minimum value of \"Sales Amount\" field.",
		
		COUNTD_PARAM: "Expression.",
		COUNTD_DESC: "To return the number of unrepeated values of the specified field, and the null value will not be counted.",
		COUNTD_EXAMPLE: "Supposing there are many rows of data, \"Sex\" field contains two different values, like \"Male\" and \"Female\", then COUNTD([Sex]), returns 2.",

		SPLY_PARAM1: "Metric Expression",
		SPLY_PARAM2: "Date Dimension Function Expression",
		SPLY_PARAM3: "Defaults to 'ratio', representing year-on-year growth rate; 'value' represents the value of the same period last year; 'diff' represents the year-on-year difference",
		SPLY_DESC: "Specify the date dimension to obtain the year-on-year, same period last year value, or year-on-year difference of the metric.",
		SPLY_EXAMPLE: "SamePeriodLastYear(SUM([Amount]), DATEPART([OrderDate_YMD], 'YMD'), 'value') " +
			"Calculates the total amount for the same period last year based on the date dimension.",

		LP_PARAM1: "Metric Expression",
		LP_PARAM2: "Date Dimension Function Expression",
		LP_PARAM3: "Defaults to \"ratio\", representing year-on-year growth rate; \"value\" represents the value of the same period last year; \"diff\" represents the year-on-year difference",
		LP_DESC: "Specify the date dimension to obtain the sequential change, previous period value, or sequential change difference of the metric.",
		LP_EXAMPLE: "LastPeriod(SUM([Amount]), DATEPART([OrderDate_YMD], \"YMD\")) calculates the total amount for the sequential change based on the date dimension.",
		
		FORMAT_PARAM1: "Expression. Number or Date.",
		FORMAT_PARAM2: "Format-string.",
		FORMAT_EXTRADESC: "The date format-string likes MM-dd-yyyy HH:mm:ss. Specific idenfification characters are as follows.",
		FORMAT_EXTRADESC1: "Year. 2-digit or 4-digit.",
		FORMAT_EXTRADESC2: "Month in year. 1 01 Jan January.",
		FORMAT_EXTRADESC3: "Day in month. 1/2-digit or always 2-digit.",
		FORMAT_EXTRADESC4: "Hour in day (0~23).",
		FORMAT_EXTRADESC5: "Minute in hour.",
		FORMAT_EXTRADESC6: "Second in minute.",
		FORMAT_EXTRADESC7: "Am/pm marker.",
		FORMAT_EXTRADESC8: "Hour in am/pm (1~12).",
		FORMAT_EXTRADESC9: "Day name in week. Sun or Sunday.",
		FORMAT_DESC: "Format number or date as string.",
		FORMAT_EXAMPLE1: "FORMAT(12345.666, \"$#,##0.00\"), return \"$12,345.67\".",	
		FORMAT_EXAMPLE2: "FORMAT(DATE(2022,2,2), \"MMM.dd,yyyy E.\"), return\"Feb.02,2022 Wed.\".",
		
		TOTAL_PARAM1: "Aggregate function.",
		TOTAL_PARAM2: "Based on table view, the group horizontally outward. Default is the most outside.",
		TOTAL_PARAM3: "Based on table view, the group vertically outward. Default is the most outside.",
		TOTAL_DESC: "Obtain subtotal value for further proportion calculating.",
		TOTAL_EXAMPLE: "SUM([Field])/TOTAL(SUM([Field]),2) Proportion of subtotals grouped outward to the 2nd layer relative to the same row in the table.",
		
		RUNNINGSUM_PARAM1: "Aggregate function.",
		RUNNINGSUM_PARAM2: '"Y" is cumulative within the year. Default is cumulative across years.',
		RUNNINGSUM_DESC: "Cumulative, based on date dimension.",
		RUNNINGSUM_EXAMPLE: "RUNNINGSUM(SUM([Field]))",
		
		LASTPERIOD_PARAM1: "Aggregate function.",
		LASTPERIOD_PARAM2: '"ratio"(default) means growth rate. Or "value" means the value of last period. Or "diff" means the value of difference.',
		LASTPERIOD_DESC: "Period over period, based on date dimension.",
		LASTPERIOD_EXAMPLE: "LASTPERIOD(SUM([Field]))",
		
		SAMEPERIODLASTYEAR_PARAM1: "Aggregate function.",
		SAMEPERIODLASTYEAR_PARAM2: '"ratio"(default) means YoY growth rate. Or "value" means the value of the same period in last year. Or "diff" means the value of difference.',
		SAMEPERIODLASTYEAR_DESC: "Year over year, based on date dimension.",
		SAMEPERIODLASTYEAR_EXAMPLE: "SAMEPERIODLASTYEAR(SUM([Field]))",
		
		PARAM_PARAM1: "Parameter name.",
		PARAM_PARAM2: "When the parameter value cannot be obtained, use this value instead.",
		PARAM_DESC: "From the affecting of dashboard widget, parameter name can be specified and parameter value can be passed in. This function can obtain the parameter value.",
		PARAM_EXAMPLE: 'PARAM("hello") The parameter name is "hello", get the value.'
	});
})();