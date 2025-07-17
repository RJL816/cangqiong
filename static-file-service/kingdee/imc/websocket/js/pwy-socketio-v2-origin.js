//md5 模块
var hexcase = 0; function hex_md5(a) { return rstr2hex(rstr_md5(str2rstr_utf8(a))) } function hex_hmac_md5(a, b) { return rstr2hex(rstr_hmac_md5(str2rstr_utf8(a), str2rstr_utf8(b))) } function md5_vm_test() { return hex_md5("abc").toLowerCase() == "900150983cd24fb0d6963f7d28e17f72" } function rstr_md5(a) { return binl2rstr(binl_md5(rstr2binl(a), a.length * 8)) } function rstr_hmac_md5(c, f) { var e = rstr2binl(c); if (e.length > 16) { e = binl_md5(e, c.length * 8) } var a = Array(16), d = Array(16); for (var b = 0; b < 16; b++) { a[b] = e[b] ^ 909522486; d[b] = e[b] ^ 1549556828 } var g = binl_md5(a.concat(rstr2binl(f)), 512 + f.length * 8); return binl2rstr(binl_md5(d.concat(g), 512 + 128)) } function rstr2hex(c) { try { hexcase } catch (g) { hexcase = 0 } var f = hexcase ? "0123456789ABCDEF" : "0123456789abcdef"; var b = ""; var a; for (var d = 0; d < c.length; d++) { a = c.charCodeAt(d); b += f.charAt((a >>> 4) & 15) + f.charAt(a & 15) } return b } function str2rstr_utf8(c) { var b = ""; var d = -1; var a, e; while (++d < c.length) { a = c.charCodeAt(d); e = d + 1 < c.length ? c.charCodeAt(d + 1) : 0; if (55296 <= a && a <= 56319 && 56320 <= e && e <= 57343) { a = 65536 + ((a & 1023) << 10) + (e & 1023); d++ } if (a <= 127) { b += String.fromCharCode(a) } else { if (a <= 2047) { b += String.fromCharCode(192 | ((a >>> 6) & 31), 128 | (a & 63)) } else { if (a <= 65535) { b += String.fromCharCode(224 | ((a >>> 12) & 15), 128 | ((a >>> 6) & 63), 128 | (a & 63)) } else { if (a <= 2097151) { b += String.fromCharCode(240 | ((a >>> 18) & 7), 128 | ((a >>> 12) & 63), 128 | ((a >>> 6) & 63), 128 | (a & 63)) } } } } } return b } function rstr2binl(b) { var a = Array(b.length >> 2); for (var c = 0; c < a.length; c++) { a[c] = 0 } for (var c = 0; c < b.length * 8; c += 8) { a[c >> 5] |= (b.charCodeAt(c / 8) & 255) << (c % 32) } return a } function binl2rstr(b) { var a = ""; for (var c = 0; c < b.length * 32; c += 8) { a += String.fromCharCode((b[c >> 5] >>> (c % 32)) & 255) } return a } function binl_md5(p, k) { p[k >> 5] |= 128 << ((k) % 32); p[(((k + 64) >>> 9) << 4) + 14] = k; var o = 1732584193; var n = -271733879; var m = -1732584194; var l = 271733878; for (var g = 0; g < p.length; g += 16) { var j = o; var h = n; var f = m; var e = l; o = md5_ff(o, n, m, l, p[g + 0], 7, -680876936); l = md5_ff(l, o, n, m, p[g + 1], 12, -389564586); m = md5_ff(m, l, o, n, p[g + 2], 17, 606105819); n = md5_ff(n, m, l, o, p[g + 3], 22, -1044525330); o = md5_ff(o, n, m, l, p[g + 4], 7, -176418897); l = md5_ff(l, o, n, m, p[g + 5], 12, 1200080426); m = md5_ff(m, l, o, n, p[g + 6], 17, -1473231341); n = md5_ff(n, m, l, o, p[g + 7], 22, -45705983); o = md5_ff(o, n, m, l, p[g + 8], 7, 1770035416); l = md5_ff(l, o, n, m, p[g + 9], 12, -1958414417); m = md5_ff(m, l, o, n, p[g + 10], 17, -42063); n = md5_ff(n, m, l, o, p[g + 11], 22, -1990404162); o = md5_ff(o, n, m, l, p[g + 12], 7, 1804603682); l = md5_ff(l, o, n, m, p[g + 13], 12, -40341101); m = md5_ff(m, l, o, n, p[g + 14], 17, -1502002290); n = md5_ff(n, m, l, o, p[g + 15], 22, 1236535329); o = md5_gg(o, n, m, l, p[g + 1], 5, -165796510); l = md5_gg(l, o, n, m, p[g + 6], 9, -1069501632); m = md5_gg(m, l, o, n, p[g + 11], 14, 643717713); n = md5_gg(n, m, l, o, p[g + 0], 20, -373897302); o = md5_gg(o, n, m, l, p[g + 5], 5, -701558691); l = md5_gg(l, o, n, m, p[g + 10], 9, 38016083); m = md5_gg(m, l, o, n, p[g + 15], 14, -660478335); n = md5_gg(n, m, l, o, p[g + 4], 20, -405537848); o = md5_gg(o, n, m, l, p[g + 9], 5, 568446438); l = md5_gg(l, o, n, m, p[g + 14], 9, -1019803690); m = md5_gg(m, l, o, n, p[g + 3], 14, -187363961); n = md5_gg(n, m, l, o, p[g + 8], 20, 1163531501); o = md5_gg(o, n, m, l, p[g + 13], 5, -1444681467); l = md5_gg(l, o, n, m, p[g + 2], 9, -51403784); m = md5_gg(m, l, o, n, p[g + 7], 14, 1735328473); n = md5_gg(n, m, l, o, p[g + 12], 20, -1926607734); o = md5_hh(o, n, m, l, p[g + 5], 4, -378558); l = md5_hh(l, o, n, m, p[g + 8], 11, -2022574463); m = md5_hh(m, l, o, n, p[g + 11], 16, 1839030562); n = md5_hh(n, m, l, o, p[g + 14], 23, -35309556); o = md5_hh(o, n, m, l, p[g + 1], 4, -1530992060); l = md5_hh(l, o, n, m, p[g + 4], 11, 1272893353); m = md5_hh(m, l, o, n, p[g + 7], 16, -155497632); n = md5_hh(n, m, l, o, p[g + 10], 23, -1094730640); o = md5_hh(o, n, m, l, p[g + 13], 4, 681279174); l = md5_hh(l, o, n, m, p[g + 0], 11, -358537222); m = md5_hh(m, l, o, n, p[g + 3], 16, -722521979); n = md5_hh(n, m, l, o, p[g + 6], 23, 76029189); o = md5_hh(o, n, m, l, p[g + 9], 4, -640364487); l = md5_hh(l, o, n, m, p[g + 12], 11, -421815835); m = md5_hh(m, l, o, n, p[g + 15], 16, 530742520); n = md5_hh(n, m, l, o, p[g + 2], 23, -995338651); o = md5_ii(o, n, m, l, p[g + 0], 6, -198630844); l = md5_ii(l, o, n, m, p[g + 7], 10, 1126891415); m = md5_ii(m, l, o, n, p[g + 14], 15, -1416354905); n = md5_ii(n, m, l, o, p[g + 5], 21, -57434055); o = md5_ii(o, n, m, l, p[g + 12], 6, 1700485571); l = md5_ii(l, o, n, m, p[g + 3], 10, -1894986606); m = md5_ii(m, l, o, n, p[g + 10], 15, -1051523); n = md5_ii(n, m, l, o, p[g + 1], 21, -2054922799); o = md5_ii(o, n, m, l, p[g + 8], 6, 1873313359); l = md5_ii(l, o, n, m, p[g + 15], 10, -30611744); m = md5_ii(m, l, o, n, p[g + 6], 15, -1560198380); n = md5_ii(n, m, l, o, p[g + 13], 21, 1309151649); o = md5_ii(o, n, m, l, p[g + 4], 6, -145523070); l = md5_ii(l, o, n, m, p[g + 11], 10, -1120210379); m = md5_ii(m, l, o, n, p[g + 2], 15, 718787259); n = md5_ii(n, m, l, o, p[g + 9], 21, -343485551); o = safe_add(o, j); n = safe_add(n, h); m = safe_add(m, f); l = safe_add(l, e) } return Array(o, n, m, l) } function md5_cmn(h, e, d, c, g, f) { return safe_add(bit_rol(safe_add(safe_add(e, h), safe_add(c, f)), g), d) } function md5_ff(g, f, k, j, e, i, h) { return md5_cmn((f & k) | ((~f) & j), g, f, e, i, h) } function md5_gg(g, f, k, j, e, i, h) { return md5_cmn((f & j) | (k & (~j)), g, f, e, i, h) } function md5_hh(g, f, k, j, e, i, h) { return md5_cmn(f ^ k ^ j, g, f, e, i, h) } function md5_ii(g, f, k, j, e, i, h) { return md5_cmn(k ^ (f | (~j)), g, f, e, i, h) } function safe_add(a, d) { var c = (a & 65535) + (d & 65535); var b = (a >> 16) + (d >> 16) + (c >> 16); return (b << 16) | (c & 65535) } function bit_rol(a, b) { return (a << b) | (a >>> (32 - b)) };

