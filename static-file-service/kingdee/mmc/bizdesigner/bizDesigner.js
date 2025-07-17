// 偏移量
var offsetX;
var offsetY;
var COMPONENT_TYPE = {
	ELEMENT: "phm_element_component",
	ADJUSTMENT: "phm_adjust_component",
	CONNECTION: "phm_connect_component",
	DETAIL: "phm_detail_component",
	QUERY: "phm_query_component",
	EIGEN: "phm_eigen_component",
	TXT: "phm_txt_component",
	CONTAINER: ""
};

var dragItem = {
	id: "",
	offsetX: 0,
	offsetY: 0,
	scrollX: 0,
	scrollY: 0,
	containerOffsetX: 0,
	containerOffsetY: 0,
	borderWidth: 4,
	cols: [],
	rows: []
}
function bizinitial(pageModel, container) {
	// 是否能够粘贴
	var pasteAble = false;
	var mgGraph;
	// 图片地址
	var imgsrc;
	// 组件名称
	var componentName;
	if (!mxClient.isBrowserSupported()) {
		mxUtils.error('该浏览器不支持mxGraph', 200, false);
	}
	else {
		mgGraph = null;
		mxConnectionHandler.prototype.connectImage = new mxImage('kingdee/mmc/bizdesigner/src/images/connector.gif', 16, 16);

		// Creates the div for the graph
		container.parentNode.style.background = 'url("kingdee/mmc/bizdesigner/src/images/grid.gif")';
		if (mxClient.IS_QUIRKS) {
			new mxDivResizer(container);
		}
		var model = new mxGraphModel();
		var graph = new mxGraph(container, model);
		// 旋转
		mxVertexHandler.prototype.livePreview = true;
		mxVertexHandler.prototype.rotationEnabled = true;
		mxVertexHandler.prototype.rotationHandleVSpacing = -12;
		// 设置旋转圆点位置
		mxVertexHandler.prototype.getRotationHandlePosition = function () {
			var padding = this.getHandlePadding();

			return new mxPoint(this.bounds.x + this.bounds.width - this.rotationHandleVSpacing + padding.x / 2,
				this.bounds.y + this.rotationHandleVSpacing - padding.y / 2)
		};
		graph.htmlLabels = true;
		// 回车后完成输入
		graph.setEnterStopsCellEditing(true)
		graph.setConnectable(false);
		graph.setMultigraph(false);
		graph.dropEnabled = true;
		graph.centerZoom = false;
		graph.edgeLabelsMovable = false;
		// 可折叠
		graph.foldingEnabled = false;
		new mxRubberband(graph);
		// 顶点选择边框的颜色
		mxConstants.VERTEX_SELECTION_COLOR = "#2b87f3";
		// 边缘选择边框的颜色
		mxConstants.EDGE_SELECTION_COLOR = "#2b87f3";
		// 手柄填充颜色的颜色
		mxConstants.HANDLE_FILLCOLOR = "#2b87f3";
		// 对齐线颜色
		mxConstants.GUIDE_COLOR = "#2b87f3";

		// 重写以定义每个形状的连接点
		graph.getAllConnectionConstraints = function (terminal, source) {
			if (terminal != null && terminal.shape != null) {
				if (terminal.shape.stencil != null) {
					if (terminal.shape.stencil != null) {
						return terminal.shape.stencil.constraints;
					}
				}
				else if (terminal.shape.constraints != null) {
					return terminal.shape.constraints;
				}
			}

			return null;
		};

		// 定义靶点
		mxShape.prototype.constraints = [
			new mxConnectionConstraint(new mxPoint(0.5, 0), true),
			new mxConnectionConstraint(new mxPoint(0, 0.5), true),
			new mxConnectionConstraint(new mxPoint(1, 0.5), true),
			new mxConnectionConstraint(new mxPoint(0.5, 1), true)];

		graph.convertValueToString = function (cell) {
			if (cell.edge) {
				return ' ';
			} else {
				return cell.value;
			}
		};
		// 显示细胞位置标尺
		mxGraphHandler.prototype.guidesEnabled = true;
		var vertexStyle = graph.getStylesheet().getDefaultVertexStyle();
		vertexStyle[mxConstants.STYLE_ROUNDED] = true;
		vertexStyle[mxConstants.STYLE_FILLCOLOR] = "#FFFFFF";
		// 高亮显示
		new mxCellTracker(graph, '#2b87f3');

		// 连线样式
		var style = graph.getStylesheet().getDefaultEdgeStyle();
		style[mxConstants.STYLE_ROUNDED] = true;
		style[mxConstants.STYLE_EDGE] = mxEdgeStyle.ElbowConnector;
		style[mxConstants.STYLE_STROKEWIDTH] = "2";
		style[mxConstants.STYLE_STROKECOLOR] = "#000000";


		// 移动显示坐标
		mxGraphHandler.prototype.updateHint = function (me) {
			if (this.pBounds != null && (this.shape != null || this.livePreviewActive)) {
				if (this.hint == null) {
					this.hint = createHint();
					this.graph.container.appendChild(this.hint);
				}

				var t = this.graph.view.translate;
				var s = this.graph.view.scale;
				var x = this.roundLength((this.bounds.x + this.currentDx) / s - t.x);
				var y = this.roundLength((this.bounds.y + this.currentDy) / s - t.y);
				var unit = this.graph.view.unit;

				this.hint.innerHTML = formatHintText(x, unit) + ', ' + formatHintText(y, unit);

				this.hint.style.left = (this.pBounds.x + this.currentDx +
					Math.round((this.pBounds.width - this.hint.clientWidth) / 2)) + 'px';
				this.hint.style.top = (this.pBounds.y + this.currentDy +
					this.pBounds.height + 20) + 'px';
			}
		};

		/**
		 * Updates the hint for the current operation.
		 */
		mxGraphHandler.prototype.removeHint = function () {
			if (this.hint != null) {
				this.hint.parentNode.removeChild(this.hint);
				this.hint = null;
			}
		};

		/**
		 * Updates the hint for the current operation.
		 */
		mxVertexHandler.prototype.updateHint = function (me) {
			if (this.index != mxEvent.LABEL_HANDLE) {
				if (this.hint == null) {
					this.hint = createHint();
					this.state.view.graph.container.appendChild(this.hint);
				}

				if (this.index == mxEvent.ROTATION_HANDLE) {
					this.hint.innerHTML = this.currentAlpha + '&deg;';
				}
				else {
					var s = this.state.view.scale;
					var unit = this.state.view.unit;
					this.hint.innerHTML = formatHintText(this.roundLength(this.bounds.width / s), unit) + ' x ' +
						formatHintText(this.roundLength(this.bounds.height / s), unit);
				}

				var rot = (this.currentAlpha != null) ? this.currentAlpha : this.state.style[mxConstants.STYLE_ROTATION] || '0';
				var bb = mxUtils.getBoundingBox(this.bounds, rot);

				if (bb == null) {
					bb = this.bounds;
				}

				this.hint.style.left = bb.x + Math.round((bb.width - this.hint.clientWidth) / 2) + 'px';
				this.hint.style.top = (bb.y + bb.height + 20) + 'px';

				if (this.linkHint != null) {
					this.linkHint.style.display = 'none';
				}
			}
		};

		/**
		 * Updates the hint for the current operation.
		 */
		mxVertexHandler.prototype.removeHint = function () {
			mxGraphHandler.prototype.removeHint.apply(this, arguments);

			if (this.linkHint != null) {
				this.linkHint.style.display = '';
			}
		};

		/**
		 * Updates the hint for the current operation.
		 */
		mxEdgeHandler.prototype.updateHint = function (me, point) {
			if (this.hint == null) {
				this.hint = createHint();
				this.state.view.graph.container.appendChild(this.hint);
			}

			var t = this.graph.view.translate;
			var s = this.graph.view.scale;
			var x = this.roundLength(point.x / s - t.x);
			var y = this.roundLength(point.y / s - t.y);
			var unit = this.graph.view.unit;

			this.hint.innerHTML = formatHintText(x, unit) + ', ' + formatHintText(y, unit);
			this.hint.style.visibility = 'visible';

			if (this.isSource || this.isTarget) {
				if (this.constraintHandler.currentConstraint != null &&
					this.constraintHandler.currentFocus != null) {
					var pt = this.constraintHandler.currentConstraint.point;
					this.hint.innerHTML = '[' + Math.round(pt.x * 100) + '%, ' + Math.round(pt.y * 100) + '%]';
				}
				else if (this.marker.hasValidState()) {
					this.hint.style.visibility = 'hidden';
				}
			}

			this.hint.style.left = Math.round(me.getGraphX() - this.hint.clientWidth / 2) + 'px';
			this.hint.style.top = (Math.max(me.getGraphY(), point.y) + 20) + 'px';

			if (this.linkHint != null) {
				this.linkHint.style.display = 'none';
			}
		};

		/**
		 * Updates the hint for the current operation.
		 */
		mxEdgeHandler.prototype.removeHint = function () {
			mxGraphHandler.prototype.removeHint.apply(this, arguments);

			if (this.linkHint != null) {
				this.linkHint.style.display = '';
			}
		};


		/**
		 * Format pixels in the given unit
		 */
		function formatHintText(pixels, unit) {
			switch (unit) {
				case mxConstants.POINTS:
					return pixels;
				case mxConstants.MILLIMETERS:
					return (pixels / mxConstants.PIXELS_PER_MM).toFixed(1);
				case mxConstants.INCHES:
					return (pixels / mxConstants.PIXELS_PER_INCH).toFixed(2);
			}
		};


		function createHint() {
			var hint = document.createElement('div');
			hint.className = 'geHint';
			hint.style.whiteSpace = 'nowrap';
			hint.style.position = 'absolute';

			return hint;
		};

		// 重写，保证选择所有顶点只在第一层，不选择顶点的子顶点
		graph.selectCells = function (vertices, edges, parent, selectGroups) {
			parent = parent || this.getDefaultParent();

			var filter = mxUtils.bind(this, function (cell) {
				return this.view.getState(cell) != null &&
					(((selectGroups || cell.parent == parent) &&
						this.model.isVertex(cell) && vertices
						&& !this.model.isEdge(this.model.getParent(cell))) ||
						(this.model.isEdge(cell) && edges));
			});

			var cells = this.model.filterDescendants(filter, parent);

			if (cells != null) {
				this.setSelectionCells(cells);
			}
		};

		// 配置鼠标悬停时自动展开
		graph.popupMenuHandler.autoExpand = true;

		// 安装上下文菜单
		graph.popupMenuHandler.factoryMethod = function (menu, cell, evt) {

			if (graph.isRun) {
				if (cell != null && cell.componentType == COMPONENT_TYPE.EIGEN) {
					graph.isRightClick = true;
					menu.addItem('显示明细', null, function () {
						var params = {
							"eigenId": cell.id,
							"isShow": true
						};
						pageModel.invoke("showDetail", params);
					});
					// menu.addSeparator();
					menu.addItem('隐藏明细', null, function () {
						var params = {
							"eigenId": cell.id,
							"isShow": false
						};
						pageModel.invoke("showDetail", params);
					});

				}
				return;
			}
			if (cell != null) {
				addShortcut(menu.addItem('删除', null, function () {
					let selectionCells = new Array();
					selectionCells.push(cell);
					let ids = new Array();
					getAllCellId(selectionCells, ids);
					pageModel.invoke("confirmDelete", ids);
				}), "Delete");
				// menu.addSeparator();

				addShortcut(menu.addItem('复制', null, function () {
					let selectionCells = new Array();
					selectionCells.push(cell);
					var ids = new Array();
					getAllCellId(selectionCells, ids);
					mxClipboard.copy(graph, selectionCells);
					pageModel.invoke("copy", ids);
					pasteAble = true;
				}), "Ctrl+C");

				//hfxie 设计态添加功能:新增右键菜单项
				addShortcut(menu.addItem('置顶关联明细', null, function () {
					let params_detail = {
						"id": cell.id,
						"componentType": cell.componentType
					};
					pageModel.invoke("eigen_detail", params_detail);

				}), "");

			} else {
				if (!mxClipboard.isEmpty() && pasteAble) {
					menu.addItem('在这粘贴', null, function () {
						if (graph.isEnabled() && !graph.isCellLocked(graph.getDefaultParent())) {
							graph.getModel().beginUpdate();
							try {
								// 粘贴
								var cells = mxClipboard.paste(graph);
								if (cells != null) {
									var includeEdges = true;

									for (var i = 0; i < cells.length && includeEdges; i++) {
										includeEdges = includeEdges && graph.model.isEdge(cells[i]);
									}

									var t = graph.view.translate;
									var s = graph.view.scale;
									var dx = t.x;
									var dy = t.y;
									var bb = null;

									if (cells.length == 1 && includeEdges) {
										var geo = graph.getCellGeometry(cells[0]);

										if (geo != null) {
											bb = geo.getTerminalPoint(true);
										}
									}

									bb = (bb != null) ? bb : graph.getBoundingBoxFromGeometry(cells, includeEdges);

									if (bb != null) {
										var x = Math.round(graph.snap(graph.popupMenuHandler.triggerX / s - dx));
										var y = Math.round(graph.snap(graph.popupMenuHandler.triggerY / s - dy));

										graph.cellsMoved(cells, x - bb.x, y - bb.y);
									}
								}
								if (isEmptyArray(cells)) {
									return;
								}
								// 后台复制业务样式
								copyCells(cells);
							}
							finally {
								graph.getModel().endUpdate();
							}
						}
					});
					menu.addSeparator();
				};


				addShortcut(menu.addItem('选择顶点', null, function () {
					graph.selectVertices(null, false);
				}), "Ctrl+Shift+I");

				addShortcut(menu.addItem('选择边线', null, function () {
					graph.selectEdges();
				}), "Ctrl+Shift+E");

				addShortcut(menu.addItem('全选', null, function () {
					graph.selectAll();
				}), "Ctrl+A");
				addShortcut(menu.addItem('设置背景色', null, function () {
					pageModel.invoke("setBackground", "");
				}), "Ctrl+B");
			};
		};



		function addShortcut(item, shortcut) {
			var td = item.firstChild.nextSibling.nextSibling;
			var span = document.createElement('span');
			span.style.color = 'gray';
			mxUtils.write(span, shortcut);
			td.appendChild(span);
		};

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

		graph.addListener(mxEvent.CLICK, function (sender, evt) {
			if (!sender.isRightClick) {
				click(sender, evt);
			}
			graph.isRightClick = false;
		});

		graph.addListener(mxEvent.DOUBLE_CLICK, function (sender, evt) {
			var cell = evt.getProperty('cell');
			if (sender.isRun && cell != null && cell.componentType == COMPONENT_TYPE.EIGEN) {
				var params = {
					"eigenId": cell.id,
					"isShow": true
				};
				pageModel.invoke("showDetail", params);
			}
		});

		//增加画板元件移动监听
		graph.addListener(mxEvent.MOVE_CELLS, function (sender, evt) {
			// 移动的目标区域
			var target = evt.properties.target;
			if (typeof (target) == "undefined") {
				return;
			}
			// 移动的节点集
			var moveCells = evt.properties.cells;
			var componentIds = new Array();
			for (let i = 0; i < moveCells.length; i++) {
				const element = moveCells[i];
				if (element.componentType == COMPONENT_TYPE.CONTAINER) {
					for (let j = 0; j < element.children.length; j++) {
						const childEle = element.children[j];
						componentIds.push(childEle.id);
					}
				} else {
					componentIds.push(element.id);
				}
			}

			if (typeof (target.geometry) == "undefined") {
				pageModel.invoke("removeElementId", componentIds);
			} else {
				var params = {
					"componentIds": componentIds,
					"elementId": target.getId()
				};
				pageModel.invoke("addElementId", params);
			}
		});

		graph.resizeCell = function (cell, bound) {
			this.model.beginUpdate();
			try {
				this.cellResized(cell, bound);
				if (cell.componentType == COMPONENT_TYPE.ELEMENT) {
					var state = graph.getView().getState(cell);
					var currentStyle = (state != null) ? state.style : graph.getCellStyle(cell);
					var currentArcSize = mxUtils.getValue(currentStyle, "arcSize");
					updateImageStyle(cell, currentArcSize);
					graph.refresh(cell);
					var params = {
						"componentId": cell.getId(),
						"width": bound.width,
						"height": bound.height
					}
					pageModel.invoke("resizeCell", params);
				} else if (cell.componentType == COMPONENT_TYPE.TXT || cell.componentType == COMPONENT_TYPE.QUERY) {
					var params = {
						"componentId": cell.getId(),
						"width": bound.width,
						"height": bound.height
					}
					pageModel.invoke("resizeCell", params);
				}
			} finally {
				this.model.endUpdate();
			}
			return cell;
		};

		graph.addListener(mxEvent.CONNECT_CELL, function (sender, evt) {
			if (isEmpty(evt.properties.edge.componentType) || evt.properties.edge.componentType == COMPONENT_TYPE.ADJUSTMENT) {
				return;
			}
			updateConnectionNode(evt);
		});

		mxEvent.addListener(container, 'dragover', function (evt) {
			if (graph.isEnabled()) {
				evt.stopPropagation();
				evt.preventDefault();
			}
		});

		// 是否允许接收
		graph.isValidDropTarget = function (cell, cells, evt) {
			if (cell.dropTarget) {
				return true;
			} else {
				return false;
			}
		};
		mxEvent.addListener(container, 'drop', function (evt) {
			if (graph.isEnabled()) {
				evt.stopPropagation();
				evt.preventDefault();
				// Gets drop location point for vertex
				var pt = mxUtils.convertPoint(graph.container, mxEvent.getClientX(evt), mxEvent.getClientY(evt));
				var tr = graph.view.translate;
				var scale = graph.view.scale;
				var x = pt.x / scale - tr.x - offsetX;
				var y = pt.y / scale - tr.y - offsetY;

				var parent;
				var cell = graph.getCellAt(x, y);
				if (cell != null && cell.dropTarget) {
					parent = cell;
					x = x - cell.geometry.x;
					y = y - cell.geometry.y;
				} else {
					parent = graph.getDefaultParent();
				}

				if (dragItem.id == "") {
					if (imgsrc) {
						createElement(graph, parent, x, y);
					} else if ("adjust_panel" == componentName) {
						createAdjustComponent(graph, parent, x, y);
					} else if ("connect_panel" == componentName) {
						createConnectComponent(graph, x, y);
					} else if ("detail_panel" == componentName) {
						initTable(graph, container.id, "", x, y);
					} else if ("query_panel" == componentName) {
						createQueryComponent(graph, parent, x, y);
					} else if ("eigen_panel" == componentName) {
						createEigenComponent(graph, parent, x, y);
					} else if ("txt_panel" == componentName) {
						createTxtComponent(graph, parent, x, y);
					}
				}
			}
		});
	}

	/**
	 * 创建元件
	 * @param {*} graph 
	 * @param {*} x 
	 * @param {*} y 
	 */
	function createElement(graph, parent, x, y) {
		graph.getModel().beginUpdate();
		try {
			v1 = graph.insertVertex(parent, creatID(), '', x, y, 100, 100, "shape=image;image=" + imgsrc + ";strokeColor=none;noLabel=1;editable=0;");
			v1.dropTarget = true;
			v1.componentType = COMPONENT_TYPE.ELEMENT;

			var parentId = parent.id == graph.getDefaultParent().id ? "" : parent.id;
			var params = new Array();
			var param = {
				"componentId": v1.id,
				"componentType": v1.componentType,
				"parentId": parentId
			};
			params.push(param)
			pageModel.invoke("initComponentInfo", params);
		}
		finally {
			graph.getModel().endUpdate();
		}
	}

	/**
	 * 更新连接组件的上、下节点值
	 * @param {*} evt 
	 */
	function updateConnectionNode(evt) {
		var sourceValue = "";
		var source = evt.properties.edge.source;
		var sourceId;
		if (source != null) {
			sourceId = source.getId();
			sourceValue = source.value;
		}
		var targetValue = "";
		var target = evt.properties.edge.target;
		var targetId;
		if (target != null) {
			targetId = target.getId();
			targetValue = target.value;
		}
		var params = {
			"componentId": evt.properties.edge.getId(),
			"source": sourceId,
			"target": targetId,
			"sourceName": sourceValue,
			"targetName": targetValue
		};
		pageModel.invoke("connectCell", params);
	}

	/**
	 * 节点点击
	 * @param {*} evt 
	 */
	function click(graph, evt) {
		var cell = evt.getProperty('cell'); // cell may be null
		if (graph.isRun && cell != null && cell.componentType == COMPONENT_TYPE.QUERY) {
			var params = {
				"componentId": cell.id,
				"valueType": cell.valueType,
				"value": cell.value
			};
			pageModel.invoke("showFilterForm", params);
		} else {
			if (cell != null) {
				let cellId = cell.id;
				if (cell.componentType == COMPONENT_TYPE.ADJUSTMENT) {
					// 调整组件是一个整体, 点击下箭头 = 点击上箭头
					cellId = cell.parent.children[0].id;
				}
				// 监听节点点击事件 传回ID到后台去进行 配置数据的切换
				var params = {
					"cellId": cellId,
					"componentType": cell.componentType
				};
				pageModel.invoke("selectCell", params);
			} else {
				pageModel.invoke("hidePropertyPanel", "true");
			}
		}
	}

	/**
	 * 创建查询组件
	 * @param {*} graph 
	 * @param {*} x 
	 * @param {*} y 
	 */
	function createQueryComponent(graph, parent, x, y) {
		graph.getModel().beginUpdate();
		try {
			var v1 = graph.insertVertex(parent, creatID(), '', x, y, 270, 40, "foldable=0;fillColor=#FFFFFF;editable=0;rotatable=0;");
			v1.componentType = COMPONENT_TYPE.CONTAINER;
			v1.setConnectable(false);
			var v2 = graph.insertVertex(v1, creatID(), '', 10, 5, 120, 30, "editable=0;fillColor=#FFFFFF;movable=0;rotatable=0;");
			v2.componentType = COMPONENT_TYPE.TXT;
			v2.isQueryTxt = true;
			v2.setConnectable(false);

			var v3 = graph.insertVertex(v1, creatID(), '', 140, 5, 120, 30, "fillColor=#FFFFFF;movable=0;rotatable=0;whiteSpace=wrap;editable=0;");
			v3.componentType = COMPONENT_TYPE.QUERY;
			v3.valueType = "character";
			v3.setConnectable(false);

			var parentId = parent.id == graph.getDefaultParent().id ? "" : parent.id;
			var params = new Array();
			var param1 = {
				"componentId": v2.id,
				"componentType": v2.componentType,
				"parentId": parentId
			};
			params.push(param1);
			var param2 = {
				"componentId": v3.id,
				"componentType": v3.componentType,
				"parentId": parentId
			};
			params.push(param2);
			pageModel.invoke("initComponentInfo", params);
		}
		finally {
			graph.getModel().endUpdate();
		}
	};

	/**
	 * 创建特征值组件
	 * @param {*} graph 
	 * @param {*} x 
	 * @param {*} y 
	 */
	function createEigenComponent(graph, parent, x, y) {
		graph.getModel().beginUpdate();
		try {
			var v1 = graph.insertVertex(parent, creatID(), '特征值', x, y, 50, 30, "foldable=0;fillColor=#FFFFFF;editable=0;resizable=0;");
			v1.componentType = COMPONENT_TYPE.EIGEN;
			v1.valueType = "character";

			var parentId = parent.id == graph.getDefaultParent().id ? "" : parent.id;
			var params = new Array();
			var param = {
				"componentId": v1.id,
				"componentType": v1.componentType,
				"parentId": parentId
			};
			params.push(param)
			pageModel.invoke("initComponentInfo", params);
		}
		finally {
			graph.getModel().endUpdate();
		}
	}

	/**
	 * 创建连接组件
	 * @param {*} graph 
	 * @param {*} x 
	 * @param {*} y 
	 */
	function createConnectComponent(graph, x, y) {
		var v1;
		var v2;
		graph.getModel().beginUpdate();
		try {
			v1 = graph.insertVertex(graph.getDefaultParent(), creatID(), '', x, y + 100, 0, 0);
			v2 = graph.insertVertex(graph.getDefaultParent(), creatID(), '', x + 100, y, 0, 0);
			var e1 = graph.insertEdge(graph.getDefaultParent(), creatID(), '', v1, v2, "endArrow=classic;edgeStyle=orthogonalEdgeStyle;html=1;");
			e1.componentType = COMPONENT_TYPE.CONNECTION;

			var params = new Array();
			var param = {
				"componentId": e1.id,
				"componentType": e1.componentType,
				"parentId": ""
			};
			params.push(param);
			pageModel.invoke("initComponentInfo", params);
		}
		finally {
			graph.getModel().endUpdate();
		}
		var cells = new Array();
		cells[0] = v1;
		graph.removeCells(cells, false);
		cells[0] = v2;
		graph.removeCells(cells, false);
	};
	/**
	 * 创建文本组件
	 * @param {*} graph 
	 * @param {*} paramsMap 
	 */
	function createTxtComponent(graph, parent, x, y) {
		graph.getModel().beginUpdate();
		try {
			var v = graph.insertVertex(parent, creatID(), '', x, y, 120, 30, 'editable=0;whiteSpace=wrap;');
			v.componentType = "phm_txt_component";

			var parentId = parent.id == graph.getDefaultParent().id ? "" : parent.id;
			var params = new Array();
			var param = {
				"componentId": v.id,
				"componentType": v.componentType,
				"parentId": parentId
			};
			params.push(param)
			pageModel.invoke("initComponentInfo", params);
		}
		finally {
			graph.getModel().endUpdate();
		}

	}
	/**
	 * 创建调整组件
	 * @param {*} graph 
	 * @param {*} x 
	 * @param {*} y 
	 */
	function createAdjustComponent(graph, parent, x, y) {
		var v1, v2, v3;
		graph.getModel().beginUpdate();
		try {
			var v1 = graph.insertVertex(parent, creatID(), '', x, y, 20, 20, "fillOpacity=0;strokeOpacity=0;resizable=0;editable=0;recursiveResize=1;");
			v1.componentType = COMPONENT_TYPE.CONTAINER
			//下
			var v2 = graph.insertVertex(v1, creatID(), '', 2, 26, 20, 20, "shape=triangle;whiteSpace=wrap;html=1;strokeWidth=0;rounded=0;rotation=90;strokeColor=none;fillColor=#BDBDBD;resizable=0;rotatable=0;editable=0;movable=0;aspect=fixed;");
			v2.componentType = COMPONENT_TYPE.ADJUSTMENT;
			//上
			var v3 = graph.insertVertex(v1, creatID(), '', 2, 0, 20, 20, "shape=triangle;whiteSpace=wrap;html=1;strokeWidth=0;rounded=0;rotation=-90;strokeColor=none;fillColor=#BDBDBD;resizable=0;rotatable=0;editable=0;movable=0;aspect=fixed;");
			v3.componentType = COMPONENT_TYPE.ADJUSTMENT;

			var parentId = parent.id == graph.getDefaultParent().id ? "" : parent.id;
			var params = new Array();
			var param1 = {
				"componentId": v2.id,
				"componentType": v2.componentType,
				"parentId": parentId
			};
			params.push(param1);
			pageModel.invoke("initComponentInfo", params);
		}
		finally {
			graph.getModel().endUpdate();
		}
	};

	graph.container.setAttribute('tabindex', '0');
	// 保证点击画板使得焦点在画板上
	var graphFireMouseEvent = graph.fireMouseEvent;
	graph.fireMouseEvent = function (evtName, me, sender) {
		if (evtName == mxEvent.MOUSE_DOWN) {
			this.container.focus();
		}

		graphFireMouseEvent.apply(this, arguments);
	};
	var keyHandler = new mxKeyHandler(graph, container);
	// 删除
	keyHandler.bindKey(46, function (evt) {
		if (graph.isRun) {
			return;
		}
		var selectionCells = graph.getSelectionCells();
		if (!selectionCells || isEmptyArray(selectionCells)) return;
		if (selectionCells[0].componentType === "phm_adjust_component") {
			var parent = [selectionCells[0].parent]
			selectionCells = parent
		}
		// 获取选中的节点ID集合
		var ids = new Array();
		getAllCellId(selectionCells, ids);
		pageModel.invoke("confirmDelete", ids);

	});
	// 上移
	keyHandler.bindKey(38, function (evt) {
		moveCellsByDirection(0, -5);
	});
	// 下移
	keyHandler.bindKey(40, function (evt) {
		moveCellsByDirection(0, 5);
	});
	// 左移
	keyHandler.bindKey(37, function (evt) {
		moveCellsByDirection(-5, 0);
	});
	// 右移
	keyHandler.bindKey(39, function (evt) {
		moveCellsByDirection(5, 0);
	});
	// 全选
	keyHandler.bindControlKey(65, function (evt) {
		graph.selectAll();
	});
	// 设置背景色
	keyHandler.bindControlKey(66, function (evt) {
		pageModel.invoke("setBackground", "");
	});
	// 复制
	keyHandler.bindControlKey(67, function (evt) {
		if (graph.isRun) {
			return;
		}
		var selectionCells = graph.getSelectionCells();
		if (isEmptyArray(selectionCells)) {
			return;
		}
		var ids = new Array();
		getAllCellId(selectionCells, ids);
		mxClipboard.copy(graph, selectionCells);
		pageModel.invoke("copy", ids);
		pasteAble = true;
	});
	// 粘贴
	keyHandler.bindControlKey(86, function (evt) {
		if (graph.isRun) {
			return;
		}
		var cells = mxClipboard.paste(graph);
		if (isEmptyArray(cells)) {
			return;
		}
		copyCells(cells);
	});
	// 选择顶点
	keyHandler.bindControlShiftKey(73, function (evt) {
		if (graph.isRun) {
			return;
		}
		graph.selectVertices(null, false);
	});
	// 选择边线
	keyHandler.bindControlShiftKey(69, function (evt) {
		if (graph.isRun) {
			return;
		}
		graph.selectEdges();
	});


	/**
	 * 后台复制业务样式信息
	 * @param {*} cells 
	 */
	var copyCells = function (cells) {
		var ids = new Array();
		var modelCells = graph.getModel().cells;
		for (let i = 0; i < cells.length; i++) {
			const cell = cells[i];
			cell.id = creatID();
			// 解决根据ID获取不到节点的问题
			modelCells[cell.id] = cell;
			ids.push(cell.getId());
			if (!isEmptyArray(cell.children)) {
				getAllCellId(cell.children, ids);
			}
		};
		pageModel.invoke("paste", ids);
	};

	var moveCellsByDirection = function (dx, dy) {
		if (graph.isRun) {
			return;
		}
		var selectionCells = graph.getSelectionCells();
		if (!selectionCells || isEmptyArray(selectionCells)) return;
		graph.moveCells(selectionCells, dx, dy);
	};

	$(document).on('mousedown', '#element_panel', function (e) {
		dragItem.id = "";
		componentName = "";
		imgsrc = e.target.src;
		offsetX = e.offsetX;
		offsetY = e.offsetY;
		// 阻止事件冒泡
		e.stopPropagation();
	});

	$(document).on('mousedown', '#computecomponent_panel', function (e) {
		dragItem.id = "";
		imgsrc = false;
		componentName = getPanelId(e.target);
		offsetX = e.offsetX;
		offsetY = e.offsetY;
		// 阻止事件冒泡
		e.stopPropagation();
	});

	$("div[data-page-id='" + pageModel.pageId + "_show_panel'] #bizdesigner-zoomout").click(function (e) {
		e.preventDefault();
		var scaleBox = $(this).parent().prev().children();
		var oldScale = scaleBox.css("transform").replace(/[^0-9\-,]/g, '').split(',')[0];
		oldScale = Number(oldScale || 1);
		oldScale = oldScale === 1 ? 1 : oldScale / 10;
		var newScale = oldScale - 0.1;
		newScale = newScale < 0.5 ? 0.5 : newScale;
		scaleBox.css({
			transform: `scale(${newScale})`
		})
		$("div[data-page-id='" + pageModel.pageId + "_show_panel'] #bizdesigner-zoomvalue").text((newScale * 100).toFixed(0) + "%");
	});
	$("div[data-page-id='" + pageModel.pageId + "_show_panel'] #bizdesigner-zoomin").click(function (e) {
		e.preventDefault();
		var scaleBox = $(this).parent().prev().children();
		var oldScale = scaleBox.css("transform").replace(/[^0-9\-,]/g, '').split(',')[0];
		oldScale = Number(oldScale || 1);
		oldScale = oldScale === 1 ? 1 : oldScale / 10;
		var newScale = oldScale + 0.1;
		newScale = newScale > 1.5 ? 1.5 : newScale;
		scaleBox.css({
			transform: `scale(${newScale})`
		})
		$("div[data-page-id='" + pageModel.pageId + "_show_panel'] #bizdesigner-zoomvalue").text((newScale * 100).toFixed(0) + "%");
	});

	// 明细相关拖动事件

	$("#" + container.id).on("keydown", function (e) {
		// e.preventDefault();
		var curDetail = $("#" + container.id + " > .detail-table.active");
		if (curDetail.length) {
			var step = 2;
			switch (e.keyCode) {
				case 37: //左键
					curDetail.css({
						left: Math.max(curDetail.position().left - step, 4)
					})
					break;
				case 38: //向上键
					curDetail.css({
						top: Math.max(curDetail.position().top - step, 4)
					})
					break;
				case 39: //右键
					curDetail.css({
						left: curDetail.position().left + step
					})
					break;
				case 40: //向下键
					curDetail.css({
						top: curDetail.position().top + step
					})
					break;
				case 46: //del键
					let id = curDetail.attr("id");
					id = id.split("-")[0] + "-" + id.split("-")[1];
					graph.pageModel.invoke("deleteDetail", id);
				default:
					break;
			}
		};
	});
	var drawBox = $("#" + container.id);
	drawBox.on("click", function (e) {
		$(this).find(".detail-table").removeClass("active");
	})
	drawBox.on('dragover', function (e) {
		e.preventDefault();
		var left = e.pageX - dragItem.containerOffsetX - dragItem.offsetX + dragItem.scrollX,
			top = e.pageY - dragItem.containerOffsetY - dragItem.offsetY + dragItem.scrollY;
		$(dragItem.id).css({
			left: left > dragItem.borderWidth ? left : dragItem.borderWidth,
			top: top > dragItem.borderWidth ? top : dragItem.borderWidth
		})
	}).on('drop', function (e) {
		e.preventDefault();
		dragItem.id = "";
	});
	// END 明细拖动事件
	mxEvent.disableContextMenu(container);
	mgGraph = graph;
	mgGraph.pageModel = pageModel;
	return mgGraph;
};


