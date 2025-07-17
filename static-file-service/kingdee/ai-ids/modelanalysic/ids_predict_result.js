window.ai_ids = window.ai_ids || {}
ai_ids['ids_predict_result_template'] = (function () {
  return {
    width: 0,
    containerId: 'customcontrolapsankey', //苍穹：customcontrolapsankey 本地：ids__modelAna_container
    containerWidth: '',
    svg: null,
    mode: -1, // 浏览模式  -1：全览模式   0：点击第一层的模式（看某个客户或仓库的详情） 1:点击第二层的模式（看某个物料分组的详情）

    containerHAndW: null,
    templateData: [
      {
        chartKey: 'ids_predict_result',
        viewType: 'd3chart',
        chartTitle: {
          text: '',
          bottom: '0',
          left: '40%',
        },
        beforeMount(options) {
          let chartData = options.chartData
          const uniqueCode = options.uniqueCode
          console.log('ids_predict_result beforeMount options is ', options)
          const containerId = `ids_modelanalysic_${uniqueCode}`
          const prefixCls = 'ids_predict_result'
          let width = 1200,
            height = 400,
            margin = 40
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
            containerId: 'ai_ids_ns_predict_data', //自定义控件标识
            pageId: 'cbebd6eb169f42b0a2d0c2007b54a763',
            timestamp: 1680862395087,
          }

          //   const afterDealData = resData.data.dataList[0].data.ndarray[0]
          let afterDealData = chartData.dataList[0].data.ndarray
          //清除/渲染  空提示
          if (!afterDealData || afterDealData.length == 0) {
            ai_ids.svgHelper.renderEmpty(d3.select(`#${containerId}`))
            return
          } else {
            ai_ids.svgHelper.clearEmpty(d3.select(`#${containerId}`))
          }
          afterDealData = afterDealData[0]
          const newYData = afterDealData.map((item) => {
            // let val = Math.ceil(item)
            const afterTrans = Number(item).toFixed(0)
            return Number(afterTrans)
          })
          const yExtent = d3.extent(newYData)
          console.log('afterDealData is ', yExtent)
          //渲染图表
          function renderSvg() {
            const svg = ai_ids.svgHelper.createSvg(containerId, {
              //'ai_ids_ns_predict_data'
              attrs: {
                width,
                height,
                svgPrecent: 0.6, // 图表一体的比例
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
            width = containerRect.width * 0.96
            height = containerRect.height * 0.6
            console.log('periodList is ', chartData.periodList)
            //x 轴的比例尺
            const xScale = ai_ids.svgHelper.createScale({
              scaleType: 'band',
              domain: chartData.periodList,
              range: [0, width - margin * 2],
            })
            const yScale = ai_ids.svgHelper.createScale({
              scaleType: 'linear',
              domain: [0, yExtent[1]],
              range: [height - margin * 2, 0],
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
                tickPadding: 10,
                tickSize: 0,
              },
            })
            container
              .append('text')
              .text('数量')
              .attr('fill', '#555')
              .attr('x', 20)
              .attr('y', -10)
            //#E5E5E5
            //y轴得样式
            d3.select(`.${prefixCls}__y_axis path`).attr('stroke', '#E5E5E5')
            d3.selectAll(`.${prefixCls}__y_axis .tick text`).attr(
              'fill',
              '#999',
            )
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
                transform: ['translate', margin, height - margin * 2],
              },
              tickOptions: {
                tickSize: 0,
              },
            })

            //去除X轴得文本
            d3.selectAll(`.${prefixCls}__x_axis .tick text`).attr('opacity', 0)
            d3.select(`.${prefixCls}__x_axis path`).attr('stroke', '#E5E5E5')

            //画柱子
            const xTicks = container.selectAll(`.${prefixCls}__x_axis .tick`)
            xTicks
              .append('rect')
              .attr('class', `${prefixCls}__rect`)
              .attr('x', -15)
              .attr('y', function (d, i) {
                let val = newYData[i]
                return -(yScale(0) - yScale(val))
              })
              .attr('width', 30)
              .attr('height', function (d, i) {
                let val = newYData[i]

                let result = yScale(0) - yScale(val)

                return Number(result)
              })
              .attr('fill', '#40A9FF')

            // xTicks
            //   .append('text')
            //   .attr('class', `${prefixCls}__text`)
            //   .attr('x', 0)
            //   .attr('y', function (d, i) {
            //     let val = newYData[i]
            //     return -(yScale(0) - yScale(val)) - 4
            //   })
            //   .text(function (d, i) {
            //     let val = newYData[i]
            //     return val
            //   })
            //   .attr('fill', '#999')
          }
          //   let ftimeArr = resData.data.periodList
          let ftimeArr = chartData.periodList
          //渲染表格
          function renderTable() {
            const wrapper = document.querySelector(`#${containerId}`) //'#ai_ids_ns_predict_data'
            const tableContainer = document.createElement('div')
            tableContainer.className = `${prefixCls}__table`
            tableContainer.style.width = `${width - margin * 2}px`

            createTableHeader(tableContainer)
            // const tableData = resData.data.dataList[0].data.ndarray
            const tableData = chartData.dataList[0].data.ndarray
            //chartData.dataList[0].data.ndarray
            tableData.forEach((item) => {
              const innerWrapper = document.createElement('div')
              innerWrapper.className = `${prefixCls}__inner_wrapper`
              const fragment = document.createDocumentFragment()
              item.forEach((dataItem) => {
                const d = document.createElement('span')
                dataItem = Number(dataItem).toFixed(0)
                d.textContent = dataItem
                fragment.appendChild(d)
              })
              innerWrapper.appendChild(fragment)
              tableContainer.appendChild(innerWrapper)
            })
            wrapper.appendChild(tableContainer)
          }
          //创建表格头部
          function createTableHeader(tableContainer) {
            const fragment = document.createDocumentFragment()
            const innerWrapper = document.createElement('div')
            innerWrapper.className = `${prefixCls}__table_header`
            ftimeArr.forEach((item) => {
              const d = document.createElement('span')
              d.textContent = item
              fragment.appendChild(d)

              innerWrapper.appendChild(fragment)
              tableContainer.appendChild(innerWrapper)
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
