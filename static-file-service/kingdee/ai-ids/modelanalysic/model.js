window.IDS_TemplateData = ai_ids[
  'pie_radar_ids__modelAna_container_template'
] = (function () {
  return {
    templateData: [
      {
        type: 'container',
        style: {
          display: 'inline-flex',
          width: '100%',
        },
        children: [
          {
            type: 'container',
            className: 'container1',
            style: {
              display: 'inline-flex',
              width: '50%',
              'justify-content': 'flex-end',
            },
            children: [
              {
                chartKey: 'pieKey',
                viewType: 'chart',
                color: ['#607be8', '#45DAD1', '#B889EA', '#40A9FF'],
                colorBy: 'data',
                chartTitle: {
                  text: '',
                  bottom: '0',
                  left: '40%',
                },
                chartStyle: {
                  height: '400px',
                },
                legend: {
                  show: false,
                  orient: 'horizontal',
                },
                tooltip: {
                  trigger: 'item',
                },
                xAxis: { name: '', type: 'value' },
                yAxis: {
                  type: 'category',
                  axisTick: {
                    show: false,
                  },
                  axisLine: {
                    lineStyle: {
                      color: '#d9d9d9',
                    },
                  },
                  axisLabel: {
                    rotate: 70,
                    color: '#000',
                  },
                  data: 'pieData.name',
                  dataFrom: 'props',
                },
                series: {
                  type: 'bar',
                  name: 'value',
                  data: 'pieData',
                  itemStyle: {
                    opacity: 0.2,
                  },
                  selectedMode: 'single',
                  select: {
                    barWidth: 250,
                    itemStyle: {
                      color: '#f273b5',
                      borderColor: '#f273b5',
                      opacity: 1,
                    },
                    //#f273b5
                  },
                  emphasis: {
                    itemStyle: {
                      color: '#d9d9d9',
                      borderColor: '#d9d9d9',
                    },
                  },
                  barWidth: 30,
                  //事件
                  bindEvent: [
                    {
                      eventName: 'click',
                      // eventFn:'_changeRadarDataByPieClick'
                      eventFn: function (params) {
                        var chartEl = params.chartEl
                        var chartMap = ai_ids.setting.getChartInstanceByKey(
                          'pie_radar_ids__modelAna_container',
                        ) //params.chartMap
                        var chartData = params.chartData
                        var pars = params.params
                        var targetId = pars.data.id
                        var name = pars.name
                        document.querySelector(
                          '#ids__model_analysic_text',
                        ).firstChild.textContent = name
                        if (chartMap.hasOwnProperty('radarKey')) {
                          var radarData = chartData.pieData.filter(function (
                            item,
                          ) {
                            return item.name == name
                          })
                          var rk = radarData && radarData[0].id
                          let pageInfo = ai_ids.setting.getPageInfoFromPage(
                            params.uniqueCode,
                          )
                          let pageId = pageInfo.pageId
                          IDS_ModelAna_Utils.sendEvent(
                            'click',
                            { id: rk },
                            pageId,
                          )

                          // radarData=chartData[rk];
                          // console.log("temp radarData is ",radarData);
                          // var radarResult=IDS_ModelAna_ChartUtils._transformRadar(radarData);
                          // console.log("radarResult ilkskdjfldsf temp is ",radarResult);
                          // var options=radarChartEl.getOption();
                          // if(options){

                          //     options.radar[0].indicator=radarResult.indicator;
                          //     options.series[0].data[0].value=radarResult.dataVal;
                          // }
                          // console.log("temp optionsdfjlksdf is ",options);
                          // IDS_ModelAna_ChartUtils.reRenderChart(radarChartEl,options)
                        }
                      },
                    },
                  ],

                  //取数
                  dataTransform: 'false', // 是否需要做数据转换标志
                  dataFrom: 'props', //取数来源
                  calculate: function (sourceData) {
                    // let tempArr=sourceData.slice();
                    sourceData.sort(function (a, b) {
                      return a.value - b.value
                    })
                    var result = sourceData.map((item) => {
                      return Number(item.value)
                    })
                    return result
                  },
                  beforeMount: function (options) {
                    const {
                      sourceData, //: { links, nodes },
                      uniqueCode,
                      isUpdate,
                    } = options
                    console.log('chartData is ', sourceData)
                    sourceData.pieData.sort(function (a, b) {
                      return a.value - b.value
                    })
                  },

                  //图形生命周期
                  mounted: function (options) {
                    const { chartEl, sourceData } = options
                    var size = sourceData.pieData.length - 1
                    if (chartEl) {
                      var options = chartEl.getOption()
                      chartEl.dispatchAction({
                        type: 'select',
                        dataIndex: size,
                      })
                    }
                    setTimeout(function () {
                      document.querySelector(
                        '#ids__model_analysic_text',
                      ).firstChild.textContent = sourceData.pieData[size].name
                    }, 100)
                  },
                },

                data: {},
              },
            ],
          },
          {
            type: 'container',
            className: 'container2',
            style: {
              display: 'inline-flex',
              width: '50%',
              'justify-content': 'flex-end',
              position: 'relative',
            },
            children: [
              {
                viewType: 'view',
                content: '',
                style: {
                  width: '4px',
                  height: '18px',
                  position: 'absolute',
                  left: 0,
                  background: '#6682F5',
                },
              },
              {
                viewType: 'view',
                content: '增长趋势',
                id: 'ids__model_analysic_text',
                style: {
                  position: 'absolute',
                  left: '4px',
                  'margin-left': '4px',
                  'font-size': '14px',
                  color: '#212121',
                },
              },
              {
                chartKey: 'radarKey',
                viewType: 'chart',
                chartTitle: {
                  text: '',
                  bottom: 0,
                  left: '40%',
                },
                chartStyle: {
                  height: '500px',
                },
                legend: {
                  show: false,
                },
                series: [
                  {
                    type: 'radar',
                    name: '订单数量',
                    data: 'other_factor', //'historical_trend',
                    dataTransform: true, // 是否需要做数据转换标志
                    dataFrom: 'props', //取数来源
                  },
                ],

                data: {},
              },
            ],
          },
        ],
      },
    ],
  }
})()
