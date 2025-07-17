/**
 *  自定义控件书写模板  
 */
(function(KDApi, $){
    // 构造函数，变量名随意，与最后一句代码的KDApi.register的第二个参数一致即可
    function CustomInvoice (model) {
        this._setModel(model)
    }
	

    // 原型中封装生命周期函数，固定格式
    CustomInvoice.prototype = {
        _setModel: function(model) {
            this.model = model
        },
        init: function(props){
            // TO DO
            initFunc(this.model, props)
        },
        update: function(props){
            // TO DO
            updateFunc(this.model, props)
        },
        destoryed: function(){
            // TO DO
            //  alert('destory: Hello World!')
        }
    }
     let tableTndex=-1
    // 替换元素id，例如 id= model.pageId + '_invoiceTable'
    function bindCusPageId(result, model) {
        var pageid = model.pageId;
        var reg = new RegExp('cus_', 'g');//创建正则表达式对象,不区分大小写,全局查找
        var htmlStr = result.replace(reg, pageid + "_");//把'cus_'替换为pageId + '_'
        return htmlStr;
    }


    // 获取当前元素pageid
    var getDataPageId = function(pageId, name){
        return  pageId + "_" + name;
    }

    // 返回不同项目云的单据id
    var handleFormId = function(pdata){
        var k = "";
        for(var p in pdata){
            if(p.indexOf("invoicebill") !== -1) {
                k = p;
            }
        }
        console.log('k',k)
        return k;
    }

    var initFunc = function(model, props) {
        var that = this;
        // KDApi.loadFile可以通过路径加载js或css文件，并且在html文件头生成script或者link标签，第一个参数是路径，第二个参数是model，第三个参数是加载完成后执行的回调函数
        // KDApi.loadFile('./css/voice.css', model, function() {
        KDApi.loadFile(['./js/Guriddo_jqGrid_JS_5.4.0/src/jquery.jqGrid.js',
            './js/jquery-ui-datepicker/jquery.ui.datepicker.js',
            './js/jquery-ui-datepicker/jquery.ui.datepicker.css',
            './css/iconfont.css', './css/invoice.css'], model, function() {
            // 后端插件通过setData传给前端的数据，前端可以通过props.data去获取
            var propsData = props.data;

            //  发票数据
            var concsInvoiceBill = JSON.parse(propsData[handleFormId(propsData)]);
            // 是否查看页面，用于锁定控件
            var isView = propsData.isView;
            // 发票类型，枚举值
            var invoicetype = JSON.parse(propsData['invoicetype']);
              // 脱敏数据
            var privacyscheme = concsInvoiceBill['privacyscheme'];
            var osp={
                decimalPlaces: 2,
                decimalSeparator: ".",
                thousandsSeparator: ","
            }
            var amount = concsInvoiceBill['amount'] ? $.fmatter.util.NumberFormat(concsInvoiceBill['amount'],osp) : '';
            var invoicecode = concsInvoiceBill['invoicecode'];
            var invoiceno = concsInvoiceBill['invoiceno'];
            var notaxamt = concsInvoiceBill['notaxamt'];
            var purbankaccount =  privacyscheme.purbankaccount || concsInvoiceBill['purbankaccount'];
            var purdepositbank = concsInvoiceBill['purdepositbank'];
            var purtaxpayer = concsInvoiceBill['purtaxpayer'];
            var purtelnumber = privacyscheme.purtelnumber || concsInvoiceBill['purtelnumber'];
            var salebankaccount = privacyscheme.salebankaccount || concsInvoiceBill['salebankaccount'];
            var saledepositbank = concsInvoiceBill['saledepositbank'];
            var saletaxpayer = concsInvoiceBill['saletaxpayer'];
            var saletelnumber =  privacyscheme.saletelnumber || concsInvoiceBill['saletelnumber'];
            var tax = concsInvoiceBill['tax'];
            var puraddress = concsInvoiceBill['puraddress'];
            var saleaddress = concsInvoiceBill['saleaddress'];
            var purorg = concsInvoiceBill['purorg'];
            var saleorg = concsInvoiceBill['saleorg'];
            var description = concsInvoiceBill['description'];
           

            console.log("初始化时的数据");
            console.log(propsData);
            console.log(concsInvoiceBill);

            // 通过路径去获取html字符串，第一个参数是路径，第二个参数是model，第三个参数是HTML模板中变量的值
            KDApi.getTemplateStringByFilePath('./html/invoice.html', model, {
                amount: amount, //价税合计-小写
                invoicecode: invoicecode, // 发票代码
                invoiceno: invoiceno, // 发票编号
                notaxamt: notaxamt, // 金额合计（元）
                purbankaccount: purbankaccount, // 购买方银行账号
                purdepositbank: purdepositbank, // 购买方开户行
                puraddress: puraddress, // 购买方地址
                purtaxpayer: purtaxpayer, // 购买方纳税人识别号
                purtelnumber: purtelnumber, // 购买方电话
                salebankaccount: salebankaccount, // 销售方银行账号
                saledepositbank: saledepositbank, // 销售方开户行
                saletaxpayer: saletaxpayer, // 销售方纳税人识别号
                saletelnumber: saletelnumber, // 销售方电话
                saleaddress: saleaddress, // 销售方地址
                tax: tax, // 税额合计
                invoicetype: invoicetype, // 发票类型
                purorg: purorg, // 购买方名称
                saleorg: saleorg, // 销售方名称
                description: description,
                isView:isView,//是否增行
                openPic: KDApi.getNameSpace(model) + './img/hide.png',
                hidePic:  KDApi.getNameSpace(model) + './img/show.png',
            }).then(function(result) {
                // console.log('替换id',result, model)
                // 替换元素id，例如 id= model.pageId + '_invoiceTable'
                model.dom.innerHTML =  bindCusPageId(result, model);

                // 初始化发票类型
                setInvoiceType(model, props);
                // 格式化开票日期
                formatInvoiceDate(model, props);
                // 初始化发票表格DOM
                createInvoiceEntryDOM(model, props);
                
                // 绑定DOM事件
                initEvent(model, props);

                // 隐藏苍穹控件
                var panelDataPageId = getDataPageId(model.pageId, 'flexpanelap');
                var $flexpanel = $('[data-page-id="' + panelDataPageId + '"]');
                $flexpanel.css({
                    'position': 'absolute',
                    'top': 0,
                    'left': 0,
                    'z-index': -1
                });

                // 隐藏基本信息折叠控件
                var contentpanel = getDataPageId(model.pageId, 'contentpanel');
                var baseinfo = $('[data-page-id="' + contentpanel + '"]');
                baseinfo.find('.ext-kdpanel-title').css('display', 'none');
            })        
        })
    }
    //控制字段显示
    function changeFieldShow(){
        
    }
    // 价税合计，将金额转换成中文
    function changeMoneyToChinese(n){
        if(n==0){
            return ''
        }
        if(!isNaN(n)){
            n = Math.abs(n);
        }
        if (!/^(-|0|[1-9]\d*)(\.\d+)?$/.test(n)){
            return "";
        }
        var unit = "仟佰拾亿仟佰拾万仟佰拾圆角分", str = "";
        n += "00";
        var p = n.indexOf('.');
        if (p >= 0){
            n = n.substring(0, p) + n.substr(p+1, 2);
        }
        unit = unit.substr(unit.length - n.length);
        for (var i=0; i < n.length; i++){
            str += '零壹贰叁肆伍陆柒捌玖'.charAt(n.charAt(i)) + unit.charAt(i);
        }
        var result = str.replace(/零(仟|佰|拾|角)/g, "零")
            .replace(/(零)+/g, "零")
            .replace(/零(万|亿|圆)/g, "$1")
            .replace(/(亿)万|壹(拾)/g, "$1$2")
            .replace(/^圆零?|零分/g,"")
            .replace(/圆$/g, "圆整");
        return result;
    }

    // 初始化发票类型
    function setInvoiceType(model, props) {
        var pData = props.data;
        var invoicetype = JSON.parse(pData[handleFormId(pData)])['invoicetype'];
        switch(invoicetype){
            case "vatSpecialInvoice":
                $('.multiselect-label', model.dom).html('增值税专用发票');
                break;
            case "vatInvoice":
                $('.multiselect-label', model.dom).html('增值税普通发票');
                break;
            case "invoice":
                $('.multiselect-label', model.dom).html('普通发票');
                break;
            case "evatSpecialInvoice":
                $('.multiselect-label', model.dom).html('电子发票（增值税专用发票）');
                break;
            case "einvoice":
                $('.multiselect-label', model.dom).html('电子发票（普通发票）');
                break;    
            default:
                $('.multiselect-label', model.dom).html('增值税专用发票');
        }

        handleRequiredStyle(model, invoicetype);
    }
    /**
     * 初始化和切换发票类型时，根据发票类型，设置字段是否必输标志
     * 添加必填标识
     * 当发票为“增值税专用发票”或“增值税普通发票”时，购买方纳税人识别号为必填项，销售方纳税人识别号为必填项。
     * 当发票为“增值税专用发票”时，必填项。购买方地址，电话，开户行，账号，销售方地址，电话，开户行，账号
     * 当发票为“电子发票（增值税专用发票）”或“电子发票（普通发票）”时,“发票代码”，“地址、电话”、“开户行及账号”不需要必录
     */
    function handleRequiredStyle(model, invoicetype) {
        if (invoicetype == 'vatSpecialInvoice') {
            $('.purTaxpayer .purchase-label', model.dom).removeClass('fillBlank').addClass('requireRED');
            $('.saleTaxpayer .sales-label',  model.dom).removeClass('fillBlank').addClass('requireRED');

            $('.puraddress .purchase-label',  model.dom).removeClass('fillBlank').addClass('requireRED');
            $('.purDepositBank .purchase-label',  model.dom).removeClass('fillBlank').addClass('requireRED');
            $('.saleAddress .sales-label',  model.dom).removeClass('fillBlank').addClass('requireRED');
            $('.saleDepositBank .sales-label',  model.dom).removeClass('fillBlank').addClass('requireRED');
            $('.invoicecode .invoicecode-label .inner-label',  model.dom).removeClass('fillBlank').addClass('require');
        }else if(invoicetype == 'vatInvoice') {
            $('.purTaxpayer .purchase-label', model.dom).removeClass('fillBlank').addClass('requireRED');
            $('.saleTaxpayer .sales-label',  model.dom).removeClass('fillBlank').addClass('requireRED');

            $('.puraddress .purchase-label',  model.dom).removeClass('requireRED').addClass('fillBlank');
            $('.purDepositBank .purchase-label',  model.dom).removeClass('requireRED').addClass('fillBlank');
            $('.saleAddress .sales-label',  model.dom).removeClass('requireRED').addClass('fillBlank');
            $('.saleDepositBank .sales-label',  model.dom).removeClass('requireRED').addClass('fillBlank');
            $('.invoicecode .invoicecode-label .inner-label',  model.dom).removeClass('fillBlank').addClass('require');
        }else if(invoicetype == 'evatSpecialInvoice' || invoicetype == 'einvoice') {
            $('.invoicecode .invoicecode-label .inner-label',  model.dom).removeClass('require').addClass('fillBlank');
            $('.puraddress .purchase-label',  model.dom).removeClass('requireRED').addClass('fillBlank');
            $('.purDepositBank .purchase-label',  model.dom).removeClass('requireRED').addClass('fillBlank');
            $('.saleAddress .sales-label',  model.dom).removeClass('requireRED').addClass('fillBlank');
            $('.saleDepositBank .sales-label',  model.dom).removeClass('requireRED').addClass('fillBlank');
        }else {
			$('.purchaseName .purchase-label', model.dom).removeClass('fillBlank').addClass('requireRED');
            $('.salesName .sales-label',  model.dom).removeClass('fillBlank').addClass('requireRED');
			
            $('.purTaxpayer .purchase-label', model.dom).removeClass('requireRED').addClass('fillBlank');
            $('.saleTaxpayer .sales-label',  model.dom).removeClass('requireRED').addClass('fillBlank');

            $('.puraddress .purchase-label',  model.dom).removeClass('requireRED').addClass('fillBlank');
            $('.purDepositBank .purchase-label',  model.dom).removeClass('requireRED').addClass('fillBlank');
            $('.saleAddress .sales-label',  model.dom).removeClass('requireRED').addClass('fillBlank');
            $('.saleDepositBank .sales-label',  model.dom).removeClass('requireRED').addClass('fillBlank');
        }
    }

    function formatInvoiceDate(model, props) {
        if (props.data) {
            var propsData = props.data;
            var concsInvoiceBill = JSON.parse(propsData[handleFormId(propsData)]);
            var bizdate = concsInvoiceBill['bizdate'];
            if(propsData.isView){
                var datearr = bizdate.substr(0,10);
                if(bizdate) {
                    // $("#cus_bizdate").val(datearr);
                    $("#"+ model.pageId + "_bizdate").val(datearr);
                }
            }

                var calcPosObj = {};
                var titlepanelflexPageId = getDataPageId(model.pageId, 'titlepanelflex');
                var contentpanelPageId = getDataPageId(model.pageId, 'contentpanel');
                var fs_baseinfoPageId = getDataPageId(model.pageId, 'fs_baseinfo');
                calcPosObj = {
                    'titlepanelflexPageId': titlepanelflexPageId,
                    'contentpanelPageId': contentpanelPageId,
                    'fs_baseinfoPageId': fs_baseinfoPageId
                };

                // 如果是编辑状态，初始化日期控件datepicker
                $.datepicker.setDefaults($.datepicker.regional['zh-CN']);
                // $("#cus_bizdate").datepicker({
                $("#"+ model.pageId + "_bizdate").datepicker({
                    altField: "#"+ model.pageId + "_bizdate", // '#cus_bizdate',
                    dateFormat:'yy-mm-dd',
                    defaultDate: null,// 如果为null，默认取当前日期
                    firstDay: 1,  // 设置一周中的第一天。星期天为0，星期一为1，以此类推。
                    changeYear: false, // 设置允许通过下拉框列表选取年份。
                    changeMonth: false, // 设置允许通过下拉框列表选取月份。
                    nextText: '', // 设置“下个月”链接的显示文字
                    prevText: '', // 设置“上个月”链接的显示文字
                    currentDay: (new Date()).getDate(),
                    currentMonth: (new Date()).getMonth(),
                    currentYear: (new Date()).getFullYear(),
                    formBillId: handleFormId(propsData), // 苍穹平台单据布局问题，需要添加一个属性，用来重新设置日期控件dom元素的位置，为了实现滚动时日期控件跟着滚动
                    calcPosObj: calcPosObj, // 苍穹平台，用来计算日期控件的position
                    invoicePageId: model.pageId, // 苍穹平台，当前页面pageid，用来做初始化日期插件的判断
                    onSelect:function(dateText,inst){
                        model.invoke('onchange_bizdate', {'value': dateText});
                    }
                });

                if(bizdate) {
                    // $("#cus_bizdate").datepicker('setDate', bizdate);
                    $("#"+ model.pageId + "_bizdate").datepicker('setDate', bizdate);
                }else {
                    // $("#cus_bizdate").datepicker('setDate', new Date());
                    $("#"+ model.pageId + "_bizdate").datepicker('setDate', new Date());
                }


        }

    }

    function createInvoiceEntryDOM(model, props) {
        var popData = props.data;
        var concsInvoiceBill = JSON.parse(popData[handleFormId(popData)]);
        var entryData = concsInvoiceBill['concs_invoiceentry'] || concsInvoiceBill['invoiceentry'];
        var isview = popData.isView;
        console.log('concsInvoiceBill',concsInvoiceBill)  
        console.log('entryData',entryData) 
        console.log('isview',isview) 
        // 合计行-金额（元）
        if(concsInvoiceBill['notaxamt']) {
            var notaxamt = concsInvoiceBill['notaxamt'];
            notaxamt = parseFloat(notaxamt).toFixed(2);
        }

        // 合计行-税额（元）
        if(concsInvoiceBill['tax']) {
            var tax = concsInvoiceBill['tax'];
            tax = parseFloat(tax).toFixed(2);
        }

        // var $table = $("#cus_invoiceTable");
        var $table = $("#"+ model.pageId +"_invoiceTable");

        // 获取隐藏发票分录明细标识
        var panelDataPageId = getDataPageId(model.pageId, 'flexpanelap1');

        if(entryData && entryData.length > 0){
            console.log("开始调用jqGird");
            var colmodels=[
                { label: '货物或应税劳务、服务名称', name: 'entry_content', width: 80, sortable: false, align: 'left', editable: isview ? false : true,
                    editrules:{
                        maxlength: 200
                    }
                },
                { label: '规格型号', name: 'entry_model', align: 'left', width: 80, sortable: false, editable: isview ? false : true,
                    editrules:{
                        maxlength: 200
                    }
                },
                { label: '单位', name: 'entry_unit', align: 'left', width: 80, sortable: false, editable: isview ? false : true,
                    edittype:'f7',
                    editoptions: {
                        f7Json:{
                            tips: '',
                            triggerTablePanelId: panelDataPageId,
                            dataBind: "unit",
                            dsTl: false,
                            id: "unit",
                            name: "unit",
                            title: "单位"
                        }
                    },
                    formatter: "f7"
                },
                { label: '数量', name: 'entry_qty', align:'right', width: 80, sortable: false, editable: isview ? false : true,
                    formatter: "number",
                    formatoptions:{
                        decimalPlaces: 2,
                        decimalSeparator: ".",
                        thousandsSeparator: ",",
                        defaultValue: ''
                    }
                },
                // sorttype is used only if the data is loaded locally or loadonce is set to true
                { label: '单价', name: 'entry_price', align:'right', width: 80, sortable: false, editable: isview ? false : true,
                    formatter: "number",
                    formatoptions:{
                        decimalPlaces: 2,
                        decimalSeparator: ".",
                        thousandsSeparator: ",",
                        defaultValue: ''
                    },
                    editrules:{
                        maxlength: 15
                    }
                },
                { label: '金额（元）', name: 'entry_notaxamt', align:'right', width: 80, sortable: false, editable: isview ? false : true,
                    formatter: "number",
                    formatoptions:{
                        decimalPlaces: 2,
                        decimalSeparator: ".",
                        thousandsSeparator: ",",
                        defaultValue: ''
                    },
                    editrules:{
                        maxlength: 15
                    }
                },
                { label: '税率', name: 'entry_taxrate', align:'right', width: 80, sortable: false, editable: isview ? false : true,
                    edittype:'f7',
                    editoptions: {
                        f7Json:{
                            tips:'per', // 以百分比显示
                            triggerTablePanelId: panelDataPageId,
                            dataBind: "taxrate",
                            dsTl: false,
                            id: "taxrate",
                            name: "taxrate",
                            title: "税率"
                        }
                    },
                    formatter: "f7",
                    formatoptions: {
                        custom_formatter_name: "taxRate"
                    }
                },
                { label: '税额（元）', name: 'entry_tax', align:'right', width: 80, sortable: false, editable: isview ? false : true,
                    formatter: "number",
                    formatoptions:{
                        decimalPlaces: 2,
                        decimalSeparator: ".",
                        thousandsSeparator: ",",
                        defaultValue: ''
                    },
                    editrules:{
                        maxlength: 15
                    }
                }];

            // 新增或编辑状态，创建编辑表格
            $("#"+ model.pageId +"_invoiceTable").jqGrid({
                datatype: "local",
                data: entryData,
                colModel: colmodels,
                cellEdit: isview ? false : true,
                autowidth: true,
                shrinkToFit: true,
                footerrow: true, // 是否开启合计行
                cellsubmit:'clientArray',// remote or 'clientArray', 默认值是remote，代表每次编辑提交后进行服务器保存，clientArray只保存到数据表格不保存到服务器
                // cellurl:'xxx',//cellsubmit要提交的后台路径
                // isClouds: true, // 用于判断是否初始化表格，由于苍穹平台发票页面是同一个页面，每次打开重新加载自定义控件，需要重新初始化
                gridComplete: function() {
                    // 设置合计行数据
                    $("#"+ model.pageId +"_invoiceTable").jqGrid("footerData", "set", {entry_content: "合计", entry_notaxamt: notaxamt, entry_tax: tax}, true);
                },
                beforeEditCell:function(rowid,iCol,cellcontent,e){
                    
                     tableTndex = parseInt(rowid) - 1;
                     console.log('点击了',tableTndex,'行')
                     
                },
                afterSaveCell:function(rowid, cellname, value, iRow, iCol) {
                    // alert("afterSaveCell");
                    // 表格单元格编辑完成后，给后台发请求
                    // 这里下标从1开始，需要减1
                    var rid = parseInt(rowid) - 1;
                    tableTndex = parseInt(rowid) - 1;
                    var opts = $table.jqGrid('getColProp', cellname);
                    if(opts.edittype == 'f7' && opts.editoptions){
                        if(opts.editoptions.f7Json.tips == 'per') {
                            value = parseInt(value).toString();
                        }
                    }

                    if(cellname !== 'entry_unit' && cellname !== 'entry_taxrate'){
                        model.invoke('onchange_' + cellname, {'rowIndex': rid.toString(), 'value': value});
                    }

                }
            });

            console.log("结束调用jqGird");

            //表格宽度自适应
            $(function(){
                $(window).resize(function(){
                    var boxwidth = $('#cusInvoiceContaniner', model.dom).width() - 2;
                    // $("#cus_invoiceTable").setGridWidth(boxwidth);
                    $("#"+ model.pageId +"_invoiceTable").setGridWidth(boxwidth);

                    //合计和价税合计
                    //hack 不能通过jquery读取元素宽度，jquery取宽度时是计算过的，这里要直接读取写在css里面的元素宽度
                    //     否则可能错位问题, 后面的+2是colResize线的宽度
                    if(document.getElementById(model.pageId + "_invoiceTable_entry_content")){
                        var widthLi1 = document.getElementById(model.pageId + "_invoiceTable_entry_content").style.width.slice(0, -2);
                        // $('#amountAndTax').css('width', widthLi1 + 'px');
                        $('#'+ model.pageId +'_amountAndTax').css('width', widthLi1 + 'px');
                    }
                });
            });

            // 点击其他位置保存正在编辑的单元格
            $(function() {
                $(document).bind('click', function (e) {
                    if (e.target == document.body  || e.target == document.getElementsByTagName("html")[0]){
                        return;
                    }
                    // 保存正在编辑的单元格内容
                    var tr = e.target.parentElement || document.activeElement;
                    var curTable = '';
                    var saveCell = '';
                    $(document).find('table[ctrlrole="editGrid"]').each(function(index, element) {
                        if ((element.p != undefined) && (element.p.savedRow.length > 0)) {
                            curTable = element;
                            saveCell = element.p.savedRow;
                        }
                    });
                    if(!saveCell || ($(tr).closest("table")[0] && $(tr).closest("table")[0].id == curTable.id)) {
                        return true;
                    }else{
                        // 有编辑器才保存
                        var lastInput = $("td:eq(" + curTable.p.savedRow[0].ic + ")", curTable.rows[curTable.p.savedRow[0].id]).find('input');
                        if(lastInput){
                            $(curTable).jqGrid("saveCell",curTable.p.iRow, curTable.p.iCol);
                        }
                    }
                });

            });
        }

    }

    // 设置输入域是否锁定
    function setCustomFieldStatus(flag, model) {
        var lockarr = ["cus_invoicecode", "cus_invoiceno", "cus_purorg", "cus_purtaxpayer", "cus_puraddress", "cus_purtelnumber" ,"cus_purdepositbank", "cus_purbankaccount", "cus_saleorg", "cus_saletaxpayer", "cus_saleaddress", "cus_saletelnumber", "cus_saledepositbank", "cus_salebankaccount", "cus_description"];
        var pageid = model.pageId;
        if(flag[0] == 'hasSubmitted' || flag == true){
            for(var i=0;i<lockarr.length;i++){
                var reg = new RegExp('cus_', 'g');//创建正则表达式对象,不区分大小写,全局查找
                var target = lockarr[i].replace(reg, pageid + "_");//把'cus_'替换为pageId + '_'
                $("#" + target).attr({
                    readonly: true,
                    disabled: 'disabled'
                });
            }
            // 查看状态，发票类型不可选
            $(".invoiceType .select-triangle", model.dom).css("display", "none");
            $(".invoiceType .multiselect-label", model.dom).css("padding-right", 0);
            $(".btn-invoiceType", model.dom).unbind('click');
            $('.invoiceType', model.dom).css('cursor', 'default');
            $('.purchase .purnamef7 .purnamef7icon', model.dom).css('cursor', 'default');
            $('.sale .salenamef7 .salenamef7icon', model.dom).css('cursor', 'default');
    
            // 查看状态，增行删行不可点击
            // $('#'+ model.pageId +'_addInvoiceTable').css('cursor', 'not-allowed');
            // $('#'+ model.pageId +'_deleteInvoiceTable').css('cursor', 'not-allowed');
            $('#'+ model.pageId +'_addInvoiceTable').css('opacity', '0');
            $('#'+ model.pageId +'_deleteInvoiceTable').css('opacity', '0');
         
            // 查看状态，日期插件不可点击
            // $('#cus_bizdate').attr('disabled', 'disabled');
            $('#'+ model.pageId +'_bizdate').attr('disabled', 'disabled');
        }else if(flag[0] == 'cancelSubmitted'){
            for(var i=0;i<lockarr.length;i++) {
                var reg = new RegExp('cus_', 'g');//创建正则表达式对象,不区分大小写,全局查找
                var target = lockarr[i].replace(reg, pageid + "_");//把'cus_'替换为pageId + '_'

                $("#" + target).removeAttr('readonly');
                $("#" + target).removeAttr('disabled');

                if(target.indexOf('purorg') > -1 || target.indexOf('saleorg') > -1){
                    $("#" + target).attr('readonly', true);
                }
            }

            // 编辑状态，发票类型可选
            $(".invoiceType .select-triangle", model.dom).css("display", "block");
            $(".invoiceType .multiselect-label", model.dom).css("padding-right", 14 + 'px');
            $('.invoiceType', model.dom).css('cursor', 'pointer');
            $('.purchase .purnamef7 .purnamef7icon', model.dom).css('cursor', 'pointer');
            $('.sale .salenamef7 .salenamef7icon', model.dom).css('cursor', 'pointer');

            // 编辑状态，日期插件可点击
            // $('#cus_bizdate').removeAttr('disabled');
            $('#' + model.pageId + '_bizdate').removeAttr('disabled');
        }
    }

    // 设置表格是否锁定
    function setInvoiceTableStatus(flag, model) {
        var edits = false;
        if(flag[0] == 'hasSubmitted'){
            edits = false;
        }else if(flag[0] == 'cancelSubmitted'){
            edits = true;
        }
        // 锁定表格
        var options = $('#'+ model.pageId +'_invoiceTable')[0].p;
        options.cellEdit = edits;
        var colModels = options.colModel;
        for (var i = 0; i < colModels.length; i++) {
            colModels[i].editable = edits;
        }
        $('#'+ model.pageId +'_invoiceTable').jqGrid('setGridParam', options);
    }

    // 发票类型事件处理
    function invoiceTypeEvents(model, props){
        $(".btn-invoiceType", model.dom).click(function () {
            var icon = $(this).find(".iconfont");
            var target = $("#" + model.pageId + "_menuinvoiceType").css("display");
            if (target == "none") {
                $("#" + model.pageId + "_menuinvoiceType").css("display", "block");
                icon.removeClass("icon-xialasanjiao").addClass("icon-shouqisanjiao");
            } else {
                $("#" + model.pageId + "_menuinvoiceType").css("display", "none");
                icon.removeClass("icon-shouqisanjiao").addClass("icon-xialasanjiao");
            }
        });

        // 发票类型点击事件
        $("#"+ model.pageId +"_menuinvoiceType ul li div", model.dom).click(function () {
            var that = $(this);
            $("#"+ model.pageId +"_menuinvoiceType ul li div").removeClass("active");
            that.addClass("active");
            $(".btn-invoiceType .multiselect-label", model.dom).html(that.html());
            $(".select-triangle .iconfont", model.dom).removeClass("icon-shouqisanjiao").addClass("icon-xialasanjiao");
            $("#"+ model.pageId +"_menuinvoiceType").css("display", "none");

            // 当发票为“增值税专用发票”或“增值税普通发票”时，购买方纳税人识别号为必填项，销售方纳税人识别号为必填项。长度20
            // if (that.attr('id') !== 'invoice') {
            $('#'+ model.pageId +'_purtaxpayer').attr('maxlength', 20);
            $('#'+ model.pageId +'_saletaxpayer').attr('maxlength', 20);
            // } else {
            // $('#'+ model.pageId +'_purtaxpayer').attr('maxlength', 30);
            // $('#'+ model.pageId +'_saletaxpayer').attr('maxlength', 30);

            // 当发票为“增值税专用发票”时，必填项。购买方地址，电话，开户行，账号，销售方地址，电话，开户行，账号，长度200
            //if (that.attr('id') == 'vatSpecialInvoice') {
            $('#'+ model.pageId +'_puraddress').attr('maxlength', 200);
            $('#'+ model.pageId +'_purtelnumber').attr('maxlength', 200);
            $('#'+ model.pageId +'_purdepositbank').attr('maxlength', 200);
            $('#'+ model.pageId +'_purbankaccount').attr('maxlength', 200);
            $('#'+ model.pageId +'_saleaddress').attr('maxlength', 200);
            $('#'+ model.pageId +'_saletelnumber').attr('maxlength', 200);
            $('#'+ model.pageId +'_saledepositbank').attr('maxlength', 200);
            $('#'+ model.pageId +'_salebankaccount').attr('maxlength', 200);
            //}
            /*else {
                $('#'+ model.pageId +'_puraddress').attr('maxlength', 80);
                $('#'+ model.pageId +'_purtelnumber').attr('maxlength', 20);
                $('#'+ model.pageId +'_purdepositbank').attr('maxlength', 100);
                $('#'+ model.pageId +'_purbankaccount').attr('maxlength', 50);
                $('#'+ model.pageId +'_saleaddress').attr('maxlength', 80);
                $('#'+ model.pageId +'_saletelnumber').attr('maxlength', 20);
                $('#'+ model.pageId +'_saledepositbank').attr('maxlength', 100);
                $('#'+ model.pageId +'_salebankaccount').attr('maxlength', 50);
            }*/
            //}


            /**
             * 添加必填标识
             * 当发票为“增值税专用发票”或“增值税普通发票”时，购买方纳税人识别号为必填项，销售方纳税人识别号为必填项。
             * 当发票为“增值税专用发票”时，必填项。购买方地址，电话，开户行，账号，销售方地址，电话，开户行，账号
             */
            var invoiceTypeID = that.attr('id');
            handleRequiredStyle(model, invoiceTypeID);


            // 发票类型，用于给后端发送请求
            model.invoke('onchange_invoicetype', {value: that.attr('id')});
        });
    }

    /**
     * 购买方名称和销售方名称F7点击，弹出苍穹F7弹框事件
     * @param model
     * @param props
     */
    function nameClickEvents(model, props) {
        var panelDataPageId = getDataPageId(model.pageId, 'flexpanelap');
        var $flexpanel = $('[data-page-id="' + panelDataPageId + '"]');

        // 由于平台改动，基础资料click改为mousedown，且改为原生事件派发的方式
        var mouseEvent = document.createEvent("MouseEvents");
		// 兼容ie
        mouseEvent.initMouseEvent("mousedown", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);

        // 购买方名称，点击整个输入域部分弹出弹框
        // $('.purnamef7icon', model.dom).click(function () {
        $('.purnamef7', model.dom).click(function () {
            // $flexpanel.find('#purorg span.kdfont-f').click();
            $flexpanel.find('#purorg span.kdfont-f')[0].dispatchEvent(mouseEvent);
        });
        // 销售方名称，点击整个输入域部分弹出弹框
        // $('.salenamef7icon', model.dom).click(function () {
        $('.salenamef7', model.dom).click(function () {
            // $flexpanel.find('#saleorg span.kdfont-f').click();
            $flexpanel.find('#saleorg span.kdfont-f')[0].dispatchEvent(mouseEvent);
        });
    }

    var initEvent = function(model, props) {
        // 如果是查看状态则锁定控件
        var isView = props.data.isView;
        if (isView) {
            setCustomFieldStatus(isView, model);
        }else {
            invoiceTypeEvents(model, props);
            nameClickEvents(model, props);
        }  
     
        $(".invoiceType .menuinvoiceType ul li:first div", model.dom).addClass("active");

        //合计和价税合计
        //hack 不能通过jquery读取元素宽度，jquery取宽度时是计算过的，这里要直接读取写在css里面的元素宽度
        //     否则可能错位问题, 后面的+2是colResize线的宽度
        var boxwidth = $('#cusInvoiceContaniner', model.dom).width() - 2;
        $("#"+ model.pageId +"_invoiceTable").setGridWidth(boxwidth);
        var adjustwidth = 0;
        if(document.getElementById(model.pageId + "_invoiceTable_entry_content") == null){
            return false;
        }else {
            adjustwidth = document.getElementById(model.pageId + "_invoiceTable_entry_content").style.width.slice(0, -2);
            $('#'+ model.pageId +'_amountAndTax').css('width', adjustwidth + 'px');
        }

        // 发票代码，用于给后端发送请求
        $('#'+ model.pageId +'_invoicecode').blur(function () {
            model.invoke('onchange_invoicecode', {value: $(this).val()});
        });
        // 发票编号，用于给后端发送请求
        $('#'+ model.pageId +'_invoiceno').blur(function () {
            model.invoke('onchange_invoiceno', {value: $(this).val()});
        });

        // 购买方银行账号，用于给后端发送请求
        $('#'+ model.pageId +'_purbankaccount').blur(function () {
            model.invoke('onchange_purbankaccount', {value: $(this).val()});
        });
        // 购买方开户行，用于给后端发送请求
        $('#'+ model.pageId +'_purdepositbank').blur(function () {
            model.invoke('onchange_purdepositbank', {value: $(this).val()});
        });
        // 购买方电话，用于给后端发送请求
        $('#'+ model.pageId +'_purtelnumber').blur(function () {
            model.invoke('onchange_purtelnumber', {value: $(this).val()});
        });
        // 购买方纳税人识别号，用于给后端发送请求
        $('#'+ model.pageId +'_purtaxpayer').blur(function () {
            model.invoke('onchange_purtaxpayer', {value: $(this).val()});
        });
        // 购买方地址，用于给后端发送请求
        $('#'+ model.pageId +'_puraddress').blur(function () {
            model.invoke('onchange_puraddress', {value: $(this).val()});
        });
        // 销售方银行账号，用于给后端发送请求
        $('#'+ model.pageId +'_salebankaccount').blur(function () {
            model.invoke('onchange_salebankaccount', {value: $(this).val()});
        });
        // 销售方开户行，用于给后端发送请求
        $('#'+ model.pageId +'_saledepositbank').blur(function () {
            model.invoke('onchange_saledepositbank', {value: $(this).val()});
        });
        // 销售方电话，用于给后端发送请求
        $('#'+ model.pageId +'_saletelnumber').blur(function () {
            model.invoke('onchange_saletelnumber', {value: $(this).val()});
        });
        // 销售方纳税人识别号，用于给后端发送请求
        $('#'+ model.pageId +'_saletaxpayer').blur(function () {
            model.invoke('onchange_saletaxpayer', {value: $(this).val()});
        });
        // 销售方地址，用于给后端发送请求
        $('#'+ model.pageId +'_saleaddress').blur(function () {
            model.invoke('onchange_saleaddress', {value: $(this).val()});
        });
        // 备注，用于给后端发送请求
        $('#'+ model.pageId +'_description').blur(function () {
            model.invoke('onchange_description', {value: $(this).val()});
        });
          // 增行，用于给后端发送请求
        $('#'+ model.pageId +'_addInvoiceTable').click(function () {
            console.log('添加行')
            if(isView){return}
            model.invoke('insertentry');
        });
        // 删行，用于给后端发送请求
        $('#'+ model.pageId +'_deleteInvoiceTable').click(function () {
            console.log('删除行',tableTndex)
            if(isView){return}
            model.invoke('deleteentry_' + tableTndex);
        });  


        var propsData = props.data;
        var concsInvoiceBill = JSON.parse(propsData[handleFormId(propsData)]);
        // 发票金额大写，取amount的值
        var capitalAmount = concsInvoiceBill['capitalAmount'];
        var amount = concsInvoiceBill['amount'];
           // 脱敏数据
           var invoicetype = concsInvoiceBill['privacyscheme'];
           var purbankaccount =  invoicetype.purbankaccount;
           var purtelnumber = invoicetype.purtelnumber;
           var salebankaccount = invoicetype.salebankaccount;
           var saletelnumber =  invoicetype.saletelnumber;
           var purbankaccountold =  concsInvoiceBill['purbankaccount'];
           var purtelnumberold =  concsInvoiceBill['purtelnumber'];
           var salebankaccountold =  concsInvoiceBill['salebankaccount'];
           var saletelnumberold =   concsInvoiceBill['saletelnumber'];
        // var purbankaccountold =  "wew";
        // var purtelnumberold =  "wergfdg";
        // var salebankaccountold = "sdfa";
        // var saletelnumberold =   "sdfsdg";
          
        if(amount){
            // $('#cus_capitalAmount').html(changeMoneyToChinese(amount));
            $('#'+ model.pageId +'_capitalAmount').html(changeMoneyToChinese(amount));
        }
        //脱敏数据显示隐藏
        //初始化隐藏
        // if(purbankaccount==purbankaccountold){
        //     $('#'+ model.pageId +'_purbankaccountShow').hide()
        // }
        // if(purtelnumber==purtelnumberold){
        //     $('#'+ model.pageId +'_purtelnumberShow').hide()
        // }
        // if(salebankaccount==salebankaccountold){
        //     $('#'+ model.pageId +'_salebankaccountShow').hide()
        // }
        // if(saletelnumber==saletelnumberold){
        //     $('#'+ model.pageId +'_saletelnumberShow').hide()
        // }
        $('#'+ model.pageId +'_purtelnumberHide').hide()
        $('#'+ model.pageId +'_purbankaccountHide').hide()
        $('#'+ model.pageId +'_salebankaccountHide').hide()
        $('#'+ model.pageId +'_saletelnumberHide').hide()
        //purtelnumber
        $('#'+ model.pageId +'_purtelnumberShow').click(function () {
            console.log('点击purtelnumber显示全部')
            purtelnumber=$('#'+ model.pageId +'_purtelnumber').val()
            $('#'+ model.pageId +'_purtelnumber').val(purtelnumberold);
            $('#'+ model.pageId +'_purtelnumberShow').hide()
            $('#'+ model.pageId +'_purtelnumberHide').show()
        });  
        $('#'+ model.pageId +'_purtelnumberHide').click(function () {
            console.log('隐藏purtelnumber')
            purtelnumberold=$('#'+ model.pageId +'_purtelnumber').val()
            $('#'+ model.pageId +'_purtelnumber').val(purtelnumber);
            $('#'+ model.pageId +'_purtelnumberHide').hide()
            $('#'+ model.pageId +'_purtelnumberShow').show()
        }); 
        //purbankaccount
        $('#'+ model.pageId +'_purbankaccountShow').click(function () {
            console.log('点击purbankaccount显示全部')
            purbankaccount=$('#'+ model.pageId +'_purbankaccount').val()
            $('#'+ model.pageId +'_purbankaccount').val(purbankaccountold);
            $('#'+ model.pageId +'_purbankaccountShow').hide()
            $('#'+ model.pageId +'_purbankaccountHide').show()
        });  
        $('#'+ model.pageId +'_purbankaccountHide').click(function () {
            console.log('隐藏purbankaccount')
            purbankaccountold=$('#'+ model.pageId +'_purbankaccount').val()
            $('#'+ model.pageId +'_purbankaccount').val(purbankaccount);
            $('#'+ model.pageId +'_purbankaccountHide').hide()
            $('#'+ model.pageId +'_purbankaccountShow').show()
        });   
         //salebankaccount
         $('#'+ model.pageId +'_salebankaccountShow').click(function () {
            console.log('点击salebankaccount显示全部')
            salebankaccount=$('#'+ model.pageId +'_salebankaccount').val()
            $('#'+ model.pageId +'_salebankaccount').val(salebankaccountold);
            $('#'+ model.pageId +'_salebankaccountShow').hide()
            $('#'+ model.pageId +'_salebankaccountHide').show()
        });  
        $('#'+ model.pageId +'_salebankaccountHide').click(function () {
            console.log('隐藏salebankaccount')
            salebankaccountold=$('#'+ model.pageId +'_salebankaccount').val()
            $('#'+ model.pageId +'_salebankaccount').val(salebankaccount);
            $('#'+ model.pageId +'_salebankaccountHide').hide()
            $('#'+ model.pageId +'_salebankaccountShow').show()
        });  
          //saletelnumber
          $('#'+ model.pageId +'_saletelnumberShow').click(function () {
            console.log('点击saletelnumber显示全部')
            saletelnumber=$('#'+ model.pageId +'_saletelnumber').val()
            $('#'+ model.pageId +'_saletelnumber').val(saletelnumberold);
            $('#'+ model.pageId +'_saletelnumberShow').hide()
            $('#'+ model.pageId +'_saletelnumberHide').show()
        });  
        $('#'+ model.pageId +'_saletelnumberHide').click(function () {
            console.log('隐藏saletelnumber')
            saletelnumberold=$('#'+ model.pageId +'_saletelnumber').val()
            $('#'+ model.pageId +'_saletelnumber').val(saletelnumber);
            $('#'+ model.pageId +'_saletelnumberHide').hide()
            $('#'+ model.pageId +'_saletelnumberShow').show()
        });  
    }

    var updateFunc = function(model, props) {
        if(props.data){
            console.log("update时的数据");
            console.log(props.data);

            var popData = props.data;
            // if(handleFormId(popData).indexOf("invoicebill") > -1){
            //     var tableNewData = JSON.parse(popData[handleFormId(popData)]);
            //     console.log('tableNewData',tableNewData)
            //     if ( tableNewData.invoiceentry) {
            //         console.log('invoiceentry',tableNewData.invoiceentry)
            //         // 更新表格数据
            //         $('#'+ model.pageId +'_invoiceTable').jqGrid('clearGridData')
            //         $('#'+ model.pageId +'_invoiceTable').jqGrid("setGridParam",{datatype: "local",data:tableNewData.invoiceentry }).tigger("reloadGrid");
            //     }
            // }
            if(handleFormId(popData).indexOf("invoicebill") > -1){
               
                var concsInvoiceBill = JSON.parse(popData[handleFormId(popData)]);
                var entryData = concsInvoiceBill['concs_invoiceentry'] || concsInvoiceBill['invoiceentry'];
                var isview = popData.isView;
                console.log('concsInvoiceBill',concsInvoiceBill)  
                console.log('entryData',entryData) 
                console.log('isview',isview) 
                  $('#'+ model.pageId +'_invoiceTable').jqGrid('clearGridData').jqGrid("setGridParam", {
                        data:entryData // 要替换的数据 dataSrc
                    })
                 .trigger("reloadGrid");  // reload显示新数据
                 var concsInvoiceBillArr = Object.keys(concsInvoiceBill);
                
               
                // 有合计行数据则更新表格合计行数据的值
                if (concsInvoiceBillArr.indexOf('amount') > -1 || concsInvoiceBillArr.indexOf('notaxamt') > -1 || concsInvoiceBillArr.indexOf('tax') > -1) {
	                 let popData=concsInvoiceBill
					if ((popData.notaxamt || popData.notaxamt == 0) && (popData.tax || popData.tax == 0)) {
						// 设置合计行数据
                        console.log("设置合计行数据",popData.notaxamt,popData.tax);
						$('#'+ model.pageId +'_invoiceTable').jqGrid("footerData", "set", {entry_content: "合计", entry_notaxamt: popData.notaxamt, entry_tax: popData.tax}, true);
					}
                    console.log("设置合计行数据333",popData.amount,popData.amount || popData.amount == 0);
					if(popData.amount || popData.amount == 0){
						var osp={
							decimalPlaces: 2,
							decimalSeparator: ".",
							thousandsSeparator: ","
						}
						$('#'+ model.pageId +'_amount').html('小写：' + $.fmatter.util.NumberFormat(popData.amount,osp));
                        console.log("小写：",popData.amount, parseFloat(popData.amount));
						// if (popData.amount && parseFloat(popData.amount) !== 0) {
							$('#'+ model.pageId +'_capitalAmount').html(changeMoneyToChinese(popData.amount));
                            console.log("onchange_capitalAmount",changeMoneyToChinese(popData.amount));
							model.invoke('onchange_capitalAmount', {value: changeMoneyToChinese(popData.amount)});
						// }
					}


                } 
                // $("#xxx").jqGrid("setGridParam", {data:dataSrc}也可以写成
                // $("#xxx").setGridParam({data:dataSrc});
                return true;
            }else {
                var updateArr = Object.keys(popData);
                console.log("update时的数据2",updateArr);
               
                // 有rowIndex则更新表格数据的值
                if (updateArr.indexOf('amount') > -1 || updateArr.indexOf('notaxamt') > -1 || updateArr.indexOf('tax') > -1 || updateArr.indexOf('entry_tax') > -1 || updateArr.indexOf('entry_notaxamt') > -1 || popData.entry_taxrate ) {
                  

                    if (popData.entry_taxrate || popData.entry_taxrate == 0) {
						$('#'+ model.pageId +'_invoiceTable').jqGrid('setCell', (popData.rowIndex + 1).toString(), 'entry_taxrate', popData.entry_taxrate);
					}
					
					if (popData.entry_tax  || popData.entry_tax == 0) {
						$('#'+ model.pageId +'_invoiceTable').jqGrid('setCell', (popData.rowIndex + 1).toString(), 'entry_tax', popData.entry_tax);
					}
					
					if (popData.entry_notaxamt || popData.entry_notaxamt == 0) {
						$('#'+ model.pageId +'_invoiceTable').jqGrid('setCell', (popData.rowIndex + 1).toString(), 'entry_notaxamt', popData.entry_notaxamt);
					}
					
					if ((popData.notaxamt || popData.notaxamt == 0) && (popData.tax || popData.tax == 0)) {
						// 设置合计行数据
						$('#'+ model.pageId +'_invoiceTable').jqGrid("footerData", "set", {entry_content: "合计", entry_notaxamt: popData.notaxamt, entry_tax: popData.tax}, true);
					}

                   
					
					if(popData.amount || popData.amount == 0){
						var osp={
							decimalPlaces: 2,
							decimalSeparator: ".",
							thousandsSeparator: ","
						}
						$('#'+ model.pageId +'_amount').html('小写：' + $.fmatter.util.NumberFormat(popData.amount,osp));
						if (popData.amount && parseFloat(popData.amount) !== 0) {
							$('#'+ model.pageId +'_capitalAmount').html(changeMoneyToChinese(popData.amount));
							model.invoke('onchange_capitalAmount', {value: changeMoneyToChinese(popData.amount)});
						}
					}
                } else if (popData.entry_unit) {
                    $('#'+ model.pageId +'_invoiceTable').jqGrid('setCell', (popData.rowIndex + 1).toString(), 'entry_unit', popData.entry_unit);
                } else if(popData.hasSubmitted) {
                    // 如果点击提交按钮，锁定控件，锁定表格
                    setCustomFieldStatus(updateArr, model);
                    setInvoiceTableStatus(updateArr, model);
                } else if(popData.cancelSubmitted) {
                    // 如果点击撤销按钮，放开控件，放开表格
                    setCustomFieldStatus(updateArr, model);
                    setInvoiceTableStatus(updateArr, model);

                    invoiceTypeEvents(model, props);
                    nameClickEvents(model, props);
                } else {
                    for (var i = 0; i < updateArr.length; i++) {
                        var curkey = updateArr[i];
                        var curval = popData[curkey];
                        // $('#cus_' + curkey).val(curval);
                        $('#'+ model.pageId +'_' + curkey).val(curval);
                    }
                }
            }

        }
    }

    // 你只需知道第一个参数是你接下来要新增控件方案时填的方案id，第二个参数是上面声明的构造函数
    KDApi.register('customInvoice', CustomInvoice)
})(window.KDApi, jQuery) // 这里的jQuery不是必须要传进去的，可移除，要用到的时候才传，PC端系统默认会有jQuery对象，版本是1.12.4