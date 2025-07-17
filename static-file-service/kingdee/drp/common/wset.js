var getCurentArgs=function(paramname){
   var scs = document.getElementsByTagName('script');  
   var sc;
   for(var i=0;i<scs.length;i++){
	if (scs[i].src.indexOf("/kingdee/drp/common/wset")>=0){
		sc =scs[i];
		break;
	}
   }
   var paramsArr = sc.src.split('?')[1].split('&');  
   var args={},argsStr=[],param,t,name,value;  
   for(var ii=0,len=paramsArr.length;ii<len;ii++){  
         param=paramsArr[ii].split('=');  
            name=param[0],value=param[1];  
            if(typeof args[name]=="undefined"){ //参数尚不存在  
                args[name]=value;  
            }else if(typeof args[name]=="string"){ //参数已经存在则保存为数组  
                args[name]=[args[name]]  
                args[name].push(value);  
            }else{  //已经是数组的  
                args[name].push(value);  
            }
    }
  return decodeURIComponent(args[paramname].replace(/\+/g, ' '));
}

function setTitle(title){
	document.title=title;
}

var ac = getCurentArgs("ac");
if (ac!=undefined && ac=='settitle'){
	setTitle(getCurentArgs("title"));
}

