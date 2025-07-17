window.ai_ids = window.ai_ids || {}
window.IDS_TemplateData1 = ai_ids[
  'sale_analysic_samKey_template'
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
            style: {
              display: 'inline-flex',
              width: '100%',
              height: '4200px',
              'justify-content': 'flex-end',
            },
            children: [
              {
                chartKey: 'sale_analysic_samKey',
                viewType: 'chart',
                chartTitle: {
                  text: '',
                  bottom: '0',
                  left: '40%',
                },
                chartStyle: {
                  // width:'80px',
                  // height:'500px'
                },
                tooltip: {
                  trigger: 'item',
                  triggerOn: 'mousemove',
                  formatter: function (params) {
                    var tips = params.data.tips
                    if (!tips || !Array.isArray(tips)) return
                    let tipStr =
                      '<div style="width:300px;display:flex;flex-direction:column;overflow:hidden;">'
                    tips.forEach(function (tip) {
                      let tempStr =
                        '<div style="width:100%;display:inline-flex;align-items:center;">'
                      tempStr += '<label>' + tip.label + '</label>'
                      tempStr +=
                        '<span style="width:200px;display:inline-block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">' +
                        tip.value +
                        '</span>'
                      tempStr += '</div>'
                      tipStr += tempStr
                    })
                    tipStr += '</div>'
                    return tipStr
                  },
                },

                series: [
                  {
                    type: 'sankey',
                    // data: window.sankeyData.nodes,
                    // links: window.sankeyData.links,
                    emphasis: {
                      focus: 'adjacency', //'adjacency'
                    },
                    nodeGap: 18,
                    label: {
                      show: true,
                      position: 'right',

                      width: 260,
                      overflow: 'truncate',
                      formatter(params) {
                        var label = params.data.label
                        return label
                      },
                    },
                    lineStyle: {
                      color: 'gradient',
                      curveness: 0.8,
                    },
                    itemStyle: {
                      opacity: 1,
                    },
                    //事件
                    bindEvent: [
                      {
                        eventName: 'click',
                        // eventFn:'_changeRadarDataByPieClick'
                        eventFn: function (params) {
                          // debugger
                          var chartEl = params.chartEl
                          var chartMap = params.chartMap
                          var chartData = params.chartData
                          var pars = params.params
                          var name = pars.name
                          document.querySelector(
                            '#ids__model_analysic_text',
                          ).firstChild.textContent = name
                          if (chartMap.hasOwnProperty('radarKey')) {
                            var radarChartEl = chartMap.radarKey
                            var radarData = chartData.pieData.filter(function (
                              item,
                            ) {
                              return item.name == name
                            })
                            var rk = radarData && radarData[0].id
                            IDS_ModelAna_Utils.sendEvent('click', { id: rk })
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
                    beforeMount: function (sourceData) {
                      //   sourceData.pieData.sort(function (a, b) {
                      //     return a.value - b.value
                      //   })
                    },

                    //图形生命周期
                    mounted: function (sourceData, chartEl) {
                      //   var size = sourceData.pieData.length - 1
                      //   if (chartEl) {
                      //     var options = chartEl.getOption()
                      //     chartEl.dispatchAction({
                      //       type: 'select',
                      //       dataIndex: size,
                      //     })
                      //   }
                      //   setTimeout(function () {
                      //     document.querySelector(
                      //       '#ids__model_analysic_text',
                      //     ).firstChild.textContent = sourceData.pieData[size].name
                      //   }, 100)
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  }
})()
