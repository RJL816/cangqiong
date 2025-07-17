(function (KDApi, $, _) {
    function MyComponent(model) {
        this._setModel(model);
    }
    var invoiceReverse;

    MyComponent.prototype = {
        _setModel: function (model) {
            this.model = model;
        },
        init: function (props) {
            var model = this.model;
            KDApi.loadFile(['./invoiceReverse.css', './common.js', './table.js', './invoiceReverse.js'], model, function () {
                KDApi.templateFilePath('./invoiceReverse.html', model, props).then(
                    function (result) {
                        if (model.dom.innerHTML === "" || isUpdate) {
                            model.dom.innerHTML = result;
                        }
                        invoiceReverse = new FPY_invoiceReverseFun(KDApi, $);
                        model.invoke("reverseBill/init");
                    }
                )
            })
        },
        update: function (props) {
            if(invoiceReverse){
                if (props != null && props.data != null) {
                    popsData = props.data;
                }
                var eventKey = popsData["eventKey"];
                if("reverseBill/init" === eventKey){
                    invoiceReverse.initInvoiceReverse(this.model, props);
                }else{
                    invoiceReverse.updateInvoiceReverse(this.model, props);
                }

            }
        },
        destoryed: function () {

        }
    };
    KDApi.register('invoiceReverse', MyComponent)
})(window.KDApi, jQuery);
