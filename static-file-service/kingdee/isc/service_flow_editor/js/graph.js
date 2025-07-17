var G = {};
G.freeDivs = [];// 自由的DIV元素
G.usedDivs = [];// 当前正在使用的DIV元素
G.container = null;// 画布容器

G.portBegin = null;// 连接的起点，用于拖动连接的端点
G.portEnd = null;// 连接的终点，用于拖动连接的端点
G.newLinkSource = null;// 新建连接的起始节点
G.targetBroker = null;// 新建连接的目标节点代理，用于显示连接示意图
G.targetBrokerSize = 7;// 目标节点代理的大小（一半宽度）
G.targetNode = null;// 新连接目标节点
G.currentNewLink = null;// 当前新增连接操作
G.priorNode = null;
G.currentLink = null;// 当前连接
G.editable = false;// 是否支持编辑
G.portSize = 4;// 连线端点的大小（一半宽度）
G.margin = 30;// 连线与节点的最大间隔
G.currentNode = null;// 当前选定的节点
G.grid = 10;// 布局最小单位
G.nodeDropped = null;// 节点删除时调用的函数
G.linkDropped = null;// 连接删除时调用的函数
G.linkChange = null;// 连接改变端点时调用的函数 function(link, new_from, new_to)
G.viewNode = null;// 双击节点时调用的函数
G.viewLink = null;// 双击连接时调用的函数
G.viewBlock = null;// 
G.linkStyle = null;// 用于获取连接的颜色、大小。
G.defaultColor = "black";// 默认边框线条颜色
G.hoverColor = "#fbcb09";// 光标移到元素上的边框线条颜色
G.newNodeHtml = null;// 生成新增节点的ＨＴＭＬ
G.newNode = null;// 新增节点后调用
G.newLink = null;// 新增连接后调用
G.resizable = true;// 节点是否可以改变大小
G.prior_click_time = new Date();// 前一次点击时间
G.NOT_SHOW_NEW_LINK_ERROR = true;
G.RANGE_DIV = null;// 用来标识选择范围的DIV框
G.getNodeData = null;// 获取节点数据
G.newLinkFlag = null;// 新连接指示器
G.allowShowMenu = false;// 是否显示菜单
G.defaultNodeSize = function(type) {// 新建节点默认大小
	return {
		width : 200,
		height : 45
	}
};
G.couldBeLinkSource = function(node) {
	return true;// 节点是否可以作为连接起点
};
G.couldBeLinkTarget = function(node) {
	return true;// 节点是否可以作为连接目标
};

G.couldBeDeleted = function(node) {
	return true;// 节点是否可以删除
}

// 初始化
G.init = function(container) {
	G.container = container;
	container.style.zIndex = 0;

	if (!G.editable) {// 查看
		$(container).click(function(e) {
			var line = e.target;
			if (line.isLine) {
				if (G.viewLink)
					G.viewLink(line.ref);
			}
			return false;
		});
	} else {// 图形编辑
		G.portBegin = G.innerAddNode("", 0, 0, "port");
		G.initPort(G.portBegin);
		G.portEnd = G.innerAddNode("", 0, 0, "port");
		G.initPort(G.portEnd);
		G.targetBroker = G.innerAddNode("", 0, 0, "target_broker");
		G.initTargetBroker();

		// 新连接指示器
		var html = "<div id='NEW_LINK_FLAG' style='position:absolute'></div>";
		$(container).append(html);
		G.newLinkFlag = _("NEW_LINK_FLAG");

		// 初始化创建节点的PANEL，要求使用 class='new_node' 标识
		$(".new_node").mouseover(function() {// 光标移到节点上
			$(this).addClass("hover");
		}).mouseout(function() {// 光标移出节点
			$(this).removeClass("hover");
		}).click(function() {
			G.selectNewLink(null);
			G.selectPriorNode(null);
			G.selectNode(this);
			return false;
		}).attr("type", "new_node");

		$(".new_group").mouseover(function() {// 光标移到节点上
			$(this).addClass("hover");
		}).mouseout(function() {// 光标移出节点
			$(this).removeClass("hover");
		}).click(function() {
			G.selectNewLink(null);
			G.selectPriorNode(null);
			G.selectNode(this);
			return false;
		}).attr("type", "new_group");

		// 初始化创建连接的PANEL，要求使用 class='new_link' 标识
		$(".new_link").mouseover(function() {// 光标移到节点上
			$(this).addClass("hover");
		}).mouseout(function() {// 光标移出节点
			$(this).removeClass("hover");
		}).click(function() {
			G.selectNewLink(this);
			G.selectPriorNode(null);
			return false;
		}).attr("type", "new_link");

		// 取消选择
		var item = $(".new_select").mouseover(function() {// 光标移到节点上
			$(this).addClass("hover");
		}).mouseout(function() {// 光标移出节点
			$(this).removeClass("hover");
		}).click(function(e) {
			G.selectNewLink(null);
			G.selectPriorNode(null);
			G.selectNode(this);
			G.allowShowMenu = false;
			G.hideMenu();
			return false;
		})[0];

		var html = "<div id='RANGE_DIV' class='RANGE_DIV' style='display:none'></div>"
				+ "<div style='position:absolute; left:3000px; top : 2000px'>&nbsp;</div>";
		// 点击容器时，如果是点击连线，则选定当前点击的线；不能在线条上绑定事件，否则会导致内存严重泄露
		$(container).click(G.onclick).mousedown(G.containerMouseDown)
				.mousemove(G.containerMouseMove).mouseup(G.containerMouseUp)
				.scroll(G.hideMenu).append(html);

		// 添加一个用来表示鼠标划定范围的DIV框
		G.RANGE_DIV = _("RANGE_DIV", container);

		// 由于firefox中只有窗口可以响应按键事件，只好如此处理了
		$($.browser.msie ? container : window)//
		.keydown(G.onkeydown).keyup(G.onkeyup);
	}
};

G.getMousePos = function(e) {
	var co = G.coordinate(G.container);
	var x = e.pageX - co.x + G.container.scrollLeft;
	var y = e.pageY - co.y + G.container.scrollTop;
	return {
		x : x,
		y : y
	};
};

G.MBP = null;
G.containerMouseDown = function(e) {
	if (e.target.id !== 'diagram') {
		return;
	}

	G.MBP = G.getMousePos(e);

	G.RANGE_DIV.style.left = "0px";
	G.RANGE_DIV.style.top = "0px";
	G.RANGE_DIV.style.width = "2px";
	G.RANGE_DIV.style.height = "2px";
	G.RANGE_DIV.style.display = "block";
};

G.containerMouseMove = function(e) {
	if (!G.MBP) {
		return;
	}
	var p = G.getMousePos(e);
	var x1 = Math.min(p.x, G.MBP.x);
	var x2 = Math.max(p.x, G.MBP.x);
	var y1 = Math.min(p.y, G.MBP.y);
	var y2 = Math.max(p.y, G.MBP.y);

	G.RANGE_DIV.style.left = x1 + "px";
	G.RANGE_DIV.style.top = y1 + "px";
	G.RANGE_DIV.style.width = x2 - x1 + "px";
	G.RANGE_DIV.style.height = y2 - y1 + "px";

	var e = {
		ctrlKey : true
	};
	// 选定框中的节点
	var nodes = G.usedDivs;
	for (var i = 0; i < nodes.length; i++) {
		var node = nodes[i];
		if (node.isFree || node.isNode !== true)
			continue;

		var c = G.coordinate(node);
		if ((x1 <= c.x && x2 >= c.x + c.width)
				&& (y1 <= c.y && y2 >= c.y + c.height)) {
			G.selectNode(node, e);
		} else {
			G.unselectNode(node);
		}
	}
};

