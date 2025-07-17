function setElement(accessuserid, employeeid, signature, initpage, appid, endorsementID, token, callback, site, orderNumber) {
	var accessuser_ = document.getElementById("accessuserid");
	var employee_ = document.getElementById("employeeid");
	var signature_ = document.getElementById("signature");
	var initpage_ = document.getElementById("initpage");
	var app_ = document.getElementById("appid");
	var endorsement_ = document.getElementById("endorsementID");
	var token_ = document.getElementById("token");
	var callback_ = document.getElementById("callback");
	var site_ = document.getElementById("site");
	var orderNumber_ = document.getElementById("orderNumber");

	accessuser_.setAttribute("value", accessuserid);
	employee_.setAttribute("value", employeeid);
	signature_.setAttribute("value", signature);
	initpage_.setAttribute("value", initpage);
	app_.setAttribute("value", appid);
	endorsement_.setAttribute("value", endorsementID);
	token_.setAttribute("value", token);
	callback_.setAttribute("value", callback);
	site_.setAttribute("value", site);
	orderNumber_.setAttribute("value", orderNumber);
}

//setElement("obk_kingdee", "ceshi", "e4358183a2257d6161517779e6a45737", "FlightSearch", "kingdee", "KD-00-20180625-53558", "5b35e68b90e1d1aa44011b62");

//获取url中的参数
function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
	var r = window.location.search.substr(1).match(reg);  //匹配目标参数
	if (r != null) return unescape(r[2]); return null; //返回参数值
}

setElement(getUrlParam("accessuserid"), getUrlParam("employeeid"), getUrlParam("signature"), getUrlParam("initpage"), getUrlParam("appid"), getUrlParam("endorsementID"), getUrlParam("token"), getUrlParam("callback"),
	getUrlParam("site"), getUrlParam("orderNumber"));

document.getElementById("fLogin").submit();
