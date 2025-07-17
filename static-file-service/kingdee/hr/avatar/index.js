(function (KDApi, $) {
    function MyComponent(model) {
        this._setModel(model);
    }

    var isUpdate = false;
    MyComponent.prototype = {
        _setModel: function (model) {
            this.model = model;
        },
        init: function (props) {
            isUpdate = false;
            setHtml(this.model, props);
        },
        update: function (props) {
            isUpdate = true;
            updateHtml(this.model, props);
        },
        destoryed: function () {
            
        }
    }

    var setHtml = function (model, props) {
        var cssHref = KDApi.getNameSpace(model) + './css/avatar.css';
        if($('link[href="' + cssHref + '"]').length === 0){
            KDApi.loadFile('./css/avatar.css', model, function() {
                updateHtml(model, props);
            })            
        }
        updateHtml(model, props);
    }

    var updateHtml = function(model, props){
        var template = '<div class="hr-avatar">' +
                            '<img class="hr-head" src="<%= path %>" onerror="onerror=null;src=\'' + KDApi.getNameSpace(model) + './img/test.png' +'\'"/>' +
                            '<div class="head-delete">' +
                                '<% if(deleteStyle === "0"){ %>' +
                                    '<div class="delete-cha"></div>' +
                                '<% } %>' +
                                '<% if(deleteStyle === "1"){ %>' +
                                    '<div class="delete-jian"></div>' +
                                '<% } %>' +
                            '</div>' +
                        '</div>';
        var path = getUrl(model, getValue(model, props, 'path'));
        var deleteStyle = getValue(model, props, 'delStyle');
        var result = KDApi.getHTMLStringBytemplate(template, {
            path: path ? path : KDApi.getNameSpace(model) + './img/test.png',
            deleteStyle: deleteStyle ? deleteStyle : "0"
        })
        model.dom.innerHTML = result;
        initEvent(model, props);
    }

    var initEvent = function (model, props) {
        $(model.dom).css("overflow", "visible").mouseenter(function () {
            $('.head-delete', model.dom).show();
        }).mouseleave(function () {
            $('.head-delete', model.dom).hide();
        });
        $('.hr-head', model.dom).css({
            "width": model.dom.style.width,
            "height": model.dom.style.height,
        })
        $('.head-delete', model.dom).hide().css({
            "top": '0px',
            "left": (model.dom.style.width ? (parseInt(model.dom.style.width) - 12) : 38) + 'px',
        }).click(function () {
            model.invoke('click', model.key);
        });
    }
    var getValByKey = function (array, key) {
        var array = array.filter(function(items){
            return items['key'] === key
        })
        return array[0] && array[0].value
    }

    //给模板传入的参数的获取方法
    var getValue = function(model, props, key){
        var data = props.data;
        var configItems = props.configItems;
        return data && getValByKey(data, key) ? getValByKey(data, key) : configItems && getValByKey(configItems, key)
    }

    var getUrl = function (model, path) {
        if(!/^http(s)?/.test(path)){
            var fileserver = window.store.getState().getIn(['forms',model.pageId,'config','fileserver']);
            return fileserver + path;
        }
        return path;
    }
    KDApi.register('avatar', MyComponent)
})(window.KDApi, jQuery);