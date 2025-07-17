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
            console.log('-----init', this.model, props)
            isUpdate = false;
            model = this.model;
            initHtml(this.model, props, isUpdate);
        },
        update: function(props) {
            console.log('-----update', this.model, props)
            isUpdate = true;
            model = this.model;
            updateHtml(this.model, props, isUpdate);
        },
        destoryed: function() {
            console.log('-----destoryed', this.model)
        }
    }

    var updateHtml = function(model, props, isUpdate) {
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
                // 渲染数据
                showSearch(pageId);
                break;
            case "updateTitle":
                // // 更新抬头
                $('#buyerNameTxt' + pageId).val(popsData.buyername).prop('title', popsData.buyername);
                break;
            case "btnflush":
                // 点击刷新
                $('#buyerNameTxt' + pageId).val('').prop('title', '');
                break;
            case "disable_title":
                // 点击刷新
                $('#buyerNameTxt' + pageId).val(popsData.buyername).prop('title', popsData.buyername);
                $('#buyerNameTxt' + pageId).prop("disabled", true);
                break;
            case "enable_title":
                // 点击刷新
                $('#buyerNameTxt' + pageId).val(popsData.buyername).prop('title', popsData.buyername);
                $('#buyerNameTxt' + pageId).prop("disabled", false);
                break;
            case "set_style":
                // 设置样式
                $('#buyerNameTxt' + pageId).css(popsData.style);
                break;
            case "set_icon_style":
                // 设置样式
                $('#searchIcon' + pageId).css(popsData.style);
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
                    model.invoke('titleLoadData', items);
                    initEvent(model, props);
                    setInitData(props);
                }
            )
        })
    };

    var setInitData = function(props) {
        try {
            var data = props.data ? props.data : props;
            var pageId = data['pageId'];
            if (data["buyername"]) {
                $('#buyerNameTxt' + pageId).val(data["buyername"]).prop('title', data["buyername"]);
            }
        } catch (err) {
        }
    };

    var initEvent = function(model, props) {
        var isZH = 0; // 0-非输入法  1-中文输入开始  2-中文输入结束
        var pageId = props.data['pageId'];
        // 输入事件  输入中文开始触发
        $('#buyerNameTxt' + pageId).on('compositionstart', function() {
            isZH = 1
        });
        // 输入事件  输入中文完成触发
        $('#buyerNameTxt' + pageId).on('compositionend', function() {
            isZH = 2
        });

        // 输入事件
        $('#buyerNameTxt' + pageId).on('input', function(e) {
            console.log('执行搜索buyerNameTxt[pageId=' + pageId + ']');
            let timer = null;
            // 加定时器，为了等待输入中文完成事件compositionend
            setTimeout(function() {
                if (isZH === 1) return
                const value = trim(e.target.value);
                if (value === '' || getGbLength(value) < 4) {
                    model.invoke('updateBuyerTaxNo', {"name": value, "tax": ""});
                    $('#searchInputList' + pageId).html('').hide();
                    return;
                }

                $(e.target).val(value).prop('title', value);
                clearTimeout(timer);
                timer = setTimeout(function() {
                    isInputSearch = true;
                    // 非空执行搜索
                    console.log('执行搜索', e.target.value);
                    model.invoke('queryTitle', value);
                }, 300);
                isZH = 0
            }, 10)
        });

        // input 回车监听
        $('#searchInput' + pageId).on('keydown', '.input', function(e) {
            const value = trim(e.target.value);
            if (e.keyCode === 13 && value) {
                isInputSearch = true;
                console.log('执行搜索', e.target.value);
                showSearch(pageId);
            }
        })

        // 选择事件
        $('#searchInputList' + pageId).on('click', 'li', function(e) {
            let name = $(e.currentTarget).attr('data-name');
            let tax = $(e.currentTarget).attr('data-tax');
            let address = $(e.currentTarget).attr('data-address');
            let phone = $(e.currentTarget).attr('data-phone');
            // 选择返回数据
            console.log('选择返回数据', name, tax);
            $('#buyerNameTxt' + pageId).val(name).prop('title', name);
            var returnData = {"name": name, "tax": tax, "address": address, "phone": phone};
            model.invoke('updateBuyerTaxNo', returnData);
        })

        $(document).on('click', function() {
            // 防止点击拖动滚动条时下拉内容消失
            if (!$('#searchInputList' + pageId)[0] || $('#searchInputList' + pageId)[0].style.display === 'none') {
                return
            }
            setTimeout(function() {
                isInputSearch = false;
                showSearch(pageId);
            }, 300);
        });
        // 失去焦点隐藏
        // $('#buyerNameTxt'+pageId).on('blur', function() {
        // 	// 延迟300ms隐藏避免选择事件触发失败
        // 	setTimeout(function() {
        // 		isInputSearch = false;
        // 		showSearch(pageId);
        // 	}, 300);
        // });

        // 点击搜索图标
        $('#searchIcon' + pageId).on('click', function() {
            const disabled = $('#buyerNameTxt' + pageId).prop('disabled');
            if (!disabled) model.invoke('chooseTitle', 'chooseTitle');

        });

        $('#buyerNameTxt' + pageId).on('dblclick', function(){
            const disabled = $('#buyerNameTxt' + pageId).prop('disabled');
            if (!disabled) model.invoke('chooseTitle', 'chooseTitle');
        });
    }

    // 渲染数据
    function showSearch(pageId) {
        // 非输入搜索隐藏
        if (!isInputSearch) {
            $('#searchInputList' + pageId).hide();
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
            $('#searchInputList' + pageId).html(text).show();
        } else {
            $('#searchInputList' + pageId).html(text).hide();
        }
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

    function trim(v) {
        return v.replace(/^\s+/g, '').replace(/\s+$/g, '');
    }

    KDApi.register('searchinput', MyComponent)
})(window.KDApi, jQuery);
