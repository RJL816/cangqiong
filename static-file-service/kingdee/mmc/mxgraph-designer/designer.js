function designerInit(container, model) {
	if (!mxClient.isBrowserSupported()) {
		mxUtils.error('该浏览器不支持mxGraph', 200, false);
		return;
	}
	mxConnectionHandler.prototype.connectImage = new mxImage('kingdee/mmc/mxgraph-designer/src/images/connector.gif', 16, 16);
	// Creates the div for the graph
	container.style.position = 'absolute';
	container.style.overflow = 'hidden';
	container.style.left = '0px';
	container.style.top = '0px';
	container.style.right = '0px';
	container.style.bottom = '0px';
	container.style.background = 'url("kingdee/mmc/mxgraph-designer/src/images/grid.gif")';
	if (mxClient.IS_QUIRKS) {
		new mxDivResizer(container);
	}
	var graphModel = new mxGraphModel();
	var graph = new mxGraph(container, graphModel);
	// 缩放倍数
	graph.zoomFactor = 1.1;
	// 禁止浏览器右键菜单
	mxEvent.disableContextMenu(container);
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
	graph.pageModel = model;
	return graph;
};

function addListener(graph) {
	graph.addListener(mxEvent.CLICK, function (sender, evt) {
		var cell = evt.getProperty('cell');
		if (sender.isRun && cell.componentType == "phm_eigen_component") {
			sender.pageModel.invoke("showDetail", cell.id);
		}
	});
}
