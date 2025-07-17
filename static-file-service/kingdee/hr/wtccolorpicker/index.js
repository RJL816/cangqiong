(function(KDApi, $){
    function ColorPickerEntry (model) {
        this._setModel(model)
    }

    ColorPickerEntry.prototype = {
        _setModel: function(model) {
            this.model = model
        },
        init: function(props){},
        update: function (props) {
            let $this = this;

            initFunc(this.model, props);
        },
    };

    var initFunc = function(model, props) {
        // KDApi.loadFile可以通过路径加载js或css文件，并且在html文件头生成script或者link标签，第一个参数是路径，第二个参数是model，第三个参数是加载完成后执行的回调函数
        // KDApi.loadFile(['./css/index.css', './src/colorpicker.js', './src/myTool.js'], model, function() {
        KDApi.loadFile(['./css/index.css', './js/colorpicker.js', './js/myTool.js'], model, function() {
            // 通过路径去获取html字符串，第一个参数是路径，第二个参数是model，第三个参数是HTML模板中变量的值
            KDApi.getTemplateStringByFilePath('./html/index.art', model, {
                shiftColor: KDApi.getLangMsg(model, 'shiftColor'),
                standardColor: KDApi.getLangMsg(model, 'standardColor')
            }).then(function(result) {
                model.dom.innerHTML = result;
                // 初始化颜色选择器
                initColorPicker(model, props)
            })        
        })
    };

    var initColorPicker = function(model, props){
        // 后端插件通过setData传给前端的数据，前端可以通过props.data去获取
        new Colorpicker({
            model: model,
            el: "color-picker-btn",
            color: props.data && props.data.color || undefined,  // 颜色色号
            type: props.data && props.data.type,  //控件类型：0：日期类型控件；1：班次颜色控件
            status: props.data && props.data.status,  // 显示态VIEW、编辑态EDIT
            tips: props.data && props.data.shiftcolorprompt  // tips内容
        });
    };

    KDApi.register('wtccolorpicker', ColorPickerEntry, {isMulLang: true})
})(window.KDApi, jQuery);