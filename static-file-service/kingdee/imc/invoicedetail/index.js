(function (KDApi, $, _) {
    function MyComponent(model) {
        this._setModel(model);
    }
    let invoicedetail = null;
    let initData = {};
    MyComponent.prototype = {
        _setModel: function (model) {
            this.model = model;
        },
        init: function (props) {
            console.log('-----init', this.model, props)
            const model = this.model;
            initData[model.pageId] = {};
            const changeData = function (pageId, data) {
                initData[pageId] = { ...initData[pageId], ...data };
            };
            if(!invoicedetail) {
                KDApi.loadFile(['../invoicedetail/common.js', '../invoicedetail/detail.js'], model, function () {
                    invoicedetail = new FPY_detailFun(KDApi, $, changeData)
                    invoicedetail.initHtml(model, props)
                })
            }else {
                invoicedetail = new FPY_detailFun(KDApi, $, changeData)
                invoicedetail.initHtml(model, props)
            }
        },
        update: function (props) {
            console.log('-----update', this.model, props)
            const model = this.model
            initData[model.pageId] = { ...initData[model.pageId], ...props.data };
            if(!invoicedetail) {

            }else {
                invoicedetail.updateHtml(props, initData)
            }

        },
        destoryed: function () {
            console.log('-----destoryed', this.model);

        }
    };

    KDApi.register('invoicedetail', MyComponent)
})(window.KDApi, jQuery);