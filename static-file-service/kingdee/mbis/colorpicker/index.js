(function (KDApi, $) {
    // 构造函数
    function MyComponent(model) {
        this._setModel(model);
    }

    var themeColor;
    MyComponent.prototype = {

        // 绑定model
        _setModel: function (model) {
            this.model = model;
        },
        // 生命周期：初始化
        init: function (props) {
            console.log('-----init', this.model, props);
            themeColor = getThemeColor(props.themeColor);
            setHtml(this.model, props);
        },
        // 生命周期：更新
        update: function (props) {
            console.log('-----update', this.model, props);
            themeColor = getThemeColor(props.theme);
            updateHtml(this.model, props);
        },
        // 生命周期：销毁
        destoryed: function () {
            console.log('-----destoryed', this.model);
        }

    }

    // 加载文件和模板
    var setHtml = function (model, props, isUpdate) {
        /** var cssHref = KDApi.getNameSpace(model) + './css/delLabel.css';
        if ($('link[href="' + cssHref + '"]').length === 0) {
            // 加载css文件
            KDApi.loadFile('./css/delLabel.css', model, function () {
                updateHtml(model, props);
            })
        } **/
        // 加载模板
        updateHtml(model, props);
    }

    var updateHtml = function (model, props) {
        // 模板字符串
        var template = '<input id="<%= itemKey %>" type="color" name="color" value="<%= color %>" />';

        // 根据接收的参数将字符串模板转为innerHTML
        var result = KDApi.getHTMLStringBytemplate(template, {
            itemKey: props.data && props.data.itemKey ? props.data.itemKey : model.configItems ? model.configItems.getIn([0, 'itemKey']) : 'mbis-color-picker',
            color: props.data && props.data.color ? props.data.color : model.configItems ? model.configItems.getIn([0, 'value']) : '#FF784B'
        });
        model.dom.innerHTML = result;
        // 绑定DOM操作事件
        initEvent(model, props);
    }

    // 获取主题色
    function getThemeColor(themeColor) {
        switch (themeColor) {
            case 'blue':
                return '#5582F3';
            case 'green':
                return '#29C392';
            case 'orange':
                return '#FC8555';
            case 'purple':
                return '#6869FB';
            default:
                return '#5582F3';
        }
    }
    // DOM节点操作函数
    var initEvent = function (model, props) {

        $('#' + props.data.itemKey).change(function () {
            console.log(this);
            var postValue = {
                'color': $(this).val()
            }
            model.invoke('colorchange', postValue);
        });
    }
    console.log('-----------------init');
    // 注册自定义控件
    KDApi.register('colorpicker', MyComponent);
})(window.KDApi, jQuery)
