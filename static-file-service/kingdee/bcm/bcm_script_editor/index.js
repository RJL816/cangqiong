var BCM_SCRIPT_CACHE = {};
(function (KDApi, $) {
    // 构造函数
    function MyComponent(model) {
        this._setModel(model)
    }

    MyComponent.prototype = {
        // 绑定model
        _setModel: function (model) {
            this.model = model
        },

        // 生命周期：初始化脚本编辑器
        init: function (props) {
            this.id = (Math.random().toString(32) + Date.now().toString(32)).substring(2);
            // 模板字符串
            var template = '<iframe id="<%=id%>" style="width:100%;height:100%;border:none;" src="<%=href%>"></iframe>';
            var href = KDApi.getNameSpace(this.model) + 'editor.html?id=' + this.id;
            var result = KDApi.getHTMLStringBytemplate(template, { id: this.id, href: href });
            this.model.dom.innerHTML = result;
            var initHeight = document.querySelector("#debugcontent").offsetHeight;
            window.BCM_SCRIPT_CACHE[this.id] = { data: props.data, editor: this.model, height: initHeight }
            const iframe = document.querySelector("iframe");


            // 观察器的回调函数
            const resizeObserverCallback = entries => {
                for (let entry of entries) {
                    if (iframe.contentWindow.reSize) {
                        iframe.contentWindow.reSize(entry.contentRect.height)
                    }
                }
            };

            // 创建一个观察器实例并传入回调函数
            const resizeObserver = new ResizeObserver(resizeObserverCallback);

            // 以上面的配置开始观察目标节点
            resizeObserver.observe(iframe);
        },

        // 生命周期：获取脚本编辑器的内容
        update: function (props) {
            if ("get_script_data_save" == props.data.cmd || "get_script_data_commit" == props.data.cmd || "get_script_data" == props.data.cmd) {
                var iframe = document.getElementById(this.id);
                var script = iframe.contentWindow.getEnCodeScript();
                if ("get_script_data_save" == props.data.cmd) {
                    this.model.invoke("return_script_data_save", script);
                } else if ("get_script_data_commit" == props.data.cmd) {
                    this.model.invoke("return_script_data_commit", script);
                } else {
                    this.model.invoke("return_script_data", script);
                }

            }

            if ("set_script_data" == props.data.cmd) {
                var iframe = document.getElementById(this.id);
                var script = props.data.script;
                iframe.contentWindow.setValue(script);
                this.model.invoke("return_script_data", script);
            }

            if ("append_script_data" == props.data.cmd) {
                var iframe = document.getElementById(this.id);
                var append = props.data.script;
                var script = iframe.contentWindow.getScript();
                iframe.contentWindow.setValue(script + append);
            }
        },

        // 生命周期：销毁
        destoryed: function () {
        }
    }

    // 注册自定义控件
    KDApi.register('bcm_script_editor', MyComponent);
})(window.KDApi, jQuery)
