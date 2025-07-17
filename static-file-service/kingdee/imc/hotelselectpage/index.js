(function(KDApi, $, _) {

    // 输入搜索
    let isInputSearch = false;

    // 数据
    let items = []; // 搜索列表
    let hoverCount = 0;
    let systemCount = 1;
    let title = ''; // 搜索的值
    let cardType = 'auto'; // 当前单据列表获取来源，auto自动拉取, btn按钮拉取，search搜索

    let billList = []; // 卡片列表
    let hoverBillNo = ''; // 当前选中的列表的值

    let systemList = []; // 系统来源列表
    let btnLoadingCode = ''; // 当前查询的按钮code

    let loadingBillList = []; // 点击更新数据的列表
    let requestId = Math.random().toString(36).slice(-10); // 随机数

    let carList = []; // 待开列表
    let carVisible = false; // 是否打开待开列表

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
            console.log('-----update', props)
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
            // 查询数据
            case "queryList":
                if (errCode === '0000') {
                    items = popsData.data || [];
                    showSearch(pageId);
                }
                break;
            case "accurateSearch":
                if (errCode === '0000') {
                    showSearch(pageId);
                    if (popsData.accurateSearchList) {
                        clearTitle(pageId);
                        billList = billList.concat(popsData.accurateSearchList);
                        showCardList(pageId);
                    }
                }
                break;
            case "orgChanged":
                if (errCode === '0000') {
                    // 切换组织
                    clearTitle(pageId);
                    carList = [];
                    systemList = popsData.systemCfgList || [];
                    billList = [];
                    showCardList(pageId);
                    showSystemBtn(pageId);
                    showCarList(pageId);
                }
                break;
            case "loadSystemList":
                if (errCode === '0000') {
                    systemList = popsData.systemCfgList || [];
                    if (systemList.length) {
                        btnLoadingCode = systemList[0].systemCode;
                        $('#updatedata' + pageId).show();
                        $('#cardList' + pageId).hide();
                        $('#nodata' + pageId).hide();
                        model.invoke('queryCardList', { requestId });
                    } else {
                        $('#updatedata' + pageId).hide();
                        $('#cardList' + pageId).hide();
                        $('#nodata' + pageId).show();
                    }
                    showSystemBtn(pageId);
                }
                break;
            case "queryCardList":
                if (errCode === '0000' && requestId === popsData.requestId) {
                    cardType = 'btn';
                    billList = popsData.cardDataList || [];
                    hoverBillNo = popsData.cardDataList.length ? popsData.cardDataList[0].billno : '';
                    btnLoadingCode = '';
                    showCardList(pageId);
                    showSystemBtn(pageId);
                }
                if (errCode !== '0000') {
                    billList = [];
                    btnLoadingCode = '';
                    showCardList(pageId);
                    showSystemBtn(pageId);
                }
                break;
            case "queryUpdateBill":
                if (errCode === '0000' && requestId === popsData.requestId) {
                    const updateDataList = popsData.updateDataList;
                    if (updateDataList.length) {
                        loadingBillList = loadingBillList.filter(i => i !== updateDataList[0].billno);
                        billList = billList.map(i => {
                            if (i.billno === updateDataList[0].billno) {
                                return { ...updateDataList[0] };
                            } else {
                                return i;
                            }
                        });
                    } else {
                        loadingBillList = loadingBillList.filter(i => i !== popsData?.billNo);
                    }
                    
                    showCardList(pageId);
                }
                break;
        }
    };

    var initHtml = function(model, props, isUpdate) {
        var popsData = {};
        if (props != null && props.data != null) {
            popsData = props.data;
        }
        KDApi.loadFile('./css/hotelselectpage.css', model, function() {
            KDApi.templateFilePath('./html/hotelselectpage.html', model, popsData).then(
                function(result) {
                    if (model.dom.innerHTML === "" || isUpdate) {
                        model.dom.innerHTML = result;
                    }
                    initEvent(model, props);
                    setInitData(props);
                    showCardList(popsData.pageId);
                    model.invoke('loadSystemList');
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

    var handleBillNo = function(str) {
        // 查找最后一个下划线的位置
        const lastUnderscoreIndex = str.lastIndexOf('_');
        
        // 如果找到下划线，返回下划线后面的字符串；如果没有找到下划线，返回原始字符串
        if (lastUnderscoreIndex !== -1) {
            return str.substring(lastUnderscoreIndex + 1);
        } else {
            return str;
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
                    $('#searchInputList' + pageId).hide();
                    $('#closeIcon' + pageId).show();
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
                    $('#closeIcon' + pageId).show();
                }, 300);
                isZH = 0
            }, 10)
        });

        // 输入事件
        $('#hotelValue' + pageId).on('click', function(e) {
            if (title && title.length > 1) {
                $('#searchInputList' + pageId).show();
            }
        });

        // 关闭按钮
        $('#closeIcon' + pageId).on('click', function(e) {
            clearTitle(pageId);
        });

        // 键盘监听
        $('#searchInput' + pageId).on('keydown', '.input', function(e) {
            const value = trim(e.target.value);
            // 有数据回车
            if (e.keyCode === 13 && value && hoverCount && items?.length > 0) {
                const selectItem = items[hoverCount - 1];
                if (billList.some(i => i.billno === selectItem.billno)) {
                    model.invoke('hotelTipMsg', { type: 'error', message: '请不要重复添加' });
                    return;
                }
                if (cardType === 'search') {
                    billList.push(selectItem);
                } else {
                    hoverBillNo = selectItem.billno;
                    billList = [selectItem];
                }
                cardType = 'search';
                showCardList(pageId);
                // 清空搜索
                clearTitle(pageId);
            }
            // 无数据回车
            if (e.keyCode === 13 && value && !items.length && systemList.length) {
                const systemCode = systemList[systemCount - 1].systemCode;
                model.invoke('accurateSearch', { value, systemCode, requestId });
                return;
            }
            const searchListVisible = $('#searchInputList' + pageId).is(':visible');
            // 有搜索数据方向键向上
            if (e.keyCode === 38 && items?.length > 0 && searchListVisible) {
                hoverCount = hoverCount - 1 < 1 ? 1 : hoverCount - 1;
                showSearch(pageId);
            }
            // 有搜索数据方向键向下
            if (e.keyCode === 40 && items?.length > 0 && searchListVisible) {
                hoverCount = hoverCount + 1 > items.length ? items.length : hoverCount + 1;
                showSearch(pageId);
            }

            // 无数据方向键向上
            if (e.keyCode === 38 && !items?.length && systemList.length && searchListVisible) {
                systemCount = systemCount - 1 < 1 ? 1 : systemCount - 1;
                showSearch(pageId);
            }
            // 无数据方向键向下
            if (e.keyCode === 40 && !items?.length && systemList.length && searchListVisible) {
                systemCount = systemCount + 1 > systemList.length ? systemList.length : systemCount + 1;
                showSearch(pageId);
            }
        })

        // 选择事件
        $('#searchInputList' + pageId).on('click', 'li', function(e) {
            const id = $(e.currentTarget).attr('data-id');
            if (!id) {
                return;
            }
            if (!items.length && systemList.length) {
                const systemCode = systemList[id].systemCode;
                systemCount = + id + 1;
                showSearch(pageId);
                model.invoke('accurateSearch', { value: title, systemCode, requestId });
                return;
            }
            const selectItem = items.find(item => item.id === id);
            if (billList.some(i => i.billno === selectItem.billno)) {
                model.invoke('hotelTipMsg', { type: 'error', message: '请不要重复添加' });
                return;
            }
            if (cardType === 'search') {
                billList.push(selectItem);
            } else {
                hoverBillNo = selectItem.billno;
                billList = [selectItem];
            }
            cardType = 'search';
            showCardList(pageId);
            // 清空搜索
            clearTitle(pageId);
        });

        // 卡片点击事件
        $('#cardList' + pageId).on('click', '.item', function(e) {
            const billNo = $(e.currentTarget).attr('data-id');
            hoverBillNo = billNo;
            showCardList(pageId);
        });

        // 卡片按钮事件
        $('#cardList' + pageId).on('click', '.item .itemBtns div', function(e) {
            const billNo = $(e.currentTarget).attr('data-id');
            const type = $(e.currentTarget).attr('data-type');
            const systemCode = $(e.currentTarget).attr('data-system');
            const item = billList.find(i => i.billno === billNo);
            if (type === 'qrCode') {
                model.invoke('getQrCode', { requestId, billNo, systemCode });
                return;
            }
            if (type === 'addCar') {
                model.invoke('hotelTipMsg', { type: 'success', message: '加入待开票列表成功' });
                carList.push(item);
            } else if (type === 'delCar') {
                carList = carList.filter(i => i.billno !== billNo);
                model.invoke('hotelTipMsg', { type: 'success', message: '移除成功' });
            } else if (type === 'update') {
                loadingBillList.push(billNo);
                model.invoke('queryUpdateBill', { requestId, billNo, systemCode });
            }
            showCardList(pageId);
            // 更新购物车
            showCarList(pageId);
        });

        // 卡片按钮事件-点击账单编号打开账单详情
        $('#cardList' + pageId).on('click', '.item .itemContent .billno', function(e) {
            const billNo = $(e.currentTarget).attr('data-id');
            const systemCode = $(e.currentTarget).attr('data-system');
            model.invoke('openBillDetail', { billNo, systemCode })
        });

        $(document).on('click', function(event) {
            // 防止点击拖动滚动条时下拉内容消失
            // if (!$('#searchInputList' + pageId)[0] || $('#searchInputList' + pageId)[0].style.display === 'none') {
            //     return
            // }
            // 判断点击的元素是否是 .footerLeft 或者 .footerLeft 的子元素
            if ($(event.target).closest('.hotelMid').length) {
                carVisible = false;
                $('#hotelList' + pageId).hide();
                $('#searchInputList' + pageId).hide();
            }
            // if (!$(event.target).closest('.hotelSearchInput, .searchInputList').length) {
            // }
        });

        $(document).off('keydown').on('keydown', function(e) {
            // ctrl+enter 打开开票工作台
            if (e.ctrlKey && e.which === 13) {
                if (!carList.length && loadingBillList.some(i => i === hoverBillNo)) {
                    model.invoke('hotelTipMsg', { type: 'error', message: '请等待账单更新完毕' });
                    return;
                }
                const curBillList = carList.map(item => ({ systemCode: item.system_code, billNo: item.billno }));
                const curBill = billList.find(item => item.billno === hoverBillNo);
                model.invoke('openWorkbenchHotel', {
                    requestId,
                    billList: curBillList.length ? curBillList : [{ billNo: hoverBillNo, systemCode: curBill.system_code }]
                });
            }
            // shift+enter 打开小票码
            if (e.shiftKey && e.which === 13) {
                if (loadingBillList.some(i => i === hoverBillNo)) {
                    model.invoke('hotelTipMsg', { type: 'error', message: '请等待账单更新完毕' });
                    return;
                }
                const curBill = billList.find(item => item.billno === hoverBillNo);
                model.invoke('getQrCode', { requestId, billNo: hoverBillNo, systemCode: curBill.system_code });
            }
            // 下40 上38  左39 右37
            const searchListVisible = $('#searchInputList' + pageId).is(':visible');
            if (billList.length && !searchListVisible && (e.which === 37 || e.which === 38)) {
                const curIndex = billList.map(item => item.billno).indexOf(hoverBillNo);
                const preInfo = billList[curIndex === 0 ? 0 : curIndex - 1];
                hoverBillNo = preInfo.billno;
                showCardList(pageId);
            }
            
            if (billList.length && !searchListVisible && (e.which === 39 || e.which === 40)) {
                const curIndex = billList.map(item => item.billno).indexOf(hoverBillNo);
                const nextInfo = billList[curIndex === billList.length - 1 ? curIndex : curIndex + 1];
                hoverBillNo = nextInfo.billno;
                showCardList(pageId);
            }
        });

        // 系统按钮事件
        $('#hotelHeaderBtns' + pageId).on('click', 'div', function(e) {
            let code = $(e.currentTarget).attr('data-id');
            $('#updatedata' + pageId).show();
            $('#cardList' + pageId).hide();
            $('#nodata' + pageId).hide();
            btnLoadingCode = code;
            showSystemBtn(pageId);
            model.invoke('queryCardList', { requestId, systemCode: code });
        });

        // 点击待开列表图标
        $('#hotelFooter' + pageId).on('click', '.footerLeft .car', function(e) {
            carVisible = !carVisible;
            showCarList(pageId);
        });

        // 待开列表移除
        $('#hotelList' + pageId).on('click', '.item .itemDel', function(e) {
            const billNo = $(e.currentTarget).attr('data-id');
            carList = carList.filter(i => i.billno !== billNo);
            model.invoke('hotelTipMsg', { type: 'success', message: '移除成功' });
            showCardList(pageId);
            showCarList(pageId);
        });

        // 开票
        $('#hotelFooter' + pageId).on('click', '.footerRight .footerBtn', function(e) {
            if (!carList.length) {
                const curBill = billList.find(i => i.billno === hoverBillNo);
                model.invoke('openWorkbenchHotel', {
                    requestId,
                    billList: [{ systemCode: curBill.system_code, billNo: curBill.billno }]
                });
                return;
            }
            model.invoke('openWorkbenchHotel', {
                requestId,
                billList: carList.map(item => ({ systemCode: item.system_code, billNo: item.billno }))
            });
        });

        // 取消请求
        $('#updatedata' + pageId).on('click', '.nodata .cancelRequest', function(e) {
            requestId = Math.random().toString(36).slice(-10);
            btnLoadingCode = '';
            showSystemBtn(pageId);
            showCardList(pageId);
        });
    }

    // 渲染搜索列表
    function showSearch(pageId) {
        // 非输入搜索隐藏
        if (!isInputSearch) {
            $('#searchInputList' + pageId).hide();
            return;
        }
        let text = '';
        const value = title;
        if (!items.length) {
            text += `<li style="text-align: center; line-height: 27px">
                        <div>暂未搜到<span class=same>“${value}”</span>相关账单，请尝试下面系统获取账单</div>
                    </li>`
            for (let i in systemList) {
                let item = systemList[i];
                text += `<li data-id=${i} class=${systemCount == +i + 1? 'actived' : ''}>
                            <div class=nodataList>
                                <div class=nodataListLeft>${value}<span style="margin-left: 16px">用此账单号搜索<span class=same>${item.systemName}</span></span></div>
                                <span>回车键</spans>
                            </div>
                        </li>`
            }
        }
        for (let i in items) {
            let item = items[i];
            const totalAmount = Number(item.total_amount).toFixed(2);
            const regx = new RegExp(value, 'gi');
            text += `<li data-id=${item.id} class=${hoverCount == +i + 1? 'actived' : ''}>
                        <div class=order>账单号：${handleBillNo(item['billno']).replace(regx, match => `<span class=same>${match}</span>`)}</div>
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

    // 渲染卡片列表
    function showCardList(pageId) {
        let text = '';
        if (!billList.length) {
            $('#nodata' + pageId).show();
            $('#cardList' + pageId).html(text).hide();
            $('#updatedata' + pageId).hide();
            return;
        }
        for (let i in billList) {
            let item = billList[i];
            const totalAmount = Number(item.total_amount).toFixed(2);
            const invoicableAmount = Number(item.remainAmount).toFixed(2);
            const inCar = carList.some(i => i.billno === item.billno);
            const isLoading = loadingBillList.some(i => i === item.billno);
            const isInvoice = [0, 2, '0', '2'].includes(item.invoice_status); // 0未开票 2部分开票
            let roomShow = '';
            if (item.room_no && item.table_no) {
                roomShow = `<div><div class='title'>房间号/桌号:</div>${item.room_no}/${item.table_no}</div>`
            } else if (!item.room_no && item.table_no) {
                roomShow = `<div><div class='title'>桌号:</div>${item.table_no}</div>`
            } else if (item.room_no && !item.table_no) {
                roomShow = `<div><div class='title'>房间号:</div>${item.room_no}</div>`
            } else {
                roomShow = `<div><div class='title'>房间号/桌号:</div></div>`
            }
            text += `
                 <div data-id=${item.billno} tabindex=${i} class="item ${hoverBillNo == item.billno ? 'actived' : ''}">
                    <div class='itemContent'>
                        <div class=first><div class='title'>订单号:</div><div class='billno' data-id=${item.billno} data-system=${item.system_code}>${handleBillNo(item['billno'])}</div></div>
                        <div><div class='title'>账单金额:</div>${totalAmount}</div>
                        <div><div class='title'>可开金额:</div>${invoicableAmount}</div>
                        ${roomShow}
                        <div><div class='title'>手机号码:</div>${item['user_phone']}</div>
                        <div><div class='title'>客户名称:</div>${item['custom_name']}</div>
                        <div><div class='title'>结账时间:</div>${item.bill_date || ''}</div>
                    </div>
                    <div class='itemBtns'>
                        ${inCar && isInvoice ? `
                            <div data-type=delCar data-id=${item.billno}>移除待开</div>
                        ` : `
                            ${isInvoice ? `<div data-type=addCar data-id=${item.billno}>加入待开</div>` : ''}
                        `} 
                        ${isInvoice ? `<div data-type=qrCode data-id=${item.billno} data-system=${item.system_code}>生成小票</div>` : ''}
                        <div data-type=update data-id=${item.billno} data-system=${item.system_code}>更新数据</div>
                    </div>
                    ${isLoading ? `<div class='cardShadow'>
                        <div class='loading'></div>
                        <div>数据加载中</div>
                    </div>` : ''}
                </div>
            `
        }
        $('#cardList' + pageId).html(text).show();
        $('#nodata' + pageId).hide();
        $('#updatedata' + pageId).hide();
    }

    // 渲染系统来源按钮
    function showSystemBtn(pageId) {
        let text = '';
        for (let i in systemList) {
            let item = systemList[i];
            text += `<div data-id=${item.systemCode} class=${btnLoadingCode === item.systemCode ? 'disabled' : 'hotelBtn'}>更新${item.systemName}账单</div>`
        }
        // 搜索无返回
        if (text) {
            $('#hotelHeaderBtns' + pageId).html(text).show();
        } else {
            $('#hotelHeaderBtns' + pageId).html(text).hide();
        }
    }

    // 渲染待开列表
    function showCarList(pageId) {
        let text = '';
        if (!carList.length) {
            $('#hotelFooter' + pageId).find('.footerLeft').find('.num').html(text).hide();
            $('#hotelFooter' + pageId).find('.footerLeft').find('.sum').html(text).hide();
            $('#hotelList' + pageId).html(text).hide();
            return;
        }
        let totalAmountSum = 0;
        let invoicableAmountSum = 0;
        for (let i in carList) {
            let item = carList[i];
            const totalAmount = Number(item.total_amount).toFixed(2);
            const invoicableAmount = Number(item.remainAmount).toFixed(2);
            totalAmountSum = fpy_Add(totalAmountSum, item.total_amount);
            invoicableAmountSum = fpy_Add(invoicableAmountSum, item.remainAmount);
            let roomShow = '';
            if (item.room_no && item.table_no) {
                roomShow = `<div><div class='title'>房间号/桌号:</div>${item.room_no}/${item.table_no}</div>`
            } else if (!item.room_no && item.table_no) {
                roomShow = `<div><div class='title'>桌号:</div>${item.table_no}</div>`
            } else if (item.room_no && !item.table_no) {
                roomShow = `<div><div class='title'>房间号:</div>${item.room_no}</div>`
            } else {
                roomShow = `<div><div class='title'>房间号/桌号:</div></div>`
            }
            text += `
                <div class='item'>
                    <div class='itemContent'>
                        <div class=first><div class='title'>订单号:</div><div class='billno'>${handleBillNo(item['billno'])}</div></div>
                        <div><div class='title'>账单金额:</div>${totalAmount}</div>
                        <div><div class='title'>可开金额:</div>${invoicableAmount}</div>
                        ${roomShow}
                        <div><div class='title'>手机号码:</div>${item['user_phone']}</div>
                        <div><div class='title'>用户姓名:</div>${item['custom_name']}</div>
                        <div><div class='title'>结账时间:</div>${item.bill_date || ''}</div>
                    </div>
                    <div class='itemDel' data-id=${item.billno}>移除</div>
                </div>
            `
        }
        $('#hotelFooter' + pageId).find('.footerLeft').find('.num').html(carList.length).show();
        $('#hotelFooter' + pageId).find('.footerLeft').find('.sum').html(
            `<div>合计账单金额<span>${totalAmountSum}</span>元；合计可开金额<span>${invoicableAmountSum}</span>元</div>`
        ).show();
        if (carVisible) {
            $('#hotelList' + pageId).html(text).show();
        } else {
            $('#hotelList' + pageId).html(text).hide();
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

    function fpy_Add(arg1, arg2) {
        let r1, r2;
        try {
            r1 = fpy_numberToString(arg1).split('.')[1].length;
        } catch (e) {
            r1 = 0;
        }
        try {
            r2 = fpy_numberToString(arg2).split('.')[1].length;
        } catch (e) {
            r2 = 0;
        }
        // 动态控制精度长度
        const n = Math.max(r1, r2);
        const m = Math.pow(10, n);
        return Number(((arg1 * m + arg2 * m) / m).toFixed(n));
    }

    function fpy_numberToString(num) {
        if (isNaN(num)) {
            console.error(`${num} is not number!`);
            return;
        }
        // 序列化非标准科学计数法
        const str = Number(num).toString();
        const reg = /^([+-])?([\d])+(?:.([\d]+))?[Ee]([+-])?([\d]+)$/;
    
        if (reg.test(str)) {
            const arr = reg.exec(str);
            // num正负号 正号可省略
            let result = arr[1] === '-' ? '-' : '';
            // 次方
            if (arr[5]) {
                // 处理小数部分
                arr[3] = arr[3] || '';
                // 次方的正负 正号可省略
                if (arr[4] === '-') {
                    let zero = '';
                    // 减去整数一位
                    for (let i = 0; i < arr[5] - 1; i++) {
                        zero += '0';
                    }
                    result += '0.' + zero + arr[2] + arr[3];
                } else {
                    result += arr[2] + arr[3];
                    const len = arr[5] - arr[3].length;
                    if (len >= 0) {
                        let zero = '';
                        for (let i = 0; i < len; i++) {
                            zero += '0';
                        }
                        result += zero;
                    } else {
                        result = result.substring(0, result.length + len) + '.' + result.substring(result.length + len);
                    }
                }
            } else {
                result += arr[2] + (arr[3] ? '.' + arr[3] : '');
            }
            return result;
        }
        return str;
    }

    // 清空搜索
    function clearTitle(pageId) {
        title = '';
        hoverCount = 0;
        items = [];
        $('#hotelValue' + pageId).val('');
        $('#searchInputList' + pageId).hide();
        $('#closeIcon' + pageId).hide();
    }

    KDApi.register('hotelselectpage', MyComponent)
})(window.KDApi, jQuery);
