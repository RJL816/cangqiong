var WF = {};

// 记录各类节点连接的默认标题
WF.meta = {};

// 流程定义数据
WF.data = {};

// 对流程图对象的引用
WF.ref = {};

WF.changed = false;

WF.initDiagram = function() {
	// 变量区分已发布流程图和流程实例图，根据WF.acts是否存在区分（已发布历史流程图不存在WF.acts[id]）
	var graphState = false;
	var nodes = WF.data.nodes;
	var focusNode = WF.data.$tag;// TODO 未来支持子流程时，对此值需要额外处理
	var focusList;
	if (focusNode) {
		focusList = focusNode.split(",");
	}
	for (id in nodes) {
		var data = nodes[id];
		if (!data)
			continue;
		var tips = WF.acts[id];
		var html = G.newNodeHtml(data.type, data, tips);
		if (!graphState && tips) {
			graphState = true;
		}

		var c = data.coordinate;
		var node = G.addNode(html, c.x, c.y, data.type, c.width, c.height, tips);
		node.id = data.id;
		node.type = data.type;
		WF.ref[id] = node;

		if (id == focusNode || (focusList && focusList.includes(id))) {// 节点高亮显示移至可视区域
			$(node).addClass("highlight-node");// 节点高亮显示
			if(focusList && focusList.length > 1){
				
			}else{
				node.scrollIntoView();
			}
		}
	}
	var links = WF.data.links;
	for (id in links) {
		var data = links[id];
		if (!data)
			continue;

		var from = document.getElementById(data.source);
		var to = document.getElementById(data.target);
		var type = data.type;
		var tips = WF.trans[data.id];
		// 流程实例：（1）根据G.editable区别设计期；（2）根据graph区分已发布历史版本。
		if (!G.editable && graphState) {
			if (tips) {
				type += "-passed";
			} else {
				type += "-unextcuted";
			}
		}

		var id = data.id ;
		if (id == focusNode || (focusList && focusList && focusList.includes(id))) {// 节点高亮显示移至可视区域
			type = "HightLightTransition";
		}
		var link = G.addLink(from, to, data.path, type, tips);
		link.id = data.id;
		var title = data.title;
		if (title)
			G.addAnnotation(link, title);
		WF.ref[id] = link;
	}
};

G.getCategory = function(type) {
	var cfg = WF.meta[type];
	return cfg.category;
};

WF.initPanel = function() {
	var configs = meta.elements;
	var html = "<table cellpadding='3' cellspacing='0' style='margin:5px;width:130px;'>";
	var group = configs[0].group;
	for (var i = 0; i < configs.length; i++) {
		var cfg = configs[i];
		WF.meta[cfg.type] = cfg;
		if (cfg.hidden || cfg.type.indexOf("Starter") > 0) {
			continue;// 启动节点不允许新增，由流程定义默认生成
		}

		if (cfg.group != group) {
			html += "<tr><td colspan='2'><hr class='seperator' size='1' color='lightgray'></td></tr>";
			group = cfg.group;
		}

		var icon = cfg.icon ? (cfg.icon) : (cfg.type + ".png");
		
		html += "<tr title='" + (cfg.help_text ? G.editor.dom.KDApi.getLangMsg(G.editor,cfg.type+'_ht') :G.editor.dom.KDApi.getLangMsg(G.editor,cfg.type))
				+ "'" + " class='node new_" + cfg.category + "'" //
				+ " id='" + cfg.type + "'><td>" + //
				"<img src='img/" + icon + "'"//
				+ " height='24' width='24'></td>"
				+ "<td style='padding-left:0.5em;text-align:left'>" + G.editor.dom.KDApi.getLangMsg(G.editor,cfg.type)
				+ "</td></tr>";
	}
	html += "<tr><td colspan='2'><hr class='seperator' size='1' color='lightgray'></td></tr>";
	html += "</table>";

	var panel = _("panel");
	if (panel) {
		panel.innerHTML = html;
	}
};

/**
 * 为连接弧提供样式，为区分明显，三种状态线的粗细进行了调整，调整了设计期错误转移颜色变浅粉。
 */
G.linkStyle = function(type) {
	var style = {};
	switch (type) {
	case "NormalTransition":
		style.arrow = true;
		style.color = "rgb(168,168,168)";
		style.size = "2";
		break;
	case "HightLightTransition":
		style.arrow = true;
		style.color = "lightyellow";
		style.size = "2";
		break;
	case "ErrorTransition":
		style.arrow = true;
		style.color = "rgb(251,35,35)";
		style.size = "2";
		break;
	case "CompensationTransition":
		style.arrow = true;
		style.color = "rgb(231,156,81)";
		style.size = "2";
		break;
	case "NormalTransition-passed":
		style.arrow = true;
		style.color = "#5582F3";
		style.size = "2";
		break;
	case "ErrorTransition-passed":
		style.arrow = true;
		style.color = "rgb(251,35,35)";
		style.size = "2";
		break;
	case "CompensationTransition-passed":
		style.arrow = true;
		style.color = "rgb(231,156,81)";
		style.size = "2";
		break;
	case "NormalTransition-unextcuted":
		style.arrow = true;
		style.color = "lightgray";
		style.size = "2";
		break;
	case "ErrorTransition-unextcuted":
		style.arrow = true;
		style.color = "rgb(251,35,35)";
		style.size = "2";
		break;
	case "CompensationTransition-unextcuted":
		style.arrow = true;
		style.color = "lightgray";
		style.size = "2";
		break;
	}
	return style;
};

