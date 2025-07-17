var FPY_localRequestFun = function (KDApi, $, _) {
    function crossHttp(model, eventKey, option) {
        var opt = option || {};
        var method = opt.method || 'POST';
        var data = opt.data || '';
        var withCredentials = opt.withCredentials || false;
        var dataType = opt.dataType || 'json';
        var contentType = opt.contentType || 'text/plain';
        var timeout = opt.timeout || 60000;
        var url = opt.url || 'http://127.0.0.1:52320/cryptctl';

        var xhr = null;
        if (XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        }

        if (withCredentials && typeof xhr.withCredentials !== 'undefined') {
            xhr.withCredentials = true;
        }

        if (!xhr && typeof XDomainRequest !== 'undefined') {
            // 检查是否是IE，并且使用IE的XDomainRequest
            xhr = new XDomainRequest();
        }

        if (xhr) {
            try {
                xhr.timeout = timeout;
                xhr.contentLength = data.length;
            } catch (e) {
                console.warn('设置超时时间异常');
            }

            try {
                xhr.contentType = contentType;
            } catch (e) {
                console.warn('设置contentType异常');
            }

            xhr.onload = function () {
                var result = xhr.responseText;
                if (dataType === 'json') {
                    try {
                        result = JSON.parse(result);
                        model.invoke(eventKey, result);
                    } catch (e) {
                        //TODO handle the exception
                        model.invoke(eventKey, {
                            description: '服务端异常',
                            errcode: 'serverErr'
                        });
                    }
                } else {
                    model.invoke(eventKey, result);
                }
            };

            xhr.ontimeout = function () {
                model.invoke(eventKey, {
                    errcode: 'timeout',
                    description: '请求超时！'
                }, xhr);
            };

            xhr.onerror = function () {
                model.invoke(eventKey, {
                    errcode: 'err',
                    description: '请求异常！'
                }, xhr);
            };

            xhr.open(method, url, true); //窗口上下文的同步模式中不支持使用 XMLHttpRequest 的 timeout 属性

            if (typeof data === 'object') {
                data = JSON.stringify(data);
            }

            if (typeof data === 'string') {
                xhr.send(data);
            } else {
                model.invoke(eventKey, {
                    errcode: 'argsErr',
                    description: '参数格式不正确！'
                });
            }
        } else {
            xhr = null;
            model.invoke(eventKey, {
                errcode: 'accessErr',
                description: '组件不支持访问！'
            });
        }
    };

    this.updatelocalRequest = function (_model, props) {
        model = _model;
        var popsData = {};
        if (props != null && props.data != null) {
            popsData = props.data;
        }
        var eventKey = popsData["eventKey"];
        switch (eventKey) {
            case "crossHttp":
                crossHttp(model, eventKey, popsData.data)
                break;
            default:
                break;
        }
    };
};