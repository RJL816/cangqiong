/**
 *  自定义控件书写模板
 */
(function(KDApi, _){
    // 构造函数，变量名随意，与最后一句代码的KDApi.register的第二个参数一致即可
    function Dialog (model) {
        this._setModel(model)
    }

	var loading = false;
	var interval;
	
    // 原型中封装生命周期函数，固定格式
    Dialog.prototype = {
        _setModel: function(model) {
            this.model = model
        },
        init: function(props){
            // TO DO
            initFunc(this.model, props)
        },
        update: function(props){
            // TO DO
			updateFunc(this.model, props)
        },
        destoryed: function(){
            // TO DO
			destoryedFunc()
        }
    }

    // Other Code
    var initFunc = function(model, props) {
		console.log('initFunc。。。', model, props)
    }

	// Other Code
    var updateFunc = function(model, props) {
		console.log('updateFunc。。。', props.data, model.pageId);
		if (props.data) {
			var popsData=props.data;  
			var times=popsData['time']; 
			var millisec=popsData['millisec'];  
			if(millisec&&millisec>0){
			if(!interval){ 
				if(!times){
					times=1000;
				}
				interval = setInterval(function(){ 
					if(times<1){
						clearInterval(interval);  
						interval=null; 
					}else{  
						times--;
						model.invoke('interval', {"interval":"interval"});  
					}
				},millisec);
			}
			}else{
				clearInterval(interval);
				interval=null;
			} 
		}
    }
	
	// Other Code
    var destoryedFunc = function() {
		console.log('destoryedFunc。。。');
		clearInterval(interval);
		interval=null;
    }  
    // 你只需知道第一个参数是你接下来要新增控件方案时填的方案id，第二个参数是上面声明的构造函数
    KDApi.register('interval', Dialog)
})(window.KDApi) // 这里的jQuery不是必须要传进去的，可移除，要用到的时候才传，PC端系统默认会有jQuery对象，版本是1.12.4