function getPanelId(element) {
	while (element.id == "") {
		element = element.parentElement;
	}

	return element.id;
}

var updateStyle = function (paramsMap, mgGraph) {
	if (!paramsMap || typeof (paramsMap) != "object") return;
	var id = paramsMap["id"];
	var style = paramsMap["style"];
	if (!style || typeof (style) != "string") return;
	if (mgGraph == null) return;
	var selectionCell = mgGraph.getModel().getCell(id);
	if (!selectionCell) return;
	selectionCell.style = style;
	mgGraph.refresh(selectionCell);
};

var updateLabel = function (paramsMap, mgGraph) {
	if (!paramsMap || typeof (paramsMap) != "object") return;
	var id = paramsMap["id"];
	var params = paramsMap["params"];
	if (!params || typeof (params) != "object") return;
	if (mgGraph == null) return;
	var selectionCell = mgGraph.getModel().getCell(id);
	if (!selectionCell) return;
	var v1;
	if (selectionCell.children != null) {
		v1 = selectionCell;
	} else {
		v1 = selectionCell.parent;
	}
	var v2;
	if (params.length == 1) {
		v2 = v1.children[0];
		var returnParams = {
			"componentId": v2.getId(),
			"name": params[0]
		}
		mgGraph.pageModel.invoke("syncQueryInfo", returnParams);
	} else if (params.length == 2) {
		v2 = v1.children[1];
		v2.valueType = params[1];
	}
	v2.value = params[0];
	mgGraph.refresh(v2);
};


