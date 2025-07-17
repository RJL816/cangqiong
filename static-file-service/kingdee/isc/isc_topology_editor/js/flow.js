var WF = {};

// 记录各类节点连接的默认标题
WF.meta = {};

// 流程定义数据
WF.data = {};

// 对流程图对象的引用
WF.ref = {};

WF.changed = false;

WF.initDiagram = function() {
	var nodes = WF.data.nodes;
	var focusNode = WF.data.$tag;
	var maxX = -1 ;
	var maxY = -1 ;
	for (id in nodes) {
		var data = nodes[id];
		if (!data)
			continue;
		var tips = WF.acts[id];
		var html = G.newNodeHtml(data.type, data, tips);
		var c = data.coordinate;
		var node = G.addNode(html, c.x, c.y, data.type, c.width, c.height, tips);
		node.id = data.id;
		node.type = data.type;
		WF.ref[id] = node;

		if (id == focusNode) {// 节点高亮显示移至可视区域
			$(node).addClass("highlight-node");// 节点高亮显示
			//node.scrollIntoView();
		}
		maxX = Math.max(maxX,c.x);
		maxY = Math.max(maxY,c.y);
	}
	maxX = maxX + 300;
	maxY = maxY + 300;
	var links = WF.data.links;
	var svgNS = 'http://www.w3.org/2000/svg';
	var svgEl = document.createElementNS(svgNS, 'svg');
	svgEl.setAttribute('xmlns', svgNS);
	svgEl.setAttribute('width', maxX+'px');
	svgEl.setAttribute('height', maxY+'px');
	svgEl.setAttribute('style', 'stroke-width:2');
	G.container.append(svgEl);
	
	G.createDefs('rgb(126,147,188)','arrow_enable',svgNS,svgEl);
	G.createDefs('rgb(216,216,216)','arrow_disable',svgNS,svgEl);
	
	for (id in links) {
		var data = links[id];
		if (!data)
			continue;

		var from = document.getElementById(data.source);
		var to = document.getElementById(data.target);
		var type = data.type;
		var tips = WF.trans[data.id];
		if (tips) {
			type += "-enable";
		} else {
			type += "-disable";
		}
		var lines = [];
		lines.from = from;// 勾住起点
		lines.to = to;// 勾住终点
		lines.path = data.path ? data.path : G.calcPath(from, to);// 路径
		lines.type = type;// 类型
	
		var path = lines.path;
		var c1 = G.coordinate(from);
		var c2 = G.coordinate(to);
		var pos = path.split("|");
		var p1 = G.port(c1, pos[0]);
		var p2 = G.port(c2, pos[1]);

		if (Math.abs(p1.x - p2.x) <= 3) {
			p1.x = (p2.x = (p1.x + p2.x) / 2);
		}
		if (Math.abs(p1.y - p2.y) <= 3) {
			p1.y = (p2.y = (p1.y + p2.y) / 2);
		}
		
		lines.style = G.linkStyle(type);
		var color = lines.style.color
		G.createLine(svgNS,svgEl,data,p1,p2,color,tips);
		G.createLineTitle(data,p1,p2,svgNS,svgEl,color);
		
	}
};

G.createLineTitle = function(data,p1,p2,svgNS,svgEl,color){
	var title = data.title;
	if (title){
		var xx = p1.x ;
		var yy = p1.y ;
		var tSvg = document.createElementNS(svgNS, 'text');
		tSvg.setAttribute('x',xx );
		tSvg.setAttribute('y', yy);
		tSvg.setAttribute('fill', color);
		var styles = G.getLineStyle(p1,p2);
		tSvg.setAttribute('style', styles);
		tSvg.append(title);
		svgEl.append(tSvg);
	}
}
G.getLineStyle = function(p1,p2){
	var tan = (p2.y-p1.y)/(p2.x-p1.x);
	var deg = Math.atan(tan) / (Math.PI / 180);
    deg = Math.round(deg);
	return "transform-origin: "+p1.x+"px "+ p1.y+"px;transform: translate(10px, -8px)  rotate(" + deg + "deg); font-size:14;";
}
G.createLine = function(svgNS,svgEl,data,p1,p2,color,tips){
	//<path d="M30 90 Q115 139 200 90"></path>
	//const pos = getPosition ({x: 30, y: 90}, {x: 200, y: 90}, 30);
	//[{"x":115,"y":139},{"x":115,"y":41}]	
	var oSvg;
	var y1 = p1.y ;
	var y2 = p2.y ;
	if(y1>y2 && parseInt(data.source)>parseInt(data.target) || y1<y2 && parseInt(data.source)<parseInt(data.target)){
		oSvg = document.createElementNS(svgNS, 'path');
		oSvg.setAttribute('id', data.id);
		var m = G.getPosition(p1,p2,20)[1] ;
		var mx = m.x ;
		var my = m.y ;
		var path = 'M'+p1.x + ' ' + p1.y + ' ' + 'Q' + mx + ' ' + my + ' ' + p2.x + ' ' + p2.y;
		oSvg.setAttribute('d', path);
		oSvg.setAttribute('style', "stroke-width:1;stroke:"+color+";");
		oSvg.setAttribute('fill', 'none');
	}else if(y1<y2 && parseInt(data.source)>parseInt(data.target) || y1>y2 && parseInt(data.source)<parseInt(data.target)){
		oSvg = document.createElementNS(svgNS, 'path');
		oSvg.setAttribute('id', data.id);
		var m = G.getPosition(p1,p2,20)[0] ;
		var mx = m.x ;
		var my = m.y ;
		var path = 'M'+p1.x + ' ' + p1.y + ' ' + 'Q' + mx + ' ' + my + ' ' + p2.x + ' ' + p2.y;
		oSvg.setAttribute('d', path);
		oSvg.setAttribute('style', "stroke-width:1;stroke:"+color+";");
		oSvg.setAttribute('fill', 'none');
	}else{
		oSvg = document.createElementNS(svgNS, 'line');
		oSvg.setAttribute('id', data.id);
		oSvg.setAttribute('x1', p1.x);
		oSvg.setAttribute('y1', p1.y);
		oSvg.setAttribute('x2', p2.x);
		oSvg.setAttribute('y2', p2.y);
		oSvg.setAttribute('style', "stroke-width:1;stroke:"+color+";");
	}
	
	if(tips){
		oSvg.setAttribute('marker-end', "url(#arrow_enable)");
	}else{
		oSvg.setAttribute('marker-end', "url(#arrow_disable)");
	}
	svgEl.append(oSvg);
}

