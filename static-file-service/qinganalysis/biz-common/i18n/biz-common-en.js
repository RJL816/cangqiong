(function()
{
	var oMLS = com.kingdee.bos.qing.framework.common.MultilanguageManager;
	var oPackage = com.kingdee.bos.qing.biz.common;
	oMLS.registPackageResources(oPackage,
	{
		totalSelected: "#1 items selected,",
		totalRow: "Total #1 items",
		selectAll: "select all",
		cancelSelectAll: "deselect all",
		totalPage: "Total #1 pages",
		jumpTo: "Go to",
		paginationPage: "Page",
		tipsFirstPage: "first page",
		tipsPreviousPage: "previous page",
		tipsNextPage: "next page",
		tipsEndPage: "the last page",
		rowsPerPage: "/Page",
		selectNoRole: "Have not selected any role",
		selectMultiRole: "#2 Roles:\"#1\",etc.",
		selectSingleRole: "1Role:\"#1\"",
		selectNoUser: "Have not selected any user",
		selectMultiUser: "#2 Users:\"#1\",etc.",
		selectSingleUser: "1User:\"#1\"",
		confirmClearAuthority: "Confirm clear authority",

		detail: "View Details",
		name: "Name",
		code: "Code",
		noData: "No Data Available",
		dateRangeOk: "OK",
		dateRangeCancel: "Cancel",
		sort: "Sort",
		sortDESC: "Descending",
		sortASC: "Ascending"
	});
})();