var FPY_partiallyOpenFun = function (KDApi, $, _) {
    const INVOICE_TYPES = [
        { key: '026', value: '电子普通发票' },
        { key: '028', value: '电子专用发票' },
        { key: '007', value: '纸质普通发票' },
        { key: '004', value: '纸质专用发票' },
        { key: '025', value: '普通纸质卷票' },
        { key: '08xdp', value: '数电票（增值税专用发票）' },
        { key: '10xdp', value: '数电票（普通发票）' }
    ];
    const INVOICE_TYPES_DICT = {};
    for (let i = 0; i < INVOICE_TYPES.length; i++) {
        const curData = INVOICE_TYPES[i];
        INVOICE_TYPES_DICT['k' + curData.key] = curData.value;
    }
    const ISSUE_STATUS = [
        { key: '0', value: '已开票' },
        { key: '1', value: '开票中' },
        { key: '2', value: '未开票' },
        { key: '3', value: '开票失败' },
        { key: '4', value: '已提交' },
        { key: '-9999', value: '已保存' }
    ];
    const ISSUE_STATUS_DICT = {};
    for (let i = 0; i < ISSUE_STATUS.length; i++) {
        const curData = ISSUE_STATUS[i];
        ISSUE_STATUS_DICT['k' + curData.key] = curData.value;
    }

    let curIndex = '0'; // 当前内容显示下标 0, 1, 2, 3
    let model;
    let billNoMap; // 单据编号关系
    let taxequipment = 0.06; // 盘类型：0.06代表金税盘，0.01代表其他盘

    // 全局对象
    const fpyTable = fpy_table();
    let confirmLoading = false; // 确认弹窗loading
    let inputFocusValue; // 输入框聚焦时的初始值

    // 开票申请单-数据
    const billParam = {
        billNo: '',
        buyerName: '',
        deviceNo: '',
        currentAccount: '',
        terminalNo: '',
        billMerger: false,
        itemMerger: false,
        creditQuota: 0
    };
    const rowKey = 'id'; // 开票申请单-单据rowkey
    let deviceNoList = []; // 开票申请单-设备编号
    let accountMap = null; // 开票申请单-电子税局账号
    let terminalNoList = []; // 开票申请单-终端号
    let limitAmounts = {}; // 开票申请单-拆分限额
    let billList = []; // 开票申请单-单据列表

    // 单据明细处理-数据
    let treatmentSplitRule = []; // 明细处理-所有拆分方案-数组
    const treatmentSplitRuleDict = {}; // 明细处理-所有拆分方案-对象
    let treatmentShowBillList = []; // 明细处理-显示的单据列表
    const treatmentId = fpy_getUUId(); // 明细处理-id
    let treatmentInvoiceList = {}; // 明细处理-发票对象 以单据id为key值
    let treatmentInvoiceRelationMap = {}; // 明细处理-发票关系对象 以单据id为key值
    let treatmentRemainingItemsHasInit = false; // 明细处理-按明细处理是否初始化
    let treatmentRemainingItems = {}; // 明细处理-按明细处理剩余明细对象 以单据id为key值
    let treatmentIsEdit = false; // 明细处理-是否编辑
    let treatmentHadEdit = false; //  明细处理-是否已编辑 增行 删行 增折扣行
    const treatmentTaxRateArr = [
        { value: '0.17', text: '17%' },
        { value: '0.16', text: '16%' },
        { value: '0.13', text: '13%' },
        { value: '0.11', text: '11%' },
        { value: '0.1', text: '10%' },
        { value: '0.09', text: '9%' },
        { value: '0.06', text: '6%' },
        { value: '0.05', text: '5%' },
        { value: '0.04', text: '4%' },
        { value: '0.03', text: '3%' },
        { value: '0.02', text: '2%' },
        { value: '0.01', text: '1%' },
        { value: '0.015', text: '1.5%' },
        // { value: '0.00Z0', text: '0%(出口退税)' }, // lslbs: '1'
        { value: '0.00Z1', text: '0%(免税)' }, // lslbs: '1'
        { value: '0.00Z2', text: '0%(不征税)' }, // lslbs: '2'
        { value: '0.00Z3', text: '0%(普通零税率)' } // lslbs: '3'
    ]; // 明细处理-税率下拉框
    const treatmentInvoiceField = [
        'buyername',
        'buyeraddr',
        'buyerbank',
        'applyreason',
        'buyertaxno',
        'buyerphone',
        'infocode',
        'originalinvoicecode',
        'originalinvoiceno',
        'buyeremail',
        'inventorymark'
    ]; // 明细处理-发票input输入过滤
    let treatmentEditItems; // 明细处理-可编辑的明细
    let treatmentEditIndex = ''; // 明细处理-可编辑的明细下标

    // 发票预览-数据
    let previewInvoiceIndex = 0; // 发票预览-发票当前下标
    let previewInvoiceList = []; // 发票预览-发票预览数组

    // 开票结果-数据
    let resultTimer; // 开票结果-计时器
    let resultTotal = 0; // 开票结果-发票总张数
    let resultList = []; // 开票结果-开票结果列表
    let resultCreditQuota = 0; // 开票结果-可用授信额度
    let resultIsComplete = false; // 开票结果-是否开票完成
    let resultOpenType = 'normal'; // 开票结果-开票类型

    //发票预览页是否保存数据标记
    let previewDataSave = false;
    let infocodechoose = '';
    let invoiceid = '';

    // JQ对象缓存
    const $workbench = $('#imc_partiallyOpen');

    // 头部
    const $head = $workbench.find('.head');
    const $head_item = $head.find('.item');
    const $head_bill_value = $head.find('.bill').find('.value');
    const $head_treatment_value = $head.find('.treatment').find('.value');
    const $head_preview_value = $head.find('.preview').find('.value');
    const $head_result_value = $head.find('.result').find('.value');

    const $content = $workbench.find('.content');
    // 开票申请单
    const $bill = $workbench.find('.bill');
    const $bill_table = $bill.find('.bill-table');
    const $bill_footer_span = $bill.find('.footer').find('span');
    // 单据明细处理
    const $treatment = $workbench.find('.treatment');
    const $treatment_selectAll = $workbench.find('#selectAll');
    const $treatment_bill = $treatment.find('.bill-detail');
    const $treatment_edit = $treatment.find('.bill-edit');
    const $treatment_invoice = $treatment.find('.invoice-detail');
    // 发票预览
    const $preview = $workbench.find('.preview');
    const $preview_bill = $preview.find('.bill-list');
    const $preview_prev = $preview.find('.invoice-box').find('.prev');
    const $preview_next = $preview.find('.invoice-box').find('.next');
    const $preview_invoice = $preview.find('.invoice');
    const $preview_invoiceType = $preview.find('.invoiceType');
    const $preview_buyer = $preview_invoice.find('.buyer');
    const $preview_saler = $preview_invoice.find('.saler');
    const $preview_top_other = $preview_invoice.find('.top').find('.other').find('.value');
    const $preview_top_buyer = $preview_invoice.find('.top').find('.buyer');
    const $preview_top_saler = $preview_invoice.find('.top').find('.saler');
    const $preview_bottom_buyer = $preview_invoice.find('.bottom').find('.buyer');
    const $preview_bottom_saler = $preview_invoice.find('.bottom').find('.saler');
    const $preview_jshjje = $preview_invoice.find('.jshjje');
    const $preview_bz = $preview_invoice.find('.bz');
    const $preview_item = $preview_invoice.find('.label').find('.item');
    const $preview_detail = $preview_invoice.find('.detail');
    const $preview_operator = $preview_invoice.find('.operator').find('.value');
    // 开票结果
    const $result = $workbench.find('.result');
    const $result_progress = $result.find('.progress');
    const $result_progress_percent = $result_progress.find('.percent');
    const $result_progress_text = $result_progress.find('.text');
    const $result_fail = $result.find('.fail');
    const $result_success = $result.find('.success');
    const $result_detail = $result.find('.detail');
    const $result_print = $result.find('.footer').find('.print');
    const $result_reopen = $result.find('.footer').find('.reopen');

    // 数据加载
    function setInitData(props) {
        // 设置主题颜色
        const themeColor = $workbench.find('.theme-fc').css('color');
        document.getElementById('imc_partiallyOpen').style.setProperty('--theme', themeColor);

        // 防止内容闪现
        $content.show();

        curIndex = props.currentDisplay || 0;
        taxequipment = props.taxequipment || 0.06;

        billParam.billMerger = props.isMergeBill || false;
        billParam.itemMerger = props.isMergeDetail || false;
        billParam.deviceNo = props.currentJqbh || '';
        billParam.currentAccount = props.currentAccount || '';
        billParam.terminalNo = props.terminalNo || '';
        billParam.creditQuota = props.creditQuota || 0;

        deviceNoList = props.jqbhs || [];
        accountMap = props.accountMap || null;
        terminalNoList = props.terminalNos || [];
        billList = props.bills || [];
        treatmentSplitRule = props.splitrule || [];
        billNoMap = props.billNoMap || {};

        for (let i = 0; i < treatmentSplitRule.length; i++) {
            const curData = treatmentSplitRule[i];
            treatmentSplitRuleDict['k' + curData.ruleCode] = curData.ruleName;
        }
        if (props.mergeBill) {
            treatmentShowBillList = formatTreatmentBill(props.mergeBill.bills || []);
        }
        if (props.invoiceList) {
            treatmentInvoiceList = props.invoiceList || [];
            treatmentInvoiceRelationMap = props.invoiceRelationMap || {};
        }
        if (props.limitAmounts) {
            limitAmounts = props.limitAmounts;
        }

        // 设置header
        setHeaderInfo();

        if (curIndex === 1) {
            updateBillHeader();
        }

        if (curIndex === 2) {
            updateBillHeader();
            updateTreatmentHeader();
        }
        setCurrentDisplay(curIndex);
    }

    // 设置header
    function setHeaderInfo() {
        const result = billList.find(o => o.invoicetype === '08xdp' || o.invoicetype === '10xdp');
        if (result) {
            // 数电
            $head.find('.bill').find('.info').find('.text').eq(2).show().next().show();
            $head.find('.result').find('.info').find('.text').eq(2).show();
            $head_bill_value.eq(3).text(`${billParam.creditQuota || '- -'}元`);
        } else {
            // 非数电
            $head.find('.bill').find('.info').find('.text').eq(0).show().next().show();
            $head.find('.result').find('.info').find('.text').eq(0).show();
        }
    }

    // 设置当前显示内容
    function setCurrentDisplay(index) {
        curIndex = index;
        $head_item.removeClass('actived hack').eq(index).addClass('hack');
        for (let i = 0; i <= index; i++) {
            $head_item.eq(i).addClass('actived');
        }
        $content.find('.content-item').hide().eq(index).show();
        // 头部
        switch (index) {
        case 0:
            showBill();
            break;
        case 1:
            treatmentIndex = 0;
            showTreatment();
            break;
        case 2:
            previewIndex = 0;
            previewInvoiceIndex = 0;
            showPreview();
            break;
        case 3:
            showResult();
            break;
        default:
            break;
        }
    }

    // 开票申请单
    function showBill() {
        showBillTable();
        showBillParam();
        updateBillHeader();
    }

    // 开票申请单-列表 筛选显示
    function showBillTable() {
        let tableData = billList;
        if (billParam.billNo) {
            tableData = tableData.filter(o => o.billno.includes(billParam.billNo));
        }
        if (billParam.buyerName) {
            tableData = tableData.filter(o => o.buyername.includes(billParam.buyerName));
        }
        fpyTable.init({
            id: 'imc_invoiceWorkbench_bill_table',
            rowKey,
            columns: [
                {
                    title: '序号',
                    width: 40,
                    render: () => '<span class="order"><span>'
                },
                {
                    align: 'left',
                    title: '单据编号',
                    dataIndex: 'billno',
                    ellipsis: true,
                    width: 200,
                    render: (t, r) => `<a href='javascript:;' data-name="detail" data-key=${r.id}>${t}</a>`
                },
                {
                    align: 'left',
                    title: '购方名称',
                    dataIndex: 'buyername',
                    ellipsis: true,
                    width: 200
                },
                {
                    title: '单据日期',
                    dataIndex: 'billdate',
                    width: 138
                },
                {
                    title: '发票种类',
                    dataIndex: 'invoicetype',
                    width: 100,
                    render: t => INVOICE_TYPES_DICT['k' + t] || t
                },
                {
                    title: '单据性质',
                    dataIndex: 'billproperties',
                    render: t => t === '-1' ? '负数' : '正数',
                    width: 80
                },
                {
                    title: '单据金额（元）',
                    dataIndex: 'totalamount',
                    width: 165,
                    render: t => Number(t).toFixed(2)
                },
                {
                    title: '可开票金额（元）',
                    dataIndex: 'surplusamount',
                    width: 177,
                    render: (t, r) => r.hsbz === '1' ? fpy_Add(t, r.surplustax).toFixed(2) : Number(t).toFixed(2)
                },
                {
                    title: '操作',
                    dataIndex: 'id',
                    width: 40,
                    render: (t, r, i) => `<a href='javascript:;' data-name="del" data-key=${i}>移除</a>`
                }
            ],
            scroll: tableData.length > 12 ? { y: 400 } : {},
            dataSource: tableData
        });
    }

    // 开票申请单-参数
    function showBillParam() {
        $bill.find('.billMerger').attr('checked', billParam.billMerger);
        $bill.find('.itemMerger').attr('checked', billParam.itemMerger);
        let invoiceType = billList[0]["invoicetype"];

        // 数电不展示设备编号
        if (!(invoiceType === '08xdp' || invoiceType === '10xdp')) {
            showBillDeviceNo()
        } else {
            accountMap && showAccountList()
        }
    }

    // 开票申请单-设备编号
    function showBillDeviceNo() {
        const deviceNos = [];
        for (const o in deviceNoList) {
            deviceNos.push({
                key: deviceNoList[o],
                value: o
            });
        }
        const _html = [`<option value="" disabled>请选择设备编号</option>`];
        for (let i = 0; i < deviceNos.length; i++) {
            _html.push(`<option value="${deviceNos[i].key}" title="${deviceNos[i].value}">${deviceNos[i].value}</option>`);
        }
        $bill.find('.deviceNo-visible').show().find('.deviceNo').html(_html.join('')).val(billParam.deviceNo);
        showBillTerminalNo();
    }

    // 开票申请单-电子税局账号
    function showAccountList() {
        const accountList = [];
        for (const o in accountMap) {
            accountList.push({
                key: o,
                value: o
            });
        }
        const _html = [`<option value="" disabled>请选择电子税局账号</option>`];
        for (let i = 0; i < accountList.length; i++) {
            _html.push(`<option value="${accountList[i].key}" title="${accountList[i].value}">${accountList[i].value}</option>`);
        }
        $bill.find('.account-visible').show().find('.account').html(_html.join('')).val(billParam.currentAccount);
    }

    // 开票申请单-终端号
    function showBillTerminalNo() {
        if (terminalNoList.length) {
            const _html = [];
            for (let i = 0; i < terminalNoList.length; i++) {
                _html.push(`<option value="${terminalNoList[i]}" title="${terminalNoList[i]}">${terminalNoList[i]}</option>`);
            }
            $bill.find('.terminalNo-visible').show().find('.terminalNo').html(_html.join('')).val(billParam.terminalNo);
        } else {
            $bill.find('.terminalNo-visible').hide().find('.terminalNo').empty();
        }
    }

    // 开票申请单-更新头部
    function updateBillHeader() {
        const _data = billList.reduce((all, b) => [fpy_Add(all[0], b.totalamount), fpy_Add(all[1], b.surplusamount)], [0, 0]);
        $head_bill_value.eq(0).text(billList.length + '个');
        $head_bill_value.eq(1).text(fpy_addThousands(_data[0].toFixed(2)) + '元');
        $head_bill_value.eq(2).text(fpy_addThousands(_data[1].toFixed(2)) + '元');
        $bill_footer_span.eq(0).text(billList.length + '个');
        $bill_footer_span.eq(1).text(fpy_addThousands(_data[0].toFixed(2)) + '元');
    }

    // 单据明细处理
    function showTreatment() {
        showTreatmentParam();
        initTreatmentRemainingItems();
        showTreatmentBill();
        showTreatmentInvoice();
        updateTreatmentHeader();
    }

    // 单据明细处理-参数
    function showTreatmentParam() {
        let invoiceType = treatmentShowBillList[0]["invoicetype"];
        // 数电不展示设备编号
        if (!(invoiceType === '08xdp' || invoiceType === '10xdp')) {
            showTreatmentDeviceNo()
        } else {
            accountMap && showTreatmentAccount()
        }
    }

    // 单据明细处理-设备编号
    function showTreatmentDeviceNo() {
        const deviceNos = [];
        for (const o in deviceNoList) {
            deviceNos.push({
                key: deviceNoList[o],
                value: o
            });
        }
        const _html = [`<option value="" disabled>请选择设备编号</option>`];
        for (let i = 0; i < deviceNos.length; i++) {
            _html.push(`<option value="${deviceNos[i].key}" title="${deviceNos[i].value}">${deviceNos[i].value}</option>`);
        }
        $treatment.find('.deviceNo-visible').show().find('.deviceNo').html(_html.join('')).val(billParam.deviceNo);
        showTreatmentTerminalNo();
    }

    // 单据明细处理-电子税局账号
    function showTreatmentAccount() {
        const accountList = [];
        for (const o in accountMap) {
            accountList.push({
                key: o,
                value: o
            });
        }
        const _html = [`<option value="" disabled>请选择电子税局账号</option>`];
        for (let i = 0; i < accountList.length; i++) {
            _html.push(`<option value="${accountList[i].key}" title="${accountList[i].value}">${accountList[i].value}</option>`);
        }
        $treatment.find('.account-visible').show().find('.account').html(_html.join('')).val(billParam.currentAccount);
    }

    // 单据明细处理-终端号
    function showTreatmentTerminalNo() {
        if (terminalNoList.length) {
            const _html = [];
            for (let i = 0; i < terminalNoList.length; i++) {
                _html.push(`<option value="${terminalNoList[i]}" title="${terminalNoList[i]}">${terminalNoList[i]}</option>`);
            }
            $treatment.find('.terminalNo-visible').show().find('.terminalNo').html(_html.join('')).val(billParam.terminalNo);
        } else {
            $treatment.find('.terminalNo-visible').hide().find('.terminalNo').empty();
        }
    }

    // 单据明细处理-单据
    function showTreatmentBill() {
        const _html = [];
        if (treatmentIsEdit) {
            let allinvoiceamount = 0;
            let alltotaltax = 0;
            let alltotalamount = 0;
            _html.push('<div class="list">');
            for (let i = 0; i < treatmentShowBillList.length; i++) {
                const obj = treatmentShowBillList[i];
                _html.push(`<div class="item">
                    <div class="text truncateText">单据编号：<span class="primary" title="${obj.billno}">${obj.billno}</span></div>
                    <div class="text">不含税金额：<span class="warning">${Number(obj.invoiceamount).toFixed(2)}</span></div>
                    <div class="text">税额：<span class="warning">${Number(obj.totaltax).toFixed(2)}</span></div>
                    <div class="text">价税合计：<span class="warning">${Number(obj.totalamount).toFixed(2)}</span></div>
                </div>`);
                allinvoiceamount = fpy_Add(allinvoiceamount, obj.invoiceamount);
                alltotaltax = fpy_Add(alltotaltax, obj.totaltax);
                alltotalamount = fpy_Add(alltotalamount, obj.totalamount);
            }
            _html.push(`</div><div class="total">
                <div class='item jshj'>
                    <span class='icon'></span>不含税金额：<span class='warning'>${allinvoiceamount.toFixed(2)}</span>
                </div>
                <div class='item se'>
                    <span class='icon'></span>税额合计：<span class='warning'>${alltotaltax.toFixed(2)}</span>
                </div>
                <div class='item jshj'>
                    <span class='icon'></span>价税合计：<span class='warning'>${alltotalamount.toFixed(2)}</span>
                </div>
            </div>`);
            $treatment_bill.hide();
            $treatment_edit.html(_html.join('')).css({ display: 'flex' });
        } else {
            for (let i = 0; i < treatmentShowBillList.length; i++) {
                const obj = treatmentShowBillList[i];
                _html.push(`<div class="item">
                    <div class="title">
                        <div class="name truncateText" title="${obj.billno}">单据编号：${obj.billno}</div>
                    </div>
                    <div id="imc_invoiceWorkbench_treatment_bill${obj.id}"></div>
                </div>`);
            }
            $treatment_edit.hide();
            $treatment_bill.html(_html.join('')).show();
        }
        for (let i = 0; i < treatmentShowBillList.length; i++) {
            updateTreatmentBillTableByIndex(i);
        }
    }

    // 单据明细处理-更新单据table
    function updateTreatmentBillTableByIndex(treatmentIndex, setScrollTop = false) {
        const { id } = treatmentShowBillList[treatmentIndex];
        const _dataSource = treatmentRemainingItems[id].items;
        const _selectedRowKeys = treatmentRemainingItems[id].selectedRowKeys;
        const _disabled = o => o.rowtype === '1';
        const totalData = treatmentBillTotalGet(_dataSource);

        let scrollTop;
        let tableDom;
        if (setScrollTop) {
            tableDom = $(`#imc_invoiceWorkbench_treatment_bill${id}`);
            scrollTop = tableDom.find('.workbench-scroll').scrollTop();
        }
        fpyTable.init({
            id: `imc_invoiceWorkbench_treatment_bill${id}`,
            rowKey,
            columns: [
                {
                    align: 'left',
                    title: '开票项目',
                    dataIndex: 'goodsname',
                    ellipsis: true,
                    width: 100,
                    showTotal: true
                },
                {
                    align: 'left',
                    title: '可申请数量',
                    dataIndex: 'remainvalidnum',
                    ellipsis: true,
                    width: 90,
                    render: (t, r) => r.taxunitprice != 0 ? fpy_toFixedNoZero(t) : '',
                    showTotal: true
                },
                {
                    align: 'left',
                    title: '可申请金额(含税)',
                    dataIndex: 'remainvalidamount',
                    ellipsis: true,
                    width: 110,
                    render: t => Number(t).toFixed(2),
                    showTotal: true
                }
            ],
            scroll: _dataSource.length > 5 ? { y: 130 } : {},
            dataSource: _dataSource,
            selectedRowKeys: _selectedRowKeys,
            disabled: _disabled,
            headerColor: '#666',
            headerBgColor: '#ebeef3',
            rowHeight: 26,
            showTotal: totalData
        });
        // 设置滚动高度
        if (setScrollTop) tableDom.find('.workbench-scroll').scrollTop(scrollTop);
    }

    // 获取合计
    function treatmentBillTotalGet(dataSource) {
        const allNoPrice = dataSource.every(o => o.taxunitprice == 0);
        let totalData = dataSource.reduce((all, b) => {
            return [
                all[0] + Number(b.remainvalidnum),
                all[1] + Number(b.remainvalidamount)
            ];
        }, [0, 0]);
        return totalData = {
            goodsname: '合计',
            remainvalidnum: allNoPrice ? '' : fpy_toFixedNoZero(totalData[0], 8),
            remainvalidamount: totalData[1].toFixed(2)
        };
    }

    // 单据明细处理-格式化单据
    function formatTreatmentBill(data) {
        return data.map(o => {
            return {
                ...o,
                hadBuyername: !!o.buyername,
                hadBuyertaxno: !!o.buyertaxno,
                hadHzxxbm: !!o.infocode,
                hadBlueInvoice: !!o.blueinvoicecode
            };
        });
    }

    // 单据明细处理-发票
    function showTreatmentInvoice() {
        // 发票  兼容后端调用
        const { id } = treatmentInvoiceList[treatmentId][0];
        if (id) {
            const _html = `
                <div class="item">
                    <div class="info" data-all="1">
                        ${getTreatmentInvoiceInfoHtmlByIndex()}
                    </div>
                    <div id="imc_invoiceWorkbench_treatment_invoice${id}"></div>
                    <div class="total">
                        ${getTreatmentInvoiceTotalHtmlByIndex()}
                    </div>
                </div>
            `;
            $treatment_invoice.html(_html);
            if (treatmentIsEdit) {
                showTreatmentInvoiceDetailEdit();
            } else {
                showTreatmentInvoiceDetailNoEdit();
            }
        } else {
            emptyTreatmentInvoice();
        }
    }

    // 单据明细处理-获取发票信息的html
    function getTreatmentInvoiceInfoHtmlByIndex() {
        const {
            invoicetype,
            specialtype,
            buyername,
            buyertaxno,
            buyeraddr,
            buyerbank,
            buyeremail,
            buyerphone,
            remark,
            inventorymark
        } = treatmentInvoiceList[treatmentId][0];
        const _html = `
            <div class="text">
                <div class="name">发票类型</div>
                <div class="value">
                    <div class="invoiceType" data-key="${invoicetype}">${INVOICE_TYPES_DICT['k' + invoicetype] || invoicetype}</div>
                </div>
            </div>
            <div class="text">
                <div class="name requiredFields">购方名称</div>
                <div class="value search">
                    <input class="searchInput pressEnter" type="text" name="buyername" maxlength="100" value="${buyername}">
                    <div data-name="buyername" class="search-btn"></div>
                </div>
            </div>
            <div class="text">
                <div class="name ${invoicetype === '028' || invoicetype === '004' ? 'requiredFields' : ''}">纳税人识别号</div>
                <div class="value">
                    <input class="searchInput" type="text" name="buyertaxno" maxlength="20" value="${buyertaxno}">
                </div>
            </div>
            <div class="text">
                <div class="name ${invoicetype === '028' || invoicetype === '004' ? 'requiredFields' : ''}">地址及电话</div>
                <div class="value">
                    <input class="searchInput" type="text" name="buyeraddr" maxlength="100" value="${buyeraddr}">
                </div>
            </div>
            <div class="text">
                <div class="name ${invoicetype === '028' || invoicetype === '004' ? 'requiredFields' : ''}">开户行及账号</div>
                <div class="value">
                    <input class="searchInput" type="text" name="buyerbank" maxlength="100" value="${buyerbank}">
                </div>
            </div>
            <div class="text">
                <div class="name">收票邮箱</div>
                <div class="value">
                    <input class="searchInput" type="text" name="buyeremail" maxlength="100" value="${buyeremail}">
                </div>
            </div>
            <div class="text">
                <div class="name">收票手机号</div>
                <div class="value">
                    <input class="searchInput" type="text" name="buyerphone" maxlength="11" value="${buyerphone}">
                </div>
            </div>
            <div class="text">
                <div class="name">备注</div>
                <div class="value">
                    <textarea name="remark" maxlength="450">${remark}</textarea>
                </div>
            </div>
            <div class="text operate">
                ${treatmentIsEdit || specialtype === '18' ? '' : '<div class="box"><a class="edit" href="javascript:;">编辑</a></div>'}
                <div class="box">
                    <div class="set-item">
                        <label for="treatmentbillMerger" class="set-name">明细合并</label>
                        <div class="switch">
                            <input id="treatmentbillMerger" type="checkbox" name="billMerger" ${billParam.billMerger ? 'checked' : ''}>
                            <div class="label"></div>
                        </div>
                    </div>
                    <div class="set-item">
                        <label for="treatmentinventorymark" class="set-name">强制清单</label>
                        <div class="switch">
                            <input id="treatmentinventorymark" type="checkbox" name="inventorymark" ${inventorymark === '1' ? 'checked' : ''}>
                            <div class="label"></div>
                        </div>
                    </div>
                </div>
                ${treatmentIsEdit ? '<div class="box"><a class="btn addLine" href="javascript:;">增行</a>|<a class="btn addDiscountLine" href="javascript:;">增加折扣行</a>|<a class="btn deleteLine" href="javascript:;">删行</a></div>' : ''}
            </div>
        `;
        return _html;
    }

    // 单据明细处理-获取发票合计的html
    function getTreatmentInvoiceTotalHtmlByIndex() {
        const {
            invoiceamount,
            totaltax,
            totalamount
        } = treatmentInvoiceList[treatmentId][0];
        const _html = `
            <span class="total-item">不含税金额合计：<span class="warning invoiceamount">${Number(invoiceamount).toFixed(2)}</span>元</span>
            <span class="total-item">税额合计：<span class="warning totaltax">${Number(totaltax).toFixed(2)}</span>元</span>
            <span class="total-item">价税合计：<span class="warning totalamount">${Number(totalamount).toFixed(2)}</span>元</span>
        `;
        return _html;
    }

    // 单据明细处理-计算发票合计
    function calculateTreatmentInvoiceTotalByIndex() {
        const invoice = treatmentInvoiceList[treatmentId][0];
        const { items } = invoice;

        let invoice_hjbhsje = '';
        let invoice_kphjse = '';
        let invoice_jshjje = '';
        for (let i = 0; i < items.length; i++) {
            invoice_hjbhsje = fpy_Add(invoice_hjbhsje, items[i].amount);
            invoice_kphjse = fpy_Add(invoice_kphjse, items[i].tax);
            invoice_jshjje = fpy_Add(invoice_jshjje, items[i].taxamount);
        }
        invoice_hjbhsje = invoice_hjbhsje.toFixed(2);
        invoice_kphjse = invoice_kphjse.toFixed(2);
        invoice_jshjje = invoice_jshjje.toFixed(2);
        invoice.invoiceamount = invoice_hjbhsje;
        invoice.totaltax = invoice_kphjse;
        invoice.totalamount = invoice_jshjje;

        return invoice_hjbhsje;
    }

    // 单据明细处理-更新发票合计
    function updateTreatmentInvoiceTotalByIndex() {
        const { invoiceamount, totaltax, totalamount } = treatmentInvoiceList[treatmentId][0];

        const totalDom = $treatment_invoice.find('.item').find('.total');
        totalDom.find('.invoiceamount').text(invoiceamount);
        totalDom.find('.totaltax').text(totaltax);
        totalDom.find('.totalamount').text(totalamount);
    }

    // 单据明细处理-发票清空
    function emptyTreatmentInvoice() {
        $treatment_invoice.empty();
    }

    // 单据明细处理-发票明细 编辑初始化
    function initTreatmentEditItems() {
        // 发票  兼容后端调用
        const { items } = treatmentInvoiceList[treatmentId][0];
        treatmentEditItems = items.map(o => {
            return {
                ...o,
                num: o.num || '',
                unitprice: (o.unitprice && fpy_toFixedTwoOrMore(o.unitprice)) || '',
                taxunitprice: (o.taxunitprice && fpy_toFixedTwoOrMore(o.taxunitprice)) || '',
                amount: (o.amount && Number(o.amount).toFixed(2)) || '',
                taxamount: (o.taxamount && Number(o.taxamount).toFixed(2)) || '',
                tax: (o.tax && Number(o.tax).toFixed(2)) || '',
            }
        });
    }

    // 单据明细处理-发票明细 编辑
    function showTreatmentInvoiceDetailEdit(bol) {
        // 发票  兼容后端调用
        const { id, hsbz, items } = treatmentInvoiceList[treatmentId][0];
        fpyTable.init({
            id: `imc_invoiceWorkbench_treatment_invoice${id}`,
            rowKey,
            columns: [
                {
                    title: '序号',
                    width: 40,
                    render: () => '<span class="order"><span>'
                },
                {
                    title: '开票项目',
                    dataIndex: 'goodsname',
                    width: 100,
                    render: (t, r, i) => {
                        // 百分百折扣行无法编辑
                        const isDisabled =  items[i + 1]?.rowtype === '1' && items[i]?.taxamount + items[i + 1]?.taxamount === 0
                        return (
                            `<div class='search'>
                                <input class="searchInput pressEnter" maxlength="90" name="goodsname" value="${t}" title="${t}" ${r.rowtype !== '0' || isDisabled ? 'disabled' : ''}>
                                <div data-name="goodsname" class="search-btn ${r.rowtype !== '0' || isDisabled ? 'disabled' : ''}"></div>
                            </div>`
                        );
                    }
                },
                {
                    title: '规格',
                    dataIndex: 'specification',
                    width: 80,
                    render: (t, r, i) => {
                        // 百分百折扣行无法编辑
                        const isDisabled =  items[i + 1]?.rowtype === '1' && items[i]?.taxamount + items[i + 1]?.taxamount === 0
                        return `<input class="searchInput" maxlength="40" name="specification" value="${t}" title="${t}" ${r.rowtype === '1' || isDisabled ? 'disabled' : ''}>`;
                    }
                },
                {
                    title: '单位',
                    dataIndex: 'unit',
                    width: 80,
                    render: (t, r, i) => {
                        // 百分百折扣行无法编辑
                        const isDisabled =  items[i + 1]?.rowtype === '1' && items[i]?.taxamount + items[i + 1]?.taxamount === 0
                        return `<input class="searchInput" maxlength="20" name="unit" value="${t}" title="${t}" ${r.rowtype === '1' || isDisabled ? 'disabled' : ''}>`;
                    }
                },
                {
                    title: '数量',
                    dataIndex: 'num',
                    width: 80,
                    render: (t, r, i) => {
                        // 百分百折扣行无法编辑
                        const isDisabled =  items[i + 1]?.rowtype === '1' && items[i]?.taxamount + items[i + 1]?.taxamount === 0
                        return `<input class="searchInput" name="num" value="${t}" title="${t}" ${r.rowtype === '1' || isDisabled ? 'disabled' : ''}>`;
                    }
                },
                {
                    title: `单价(${hsbz === '1' ? '' : '不'}含税)`,
                    dataIndex: hsbz === '1' ? 'taxunitprice' : 'unitprice',
                    width: 80,
                    render: (t, r, i) => {
                        // 百分百折扣行无法编辑
                        const isDisabled =  items[i + 1]?.rowtype === '1' && items[i]?.taxamount + items[i + 1]?.taxamount === 0
                        return `<input class="searchInput" name="${hsbz === '1' ? 'taxunitprice' : 'unitprice'}" value="${t}" title="${t}" ${r.rowtype === '1' || isDisabled ? 'disabled' : ''}>`;
                    }
                },
                {
                    title: '税率',
                    dataIndex: 'taxrate',
                    width: 70,
                    render: (t, r, i) => {
                        // 百分百折扣行无法编辑
                        const isDisabled =  items[i + 1]?.rowtype === '1' && items[i]?.taxamount + items[i + 1]?.taxamount === 0
                        const slText = r.zzstsgl === '免税' ? '0.00Z1' : r.zzstsgl === '不征税' ? '0.00Z2' : t == 0 ? '0.00Z3' : t;
                        let _html = `<select class="searchInput" name='taxrate' ${r.rowtype === '1' || isDisabled ? 'disabled' : ''}>`;
                        for (const o of treatmentTaxRateArr) {
                            _html += `<option value='${o.value}' ${o.value === slText ? 'selected' : ''}>${o.text}</option>`;
                        }
                        _html += '</select>';
                        return _html;
                    }
                },
                {
                    title: `金额(${hsbz === '1' ? '' : '不'}含税)`,
                    dataIndex: hsbz === '1' ? 'taxamount' : 'amount',
                    width: 100,
                    render: (t, r, i) => {
                        // 百分百折扣行无法编辑
                        const isDisabled =  items[i + 1]?.rowtype === '1' && items[i]?.taxamount + items[i + 1]?.taxamount === 0
                        return `<input class="searchInput" name="${hsbz === '1' ? 'taxamount' : 'amount'}" ${(!treatmentIsEdit && r.rowtype === '1') || isDisabled ? 'disabled' : ''} value="${t}" title="${t}">`;
                    }
                },
                {
                    title: '税额',
                    dataIndex: 'tax',
                    width: 60,
                    render: (t, r, i) => {
                        // 百分百折扣行无法编辑
                        const isDisabled =  items[i + 1]?.rowtype === '1' && items[i]?.taxamount + items[i + 1]?.taxamount === 0
                        return `<input class="searchInput" name="tax" value="${t}" ${r.rowtype === '1' || isDisabled ? 'disabled' : ''} title="${t}">`;
                    }
                }
            ],
            scroll: treatmentEditItems.length > 4 ? { y: 104 } : {},
            dataSource: treatmentEditItems,
            headerColor: '#666',
            headerBgColor: '#eee',
            rowHeight: 26
        });
        if (bol) {
            const dom = $treatment_invoice.find('.workbench-scroll');
            dom.scrollTop(dom.find('table').height());
        }
    }

    // 单据明细处理-发票明细 不编辑
    function showTreatmentInvoiceDetailNoEdit(setScrollTop = false) {
        // 发票  兼容后端调用
        const { id, specialtype, hsbz, items } = treatmentInvoiceList[treatmentId][0];
        let scrollTop;
        let tableDom;
        if (setScrollTop) {
            tableDom = $(`#imc_invoiceWorkbench_treatment_invoice${id}`);
            scrollTop = tableDom.find('.workbench-scroll').scrollTop();
        }
        fpyTable.init({
            id: `imc_invoiceWorkbench_treatment_invoice${id}`,
            rowKey,
            columns: [
                {
                    title: '序号',
                    width: 40,
                    render: () => '<span class="order"><span>'
                },
                {
                    title: '开票项目',
                    dataIndex: 'goodsname',
                    ellipsis: true,
                    width: 100
                },
                {
                    title: '数量',
                    dataIndex: 'num',
                    width: 80,
                    render: (t, r, i, isAdit) => {
                        const val = r.taxunitprice != 0 ? fpy_toFixedNoZero(t) : '';
                        return (
                            r.taxunitprice != 0
                                ? ((items[i + 1]?.rowtype === '1' && items[i]?.taxamount + items[i + 1]?.taxamount === 0) || isAdit ? (
                                    `<span title="${val}">${val}</span>`
                                ) : `<input class="searchInput" name="num" value="${val}" title="${val}">`)
                                : '');
                    }
                },
                {
                    title: `单价(${hsbz === '1' ? '' : '不'}含税)`,
                    dataIndex: hsbz === '1' ? 'taxunitprice' : 'unitprice',
                    width: 80,
                    render: t => {
                        const val = fpy_toFixedTwoOrMore(t);
                        return t ? `<span class="xmdj" title="${val}">${val}</span>` : '';
                    }
                },
                {
                    title: '税率',
                    dataIndex: 'taxrate',
                    width: 55,
                    render: t => t && t !== null ? t * 100 + '%' : ''
                },
                {
                    title: '不含税金额',
                    dataIndex: 'amount',
                    width: 90,
                    render: t => {
                        const val = Number(t).toFixed(2);
                        return `<span class="amount" title="${val}">${val}</span>`;
                    }
                },
                {
                    title: '税额',
                    dataIndex: 'tax',
                    width: 60,
                    render: (t, r, i) => {
                        const val = Number(t).toFixed(2);
                        return `<span class="tax" title="${val}">${val}</span>`;
                    }
                },
                {
                    title: '含税金额',
                    dataIndex: 'taxamount',
                    width: 90,
                    render: (t, r, i, isAdit) => {
                        const val = Number(t).toFixed(2);
                        return (
                            // 非折扣行 非机动车
                            r.rowtype !== '1' && specialtype !== '18'
                                ? ((items[i + 1]?.rowtype === '1' && items[i]?.taxamount + items[i + 1]?.taxamount === 0) || isAdit ? (
                                    `<span title="${val}">${val}</span>`
                                ) : `<input class="searchInput" name="taxamount" value="${val}" title="${val}">`)
                                : `<span class="taxamount" title="${val}">${val}</span>`
                        );
                    }
                },
                {
                    title: '操作',
                    width: 40,
                    render: (t, r, i) => r.rowtype !== '1' ? `<a class="del" href="javascript:;">删除</a>` : ''
                }
            ],
            scroll: items.length > 4 ? { y: 104 } : {},
            dataSource: items,
            headerColor: '#666',
            headerBgColor: '#eee',
            rowHeight: 26
        });
        // 设置滚动高度
        if (setScrollTop) tableDom.find('.workbench-scroll').scrollTop(scrollTop);
    }

    // 单据明细处理-发票编辑的合计
    function updateTreatmentInvoiceDetailEditTotal() {
        const invoice = treatmentInvoiceList[treatmentId][0];
        const total = treatmentEditItems.reduce((all, o) => {
            return [fpy_Add(all[0], o.tax), fpy_Add(all[1], o.amount), fpy_Add(all[2], o.taxamount)];
        }, [0, 0, 0]);
        const _totaltax = total[0].toFixed(2);
        const _invoiceamount = total[1].toFixed(2);
        const _totalamount = total[2].toFixed(2);
        invoice.totaltax = _totaltax;
        invoice.invoiceamount = _invoiceamount;
        invoice.totalamount = _totalamount;
        $treatment_invoice.find('.totaltax').text(_totaltax);
        $treatment_invoice.find('.invoiceamount').text(_invoiceamount);
        $treatment_invoice.find('.totalamount').text(_totalamount);
    }

    // 单据明细处理-底部
    function showTreatmentFooter() {
        if (treatmentIsEdit) {
            $treatment.find('.footer').find('.cancel').show().next('.quit').hide().next('.prev').hide();
        } else {
            $treatment.find('.footer').find('.cancel').hide().next('.quit').show().next('.prev').show();
        }
    }

    // 单据明细处理-更新头部
    function updateTreatmentHeader(hide) {
        let text = '- -';
        if (!hide) {
            text = '手动单据处理';
        }
        $head_treatment_value.text(text);
    }

    // 单据明细处理-更新发票明细 isChecked 必传 true 选中 false 取消选中
    function updateTreatmentInvoiceItems(billId, keys, isChecked, target) {
        // 当前单据
        const obj = treatmentShowBillList.find(o => o.id === billId);

        let treatmentInvoice = treatmentInvoiceList[treatmentId][0];
        const invoiceItems = treatmentInvoice.items || [];

        const isInit = !treatmentInvoice.id;

        // 没有初始化就初始化
        if (isInit) treatmentInvoice = initTreatmentInvoice(obj);

        // 待更新明细数量
        let isItemUpdate = keys.length <= 100;
        let _items;
        let delItemIndexs = [];

        // 更改明细
        if (isChecked) {
            const remainingItems = treatmentRemainingItems[billId].items;
            _items = keys.map(key => {
                // 当前单据明细
                const o = remainingItems.find(o => o.id === key);
                return initTreatmentInvoiceItems(obj, o);
            });
            treatmentInvoice.items = [
                ...invoiceItems,
                ..._items
            ];
        } else {
            treatmentInvoice.items = invoiceItems.filter((o, i) => {
                if (keys.includes(o.billItemId)) {
                    delItemIndexs.push(i);
                } else {
                    return true;
                }
            });
            // 待更新明细数量
            isItemUpdate = isItemUpdate || delItemIndexs.length <= 100;
        }

        if (treatmentInvoice.items.length) {
            // 数据更新 calculateTreatmentInvoiceTotalByIndex依赖最新的数据
            treatmentInvoiceList[treatmentId][0] = treatmentInvoice;
            const { invoicetype } = treatmentInvoice;
            // 更改发票的合计
            const invoice_hjbhsje = calculateTreatmentInvoiceTotalByIndex();

            // 检测是否超限额
            const { isOverLimit, quota } = testForOverLimit(invoice_hjbhsje, invoicetype);
            // common/tip
            if (isOverLimit) model.invoke("common/tip", `待开发票已超过发票限额${quota}，请修改！`);
        } else {
            // 数据更新
            treatmentInvoiceList[treatmentId][0] = {};
        }


        // 渲染发票
        if(treatmentInvoiceList[treatmentId][0].id){
            if (isInit) {
                showTreatmentInvoice();
            } else {
                if (isItemUpdate) {
                    if (isChecked) {
                        for (let i = 0; i < _items.length; i++) {
                            // 百分百折扣，被折扣行不能编辑数量和金额
                            const isAdit = _items[i + 1]?.rowtype === '1' && _items[i]?.taxamount + _items[i + 1]?.taxamount === 0
                            fpyTable.addRow(`imc_invoiceWorkbench_treatment_invoice${treatmentInvoice.id}`, _items[i], isAdit);
                        }
                    } else {
                        for(let i = delItemIndexs.length; i >= 0; i--) {
                            fpyTable.deleteRow(`imc_invoiceWorkbench_treatment_invoice${treatmentInvoice.id}`, delItemIndexs[i]);
                        }
                    }
                } else {
                    showTreatmentInvoiceDetailNoEdit(true);
                }
                updateTreatmentInvoiceTotalByIndex();
            }
        } else {
            emptyTreatmentInvoice();
        }

        updateTreatmentRemainingItems(billId, keys, isChecked, target);
    }

    // 单据明细处理-更新所有发票明细
    function updateAllTreatmentInvoiceItems(isChecked) {
        let treatmentInvoice = treatmentInvoiceList[treatmentId][0];
        const isInit = !treatmentInvoice.id;
        if (isChecked) {
            if (isInit) treatmentInvoice = initTreatmentInvoice(treatmentShowBillList[0]);
            let invoiceItems = treatmentInvoice.items || [];
            for (const billId in treatmentRemainingItems) {
                // 当前单据
                const obj = treatmentShowBillList.find(o => o.id === billId);
                const remainingItems = treatmentRemainingItems[billId].items;
                const _items = remainingItems.filter(o => o.remainvalidamount != 0).map(o => {
                    return initTreatmentInvoiceItems(obj, o);
                });
                invoiceItems = invoiceItems.concat(_items);
            }

            treatmentInvoice.items = invoiceItems;
            // 数据更新 calculateTreatmentInvoiceTotalByIndex依赖最新的数据
            treatmentInvoiceList[treatmentId][0] = treatmentInvoice;
            const { invoicetype } = treatmentInvoice;
            // 更改发票的合计
            const invoice_hjbhsje = calculateTreatmentInvoiceTotalByIndex();

            // 检测是否超限额
            const { isOverLimit, quota } = testForOverLimit(invoice_hjbhsje, invoicetype);
            // common/tip
            if (isOverLimit) model.invoke("common/tip", `待开发票已超过发票限额${quota}，请修改！`);
        } else {
            treatmentInvoiceList[treatmentId][0] = {};
        }
        showTreatmentInvoice();
    }

    // 单据明细处理-初始化发票
    function initTreatmentInvoice(obj) {
        const { sim_original_bill_item, ...other } = obj;
        return {
            ...other,
            id: 'items' + fpy_getUUId(), // 发票id 方法生成
            createtime: "", // 忽略
            invoicecode: "", // 忽略
            invoiceno: "", // 忽略
            checkcode: "", // 忽略
            originalinvoicecode: obj.blueinvoicecode, // blueinvoicecode
            originalinvoiceno: obj.blueinvoiceno, // blueinvoiceno
            orderno: fpy_getUUId(), //流水号 32位uuid
            buyername: obj.buyername, // 购方名称 buyername
            buyertaxno: obj.buyertaxno, // 购方税号 buyertaxno
            buyeraddr: obj.buyeraddr, // 购方地址电话 buyeraddr
            buyertelno: "", // 忽略
            buyerbank: obj.buyerbank, // 购方银行账号 buyerbank
            buyerbankacc: "", // 忽略
            saleraddr: obj.saleraddr, //销方地址电话 saleraddr
            salertelno: "", // 忽略
            salerbank: obj.salerbank, //销方开户行账号 salerbank
            salerbankacc: "", // 忽略
            payee: obj.payee, //收款人 payee
            reviewer: obj.reviewer, //复核人 reviewer
            drawer: obj.drawer, //开票人 drawer
            specialtype: obj.specialtype, // 特殊票种
            salername: obj.salername, //销方名称 salername
            salertaxno: obj.salertaxno, //销方税号 salertaxno
            remark: obj.invoiceremark ? `${obj.invoiceremark}，` : '', //备注 invoiceremark
            deduction: obj.deduction, //扣除额 deduction
            buyeremail: obj.buyeremail, // 购方邮箱 buyeremail
            buyerphone: obj.buyerphone, // 购方手机 buyerphone
            hsbz: obj.hsbz, //含税标志 hsbz
            taxedtype: obj.taxationstyle, // 征税方式
            issuetype: "0", // 0蓝票 1红票 固定0
            buyertype: "4", // 固定4
            inventorymark: "0", // 清单标识 0无 1有
            result: "", // 忽略
            datahash: "", // 忽略
            invalider: "", // 忽略
            invoicetype: obj.invoicetype, //发票种类 invoicetype
            fileurl: "", // 忽略
            snapshoturl: "", // 忽略
            jqbh: obj.jqbh, //设备编号 jqbh
            remainredamount: 0, // 忽略
            billno: obj.billno, //单据编号 billno
            systemsource: obj.systemsource, // systemsource
            canredtaxamount: 0, // 忽略
            terminalno: obj.terminalno, // terminalno
            redreason: obj.redreason, // redreason
            infocode: obj.infocode, // infocode
            skm: "", // 忽略
            wxid: obj.wxid, // wxid
            reorderno: "", // 忽略
            orgid: obj.orgid, // orgid
            abolishreason: "",
            buyerproperty: obj.buyerproperty, //购方企业类型，0企业，1个人 buyerproperty
            billdate: obj.billdate, // billdate
            batchbelong: obj.batchbelong, // batchbelong
            issuestatus: "2" // 固定2
        }
    }

    // 单据明细处理-初始化发票明细
    function initTreatmentInvoiceItems(obj, o) {
        return {
            id: 'items' + fpy_getUUId(), // 明细id 方法生成
            seq: o.seq, // seq
            goodscode: o.goodscode, //税收分类编码 goodscode
            specification: o.specification, //规格型号 specification
            unit: o.unit, //单位 unit
            num: o.remainvalidnum, //数量 remainvalidnum
            unitprice: o.unitprice, //单价 unitprice
            amount: fpy_Minus(o.remainvalidamount, o.remainvalidtax).toFixed(2), //金额 amount
            tax: o.remainvalidtax, //税额 remainvalidtax
            zerotaxmark: "", // 忽略
            taxpremark: o.policylogo, // policylogo
            zzstsgl: o.policycontants, // policycontants
            zxbm: "", // 忽略
            taxflag: "0", // 忽略
            simplegoodsname: o.goodssimplename, // goodssimplename
            goodsname: (o.goodssimplename && `*${o.goodssimplename}*`) + o.goodsname, //商品名称 goodsname
            taxrate: o.taxrate, //税率 taxrate
            // o为单据，单据中0是整单折扣，1是折扣行，2是普通商品行
            rowtype: o.rowtype, // 行性质,0明细行，1折扣行，2被折扣行
            taxunitprice: o.taxunitprice, //含税单价 taxunitprice
            taxamount: o.remainvalidamount, //价税合计 remainvalidamount
            billsourceid: o.billsourceid, // 应收单明细 id
            discountamount: 0, // 忽略
            discountrate: 0, // 忽略
            spbm: o.spbm, // spbm
            billId: obj.id, // 单据id 自己使用
            billNo: obj.billno, // 单据编号 自己使用
            billItemId: o.id, // 单据明细 id 自己使用
            originalXmsl: o.originalXmsl,
            originalXmdj: o.originalXmdj,
            originalTaxXmdj: o.originalTaxXmdj,
            originalSe: o.originalSe,
            originalJshjje: o.originalJshjje,
            policylogo: o.policylogo, // 汪意
            policycontants: o.policycontants, // 汪意
            extrafield: o.extrafield, // 汪意
            extrafield2: o.extrafield2, // 汪意
            extrafield3: o.extrafield3, // 汪意
            extrafield4: o.extrafield4, // 汪意
            extrafield5: o.extrafield5 // 汪意
        }
    }

    // 单据明细处理-按明细开票 剩余明细初始化
    function initTreatmentRemainingItems() {
        if (treatmentRemainingItemsHasInit) return;
        treatmentRemainingItemsHasInit = true;
        // 兼容后端
        if (!treatmentInvoiceList[treatmentId]) {
            treatmentInvoiceList = { ...treatmentInvoiceList, [treatmentId]: [{ remark: '' }] };
        }

        for(let i = 0; i < treatmentShowBillList.length; i++) {
            const { id, sim_original_bill_item = [] } = treatmentShowBillList[i];
            const _remainingItems = sim_original_bill_item.map(m => {
                return {
                    ...m,
                    originalXmsl: m.remainvalidnum,
                    originalXmdj: m.unitprice,
                    originalTaxXmdj: m.taxunitprice,
                    originalSe: m.remainvalidtax,
                    originalJshjje: m.remainvalidamount
                };
            });
            // 已勾选的明细
            const _selectedRowKeys = _remainingItems.filter(o => o.remainvalidamount == 0).map(o => o.id);
            treatmentRemainingItems[id] = {
                items: _remainingItems,
                selectedRowKeys: _selectedRowKeys
            };
        }
    }

    // 单据明细处理-剩余明细更新 isChecked 默认undefined 明细行操作 true 选中 false 取消选中
    function updateTreatmentRemainingItems(billId, keys, isChecked, target) {
        const curBill = treatmentShowBillList.find(o => o.id === billId);
        const { invoiceremark, hsbz } = curBill;
        const treatmentInvoice = treatmentInvoiceList[treatmentId][0];
        const invoiceItems = treatmentInvoice.items || [];
        let remark = treatmentInvoice.remark || '';

        const tableDom = $(`#imc_invoiceWorkbench_treatment_bill${billId}`);

        // 待更新明细数量
        const isTdUpdate = keys.length <= 300;

        const _remainingItems = treatmentRemainingItems[billId].items.map((m, i) => {
            if (keys.includes(m.id)) {
                const { originalXmsl, originalXmdj, originalTaxXmdj, originalSe, originalJshjje, taxrate } = m;

                // 是否过反算过单价 isInverseXmdj 默认false未反算
                let isInverseXmdj = false;
                let _num = originalXmsl;
                let _unitprice = originalXmdj; // 不含税
                let _taxunitprice = originalTaxXmdj; // 含税
                let _tax = originalSe;
                let _taxamount = originalJshjje;
                if (typeof isChecked === 'undefined') {
                    // 获取当前明细
                    const curInvoiceItems = invoiceItems.filter(o => m.id === o.billItemId);

                    // 反算可开含税金额，可开数量
                    for (const n of curInvoiceItems) {
                        _num = originalTaxXmdj ? fpy_toFixedNoZero(fpy_Minus(_num, n.num)) : '';
                        _tax = fpy_Minus(_tax, n.tax).toFixed(2);
                        _taxamount = fpy_Minus(_taxamount, n.taxamount).toFixed(2);
                    }

                    // 明细金额误差不能超过0.01
                    // 若超需反算单价
                    if (originalTaxXmdj && Math.abs(fpy_Minus(fpy_toFixedSafe(fpy_accMul(_num, _taxunitprice)), _taxamount)) > 0.01) {
                        // 反算单价
                        if (hsbz === '0') {
                            // 根据不含税单价反算含税单价
                            _unitprice = fpy_toFixedTwoOrMore(fpy_accDiv(fpy_Minus(_taxamount, _tax), _num));
                            _taxunitprice = fpy_toFixedTwoOrMore(fpy_accMul(_unitprice, fpy_Add(1, taxrate)));
                        } else {
                            // 根据含税单价反算不含税单价
                            _taxunitprice = fpy_toFixedTwoOrMore(fpy_accDiv(_taxamount, _num));
                            _unitprice = fpy_toFixedTwoOrMore(fpy_accDiv(_taxunitprice, fpy_Add(1, taxrate)));
                        }
                        isInverseXmdj = true;
                    }

                    // 存在单价时的极端异常处理
                    if (originalTaxXmdj) {
                        // 金额不为0，数量为0
                        if (_taxamount != 0 && _num == 0) {
                            _num = fpy_toFixedNoZero(fpy_accDiv(_taxamount, originalTaxXmdj));
                        }
                        // 金额为0，数量不为0
                        if (_taxamount == 0 && _num != 0) {
                            _num = '0';
                        }
                    }
                } else if (isChecked) {
                    _num = originalTaxXmdj ? '0' : '';
                    _tax = 0;
                    _taxamount = 0;
                }

                if (isTdUpdate) {
                    // 更新明细
                    const disabled = m.rowtype === '1';
                    const tdDom = tableDom.find('.workbench-table-tbody').find('tr').eq(i).find('td');
                    // 处理折扣行
                    if (target !== i) {
                        tdDom.eq(0).find('input[type=checkbox]').prop({ disabled, checked: _taxamount == 0 });
                    }
                    const numText = originalTaxXmdj != 0 ? fpy_toFixedNoZero(_num) : '';
                    tdDom.eq(2).text(numText).prop('title', numText);
                    const taxamountText = Number(_taxamount).toFixed(2);
                    tdDom.eq(3).text(taxamountText).prop('title', taxamountText);
                }

                return {
                    ...m,
                    isInverseXmdj,
                    remainvalidnum: _num,
                    unitprice: _unitprice,
                    taxunitprice: _taxunitprice,
                    remainvalidtax: _tax,
                    remainvalidamount: _taxamount
                };
            } else {
                return m;
            }
        });

        const _selectedRowKeys = _remainingItems.filter(o => o.remainvalidamount == 0).map(o => o.id);

        // 更新数据
        treatmentRemainingItems[billId].items = _remainingItems;
        treatmentRemainingItems[billId].selectedRowKeys = _selectedRowKeys;

        if (invoiceremark) {
            // 发票是否包含当前单据的明细 remainvalidamount有保留两位小数并是字符串，originalJshjje是数值
            let isInvoiceHadBillItem = _remainingItems.some(item => item.remainvalidamount != item.originalJshjje);
            const hadRemark = remark.includes(`${invoiceremark}，`);
            if (isInvoiceHadBillItem && !hadRemark) {
                remark = `${invoiceremark}，` + remark;
            } else if (!isInvoiceHadBillItem && hadRemark) {
                remark = remark.replace(`${invoiceremark}，`, '');
            }
        }

        // 更新发票的备注
        treatmentInvoice.remark = remark;
        // 渲染发票的备注
        $treatment_invoice.find('.item').find('textarea').val(remark);

        // 更新全选按钮
        updateTreatmentBillSelectAll(isChecked);

        if (isTdUpdate) {
            // 更新单据全选按钮
            if (target !== 'all') {
                const allCheck = _selectedRowKeys.length === _remainingItems.length;
                tableDom.find('.workbench-table-header').find('input[type=checkbox]').prop('checked', allCheck);
            }

            // 更新合计
            const totalData = treatmentBillTotalGet(_remainingItems);
            const totalDom = tableDom.find('.workbench-table-footer');
            for (const key in totalData) {
                totalDom.find(`.${key}`).text(totalData[key]).prop('title', totalData[key]);
            }
        } else {
            const treatmentIndex = treatmentShowBillList.findIndex(o => o.id === billId);
            updateTreatmentBillTableByIndex(treatmentIndex, true);
        }
    }

    // 单据明细处理-更新全选按钮 默认为选中，需校验每个单据是否全选
    function updateTreatmentBillSelectAll(isChecked = true) {
        if (isChecked) {
            for (const billId in treatmentRemainingItems) {
                const { items, selectedRowKeys } = treatmentRemainingItems[billId];
                if (selectedRowKeys.length !== items.length) {
                    isChecked = false;
                    break;
                }
            }
        }
        $treatment_selectAll.prop('checked', isChecked);
    }

    // 单据明细处理-剩余明细更新所有
    function updateAllTreatmentRemainingItems(isChecked) {
        for (const treatmentIndex in treatmentShowBillList) {
            const { id, sim_original_bill_item = [] } = treatmentShowBillList[treatmentIndex];
            const _selectedRowKeys = [];
            const _remainingItems = sim_original_bill_item.map(m => {
                const { id, remainvalidnum, unitprice, taxunitprice, remainvalidtax, remainvalidamount } = m;
                if (isChecked) _selectedRowKeys.push(id);
                return {
                    ...m,
                    originalXmsl: remainvalidnum,
                    originalXmdj: unitprice,
                    originalTaxXmdj: taxunitprice,
                    originalSe: remainvalidtax,
                    originalJshjje: remainvalidamount,
                    isInverseXmdj: false,
                    remainvalidnum: isChecked ? '0' : remainvalidnum,
                    remainvalidtax: isChecked ? '0' : remainvalidtax,
                    remainvalidamount: isChecked ? '0' : remainvalidamount
                };
            })
            // 更新数据
            treatmentRemainingItems[id].items = _remainingItems;
            treatmentRemainingItems[id].selectedRowKeys = _selectedRowKeys;

            // 更新全选按钮
            $(`#imc_invoiceWorkbench_treatment_bill${id}`).find('.workbench-table-header').find('input[type=checkbox]').prop('checked', isChecked);
            updateTreatmentBillTableByIndex(treatmentIndex, true);
        }
    }

    // 单据明细处理-检测是否超限额
    function testForOverLimit(v, type) {
        let quota;
        switch (type) {
        case '026':
            quota = limitAmounts.ecLimitAmt || 0;
            break;
        case '028':
            quota = limitAmounts.esLimitAmt || 0;
            break;
        case '007':
            quota = limitAmounts.pcLimitAmt || 0;
            break;
        case '004':
            quota = limitAmounts.psLimitAmt || 0;
            break;
        default:
            quota = Number.MAX_SAFE_INTEGER;
            break;
        }
        return { isOverLimit: Math.abs(v) > Number(quota), quota };
    }

    // 单据明细处理-修改数量
    function treatmentChangeXmsl(v, itemIndex, whetherToTest) {
        const treatmentInvoice = treatmentInvoiceList[treatmentId][0];
        const { id, hsbz, items, invoicetype } = treatmentInvoice;
        const { num, amount, tax, taxamount, taxrate, originalXmdj, originalTaxXmdj, originalJshjje, billItemId, billId } = items[itemIndex];
        const tableDom = $('#imc_invoiceWorkbench_treatment_invoice' + id).find('tbody').find('tr');

        // 记录需更新的key
        const keys = [billItemId];

        let value = v.trim();
        if (value === '-') {
            return;
        } else if (isNaN(value)) {
            tableDom.eq(itemIndex).find(`input[name=num]`).val(num);
            // common/tip
            model.invoke("common/tip", '请输入数值！');
            return;
        } else {
            // 自动转换
            value = (originalJshjje > 0 && value < 0) || (originalJshjje < 0 && value > 0) ? -value : value;
        }

        const remainingItems = treatmentRemainingItems[billId].items;

        // 校验可开的发票明细
        let txable_xmsl = num;
        let txable_se = tax;
        let txable_hjbhsje = amount;
        let txable_jshjje = taxamount;
        for (const o of remainingItems) {
            if (o.id === billItemId) {
                txable_xmsl = fpy_toFixedNoZero(Number(txable_xmsl) + Number(o.remainvalidnum));
                txable_se = (Number(txable_se) + Number(o.remainvalidtax)).toFixed(2);
                txable_hjbhsje = (Number(txable_hjbhsje) + fpy_Minus(o.remainvalidamount, o.remainvalidtax)).toFixed(2);
                txable_jshjje = (Number(txable_jshjje) + Number(o.remainvalidamount)).toFixed(2);
                break;
            }
        }

        // 百分比计算
        const _xmsl = value;
        const percent = _xmsl / txable_xmsl;
        const _se = fpy_toFixedSafe(fpy_accMul(percent, txable_se));
        const _jshjje = fpy_toFixedSafe(fpy_accMul(percent, txable_jshjje));
        const _hjbhsje = fpy_Minus(_jshjje, _se).toFixed(2);
        // 根据数量判断
        if (Math.abs(txable_xmsl) < Math.abs(_xmsl)) {
            tableDom.eq(itemIndex).find(`input[name=num]`).val(items[itemIndex].num);
            // common/tip
            model.invoke("common/tip", `明细剩余可开数量为${txable_xmsl}，输入不可超过该数值！`);
            return;
        } else if (Number(txable_xmsl) === Number(_xmsl) || txable_jshjje === _jshjje) {
            // 相等，使用可开明细
            items[itemIndex].num = txable_xmsl;
            items[itemIndex].tax = txable_se;
            items[itemIndex].amount = txable_hjbhsje;
            items[itemIndex].taxamount = txable_jshjje;
        } else {
            // 不等，使用反算明细
            items[itemIndex].num = _xmsl;
            items[itemIndex].tax = _se;
            items[itemIndex].amount = _hjbhsje;
            items[itemIndex].taxamount = _jshjje;
        }
        // 编辑后需将单价调整回原始单价originalXmdj，并将isInverseXmdj改为false
        items[itemIndex].unitprice = originalXmdj;
        items[itemIndex].taxunitprice = originalTaxXmdj;
        items[itemIndex].isInverseXmdj = false;

        // 明细金额误差不能超过0.01
        // 若超需反算单价
        // 是否过反算过单价 isInverseXmdj 默认false未反算
        if (hsbz === '0') {
            if (originalXmdj && Math.abs(fpy_Minus(fpy_toFixedSafe(fpy_accMul(items[itemIndex].num, items[itemIndex].unitprice)), items[itemIndex].amount)) > 0.01) {
                // 反算单价
                items[itemIndex].unitprice = fpy_toFixedTwoOrMore(fpy_accDiv(items[itemIndex].amount, items[itemIndex].num));
                items[itemIndex].taxunitprice = fpy_toFixedTwoOrMore(fpy_accMul(items[itemIndex].unitprice, fpy_Add(1, taxrate)));
                items[itemIndex].isInverseXmdj = true;
            }
        } else {
            if (originalTaxXmdj && Math.abs(fpy_Minus(fpy_toFixedSafe(fpy_accMul(items[itemIndex].num, items[itemIndex].taxunitprice)), items[itemIndex].taxamount)) > 0.01) {
                // 反算单价
                items[itemIndex].taxunitprice = fpy_toFixedTwoOrMore(fpy_accDiv(items[itemIndex].taxamount, items[itemIndex].num));
                items[itemIndex].unitprice = fpy_toFixedTwoOrMore(fpy_accDiv(items[itemIndex].taxunitprice, fpy_Add(1, taxrate)));
                items[itemIndex].isInverseXmdj = true;
            }
        }

        // 赋值
        tableDom.eq(itemIndex).find('input[name=num]').val(items[itemIndex].num).prop('title', items[itemIndex].num);
        tableDom.eq(itemIndex).find('.tax').text(items[itemIndex].tax).prop('title', items[itemIndex].tax);
        tableDom.eq(itemIndex).find('input[name=taxamount]').val(items[itemIndex].taxamount).prop('title', items[itemIndex].taxamount);
        tableDom.eq(itemIndex).find('.amount').text(items[itemIndex].amount).prop('title', items[itemIndex].amount);
        if (originalTaxXmdj) {
            const val = fpy_toFixedTwoOrMore(hsbz === '1' ? items[itemIndex].taxunitprice : items[itemIndex].unitprice);
            tableDom.eq(itemIndex).find('.xmdj').text(val).prop('title', val);
        }

        // 折扣行
        const discountLine = items[itemIndex + 1];
        if (discountLine && discountLine.rowtype === '1') {
            // 记录需更新的key
            keys.push(discountLine.billItemId);

            // 校验可开的发票明细
            let txable_se = discountLine.tax;
            let txable_hjbhsje = discountLine.amount;
            let txable_jshjje = discountLine.taxamount;
            for (const o of remainingItems) {
                if (o.id === discountLine.billItemId) {
                    txable_se = (Number(txable_se) + Number(o.remainvalidtax)).toFixed(2);
                    txable_hjbhsje = (Number(txable_hjbhsje) + fpy_Minus(o.remainvalidamount, o.remainvalidtax)).toFixed(2);
                    txable_jshjje = (Number(txable_jshjje) + Number(o.remainvalidamount)).toFixed(2);
                    break;
                }
            }
            const _se = fpy_toFixedSafe(fpy_accMul(percent, txable_se));
            const _jshjje = fpy_toFixedSafe(fpy_accMul(percent, txable_jshjje));
            const _hjbhsje = fpy_Minus(_jshjje, _se).toFixed(2);
            if (txable_jshjje === _jshjje) {
                // 相等，使用可开明细
                discountLine.tax = txable_se;
                discountLine.amount = txable_hjbhsje;
                discountLine.taxamount = txable_jshjje;
            } else {
                // 不等，使用反算明细
                discountLine.tax = _se;
                discountLine.amount = _hjbhsje;
                discountLine.taxamount = _jshjje;
            }

            // 赋值
            tableDom.eq(itemIndex + 1).find('.tax').text(discountLine.tax).prop('title', discountLine.tax);
            tableDom.eq(itemIndex + 1).find('.amount').text(discountLine.amount).prop('title', discountLine.amount);
            tableDom.eq(itemIndex + 1).find('.taxamount').text(discountLine.taxamount).prop('title', discountLine.taxamount);
        }

        // 更改发票的合计
        const invoice_hjbhsje = calculateTreatmentInvoiceTotalByIndex();
        updateTreatmentInvoiceTotalByIndex();

        // 检测是否超限额
        if (whetherToTest) {
            const { isOverLimit, quota } = testForOverLimit(invoice_hjbhsje, invoicetype);
            // common/tip
            if (isOverLimit) model.invoke("common/tip", `待开发票已超过发票限额${quota}，请修改！`);
        }

        updateTreatmentRemainingItems(billId, keys);
    }

    // 单据明细处理-修改金额 失去焦点
    function treatmentBlurXmsl(v, itemIndex) {
        if (v === '-') {
            treatmentDeleteItem(itemIndex);
        } else {
            v = fpy_toFixedNoZero(Number(v));
            if (v === '0') {
                treatmentDeleteItem(itemIndex);
            } else {
                treatmentChangeXmsl(v, itemIndex, true);
            }
        }
    }

    // 单据明细处理-修改金额
    function treatmentChangeJshjje(v, itemIndex, whetherToTest) {
        const treatmentInvoice = treatmentInvoiceList[treatmentId][0];
        const { id, hsbz, items, invoicetype } = treatmentInvoice;
        const { num, amount, tax, taxamount, taxrate, originalXmdj, originalTaxXmdj, originalJshjje, billItemId, billId } = items[itemIndex];
        const tableDom = $('#imc_invoiceWorkbench_treatment_invoice' + id).find('tbody').find('tr');

        // 记录需更新的key
        const keys = [billItemId];

        let value = v.trim();
        if (value === '-') {
            return;
        } else if (isNaN(value)) {
            tableDom.eq(itemIndex).find(`input[name=taxamount]`).val(taxamount);
            // common/tip
            model.invoke("common/tip", '请输入数值！');
            return;
        } else {
            // 自动转换
            value = (originalJshjje > 0 && value < 0) || (originalJshjje < 0 && value > 0) ? -value : value;
        }

        const remainingItems = treatmentRemainingItems[billId].items;

        // 校验可开的发票明细
        let txable_xmsl = num;
        let txable_se = tax;
        let txable_hjbhsje = amount;
        let txable_jshjje = taxamount;
        for (const o of remainingItems) {
            if (o.id === billItemId) {
                txable_xmsl = fpy_toFixedNoZero(Number(txable_xmsl) + Number(o.remainvalidnum));
                txable_se = (Number(txable_se) + Number(o.remainvalidtax)).toFixed(2);
                txable_hjbhsje = (Number(txable_hjbhsje) + fpy_Minus(o.remainvalidamount, o.remainvalidtax)).toFixed(2);
                txable_jshjje = (Number(txable_jshjje) + Number(o.remainvalidamount)).toFixed(2);
                break;
            }
        }

        // 百分比计算
        const _jshjje = value;
        const percent = _jshjje / txable_jshjje;
        const _xmsl = originalTaxXmdj ? fpy_toFixedNoZero(fpy_accMul(percent, txable_xmsl)) : '';
        const _se = fpy_toFixedSafe(fpy_accMul(percent, txable_se));
        const _hjbhsje = fpy_Minus(_jshjje, _se).toFixed(2);

        // 根据含税金额判断
        if (Math.abs(txable_jshjje) < Math.abs(_jshjje)) {
            tableDom.eq(itemIndex).find(`input[name=taxamount]`).val(items[itemIndex].taxamount);
            // common/tip
            model.invoke("common/tip", `明细剩余可开含税金额为${txable_jshjje}，输入不可超过该数值！`);
            return;
        } else if (Number(txable_jshjje) === Number(_jshjje) || (originalTaxXmdj && txable_xmsl === _xmsl)) {
            // 相等，使用可开明细
            items[itemIndex].num = txable_xmsl;
            items[itemIndex].tax = txable_se;
            items[itemIndex].amount = txable_hjbhsje;
            items[itemIndex].taxamount = txable_jshjje;
        } else {
            // 不等，使用反算明细
            items[itemIndex].num = _xmsl;
            items[itemIndex].tax = _se;
            items[itemIndex].amount = _hjbhsje;
            items[itemIndex].taxamount = _jshjje;
        }
        // 编辑后需将单价调整回原始单价originalXmdj，并将isInverseXmdj改为false
        items[itemIndex].unitprice = originalXmdj;
        items[itemIndex].taxunitprice = originalTaxXmdj;
        items[itemIndex].isInverseXmdj = false;

        // 明细金额误差不能超过0.01
        // 若超需反算单价
        // 是否过反算过单价 isInverseXmdj 默认false未反算
        if (hsbz === '0') {
            if (originalXmdj && Math.abs(fpy_Minus(fpy_toFixedSafe(fpy_accMul(items[itemIndex].num, items[itemIndex].unitprice)), items[itemIndex].amount)) > 0.01) {
                // 反算单价
                items[itemIndex].unitprice = fpy_toFixedTwoOrMore(fpy_accDiv(items[itemIndex].amount, items[itemIndex].num));
                items[itemIndex].taxunitprice = fpy_toFixedTwoOrMore(fpy_accMul(items[itemIndex].unitprice, fpy_Add(1, taxrate)));
                items[itemIndex].isInverseXmdj = true;
            }
        } else {
            if (originalTaxXmdj && Math.abs(fpy_Minus(fpy_toFixedSafe(fpy_accMul(items[itemIndex].num, items[itemIndex].taxunitprice)), items[itemIndex].taxamount)) > 0.01) {
                // 反算单价
                items[itemIndex].taxunitprice = fpy_toFixedTwoOrMore(fpy_accDiv(items[itemIndex].taxamount, items[itemIndex].num));
                items[itemIndex].unitprice = fpy_toFixedTwoOrMore(fpy_accDiv(items[itemIndex].taxunitprice, fpy_Add(1, taxrate)));
                items[itemIndex].isInverseXmdj = true;
            }
        }

        // 赋值
        tableDom.eq(itemIndex).find('input[name=num]').val(items[itemIndex].num).prop('title', items[itemIndex].num);
        tableDom.eq(itemIndex).find('.tax').text(items[itemIndex].tax).prop('title', items[itemIndex].tax);
        tableDom.eq(itemIndex).find('input[name=taxamount]').val(items[itemIndex].taxamount).prop('title', items[itemIndex].taxamount);
        tableDom.eq(itemIndex).find('.amount').text(items[itemIndex].amount).prop('title', items[itemIndex].amount);
        if (originalTaxXmdj) {
            const val = fpy_toFixedTwoOrMore(hsbz === '1' ? items[itemIndex].taxunitprice : items[itemIndex].unitprice);
            tableDom.eq(itemIndex).find('.xmdj').text(val).prop('title', val);
        }

        // 折扣行
        const discountLine = items[itemIndex + 1];
        if (discountLine && discountLine.rowtype === '1') {
            // 记录需更新的key
            keys.push(discountLine.billItemId);

            // 校验可开的发票明细
            let txable_se = discountLine.tax;
            let txable_hjbhsje = discountLine.amount;
            let txable_jshjje = discountLine.taxamount;
            for (const o of remainingItems) {
                if (o.id === discountLine.billItemId) {
                    txable_se = (Number(txable_se) + Number(o.remainvalidtax)).toFixed(2);
                    txable_hjbhsje = (Number(txable_hjbhsje) + fpy_Minus(o.remainvalidamount, o.remainvalidtax)).toFixed(2);
                    txable_jshjje = (Number(txable_jshjje) + Number(o.remainvalidamount)).toFixed(2);
                    break;
                }
            }
            const _se = fpy_toFixedSafe(fpy_accMul(percent, txable_se));
            const _jshjje = fpy_toFixedSafe(fpy_accMul(percent, txable_jshjje));
            const _hjbhsje = fpy_Minus(_jshjje, _se).toFixed(2);
            if (txable_jshjje === _jshjje) {
                // 相等，使用可开明细
                discountLine.tax = txable_se;
                discountLine.amount = txable_hjbhsje;
                discountLine.taxamount = txable_jshjje;
            } else {
                // 不等，使用反算明细
                discountLine.tax = _se;
                discountLine.amount = _hjbhsje;
                discountLine.taxamount = _jshjje;
            }

            // 赋值
            tableDom.eq(itemIndex + 1).find('.tax').text(discountLine.tax).prop('title', discountLine.tax);
            tableDom.eq(itemIndex + 1).find('.amount').text(discountLine.amount).prop('title', discountLine.amount);
            tableDom.eq(itemIndex + 1).find('.taxamount').text(discountLine.taxamount).prop('title', discountLine.taxamount);
        }

        // 更改发票的合计
        const invoice_hjbhsje = calculateTreatmentInvoiceTotalByIndex();
        updateTreatmentInvoiceTotalByIndex();

        // 检测是否超限额
        if (whetherToTest) {
            const { isOverLimit, quota } = testForOverLimit(invoice_hjbhsje, invoicetype);
            // common/tip
            if (isOverLimit) model.invoke("common/tip", `待开发票已超过发票限额${quota}，请修改！`);
        }

        updateTreatmentRemainingItems(billId, keys);
    }

    // 单据明细处理-修改金额 失去焦点
    function treatmentBlurJshjje(v, itemIndex) {
        if (v === '-') {
            treatmentDeleteItem(itemIndex);
        } else {
            v = fpy_toFixedSafe(v);
            if (v === '0.00') {
                treatmentDeleteItem(itemIndex);
            } else {
                treatmentChangeJshjje(v, itemIndex, true);
            }
        }
    }

    // 单据明细处理-删除明细·
    function treatmentDeleteItem(itemIndex) {
        let treatmentInvoice = treatmentInvoiceList[treatmentId][0];
        const { id: invoiceId, invoicetype, items } = treatmentInvoice;
        const { billId } = items[itemIndex];

        // 记录需更新的key
        const keys = [items[itemIndex].billItemId];

        let delLength = 1;
        // 下一行存在且是折扣行，同时删除
        if (items[itemIndex + 1] && items[itemIndex + 1].rowtype === '1') {
            // 记录需更新的key
            keys.push(items[itemIndex + 1].billItemId);
            delLength++;
        }
        items.splice(itemIndex, delLength);
        if (items.length) {
            // 更改发票的合计
            const invoice_hjbhsje = calculateTreatmentInvoiceTotalByIndex();
            updateTreatmentInvoiceTotalByIndex();

            const { isOverLimit, quota } = testForOverLimit(invoice_hjbhsje, invoicetype);
                // common/tip
            if (isOverLimit) model.invoke("common/tip", `待开发票已超过发票限额${quota}，请修改！`);

            // 删除html节点，有折扣行先删除折扣行
            const tableDom = $(`#imc_invoiceWorkbench_treatment_invoice${invoiceId}`).find('.workbench-table-tbody').find('tr');
            if (delLength === 2) tableDom.eq(itemIndex + 1).remove();
            tableDom.eq(itemIndex).remove();
        } else {
            treatmentInvoiceList[treatmentId][0] = {};

            // 删除html节点
            $treatment_invoice.find('.item').remove();
        }

        updateTreatmentRemainingItems(billId, keys);
    }

    // 单据明细处理-编辑数量
    function treatmentEditXmsl(v, itemIndex) {
        const { hsbz } = treatmentInvoiceList[treatmentId][0];
        const { num, unitprice, taxunitprice, amount, taxamount } = treatmentEditItems[itemIndex];
        const value = v.trim();
        // 数值
        if (!(!isNaN(value) || value === '-')) {
            updateTreatmentEditItems('num', num, itemIndex);
            model.invoke("common/tip", '请输入数值！');
            return;
        }
        const _num = value;
        updateTreatmentEditItems('num', _num, itemIndex);

        let _unitprice = unitprice;
        let _taxunitprice = taxunitprice;
        let _amount = amount;
        let _taxamount = taxamount;
        // 零值不反算
        if (!(value == 0 || value === '-')) {
            if (hsbz === '0') {
                if (_unitprice) {
                    _amount = fpy_toFixedSafe(fpy_accMul(_num, _unitprice));
                    updateTreatmentEditItems('amount', _amount, itemIndex);
                } else if (amount) {
                    _unitprice = fpy_toFixedTwoOrMore(fpy_accDiv(_amount, _num));
                    updateTreatmentEditItems('unitprice', _unitprice, itemIndex);
                }
            } else {
                if (_taxunitprice) {
                    _taxamount = fpy_toFixedSafe(fpy_accMul(_num, _taxunitprice));
                    updateTreatmentEditItems('taxamount', _taxamount, itemIndex);
                } else if (_taxamount) {
                    _taxunitprice = fpy_toFixedTwoOrMore(fpy_accDiv(_taxamount, _num));
                    updateTreatmentEditItems('taxunitprice', _taxunitprice, itemIndex);
                }
            }
            treatmentcalculateTax(itemIndex);
        }
    }

    // 单据明细处理-编辑数量 失去焦点
    function treatmentEditBlurXmsl(v, itemIndex) {
        if (v == 0 || v === '-') {
            v = '';
            updateTreatmentEditItems('unitprice', '', itemIndex);
            updateTreatmentEditItems('taxunitprice', '', itemIndex);
        } else {
            v = fpy_toFixedNoZero(v);
        }
        updateTreatmentEditItems('num', v, itemIndex);
    }

    // 单据明细处理-编辑单价
    function treatmentEditXmdj(v, itemIndex) {
        const { hsbz } = treatmentInvoiceList[treatmentId][0];
        const { num, unitprice, taxunitprice, amount, taxamount } = treatmentEditItems[itemIndex];
        let value = v.trim();
        // 数值
        if (value === '-') {
            return;
        } else if (isNaN(value)) {
            updateTreatmentEditItems(hsbz === '0' ? 'unitprice' : 'taxunitprice', hsbz === '0' ? unitprice : taxunitprice, itemIndex);
            model.invoke("common/tip", '请输入数值！');
            return;
        } else {
            if (value < 0) value = -value;
        }
        let _num = num;
        let _unitprice = unitprice;
        let _taxunitprice = taxunitprice;
        let _amount = amount;
        let _taxamount = taxamount;
        if (hsbz === '0') {
            _unitprice = value;
            updateTreatmentEditItems('unitprice', _unitprice, itemIndex);
        } else {
            _taxunitprice = value;
            updateTreatmentEditItems('taxunitprice', _taxunitprice, itemIndex);
        }
        if (value != 0) {
            if (hsbz === '0') {
                if (_num) {
                    _amount = fpy_toFixedSafe(fpy_accMul(_num, _unitprice));
                    updateTreatmentEditItems('amount', _amount, itemIndex);
                } else if (_amount) {
                    _num = fpy_toFixedNoZero(fpy_accDiv(_amount, _unitprice));
                    updateTreatmentEditItems('num', _num, itemIndex);
                }
            } else {
                if (_num) {
                    _taxamount = fpy_toFixedSafe(fpy_accMul(_num, _taxunitprice));
                    updateTreatmentEditItems('taxamount', _taxamount, itemIndex);
                } else if (_taxamount) {
                    _num = fpy_toFixedNoZero(fpy_accDiv(_taxamount, _taxunitprice));
                    updateTreatmentEditItems('num', _num, itemIndex);
                }
            }
            treatmentcalculateTax(itemIndex);
        }
    }

    // 单据明细处理-编辑单价 失去焦点
    function treatmentEditBlurXmdj(v, itemIndex) {
        const { hsbz } = treatmentInvoiceList[treatmentId][0];
        if (v == 0 || v === '-') {
            v = '';
            updateTreatmentEditItems('num', '', itemIndex);
            // 清空另一个单价
            const name = hsbz === '0' ? 'taxunitprice' : 'unitprice';
            updateTreatmentEditItems(name, '', itemIndex);
        } else {
            v = fpy_toFixedTwoOrMore(v);
        }
        const name = hsbz === '0' ? 'unitprice' : 'taxunitprice';
        updateTreatmentEditItems(name, v, itemIndex);
    }

    // 单据明细处理-编辑金额
    function treatmentEditXmje(v, itemIndex) {
        const { hsbz } = treatmentInvoiceList[treatmentId][0];
        const { rowtype, amount, taxamount } = treatmentEditItems[itemIndex];
        let value = v.trim();
        const name = hsbz === '0' ? 'amount' : 'taxamount';

        if (value === '-') {
            return;
        } else if (isNaN(value)) {
            updateTreatmentEditItems(name, hsbz === '0' ? amount : taxamount, itemIndex);
            model.invoke("common/tip", '请输入数值！');
            return;
        } else {
            // 折扣行应为负数
            if (rowtype === '1' && value > 0) value = -value;
        }
        updateTreatmentEditItems(name, value, itemIndex);
    }

    // 单据明细处理-编辑金额 失去焦点
    function treatmentEditBlurXmje(v, itemIndex) {
        const { hsbz } = treatmentInvoiceList[treatmentId][0];
        const { num, unitprice, taxunitprice, amount, taxamount } = treatmentEditItems[itemIndex];
        let _num = num;
        let _unitprice = unitprice;
        let _taxunitprice = taxunitprice;
        let _amount = amount;
        let _taxamount = taxamount;
        if (v == 0 || v === '-') {
            const name = hsbz === '0' ? 'amount' : 'taxamount';
            updateTreatmentEditItems(name, '', itemIndex);
        } else {
            const value = fpy_toFixedSafe(v);
            // 保持数量和金额的正负值相同
            if (_num && ((_num < 0 && value > 0) || (_num > 0 && value < 0))) {
                _num = -_num + '';
                updateTreatmentEditItems('num', _num, itemIndex);
            }
            if (hsbz === '0') {
                _amount = value;
                updateTreatmentEditItems('amount', _amount, itemIndex);
                if (_num) {
                    _unitprice = fpy_toFixedTwoOrMore(fpy_accDiv(_amount, _num));
                    updateTreatmentEditItems('unitprice', _unitprice, itemIndex);
                } else if (_unitprice) {
                    _num = fpy_toFixedNoZero(fpy_accDiv(_amount, _unitprice));
                    updateTreatmentEditItems('num', _num, itemIndex);
                }
            } else {
                _taxamount = value;
                updateTreatmentEditItems('taxamount', _taxamount, itemIndex);
                if (_num) {
                    _taxunitprice = fpy_toFixedTwoOrMore(fpy_accDiv(_taxamount, _num));
                    updateTreatmentEditItems('taxunitprice', _taxunitprice, itemIndex);
                } else if (_taxunitprice) {
                    _num = fpy_toFixedNoZero(fpy_accDiv(_taxamount, _taxunitprice));
                    updateTreatmentEditItems('num', _num, itemIndex);
                }
            }
            treatmentcalculateTax(itemIndex);
        }
    }

    // 单据明细处理-编辑切换税率
    function treatmentEditChangeSl(v, itemIndex) {
        let _taxrate;
        let _taxpremark;
        let _zzstsgl;
        switch (v) {
        case '0.00Z1':
            _taxrate = '0';
            _taxpremark = '1';
            _zzstsgl = '免税';
            break;
        case '0.00Z2':
            _taxrate = '0';
            _taxpremark = '1';
            _zzstsgl = '不征税';
            break;
        case '0.00Z3':
            _taxrate = '0';
            _taxpremark = '0';
            _zzstsgl = '';
            break;
        default:
            _taxrate = v;
            _taxpremark = '0';
            _zzstsgl = '';
            break;
        }
        updateTreatmentEditItems('taxrate', _taxrate, itemIndex);
        updateTreatmentEditItems('taxpremark', _taxpremark, itemIndex);
        updateTreatmentEditItems('zzstsgl', _zzstsgl, itemIndex);
        treatmentcalculateTax(itemIndex);
    }

    // 单据明细处理-编辑税额 失去焦点
    function treatmentEditBlurSe(v, itemIndex) {
        const { num, unitprice, taxrate, tax, amount } = treatmentEditItems[itemIndex];
        if (isNaN(v)) {
            model.invoke("common/tip", '请输入数值！');
            return;
        }
        const _tax = fpy_toFixedSafe(v);
        const difference = fpy_Minus(_tax, tax); // 税额调整值
        const _amount = fpy_Minus(amount, difference).toFixed(2);
        // 计算正确的对比税额
        // 用调整后的不含税金额和税率计算对比税额
        // 不含税金额以数量不含税单价乘积为准；无数量单价时，不计算不含税金额误差
        const taxCal = fpy_toFixedSafe(fpy_accMul(_amount, taxrate));
        let isError;
        if (Math.abs(fpy_Minus(_tax, taxCal)) > taxequipment) {
            isError = `待开发票的明细税额误差超过±${taxequipment}，请重新修改!`;
        } else if (unitprice && Math.abs(fpy_Minus(_amount, fpy_toFixedSafe(fpy_accMul(num, unitprice)))) > 0.01) {
            isError = '待开发票的明细金额误差超过±0.01，请重新修改!';
        }
        if (isError) {
            // 恢复
            updateTreatmentEditItems('tax', tax, itemIndex);
            model.invoke("common/tip", isError);
            return;
        }
        updateTreatmentEditItems('tax', _tax, itemIndex);
        updateTreatmentEditItems('amount', _amount, itemIndex);
        updateTreatmentInvoiceDetailEditTotal();
    }

    // 单据明细处理-反算税额 根据含税标志反算金额与单价
    function treatmentcalculateTax(itemIndex) {
        const { hsbz } = treatmentInvoiceList[treatmentId][0];
        const { num, unitprice, taxunitprice, amount, taxamount, taxrate } = treatmentEditItems[itemIndex];
        let _unitprice;
        let _taxunitprice;
        let _tax;
        let _amount;
        let _taxamount;
        if (hsbz === '0') {
            _tax = fpy_toFixedSafe(fpy_accMul(amount, taxrate));
            _taxamount = fpy_Add(amount, _tax).toFixed(2);
            updateTreatmentEditItems('taxamount', _taxamount, itemIndex);
            if (num) {
                _taxunitprice = fpy_toFixedTwoOrMore(fpy_accMul(unitprice, fpy_Add(1, taxrate)));
                updateTreatmentEditItems('taxunitprice', _taxunitprice, itemIndex);
            }
        } else {
            _amount = fpy_toFixedSafe(fpy_accDiv(taxamount, fpy_Add(1, taxrate)));
            _tax = fpy_Minus(taxamount, _amount).toFixed(2);
            updateTreatmentEditItems('amount', _amount, itemIndex);
            if (num) {
                _unitprice = fpy_toFixedTwoOrMore(fpy_accDiv(taxunitprice, fpy_Add(1, taxrate)));
                updateTreatmentEditItems('unitprice', _unitprice, itemIndex);
            }
        }
        updateTreatmentEditItems('tax', _tax, itemIndex);
        updateTreatmentInvoiceDetailEditTotal();
    }

    // 单据明细处理-更新编辑后的数据
    function updateTreatmentEditItems(name, value, itemIndex) {
        const treatmentInvoice = treatmentInvoiceList[treatmentId][0];
        const { id } = treatmentInvoice;
        treatmentEditItems[itemIndex][name] = value;
        if (name === 'taxrate') {
            $('#imc_invoiceWorkbench_treatment_invoice' + id).find('tbody').find('tr').eq(itemIndex).find('select').find(`option[value='${value}']`).attr('selected', true);
        } else {
            $('#imc_invoiceWorkbench_treatment_invoice' + id).find('tbody').find('tr').eq(itemIndex).find(`input[name=${name}]`).val(value).prop('title', value);
        }
    }

    // 发票预览
    function showPreview() {
        showPreviewBill();
        showPreviewInvoice();
        updatePreviewHeader();
    }

    // 发票预览-单据
    function showPreviewBill() {
        let previewBill = [];
        if (treatmentIsEdit) {
            previewBill = treatmentShowBillList;
        } else {
            const items = treatmentInvoiceList[treatmentId][0].items;
            for (let m = 0; m < treatmentShowBillList.length; m++) {
                const obj = treatmentShowBillList[m];
                const _items = items.filter(o => o.billId === obj.id);
                let invoice_hjbhsje = '';
                let invoice_kphjse = '';
                let invoice_jshjje = '';
                for (let n = 0; n < _items.length; n++) {
                    invoice_hjbhsje = fpy_Add(invoice_hjbhsje, _items[n].amount);
                    invoice_kphjse = fpy_Add(invoice_kphjse, _items[n].tax);
                    invoice_jshjje = fpy_Add(invoice_jshjje, _items[n].taxamount);
                }
                if (_items.length) {
                    previewBill.push({
                        billno: obj.billno,
                        invoiceamount: invoice_hjbhsje,
                        totaltax: invoice_kphjse,
                        totalamount: invoice_jshjje
                    });
                }
            }
        }
        const _html = [];
        for (let i = 0; i < previewBill.length; i++) {
            const obj = previewBill[i];
            _html.push(`<div class="item">
                <div class="text truncateText">单据编号：<span class="primary" title="${obj.billno}">${obj.billno}</span></div>
                <div class="text">不含税金额：<span class="warning">${Number(obj.invoiceamount).toFixed(2)}</span></div>
                <div class="text">税额：<span class="warning">${Number(obj.totaltax).toFixed(2)}</span></div>
                <div class="text">价税合计：<span class="warning">${Number(obj.totalamount).toFixed(2)}</span></div>
            </div>`);
        }
        $preview_bill.html(_html.join(''));
    }

    // 发票预览-发票
    function showPreviewInvoice() {
        const invoiceList = previewInvoiceList[treatmentId];
        const length = invoiceList.length;
        // 防止连续点击出错
        if (previewInvoiceIndex < 0) previewInvoiceIndex = 0;
        if (previewInvoiceIndex >= length) previewInvoiceIndex = length - 1;
        // 切换按钮
        if (previewInvoiceIndex === 0) {
            if (!$preview_prev.hasClass('disabled')) $preview_prev.addClass('disabled');
        } else {
            if ($preview_prev.hasClass('disabled')) $preview_prev.removeClass('disabled');
        }
        if (previewInvoiceIndex === length - 1) {
            if (!$preview_next.hasClass('disabled')) $preview_next.addClass('disabled');
        } else {
            if ($preview_next.hasClass('disabled')) $preview_next.removeClass('disabled');
        }
        const obj = invoiceList[previewInvoiceIndex];
        $preview_invoice.attr('data-info', `发票（${previewInvoiceIndex + 1}/${length}）`);
        // 是否收购票
        // '' '00' 非特殊票种
        // '02' 收购票
        // '06' 抵扣通行费
        // '07' 不抵扣通行费
        // '08' 成品油
        const isAcquisition = obj.specialtype === '02';
        $preview_invoiceType.text(`增值税${INVOICE_TYPES_DICT['k' + obj.invoicetype] || obj.invoicetype}${isAcquisition ? '（收购）' : ''}`);
        $preview_top_buyer.css({ display: isAcquisition ? 'none' : 'flex' });
        $preview_bottom_saler.css({ display: isAcquisition ? 'none' : 'flex' });
        $preview_top_saler.css({ display: isAcquisition ? 'flex' : 'none' });
        $preview_bottom_buyer.css({ display: isAcquisition ? 'flex' : 'none' });

        $preview_buyer.find('.buyername').text(obj.buyername).prop('title', obj.buyername);
        $preview_buyer.find('.buyertaxno').text(obj.buyertaxno).prop('title', obj.buyertaxno);
        $preview_buyer.find('.buyeraddr').text(obj.buyeraddr).prop('title', obj.buyeraddr);
        $preview_buyer.find('.buyerbank').text(obj.buyerbank).prop('title', obj.buyerbank);

        $preview_top_other.eq(0).text(obj.buyerphone).prop('title', obj.buyerphone);
        $preview_top_other.eq(1).text(obj.buyeremail).prop('title', obj.buyeremail);
        $preview_jshjje.text(`￥${Number(obj.totalamount).toFixed(2)}`);

        $preview_saler.find('.salername').text(obj.salername).prop('title', obj.salername);
        $preview_saler.find('.salertaxno').text(obj.salertaxno).prop('title', obj.salertaxno);
        $preview_saler.find('.saleraddr').val(obj.saleraddr).prop('title', obj.saleraddr).prop("disabled", previewDataSave);
        $preview_saler.find('.salerbank').val(obj.salerbank).prop('title', obj.salerbank).prop("disabled", previewDataSave);

        $preview_bz.text(obj.totalamount < 0 && (obj.invoicetype === '028' || obj.invoicetype === '004') ? obj.applyreason : obj.remark);
        $preview_item.eq(4).text(`单价（${obj.hsbz === '1' ? '' : '不'}含税）`);
        $preview_item.eq(5).text(`金额（${obj.hsbz === '1' ? '' : '不'}含税）`);
        const _html = [];
        for (let i = 0; i < obj.items.length; i++) {
            const cur = obj.items[i];
            const xmsl = cur.num ? fpy_toFixedNoZero(cur.num) : '';
            let xmdj = obj.hsbz === '1' ? cur.taxunitprice : cur.unitprice;
            xmdj = xmdj ? fpy_toFixedTwoOrMore(xmdj) : '';
            const xmje = Number(obj.hsbz === '1' ? cur.taxamount : cur.amount).toFixed(2);
            let sl = cur.taxrate && cur.taxrate !== null ? cur.taxrate * 100 + '%' : '';
            sl += cur.taxpremark === '1' && cur.zzstsgl !== '' ? `(${cur.zzstsgl})` : '';
            const se = Number(cur.tax).toFixed(2);
            _html.push(`<div class="line">
                <div class="item truncateText" title="${cur.goodsname}">${cur.goodsname}</div>
                ${cur.rowtype === '1' ? (
                    `<div class="item truncateText" title="${cur.specification}">${cur.specification}</div>
                    <div class="item truncateText" title="${cur.unit}">${cur.unit}</div>`
                ) : (
                    `<div class="item">
                        <input class="searchInput" maxlength="40" name="specification" value="${cur.specification}" title="${cur.specification}" ${previewDataSave ? 'disabled' : ''} autocomplete="off" />
                    </div>
                    <div class="item">
                        <input class="searchInput" maxlength="40" name="unit" value="${cur.unit}" title="${cur.unit}" ${previewDataSave ? 'disabled' : ''} autocomplete="off" />
                    </div>`
                )}
                <div class="item truncateText" title="${xmsl}">${xmsl}</div>
                <div class="item truncateText" title="${xmdj}">${xmdj}</div>
                <div class="item truncateText" title="${xmje}">${xmje}</div>
                <div class="item truncateText" title="${sl}">${sl}</div>
                <div class="item truncateText" title="${se}">${se}</div>
            </div>`);
        }
        $preview_detail.html(_html.join(''));
        $preview_operator.eq(0).text(obj.payee);
        $preview_operator.eq(1).text(obj.reviewer);
        $preview_operator.eq(2).text(obj.drawer);
    }

    // 发票预览-更新头部
    function updatePreviewHeader(hide) {
        let num = '- -';
        let jshj = '- -';
        if (!hide) {
            let _data = [0, 0];
            for (const i in treatmentInvoiceList) {
                const ary = treatmentInvoiceList[i];
                _data = ary.reduce((all, b) => [all[0] + 1, fpy_Add(all[1], b.totalamount)], _data);
            }
            num = _data[0];
            jshj = _data[1];
        }
        $head_preview_value.eq(0).text(`${num}张`);
        if (jshj !== '- -') jshj = fpy_addThousands(jshj.toFixed(2));
        $head_preview_value.eq(1).text(`${jshj}元`);
    }

    // 发票预览-更新明细
    function previewChangeItem(name, value, itemIndex) {
        const invoiceList = previewInvoiceList[treatmentId];
        const { items } = invoiceList[previewInvoiceIndex];
        items[itemIndex][name] = value;
    }

    // 发票预览-根据名称税收分类编码同步明细
    function previewSyncItem(name, itemIndex) {
        const invoiceList = previewInvoiceList[treatmentId];
        const syncItems = invoiceList[previewInvoiceIndex].items;
        const { goodsname, goodscode } = syncItems[itemIndex];
        const names = name.split(',');
        for (let m = 0; m < invoiceList.length; m++) {
            const { items } = invoiceList[m];
            for (let n = 0; n < items.length; n++) {
                if (items[n].rowtype !== '1' && items[n].goodsname === goodsname && items[n].goodscode === goodscode) {
                    for (const key of names) {
                        items[n][key] = syncItems[itemIndex][key];
                        // 当前发票刷新
                        if (previewInvoiceIndex === m) $preview_detail.find('.line').eq(n).find(`input[name=${key}]`).val(items[itemIndex][key]).prop("title", items[itemIndex][key]);
                    }
                }
            }
        }
    }

    // 发票预览-更新发票
    function updatePreviewInvoice(name, value) {
        const invoiceList = previewInvoiceList[treatmentId];
        invoiceList[previewInvoiceIndex][name] = value;
    }

    // 开票结果
    function showResult() {
        resultTotal = 0;
        for (const i in treatmentInvoiceList) {
            resultTotal += treatmentInvoiceList[i].length;
        }
        //const _data = billList.map(o => o.id);
        // 设置头部 发票张数    invoiceid
        $head_result_value.eq(0).text(resultTotal);
        // 开票中显示
        $result_detail.show();
        // 先渲染一次页面
        showProgressTable();
    }

    // 开票结果-进度条Table
    function showProgressTable() {
        // 已开具
        const openedList = resultList.filter(o => o.issuestatus === '0');
        let openedLength = openedList.length;
        openedLength = openedLength >= resultTotal ? resultTotal : openedLength;
        // 更新进度条
        const percent = (openedLength / resultTotal * 100).toFixed(2) + '%';
        $result_progress_percent.css({ width: percent });

        const failList = resultList.filter(o => o.issuestatus === '3');
        $result_progress_text.text(`共${resultTotal}张发票，已开具${openedLength}张，失败${failList.length}张，剩余${resultTotal - openedLength}张`);
        updateResultHeader();
        fpyTable.init({
            id: 'imc_invoiceWorkbench_detail_table',
            rowKey,
            columns: [
                {
                    title: '序号',
                    width: 40,
                    render: () => '<span class="order"><span>'
                },
                {
                    align: 'left',
                    title: '单据编号',
                    dataIndex: 'billno',
                    ellipsis: true,
                    width: 145
                },
                {
                    align: 'left',
                    title: '发票代码',
                    dataIndex: 'invoicecode',
                    width: 100
                },
                {
                    align: 'left',
                    title: '发票号码',
                    dataIndex: 'invoiceno',
                    width: 100
                },
                {
                    align: 'left',
                    title: '价税合计（元）',
                    dataIndex: 'totalamount',
                    ellipsis: true,
                    width: 100,
                    render: t => Number(t).toFixed(2)
                },
                {
                    title: '发票类型',
                    dataIndex: 'invoicetype',
                    render: t => INVOICE_TYPES_DICT['k' + t] || t,
                    width: 100
                },
                {
                    align: 'left',
                    title: '购方名称',
                    dataIndex: 'buyername',
                    ellipsis: true,
                    width: 200
                },
                {
                    title: '开票状态',
                    dataIndex: 'issuestatus',
                    width: 80,
                    render: t => `<span class="${t === '1' ? 'primary' : t === '3' ? 'error' : ''}">${ISSUE_STATUS_DICT['k' + t] || t}</span>`
                },
                {
                    align: 'left',
                    title: '开票说明',
                    dataIndex: 'result',
                    width: 150,
                    render: (t, r) => {
                        return (
                            `<span class="${r.issuestatus === '1' ? 'primary' : r.issuestatus === '3' ? 'error' : ''}" title="${r.issuestatus === '1' ? '正在开票，请勿关闭或刷新页面' : t}">
                                ${r.issuestatus === '1' ? '正在开票，请勿关闭或刷新页面' : t}
                            </span>`
                        );
                    }
                }
            ],
            scroll: resultList.length > 15 ? { y: 365 } : {},
            dataSource: resultList,
            headerColor: '#666',
            headerBgColor: '#eee',
            rowHeight: 26
        });

        // 判断是否开票完成
        if (resultIsComplete) {
            setTimeout(() => {
                $result_progress.hide();
                $result_detail.hide();

                const failList = resultList.filter(o => o.issuestatus === '3');
                const successList = resultList.filter(o => o.issuestatus !== '3');
                const paperInvoiceList = successList.filter(o => o.issuestatus === '0' && (o.invoicetype === '007' || o.invoicetype === '004'));
                // 纸票打印
                if (paperInvoiceList.length) $result_print.show();
                // 一键重开
                if (failList.length) $result_reopen.show();
                showClassTable(failList, successList);
            }, 1000);
        } else {
            resultQueryByTimer(resultOpenType);
        }
    }

    // 开票结果-结果分类
    function resultClass() {
        if (resultOpenType === 'normal') {
            showProgressTable();
        } else {
            const failList = resultList.filter(o => o.issuestatus === '3' || o.issuestatus === '1');
            const successList = resultList.filter(o => !(o.issuestatus === '3' || o.issuestatus === '1'));
            const paperInvoiceList = successList.filter(o => o.issuestatus === '0' && (o.invoicetype === '007' || o.invoicetype === '004'));
            if (resultIsComplete) {
                if (paperInvoiceList.length) $result_print.removeClass('disabled').show();
                if (failList.length) {
                    $result_reopen.removeClass('disabled');
                } else {
                    $result_reopen.hide();
                }
            } else {
                resultQueryByTimer(resultOpenType);
            }
            updateResultHeader();
            showClassTable(failList, successList);
        }
    }


    // 开票结果-分类Table
    function showClassTable(failList, successList) {
        const failNum = failList.length;
        const failJshj = failList.reduce((all, b) => fpy_Add(all, b.totalamount), 0);
        const successNum = successList.length;
        const successJshj = successList.reduce((all, b) => fpy_Add(all, b.totalamount), 0);
        let failScrollNum = 0;
        let successScrollNum = 0;
        if (successNum === 0) {
            failScrollNum = 16;
        } else if (failNum === 0) {
            successScrollNum = 16;
        } else {
            if (successNum <= 9) {
                successScrollNum = successNum;
                failScrollNum = 12 - successNum;
            } else {
                failScrollNum = failNum > 3 ? 3 : failNum;
                successScrollNum = 12 - failScrollNum;
            }
        }
        if (failNum) {
            $result_fail.show();
            fpyTable.init({
                id: 'imc_invoiceWorkbench_fail_table',
                rowKey,
                columns: [
                    {
                        title: '序号',
                        width: 40,
                        render: () => '<span class="order"><span>'
                    },
                    {
                        align: 'left',
                        title: '单据编号',
                        dataIndex: 'billno',
                        ellipsis: true,
                        width: 150
                    },
                    {
                        align: 'left',
                        title: '价税合计（元）',
                        dataIndex: 'totalamount',
                        ellipsis: true,
                        width: 100,
                        render: t => Number(t).toFixed(2)
                    },
                    {
                        title: '发票类型',
                        dataIndex: 'invoicetype',
                        render: t => INVOICE_TYPES_DICT['k' + t] || t,
                        width: 100
                    },
                    {
                        align: 'left',
                        title: '购方名称',
                        dataIndex: 'buyername',
                        ellipsis: true,
                        width: 200
                    },
                    {
                        align: 'left',
                        title: '开票状态',
                        dataIndex: 'issuestatus',
                        width: 80,
                        render: t => `<span class="${t === '1' ? 'primary' : t === '3' ? 'error' : ''}">${ISSUE_STATUS_DICT['k' + t] || t}</span>`
                    },
                    {
                        align: 'left',
                        title: '开票说明',
                        dataIndex: 'result',
                        width: 150,
                        render: (t, r) => {
                            return (
                                `<span class="${r.issuestatus === '1' ? 'primary' : r.issuestatus === '3' ? 'error' : ''}" title="${r.issuestatus === '1' ? '正在开票，请勿关闭或刷新页面' : t}">
                                    ${r.issuestatus === '1' ? '正在开票，请勿关闭或刷新页面' : t}
                                </span>`
                            );
                        }
                    },
                    {
                        align: 'center',
                        title: '操作',
                        dataIndex: 'id',
                        width: 80,
                        render: (t, r) => r.issuestatus === '3' ? `<a href="javascript:;" data-key="${t}">重新开票</a>` : ''
                    }
                ],
                scroll: failNum > failScrollNum ? { y: failScrollNum * 26 + 1 } : {},
                dataSource: failList,
                headerColor: '#666',
                headerBgColor: '#eee',
                rowHeight: 26
            });
            $result_fail.find('.text').text(`（共${failNum}张，合计：${failJshj.toFixed(2)}元）`);
            const dom = $result_fail.find('.workbench-scroll');
            dom.scrollTop(dom.find('table').height());
        } else {
            $result_fail.hide();
        }
        if (successNum) {
            $result_success.show();
            fpyTable.init({
                id: 'imc_invoiceWorkbench_success_table',
                rowKey,
                columns: [
                    {
                        title: '序号',
                        width: 40,
                        render: () => '<span class="order"><span>'
                    },
                    {
                        align: 'left',
                        title: '单据编号',
                        dataIndex: 'billno',
                        ellipsis: true,
                        width: 150
                    },
                    {
                        align: 'center',
                        title: '发票代码',
                        dataIndex: 'invoicecode',
                        width: 100
                    },
                    {
                        align: 'center',
                        title: '发票号码',
                        dataIndex: 'invoiceno',
                        width: 100
                    },
                    {
                        align: 'left',
                        title: '价税合计（元）',
                        dataIndex: 'totalamount',
                        ellipsis: true,
                        width: 100,
                        render: t => Number(t).toFixed(2)
                    },
                    {
                        title: '发票类型',
                        dataIndex: 'invoicetype',
                        render: t => INVOICE_TYPES_DICT['k' + t] || t,
                        width: 100
                    },
                    {
                        align: 'left',
                        title: '购方名称',
                        dataIndex: 'buyername',
                        ellipsis: true,
                        width: 200
                    },
                    {
                        title: '开票状态',
                        dataIndex: 'issuestatus',
                        width: 80,
                        render: t => `<span class="success">${ISSUE_STATUS_DICT['k' + t] || t}</span>`
                    }
                ],
                scroll: successNum > successScrollNum ? { y: successScrollNum * 26 + 1 } : {},
                dataSource: successList,
                headerColor: '#666',
                headerBgColor: '#eee',
                rowHeight: 26
            });
            $result_success.find('.text').text(`（共${successNum}张，合计：${successJshj.toFixed(2)}元）`);
        } else {
            $result_success.hide();
        }
    }

    // 开票结果-更新头部
    function updateResultHeader() {
        const successList = resultList.filter(o => o.issuestatus === '0');
        const jshj = successList.reduce((all, b) => fpy_Add(all, b.totalamount), 0);
        $head_result_value.eq(0).text(`${successList.length}张`);
        $head_result_value.eq(1).text(`${fpy_addThousands(jshj.toFixed(2))}元`);
        $head_result_value.eq(2).text(`${resultCreditQuota || '- -'}元`);
    }

    // 开票结果-查询
    function resultQueryByTimer(type = 'normal') {
        // 是否处理完成
        resultIsComplete = false;
        resultOpenType = type;
        // 重开轮询
        clearInterval(resultTimer);
        resultTimer = setTimeout(() => {
			let request = {
                doTaskFlag: resultOpenType === 'invoicePrint' ? 'invoicePrint' : 'issueInvoice', // 操作标识
				"billpks": billList.map(o => o.id),
				"invoiceid": invoiceid
			};
            model.invoke("issue/showDetail", request);
        }, 3000);
    }

    // 公共确认弹窗回调
    function commonConfirmCallback(data) {
        const { key, isOk, name, index } = data;
        if (isOk) {
            switch(key) {
            case 'preview_sync_item':
                previewSyncItem(name, index);
                break;
            default:
                break;
            }
        }
    }

    // 退出工作台
    $workbench.on('click', '.quit', function() {
        // 清除计时器 避免开票中关闭弹窗导致内存泄漏
        clearInterval(resultTimer);
        let request = {
            "pks": billList.map(o => o.id),
            "curIndex": curIndex,
			"resultIsComplete" : resultIsComplete
        };
        model.invoke("close", request);
    });

    // 开票申请单-输入 非input[type=text]在低版本谷歌浏览器中不支持input
    $bill.on('input change', '.searchForm input', function() {
        const name = $(this).prop('name');
        const value = fpy_escapeString($(this).val()).trim();
        if ($(this).prop('type') !== 'checkbox') {
            $(this).val(value);
            billParam[name] = value;
        } else {
            billParam[name] = $(this).is(':checked');
        }
    });

    // 开票申请单-失去焦点
    $bill.on('blur', '.searchForm .searchInput', function() {
        showBillTable();
    });

    // 开票申请单-下拉选择
    $bill.on('change', '.searchForm select', function() {
        const name = $(this).prop('name');
        const value = $(this).val();
        billParam[name] = value;
        // 切换设备编号
        if (name === 'deviceNo') model.invoke("bill/changeJqbh", value);
    });

    // 开票申请单-查询
    $bill.on('click', '.searchForm .btn', function() {
        showBillTable();
    });

    // 开票申请单-table点击
    $bill_table.on('click', 'tbody tr', function(e) {
        if ($(e.target).is('a')) {
            const key = $(e.target).attr('data-key');
            const name = $(e.target).attr('data-name');
            switch (name) {
            case 'detail':
                model.invoke("bill/showOriginalBill", key);
                break;
            case 'del':
                billList.splice(key, 1);
                showBillTable();
                updateBillHeader();
                break;
            default:
                break;
            }
        }
    });

    // 开票申请单-下一步
    $bill.find('.footer').on('click', '.next', function() {
        const ids = billList.map(o => o.id);

        var request = {
            "mergeBill": billParam["billMerger"],
            "mergeBillDetail": billParam["itemMerger"],
            "deviceNo": billParam["deviceNo"],
            "currentAccount": billParam["currentAccount"],
            terminalNo: billParam.terminalNo,
            "pks": ids
        };
        model.invoke("bill/mergebill", request)
    });

    // 单据明细处理-下拉选择
    $treatment.on('change', '.searchForm select', function() {
        const name = $(this).prop('name');
        const value = $(this).val();
        billParam[name] = value;
        // 切换设备编号
        if (name === 'deviceNo') model.invoke("bill/changeJqbh", value);
    });

    $treatment_selectAll.on('click', function() {
        const checked = $(this).is(':checked');
        updateAllTreatmentInvoiceItems(checked);
        updateAllTreatmentRemainingItems(checked);
    })


    // 单据明细处理-选择单据 确认选取 复选框
    // 为兼容js单线程无法同时触发blur与click事件，改用mouseup
    $treatment_bill.on('mouseup', '.item', function(e) {
        const treatmentIndex = $(this).index();
        const { id: billId } = treatmentShowBillList[treatmentIndex];
        if ($(e.target).is('input')) {
            let _selectedRowKeys = treatmentRemainingItems[billId].selectedRowKeys;
            const remainingItems = treatmentRemainingItems[billId].items;
            const type = $(e.target).attr('data-type');
            // click事件中checked是点击后的状态 mousedown事件与mouseup事件中checked是点击前的状态
            const checked = !$(e.target).is(':checked');
            const disabled = $(e.target).prop('disabled');
            const itemIndex = $(e.target).parents('tr').index();
            if (!disabled) {
                // 复选框
                if (type === 'all') {
                    // 记录需更新的key
                    let keys = [];
                    if (checked) {
                        for (let o of remainingItems) {
                            if (!_selectedRowKeys.includes(o.id)) {
                                keys.push(o.id);
                                _selectedRowKeys.push(o.id)
                            }
                        }
                    } else {
                        keys = _selectedRowKeys;
                        _selectedRowKeys = [];
                    }
                    treatmentRemainingItems[billId].selectedRowKeys = _selectedRowKeys;
                    updateTreatmentInvoiceItems(billId, keys, checked, 'all');
                } else {
                    const id = remainingItems[itemIndex][rowKey];
                    // 记录需更新的key
                    const keys = [id];

                    if (checked) {
                        _selectedRowKeys.push(id);
                    } else {
                        const cur = _selectedRowKeys.indexOf(id);
                        _selectedRowKeys.splice(cur, 1);
                    }
                    // 判断是否有折扣行
                    const discountLine = remainingItems[itemIndex + 1];
                    if (discountLine && discountLine.rowtype === '1') {
                        const id = discountLine[rowKey];
                        // 记录需更新的key
                        keys.push(id);

                        if (checked) {
                            _selectedRowKeys.push(id);
                        } else {
                            const cur = _selectedRowKeys.indexOf(id);
                            _selectedRowKeys.splice(cur, 1);
                        }
                    }
                    treatmentRemainingItems[billId].selectedRowKeys = _selectedRowKeys;
                    updateTreatmentInvoiceItems(billId, keys, checked, itemIndex);
                }
            }
        }
    });

    // 单据明细处理-输入 非input[type=text]在低版本谷歌浏览器中不支持input
    $treatment_invoice.on('input change', 'input', function() {
        const itemIndex = $(this).parents('tr').index();
        const name = $(this).prop('name');
        const type = $(this).prop('type');
        const maxlength = $(this).prop('maxlength');
        let value = type === 'checkbox' ? $(this).is(':checked') : fpy_escapeString($(this).val());
        // 输入校验
        switch (name) {
        case 'buyername':
        case 'buyeraddr':
        case 'buyerbank':
            value = fpy_getTextByMaxLength(value, maxlength);
            break;
        case 'buyertaxno':
            value = fpy_getTextByMaxLength(value.fpy_toUpperLetterNum(), maxlength);
            break;
        case 'buyerphone':
        case 'infocode':
        case 'originalinvoicecode':
        case 'originalinvoiceno':
            value = fpy_getTextByMaxLength(value.fpy_onlyNum(), maxlength);
            break;
        case 'buyeremail':
            value = fpy_getTextByMaxLength(value.fpy_onlyEmali(), maxlength);
            break;
        case 'inventorymark':
            value = value ? '1' : '0';
            break;
        case 'billMerger':
            billParam[name] = value;
            break;
        case 'goodsname':
        case 'specification':
        case 'unit':
            value = fpy_getTextByMaxLength(value, maxlength);
            updateTreatmentEditItems(name, value, itemIndex);
            break;
        case 'num':
            if (treatmentIsEdit) {
                treatmentEditXmsl(value, itemIndex);
            } else {
                treatmentChangeXmsl(value, itemIndex);
            }
            break;
        case 'unitprice':
        case 'taxunitprice':
            treatmentEditXmdj(value, itemIndex);
            break;
        case 'amount':
            treatmentEditXmje(value, itemIndex);
            break;
        case 'taxamount':
            if (treatmentIsEdit) {
                treatmentEditXmje(value, itemIndex);
            } else {
                treatmentChangeJshjje(value, itemIndex);
            }
            break;
        default:
            break;
        }
        if (treatmentInvoiceField.includes(name)) {
            $(this).val(value);
            const treatmentInvoice = treatmentInvoiceList[treatmentId][0];
            treatmentInvoice[name] = value;
        }
    });

    // 单据明细处理-输入失去焦点 去除前后空格
    $treatment_invoice.on('blur', '.searchInput', function() {
        const itemIndex = $(this).parents('tr').index();
        const treatmentInvoice = treatmentInvoiceList[treatmentId][0];
        const invoicetype = treatmentInvoice.invoicetype;
        const name = $(this).prop('name');
        const type = $(this).prop('type');
        const value = $(this).val().trim();
        if (type === 'text') {
            // 错误提示
            switch (name) {
            case 'buyername':
                if (!value) model.invoke("common/tip", '请输入购方名称！');
                break;
            case 'buyertaxno':
                if ((invoicetype === '028' || invoicetype === '004') && !value) model.invoke("common/tip", '请输入纳税人识别号！');
                break;
            case 'buyeraddr':
                if ((invoicetype === '028' || invoicetype === '004') && !value) model.invoke("common/tip", '请输入地址及电话！');
                break;
            case 'buyerbank':
                if ((invoicetype === '028' || invoicetype === '004') && !value) model.invoke("common/tip", '请输入开户行及账号！');
                break;
            case 'buyeremail':
                if (value) {
                    const emails = value.split(';').filter(o => o);
                    if (emails.length > 3) {
                        model.invoke("common/tip", '邮箱不能超过3个!');
                    }
                    for (const o of emails) {
                        if (o && !o.fpy_isEmail()) model.invoke("common/tip", '请输入正确的邮箱！');
                    }
                }
                break;
            case 'buyerphone':
                if (value && !value.fpy_isPhone()) model.invoke("common/tip", '请输入正确的手机号码！');
                break;
            case 'goodsname':
            case 'specification':
            case 'unit':
                updateTreatmentEditItems(name, value, itemIndex);
                break;
            case 'num':
                if (treatmentIsEdit) {
                    treatmentEditBlurXmsl(value, itemIndex);
                } else {
                    treatmentBlurXmsl(value, itemIndex);
                }
                break;
            case 'unitprice':
            case 'taxunitprice':
                treatmentEditBlurXmdj(value, itemIndex);
                break;
            case 'amount':
                treatmentEditBlurXmje(value, itemIndex);
                break;
            case 'taxamount':
                if (treatmentIsEdit) {
                    treatmentEditBlurXmje(value, itemIndex);
                } else {
                    treatmentBlurJshjje(value, itemIndex);
                }
                break;
            case 'tax':
                treatmentEditBlurSe(value, itemIndex);
                break;
            default:
                break;
            }
            if (treatmentInvoiceField.includes(name)) {
                $(this).val(value);
                treatmentInvoice[name] = value;
            }
        }
    });

    // 单据明细处理-输入textarea
    $treatment_invoice.on('input', 'textarea', function() {
        const name = $(this).prop('name');
        const maxlength = $(this).prop('maxlength');
        let value = fpy_escapeString($(this).val());
        // 输入校验
        switch (name) {
        case 'remark':
        case 'applyreason':
            value = fpy_getTextByMaxLength(value, maxlength);
            break;
        default:
            break;
        }
        $(this).val(value);
        const treatmentInvoice = treatmentInvoiceList[treatmentId][0];
        treatmentInvoice[name] = value;
    });

    // 单据明细处理-输入textarea失去焦点 去除前后空格
    $treatment_invoice.on('blur', 'textarea', function() {
        const name = $(this).prop('name');
        const value = $(this).val().trim();
        $(this).val(value);
        const treatmentInvoice = treatmentInvoiceList[treatmentId][0];
        treatmentInvoice[name] = value;
    });

    // 单据明细处理-编辑税率select
    $treatment_invoice.on('change', 'select', function() {
        const itemIndex = $(this).parents('tr').index();
        const value = $(this).val();
        treatmentEditChangeSl(value, itemIndex);
    });

    // 单据明细处理-选择发票类型 下一个版本支持
    // $treatment_invoice.on('click', '.invoiceType', function () {
    //     const invoiceIndex = $(this).parents('.item').index();
    //     const value = $(this).attr('data-key');
    //     console.log('选择发票类型', value);
    // });

    // 单据明细处理-发票信息搜索
    $treatment_invoice.on('click', '.search-btn', function() {
        const invoiceIndex = $(this).parents('.item').index();
        const name = $(this).attr('data-name');
        const disabled = $(this).hasClass('disabled');
        if (!disabled) {
            const obj = treatmentInvoiceList[treatmentId][invoiceIndex];
            let request = {
                "treatmentInvoiceList": treatmentInvoiceList,
                "thisinvoceid": treatmentId,
                "invoiceindex": invoiceIndex,
                "buyertaxno": obj.buyertaxno,
                "disabled": disabled,
                "applicant": obj.applicant,
                "invoicetype": obj.invoicetype,
                "invoiceamount": obj.invoiceamount,
                "totaltax": obj.totaltax,
                "billNoMap": billNoMap,
                "jqbh": billParam.deviceNo,
                terminalNo: billParam.terminalNo,
                "infocodechoose" : infocodechoose
            }
            if (name === "buyername") {
                model.invoke("process/openbuyerlist", { billId: treatmentId, index: invoiceIndex });
            } else if (name === "infocode") {
                model.invoke("process/openredinfolist", request);
            } else if (name === "originalinvoicecode") {
                model.invoke("process/openblueinfolist", request);
            } else if (name === 'goodsname') {
                const index = $(this).parents('tr').index();
                model.invoke("process/queryGoods", {
                    xmmc: treatmentEditItems[index].goodsname
                });
            }
        }
    });

    // 单据明细处理-发票信息搜索
    $treatment_invoice.on('keypress', '.pressEnter', function(event) {
        if (event.keyCode === 13) {
            const invoiceIndex = $(this).parents('.item').index();
            const name = $(this).prop('name');
            const disabled = $(this).prop('disabled');
            if (!disabled) {
                const obj = treatmentInvoiceList[treatmentId][invoiceIndex];
                let request = {
                    "treatmentInvoiceList": treatmentInvoiceList,
                    "thisinvoceid": treatmentId,
                    "invoiceindex": invoiceIndex,
                    "buyertaxno": obj.buyertaxno,
                    "disabled": disabled,
                    "applicant": obj.applicant,
                    "invoicetype": obj.invoicetype,
                    "invoiceamount": obj.invoiceamount,
                    "totaltax": obj.totaltax,
                    "billNoMap": billNoMap,
                    "jqbh": billParam.deviceNo,
                    terminalNo: billParam.terminalNo,
                    "infocodechoose" : infocodechoose
                }
                if (name === "buyername") {
                    model.invoke("process/openbuyerlist", request);
                } else if (name === "infocode") {
                    model.invoke("process/openredinfolist", request);
                } else if (name === "originalinvoicecode") {
                    model.invoke("process/openblueinfolist", request);
                } else if (name === 'goodsname') {
                    const index = $(this).parents('tr').index();
                    model.invoke("process/queryGoods", {
                        xmmc: treatmentEditItems[index].goodsname
                    });
                }
            }
        }
    });

    // 单据明细处理-发票明细删除
    $treatment_invoice.on('click', '.del', function() {
        const itemIndex = $(this).parents('tr').index();
        treatmentDeleteItem(itemIndex);
    });

    // 单据明细处理-发票编辑
    $treatment_invoice.on('click', '.edit', function() {
        let isFullAmount = true;
        for (const i in treatmentRemainingItems) {
            const obj = treatmentRemainingItems[i];
            if (obj.selectedRowKeys.length !== obj.items.length) {
                isFullAmount = false;
                break;
            }
        }
        if (!isFullAmount) {
            model.invoke("common/tip", '未全额选取开票，不能编辑！');
            return;
        }
        let billIds = [];
        for (let i = 0; i < billList.length; i++){
            billIds.push(billList[i].id);
        }
        model.invoke("process/checkEdit", billIds);
    });

    // 单据明细处理-增行
    $treatment_invoice.on('click', '.addLine', function() {
        const data = {
            amount: '', // 金额
            billId: '', // 单据id
            billItemId: '', // 单据明细id
            billNo: '', // 单据编号
            billsourceid: '', // 单据来源id
            discountamount: 0, // 忽略
            discountrate: 0, // 忽略
            goodscode: '', // 税收分类编码
            goodsname: '', // 商品名称
            id: 'items' + fpy_getUUId(), // 明细id
            num: '', // 数量
            rowtype: '0', // 行性质
            seq: 0, // 忽略
            simplegoodsname: '', // 商品简称
            spbm: '', // spbm
            specification: '', // 规格型号
            tax: '', // 税额
            taxamount: '', // 价税合计
            taxflag: '0', // 忽略
            taxpremark: '0', // policylogo 优惠政策标识
            taxrate: '0.13', // 税率
            taxunitprice: '', // 含税单价
            unit: '', // 单位
            unitprice: '', // 单价
            zerotaxmark: '', // 忽略
            zxbm: '', // 忽略
            zzstsgl: '' // policycontants 优惠政策内容
        };
        treatmentHadEdit = true;
        treatmentEditItems.push(data);
        showTreatmentInvoiceDetailEdit(true);
    });

    // 单据明细处理-增加折扣行
    $treatment_invoice.on('click', '.addDiscountLine', function() {
        if (treatmentEditIndex === '') {
            model.invoke("common/tip", '请先选择发票明细！');
            return;
        }
        const line = treatmentEditItems[treatmentEditIndex];
        if (line.rowtype !== '0') {
            model.invoke("common/tip", '当前行不是正常行！');
        } else if (!line.goodscode) {
            model.invoke("common/tip", '被折扣行请选择税收分类编码！');
        } else if (line.amount <= 0) {
            model.invoke("common/tip", '被折扣行金额不能小于等于0！');
        } else {
            // 将当前改为被折扣行
            line.rowtype = '2';
            const data = {
                amount: '', // 金额
                billId: '', // 单据id
                billItemId: '', // 单据明细id
                billNo: '', // 单据编号
                billsourceid: '', // 单据来源id
                discountamount: 0, // 忽略
                discountrate: 0, // 忽略
                goodscode: line.goodscode, // 税收分类编码
                goodsname: line.goodsname, // 商品名称
                id: 'items' + fpy_getUUId(), // 明细id
                num: '', // 数量
                rowtype: '1', // 行性质
                seq: 0, // 忽略
                simplegoodsname: line.simplegoodsname, // 商品简称
                spbm: '', // spbm
                specification: line.specification, // 规格型号
                tax: '', // 税额
                taxamount: '', // 价税合计
                taxflag: '0', // 忽略
                taxpremark: line.taxpremark, // policylogo 优惠政策标识
                taxrate: line.taxrate, // 税率
                taxunitprice: '', // 含税单价
                unit: '', // 单位
                unitprice: '', // 单价
                zerotaxmark: '', // 忽略
                zxbm: '', // 忽略
                zzstsgl: line.zzstsgl // policycontants 优惠政策内容
            };
            treatmentHadEdit = true;
            treatmentEditItems.splice(treatmentEditIndex + 1, 0, data);
            showTreatmentInvoiceDetailEdit(true);
        }
    });

    // 单据明细处理-删行
    $treatment_invoice.on('click', '.deleteLine', function() {
        if (treatmentEditIndex !== '') {
            const cur = treatmentEditItems[treatmentEditIndex];
            if (cur.rowtype === '0') {
                treatmentEditItems.splice(treatmentEditIndex, 1);
            } else if (cur.rowtype === '1') {
                // 将被折扣行改为正常行
                treatmentEditItems[treatmentEditIndex - 1].rowtype = '0';
                treatmentEditItems.splice(treatmentEditIndex, 1);
            } else {
                treatmentEditItems.splice(treatmentEditIndex, 2);
            }
            treatmentHadEdit = true;
            showTreatmentInvoiceDetailEdit(true);
            updateTreatmentInvoiceDetailEditTotal();
            const length = treatmentEditItems.length;
            const _treatmentEditIndex = length ? treatmentEditIndex >= length ? length - 1 : treatmentEditIndex : '';
            treatmentEditIndex = _treatmentEditIndex;
        } else {
            model.invoke("common/tip", '请先选择发票明细！');
        }
    });

    // 单据明细处理-发票明细选中
    $treatment_invoice.on('click', 'tbody tr', function() {
        $(this).css('background', '#E6F7FF').siblings().css('background', 'unset');
        treatmentEditIndex = $(this).index();
    });

    // 单据明细处理-取消
    $treatment.find('.footer').on('click', '.cancel', function() {
        treatmentIsEdit = false;
        showTreatmentBill();
        showTreatmentInvoice();
        showTreatmentFooter();
    });

    // 单据明细处理-上一步
    $treatment.find('.footer').on('click', '.prev', function() {
        const disabled = $(this).hasClass('disabled');
        if (!disabled) {
            let request = {
                "pks": billList.map(o => o.id)
            };
            model.invoke("process/prestep", request);
        }
    });

    // 单据明细处理-下一步
    $treatment.find('.footer').on('click', '.next', function() {
        const treatmentInvoice = treatmentInvoiceList[treatmentId][0];
        const { id, buyername, buyertaxno, buyeraddr, buyerbank, invoiceamount, invoicetype, items } = treatmentInvoice;
        if (id) {
            if (!buyername) {
                // common/tip
                model.invoke("common/tip",'请输入购方名称！');
                return;
            }
            if ((invoicetype === '028' || invoicetype === '004') && !buyertaxno) {
                // common/tip
                model.invoke("common/tip",'请输入纳税人识别号！');
                return;
            }
            if ((invoicetype === '028' || invoicetype === '004') && !buyeraddr) {
                // common/tip
                model.invoke("common/tip",'请输入地址及电话！');
                return;
            }
            if ((invoicetype === '028' || invoicetype === '004') && !buyerbank) {
                // common/tip
                model.invoke("common/tip",'请输入开户行及账号！');
                return;
            }
            if (invoiceamount <= 0) {
                // common/tip
                model.invoke("common/tip",'所选发票金额必须为正，请重新处理！');
                return;
            }
            const { isOverLimit, quota } = testForOverLimit(invoiceamount, invoicetype);
            if (isOverLimit) {
                // common/tip
                model.invoke("common/tip", `待开发票已超过发票限额${quota}，请修改！`);
                return;
            }

            // 数据缓存
            if (treatmentIsEdit) sessionStorage.setItem('partiallyOpen-treatmentItems', JSON.stringify(items))

            // 数据处理
            const _treatmentInvoice = {
                ...treatmentInvoice,
                items: treatmentIsEdit ? treatmentEditItems : items
            };

            // 赋值
            treatmentInvoiceList = { [treatmentId]: [_treatmentInvoice] };
            // 生成关联关系
            const _invoiceList = treatmentInvoiceList[treatmentId];
            let _invoiceRelationMap = [];
            for (let m = 0; m < _invoiceList.length; m++) {
                const _invoice = _invoiceList[m];
                _invoiceRelationMap = _invoiceRelationMap.concat(_invoice.items.map(o => {
                    return {
                        "sbillid": o.billId, // 单据id
                        "sbillno": o.billNo,
                        "sdetailid": o.billItemId, // 单据明细id
                        "tbillid": _invoice.id, // 发票id
                        "tbillno": o.billNo, // 目标单单据编号
                        "tdetailid": o.id, // 发票明细id
                        "amount": o.amount,
                        "tax": o.tax,
                        "num": o.num,
                        "price": o.unitprice,
                        "ttable": "sim_vatinvoice", // 目标单类型， 发票为sim_vatinvoice
                        "pushtype": "1" // 下推类型， 1下推，-1关联
                    };
                }));
            }
            treatmentInvoiceRelationMap[treatmentId] = _invoiceRelationMap;
            // 未选取的单据
            const unSelectedBill = [];
            for (let i = 0; i < treatmentShowBillList.length; i++) {
                const remainingItems = treatmentRemainingItems[treatmentShowBillList[i][rowKey]].items;
                let hadSelected = false;
                for (let i = 0; i < remainingItems.length; i++) {
                    // 存在选取
                    if (remainingItems[i].originalJshjje != remainingItems[i].remainvalidamount) {
                        hadSelected = true;
                        break;
                    }
                }
                if (!hadSelected) unSelectedBill.push(treatmentShowBillList[i].billno);
            }
            if (unSelectedBill.length) {
				// 弹窗提示
                model.invoke("common/tip", `单据${unSelectedBill.join('，')}未选取明细!`);
            }

            let billIds = [];
            for (let i = 0; i < billList.length; i++){
                billIds.push(billList[i].id);
            }
			let request = {
				"mergeBill": billParam["billMerger"],
				"data": treatmentInvoiceList,
                "invRealtion": treatmentInvoiceRelationMap,
                "billIds" : billIds,
                "jqbh" : billParam.deviceNo,
                "currentAccount" : billParam.currentAccount,
                terminalNo: billParam.terminalNo,
                treatmentHadEdit
            };
            if (treatmentIsEdit) {
                model.invoke("process/nextStep", request);
            } else {
                model.invoke("process/processnextstep", request);
            }
        } else {
            // common/tip
            model.invoke("common/tip", '请选择左侧明细生成发票！');
        }
    });

    // 发票预览-输入获取焦点 记录初始值
    $preview_invoice.on('focus', '.searchInput', function() {
        inputFocusValue = $(this).val();
    });

    // 发票预览-输入 非input[type=text]在低版本谷歌浏览器中不支持input
    $preview_invoice.on('input change', '.searchInput', function() {
        const name = $(this).prop('name');
        const type = $(this).prop('type');
        const maxlength = $(this).prop('maxlength');
        let value = type === 'checkbox' ? $(this).is(':checked') : $(this).val();
        // 输入校验
        switch (name) {
        case 'saleraddr':
        case 'salerbank':
            value = fpy_getTextByMaxLength(value, maxlength);
            updatePreviewInvoice(name, value);
            break;
        case 'specification':
        case 'unit':
            const itemIndex = $(this).parents('.line').index();
            value = fpy_getTextByMaxLength(value, maxlength);
            previewChangeItem(name, value, itemIndex);
            break;
        default:
            break;
        }
        if (type === 'text') $(this).val(value).prop("title", value);
    });

    // 发票预览-输入失去焦点 去除前后空格inputFocusValue
    $preview_invoice.on('blur', '.searchInput', function() {
        const name = $(this).prop('name');
        const type = $(this).prop('type');
        const value = $(this).val().trim();
        if (type === 'text') {
            // 错误提示
            switch (name) {
            case 'saleraddr':
            case 'salerbank':
                updatePreviewInvoice(name, value);
                break;
            case 'specification':
            case 'unit':
                const itemIndex = $(this).parents('.line').index();
                previewChangeItem(name, value, itemIndex);
                if (inputFocusValue !== value) {
                    const invoiceList = previewInvoiceList[treatmentId];
                    const { items } = invoiceList[previewInvoiceIndex];
                    const { goodsname, goodscode } = items[itemIndex];
                    // 检测是否需要同步
                    let needShowConfirm = 0;
                    needShowConfirm:
                    for (let m = 0; m < invoiceList.length; m++) {
                        const { items } = invoiceList[m];
                        for (let n = 0; n < items.length; n++) {
                            if (items[n].rowtype !== '1' && items[n].goodsname === goodsname && items[n].goodscode === goodscode) needShowConfirm++;
                            if (needShowConfirm > 1 && !confirmLoading) {
                                confirmLoading = true;
                                model.invoke("common/show_confirm", { key: 'preview_sync_item', content: '修改信息是否应用于其它项目名称相同的明细？', name, index: itemIndex });
                                break needShowConfirm;
                            }
                        }
                    }
                }
                break;
            default:
                break;
            };
            $(this).val(value).prop("title", value);
        }
    });

    // 单据明细处理-发票信息搜索
    $preview_invoice.on('click', '.search-btn', function() {
        if (!previewDataSave) {
            const invoiceList = previewInvoiceList[treatmentId];
            model.invoke("preview/change_saler_address", { salertaxno: invoiceList[previewInvoiceIndex].salertaxno });
        }
    });

    // 发票预览-上一步
    $preview.find('.footer').on('click', '.prev', function() {
        if (previewDataSave) {
            var requst = {
                "previewDataSave": previewDataSave,
            };
            model.invoke("preview/previewback", requst)
        } else {
            updatePreviewHeader(true);
            setCurrentDisplay(1);
        }
    });

    // 发票预览-保存数据
    $preview.find('.footer').on('click', '.save', function() {
        const disabled = $(this).hasClass('disabled');
            if (!disabled) {
            var requst = {
                "treatmentShowBillList": treatmentShowBillList,
                "billNoMap": billNoMap,
                "invoices": previewInvoiceList,
                "splitrule": treatmentSplitRule,
                "invBill": billList,
                "previewDataSave": previewDataSave,
                "invRealtion": treatmentInvoiceRelationMap,
                "jqbh": billParam.deviceNo,
                "currentAccount": billParam.currentAccount,
                terminalNo: billParam.terminalNo
            };
            $(this).addClass('disabled').next().addClass('disabled');
            model.invoke("preview/save_data", requst)
        }
    });

    // 发票预览-确认开票
    $preview.find('.footer').on('click', '.next', function() {
        const disabled = $(this).hasClass('disabled');
        if (!disabled) {
            var requst = {
                "treatmentShowBillList": treatmentShowBillList,
                "billNoMap": billNoMap,
                "invoices": previewInvoiceList,
                "previewDataSave": previewDataSave,
                "splitrule": treatmentSplitRule,
                "invBill": billList,
                "invRealtion": treatmentInvoiceRelationMap,
                "jqbh": billParam.deviceNo,
                "currentAccount": billParam.currentAccount,
                terminalNo: billParam.terminalNo
            };
            $(this).addClass('disabled').prev().addClass('disabled');
            model.invoke("preview/confirm_issues", requst)
        }
    });

    // 开票结果-重新开票
    $result_fail.on('click', 'a', function() {
        const key = $(this).attr('data-key');
        $result_print.addClass('disabled');
        model.invoke("issue/reIssue", [key]);
        resultQueryByTimer('reopen');
    });

    // 开票结果-纸票一键打印
    $result.find('.footer').on('click', '.print', function() {
        const disabled = $(this).hasClass('disabled');
        if (!disabled) {
            const _data = resultList.map(o => o.id);
            model.invoke("issue/paperInvPrint", _data);
        }
    });

    // 开票结果-一键重开
    $result.find('.footer').on('click', '.reopen', function() {
        const disabled = $(this).hasClass('disabled');
        if (!disabled) {
            const _data = resultList.filter(o => o.issuestatus === '3').map(o => o.id);
            $result_print.addClass('disabled');
            $result_reopen.addClass('disabled');
            model.invoke("issue/reIssue", _data);
            resultQueryByTimer('reopen');
        }
    });

    this.initPartiallyOpen = function (_model, props) {
        var popsData = {};
        if (props != null && props.data != null) {
            popsData = props.data;
        }
        model = _model;
        initEvent(model, props);
        setInitData(popsData);
    };

    this.updatePartiallyOpen = function (_model, props) {
        model = _model;
        var popsData = {};
        if (props != null && props.data != null) {
            popsData = props.data;
        }
        var eventKey = popsData["eventKey"];
        switch (eventKey) {
            case "bill/mergebill":
                treatmentShowBillList = formatTreatmentBill(popsData.mergeBill.bills || []);
                treatmentInvoiceList = popsData.invoiceList;
                treatmentInvoiceRelationMap = popsData.invoiceRelationMap;
                billNoMap = popsData.billNoMap;
                billList = popsData.bills;
                setCurrentDisplay(1);
                break;
            case "process/prestep":
                updateTreatmentHeader(true);
                setCurrentDisplay(0);
                break;
            case "process/openbuyerlist":
                if (popsData.errCode === '0000') {
                    const { billId, index, name, taxno, addr, openingbank, email, mobilephone } = popsData;
                    // todo回填抬头信息
                    treatmentInvoiceList[billId][index].buyername = name || '';
                    treatmentInvoiceList[billId][index].buyertaxno = taxno || '';
                    treatmentInvoiceList[billId][index].buyeraddr = addr || '';
                    treatmentInvoiceList[billId][index].buyerbank = openingbank || '';
                    treatmentInvoiceList[billId][index].buyeremail = email || '';
                    treatmentInvoiceList[billId][index].buyerphone = mobilephone || '';
                    showTreatmentInvoice();
                }
                break;
            case "process/changeSplitRule":
                // 无
                updateTreatmentBill(treatmentIndex, 'splitrule', popsData.ruleCode);
                showTreatmentBill();
                updateTreatmentHeader();
                showTreatmentSolutions();
                treatmentInvoiceList = {...treatmentInvoiceList, ...popsData["invoiceList"]};
                treatmentInvoiceRelationMap = {...treatmentInvoiceRelationMap, ...popsData["invoiceRelationMap"]};
                showTreatmentInvoice();
				if("undefined" != typeof popsData.infocodechoose && "" != popsData.infocodechoose){
					infocodechoose = popsData.infocodechoose;
				}
                break;
            case "issue/showDetail":
                if (popsData.errCode === '0000') {
                    resultList = popsData.result;
                    resultIsComplete = popsData.isComplete;
                    resultCreditQuota = popsData.creditQuota;
                    resultClass();
                } else {
                    $result_print.removeClass('disabled');
                    $result_reopen.removeClass('disabled');
                }
                break;
            case "preview/save_data":
                $preview.find('.footer').find('.btn').removeClass('disabled');
                if (popsData.errCode === '0000') {
                    previewDataSave = true;
                    previewInvoiceList = popsData["invoiceList"];
                    treatmentInvoiceList = popsData["invoiceList"];
                    treatmentInvoiceRelationMap = popsData["invoiceRelationMap"];
                    showPreviewInvoice();
                }
                break;
            case "process/blueinvoice":
                //填充蓝票 无
                treatmentInvoiceList = {...treatmentInvoiceList, ...popsData.data};
                showTreatmentInvoice();
                break;
            case "process/nextStep":
            case "process/nextstepcheck":
                if (popsData.errCode === '0000') {
                    //填充备注
                    previewInvoiceList = popsData.treatmentInvoiceList;
                    setCurrentDisplay(2);
                }
                break;
            case "process/editCancel":
                if (treatmentIsEdit) {
                    const items = sessionStorage.getItem('partiallyOpen-treatmentItems');
                    const treatmentInvoice = treatmentInvoiceList[treatmentId][0];
                    treatmentInvoice.items = JSON.parse(items);
                }
                break;
            case "process/openredinfolist":
                //填充红字信息 无
                treatmentInvoiceList = {...treatmentInvoiceList, ...popsData.data};
                showTreatmentInvoice();
                break;
            case "bill/changeJqbh":
                limitAmounts = popsData.limitAmounts;
                taxequipment = popsData.taxequipment;
                terminalNoList = popsData.terminalNos || [];
                billParam.terminalNo = terminalNoList[0] || '';
                showTreatmentTerminalNo();
                break;
            case "preview/confirm_issues":
				invoiceid = popsData.invoiceid;
                setCurrentDisplay(3);
                break;
            case "process/checkEdit":
                sessionStorage.removeItem('partiallyOpen-treatmentItems');
                treatmentIsEdit = true;
                treatmentEditIndex = '';
                showTreatmentBill();
                initTreatmentEditItems();
                showTreatmentInvoice();
                showTreatmentFooter();
                break;
            case "process/queryGoods":
                const { hsbz } = treatmentInvoiceList[treatmentId][0];
                // spmc自带*号
                updateTreatmentEditItems('simplegoodsname', (popsData.spmc || '').replace(/\*/g, ''), treatmentEditIndex);
                updateTreatmentEditItems('goodscode', popsData.spbm, treatmentEditIndex);
                updateTreatmentEditItems('goodsname', popsData.spmc + popsData.xmmc, treatmentEditIndex);
                updateTreatmentEditItems('specification', popsData.ggxh || treatmentEditItems[treatmentEditIndex].specification, treatmentEditIndex);
                updateTreatmentEditItems('unit', popsData.xmdw || treatmentEditItems[treatmentEditIndex].unit, treatmentEditIndex);
                if (hsbz === '0') {
                    treatmentEditXmdj((popsData.xmdj && fpy_toFixedTwoOrMore(popsData.xmdj)) || treatmentEditItems[treatmentEditIndex].unitprice, treatmentEditIndex);
                } else {
                    treatmentEditXmdj((popsData.xmdjhs && fpy_toFixedTwoOrMore(popsData.xmdjhs)) || treatmentEditItems[treatmentEditIndex].taxunitprice, treatmentEditIndex);
                }
                treatmentEditChangeSl(popsData.sl, treatmentEditIndex);
                break;
            case "preview/change_saler_address":
                updatePreviewInvoice('saleraddr', popsData.data.invoiceaddr);
                updatePreviewInvoice('salerbank', popsData.data.openuserbank);
                $preview_saler.find('.saleraddr').val(popsData.data.invoiceaddr).prop('title', popsData.data.invoiceaddr);
                $preview_saler.find('.salerbank').val(popsData.data.openuserbank).prop('title', popsData.data.openuserbank);
                break;
            case "common/show_confirm":
                confirmLoading = false;
                commonConfirmCallback(popsData.data);
                break;
            default:
                break;
        }
    };

    var initEvent = function (model, props) {

    };
};