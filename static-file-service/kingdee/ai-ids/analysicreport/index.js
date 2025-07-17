;(function(KDApi,$){
    function AnalysicReport(model){
        this._setModel(model)
        this.modelPath=KDApi.nameSpace(model);
        // console.log("modelPath is ",this.modelPath);
        // console.log('model is ',model)
    }
    AnalysicReport.prototype={
        _setModel:function(model){
            this.model=model;
        },
        init:function(props){
            //initFunc(props,this.model,this.modelPath)
            console.log('prop data in init is ',props);
            //initChart(props,this.model,this.modelPath);
          
        },
        update:function(props){
            initChart(props,this.model,this.modelPath);
        },
        destoryed:function(){

        }
    }
    function initChart(props,model,modelPath){
        var propsData=props.data;
        var propsDataType=typeof propsData;
        // console.log("qiuhaoxin test data is ",propsDataType);
        try{
            if(propsDataType==='string'){
                // console.log("propsData is ",propsData);
                propsData=JSON.parse(propsData)
            }
        }catch(ex){
            console.error("exceptions is ",ex.message);
        }

        // try{
        //     propsData=JSON.parse(propsData);
        // }catch(ex){
        //     console.log("excepiotn is ",ex);
        // }
     
        console.log("qiuhaoxin test data is ",propsData.status);
        KDApi.loadFile(["./utils.js",'./renderUtils.js','./chartUtils.js','./tableUtils.js',
        './chartSetting.js','./lib/chart35.js',"./customChartUtils.js",
        "./css/index.css"],model,function(){
            IDS_RenderUtils.model=model;
            KDApi.getTemplateStringByFilePath('./html/report.html',model,{
                title:model.title || '数据分析过程报告'
            }).then(function(result){
                model.dom.innerHTML=result;
                // console.log("hei",window.testData);
                render(propsData);
                model.invoke('hideLoading')
            })
        })
    }

    function render(propsData){
        IDS_RenderUtils.main(propsData);
    }
    
    KDApi.register('analysicreport',AnalysicReport)

})(window.KDApi,jQuery)