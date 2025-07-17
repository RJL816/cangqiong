(function(KDApi, $){
    function EmbedDashboard (model) {
        this._setModel(model)
    }

    EmbedDashboard.prototype = {
        _setModel: function(model) {
            this.model = model
        },
        init: function(props){
            console.log('initPropsData : ', props);
            initData(this.model, props);

            
        },
        update: function(props){
            console.log('updatePropsData : ', props);
            initData(this.model, props);
        },
        destoryed: function(){

        }
    }


    /**
     * 初始化数据
     */
    var initData = function(model, props) {
        var data = props.data.data.data;
        console.log('data:', data);
        var pageId = model.pageId.substring(18,model.pageId.length);
        KDApi.loadFile(['./css/index.css', './js/embedded-sdk.js'], model, function() {
            KDApi.getTemplateStringByFilePath('./html/home.html', model, {
                mainId: pageId
            }).then(function(result) {
                model.dom.innerHTML = result
                embedDashboard(data, pageId);
            })        
        })
    }

    var embedDashboard = function(data, mainId){
        var dashboardUuid = data.dashboardUuid;
        var token = data.token;
        var domain = data.domain;
        var hideTitle = data.hideTitle;
        var hideTab = data.hideTab;
        var hideChartControls = data.hideChartControls;
        var filtersVisible = data.filtersVisible;
        var filtersExpanded = data.filtersExpanded;
        supersetEmbeddedSdk.embedDashboard({
            id: dashboardUuid, // given by the Superset embedding UI
         supersetDomain: domain,
         //mountPoint: document.getElementById("ids-dar-superset"), // any html element that can contain an iframe
         mountPoint: document.getElementById(mainId),
         fetchGuestToken: () => token,
         dashboardUiConfig: { // dashboard UI config: hideTitle, hideTab, hideChartControls, filters.visible, filters.expanded (optional)
             hideTitle: hideTitle,
             hideTab: hideTab,
             hideChartControls: hideChartControls,
             filters: {
                 expanded: filtersExpanded,
                 visible: filtersVisible
             }
         },
         });
    }

    KDApi.register('embeddashboard', EmbedDashboard)
})(window.KDApi, jQuery)