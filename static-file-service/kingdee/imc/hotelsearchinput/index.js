(function(KDApi, $, _) {

    // 输入搜索
    let isInputSearch = false;

    // 数据
    let items = [];
    let hoverCount = 0;
    let title = '';

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
        var eventkey = popsData['eventKey'];
        let errCode = popsData.errCode;
        switch (eventkey) {
            case "queryList":
                if (errCode === '0000') {
                    items = popsData.data || [];
                    showSearch(pageId);
                }
                break;
            case "accurateSearch":
                if (errCode === '0000') {
                    items = popsData.data || [];
                    showSearch(pageId);
                }
                break;
            case "handleSelectValue":
                if (errCode === '0000') {
                    // 下拉选中
                    title = '';
                    hoverCount = 0;
                    $('#hotelValue' + pageId).val('');
                    $('#searchInputList' + pageId).html('').hide();
                }
                break;
            case "orgChanged":
                if (errCode === '0000') {
                    // 下拉选中
                    title = '';
                    hoverCount = 0;
                    $('#hotelValue' + pageId).val('');
                    $('#searchInputList' + pageId).html('').hide();
                }
                break;
        }
    };

    var initHtml = function(model, props, isUpdate) {
        var popsData = {};
        if (props != null && props.data != null) {
            popsData = props.data;
        }
        KDApi.loadFile('./css/hotelsearchInput.css', model, function() {
            KDApi.templateFilePath('./html/hotelsearchInput.html', model, popsData).then(
                function(result) {
                    if (model.dom.innerHTML === "" || isUpdate) {
                        model.dom.innerHTML = result;
                    }
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
        } catch (err) {
        }
    };

    var initEvent = function(model, props) {
        var isZH = 0; // 0-非输入法  1-中文输入开始  2-中文输入结束
        var pageId = props.data['pageId'];
        items = props.data['items'];
        // 输入事件  输入中文开始触发
        $('#hotelValue' + pageId).on('compositionstart', function() {
            isZH = 1
        });
        // 输入事件  输入中文完成触发
        $('#hotelValue' + pageId).on('compositionend', function() {
            isZH = 2
        });

        // 输入事件
        $('#hotelValue' + pageId).on('input', function(e) {
            console.log('执行搜索hotelValue[pageId=' + pageId + ']');
            let timer = null;
            // 加定时器，为了等待输入中文完成事件compositionend
            setTimeout(function() {
                if (isZH === 1) return
                const value = trim(e.target.value);
                if (value === '' || getGbLength(value) < 2) {
                    // model.invoke('queryList', value);
                    title = value;
                    $('#searchInputList' + pageId).html('').hide();
                    return;
                }

                $(e.target).val(value).prop('title', value);
                clearTimeout(timer);
                timer = setTimeout(function() {
                    isInputSearch = true;
                    // 非空执行搜索
                    console.log('执行搜索', e.target.value);
                    model.invoke('queryList', value);
                    title = value;
                }, 300);
                isZH = 0
            }, 10)
        });

        // 键盘监听
        $('#searchInput' + pageId).on('keydown', '.input', function(e) {
            const value = trim(e.target.value);
            // input 回车监听未选中下拉列表
            if (e.keyCode === 13 && value && !hoverCount) {
                isInputSearch = true;
                model.invoke('accurateSearch', value);
            }
            // input 回车监听选中下拉列表
            if (e.keyCode === 13 && value && hoverCount) {
                const selectItem = items[hoverCount - 1];
                const id = selectItem.id;
                model.invoke('handleSelectValue', id);
            }
            // 方向键向上
            if (e.keyCode === 38 && items?.length > 0) {
                hoverCount = hoverCount - 1 < 1 ? 1 : hoverCount - 1;
                showSearch(pageId);
            }
            // 方向键向下
            if (e.keyCode === 40 && items?.length > 0) {
                hoverCount = hoverCount + 1 > items.length ? items.length : hoverCount + 1;
                showSearch(pageId);
            }
        })

        // 选择事件
        $('#searchInputList' + pageId).on('click', 'li', function(e) {
            let id = $(e.currentTarget).attr('data-id');
            model.invoke('handleSelectValue', id);
        })

        $(document).on('click', function() {
            // 防止点击拖动滚动条时下拉内容消失
            if (!$('#searchInputList' + pageId)[0] || $('#searchInputList' + pageId)[0].style.display === 'none') {
                return
            }
            // setTimeout(function() {
            //     isInputSearch = false;
            //     showSearch(pageId);
            // }, 300);
        });

        // ctrl+enter
        $(document).on('keydown', function(e) {
            if (e.ctrlKey && e.which === 13) {
                model.invoke('invoiceOpen');
            }
        });

        // shift+enter
        $(document).on('keydown', function(e) {
            if (e.shiftKey && e.which === 13) {
                model.invoke('print');
            }
        });

        // 失去焦点隐藏
        // $('#hotelValue'+pageId).on('blur', function() {
        // 	// 延迟300ms隐藏避免选择事件触发失败
        // 	setTimeout(function() {
        // 		isInputSearch = false;
        // 		showSearch(pageId);
        // 	}, 300);
        // });
    }

    // 渲染数据
    function showSearch(pageId) {
        // 非输入搜索隐藏
        if (!isInputSearch) {
            $('#searchInputList' + pageId).hide();
            return;
        }
        let text = '';
        const value = title;
        for (let i in items) {
            let item = items[i];
            const totalAmount = Number(item.total_amount).toFixed(2);
            const regx = new RegExp(value, 'gi');
            text += `<li data-id=${item.id} class=${hoverCount == +i + 1? 'actived' : ''}>
                        <div class=order>账单号：${item['billno'].replace(regx, match => `<span class=same>${match}</span>`)}</div>
                        <div>
                            <span>账单金额：<span>${totalAmount}</span></span>
                            <span>手机号码：${item['user_phone'].replace(regx, match => `<span class=same>${match}</span>`)}</span>
                            <span>房间号：${item['room_no'].replace(regx, match => `<span class=same>${match}</span>`)}</span>
                            <span>客户名称：${item['custom_name'].replace(regx, match => `<span class=same>${match}</span>`)}</span>
                            <span>结账时间：<span>${item.bill_date || ''}</span></span>
                        </div>
                    </li>`
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

    KDApi.register('hotelsearchinput', MyComponent)
})(window.KDApi, jQuery);
