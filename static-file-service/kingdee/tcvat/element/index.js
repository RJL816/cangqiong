(function (KDApi, $) {

  function MyComponent(model) {
    this._setModel(model);
  }

  MyComponent.prototype = {
    _setModel: function (model) {
      this.model = model;
    },
    init: function (props) {
      console.log('-----init', this.model, props)
      setHtml(this.model, props);
    },
    update: function (props) {
      console.log('-----update', this.model, props)
      setHtml(this.model, props);
    },
    destoryed: function () {
      console.log('-----destoryed', this.model)
    }

  }

  var setHtml = function (model, props) {
    KDApi.loadFile("./css/gqct.css", model, () => {
      KDApi.loadFile("./js/d3.min.js", model, () => {
        KDApi.loadFile("./js/jquery.min.js", model, () => {
          KDApi.templateFilePath('./html/element-index.html', model, {
            path: KDApi.nameSpace(model)
          }).then(result => {
            model.dom.innerHTML = result
            //console.log(result);
            initEvent(model, props);
          });
        });
      });
    });

  }

  var drawing = function (rootName, rootData, rootNumber, model, rootId) {
    var _this = this;
    // var rootName = ''; //根节点的名字
    var rootRectWidth = 0; //根节点rect的宽度
    var forUpward = true;

    var treeChart = function (d3Object) {
      this.d3 = d3Object;
      this.directions = ['downward'];
    };

    treeChart.prototype.drawChart = function () {
      // First get tree data for both directions.
      this.treeData = {};
      var self = this;
      self.directions.forEach(function (direction) {
        self.treeData[direction] = rootData[direction];
      });
      // rootName = '北京伴学科技有限公司';
      rootRectWidth = rootName.length * 15;
      self.graphTree(self.getTreeConfig());
    };

    treeChart.prototype.getTreeConfig = function () {
      var treeConfig = {
        'margin': {
          'top': 20,
          'right': 5,
          'bottom': 0,
          'left': 5
        }
      }

      treeConfig.chartWidth = (1600 - treeConfig.margin.right - treeConfig.margin.left);
      treeConfig.chartHeight = (800 - treeConfig.margin.top - treeConfig.margin.bottom);
      treeConfig.centralHeight = treeConfig.chartHeight / 2;//200;
      treeConfig.centralWidth = treeConfig.chartWidth / 6;//100;
      treeConfig.linkLength = 300;
      treeConfig.duration = 500; //动画时间
      return treeConfig;
    };

    treeChart.prototype.graphTree = function (config) {
      var self = this;
      var d3 = this.d3;
      var linkLength = config.linkLength;
      var duration = config.duration;
      var hasChildNodeArr = [];
      var id = 0;
      var diagonal = d3.svg.diagonal()
        .projection(function (d) {
          return [d.y, d.x];
        });
      var pathFunc;
      if (false) {
        pathFunc = diagonal;
      } else {
        pathFunc = funLine;
      }
      var zoom = d3.behavior.zoom()
        .scaleExtent([0.5, 2])
        .on('zoom', redraw);
      var svg = d3.select('#product_tree')
        .append('svg')
        .attr('width', config.chartWidth + config.margin.right + config.margin.left)
        .attr('height', config.chartHeight + config.margin.top + config.margin.bottom)
        .attr('xmlns', 'http://www.w3.org/2000/svg')
        .on('mousedown', disableRightClick)
        .call(zoom)
        .on('dblclick.zoom', null);
      var treeG = svg.append('g')
        .attr('class', 'gbox')
      // .attr('transform', 'translate(' + config.margin.left + ',' + config.margin.top + ')');

      //箭头
      var markerDown = svg.append("marker")
        .attr("id", "resolvedDown")
        .attr("markerUnits", "strokeWidth") //设置为strokeWidth箭头会随着线的粗细发生变化
        .attr("markerUnits", "userSpaceOnUse")
        .attr("viewBox", "0 -5 10 10") //坐标系的区域
        .attr("refX", 0) //箭头坐标
        .attr("refY", 0)
        .attr("markerWidth", 12) //标识的大小
        .attr("markerHeight", 12)
        .attr("orient", "0") //绘制方向，可设定为：auto（自动确认方向）和 角度值
        .attr("stroke-width", 2) //箭头宽度
        .append("path")
        .attr("d", "M0,-5L10,0L0,5") //箭头的路径
        .attr('fill', '#000'); //箭头颜色  

      // Initialize the tree nodes and update chart.

      for (var d in this.directions) {
        var direction = this.directions[d];
        var data = self.treeData[direction];
        if (typeof (data) != "undefined") {
          data.x0 = config.centralHeight;
          data.y0 = config.centralWidth;
          data.children.forEach(collapse);
          update(data, data, treeG);
        }
      }

      function update(source, originalData, g) {
        console.log(source)
        var direction = originalData['direction'];
        var node_class = direction + 'Node';
        var link_class = direction + 'Link';
        var downwardSign = 1;
        var nodeColor = '#8b4513';

        var isExpand = false;
        var nodeSpace = 160;
        var tree = d3.layout.tree().nodeSize([nodeSpace, 0]);
        var nodes = tree.nodes(originalData);
        var links = tree.links(nodes);
        var offsetY = -config.centralHeight;

        nodes.forEach(function (d) {
          d.y = downwardSign * (d.depth * linkLength) + config.centralWidth;
          d.x = d.x - offsetY;
          if (d.name == 'origin') {
            d.x = config.centralHeight;
            d.y += downwardSign * 0; // 左右两树图根节点之间的距离
          }
        });

        // Update the node.
        var node = g.selectAll('g.' + node_class)
          .data(nodes, function (d) {
            return d.id || (d.id = ++id);
          });

        var nodeEnter = node.enter().append('g')
          .attr('class', node_class)
          //			.classed('alink',true)//为选择名称而添加的统一class
          .attr('data-text', function (d) {
            return d.name;
          })
          .attr('transform', function (d) {
            return 'translate(' + source.y0 + ',' + source.x0 + ')';
          })
          .style('cursor', function (d) {
            return (d.name == 'origin') ? '' : (d.children || d._children) ? 'pointer' : '';
          });
        // .on('click', click);
        // 背景框
        nodeEnter.append("svg:rect")
          .attr("x", function (d) {
            return (d.name == 'origin') ? -62.5 : 95;//-(rootRectWidth / 2) : 95;
          })
          .attr("y", function (d) {
            return (d.name == 'origin') ? -20 : -16;//-16;
          })
          .attr("width", function (d) {
            return 150;
          })
          .attr("height", function (d) {
            return 60;
            //return (d.name == 'origin') ? 40 : "01" == d.dataType ? 40 : 60;
          })
          .attr("rx", 10)
          .style("stroke", function (d) {
            if (d.name == "origin") {
              return "#5582F3";
            } else if ("01" == d.dataType) {
              return "#29C392";
            } else if ("02" == d.dataType) {
              return "#ED812B";
            }
            return "#CCC";//外边框颜色
          })
          .style("fill", function (d) {
            return "#FFF";//节点背景色
          })
          .on('click', itemClick);
        ;
        // 名称
        nodeEnter.append('circle')
          .attr('r', 1e-6);
        nodeEnter.append("text")
          .attr("class", "linkname")
          .attr("x", function (d) {
            return (d.name == 'origin') ? '10' : '170';
          })
          .attr('dy', function (d) {
            return (d.name == 'origin') ? '30' : "01" == d.dataType ? '32' : '20';
          })
          .attr("text-anchor", 'middle')
          .style("fill", "black")

          .text(function (d) {
            if (d.name == 'origin') {
              // return ((forUpward) ? '根节点TOP' : '根节点Bottom');
              return rootName.length > 10 ? rootName.substr(0, 10) + ".." : rootName;
            }
            if (d.repeated) {
              return '[Recurring] ' + d.name;
            }
            return (d.name.length > 10) ? d.name.substr(0, 10) + ".." : d.name;
            //return(d.name.length > 10) ? d.name.substr(0, 10) : d.name;
          }).append("title")
          .text(function (d) {
            if (d.name == 'origin') {
              // return ((forUpward) ? '根节点TOP' : '根节点Bottom');
              return rootName;
            }
            if (d.repeated) {
              return '[Recurring] ' + d.name;
            }
            return d.name;
          })
          .style({
            'fill-opacity': 1e-6,
            'fill': function (d) {
              if (d.name == 'origin') {
                return 'black';
              }
            },
            'font-size': function (d) {
              return 13;
            },
            'cursor': "pointer"
          })
          .on('click', itemClick);

        // nodeEnter.append("text")
        // .attr("class", "linkname")
        //.attr("x", function (d) {
        //   return (d.name == 'origin') ? '0' : '170';
        // })
        // .attr("dy", function (d) {
        //  return (d.name == 'origin') ? '0' : '9';
        // })
        //.attr("text-anchor", 'middle')
        // .text(function (d) {
        //   return d.name.substr(10, d.name.length);
        //  })
        // .style({
        //  'fill': '#337ab7',
        //  'font-size': function (d) {
        //   return 13;
        //},
        // 'cursor': "pointer"
        // });
        // .on('click', Change_modal);

        // 编码
        nodeEnter.append("text")
          .attr("class", "linkname")
          .attr("x", function (d) {
            return (d.name == 'origin') ? '10' : '170';
          })
          .attr('fill', 'blue')
          .attr("dy", function (d) {
            return (d.name == 'origin') ? '2' : "01" == d.dataType ? '7' : '-1';
          })
          .attr("text-anchor", 'middle')
          .attr("class", "linkname")
          .style("fill", "blue")
          .style('font-size', 12)
          .text(function (d) {
            var str = (d.name == 'origin') ? rootNumber : "01" == d.dataType ? d.eleNumber : d.riskNumber;
            return (str.length > 13) ? str.substr(0, 13) + ".." : str;
          }).append("title")
          .text(function (d) {
            var str = (d.name == 'origin') ? rootNumber : "01" == d.dataType ? d.eleNumber : d.riskNumber;
            return str;
          })
          .on("click", itemClick);
        // 线上的描述
        nodeEnter.append("text")
          .attr("x", "0")
          .attr("dy", function (d) {
            // return '-5';
            return (d.name == 'origin') ? '.35em' : '5';
          })
          .attr("text-anchor", "start")
          .attr("class", "linkname")
          .style("fill", "green")
          .style('font-size', 12)
          .text(function (d) {
            return (d.name == 'origin') ? "" : "01" == d.dataType ? KDApi.getLangMsg(model, "elementquote") : KDApi.getLangMsg(model, "riskquote");
          });

        nodeEnter.append("text")
          .attr("x", function (d) {
            return '170';
          })
          .attr("dy", function (d) {
            return '40';
          })
          .attr("text-anchor", 'middle')
          .attr("class", "linkname")
          .style("fill", "black")
          .style('font-size', 12)
          .text(function (d) {
            return (d.name == 'origin') ? "" : "01" == d.dataType ? "" : d.riskType;
          })
          .on("click", itemClick);


        // Transition nodes to their new position.原有节点更新到新位置
        var nodeUpdate = node.transition()
          .duration(duration)
          .attr('transform', function (d) {
            return 'translate(' + d.y + ',' + d.x + ')';
          });
        nodeUpdate.select('circle')
          .attr('r', function (d) {
            return (d.name == 'origin') ? 0 : (hasChildNodeArr.indexOf(d) == -1) ? 0 : 6;
          })
          .attr('cx', function (d) {
            return 251;
          })
          .attr('cy', function (d) {
            return (d.name == 'origin') ? 0 : 15;
          })
          .style('fill', function (d) {
            return hasChildNodeArr.indexOf(d) != -1 ? "#fff" : "";
            // if (d._children || d.children) { return "#fff"; } else { return "rgba(0,0,0,0)"; }
          })
          .style('stroke', function (d) {
            return hasChildNodeArr.indexOf(d) != -1 ? "#8b4513" : "";
            // if (d._children || d.children) { return "#8b4513"; } else { return "rgba(0,0,0,0)"; }
          })
          .style('fill-opacity', function (d) {
            if (d.children) {
              return 0.35;
            }
          })
          // Setting summary node style as class as mass style setting is
          // not compatible to circles.
          .style('stroke-width', function (d) {
            if (d.repeated) {
              return 5;
            }
          });
        //代表是否展开的+-号
        nodeEnter.append("svg:text")
          .attr("class", "isExpand")
          .attr("x", "251")
          .attr("dy", function (d) {
            return 18;
          })
          .attr("text-anchor", "middle")
          .style("fill", "#000")
          .text(function (d) {
            if (d.name == 'origin') {
              return '';
            }
            return hasChildNodeArr.indexOf(d) != -1 ? "+" : "";
            /* if (d._children || d.children) {
              return "+";
            } */
          })
          .on('click', click);

        nodeUpdate.select('text').style('fill-opacity', 1);

        var nodeExit = node.exit().transition()
          .duration(duration)
          .attr('transform', function (d) {
            return 'translate(' + source.y + ',' + source.x + ')';
          })
          .remove();
        nodeExit.select('circle')
          .attr('r', 1e-6);
        nodeExit.select('text')
          .style('fill-opacity', 1e-6);

        var link = g.selectAll('path.' + link_class)
          .data(links, function (d) {
            return d.target.id;
          });

        link.enter().insert('path', 'g')
          .attr('class', link_class)
          .attr('stroke', function (d) {
            return '#8b4513';
          })
          .attr('fill', "none")
          .attr('stroke-width', '1px')
          .attr('opacity', 0.5)
          .attr('d', function (d) {
            var o = {
              x: source.x0,
              y: source.y0
            };
            return pathFunc({
              source: o,
              target: o
            });
          })
          .attr("marker-end", function (d) {
            return "url(#resolvedDown)";
          }) //根据箭头标记的id号标记箭头;
          .attr("id", function (d, i) {
            return "mypath" + i;
          });
        link.transition()
          .duration(duration)
          .attr('d', pathFunc);
        link.exit().transition()
          .duration(duration)
          .attr('d', function (d) {
            var o = {
              x: source.x,
              y: source.y
            };
            return pathFunc({
              source: o,
              target: o
            });
          })
          .remove();
        nodes.forEach(function (d) {
          d.x0 = d.x;
          d.y0 = d.y;
        });

        function itemClick(d) {
          var params = null;
          if (d.rootname) {
            params = {
              "dataType": "01",
              "eleNumber": d.rootnumber,
              "id": d.rootid
            }
          } else {
            params = {
              "dataType": d.dataType,
              "eleNumber": d.eleNumber,
              "id": d.pkid
            };
          }
          model.invoke('click', params);
        }

        function Change_modal() {
          _this.Modal = true
        }
        function click(d) {
          if (forUpward) {

          } else {
            if (d._children) {
              console.log('对外投资--ok')
            } else {
              console.log('对外投资--no')
            }
          }
          isExpand = !isExpand;

          if (d.name == 'origin') {
            return;
          }
          if (d.children) {
            d._children = d.children;
            d.children = null;
            d3.select(this).text('+')
          } else {
            d.children = d._children;
            d._children = null;
            // expand all if it's the first node
            if (d.name == 'origin') {
              d.children.forEach(expand);
            }
            d3.select(this).text('-')
          }
          update(d, originalData, g);
        }
      }

      function expand(d) {
        if (d._children) {
          d.children = d._children;
          d.children.forEach(expand);
          d._children = null;
        }
      }


      function collapse(d) {
        if (d.children && d.children.length != 0) {
          d._children = d.children;
          d._children.forEach(collapse);
          d.children = null;
          hasChildNodeArr.push(d);
        }
      }


      function redraw() {
        treeG.attr('transform', 'translate(' + d3.event.translate + ')' +
          ' scale(' + d3.event.scale + ')');
      }

      function disableRightClick() {
        // stop zoom
        if (d3.event.button == 2) {
          console.log('No right click allowed');
          d3.event.stopImmediatePropagation();
        }
      }


      function sortByDate(a, b) {
        var aNum = a.name.substr(a.name.lastIndexOf('(') + 1, 4);
        var bNum = b.name.substr(b.name.lastIndexOf('(') + 1, 4);
        return d3.ascending(aNum, bNum) ||
          d3.ascending(a.name, b.name) ||
          d3.ascending(a.id, b.id);
      }
    };

    var d3GenerationChart = new treeChart(d3);
    d3GenerationChart.drawChart();

  };

  var funLine = function (obj) {  //折线
    var s = obj.source;
    //	console.log('获取折线对象1：'+s.y);
    var sy = (s.name == 'origin' ? s.y + 27 : s.y + 197);
    //	console.log('获取折线对象2：'+sy);
    var t = obj.target;
    var ty = (t.name == 'origin' ? t.y + 110 : t.y + 85);
    // t.x = (t.name == 'origin' ? t.x + 20 : t.x);
    return "M" + (sy+60) + "," + (s.x + 15) + "L" + (sy + (ty - sy) / 2) + "," + (s.x + 15) + "L" + (sy + (ty - sy) / 2) + "," + (t.x + 15) + "L" + ty + "," + (t.x + 15);

  }

  var initEvent = function (model, props) {
    $(model.dom).attr("data-page-id", model.pageId + '_' + model.key);
    $(model.dom).find('product_tree').click(function () {
      //			var value  = $('[data-page-id="' + model.pageId+'_'+"demoinput" + '"]').find('input').val();
      model.invoke('click', "xxx");
    });

    //var rootData = getData();
    var rootData = props.data;
    var rootName = props.data.downward.rootname;
    var rootNumber = props.data.downward.rootnumber;
    var rootId = props.data.downward.rootid;
    //var rootName = '某某某莫某有限公司';
    drawing(rootName, rootData, rootNumber, model, rootId);
  }
  KDApi.register('element', MyComponent, {isMulLang: true})
})(window.KDApi, jQuery);