G.containerMouseUp = function(e) {
	if (!G.MBP) {
		G.NOT_CLICK = false;
		return;
	}

	G.RANGE_DIV.style.display = "none";
	var p = G.getMousePos(e);
	var x1 = Math.min(p.x, G.MBP.x);
	var x2 = Math.max(p.x, G.MBP.x);
	var y1 = Math.min(p.y, G.MBP.y);
	var y2 = Math.max(p.y, G.MBP.y);
	G.MBP = null;

	if (x2 - x1 > 10 || y2 - y1 > 10) {
		G.NOT_CLICK = true;
	} else {
		G.NOT_CLICK = false;
	}
};

G.onkeyup = function(e) {
	$(G.container).removeClass("COPY_THIS_NODE");
};

G.onkeydown = function(e) {
	// 取消对所有节点、连接的选定
	if (e.keyCode == 27) {
		G.unselect();
	}

	if (G.currentNewLink) {
		// 新建连接，不响应按键事件
		return;
	}

	if (e.keyCode == 46) {// delete键, 删除连接
		G.dropCurrent();
	}

	// 取消选择的新建连接、链接开始节点
	if (e.ctrlKey) {
		G.unselect2();
	}

	if (e.ctrlKey && G.dragging) {
		$(G.container).addClass("COPY_THIS_NODE");
	}

	if (e.ctrlKey && e.keyCode == 65) {// CTRL+A
		// 选定流程图的全部节点
		var nodes = G.getAllNodes();
		var e = {
			ctrlKey : true
		};

		for (var i = 0; i < nodes.length; i++) {
			G.selectNode(nodes[i], e);
		}
		return false;
	}
};

G.dropCurrent = function() {
	if (G.currentNode) {// 删除节点
		if (G.currentNode.isNode !== true) {
			return;
		}

		for (var i = 0; i < G.currentNodes.length; i++) {
			var node = G.currentNodes[i];
			if (!G.couldBeDeleted(node)) {
				var tips = res("life.sys.tips.could_not_be_deleted", $(node).text());
				M.showTips(tips, "warn");
				return;
			}
		}

		
		M.showConfirm(G.editor.dom.KDApi.getLangMsg(G.editor, 'life.sys.warn.delete_node'),
				G.editor.dom.KDApi.getLangMsg(G.editor, 'life.sys.label.delete'), function() {
					for (var i = 0; i < G.currentNodes.length; i++) {
						G.dropNode(G.currentNodes[i]);
					}
					G.selectNode(null);
				});
	} else if (G.currentLink) {// 删除连接
		M.showConfirm(G.editor.dom.KDApi.getLangMsg(G.editor, 'life.sys.warn.delete_link'),
				G.editor.dom.KDApi.getLangMsg(G.editor, 'life.sys.label.delete'), function() {
					G.hidePorts();

					for (var i = 0; i < G.currentLinks.length; i++) {
						var link = G.currentLinks[i];
						G.dropLink(link);
					}
					G.currentLinks = [];
				});
	}
};

G.doNewLink = function(target) {
	var path = G.calcPath2(G.priorNode, target);
	var link = G.addLink(G.priorNode, target, path, G.currentNewLink.id);
	if (G.newLink) {
		if (G.newLink(link, G.currentNewLink.id) === false) {
			// 新建连接后续处理失败，则删除掉。
			G.dropLink(link);
			return;
		}
	}

	// 将当前节点设置为前一个节点方便连续添加连线
	G.selectPriorNode(null);
	if (window.EVENT) {
		EVENT.DATA_CHANGED = true;
	}
	G.selectLink(link, null, true);// 选中新增的连接
};

G.doNewNode = function(type, e) {
	var co = G.coordinate(G.container);
	var x = e.pageX - co.x + G.container.scrollLeft;
	var y = e.pageY - co.y + G.container.scrollTop;

	var html = G.newNodeHtml(type);
	var area = G.defaultNodeSize(type);
	var node = G.addNode(html, x, y, type, area.width, area.height);
	G.selectPriorNode(null);
	if (G.newNode) {
		if (G.newNode(node, type) === false) {
			// 如果新建节点后续处理失败，则删除掉
			G.dropNode(node);
			return;
		}
	}
	G.selectNode(node);
};

G.doNewGroup = function(type, e) {
	G.doNewNode(type, e);
}

G.onclick = function(e) {
	var line = e.target;
	if (line.id === 'diagram') {
		if (G.currentNewLink) {
			// 如果直接点击编辑器空白区，则取消全部选定
			G.selectNode(null);
			G.selectLink(null);
			G.selectNewLink(null);
			G.selectPriorNode(null);
			return;
		}
	}

	if (line.tagName == "PRE") {
		return;
	}

	if (!line.isLine) {
		if (G.currentNode) {
			var type = ($(G.currentNode).attr("type"));
			if (type == "new_node") {// 新建节点
				var type = G.currentNode.id;
				G.doNewNode(type, e);
			} else if (type == "new_group") {// 新建节点组
				var type = G.currentNode.id;
				G.doNewGroup(type, e);
			} else if (G.currentNewLink) {// 如果需要新建连接
				if (!G.priorNode) {// 第一个节点
					if (G.couldBeLinkSource(G.currentNode)) {
						G.selectPriorNode(G.currentNode, e);
					} else {
						G.selectNode(null);
					}
				} else {// 选中第二个节点
					if (!G.checkLink(G.priorNode, G.currentNode,
							G.NOT_SHOW_NEW_LINK_ERROR)) {
						// 取消当前选定作为连接起点的节点，方便继续新建
						G.selectPriorNode(null);
						G.selectNode(null);

						if (G.NOT_SHOW_NEW_LINK_ERROR) {
							G.selectNewLink(null);
						}
						return;
					}

					if (G.couldBeLinkTarget(G.currentNode)) { // 新建连接
						G.doNewLink(G.currentNode);
					} else {
						// 取消当前选定作为连接起点的节点，方便继续新建
						G.selectPriorNode(null);
						G.selectNode(null);
						if (G.NOT_SHOW_NEW_LINK_ERROR) {
							G.selectNewLink(null);
						}
					}
				}
			}
		}

		if (line.id === 'diagram' && !G.NOT_CLICK) {
			// 如果直接点击编辑器空白区，则取消全部选定
			G.selectNode(null);
			G.selectLink(null);
			G.selectNewLink(null);
			G.selectPriorNode(null);
		}
		return;
	}

	var link = line.ref;

	if (link == G.currentLink) {
		if (!G.currentNewLink
				&& new Date().getTime() - G.prior_click_time.getTime() < 300) {
			if (G.viewLink)
				G.viewLink(link);
			return;
		}
	}

	G.selectLink(link, e);
	G.selectNewLink(null);
	G.selectPriorNode(null);
	G.prior_click_time = new Date();
	return false;
};

G.selectPriorNode = function(node) {
	if (G.priorNode == node) {
		return;
	}

	if (G.priorNode) {
		$(G.priorNode).removeClass("prior-node");

		// 隐藏目标节点代理并删除连接示意线
		G.targetBroker.style.display = "none";
		var link = G.targetBroker.links[0];
		if (link) {
			G.removeLink(link);
		}
		G.hidePorts();
	}

	G.priorNode = node;
	if (node) {
		$(node).addClass("prior-node");

		var port = G.calcPort(node);// 起始节点的默认连接点
		var c = G.coordinate(node);// 起始节点的位置与大小
		var i = port.indexOf(":");
		var direction = port.substring(0, i);
		var offset = parseInt(port.substring(i + 1));
		var path;
		switch (direction) {
		case "bottom":
			path = port + "|top:0";
			G.targetBroker.style.top = c.y + c.height + 50 + "px";
			G.targetBroker.style.left = c.x + c.width / 2 - G.targetBrokerSize
					+ offset + "px";
			break;
		case "top":
			path = port + "|bottom:0";
			G.targetBroker.style.top = c.y - 50 + "px";
			G.targetBroker.style.left = c.x + c.width / 2 - G.targetBrokerSize
					+ offset + "px";
			break;
		case "left":
			path = port + "|right:0";
			G.targetBroker.style.top = c.y + c.height / 2 - G.targetBrokerSize
					+ offset + "px";
			G.targetBroker.style.left = c.x - 50 + "px";
			break;
		case "right":
			path = port + "|left:0";
			G.targetBroker.style.top = c.y + c.height / 2 - G.targetBrokerSize
					+ offset + "px";
			G.targetBroker.style.left = c.x + c.width + 50 + "px";
			break;
		}

		$(G.targetBroker).removeClass("NOT_TARGET");
		G.targetBroker.style.display = "";
		var link = G.addLink(node, G.targetBroker, path, G.currentNewLink.id);
		G.selectLink(link);
		G.hidePorts();
	}
};

