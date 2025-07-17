(function(KDApi,$,_){ 
    function MyComponent(model){
        this._setModel(model);
    }

    var isUpdate = false;
	var pwyWebsocket =null; 
    MyComponent.prototype = {
        _setModel: function(model) {
            this.model = model;
        },
        init:function(props){
          console.log('-----init',this.model,props)
          isUpdate = false; 
          setHtml(this.model,props,isUpdate);
        },
        update:function(props){
          console.log('-----update',this.model,props)
          isUpdate = true;  
          setHtml(this.model,props,isUpdate);
        },
        destoryed:function(){
            console.log('-----destoryed',this.model)
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
		}  
		if(jsFiles==null||jsFiles===''){
			console.log('-----jsFiles is null');
			jsFiles=['./js/socket.io.js','./js/pwy-socketio-v2.js'];
		} 
		console.log('-----popsData',popsData);
		if(qrcodeType&&'cloudhub'==qrcodeType){
			console.log('-----websocket',qrcodeType);
			var socket = new WebSocket(socketUrl);
			//打开事件
			socket.onopen = function() {
				console.log("连接成功",socketUrl);
			};
			//获得消息事件
			socket.onmessage = function(msg) {
				console.log("onmessage",msg);
				model.invoke('onMessage', msg);  
			};
			//关闭事件
			socket.onclose = function() {
				console.log("Socket has been closed"); 
			};
			//发生了错误事件
			socket.onerror = function(errText) {
				console.log('error',errText);
				model.invoke('onError', errText);  
			} 
		}
		
		if(linkKey!=null&&linkKey!=''){
			console.log('-----websocket aws');
			KDApi.loadFile(jsFiles, model, () => {  
				  if('open'==operate && pwyWebsocket == null){
					 pwyWebsocket = new PwyWebSocket({
						env: env, //正式环境: prod, 测试环境: test
						tin: tin,   ///tin为获取userKey时的税号
						eid: eid,   //eid为获取userKey时的用户eid
						client_id: client_id, // 发票云分配的client_id
						sign: sign, // 签名规则：MD5(client_id + client_secret + timestamp)
						timestamp: timestamp,    // 签名时的时间戳
						name: linkKey, // 连接名称，选择发票前获取的linkKey
						sourceType: 'socket', // 默认socekt, 对于不支持socket的端请设置为polling，java端的轮询参考5
						onOpen: function(){ // 连接成功的回调
							console.log("连接成功"+ this.name);
						},
						onMessage: function(msg){
							model.invoke('onMessage', msg);  
						},
						onError: function(errText, errCode){ //失败时的回调
							console.log('error',errText,errCode);
							model.invoke('onError', {'code':errText,'msg':errText});  
						} 
					}); 
				  }
				if('close'==operate &&pwyWebsocket!=null){
					pwyWebsocket.close();
				}
					
			}); 
		}
    }     
    KDApi.register('invoicereceive', MyComponent)
})(window.KDApi,jQuery);