G.getPosition =function(dot1, dot2, angle) {
  var x1 = dot1.x;
  var y1 = dot1.y;
  var x2 = dot2.x;
  var y2 = dot2.y;
  var PI = Math.PI;

  // 两点间的x轴夹角弧度
  var xAngle=Math.atan2((y2-y1), (x2-x1));
  // 转为角度
  xAngle = 360*xAngle/(2*PI);
  // 两点间的长度
  var L=Math.sqrt((y2-y1)*(y2-y1)+(x2-x1)*(x2-x1));
  // 计算等腰三角形斜边长度
  var L2 = L/2 / Math.cos(angle* 2*PI/360);

  // 求第一个顶点坐标，位于下边
  var val1={};
  // 求第二个顶点坐标，位于上边
  var val2={};
  val1['x']=x1+Math.round(L2 * Math.cos((xAngle+angle)* 2*PI/360));
  val1['y']=y1+Math.round(L2 * Math.sin((xAngle+angle)* 2*PI/360));
  val2['x']=x1+Math.round(L2 * Math.cos((xAngle-angle)* 2*PI/360));
  val2['y']=y1+Math.round(L2 * Math.sin((xAngle-angle)* 2*PI/360));

  return [val1,val2];
}


G.createDefs = function(color,id,svgNS,svgEl){
	var defs = document.createElementNS(svgNS, 'defs');
	svgEl.append(defs);
	var marker = document.createElementNS(svgNS, 'marker');
	marker.setAttribute('id', id);
	marker.setAttribute('makerUnites',"strokeWidth");
	marker.setAttribute('markerWidth',"16");
	marker.setAttribute('markerHeight', "16");
	marker.setAttribute('viewBox', "0 0 12 12");
	marker.setAttribute('refX', "9");
	marker.setAttribute('refY', "6");
	marker.setAttribute('orient', "auto");
	defs.append(marker);
	var arrowPath = document.createElementNS(svgNS, 'path');
	arrowPath.setAttribute("d","M2,2 L10,6 L2,10 L2,2");
	arrowPath.setAttribute("style","fill: "+color);
	marker.append(arrowPath);
}


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

		html += "<tr title='" + (cfg.help_text ? cfg.help_text : cfg.title)
				+ "'" + " class='node new_" + cfg.category + "'" //
				+ " id='" + cfg.type + "'><td>" + //
				"<img src='img/" + icon + "'"//
				+ " height='24' width='24'></td>"
				+ "<td style='padding-left:0.5em;text-align:left'>" + cfg.title//
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
	case "NormalTransition-enable":
		style.arrow = true;
		style.color = "rgb(126,147,188)";
		style.size = "2";
		break;
	case "NormalTransition-disable":
		style.arrow = true;
		style.color = "rgb(216,216,216)";
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
	data.title = WF.meta[type].title;
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
		var html = "<table><tr><td class='flag'><img src='img/" + icon
				+ "' width='22' height='22'></td>";
		  var title = data ? data.title : WF.meta[type].title;
		  html += "<td><div class='title'>" + escapeHTML(title) + "</div></td></tr></table>";
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
		title += "\r\n总次数: " + tips.count + "，最近一次";
	}
	if (tips.elapsed) {
		var elpased = parseInt(tips.elapsed);
		if (elpased < 100) {
			title += "\r\n耗时: " + tips.elapsed + " 毫秒";
			if (tips.count > 1 && tips.total_elapsed) {
				title += ", 累计耗时: " + tips.total_elapsed + " 毫秒";
			}
		} else {
			var s = "" + tips.elapsed / 1000;
			var i = s.indexOf(".");
			if (i > 0) {
				if (elpased > 1000) {// 1位小数
					title += "\r\n耗时: " + s.substring(0, i + 2) + " 秒";
				} else {
					var len = Math.min(s.length, i + 3);
					title += "\r\n耗时: " + s.substring(0, len) + " 秒";
				}
			} else {// 整数
				title += "\r\n耗时: " + s + " 秒";
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

G.viewSource = function(e,event) {
	G.editor.invoke("viewSource",{
	    id : e.parentNode.parentNode.id,
		type : "Source",
	});
	 G.cancelBubble(event);
};

G.cancelBubble = function(event) {
    var evt = event ? event : window.event;
    if(evt.stopPropagation) { //W3C 
        evt.stopPropagation();
    } else { //IE      
        evt.cancelBubble = true;
	}
}


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
	if (tar.isNode) {// 修改节点标题
		$(".title", tar).text(cmd.title);
	} else {// 修改连接标题
		G.setAnnotation(tar, cmd.title);
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
