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
            KDApi.loadFile(['./workbench.css', './constants.js', './common.js', './table.js', './workbench.js'], model, function () {
                KDApi.templateFilePath('./workbench.html', model, props).then(
                    function (result) {
                        if (model.dom.innerHTML === "" || isUpdate) {
                            model.dom.innerHTML = result;
                        }
                        workbench = new FPY_workbenchFun(KDApi, $);
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
                    workbench.initWorkbench(this.model, props);
                }else{
                    workbench.updateWorkbench(this.model, props);
                }

            }
        },
        destoryed: function () {

        }
    };
    KDApi.register('invoiceworkbench', MyComponent)
})(window.KDApi, jQuery);