// 对新节点进行后续处理
G.newNode = function(node, type) {
	var id = WF.newId();
	node.id = id;
	WF.ref[id] = node;

	var data = {};
	data.id = id;
	data.title = G.editor.dom.KDApi.getLangMsg(G.editor,type);
	data.type = type;

	if (!WF.data.nodes) {
		WF.data.nodes = {};
	}

	WF.data.nodes[id] = data;
	data.coordinate = G.coordinate(node);
	G.editor.invoke("add_node", data);
};

G.defaultNodeSize = function(type) {// 新建节点默认大小
	if (type == 'Lane') {
		return {
			width : 400,
			height : 2000
		}
	}else{
		return {
			width : 200,
			height : 45
		}
	}
};

/**
 * 生成新建节点的HTML
 */
G.newNodeHtml = function(type, data, tips) {
	if (type == 'Lane') {
		var title = data ? data.title : WF.meta[type].title;
		var html = "<div class='title'>" + title + "</div>";
	} else {
		var cfg = WF.meta[type];
		var icon = cfg.icon ? (cfg.type + "Blue" + ".svg")
				: (cfg.type + ".png");
		var html ;
		if(cfg.type == 'Block' || cfg.type == 'LoopBlock'){
		  html = "<table><tr><td class='flag'><img src='img/" + icon
				+ "' width='22' height='22' onClick = 'G.viewBlock(this);event.cancelBubble = true' title = '单击此处配置节点块，双击空白区域修改节点块。'></td>";
		  var title = data ? data.title : G.editor.dom.KDApi.getLangMsg(G.editor,type);
		  html += "<td><div class='title'>" + escapeHTML(title) + "</div></td></tr></table>";
		  var tit = tips ? G.getTitle(tips) : "" ;
		  var state = tips ? tips.state : "unExecuted" ;
		  return "<div class='" + state + "' style='text-align:center' title='"+ tit + "'>" + html + "</div>";
		}else{
		  html = "<table><tr><td class='flag'><img src='img/" + icon
				+ "' width='22' height='22'></td>";
		  var title = data ? data.title : G.editor.dom.KDApi.getLangMsg(G.editor,type);
		  html += "<td><div class='title'>" + escapeHTML(title) + "</div></td></tr></table>";
		}
	}
	if (!tips) {
		return html;
	}
	var title = G.getTitle(tips);
	var state = tips.state;
	return "<div class='" + state + "' style='text-align:center' title='"
			+ title + "'>" + html + "</div>";
};
// 将获取title的代码抽出来做getTitle()方法，方便graph.js中对nodeRunningTitle赋值
G.getTitle = function(tips) {
	var state = tips.state;
	var title = state;
	if (tips.count > 1) {
		title += "\r\n总次数: " + tips.count + "\r\n最近一次";
	} else {
		title += "\r\n";
	}
	if (tips.elapsed) {
		var elapsed = parseInt(tips.elapsed);
		if (elapsed < 100) {
			title += "耗时: " + tips.elapsed + " 毫秒";
			if (tips.count > 1 && tips.total_elapsed) {
				title += ", 累计耗时: " + tips.total_elapsed + " 毫秒";
			}
		} else {
			var seconds = elapsed / 1000;
			title += "耗时: " + seconds.toFixed(1) + " 秒";
			if (tips.count > 1 && tips.total_elapsed) {
				var totalSeconds = parseInt(tips.total_elapsed) / 1000;
				title += ", 累计耗时: " + totalSeconds.toFixed(1) + " 秒";
			}
		}
	}
	if (tips.start_time) {
		title += "\r\n开始: " + tips.start_time;
	}
	if (tips.end_time) {
		title += "\r\n结束: " + tips.end_time;
	}
	return title;
}
// 生成新连接
G.newLink = function(link, type) {
	var id = WF.newId();
	link.id = id;
	WF.ref[id] = link;

	var data = {};
	data.id = id;
	data.type = type;
	data.source = link.from.id;
	data.target = link.to.id;
	data.path = link.path;

	if (!WF.data.links) {
		WF.data.links = {};
	}
	WF.data.links[id] = data;
	G.editor.invoke("add_link", data);
};

G.pathChange = function(link, path) {
	G.editor.invoke("path_change", {
		id : link.id,
		path : path
	});
}

G.linkChange = function(link, new_from, new_to, path) {
	var data = WF.data.links[link.id];

	data.source = new_from.id;
	data.target = new_to.id;

	G.editor.invoke("link_change", {
		id : link.id,
		path : path,
		source : data.source,
		target : data.target
	});
};

// 节点删除时处理
G.nodeDropped = function(node) {
	WF.data.compatible = false;
	WF.data.nodes[node.id] = undefined;
	WF.ref[node.id] = undefined;
	G.editor.invoke("drop_node", node.id);
};

