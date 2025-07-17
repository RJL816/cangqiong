function setElement(AppKey, Ticket, EmployeeID, Signature, TA ,SearchType,CorpPayType,From,To,DDate,CurrentLang) {
	var appKey_ = document.getElementById("AppKey");
	var ticket_ = document.getElementById("Ticket");
	var employeeID_ = document.getElementById("EmployeeID");
	var signature_ = document.getElementById("Signature");
	var ta_ = document.getElementById("TA");
	var searchType_ = document.getElementById("SearchType");
	var corpPayType_ = document.getElementById("CorpPayType");
	var From_ = document.getElementById("From");
	var To_ = document.getElementById("To");
	var DDate_ = document.getElementById("DDate");
	var currentLang_ = document.getElementById("CurrentLang");

	appKey_.setAttribute("value", AppKey);
	ticket_.setAttribute("value", Ticket);
	employeeID_.setAttribute("value", EmployeeID);
	signature_.setAttribute("value", Signature);
	ta_.setAttribute("value", TA);
	searchType_.setAttribute("value", SearchType);
	corpPayType_.setAttribute("value", CorpPayType);
	From_.setAttribute("value", From);
	To_.setAttribute("value", To);
	DDate_.setAttribute("value", DDate);
	currentLang_.setAttribute("value",CurrentLang);
	
}

//获取url中的参数
function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
	var r = window.location.search.substr(1).match(reg);  //匹配目标参数
	if (r != null) return unescape(r[2]); return null; //返回参数值
}

//setElement("obk_kingdee","5cb57a3e4d6d1e3db002e181","32453","fac109f4849b13e0a574022f8cfd16fa","CCSQ1809-000022","5","C","shenzhen","shanghai","2019-04-21","zh_cn");

setElement(getUrlParam("AppKey"), getUrlParam("Ticket"), getUrlParam("EmployeeID"), getUrlParam("Signature"), getUrlParam("TA"), getUrlParam("SearchType"), getUrlParam("CorpPayType"), getUrlParam("From"), getUrlParam("To"), getUrlParam("DDate"), getUrlParam("CurrentLang"));

document.getElementById("fLogin").submit();