var updateTxt = function (paramsMap, mgGraph) {
	if (!paramsMap || typeof (paramsMap) != "object") return;
	var id = paramsMap["id"];
	var name = paramsMap["name"];
	var width = paramsMap["width"];
	var height = paramsMap["height"];
	var style = paramsMap["style"];
	if (mgGraph == null) return;
	var selectionCell = mgGraph.getModel().getCell(id);
	if (!selectionCell) return;
	if (typeof (name) != "undefined") {
		selectionCell.value = name;
		if (selectionCell.isQueryTxt) {
			var parentCell = selectionCell.parent;
			var params = {
				"componentId": parentCell.children[1].getId(),
				"name": name
			}
			mgGraph.pageModel.invoke("syncQueryInfo", params);
		}
	}
	if (typeof (width) != "undefined") {
		selectionCell.geometry.width = width;
		if (selectionCell.isQueryTxt) {
			var parentCell = selectionCell.parent;
			parentCell.children[1].geometry.x = width + 20;
			parentCell.geometry.width = parentCell.children[1].geometry.width + width + 30;
			mgGraph.refresh(parentCell);
		}
	}
	if (typeof (height) != "undefined") {
		selectionCell.geometry.height = height;
		if (selectionCell.isQueryTxt) {
			var parentCell = selectionCell.parent;
			parentCell.children[1].geometry.height = height;
			parentCell.geometry.height = height + 10;
			mgGraph.refresh(parentCell);
			var params = {
				"componentId": parentCell.children[1].getId(),
				"height": height
			}
			mgGraph.pageModel.invoke("syncQueryInfo", params);
		}
	}
	if (typeof (style) != "undefined") {
		selectionCell.style = selectionCell.style + style;
	}
	mgGraph.refresh(selectionCell);
}

