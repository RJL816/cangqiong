(function(KDApi){

    function MyComponent(model){
        this._setModel(model);
    }

    MyComponent.prototype = {
        _setModel: function(model) {
            this.model = model;
        },
        init:function(props){
		  setHtml(this.model,props);
        },
        update:function(props){
		  postMessageByUpdate(this.model, props);
        },
        destoryed:function(){
		  dstoryedAfterClose();
        }

    }
	
	var dstoryedAfterClose = function(model,props) {
		var urlBaseElem = document.getElementById("umibaseurl");
		document.head.removeChild(urlBaseElem);
		
		var umiScriptElem = document.getElementById("umiscript");
		document.head.removeChild(umiScriptElem);
	}
	
    var setHtml = function(model,props){
		 
		 // KDApi.loadFile('./js/jquery.min.js',model.schemaId,null)             
		  KDApi.loadFile('./umi.css',model,() => {
			// 添加根节点，供视觉提供的js渲染
			model.dom.innerHTML = '<div id="root"></div>';
			
			// 设置routerBase，不然会渲染不出组件，umi功能
			let urlTarget = document.getElementById('umibaseurl');
			if(urlTarget){
				console.warn('umibaseurl has loaded.');
			} else {
				let urlScript = document.createElement('script');
				urlScript.id = 'umibaseurl'; //唯一标示，防止html文件中重复添加.
				urlScript.text = "window.routerBase = location.pathname";
				document.head.appendChild(urlScript);			
			}
			
			let umiTarget = document.getElementById('umiscript');
			if(umiTarget){
				console.warn('umiscript has loaded.');
			} else {
				var now = new Date();
				let umiScript = document.createElement('script');
				umiScript.id = 'umiscript'; //唯一标示，防止html文件中重复添加.
				umiScript.src = "././kingdee/pmgt/pmscreen/./umi.js?time=" + now.getTime();
				umiScript.type = "text/javascript";
				console.log('-----append umi js');
				document.getElementById('root').appendChild(umiScript);		
			}
			
        });
		
		/*KDApi.loadFile('./umi.js',model,() => {
			console.log('-----afterloadjs');
			//window.postMessage({ type: 'updateData', content: JSON.stringify(props.data) }, '*');
		});*/
		
		// 添加message监听器，处理组件和后端的交互
		addUmiMessageListener(function(e) {
			// 注册监听，当监听到invokeCustomEvent的消息时，向后端发送执行请求
//			console.log('-----1MessageListener',e.data);


			if ( "invokeCustomEvent"== e.data.type) {
				// 组件发出的消息，请求后端数据
                 var t = e.data;
                 "string" == typeof e.data && (t = JSON.parse(e.data));
                 model.invoke('invokeCustomEvent',e.data);
				console.log('-----invokeCustomEvent',e.data);
			}
//			if ("get_project_kind_info" == e.data.type) {
//            				var t = e.data;
//            				"string" == typeof e.data && (t = JSON.parse(e.data));
//            				// 组件发出的消息，请求后端数据
//            				model.invoke('get_project_kind_info',e.data);
//            				console.log('-----get_project_kind_info',e.data.type,e.data.content);
//            			}
//           switch (e.data.type){
//               case "init_data":
//                   model.invoke('init_data',''); console.log('-----init_data',e.data.type); // 当表达式的结果等于 value1 时，则执行该代码
//                   break;
//               case "get_project_kind_info":
//                    model.invoke('get_project_kind_info',e.data); console.log('-----get_project_kind_info',e.data.type); // 当表达式的结果等于 value1 时，则执行该代码
//                   break;
//               case "get_currency_info":
//                   model.invoke('get_currency_info',e.data); console.log('-----get_currency_info',e.data.type); // 当表达式的结果等于 value1 时，则执行该代码
//                   break;
//               case "get_reserve_pro_info":
//                    model.invoke('get_reserve_pro_info',e.data); console.log('-----get_reserve_pro_info',e.data.type); // 当表达式的结果等于 value1 时，则执行该代码
//                    break;
//               case "get_appr":
//                    model.invoke('get_approval_pro_info',e.data); console.log('-----get_approval_pro_info',e.data.type); // 当表达式的结果等于 value1 时，则执行该代码
//                    break;
//               case "get_complete_pro_info":
//                    model.invoke('get_complete_pro_info',e.data); console.log('-----get_complete_pro_info',e.data.type); // 当表达式的结果等于 value1 时，则执行该代码
//                    break;
//               case "get_invest_data":
//                     model.invoke('get_invest_data',e.data); console.log('-----get_invest_data',e.data.type); // 当表达式的结果等于 value1 时，则执行该代码
//                     break;
//               case "export_invest_data":
//                     model.invoke('export_invest_data',''); console.log('-----export_invest_data',e.data.type); // 当表达式的结果等于 value1 时，则执行该代码
//                     break;
//               default:
//                    console.log('-----无')
//           }
		});  
    }
	
	var postMessageByUpdate = function(model, props) {
		console.log('-----postMessageByUpdate',props.data);
		// 视觉交互提供的js会监听message方法
		window.postMessage({ type: 'updateData', content: props.data }, '*');
	}
	
	// 添加message监听
	function addUmiMessageListener(mcb) {
		console.log('-----addMessageListener');
		if (window.addEventListener) {
		  window.removeEventListener('message', mcb, false)
		  window.addEventListener('message', mcb, false)
		} else if (window.attachEvent) { // 兼容
		  window.detachEvent('message', mcb)
		  window.attachEvent('message', mcb)
		}
	}
    KDApi.register('pmscreen', MyComponent)
})(window.KDApi);