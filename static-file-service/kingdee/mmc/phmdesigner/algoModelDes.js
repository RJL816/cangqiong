

function initialPHM(container,phmPagModel)
{
	if (!mxClient.isBrowserSupported())
	{
		mxUtils.error('该浏览器不支持mxGraph', 200, false);
	}
	else
	{
        // var id=Math.random();
        // var tbContainer = document.createElement('tbContainer');
        // tbContainer.id = id;
        // // 添加子容器
        // container.appendChild(tbContainer);  
        // tbContainer.style.position = 'absolute';
        // tbContainer.style.overflow = 'hidden';
        // tbContainer.style.padding = '2px';
        // tbContainer.style.left = '0px';
        // tbContainer.style.top = '0px';
        // tbContainer.style.width = '24px';
        // tbContainer.style.bottom = '0px';
        // var toolbar = new mxToolbar(tbContainer);
        // toolbar.enabled = false
        
        // Creates the div for the graph
        
        mxConnectionHandler.prototype.connectImage = new mxImage('kingdee/mmc/phmdesigner/src/images/connector.gif', 16, 16);
		container.style.position = 'absolute';
		container.style.overflow = 'hidden';
		container.style.left = '0px';
		container.style.top = '0px';
		container.style.right = '0px';
		container.style.bottom = '0px';
		container.style.background = 'url("kingdee/mmc/phmdesigner/src/images/grid.gif")';
		if (mxClient.IS_QUIRKS) {
			// new mxDivResizer(tbContainer);
			new mxDivResizer(container);
		}
		var model = new mxGraphModel();
		var graph = new mxGraph(container, model);
		graph.setConnectable(true);
		graph.setMultigraph(false);
		
		// 连线样式
		var style = graph.getStylesheet().getDefaultEdgeStyle();
		style[mxConstants.STYLE_ROUNDED] = true;
		style[mxConstants.STYLE_EDITABLE] = 0;
		style[mxConstants.STYLE_STROKECOLOR] ='#979797';
		style[mxConstants.STYLE_EDGE] = mxEdgeStyle.ElbowConnector;
		// 显示细胞位置标尺
		mxGraphHandler.prototype.guidesEnabled = true;
		var keyHandler = new mxKeyHandler(graph);
		keyHandler.bindKey(46, function () {
			var selectionCells = graph.getSelectionCells();
			if (!selectionCells) return;
			var ids = new Array();
			for (let index = 0; index < selectionCells.length; index++) {
				const root = selectionCells[index];
				ids.push(root.getId());
			}
			phmPagModel.invoke("deleteConfirm", ids);
		});
		graph.getModel().addListener(mxEvent.CHANGE, function (sender, evt) {
			savePHMMxgraph(phmPagModel);
		});
		graph.container.setAttribute('tabindex', '0');
		// 保证点击画板使得焦点在画板上
		var graphFireMouseEvent = graph.fireMouseEvent;
		graph.fireMouseEvent = function (evtName, me, sender) {
		if (evtName == mxEvent.MOUSE_DOWN) {
			this.container.focus();
		}
		graphFireMouseEvent.apply(this, arguments);
	    };
		
		// 可多选
		new mxRubberband(graph);
		// 解决打开多个mxGraph导致obj instanceof mxCell为false的错误
		mxCodec.prototype.getId = function (obj) {
			var id = null;

			if (obj != null) {
				id = this.reference(obj);

				if (id == null) {
					id = obj.id;
					if (id != undefined) {
						if (id == null) {
							// Uses an on-the-fly Id
							id = mxCellPath.create(obj);
	
							if (id.length == 0) {
								id = 'root';
							}
						}
					}
				}
			}

			return id;
		};
        // 鼠标点击事件
        // graph.addListener(mxEvent.CLICK, function(sender, evt)
        // {
        //     var e = evt.getProperty('event'); // mouse event
        //     var cell = evt.getProperty('cell'); // cell may be null
        //     if (cell != null)
        //     {
        //     // 监听节点点击事件 传回ID到后台去进行 配置数据的切换
        //     var cellId = cell.getId();
        //     phmPagModel.invoke("selectCell",cellId);
        //     }
        // });

        // 新增节点之后触发事件
        // graph.addListener(mxEvent.ADD_CELLS , function(sender, evt)
        // {
        //     var cell = evt.properties.cells[0];
        //     if (cell != null) {
        //         var cellId = cell.getId();
        //         phmPagModel.invoke("selectCell",cellId);
        //     }
        // });

        
        // var rubberband = new mxRubberband(graph);
        // var addVertex = function(icon, w, h, style)
        // {
        // 	var vertex = new mxCell(null, new mxGeometry(0, 0, w, h), style);
        //     vertex.setVertex(true);
        
        // 	var img = addToolbarItem(graph, toolbar, vertex, icon);
        // 	img.enabled = true;
            
        // 	graph.getSelectionModel().addListener(mxEvent.CHANGE, function()
        // 	{
        // 		var tmp = graph.isSelectionEmpty();
        // 		mxUtils.setOpacity(img, (tmp) ? 100 : 20);
        // 		img.enabled = tmp;
        // 	});
        // };

        // addVertex('kingdee/mmc/phmdesigner/src/images/swimlane.gif', 120, 160, 'shape=swimlane;startSize=20;');
        // addVertex('kingdee/mmc/phmdesigner/src/images/rectangle.gif', 100, 40, '');
        // addVertex('kingdee/mmc/phmdesigner/src/images/rounded.gif', 100, 40, 'shape=rounded');
        // addVertex('kingdee/mmc/phmdesigner/src/images/ellipse.gif', 40, 40, 'shape=ellipse');
        // addVertex('kingdee/mmc/phmdesigner/src/images/rhombus.gif', 40, 40, 'shape=rhombus');
        // addVertex('kingdee/mmc/phmdesigner/src/images/triangle.gif', 40, 40, 'shape=triangle');
        // addVertex('kingdee/mmc/phmdesigner/src/images/cylinder.gif', 40, 40, 'shape=cylinder');
        // addVertex('kingdee/mmc/phmdesigner/src/images/actor.gif', 30, 40, 'shape=actor');

        // 鼠标事件
        graph.addMouseListener({
            // 鼠标down
            mouseDown : function (sender, evt) {
                console.log('mouseDown');
            },
            // 鼠标move
            mouseMove : function (sender, evt) {
                // console.log('mouseMove');
                // console.log(evt);
            },
            // 鼠标up
            mouseUp : function (sender, evt) {
                console.log('mouseUp');
                var cell = graph.getSelectionCell();
                // var isVertex = model.isVertex(cell); 节点
                // var isEdge = model.isEdge(cell); 连线
                if(cell != null) {
                    var cellId = cell.getId();
                    phmPagModel.invoke("selectCell",cellId);
                }
            },
            dragEnter : function (evt, state) {
                console.log(evt);
            },
            dragLeave : function (evt, state) {
                console.log(evt);
            },
        });

        

        // 禁止节点重命名
        graph.setCellsEditable(false);
    }
    mxEvent.disableContextMenu(container);
	return graph;
};


// 设置单元格value值
function setMxValue(model,paramsMap) {
	// value值
    var value = paramsMap["value"];
    var nodeId = paramsMap["nodeId"];
    var phmMgGraph = model.graph;
    var phmMgGraphModel = phmMgGraph.getModel();
	phmMgGraphModel.beginUpdate();
	try
	{
        var cell = phmMgGraphModel.getCell(nodeId);
        if (cell != null) {
            var isVertex = phmMgGraphModel.isVertex(cell);
            // var isEdge = phmMgGraphModel.isEdge(cell); 连线
            // 是否是节点元素
            if(isVertex) {
                cell.value = value;
                console.log("cell--value:"+cell.value+",isVertex:"+isVertex);
                phmMgGraph.refresh() // 刷新
            }
        }
		
	}
	finally
	{
		phmMgGraphModel.endUpdate();
    }
    savePHMMxgraph(model);
};

// 监听键盘Del点击事件，删除当前点击元素
// $(document).keydown(function(event){
// 　　if(event.keyCode == 46){
// 　　　　var selectionCells = mgGraph.getSelectionCells();
// 		if (!selectionCells) return;
//         mgGraph.removeCells(selectionCells, true);
// 　　}
// });