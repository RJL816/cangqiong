$(function () {
	//alert("202206071006...")
	var isOpenSocket = false;
	console.log("in openWXCard");
	
	if (!parent.document.getElementById("icsdk")) {
		var icsdk = parent.document.createElement("script");
		icsdk.setAttribute("type", "text/javascript");
		icsdk.setAttribute("id", "icsdk");
		icsdk.setAttribute(
            "src",
            "https://oss-statics.icomecloud.com/jsbridge/1.5.5/x-bridge.umd.js"
        );
        parent.document.body.appendChild(icsdk);
    }
	
	var pwyPostmessage = {
		initEvent: function(handler) {
			handler = typeof handler === "function" ? handler : function() {};
			// openWXCard中监听苍穹后端发的指令
			if (window.addEventListener) {
				window.addEventListener("message", handler, false);
			} else {
				window.attachEvent("onmessage", handler);
			}
		},
		sendMsg: function(opt, target) {}
	};

	pwyPostmessage.initEvent(function(msgRes) {
		console.log("已触发 postMessage");
		console.log(msgRes.data);
		if (msgRes && msgRes.data) {
			var data = msgRes.data;
			console.log("data");
			if (typeof data == "string") {
				data = JSON.parse(msgRes.data);
			}
			if (data.type == "openWXCard") {
				openWechatCard(data.content);
			}
		}
	});
	
	function openWechatCard(content){
		console.log('调用卡包');
		content = JSON.parse(content);
		const pageId = content.pageId;
		const param = content.param;
		try {
			window.parent.ic.run({
				action: "icome.wxsdk", 
				params: param,
				success:(res) => {
					if (res.errCode == 0) {
						invokeCustomEvent("imageap_wxcard",JSON.stringify(res),pageId);
					} else {
						if (res.errCode =='-1') {
							alert(res.errorMsg);
						}
					}
				},
				fail:(res) => {
					alert('拉取微信发票失败');
				}
			});
		} catch (error) {
			alert('error: '+error);
		}
	};

	// ------------------------  工具方法   ------------------------
	// 调用后台
	function invokeCustomEvent(eventName, eventArgs, pageId) {
		top.window.invokeCustomEvent(pageId, null, [
			"wxcard",
			eventName,
			eventArgs
		]);
	}
});