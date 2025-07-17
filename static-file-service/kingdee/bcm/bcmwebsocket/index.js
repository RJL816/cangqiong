(function(KDApi,$){

    function MyComponent(model){
        this._setModel(model);
    }

    MyComponent.prototype = {
        _setModel: function(model) {
            this.model = model;
			MyComponent.model = model;
        },
        init:function(props){
          console.log('-----init',this.model,props)
          MyComponent.props = props;
          initWebSocketEvent(this.model,props);
        },
        update:function(props){
          console.log('-----update',this.model,props)
          setHtml(this.model,props);
        },
        destoryed:function(){
            console.log('-----destoryed',this.model)
        }

    }

    var initWebSocketEvent = function(model,props){
		if(window.socket == undefined){
			//处理器注册
            var protocol = window.location.protocol.replace("http", "ws");//协议前缀
            var host = window.location.host;
//            var contextPath = window.location.pathname.substr(0, window.location.pathname.indexOf('/', 1));
            var contextPath = function() {
                var location = window.location.pathname; // 获取当前页面的路径
                var parts = location.split('/'); // 将路径分割成数组
                parts.pop(); // 移除最后一个元素，即当前文件或目录
                var contextPathResult = parts.join('/');
                var items = props.configItems;
                if(items != undefined){
                    items.forEach(function(item) {
                        if(item != undefined){
                            if("contextPath" == item.key){
                                contextPathResult = item.value;
                            }
                        }
                    });
                }
                return contextPathResult; // 重新组合成字符串
            };
			var listenerType = "kd.fi.bcm.business.websocket.WebSocketPageHandler";
			var identifytype = props.data.identifytype;
			var tenantsessionkey = "KERPSESSIONID"+props.data.tenantId;
			var defaultUrl = protocol + "//"+host+contextPath()+"/msgwatch/?identifytype="+identifytype+"&tenantsessionkey="+tenantsessionkey+"&listenerType="+listenerType;
			socket = new WebSocket(defaultUrl);
			socket.onopen=function(){
				clearInterval(MyComponent.IntervalId);
				console.log('-----WebSocket链接连接成功-----')
			};
			//获得消息事件
			socket.onmessage=function(msg){
			    model.invoke('updateView',msg.data);
			};
			//关闭事件
			socket.onclose = function(){
			    clearInterval(MyComponent.IntervalId);
				window.socket = undefined;
				MyComponent.IntervalId = setInterval(() => {
					if(window.socket == undefined){
					    console.log('-----正在尝试重连WebSocket链接-----')
						initWebSocketEvent(MyComponent.model,MyComponent.props);
					}
				},2000);
			};
			//发生了错误事件
			socket.onerror=function(){
			}
		}
    }

    KDApi.register('bcmwebsocket', MyComponent)
})(window.KDApi,jQuery);