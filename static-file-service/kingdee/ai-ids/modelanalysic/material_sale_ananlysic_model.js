// ie11 兼容性（改造完成）
window.ai_ids = window.ai_ids || {};
window.IDS_TemplateData1 = ai_ids["sale_analysic_samKey_template"] =
  (function () {
    return {
      width: 0,
      containerId: "customcontrolapsankey", //苍穹：customcontrolapsankey 本地：ids__modelAna_container
      containerWidth: "",
      svg: null,
      mode: -1, // 浏览模式  -1：全览模式   0：点击第一层的模式（看某个客户或仓库的详情） 1:点击第二层的模式（看某个物料分组的详情）
      initSvg: function () {
        let containerId = ai_ids["sale_analysic_samKey_template"].containerId;
        ai_ids["sale_analysic_samKey_template"].svg = d3
          .select("#" + containerId) //customcontrolapsankey    ie11 `#${containerId}`
          .append("svg")
          .attr("class", "ai_ids__msa_svg")
          .attr("width", ai_ids["sale_analysic_samKey_template"].containerWidth)
          .attr("height", 100 + 10 + 10)
          .append("g")
          .attr("transform", "translate(" + 10 + "," + 10 + ")");
      },
      //处理 Nodes节点
      dealGraph: function (sankeyData, options) {
        // const { dimlevelNumberNameRelation, list } = sankeyData;
        const dimlevelNumberNameRelation =
            sankeyData && sankeyData.dimlevelNumberNameRelation,
          list = sankeyData && sankeyData.list;
        let dimension2Nodes = [];
        let dimension3Nodes = [];
        let dimension4Nodes = [];
        //计算总和
        function getSum(arr) {
          let sum = 0;
          arr.forEach(function (item) {
            // const { famountLc } = item;
            const famountLc = item && item.famountLc;
            sum += famountLc;
          });
          return sum;
        }

        const dimensionKeys = Object.keys(dimlevelNumberNameRelation);
        dimensionKeys.forEach(function (key) {
          const dimensionData = dimlevelNumberNameRelation[key];
          const detailKeys = Object.keys(dimensionData);
          //   console.log('dimensionData is ', dimensionData)
          switch (key) {
            case "2":
              dimension2Nodes = detailKeys.map(function (detailKey) {
                return {
                  name: detailKey,
                  label: dimensionData[detailKey],
                  dimension: 2
                };
              });
              break;
            case "3":
              dimension3Nodes = detailKeys.map(function (detailKey) {
                return {
                  name: detailKey,
                  label: dimensionData[detailKey],
                  dimension: 3
                };
              });
              break;
            case "4":
              dimension4Nodes = detailKeys.map(function (detailKey) {
                return {
                  name: detailKey,
                  label: dimensionData[detailKey],
                  dimension: 4
                };
              });
              break;
          }
        });

        let cgLinks = []; // 客户-物料分组 或仓库-物料分组
        let gmLinks = []; // 物料分组-物料
        //客户/仓库   ---   物料分组
        dimension2Nodes.forEach(function (node2, index) {
          //   if (index != 1) return
          if (
            options &&
            options.hasOwnProperty("fdim2level") &&
            node2.name != options.fdim2level
          )
            return;
          let cName = node2.name;
          dimension3Nodes.forEach(function (node3, idx) {
            // if (idx != 0) return

            // ie11 兼容   !options.fdim3level.includes(node3.name)
            if (
              options &&
              options.hasOwnProperty("fdim3level") &&
              !options.fdim3level.some(function (i) {
                return i == node3.name;
              })
            )
              return;
            let gName = node3.name;
            let cgLink = list.filter(function (listItem) {
              if (options && options.hasOwnProperty("fdim3level")) {
                // ie11 兼容 options.fdim3level.includes(listItem.fdim3level)
                return (
                  listItem.fdim2level == cName &&
                  options.fdim3level.some(function (i) {
                    return i == listItem.fdim3level;
                  })
                  //options.fdim3level.indexOf(listItem.fdim3level) > -1
                );
              } else {
                return (
                  listItem.fdim2level == cName && listItem.fdim3level == gName
                );
              }
            });
            if (cgLink.length > 0) {
              let sum = getSum(cgLink);
              cgLinks.push({ source: cName, target: gName, value: sum });
            }
          });
        });

        if (options && options.hasOwnProperty("fdim2level")) {
          //如果有第二维度的过滤条件（图形上选中第一层）
          let fdim3levelArr = [];
          cgLinks.forEach(function (link) {
            // const { target } = link;
            const target = link && link.target;
            fdim3levelArr.push(target);
          });
          options.fdim3level = fdim3levelArr;
        }
        // 物料分组--- 物料
        dimension3Nodes.forEach(function (node3, index) {
          let gName = node3.name;
          //根据第三维度条件过滤 ie11 兼容 !options.fdim3level.includes(gName)
          if (
            options &&
            options.hasOwnProperty("fdim3level") &&
            !options.fdim3level.some(function (i) {
              return i == gName;
            })
          )
            return;
          dimension4Nodes.forEach(function (node4, idx) {
            let mName = node4.name;
            let targetList = list.filter(function (listItem) {
              if (!options || !options.hasOwnProperty("fdim2level")) {
                return (
                  listItem.fdim3level == gName && listItem.fdim4level == mName
                );
              } else if (options.hasOwnProperty("fdim2level")) {
                return (
                  listItem.fdim2level == options["fdim2level"] &&
                  listItem.fdim3level == gName &&
                  listItem.fdim4level == mName
                );
              }
            });
            if (targetList.length > 0) {
              let sum = getSum(targetList);
              gmLinks.push({ source: gName, target: mName, value: sum });
            }
          });
        });

        // console.log('cgLinks is ', cgLinks)
        // console.log('gmLinks is ', gmLinks)
        let nodes = dimension2Nodes.concat(
          dimension3Nodes.concat(dimension4Nodes)
        );
        let links = cgLinks.concat(gmLinks);

        let graph = {
          nodes: nodes,
          links: links
        };
        return graph;
      },
      //找到tip的信息
      findTipInfo: function (mousePars, chartData) {
        //   console.log('findTipInfo is ', mousePars)
        if (!mousePars) return [];
        function formatAmount(value) {
          let result = value / 10000;
          result = result.toFixed(2);
          return (result = result + "万"); // `${result}万`
        }
        // const { dimlevelNumberNameRelation, dimList } = chartData;
        const dimlevelNumberNameRelation =
            chartData && chartData.dimlevelNumberNameRelation,
          dimList = chartData && chartData.dimList;
        function findTipName(depth) {
          const dimensionDepth = parseInt(depth) + 1;
          const targetDim = dimList && dimList[dimensionDepth];
          if (targetDim) {
            return (targetDim && targetDim.name) + "："; // `${targetDim.name}：`;
          }
          return "";
        }

        // const { depth } = mousePars;
        const depth = mousePars && mousePars.depth;
        let tips = [];
        function findLabelByDepth(target) {
          // const { name, depth, value } = target;
          const name = target && target.name,
            depth = target && target.depth,
            value = target && target.value;
          let tempObj = {};
          let arr = [];
          let dimension = depth + 2;
          let nameVal = dimlevelNumberNameRelation[dimension][name];
          let label = findTipName(depth);
          //   depth == 0
          //     ? '客户名称：'
          //     : depth == 1
          //     ? '物料分组名称：'
          //     : '物料名称：'
          tempObj = { label: label, value: nameVal };
          arr.push(tempObj);
          arr.push({
            label: "销售金额：",
            value: formatAmount(value),
            vo: value
          });
          return arr;
        }
        if (depth == 0 || depth == 1 || depth == 2) {
          //柱子
          // const { name, sourceLinks, value } = mousePars;
          const name = mousePars && mousePars.name,
            sourceLinks = mousePars && mousePars.sourceLinks,
            value = mousePars && mousePars.value;
          let dimension = depth + 2;
          let label = dimlevelNumberNameRelation[dimension][name];
          // console.log('label is ', label)
          // let amount=getSumAmount(sourceLinks)
          let formatAmountStr = formatAmount(value);
          if (depth == 0) {
            let tempObj = { label: findTipName(depth), value: label };

            let mountObj = {
              vo: value,
              label: "销售金额：",
              value: formatAmountStr
            };
            tips.push(tempObj);
            tips.push(mountObj);
          } else if (depth == 1) {
            let tempObj = { label: findTipName(depth), value: label };

            let mountObj = {
              vo: value,
              label: "销售金额：",
              value: formatAmountStr
            };
            tips.push(tempObj);
            tips.push(mountObj);
          } else if (depth == 2) {
            let tempObj = { label: findTipName(depth), value: label };

            let mountObj = {
              vo: value,
              label: "销售金额：",
              value: formatAmountStr
            };
            tips.push(tempObj);
            tips.push(mountObj);
          }
        } else {
          //线
          // debugger
          // const { source, target } = mousePars;
          const source = mousePars && mousePars.source,
            target = mousePars && mousePars.target;
          let sourceTip = findLabelByDepth(source);
          tips = tips.concat(sourceTip);
          let targetTip = findLabelByDepth(target);
          tips = tips.concat(targetTip);
        }
        return tips;
      },
      containerHAndW: null,
      getContainerHAndW: function (container) {
        //   debugger
        let containerStyle = getComputedStyle(container);
        let containerWidth = containerStyle.width;
        let containerHeight = containerStyle.height;
        if (containerWidth) {
          containerWidth = containerWidth.replace("px", "");

          containerWidth = parseFloat(containerWidth);
        }
        if (containerHeight) {
          containerHeight = containerHeight.replace("px", "");
        }
        if (containerHeight < 600) {
          containerHeight = 600;
        }
        //保存容器的高度和宽度
        ai_ids["sale_analysic_samKey_template"].containerHAndW = {
          containerWidth: containerWidth,
          containerHeight: containerHeight
        };
        return {
          containerWidth: containerWidth,
          containerHeight: containerHeight
        };
      },
      templateData: [
        {
          chartKey: "sale_analysic_samKey",
          viewType: "d3chart",
          chartTitle: {
            text: "",
            bottom: "0",
            left: "40%"
          },
          beforeMount: function (options) {
            let btns = [];
            let tipInfo = []; // tooltip 显示的信息
            // const {
            //   chartData, //: { links, nodes },
            //   uniqueCode,
            //   isUpdate
            // } = options;
            const uniqueCode = options && options.uniqueCode,
              isUpdate = options && options.isUpdate;
            function getChartData() {
              let wantData = ai_ids.setting.getChartDataByKey(uniqueCode); //uniqueCode
              let wantDataBackup = JSON.parse(JSON.stringify(wantData));
              return wantDataBackup;
            }
            if (d3 && d3.sankey) {
              enter();
            } else {
              // window.KDApi.loadFile(
              //   ['./lib/d3.min.js', './lib/sankey2.js'],
              //   null,
              //   function () {
              //     enter()
              //   },
              // )
            }

            function enter() {
              //   debugger
              let chartData = getChartData();
              const temp_data =
                ai_ids["sale_analysic_samKey_template"].dealGraph(chartData);
              // let { links, nodes } =
              //   ai_ids["sale_analysic_samKey_template"].dealGraph(chartData); //.data.graphData
              let links = temp_data && temp_data.links,
                nodes = temp_data && temp_data.nodes;
              // console.log('enter links is ', links)
              // console.log('enter and nodes is ', nodes)
              ai_ids["sale_analysic_samKey_template"].mode = -1; //全览模式
              let container = document.getElementById(
                ai_ids["sale_analysic_samKey_template"].containerId
              );
              //绑定
              container.addEventListener(
                "click",
                function (event) {
                  if (event.target.nodeName == "svg") {
                    console.log(
                      "点击自身!",
                      ai_ids["sale_analysic_samKey_template"].mode
                    );

                    if (ai_ids["sale_analysic_samKey_template"].mode != -1) {
                      // ai_ids['sale_analysic_samKey_template'].mode=0;
                      handleAllView();
                    }
                  }
                },
                false
              );

              let containerHAndW =
                ai_ids["sale_analysic_samKey_template"].containerHAndW;
              if (!containerHAndW) {
                containerHAndW =
                  ai_ids["sale_analysic_samKey_template"].getContainerHAndW(
                    container
                  );
              }
              console.log("containerHAndW is ", containerHAndW);
              // let { containerWidth } = containerHAndW;
              let containerWidth =
                containerHAndW && containerHAndW.containerWidth;
              ai_ids["sale_analysic_samKey_template"].containerWidth =
                containerWidth;
              console.log("containerWidth is ", containerWidth);
              var margin = { top: 10, right: 10, bottom: 10, left: 0 };
              height =
                containerHAndW.containerHeight * 2 - margin.top - margin.bottom;
              //   console.log('d3.sankey is ', d3.sankey)
              const textWidth =
                containerWidth > 1500 ? 450 : containerWidth > 1000 ? 250 : 130;
              let sankey = d3
                .sankey()
                .nodeWidth(36)
                .nodePadding(1)
                .mode(-1)
                .size([containerWidth - textWidth, height]); //width  -200
              let path = sankey.link();
              // color = d3.scale.category20()
              color = d3.scaleOrdinal(d3.schemeCategory10);
              //恢复全览
              function addAllViewBtn() {
                let containerId =
                  ai_ids["sale_analysic_samKey_template"].containerId;
                if (btns.length > 0) {
                  d3.select("#" + containerId) // `#${containerId}`
                    .selectAll(".ai_ids__msa_btn")
                    .data(btns)
                    .enter()
                    .append("span")
                    .attr("class", "ai_ids__msa_btn") //msa : 物料销售分析
                    .text(function (d) {
                      return d;
                    })

                    .on("click", handleAllView);
                } else {
                  d3.select("#" + containerId) // `#${containerId}
                    .selectAll(".ai_ids__msa_btn")
                    .data(btns)
                    .exit()
                    .remove();
                }
              }
              //全览
              function handleAllView() {
                ai_ids["sale_analysic_samKey_template"].mode = -1; //全览模式
                // console.log('chartData is ', chartData)
                // let wantData = ai_ids.setting.getChartDataByKey(uniqueCode) //uniqueCode
                let wantData = getChartData();
                console.log("by name is ", wantData);
                sankey.mode(-1);
                d3.selectAll("g.ids_line_node_g").remove();
                const result =
                  ai_ids["sale_analysic_samKey_template"].dealGraph(wantData); //.data.graphData
                nodes = result.nodes;
                let graph = dealOriginData(result.links);
                scaleSmall(graph);
                btns = [];
                addAllViewBtn();
                scrollToTop();
              }
              //添加tooltip
              const temp_container_id =
                ai_ids["sale_analysic_samKey_template"].containerId;
              let tooltip = d3
                .select("#" + temp_container_id)
                .append("div")
                .attr("class", "ids_msa_tooltip");

              function findNodeById(id, returnKey) {
                let node = nodes.filter(function (node) {
                  return node.name == id;
                });
                if (node && node.length > 0) {
                  return node[0][returnKey];
                }
              }
              function dealOriginData(links) {
                // debugger
                let graph = {
                  nodes: [],
                  links: []
                };
                links.forEach(function (link) {
                  // const { source, target, value } = link;
                  const source = link && link.source,
                    target = link && link.target,
                    value = link && link.value;
                  let sourceNode = findNodeById(source, "name"); //返回的是node 的名称

                  let targetNode = findNodeById(target, "name"); //返回的是node的名称
                  graph.nodes.push({ name: sourceNode });
                  graph.nodes.push({ name: targetNode });
                  graph.links.push({
                    source: sourceNode,
                    target: targetNode,
                    value: value
                  });
                });
                let tempNodes = [];
                graph.nodes.forEach(function (node) {
                  // const { name } = node;
                  const name = node && node.name;
                  if (tempNodes.indexOf(name) > -1) {
                  } else {
                    tempNodes.push(name);
                  }
                });
                // let resNodes = []
                // tempNodes.forEach((item) => {
                //   resNodes.push({
                //     name: item,
                //   })
                // })
                graph.nodes = tempNodes;

                // graph.nodes = d3.keys(
                //   d3
                //     .nest()
                //     // .group()
                //     .key(function (d) {
                //       return d.name
                //     })
                //     .map(graph.nodes),
                // )

                return graph;
              }
              if (isUpdate) {
                d3.selectAll("g.ids_line_node_g").remove();

                btns = [];
                addAllViewBtn();

                //处理原始数据
                let graph = dealOriginData(links);

                scaleSmall(graph);
              } else {
                ai_ids["sale_analysic_samKey_template"].initSvg();
                //处理原始数据
                let graph = dealOriginData(links);

                scaleSmall(graph);
              }

              function scaleSmall(graph) {
                graph = dealNodeLinks(graph);

                sankey
                  // .depth({depth:2})
                  .nodes(graph.nodes)
                  .links(graph.links)
                  .layout(0);
                let finalHeight = sankey.getFinalHeight();
                if (finalHeight) {
                  d3.select("svg.ai_ids__msa_svg").attr("height", finalHeight);
                }
                drawNodes(graph.nodes);
                drawLinks(graph.links);
              }

              //对Node、link进行二次处理
              function dealNodeLinks(graph) {
                graph.links.forEach(function (link, i) {
                  let sourceIdx = graph.nodes.indexOf(graph.links[i].source);
                  graph.links[i].source = sourceIdx;
                  let targetIdx = graph.nodes.indexOf(graph.links[i].target);
                  graph.links[i].target = targetIdx;
                });

                graph.nodes.forEach(function (node, i) {
                  graph.nodes[i] = { name: node };
                });

                return graph;
              }
              function scrollToTop(container) {
                document.querySelector("svg.ai_ids__msa_svg").scrollIntoView();
              }
              //点击第二层节点，加载第三层节点
              function handleNodeClick(nodeInfo) {
                d3.selectAll("g.ids_line_node_g").remove();
                // let { name, depth } = nodeInfo;
                let name = nodeInfo && nodeInfo.name,
                  depth = nodeInfo && nodeInfo.depth;
                ai_ids["sale_analysic_samKey_template"].mode = depth; //设置当下的点击模式
                sankey.mode(depth);
                let searchOptions = {};
                if (depth != 2) {
                  //fdim3level  ie11 `fdim${depth + 2}level`
                  searchOptions["fdim" + (depth + 2) + "level"] = name;
                  if (depth == 1) {
                    searchOptions["fdim" + (depth + 2) + "level"] = [name];
                  }
                  let chartData = getChartData();
                  const result = ai_ids[
                    "sale_analysic_samKey_template"
                  ].dealGraph(
                    chartData, //.data.graphData
                    searchOptions
                  );
                  nodes = result.nodes;
                  let graph = dealOriginData(result.links);
                  scaleSmall(graph);
                }
                btns.push("全览");
                addAllViewBtn();
                // d3.select('svg').style('scrollTop', '0px')
                hideTip();
                scrollToTop();
              }
              function fadeInNode(links) {
                let nodes = [];
                links.forEach(function (link) {
                  // const { source, target } = link;
                  const source = link && link.source,
                    target = link && link.target;
                  // ie11 兼容 !nodes.includes(source)            !nodes.indexOf(source) > -1
                  if (!nodes.indexOf(source) > -1) {
                    nodes.push(source);
                  }
                  //ie11 兼容 !nodes.includes(target)       !nodes.indexOf(target) > -1
                  if (!nodes.indexOf(target) > -1) {
                    nodes.push(target);
                  }
                });
                //柱子的高亮
                const allRects = d3.selectAll("rect.ai_ids_node");
                allRects
                  .filter(function (d) {
                    // console.log('d fadeInNode selectAll is ', d)
                    if (!d) return;
                    // ie11 兼容 !nodes.includes(d.name);
                    return !nodes.some(function (node) {
                      return String(d.name) == node;
                    });
                  })
                  .transition()
                  .duration(400)
                  //   .style('fill', '#000')
                  .style("fill-opacity", 0.05);
                allRects
                  .filter(function (d) {
                    if (!d) return;
                    // ie11 兼容性 nodes.includes(d.name);
                    return nodes.some(function (node) {
                      return node == d.name;
                    }); // nodes.indexOf(d.name) > -1;
                  })
                  .style("fill-opacity", 0.85);
                const allText = d3.selectAll("text.ids_msa_rect_text");
                allText
                  .filter(function (d) {
                    if (!d) return;
                    // ie11 兼容性!nodes.includes(d.name);
                    return !nodes.some(function (node) {
                      return node == d.name;
                    });
                  })
                  .style("opacity", 0.1);

                const allPaths = d3.selectAll("path");
                allPaths
                  .filter(function (d) {
                    // console.log('d in path is ', d)
                    if (!d) return;
                    return !links.some(function (link) {
                      return (
                        link.source == d.source.name &&
                        link.target == d.target.name
                      );
                    });
                  })
                  .transition()
                  .duration(300)
                  //   .style('stroke', '#000')
                  .style("stroke-opacity", 0.05);
                allPaths
                  .filter(function (d) {
                    if (!d) return;
                    return links.some(function (link) {
                      return (
                        link.source == d.source.name &&
                        link.target == d.target.name
                      );
                    });
                  })
                  .style("stroke-opacity", 0.85);
              }
              //鼠标移上的淡入淡出效果
              function fadeIn(params) {
                // const { name, depth } = params;
                const name = params && params.name,
                  depth = params && params.depth;
                //找数据
                let searchOptions = {};
                if (depth == 0 || depth == 1) {
                  //fdim3level ie11 `fdim${depth + 2}level`
                  searchOptions["fdim" + (depth + 2) + "level"] = name;
                  if (depth == 1) {
                    searchOptions["fdim" + (depth + 2) + "level"] = [name];
                  }
                  const result = ai_ids[
                    "sale_analysic_samKey_template"
                  ].dealGraph(
                    getChartData(), //.data.graphData
                    searchOptions
                  );
                  if (result && result.links) {
                    fadeInNode(result.links);
                  }
                } else if (depth != 2) {
                  //线
                  //   const { source, target } = params
                  //   if (source.depth == 0) {
                  //     //客户 - 物料分组
                  //     searchOptions[`fdim${source.depth + 2}level`] = source.name
                  //     searchOptions[`fdim${target.depth + 2}level`] = [target.name]
                  //     const result = ai_ids[
                  //       'sale_analysic_samKey_template'
                  //     ].dealGraph(chartData, searchOptions) //.data.graphData
                  //     console.log('result is ', result.links)
                  //     if (result && result.links) {
                  //       fadeInNode(result.links)
                  //     }
                  //   } else if (source.depth == 1) {
                  //     //物料分组 - 物料
                  //   }
                  //   console.log('线')
                }
              }
              function fadeOut(parent) {
                d3.selectAll("rect.ai_ids_node")
                  .style("fill", function (d) {
                    // console.log('d in fadeOut', d)
                    if (!d) return;
                    return d.color;
                  })
                  .style("fill-opacity", 0.8);
                d3.selectAll("path")
                  .style("stroke", function (d) {
                    if (!d) return;
                    return d.source.color;
                  })
                  .style("stroke-opacity", 0.5);
                d3.selectAll("text.ids_msa_rect_text").style("opacity", 1);
              }
              function hideTip() {
                if (tipInfo && tipInfo.length > 0) {
                  tipInfo = [];
                  hideToolTip();
                }
              }
              function drawNodes(newNodes) {
                var node = ai_ids["sale_analysic_samKey_template"].svg
                  .append("g")
                  .attr("class", "ids_line_node_g")
                  .selectAll(".node")
                  .data(newNodes) //(graph.nodes)
                  .enter()
                  .append("g")
                  .attr("class", "ids_msa_node")
                  .attr("transform", function (d) {
                    return "translate(" + d.x + "," + d.y + ")";
                  });
                // .call(
                //   d3.behavior.drag().origin(function (d) {
                //     return d
                //   }),

                // )

                // add the rectangles for the nodes
                node
                  .append("rect")
                  .attr("height", function (d) {
                    return d.dy;
                  })
                  .attr("width", sankey.nodeWidth())
                  .attr("nodeName", function (d) {
                    return d.name;
                  })
                  .attr("class", function (d) {
                    return (
                      "ai_ids_node ai_ids__node_" +
                      d.depth +
                      " ai_ids__node_" +
                      d.name.replace(/\./, "")
                    );
                  })
                  .style("fill", function (d) {
                    return (d.color = color(d.name.replace(/ .*/, "")));
                  });
                //   .style('fill-opacity', 0.5)
                //   .style('stroke', function (d) {
                //     return d3.rgb(d.color)
                //   })
                //   .append('title')
                //   .text(function (d) {
                //     return d.name + '\n' + format(d.value)
                //   })

                node.selectAll(".ai_ids__node_1").on("click", function (e) {
                  handleNodeClick(e);
                });
                node.selectAll(".ai_ids__node_0").on("click", function (e) {
                  handleNodeClick(e);
                });

                // add in the title for the nodes
                node
                  .append("text")
                  .attr("class", function (d) {
                    if (!d) return;
                    return (
                      "ids_msa_rect_text " +
                      " ai_ids__text_" +
                      d.name.replace(/\./, "")
                    );
                  })
                  .attr("x", 6 + sankey.nodeWidth()) //-6
                  .attr("y", function (d) {
                    return d.dy / 2;
                  })
                  .attr("dy", ".35em")
                  .attr("text-anchor", "start")
                  .text(function (d) {
                    let textLabel = findNodeById(d.name, "label");
                    let mode = ai_ids["sale_analysic_samKey_template"].mode;
                    if (mode == -1) {
                      textLabel = d.dy > 10 ? textLabel : "";
                    } else {
                      textLabel = d.dy >= 2 ? textLabel : "";
                    }
                    return textLabel;
                  })
                  .filter(function (d) {
                    // return d.x < width / 2
                    if (!d) return;
                    return d.depth == 2;
                  })
                  .attr("x", 6 + sankey.nodeWidth())
                  .attr("text-anchor", "start");

                let fadeInTimeoutId = -1;
                function throttleFadeIn(params) {
                  fadeInTimeoutId = setTimeout(function () {
                    fadeIn(params);
                  }, 300);
                }
                let beginMouseOver = 0;
                d3.selectAll(".ai_ids_node")
                  .on("mouseover", function (params) {
                    // const { depth, name } = params;

                    tipInfo = ai_ids[
                      "sale_analysic_samKey_template"
                    ].findTipInfo(
                      params,
                      getChartData() //.data.graphData
                    );
                    beginMouseOver = +new Date();
                    throttleFadeIn(params);
                  })
                  .on("mousemove", function (params) {
                    showToolTip();
                  })
                  .on("mouseout", function () {
                    if (tipInfo && tipInfo.length > 0) {
                      tipInfo = [];
                      hideToolTip();
                    }
                    let endTime = +new Date();
                    if (
                      endTime - beginMouseOver < 300 &&
                      fadeInTimeoutId != -1
                    ) {
                      clearTimeout(fadeInTimeoutId);
                      fadeInTimeoutId = -1;
                    }
                    beginMouseOver = 0;
                    fadeOut(d3.select(this));
                  });
              }
              function getContainerLoc(event) {
                if (!boundingRect) {
                  getBoundingRect();
                }
                let docH = document.body.clientHeight;
                let top = boundingRect.top;
                let x = parseFloat(event.pageX) + 40;
                let y = parseFloat(event.pageY);
                if (y + 80 > docH) {
                  y = y - top - 80;
                } else {
                  y = y - top;
                }

                return {
                  x: x,
                  y: y
                };
              }
              let boundingRect;
              function getBoundingRect() {
                let containerId =
                  ai_ids["sale_analysic_samKey_template"].containerId;
                let ele = document.querySelector("#" + containerId);
                boundingRect = ele.getBoundingClientRect();
              }
              //根据tipInfo 字段显示tooltip
              function showToolTip() {
                if (!tipInfo || tipInfo.length == 0) return;
                // console.log('pageX is ', event.pageX)
                // console.log('pageY is ', event.pageY)
                // console.log('offsetX is ', event.offsetX)
                // console.log('offsetY is ', event.offsetY)
                // let x = parseFloat(event.offsetX) + 40
                // let y = parseFloat(event.pageY) - 190
                let result = getContainerLoc(event);
                d3.select(".ids_msa_tooltip")
                  .style("left", result.x + "px") // -150 苍穹环境
                  .style("top", result.y + "px") // -190 苍穹环境
                  .style("display", "block")
                  .selectAll(".ids_msa_row")

                  .data(tipInfo)
                  .enter()
                  .append("div")
                  .attr("class", "ids_msa_row")
                  .html(function (d) {
                    // const { label, value } = d;
                    const label = d && d.label,
                      value = d && d.value;
                    return (
                      "<label>" + label + "</label><span>" + value + "</span>"
                    );
                  });
              }
              function hideToolTip() {
                d3.select(".ids_msa_tooltip")
                  .style("display", "none")
                  .selectAll(".ids_msa_row")
                  .data(tipInfo)
                  .exit()
                  .remove();
              }
              function drawLinks(newLinks) {
                var link = ai_ids["sale_analysic_samKey_template"].svg
                  .append("g")
                  .attr("class", "ids_line_node_g")
                  .selectAll(".ids_msa_link")
                  .data(newLinks)
                  .enter()
                  .append("path")
                  .attr("class", "ids_msa_link")

                  .attr("d", path)
                  .style("stroke", function (d) {
                    return d.source.color;
                  })
                  .style("stroke-width", function (d) {
                    return Math.max(1, d.dy);
                  })
                  .sort(function (a, b) {
                    return b.dy - a.dy;
                  });

                //线的信息
                d3.selectAll(".ids_msa_link")
                  .on("mouseover", function (params) {
                    tipInfo = ai_ids[
                      "sale_analysic_samKey_template"
                    ].findTipInfo(
                      params,
                      getChartData() //.data.graphData
                    );
                    // fadeIn(params)
                  })
                  .on("mousemove", function () {
                    showToolTip();
                  })
                  .on("mouseout", function () {
                    if (tipInfo && tipInfo.length > 0) {
                      tipInfo = [];
                      hideToolTip();
                    }
                    // fadeOut()
                  });
              }
            }
          },
          mounted: function () {}
        }
      ]
    };
  })();
