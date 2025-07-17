/**
 *  自定义控件书写模板
 */
(function(KDApi, $){
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
		console.log('initFunc。。。', model, props);
    }

	// Other Code
    var updateFunc = function(model, props) {
		console.log('updateFunc。。。', props.data, model.pageId);
		if (props.data) {
			var popsData=props.data; 
			console.log('popsData', popsData);
			var url=popsData['url']; 
			var urlType=popsData['urlType'];  
			if(url){
				loadThirdScript(url, urlType, function() {
					console.log('getPersonInfo');
					qing.call('getPersonInfo', {
						success : function(res){
							console.log('getPersonInfo');
							model.invoke('appauth',{"errcode":"0000","type":urlType,"result":res}); 
						},
						error: function(res){
							console.log('error',res);
							model.invoke('appauth',{"errcode":"0009","type":urlType,"result":res});
						}
					});
				}); 
			} 
		}
    } 
	
	function loadThirdScript(url, elementId, callback) {
        const target = document.getElementById(elementId)
        if (target) {
            console.log(elementId,url)
            callback()
            return
        }
        const script = document.createElement('script')
        script.id = elementId
        script.type = 'text/javascript'
        if (typeof(callback) === 'function') {
            if (script.readyState) {
                script.onreadystatechange = function() {
                    if (script.readyState == 'loaded' || script.readyState == 'complete') {
                        script.onreadystatechange = null
                        callback()
                    }
                }
            } else {
                script.onload = function() {
                    callback()
                }
            }
        }
        script.src = url
        document.body.appendChild(script)
    }
	
	// Other Code
    var destoryedFunc = function() {
		console.log('destoryedFunc。。。') 
    } 

    // 你只需知道第一个参数是你接下来要新增控件方案时填的方案id，第二个参数是上面声明的构造函数
    KDApi.register('appauth', Dialog)
})(window.KDApi) // 这里的jQuery不是必须要传进去的，可移除，要用到的时候才传，PC端系统默认会有jQuery对象，版本是1.12.4