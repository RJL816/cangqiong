window.ai_ids = window.ai_ids || {}
window.IDS_TemplateData1 = ai_ids[
  'sale_analysic_samKey_template'
] = (function () {
  return {
    width: 0,
    containerId: 'ids__modelAna_container', //苍穹：customcontrolapsankey 本地：ids__modelAna_container
    containerWidth: '',
    svg: null,
    mode: -1, // 浏览模式  -1：全览模式   0：点击第一层的模式（看某个客户或仓库的详情） 1:点击第二层的模式（看某个物料分组的详情）
    initSvg: function () {
      let containerId = ai_ids['sale_analysic_samKey_template'].containerId
      ai_ids['sale_analysic_samKey_template'].svg = d3
        .select(`#${containerId}`) //customcontrolapsankey
        .append('svg')
        .attr(
          'width',
          ai_ids['sale_analysic_samKey_template'].containerWidth + 10 + 10,
        )
        .attr('height', 100 + 10 + 10)
        .append('g')
        .attr('transform', 'translate(' + 10 + ',' + 10 + ')')
    },
    templateData: [
      {
        chartKey: 'sale_analysic_samKey',
        viewType: 'd3chart',
        chartTitle: {
          text: '',
          bottom: '0',
          left: '40%',
        },
        beforeMount(options) {
          const {
            chartData: { links, nodes },
            uniqueCode,
            isUpdate,
          } = options
          ai_ids['sale_analysic_samKey_template'].mode = 0 //全览模式
          var units = 'Widgets'
          let container = document.getElementById(
            ai_ids['sale_analysic_samKey_template'].containerId,
          )
          console.log('links is ', links.length)
          console.log('nodes length is ', nodes.length)
          //绑定
          container.addEventListener(
            'click',
            function (event) {
              if (event.target.nodeName == 'svg') {
                console.log(
                  '点击自身!',
                  ai_ids['sale_analysic_samKey_template'].mode,
                )

                if (ai_ids['sale_analysic_samKey_template'].mode != 0) {
                  // ai_ids['sale_analysic_samKey_template'].mode=0;
                  handleAllView()
                }
              }
            },
            false,
          )
          let containerWidth = getComputedStyle(container).width
          if (containerWidth) {
            containerWidth = containerWidth.replace('px', '')
            try {
              containerWidth -= 100
            } catch (ex) {
              containerWidth = 1000
            }
          } else {
            containerWidth = 1000
          }
          ai_ids[
            'sale_analysic_samKey_template'
          ].containerWidth = containerWidth
          console.log('containerWidth is ', containerWidth)
          //   let containerId = 'ids__modelAna_container' //苍穹：customcontrolapsankey 本地：ids__modelAna_container
          var margin = { top: 10, right: 10, bottom: 10, left: 0 }
          var width = containerWidth - margin.left - margin.right
          height = 1000 - margin.top - margin.bottom
          //   let graph = {
          //     nodes: [],
          //     links: [],
          //   }
          const thridWidth = Math.ceil(containerWidth / 3)
          console.log('thridWidth is ', thridWidth)
          let originGraph
          let sankey = d3
            .sankey()
            .nodeWidth(36)
            .nodePadding(1)
            .size([containerWidth - thridWidth + 120, height]) //width  -200
          let path = sankey.link()

          var formatNumber = d3.format(',.0f') // zero decimal places
          format = function (d) {
            return formatNumber(d) + ' ' + units
          }
          color = d3.scale.category20()

          //   let colors = d3.range(25).map(d3.scale.category20())
          //   console.log('color is ', colors)
          //sale_analysic_samKey    ids__modelAna_container
          let btns = []
          function addAllViewBtn() {
            let containerId =
              ai_ids['sale_analysic_samKey_template'].containerId
            if (btns.length > 0) {
              d3.select(`#${containerId}`)
                .selectAll('.ai_ids__msa_btn')
                .data(btns)
                .enter()
                .append('span')
                .attr('class', 'ai_ids__msa_btn') //msa : 物料销售分析
                .text(function (d) {
                  return d
                })

                .on('click', handleAllView)
            } else {
              d3.select(`#${containerId}`)
                .selectAll('.ai_ids__msa_btn')
                .data(btns)
                .exit()
                .remove()
            }
          }
          //全览
          function handleAllView() {
            ai_ids['sale_analysic_samKey_template'].mode = 0 //全览模式
            d3.selectAll('g.ids_line_node_g').remove()
            let sourceGraph = JSON.parse(JSON.stringify(originGraph))
            scaleSmall(sourceGraph)
            btns = []
            addAllViewBtn()
          }
          //添加tooltip
          let tooltip = d3
            .select(`#${ai_ids['sale_analysic_samKey_template'].containerId}`)
            .append('div')
            .attr('class', 'ids_msa_tooltip')
          //   let svg

          function findNodeById(id, returnKey) {
            let node = nodes.filter((node) => node.name == id)
            if (node && node.length > 0) {
              //   return node[0].label
              return node[0][returnKey]
            }
          }
          //找出所有物料节点(包含ppDimList字段，用来表示是哪个客户/仓库的)
          function findMaterialNodes(sourceName) {
            let materialNodes = nodes.filter(
              (node) => node.ppDimList && node.ppDimList.includes(sourceName),
            )
            return materialNodes
          }
          function dealOriginData(links) {
            let graph = {
              nodes: [],
              links: [],
            }
            links.forEach((link) => {
              const { source, target, value } = link
              let sourceNode = findNodeById(source, 'name') //返回的是node 的名称

              let targetNode = findNodeById(target, 'name') //返回的是node的名称
              graph.nodes.push({ name: sourceNode })
              graph.nodes.push({ name: targetNode })
              graph.links.push({
                source: sourceNode,
                target: targetNode,
                value: value,
              })
            })

            graph.nodes = d3.keys(
              d3
                .nest()
                .key(function (d) {
                  return d.name
                })
                .map(graph.nodes),
            )
            console.log('after duplicate nodes is ', graph.nodes)
            //保存一份原始的数据
            originGraph = JSON.parse(JSON.stringify(graph))
            return graph
          }
          if (isUpdate) {
            d3.selectAll('g.ids_line_node_g').remove()

            btns = []
            addAllViewBtn()

            //处理原始数据
            let graph = dealOriginData(links)

            scaleSmall(graph)
          } else {
            ai_ids['sale_analysic_samKey_template'].initSvg()
            //处理原始数据
            let graph = dealOriginData(links)

            scaleSmall(graph)
          }

          function scaleSmall(graph) {
            graph = dealNodeLinks(graph)

            sankey
              // .depth({depth:2})
              .nodes(graph.nodes)
              .links(graph.links)
              .layout(0)
            let finalHeight = sankey.getFinalHeight()
            if (finalHeight) {
              // svg.attr('height',finalHeight)
              d3.select('svg').attr('height', finalHeight)
            }
            drawNodes(graph.nodes)
            drawLinks(graph.links)
          }

          //对Node、link进行二次处理
          function dealNodeLinks(graph) {
            graph.links.forEach((link, i) => {
              let sourceIdx = graph.nodes.indexOf(graph.links[i].source)
              graph.links[i].source = sourceIdx
              let targetIdx = graph.nodes.indexOf(graph.links[i].target)
              graph.links[i].target = targetIdx
            })

            graph.nodes.forEach((node, i) => {
              //   console.log('node is ', node)
              //   let targetNode = findNodeById(node, 'label')
              graph.nodes[i] = { name: node }
            })

            return graph
          }
          function hasLinkExists(arr, source, target) {
            return arr.some(
              (link) => link.source == source && link.target == target,
            )
          }
          //点击中间层时查找相关的link
          function findNextFromDepthOne(
            arr,
            initDepth,
            newSourceGraph,
            materialSearch, //如果点击的是第一层
          ) {
            let targetName = []
            let afterFilterLinks = []
            arr.forEach((name) => {
              newSourceGraph.links.forEach((link) => {
                const { source, target } = link

                if (initDepth == 1) {
                  if (source == name || target == name) {
                    afterFilterLinks.push(link)
                  }
                } else {
                  //从depht 为0 开始,只要找到下一层就好了
                  if (
                    materialSearch.length > 0 &&
                    !materialSearch.includes(target)
                  ) {
                    return
                  }
                  if (
                    source == name &&
                    !hasLinkExists(afterFilterLinks, name, target)
                  ) {
                    console.log('target is ', target)
                    afterFilterLinks.push(link)
                  }
                }
              })
            })
            console.log('afterFilterLinks is ', afterFilterLinks.length)
            return afterFilterLinks
          }

          // beginDraw(2,'Coal')
          //点击第二层节点，加载第三层节点
          function handleNodeClick(nodeInfo) {
            // debugger
            d3.selectAll('g.ids_line_node_g').remove()
            let { name, depth } = nodeInfo
            console.log('depth you click is ', depth)
            ai_ids['sale_analysic_samKey_template'].mode = depth //设置当下的点击模式

            let newSourceGraph = JSON.parse(JSON.stringify(originGraph))
            console.log('newSourceGraph is ', newSourceGraph)
            let newFilterLinks = []
            let searchCondition = []
            btns.push('全览')
            addAllViewBtn()
            let materialSearch = [] //如果点击第一层，还要指定第三层物料的name
            // debugger
            if (depth == 0) {
              console.log('name is ', name)
              let targetNodes = findMaterialNodes(name)
              console.log('targetNodes is ', targetNodes)
              if (targetNodes.length > 0) {
                targetNodes.forEach((node) => {
                  const { name } = node
                  materialSearch.push(name)
                })
              }
              // debugger
              let result = newSourceGraph.links.filter(
                (link) => link.source == name,
              )
              newFilterLinks = newFilterLinks.concat(result)

              result.forEach((link) => {
                searchCondition.push(link.target)
              })
            } else {
              searchCondition = [name]
            }

            let secondResult = findNextFromDepthOne(
              searchCondition,
              depth,
              newSourceGraph,
              materialSearch,
            )

            newFilterLinks = newFilterLinks.concat(secondResult)

            let newGraph = createGraphFromLinks(newFilterLinks)
            // dealNodeLinks(newGraph)
            scaleSmall(newGraph)
            // d3.selectAll('g.line_node_g').remove()
            // setTimeout(function(){
            //     const {name,depth}=nodeInfo;
            //     beginDraw(2,name)
            // },20)
          }
          //根据线的关系组织graph
          function createGraphFromLinks(linkData, valueKey) {
            graph = {
              nodes: [],
              links: [],
            }
            linkData.forEach((item, index) => {
              graph.nodes.push({ name: item.source })
              graph.nodes.push({ name: item.target })
              graph.links.push({
                source: item.source,
                target: item.target,
                value: valueKey ? +item[valueKey] : +item.value,
              })
            })
            graph.nodes = d3.keys(
              d3
                .nest()
                .key(function (d) {
                  return d.name
                })
                .map(graph.nodes),
            )
            return graph
          }

          function drawNodes(newNodes) {
            var node = ai_ids['sale_analysic_samKey_template'].svg
              .append('g')
              .attr('class', 'ids_line_node_g')
              .selectAll('.node')
              .data(newNodes) //(graph.nodes)
              .enter()
              .append('g')
              .attr('class', 'ids_msa_node')
              .attr('transform', function (d) {
                return 'translate(' + d.x + ',' + d.y + ')'
              })
              .call(
                d3.behavior.drag().origin(function (d) {
                  return d
                }),

                //   .on("dragstart", function() {
                // 	  this.parentNode.appendChild(this); })
                //   .on("drag", dragmove)
              )

            // add the rectangles for the nodes
            node
              .append('rect')
              .attr('height', function (d) {
                return d.dy
              })
              .attr('width', sankey.nodeWidth())
              .attr('class', function (d) {
                return 'ai_ids_node ai_ids__node_' + d.depth
              })
              .style('fill', function (d) {
                return (d.color = color(d.name.replace(/ .*/, '')))
              })
              .style('stroke', function (d) {
                return d3.rgb(d.color)
              })
            //   .append('title')
            //   .text(function (d) {
            //     return d.name + '\n' + format(d.value)
            //   })

            node.selectAll('.ai_ids__node_1').on('click', function (e) {
              handleNodeClick(e)
            })
            node.selectAll('.ai_ids__node_0').on('click', function (e) {
              handleNodeClick(e)
            })

            // add in the title for the nodes
            node
              .append('text')
              .attr('class', 'ids_msa_rect_text')
              .attr('x', 6 + sankey.nodeWidth()) //-6
              .attr('y', function (d) {
                return d.dy / 2
              })
              .attr('dy', '.35em')
              .attr('text-anchor', 'start')
              //   .attr("transform", function(){return 'translate(100,0)'})
              .text(function (d) {
                let textLabel = findNodeById(d.name, 'label')
                return d.dy > 12 ? textLabel : ''
              })
              .filter(function (d) {
                // return d.x < width / 2
                return d.depth == 2
              })
              .attr('x', 6 + sankey.nodeWidth())
              .attr('text-anchor', 'start')

            d3.selectAll('.ai_ids_node')
              .on('mousemove', function (params) {
                findInfoFromSourceData({ name: params.name }, 'node')
                showToolTip()
              })
              .on('mouseout', function () {
                if (tipInfo && tipInfo.length > 0) {
                  tipInfo = []
                  hideToolTip()
                }
              })
          }

          let tipInfo = [] // tooltip 显示的信息
          //从原始数据中查找数据
          function findInfoFromSourceData(condition, type) {
            if (tipInfo.length > 0) return
            const { nodes, links } = options.chartData
            function findNodeFromNodes(nodeName) {
              let targetNodes = nodes.filter((node) => node.name == nodeName)
              return targetNodes[0]
            }
            if (type == 'node') {
              let targetNode = findNodeFromNodes(condition.name)
              tipInfo = targetNode.tips
            } else if (type == 'link') {
              const { sourceName, targetName } = condition
              let targetLink = links.filter(
                (link) =>
                  link.source == sourceName && link.target == targetName,
              )
              console.log('taregtLinsk is ', targetLink)
              if (targetLink && targetLink.length > 0) {
                targetLink = targetLink[0]
                tipInfo = targetLink.tips
              }
              //   let sourceNode = findNodeFromNodes(sourceName)
              //   let targetNode = findNodeFromNodes(targetName)
              //   if (sourceNode && targetNode) {
              //     const sourceName = sourceNode.name //其实对应的是number，label才是名称

              //     const targetName = targetNode.name
              //     let targetLink = links.filter(
              //       (link) =>
              //         link.source == sourceName && link.target == targetName,
              //     )
              //     if (targetLink && targetLink.length > 0) {
              //       targetLink = targetLink[0]
              //       tipInfo = targetLink.tips
              //     }
              //   }
            }
          }
          //根据tipInfo 字段显示tooltip
          function showToolTip() {
            if (!tipInfo || tipInfo.length == 0) return
            // console.log('pageX is ', event.pageX)
            // console.log('pageY is ', event.pageY)
            d3.select('.ids_msa_tooltip')
              .style('left', event.pageX + 'px') // -150 苍穹环境
              .style('top', event.pageY + 'px') // -190 苍穹环境
              .style('display', 'block')
              .selectAll('.ids_msa_row')

              .data(tipInfo)
              .enter()
              .append('div')
              .attr('class', 'ids_msa_row')
              .html(function (d) {
                const { label, value } = d
                return '<label>' + label + '</label><span>' + value + '</span>'
              })
          }
          function hideToolTip() {
            d3.select('.ids_msa_tooltip')
              .style('display', 'none')
              .selectAll('.ids_msa_row')
              .data(tipInfo)
              .exit()
              .remove()
          }
          function drawLinks(newLinks) {
            var link = ai_ids['sale_analysic_samKey_template'].svg
              .append('g')
              .attr('class', 'ids_line_node_g')
              .selectAll('.ids_msa_link')
              .data(newLinks)
              .enter()
              .append('path')
              .attr('class', 'ids_msa_link')

              .attr('d', path)
              .style('stroke', function (d) {
                return d.source.color
              })
              .style('stroke-width', function (d) {
                return Math.max(1, d.dy)
              })
              .sort(function (a, b) {
                return b.dy - a.dy
              })

            // add the link titles
            // link.append('title').text(function (d) {
            //   return (
            //     d.source.name + ' → ' + d.target.name + '\n' + format(d.value)
            //   )
            // })

            //线的信息
            d3.selectAll('.ids_msa_link')
              .on('mousemove', function (params) {
                // debugger
                const condition = {
                  sourceName: params.source.name,
                  targetName: params.target.name,
                }
                findInfoFromSourceData(condition, 'link')
                showToolTip()
              })
              .on('mouseout', function () {
                if (tipInfo && tipInfo.length > 0) {
                  tipInfo = []
                  hideToolTip()
                }
              })
          }
        },
        mounted() {},
      },
    ],
  }
})()
