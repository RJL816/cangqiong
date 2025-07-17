(function (KDApi, $, _) {
    function MyComponent(model) {
        this._setModel(model);
    }
    var isUpdate = false;
    MyComponent.prototype = {
        _setModel: function (model) {
            this.model = model;
        },
        init: function (props) {        
            setHtml(this.model, props, isUpdate);
        },
        update: function (props) {    
            setHtml(this.model, props);
        },
        destoryed: function () {            
        }
    }

    //可视化页面相关阀值比例
    const scaleMap = {
        'nsze': {
            min: 0.2,
            max: 0.3
        },
        'jmse': {
            min: 0.05,
            max: 0.2
        }
    }
    //纳税总额统计key
    const NSZE_KEY = 'nsze';
    //减免税额统计key
    const JMSE_KEY = 'jmse';
    //统计维度枚举
    const statisticMap = {
       // '减免税额':'jmse',
       // '纳税总额':'nsze'
    }

    var setHtml = function (model, props) {
        if (props && props.data && props.data.data) {
            KDApi.loadFile("../static/echart/echarts.min.all.4.9.0.js", model, () => {
                KDApi.templateFilePath("./html/board.html", model, {}).then(
                    result => {
                        model.dom.innerHTML = result;
                        initDiagram(model, props.data.data);
                    }
                );
            });
        }
    }

    function analyzaData(arr, key) {

        //实际值和虚拟展示值映射集合
        let actualVirtualMap = new Map();

        if (!arr || arr.length == 0) {
            return [];
        }
        //拷贝数据
        let tempArr = JSON.parse(JSON.stringify(arr));

        //获取最大纳税总额，以确定临界阈值。
        let nszeMax = 0;
        tempArr.forEach(function(data) {
            (data[NSZE_KEY] > nszeMax) && (nszeMax = data[NSZE_KEY]);
        });
        //最小阀值
        let minVal = nszeMax * scaleMap[JMSE_KEY].min;
        //最大阀值
        let maxVal = nszeMax * scaleMap[JMSE_KEY].max;

        //过滤小于最大阀值的数据
        tempArr.forEach(function(data) {
            if (data[JMSE_KEY] < maxVal) {
                actualVirtualMap.set(data[JMSE_KEY], data[JMSE_KEY]);
            }
            if (data[NSZE_KEY] < maxVal) {
                actualVirtualMap.set(data[NSZE_KEY], data[NSZE_KEY]);
            }
        });
        //将小于最大阀值的数据集做虚拟值映射
        if (actualVirtualMap.size > 0) {
            //排序
            let avList = Array.from(actualVirtualMap);
            avList = avList.sort(function(a, b) {
                return a[1] - b[1];
            });
            actualVirtualMap = new Map(avList.map(function(m) {
                return [m[0], m[1]];
            }));

            //根据小于最大阀值的数据集的length及minVal、maxVal确定相关数据集的虚拟展示值
            let baseVal = (maxVal - minVal) / actualVirtualMap.size;
            let baseCount = minVal;
            actualVirtualMap.forEach(function(data) {
                actualVirtualMap.set(data, baseCount);
                baseCount = baseCount + baseVal;
            });
        }
        tempArr.forEach(function(data) {
            data.value = actualVirtualMap.get(data[key]) ? actualVirtualMap.get(data[key]) : data[key];
            data.itemStyle.color = data.itemStyle[key + 'color']
        });
        return tempArr;
        //兼容es5写法
        // return arr.map(function (data) {
        //     let obj = JSON.parse(JSON.stringify(data));
        //     obj.value = (key ? data[key] : 10);
        //     obj.itemStyle.color = obj.itemStyle[key + 'color'];
        //     return obj;
        // });
    }

    var initDiagram = function (model, formData) {

        var option = {
            tooltip: {},
            angleAxis: {
                type: 'category',
                // 去掉边线
                axisLine: {
                    show: false
                },
                data: formData.map(function (data) {
                    return data.taxname
                })
            },
            polar: {
                radius: [0, '70%']
            },
            radiusAxis: {
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    show: false
                }
            },
            legend: {
                show: true,
             //   data: ['减免税额', '纳税总额'],
                y: 'bottom'
            },
            series: [
                // 饼图
                {
                    type: 'bar',
             //       name: '减免税额',
                    itemStyle: {
                        color: formData[0]?formData[0].itemStyle.jmsecolor:"#40A9FF"
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: e => {
                            return `
                            ${e.data.taxname}<br/>                            
                            减免税额: ${e.data.jmse}(万元)
                        `
                            // 纳税总额: ${e.data.nsze}(万元)<br/>
                        }
                    },
                    stack: 'a',
                    coordinateSystem: 'polar',
                    data: analyzaData(formData, 'jmse')
                }, {
                    type: 'bar',
          //          name: '纳税总额',
                    itemStyle: {
                        color: formData[0]?formData[0].itemStyle.nszecolor:"#FFC53D"
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: e => {
                            return `
                            ${e.data.taxname}<br/>                            
                            纳税总额: ${e.data.nsze}(万元)
                        `
                            //<br/>减免税额: ${e.data.jmse}(万元)
                        }
                    },
                    stack: 'a',
                    coordinateSystem: 'polar',
                    data: analyzaData(formData, 'nsze')
                }
            ]
        };

        //初始化echarts实例    
        var myChart = echarts.init(document.getElementById('taxactionBoard'));        

        //使用制定的配置项和数据显示图表
        myChart.setOption(option, true);
        myChart.on('click', function (params) {
            model.invoke('detail', { "taxName": params.data.taxname,"statisticType":statisticMap[params.seriesName] });
        });
    }

    KDApi.register('taxboard', MyComponent)
})(window.KDApi, jQuery);
