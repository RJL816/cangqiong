/*
 *   标签影响分析
 */

window.ai_ids = window.ai_ids || {}
ai_ids['tag_influence_ana_template'] = (function () {
  return {
    width: 0,
    containerId: 'customcontrolapsankey', //苍穹：customcontrolapsankey 本地：ids__modelAna_container
    containerWidth: '',
    svg: null,
    mode: -1, // 浏览模式  -1：全览模式   0：点击第一层的模式（看某个客户或仓库的详情） 1:点击第二层的模式（看某个物料分组的详情）

    containerHAndW: null,
    templateData: [
      {
        chartKey: 'tag_influence_ana',
        viewType: 'd3chart',
        chartTitle: {
          text: '',
          bottom: '0',
          left: '40%',
        },
        beforeMount(options) {
          let chartData = options.chartData
          const uniqueCode = options.uniqueCode
          let { tags } = chartData
          clearSvg()

          // tags = tags.slice(0, 2)
          // tags = []
          if (!tags || tags.length == 0) {
            drawEmpty()
            return
          } else {
            const emptyDom = d3.select('.ids__tag_influence_ana__wrapper')
            if (emptyDom) {
              emptyDom.remove()
            }
          }

          tags = tags.filter((item) => item.value != 0)

          tags.sort((a, b) => {
            return b.value - a.value
          })
          console.log('tag_influence_ana_template options is ', options)
          let colorArr = [
            '#C0DAF8',
            '#D3F5F4',
            '#7FD4D2',
            '#9CD9F5',
            '#9CC1F5',
            '#D9CCF7',
            '#F7EECC',
            '#F6E1C7',
            '#E0E5E8',
          ]
          let yMin = d3.min(tags, (item) => {
            return item.value
          })
          let yMax = d3.max(tags, (item) => {
            return item.value
          })
          function clearSvg() {
            const svgContainer = d3.select('.ids__tag_influence_ana__svg')
            if (svgContainer) {
              svgContainer.remove()
            }
          }

          function drawEmpty() {
            const container = d3.select('#ai_ids_dm_tag_influence')
            const tempDom = document.querySelector(
              '.ids__tag_influence_ana__wrapper',
            )
            if (tempDom) return
            const tempWrapper = container
              .append('div')
              .attr('class', 'ids__tag_influence_ana__wrapper')
            //./kingdee/ai-ids/modelanalysic/img/bemarked.png
            tempWrapper
              .append('img')
              .attr('src', './kingdee/ai-ids/modelanalysic/img/empty.png')

            tempWrapper
              .append('div')
              .text('没有数据哦')
              .style('text-align', 'center')
              .style('color', '#333')
          }

          function getContainer() {
            let rect = null
            const drawerDom = document.querySelector('#flexdrawer')
            let flexpanellapH = 320
            if (drawerDom) {
              const drawerRect = drawerDom.getBoundingClientRect()
              // 这里做个小屏适配
              if (drawerRect.height < 700) {
                const flexpanellap = document.querySelector('#flexpanelap1211')
                flexpanellapH = 200
                if (flexpanellap) {
                  flexpanellap.style.height = `${flexpanellapH}px`
                }
              }
            }
            const container = document.querySelector('#ai_ids_dm_tag_influence')
            if (container) {
              rect = container.getBoundingClientRect()
            }
            if (rect && rect.width == 0) {
              rect = {
                width: 700,
              }
            }
            if (rect && rect.height == 0) {
              rect.height = flexpanellapH - 10
            }
            return rect
          }
          let containerRect = getContainer()
          console.log('yMin is ' + yMin + ' and yMax is ' + yMax)
          //   let xArr = d3.map(tags, (item) => item.name)
          let xArr = tags.map((item) => item.name)

          const height = containerRect.height || 200,
            width = containerRect.width - 40,
            margin = 50,
            marginLeft = 80,
            marginTop = 50,
            marginBottom = 30,
            marginRight = 20

          let xScale = d3
            .scaleBand()
            .range([0, width - marginLeft - marginRight])
            .domain(xArr)
          let yScale = d3
            .scaleLinear()
            .range([height - marginBottom - marginTop, 0])
            .domain([0, yMax])
          let maxd = yScale(0)

          let svg = d3
            .select('#ai_ids_dm_tag_influence')
            .append('svg')
            .attr('class', 'ids__tag_influence_ana__svg')
            .attr('width', width)
            .attr('height', height)

          let canvas = svg
            .append('g')
            .attr('transform', `translate(${marginLeft},${marginTop})`)

          //画左侧的Y轴  Y轴是value类型
          function drawLeftYAxis() {
            yLeftAxis = d3.axisLeft(yScale).ticks(5)

            canvas
              .append('g')
              .attr('class', 'y-left-axis')
              .attr('transform', `translate(${0},${0})`)
              .call(yLeftAxis)
          }
          let xMax = d3.max(tags, (item) => {
            return item.value
          })
          let xScaleValue = d3
            .scaleLinear()
            .range([0, width - marginLeft - marginRight])
            .domain([0, xMax])
          let yLeftScaleValue = d3
            .scaleBand()
            .range([0, height - marginTop - marginBottom])
            .domain(xArr)
          let yAxisLeftValue
          //Y轴是类别
          function drawLeftYAxis_catalog() {
            yAxisLeftValue = d3
              .axisLeft(yLeftScaleValue)
              .tickSize(0)
              .tickPadding(10)
            canvas
              .append('g')
              .attr('class', 'y-left-axis-value')

              .attr('transform', `translate(${0},${0})`)
              .call(yAxisLeftValue)

            d3.selectAll(
              '.ids__tag_influence_ana__svg .y-left-axis-value .tick text',
            )
              .attr('fill', function (d, i) {
                return '#555'
              })
              .style('font-size', '14px')
              .text((d) => {
                return d && d.length > 4 ? d.substring(0, 4) + '...' : d
              })
          }

          // X轴是value类型
          function drawXAxis_value() {
            const xAxis_value = d3
              .axisBottom(xScaleValue)
              .ticks(5)
              .tickSize(0)
              .tickPadding(10)
            canvas
              .append('g')
              .attr('class', 'x-axis')
              .attr(
                'transform',
                `translate(${0},${height - marginTop - marginBottom})`,
              )
              .call(xAxis_value)

            d3.selectAll('.ids__tag_influence_ana__svg .x-axis .tick text')
              .attr('fill', function (d, i) {
                return '#555'
              })
              .style('font-size', '14px')
          }
          let xGroups
          let xAxis
          // 画X轴
          function drawXAxis() {
            xAxis = d3.axisBottom(xScale).tickSize(0)
            xGroups = canvas
              .append('g')
              .attr('class', 'x-axis')
              .attr('transform', `translate(${0},${maxd})`)

            xGroups.call(xAxis)
            d3.selectAll('.ids__tag_influence_ana__svg .x-axis .tick text')
              .attr('fill', function (d, i) {
                return '#555'
              })
              .style('font-size', '14px')
              .text((d) => {
                return d && d.length > 5 ? d.substring(0, 5) + '...' : d
              })
          }

          function drawLegendRect(color, i, textStr) {
            let x = (width - margin * 2) / 2 - 120 + i * 100
            svg
              .append('rect')
              .attr('x', x)
              .attr('y', 8)
              .attr('width', 15)
              .attr('height', 15)
              .attr('rx', 2)
              .attr('fill', color)

            svg
              .append('text')
              .attr('x', x + 20)
              .attr('y', 20)
              .text(textStr)
              .attr('transform', 'translate(0,1)')
          }
          //画线
          function drawRedLine() {
            canvas
              .selectAll('.ids__tag_influence_ana__svg .y-left-axis .tick')
              // .data([1])
              // .enter()
              .append('line')
              .attr('x1', 0)
              .attr('y1', 0)
              .attr('x2', width - marginLeft)
              .attr('y2', 0)
              .attr('stroke', '#d9d9d9')
              .attr('stroke-dasharray', '2,2')
              .attr('transform', `translate(0,${0})`)
          }
          let zoomGroups
          function createGroup() {
            const barsGroup = canvas.append('g').attr('class', 'ids__bars')
            zoomGroups = barsGroup.append('g').attr('class', 'ids__zoom')
          }

          function drawMaskRects(bandWidth) {
            d3.selectAll('.ids__tag_influence_ana__svg .x-axis .tick')
              .append('rect')
              .attr(
                'class',
                (d, i) =>
                  `tag_influence_ana__mask_rect tag_influence_ana__mask_rect_${i}`,
              )
              .attr('x', function (d, i) {
                return -(bandWidth / 3 + 18) / 2
              })
              .attr('y', function (d, i) {
                return -yScale(0)
              })
              .attr('width', bandWidth / 3 + 18) // 20
              .attr('height', (d, i) => {
                return height - marginTop - marginBottom
              })
              .attr('fill', '#000')
              .attr('fill-opacity', 0)
          }
          function drawRects(bandWidth) {
            console.log('DrawRects!!!', tags)
            console.log(
              'drawRects colomMap is ',
              ai_ids['setting']['tag_mark_ana'],
            )
            d3.selectAll('.ids__tag_influence_ana__svg .x-axis .tick')
              .append('rect')
              .attr('class', 'tag_influence_ana')
              .attr('x', function (d, i) {
                return -(bandWidth / 3) / 2
              })
              .attr('y', function (d, i) {
                const item = tags.filter((item) => item.name == d)
                console.log('item is ', item)
                const offset = yScale(0) - yScale(item[0].value)
                console.log('offset is ', offset)
                return -offset
              })
              .attr('width', bandWidth / 3)
              .attr('height', (d, i) => {
                const item = tags.filter((item) => item.name == d)
                // console.log('item is ',item)
                return yScale(0) - yScale(item[0].value)
              })
              .attr('fill', (d, i) => {
                // const color = colorMap[item[0].id]
                const item = tags.filter((item) => item.name == d)[0]
                let color = colorArr[i]
                let k = item.id
                if (ai_ids['setting']['tag_mark_ana']) {
                  let colorMap = ai_ids['setting']['tag_mark_ana']

                  if (colorMap.hasOwnProperty(k)) {
                    color = colorMap[k]
                  }
                }
                return color
              })
              .attr('key', function (d) {
                return d
              })
              .style('cursor', 'pointer')
          }

          function drawHorizantalMaskRect(bandWidth) {
            d3.selectAll(
              '.ids__tag_influence_ana__svg .y-left-axis-value .tick',
            )
              .append('rect')
              .attr('class', (d, i) => `tag_influence_ana__mask_rect_${i}`)
              .attr('x', 0)
              .attr('y', -(bandWidth / 3 + 18) / 2)
              .attr('key', (d) => d)
              .attr('width', function (d, i) {
                console.log('d is ', d)
                let target = tags.filter((item) => item.name == d)
                target = target[0]

                return xScaleValue(target.value)
              })
              .attr('height', bandWidth / 3 + 18)
              .attr('fill', '#000')
              .attr('fill-opacity', 0)
          }
          //画横向的柱状图
          function drawHorizantalRect(bandWidth) {
            d3.selectAll(
              '.ids__tag_influence_ana__svg .y-left-axis-value .tick',
            )
              .append('rect')
              .attr('class', 'ids__horizantal__rect tag_influence_ana')
              .attr('x', 0)
              .attr('y', -(bandWidth / 3) / 2)
              .attr('width', function (d, i) {
                console.log('d is ', d)
                let target = tags.filter((item) => item.name == d)
                target = target[0]

                return xScaleValue(target.value)
              })
              .attr('height', bandWidth / 3)
              .attr('fill', function (d, i) {
                let target = tags.filter((item) => item.name == d)
                target = target[0]

                let color = colorArr[i]
                let k = target.id
                if (ai_ids['setting']['tag_mark_ana']) {
                  let colorMap = ai_ids['setting']['tag_mark_ana']

                  if (colorMap.hasOwnProperty(k)) {
                    color = colorMap[k]
                  }
                }
                return color
              })
              .attr('key', function (d) {
                return d
              })
          }
          if (tags.length > 3) {
            let bandWidth = xScale.bandwidth()
            drawLeftYAxis()

            drawRedLine()
            createGroup()
            drawXAxis()
            drawMaskRects(bandWidth)
            drawRects(bandWidth)
          } else {
            drawXAxis_value()
            drawLeftYAxis_catalog()
            let bandWidth = yLeftScaleValue.bandwidth()
            drawRedLine()
            drawHorizantalMaskRect(bandWidth)
            drawHorizantalRect(bandWidth)
          }
          let bodyRect
          let mouseEnterIdx = -1
          let tooltip
          function addEvent() {
            d3.selectAll('rect.tag_influence_ana')
              .on('mouseenter', function (d) {
                const target = d3.event.target
                const ftime = target && target.getAttribute('key')
                console.log('ftime is ', ftime)

                const targetItem = tags.filter((item) => item.name == ftime)
                const idx = tags.findIndex((item) => item.name == ftime)

                mouseEnterIdx = idx
                createTooltip(targetItem[0])
                console.log('ids ix ', idx)
                const fff = `tag_influence_ana__mask_rect_${idx}`
                console.log('fff is ', fff)
                //tag_influence_ana__mask_rect_2
                const targetd = d3.select(`.${fff}`)
                console.log('targetd is ', targetd)
                targetd.attr('fill-opacity', 0.1)
              })
              .on('mousemove', function (params) {
                createTooltip()
              })
              .on('mouseleave', function () {
                const fff = `tag_influence_ana__mask_rect_${mouseEnterIdx}`

                const targetd = d3.select(`.${fff}`).attr('fill-opacity', 0)
                removeTooltip()
                mouseEnterIdx = -1
              })
          }

          function createTooltip(dataItem) {
            let offsetX = event.pageX + 20
            let offsetY = event.pageY

            let newPosX = 0
            if (!bodyRect) {
              bodyRect = document.querySelector('body').getBoundingClientRect()
            }

            const bodyWidth = bodyRect.width
            if (!tooltip) {
              //添加tooltip

              if (bodyWidth - offsetX < 300) {
                offsetX = offsetX - 300
                newPosX = offsetX
              } else {
                newPosX = offsetX
              }
              if (tags.length > 3 && mouseEnterIdx == tags.length - 1) {
                newPosX = offsetX - 250
              } else {
                if (bodyWidth - offsetX < 220) {
                  offsetX = offsetX - 260
                  newPosX = offsetX
                } else {
                  newPosX = offsetX
                }
                // newPosX = offsetX
              }
              tooltip = d3
                .select('body')
                .append('div')
                .attr('class', 'ids__tag_influence_ana__tooltip')
                .style('left', `${newPosX}px`)
                .style('top', `${offsetY - 10}px`)
              // const time=timeArr[idx]

              console.log('dataItem is ', dataItem)
              // const per=lineData[idx]
              // const {ftime,tags}=dataItem
              let tooltipTags = [
                {
                  name: '标签名称',
                  value: dataItem.name,
                },
                {
                  name: '占比',
                  value: Number(dataItem.value).toFixed(2),
                },
              ]
              // tooltip.
              //  append('div')
              //  .attr('class','time')
              //  .text(ftime)

              tooltipTags.forEach((tag, idx) => {
                const row = tooltip
                  .append('div')
                  .attr('class', `content content_${idx}`)
                row.append('label').text(`${tag.name}：`)
                row.append('span').text(tag.value)
              })
            } else {
              if (tags.length > 3 && mouseEnterIdx == tags.length - 1) {
                newPosX = offsetX - 250
              } else {
                if (bodyWidth - offsetX < 220) {
                  offsetX = offsetX - 260
                  newPosX = offsetX
                } else {
                  newPosX = offsetX
                }
                // newPosX = offsetX
              }
              tooltip
                .style('left', `${newPosX}px`)
                .style('top', `${offsetY - 10}px`)
            }
          }

          function removeTooltip() {
            const tooltipDom = document.querySelector(
              '.ids__tag_influence_ana__tooltip',
            )
            tooltipDom.remove()
            tooltip = null
          }
          function drawText(options) {
            const { text, attrs, styles } = options
            const textSvg = svg.append('text').text(text)

            attrs.forEach((item) => {
              if (item) {
                textSvg.attr(item.name, item.value)
              }
            })
            styles.forEach((item) => {
              if (item) {
                textSvg.style(item.name, item.value)
              }
            })
          }
          drawText({
            attrs: [
              {
                name: 'x',
                value: marginLeft - 40 - 30,
              },
              {
                name: 'y',
                value: 20,
              },
              {
                name: 'fill',
                value: '#212121',
              },
            ],
            styles: [
              {
                name: 'font-size',
                value: '14px',
              },
              {
                name: 'font-weight',
                value: 400,
              },
            ],
            text: '标签影响分析',
          })
          drawText({
            attrs: [
              {
                name: 'x',
                value: marginLeft - 40 - 2,
              },
              {
                name: 'y',
                value: 45,
              },
              {
                name: 'fill',
                value: '#999',
              },
            ],
            styles: [],
            text: '（占比）',
          })
          addEvent()
        },
        mounted() {},
      },
    ],
  }
})()
