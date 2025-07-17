function setElement(AppKey, Ticket, EmployeeID, Signature, TA ,SearchType,CorpPayType,FlightSearchType,ClassType,PassengerType,PassengerQuantity,DDate1,DDate2,DCity1,ACity1,DCityId1,ACityId1,CurrentLang,loginmode,Backurl) {
	var appKey_ = document.getElementById("AppKey");
	var ticket_ = document.getElementById("Ticket");
	var employeeID_ = document.getElementById("EmployeeID");
	var signature_ = document.getElementById("Signature");
	var ta_ = document.getElementById("TA");
	//var loginmode_ = document.getElementById("loginmode");
	if(1 == loginmode) {
		var searchType_ = document.getElementById("SearchType");
		var corpPayType_ = document.getElementById("CorpPayType");
		var flightSearchType_ = document.getElementById("FlightSearchType");
		var classType_ = document.getElementById("ClassType");
		var passengerType_ = document.getElementById("PassengerType");
		var passengerQuantity_ = document.getElementById("PassengerQuantity");
		var dDate1_ = document.getElementById("DDate1");
		var dDate2_ = document.getElementById("DDate2");
		var dCity1_ = document.getElementById("DCity1");
		var aCity1_ = document.getElementById("ACity1");
		var dCityId1_ = document.getElementById("DCityId1");
		var aCityId1_ = document.getElementById("ACityId1");
		searchType_.setAttribute("value", SearchType);
		corpPayType_.setAttribute("value", CorpPayType);
		flightSearchType_.setAttribute("value", FlightSearchType);
		classType_.setAttribute("value", ClassType);
		passengerType_.setAttribute("value", PassengerType);
		passengerQuantity_.setAttribute("value", PassengerQuantity);
		dDate1_.setAttribute("value", DDate1);
		dDate2_.setAttribute("value", DDate2);
		dCity1_.setAttribute("value", DCity1);
		aCity1_.setAttribute("value", ACity1);
		dCityId1_.setAttribute("value", DCityId1);
		aCityId1_.setAttribute("value", ACityId1);
	}else{
		var Backurl_ = document.getElementById("Backurl");
		Backurl_.setAttribute("value", Backurl);
	}
	var currentLang_ = document.getElementById("CurrentLang");

	appKey_.setAttribute("value", AppKey);
	ticket_.setAttribute("value", Ticket);
	employeeID_.setAttribute("value", EmployeeID);
	signature_.setAttribute("value", Signature);
	ta_.setAttribute("value", TA);
	currentLang_.setAttribute("value",CurrentLang);

}

//获取url中的参数
function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
	var r = window.location.search.substr(1).match(reg);  //匹配目标参数
	if (r != null) return unescape(r[2]); return null; //返回参数值
}

//setElement("obk_kingdee","5cb573a2e83e8e36c02df26","32453","fac109f4849b13e0a574022f8cfd16fa","CCSQ1809-000022","1","C","D","Y","ADU","1","2019-04-20","2019-04-21","SHA","SZX","zh_cn");

setElement(getUrlParam("AppKey"), getUrlParam("Ticket"), getUrlParam("EmployeeID"), getUrlParam("Signature"), getUrlParam("TA"), getUrlParam("SearchType"), getUrlParam("CorpPayType"), getUrlParam("FlightSearchType"), getUrlParam("ClassType"), getUrlParam("PassengerType"), getUrlParam("PassengerQuantity"), getUrlParam("DDate1"), getUrlParam("DDate2"), getUrlParam("DCity1"), getUrlParam("ACity1"), getUrlParam("DCityId1"), getUrlParam("ACityId1"), getUrlParam("CurrentLang"),getUrlParam("loginmode"),getUrlParam("Backurl"));

document.getElementById("fLogin").submit();