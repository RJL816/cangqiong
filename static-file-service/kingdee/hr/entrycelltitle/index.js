/**
 *  �Զ���ؼ���дģ��
 */
(function(KDApi, $){
    // ���캯�������������⣬�����һ������KDApi.register�ĵڶ�������һ�¼���
    function EntryCellTitle (model) {
        this._setModel(model)
    }

    // ԭ���з�װ�������ں������̶���ʽ
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

    // ��ֻ��֪����һ���������������Ҫ�����ؼ�����ʱ��ķ���id���ڶ������������������Ĺ��캯��
    KDApi.register('entrycelltitle', EntryCellTitle)
})(window.KDApi, jQuery) // �����jQuery���Ǳ���Ҫ����ȥ�ģ����Ƴ���Ҫ�õ���ʱ��Ŵ���PC��ϵͳĬ�ϻ���jQuery���󣬰汾��1.12.4
