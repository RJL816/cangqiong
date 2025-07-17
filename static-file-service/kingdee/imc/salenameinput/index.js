(function(KDApi, $, _) {
    // 输入搜索
    let isInputSearch = false;
    // 数据
    let items = [];

    function MyComponent(model) {
        this._setModel(model);
    }

    var isUpdate = false;
    var model;

    MyComponent.prototype = {
        _setModel: function(model) {
            this.model = model;
        },
        init: function(props) {
            isUpdate = false;
            model = this.model;
            initHtml(this.model, props, isUpdate);
        },
        update: function(props) {
            isUpdate = true;
            model = this.model;
            updateHtml(this.model, props);
        },
        destoryed: function() {

        }
    };

    var updateHtml = function(model, props) {
        var popsData = {};
        if (props != null && props.data != null) {
            popsData = props.data;
        }
        var pageId = props.data['pageId'];

        var eventkey = popsData['eventkey'];
        switch (eventkey) {
            case "queryTitle":
                // 渲染数据
                items = popsData.companyInfos;
                showSearch(pageId);
                break;
            case "updateTitle":
                $('#saleNameTxt' + pageId).val(popsData.salername);
                break;
        }
    };

    var initHtml = function(model, props, isUpdate) {
        var popsData = {};
        if (props != null && props.data != null) {
            popsData = props.data;
        }
        KDApi.loadFile('./css/searchInput.css', model, function() {
            KDApi.templateFilePath('./html/searchInput.html', model, popsData).then(
                function(result) {
                    if (model.dom.innerHTML === "" || isUpdate) {
                        model.dom.innerHTML = result;
                    }
                    initEvent(model, props);
                    setInitData(popsData);
                }
            )
        })
    };

    var setInitData = function(props){
        try {
            var data = props.data ? props.data : props;
            var pageId = data['pageId'];
            if(data["salername"]){
                $('#saleNameTxt' + pageId).val(data["salername"]);
            }
        } catch(err) {}
    };

    var initEvent = function(model, props) {
        var isZH = 0; // 0-非输入法  1-中文输入开始  2-中文输入结束
        var pageId = props.data['pageId'];
        // 输入事件  输入中文开始触发
        $('#saleNameTxt'+pageId).on('compositionstart', function() {
            isZH = 1
        });
        // 输入事件  输入中文完成触发
        $('#saleNameTxt'+pageId).on('compositionend', function() {
            isZH = 2
        });

        // 输入事件
        $('#saleNameTxt' + pageId).on('input', function(e) {
            let timer = null;
                // 加定时器，为了等待输入中文完成事件compositionend
                setTimeout(function() {
                    if(isZH === 1) return
                    const value = trim(e.target.value);
                    if(value === '' || getGbLength(value) < 4){
                        model.invoke('updateBuyerTaxNo', {"name":value,"tax":""});
                        $('#saleNameList' + pageId).html('').hide();
                        return;
                    }

                    $(e.target).val(value);
                    clearTimeout(timer);
                    timer = setTimeout(function() {
                        isInputSearch = true;
                        // 非空执行搜索
                        console.log('执行搜索', e.target.value);
                        model.invoke('queryTitle',value);
                    }, 300);
                    isZH = 0
                },10)
        });

        // input 回车监听
        $('#saleNameInput' + pageId).on('keydown', '.input', function(e) {
            const value = trim(e.target.value);
            if (e.keyCode === 13 && value) {
                isInputSearch = true;
                showSearch(pageId);
            }
        });

        // 选择事件
        $('#saleNameList' + pageId).on('click', 'li', function(e) {
            let name = $(e.currentTarget).attr('data-name');
            let tax = $(e.currentTarget).attr('data-tax');
            let address = $(e.currentTarget).attr('data-address');
            let phone = $(e.currentTarget).attr('data-phone');
            // 选择返回数据
            $('#saleNameTxt' + pageId).val(name);
            var returnData = {"name":name,"tax":tax, "address":address,"phone":phone};
            model.invoke('updateBuyerTaxNo', returnData);
        });

        $(document).on('click', function(e) {
            // 防止点击拖动滚动条时下拉内容消失
            if(!$('#saleNameList'+pageId)[0] || $('#saleNameList'+pageId)[0].style.display === 'none') {return }
            setTimeout(function() {
                isInputSearch = false;
                showSearch(pageId);
            }, 300);
        });
        // 失去焦点隐藏
        // $('#saleNameTxt' + pageId).on('blur', function() {
        //     // 延迟300ms隐藏避免选择事件触发失败
        //     setTimeout(function() {
        //         isInputSearch = false;
        //         showSearch(pageId);
        //     }, 300);
        // });

        // 点击搜索图标
        $('#saleIcon' + pageId).on('click', function() {
            model.invoke('chooseTitle', 'sale');
        });

        $('#saleNameTxt' + pageId).on('dblclick', function(){
            model.invoke('chooseTitle', 'sale');
        });
    };

    // 渲染数据
    function showSearch(pageId) {
        // 非输入搜索隐藏
        if (!isInputSearch) {
            $('#saleNameList' + pageId).hide();
            return;
        }
        let text = '';
        for (let i in items) {
            let item = items[i];
            if (item.taxNo) {
                text += '<li data-name="' + item.name + '" data-tax="' + item.taxNo + '" data-address="' + item.address + '" data-phone="' + item.phone + '"><div>' + item.name + '</div><div>' + item.taxNo + '</div></li>';
            } else {
                text += '<li data-name="' + item.name + '" data-tax=""><div>' + item.name + '</div><div>未查到该企业税号！请手工输入</div></li>';
            }
        }
        // 搜索无返回
        if (text) {
            $('#saleNameList' + pageId).html(text).show();
        } else {
            $('#saleNameList' + pageId).html(text).hide();
        }
    }

    function trim(v) {
        return v.replace(/^\s+/g, '').replace(/\s+$/g, '');
    }

    function getGbLength(str) {
        var realLength = 0, len = str.length, charCode = -1;
        for (var i = 0; i < len; i++) {
            charCode = str.charCodeAt(i);
            if (charCode >= 0 && charCode <= 128) realLength += 1;
            else realLength += 2;
        }
        return realLength;
    }

    KDApi.register('salenameinput', MyComponent)
})(window.KDApi, jQuery);
