(function (KDApi, $, _) {
    function MyComponent(model) {
        this._setModel(model);
    }
    let invoicedetail = null
    MyComponent.prototype = {
        _setModel: function (model) {
            this.model = model;
        },
        init: function (props) {
            console.log('-----init', this.model, props)
            const model = this.model
            if(!invoicedetail) {
                KDApi.loadFile(['../invoicedetail/common.js', '../invoicedetail/detail.js'], model, function () {
                    invoicedetail = new FPY_detailFun(KDApi, $)
                    invoicedetail.initHtml(model, props)
                })
            }else {
                invoicedetail = new FPY_detailFun(KDApi, $)
                invoicedetail.initHtml(model, props)
            }
        },
        update: function (props) {
            console.log('-----update', this.model, props)
            const model = this.model
            if(!invoicedetail) {

            }else {
                invoicedetail.updateHtml(props)
            }

        },
        destoryed: function () {
            console.log('-----destoryed', this.model);

        }
    };

    KDApi.register('redinvoicedetail', MyComponent)
})(window.KDApi, jQuery);