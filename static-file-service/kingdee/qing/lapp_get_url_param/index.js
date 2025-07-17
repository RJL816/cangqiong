/**
 *  自定义控件书写模板
 */
(function(KDApi){
    // 构造函数，变量名随意，与最后一句代码的KDApi.register的第二个参数一致即可
    function LappGetUrlParam (model) {
        this._setModel(model)
    }

    // 原型中封装生命周期函数，固定格式
    LappGetUrlParam.prototype = {
        _setModel: function(model) {
            this.model = model
        },
        init: function(props){
            // TO DO
            initFunc(this.model, props)
        },
        update: function(props){
            // TO DO
        },
        destoryed: function(){
            // TO DO
        }
    }

    // Other Code
    var initFunc = function(model, props) {
		const mapParams = new URLSearchParams(window.location.search);
		// 获取所有参数
		var urlParams = {};
		for (const [key, value] of mapParams) {
		  urlParams[key] = value;
		}
		// 发送事件，后端插件监听事件进行重定向
		top.window.invokeCustomEvent(model.pageId, "", ["lapphome", "openUrl", JSON.stringify(urlParams)]);
    }
    // 你只需知道第一个参数是你接下来要新增控件方案时填的方案id，第二个参数是上面声明的构造函数
    KDApi.register('lapp_get_url_param', LappGetUrlParam)
})(window.KDApi) // 这里的jQuery不是必须要传进去的，可移除，要用到的时候才传，PC端系统默认会有jQuery对象，版本是1.12.4