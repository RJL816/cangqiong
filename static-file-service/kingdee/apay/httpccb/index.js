
/**
 *  自定义控件书写模板
 */
(function(KDApi, $){
    // 构造函数，变量名随意，与最后一句代码的KDApi.register的第二个参数一致即可
    function HTTPCCB (model) {
        this._setModel(model)
    }

    // 原型中封装生命周期函数，固定格式
    HTTPCCB.prototype = {
        _setModel: function(model) {
            this.model = model
        },
        init: function(props){
            initFunc(this.model, props);
        },
        update: function(props){
            updateFunc(this.model,props);
        },
        destoryed: function(){

        }
    }
    var updateFunc = function(model,props){
        console.log("更新开始===========");
        console.log(props);
        var methodname = props.data && props.data.methodname || '';
        console.log(methodname);
        if(props.data && "HTTPCCBInterFace" == methodname){
            updateHttpCCB(model,props);
        }
        console.log("更新结束===========");
    }

    var initFunc = function(model, props) {
    }

    /**
     * CCB获取请求参数,并执行请求方法
     * @param {*} model 
     */
    var updateHttpCCB = function (model,props){
        var settleType = props.data && props.data.settleType || '';//交易类型
        var payAmt = props.data && props.data.payAmt || '';//金额
        var oldDate = props.data && props.data.oldDate || '';//原交易日期
        var txtOldRefSys = props.data && props.data.txtOldRefSys || '';//原系统参考号
        var txtTraceID = props.data && props.data.txtTraceID || '';//流水号
        var txtOrderNo = props.data && props.data.txtOrderNo || '';//收银流水(订单)号
        var sPrefer = props.data && props.data.Prefer || '';//优惠券
        var sRsv = props.data && props.data.sRsv || '';//二维码的条码数据
        var szFenqiNum = props.data && props.data.num || ''; //分期数
        var szGoodsCode = props.data && props.data.goodscode || ''; //分期数
        console.log("交易金额=" + payAmt + "分期数=" + szFenqiNum);
        //var re = HTTPCCBInterFace(settleType,payAmt,oldDate,txtOldRefSys,txtTraceID,txtOrderNo,sPrefer,sRsv);
        HTTPCCBInterFace(settleType,payAmt,oldDate,txtOldRefSys,txtTraceID,txtOrderNo,sPrefer,sRsv,szFenqiNum,szGoodsCode,model);
    }

    var HTTPCCBInterFace = function (settleType, payAmt,oldDate,txtOldRefSys,txtTraceID,sOrder,sPrefer,sRsv,szFenqiNum,szGoodsCode,model){ 
        var strInput = "";
        var amtStr = subPayAmtStr(payAmt);
		payAmt = formatPayAmt(amtStr);
        console.log("交易金额=" + payAmt);
        var szOrder = sOrder + Generater(' ', 20-sOrder.length); //收银流水(订单)号
        var szPrefer = sPrefer + Generater(' ', 50-sPrefer.length); //优惠券      
        var strRsv = sRsv + Generater(' ', 300-sRsv.length); //二维码的条码数据
        
		//(收银机号8,操作员号8,交易类型2,金额12,原交易日期8,原参考号12,流水号6,
		//原批次号6,原授权码6,原交易终端8,分期数2,服务人数2,商品编码12,二磁道37,三磁道104,Lrc3,resv20,resv300)
		if(settleType == '00'){			//00消费: 金额
            strInput = Generater(' ',8) + Generater(' ',8) + settleType + payAmt + Generater(' ',8) + Generater(' ',12) + Generater(' ',6) + Generater(' ',6) + Generater(' ',6)
             + Generater(' ',8) + '  ' + '  ' + Generater(' ',12) + Generater(' ',37) + Generater(' ',104) + Generater(' ',3) + szOrder + szPrefer + strRsv;
        }
        else if(settleType == '01'){	//01撤销 金额，原流水号
            strInput = Generater(' ',8) + Generater(' ',8) + settleType + payAmt + Generater(' ',8) + Generater(' ',12) + txtTraceID + Generater(' ',6) + Generater(' ',6)
             + Generater(' ',8) + '  ' + '  ' + Generater(' ',12) + Generater(' ',37) + Generater(' ',104) + Generater(' ',3) + szOrder + szPrefer + strRsv;
        }
        else if(settleType == '02'){	//02退货 金额，原交易参考号，原交易日期
            strInput = Generater(' ',8) + Generater(' ',8) + settleType + payAmt + oldDate + txtOldRefSys + txtTraceID + Generater(' ',6) + Generater(' ',6)
             + Generater(' ',8) + '  ' + '  ' + Generater(' ',12) + Generater(' ',37) + Generater(' ',104) + Generater(' ',3) + szOrder + szPrefer + strRsv;
        }
        else if(settleType == '03'){	//03查余
            strInput = Generater(' ',8) + Generater(' ',8) + settleType + Generater(' ',12) + Generater(' ',8) + Generater(' ',12) + Generater(' ',6) + Generater(' ',6) + Generater(' ',6)
             + Generater(' ',8) + '  ' + '  ' + Generater(' ',12) + Generater(' ',37) + Generater(' ',104) + Generater(' ',3) + szOrder + szPrefer + strRsv;
        }
        else if(settleType == '04'){	//04重打印 原流水号
            strInput = Generater(' ',8) + Generater(' ',8) + settleType + Generater(' ',12) + Generater(' ',8) + Generater(' ',12) + txtTraceID + Generater(' ',6) + Generater(' ',6)
             + Generater(' ',8) + '  ' + '  ' + Generater(' ',12) + Generater(' ',37) + Generater(' ',104) + Generater(' ',3) + szOrder + szPrefer + strRsv;
        }
        else if(settleType == '05'){	//05签到
            strInput = Generater(' ',8) + Generater(' ',8) +  settleType + Generater(' ',12) + Generater(' ',8) + Generater(' ',12) + Generater(' ',6) + Generater(' ',6) + Generater(' ',6)
             + Generater(' ',8) + '  ' + '  ' + Generater(' ',12) + Generater(' ',37) + Generater(' ',104) + Generater(' ',3) + szOrder + szPrefer + strRsv;
        }
        else if(settleType == '06'){	//06结算
            strInput = Generater(' ',8) + Generater(' ',8) +  settleType + Generater(' ',12) + Generater(' ',8) + Generater(' ',12) + Generater(' ',6) + Generater(' ',6) + Generater(' ',6)
             + Generater(' ',8) + '  ' + '  ' + Generater(' ',12) + Generater(' ',37) + Generater(' ',104) + Generater(' ',3) + szOrder + szPrefer + strRsv;
        }
		else if(settleType == '14'){	//14商场分期
            strInput = Generater(' ',8) + Generater(' ',8) + settleType + payAmt + Generater(' ',8) + Generater(' ',12) + Generater(' ',6) + Generater(' ',6) + Generater(' ',6)
             + Generater(' ',8) + szFenqiNum + '  ' + szGoodsCode + Generater(' ',37) + Generater(' ',104) + Generater(' ',3) + szOrder + szPrefer + strRsv;
        }
        else if(settleType == '60'){	//60 微信/支付宝(聚合支付用户被扫)
            strInput = Generater(' ',8) + Generater(' ',8) + settleType + payAmt + Generater(' ',8) + Generater(' ',12) + Generater(' ',6) + Generater(' ',6) + Generater(' ',6) 
             + Generater(' ',8) + '  ' + '  ' + Generater(' ',12) + Generater(' ',37) + Generater(' ',104) + Generater(' ',3) + szOrder + szPrefer + strRsv;
        }
        console.log("strInput=" + strInput);

        var url = "http://127.0.0.1:5555";
        sendHttp(strInput,url,model);
    }
    
    /**
     * send http request
     * @param {*} strInput request param
     * @param {*} url http url
     * @param {*} model model
     */
	var sendHttp = function(strInput,url,model){
        var iRet;
		var xmlHttpRequest;  
		//1.创建XMLHttpRequest  
		if(window.ActiveXObject){ //如果是IE浏览器
            xmlHttpRequest = new ActiveXObject("Microsoft.XMLHTTP");  
        }else if(window.XMLHttpRequest){ //非IE浏览器  
            xmlHttpRequest = new XMLHttpRequest();  
        }     
        //2.设置回调函数  
        xmlHttpRequest.onreadystatechange = function(){
            //回调函数
            if(xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200){  
                iRet = xmlHttpRequest.responseText;
                model.invoke('getRequestDataByCCB', iRet);
				console.log("返回值：" + iRet);
			}  
        };  
        //3.初始化XMLHttpRequest组建  
        xmlHttpRequest.open("POST",url,true);  
        //4.发送请求  
        xmlHttpRequest.send(strInput);  
		console.log("请求参数：" + strInput);	
    }
	
	var Generater = function (resvr,len){
        var s = "";
        var i = 0;
        for(; i < len; ++i){
            s = s + resvr;
        }
        return s;
    }
	
    /**
     * 无论传入几位小数,此处暂按两位小数处理
     * eg:1.2355  -->  1.23
     * @param {*} str 
     */
    var subPayAmtStr = function (str){
        var index = str.indexOf('.');
        str = str.slice(0, index + 3);
        return str;
    }
	
    /**
     * 格式化输入的支付金额
     * eg:0.01  -->  001  -->  000000000001
     *    1.00  -->  100  -->  000000000100
     *    123450.23  -->  12345023  -->  000012345023
     * @param {*} str 
     */
    var formatPayAmt = function (str){
        str = str.replace(".","");
        while(str.length < 12){
            str = "0" + str;
        }
        return str;
    }
	
    KDApi.register('httpccb', HTTPCCB)
})(window.KDApi, jQuery) 

