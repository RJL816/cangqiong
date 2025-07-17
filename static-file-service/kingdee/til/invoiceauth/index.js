(function(KDApi,$,_){ 
    function MyComponent(model){
        this._setModel(model);
    }

    var isUpdate = false;
    MyComponent.prototype = {
        _setModel: function(model) {
            this.model = model;
        },
        init:function(props){
          console.log('-----init',this.model,props)
          isUpdate = false; 
          setHtml(this.model,props,isUpdate);
        },
        update:function(props){
          console.log('-----update',this.model,props)
          isUpdate = true;  
          setHtml(this.model,props,isUpdate);
        },
        destoryed:function(){
            console.log('-----destoryed',this.model)
        }

    }     
	var setHtml = function(model,props,isUpdate){   
		var data={};   
		var requestType='';
		if(props!=null&&props.data!=null){
			var popsData=props.data; 
			requestType=popsData['requestType']; 
			var str = JSON.stringify(popsData['data']); 
			if(str!=null){
				data=JSON.parse(str); 
			} 
		}
		console.log('requestType:'+requestType); 
		KDApi.loadFile("./swjgFpdkV4.js", model, () => { 
			 var govOperate =getInstanceByTaxNo(data);
			 console.log('-----govOperate'+govOperate);
			  
				if('gxConfirmOneAfter'==requestType){
				  gxConfirm(govOperate,model,data);
				}else if('getClientHello'==requestType){
					getClientHello(govOperate,model,data);
				}else if('getClientAuthCode'==requestType){
					getClientAuthCode(govOperate,model,data);
				} 
			  
			 	
		}); 
    }   
	
	function getInstanceByTaxNo(data){
		console.log('-----govFpdkOperate'+window.swjgFpdk.govFpdkOperate);
		var operateUrl=data.operateUrl;
		if(!operateUrl||''==operateUrl){
			operateUrl="http://127.0.0.1:52320/cryptctl";
		}
		console.log('-----operateUrl:'+operateUrl); 
		return window.swjgFpdk.govFpdkOperate.getInstanceByTaxNo({
            firstLoginUrl: null,
            secondLoginUrl: null,
            collectUrl: null,
            taxNo: data.taxNo,
            operateUrl: operateUrl
        }); 
	}
	function getClientHello(govOperate,model,data){
		console.log('-----operateUrl2:'+govOperate.operateUrl); 
		govOperate.firstLogin(data.passwd, data.ptPasswd).then((res) => {	
		console.log('-----vaildData:',res); 		
			model.invoke('getClientHello',res);  
		});
	}
	function getClientAuthCode(govOperate,model,data){
		console.log('-----fristLoinData:',data.fristLoinData); 
		console.log('-----validateData:',data.validateData); 
		govOperate.secondLogin(data.passwd,data.ptPasswd,data.fristLoinData,data.validateData,'POST').then((res) => {			
			model.invoke('getClientAuthCode',res);  
		});
	} 
	function gxConfirmOneAfter(govOperate,model,data){ 
	    console.log(requestType+'-----gxConfirmOneAfter'); 
		govOperate.gxConfirmOneAfter(data.cryptType,data.alg,data).then(function(res){
			model.invoke("gxConfirmOneAfter",res);  
		});
	}  
    KDApi.register('invoiceauth', MyComponent)
})(window.KDApi,jQuery);
