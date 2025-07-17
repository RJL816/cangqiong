(function()
{
	var oManager = com.kingdee.bos.qing.framework.common.MultilanguageManager;
	var oPackage = com.kingdee.bos.qing.dsb.widget.mobile;
	oManager.registPackageResources(oPackage, 
	{
		horizontalScreen: "Landscape",
		verticalScreen: "Portrait",
		filter: "Filter",
		all: "(All)",
		about: "About",
		cardInfo: "Card Information",
		extractDataTime: "Data extract time",
		calendarYear: "",
		calendarYearCharacter: "-",
		calendarMonth: "",
		calendarMonthCharacter: "-",
		calendarDay: "",
		dateRangeError: "End date cannot be earlier than start date"
	});
})();