// 取消选择
G.unselect = function() {
	G.selectNode(null);
	G.selectNewLink(null);
	G.selectLink(null);
	G.selectPriorNode(null);
};

// 取消选择
G.unselect2 = function() {
	G.selectNewLink(null);
	G.selectPriorNode(null);
};

// 修饰节点，添加拖拉效果
G.decorateNode = function(node, category) {
	if (!G.editable) {
		$(node).click(function() {// 点击节点
			if (G.viewNode)
				G.viewNode(this);
			return false;
		});
		$(node).mouseover(function() {// 光标移到节点上
			$(this).addClass("hover");
		}).mouseout(function() {// 光标移出节点
			$(this).removeClass("hover");
		});
		// todo 鼠标移进移出事件
		return;
	}

	var nn = $(node);
	if (G.resizable) {// 变更节点大小
		var resizable;
		if (G.resizable === true) {
			resizable = true;
		} else if (G.resizable === false) {
			resizable = false;
		} else {// 函数
			resizable = G.resizable(node);
		}

		if (resizable) {
			nn.resizable({
				start : function(event, ui) {
					G.selectNode(this);
				},
				resize : function(event, ui) {
					G.refreshLinks(this);
				},
				stop : function(event, ui) {
					G.refreshLinks(this);
					G.nodeResized(this);
				}
			});
		}
	}

	nn.draggable({// 节点拖拉
		grid : [ G.grid, G.grid ],
		start : function(event, ui) {
			G.dragging = true;
			G.hideMenu();

			if (!G.isNodeSelected(this)) {
				G.selectNode(this);
			}

			if (event.ctrlKey) {
				$(G.container).addClass("COPY_THIS_NODE");
			}

			// 当前节点的开始位置
			this.beginPos = G.coordinate(this);

			// 其他选定节点的开始位置
			for (var i = 0; i < G.currentNodes.length; i++) {
				var node = G.currentNodes[i];
				node.beginPos = G.coordinate(node);
			}
		},
		drag : function(event, ui) {
			G.hideMenu();
			// 计算当前节点的拉动位移
			var currentPos = G.coordinate(this);
			var beginPos = this.beginPos;
			var x = currentPos.x - beginPos.x;
			var y = currentPos.y - beginPos.y;

			// 设置其他选定节点的新位置、刷新连接线、设置是否可以复制
			for (var i = 0; i < G.currentNodes.length; i++) {
				var node = G.currentNodes[i];
				if (node != this) {
					var c = node.beginPos;
					node.style.left = c.x + x + "px";
					node.style.top = c.y + y + "px";
				}
				G.refreshLinks(node);
			}
		},
		stop : function(event, ui) {
			G.hideMenu();
			G.dragging = false;

			// 计算当前节点的拉动位移
			var currentPos = G.coordinate(this);
			if (currentPos.x < 0) {
				currentPos.x = 0;
				this.style.left = "0px";
			}
			if (currentPos.y < 0) {
				currentPos.y = 0;
				this.style.top = "0px";
			}

			var beginPos = this.beginPos;
			var x = currentPos.x - beginPos.x;
			var y = currentPos.y - beginPos.y;

			// 设置其他选定节点的新位置、刷新连接线、设置是否可以复制
			for (var i = 0; i < G.currentNodes.length; i++) {
				var node = G.currentNodes[i];
				if (node != this) {
					var c = node.beginPos;
					node.style.left = c.x + x + "px";
					node.style.top = c.y + y + "px";
				}
				G.refreshLinks(node);
			}

			// 拉动的范围很小以至于被忽略，则视为点击事件，以免用户手抖，总是选中不了节点
			var currentPos = G.coordinate(this);
			var beginPos = this.beginPos;
			var x = currentPos.x - beginPos.x;
			var y = currentPos.y - beginPos.y;
			if (x == 0 && y == 0) {// 没有实际移动，则识别为点击事件
				G.onclick(event);
				return;
			}

			if (event.ctrlKey) {// 复制
				var list = [];
				for (var i = 0; i < G.currentNodes.length; i++) {
					// 复制节点
					var node = G.currentNodes[i];
					var pos = G.coordinate(node);
					var copied = G.doCopyNode(node, pos);
					if (copied) {
						list.push(copied);
					}

					// 恢复原节点位置
					var beginPos = node.beginPos;
					node.style.left = beginPos.x + "px";
					node.style.top = beginPos.y + "px";
					G.refreshLinks(node);
				}

				if (list.length > 0) {
					// 选中复制的节点
					G.selectNode(null);
					for (var i = 0; i < list.length; i++) {
						G.selectNode(list[i], {
							ctrlKey : true
						});
					}
				}
			} else {//
				for (var i = 0; i < G.currentNodes.length; i++) {
					var node = G.currentNodes[i];
					G.nodeMoved(node);
				}
			}
		}
	}).mouseover(function(event, ui) { // 光标移到节点上
		if (G.currentNewLink) {// 新建连接时
			if (G.priorNode) {// 已选起点
				if (!G.couldBeLinkTarget(this)//
						|| !G.checkLink(G.priorNode, this, true)) {
					$(this).addClass("NOT_ALLOWED");
				}
			} else {// 未选起点
				if (!G.couldBeLinkSource(this)) {
					$(this).addClass("NOT_ALLOWED");
				}
			}
		} else {
			$(this).addClass("hover");
			G.showMenu(this);
		}
	}).mouseout(function(event, ui) {// 光标移出节点
		if (G.priorNode) {
			$(this).removeClass("NOT_ALLOWED");
		} else {
			$(this).removeClass("hover");
		}
		G.newLinkFlag.style.display = "none";
	}).mousemove(
			function(e, u) {
				if (!G.currentNewLink) {
					return;// 不是新建连接，直接返回
				}
				if (G.priorNode == this) {
					return;// 已选中当前节点作为起点
				}
				if (this.className.indexOf("NOT_ALLOWED") >= 0) {
					return;// 不允许作为连接起点
				}

				var p = $(this).offset();
				this.MOUSE_POS = {
					x : e.pageX - p.left,
					y : e.pageY - p.top
				};// 记录下鼠标点击位置，方便后续划连接线

				var port = G.calcPort(this);
				var c = G.coordinate(this);
				var i = port.indexOf(":");
				var direction = port.substring(0, i);// 连线起点方向
				var offset = parseInt(port.substring(i + 1));// 相对边框中心偏移量
				var p = null;
				switch (direction) {
				case "top":
					p = {
						x : c.x + Math.floor(c.width / 2) + 1
								- G.targetBrokerSize + offset,
						y : c.y - G.targetBrokerSize * 2
					};
					break;
				case "bottom":
					p = {
						x : c.x + Math.floor(c.width / 2) + 1
								- G.targetBrokerSize + offset,
						y : c.y + c.height
					};
					break;
				case "left":
					p = {
						x : c.x - G.targetBrokerSize * 2,
						y : c.y + Math.floor(c.height / 2) + 1
								- G.targetBrokerSize + offset
					};
					break;
				case "right":
					p = {
						x : c.x + c.width,
						y : c.y + Math.floor(c.height / 2) + 1
								- G.targetBrokerSize + offset
					};
					break;
				}

				G.newLinkFlag.className = "NEW_LINK_DIR_" + direction;
				G.newLinkFlag.style.display = "";
				G.newLinkFlag.style.left = p.x + "px";
				G.newLinkFlag.style.top = p.y + "px";
			}).click(function(e) {// 单击节点
		// 用鼠标位置减去节点左上角坐标获取点击位置的相对坐标（当前节点）
		var p = $(this).offset();
		this.MOUSE_POS = {
			x : e.pageX - p.left,
			y : e.pageY - p.top
		};// 记录下鼠标点击位置，方便后续划连接线

		if (e.target.className == "min_close_button") {
			// 如果点击的是删除按钮
			G.selectNode(this);
			G.dropCurrent();
			return;
		}

		if (G.currentNode == this) {
			if (new Date().getTime() - G.prior_click_time.getTime() < 300) {
				if (!G.currentNewLink && G.viewNode)
					G.viewNode(this);
			}
		} else {
			G.selectNode(this, e);
		}

		G.prior_click_time = new Date();
	}).mousedown(function(e) {
		if (e.button == 2) {// 右键
			G.allowShowMenu = true;
			G.showMenu(this);
			G.selectNode(this);
			return false;
		}
	});
};

