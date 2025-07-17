// 监听发票云发起的扫码接口
var scanRCPostmessage = {
    initEvent: function (handler) {
        handler = (typeof handler === 'function' ? handler : function () {});
        if (window.addEventListener) {
            window.addEventListener("message", handler, false);
        } else {
            window.attachEvent("onmessage", handler);
        }
    },
    sendMsg: function (opt, target) {
        target = target || '*';
        window.frames['fwy'].contentWindow.postMessage(opt, target);
    }
}

function onMessage(msgRes) {
    console.log('msgRes', msgRes);
    var type = msgRes.data.type //事件类型
    if (type == 'scanCode') {
        scanCode();
    }
}

scanRCPostmessage.initEvent(onMessage);

function scanCode() {
    console.log("扫码");
    // var result = "https://bcfp.shenzhen.chinatax.gov.cn/verify/scan?hash=007979d35121d1eee5a80a8618d843404648967cc92d2363bb0d926cf50a2808f2&bill_num=09707118&total_amount=700"
    var result = ''
    scanRCPostmessage.sendMsg({
        type: 'scanResult',
        result: result
    }, '*');
}