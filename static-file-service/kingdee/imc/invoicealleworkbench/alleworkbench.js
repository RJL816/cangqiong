var FPY_alleWorkbenchFun = function (KDApi, $, _) {
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

    const matchtargetObj = {
        '0': '自动匹配蓝票',
        '1': '自动匹配红字确认单',
        '2': '手工指定红字确认单',
        '3': '手工指定蓝票'
    };

    const confirmstatusList = {
        '01': {
            name: '无需确认',
            color: '#1ba854'
        },
        '02': {
            name: '销方录入待购方确认',
            color: '#ff991c'
        },
        '03': {
            name: '购方录入待销方确认',
            color: '#276ff5'
        },
        '04': {
            name: '购销双方已确认',
            color: '#1ba854'
        },
        '05': {
            name: '作废（销方录入购方否认）',
            color: '#fb2323'
        },
        '06': {
            name: '作废（购方录入销方否认）',
            color: '#fb2323'
        },
        '07': {
            name: '作废（超72小时未确认）',
            color: '#fb2323'
        },
        '08': {
            name: '作废（发起方已撤销）',
            color: '#fb2323'
        },
        '09': {
            name: '作废（确认后撤销）',
            color: '#fb2323'
        },
        '10': {
            name: '作废（异常凭证）',
            color: '#fb2323'
        }
    };

    let curIndex = '0'; // 当前内容显示下标 0, 1, 2, 3
    let currentTab = 'positive'; // 当前tab状态 正数positive 负数negative
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
    let cacheCobuyers = [];

    // 开票申请单-数据
    const billParam = {
        billNo: '',
        buyerName: '',
        deviceNo: '',
        currentAccount: '',
        terminalNo: '',
        billMerger: false,
        itemMerger: false,
        creditQuota: 0,
        // 分页数据
        pageIndex: 1,
        total: 0,
        totalPage: 1,
        mergeRuleId: '0',
        pageSize: 100 // 暂时默认100
    };
    const rowKey = 'id'; // 开票申请单-单据rowkey
    let accountMap = null; // 开票申请单-电子税局账号
    let mergerule = null; // 开票申请单-合并规则
    let limitAmounts = {}; // 开票申请单-拆分限额
    let billList = []; // 开票申请单-单据列表

    // 单据明细处理-数据
    const treatmentSync = ['buyername', 'buyertaxno', 'buyeraddr', 'buyerbank', 'buyeremail', 'buyerphone', 'applyreason', 'remark']; // 明细处理-能同步的字段
    const treatmentTextareaSync = ['applyreason', 'remark']; // 明细处理-Textarea能同步的字段
    let treatmentIndex = 0; // 明细处理-当前下标
    let treatmentSplitRule = []; // 明细处理-所有拆分方案-数组
    const treatmentSplitRuleDict = {}; // 明细处理-所有拆分方案-对象
    let matchrule = []; // 明细处理-匹配规则
    let redConfirmmatchrule = []; // 明细处理-匹配规则
    let negativeRules = {
        red: '',
        blue: ''
    }; // 明细处理-负数单据匹配规则

    let treatmentShowBillList = []; // 明细处理-显示的单据列表
    let treatmentInvoiceList = {}; // 明细处理-发票对象 以单据id为key值
    let treatmentInvoiceRelationMap = {}; // 明细处理-发票关系对象 以单据id为key值
    let treatmentRemainingItems = {}; // 明细处理-按明细处理剩余明细对象 以单据id为key值
    let treatmentInvoiceListSetMap = {}; // 明细处理-发票设置 以单据id为key值
    let negativeSelectedRowKeys = []; // 明细处理-负数单据勾选
    let treatmentNegativeList = []; // 明细处理-负数table

    let modifyBillInvoiceList = {}; // 明细处理-记录修改后的正数发票
    let billPageInfo = {
        pageIndex: 1,
        pageSize: 10,
        total: 0,
        totalPage: 1
    }; // 明细处理-单据分页信息

    let negativePageInfo = {
        pageIndex: 1,
        pageSize: 10,
        total: 0,
        totalPage: 1
    }; // 明细处理-负数单据分页

    let negativeAllData = false; // 明细处理-负数单据勾选全部数据

    let negativeOpenKey = ''; // 明细处理-负数展开匹配结果的key

    // 发票预览-数据
    let previewIndex = 0; // 发票预览-单据当前下标
    let previewInvoiceIndex = 0; // 发票预览-发票当前下标
    let previewTableDataSource = []; // 发票预览-负数table数据
    let previewSelectedRowKeys = []; // 发票预览-table选中key

    let previewNegativePageInfo = {
        pageIndex: 1,
        pageSize: 10,
        total: 0,
        totalPage: 1
    }; //发票预览-负数单据分页

    let previewNegativeAllData = false; // 发票预览-负数单据勾选全部数据

    // 开票结果-数据
    let resultTimer; // 开票结果-计时器
    let resultTotal = 0; // 开票结果-正数发票总张数
    let negativeResultTotal = 0; // 开票结果-负数发票总张数
    let resultList = []; // 开票结果-正数开票结果列表
    let negativeResultList = []; // 开票结果-负数开票结果列表
    let resultCreditQuota = 0; // 开票结果-可用授信额度
    let resultIsComplete = false; // 开票结果-正数是否开票完成
    let negativeResultIsComplete = false; // 开票结果-负数是否开票完成
    let resultOpenType = 'normal'; // 开票结果-开票类型

    //发票预览页是否保存数据标记
    let previewDataSave = false;
    let blueinvoiceid = '';   //保存数据、开票返回的蓝字发票id
    let redinvoiceid = '';   //保存数据、开票返回的红字发票id

    let interval = null; // loading定时器

    // JQ对象缓存
    const $workbench = $('#imc_invoicealleWorkbench');

    // 头部
    const $head = $workbench.find('.head');
    const $head_item = $head.find('.item');
    const $head_tab = $workbench.find('.treatment-tab');
    const $loading = $workbench.find('.loadingBox');
    // const $head_bill_value = $head.find('.bill').find('.value');
    // const $head_treatment_value = $head.find('.treatment').find('.value');
    // const $head_preview_value = $head.find('.preview').find('.value');
    // const $head_result_value = $head.find('.result').find('.value');

    const $content = $workbench.find('.content');
    // 开票申请单
    const $bill = $workbench.find('.bill');
    const $bill_table = $bill.find('.bill-table');
    // 单据明细处理
    const $treatment = $workbench.find('.treatment');
    const $treatment_solutions = $treatment.find('.solutions');
    const $treatment_negative_solutions = $treatment.find('.negative-box');
    const $treatment_bill = $treatment.find('.bill-detail');
    const $treatment_invoice = $treatment.find('.invoice-detail');
    const $treatment_negative = $treatment.find('.negative-table');
    // 发票预览
    const $preview = $workbench.find('.preview');
    const $preview_bill = $preview.find('.bill-list');
    const $preview_box = $preview.find('.invoice-box');
    const $preview_table = $preview.find('.preview-table');
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
    const $preview_transportLine = $preview_invoice.find('.transportLine');
    const $preview_transportDetail = $preview_invoice.find('.transportDetail');
    const $preview_operator = $preview_invoice.find('.operator').find('.value');
    const $preview_operator_name = $preview_invoice.find('.operator').find('.name');
    const $preview_travelLine = $preview_invoice.find('.travelLine');
    const $preview_travelDetail = $preview_invoice.find('.travelDetail');
    const $preview_solutions = $preview.find('.preview-solutions');
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
        document.getElementById('imc_invoicealleWorkbench').style.setProperty('--theme', themeColor);

        // 防止内容闪现
        $content.show();
        hidePreback = props.hidePreback ||false;
        curIndex = props.currentDisplay || 0;
        taxequipment = props.taxequipment || 0.06;

        billParam.billMerger = props.isMergeBill || false;
        billParam.itemMerger = props.isMergeDetail || false;
        billParam.deviceNo = props.currentJqbh || '';
        billParam.currentAccount = props.currentAccount || '';
        billParam.terminalNo = props.terminalNo || '';
        billParam.creditQuota = props.creditQuota || 0;
        
        billParam.total = props.total || 0;
        billParam.totalPage = props.totalPage || 1;
        billParam.totalamount = props.totalamount || 0;

        deviceNoList = props.jqbhs || [];
        accountMap = props.accountMap || null;
        mergerule = props.mergerule || [];
        terminalNoList = props.terminalNos || [];
        billList = props.bills || [];
        treatmentSplitRule = props.splitrule || [];
        billNoMap = props.billNoMap || {};

        for (let i = 0; i < treatmentSplitRule.length; i++) {
            const curData = treatmentSplitRule[i];
            treatmentSplitRuleDict['k' + curData.ruleCode] = curData.ruleName;
        }
        if (props.mergeBill) {
            treatmentShowBillList = props.mergeBill.bills || [];
        }
        if (props.invoiceList) {
            // 页面初始化
            treatmentInvoiceList = treatmentBillInvoiceInit(props.invoiceList);
            treatmentInvoiceList = props.invoiceList || {};
            initTreatmentInvoiceListSetMap(treatmentInvoiceList);
            treatmentInvoiceRelationMap = props.invoiceRelationMap || {};
        }
        if (props.limitAmounts) {
            limitAmounts = props.limitAmounts;
        }

        // 负数匹配规则
        matchrule = props.matchrule || [];
        redConfirmmatchrule = props.redConfirmmatchrule || [];
        negativeRules = {
            blue: matchrule.length ? matchrule[0].ruleCode : '',
            red: redConfirmmatchrule.length ? redConfirmmatchrule[0].ruleCode : ''
        };

        // 设置header
        setHeaderInfo();

        if (curIndex === 2) {
            updateBillHeader();
            updateTreatmentHeader();
        }
        if (props.repeatInit && props.repeatInit === 'repeatInit') {
            $head_tab.find('.treatment-tab-item').eq(0).text(`正数单据开票处理(${props.currentTab === 'positive' ? props.billTotal : 0})`);
            $head_tab.find('.treatment-tab-item').eq(1).text(`负数单据开票处理(${props.currentTab === 'negative' ? props.billTotal : 0})`);
            if (props.currentTab === 'positive') {
                $head_tab.find('.treatment-tab-item').eq(0).addClass('tab-actived');
                $head_tab.find('.treatment-tab-item').eq(1).removeClass('tab-actived');
                $head.find('.preview').find('.info').text('发票预览');
            } else {
                $head_tab.find('.treatment-tab-item').eq(0).removeClass('tab-actived');
                $head_tab.find('.treatment-tab-item').eq(1).addClass('tab-actived');
                $head.find('.preview').find('.info').text('红冲申请');
            }
            currentTab = props.currentTab;
            return;
        }
        setCurrentDisplay(curIndex);
    }

    // 设置header
    function setHeaderInfo() {
        const result = billList.find(o => o.invoicetype === '08xdp' || o.invoicetype === '10xdp');
        if (curIndex === 0) {
            $head_tab.css({ display: 'none' });
            $head.css({ display: 'none' });
        } else {
            $head_tab.css({ display: '' });
            $head.css({ display: '' });
        }     
        if (result) {
            // 数电
            $head.find('.bill').find('.info').find('.text').eq(2).show().next().show();
            $head.find('.result').find('.info').find('.text').eq(2).show();
            // $head_bill_value.eq(3).text(`${billParam.creditQuota || '- -'}元`);
        } else {
            // 非数电
            $head.find('.bill').find('.info').find('.text').eq(0).show().next().show();
            $head.find('.result').find('.info').find('.text').eq(0).show();
        }
    }

    // 设置当前显示内容
    function setCurrentDisplay(index, needLoad) {
        curIndex = index;
        // 头部
        switch (index) {
        case 0:
            showBill();
            break;
        case 1:
            treatmentIndex = 0;
            if (!needLoad) {
                model.invoke("bill/mergebill", {
                    "currentAccount": billParam["currentAccount"],
                    "mergeBill": billParam["billMerger"],
                    "mergeBillDetail": billParam["itemMerger"],
                    "mergeRuleId": billParam["mergeRuleId"]
                });
            } else {
                if (currentTab === 'positive') {
                    showTreatmentSolutions();
                    showTreatmentBill();
                    updateTreatmentHeader();
                } else {
                    showNegativeConfig();
                }
            }
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
        $head_item.removeClass('actived hack').eq(index).addClass('hack');
        for (let i = 0; i <= index; i++) {
            $head_item.eq(i).addClass('actived');
        }
        $content.find('.content-item').hide().eq(index).show();
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
        const { pageIndex, total, totalPage } = billParam;
        fpyTable.init({
            id: 'imc_invoicealleWorkbench_bill_table',
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
                    width: 190,
                    render: (t, r) => `<a href='javascript:;' data-name="detail" data-key=${r.id}>${t}</a>`
                },
                {
                    align: 'left',
                    title: '购方名称',
                    dataIndex: 'buyername',
                    ellipsis: true,
                    width: 190
                },
                {
                    align: 'left',
                    title: '单据日期',
                    dataIndex: 'billdate',
                    width: 118
                },
                {
                    align: 'left',
                    title: '发票种类',
                    dataIndex: 'invoicetype',
                    width: 100,
                    ellipsis: true,
                    render: t => INVOICE_TYPES_DICT['k' + t] || t
                },
                {
                    align: 'left',
                    title: '单据性质',
                    dataIndex: 'billproperties',
                    render: t => t === '-1' ? '负数' : '正数',
                    width: 70
                },
                {
                    align: 'left',
                    title: '合并规则',
                    dataIndex: 'mergerulename',
                    ellipsis: true,
                    width: 100
                },
                {
                    align: 'right',
                    title: '单据金额（元）',
                    dataIndex: 'totalamount',
                    width: 135,
                    render: t => Number(t).toFixed(2)
                },
                {
                    align: 'right',
                    title: '可开票金额（元）',
                    dataIndex: 'surplusamount',
                    width: 157,
                    render: (t, r) => fpy_Add(t, r.surplustax).toFixed(2)
                },
                {
                    title: '操作',
                    dataIndex: 'id',
                    width: 40,
                    render: (t, r, i) => `<a href='javascript:;' data-name="del" data-key=${r.id} data-total=${r.totalamount} data-count=${r.itemcount}>移除</a>`
                }
            ],
            scroll: tableData.length > 12 ? { y: 400 } : {},
            dataSource: tableData,
            pagination: {
                pageIndex,
                total,
                totalPage
            }
        });
    }

    // 开票申请单-参数
    function showBillParam() {
        $bill.find('.billMerger').prop('checked', billParam.billMerger);
        $bill.find('.itemMerger').prop('checked', billParam.itemMerger);
        accountMap && showAccountList();
        mergerule && mergerule.length > 0 && showMergerule();
    }


    // 开票申请单-合并规则
    function showMergerule() {
        const _html = [`<option value="0" title="按照单据默认方案">按照单据默认方案</option>`];
        for (let i = 0; i < mergerule.length; i++) {
            _html.push(`<option value="${mergerule[i].ruleCode}" title="${mergerule[i].ruleName}">${mergerule[i].ruleName}</option>`);
        }
        $bill.find('.deviceNo-visible').show().find('.deviceNo').html(_html.join('')).val('0');
    }

    // 开票申请单-电子税局账号
    function showAccountList() {
        const accountList = [];
        for (const o in accountMap) {
            accountList.push({
                key: o,
                value: accountMap[o]
            });
        }
        const _html = [`<option value="" disabled>请选择电子税局账号</option>`];
        for (let i = 0; i < accountList.length; i++) {
            _html.push(`<option value="${accountList[i].key}" title="${accountList[i].value}">${accountList[i].value}</option>`);
        }
        $bill.find('.account-visible').show().find('.account').html(_html.join('')).val(billParam.currentAccount);
    }

    // // 开票申请单-终端号
    // function showBillTerminalNo() {
    //     if (terminalNoList.length) {
    //         const _html = [];
    //         for (let i = 0; i < terminalNoList.length; i++) {
    //             _html.push(`<option value="${terminalNoList[i]}" title="${terminalNoList[i]}">${terminalNoList[i]}</option>`);
    //         }
    //         $bill.find('.terminalNo-visible').show().find('.terminalNo').html(_html.join('')).val(billParam.terminalNo);
    //     } else {
    //         $bill.find('.terminalNo-visible').hide().find('.terminalNo').empty();
    //     }
    // }

    // 开票申请单-更新头部
    function updateBillHeader() {
        $head_tab.css({ display: 'none' });
        $head.css({ display: 'none' });
    }

    // 单据明细处理
    function showTreatment() {
        showTreatmentSolutions();
        showTreatmentBill();
        showTreatmentInvoice();
        updateTreatmentHeader();
    }

    // // 单据明细处理-负数匹配方案
    function showTreatmentNegativeRules() {
        // 当前方案
        const blueValue = negativeRules.blue ? matchrule.find(item => negativeRules.blue === item.ruleCode).ruleName : '';
        const redValue = negativeRules.red ? redConfirmmatchrule.find(item => negativeRules.red === item.ruleCode).ruleName : '';
        
        $treatment_negative_solutions.find('.blue').find('.cur-solutions').text(blueValue);
        $treatment_negative_solutions.find('.red').find('.cur-solutions').text(redValue);

        const newMatchrule = matchrule.filter(item => item.ruleCode !== negativeRules.blue);
        const newRedConfirmmatchrule = redConfirmmatchrule.filter(item => item.ruleCode !== negativeRules.red);
        
        // 常用方案
        if (newMatchrule.length > 0) {
            $treatment_negative_solutions.find('.blue').find('.common-solutions').html(
                `<div class="solutions-item truncateText" data-key="blue" data-id="${newMatchrule[0].ruleCode}" title="${newMatchrule[0].ruleName}">${newMatchrule[0].ruleName}</div>`
            );
        }
        if (newRedConfirmmatchrule.length > 0) {
            $treatment_negative_solutions.find('.red').find('.common-solutions').html(
                `<div class="solutions-item truncateText" data-key="red" data-id="${newRedConfirmmatchrule[0].ruleCode}" title="${newRedConfirmmatchrule[0].ruleName}">${newRedConfirmmatchrule[0].ruleName}</div>`
            );
        }
        
        // 更多方案
        if (newMatchrule.length > 1) {
            const _html = [];
            for (let i = 1; i < newMatchrule.length; i++) {
                const obj = newMatchrule[i];
                _html.push(`<div class="solutions-item truncateText" data-key="blue" data-id="${obj.ruleCode}" title="${obj.ruleName}">${obj.ruleName}</div>`);
            }
            $treatment_negative_solutions.find('.blue').find('.more-solutions').html(_html.join(''));
            $treatment_negative_solutions.find('.blue').find('.more-box').show();
        } else {
            $treatment_negative_solutions.find('.blue').find('.more-box').hide();
        }

        if (newRedConfirmmatchrule.length > 1) {
            const _html = [];
            for (let i = 1; i < newRedConfirmmatchrule.length; i++) {
                const obj = newRedConfirmmatchrule[i];
                _html.push(`<div class="solutions-item truncateText" data-key="red" data-id="${obj.ruleCode}" title="${obj.ruleName}">${obj.ruleName}</div>`);
            }
            $treatment_negative_solutions.find('.red').find('.more-solutions').html(_html.join(''));
            $treatment_negative_solutions.find('.red').find('.more-box').show();
        } else {
            $treatment_negative_solutions.find('.red').find('.more-box').hide();
        }
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
        for (let i = 0; i < treatmentShowBillList.length; i++) {
            const obj = treatmentShowBillList[i];
            _html.push(`
                <div class="item ${i === treatmentIndex ? 'actived' : ''}">
                    <div class="title">
                        ${getTreatmentBillTitleHtmlByIndex(i)}
                    </div>
                    <div id="imc_invoicealleWorkbench_treatment_bill${obj.id}"></div>
                </div>
            `);
        }
        if (billPageInfo.totalPage > 1) {
            _html.push(`
                <div class="bill-loading">加载中...</div>
            `);
        }
        $treatment_bill.html(_html.join(''));
        for (let i = 0; i < treatmentShowBillList.length; i++) {
            updateTreatmentBillTableByIndex(i);
            testTreatmentBillFinishedByInit(i); // 校验信息是否填写完整
        }
    }

    // 单据明细处理-更新单据table
    function updateTreatmentBillTableByIndex(treatmentIndex, setScrollTop = false) {
        const { id, sim_original_bill_item, splitrule } = treatmentShowBillList[treatmentIndex];
        let _dataSource = sim_original_bill_item;

        let _selectedRowKeys = false;
        let _disabled = false;
        // 按明细拆分
        if (splitrule === IMC_SPLIT_BY_DETAIL) {
            _dataSource = treatmentRemainingItems[id].items;
            _selectedRowKeys = treatmentRemainingItems[id].selectedRowKeys;
            _disabled = o => o.remainvalidamount == 0 || o.rowtype === '1';
        }
        const totalData = treatmentBillTotalGet(_dataSource);

        let scrollTop;
        let tableDom;
        if (setScrollTop) {
            tableDom = $(`#imc_invoicealleWorkbench_treatment_bill${id}`);
            scrollTop = tableDom.find('.workbench-scroll').scrollTop();
        }
        fpyTable.init({
            id: `imc_invoicealleWorkbench_treatment_bill${id}`,
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
                    align: 'right',
                    title: '可申请数量',
                    dataIndex: 'remainvalidnum',
                    ellipsis: true,
                    width: 90,
                    render: (t, r) => r.taxunitprice != 0 ? fpy_toFixedNoZero(t) : '',
                    showTotal: true
                },
                {
                    align: 'right',
                    title: '可申请金额(含税)',
                    dataIndex: 'remainvalidamount',
                    ellipsis: true,
                    width: 100,
                    render: t => Number(t).toFixed(2),
                    showTotal: true
                }
            ],
            scroll: _dataSource.length > 5 ? { y: 130 } : {},
            dataSource: _dataSource,
            selectedRowKeys: _selectedRowKeys,
            disabled: _disabled,
            headerColor: '#666',
            headerBgColor: '#eeeeee',
            rowHeight: 26,
            showTotal: totalData
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
        const obj = treatmentShowBillList[treatmentIndex];
        // 是否按明细拆分
        const isDetailSplit = obj.splitrule === IMC_SPLIT_BY_DETAIL;
        const difference = fpy_Minus(obj.maintaxdeviation || 0, obj.adjustedData || 0);
        const _html = `
            <div class="name truncateText" title="${obj.billno}">单据编号：${obj.billno}</div>
            <div class="statu">信息待补充</div>
            ${difference != 0 ? `<div class="error">税额尾差：${Number(difference).toFixed(2)}</div>` : ''}
            ${isDetailSplit ? `<div class="sure primary ${obj.remainingDisabled ? 'disabled' : ''}">确认选取</div>` : ''}
        `;
        return _html;
    }

    // 单据明细处理-发票初始化
    function treatmentBillInvoiceInit(data = []) {
        Object.keys(data).map((key) => {
            data[key] = data[key].map(invoice => {
                return {
                    ...invoice,
                    totalNum: (invoice.items || []).reduce((all, item) => fpy_Add(all, item.num), 0),
                    isFold: false,
                    isItemFold: false,
                    E03Data: invoice.specialtype === 'E03' ? [{
                        landtaxno: invoice.landtaxno,
                        buildingname: invoice.buildingname,
                        crosscitysign: invoice.crosscitysign,
                        simpleaddress_name: invoice.simpleaddress_name,
                        crosscitytaxverifyno: invoice.crosscitytaxverifyno || ''
                    }] : [],
                    E06Data: invoice.specialtype === 'E06' ? [{
                        simpleaddress_name: invoice.simpleaddress_name,
                        startleasedate: invoice.startleasedate,
                        endleasedate: invoice.endleasedate,
                        crosscitysign: invoice.crosscitysign,
                        estateid: invoice.estateid
                    }] : [],
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
    function initTreatmentInvoiceListSetMap(data = []) {
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
        const { id: billId } = treatmentShowBillList[treatmentIndex];
        const _data = treatmentInvoiceList[billId];
        const _length = _data.length;
        const _html = [];

        // 缓存发票数据
        modifyBillInvoiceList = {
            ...modifyBillInvoiceList,
            [billId]: treatmentInvoiceList
        };

        for (let i = 0; i < _length; i++) {
            const obj = _data[i];
            const { specialtype, cobuyerflag } = obj;
            const isE03 = specialtype === 'E03'; // 建筑服务
            const isE05 = specialtype === 'E05'; // 不动产销售
            const isE06 = specialtype === 'E06'; // 不动产租赁
            const isExistGoodsTransport = specialtype === 'E04';
            const isExistGoodsTravel = specialtype === 'E09';
            const isExistGoodsCollectionShip = specialtype === 'E07';
            const isMulbuyer = cobuyerflag === '1';
            _html.push(`
                <div class="item">
                    <div class="info" data-all="${_length}">
                        ${getTreatmentInvoiceInfoHtmlByIndex(i)}
                    </div>
                    <div class="total">
                        ${getTreatmentInvoiceTotalHtmlByIndex(i)}
                    </div>
                    <div style="overflow-x: scroll;overflow-y: hidden;">
                        <div id="imc_invoicealleWorkbench_treatment_invoice${obj.id}"></div>
                    </div>
                    ${isExistGoodsTransport ? (
                        `<div>
                            <div class="itemTitle">特定信息-货物运输</div>
                            <div><span class="addBtn">增行</span></div>
                            <div id="imc_invoicealleWorkbench_treatment_goodsTransport${obj.id}"></div>
                        </div>`
                    ) : ''}
                    ${isExistGoodsTravel ? (
                        `<div style="overflow-x: scroll;overflow-y: hidden;">
                            <div class="itemTitle">特定信息-旅客运输</div>
                            <div id="imc_invoicealleWorkbench_treatment_goodsTravel${obj.id}"></div>
                        </div>`
                    ) : ''}
                    ${isExistGoodsCollectionShip ? (
                        `<div style="overflow-x: scroll;overflow-y: hidden;">
                            <div class="itemTitle">特定信息-代收车船税</div>
                            <div id="imc_invoicealleWorkbench_treatment_goodsCollectionShip${obj.id}"></div>
                        </div>`
                    ) : ''}
                    ${isE03 ? (
                        `<div>
                            <div class="itemTitle">特定信息-建筑服务</div>
                            <div id="imc_invoicealleWorkbench_treatment_E03${obj.id}"></div>
                        </div>`
                    ) : ''}
                    ${isE06 ? (
                        `<div>
                            <div class="itemTitle">特定信息-不动产租赁</div>
                            <div id="imc_invoicealleWorkbench_treatment_E06${obj.id}"></div>
                        </div>`
                    ) : ''}
                    ${isE05 ? (
                        `<div>
                            <div class="itemTitle">特定信息-不动产销售</div>
                            <div id="imc_invoicealleWorkbench_treatment_invoice_statesales${obj.id}"></div>
                        </div>`
                    ) : ''}
                    ${isE05 && isMulbuyer ? (
                        `<div>
                            <div class="itemTitle">特定信息-共同购买方信息</div>
                            <div id="imc_invoicealleWorkbench_treatment_invoice_buyername${obj.id}"></div>
                        </div>`
                    ) : ''}
                </div>
            `);
        }
        $treatment_invoice.html(_html.join(''));
        for (let i = 0; i < _length; i++) {
            const { specialtype } = _data[i];
            const isExistGoodsTransport = specialtype === 'E04';
            const isExistGoodsTravel = specialtype === 'E09';
            const isExistGoodsCollectionShip = specialtype === 'E07';
            const isExistGoodsEstatesalesBuyer = specialtype === 'E05';
            const isExistGoodsEstatesalesInfo = specialtype === 'E05';
            const isE03 = specialtype === 'E03'; // 建筑服务
            const isE06 = specialtype === 'E06'; // 不动产租赁
            updateTreatmentInvoiceTableByIndex(i);
            isExistGoodsTransport && updateGoodsTransportTable(i);
            isExistGoodsTravel && updateGoodsTravelTable(i);
            isExistGoodsCollectionShip && updateGoodsCollectionShipTable(i);
            isExistGoodsEstatesalesBuyer && updateTreatmentInvoiceInfoHtmlForBuyernameTable(i);
            isExistGoodsEstatesalesInfo && updateTreatmentInvoiceInfoHtmlForeStatesalesTable(i);
            isE03 && updateE03Table(i);
            isE06 && updateE06Table(i);
        }
    }

    // 单据处理明细-显示正数
    function showPositiveConfig() {
        // $head_tab.find('.treatment-tab-item').eq(0).addClass('tab-actived');
        // $head_tab.find('.treatment-tab-item').eq(1).removeClass('tab-actived');
        $head.find('.preview').find('.info').text('发票预览');
        $treatment_bill.css({ display: '' });
        $treatment_invoice.css({ display: '' });
        $treatment_negative.css({ display: 'none' });
        $treatment_solutions .css({ display: '' });
        $treatment_negative_solutions.css({ display: 'none' });
    }

    // 单据处理明细-显示负数
    function showNegativeConfig() {
        showTreatmentNegativeRules();
        showTreatmentNegativeTable(); // 负数列表
        updateTreatmentHeader();
        $head_tab.find('.treatment-tab-item').eq(0).removeClass('tab-actived');
        $head_tab.find('.treatment-tab-item').eq(1).addClass('tab-actived');
        $head.find('.preview').find('.info').text('红冲申请');
        $treatment_bill.css({ display: 'none' });
        $treatment_invoice.css({ display: 'none' });
        $treatment_negative.css({ display: '' });
        $treatment_solutions .css({ display: 'none' });
        $treatment_negative_solutions.css({ display: '' });
    }

    // 单据明细处理-更新发票总数
    function updateTreatmentInvoiceAll(all) {
        $treatment_invoice.find('.info').attr('data-all', all);
    }

    // 单据明细处理-负数table
    // 开票申请单-列表 筛选显示
    function showTreatmentNegativeTable() {
        const { pageIndex, total, totalPage } = negativePageInfo;
        fpyTable.init({
            id: 'imc_invoicealleWorkbench_negative_table',
            rowKey,
            columns: [
                {
                    title: '序号',
                    width: 40,
                    render: () => '<span class="order"><span>'
                },
                {
                    align: 'left',
                    title: '申请单编码',
                    dataIndex: 'billno',
                    ellipsis: true,
                    width: 130
                },
                {
                    align: 'left',
                    title: '购方',
                    dataIndex: 'buyername',
                    ellipsis: true,
                    width: 120
                },
                {
                    align: 'right',
                    title: '总销售额/折扣额',
                    dataIndex: 'applyamount',
                    width: 100,
                    render: t => Number(t).toFixed(2)
                },
                {
                    align: 'right',
                    title: '已匹配金额',
                    dataIndex: 'matchamount',
                    width: 100,
                    render: t => Number(t).toFixed(2)
                },
                {
                    title: '已匹配金额比例',
                    dataIndex: 'matchpercent',
                    width: 100,
                    render: (t) => t || ''
                },
                {
                    align: 'right',
                    title: '剩余未匹配金额',
                    dataIndex: 'unmatchamount',
                    width: 130,
                    render: (t) => t || ''
                },
                {
                    title: '是否已全部匹配',
                    dataIndex: 'matchstatus',
                    width: 100,
                    render: (t) => t == 1 ? '是' : '否'
                },
                {
                    title: '匹配发票',
                    dataIndex: 'matchinvoicenum',
                    width: 80
                },
                {
                    title: '匹配类型',
                    dataIndex: 'matchtarget',
                    ellipsis: true,
                    width: 80,
                    render: (t) => matchtargetObj[t] || ''
                },
                {
                    title: '操作',
                    dataIndex: 'id',
                    width: 120,
                    render: (t, r, i) => `<div>
                        <a href='javascript:;' data-name="edit" data-id=${r.id} style="margin-right: 12px">编辑</a>
                        <a href='javascript:;' data-name="match" data-id=${r.id}>匹配结果</a>
                    </div>`
                }
            ],
            scroll: treatmentNegativeList.length > 12 ? { y: 400 } : {},
            dataSource: treatmentNegativeList,
            selectedRowKeys: negativeSelectedRowKeys,
            pagination: {
                pageIndex,
                total,
                totalPage
            },
            openKey: 'invoiceOrRedConfirm',
            openTitle: [
                {
                    width: 30,
                    name: '序号'
                },
                {
                    width: 110,
                    name: '原蓝票代码'
                },
                {
                    width: 130,
                    name: '原蓝票号码'
                },
                {
                    width: 130,
                    name: '红字确认单编号'
                },
                {
                    width: 120,
                    name: '购方'
                },
                {
                    width: 90,
                    name: '发票种类'
                },
                {
                    width: 100,
                    name: '匹配发票金额'
                },
                {
                    width: 100,
                    name: '是否全额红冲'
                },
                {
                    width: 100,
                    name: '红字确认单确认状态'
                }
            ],
            negativeOpenKey,
            allChecked: negativeAllData,
            confirmstatusList
        });
        
        // 默认全选所有数据
        const dom = $('#imc_invoicealleWorkbench_negative_table');
        dom.find('input[data-type=all]').prop('checked', treatmentNegativeList.every(item => negativeSelectedRowKeys.some(i => i === item.id)));
        dom.find('input[data-type=allData]').prop('checked', negativeSelectedRowKeys.length === total);
    }

    // 单据明细处理-获取发票信息的html--多个购方名称
    function updateTreatmentInvoiceInfoHtmlForBuyernameTable(invoiceIndex, setScrollTop = false) {
        const { id: billId } = treatmentShowBillList[treatmentIndex];

        const _data = treatmentInvoiceList[billId];
        // console.log('======BuyernameTable=======_data', invoiceIndex, _data);
        // 发票
        const { id, cobuyers } = _data[invoiceIndex];
        const newCobuyers = cloneDeep(cobuyers);
        cacheCobuyers = newCobuyers;
        const columns = [
            {
                align: 'left',
                title: '共同购买方',
                dataIndex: 'cobuyer',
                ellipsis: true,
                width: 100,
                render: (t, r, i) => {
                    return (
                        `<input class="searchInput" type="text" name="cobuyer" value="${t}" title="${t}" maxlength="100">`
                    );
                }
            },
            {
                title: '证件类型',
                dataIndex: 'cobuyercardtype',
                ellipsis: true,
                width: 100,
                render: (t, r, i) => {
                    const keys = Object.keys(FPY_SALE_ESTATE_CARD_TYPE);
                    let contentHtml = '';
                    contentHtml += `<select name="cobuyercardtype" style="width: 100px">`;
                    for (let i = 0; i < keys.length; i++) {
                        const value = keys[i];
                        text = FPY_SALE_ESTATE_CARD_TYPE[keys[i]];
                        contentHtml += `<option value='${value}' ${t === value ? 'selected' : ''}>${text}</option>`;
                    }
                    contentHtml += '</select>';
                    return (
                        contentHtml
                    )
                }
            },
            {
                title: '证件号码',
                dataIndex: 'cobuyercardno',
                ellipsis: true,
                width: 120,
                render: (t, r, i) => {
                    return (
                        `<input class="searchInput" type="text" name="cobuyercardno" value="${t}" title="${t}" maxlength="20">`
                    );
                }
            }
        ];
        let scrollTop;
        let tableDom;
        if (setScrollTop) {
            tableDom = $(`#imc_invoicealleWorkbench_treatment_invoice_buyername${id}`);
            scrollTop = tableDom.find('.workbench-scroll').scrollTop();
        }
        fpyTable.init({
            id: `imc_invoicealleWorkbench_treatment_invoice_buyername${id}`,
            rowKey,
            columns,
            scroll: newCobuyers.length > 2 ? { y: 62 } : {},
            dataSource: newCobuyers,
            headerColor: '#666',
            headerBgColor: '#ebeef3',
            rowHeight: 26
        });
        // 设置滚动高度
        if (setScrollTop) tableDom.find('.workbench-scroll').scrollTop(scrollTop);
    }

    // 单据明细处理-获取发票信息的html--不动产销售 不动产信息
    function updateTreatmentInvoiceInfoHtmlForeStatesalesTable(invoiceIndex, setScrollTop = false) {
        const { id: billId } = treatmentShowBillList[treatmentIndex];

        const _data = treatmentInvoiceList[billId];
        // 发票
        const { id, estatesales } = _data[invoiceIndex];
        const columns = [
            {
                align: 'left',
                title: '不动产坐落地址(详细地址)',
                dataIndex: 'saledetailaddress',
                ellipsis: true,
                width: 100,
                render: (t, r, i) => {
                    return (
                        `<input class="searchInput" type="text" name="saledetailaddress" value="${t}" title="${t}" maxlength="80">`
                    );
                }
            },
            {
                title: '跨地(市)标志',
                dataIndex: 'salecrosscitysign',
                ellipsis: true,
                width: 100,
                render: (t, r, i) => {
                    return (
                        `<select name="salecrosscitysign">
                            <option value="1" ${t === '1' ? 'selected' : ''}>是</option>
                            <option value="0" ${t !== '1' ? 'selected' : ''}>否</option>
                        </select>`
                    );
                }
            },
            {
                title: '产权证书/不动产权证号',
                dataIndex: 'saleestateid',
                ellipsis: true,
                width: 120,
                render: (t, r, i) => {
                    return (
                        `<input class="searchInput" type="text" name="saleestateid" value="${t}" title="${t}" maxlength="40">`
                    );
                }
            }
        ];
        let scrollTop;
        let tableDom;
        if (setScrollTop) {
            tableDom = $(`#imc_invoicealleWorkbench_treatment_invoice_statesales${id}`);
            scrollTop = tableDom.find('.workbench-scroll').scrollTop();
        }
        fpyTable.init({
            id: `imc_invoicealleWorkbench_treatment_invoice_statesales${id}`,
            rowKey,
            columns,
            scroll: estatesales.length > 2 ? { y: 62 } : {},
            dataSource: estatesales,
            headerColor: '#666',
            headerBgColor: '#ebeef3',
            rowHeight: 26
        });
        // 设置滚动高度
        if (setScrollTop) tableDom.find('.workbench-scroll').scrollTop(scrollTop);
    }

    // 单据明细处理-获取发票信息的html
    function getTreatmentInvoiceInfoHtmlByIndex(invoiceIndex) {
        const { id: billId } = treatmentShowBillList[treatmentIndex];
        const _data = treatmentInvoiceList[billId];
        const {
            invoicetype,
            buyername,
            buyertaxno,
            buyeraddr,
            buyerbank,
            buyeremail,
            buyerphone,
            remark,
            fixedNumber,
            isFold
        } = _data[invoiceIndex];
        console.log(_data[invoiceIndex], 'data-1------------------------')
        const _html = [`
            <div class="text">
                <div class="name">发票类型</div>
                <div class="value">
                    <div class="invoiceType" data-key="${invoicetype}">${INVOICE_TYPES_DICT['k' + invoicetype] || invoicetype}</div>
                </div>
            </div>
            <div class="text">
                <div class="name requiredFields">购方名称</div>
                <div class="value search">
                    <input class="searchInput pressEnter itemWidth" type="text" name="buyername" maxlength="100" value="${buyername}">
                    <div data-name="buyername" class="search-btn"></div>
                </div>
            </div>
            <div class="text">
                <div class="name ${invoicetype === '028' || invoicetype === '004' ? 'requiredFields' : ''}">纳税人识别号</div>
                <div class="value">
                    <input class="searchInput itemWidth" type="text" name="buyertaxno" maxlength="20" value="${buyertaxno}">
                </div>
                <div class="fold" data-invoiceIndex=${invoiceIndex}>${isFold ? '收起' : '展开'}<div class=${isFold ? "unfold-icon" : "fold-icon"}></div></div>
            </div>
        `];
        if (isFold) {
            _html.push(`
                <div class="text">
                    <div class="name ${invoicetype === '028' || invoicetype === '004' ? 'requiredFields' : ''}">地址及电话</div>
                    <div class="value">
                        <input class="searchInput itemWidth" type="text" name="buyeraddr" maxlength="100" value="${buyeraddr}">
                    </div>
                </div>
                <div class="text">
                    <div class="name ${invoicetype === '028' || invoicetype === '004' ? 'requiredFields' : ''}">开户行及账号</div>
                    <div class="value">
                        <input class="searchInput itemWidth" type="text" name="buyerbank" maxlength="100" value="${buyerbank}">
                    </div>
                </div>
                <div class="text">
                    <div class="name">收票邮箱</div>
                    <div class="value">
                        <input class="searchInput itemWidth" type="text" name="buyeremail" maxlength="100" value="${buyeremail}">
                    </div>
                </div>
                <div class="text">
                    <div class="name">收票手机号</div>
                    <div class="value">
                        <input class="searchInput itemWidth" type="text" name="buyerphone" maxlength="11" value="${buyerphone}">
                    </div>
                </div>
                <div class="text">
                    <div class="name">备注</div>
                    <div class="value">
                        <textarea name="remark" maxlength="450">${remark}</textarea>
                    </div>
                </div>
            `);
        }
        return _html.join('');
    }

    // 单据明细处理-更新发票信息
    function updateTreatmentInvoiceInfoByIndex(invoiceIndex) {
        $treatment_invoice.find('.item').eq(invoiceIndex).find('.info').html(getTreatmentInvoiceInfoHtmlByIndex(invoiceIndex));
    }

    // 单据明细处理-更新发票table
    function updateTreatmentInvoiceTableByIndex(invoiceIndex, setScrollTop = false) {
        const { id: billId, splitrule, maintaxdeviation } = treatmentShowBillList[treatmentIndex];
        // 是否按明细拆分
        const isDetailSplit = splitrule === IMC_SPLIT_BY_DETAIL;
        const _data = treatmentInvoiceList[billId];

        // 发票
        const { id, invoicetype, specialtype, invoiceContent, hsbz, items } = _data[invoiceIndex];
        const taxEdit = (maintaxdeviation && maintaxdeviation != 0)|| ((invoicetype === '028' || invoicetype === '004') && invoiceContent === '2');
        const columns = [
            {
                title: '序号',
                width: 40,
                render: () => '<span class="order"><span>'
            },
            {
                align: 'left',
                title: '开票项目',
                dataIndex: 'goodsname',
                ellipsis: true,
                width: 150
            },
            {
                align: 'right',
                title: '数量',
                dataIndex: 'num',
                width: 80,
                render: (t, r, i) => {
                    const val = r.taxunitprice != 0 ? fpy_toFixedNoZero(t) : '';
                    return (
                        r.taxunitprice != 0
                            ? (isDetailSplit
                                // 折扣行和非折扣行含税金额相加为0，不允许修改
                                ? (items[i + 1]?.rowtype === '1' && items[i]?.taxamount + items[i + 1]?.taxamount === 0 ? (
                                    `<span title="${val}">${val}</span>`
                                ) : `<input class="searchInput" type="text" name="num" value="${val}" title="${val}">`)
                                : `<span title="${val}">${val}</span>`)
                            : '');
                }
            },
            {
                align: 'right',
                title: `单价(${hsbz === '1' ? '' : '不'}含税)`,
                dataIndex: hsbz === '1' ? 'taxunitprice' : 'unitprice',
                width: 80,
                render: t => {
                    const val = fpy_toFixedTwoOrMore_dj(t);
                    return t && t != '0' ? `<span class="xmdj" title="${val}">${val}</span>` : '';
                }
            },
            {
                align: 'right',
                title: '税率',
                dataIndex: 'taxrate',
                width: 55,
                render: t => t && t !== null ? t * 100 + '%' : ''
            },
            {
                align: 'right',
                title: '不含税金额',
                dataIndex: 'amount',
                width: 90,
                render: t => {
                    const val = Number(t).toFixed(2);
                    return `<span class="amount" title="${val}">${val}</span>`;
                }
            },
            {
                align: 'right',
                title: '税额',
                dataIndex: 'tax',
                width: 60,
                render: (t, r, i) => {
                    const val = Number(t).toFixed(2);
                    return (
                        taxEdit && r.rowtype !== '1'
                            ? `<input class="searchInput" type="text" name="tax" value="${val}" title="${val}">`
                            : `<span class="tax" title="${val}">${val}</span>`
                    );
                }
            },
            {
                align: 'right',
                title: '含税金额',
                dataIndex: 'taxamount',
                width: 90,
                render: (t, r, i) => {
                    const val = Number(t).toFixed(2);
                    return (
                        // 明细拆分 非折扣行 非机动车
                        isDetailSplit && r.rowtype !== '1' && specialtype !== '18'
                            // 折扣行和非折扣行含税金额相加为0，不允许修改
                            ? (items[i + 1]?.rowtype === '1' && items[i]?.taxamount + items[i + 1]?.taxamount === 0 ? (
                                `<span title="${val}">${val}</span>`
                            ) : `<input class="searchInput" type="text" name="taxamount" value="${val}" title="${val}">`)
                            : `<span class="taxamount" title="${val}">${val}</span>`
                    );
                }
            }
        ];
        if (isDetailSplit) {
            columns.push({
                title: '操作',
                width: 40,
                render: (t, r, i) => r.rowtype !== '1' ? `<a class="del" href="javascript:;">删除</a>` : ''
            });
        }

        let scrollTop;
        let tableDom;
        if (setScrollTop) {
            tableDom = $(`#imc_invoicealleWorkbench_treatment_invoice${id}`);
            scrollTop = tableDom.find('.workbench-scroll').scrollTop();
        }
        fpyTable.init({
            id: `imc_invoicealleWorkbench_treatment_invoice${id}`,
            rowKey,
            columns,
            // scroll: items.length > 8 ? { y: 208 } : {},
            scroll: items.length > 5 ? { h: 120, x: 778 } : {},
            dataSource: items,
            headerColor: '#666',
            headerBgColor: '#eee',
            rowHeight: 26,
            isResizer: true
        });
        // 设置滚动高度
        if (setScrollTop) tableDom.find('.workbench-scroll').scrollTop(scrollTop);
    }

    // 单据明细处理-更新货物运输table
    function updateGoodsTransportTable(invoiceIndex, setScrollTop = false) {
        const { id: billId } = treatmentShowBillList[treatmentIndex];

        const _data = treatmentInvoiceList[billId];
        // 发票
        const { id, freights } = _data[invoiceIndex];
        const columns = [
            {
                title: '运输工具种类',
                dataIndex: 'transporttype',
                width: 100,
                render: (t, r, i) => {
                    return (
                        `<select class="searchInput" name="transporttype">
                            <option value="铁路运输" ${t === '铁路运输' ? 'selected' : ''}>铁路运输</option>
                            <option value="公路运输" ${t === '公路运输' ? 'selected' : ''}>公路运输</option>
                            <option value="水路运输" ${t === '水路运输' ? 'selected' : ''}>水路运输</option>
                            <option value="航空运输" ${t === '航空运输' ? 'selected' : ''}>航空运输</option>
                            <option value="管道运输" ${t === '管道运输' ? 'selected' : ''}>管道运输</option>
                            <option value="其它运输工具" ${t === '其它运输工具' ? 'selected' : ''}>其它运输工具</option>
                        </select>`
                    );
                }
            },
            {
                title: '运输工具牌号',
                dataIndex: 'licenseplate',
                ellipsis: true,
                width: 100,
                render: (t, r, i) => {
                    return `<input class="searchInput" placeholder="无牌号请填无" name="licenseplate" type="text" value="${t}" title="${t}" maxlength="40" />`;
                }
            },
            {
                title: '起运地',
                dataIndex: 'startplace',
                ellipsis: true,
                width: 100,
                render: (t, r, i) => {
                    return `<input class="searchInput" placeholder="可使用Enter键搜索" name="startplace" type="text" value="${t}" title="${t}" maxlength="80" />`;
                }
            },
            {
                title: '到达地',
                dataIndex: 'endplace',
                ellipsis: true,
                width: 100,
                render: (t, r, i) => {
                    return `<input class="searchInput" placeholder="可使用Enter键搜索" name="endplace" type="text" value="${t}" title="${t}" maxlength="80" />`;
                }
            },
            {
                title: '运输货物名称',
                dataIndex: 'transportgoods',
                ellipsis: true,
                width: 100,
                render: (t, r, i) => {
                    return `<input class="searchInput" name="transportgoods" type="text" value="${t}" title="${t}" maxlength="80" />`;
                }
            }
        ];

        columns.push({
            title: '操作',
            width: 40,
            render: (t, r, i) => `<a class="transport-del" href="javascript:;">删除</a>`
        });

        let scrollTop;
        let tableDom;
        if (setScrollTop) {
            tableDom = $(`#imc_invoicealleWorkbench_treatment_goodsTransport${id}`);
            scrollTop = tableDom.find('.workbench-scroll').scrollTop();
        }
        fpyTable.init({
            id: `imc_invoicealleWorkbench_treatment_goodsTransport${id}`,
            rowKey,
            columns,
            scroll: freights.length > 8 ? { y: 208 } : {},
            dataSource: freights,
            headerColor: '#666',
            headerBgColor: '#eee',
            rowHeight: 26
        });
        // 设置滚动高度
        if (setScrollTop) tableDom.find('.workbench-scroll').scrollTop(scrollTop);
    }

    // 单据明细处理-更新建筑服务table
    function updateE03Table(invoiceIndex, setScrollTop = false) {
        const { id: billId, splitrule } = treatmentShowBillList[treatmentIndex];
        const _data = treatmentInvoiceList[billId];
        const { id, E03Data } = _data[invoiceIndex];
        let _dataSource = E03Data;

        // 按明细拆分
        // if (splitrule === IMC_SPLIT_BY_DETAIL) {
        //     _dataSource = treatmentRemainingItems[id].E03Data;
        // }
        // 发票
        const columns = [
            {
                title: '土地增值税项目编号',
                dataIndex: 'landtaxno',
                width: 100
            },
            {
                title: '建筑项目名称',
                dataIndex: 'buildingname',
                ellipsis: true,
                width: 100
            },
            {
                title: '跨地（市）标志',
                dataIndex: 'crosscitysign',
                width: 100,
                render: (t, r, i) => {
                    return t === '1' ? '是' : '否'
                }
            },
            {
                title: '建筑服务发生地',
                dataIndex: 'simpleaddress_name',
                width: 100
            },
            {
                title: '跨区域涉税事项报验管理编号',
                dataIndex: 'crosscitytaxverifyno',
                width: 120
            }
        ];
        let scrollTop;
        let tableDom;
        if (setScrollTop) {
            tableDom = $(`#imc_invoicealleWorkbench_treatment_E03${id}`);
            scrollTop = tableDom.find('.workbench-scroll').scrollTop();
        }
        fpyTable.init({
            id: `imc_invoicealleWorkbench_treatment_E03${id}`,
            rowKey,
            columns,
            dataSource: _dataSource,
            headerColor: '#666',
            headerBgColor: '#eee',
            rowHeight: 26
        });
        // 设置滚动高度
        if (setScrollTop) tableDom.find('.workbench-scroll').scrollTop(scrollTop);
    }

    // 单据明细处理-更新不动产租赁table
    function updateE06Table(invoiceIndex, setScrollTop = false) {
        const { id: billId, splitrule } = treatmentShowBillList[treatmentIndex];
        const _data = treatmentInvoiceList[billId];
        // 发票
        const { id, E06Data } = _data[invoiceIndex];
        let _dataSource = E06Data;
        // 按明细拆分
        // if (splitrule === IMC_SPLIT_BY_DETAIL) {
        //     _dataSource = treatmentRemainingItems[id].E06Data;
        // }
        const columns = [
            {
                title: '不动产地址',
                dataIndex: 'simpleaddress_name',
                width: 100
            },
            {
                title: '租赁期起止',
                dataIndex: 'startleasedate',
                width: 100,
                render: (t, r, i) => `${r.startleasedate.substring(0, 10)}~${r.endleasedate.substring(0, 10)}`
            },
            {
                title: '跨地（市）标志',
                dataIndex: 'crosscitysign',
                width: 100,
                render: (t, r, i) => {
                    return t === '1' ? '是' : '否'
                }
            },
            {
                title: '产权证书/不动产权证号',
                dataIndex: 'estateid',
                width: 100
            }
        ];
        let scrollTop;
        let tableDom;
        if (setScrollTop) {
            tableDom = $(`#imc_invoicealleWorkbench_treatment_E06${id}`);
            scrollTop = tableDom.find('.workbench-scroll').scrollTop();
        }
        fpyTable.init({
            id: `imc_invoicealleWorkbench_treatment_E06${id}`,
            rowKey,
            columns,
            dataSource: _dataSource,
            headerColor: '#666',
            headerBgColor: '#eee',
            rowHeight: 26
        });
        // 设置滚动高度
        if (setScrollTop) tableDom.find('.workbench-scroll').scrollTop(scrollTop);
    }

    // 单据明细处理-更新旅客运输table
    function updateGoodsTravelTable(invoiceIndex, setScrollTop = false) {
        const { id: billId } = treatmentShowBillList[treatmentIndex];

        const _data = treatmentInvoiceList[billId];
        // console.log(_data, '======travel=======_data')
        // 发票
        const { id, travelers } = _data[invoiceIndex];
        const travelerList = FPY_TRAVELER_LIST;
        // console.log('---------setSpecialtype--travelerList1-------', travelerList);
        const cardTypeList = travelerList.cardTypeList;
        const transportTypeList = travelerList.transportTypeList || [];
        const seatClassList = travelerList.seatClassList || [];
        const columns = [
            {
                title: '出行人',
                dataIndex: 'traveler',
                ellipsis: true,
                width: 100,
                render: (t, r, i) => {
                    return `<input class="searchInput" placeholder="出行人" name="traveler" type="text" value="${t}" title="${t}" maxlength="40" disabled />`;
                }
            },
            {
                title: '出行人证件类型',
                dataIndex: 'travelercardtype',
                width: 100,
                render: (t, r, i) => {
                    let text = '';
                        text += `<select class="searchInput" name="travelercardtype" disabled>`
                            for (const o of cardTypeList) {
                                text += `<option value='${o.value}' ${t === o.value ? 'selected' : ''}>${o.text}</option>`;
                            }
                        text += '</select>'
                    return (
                        text
                    );
                }
            },
            {
                title: '有效身份证件号',
                dataIndex: 'travelercardno',
                ellipsis: true,
                width: 100,
                render: (t, r, i) => {
                    return `<input class="searchInput" placeholder="有效身份证件号" name="travelercardno" type="text" value="${t}" title="${t}" maxlength="40" disabled />`;
                }
            },
            {
                title: '出行日期',
                dataIndex: 'traveldate',
                ellipsis: true,
                width: 100,
                render: (t, r, i) => {
                    return `<input class="searchInput" placeholder="出行日期" name="traveldate" type="text" value="${t}" title="${t}" maxlength="10" disabled />`;
                }
            },
            {
                title: '旅客出发地',
                dataIndex: 'travelerstartplace',
                ellipsis: true,
                width: 100,
                render: (t, r, i) => {
                    return `<input class="searchInput" placeholder="可使用Enter键搜索" name="travelerstartplace" type="text" value="${t}" title="${t}" maxlength="80" disabled />`;
                }
            },
            {
                title: '旅客到达地',
                dataIndex: 'travelerendplace',
                ellipsis: true,
                width: 100,
                render: (t, r, i) => {
                    return `<input class="searchInput" placeholder="可使用Enter键搜索" name="travelerendplace" type="text" value="${t}" title="${t}" maxlength="80" disabled />`;
                }
            },
            {
                title: '交通工具类型',
                dataIndex: 'travelertransporttype',
                width: 100,
                render: (t, r, i) => {
                    let text = '';
                        text += `
                        <select class="searchInput" name="travelertransporttype" disabled>`
                            for (const o of transportTypeList) {
                                text += `<option value='${o.value}' ${t === o.value ? 'selected' : ''}>${o.text}</option>`;
                            }
                        text += '</select>'
                    return (
                        text
                    );
                }
            },
            {
                title: '等级',
                dataIndex: 'travelerseatclass',
                width: 100,
                render: (t, r, i) => {
                    let text = '';
                        text += `
                        <select class="searchInput" name="travelerseatclass" disabled>`
                            for (const o of seatClassList) {
                                text += `<option value='${o.value}' ${t === o.value ? 'selected' : ''}>${o.text}</option>`;
                            }
                        text += '</select>'
                    return (
                        text
                    );
                }
            }
            
        ];

        // columns.push({
        //     title: '操作',
        //     width: 40,
        //     render: (t, r, i) => `<a class="transport-del" href="javascript:;">删除</a>`
        // });

        let scrollTop;
        let tableDom;
        if (setScrollTop) {
            tableDom = $(`#imc_invoicealleWorkbench_treatment_goodsTravel${id}`);
            scrollTop = tableDom.find('.workbench-scroll').scrollTop();
        }
        fpyTable.init({
            id: `imc_invoicealleWorkbench_treatment_goodsTravel${id}`,
            rowKey,
            columns,
            scroll: travelers.length > 8 ? { h: 208, x: 810} : {},
            // scroll: {},
            dataSource: travelers,
            headerColor: '#666',
            headerBgColor: '#eee',
            rowHeight: 26
        });
        // 设置滚动高度
        if (setScrollTop) tableDom.find('.workbench-scroll').scrollTop(scrollTop);
    }

    // 单据明细处理-更新代收船table
    function updateGoodsCollectionShipTable(invoiceIndex, setScrollTop = false) {
        const { id: billId } = treatmentShowBillList[treatmentIndex];

        const _data = treatmentInvoiceList[billId];
        // console.log(_data, '======updateGoodsCollectionShipTable=======_data')
        // 发票
        const { id } = _data[invoiceIndex];
        const vehichevesselships = _data[invoiceIndex].vehichevesselships || [];
        const columns = [
            {
                title: '保险单号',
                dataIndex: 'policyno',
                ellipsis: true,
                width: 100
            },
            {
                title: '车牌号/船舶登记号',
                dataIndex: 'shipsno',
                ellipsis: true,
                width: 100
            },
            {
                title: '税款所属期',
                dataIndex: 'perioddate',
                ellipsis: true,
                width: 100
            },
            {
                title: '代收车船税金额',
                dataIndex: 'vehiclevesselamount',
                ellipsis: true,
                width: 100
            },
            {
                title: '车辆识别代码/车架号码',
                dataIndex: 'vehiclecode',
                ellipsis: true,
                width: 100
            },
            {
                title: '滞纳金金额',
                dataIndex: 'vehiclelateamount',
                ellipsis: true,
                width: 100
            },
            {
                title: '金额合计',
                dataIndex: 'vehicletotalamount',
                ellipsis: true,
                width: 100
            }
        ];

        let scrollTop;
        let tableDom;
        if (setScrollTop) {
            tableDom = $(`#imc_invoicealleWorkbench_treatment_goodsCollectionShip${id}`);
            scrollTop = tableDom.find('.workbench-scroll').scrollTop();
        }
        
        fpyTable.init({
            id: `imc_invoicealleWorkbench_treatment_goodsCollectionShip${id}`,
            rowKey,
            columns,
            scroll: vehichevesselships.length > 8 ? { y: 208 } : {},
            dataSource: vehichevesselships,
            headerColor: '#666',
            headerBgColor: '#eee',
            rowHeight: 26
        });
        // 设置滚动高度
        if (setScrollTop) tableDom.find('.workbench-scroll').scrollTop(scrollTop);
    }

    // 单据明细处理-获取发票合计的html
    function getTreatmentInvoiceTotalHtmlByIndex(invoiceIndex) {
        const { id: billId, splitrule } = treatmentShowBillList[treatmentIndex];
        const { showFixedNumber, fixedNumber } = treatmentInvoiceListSetMap[billId][invoiceIndex];
        const { totalNum = 0, invoiceamount, totaltax, totalamount, inventorymark, isItemFold, items } = treatmentInvoiceList[billId][invoiceIndex];
        
        // 是否按明细拆分
        const isDetailSplit = splitrule === IMC_SPLIT_BY_DETAIL;
        const _html = [`
            <div style="display: flex; flex-wrap: wrap;">
                <span class="total-item">数量合计：<span class="warning totalNum">${tansferNumber(totalNum)}</span>，</span>
                <span class="total-item">不含税金额合计：<span class="warning invoiceamount">${Number(invoiceamount).toFixed(2)}</span>元，</span>
                <span class="total-item">税额合计：<span class="warning totaltax">${Number(totaltax).toFixed(2)}</span>元，</span>
                <span class="total-item">价税合计：<span class="warning totalamount">${Number(totalamount).toFixed(2)}</span>元</span>
            </div>
            <div class="set">
                ${showFixedNumber && isDetailSplit
                    ? (
                        `<div class="set-item">
                            <label for="fixedNumber${invoiceIndex}" class="set-name">固定数量</label>
                            <div class="switch">
                                <input id="fixedNumber${invoiceIndex}" type="checkbox" name="fixedNumber" ${fixedNumber ? 'checked' : ''}>
                                <div class="label"></div>
                            </div>
                        </div>`
                    )
                    : ''}
                ${true ? '' : (
                    `<div class="set-item">
                        <label for="inventorymark${invoiceIndex}" class="set-name">强制清单</label>
                        <div class="switch">
                            <input id="inventorymark${invoiceIndex}" type="checkbox" name="inventorymark" ${inventorymark === '1' ? 'checked' : ''}>
                            <div class="label"></div>
                        </div>
                    </div>`
                )}
            </div>
        `];
        // if (items.length > 5) {
        //     _html.push(`<div class="fold" data-invoiceIndex=${invoiceIndex}>${isItemFold ? '收起' : '展开'}<div class=${isItemFold ? "unfold-icon" : "fold-icon"}></div></div>`);
        // }
        return _html.join('');
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
        const { id: billId } = treatmentShowBillList[treatmentIndex];
        const _data = treatmentInvoiceList[billId];
        const _length = _data.length;

        const i = _length - 1;
        const obj = _data[i];
        const { specialtype, cobuyerflag } = obj;
        const isE03 = specialtype === 'E03'; // 建筑服务
        const isE05 = specialtype === 'E05'; // 不动产销售
        const isE06 = specialtype === 'E06'; // 不动产租赁
        const isExistGoodsTransport = specialtype === 'E04';
        const isExistGoodsTravel = specialtype === 'E09';
        const isExistGoodsCollectionShip = specialtype === 'E07';
        const isMulbuyer = cobuyerflag === '1';
        const isExistGoodsEstatesalesBuyer = specialtype === 'E05';
        const isExistGoodsEstatesalesInfo = specialtype === 'E05';

        const _html = `
            <div class="item">
                <div class="info" data-all="${_length}">
                    ${getTreatmentInvoiceInfoHtmlByIndex(i)}
                </div>
                <div class="total">
                    ${getTreatmentInvoiceTotalHtmlByIndex(i)}
                </div>
                <div id="imc_invoicealleWorkbench_treatment_invoice${obj.id}"></div>
                ${isExistGoodsTransport ? (
                    `<div>
                        <div class="itemTitle">特定信息-货物运输</div>
                        <div><span class="addBtn">增行</span></div>
                        <div id="imc_invoicealleWorkbench_treatment_goodsTransport${obj.id}"></div>
                    </div>`
                ) : ''}
                ${isExistGoodsTravel ? (
                    `<div style="overflow-x: scroll;overflow-y: hidden;">
                        <div class="itemTitle">特定信息-旅客运输</div>
                        <div id="imc_invoicealleWorkbench_treatment_goodsTravel${obj.id}"></div>
                    </div>`
                ) : ''}
                ${isExistGoodsCollectionShip ? (
                    `<div style="overflow-x: scroll;overflow-y: hidden;">
                        <div class="itemTitle">特定信息-代收车船税</div>
                        <div id="imc_invoicealleWorkbench_treatment_goodsCollectionShip${obj.id}"></div>
                    </div>`
                ) : ''}
                ${isE03 ? (
                    `<div>
                        <div class="itemTitle">特定信息-建筑服务</div>
                        <div id="imc_invoicealleWorkbench_treatment_E03${obj.id}"></div>
                    </div>`
                ) : ''}
                ${isE06 ? (
                    `<div>
                        <div class="itemTitle">特定信息-不动产租赁</div>
                        <div id="imc_invoicealleWorkbench_treatment_E06${obj.id}"></div>
                    </div>`
                ) : ''}
                ${isE05 ? (
                    `<div>
                        <div class="itemTitle">特定信息-不动产销售</div>
                        <div id="imc_invoicealleWorkbench_treatment_invoice_statesales${obj.id}"></div>
                    </div>`
                ) : ''}
                ${isE05 && isMulbuyer ? (
                    `<div>
                        <div class="itemTitle">特定信息-共同购买方信息</div>
                        <div id="imc_invoicealleWorkbench_treatment_invoice_buyername${obj.id}"></div>
                    </div>`
                ) : ''}
            </div>
        `;
        $treatment_invoice.append(_html);
        updateTreatmentInvoiceTableByIndex(i);
        isExistGoodsTransport && updateGoodsTransportTable(i);
        isExistGoodsTravel && updateGoodsTravelTable(i);
        isExistGoodsCollectionShip && updateGoodsCollectionShipTable(i);
        isExistGoodsEstatesalesBuyer && updateTreatmentInvoiceInfoHtmlForBuyernameTable(i);
        isExistGoodsEstatesalesInfo && updateTreatmentInvoiceInfoHtmlForeStatesalesTable(i);
        isE03 && updateE03Table(i);
        isE06 && updateE06Table(i);
    }

    // 单据明细处理-更新头部
    function updateTreatmentHeader(hide) {
        let text = '- -';
        if (!hide) {
            const _data = [...new Set(treatmentShowBillList.map(o => treatmentSplitRuleDict['k' + o.splitrule] || ''))];
            text = _data.join('，');
        }
        // $head_treatment_value.text(text);
        $head_tab.css({ display: '' });
        $head.css({ display: '' });
    }

    // 单据明细处理-更新单据数据
    function updateTreatmentBill(index, name, value) {
        treatmentShowBillList[index][name] = value;
    }

    // 单据明细处理-更新发票数据
    function updateTreatmentInvoice(invoiceIndex, name, value, isSync = false) {
        const invoiceList = treatmentInvoiceList[treatmentShowBillList[treatmentIndex].id];
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
        testTreatmentBillFinished(treatmentIndex);
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
    
    // 单据明细处理-更新不动产销售信息
    function updateTreatmentSaleestate(invoiceIndex, name, value, itemIndex, maxlength) {
        // console.log('------updateTreatmentSaleestate------', invoiceIndex, name, value, itemIndex, maxlength);
        const invoiceList = treatmentInvoiceList[treatmentShowBillList[treatmentIndex].id];
        const newCobuyers = cloneDeep(invoiceList[invoiceIndex]['cobuyers']);
        const neweStatesales = cloneDeep(invoiceList[invoiceIndex]['estatesales']);
        if (name === "cobuyer" && value && !/^[\u4e00-\u9fa5a-zA-Z]+$/.test(value)) {
            // model.invoke("common/tip", '只能填写汉子、英文大小写');
            const pattern = /[^\u4e00-\u9fa5a-zA-Z]/g;
            // 如果输入的字符匹配了正则表达式，则删除它
            value = value.replace(pattern, '');
            $('#imc_invoicealleWorkbench_treatment_invoice_buyername' + invoiceList[invoiceIndex].id).find('input[name=cobuyer]').eq(itemIndex).val(value);
            return;
        }

        if (name === "cobuyer" || name === "cobuyercardno" || name === "cobuyercardtype") {
            if (name === "cobuyercardtype") {
                const cacheTypeValue = cacheCobuyers[itemIndex]['cobuyercardtype'];
                let cacheCardNo = '';
                if (cacheTypeValue === value) {
                    cacheCardNo = cacheCobuyers[itemIndex]['cobuyercardno'];
                }
                newCobuyers[itemIndex]['cobuyercardno'] = cacheCardNo;
                $('#imc_invoicealleWorkbench_treatment_invoice_buyername' + invoiceList[invoiceIndex].id).find('input[name=cobuyercardno]').eq(itemIndex).val(cacheCardNo);
            }
            newCobuyers[itemIndex][name] = value;
        } else if (name ==="saledetailaddress" || name === "salecrosscitysign" || name === "saleestateid") {
            neweStatesales[itemIndex][name] = value;
        }
        invoiceList[invoiceIndex] = {
            ...invoiceList[invoiceIndex],
            cobuyers: newCobuyers,
            estatesales: neweStatesales
        };
        testTreatmentBillFinished(treatmentIndex);
    }


    // 单据明细处理-单据信息完整度-填写时校验
    function testTreatmentBillFinished(index) {
        const invoiceList = treatmentInvoiceList[treatmentShowBillList[index].id];
        const iselepaper = treatmentShowBillList[index].iselepaper;
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
            } else {
                // 负数票 购方名称与购方税号不允许修改
                // 专票
                if ((obj.invoicetype === '028' || obj.invoicetype === '004') && iselepaper != '1') {
                    if (!obj.buyeraddr) {
                        isComplete = false;
                        break;
                    }
                    if (!obj.buyerbank) {
                        isComplete = false;
                        break;
                    }
                    if (!obj.applicant) {
                        isComplete = false;
                        break;
                    }
                    // 销方申请
                    if (obj.applicant === '2') {
                        // 无红字信息编码并且有原发票代码号码日期 或者 有红字信息编码 就ok
                        if (!((!obj.infocode && obj.originalinvoicecode && obj.originalinvoiceno && obj.originalissuetime) || obj.infocode)) {
                            isComplete = false;
                            break;
                        }
                    }
                    // 购方申请
                    if (obj.applicant !== '2' && !obj.infocode) {
                        isComplete = false;
                        break;
                    }
                } else if (obj.invoicetype === '08xdp' || obj.invoicetype === '10xdp' || iselepaper == '1') {
                    // 数电
                    if (!obj.infocode) {
                        isComplete = false;
                        break;
                    }
                    if (!obj.originalinvoiceno) {
                        isComplete = false;
                        break;
                    }
                    if (!obj.redreason) {
                        isComplete = false;
                        break;
                    }
                    if (!obj.originalissuetime) {
                        isComplete = false;
                        break;
                    }
                } else {
                    if (!obj.originalinvoicecode) {
                        isComplete = false;
                        break;
                    }
                    if (!obj.originalinvoiceno) {
                        isComplete = false;
                        break;
                    }
                    if (!obj.originalinvoicetype) {
                        isComplete = false;
                        break;
                    }
                    if (!obj.originalissuetime) {
                        isComplete = false;
                        break;
                    }
                    if (!obj.redreason) {
                        isComplete = false;
                        break;
                    }
                }
            }
            if (obj.specialtype === 'E04' && (obj.invoicetype === '08xdp' || obj.invoicetype === '10xdp')) {
                if (obj.freights.some(item => !item.transporttype || !item.licenseplate || !item.startplace ||!item.endplace || !item.transportgoods)) {
                    isComplete = false;
                    break;
                }
            }
            if (obj.specialtype === 'E05' && (obj.invoicetype === '08xdp' || obj.invoicetype === '10xdp')) {
                if (obj.cobuyers.some(item => !item.cobuyer || !item.cobuyercardno)) {
                    isComplete = false;
                    break;
                } 
                if (obj.estatesales.some(item => !item.saledetailaddress || (!item.salecrosscitysign && item.salecrosscitysign != 0))) {
                    isComplete = false;
                    break;
                } 
            }
        }
        const dom = $treatment_bill.find('.item').eq(index).find('.statu');
        if (isComplete) {
            if (!dom.hasClass('finished')) dom.addClass('finished').text('信息已补充');
        } else {
            if (dom.hasClass('finished')) dom.removeClass('finished').text('信息待补充');
        }
        updateTreatmentBill(index, 'isComplete', isComplete);
    }

    // 单据明细处理-单据信息完整度-初始时校验
    function testTreatmentBillFinishedByInit(index) {
        const invoiceList = treatmentShowBillList[index];
        const iselepaper = invoiceList.iselepaper;
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
            } else {
                // 负数票 购方名称与购方税号不允许修改
                // 专票
                if ((obj.invoicetype === '028' || obj.invoicetype === '004') && iselepaper != '1') {
                    if (!obj.buyeraddr) {
                        isComplete = false;
                        break;
                    }
                    if (!obj.buyerbank) {
                        isComplete = false;
                        break;
                    }
                    if (!obj.applicant) {
                        isComplete = false;
                        break;
                    }
                    // 销方申请
                    if (obj.applicant === '2') {
                        // 无红字信息编码并且有原发票代码号码日期 或者 有红字信息编码 就ok
                        if (!((!obj.infocode && obj.originalinvoicecode && obj.originalinvoiceno && obj.originalissuetime) || obj.infocode)) {
                            isComplete = false;
                            break;
                        }
                    }
                    // 购方申请
                    if (obj.applicant !== '2' && !obj.infocode) {
                        isComplete = false;
                        break;
                    }
                } else if (obj.invoicetype === '08xdp' || obj.invoicetype === '10xdp' || iselepaper == '1') {
                    // 数电
                    if (!obj.infocode) {
                        isComplete = false;
                        break;
                    }
                    if (!obj.originalinvoiceno) {
                        isComplete = false;
                        break;
                    }
                    if (!obj.redreason) {
                        isComplete = false;
                        break;
                    }
                    if (!obj.originalissuetime) {
                        isComplete = false;
                        break;
                    }
                } else {
                    if (!obj.originalinvoicecode) {
                        isComplete = false;
                        break;
                    }
                    if (!obj.originalinvoiceno) {
                        isComplete = false;
                        break;
                    }
                    if (!obj.originalinvoicetype) {
                        isComplete = false;
                        break;
                    }
                    if (!obj.originalissuetime) {
                        isComplete = false;
                        break;
                    }
                    if (!obj.redreason) {
                        isComplete = false;
                        break;
                    }
                }
            }
            if (obj.specialtype === 'E04' && (obj.invoicetype === '08xdp' || obj.invoicetype === '10xdp')) {
                if (obj.freights.some(item => !item.transporttype || !item.licenseplate || !item.startplace ||!item.endplace || !item.transportgoods)) {
                    isComplete = false;
                    break;
                }
            }
            if (obj.specialtype === 'E05' && (obj.invoicetype === '08xdp' || obj.invoicetype === '10xdp')) {
                if (obj.cobuyers.some(item => !item.cobuyer || !item.cobuyercardno)) {
                    isComplete = false;
                    break;
                } 
                if (obj.estatesales.some(item => !item.saledetailaddress || (!item.salecrosscitysign && item.salecrosscitysign != 0))) {
                    isComplete = false;
                    break;
                } 
            }
        }
        const dom = $treatment_bill.find('.item').eq(index).find('.statu');
        if (isComplete) {
            if (!dom.hasClass('finished')) dom.addClass('finished').text('信息已补充');
        } else {
            if (dom.hasClass('finished')) dom.removeClass('finished').text('信息待补充');
        }
        updateTreatmentBill(index, 'isComplete', isComplete);
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

        const tableDom = $(`#imc_invoicealleWorkbench_treatment_bill${id}`);

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
            issuetype: totalamount > 0 ? '0' : '1', // 0蓝票 1红票
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
            invoiceamount: invoice_hjbhsje.toFixed(2), //金额 计算
            totaltax: invoice_kphjse.toFixed(2), //税额 计算
            totalamount: invoice_jshjje.toFixed(2), //价税合计 计算
            items: _items,
            E03Data: obj.specialtype === 'E03' ? [{
                landtaxno: obj.landtaxno,
                buildingname: obj.buildingname,
                crosscitysign: obj.crosscitysign,
                simpleaddress_name: obj.simpleaddress_name,
                crosscitytaxverifyno: obj.crosscitytaxverifyno || ''
            }] : [],
            E06Data: obj.specialtype === 'E06' ? [{
                simpleaddress_name: obj.simpleaddress_name,
                startleasedate: obj.startleasedate,
                endleasedate: obj.endleasedate,
                crosscitysign: obj.crosscitysign,
                estateid: obj.estateid
            }] : []
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
        const tableDom = $(`#imc_invoicealleWorkbench_treatment_invoice${id}`).find('tbody').find('tr');

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
        const tableDom = $(`#imc_invoicealleWorkbench_treatment_invoice${id}`).find('tbody').find('tr');

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
        const tableDom = $(`#imc_invoicealleWorkbench_treatment_invoice${id}`).find('tbody').find('tr').eq(itemIndex);

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
            const tableDom = $(`#imc_invoicealleWorkbench_treatment_invoice${invoiceId}`).find('.workbench-table-tbody').find('tr');
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
        const { id: invoiceId } = invoiceList[invoiceIndex];
        const newFreights = cloneDeep(invoiceList[invoiceIndex]['freights']);
        if (newFreights.length === 1) {
            model.invoke("common/tip", '至少保留一行');
            return;
        }
        newFreights.splice(itemIndex, 1);
        invoiceList[invoiceIndex] = {
            ...invoiceList[invoiceIndex],
            freights: newFreights
        };
        // 删除html节点
        const tableDom = $(`#imc_invoicealleWorkbench_treatment_goodsTransport${invoiceId}`).find('.workbench-table-tbody').find('tr');
        tableDom.eq(itemIndex).remove();
        testTreatmentBillFinished(treatmentIndex);
    };

    // 发票预览
    function showPreview() {
        if (currentTab === 'negative') {
            showPreviewTable();
            return;
        }
        showPreviewBill();
        // showPreviewInvoice();
        showPreviewTable();
        model.invoke("preview/positive/queryInvoiceByBillId", treatmentShowBillList[0].id);
    }

    // 发票预览-单据
    function showPreviewBill() {
        const _html = [];
        for (let i = 0; i < treatmentShowBillList.length; i++) {
            const obj = treatmentShowBillList[i];
            const difference = fpy_Minus(obj.maintaxdeviation || 0, obj.adjustedData || 0);
            _html.push(`<div class="item ${i === previewIndex ? 'actived' : ''}">
                <div class="text truncateText">单据编号：<span class="primary" title="${obj.billno}">${obj.billno}</span></div>
                <div class="text">不含税金额：<span class="warning">${fpy_Minus(obj.invoiceamount, obj.adjustedData || 0).toFixed(2)}</span></div>
                <div class="text">税额：<span class="warning">${fpy_Add(obj.totaltax, obj.adjustedData || 0).toFixed(2)}</span></div>
                <div class="text">价税合计：<span class="warning">${Number(obj.totalamount).toFixed(2)}</span></div>
                ${difference != 0 ? `<div class="text">税额尾差：<span class="warning">${Number(difference).toFixed(2)}</span></div>` : ''}
            </div>`);
        }
        if (billPageInfo.totalPage > 1) {
            _html.push(`
                <div class="bill-loading">加载中...</div>
            `);
        }
        $preview_bill.html(_html.join(''));
    }

    // 发票预览-发票
    function showPreviewInvoice() {
        const curId = treatmentShowBillList[previewIndex].id;
        const invoiceList = modifyBillInvoiceList[curId] ? modifyBillInvoiceList[curId][curId] : treatmentInvoiceList[curId];
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
        const isSpecialE09 = obj.specialtype === 'E09';
        const isSpecialE07 = obj.specialtype === 'E07';
        const specialName = isSpecialE07 ? '--代收税船服务' : isSpecialE09 ? '--旅客运输服务' : isSpecialE03 ? '--建筑服务' : isSpecialE06 ? '--不动产经营租赁服务' : isSpecialE05 ? '--不动产销售服务' : isSpecialE04 ? '--货物运输服务' : isSpecialE01 ? '--成品油' : '';
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
        $preview_saler.find('.saleraddr').text(obj.saleraddr).prop('title', obj.saleraddr);
        $preview_saler.find('.salerbank').text(obj.salerbank).prop('title', obj.salerbank);
        
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
            // console.log('-----isSpecialE05-11111----', obj);
            let text_bz_E05 = '';
            for (let i = 0; i < obj.estatesales.length; i++) {
                const currentObj = obj.estatesales[i];
                text_bz_E05 += `<div><span>不动产信息${i + 1}：</span></div>
                <div><span style="color: #8d5505">不动产单元代码/网签合同备案编号: </span>${currentObj.saleestatecode}</div>
                <div><span style="color: #8d5505">不动产地址：</span>${currentObj.saleprincename}${currentObj.salecityname}${currentObj.saledetailaddress}</div>
                <div><span style="color: #8d5505">跨地（市）标志：</span>${currentObj.salecrosscitysign === '1' ? '是' : '否'}</div>
                <div><span style="color: #8d5505">土地增值税项目编号：</span>${currentObj.salelandtaxno}</div>
                <div><span style="color: #8d5505">核定计税价格：</span>${currentObj.assessmenttaxamount}</div>
                <div><span style="color: #8d5505">实际成交含税金额：</span>${currentObj.actualtotalamount}</div>`;
            }
            if (obj.cobuyerflag === '1') {
                for (let j = 0; j < obj.cobuyers.length; j++) {
                    const currentBuyerObj = obj.cobuyers[j];
                    text_bz_E05 += `<div><span style="color: #8d5505">共同购买方: </span>${currentBuyerObj.cobuyer}</div>
                    <div><span style="color: #8d5505">证件类型：</span>${FPY_SALE_ESTATE_CARD_TYPE[currentBuyerObj.cobuyercardtype]}</div>
                    <div><span style="color: #8d5505">证件号码：</span>${currentBuyerObj.cobuyercardno}</div>`;
                }
            } 
            text_bz_E05 += `<div>${obj.remark.replaceAll('\r\n', '\n').replaceAll('\n', '<br/>')}</div>`;
            $preview_bz.html(text_bz_E05);
        } else if (isSpecialE07) {
            let text_bz_E07 = '';
            const nextVehichevesselships = obj.vehichevesselships || [];
            for (let i = 0; i < nextVehichevesselships.length; i++) {
                const currentObj = nextVehichevesselships[i];
                text_bz_E07 += `<div><span style="color: #8d5505">保险单号: </span>${currentObj.policyno}</div>
                <div><span style="color: #8d5505">车牌号/船舶登记号：</span>${currentObj.shipsno}</div>
                <div><span style="color: #8d5505">税款所属期：</span>${currentObj.perioddate}</div>
                <div><span style="color: #8d5505">车架号：</span>${currentObj.vehiclecode}</div>
                <div><span style="color: #8d5505">代收车船税金额：</span>${currentObj.vehiclevesselamount}</div>
                <div><span style="color: #8d5505">滞纳金金额：</span>${currentObj.vehiclelateamount}</div>
                <div><span style="color: #8d5505">金额合计：</span>${currentObj.vehicletotalamount}</div>`;
            }
            text_bz_E07 += `<div>${obj.remark.replaceAll('\r\n', '\n').replaceAll('\n', '<br/>')}</div>`;
            $preview_bz.html(text_bz_E07);
        } else {
            $preview_bz.html(
                obj.totalamount < 0 && (obj.invoicetype === '028' || obj.invoicetype === '004') ?
                `<div>${obj?.applyreason?.replaceAll('\r\n', '\n').replaceAll('\n', '<br/>') || ''}</div>` :
                `<div>${obj?.remark?.replaceAll('\r\n', '\n').replaceAll('\n', '<br/>') || ''}</div>`);
        }
        $preview_item.eq(3).css({ display: isSpecialE03 ? 'none' : '' });
        $preview_item.eq(4).css({ display: isSpecialE03 ? 'none' : '' });
        $preview_item.eq(1).text(`${isSpecialE06 || isSpecialE05 ? '产权证书/不动产权证号' : isSpecialE03 ? '建筑服务发生地' : '规格型号'}`);
        if (isSpecialE03) {
            $preview_item.eq(1).css({ width: '220px' });
        } else if (isSpecialE06) {
            $preview_item.eq(1).css({ width: '130px' });
        } else {
            $preview_item.eq(1).css({ width: '' });
        }
        $preview_item.eq(2).text(`${isSpecialE06 || isSpecialE05 ? '面积单位' : isSpecialE03 ? '建筑项目名称' : '单位'}`);
        $preview_item.eq(4).text(`单价（不含税）`);
        $preview_item.eq(5).text(`金额（不含税）`);
        const _html = [];
        const transportHtml = [];
        const travelHtml = [];
        let discountLineCount = 0;
        for (let i = 0; i < obj.items.length; i++) {
            const cur = obj.items[i];
            if (cur.rowtype === '1') {
                discountLineCount = discountLineCount + 1;
            }
            const xmsl = cur.num ? fpy_toFixedNoZero(cur.num) : '';
            let xmdj = cur.unitprice;
            xmdj = xmdj && xmdj != '0' ? fpy_toFixedTwoOrMore_dj(xmdj) : '';
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
                        `<div class="item truncateText" title="${obj.estateid}">${cur.rowtype === '1' ? '' : obj.estatesales && obj.estatesales.length ? obj.estatesales[i - discountLineCount].saleestateid : obj.estateid}</div>
                        <div class="item truncateText" title="${obj.areaunit}">${cur.rowtype === '1' ? '' : obj.estatesales && obj.estatesales.length ? obj.estatesales[i - discountLineCount].saleunit : obj.areaunit}</div>`
                    ) : (cur.rowtype === '1' || hidePreback ? (
                        `<div class="item truncateText" title="${cur.specification}">${cur.specification}</div>
                        <div class="item truncateText" title="${cur.unit}">${cur.unit}</div>`
                    ) : (
                        // `<div class="item">
                        //     <input class="searchInput" type="text" maxlength="40" name="specification" value="${cur.specification}" title="${cur.specification}" ${previewDataSave ? 'disabled' : ''} autocomplete="off" />
                        // </div>
                        // <div class="item">
                        //     <input class="searchInput" type="text" maxlength="40" name="unit" value="${cur.unit}" title="${cur.unit}" ${previewDataSave ? 'disabled' : ''} autocomplete="off" />
                        // </div>`
                        `<div class="item truncateText" title="${cur.specification}">${cur.specification}</div>
                        <div class="item truncateText" title="${cur.unit}">${cur.unit}</div>`
                    ))
                }
                ${isSpecialE03 ? '' : (
                    `<div class="item truncateText" title="${xmsl}">${xmsl}</div>
                    <div class="item truncateText" title="${xmdj}">${xmdj}</div>`
                )}
                <div class="item truncateText" title="${xmje}">${xmje}</div>
                <div class="item truncateText sl" title="${sl}">${sl}</div>
                <div class="item truncateText" title="${se}">${se}</div>
            </div>`);
        }
        // 非货物运输不展示
        if (!isSpecialE04) {
            $preview_transportLine.css({ display: 'none' });
        } else {
            $preview_transportLine.css({ display: 'block' });
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
        // 非旅客运输不展示
        if (!isSpecialE09) {
            $preview_travelLine.css({ display: 'none' });
        } else {
            $preview_travelLine.css({ display: 'block' });
        }
        // console.log('------isSpecialE09--1--', obj?.travelers?.length);
        if (obj?.travelers?.length) {
            for (let i = 0; i < obj.travelers.length; i++) {
                const cur = obj.travelers[i];
                const travelerList = FPY_TRAVELER_LIST;
                const cardTypeList = travelerList.cardTypeList || [];
                const transportTypeList = travelerList.transportTypeList || [];
                const seatClassList = travelerList.seatClassList || [];
                const travelercardtypeObj = cardTypeList.filter(o => o.value == cur.travelercardtype) || [{}];
                const travelertransporttypeObj = transportTypeList.filter(o => o.value == cur.travelertransporttype) || [{}];
                const travelerseatclassObj = seatClassList.filter(o => o.value == cur.travelerseatclass) || [{}];
                travelHtml.push(`<div class="line">
                    <div class="item truncateText" title="${cur.traveler}">${cur.traveler}</div>
                    <div class="item truncateText" title="${travelercardtypeObj[0].text}">${travelercardtypeObj[0].text}</div>
                    <div class="item truncateText" title="${cur.travelercardno}">${cur.travelercardno}</div>
                    <div class="item truncateText" title="${cur.traveldate}">${cur.traveldate}</div>
                    <div class="item truncateText" title="${cur.travelerstartplace}">${cur.travelerstartplace}</div>
                    <div class="item truncateText" title="${cur.travelerendplace}">${cur.travelerendplace}</div>
                    <div class="item truncateText" title="${travelertransporttypeObj[0].text}">${travelertransporttypeObj[0].text}</div>
                    <div class="item truncateText" title="${travelerseatclassObj[0].text}">${travelerseatclassObj[0].text}</div>
                </div>`);
            }
        }
        

        $preview_detail.html(_html.join(''));
        $preview_transportDetail.html(transportHtml.join(''));
        $preview_travelDetail.html(travelHtml.join(''));
        $preview_operator.eq(0).text(obj.payee);
        $preview_operator.eq(1).text(obj.reviewer);
        $preview_operator.eq(2).text(obj.drawer);
    }

    // 发票预览-负数列表
    function showPreviewTable() {
        const { pageIndex, total, totalPage } = previewNegativePageInfo;
        fpyTable.init({
            id: 'imc_invoicealleWorkbench_preview_table',
            rowKey,
            columns: [
                {
                    title: '序号',
                    width: 40,
                    render: () => '<span class="order"><span>'
                },
                {
                    align: 'left',
                    title: '申请单编码',
                    dataIndex: 'billno',
                    ellipsis: true,
                    width: 120
                },
                {
                    title: '销方名称',
                    dataIndex: 'salername',
                    width: 80,
                    ellipsis: true,
                    render: (t) => t || ''
                },
                {
                    title: '购方名称',
                    dataIndex: 'buyername',
                    ellipsis: true,
                    width: 100
                },
                {
                    title: '发票种类',
                    dataIndex: 'invoicetype',
                    width: 100,
                    ellipsis: true,
                    render: (t) => t || ''
                },
                {
                    title: '申请红冲类型',
                    dataIndex: 'redreason',
                    width: 100,
                    ellipsis: true,
                    render: (t) => t || ''
                },
                {
                    title: '申请红冲金额',
                    dataIndex: 'applyamount',
                    width: 90,
                    render: t => Number(t).toFixed(2)
                },
                {
                    title: '状态',
                    dataIndex: 'confirmstatus',
                    width: 80,
                    ellipsis: true,
                    render: (t) => `
                        <div style="color: ${t ? confirmstatusList[t].color : '#666'}">${t ? confirmstatusList[t].name : '--'}</div>
                    `
                },
                {
                    title: '录入方',
                    dataIndex: 'enteridentity',
                    width: 80,
                    ellipsis: true,
                    render: t => t === '0' ? "销方录入" : "购方录入"
                },
                {
                    title: '红字确认单号',
                    dataIndex: 'number',
                    width: 80,
                    ellipsis: true,
                    render: (t) => t || ''
                },
                {
                    title: '原蓝票号码',
                    dataIndex: 'originalinvoiceno',
                    width: 100,
                    ellipsis: true,
                    render: (t) => t || ''
                },
                {
                    title: '异常原因',
                    dataIndex: 'failreason',
                    width: 80,
                    render: (t) =>  t ? `<div class='table-warn'>
                        <div class='table-icon'></div>
                        <div class='table-pop'>
                            <div class='table-mask'></div>
                            <div class='table-content'>${t}</div>
                        </div>
                    </div>` : ''
                }
            ],
            scroll: previewTableDataSource.length > 12 ? { y: 400 } : {},
            dataSource: previewTableDataSource,
            selectedRowKeys: previewSelectedRowKeys,
            pagination: {
                pageIndex,
                total,
                totalPage
            },
            columnIndex: 2,
            allChecked: previewNegativeAllData
        });
        
        // 默认全选所有数据
        const dom = $('#imc_invoicealleWorkbench_preview_table');
        dom.find('input[data-type=all]').prop('checked', previewTableDataSource.every(item => previewSelectedRowKeys.some(i => i === item.id)));
        dom.find('input[data-type=allData]').prop('checked', previewSelectedRowKeys.length === total);
    }

    // 发票预览-更新明细
    function previewChangeItem(name, value, itemIndex) {
        const invoiceList = treatmentInvoiceList[treatmentShowBillList[previewIndex].id];
        const { items } = invoiceList[previewInvoiceIndex];
        items[itemIndex][name] = value;
    }

    // 发票预览-根据名称税收分类编码同步明细
    function previewSyncItem(name, itemIndex) {
        const invoiceList = treatmentInvoiceList[treatmentShowBillList[previewIndex].id];
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
        const invoiceList = treatmentInvoiceList[treatmentShowBillList[previewIndex].id];
        invoiceList[previewInvoiceIndex][name] = value;
    }

    // 发票预览-同步发票地址电话
    function previewSyncInvoiceSale(name = '') {
        const invoiceList = treatmentInvoiceList[treatmentShowBillList[previewIndex].id];
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
        $head_tab.css({ display: '' });
        $head.css({ display: '' });
        let curResultList = currentTab === 'positive' ? resultList : negativeResultList;
        let curIsComplete = currentTab === 'positive' ? resultIsComplete : negativeResultIsComplete;
        // 开票中显示
        $result_detail.show();
        if (curIsComplete && curResultList.length > 0) {
            $result_detail.hide();
            $result_progress.hide();
        } else {
            $result_progress.show();
        }
        // 先渲染一次页面
        showProgressTable();
    }

    // 开票结果-进度条Table
    function showProgressTable() {
        let curResultList = currentTab === 'positive' ? resultList : negativeResultList;
        let curResultTotal = currentTab === 'positive' ? resultTotal : negativeResultTotal;
        let curIsComplete = currentTab === 'positive' ? resultIsComplete : negativeResultIsComplete;
        // 已开具
        const openedList = curResultList.filter(o => o.issuestatus === '0');
        let openedLength = openedList.length;
        openedLength = openedLength >= curResultTotal ? curResultTotal : openedLength;
        // 更新进度条
        const percent = (openedLength / curResultTotal * 100).toFixed(2) + '%';
        $result_progress_percent.css({ width: percent });

        const failList = curResultList.filter(o => o.issuestatus === '3');
        $result_progress_text.text(`共${curResultTotal}张发票，已开具${openedLength}张，失败${failList.length}张，剩余${curResultTotal - openedLength}张`);
        fpyTable.init({
            id: 'imc_invoicealleWorkbench_detail_table',
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
                // {
                //     align: 'left',
                //     title: '发票代码',
                //     dataIndex: 'invoicecode',
                //     ellipsis: true,
                //     width: 70
                // },
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
                            `<span class="${r.issuestatus === '1' ? 'primary' : r.issuestatus === '3' ? 'error' : ''}" title="${r.issuestatus === '1' ? '开票处理中，请稍后至开票申请单列表查看开票结果' : t}">
                                ${r.issuestatus === '1' ? '开票处理中，请稍后至开票申请单列表查看开票结果' : t}
                            </span>`
                        );
                    }
                }
            ],
            scroll: curResultList.length > 15 ? { y: 365 } : {},
            dataSource: curResultList,
            headerColor: '#666',
            headerBgColor: '#eee',
            rowHeight: 26
        });

        // 判断是否开票完成
        if (curIsComplete) {
            setTimeout(() => {
                $result_progress.hide();
                $result_detail.hide();

                const successList = curResultList.filter(o => o.issuestatus !== '3');
                showClassTable(failList, successList);
            }, 300);
        } else {
            resultQueryByTimer(resultOpenType);
        }
    }

    // 开票结果-结果分类
    function resultClass() {
        let curResultList = currentTab === 'positive' ? resultList : negativeResultList;
        let curIsComplete = currentTab === 'positive' ? resultIsComplete : negativeResultIsComplete;
        if (resultOpenType === 'normal') {
            showProgressTable();
        } else {
            const failList = curResultList.filter(o => o.issuestatus === '3' || o.issuestatus === '1');
            const successList = curResultList.filter(o => !(o.issuestatus === '3' || o.issuestatus === '1'));
            const paperInvoiceList = successList.filter(o => o.issuestatus === '0' && (o.invoicetype === '007' || o.invoicetype === '004'));
            const hasPaperInvoiceNoPrint = paperInvoiceList.some(o => o.printflag !== '1');
            if (curIsComplete) {
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
                id: 'imc_invoicealleWorkbench_fail_table',
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
                                `<span class="${r.issuestatus === '1' ? 'primary' : r.issuestatus === '3' ? 'error' : ''}" title="${r.issuestatus === '1' ? '开票处理中，请稍后至开票申请单列表查看开票结果' : t}">
                                    ${r.issuestatus === '1' ? '开票处理中，请稍后至开票申请单列表查看开票结果' : t}
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
                id: 'imc_invoicealleWorkbench_success_table',
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
                    // {
                    //     align: 'center',
                    //     title: '发票代码',
                    //     dataIndex: 'invoicecode',
                    //     ellipsis: true,
                    //     width: 70
                    // },
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

    // 开票结果-查询
    function resultQueryByTimer(type = 'normal') {
        // 是否处理完成
        if (currentTab === 'positive') {
            resultIsComplete = false;
        } else {
            negativeResultIsComplete = false;
        }
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
            if (currentTab === 'positive') {
                model.invoke("result/positive/showDetail", request);
            } else {
                model.invoke("result/negative/showDetail", request);
            }
        }, 3000);
    };

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

    // 开票申请单-回车搜索
    $bill.on('keypress', '.pressEnter', function(event) {
        if (event.keyCode === 13) showBillTable();
    });

    // 开票申请单-下拉选择
    $bill.on('change', '.searchForm select', function() {
        const name = $(this).prop('name');
        const value = $(this).val();
        billParam[name] = value;
        if (name === 'mergeRuleId') model.invoke("bill/changeMergeRule", value);
    });

    // 开票申请单-查询
    $bill.on('click', '.searchForm .btn', function() {
        const { billNo, buyerName, pageIndex, pageSize } = billParam;
        model.invoke('bill/queryBill', { billno: billNo, buyername: buyerName, pageIndex, pageSize });
    });

    // 开票申请单-明细table点击
    $bill_table.on('click', 'tbody tr', function(e) {
        if ($(e.target).is('a')) {
            const key = $(e.target).attr('data-key');
            const name = $(e.target).attr('data-name');
            const totalamount = $(e.target).attr('data-total');
            const itemCount = $(e.target).attr('data-count');
            switch (name) {
            case 'detail':
                model.invoke("bill/showOriginalBill", key);
                break;
            case 'del':
                model.invoke("bill/removeBill", { id: key, totalamount: totalamount, itemcount: itemCount });
                break;
            default:
                break;
            }
        }
    });

    // 明细处理-负数单据table
    $treatment_negative.on('click', 'tbody tr', function(e) {
        if ($(e.target).is('a')) {
            const id = $(e.target).attr('data-id');
            const name = $(e.target).attr('data-name');
            switch (name) {
            case 'edit':
                model.invoke("process/negative/modifyMatchBill", id);
                break;
            case 'match':
                negativeOpenKey = negativeOpenKey === id ? '' : id;
                showTreatmentNegativeTable();
                break
            default:
                break;
            }
        }
    });

    // 开票申请单-分页
    $bill_table.on('click', '.workbench-table-pagination div', function(e) {
        const id = $(e.target).attr('data-id');
        const key = $(e.target).attr('data-key');
        if (id === 'imc_invoicealleWorkbench_bill_table') {
            const { pageIndex, totalPage, pageSize, billNo, buyerName } = billParam;
            let curPageIndex = pageIndex;
            if (key === 'first') {
                curPageIndex = 1;
            } else if (key === 'pre') {
                curPageIndex = pageIndex - 1 <= 0 ? 1 : pageIndex - 1;
            } else if (key === 'next') {
                curPageIndex = pageIndex + 1 >= totalPage ? totalPage : pageIndex + 1;
            } else if (key === 'last') {
                curPageIndex = totalPage;
            }
            billParam.pageIndex = curPageIndex;
            model.invoke('bill/queryBill', { billno: billNo, buyername: buyerName, pageIndex: curPageIndex, pageSize });
        }
    });

     // 开票申请单-分页
     $bill_table.on('keypress', 'input[name=pageIndex]', function(e) {
        if (e.keyCode === 13) {
            let value = $(this).val().trim();
            const { pageIndex, totalPage, pageSize, billNo, buyerName } = billParam;
            if (isNaN(value)) {
                value = pageIndex;
                $bill_table.find(`input[name=pageIndex]`).val(pageIndex);
                return;
            }
            if (value <= 1) {
                value = 1;
            }
            if (value >= totalPage) {
                value = totalPage;
            }
            billParam.pageIndex = value;
            model.invoke('bill/queryBill', { billno: billNo, buyername: buyerName, pageIndex: value, pageSize });
        }
    });

    // 单据明细处理-负数分页
    $treatment_negative.on('click', '.workbench-table-pagination div', function(e) {
        const id = $(e.target).attr('data-id');
        const key = $(e.target).attr('data-key');
        if (id === 'imc_invoicealleWorkbench_negative_table') {
            const { pageIndex, totalPage, pageSize } = negativePageInfo;
            let curPageIndex = pageIndex;
            if (key === 'first') {
                curPageIndex = 1;
            } else if (key === 'pre') {
                curPageIndex = pageIndex - 1 <= 0 ? 1 : pageIndex - 1;
            } else if (key === 'next') {
                curPageIndex = pageIndex + 1 >= totalPage ? totalPage : pageIndex + 1;
            } else if (key === 'last') {
                curPageIndex = totalPage;
            }
            negativePageInfo.pageIndex = curPageIndex;
            model.invoke('process/negative/queryNegativeBill', { pageIndex: curPageIndex, pageSize });
        }
    });

     // 单据明细处理-负数分页
     $treatment_negative.on('keypress', 'input[name=pageIndex]', function(e) {
        if (e.keyCode === 13) {
            let value = $(this).val().trim();
            const { pageIndex, totalPage, pageSize } = negativePageInfo;
            if (isNaN(value)) {
                value = pageIndex;
                $treatment_negative.find(`input[name=pageIndex]`).val(pageIndex);
                return;
            }
            if (value <= 1) {
                value = 1;
            }
            if (value >= totalPage) {
                value = totalPage;
            }
            negativePageInfo.pageIndex = value;
            model.invoke('process/negative/queryNegativeBill', { pageIndex: value, pageSize });
        }
    });

    // 发票预览-负数分页
    $preview_table.on('click', '.workbench-table-pagination div', function(e) {
        const id = $(e.target).attr('data-id');
        const key = $(e.target).attr('data-key');
        if (id === 'imc_invoicealleWorkbench_preview_table') {
            const { pageIndex, totalPage, pageSize } = previewNegativePageInfo;
            let curPageIndex = pageIndex;
            if (key === 'first') {
                curPageIndex = 1;
            } else if (key === 'pre') {
                curPageIndex = pageIndex - 1 <= 0 ? 1 : pageIndex - 1;
            } else if (key === 'next') {
                curPageIndex = pageIndex + 1 >= totalPage ? totalPage : pageIndex + 1;
            } else if (key === 'last') {
                curPageIndex = totalPage;
            }
            previewNegativePageInfo.pageIndex = curPageIndex;
            model.invoke('preview/negative/queryNegativeBill', { pageIndex: curPageIndex, pageSize });
        }
    });

    // 发票预览-负数分页
    $preview_table.on('keypress', 'input[name=pageIndex]', function(e) {
        if (e.keyCode === 13) {
            let value = $(this).val().trim();
            const { pageIndex, totalPage, pageSize } = previewNegativePageInfo;
            if (isNaN(value)) {
                value = pageIndex;
                $treatment_negative.find(`input[name=pageIndex]`).val(pageIndex);
                return;
            }
            if (value <= 1) {
                value = 1;
            }
            if (value >= totalPage) {
                value = totalPage;
            }
            previewNegativePageInfo.pageIndex = value;
            model.invoke('preview/negative/queryNegativeBill', { pageIndex: value, pageSize });
        }
    });


    // 单据明细处理-选择单据 确认选取 复选框
    // 为兼容js单线程无法同事触发blur与click事件，改用mouseup
    $treatment_bill.on('mouseup', '.item', function(e) {
        const index = $(this).index();
        if (index !== treatmentIndex) {
            treatmentIndex = index;
            $treatment_bill.find('.item').removeClass('actived').eq(index).addClass('actived');
            const curBillId = treatmentShowBillList[index].id;

            // 若有缓存取缓存，没缓存查询
            if (modifyBillInvoiceList[curBillId]) {
                treatmentInvoiceList = modifyBillInvoiceList[curBillId];
                initTreatmentInvoiceListSetMap(treatmentInvoiceList);
                showTreatmentInvoice();
            } else {
                model.invoke("process/positive/queryInvoiceByBillId", curBillId);
            }
            showTreatmentSolutions();
        }
        if ($(e.target).hasClass('sure')) {
            const disabled = $(e.target).hasClass('disabled');
            if (!disabled) confirmSelectTreatmentRemainingItems();
        } else if ($(e.target).is('input')) {
            const billId = treatmentShowBillList[treatmentIndex].id;
            let selectedRowKeys = treatmentRemainingItems[billId].selectedRowKeys;
            const remainingItems = treatmentRemainingItems[billId].items;
            const type = $(e.target).attr('data-type');
            // click事件中checked是点击后的状态 mousedown事件与mouseup事件中checked是点击前的状态
            const checked = !$(e.target).is(':checked');
            const disabled = $(e.target).prop('disabled');
            const itemIndex = $(e.target).parents('tr').index();
            if (!disabled) {
                const dom = $('#imc_invoicealleWorkbench_treatment_bill' + billId);
                // 复选框
                let keys = [];
                if (type === 'all') {
                    if (checked) {
                        selectedRowKeys = remainingItems.map((o, i) => {
                            if (!selectedRowKeys.includes(o[rowKey])) keys.push(i);
                            return o[rowKey];
                        });
                    } else {
                        selectedRowKeys = remainingItems.filter((o, i) => {
                            if (o.remainvalidamount != 0 && selectedRowKeys.includes(o[rowKey])) keys.push(i);
                            return o.remainvalidamount == 0;
                        }).map(o => o[rowKey]);
                    }
                } else {
                    if (checked) {
                        selectedRowKeys.push(remainingItems[itemIndex][rowKey]);
                    } else {
                        const cur = selectedRowKeys.indexOf(remainingItems[itemIndex][rowKey]);
                        selectedRowKeys.splice(cur, 1);
                    }
                    // 判断是否有折扣行
                    const discountLine = remainingItems[itemIndex + 1];
                    if (discountLine && discountLine.rowtype === '1') {
                        const itemId = remainingItems[itemIndex + 1][rowKey];
                        if (checked) {
                            selectedRowKeys.push(itemId);
                        } else {
                            const cur = selectedRowKeys.indexOf(itemId);
                            selectedRowKeys.splice(cur, 1);
                        }
                        $(e.target).parents('tr').next().find('input').prop('checked', checked);
                    }
                    dom.find('input[data-type=all]').prop('checked', selectedRowKeys.length === remainingItems.length);
                }
                treatmentRemainingItems[billId].selectedRowKeys = selectedRowKeys;

                // 全选更新勾选状态
                if (type === 'all') {
                    // 待更新明细数量
                    if (keys.length <= 300) {
                        const inputDom = dom.find('input[data-type!=all]');
                        for (let i of keys) {
                            inputDom.eq(i).prop('checked', checked);
                        }
                    } else {
                        updateTreatmentBillTableByIndex(treatmentIndex, true);
                    }
                }

                const confirmAllow = selectedRowKeys.some(key => {
                    const curItem = remainingItems.find(o => o.id === key);
                    return curItem.remainvalidamount != 0;
                });
                const sureDom = $(this).find('.sure');
                if (confirmAllow) {
                    if (sureDom.hasClass('disabled')) sureDom.removeClass('disabled');
                } else {
                    if (!sureDom.hasClass('disabled')) sureDom.addClass('disabled');
                }
            }
        }
    });

    // 单据明细处理-监听单据滚动
    $treatment_bill.on('scroll', function(e) {
        if($treatment_bill.scrollTop() + $treatment_bill.innerHeight() >= $treatment_bill.prop('scrollHeight')) {
            if (billPageInfo.pageIndex < billPageInfo.totalPage) {
                // 加载数据
                model.invoke("process/positive/queryPositiveBill", {
                    pageIndex: billPageInfo.pageIndex + 1,
                    pageSize: billPageInfo.pageSize
                });
            } else {
                $treatment_bill.find('.bill-loading').text('加载完成');
                // 加载完成
            }
        }
    });

    // 单据明细处理-负数列表勾选事件
    $treatment_negative.on('click', 'tr', function(e) {
        const type = $(e.target).attr('data-type');
        const checked = $(e.target).is(':checked');
        const itemIndex = $(e.target).parents('tr').index();
        const dom = $('#imc_invoicealleWorkbench_negative_table');
        if ($(e.target).is('input')) {
            // 复选框
            let keys = [];
            if (type === 'all') {
                if (checked) {
                    negativeSelectedRowKeys = treatmentNegativeList.map((o, i) => {
                        if (!negativeSelectedRowKeys.includes(o.id)) keys.push(i);
                        return o.id;
                    });
                } else {
                    negativeSelectedRowKeys = treatmentNegativeList.filter((o, i) => {
                        if (negativeSelectedRowKeys.includes(o.id)) keys.push(i);
                        return o.remainvalidamount == 0;
                    }).map(o => o.id);
                    negativeAllData = false;
                    dom.find('input[data-type=allData]').prop('checked', false);
                }
            } else {
                if (checked) {
                    negativeSelectedRowKeys.push(treatmentNegativeList[itemIndex].id);
                } else {
                    const cur = negativeSelectedRowKeys.indexOf(treatmentNegativeList[itemIndex].id);
                    negativeSelectedRowKeys.splice(cur, 1);
                    negativeAllData = false;
                    dom.find('input[data-type=allData]').prop('checked', false);
                }
                dom.find('input[data-type=all]').prop('checked', treatmentNegativeList.every(item => negativeSelectedRowKeys.some(i => i === item.id)));
            } 
            
            // 全选更新勾选状态
            if (type === 'all') {
                const inputDom = dom.find('input[data-type!=all]').filter('input[data-type!=allData]');
                for (let i of keys) {
                    inputDom.eq(i).prop('checked', checked);
                }
            }
            dom.find('input[data-type=allData]').prop('checked', negativeSelectedRowKeys.length === negativePageInfo.total);
        }
    });

    // 单据明细处理-负数列表勾选全部数据
    $treatment_negative.on('click', '.page-header', function(e) {
        const checked = $(e.target).is(':checked');
        const dom = $('#imc_invoicealleWorkbench_negative_table');
        if ($(e.target).is('input')) {
            if (checked) {
                model.invoke('process/negative/selectAll');
            } else {
                negativeSelectedRowKeys = [];
            }
            negativeAllData = checked;
            const inputDom = dom.find('input[type="checkbox"]');
            inputDom.prop('checked', checked);
        }
    });

    // 预览页面-负数列表勾选事件
    $preview_table.on('click', 'tr', function(e) {
        const type = $(e.target).attr('data-type');
        const checked = $(e.target).is(':checked');
        const itemIndex = $(e.target).parents('tr').index();
        const dom = $('#imc_invoicealleWorkbench_preview_table');
        if ($(e.target).is('input')) {
            // 复选框
            let keys = [];
            if (type === 'all') {
                if (checked) {
                    previewSelectedRowKeys = previewTableDataSource.map((o, i) => {
                        if (!previewSelectedRowKeys.includes(o.id)) keys.push(i);
                        return o.id;
                    });
                } else {
                    previewSelectedRowKeys = previewTableDataSource.filter((o, i) => {
                        if (previewSelectedRowKeys.includes(o.id)) keys.push(i);
                        return o.remainvalidamount == 0;
                    }).map(o => o.id);
                    previewNegativeAllData = false;
                    dom.find('input[data-type=allData]').prop('checked', false);
                }
            } else {
                if (checked) {
                    previewSelectedRowKeys.push(previewTableDataSource[itemIndex].id);
                } else {
                    const cur = previewSelectedRowKeys.indexOf(previewTableDataSource[itemIndex].id);
                    previewSelectedRowKeys.splice(cur, 1);
                    previewNegativeAllData = false;
                    dom.find('input[data-type=allData]').prop('checked', false);
                }
                dom.find('input[data-type=all]').prop('checked', previewTableDataSource.every(item => previewSelectedRowKeys.some(i => i === item.id)));
            } 
            
            // 全选更新勾选状态
            if (type === 'all') {
                const inputDom = dom.find('input[data-type!=all]').filter('input[data-type!=allData]');
                for (let i of keys) {
                    inputDom.eq(i).prop('checked', checked);
                }
            }
        }
        dom.find('input[data-type=allData]').prop('checked', previewSelectedRowKeys.length === previewNegativePageInfo.total);
    });

    // 预览页面-负数列表勾选全部数据
    $preview_table.on('click', '.page-header', function(e) {
        const checked = $(e.target).is(':checked');
        const dom = $('#imc_invoicealleWorkbench_preview_table');
        if ($(e.target).is('input')) {
            if (checked) {
                model.invoke('preview/negative/selectAll');
            } else {
                previewSelectedRowKeys = [];
            }
            previewNegativeAllData = checked;
            const inputDom = dom.find('input[type="checkbox"]');
            inputDom.prop('checked', checked);
        }
    });

    // 发票预览-负数单据table
    $preview_table.on('mouseover mouseout', '.table-icon', function(e) {
        const itemIndex = $(e.target).parents('tr').index();
        if (e.type === 'mouseover') {
            $preview_table.find('.table-pop').eq(itemIndex).show();
        } else if (e.type === 'mouseout') {
            $preview_table.find('.table-pop').eq(itemIndex).hide();
        }
    });

    // 头部-切换tab
    $head_tab.on('click', '.treatment-tab-item', function(e) {
        const tab = $(this).attr('data-tab');
        if (currentTab === tab) {
            return;
        }
        model.invoke("common/changeTab", { tab, currentDisplay: curIndex });
    });

    // 单据明细处理-拆分方案更多
    $treatment_solutions.on('mouseover mouseout', '.more', function(e) {
        if (e.type === 'mouseover') {
            if (!$(this).find('.btn').hasClass('disabled')) $(this).find('.more-pop').show();
        } else if (e.type === 'mouseout') {
            $(this).find('.more-pop').hide();
        }
    });

    // 单据明细处理-负数匹配方案更多
    $treatment_negative_solutions.on('mouseover mouseout', '.more', function(e) {
        if (e.type === 'mouseover') {
            $(this).find('.more-pop').show();
        } else if (e.type === 'mouseout') {
            $(this).find('.more-pop').hide();
        }
    });

    // 单据明细处理-负数匹配方案
    $treatment_negative_solutions.on('click', '.solutions-item', function() {
        const key = $(this).attr('data-key');
        const ruleCode = $(this).attr('data-id');
        negativeRules = {
            blue: key === 'blue' ? ruleCode : negativeRules.blue,
            red: key === 'red' ? ruleCode : negativeRules.red
        };
        showTreatmentNegativeRules();
    });

    // 单据明细处理-拆分方案切换 按明细拆分需单独判断是否可以切换
    $treatment_solutions.on('click', '.solutions-item', function() {
        const disabled = $(this).hasClass('disabled');
        const ruleCode = $(this).attr('data-id');
        // const { taxationstyle } = treatmentShowBillList[treatmentIndex];
        if (!disabled) {
            const id = treatmentShowBillList[treatmentIndex].id;
            // if (ruleCode === IMC_SPLIT_BY_DETAIL) {
            //     // 不支持差额单据
            //     if (treatmentShowBillList[treatmentIndex].deduction) {
            //         // common/tip
            //         model.invoke("common/tip", '按明细拆分不支持含有差额的单据！');
            //         return;
            //     }
            //     if (taxationstyle === '01' || taxationstyle === '02') {
            //         // common/tip
            //         model.invoke("common/tip", '按明细拆分不支持含有差额的单据！');
            //         return;
            //     }
            //     // 数电发票特殊行业只支持不拆分
            //     const isSpecial = $(this).attr('data-isSpecial');
            //     if (isSpecial === 'true') {
            //         model.invoke("common/tip", '数电票特殊行业只支持不拆分');
            //         return;
            //     }
            //     model.invoke("process/queryMergeDeviation", id);
            // } else {
            var request = {
                id,
                ruleCode,
                ruleName: $(this).html(),
                jqbh: billParam.deviceNo,
                terminalNo: billParam.terminalNo,
                billNoMap
            };
            model.invoke("process/positive/changeSplitRule", request);
            // }
        }
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

        if (name === "cobuyer" || name === "cobuyercardno" || name ==="saledetailaddress" || name === "saleestateid") { // 不动产销售
            updateTreatmentSaleestate(invoiceIndex, name, value, itemIndex, maxlength);
        } else if (name === 'licenseplate' || name === 'startplace' || name === 'endplace' || name === 'transportgoods') { // 非明细数量，税额，价税合计输入
            // $(this).val(value);
            updateTreatmentTransport(invoiceIndex, name, value, itemIndex);
        } else if (!(name === 'num' || name === 'tax' || name === 'taxamount')) {
            $(this).val(value);
            updateTreatmentInvoice(invoiceIndex, name, value);
        }
    });

    // 单据明细处理-input[type=text]双击处理
    $treatment_invoice.on('dblclick', 'input[type="text"]', function() {
        const invoiceIndex = $(this).parents('.item').index();
        const itemIndex = $(this).parents('tr').index();
        const name = $(this).prop('name');
        if (name === 'startplace' || name === 'endplace') {
            model.invoke("process/positive/queryPlace", {
                invoiceIndex,
                itemIndex,
                name
            });
        }
    });

    // 单据明细处理-input[type=text]回车
    $treatment_invoice.on('keypress', 'input[type="text"]', function(event) {
        const invoiceIndex = $(this).parents('.item').index();
        const itemIndex = $(this).parents('tr').index();
        const name = $(this).prop('name');
        if (event.keyCode === 13 && (name === 'startplace' || name === 'endplace')) {
            model.invoke("process/positive/queryPlace", {
                invoiceIndex,
                itemIndex,
                name
            });
        }
    });

    // 单据明细处理-input[type=radio|checkbox|date]输入 非input[type=text]在低版本谷歌浏览器中不支持input [type=date]待验证
    $treatment_invoice.on('change', 'input[type!="text"]', function() {
        const invoiceIndex = $(this).parents('.item').index();
        const name = $(this).prop('name');
        const type = $(this).prop('type');
        let value = type === 'checkbox' ? $(this).is(':checked') : fpy_escapeString($(this).val());

        const billId = treatmentShowBillList[treatmentIndex].id;
        const invoice = treatmentInvoiceList[billId][invoiceIndex];
        switch (name) {
        case 'taxFreeAdjust':
            treatmentChangeWebSetTaxFreeAdjust(value, invoiceIndex);
            break;
        case 'fixedNumber':
            if (value) {
                temporaryValues = invoiceIndex;
                model.invoke("process/positive/openFixedQuantity");
            } else {
                treatmentChangeWebSetFixedNumber(0, invoiceIndex);
            }
            break;
        case 'inventorymark':
            value = value ? '1' : '0';
            break;
        case 'invoiceContent':
            model.invoke("process/invoicecontent", {
                invoiceContent: value,
                infocode: invoice.infocode || '',
                billInvoiceList: {[billId]: treatmentInvoiceList[billId]},
                mergeBillId: billId
            });
        break;
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
        const billId = treatmentShowBillList[treatmentIndex].id;
        const invoice = treatmentInvoiceList[billId][invoiceIndex];
        const invoicetype = invoice.invoicetype;
        const name = $(this).prop('name');
        const value = $(this).val().trim();
        // 是否同步
        let isSync = true;
        // 错误提示
        switch (name) {
        case 'cobuyer':
            if (!value) model.invoke("common/tip", "请输入共同购买方");
            break;
        case 'cobuyercardno':
            if (!value) model.invoke("common/tip", "请输入证件号码");
            break;
        case 'saledetailaddress':
            if (!value) model.invoke("common/tip", "请输入不动产坐落地址！");
            break;
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
        case 'infocode':
            model.invoke("process/queryinfocode", {
                infoCode: value,
                invoiceContent: invoice.invoiceContent || '1',
                mergeBillId : billId,
                billIdInvoiceMap: {[billId]: treatmentInvoiceList[billId]},
                billInvoiceRelationMap : {[billId] : treatmentInvoiceRelationMap[billId]},
                taxFreeAdjust : treatmentInvoiceListSetMap[billId][invoiceIndex].taxFreeAdjust,
                jqbh: billParam.deviceNo,
                terminalNo: billParam.terminalNo
            });
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
        const itemIndex = $(this).parents('tr').index();
        const value = $(this).val();
        if (name === 'transporttype') {
            updateTreatmentTransport(invoiceIndex, name, value, itemIndex);
        } else if (name === "salecrosscitysign" || name === "cobuyercardtype") {
            updateTreatmentSaleestate(invoiceIndex, name, value, itemIndex);
        } else {
            updateTreatmentInvoice(invoiceIndex, name, value);
        }
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

    // 单据明细处理-展开收起
    $treatment_invoice.on('click', '.fold', function(e) {
        let invoiceIndex = $(e.target).attr('data-invoiceIndex');
        if (!invoiceIndex) {
            invoiceIndex = $(e.target).parents('.fold').attr('data-invoiceIndex');
        }
        const { id: billId } = treatmentShowBillList[treatmentIndex];
        treatmentInvoiceList[billId][invoiceIndex]['isFold'] = !treatmentInvoiceList[billId][invoiceIndex]['isFold'];
        showTreatmentInvoice();
    });

    // 单据明细处理-展开收起
    // $treatment_invoice.on('click', '.fold div', function(e) {
    //     const invoiceIndex = $(e.target).parents('.fold').attr('data-invoiceIndex');
    //     const { id: billId } = treatmentShowBillList[treatmentIndex];
    //     treatmentInvoiceList[billId][invoiceIndex]['isFold'] = !treatmentInvoiceList[billId][invoiceIndex]['isFold'];
    //     showTreatmentInvoice();
    // });

    // 单据明细处理-货物运输增行
    $treatment_invoice.on('click', '.addBtn', function() {
        const { id: billId } = treatmentShowBillList[treatmentIndex];
        const invoiceList = treatmentInvoiceList[billId];
        const invoiceIndex = $(this).parents('.item').index();
        const { freights } = invoiceList[invoiceIndex];
        freights.push({
            transporttype: '铁路运输',
            licenseplate: '',
            startplace: '',
            endplace: '',
            transportgoods: ''
        });
        updateGoodsTransportTable(invoiceIndex);
        testTreatmentBillFinished(treatmentIndex);
    });

    // 单据明细处理-发票信息回车
    $treatment_invoice.on('keypress', '.pressEnter', function(event) {
        if (event.keyCode === 13) {
            treatmentInvoiceSearch($(this));
        }
    });

    // 单据明细处理-发票信息搜索
    function treatmentInvoiceSearch(that) {
        const invoiceIndex = that.parents('.item').index();
        const name = that.attr('data-name') || that.attr('name');
        const disabled = that.hasClass('disabled');
        const { id: billId, iselepaper } = treatmentShowBillList[treatmentIndex];
        const obj = treatmentInvoiceList[billId][invoiceIndex];
        if (!disabled) {
            let request = {
                billId,
                index: treatmentIndex
            }
            if (name === "buyername") {
                model.invoke("process/positive/queryBuyer", request);
            } else if (name === "infocode") {
                // 区分数电票
                if (obj.invoicetype === '08xdp' || obj.invoicetype === '10xdp' || iselepaper == '1') {
                    // 缓存当前发票下标
                    temporaryValues = invoiceIndex;
                    model.invoke("process/queryredconfirmbill", {
                        invoice: obj,
                        invoiceRelationMap: treatmentInvoiceRelationMap
                    });
                } else {
                    model.invoke("process/openredinfolist", request);
                }
            } else if (name === "originalinvoicecode") {
                model.invoke("process/openblueinfolist", request);
            }
        }
    }

    // 单据明细处理-发票明细删除
    $treatment_invoice.on('click', '.del', function() {
        const invoiceIndex = $(this).parents('.item').index();
        const itemIndex = $(this).parents('tr').index();
        treatmentDeleteItem(invoiceIndex, itemIndex);
    });

    // 单据明细处理-货物运输删除
    $treatment_invoice.on('click', '.transport-del', function() {
        const invoiceIndex = $(this).parents('.item').index();
        const itemIndex = $(this).parents('tr').index();
        treatmentDeleteTransportItem(invoiceIndex, itemIndex);
    });

    // 单据明细处理-上一步
    $treatment.find('.footer').on('click', '.prev', function() {
        let request = {
            "pks": billList.map(o => o.id)
        };
        model.invoke("process/prestep", request);
    });

    // 单据明细处理-下一步
    function handleItemStep() {
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
            return false;
        }
        // 单据校验
        const unComplete = treatmentShowBillList.filter(o => !o.isComplete).map(o => o.billno);
        if (unComplete.length) {
            model.invoke("common/tip", `单据${unComplete.toString()}待补充完整！`);
            return false;
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
                const _invoiceList = modifyBillInvoiceList[_id][_id];

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
            return false;
        }
        if (amountIsZeroBills.length) {
            // common/tip
            model.invoke("common/tip", `单据编号${amountIsZeroBills.join('，')}的发票金额为0，请重新拆分！`);
            return false;
        }
        return true;
        // let request = {
        //     "data": treatmentInvoiceList
        // };
        // console.log('------下一步--treatmentInvoiceList------', treatmentInvoiceList)
        // model.invoke("process/processnextstep", request);
    };

    // 发票预览-单据切换
    $preview_bill.on('click', '.item', function() {
        const index = $(this).index();
        if (index !== previewIndex) {
            $preview_bill.find('.item').removeClass('actived').eq(index).addClass('actived');
            $preview_invoice.addClass('actived');
            setTimeout(() => $preview_invoice.removeClass('actived'), 100);
            previewIndex = index;
            previewInvoiceIndex = 0;
            model.invoke("preview/positive/queryInvoiceByBillId", treatmentShowBillList[index].id);   
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

    // 发票预览-监听单据滚动
    $preview_bill.on('scroll', function(e) {
        if($preview_bill.scrollTop() + $preview_bill.innerHeight() >= $preview_bill.prop('scrollHeight')) {
            if (billPageInfo.pageIndex < billPageInfo.totalPage) {
                // 加载数据
                model.invoke("preview/positive/queryPositiveBill", {
                    pageIndex: billPageInfo.pageIndex + 1,
                    pageSize: billPageInfo.pageSize
                });
            } else {
                $preview_bill.find('.bill-loading').text('加载完成');
                // 加载完成
            }
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

    // 发票预览-输入失去焦点 去除前后空格
    // $preview_invoice.on('blur', '.searchInput', function() {
    //     const name = $(this).prop('name');
    //     const type = $(this).prop('type');
    //     const value = $(this).val().trim();
    //     const invoiceList = treatmentInvoiceList[treatmentShowBillList[previewIndex].id];
    //     if (type === 'text') {
    //         // 错误提示
    //         switch (name) {
    //         case 'saleraddr':
    //         case 'salerbank':
    //             updatePreviewInvoice(name, value);
    //             if (inputFocusValue !== value && invoiceList.length > 1 && !confirmLoading) {
    //                 confirmLoading = true;
    //                 model.invoke("common/show_confirm", { key: 'preview_sync_sale', content: '修改信息是否应用于本单据所有的发票？', name });
    //             }
    //             break;
    //         case 'specification':
    //         case 'unit':
    //             const itemIndex = $(this).parents('.line').index();
    //             previewChangeItem(name, value, itemIndex);
    //             if (inputFocusValue !== value) {
    //                 const { items } = invoiceList[previewInvoiceIndex];
    //                 const { goodsname, goodscode } = items[itemIndex];
    //                 // 检测是否需要同步
    //                 let needShowConfirm = 0;
    //                 needShowConfirm:
    //                 for (let m = 0; m < invoiceList.length; m++) {
    //                     const { items } = invoiceList[m];
    //                     for (let n = 0; n < items.length; n++) {
    //                         if (items[n].rowtype !== '1' && items[n].goodsname === goodsname && items[n].goodscode === goodscode) needShowConfirm++;
    //                         if (needShowConfirm > 1 && !confirmLoading) {
    //                             confirmLoading = true;
    //                             model.invoke("common/show_confirm", { key: 'preview_sync_item', content: '修改信息是否应用于本单据其它项目名称相同的明细？', name, index: itemIndex });
    //                             break needShowConfirm;
    //                         }
    //                     }
    //                 }
    //             }
    //             break;
    //         default:
    //             break;
    //         };
    //         $(this).val(value).prop("title", value);
    //     }
    // });

    // 发票预览-发票信息搜索
    $preview_invoice.on('click', '.search-btn', function() {
        if (!previewDataSave) {
            const invoiceList = treatmentInvoiceList[treatmentShowBillList[previewIndex].id];
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
            // updatePreviewHeader(true);
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
                "invoices": treatmentInvoiceList,
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

    // 开票结果-重新开票
    $result_fail.on('click', 'a', function() {
        const key = $(this).attr('data-key');
        $result_print.addClass('disabled');
        model.invoke("result/reIssue", [key]);
        resultQueryByTimer('reopen');
    });

    $preview_operator_name.eq(0).hover(
        function () {
            const invoiceList = treatmentInvoiceList[treatmentShowBillList[previewIndex].id];
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
            const invoiceList = treatmentInvoiceList[treatmentShowBillList[previewIndex].id];
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

    // 展示loading进度条
    function showLoading() {
        $loading.find('.loadingLine').css({ width: '1%' });
        $loading.find('.loaidngDes').css({ width: '1%' });
        $loading.find('.loaidngDes').find('.percent').text('1%');
        $loading.show();
        $content.hide();

        // 动态更新进度条文本
        let progress = 0;
        interval = setInterval(function() {
            progress += 10;
            if (progress === 90) {
                clearInterval(interval);
            }
            $('.progress-text').text(progress + '%');
            
            $loading.find('.loadingLine').css({ width: progress + '%' });
            $loading.find('.loaidngDes').css({ width: progress + '%' });
            $loading.find('.loaidngDes').find('.percent').text(progress + '%');
        }, 100); // 每 100ms 更新一次文本
    };
    
    // 关闭loading
    function closeLoading() {
        clearInterval(interval);
        $loading.find('.loadingLine').css({ width: '100%', transition: 'width 0.3s ease' });
        $loading.find('.loaidngDes').css({ width: '100%', transition: 'width 0.3s ease' });
        $loading.find('.loaidngDes').find('.percent').text('100%');
        setTimeout(function() {
            $loading.hide();
            $content.show();
        }, 300);
    };

    // 页面加载
    $(document).ready(function() {
        showLoading();
    });

    this.initWorkbench = function (_model, props) {
        var popsData = {};
        if (props != null && props.data != null) {
            popsData = props.data;
        }
        model = _model;
        initEvent(model, props);
        setInitData(popsData);
        closeLoading();
    };

    this.updateWorkbench = function (_model, props) {
        model = _model;
        var popsData = {};
        if (props != null && props.data != null) {
            popsData = props.data;
        }
        console.log('------updateWorkbench------popsData', popsData);
        switch (popsData.eventKey) {
            case "bill/mergebill":
                // 初始化单据明细处理页面
                if (popsData.errCode === '0000') {
                    if (popsData.negative) {
                        // 只显示负数列表
                        treatmentNegativeList = popsData.negative.negativeBillList || [];
                        negativePageInfo = {
                            ...negativePageInfo,
                            pageIndex: popsData.negative.pageIndex,
                            total: popsData.negative.total,
                            totalPage: popsData.negative.totalPage,
                        };
                        negativeSelectedRowKeys = popsData.negative.pks;
                    }
                        
                    $head_tab.find('.treatment-tab-item').eq(0).text(`正数单据开票处理(${popsData.positive ? popsData.positive.total : 0})`);
                    $head_tab.find('.treatment-tab-item').eq(1).text(`负数单据开票处理(${popsData.negative ? popsData.negative.total : 0})`);
                    if (!popsData.positive) {
                        showNegativeConfig();
                        closeLoading()
                        return;
                    }
                    // 正数列表
                    treatmentShowBillList = popsData.positive.positiveBillList || [];
                    treatmentInvoiceRelationMap = popsData.positive.invoiceRelationMap;
                    billNoMap = popsData.positive.billNoMap;
                    billPageInfo = {
                        pageIndex: popsData.positive.pageIndex,
                        pageSize: popsData.positive.pageSize,
                        total: popsData.positive.total,
                        totalPage: popsData.positive.totalPage,
                    }

                    if (treatmentShowBillList.length) {
                        model.invoke("process/positive/queryInvoiceByBillId", treatmentShowBillList[0].id);
                    }

                    showTreatmentSolutions();
                    showTreatmentBill();
                    updateTreatmentHeader();
                    closeLoading()
                    if (currentTab === 'positive') {
                        showPositiveConfig();
                    }
                }
                break;
            case "preview/positive/repeatInit":
                if (popsData.errCode === '0000') {
                    treatmentShowBillList = popsData.positive.positiveBillList || [];
                    billPageInfo = {
                        pageIndex: popsData.positive.pageIndex,
                        pageSize: popsData.positive.pageSize,
                        total: popsData.positive.total,
                        totalPage: popsData.positive.totalPage,
                    }
                    resultTotal = popsData.invoicecount;
                    $preview_bill.css({ display: '' });
                    $preview_box.css({ display: '' });
                    $head_tab.css({ display: '' });
                    $head.css({ display: '' });
                    billList = popsData.bills || [];
                    setCurrentDisplay(2);
                }
                break;
            case "bill/queryBill":
                // 查询单据
                if (popsData.errCode === '0000') {
                    billList = popsData.bills || [];
                    billParam.total = popsData.total;
                    billParam.totalPage = popsData.totalPage;
                    showBillTable();
                }
                break;
            case "bill/removeBill":
                // 移除单据
                if (popsData.errCode === '0000') {
                    const { billNo, buyerName, pageIndex, pageSize } = billParam;
                    model.invoke('bill/queryBill', { billno: billNo, buyername: buyerName, pageIndex, pageSize })
                    billParam.totalamount = popsData.totalamount;
                    updateBillHeader();
                    // treatmentShowBillList = popsData.mergeBill.bills || [];
                    // treatmentInvoiceList = treatmentBillInvoiceInit(popsData.invoiceList);
                    // initTreatmentInvoiceListSetMap(treatmentInvoiceList);
                    // treatmentInvoiceRelationMap = popsData.invoiceRelationMap;
                    // billNoMap = popsData.billNoMap;
                    // setCurrentDisplay(1);
                }
                break;
            case "bill/nextSetp":
                if (popsData.errCode === '0000') {
                    curIndex = 1;
                    setCurrentDisplay(1);
                    showLoading();
                }
                break;
            case "process/positive/queryInvoiceByBillId":
                if (popsData.errCode === '0000') {
                    treatmentInvoiceList = treatmentBillInvoiceInit(popsData.curInvoiceList); // 第一个账单的发票
                    initTreatmentInvoiceListSetMap(treatmentInvoiceList);
                    showTreatmentInvoice();
                    modifyBillInvoiceList = {
                        ...modifyBillInvoiceList,
                        [popsData.billId]: treatmentInvoiceList
                    }
                }
                break;
            case "process/positive/nextStep":
                if (popsData.errCode === '0000') {
                    let invoices = {};
                    // 校验按明细拆分
                    const isFinish = handleItemStep();
                    if (!isFinish) {
                        return;
                    }
                    Object.keys(modifyBillInvoiceList).forEach(key => {
                        invoices = { ...invoices, ...modifyBillInvoiceList[key] };
                    });
                    model.invoke("process/positive/nextStep", {
                        invoices,
                        invRealtion: treatmentInvoiceRelationMap
                    });
                }
                break;
            case "common/changeTab":
                if (popsData.errCode === '0000') {
                    currentTab = popsData.tab;
                    negativeSelectedRowKeys = [];
                    previewSelectedRowKeys = [];
                    $result_fail.hide();
                    $result_success.hide();
                    if (popsData.tab === 'positive') {
                        $head_tab.find('.treatment-tab-item').eq(0).addClass('tab-actived');
                        $head_tab.find('.treatment-tab-item').eq(1).removeClass('tab-actived');
                        $head.find('.preview').find('.info').text('发票预览');
                    } else {
                        $head_tab.find('.treatment-tab-item').eq(0).removeClass('tab-actived');
                        $head_tab.find('.treatment-tab-item').eq(1).addClass('tab-actived');
                        $head.find('.preview').find('.info').text('红冲申请');
                    }
                    if (popsData.currentDisplay === 1) {
                        if (popsData.tab === 'positive') {
                            // 正数
                            showPositiveConfig();
                        } else {
                            // 负数
                            showNegativeConfig();
                        }
                    } else if (popsData.currentDisplay === 2) {
                        if (popsData.tab === 'positive') {
                            $preview_bill.css({ display: '' });
                            $preview_box.css({ display: '' });
                            $preview_table.css({ display: 'none' });
                            // $preview_solutions.css({ display: 'none' });
                        } else {
                            $preview_bill.css({ display: 'none' });
                            $preview_box.css({ display: 'none' });
                            $preview_table.css({ display: '' });
                            // $preview_solutions.css({ display: '' });
                        }
                    } else if (popsData.currentDisplay === 3 && curIndex === popsData.currentDisplay) {
                        setCurrentDisplay(popsData.currentDisplay, true);
                    }
                    if (curIndex !== popsData.currentDisplay) {
                        setCurrentDisplay(popsData.currentDisplay, true);
                    }
                }
                break;
            case "process/negative/invSpecify":
                if (popsData.errCode === '0000') {
                    model.invoke("process/negative/invSpecify", { pks: negativeSelectedRowKeys, all: negativeAllData });
                }
                break;
            case "process/positive/queryMergeDeviation":
                if (popsData.errCode === '0000') {
                    // model.invoke("common/tip", "本单据已切换为按明细拆分，请在本单据中选取明细生成发票！");
                    // 清除前端设置
                    const billId = treatmentShowBillList[treatmentIndex].id;
                    treatmentInvoiceListSetMap[billId] = [];
                    // 清空税额尾差调整值
                    treatmentEmptyCurrentBillAdjustedData();

                    // 切换拆分方式
                    updateTreatmentBill(treatmentIndex, 'splitrule', IMC_SPLIT_BY_DETAIL);
                    // 更新单据税额尾差
                    updateTreatmentBillAdjustedData(popsData.taxDeviationBillMap);
                    initTreatmentRemainingItems();
                    showTreatmentSolutions();
                    updateTreatmentHeader();
                }
                break;
            case "process/positive/changeSplitRule":
                if (popsData.errCode === '0000') {
                    if (popsData.ruleCode === IMC_SPLIT_BY_DETAIL) {
                        const id = treatmentShowBillList[treatmentIndex].id;
                        model.invoke("process/positive/queryMergeDeviation", id);
                        return;
                    }
                    // 移除按明细开票的数据
                    const billId = treatmentShowBillList[treatmentIndex].id;
                    delete treatmentRemainingItems[billId];
                    // 清空税额尾差调整值
                    treatmentEmptyCurrentBillAdjustedData();


                    // 切换拆分方式
                    updateTreatmentBill(treatmentIndex, 'splitrule', popsData.ruleCode);
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
            case "process/positive/queryPositiveBill":
                if (popsData.errCode === '0000') {
                    treatmentShowBillList = treatmentShowBillList.concat(popsData.positive.positiveBillList);
                    billPageInfo = {
                        ...billPageInfo,
                        pageIndex: popsData.positive.pageIndex,
                        pageSize: popsData.positive.pageSize
                    }
                    showTreatmentBill();
                }
                break;
            case "process/positive/queryBuyer":
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
            case "process/positive/queryPlace":
                if (popsData.errCode === '0000') {
                    const { invoiceIndex, itemIndex, name, place } = popsData.data;
                    const invoiceList = treatmentInvoiceList[treatmentShowBillList[treatmentIndex].id];
                    invoiceList[invoiceIndex].freights[itemIndex][name] = place;
                    updateGoodsTransportTable(invoiceIndex);
                }
                break;
            case "process/positive/openFixedQuantity":
                $treatment_invoice.find('.item').eq(temporaryValues).find('input[name=fixedNumber]').prop('checked', popsData.errCode === '0000');
                if (popsData.errCode === '0000') {
                    let fixedNumber = popsData.quantity;
                    const { totalamount } = treatmentShowBillList[treatmentIndex];
                    // 自动转换
                    fixedNumber = (totalamount > 0 && fixedNumber < 0) || (totalamount < 0 && fixedNumber > 0) ? -fixedNumber : fixedNumber;
                    treatmentChangeWebSetFixedNumber(fixedNumber, temporaryValues, popsData.applyall);
                }
                break;
            case "process/negative/autoMatch":
                model.invoke("process/negative/autoMatch", { blueconfig: negativeRules.blue, redconfig: negativeRules.red, pks: negativeSelectedRowKeys, all: negativeAllData });
                break;
            case "process/negative/invSpecify/return":
            case "process/negative/autoMatch/return":
            case "process/negative/modifyMatchBill":
                if (popsData.errCode === '0000') {
                    model.invoke("process/negative/queryNegativeBill", { pageIndex: negativePageInfo.pageIndex, pageSize: negativePageInfo.pageSize});
                    showTreatmentNegativeTable();
                }
                break;
            case "process/negative/selectAll":
                if (popsData.errCode === '0000') {
                    negativeSelectedRowKeys = popsData.pks;
                }
                break;
            case "preview/negative/selectAll":
                if (popsData.errCode === '0000') {
                    previewSelectedRowKeys = popsData.pks;
                }
                break;
            case "preview/positive/queryInvoiceByBillId":
                if (popsData.errCode === '0000') {
                    treatmentInvoiceList = treatmentBillInvoiceInit(popsData.curInvoiceList);
                    showPreviewInvoice();
                }
                break;
            case "process/negative/queryNegativeBill":
                if (popsData.errCode === '0000') {
                    treatmentNegativeList = popsData.negative.negativeBillList || [];
                    negativeSelectedRowKeys = popsData.negative.pks;
                    negativePageInfo = {
                        ...negativePageInfo,
                        pageIndex: popsData.negative.pageIndex,
                        total: popsData.negative.total,
                        totalPage: popsData.negative.totalPage,
                    };
                    showTreatmentNegativeTable();
                }
                break;
            case "preview/positive/queryPositiveBill":
                if (popsData.errCode === '0000') {
                    treatmentShowBillList = treatmentShowBillList.concat(popsData.positive.positiveBillList);
                    billPageInfo = {
                        ...billPageInfo,
                        pageIndex: popsData.positive.pageIndex,
                        pageSize: popsData.positive.pageSize
                    }
                    showPreviewBill();
                }
                break;
            case 'setCurrentDisplay':
                if (popsData.errCode === '0000') {
                    curIndex = popsData.currentDisplay;
                    currentTab = popsData.currentTab;
                    negativeSelectedRowKeys = [];
                    previewSelectedRowKeys = [];
                    if (curIndex === 2) {
                        if (popsData.currentTab === 'positive') {
                            // 正数
                            $preview_bill.css({ display: '' });
                            $preview_box.css({ display: '' });
                            $preview_table.css({ display: 'none' });
                            // $preview_solutions.css({ display: 'none' });
                            setCurrentDisplay(popsData.currentDisplay);
                        } else {
                            // 负数
                            $preview_bill.css({ display: 'none' });
                            $preview_box.css({ display: 'none' });
                            $preview_table.css({ display: '' });
                            // $preview_solutions.css({ display: '' });
                            model.invoke("preview/negative/queryNegativeBill", {pageIndex: previewNegativePageInfo.pageIndex, pageSize: previewNegativePageInfo.pageSize});
                        }
                    } else if (curIndex === 1) {
                        model.invoke("process/negative/queryNegativeBill", { pageIndex: negativePageInfo.pageIndex, pageSize: negativePageInfo.pageSize});
                        setCurrentDisplay(curIndex, true);
                    } else {
                        setCurrentDisplay(curIndex, true);
                    }
                }
                break;
            case 'preview/negative/queryNegativeBill':
                if (popsData.errCode === '0000') {
                    previewTableDataSource = popsData.negative.negativeBillList;
                    previewNegativePageInfo = {
                        ...previewNegativePageInfo,
                        total: popsData.negative.total,
                        totalPage: popsData.negative.totalPage
                    }
                    previewSelectedRowKeys = popsData.negative.pks;
                    $head.find('.preview').find('.info').text('红冲申请');
                    setCurrentDisplay(2);
                }
                break;
            case 'preview/negative/refuse':
                model.invoke('preview/negative/refuse', { all: previewNegativeAllData, pks: previewSelectedRowKeys });
                break;
            case 'preview/negative/revoke':
                model.invoke('preview/negative/revoke', { all: previewNegativeAllData, pks: previewSelectedRowKeys });
                break;
            case 'preview/negative/refresh':
                if (popsData.errCode === '0000') {
                    model.invoke('preview/negative/queryNegativeBill', {pageIndex: previewNegativePageInfo.pageIndex, pageSize: previewNegativePageInfo.pageSize});
                }
                break;
            case 'preview/positive/preStep':
                if (popsData.errCode === '0000') {
                    curIndex = popsData.currentDisplay;
                    if (curIndex === 1) {
                        if (popsData.currentTab === 'positive' && treatmentShowBillList.length) {
                            // 正数
                            showPositiveConfig();
                        } else {
                            // 负数
                            showNegativeConfig();
                        }
                    }
                    setCurrentDisplay(popsData.currentDisplay, true);
                }
                break;
            case 'process/negative/cancelMatch':
                model.invoke('process/negative/cancelMatch', { pks: negativeSelectedRowKeys, all: negativeAllData });
                break;
            case 'process/positive/nextStepReturn':
                if (popsData.errCode === '0000') {
                    $preview_bill.css({ display: '' });
                    $preview_box.css({ display: '' });
                    $preview_table.css({ display: 'none' });
                    // $preview_solutions.css({ display: 'none' });
                    resultTotal = popsData.invoicecount;
                    // $head_preview_value.eq(0).text(popsData.invoicecount);
                    // $head_preview_value.eq(1).text(popsData.totalamount);
                    setCurrentDisplay(popsData.currentDisplay);
                }
                break;
            case 'preview/negative/confirmRedConfirm':
                model.invoke('preview/negative/confirmRedConfirm', { all: previewNegativeAllData, pks: previewSelectedRowKeys });
                break;
            case 'preview/negative/uploadRedConfirm':
                model.invoke('preview/negative/uploadRedConfirm', { all: previewNegativeAllData, pks: previewSelectedRowKeys });
                break;
            case 'preview/negative/issue':
                if (popsData.errCode === '0000') {
                    model.invoke('preview/negative/issue', { all: previewNegativeAllData, pks: previewSelectedRowKeys });
                }
                break;
            case "result/positive/showDetail":
                if (popsData.errCode === '0000') {
                    resultList = popsData.result;
                    resultIsComplete = popsData.isComplete;
                    resultCreditQuota = popsData.creditQuota;
                    resultTotal = popsData.invoicecount;
                    setCurrentDisplay(3);
                    resultClass();
                } else {
                    $result_print.removeClass('disabled');
                    $result_reopen.removeClass('disabled');
                }
                break;
            case "result/negative/showDetail":
                if (popsData.errCode === '0000') {
                    negativeResultList = popsData.result;
                    negativeResultIsComplete = popsData.isComplete;
                    resultCreditQuota = popsData.creditQuota;
                    negativeResultTotal = popsData.invoicecount;
                    setCurrentDisplay(3);
                    resultClass();
                } else {
                    $result_print.removeClass('disabled');
                    $result_reopen.removeClass('disabled');
                }
                break;
            default:
                break;
        }
    };

    var initEvent = function (model, props) {

    };
};