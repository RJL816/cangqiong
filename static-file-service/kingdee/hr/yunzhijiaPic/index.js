/**
 *  自定义控件书写模板
 */
(function(KDApi, $){
    // 构造函数，变量名随意，与最后一句代码的KDApi.register的第二个参数一致即可
    function yunzhijiaPic (model) {
        this._setModel(model)
    }

    // 原型中封装生命周期函数，固定格式
    yunzhijiaPic.prototype = {
        _setModel: function(model) {
            this.model = model
        },
        init: function(props){
            // TO DO
            initFunc(this.model, props)
        },
        update: function(props){
            initFunc(this.model, props)
        },
        destoryed: function(){
            // TO DO
        }
    }

    // Other Code
    var initFunc = function(model, props) {
        var text = props.data.text.match(/^\s*$/) || null ? false : props.data.text;
        KDApi.loadFile('./css/index.css', model, function() {
                KDApi.getTemplateStringByFilePath('./html/index.art', model, {text: text}).then(function(result) {
                    model.dom.innerHTML = result
                }) 
        })
    }

    // 你只需知道第一个参数是你接下来要新增控件方案时填的方案id，第二个参数是上面声明的构造函数
    KDApi.register('yunzhijiaPic', yunzhijiaPic)
})(window.KDApi, jQuery) // 这里的jQuery不是必须要传进去的，可移除，要用到的时候才传，PC端系统默认会有jQuery对象，版本是1.12.4
