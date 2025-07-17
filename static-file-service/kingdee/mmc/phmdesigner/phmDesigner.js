function initialPHM(container,phmPagModel) {
	if (!mxClient.isBrowserSupported()) {
		mxUtils.error('该浏览器不支持mxGraph', 200, false);
	}
	else {
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
		graph.addListener(mxEvent.CLICK, function (sender, evt) {
			var cells = sender.getSelectionCells();
			if (cells != null&&cells.length==1 && sender.getModel().isVertex(cells[0])) {
				// 监听节点点击事件 传回ID到后台去进行 配置数据的切换
				var cellId = cells[0].getId();
				phmPagModel.invoke("selectCell", cellId);
			}else{
				phmPagModel.invoke("selectCell", "");
		    }
		});
		graph.getModel().addListener(mxEvent.CHANGE, function (sender, evt) {
			savePHMMxgraph(phmPagModel);
		});
		graph.container.setAttribute('tabindex', '0');
		// 保证点击画板使得焦点在画板上
		var graphFireMouseEvent = graph.fireMouseEvent;
		graph.fireMouseEvent = function (evtName, me, sender) {
		if (evtName == mxEvent.MOUSE_DOWN) {
			// this.container.focus();
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
	}
	
	mxEvent.disableContextMenu(container);
	return graph;
	
};

function addElement(model,paramsMap) {
	var phmMgGraph = model.graph;
	var phmMgGraphModel = phmMgGraph.getModel();
	if (!paramsMap || typeof (paramsMap) != "object") return;
	var mgKey = paramsMap["Key"];
	var mgAlias = paramsMap["Alias"];
	if (!mgKey || typeof (mgKey) != "string") return;
	if (!mgAlias || typeof (mgAlias) != "string") return;
	if (phmMgGraph == null || phmMgGraph.getDefaultParent() == null || phmMgGraphModel == null) return;
	phmMgGraphModel.beginUpdate();
	try {
		var newElement = phmMgGraph.insertVertex(phmMgGraph.getDefaultParent(), null, mgAlias, 50, 50, 80, 30);
	}
	finally {
		phmMgGraphModel.endUpdate();
	}
};
function initPHMData(model, paramsMap) {
	model.invoke("initxmlData", "mgXML");
};
function addPHMxml(model,paramsMap) {
	var phmMgGraph = model.graph;
	var mgKey = paramsMap["Key"];
	var xml = paramsMap["xml"];
	var doc = mxUtils.parseXml(xml);
	var codec = new mxCodec(doc);
	var elt = doc.documentElement.firstChild;
	var cells = [];
	while (elt != null) {
		cells.push(codec.decode(elt));
		elt = elt.nextSibling;
	}
	phmMgGraph.addCells(cells);
	phmMgGraph.selectCells(true,false,cells[0],null);
};
function deleteCells(model,paramsMap) {
	var phmMgGraph = model.graph;
	var selectionCells = phmMgGraph.getSelectionCells();
	if (!selectionCells) return;
	phmMgGraph.removeCells(selectionCells, true);
};
function cleanGraph(model,paramsMap) {
	var phmMgGraph = model.graph;
	phmMgGraph.removeCells(phmMgGraph.getChildVertices(phmMgGraph.getDefaultParent()));
};
function updateGraph(model,paramsMap) {
	var phmMgGraph = model.graph;
	phmMgGraph.removeCells(phmMgGraph.getChildVertices(phmMgGraph.getDefaultParent()));
	var mgKey = paramsMap["Key"];
	var xml = paramsMap["xml"];
	var doc = mxUtils.parseXml(xml);
	var codec = new mxCodec(doc);
	var elt = doc.documentElement.firstChild;
	var cells = [];
	while (elt != null) {
		cells.push(codec.decode(elt));
		elt = elt.nextSibling;
	}
	phmMgGraph.addCells(cells);
};
function savePHMMxgraph(model) {
	//任何改动都实时传递给设计器控件
	var phmMgGraph = model.graph;
	var encoder = new mxCodec();
	var node = encoder.encode(phmMgGraph.getModel());
	var xml = mxUtils.getPrettyXml(node);
	model.invoke("xmlData", xml);
};
// 生成唯一ID
function genID(length){
    return Number(Math.random().toString().substr(3,length) + Date.now()).toString(36);
};

 var updateModelname = function(model,paramsMap){
	if (!paramsMap || typeof (paramsMap) != "object") return;
	var phmMgGraph = model.graph;
	var id = paramsMap["id"];
	var name = paramsMap["name"];
	var selectionCell = phmMgGraph.getModel().getCell(id);
	if (!selectionCell) return;
	if (typeof (name) != "undefined") {
		selectionCell.value = name;
		phmMgGraph.refresh(selectionCell);
		savePHMMxgraph(model)
	}
};
var initPHMXmlData = function(model,paramsMap){
	var phmMgGraph = model.graph;
	var xml = paramsMap["xml"];
	if (isEmptyString(xml)) {
		console.log("参数XML为空");
		return;
	}
	phmMgGraph.getModel().beginUpdate();
	try {
		var rootxml = mxUtils.parseXml(xml);
		var root = rootxml.documentElement;
		var dec = new mxCodec(root.getDocumentElement);
		dec.decode(root, phmMgGraph.getModel());
		phmMgGraph.refresh();
	} finally {
		phmMgGraph.getModel().endUpdate();
	}
};
var phmF7Import = function(model,paramsMap){
	var id = paramsMap["id"];
	var nodelist = paramsMap["nodelist"];
	var relations = paramsMap["relations"];
	var rootId = paramsMap["rootId"];
	if (isEmptyString(id)) {
		console.log("参数id为空");
		return;
	}
	var phmMgGraph = model.graph;
	var selectionCell = phmMgGraph.getModel().getCell(id);
	if (!selectionCell) return;
	// 连线样式
	var myStyle = phmMgGraph.getStylesheet().getDefaultEdgeStyle();
	myStyle[mxConstants.STYLE_ROUNDED] = true;
	myStyle[mxConstants.STYLE_EDITABLE] = 0;
	myStyle[mxConstants.STYLE_STROKECOLOR] ='#979797';
	myStyle[mxConstants.STYLE_EDGE] = mxEdgeStyle.ElbowConnector;
	phmMgGraph.getStylesheet().putCellStyle("myStyle",myStyle);
	phmMgGraph.getModel().beginUpdate();
	try {
		var id_cell = {};
		var x = phmMgGraph.getModel().getGeometry(selectionCell).x;
		var y = phmMgGraph.getModel().getGeometry(selectionCell).y;
		var offSetX = 0;
		var offSetY = 0;
		for (let index = 0; index < nodelist.length; index++) {	
			const element = nodelist[index];
			var nodeId = element["id"];
			var nodeX = element["x"];
			var nodeY = element["y"];
			if(nodeId==rootId){
				offSetX = x-parseInt(nodeX);
				offSetY = y-parseInt(nodeY);
				continue;
			}
			var newX = offSetX+parseInt(nodeX);
			var newY = offSetY+parseInt(nodeY);
			var name = element["name"];
			var v = phmMgGraph.insertVertex(phmMgGraph.getDefaultParent(), nodeId, name, newX, newY, 100, 40, 'editable=0;resizable=0;fillColor=#FFFFFF;strokeColor=#979797;arcSize=50;rounded=1;');
			id_cell[nodeId] = v;
		}
		for (let index = 0; index < relations.length; index++) {
			const element = relations[index];
			var source = element["source"];
			var target = element["target"];
			var v1;
			var v2 = id_cell[target];
			if(rootId == source){
				v1 = selectionCell;
			}else{
				v1 = id_cell[source];
			}
			var e1 = phmMgGraph.insertEdge(phmMgGraph.getDefaultParent(), genID(10), '', v1, v2, "myStyle");
		}
	} finally {
		phmMgGraph.getModel().endUpdate();
	}
	// 删除下游节点
	var deleteCells = paramsMap["deleteCells"];
	if(!isEmpty(deleteCells)){
		var cells = new Array();
		for (let index = 0; index < deleteCells.length; index++) {
			var cellId = deleteCells[index];
			var selectionCell = phmMgGraph.getModel().getCell(cellId);
			cells[index] = selectionCell;
		}
		phmMgGraph.removeCells(cells, true);
	}
	phmMgGraph.refresh();
};
var deletePHMCell = function (model,paramsMap){
	var deleteCells = paramsMap["deleteCells"];
	if(isEmpty(deleteCells)){
		return;
	}
	var phmMgGraph = model.graph;
	var cells = new Array();
	for (let index = 0; index < deleteCells.length; index++) {
		var cellId = deleteCells[index];
		var selectionCell = phmMgGraph.getModel().getCell(cellId);
		cells[index] = selectionCell;
	}
	phmMgGraph.removeCells(cells, true);
};
var addPHMNode = function(model,paramsMap){
	var phmMgGraph = model.graph;
	var name = paramsMap["name"];
	var nodeId = paramsMap["nodeId"];
	var x = 430;
	var y = 10;
	var selectionCells = phmMgGraph.getSelectionCells();
	if (!isEmpty(selectionCells)&&selectionCells.length>0) {
		var selectionCell = selectionCells[0];
		x = phmMgGraph.getModel().getGeometry(selectionCell).x+200;
		y = phmMgGraph.getModel().getGeometry(selectionCell).y;
	};
	phmMgGraph.getModel().beginUpdate();
	var v;
	try{
		v = phmMgGraph.insertVertex(phmMgGraph.getDefaultParent(), nodeId, name, x, y, 100, 40, 'editable=0;resizable=0;fillColor=#FFFFFF;strokeColor=#979797;arcSize=50;rounded=1;');		
	}finally{
		phmMgGraph.getModel().endUpdate();
	}
	phmMgGraph.refresh();
	phmMgGraph.selectCells(true,false,v,null);
	model.invoke("afterAddPHMNode",nodeId);
}
function isEmpty(obj) {
	if (obj == null || obj == undefined) return true;
	return false;
};
function isEmptyString(obj) {
	if (isEmpty(obj) || typeof (obj) != "string") return true;
	if (obj.trim().length == 0) return true;
	return false;
};