/**
 * 复制节点
 */
G.doCopyNode = function(node, p) {
	var data = copyMap(G.getNodeData(node));
	data.title += "(复制)";
	var type = data.type;

	var html = G.newNodeHtml(type, data);
	var node = G.addNode(html, p.x, p.y, type, p.width, p.height);
	if (G.copyNode) {
		if (G.copyNode(node, data) === false) {
			// 如果复制失败，则删除掉
			G.dropNode(node);
			return null;
		}
	}

	if (window.EVENT) {
		EVENT.DATA_CHANGED = true;
	}
	return node;
};

G.isNodeSelected = function(node) {
	if (G.currentNode == node) {
		return true;
	}
	for (var i = 0; i < G.currentNodes.length; i++) {
		if (G.currentNodes[i] == node) {
			return true;
		}
	}

	return false;
};

G.currentLinks = [];

// 显示连线的两个端点
G.selectLink = function(link, e) {
	// 取消选定节点
	if (link) {
		G.selectNode(null);
	} else {
		G.hidePorts();
	}

	// 如果没有按ctrl键则恢复当前选点连接的线条
	if (!(e && e.ctrlKey)) {
		for (var i = 0; i < G.currentLinks.length; i++) {
			G.restoreLink(G.currentLinks[i]);
		}
		G.currentLinks = [];
	}

	// 设置当前连接
	G.currentLink = link;
	if (!link)
		return;

	// 当前连接集中不存在时，才加入
	var exists = false;
	for (var i = 0; i < G.currentLinks.length; i++) {
		if (G.currentLinks[i] == link) {
			exists = true;
		}
	}
	if (!exists) {
		G.currentLinks.push(link);
	}

	// 设置当前连接
	G.restoreLink(link, G.hoverColor, "selected_line");

	// 显示起始端点
	var x = link[0][0];
	var y = link[0][1];
	G.showPort(G.portBegin, link.from, x, y);

	// 显示结束端点
	var j = link.length - 1;
	x = link[j][2];
	y = link[j][3];
	G.showPort(G.portEnd, link.to, x, y);
};

// 隐藏端点
G.hidePorts = function() {
	G.portBegin.style.display = "none";
	G.portEnd.style.display = "none";
};

// 恢复连接本来的样式
G.restoreLink = function(link, color, className) {
	if (!color) {
		color = G.linkStyle(link.type).color || G.defaultColor;
	}

	if (className) {
		link.BAK_CLASS = className;
	} else if (!link.BAK_CLASS) {
		link.BAK_CLASS = "selected_line";
	}

	var size = link.style.size;
	if (!size)
		size = "2.2";

	for (var i = 0; i < link.length; i++) {
		var line = link[i];
		var style = line.div.style;
		if (className) {
			$(line.div).addClass(className);
		} else {
			$(line.div).removeClass(link.BAK_CLASS);
		}

		if (line[0] == line[2]) {// 垂直
			style.borderLeft = size + "px solid " + color;
		} else {// 水平
			style.borderTop = size + "px solid " + color;
		}
	}

	if (link.annotation) {
		if (className) {
			$(link.annotation).addClass(className);
		} else {
			$(link.annotation).removeClass(link.BAK_CLASS);
		}
	}

	if (link.arrow) {
		link.arrow.style.backgroundColor = color;
		if (className) {
			$(link.arrow).addClass(className);
		} else {
			$(link.arrow).removeClass(link.BAK_CLASS);
		}
	}

	if (link.start) {
		link.start.style.backgroundColor = color;
		if (className) {
			$(link.start).addClass(className);
		} else {
			$(link.start).removeClass(link.BAK_CLASS);
		}
	}
};

// 显示连线端点
G.showPort = function(port, node, x, y) {
	port.style.left = (x - G.portSize) + 'px';
	port.style.top = (y - G.portSize) + 'px';
	port.style.display = '';
	port.ref = node;
};

// 连线端点初始化
G.initPort = function(port) {
	port.style.display = "none";
	$(port).draggable({
		start : function() {
			// G.selectNewLink(null);
		},
		drag : function(event, ui) {
			G.syncLink(this);
		},
		stop : function(event, ui) {
			G.syncLink(this, true);
		}
	});
};

G.initTargetBroker = function() {
	G.targetBroker.style.display = "none";

	$(G.targetBroker).draggable({
		start : function() {
		},
		drag : function(event, ui) {
			G.targetBrokerDragging();
		},
		stop : function(event, ui) {
			G.targetBrokerDragStop();
		}
	})
};

G.setTargetNode = function(node) {
	if (G.targetNode) {
		$(G.targetNode).removeClass("current");
	}

	G.targetNode = node;
	if (node) {
		$(node).addClass("current");
	}
}

G.targetBrokerDragging = function() {
	G.refreshTargetPath();
	G.refreshLinks(G.targetBroker);
	G.selectLink(G.targetBroker.links[0]);
	G.hidePorts();
}

G.targetBrokerDragStop = function() {
	G.refreshTargetPath();

	var node = G.targetNode;
	if (node) {
		if (G.couldBeLinkTarget(node)// 可以作为目标节点
				&& G.checkLink(G.priorNode, node, true)// 可以建立连接
		) {// 新建连接
			G.doNewLink(node);
			G.unselectNode(node);
			return;
		}
	}

	var broker = G.targetBroker;
	$(broker).removeClass("NOT_TARGET");
	G.selectPriorNode(null);

	// G.refreshLinks(broker);
	// G.selectLink(broker.links[0]);

	// G.selectNode(null);
};

/**
 * 
 * 根据目标节点代理的位置刷新示意连线的路径
 * 
 */
G.refreshTargetPath = function() {
	var broker = G.targetBroker;
	var c = G.coordinate(broker);
	var node = G.findNode(c.x, c.y);
	if (!node) {// 鼠标当前不在节点上方
		$(broker).removeClass("NOT_TARGET");
		G.setTargetNode(null);
		return null;
	} else if (node == G.priorNode) {
		// 连接的起点和目标不能是同一个节点
		G.setTargetNode(null);
		return null;
	} else {
		var c2 = G.coordinate(node);
		node.MOUSE_POS = {
			x : c.x + G.targetBrokerSize - c2.x,
			y : c.y + G.targetBrokerSize - c2.y
		}

		var port = G.calcPort(node);
		var j = port.indexOf(":");
		var link = broker.links[0];
		var path = link.path;
		var i = path.indexOf("|");

		link.path = path.substring(0, i) + "|" + (port.substring(0, j) + ":0");

		if (!G.couldBeLinkTarget(node) || !G.checkLink(link.from, node, true)) {
			$(broker).addClass("NOT_TARGET");
			G.setTargetNode(null);
			return null;
		} else {
			$(broker).removeClass("NOT_TARGET");
			G.setTargetNode(node);
			return node;
		}
	}
};

/**
 * 获取全部节点
 */
G.getAllNodes = function() {
	var all = G.usedDivs;
	var nodes = [];
	for (var i = 0; i < all.length; i++) {
		var node = all[i];
		if (node.isFree || node.isNode !== true)
			continue;

		nodes.push(node);
	}
	return nodes;
};

