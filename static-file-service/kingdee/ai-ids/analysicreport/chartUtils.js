;window.IDS_ChartUtils=(function(){
    function getDimensionMax(originalData, dimension) {
        var keys = Object.keys(originalData);
        var key = keys[dimension];
        var targetArr = originalData[key];
        var maxNum = IDS_Utils.getMaxFromArr(targetArr);
        maxNum = Math.ceil(maxNum);
        return maxNum;
      }
    function createPieData(keyMap,originalData){
        if(!keyMap.hasOwnProperty('name')){
            console.error("饼图数据不规范!");
            return;
        }
        if(!keyMap.hasOwnProperty('value')){
            console.error("饼图数据不规范!");
            return;
        }
        var nameKey=keyMap.name;
        var valKey=keyMap.value;

        var l=originalData[nameKey].length;
        var tempArr=[];
        for(var i=0;i<l;i++){
            var tempObj={};
            tempObj['name']=originalData[nameKey][i];
            tempObj['value']=originalData[valKey][i];
            tempArr.push(tempObj);
        }
        return tempArr;
    }
    function getDataByGroupKey(data,keys){
        var keys=Object.keys(data);
        var firstKeyVal=data[keys[0]];
        var l=firstKeyVal.length;
        var result=[];
        for(var i=0;i<l;i++){
            var tempArr=[];
            keys.forEach(key=>{
                var val=data[key][i];
                // if(key=='金额占比'){

                //     val=val * 1000;
                // }
                tempArr.push(val);
            })
            result.push(tempArr);
        }
       return result;
    
    }
    return {
        $$container:document.querySelector('#ids__report_container'),
        _createSingleXAxisByName:function(name,viewData){
            var finalXAxis=IDS_Utils.extend({},Ids_ChartSetting.xAxis,{
                axisLabel:{
                    rotate:60,
                },
                name:name,
                nameLocation:'center',
                type: 'category',
                data:viewData.data[name]   ,//getData(viewData.data,name)
            })
            return finalXAxis;
        },
        _getSingleXAxis:function(xAxis,viewData){
            var t=typeof xAxis;
            var finalXAxis;
            console.log("xAis.name is ",xAxis.name+"viewData is ",viewData);
            if(t=='string'){
                finalXAxis=this._createSingleXAxisByName(xAxis,viewData);
            }else{
                finalXAxis=IDS_Utils.extend({},xAxis,{
                    axisLabel:{
                        rotate:0,
                    },
                    name:xAxis.name || null,
                    nameLocation:'center',
                    nameGap: 40,
                    type: 'category',
                    data:xAxis && xAxis.data ? viewData.data[xAxis.data]  : null,  //getData(viewData.data,xAxis.data)
                })
            }
            return finalXAxis;
        },
        _getXAxis:function(viewData){
            var xAxisData=viewData.xAxis;
            if(!xAxisData)return {
                type:'category',
            }
            if(Array.isArray(xAxisData)){
                return xAxisData.map((xAxis,index)=>{
                    return this._getSingleXAxis(xAxis,viewData)
                })
            }else{
                //obj
                return this._getSingleXAxis(xAxisData,viewData)
            }
        },
        _createGrids:function(viewData){
            return viewData.grid;
            
        },
        _createLegend:function(){
            return {
                top:'2%',
                right:'100px',
                orient:'vertical'
            }
        },
        _createSingleSeries:function(seriesData,viewData){
            var type=seriesData.type;
            var data=seriesData.data;
            var sourceData=viewData.data;
            var color=viewData.color;
            //自定义系列
            if(type=='custom'){
                // console.log("curtomsdkfjldskfs",data);
                // console.log("curtomsdkfjldskfs",type);
                var colors=IDS_Utils.extend([],Ids_ChartSetting.color,color)
                data = data.map(function (item, index) {
                    return {
                      value: item,
                      itemStyle: {
                        color:colors[index] //Ids_ChartSetting.color[index]
                      }
                    };
                });
                seriesData.data=data;
                let result=IDS_CUSTOM_CHART_UTILS.renderCustomShape('rect',seriesData);
                return result
            }
            if(typeof data=='string'){
                return IDS_Utils.extend({},seriesData,{
                    type:type,
                    name:seriesData.data,
                    data:sourceData[seriesData.data],//getData(sourceData,seriesData.data),
                })
            }
        },
        _createSeries:function(viewData){
            var seriesData=viewData.series;
            var viewType=seriesData.type;
            var data=seriesData.data;
            var _this=this;

            if(Array.isArray(seriesData)){
                let result =seriesData.map(function(series){
                   return _this._createSingleSeries(series,viewData)//viewData.data
                })
                return result;
            }else if(typeof seriesData=='object'){
                return this._createSingleSeries(seriesData,viewData);//viewData.data
            }
        },
        _createSingleYAxis:function(yAxisData){
                return IDS_Utils.extend({},{
                    type: 'value',
                    nameLocation:'center',
                    nameGap:80,
                },yAxisData)
        },
        _createYAxis:function(viewData){
            var that=this;
            var yAxis=viewData.yAxis;
            if(!yAxis){
                return {
                    type:'value',
                }
            }
            if(Array.isArray(yAxis)){
                return yAxis.map(yAxisData=>{
                   return that._createSingleYAxis(yAxisData);
                })
                
            }else{
                return this._createSingleYAxis(yAxis);
            }
        },
        _createChartTitle:function(chartTitle){
            if(typeof chartTitle=='object'){
                return chartTitle;
            }else if(typeof chartTitle=='string'){
                return {
                    text:chartTitle,
                    left:'center',
                    top:'2%',
                    textStyle:{
                        color:'#333'
                    }
                }
            }
        },
        _createTooltip:function(viewData){
            var tooltip=viewData.tooltip;
            return IDS_Utils.extend({
  
            },Ids_ChartSetting.tooltip,tooltip)
        },
        _createColor:function(viewData){
            var color=viewData.color;
            return IDS_Utils.extend([],Ids_ChartSetting.color,color)
        },
        //生成chart的options
        _generalOptions:function(viewData){
            let chartData=viewData.data;
            let series=this._createSeries(viewData);
            let xAxis=this._getXAxis(viewData);
            let grids=this._createGrids(viewData);
            let chartTitle=this._createChartTitle(viewData.chartTitle);
            let yAxis=this._createYAxis(viewData);
            let legend=this._createLegend();
            let optionObj={
                tooltip: this._createTooltip(viewData),
                xAxis:xAxis,
                title:chartTitle,
                grid:grids,
                yAxis:yAxis,
                series:series,
                legend,
                color:this._createColor(viewData)
            }
            return optionObj;
        },
        //饼图 重置数据格式
        _renderPie:function(series,chartOptions,originalData){
            var xAxis=chartOptions.xAxis;
            var series=chartOptions.series;
            var dataFrom=series.dataFrom;
            var dataKey=series.dataKey;
            var pieData
            if(dataFrom=='props'){
                pieData=window.ids_data[dataKey];
            }else{
                var keyMap={
                    name: xAxis && typeof xAxis=='object' ? xAxis.name : '',
                    value:series && typeof series=='object' ? series.name : '',
                }
                
                pieData=createPieData(keyMap,originalData);
            }

            delete chartOptions.xAxis;
            delete chartOptions.yAxis;
            chartOptions.series.data=pieData;
        },
        //折线图
        _renderLine(){

        },
        __scatterVM:function(){

        },
        //自定义图形
        _renderCustom:function(series,chartOptions,data){
            console.log("custom chartOptions is ",chartOptions);
            var xAxisIndex=series.xAxisIndex;
            var yAxisIndex=series.yAxisIndex;
            var xAxisName="";
            var yAxisName="";

            var xAxis=chartOptions.xAxis;
            var yAxis=chartOptions.yAxis;
            if(Array.isArray(xAxis)){
                xAxisName=xAxis[xAxisIndex].name;
            }else{
                xAxisName=xAxis.name;
            }
            if(Array.isArray(yAxis)){
                yAxisName=yAxis[yAxisIndex].name;
            }else{
                yAxisName=yAxis.name;
            }
            console.log("custom ",xAxisName);
            chartOptions.tooltip=IDS_CUSTOM_CHART_UTILS.getRectToolTip(xAxisName,yAxisName)();
        },
        _createScatterTooltip:function(seriesData){
            var scatterVal=seriesData.scatterVal;
            return function(){
                return {
                    formatter:function(params){
                        var data=params.data;
                        var xAisStr="<label>"+scatterVal[0]+"：</label><span style='margin-right:8px;'>"+data[0]+"</span>";
                        var yAisStr="<label>"+scatterVal[1]+"：</label><span style='margin-right:8px;'>"+data[1]+"</span>";
                        var thirdStr="<label>"+scatterVal[2]+"：</label><span style='margin-right:8px;'>"+data[2]+"</span>";
                        return "<div>"+xAisStr+yAisStr+thirdStr+"</div>"
                    }
                }
            }
        },
        _renderScatter:function(seriesData,chartOptions,originalData){
            var scatterVal=seriesData.scatterVal;
            var finalData=getDataByGroupKey(originalData,scatterVal);
            chartOptions.series.data=finalData;
            chartOptions.series.itemStyle={
                opacity: 0.8,
                shadowBlur: 0,
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowColor: 'rgba(0,0,0,0)'
            }
            chartOptions.tooltip=this._createScatterTooltip(seriesData)();
            delete chartOptions.xAxis.data
            chartOptions.xAxis.type=null;
            chartOptions.visualMap=[
                {
                    show: false,
                    type: 'piecewise',
                    dimension: 2,
                    min:0,
                    max:getDimensionMax(originalData, 2),
                    inRange: {
                      color: Ids_ChartSetting.color,
                      symbolSize:[10,60]
                    },
                    outOfRange: {
                      color: ['green']
                    },
                    top: 20,
                    textStyle: {
                      color: '#fff'
                    },
                    realtime: false
                },
            ]
        },
        _renderBar:function(serie,chartOptions,viewData){
            var series=chartOptions.series;
            if(Array.isArray(series)){

            }else{

                if(series.label && series.label.labelKey){
                    let labelKey=series.label.labelKey;
                    series.label.formatter=function(params){
                        let result=viewData[labelKey][params.dataIndex];
                        return result;
                    }
                }
            }
        },
        _getFinalOptions:function(chartOptions,viewData){
            // console.log("_getFinalOptions is ",chartOptions);
            // console.log("_getFinalOptions viewData is ",viewData);
            var series=chartOptions.series;
            var _this=this;
            if(Array.isArray(series)){
                console.log("_renderCustom series");
                series.forEach(function(serie){
                    var type=serie.type;
                    switch(type){
                        case 'scatter':
                            _this._renderScatter(serie,chartOptions,viewData.data)
                        break;
                        case 'pie':
                            _this._renderPie(serie,chartOptions,viewData.data);
                        break;
                        case 'bar':
                            _this._renderBar(serie,chartOptions,viewData.data);
                        break;
                        case 'custom':
                            _this._renderCustom(serie,chartOptions,viewData.data);
                        break;
                    }
                })
            }else if(typeof series=='object'){
                var type=series.type;
                switch(type){
                    case 'scatter':
                        _this._renderScatter(series,chartOptions,viewData.data)
                    break;
                    case 'pie':
                        _this._renderPie(series,chartOptions,viewData.data);
                    break;
                    case 'bar':
                            _this._renderBar(series,chartOptions,viewData.data);
                        break;
                    case 'custom':
                        _this._renderCustom(series,chartOptions,viewData.data);
                    break;
                }
            }
            return chartOptions
        },
        _addResizeEvent:function(chartEl){
            var clientWidth=document.body.clientWidth;
            var wrapperW=(clientWidth - 260 - 50 ) * 0.92;
            wrapperW=Math.floor(wrapperW);
            chartEl.resize({
                width:200
            });
        },
        //设置chart的宽度和高度
        _setChartStyle:function(viewData){
            var chartStyleStr="";
            var wrapperW="900px";
            var chartStyle={
                width:wrapperW,
                height:'600px',
                'margin-top':'40px'
            };
            console.log("qhx initchart ",document.body.clientWidth);
            var clientWidth=document.body.clientWidth;
            wrapperW=(clientWidth - 260 - 50 ) * 0.92;
            wrapperW=Math.floor(wrapperW)+"px";

            if(wrapperW){
                chartStyle.width=wrapperW;
            }
            if(viewData.hasOwnProperty('chartStyle')){
                chartStyle=viewData.chartStyle;
            }
            if(chartStyle){
                for(var key in chartStyle){
                    chartStyleStr+=key+":"+chartStyle[key]+";";
                }

            }
            return chartStyleStr;
        },
        createChart(options){
            const el=options.el;
            const wrapperEl=options.container;
            const viewData=options.viewData;
            console.log("viewData is ",viewData);
            const $$chartEl=typeof el=="string" || !el ? document.createElement('DIV') : el;

            var chartStyleStr=this._setChartStyle(viewData);


            // if(rootWrapper){
            //     var wrapperRect=rootWrapper.getBoundingClientRect();
            //     // wrapperW=wrapperRect.width;
            //     console.log("qhx wrapperRect is ",wrapperRect);
            // }
            $$chartEl.setAttribute('id','chart_'+Math.random());
            // $$chartEl.style.cssText="width:"+chartRect.chartW+";height:"+chartRect.chartH+";margin-top:40px;"
            $$chartEl.style.cssText=chartStyleStr;
            wrapperEl.appendChild($$chartEl);
            var chartOptions=this._generalOptions(viewData);

            chartOptions=this._getFinalOptions(chartOptions,viewData);
            console.log("final chart options is ",chartOptions);
            const chartEl=this._initChart($$chartEl);
            // var resizeFn=IDS_Utils.throttle(this._addResizeEvent,100);
            // IDS_Utils.bindEvent(window,'resize',resizeFn.bind(this,chartEl));
            chartEl.setOption(chartOptions);     
        },
        _initChart($$chartEl){
            return  echarts.init($$chartEl);
        }
    }
})(window)