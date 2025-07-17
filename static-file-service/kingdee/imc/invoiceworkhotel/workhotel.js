var FPY_workhotelFun = function (KDApi, $, _) {
    const INVOICE_TYPES = [
        { key: '10xdp', value: '数电普票' },
        { key: '08xdp', value: '数电专票' },
        { key: '026', value: '电子普票' },
        { key: '028', value: '电子专票' },
        { key: '007', value: '纸质普票' },
        { key: '004', value: '纸质专票' }
        // { key: '025', value: '普通纸质卷票' }
    ];
    const INVOICE_TYPES1 = [
        { key: '026', value: '电子普票' },
        { key: '028', value: '电子专票' },
        { key: '007', value: '纸质普票' },
        { key: '004', value: '纸质专票' },
        { key: '10xdp', value: '数电普票' },
        { key: '08xdp', value: '数电专票' }
        // { key: '025', value: '普通纸质卷票' }
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
    const PRINT_FLAG = [
        { key: '0', value: '未打印' },
        { key: '1', value: '已打印' },
        { key: '2', value: '打印失败' }
    ];
    const PRINT_FLAG_DICT = {};
    for (let i = 0; i < PRINT_FLAG.length; i++) {
        const curData = PRINT_FLAG[i];
        PRINT_FLAG_DICT['k' + curData.key] = curData.value;
    }

    let curIndex = '0'; // 当前内容显示下标 0, 1, 2, 3
    let model;
    let billNoMap;// 单据编号关系
    let hidePreback = false; //是否显示 上一步 按钮， 当前页是否可以编辑
    // 全局对象
    const fpyTable = fpy_table();
    let taxequipment = 0.06; // 盘类型：0.06代表金税盘，0.01代表其他盘
    const IMC_SPLIT_BY_DETAIL = 'imc_split_by_detail'; // 按明细开票
    const NegativeGeneralInvoiceNoBlueBillSolutions = ['imc_no_split', IMC_SPLIT_BY_DETAIL]; // 负数普票未包含蓝票的单据支持的拆分方案
    let confirmLoading = false; // 确认弹窗loading
    let inputFocusValue; // 输入框聚焦时的初始值
    let temporaryValues; // 临时中间值
    let buyernameIndex = null;
    let curApplyAmountsIndex = null;
    let isClickBtn = false;

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
    let terminalNos = {}; // 开票申请单-终端号map
    let limitAmounts = {}; // 开票申请单-拆分限额
    let billList = []; // 开票申请单-单据列表
    // let selectedRowKeys = []; // 开票申请单-已选列表

    // 初始值
    let initBillList = [];

    // 单据明细处理-数据
    let curTotalAmount = 0; // 本次可下推开票申请金额
    let isAllE = false; // 发票类型顺序
    const treatmentSync = ['buyername', 'buyertaxno', 'buyeraddr', 'buyerbank', 'buyeremail', 'buyerphone', 'applyreason', 'remark']; // 明细处理-能同步的字段
    const treatmentTextareaSync = ['applyreason', 'remark']; // 明细处理-Textarea能同步的字段
    let treatmentIndex = 0; // 明细处理-当前下标
    let treatmentSplitRule = []; // 明细处理-所有拆分方案-数组
    const treatmentSplitRuleDict = {}; // 明细处理-所有拆分方案-对象
    let treatmentShowBillList = []; // 明细处理-显示的单据列表
    let applyAmounts = []; // 单据类型，可下推金额
    let treatmentInvoiceList = []; // 明细处理-发票列表
    let treatmentInvoiceRelationMap = {}; // 明细处理-发票关系对象 以单据id为key值
    let treatmentRemainingItems = {}; // 明细处理-按明细处理剩余明细对象 以单据id为key值
    let treatmentInvoiceListSetMap = {}; // 明细处理-发票设置 以单据id为key值
    let foldKeys = []; // 明细处理，记录折叠的单据key
    let selectedKeys = []; // 明细处理，记录账单选中的明细的key
    let buyernameList = []; // 明细处理，输入抬头模糊搜索列表

    // 发票预览-数据
    let previewInvoiceList = {}; // 发票预览-发票对象 以单据id为key值
    let previewIndex = 0; // 发票预览-单据当前下标
    let previewInvoiceIndex = 0; // 发票预览-发票当前下标

    // 开票结果-数据
    let resultTimer; // 开票结果-计时器
    let resultTotal = 0; // 开票结果-发票总张数
    let resultList = []; // 开票结果-开票结果列表
    let resultCreditQuota = 0; // 开票结果-可用授信额度
    let resultIsComplete = false; // 开票结果-是否开票完成
    let resultOpenType = 'normal'; // 开票结果-开票类型

    //发票预览页是否保存数据标记
    let previewDataSave = false;
    let blueinvoiceid = '';   //保存数据、开票返回的蓝字发票id
    let redinvoiceid = '';   //保存数据、开票返回的红字发票id

    // JQ对象缓存
    const $workbench = $('#imc_invoiceWorkbench');

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
    // 单据明细处理
    const $treatment = $workbench.find('.treatment');
    const $treatment_solutions = $treatment.find('.solutions');
    const $treatment_bill = $treatment.find('.bill-detail');
    const $treatment_invoice = $treatment.find('.invoice-detail');
    // 发票预览
    const $preview = $workbench.find('.preview');
    const $preview_bill = $preview.find('.bill-list');
    const $preview_box = $preview.find('.invoice-box');
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
    const $preview_bz = $preview_invoice.find('.bz-box');
    const $preview_item = $preview_invoice.find('.label').find('.item');
    const $preview_detail = $preview_invoice.find('.detail');
    const $preview_transportLine = $preview_invoice.find('.transportLine');
    const $preview_transportDetail = $preview_invoice.find('.transportDetail');
    const $preview_operator = $preview_invoice.find('.operator').find('.value');
    const $preview_operator_name = $preview_invoice.find('.operator').find('.name');
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
        document.getElementById('imc_invoiceWorkbench').style.setProperty('--theme', themeColor);

        // 防止内容闪现
        $content.show();
        hidePreback = props.hidePreback ||false;
        curIndex = props.currentDisplay || 0;
        taxequipment = props.taxequipment || 0.06;

        currentJqbh = props.currentJqbh || '';
        currentAccount = props.currentAccount || '';
        terminalNo = props.terminalNo || '';

        deviceNoList = props.jqbhs || [];
        accountMap = props.accountMap || null;
        terminalNos = props.terminalNos || [];
        isAllE = props.isAllE || false;
        billList = props.bills.map(item => ({...item, curTotalAmount: 0})) || [];
        treatmentSplitRule = props.splitrule || [];
        billNoMap = props.billNoMap || {};
        treatmentShowBillList = props.bills || [];
        applyAmounts = props.applyAmounts || [];
        curTotalAmount = props.totalAmount || 0;
        if (terminalNos[currentJqbh]) {
            terminalNoList = terminalNos[currentJqbh];
        }

        // 初始计算默认值
        initHandleBill();
        initBillList = cloneDeep(billList);

        if (props.invoiceList) {
            // 页面初始化
            treatmentInvoiceList = props.invoiceList;
            previewInvoiceList = props.invoiceList || {};
            treatmentInvoiceRelationMap = props.invoiceRelationMap || {};
        }

        // 设置header
        setHeaderInfo();

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
        } else {
            // 非数电
            $head.find('.bill').find('.info').find('.text').eq(0).show().next().show();
            $head.find('.result').find('.info').find('.text').eq(0).show();
        }
    }

    // 设置当前显示内容
    function setCurrentDisplay(index) {
        curIndex = index;
        // 头部
        switch (index) {
        case 0:
            treatmentIndex = 0;
            showTreatment();
            break;
        case 1:
            previewIndex = 0;
            previewInvoiceIndex = 0;
            showPreview();
            break;
        case 2:
            showResult();
            break;
        default:
            break;
        }
        $head_item.removeClass('actived hack').eq(index).addClass('hack');
        for (let i = 0; i <= index; i++) {
            $head_item.eq(i).addClass('actived');
        }
        $content.find('.content-item').hide().eq(index).show();
    }

    // 开票申请单-更新头部
    function updateBillHeader() {
        const _data = billList.reduce((all, b) => [fpy_Add(all[0], b.totalamount || 0), fpy_Add(all[1], b.surplusamount || 0)], [0, 0]);
        $head_bill_value.eq(0).text(billList.length + '个');
        $head_bill_value.eq(1).text(fpy_addThousands(_data[0].toFixed(2)) + '元');
        $head_bill_value.eq(2).text(fpy_addThousands(_data[1].toFixed(2)) + '元');
    }

    // 单据明细处理
    function showTreatment() {
        // showTreatmentSolutions();
        showTreatmentBill();
        showTreatmentInvoice();
        updateTreatmentHeader();
    }

    // 单据明细处理-拆分方案
    function showTreatmentSolutions() {
        const { splitrule, totalamount, invoicetype, hadBlueInvoice, specialtype } = treatmentShowBillList[treatmentIndex];
        // 是否负数单据
        const isNegativeBill = totalamount < 0;
        // 是否专票 或者 数电
        const isSpecialInvoice = invoicetype === '028' || invoicetype === '004' || invoicetype === '08xdp' || invoicetype === '10xdp';
        // 拆分方案
        const value = treatmentSplitRuleDict['k' + splitrule] || '';
        $treatment_solutions.find('.cur-solutions').text(value).prop('title', value);
        // 常用拆分方案
        const otherSolutions = treatmentSplitRule.filter(o => o.ruleCode !== splitrule).map(o => {
            return {
                ...o,
                disabled: isNegativeBill && (isSpecialInvoice || hadBlueInvoice || !NegativeGeneralInvoiceNoBlueBillSolutions.includes(o.ruleCode))
            };
        });
        const allLength = otherSolutions.length;
        // 调整方案的位置
        if (isNegativeBill) {
            for (let i = 0; i < allLength; i++) {
                if (NegativeGeneralInvoiceNoBlueBillSolutions.includes(otherSolutions[i].ruleCode)) {
                    otherSolutions.unshift(otherSolutions.splice(i, 1)[0]);
                };
            }
        }
        const _length = allLength > 3 ? 3 : allLength;
        const _html = [];
        const isSpecial = (invoicetype === '08xdp' || invoicetype === '10xdp') && (specialtype === 'E03' || specialtype === 'E06' || specialtype === 'E05');
        for (let i = 0; i < _length; i++) {
            const obj = otherSolutions[i];
            _html.push(`<div class="solutions-item truncateText ${obj.disabled ? 'disabled' : ''}" data-id="${obj.ruleCode}" data-isSpecial="${isSpecial}" title="${obj.ruleName}">${obj.ruleName}</div>`);
        }
        $treatment_solutions.find('.common-solutions').html(_html.join(''));
        // more
        if (allLength > 3) {
            if (isNegativeBill) {
                $treatment_solutions.find('.btn').addClass('disabled');
            } else {
                $treatment_solutions.find('.btn').removeClass('disabled');
                const _html = [];
                for (let i = 3; i < allLength; i++) {
                    const obj = otherSolutions[i];
                    _html.push(`<div class="solutions-item truncateText ${obj.disabled ? 'disabled' : ''}" data-id="${obj.ruleCode}" title="${obj.ruleName}">${obj.ruleName}</div>`);
                }
                $treatment_solutions.find('.more-solutions').html(_html.join(''));
            }
            $treatment_solutions.find('.more-box').show();
        } else {
            $treatment_solutions.find('.more-box').hide();
        }
    }

    // 单据明细处理-单据
    function showTreatmentBill() {
        const _html = [];
        _html.push(`
            <div class="bill-detail-box">
                <div class="bill-detail-title">
                    <div>可下推开票申请金额：${Number(curTotalAmount).toFixed(2)}元</div>
                    <div class="${curTotalAmount == 0 ? 'bill-detail-btn-disabled' : 'bill-detail-btn'}">生成发票</div>
                </div>
                <div class="bill-top">
                    <div class="bill-top-title">
                        <div>可申请金额</div>
                        <div>本次申请金额</div>
                    </div>
                    ${
                        applyAmounts.map(item => (`
                            <div class="bill-top-item">
                                <div class="title">${item.name}</div>
                                <div class="value">${item.canApplyAmount}</div>
                                <div class="box">
                                    <input class="input" type="number" step="0.01" min=0 max=${item.canApplyAmount} name="${item.number}" ${item.canApplyAmount == 0 ? 'disabled' : ''} value=${item.currentApplyAmount}>
                                </div>
                            </div>
                        `)).join('')
                    }
                </div>
            </div>
        `);
        for (let i = 0; i < billList.length; i++) {
            const obj = billList[i];
            let isFold = foldKeys.some(item => item === obj.billno);
            _html.push(`
                <div class="item ${i === treatmentIndex ? 'actived' : ''}">
                    <div class="title">
                        ${getTreatmentBillTitleHtmlByIndex(i)}
                    </div>
                    ${isFold ? '' : `<div id="imc_invoiceWorkbench_treatment_bill${obj.id}"></div>`}
                </div>
            `);
        }
        $treatment_bill.html(_html.join(''));
        for (let i = 0; i < billList.length; i++) {
            updateTreatmentBillTableByIndex(i)
            // testTreatmentBillFinished(i);
        }
    }

    // 单据明细处理-更新单据table
    function updateTreatmentBillTableByIndex(treatmentIndex, setScrollTop = false) {
        const { id, sim_isomerism_item_data } = billList[treatmentIndex];
        let _dataSource = sim_isomerism_item_data;
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
                    title: '商品名称',
                    dataIndex: 'product_name',
                    ellipsis: true
                },
                {
                    align: 'left',
                    title: '金额',
                    dataIndex: 'product_amount',
                    ellipsis: true,
                    width: 50,
                    render: t => Number(t).toFixed(2)
                },
                {
                    align: 'left',
                    title: '可开票金额',
                    dataIndex: 'unpushamount',
                    ellipsis: true,
                    width: 70,
                    render: t => Number(t).toFixed(2)
                },
                {
                    align: 'left',
                    title: '下推金额',
                    dataIndex: 'remainvalidamount',
                    ellipsis: true,
                    width: 70,
                    // render: t => t ? Number(t).toFixed(2) : 0
                    render: (t, r, i) => {
                        return `
                            <input class="table-input" type="number" step="0.01" min=0 max=${r.unpushamount} name="${r.id}" ${r.unpushamount == 0 ? 'disabled' : ''} value=${t ? Number(t).toFixed(2) : 0}>
                        `
                    }
                },
                {
                    align: 'left',
                    title: '子订单号',
                    dataIndex: 'sub_order_no',
                    ellipsis: true,
                    width: 60
                },
                {
                    align: 'left',
                    title: '分类',
                    dataIndex: 'itemtypename',
                    ellipsis: true,
                    width: 60
                }
            ],
            scroll: {},
            dataSource: _dataSource,
            selectedRowKeys: selectedKeys,
            disabled: () => true,
            headerColor: '#666',
            headerBgColor: '#ebeef3',
            rowHeight: 26,
            showTotal: false
        });
        // 设置滚动高度
        if (setScrollTop) tableDom.find('.workbench-scroll').scrollTop(scrollTop);
    }

    // 单据明细处理-更新单据title
    function updateTreatmentBillTitleByIndex(treatmentIndex) {
        $treatment_bill.find('.item').eq(treatmentIndex).find('.title').html(getTreatmentBillTitleHtmlByIndex(treatmentIndex));
    }

    // 单据明细处理-获取单据title的html
    function getTreatmentBillTitleHtmlByIndex(treatmentIndex) {
        const obj = billList[treatmentIndex];
        let isFold = foldKeys.some(item => item === obj.billno);
        const _html = `
            <div class="title-left">
                <div class=${isFold ? "triangle-fold" : "triangle"} name="${obj.billno}"></div>
                <div class="name truncateText" title="${obj.billno}">账单编号：${handleBillNo(obj.billno)}</div>
            </div>
            <div class="price" title="${obj.invoicable_amount}">可下推金额：${Number(obj.invoicable_amount || 0).toFixed(2)}元</div>
        `;
        return _html;
    }

    // 单据明细处理-发票初始化
    function treatmentBillInvoiceInit(data = {}) {
        Object.keys(data).map((key) => {
            data[key] = data[key].map(invoice => {
                return {
                    ...invoice,
                    totalNum: (invoice.items || []).reduce((all, item) => fpy_Add(all, item.num), 0)
                }
            });
        })
        return data;
    }

    // 单据明细处理-获取合计
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
            remainvalidnum: allNoPrice ? '' : fpy_toFixedNoZero(totalData[0], 13),
            remainvalidamount: totalData[1].toFixed(2)
        };
    }

    // 单据明细处理-初始化发票设置
    function initTreatmentInvoiceListSetMap(data = {}) {
        for (let id of Object.keys(data)) {
            treatmentInvoiceListSetMap[id] = data[id].map(invoice => {
                const { items, infocode, blueinvoicecode } = invoice;
                return {
                    showFixedNumber: items.some(o => o.unitprice),
                    fixedNumber: 0,
                    taxFreeAdjust: false,
                    hadHzxxbm: !!infocode,
                    hadBlueInvoice: !!blueinvoicecode
                };
            });
        }
    }

    // 单据明细处理-发票
    function showTreatmentInvoice() {
        const _data = treatmentInvoiceList;
        const _length = _data.length;
        const _html = [];

        for (let i = 0; i < _length; i++) {
            const obj = _data[i];
            _html.push(`
                <div class="item">
                    <div class="info" data-all="${_length}">
                        ${getTreatmentInvoiceInfoHtmlByIndex(i)}
                    </div>
                    <div id="imc_invoiceWorkbench_treatment_invoice${obj.id}"></div>
                    <div class="total">
                        ${getTreatmentInvoiceTotalHtmlByIndex(i)}
                    </div>
                </div>
            `);
        }
        $treatment_invoice.html(_html.join(''));
        for (let i = 0; i < _length; i++) {
            updateTreatmentInvoiceTableByIndex(i);
        }
    }

    // 单据明细处理-更新发票总数
    function updateTreatmentInvoiceAll(all) {
        $treatment_invoice.find('.info').attr('data-all', all);
    }

    // 单据明细处理-获取发票信息的html
    function getTreatmentInvoiceInfoHtmlByIndex(invoiceIndex) {
        const _data = treatmentInvoiceList;
        const {
            invoicetype,
            buyername,
            buyertaxno,
            buyeraddr,
            buyerbank,
            buyeremail,
            buyerphone,
            jqbh,
            terminalno,
            account,
            isFold,
            buyerproperty
        } = _data[invoiceIndex];
        console.log(_data[invoiceIndex], 'data-------------------------')
        const deviceNos = [];
        for (const o in deviceNoList) {
            deviceNos.push({
                key: deviceNoList[o],
                value: o
            });
        }
        const accountList = [];
        for (const o in accountMap) {
            accountList.push({
                key: o,
                value: o
            });
        }
        const _html = [`
            <div class="invoice-del">移除</div>
            <div style="padding-top: 34px">
            <div class="text">
                <div class="name">发票类型</div>
                <div class="value">
                    ${
                        (isAllE ? INVOICE_TYPES : INVOICE_TYPES1).map(item => (
                            `<div key="${item.key}" class="${invoicetype === item.key ? 'invoiceBox invoiceBoxSelect' : 'invoiceBox'}">${item.value}</div>`
                        )).join('')
                    }
                </div>
            </div>
            ${invoicetype === '08xdp' || invoicetype === '10xdp' ? `<div class="text">
                <div class="name">电子税局账号</div>
                <div class="value">
                    <select class="searchInput" name="account">
                        <option value="" ${!account ? 'selected' : ''} disabled>请选择</option>
                        ${
                            accountList.map(item => (
                                `<option value="${item.key}" ${currentAccount === item.key ? 'selected' : ''}>${item.value}</option>`
                            ))
                        }
                    </select>
                </div>
            </div>` : `
                <div class="text">
                    <div class="name">设备编号</div>
                    <div class="value">
                        <select class="searchInput" name="jqbh">
                            <option value="" ${!jqbh ? 'selected' : ''} disabled>请选择</option>
                            ${
                                deviceNos.map(item => (
                                    `<option value="${item.key}" ${jqbh === item.key ? 'selected' : ''}>${item.value}</option>`
                                ))
                            }
                        </select>
                    </div>
                </div>
                ${terminalNoList.length > 0 ? `
                    <div class="text">
                        <div class="name">终端号</div>
                        <div class="value">
                            <select class="searchInput" name="terminalno">
                                <option value="" ${!terminalno ? 'selected' : ''} disabled>请选择</option>
                                ${
                                    terminalNoList.map(item => (
                                        `<option value="${item}" ${terminalno === item ? 'selected' : ''}>${item}</option>`
                                    ))
                                }
                            </select>
                        </div>
                    </div>
                ` : `<div style="display: none"></div>`}
            `}
            <div class="text">
                <div class="name requiredFields">购方类型</div>
                <div class="value">
                    <form>
                        <input id="buyerproperty0${invoiceIndex}" class="searchOther vaMiddle" type="radio" name="buyerproperty" value="0" ${buyerproperty === '0' ? 'checked' : ''}>
                        <label for="buyerproperty0${invoiceIndex}" class="mgl5 mgr10 vaMiddle">企业</label>
                        <input id="buyerproperty1${invoiceIndex}" class="searchOther vaMiddle" type="radio" name="buyerproperty" value="1" ${buyerproperty === '1' ? 'checked' : ''}>
                        <label for="buyerproperty1${invoiceIndex}" class="mgl5 mgr10 vaMiddle">个人</label>
                        <input id="buyerproperty2${invoiceIndex}" class="searchOther vaMiddle" type="radio" name="buyerproperty" value="2" ${buyerproperty === '2' ? 'checked' : ''}>
                        <label for="buyerproperty2${invoiceIndex}" class="mgl5 mgr10 vaMiddle">非企业单位</label>
                    </form>
                </div>
            </div>
            <div class="text">
                <div class="name requiredFields">购方名称</div>
                <div class="value search">
                    <input class="searchInput pressEnter" type="text" name="buyername" maxlength="100" value="${buyername || ''}" placeholder="按Enter键或点击右侧图标进行搜索">
                    <div data-name="buyername" class="search-btn"></div>
                </div>
            </div>
            ${
                buyernameIndex == invoiceIndex && buyernameList.length > 0 ? `
                    <div class="buyernameBox">
                        ${
                            buyernameList.map(item => (
                                `<div name="${item.name}" class="buyernameItem" key="${item.name}">${item.name}</div>`
                            )).join('')
                        }
                    </div>
                ` : `<div style="display: none"></div>`
            }
            <div class="text">
                <div class="name ${invoicetype === '028' || invoicetype === '004' ? 'requiredFields' : ''}">纳税人识别号</div>
                <div class="value">
                    <input class="searchInput" type="text" name="buyertaxno" maxlength="20" value="${buyertaxno || ''}">
                </div>
            </div>
            ${isFold ? `<div class="text">
                <div class="name ${invoicetype === '028' || invoicetype === '004' ? 'requiredFields' : ''}">地址及电话</div>
                <div class="value">
                    <input class="searchInput" type="text" name="buyeraddr" maxlength="100" value="${buyeraddr || ''}">
                </div>
            </div>
            <div class="text">
                <div class="name ${invoicetype === '028' || invoicetype === '004' ? 'requiredFields' : ''}">开户行及账号</div>
                <div class="value">
                    <input class="searchInput" type="text" name="buyerbank" maxlength="100" value="${buyerbank || ''}">
                </div>
            </div>
            <div class="text">
                <div class="name"></div>
                <div class="value">
                    <div class="tips">收起</div>
                </div>
            </div>` : `
                <div class="text">
                    <div class="name"></div>
                    <div class="value">
                        <div class="tips">展开</div>
                    </div>
                </div>
            `}
            <div class="text">
                <div class="name">收票邮箱</div>
                <div class="value">
                    <input class="searchInput" type="text" name="buyeremail" maxlength="100" value="${buyeremail || ''}">
                </div>
            </div>
            <div class="text">
                <div class="name">收票手机号</div>
                <div class="value">
                    <input class="searchInput" type="text" name="buyerphone" maxlength="11" value="${buyerphone || ''}">
                </div>
            </div>
            </div>
        `];
        return _html.join('');
    }

    // 单据明细处理-更新发票信息
    function updateTreatmentInvoiceInfoByIndex(invoiceIndex) {
        $treatment_invoice.find('.item').eq(invoiceIndex).find('.info').html(getTreatmentInvoiceInfoHtmlByIndex(invoiceIndex));
    }

    // 单据明细处理-更新发票table
    function updateTreatmentInvoiceTableByIndex(invoiceIndex, setScrollTop = false) {
        const _data = treatmentInvoiceList;
        // 发票
        const { id, hsbz, items } = _data[invoiceIndex];
        const columns = [
            {
                title: '序号',
                width: 40,
                render: () => '<span class="order"><span>'
            },
            {
                title: '开票项',
                dataIndex: 'product_name',
                ellipsis: true,
                width: 100
            },
            {
                title: '税率',
                dataIndex: 'tax_rate',
                width: 55,
                render: t => t && t !== null ? t * 100 + '%' : ''
            },
            {
                title: '税额',
                dataIndex: 'tax',
                width: 60,
                render: (t, r, i) => {
                    const val = Number(t).toFixed(2);
                    return (
                        `<span class="tax" title="${val}">${val}</span>`
                    );
                }
            },
            {
                title: '含税金额',
                dataIndex: 'remainvalidamount',
                width: 90,
                render: (t, r, i) => {
                    const val = Number(t).toFixed(2);
                    return (
                        `<span title="${val}">${val}</span>`
                    );
                }
            }
        ];

        let scrollTop;
        let tableDom;
        if (setScrollTop) {
            tableDom = $(`#imc_invoiceWorkbench_treatment_invoice${id}`);
            scrollTop = tableDom.find('.workbench-scroll').scrollTop();
        }
        fpyTable.init({
            id: `imc_invoiceWorkbench_treatment_invoice${id}`,
            rowKey,
            columns,
            scroll: items.length > 8 ? { y: 208 } : {},
            dataSource: items,
            headerColor: '#666',
            headerBgColor: '#eee',
            rowHeight: 26
        });
        // 设置滚动高度
        if (setScrollTop) tableDom.find('.workbench-scroll').scrollTop(scrollTop);
    }

    // 单据明细处理-获取发票合计的html
    function getTreatmentInvoiceTotalHtmlByIndex(invoiceIndex) {
        const { items } = treatmentInvoiceList[invoiceIndex];
        const _data = items.reduce((all, b) => [fpy_Add(all[0], b.tax || 0), fpy_Add(all[1], b.remainvalidamount || 0)], [0, 0]);
        const _html = `
            <span class="total-item">税额合计：<span class="warning invoiceamount">${Number(_data[0]).toFixed(2)}</span>元</span>
            <span class="total-item">含税金额合计：<span class="warning totaltax">${Number(_data[1]).toFixed(2)}</span>元</span>
        `;
        return _html;
    }

    // 单据明细处理-更新发票合计
    function updateTreatmentInvoiceTotalByIndex(invoiceIndex) {
        const { id: billId } = treatmentShowBillList[treatmentIndex];
        const invoiceList = treatmentInvoiceList[billId];
        const { items } = invoiceList[invoiceIndex];

        let totalNum = '';
        let invoice_hjbhsje = '';
        let invoice_kphjse = '';
        let invoice_jshjje = '';
        for (let i = 0; i < items.length; i++) {
            totalNum = fpy_Add(totalNum, items[i].num || 0);
            invoice_hjbhsje = fpy_Add(invoice_hjbhsje, items[i].amount);
            invoice_kphjse = fpy_Add(invoice_kphjse, items[i].tax);
            invoice_jshjje = fpy_Add(invoice_jshjje, items[i].taxamount);
        }
        invoice_hjbhsje = invoice_hjbhsje.toFixed(2);
        invoice_kphjse = invoice_kphjse.toFixed(2);
        invoice_jshjje = invoice_jshjje.toFixed(2);
        invoiceList[invoiceIndex].totalNum = totalNum;
        invoiceList[invoiceIndex].invoiceamount = invoice_hjbhsje;
        invoiceList[invoiceIndex].totaltax = invoice_kphjse;
        invoiceList[invoiceIndex].totalamount = invoice_jshjje;

        const totalDom = $treatment_invoice.find('.item').eq(invoiceIndex).find('.total');
        totalDom.find('.totalNum').text(totalNum);
        totalDom.find('.invoiceamount').text(invoice_hjbhsje);
        totalDom.find('.totaltax').text(invoice_kphjse);
        totalDom.find('.totalamount').text(invoice_jshjje);

        return invoice_hjbhsje;
    }

    // 单据明细处理-添加单张发票
    function addTreatmentInvoice() {
        const _data = treatmentInvoiceList;
        const _length = _data.length;

        const i = _length - 1;
        const obj = _data[i];

        const _html = `
            <div class="item">
                <div class="info" data-all="${_length}">
                    ${getTreatmentInvoiceInfoHtmlByIndex(i)}
                </div>
                <div id="imc_invoiceWorkbench_treatment_invoice${obj.id}"></div>
                <div class="total">
                    ${getTreatmentInvoiceTotalHtmlByIndex(i)}
                </div>
            </div>
        `;
        $treatment_invoice.append(_html);
        updateTreatmentInvoiceTableByIndex(i);
    }

    // 单据明细处理-更新头部
    function updateTreatmentHeader() {
        $head_treatment_value.eq(0).text(billList.length + '个');
        $head_treatment_value.eq(1).text(Number(curTotalAmount).toFixed(2) + '元');
    }

    // 单据明细处理-更新单据数据
    // function updateTreatmentBill(index, name, value) {
    //     treatmentShowBillList[index][name] = value;
    // }

    // 单据明细处理-更新发票数据
    function updateTreatmentInvoice(invoiceIndex, name, value, isSync = false) {
        const invoiceList = treatmentInvoiceList;
        // 是否能同步修改的字段
        if (isSync) {
            // 记录需更新的key
            const keys = [];
            const canSync = treatmentSync.includes(name);
            for (let i = 0; i < invoiceList.length; i++) {
                if (i === invoiceIndex) {
                    invoiceList[i][name] = value;
                    if (!canSync || value === '') break;
                } else {
                    if (canSync && invoiceList[i][name] === '') {
                        keys.push(i);
                        invoiceList[i][name] = value;
                    }
                }
            }
            // 待更新明细数量
            if (keys.length) {
                const itemDom = $treatment_invoice.find('.item');
                if (treatmentTextareaSync.includes(name)) {
                    for (let i of keys) {
                        itemDom.eq(i).find(`textarea[name=${name}]`).val(value);
                    }
                } else {
                    for (let i of keys) {
                        itemDom.eq(i).find(`input[name=${name}]`).val(value);
                    }
                }
            }
        } else {
            invoiceList[invoiceIndex][name] = value;
        }
        testTreatmentBillFinished(invoiceIndex);
    }

    function cloneDeep(obj) {
        if (obj === null || typeof obj !== 'object') {
            return obj;
        }
      
        if (Array.isArray(obj)) {
            const newArray = [];
            for (let i = 0; i < obj.length; i++) {
                newArray[i] = cloneDeep(obj[i]);
            }
            return newArray;
        }
      
        if (typeof obj === 'object') {
            const newObj = {};
            for (let key in obj) {
                if (obj.hasOwnProperty(key)) {
                newObj[key] = cloneDeep(obj[key]);
                }
            }
            return newObj;
        }
    }

    // 单据明细处理-更新货物运输数据
    function updateTreatmentTransport(invoiceIndex, name, value, itemIndex) {
        const invoiceList = treatmentInvoiceList[treatmentShowBillList[treatmentIndex].id];
        const newFreights = cloneDeep(invoiceList[invoiceIndex]['freights']);
        newFreights[itemIndex][name] = value;
        invoiceList[invoiceIndex] = {
            ...invoiceList[invoiceIndex],
            freights: newFreights
        };
        testTreatmentBillFinished(treatmentIndex);
    }

    // 单据明细处理-单据信息完整度
    function testTreatmentBillFinished(index) {
        const invoiceList = treatmentInvoiceList;
        let isComplete = true;
        for (let i = 0; i < invoiceList.length; i++) {
            const obj = invoiceList[i];
            // 正数票
            if (obj.totalamount > 0) {
                if (!obj.buyername) {
                    isComplete = false;
                    break;
                }
                if (obj.invoicetype === '028' || obj.invoicetype === '004') {
                    if (!obj.buyertaxno) {
                        isComplete = false;
                        break;
                    }
                    if (!obj.buyeraddr) {
                        isComplete = false;
                        break;
                    }
                    if (!obj.buyerbank) {
                        isComplete = false;
                        break;
                    }
                }
            }
        }
        // const dom = $treatment_bill.find('.item').eq(index).find('.statu');
        // if (isComplete) {
        //     if (!dom.hasClass('finished')) dom.addClass('finished').text('信息已补充');
        // } else {
        //     if (dom.hasClass('finished')) dom.removeClass('finished').text('信息待补充');
        // }
        // updateTreatmentBill(index, 'isComplete', isComplete);
    }

    // 单据明细处理-单据前端设置税额调整
    function treatmentChangeWebSetTaxFreeAdjust(value, invoiceIndex) {
        const { id } = treatmentShowBillList[treatmentIndex];
        treatmentInvoiceListSetMap[id][invoiceIndex].taxFreeAdjust = value;
    }

    // 单据明细处理-更新单据税额尾差
    function updateTreatmentBillAdjustedData(data = {}) {
        let { id, maintaxdeviation, sim_original_bill_item } = treatmentShowBillList[treatmentIndex];
        Object.keys(data).map(billid => {
            if (billid === id) {
                const { maintaxdeviation: value, sim_original_bill_item: list } = data[billid];

                maintaxdeviation = value || 0;
                sim_original_bill_item = sim_original_bill_item.map(item => {
                    const cur = list.find(o => o.id = item.id);
                    return {
                        ...item,
                        taxdeviation: cur ? cur.taxdeviation : 0
                    };
                });

                // 更新数据
                treatmentShowBillList[treatmentIndex].maintaxdeviation = maintaxdeviation;
                treatmentShowBillList[treatmentIndex].sim_original_bill_item = sim_original_bill_item;

                // 更新页面
                const diff = maintaxdeviation || 0;
                if (diff === 0) {
                    $treatment_bill.find('.item').eq(treatmentIndex).find('.error').hide();
                } else {
                    $treatment_bill.find('.item').eq(treatmentIndex).find('.error').text(`税额尾差：${diff}`);
                }
            }
        });
    }

    // 单据明细处理-清空税额尾差调整值-当前单据
    function treatmentEmptyCurrentBillAdjustedData() {
        treatmentShowBillList[treatmentIndex].adjustedData = 0;
        treatmentShowBillList[treatmentIndex].sim_original_bill_item = treatmentShowBillList[treatmentIndex].sim_original_bill_item.map(o => {
            return {
                ...o,
                adjustedData: 0
            };
        });
    }

    // 单据明细处理-单据前端设置固定数量
    function treatmentChangeWebSetFixedNumber(value, invoiceIndex = -1, all = false) {
        const { id } = treatmentShowBillList[treatmentIndex];

        const invoiceList = treatmentInvoiceList[id];
        if (all) {
            treatmentInvoiceListSetMap[id] = treatmentInvoiceListSetMap[id].map(o => ({ ...o, fixedNumber: value }));

            treatmentInvoiceList[id] = invoiceList.map(invoice => {
                const items = invoice.items.map(item => {
                    const _num = item.unitprice && value ? value : item.actualXmsl;
                    const _unitprice = item.unitprice && value ? fpy_toFixedTwoOrMore(fpy_accDiv(item.amount, _num)) : item.actualXmdj;
                    const _taxunitprice = item.taxunitprice && value ? fpy_toFixedTwoOrMore(fpy_accDiv(item.taxamount, _num)) : item.actualTaxXmdj;
                    return {
                        ...item,
                        num: _num,
                        unitprice: _unitprice,
                        taxunitprice: _taxunitprice
                    };
                });
                return { ...invoice, items };
            });
            for (let i = 0; i < invoiceList.length; i++) {
                updateTreatmentInvoiceTableByIndex(i, true);
            }
        } else {
            treatmentInvoiceListSetMap[id][invoiceIndex].fixedNumber = value;
            invoiceList[invoiceIndex].items = invoiceList[invoiceIndex].items.map(item => {
                const _num = item.unitprice && value ? value : item.actualXmsl;
                const _unitprice = item.unitprice && value ? fpy_toFixedTwoOrMore(fpy_accDiv(item.amount, _num)) : item.actualXmdj;
                const _taxunitprice = item.taxunitprice && value ? fpy_toFixedTwoOrMore(fpy_accDiv(item.taxamount, _num)) : item.actualTaxXmdj;
                return {
                    ...item,
                    num: _num,
                    unitprice: _unitprice,
                    taxunitprice: _taxunitprice
                };
            });
            updateTreatmentInvoiceTableByIndex(invoiceIndex, true);
        }
    }

    // 单据明细处理-按明细开票 剩余明细初始化
    function initTreatmentRemainingItems() {
        const id = treatmentShowBillList[treatmentIndex].id;
        // 确认选取状态
        treatmentShowBillList[treatmentIndex].remainingDisabled = false;
        treatmentInvoiceList = { ...treatmentInvoiceList, [id]: [] };
        treatmentInvoiceRelationMap = { ...treatmentInvoiceRelationMap, [id]: [] };
        const _items = treatmentShowBillList[treatmentIndex].sim_original_bill_item.map(o => {
            return {
                ...o,
                originalXmsl: o.remainvalidnum,
                originalXmdj: o.unitprice,
                originalTaxXmdj: o.taxunitprice,
                originalSe: o.remainvalidtax,
                originalJshjje: o.remainvalidamount
            };
        });
        treatmentRemainingItems[id] = {
            selectedRowKeys: _items.map(o => o.id),
            items: _items
        };

        updateTreatmentBillTitleByIndex(treatmentIndex);
        updateTreatmentBillTableByIndex(treatmentIndex);
        testTreatmentBillFinished(treatmentIndex);
        showTreatmentInvoice();
    }

    // 单据明细处理-按明细开票 剩余明细更新
    function updateTreatmentRemainingItems(keys, isConfirm = false) {
        const { id, hsbz } = treatmentShowBillList[treatmentIndex];
        const invoiceList = treatmentInvoiceList[id];
        const { selectedRowKeys, items } = treatmentRemainingItems[id];

        const tableDom = $(`#imc_invoiceWorkbench_treatment_bill${id}`);

        const invoiceItems = invoiceList.reduce((accumulator, o) => {
            return accumulator.concat(o.items);
        }, []);

        // 待更新明细数量
        const isItemUpdate = keys.length <= 300;

        const _items = items.map((m, i) => {
            // 检测是否需要更新
            if (keys.includes(m.id)) {
                const { taxrate, originalXmsl, originalXmdj, originalTaxXmdj, originalSe, originalJshjje } = m;

                // 是否反算过单价 isInverseXmdj 默认false未反算
                let isInverseXmdj = false;
                let _num = originalXmsl;
                let _unitprice = originalXmdj; // 不含税
                let _taxunitprice = originalTaxXmdj; // 含税
                let _tax = originalSe;
                let _taxamount = originalJshjje;
                if (isConfirm) {
                    _num = originalTaxXmdj ? '0' : '';
                    _tax = 0;
                    _taxamount = 0;
                } else {
                    // 获取当前明细
                    const curInvoiceItems = invoiceItems.filter(o => m.id === o.billItemId);
                    // 反算可开含税金额，可开数量
                    for (const n of curInvoiceItems) {
                        // 根据实际数量计算
                        _num = originalTaxXmdj ? fpy_toFixedNoZero(fpy_Minus(_num, n.actualXmsl)) : '';
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
                }


                if (isItemUpdate) {
                    // 更新明细
                    const disabled = _taxamount == 0 || m.rowtype === '1';
                    const tdDom = tableDom.find('.workbench-table-tbody').find('tr').eq(i).find('td');
                    tdDom.eq(0).find('input[type=checkbox]').prop('disabled', disabled);
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

        const adjustedData = invoiceItems.reduce((all, a) => fpy_Add(all, a.adjustedData || 0), 0);

        // 确认选取状态
        const confirmAllow = isConfirm ? false : selectedRowKeys.some(key => {
            const curItem = _items.find(o => o.id === key);
            return curItem.remainvalidamount != 0;
        });

        // 更新选取按钮
        const sureDom = tableDom.prev('.title').find('.sure');
        if (confirmAllow) {
            if (sureDom.hasClass('disabled')) sureDom.removeClass('disabled');
        } else {
            if (!sureDom.hasClass('disabled')) sureDom.addClass('disabled');
        }

        // 更新数据
        treatmentShowBillList[treatmentIndex].adjustedData = adjustedData;
        treatmentShowBillList[treatmentIndex].remainingDisabled = !confirmAllow;
        treatmentRemainingItems[id].items = _items;

        if (isItemUpdate) {
            // 更新全选按钮
            const allCheckDisable = _items.every(o => o.remainvalidamount == 0);
            tableDom.find('.workbench-table-header').find('input[type=checkbox]').prop('disabled', allCheckDisable);

            // 更新合计
            const totalData = treatmentBillTotalGet(_items);
            const totalDom = tableDom.find('.workbench-table-footer');
            for (const key in totalData) {
                totalDom.find(`.${key}`).text(totalData[key]).prop('title', totalData[key]);
            }
        } else {
            updateTreatmentBillTableByIndex(treatmentIndex, true);
        }
    }

    // 单据明细处理-按明细开票 确认选取
    function confirmSelectTreatmentRemainingItems() {
        const obj = treatmentShowBillList[treatmentIndex];
        const { id, hsbz, totalamount, sim_original_bill_item, ...other } = obj;
        const { selectedRowKeys, items } = treatmentRemainingItems[id];
        let invoiceList = treatmentInvoiceList[id];

        // 负数单据最多可选取拆分10张发票
        if (totalamount < 0 && invoiceList.length >= 10) {
            // common/tip
            model.invoke("common/tip", '最多可选取拆分10张发票，请重新拆分！');
            return;
        }

        if (!selectedRowKeys.length) {
            // common/tip
            model.invoke("common/tip", '请选择单据明细！');
            return;
        }

        const _items = items.filter(o => {
            return selectedRowKeys.includes(o[rowKey]) && o.remainvalidamount != 0;
        }).map(o => {
            return {
                "id": 'items' + fpy_getUUId(), // 明细id 方法生成
                "seq": o.seq, // seq
                "goodscode": o.goodscode, //税收分类编码 goodscode
                "specification": o.specification, //规格型号 specification
                "unit": o.unit, //单位 unit
                "num": o.remainvalidnum, //数量 remainvalidnum
                "unitprice": o.unitprice, //单价 unitprice
                "amount": fpy_Minus(o.remainvalidamount, o.remainvalidtax).toFixed(2), //金额 amount
                "tax": o.remainvalidtax, //税额 remainvalidtax
                "zerotaxmark": "", // 忽略
                "taxpremark": o.policylogo, // policylogo
                "zzstsgl": o.policycontants, // policycontants
                "zxbm": "", // 忽略
                "taxflag": "0", // 忽略
                "simplegoodsname": o.goodssimplename, // goodssimplename
                "goodsname": (o.goodssimplename && `*${o.goodssimplename}*`) + o.goodsname, //商品名称 goodsname
                "taxrate": o.taxrate, //税率 taxrate
                "rowtype": o.rowtype, // 行性质,0明细行，1折扣行，2被折扣行
                "taxunitprice": o.taxunitprice, //含税单价 taxunitprice
                "taxamount": o.remainvalidamount, //价税合计 remainvalidamount
                "billsourceid": o.billsourceid, // 应收单明细 id
                "discountamount": 0, // 忽略
                "discountrate": 0, // 忽略
                "spbm": o.spbm, // spbm
                billItemId: o.id, // 单据明细 id 自己使用
                actualXmsl: o.remainvalidnum, // 实际数量
                actualXmdj: o.unitprice, // 实际单价
                actualTaxXmdj: o.taxunitprice, // 实际含税单价
                originalXmsl: o.originalXmsl, // 单据明细数量
                originalXmdj: o.originalXmdj, // 单据明细不含税单价
                originalTaxXmdj: o.originalTaxXmdj, // 单据明细含税单价
                originalSe: o.originalSe, // 单据明细税额
                originalJshjje: o.originalJshjje // 单据明细价税合计
            };
        });
        // 更改发票的合计
        let totalNum = '';
        let invoice_hjbhsje = '';
        let invoice_kphjse = '';
        let invoice_jshjje = '';
        for (let i = 0; i < _items.length; i++) {
            const o = _items[i];
            // 明细行校验分摊
            // 明细税额误差不能超过taxequipment
            let difference = ''; // 误差
            let allApportionedValue = 0; // 分摊的值
            let needApportionedValue = 0; // 需分摊的值
            if (hsbz === '0') {
                difference = fpy_Minus(o.tax, fpy_toFixedSafe(fpy_accMul(o.amount, o.taxrate)));
                allApportionedValue =
                needApportionedValue =
                Math.abs(difference) <= taxequipment ? 0 : difference > 0 ? fpy_Minus(difference, taxequipment).toFixed(2) : fpy_Add(difference, taxequipment).toFixed(2);
                // 是否需要分摊
                if (needApportionedValue != 0) {
                    invoiceList = invoiceList.map(m => {
                        // 是否分摊完成
                        if (needApportionedValue != 0) {
                            // 计算发票的总税额误差
                            const invoiceSeError = m.items.reduce((accumulator, b) => {
                                return fpy_Add(accumulator, fpy_Minus(b.tax, fpy_toFixedSafe(fpy_accMul(b.amount, b.taxrate))));
                            }, 0);
                            // 发票总税额误差不能超过1.27
                            if (Math.abs(invoiceSeError) > 1.27) {
                                return m;
                            } else {
                                let hadApportionedValue = 0; // 被分摊的值
                                const invoiceItems = m.items.map(n => {
                                    // 是否相同单据明细
                                    if (o.billItemId === n.billItemId) {
                                        // 明细行的误差 0.01
                                        const _difference = fpy_Minus(n.tax, fpy_toFixedSafe(fpy_accMul(n.amount, n.taxrate)));
                                        // 计算被分摊的值
                                        if (needApportionedValue > 0) {
                                            // needApportionedValue 0.01
                                            // 明细可以加上的税额 taxequipment - 0.01 = 0.05
                                            hadApportionedValue = fpy_Minus(taxequipment, _difference).toFixed(2);
                                            // 被分摊的值是否大于需要分摊的值 0.05 > 0.01
                                            hadApportionedValue = hadApportionedValue >= needApportionedValue ? needApportionedValue : hadApportionedValue;
                                        } else {
                                            // needApportionedValue -0.01
                                            // 明细可以减去的税额 0.01 + taxequipment = 0.07 转换为-0.07
                                            hadApportionedValue = -fpy_Add(_difference, taxequipment).toFixed(2);
                                            // 负数 被分摊的值是否小于需要分摊的值 -0.07 < -0.01
                                            hadApportionedValue = hadApportionedValue <= needApportionedValue ? needApportionedValue : hadApportionedValue;
                                        }

                                        // 是否可以分摊
                                        if (hadApportionedValue) {
                                            // 更新需分摊的值
                                            needApportionedValue = fpy_Minus(needApportionedValue, hadApportionedValue).toFixed(2);

                                            // 更新明细的税额，合计税额，价税合计
                                            return {
                                                ...n,
                                                tax: fpy_Add(n.tax, hadApportionedValue).toFixed(2),
                                                taxamount: fpy_Add(n.taxamount, hadApportionedValue).toFixed(2)
                                            };
                                        } else {
                                            return n;
                                        }
                                    } else {
                                        return n;
                                    }
                                });
                                // 更新发票的税额，合计税额，价税合计
                                return (!hadApportionedValue
                                    ? m
                                    : {
                                        ...m,
                                        items: invoiceItems,
                                        totaltax: fpy_Add(m.totaltax, hadApportionedValue).toFixed(2),
                                        totalamount: fpy_Add(m.totalamount, hadApportionedValue).toFixed(2)
                                    }
                                );
                            }
                        } else {
                            return m;
                        }
                    });
                }
            } else {
                difference = fpy_Minus(o.tax, fpy_Minus(o.taxamount, fpy_toFixedSafe(fpy_accDiv(o.taxamount, fpy_Add(1, o.taxrate)))));
                allApportionedValue =
                needApportionedValue =
                Math.abs(difference) <= taxequipment ? 0 : difference > 0 ? fpy_Minus(difference, taxequipment).toFixed(2) : fpy_Add(difference, taxequipment).toFixed(2);
                // 是否需要分摊
                if (needApportionedValue != 0) {
                    invoiceList = invoiceList.map(m => {
                        // 是否分摊完成
                        if (needApportionedValue != 0) {
                            // 计算发票的总税额误差
                            const invoiceSeError = m.items.reduce((accumulator, b) => {
                                return fpy_Add(accumulator, fpy_Minus(b.tax, fpy_Minus(b.taxamount, fpy_toFixedSafe(fpy_accDiv(b.taxamount, fpy_Add(1, b.taxrate))))));
                            }, 0);
                            // 发票总税额误差不能超过1.27
                            if (Math.abs(invoiceSeError) > 1.27) {
                                return m;
                            } else {
                                let hadApportionedValue = 0; // 被分摊的值
                                const invoiceItems = m.items.map(n => {
                                    // 是否相同明细
                                    if (o.billItemId === n.billItemId) {
                                        // 明细行的误差 0.01
                                        const _difference = fpy_Minus(n.tax, fpy_Minus(n.taxamount, fpy_toFixedSafe(fpy_accDiv(n.taxamount, fpy_Add(1, n.taxrate)))));
                                        // 计算被分摊的值
                                        if (needApportionedValue > 0) {
                                            // needApportionedValue 0.01
                                            // 明细可以加上的税额 taxequipment - 0.01 = 0.05
                                            hadApportionedValue = fpy_Minus(taxequipment, _difference).toFixed(2);
                                            // 被分摊的值是否大于需要分摊的值 0.05 > 0.01
                                            hadApportionedValue = hadApportionedValue >= needApportionedValue ? needApportionedValue : hadApportionedValue;
                                        } else {
                                            // needApportionedValue -0.01
                                            // 明细可以减去的税额 0.01 + taxequipment = 0.07 转换为-0.07
                                            hadApportionedValue = -fpy_Add(_difference, taxequipment).toFixed(2);
                                            // 负数 被分摊的值是否小于需要分摊的值 -0.07 < -0.01
                                            hadApportionedValue = hadApportionedValue <= needApportionedValue ? needApportionedValue : hadApportionedValue;
                                        }

                                        // 是否可以分摊
                                        if (hadApportionedValue) {
                                            // 更新需分摊的值
                                            needApportionedValue = fpy_Minus(needApportionedValue, hadApportionedValue).toFixed(2);

                                            // 更新明细的项目数量，项目金额，税额，合计税额，价税合计
                                            const _xmje = fpy_Add(n.taxamount, hadApportionedValue).toFixed(2);
                                            // 反算数量
                                            const _xmsl = n.taxunitprice ? fpy_toFixedNoZero(fpy_accDiv(_xmje, n.taxunitprice)) : '';
                                            return {
                                                ...n,
                                                num: _xmsl,
                                                actualXmsl: _xmsl,
                                                tax: fpy_Add(n.tax, hadApportionedValue).toFixed(2),
                                                taxamount: _xmje
                                            };
                                        } else {
                                            return n;
                                        }
                                    } else {
                                        return n;
                                    }
                                });
                                // 更新发票的税额，合计税额，价税合计
                                return (!hadApportionedValue
                                    ? m
                                    : {
                                        ...m,
                                        items: invoiceItems,
                                        totaltax: fpy_Add(m.totaltax, hadApportionedValue).toFixed(2),
                                        totalamount: fpy_Add(m.totalamount, hadApportionedValue).toFixed(2)
                                    }
                                );
                            }
                        } else {
                            return m;
                        }
                    });
                }
            }

            if (needApportionedValue != 0) {
                // 最终调整值 防止调整失败
                const finalAdjustmentValue = fpy_Minus(allApportionedValue, needApportionedValue).toFixed(2);

                // 分摊后调整的税额，价税合计
                const _jshjje = fpy_Minus(o.taxamount, finalAdjustmentValue).toFixed(2);
                // 赋值
                _items[i].tax = fpy_Minus(o.tax, finalAdjustmentValue).toFixed(2);
                _items[i].taxamount = _jshjje;
                // 有调整值且含税，需调整项目数量
                if (finalAdjustmentValue != 0 && hsbz === '1') {
                    // 反算数量
                    const _xmsl = o.taxunitprice ? fpy_toFixedNoZero(fpy_accDiv(_jshjje, o.taxunitprice)) : '';
                    _items[i].num = _xmsl;
                    _items[i].actualXmsl = _xmsl;
                }
            }

            // 使用调整后的值
            totalNum = fpy_Add(totalNum, o.num || 0);
            invoice_hjbhsje = fpy_Add(invoice_hjbhsje, o.amount);
            invoice_kphjse = fpy_Add(invoice_kphjse, o.tax);
            invoice_jshjje = fpy_Add(invoice_jshjje, o.taxamount);
        }

        const invoiceData = {
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
            remark: obj.invoiceremark, //备注 invoiceremark
            deduction: obj.deduction, //扣除额 deduction
            buyeremail: obj.buyeremail, // 购方邮箱 buyeremail
            buyerphone: obj.buyerphone, // 购方手机 buyerphone
            hsbz: obj.hsbz, //含税标志 hsbz
            taxedtype: "0", // 忽略
            issuetype: '0', // 0蓝票 1红票
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
            batchbelong: obj.billno.split(',')[0], // 汪意
            issuestatus: "2", // 固定2
            taxedtype: obj.taxationstyle, // 征税方式
            totalNum, // 合计数量 计算
            // invoiceamount: invoice_hjbhsje.toFixed(2), //金额 计算
            // totaltax: invoice_kphjse.toFixed(2), //税额 计算
            // totalamount: invoice_jshjje.toFixed(2), //价税合计 计算
            // items: _items
        };

        // 添加发票 明细行校验分摊 有变动invoiceList的引用，需重新赋值
        invoiceList.push(invoiceData)
        treatmentInvoiceList[id] = invoiceList;

        // 检测是否超限额
        const { isOverLimit, quota } = testForOverLimit(invoice_hjbhsje, invoiceData.invoicetype);
        // common/tip
        if (isOverLimit) model.invoke("common/tip", `待开发票${invoiceList.length}已超过发票限额${quota}，请修改！`);

        // 有效需要更新的selectedRowKeys
        updateTreatmentRemainingItems(_items.map(o => o.billItemId), true);

        // 更新发票总数
        updateTreatmentInvoiceAll(invoiceList.length);

        // 添加设置
        treatmentInvoiceListSetMap[id].push({
            showFixedNumber: _items.some(o => o.unitprice),
            fixedNumber: 0,
            taxFreeAdjust: false,
            hadHzxxbm: !!invoiceData.infocode,
            hadBlueInvoice: !!invoiceData.blueinvoicecode
        });
        addTreatmentInvoice();
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

    // 单据明细处理-按明细开票 修改数量
    function treatmentChangeXmsl(v, invoiceIndex, itemIndex, whetherToTest) {
        const { id: billId, hsbz, maintaxdeviation } = treatmentShowBillList[treatmentIndex];
        const invoiceList = treatmentInvoiceList[billId];
        const { fixedNumber } = treatmentInvoiceListSetMap[billId][invoiceIndex];
        const { id, items, invoicetype } = invoiceList[invoiceIndex];
        const { num, amount, tax, taxamount, actualXmsl, originalXmdj, originalTaxXmdj, originalJshjje, billItemId } = items[itemIndex];
        const tableDom = $(`#imc_invoiceWorkbench_treatment_invoice${id}`).find('tbody').find('tr');

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

        // 是否固定数量
        if (fixedNumber) {
            const _xmsl = value;
            const _unitprice = fpy_toFixedTwoOrMore(fpy_accDiv(amount, _xmsl));
            const _taxunitprice = fpy_toFixedTwoOrMore(fpy_accDiv(taxamount, _xmsl));

            items[itemIndex].num = _xmsl;
            items[itemIndex].unitprice = _unitprice;
            items[itemIndex].taxunitprice = _taxunitprice;
            items[itemIndex].isInverseXmdj = true;// 赋值
            tableDom.eq(itemIndex).find('input[name=num]').val(items[itemIndex].num).prop('title', items[itemIndex].num);
            const val = fpy_toFixedTwoOrMore(hsbz === '1' ? items[itemIndex].taxunitprice : items[itemIndex].unitprice);
            tableDom.eq(itemIndex).find('.xmdj').text(val).prop('title', val);
        } else {
            const remainingItems = treatmentRemainingItems[billId].items;

            // 校验可开的发票明细
            let txable_xmsl = actualXmsl;
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
            } else if (Number(txable_xmsl) === Number(_xmsl) || Number(txable_jshjje) === Number(_jshjje)) {
                // 相等，使用可开明细
                items[itemIndex].num = txable_xmsl;
                items[itemIndex].actualXmsl = txable_xmsl;
                items[itemIndex].tax = txable_se;
                items[itemIndex].amount = txable_hjbhsje;
                items[itemIndex].taxamount = txable_jshjje;
            } else {
                // 不等，使用反算明细
                items[itemIndex].num = _xmsl;
                items[itemIndex].actualXmsl = _xmsl;
                items[itemIndex].tax = _se;
                items[itemIndex].amount = _hjbhsje;
                items[itemIndex].taxamount = _jshjje;
            }
            // 编辑后需将单价调整回原始单价originalXmdj，并将isInverseXmdj改为false
            items[itemIndex].actualXmdj = originalXmdj;
            items[itemIndex].actualTaxXmdj = originalTaxXmdj;
            items[itemIndex].isInverseXmdj = false;

            // 明细金额误差不能超过0.01
            // 若超需反算单价
            // 是否反算过单价 isInverseXmdj 默认false未反算
            if (hsbz === '0') {
                if (originalXmdj && Math.abs(fpy_Minus(fpy_toFixedSafe(fpy_accMul(items[itemIndex].actualXmsl, items[itemIndex].actualXmdj)), items[itemIndex].amount)) > 0.01) {
                    // 反算单价
                    items[itemIndex].actualXmdj = fpy_toFixedTwoOrMore(fpy_accDiv(items[itemIndex].amount, items[itemIndex].actualXmsl));
                    items[itemIndex].isInverseXmdj = true;
                }
            } else {
                if (originalTaxXmdj && Math.abs(fpy_Minus(fpy_toFixedSafe(fpy_accMul(items[itemIndex].actualXmsl, items[itemIndex].actualTaxXmdj)), items[itemIndex].taxamount)) > 0.01) {
                    // 反算单价
                    items[itemIndex].actualTaxXmdj = fpy_toFixedTwoOrMore(fpy_accDiv(items[itemIndex].taxamount, items[itemIndex].actualXmsl));
                    items[itemIndex].isInverseXmdj = true;
                }
            }
            items[itemIndex].unitprice = items[itemIndex].actualXmdj;
            items[itemIndex].taxunitprice = items[itemIndex].actualTaxXmdj;

            // 赋值
            tableDom.eq(itemIndex).find('input[name=num]').val(items[itemIndex].num).prop('title', items[itemIndex].num);
            if (maintaxdeviation && maintaxdeviation != 0) {
                tableDom.eq(itemIndex).find('input[name=tax]').val(items[itemIndex].tax).prop('title', items[itemIndex].tax);
            } else {
                tableDom.eq(itemIndex).find('.tax').text(items[itemIndex].tax).prop('title', items[itemIndex].tax);
            }
            tableDom.eq(itemIndex).find('input[name=taxamount]').val(items[itemIndex].taxamount).prop('title', items[itemIndex].taxamount);
            tableDom.eq(itemIndex).find('.amount').text(items[itemIndex].amount).prop('title', items[itemIndex].amount);
            const val = fpy_toFixedTwoOrMore(hsbz === '1' ? items[itemIndex].taxunitprice : items[itemIndex].unitprice);
            tableDom.eq(itemIndex).find('.xmdj').text(val).prop('title', val);

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
            const invoice_hjbhsje = updateTreatmentInvoiceTotalByIndex(invoiceIndex);

            // 检测是否超限额
            if (whetherToTest) {
                const { isOverLimit, quota } = testForOverLimit(invoice_hjbhsje, invoicetype);
                // common/tip
                if (isOverLimit) model.invoke("common/tip", `待开发票${invoiceIndex + 1}已超过发票限额${quota}，请修改！`);
            }

            updateTreatmentRemainingItems(keys);
        }
    }

    // 单据明细处理-按明细开票 修改数量 失去焦点
    function treatmentBlurXmsl(v, invoiceIndex, itemIndex) {
        if (v === '-') {
            treatmentDeleteItem(invoiceIndex, itemIndex);
        } else {
            v = fpy_toFixedNoZero(Number(v));
            if (v === '0') {
                treatmentDeleteItem(invoiceIndex, itemIndex);
            } else {
                treatmentChangeXmsl(v, invoiceIndex, itemIndex, true);
            }
        }
    }

    // 单据明细处理-按明细开票 修改金额
    function treatmentChangeJshjje(v, invoiceIndex, itemIndex, whetherToTest) {
        const { id: billId, hsbz, maintaxdeviation } = treatmentShowBillList[treatmentIndex];
        const invoiceList = treatmentInvoiceList[billId];
        const { fixedNumber } = treatmentInvoiceListSetMap[billId][invoiceIndex];
        const { id, items, invoicetype } = invoiceList[invoiceIndex];
        const { num, amount, tax, taxamount, actualXmsl, originalXmdj, originalTaxXmdj, originalJshjje, billItemId } = items[itemIndex];
        const tableDom = $(`#imc_invoiceWorkbench_treatment_invoice${id}`).find('tbody').find('tr');

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
        let txable_xmsl = actualXmsl;
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
        const _actualXmsl = originalTaxXmdj ? fpy_toFixedNoZero(fpy_accMul(percent, txable_xmsl), 8) : '';
        const _xmsl = fixedNumber ? num : _actualXmsl;
        const _se = fpy_toFixedSafe(fpy_accMul(percent, txable_se));
        const _hjbhsje = fpy_Minus(_jshjje, _se).toFixed(2);
        // 根据含税金额判断
        if (Math.abs(txable_jshjje) < Math.abs(_jshjje)) {
            tableDom.eq(itemIndex).find(`input[name=taxamount]`).val(items[itemIndex].taxamount);
            // common/tip
            model.invoke("common/tip", `明细剩余可开含税金额为${txable_jshjje}，输入不可超过该数值！`);
            return;
        } else if (Number(txable_jshjje) === Number(_jshjje) || (originalTaxXmdj && Number(txable_xmsl) === Number(_actualXmsl))) {
            // 相等，使用可开明细
            items[itemIndex].num = _xmsl;
            items[itemIndex].actualXmsl = txable_xmsl;
            items[itemIndex].tax = txable_se;
            items[itemIndex].amount = txable_hjbhsje;
            items[itemIndex].taxamount = txable_jshjje;
        } else {
            // 不等，使用反算明细
            items[itemIndex].num = _xmsl;
            items[itemIndex].actualXmsl = _actualXmsl;
            items[itemIndex].tax = _se;
            items[itemIndex].amount = _hjbhsje;
            items[itemIndex].taxamount = _jshjje;
        }
        // 编辑后需将单价调整回原始单价originalXmdj，并将isInverseXmdj改为false
        items[itemIndex].actualXmdj = originalXmdj;
        items[itemIndex].actualTaxXmdj = originalTaxXmdj;
        items[itemIndex].isInverseXmdj = false;

        // 明细金额误差不能超过0.01
        // 若超需反算单价
        // 是否反算过单价 isInverseXmdj 默认false未反算
        if (hsbz === '0') {
            if (originalXmdj && Math.abs(fpy_Minus(fpy_toFixedSafe(fpy_accMul(items[itemIndex].actualXmsl, items[itemIndex].actualXmdj)), items[itemIndex].amount)) > 0.01) {
                // 反算单价
                items[itemIndex].actualXmdj = fpy_toFixedTwoOrMore(fpy_accDiv(items[itemIndex].amount, items[itemIndex].actualXmsl));
                items[itemIndex].isInverseXmdj = true;
            }
        } else {
            if (originalTaxXmdj && Math.abs(fpy_Minus(fpy_toFixedSafe(fpy_accMul(items[itemIndex].actualXmsl, items[itemIndex].actualTaxXmdj)), items[itemIndex].taxamount)) > 0.01) {
                // 反算单价
                items[itemIndex].actualTaxXmdj = fpy_toFixedTwoOrMore(fpy_accDiv(items[itemIndex].taxamount, items[itemIndex].actualXmsl));
                items[itemIndex].isInverseXmdj = true;
            }
        }
        items[itemIndex].unitprice = fixedNumber ? fpy_toFixedTwoOrMore(fpy_accDiv(items[itemIndex].amount, items[itemIndex].num)) : items[itemIndex].actualXmdj;
        items[itemIndex].taxunitprice = fixedNumber ? fpy_toFixedTwoOrMore(fpy_accDiv(items[itemIndex].taxamount, items[itemIndex].num)) : items[itemIndex].actualTaxXmdj;

        // 赋值
        tableDom.eq(itemIndex).find('input[name=num]').val(items[itemIndex].num).prop('title', items[itemIndex].num);
        if (maintaxdeviation && maintaxdeviation != 0) {
            tableDom.eq(itemIndex).find('input[name=tax]').val(items[itemIndex].tax).prop('title', items[itemIndex].tax);
        } else {
            tableDom.eq(itemIndex).find('.tax').text(items[itemIndex].tax).prop('title', items[itemIndex].tax);
        }
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
        const invoice_hjbhsje = updateTreatmentInvoiceTotalByIndex(invoiceIndex);

        // 检测是否超限额
        if (whetherToTest) {
            const { isOverLimit, quota } = testForOverLimit(invoice_hjbhsje, invoicetype);
            // common/tip
            if (isOverLimit) model.invoke("common/tip", `待开发票${invoiceIndex + 1}已超过发票限额${quota}，请修改！`);
        };

        updateTreatmentRemainingItems(keys);
    }

    // 单据明细处理-按明细开票 修改金额 失去焦点
    function treatmentBlurJshjje(v, invoiceIndex, itemIndex) {
        if (v === '-') {
            treatmentDeleteItem(invoiceIndex, itemIndex);
        } else {
            v = fpy_toFixedSafe(v);
            if (v === '0.00') {
                treatmentDeleteItem(invoiceIndex, itemIndex);
            } else {
                treatmentChangeJshjje(v, invoiceIndex, itemIndex, true);
            }
        }
    }

    // 单据明细处理-按明细开票 修改税额 失去焦点
    function treatmentBlurSe(v, invoiceIndex, itemIndex) {
        // maintaxdeviation 税额尾差 原单据税额减去按规则拆分后的税额 大于0，票需补上；小于0，票需减去
        // adjustedData 税额调整值 修改后的税额减去按规则拆分后的税额
        const { id: billId, hsbz, maintaxdeviation = 0, adjustedData = 0 } = treatmentShowBillList[treatmentIndex];
        const invoiceList = treatmentInvoiceList[billId];
        const { id, items } = invoiceList[invoiceIndex];
        const { num, unitprice, amount, tax, taxrate, taxamount } = items[itemIndex];
        const tableDom = $(`#imc_invoiceWorkbench_treatment_invoice${id}`).find('tbody').find('tr').eq(itemIndex);

        const _tax = Number(tax).toFixed(2);
        let value = v.trim();
        if (isNaN(value)) {
            tableDom.find(`input[name=tax]`).val(_tax);
            // common/tip
            model.invoke("common/tip", '请输入数值！');
            return;
        } else {
            // 自动转换
            value = (taxamount > 0 && value < 0) || (taxamount < 0 && value > 0) ? -value : value;
        }
        value = fpy_toFixedSafe(value);

        // 税额调整模式
        // 根据税盘限制调整税额，不反算单价 - 0-默认模式
        // 自由调整 - 1-自由调整
        // 根据税盘限制调整税额，超过金额误差后反算单价 - 2-反算单价 这里暂未支持
        const taxAdjustMode = treatmentInvoiceListSetMap[billId][invoiceIndex].taxFreeAdjust ? '1' : '0';

        const difference = fpy_Minus(value, tax); // 税额调整值


        let isError = false;
        // 是否自由调整
        if (taxAdjustMode !== '1') {
            const remainingTotalError = fpy_Minus(maintaxdeviation, adjustedData);
            if (remainingTotalError > 0) {
                if (difference > remainingTotalError) {
                    isError = '无法修改，所改税额已超出总尾差范围，请重新修改！';
                } else if (difference < 0) {
                    isError = '单据税额大于待开发票税额，请增加发票税额！';
                }
            } else if (remainingTotalError < 0) {
                if (difference < remainingTotalError) {
                    isError = '无法修改，所改税额已超出总尾差范围，请重新修改！';
                } else if (difference > 0) {
                    isError = '单据税额小于待开发票税额，请减少发票税额！';
                }
            } else {
                isError = '当前无税额尾差，无需修改！';
            }
        }

        if (isError) {
            tableDom.find('input[name=tax]').val(_tax).prop('title', _tax);
            // common/tip
            model.invoke("common/tip", isError);
        } else {
            let _unitprice = unitprice;
            const _amount = fpy_Minus(amount, difference).toFixed(2);
            // 计算正确的对比税额
            // 用调整后的不含税金额和税率计算对比税额
            // 不含税金额以数量不含税单价乘积为准；无数量单价时，不计算不含税金额误差 FIXME 确定不含税金额的对比基准是否正确
            const taxCal = fpy_toFixedSafe(fpy_accMul(_amount, taxrate));

            // 是否自由调整
            if (taxAdjustMode !== '1') {
                if (Math.abs(fpy_Minus(value, taxCal)) > taxequipment) {
                    isError = `待开发票的明细税额误差超过±${taxequipment}，请重新修改!`;
                } else if (unitprice && Math.abs(fpy_Minus(_amount, fpy_toFixedSafe(fpy_accMul(num, unitprice)))) > 0.01) {
                    isError = '待开发票的明细金额误差超过±0.01，请重新修改!';
                }
            } else {
                if (taxamount < 0 && _amount > 0) {
                    isError = `负数待开发票的明细金额需小于0，请重新修改!`;
                } else if (taxamount > 0 && _amount < 0) {
                    isError = `正数待开发票的明细金额需大于0，请重新修改!`;
                } else if (unitprice && Math.abs(fpy_Minus(_amount, fpy_toFixedSafe(fpy_accMul(num, unitprice)))) > 0.01) {
                    _unitprice = fpy_toFixedSafe(fpy_accDiv(_amount, num));
                }
            }

            if (isError) {
                tableDom.find('input[name=tax]').val(_tax).prop('title', _tax);
                // common/tip
                model.invoke("common/tip", isError);
            } else {
                let targetBillItemId;
                // 非按明细拆分方案 更新发票关联关系
                treatmentInvoiceRelationMap[billId] = treatmentInvoiceRelationMap[billId].map(o => {
                    // 关联关系的发票明细id等于当前明细id
                    if (o.tdetailid === items[itemIndex].id) {
                        // 标记目标单据明细Id
                        targetBillItemId = o.sdetailid;
                        return {
                            ...o,
                            unitprice: _unitprice,
                            tax: value,
                            amount: _amount
                        };
                    } else {
                        return o;
                    }
                });

                // 更新税额调整值
                const _adjustedData = fpy_Add(adjustedData, difference);
                treatmentShowBillList[treatmentIndex].adjustedData = _adjustedData;
                treatmentShowBillList[treatmentIndex].sim_original_bill_item = treatmentShowBillList[treatmentIndex].sim_original_bill_item.map(o => {
                    // 根据目标单据明细Id
                    if (targetBillItemId === o.id) {
                        return {
                            ...o,
                            adjustedData: fpy_Add(o.adjustedData || 0, difference)
                        };
                    } else {
                        return o;
                    }
                });

                // 赋值
                items[itemIndex].adjustedData = fpy_Add(items[itemIndex].adjustedData || 0, difference);
                items[itemIndex].unitprice = _unitprice;
                items[itemIndex].tax = value;
                items[itemIndex].amount = _amount;
                // 不含税，有单价
                if (hsbz === '0' && unitprice) tableDom.find('.xmdj').text(_unitprice).prop('title', _unitprice);
                tableDom.find(`input[name=tax]`).val(value).prop('title', value);
                tableDom.find('.amount').text(_amount).prop('title', _amount);

                // 更改发票的合计
                updateTreatmentInvoiceTotalByIndex(invoiceIndex);

                // 刷新单据税额尾差
                const diff = fpy_Minus(maintaxdeviation || 0, _adjustedData);
                if (diff === 0) {
                    $treatment_bill.find('.item').eq(treatmentIndex).find('.error').hide();
                } else {
                    $treatment_bill.find('.item').eq(treatmentIndex).find('.error').text(`税额尾差：${diff}`);
                }
            }
        }
    }

    // 单据明细处理-按明细开票 删除明细·
    function treatmentDeleteItem(invoiceIndex, itemIndex) {
        const { id: billId } = treatmentShowBillList[treatmentIndex];
        const invoiceList = treatmentInvoiceList[billId];
        const invoiceListSet = treatmentInvoiceListSetMap[billId];
        const { id: invoiceId, invoicetype, items } = invoiceList[invoiceIndex];

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
            const invoice_hjbhsje = updateTreatmentInvoiceTotalByIndex(invoiceIndex);

            const { isOverLimit, quota } = testForOverLimit(invoice_hjbhsje, invoicetype);
            // common/tip
            if (isOverLimit) model.invoke("common/tip", `待开发票${invoiceIndex + 1}已超过发票限额${quota}，请修改！`);

            // 更新设置
            const { showFixedNumber } = invoiceListSet[invoiceIndex];
            const _showFixedNumber = items.some(o => o.unitprice);
            invoiceListSet[invoiceIndex].showFixedNumber = _showFixedNumber;
            // 原先为可以固定数量，现在不可以
            if (showFixedNumber && !_showFixedNumber) updateTreatmentInvoiceInfoByIndex(invoiceIndex);

            // 删除html节点，有折扣行先删除折扣行
            const tableDom = $(`#imc_invoiceWorkbench_treatment_invoice${invoiceId}`).find('.workbench-table-tbody').find('tr');
            if (delLength === 2) tableDom.eq(itemIndex + 1).remove();
            tableDom.eq(itemIndex).remove();
        } else {
            invoiceList.splice(invoiceIndex, 1);
            invoiceListSet.splice(invoiceIndex, 1);

            // 删除html节点
            $treatment_invoice.find('.item').eq(invoiceIndex).remove();

            // 更新发票总数
            updateTreatmentInvoiceAll(invoiceList.length);
        }
        updateTreatmentRemainingItems(keys);
    }

    // 单据明细处理-按明细开票 删除货物运输
    function treatmentDeleteTransportItem(invoiceIndex, itemIndex) {
        const { id: billId } = treatmentShowBillList[treatmentIndex];
        const invoiceList = treatmentInvoiceList[billId];
        const { id: invoiceId, freights } = invoiceList[invoiceIndex];
        if (freights.length === 1) {
            model.invoke("common/tip", '至少保留一行');
            return;
        }
        freights.splice(itemIndex, 1);
        // 删除html节点
        const tableDom = $(`#imc_invoiceWorkbench_treatment_goodsTransport${invoiceId}`).find('.workbench-table-tbody').find('tr');
        tableDom.eq(itemIndex).remove();
        testTreatmentBillFinished(treatmentIndex);
    };

    // 发票预览
    function showPreview() {
        showPreviewBill();
        showPreviewInvoice();
        updatePreviewHeader();
    }

    // 发票预览-单据
    function showPreviewBill() {
        const _html = [];
        for (let i = 0; i < treatmentShowBillList.length; i++) {
            const obj = treatmentShowBillList[i];
            _html.push(`<div class="item ${i === previewIndex ? 'actived' : ''}">
                <div class="text truncateText">账单编号：<span class="primary" title="${obj.billno}">${handleBillNo(obj.billno)}</span></div>
                <div class="text">账单总金额：<span class="warning">${Number(obj.total_amount).toFixed(2)}</span></div>
                <div class="text">可下推金额：<span class="warning">${Number(obj.invoicable_amount).toFixed(2)}</span></div>
            </div>`);
        }
        $preview_bill.html(_html.join(''));
    }

    // 发票预览-发票
    function showPreviewInvoice() {
        const invoiceList = previewInvoiceList[treatmentShowBillList[previewIndex].id];
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
        if (hidePreback) {
            $preview.find('.footer .prev').hide();
        }
        $preview_invoice.attr('data-info', `发票（${previewInvoiceIndex + 1}/${length}）`);
        // 是否收购票
        // '' '00' 非特殊票种
        // '02' 收购票
        // '06' 抵扣通行费
        // '07' 不抵扣通行费
        // '08' 成品油
        const isAcquisition = obj.specialtype === '02';
        const invoice_qd = obj.invoicetype === '08xdp' || obj.invoicetype === '10xdp';
        const isSpecialE03 = obj.specialtype === 'E03';
        const isSpecialE06 = obj.specialtype === 'E06';
        const isSpecialE05 = obj.specialtype === 'E05';
        const isSpecialE04 = obj.specialtype === 'E04';
        const isSpecialE01 = obj.specialtype === 'E01';
        const specialName = isSpecialE03 ? '--建筑服务' : isSpecialE06 ? '--不动产经营租赁服务' : isSpecialE05 ? '--不动产销售服务' : isSpecialE04 ? '--货物运输服务' : isSpecialE01 ? '--成品油' : '';
        $preview_invoiceType.text(`${invoice_qd ? '' : '增值税'}${INVOICE_TYPES_DICT['k' + obj.invoicetype] || obj.invoicetype}${isAcquisition ? '（收购）' : ''}${specialName}`);
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
        if(hidePreback){
            $preview_saler.find('.saleraddr').parent().text(obj.saleraddr);
            $preview_saler.find('.salerbank').parent().text(obj.salerbank);
        } else {
            $preview_saler.find('.saleraddr').val(obj.saleraddr).prop('title', obj.saleraddr).prop("disabled", previewDataSave);
            $preview_saler.find('.salerbank').val(obj.salerbank).prop('title', obj.salerbank).prop("disabled", previewDataSave);
        }

        if (isSpecialE06) {
            $preview_bz.html(
                `<div><span style="color: #8d5505">不动产地址：</span>${obj.simpleaddress_name}${obj.detailaddress}</div>
                <div><span style="color: #8d5505">租赁期起止：</span>${obj.startleasedate.substring(0, 10)}~${obj.endleasedate.substring(0, 10)}</div>
                <div><span style="color: #8d5505">跨地（市）标志：</span>${obj.crosscitysign === '1' ? '是' : '否'}</div>
                <div>${obj.remark.replaceAll('\r\n', '\n').replaceAll('\n', '<br/>')}</div>`
            )
        } else if (isSpecialE03) {
            $preview_bz.html(
                `<div><span style="color: #8d5505">土地增值税项目编号：</span>${obj.landtaxno}</div>
                <div><span style="color: #8d5505">跨地（市）标志：</span>${obj.crosscitysign === '1' ? '是' : '否'}</div>
                <div>${obj.remark.replaceAll('\r\n', '\n').replaceAll('\n', '<br/>')}</div>`
            )
        }  else if (isSpecialE05) {
            $preview_bz.html(
                `<div><span style="color: #8d5505">核定计税价格：</span>${obj.approvedprice}</div>
                <div><span style="color: #8d5505">实际成交含税金额：</span>${obj.actualturnover}</div>
                <div><span style="color: #8d5505">不动产单元代码/网签合同备案编号: </span>${obj.estatecode}</div>
                <div><span style="color: #8d5505">土地增值税项目编号：</span>${obj.landtaxno}</div>
                <div><span style="color: #8d5505">跨地（市）标志：</span>${obj.crosscitysign === '1' ? '是' : '否'}</div>
                <div><span style="color: #8d5505">不动产地址：</span>${obj.simpleaddress_name}${obj.detailaddress}</div>
                <div>${obj.remark.replaceAll('\r\n', '\n').replaceAll('\n', '<br/>')}</div>`
            )
        } else {
            $preview_bz.html(
                obj.totalamount < 0 && (obj.invoicetype === '028' || obj.invoicetype === '004') ?
                `<textarea name="remark" maxlength="100" class="bz">${obj?.applyreason || ''}</textarea>` :
                `<textarea name="remark" maxlength="100" class="bz">${obj?.remark || ''}</textarea>`
            );
        }
        $preview_item.eq(3).css({ display: isSpecialE03 ? 'none' : '' });
        $preview_item.eq(4).css({ display: isSpecialE03 ? 'none' : '' });
        $preview_item.eq(1).text(`${isSpecialE06 || isSpecialE05 ? '产权证书/不动产权证号' : isSpecialE03 ? '建筑服务发生地' : '规格型号'}`);
        isSpecialE03 && $preview_item.eq(1).css({ width: '220px' })
        $preview_item.eq(2).text(`${isSpecialE06 || isSpecialE05 ? '面积单位' : isSpecialE03 ? '建筑项目名称' : '单位'}`);
        isSpecialE06 && $preview_item.eq(1).css({ width: '130px' });
        $preview_item.eq(4).text(`单价（不含税）`);
        $preview_item.eq(5).text(`金额（不含税）`);
        const _html = [];
        const transportHtml = [];
        for (let i = 0; i < obj.items.length; i++) {
            const cur = obj.items[i];
            const xmsl = cur.num ? fpy_toFixedNoZero(cur.num) : '';
            let xmdj = cur.unitprice;
            xmdj = xmdj ? fpy_toFixedTwoOrMore(xmdj) : '';
            const xmje = Number(cur.amount).toFixed(2);
            let sl = cur.taxrate && cur.taxrate !== null ? cur.taxrate * 100 + '%' : '';
            sl += cur.taxpremark === '1' && cur.zzstsgl !== '' ? `(${cur.zzstsgl})` : '';
            const se = Number(cur.tax).toFixed(2);
            _html.push(`<div class="line">
                <div class="item truncateText" title="${cur.goodsname}">${cur.goodsname}</div>
                ${
                    isSpecialE06 ? (
                        `<div class="item truncateText" title="${obj.estateid}">${obj.estateid}</div>
                        <div class="item truncateText" title="${obj.areaunit}">${obj.areaunit}</div>`
                    ) : isSpecialE03 ? (
                        `<div class="item truncateText" style="width: 220px" title="${obj.simpleaddress_name}${obj.detailaddress}">${obj.simpleaddress_name}${obj.detailaddress}</div>
                        <div class="item truncateText" title="${obj.buildingname}">${obj.buildingname}</div>`
                    )  : isSpecialE05 ? (
                        `<div class="item truncateText" title="${obj.estateid}">${obj.estateid}</div>
                        <div class="item truncateText" title="${obj.areaunit}">${obj.areaunit}</div>`
                    ) : (cur.rowtype === '1' || hidePreback ? (
                        `<div class="item truncateText" title="${cur.specification}">${cur.specification}</div>
                        <div class="item truncateText" title="${cur.unit}">${cur.unit}</div>`
                    ) : (
                        `<div class="item">
                            <input class="searchInput" type="text" maxlength="40" name="specification" value="${cur.specification}" title="${cur.specification}" ${previewDataSave ? 'disabled' : ''} autocomplete="off" />
                        </div>
                        <div class="item">
                            <input class="searchInput" type="text" maxlength="40" name="unit" value="${cur.unit}" title="${cur.unit}" ${previewDataSave ? 'disabled' : ''} autocomplete="off" />
                        </div>`
                    ))
                }
                ${isSpecialE03 ? '' : (
                    `<div class="item">
                        <input class="searchInput" type="text" maxlength="16" name="xmsl" value="${xmsl}" title="${xmsl}" ${previewDataSave ? 'disabled' : ''} autocomplete="off" />
                    </div>
                    <div class="item truncateText xmdj" title="${xmdj}">${xmdj}</div>`
                )}
                <div class="item truncateText" title="${xmje}">${xmje}</div>
                <div class="item truncateText sl" title="${sl}">${sl}</div>
                <div class="item truncateText" title="${se}">${se}</div>
            </div>`);
            //<div class="item truncateText" title="${xmsl}">${xmsl}</div>
        }
        // 非货物运输不展示
        if (!isSpecialE04) {
            $preview_transportLine.css({ display: 'none' });
        }
        if (obj?.freights?.length) {
            for (let i = 0; i < obj.freights.length; i++) {
                const cur = obj.freights[i];
                transportHtml.push(`<div class="line">
                    <div class="item truncateText" title="${cur.transporttype}">${cur.transporttype}</div>
                    <div class="item truncateText" title="${cur.licenseplate}">${cur.licenseplate}</div>
                    <div class="item truncateText" title="${cur.startplace}">${cur.startplace}</div>
                    <div class="item truncateText" title="${cur.endplace}">${cur.endplace}</div>
                    <div class="item truncateText" title="${cur.transportgoods}">${cur.transportgoods}</div>
                </div>`);
            }
        }
        $preview_detail.html(_html.join(''));
        $preview_transportDetail.html(transportHtml.join(''));
        $preview_operator.eq(0).text(obj.payee);
        $preview_operator.eq(1).text(obj.reviewer);
        $preview_operator.eq(2).text(obj.drawer);
        // if (invoice_qd) {
        //     $preview_operator.eq(0).remove();
        //     $preview_operator.eq(1).remove();
        //     $preview_operator_name.eq(0).remove();
        //     $preview_operator_name.eq(1).remove();
        // }
    }

    // 发票预览-更新头部
    function updatePreviewHeader(hide) {
        let num = '- -';
        let jshj = '- -';
        if (!hide) {
            let _data = [0, 0];
            for (const i in previewInvoiceList) {
                const ary = previewInvoiceList[i];
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
        const invoiceList = previewInvoiceList[treatmentShowBillList[previewIndex].id];
        const curInvoiceId = invoiceList[previewInvoiceIndex].id;
        for (const o in previewInvoiceList) {
            for(let i = 0; i < previewInvoiceList[o].length; i++) {
                if (previewInvoiceList[o][i].id === curInvoiceId) {
                    previewInvoiceList[o][i].items[itemIndex][name] = value;
                }
            }
        }
        const { items } = invoiceList[previewInvoiceIndex];
        items[itemIndex][name] = value;
    }

    // 发票预览-根据名称税收分类编码同步明细
    function previewSyncItem(name, itemIndex) {
        const invoiceList = previewInvoiceList[treatmentShowBillList[previewIndex].id];
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
        const invoiceList = previewInvoiceList[treatmentShowBillList[previewIndex].id];
        const curInvoiceId = invoiceList[previewInvoiceIndex].id;
        for (const o in previewInvoiceList) {
            for(let i = 0; i < previewInvoiceList[o].length; i++) {
                if (previewInvoiceList[o][i].id === curInvoiceId) {
                    previewInvoiceList[o][i][name] = value;
                }
            }
        }
        invoiceList[previewInvoiceIndex][name] = value;
    }

    // 发票预览-同步发票地址电话
    function previewSyncInvoiceSale(name = '') {
        const invoiceList = previewInvoiceList[treatmentShowBillList[previewIndex].id];
        const names = name.split(',');
        for (let i = 0; i < invoiceList.length; i++) {
            if (i !== previewInvoiceIndex) {
                for (const key of names) {
                    invoiceList[i][key] = invoiceList[previewInvoiceIndex][key];
                }
            }
        }
    }

    // 开票结果
    function showResult() {
        resultTotal = 0;
        for (const i in previewInvoiceList) {
            resultTotal += previewInvoiceList[i].length;
        }
        //const _data = billList.map(o => o.id);
        // 设置头部 发票张数
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
                    width: 30,
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
                    ellipsis: true,
                    width: 70
                },
                {
                    align: 'left',
                    title: '发票号码',
                    dataIndex: 'invoiceno',
                    ellipsis: true,
                    width: 180
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
                    ellipsis: true,
                    width: 100
                },
                {
                    align: 'left',
                    title: '购方名称',
                    dataIndex: 'buyername',
                    ellipsis: true,
                    width: 140
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

                const successList = resultList.filter(o => o.issuestatus !== '3');
                const hasPaperInvoice = successList.some(o => o.issuestatus === '0' && (o.invoicetype === '007' || o.invoicetype === '004') && o?.iselepaper !== '1');
                // 纸票打印
                if (hasPaperInvoice) $result_print.show();
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
            const hasPaperInvoiceNoPrint = paperInvoiceList.some(o => o.printflag !== '1');
            if (resultIsComplete) {
                if (paperInvoiceList.length) $result_print.show();
                if (hasPaperInvoiceNoPrint) $result_print.removeClass('disabled');
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
                    // {
                    //     align: 'center',
                    //     title: '操作',
                    //     dataIndex: 'id',
                    //     width: 80,
                    //     render: (t, r) => r.issuestatus === '3' ? `<a href="javascript:;" data-key="${t}">重新开票</a>` : ''
                    // }
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
                        width: 30,
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
                        ellipsis: true,
                        width: 70
                    },
                    {
                        align: 'center',
                        title: '发票号码',
                        dataIndex: 'invoiceno',
                        ellipsis: true,
                        width: 180
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
                        ellipsis: true,
                        width: 100
                    },
                    {
                        align: 'left',
                        title: '购方名称',
                        dataIndex: 'buyername',
                        ellipsis: true,
                        width: 140
                    },
                    {
                        title: '开票状态',
                        dataIndex: 'issuestatus',
                        width: 80,
                        render: t => `<span class="success">${ISSUE_STATUS_DICT['k' + t] || t}</span>`
                    },
                    // {
                    //     align: 'center',
                    //     title: '打印状态',
                    //     dataIndex: 'id',
                    //     width: 80,
                    //     render: (t, r) => {
                    //         return (
                    //             (r.invoicetype === '026' || r.invoicetype === '028' || !r.printflag)
                    //                 ? ''
                    //                 : r.printflag === '1'
                    //                     ? `<span class="primary">${PRINT_FLAG_DICT['k' + r.printflag]}</span>`
                    //                     : `<a href="javascript:;" data-key="${t}">${PRINT_FLAG_DICT['k' + r.printflag]}</a>`
                    //         );
                    //     }
                    // }
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
				"redinvoiceid": redinvoiceid,
				"blueinvoiceid": blueinvoiceid
			};
            model.invoke("issue/showDetail", request);
        }, 3000);
    }

    // 公共确认弹窗回调
    function commonConfirmCallback(data) {
        const { key, isOk, name, index } = data;
        if (isOk) {
            switch (key) {
            case 'preview_sync_item':
                previewSyncItem(name, index);
                break;
            case 'preview_sync_sale':
                previewSyncInvoiceSale(name);
                break;
            default:
                break;
            }
        }
    }

    // 单据明细处理-计算生成发票后，左侧内容的初始值
    function handleAfterInvoice() {
        // 改变可下推开票申请金额
        curTotalAmount = fpy_Minus(curTotalAmount, applyAmounts.reduce((a, b) => fpy_Add(a, b.currentApplyAmount), []));
        applyAmounts = applyAmounts.map(item => ({
            ...item,
            canApplyAmount: fpy_Minus(item.canApplyAmount, item.currentApplyAmount),
            currentApplyAmount: 0
        }));
        billList = billList.map(item => ({
            ...item,
            invoicable_amount: fpy_Minus(item.invoicable_amount, item.curTotalAmount),
            curTotalAmount: 0,
            sim_isomerism_item_data: item.sim_isomerism_item_data.map(i => ({
                ...i,
                unpushamount: fpy_Minus(i.unpushamount, i.remainvalidamount || 0),
                remainvalidamount: 0
            }))
        }));
        initHandleBill();
        showTreatmentBill();
    };

    // 单据明细处理-生成发票的默认最大值
    function initHandleBill() {
        for (let i = 0; i < applyAmounts.length; i++) {
            let currentApplyAmount = 0;
            if (applyAmounts[i].canApplyAmount > 0) {
                for (let j = 0; j < billList.length; j++) {
                    // 账单遍历时，既不能超过类型可开票金额，也不能超过账单可开票金额
                    if (currentApplyAmount >= applyAmounts[i].canApplyAmount || billList[j].curTotalAmount >= billList[j].invoicable_amount) {
                        continue;
                    }
                    const detailList = billList[j].sim_isomerism_item_data;
                    for (let z = 0; z < detailList.length; z++) {
                        // 类型一致的遍历
                        if (detailList[z].itemtypenumber !== applyAmounts[i].number) {
                            continue;
                        }
                        let itemAmount = detailList[z].unpushamount; // 当前明细可下推金额
                        
                        
                        // 如果加上明细可下推金额大于类型可下推金额
                        if (fpy_Add(currentApplyAmount, itemAmount) > applyAmounts[i].canApplyAmount) {
                            // 如果加上明细可下推金额大于账单可下推金额
                            if (billList[j].curTotalAmount + itemAmount > billList[j].invoicable_amount) {
                                itemAmount = fpy_Minus(billList[j].invoicable_amount, currentApplyAmount);
                            } else {
                                itemAmount = fpy_Minus(applyAmounts[i].canApplyAmount, currentApplyAmount);
                            }
                        } else {
                            // 如果加上明细可下推金额大于账单可下推金额
                            if (fpy_Add(billList[j].curTotalAmount, itemAmount) > billList[j].invoicable_amount) {
                                itemAmount = fpy_Minus(billList[j].invoicable_amount, billList[j].curTotalAmount);
                            } else {
                                itemAmount = itemAmount;
                            }
                        }
                        if (itemAmount > 0 ) {
                            selectedKeys.push(detailList[z].id); // 当前发票选中的账单明细id
                        }
                        detailList[z].remainvalidamount = itemAmount; // 当前明细可下推金额
                        currentApplyAmount = fpy_Add(currentApplyAmount, itemAmount); // 当前类型预设下推金额
                        billList[j].curTotalAmount = fpy_Add(billList[j].curTotalAmount, itemAmount); // 当前账单预设下推金额
                    }
                    
                    applyAmounts[i].currentApplyAmount = currentApplyAmount;
                    applyAmounts[i].maxApplyAmount = currentApplyAmount;
                }
            }
        }
    };

    // 处理单据编号
    function handleBillNo(str) {
        // 查找最后一个下划线的位置
        const lastUnderscoreIndex = str.lastIndexOf('_');
        
        // 如果找到下划线，返回下划线后面的字符串；如果没有找到下划线，返回原始字符串
        if (lastUnderscoreIndex !== -1) {
            return str.substring(lastUnderscoreIndex + 1);
        } else {
            return str;
        }
    };

    // 单据明细处理-生成发票的默认最大值
    function changeHandleBill(name, value) {
        if (value == 0) {
            return;
        }
        let currentApplyAmount = 0;
        for (let j = 0; j < billList.length; j++) {
            // 账单遍历时，既不能超过类型可开票金额，也不能超过账单可开票金额
            if (billList[j].curTotalAmount >= billList[j].invoicable_amount) {
                continue;
            }
            const detailList = billList[j].sim_isomerism_item_data;
            for (let z = 0; z < detailList.length; z++) {
                // 类型一致的遍历
                if (detailList[z].itemtypenumber !== name) {
                    continue;
                }
                let itemAmount = detailList[z].unpushamount; // 当前明细可下推金额
                
                // 如果加上明细可下推金额大于类型可下推金额
                if (fpy_Add(currentApplyAmount, itemAmount) > value) {
                    itemAmount = fpy_Minus(value, currentApplyAmount);
                    // 如果加上明细可下推金额大于账单可下推金额
                    if (fpy_Add(billList[j].curTotalAmount, itemAmount) > billList[j].invoicable_amount) {
                        itemAmount = fpy_Minus(billList[j].invoicable_amount, billList[j].curTotalAmount);
                    } else {
                        itemAmount = itemAmount;
                    }
                } else {
                    // 如果加上明细可下推金额大于账单可下推金额
                    if (fpy_Add(billList[j].curTotalAmount, itemAmount) > billList[j].invoicable_amount) {
                        itemAmount = fpy_Minus(billList[j].invoicable_amount, billList[j].curTotalAmount);
                    } else {
                        itemAmount = itemAmount;
                    }
                }
                detailList[z].remainvalidamount = itemAmount; // 当前明细可下推金额
                if (itemAmount != 0) {
                    selectedKeys.push(detailList[z].id); // 当前发票选中的账单明细id
                }
                currentApplyAmount = fpy_Add(currentApplyAmount, itemAmount); // 当前类型预设下推金额
                billList[j].curTotalAmount = fpy_Add(billList[j].curTotalAmount, itemAmount); // 当前账单预设下推金额
            }
        }
    };

    // 明细处理-本次申请金额修改
    $treatment_bill.on('focus', 'input[type="number"]', function() {
        const name = $(this).prop('name');
        curApplyAmountsIndex = applyAmounts.findIndex(item => item.number == name);
    });

    // 明细处理-改变明细里的下推金额
    function handleItemAmount(name, value) {
        for(let i = 0; i < billList.length; i++) {
            const curItem = billList[i].sim_isomerism_item_data.find(item => item.id === name);
            if (curItem) {
                if (+value > curItem.unpushamount) {
                    model.invoke("common/tip", '该明细下推金额不能大于可开票金额');
                    showTreatmentBill();
                    break;
                }
                const typeObj = applyAmounts.find(item => item.number === curItem.itemtypenumber);
                const curTypeTotalAmount = fpy_Add(fpy_Minus(typeObj.currentApplyAmount, curItem.remainvalidamount), +value);
                if (curTypeTotalAmount > typeObj.maxApplyAmount) {
                    model.invoke("common/tip", '该类型开票金额不能大于可开票金额');
                    showTreatmentBill();
                    break;
                }

                if (+value == 0) {
                    selectedKeys = selectedKeys.filter(item => item != curItem.id);
                }

                if (!selectedKeys.some(item => item == curItem.id) && +value > 0) {
                    selectedKeys.push(curItem.id);
                }
                billList[i].curTotalAmount = fpy_Add(fpy_Minus(billList[i].curTotalAmount, curItem.remainvalidamount), +value);
                typeObj.currentApplyAmount = curTypeTotalAmount;
                curItem.remainvalidamount = value;
                showTreatmentBill();
                break;
            }
        }
    };

    // 明细处理-本次申请金额修改
    $treatment_bill.on('blur', 'input[type="number"]', function() {
        const name = $(this).prop('name');
        const className = $(this).attr('class');
        let value = $(this).val();
        value = value.replace(/[^\d.]/g, '');
        value = value.replace(/^(\d*\.\d{2}).*$/, '$1');

        const curValue = applyAmounts.find(item => item.number == name);
        const totalValue = applyAmounts.filter(item => item.number !== name).reduce((a, b) => a + b.currentApplyAmount, 0);

        if (value < 0) {
            showTreatmentBill();
            return;
        }

        if (className === 'table-input') {
            handleItemAmount(name, value);
            return;
        }

        if (value > curValue.canApplyAmount) {
            model.invoke("common/tip", '本次申请金额不能大于可申请金额');
            showTreatmentBill();
            return;
        }
        if (fpy_Add(totalValue, value) > curTotalAmount) {
            model.invoke("common/tip", '本次申请总金额大于可申请金额');
            showTreatmentBill();
            return;
        }
        // if (value > curValue.maxApplyAmount) {
        //     model.invoke("common/tip", `最大可申请金额为${curValue.maxApplyAmount}`);
        //     showTreatmentBill();
        //     return;
        // }
        if (billList.every(item => fpy_Minus(item.invoicable_amount, item.curTotalAmount) == 0) && value > curValue.currentApplyAmount) {
            model.invoke("common/tip", `本次可下推开票申请金额为0`);
            showTreatmentBill();
            return;
        }

        // let timeout = null;
        // if (timeout) clearTimeout(timeout);

        // timeout = setTimeout(function () {
            applyAmounts = applyAmounts.map(item => ({
                ...item,
                currentApplyAmount: name === item.number ? +value: item.currentApplyAmount
            }));
            billList = billList.map(item => {
                const typeAmount = item.sim_isomerism_item_data.filter(i => i.itemtypenumber == name).reduce((a, b) => fpy_Add(a, b.remainvalidamount || 0), []);
                return {
                    ...item,
                    curTotalAmount: fpy_Minus(item.curTotalAmount, typeAmount),
                    sim_isomerism_item_data: item.sim_isomerism_item_data.map(i => {
                        selectedKeys = selectedKeys.filter(z => i.itemtypenumber !== name || (z !== i.id && i.itemtypenumber == name));
                        return {
                            ...i,
                            remainvalidamount: i.itemtypenumber == name ? 0 : i.remainvalidamount || 0
                        }
                    })
                }
            });
            changeHandleBill(name, +value);
            if (!isClickBtn) {
                showTreatmentBill();
            }
            // clearTimeout(timeout)
        // }, 500);
    });

    // 生成发票
    function handleBill() {
        if (curApplyAmountsIndex || curApplyAmountsIndex == 0) {
            isClickBtn = true;
            $treatment_bill.find('input[type="number"]').eq(curApplyAmountsIndex).blur();
        }
        if (billList.every(item => item.curTotalAmount == 0)) {
            model.invoke("common/tip", '本次下推金额为0');
            return;
        }
        const obj = treatmentShowBillList[treatmentIndex];
        const items = billList.map(item => 
            item.sim_isomerism_item_data.filter(i => selectedKeys.some(e => e === i.id)).map(i => ({
                ...i,
                sid: item.id,
                sdetailid: i.id,
                id: 'items' + fpy_getUUId(), // 发票id 方法生成
                totalamount: i.remainvalidamount,
                tax: Number(i.remainvalidamount / (1 + i.tax_rate) * i.tax_rate).toFixed(2)
            }))
        ).flat();
        const invoiceData = {
            id: 'items' + fpy_getUUId(), // 发票id 方法生成
            buyername: obj.buyername, // 购方名称 buyername
            buyertaxno: obj.buyertaxno, // 购方税号 buyertaxno
            buyeraddr: obj.buyeraddr, // 购方地址电话 buyeraddr
            buyerbank: obj.buyerbank, // 购方银行账号 buyerbank
            buyeremail: obj.buyeremail, // 购方邮箱 buyeremail
            buyerphone: obj.buyerphone, // 购方手机 buyerphone
            invoicetype: obj.invoicetype || isAllE ? '10xdp' : '026', //发票种类 invoicetype
            account: obj.account || currentAccount, // 电子税局账号
            jqbh: obj.jqbh || currentJqbh, //设备编号 jqbh
            terminalno: obj.terminalno || terminalNo, // 终端号
            // buyerproperty: obj.buyerproperty, //购方企业类型，0企业，1个人 buyerproperty
            items,
            isFold: false,
            buyerproperty: '0'
        };

        treatmentInvoiceList.push(invoiceData);
        selectedKeys = [];
        curApplyAmountsIndex = null;
        isClickBtn = false;
        // 更新发票总数
        updateTreatmentInvoiceAll(treatmentInvoiceList.length);
        handleAfterInvoice();
        addTreatmentInvoice();
    }

    // 键盘监听
    $(document).on('keydown', function(event) {
        if (event.target?.className === "searchInput pressEnter") {
            return;
        }
        // 回车键
        if (event.keyCode === 13) {
            event.stopPropagation();
            handleBill();
            // event.preventDefault();
        }
    })

    // 明细处理-生成发票
    $treatment_bill.on('mousedown', '.bill-detail-btn', function() {
        handleBill();
    });

    // 明细处理-记录单据折叠显示情况，保存在foldKeys
    $treatment_bill.on('click', '.triangle', function(e) {
        const name = $(this).attr('name');
        if (foldKeys.some(item => item === name)) {
            foldKeys = foldKeys.filter(item => item !== name);
        } else {
            foldKeys.push(name);
        }
        showTreatmentBill();
    });

    // 明细处理-记录单据折叠显示情况，保存在foldKeys
    $treatment_bill.on('click', '.triangle-fold', function(e) {
        const name = $(this).attr('name');
        if (foldKeys.some(item => item === name)) {
            foldKeys = foldKeys.filter(item => item !== name);
        } else {
            foldKeys.push(name);
        }
        showTreatmentBill();
    });

    // 明细处理-等额拆成两张发票
    $treatment_solutions.on('click', '.btn1', function() {
        let invoiceData = {
            buyername: '',
            buyertaxno: '',
            buyeraddr: '',
            buyerbank: '',
            buyeremail: '',
            buyerphone: '',
            invoicetype: isAllE ? '10xdp' : '026',
            account: currentAccount,
            jqbh: currentJqbh,
            items: [],
            terminalno: terminalNo,
            isFold: false,
            buyerproperty: '0'
        };
        let keys = [];
        invoiceData.items = initBillList.map(item => 
            item.sim_isomerism_item_data.filter(i => i.remainvalidamount > 0).map(i => {
                keys.push(i.id);
                return {
                    ...i,
                    sid: item.id,
                    sdetailid: i.id,
                    id: 'items' + fpy_getUUId(), // 发票id 方法生成
                    remainvalidamount: i.remainvalidamount / 2,
                    totalamount: i.remainvalidamount / 2,
                    tax: Number(i.remainvalidamount / (1 + i.tax_rate) * i.tax_rate / 2).toFixed(2)
                }
            })
        ).flat();
        treatmentInvoiceList = [{...invoiceData, id: 'items' + fpy_getUUId()}, {...invoiceData, id: 'items' + fpy_getUUId()}];
        
        // 更新发票总数
        updateTreatmentInvoiceAll(treatmentInvoiceList.length);
        showTreatmentInvoice();
        handleAfterInvoice();
    });

    // 明细处理-房费开具专票/其他开具普票
    $treatment_solutions.on('click', '.btn2', function() {
        let invoiceData = {
            buyername: '',
            buyertaxno: '',
            buyeraddr: '',
            buyerbank: '',
            buyeremail: '',
            buyerphone: '',
            invoicetype: isAllE ? '10xdp' : '026',
            account: currentAccount,
            jqbh: currentJqbh,
            items: [],
            terminalno: terminalNo,
            isFold: false,
            buyerproperty: '0'
        };
        const item = initBillList.map(item => 
            item.sim_isomerism_item_data.filter(i => i.remainvalidamount > 0).map(i => {
                return {
                    ...i,
                    sid: item.id,
                    sdetailid: i.id,
                    id: 'items' + fpy_getUUId(),
                    totalamount: i.remainvalidamount,
                    tax: Number(i.remainvalidamount / (1 + i.tax_rate) * i.tax_rate).toFixed(2)
                }
            })
        ).flat();
        let curInvoiceList = [];
        let curKeys = [];
        const item1 = item.filter(i => i.itemtypenumber === 'accommodation');
        const item2 = item.filter(i => i.itemtypenumber !== 'accommodation');
        if (item1.length) {
            curInvoiceList.push({ ...invoiceData, invoicetype: isAllE ? '08xdp' : '028', id: 'items' + fpy_getUUId(), isFold: true, items: item1 });
            curKeys.push(item1.map(i => i.id));
        }
        if (item2.length) {
            curInvoiceList.push({ ...invoiceData, id: 'items' + fpy_getUUId(), items: item2 });
            curKeys.push(item2.map(i => i.id));
        }
        treatmentInvoiceList = curInvoiceList;
        
        // 更新发票总数
        updateTreatmentInvoiceAll(treatmentInvoiceList.length);
        showTreatmentInvoice();
        handleAfterInvoice();
    });

    // 单据明细处理-选择抬头
    $treatment_invoice.on('click', '.buyernameItem', function() {
        const name = $(this).attr('name');
        const invoiceIndex = $(this).parents('.item').index();
        const curSelected = buyernameList.find(item => item.name === name);
        treatmentInvoiceList[invoiceIndex].buyername = name || treatmentInvoiceList[invoiceIndex].buyername;
        treatmentInvoiceList[invoiceIndex].buyertaxno = curSelected.taxNo || treatmentInvoiceList[invoiceIndex].buyertaxno;
        treatmentInvoiceList[invoiceIndex].buyeraddr = curSelected.address || treatmentInvoiceList[invoiceIndex].buyeraddr;
        treatmentInvoiceList[invoiceIndex].buyerphone = curSelected.phone || treatmentInvoiceList[invoiceIndex].buyerphone;
        buyernameList = [];
        buyernameIndex = null;
        showTreatmentInvoice();
    });

    // 单据明细处理-移除发票
    $treatment_invoice.on('click', '.invoice-del', function(e) {
        const invoiceIndex = $(this).parents('.item').index();
        const invoiceItems = treatmentInvoiceList[invoiceIndex].items;

        const invoiceTotalAmount = invoiceItems.reduce((a, b) => fpy_Add(a, b.totalamount), []);
        curTotalAmount = fpy_Add(curTotalAmount, invoiceTotalAmount);
        applyAmounts = applyAmounts.map(item => {
            const typeAmount = invoiceItems.filter(i => i.itemtypenumber == item.number).reduce((a, b) => fpy_Add(a, b.totalamount), []);
            return {
                ...item,
                canApplyAmount: fpy_Add(item.canApplyAmount, typeAmount),
                currentApplyAmount: fpy_Add(item.currentApplyAmount, typeAmount),
            }
        });

        billList = billList.map(item => {
            const curBillInvoice = invoiceItems.filter(i => i.sid == item.id);
            const invoiceAmount = curBillInvoice.reduce((a, b) => fpy_Add(a, b.totalamount), []);
            return {
                ...item,
                invoicable_amount: fpy_Add(item.invoicable_amount, invoiceAmount),
                curTotalAmount: 0,
                sim_isomerism_item_data: item.sim_isomerism_item_data.map(i => {
                    const detailInvoice = curBillInvoice.filter(z => z.sdetailid == i.id);
                    const detailAmount = detailInvoice.reduce((a, b) => fpy_Add(a, b.totalamount), []);
                    return {
                        ...i,
                        unpushamount: fpy_Add(i.unpushamount, detailAmount),
                        remainvalidamount: fpy_Add(i.remainvalidamount, detailAmount),
                    }
                })
            }
        });
        treatmentInvoiceList.splice(invoiceIndex, 1);
        showTreatmentInvoice();
        initHandleBill();
        showTreatmentBill();
    });

    // 单据明细处理-input[type=text]输入
    $treatment_invoice.on('input', 'input[type="text"]', function() {
        const invoiceIndex = $(this).parents('.item').index();
        const itemIndex = $(this).parents('tr').index();
        const name = $(this).prop('name');
        const maxlength = $(this).prop('maxlength');
        let value = fpy_escapeString($(this).val());
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
        case 'num':
            treatmentChangeXmsl(value, invoiceIndex, itemIndex);
            break;
        case 'taxamount':
            treatmentChangeJshjje(value, invoiceIndex, itemIndex);
            break;
        case 'licenseplate':
        case 'startplace':
        case 'endplace':
        case 'transportgoods':
            break;
        default:
            break;
        }
        // 非明细数量，税额，价税合计输入
        if (!(name === 'num' || name === 'tax' || name === 'taxamount')) {
            $(this).val(value);
            updateTreatmentInvoice(invoiceIndex, name, value);
        }
    });

    // 单据明细处理-input[type=radio|checkbox|date]输入 非input[type=text]在低版本谷歌浏览器中不支持input [type=date]待验证
    $treatment_invoice.on('change', 'input[type!="text"]', function() {
        const invoiceIndex = $(this).parents('.item').index();
        const name = $(this).prop('name');
        const type = $(this).prop('type');
        let value = type === 'checkbox' ? $(this).is(':checked') : fpy_escapeString($(this).val());

        // const billId = treatmentShowBillList[treatmentIndex].id;
        // const invoice = treatmentInvoiceList[invoiceIndex];
        switch (name) {
        case 'taxFreeAdjust':
            treatmentChangeWebSetTaxFreeAdjust(value, invoiceIndex);
            break;
        case 'fixedNumber':
            if (value) {
                temporaryValues = invoiceIndex;
                model.invoke("process/openFixedQuantity");
            } else {
                treatmentChangeWebSetFixedNumber(0, invoiceIndex);
            }
            break;
        case 'inventorymark':
            value = value ? '1' : '0';
            break;
        // case 'invoiceContent':
        //     model.invoke("process/invoicecontent", {
        //         invoiceContent: value,
        //         infocode: invoice.infocode || '',
        //         billInvoiceList: {[billId]: treatmentInvoiceList[billId]},
        //         mergeBillId: billId
        //     });
        // break;
        default:
            break;
        }
        // 非税额调整 固定数量输入
        if (!(name === 'taxFreeAdjust' || name === 'fixedNumber')) {
            updateTreatmentInvoice(invoiceIndex, name, value);
        }

        // 切换申请类型
        if (name === 'applicant') updateTreatmentInvoiceInfoByIndex(invoiceIndex);
    });

    // 单据明细处理-输入失去焦点 去除前后空格
    $treatment_invoice.on('blur', 'input[type="text"]', function() {
        const invoiceIndex = $(this).parents('.item').index();
        const itemIndex = $(this).parents('tr').index();
        const invoice = treatmentInvoiceList[invoiceIndex];
        const invoicetype = invoice.invoicetype;
        const name = $(this).prop('name');
        const value = $(this).val().trim();
        // 是否同步
        let isSync = true;
        // 错误提示
        switch (name) {
        case 'buyername':
            if (!value) model.invoke("common/tip", "请输入购方名称！");
            break;
        case 'buyertaxno':
            if ((invoicetype === '028' || invoicetype === '004') && !value) model.invoke("common/tip", "请输入纳税人识别号！");
            break;
        case 'buyeraddr':
            if ((invoicetype === '028' || invoicetype === '004') && !value) model.invoke("common/tip", "请输入地址及电话！");
            break;
        case 'buyerbank':
            if ((invoicetype === '028' || invoicetype === '004') && !value) model.invoke("common/tip", "请输入开户行及账号！");
            break;
        case 'buyeremail':
            if (value) {
                const emails = value.split(';').filter(o => o);
                if (emails.length > 3) {
                    isSync = false;
                    model.invoke("common/tip", "邮箱不能超过3个!");
                }
                for (const o of emails) {
                    if (o && !o.fpy_isEmail()) {
                        isSync = false;
                        model.invoke("common/tip", "请输入正确的邮箱！");
                        break;
                    }
                }
            }
            break;
        case 'buyerphone':
            if (value && !value.fpy_isPhone()) {
                isSync = false;
                model.invoke("common/tip", "请输入正确的手机号码！");
            }
            break;
        case 'num':
            treatmentBlurXmsl(value, invoiceIndex, itemIndex);
            break;
        case 'taxamount':
            treatmentBlurJshjje(value, invoiceIndex, itemIndex);
            break;
        case 'tax':
            treatmentBlurSe(value, invoiceIndex, itemIndex);
            break;
        default:
            break;
        }
        if (!(name === 'num' || name === 'tax' || name === 'taxamount')) {
            $(this).val(value);
            updateTreatmentInvoice(invoiceIndex, name, value, isSync);
        }
    });

    // 单据明细处理 下拉框
    $treatment_invoice.on('change', 'select', function() {
        const invoiceIndex = $(this).parents('.item').index();
        const name = $(this).prop('name');
        const value = $(this).val();
        updateTreatmentInvoice(invoiceIndex, name, value);
        if (name === 'invoicetype') {
            showTreatmentInvoice();
        }
        if (name === 'jqbh') {
            if (terminalNos[value]) {
                terminalNoList = terminalNos[value];
            } else {
                terminalNoList = [];
            }
            showTreatmentInvoice();
        }
    });

    // 单据明细处理 下拉框
    $treatment_invoice.on('click', '.invoiceBox', function() {
        const invoiceIndex = $(this).parents('.item').index();
        const value = $(this).attr('key');
        const unFoldKey = ['08xdp', '028', '004']; // 专票的key
        updateTreatmentInvoice(invoiceIndex, 'isFold', unFoldKey.some(item => item === value));
        updateTreatmentInvoice(invoiceIndex, 'invoicetype', value);
        showTreatmentInvoice();
    });

    // 单据明细处理 展开收起
    $treatment_invoice.on('click', '.tips', function() {
        const invoiceList = treatmentInvoiceList;
        const invoiceIndex = $(this).parents('.item').index();
        const value = invoiceList[invoiceIndex].isFold;
        updateTreatmentInvoice(invoiceIndex, 'isFold', !value);
        showTreatmentInvoice();
    });

    // 单据明细处理-输入textarea
    $treatment_invoice.on('input', 'textarea', function() {
        const invoiceIndex = $(this).parents('.item').index();
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
        updateTreatmentInvoice(invoiceIndex, name, value);
    });

    // 单据明细处理-输入textarea失去焦点 去除前后空格
    $treatment_invoice.on('blur', 'textarea', function() {
        const invoiceIndex = $(this).parents('.item').index();
        const name = $(this).prop('name');
        const value = $(this).val().trim();
        $(this).val(value);
        updateTreatmentInvoice(invoiceIndex, name, value, true);
    });

    // 单据明细处理-选择发票类型 下一个版本支持
    // $treatment_invoice.on('click', '.invoiceType', function () {
    //     const invoiceIndex = $(this).parents('.item').index();
    //     const value = $(this).attr('data-key');
    //     updateTreatmentInvoice(invoiceIndex, 'invoicetype', value);
    // });

    // 单据明细处理-发票信息点击
    $treatment_invoice.on('click', '.search-btn', function() {
        treatmentInvoiceSearch($(this));
    });

    // 单据明细处理-发票信息回车
    $treatment_invoice.on('keypress', '.pressEnter', function(event) {
        if (event.keyCode === 13) {
            treatmentInvoiceSearchByPressEnter($(this));
        }
    });

    // 单据明细处理-发票信息搜索
    function treatmentInvoiceSearch(that) {
        const invoiceIndex = that.parents('.item').index();
        const name = that.attr('data-name') || that.attr('name');
        const disabled = that.hasClass('disabled');
        const obj = treatmentInvoiceList[invoiceIndex];
        if (!disabled) {
            let request = {
                "invoiceIndex": invoiceIndex,
                "buyername": obj.buyername
            }
            if (name === "buyername") {
                model.invoke("process/openTitlePage", request);
            }
        }
    }

    // 单据明细处理-发票信息回车
    function treatmentInvoiceSearchByPressEnter(that) {
        const invoiceIndex = that.parents('.item').index();
        const name = that.attr('data-name') || that.attr('name');
        const disabled = that.hasClass('disabled');
        const obj = treatmentInvoiceList[invoiceIndex];
        buyernameIndex = invoiceIndex;
        if (!disabled) {
            let request = {
                "invoiceIndex": invoiceIndex,
                "buyername": obj.buyername
            };
            if (name === "buyername" && obj?.buyername?.length > 1) {
                model.invoke("process/searchTitle", request);
            }
        }
    }

    // 单据明细处理-发票明细删除
    $treatment_invoice.on('click', '.del', function() {
        const invoiceIndex = $(this).parents('.item').index();
        const itemIndex = $(this).parents('tr').index();
        treatmentDeleteItem(invoiceIndex, itemIndex);
    });

    // 单据明细处理-下一步
    $treatment.find('.footer').on('click', '.next', function() {
        // 检测单据按明细拆分是否完成
        const unfinishedSplitId = [];
        for (const i in treatmentRemainingItems) {
            const obj = treatmentRemainingItems[i];
            for (const o of obj.items) {
                if (o.remainvalidamount != 0) {
                    unfinishedSplitId.push(i);
                    break;
                }
            }
        }
        const bills = treatmentShowBillList.filter(o => unfinishedSplitId.includes(o.id)).map(o => o.billno);
        if (bills.length) {
            // common/tip
            model.invoke("common/tip", `单据${bills.join('，')}可申请金额未拆分完成，请拆分！`);
            return;
        }
        // 单据校验
        const unComplete = treatmentShowBillList.filter(o => !o.isComplete).map(o => o.billno);
        if (unComplete.length) {
            model.invoke("common/tip", `单据${unComplete.toString()}待补充完整！`);
            return;
        }

        // 超限数组
        const overLimitBills = [];
        // 金额为0数组
        const amountIsZeroBills = [];
        // 按明细开票的单据 关联关系，在操作下一步之前生成
        for (let i = 0; i < treatmentShowBillList.length; i++) {
            if (treatmentShowBillList[i].splitrule === IMC_SPLIT_BY_DETAIL) {
                const _id = treatmentShowBillList[i].id;
                const _billno = treatmentShowBillList[i].billno;
                const _invoiceList = treatmentInvoiceList[_id];

                let _invoiceRelationMap = [];
                let isOver = false;
                let isZero = false;
                // 获取固定数量标识
                const hasFixedNumber = treatmentInvoiceListSetMap[_id].some(o => o.fixedNumber);
                for (let m = 0; m < _invoiceList.length; m++) {
                    const _invoice = _invoiceList[m];
                    // 设置固定数量标识
                    _invoice.mergelable = hasFixedNumber ? '1' : '';
                    // 检测是否超限额
                    const { isOverLimit } = testForOverLimit(_invoice.invoiceamount, _invoice.invoicetype);
                    if (!isOver && isOverLimit) {
                        isOver = true;
                        overLimitBills.push(_billno);
                    }
                    // 检测是否金额为0
                    if (!isZero && _invoice.invoiceamount == 0) {
                        isZero = true;
                        amountIsZeroBills.push(_billno);
                    }
                    _invoiceRelationMap = _invoiceRelationMap.concat(_invoice.items.map(o => {
                        return {
                            "sbillid": _id, // 单据id
                            "sbillno": _billno,
                            "sdetailid": o.billItemId, // 单据明细id
                            "tbillid": _invoice.id, // 发票id
                            "tbillno": _billno, // 目标单单据编号
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
                treatmentInvoiceRelationMap[_id] = _invoiceRelationMap;
            }
        }
        if (overLimitBills.length) {
            // common/tip
            model.invoke("common/tip", `单据编号${overLimitBills.join('，')}的发票已超限额，请重新拆分！`);
            return;
        }
        if (amountIsZeroBills.length) {
            // common/tip
            model.invoke("common/tip", `单据编号${amountIsZeroBills.join('，')}的发票金额为0，请重新拆分！`);
            return;
        }
        let request = {
            "data": treatmentInvoiceList
        };
        model.invoke("process/processnextstep", request);
    });

    // 发票预览-单据切换
    $preview_bill.on('click', '.item', function() {
        const index = $(this).index();
        if (index !== previewIndex) {
            $preview_bill.find('.item').removeClass('actived').eq(index).addClass('actived');
            $preview_invoice.addClass('actived');
            setTimeout(() => $preview_invoice.removeClass('actived'), 100);
            previewIndex = index;
            previewInvoiceIndex = 0;
            showPreviewBill();
            showPreviewInvoice();
        }
    });

    // 发票预览-按钮显示
    $preview_box.on('mouseover mouseout', function(e) {
        if (e.type === 'mouseover') {
            $preview_prev.show();
            $preview_next.show();
        } else if (e.type === 'mouseout') {
            $preview_prev.hide();
            $preview_next.hide();
        }
    });

    // 发票预览-上一张
    $preview_prev.on('click', function() {
        const disabled = $(this).hasClass('disabled');
        if (!disabled) {
            $preview_invoice.addClass('actived');
            setTimeout(() => $preview_invoice.removeClass('actived'), 100);
            previewInvoiceIndex--;
            showPreviewInvoice();
        }
    });

    // 发票预览-下一张
    $preview_next.on('click', function() {
        const disabled = $(this).hasClass('disabled');
        if (!disabled) {
            $preview_invoice.addClass('actived');
            setTimeout(() => $preview_invoice.removeClass('actived'), 100);
            previewInvoiceIndex++;
            showPreviewInvoice();
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
        let value = type === 'checkbox' ? $(this).is(':checked') : fpy_escapeString($(this).val());
        const itemIndex = $(this).parents('.line').index();
        // 输入校验
        switch (name) {
        case 'saleraddr':
        case 'salerbank':
            value = fpy_getTextByMaxLength(value, maxlength);
            updatePreviewInvoice(name, value);
            break;
        case 'specification':
        case 'unit':
            value = fpy_getTextByMaxLength(value, maxlength);
            previewChangeItem(name, value, itemIndex);
            break;
        case 'xmsl':
            const invoiceList = previewInvoiceList[treatmentShowBillList[previewIndex].id];
            const obj = invoiceList[previewInvoiceIndex];
            const xmje = obj.items[itemIndex].amount;
            value = fpy_getTextByMaxLength(value.fpy_onlysl(), maxlength);
            const newdj = value ? fpy_toFixedTwoOrMore(fpy_accDiv(xmje, value)) : '';
            previewChangeItem('num', value, itemIndex);
            previewChangeItem('unitprice', newdj, itemIndex);
            $(this).parents('.line').find('.xmdj').text(newdj);
            break
        default:
            break;
        }
        if (type === 'text') $(this).val(value).prop("title", value);
    });

    // 发票预览-输入 textarea
    $preview_invoice.on('input', 'textarea', function() {
        const name = $(this).prop('name');
        const maxlength = $(this).prop('maxlength');
        let value = fpy_escapeString($(this).val());
        value = fpy_getTextByMaxLength(value, maxlength);
        updatePreviewInvoice(name, value);
    });

    // 发票预览-输入失去焦点 去除前后空格
    $preview_invoice.on('blur', '.searchInput', function() {
        const name = $(this).prop('name');
        const type = $(this).prop('type');
        const value = $(this).val().trim();
        const invoiceList = previewInvoiceList[treatmentShowBillList[previewIndex].id];
        if (type === 'text') {
            // 错误提示
            switch (name) {
            case 'saleraddr':
            case 'salerbank':
                updatePreviewInvoice(name, value);
                if (inputFocusValue !== value && invoiceList.length > 1 && !confirmLoading) {
                    confirmLoading = true;
                    model.invoke("common/show_confirm", { key: 'preview_sync_sale', content: '修改信息是否应用于本单据所有的发票？', name });
                }
                break;
            case 'specification':
            case 'unit':
                const itemIndex = $(this).parents('.line').index();
                previewChangeItem(name, value, itemIndex);
                if (inputFocusValue !== value) {
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
                                model.invoke("common/show_confirm", { key: 'preview_sync_item', content: '修改信息是否应用于本单据其它项目名称相同的明细？', name, index: itemIndex });
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

    // 发票预览-发票信息搜索
    $preview_invoice.on('click', '.search-btn', function() {
        if (!previewDataSave) {
            const invoiceList = previewInvoiceList[treatmentShowBillList[previewIndex].id];
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

    // 发票预览-待开统计
    $preview.find('.footer').on('click', '.statistics', function() {
        model.invoke("preview/statistics");
    });

    // 发票预览-保存数据
    $preview.find('.footer').on('click', '.save', function() {
        const disabled = $(this).hasClass('disabled');
        if (!disabled) {
            // 精简数据
            var requst = {
                "treatmentShowBillList": treatmentShowBillList.map(o => {
                    return {
                        splitrule: o.splitrule,
                        sim_original_bill_item: o.sim_original_bill_item
                            .filter(item => item.taxdeviation && item.taxdeviation !== 0)
                            .map(item => {
                                return {
                                    id: item.id,
                                    taxdeviation: item.taxdeviation
                                }
                            })
                    };
                }),
                "billNoMap": billNoMap,
                "invoices": previewInvoiceList,
                "splitrule": treatmentSplitRule,
                "invBill": billList.map(o => {
                    return {
                        id: o.id,
                        billno: o.billno,
                        orgid: o.orgid
                    }
                }),
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
                // 精简数据
                "treatmentShowBillList": treatmentShowBillList.map(o => {
                    return {
                        sim_original_bill_item: o.sim_original_bill_item
                            .filter(item => item.taxdeviation && item.taxdeviation !== 0)
                            .map(item => {
                                return {
                                    id: item.id,
                                    taxdeviation: item.taxdeviation
                                }
                            })
                    };
                }),
                "billNoMap": billNoMap,
                "invoices": previewInvoiceList,
                "previewDataSave": previewDataSave,
                "splitrule": treatmentSplitRule,
                "invBill": billList.map(o => {
                    return {
                        id: o.id,
                        billno: o.billno,
                        orgid: o.orgid
                    }
                }),
                "invRealtion": treatmentInvoiceRelationMap,
                "jqbh": billParam.deviceNo,
                "currentAccount": billParam.currentAccount,
                terminalNo: billParam.terminalNo
            };
            $(this).addClass('disabled').prev().addClass('disabled');
            model.invoke("preview/confirm_issues", requst);
        }
    });

    // 开票结果-重新开票
    $result_fail.on('click', 'a', function() {
        const key = $(this).attr('data-key');
        $result_print.addClass('disabled');
        model.invoke("issue/reIssue", [key]);
        resultQueryByTimer('reopen');
    });

    // 开票结果-纸票打印
    $result_success.on('click', 'a', function() {
        const disabled = $result_print.hasClass('disabled');
        if (!disabled) {
            const key = $(this).attr('data-key');

            const successList = resultList.filter(o => o.issuestatus === '0');
            const list007 = successList.filter(o => {
                return o.invoicetype === '007' && o.printflag !== '1';
            }).sort((a, b) => a.invoiceno - b.invoiceno);
            const list004 = successList.filter(o => {
                return o.invoicetype === '004' && o.printflag !== '1';
            }).sort((a, b) => a.invoiceno - b.invoiceno);
            if ((list007[0] && list007[0].id === key) || (list004[0] && list004[0].id === key)) {
                $result_print.addClass('disabled')
                $result_reopen.addClass('disabled');
                model.invoke("issue/paperInvPrint", [key]);
                resultQueryByTimer('invoicePrint');
            } else {
                model.invoke("common/tip", '当前打印发票非该票种的最小发票号码，请前往发票查询打印！');
            }
        } else {
            model.invoke("common/tip", '正在打印中！');
        }
    });

    // 开票结果-纸票一键打印
    $result.find('.footer').on('click', '.print', function() {
        const disabled = $(this).hasClass('disabled');
        if (!disabled) {
            const _data = resultList.filter(o => o.issuestatus === '0' && o.printflag !== '1').map(o => o.id);
            $result_print.addClass('disabled').next().addClass('disabled');
            model.invoke("issue/paperInvPrint", _data);
            resultQueryByTimer('invoicePrint');
        }
    });

    // 开票结果-一键重开
    $result.find('.footer').on('click', '.reopen', function() {
        const disabled = $(this).hasClass('disabled');
        if (!disabled) {
            const _data = resultList.filter(o => o.issuestatus === '3').map(o => o.id);
            $result_reopen.addClass('disabled').prev().addClass('disabled');
            model.invoke("issue/reIssue", _data);
            resultQueryByTimer('reopen');
        }
    });

    $preview_operator_name.eq(0).hover(
        function () {
            const invoiceList = previewInvoiceList[treatmentShowBillList[previewIndex].id];
            const obj = invoiceList[previewInvoiceIndex];
            const invoice_qd = obj.invoicetype === '08xdp' || obj.invoicetype === '10xdp';
            if (!invoice_qd) {
                return false;
            }
            // 鼠标悬浮时显示提示框
            const tooltipText = '实际数电票的票样中复核人、收款人是展示在发票备注栏中';
            const tooltip = $('<div class="tooltip">' + tooltipText + '</div>');
            $preview_operator_name.eq(0).append(tooltip);
            tooltip.css({
                left: '10px',
                top: '18px',
            });
            tooltip.fadeIn();
        },
        function () {
            // 鼠标移出时隐藏提示框
            $preview_operator_name.eq(0).find('.tooltip').fadeOut(function () {
                $preview_operator_name.eq(0).find('.tooltip').remove();
            });
        }
    );

    $preview_operator_name.eq(1).hover(
        function () {
            const invoiceList = previewInvoiceList[treatmentShowBillList[previewIndex].id];
            const obj = invoiceList[previewInvoiceIndex];
            const invoice_qd = obj.invoicetype === '08xdp' || obj.invoicetype === '10xdp';
            if (!invoice_qd) {
                return false;
            }
            // 鼠标悬浮时显示提示框
            const tooltipText = '实际数电票的票样中复核人、收款人是展示在发票备注栏中';
            const tooltip = $('<div class="tooltip">' + tooltipText + '</div>');
            $preview_operator_name.eq(1).append(tooltip);
            tooltip.css({
                left: '220px',
                top: '18px'
            });
            tooltip.fadeIn();
        },
        function () {
            // 鼠标移出时隐藏提示框
            $preview_operator_name.eq(1).find('.tooltip').fadeOut(function () {
                $preview_operator_name.eq(1).find('.tooltip').remove();
            });
        }
    );

    this.initWorkhotel = function (_model, props) {
        console.log(_model, props, '---------------init')
        var popsData = {};
        if (props != null && props.data != null) {
            popsData = props.data;
        }
        model = _model;
        initEvent(model, props);
        setInitData(popsData);
    };

    this.updateWorkhotel = function (_model, props) {
        model = _model;
        var popsData = {};
        if (props != null && props.data != null) {
            popsData = props.data;
        }
        console.log(popsData, '===================updateWorkhotel')
        switch (popsData.eventKey) {
            case "bill/mergebill":
                // 初始化单据处理页面
                if (popsData.errCode === '0000') {
                    treatmentShowBillList = popsData.mergeBill.bills || [];
                    treatmentInvoiceList = treatmentBillInvoiceInit(popsData.invoiceList);
                    initTreatmentInvoiceListSetMap(treatmentInvoiceList);
                    treatmentInvoiceRelationMap = popsData.invoiceRelationMap;
                    billNoMap = popsData.billNoMap;
                    setCurrentDisplay(1);
                }
                break;
            case "process/prestep":
                blueinvoiceid = '';
                redinvoiceid = '';
                updateTreatmentHeader(true);
                setCurrentDisplay(0);
                break;
            case "process/queryMergeDeviation":
                if (popsData.errCode === '0000') {
                    // model.invoke("common/tip", "本单据已切换为按明细拆分，请在本单据中选取明细生成发票！");
                    // 清除前端设置
                    const billId = treatmentShowBillList[treatmentIndex].id;
                    treatmentInvoiceListSetMap[billId] = [];
                    // 清空税额尾差调整值
                    treatmentEmptyCurrentBillAdjustedData();

                    // 切换拆分方式
                    // updateTreatmentBill(treatmentIndex, 'splitrule', IMC_SPLIT_BY_DETAIL);
                    // 更新单据税额尾差
                    updateTreatmentBillAdjustedData(popsData.taxDeviationBillMap);
                    initTreatmentRemainingItems();
                    showTreatmentSolutions();
                    updateTreatmentHeader();
                }
                break;
            case "process/changeSplitRule":
                if (popsData.errCode === '0000') {
                    if (popsData.ruleCode === IMC_SPLIT_BY_DETAIL) {
                        const id = treatmentShowBillList[treatmentIndex].id;
                        model.invoke("process/queryMergeDeviation", id);
                        return;
                    }
                    // 移除按明细开票的数据
                    const billId = treatmentShowBillList[treatmentIndex].id;
                    delete treatmentRemainingItems[billId];
                    // 清空税额尾差调整值
                    treatmentEmptyCurrentBillAdjustedData();


                    // 切换拆分方式
                    // updateTreatmentBill(treatmentIndex, 'splitrule', popsData.ruleCode);
                    // 更新单据税额尾差
                    updateTreatmentBillAdjustedData(popsData.taxDeviationBillMap);

                    treatmentInvoiceList = {...treatmentInvoiceList, ...treatmentBillInvoiceInit(popsData.invoiceList)};
                    initTreatmentInvoiceListSetMap(popsData.invoiceList);
                    treatmentInvoiceRelationMap = {...treatmentInvoiceRelationMap, ...popsData["invoiceRelationMap"]};
                    updateTreatmentBillTitleByIndex(treatmentIndex);
                    updateTreatmentBillTableByIndex(treatmentIndex, true);
                    testTreatmentBillFinished(treatmentIndex);
                    updateTreatmentHeader();
                    showTreatmentSolutions();
                    showTreatmentInvoice();
                }
                break;
            case "process/queryPlace":
                if (popsData.errCode === '0000') {
                    const { invoiceIndex, itemIndex, name, place } = popsData.data;
                    const invoiceList = treatmentInvoiceList[treatmentShowBillList[treatmentIndex].id];
                    invoiceList[invoiceIndex].freights[itemIndex][name] = place;
                    updateGoodsTransportTable(invoiceIndex);
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
                    treatmentInvoiceList = treatmentBillInvoiceInit(popsData.invoiceList);
                    initTreatmentInvoiceListSetMap(popsData.invoiceList);
                    treatmentInvoiceRelationMap = popsData["invoiceRelationMap"];
                    showPreviewInvoice();
                }
                break;
            case "process/invoicecontent":
                // 清空税额尾差调整值
                treatmentEmptyCurrentBillAdjustedData();

                // 切换开票内容与手动输入红字信息表
                treatmentInvoiceList = {...treatmentInvoiceList, ...treatmentBillInvoiceInit(popsData.invoiceList)};
                initTreatmentInvoiceListSetMap(popsData.invoiceList);
                treatmentInvoiceRelationMap = {...treatmentInvoiceRelationMap, ...popsData.invoiceRelationMap};
                updateTreatmentBillTitleByIndex(treatmentIndex);
                showTreatmentInvoice();
                testTreatmentBillFinished(treatmentIndex);
                break;
            case "process/blueinvoice":
                //填充蓝票
                treatmentInvoiceList = {...treatmentInvoiceList, ...treatmentBillInvoiceInit(popsData.data)};
                initTreatmentInvoiceListSetMap(popsData.data);
                showTreatmentInvoice();
                testTreatmentBillFinished(treatmentIndex);
                break;
            case "process/nextstepcheck":
                if (popsData.data === 'success') {
                    //填充备注
                    previewInvoiceList = popsData.treatmentInvoiceList;
                    setCurrentDisplay(2);
                }
                break;
            case "process/openredinfolist":
                treatmentInvoiceList = {...treatmentInvoiceList, ...treatmentBillInvoiceInit(popsData.invoiceList)};
                initTreatmentInvoiceListSetMap(popsData.invoiceList);
                treatmentInvoiceRelationMap = {...treatmentInvoiceRelationMap, ...popsData.invoiceRelationMap};
                showTreatmentInvoice();
                testTreatmentBillFinished(treatmentIndex);
                break;
            case "preview/confirm_issues":
                blueinvoiceid = popsData.blueinvoiceid;
                redinvoiceid = popsData.redinvoiceid;
                setCurrentDisplay(3);
                break;
            case "preview/change_saler_address":
                updatePreviewInvoice('saleraddr', popsData.data.invoiceaddr);
                updatePreviewInvoice('salerbank', popsData.data.openuserbank);
                $preview_saler.find('.saleraddr').val(popsData.data.invoiceaddr).prop('title', popsData.data.invoiceaddr);
                $preview_saler.find('.salerbank').val(popsData.data.openuserbank).prop('title', popsData.data.openuserbank);
                const invoiceList = previewInvoiceList[treatmentShowBillList[previewIndex].id];
                if (invoiceList.length > 1 && !confirmLoading) {
                    confirmLoading = true;
                    model.invoke("common/show_confirm", { key: 'preview_sync_sale', content: '修改信息是否应用于本单据所有的发票？', name: 'saleraddr,salerbank' });
                }
                break;
            case "common/show_confirm":
                confirmLoading = false;
                commonConfirmCallback(popsData.data);
                break;
            case "process/openFixedQuantity":
                $treatment_invoice.find('.item').eq(temporaryValues).find('input[name=fixedNumber]').prop('checked', popsData.errCode === '0000');
                if (popsData.errCode === '0000') {
                    let fixedNumber = popsData.quantity;
                    const { totalamount } = treatmentShowBillList[treatmentIndex];
                    // 自动转换
                    fixedNumber = (totalamount > 0 && fixedNumber < 0) || (totalamount < 0 && fixedNumber > 0) ? -fixedNumber : fixedNumber;
                    treatmentChangeWebSetFixedNumber(fixedNumber, temporaryValues, popsData.applyall);
                }
                break;
            case 'process/queryredconfirmbill':
                if (popsData.errCode === '0000') {
                    const billId = treatmentShowBillList[treatmentIndex].id;
                    treatmentInvoiceList[billId][temporaryValues] = popsData.invoice;
                    treatmentInvoiceRelationMap = {...treatmentInvoiceRelationMap, ...popsData.invoiceRelationMap};
                    showTreatmentInvoice();
                    testTreatmentBillFinished(treatmentIndex);
                }
                break;
            case 'process/nextStep':
                if (popsData.errCode === '0000') {
                    model.invoke('process/nextStep', treatmentInvoiceList);
                }
                break;
            case 'setCurrentDisplay':
                if (popsData.errCode === '0000') {
                    if (popsData.curIndex === 1) {
                        previewInvoiceList = popsData.treatmentInvoiceList;
                    }
                    setCurrentDisplay(popsData.curIndex);
                }
                break;
            case 'process/openTitlePage':
                if (popsData.errCode === '0000') {
                    const { buyername, buyertaxno, buyeraddr, buyerbank, buyeremail, buyerphone, invoiceIndex } = popsData;
                    treatmentInvoiceList[invoiceIndex].buyername = buyername || '';
                    treatmentInvoiceList[invoiceIndex].buyertaxno = buyertaxno || '';
                    treatmentInvoiceList[invoiceIndex].buyeraddr = buyeraddr || '';
                    treatmentInvoiceList[invoiceIndex].buyerbank = buyerbank || '';
                    treatmentInvoiceList[invoiceIndex].buyeremail = buyeremail || '';
                    treatmentInvoiceList[invoiceIndex].buyerphone = buyerphone || '';
                    showTreatmentInvoice();
                }
                break;
            case 'process/searchTitle':
                if (popsData.errCode === '0000') {
                    buyernameList = popsData.company;
                    showTreatmentInvoice();
                }
                break;
            case 'preview/issue':
                if (popsData.errCode === '0000') {
                    let invoiceList = [];
                    for (const o in previewInvoiceList) {
                        for(let i = 0; i < previewInvoiceList[o].length; i++) {
                            if (!invoiceList.length || invoiceList.some(item => item.id !== previewInvoiceList[o][i].id)) {
                                invoiceList.push(previewInvoiceList[o][i]);
                            }
                        }
                    }
                    console.log(invoiceList, 'invoiceList=====================')
                    model.invoke('preview/issue', invoiceList);
                }
                break;
            default:
                break;
        }
    };

    var initEvent = function (model, props) {

    };
};