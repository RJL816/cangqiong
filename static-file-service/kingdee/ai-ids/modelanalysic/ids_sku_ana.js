// ie11兼容性（完成）
window.ai_ids = window.ai_ids || {};
ai_ids["ids_sku_ana_template"] = (function () {
  return {
    width: 0,
    containerId: "customcontrolapsankey", //苍穹：customcontrolapsankey 本地：ids__modelAna_container
    containerWidth: "",
    svg: null,
    mode: -1, // 浏览模式  -1：全览模式   0：点击第一层的模式（看某个客户或仓库的详情） 1:点击第二层的模式（看某个物料分组的详情）

    containerHAndW: null,
    templateData: [
      {
        chartKey: "ids_sku_ana",
        viewType: "d3chart",
        chartTitle: {
          text: "",
          bottom: "0",
          left: "40%"
        },
        beforeMount: function (options) {
          let chartData = options.chartData;
          let currentid = -1;
          if (chartData && chartData.hasOwnProperty("fdata")) {
            currentid = chartData.currentid;
            chartData = chartData.fdata;
          }
          const uniqueCode = options.uniqueCode;
          const containerId = "ids_modelanalysic_" + uniqueCode; //`ids_modelanalysic_${uniqueCode}`;
          console.log("ids_sku_ana beforeMount data is ", chartData);
          const resData = {
            data: {
              fdata: [
                {
                  id: "物料编码001", //物料编码
                  name: "物料名称1", //物料名称
                  famount: 10000, //销售金额
                  fqtypercent: 33.33 //销售金额占比
                },
                {
                  id: "物料编码002",
                  name: "物料名称2",
                  fqtypercent: 33.33,
                  famount: 10000
                },
                {
                  id: "物料编码015",
                  name: "物料名称15",
                  fqtypercent: 33.33,
                  famount: 10000
                }
              ],
              className: "洗发水" //末级分类名称
            },
            eventName: "createNewData",
            containerId: "ai_ids_ns_mats_sales_ana", //自定义控件标识
            pageId: "cbebd6eb169f42b0a2d0c2007b54a763"
          };

          // const tempData = resData.data.fdata
          let tempData = chartData;

          tempData = tempData.sort(function (a, b) {
            return b.famount - a.famount;
          });
          //清除/渲染  空提示
          if (!tempData || tempData.length == 0) {
            ai_ids.svgHelper.renderEmpty(d3.select("#" + containerId)); // ie11 `#${containerId}`
            return;
          } else {
            ai_ids.svgHelper.clearEmpty(d3.select("#" + containerId));
          }
          const fxArr = tempData.map(function (item) {
            return item.name + item.id;
          }); // modify 2023/8/4 用id做唯一键  (item) => `${item.name}${item.id}`
          const fyLeftArr = tempData.map(function (item) {
            return item.famount / 1000;
          });
          // const stackGren=d3.stack()
          //             .keys(['fqtypercent','famount'])
          //             .order(d3.stackOrderNone)
          //             .offset(d3.stackOffsetNone);
          // const stack=stackGren(tempData)
          let fqtypercent_sum = 0;
          tempData.forEach(function (item) {
            // const { famountpercent } = item;
            const famountpercent = item && item.famountpercent;
            item.fqtypercentSum = famountpercent + fqtypercent_sum;
            fqtypercent_sum += famountpercent;
          });
          const prefixCls = "ids_sku_ana";
          let width = 1200,
            height = 500,
            margin = 60;
          function renderSvg() {
            const svg = ai_ids.svgHelper.createSvg(containerId, {
              attrs: {
                width: width,
                height: height,
                class: prefixCls + "_svg" //`${prefixCls}_svg`
              }
            });
            const containerRect = ai_ids.svgHelper.getContainerRect(
              "#" + containerId
              //`#${containerId}`
            );
            if (containerRect) {
              width = containerRect.width * 0.98;
              height = containerRect.height * 0.98;
            }
            let containerClsName = prefixCls + "__container"; //`${prefixCls}__container`;
            //先清除外层容器
            ai_ids.svgHelper.clearContainer(svg, containerClsName);
            const container = ai_ids.svgHelper.createContainer(svg, {
              className: containerClsName,
              transform: ["translate", margin, margin]
            });

            const xScale = ai_ids.svgHelper.createScale({
              scaleType: "band",
              domain: fxArr,
              range: [0, width - margin * 2]
            });
            const yScale = ai_ids.svgHelper.createScale({
              scaleType: "linear",
              domain: [0, d3.max(fyLeftArr)],
              range: [height - margin * 2, 0]
            });
            const yRightScale = ai_ids.svgHelper.createScale({
              scaleType: "linear",
              domain: [0, 100],
              range: [height - margin * 2, 0]
            });

            // const eachBandWith = xScale(fxArr[1]) - xScale(fxArr[0])
            const eachBandWith = xScale.bandwidth();
            console.log("eachBandWidth is ", eachBandWith);

            const barWidth = Math.floor(eachBandWith / 4);
            const markRectWidth = Math.floor(eachBandWith / 2);
            //rect mask
            const maskRect = ai_ids.svgHelper.drawRect(container, {
              attrs: {
                x: -100,
                y: 0,
                width: markRectWidth,
                height: height - margin * 2,
                fill: "rgba(0,0,0,.1)",
                opacity: 0
              }
            });
            // 创建Y轴
            ai_ids.svgHelper.createAxis(container, yScale, {
              axisType: "left",
              wrapperClsName: prefixCls + "__y_axis", //`${prefixCls}__y_axis`,
              cAttrs: {
                transform: ["translate", 0, 0]
              },
              tickOptions: {
                ticks: 5,
                tickPadding: 10,
                tickSize: 0
              },
              //轴的样式
              pathAttrs: {
                show: false
              },
              labelAttrs: {
                label: "销售金额(千元)",
                x: 45
              }
            });
            ai_ids.svgHelper.createAxis(container, yRightScale, {
              axisType: "right",
              wrapperClsName: prefixCls + "__y_right_axis", //`${prefixCls}__y_right_axis`,
              cAttrs: {
                transform: ["translate", width - margin * 2, 0]
              },
              tickOptions: {
                ticks: 5,
                tickPadding: 10,
                tickSize: 0
              },
              pathAttrs: {
                show: false
              },
              labelAttrs: {
                label: "累计占比(%)",
                x: -40
              }
            });
            //#E5E5E5
            //y轴得样式
            // d3.select(`.${prefixCls}__y_axis path`).attr('stroke', '#E5E5E5')
            // d3.selectAll(`.${prefixCls}__y_axis .tick text`).attr(
            //   'fill',
            //   '#999',
            // )

            // d3.select(`.${prefixCls}__y_right_axis path`).attr(
            //   'stroke',
            //   '#E5E5E5',
            // )

            // d3.selectAll(`.${prefixCls}__y_right_axis .tick text`).attr(
            //   'fill',
            //   '#999',
            // )
            // ie11 `.${prefixCls}__y_axis .tick`
            d3.selectAll("." + prefixCls + "__y_axis .tick").each(function (d) {
              ai_ids.svgHelper.renderLine(d3.select(this), {
                attrs: {
                  x1: 0,
                  y1: 0,
                  x2: width - margin * 2,
                  y2: 0,
                  stroke: "#d9d9d9",
                  "stroke-dasharray": "2 2"
                }
              });
            });
            //创建X轴
            ai_ids.svgHelper.createAxis(container, xScale, {
              axisType: "bottom",
              wrapperClsName: prefixCls + "__x_axis", // `${prefixCls}__x_axis`,
              cAttrs: {
                transform: ["translate", 0, height - margin * 2]
              },
              tickOptions: {
                tickSize: 0,
                tickPadding: 10
              },
              textAttrs: {
                fill: "#555",
                splitVisNum: 3 //
              }
            });

            // svg
            //   .append('text')
            //   .text('千元')
            //   .attr('x', 10)
            //   .attr('y', margin - 10)
            //   .attr('fill', '#999')
            // svg
            //   .append('text')
            //   .text('%')
            //   .attr('x', width - margin)
            //   .attr('y', margin - 10)
            //   .attr('fill', '#999')

            // d3.selectAll(`.${prefixCls}__x_axis .tick text`)
            //   .attr('fill', '#555')
            //   .text(function (d) {
            //     if (d.length > 7) {
            //       return d.substring(0, 7) + '...'
            //     } else {
            //       return d
            //     }
            //   })
            // d3.selectAll(`.${prefixCls}__x_axis .tick text`)
            //   .filter(function (d, i) {
            //     return i % 3 != 0
            //   })
            //   .attr('opacity', 0)

            //去除X轴得文本
            // d3.selectAll(`.${prefixCls}__x_axis .tick text`)
            //     .attr('opacity',0)
            // d3.select(`.${prefixCls}__x_axis path`).attr('stroke', '#E5E5E5')

            const tipContainer = ai_ids.svgHelper.createTip(d3.select("body"), {
              attrs: {
                className: prefixCls + "_tip_wrapper" // `${prefixCls}_tip_wrapper`
              }
            });

            //画柱子
            const xTicks = container.selectAll(
              "." + prefixCls + "__x_axis .tick"
            ); // ie11 `.${prefixCls}__x_axis .tick`
            xTicks
              .append("rect")
              .attr("class", prefixCls + "__rect") // `${prefixCls}__rect` ie11
              .attr("x", -barWidth / 2)
              .attr("y", function (d, i) {
                let val = fyLeftArr[i];
                // return yScale(val)
                return -(yScale(0) - yScale(val));
              })
              .attr("width", barWidth)
              .attr("height", function (d, i) {
                let val = fyLeftArr[i];

                let result = yScale(0) - yScale(val);

                return result;
              })
              .attr("fill", function (d) {
                const target = tempData.filter(
                  function (item) {
                    return item.name + item.id == d;
                  } // ie11  => `${item.name}${item.id}` == d
                )[0]; // modify 2023/8/4
                if (currentid == target.id) {
                  return "#ffa500";
                }
                return "#40A9FF";
              }) //currentid
              .attr("cursor", "pointer")
              .on("mouseenter", function (d) {
                // const tempData = resData.data.fdata
                const targetData = tempData.filter(
                  function (item) {
                    return item.name + item.id == d;
                  } //ie11 => `${item.name}${item.id}` == d
                )[0]; // modify 2023/8/4

                let curNode = d3.select(this).node();
                while (
                  curNode &&
                  curNode != "g" &&
                  curNode.getAttribute("class") != "tick"
                ) {
                  curNode = curNode.parentNode;
                }

                const transformAttr = curNode.getAttribute("transform");
                let transformVal =
                  ai_ids.svgHelper.getTranslateVal(transformAttr);

                const xVal = xScale(d);
                const yVal = yRightScale(targetData.fqtypercentSum);
                //show circle
                maskCircle
                  .attr("cx", xVal)
                  .attr("cy", yVal)
                  .attr("transform", "translate(" + selfBandWidth + ",0)") // `translate(${selfBandWidth},0)`
                  .transition()
                  .duration(100)
                  .attr("opacity", 1);

                maskRect
                  .attr("x", transformVal - markRectWidth / 2)
                  .transition()
                  .duration(200)
                  .attr("opacity", 1);
                // const event = d3.event
                // let pageX = event.pageX
                // let pageY = event.pageY
                // const pos = svgHelper.getToolTipPos({
                //   pageX,
                //   pageY,
                //   tipCls: 'ids_sku_ana_tip_wrapper',
                //   barWidth,
                // })
                // if (pos) {
                //   pageX = pos.left
                //   //   pageY = pos.top
                // }
                //折线 圆圈点显示
                tipContainer.html(
                  [
                    {
                      key: "商品名称",
                      value: targetData.name
                    },
                    {
                      key: "销售金额(千元)",
                      value: (targetData.famount / 1000).toFixed(2)
                    },
                    {
                      key: "累计占比",
                      value: Number(targetData.fqtypercentSum).toFixed(2) + "%" //`${Number(targetData.fqtypercentSum).toFixed(2)}%`
                    }
                  ]
                  //   {
                  //     pageX,
                  //     pageY,
                  //   },
                );
              })
              .on("mousemove", function (d) {
                const event = d3.event;
                let pageX = event.pageX;
                let pageY = event.pageY;
                const pos = ai_ids.svgHelper.getToolTipPos({
                  pageX: pageX,
                  pageY: pageY,
                  tipCls: "ids_sku_ana_tip_wrapper",
                  barWidth: barWidth
                });
                if (pos) {
                  pageX = pos.left;
                  pageY = pos.PageTop;
                }
                let tempPageX = Number(pageX) + 30;
                tipContainer.tipContainer
                  .style("left", tempPageX + "px") // ie11  `${pageX + 30}px`
                  .style("top", pageY + "px") // ie11 `${pageY}px`
                  .style("opacity", 1)
                  .style("display", "block");
              })
              .on("mouseleave", function () {
                maskRect.transition().duration(200).attr("opacity", 0);

                maskCircle.transition().duration(200).attr("opacity", 0);

                tipContainer.tipContainer.style("display", "none");
              });

            //画折线

            const lineGen = d3
              .line()
              .x(function (d) {
                const res = xScale(d.name + d.id); // qiuhaoxin modify 2023/8/4   `${d.name}${d.id}` ie11
                return res;
              })
              .y(function (d, i) {
                return yRightScale(d.fqtypercentSum);
              });

            let dTransform = d3
              .select(".ids_sku_ana__x_axis .tick")
              .attr("transform");
            const transformReg = /translate\(([\d|\.]+),([\d]+)\)/;
            const regResult = transformReg.exec(dTransform);
            let selfBandWidth = 0;
            if (regResult && regResult.length > 0) {
              selfBandWidth = Math.floor(Number(regResult[1]));
            }
            container
              .append("path")
              .attr("class", "ids_path")
              .attr("d", lineGen(tempData))
              .attr("stroke", "#FF5240")
              .attr("stroke-width", 2)
              .attr("transform", "translate(" + selfBandWidth + ",0)") //  `translate(${selfBandWidth},0)`
              .attr("fill", "transparent");

            // mask circle  鼠标移上的效果点
            const maskCircle = ai_ids.svgHelper.drawCircle(container, {
              attrs: {
                cx: -100,
                cy: -100,
                stroke: "#FF5240",
                fill: "#fff",
                r: 4,
                opacity: 0
              }
            });
          }
          setTimeout(function () {
            renderSvg();
          }, 200);
        },

        mounted: function () {}
      }
    ]
  };
})();
