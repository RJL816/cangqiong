(function (KDApi, $, _) {
    function MyComponent(model) {
        this._setModel(model);
    }
    MyComponent.prototype = {
        _setModel: function (model) {
            this.model = model;
        },
        init: function (props) {        
            setHtml(this.model, props);
        },
        update: function (props) {    
            setHtml(this.model, props);
        },
        destoryed: function () {            
        }
    }


    var setHtml = function (model, props) {
        if (props && props.data && props.data.data) {
            KDApi.loadFile("../static/echart/echarts.min.all.4.9.0.js", model, () => {
                KDApi.templateFilePath("./html/area.html", model, {}).then(
                    result => {
                        model.dom.innerHTML = result;                        
                        initDiagram(model, props.data.data);
                    }
                );
            });
        }
    }

    var initDiagram = function (model, formData) {

        var option = {        
            tooltip: {
                trigger: 'item',
                formatter:  function(e){
                    return `${e.data.name}</br>${e.data.actualValue}万(${e.percent}%)`
                }
            },
            legend: {            
                bottom: 10,
                left: 'center',
            },
            series: [{
                type: 'pie',
                radius: '65%',
                center: ['50%', '50%'],
                selectedMode: 'single',
                data: formData.map(function(d) {
                    return {
                        value: Math.abs(d.value),
                        actualValue:d.value,
                        name: d.name,
                        itemStyle: {
                            color: d.color
                        }
                    }
                }),
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }]
        };

        //初始化echarts实例    
        var myChart = echarts.init(document.getElementById('areaStatistics'));        

        //使用制定的配置项和数据显示图表
        myChart.setOption(option, true);
        myChart.on('click', function (params) {
            model.invoke('detail', { "area": params.data.name,"color": params.data.itemStyle.color});
        });
    }

    KDApi.register('areastatistics', MyComponent)
})(window.KDApi, jQuery);