var updateDetailStyle = function (paramsMap, mgGraph) {
	if (!paramsMap || typeof (paramsMap) != "object") return;
	var tableid = paramsMap["id"];
	var containerId = mgGraph.container.id;
	var style = paramsMap["style"];
	$(`#${tableid}-${containerId}`).css({
		width: style.width
	});
	layui.use('table', function () {
		var table = layui.table;
		var option = {
			style,
			pageSize: 3
		}
		table.reload(`${tableid}-${containerId}-box`, {
			cols: renderCols(dragItem.cols),
			limit: 3,
			data: dragItem.rows,
			done: function (res, curr, count) {
				this.cols = [];

				// 工具栏样式设置
				$(`#${tableid}-${containerId} .tools`).css({
					backgroundColor: option.style.backColor,
					color: option.style.fontColor,
				});
				// 表头样式设置
				$(`#${tableid}-${containerId} .layui-table-box .layui-table-header .layui-table-cell`).css({
					height: option.style.headHeight,
					lineHeight: option.style.headHeight + "px",
					color: option.style.fontColor,
					backgroundColor: option.style.headColor,
				});
				// 表体样式设置
				$(`#${tableid}-${containerId} .layui-table-box .layui-table-body .layui-table-cell`).css({
					height: option.style.rowHeight,
					lineHeight: option.style.rowHeight + "px",
					color: option.style.fontColor,
					fontSize: option.style.fontSize,
					backgroundColor: option.style.backColor,
				});
				$(`#${tableid}-${containerId} .layui-table-box .layui-table-body.layui-table-main`).css({
					height: calcTableHeight(option),
				});
				$(`#${tableid}-${containerId} .layui-table-box .layui-table-body .layui-none`).css({
					backgroundColor: option.style.backColor,
				});

			}
		});
	})

}