G.findNode = function(x, y, current) {
	var nodes = G.usedDivs;
	for (var i = 0; i < nodes.length; i++) {
		var node = nodes[i];
		if (node.isFree || node.isNode !== true)
			continue;

		var c = G.coordinate(node);
		if (x > c.x && x < c.x + c.width && y > c.y && y < c.y + c.height) {
			return current != node ? node : null;
		}
	}
	return null;
};

G.syncLink = function(port, checkPort) {
	if (window.EVENT) {
		EVENT.DATA_CHANGED = true;
	}

	// 端点中心
	var x = parseInt(port.style.left) + G.portSize;
	var y = parseInt(port.style.top) + G.portSize;

	// 当前连线
	var link = G.currentLink;

	// 检查端点是否已经移到一个新的节点上
	var target = (checkPort && G.linkChange) ? G.findNode(x, y, node) : null;
	if (target) {// 可能变换端点
		var from = link.from == port.ref ? target : link.from;
		var to = link.to == port.ref ? target : link.to;
		if (!G.checkLink(from, to, true)) {
			target = null;// 违反连接规则，不能改变连线的端点
		}
	}

	// 确定节点的中心
	var node = target ? target : port.ref;
	var co = G.coordinate(node);
	var x0 = co.x + co.width / 2;
	var y0 = co.y + co.height / 2;

	// 两个中心点的位移
	var xx = x - x0, yy = y - y0;
	var path;
	if (Math.abs(xx) >= Math.abs(yy)) {// 左、右两边
		if (Math.abs(yy) * 2 > co.height - 1) {
			yy = (co.height / 2 - 1) * (yy < 0 ? -1 : 1);
		}
		if (xx >= 0) {// 右边
			path = "right:" + yy;
		} else {// 左边
			path = "left:" + yy;
		}
	} else {// 上、下两边
		if (Math.abs(xx) * 2 > co.width - 1) {
			xx = (co.width / 2 - 1) * (xx < 0 ? -1 : 1);
		}

		if (yy < 00) {// 上边
			path = "top:" + xx;
		} else {// 下边
			path = "bottom:" + xx;
		}
	}

	// 确定连接的路径描述
	var tmp = link.path.split("|");
	if (G.portBegin == port) {
		path = path + "|" + tmp[1];
	} else if (G.portEnd == port) {
		path = tmp[0] + "|" + path;
	} else {
		alert("error link.");
	}

	if (!target) {// 连线没有更换节点
		// 重画连线，并重置端点
		G.repaintLink(link, path);
		G.selectLink(link);
		if (checkPort) {// 连接端点移动结束
			G.pathChange(link, path);
		}
		return true;
	} else {// 连线的端点变更了
		var from = link.from == port.ref ? target : link.from;
		var to = link.to == port.ref ? target : link.to;
		if (G.linkChange(link, from, to, path) === false) {
			return;// 不能改变连接的端点
		}

		// 需要从原来的节点连接中删除，免得删除原来节点时，误删本连接。
		G.fastRemove(port.ref.links, link);

		// 改变连接的端点，并重绘连接线
		link.from = from;
		link.to = to;
		G.repaintLink(link, path);
		G.selectLink(link);
		target.links.push(link);
	}
};

// 从列表中删除元素
G.fastRemove = function(list, e) {
	if (list.length == 0) {
		alert("list is empty!");
		return;
	}

	var j = -1;
	for (var i = 0; i < list.length; i++) {
		if (list[i] == e) {
			j = i;
			break;
		}
	}
	if (j < 0) {
		alert("remove e from list failed, e not exists.");
		return;
	}

	if (j == list.length - 1) {// 最后一个
		list.pop();
	} else {// 替换为最后一个
		list[j] = list.pop();
	}
};

// 申请一个DIV元素
G.allocDiv = function() {
	var div;
	if (G.freeDivs.length > 0) {
		div = G.freeDivs.pop();
	} else {
		div = document.createElement("div");
	}

	div.isFree = false;
	div.isNode = false;
	G.usedDivs.push(div);

	return div;
};
// 回收一个DIV元素
G.freeDIV = function(div, irrecycleable) {
	if (!div) {
		return;
	}

	if (div.isFree) {
		alert("duplicated free!");
		return;
	}

	div.parentNode.removeChild(div);

	G.fastRemove(G.usedDivs, div);
	if (irrecycleable) {// 不可回收的撤消绑定
		$(div).unbind();
	} else {// 可回收的保留起来
		G.freeDivs.push(div);
	}

	div.innerHTML = "";
	div.isFree = true;
	div.ref = null;
	div.isLine = null;
	div.style.backgroundColor = "";
	div.style.borderLeft = "";
	div.style.borderTop = "";
	div.style.minWidth = "";
	div.style.width = "";
	div.style.height = "";
};

// 添加一个节点
G.addNode = function(html, x, y, type, width, height,tips) {// 方法中多传一个tips参数，省去全局变量。
	x = Math.floor(Math.max(0, x) / G.grid) * G.grid;
	y = Math.floor(Math.max(0, y) / G.grid) * G.grid;
	
	var html2 = "<div class='node_content'>" + html + "</div>";
	// 根据tips是否存在为node加一个title
	var nodeRunningState = tips ? ("nodeRunningState_" + tips.state) : "nodeRunningState_unExecuted";// 配置节点div的class
	var nodeRunningTitle = tips ? G.getTitle(tips) : "";// 配置节点div的title
	html2 = "<div class='"+ nodeRunningState + "'" 
			+ "title='"+ nodeRunningTitle+"'>" + html2 + "</div>";
	var category = G.getCategory(type);
	var style = type + " " + category;
	var div = G.innerAddNode(html2, x, y, style, width, height);
	div.isNode = true;
	div.type = type ;
	G.decorateNode(div, category);// 添加编辑事件响应
	return div;
};


// 添加一个节点
G.innerAddNode = function(html, x, y, style, width, height) {
	var div = G.allocDiv();
	div.innerHTML = html;
	div.style.left = x + 'px';
	div.style.top = y + 'px';
	div.style.position = "absolute";
	div.style.width = width ? width + "px" : "";
	div.style.height = height ? height + "px" : "";
	div.className = style;
	div.links = [];
	G.container.appendChild(div);
	return div;
};

G.currentNodes = [];

G.unselectNode = function(node) {
	$node = $(node);
	if (!$node.hasClass("current")) {
		return;
	}

	$node.removeClass("current").removeClass("hover")
			.removeClass("NOT_ALLOWED");

	// 将节点从当前节点集中删除
	var top = G.currentNodes.pop();
	if (node != top) {
		for (var i = 0; i < G.currentNodes.length; i++) {
			if (G.currentNodes[i] == node) {
				G.currentNodes[i] = top;
				break;
			}
		}
	}

};

// 将节点设置为选定
G.selectNode = function(node, e) {
	if (node) {
		G.selectLink(null);
		G.showMenu(node);
	} else {
		G.allowShowMenu = false;
		G.hideMenu();
	}

	if (G.currentNode) {
		$node = $(G.currentNode);
		if ($node.hasClass("new_node")) {// 选择板上的 “新建节点” 类节点，不支持多选
			$node.removeClass("current").removeClass("hover").removeClass(
					"NOT_ALLOWED");
			$(G.container).removeClass("ADD_NEW_NODE");
		}
	}

	if (!(e && e.ctrlKey)) {// 如果没有按住CTRL键当前节点的选定和其他设置
		for (var i = 0; i < G.currentNodes.length; i++) {
			$(G.currentNodes[i]).removeClass("current").removeClass("hover")
					.removeClass("NOT_ALLOWED");
		}
		G.currentNodes = [];
	}

	G.currentNode = node;
	if (node) {
		var $node = $(node);
		if ($node.hasClass("current")) {
			return;
		}

		$node.addClass("current");
		if ($node.hasClass("new_node")) {
			$(G.container).addClass("ADD_NEW_NODE");
		} else {
			G.currentNodes.push(node);
		}
	}
};

