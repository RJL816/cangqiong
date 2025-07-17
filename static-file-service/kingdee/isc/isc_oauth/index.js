/*
 * @Descripttion: 
 * @Version: 
 * @Author: lzb
 * @Date: 2022-07-13 09:29:44
 * @LastEditors: lzb
 * @LastEditTime: 2022-08-02 09:58:53
 */
 
var erroMessage;
(function (KDApi, $) {
    function MyComponent(model) {
        this._setModel(model);
    }
    MyComponent.prototype = {
        _setModel: function (model) {
            this.model = model;
        },
        init: function (props) {
			setHtml(this.model, props);
            console.log('-----init--------------------------', this.model, props);
        },
        update: function (props) {
            setHtml(this.model, props);
			console.log('-----update', this.model, props)
        },
        destoryed: function () {
		erroMessage = undefined;
		console.log("erro_destoryed",erroMessage);
        console.log('-----destoryed', this.model)
        }

    }
    var setHtml = function (model, props) {
        KDApi.templateFilePath('./html/oauth.html', model, {}).then(result => {
            model.dom.innerHTML = result;
            initframe(model, props);
        })
    }
    var initframe = function (model, props) {
        var paramsMap = props.data;
        var oauthIframe = document.getElementById("iframe_id");
        oauthIframe.src = paramsMap["url"];//将插件传递的url信息传入iframe的src中
		var url;
        oauthIframe.onload = function () {
            //同源重定向则将地址返给插件,不同源则捕捉异常
            try {
				 url = oauthIframe.contentWindow.location.href;
            } catch (e) {
				var message = e.message;
				if(!message.includes("cross-origin frame") && erroMessage != message ){
					erroMessage = message;
					alert(message);
				}else{
					console.log('-----------------异常打印',message);
					}
				}
				if(url!= null){
					console.log('-----------------url不为空');
					model.invoke('code', url);
				}

            }
			           
        
    }
    KDApi.register('isc_oauth', MyComponent)
})(window.KDApi, jQuery);