var setDetailVisible = function (paramsMap, mgGraph) {
	if (!paramsMap || typeof (paramsMap) != "object") return;
	var curDetail = $("#" + paramsMap["id"] + "-" + mgGraph.container.id);
	var visible = paramsMap["visible"];
	if (visible) {
		curDetail.css("visibility", "visible");
		//hfxie 运行态添加功能:点击显示 -> 置顶且高亮显示对应明细
		curDetail
			.addClass("active")
			.css('z-index', '1')
			.siblings("div.detail-table")
			.removeClass("active")
			.css("z-index", "0")
	} else {
		curDetail.css("visibility", "hidden");
	}

}

var updateEdgeHeight = function (paramsMap, mgGraph) {
	if (!paramsMap || typeof (paramsMap) != "object") return;
	var id = paramsMap["id"];
	var height = paramsMap["height"];
	if (mgGraph == null) return;
	// 选择的是上节点
	var selectionCell = mgGraph.getModel().getCell(id);
	var parentCell = selectionCell.parent;
	// 下节点
	var otherCell = parentCell.children[1];
	selectionCell.geometry.height = height;
	selectionCell.geometry.y = height + height / 3;
	selectionCell.geometry.width = height;
	otherCell.geometry.height = height
	otherCell.geometry.y = 0
	otherCell.geometry.width = height
	parentCell.geometry.height = height * 2 + height / 3;
	parentCell.geometry.width = height + 10;
	mgGraph.refresh(parentCell);
}

var updateQueryHeight = function (paramsMap, mgGraph) {
	if (!paramsMap || typeof (paramsMap) != "object") return;
	var id = paramsMap["id"];
	var width = paramsMap["width"];
	var height = paramsMap["height"];
	if (mgGraph == null) return;
	var selectionCell = mgGraph.getModel().getCell(id);
	var parentCell = selectionCell.parent;
	if (typeof (width) != "undefined") {
		selectionCell.geometry.width = width;
		parentCell.geometry.width = parentCell.children[0].geometry.width + width + 30;
	}
	if (typeof (height) != "undefined") {
		selectionCell.geometry.height = height;
		parentCell.children[0].geometry.height = height;
		parentCell.geometry.height = height + 10;
		var params = {
			"componentId": parentCell.children[0].getId(),
			"height": height
		}
		mgGraph.pageModel.invoke("syncQueryInfo", params);
	}
	mgGraph.refresh(parentCell);
}

var cancelSelect = function (paramsMap, mgGraph) {
	if (!paramsMap || typeof (paramsMap) != "object") return;
	if (mgGraph == null) return;
	mgGraph.clearSelection();
}

