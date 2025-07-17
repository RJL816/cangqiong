/**
 *  自定义控件书写模板
 */
(function(KDApi, $){
    // 构造函数，变量名随意，与最后一句代码的KDApi.register的第二个参数一致即可
    function EntryCellTitle (model) {
        this._setModel(model)
    }

    // 原型中封装生命周期函数，固定格式
    EntryCellTitle.prototype = {
        _setModel: function(model) {
            this.model = model
        },
        init: function(props){
            // TO DO
            setCellTitle(this.model, props)
        },
        update: function(props){
            // TO DO
            setCellTitle(this.model, props)
        },
        destoryed: function(){
            // TO DO 
        }
    }


	var setCellTitle = function(model, props) {
		var cellId = props.data && props.data.id ;
		var cellTips = props.data && props.data.ct ;
		setTimeout(function(){
			$.each(cellTips, function(key, value) {
				$("td[data-code='"+cellId+"'][data-rowindex='"+key+"']").attr("title",value);
			});
		},1000)
		
    }

    // 你只需知道第一个参数是你接下来要新增控件方案时填的方案id，第二个参数是上面声明的构造函数
    KDApi.register('entrycelltitle', EntryCellTitle)
})(window.KDApi, jQuery) // 这里的jQuery不是必须要传进去的，可移除，要用到的时候才传，PC端系统默认会有jQuery对象，版本是1.12.4
