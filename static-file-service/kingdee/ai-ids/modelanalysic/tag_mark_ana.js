/*
 *   标签影响分析
 */

window.ai_ids = window.ai_ids || {}
ai_ids['tag_mark_ana_template'] = (function () {
  return {
    width: 0,
    containerId: 'customcontrolapsankey', //苍穹：customcontrolapsankey 本地：ids__modelAna_container
    containerWidth: '',
    svg: null,
    mode: -1, // 浏览模式  -1：全览模式   0：点击第一层的模式（看某个客户或仓库的详情） 1:点击第二层的模式（看某个物料分组的详情）

    containerHAndW: null,
    templateData: [
      {
        chartKey: 'tag_mark_ana',
        viewType: 'd3chart',
        chartTitle: {
          text: '',
          bottom: '0',
          left: '40%',
        },
        beforeMount(options) {
          let chartData = options.chartData
          const uniqueCode = options.uniqueCode

          // console.log('mark_ana options is ', options)

          let colorMap = {}
          let totalColor = '#6682F5'
          let colorArr = [
            '#45DAD1',
            '#B889EA',
            '#40A9FF',
            '#95DE64',
            '#73d13d',
            '#ffc53d',
            '#ffa940',
            '#f57582',
            '#9f69e2',
            '#6682f5',
            '#f273b5',
          ]

          if (chartData.values.length > 150) {
            scaleMin = 4
            scaleMax = 30
          } else if (chartData.values.length > 100) {
            scaleMin = 5
            scaleMax = 25
          } else {
            scaleMin = 3
            scaleMax = 20
          }
          function sum(arr) {
            let sum = 0
            arr.forEach((item) => {
              sum += item.value
            })
            return sum
          }
          let positiveArr = chartData.values.map((item) => {
            const tags = item.tags
            const canTags = tags.filter(
              (i) => i.id != 'factvalue' && i.id != 'y' && i.value > 0,
            )
            return sum(canTags)
          })

          let negativeArr = chartData.values.map((item) => {
            const tags = item.tags
            const canTags = tags.filter(
              (i) => i.id != 'factvalue' && i.id != 'y' && i.value <= 0,
            )
            return sum(canTags)
          })
          function getContainer() {
            let rect = null
            const container = document.querySelector(
              '#ai_ids_data_mark_analysis',
            )
            const drawerDom = document.querySelector('#flexdrawer')
            let height = 400
            if (drawerDom) {
              // console.log(
              //   'drawerDom rect is ',
              //   drawerDom.getBoundingClientRect(),
              // )
              const drawerRect = drawerDom.getBoundingClientRect()
              height = drawerRect.height - 50 - 40 - 320 - 20
            }
            if (container) {
              rect = container.getBoundingClientRect()
            }
            if (rect && rect.width == 0) {
              rect = {
                width: 700,
              }
            }
            rect.height = height
            return rect
          }
          clearSvg()
          const containerRect = getContainer()

          let yMin = d3.min(negativeArr)
          let yMax = d3.max(positiveArr)
          // console.log('yMin is ', yMin)
          // console.log('yMax is ', yMax)
          function getIntegerNumber(number) {
            console.log('getIntegerNumber number is ', number)
            let numberStr = String(number)
            let len = numberStr.length
            let lenStr = '1'
            for (let i = 1; i < len; i++) {
              lenStr += '0'
            }
            let temp = number / parseInt(lenStr)
            console.log('temp is ', temp)
            temp = Math.ceil(temp)
            console.log('after temp is ', temp)
            temp *= parseInt(lenStr)

            return temp
          }
          // yMax = getIntegerNumber(parseInt(yMax))
          //  d3.max()
          const height = containerRect.height - 20,
            width = containerRect.width - 40,
            margin = 50,
            marginLeft = 70,
            marginTop = 50,
            marginBottom = 40,
            marginRight = 30

          const timeArr = chartData.values.map((item) => {
            return item.ftime
          })
          function clearSvg() {
            const svgContainer = d3.select('.ids__tag_mark_ana__svg')
            if (svgContainer) {
              svgContainer.remove()
            }
          }

          let xScale = d3.scaleBand().range([0, width]).domain(timeArr)
          let yScale = d3
            .scaleLinear()
            .range([height - marginBottom - marginTop, 0])
            .domain([yMin, yMax])
          let maxd = yScale(0)

          let svg = d3
            .select('#ai_ids_data_mark_analysis')
            .append('svg')
            .attr('class', 'ids__tag_mark_ana__svg')
            .attr('width', width)
            .attr('height', height)
            .style('cursor', 'pointer')

          let canvas = svg
            .append('g')
            .attr('transform', `translate(${marginLeft},${marginTop})`)

          //画左侧的Y轴
          function drawLeftYAxis() {
            yLeftAxis = d3.axisLeft(yScale)

            canvas
              .append('g')
              .attr('class', 'y-left-axis')
              .attr('transform', `translate(${0},${0})`)
              .call(yLeftAxis)
          }
          let xGroups
          let xAxis
          // 画X轴
          function drawXAxis() {
            xAxis = d3.axisBottom(xScale).tickSize(0).tickPadding(10)
            xGroups = canvas
              .append('g')
              .attr('class', 'x-axis')
              .attr('transform', `translate(${0},${maxd})`)

            xGroups.call(xAxis)
            xGroups.attr('clip-path', 'url(#bar-clip-path)')
            d3.selectAll('.ids__tag_mark_ana__svg .x-axis .tick text')
              .attr('fill', function (d, i) {
                if (i % 4 != 0) {
                  return 'transparent'
                }
                return '#666'
              })
              .attr('x', -46)
              .attr('y', 10)
              .style('font-size', '14px')
              .style('transform', 'rotate(-30deg)')
          }
          const translateReg = /translate\(([\d\.\-]+),([\d]+)\)/
          const visibleRange = width - marginLeft - marginRight
          function formatTime(dateTime) {
            const year = dateTime.getFullYear()
            let month = dateTime.getMonth() + 1
            month = month < 10 ? `0${month}` : month
            let date = dateTime.getDate()
            date = date < 10 ? `0${date}` : date
            return `${year}-${month}-${date}`
          }

          function getNext7DateTime(startTime) {
            let testDate = new Date(startTime)
            testDate.setDate(testDate.getDate() + 7)
            const next7Date = formatTime(testDate)
            return next7Date
          }
          function getVisiableAxis(startTime, endTime) {
            let needDelDay = []
            let next7Day = startTime
            needDelDay.push(next7Day)
            while (next7Day != endTime) {
              next7Day = getNext7DateTime(next7Day)

              needDelDay.push(next7Day)
            }
            needDelDay.forEach((ftime) => {
              drawGroupRect(ftime)
            })
            return
            d3.selectAll('.ids__tag_mark_ana__svg .x-axis .tick').filter(
              function (d, i) {
                const curTransform = d3.select(this).attr('transform')
                const regRe = transformReg.exec(curTransform)
                // console.log('regRe is ',regRe)
                if (regRe) {
                  const tickX = regRe[1]

                  if (tickX > 0 && tickX < visibleRange) {
                    let text = d3.select(this).select('text').text()
                    drawGroupRect(text)
                  }
                }
              },
            )
          }
          function scaleBandInvert(scale) {
            var domain = scale.domain()
            var paddingOuter = scale(domain[0])
            var eachBand = scale.step()
            return function (value) {
              var index = Math.floor((value - paddingOuter) / eachBand)
              return domain[Math.max(0, Math.min(index, domain.length - 1))]
            }
          }
          function addZoom() {
            // the zooming & panning
            const zoom = d3
              .zoom()
              // .translateExtent([
              //   [-200, 0],
              //   [width, height],
              // ])
              // .translateExtend([[0,0],[1000,400]])
              // here you can limit the min/max zoom. In this case it cannot shrink by more than half the size
              .scaleExtent([scaleMin, scaleMax])
              .on('zoom', () => {
                const transform = d3.event.transform
                // the scaling/zooming factor: scaleFactor = 2 means double the size
                const scaleFactor = transform.k
                // the x offset of the bars after zooming and panning (this depends on the x position of the cursor when zooming)
                const xOffset = transform.x
                // horizontally move and then scale the bars
                zoomGroups.attr(
                  'transform',
                  `translate(${xOffset} 0) scale(${scaleFactor} 1)`,
                )

                // also update the viewport range of the x axis
                xScale.range([xOffset, width * scaleFactor + xOffset])
                xGroups.call(xAxis)
                const startTime = scaleBandInvert(xScale)(0)
                const endTime = scaleBandInvert(xScale)(
                  width - marginLeft - marginRight,
                )
                console.log('startTime is ', startTime)
                console.log('endTime is ', endTime)
                getVisiableAxis(startTime, endTime)
                d3.selectAll('rect.ids__mark_ana__rect')
                  .on('mouseenter', null)
                  .on('mousemove', null)
                  .on('mouseleave', null)
                addEvent()
              })

            // listen for zoom events on the entire drawing
            svg.call(zoom)
            svg.call(zoom.scaleTo, 15)
          }

          function addDefs() {
            const defs = svg.append('defs')
            const barClipPath = defs
              .append('clipPath')
              .attr('id', 'bar-clip-path')
              .append('rect')
              .attr('x', 0)
              .attr('y', 0)
              .attr('width', width)
              .attr('height', height)
          }
          //画线
          function drawRedLine() {
            canvas
              .selectAll('.ids__tag_mark_ana__svg .y-left-axis .tick')
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
            const barsGroup = canvas
              .append('g')
              .attr('class', 'ids__bars')
              .attr('clip-path', 'url(#bar-clip-path)')
            zoomGroups = barsGroup.append('g').attr('class', 'ids__zoom')
          }
          let barGroups
          function drawSingleRect(options, index) {
            const temp = xScale.bandwidth()
            const { xPos, yPos, key } = options
            const color = colorArr[index]
            const bandWidth = xScale.bandwidth()
            if (options.height == 0) {
              return
              console.log('height is ', options.height)
            }
            barGroups
              .append('rect')
              .attr('class', 'ids__mark_ana__rect')
              .attr('x', (d) => xPos)
              .attr('y', yPos)
              .attr('width', options.barWidth)
              .attr('height', options.height)
              .attr('fill', color)
              .attr('key', key)
              .attr('index', 1)
          }

          let mouseEnterIdx = -1
          function addEvent() {
            d3.selectAll('rect.ids__mark_ana__rect')
              .on('mouseenter', function (e) {
                const target = d3.event.target
                const ftime = target && target.getAttribute('key')
                const targetItem = chartData.values.filter(
                  (item) => item.ftime == ftime,
                )
                const idx = chartData.values.findIndex(
                  (item) => item.ftime == ftime,
                )
                mouseEnterIdx = idx
                createTooltip(targetItem[0])

                const fff = `mask_rect_${idx}`

                d3.select(`.${fff}`).attr('fill-opacity', 0.5)
              })
              .on('mousemove', function (params) {
                createTooltip()
              })
              .on('mouseleave', function () {
                const fff = `mask_rect_${mouseEnterIdx}`

                d3.select(`.${fff}`).attr('fill-opacity', 0)
                removeTooltip()
                mouseEnterIdx = -1
              })
          }
          function removeTooltip() {
            const tooltipDom = document.querySelector('.ids__mark_ana__tooltip')

            tooltipDom.remove()
            // document.getElementById('.ai_ids__container').removeChild(tooltipDom)
            tooltip = null
          }
          let tooltip
          function createTooltip(dataItem) {
            let offsetX = event.pageX + 20
            let offsetY = event.pageY
            if (!tooltip) {
              //添加tooltip
              tooltip = d3
                .select('body')
                .append('div')
                .attr('class', 'ids__mark_ana__tooltip')
                .style('left', `${offsetX}px`)
                .style('top', `${offsetY}px`)
              const { ftime, tags } = dataItem
              tooltip.append('div').attr('class', 'time').text(ftime)

              tags.forEach((tag, idx) => {
                const row = tooltip
                  .append('div')
                  .attr('class', `content content_${idx}`)
                row.append('label').text(`${tag.name}：`)
                row.append('span').text(Number(tag.value).toFixed(2))
              })
            } else {
              tooltip.style('left', `${offsetX}px`).style('top', `${offsetY}px`)
            }
          }

          drawLeftYAxis()

          addDefs()
          drawRedLine()
          createGroup()
          drawXAxis()
          const re = d3
            .select('.ids__tag_mark_ana__svg .x-axis .tick')
            .attr('transform')
          const transformReg = /translate\(([\d|\.]+),([\d]+)\)/
          const regResult = transformReg.exec(re)
          console.log('regResult is ', regResult)
          let firstX = 0
          if (regResult) {
            firstX = regResult[1]
          }

          let temp_testData = JSON.parse(JSON.stringify(chartData.values))
          let bandWidth = xScale.bandwidth()
          let barWidth = bandWidth / 4
          if (!barGroups) {
            barGroups = zoomGroups
              .selectAll('g.bar')
              .data(temp_testData)
              .enter()
              .append('g')
              .attr('class', 'bar')
          }
          function drawMaskRect(item, index, ftime, xPos) {
            // let xPos=firstX - (-(xScale.bandwidth() * index)) - 1 - bandWidth / 4 - 10
            barGroups
              .append('rect')
              .attr('class', `ids__mark_ana__mask_rect mask_rect_${index}`)
              .attr('x', (d) => xPos)
              .attr('y', 0)
              .attr('width', barWidth * 2 + barWidth / 5)
              .attr('height', height - marginTop - marginBottom)
              .attr('fill', '#d9d9d9')
              .attr('fill-opacity', 0)
              .attr('key', ftime)
          }

          temp_testData.forEach((item, index) => {
            // console.log('item is ',item)
            const { ftime, tags } = item
            let xPos =
              firstX - -(xScale.bandwidth() * index) - 1 - bandWidth / 4
            drawMaskRect(item, index, ftime, xPos)

            let total = tags.filter(
              (it) => it.id == 'y' || it.id == 'factvalue',
            )[0]
            drawTotalRect(
              [
                {
                  ftime,
                  value: total.value,
                },
              ],
              xPos,
              ftime,
            )
          })
          //记录渲染过的第二组柱子
          let exitDomMap = {}
          function drawTotalRect(data, xPos, ftime) {
            // const bandWidth=xScale.bandwidth()
            let barWidth = bandWidth / 4
            const h = yScale(0) - yScale(data[0].value)
            if (h < 0) {
              console.log('h is ', h)
            }
            let newTime = ftime.replace(/\-/g, '')
            const cls = `ids__mark_ana__rect total_rect_${newTime}`
            barGroups
              .append('rect')
              .attr('class', cls)
              .attr('x', (d) => xPos)
              .attr(
                'y',

                yScale(data[0].value),
              )
              .attr('key', ftime)
              .attr('index', 0)
              .attr('width', barWidth)
              .attr('height', yScale(0) - yScale(data[0].value))
              .attr('fill', totalColor)
          }

          //堆叠柱状图
          function drawOtherRects(obj, xPos, barWidth) {
            const { ftime, tags } = obj
            let newTags = tags.filter(
              (item) => item.id != 'factvalue' && item.id != 'y',
            )
            let positiveYOffset = 0
            let negativeYOffset = 0
            newTags.sort((a, b) => {
              return a.value - b.value
            })

            newTags.forEach((item) => {
              item.xPos = xPos
              item.key = ftime
              item.barWidth = barWidth
              if (item.value > 0) {
                item.yPos = yScale(item.value) - positiveYOffset
                item.height = yScale(0) - yScale(item.value)
                positiveYOffset += item.height
              } else {
                item.height = yScale(item.value) - yScale(0)

                item.yPos = yScale(0) + negativeYOffset

                negativeYOffset += item.height
              }
            })
            newTags.forEach((item, index) => {
              if (item.height >= 0) {
                drawSingleRect(item, index)
              }
            })
          }

          //画第二组圆
          function drawGroupRect(ftime) {
            let newTime = ftime.replace(/\-/g, '')

            if (exitDomMap.hasOwnProperty(newTime)) {
              return
            }
            let targetRectCls = `.total_rect_${newTime}`

            const targetData = temp_testData.filter(
              (item) => item.ftime == ftime,
            )
            if (targetData.length == 0) return
            const d3Target = d3.select(targetRectCls)
            const xPost = d3Target.attr('x')
            // const yPost=d3Target.attr('y')
            const width = -d3Target.attr('width')

            const dddWidth = xPost - width + barWidth / 5
            drawOtherRects(targetData[0], dddWidth, -width)
            exitDomMap[newTime] = true
          }
          addZoom()
          //legend 起始位置计算
          let allLegendLen = 0
          temp_testData[0].tags.forEach((item) => {
            let textLen = item.name.length * 14

            let itemLen = 15 + textLen + 20 // 15 为rect 10 为下一个间距
            allLegendLen += itemLen
          })
          function drawAllLegends() {
            let COUNT = 6
            let startX = (width - marginLeft - marginRight - allLegendLen) / 2
            let legendG = svg
              .append('g')
              .attr('class', 'ids__legend')
              .attr('transform', `translate(${50 - -marginLeft},0)`)
            let allLegends = temp_testData[0].tags
            let rowGLen = Math.ceil(allLegends.length / COUNT)

            for (let i = 0; i < rowGLen; i++) {
              const wrapperG = legendG
                .append('g')
                .attr('class', `ids__legend_${i}`)
                .attr('transform', `translate(0,${i * 20})`)
              let start = i * COUNT
              const legendArr = allLegends.slice(start, start + COUNT)

              let xPos = 0
              legendArr.forEach((legend, idx) => {
                const colorIdx = i * COUNT + idx
                const color = colorArr[colorIdx]
                let text = legend.name
                if (text.length > 6) {
                  text = text.substring(0, 6) + '...'
                }
                drawLegendRect(color, i, text, xPos, wrapperG)
                xPos += text.length * 14 + 20 + 15
              })
            }
          }
          drawAllLegends()
          function drawLegendRect(color, i, textStr, xPos, legendG) {
            legendG
              .append('rect')
              .attr('x', xPos)
              .attr('y', 11)
              .attr('width', 15)
              .attr('height', 15)
              .attr('rx', 2)
              .attr('fill', color)

            legendG
              .append('text')
              .attr('x', xPos + 20)
              .attr('y', 22)
              .text(textStr)
              .attr('transform', 'translate(0,1)')
              .attr('font-size', 14)
          }

          function drawText(options) {
            const { text, attrs, styles } = options
            const textSvg = svg.append('text').text(text)

            attrs.forEach((item) => {
              textSvg.attr(item.name, item.value)
            })
          }
          drawText({
            attrs: [
              {
                name: 'x',
                value: 20,
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
            text: '标注分析',
          })
          drawText({
            attrs: [
              {
                name: 'x',
                value: 20,
              },
              {
                name: 'y',
                value: 40,
              },
              {
                name: 'fill',
                value: '#999',
              },
            ],

            text: '（销售数量）',
          })
          addEvent()
        },
        mounted() {},
      },
    ],
  }
})()
