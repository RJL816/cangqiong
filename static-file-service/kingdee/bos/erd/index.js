/**
 *  自定义控件书写模板
 */
(function (KDApi, $) {
    // 构造函数，变量名随意，与最后一句代码的KDApi.register的第二个参数一致即可
    function erd(model) {
        this._setModel(model)
    }

    // 原型中封装生命周期函数，固定格式
    var isUpdate = false;
    erd.prototype = {
        _setModel: function (model) {
            this.model = model
        },
        init: function (props) {
            isUpdate = false;
            setHtml(this.model, props, isUpdate)
        },
        update: function (props) {
            isUpdate = true;
            setHtml(this.model, props, isUpdate)
        },
        destoryed: function () {
        }
    }

    var setHtml = function (model, props, isUpdate) {
        KDApi.loadFile('./kderd.min.js?v31', model, function () {
            KDApi.templateFilePath('./html/container.html', model, {}).then(
                function (result) {
                    model.dom.innerHTML = result;
                    loadData(model, props);
                }
            )
        })
    }

    var loadData = function (model, props) {
        var data = {};
        if (props != null && props.data != null) {
            var popsData = props.data;
            //data = JSON.parse(popsData);
            if(popsData && queryParam('allowEdit')){
                popsData= popsData.replace('"allowEdit":false','"allowEdit":true')
            }
            data = popsData;
        }

        var container = model.dom.querySelector('.kderdcontainer');
        const editor = document.createElement('erd-editor');
        editor.automaticLayout = true;
        editor.width = document.documentElement.clientWidth;
        editor.height = document.documentElement.clientHeight;
        container.appendChild(editor);
        if(data !== {}){
            editor.initLoadJson(data);
        }
  
    }

    var queryParam = function getQueryVariable(variable)
    {
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i=0;i<vars.length;i++) {
                var pair = vars[i].split("=");
                if(pair[0] == variable){return pair[1];}
        }
        return(false);
    }

    // 你只需知道第一个参数是你接下来要新增控件方案时填的方案id，第二个参数是上面声明的构造函数
    KDApi.register('erd', erd)
})(window.KDApi, jQuery) // 这里的jQuery不是必须要传进去的，可移除，要用到的时候才传，PC端系统默认会有jQuery对象，版本是1.12.4