// 新建连接被选定
G.selectNewLink = function(newLink) {
	if (newLink) {
		G.hidePorts();
		G.selectNode(null);
	} else {
		G.newLinkFlag.style.display = "none";
	}

	if (G.currentNewLink == newLink)
		return;

	if (G.currentNewLink) {
		$(G.currentNewLink).removeClass("current");
		$(G.container).removeClass("ADD_NEW_LINK");
	}

	G.currentNewLink = newLink;
	if (newLink) {
		$(newLink).addClass("current");
		$(G.container).addClass("ADD_NEW_LINK");
	}
};

// 计算连接线的端点，pos格式为 (top|right|bottom|left):offset
// 返回值为端点的坐标（x,y）和连接线方向 direction，取值为：horizontal或vertical
G.port = function(co, pos) {
	var tmp = pos.split(":");
	var border = tmp[0];
	var offset = parseInt(tmp[1]);

	// 根据端点所在边确定端点位置
	var x, y, direction, sgn;
	switch (border) {
	case "top":
		y = co.y;
		x = co.x + co.width / 2 + offset;
		direction = "vertical";
		sgn = -1;
		break;
	case "bottom":
		y = co.y + co.height;
		x = co.x + co.width / 2 + offset;
		direction = "vertical";
		sgn = 1;
		break;
	case "left":
		x = co.x;
		y = co.y + co.height / 2 + offset;
		direction = "horizontal";
		sgn = -1;
		break;
	case "right":
		x = co.x + co.width;
		y = co.y + co.height / 2 + offset;
		direction = "horizontal";
		sgn = 1;
		break;
	default:
		alert("路径位置(" + pos + ")格式非法!");

		x = 0;
		y = 0;
		direction = "top";
		sgn = -1;
	}

	return {
		x : x,
		y : y,
		direction : direction,
		offset : offset,
		sgn : sgn
	};
};

// 计算连线的默认路径
G.calcPath = function(node_start, node_end) {
	if (node_start == node_end) {
		return "bottom:5|right:5";
	}

	var c1 = G.coordinate(node_start);
	var c2 = G.coordinate(node_end);
	var x = c2.x - c1.x;
	var y = c2.y - c1.y;
	if (Math.abs(x) >= Math.abs(y)) {
		if (x >= 0) {
			return "right:0|left:0";
		} else {
			return "left:0|right:0";
		}
	} else {
		if (y >= 0) {
			return "bottom:0|top:0";
		} else {
			return "top:0|bottom:0";
		}
	}
};
G.sign = function(v) {
	if (v == 0) {
		return 0;
	} else if (v > 0) {
		return 1;
	} else {
		return -1;
	}
};

G.calcPort = function(node) {
	var c = G.coordinate(node);
	var w = c.width / 2;
	var h = c.height / 2;
	var p = node.MOUSE_POS;
	var x = p.x - w;
	var y = p.y - h;
	if (Math.abs(x) < 5) {
		x = 0;
	}
	if (Math.abs(y) < 5) {
		y = 0;
	}

	if (Math.abs(x) > Math.abs(y)) {// 左 或 右
		if (x > 0) {
			return "right:" + y;
		} else {
			return "left:" + y;
		}
	} else {
		if (y > 0) {
			return "bottom:" + x;
		} else {
			return "top:" + x;
		}
	}
};

G.calcPath2 = function(node_start, node_end) {
	return (G.calcPort(node_start) + "|" + G.calcPort(node_end));
};

G.checkLink = function(node_start, node_end, notShowTips) {
	if (node_start == node_end) {
		if (!notShowTips) {
			M.showTips(res("life.sys.error.connect_to_self"), "error");
		}
		return false;
	}

	for (var i = 0; i < node_start.links.length; i++) {
		var link = node_start.links[i];
		if (link.from == node_start && link.to == node_end) {
			if (!notShowTips) {
				M.showTips(res("life.sys.error.link_duplicated"), "error");
			}
			return false;
		}
	}
	return true;
};

/**
 * 两个节点之间是否存在连接
 */
G.hasLink = function(node_start, node_end) {
	if (node_start == node_end) {
		return true;
	}

	for (var i = 0; i < node_start.links.length; i++) {
		var link = node_start.links[i];
		if (link.from == node_start && link.to == node_end) {
			return true;
		}
	}
	return false;
};

// path 格式为“from-border:offset|to-border:offset”，
// 取值为：top, right, bottom, left之一， offset 为相对于连中点的偏移值
G.addLink = function(node_start, node_end, path, type) {
	var lines = [];
	lines.from = node_start;// 勾住起点
	lines.to = node_end;// 勾住终点
	lines.path = path ? path : G.calcPath(node_start, node_end);// 路径
	lines.type = type;// 类型
	// 绘制连接
	G.paintLink(lines);

	// 在节点上勾住连线
	node_start.links.push(lines);
	if (node_start != node_end)
		node_end.links.push(lines);

	return lines;
};

// 计算注解显示的中心位置
G.calcAnnotationPos = function(link) {
	var p = {};
	// if ((link.length & 1) == 0) {
	// // 双数条连线，有奇数个连接点，将注解置于中间点上。
	// var line = link[Math.floor(link.length / 2) - 1];
	// p.x = line[2];
	// p.y = line[3];
	// } else {// 奇数条连线，取中间线段的中点，将注解置于中点上。
	// var line = link[Math.floor(link.length / 2)];
	//
	// p.x = (line[0] + line[2]) / 2;
	// p.y = (line[1] + line[3]) / 2;
	// }
	// alert($toString(p));

	// 修改为总是置于第一根线段的中点
	var line = link[0];
	if (line[0] == line[2]) {// 垂直 x1 == x2
		p.x = line[0];
		if (line[1] < line[3]) {// 自上向下 y1 < y2
			p.y = line[1] + 20;
		} else {// 自下向上
			p.y = line[1] - 15;
		}
	} else {// 水平 y1 == y2
		p.y = line[1];
		p.dir = "h";
		if (line[0] < line[2]) {// 自左向右 x1 < x2
			p.x = line[0] + 10;
			p.flag = 0;
		} else {// 自右向左 x1 > x2
			p.x = line[0] - 10;
			p.flag = -1;
		}
	}
	return p;
};

// 回收线条
G.freeLink = function(lines) {
	// 回收原线条
	while (lines.length > 0) {
		var line = lines.pop();
		G.freeDIV(line.div);
		line.div = null;
	}

	// 回收箭头
	if (lines.arrow) {
		G.freeDIV(lines.arrow);
		lines.arrow = null;
	}

	// 回收注解
	if (lines.annotation) {
		G.freeDIV(lines.annotation);
		lines.annotation = null;
	}

	// 回收起点
	if (lines.start) {
		G.freeDIV(lines.start);
		lines.start = null;
	}
};

