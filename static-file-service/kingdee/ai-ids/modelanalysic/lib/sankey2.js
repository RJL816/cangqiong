// ie11 兼容性(完成)
console.log("d3 is ", d3);
d3.sankey = function () {
  var sankey = {},
    nodeWidth = 24,
    nodePadding = 1,
    size = [1, 1],
    nodes = [],
    links = [],
    initDepth,
    offsetY = 0,
    calculateHeight = 0, //调整各层高度后计算出最后的高度，以便在绘制的时候重新设置svg的高度
    originalNodesByBreadth, //存储根据x分层的信息，给放大的功能用的
    mode = -1; //sankey的模式，-1 为全览， 0 为选中第一层数据 就是客户/仓库   1 为选中第二层数据也就是物料分组
  // 在绘制前获取最后的画布高度，如果不为0，先设置画布的高度
  sankey.getFinalHeight = function () {
    //只有不为0且比原来设置的高度大才返回
    if (calculateHeight && size[1] < calculateHeight) {
      return calculateHeight;
    }
    return 0;
  };

  sankey.getOriginalNodeByBreath = function () {
    return originalNodesByBreadth;
  };

  sankey.nodeWidth = function (_) {
    if (!arguments.length) return nodeWidth;
    nodeWidth = +_;
    return sankey;
  };

  sankey.mode = function (_) {
    if (!arguments.length) return mode;
    mode = _;
    return sankey;
  };

  sankey.nodePadding = function (_) {
    if (!arguments.length) return nodePadding;
    nodePadding = +_;
    return sankey;
  };

  sankey.nodes = function (_) {
    if (!arguments.length) return nodes;
    nodes = _;
    return sankey;
  };

  sankey.links = function (_) {
    if (!arguments.length) return links;
    links = _;
    return sankey;
  };
  sankey.depth = function (_) {
    if (!arguments.length) return;
    initDepth = _;
    return sankey;
  };

  sankey.size = function (_) {
    if (!arguments.length) return size;
    size = _;
    return sankey;
  };

  sankey.layout = function (iterations) {
    computeNodeLinks();
    computeNodeValues();
    computeNodeBreadths();
    computeNodeDepths(iterations);
    computeLinkDepths();
    return sankey;
  };

  sankey.relayout = function () {
    computeLinkDepths();
    return sankey;
  };
  sankey.getNodes = function () {
    return nodes;
  };
  sankey.getLinks = function () {
    return links;
  };

  sankey.link = function () {
    var curvature = 0.5;

    function link(d) {
      // console.log('d is ',d)
      var x0 = d.source.x + d.source.dx,
        x1 = d.target.x,
        xi = d3.interpolateNumber(x0, x1),
        x2 = xi(curvature),
        x3 = xi(1 - curvature),
        y0 = d.source.y + d.sy + d.dy / 2,
        y1 = d.target.y + d.ty + d.dy / 2;
      // console.log("x0,y0 is ",x0,y0)
      // console.log('x1,y1 is ',x1,y1)
      return (
        "M" +
        x0 +
        "," +
        y0 +
        "C" +
        x2 +
        "," +
        y0 +
        " " +
        x3 +
        "," +
        y1 +
        " " +
        x1 +
        "," +
        y1
      );
    }

    link.curvature = function (_) {
      if (!arguments.length) return curvature;
      curvature = +_;
      return link;
    };

    return link;
  };

  // Populate the sourceLinks and targetLinks for each node.
  // Also, if the source and target are not objects, assume they are indices.
  function computeNodeLinks() {
    // debugger
    nodes.forEach(function (node) {
      node.sourceLinks = [];
      node.targetLinks = [];
    });
    links.forEach(function (link) {
      var source = link.source,
        target = link.target;
      if (typeof source === "number") source = link.source = nodes[link.source];
      if (typeof target === "number") target = link.target = nodes[link.target];
      source.sourceLinks.push(link);
      target.targetLinks.push(link);
    });
  }

  // Compute the value (size) of each node by summing the associated links.
  function computeNodeValues() {
    nodes.forEach(function (node) {
      node.value = Math.max(
        d3.sum(node.sourceLinks, value),
        d3.sum(node.targetLinks, value)
      );
    });
  }

  // Iteratively assign the breadth (x-position) for each node.
  // Nodes are assigned the maximum breadth of incoming neighbors plus one;
  // nodes with no incoming links are assigned breadth zero, while
  // nodes with no outgoing links are assigned the maximum breadth.
  function computeNodeBreadths() {
    // debugger
    var remainingNodes = nodes,
      nextNodes,
      x = 0;

    while (remainingNodes.length) {
      nextNodes = [];
      remainingNodes.forEach(function (node) {
        node.x = x;
        node.dx = nodeWidth;
        node.sourceLinks.forEach(function (link) {
          nextNodes.push(link.target);
        });
      });
      remainingNodes = nextNodes;
      ++x;
    }

    //
    moveSinksRight(x);
    scaleNodeBreadths((size[0] - nodeWidth) / (x - 1));
  }

  function moveSourcesRight() {
    nodes.forEach(function (node) {
      if (!node.targetLinks.length) {
        node.x =
          d3.min(node.sourceLinks, function (d) {
            return d.target.x;
          }) - 1;
      }
    });
  }

  function moveSinksRight(x) {
    nodes.forEach(function (node) {
      if (!node.sourceLinks.length) {
        node.x = x - 1;
      }
    });
  }

  function scaleNodeBreadths(kx) {
    nodes.forEach(function (node) {
      node.x *= kx;
    });
  }

  //如果设置了depth（initDepth） 根据 nodes 去掉不必要的links
  function resetNodeAndLinks(lostNodes) {
    let nodeArr = [];
    let excludeArr = [];
    lostNodes.forEach(function (node) {
      // const { name } = node;
      const name = node && node.name;
      let index = nodes.findIndex(function (item) {
        return item.name == name;
      });
      excludeArr.push(index);
    });

    nodeArr = nodes.filter(function (d, index) {
      return !excludeArr.includes(index);
    });

    const idxArr = [];
    lostNodes.forEach(function (node) {
      // const { name } = node; //过滤掉 target为该name的links
      const name = node && node.name;
      links.forEach(function (item, index) {
        if (item.target.name == name) {
          idxArr.push(index);
        }
      });
    });

    let newLinks = [];
    links.forEach(function (item, index) {
      if (!idxArr.includes(index)) {
        newLinks.push(item);
      }
    });
    const addResultInfo = dealClickNode();

    if (addResultInfo) {
      nodes = nodeArr.concat(addResultInfo.addNodes);
      links = newLinks.concat(addResultInfo.addLinks);
    } else {
      nodes = nodeArr;
      links = newLinks;
    }

    return addResultInfo && addResultInfo.addNodes;
  }
  //处理点击加载的node 和
  function dealClickNode() {
    let addNodes = [];
    let addLinks = [];
    if (initDepth) {
      // const { nodeName } = initDepth;
      const nodeName = initDepth && initDepth.nodeName;
      //从线集过滤出从该node出发关联的线
      let sourceLinks = (addLinks = links.filter(function (link) {
        return link.source.name == nodeName;
      }));

      //从上面关联的线中找出关联的点
      sourceLinks.forEach(function (link) {
        // const { target } = link;
        const target = link && link.target;
        addNodes.push(target);
      });
    }

    return {
      addNodes: addNodes,
      addLinks: addLinks
    };
  }

  function computeNodeDepths(iterations) {
    console.log("in computeNodeDepths mode is ", mode);
    var nodesByBreadth = (originalNodesByBreadth = d3
      .nest()
      .key(function (d) {
        return d.x;
      })
      .sortKeys(d3.ascending)
      .entries(nodes)
      .map(function (d, index) {
        // d.values.forEach((item) => (item.depth = index))
        return d.values;
      }));

    nodesByBreadth.forEach(function (group) {
      group.sort(function (a, b) {
        return b.value - a.value;
      });
    });
    //对层级做个排序，为了渲染后好绑定事件
    nodesByBreadth.forEach(function (group, index) {
      let firstNode = group[0];
      let depth = 0;
      if (firstNode.targetLinks.length == 0) {
        depth = 0;
      } else if (firstNode.sourceLinks.length == 0) {
        depth = 2;
      } else {
        depth = 1;
      }
      group.forEach(function (node) {
        node.depth = depth;
      });
    });

    if (mode == -1) {
      initializeNodeDepth();
    } else {
      changeNodeDepth();
    }
    // else changeNodeDepth()
    resolveCollisions();
    for (var alpha = 1; iterations > 0; --iterations) {
      relaxRightToLeft((alpha *= 0.99));
      resolveCollisions();
      relaxLeftToRight(alpha);
      resolveCollisions();
    }

    function initializeNodeDepth() {
      // debugger
      nodePadding = 1;
      var ky = d3.min(nodesByBreadth, function (nodes) {
        const nodeHeight =
          (size[1] - (nodes.length - 1) * nodePadding) / d3.sum(nodes, value);

        return nodeHeight;
      });
      console.log("ky is ", ky);

      // if (mode != -1) {
      //   changeNodeDepth(nodesByBreadth)
      //   // return
      // }

      // debugger
      //调整第二第三层的高度 qhx
      if (nodesByBreadth.length == 3) {
        let depth_two = 1;
        let depth_two_index = 0;
        let depth_three = 2;
        let depth_three_index = 0;
        nodesByBreadth.forEach(function (nodes, index) {
          let firstNodesDepth = nodes[0].depth;
          if (firstNodesDepth == depth_two) {
            depth_two_index = index;
          }
          if (firstNodesDepth == depth_three) {
            depth_three_index = index;
          }
        });
        if (depth_two_index != 0) {
          let twoNodesFirst = nodesByBreadth[depth_two_index][0];
          let sourceLinks = twoNodesFirst.sourceLinks;
          let targetNodesVal = d3.sum(sourceLinks, function (link) {
            return link.value;
          });
          if (twoNodesFirst.value > targetNodesVal) {
            let re = twoNodesFirst.value / targetNodesVal;
            if (re > 0) {
              re = Math.floor(re);
              if (re > 4) {
                //控制放大的倍数
                re = 4;
              }
              twoNodesFirst.sourceLinks.forEach(function (link) {
                // const { target } = link;
                const target = link && link.target;
                link.value *= re;
                target.value *= re;
              });
            }
          }
        }
      }
      nodesByBreadth.forEach(function (nodes) {
        nodes.forEach(function (node, i) {
          node.y = i;
          node.dy = node.value * ky;
        });
      });
      //开始展示的第二层
      if (nodesByBreadth.length == 2) {
        let secondNodes = nodesByBreadth[1];
        const secondNodeMinDy = d3.min(secondNodes, function (d) {
          return d.dy;
        });
      }

      //做改动
      if (nodesByBreadth[1].length == 1 && nodesByBreadth.length == 3) {
        // debugger
        let depth_three = nodesByBreadth[2];

        let sum = d3.sum(depth_three, function (d) {
          return d.value;
        });
        // depth_three.forEach(node=>{
        //     let {value,dy}=node;
        //     node.dy=6
        // })
        // let sum=d3.sum(depth_three,function(d){return d.dy})
        // console.log('nodesByBreadth sum is ', sum)
        let re = nodesByBreadth[1][0].value / sum;
        re = Math.floor(re) - 1;
        // console.log('nodesByBreadth re is ', re)
        if (re > 0) {
          depth_three.forEach(function (node) {
            node.dy *= re;
            node.value *= re;
            node.targetLinks.forEach(function (link) {
              link.value *= re;
            });
          });
          // console.log('nodesByBreadth is ', re)
        }
      }
      //调整第三极高度后，重新计算三层树的高度，取最大值，在绘制前设置svg的高度
      calculateHeight = d3.max(nodesByBreadth, function (nodes) {
        return (
          nodePadding * (nodes.length - 1) +
          d3.sum(nodes, function (d) {
            return d.dy;
          })
        );
      });
      calculateHeight = Math.ceil(calculateHeight) + 60;
      // console.log('node myHeight is ', calculateHeight)
      links.forEach(function (link) {
        link.dy = link.value * ky;
      });
    }
    //获取第几层的数据
    function getDataFromNodesByBreadth(nodesByBreadth, whichDepth) {
      let whichIdx = 0;
      nodesByBreadth.forEach(function (items, idx) {
        if (items[0].depth == whichDepth) {
          whichIdx = idx;
        }
      });
      return nodesByBreadth[whichIdx];
    }
    //下钻高度问题调整
    function changeNodeDepth() {
      // debugger
      nodePadding = 4;
      console.log("height is ", size[1]);
      console.log("scaleLinear is ", d3.scaleLinear);
      h = 500; //ze[1]
      if (mode == 0) {
        //选中第一层

        let thirdData = getDataFromNodesByBreadth(nodesByBreadth, 2); //nodesByBreadth[2]
        let min = d3.min(thirdData, function (d) {
          return d.value;
        });
        let max = d3.max(thirdData, function (d) {
          return d.value;
        });
        let thridH = h / thirdData.length;
        thridH = Math.ceil(thridH);
        console.log("thridH is ", thridH);
        // let linear = d3.scale
        //   .linear()
        let linear = d3
          .scaleLinear()
          .domain([min, max])
          .range([thridH - 1, thridH + 30]);
        let tempArr = [];
        thirdData.forEach(function (link, idx) {
          // const { value, targetLinks } = link;
          const value = link && link.value,
            targetLinks = link && link.targetLinks;
          let tempVal = linear(value);
          tempArr.push(tempVal);
          link.dy = tempVal;
          link.y = idx;
          targetLinks[0].dy = tempVal;
        });

        let secondData = getDataFromNodesByBreadth(nodesByBreadth, 1); //nodesByBreadth[1]
        let secondH = h / secondData.length;
        let secondMin = d3.min(secondData, function (d) {
          return d.value;
        });
        let secondMax = d3.max(secondData, function (d) {
          return d.value;
        });

        // let secondLinear = d3.scale
        //   .linear()
        let secondLinear = d3
          .scaleLinear()
          .domain([secondMin, secondMax])
          .range([secondH - 30, secondH + 30]);
        secondData.forEach(function (item, idx) {
          // const { value, targetLinks, sourceLinks } = item;
          const value = item && item.value,
            targetLinks = item && item.targetLinks,
            sourceLinks = item && item.sourceLinks;
          let tempVal = secondLinear(value);
          let sourceSum = d3.sum(sourceLinks, function (d) {
            return d.dy;
          });
          if (sourceSum > tempVal) {
            item.dy = sourceSum;
            targetLinks[0].dy = sourceSum;
          } else {
            item.dy = tempVal;
            targetLinks[0].dy = tempVal;
          }
          item.y = idx;
        });

        const firstData = getDataFromNodesByBreadth(nodesByBreadth, 0);
        firstData.forEach(function (item, idx) {
          // const { sourceLinks } = item;
          const sourceLinks = item && item.sourceLinks;
          let sourceSum = d3.sum(sourceLinks, function (d) {
            return d.dy;
          });
          if (sourceSum > h) {
            item.dy = sourceSum;
            // sourceLinks[0].dy = sourceSum
          } else {
            item.dy = h;
            // sourceLinks[0].dy = h
          }

          item.y = idx;
        });
      } else if (mode == 1) {
        //选中第二层

        let thirdData = getDataFromNodesByBreadth(nodesByBreadth, 2); //nodesByBreadth[2]
        let min = d3.min(thirdData, function (d) {
          return d.value;
        });
        let max = d3.max(thirdData, function (d) {
          return d.value;
        });
        let thridH = h / thirdData.length;
        thridH = Math.ceil(thridH);
        console.log("thridH is ", thridH);
        // let linear = d3.scale
        //   .linear()
        //   .domain([min, max])
        //   .range([thridH - 1, thridH + 30])
        let linear = d3
          .scaleLinear()
          .range([thridH - 1, thridH + 30])
          .domain([min, max]);
        let tempArr = [];
        thirdData.forEach(function (link, idx) {
          // const { value, targetLinks } = link;
          const value = link && link.value,
            targetLinks = link && link.targetLinks;
          let tempVal = linear(value);
          tempArr.push(tempVal);
          link.dy = tempVal;
          link.y = idx;
          targetLinks[0].dy = tempVal;
        });

        let secondData = getDataFromNodesByBreadth(nodesByBreadth, 1);
        secondData.forEach(function (item, idx) {
          let sourceSum = d3.sum(item.sourceLinks, function (d) {
            return d.dy;
          });
          if (sourceSum > h) {
            item.dy = sourceSum;
          } else {
            item.dy = h;
          }

          item.y = idx;
        });

        let firstData = getDataFromNodesByBreadth(nodesByBreadth, 0); //nodesByBreadth[0] //第一层的所有数据
        let firstH = h / firstData.length;
        let firstMin = d3.min(firstData, function (d) {
          return d.value;
        });
        let firstMax = d3.max(firstData, function (d) {
          return d.value;
        });
        // let firstLinear = d3.scale
        //   .linear()
        let firstLinear = d3
          .scaleLinear()
          .domain([firstMin, firstMax])
          .range([firstH - 30, firstH + 30]);
        firstData.forEach(function (item, idx) {
          // const { value, sourceLinks } = item;
          const value = item && item.value,
            sourceLinks = item && item.sourceLinks;
          let tempVal = firstLinear(value);
          item.dy = tempVal;
          item.y = idx;
          sourceLinks[0].dy = tempVal;
        });
      }
    }

    function relaxLeftToRight(alpha) {
      nodesByBreadth.forEach(function (nodes, breadth) {
        nodes.forEach(function (node) {
          if (node.targetLinks.length) {
            var y =
              d3.sum(node.targetLinks, weightedSource) /
              d3.sum(node.targetLinks, value);
            node.y += (y - center(node)) * alpha;
          }
        });
      });

      function weightedSource(link) {
        return center(link.source) * link.value;
      }
    }

    function relaxRightToLeft(alpha) {
      nodesByBreadth
        .slice()
        .reverse()
        .forEach(function (nodes) {
          nodes.forEach(function (node) {
            if (node.sourceLinks.length) {
              var y =
                d3.sum(node.sourceLinks, weightedTarget) /
                d3.sum(node.sourceLinks, value);
              node.y += (y - center(node)) * alpha;
            }
          });
        });

      function weightedTarget(link) {
        return center(link.target) * link.value;
      }
    }

    function resolveCollisions() {
      nodesByBreadth.forEach(function (nodes, idx) {
        var node,
          dy,
          y0 = 0,
          n = nodes.length,
          i;

        // Push any overlapping nodes down.
        nodes.sort(ascendingDepth);
        for (i = 0; i < n; ++i) {
          node = nodes[i];
          dy = y0 - node.y;
          if (dy > 0) {
            node.y += dy;
            if (idx == 1) {
              node.y += offsetY;
            }
          }
          y0 = node.y + node.dy + nodePadding;
        }

        // If the bottommost node goes outside the bounds, push it back up.

        //先注释
        //   dy = y0 - nodePadding - size[1];
        //   if (dy > 0) {
        //     y0 = node.y -= dy;

        //     // Push any overlapping nodes back up.
        //     for (i = n - 2; i >= 0; --i) {
        //       node = nodes[i];
        //       dy = node.y + node.dy + nodePadding - y0;
        //       if (dy > 0) node.y -= dy;
        //       y0 = node.y;
        //     }
        //   }
      });
    }

    function ascendingDepth(a, b) {
      return a.y - b.y;
    }
  }

  function computeLinkDepths() {
    // debugger;
    nodes.forEach(function (node) {
      node.sourceLinks.sort(ascendingTargetDepth);
      node.targetLinks.sort(ascendingSourceDepth);
    });
    nodes.forEach(function (node) {
      var sy = 0,
        ty = 0;
      node.sourceLinks.forEach(function (link) {
        link.sy = sy;
        sy += link.dy;
      });
      node.targetLinks.forEach(function (link) {
        link.ty = ty;
        ty += link.dy;
      });
    });

    function ascendingSourceDepth(a, b) {
      return a.source.y - b.source.y;
    }

    function ascendingTargetDepth(a, b) {
      return a.target.y - b.target.y;
    }
  }

  function center(node) {
    return node.y + node.dy / 2;
  }

  function value(link) {
    return link.value;
  }

  return sankey;
};
