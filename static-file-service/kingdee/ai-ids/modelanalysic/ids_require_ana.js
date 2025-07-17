/**
 * 需求分析明细单 历史销售及预测分析（可视化表）  和  标注对销售影响分析（可视化表）两个合并成一个组件
 *
 */

// 错误标注图
window.ai_ids = window.ai_ids || {};
window.IDS_TemplateData1 = ai_ids["ids_require_ana_template"] = (function () {
  return {
    isManual: false, //是否手工时间同步到折线图
    lastDataZoomRange: { startValue: 0, endValue: 0 },
    templateData: [
      {
        chartKey: "ids_require_ana",
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
          },
          borderWidth: 0
        },
        legend: {
          show: true,
          top: 10
        },
        dataZoom: [
          {
            type: "inside",
            start: 0,
            end: 100,
            xAxisIndex: 0,
            throttle: 100
          },
          {
            xAxisIndex: 0
          }
        ],
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
        yAxis: [
          {
            type: "value",
            name: "数量",
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
          {
            type: "value",
            name: "绝对百分比误差",
            axisLabel: {
              formatter: "{value} %"
            },
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
          }
        ],
        grid: {
          left: 100,
          right: 50,
          top: 70
        },
        color: [
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
        ],
        series: {
          data: "result",
          itemStyle: {
            color: "#5582F3",
            borderWidth: 0,
            borderColor: "#fff"
          },
          beforeMount: function (options) {
            const { sourceData, chartOptions, uniqueCode } = options;
            const { sale_ana_data } = sourceData;
            let containerId = `ids_modelanalysic_${uniqueCode}`;
            function createTitle() {
              let titleDom = document.createElement("div");
              titleDom.className = "ids_require_title";
              titleDom.style.marginTop = "20px";
              titleDom.innerHTML = `<span class='ids_require_main_title0'>历史销售及预测分析</span>
                <span class='ids_require_main_title'></span>`;
              const wrapper = document.querySelector(`#${containerId}`); // containerId :ids_modelanalysic_ai_ids_req_value_ana_0250453779a74a1181675329bbc0462d
              wrapper.style.height = "890px";
              wrapper.style.overflow = "hidden";
              if (wrapper) {
                wrapper.appendChild(titleDom);
              }
            }
            createTitle();

            function getContainer() {
              let rect = {};
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
                "ids_require_ana_template"
              ].templateData[0].chartStyle.height = `${rect.height - 20}px`;
            }
          },
          //确定最终的chart options
          updateOption: function (params) {
            console.log("updateOptions!!!!!", params);
            // debugger
            let { chartOptions, sourceData, uniqueCode, chartEl } = params;
            let { sale_ana_data, mark_data } = sourceData;

            if (sale_ana_data) {
              let tempData = [];

              const dataList = sale_ana_data.dataList;
              const factqtyItem = dataList.filter((i) => i.id == "factqty")[0];
              const fpreqtyItem = dataList.filter((i) => i.id == "fpreqty")[0];
              const fapeItem = dataList.filter((i) => i.id == "fape")[0];
              if (factqtyItem) {
                tempData[tempData.length] = factqtyItem;
              }
              if (fpreqtyItem) {
                tempData[tempData.length] = fpreqtyItem;
              }
              if (fapeItem) {
                tempData[tempData.length] = fapeItem;
              }

              const restArr = dataList.filter(
                (i) => i.id != "factqty" && i.id != "fpreqty" && i.id != "fape"
              );
              tempData = [...tempData, ...restArr];
              sale_ana_data.dataList = tempData;
            }
            // let lineData = sale_ana_data.dataList.filter(
            //   (i) => i.id == 'fape',
            // )[0]
            // lineData.valueList = [10, 20, 30]
            let containerId = `ids_modelanalysic_${uniqueCode}`;
            // sale_ana_data = []
            if (sale_ana_data.length == 0) {
              console.log("chartEl is ", chartEl);
              const tempChartOps = chartEl.getOption();
              if (tempChartOps && tempChartOps.xAxis) {
                ai_ids["ids_require_ana_template"].cacheOps = tempChartOps;
              }

              drawEmpty();
              return false;
            }
            const { periodList, dataList, fpredimentypeCodeName } =
              sale_ana_data;
            clearEmpty();
            function clearEmpty() {
              d3.select(".ids_empty").remove();
            }
            function drawEmpty() {
              let canvasStr = `#${containerId} canvas`;
              let canvasDom = document.querySelector(canvasStr);
              if (canvasDom) {
                canvasDom.style.display = "none";
              }
              const container = d3.select(`#${containerId}`);

              ai_ids.svgHelper.renderEmpty(container);
            }
            let echartOptionData = {};

            let tempColorMap = {};

            var echartOpitionSetting = {};
            let timeArr = periodList;
            console.log("color map is ", tempColorMap);
            if (ai_ids["setting"]) {
              ai_ids["setting"]["tag_mark_ana"] = tempColorMap;
            }

            echartOpitionSetting.timeArr = timeArr;
            echartOpitionSetting.series = [];
            dataList.forEach((item, idx) => {
              const { id } = item;
              if (id == "fape") {
                item.type = "line";
                item.yAxisIndex = 1;
                item.color = "#FFA940";
              } else {
                item.type = "bar";
                // item.color = colors[idx]
                item.colorBy = "series";
              }
              const tempVal = item.valueList.map((d) => {
                return Number(d).toFixed(2);
              });
              item.data = tempVal;
            });
            echartOpitionSetting.series = dataList;
            let keys = Object.keys(echartOptionData);

            keys.forEach((key) => {
              if (key != "y" && key != "factvalue") {
                echartOpitionSetting.series.push(echartOptionData[key]);
              }
            });
            if (!chartOptions.xAxis) {
              chartOptions = ai_ids["ids_require_ana_template"].cacheOps;
            }

            chartOptions.series = echartOpitionSetting.series;
            // chartOptions.color = colors
            if (Array.isArray(chartOptions.xAxis)) {
              chartOptions.xAxis[0].data = timeArr;
            } else {
              // if (!chartOptions.xAxis) {
              //   chartOptions.xAxis = {
              //     type: "category",
              //     nameLocation: "center",
              //     nameGap: 40,
              //     data: []
              //   };
              // }
              chartOptions.xAxis.data = timeArr;
            }

            chartOptions.calculable = true;
            // chartOptions.title = {
            //   text: '历史销售及预测分析',
            //   left: 25,
            // }

            chartOptions.legend = {
              show: true,
              type: "scroll",
              top: 10
            };
            if (Array.isArray(chartOptions.yAxis)) {
              chartOptions.yAxis[0].name =
                sale_ana_data.fprevaluetype == "famount" ? "金额" : "数量";
            }

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
              borderWidth: 0,
              textStyle: {
                color: "#fff"
              }
            };
            // if (chartOptions.grid) {
            //   chartOptions.grid.height = 300;
            // }
            console.log("update options is ", chartOptions);
            setSubText(fpredimentypeCodeName);

            if (chartOptions.color) {
              delete chartOptions.color;
            }

            chartEl.clear();
            // chartEl.
            // chartEl.getDom().style.height = "380px";
            chartEl.resize({
              height: 380
            });
            chartEl.setOption(chartOptions);
            setTimeout(function () {
              const unselectedData = sale_ana_data.dataList.filter(
                (i) => i.id != "factqty" && i.id != "fpreqty" && i.id != "fape"
              );
              unselectedData.forEach((item) => {
                const { name } = item;
                chartEl.dispatchAction({
                  type: "legendUnSelect",
                  name
                });
              });
            }, 100);
            function setSubText(text) {
              let subTextDom = document.querySelector(
                `#${containerId} .ids_require_main_title`
              );
              if (subTextDom) {
                subTextDom.textContent = text;
              }
            }

            //渲染标签分析
            function renderMarkedGraph() {
              const markKeys = Object.keys(mark_data);
              const { fpredimentypeCodeName, values } = mark_data;
              let dom1 = document.querySelector(
                `#${containerId} .ids_require_ana_mark_wrapper`
              );
              let wrapperDom = null;
              const subTitleDom = document.querySelector(
                `#${containerId} .ids_require_sub_title`
              );
              if (subTitleDom) {
                subTitleDom.textContent = fpredimentypeCodeName;
              }
              if (!dom1) {
                wrapperDom = document.querySelector(`#${containerId}`);
                if (wrapperDom) {
                  let dom = document.createElement("div");
                  dom.className = "ids_require_ana_mark_wrapper";

                  dom.style.cssText = "margin-top:4px;position:relative;";
                  dom1 = dom;
                  //添加标题
                  let titleDom = document.createElement("div");
                  titleDom.className = "ids_require_title";
                  titleDom.style.marginTop = "20px";
                  titleDom.innerHTML = `<span class='ids_require_main_title1'>标注对销售影响分析</span>
                  <span class='ids_require_sub_title'>${fpredimentypeCodeName}</span>`;
                  wrapperDom.appendChild(titleDom);
                  wrapperDom.appendChild(dom);
                }
              }
              function createCanvas(timeArr1, temp_series) {
                var myChart1 = echarts.init(dom1, null, {
                  renderer: "canvas",
                  useDirtyRect: false,
                  height: 300
                });
                let markOptions = {
                  tooltip: {
                    show: true,
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
                    },
                    borderWidth: 0
                  },
                  grid: {
                    left: 100,
                    right: 50,
                    top: 70
                  },
                  toolbox: {
                    itemSize: 0
                  },
                  legend: {
                    show: true,
                    top: 10,
                    type: "scroll"
                  },
                  color: [
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
                  ],
                  xAxis: {
                    type: "category",
                    data: timeArr1
                  },
                  yAxis: {
                    type: "value",
                    name: "标签对销售数量的贡献值"
                  },
                  dataZoom: [
                    {
                      type: "inside",
                      start: 0,
                      end: 100,
                      xAxisIndex: 0
                    }
                    // {
                    //   xAxisIndex: 0,
                    // },
                  ],
                  series: temp_series
                };

                myChart1.setOption(markOptions);
                return myChart1;
              }
              if (!values || values.length == 0) {
                //没有数据
                const emptyStr = `#${containerId} .ids_require_ana_mark_wrapper .ids_emtpy`;
                if (d3.select(emptyStr).empty()) {
                  ai_ids.svgHelper.renderEmpty(
                    d3.select(`#${containerId} .ids_require_ana_mark_wrapper`)
                  );
                } else {
                  d3.select(emptyStr).style("display", "flex");
                }
                let myChart1 = ai_ids["setting"][`${uniqueCode}_mark`];
                if (myChart1 && myChart1._dom) {
                  myChart1._dom.firstElementChild.style.display = "none";
                }
                // const canvasStr=`.ids_require_ana_mark_wrapper`
              } else {
                const emptyStr = `#${containerId} .ids_require_ana_mark_wrapper .ids_emtpy`;
                if (!d3.select(emptyStr).empty()) {
                  d3.select(emptyStr).style("display", "none");
                }
                let timeArr = [];
                let temp_series = [];
                let stack = "one";
                values.forEach((item, idx) => {
                  const { ftime, tags } = item;
                  timeArr.push(ftime);
                  if (idx == 0) {
                    tags.forEach((dataItem) => {
                      let { id, name, value } = dataItem;
                      if (id != "factvalue") {
                        value = Number(value).toFixed(2);
                        let data = [value];
                        temp_series.push({
                          type: "bar",
                          name,
                          id,
                          stack,
                          data
                        });
                      } // 要去掉实际销售数量
                    });
                  } else {
                    tags.forEach((dataItem) => {
                      let { id, name, value } = dataItem;
                      if (id != "factvalue") {
                        // 要去掉实际销售数量
                        value = Number(value).toFixed(2);
                        const target = temp_series.filter(
                          (itemData) => itemData.id == id
                        )[0];
                        if (target) {
                          target.data.push(value);
                        }
                      }
                    });
                  }
                });
                let myChart1 = null;
                if (!dom1.querySelector("canvas")) {
                  myChart1 = createCanvas(timeArr, temp_series);
                  ai_ids["setting"][`${uniqueCode}_mark`] = myChart1;
                } else {
                  myChart1 = ai_ids["setting"][`${uniqueCode}_mark`];

                  if (myChart1) {
                    if (myChart1._dom) {
                      myChart1._dom.firstElementChild.style.display = "block";
                    }
                    let chartOptions = myChart1.getOption();
                    if (chartOptions) {
                      if (Array.isArray(chartOptions.xAxis)) {
                        chartOptions.xAxis[0].data = timeArr;
                      } else {
                        chartOptions.xAxis.data = timeArr;
                      }
                      if (Array.isArray(chartOptions.yAxis)) {
                        chartOptions.yAxis[0].name = `标签对销售${
                          sale_ana_data.fprevaluetype == "famount"
                            ? "金额"
                            : "数量"
                        }的贡献值`;
                      } else {
                        chartOptions.yAxis.name = `标签对销售${
                          sale_ana_data.fprevaluetype == "famount"
                            ? "金额"
                            : "数量"
                        }的贡献值`;
                      }
                      chartOptions.series = temp_series;
                      myChart1.setOption(chartOptions);
                    }
                    console.log("chartOptions is ", chartOptions);
                  }
                }
              }
            }
            renderMarkedGraph();
          },
          //图形生命周期
          mounted: function (options) {
            // console.log('options data chartEl is ', options.pageId)
            const { uniqueCode, chartEl, sourceData, pageId } = options;

            if (chartEl) {
              chartEl.pageId = pageId;
              // chartEl.on('datazoom', function (params) {
              // console.log('datazoom params is ', params)

              // if (params.batch) {
              //   const batch = params.batch[0]
              //   let start = batch.start
              //   let end = batch.end
              //   let markChartEl = ai_ids['setting'][`${uniqueCode}_mark`]
              //   if (markChartEl) {
              //     const chart1Opts = markChartEl.getOption()
              //     chart1Opts.dataZoom[0].start = start
              //     chart1Opts.dataZoom[0].end = end

              //     markChartEl.setOption(chart1Opts)
              //   }
              // } else {
              //   let start = params.start
              //   let end = params.end
              //   let markChartEl = ai_ids['setting'][`${uniqueCode}_mark`]
              //   if (markChartEl) {
              //     const chart1Opts = markChartEl.getOption()
              //     chart1Opts.dataZoom[0].start = start
              //     chart1Opts.dataZoom[0].end = end

              //     markChartEl.setOption(chart1Opts)
              //   }
              // }
              // return false
              // })

              chartEl.on("legendselectchanged", function (params) {
                // console.log('params is ', params)
                const { sale_ana_data } = sourceData;
                let dataList = sale_ana_data.dataList || [];
                const { name, selected } = params;
                let selectedCount = 0;
                if (selected) {
                  const selectedKeys = Object.keys(selected);
                  //   console.log('type is ', selectedKeys)
                  selectedKeys.forEach((key) => {
                    const value = selected[key];
                    let nameItem = dataList.filter((i) => i.name == key)[0];
                    if (nameItem["id"] == "fape") {
                    } else {
                      if (value) {
                        selectedCount++;
                      }
                    }
                  });
                  if (selectedCount > 2) {
                    console.error("同时选中的项不能超过2个!");
                    window.IDS_ModelAna_Utils.sendEvent(
                      "showTip",
                      {
                        errcode: -1,
                        description: "error",
                        descriptionCn: "同时选中的项不能超过2个!"
                      },
                      chartEl.pageId
                    );
                    chartEl.dispatchAction({
                      type: "legendUnSelect",
                      name
                    });
                    return;
                  }
                  // 实际销售数量 id 为factqty 的中文名称
                  const factQtyName = dataList.filter(
                    (i) => i.id == "factqty"
                  )[0];
                  const fpreqtyName = dataList.filter(
                    (i) => i.id == "fpreqty"
                  )[0];
                  const fapeName = dataList.filter((i) => i.id == "fape");
                  if (
                    selected[factQtyName.name] &&
                    selected[fpreqtyName.name]
                  ) {
                    if (fapeName.length > 0) {
                      chartEl.dispatchAction({
                        type: "legendSelect",
                        name: fapeName[0].name
                      });
                    }
                  } else {
                    if (fapeName.length > 0) {
                      chartEl.dispatchAction({
                        type: "legendUnSelect",
                        name: fapeName[0].name
                      });
                    }
                  }
                }
              });
            }
          }
        }
      }
    ]
  };
})();
