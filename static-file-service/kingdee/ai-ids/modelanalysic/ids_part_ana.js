window.ai_ids = window.ai_ids || {}
ai_ids['ids_part_ana_template'] = (function () {
  return {
    width: 0,
    containerId: 'customcontrolapsankey', //苍穹：customcontrolapsankey 本地：ids__modelAna_container
    containerWidth: '',
    svg: null,
    mode: -1, // 浏览模式  -1：全览模式   0：点击第一层的模式（看某个客户或仓库的详情） 1:点击第二层的模式（看某个物料分组的详情）

    containerHAndW: null,
    templateData: [
      {
        chartKey: 'ids_part_ana',
        viewType: 'd3chart',
        chartTitle: {
          text: '',
          bottom: '0',
          left: '40%',
        },
        beforeMount(options) {
          const prefixCls = 'ids_part_ana'
          let width = 1200,
            height = 400,
            margin = 40
          const colorArr = [
            '#40A9FF',
            '#45DAD1',
            '#73D13D',
            '#ffc53d',
            '#ffa940',
          ]
          let chartData = options.chartData
          console.log('chartData is ', chartData)
          const uniqueCode = options.uniqueCode
          const containerId = `ids_modelanalysic_${uniqueCode}`
          const resData = {
            data: {
              dataList: [
                {
                  number: '7', //方案编码
                  data: {
                    //预测内容
                    ndarray: [
                      [
                        //未来12周的预测值（销量）
                        12.292563772951759,
                        37.64276827919585,
                        6.743799796973727,
                        6.263776819589977,
                        13.8168380476118,
                        26.12293392959485,
                        30.6773217949681,
                        10.067577495918162,
                        10.118592864559327,
                        6.693880058629231,
                        8.544048808175817,
                        8.297795995489674,
                      ],
                    ],
                  },
                  name: '方案7', //方案名称
                },
                {
                  number: '11',
                  data: {
                    ndarray: [
                      [
                        4.292563772951759,
                        7.64276827919585,
                        36.743799796973728,
                        16.263776819589979,
                        13.8168380476118,
                        26.12293392959485,
                        30.6773217949681,
                        10.067577495918162,
                        9.118592864559327,
                        30.69388005862923,
                        28.544048808175817,
                        23.297795995489677,
                      ],
                    ],
                  },
                  name: '方案11',
                },
                {
                  number: 33,
                  data: {
                    ndarray: [
                      //未来12周的预测值（销量）
                      [
                        32.292563772951759,
                        37.64276827919585,
                        16.743799796973727,
                        26.263776819589977,
                        13.8168380476118,
                        26.12293392959485,
                        30.6773217949681,
                        10.067577495918162,
                        8.118592864559327,
                        26.693880058629231,
                        18.544048808175817,
                        38.297795995489674,
                      ],
                    ],
                  },
                  name: '方案33',
                },
                {
                  number: '72', //方案编码
                  data: {
                    //预测内容
                    ndarray: [
                      [
                        //未来12周的预测值（销量）
                        12.292563772951759,
                        37.64276827919585,
                        6.743799796973727,
                        6.263776819589977,
                        13.8168380476118,
                        26.12293392959485,
                        30.6773217949681,
                        10.067577495918162,
                        10.118592864559327,
                        6.693880058629231,
                        8.544048808175817,
                        8.297795995489674,
                      ],
                    ],
                  },
                  name: '方案72', //方案名称
                },
                {
                  number: 'dd7', //方案编码
                  data: {
                    //预测内容
                    ndarray: [
                      [
                        //未来12周的预测值（销量）
                        12.292563772951759,
                        37.64276827919585,
                        6.743799796973727,
                        6.263776819589977,
                        13.8168380476118,
                        26.12293392959485,
                        30.6773217949681,
                        10.067577495918162,
                        10.118592864559327,
                        6.693880058629231,
                        8.544048808175817,
                        8.297795995489674,
                      ],
                    ],
                  },
                  name: '方案dd7', //方案名称
                },
              ],
              periodList: [
                //预测周期
                '03-27~04-02',
                '04-03~04-09',
                '04-10~04-16',
                '04-17~04-23',
                '04-24~04-30',
                '05-01~05-07',
                '05-08~05-14',
                '05-15~05-21',
                '05-22~05-28',
                '05-29~06-04',
                '06-05~06-11',
                '06-12~06-18',
              ],
            },
            eventName: 'createNewData',
            containerId: 'ai_ids_ns_composition_ana', //自定义控件标识
            pageId: 'cbebd6eb169f42b0a2d0c2007b54a763',
            timestamp: 1680862395087,
          }

          let tempArr = []
          //清除/渲染  空提示
          if (!chartData.dataList || chartData.dataList.length == 0) {
            ai_ids.svgHelper.renderEmpty(d3.select(`#${containerId}`))
            return
          } else {
            ai_ids.svgHelper.clearEmpty(d3.select(`#${containerId}`))
          }
          //   chartData.dataList resData.data
          chartData.dataList.forEach((item) => {
            const {
              data: { ndarray },
            } = item
            tempArr = tempArr.concat(...ndarray)
          })
          let maxVal = d3.max(tempArr)
          maxVal = Math.ceil(maxVal)

          //渲染图表
          function renderSvg() {
            //'ai_ids_ns_composition_ana'
            const svg = ai_ids.svgHelper.createSvg(containerId, {
              attrs: {
                width,
                height,
                svgPrecent: 0.5,
                class: `${prefixCls}_svg`,
              },
            })
            let containerClsName = `${prefixCls}__container`
            //先清除外层容器
            ai_ids.svgHelper.clearContainer(svg, containerClsName)
            const container = ai_ids.svgHelper.createContainer(svg, {
              className: containerClsName,
              transform: ['translate', margin, margin],
            })
            const containerRect = ai_ids.svgHelper.getContainerRect(
              `#${containerId}`,
            )
            if (containerRect) {
              width = containerRect.width * 0.96
            }
            //x 轴的比例尺
            const xScale = ai_ids.svgHelper.createScale({
              scaleType: 'band',
              domain: chartData.periodList, //chartData.periodList, resData.data
              range: [0, width - margin * 2],
            })
            const yScale = ai_ids.svgHelper.createScale({
              scaleType: 'linear',
              domain: [0, maxVal],
              range: [height * 0.5 - margin * 2, 0],
            })
            // 创建Y轴
            ai_ids.svgHelper.createAxis(container, yScale, {
              axisType: 'left',
              wrapperClsName: `${prefixCls}__y_axis`,
              cAttrs: {
                transform: ['translate', margin, 0],
              },
              tickOptions: {
                ticks: 5,
                tickSize: 0,
                tickPadding: 10,
              },
              pathAttrs: {
                show: false,
              },
              labelAttrs: {
                label: '预测数量',
                x: 25,
              },
            })
            // container
            //   .append('text')
            //   .text('预测数量')
            //   .attr('x', 10)
            //   .attr('y', -10)
            //   .attr('fill', '#555')
            //#E5E5E5
            //y轴得样式
            // d3.select(`.${prefixCls}__y_axis path`).attr('stroke', '#E5E5E5')
            // d3.selectAll(`.${prefixCls}__y_axis .tick text`).attr(
            //   'fill',
            //   '#999',
            // )

            d3.selectAll(`.${prefixCls}__y_axis .tick`).each(function () {
              ai_ids.svgHelper.renderLine(d3.select(this), {
                attrs: {
                  x1: 0,
                  y1: 0,
                  x2: width - margin * 2,
                  y2: 0,
                  stroke: '#d9d9d9',
                  'stroke-dasharray': '2 2',
                },
              })
            })
            //创建X轴
            ai_ids.svgHelper.createAxis(container, xScale, {
              axisType: 'bottom',
              wrapperClsName: `${prefixCls}__x_axis`,
              cAttrs: {
                transform: ['translate', margin, height * 0.5 - margin * 2],
              },
              tickOptions: {
                tickSize: 0,
              },
              textAttrs: {
                show: false,
              },
            })
            //去除X轴得文本
            // d3.selectAll(`.${prefixCls}__x_axis .tick text`).attr('opacity', 0)
            // d3.select(`.${prefixCls}__x_axis path`).attr('stroke', '#E5E5E5')

            let tempBarDataList = chartData.dataList //chartData.dataList resData.data

            tempBarDataList.forEach((item, idx) => {
              let color = colorArr[idx]
              const { data } = item
              renderRects(color, idx, data.ndarray[0])
            })
            let mouseId = -1
            function renderRects(color, idx, newYData) {
              let bandWidth = xScale.bandwidth()

              let barWidth = bandWidth / (tempBarDataList.length * 2)
              barWidth = Math.floor(barWidth)

              // debugger
              //画柱子
              let midIdx = Math.floor(tempBarDataList.length / 2)
              const xTicks = container.selectAll(`.${prefixCls}__x_axis .tick`)
              xTicks
                .append('rect')
                .attr('class', function (d) {
                  d = d.replace('~', '_')
                  return `${prefixCls}__rect rect_${d} ${prefixCls}_rect_${idx}`
                })
                .attr('x', (d) => {
                  if (idx == midIdx) {
                    let x = -(barWidth / 2)
                    return x
                  } else if (idx < midIdx) {
                    // return 0
                    let x = -(
                      barWidth / 2 +
                      barWidth * (midIdx - idx) +
                      2 * (midIdx - idx)
                    )
                    return x
                  } else if (idx > midIdx) {
                    let x =
                      barWidth / 2 +
                      2 * (idx - midIdx) +
                      barWidth * (idx - midIdx - 1)

                    return x
                  }
                })
                .attr('y', function (d, i) {
                  let val = newYData[i]
                  // return yScale(val)
                  return -(yScale(0) - yScale(val))
                })
                .attr('width', barWidth)
                .attr('height', function (d, i) {
                  let val = newYData[i]

                  let result = yScale(0) - yScale(val)
                  return result
                })
                .attr('fill', color)
                .style('cursor', 'pointer')
                .on('mouseenter', function (d) {
                  const classList = d3.select(this).attr('class')

                  const classReg = /ids_part_ana_rect_([\d]+)/
                  const clsResult = classReg.exec(classList)

                  if (clsResult && clsResult.length > 0) {
                    const id = clsResult[1]
                    mouseId = id
                    afterD = d.replace('~', '_')
                    d3.selectAll(`.rect_${afterD}`)
                      .filter(function () {
                        const classList = d3.select(this).attr('class')

                        return (
                          classList.indexOf(`ids_part_ana_rect_${id}`) == -1
                        )
                      })
                      .transition()
                      .attr('opacity', 0.1)
                    const numCls = `#${containerId} .span_${afterD}_${id}`
                    d3.select(numCls)
                      .style('color', '#000')
                      .style('font-weight', 1000)
                      .style('font-size', '18px')
                  }
                })
                .on('mouseleave', function (d) {
                  afterD = d.replace('~', '_')
                  d3.selectAll(`.rect_${afterD}`)
                    .transition()
                    .attr('opacity', 1)

                  const numCls = `#${containerId} .span_${afterD}_${mouseId}`
                  d3.select(numCls)
                    .style('color', '#999')
                    .style('font-weight', '')
                    .style('font-size', '12px')
                  mouseId = -1
                })
            }
            // renderRects()
            renderLegend(svg, chartData.dataList) //chartData.dataList resData.data
          }
          let ftimeArr = chartData.periodList //chartData.periodList resData.data
          //渲染表格
          function renderTable() {
            const wrapper = document.querySelector(`#${containerId}`) //'#ai_ids_ns_composition_ana'
            const tableContainer = document.createElement('div')
            tableContainer.className = `${prefixCls}__table`
            tableContainer.style.width = `${width - margin}px`

            createTableHeader(tableContainer)

            const tempList = chartData.dataList //chartData.dataList   resData.data
            tempList.forEach((item, idx) => {
              const {
                data: { ndarray },
              } = item
              createTableBody(tableContainer, ndarray, colorArr[idx], idx)
            })
            wrapper.appendChild(tableContainer)
          }
          function createTableBody(tableContainer, tableData, color, rowIdx) {
            tableData[0].unshift('')

            tableData.forEach((item, idx) => {
              const innerWrapper = document.createElement('div')
              innerWrapper.className = `${prefixCls}__inner_wrapper`
              const fragment = document.createDocumentFragment()
              item.forEach((dataItem, index) => {
                const columnRes = getTableSpanColumn(index)
                const d = document.createElement('span')
                // d.className = 'single-unit'
                d.className = `single-unit span_${columnRes}_${rowIdx}`
                if (dataItem) {
                  dataItem = Number(dataItem).toFixed(0)
                }
                d.textContent = dataItem
                if (index == 0) {
                  d.style.width = `40px`

                  d.classList.add('first-unit')
                  const colorDom = document.createElement('span')
                  colorDom.className = `${prefixCls}__unit_color`
                  colorDom.style.backgroundColor = color
                  d.appendChild(colorDom)
                }

                fragment.appendChild(d)
              })
              innerWrapper.appendChild(fragment)
              tableContainer.appendChild(innerWrapper)
            })
          }
          function getTableSpanColumn(idx) {
            let res = ftimeArr[idx]
            res = res.replace('~', '_')
            return res
          }
          //创建表格头部
          function createTableHeader(tableContainer) {
            const fragment = document.createDocumentFragment()
            const innerWrapper = document.createElement('div')
            innerWrapper.className = `${prefixCls}__table_header`
            ftimeArr.unshift(' ')
            ftimeArr.forEach((item, idx) => {
              const d = document.createElement('span')
              d.textContent = item
              if (idx == 0) {
                d.style.width = `40px`
                d.classList.add('first-unit')
              }
              fragment.appendChild(d)
              innerWrapper.appendChild(fragment)
              tableContainer.appendChild(innerWrapper)
            })
          }
          /**
           * 画legend
           **/

          function calculateAllLenght(data) {
            let allLen = 0
            data.forEach((item) => {
              const singleLen = calculateSingleLegend(item.name)
              const { name } = item
              allLen += singleLen + 20 //margin
            })

            return allLen
          }

          function calculateSingleLegend(text) {
            //字体大小为12 rect 为 10 X 10 大小  padding 10
            return text.length * 12 + 10 + 10
          }

          function drawSingleLegend(container, item, startX, color) {
            const legendContainer = container.append('g')
            legendContainer
              .append('rect')
              .attr('x', startX)
              .attr('y', 5)
              .attr('width', 10)
              .attr('height', 10)
              .attr('fill', color)
            const textCls = `${prefixCls}_${item.name}_text`
            legendContainer
              .append('text')
              .attr('class', textCls)
              .attr('x', startX + 16)
              .attr('y', 15)
              .text(item.name)
              .attr('fill', '#555')
            let textLen = d3
              .select(`#${containerId} .${textCls}`)
              .node()
              .getComputedTextLength()
            textLen = Math.ceil(textLen)
            return textLen + 16
          }

          function renderLegend(container, data) {
            const allLen = calculateAllLenght(data)
            let startX = (width - margin * 2 - allLen) / 2

            data.forEach((item, i) => {
              let singleLen = drawSingleLegend(
                container,
                item,
                startX,
                colorArr[i],
              )

              startX += singleLen
              startX += 10
            })
          }

          setTimeout(function () {
            renderSvg()
            renderTable()
          }, 200)
        },
        mounted() {},
      },
    ],
  }
})()
