/**
 *  自定义控件---导航条
 */
(function(KDApi, $){
    // 构造函数，变量名随意，与最后一句代码的KDApi.register的第二个参数一致即可
    function Menu (model) {
        this._setModel(model)
    }

    // 原型中封装生命周期函数，固定格式
    Menu.prototype = {
        _setModel: function(model) {
            this.model = model
        },
        init: function(props){
            // TO DO
            initFunc(this.model, props)
        },
        update: function(props){
            // TO DO
        },
        destoryed: function(){
            // TO DO
        }
    }

    // Other Code
    var initFunc = function(model, props) {
         // KDApi.loadFile可以通过路径加载js或css文件，并且在html文件头生成script或者link标签，第一个参数是路径，第二个参数是model，第三个参数是加载完成后执行的回调函数
		KDApi.loadFile('./css/menu.css', model, function() {
			// 后端插件通过setData传给前端的数据，前端可以通过props.data去获取
			var personalcenterName = props.data && props.data.personalcenterName || '个人中心' ;
			var languageName = props.data && props.data.languageName || '语言选项' ;
			var logoutName = props.data && props.data.logoutName || '退出' ;
			var initTime = new Date().getTime() ;
			var titleId = "title_" + initTime ;
			var contentId = "content_" + initTime ;
			var personalcenterId = "personalcenter_" + initTime ;
			var languagesId = "languages_" + initTime ;
			var logoutId = "logout_" + initTime ;
			KDApi.loadFile('./js/menu.js', model, function() {
				// 通过路径去获取html字符串，第一个参数是路径，第二个参数是model，第三个参数是HTML模板中变量的值
				KDApi.getTemplateStringByFilePath('./html/menu.html', model,  {
					personalcenterName: personalcenterName,
					languagesName: languageName,
					logoutName: logoutName,
					titleId: titleId,
					contentId: contentId,
					personalcenterId: personalcenterId,
					languagesId: languagesId,
					logoutId: logoutId
				}).then(function(result) {
					model.dom.innerHTML = result;
					initEvent(model, props, initTime);
				});    
			});			   
		});
    }
	
	var initEvent = function initEvent(model, props, initTime){
		var contentId = "content_" + initTime ;
		var displayEvent = function(e) {
			// 隐藏和显示菜单项
			var oldDisplay = findid(contentId).style.display;
			console.log("initEvent title oldDisplay :"+oldDisplay);
			findid(contentId).style.display = (oldDisplay == "block") ? "none" : "block";
		}
		findid("title_"+initTime).onclick = displayEvent ;
		findid("personalcenter_"+initTime).onclick = function(e) {
			// 跳转 个人中心
			model.invoke('click', 'personalcenter');
			displayEvent(e);
		}
		findid("languages_"+initTime).onclick = function(e) {
			// 语言转换
            model.invoke('click', 'languages');
			displayEvent(e);
		}
		findid("logout_"+initTime).onclick = function(e) {
			// 退出
            model.invoke('click', 'logout');
			displayEvent(e);
		}
	}

    // 你只需知道第一个参数是你接下来要新增控件方案时填的方案id，第二个参数是上面声明的构造函数
    KDApi.register('menu', Menu)
})(window.KDApi) 
