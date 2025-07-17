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
            KDApi.loadFile(['./alleworkbench.css', './constants.js', './common.js', './table.js', './alleworkbench.js'], model, function () {
                KDApi.templateFilePath('./alleworkbench.html', model, props).then(
                    function (result) {
                        if (model.dom.innerHTML === "" || isUpdate) {
                            model.dom.innerHTML = result;
                        }
                        workbench = new FPY_alleWorkbenchFun(KDApi, $);
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
                } else{
                    let repeatInit = popsData["repeatInit"];
                    if (repeatInit) {
                        workbench.initWorkbench(this.model, props);
                    }
                    workbench.updateWorkbench(this.model, props);
                }
            }
        },
        destoryed: function () {

        }
    };
    KDApi.register('invoicealleworkbench', MyComponent)
})(window.KDApi, jQuery);
