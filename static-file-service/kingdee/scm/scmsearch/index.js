/**
 *  自定义控件书写模板
 */
(function (KDApi, $) {
    // 构造函数，变量名随意，与最后一句代码的KDApi.register的第二个参数一致即可
    function search(model) {
        this._setModel(model)
    }

    // 原型中封装生命周期函数，固定格式
    search.prototype = {
        _setModel: function (model) {
            this.model = model
        },
        init: function (props) {
            initFunc(this.model, props)
            initEvent(this.model, props)
            intColor(this.model, props)
        },
        update: function (props) {
            updateFunc(this.model, props)
        },
        destoryed: function () {

        }
    }

    //设置主题设色
    var intColor = function (model, props) {
        var themeColor = props.themeNum;
        $(".buttonid", model.dom).css({
            "background-color": themeColor,
            "border-color": themeColor
        });
        $(".content", model.dom).css({
            "border-color": themeColor
        });
    }

    // 聚焦下拉框
    var updateFunc = function (model, props) {
        var fields = props.data && props.data.fields || ''
        var select = document.getElementById('selectid');
        // 恶心 现在平台自定义控件加载方式不同，导致初始化的时候获取不到下拉框
        if (null != select) {
            for (var i = 0; i < select.options.length; i++) {
                if (select.options[i].value == fields) {
                    $("#selectid option[value='" + fields + "']").prop("selected", true);
                    break;
                }
            }
        }
    }

    var index = 0;
    var initEvent = function (model, props) {
        // 监听键盘事件
        $(document).keydown(function (event) {
            if (index == 1) {
                index = 0;
                return;
            }
            if (event.keyCode == 13) {
                var select = document.getElementById('selectid').value;
                var input = document.getElementById('inputid').value;
                if (input.length > 0) {
                    if (input.length > 100) {
                        input = input.substring(0, 100);
                    }
                    var word = encodeURIComponent(input);
                    var clickdata = {
                        "select": select,
                        "input": word,
                    };
                    index = 1;
                    model.invoke('click', clickdata);
                }
            }
        });

        //内置了jquery对象，可直接使用$
        $('.buttonid', model.dom).click(function () {
            // model.invoke，用于给后端发送请求，第一个参数是事件名，可自定义；第二个参数是发送给后端的数据，可以是任意类型
            var select = document.getElementById('selectid').value;
            var input = document.getElementById('inputid').value;
            if (input.length > 0) {
                if (input.length > 100) {
                    input = input.substring(0, 100);
                }
                var word = encodeURIComponent(input);
                var clickdata = {
                    "select": select,
                    "input": word,
                };
                model.invoke('click', clickdata);
            }
        })
    }

    var initFunc = function (model, props) {
        // KDApi.loadFile可以通过路径加载js或css文件，并且在html文件头生成script或者link标签，第一个参数是路径，第二个参数是model，第三个参数是加载完成后执行的回调函数
        KDApi.loadFile('./css/search.css', model, function () {
            // 后端插件通过setData传给前端的数据，前端可以通过props.data去获取
            var value = props.data && props.data.inputvalue || ''
            var customCtrParam = props.data
            // 通过路径去获取html字符串，第一个参数是路径，第二个参数是model，第三个参数是HTML模板中变量的值
            KDApi.getTemplateStringByFilePath('./html/search.html', model, {
                inputvalue: value,
                goods: customCtrParam.goods,
                supplierNmae: customCtrParam.supplierNmae,
                search: customCtrParam.search,
                test: customCtrParam.test,
                brand: customCtrParam.brand,
                models: customCtrParam.models,
                classify: customCtrParam.classify
            }).then(function (result) {
                model.dom.innerHTML = result
                // 绑定DOM事件
                initEvent(model, props)
                intColor(model, props)
                updateFunc(model, props)
            })
        })
    }

    // 你只需知道第一个参数是你接下来要新增控件方案时填的方案id，第二个参数是上面声明的构造函数
    KDApi.register('scmsearch', search)
})(window.KDApi, jQuery) // 这里的jQuery不是必须要传进去的，可移除，要用到的时候才传，PC端系统默认会有jQuery对象，版本是1.12.4