G.nodeMoved = function(node) {
	G.editor.invoke("move_node", {
		id : node.id,
		coordinate : G.coordinate(node)
	});
}

// 连接删除时处理
G.linkDropped = function(link) {
	WF.data.links[link.id] = undefined;
	WF.ref[link.id] = undefined;
	G.editor.invoke("drop_link", link.id);
};

// 为流程新元素生成ID
WF.newId = function() {
	if (WF.data.count === undefined) {
		WF.data.count = 0;
	}

	var i = parseInt(WF.data.count) + 1;
	WF.data.count = i;
	return i.toString();
};

G.viewNode = function(node) {
	G.openEditor(node, WF.data.nodes, function(title) {
		$(".title", node).text(title);
	});
};

G.viewBlock = function(e) {
	G.editor.invoke("viewBlock",{
	    id : e.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.id,
		type : "Block",
	});
};


G.element_data = null;
G.callback = null;

G.viewLink = function(link) {
	G.openEditor(link, WF.data.links, function(title) {
		G.setAnnotation(link, title);
	});
};

function getAllNodes() {
	var nodes = WF.data.nodes;
	var list = [];
	for (id in nodes) {
		var node = WF.ref[id];
		if (node === null) {
			continue;
		}
		var data = nodes[id];
		if (!data) {
			continue;
		}

		list.push({
			value : data.id,
			title : data.title
		});
	}
	return list;
}
G.getNodeData = function(node) {
	var id = node.id;
	return WF.data.nodes[id];
};

// 对复制节点进行后续处理
G.copyNode = function(node, data) {
	var id = WF.newId();
	data.id = id;
	node.id = id;
	WF.ref[id] = node;

	if (!WF.data.nodes) {
		WF.data.nodes = {};
	}

	WF.data.nodes[id] = data;

	data.coordinate = G.coordinate(node);
	G.editor.invoke("add_node", data);
	return true;
};

G.couldBeLinkSource = function(node) {
	var c = node.className;
	return c.indexOf("Lane") < 0 && !c.startsWith('End');
};

G.couldBeLinkTarget = function(node) {
	var c = node.className;
	return c.indexOf("Starter") < 0 && c.indexOf("Lane") < 0;
};

G.couldBeDeleted = function(node) {
	var c = node.className;
	return c.indexOf("Starter") < 0;
}

WF.adjustFormSize = function() {
	var d = $(window);
	var h = d.height();
	var w = d.width();
	var top = $("#toolbar").height();
	var cut = top > 50 ? top + 40 : 50;
	var height = (h - cut - 10);

	if (editable) {
		var style = _("panel").style;
		style.height = height + "px";
		style.top = cut + 'px';

		style = _("diagram").style;
		style.height = height + "px";
		style.width = (w - 157) + "px";
		style.top = cut + 'px';
	} else {
		var style = _("diagram").style;
		style.height = height + "px";
		style.width = (w - 7) + "px";
		style.top = cut + 'px';
	}
};

$(function() {
	if (!editable) {
		_("panel").style.display = "none";
		_("diagram").style.left = "2px";
	}

	G.editable = editable;
	WF.initPanel();
	G.init(_("diagram"));
	WF.data = info.define;
	WF.acts = info.acts ? info.acts : {};
	WF.trans = info.trans ? info.trans : {};
	WF.initDiagram();
});

function collectData() {
	var nodes = WF.data.nodes;
	for (id in nodes) {
		var node = WF.ref[id];
		if (!node) {
			continue;
		}

		nodes[id].coordinate = G.coordinate(node);
	}

	var links = WF.data.links;
	for (id in links) {
		var link = WF.ref[id];
		if (!link) {
			continue;
		}

		var annotation = link.annotation;

		var data = links[id];
		data.path = link.path;
		data.title = annotation ? $(annotation).text() : "";
	}
}

G.nodeResized = function(node) {
	G.editor.invoke("node_resize", {
		id : node.id,
		coordinate : G.coordinate(node)
	});
};

// 打开节点或连接的编辑界面
G.openEditor = function(el, map, callback) {
	if (!window.editable && window.DISABLE_REF_VIEW) {
		return;// 不打开节点查看界面
	}

	var data = map[el.id];
	G.editor.invoke("open_editor", {
		id : data.id,
		type : data.type
	});
};

function updateView(cmd) {
	var tar = WF.ref[cmd.id];
	var title = cmd.title;
	if (tar.isNode) {// 修改节点标题
		$(".title", tar).text(title);
	} else {// 修改连接标题
		G.setAnnotation(tar, title);
	}
}

 function escapeHTML(s) {
	if (s === undefined || s === null)
		return "";

	s = s.toString();

	if (s.indexOf("&") >= 0) {
		s = s.replace(/\&/g, "&amp;");
	}
	if (s.indexOf("<") >= 0) {
		s = s.replace(/\</g, "&lt;");
	}
	if (s.indexOf(">") >= 0) {
		s = s.replace(/\>/g, "&gt;");
	}
	return s;
}

