(function(KDApi, $, _) {
    // 数据
    function MyComponent(model) {
        this._setModel(model);
    }

    var isUpdate = false;
    var model;

    var invoiceInfoList = []; // 打印发票信息列表

    MyComponent.prototype = {
        _setModel: function(model) {
            this.model = model;
        },
        init: function(props) {
            console.log('-----init', this.model, props)
            isUpdate = false;
            model = this.model;
            initHtml(this.model, props, isUpdate);
        },
        update: function(props) {
            console.log('-----update', props)
            isUpdate = true;
            model = this.model;
            updateHtml(this.model, props, isUpdate);
        },
        destoryed: function() {
            console.log('-----destoryed', this.model)
        }
    }

    var updateHtml = function(model, props) {
        var popsData = {};
        if (props != null && props.data != null) {
            popsData = props.data;
        }
        var eventkey = popsData['eventKey'];
        let errCode = popsData.errCode;
        switch (eventkey) {
            // 打印
            case "print":
                if (errCode === '0000') {
                    handlePrint(popsData);
                }
                break;
            case "queryPrintInfo":
                if (errCode === '0000') {
                    invoiceInfoList.push(popsData.data);
                }
        }
    };

    var initHtml = function(model, props, isUpdate) {
        var popsData = {};
        if (props != null && props.data != null) {
            popsData = props.data;
        }
        KDApi.loadFile(['../common/pwyPolyfill.js', './css/elepaperprint.css'], model, function() {
            KDApi.templateFilePath('./html/elepaperprint.html', model, popsData).then(
                function(result) {
                    // paperInvoicePrint.min.js 测试环境地址https://img-sit.piaozone.com/static/public/js/paperInvoicePrint.min.js
                    // paperInvoicePrint.min.js 正式环境地址https://img.piaozone.com/static/public/js/paperInvoicePrint.min.js

                    $('<script>').attr('src', 'https://img.piaozone.com/static/public/js/paperInvoicePrint.min.js?v=' + new Date().getTime()).appendTo('head');
                    if (model.dom.innerHTML === "" || isUpdate) {
                        model.dom.innerHTML = result;
                    }
                }
            )
        })
    };

    function handlePrint(props) {
        const { pageId, invoiceList } = props;
        const paperPrint = new PaperInvoicePrint({
            printIframeId: `printIframeId${pageId}`,
            // 该方法需要返回errcode，description，data这些信息，可直接使用：数电纸质发票打印信息的获取这个接口返回的数据格式。
            queryPrintInfo: async function(info) {
                model.invoke('queryPrintInfo', info);

                const getInvoiceInfo = (invoiceNo) => {
                    return new Promise((resolve, reject) => {
                        const timer = setInterval(() => {
                            const foundItem = invoiceInfoList.find(item => item.invoiceNo === invoiceNo);
            
                            if (foundItem) {
                                clearInterval(timer); // 停止轮询
                                resolve({
                                    errcode: '0000',
                                    data: foundItem
                                });
                            }
                        }, 300); // 每 300ms 检查一次
            
                        // 自动超时
                        setTimeout(() => {
                            clearInterval(timer);
                            reject({
                                errcode: '0001',
                                description: '接口超时'
                            });
                        }, 120 * 1000); // 超时2s后停止轮询
                    });
                };
            
                try {
                    const response = await getInvoiceInfo(info.invoiceNo);
                    return response;
                } catch (error) {
                    console.log(error)
                    return error;
                }
            },
            stepFinish: function(info, res) {
                console.log('单步打印结果', info, res);
                if(res.errcode === '0000'){
                    model.invoke("stepFinish", info);
                }
            },
            printFinish: function(res) {
                console.log('打印结束返回', res);
                if (res.errcode !== '0000') {
                    console.log(res.description);
                    model.invoke('showError', res.description);
                } else {
                    model.invoke('showSuccess', "打印成功");
                }
            }
        });

        // 这里的参数传给queryPrintInfo方法，通过后台获取打印的完整信息
        paperPrint.start(invoiceList);
    }
    KDApi.register('elepaperprint', MyComponent)
})(window.KDApi, jQuery);