//基础扩展
Function.prototype.method = function(name, func){
	if(!this.prototype[name]){
		this.prototype[name] = func;
	}
	return this;
}

//某些浏览器不支持IndexOf
Array.method('indexOf', function(value){
	var i,
		len = this.length;
	for(i=0;i<len;i++){
		if(this[i] === value){
			return i;
		}
	}
	return -1;
});


function pwySocketIo(opt, ioObject){
	this.io = window.io || ioObject;
	this.onError = opt.onError || function(){};
	this.fromType = opt.fromType || 'third'; //默认来自第三方third, pwy
	this.sourceType = opt.sourceType || 'socket'; //第三方获取数据的方式，默认socket
    this.disabledPolling = false;

	var defaultTransports = ['socket', 'polling']; //默认的数据传输方式
	if(!typeof window.postMessage === 'function'){
		defaultTransports = ['socket', 'polling'];
	}

    if(opt.name != ''){

        this.transports = window.WebSocket ? opt.transports || defaultTransports : ['polling'];

        this.name = hex_md5(opt.name);

    	this.client_id = opt.client_id || 'vc0c6hjlgnKCic';
    	this.tin = opt.tin || '440301999999980';
    	this.sign = opt.sign || '7158858eb2ee6b36381e85a6279b153d';
    	this.timestamp = opt.timestamp || '1556262656725';
		this.eid = opt.eid || 'eid';

		var env = opt.env || 'old';

        if(env === 'local'){
            this.baseApiUrl = opt.apiUrl || 'http://172.18.5.39:9104';
			this.url = opt.url || 'http://172.18.5.39:9092';
			this.path = opt.path || '';
        }else if(env === 'prod'){
			this.baseApiUrl = opt.apiUrl || 'https://api.piaozone.com';
			this.url = opt.url || 'https://link.piaozone.com';
			this.path = opt.path || '';
		}else if(env === 'test'){
			this.baseApiUrl = opt.apiUrl || 'https://api-dev.piaozone.com/test'; //http://202.104.120.128:9102/test
			this.url = opt.url || 'https://link-test.piaozone.com';
			this.path = opt.path || '';
		}else if(env === 'aws-test'){
			this.baseApiUrl = opt.apiUrl || 'https://aws.piaozone.com/api';
			this.url = opt.url || 'https://aws.piaozone.com';
			this.path = opt.path || '/link/socket.io';
		}else if(env === 'tx-test'){
			this.baseApiUrl = opt.apiUrl || 'https://api-test.piaozone.com'; //http://202.104.120.128:9102/test
			this.url = opt.url || 'https://api-test.piaozone.com';
			this.path = opt.path || '/link/socket.io';
		}else if(env === 'demo'){
			this.baseApiUrl = opt.apiUrl || 'https://api-dev.piaozone.com';
			this.url = opt.url || 'https://link.piaozone.com';
			this.path = opt.path || '';
		}else if(env === 'dev'){
			this.baseApiUrl = opt.apiUrl || 'http://172.18.5.39:9104';
			this.url = opt.url || 'http://172.18.5.39:9092';
            this.path = opt.path || '';
            this.sign = '8ec553845166a8c7b888fbcab0d00493';
		}else{ //旧版
			this.baseApiUrl = opt.apiUrl || 'https://api.piaozone.com';
			this.url = opt.url || 'https://wss.piaozone.com';
            this.path = opt.path || '/bill-ws/socket.io';
            this.name = opt.name;
            this.transports = ['socket'];
		}


    	this.socketIoTransports = opt.socketIoTransports || ['websocket', 'polling'];
        this.onOpen = opt.onOpen || function(){};

        this.onClose = opt.close || function() {};
        this.retryFlag = true;
		this.ws = null;

		this.socketConnected = false;
		this.isPolling = false;

		this.pollingRequest = false; //当前的request请求

		this.socketRetryTimes = 0; //socket重建连接次数
		this.socketRetryMaxTimes = 3; //socket重建连接最大次数，超过这个次数会强制转到厂轮询
		this.pongTimeoutNum = 0; //pong超时触发次数
		this.pongTimeoutMaxNum = 3; //pong超时触发最大次数，超过3次数会直接进入长轮询
		this.defaultPingTimeout = 5000; // 超过500ms算超时一次

        this.receivedMessage = [];
        this.debug = (opt.debug === true)?true:false;


		var self = this;
		this.onMessage = function(msg, handerOk, handerFail){
			typeof opt.onMessage === 'function' && opt.onMessage(msg, handerOk, handerFail);
        };

        this.getToken(function(resToken){
        	if(resToken.errcode !== '0000'){
        		self.onError('获取token异常', '0025710000007401');
        	}else{
        		if(typeof self.io === 'undefined' || self.sourceType === 'polling'){
					self.startPolling(true);
				}else{
					//socket不允许，就使用polling方式
		        	if(self.transports.indexOf('socket') !== -1) {
		        		self.init();
		        	}else if(self.transports.indexOf('polling') !== -1) {
		        		self.startPolling(true);
		        	}
				};
        	}
        })
    }else{
    	this.onError('参数不完整', '0025710000007400');
    }
}

