// 错误标注图 ie11 兼容性
window.ai_ids = window.ai_ids || {};
window.IDS_TemplateData1 = ai_ids["error_mark_line_template"] = (function () {
  return {
    createFirstUsageBox: function () {
      let isCangQiong = IDS_ModelAna_Utils.isCangQiong();
      var boxWrapper = document.createElement("div");
      boxWrapper.className = "ai_ids__tip__first";
      var iconWrapper = document.createElement("span");
      iconWrapper.className = "ai_ids__tip__icon";
      var imgDom = document.createElement("img");
      imgDom.src = isCangQiong
        ? "./kingdee/ai-ids/modelanalysic/img/mouse_arrow.png"
        : "./img/mouse_arrow.png";
      iconWrapper.appendChild(imgDom);

      var tipDom = document.createElement("span");
      tipDom.innerText = "试试通过鼠标框选内容";
      boxWrapper.appendChild(iconWrapper);
      boxWrapper.appendChild(tipDom);
      return boxWrapper;
    },
    isManual: false, //是否手工时间同步到折线图
    lastDataZoomRange: { startValue: 0, endValue: 0 },
    templateData: [
      {
        chartKey: "error_mark_line",
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
          height: "340px"
        },
        toolbox: {
          show: true,
          itemSize: 0,
          feature: {
            dataZoom: {
              yAxisIndex: "none"
            }
          }
        },
        tooltip: {
          show: true,
          formatter: function (params) {
            const row = params[0];
            // 为了兼容IE11,将对象简写方法改成es5 的写法 模板字符串 qhx_0117 特性：兼容IE11
            // return `<div>
            //           <label>${row.axisValue}：</label>
            //           <span>${row.value}</span>
            //         </div>`
            return (
              "<div><label>" +
              row.axisValue +
              "：</label><span>" +
              row.value +
              "</span></div>"
            );
          },
          backgroundColor: "rgba(0,0,0,.5)",
          textStyle: {
            color: "#fff"
          }
        },
        xAxis: {
          type: "catalog",
          data: "fdate",
          name: "日期"
        },
        yAxis: {
          type: "value",
          name: "销售数量",
          nameGap: 50
        },
        grid: {
          left: "6%",
          right: 100
        },
        dataZoom: [
          {
            type: "inside",
            start: 0,
            end: 100
          },
          {
            start: 0,
            end: 100
          }
        ],

        //事件
        // bindEvent: {
        //   eventName: 'click',
        //   // eventFn:'_changeRadarDataByPieClick'
        //   eventFn: function (params) {
        //     console.log('click params is ', params)
        //     const {
        //       chartEventObj: {
        //         event: { offsetX, offsetY },
        //         data: { billCount, value, tag, customTag },
        //         dataIndex,
        //       },
        //       chartData,
        //       uniqueCode,
        //       chartEl,
        //       pageId,
        //     } = params

        //     //更新日期点的状态
        //     function updateNodeStatus(xAxisDatapar, flag, customTag, tag) {
        //       const opts = chartEl.getOption()
        //       const { series, xAxis } = opts
        //       let data = series[0].data
        //       let xAxisData = xAxis[0].data
        //       console.log('errorline options is ', opts)
        //       console.log('errorline data is ', data)
        //       let idx = xAxisData.indexOf(xAxisDatapar)
        //       console.log('errorline idx is ', idx)
        //       if (idx > -1) {
        //         opts.series[0].data[idx].isMark = flag == 'mark' ? 1 : 0
        //         if (flag == 'mark') {
        //           opts.series[0].data[idx].customTag = customTag
        //           opts.series[0].data[idx].tag = tag
        //         } else if (flag == 'remove') {
        //           opts.series[0].data[idx].tag = ''
        //           opts.series[0].data[idx].customTag = ''
        //         }
        //         // customTag tag
        //         chartEl.setOption(opts)
        //       }
        //     }
        //     let fdate = chartData.fdate[dataIndex]
        //     console.log('fdata in qhx is ', fdate)
        //     //刷新单据
        //     window.IDS_ModelAna_Utils.sendEvent(
        //       'refreshBillList',
        //       {
        //         // fdate,  //接口改版 fdate 弃     用 fstartdate   fenddate 表示起始和结束时间，如果是同一天则相同
        //         fstartdate: fdate,
        //         fenddate: fdate,
        //       },
        //       pageId,
        //     )
        //     //除了显示标注框外，还要发送请求
        //     window.ai_ids['initScript'].$init({
        //       componentName: 'ai-ids__toolTip',
        //       chartType: 'error_mark_line',
        //       offset: [offsetX, offsetY],
        //       show: true,
        //       pageId,
        //       chartEl,
        //       componentList: {
        //         textList: [
        //           {
        //             label: '',
        //             value: fdate,
        //             key: 'fdate',
        //             isChanged: true,
        //             valueStyle: {
        //               'font-size': '14px',
        //               color: '#212121',
        //               'font-weight': 600,
        //             },
        //           },
        //           {
        //             label: '销售数量',
        //             value: value,
        //             key: 'value',
        //             isChanged: true,
        //           },
        //           {
        //             label: '单据数量',
        //             value: billCount,
        //             key: 'billCount',
        //             isChanged: true,
        //           },
        //           {
        //             label: 'pageId',
        //             value: pageId,
        //             key: 'pageId',
        //             isChanged: true,
        //             rowStyle: {
        //               display: 'none',
        //             },
        //           },
        //           { label: '异常标注', value: '' },
        //         ],
        //         select: {
        //           curSelected: tag || '',
        //           isChanged: true,
        //           key: 'tag',
        //           options: function () {
        //             return ai_ids.setting
        //               .getChartDataByKey(uniqueCode)
        //               .tagList.map((item) => {
        //                 return {
        //                   name: item.fname,
        //                   value: item.fnumber,
        //                 }
        //               })
        //           },
        //         },
        //         input: {
        //           placeholder: '备注',
        //           value: customTag,
        //           key: 'customTag',
        //           isChanged: true,
        //         },
        //         btnList: [
        //           {
        //             btnName: '确定',
        //             key: 'sure',
        //             btnStyle: { 'background-color': '#5582F3' },
        //             btnPars: { pageId },
        //             onClick: function (params) {
        //               console.log('sure params is ', params)
        //               let formData = window.ai_ids['initScript'].$getFormValue({
        //                 componentName: 'ai-ids__toolTip',
        //                 chartType: 'error_mark_line',
        //               })
        //               // console.log('formData sure is ', formData)
        //               // console.log('pageId is ', pageId)
        //               //verify
        //               if (!formData.tag && !formData.customTag) {
        //                 //删除标注
        //                 window.IDS_ModelAna_Utils.sendEvent(
        //                   'showTip',
        //                   {
        //                     errcode: -1,
        //                     description: 'error',
        //                     descriptionCn: '异常标注或备注不能全为空!',
        //                   },
        //                   formData.pageId,
        //                 )
        //                 console.error('异常标注或备注不能全为空!')
        //                 return
        //               }

        //               if (formData) {
        //                 let submitPars = {
        //                   fcustomTag: formData.customTag,
        //                   fdate: formData.fdate,
        //                   ftag: formData.tag,
        //                 }
        //                 let fdate = formData.fdate
        //                 updateNodeStatus(
        //                   fdate,
        //                   'mark',
        //                   formData.customTag,
        //                   formData.tag,
        //                 )
        //                 //保存标注
        //                 window.IDS_ModelAna_Utils.sendEvent(
        //                   'saveMark',
        //                   submitPars,
        //                   formData.pageId,
        //                 )
        //                 window.ai_ids['initScript'].$hide({
        //                   componentName: 'ai-ids__toolTip',
        //                   chartType: 'error_mark_line',
        //                 })
        //               }
        //             },
        //           },
        //           {
        //             btnName: '删除标注',
        //             key: 'cancel',
        //             btnStyle: {
        //               'background-color': '#fff',
        //               border: '1px solid rgb(217,217,217)',
        //               color: 'rgb(35,36,40)',
        //             },
        //             onClick: function (params) {
        //               let formData = window.ai_ids['initScript'].$getFormValue({
        //                 componentName: 'ai-ids__toolTip',
        //                 chartType: 'error_mark_line',
        //               })
        //               //删除标注
        //               window.IDS_ModelAna_Utils.sendEvent(
        //                 'deleteMark',
        //                 {
        //                   fdate: formData.fdate, //单据日期
        //                 },
        //                 formData.pageId,
        //               )
        //               updateNodeStatus(formData.fdate, 'remove') //同步曲线节点状态
        //               //隐藏框
        //               window.ai_ids['initScript'].$hide({
        //                 componentName: 'ai-ids__toolTip',
        //                 chartType: 'error_mark_line',
        //               })
        //             },
        //           },
        //         ],
        //       },

        //       globalEvent: {
        //         mouseup: function (params) {
        //           const container = window.ai_ids['initScript'].$get({
        //             componentName: 'ai-ids__toolTip',
        //             chartType: 'error_mark_line',
        //           })
        //           let mouseEventTarget = params.target
        //           if (!container.contains(mouseEventTarget)) {
        //             window.ai_ids['initScript'].$hide({
        //               componentName: 'ai-ids__toolTip',
        //               chartType: 'error_mark_line',
        //             })
        //           }
        //         },
        //       },
        //     })
        //   },
        // },

        series: {
          type: "line",
          tooltip: {},
          data: "result",
          symbol: function (data, params) {
            // const {
            //   data: { isOutlier, isMark },
            // } = params
            // 为了兼容IE11,将对象简写方法改成es5 的写法 模板字符串 qhx_0117 特性：兼容IE11
            var tempData = params && params.data;
            var isOutlier = tempData && tempData.isOutlier,
              isMark = tempData && tempData.isMark;
            let imgPath = "";
            let isCangQiong = IDS_ModelAna_Utils.isCangQiong();
            if (isMark == 1) {
              imgPath = isCangQiong
                ? "./kingdee/ai-ids/modelanalysic/img/bemarked.png"
                : "../imgs/bemarked.png";
            } else if (isOutlier == 1) {
              imgPath = isCangQiong
                ? "./kingdee/ai-ids/modelanalysic/img/error.png"
                : "../imgs/error.png";
            } else {
              imgPath = isCangQiong
                ? "./kingdee/ai-ids/modelanalysic/img/normal.png"
                : "../imgs/normal.png";
            }
            return "image://" + imgPath; //`image://${imgPath}`
          },
          symbolSize: 20, //20,
          itemStyle: {
            color: "#5582F3",
            borderWidth: 0,
            borderColor: "#fff"
          },
          //   areaStyle: {
          //     color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          //       //这里是渐变的角度，上下左右四个方向
          //       {
          //         offset: 0,
          //         color: '#096DD9', //这里是渐变色的起始颜色
          //       },
          //       {
          //         offset: 1,
          //         color: '#91D5FF', // 这里是渐变色的结束颜色
          //       },
          //     ]), //'#5582F3',
          //     opacity: 0.09,
          //   },
          beforeMount: function (options) {
            console.log("options beforeMount is ", options);
            // ie11 兼容
            // const {
            //   sourceData: { fdate },
            //   uniqueCode,
            //   viewData
            // } = options;
            const uniqueCode = options && options.uniqueCode,
              viewData = options && options.viewData,
              fdate = options && options.sourceData && options.sourceData.fdate;
            let containerId = ai_ids.setting.getChartContainerByKey(uniqueCode);
            // containerId = 'ids__modelAna_container'
            //ids__modelAna_container
            if (fdate && fdate.length > 365) {
              let len = fdate.length;
              console.log("len is ", len);
              let startValue = ((len - 365) / len) * 100;
              startValue = Math.floor(startValue);
              console.log("startValue is ", startValue);
              viewData.dataZoom[0].start = startValue;
              viewData.dataZoom[1].start = startValue;
            } else {
              viewData.dataZoom[0].start = 0;
              viewData.dataZoom[1].start = 0;
            }
            d3.select("#" + containerId)
              .append("div")
              .attr("class", "ai_ids__error_mark_line__legend")
              .selectAll(".ai_ids__error_mark_line__legend>span")
              .data([
                {
                  color: "#276FF5",
                  text: "正常日期",
                  class: "ai_ids__error__normal"
                },
                {
                  color: "#FF991C",
                  text: "异常日期",
                  class: "ai_ids__error__green"
                },
                {
                  color: "#1BA854",
                  text: "标注日期",
                  class: "ai_ids__error__blue"
                }
              ])
              .enter()
              .append("span")
              .attr("class", function (d) {
                return [
                  d.class,
                  "ai_ids__error_mark_line__legend__circle"
                ].join(" ");
              })
              .text(function (d) {
                return d.text;
              });
          },
          //确定最终的chart options
          updateOption: function (params) {
            // let chartData = ai_ids.setting.getChartDataByKey('error_mark_line')
            console.log("updateOptions!!!!!", params);
            // ie11 兼容
            // const { chartOptions, sourceData, uniqueCode, chartEl } = params;
            const chartOptions = params && params.chartOptions,
              sourceData = params && params.sourceData,
              uniqueCode = params && params.uniqueCode,
              chartEl = params && params.chartEl;
            if (sourceData.title) {
              chartOptions.title = {
                text: sourceData.title,
                left: "left",
                padding: 10,
                textStyle: {
                  color: "#212121",
                  fontWeight: 400,
                  fontSize: 14
                }
              };
            }
            if (sourceData && chartOptions) {
              var series = chartOptions.series;
              if (Array.isArray(series)) {
                chartOptions.series[0].data = sourceData.result;
              }
            }
            if (
              sourceData &&
              sourceData.fmarktype == "bill" &&
              sourceData.fendDate
            ) {
              const fendDate = sourceData.fendDate;
              const fstartDate = sourceData.fstartDate;
              const fdate = sourceData.fdate;
              let startIdx = fdate.indexOf(fstartDate);
              let endIdx = fdate.indexOf(fendDate);
              console.log("startIdx is ", startIdx);
              console.log("endIdx is ", endIdx);

              console.log("chartEl is ", chartEl);
              // chartEl.dispatchAction({
              //   type: 'dataZoom',
              //   startValue: startIdx,
              //   endValue: endIdx,
              // })
              if (startIdx == -1) {
                startIdx = 0;
              }
              if (endIdx == -1) {
                endIdx = fdate.length - 1;
              }
              const dataZoom = chartOptions.dataZoom;
              delete dataZoom[0].start;
              delete dataZoom[0].end;
              dataZoom[0].startValue = startIdx;
              dataZoom[0].endValue = endIdx;
            }

            const typeReg = /([\S]+)_(item|bill)$/gi;
            const res = typeReg.exec(uniqueCode);
            if (res) {
              const pageId = res[1];
              const type = res[2];
              let hideIdStr = "";

              if (type == "item") {
                hideIdStr = "ids_modelanalysic_" + pageId + "_bill"; // `ids_modelanalysic_${pageId}_bill`;  ie11 兼容
              } else {
                hideIdStr = "ids_modelanalysic_" + pageId + "_item"; // `ids_modelanalysic_${pageId}_item`;
              }
              const hideDom = document.querySelector("#" + hideIdStr); // `#${hideIdStr}`
              const showDom = document.querySelector(
                "#ids_modelanalysic_" + uniqueCode // `#ids_modelanalysic_${uniqueCode}`
              );
              if (hideDom) {
                hideDom.style.display = "none";
              }
              if (showDom) {
                showDom.style.display = "block";
              }
            }
            chartOptions.brush = {
              xAxisIndex: 0,
              throttleType: "fixRate",
              throttleDelay: 400,
              removeOnClick: true
            };
            console.log("res is ", res);
          },
          //图形生命周期
          mounted: function (options) {
            console.log("options data chartEl is ", options.pageId);
            // const { uniqueCode, chartEl, sourceData, pageId } = options;
            const uniqueCode = options && options.uniqueCode,
              chartEl = options && options.chartEl,
              pageId = options && options.pageId;
            let isFirstUsage = localStorage.getItem("ai__ids_isFirst");
            console.log("isFirstUsage", isFirstUsage);
            if (isFirstUsage == null || isFirstUsage == true) {
              var content =
                ai_ids["error_mark_line_template"].createFirstUsageBox();
              chartEl._dom.parentNode.appendChild(content);
              localStorage.setItem("ai__ids_isFirst", false);
            } else {
              localStorage.setItem("ai__ids_isFirst", false);
            }
            //单据标注的时候才框选
            if (chartEl && uniqueCode.indexOf("_bill") > -1) {
              // chartEl.dispatchAction({
              //   type: 'takeGlobalCursor',
              //   key: 'brush',
              //   brushOption: {
              //     brushType: 'rect',
              //   },
              //   // dataZoomSelectActive: true, // 允许缩放
              // })
              chartEl.dispatchAction({
                type: "takeGlobalCursor",
                key: "brush",
                brushOption: {
                  brushType: "rect",
                  brushMode: "single"
                }
              });
              chartEl.on("brushEnd", function (params) {
                console.log("brushEnd params is ", params);
                if (params.areas.length > 0) {
                  // const { coordRange } = params.areas[0];
                  const coordRange =
                    params.areas[0] && params.areas[0].coordRange;
                  const data = chartEl.getOption().xAxis[0].data;
                  const startValue = coordRange[0][0];
                  const endValue = coordRange[0][1];
                  const startTime = data[startValue];
                  const endTime = data[endValue];
                  console.log("endTime is ", endTime);
                  console.log("startTime is ", startTime);

                  chartEl.dispatchAction({
                    type: "dataZoom",
                    startValue: startValue,
                    endValue: endValue
                  });
                  chartEl.dispatchAction({
                    type: "brush",
                    areas: []
                  });
                  if (startTime && endTime) {
                    //刷新单据
                    window.IDS_ModelAna_Utils.sendEvent(
                      "refreshBillList",
                      {
                        // fdate,  //接口改版 fdate 弃     用 fstartdate   fenddate 表示起始和结束时间，如果是同一天则相同
                        fstartdate: startTime,
                        fenddate: endTime
                      },
                      pageId
                    );
                  }
                }
                // chartEl.dispatchAction({
                //   type: 'dataZoom',
                //   // 可选，dataZoom 组件的 index，多个 dataZoom 组件时有用，默认为 0
                //   // dataZoomIndex: number,
                //   // 开始位置的百分比，0 - 100
                //   // start: number,
                //   // // 结束位置的百分比，0 - 100
                //   // end: number,
                //   // 开始位置的数值
                //   startValue: 110,
                //   // 结束位置的数值
                //   endValue: 130,
                // })
              });
              // chartEl.on('datazoom', function (params) {
              //   console.log('datazoom is ', params)
              //   const { type, batch } = params
              //   let target = batch && batch[0]
              //   if (
              //     params.hasOwnProperty('startValue') &&
              //     params.hasOwnProperty('endValue')
              //   ) {
              //     const startValue = params.startValue
              //     const endValue = params.endValue
              //     const temp =
              //       ai_ids['error_mark_line_template'].lastDataZoomRange
              //     if (
              //       startValue == temp['startValue'] &&
              //       endValue == temp['endValue']
              //     ) {
              //       return
              //     }
              //     ai_ids['error_mark_line_template'].lastDataZoomRange = {
              //       startValue: params.startValue,
              //       endValue: params.endValue,
              //     }
              //   }

              //   // if (!ai_ids['error_mark_line_template'].isManual) return
              //   if (target && target.hasOwnProperty('animation')) {
              //     // 鼠标滚动
              //     console.log('hei')
              //   } else {
              //     //手动框选 选定了时间要跟其他组件交互

              //     const startValue = target.startValue
              //     const endValue = target.endValue
              //     const startDate = sourceData.fdate[startValue]
              //     const endDate = sourceData.fdate[endValue]
              //     console.log('startDate is ', startDate)
              //     console.log('startDate is ', endDate)
              //     if (!startDate || !endDate) {
              //       console.error('开始时间和结束时间必须存在!')
              //       return
              //     }
              //     console.log('myOption si ', chartEl.getOption())
              //     //刷新单据
              //     window.IDS_ModelAna_Utils.sendEvent(
              //       'refreshBillList',
              //       {
              //         // fdate,  //接口改版 fdate 弃     用 fstartdate   fenddate 表示起始和结束时间，如果是同一天则相同
              //         fstartdate: startDate,
              //         fenddate: endDate,
              //       },
              //       pageId,
              //     )
              //   }
              // })
            }
          }
        }
      }
    ]
  };
})();
