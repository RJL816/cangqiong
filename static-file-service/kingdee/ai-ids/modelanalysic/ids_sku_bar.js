/**
 * 同一品类-不同价格段销量分析 条形图
 */
window.ai_ids = window.ai_ids || {}
ai_ids['ids_sku_bar_template'] = (function () {
  return {
    width: 0,
    containerId: 'customcontrolapsankey', //苍穹：customcontrolapsankey 本地：ids__modelAna_container
    containerWidth: '',
    svg: null,
    mode: -1, // 浏览模式  -1：全览模式   0：点击第一层的模式（看某个客户或仓库的详情） 1:点击第二层的模式（看某个物料分组的详情）

    containerHAndW: null,
    templateData: [
      {
        chartKey: 'ids_sku_bar',
        viewType: 'd3chart',
        chartTitle: {
          text: '',
          bottom: '0',
          left: '40%',
        },
        beforeMount(options) {
          let chartData = options.chartData
          if (chartData && chartData.hasOwnProperty('fdata')) {
            chartData = chartData.fdata
          }
          const uniqueCode = options.uniqueCode
          const containerId = `ids_modelanalysic_${uniqueCode}`
          console.log('ids_sku_pie beforeMount options is ', options)
          // const resData = {
          //     data: {
          //       fdata: [
          //         {
          //           fpricerange: "80元以上",
          //           fqty: 40,
          //           id: "high",
          //           name: "高价位",
          //         },
          //         {
          //           fpricerange: "20-80元",
          //           fqty: 100,
          //           id: "middle",
          //           name: "主价位",
          //         },
          //         {
          //           fpricerange: "20元以下",
          //           fqty: 60,
          //           id: "low",
          //           name: "低价位",
          //         },
          //       ],
          //       className: "洗发水", //末级分类名称
          //     },
          //     eventName: "createNewData",
          //     containerId: "ai_ids_ns_mats_sales_ana", //自定义控件标识
          //     pageId: "cbebd6eb169f42b0a2d0c2007b54a763",
          //   };
          let selfBandWidth = 0
          const tempData = chartData //resData.data.fdata;
          //清除/渲染  空提示
          if (!tempData || tempData.length == 0) {
            ai_ids.svgHelper.renderEmpty(d3.select(`#${containerId}`))
            return
          } else {
            ai_ids.svgHelper.clearEmpty(d3.select(`#${containerId}`))
          }
          const fxArr_new = tempData.map((item) => item.fqty)
          const fyLeftArr_new = tempData.map((item) => {
            const { name, fpricerange } = item
            return `${name}` //（${fpricerange}）
          })
          let fqtypercent_sum = 0
          tempData.forEach((item) => {
            const { fqtypercent } = item
            item.fqtypercentSum = fqtypercent + fqtypercent_sum
            fqtypercent_sum += fqtypercent
          })

          const prefixCls = 'ids_sku_bar'
          let width = 1200,
            height = 500,
            margin = 60,
            marginRight = 20,
            marginLeft = 140

          function renderSvg() {
            const svg = ai_ids.svgHelper.createSvg(containerId, {
              attrs: {
                width,
                height,
                class: `${prefixCls}_svg`,
              },
            })
            const containerRect = ai_ids.svgHelper.getContainerRect(
              `#${containerId}`,
            )
            if (containerRect) {
              width = containerRect.width * 0.98
              height = containerRect.height * 0.98
            }
            let containerClsName = `${prefixCls}__container`
            //先清除外层容器
            ai_ids.svgHelper.clearContainer(svg, containerClsName)
            const container = ai_ids.svgHelper.createContainer(svg, {
              className: containerClsName,
              transform: ['translate', marginLeft, margin],
            })

            const xScale = ai_ids.svgHelper.createScale({
              scaleType: 'linear', //"band",
              domain: [0, d3.max(fxArr_new)], // fxArr_new,//fxArr,
              range: [0, width - marginLeft - marginRight],
            })

            const yScale = ai_ids.svgHelper.createScale({
              scaleType: 'band', //"linear",
              domain: fyLeftArr_new, //[0, d3.max(fyLeftArr)],
              range: [height - margin * 2, 0],
            })

            const eachBandWith =
              yScale(fyLeftArr_new[1]) - yScale(fyLeftArr_new[0])

            const barWidth = yScale.bandwidth()

            const markRectWidth = Math.floor(eachBandWith / 8)
            //rect mask
            const maskRect = ai_ids.svgHelper.drawRect(container, {
              attrs: {
                x: 0,
                y: 0,
                width: width - marginLeft - marginRight,
                height: barWidth / 3 + 18,
                fill: 'rgba(0,0,0,.1)',
                opacity: 0,
              },
            })

            //创建X轴
            ai_ids.svgHelper.createAxis(container, xScale, {
              axisType: 'bottom',
              prefixCls,
              wrapperClsName: `${prefixCls}__x_axis`,
              cAttrs: {
                transform: ['translate', 0, height - margin * 2],
              },
              tickOptions: {
                tickSize: 0,
                tickPadding: 10,
              },
              textAttrs: {
                fill: '#555',
                splitVisNum: 3, //
              },
            })
            d3.selectAll(`.${prefixCls}__x_axis .tick`).each(function (d) {
              console.log('d is ', d)
              if (d != 0) {
                ai_ids.svgHelper.renderLine(d3.select(this), {
                  attrs: {
                    x1: 0,
                    y1: 0,
                    x2: 0,
                    y2: -(height - margin * 2),
                    stroke: '#d9d9d9',
                    'stroke-dasharray': '2 2',
                  },
                })
              } else {
                ai_ids.svgHelper.renderLine(d3.select(this), {
                  attrs: {
                    x1: 0,
                    y1: 0,
                    x2: 0,
                    y2: -(height - margin * 2),
                    stroke: '#d9d9d9',
                  },
                })
              }
            })

            // 创建Y轴
            ai_ids.svgHelper.createAxis(container, yScale, {
              axisType: 'left',
              prefixCls,
              wrapperClsName: `${prefixCls}__y_axis`,
              cAttrs: {
                transform: ['translate', 0, 0],
              },
              tickOptions: {
                ticks: 5,
                tickPadding: 10,
                tickSize: 0,
              },
              //轴的样式
              pathAttrs: {
                show: false,
              },
              renderSecondTick: function (d) {
                const target = tempData.filter((item) => item.name == d)
                console.log('renderSecondTick d is ', d)
                if (target.length > 0) {
                  return `（${target[0].fpricerange}）`
                }
                return ''
              },
              //   labelAttrs: {
              //     label: '',
              //     x: 200,
              //   },
            })

            const tipContainer = ai_ids.svgHelper.createTip(d3.select('body'), {
              attrs: {
                className: `${prefixCls}_tip_wrapper`,
              },
            })

            //画柱子
            const xTicks = container.selectAll(`.${prefixCls}__y_axis .tick`)
            xTicks
              .append('rect')
              .attr('class', `${prefixCls}__rect`)
              .attr('x', 0)
              .attr('y', -(barWidth / 3) / 2)
              .style('cursor', 'pointer')
              .attr('width', function (d, i) {
                let val = fxArr_new[i]
                return xScale(val)
              })
              .attr('height', function (d, i) {
                return barWidth / 3
              })
              .attr('fill', '#40A9FF')
              .on('mouseenter', function (d) {
                const tempData = chartData //resData.data.fdata
                const targetData = tempData.filter((item) => d == item.name)[0]
                let curNode = d3.select(this).node()
                while (
                  curNode &&
                  curNode != 'g' &&
                  curNode.getAttribute('class') != 'tick'
                ) {
                  curNode = curNode.parentNode
                }
                const transformAttr = curNode.getAttribute('transform')
                let transformVal = ai_ids.svgHelper.getTranslateYVal(
                  transformAttr,
                )
                console.log('transformVal is ', transformVal)
                const xVal = xScale(d)
                maskRect
                  .attr('y', transformVal - barWidth / 6 - 18 / 2) //
                  .transition()
                  .duration(200)
                  .attr('opacity', 1)
                // 折线 圆圈点显示
                tipContainer.html([
                  {
                    key: '',
                    value: targetData.name,
                  },
                  {
                    key: '销售数量',
                    value: targetData.fqty,
                  },
                ])
              })
              .on('mousemove', function (d) {
                const event = d3.event
                const pageX = event.pageX
                const pageY = event.pageY

                tipContainer.tipContainer
                  .style('left', `${pageX + 30}px`)
                  .style('top', `${pageY}px`)
                  .style('opacity', 1)
              })
              .on('mouseleave', function () {
                console.log('mouseleave!!!')
                maskRect.transition().duration(200).attr('opacity', 0)

                tipContainer.tipContainer.style('opacity', 0)
              })
          }
          renderSvg()
        },

        mounted() {},
      },
    ],
  }
})()
