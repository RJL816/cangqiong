(function(KDApi, $){
    function SaleForecastHomepage (model) {
        this._setModel(model)
    }

    SaleForecastHomepage.prototype = {
        _setModel: function(model) {
            this.model = model
        },
        init: function(props){
            console.log('initPropsData : ', props);
            initData(this.model, props);

            
        },
        update: function(props){
            console.log('updatePropsData : ', props);
        },
        destoryed: function(){

        }
    }


    /**
     * 初始化数据
     */
    var initData = function(model, props) {
        var data = props.data.data;
        var status = data.status;
        var themeNum = props.themeNum;

        KDApi.loadFile('./css/index.css', model, function() {
            KDApi.getTemplateStringByFilePath('./html/home.html', model, {
                text: 'Hello, Sale forecast!'
            }).then(function(result) {
                model.dom.innerHTML = result
                setPageDesc(status);
                setGuideArrow(status);
                initEvent(model, props);
                setThemeColor(model, themeNum);

                
            })        
        })
    }

    /**
     * 设置主题色
     * @param {*} model 
     */
     var setThemeColor = function(model, themeNum){
        console.log('setThemeColor');
        $('.ids-sf-home-page-page-op', model.dom).css({
            'color': themeNum
        });
        $('.ids-sf-home-page-name', model.dom).hover(function() {
            $(this).css({
                'color': themeNum
            });
        }, function() {
            $(this).css({
                'color': '#212121'
            });
        });
    }

        /**
     * 声明点击事件
     * @param {} model 
     * @param {} props 
     */
         var initEvent = function(model, props){
            console.log('initEvent');
            $('.ids-sf-home-page-item', model.dom).click(function(){
                var formId = $(this).attr('formid');
                if(formId) {
                    var menuObj = {"formId": formId};
                    model.invoke('menuClick', menuObj);
                }
            })
            $('.ids-sf-home-page-module-item', model.dom).click(function(){
                var formId = $(this).attr('formid');
                if(formId) {
                    var menuObj = {"formId": formId};
                    model.invoke('menuClick', menuObj);
                }
            })
            $('.ids-sf-home-page-name', model.dom).click(function(){
                var formId = $(this).attr('formid');
                if(formId) {
                    var menuObj = {"formId": formId};
                    model.invoke('menuClick', menuObj);
                }
            })
        }
    

    /**
     * 设置页面描述
     * @param {} status 1-已申请未配置 2-已配置未上线 3-已上线
     */
    function setPageDesc(status) {
        //1-已申请未配置
        var $$kicon = document.querySelector('#kicon');
        var kiconClassName = "ids-sf-home-page-k-icon ids-sf-home-page-k-running";
        var pageDescText = '欢迎使用智能销售预测应用，点击 <span class="ids-sf-home-page-page-op">应用配置</span> 开始相关内容的配置；<br/>配置完成后，小K会运用AI算法为您自动进行数据分析及模型分析。';
        if(status == 2) {//已配置未上线
            kiconClassName = "ids-sf-home-page-k-icon ids-sf-home-page-k-completed";
            pageDescText = '您已配置完成，小K正在为您快马加鞭的运算；<br/>结果输出前，您可点击 <span class="ids-sf-home-page-page-op">数据分析</span> 预先进行数据概况的了解。';
        }else if(status == 3) {//已上线
            kiconClassName = "ids-sf-home-page-k-icon ids-sf-home-page-k-default";
            pageDescText = '您的模型结果已输出，点击 <span class="ids-sf-home-page-page-op">模型效果</span> 进行结果查看；<br/>结合预测明细及分析报告可理解结果影响因子及效果评估。';
        }
        $$kicon.className = kiconClassName;
        var $$pageDescText = document.querySelector('#pageDescText');
        $$pageDescText.innerHTML = pageDescText;
        
    }

    /**
     * 设置指引箭头
     * @param {} status 1-已申请未配置 2-已配置未上线 3-已上线
     */
    function setGuideArrow(status) {
        var $$guide = document.querySelector('#appConfigGuide');
        if(status == 2) {
            $$guide = document.querySelector('#dataAnalysisGuide');
        }else if(status == 3) {
            $$guide = document.querySelector('#modelEffectGuide');
        }
        $$guide.className = "ids-sf-home-page-guide-arrow ids-sf-home-page-guide ids-sf-home-page-active-guide";
    }

    KDApi.register('saleforecasthomepage', SaleForecastHomepage)
})(window.KDApi, jQuery)