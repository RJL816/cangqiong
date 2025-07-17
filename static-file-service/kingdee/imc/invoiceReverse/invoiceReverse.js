var FPY_invoiceReverseFun = function (KDApi, $, _) {
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
        { key: '5', value: '未作废' },
        { key: '6', value: '已作废' },
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
    const INVALID_OTHER_REASON = '其它';

    const DISPLAY_NAME = ['invalid', 'flush', 'reopen', 'result'];

    let displayFirst; // 逆向类型 'invalid', 'flush'
    let currentDisplay; // 当前内容显示下标 invalid flush reopen result
    let visibleReopen; // 重开页面 boolean

    // 全局对象
    const fpyTable = fpy_table();
    let bills; // 单据列表
    let billsDom; // 单据列表Dom
    const billsSet = []; // 单据设置

    // 作废红冲
    let billReverseRelationMap; // 逆向单据与发票的关联关系
    let reverseInvoiceMap; // 逆向发票
    let reverseBillIndex = 0; // 逆向单据当前下标
    let reverseInvoiceIndex; // 逆向发票当前下标
    const reverseRequestMap = {}; // 逆向待提交数据

    // 作废 红冲 作废 只运行一次
    let invalidOnceLoadBill;
    let flushOnceLoadBill;
    let reopenOnceLoadBill;

    // 重开
    let billReopenRelationMap; // 重开单据与发票的关联关系
    let reopenInvoiceMap; // 重开发票
    let reopenBillIndex = 0; // 重开单据当前下标
    let reopenInvoiceIndex; // 重开发票当前下标
    const reopenRequestKeyMap = {
        buyername: '购方名称',
        buyertaxno: '购方纳税人识别号',
        buyeraddr: '购方地址、电话',
        buyerbank: '购方开户行及账号',
        buyerphone: '购方手机号码',
        buyeremail: '购方邮箱',
        invoiceremark: '备注',
        drawer: '开票人',
        payee: '收款人',
        reviewer: '复核人'
    }; // 重开待提交的数据字典
    const reopenRequestMap = {}; // 重开待提交数据
    let reopenDataSave = false; // 重开保存标识 暂未使用
    let reopenHadInit = false; // 重开标识

    // 结果
    let resultTimer; // 结果-计时器
    let resultIsComplete = false; // 结果-是否开票完成
    let resultList = []; // 结果-结果列表
    let resultOpenType = 'normal'; // 结果-开票类型

    // JQ对象缓存
    const $workbench = $('#imc_invoiceReverse');
    // 头部
    const $head = $workbench.find('.head');
    const $head_item = $head.find('.item');
    const $content = $workbench.find('.content');
    // 作废
    const $invalid = $workbench.find('.invalid');
    const $invalid_bill = $invalid.find('.bill-list');
    const $invalid_box = $invalid.find('.invoice-box');
    const $invalid_reason = $invalid_box.find('.abolishreason');
    const $invalid_other = $invalid_box.find('.otherReason');
    const $invalid_setAll = $invalid_box.find('.invalidSetAll');
    const $invalid_prev = $invalid_box.find('.prev');
    const $invalid_next = $invalid_box.find('.next');
    const $invalid_invoice = $invalid.find('.invoice');
    const $invalid_code = $invalid_invoice.find('.invoiceCode');
    const $invalid_no = $invalid_invoice.find('.invoiceNo');
    const $invalid_invoiceType = $invalid_invoice.find('.invoiceType');
    const $invalid_buyer = $invalid_invoice.find('.buyer');
    const $invalid_saler = $invalid_invoice.find('.saler');
    const $invalid_top_other = $invalid_invoice.find('.top').find('.other');
    const $invalid_top_buyer = $invalid_invoice.find('.top').find('.buyer');
    const $invalid_top_saler = $invalid_invoice.find('.top').find('.saler');
    const $invalid_bottom_buyer = $invalid_invoice.find('.bottom').find('.buyer');
    const $invalid_bottom_saler = $invalid_invoice.find('.bottom').find('.saler');
    const $invalid_jshjje = $invalid_invoice.find('.jshjje');
    const $invalid_bz = $invalid_invoice.find('.invoiceremark');
    const $invalid_item = $invalid_invoice.find('.label').find('.item');
    const $invalid_detail = $invalid_invoice.find('.detail');
    const $invalid_operator = $invalid_invoice.find('.operator').find('.value');
    // 红冲
    const $flush = $workbench.find('.flush');
    const $flush_bill = $flush.find('.bill-list');
    const $flush_invoice = $flush.find('.invoice-detail');
    // 重开
    const $reopen = $workbench.find('.reopen');
    const $reopen_bill = $reopen.find('.bill-list');
    const $reopen_box = $reopen.find('.invoice-box');
    const $reopen_setAll = $reopen_box.find('.reopenSetAll');
    const $reopen_edit = $reopen.find('.edit-list');
    const $reopen_edit_list = $reopen_edit.find('.list');
    const $reopen_prev = $reopen_box.find('.prev');
    const $reopen_next = $reopen_box.find('.next');
    const $reopen_right = $reopen.find('.btnDetail.right');
    const $reopen_left = $reopen.find('.btnDetail.left');
    const $reopen_invoice = $reopen.find('.invoice');
    const $reopen_code = $reopen_invoice.find('.invoiceCode');
    const $reopen_no = $reopen_invoice.find('.invoiceNo');
    const $reopen_invoiceType = $reopen_invoice.find('.invoiceType');
    const $reopen_buyer = $reopen_invoice.find('.buyer');
    const $reopen_saler = $reopen_invoice.find('.saler');
    const $reopen_top_other = $reopen_invoice.find('.top').find('.other');
    const $reopen_top_buyer = $reopen_invoice.find('.top').find('.buyer');
    const $reopen_top_saler = $reopen_invoice.find('.top').find('.saler');
    const $reopen_bottom_buyer = $reopen_invoice.find('.bottom').find('.buyer');
    const $reopen_bottom_saler = $reopen_invoice.find('.bottom').find('.saler');
    const $reopen_jshjje = $reopen_invoice.find('.jshjje');
    const $reopen_bz = $reopen_invoice.find('.invoiceremark');
    const $reopen_item = $reopen_invoice.find('.label').find('.item');
    const $reopen_detail = $reopen_invoice.find('.detail');
    const $reopen_operator = $reopen_invoice.find('.operator').find('.value');
    // 结果
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
    function setInitData(data = {}) {
        // 设置主题颜色
        const themeColor = $workbench.find('.theme-fc').css('color');
        document.getElementById('imc_invoiceReverse').style.setProperty('--theme', themeColor);

        displayFirst = data.currentDisplay;
        currentDisplay = data.currentDisplay;

        if (!DISPLAY_NAME.includes(currentDisplay)) {
            model.invoke('reverseCommon/tip', '加载页面异常');
            return;
        }

        // 加载页面
        $head.find(`.${displayFirst}`).removeClass('hidden');
        $content.find(`.${displayFirst}`).removeClass('hidden');

        // 初始化单据 bills billsDom billsSet
        initBill(data.bills || []);

        // 初始化只运行一次的方法
        invalidOnceLoadBill = fpy_once(showInvalidBill);
        flushOnceLoadBill = fpy_once(showFlushBill);
        reopenOnceLoadBill = fpy_once(showReopenBill);


        if (displayFirst === 'invalid' || displayFirst === 'flush') {
            // 初始化逆向 billReverseRelationMap reverseInvoiceMap reverseRequestMap
            initReverse(data);
        } else if (displayFirst === 'reopen') {
            // 初始化重开 billReopenRelationMap reopenInvoiceMap reopenRequestMap
            initReopen(data);
        }

        visibleReopen = data.visibleReopen;
        if (visibleReopen && (displayFirst === 'invalid' || displayFirst === 'flush')) {
            // 标题栏显示发票重开
            $head.find('.reopen').removeClass('hidden');
            // 发票重开页面显示上一步按钮
            $reopen.find('.footer').find('.prev').removeClass('hidden');
        }

        // 防止内容闪现
        $content.show();
        setCurrentDisplay(currentDisplay);
    }

    // 设置当前显示内容
    function setCurrentDisplay(current) {
        currentDisplay = current;
        const index = DISPLAY_NAME.indexOf(current);
        // 头部
        $head_item.removeClass('actived hack').eq(index).addClass('hack');
        for (let i = 0; i <= index; i++) {
            $head_item.eq(i).addClass('actived');
        }
        $content.find('.content-item').hide().eq(index).show();
        switch (current) {
            case 'invalid':
                showInvalid();
                break;
            case 'flush':
                showFlush();
                break;
            case 'reopen':
                showReopen();
                break;
            case 'result':
                showResult();
                break;
            default:
                break;
        }
    }

    // 初始化单据 billsDom billsSet
    function initBill(data) {
        bills = data;
        const _html = [];
        for (let i = 0; i < data.length; i++) {
            const obj = data[i];
            _html.push(`
                <div class="item ${i === 0 ? 'actived' : ''}">
                    <div class="text truncateText" title="单据编号：${obj.billNo}"><span class="primary">${obj.billNo}</span></div>
                    <div class="text">不含税金额：<span class="warning">${Number(obj.invoiceAmount || 0).toFixed(2)}元</span></div>
                    <div class="text">税额：<span class="warning">${Number(obj.totalTax || 0).toFixed(2)}元</span></div>
                    <div class="text">价税合计：<span class="warning">${Number(obj.totalAmount || 0).toFixed(2)}元</span></div>
                </div>
            `);
            billsSet.push({
                reverseSetAll: false,
                reopenSetAll: false
            });
        }
        billsDom = _html.join('');
    }

    // 初始化逆向
    function initReverse(data) {
        billReverseRelationMap = data.billReverseRelation || {};
        reverseInvoiceMap = data.billRedInvoice || {};

        Object.keys(reverseInvoiceMap).forEach(key => {
            const { infocode = '',
                applicant = '',
                redreason = '',
                invoiceremark = '',
                invoiceamount,
                totaltax,
                totalamount,
                sim_original_bill_item = []
            } = reverseInvoiceMap[key];
            reverseRequestMap[key] = {
                abolishreason: '', // 作废理由
                otherReason: '',
                applicant, // 申请方 1购方申请，2销方申请
                infocode,
                redreason, // 冲红原因（普票才要）
                invoiceremark, // 备注
                hadHzxxbm: !!infocode,
                editHjbhsje: invoiceamount,
                editKphjse: totaltax,
                editJshjje: totalamount,
                editItems: sim_original_bill_item.map(item => ({
                    id: item.id,
                    editXmsl: item.num,
                    editXmje: item.amount,
                    editSe: item.tax,
                    editTaxXmje: item.taxamount
                }))
            };
        });
    }

    // 初始化重开
    function initReopen(data) {
        reopenHadInit = true;

        billReopenRelationMap = data.reopenBillInvoiceRelation || {};
        reopenInvoiceMap = data.reopenInvoiceList || {};

        const RequestKeys = Object.keys(reopenRequestKeyMap);
        Object.keys(reopenInvoiceMap).forEach(key => {
            const obj = reopenInvoiceMap[key];
            const requestData = {};
            for (let i = 0; i < RequestKeys.length; i++) {
                requestData[RequestKeys[i]] = obj[RequestKeys[i]];
            }
            reopenRequestMap[key] = requestData;
        });
    }

    // 逆向-更新数据
    function updateReverseRequestMap(name, value, index = reverseInvoiceIndex) {
        const bill = bills[reverseBillIndex];
        const invoices = billReverseRelationMap[bill.billPk];
        const invoiceId = invoices[index];
        reverseRequestMap[invoiceId][name] = value;

        // 更新单据全部发票
        if (billsSet[reverseBillIndex].reverseSetAll) {
            for (let i = 0; i < invoices.length; i++) {
                reverseRequestMap[invoices[i]][name] = value;
            }
        }
    }

    // 作废
    function showInvalid() {
        invalidOnceLoadBill();
        showInvalidInvoice(reverseInvoiceIndex);
    }

    // 作废-显示单据
    function showInvalidBill() {
        $invalid_bill.find('.list').html(billsDom);
    }

    // 作废-显示发票
    function showInvalidInvoice(invoiceIndex = 0) {
        // 加载动画
        $invalid_invoice.addClass('actived');
        setTimeout(() => $invalid_invoice.removeClass('actived'), 100);

        reverseInvoiceIndex = invoiceIndex;
        const bill = bills[reverseBillIndex];
        const invoices = billReverseRelationMap[bill.billPk];
        const invoiceId = invoices[reverseInvoiceIndex];

        const { abolishreason, otherReason } = reverseRequestMap[invoiceId];
        $invalid_reason.val(abolishreason);
        if (abolishreason === INVALID_OTHER_REASON) {
            $invalid_other.show().find('input').val(otherReason);
        } else {
            $invalid_other.hide();
        }

        const { reverseSetAll } = billsSet[reverseBillIndex];
        $invalid_setAll.prop('checked', reverseSetAll);

        const length = invoices.length;
        // 防止连续点击出错
        if (reverseInvoiceIndex < 0) {
            reverseInvoiceIndex = 0;
        }
        if (reverseInvoiceIndex >= length) {
            reverseInvoiceIndex = length - 1;
        }
        // 切换按钮
        if (reverseInvoiceIndex <= 0) {
            $invalid_prev.addClass('disabled');
        } else {
            $invalid_prev.removeClass('disabled');
        }
        if (reverseInvoiceIndex === length - 1) {
            $invalid_next.addClass('disabled');
        } else {
            $invalid_next.removeClass('disabled');
        }
        const obj = reverseInvoiceMap[invoiceId];
        $invalid_invoice.attr('data-info', `发票（${reverseInvoiceIndex + 1}/${length}）`);
        // 是否收购票
        // '' '00' 非特殊票种
        // '02' 收购票
        // '06' 抵扣通行费
        // '07' 不抵扣通行费
        // '08' 成品油
        const isAcquisition = obj.specialtype === '02';
        if (isAcquisition) {
            $invalid_top_buyer.css({ display: 'none' });
            $invalid_bottom_saler.css({ display: 'none' });
            $invalid_top_saler.css({ display: 'flex' });
            $invalid_bottom_buyer.css({ display: 'flex' });
        } else {
            $invalid_top_buyer.css({ display: 'flex' });
            $invalid_bottom_saler.css({ display: 'flex' });
            $invalid_top_saler.css({ display: 'none' });
            $invalid_bottom_buyer.css({ display: 'none' });
        }
        $invalid_invoiceType.text(`增值税${INVOICE_TYPES_DICT['k' + obj.invoicetype] || obj.invoicetype}${isAcquisition ? '（收购）' : ''}`);
        $invalid_code.text(obj.invoicecode).prop('title', obj.invoicecode);
        $invalid_no.text(obj.invoiceno).prop('title', obj.invoiceno);

        $invalid_buyer.find('.buyername').text(obj.buyername).prop('title', obj.buyername);
        $invalid_buyer.find('.buyertaxno').text(obj.buyertaxno).prop('title', obj.buyertaxno);
        $invalid_buyer.find('.buyeraddr').text(obj.buyeraddr).prop('title', obj.buyeraddr);
        $invalid_buyer.find('.buyerbank').text(obj.buyerbank).prop('title', obj.buyerbank);

        $invalid_top_other.find('.buyerphone').text(obj.buyerphone).prop('title', obj.buyerphone);
        $invalid_top_other.find('.buyeremail').text(obj.buyeremail).prop('title', obj.buyeremail);
        $invalid_jshjje.text(Number(obj.totalamount).toFixed(2));

        $invalid_saler.find('.salername').text(obj.salername).prop('title', obj.salername);
        $invalid_saler.find('.salertaxno').text(obj.salertaxno).prop('title', obj.salertaxno);
        $invalid_saler.find('.saleraddr').text(obj.saleraddr).prop('title', obj.saleraddr);
        $invalid_saler.find('.salerbank').text(obj.salerbank).prop('title', obj.salerbank);

        $invalid_bz.val(obj.invoiceremark).prop('title', obj.invoiceremark);

        const hsbzText = obj.hsbz === '1' ? '' : '不';
        $invalid_item.eq(4).text(`单价（${hsbzText}含税）`);
        $invalid_item.eq(5).text(`金额（${hsbzText}含税）`);

        const _html = [];
        for (let i = 0; i < obj.sim_original_bill_item.length; i++) {
            const cur = obj.sim_original_bill_item[i];
            const xmsl = cur.num ? fpy_toFixedNoZero(cur.num, 8) : '';
            let xmdj = obj.hsbz === '1' ? cur.taxunitprice : cur.unitprice;
            xmdj = xmdj ? fpy_toFixedTwoOrMore(xmdj) : '';
            const xmje = Number(obj.hsbz === '1' ? cur.taxamount : cur.amount).toFixed(2);
            const sl = cur.taxrate && cur.taxrate !== null ? cur.taxrate * 100 + '%' : '';
            const se = Number(cur.tax).toFixed(2);
            _html.push(`<div class="line">
                <div class="item truncateText" title="${cur.goodsname}">${cur.goodsname}</div>
                <div class="item truncateText" title="${cur.specification}">${cur.specification}</div>
                <div class="item truncateText" title="${cur.unit}">${cur.unit}</div>
                <div class="item truncateText" title="${xmsl}">${xmsl}</div>
                <div class="item truncateText" title="${xmdj}">${xmdj}</div>
                <div class="item truncateText" title="${xmje}">${xmje}</div>
                <div class="item truncateText" title="${sl}">${sl}</div>
                <div class="item truncateText" title="${se}">${se}</div>
            </div>`);
        }
        $invalid_detail.html(_html.join(''));
        $invalid_operator.eq(0).text(obj.payee);
        $invalid_operator.eq(1).text(obj.reviewer);
        $invalid_operator.eq(2).text(obj.drawer);
    }

    // 红冲
    function showFlush() {
        flushOnceLoadBill();
        showFlushInvoice();
    }

    // 红冲-显示单据
    function showFlushBill() {
        $flush_bill.find('.list').html(billsDom);
    }

    // 红冲-显示发票
    function showFlushInvoice() {
        const bill = bills[reverseBillIndex];
        const invoices = billReverseRelationMap[bill.billPk];

        const _length = invoices.length;
        const _html = [];
        for (let i = 0; i < _length; i++) {
            _html.push(`
                <div class="item">
                    <div class="info" data-all="${_length}">
                        ${getFlushInvoiceInfoHtmlByIndex(i)}
                    </div>
                    <div id="imc_invoiceReverse_flush_invoice${invoices[i]}"></div>
                    <div class="total">
                        ${getFlushInvoiceTotalHtmlByIndex(i)}
                    </div>
                </div>
            `);
        }
        $flush_invoice.html(_html.join(''));
        for (let i = 0; i < _length; i++) {
            updateFlushInvoiceTableByIndex(i);
        }
    }

    // 红冲-获取发票信息的html
    function getFlushInvoiceInfoHtmlByIndex(invoiceIndex) {
        const bill = bills[reverseBillIndex];
        const invoices = billReverseRelationMap[bill.billPk];
        const invoiceId = invoices[invoiceIndex];
        const {
            invoicetype,
            buyername,
            buyertaxno,
            buyeraddr,
            buyerbank,
            blueinvoicecode,
            blueinvoiceno,
            originalissuetime,
            blueinvoicetype
        } = reverseInvoiceMap[invoiceId];

        const {
            applicant,
            infocode,
            redreason,
            invoiceremark,
            hadHzxxbm
        } = reverseRequestMap[invoiceId];
        const isSpecial = invoicetype === '028' || invoicetype === '004';
        const _html = [`
            <div class="text">
                <div class="name">发票类型</div>
                <div class="value">
                    <div class="invoiceType" data-key="${invoicetype}">${INVOICE_TYPES_DICT['k' + invoicetype] || invoicetype}</div>
                </div>
            </div>
            <div class="text">
                <div class="name requiredFields">购方名称</div>
                <div class="value">
                    <input class="searchInput" type="text" name="buyername" maxlength="100" value="${buyername}" disabled>
                </div>
            </div>
            <div class="text">
                <div class="name ${isSpecial ? 'requiredFields' : ''}">纳税人识别号</div>
                <div class="value">
                    <input class="searchInput" type="text" name="buyertaxno" maxlength="20" value="${buyertaxno}" disabled>
                </div>
            </div>
            <div class="text">
                <div class="name ${isSpecial ? 'requiredFields' : ''}">地址及电话</div>
                <div class="value">
                    <input class="searchInput" type="text" name="buyeraddr" maxlength="100" value="${buyeraddr}" disabled>
                </div>
            </div>
            <div class="text">
                <div class="name ${isSpecial ? 'requiredFields' : ''}">开户行及账号</div>
                <div class="value">
                    <input class="searchInput" type="text" name="buyerbank" maxlength="100" value="${buyerbank}" disabled>
                </div>
            </div>
            <div class="text">
                <div class="name requiredFields">原蓝票代码</div>
                <div class="value">
                    <input class="searchInput" type="text" name="blueinvoicecode" maxlength="12" value="${blueinvoicecode}" disabled>
                </div>
            </div>
            <div class="text">
                <div class="name requiredFields">原蓝票号码</div>
                <div class="value">
                    <input class="searchInput" type="text" name="blueinvoiceno" maxlength="8" value="${blueinvoiceno}" disabled>
                </div>
            </div>
            <div class="text">
                <div class="name requiredFields">原发票类型</div>
                <div class="value">
                    <input
                        class="searchInput"
                        type="text"
                        name="blueinvoicetype"
                        value="${INVOICE_TYPES_DICT['k' + blueinvoicetype] || blueinvoicetype}"
                        disabled
                    >
                </div>
            </div>
            <div class="text">
                <div class="name requiredFields">原蓝票开票日期</div>
                <div class="value">
                    <input class="searchInput" type="date" name="originalissuetime" value="${(originalissuetime || '').substring(0, 10)}" disabled>
                </div>
            </div>
        `];
        if (isSpecial) {
            _html.push(`
                <div class="text">
                    <div class="name requiredFields">申请方类型</div>
                    <div class="value">
                        <form>
                            <input
                                id="applicant2${invoiceIndex}"
                                class="searchOther vaMiddle"
                                type="radio"
                                name="applicant"
                                value="2"
                                ${applicant === '2' ? 'checked' : ''}
                                ${hadHzxxbm ? 'disabled' : ''}
                            >
                            <label for="applicant2${invoiceIndex}" class="mgl5 mgr10 vaMiddle">销方申请</label>
                            <input
                                id="applicant1${invoiceIndex}"
                                class="searchOther vaMiddle"
                                type="radio"
                                name="applicant"
                                value="1"
                                ${applicant === '1' ? 'checked' : ''}
                                ${hadHzxxbm ? 'disabled' : ''}
                            >
                            <label for="applicant1${invoiceIndex}" class="mgl5 mgr10 vaMiddle">购方申请</label>
                        </form>
                    </div>
                </div>
                <div class="text">
                    <div class="name requiredFields">红字信息编码</div>
                    <div class="value">
                        <input class="searchInput" type="text" name="infocode" maxlength="24" value="${infocode}" ${hadHzxxbm ? 'disabled' : ''}>
                    </div>
                </div>
            `);
        } else {
            _html.push(`
                <div class="text">
                    <div class="name requiredFields">冲红原因</div>
                    <div class="value">
                        <select class="searchInput" name="redreason">
                            <option value="" ${!redreason ? 'selected' : ''} disabled>请选择</option>
                            <option value="1" ${redreason === '1' ? 'selected' : ''}>销货退回</option>
                            <option value="2" ${redreason === '2' ? 'selected' : ''}>开票有误</option>
                            <option value="3" ${redreason === '3' ? 'selected' : ''}>服务中止</option>
                            <option value="4" ${redreason === '4' ? 'selected' : ''}>销售折让</option>
                        </select>
                    </div>
                </div>
            `);
        }
        _html.push(`
            <div class="text">
                <div class="name">备注</div>
                <div class="value">
                    <textarea class="searchInput" name="invoiceremark" maxlength="230">${invoiceremark}</textarea>
                </div>
            </div>
        `);
        return _html.join('');
    }

    // 红冲-更新发票table
    function updateFlushInvoiceTableByIndex(invoiceIndex, setScrollTop = false) {
        const bill = bills[reverseBillIndex];
        const invoices = billReverseRelationMap[bill.billPk];
        const invoiceId = invoices[invoiceIndex];
        const { hsbz, sim_original_bill_item } = reverseInvoiceMap[invoiceId];
        const { editItems } = reverseRequestMap[invoiceId];
        const listData = sim_original_bill_item.map((item, index) => ({
            ...item,
            ...editItems[index]
        }));

        // 发票
        const columns = [
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
                dataIndex: 'editXmsl',
                width: 80,
                render: (t, r, i) => {
                    const val = r.taxunitprice !== 0 ? fpy_toFixedNoZero(t) : '';
                    return r.taxunitprice != 0 ? `<input class="searchInput" type="text" name="editXmsl" value="${val}" title="${val}">` : '';
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
                render: t => {
                    const val = Number(t).toFixed(2);
                    return `<span class="tax" title="${val}">${val}</span>`;
                }
            },
            {
                title: '含税金额',
                dataIndex: 'editTaxXmje',
                width: 90,
                render: t => {
                    const val = Number(t).toFixed(2);
                    return `<input class="searchInput" type="text" name="editTaxXmje" value="${val}" title="${val}">`;
                }
            }, {
                title: '操作',
                width: 40,
                render: (t, r, i) => listData.length > 1 ? `<a class="del" href="javascript:;">删除</a>` : ''
            }
        ];

        let scrollTop;
        let tableDom;
        if (setScrollTop) {
            tableDom = $(`#imc_invoiceReverse_flush_invoice${invoiceId}`);
            scrollTop = tableDom.find('.workbench-scroll').scrollTop();
        }
        fpyTable.init({
            id: `imc_invoiceReverse_flush_invoice${invoiceId}`,
            rowKey: 'id',
            columns,
            scroll: listData.length > 8 ? { y: 208 } : {},
            dataSource: listData,
            headerColor: '#666',
            headerBgColor: '#eee',
            rowHeight: 26
        });
        // 设置滚动高度
        if (setScrollTop) {
            tableDom.find('.workbench-scroll').scrollTop(scrollTop);
        }
    }

    // 红冲-获取发票合计的html
    function getFlushInvoiceTotalHtmlByIndex(invoiceIndex) {
        const bill = bills[reverseBillIndex];
        const invoices = billReverseRelationMap[bill.billPk];
        const invoiceId = invoices[invoiceIndex];
        const { editHjbhsje, editKphjse, editJshjje } = reverseRequestMap[invoiceId];
        const _html = `
            <span class="total-item">不含税金额合计：<span class="warning invoiceamount">${Number(editHjbhsje).toFixed(2)}</span>元</span>
            <span class="total-item">税额合计：<span class="warning totaltax">${Number(editKphjse).toFixed(2)}</span>元</span>
            <span class="total-item">价税合计：<span class="warning totalamount">${Number(editJshjje).toFixed(2)}</span>元</span>
        `;
        return _html;
    }

    // 红冲-更新发票合计
    function updateFlushInvoiceTotalByIndex(invoiceIndex) {
        const bill = bills[reverseBillIndex];
        const invoices = billReverseRelationMap[bill.billPk];
        const invoiceId = invoices[invoiceIndex];
        const { editItems } = reverseRequestMap[invoiceId];

        let invoice_hjbhsje = '';
        let invoice_kphjse = '';
        let invoice_jshjje = '';
        for (let i = 0; i < editItems.length; i++) {
            invoice_hjbhsje = fpy_Add(invoice_hjbhsje, editItems[i].editXmje);
            invoice_kphjse = fpy_Add(invoice_kphjse, editItems[i].editSe);
            invoice_jshjje = fpy_Add(invoice_jshjje, editItems[i].editTaxXmje);
        }
        invoice_hjbhsje = invoice_hjbhsje.toFixed(2);
        invoice_kphjse = invoice_kphjse.toFixed(2);
        invoice_jshjje = invoice_jshjje.toFixed(2);

        reverseRequestMap[invoiceId].editHjbhsje = invoice_hjbhsje;
        reverseRequestMap[invoiceId].editKphjse = invoice_kphjse;
        reverseRequestMap[invoiceId].editJshjje = invoice_jshjje;

        const totalDom = $flush_invoice.find('.item').eq(invoiceIndex).find('.total');
        totalDom.find('.invoiceamount').text(invoice_hjbhsje);
        totalDom.find('.totaltax').text(invoice_kphjse);
        totalDom.find('.totalamount').text(invoice_jshjje);
    }

    // 红冲-编辑数量
    function flushChangeEditXmsl(v, invoiceIndex, itemIndex) {
        const bill = bills[reverseBillIndex];
        const invoices = billReverseRelationMap[bill.billPk];
        const invoiceId = invoices[invoiceIndex];
        const { sim_original_bill_item } = reverseInvoiceMap[invoiceId];
        const { editItems } = reverseRequestMap[invoiceId];

        const { num, amount, tax, taxamount } = sim_original_bill_item[itemIndex];
        const { editXmsl } = editItems[itemIndex];
        const tableDom = $(`#imc_invoiceReverse_flush_invoice${invoiceId}`).find('tbody').find('tr');

        let value = v.trim();
        if (value === '-') {
            return;
        } else if (isNaN(value)) {
            tableDom.eq(itemIndex).find(`input[name=editXmsl]`).val(editXmsl);
            // reverseCommon/tip
            model.invoke("reverseCommon/tip", '请输入数值！');
            return;
        } else {
            // 自动转换
            value = (taxamount > 0 && value < 0) || (taxamount < 0 && value > 0) ? -value : value;
        }

        const _xmsl = value;
        const percent = _xmsl / num;
        const _se = fpy_toFixedSafe(fpy_accMul(percent, tax));
        const _jshjje = fpy_toFixedSafe(fpy_accMul(percent, taxamount));
        const _hjbhsje = fpy_Minus(_jshjje, _se).toFixed(2);

        if (Math.abs(num) < Math.abs(_xmsl)) {
            tableDom.eq(itemIndex).find(`input[name=editXmsl]`).val(editXmsl);
            // reverseCommon/tip
            model.invoke("reverseCommon/tip", `明细剩余可开数量为${num}，输入不可超过该数值！`);
            return;
        } else if (Number(num) === Number(_xmsl) || Number(taxamount) === Number(_jshjje)) {
            // 相等，使用可开明细
            editItems[itemIndex].editXmsl = num;
            editItems[itemIndex].editXmje = amount;
            editItems[itemIndex].editSe = tax;
            editItems[itemIndex].editTaxXmje = taxamount;
        } else {
            // 不等，使用反算明细
            editItems[itemIndex].editXmsl = _xmsl;
            editItems[itemIndex].editXmje = _hjbhsje;
            editItems[itemIndex].editSe = _se;
            editItems[itemIndex].editTaxXmje = _jshjje;
        }

        // 赋值
        tableDom.eq(itemIndex).find('input[name=editXmsl]').val(editItems[itemIndex].editXmsl).prop('title', editItems[itemIndex].editXmsl);
        tableDom.eq(itemIndex).find('.tax').text(editItems[itemIndex].editSe).prop('title', editItems[itemIndex].editSe);
        tableDom.eq(itemIndex).find('input[name=editTaxXmje]').val(editItems[itemIndex].editTaxXmje).prop('title', editItems[itemIndex].editTaxXmje);
        tableDom.eq(itemIndex).find('.amount').text(editItems[itemIndex].editXmje).prop('title', editItems[itemIndex].editXmje);

        // 更改发票的合计
        updateFlushInvoiceTotalByIndex(invoiceIndex);
    }

    // 红冲-编辑数量-失去焦点
    function flushBlurEditXmsl(v, invoiceIndex, itemIndex) {
        v = v === '-' ? '0' : fpy_toFixedNoZero(Number(v));
        flushChangeEditXmsl(v, invoiceIndex, itemIndex);
    }

    // 红冲-编辑含税金额
    function flushChangeEditTaxXmje(v, invoiceIndex, itemIndex) {
        const bill = bills[reverseBillIndex];
        const invoices = billReverseRelationMap[bill.billPk];
        const invoiceId = invoices[invoiceIndex];
        const { sim_original_bill_item } = reverseInvoiceMap[invoiceId];
        const { editItems } = reverseRequestMap[invoiceId];

        const { num, taxunitprice, amount, tax, taxamount } = sim_original_bill_item[itemIndex];
        const { editTaxXmje } = editItems[itemIndex];
        const tableDom = $(`#imc_invoiceReverse_flush_invoice${invoiceId}`).find('tbody').find('tr');

        let value = v.trim();
        if (value === '-') {
            return;
        } else if (isNaN(value)) {
            tableDom.eq(itemIndex).find(`input[name=editTaxXmje]`).val(editTaxXmje);
            // reverseCommon/tip
            model.invoke("reverseCommon/tip", '请输入数值！');
            return;
        } else {
            // 自动转换
            value = (taxamount > 0 && value < 0) || (taxamount < 0 && value > 0) ? -value : value;
        }

        const _jshjje = value;
        const percent = _jshjje / taxamount;
        const _xmsl = taxunitprice ? fpy_toFixedNoZero(fpy_accMul(percent, num), 8) : '';
        const _se = fpy_toFixedSafe(fpy_accMul(percent, tax));
        const _hjbhsje = fpy_Minus(_jshjje, _se).toFixed(2);

        if (Math.abs(taxamount) < Math.abs(_jshjje)) {
            tableDom.eq(itemIndex).find(`input[name=editTaxXmje]`).val(editTaxXmje);
            // reverseCommon/tip
            model.invoke("reverseCommon/tip", `明细剩余可开含税金额为${taxamount}，输入不可超过该数值！`);
            return;
        } else if (Number(taxamount) === Number(_jshjje) || (taxunitprice && Number(num) === Number(_xmsl))) {
            // 相等，使用可开明细
            editItems[itemIndex].editXmsl = num;
            editItems[itemIndex].editXmje = amount;
            editItems[itemIndex].editSe = tax;
            editItems[itemIndex].editTaxXmje = taxamount;
        } else {
            // 不等，使用反算明细
            editItems[itemIndex].editXmsl = _xmsl;
            editItems[itemIndex].editXmje = _hjbhsje;
            editItems[itemIndex].editSe = _se;
            editItems[itemIndex].editTaxXmje = _jshjje;
        }

        // 赋值
        if (taxunitprice) {
            tableDom.eq(itemIndex).find('input[name=editXmsl]').val(editItems[itemIndex].editXmsl).prop('title', editItems[itemIndex].editXmsl);
        }
        tableDom.eq(itemIndex).find('.tax').text(editItems[itemIndex].editSe).prop('title', editItems[itemIndex].editSe);
        tableDom.eq(itemIndex).find('input[name=editTaxXmje]').val(editItems[itemIndex].editTaxXmje).prop('title', editItems[itemIndex].editTaxXmje);
        tableDom.eq(itemIndex).find('.amount').text(editItems[itemIndex].editXmje).prop('title', editItems[itemIndex].editXmje);

        // 更改发票的合计
        updateFlushInvoiceTotalByIndex(invoiceIndex);
    }

    // 红冲-编辑含税金额-失去焦点
    function flushBlurEditTaxXmje(v, invoiceIndex, itemIndex) {
        v = v === '-' ? '0.00' : fpy_toFixedSafe(v);
        flushChangeEditTaxXmje(v, invoiceIndex, itemIndex);
    }

    // 红冲-删除明细
    function flushDeleteItem(invoiceIndex, itemIndex) {
        const bill = bills[reverseBillIndex];
        const invoices = billReverseRelationMap[bill.billPk];
        const invoiceId = invoices[invoiceIndex];
        const { sim_original_bill_item } = reverseInvoiceMap[invoiceId];
        const { editItems } = reverseRequestMap[invoiceId];

        sim_original_bill_item.splice(itemIndex, 1);
        editItems.splice(itemIndex, 1);

        // 更改发票的合计
        updateFlushInvoiceTotalByIndex(invoiceIndex);

        // 删除html节点
        const tableDom = $(`#imc_invoiceReverse_flush_invoice${invoiceId}`).find('.workbench-table-tbody').find('tr');
        tableDom.eq(itemIndex).remove();
        console.log(tableDom);

        // 是否隐藏删除按钮
        if (editItems.length === 1) {
            tableDom.eq(0).find('.del').remove();
        }
    }

    // 重开
    function showReopen() {
        reopenOnceLoadBill();
        showReopenInvoice(reopenInvoiceIndex);
    }

    // 重开-显示单据
    function showReopenBill() {
        $reopen_bill.find('.list').html(billsDom);
    }

    // 重开-显示发票
    function showReopenInvoice(invoiceIndex = 0) {
        // 加载动画
        $reopen_invoice.addClass('actived');
        setTimeout(() => $reopen_invoice.removeClass('actived'), 100);

        reopenInvoiceIndex = invoiceIndex;

        const bill = bills[reopenBillIndex];
        const invoices = billReopenRelationMap[bill.billPk];

        const { reopenSetAll } = billsSet[reopenBillIndex];
        $reopen_setAll.prop('checked', reopenSetAll);

        const length = invoices.length;
        // 防止连续点击出错
        if (reopenInvoiceIndex < 0) {
            reopenInvoiceIndex = 0;
        }
        if (reopenInvoiceIndex >= length) {
            reopenInvoiceIndex = length - 1;
        }
        // 切换按钮
        if (reopenInvoiceIndex <= 0) {
            $reopen_prev.addClass('disabled');
        } else {
            $reopen_prev.removeClass('disabled');
        }
        if (reopenInvoiceIndex === length - 1) {
            $reopen_next.addClass('disabled');
        } else {
            $reopen_next.removeClass('disabled');
        }

        const invoiceId = invoices[reopenInvoiceIndex];
        const {
            specialtype,
            invoicetype,
            blueinvoicecode,
            blueinvoiceno,
            totalamount,
            salername,
            salertaxno,
            saleraddr,
            salerbank,
            hsbz,
            sim_original_bill_item,
        } = reopenInvoiceMap[invoiceId];
        const {
            buyername,
            buyertaxno,
            buyeraddr,
            buyerbank,
            buyerphone,
            buyeremail,
            invoiceremark,
            payee,
            reviewer,
            drawer
        } = reopenRequestMap[invoiceId];
        $reopen_invoice.attr('data-info', `发票（${reopenInvoiceIndex + 1}/${length}）`);
        // 是否收购票
        // '' '00' 非特殊票种
        // '02' 收购票
        // '06' 抵扣通行费
        // '07' 不抵扣通行费
        // '08' 成品油
        const isAcquisition = specialtype === '02';
        if (isAcquisition) {
            $reopen_top_buyer.css({ display: 'none' });
            $reopen_bottom_saler.css({ display: 'none' });
            $reopen_top_saler.css({ display: 'flex' });
            $reopen_bottom_buyer.css({ display: 'flex' });
        } else {
            $reopen_top_buyer.css({ display: 'flex' });
            $reopen_bottom_saler.css({ display: 'flex' });
            $reopen_top_saler.css({ display: 'none' });
            $reopen_bottom_buyer.css({ display: 'none' });
        }

        const isSpecial = invoicetype === '028' || invoicetype === '004';

        $reopen_invoiceType.text(`增值税${INVOICE_TYPES_DICT['k' + invoicetype] || invoicetype}${isAcquisition ? '（收购）' : ''}`);
        $reopen_code.text(blueinvoicecode).prop('title', blueinvoicecode);
        $reopen_no.text(blueinvoiceno).prop('title', blueinvoiceno);

        $reopen_buyer.find('.buyername').val(buyername).prop('disabled', reopenDataSave);
        $reopen_buyer.find('.buyertaxno').val(buyertaxno).prop('disabled', reopenDataSave);
        $reopen_buyer.find('.buyeraddr').val(buyeraddr).prop('disabled', reopenDataSave);
        $reopen_buyer.find('.buyerbank').val(buyerbank).prop('disabled', reopenDataSave);

        if (isSpecial) {
            $reopen_buyer.find('.buyertaxnoName').addClass('requiredFields');
            $reopen_buyer.find('.buyeraddrName').addClass('requiredFields');
            $reopen_buyer.find('.buyerbankName').addClass('requiredFields');
        }

        $reopen_top_other.find('.buyerphone').val(buyerphone).prop('title', reopenDataSave);
        $reopen_top_other.find('.buyeremail').val(buyeremail).prop('title', reopenDataSave);
        $reopen_jshjje.text(Number(totalamount).toFixed(2));

        $reopen_saler.find('.salername').text(salername).prop('title', salername);
        $reopen_saler.find('.salertaxno').text(salertaxno).prop('title', salertaxno);
        $reopen_saler.find('.saleraddr').text(saleraddr).prop('title', saleraddr);
        $reopen_saler.find('.salerbank').text(salerbank).prop('title', salerbank);

        $reopen_bz.val(invoiceremark).prop('disabled', reopenDataSave);

        const hsbzText = hsbz === '1' ? '' : '不';
        $reopen_item.eq(4).text(`单价（${hsbzText}含税）`);
        $reopen_item.eq(5).text(`金额（${hsbzText}含税）`);

        const _html = [];
        for (let i = 0; i < sim_original_bill_item.length; i++) {
            const cur = sim_original_bill_item[i];
            const xmsl = cur.num ? fpy_toFixedNoZero(cur.num, 8) : '';
            let xmdj = hsbz === '1' ? cur.taxunitprice : cur.unitprice;
            xmdj = xmdj ? fpy_toFixedTwoOrMore(xmdj) : '';
            const xmje = Number(hsbz === '1' ? cur.taxamount : cur.amount).toFixed(2);
            const sl = cur.taxrate && cur.taxrate !== null ? cur.taxrate * 100 + '%' : '';
            const se = Number(cur.tax).toFixed(2);
            _html.push(`<div class="line">
                <div class="item truncateText" title="${cur.goodsname}">${cur.goodsname}</div>
                <div class="item truncateText" title="${cur.specification}">${cur.specification}</div>
                <div class="item truncateText" title="${cur.unit}">${cur.unit}</div>
                <div class="item truncateText" title="${xmsl}">${xmsl}</div>
                <div class="item truncateText" title="${xmdj}">${xmdj}</div>
                <div class="item truncateText" title="${xmje}">${xmje}</div>
                <div class="item truncateText" title="${sl}">${sl}</div>
                <div class="item truncateText" title="${se}">${se}</div>
            </div>`);
        }
        $reopen_detail.html(_html.join(''));
        $reopen_operator.eq(0).val(payee);
        $reopen_operator.eq(1).val(reviewer);
        $reopen_operator.eq(2).val(drawer);

        updateReopenRightEdit();
    }

    // 重开-更新右侧编辑
    function updateReopenRightEdit() {
        const bill = bills[reopenBillIndex];
        const invoices = billReopenRelationMap[bill.billPk];
        const invoiceId = invoices[reopenInvoiceIndex];
        const reopenInvoice = reopenInvoiceMap[invoiceId];
        const reopenRequest = reopenRequestMap[invoiceId];
        const html = Object.keys(reopenRequestKeyMap).filter(key => reopenInvoice[key] !== reopenRequest[key]).map(key => (`
            <div class="item">
                <div class="name">${reopenRequestKeyMap[key]}</div>
                <div class="old-value truncateText" title="${reopenInvoice[key]}">${reopenInvoice[key]}</div>
                <div class="new-value truncateText" title="${reopenRequest[key]}">${reopenRequest[key]}</div>
            </div>
        `));
        $reopen_edit_list.html(html.join(''));
    }

    // 重开-更新数据
    function updateReopenRequestMap(name, value) {
        const bill = bills[reopenBillIndex];
        const invoices = billReopenRelationMap[bill.billPk];
        const invoiceId = invoices[reopenInvoiceIndex];
        reopenRequestMap[invoiceId][name] = value;

        // 更新单据全部发票
        if (billsSet[reopenBillIndex].reopenSetAll) {
            for (let i = 0; i < invoices.length; i++) {
                reopenRequestMap[invoices[i]][name] = value;
            }
        }

        updateReopenRightEdit();
    }

    // 作废红冲重开-提交
    function submitInvalidFlushReopenData() {
        const data = {};
        if (displayFirst === 'invalid' || displayFirst === 'flush') {
            data.reverseBill = Object.keys(reverseRequestMap).map(key => {
                const {
                    otherReason,
                    abolishreason,
                    editHjbhsje, // 去除，保障other中只包含必要数据
                    editKphjse, // 去除，保障other中只包含必要数据
                    editJshjje, // 去除，保障other中只包含必要数据
                    editItems,
                    ...other
                } = reverseRequestMap[key];
                const _abolishreason = abolishreason === INVALID_OTHER_REASON ? otherReason : abolishreason;
                const item = {
                    id: key,
                    abolishreason: _abolishreason,
                    ...other
                };
                // 红冲
                if (displayFirst === 'flush') {
                    item.sim_original_bill_item = editItems.map(o => ({
                        id: o.id,
                        num: o.editXmsl,
                        tax: o.editSe,
                        amount: o.editXmje
                    }));
                }
                return item;
            });
        }

        if (displayFirst === 'reopen' || visibleReopen) {
            data.reIssueBill = Object.keys(reopenRequestMap).map(key => (
                {
                    id: key,
                    ...reopenRequestMap[key]
                }
            ));
        }

        model.invoke('reverseReIssue/confirmIssue', data);
    }

    // 结果
    function showResult() {
        // 开票中显示
        $result_detail.show();
        // 先渲染一次页面
        showProgressTable();
    }

    // 结果-进度条Table
    function showProgressTable() {
        // 已开具
        const resultTotal = resultList.length;
        const openedList = resultList.filter(o => !(o.issuestatus === '1' || o.issuestatus === '2'));
        // 更新进度条
        let openedLength = openedList.length;
        openedLength = openedLength >= resultTotal ? resultTotal : openedLength;
        const percent = (openedLength / resultTotal * 100).toFixed(2) + '%';
        $result_progress_percent.css({ width: percent });

        const failList = resultList.filter(o => o.issuestatus === '5' || o.issuestatus === '3');
        $result_progress_text.text(`共${resultTotal}张发票，已开具${openedList.length}张，失败${failList.length}张，剩余${resultTotal - openedLength}张`);
        fpyTable.init({
            id: 'imc_invoiceReverse_detail_table',
            rowKey: 'id',
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
                    render: (t, r) => (
                        `<span
                            class="${r.issuestatus === '1' ? 'primary' : r.issuestatus === '3' ? 'error' : ''}"
                            title="${r.issuestatus === '1' ? '正在开票，请勿关闭或刷新页面' : t}"
                        >
                            ${r.issuestatus === '1' ? '正在开票，请勿关闭或刷新页面' : t}
                        </span>`
                    )
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
            // 清除计时器
            clearInterval(resultTimer);
            setTimeout(() => {
                $result_progress.hide();
                $result_detail.hide();

                const successList = resultList.filter(o => !(o.issuestatus === '5' || o.issuestatus === '3'));
                const hasPaperInvoice = successList.some(o => o.issuestatus === '0' && (o.invoicetype === '007' || o.invoicetype === '004'));
                // 纸票打印
                // if (hasPaperInvoice) {
                //     $result_print.show();
                // }
                // 一键重开
                // if (failList.length) {
                //     $result_reopen.show();
                // }
                showClassTable(failList, successList);
            }, 1000);
        } else {
            resultQueryByTimer(resultOpenType);
        }
    }

    // 结果-结果分类
    function resultClass() {
        if (resultOpenType === 'normal') {
            showProgressTable();
        } else {
            const failList = resultList.filter(o => o.issuestatus === '5' || o.issuestatus === '3' || o.issuestatus === '1');
            const successList = resultList.filter(o => !(o.issuestatus === '5' || o.issuestatus === '3' || o.issuestatus === '1'));
            const paperInvoiceList = successList.filter(o => o.issuestatus === '0' && (o.invoicetype === '007' || o.invoicetype === '004'));
            const hasPaperInvoiceNoPrint = paperInvoiceList.some(o => o.printflag !== '1');
            if (resultIsComplete) {
                // 清除计时器
                clearInterval(resultTimer);
                if (paperInvoiceList.length) {
                    $result_print.show();
                }
                if (hasPaperInvoiceNoPrint) {
                    $result_print.removeClass('disabled');
                }
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

    // 结果-分类Table
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
            }
            failScrollNum = failNum > 3 ? 3 : failNum;
            successScrollNum = 12 - failScrollNum;
        }
        if (failNum) {
            $result_fail.show();
            fpyTable.init({
                id: 'imc_invoiceReverse_fail_table',
                rowKey: 'id',
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
                        render: (t, r) => (
                            `<span
                                class="${r.issuestatus === '1' ? 'primary' : r.issuestatus === '3' ? 'error' : ''}"
                                title="${r.issuestatus === '1' ? '正在开票，请勿关闭或刷新页面' : t}"
                            >
                                ${r.issuestatus === '1' ? '正在开票，请勿关闭或刷新页面' : t}
                            </span>`
                        )
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
                id: 'imc_invoiceReverse_success_table',
                rowKey: 'id',
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
                    },
                    {
                        align: 'center',
                        title: '打印状态',
                        dataIndex: 'id',
                        width: 80,
                        render: (t, r) => (
                            (r.invoicetype === '026' || r.invoicetype === '028' || !r.printflag)
                                ? ''
                                : r.printflag === '1'
                                    ? `<span class="primary">${PRINT_FLAG_DICT['k' + r.printflag]}</span>`
                                    : `<a href="javascript:;" data-key="${t}">${PRINT_FLAG_DICT['k' + r.printflag]}</a>`
                        )
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

    // 结果-查询
    function resultQueryByTimer(type = 'normal') {
        // 是否处理完成
        resultIsComplete = false;
        resultOpenType = type;
        // 重开轮询
        clearInterval(resultTimer);
        resultTimer = setTimeout(() => {
            model.invoke('issue/showDetail');
        }, 3000);
    }

    // 退出
    $workbench.on('click', '.quit', () => {
        model.invoke('reverseCommon/close');
    });

    // 作废-作废原因
    $invalid_reason.on('change', function invalid_reason_change() {
        const value = $(this).val();
        if (value === INVALID_OTHER_REASON) {
            $invalid_other.show();
        } else {
            $invalid_other.hide();
        }
        updateReverseRequestMap('abolishreason', value);
    });

    // 作废-作废其它原因input
    $invalid_other.on('input', 'input', function invalid_other_input() {
        const maxlength = $(this).prop('maxlength');
        let value = fpy_escapeString($(this).val());
        value = fpy_getTextByMaxLength(value, maxlength);
        updateReverseRequestMap('otherReason', value);
    });

    // 作废-作废其它原因blur
    $invalid_other.on('blur', 'input', function invalid_other_input() {
        const value = $(this).val().trim();
        updateReverseRequestMap('otherReason', value);
    });

    // 作废-应用于全部发票
    $invalid_setAll.on('change', function invalid_setAll_change() {
        const value = $(this).is(':checked');
        billsSet[reverseBillIndex].reverseSetAll = value;
        if (value) {
            const bill = bills[reverseBillIndex];
            const invoices = billReverseRelationMap[bill.billPk];
            const invoiceId = invoices[reverseInvoiceIndex];
            updateReverseRequestMap('abolishreason', reverseRequestMap[invoiceId]['abolishreason']);
            updateReverseRequestMap('otherReason', reverseRequestMap[invoiceId]['otherReason']);
        }
    });

    // 作废-单据切换
    $invalid_bill.on('click', '.item', function invalid_bill_change() {
        const index = $(this).index();
        if (index !== reverseBillIndex) {
            $(this).addClass('actived').siblings('.item').removeClass('actived');
            reverseBillIndex = index;
            showInvalidInvoice();
        }
    });

    // 作废-发票-按钮显示
    $invalid_box.on('mouseover mouseout', e => {
        if (e.type === 'mouseover') {
            $invalid_prev.show();
            $invalid_next.show();
        } else if (e.type === 'mouseout') {
            $invalid_prev.hide();
            $invalid_next.hide();
        }
    });

    // 作废-发票-上一张
    $invalid_prev.on('click', function invalid_prev() {
        const disabled = $(this).hasClass('disabled');
        if (!disabled) {
            showInvalidInvoice(--reverseInvoiceIndex);
        }
    });

    // 作废-发票-下一张
    $invalid_next.on('click', function invalid_next() {
        const disabled = $(this).hasClass('disabled');
        if (!disabled) {
            showInvalidInvoice(++reverseInvoiceIndex);
        }
    });

    // 作废-下一步
    $invalid.find('.footer').on('click', '.next', () => {
        // const checkedInvoices = [];
        // const errorInvoices = [];
        // const errorInfo = [];
        // Object.keys(billReverseRelationMap).forEach(billPk => {
        //     for (let i = 0; i < billReverseRelationMap[billPk].length; i++) {
        //         const invoiceId = billReverseRelationMap[billPk][i];
        //         if (!checkedInvoices.includes(invoiceId)) {
        //             checkedInvoices.push(invoiceId);
        //             const { abolishreason, otherReason } = reverseRequestMap[invoiceId];
        //             if (!errorInvoices.includes(invoiceId)) {
        //                 if (!abolishreason || (abolishreason === INVALID_OTHER_REASON && !otherReason)) {
        //                     const bill = bills.find(o => o.billPk === billPk);
        //                     errorInfo.push(`单据编号${bill.billNo}的发票${i + 1}未选择作废理由`);
        //                     errorInvoices.push(invoiceId);
        //                 }
        //             }
        //         }
        //     }
        // });
        // if (errorInfo.length) {
        //     model.invoke('reverseCommon/tip', errorInfo.join('；'));
        //     return;
        // }
        if (visibleReopen) {
            if (reopenHadInit) {
                setCurrentDisplay('reopen');
            } else {
                model.invoke('reverseBill/nextStep');
            }
        } else {
            submitInvalidFlushReopenData();
        }
    });

    // 红冲-单据切换
    $flush_bill.on('click', '.item', function flush_bill_change() {
        const index = $(this).index();
        if (index !== reverseBillIndex) {
            $(this).addClass('actived').siblings('.item').removeClass('actived');
            reverseBillIndex = index;
            showFlushInvoice();
        }
    });

    // 红冲-input[type=text]输入
    $flush_invoice.on('input', 'input[type="text"]', function flush_invoice_input() {
        const invoiceIndex = $(this).parents('.item').index();
        const itemIndex = $(this).parents('tr').index();
        const name = $(this).prop('name');
        const maxlength = $(this).prop('maxlength');
        let value = fpy_escapeString($(this).val());
        // 输入校验
        switch (name) {
            case 'infocode':
                value = fpy_getTextByMaxLength(value.fpy_onlyNum(), maxlength);
                break;
            case 'editXmsl':
                flushChangeEditXmsl(value, invoiceIndex, itemIndex);
                break;
            case 'editTaxXmje':
                flushChangeEditTaxXmje(value, invoiceIndex, itemIndex);
                break;
            default:
                break;
        }
        // 非明细数量，价税合计输入
        if (!(name === 'editXmsl' || name === 'editTaxXmje')) {
            $(this).val(value);
            updateReverseRequestMap(name, value, invoiceIndex);
        }
    });

    // 红冲-input[type=text]失去焦点
    $flush_invoice.on('blur', 'input[type="text"]', function flush_invoice_blur() {
        const invoiceIndex = $(this).parents('.item').index();
        const itemIndex = $(this).parents('tr').index();
        const name = $(this).prop('name');
        const value = $(this).val().trim();
        // 输入校验
        switch (name) {
            case 'editXmsl':
                flushBlurEditXmsl(value, invoiceIndex, itemIndex);
                break;
            case 'editTaxXmje':
                flushBlurEditTaxXmje(value, invoiceIndex, itemIndex);
                break;
            default:
                break;
        }
        // 非明细数量，价税合计输入
        if (!(name === 'editXmsl' || name === 'editTaxXmje')) {
            $(this).val(value);
            updateReverseRequestMap(name, value, invoiceIndex);
        }

    });

    // 红冲-input[type=radio|checkbox|date]输入
    $flush_invoice.on('change', 'input[type!="text"]', function flush_invoice_change() {
        const invoiceIndex = $(this).parents('.item').index();
        const name = $(this).prop('name');
        const type = $(this).prop('type');
        const value = type === 'checkbox' ? $(this).is(':checked') : $(this).val();

        updateReverseRequestMap(name, value, invoiceIndex);
    });

    // 红冲-下拉框
    $flush_invoice.on('change', 'select', function flush_invoice_select() {
        const invoiceIndex = $(this).parents('.item').index();
        const name = $(this).prop('name');
        const value = $(this).val();
        updateReverseRequestMap(name, value, invoiceIndex);
    });

    // 红冲-textarea输入
    $flush_invoice.on('input', 'textarea', function flush_invoice_textarea() {
        const invoiceIndex = $(this).parents('.item').index();
        const name = $(this).prop('name');
        const maxlength = $(this).prop('maxlength');
        let value = fpy_escapeString($(this).val());
        value = fpy_getTextByMaxLength(value, maxlength);

        $(this).val(value);
        updateReverseRequestMap(name, value, invoiceIndex);
    });

    // 红冲-textarea输入textarea失去焦点 去除前后空格
    $flush_invoice.on('blur', 'textarea', function flush_invoice_textarea_blur() {
        const invoiceIndex = $(this).parents('.item').index();
        const name = $(this).prop('name');
        const value = $(this).val().trim();

        $(this).val(value);
        updateReverseRequestMap(name, value, invoiceIndex);
    });

    // 单据明细处理-发票明细删除
    $flush_invoice.on('click', '.del', function() {
        const invoiceIndex = $(this).parents('.item').index();
        const itemIndex = $(this).parents('tr').index();
        flushDeleteItem(invoiceIndex, itemIndex);
    });

    // 红冲-下一步
    $flush.find('.footer').on('click', '.next', () => {
        const checkedInvoices = [];
        const errorInvoices = [];
        const errorInfo = [];
        Object.keys(billReverseRelationMap).forEach(billPk => {
            for (let i = 0; i < billReverseRelationMap[billPk].length; i++) {
                const invoiceId = billReverseRelationMap[billPk][i];
                if (!checkedInvoices.includes(invoiceId)) {
                    checkedInvoices.push(invoiceId);
                    if (!errorInvoices.includes(invoiceId)) {
                        const invoiceError = [];
                        const { invoicetype } = reverseInvoiceMap[invoiceId];
                        const isSpecial = invoicetype === '028' || invoicetype === '004';
                        const { applicant, infocode, redreason } = reverseRequestMap[invoiceId];

                        if (isSpecial) {
                            if (!applicant) {
                                invoiceError.push('请选择申请方类型');
                            } else if (applicant === '1' && !infocode) {
                                invoiceError.push('购方申请红字信息编码不能为空');
                            }
                        } else if (!redreason) {
                            invoiceError.push('请选择冲红原因');
                        }

                        if (invoiceError.length) {
                            const bill = bills.find(o => o.billPk === billPk);
                            errorInfo.push(`单据编号${bill.billNo}的发票${i + 1}${invoiceError.join(',')}`);
                            errorInvoices.push(invoiceId);
                        }
                    }
                }
            }
        });
        if (errorInfo.length) {
            model.invoke('reverseCommon/tip', errorInfo.join('；'));
            return;
        }
        if (visibleReopen) {
            const data = Object.keys(reverseRequestMap).map(key => ({
                id: key,
                sim_original_bill_item: reverseRequestMap[key].editItems.map(o => ({
                    id: o.id,
                    num: o.editXmsl,
                    tax: o.editSe,
                    amount: o.editXmje
                }))
            }));
            model.invoke('reverseBill/nextStep', data);
        } else {
            submitInvalidFlushReopenData();
        }
    });

    // 重开-单据切换
    $reopen_bill.on('click', '.item', function reopen_bill_change() {
        const index = $(this).index();
        if (index !== reopenBillIndex) {
            $(this).addClass('actived').siblings('.item').removeClass('actived');
            reopenBillIndex = index;
            showReopenInvoice();
        }
    });

    // 重开-应用于全部发票
    $reopen_setAll.on('change', function reopen_setAll_change() {
        const value = $(this).is(':checked');
        billsSet[reopenBillIndex].reopenSetAll = value;
    });

    // 重开-发票-按钮显示
    $reopen_box.on('mouseover mouseout', e => {
        if (e.type === 'mouseover') {
            $reopen_prev.show();
            $reopen_next.show();
        } else if (e.type === 'mouseout') {
            $reopen_prev.hide();
            $reopen_next.hide();
        }
    });

    // 重开-发票-上一张
    $reopen_prev.on('click', function reopen_prev() {
        const disabled = $(this).hasClass('disabled');
        if (!disabled) {
            showReopenInvoice(--reopenInvoiceIndex);
        }
    });

    // 重开-发票-下一张
    $reopen_next.on('click', function reopen_next() {
        const disabled = $(this).hasClass('disabled');
        if (!disabled) {
            showReopenInvoice(++reopenInvoiceIndex);
        }
    });

    // 重开-显示右侧
    $reopen_right.on('click', function reopen_right() {
        $(this).hide();
        $reopen_left.show();
        $reopen_bill.animate({ width: 0 }, 300, function reopen_right_animate() {
            $(this).hide();
        });
        $reopen_edit.css({ display: 'flex' }).animate({ width: '248px' });
    });

    // 重开-显示左侧
    $reopen_left.on('click', function reopen_left() {
        $(this).hide();
        $reopen_right.show();
        $reopen_bill.show().animate({ width: '248px' });
        $reopen_edit.animate({ width: 0 }, 300, function reopen_left_animate() {
            $(this).hide();
        });
    });

    // 重开-右侧确认
    $reopen_edit.on('click', '.sure', () => {
        $reopen_left.hide();
        $reopen_right.show();
        $reopen_bill.show().animate({ width: '248px' });
        $reopen_edit.animate({ width: 0 }, 300, function reopen_left_animate() {
            $(this).hide();
        });
    });

    // 重开-输入 input[type=text]
    $reopen_invoice.on('input', 'input[type="text"]', function reopen_invoice_input() {
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
                value = fpy_getTextByMaxLength(value.fpy_onlyNum(), maxlength);
                break;
            case 'buyeremail':
                value = fpy_getTextByMaxLength(value.fpy_onlyEmali(), maxlength);
                break;
            default:
                break;
        }
        $(this).val(value);
        updateReopenRequestMap(name, value);
    });

    // 重开-输入失去焦点 去除前后空格
    $reopen_invoice.on('blur', 'input[type="text"]', function reopen_invoice_blur() {
        const name = $(this).prop('name');
        const value = $(this).val().trim();

        const bill = bills[reopenBillIndex];
        const invoices = billReopenRelationMap[bill.billPk];
        const invoice = reopenInvoiceMap[invoices[reopenInvoiceIndex]];
        const { invoicetype } = invoice;

        const isSpecial = invoicetype === '028' || invoicetype === '004';

        // 输入校验
        switch (name) {
            case 'buyername':
                if (!value) {
                    model.invoke('reverseCommon/tip', '请输入购方名称！');
                }
                break;
            case 'buyertaxno':
                if (isSpecial && !value) {
                    model.invoke('reverseCommon/tip', '请输入纳税人识别号！');
                }
                break;
            case 'buyeraddr':
                if (isSpecial && !value) {
                    model.invoke('reverseCommon/tip', '请输入地址、电话！');
                }
                break;
            case 'buyerbank':
                if (isSpecial && !value) {
                    model.invoke('reverseCommon/tip', '请输入开户行及账号！');
                }
                break;
            case 'buyerphone':
                if (value && !value.fpy_isPhone()) {
                    model.invoke('reverseCommon/tip', '请输入正确的手机号码！');
                }
                break;
            case 'buyeremail':
                if (value) {
                    const emails = value.split(';').filter(o => o);
                    for (const o of emails) {
                        if (o && !o.fpy_isEmail()) {
                            model.invoke('reverseCommon/tip', '请输入正确的邮箱！');
                            break;
                        }
                    }
                    if (emails.length > 3) {
                        model.invoke('reverseCommon/tip', '邮箱不能超过3个！');
                    }
                }
                break;
            default:
                break;
        }
        $(this).val(value);
        updateReopenRequestMap(name, value);
    });

    // 重开-输入textarea
    $reopen_invoice.on('input', 'textarea', function remark_input() {
        const name = $(this).prop('name');
        const maxlength = $(this).prop('maxlength');
        let value = fpy_escapeString($(this).val());
        value = fpy_getTextByMaxLength(value, maxlength);
        $(this).val(value);
        console.log('textarea input', value);
        updateReopenRequestMap(name, value);
    });

    // 重开-输入textarea失去焦点 去除前后空格
    $reopen_invoice.on('blur', 'textarea', function remark_blur() {
        const name = $(this).prop('name');
        const value = $(this).val().trim();
        $(this).val(value);
        console.log('textarea blur', value);
        updateReopenRequestMap(name, value);
    });

    // 重开-上一步
    $reopen.find('.footer').on('click', '.prev', () => {
        setCurrentDisplay(displayFirst);
    });

    // 重开-下一步
    $reopen.find('.footer').on('click', '.next', () => {
        const checkedInvoices = [];
        const errorInvoices = [];
        const errorInfo = [];
        Object.keys(billReopenRelationMap).forEach(billPk => {
            for (let i = 0; i < billReopenRelationMap[billPk].length; i++) {
                const invoiceId = billReopenRelationMap[billPk][i];
                if (!checkedInvoices.includes(invoiceId)) {
                    checkedInvoices.push(invoiceId);
                    if (!errorInvoices.includes(invoiceId)) {
                        const invoiceError = [];
                        const { invoicetype } = reopenInvoiceMap[invoiceId];
                        const isSpecial = invoicetype === '028' || invoicetype === '004';
                        const { buyername, buyertaxno, buyeraddr, buyerbank, buyeremail, buyerphone } = reopenRequestMap[invoiceId];
                        if (!buyername) {
                            invoiceError.push('请输入购方名称');
                        }
                        if (isSpecial) {
                            if (!buyertaxno) {
                                invoiceError.push('请输入购方纳税人识别号');
                            }
                            if (!buyeraddr) {
                                invoiceError.push('请输入购方地址、电话');
                            }
                            if (!buyerbank) {
                                invoiceError.push('请输入购方开户行及账号');
                            }
                        }
                        if (buyerphone && !buyerphone.fpy_isPhone()) {
                            invoiceError.push('请输入正确的手机号码');
                        }
                        if (buyeremail) {
                            const emails = buyeremail.split(';').filter(o => o);
                            for (const o of emails) {
                                if (o && !o.fpy_isEmail()) {
                                    invoiceError.push('请输入正确的邮箱');
                                    break;
                                }
                            }
                            if (emails.length > 3) {
                                invoiceError.push('邮箱不能超过3个');
                            }
                        }

                        if (invoiceError.length) {
                            const bill = bills.find(o => o.billPk === billPk);
                            errorInfo.push(`单据编号${bill.billNo}的发票${i + 1}${invoiceError.join(',')}`);
                            errorInvoices.push(invoiceId);
                        }
                    }
                }
            }
        });
        if (errorInfo.length) {
            // reverseCommon/tip
            model.invoke('reverseCommon/tip', errorInfo.join('；'));
            return;
        }

        submitInvalidFlushReopenData();
    });

    // 结果-重新开票
    $result_fail.on('click', 'a', function result_fail() {
        const key = $(this).attr('data-key');
        $result_print.addClass('disabled');
        // FIXME
        model.invoke('issue/reIssue', [key]);
        resultQueryByTimer('reopen');
    });

    // 结果-纸票打印
    $result_success.on('click', 'a', function result_success() {
        const disabled = $result_print.hasClass('disabled');
        if (!disabled) {
            const key = $(this).attr('data-key');

            const successList = resultList.filter(o => o.issuestatus === '0');
            const list007 = successList.filter(o => o.invoicetype === '007' && o.printflag !== '1').sort((a, b) => a.invoiceno - b.invoiceno);
            const list004 = successList.filter(o => o.invoicetype === '004' && o.printflag !== '1').sort((a, b) => a.invoiceno - b.invoiceno);
            if ((list007[0] && list007[0].id === key) || (list004[0] && list004[0].id === key)) {
                $result_print.addClass('disabled');
                $result_reopen.addClass('disabled');
                // FIXME
                model.invoke('issue/paperInvPrint', [key]);
                resultQueryByTimer('invoicePrint');
            } else {
                model.invoke('reverseCommon/tip', '当前打印发票非该票种的最小发票号码，请前往发票查询打印！');
            }
        } else {
            model.invoke('reverseCommon/tip', '正在打印中！');
        }
    });

    // 结果-纸票一键打印
    $result_print.on('click', function result_print() {
        const disabled = $(this).hasClass('disabled');
        if (!disabled) {
            const _data = resultList.filter(o => o.issuestatus === '0' && o.printflag !== '1').map(o => o.id);
            $result_print.addClass('disabled').next().addClass('disabled');
            // FIXME
            model.invoke('issue/paperInvPrint', _data);
            resultQueryByTimer('invoicePrint');
        }
    });

    // 结果-一键重开
    $result_reopen.on('click', function result_reopen() {
        const disabled = $(this).hasClass('disabled');
        if (!disabled) {
            const _data = resultList.filter(o => o.issuestatus === '3').map(o => o.id);
            $result_reopen.addClass('disabled').prev().addClass('disabled');
            // FIXME issue/reIssue
            model.invoke('issue/reIssue', _data);
            resultQueryByTimer('reopen');
        }
    });


    this.initInvoiceReverse = function (_model, props) {
        var popsData = {};
        if (props != null && props.data != null) {
            popsData = props.data;
        }
        model = _model;
        initEvent(model, props);
        setInitData(popsData);
    };

    this.updateInvoiceReverse = function (_model, props) {
        model = _model;
        var popsData = {};
        if (props != null && props.data != null) {
            popsData = props.data;
        }
        switch (popsData.eventKey) {
            case 'reverseBill/nextStep':
                if (popsData.errCode === '0000') {
                    initReopen(popsData);
                    setCurrentDisplay('reopen');
                }
                break;
            case 'reverseReIssue/confirmIssue':
                if (popsData.errCode === '0000') { //轮询
                    setCurrentDisplay('result');
                }
                break;
            case 'issue/showDetail':
                if (popsData.errCode === '0000') {
                    resultList = popsData.result;
                    resultIsComplete = popsData.isComplete;
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