// 绘制连接
G.paintLink = function(lines) {
	var node_start = lines.from;
	var node_end = lines.to;
	var path = lines.path;
	var c1 = G.coordinate(node_start);
	var c2 = G.coordinate(node_end);
	var pos = path.split("|");
	var p1 = G.port(c1, pos[0]);
	var p2 = G.port(c2, pos[1]);

	if (Math.abs(p1.x - p2.x) <= 3) {
		p1.x = (p2.x = (p1.x + p2.x) / 2);
	}
	if (Math.abs(p1.y - p2.y) <= 3) {
		p1.y = (p2.y = (p1.y + p2.y) / 2);
	}

	if (p1.direction == "vertical") {
		if (p2.direction == "vertical") {// 垂直-垂直
			var y;
			if (p1.sgn == p2.sgn) {// 同一方向
				if (p1.sgn < 0) {// 上方
					y = Math.min(p1.y, p2.y) - G.margin;
				} else {// 下方
					y = Math.max(p1.y, p2.y) + G.margin;
				}
			} else {
				y = (p1.y + p2.y) / 2;
			}

			if (// Math.abs(p1.y - p2.y) > 20 &&
			(y >= p1.y && p1.sgn > 0 || y <= p1.y && p1.sgn < 0)) {
				if (p1.x == p2.x) {// 一条垂直线
					lines[0] = [ p1.x, p1.y, p2.x, p2.y ];
				} else {
					// 向下且中间点在下或向上且中间点在上
					// y-=Math.abs(p1.offset+p2.offset)*p1.sgn;
					lines[0] = [ p1.x, p1.y, p1.x, y ];
					lines[1] = [ p1.x, y, p2.x, y ];
					lines[2] = [ p2.x, y, p2.x, p2.y ];
				}
			} else {// 垂直，但方向相反，使用5条线段
				var x = (p1.x + p2.x) / 2;
				var y1 = p1.y + 40 * p1.sgn;// +(G.margin-Math.abs(p2.offset))*p1.sgn;
				var y2 = p2.y + 40 * p2.sgn;// +(G.margin-Math.abs(p1.offset))*p2.sgn;
				lines[0] = [ p1.x, p1.y, p1.x, y1 ];
				lines[1] = [ p1.x, y1, x, y1 ];
				lines[2] = [ x, y1, x, y2 ];
				lines[3] = [ x, y2, p2.x, y2 ];
				lines[4] = [ p2.x, y2, p2.x, p2.y ];
			}
		} else {// 垂直-水平
			var x = p1.x;
			// 在垂直线的同侧
			if (x >= p2.x && p2.sgn > 0 || x <= p2.x && p2.sgn < 0) {
				y = p2.y;
				if (y > p1.y && p1.sgn > 0 || y < p1.y && p1.sgn < 0) {// 单直角折线
					lines[0] = [ p1.x, p1.y, x, y ];
					lines[1] = [ x, y, p2.x, p2.y ];
				} else {// 垂直线反向
					y = p1.y;// +(G.margin-Math.abs(p2.offset))*p1.sgn;
					x = (p1.x + p2.x) / 2;
					lines[0] = [ p1.x, p1.y, p1.x, y ];
					lines[1] = [ p1.x, y, x, y ];
					lines[2] = [ x, y, x, p2.y ];
					lines[3] = [ x, p2.y, p2.x, p2.y ];
				}

			} else {// 水平线反向
				x = p2.x;// +(G.margin-Math.abs(p1.offset))*p2.sgn;
				y = (p1.y + p2.y) / 2;
				// 垂直线反向
				if (y < p1.y && p1.sgn > 0 || y > p1.y && p1.sgn < 0) {
					y = p1.y;// +(G.margin-Math.abs(p2.offset))*p1.sgn;
				}
				lines[0] = [ p1.x, p1.y, p1.x, y ];
				lines[1] = [ p1.x, y, x, y ];
				lines[2] = [ x, y, x, p2.y ];
				lines[3] = [ x, p2.y, p2.x, p2.y ];
			}
		}
	} else {
		if (p2.direction == "vertical") {// 水平-垂直
			var y = p1.y;
			// 在水平线的同侧
			if (y >= p2.y && p2.sgn > 0 || y <= p2.y && p2.sgn < 0) {
				var x = p2.x;
				// 单角折线
				if (x > p1.x && p1.sgn > 0 || x < p1.x && p1.sgn < 0) {
					lines[0] = [ p1.x, p1.y, x, y ];
					lines[1] = [ x, y, p2.x, p2.y ];
				} else {// 水平线反向
					x = p1.x;// +(G.margin-Math.abs(p2.offset))*p1.sgn;
					y = (p1.y + p2.y) / 2;
					lines[0] = [ p1.x, p1.y, x, p1.y ];
					lines[1] = [ x, p1.y, x, y ];
					lines[2] = [ x, y, p2.x, y ];
					lines[3] = [ p2.x, y, p2.x, p2.y ];
				}
			} else {// 垂直线反向
				var y = p2.y;// +(G.margin-Math.abs(p1.offset))*p2.sgn;
				var x = (p1.x + p2.x) / 2;

				// 水平线反向
				if (x > p1.x && p1.sgn < 0 || x < p1.x && p1.sgn > 0) {
					x = p1.x;// +(G.margin-Math.abs(p2.offset))*p1.sgn;
				}

				lines[0] = [ p1.x, p1.y, x, p1.y ];
				lines[1] = [ x, p1.y, x, y ];
				lines[2] = [ x, y, p2.x, y ];
				lines[3] = [ p2.x, y, p2.x, p2.y ];
			}
		} else {// 水平-水平
			var x;
			if (p1.sgn == p2.sgn) {// 同一方向
				if (p1.sgn < 0) {// 左侧
					x = Math.min(p1.x, p2.x) - G.margin;
				} else {// 右侧
					x = Math.max(p1.x, p2.x) + G.margin;
				}
			} else {
				x = (p1.x + p2.x) / 2;
			}

			// var offset=Math.abs(p1.offset+p2.offset);
			// 向左且中间点在左或向右且中间点在右
			if (// Math.abs(p1.x - p2.x) > 20 &&
			(x >= p1.x && p1.sgn > 0 || x <= p1.x && p1.sgn < 0)) {
				if (p1.y == p2.y) {// 一条水平线
					lines[0] = [ p1.x, p1.y, p2.x, p2.y ];
				} else {
					// x-=offset*p1.sgn;
					lines[0] = [ p1.x, p1.y, x, p1.y ];
					lines[1] = [ x, p1.y, x, p2.y ];
					lines[2] = [ x, p2.y, p2.x, p2.y ];
				}
			} else {// 水平，但方向相反，使用5条线段
				var y = (p1.y + p2.y) / 2;
				var x1 = p1.x + 40 * p1.sgn;// +(G.margin-Math.abs(p2.offset))*p1.sgn;
				var x2 = p2.x + 40 * p2.sgn;// +(G.margin-Math.abs(p1.offset))*p2.sgn;
				lines[0] = [ p1.x, p1.y, x1, p1.y ];
				lines[1] = [ x1, p1.y, x1, y ];
				lines[2] = [ x1, y, x2, y ];
				lines[3] = [ x2, y, x2, p2.y ];
				lines[4] = [ x2, p2.y, p2.x, p2.y ];

			}
		}
	}

	if (G.linkStyle) {// 获取连接的样式
		lines.style = G.linkStyle(lines.type);
	}

	// 确定箭头
	if (lines.style.arrow) {
		var line = lines[lines.length - 1];
		if (p2.direction == "vertical") {// 垂直连线
			if (p2.sgn < 0) {// 向下
				line[4] = "down";
			} else {// 向上
				line[4] = "up";
			}
		} else {// 水平连线
			if (p2.sgn < 0) {// 向左
				line[4] = "right";
			} else {// 向右
				line[4] = "left";
			}
		}
	}

	G.drawLines(lines);
};
// 画线与箭头
G.drawLines = function(lines) {
	var type = lines.type;
	type = type ? type : "";

	var color = lines.style.color;// 连线颜色
	if (!color)
		color = G.defaultColor;
	var size = lines.style.size;// 线宽
	if (!size)
		size = "2.2";

	for (var i = 0; i < lines.length; i++) {
		var l = lines[i];
		var div = G.allocDiv();
		l.div = div;// 勾住线条
		div.ref = lines;// 线条引用的对象
		div.isLine = true;// 标记为线条
		div.style.position = "absolute";
		div.style.left = (l[0] < l[2] ? l[0] : l[2]) + 'px';
		div.style.top = (l[1] < l[3] ? l[1] : l[3]) + 'px';
		G.container.appendChild(div);

		var j = (i < lines.length - 1) ? 1 : 0;
		if (l[0] == l[2]) {// x相同，垂直线
			div.style.height = (Math.abs(l[3] - l[1]) + j) + 'px';
			div.style.width = "5px";
			div.className = "line " + type;
			div.style.borderLeft = size + "px solid " + color;
		} else if (l[1] == l[3]) {// y相同，水平线
			div.style.width = (Math.abs(l[2] - l[0]) + j) + 'px';
			div.style.height = '5px';
			div.className = "line " + type;
			div.style.borderTop = size + "px solid " + color;
		} else {
			alert(l[0] + ',' + l[1] + '=>' + l[2] + ',' + l[3]);
		}
	}

	// 最后一条线，用来画箭头
	var line = lines[lines.length - 1];
	if (line.length == 5) {
		var x = line[2];
		var y = line[3];
		var direction = line[4];
		var arrow = G.innerAddNode("", x, y, "arrow " + direction + " " + type);
		arrow.isLine = true;
		arrow.ref = lines;
		arrow.style.backgroundColor = color;
		lines.arrow = arrow;
	}

	// 第1条线画起点
	var line = lines[0];
	var x = line[0] - 2;
	var y = line[1] - 2;
	var start = G.innerAddNode("", x, y, "start-point start-point-" + type);
	start.isLine = true;
	start.ref = lines;
	start.style.backgroundColor = color;
	lines.start = start;

	// 添加注解
	if (lines.label) {
		G.addAnnotation(lines);
	}
};

