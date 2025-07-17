(function(KDApi,_){ 
    function MyComponent(model){
        this._setModel(model);
    }

    var isUpdate = false;
	var pwyWebsocket =null; 
	var websocketHeartbeatJs = null;
    MyComponent.prototype = {
        _setModel: function(model) {
            this.model = model;
        },
        init:function(props){
          console.log('-----init',this.model,props)
          isUpdate = false; 
         // setHtml(this.model,props,isUpdate);
        },
        update:function(props){
          console.log('-----update',this.model,props)
          isUpdate = true;  
          setHtml(this.model,props,isUpdate);
        },
        destoryed:function(){
            console.log('-----destoryed',this.model);
			if (websocketHeartbeatJs) {
				websocketHeartbeatJs.close();
				websocketHeartbeatJs=null;
			}
			if (pwyWebsocket) {
				pwyWebsocket.close();
				pwyWebsocket = null;
			}
        }

    }     
	var setHtml = function(model,props,isUpdate){   
		var data={};   
		var jsFiles='';
		var operate='open';
		var tin='';
		var eid='';
		var client_id='';
		var sign='';
		var timestamp='';
		var linkKey='';
		var env='';
		var sourceType='socket';
		var apiUrl=''; 
		var enableWebSocket=''; 
		var qrcodeType='qrcodeType';
		var socketUrl='socketUrl';
		if(props!=null&&props.data!=null){
			var popsData=props.data; 
			jsFiles=popsData['js'];  
			operate=popsData['operate'];  
			tin=popsData['tin'];
			eid=popsData['eid'];
			client_id=popsData['client_id'];
			sign=popsData['sign'];
			timestamp=popsData['timestamp'];
			linkKey=popsData['linkKey'];
			env=popsData['env'];
			qrcodeType=popsData['qrcodeType'];
			socketUrl=popsData['socketUrl'];
			apiUrl=popsData['apiUrl'];
			sourceType=popsData['sourceType'];
			enableWebSocket=popsData['enableWebSocket'];
		}  
		if(jsFiles==null||jsFiles===''){
			console.log('-----jsFiles is null');
			jsFiles=['./js/socket.io.js','./js/pwy-socketio-v2.js'];
		} 
		console.log('-----popsData',popsData);
		if(qrcodeType&&'cloudhub'==qrcodeType){  
			KDApi.loadFile(['./js/websocket-heartbeat.js'], model, function() {
				const options = {
					url: socketUrl,
					pingTimeout: 15000, 
					pongTimeout: 15000, 
					reconnectTimeout: 2000,
					pingMsg: "heartbeat",
					linkKey:linkKey
				}
				model.invoke('webSocketOpen', {"linkKey":linkKey}); 
				websocketHeartbeatJs = new WebsocketHeartbeatJs(options);
				if('1'==enableWebSocket&&window.WebSocket){ 
					websocketHeartbeatJs.connect();
					websocketHeartbeatJs.onclose = function() {
						console.log('connect close:'+linkKey);
					}
					websocketHeartbeatJs.onerror = function() {
						console.log('connect onerror');
					}
					websocketHeartbeatJs.onopen = function() {
						console.log('connect onopen:'+linkKey);
					}
					websocketHeartbeatJs.onmessage = function(e) {
						console.log('msg:', e.data);
						model.invoke('pushData', e.data); 
					}
					websocketHeartbeatJs.onreconnect = function(e) {
						console.log('reconnecting:'+linkKey);
					}
				}else{
					console.log('不支持websocket');
					websocketHeartbeatJs.polling(model,{'eventName':"pooling",'linkKey':linkKey});
				}
			});
		}else if(linkKey!=null&&linkKey!=''){
			console.log('-----websocket aws');
			console.log('-----linkKey',linkKey);
			KDApi.loadFile(jsFiles, model, function() {  
				  if('open'==operate && pwyWebsocket == null){
					 pwyWebsocket = new PwyWebSocket({
						apiUrl: apiUrl,
						url: socketUrl,
						env: env, //正式环境: prod, 测试环境: test
						tin: tin,   ///tin为获取userKey时的税号
						eid: eid,   //eid为获取userKey时的用户eid
						client_id: client_id, // 发票云分配的client_id
						sign: sign, // 签名规则：MD5(client_id + client_secret + timestamp)
						timestamp: timestamp,    // 签名时的时间戳
						name: linkKey, // 连接名称，选择发票前获取的linkKey
						sourceType: sourceType, // 默认socekt, 对于不支持socket的端请设置为polling，java端的轮询参考5
						onOpen: function(){ // 连接成功的回调
							console.log("连接成功"+ this.name);
						},
						onMessage: function(msg){
							model.invoke('pushData', msg);  
						},
						onError: function(errText, errCode){ //失败时的回调
							console.log('error',errText,errCode);
							model.invoke('onError', {'code':errText,'msg':errText});  
						} 
					}); 
				  }
				if('close'==operate &&pwyWebsocket!=null){
					pwyWebsocket.close();
					pwyWebsocket = null;
				}
					
			}); 
		}
    }     
    KDApi.register('websocket', MyComponent)
})(window.KDApi);
