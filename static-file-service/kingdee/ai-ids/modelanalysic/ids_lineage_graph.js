/**
 * 血缘关系图
 */
window.ai_ids = window.ai_ids || {}
ai_ids['ids_lineage_graph_template'] = (function () {
  return {
    width: 0,
    containerId: 'customcontrolapsankey', //苍穹：customcontrolapsankey 本地：ids__modelAna_container
    containerWidth: '',
    svg: null,
    mode: -1, // 浏览模式  -1：全览模式   0：点击第一层的模式（看某个客户或仓库的详情） 1:点击第二层的模式（看某个物料分组的详情）
    graph: null,
    preClickNode: null, // 用来记录点亮的节点
    preClickNodeEdges: [], //用来记录点亮的边
    relativeNodes: [],
    containerHAndW: null,
    templateData: [
      {
        chartKey: 'ids_lineage_graph',
        viewType: 'd3chart',
        chartTitle: {
          text: '',
          bottom: '0',
          left: '40%',
        },
        beforeMount(options) {
          const prefixCls = 'ids_lineage_graph'
          // const LINE_LIGHT_COLOR = '#5582F3' // 点亮边的颜色
          const LINE_LIGHT_COLOR = 'rgb(242, 115, 181)'
          const LINE_NORMAL_COLOR = '#E6E6E6'
          let canLight = false
          let chartData = options.chartData

          let pageId = options.pageId
          const uniqueCode = options.uniqueCode
          const containerId = 'ai_ids_lineage_graph' //`ids_modelanalysic_${uniqueCode}`
          let isCangQiong = IDS_ModelAna_Utils.isCangQiong()
          //清除/渲染  空提示
          // chartData.graphData = testData // 接入测试数据
          if (!chartData.graphData || chartData.graphData.length == 0) {
            ai_ids.svgHelper.renderEmpty(d3.select(`#${containerId}`))
            return
          } else {
            ai_ids.svgHelper.clearEmpty(d3.select(`#${containerId}`))
          }
          let graph = null
          let graphData = chartData.graphData
          let selectedTable = chartData.selectedTable
          let nodes = []
          let edges = []
          if (selectedTable) {
            // lightNode()
            console.log('xuanz')
            canLight = true
            if (ai_ids['ids_lineage_graph_template'].graph) {
              graph = ai_ids['ids_lineage_graph_template'].graph
              let targetNode = ai_ids['ids_lineage_graph_template'].graph
                .getNodes()
                .filter((node) => node._cfg.model.label == selectedTable)
              lightNode(targetNode[0])
            }
            canLight = false
            return
          }
          d3.select(`#${containerId}`)
            .style('height', '98%')
            .style('overflow', 'hidden')
            // .attr('pageId', pageId)
            .append('div')
            .attr('id', 'idslineagecontainer')

          graphData.forEach(function (item) {
            const { uniqueId, dependsOn, tblName, nodeType, tblType } = item
            // const {
            //   unique_id: uniqueId,
            //   depends_on: dependsOn,
            //   name: tblName,
            //   language: nodeType,
            //   resource_type: tblType,
            // } = item // 接入测试数据
            nodes.push({
              id: uniqueId,
              label: tblName,
              tblType,
              nodeType,
              anchorPoints: [
                [0, 0.5],
                [1, 0.5],
              ],
            })
            if (dependsOn && dependsOn.length > 0 && Array.isArray(dependsOn)) {
              // console.log("depends_on is ", d3.curveBasis);
              dependsOn.forEach((i) => {
                edges.push({
                  source: i,
                  target: uniqueId,
                  shape: 'cubic-horizontal',
                  // 该边连入 source 点的第 0 个 anchorPoint，
                  sourceAnchor: 1,
                  // 该边连入 target 点的第 0 个 anchorPoint，
                  targetAnchor: 0,
                })
              })
            }
          })

          //   testData.forEach(function (item) {
          //     const { unique_id, depends_on, name } = item
          //     nodes.push({
          //       id: unique_id,
          //       label: name,
          //     })
          //     if (
          //       depends_on &&
          //       depends_on.length > 0 &&
          //       Array.isArray(depends_on)
          //     ) {
          //       // console.log("depends_on is ", d3.curveBasis);
          //       depends_on.forEach((i) => {
          //         edges.push({
          //           source: i,
          //           target: unique_id,
          //           shape: 'cubic-horizontal',
          //         })
          //       })
          //     }
          //   })
          console.log('nodes is ', nodes)
          const data = {
            nodes,
            edges,
          }

          const container = document.getElementById('idslineagecontainer')
          const rect = ai_ids.svgHelper.getContainerRect(`#${containerId}`)
          console.log('rect is ', rect)

          const width = rect.width - 30
          const height = rect.height - 20
          console.log('qhx widht is ' + width + ' and height is ', height)
          ai_ids['ids_lineage_graph_template'].graph = graph = new G6.Graph({
            container: 'idslineagecontainer',
            width,
            height,
            fitView: true,
            modes: {
              default: ['drag-canvas', 'drag-node', 'zoom-canvas'],
            },
            layout: {
              type: 'dagre',
              rankdir: 'LR',
              //   align: "UL",
              nodesep: 30,
              ranksep: 300,
              controlPoints: true,
              nodesepFunc: () => 1,
              ranksepFunc: () => 1,
            },
            minZoom: 0.6,
            maxZoom: 4,
            defaultNode: {
              type: 'self-node',
            },
            defaultEdge: {
              type: 'polyline',
              size: 1,
              color: LINE_NORMAL_COLOR,

              style: {
                endArrow: true,
                radius: 2,
                lineWidth: 1,
              },
            },
          })

          graph.on('node:click', function (evt) {
            console.log('evt is ', evt)
            let nodeItem = evt.item
            console.log('evt is ', nodeItem)
            // 清除之前点击的点线效果
            canLight = true
            setTimeout(function () {
              if (canLight) {
                lightNode(nodeItem)
                sendEvent('showTblInfo', nodeItem._cfg.model.label)
                canLight = false
              }
            }, 400)
          })

          function sendEvent(eventName, tableName) {
            let pageId = d3.select(`#${containerId}`).attr('data-page-id')
            console.log('sendEvent pageId is ', pageId)
            if (pageId) {
              let arr = pageId.split(`_${containerId}`)
              console.log('arr is ', arr)
              pageId = arr[0]
            }
            window.IDS_ModelAna_Utils.sendEvent(
              eventName,
              {
                tblName: tableName,
              },
              pageId,
            )
          }
          //根据某个节点，点亮相关边
          function lightNode(nodeItem) {
            clearNodeAndEdges()
            // graph.updateItem(nodeItem, {
            //   style: {
            //     fill: '#88447d',
            //   },
            // })
            //选中节点
            graph.setItemState(nodeItem, 'color', {
              stroke: 'rgb(242, 115, 181)', //"rgba(154,77,255,1)", //getClickedStrokeColor(resource_type, language),
              fill: '#FFF2F4',
              lineWidth: 1,
            }) // 切换选中
            getAllEdges(nodeItem)
            ai_ids['ids_lineage_graph_template'].preClickNodeEdges.forEach(
              (edge) => {
                graph.updateItem(edge, {
                  color: LINE_LIGHT_COLOR,
                  style: {
                    stroke: LINE_LIGHT_COLOR,
                    lineWidth: 1,
                  },
                })
              },
            )
            ai_ids['ids_lineage_graph_template'].preClickNode = nodeItem
          }

          // 获取点击节点所有关联得点和线
          function getClickRelativeNodeAndEdges(nodeItem) {}
          function getStrokeColor(nodeType, tblType) {
            return tblType == 'source'
              ? 'rgba(214,231,246,1)'
              : nodeType == 'sql'
              ? 'rgba(161,230,181,1)'
              : 'rgba(255,231,214,1)'
          }
          function getFillColor(nodeType, tblType) {
            return tblType == 'source'
              ? '#ECF6FF'
              : nodeType == 'sql'
              ? '#F2FFF5'
              : '#FFF8F2'
          }
          function clearNodeAndEdges() {
            if (ai_ids['ids_lineage_graph_template'].preClickNode) {
              //   graph.updateItem(
              //     ai_ids['ids_lineage_graph_template'].preClickNode,
              //     {
              //       style: {
              //         fill: '#0094b3',
              //       },
              //     },
              //   )
              let prenodeType =
                ai_ids['ids_lineage_graph_template'].preClickNode._cfg.model
                  .nodeType
              let pretblType =
                ai_ids['ids_lineage_graph_template'].preClickNode._cfg.model
                  .tblType
              graph.setItemState(
                ai_ids['ids_lineage_graph_template'].preClickNode,
                'color',
                {
                  stroke: getStrokeColor(prenodeType, pretblType),
                  fill: getFillColor(prenodeType, pretblType),
                  lineWidth: 1,
                },
              )
            }
            if (
              ai_ids['ids_lineage_graph_template'].preClickNodeEdges.length > 0
            ) {
              ai_ids['ids_lineage_graph_template'].preClickNodeEdges.forEach(
                (edge) => {
                  graph.updateItem(edge, {
                    style: {
                      stroke: LINE_NORMAL_COLOR,
                      lineWidth: 1,
                    },
                  })
                },
              )
              ai_ids['ids_lineage_graph_template'].preClickNodeEdges = []
            }
          }
          // 获取点击节点所有相关得边
          function getAllEdges(node) {
            let inEdges = node.getInEdges()

            let outEdges = node.getOutEdges()
            ai_ids['ids_lineage_graph_template'].preClickNodeEdges = [
              ...inEdges,
              ...outEdges,
            ]
            getAllInEdges(inEdges)
            getAllOutEdges(outEdges)
          }

          function getAllOutEdges(outEdges) {
            outEdges.forEach((outEdge) => {
              let outNode = outEdge.getTarget()
              ai_ids['ids_lineage_graph_template'].relativeNodes.push(outNode)
              let edges = outNode.getOutEdges()
              ai_ids['ids_lineage_graph_template'].preClickNodeEdges = [
                ...ai_ids['ids_lineage_graph_template'].preClickNodeEdges,
                ...edges,
              ]

              getAllOutEdges(edges)
            })
          }

          function getAllInEdges(inEdges) {
            inEdges.forEach((inEdge) => {
              let inNode = inEdge.getSource()
              ai_ids['ids_lineage_graph_template'].relativeNodes.push(inNode)
              let edges = inNode.getInEdges()
              ai_ids['ids_lineage_graph_template'].preClickNodeEdges = [
                ...ai_ids['ids_lineage_graph_template'].preClickNodeEdges,
                ...edges,
              ]
              getAllInEdges(edges)
            })
          }
          //
          graph.on('node:dblclick', function (evt) {
            canLight = false
            clearNodeAndEdges()
            sendEvent('hiddenTblInfo', '')
            ai_ids['ids_lineage_graph_template'].relativeNodes = []
            let targetNode = evt.item
            ai_ids['ids_lineage_graph_template'].relativeNodes.push(targetNode)
            getAllEdges(targetNode)
            // getAllEdges(nodeItem);
            graph.getEdges().forEach((edge) => {
              if (
                !ai_ids[
                  'ids_lineage_graph_template'
                ].preClickNodeEdges.includes(edge)
              ) {
                edge.hide()
              }
            })
            graph.getNodes().forEach((node) => {
              if (
                !ai_ids['ids_lineage_graph_template'].relativeNodes.includes(
                  node,
                )
              ) {
                node.hide()
              }
            })
            graph.paint()
          })
          function recover() {
            graph.getNodes().forEach((node) => {
              node.show()
            })
            graph.getEdges().forEach((edge) => {
              edge.show()
            })
            graph.paint()
            ai_ids['ids_lineage_graph_template'].relativeNodes = []
          }

          //点击空白清除相关节点
          graph.on('canvas:click', function (evt) {
            sendEvent('hiddenTblInfo', '')
            recover()
            clearNodeAndEdges()
          })

          G6.registerNode(
            'self-node',
            {
              draw(cfg, group) {
                const { label, nodeType, tblType } = cfg
                let paddingValue = 20
                const { width, height } = caclWH(label)
                let imgObj = getImgWAndH(nodeType, tblType)
                // icon.set("capture", false);
                const rect = group.addShape('rect', {
                  attrs: {
                    width,
                    height,
                    x: -width / 2,
                    y: -height / 2,
                    radius: 4,
                    cursor: 'pointer',
                    lineWidth: 1,
                    stroke: getStrokeColor(nodeType, tblType),
                    fill: getFillColor(nodeType, tblType),
                  },
                  draggable: true,
                })
                group.addShape('text', {
                  attrs: {
                    x: -width / 2 + imgObj.labelOffX,
                    y: height / 2 - 14,
                    text: label,
                    fontSize: 12,
                    textAlign: 'start',
                    textBaseline: 'center',
                    // lineHeight: 1,
                    fill: '#212121',
                  },
                  draggable: true,
                })
                group.addShape('rect', {
                  attrs: {
                    width: 40,
                    height,
                    radius: [4, 0, 0, 4],
                    x: -width / 2,
                    y: -height / 2,
                    fill: tblType == 'source' ? '#5582F3' : 'transparent',
                  },
                  draggable: true,
                })
                // tempTest.set("capture", false);
                // 根据label，计算宽高，需要自己实现
                const icon = group.addShape('image', {
                  attrs: {
                    x: -width / 2 + imgObj.offX,
                    y: -10,
                    height: imgObj.height,
                    width: imgObj.width,
                    img: imgObj.imgPath, //getImgPath(nodeType, tblType),
                  },
                  draggable: true,
                  // must be assigned in G6 3.3 and later versions. it can be any value you want
                  name: 'image-shape',
                })

                return rect
              },

              setState(name, value, item) {
                console.log('name is ', name)
                console.log('value is ', value)
                const group = item.getContainer()
                const shape = group.get('children')[0] // 顺序根据 draw 时确定
                shape.attr('stroke', value.stroke)
                shape.attr('lineWidth', value.lineWidth)
                shape.attr('fill', value.fill)
                // shape.attr("lineWidth", value);
              },
              update(cfg, node) {
                const group = node.getContainer() // 获取容器
                const shape = group.get('children')[0] // 按照添加的顺序
                const style = {
                  //   path: this.getPath(cfg),
                  stroke: cfg.style.stroke,
                }
                group.attr(style) // 更新属性
                // 更新文本的逻辑类似，但是需要考虑 cfg.label 是否存在的问题
                // 通过 label.attr() 更新文本属性即可
              },
            },
            'rect',
          )

          function getImgPath(nodeType, tblType) {
            if (isCangQiong) {
              return tblType == 'source'
                ? './kingdee/ai-ids/modelanalysic/img/source.png'
                : nodeType == 'sql'
                ? './kingdee/ai-ids/modelanalysic/img/sql.png'
                : './kingdee/ai-ids/modelanalysic/img/python.png'
            }
          }
          //根据表的类型和语言类型获取图片的宽度和高度
          function getImgWAndH(nodeType, tblType) {
            return tblType == 'source'
              ? {
                  height: 18,
                  width: 24,
                  offX: 8,
                  labelOffX: 50,
                  imgPath: getImgPath(nodeType, tblType),
                }
              : nodeType == 'sql'
              ? {
                  height: 14,
                  width: 12,
                  offX: 14,
                  labelOffX: 40,
                  imgPath: getImgPath(nodeType, tblType),
                }
              : {
                  height: 16,
                  width: 17,
                  imgPath: getImgPath(nodeType, tblType),
                  offX: 11,
                  labelOffX: 40,
                }
          }

          function caclWH(text) {
            return {
              width: text.length * 8 + parseInt(text.length < 18 ? 44 : 30),
              height: 35,
            }
          }

          if (typeof window !== 'undefined')
            window.onresize = () => {
              if (!graph || graph.get('destroyed')) return
              if (
                !container ||
                !container.scrollWidth ||
                !container.scrollHeight
              )
                return
              graph.changeSize(container.scrollWidth, container.scrollHeight)
            }

          graph.data(data)
          graph.render()
          graph.zoom(1)
        },
        mounted() {},
      },
    ],
  }
})()
