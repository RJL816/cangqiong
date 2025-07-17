/**
 *  自定义控件书写模板
 */
(function (KDApi, $) {
    // 构造函数，变量名随意，与最后一句代码的KDApi.register的第二个参数一致即可
    function copytoclipboard(model) {
        this._setModel(model)
    }

    // 原型中封装生命周期函数，固定格式
    copytoclipboard.prototype = {
        _setModel: function (model) {
            this.model = model
        },
        init: function (props) {
            // TO DO
            initFunc(this.model, props)
        },
        update: function (props) {
            // TO DO
            initFunc(this.model, props)
        },
        destoryed: function () {
            // TO DO
        }
    }
    var link = "";
    const tpl = '<div id="copy">\n' +
        '\t<div>复制链接</div>\n' +
        '</div>'
    // Other Code
    var initFunc = function (model, props) {
        KDApi.loadFile('./css/copytoclipboard.css', model, function () {
                const result =  KDApi.getHTMLStringBytemplate(tpl,{})
                model.dom.innerHTML = result;
                initEvent(model, props);

        })
    }

    var initEvent = function (model, props) {
        link = props.data.link;

        $("#copy").click(() => {
            var input = document.createElement('textarea');
            document.body.appendChild(input);

            // 将文本赋值给输入框
            input.value = link;
            // 聚焦并选中
            input.focus();
            input.select();// 选择对象用户定义的代码区域
            document.execCommand("Copy"); //原生copy方法执行浏览器复制命令
            if (document.execCommand("Copy") == true) {
                console.log('复制成功', this.model)
                model.invoke("state", "successCopy");
            } else {
                model.invoke("state", "errorCopy");

            }
            // 移除输入框节点
            input.remove();

        })


    }


    // 你只需知道第一个参数是你接下来要新增控件方案时填的方案id，第二个参数是上面声明的构造函数
    KDApi.register('copytoclipboard', copytoclipboard)
})(window.KDApi, jQuery) // 这里的jQuery不是必须要传进去的，可移除，要用到的时候才传，PC端系统默认会有jQuery对象，版本是1.12.4