pwySocketIo.prototype = {
    md5: function(s){
        return hex_md5(s);
    },
	getToken: function(handler){
		var url = this.baseApiUrl + '/base/fpzs/polling/oauth/token?client_id=' + this.client_id + '&tin=' + this.tin + '&sign=' + this.sign + '&timestamp=' + this.timestamp + '&eid=' + encodeURIComponent(this.eid);
		var self = this;
		this.sendJsonp(url + '&jsonpCallback=?', function(res){
			if(res.errcode === '0000'){
				self.access_token = res.access_token;
			}else{
				self.consoleLog('获取token异常：', res);
			}
			handler(res);
		}, function(errRes){
			handler({'errcode': 'tokenErr', 'description': '获取token出错'});
		})
	},
	pollingReply: function(messageId, cback){
        var self = this;

		var tempUrl = this.baseApiUrl + '/polling/fpzs/portal/receipt?access_token='+ this.access_token + '&key='+ encodeURIComponent(this.name) +'&msgId=' + messageId;

		this.consoleLog('开始消息服务端回复');
		this.sendJsonp(tempUrl + '&jsonpCallback=?', function(res){
			self.consoleLog('消息服务端回复成功');
			typeof cback === 'function' && cback();
		}, function(res){
			self.consoleLog('消息服务端回复失败');
			typeof cback === 'function' && cback();
		})
	},
	getUUId: function(){
		var d = new Date().getTime();
		var uuid = 'xxxxxxxx-xxxx-xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		  	var r = (d + Math.random()*16)%16 | 0;
		  	d = Math.floor(d/16);
		  	return (c=='x' ? r : (r&0x3|0x8)).toString(16);
		});
		return uuid;
	},
	getShortUUId: function(){
		var d = new Date().getTime();
		var uuid = 'xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		  	var r = (d + Math.random()*16)%16 | 0;
		  	d = Math.floor(d/16);
		  	return (c=='x' ? r : (r&0x3|0x8)).toString(16);
		});
		return uuid;
	},
	consoleLog: function(n, err){
		if(this.debug && window.console){
			if(typeof err === 'undefined'){
				window.console.log(n);
			}else{
				window.console.log(n, err);
			}

		}
	},
	consoleWarn: function(err){
		if(window.console){
			window.console.warn(err);
		}
	},
	consoleError: function(err){
		if(window.console){
			window.console.error(err);
		}
	},
	handlerMsg: function(msgId, cback){
		var self = this;

		//消息已经处理过，去重复
		if(typeof msgId !== 'undefined'){
			if(self.receivedMessage.indexOf(msgId) === -1){
				//消息没有重复，先回复，保存消息Id，然后处理消息事件
				self.receivedMessage.push(msgId);
				self.pollingReply(msgId);
				typeof cback === 'function' && cback();
			}else{
				//获取到重复消息，通知服务端清理
				self.pollingReply(msgId);
				typeof cback === 'function' && cback();
			}
		}else{
			typeof cback === 'function' && cback();
		}
	},
	sendJsonp: function(url, cback, errBack){
        var self = this;
        //创建 script 标签并加入到页面中
        var callbackName = ('jsonp_' + Math.random()).replace(".", "");
        var oHead = document.getElementsByTagName('head')[0];
        // options.data[options.callback] = callbackName;
        var oS = document.createElement('script');
        oHead.appendChild(oS);

        //创建jsonp回调函数
        window[callbackName] = function (json) {
            oHead.removeChild(oS);
            clearTimeout(oS.timer);
            window[callbackName] = null;
            typeof cback === 'function' && cback(json);
        };

        //发送请求
        oS.src = url.replace(/\?$/, callbackName);

        //超时处理
        oS.timer = setTimeout(function () {
            window[callbackName] = null;
            oHead.removeChild(oS);
            self.consoleError('jsonp 请求超时', url);
            typeof errBack === 'function' && errBack({'errcode': 'timeout', 'description': '请求超时'});
        }, 50000);
	},
	startPolling: function(firstFlag){ //轮询接口
		var self = this;
        if (this.disabledPolling) {
            return;
        }

		if(!self.isPolling){
			self.consoleLog('开始执行轮询');
            self.isPolling = true;
            self.socketConnected = false;
			self.onOpen(self.name, '0025710000007402');
		}


		if(self.pollingRequest){
			self.pollingRequest.abort();
		}
		var pollingUrl = self.baseApiUrl + '/polling/fpzs/portal/invoice/data/v2?access_token='+ self.access_token + '&key=' + encodeURIComponent(self.name) + '&jsonpCallback=?';
		self.pollingRequest = this.sendJsonp(pollingUrl, function(res){
			var errcode = res.errcode;
			if(errcode == '1300'){
                setTimeout(function(){
                    self.getToken(function(res){
                        if(res.errcode === '0000'){
                            self.startPolling(false);
                        }else{
                            self.onError(res.description, '0025710000007401', res.errcode);
                        }
                    })
                }, 30000);
			}else if(errcode == '1307' || errcode === '0000'){ //没有数据或者成功
				if(errcode === '0000' || res.data ){
					self.consoleLog('接收到轮询消息：', res);
					var curMsg = res.data.data;
                    var messageId = res.data.msgId;
                    if(self.receivedMessage.indexOf(messageId) === -1){
                        self.onMessage(curMsg, function(okResponse){
                            self.consoleError('新版socket库不支持前端直接回复消息，请通过api接口进行消息回复');
                        }, function(failResponse){
                            self.consoleError('新版socket库不支持前端直接回复消息，请通过api接口进行消息回复');
                        });
                    }

					self.handlerMsg(messageId, function(){
						self.startPolling(false);
					});

				}else{
					self.startPolling(false);
				}
			}else{
                setTimeout(function(){
                    self.startPolling(false);
                }, 30000);
			}
		}, function(x, e){
			if(x.statusText !== 'abort'){
				self.consoleLog('轮询时发送网络或者服务器异常, 延时2秒后重新轮询');
				self.consoleLog(x, e);
				//发送网络或者
				setTimeout(function(){
					self.startPolling(false);
				}, 12000);
			}

		});
	},
	retryConnect: function(errMsg, code){
		var self = this;
		self.consoleLog(self.socketRetryTimes);
		if(self.socketRetryTimes >= self.socketRetryMaxTimes){
			self.consoleLog('start polling');
			if(self.ws){
				self.ws.close();
			}

			self.socketRetryTimes = 0;
			if(!self.isPolling){
				this.pongTimeoutNum = 0;
				self.startPolling(true);
			}
		}else{
			this.pongTimeoutNum = 0;
			self.socketRetryTimes +=1;
			if(self.ws){
				self.ws.close();
				self.ws.open();
			}

		}
	},
	onPingTimeout: function(){
        var self = this;

		if(self.transports.indexOf('polling') !== -1){
            if(this.pongTimeoutNum < this.pongTimeoutMaxNum){
                this.pongTimeoutNum +=1;
                self.consoleLog('ping TimeOut次数' + this.pongTimeoutNum);
            }else{


                if(self.ws){
                    self.ws.close();
                }

                self.socketRetryTimes = 0;
                if(!self.isPolling){
                    this.pongTimeoutNum = 0;
                    self.startPolling(true);
                }
            }
        }else{
            self.consoleLog('已经禁用长轮询');
        }
	},
	onListenMessage: function(res, fn){
        var self = this;
		if(typeof res.data === 'string'){
			res.data = JSON.parse(res.data);
		}

		if(res.errcode === '0000'){
			if(res.data.eventType === 'ping'){
				typeof fn ==='function' && fn(res);
			}else{

				self.consoleLog('接收到socket消息：', res);

				if(self.receivedMessage.indexOf(res.data.msgId) == -1){
                    self.onMessage(res.data.data, function(resData){
                        var errcode = resData.errcode || '0000';
                        resData.errcode = errcode;
                        typeof fn ==='function' && fn(resData);

                    }, function(errData){
                        typeof fn ==='function' && fn(errData);
                    })
                }

                if(res.data && res.data.msgId){
					self.handlerMsg(res.data.msgId);
                }
			}
		}else{
			typeof fn ==='function' && fn(res);
		}
	},
	init: function(name){
		var self = this;
		if(typeof name !== 'undefined' && name !== this.name){
			this.name = name;
        }

		this.ws = this.io(this.url, {
	        // 实际使用中可以在这里传递参数
	        path: this.path,
	        autoConnect: false,
	        query: {
	          room: 'cloud',
	          userId: this.name
	        },
	        pingInterval: 30000,
			pingTimeout: 30000,
	        transports: this.socketIoTransports
	  	});

		this.ws.on('connect_failed', self.retryConnect.bind(self));
		this.ws.on('connect_error', self.retryConnect.bind(self));
		this.ws.on('connect_timeout', self.retryConnect.bind(self));

		this.ws.on('connect', function(){

			self.consoleLog('socket连接成功: ' + self.name);

			//旧版监听自己的消息
            self.ws.on(self.ws.id, self.onListenMessage.bind(self));

			//新版监听自己的消息
            self.ws.on(decodeURIComponent(self.name), self.onListenMessage.bind(self));

			self.socketConnected = true;
			self.pongTimeoutNum = 0;

			self.onOpen(self.name, '0025710000007402');

			self.startPingPongCheck();

		});

		this.ws.on('error', function(err){
			self.consoleLog('推送服务发送异常', err);
			self.onError('推送服务发送异常', '0025710000007401');
		})

		this.ws.on('disconnect', function(msg) {
			self.consoleLog('socket连接断开');
			self.socketConnected = false;
			//self.onClose('断开连接', msg);
	  	});

	  	this.ws.open();
	},
	sendPing: function(){
		var self = this;
		var defaultTimeout = self.defaultPingTimeout || 2000;
		var pingTime = +new Date();
        var pongTime = false;

		self.ws.emit('server', {
			target: self.name,
			msg: JSON.stringify({eventType: 'ping', data: pingTime})
		}, function(res) {

            if(document.hidden){
                self.consoleLog('页面当前不可见，忽略超时');
            }else{
                pongTime = +new Date();
                var runTime = pongTime - pingTime;

                if(res.errcode === '0000'){
                    if(runTime > defaultTimeout){
                        //启动轮询
                        self.consoleLog('ping 超时，耗时：' + runTime);
                        self.onPingTimeout();
                    }else{
                        self.pongTimeoutNum = 0;
                        self.consoleLog('ping 正常，耗时：' + runTime + '， pingTime: ' + (pingTime/1000));
                    }
                    return false;
                }else{
                    //异常, 启动轮询
                    self.consoleLog('ping 异常：'+ res.description);
                    self.consoleLog('ping name：'+ self.name);
                    self.onPingTimeout();
                    return false;
                }
            }

		});


        if(!document.hidden){
            //ping超时时间内无回复，
            setTimeout(function (){
                if(!pongTime ){
                    //启动轮询
                    self.consoleLog('ping 超时，500ms 内无回复，');
                    self.onPingTimeout();
                }
                return false;
            }, defaultTimeout>500?defaultTimeout:500);
        }else{
            self.consoleLog('页面当前不可见，忽略超时');
        }

	},
	startPingPongCheck: function(){
		//模拟ping pong发送消息，由于ping的时间由浏览器控制，兼容性不好
		var self = this;

		if(self.socketConnected){
			self.sendPing();
		}

		self.pingTick = setTimeout(function(){
			self.startPingPongCheck();
		}, 15000);
	},
	stopPolling: function(){
		this.isPolling = false;
        this.disabledPolling = true;
		if(this.pollingRequest){
			this.pollingRequest.abort();
		}
	},
	close: function(){
        try {
            this.stopPolling();
            window.clearTimeout(this.pingTick);
            if (this.ws) {
                this.ws.close();
            }
        } catch (error) {
            this.consoleLog('close err', err);
        }
	},
	sendNew: function(opt, retry, sendTime){
		var sendTime = sendTime || (+new Date());
		var url = opt.url || '';
    	var self = this;
    	var to = opt.to || '';
    	var msg = opt.msg || '';
    	var success = opt.success || function(){};
		var error = opt.error || this.onError;
		var timeOut = opt.timeOut || 15;

    	retry = retry || 3;
    	if(to === ''){
    		error('请指定发送的目标用户名', '0025710000007407');
    		return false;
    	}

    	if(msg === ''){
    		error('请指定需要发送的消息！', '0025710000007408');
    		return false;
		}


    	if(this.ws){


			this.ws.emit('server', {
				sid: self.name + '-' +(+new Date()) + '-' + Math.random(),
				msgId: (+new Date()) + self.getShortUUId,
				async: false,
				from: self.name,
				target: to,
				msg: JSON.stringify(msg),
				timeOut: opt.timeOut || 20
			}, function(res) {

				if(res.errcode === '0000'){
					success(res);
				}else{
					var nowTime = +new Date();
					if(nowTime-sendTime > timeOut* 1000){
                        var errMsg = res.description || '推送异常';
                        self.consoleLog('target', to);
                        self.consoleLog('from', self.name);
                        self.consoleLog('msg', msg);
						error('请求超时, ' + errMsg);
					}else{
						if(res.errcode === 'connectErr'){
							setTimeout(function(){
								self.sendNew(opt, retry - 1, sendTime);
							}, 1500);
						}else{
							var errMsg = res.description || '推送异常';
							error(errMsg);
						}
					}
				}
			});
		}else{
			error('未连接到推送服务', '0025710000007409');
		}

    }
}

window.pwySocketIo = pwySocketIo;
window.PwyWebSocket = pwySocketIo; //兼容版本