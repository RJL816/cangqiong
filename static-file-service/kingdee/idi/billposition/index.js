;(function(KDApi, $){
    function MyComponent (model) {
        this._setModel(model)
    }
    MyComponent.prototype = {
        _setModel: function(model) {
            this.model = model
        },
        init: function(props) {
            setHtml(this.model, props)
        },
        update: function(props) {
            if (props.data) {
                updateFunc(this.model, props)
            }
        },
        destoryed: function(props) {

        }
    }
    /**
     * orientation:发票顺时针旋转角度
     * region:单张发票区域: [0,455,356,619],表示，从图片的0,455坐标为起点。截取该坐标点右下角356X619的区域
     * pixel:原图像素大小
     */
    var setBillPosition = function(model, props) {
        var region = props.data.region
        if (!region) return
        var positionDialog = $('.billposition_dialog', model.dom)
        positionDialog.css({
            display: 'block',
            left: region[0],
            top: region[1],
            width: region[2],
            height: region[3]
        })
    }

    var setHtml = function(model, props) {
        KDApi.loadFile('./css/billposition.css', model, function() {
            KDApi.getTemplateStringByFilePath('./html/billposition.html', model, {
                billImgSrc: KDApi.getNameSpace(model) + props.data.billSrc
            }).then(function(result) {
                model.dom.innerHTML = result
                initEvent(model, props)
            })
        })
    }

    var updateFunc = function(model, props) {
        setBillPosition(model, props)
    }

    var initEvent = function(model ,props) {
        setBillPosition(model, props)
    }

    KDApi.register('billposition', MyComponent)

})(window.KDApi, jQuery)