// 获取元素的位置及大小
G.coordinate = function(el) {
	var co = {};
	co.x = parseInt(el.style.left);
	co.y = parseInt(el.style.top);
	if (el.style.height) {
		co.height = parseInt(el.style.height);
	} else {
		co.height = el.clientHeight + 2;
	}

	if (el.style.width) {
		co.width = parseInt(el.style.width);
	} else {
		co.width = el.clientWidth + 2;
	}
	return co;
};

// 移动节点到新位置
G.moveNode = function(node, x, y) {
	node.style.left = x + 'px';
	node.style.top = y + 'px';
	G.refreshLinks(node);
};

// 刷新节点的连接
G.refreshLinks = function(node) {
	if (!node.links) {
		return;
	}

	if (window.EVENT) {
		EVENT.DATA_CHANGED = true;
	}

	G.hidePorts();
	for (var i = 0; i < node.links.length; i++) {
		var link = node.links[i];
		G.freeLink(link);
		G.paintLink(link);
	}
};

// 删除节点
G.dropNode = function(node) {
	if (!node) {
		alert("node is null!");
		return;
	}

	G.selectNewLink(null);

	// 删除连接
	if (node.links) {
		var linkDropped = G.linkDropped;
		while (node.links.length > 0) {
			var link = node.links.pop();
			// 通知连接删除事件
			if (linkDropped)
				linkDropped(link);

			var other = link.from != node ? link.from : link.to;
			if (other != node)
				G.fastRemove(other.links, link);
			G.freeLink(link);
		}
	}

	// 通知节点删除事件
	if (G.nodeDropped) {
		G.nodeDropped(node);
	}

	G.freeDIV(node, true);
};

// 删除连接
G.dropLink = function(link) {
	if (!link) {
		alert("link is null!");
		return;
	}

	G.selectNewLink(null);

	// 通知连接删除事件
	if (G.linkDropped)
		G.linkDropped(link);

	if (!link.from) {
		alert('duplicated drop link!');
		return;
	}

	G.removeLink(link);
};

/**
 * 从流程图中删除连接，不影响流程图的数据结构
 */
G.removeLink = function(link) {
	G.fastRemove(link.from.links, link);
	if (link.from != link.to)
		G.fastRemove(link.to.links, link);
	G.freeLink(link);
	link.from = link.to = null;
};

// 重新绘制连接
G.repaintLink = function(link, path) {
	if (!link) {
		alert('link is null!');
		return;
	}

	G.freeLink(link);
	link.path = path;
	G.paintLink(link);
};

// 获取节点
G.getNodes = function(style) {
	if (G.currentNode)
		G.selectNode(null);
	var elements = G.usedDivs;
	var nodes = [];
	for (var i = 0; i < elements.length; i++) {
		var e = elements[i];
		if (e.className.indexOf(style) >= 0) {
			nodes.push(e);
		}
	}
	return nodes;
};

// 为连接添加注解
G.addAnnotation = function(link, text) {
	if (text) {
		link.label = text;
	} else {
		text = link.label;
	}
	if (!text)
		return;

	var html = "<pre onclick='G.annotationClick(this,event)'>"//
			+ M.escape(text) + "</pre>";
	var annotation = G.innerAddNode(html, 0, 0, "annotation");
	annotation.isLine = true;
	annotation.ref = link;
	link.annotation = annotation;
	G.setAnnotationPos(link);
};

G.setAnnotationPos = function(link) {
	var annotation = link.annotation;
	var p = G.calcAnnotationPos(link);
	var co = G.coordinate(annotation);
	if (p.dir == "h") {// 水平
		annotation.style.left = (p.x + p.flag * co.width+15) + "px";// 为水平线的注解增加15px到节点的距离，为了美观。
	} else {// 垂直
		annotation.style.left = (p.x - co.width / 2) + "px";
	}
	annotation.style.top = (p.y - co.height / 2) + "px";
};

G.annotationClick = function(a, e) {
	var link = a.parentNode.ref;
	if (link == G.currentLink) {
		if (new Date().getTime() - G.prior_click_time.getTime() < 300) {
			if (!G.currentNewLink && G.viewLink) {
				G.viewLink(link);
				return;
			}
		}
	}

	G.selectLink(link, e);
	G.selectNewLink(null);
	G.selectPriorNode(null);
	G.prior_click_time = new Date();
};

// 为连接设置注解
G.setAnnotation = function(link, text) {
	link.label = text;
	if (link.annotation) {
		var html = "<pre onclick='G.annotationClick(this,event)'>"//
				+ M.escape(text) + "</pre>";
		link.annotation.innerHTML = html;
		G.setAnnotationPos(link);
	} else if (text) {
		G.addAnnotation(link, text);
	}
};

G.open = function() {
	G.selectNewLink(null);

	if (G.currentLink) {
		G.viewLink(G.currentLink);
	} else if (G.currentNode) {
		G.viewNode(G.currentNode);
	}
};

G.beforeSelectStart = function(event) {
	if (M.isMaskShown()) {
		return M.beforeSelectStart(event);
	} else {
		return false;
	}
};

G.menu_target = null;

G.showMenu = function(node) {
	if (!G.allowShowMenu) {
		return;
	} else if (!G.couldBeDeleted(node)) {
		return;
	}

	G.menu_target = node;
	var menu = _("__node_menu");
	if (!menu) {
		var html = "<div id='__node_menu' class='node_menu'>"
				+ "<span class='dup_node'"
				+ " onclick='G.menuDupNode()' title='"
				+ G.editor.dom.KDApi.getLangMsg(G.editor, "life.sys.tips.add_node") + "'></span>"
				+ "<br><span class='remove_node'"
				+ " onclick='G.menuDeleteNode()' title='"
				+ G.editor.dom.KDApi.getLangMsg(G.editor, "life.sys.tips.delete_node") + "'></span></div>";
		$(document.body).append(html);
		menu = _("__node_menu");
	}
	M.showMenu(menu, node, "right");
};

G.hideMenu = function() {
	var menu = _("__node_menu");
	if (menu) {
		menu.style.display = 'none';
	}
};

G.menuDupNode = function() {
	var node = G.menu_target;
	if (!node) {
		return;
	} else {
		G.menu_target = null;
	}

	var c = G.coordinate(node);
	c.x += 20;
	c.y += 20;
	var dup = G.doCopyNode(node, c)
	if (dup) {
		G.selectNode(dup);
	}
};

G.menuDeleteNode = function() {
	var node = G.menu_target;
	if (!node) {
		return;
	} else {
		G.menu_target = null;
	}

	M.showConfirm(G.editor.dom.KDApi.getLangMsg(G.editor, 'life.sys.warn.delete_node'),
			G.editor.dom.KDApi.getLangMsg(G.editor, 'life.sys.label.delete'), function() {
				G.selectNode(node);
				G.dropNode(node);
				G.selectNode(null);
			});
}
