/*字体自适应*/
function setAdaption(_setPro, size) {
    return _setPro * size;
}
function toThousands(num) {
    var num = (num || 0).toString(), result = '';
    while (num.length > 3) {
        result = ',' + num.slice(-3) + result;
        num = num.slice(0, num.length - 3);
    }
    if (num) { result = num + result; }
    return result;
}
function carOptionGet(_setPro) {
    return {
        carOption: [
            {
                tooltip: {
                    formatter: "{a}<br/>{b}:{c}" + $.i18n.prop('order')
                },
                grid: {
                    width: "100%",
                    height: "100%"
                },
                series: [
                    {
                        name: '待处理',
                        type: 'gauge',
                        detail: {
                            offsetCenter: [0, '65%'],
                            formatter: function (value) {
                                return toThousands((value).toFixed(0)) + '' + $.i18n.prop('order');
                            },
                            textStyle: {
                                fontSize: setAdaption(_setPro, 10.5),
                                color: "#00A9FF"
                            }
                        },
                        data: [{ value: 15280, name: '待处理' }],
                        min: 0,
                        max: 1875,
                        splitNumber: 4,
                        radius: '98%',
                        pointer: {
                            width: setAdaption(_setPro, 3)
                        },
                        itemStyle: {
                            normal: {
                                color: '#00A8FF'
                            }
                        },
                        axisLine: {//坐标轴线
                            lineStyle: {//属性lineStyle控制线条样式
                                width: setAdaption(_setPro, 7),
                                color: [[1, new echarts.graphic.LinearGradient(0, 1, 1, 1, [{
                                    //0%处的颜色
                                    offset: 0, color: '#00A8FF'
                                },
                                {
                                    offset: 0.5, color: '#A25CD7'
                                },
                                {
                                    //100%处的颜色
                                    offset: 1, color: '#B664FD'
                                }], false)]]
                            }
                        },
                        axisTick: {//坐标轴小标记
                            show: false
                        },
                        splitLine: {//分隔线
                            show: false,
                            length: 10,
                            lineStyle: {
                                color: 'transparent'
                            }
                        },
                        axisLabel: {
                            show: false
                        },
                        title: {
                            offsetCenter: [0, '97%'],
                            textStyle: {
                                color: '#757C8C',
                                fontSize: setAdaption(_setPro, 10)
                            }
                        }
                    }
                ]
            },
            {
                tooltip: {
                    formatter: "{a}<br/>{b}:{c}" + $.i18n.prop('order')
                },
                grid: {
                    width: "100%",
                    height: "100%"
                },
                series: [
                    {
                        name: '待扫描',
                        type: 'gauge',
                        detail: {
                            offsetCenter: [0, '65%'],
                            formatter: function (value) {
                                return toThousands((value).toFixed(0)) + '' + $.i18n.prop('order');
                            },
                            textStyle: {
                                fontSize: setAdaption(_setPro, 10.5),
                                color: "#00A9FF"
                            }
                        },
                        data: [{ value: 3160, name: '待扫描' }],
                        min: 0,
                        max: 2500,
                        splitNumber: 4,
                        splitLine: {//分隔线
                            show: true,
                            length: 10,
                            lineStyle: {
                                color: 'transparent'
                            }
                        },
                        radius: '98%',
                        pointer: {
                            width: setAdaption(_setPro, 3)
                        },
                        itemStyle: {
                            normal: {
                                color: '#00A8FF'
                            }
                        },
                        axisLine: {//坐标轴线
                            lineStyle: {//属性lineStyle控制线条样式
                                width: setAdaption(_setPro, 7),
                                color: [[1, new echarts.graphic.LinearGradient(0, 1, 1, 1, [{
                                    //0%处的颜色
                                    offset: 0, color: '#00A8FF'
                                },
                                {
                                    offset: 0.5, color: '#A25CD7'
                                },
                                {
                                    //100%处的颜色
                                    offset: 1, color: '#B664FD'
                                }], false)]]
                            }
                        },
                        axisTick: {//坐标轴小标记
                            show: false
                        },
                        axisLabel: {
                            show: false
                        },
                        title: {
                            offsetCenter: [0, '97%'],
                            textStyle: {
                                color: '#757C8C',
                                fontSize: setAdaption(_setPro, 10)
                            }
                        }
                    }
                ]
            },
            {
                tooltip: {
                    formatter: "{a}<br/>{b}:{c}" + $.i18n.prop('order')
                },
                grid: {
                    width: "100%",
                    height: "100%"
                },
                series: [
                    {
                        name: '已超期',
                        type: 'gauge',
                        detail: {
                            offsetCenter: [0, '65%'],
                            formatter: function (value) {
                                return toThousands((value).toFixed(0)) + '' + $.i18n.prop('order');
                            },
                            textStyle: {
                                fontSize: setAdaption(_setPro, 10.5),
                                color: "#00A9FF"
                            }
                        },
                        data: [{ value: 66, name: '已超期' }],
                        min: 0,
                        max: 250,
                        splitNumber: 4,
                        splitLine: {//分隔线
                            show: true,
                            length: 10,
                            lineStyle: {
                                color: 'transparent'
                            }
                        },
                        radius: '98%',
                        pointer: {
                            width: setAdaption(_setPro, 3)
                        },
                        itemStyle: {
                            normal: {
                                color: '#00A8FF'
                            }
                        },
                        axisLine: {//坐标轴线
                            lineStyle: {//属性lineStyle控制线条样式
                                width: setAdaption(_setPro, 7),
                                color: [[1, new echarts.graphic.LinearGradient(0, 1, 1, 1, [{
                                    //0%处的颜色
                                    offset: 0, color: '#00A8FF'
                                },
                                {
                                    offset: 0.5, color: '#A25CD7'
                                },
                                {
                                    //100%处的颜色
                                    offset: 1, color: '#B664FD'
                                }], false)]]
                            }
                        },
                        axisTick: {//坐标轴小标记
                            show: false
                        },
                        axisLabel: {
                            show: false
                        },
                        title: {
                            offsetCenter: [0, '97%'],
                            textStyle: {
                                color: '#757C8C',
                                fontSize: setAdaption(_setPro, 10)
                            }
                        }
                    }
                ]
            }
        ],
        barOption: {
            legend: {
                data: [$.i18n.prop('finish'), $.i18n.prop('process'), $.i18n.prop('overdue')],
                icon: 'circle',
                itemGap: setAdaption(_setPro, 28),
                textStyle: {
                    color: '#5D6577',
                    fontSize: setAdaption(_setPro, 8)
                },
                top: '4%'
            },
            tooltip: {
                show: true,
                trigger: 'axis',
                formatter: function (params, ticket, callback) {
                    var res = params[0].name;
                    for (var i = 0, l = params.length; i < l; i++) {
                        res += '<br/>' + params[i].seriesName + ':' + (params[i].value ? params[i].value : '-');
                    }
                    return res;
                }
            },
            grid: {
                top: '13%',
                left: '5.5%',
                right: '4%',
                bottom: '2%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#2E3850',
                        width: 2
                    }
                },
                axisLabel: {
                    margin: 12,
                    fontSize: setAdaption(_setPro, 7.5),
                    color: '#4F576B'
                }
            },
            yAxis: {
                type: 'value',
                //min:0,
                //max:400,
                //interval:100,
                name: '(' + $.i18n.prop('order') + ')',
                nameLocation: 'end',
                nameTextStyle: {
                    color: '#5D6577',
                    fontSize: setAdaption(_setPro, 9),
                    padding: [0, setAdaption(_setPro, 26), 0, 0]
                },
                nameGap: setAdaption(_setPro, 15),
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: '#2C364E',
                        width: 1
                    }
                },
                axisLine: {
                    show: false
                },
                axisLabel: {
                    margin: 12,
                    fontSize: setAdaption(_setPro, 10),
                    color: '#4F576B'
                }
            },
            series: [
                {
                    name: $.i18n.prop('finish'),
                    type: 'bar',
                    stack: '完成情况',
                    barWidth: setAdaption(_setPro, 14)
                },
                {
                    name: $.i18n.prop('process'),
                    type: 'bar',
                    stack: '完成情况',
                    barWidth: setAdaption(_setPro, 14)
                },
                {
                    name: $.i18n.prop('overdue'),
                    type: 'bar',
                    stack: '完成情况',
                    data: [20, 12, 11, 24, 29, 33, 31, 20, 12, 11, 24, 29],
                    barWidth: setAdaption(_setPro, 14)
                }
            ],
            color: ['#07C2B5', '#2E83D8', '#B664FD']
        }
    }
}