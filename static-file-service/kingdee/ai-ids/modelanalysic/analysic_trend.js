// ie11 兼容性(完成)
window.ai_ids = window.ai_ids || {};
ai_ids["analysic_trend_template"] = (function () {
  return {
    width: 0,
    containerId: "customcontrolapsankey", //苍穹：customcontrolapsankey 本地：ids__modelAna_container
    containerWidth: "",
    svg: null,
    mode: -1, // 浏览模式  -1：全览模式   0：点击第一层的模式（看某个客户或仓库的详情） 1:点击第二层的模式（看某个物料分组的详情）
    containerHAndW: null,
    templateData: [
      {
        chartKey: "analysic_trend",
        viewType: "d3chart",
        chartTitle: {
          text: "",
          bottom: "0",
          left: "40%"
        },
        beforeMount: function (options) {
          console.log("beforeMount!!!", options);
          const prefixCls = "ids_analysic_trend";
          let chartData = options.chartData;
          const uniqueCode = options.uniqueCode;
          const pageId = options.pageId;
          let wrapperID = "";
          if (uniqueCode) {
            wrapperID = "ids_modelanalysic_" + uniqueCode; // `ids_modelanalysic_${uniqueCode}`; ie11
          }
          // chartData=
          // let { ftimeList, title, valueArray } = chartData;  ie11
          let ftimeList = chartData && chartData.ftimeList,
            title = chartData && chartData.title,
            valueArray = chartData && chartData.valueArray;
          const containerId = "lasttrendgraph1";
          if (valueArray.length == 0) {
            const rootContainer = getRootContainerByPageId();
            const svg = rootContainer.select("#" + containerId + " svg"); // `#${containerId} svg` ie11
            if (!svg.empty()) {
              svg.remove();
            }
            ai_ids.svgHelper.clearEmpty(
              rootContainer.select("#" + containerId) // ie11 `#${containerId}`
            );
            ai_ids.svgHelper.renderEmpty(
              rootContainer.select("#" + containerId) // `#${containerId}`
            );
            return;
          } else {
            const rootContainer = getRootContainerByPageId();
            //ai_ids.svgHelper
            ai_ids.svgHelper.clearEmpty(
              rootContainer.select("#" + containerId) // `#${containerId}`
            );
          }

          let BAR_COLOR = ["#40a9ff", "#45dad1", "#73d13d", "#9f69e2"];
          let LINE_COLOR = ["#8F8F8F", "#C8A786", "#40A9FF"];
          let AI_COLOR = ["#F273B5", "#6682F5", "#45DAD1"];
          let barWidth = 20; //柱状的宽度
          let barMargin = 4;
          //ids_modelanalysic_1373857982772703232roota35bbf4d4e0b47b99cd2a4c992822a3c
          let containerRect = document.querySelector("#" + containerId); // ie11 `#${containerId}`
          if (!containerRect) {
            console.error("容器还没加载");
            return;
          }
          //获取
          function getContainerRect() {
            let containerDom = document.querySelector("#" + containerId); // ie11 `#${containerId}`
            let containerRect;
            if (containerDom) {
              containerRect = containerDom.getBoundingClientRect();
            }
            if (containerRect.width == 0) {
              // containerRect = {
              //   width: 1200,
              //   height: 300,
              // }
              containerDom = document.querySelector("#advconap");
              if (containerDom) {
                containerRect = containerDom.getBoundingClientRect();
              }
              if (containerRect.width == 0) {
                containerRect = {
                  width: document.body.clientWidth - 320
                };
              }
            }
            return containerRect;
          }
          //   window.addEventListener('resize', function () {
          //     console.log('resize ', containerRect)
          //     settingOps.width = containerRect.width
          //     render(settingOps)
          //   })
          containerRect = getContainerRect();

          // 对折线超过30的数值进行转换
          function fchange(x, max_value, threshold, y_limit) {
            if (x < 0) {
              console.error("x 必须为非负数!");
              return;
            } else if (threshold > y_limit) {
              console.error("threshold 必须小于y_limit");
              return;
            } else if (x < threshold) {
              return x;
            } else {
              let result =
                threshold +
                (y_limit - threshold) *
                  (Math.log(x - threshold + 1) /
                    Math.log(max_value - threshold + 1));
              return Number(result).toFixed(2);
            }
          }
          let linePair = [];
          let rectH, rectH2, max;
          let barData = []; // 汇总柱状图的数据
          let aiIdx = 0;
          let barIdx = 0;
          let lineIdx = 0;
          let lineSet = [];
          valueArray.forEach(function (arr, idx) {
            // let { type, value, label, algorithmId } = arr;
            // ie11
            const type = arr && arr.type,
              value = arr && arr.value,
              label = arr && arr.label,
              algorithmId = arr && arr.algorithmId;
            if (type == "offsetPercent") {
              let color = AI_COLOR[lineIdx];
              linePair = [];
              //   value = [45, 34, 99, 130, 55, 11, 10, 22, 30, 60]
              // value = [45, 34, 99, null, null, 11, 0.3, 0, null, null]
              //   value = [45, 34, 99, 130, 55, 11, 10, 22, 30, 60]
              max = Math.max.apply(null, value);
              value.forEach(function (val, valIdx) {
                let originVal = val;
                if (val) {
                  val = fchange(val, max, 30, 35);
                }
                linePair.push({
                  label: label,
                  xAxis: ftimeList[valIdx],
                  value: val,
                  originVal: originVal,
                  color: color,
                  shape: "line"
                });
              });
              lineIdx += 1;
              lineSet.push(linePair);
            } else {
              if (algorithmId) {
                //算法
                let color = AI_COLOR[aiIdx];
                arr["color"] = color;
                arr["shape"] = "rect";
                aiIdx += 1;
                barData.push(arr);
                rectH = value;
              } else {
                //非算法，从bar_color 中去颜色
                let color = BAR_COLOR[barIdx];
                arr["color"] = color;
                arr["shape"] = "rect";
                barIdx += 1;
                barData.push(arr);
                rectH2 = value;
              }
            }
          });

          let yMax = Math.max.apply(null, rectH.concat(rectH2));
          const height = 300,
            width = containerRect.width,
            marginLeft = 70,
            marginRight = 40,
            marginBottom = 20,
            marginTop = 50,
            yRightOffset = 40;
          let settingOps = {
            width: containerRect.width
          };
          let chart, lineChart, svg;

          let xScale = d3
            .scaleBand()
            .range([0, width - marginLeft - marginRight])
            .domain(ftimeList);
          const barWidth1 = xScale.bandwidth();
          barWidth = barWidth1 / (2 * (valueArray.length - 1));
          console.log("barWidth1 is ", barWidth1);
          console.log("barWidth is ", barWidth);
          let yLeftScale = d3
            .scaleLinear()
            .range([height - marginTop - marginBottom, 0])
            .domain([0, yMax]);

          let yRightSCale = d3
            .scaleLinear()
            .range([height - marginTop - marginBottom - yRightOffset, 0])
            .domain([0, 30]);

          function clearCanvas() {
            const d = document.getElementById(pageId);
            console.log("d is ", d);
            const wrapper = d3.select(d);
            // const wrapperCls = `[id=${pageId}]`
            const wrapperCls = ".ai_ids__ana_trend_container";
            const tt = wrapper.select(wrapperCls);
            if (!tt.empty()) {
              // console.log('heiosdjfsd')
              tt.remove();
            }
            // const targetNode = d.querySelector(wrapperCls)
            // if (targetNode) {
            //   targetNode.remove()
            // }
            // if (!d.select(wrapperCls).empty()) {
            //   d3.select(wrapperCls).remove()
            // }
          }
          function getRootContainerByPageId() {
            const d = document.getElementById(pageId || "test1");
            console.log("d is ", d);
            const wrapper = d3.select(d);
            return wrapper;
          }
          function initCanvas(settingOps) {
            console.log("initCanvas!!!");
            const width = settingOps.width;
            clearCanvas();
            let rootContainer = getRootContainerByPageId();
            svg = rootContainer
              .select("#" + wrapperID) // '#lasttrendgraph1'
              .style("width", "100%")
              .append("svg")
              .attr("class", "ai_ids__ana_trend_container")
              .attr("width", width)
              .attr("height", height);

            chart = svg
              .append("g")
              .attr(
                "transform",
                "translate(" + marginLeft + "," + marginTop + ")"
              ); // ie11 `translate(${marginLeft},${marginTop})`
          }
          //画左侧的Y轴
          function drawLeftYAxis() {
            yLeftAxis = d3.axisLeft(yLeftScale).ticks(5);

            chart
              .append("g")
              .attr("class", "ai_ids__ana_trend__y-left-axis")
              .attr("transform", "translate(0,0)") // ie11  `translate(${0},${0})`
              .call(yLeftAxis);
            const wrapperCls =
              "#" + wrapperID + " .ai_ids__ana_trend__y-left-axis .tick text"; // ie11 `#${wrapperID} .ai_ids__ana_trend__y-left-axis .tick text`;
            chart
              .selectAll(wrapperCls)
              .style("font-size", "12px")
              .attr("fill", "rgba(0,0,0,.4)");
          }
          //画右侧的Y轴
          function drawRightYAxis() {
            let yRightAxis = d3
              .axisRight(yRightSCale)
              .ticks(6)
              .tickFormat(function (d) {
                d + "%";
              }); // ie11 `${d}%`
            chart
              .append("g")
              .attr("class", "ai_ids__ana_trend__y-right-axis")
              .attr(
                "transform",
                "translate(" +
                  (width - marginLeft - marginRight) +
                  "," +
                  yRightOffset +
                  ")"
              ) // ie11 `translate(${width - marginLeft - marginRight},${yRightOffset})`
              .call(yRightAxis);
            const wrapperCls =
              "#" + wrapperID + " .ai_ids__ana_trend__y-right-axis .tick text"; // ie11 `#${wrapperID} .ai_ids__ana_trend__y-right-axis .tick text`;
            chart
              .selectAll(wrapperCls)
              .style("font-size", "12px")
              .attr("fill", "rgba(0,0,0,.4)");
          }
          // 画X轴
          function drawXAxis() {
            xAxis = d3.axisBottom(xScale).tickSize(0).tickPadding(10);
            chart
              .append("g")
              .attr("class", "ai_ids__ana_trend__x-axis")
              .attr(
                "transform",
                "translate(0" + "," + (height - marginTop - marginBottom) + ")"
              ) // ie11      `translate(${0},${height - marginTop - marginBottom})`
              .call(xAxis);
            const wrapperCls =
              "#" + wrapperID + "  .ai_ids__ana_trend__x-axis .tick text"; // ie11 `#${wrapperID} .ai_ids__ana_trend__x-axis .tick text`;
            d3.selectAll(wrapperCls)
              .attr("fill", function (d, i) {
                let paddingCount = ftimeList.length >= 30 ? 6 : 2;
                if (i % paddingCount == 0) {
                  return "#555";
                } else {
                  return "transparent";
                }
              })
              .style("font-size", "12px");
          }
          //判断线的数据是否没有
          function isLineNull(linePair) {
            return linePair.some(function (item) {
              return item.value;
            });
          }
          function groupLineData(lineSet) {
            let newLineSet = [];
            lineSet.forEach(function (lineArr) {
              let tempArr = [];
              lineArr.forEach(function (item) {
                if (item.value !== null) {
                  tempArr.push(item);
                } else {
                  if (tempArr.length > 0) {
                    newLineSet.push(tempArr);
                  }

                  tempArr = [];
                }
              });
              newLineSet.push(tempArr);
            });

            return newLineSet;
          }

          //画折线
          function drawLine() {
            // const flag = isLineNull(linePair)
            //先筛选出不全为空的一组线段
            let tempLineSet = lineSet.filter(function (lineItem) {
              return isLineNull(lineItem);
            });
            // if (!flag) return
            if (tempLineSet.length == 0) return;
            tempLineSet = groupLineData(tempLineSet);

            if (!lineChart) {
              lineChart = chart
                .append("g")
                .attr("class", "g_line")
                .attr("transform", "translate(0," + yRightOffset + ")"); // ie11 `translate(${0},${yRightOffset})`
            }
            const line = d3
              .line()
              .x(function (d) {
                return xScale(d.xAxis);
              })
              .y(function (d) {
                return yRightSCale(d.value);
              });
            //   .curve(d3.curveCardinal)

            lineChart
              .selectAll()
              .data(tempLineSet)
              .enter()
              .append("path")
              .attr("class", function (d, i) {
                return "path_" + i; // `path_${i}`;
              })
              .attr("d", function (d) {
                return line(d);
              })
              .attr("stroke", function (d, i) {
                return d && d[0] && d[0].color;
              })
              .attr("fill", "none")
              .attr("stroke-width", 2)
              .attr(
                "transform",
                "translate(" + (xScale.bandwidth() / 2 + 2) + ",0)"
              ); //  `translate(${xScale.bandwidth() / 2 + 2},0)`
          }
          function drawCircle() {
            // const flag = isLineNull(linePair)
            // if (!flag) return
            //先筛选出不全为空的一组线段
            let tempLineSet = lineSet.filter(function (lineItem) {
              return isLineNull(lineItem);
            });
            // if (!flag) return
            if (tempLineSet.length == 0) return;
            lineChart
              .selectAll()
              .data(tempLineSet)
              .enter()
              .append("g")
              .attr("class", function (d, i) {
                return "circleG_" + i;
              })

              .selectAll()
              .data(function (d) {
                return d;
              })
              .enter()
              .append("circle")
              .attr("class", function (d, i) {
                return "circle_" + i;
              })
              .attr("cx", function (d) {
                return xScale(d.xAxis);
              })
              .attr("cy", function (d) {
                return yRightSCale(d.value);
              })
              .attr("r", function (d, i) {
                if (d.value === null) return 0;
                return 3;
              })
              .attr("fill", function (d, i) {
                return d.color;
              })
              .attr("stroke-width", 1)
              .attr(
                "transform",
                "translate(" + (xScale.bandwidth() / 2 + 2) + ",0)"
              ); // `translate(${xScale.bandwidth() / 2 + 2},0)`
          }
          function drawLegendRect(color, i, textStr) {
            let x = (width - marginLeft - marginRight) / 2 - 120 + i * 100;
            svg
              .append("rect")
              .attr("x", x)
              .attr("width", 15)
              .attr("height", 15)
              .attr("rx", 2)
              .attr("fill", color);

            svg
              .append("text")
              .attr("x", x + 20)
              .attr("y", 12)
              .text(textStr)
              .attr("transform", "translate(0,1)");
          }
          function drawLegandLine(color, i, textStr) {
            let x = (width - marginLeft - marginRight) / 2 - 120 + i * 100;

            svg
              .append("circle")
              .attr("cx", x)
              .attr("cy", 10)
              .attr("r", 3)
              .attr("fill", color);
            svg
              .append("line")
              .attr("x1", x)
              .attr("y1", 10)
              .attr("x2", x + 14)
              .attr("y2", 10)
              .attr("fill", color)
              .attr("stroke", color)
              .attr("stroke-width", 6);
            svg
              .append("circle")
              .attr("cx", x + 14)
              .attr("cy", 10)
              .attr("r", 3)
              .attr("fill", color);
            svg
              .append("text")
              .attr("x", x + 30)
              .attr("y", 12)
              .text(textStr)
              .attr("transform", "translate(0,1)");
          }
          //画图例
          function drawLegend() {
            console.log("barData is ", barData);
            // ie11 兼容性
            let legendData = [];
            barData &&
              barData.forEach(function (barItem) {
                legendData.push(barItem);
              });
            legendData.push({
              shape: "line",
              label: "绝对百分比误差(%)",
              color: linePair[0].color
            });
            // const legendData = [
            //   ...barData,
            //   {
            //     shape: "line",
            //     label: "绝对百分比误差(%)",
            //     color: linePair[0].color
            //   }
            // ];
            legendData.forEach(function (legandItem, idx) {
              // const { shape, color, label } = legandItem;
              // ie11
              const shape = legandItem && legandItem.shape,
                color = legandItem && legandItem.color,
                label = legandItem && legandItem.label;
              if (shape == "rect") {
                drawLegendRect(color, idx, label);
              } else if (shape == "line") {
                drawLegandLine(color, idx, label);
              }
            });
          }

          //画线
          function drawRedLine() {
            const wrapperCls =
              "#" + wrapperID + " .ai_ids__ana_trend__y-right-axis .tick"; // `#${wrapperID} .ai_ids__ana_trend__y-right-axis .tick`;
            chart
              .selectAll(wrapperCls)
              .append("line")
              .attr("x1", 0)
              .attr("y1", 0)
              .attr("x2", -(width - marginLeft - marginRight))
              .attr("y2", 0)
              .attr("stroke", "#d9d9d9")
              .attr("stroke-dasharray", "2,2")
              .attr("transform", "translate(0,0)"); // `translate(0,${0})`
            // chart
            //   .selectAll()
            //   .data([1])
            //   .enter()
            //   .append('line')
            //   .attr('x1', 0)
            //   .attr('y1', 0)
            //   .attr('x2', width - marginLeft - marginRight)
            //   .attr('y2', 0)
            //   .attr('stroke', 'red')
            //   .attr('stroke-dasharray', '2,2')
            //   .attr('transform', `translate(0,${yRightOffset})`)
          }

          //画辅助线
          function drawAssitLine() {
            chart
              .selectAll()
              .data([1])
              .enter()
              .append("line")
              .attr("x1", 0)
              .attr("y1", 0)
              .attr("x2", width - marginLeft - marginRight)
              .attr("y2", 0)
              .attr("stroke", "#d9d9d9")
              .attr("stroke-dasharray", "2,2")
              .attr("transform", "translate(0,0)"); // "translate(0,0)"
          }
          let maskRect = null;
          // 柱状图
          function drawSingleRect(idx, rectData, color) {
            const wrapperCls =
              "#" + wrapperID + " .ai_ids__ana_trend__x-axis .tick"; // ie11 `#${wrapperID} .ai_ids__ana_trend__x-axis .tick`;
            d3.selectAll(wrapperCls)
              .append("rect")
              .attr("class", "rect")
              // .attr(
              //   'transform',
              //   function(){
              //     return
              //   }
              //   `translate(${(idx - 1) * barWidth + 4 * idx},0)`,
              // )
              .attr("x", function () {
                let mid = Math.floor(barData.length / 2); // 中位数
                let odd = barData.length % 2 == 0; // 判读奇数还是偶数
                let x = 0;
                if (odd) {
                  // 如果是偶数
                  x =
                    (idx - mid) * barWidth +
                    (idx - mid + 1) * barMargin +
                    (idx < mid ? -1 : 1) * (barMargin / 2);
                  // 如果是奇数
                }
                return x;
              })
              .attr("value", function (d, i) {
                return rectData[i];
              })
              .attr("width", barWidth)
              .attr("y", function (d, i) {
                let val = rectData[i];
                if (!val) return 0;
                return -(height - marginTop - marginBottom - yLeftScale(val));
              })
              .attr("height", function (d, i) {
                let val = rectData[i];
                if (!val) return 0;
                return height - marginTop - marginBottom - yLeftScale(val);
              })
              .attr("fill", color);
          }
          function drawRects() {
            barData.forEach(function (barItem, idx) {
              drawSingleRect(idx, barItem.value, barItem.color);
            });
          }
          let mouseEnterId = -1;
          function addEvent(uniqueCode, pageId) {
            const wrapperCls =
              "#" + wrapperID + " .ai_ids__ana_trend__x-axis .tick"; // `#${wrapperID} .ai_ids__ana_trend__x-axis .tick`;
            console.log(
              "uniquCode is " + uniqueCode + " and PageId is ",
              pageId
            );
            d3.selectAll(wrapperCls)
              .on("mouseenter", function (d) {
                // const target = d.target
                // const target = d3.select(this)

                // const textDom = target.querySelector('text')
                // const timeStr = textDom.textContent
                console.log("uniqueCode is ", uniqueCode);

                const timeStr = d;
                const idx = (mouseEnterId = ftimeList.indexOf(timeStr));

                const clientX = event.clientX;
                const maskRectWidth =
                  barWidth * valueArray.length +
                  barMargin * (valueArray.length - 1);
                d3.select(this)
                  .append("rect")
                  .attr("class", "ai_ids__mask")
                  .style("cursor", "pointer")

                  .attr("x", 0)
                  .attr("y", 0)
                  .attr("width", maskRectWidth) // 60
                  .attr("height", height - marginTop - marginBottom)
                  .attr("fill", "rgba(0,0,0,.08)")
                  .attr(
                    "transform",
                    "translate(" +
                      -maskRectWidth / 2 +
                      "," +
                      -(height - marginTop - marginBottom) +
                      ")" // ie11 `translate(${-maskRectWidth / 2},${-(height -marginTop -marginBottom)})`
                  );
                //

                //折线上的圆点要放大
                const circleDom = d3.select(".circle_" + mouseEnterId); // ie11 `.circle_${mouseEnterId}`
                if (!circleDom.empty() && circleDom.attr("r") != 0) {
                  circleDom.attr("r", 5);
                }
                const time = ftimeList[idx];
                let showArr = [
                  {
                    key: "",
                    value: time
                  }
                ];
                createTooltipContent(idx, showArr);
                tipContainer.html(showArr);
                // createTooltip(idx)
              })
              .on("mousemove", function (params) {
                // createTooltip(mouseEnterId)

                const event = d3.event;
                const pageX = event.pageX;
                const pageY = event.pageY;
                let offsetX = pageX + 30;
                if (mouseEnterId > ftimeList.length - 3) {
                  offsetX -= 260;
                }
                tipContainer.tipContainer
                  .style("left", offsetX + "px") // ie11 `${offsetX}px`
                  .style("top", pageY + "px") //ie11 `${pageY}px`
                  .style("opacity", 1);
              })
              .on("mouseleave", function () {
                d3.select(this).select(".ai_ids__mask").remove();
                //折线上的圆点要放大
                const circleDom = d3.select(".circle_" + mouseEnterId); // ie11 `.circle_${mouseEnterId}`
                if (!circleDom.empty() && circleDom.attr("r") == 5) {
                  circleDom.attr("r", 3);
                }
                tipContainer.tipContainer.style("opacity", 0);
                mouseEnterId = -1;
              })
              .on("click", function (d) {
                console.log("d3event ", d3.event);
                const event = d3.event;
                // const target = d3.event.target
                // getPageId(target)
                const model = getPageId();
                // getFilterQueryData(d3.node(event.target))
                // console.log('model is ', model)
                console.log(
                  "click uniqueCode is " +
                    uniqueCode +
                    " and pageId is " +
                    pageId
                );
                let filterQuery = "";
                let fpretimetype = "";
                if (uniqueCode) {
                  const data = ai_ids.setting.getChartDataByKey(uniqueCode);
                  console.log("click data is ", data);
                  filterQuery = data.filterQuery;
                  fpretimetype = data.fpretimetype;
                  // filterQuery.fdimvaluesList[1].values = ['1758878256737647616']
                }
                window.IDS_ModelAna_Utils.sendEvent(
                  "barClick",
                  {
                    // fdate,  //接口改版 fdate 弃     用 fstartdate   fenddate 表示起始和结束时间，如果是同一天则相同
                    fdate: d,
                    filterQuery: filterQuery,
                    fpretimetype: fpretimetype
                  },
                  model
                );
              });
          }
          function getPageId() {
            const id = "lasttrendgraph1";
            const target = document.querySelector("#" + id); // ie11 `#${id}`
            const pageId = target && target.getAttribute("data-page-id");
            if (pageId) {
              let pre_pageId = pageId.split("_lasttrendgraph1")[0];
              console.log("pre_pageId is ", pre_pageId);
              return pre_pageId;
              // return ai_ids['setting'].getModel(pre_pageId)
            }
          }
          function getFilterQueryData(node) {
            const id = node.getAttribute("id");
            while (id.indexOf("ids_modelanalysic_") > -1) {
              node = node.parentNode;
            }
          }
          function drawMaxText() {
            if (!max || max <= 30) {
              //|| max <= 30
              max = 100;
            }
            chart
              .append("text")
              .attr("x", width - marginLeft - marginRight)
              .attr("y", 5)
              .style("font-size", "12px")
              .text(max + "%") // ie11  `${max}%`
              .attr("fill", "rgba(0,0,0,.4)");
          }

          const tipContainer = ai_ids.svgHelper.createTip(d3.select("body"), {
            attrs: {
              className: prefixCls + "_tip_wrapper" // ie11 `${prefixCls}_tip_wrapper`
            }
          });

          function createTooltipContent(idx, valArr) {
            // const valArr = []
            barData.forEach(function (item) {
              // const { value, label } = item;
              const value = item && item.value,
                label = item && item.label;
              let val = value[idx];
              valArr.push({
                key: label,
                value: formatNum(String(val))
              });
            });
            lineSet.forEach(function (item) {
              if (!item[idx]) return;
              // const { value, label, originVal } = item[idx];
              const label = item[idx] && item[idx].label,
                originVal = item[idx] && item[idx].originVal;
              const transformValue = formatNum(String(originVal));
              valArr.push({
                key: label,
                value:
                  transformValue == "-" ? transformValue : transformValue + "%" //`${transformValue}%`
              });
            });
          }
          //格式化数值，如果没有，返回'-'
          function formatNum(num) {
            if (!num || num == "null") return "-";
            const numReg = /(?=(\B)(\d{3})+$)/g;
            num = num.replace(numReg, ",");
            return num;
          }
          function drawText(textStr) {
            svg.append("text").text(textStr);
          }
          function removeTooltip() {
            const tooltipDom = document.querySelector(
              ".ai_ids__ana_trend__tooltip"
            );

            tooltipDom.remove();
            // document.getElementById('.ai_ids__container').removeChild(tooltipDom)
            tooltip = null;
          }
          function drawTitle() {
            svg
              .append("text")
              .attr("x", 0)
              .attr("y", 14)
              .style("font-size", "14px")
              .style("font-weight", "bold")
              .text(title);
          }
          //画辅助文本
          function drawAssitText(textStr, pos) {
            svg
              .append("text")
              .attr("x", pos.x)
              .attr("y", pos.y)
              .text(textStr)
              .attr("fill", "#555");
          }

          //渲染
          function render(settingOps) {
            initCanvas(settingOps);

            drawLeftYAxis();
            drawRightYAxis();

            drawTitle();

            drawXAxis();
            drawRedLine();
            drawAssitLine();
            drawMaxText();

            drawRects();

            drawLine();
            drawCircle();
            addEvent(uniqueCode, pageId);
            drawLegend();
            drawAssitText("数量", {
              x: marginLeft,
              y: 40
            });
            drawAssitText("绝对百分比误差", {
              x: width - marginLeft - marginRight,
              y: 40
            });
          }
          try {
            render(settingOps);
          } catch (ex) {
            console.error("analysic_trend ex is ", ex);
          }
        },
        mounted: function () {}
      }
    ]
  };
})();
