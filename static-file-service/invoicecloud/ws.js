$(function () {
	// 20200902
	var oldHistory = history.length;
	var actionType = getQueryString("actionType") || "invoicecloudmsg";
	if (!getQueryString("nosocket")) {

		var pwyWebsocket = new PwyWebSocket({
			env: getQueryString("env"), //正式环境: prod, 测试环境: test
			tin: getQueryString("tin"), ///tin为获取userKey时的税号
			eid: getQueryString("eid"), //eid为获取userKey时的用户eid
			client_id: getQueryString("client_id"), // 发票云分配的client_id
			sign: getQueryString("sign"), // 签名规则：MD5(client_id + client_secret + timestamp)
			timestamp: getQueryString("timestamp"), // 签名时的时间戳
			name: getQueryString("linkKey"), // 连接名称，选择发票前获取的linkKey
			onOpen: function () { // 连接成功的回调
				console.log("连接成功" + this.name);

			},
			onMessage: function (msg) {
				//msg为接收到的消息， 消息格式：{"type":"saveBill", data: {}}
				//当type为saveBill时, data的数据为导入的发票数据，具体格式参考4.3
				//当type为saveEntrys时, data的数据为分录调整后的数据，具体格式参考6.4
				//当type为updateInvoice, data的数据为修改的发票基本信息，具体格式参考14.3
				//接收到消息后，企业处理好自己业务, 如果要调用查看发票界面（调用5.3接口进行缓存），处理完成关闭窗口即可
				console.log("msg>>" + msg);
				// 是修改发票逻辑时:
				if (actionType == "editInvoice") {
					result = {};
					result["success"] = true;
					result["serialNo"] = msg["data"]["data"]["serialNo"];
					result["option"] = msg;
					invokeCustomEvent(actionType, JSON.stringify(result));
				} else {
					// 构造返回后台所需的数据格式
					result = {};
					result["success"] = true;
					result["option"] = msg;
					var data = msg["data"];
					if (typeof data !== "undefined") {
						invoices = data["invoiceData"];
						var serialNos = "";
						if (invoices) {
							for (i = 0; i < invoices.length; i++) {
								serialNos += (invoices[i].serialNo + ",");
							}
						}
						result["serialNo"] = serialNos.substr(0, serialNos.length - 1);
					}
					invokeCustomEvent(actionType, JSON.stringify(result));

				}
			},
			onError: function (errText, errCode) { //失败时的回调
				alert("与发票云建立连接失败!");
				console.log("errText>>>" + errText);
			}
		});

	}

	function closeMobilePage() {
		$("#invoicepageframe", top.window.document).css("display", "none");
		$("#invoicepageframe", top.window.document).removeAttr("src");
		history.go("-1");
		invokeCustomEvent("invoicecloudmsg", JSON.stringify({
			"closeInvoiceMobilePage": "close the f__king page, Please!"
		}));
	}

	function getQueryString(name) {
		var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
		var r = window.location.search.substr(1).match(reg);
		if (r != null) {
			return unescape(r[2]);
		}
		return null;
	}

	/*
		调用后台表单插件
		前端依据pageid定位到后端插件
		后端插件重写 customEvent 方法，这三个参数对应后端 CustomEventArgs 的三个属性
	*/
	function invokeCustomEvent(eventName, eventArgs) {
		window.parent.window.invokeCustomEvent(getQueryString("pageid"), null, ["invoicecloud", eventName, eventArgs]);
	}
});