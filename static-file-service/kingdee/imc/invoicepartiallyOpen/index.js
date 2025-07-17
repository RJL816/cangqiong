(function (KDApi, $, _) {
    function MyComponent(model) {
        this._setModel(model);
    }
    var partiallyOpen;

    MyComponent.prototype = {
        _setModel: function (model) {
            this.model = model;
        },
        init: function (props) {
            var model = this.model;
            KDApi.loadFile(['./partiallyOpen.css', './common.js', './table.js', './partiallyOpen.js'], model, function () {
                KDApi.templateFilePath('./partiallyOpen.html', model, props).then(
                    function (result) {
                        if (model.dom.innerHTML === "" || isUpdate) {
                            model.dom.innerHTML = result;
                        }
                        partiallyOpen = new FPY_partiallyOpenFun(KDApi, $);
                        model.invoke("init");
                    }
                )
            })
        },
        update: function (props) {
            if(partiallyOpen){
                if (props != null && props.data != null) {
                    popsData = props.data;
                }
                var eventKey = popsData["eventKey"];
                if("init" === eventKey){
                    partiallyOpen.initPartiallyOpen(this.model, props);
                }else{
                    partiallyOpen.updatePartiallyOpen(this.model, props);
                }

            }
        },
        destoryed: function () {

        }
    };
    KDApi.register('invoicepartiallyOpen', MyComponent)
})(window.KDApi, jQuery);
