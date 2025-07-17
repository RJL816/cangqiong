(function (KDApi, $, _) {
    function MyComponent(model) {
        this._setModel(model);
    }
    var localRequest;

    MyComponent.prototype = {
        _setModel: function (model) {
            this.model = model;
        },
        init: function (props) {
            var model = this.model;
            KDApi.loadFile(['./localRequest.js'], model, function () {
                localRequest = new FPY_localRequestFun(KDApi, $);
            })
        },
        update: function (props) {
            if(localRequest){
                localRequest.updatelocalRequest(this.model, props);

            }
        },
        destoryed: function () {

        }
    };
    KDApi.register('localrequest', MyComponent)
})(window.KDApi, jQuery);
