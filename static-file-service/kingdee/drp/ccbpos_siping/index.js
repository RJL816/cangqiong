/**
 * 自定义控件调用
 * @author lcy
 * @date 2021-01-25
 */
(function (KDApi, $) {

    function POS(model) {
        this._setModel(model)
    }

    //原型中封装生命周期函数
    POS.prototype = {
        _setModel: function (model) {
            this.model = model
        },
        init: function (props) {
            initFunc(this.model, props);
        },
        update: function (props) {
            updateFunc(this.model, props);
        },
        destoryed: function () {

        }
    }

    var updateFunc = function (model, props) {
        console.log("更新开始===========");
        console.log(props);
        var data = props.data && JSON.parse(props.data);
        var methodname = data && data.methodname || '';
        console.log(methodname);
        if (data && "HTTPCCBInterFace" == methodname) {
            updateHttpCCB(model, data);
        }
        if (data && "HTTPUMSInterFace" == methodname) {
            updateUMS(model, data);
        }
        if (data && "HTTPABCInterFace" == methodname) {
            updateHttpABC(model, data);
        }
        if (data && "HTTPBOCInterFace" == methodname) {
            updateWebSocketBOC(model, data);
        }
        console.log("更新结束===========");
    }

    var initFunc = function (model, props) {
    }

    /**
     * CCB获取请求参数,并执行请求方法
     * @param {*} model 
     */
    var updateHttpCCB = function (model, data) {
        var settleType = data && data.settleType || '';//交易类型
        var payAmt = data && data.payAmt || '';//金额
        var oldDate = data && data.oldDate || '';//原交易日期
        var txtOldRefSys = data && data.txtOldRefSys || '';//原系统参考号
        var txtTrace = data && data.txtTrace || '';//流水号(凭证号)
        var szFenqiNum = data && data.num || ''; //分期数
        var szGoodsCode = data && data.goodscode || ''; //商品项目编码
        var srsv = data && data.srsv || ''; //填充空格 20
        var sPrefer = data && data.sPrefer || '';//优惠券
        var sRsv = data && data.sRsv || '';//保留字段(二维码的条码数据)
        var sOrderNo = data && data.sOrderNo || ''; //商户交易订单号 30
        console.log("原交易金额=" + payAmt + "-原分期数=" + szFenqiNum);
        CCBHTTPInterFace(settleType, payAmt, oldDate, txtOldRefSys, txtTrace, szFenqiNum, szGoodsCode, srsv, sPrefer, sRsv, sOrderNo, model);
    }

    /**
     * UMS获取请求参数,并执行请求方法  一期接口 
     * @param {*} model 
     */
/*     var updateWebSocketUMS = function (model, props) {
        var applyType = props.data && props.data.applyType || ''; //应用类型2
        var posNum = props.data && props.data.posNum || ''; //POS机号8
        var posOperNum = props.data && props.data.posOperNum || ''; //POS员工号8
        var settleType = props.data && props.data.settleType || ''; //交易类型标志2
        var payAmt = props.data && props.data.payAmt || ''; //金额12
        var oldDate = props.data && props.data.oldDate || ''; //原交易日期8
        var oldRefTrans = props.data && props.data.oldRefTrans || '';//原交易参考号12
        var oldVoucher = props.data && props.data.oldVoucher || ''; //原凭证号6
        var lrc = props.data && props.data.lrc || '';//LRC校验3
        var imei = props.data && props.data.imei || ''; //串码50
        var orderNum = props.data && props.data.orderNum || ''; //银商订单号50
        var erpOrderNum = props.data && props.data.erpOrderNum || ''; //ERP订单号50
        var CToBQRId = props.data && props.data.CToBQRId || ''; //无硬件C扫B二维码ID 32
        UMSWebSocketInterFace(applyType, settleType, payAmt, oldDate, oldRefTrans, oldVoucher, imei, orderNum, model);
    } */
	
	
	/**
     * UMS获取请求参数,并执行请求方法  二期接口 
     * @param {*} model 
     */
	var updateUMS = function (model, data) {
        var applyType = data && data.applyType || ''; //应用类型2
        var posNum = data && data.posNum || ''; //POS机号8
        var posOperNum = data && data.posOperNum || ''; //POS员工号8
        var settleType = data && data.settleType || ''; //交易类型标志2
        var payAmt = data && data.payAmt || ''; //金额12
        var oldDate = data && data.oldDate || ''; //原交易日期8
        var oldRefTrans = data && data.oldRefTrans || '';//原交易参考号12
        var oldVoucher = data && data.oldVoucher || ''; //原凭证号6
        var lrc = data && data.lrc || '';//LRC校验3
        var imei = data && data.imei || ''; //串码50
        var orderNum = data && data.orderNum || ''; //银商订单号50
        var erpOrderNum = data && data.erpOrderNum || ''; //ERP订单号50
        var CToBQRId = data && data.CToBQRId || ''; //无硬件C扫B二维码ID 32
        var remarks = data && data.remarks || ''; //URL 200
        UMSWebSocketInterFace(applyType, posNum, posOperNum, settleType, payAmt, oldDate, oldRefTrans, oldVoucher, lrc, imei, orderNum, erpOrderNum, CToBQRId, remarks, model);
    }

    /**
     * ABC获取请求参数,并执行请求方法
     */
    var updateHttpABC = function (model, data) {
        var tranType = data && data.tranType || '';//交易类型 3
        var payAmt = data && data.payAmt || '';//交易金额 12
        var ogSerialNum = data && data.ogSerialNum || '';//原流水号 6
        var ogReferNum = data && data.ogReferNum || '';//原交易参考号 (刷卡交易12, 扫码交易30)
        var ogTranDate = data && data.ogTranDate || '';//原交易日期 4 MMdd
        var scanCodeType = data && data.scanCodeType || '';//扫码支付类型(0:自动,1:微信,2:支付宝,3:银联)
        var cashNum = data && data.cashNum || ''; //收银机编号 10
        var operatorNum = data && data.operatorNum || '';//操作员编号 6
        var misSerialNum = data && data.misSerialNum || '';//MIS流水号 20
        var qrCode = data && data.qrCode || ''; //二维码信息(扫码交易)
		var stageNum = data && data.stageNum || ''; //分期数
		var stageProjectCode = data && data.stageProjectCode || ''; //分期项目编码
        ABCHTTPInterFace(tranType, payAmt, ogSerialNum, ogReferNum, ogTranDate, scanCodeType, cashNum, operatorNum, misSerialNum, qrCode, stageNum, stageProjectCode, model);
    }

    /**
     * BOC获取请求参数,并执行请求方法
     */
    var updateWebSocketBOC = function (model, data) {
        var tranType = data && data.tranType || '';//交易类型
        var payAmt = data && data.payAmt || '';//金额
        var qrCode = data && data.qrCode || '';//支付码(微信,支付宝,银联二维码消费用)
        var ogOrderNo = data && data.ogOrderNo || '';//原交易订单号(微信支付宝退货用)
        var ogPayNo = data && data.ogPayNo || '';//原付款凭证号(银联二维码退货用)
        var ogTraceNo = data && data.ogTraceNo || ''; //原流水号(退货用)
        var ogInvoiceNo = data && data.ogInvoiceNo || ''; //原票据号(重打印，撤销，银联二维码撤销用)
        var ogAuthNo = data && data.ogAuthNo || ''; //原授权号
        var ogTranDate = data && data.ogTranDate || ''; //原交易日期
        var ogTranTime = data && data.ogTranTime || ''; //原交易时间
        var tableNo = data && data.tableNo || '';//款台号
        var operNo = data && data.operNo || '';//收款员号
        var fenQiNum = data && data.fenQiNum || ''; //分期数(1期: 001)
		var ogPayLsNo = data && data.ogPayLsNo || ''; //原唯一支付流水号
        console.log("原交易金额=" + payAmt + " +++ 原分期数=" + fenQiNum);
        BOCWebSocketInterFace(tranType, payAmt, qrCode, ogOrderNo, ogPayNo, ogTraceNo, ogInvoiceNo, ogAuthNo, ogTranDate, ogTranTime, tableNo, operNo, fenQiNum, model, ogPayLsNo);
    }

    var CCBHTTPInterFace = function (settleType, payAmt, oldDate, txtOldRefSys, txtTrace, szFenqiNum, szGoodsCode, srsv, sPrefer, sRsv, sOrderNo, model) {
        var strInput = "";
        var amtStr = subAmtStr(payAmt);
        payAmt = formatPayAmt(amtStr);
        szFenqiNum = parseFenQiNum(szFenqiNum);
        console.log("交易金额=" + payAmt + "-分期数=" + szFenqiNum);
        var szrsv = srsv + Generater(' ', 20 - srsv.length); //收银流水(订单)号
        var szPrefer = sPrefer + Generater(' ', 50 - sPrefer.length); //优惠券      
        var szRsv = sRsv + Generater(' ', 300 - sRsv.length); //保留字段(二维码的条码数据)
        var szOrderNo = sOrderNo + Generater(' ', 30 - sOrderNo.length); //商户交易订单号

        //(收银机号8,操作员号8,交易类型2,金额12,原交易日期8,原参考号12,流水号(凭证号)6,原批次号6,原授权码6,
        //原交易终端8,分期数2,服务人数2,商品编码12,二磁道37,三磁道104,Lrc3,szrsv20,szPrefer50,szRsv300,szOrderNo30)
        if (settleType == '00') {			//00 消费：交易类型,金额
            strInput = Generater(' ', 8) + Generater(' ', 8) + settleType + payAmt + Generater(' ', 8) + Generater(' ', 12) + Generater(' ', 6) + Generater(' ', 6) + Generater(' ', 6)
                + Generater(' ', 8) + '  ' + '  ' + Generater(' ', 12) + Generater(' ', 37) + Generater(' ', 104) + Generater(' ', 3) + szrsv + szPrefer + szRsv + szOrderNo;
        }
        else if (settleType == '01') {	//01 撤销：交易类型,金额,原流水号(凭证号)
            strInput = Generater(' ', 8) + Generater(' ', 8) + settleType + payAmt + Generater(' ', 8) + Generater(' ', 12) + txtTrace + Generater(' ', 6) + Generater(' ', 6)
                + Generater(' ', 8) + '  ' + '  ' + Generater(' ', 12) + Generater(' ', 37) + Generater(' ', 104) + Generater(' ', 3) + szrsv + szPrefer + szRsv + szOrderNo;
        }
        else if (settleType == '02') {	//02 退货：交易类型,金额,原交易参考号,原交易日期
            strInput = Generater(' ', 8) + Generater(' ', 8) + settleType + payAmt + oldDate + txtOldRefSys + Generater(' ', 6) + Generater(' ', 6) + Generater(' ', 6)
                + Generater(' ', 8) + '  ' + '  ' + Generater(' ', 12) + Generater(' ', 37) + Generater(' ', 104) + Generater(' ', 3) + szrsv + szPrefer + szRsv + szOrderNo;
        }
        else if (settleType == '04') {	//04 重打印：交易类型,原流水号(凭证号)
            strInput = Generater(' ', 8) + Generater(' ', 8) + settleType + Generater(' ', 12) + Generater(' ', 8) + Generater(' ', 12) + txtTrace + Generater(' ', 6) + Generater(' ', 6)
                + Generater(' ', 8) + '  ' + '  ' + Generater(' ', 12) + Generater(' ', 37) + Generater(' ', 104) + Generater(' ', 3) + szrsv + szPrefer + szRsv + szOrderNo;
        }
        else if (settleType == '14') {	//14 商场分期：交易类型,金额,分期数,商品项目编码 (商场分期数只能是03,06,09,12,18,24,36)
            strInput = Generater(' ', 8) + Generater(' ', 8) + settleType + payAmt + Generater(' ', 8) + Generater(' ', 12) + Generater(' ', 6) + Generater(' ', 6) + Generater(' ', 6)
                + Generater(' ', 8) + szFenqiNum + '  ' + szGoodsCode + Generater(' ', 37) + Generater(' ', 104) + Generater(' ', 3) + szrsv + szPrefer + szRsv + szOrderNo;
        }
        else if (settleType == '16') {	//16 分期撤销：交易类型,原流水号(凭证号)
            strInput = Generater(' ', 8) + Generater(' ', 8) + settleType + Generater(' ', 12) + Generater(' ', 8) + Generater(' ', 12) + Generater(' ', 6) + Generater(' ', 6) + Generater(' ', 6)
                + Generater(' ', 8) + '  ' + '  ' + Generater(' ', 12) + Generater(' ', 37) + Generater(' ', 104) + Generater(' ', 3) + szrsv + szPrefer + szRsv + szOrderNo;
        }
        else if (settleType == '17') {	//17 分期退货：交易类型,金额,原交易参考号,原交易日期
            strInput = Generater(' ', 8) + Generater(' ', 8) + settleType + Generater(' ', 12) + Generater(' ', 8) + Generater(' ', 12) + Generater(' ', 6) + Generater(' ', 6) + Generater(' ', 6)
                + Generater(' ', 8) + '  ' + '  ' + Generater(' ', 12) + Generater(' ', 37) + Generater(' ', 104) + Generater(' ', 3) + szrsv + szPrefer + szRsv + szOrderNo;
        }
        else if (settleType == '60') {	//60 微信/支付宝(聚合支付用户被扫)：交易类型,金额,保留字段(条码数据)
            strInput = Generater(' ', 8) + Generater(' ', 8) + settleType + payAmt + Generater(' ', 8) + Generater(' ', 12) + Generater(' ', 6) + Generater(' ', 6) + Generater(' ', 6)
                + Generater(' ', 8) + '  ' + '  ' + Generater(' ', 12) + Generater(' ', 37) + Generater(' ', 104) + Generater(' ', 3) + szrsv + szPrefer + szRsv + szOrderNo;
        }
        else if (settleType == '62') {	//62 聚合支付退货：交易类型,金额
            strInput = Generater(' ', 8) + Generater(' ', 8) + settleType + payAmt + Generater(' ', 8) + Generater(' ', 12) + Generater(' ', 6) + Generater(' ', 6) + Generater(' ', 6)
                + Generater(' ', 8) + '  ' + '  ' + Generater(' ', 12) + Generater(' ', 37) + Generater(' ', 104) + Generater(' ', 3) + szrsv + szPrefer + szRsv + szOrderNo;
        }
        else if (settleType == '66') {	//66 聚合支付扫码补单：交易类型,保留字段(订单数据)
            strInput = Generater(' ', 8) + Generater(' ', 8) + settleType + Generater(' ', 12) + Generater(' ', 8) + Generater(' ', 12) + Generater(' ', 6) + Generater(' ', 6) + Generater(' ', 6)
                + Generater(' ', 8) + '  ' + '  ' + Generater(' ', 12) + Generater(' ', 37) + Generater(' ', 104) + Generater(' ', 3) + szrsv + szPrefer + szRsv + szOrderNo;
        }
        else if (settleType == '64') {	//64 单笔聚合支付异常订单查询：交易类型,保留字段(订单数据)
            strInput = Generater(' ', 8) + Generater(' ', 8) + settleType + Generater(' ', 12) + Generater(' ', 8) + Generater(' ', 12) + Generater(' ', 6) + Generater(' ', 6) + Generater(' ', 6)
                + Generater(' ', 8) + '  ' + '  ' + Generater(' ', 12) + Generater(' ', 37) + Generater(' ', 104) + Generater(' ', 3) + szrsv + szPrefer + szRsv + szOrderNo;
        }
        else if (settleType == '72') {	//72 聚合支付异常订单查询：交易类型
            strInput = Generater(' ', 8) + Generater(' ', 8) + settleType + Generater(' ', 12) + Generater(' ', 8) + Generater(' ', 12) + Generater(' ', 6) + Generater(' ', 6) + Generater(' ', 6)
                + Generater(' ', 8) + '  ' + '  ' + Generater(' ', 12) + Generater(' ', 37) + Generater(' ', 104) + Generater(' ', 3) + szrsv + szPrefer + szRsv + szOrderNo;
        }
        else if (settleType == 'XX') {	//优惠立减 优惠券(暂未确定)
            strInput = Generater(' ', 8) + Generater(' ', 8) + settleType + Generater(' ', 12) + Generater(' ', 8) + Generater(' ', 12) + Generater(' ', 6) + Generater(' ', 6) + Generater(' ', 6)
                + Generater(' ', 8) + '  ' + '  ' + Generater(' ', 12) + Generater(' ', 37) + Generater(' ', 104) + Generater(' ', 3) + szrsv + szPrefer + szRsv + szOrderNo;
        }
        console.log("strInput=" + strInput);

        var url = "http://127.0.0.1:5555";
        var requestStr = "getRequestDataByCCB";
        sendHttp(strInput, url, model, requestStr);
    }



     /* var UMSWebSocketInterFace = function (applyType, settleType, payAmt, oldDate, oldRefTrans, oldVoucher, imei, orderNum, model) {
        var strInput = "";
        var amtStr = subAmtStr(payAmt);
        payAmt = formatPayAmt(amtStr);
        console.log("交易金额=" + payAmt);

        imei = imei + Generater(' ', 50 - imei.length); //串码
        orderNum = orderNum + Generater(' ', 50 - orderNum.length); //商户订单号
        //(应用类型2,POS机号8,POS员工号8,交易类型标志2,金额12,原交易日期8,原交易参考号12,原凭证号6,LRC校验3,串码50,银商订单号50,ERP订单号50,无硬件C扫B二维码ID 32,商品信息10000)
        //00-公共资源   04银行卡(websocket请求)
        if (applyType == '00') {
            if (settleType == '01') {	//01撤销 金额，原流水号
                strInput = applyType + settleType + payAmt + Generater(' ', 8) + Generater(' ', 12) + oldVoucher
                    + LRC() + Generater(' ', 50) + Generater(' ', 50) + Generater(' ', 50) + Generater(' ', 32);
            } else if (settleType == '02') {     //退货
                strInput = applyType + settleType + payAmt + oldDate + oldRefTrans + Generater(' ', 6)
                    + LRC() + Generater(' ', 50) + Generater(' ', 50) + Generater(' ', 50) + Generater(' ', 32);
            } else if (settleType == '04') {     //重打印
                strInput = applyType + settleType + Generater(' ', 12) + Generater(' ', 8) + Generater(' ', 12) + oldVoucher
                    + LRC() + Generater(' ', 50) + Generater(' ', 50) + Generater(' ', 50) + Generater(' ', 32);
                /*} else if (settleType == '06') {     //结算
                    strInput = applyType + Generater(' ', 8) + Generater(' ', 8) + settleType + Generater(' ', 12) + Generater(' ', 8) + Generater(' ', 12) + Generater(' ', 6)
                        + LRC() + Generater(' ', 50) + Generater(' ', 50) + Generater(' ', 50) + Generater(' ', 32);
                } else if (settleType == '07') {     //重打结算单
                    strInput = applyType + Generater(' ', 8) + Generater(' ', 8) + settleType + Generater(' ', 12) + Generater(' ', 8) + Generater(' ', 12) + Generater(' ', 6)
                        + LRC() + Generater(' ', 50) + Generater(' ', 50) + Generater(' ', 50) + Generater(' ', 32);
            }
        }else if(applyType == '04'){
			if (settleType == '00') {			//00消费: 金额
                strInput = applyType + settleType + payAmt + Generater(' ', 8) + Generater(' ', 12) + Generater(' ', 6)
                    + LRC() + Generater(' ', 50) + Generater(' ', 50) + Generater(' ', 50) + Generater(' ', 32);
            } 
		}
		    console.log("strInput=" + strInput);

            var url = "ws://127.0.0.1:1818";
            var requestStr = "getRequestDataByUMS";
            sendWebSocket(strInput, url, model, requestStr);
    }  */
	
	var UMSWebSocketInterFace = function (applyType, posNum, posOperNum, settleType, payAmt, oldDate, oldRefTrans, oldVoucher, lrc, imei, orderNum, erpOrderNum, CToBQRId, remarks, model) {

        var strInput = "";
        var amtStr = subAmtStr(payAmt);
        payAmt = formatPayAmt(amtStr);
        console.log("交易金额=" + payAmt);

        imei = imei + Generater(' ', 50 - imei.length); //串码
        orderNum = orderNum + Generater(' ', 50 - orderNum.length); //商户订单号
        //(应用类型2,POS机号8,POS员工号8,交易类型标志2,金额12,原交易日期8,原交易参考号12,原凭证号6,
        //LRC校验3,串码50,银商订单号50,ERP订单号50,无硬件C扫B二维码ID 32,商品信息10000)
        //00-银行卡(websocket请求)
        if (applyType == '00') {	//公共资源
			if (settleType == '01') {	//01撤销 金额，原流水号
				strInput = getStrInput(applyType, settleType, payAmt, '', '', oldVoucher, '', '');
            } else if (settleType == '02') {     //退货
				strInput = getStrInput(applyType, settleType, payAmt, oldDate, oldRefTrans, '', '', '');
            } else if (settleType == '03') {     //查余额
				strInput = getStrInput(applyType, settleType, '', '', '', '', '', '');
            } else if (settleType == '04') {     //重打印
				strInput = getStrInput(applyType, settleType, '', '', '', oldVoucher, '', '');
            } else if (settleType == '05') {     //签到
				strInput = getStrInput(applyType, settleType, '', '', '', '', '', '');
            } else if (settleType == '06') {     //结算-不在此次任务内
				strInput = getStrInput(applyType, settleType, '', '', '', '', '', '');
            } else if (settleType == '07') {     //重打结算单-不在此次任务内
				strInput = getStrInput(applyType, settleType, '', '', '', '', '', '');
            } else if (settleType == '08') {     //打印交易汇总
				strInput = getStrInput(applyType, settleType, '', '', '', '', '', '');
            } else if (settleType == '09') {     //换班
				strInput = getStrInput(applyType, settleType, '', '', '', '', '', '');
            }
        } else if (applyType == '01') {	//全民惠
            if (settleType == '00') {			//00消费: 金额
				strInput = getStrInput(applyType, settleType, payAmt, '', '', '', '', '');
            }
        } else if (applyType == '04') {	//银行卡
            if (settleType == '00') {			//00消费: 金额
				strInput = getStrInput(applyType, settleType, payAmt, '', '', '', '', '');
            } else if (settleType == '15') {     //分期消费
				strInput = getStrInput(applyType, settleType, payAmt, '', '', '', '', '');
            }
        } else if (applyType == '09') {	//四平二维码传输
            if (settleType == '21') {			//二维码信息传输
				strInput = getStrInput(applyType, settleType, payAmt, '', '', '', '', remarks);
            }
        } 
		console.log("strInput=" + strInput);

		var url = "ws://127.0.0.1:1818";
		var requestStr = "getRequestDataByUMS";
		sendWebSocket(strInput, url, model, requestStr);
    }

    var ABCHTTPInterFace = function (tranType, payAmt, ogSerialNum, ogReferNum, ogTranDate, scanCodeType, cashNum, operatorNum, misSerialNum, qrCode, stageNum, stageProjectCode, model) {
        var strInput = "";
        var amtStr = subAmtStr(payAmt);
        payAmt = formatPayAmt(amtStr);
        console.log(tranType + "| 交易金额=" + payAmt);

        cashNum = rightFillSpace(cashNum, 10); //收银机编号
        operatorNum = rightFillSpace(operatorNum, 6); //操作员编号
        var strIn_18 = Generater(' ', 18);
        var strIn_20 = Generater(' ', 20);
        var strIn_40 = Generater(' ', 40);

        if (tranType == 'S01') {    //消费=S01
            strInput = tranType + payAmt + strIn_18 + cashNum + operatorNum + strIn_20 + strIn_40;
        }
        else if (tranType == 'V01') {	//撤销=V01
            strInput = tranType + payAmt + rightFillSpace(ogSerialNum, 18) + cashNum + operatorNum + strIn_20 + strIn_40;
        }
        else if (tranType == 'S21') {	//扫码支付(被扫)=S21
            var str_S21 = "0" + scanCodeType;
            strInput = tranType + payAmt + rightFillSpace(str_S21, 18) + cashNum + operatorNum + strIn_20 + rightFillSpace(qrCode, 40);
        }
        else if (tranType == 'R21') {	//扫码退货=R21
            strInput = tranType + payAmt + strIn_18 + cashNum + operatorNum + strIn_20 + rightFillSpace(ogReferNum, 40);
        }
        else if (tranType == 'S03'){	//分期消费=S03
            var stageNo = getStageNo(stageNum);  
            strInput = tranType + payAmt + stageNo + cashNum + operatorNum + strIn_20 +  rightFillSpace(stageProjectCode, 32);
        }
        else if (tranType == 'P02') {	//重打任意笔=P02 (流水号)
            strInput = tranType + payAmt + rightFillSpace(ogSerialNum, 18) + cashNum + operatorNum + strIn_20 + strIn_40;
        }
        else if (tranType == 'R01') {	//退货=R01
            var str_R01 = ogReferNum + "" + ogTranDate;
            strInput = tranType + payAmt + rightFillSpace(str_R01, 18) + cashNum + operatorNum + strIn_20 + strIn_40;
        }
        console.log("strInput=" + strInput);

        var url = "http://127.0.0.1:8089/trans";
        var requestStr = "getRequestDataByABC";
        sendHttp(strInput, url, model, requestStr);
    }

    var BOCWebSocketInterFace = function (tranType, payAmt, qrCode, ogOrderNo, ogPayNo, ogTraceNo, ogInvoiceNo, ogAuthNo, ogTranDate, ogTranTime, tableNo, operNo, fenQiNum, model, ogPayLsNo) {
        var reqXML;
        var amtStr = subAmtStr(payAmt);
        payAmt = formatPayAmt(amtStr);
        if (fenQiNum != '') {
            fenQiNum = formatBOCFenQiNum(fenQiNum);
        }
        console.log("交易金额=" + payAmt + " +++ 分期数=" + fenQiNum);
        if (tranType == '00' || tranType == '01' || tranType == '05' || tranType == '06' ||tranType == '08' || tranType == '15' || tranType == '74' || tranType == '17') {
            //00 消费; 01 撤销; 05 退货; 06 分期支付 08 分期付款退货; 15重打印; 17查流水(查对应方式的流水); 74 微信,支付宝/订单查询
            reqXML = packReqXml(tranType, payAmt, qrCode, ogOrderNo, ogPayNo, ogTraceNo, ogInvoiceNo, ogAuthNo, ogTranDate, ogTranTime, tableNo, operNo, fenQiNum, ogPayLsNo);
        }
        console.log("reqXML=" + reqXML);
        var url = "ws://127.0.0.1:6868";
        var requestStr = "getRequestDataByBOC";
        sendWebSocket(reqXML, url, model, requestStr);
    }

    /**
         * send http request
         * @param {*} strInput request param
         */
    var sendHttp = function (strInput, url, model, requestStr) {
        var iRet;
        var xmlHttpRequest;
        //1.创建XMLHttpRequest  
        if (window.ActiveXObject) { //如果是IE浏览器
            xmlHttpRequest = new ActiveXObject("Microsoft.XMLHTTP");
        } else if (window.XMLHttpRequest) { //非IE浏览器  
            xmlHttpRequest = new XMLHttpRequest();
        }
        //2.设置回调函数  
        xmlHttpRequest.onreadystatechange = function () {
            //回调函数
            if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200) {
                iRet = xmlHttpRequest.responseText;
                if (requestStr == "getRequestDataByCCB") {
                    var data = parseCCBData(iRet);
                    model.invoke(requestStr, data);
                }
                if (requestStr == "getRequestDataByABC") {
                    var data = parseABCData(iRet);
                    model.invoke(requestStr, data);
                }
            }
        };
        //3.初始化XMLHttpRequest组建  
        xmlHttpRequest.open("POST", url, true);
        //4.发送请求  
        xmlHttpRequest.send(strInput);
        console.log("请求参数：" + strInput);
    }

    /**
     * send WebSocket
     * @param {*} strInput inputParam
     */
    var sendWebSocket = function (strInput, url, model, requestStr) {
        try {
            //检测当前浏览器是否支持websocket模式
            window.WebSocket = window.WebSocket || window.MozWebSocket;
            if (!window.WebSocket) {
                alert("This browser not supported WebSocket!!!");
                return;
            }
            ws = new WebSocket(url);//连接服务器	
            ws.onopen = function (event) {
                console.log("已经与服务器建立了连接\r\n当前连接状态：" + this.readyState); //alert
                flag = 0;
                ws.send(strInput);
            };
            ws.onmessage = function (event) {
                var iRet = event.data; //回调函数
                console.log("接收到服务器发送的数据：\r\n" + iRet); //alert
                if (requestStr == "getRequestDataByUMS") {
                    var data = parseUMSData(iRet);
                    model.invoke(requestStr, data);
                }
                if (requestStr == "getRequestDataByBOC") {
                    var endData = parseBOCData(iRet);
                    model.invoke(requestStr, endData);
                }
                flag = 1;
            };
            ws.onclose = function (event) {
                console.log("已经与服务器断开连接\r\n当前连接状态：" + this.readyState); //alert
            };
            ws.onerror = function (event) {
                if (flag != 1)
                    alert("WebSocket接收异常!");
            };
        } catch (ex) {
            alert(ex.message);
        }
    }

    /**
     * 解析建行回调数据
     * @returns result(json)
     */
    var parseCCBData = function (outPutData) {
        console.log(outPutData);
        var code = outPutData.substr(0, 2).trim();
        var bankCode = outPutData.substr(2, 4).trim(); //银行行号 4
        var cardNo = outPutData.substr(6, 30).trim(); //卡号 30
        var expr = outPutData.substr(36, 4).trim(); //有效期 4
        var amount = outPutData.substr(40, 12).trim(); //金额 12
        var trace = outPutData.substr(52, 6).trim(); //流水号 6
        var refer = outPutData.substr(58, 12).trim(); //参考号 12
        var auth = outPutData.substr(70, 6).trim(); //授权号 6
        var batch = outPutData.substr(76, 6).trim(); //批次号 6
        var date = outPutData.substr(82, 14).trim(); //交易日期 14
        var userNo = outPutData.substr(96, 15).trim(); //商户号 15
        var terNo = outPutData.substr(111, 8).trim(); //终端号 8
        var oldTerNo = outPutData.substr(119, 8).trim(); //原终端号 8
        var errorDesc = subChineseStr(outPutData, 127, 50).trim(); //错误说明 50
        var chineseNum = getChineseNum(errorDesc);
        var rsv = outPutData.substr(177 - chineseNum, 50).trim(); //保留字段 50
        var trans = outPutData.substr(227 - chineseNum, 2).trim(); //交易类型 2
        var channelType = outPutData.substr(229 - chineseNum, 2).trim(); //支付类型 2
        var lrc = outPutData.substr(231 - chineseNum, 3).trim(); //LRC校验码 3
        console.log(errorDesc + "-" + chineseNum + "-" + trans + "-" + lrc);
        console.log(code + "-" + bankCode + "-" + cardNo + "-" + expr + "-" + amount + "-" + trace + "-" + refer + "-" + auth + "-" + batch + "-" + date + "-" + userNo + "-" + terNo + "-" + oldTerNo + "-" + errorDesc + "-" + rsv + "-" + trans + "-" + channelType + "-" + lrc);

        //返回json对象
        var result = {
            code: code,
            data: {
                bankCode: bankCode,
                cardNo: cardNo,
                expr: expr,
                amount: amount,
                trace: trace,
                refer: refer,
                auth: auth,
                batch: batch,
                date: date,
                userNo: userNo,
                terNo: terNo,
                oldTerNo: oldTerNo,
                errorDesc: errorDesc,
                rsv: rsv,
                trans: trans,
                channelType: channelType,
                lrc: lrc
            }
        }
        return result;
    }

    /**
     * 解析银联回调数据
     * @returns result(json)
     */
    /* var parseUMSData = function (outPutData) {
        console.log(outPutData);
        var code = outPutData.substr(0, 2);
        var bankCode = outPutData.substr(2, 4); //银行行号 4
        var cardNo = outPutData.substr(6, 20); //卡号 
        var voucherNum = outPutData.substr(26, 6); //凭证号 
        var amount = outPutData.substr(32, 12); //实付金额
        //var errorDesc = outPutData.substr(44, 36); //错误说明 
        var errorDesc = subChineseStr(outPutData, 44, 40).trim(); //错误说明
        var cnNum1 = getChineseNum(errorDesc);
        var userNo = outPutData.substr(84 - cnNum1, 15); //商户号 
        var terNo = outPutData.substr(99 - cnNum1, 8); //终端号 
        var batch = outPutData.substr(107 - cnNum1, 6); //批次号 
        var transDate = outPutData.substr(113 - cnNum1, 4); //交易日期 
        var transTime = outPutData.substr(117 - cnNum1, 6); //交易时间 
        var refer = outPutData.substr(123 - cnNum1, 12); //交易参考号 
        var auth = outPutData.substr(135 - cnNum1, 6); //授权号 
        var clearDate = outPutData.substr(141 - cnNum1, 4); //清算日期 
        var lrc = outPutData.substr(145 - cnNum1, 3); //LRC校验 
        var discAmount = outPutData.substr(148 - cnNum1, 12); //优惠金额 
        var cardType = outPutData.substr(160 - cnNum1, 2); //卡类型 
        //var thirdDisc = outPutData.substr(158, 200); //第三方优惠说明
        var thirdDisc = subChineseStr(outPutData, 162 - cnNum1, 200).trim(); //第三方优惠说明
        var cnNum2 = getChineseNum(thirdDisc);
        //var thirdPlatform = outPutData.substr(358, 50); //第三方平台 
        var thirdPlatform = subChineseStr(outPutData, 362 - cnNum1 - cnNum2, 50).trim(); //第三方平台
        var cnNum3 = getChineseNum(thirdPlatform);
        var orderNum = outPutData.substr(412 - cnNum1 - cnNum2 - cnNum3, 50); //银商订单号 
        var erpOrderNum = outPutData.substr(462 - cnNum1 - cnNum2 - cnNum3, 50); //ERP订单号 
        var payType = outPutData.substr(512 - cnNum1 - cnNum2 - cnNum3, 1); //支付方式 1
        var resultState = outPutData.substr(513 - cnNum1 - cnNum2 - cnNum3, 1); //查询结果状态 1
        var resultDesc = outPutData.substr(514 - cnNum1 - cnNum2 - cnNum3, 50); //查询结果描述50
        var cToBQR = outPutData.substr(564 - cnNum1 - cnNum2 - cnNum3, 200); //无硬件C扫B二维码200
        var cToBDate = outPutData.substr(764 - cnNum1 - cnNum2 - cnNum3, 8); //无硬件C扫B账单时间8
        var cToBState = outPutData.substr(772 - cnNum1 - cnNum2 - cnNum3, 20); //无硬件C扫B订单状态20
        console.log(code + "-" + bankCode + "-" + cardNo + "-" + voucherNum + "-" + amount + "-" + errorDesc + "-" + userNo + "-" + terNo + "-" + batch + "-" + transDate + "-" + transTime + "-" + refer + "-" + auth + "-" + clearDate + "-" + lrc + "-" + discAmount + "-" + cardType + "-" + thirdDisc + "-" + thirdPlatform + "-" + orderNum + "-" + erpOrderNum + "-" + payType + "-" + resultState + "-" + resultDesc + "-" + cToBQR + "-" + cToBDate + "-" + cToBState);

        //返回json对象
        var result = {
            code: code,
            data: {
                bankCode: bankCode,
                cardNo: cardNo,
                voucherNum: voucherNum,
                amount: amount,
                errorDesc: errorDesc,
                userNo: userNo,
                terNo: terNo,
                batch: batch,
                transDate: transDate,
                transTime: transTime,
                refer: refer,
                auth: auth,
                clearDate: clearDate,
                lrc: lrc,
                discAmount: discAmount,
                cardType: cardType,
                thirdDisc: thirdDisc,
                thirdPlatform: thirdPlatform,
                orderNum: orderNum,
                erpOrderNum: erpOrderNum,
                payType: payType,
                resultState: resultState,
                resultDesc: resultDesc,
                cToBQR: cToBQR,
                cToBDate: cToBDate,
                cToBState: cToBState
            }
        }
        return result;
    } */
	
	
	var parseUMSData = function (outPutData) {
        console.log(outPutData);
		var curIndex = [0];
		
        var code = getSubStr(outPutData, curIndex, 2);	//返回码
        var bankName = getSubStr(outPutData, curIndex, 8, true); //发卡行名称
        //var bankCode = getSubStr(outPutData, curIndex, 4); //银行行号 4
        var cardNo = getSubStr(outPutData, curIndex, 20); //卡号 
        var voucherNum = getSubStr(outPutData, curIndex, 6); //凭证号 
        var amount = getSubStr(outPutData, curIndex, 12); //实付金额 
        var errorDesc = getSubStr(outPutData, curIndex, 40, true); //错误说明 
        var userNo = getSubStr(outPutData, curIndex, 15); //商户号 
        var terNo = getSubStr(outPutData, curIndex, 8); //终端号 
        var batch = getSubStr(outPutData, curIndex, 6); //批次号 
        var transDate = getSubStr(outPutData, curIndex, 4); //交易日期 
        var transTime = getSubStr(outPutData, curIndex, 6); //交易时间 
        var refer = getSubStr(outPutData, curIndex, 12); //交易参考号 
        var auth = getSubStr(outPutData, curIndex, 6); //授权号 
        var clearDate = getSubStr(outPutData, curIndex, 4); //清算日期 
        var lrc = getSubStr(outPutData, curIndex, 3); //LRC校验 
        //var discAmount = getSubStr(outPutData, curIndex, 12); //优惠金额 
        var discAmount = getSubStr(outPutData, curIndex, 12); //原交易金额 
        var thirdAmount = getSubStr(outPutData, curIndex, 12); //第三方补贴金额 
        var merchantAmount = getSubStr(outPutData, curIndex, 12); //商户让利金额 
        var creditAmount = getSubStr(outPutData, curIndex, 12); //积分抵扣 
        //var cardType = getSubStr(outPutData, curIndex, 2); //卡类型 
        var creditMark = getSubStr(outPutData, curIndex, 2); //借贷记标识 
        var cardOrg = getSubStr(outPutData, curIndex, 3); //国际卡组织 
        var thirdDisc = getSubStr(outPutData, curIndex, 200); //第三方优惠说明 
        var thirdPlatform = getSubStr(outPutData, curIndex, 50); //第三方平台 
        var orderNum = getSubStr(outPutData, curIndex, 50); //银商订单号 
        var erpOrderNum = getSubStr(outPutData, curIndex, 50); //ERP订单号 
        var payType = getSubStr(outPutData, curIndex, 1); //支付方式 1
        var resultState = getSubStr(outPutData, curIndex, 1); //查询结果状态 1
        var resultDesc = getSubStr(outPutData, curIndex, 50); //查询结果描述50
        var cToBQR = getSubStr(outPutData, curIndex, 200); //无硬件C扫B二维码200
        var cToBDate = getSubStr(outPutData, curIndex, 8); //无硬件C扫B账单时间8
        var cToBState = getSubStr(outPutData, curIndex, 20); //无硬件C扫B订单状态20
        console.log(code + "-" + bankName + "-" + cardNo + "-" + voucherNum + "-" 
		+ amount + "-" + errorDesc + "-" + userNo + "-" + terNo + "-" + batch 
		+ "-" + transDate + "-" + transTime + "-" + refer + "-" + auth + "-" 
		+ clearDate + "-" + lrc + "-" + discAmount + "-" + thirdAmount + "-" 
		+ merchantAmount + "-" + creditAmount + "-" + creditMark + "-" + cardOrg + "-" 
		+ thirdDisc + "-" + thirdPlatform + "-" + orderNum + "-" + erpOrderNum 
		+ "-" + payType + "-" + resultState + "-" + resultDesc + "-" + cToBQR 
		+ "-" + cToBDate + "-" + cToBState);

        //返回json对象
        var result = {
            code: code,
            data: {
                bankName: bankName,
                cardNo: cardNo,
                voucherNum: voucherNum,
                amount: amount,
                errorDesc: errorDesc,
                userNo: userNo,
                terNo: terNo,
                batch: batch,
                transDate: transDate,
                transTime: transTime,
                refer: refer,
                auth: auth,
                clearDate: clearDate,
                lrc: lrc,
                discAmount: discAmount,
                thirdAmount: thirdAmount,
                merchantAmount: merchantAmount,
                creditAmount: creditAmount,
                creditMark: creditMark,
                cardOrg: cardOrg,
                thirdDisc: thirdDisc,
                thirdPlatform: thirdPlatform,
                orderNum: orderNum,
                erpOrderNum: erpOrderNum,
                payType: payType,
                resultState: resultState,
                resultDesc: resultDesc,
                cToBQR: cToBQR,
                cToBDate: cToBDate,
                cToBState: cToBState
            }
        }
        return result;
    }

    /**
     * 解析农行回调数据
     * @returns result(json)
     */
    var parseABCData = function (outPutData) {
        var code = outPutData.substr(0, 2).trim();
        var retMsg = subChineseStr(outPutData, 2, 40).trim(); //返回消息 50
        var CNNum1 = getChineseNum(retMsg);
        var tranType = outPutData.substr(42 - CNNum1, 3).trim(); //交易类型 3
        var tranName = subChineseStr(outPutData, 45 - CNNum1, 12).trim(); //交易名称 12
        var CNNum2 = getChineseNum(tranName);
        console.log(retMsg + "-" + CNNum1 + " & " + tranName + "-" + CNNum2);
        var cardNo = outPutData.substr(57 - CNNum1 - CNNum2, 19).trim(); //卡号 19
        var amount = outPutData.substr(76 - CNNum1 - CNNum2, 12).trim(); //金额 12
        console.log(code + "-" + retMsg + "-" + tranType + "-" + tranName + "-" + cardNo + "-" + amount);

        var result;
        if ("00" == code) { //交易成功 
            var endAllInfor = outPutData.substring(88 - CNNum1 - CNNum2);
            console.log(endAllInfor);
            var strArr = [];
            strArr = parseABCSpecialStr(endAllInfor);
            console.log(strArr);

            result = {
                code: code,
                data: {
                    retMsg: retMsg,
                    tranType: tranType,
                    tranName: tranName,
                    cardNo: cardNo,
                    amount: amount,
                    //VOU(或NVL)|商户名称|商户编号|终端编号|操作员编号|卡种类|卡号|卡顺序号|交易类型|卡失效期|批次号|流水号|交易日期时间|授权码|交易参考号
                    //|交易金额|备注|结算类型|结算日期时间|交易统计|折扣金额|条码支付订单号
                    vouchInfor: strArr[0], //凭证信息标识(VOU:存在,NVL:不存在)
                    merchName: strArr[1], //商户名称
                    merchNum: strArr[2], //商户编号
                    posNum: strArr[3], //终端编号
                    operatorNum: strArr[4], //操作员编号
                    cardType: strArr[5], //卡种类
                    cardNum: strArr[6], //卡号
                    cardSerNum: strArr[7], //卡顺序号
                    transType: strArr[8], //交易类型
                    cardExpireDate: strArr[9], //卡失效期
                    batchNum: strArr[10], //批次号
                    traceNum: strArr[11], //流水号
                    tranTime: strArr[12], //交易日期时间
                    authNum: strArr[13], //授权码
                    referNum: strArr[14], //交易参考号
                    transAmt: strArr[15], //交易金额
                    note: strArr[16], //备注
                    settleType: strArr[17], //结算类型(0:银行卡,1:微信,2:支付宝,3:银联二维码)
                    settleTime: strArr[18], //结算日期时间
                    transCount: strArr[19], //交易统计
                    dctAmount: strArr[20], //折扣金额
                    codeOrderNum: strArr[21], //条码支付订单号
                    actualTime: strArr[22]
                }
            }
        } else { //交易失败
            result = {
                code: code,
                data: {
                    retMsg: retMsg,
                    tranType: tranType,
                    tranName: tranName
                }
            }
        }
        return result;
    }

    /**
     * 解析中行回调数据，从xml中获取节点内容
     * @param {*} outPutData 
     * @returns result(json)
     */
    var parseBOCData = function (outPutData) {
        var parser = new DOMParser(); //创建文档对象
        var xmlDoc = parser.parseFromString(outPutData, "text/xml");
        var countrys = xmlDoc.getElementsByTagName('SPOS'); //获取跟节点数据
        console.log("xmlSize=" + countrys.length);
        for (var i = 0; i < countrys.length; i++) {
            //arr.push(countrys[i].textContent);
            var tranType = getXMLNodeValue(countrys, i, "TranType"); //交易类型
            var retMsg = getXMLNodeValue(countrys, i, "RetMsg"); //交易返回中文解释
            var code = getXMLNodeValue(countrys, i, "RetCode"); //交易返回码
            console.log(tranType + "-" + retMsg + "-" + code);
            var result;
            if ("00" == code) { //交易成功 
                var amount = getXMLNodeValue(countrys, i, "Amount");
                var cardNo = getXMLNodeValue(countrys, i, "CardNo");
                var expire = getXMLNodeValue(countrys, i, "Expire");
                var cardName = getXMLNodeValue(countrys, i, "CardName");
                var cardType = getXMLNodeValue(countrys, i, "CardType");
                var merchantNo = getXMLNodeValue(countrys, i, "MerchantNo");
                var terminalNo = getXMLNodeValue(countrys, i, "TerminalNo");
                var batchNo = getXMLNodeValue(countrys, i, "BatchNo");
                var traceNo = getXMLNodeValue(countrys, i, "TraceNo");
                var sysRRN = getXMLNodeValue(countrys, i, "SysRRN");
                var authNo = getXMLNodeValue(countrys, i, "AuthNo");
                var invoiceNo = getXMLNodeValue(countrys, i, "InvoiceNo");
                var orderNo = getXMLNodeValue(countrys, i, "OrderNo");
                var payNo = getXMLNodeValue(countrys, i, "PayNo");
                var payLsNo = getXMLNodeValue(countrys, i, "PayLsNo");
                var tranDate = getXMLNodeValue(countrys, i, "TranDate");
                var tranTime = getXMLNodeValue(countrys, i, "TranTime");
                var payCh = getXMLNodeValue(countrys, i, "PayCh");
                var dctAmount = getXMLNodeValue(countrys, i, "DctAmount");
                var tableNo = getXMLNodeValue(countrys, i, "TableNo");
                var operNo = getXMLNodeValue(countrys, i, "OperNo");
                var append1 = getXMLNodeValue(countrys, i, "Append1");
                var append2 = getXMLNodeValue(countrys, i, "Append2");
                var append3 = getXMLNodeValue(countrys, i, "Append3");
                var fqDownPayAmt = getXMLNodeValue(countrys, i, "FqDownPayAmt");
                var fqPayBackAmt = getXMLNodeValue(countrys, i, "FqPayBackAmt");
                var fqCostAmt = getXMLNodeValue(countrys, i, "FqCostAmt");
                var fqPlanNo = getXMLNodeValue(countrys, i, "FqPlanNo");
                console.log(amount + "-" + cardNo + "-" + expire + "-" + cardName + "-" + cardType + "-" + merchantNo + "-" + terminalNo + "-" + batchNo + "-" + traceNo + "-" + sysRRN + "-" + authNo + "-" + invoiceNo + "-" + orderNo + "-" + payNo + "-" + payLsNo + "-" + tranDate + "-" + tranTime + "-" + payCh + "-" + dctAmount + "-" + tableNo + "-" + operNo + "-" + fqDownPayAmt + "-" + fqPayBackAmt + "-" + fqCostAmt + "-" + fqPlanNo);

                result = {
                    code: code,
                    data: {
                        retMsg: retMsg,
                        tranType: tranType,
                        amount: amount,
                        cardNo: cardNo,
                        expire: expire,
                        cardName: cardName,
                        cardType: cardType,
                        merchantNo: merchantNo,
                        terminalNo: terminalNo,
                        batchNo: batchNo,
                        traceNo: traceNo,
                        sysRRN: sysRRN,
                        authNo: authNo,
                        invoiceNo: invoiceNo,
                        orderNo: orderNo,
                        payNo: payNo,
                        payLsNo: payLsNo,
                        tranDate: tranDate,
                        tranTime: tranTime,
                        payCh: payCh,
                        dctAmount: dctAmount,
                        tableNo: tableNo,
                        operNo: operNo,
                        fqDownPayAmt: fqDownPayAmt,//分期首付金额
                        fqPayBackAmt: fqPayBackAmt,//分期月还款金额
                        fqCostAmt: fqCostAmt,//分期手续费金额
                        fqPlanNo: fqPlanNo,//分期计划号
                        append1: append1,
                        append2: append2,
                        append3: append3
                    }
                }
            } else { //交易失败
                result = {
                    code: code,
                    data: {
                        retMsg: retMsg,
                        tranType: tranType
                    }
                }
            }
            console.log("result=" + result);
        }
        return result;
    }

    /**
     * 获取xml数据各子节点下的值
     * @param {*} countrys xml
     * @param {*} i 
     * @param {*} nodeKey 节点name
     */
    function getXMLNodeValue(countrys, i, nodeKey) {
        var returnValue = "";
        var nodeName = countrys[i].getElementsByTagName(nodeKey)[0];
        if (nodeName != undefined) {
            var firstChildName = nodeName.firstChild;
            if (firstChildName != null) {
                returnValue = firstChildName.nodeValue;
                return returnValue;
            }
        }
        return returnValue;
    }

    /**
    * 中行：组xml接口请求数据
    * <?xml version="1.0" encoding="GB2312"?>
    * <SPOS>
    *     <TranType></TranType>
    *     <Amount>000000000001</Amount>
    *     <..>....</..>
    * </SPOS>
    */
    var packReqXml = function (tranType, payAmt, qrCode, ogOrderNo, ogPayNo, ogTraceNo, ogInvoiceNo, ogAuthNo, ogTranDate, ogTranTime, tableNo, operNo, fenQiNum, ogPayLsNo) {
        var xmlDOM = createXMLDOM();
        if (xmlDOM) {
            var spos = xmlDOM.createElement('SPOS');
            //1.交易类型 2
            var tranTypeXml = xmlDOM.createElement('TranType');
            tranTypeXml.appendChild(xmlDOM.createTextNode(tranType));
            spos.appendChild(tranTypeXml);
            //2.交易金额 12
            var amountXml = xmlDOM.createElement('Amount');
            amountXml.appendChild(xmlDOM.createTextNode(payAmt));
            spos.appendChild(amountXml);

            if (tranType == '00') { //00消费
                if (qrCode.length > 10) { //扫码消费(支付二维码)
                    var qrCodeXml = xmlDOM.createElement('QrCode');
                    qrCodeXml.appendChild(xmlDOM.createTextNode(qrCode)); //数字字母 64
                    spos.appendChild(qrCodeXml);
                }
            }
            if (tranType == '01') {	//01撤销
                if (ogOrderNo.length > 10) { //扫码撤销
                    var ogOrderNoXML = xmlDOM.createElement('OgOrderNo'); //原交易订单号 33
                    ogOrderNoXML.appendChild(xmlDOM.createTextNode(ogOrderNo));
                    spos.appendChild(ogOrderNoXML);

                    var ogPayLsNoXml = xmlDOM.createElement('OgPayLsNo'); //原唯一支付流水号 33(扫码交易唯一标识码,联迪设备无需传该字段)
                    ogPayLsNoXml.appendChild(xmlDOM.createTextNode(ogPayLsNo));
                    spos.appendChild(ogPayLsNoXml);
                }
                else if (ogPayNo.length > 10) { //银联二维码撤销
                    var ogPayNoXML = xmlDOM.createElement('OgPayNo'); //付款凭证号 33
                    ogPayNoXML.appendChild(xmlDOM.createTextNode(ogPayNo));
                    spos.appendChild(ogPayNoXML);
                }
                else if (ogInvoiceNo.length > 0) { //银行卡撤销
                    var ogInvoiceNoXml = xmlDOM.createElement('OgInvoiceNo'); //原票据号 6
                    ogInvoiceNoXml.appendChild(xmlDOM.createTextNode(ogInvoiceNo));
                    spos.appendChild(ogInvoiceNoXml);
                }
            }
            if (tranType == '05') {	//05退货
                if (ogOrderNo.length > 10) { //扫码退货
                    var ogOrderNoXML = xmlDOM.createElement('OgOrderNo'); //原交易订单号 33
                    ogOrderNoXML.appendChild(xmlDOM.createTextNode(ogOrderNo));
                    spos.appendChild(ogOrderNoXML);
                }
                else if (ogPayNo.length > 10) { //银联二维码退货
                    var ogPayNoXML = xmlDOM.createElement('OgPayNo'); //付款凭证号 33
                    ogPayNoXML.appendChild(xmlDOM.createTextNode(ogPayNo));
                    spos.appendChild(ogPayNoXML);
                }
                var ogTraceNoXML = xmlDOM.createElement('OgTraceNo'); //原流水号 6
                ogTraceNoXML.appendChild(xmlDOM.createTextNode(ogTraceNo));
                spos.appendChild(ogTraceNoXML);
                var ogAuthNoXML = xmlDOM.createElement('OgAuthNo'); //原授权号 6
                ogAuthNoXML.appendChild(xmlDOM.createTextNode(ogAuthNo));
                spos.appendChild(ogAuthNoXML);
                var ogTranDateXML = xmlDOM.createElement('OgTranDate'); //原交易日期 8
                ogTranDateXML.appendChild(xmlDOM.createTextNode(ogTranDate));
                spos.appendChild(ogTranDateXML);
                var ogTranTimeXML = xmlDOM.createElement('OgTranTime'); //原交易时间 6
                ogTranTimeXML.appendChild(xmlDOM.createTextNode(ogTranTime));
                spos.appendChild(ogTranTimeXML);
            }
			 if (tranType == '06') { //06分期支付
                if (fenQiNum.length == 3) { //分期消费(分期数)
                    var fenQiNumXml = xmlDOM.createElement('FenQiNum'); //003
                    fenQiNumXml.appendChild(xmlDOM.createTextNode(fenQiNum));
                    spos.appendChild(fenQiNumXml);
                }
            }		
            if (tranType == '08') {	//08 分期付款退货
                var ogTraceNoXML = xmlDOM.createElement('OgTraceNo'); //原流水号
                ogTraceNoXML.appendChild(xmlDOM.createTextNode(ogTraceNo));
                spos.appendChild(ogTraceNoXML);
                var ogAuthNoXML = xmlDOM.createElement('OgAuthNo'); //原授权号
                ogAuthNoXML.appendChild(xmlDOM.createTextNode(ogAuthNo));
                spos.appendChild(ogAuthNoXML);
                var ogTranDateXML = xmlDOM.createElement('OgTranDate'); //原交易日期
                ogTranDateXML.appendChild(xmlDOM.createTextNode(ogTranDate));
                spos.appendChild(ogTranDateXML);
                var ogTranTimeXML = xmlDOM.createElement('OgTranTime'); //原交易时间
                ogTranTimeXML.appendChild(xmlDOM.createTextNode(ogTranTime));
                spos.appendChild(ogTranTimeXML);
            }
            if (tranType == '15') {	//15重打印
                var ogInvoiceNoXml = xmlDOM.createElement('OgInvoiceNo');
                ogInvoiceNoXml.appendChild(xmlDOM.createTextNode(ogInvoiceNo));
                spos.appendChild(ogInvoiceNoXml);
            }
            /*if (tranType == '17') {	//17 查流水(查对应方式的流水: 0：IST + 银联二维码,1: 微信 + 支付宝)
                var payChXml = xmlDOM.createElement('PayCh'); //交易渠道 5
                payChXml.appendChild(xmlDOM.createTextNode(payCh));
                spos.appendChild(payChXml);
            }*/
            if (tranType == '74') {	//74 微信,支付宝/订单查询
                var ogPayLsNoXml = xmlDOM.createElement('OgPayLsNo'); //原唯一支付流水号(扫码交易唯一标识码)
                ogPayLsNoXml.appendChild(xmlDOM.createTextNode(ogPayLsNo));
                spos.appendChild(ogPayLsNoXml);
            }
            //3.款台号 8
            var tableNoXml = xmlDOM.createElement('TableNo');
            tableNoXml.appendChild(xmlDOM.createTextNode(tableNo));
            spos.appendChild(tableNoXml);
            //4.收款员号 9
            var operNoXml = xmlDOM.createElement('OperNo');
            operNoXml.appendChild(xmlDOM.createTextNode(operNo));
            spos.appendChild(operNoXml);

            xmlDOM.appendChild(spos);
            return parserXMLToString(xmlDOM);
        }
        return;
    }

    function createXMLDOM() {
        var xmlDOM;
        if (window.ActiveXObject) {
            var pi;
            xmlDOM = new ActiveXObject('Microsoft.XMLDOM');
            pi = xmlDOM.createProcessingInstruction("xml", "version=\"1.0\" encoding=\"gb2312\"");
            xmlDOM.appendChild(pi);
        }
        else if (document.implementation && document.implementation.createDocument) {
            var pi;
            xmlDOM = document.implementation.createDocument('', '', null);
            pi = xmlDOM.createProcessingInstruction("xml", "version=\"1.0\" encoding=\"gb2312\"");
            xmlDOM.appendChild(pi);
        }
        else {
            alert('您的浏览器不支持文档对象XMLDOM');
            return;
        }
        return xmlDOM;
    }

    function parserXMLToString(xmlDOM) {
        if (window.ActiveXObject) {
            return xmlDOM.xml;
        }
        else if (document.implementation
            && document.implementation.createDocument) {
            return new XMLSerializer().serializeToString(xmlDOM);
        }
    }

    /**
     * 处理中行分期数  1 -> 001
     */
    var formatBOCFenQiNum = function (str) {
        while (str.length < 3) {
            str = "0" + str;
        }
        return str;
    }

    /**
     * 截取回调数据的特殊部分(农行用)
     * @param {*} endInfor --> "VOU|测试商户| |01农业银行|622848*********7477|"
     * @returns 填充各域数据的arr[]
     */
    function parseABCSpecialStr(endInfor) {
        var retArr = [];
        for (var i = 0; i < endInfor.length;) {
            var x = endInfor.indexOf("|");
            if (x != -1) {
                var retStr = endInfor.substring(0, x);
                retArr.push(retStr);
                endInfor = endInfor.substring(x + 1);
            }
        }
        return retArr;
    }

    /**
     * 给字符串右补空格直至达到指定位数
     * @param {*} len 指定位数
     */
    var rightFillSpace = function (str, len) {
        var i = 0;
        for (; i < len; ++i) {
            str = str + " ";
        }
        return str;
    }

    /**
     * 分期数处理
     * 3 -> 03
     */
    var parseFenQiNum = function (szFenqiNum) {
        if (szFenqiNum.length == 1) {
            szFenqiNum = "0" + szFenqiNum;
        }
        if (szFenqiNum.length == 0) {
            szFenqiNum = "00";
        }
        return szFenqiNum;
    }

    /**
     * 三位随机数
     */
    var LRC = function () {
        var num = '';
        for (var i = 0; i < 3; i++) {
            num += Math.floor(Math.random() * 10);
        }
        return num;
    }

    //获取str的中文个数
    var getChineseNum = function (str) {
        re = /[\u4E00-\u9FA5]/g; //中文字符的正则
		var num= 0;
		if(str.match(re) != null){
			num = str.match(re).length;  //计算中文的个数
		}
        return num;
    }
    //截取带有中文的str
    var subChineseStr = function (str, begin, len) {
        if ((!str && typeof (str) != 'undefined')) {
            return '';
        }
		
        var num = 0;
        var strs = str;
        var str = '';
        for (var i = begin, lens = strs.length; i < lens; i++) {
            num += ((strs.charCodeAt(i) > 255) ? 2 : 1);
            if (num > len) {
                break;
            } else {
                str = strs.substring(begin, i + 1);
            }
        }
        return str;
    }

    var Generater = function (resvr, len) {
        var s = "";
        var i = 0;
        for (; i < len; ++i) {
            s = s + resvr;
        }
        return s;
    }

    /**
     * 无论传入几位小数,此处暂按两位小数处理
     * eg:1.2355  -->  1.23
     * @param {*} str 
     */
    var subAmtStr = function (str) {
        var index = String(str).indexOf(".") + 1;
        var count = String(str).length - index;
        if (index == "0") {
            str = str + ".00";
            return str;
        } else if (count == "1") {
            str = str + "0";
            return str;
        }
        str = str.slice(0, index + 2);
        return str;
    }

    /**
     * 格式化输入的支付金额
     * eg:0.01  -->  001  -->  000000000001
     *    1.00  -->  100  -->  000000000100
     *    123450.23  -->  12345023  -->  000012345023
     * @param {*} str 
     */
    var formatPayAmt = function (str) {
        str = str.replace(".", "");
        while (str.length < 12) {
            str = "0" + str;
        }
        return str;
    }
	
	/**
	 * 中行请求参数构建
	 */
	var getStrInput = function (applyType, settleType, payAmt, oldDate, oldRefTrans, oldVoucher, CToBQRId, remarks){
		return applyType + settleType//应用类型,交易类型标志
		+dealData(payAmt, 12)//金额
		+dealData(oldDate, 8)//原交易日期8
		+dealData(oldRefTrans, 12)//原交易参考号12
		+dealData(oldVoucher, 6)//原凭证号6
		+LRC()//LRC校验3
		+Generater(' ', 50)//增值信息50
		+Generater(' ', 50)//银商订单号50
		+Generater(' ', 50)//ERP订单号/商户流水号50
		+dealData(CToBQRId, 32)//无硬件C扫B二维码ID32
		+Generater(' ', 20)//商户账单号20
		+dealData(remarks, 200)//URL200
		;
	}
	
	var dealData = function(curData, curLength){
		return (curData.length == 0 ? Generater(' ', curLength) : curData)
	}
	
	var getSubStr = function(curData, curIndex, curLength) {
		return getSubStr(curData, curIndex, curLength, false);
	}
	
	var getSubStr = function(curData, curIndex, curLength, isChinese) {
		var startIndex = curIndex[0];
		curIndex[0] = startIndex + curLength;

		if (isChinese){
			var subStr = subChineseStr(curData, startIndex, curLength).trim();
			curIndex[0] -= getChineseNum(subStr);
			return subStr;
		} else{
			return curData.substr(startIndex, curLength).trim();
		}
	}

	var getStageNo = function(stageNum){
		if(stageNum.length == 1){
			return rightFillSpace(stageNum, 17)
		}else if(stageNum.length == 2){
			return rightFillSpace(stageNum, 16)
		}
	}

    KDApi.register('ccbpos_siping', POS)
})(window.KDApi, jQuery)
