const fLogin_ = document.getElementById("fLogin");
function setElement(paramsMap) {
	const params = JSON.parse(paramsMap);
	const keys = Object.keys(params);
	for(let i=0; i<keys.length; i++){
		if('action' === keys[i]){
			fLogin_.setAttribute("action",params[keys[i]]);
		}else{
			const newInput = document.createElement("input"); // 创建一个新的input元素
			newInput.type = "hidden";
			newInput.id = keys[i];
			newInput.name = keys[i];
			newInput.value = params[keys[i]];
			fLogin_.appendChild(newInput);
		}
	}
}

//js获取参数
function getUrlParam(name) {
	const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	const r = window.location.search.substr(1).match(reg);
	if(r!=null){
		return  unescape(r[2])
	}
	return null;
}

setElement(getUrlParam('paramsMap'));

fLogin_.submit();