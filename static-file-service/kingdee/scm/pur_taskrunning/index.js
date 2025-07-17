/**
 *  自定义控件书写模板
 */
(function(KDApi, $){
    // 构造函数，变量名随意，与最后一句代码的KDApi.register的第二个参数一致即可
    function runningUI (model) {
        this._setModel(model)
    }

    // 原型中封装生命周期函数，固定格式
	var isUpdate = false;
    runningUI.prototype = {
        _setModel: function(model) {
            this.model = model
        },
        init: function(props){
			isUpdate = false;
            updateprogress(this.model, props,isUpdate)
        },
        update: function(props){
			isUpdate = true;
            updateprogress(this.model, props,isUpdate)
        },
        destoryed: function(){
        }
    }

	// 进度更新
    var updateprogress = function(model, props,isUpdate) {
        
        KDApi.loadFile('./css/main.css', model,function(){
			var customCtrParam = props.data ? JSON.parse(props.data):[];
            KDApi.templateFilePath('./html/running.html', model,{
					taskdetail:customCtrParam?customCtrParam.taskDetailInfos:[]					
			}).then(
                function(result){
					if(model.dom.innerHTML === "" || isUpdate){
                        model.dom.innerHTML = result;
					}
                }
            )
        })
    }
    // 你只需知道第一个参数是你接下来要新增控件方案时填的方案id，第二个参数是上面声明的构造函数
    KDApi.register('taskrunning', runningUI)
})(window.KDApi, jQuery) // 这里的jQuery不是必须要传进去的，可移除，要用到的时候才传，PC端系统默认会有jQuery对象，版本是1.12.4