var restoreSelect = function (paramsMap, mgGraph) {
	if (!paramsMap || typeof (paramsMap) != "object") return;
	if (mgGraph == null) return;
	mgGraph.clearSelection();
	var cell = mgGraph.getModel().getCell(paramsMap["componentId"]);
	mgGraph.setSelectionCell(cell);
}

var setBackground = function (paramsMap, mgGraph) {
	if (!paramsMap || typeof (paramsMap) != "object") return;
	if (mgGraph == null) return;
	var value = paramsMap["backgroundcolor"];
	if (isEmptyString(value)) {
		value = 'url("kingdee/mmc/bizdesigner/src/images/grid.gif")';
	}
	mgGraph.container.parentNode.style.background = value;
}

var updateXmlAndDetailXY = function (paramsMap, mgGraph) {
	if (!paramsMap || typeof (paramsMap) != "object") return;
	var isSave = paramsMap["isSave"];
	if (mgGraph.isImporting) return;
	var encoder = new mxCodec();
	var node = encoder.encode(mgGraph.getModel());
	var xml = mxUtils.getPrettyXml(node);

	var details = [];
	$("#" + mgGraph.container.id).find(".detail-table").each(function () {
		var e = $(this);
		var id = e.attr('id');
		details.push({
			id: id.split("-")[0] + "-" + id.split("-")[1],
			x: e.position().left,
			y: e.position().top
		})
	})
	var params = {
		"xml": xml,
		"details": details,
		"isSave": isSave
	}
	mgGraph.pageModel.invoke("updateXmlAndDetailXY", params);
}

var addStyle = function (paramsMap, mgGraph) {
	if (!paramsMap || typeof (paramsMap) != "object") return;
	var id = paramsMap["id"];
	var key = paramsMap["key"];
	var value = paramsMap["value"];
	if (mgGraph == null) return;
	var selectionCell = mgGraph.getModel().getCell(id);
	if (!selectionCell) return;
	selectionCell.style = mxUtils.setStyle(selectionCell.style, key, value);
	if (selectionCell.componentType == COMPONENT_TYPE.ADJUSTMENT) {
		let otherCell = selectionCell.parent.children[1];
		otherCell.style = `shape=triangle;whiteSpace=wrap;html=1;strokeWidth=0;rounded=0;rotation=-90;strokeColor=none;fillColor=${value};resizable=0;rotatable=0;editable=0;movable=0;aspect=fixed;`
		mgGraph.refresh(otherCell);
	}
	if (key == "arcSize") {
		updateImageStyle(selectionCell, value);
	}
	mgGraph.refresh(selectionCell);
}

var removeCells = function (paramsMap, mgGraph) {
	if (!paramsMap || typeof (paramsMap) != "object") return;
	if (mgGraph == null) return;
	var selectionCells = mgGraph.getSelectionCells();
	if (!selectionCells) return;
	if (selectionCells[0].componentType === "phm_adjust_component") {
		var parent = [selectionCells[0].parent]
		selectionCells = parent
	}
	// 获取选中的节点ID集合
	var ids = new Array();
	getAllCellId(selectionCells, ids);
	mgGraph.removeCells(selectionCells, false);
	mgGraph.pageModel.invoke("removeCells", ids);
}

var updateImageStyle = function (cell, arcSize) {
	if (isEmpty(arcSize)) {
		arcSize = 0;
	}
	var geometry = cell.getGeometry();
	var width = geometry.width - arcSize - geometry.width / 7;
	var height = geometry.height - arcSize - geometry.height / 7;
	var style1 = mxUtils.setStyle(cell.style, "imageWidth", width);
	cell.style = mxUtils.setStyle(style1, "imageHeight", height);
}

var bizinitData = function (model, paramsMap) {
	model.invoke("initData", "");
};

var bizInit = function (paramsMap, mgGraph) {
	// 渲染mxGraph
	var xml = paramsMap["xml"];
	if (!isEmptyString(xml)) {
		var running = paramsMap["running"];
		mgGraph.isImporting = true;
		mgGraph.getModel().beginUpdate();
		try {
			var rootxml = mxUtils.parseXml(xml);
			var root = rootxml.documentElement;
			var dec = new mxCodec(root.getDocumentElement);
			dec.decode(root, mgGraph.getModel());
			if (!isEmpty(running)) {
				mgGraph.isRun = true;
				mgGraph.setEnabled(false);
				mgGraph.selectAll();
				var selectionCells = mgGraph.getSelectionCells();
				disableCells(selectionCells, mgGraph);
			}
		} finally {
			mgGraph.getModel().endUpdate();
			mgGraph.isImporting = false;
		}
	}

	// 加载明细
	var details = paramsMap["details"]
	if (!isEmptyArray(details)) {
		details.forEach(function (detail) {
			initTable(mgGraph, mgGraph.container.id, detail, detail.style.x, detail.style.y);
		});
	}
	// 设置背景色
	setBackground(paramsMap, mgGraph);

	//设置模型名称&编码
	setPanelInfo(paramsMap, mgGraph);

};

var showAll = function (paramsMap, mgGraph) {
	// 展示特征值
	var eigenvalues = paramsMap["eigenvalues"];
	if (!isEmpty(eigenvalues)) {
		mgGraph.getModel().beginUpdate();
		try {
			var map = JSON.parse(eigenvalues);
			for (var key in map) {
				var cell = mgGraph.getModel().getCell(key);
				if (!isEmpty(cell)) {
					cell.value = map[key];
				}
			}
			mgGraph.refresh();
		} finally {
			mgGraph.getModel().endUpdate();
		}
	}

	// 更新展示明细

	var details = paramsMap["details"]
	details.forEach(function (detail) {
		updateTable(detail, mgGraph);
	});
};

var removeDetail = function (paramsMap, mgGraph) {
	var curDetail = $("#" + paramsMap["id"] + "-" + mgGraph.container.id);
	curDetail.remove();
};


// -----start-------

/**
 * @description 检查数组是否为空
 * @param arr 数组
 * @return boolean 布尔值
 */
function isEmptyArray(obj) {
	if (isEmpty(obj) || typeof (obj) != "object") return true;
	if (obj.length == 0) return true;
	return false;
};

/**
 * @description 检查变量是否为空字符串
 * @param obj 变量
 * @return boolean 布尔值
 */
function isEmptyString(obj) {
	if (isEmpty(obj) || typeof (obj) != "string") return true;
	if (obj.trim().length == 0) return true;
	return false;
};

/**
 * @description 检查变量是否为空
 * @param obj 变量
 * @return boolean 布尔值
 */
function isEmpty(obj) {
	if (obj == null || obj == undefined) return true;
	return false;
};

/**
 * 递归获取所有选中的节点ID
 * @param {*} roots 
 * @param {*} ids 
 */
function getAllCellId(roots, ids) {
	for (let i = 0; i < roots.length; i++) {
		const root = roots[i];
		ids.push(root.getId());
		if (!isEmptyArray(root.children)) {
			getAllCellId(root.children, ids);
		}
	}
};

/**
 * @description 根据XML导入画板内容
 * @param xml XML内容
 */
var bizImportGraphFromXML = function (paramsMap, mgGraph) {
	var xml = paramsMap["xml"];
	if (isEmptyString(xml)) {
		console.log("参数XML为空");
		return;
	}
	var isRun = paramsMap["enabled"];
	mgGraph.isImporting = true;
	mgGraph.getModel().beginUpdate();
	try {
		var rootxml = mxUtils.parseXml(xml);
		var root = rootxml.documentElement;
		var dec = new mxCodec(root.getDocumentElement);
		dec.decode(root, mgGraph.getModel());
		if (!isEmptyString(isRun)) {
			mgGraph.isRun = true;
			mgGraph.selectAll();
			var selectionCells = mgGraph.getSelectionCells();
			disableCells(selectionCells, mgGraph);
		}
	} finally {
		mgGraph.getModel().endUpdate();
		mgGraph.isImporting = false;
	}
};

function disableCells(selectionCells, mgGraph) {
	for (let i = 0, length = selectionCells.length; i < length; i++) {
		const element = selectionCells[i];
		element.style = mgGraph.getModel().getStyle(element) + "movable=0;resizable=0;rotatable=0;editable=0;";
		mgGraph.refresh(element);
		if (!isEmptyArray(element.children)) {
			disableCells(element.children, mgGraph);
		}
	}
}

/**
 * 导入流程定义
 */
