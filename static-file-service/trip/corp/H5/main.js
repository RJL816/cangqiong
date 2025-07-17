function setElement(accessuserid, employeeid, signature, initpage, appid, endorsementID, token,callback, FlightSearchType,Ddate,Adate,DCityCode,ACityCode,IsOversea,corpPayType,CityID,CheckInDate,CheckOutDate) {
	var accessuser_ = document.getElementById("accessuserid");
	var employee_ = document.getElementById("employeeid");
	var signature_ = document.getElementById("signature");
	var initpage_ = document.getElementById("initpage");
	var app_ = document.getElementById("appid");
	var endorsement_ = document.getElementById("endorsementID");
	var token_ = document.getElementById("token");
	var callback_ = document.getElementById("callback");
	
	var FlightSearchType_ = document.getElementById("FlightSearchType");
	var Ddate_ = document.getElementById("Ddate");
	var Adate_ = document.getElementById("Adate");
	var DCityCode_ = document.getElementById("DCityCode");
	var ACityCode_ = document.getElementById("ACityCode");
	
	var IsOversea_ = document.getElementById("IsOversea");
	var corpPayType_ = document.getElementById("corpPayType");
	var CityID_ = document.getElementById("CityID");
	var CheckInDate_ = document.getElementById("CheckInDate");
	var CheckOutDate_ = document.getElementById("CheckOutDate");

	

	accessuser_.setAttribute("value", accessuserid);
	employee_.setAttribute("value", employeeid);
	signature_.setAttribute("value", signature);
	initpage_.setAttribute("value", initpage);
	app_.setAttribute("value", appid);
	endorsement_.setAttribute("value", endorsementID);
	token_.setAttribute("value", token);
	callback_.setAttribute("value", callback);
	
	FlightSearchType_.setAttribute("value", FlightSearchType);
	Ddate_.setAttribute("value", Ddate);
	Adate_.setAttribute("value", Adate);
	DCityCode_.setAttribute("value", DCityCode);
	ACityCode_.setAttribute("value", ACityCode);
	
	IsOversea_.setAttribute("value", IsOversea);
	corpPayType_.setAttribute("value", corpPayType);
	CityID_.setAttribute("value", CityID);
	CheckInDate_.setAttribute("value", CheckInDate);
	CheckOutDate_.setAttribute("value", CheckOutDate);
	
	
}

//setElement("obk_kingdee", "ceshi", "e4358183a2257d6161517779e6a45737", "FlightSearch", "kingdee", "KD-00-20180625-53558", "5b35e68b90e1d1aa44011b62");

//获取url中的参数
function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
	var r = window.location.search.substr(1).match(reg);  //匹配目标参数
	if (r != null) return unescape(r[2]); return null; //返回参数值
}

setElement(getUrlParam("accessuserid"), getUrlParam("employeeid"), getUrlParam("signature"), getUrlParam("initpage"), getUrlParam("appid"), getUrlParam("endorsementID"), getUrlParam("token"), getUrlParam("callback"),getUrlParam("FlightSearchType"), getUrlParam("Ddate"), getUrlParam("Adate"), getUrlParam("DCityCode"), getUrlParam("ACityCode"), getUrlParam("IsOversea"), getUrlParam("corpPayType"), getUrlParam("CityID"),getUrlParam("CheckInDate"), getUrlParam("CheckOutDate"));

document.getElementById("fLogin").submit();
