(function(){
 	var oManager = com.kingdee.bos.qing.framework.common.MultilanguageManager;
	var oPackage = com.kingdee.bos.qing.schedule;
	oManager.registPackageResources(oPackage, 
	{
		monthly: "Monthly",
		weekly: "Weekly",
		daily: "Daily",
		dataExtract: "Data Extract",
		noperiod: "No schedule",
		setperiod: "Set period",
		perid: "Period",
		/**MonthlyPane */
		num: "No.",
		day: "Day",
		lastDay: "LastDay",
		time: "Time",
		/**WeeklyPane */
		week: "Week",
		monday: "Monday",
		tuesday: "Tuesday",
		wednesday: "Wednesday",
		thursday: "Thursday",
		friday: "Friday",
		saturday: "Saturday",
		sunday: "Sunday",
		/**CustomPane*/
		customCron: "Custom",
		cronExpression:"Expression",
		cronErrorNotEmpty:"When the period in the setting is custom, the expression cannot be empty in a format like 0, 0, 12 *",
		cronError:"The parameter error, the cron expression error.",
		cronInCheck: "The cron expression is in the checking.",
		cronCheckError: "The cron expression is incorrect.",
		cronErrorPastTime:"The parameter error, expression error, past time and too far time, no execution time.",
		cronAnalysisResult:"Last 5 runs",
		cronAnalysising: "Getting the last 5 runs......",
		cronTipsMain: "The Cron expression consists of 7 parts, each separated by a space. The sequence is: Seconds Minutes Hours Day-of-Month Month Day-of-Week Year。The last part(Year) can be omitted.",
		cronTipsPartName: "Name",
		cronTipsPartValue: "Value",
		cronTipsPartChars: "Special characters allowed",
		cronTipsSecond: "Seconds",
		cronTipsMinute: "Minutes",
		cronTipsHour: "Hours",
		cronTipsDay: "Day-of-Month",
		cronTipsMonth: "Month",
		cronTipsWeek: "Day-of-Week",
		cronTipsYear: "Year",
		cronTipsChar1: "(Comma) Separate multiple values.",
		cronTipsChar2: "(Minus sign) Represents the range.",
		cronTipsChar3: "(Diagonal rod) m/n represents increasing n each time starting from m.",
		cronTipsChar4: "(Asterisk) Indicates all possibilities.",
		cronTipsChar5: "(Question mark) One of the conflicting Day-of-Month and Day-of-Week must be ignored with a question mark.",
		cronTipsExample: "e.g.",
		cronTipsExample1: "Execute once every day at 23:15.",
		cronTipsExample2: "Execute once every day at 13:00,18:00,21:00.",
		cronTipsExample3: "Execute at 2am on the 1st of each month.",
		cronTipsExample4: "Execute once every Wednesday and Friday at 9:30,10:30,11:30.",
		cronTipsExample5: "Execute every 10 minutes."
	});
})();