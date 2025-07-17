// 错误标注图
window.ai_ids = window.ai_ids || {};
window.IDS_TemplateData1 = ai_ids["tag_mark_ana_template"] = (function () {
  return {
    isManual: false, //是否手工时间同步到折线图
    lastDataZoomRange: { startValue: 0, endValue: 0 },
    templateData: [
      {
        chartKey: "tag_mark_ana",
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
          // width:'80px',
          height: "420px"
        },
        toolbox: {
          show: false,
          itemSize: 0,
          feature: {
            dataZoom: {
              yAxisIndex: "none"
            }
          }
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
            label: {
              show: false
            }
          },
          confine: true,
          backgroundColor: "rgba(0,0,0,.5)",
          textStyle: {
            color: "#fff"
          }
        },
        legend: {
          show: true,
          left: "10%",
          width: "80%"
        },
        // color: [
        //   '#40B8F8',
        //   '#C0DAF8',
        //   '#D3F5F4',
        //   '#7FD4D2',
        //   '#9CD9F5',
        //   '#9CC1F5',
        //   '#D9CCF7',
        //   '#F7EECC',
        //   '#F6E1C7',
        //   '#E0E5E8',
        // ],
        xAxis: {
          type: "catalog",
          data: "fdate",
          //   name: '日期',
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: "#e5e5e5"
            }
          },
          axisLabel: {
            color: "#555"
          }
        },
        yAxis: {
          type: "value",
          name: "（销售数量）",
          nameLocation: "end",
          nameTextStyle: {
            verticalAlign: "top",
            color: "#999",
            padding: [24, 0, 0, -12]
          },
          nameGap: 50,
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: "dashed"
            }
          }
        },
        grid: {
          left: "6%",
          right: 50
        },
        dataZoom: [
          {
            show: false,
            start: 90,
            end: 100
          },
          {
            type: "inside",
            start: 90,
            end: 100
          }
        ],
        series: {
          tooltip: {},
          data: "result",
          symbol: function (data, params) {
            const {
              data: { isOutlier, isMark }
            } = params;
            let imgPath = "";
            let isCangQiong = IDS_ModelAna_Utils.isCangQiong();
            if (isMark == 1) {
              imgPath = isCangQiong
                ? "./kingdee/ai-ids/modelanalysic/img/bemarked.png"
                : "./imgs/bemarked.png";
            } else if (isOutlier == 1) {
              imgPath = isCangQiong
                ? "./kingdee/ai-ids/modelanalysic/img/error.png"
                : "./imgs/error.png";
            } else {
              imgPath = isCangQiong
                ? "./kingdee/ai-ids/modelanalysic/img/normal.png"
                : "./imgs/normal.png";
            }
            return `image://${imgPath}`;
          },
          symbolSize: 20, //20,
          itemStyle: {
            color: "#5582F3",
            borderWidth: 0,
            borderColor: "#fff"
          },
          beforeMount: function (options) {
            const { sourceData, chartOptions } = options;
            d3.select("#ai_ids_data_mark_analysis")
              .append("div")
              .text("标注分析")
              .style("margin-top", "4px")
              .style("padding-left", "10px")
              .style("font-size", "14px")
              .style("font-weight", 400);
            function getContainer() {
              let rect = null;
              const container = document.querySelector(
                "#ai_ids_data_mark_analysis"
              );
              const drawerDom = document.querySelector("#flexdrawer");
              let height = 400;
              if (drawerDom) {
                const drawerRect = drawerDom.getBoundingClientRect();
                let flexpanellapH = 320;
                // 这里做个小屏适配
                if (drawerRect.height < 700) {
                  const flexpanellap =
                    document.querySelector("#flexpanelap1211");
                  flexpanellapH = 200;
                  if (flexpanellap) {
                    flexpanellap.style.height = `${flexpanellapH}px`;
                  }
                }
                height = drawerRect.height - 50 - 40 - flexpanellapH - 20;
              }
              if (container) {
                rect = container.getBoundingClientRect();
              }
              if (rect && rect.width == 0) {
                rect = {
                  width: 700
                };
              }
              rect.height = height || 340;
              return rect;
            }
            const rect = getContainer();
            console.log("qhx rect is ", rect);
            if (rect && rect.height) {
              ai_ids[
                "tag_mark_ana_template"
              ].templateData[0].chartStyle.height = `${rect.height - 20}px`;
            }
          },
          //确定最终的chart options
          updateOption: function (params) {
            // let chartData = ai_ids.setting.getChartDataByKey('error_mark_line')
            console.log("updateOptions!!!!!", params);
            // debugger
            let { chartOptions, sourceData, uniqueCode, chartEl } = params;
            let { fpretimetype, values } = sourceData;

            if (values.length == 0) {
              console.log("chartEl is ", chartEl);
              const tempChartOps = chartEl.getOption();
              if (tempChartOps && tempChartOps.xAxis) {
                ai_ids["tag_mark_ana_template"].cacheOps = tempChartOps;
              }

              drawEmpty();
              return false;
            }
            clearEmpty();
            function clearEmpty() {
              d3.select(".ids__tag_mark_ana__wrapper").remove();
            }
            function drawEmpty() {
              const container = d3.select("#ai_ids_data_mark_analysis");
              const tempDom = document.querySelector(
                ".ids__tag_mark_ana__wrapper"
              );
              if (tempDom) return;
              const tempWrapper = container
                .append("div")
                .attr("class", "ids__tag_mark_ana__wrapper");
              //./kingdee/ai-ids/modelanalysic/img/bemarked.png
              tempWrapper
                .append("img")
                .attr("src", "./kingdee/ai-ids/modelanalysic/img/empty.png");

              tempWrapper
                .append("div")
                .text("没有数据哦")
                .style("text-align", "center")
                .style("color", "#333");
            }
            let echartOptionData = {};
            let colors = [
              "#40B8F8",
              "#C0DAF8",
              "#D3F5F4",
              "#7FD4D2",
              "#9CD9F5",
              "#9CC1F5",
              "#D9CCF7",
              "#F7EECC",
              "#F6E1C7",
              "#E0E5E8",
              "#C6F7E9",
              "#E1D6BC"
            ];

            let tempColorMap = {};
            values[0].tags.forEach((item, idx) => {
              if (item.id == "y" || item.id == "factvalue") {
                tempColorMap[item.id] = "#C5C6C7";
                //堆叠图总的
                echartOptionData[item.id] = {
                  name: item.name,
                  type: "bar",
                  barGap: "0.08",
                  // label: {
                  //   show: true,
                  //   position: 'inside'
                  // },
                  emphasis: {
                    focus: "series"
                  },
                  data: [],
                  itemStyle: {
                    color: "#C5C6C7"
                  }
                };
              } else {
                let tempColor = colors[idx];
                tempColorMap[item.id] = tempColor;
                //堆叠图总分量
                echartOptionData[item.id] = {
                  name: item.name,
                  type: "bar",
                  stack: "Total",
                  // label: {
                  //   show: true
                  // },
                  emphasis: {
                    focus: "series"
                  },
                  data: [],
                  itemStyle: {
                    color: tempColor
                  }
                };
              }
            });
            var echartOpitionSetting = {};
            let timeArr = [];
            values.forEach((item) => {
              // const tags=item.tags;
              const { tags, ftime } = item;
              timeArr.push(ftime);
              tags.forEach((itemData) => {
                const { id, value } = itemData;
                echartOptionData[id].data.push(Number(value).toFixed(2));
              });
            });
            console.log("color map is ", tempColorMap);
            if (ai_ids["setting"]) {
              ai_ids["setting"]["tag_mark_ana"] = tempColorMap;
            }

            echartOpitionSetting.timeArr = timeArr;
            echartOpitionSetting.series = [];
            let keys = Object.keys(echartOptionData);
            keys.forEach((key) => {
              if (key != "y" && key != "factvalue") {
                echartOpitionSetting.series.push(echartOptionData[key]);
              }
            });
            echartOpitionSetting.series.unshift(
              echartOptionData["y"] || echartOptionData["factvalue"]
            );
            if (
              !chartOptions.xAxis &&
              ai_ids["tag_mark_ana_template"].cacheOps
            ) {
              chartOptions = ai_ids["tag_mark_ana_template"].cacheOps;
            }
            chartOptions.series = echartOpitionSetting.series;
            if (Array.isArray(chartOptions.xAxis)) {
              chartOptions.xAxis[0].data = timeArr;
            } else {
              if (!chartOptions.xAxis) {
                chartOptions.xAxis = {
                  type: "category",
                  nameLocation: "center",
                  nameGap: 40,
                  data: []
                };
              }
              chartOptions.xAxis.data = timeArr;
            }

            if (!chartOptions.yAxis) {
              chartOptions.yAxis = {
                name: "（销售数量）",
                nameGap: 50,
                nameLocation: "end",
                type: "value",
                axisLine: { show: false },
                axisTick: { show: false },
                nameTextStyle: {
                  verticalAlign: "top",
                  color: "#999"
                }
              };
            }

            chartOptions.calculable = true;

            // chartOptions.color = colors
            // chartOptions.colorBy = 'data'
            chartOptions.legend = {
              show: true,
              type: "scroll",
              left: "10%",
              width: "80%"
            };
            chartOptions.tooltip = {
              trigger: "axis",
              axisPointer: {
                type: "shadow",
                label: {
                  show: false
                }
              },
              confine: true,
              backgroundColor: "rgba(0,0,0,.5)",
              textStyle: {
                color: "#fff"
              }
            };
            console.log("update options is ", chartOptions);
            chartEl.clear();
            chartEl.setOption(chartOptions);
          },
          //图形生命周期
          mounted: function (options) {
            // console.log('options data chartEl is ', options.pageId)
            const { uniqueCode, chartEl, sourceData, pageId } = options;
          }
        }
      }
    ]
  };
})();
