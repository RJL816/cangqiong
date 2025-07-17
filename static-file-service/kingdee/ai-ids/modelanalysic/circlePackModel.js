// circlr-pack  圆圈图
window.ai_ids = window.ai_ids || {}

window.IDS_TemplateData1 = window.ai_ids[
  'saleContribute_circlePack_template'
] = (function () {
  return {
    showDepth: 3, //圆圈图展示多少级的圆圈
    curMaxDepth: 0,
    displayRoot: null,
    seriesData: [],
    copySourceDisplayRoot: null,
    nodeKeys: [], //记录当前渲染的nodeKeys
    dFlag: 'enter', //d3 data 模式
    circlePaths: [{ name: '全部', id: 'all', depth: 0 }], //点击圆圈路径
    getCurSeriesData: function () {
      let nodeKeys = ai_ids['saleContribute_circlePack_template'].nodeKeys
      let seriesData = ai_ids[
        'saleContribute_circlePack_template'
      ].seriesData.slice(0)
      // console.log('original series data is ', seriesData)
      // let curMaxDepth =
      //   ai_ids['saleContribute_circlePack_template'].curMaxDepth || 2
      // // if (curMaxDepth == 2) {
      // //   return seriesData
      // // }
      // console.log('qhx curMaxDepth is ', curMaxDepth)
      // let temp = seriesData.filter((item) => item.depth <= curMaxDepth)
      // console.log('qhx temp is ', temp)
      // return temp
      return seriesData
    },
    findTargetNode: function (
      { id, parentId, depth, parentValue },
      targetDepth,
    ) {
      let seriesData = ai_ids['saleContribute_circlePack_template'].seriesData
      let result
      function recureFindNode(options) {
        const { parentId, parentValue } = options
        // debugger
        let targetSeries = seriesData.filter(
          (node) => node.id == parentId && node.value == parentValue,
        )
        if (targetSeries && targetSeries.length > 1) {
          console.error('不止查找到一个结果!')
          return
        } else if (targetSeries) {
          let temp = targetSeries[0]
          const { id, depth, parentId, parentValue } = temp
          if (depth == targetDepth) {
            result = temp
            return
          } else if (targetDepth < depth) {
            recureFindNode({ parentValue, parentId })
          }
        }
      }

      recureFindNode({ parentId, parentValue })

      // console.log('qhx target series is ', targetSeries)
      // debugger
      // let target = ai_ids['saleContribute_circlePack_template'].displayRoot
      //   .descendants()
      //   .filter((node) => node.data.id == parentId)
      // if (target.length > 0) {
      //   target = target[0]
      // }
      return [result]
    },
    //路径指示器点击事件
    handlePathClick: function (params) {
      // debugger
      let circlePaths = ai_ids['saleContribute_circlePack_template'].circlePaths
      if (circlePaths.length == 0) return
      console.log('params iis ', params)
      const { id, name, value } = params
      let test1 = {
        depth: 1,
        id: '1.01.01',
        key: '1.01.014270976.58',
        name: '北京营业部',
        parentId: 'all',
        parentValue: 46600316.09999999,
        value: 4270976.58,
      }
      let test2 = {
        depth: 2,
        id: '30117',
        key: '301172077684.47',
        name: '北京住居天津分仓',
        parentId: '1.01.01',
        parentValue: 4270976.58,
        value: 2077684.47,
      }
      // if()
      //点击当前项
      // if (circlePaths[circlePaths.length - 1].id == id) {
      //   return
      // }
      const idx = circlePaths.findIndex((item) => item.id == id)
      if (idx > -1) {
        ai_ids[
          'saleContribute_circlePack_template'
        ].circlePaths = circlePaths.slice(0, idx + 1)
        ai_ids['saleContribute_circlePack_template'].dFlag = 'exit'
        ai_ids['saleContribute_circlePack_template'].drawPath()
        ai_ids['saleContribute_circlePack_template'].drillDown(
          {
            data: params,
          },
          false,
        )
        let chartEl = ai_ids.setting.getChartInstanceByKey(
          'saleContribute_circlePack',
        )
        let seriesData = ai_ids[
          'saleContribute_circlePack_template'
        ].getCurSeriesData()
        // chartEl.clear()
        // let chartOption = chartEl.getOption()
        // chartOption.dataset = {
        //   source: seriesData,
        // }
        // chartEl.setOption(chartOption)
        chartEl.setOption({
          dataset: {
            source: seriesData, //ai_ids['saleContribute_circlePack_template'].seriesData,
          },
        })
      }
    },
    isExitInPaths: function (id, value) {
      let circlePaths = ai_ids['saleContribute_circlePack_template'].circlePaths
      let idx = circlePaths.findIndex(
        (item) => item.id == id && item.value == value,
      )
      return idx > -1
    },
    //按照点击轨迹添加路径
    addCirclePaths: function (params) {
      const { id, name, depth, value } = params
      if (
        !ai_ids['saleContribute_circlePack_template'].isExitInPaths(id, value)
      ) {
        ai_ids['saleContribute_circlePack_template'].circlePaths.push({
          id,
          name,
          depth,
          value,
        })
        ai_ids['saleContribute_circlePack_template'].dFlag = 'enter'
      }
    },
    drawPath: function () {
      try {
        let circlePaths =
          ai_ids['saleContribute_circlePack_template'].circlePaths
        let dFlag = ai_ids['saleContribute_circlePack_template'].dFlag
        const pathWrapper = d3.select('div.ai_ids__circle-path')

        if (dFlag == 'enter') {
          d3.select('div.ai_ids__circle-path')
            .selectAll('span')
            .data(circlePaths)
            .enter()
            .append('span')
            .attr('class', 'ai-ids__path-node')
            .text(function (d) {
              return d.name
            })
            .on(
              'click',
              ai_ids['saleContribute_circlePack_template'].handlePathClick,
            )
        } else if (dFlag == 'exit') {
          d3.selectAll('.ai-ids__path-node').data(circlePaths).exit().remove()
        }
      } catch (ex) {
        console.log('circlePackMode drawPath ex is ', ex)
      }
    },
    overallLayout: function (params, api) {
      let displayRoot = ai_ids['saleContribute_circlePack_template'].displayRoot
      // console.log('overAllLayout is ', displayRoot)
      var context = params.context
      // let temp = ai_ids['saleContribute_circlePack_template'].getCurSeriesData()
      d3
        .pack()
        .size([api.getWidth() - 2, api.getHeight() - 2])
        .padding(3)(displayRoot)
      context.nodes = {}
      displayRoot.descendants().forEach(function (node, index) {
        // console.log('node is ', node)
        const {
          data: { id, name },
          value,
          key,
        } = node
        // console.log('name is ', name)
        // context.nodes[id] = node
        // if (!temp.includes(key)) {
        //   console.error('key is ', key)
        // }
        context.nodes[key] = node
      })
      // console.log('overallLayout context data is ', context.nodes)
    },
    //预处理数据
    preDealData: function () {
      function recursionVerify(arr) {
        arr.forEach((item) => {
          let { value, name, id, children } = item
          // item.id = `${id}${Math.random(1, 2000)}`
          // item.id = id.replace(/\.|\-|\$\_/g, '')
          if (value && children && children.length > 0) {
            //   console.error('要删除该节点的value', name)

            delete item.value
          } else {
            let newVal = value && Number(value).toFixed(2)
            newVal = parseFloat(newVal)
            //   console.log('newvalis ', newVal)
            item.value = newVal
          }
          if (children) {
            recursionVerify(children)
          }
        })
      }
      //过滤掉id中的特殊字符
      function removeSpecial(obj) {
        recursionVerify([obj])
      }
      removeSpecial(params.sourceData)
    },
    stratify: function (sourceData) {
      if (!sourceData) {
        sourceData = ai_ids.setting.getChartDataByKey(
          'saleContribute_circlePack',
        )
        function recursionVerify(arr) {
          arr.forEach((item) => {
            let { value, name, id, children } = item
            // item.id = `${id}${Math.random(1, 2000)}`
            // item.id = id.replace(/\.|\-|\$\_/g, '')
            if (value && children && children.length > 0) {
              //   console.error('要删除该节点的value', name)

              delete item.value
            } else {
              let newVal = value && Number(value).toFixed(2)
              newVal = parseFloat(newVal)
              //   console.log('newvalis ', newVal)
              item.value = newVal
            }
            if (children) {
              recursionVerify(children)
            }
          })
        }
        //过滤掉id中的特殊字符
        function removeSpecial(obj) {
          if (obj.id == 0) {
            obj.id = 'all'
          }
          recursionVerify([obj])
        }
        removeSpecial(sourceData)
      }
      ai_ids['saleContribute_circlePack_template'].displayRoot = d3
        .hierarchy(sourceData)
        .sum(function (d) {
          return d.value || 0
          // return d.value && parseFloat(d.value.toFixed(2))
        })
        .sort((a, b) => a.value - b.value)
      // return displayRoot
      // if (!sourceData) {
      //   ai_ids[
      //     'saleContribute_circlePack_template'
      //   ].copySourceDisplayRoot = JSON.parse(JSON.stringify(displayRoot))
      // }
    },
    drillDown: function (params, need) {
      // debugger
      // console.log('drillDown params is ', params)
      ai_ids['saleContribute_circlePack_template'].stratify()
      if (params && params.data.id != 'all') {
        let targetNodeId = params.data.id
        let curDepth = params.data.depth
        let value = params.data.value

        ai_ids['saleContribute_circlePack_template'].decideDepth(
          ai_ids['saleContribute_circlePack_template'].displayRoot,
          curDepth,
        )
        ai_ids['saleContribute_circlePack_template'].displayRoot = ai_ids[
          'saleContribute_circlePack_template'
        ].displayRoot
          .descendants()
          .find(function (node) {
            return node.data.id === targetNodeId && node.value == value
          })
      } else {
        ai_ids['saleContribute_circlePack_template'].decideDepth(
          ai_ids['saleContribute_circlePack_template'].displayRoot,
          0,
        )
      }

      // A trick to prevent d3-hierarchy from visiting parents in this algorithm.
      ai_ids['saleContribute_circlePack_template'].displayRoot.parent = null
      console.log(
        'drillDown displayRoot',
        ai_ids['saleContribute_circlePack_template'].displayRoot,
      )

      let tempSeriesData = ai_ids[
        'saleContribute_circlePack_template'
      ].getCurSeriesData()
      let chartEl = ai_ids.setting.getChartInstanceByKey(
        'saleContribute_circlePack',
      )
      console.log('heisdkfjlsdf', tempSeriesData)
      if (need === false) return
      chartEl.setOption({
        dataset: {
          source: tempSeriesData,
        },
      })
    },
    renderItem: function (params, api) {
      let curMaxDepth =
        ai_ids['saleContribute_circlePack_template'].curMaxDepth || 2
      var context = params.context
      // console.log('params is ', context)
      // Only do that layout once in each time `setOption` called.
      if (!context.layout) {
        context.layout = true
        ai_ids['saleContribute_circlePack_template'].overallLayout(params, api)
      }
      var nodePath = api.value('key')

      var node = context.nodes[nodePath]

      // console.log('nodePath si ' + nodePath, node)
      if (!node) {
        // Reder nothing.
        return
      }
      // const { depth } = node
      // if (depth > curMaxDepth) return
      // var isLeaf = !node.children || !node.children.length
      // var focus = new Uint32Array(
      //   node.descendants().map(function (node) {
      //     return node.data.index
      //   }),
      // )

      // var nodeName = node.depth == curMaxDepth || isLeaf ? node.data.name : ''
      var nodeName = node.data.name
      if (!node.parent) {
        nodeName = ''
      }
      if (node.parent && node.children && node.children.length > 0) {
        nodeName = ''
      }
      if (!nodeName) {
      }

      var z2 = api.value('depth') * 2
      return {
        type: 'circle',
        focus: focus,
        shape: {
          cx: node.x,
          cy: node.y,
          r: node.r,
        },
        transition: ['shape'],
        z2: z2,
        textContent: {
          type: 'text',
          style: {
            // transition: isLeaf ? 'fontSize' : null,
            text: nodeName, //node.data.showName ? node.data.name : '',
            fontFamily: 'Arial',
            width: node.r * 2,
            overflow: 'truncate',
            fontSize: node.r / 6,
          },
          // emphasis: {
          //   style: {
          //     overflow: null,
          //     opacity: 0.9,

          //   },
          // },
        },
        textConfig: {
          position: 'inside',
        },
        style: {
          fill: api.visual('color'),
        },
        emphasis: {
          focus: 'series',
          style: {
            fontFamily: 'Arial',
            fontSize: 12,
            shadowBlur: 20,
            shadowOffsetX: 3,
            shadowOffsetY: 5,
            shadowColor: 'rgba(0,0,0,0.2)',
            opacity: 0.2,
          },
        },
      }
    },
    //决定展示多少深度的数据
    decideDepth: function (displayRoot, initDepth) {
      let maxDepth =
        initDepth + ai_ids['saleContribute_circlePack_template'].showDepth - 1
      ai_ids['saleContribute_circlePack_template'].curMaxDepth = maxDepth
      let nodeKeys = []
      displayRoot.descendants().forEach((node) => {
        const { depth, value, data } = node
        if (depth == maxDepth) {
          node.children = null
        }
        if (depth >= initDepth && depth <= maxDepth) {
          node.data.showName = false
          node.key = `${node.data.id}${node.value}`

          // node.data.value = value
          nodeKeys.push(node.key)
        }
        if (depth == maxDepth) {
          node.data.showName = true
        }
      })
      ai_ids['saleContribute_circlePack_template'].displayRoot = displayRoot
      ai_ids['saleContribute_circlePack_template'].nodeKeys = nodeKeys
    },
    templateData: [
      {
        chartKey: 'saleContribute_circlePack',
        viewType: 'chart',
        chartTitle: {
          text: '',
          bottom: '0',
          left: '40%',
        },
        chartStyle: {
          // width:'80px',
          // height:'500px'
        },
        series: {
          type: 'circlePack',
          progressive: 0,
          coordinateSystem: 'none',
          encode: {
            tooltip: 'value',
            itemName: 'id',
          },

          beforeMount: function (params) {
            let containerId = ai_ids.setting.getChartContainerByKey(
              'saleContribute_circlePack',
            )
            // containerId = 'ids__modelAna_container' //ids__modelAna_container
            d3.select('#' + containerId)
              .insert('div')
              .attr('class', 'ai_ids__circle-path')
              .append('label')
              .attr('class', 'ai_ids__circle-path-label')
              .text('结构：')

            ai_ids['saleContribute_circlePack_template'].drawPath()
          },
          reRenderChart: function (params) {
            const { chartData, chartEl } = params
            // console.log('reRenderChart parmas is ', params)
            let chartOptions = chartEl.getOption()
            //调用updateOptions
            window.ai_ids[
              'saleContribute_circlePack_template'
            ].templateData[0].series.updateOption({
              sourceData: chartData,
              chartOptions,
            })
            ai_ids['saleContribute_circlePack_template'].circlePaths = [
              { name: '全部', id: 'all', depth: 0 },
            ]
            ai_ids['saleContribute_circlePack_template'].dFlag = 'exit'
            ai_ids['saleContribute_circlePack_template'].drawPath()
            chartEl.clear()
            chartEl.setOption(chartOptions)
          },
          //确定最终的chart options
          updateOption: function (params) {
            const { sourceData, chartOptions } = params
            ai_ids['saleContribute_circlePack_template'].stratify()
            let displayRoot =
              ai_ids['saleContribute_circlePack_template'].displayRoot
            let seriesData = []
            function each(arr) {
              arr.forEach((item) => {
                // debugger
                const {
                  children,
                  data: { id, name },
                  value,
                  depth,
                } = item
                let singleItem = {
                  id,
                  name,
                  value,
                  depth,
                  key: `${id}${value}`, //id == 'all' ? value : `${id}_${value}`,
                }
                let parent = item.parent
                if (parent) {
                  singleItem.parentId = parent.data.id
                  singleItem.parentValue = parent.value
                }
                seriesData.push(singleItem)
                if (children) {
                  each(children)
                }
              })
            }
            // const displayRoot=displayRoot
            function prepareData(data) {
              const beginArr = [data]
              each(beginArr, '')
            }
            prepareData(displayRoot)
            //只取前三层depth的数据
            ai_ids['saleContribute_circlePack_template'].decideDepth(
              displayRoot,
              0,
            )

            // console.log(
            //   'qhx seriesdata is ',
            //   ai_ids['saleContribute_circlePack_template'].curMaxDepth,
            // )
            ai_ids['saleContribute_circlePack_template'].seriesData = seriesData
            let tempSeriesData = ai_ids[
              'saleContribute_circlePack_template'
            ].getCurSeriesData()
            // let curMaxDepth =
            //   ai_ids['saleContribute_circlePack_template'].curMaxDepth
            // seriesData = seriesData.filter((item) => item.depth <= curMaxDepth)
            // ai_ids['saleContribute_circlePack_template'].seriesData = seriesData
            // console.log('qhx seriesdata is ', seriesData)
            chartOptions.dataset = {
              source: tempSeriesData,
            }
            chartOptions.visualMap = [
              {
                show: false,
                min: 0,
                max: 3,
                dimension: 'depth',
                inRange: {
                  color: ['#096DD9', '#E6F7FF'], //['#4465EB', '#F0F5FF'],  #E6F7FF
                  // color: ['#006edd', '#e0ffff'],
                },
              },
            ]
            //   hoverLayerThreshold: Infinity,
            chartOptions.hoverLayerThreshold = Infinity

            chartOptions.series.type = 'custom'
            chartOptions.series.renderItem =
              ai_ids['saleContribute_circlePack_template'].renderItem
            ;(chartOptions.tooltip = {
              formatter: function (params) {
                const {
                  data: { name, value },
                } = params

                return (
                  '<div><label>' +
                  name +
                  '：</label><span>' +
                  value.toFixed(2) +
                  '</span></div>'
                )
              },
            }),
              delete chartOptions.xAxis
            delete chartOptions.yAxis
          },
          //图形生命周期
          mounted: function (sourceData, chartEl) {
            console.log('mounted!!!!!!')
          },
        },
        bindEvent: {
          eventName: 'click',
          eventFn: function (params) {
            // debugger
            // 备注，点击圆的时候，要确保是逐层往下钻取得，不能跨层  比如当前是0层(全部),不论点击圆的哪个位置，下一层只能是1
            // console.log('new click is ', params)
            const {
              chartEventObj: {
                value: { id, name, depth, parentId, parentValue, value },
              },
            } = params
            let { chartEventObj, chartEl } = params
            if (name == '全部') {
              return
            }
            // if (depth >= 5) {
            //   console.error('超过可以点击的层次!')
            //   return
            // }
            let initDepth = 0
            let clickParams = {}
            let circlePaths =
              ai_ids['saleContribute_circlePack_template'].circlePaths
            if (circlePaths.length > 0) {
              //做个判断，只能逐层往下钻取数据
              let curDepth = circlePaths[circlePaths.length - 1]
              curDepth = curDepth && curDepth.depth //当前层数
              initDepth = curDepth + 1 //下一层的depth

              if (depth == curDepth) {
                clickParams = null
                return
              }

              if (initDepth != depth) {
                // let target = ai_ids[
                //   'saleContribute_circlePack_template'
                // ].displayRoot
                //   .descendants()
                //   .filter((node) => node.data.id == id)
                if (initDepth - depth == 1 && depth == 4) {
                  clickParams = null
                  console.log('达到下钻层级最大!')
                  return
                }
                let target = ai_ids[
                  'saleContribute_circlePack_template'
                ].findTargetNode(
                  { id, parentId, depth, parentValue },
                  initDepth,
                )
                if (target.length > 0) {
                  target = target[0]
                  if (target.depth != initDepth) {
                    console.error('数据有问题!')
                    return
                  }
                  const { id, name, depth, value } = target
                  console.error('qhx name is ', depth)
                  // if (depth + 2 >= 5) {
                  //   console.error('超过可以点击的层次!')
                  //   clickParams = null
                  //   return
                  // }
                  chartEventObj.data = { id, name, depth, value }
                  clickParams = {
                    id,
                    name,
                    depth,
                    value,
                  }
                }
              } else {
                if (depth > 3) {
                  console.error('超过可以点击的层次!')
                  clickParams = null
                  return
                }
                clickParams = {
                  id,
                  name,
                  depth,
                  value,
                }
              }
            }
            if (clickParams == null) return
            // if (depth == 4) {
            //   console.error('最大层级5层')
            //   return
            // }

            ai_ids['saleContribute_circlePack_template'].drillDown(
              chartEventObj,
            )
            ai_ids['saleContribute_circlePack_template'].addCirclePaths(
              clickParams,
            )
            ai_ids['saleContribute_circlePack_template'].drawPath()
          },
        },
      },
    ],
  }
})()