function importFlowFromXML(params, mgGraph) {
	var xml = params["xml"];
	if (isEmptyString(xml)) {
		console.log("参数XML为空");
		return;
	}
	var xmlDOC = mxUtils.parseXml(xml);
	var mgCodec = new mxCodec(xmlDOC);
	var xmlDOCTopElement = xmlDOC.documentElement;
	var xmlDOCElement = xmlDOCTopElement.firstChild;
	mgGraph.isImporting = true;

	while (xmlDOCElement) {
		var decodeXMLDOCElement = mgCodec.decode(xmlDOCElement);

		if (isEmpty(decodeXMLDOCElement)) {
			console.error({ msg: "解码XML元素失败", param: xmlDOCElement });
			xmlDOCElement = xmlDOCElement.nextSibling;
			continue;
		}
		var decodeXMLDOCElementParent = decodeXMLDOCElement.getParent();
		if (isEmpty(decodeXMLDOCElementParent)) {
			mgGraph.addCell(decodeXMLDOCElement);
		} else {
			var childCount = mgGraph.getModel().getChildCount(decodeXMLDOCElementParent);
			mgGraph.addCell(decodeXMLDOCElement, decodeXMLDOCElementParent, childCount);
		}
		xmlDOCElement = xmlDOCElement.nextSibling;
	}
	//重新验证画板视图的所有元件状态，解决通过XML导入后，有子项的元件上无法显示展开，收缩按钮
	mgGraph.getView().revalidate();
	mgGraph.isImporting = false;

	// 加载明细
	var details = params["details"];
	details.forEach(function (detail) {
		initTable(mgGraph, mgGraph.container.id, detail, detail.style.x, detail.style.y);
	});
};

function isEmpty(obj) {
	if (obj == null || obj == undefined) return true;

	return false;
};

function isEmptyString(obj) {
	if (isEmpty(obj) || typeof (obj) != "string") return true;

	if (obj.trim().length == 0) return true;

	return false;
};
function updataValueById(mgGraph, dataMap) {
	if (isEmpty(dataMap)) {
		return;
	}
	mgGraph.getModel().beginUpdate();
	try {
		var map = JSON.parse(dataMap);
		for (var key in map) {
			var cell = mgGraph.getModel().getCell(key);
			if (!isEmpty(cell)) {
				cell.value = map[key];
			}
		}
		mgGraph.refresh();
	} finally {
		mgGraph.getModel().endUpdate();
	}
}

function creatID() {
	return Number(Math.random().toString().substr(3, 18) + Date.now()).toString(36);
}
function renderCols(cols, tableid) {
	cols.forEach(e => {
		if (e.link) {
			e.templet = function (d) {
				return '<span class="layui-table-link" style="color: #55a0f5 !important;" field=' + e.field + '>' + d[e.field] + '</span>'
			};
		}
	})
	return [
		[...cols]
	]
}


function calcTableHeight(option) {
	var height = "";
	if (option.pageSize > option.style.maxRow && option.rows.length > option.style.maxRow) {
		height = (option.style.rowHeight + 2) * option.style.maxRow;
	}
	return height;
}

// 设计器初始化明细表格
function initTable(graph, containerId, sigleDetail, x, y) {
	var option = {
		hide: false,
		running: false,
		parent: "",
		id: 'detail-' + creatID(),
		currentPage: 1,
		pageSize: 10,
		rowCount: 0,
		cols: [],
		rows: [],
		style: {
			backColor: "#fff",
			fontColor: "",
			fontSize: 14,
			headHeight: 40,
			pageSize: 20,
			rowHeight: 40,
			width: 650,
			maxRows: 10,
			x: x,
			y: y
		}
	}
	sigleDetail.cols = option.cols;
	sigleDetail.rows = option.rows;
	if (sigleDetail) option = Object.assign(option, sigleDetail);
	option.style.width = option.style.width < 650 ? 650 : option.style.width;
	var drawBox = $("#" + containerId);
	var tableid = option.id;
	var tableModel = $(`
		<div id="${tableid}-${containerId}" draggable=true class="detail-table" style="width: ${option.style.width}px;position:absolute;top: ${option.style.y}px;left: ${option.style.x}px;">
			<div class="tools">
				<div id="${tableid}-${containerId}-buttons" class="buttons">
					<span id="${tableid}-${containerId}-back" style="display:none" class="go-back-btn icon-undo2"></span>
					<div id="${tableid}-${containerId}-export" class="export">
						<span tableId="${tableid}" class="export-button">导出Excel</span>
						<span class="layui-icon layui-icon-down" style="display:none"></span>
						<div class="export-dropdown">
							<span>导出明细</span>  
							<span>导出钻取明细</span>  
						</div>
					</div>
				</div>
				<div id="${tableid}-${containerId}-pagination" class="pagination"></div>
			</div>
			<table id="${tableid}-${containerId}-box" lay-filter="${tableid}-${containerId}-box" class="table-box"></table>
		</div>`);
	drawBox.append(tableModel);
	layui.use(['table', 'laypage'], function () {
		var table = layui.table,
			laypage = layui.laypage;
		table.render({
			id: `${tableid}-${containerId}-box`,
			elem: `#${tableid}-${containerId}-box`,
			loading: false,
			skin: "line",
			toolBar: false,
			defaultToolbar: false,
			autoSort: false,
			limit: option.pageSize,
			text: {
				none: `<div style="user-select:none;height:200px;width:200px;margin: 10px auto;background: url(kingdee/mmc/bizdesigner/src/images/no_data.png) no-repeat;background-size:cover"></div><span>暂无相关数据</span>`
			},
			cols: renderCols(option.cols),
			data: option.rows,
			done: function (res, curr, count) {
				this.cols = []; //（关键代码）将cols初始化，否则表格重载时无法正确重新渲染表头
				//如果是异步请求数据方式，res即为你接口返回的信息。
				//如果是直接赋值的方式，res即为：{data: [], count: 99} data为当前页数据、count为数据总长度
				//curr 当前页码
				if (option.running && option.hide) {
					$(`#${tableid}-${containerId}`).css({
						visibility: "hidden"
					});
				}
				$(`#${tableid}-${containerId}`).attr("parent", false);
				$(`#${tableid}-${containerId}`).on("dragstart", function (e) {
					dragItem = {
						id: "#" + e.target.id,
						offsetX: e.offsetX,
						offsetY: e.offsetY,
						scrollX: $("#" + e.target.id).parent().parent().scrollLeft(),
						scrollY: $("#" + e.target.id).parent().parent().scrollTop(),
						containerOffsetX: $("#" + e.target.id).parent().parent().offset().left,
						containerOffsetY: $("#" + e.target.id).parent().parent().offset().top,
						borderWidth: 4,
						cols: option.cols,
						rows: option.rows
					}
				});

				// 这里还要取消graph的选中
				$(`#${tableid}-${containerId}`).click(function (e) {
					e.stopPropagation();
					$(this).addClass("active");
					dragItem.cols = option.cols;
					dragItem.rows = option.rows;
					$(this).siblings(".detail-table").removeClass("active");
					graph.clearSelection();
					graph.pageModel.invoke("selectCell", {
						cellId: `${tableid}`,
						drilling: JSON.parse($(this).attr("parent")),
						componentType: COMPONENT_TYPE.DETAIL
					})
				});

				if (sigleDetail && sigleDetail.rows.length) {
					// 如果有数据则显示导出按钮
					$(`#${tableid}-${containerId}-export`).css("display", "flex");
				}
				// 添加导出按钮的点击事件
				$(`.export-button`).click(function (e) {
					e.stopPropagation();
					var tableDom = $(`#${tableid}-${containerId}`);
					graph.pageModel.invoke("exportExcel", {
						cellId: `${tableid}`,
						drilling: JSON.parse(tableDom.attr("parent"))
					})
					// $(this).hasClass("expand") ? $(this).removeClass("expand") : $(this).addClass("expand");
				});

				// 工具栏样式设置
				$(`#${tableid}-${containerId} .tools`).css({
					backgroundColor: option.style.backColor,
					color: option.style.fontColor,
				});
				// 表头样式设置
				$(`#${tableid}-${containerId} .layui-table-box .layui-table-header .layui-table-cell`).css({
					height: option.style.headHeight,
					lineHeight: option.style.headHeight + "px",
					color: option.style.fontColor,
					backgroundColor: option.style.headColor,
				});
				// 表体样式设置
				$(`#${tableid}-${containerId} .layui-table-box .layui-table-body .layui-table-cell`).css({
					height: option.style.rowHeight,
					lineHeight: option.style.rowHeight + "px",
					color: option.style.fontColor,
					fontSize: option.style.fontSize,
					backgroundColor: option.style.backColor,
				});
				$(`#${tableid}-${containerId} .layui-table-box .layui-table-body.layui-table-main`).css({
					height: calcTableHeight(option),
				});
				$(`#${tableid}-${containerId} .layui-table-box .layui-table-body .layui-none`).css({
					backgroundColor: option.style.backColor,
				});


				if (!sigleDetail) {
					// 拖拽生成时发送请求，保存明细位置信息
					var params = new Array();
					var param = {
						"componentId": option.id,
						"componentType": COMPONENT_TYPE.DETAIL,
						"x": option.style.x,
						"y": option.style.y,
						"width": option.style.width,
					};
					params.push(param);
					graph.pageModel.invoke("initComponentInfo", params);
				}
			}
		});
		//执行一个laypage实例
		laypage.render({
			elem: `${tableid}-${containerId}-pagination`,
			count: option.rowCount, //数据总数，从服务端得到
			limit: option.pageSize,
			limits: [5, 10, 20, 30, 40, 50, 100],
			groups: 1,
			theme: "#55a0f5",
			prev: '<i class="layui-icon layui-icon-left" style="font-size: 14px"></i>',
			next: '<i class="layui-icon layui-icon-right" style="font-size: 14px"></i>',
			layout: ['prev', 'page', 'next', 'limit', 'count'],
			jump: function (obj, first) {
				//obj包含了当前分页的所有参数，比如：
				// console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
				// console.log(obj.limit); //得到每页显示的条数
				//首次不执行
				if (!first) {
					//do something
					graph.pageModel.invoke("pageTurning", {
						id: option.id,
						targetPage: obj.curr,
						pageSize: obj.limit
					})
				}
			}
		});
	})
}
function goDrDetail(paramsMap, mgGraph) {
	if (!paramsMap || typeof (paramsMap) != "object") return;
	var detail = paramsMap["detail"];
	updateTable(detail, mgGraph);
}

