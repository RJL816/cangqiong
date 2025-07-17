(function (KDApi, $) {
    function IncDecConfig(model) {
        this._setModel(model)
    }
    IncDecConfig.prototype = {
        _setModel: function (model) {
            this.model = model
        },
        init: function (props) {
            this.uniqueId = new Date().getTime();
            this.themeNum = props.themeNum;
            // this.initFunc(this.model, props);
            this.timestamp = null;
        },
        update: function (props) {
            if (props.data && props.data.event === 'init' || props.data.event === undefined) {
                this.initFunc(this.model, props);
            }
            if (props.data && props.data.event === 'conditionChange') {
                this.incDecConfig.conditionChange(props.data.args)
            }
            if (props.data && props.data.event === 'getData') {
                if(props.data.nanoTime !== this.timestamp) {
                    this.incDecConfig.getData(props.data.args);
                    this.timestamp = props.data.nanoTime;
                }
            }
        },

        initFunc: function (model, props) {
            let $this = this;
            // KDApi.loadFile(['./css/index.css', './src/incDecConfig_src.js'], model, function () {
            KDApi.loadFile(['./css/index.css', './js/incDecConfig.js'], model, function () {
                // 通过路径去获取html字符串，第一个参数是路径，第二个参数是model，第三个参数是HTML模板中变量的值
                KDApi.getTemplateStringByFilePath('./html/index.art', model, {
                    and: KDApi.getLangMsg(model, 'and'),
                    or: KDApi.getLangMsg(model, 'or'),
                    conditionLogic: KDApi.getLangMsg(model, 'conditionLogic')
                }).then(function (result) {
                    model.dom.innerHTML = result;
                    // 初始化
                    $this.initIncDecConfig(model, props);
                })
            })
        },
        initIncDecConfig: function (model, props) {
            // props.data = {
            //     args: {
            //         showType: 1,  // 0编辑态；1查看态
            //         conditionType: 2,  // 0并且；1或者；2自定义
            //         data: 'T01 并且 T02 或者 （ T03 或者 T04 ）'
            //     }
            // };

            var para = {
                model: model,
                args: props.data.args,
                KDApi: KDApi,
                themeNum: this.themeNum,
                uniqueId: this.uniqueId
            };

            this.incDecConfig = new KdWtcIncDecConfig(para);
        },
    };

    KDApi.register('wtcincdecconfig', IncDecConfig, {isMulLang: true})
})(window.KDApi, jQuery);