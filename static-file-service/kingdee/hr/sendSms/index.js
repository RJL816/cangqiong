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
        update: function update(props) {
            if (props.data.isSuccess) {
                // 60时秒后重新显示发送按钮
                waitTime(60);
            }
        },
        destoryed: function destoryed() {}

    };

    var setHtml = function setHtml(model, props) {
        KDApi.loadFile('./css/sendSms.css', model, function () {
            KDApi.templateFilePath('./html/sendSms.html', model, null).then(function (result) {
                model.dom.innerHTML = result;
                initEvent(model, props);
            });
        });
    };
    var initEvent = function initEvent(model, props) {
        $('#send_sms', model.dom).click(function () {
            // 调用发送短信接口
            model.invoke('sendSms', "");
        });
    };

    function waitTime(time) {

        var wait_time = time;

        // 发送按钮
        var send_sms = document.getElementById("send_sms");
        send_sms.style.display = 'none';
        // 倒计时提示
        var resend = document.getElementById("resend");
        resend.style.display = '';
        // 重新发送倒计时
        var resend_time = document.getElementById("resend_time");
        // 等待时间
        resend_time.innerHTML = wait_time;
        if (wait_time == 0) {
            resend.style.display = 'none';
            send_sms.style.display = '';
        } else {
            wait_time--;
            setTimeout(function () {
                waitTime(wait_time);
            }, 1000);
        }
    }

    KDApi.register('sendSms', MyComponent);
})(window.KDApi, jQuery);