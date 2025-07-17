/**
 *  自定义控件书写模板
 */
(function(KDApi, $){
    function CustomStatusTab (model) {
        this._setModel(model)
    }

    // 原型中封装生命周期函数，固定格式
    CustomStatusTab.prototype = {
        _setModel: function(model) {
            this.model = model
        },
        init: function(props){
            initFunc(this.model, props);
        },
        update: function(props){
			updateHtml(this.model, props);
        },
        destoryed: function(){
        }
    }

    var initFunc = function(model, props) {
        KDApi.loadFile(['./css/index.css','./javascript.js'], model, function() {
            KDApi.getTemplateStringByFilePath('./statustab.html', model, {
				statusTabApId:(model.pageId + "-" + model.key).replace(";",""),
				searchDivMinWidth:props.data && props.data.dataObject && props.data.dataObject[0] && props.data.dataObject[0].customcontrolap.searchDivMinWidth || "250px",
				searchResultMaxHeight:props.data && props.data.dataObject && props.data.dataObject[0] && props.data.dataObject[0].customcontrolap.searchResultMaxHeight || "250px",
				statusTabAddTab:KDApi.getLangMsg(model,'statustab.addtab'),
				statusTabFirstTab:KDApi.getLangMsg(model,'statustab.firsttab'),
				statusTabFrontTab:KDApi.getLangMsg(model,'statustab.fronttab'),
				statusTabNextTab:KDApi.getLangMsg(model,'statustab.nexttab'),
				statusTabLastTab:KDApi.getLangMsg(model,'statustab.lasttab'),
				statusTabMoreTab:KDApi.getLangMsg(model,'statustab.moretab'),
				statusTabInputContent:KDApi.getLangMsg(model,'statustab.inputcontent'),
				statusTabCloseCur:KDApi.getLangMsg(model,'statustab.closecur'),
				statusTabCloseOther:KDApi.getLangMsg(model,'statustab.closeother'),
				statusTabCloseLeft:KDApi.getLangMsg(model,'statustab.closeleft'),
				statusTabCloseRight:KDApi.getLangMsg(model,'statustab.closeright'),
				statusTabCloseAll:KDApi.getLangMsg(model,'statustab.closeall')
			}).then(function(result) {
                model.dom.innerHTML = result;
                updateHtml(model,props);
            })
        })
    }
	
	var initEvent = function(model) {
		// click 事件
		$('.kingdee-eb-statustab-buttonaddtab', model.dom).unbind("click");
		$('.kingdee-eb-statustab-buttonaddtab', model.dom).click(function(){
			model.invoke('statusTabAddNewClick');
		});
		$('.kingdee-eb-statustab-tabitem', model.dom).unbind("click");
		$('.kingdee-eb-statustab-tabitem', model.dom).click(function(){
			model.invoke('statusTabSelected',tabItemClick(this));
		});
		$('.kingdee-eb-statustab-rightbutton-item', model.dom).unbind("click");
		$('.kingdee-eb-statustab-rightbutton-item', model.dom).click(function(){
			model.invoke('statusTabCloseClick',rightMenuClick(this));
		});
		$('.kingdee-eb-statustab-searchresultitem', model.dom).unbind("click");
		$('.kingdee-eb-statustab-searchresultitem', model.dom).click(function(){
			var split = this.id.split(";");
			var statusTabApId = split[0];
			var tabId = split[2];
			if (moveTabItem(statusTabApId,tabId)){
				model.invoke('statusTabSelected',tabId);
			}
		});
		$('.kingdee-eb-statustab-buttonitemdiv', model.dom).unbind("click");
		$('.kingdee-eb-statustab-buttonitemdiv', model.dom).click(function(){
			var tabId = directionClick(this);
			if (tabId){
				model.invoke('statusTabSelected',tabId);
			}
		});
		$('.kingdee-eb-statustab-tabitemclose', model.dom).unbind("click");
		$('.kingdee-eb-statustab-tabitemclose', model.dom).click(function(e){
			e.stopPropagation();
			model.invoke('statusTabCloseClick','["' + this.parentNode.attributes.tabId.value + '"]');
		});		
    }

    //修改编辑内容--包含新增
    var updateHtml = function (model, props) {
		var statusTabApId = (model.pageId + "-" + model.key).replace(";","")
        invokeFrontMethod(model,props.data,statusTabApId);
		initEvent(model);
    }

    window.KDApi.register('cm_custom_statustab', CustomStatusTab,{
        isMulLang: true
    })
})(window.KDApi, jQuery)