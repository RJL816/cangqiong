'use strict';

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
        },
        update: function update(props) {},
        destoryed: function destoryed() {}
    };

    var setHtml = function setHtml(model, props) {
        KDApi.loadFile('./css/loginOffer.css', model, function () {
            KDApi.templateFilePath('./html/loginOffer.html', model, null).then(function (result) {
                model.dom.innerHTML = result;
                initEvent(model, props);
            });
        });
    };
    var initEvent = function initEvent(model, props) {
        $('#login', model.dom).click(function () {
            // 调用登录offer接口
            model.invoke('loginOffer', "");
        });
    };

    KDApi.register('loginOffer', MyComponent);
})(window.KDApi, jQuery);