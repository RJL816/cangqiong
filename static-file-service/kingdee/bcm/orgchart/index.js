(function (KDApi, $) {
    // 构造函数
    function MyComponent(model) {
        this._setModel(model)
    }

    let myRectHeight = 60;
    MyComponent.prototype = {
        // 绑定model
        _setModel: function (model) {
            this.model = model
        },

        // 生命周期：初始化
        init: function (props) {
        },
        // 生命周期：更新
        update: function (props) {
			if (this.tree && !props.data.rootNode) {
				if(props.data.showMinShareHolding){
					this.tree.minShareHolding = props.data.showMinShareHolding;
				}
				this.tree.drawChart({
					type: props.data.type?props.data.type:this.tree.type,// 'fold' 'all'
				});
			} else if(props.data){
				setHtml(this, props)
			}
        },
        // 生命周期：销毁
        destoryed: function () {
            this.tree = null;
        }

    }

    //初始化编辑器
    var setHtml = function (myComponent, props) {
        let model = myComponent.model;
        KDApi.loadFile("d3.v7.min.js", model, function () {
            myComponent.tree = new StockTree({
                el: "#" + model.dom.getAttribute("id"),  // 宿主元素
                originTreeData: props.data.rootNode, // 数据
                type: props.data.type,// 'fold' 'all'
                minShareHolding: props.data.showMinShareHolding
            });
        })
    }

    // 股权树
    class StockTree {
        constructor(options) {
            // 树的源数据
            this.originTreeData = options.originTreeData?options.originTreeData:{};
            // 宿主元素选择器
            this.el = options.el;
            // 展示少数持股
            this.minShareHolding = options.minShareHolding?options.minShareHolding:"show";
            // 是否全部展示
            this.type = options.type?options.type:"fold";

            this.nodeClickEvent = options.nodeClickEvent || function (e, d) {
                if (d.depth == 0) {
                    if (!this.type || this.type == 'fold') {
                        this.drawChart({
                            type: 'all',
                        });
                        this.type = 'all';
                    } else {
                        this.drawChart({
                            type: 'fold',
                        });
                        this.type = 'fold';
                    }
                }
            }
            // 一些配置项
            this.config = {
                // 节点的横向距离
                dx: 200,
                // 节点的纵向距离
                dy: 180,
                // svg的viewBox的宽度
                width: 0,
                // svg的viewBox的高度
                height: 0,
                // 节点的矩形框宽度
                rectWidth: 190,
                // 节点的矩形框高度
                rectHeight: myRectHeight,
                // 字体大小
                fontSize: 10,
                // 公司名称字体大小
                nameFontSize: 11,
                // 根节点公司名称字体大小
                rootFontSize: 12,
                // 线颜色
                lineColor: "#D9D9D9",
                // 根节点颜色
                rootColor: "#3982F7",
                // 控股节点外边宽颜色
                ctrlRectColor: "#D9D9D9",
                // 外部组织外边框颜色
                shareRectColor: "#2F6ED2",
                // 外部组织外边框颜色
                arrowColor: "#3982F7",
            };
            this.svg = null;
            this.gAll = null;
            this.gLinks = null;
            this.gNodes = null;
            // 给树加坐标点的方法
            this.tree = null;
            // 投资公司树的根节点
            this.rootOfDown = null;
            // 股东树的根节点
            this.rootOfUp = null;

            this.drawChart = function (options) {
                // 宿主元素的d3选择器对象
                let host = d3.select(this.el);
                // 宿主元素的DOM，通过node()获取到其DOM元素对象
                let dom = host.node();
                // 宿主元素的DOMRect
                let domRect = dom.getBoundingClientRect();
                this.config.width = domRect.width;
                this.config.height = domRect.height;

                let oldSvg = d3.select('svg')
                // 如果宿主元素中包含svg标签了，那么则删除这个标签，再重新生成一个
                if (!oldSvg.empty()) {
                    oldSvg.remove();
                }
                if (Object.keys(this.originTreeData).length == 0) {
                    return;
                }

                const svg = d3
                    .create("svg")
                    .attr("viewBox", () => {
                        let parentsLength = this.originTreeData.parents ? this.originTreeData.parents.length : 0;
                        return [
                            -this.config.width / 2,
                            parentsLength > 0 && this.minShareHolding == 'show'? -this.config.height / 3 - myRectHeight : -this.config.height / 3,
                            this.config.width,
                            this.config.height,
                        ]
                    })
                    .style("user-select", "none")
                    .style("cursor", "move");

                // 包括连接线和节点的总集合
                const gAll = svg.append("g").attr("id", "all");
                svg.call(
                    d3
                        .zoom()
                        .scaleExtent([0.05, 5]) // 缩放范围
                        .on("zoom", (e) => {
                            gAll.attr("transform", () => {
                                return `translate(${e.transform.x},${e.transform.y}) scale(${e.transform.k})`;
                            });
                        })
                ).on("dblclick.zoom", null);// 取消默认的双击放大事件

                this.gAll = gAll;
                // 连接线集合
                this.gLinks = gAll.append("g").attr("id", "linkGroup");
                // 节点集合
                this.gNodes = gAll.append("g").attr("id", "nodeGroup");
                // 设置好节点之间距离的tree方法
                this.tree = d3.tree().nodeSize([this.config.dx, this.config.dy]);

                this.rootOfDown = d3.hierarchy(this.originTreeData, (d) => d.children);
                this.rootOfUp = d3.hierarchy(this.originTreeData, (d) => d.parents);
                this.tree(this.rootOfDown);

                [this.rootOfDown.descendants(), this.rootOfUp.descendants()].forEach((nodes) => {
                    nodes.forEach((node) => {
                        node._children = node.children || null;
                        if (options.type === 'all') {
                            //如果是all的话，则表示全部都展开
                            node.children = node._children;
                        } else if (options.type === 'fold') { //如果是fold则表示除了父节点全都折叠
                            // 将非根节点的节点都隐藏掉（其实对于这个组件来说加不加都一样）
                            if (node.depth) {
                                node.children = null;
                            }
                        }
                    });
                });

                //箭头(下半部分)
                svg
                    .append("marker")
                    .attr("id", "markerOfDown")
                    .attr("markerUnits", "userSpaceOnUse")
                    .attr("viewBox", "0 -5 10 10") //坐标系的区域
                    .attr("refX", 5) //箭头坐标
                    .attr("refY", 0)
                    .attr("markerWidth", 10) //标识的大小
                    .attr("markerHeight", 10)
                    .attr("orient", "90") //绘制方向，可设定为：auto（自动确认方向）和 角度值
                    .attr("stroke-width", 2) //箭头宽度
                    .append("path")
                    .attr("d", "M0,-5L10,0L0,5") //箭头的路径
                    .attr("fill", this.config.arrowColor); //箭头颜色

                //箭头(上半部分)
                svg
                    .append("marker")
                    .attr("id", "markerOfUp")
                    .attr("markerUnits", "userSpaceOnUse")
                    .attr("viewBox", "0 -5 10 10") //坐标系的区域
                    .attr("refX", 5) //箭头坐标
                    .attr("refY", 0)
                    .attr("markerWidth", 10) //标识的大小
                    .attr("markerHeight", 10)
                    .attr("orient", "90") //绘制方向，可设定为：auto（自动确认方向）和 角度值
                    .attr("stroke-width", 2) //箭头宽度
                    .append("path")
                    .attr("d", "M0,-5L10,0L0,5") //箭头的路径
                    .attr("fill", this.config.arrowColor); //箭头颜色

                //箭头(下级指向上级)
                svg
                    .append("marker")
                    .attr("id", "markerOfminHoldingsUp")
                    .attr("markerUnits", "userSpaceOnUse")
                    .attr("viewBox", "0 -5 10 10") //坐标系的区域
                    .attr("refX", 5) //箭头坐标
                    .attr("refY", 0)
                    .attr("markerWidth", 10) //标识的大小
                    .attr("markerHeight", 10)
                    .attr("orient", "-90") //绘制方向，可设定为：auto（自动确认方向）和 角度值
                    .attr("stroke-width", 2) //箭头宽度
                    .append("path")
                    .attr("d", "M0,-5L10,0L0,5") //箭头的路径
                    .attr("fill", this.config.arrowColor); //箭头颜色

                this.svg = svg;
                this.update();
                // 将svg置入宿主元素中
                host.append(function () {
                    return svg.node();
                });
            };
            this.drawChart({
                type: this.type,
            });
        }


        // 更新数据
        update(source) {
            if (!source) {
                source = {
                    x0: 0,
                    y0: 0,
                };
                // 设置根节点所在的位置（原点）
                this.rootOfDown.x0 = 0;
                this.rootOfDown.y0 = 0;
                this.rootOfUp.x0 = 0;
                this.rootOfUp.y0 = 0;
            }

            let nodesOfDown = this.rootOfDown.descendants().reverse();
            let linksOfDown = this.rootOfDown.links();
            let nodesOfUp = [];

            let linksOfUp = [];
            // 收集所有的少数股东 key 少数被投的单位 的id  ，value 当前节点 source

            if (this.minShareHolding == 'show') {
                nodesOfUp = this.rootOfUp.descendants().reverse();
                var map = {};
                for (var obj of this.rootOfDown) {
                    if (obj.data.minHolders) {
                        var minHoldingsDatas = obj.data.minHolders;
                        for (var key in minHoldingsDatas) {
                            if (!map[key]) {
                                map[key] = [];
                            }
                            map[key].push(obj)
                        }
                    }
                }
                // 遍历取被少数投的单位
                for (var sourceObj of this.rootOfDown) {
                    if (map[sourceObj.data.id]) {
                        for (const targetObj of map[sourceObj.data.id]) {
                            linksOfUp.push({source: sourceObj, target: targetObj})
                        }
                    }
                }
                for (var sourceObj of this.rootOfUp) {
                    if (sourceObj.depth != 0 && map[sourceObj.data.id]) {
                        for (const targetObj of map[sourceObj.data.id]) {
                            linksOfUp.push({source: sourceObj, target: targetObj})
                        }
                    }
                }
            }

            this.tree(this.rootOfDown);
            this.tree(this.rootOfUp);

            const myTransition = this.svg.transition().duration(50);

            /***  绘制子公司树  ***/
            const node1 = this.gNodes
                .selectAll("g.nodeOfDownItemGroup")
                .data(nodesOfDown, (d) => {
                    return d.data.id;
                });

            const node1Enter = node1
                .enter()
                .append("g")
                .attr("class", "nodeOfDownItemGroup")
                .attr("transform", (d) => {
                    return `translate(${source.x0},${source.y0})`;
                })
                .attr("fill-opacity", 0)
                .attr("stroke-opacity", 0)
                .style("cursor", "pointer");

            // 外层的矩形框
            node1Enter
                .append("rect")
                .attr("width", d=>{
                    if (d.depth === 0) {
                        return 220;
                    }
                    return this.config.rectWidth;
                })
                .attr("height", this.config.rectHeight)
                .attr("x", d=>{
                    if (d.depth === 0) {
                        return -110;
                    }
                    return -this.config.rectWidth / 2;
                })
                .attr("y", -this.config.rectHeight / 2)
                .attr("rx", 4)
                .attr("stroke-width", 1)
                .attr("stroke", (d) => {
                    if (d.depth === 0) {
                        return this.config.rootColor;
                    }
                    return  this.config.ctrlRectColor;
                })
                .attr("fill", (d) => {
                    if (d.depth === 0) {
                        return this.config.rootColor;
                    }
                    return "#FFFFFF";
                })
                .on("click", (e, d) => {
                    this.nodeClickEvent(e, d)
                }); // todo 加悬浮事件，展示公司全称

            // 编码
            node1Enter
                .append("text")
                .attr("class", "main-title")
                .attr("x", 0)
                .attr("y", -14)
                .attr("text-anchor", "middle")
                .text((d) => {
                    return d.data.id;
                })
                .attr("fill", (d) => {
                    if (d.depth === 0) {
                        return "#FFFFFF";
                    }
                    return "#000000";
                })
                .style("font-size", this.config.fontSize)
                // .style('font-family', '黑体')
                .style("font-weight", "bold");

            // 文本主标题
            node1Enter
                .append("text")
                .attr("class", "main-title")
                .attr("x", 0)
                .attr("y", 5)
                .attr("text-anchor", "middle")
                .text((d) => {
                    return d.data.name.length > 16
                        ? d.data.name.substring(0, 16)
                        : d.data.name;
                })
                .attr("fill", (d) => {
                    if (d.depth === 0) {
                        return "#FFFFFF";
                    }
                    return "#000000";
                })
                .style("font-size", d=>{
                    if (d.depth === 0) {
                        return this.config.rootFontSize;
                    }
                    return this.config.nameFontSize
                })
                // .style('font-family', '黑体')
                .style("font-weight", "bold");
            // 副标题
            node1Enter
                .append("text")
                .attr("class", "sub-title")
                .attr("x", 0)
                .attr("y", 24)
                .attr("text-anchor", "middle")
                .text((d) => {
                    let subTitle = d.data.name.substring(16);
                    if (subTitle.length > 16) {
                        return subTitle.substring(0, 15) + "...";
                    }
                    return subTitle;
                })
                .attr("fill", (d) => {
                    if (d.depth === 0) {
                        return "#FFFFFF";
                    }
                    return "#000000";
                })
                .style("font-size", d=>{
                    if (d.depth === 0) {
                        return this.config.rootFontSize;
                    }
                    return this.config.nameFontSize
                })
                // .style('font-family', '黑体')
                .style("font-weight", "bold");

            // 控股比例
            node1Enter
                .append("text")
                .attr("class", "percent")
                .attr("x", 12)
                .attr("y", -45)
                .text((d) => {
                    if (d.depth !== 0) {
                        return d.data.percent;
                    }
                })
                .attr("fill",  "#000000")
                // .style('font-family', '黑体')
                .style("font-size", this.config.fontSize);

            // 增加展开按钮
            const expandBtnG = node1Enter
                .append("g")
                .attr("class", "expandBtn")
                .attr("transform", (d) => {
                    return `translate(${0},${this.config.rectHeight / 2})`;// 位置
                })
                .style("display", (d) => {
                    // 如果是根节点，不显示
                    if (d.depth === 0) {
                        return "none";
                    }
                    // 如果没有子节点，则不显示
                    if (!d._children) {
                        return "none";
                    }
                })
                .on("click", (e, d) => {
                    if (d.children) {
                        d._children = d.children;
                        d.children = null;
                    } else {
                        d.children = d._children;
                    }
                    this.update(d);
                });

            expandBtnG
                .append("circle")
                .attr("r", 8)
                .attr("fill", this.config.rootColor)
                .attr("cy", 8);

            expandBtnG
                .append("text")
                .attr("text-anchor", "middle")
                .attr("fill", "#ffffff")
                .attr("y", 13)
                .style('font-size', 16)
                // .style('font-family', '微软雅黑')
                .text((d) => {
                    return d.children ? "-" : "+"
                });

            const link1 = this.gLinks
                .selectAll("path.linkOfDownItem")
                .data(linksOfDown, (d) => d.target.data.id);

            const link1Enter = link1
                .enter()
                .append("path")
                .attr("class", "linkOfDownItem")
                .attr("d", (d) => {
                    let o = {
                        source: {
                            x: source.x0,
                            y: source.y0,
                        },
                        target: {
                            x: source.x0,
                            y: source.y0,
                        },
                    };
                    return this.drawLinkL(o);
                })
                .attr("fill", "none")
                .attr("stroke", this.config.lineColor)
                .attr("stroke-width", 1)
                .attr("marker-end", "url(#markerOfDown)");

            // 有元素update更新和元素新增enter的时候
            node1
                .merge(node1Enter)
                .transition(myTransition)
                .attr("transform", (d) => {
                    return `translate(${d.x},${d.y})`;// 显示时的变化
                })
                .attr("fill-opacity", 1) // 显示元素
                .attr("stroke-opacity", 1);// 显示元素

            // 有元素消失时
            node1
                .exit()
                .transition(myTransition)
                .remove()
                .attr("transform", (d) => {
                    return `translate(${source.x0},${source.y0})`;
                })
                .attr("fill-opacity", 0) // 隐藏元素
                .attr("stroke-opacity", 0); // 隐藏元素

            link1.merge(link1Enter).transition(myTransition).attr("d", this.drawLinkL);

            link1
                .exit()
                .transition(myTransition)
                .remove()
                .attr("d", (d) => {
                    let o = {
                        source: {
                            x: source.x,
                            y: source.y,
                        },
                        target: {
                            x: source.x,
                            y: source.y,
                        },
                    };
                    return this.drawLinkL(o);
                });

            /***  绘制股东树  ***/

            nodesOfUp.forEach(node => {
                node.y = -node.y
            })

            const node2 = this.gNodes
                .selectAll("g.nodeOfUpItemGroup")
                .data(nodesOfUp, (d) => {
                    return d.data.id;
                });

            const node2Enter = node2
                .enter()
                .append("g")
                .attr("class", "nodeOfUpItemGroup")
                .attr("transform", (d) => {
                    return `translate(${source.x0},${source.y0})`;
                })
                .attr("fill-opacity", 0)
                .attr("stroke-opacity", 0)
                .style("cursor", "pointer")
                .on("click", (e, d) => {
                    this.nodeClickEvent(e, d)
                });

            // 外层的矩形框
            node2Enter
                .append("rect")
                .attr("width", d=>{
                    if (d.depth === 0) {
                        return 220;
                    }
                    return this.config.rectWidth;
                })
                .attr("height", this.config.rectHeight)
                .attr("x", d=>{
                    if (d.depth === 0) {
                        return -110;
                    }
                    return -this.config.rectWidth / 2;
                })
                .attr("y", -this.config.rectHeight / 2)
                .attr("rx", 4)
                .attr("stroke-width", 1)
                .attr("stroke", (d) => {
                    if (d.depth === 0) {
                        return this.config.rootColor;
                    }
                    return this.config.shareRectColor;
                })
                .attr("fill", (d) => {
                    if (d.depth === 0) {
                        return this.config.rootColor;
                    }
                    return "#FFFFFF";
                });

            // 文本主标题
            node2Enter
                .append("text")
                .attr("class", "main-title")
                .attr("x", 0)
                .attr("y", -14)
                .attr("text-anchor", "middle")
                .text((d) => {
                    return d.data.id;
                })
                .attr("fill", (d) => {
                    if (d.depth === 0) {
                        return "#FFFFFF";
                    }
                    return "#000000";
                })
                .style("font-size", this.config.fontSize)
                // .style('font-family', '黑体')
                .style("font-weight", "bold");
            // 文本主标题
            node2Enter
                .append("text")
                .attr("class", "main-title")
                .attr("x", 0)
                .attr("y", 5)
                .attr("text-anchor", "middle")
                .text((d) => {
                    return d.data.name.length > 16
                        ? d.data.name.substring(0, 16)
                        : d.data.name;
                })
                .attr("fill", (d) => {
                    if (d.depth === 0) {
                        return "#FFFFFF";
                    }
                    return "#000000";
                })
                .style("font-size", d=>{
                    if (d.depth === 0) {
                        return this.config.rootFontSize;
                    }
                    return this.config.nameFontSize
                })
                // .style('font-family', '黑体')
                .style("font-weight", "bold");
            // 副标题
            node2Enter
                .append("text")
                .attr("class", "sub-title")
                .attr("x", 0)
                .attr("y", 24)
                .attr("text-anchor", "middle")
                .text((d) => {
                    let subTitle = d.data.name.substring(16);
                    if (subTitle.length > 16) {
                        return subTitle.substring(0, 15) + "...";
                    }
                    return subTitle;
                })
                .attr("fill", (d) => {
                    if (d.depth === 0) {
                        return "#FFFFFF";
                    }
                    return "#000000";
                })
                .style("font-size", d=>{
                    if (d.depth === 0) {
                        return this.config.rootFontSize;
                    }
                    return this.config.nameFontSize
                }) // 字体大小
                // .style('font-family', '黑体')
                .style("font-weight", "bold");

            // 增加展开按钮
            const expandBtnG2 = node2Enter
                .append("g")
                .attr("class", "expandBtn")
                .attr("transform", (d) => {
                    return `translate(${0},${-this.config.rectHeight / 2})`; // 在对应点的上方或下方
                })
                .style("display", (d) => {
                    // 如果是根节点，不显示
                    if (d.depth === 0) {
                        return "none";
                    }
                    // 如果没有子节点，则不显示
                    if (!d._children) {
                        return "none";
                    }
                })
                .on("click", (e, d) => {
                    if (d.children) {
                        d._children = d.children;
                        d.children = null;
                    } else {
                        d.children = d._children;
                    }
                    this.update(d);// 重新渲染图形
                });

            expandBtnG2
                .append("circle")
                .attr("r", 8)
                .attr("fill", "#7A9EFF")
                .attr("cy", -8);

            expandBtnG2
                .append("text")
                .attr("text-anchor", "middle")
                .attr("fill", "#ffffff")
                .attr("y", -3)
                .style('font-size', 16)
                // .style('font-family', '微软雅黑')
                .text((d) => {
                    return d.children ? "-" : "+"
                });

            // 上方的数据
            const link2 = this.gLinks
                .selectAll("path.linkOfUpItem")
                .data(linksOfUp, (d) => d.target.data.id);

            const link2Enter = link2
                .enter()
                .append("path")
                .attr("class", "linkOfUpItem")
                .attr("id", d => {
                    return d.source.data.id + "->" + d.target.data.id;
                })
                .attr("d", (d) => {
                    let o = {
                        source: {
                            x: source.x0,
                            y: source.y0,
                        },
                        target: {
                            x: source.x0,
                            y: source.y0,
                        },
                    };

                    return this.drawLinkC(o);
                })
                .attr("fill", "none")
                .attr("stroke", this.config.lineColor)
                .attr("stroke-width", 1)
                .attr("stroke-dasharray", "2 2")
                .attr("marker-end", d => {
                    if (d.source.y > d.target.y) {
                        return "url(#markerOfminHoldingsUp)";
                    }
                    return "url(#markerOfUp)";
                });

            if (!source.data) {
                link2.enter()
                    .append("text")
                    .attr("x", d => {
                        return Math.floor(Math.random() * 90) - 90
                    })
                    // 给text添加textPath元素
                    .append("textPath")
                    // 给textPath设置path的引用
                    .attr("xlink:href", d => {
                        return "#" + d.source.data.id + "->" + d.target.data.id;
                    })
                    // 字体居中
                    .style("text-anchor", "end")
                    .attr("startOffset", "100%")
                    // 父节点的name
                    .style("fill", this.config.rootColor)
                    .text(function (d) {
                        return d.target.data.minHolders[d.source.data.id];
                    })
                    // .style('font-family', '黑体')
                    .style("font-size", this.config.fontSize);
            }

            // 有元素update更新和元素新增enter的时候
            node2
                .merge(node2Enter)
                .transition(myTransition)
                .attr("transform", (d) => {
                    return `translate(${d.x},${d.y})`;
                })
                .attr("fill-opacity", 1)
                .attr("stroke-opacity", 1);

            // 有元素消失时
            node2
                .exit()
                .transition(myTransition)
                .remove()
                .attr("transform", (d) => {
                    return `translate(${source.x0},${source.y0})`;
                })
                .attr("fill-opacity", 0)
                .attr("stroke-opacity", 0);

            //有元素update更新和元素新增enter的时候
            link2.merge(link2Enter).transition(myTransition).attr("d", this.drawLinkC);

            const singleRemove = {};
            // 有元素消失时
            link2
                .exit()
                .remove()
                .attr("d", (d) => {
                    d3.selectAll('text')._groups[0].forEach(dom => {
                        if (dom.getAttribute('id') == "txt" + d.source.data.id + "->" + d.target.data.id) {
                            singleRemove["txt" + d.source.data.id + "->" + d.target.data.id] = dom;
                        }
                    })
                    let o = {
                        source: {
                            x: source.x,
                            y: source.y,
                        },
                        target: {
                            x: source.x,
                            y: source.y,
                        },
                    };
                    return this.drawLinkC(o);
                });
            for (var dom in singleRemove) {
                singleRemove[dom].remove();
            }

            // node数据改变的时候更改一下加减号
            const expandButtonsSelection = d3.selectAll('g.expandBtn')

            expandButtonsSelection.select('text').transition().text((d) => {
                return d.children ? "-" : "+";
            })

            this.rootOfDown.eachBefore((d) => {
                d.x0 = d.x;
                d.y0 = d.y;
            });
            this.rootOfUp.eachBefore((d) => {
                d.x0 = d.x;
                d.y0 = d.y;
            });
        }

        // 直角连接线 by wushengyuan
        drawLinkL({source, target}) {
            // 折线
            const halfDistance = (target.y - source.y - myRectHeight / 2) / 2;
            const halfY = source.y + halfDistance;
            return `M${source.x},${source.y + myRectHeight / 2} L${source.x},${halfY} ${target.x},${halfY} ${target.x},${target.y - myRectHeight / 2 - 5}`;
        }

        // 画贝塞尔线
        drawLinkC({source, target}) {
            // 同级
            if (source.depth == target.depth && source.y > 0) {
                const a = target.x - source.x > 0 ? 16 : -16
                const tx = target.x - source.x - a;
                return `M${source.x + a},${source.y - myRectHeight / 2} c${0},${-7 / 3 * myRectHeight} ${tx},${-7 / 3 * myRectHeight} ${tx},${-5}`;
            }
            // 从下往上
            if (target.y - source.y < 0) {
                const a = target.x - source.x > 0 ? 16 : -16
                const sx = source.x + a;
                const sy = source.y - myRectHeight / 2;
                const ty = target.y - source.y + myRectHeight;
                const tx = target.x - source.x - a;
                if (target.children) { // 有子节点
                    const tx = target.x - source.x - 2 * a;
                    return `M${sx},${sy} c${0},${ty - 2 * ty / 3} ${tx},${ty - 2 * ty / 3} ${tx},${ty + 5}`;
                }
                return `M${sx},${sy} c${0},${ty - 2 * ty / 3} ${tx},${ty - 2 * ty / 3} ${tx},${ty + 5}`;

            }
            // 从上往下
            const sx = source.x;
            const sy = source.y + myRectHeight / 2;
            const ty = target.y - source.y - myRectHeight;
            const tx = target.x - source.x;
            return `M${sx},${sy} c${0},${ty - 2 * ty / 3} ${tx},${ty - 2 * ty / 3} ${tx},${ty - 5}`;
        }

        // 展开所有的节点
        expandAllNodes() {
            this.drawChart({
                type: 'all',
            })
        }

        // 将所有节点都折叠
        foldAllNodes() {
            this.drawChart({
                type: 'fold',
            })
        }
    }

    // 注册自定义控件
    KDApi.register('orgchart', MyComponent)
})(window.KDApi, jQuery)
