var FPY_detailFun = function (KDApi, $, callback) {

    let model = {},
        items = [],
        deducItems = [], // 差额征税
        freights = [], // 货物运输
        goodsArr = [],
        pageId = '',
        kplx = '0', // 0蓝色发票，1红色发票 2空白红冲 3差额征税  10红字信息表
        zsfs = '0', // 0-普通征税方式 2- 差额征税 1-按减计增 01-差额增税全额开票 02-差额征税差额开票
        editType = '0', // 0可编辑 1不可编辑 2仅调整名称、规格型号、单位、数量、单价
        taxAdjustMode = '-1', // 税额调整模式，-1-默认模式(税额不可编辑)，0-按税盘限制调整，1-自由调整，2-反算单价
        hsbz = '0', // 0不含税;1含税
        deduction = '', // 扣除额
        specialtype = '00', // 特殊票种
        invoicetype = '', // 发票类型
        taxequipment = 0.06; // 盘类型：0.06代表金税盘，0.01代表其他盘

    const focusArr = ['ggxh', 'xmdw', 'xmsl', 'xmdj', 'xmje']; // 回车切换焦点顺序
    const taxRateArr = [
        {value: '0.17', text: '17%'},
        {value: '0.16', text: '16%'},
        {value: '0.13', text: '13%'},
        {value: '0.11', text: '11%'},
        {value: '0.10', text: '10%'},
        {value: '0.09', text: '9%'},
        {value: '0.06', text: '6%'},
        {value: '0.05', text: '5%'},
        {value: '0.04', text: '4%'},
        {value: '0.03', text: '3%'},
        {value: '0.01', text: '1%'},
        {value: '0.015', text: 'At 1.5% Reduced Rate'},
        {value: '0.00Z0', text: '0%(Export Tax Refund)'}, // lslbs: '1'
        {value: '0.00Z1', text: '0%(Duty-Free)'}, // lslbs: '1'
        {value: '0.00Z2', text: '0%(Non Taxation)'}, // lslbs: '2'
        {value: '0.00Z3', text: '0%(Ordinary Zero Tax Rate)'} // lslbs: '3'
    ];

    const evidencetypeList = [
        {value: '01', text: 'Digital Electronic Invoice'},
        {value: '02', text: 'VAT Special Invoice'},
        {value: '03', text: 'VAT Invoice'},
        {value: '04', text: 'Business Tax Invoice'},
        {value: '05', text: 'Financial Invoice'},
        {value: '06', text: 'Court Ruling'},
        {value: '07', text: 'Deed Tax Payment Voucher'},
        {value: '08', text: 'Other Invoice'},
        {value: '09', text: 'Other Deduction Vouchers'}
    ];

    const transporttypeList = [
        {value: '铁路运输', text: 'Railway Transportation'},
        {value: '公路运输', text: 'Road Transportation'},
        {value: '水路运输', text: 'Water Transportation'},
        {value: '航空运输', text: 'Air Transportation'},
        {value: '管道运输', text: 'Pipeline Transportation'},
        {value: '其它运输工具', text: 'Other Transportation'},
    ];

    this.initHtml = function (_model, props) {
        model = _model;
        var popsData = {};
        if (props != null && props.data != null) {
            popsData = props.data;
        }
        KDApi.loadFile('../invoicedetail/css/detailLine.css', model, function () {
            KDApi.templateFilePath('../invoicedetail/html/detailLine.html', model, popsData).then(
                function (result) {
                    if (model.dom.innerHTML === "" || isUpdate) {
                        model.dom.innerHTML = result;
                    }
                    setInitData(popsData);
                    initEvent(props)
                }
            )
        })
    };

    var setInitData = function (props) {
        console.log(props, '===============initdata')
        try {
            var data = props.data ? props.data : props;
            pageId = data['pageId'];
            hsbz = data['hsbz'];
            kplx = data['kplx'];
            zsfs = data['zsfs'] || '0';
            specialtype = data['specialtype'];
            taxAdjustMode = data['taxAdjustMode'] || taxAdjustMode;
            editType = data['editType'] || '0';
            taxequipment = data['taxequipment'] || 0.06;

            if (data['items']) {
                items = data['items'];
            } else {
                items = [];
                pushDefaultItem();
            }

            if (data['deducItems']) {
                deducItems = data['deducItems'];
            } else {
                deducItems = [];
                pushDefaultDeducItems();
            }

            if (data['freights']) {
                freights = data['freights'];
            } else {
                freights = [];
                pushDefaultTransportItems();
            }
            
            if (zsfs === '02') {
                $('#deductionsLine' + pageId).show();
                $('#deductionsLine' + pageId).css('border-top', '1px solid rgb(141, 85, 5)');
            } else {
                $('#deductionsLine' + pageId).hide();
            }

            if (specialtype === 'E04') {
                $('#transportLine' + pageId).show();
                $('#transportLine' + pageId).css('border-top', '1px solid rgb(141, 85, 5)');
            } else {
                $('#transportLine' + pageId).hide();
            }

			// 清单红票
			if('1' === data['qdhp']){
                editType === '1';
			}

            if (editType === '1' || editType === '2') {
                $('#addDetailLine' + pageId).hide();
                $('#addDiscountLine' + pageId).hide();
                $('#addDeductionsLine' + pageId).hide();
                $('#addTransportLine' + pageId).hide();
            } else {
                $('#addDetailLine' + pageId).css('display', 'inline-block');
                $('#addDiscountLine' + pageId).css('display', 'inline-block');
                $('#addDeductionsLine' + pageId).css('display', 'inline-block');
                $('#addTransportLine' + pageId).css('display', 'inline-block');
                if (kplx === '1') {
                    // 红冲
                    if (zsfs === '2') {
                        $('#addDetailLine' + pageId).hide();
                        $('#addDiscountLine' + pageId).hide();
                        $('#addDeduction' + pageId).hide();
                    } else {
                        $('#addDiscountLine' + pageId).hide();
                    }
                } else {
                    // 不红冲
                    if (zsfs === '2') {
                        $('#addDetailLine' + pageId).hide();
                        $('#addDeduction' + pageId).css('display', 'inline-block');
                        if (items.length === 2) {
                            $('#addDiscountLine' + pageId).hide();
                        }
                    } else {
                        if (items[items.length - 1].xmlx === '2') {
                            $('#addDiscountLine' + pageId).hide();
                        } else {
                            $('#addDiscountLine' + pageId).css('display', 'inline-block');
                        }
                        $('#addDeduction' + pageId).hide();
                    }
                }
            }

            // 红字信息表
            if (kplx == '10') {
                $('#addDiscountLine' + pageId).hide();
            }

            showLine(pageId);
            showDeductionsLine(pageId);
            showTransportLine(pageId);
            calcTotal(pageId);
            callback && callback(pageId, { items, deducItems, freights });
        } catch (err) {
        }
    };

    function pushDefaultItem() {
        items = [{
            index: '',
            id: '',
            xmlx: '0', // 0正常行;1折扣行;2被折扣行
            xmmc: '',  // 项目名称
            ggxh: '',  // 规格型号
            xmdw: '',  // 项目单位
            xmsl: '',  // 项目数量
            xmdj: '',  // 项目单价
            xmdjhs: '',  // 项目单价含税
            xmje: '',  // 项目金额
            xmjehs: '',  // 项目金额含税
            sl: '',  // 税率
            slText: '',  // select选中使用
            se: '',    // 税额
            spbm: '',  // 商品编码
            spmc: '',  // 商品名称
            zzstsgl: '', // 增值税特殊管理
            kce: '',      // 扣除额
            adjustedData: '' // 税额调整值
        }];
    }

    function pushDefaultDeducItems() {
        deducItems = [{
            index: '',
            id: '',
            evidencetype: '', // 凭证类型
            etaxinvoiceno: '',  // 全电票号码
            deductioninvoicecode: '',  // 发票代码
            deductioninvoiceno: '',  // 发票号码
            invoicedate: '',  // 开具日期
            evidenceno: '',  // 凭证号码
            evidenceamount: '',  // 凭证合计金额
            deductionamount: '',  // 本次扣除金额
            deductionremark: '',  // 备注
        }];
    }

    function pushDefaultTransportItems() {
        freights = [{
            index: '',
            id: '',
            transporttype: '',
            licenseplate: '',
            startplace: '',
            endplace: '',
            transportgoods: ''
        }];
    }

    this.updateHtml = function (props, initData) {
        const nowPageId = props.data['pageId'];
        if (pageId !== nowPageId) {
            items = initData[nowPageId]['items'];
            deducItems = initData[nowPageId]['deducItems'];
            freights = initData[nowPageId]['freights'];
            kplx = initData[nowPageId]['kplx'] || '0';
            zsfs = initData[nowPageId]['zsfs'] || '0';
            hsbz = initData[nowPageId]['hsbz'] || '0';
            specialtype = initData[nowPageId]['specialtype'] || '00';
            invoicetype = initData[nowPageId]['invoicetype'];
        }
        pageId = props.data['pageId'];
        var popsData = {};
        if (props != null && props.data != null) {
            popsData = props.data;
        }
        console.log(popsData, initData, '----------------update')
        if (popsData['specialtype'] && specialtype !== popsData['specialtype']) {
            pushDefaultTransportItems();
            callback && callback(pageId, { freights });
            showTransportLine(pageId);
        }
        var eventkey = popsData['eventkey'];
        specialtype = popsData['specialtype'];
        invoicetype = popsData['invoicetype'];
        switch (eventkey) {
            case 'queryGoods':
                queryGoods(pageId, popsData);
                break;
            case 'sethsbz':
                sethsbz(pageId, popsData);
                break;
            case 'setkplx':
                setkplx(pageId, popsData);
                break;
            case 'opendiscount':
                opendiscount(pageId, popsData);
                break;
            case 'openinvoice':
                openinvoice(pageId, popsData);
                break;
            case 'btn_save':
            case 'btn_submit':
                // 红字信息表点保存或提交
                redInfoOperation(eventkey);
                break;
            case 'btnflush':
                flush(pageId);
                break;
            case 'setzsfs':
                setzsfs(pageId, popsData);
                break;
            case 'loadData':
                loadData(pageId, popsData);
                break;
            case 'queryName':
                queryName(pageId, popsData);
                break;
            case 'returncezs':
                returncezs(pageId, popsData);
                break;
            case 'setSpecialtype':
                setSpecialtype(pageId, popsData);
                break;
            case 'setCEZSRow':
                setCEZSRow(pageId, popsData);
                break;
            case 'setPlace':
                setPlace(pageId, popsData);
                break;
        }
    };

    function setSpecialtype(pageId, popsData) {
        const isDisabled = specialtype === 'E06' || specialtype === 'E03' || specialtype === 'E05';
        const isDisabledMore = specialtype === 'E03';
        if (isDisabled) {
            items = items.map(val => ({
                ...val,
                ggxh: '',
                xmdw: '',
                xmsl: isDisabledMore ? '' : val.xmsl,
                xmdj: isDisabledMore ? '' : val.xmdj,
                xmdjhs: isDisabledMore ? '' : val.xmdjhs
            }))
        }
        if (specialtype === 'E04') {
            $('#transportLine' + pageId).show();
            $('#transportLine' + pageId).css('border-top', '1px solid rgb(141, 85, 5)');
        } else {
            $('#transportLine' + pageId).hide();
        }
        showLine(pageId);
        tableScrollToBottom();
        if (zsfs !== popsData['zsfs']) {
            setzsfs(pageId, popsData);
        }
    }

    function setCEZSRow(pageId, popsData) {
        var index = popsData.rowData.index;
        deducItems[index].evidenceamount = popsData.rowData.evidenceamount || '';
        deducItems[index].deductioninvoicecode = popsData.rowData.deductioninvoicecode || '';
        deducItems[index].deductionamount = popsData.rowData.deductionamount || '';
        deducItems[index].evidencetype = popsData.rowData.evidencetype || deducItems[index].evidencetype;
        deducItems[index].deductioninvoiceno = popsData.rowData.deductioninvoiceno || '';
        deducItems[index].deductionremark = popsData.rowData.deductionremark || '';
        deducItems[index].invoicedate = popsData.rowData.invoicedate || '';
        deducItems[index].etaxinvoiceno = popsData.rowData.etaxinvoiceno || '';
        $('#deductionstable' + pageId).find('.part').eq(index).find('.bz').find('input').eq(0).blur(); // 手动失去焦点
    }

    function setPlace(pageId, popsData) {
        const { index, place, activeKey } = popsData;
        freights[index][activeKey] = place;
        showTransportLine(pageId);
    }

    function queryGoods(pageId, popsData) {
        var xmmc = popsData['xmmc'];
        var spmc = popsData['spmc'];
        var index = popsData['index'];
        var spbm = popsData['spbm'];
        var sl = popsData['sl'];
        var slText = popsData['slText'];
        var xmdj = popsData['xmdj'];
        var xmdjhs = popsData['xmdjhs'];
        var zzstsgl = popsData['zzstsgl'];
        items[index].spmc = spmc;
        items[index].sl = sl;
        items[index].slText = slText;
        items[index].xmmc = xmmc.indexOf('*') > -1 ? xmmc : '*' + spmc + '*' + xmmc;
        items[index].spbm = spbm;
        items[index].zzstsgl = zzstsgl;
        items[index].xmdj = xmdj;
        items[index].xmdjhs = xmdjhs;
        items[index].xmdw = popsData['xmdw'];
        items[index].ggxh = popsData['ggxh'];
        $('#detailtable' + pageId).find('.part').eq(index).find('.xmmc').find('input').eq(0).blur(); // 手动失去焦点
        calcTotal(pageId);
    }

    function sethsbz(pageId, popsData) {
        hsbz = popsData['hsbz'];

        if ('1' == hsbz) {
            $('#headje' + pageId).html('Amount(Including Tax)');
            $('#headdj' + pageId).html('Unit-Price(Including Tax)');
        } else {
            $('#headje' + pageId).html('Amount(Excluding Tax)');
            $('#headdj' + pageId).html('Unit-Price(Excluding Tax)');
        }
        for (const i in items) {
            updateDetailHtml(i, pageId);
        }
        calcTotal(pageId);
    }

    function setkplx(pageId, popsData) {
        // 点击开票方式 0-正数 1-负数 2-空白红冲 3-开差额
        flush(pageId);
        kplx = popsData['kplx'];
        items = popsData['items'];
        deduction = '';
        $('#addDeduction' + pageId).hide();
        switch (kplx) {
            case "0":
                $('#addDetailLine' + pageId).css('display', 'inline-block');
                $('#addDiscountLine' + pageId).css('display', 'inline-block');
                break;
            case "1":
                $('#addDetailLine' + pageId).css('display', 'inline-block');
                $('#addDiscountLine' + pageId).hide();
                break;
            case "2":
                $('#addDetailLine' + pageId).css('display', 'inline-block');
                $('#addDiscountLine' + pageId).hide();
                break;
        }
        hsbz = popsData['hsbz'];
        if ('1' == hsbz) {
            $('#headje' + pageId).html('Amount(Including Tax)');
            $('#headdj' + pageId).html('Unit-Price(Including Tax)');
        } else {
            $('#headje' + pageId).html('Amount(Excluding Tax)');
            $('#headdj' + pageId).html('Unit-Price(Excluding Tax)');
        }

		// 清单红票
		if('1' === popsData['qdhp']){
			$('#addDetailLine' + pageId).hide();
            $('#addDiscountLine' + pageId).hide();
		}

        showLine(pageId);
        calcTotal(pageId);
    }

    function opendiscount(pageId, popsData) {
        // 添加折扣行
        var rowData = popsData['rowData'];
        items[items.length - 1].xmlx = '2';
        items.push(rowData);
        items[items.length - 1].kce = '0'; // 折扣行的差额置0
        showLine(pageId);
        tableScrollToBottom();
        calcTotal(pageId);
    }

    function openinvoice() {
        model.invoke('openinvoice', 
            {
                items,
                deducItems,
                freights
            }
        );
    }

    function redInfoOperation(eventKey) {
        model.invoke(eventKey, items);
    }

    function setzsfs(pageId, popsData) {
        if (popsData['check'] === '1') {
            let flag = false; // 默认没有数据
            for (let key in items[0]) {
                if (!!items[0][key] && items[0][key] > 0) {
                    flag = true;
                }
            }
            if (items.length > 1 || flag) {
                model.invoke('checkback', '1');
            } else {
                model.invoke('checkback', '0');
            }
            return;
        }
        flush(pageId);
        kplx = popsData['kplx'];
        zsfs = popsData['zsfs'];

        editType = '0';
        deduction = '';
        if (kplx === '3') {
            $('#addDetailLine' + pageId).hide();
            $('#addDiscountLine' + pageId).css('display', 'inline-block');
            $('#addDeduction' + pageId).css('display', 'inline-block');
        } else {
            $('#addDetailLine' + pageId).css('display', 'inline-block');
            $('#addDiscountLine' + pageId).css('display', 'inline-block');
            $('#addDeduction' + pageId).hide();
        }

        if (zsfs === '02') {
            $('#deductionsLine' + pageId).show();
            $('#deductionsLine' + pageId).css('border-top', '1px solid rgb(141, 85, 5)');
        } else {
            $('#deductionsLine' + pageId).hide();
        }
    }

    function loadData(pageId, popsData) {
        editType = popsData['editType'] || '0';
        var items_ = popsData['items'];
        if (!!items_) {
            items = items_;
        }
        taxAdjustMode = popsData['taxAdjustMode'] || taxAdjustMode;
        if ('1' === editType || '2' === editType) {
            $('#addDetailLine' + pageId).hide();
            $('#addDiscountLine' + pageId).hide();
            $('#addDeductionsLine' + pageId).hide();
            $('#addTransportLine' + pageId).hide();
        } else {
            $('#addDetailLine' + pageId).css('display', 'inline-block');
            $('#addDiscountLine' + pageId).css('display', 'inline-block');
            $('#addDeductionsLine' + pageId).css('display', 'inline-block');
            $('#addTransportLine' + pageId).css('display', 'inline-block');
        }
        showLine(pageId);
        showDeductionsLine(pageId);
        showTransportLine(pageId);
        if (!!items_) {
            calcTotal(pageId);
        }
    }

    function queryName(pageId, popsData) {
        goodsArr = popsData['goods'];
        if (goodsArr.length === 0) {
            $('#drop-down' + pageId).hide();
            return;
        }
        var index = goodsArr[0].index;

        var str = ``;
        for (var i = 0; i < goodsArr.length; i++) {
            var curItem = popsData['goods'][i];
            str += `<li title="${curItem['xmmc'].replace(/^\*.+\*/g, '')}" data-index='${i}' class="item-name">${curItem['xmmc'].replace(/^\*.+\*/g, '')}</li>`;
        }
        $('#drop' + pageId).html(str);
        $('#drop-down' + pageId)[0].style.top = ((Number(index) + 1) * $('#detailtable' + pageId + ' .part')[0].clientHeight + $('#detailpart' + pageId).height() - Number($('#detailtable' + pageId).scrollTop())) + 'px';
        $('#drop-down' + pageId).show();
    }

    function returncezs(pageId, popsData) {
        deduction = popsData['deduction'];
        // 所有明细更新扣除额
        for (let item of items) {
            if (item['xmlx'] != '1') {
                item.kce = deduction;
            }
        }
        for (const i in items) {
            calcSE(i);
            inverseCalcXMJE(i);
            inverseCalcXMDJ(i);
        }
        showLine(pageId);
        calcTotal(pageId);
    }

    function flush() {
        pushDefaultItem();
        pushDefaultDeducItems();
        pushDefaultTransportItems();
        showLine(pageId);
        showDeductionsLine(pageId);
        showTransportLine(pageId);
        callback && callback(pageId, { items, deducItems, freights });
    }

    // 渲染明细行
    function showLine(pageId) {
        $('#drop' + pageId).off('click'); // 解绑商品模糊搜索下拉选择事件
        let text = '';
        const isDisabled = specialtype === 'E06' || specialtype === 'E03' || specialtype === 'E05';
        const isDisabledMore = specialtype === 'E03';
        for (let i in items) {
            let item = items[i];
            text += `<div class='part'>
                <div class="name num">${Number(i) + 1}</div>
                <div class='name xmmc'><input placeholder="Can be searched using the 'Enter'"  type='text' ${item.xmlx !== '0' || editType === '1' ? 'disabled' : ''} value='${item.xmmc}' data-name='xmmc' data-index='${i}' maxlength="90" autocomplete="off"></div>
                <div class='name ggxh'><input type='text' ${item.xmlx !== '0' || editType === '1' || isDisabled ? 'disabled' : ''} value='${item.ggxh}' data-name='ggxh' data-index='${i}' maxlength="40" autocomplete="off"></div>
                <div class='name xmdw'><input type='text' ${item.xmlx !== '0' || editType === '1' || isDisabled ? 'disabled' : ''} value='${item.xmdw}' data-name='xmdw' data-index='${i}' maxlength="20" autocomplete="off"></div>
                <div class='name xmsl'><input type='text' ${item.xmlx === '1' || editType === '1' || isDisabledMore ? 'disabled' : ''} value='${item.xmsl}' data-name='xmsl' data-index='${i}' maxlength="16" autocomplete="off"></div>
                <div class='name xmdj'><input type='text' ${item.xmlx === '1' || editType === '1' || isDisabledMore ? 'disabled' : ''} value='${hsbz === '0' ? item.xmdj : item.xmdjhs}' data-name='xmdj' data-index='${i}' maxlength="16" autocomplete="off"></div>
                <div class='name xmje'><input type='text' ${editType === '1' || editType === '2' ? 'disabled' : ''} value='${hsbz === '0' ? item.xmje : item.xmjehs}' data-name='xmje' data-index='${i}' maxlength="12" autocomplete="off"></div>
                <div class='name sl'>
                    <select ${item.xmlx !== '0' || editType === '1' || editType === '2' ? 'disabled' : ''} data-name='sl' data-index='${i}' style='height: 23px;'><option value="" style="display: none;"></option>`;
            for (const o of taxRateArr) {
                text += `<option value='${o.value}' ${o.value === item.slText ? 'selected' : ''}>${o.text}</option>`;
            }
            text += `</select>
                </div>
                <div class='name se'><input type='text' ${taxAdjustMode === '-1' ? 'disabled' : ''}  value='${item.se}' data-name='se' data-index='${i}' maxlength="20" autocomplete="off"></div>
                <div class='name cz'>${(item.xmlx !== '2' && editType === '0') ? `<span class='del' data-index='${i}'></span>` : ''}</div>
            </div>`;
        }
        $('#detailtable' + pageId).html(text);
        bindSelectEvent(); // 重新注册商品模糊搜索下拉选择事件
    }

    // 渲染差额征税
    function showDeductionsLine(pageId) {
        // $('#drop' + pageId).off('click'); // 解绑商品模糊搜索下拉选择事件
        let text = '';
        const etaxinvoicenoDisabled = ['02' , '03', '04'];
        for (let i in deducItems) {
            let item = deducItems[i];
            text += `<div class='part'>
                <div class="name num">${Number(i) + 1}</div>
                <div class='name pzlx'>
                    <select ${editType === '1' ? 'disabled' : ''} data-name='evidencetype' data-index='${i}' style='height: 23px;'><option value="" style="display: none;"></option>`;
                        for (const o of evidencetypeList) {
                            text += `<option value='${o.value}' ${o.value === item.evidencetype ? 'selected' : ''}>${o.text}</option>`;
                        }
                    text += `</select>
                </div>
                <div class='name qdphm'><input type='text' placeholder="Can be searched using the 'Enter'" ${editType === '1' || item.evidencetype !== '01' ? 'disabled' : ''} value='${item.etaxinvoiceno}' data-name='etaxinvoiceno' data-index='${i}' maxlength="40" autocomplete="off"></div>
                <div class='name fpdm'><input type='text' placeholder="Can be searched using the 'Enter'" ${editType === '1' || !etaxinvoicenoDisabled.some(val => val === item.evidencetype) ? 'disabled' : ''} value='${item.deductioninvoicecode}' data-name='deductioninvoicecode' data-index='${i}' maxlength="20" autocomplete="off"></div>
                <div class='name fphm'><input type='text' ${editType === '1' || !etaxinvoicenoDisabled.some(val => val === item.evidencetype) ? 'disabled' : ''} value='${item.deductioninvoiceno}' data-name='deductioninvoiceno' data-index='${i}' maxlength="16" autocomplete="off"></div>
                <div class='name pzhm'><input type='text' ${editType === '1' ? 'disabled' : ''} value='${item.evidenceno}' data-name='evidenceno' data-index='${i}' maxlength="16" autocomplete="off"></div>
                <div class='name kjrq'><input type='text' ${editType === '1' ? 'disabled' : ''} value='${item.invoicedate}' data-name='invoicedate' data-index='${i}' maxlength="12" autocomplete="off"></div>
                <div class='name hjje'><input type='text' ${editType === '1' ? 'disabled' : ''} value='${item.evidenceamount}' data-name='evidenceamount' data-index='${i}' maxlength="12" autocomplete="off"></div>
                <div class='name kcje'><input type='text' ${editType === '1' ? 'disabled' : ''}  value='${item.deductionamount}' data-name='deductionamount' data-index='${i}' maxlength="20" autocomplete="off"></div>
                <div class='name bz'><input type='text' ${editType === '1' ? 'disabled' : ''}  value='${item.deductionremark}' data-name='deductionremark' data-index='${i}' maxlength="20" autocomplete="off"></div>
            `;
            text += `
                <div class='name cz'>${(editType === '0') ? `<span class='del' data-index='${i}'></span>` : ''}</div>
            </div>`;
        }
        $('#deductionstable' + pageId).html(text);
    }

    // 渲染货物运输
    function showTransportLine(pageId) {
        let text = '';
        for (let i in freights) {
            let item = freights[i];
            text += `<div class='part'>
                <div class="name num">${Number(i) + 1}</div>
                <div class='name ysgjzl'>
                    <select ${editType === '1' ? 'disabled' : ''} data-name='transporttype' data-index='${i}' style='height: 23px;'><option value="" style="display: none;"></option>`;
                        for (const o of transporttypeList) {
                            text += `<option value='${o.value}' ${o.value === item.transporttype ? 'selected' : ''}>${o.text}</option>`;
                        }
                    text += `</select>
                </div>
                <div class='name ysgjph'><input type='text' ${editType === '1' ? 'disabled' : ''} value='${item.licenseplate}' data-name='licenseplate' data-index='${i}' maxlength="40" autocomplete="off"></div>
                <div class='name qyd'><input placeholder="Can be searched using the 'Enter'" type='text' ${editType === '1' ? 'disabled' : ''} value='${item.startplace}' data-name='startplace' data-index='${i}' maxlength="80" autocomplete="off"></div>
                <div class='name ddd'><input placeholder="Can be searched using the 'Enter'" type='text' ${editType === '1' ? 'disabled' : ''} value='${item.endplace}' data-name='endplace' data-index='${i}' maxlength="80" autocomplete="off"></div>
                <div class='name yshwmc'><input type='text' ${editType === '1' ? 'disabled' : ''} value='${item.transportgoods}' data-name='transportgoods' data-index='${i}' maxlength="80" autocomplete="off"></div>
            `;
            text += `
                <div class='name cz'>${(editType === '0') ? `<span class='del' data-index='${i}'></span>` : ''}</div>
            </div>`;
        }
        $('#transporttable' + pageId).html(text);
    }

    function bindSelectEvent() {
        // 选择名称下拉选项
        $('#drop' + pageId).on('click', 'li', e => {
            const {index} = e.target.dataset;
            const value = trim(e.target.innerText);
            var i = goodsArr[0].index;
            items[i] = {...items[i], ...goodsArr[index]};
            updateDetailHtml(i);
            calcTotal();
            $('#drop-' + pageId).html('');
            $('#drop-down' + pageId).hide();
        });

        // 点击其他地方隐藏下拉框
        $(document).on('click', e => {
            const className = e.target.className;
            const {name} = e.target.dataset;
            if (className != 'drop-down' && name != 'xmmc') {
                $('#drop' + pageId).html('');
                $('#drop-down' + pageId).hide();
            }
        });
    }

    // table滚动到底部
    function tableScrollToBottom() {
        $('#detailtable' + pageId).scrollTop($('#detailtable' + pageId).height());
    }

    var initEvent = function (props) {
        bindSelectEvent();
        pageId = props.data['pageId'];
        $('#detailtable' + pageId).on('click', '.del', e => {
            const i = $(e.target).attr('data-index');
            if(items.length === 1){
                model.invoke('tipNotify', 'At least one line of details must be retained');
                return;
            }

            // 折扣行删除，被折扣行改为正常行
            if (items[i].xmlx === '1') {
                items[i - 1].xmlx = '0';
                $('#addDiscountLine' + pageId).css('display', 'inline-block');
            }
            items.splice(i, 1);
            if (kplx !== '10') {
                model.invoke('addNewRow');
                calcTotal(pageId);
                return;
            }
            showLine(pageId);
            calcTotal(pageId);
        });

        $('#deductionstable' + pageId).on('click', '.del', e => {
            const i = $(e.target).attr('data-index');
            if(deducItems.length === 1){
                model.invoke('tipNotify', 'At least one line of details must be retained');
                return;
            }
            deducItems.splice(i, 1);
            showDeductionsLine(pageId);
            // $('#deductionstable' + pageId).find('.part').eq(0).find('.kcje').find('input').eq(0).blur(); // 手动失去焦点
        });

        $('#transporttable' + pageId).on('click', '.del', e => {
            const i = $(e.target).attr('data-index');
            if(freights.length === 1){
                model.invoke('tipNotify', 'At least one line of details must be retained');
                return;
            }
            freights.splice(i, 1);
            showTransportLine(pageId);
        });

        $("#addDetailLine" + pageId).click(() => {
            console.log(pageId, 'click---pageid')
            if (kplx == '10' && items.length === 8) {
                model.invoke('tipNotify', 'The Red-Letter Information Sheet can only have up to 8 lines of details');
                return
            }
			if ( (kplx == '1' || kplx == '2') && items.length === 8) {
                model.invoke('tipNotify', 'Red-Letter Invoice can only be a maximum of 8 lines of details');
                return
            }
            if (kplx == '0' && (zsfs === '01' || zsfs === '02') && items.length > 0) {
                model.invoke('tipNotify', 'Blue-Letter Invoice，the difference tax issuance method can only issue one line of details');
                return
            }
            if (kplx == '1' && (zsfs === '01' || zsfs === '02') && items.length === 1) {
                model.invoke('tipNotify', 'Red-Letter Invoice，the difference tax issuance method can only issue one line of details');
                return
            }
            items.push({
                index: '',
                xmlx: '0', // 0正常行;2被折扣行;1折扣行
                xmmc: '',  // 项目名称
                ggxh: '',  // 规格型号
                xmdw: '',  // 项目单位
                xmsl: '',  // 项目数量
                xmdj: '',  // 项目单价
                xmdjhs: '',  // 项目单价含税
                xmje: '',  // 项目金额
                xmjehs: '',  // 项目金额含税
                sl: '',  // 税率
                slText: '',  // select选中使用
                se: '',    // 税额
                spbm: '',  // 商品编码
                spmc: '',  // 商品名称
                zzstsgl: '', // 增值税特殊管理
                kce: '',      // 扣除额
				adjustedData: '' // 税额调整值
            });
            if (kplx !== '10') {
                model.invoke('addNewRow');
                return;
            }
            showLine(pageId);
            tableScrollToBottom();
        });

        $("#addDeductionsLine" + pageId).click(() => {
            deducItems.push({
                index: '',
                id: '',
                evidencetype: '', // 凭证类型
                etaxinvoiceno: '',  // 全电票号码
                deductioninvoicecode: '',  // 发票代码
                deductioninvoiceno: '',  // 发票号码
                invoicedate: '',  // 开具日期
                evidenceno: '',  // 凭证号码
                evidenceamount: '',  // 凭证合计金额
                deductionamount: '',  // 本次扣除金额
                deductionremark: '',  // 备注
            });
            showDeductionsLine(pageId);
        });

        $("#addTransportLine" + pageId).click(() => {
            freights.push({
                index: '',
                id: '',
                transporttype: '',
                licenseplate: '',
                startplace: '',
                endplace: '',
                transportgoods: ''
            });
            showTransportLine(pageId);
        });

        $("#addDiscountLine" + pageId, model.dom).click(function () {
            const lastItem = items[items.length - 1];
            if (kplx === '3' && lastItem.kce === '') {
                model.invoke('tipNotify', 'Deduction amount cannot be empty');
                return;
            }
            if (lastItem.xmlx === '1') {
                model.invoke('tipNotify', 'The last line is already a discount line');
                return;
            } else if (lastItem.xmje - lastItem.kce <= 0) {
                model.invoke('tipNotify', 'The discounted line amount cannot be less than or equal to 0');
                return;
            } else if (!lastItem.xmmc) {
                model.invoke('tipNotify', 'Discount line "Project Name" cannot be empty');
                return;
            } else {
                model.invoke('opendiscount', lastItem);
            }
        });

        // add deduction
        $("#addDeduction" + pageId, model.dom).click(function () {
            model.invoke('addDeduction', items);
        });

        $('#detailtable' + pageId).on('keydown', 'input', e => {
            const {name, index} = e.target.dataset;
            if (e.keyCode === 13 && name === 'xmmc') {
                var itemrow = items[index];
                itemrow.index = index;
                model.invoke('queryGoods', itemrow);
            }
            if (e.keyCode === 13 && name !== 'xmmc') {
                let i = focusArr.indexOf(name);
                $('#detailtable' + pageId).find('.part').eq(index).find('.' + name).find('input').eq(0).blur(); // 手动失去焦点
                if (i === focusArr.length - 1){
                    return false;
                }
                $('#detailtable' + pageId).find('.part').eq(index).find('.' + focusArr[i + 1]).find('input').eq(0).focus(); // 手动赋予焦点
            }
        });

        $('#detailtable' + pageId).on('dblclick', 'input', e => {
            if (editType === '1') {
                return;
            }
            const {name, index} = e.target.dataset;
            if (name === 'xmmc') {
                var itemrow = items[index];
                itemrow.index = index;
                if (itemrow.xmlx !== '0') {
                    return;
                }
                model.invoke('queryGoods', itemrow);
            }
        });

        

        $('#deductionstable' + pageId).on('keydown', 'input', e => {
            const {name, index} = e.target.dataset;
            // 查询全电发票
            if (e.keyCode === 13 && name === 'etaxinvoiceno') {
                var itemrow = deducItems[index];
                itemrow.index = index;
                model.invoke('chooseAllEInvoice', itemrow);
            }
            // 查询其他类型发票
            if (e.keyCode === 13 && name === 'deductioninvoicecode') {
                var itemrow = deducItems[index];
                itemrow.index = index;
                model.invoke('chooseInvoice', itemrow);
            }
            if (e.keyCode === 13 && name !== 'etaxinvoiceno' && name !== 'deductioninvoicecode') {
                let i = focusArr.indexOf(name);
                $('#deductionstable' + pageId).find('.part').eq(index).find('.' + name).find('input').eq(0).blur(); // 手动失去焦点
                if (i === focusArr.length - 1){
                    return false;
                }
                $('#deductionstable' + pageId).find('.part').eq(index).find('.' + focusArr[i + 1]).find('input').eq(0).focus(); // 手动赋予焦点
            }
        });

        $('#deductionstable' + pageId).on('dblclick', 'input', e => {
            if (editType === '1') {
                return;
            }
            const {name, index} = e.target.dataset;
            if ((deducItems[index]?.evidencetype === '01' || !deducItems[index].evidencetype) && name === 'etaxinvoiceno') {
                var itemrow = deducItems[index];
                itemrow.index = index;
                model.invoke('chooseAllEInvoice', itemrow);
            }
            if ((deducItems[index]?.evidencetype === '02' || deducItems[index]?.evidencetype === '03' || deducItems[index]?.evidencetype === '04' || !deducItems[index].evidencetype) && name === 'deductioninvoicecode') {
                var itemrow = deducItems[index];
                itemrow.index = index;
                model.invoke('chooseInvoice', itemrow);
            }
        });

        //input输入
        $('#detailtable' + pageId).on('input', 'input', e => {
            const {name, index} = e.target.dataset;
            const value = trim(e.target.value);
            switch (name) {
                case 'xmmc':
                    var xmmc = value;
                    var spmc = items[index].spmc;
                    if (xmmc == spmc) {

                        items[index].xmmc = '';
                        items[index].spmc = '';
                        items[index].spbm = '';

                        syncShowData('xmmc', '', index, pageId);
                    } else {
                        if (value != '') {
                            items[index][name] = value;
                        }
                        syncShowData(name, value, index, pageId);
                    }
                    if (value.length >= 2) {
                        var o = {
                            index: index,
                            value: value
                        };
                        model.invoke('queryName', o);
                    }
                    break;
                default:
                    break;
            }
        });

        // 明细行滚动的时候，隐藏下拉框
        $('#detailtable' + pageId).on('scroll', e => {
            if ($('#detailtable' + pageId).scrollTop() > 0 && $('#drop-down' + pageId)[0].style.display === 'block') {
                $('#drop-down' + pageId).hide()
            }
        });

        // input失去焦点
        $('#detailtable' + pageId).on('blur', 'input', e => {
            const {name, index} = e.target.dataset;
            let value = trim(e.target.value);
            switch (name) {
                case 'xmsl': // 数量
                    if (isNaN(value)) {
                        model.invoke('tipNotify', 'Please enter the correct quantity');
                        value = '';
                    }
                    inputXMSL(value, index);
                    break;
                case 'xmdj': // 单价
                    if (isNaN(value)) {
                        model.invoke('tipNotify', 'Please enter the correct unit price');
                        value = '';
                    }
                    inputXMDJ(value, index);
                    break;
                case 'xmje': // 金额
                    if (isNaN(value)) {
                        model.invoke('tipNotify', 'Please enter the correct amount');
                        value = '';
                    }
                    inputXMJE(value, index);
                    break;
                case 'se': // 税额
                    if (isNaN(value)) {
                        model.invoke('tipNotify', 'Please enter the correct tax amount');
                        value = '';
                    }
                    inputSE(value, index);
                    break;
                case 'xmmc':
                    var xmmc = value;
                    var spmc = items[index].spmc;
                    if (xmmc == spmc) {
                        items[index].xmmc = '';
                        items[index].spmc = '';
                        items[index].spbm = '';
                    } else {
                        if (value === '') {
                            items[index].xmsl = '';
                            items[index].xmje = '';
                            items[index].xmjehs = '';
                            items[index].se = '';
                        }
                    }
                    break;
                default:
                    index !== undefined && (items[index][name] = value);
                    break;
            }
            updateDetailHtml(index, pageId, model);
            calcTotal(pageId);
            callback && callback(pageId, { items });
        });

        $('#detailtable' + pageId).on('change', 'select', e => {
            const {name, index} = e.target.dataset;
            const value = e.target.value;
            let sl = '0';
            let lslbs = '';
            let ssyhzc = '';
            let ssyhzcnr = '';
            switch (value) {
                case '0.00Z0': // 出口退税
                    lslbs = '1';
                    break;
                case '0.00Z1': // 免税
                    lslbs = '1';
                    ssyhzc = '1';
                    ssyhzcnr = 'Duty-Free';
                    break;
                case '0.00Z2': // 不征税
                    lslbs = '2';
                    ssyhzc = '1';
                    ssyhzcnr = 'Non Taxation';
                    break;
                case '0.00Z3': // 普通零税率
                    lslbs = '3';
                    ssyhzc = '0';
                    ssyhzcnr = '';
                    break;
                default:
                    sl = value;
            }
            items[index][name] = sl;
            items[index].slText = value;
            inputSL(index);
            updateDetailHtml(index);
            calcTotal();
        });

        $('#deductionstable' + pageId).on('change', 'select', e => {
            const {name, index} = e.target.dataset;
            const value = e.target.value;
            if (name === 'evidencetype') {
                if (value === '01') {
                    deducItems[index]['deductioninvoicecode'] = '';
                    deducItems[index]['deductioninvoiceno'] = '';
                } else if (value === '02' || value === '03' || value === '04') {
                    deducItems[index]['etaxinvoiceno'] = '';
                } else {
                    deducItems[index]['etaxinvoiceno'] = '';
                    deducItems[index]['deductioninvoicecode'] = '';
                    deducItems[index]['deductioninvoiceno'] = '';
                }
            }
            deducItems[index][name] = value;
            updateDeductionsHtml(index);
        });

        // 差额征税input失去焦点
        $('#deductionstable' + pageId).on('blur', 'input', e => {
            const {name, index} = e.target.dataset;
            let value = trim(e.target.value);
            index !== undefined && (deducItems[index][name] = value);
            const totalDeductionamount = deducItems.reduce((a, b) => fpy_Add(a, b.deductionamount), 0);
            const totalAmount = items.length && items[0].xmjehs ? +items[0].xmjehs : 0;
            if (totalDeductionamount > totalAmount) {
                model.invoke('tipNotify', 'The amount deducted this time cannot exceed the total price and tax of the document');
                return;
            }
            if (name === 'deductionamount') {
                items[0].kce = totalDeductionamount;
                calcSE(0);
                inverseCalc(0);
                $('#detailtable' + pageId).find('.part').eq(0).find('.xmmc').find('input').eq(0).blur(); // 手动失去焦点
            }
            updateDeductionsHtml(index, pageId, model);
            callback && callback(pageId, { deducItems });
        });

        // 货物运输input失去焦点
        $('#transporttable' + pageId).on('blur', 'input', e => {
            const {name, index} = e.target.dataset;
            let value = trim(e.target.value);
            freights[index][name] = value
            updateTransportHtml(index, pageId, model);
            callback && callback(pageId, { freights });
        });

        $('#tips' + pageId).on('mouseover mouseout', e => {
            if (e.type == 'mouseover') {
            //鼠标悬浮
                $('#transportLine' + pageId).find('.part').eq(0).find('.tooltips').show();
            } else if (e.type == 'mouseout') {
            //鼠标离开
                $('#transportLine' + pageId).find('.part').eq(0).find('.tooltips').hide();
            }
        });

        $('#transportLine' + pageId).on('dblclick', 'input', e => {
            if (editType === '1') {
                return;
            }
            const {name, index} = e.target.dataset;
            if (name === 'startplace' || name === 'endplace') {
                var itemrow = freights[index];
                itemrow.index = index;
                itemrow.activeKey = name;
                model.invoke('queryPlace', itemrow);
            }
        });

        $('#transportLine' + pageId).on('keydown', 'input', e => {
            if (editType === '1') {
                return;
            }
            const {name, index} = e.target.dataset;
            if (e.keyCode === 13 && (name === 'startplace' || name === 'endplace')) {
                var itemrow = freights[index];
                itemrow.index = index;
                itemrow.activeKey = name;
                model.invoke('queryPlace', itemrow);
            }
        });

        $('#transportLine' + pageId).on('change', 'select', e => {
            const {name, index} = e.target.dataset;
            const value = e.target.value;
            freights[index][name] = value;
            updateTransportHtml(index);
        });
    };

    function trim(v) {
        return v.replace(/^\s+/g, '').replace(/\s+$/g, '');
    }

    // 数量输入 （计算单价、金额、税额）
    function inputXMSL(value, i) {
        const {xmsl, xmdj, xmdjhs, xmje} = items[i];
        if (xmsl === value){
            return; // 如果数量没有改变则不需要重新计算
        }
        if (value == 0) {
            items[i].xmsl = '';
            items[i].xmdj = '';
            items[i].xmdjhs = '';
            return
        }
        // 自动转换
        if (((kplx === '1' || kplx === '2' || kplx == '10') && value > 0) || ((kplx === '0' || kplx === '3') && value < 0)) value = -value;

        items[i].xmsl = fpy_toFixedNoZero(value);
        // 计算金额和税额
        if (editType !== '2' && ((hsbz === '0' && xmdj) || (hsbz === '1' && xmdjhs))) {
            calcXMJE(i);
            calcSE(i);
        } else if (xmje) {
            calcXMDJ(i);
        }
        inverseCalc(i);
    }

    // 单价输入 （计算金额跟数量）
    function inputXMDJ(value, i) {
        const {xmsl, xmdj, xmdjhs, xmje} = items[i];
        if ((hsbz === '0' && xmdj === value) || (hsbz === '1' && xmdjhs === value)){
            return; // 如果单价没有改变则不需要重新计算
        }
        if (value == 0) {
            items[i].xmsl = '';
            items[i].xmdj = '';
            items[i].xmdjhs = '';
            return;
        }
        // 自动转换
        if (value < 0) value = -value;

        hsbz === '0' ? items[i].xmdj = fpy_toFixedTwoOrMore(value) : items[i].xmdjhs = fpy_toFixedTwoOrMore(value);
        // 计算数量 金额 税额
        if (editType !== '2' && xmsl) {
            calcXMJE(i);
            calcSE(i);
        } else if (xmje) {
            calcXMSL(i);
        }
        inverseCalc(i);
    }

    // 金额输入
    function inputXMJE(value, i) {
        const {xmsl, xmdj, xmdjhs, xmje, xmjehs} = items[i];
        if ((hsbz === '0' && xmje === value) || (hsbz === '1' && xmjehs === value)){
            return; // 如果金额没有改变则不需要重新计算
        }
        if (value == 0) {
            items[i].xmdj = '';
            items[i].xmdjhs = '';
            items[i].xmje = '';
            items[i].xmjehs = '';
            items[i].se = '';
            return;
        }
        // 自动转换
        if (((kplx === '1' || kplx === '2' || kplx == '10') && value > 0) || ((kplx === '0' || kplx === '3') && value < 0)) value = -value;

        hsbz === '0' ? items[i].xmje = fpy_toFixedSafe(value) : items[i].xmjehs = fpy_toFixedSafe(value);
        if (xmsl) {
            calcXMDJ(i);
            calcSE(i);
        } else if (xmdj || xmdjhs) {
            calcXMSL(i);
            calcSE(i);
        } else {
            calcSE(i);
        }
        inverseCalc(i);
    }

    // 改变税率（计算单价、金额、税率）
    function inputSL(i) {
        const {sl, xmje, kce} = items[i];
        if (hsbz === '0') {
            if (sl * 1 === 0.015) {
                items[i].se = fpy_toFixedSafe(fpy_accMul(fpy_accDiv(fpy_Add(xmje, -kce), '1.035'), sl));
            } else {
                items[i].se = fpy_toFixedSafe(fpy_accMul(fpy_Add(xmje, -kce), sl));
            }
        } else {
            if (sl * 1 === 0.015) {
                items[i].se = fpy_toFixedSafe(
                    fpy_accMul(
                        fpy_accDiv(fpy_Add(items[i].xmjehs, -kce), fpy_Add(1, 0.05)), sl)); //  税率 * 含税金额/(1 + 0.05)
            } else {
                items[i].se = fpy_toFixedSafe(
                    fpy_accMul(
                        fpy_accDiv(fpy_Add(items[i].xmjehs, -kce), fpy_Add(1, sl)), sl)); //  税率 * 含税金额/(1 + 税率)
            }
        }
        inverseCalc(i);
    }

    // 税额输入
    function inputSE(value, i) {
        const { id, xmsl, xmdj, xmje, se, sl, xmjehs, xmlx, kce = 0 } = items[i];
        if (se == value){
            return; // 如果税额没有改变则不需要重新计算
        }
        // 自动转换
        if ((xmjehs < 0 && value > 0) || (xmjehs > 0 && value < 0)) value = -value;
        value = Number(value).toFixed(2);
        const difference = fpy_Minus(value, se); // 税额调整值
        // 是否自由调整
        if (taxAdjustMode === '1') {
            // 不含税时，改变含税金额
            // 含税时，改变不含税金额
            if (hsbz === '0') {
                const _xmjehs = fpy_Add(xmjehs, difference).toFixed(2);
                const _xmdjhs = xmsl ? fpy_toFixedSafe(fpy_accDiv(_xmjehs, xmsl)) : '';
                items[i].xmjehs = _xmjehs;
                items[i].xmdjhs = _xmdjhs;
            } else {
                const _xmje = fpy_Minus(xmje, difference).toFixed(2);
                const _xmdj = xmsl ? fpy_toFixedSafe(fpy_accDiv(_xmje, xmsl)) : '';
                items[i].xmje = _xmje;
                items[i].xmdj = _xmdj;
            }
            items[i].se = value;
        } else {
            let isError = false;
            const _xmje = fpy_Minus(xmje, difference).toFixed(2);
            let _xmdj = xmdj;

            // 计算正确的对比税额
            // 用调整后的不含税金额和税率计算对比税额(需要考虑扣除额，只有非折扣行才需要)
            // 不含税金额以数量不含税单价乘积为准；无数量单价时，不计算不含税金额误差
            // 因被折扣行也有折扣额，需排除
            const taxCal = fpy_toFixedSafe(fpy_accMul(fpy_Minus(_xmje, xmlx === '1' ? 0 : kce).toFixed(2), sl));

            if (Math.abs(fpy_Minus(value, taxCal)) > taxequipment) {
                isError = `The error in the detailed tax amount to be invoiced exceeds ±${taxequipment}, please modify again!`;
            } else if (xmdj && Math.abs(fpy_Minus(_xmje, fpy_accMul(xmsl, xmdj).toFixed(2))) > 0.01) {
                // 是否反算单价
                if (taxAdjustMode === '2') {
                    _xmdj = fpy_toFixedNoZero(fpy_accDiv(_xmje, xmsl)).substring(0, 16);
                } else {
                    isError = 'The error in the detailed amount of the invoice to be issued exceeds ±0.01，please modify again!';
                }
            }
            const adjustedData = fpy_Add(items[i].adjustedData || 0, difference);
            if (isError) {
                model.invoke('tipNotify', isError);
            } else {
                items[i].se = value;
                items[i].xmdj = _xmdj;
                items[i].xmje = _xmje;
                items[i].adjustedData = adjustedData;
                model.invoke('fixTaxDiff', { itemsid: id , taxdiff: adjustedData });
            }
        }
    }

    // 计算数量
    function calcXMSL(i) {
        const {xmdj, xmdjhs, xmje, xmjehs} = items[i];
        if (hsbz === '0') {
            items[i].xmsl = fpy_toFixedNoZero(fpy_accDiv(xmje, xmdj)).substring(0, 16);
        } else {
            items[i].xmsl = fpy_toFixedNoZero(fpy_accDiv(xmjehs, xmdjhs)).substring(0, 16);
        }
    }

    // 计算单价
    function calcXMDJ(i) {
        const {xmsl, xmje, xmjehs} = items[i];
        if (hsbz === '0') {
            items[i].xmdj = fpy_toFixedTwoOrMore(fpy_accDiv(xmje, xmsl)).substring(0, 16);
        } else {
            items[i].xmdjhs = fpy_toFixedTwoOrMore(fpy_accDiv(xmjehs, xmsl)).substring(0, 16);
        }
    }

    // 计算金额
    function calcXMJE(i) {
        const {xmsl, xmdj, xmdjhs} = items[i];
        if (hsbz === '0') {
            items[i].xmje = fpy_toFixedSafe(fpy_accMul(xmdj, xmsl));
        } else {
            items[i].xmjehs = fpy_toFixedSafe(fpy_accMul(xmdjhs, xmsl));
        }
    }

    // 计算税额
    function calcSE(i) {
        const {sl, xmje, kce} = items[i];
        if(sl === ''){
            return;
        }

        if (hsbz === '0') {
            if (sl * 1 === 0.015) {
                items[i].se = fpy_toFixedSafe(fpy_accMul(fpy_accDiv(fpy_Minus(xmje, kce), '1.035'), sl));
            } else {
                items[i].se = fpy_toFixedSafe(fpy_accMul(fpy_Minus(xmje, kce), sl));
            }
        } else {
            if (sl * 1 === 0.015) {
                items[i].se = fpy_toFixedSafe(
                    fpy_accMul(
                        fpy_accDiv(fpy_Minus(items[i].xmjehs, kce), fpy_Add(1, 0.05)), sl)); //  税率 * 含税金额/(1 + 0.05)
            } else {
                items[i].se = fpy_toFixedSafe(
                    fpy_accMul(
                        fpy_accDiv(fpy_Minus(items[i].xmjehs, kce), fpy_Add(1, sl)), sl)); //  税率 * 含税金额/(1 + 税率)
            }
        }
        // 重新计算税额，需清除税额调整值
        items[i].adjustedData = '';
    }

    // 含税不含税反算（单价）   反算单价时时先反算金额
    function inverseCalcXMDJ(i) {
        const {xmsl, xmje, xmjehs} = items[i];
        if (hsbz === '0') {
            // 不含税，则反算出含税
            if (!xmjehs || !xmsl) return;
            items[i].xmdjhs = fpy_toFixedTwoOrMore(fpy_accDiv(xmjehs, xmsl)).substring(0, 16);
        } else {
            if (!xmje || !xmsl) return;
            items[i].xmdj = fpy_toFixedTwoOrMore(fpy_accDiv(xmje, xmsl)).substring(0, 16);
        }
    }

    // 含税不含税反算（金额）
    function inverseCalcXMJE(i) {
        const {xmje, xmjehs, se} = items[i];
        if (hsbz === '0') {
            // 不含税，则反算出含税
            if (!xmje || !se) return;
            items[i].xmjehs = fpy_toFixedSafe(fpy_Add(xmje, se));
        } else {
            if (!xmjehs || !se) return;
            items[i].xmje = fpy_toFixedSafe(fpy_Minus(xmjehs, se));
        }
    }

    // 反算
    function inverseCalc(i) {
        inverseCalcXMJE(i);
        inverseCalcXMDJ(i);
    }

    // 同步更新页面明细列表数据
    function updateDetailHtml(index) {
        index = Number(index);
        if (items[index].xmje.indexOf('e+') > -1 || items[index].xmje.split('.')[0].length > 12) {
            items[index].xmsl = '';
            items[index].xmdj = '';
            items[index].xmdjhs = '';
            items[index].xmje = '';
            items[index].xmjehs = '';
            items[index].se = '';
            model.invoke('tipNotify', 'The integer part of the amount cannot exceed 12 digits');
        }
        if (hsbz === '0') {
            syncShowData('xmdj', items[index].xmdj, index, pageId);
            syncShowData('xmje', items[index].xmje, index, pageId);
        } else {
            syncShowData('xmdj', items[index].xmdjhs, index, pageId);
            syncShowData('xmje', items[index].xmjehs, index, pageId);
        }
        syncShowData('xmsl', items[index].xmsl, index, pageId);
        syncShowData('sl', items[index].slText, index, pageId);
        syncShowData('se', items[index].se, index, pageId);
        syncShowData('xmmc', items[index].xmmc, index, pageId);
        syncShowData('ggxh', items[index].ggxh, index, pageId);
        syncShowData('xmdw', items[index].xmdw, index, pageId);
    }

    // 同步更新页面差额征税列表数据
    function updateDeductionsHtml(index) {
        index = Number(index);
        syncDeductionsData('pzlx', deducItems[index].evidencetype, index, pageId);
        syncDeductionsData('qdphm', deducItems[index].etaxinvoiceno, index, pageId);
        syncDeductionsData('fpdm', deducItems[index].deductioninvoicecode, index, pageId);
        syncDeductionsData('fphm', deducItems[index].deductioninvoiceno, index, pageId);
        syncDeductionsData('pzhm', deducItems[index].evidenceno, index, pageId);
        syncDeductionsData('kjrq', deducItems[index].invoicedate, index, pageId);
        syncDeductionsData('hjje', deducItems[index].evidenceamount, index, pageId);
        syncDeductionsData('kcje', deducItems[index].deductionamount, index, pageId);
        syncDeductionsData('bz', deducItems[index].deductionremark, index, pageId);
    }

    // dom控制 同步显示数据
    function syncDeductionsData(name, value, index) {
        if (name === 'pzlx') {
            $('#deductionstable' + pageId).find('.part').eq(index).find('.qdphm').find('input').prop('disabled', value === '01' || !value ? false : true);
            $('#deductionstable' + pageId).find('.part').eq(index).find('.fpdm').find('input').prop('disabled', value === '02' || value === '03' || value === '04' || !value ? false : true);
            $('#deductionstable' + pageId).find('.part').eq(index).find('.fphm').find('input').prop('disabled', value === '02' || value === '03' || value === '04' || !value ? false : true);
        }
        $('#deductionstable' + pageId).find('.part').eq(index).find('.' + [name]).find('input').val(value);
    }

    // dom控制 同步显示数据
    function syncShowData(name, value, index) {
        if (name === 'sl') {
            $('#detailtable' + pageId).find('.part').eq(index).find('.' + [name]).find('select').val(value);
        } else {
            $('#detailtable' + pageId).find('.part').eq(index).find('.' + [name]).find('input').val(value);
        }
    }

    // 同步更新页面货物运输列表数据
    function updateTransportHtml(index) {
        index = Number(index);
        syncTransportData('ysgjzl', freights[index].transporttype, index, pageId);
        syncTransportData('ysgjph', freights[index].licenseplate, index, pageId);
        syncTransportData('qyd', freights[index].startplace, index, pageId);
        syncTransportData('ddd', freights[index].endplace, index, pageId);
        syncTransportData('yshwmc', freights[index].transportgoods, index, pageId);
    }

    // 同步显示货物运输数据
    function syncTransportData(name, value, index) {
        $('#transporttable' + pageId).find('.part').eq(index).find('.' + [name]).find('input').val(value);
    }

    // 合计计算显示
    function calcTotal() {
        let amountAcc = '', taxAcc = '', amountTaxTotalUppercase = '', amountTaxTotalLowercase = '';
        items.forEach((item, index) => {
            let xmje = item.xmje;
            let se = item.se;
            if (item.xmje !== '') {
                amountAcc = fpy_Add(amountAcc, xmje);
                taxAcc = fpy_Add(taxAcc, se);
                amountTaxTotalLowercase = fpy_Add(item.xmjehs, amountTaxTotalLowercase) + '';
            }
        });
        if (amountAcc !== '') {
            amountTaxTotalUppercase = moneyToCapital(amountTaxTotalLowercase);
            amountTaxTotalLowercase = '￥' + fpy_toFixedSafe(amountTaxTotalLowercase);
            amountAcc = fpy_toFixedSafe(amountAcc);
            taxAcc = fpy_toFixedSafe(taxAcc);
        }
        $('#amountAcc' + pageId).html(amountAcc);
        $('#taxAcc' + pageId).html(taxAcc);
        $('#amountTaxTotalLowercase' + pageId).html(amountTaxTotalLowercase);
        $('#amountTaxTotalUppercase' + pageId).html(amountTaxTotalUppercase);
    }

    // 数字转文字
    function moneyToCapital(num) {
        if (isNaN(num)) return NaN;
        if (num == 0) return '零圆整';

        const isNegative = num < 0;

        num = Math.abs(num) + '00';
        const intPos = num.indexOf('.');
        if (intPos !== -1) num = num.substring(0, intPos) + num.substring(intPos + 1, intPos + 3);

        let strUnit = '仟佰拾兆仟佰拾亿仟佰拾万仟佰拾圆角分';
        strUnit = strUnit.substring(strUnit.length - num.length);

        const UppercaseChineseNumbers = '零壹贰叁肆伍陆柒捌玖';
        let strOutput = '';
        for (let i = 0; i < num.length; i++) {
            strOutput += UppercaseChineseNumbers[num.substring(i, i + 1)] + strUnit.substring(i, i + 1);
        }
        let result = strOutput
            .replace(/零[仟佰拾角分]/g, '零')
            .replace(/零{2,}/g, '零')
            .replace(/零([兆|亿|万])/g, '$1')
            .replace(/亿万/, '亿')
            .replace(/零圆/, '圆')
            .replace(/^圆/, '')
            .replace(/^零|零$/g, '');
        if (!/分$/.test(result)) result += '整';
        if (isNegative) result = '(负数)' + result;
        return result;
    };
};