$(function () {
  // alert("1658...")
  var isOpenSocket = false;
  console.log("in checkback1");

  //   监听发票云发送过来的关闭页面的postmessage
  parent.window.addEventListener("message", receiveMessage, false);
  function receiveMessage(msgRes) {
    console.log("msgRes", msgRes);
    var type = msgRes.data.type; //事件类型
    if (type == "closeIframe") {
      var fwy = parent.document.getElementById("fwy");
      if (fwy) {
        fwy.parentNode.removeChild(fwy);
        parent.window.history.go(-1);
      }

      isOpenSocket = false;
    }
  }

  if (!parent.document.getElementById("ddsdk")) {
    var ddsdk = parent.document.createElement("script");
    ddsdk.setAttribute("type", "text/javascript");
    ddsdk.setAttribute("id", "ddsdk");
    ddsdk.setAttribute(
            "src",
            "https://g.alicdn.com/dingding/dingtalk-jsapi/2.0.57/dingtalk.open.js"
        );
        parent.document.body.appendChild(ddsdk);
    }


    if (!parent.document.getElementById("importJs")) {
        var importJs = parent.document.createElement("script");
        importJs.setAttribute("type", "text/javascript");
        importJs.setAttribute("src", "invoicecloud/importInvoice.js");
        importJs.setAttribute("id", "importJs");
        parent.document.body.appendChild(importJs);
    }


    // 企业微信使用场景下, 在父层引入扫描二维码的api
    if (!parent.document.getElementById("scanRCodeJs")) {
        var scanRCodeJs = parent.document.createElement("script");
        scanRCodeJs.setAttribute("type", "text/javascript");
        scanRCodeJs.setAttribute("src", "invoicecloud/scanRCode.js");
        scanRCodeJs.setAttribute("id", "scanRCodeJs");
        parent.document.body.appendChild(scanRCodeJs);
    }


    var pwyPostmessage = {
        initEvent: function(handler) {
            handler = typeof handler === "function" ? handler : function() {};

            // checkback中监听苍穹后端发的指令
            if (window.addEventListener) {
                window.addEventListener("message", handler, false);
            } else {
                window.attachEvent("onmessage", handler);
            }

            // top中监听发票云发的指令
            if (top.window.addEventListener) {
                top.window.addEventListener("message", handler, false);
            } else {
                top.window.attachEvent("onmessage", handler);
            }
        },
        sendMsg: function(opt, target) {}
    };
    pwyPostmessage.initEvent(function(msgRes) {
        console.log("已触发 postMessage");
        if (msgRes && msgRes.data) {
            var data = msgRes.data;
            if (typeof data == "string") {
                data = JSON.parse(msgRes.data);
            }
            if (data.type == "openInvoiceCloudPage") {
                console.log("接收到苍穹后台的调用指令: 打开发票云页面");
                var content = data.content;
                if (content.indexOf("invokeMiniProgram") > 0) {
                    // invokeMiniProgram(content);
                    // alert("import invoice in dd");
                    console.log("调用参数:" + content);
                    var cfg = JSON.parse(content);

                    if (cfg["pageId"] != getPageIdInUrl()) {
                        console.log("pageId不匹配,不允许触发调用微信");
                        return;
                    }

                    // 根据不同的app走不同的逻辑
                    try {
                        if (cfg["app"] == "yunzhijia") {
                            invokeMiniProgram(cfg);
                        } else if (cfg["app"] == "dingding" && cfg["openType"] == "importInvoice") {
                            // 在钉钉中打开导入发票的界面 TODO
                            importInvoiceInDD(cfg);
                        } else if (cfg["openType"] == "importInvoice" && cfg["invokeMiniProgram"] != null && !cfg["invokeMiniProgram"]) {
                            // 以h5方式打开导入发票
                            importInvoiceInH5(cfg);
                        } else {
                            // 兼容以前的数据
                            invokeMiniProgram(cfg);
                        }
                    } catch (error) {
                        alert("调用发票云失败" + error);
                    }
                }
            }
        }
    });

    // 在云之家中导入发票
    function invokeMiniProgram(cfg) {
        console.log("准备调用微信了...");
        top.window.XuntongJSBridge.call(
            "launchMiniprogram", {
                userName: cfg.userName,
                miniprogramType: cfg.miniprogramType,
                path: cfg.path
            },
            function(result) {
                if (typeof(result) != "undefined" && result != null) {
                    invokeCustomEvent(
                        "alreadyBackFromInvoiceCloud",
                        JSON.stringify(result),
                        cfg["pageId"]
                    );
                }

            }
        );
    }

    // 	在钉钉app中导入发票
    function importInvoiceInDD(cfg) {
        var pwyWebsocket = new PwyWebSocket({
            env: cfg.env, //正式环境: prod, 测试环境: test
            tin: cfg.tin, ///tin为获取userKey时的税号
            eid: cfg.eid, //eid为获取userKey时的用户eid
            client_id: cfg.client_id, // 发票云分配的client_id
            sign: cfg.sign, // 签名规则：MD5(client_id + client_secret + timestamp)
            timestamp: cfg.timestamp, // 签名时的时间戳
            name: cfg.linkKey, // 连接名称，选择发票前获取的linkKey
            onOpen: function() {
                // 连接成功的回调
                console.log("连接成功" + this.name);
                var socketName = this.name;
                console.log(parent);
                try {
                    parent.showImportInvoicePage(
                        cfg.importInvoiceUrlInMobH5 + "&socketName=" + socketName
                    );
                } catch (error) {
                    alert("调用发票云失败, 失败原因:" + error);
                }
            },
            onMessage: function(msg) {
                // alert("获取到" + msg.data.length + "条数据");
                console.log("返回的数据:" + JSON.stringify(msg));
                var result = {};
                result["success"] = true;
                result["serialNo"] = "";
                result["version"] = "1";
                for (var i = 0; i < msg.data.length; i++) {
                    result["serialNo"] += msg.data[i].serialNo + ",";
                }

                if (result["serialNo"]) {
                    result["serialNo"] = result["serialNo"].substring(
                        0,
                        result["serialNo"].length - 1
                    );
                }
                console.log(JSON.stringify(result));
                invokeCustomEvent(
                    "alreadyBackFromInvoiceCloud",
                    JSON.stringify(result),
                    cfg["pageId"]
                );
            },
            onError: function(errText, errCode) {
                //失败时的回调
                alert("与发票云建立连接失败!");
                console.log("errText>>>" + errText);
            }
        });
    }


    // 以h5方式打开导入发票
    function importInvoiceInH5(cfg) {
        var iframe = document.createElement('iframe');
        iframe.width = '100%';
        iframe.height = '100%';
        iframe.style = "border:0;position:absolute;z-index:1051;top:0";
        iframe.id = "fwy";


        var pwyWebsocket = new PwyWebSocket({
            env: cfg.env, //正式环境: prod, 测试环境: test
            tin: cfg.tin, ///tin为获取userKey时的税号
            eid: cfg.eid, //eid为获取userKey时的用户eid
            client_id: cfg.client_id, // 发票云分配的client_id
            sign: cfg.sign, // 签名规则：MD5(client_id + client_secret + timestamp)
            timestamp: cfg.timestamp, // 签名时的时间戳
            name: cfg.linkKey, // 连接名称，选择发票前获取的linkKey
            onOpen: function() {
                // 连接成功的回调
                // alert("onOpen");
                console.log("连接成功" + this.name);
                var socketName = this.name;
                console.log(parent);
                try {

                    // 添加监听hash变化的事件
                    parent.window.onhashchange = function() {
                        // alert("hash change")
                        console.log("this.location.hash:" + this.location.hash)
                        if (this.location.hash.indexOf('invoicecloudiframe') < 0) {
                            var fwy = parent.document.getElementById('fwy');
                            if (fwy) {
                                // alert("on open..")
                                fwy.parentNode.removeChild(fwy);
                                isOpenSocket = false;
                            }
                        }

                    }

                    if (!isOpenSocket) {
                        
                        if(parent.window.location.hash.indexOf('?') > -1) {
                            parent.window.location.hash += '&invoicecloudiframe' + new Date().getTime();
                        }else{
                            parent.window.location.hash += '?invoicecloudiframe' + new Date().getTime();
                        }
                        iframe.src = cfg.importInvoiceUrlInMobH5 + "&socketName=" + socketName;
                        parent.document.body.appendChild(iframe);
                    }

                    isOpenSocket = true;


                } catch (error) {
                    alert("调用发票云失败, 失败原因:" + error);
                }
            },
            onMessage: function(msg) {
                // 删除导入发票打开的iframe
                // alert("on message outer.." + msg)
                // console.log("on message outer.." + msg);
                if (iframe) {
                    parent.window.history.go(-1);
                    iframe.parentNode.removeChild(iframe);
                    isOpenSocket = false;
                }


                // alert("获取到" + msg.data.length + "条数据");
                console.log("返回的数据:" + JSON.stringify(msg));
                var result = {};
                result["success"] = true;
                result["serialNo"] = "";
                result["version"] = "1";
                for (var i = 0; i < msg.data.length; i++) {
                    result["serialNo"] += msg.data[i].serialNo + ",";
                }

                if (result["serialNo"]) {
                    result["serialNo"] = result["serialNo"].substring(
                        0,
                        result["serialNo"].length - 1
                    );
                }

                if (msg.selectedBillType) {
                    result["selectedBillType"] = msg.selectedBillType;
                }
                
                console.log(JSON.stringify(result));
                invokeCustomEvent(
                    "alreadyBackFromInvoiceCloud",
                    JSON.stringify(result),
                    cfg["pageId"]
                );
            },
            onError: function(errText, errCode) {
                //失败时的回调
                alert("与发票云建立连接失败!");
                console.log("errText>>>" + errText);
                isOpenSocket = false;
            }
        });
    }

    // ------------------------  工具方法   ------------------------
    // 调用后台
    function invokeCustomEvent(eventName, eventArgs, pageId) {
        top.window.invokeCustomEvent(pageId, null, [
            "invoicecloud",
            eventName,
            eventArgs
        ]);
    }

    // 获取这个iframe的url
    function getPageIdInUrl() {
        var name, value;
        var result = {};
        var str = location.href; //取得整个地址栏
        var num = str.indexOf("?");
        str = str.substr(num + 1); //取得所有参数   stringvar.substr(start [, length ]

        var arr = str.split("&"); //各个参数放到数组里
        console.log(arr);
        for (var i = 0; i < arr.length; i++) {
            num = arr[i].indexOf("=");
            if (num > 0) {
                name = arr[i].substring(0, num);
                value = arr[i].substr(num + 1);
                result[name] = value;
            }
        }
        return result["pageId"];
    }
});
