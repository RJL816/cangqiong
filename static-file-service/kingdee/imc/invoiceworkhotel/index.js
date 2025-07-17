(function (KDApi, $, _) {
    function MyComponent(model) {
        this._setModel(model);
    }
    var workbench;

    MyComponent.prototype = {
        _setModel: function (model) {
            this.model = model;
        },
        init: function (props) {
            var model = this.model;
            KDApi.loadFile(['./workhotel.css', './common.js', './table.js', './workhotel.js'], model, function () {
                KDApi.templateFilePath('./workhotel.html', model, props).then(
                    function (result) {
                        if (model.dom.innerHTML === "" || isUpdate) {
                            model.dom.innerHTML = result;
                        }
                        workbench = new FPY_workhotelFun(KDApi, $);
                        model.invoke("init");
                    }
                )
            })
        },
        update: function (props) {
            if(workbench){
                if (props != null && props.data != null) {
                    popsData = props.data;
                }
                var eventKey = popsData["eventKey"];
                if("init" === eventKey){
                    workbench.initWorkhotel(this.model, props);
                }else{
                    workbench.updateWorkhotel(this.model, props);
                }

            }
        },
        destoryed: function () {

        }
    };
    KDApi.register('invoiceworkhotel', MyComponent)
})(window.KDApi, jQuery);
