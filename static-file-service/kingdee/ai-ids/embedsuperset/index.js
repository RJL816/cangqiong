(function(KDApi, $){
    function EmbedSuperset (model) {
        this._setModel(model)
    }

    EmbedSuperset.prototype = {
        _setModel: function(model) {
            this.model = model
        },
        init: function(props){
            console.log('EmbedSuperset initPropsData : ', props);
            initData(this.model, props);
        },
        update: function(props){
            console.log('EmbedSuperset updatePropsData : ', props);
            var data = props.data.data.data;
            var refresh = data.refresh;
            if(refresh){
                initData(this.model, props);
            }
        },
        destoryed: function(){

        }
    }


    var setCookie = function(cname,cvalue,exdays,path,domain) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        //var expires = "expires=" + d.toGMTString();
        var expires = "expires=";//默认浏览器关闭即失效
        document.cookie = cname + "=" + cvalue + ";" + expires + ";domain=" + domain + ";path=" + path;
    }

    /**
     * 初始化数据
     */
    var initData = function(model, props) {
        var data = props.data.data.data;
        var session = data.session;
        var domain = data.topDomain;
        setCookie('session', session, 0, "/", domain);
        //不+path，子菜单会打不开（自定义控件）
        var uniqueCode = props.data.uniqueCode;
        KDApi.loadFile(['./css/index.css'], model, function() {
            KDApi.getTemplateStringByFilePath('./html/home.html', model, {
                mainId: uniqueCode
            }).then(function(result) {
                model.dom.innerHTML = result
                setIframeSrc(data, uniqueCode);
            })        
        })
    }

    var setIframeSrc = function(data, uniqueCode) {
        var id = uniqueCode + "idssupersetiframe";
        var iframe = document.getElementById(id);
        iframe.src = data.url;
    }

    KDApi.register('embedsuperset', EmbedSuperset)
})(window.KDApi, jQuery)