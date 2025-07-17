// ie11 兼容性(完成)
window.ai_ids = window.ai_ids || {};
ai_ids["ids_sku_pie_template"] = (function () {
  return {
    width: 0,
    containerId: "customcontrolapsankey", //苍穹：customcontrolapsankey 本地：ids__modelAna_container
    containerWidth: "",
    svg: null,
    mode: -1, // 浏览模式  -1：全览模式   0：点击第一层的模式（看某个客户或仓库的详情） 1:点击第二层的模式（看某个物料分组的详情）

    containerHAndW: null,
    templateData: [
      {
        chartKey: "ids_sku_pie",
        viewType: "d3chart",
        chartTitle: {
          text: "",
          bottom: "0",
          left: "40%"
        },
        beforeMount: function (options) {
          let chartData = options.chartData;
          if (chartData && chartData.hasOwnProperty("fdata")) {
            chartData = chartData.fdata;
          }
          const uniqueCode = options.uniqueCode;
          console.log("ids_sku_pie beforeMount options is ", options);
          const prefixCls = "ids_sku_pie";
          const RADIUS = 100;
          const colorArr = ["#40A9FF", "#45DAD1", "#73D13D", "#9f69d2"];
          const containerId = "ids_modelanalysic_" + uniqueCode; //   `ids_modelanalysic_${uniqueCode}`;
          const res = {
            data: {
              fdata: [
                {
                  id: "high", //价格分类标识
                  name: "高价位", //价格分类名称
                  fqty: 100, //SKU数量
                  fqtypercent: 33.33 //SKU占比
                },
                {
                  id: "middle",
                  name: "主价位",
                  fqty: 50,
                  fqtypercent: 33.33
                },
                {
                  id: "low",
                  name: "低价位",
                  fqty: 100,
                  fqtypercent: 33.34
                },
                {
                  id: "test",
                  name: "低价位test",
                  fqty: 30,
                  fqtypercent: 33.34
                }
              ],
              className: "洗发水" //末级分类名称
            },
            eventName: "createNewData",
            containerId: "ai_ids_ns_price_sku_ana", //自定义控件标识
            pageId: "cbebd6eb169f42b0a2d0c2007b54a763",
            timestamp: 1680862395087
          };
          const pieData = chartData; //res.data.fdata

          //清除/渲染  空提示
          if (!chartData || chartData.length == 0) {
            ai_ids.svgHelper.renderEmpty(
              d3.select("#" + containerId) //兼容性 `#${containerId}`
            );
            return;
          } else {
            ai_ids.svgHelper.clearEmpty(d3.select("#" + containerId)); // `#${containerId}`
          }
          const svg = ai_ids.svgHelper.createSvg(containerId, {
            //'ai_ids_ns_price_sku_ana'
            attrs: {
              width: 800,
              height: 500,
              class: prefixCls + "__svg" //`${prefixCls}__svg`
            }
          });
          const containerRect = ai_ids.svgHelper.getContainerRect(
            "#" + containerId
            // `#${containerId}`
          );
          function clearContainer() {
            const container = svg.select("." + prefixCls + "__container"); // ie11 `.${prefixCls}__container`
            if (!container.empty()) {
              container.remove();
            }
          }
          const legendContainer = d3
            .select("#" + containerId + " ." + prefixCls + "__svg") // `#${containerId} .${prefixCls}__svg`
            .append("g")
            .attr("class", prefixCls + "_legend"); // `${prefixCls}_legend`
          function createContainer() {
            return svg
              .append("g")
              .attr("class", prefixCls + "__container") // ie11 `${prefixCls}__container`
              .attr(
                "transform",
                "translate(" +
                  containerRect.width / 2 +
                  "," +
                  containerRect.height / 2 +
                  ")"
              ); // `translate(${containerRect.width / 2},${containerRect.height / 2})`
          }
          function render() {
            clearContainer();
            const container = createContainer();

            let pieRes = null;
            const arc = d3
              .arc()
              .innerRadius(60)
              .outerRadius(RADIUS)
              .padAngle(Math.PI * 0.005)
              .startAngle(function (d) {
                return d.startAngle;
              })
              .endAngle(function (d) {
                return d.endAngle;
              });

            const pieGenerator = d3.pie().value(function (d) {
              return d.fqty;
            });
            pieRes = pieGenerator(pieData);
            // d3.select(`.${prefixCls}_svg`)
            //   .
            const arcs = container
              .selectAll("g.arc")
              .data(pieData)
              .enter()
              .append("g")
              .attr("class", "arc");

            arcs
              .append("path")
              .attr("d", function (d, i) {
                const data = pieRes.filter(function (item) {
                  return item.data.id == d.id;
                })[0];
                // if(i==pieRes.length - 1){
                drawText(data, colorArr[i]);
                // }

                return arc(data);
              })
              .attr("fill", function (d, idx) {
                const target = pieData.filter(function (item) {
                  return item.id == d.id;
                })[0];
                // return target.color
                return colorArr[idx];
              });
            let total = d3.sum(pieData, function (item) {
              return item.value;
            });

            function getAngle(val) {
              const res = (val / 160) * Math.PI * 2;

              return res;
            }
            /**
             *  画数据明细
             */

            function drawText(arcItem, color) {
              const centerPoint = arc.centroid(arcItem);

              // const {
              //   startAngle,
              //   endAngle,
              //   data: { name, fqty, fqtypercent }
              // } = arcItem;
              const temp_data = arcItem && arcItem.data;
              const name = temp_data && temp_data.name,
                fqty = temp_data && temp_data.fqty,
                fqtypercent = temp_data && temp_data.fqtypercent;
              // getAngle(value)
              // const midAngle=(endAngle-startAngle) / 2 + startAngle;
              // console.log('midAngle is ',midAngle)

              // let midPointX,midPointY,startPointX,startPointY,endPointX,endPointY;
              // startPointX=Math.sin(midAngle + Math.PI * 0.005 / 180) * RADIUS;
              // startPointY=Math.cos(midAngle) * RADIUS;
              // midPointX=Math.sin(midAngle) * (RADIUS + 20);
              // midPointY=Math.cos(midAngle) * (RADIUS + 20)
              // console.log('startPointX is '+startPointX+" and y is "+startPointY)
              let centerX = centerPoint[0],
                centerY = centerPoint[1];
              container
                .append("line")
                .attr("x1", centerX * 1.1)
                .attr("y1", centerY * 1.1)
                .attr("x2", centerX * 1.4)
                .attr("y2", centerY * 1.4)
                .attr("stroke", color);

              container
                .append("text")
                .attr("fill", "#666")
                .attr(
                  "transform",
                  "translate(" + centerX * 1.6 + "," + centerY * 1.6 + ")"
                ) //`translate(${centerX * 1.6},${centerY * 1.6})`
                .text(null)
                .append("tspan")
                .attr("x", function () {
                  if (centerX < 0) {
                    return -60;
                  }
                })
                .text(name)
                .append("tspan")
                .attr("y", 20)
                .attr("x", function () {
                  if (centerX < 0) {
                    return -60;
                  } else {
                    return -15;
                  }
                })
                .text(function () {
                  return fqtypercent + "%，" + fqty; // `${fqtypercent}%，${fqty}`;
                });
              // container
              //     .append('line')
              //     .attr('x0',startPointX)
              //     .attr('y0',startPointY)
              //     .attr('x1',midPointX)
              //     .attr('y1',midPointY)
              //     .attr('stroke','gray')
            }
            renderLegends(legendContainer, pieData);
          }
          let circle_start_x = containerRect.width * 0.6, // 240
            circle_start_y = 30;
          function renderLegends(container, pieData) {
            console.log("renderLegend pieData is ", pieData);
            pieData.forEach(function (pie, i) {
              console.log("i is ", i);
              let color = colorArr[i];
              let legendName = pie.name + " (" + pie.fpricerange + ")"; // `${pie.name}（${pie.fpricerange}）`;
              renderSingleLeg(container, legendName, color);
              circle_start_y += 20;
              // circle_start_x = 120,
            });
          }

          function renderSingleLeg(container, pieName, pieColor) {
            ai_ids.svgHelper.drawCircle(container, {
              attrs: {
                fill: pieColor,
                r: 4,
                cx: circle_start_x,
                cy: circle_start_y
              }
            });
            container
              .append("text")
              .text(pieName)
              .attr("x", circle_start_x + 10)
              .attr("y", circle_start_y + 4)
              .attr("fill", "#666")
              .style("font-weight", 400)
              .style("font-family", "PingFangSC-Regular");
          }

          render();
        },

        mounted: function () {}
      }
    ]
  };
})();
