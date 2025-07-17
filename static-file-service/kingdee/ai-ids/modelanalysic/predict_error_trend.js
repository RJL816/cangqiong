// 错误标注图（总览）  ie11 兼容（完成）
window.ai_ids = window.ai_ids || {};
ai_ids["predict_error_trend_template"] = (function () {
  return {
    templateData: [
      {
        chartKey: "predict_error_trend",
        viewType: "chart",
        chartTitle: {
          text: "",
          bottom: "0",
          left: "40%",
          textStyle: {
            fontSize: 14
          }
        },
        chartStyle: {
          height: "150px"
        },
        tooltip: {
          show: true,
          formatter: function (params) {
            let data = null;
            if (Array.isArray(params)) {
              data = params[0];
            } else {
              data = params;
            }

            let value = data.value;
            let name = data.name;
            value = value + "%";
            if (!value) return;
            let showStr = name + "：" + value; // `${name}：${value}`;
            return '<span class="ai_ids__tooltip__span">' + showStr + "</span>";
          },
          backgroundColor: "rgba(0,0,0,0.65)",
          padding: [3, 5],
          borderColor: "transparent",
          textStyle: {
            color: "#fff"
          }
        },
        xAxis: {
          type: "catalog",
          data: "ftime",
          name: null,
          boundaryGap: false,
          axisTick: {
            lineStyle: {
              opacity: 0
            }
          },
          axisLine: {
            lineStyle: {
              color: "#999"
            },
            onZero: true
          },
          axisLabel: {
            color: "#999"
          }
        },
        yAxis: {
          type: "value",
          name: "", //销售数量
          nameGap: 50,
          axisLabel: {
            formatter: function (value) {
              if (value == 0) {
                return value;
              }
              return value + "%";
            },
            color: "#999"
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: "dashed"
            }
          }
        },
        grid: {
          left: 60,
          right: 40,
          top: 10,
          bottom: 30
        },
        series: {
          type: "line",
          data: "predictError",
          symbolSize: 0, //20,
          itemStyle: {
            color: "#5582F3",
            borderWidth: 0,
            borderColor: "#fff"
          },
          beforeMount: function (options) {
            console.log("options beforeMount is ", options);
            console.log("echart is ", window.echarts);
            // const { sourceData, uniqueCode, viewData } = options;
            const uniqueCode = options && options.uniqueCode;
            // let containerId = ai_ids.setting.getChartContainerByKey(uniqueCode)
            let chartData = ai_ids.setting.getChartDataByKey(
              "predict_error_trend"
            );
            console.log("chartData is ", chartData);
            //在这里对ie11做个兼容性处理（低代码设置0px的div在ie然后会展示，占据空间，而程序运行到此时是可以删除相关的dom节点）
            if (IDS_ModelAna_Utils.isIEBrowser()) {
              const modelTypeIdList =
                document.querySelectorAll("#fmodeltypeid");
              if (modelTypeIdList) {
                let count = modelTypeIdList.length;
                for (let i = 0; i < count; i++) {
                  const temp_dom = modelTypeIdList[i];
                  const parentNode = temp_dom && temp_dom.parentNode;
                  if (parentNode) {
                    const height = parentNode.style.height;
                    if (height == 0 || height == "0px") {
                      parentNode.style.display = "none";
                    }
                  }
                }
              }
            }
            if (chartData && Array.isArray(chartData)) {
              let target = chartData.filter(function (item) {
                return item.fmodeltypeid == uniqueCode; //fmodeltypeid fmodeltypeidFname:
              })[0];
              let predictErrorTrend = target.predictErrorTrend;
              let timeArr = [];
              let resultArr = [];
              if (!predictErrorTrend) return;
              predictErrorTrend.forEach(function (item) {
                const ftime = item.ftime;
                const predictError = item.predictError;
                timeArr.push(ftime);
                resultArr.push(predictError);
              });

              ai_ids.setting.setChartDataToPage(uniqueCode, {
                ftime: timeArr,
                predictError: resultArr
              });
            }
          },
          //确定最终的chart options
          updateOption: function (params) {
            // let chartData = ai_ids.setting.getChartDataByKey('error_mark_line')
            console.log("updateOptions!!!!!", params.chartOptions);
            // const { chartOptions, sourceData } = params;
            const chartOptions = params && params.chartOptions;
            if (chartOptions && chartOptions.series) {
              let xAxisData = chartOptions.xAxis && chartOptions.xAxis.data;
              //设置x轴的显示 tick刻度
              // if (xAxisData) {
              //   let interval = (xAxisData.length - 3) / 4
              //   interval = Math.ceil(interval)
              //   console.log('updateOption interval is ', interval)
              //   chartOptions.xAxis['axisLabel']['interval'] = interval
              // }
              chartOptions.series["areaStyle"] = {
                color: new window.echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  //这里是渐变的角度，上下左右四个方向
                  {
                    offset: 0,
                    color: "#096DD9" //这里是渐变色的起始颜色
                  },
                  {
                    offset: 1,
                    color: "#91D5FF" // 这里是渐变色的结束颜色
                  }
                ]), //'#5582F3',
                opacity: 0.09
              };
            }
          },
          //   //图形生命周期
          mounted: function (options) {
            console.log("mounted options data chartEl is ", options);
            // const { uniqueCode, chartEl, sourceData, pageId } = options
            if (options.uniqueCode) {
              let uniqueCode = options.uniqueCode;
              let chartEl = ai_ids.setting.getChartInstanceByKey(uniqueCode);
              if (chartEl) {
                window.addEventListener("resize", function () {
                  chartEl.resize();
                });
              }
            }
          }
        }
      }
    ]
  };
})();