function updateTable(detail, mgGraph) {
	var option = detail;
	var tableid = option.id;
	var containerId = mgGraph.container.id;
	option.style.width = option.style.width < 650 ? 650 : option.style.width;
	layui.use(['table', 'laypage'], function () {
		var table = layui.table,
			laypage = layui.laypage;
		table.reload(`${tableid}-${containerId}-box`, {
			cols: renderCols(option.cols),
			limit: option.pageSize,
			data: option.rows,
			done: function (res, curr, count) {
				this.cols = [];

				// 钻取返回键
				if (option.parent) {
					$(`#${tableid}-${containerId}-back`).show();
					$(`#${tableid}-${containerId}`).attr("parent", true);
					$(`#${tableid}-${containerId}-back`).click(function (e) {
						e.stopPropagation();
						updateTable(option.parent, mgGraph);
					})
				} else {
					$(`#${tableid}-${containerId}-back`).hide();
					$(`#${tableid}-${containerId}`).attr("parent", false);
				}

				// 工具栏样式设置
				$(`#${tableid}-${containerId} .tools`).css({
					backgroundColor: option.style.backColor,
					color: option.style.fontColor,
				});
				// 表头样式设置
				$(`#${tableid}-${containerId} .layui-table-box .layui-table-header .layui-table-cell`).css({
					height: option.style.headHeight,
					lineHeight: option.style.headHeight + "px",
					color: option.style.fontColor,
					backgroundColor: option.style.headColor,
				});
				// 表体样式设置
				$(`#${tableid}-${containerId} .layui-table-box .layui-table-body .layui-table-cell`).css({
					height: option.style.rowHeight,
					lineHeight: option.style.rowHeight + "px",
					color: option.style.fontColor,
					fontSize: option.style.fontSize,
					backgroundColor: option.style.backColor,
				});
				$(`#${tableid}-${containerId} .layui-table-box .layui-table-body.layui-table-main`).css({
					height: calcTableHeight(option),
				});
				$(`#${tableid}-${containerId} .layui-table-box .layui-table-body .layui-none`).css({
					backgroundColor: option.style.backColor,
				});

				// 导出按钮
				$(`#${tableid}-${containerId}-export`).css("display", "flex");

				// 给单元格绑定事件   start
				$(`#${tableid}-${containerId} .layui-table-link`).click(function (e) {
					e.stopPropagation();
					mgGraph.pageModel.invoke("drilling", {
						id: tableid,
						field: $(this).attr("field"),
						value: $(this).text()
					});
				});
				// end
			}
		});
		//执行一个laypage实例
		laypage.render({
			elem: `${tableid}-${containerId}-pagination`,
			count: option.rowCount, //数据总数，从服务端得到
			limit: option.pageSize,
			limits: [5, 10, 20, 30, 40, 50, 100],
			groups: 1,
			theme: "#55a0f5",
			prev: '<i class="layui-icon layui-icon-left" style="font-size: 14px"></i>',
			next: '<i class="layui-icon layui-icon-right" style="font-size: 14px"></i>',
			layout: ['prev', 'page', 'next', 'limit', 'count'],
			jump: function (obj, first) {
				//obj包含了当前分页的所有参数，比如：
				// console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
				// console.log(obj.limit); //得到每页显示的条数
				//首次不执行
				if (!first) {
					//do something
					mgGraph.pageModel.invoke("pageTurning", {
						id: option.id,
						targetPage: obj.curr,
						pageSize: obj.limit
					})
				}
			}
		});
	})
}
function changeDetailPage(detail, containerId, mgGraph) {
	var option = detail;
	var tableid = option.id;
	layui.use(['table'], function () {
		var table = layui.table;
		table.reload(`${tableid}-${containerId}-box`, {
			limit: option.pageSize,
			cols: renderCols(option.cols),
			data: option.rows,
			done: function (res, curr, count) {
				this.cols = [];

				// 钻取返回键
				if (option.parent) {
					$(`#${tableid}-${containerId}-back`).show();
					$(`#${tableid}-${containerId}`).attr("parent", true);
					$(`#${tableid}-${containerId}-back`).click(function (e) {
						e.stopPropagation();
						updateTable(option.parent, mgGraph);
					})
				} else {
					$(`#${tableid}-${containerId}-back`).hide();
					$(`#${tableid}-${containerId}`).attr("parent", false);
				}
				// 工具栏样式设置
				$(`#${tableid}-${containerId} .tools`).css({
					backgroundColor: option.style.backColor,
					color: option.style.fontColor,
				});
				// 表头样式设置
				$(`#${tableid}-${containerId} .layui-table-box .layui-table-header .layui-table-cell`).css({
					height: option.style.headHeight,
					lineHeight: option.style.headHeight + "px",
					color: option.style.fontColor,
					backgroundColor: option.style.headColor,
				});
				// 表体样式设置
				$(`#${tableid}-${containerId} .layui-table-box .layui-table-body .layui-table-cell`).css({
					height: option.style.rowHeight,
					lineHeight: option.style.rowHeight + "px",
					color: option.style.fontColor,
					fontSize: option.style.fontSize,
					backgroundColor: option.style.backColor,
				});
				$(`#${tableid}-${containerId} .layui-table-box .layui-table-body.layui-table-main`).css({
					height: calcTableHeight(option),
				});
				$(`#${tableid}-${containerId} .layui-table-box .layui-table-body .layui-none`).css({
					backgroundColor: option.style.backColor,
				});

				// 导出按钮
				// $(`#${tableid}-${containerId}-export`).css("display", "flex");
				// $(`#${tableid}-${containerId}-export`).click(function (e) {
				//   e.stopPropagation();
				//   $(this).hasClass("expand") ? $(this).removeClass("expand") : $(this).addClass("expand")
				// });

				// 给单元格绑定事件   start
				$(`#${tableid}-${containerId} .layui-table-link`).click(function (e) {
					e.stopPropagation();
					mgGraph.pageModel.invoke("drilling", {
						id: tableid,
						field: $(this).attr("field"),
						value: $(this).text()
					});
				});
			}
		});

	})
}
//hfxie 设计态添加功能:点击特性值右键选中 -> 高亮显示对应明细
function eigenDetail(paramsMap, mgGraph) {
	if (!paramsMap || typeof (paramsMap) != "object") return;
	var tableid = paramsMap["detailid"];
	var containerId = mgGraph.container.id;
	let node = `#${tableid}-${containerId}`; console.log(node);
	$(node)
		.addClass("active")
		.css('z-index', '1')
		.siblings("div.detail-table")
		.removeClass("active")
		.css("z-index", "0")
}
function setPanelInfo(paramsMap, mgGraph){
	if (!paramsMap || typeof (paramsMap) != "object") return;
	var _info = $("div[data-page-id='" + mgGraph.pageModel.pageId + "_customcontrolap']").children("#mmc_bizDesigner").children(".left-panel").children(".panel-info")
	_info.find(".panel-info-name").html(paramsMap.name).attr('title',paramsMap.name)
	_info.find(".panel-info-bh").html(paramsMap.number)
	

}
	// -------END--------