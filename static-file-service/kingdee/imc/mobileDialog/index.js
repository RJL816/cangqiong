
(function(KDApi,_){ 
    function MyComponent(model){
        this._setModel(model);
    }
     
    MyComponent.prototype = {
        _setModel: function(model) {
            this.model = model;
        },
        init:function(props){
			console.log('-----init',this.model,props);
        },
        update:function(props){
			console.log('-----update',this.model,props);
			addFunc(this.model, props);
        },
        destoryed:function(){
            console.log('-----destoryed',this.model)
        }
    }
	
	function addFunc(model, props) {
		if(props && props.data) {
			const { operator, divId, content } = props.data;
			if (operator) {
			    console.log('showLoading--', showLoading);
			    showLoading(model, divId, content);
			} else {
			    hideLoading();
			}
		}
		
	}
	
	function dialogHtml(contTxt){
	    var txt = '正在加载中...';
		if (contTxt && contTxt.length > 0) {
			for(var j=0; j < contTxt.length; j++){
				txt += '<p>' + contTxt[j] + '</p>'
			}
		}
		console.log('显示');
		return "<div class='loadModal'>" + 
		"<div class='dialog'>" + 
			"<div class='contentTxt'>" + txt + "</div>" +
		"</div></div>";
	}

	function showLoading(model, pageId, contTxt) { //显示
		const obj = document.getElementById(pageId);
		const loadModal = document.getElementsByClassName('loadModal');
		console.log('obj--', obj);
		if (loadModal[0]) {
			updateTxt(contTxt);
		} else {
			KDApi.loadFile(['./dialog.css'], model, () => {
			console.log('txt--', dialogHtml(contTxt));
				obj.innerHTML += dialogHtml(contTxt);
			});
		}
	}

	function hideLoading() { //隐藏
	    console.log('隐藏');
		var loadModal = document.getElementsByClassName('loadModal');
		if (loadModal[0]) {
		console.log('隐藏1');
			loadModal[0].parentNode.removeChild(loadModal[0]);
		}
	}
	
	function updateTxt(contTxt) {
	    console.log('更新模板');
		const loadModal = document.getElementsByClassName('loadModal');
		const divArr = loadModal[0].getElementsByTagName('div');
		let contentTxtObj = '';
		if (divArr) {
			for (let i = 0; i< divArr.length; i++) {
				if(divArr[i].className == 'contentTxt') {
					contentTxtObj = divArr[i];
					break;
				}
			}
			if (contTxt && contTxt.length > 0) {
				let txt = '正在加载中...';
				for(let j=0; j < contTxt.length; j++){
					txt += '<p>' + contTxt[j] + '</p>'
				}
				contentTxtObj.innerHTML = txt;
			}
		}
	}
	
	
	KDApi.register('mobileDialog', MyComponent);
})(window.KDApi);
