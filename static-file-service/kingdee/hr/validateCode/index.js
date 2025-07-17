"use strict";

(function (KDApi, $) {

    function MyComponent(model) {
        this._setModel(model);
    }
    MyComponent.prototype = {
        _setModel: function _setModel(model) {
            this.model = model;
        },
        init: function init(props) {
            setHtml(this.model, props);
            // 每隔1分钟刷新验证码
            timerVal(this.model, 60000);
        },
        update: function update(props) {
            $(".vCode").attr("value", props.data.authCode);
            $("#verifycode").attr("src", props.data.content);
        },
        destoryed: function destoryed() {}
        /**
         * 定时刷新验证码
         */
    };var timerVal = function timerVal(model, timeout) {

        setInterval(function () {
            model.invoke('validateCode', "");
        }, timeout);
    };

    var setHtml = function setHtml(model, props) {
        KDApi.loadFile('./css/validateCode.css', model, function () {
            KDApi.templateFilePath('./html/validateCode.art', model, null).then(function (result) {
                model.dom.innerHTML = result;
                console.log(result);
                initEvent(model, props);
            });
        });
    };
    var initEvent = function initEvent(model, props) {
        $('.validate_code', model.dom).click(function () {
            model.invoke('validateCode', "");
        });

        model.invoke('validateCode', "");
    };
    KDApi.register('validateCode', MyComponent);
})(window.KDApi, jQuery);