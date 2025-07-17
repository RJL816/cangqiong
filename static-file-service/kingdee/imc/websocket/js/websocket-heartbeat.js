function WebsocketHeartbeatJs(options) {
	this.url = options.url || '';
	this.pingTimeout = options.pingTimeout || 15000;
	this.reconnectTimeout = options.reconnectTimeout || 2000;
	this.pingMsg = options.pingMsg || 'heartbeat';
	this.linkKey = options.linkKey;
	this.pollingTimeout = options.pollingTimeout || 1000;
	this.pingTimeoutTick = null;
	this.errorTick = null;
	this.closeTick = null;
	this.ws = null;
	this.onclose = function() {};
	this.onerror = function() {};
	this.onopen = function() {};
	this.onmessage = function() {};
	this.onreconnect = function() {};
	this.repeat = 1;
//	this.connect();
};

WebsocketHeartbeatJs.prototype = {
	connect: function() {
		this.reset();
		// 允许重连才行进行
		if (this.repeat === 0 || typeof WebSocket !== 'function') {
			return;
		}
		try {
            this.ws = new WebSocket(this.url);
			this.initEvents();
        } catch (error) {
			console.error('创建连接异常', err);
		}
	},
	setRepeat: function(v) {
		this.repeat = v;
	},
	initEvents: function() {
		var self = this;
		this.ws.onopen = function() {
			self.onopen();
			self.heartCheck();
		};
		this.ws.onclose = function() {
			self.onclose();
			self.closeTick = window.setTimeout(function() {
				self.onreconnect();
				self.connect();
			}, self.reconnectTimeout);
		};
		this.ws.onerror = function() {
			self.onerror();
			self.errorTick = window.setTimeout(function() {
				self.onreconnect();
				self.connect();
			}, self.reconnectTimeout);
		};
		this.ws.onmessage = function(e) {
			self.onmessage(e);
		};
	},
	polling: function(md, msg){
		var self = this;
		this.pollingTimeoutTick = window.setTimeout(function() {
			md.invoke('interval', msg);
			self.polling(md, msg);
		}, this.pollingTimeout);
	},
	reset: function() {
		try {
            if (this.ws) {
				this.ws.close();
			}
        } catch (error) {}
		window.clearTimeout(this.pingTimeoutTick);
		window.clearTimeout(this.errorTick);
		window.clearTimeout(this.closeTick);
		window.clearTimeout(this.pollingTimeoutTick);
	},
	close: function() {
		this.repeat = 0;
		this.reset();
	},
	heartCheck: function() {
		var self = this;
		this.pingTimeoutTick = window.setTimeout(function() {
			self.ws.send(self.pingMsg);
			console.log('linkKey:'+self.linkKey);
			self.heartCheck();
		}, self.pingTimeout);
	},
	send: function(msg) {
		this.ws.send(msg);
	}
}