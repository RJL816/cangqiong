

/**
 * @drscription 流程定义设计器对象
 * @param designerID 设计器ID
 * @param basePath 基础路径
 */
function ProcDefDesigner(designerID, basePath) {
	if (designerID == null || designerID == undefined) {
		console.error("参数设计器ID为空");
		return;
	}

	if (typeof (designerID) != "string") {
		console.error("参数设计器ID不是字符");
		return;
	}

	if (designerID.trim().length == 0) {
		console.error("参数设计器ID为空");
		return;
	}

	//设计器ID
	this.designerID = designerID;

	//基础路径
	this.basePath = ".";

	if (designerID != null && designerID != undefined) {
		if (typeof (designerID) == "string") {
			if (designerID.trim().length > 0) {
				this.basePath = basePath;
			}
		}
	}
}

ProcDefDesigner.prototype = {
	/**
	 * 工具箱元件数组
	 */
	toolBoxCells: new Array(),
	/**
	 * 连接线样式元件数组
	 */
	connectorStyleCells: new Array(),
	/**
	 * 设计器
	 */
	designer: undefined,
	/**
	 * 画板
	 */
	graph: undefined,
	/**
	 * 画板父项
	 */
	graphParent: undefined,
	/**
	 * 画板模型
	 */
	graphModel: undefined,
	/**
	 * 画板选择模型
	 */
	graphSelectionModel: undefined,
	/**
	 * 画板视图
	 */
	graphView: undefined,
	/**
	 * 画板样式类
	 */
	graphStylesheet: undefined,
	/**
	 * 画板撤销管理器
	 */
	undoManager: undefined,
	/**
	 * 画板拖选框
	 */
	rubberband: undefined,
	/**
	 * 画板按键控制器
	 */
	keyHandler: undefined,
	/**
	 * 画布DIV
	 */
	divCanvas: undefined,
	/**
	 * 工具箱元件_指针
	 */
	divToolBoxCellPointer: undefined,
	/**
	 * 工具箱选中的元件
	 */
	divToolBoxSelectedCell: undefined,
	/**
	 * 设计器主面板DIV
	 */
	divMain: undefined,
	/**
	 * 设计器顶端面板DIV
	 */
	divTopPanel: undefined,
	/**
	 * 设计器调试浮动按钮组DIV
	 */
	divDebug: undefined,
	/**
	 * 设计器主体DIV
	 */
	divBody: undefined,
	/**
	 * 设计器内容DIV
	 */
	divContent: undefined,
	/**
	 * 设计器商标DIV
	 */
	divLogo: undefined,
	/**
	 * 设计器标题DIV
	 */
	divTitle: undefined,
	/**
	 * 设计器提示栏DIV
	 */
	divNofitication: undefined,
	/**
	 * 设计器用户DIV
	 */
	divUser: undefined,
	/**
	 * 画板DIV
	 */
	divGraph: undefined,
	/**
	 * 工具箱DIV
	 */
	divToolBox: undefined,
	/**
	 * 搜索DIV
	 */
	divSearch: undefined,
	/**
	 * 缩放按钮组DIV
	 */
	divZoom: undefined,
	/**
	 * 放大按钮DIV
	 */
	divZoomIn: undefined,
	/**
	 * 缩小按钮DIV
	 */
	divZoomOut: undefined,
	/**
	 * 缩放比例按钮DIV
	 */
	divZoomSize: undefined,
	/**
	 * 透明度按钮组DIV
	 */
	divOpacity: undefined,
	/**
	 * 透明度增加按钮DIV
	 */
	divOpacityDecrease: undefined,
	/**
	 * 透明度减少按钮DIV
	 */
	divOpacityIncrease: undefined,
	/**
	 * 透明度值按钮DIV
	 */
	divOpacityValue: undefined,
	/**
	 * 帮助按钮DIV
	 */
	divHelp: undefined,
	/**
	 * 工具栏DIV
	 */
	divToolbar: undefined,
	/**
	 * 连接线样式DIV
	 */
	divConnectorStyle: undefined,
	/**
	 * 连接线样式_自动DIV
	 */
	divConnectorStyleAuto: undefined,
	/**
	 * 连接线样式_关联DIV
	 */
	divConnectorStyleRelation: undefined,
	/**
	 * 连接线样式_侧边对侧边DIV
	 */
	divConnectorStyleSideToSide: undefined,
	/**
	 * 连接线样式_上下联接DIV
	 */
	divConnectorStyleTopToBottom: undefined,
	/**
	 * 连接线样式_环DIV
	 */
	divConnectorStyleLoop: undefined,
	/**
	 * 连接线样式_正交DIV
	 */
	divConnectorStyleOrthogonal: undefined,
	/**
	 * 连接线样式_分割DIV
	 */
	divConnectorStyleSegment: undefined,
	/**
	 * 复制按钮DIV
	 */
	divCopy: undefined,
	/**
	 * 剪贴按钮DIV
	 */
	divCut: undefined,
	/**
	 * 粘贴按钮DIV
	 */
	divPaste: undefined,
	/**
	 * 删除按钮DIV
	 */
	divDelete: undefined,
	/**
	 * 撤销按钮DIV
	 */
	divUndo: undefined,
	/**
	 * 重制按钮DIV
	 */
	divRedo: undefined,
	/**
	 * 向上移动按钮DIV
	 */
	divMoveUp: undefined,
	/**
	 * 向下移动按钮DIV
	 */
	divMoveDown: undefined,
	/**
	 * 向左移动按钮DIV
	 */
	divMoveLeft: undefined,
	/**
	 * 向右移动按钮DIV
	 */
	divMoveRight: undefined,
	/**
	 * 剪贴板插入总数
	 */
	clipboardInsertCount: 1,
	/**
	 *剪贴板元件集合
	 */
	clipboardCells: null,
	/**
	 * MX错误提示框宽度
	 */
	CONST_MXERROR_WIDTH: 200,
	/**
	* CSS样式_按钮
	*/
	CONST_CSSSTYLE_BUTTON: "pddButton",
	/**
	* CSS样式_按钮禁用
	*/
	CONST_CSSSTYLE_BUTTONDISABLED: "pddButtonDisabled",
	/**
	* CSS样式_空白
	*/
	CONST_CSSSTYLE_BLANK: "pddBlank",

	/**
	 * CSS_圆角边框半径
	 */
	CONST_CSS_ROUNDEDCORNERBORDERRADIUS: 2,
	/**
	 * CSS_圆形边框半径
	 */
	CONST_CSS_CIRCULARBORDERRADIUS: "50%",
	/**
	 * CSS_阴影颜色
	 */
	CONST_CSS_SHADOWCOLOR: "#cccccc",
	/**
	 * CSS_主面板背景色
	 */
	CONST_CSS_MAINBACKGROUNDCOLOR: "#ffffff",
	/**
	 * 尺寸单位
	 */
	CONST_SIZEUNIT: "px",
	/**
	 * 分隔符
	 */
	CONST_SPLITSYMBOL: "-",
	/**
	 * 悬停时限（毫秒）
	 */
	CONST_HOVERTIMEOUT: 250,

	/**
	 * 设计器内容间隔_大小
	 */
	CONST_BODYSPACING_SIZE: 30,
	/**
	 * 画板透明度步长
	 */
	CONST_GRAPH_OPACITYSTEP: 10,
	/**
	 * 画板启用动画效果
	 */
	CONST_GRAPH_ANIMATION: false,
	/**
	 * 画板缩放步长
	 */
	CONST_GRAPH_ZOOMSTEP: 0.2,
	/**
	 * 画板缩放余量尺寸
	 */
	CONST_GRAPH_MARGIN: 10,
	/**
	 * 画板元件控制器尺寸
	 */
	CONST_GRAPH_HANDLESIZE: 8,
	/**
	 * 画板元件控制器图标
	 */
	CONST_GRAPH_HANDLEIMAGE: "",
	/**
	 * 画板元件控制器图标宽度
	 */
	CONST_GRAPH_HANDLEIMAGEWIDTH: 18,
	/**
	 * 画板元件控制器图标高度
	 */
	CONST_GRAPH_HANDLEIMAGEHEIGHT: 18,
	/**
	 * 画板元件调整大小控制器图标
	 */
	CONST_GRAPH_SIZERIMAGE: "",
	/**
	 * 画板元件调整大小控制器图标宽度
	 */
	CONST_GRAPH_SIZERIMAGEWIDTH: 18,
	/**
	 * 画板元件调整大小控制器图标高度
	 */
	CONST_GRAPH_SIZERIMAGEHEIGHT: 18,
	/**
	 * 浮动按钮组_滚动按钮大小
	 */
	CONST_FLATBUTTONGROUP_SCROLLBUTTONSIZE: 20,
	/**
	 * 浮动按钮组_阴影大小
	 */
	CONST_FLATBUTTONGROUP_SHADOWSIZE: 4,
	/**
	 * 浮动按钮组_横向
	 */
	CONST_FLATBUTTONGROUP_HORIZONDIRECTION: "horizon",
	/**
	 * 浮动按钮组_纵向
	 */
	CONST_FLATBUTTONGROUP_VERTICALDIRECTION: "vertical",
	/**
	 * 属性_浮动按钮_大小
	 */
	CONST_FLATBUTTON_SIZE: 40,
	/**
	 * 属性_设计器ID
	 */
	CONST_ATTRIBUTE_DESIGNERID: "designer-id",
	/**
	 * 属性_连接线样式
	 */
	CONST_ATTRIBUTE_CONNECTORSTYLE: "connector-style",
	/**
	 * 属性_按键码
	 */
	CONST_ATTRIBUTE_KEYCODE: "key-code",
	/**
	 * 属性_浮动按钮ID
	 */
	CONST_ATTRIBUTE_FLATBUTTONID: "flatbutton-id",
	/**
	 * 属性_浮动按钮节点ID
	 */
	CONST_ATTRIBUTE_FLATBUTTONNODEID: "flatbutton-node-id",
	/**
	 * 属性_浮动按钮类型
	 */
	CONST_ATTRIBUTE_FLATBUTTONTYPE: "flatbutton-type",
	/**
	 * 属性_浮动按钮图片
	 */
	CONST_ATTRIBUTE_FLATBUTTONIMAGE: "flatbutton-image",
	/**
	 * 属性_浮动按钮文本
	 */
	CONST_ATTRIBUTE_FLATBUTTONTEXT: "flatbutton-text",
	/**
	 * 属性_浮动按钮样式类
	 */
	CONST_ATTRIBUTE_FLATBUTTONSTYLECLASS: "flatbutton-style-class",
	/**
	 * 属性_浮动按钮提示
	 */
	CONST_ATTRIBUTE_FLATBUTTONTIPS: "flatbutton-tips",
	/**
	 * 属性_浮动按钮画布填充颜色
	 */
	CONST_ATTRIBUTE_FLATBUTTONCANVASFILLCOLOR: "flatbutton-canvas-fill-color",
	/**
	 * 属性_浮动按钮画布字体颜色
	 */
	CONST_ATTRIBUTE_FLATBUTTONCANVASFONTCOLOR: "flatbutton-canvas-font-color",
	/**
	 * 属性_浮动按钮画布大小
	 */
	CONST_ATTRIBUTE_FLATBUTTONCANVASSIZE: "flatbutton-canvas-size",
	/**
	 * 属性_浮动按钮点击函数
	 */
	CONST_ATTRIBUTE_FLATBUTTONONCLICKFUNC: "flatbutton-on-click-func",
	/**
	 * 属性_浮动按钮属性配置表单
	 */
	CONST_ATTRIBUTE_FLATBUTTONPROPFORM: "flatbutton-prop-form",
	/**
	 * 属性_浮动按钮所属的浮动按钮组ID
	 */
	CONST_ATTRIBUTE_FLATBUTTONGROUPID: "flatbuttongroup-id",
	/**
	 * 属性_浮动按钮高度
	 */
	CONST_ATTRIBUTE_FLATBUTTONHEIGHT: "flatbutton-height",
	/**
	 * 属性_浮动按钮宽度
	 */
	CONST_ATTRIBUTE_FLATBUTTONWIDTH: "flatbutton-width",
	/**
	 * 属性_浮动按钮组方向
	 */
	CONST_ATTRIBUTE_FLATBUTTONGROUPDIRECTION: "flatbuttongroup-direction",
	/**
	 * 属性_浮动按钮组最大显示子项数
	 */
	CONST_ATTRIBUTE_FLATBUTTONGROUPMAXDISPLAYCHILDREN: "flatbuttongroup-max-display-children",
	/**
	 * 属性_浮动按钮组滚动首项位置
	 */
	CONST_ATTRIBUTE_FLATBUTTONGROUPSCROLLFROMINDEX: "flatbuttongroup-scroll-from-index",
	/**
	 * 属性_浮动按钮组滚动末项位置
	 */
	CONST_ATTRIBUTE_FLATBUTTONGROUPSCROLLTOINDEX: "flatbuttongroup-scroll-to-index",
	/**
	 * 属性_浮动按钮组开始显示项位置
	 */
	CONST_ATTRIBUTE_FLATBUTTONGROUPSTARTDISPLAYINDEX: "flatbuttongroup-start-display-index",
	/**
	 * 属性_浮动按钮组结束显示项位置
	 */
	CONST_ATTRIBUTE_FLATBUTTONGROUPENDDISPLAYINDEX: "flatbuttongroup-end-display-index",
	/**
	 * 属性_浮动按钮组显示滚动按钮
	 */
	CONST_ATTRIBUTE_FLATBUTTONGROUPSCROLLBUTTON: "flatbuttongroup-scroll-button",
	/**
	 * 属性_画板元件设计器ID
	 */
	CONST_ATTRIBUTE_GRAPHCELLMGID: "graph-cell-mg-id",
	/**
	 * 属性_画板元件ID
	 */
	CONST_ATTRIBUTE_GRAPHCELLID: "graph-cell-id",
	/**
	 * 属性_画板元件名称
	 */
	CONST_ATTRIBUTE_GRAPHCELLNAME: "graph-cell-name",
	/**
	 * 属性_画板元件类型
	 */
	CONST_ATTRIBUTE_GRAPHCELLTYPE: "graph-cell-type",
	/**
	 * 属性_画板元件连接线样式
	 */
	CONST_ATTRIBUTE_GRAPHCELLCONNECTORSTYLE: "graph-cell-connector-style",
	/**
	 * 属性_画板元件透明度
	 */
	CONST_ATTRIBUTE_GRAPHCELLOPACITY: "graph-cell-opacity",
	/**
	 * 属性_画板元件节点类型
	 */
	CONST_ATTRIBUTE_GRAPHCELLNODETYPE: "graph-cell-node-type",
	/**
	 * 属性_画板元件节点ID
	 */
	CONST_ATTRIBUTE_GRAPHCELLNODEID: "graph-cell-node-id",
	/**
	 * 属性_画板元件属性配置表单
	 */
	CONST_ATTRIBUTE_GRAPHCELLPROPFORM: "graph-cell-prop-form",
	/**
	 * 属性_画板元件属性填充颜色
	 */
	CONST_ATTRIBUTE_GRAPHCELLCANVASFILLCOLOR: "graph-cell-canvas-fill-color",
	/**
	 * 属性_画板元件属性字体颜色
	 */
	CONST_ATTRIBUTE_GRAPHCELLCANVASFONTCOLOR: "graph-cell-canvas-font-color",
	/**
	 * 属性_画板元件属性图片
	 */
	CONST_ATTRIBUTE_GRAPHCELLIMAGE: "graph-cell-image",
	/**
	 * 前缀_工具箱元件
	 */
	CONST_PREFIX_TOOLBOXCELL: "toolbox-cell_",
	/**
	 * 前缀_画布
	 */
	CONST_PREFIX_CANVAS: "canvas_",
	/**
	 * 前缀_画板元件样式
	 */
	CONST_PREFIX_VERTEX_STYLE: "vertex-style_",
	/**
	 * 后缀_向上滚动
	 */
	CONST_SUFFIX_SCROLLUP: "_scroll-up",
	/**
	 * 后缀_向下滚动
	 */
	CONST_SUFFIX_SCROLLDOWN: "_scroll-down",
	/**
	 * 后缀_阴影
	 */
	CONST_SUFFIX_SHADOW: "_shadow",
	/**
	 * 后缀_行号
	 */
	CONST_SUFFIX_ROW: "_row",
	/**
	 * 样式_画板图形线条宽度
	 */
	CONST_STYLE_VERTEX_STROKEWIDTH: 4,
	/**
	 * 样式_画板图形显示阴影
	 */
	CONST_STYLE_VERTEX_SHADOW: false,
	/**
	 * 样式_画板图形填充颜色
	 */
	CONST_STYLE_VERTEX_FILLCOLOR: "#000000",
	/**
	 * 样式_画板图形泳道填充颜色
	 */
	CONST_STYLE_VERTEX_SWIMLANEFILLCOLOR: "#ededed",
	/**
	 * 样式_画板图形线条颜色
	 */
	CONST_STYLE_VERTEX_STROKECOLOR: "#000000",
	/**
	 * 样式_画板图形标尺颜色
	 */
	CONST_STYLE_VERTEX_GRADIENTCOLOR: "#eeeeee",
	/**
	 * 样式_画板图形泳道标题大小
	 */
	CONST_STYLE_VERTEX_SWIMLANESTARTSIZE: "30",
	/**
	 * 样式_画板图形字体颜色
	 */
	CONST_STYLE_VERTEX_FONTCOLOR: "#ffffff",
	/**
	 * 样式_画板图形字体大小
	 */
	CONST_STYLE_VERTEX_FONTSIZE: 16,
	/**
	 * 样式_画板图形字体样式
	 */
	CONST_STYLE_VERTEX_FONTSTYLE: mxConstants.FONT_BOLD,
	/**
	 * 样式_画板连接线线条宽度
	 */
	CONST_STYLE_EDGE_STROKEWIDTH: 4,
	/**
	 * 样式_画板连接线线条颜色
	 */
	CONST_STYLE_EDGE_STROKECOLOR: "#000000",
	/**
	 * 样式_画板连接线显示阴影
	 */
	CONST_STYLE_EDGE_SHADOW: false,
	/**
	 * 样式_画板连接线字体颜色
	 */
	CONST_STYLE_EDGE_FONTCOLOR: "#ffffff",
	/**
	 * 样式_画板连接线字体大小
	 */
	CONST_STYLE_EDGE_FONTSIZE: 16,
	/**
	 * 样式_画板连接线字体样式
	 */
	CONST_STYLE_EDGE_FONTSTYLE: mxConstants.FONT_BOLD,
	/**
	 * 样式_画板连接线圆角
	 */
	CONST_STYLE_EDGE_ROUNDED: true,
	/**
	 * 工具箱最大显示子项数
	 */
	CONST_TOOLBOXMAXDISPLAYCHILDREN: 5,
	/**
	 * 画板图形_宽度
	 */
	CONST_VERTEX_WIDTH: 60,
	/**
	 * 画板图形_高度
	 */
	CONST_VERTEX_HEIGHT: 35,
	/**
	 * 画板图形_圆角矩形宽度
	 */
	CONST_VERTEX_ROUNDRECT_WIDTH: 100,
	/**
	 * 画板图形_圆角矩形高度
	 */
	CONST_VERTEX_ROUNDRECT_HEIGHT: 40,
	/**
	 * 画板图形_圆形宽度
	 */
	CONST_VERTEX_CIRCULAR_WIDTH: 70,
	/**
	 * 画板图形_圆形高度
	 */
	CONST_VERTEX_CIRCULAR_HEIGHT: 70,
	/**
	 * 画板图形_矩形宽度
	 */
	CONST_VERTEX_RECT_WIDTH: 100,
	/**
	 * 画板图形_矩形高度
	 */
	CONST_VERTEX_RECT_HEIGHT: 40,
	/**
	 * 画板图形_菱形宽度
	 */
	CONST_VERTEX_RHOMBUS_WIDTH: 70,
	/**
	 * 画板图形_菱形高度
	 */
	CONST_VERTEX_RHOMBUS_HEIGHT: 70,
	/**
	 * 画板图形_三角形宽度
	 */
	CONST_VERTEX_TRIANGLE_WIDTH: 70,
	/**
	 * 画板图形_三角形高度
	 */
	CONST_VERTEX_TRIANGLE_HEIGHT: 70,
	/**
	 * 画板图形_圆柱形宽度
	 */
	CONST_VERTEX_CYLINDER_WIDTH: 60,
	/**
	 * 画板图形_圆柱形高度
	 */
	CONST_VERTEX_CYLINDER_HEIGHT: 80,
	/**
	 * 画板图形_用户宽度
	 */
	CONST_VERTEX_ACTOR_WIDTH: 60,
	/**
	 * 画板图形_用户高度
	 */
	CONST_VERTEX_ACTOR_HEIGHT: 80,
	/**
	 * 画板图形_泳道宽度
	 */
	CONST_VERTEX_SWIMLANE_WIDTH: 150,
	/**
	 * 画板图形_泳道高度
	 */
	CONST_VERTEX_SWIMLANE_HEIGHT: 100,
	/**
	 * 画板图形_自定义宽度
	 */
	CONST_VERTEX_CUSTOM_WIDTH: 70,
	/**
	 * 画板图形_自定义高度
	 */
	CONST_VERTEX_CUSTOM_HEIGHT: 70,
	/**
	 * 画板连接线样式_自动
	 */
	CONST_EDGE_STYLE_AUTO: "autoEdgeStyle",
	/**
	 * 元素_属性集合
	 */
	CONST_ELEMENT_PROPERTIES: "properties",
	/**
	 * 元素_属性
	 */
	CONST_ELEMENT_PROPERTY: "property",
	/**
	 * 画布撤销历史记录大小
	 */
	CONST_UNDOHISTORYSIZE: 5,
	/**
	 * 画布尺寸_8像素
	 */
	CONST_CANVASSIZE_8: 8,
	/**
	 * 画布尺寸_16像素
	 */
	CONST_CANVASSIZE_16: 16,
	/**
	 * 画布尺寸_24像素
	 */
	CONST_CANVASSIZE_24: 24,
	/**
	 * 画布尺寸_24像素
	 */
	CONST_CANVASSIZE_48: 48,
	/**
	 * 画布内容_向上滚动
	 */
	CONST_CANVASTYPE_SCROLLUP: "scroll-up",
	/**
	 * 画布内容_向下滚动
	 */
	CONST_CANVASTYPE_SCROLLDOWN: "scroll-down",
	/**
	 * 画布内容_向左滚动
	 */
	CONST_CANVASTYPE_SCROLLLEFT: "scroll-left",
	/**
	 * 画布内容_向右滚动
	 */
	CONST_CANVASTYPE_SCROLLRIGHT: "scroll-right",
	/**
	 * 画布内容_XML
	 */
	CONST_CANVASTYPE_XML: "xml",
	/**
	 * 画布内容_圆角矩形
	 */
	CONST_CANVASTYPE_ROUNDRECT: "rounded-rect",
	/**
	 * 画布内容_圆形
	 */
	CONST_CANVASTYPE_CIRCULAR: "circular",
	/**
	 * 画布内容_矩形
	 */
	CONST_CANVASTYPE_RECT: "rect",
	/**
	 * 画布内容_菱形
	 */
	CONST_CANVASTYPE_RHOMBUS: "rhombus",
	/**
	 * 画布内容_三角形
	 */
	CONST_CANVASTYPE_TRIANGLE: "triangle",
	/**
	 * 画布内容_圆柱
	 */
	CONST_CANVASTYPE_CYLINDER: "cylinder",
	/**
	 * 画布内容_用户
	 */
	CONST_CANVASTYPE_ACTOR: "actor",
	/**
	 * 画布内容_泳道
	 */
	CONST_CANVASTYPE_SWIMLANE: "swimlane",
	/**
	 * 画布内容_自定义
	 */
	CONST_CANVASTYPE_CUSTOM: "custom",
	/**
	 * 画布内容_指针
	 */
	CONST_CANVASTYPE_POINTER: "pointer",
	/**
	 * 画布内容_放大
	 */
	CONST_CANVASTYPE_ZOOMIN: "zoom-in",
	/**
	 * 画布内容_缩小
	 */
	CONST_CANVASTYPE_ZOOMOUT: "zoom-out",
	/**
	 * 画布内容_帮助
	 */
	CONST_CANVASTYPE_HELP: "help",
	/**
	 * 画布内容_连接线
	 */
	CONST_CANVASTYPE_CONNECTOR: "connector",
	/**
	 * 画布内容_连接线样式_自动
	 */
	CONST_CANVASTYPE_CONNECTOR_AUTO: "connector-auto",
	/**
	 * 画布内容_连接线样式_关联
	 */
	CONST_CANVASTYPE_CONNECTOR_RELATION: "connector-relation",
	/**
	 * 画布内容_连接线样式_侧边对侧边
	 */
	CONST_CANVASTYPE_CONNECTOR_SIDETOSIDE: "connector-side-to-side",
	/**
	 * 画布内容_连接线样式_上下连接
	 */
	CONST_CANVASTYPE_CONNECTOR_TOPTOBOTTOM: "connector-top-to-bottom",
	/**
	 * 画布内容_连接线样式_环
	 */
	CONST_CANVASTYPE_CONNECTOR_LOOP: "connector-loop",
	/**
	 * 画布内容_连接线样式_正交
	 */
	CONST_CANVASTYPE_CONNECTOR_ORTHOGONAL: "connector-orthogonal",
	/**
	 * 画布内容_连接线样式_分割
	 */
	CONST_CANVASTYPE_CONNECTOR_SEGMENT: "connector-segment",
	/**
	 * DIV_设计器主面板
	 */
	CONST_DIVMAINID: "pddMain",
	/**
	 * DIV_设计器顶端面板
	 */
	CONST_DIVTOPPANELID: "pddTopPanel",
	/**
	 * DIV_设计器调式浮动按钮组
	 */
	CONST_DIVDEBUGID: "pddDebug",
	/**
	 * DIV_设计器主体
	 */
	CONST_DIVBODYID: "pddBody",
	/**
	 * DIV_设计器内容
	 */
	CONST_DIVCONTENTID: "pddContent",
	/**
	 * DIV_设计器商标
	 */
	CONST_DIVLOGOID: "pddLogo",
	/**
	 * DIV_设计器标题
	 */
	CONST_DIVTITLEID: "pddTitle",
	/**
	 * DIV_设计器提示栏
	 */
	CONST_DIVNOTIFICATIONID: "pddNotification",
	/**
	 * DIV_设计器用户
	 */
	CONST_DIVUSERID: "pddUser",
	/**
	 * DIV_工具箱
	 */
	CONST_DIVTOOLBOXID: "pddToolBox",
	/**
	 * DIV_设计器画板
	 */
	CONST_DIVGRAPHID: "pddGraph",
	/**
	 * DIV_缩放按钮组
	 */
	CONST_DIVZOOMID: "pddZoom",
	/**
	 * DIV_放大按钮
	 */
	CONST_DIVZOOMINID: "pddZoomIn",
	/**
	 * DIV_缩小按钮
	 */
	CONST_DIVZOOMOUTID: "pddZoomOut",
	/**
	 * DIV_缩放比例按钮
	 */
	CONST_DIVZOOMSIZEID: "pddZoomSize",
	/**
	 * DIV_透明度按钮组
	 */
	CONST_DIVOPACITYID: "pddOpacity",
	/**
	 * DIV_透明度减少按钮
	 */
	CONST_DIVOPACITYDECREASEID: "pddOpacityDecrease",
	/**
	 * DIV_透明度增加按钮
	 */
	CONST_DIVOPACITYINCREASEID: "pddOpacityIncrease",
	/**
	 * DIV_透明度值按钮
	 */
	CONST_DIVOPACITYVALUEID: "pddOpacityValue",
	/**
	 * DIV_帮助按钮
	 */
	CONST_DIVHELPID: "pddHelp",
	/**
	 * DIV_画布
	 */
	CONST_DIVCANVASID: "pddCanvas",
	/**
	 * DIV_搜索
	 */
	CONST_DIVSEARCHID: "pddSearch",
	/**
	 * DIV_工具栏
	 */
	CONST_DIVTOOLBARID: "pddToolbar",
	/**
	 * DIV_连接线样式
	 */
	CONST_DIVCONNECTORSTYLEID: "pddConnectorStyle",
	/**
	 * DIV_连接线样式_自动
	 */
	CONST_DIVCONNECTORSTYLEAUTOID: "pddConnectorStyleAuto",
	/**
	 * DIV_连接线样式_关联
	 */
	CONST_DIVCONNECTORSTYLERELATIONID: "pddConnectorStyleRelation",
	/**
	 * DIV_连接线样式_侧边对侧边
	 */
	CONST_DIVCONNECTORSTYLESIDETOSIDEID: "pddConnectorStyleSideToSide",
	/**
	 * DIV_连接线样式_上下连接
	 */
	CONST_DIVCONNECTORSTYLETOPTOBOTTOMID: "pddConnectorStyleTopToBottom",
	/**
	 * DIV_连接线样式_环
	 */
	CONST_DIVCONNECTORSTYLELOOPID: "pddConnectorStyleLoop",
	/**
	 * DIV_连接线样式_正交
	 */
	CONST_DIVCONNECTORSTYLEORTHOGONALID: "pddConnectorStyleOrthogonal",
	/**
	 * DIV_连接线样式_分割
	 */
	CONST_DIVCONNECTORSTYLESEGMENTID: "pddConnectorStyleSegment",
	/**
	 * DIV_复制
	 */
	CONST_DIVCOPYID: "pddCopy",
	/**
	 * DIV_剪贴
	 */
	CONST_DIVCUTID: "pddCut",
	/**
	 * DIV_粘贴
	 */
	CONST_DIVPASTEID: "pddPaste",
	/**
	 * DIV_删除
	 */
	CONST_DIVDELETEID: "pddDelete",
	/**
	 * DIV_撤销
	 */
	CONST_DIVUNDOID: "pddUndo",
	/**
	 * DIV_重置
	 */
	CONST_DIVREDOID: "pddRedo",
	/**
	 * DIV_向上移动
	 */
	CONST_DIVMOVEUPID: "pddMoveUp",
	/**
	 * DIV_向下移动
	 */
	CONST_DIVMOVEDOWNID: "pddMoveDown",
	/**
	 * DIV_向左移动
	 */
	CONST_DIVMOVELEFTID: "pddMoveLeft",
	/**
	 * DIV_向右移动
	 */
	CONST_DIVMOVERIGHTID: "pddMoveRight",
	/**
	 * 设计器控件反馈_更新元件属性
	 */
	CONST_RESPONSE_UPDATEPROP: "update-prop",
	/**
	 * 设计器控件反馈_更新元件属性
	 */
	CONST_RESPONSE_UPDATEPROPS: "update-props",
	/**
	 * 设计器控件反馈_更新画板内容XML
	 */
	CONST_RESPONSE_UPDATEXML: "update-xml",
	/**
	 * 设计器控件反馈_未选择画板元件
	 */
	CONST_RESPONSE_SELECTEDNONE: "selected-none",
	/**
	 * 画板元件移动时标尺颜色
	 */
	CONST_GUIDE_COLOR: "#999999",
	/**
	 * 画板元件移动时标尺线条宽度
	 */
	CONST_GUIDE_STROKEWIDTH: 4,
	/**
	 * 画板元件移动步长
	 */
	CONST_GRAPHCELL_MOVESTEP: 5,
	/**
	 * 画板元件透明度
	 */
	CONST_GRAPHCELL_OPACITY: 100,
	/**
	 * 画板元件节点类型_无
	 */
	CONST_GRAPHCELLNODETYPE_NONE: "无",
	/**
	 * 画板元件节点类型_连接线
	 */
	CONST_GRAPHCELLNODETYPE_CONNECTOR: "连接线",
	/**
	 * 剪贴板步长
	 */
	CONST_CLIPBOARDSTEPSIZE: 10,
	/**
	 * @description 检查变量是否为空
	 * @param obj 变量
	 * @return boolean 布尔值
	 */
	isEmpty: function (obj) {
		if (obj == null || obj == undefined) return true;

		return false;
	},
	/**
	 * @description 检查变量是否为空字符串
	 * @param obj 变量
	 * @return boolean 布尔值
	 */
	isEmptyString: function (obj) {
		if (this.isEmpty(obj) || typeof (obj) != "string") return true;

		if (obj.trim().length == 0) return true;

		return false;
	},
	/**
	 * @description 检查变量是否为数字
	 * @param obj 变量
	 * @return boolean 布尔值
	 */
	isNumber: function (obj) {
		if (this.isEmpty(obj) || typeof (obj) != "number" || Number.isNaN(obj)) return false;

		return true;
	},
	/**
	 * @description 检查变量是否为布尔
	 * @param obj 变量
	 * @return boolean 布尔值
	 */
	isBoolean: function (obj) {
		if (this.isEmpty(obj) || typeof (obj) != "boolean") return false;

		return true;
	},
	/**
	 * @description 检查数组是否为空
	 * @param arr 数组
	 * @return boolean 布尔值
	 */
	isEmptyArray: function (obj) {
		if (this.isEmpty(obj) || typeof (obj) != "object") return true;

		if (obj.length == 0) return true;

		return false;
	},
	/**
	 * @description 创建画布
	 * @param id ID
	 * @param size 大小
	 * @param type 类型
	 * @param color 颜色
	 * @return 画布对象
	 */
	createCanvas: function (id, size, type, color) {
		if (this.isEmptyString(id)) {
			console.error("参数ID为空");

			return;
		}

		var nodeID = id;

		id += this.CONST_SPLITSYMBOL + this.designerID;

		if (!this.isNumber(size)) {
			console.error("参数大小为空或不是有效的数字");

			return;
		}

		var width = size;

		var height = size;

		if (this.isEmpty(this.divCanvas)) {
			console.error("获取DIV元素" + this.CONST_DIVCANVAS + "失败");

			return;
		}

		var devicePixelRatio = window.devicePixelRatio;

		if (!this.isNumber(devicePixelRatio)) {
			console.error("获取窗口设备像素比例 devicePixelRatio 失败");

			return;
		}

		var newCanvas = document.getElementById(id);

		if (this.isEmpty(newCanvas)) newCanvas = document.createElement("canvas");

		if (this.isEmpty(newCanvas)) {
			console.error("创建Canvas元素" + id + "失败");

			return;
		}

		newCanvas.id = id;
		newCanvas.width = width;
		newCanvas.height = height;
		newCanvas.style.width = width + this.CONST_SIZEUNIT;
		newCanvas.style.height = height + this.CONST_SIZEUNIT;
		newCanvas.style.maxWidth = width + this.CONST_SIZEUNIT;
		newCanvas.style.maxHeight = height + this.CONST_SIZEUNIT;

		newCanvas.setAttribute(this.CONST_ATTRIBUTE_FLATBUTTONNODEID, nodeID);

		var newCanvasCtx = newCanvas.getContext("2d");

		if (!newCanvasCtx) {
			console.error({ msg: "获取画布上下文失败", param: newCanvas });

			return;
		}

		this.divCanvas.appendChild(newCanvas);

		if (this.isEmptyString(type)) {
			console.error("参数类型为空");

		} else {
			var canvasX = 0;
			var canvasY = 0;
			var canvasRadius = 4;
			var canvasWidth = width;
			var canvasHeight = height;

			if (!this.isEmptyString(color)) {
				newCanvasCtx.fillStyle = color;
				newCanvasCtx.strokeStyle = color;
			} else {
				newCanvasCtx.fillStyle = this.CONST_STYLE_VERTEX_FILLCOLOR;
				newCanvasCtx.strokeStyle = this.CONST_STYLE_VERTEX_FILLCOLOR;
			}

			if (this.CONST_CANVASTYPE_SCROLLLEFT == type) {
				canvasX = canvasWidth / 3;

				newCanvasCtx.beginPath();

				newCanvasCtx.moveTo(canvasX, canvasHeight / 2);
				newCanvasCtx.lineTo(canvasWidth, canvasY);
				newCanvasCtx.lineTo(canvasWidth, canvasHeight);
				newCanvasCtx.lineTo(canvasX, canvasHeight / 2);
				newCanvasCtx.fill();

				newCanvasCtx.closePath();
			} else if (this.CONST_CANVASTYPE_SCROLLRIGHT == type) {
				canvasWidth = canvasWidth / 3 * 2;

				newCanvasCtx.beginPath();

				newCanvasCtx.moveTo(canvasX, canvasY);
				newCanvasCtx.lineTo(canvasX, canvasHeight);
				newCanvasCtx.lineTo(canvasWidth, canvasHeight / 2);
				newCanvasCtx.lineTo(canvasX, canvasY);
				newCanvasCtx.fill();

				newCanvasCtx.closePath();
			} else if (this.CONST_CANVASTYPE_SCROLLUP == type) {
				canvasY = canvasHeight / 3;

				newCanvasCtx.beginPath();

				newCanvasCtx.moveTo(canvasWidth / 2, canvasY);
				newCanvasCtx.lineTo(canvasX, canvasHeight);
				newCanvasCtx.lineTo(canvasWidth, canvasHeight);
				newCanvasCtx.lineTo(canvasWidth / 2, canvasY);
				newCanvasCtx.fill();

				newCanvasCtx.closePath();
			} else if (this.CONST_CANVASTYPE_SCROLLDOWN == type) {
				canvasHeight = canvasHeight / 3 * 2;

				newCanvasCtx.beginPath();

				newCanvasCtx.moveTo(canvasX, canvasY);
				newCanvasCtx.lineTo(canvasWidth, canvasY);
				newCanvasCtx.lineTo(canvasWidth / 2, canvasHeight);
				newCanvasCtx.lineTo(canvasX, canvasY);
				newCanvasCtx.fill();

				newCanvasCtx.closePath();
			} else if (this.CONST_CANVASTYPE_ROUNDRECT == type) {
				canvasX = canvasWidth / 8;
				canvasY = canvasHeight / 4;
				canvasWidth = canvasWidth / 4 * 3;
				canvasHeight = canvasHeight / 2;

				newCanvasCtx.beginPath();

				newCanvasCtx.moveTo(canvasX, canvasY + canvasRadius);
				newCanvasCtx.lineTo(canvasX, canvasY + canvasHeight - canvasRadius);
				newCanvasCtx.arcTo(canvasX, canvasY + canvasHeight, canvasX + canvasRadius, canvasY + canvasHeight, canvasRadius);
				newCanvasCtx.lineTo(canvasX + canvasWidth - canvasRadius, canvasY + canvasHeight);
				newCanvasCtx.arcTo(canvasX + canvasWidth, canvasY + canvasHeight, canvasX + canvasWidth, canvasY + canvasHeight - canvasRadius, canvasRadius);
				newCanvasCtx.lineTo(canvasX + canvasWidth, canvasY + canvasRadius);
				newCanvasCtx.arcTo(canvasX + canvasWidth, canvasY, canvasX + canvasWidth - canvasRadius, canvasY, canvasRadius);
				newCanvasCtx.lineTo(canvasX + canvasRadius, canvasY);
				newCanvasCtx.arcTo(canvasX, canvasY, canvasX, canvasY + canvasRadius, canvasRadius);
				newCanvasCtx.fill();

				newCanvasCtx.closePath();
			} else if (this.CONST_CANVASTYPE_CIRCULAR == type) {
				newCanvasCtx.beginPath();

				newCanvasCtx.arc(canvasWidth / 2, canvasHeight / 2, canvasWidth / 8 * 3, 0, 2 * Math.PI);
				newCanvasCtx.fill();

				newCanvasCtx.closePath();
			} else if (this.CONST_CANVASTYPE_RECT == type) {
				canvasX = canvasWidth / 8;
				canvasY = canvasHeight / 4;
				canvasWidth = canvasWidth / 4 * 3;
				canvasHeight = canvasHeight / 2;

				newCanvasCtx.beginPath();

				newCanvasCtx.fillRect(canvasX, canvasY, canvasWidth, canvasHeight);

				newCanvasCtx.closePath();
			} else if (this.CONST_CANVASTYPE_RHOMBUS == type) {
				canvasX = canvasWidth / 8;
				canvasY = canvasHeight / 8;
				canvasWidth = canvasWidth / 4 * 3;
				canvasHeight = canvasHeight / 4 * 3;

				newCanvasCtx.beginPath();

				newCanvasCtx.moveTo(canvasX + (canvasWidth / 2), canvasY);
				newCanvasCtx.lineTo(canvasX, canvasY + (canvasHeight / 2));
				newCanvasCtx.lineTo(canvasX + (canvasWidth / 2), canvasY + canvasHeight);
				newCanvasCtx.lineTo(canvasX + canvasWidth, canvasY + (canvasHeight / 2));
				newCanvasCtx.lineTo(canvasX + (canvasWidth / 2), canvasY);
				newCanvasCtx.fill();

				newCanvasCtx.closePath();
			} else if (this.CONST_CANVASTYPE_TRIANGLE == type) {
				canvasX = canvasWidth / 6;
				canvasY = canvasHeight / 12;
				canvasWidth = canvasWidth / 3 * 2;
				canvasHeight = canvasHeight / 6 * 5;

				newCanvasCtx.beginPath();

				newCanvasCtx.moveTo(canvasX, canvasY);
				newCanvasCtx.lineTo(canvasX, canvasHeight);
				newCanvasCtx.lineTo(canvasX + canvasWidth, canvasY + (canvasHeight / 2));
				newCanvasCtx.lineTo(canvasX, canvasY);
				newCanvasCtx.fill();

				newCanvasCtx.closePath();
			} else if (this.CONST_CANVASTYPE_CYLINDER == type) {
				newCanvasCtx.beginPath();

				newCanvasCtx.ellipse(canvasWidth / 2, canvasHeight / 12 * 9, canvasWidth / 3, canvasHeight / 6, 0, 0, Math.PI);
				newCanvasCtx.ellipse(canvasWidth / 2, canvasHeight / 12 * 3, canvasWidth / 3, canvasHeight / 6, Math.PI, 0, Math.PI);
				newCanvasCtx.fill();

				newCanvasCtx.closePath();
			} else if (this.CONST_CANVASTYPE_ACTOR == type) {
				canvasX = canvasWidth / 6;
				canvasY = canvasHeight / 12;
				canvasWidth = canvasWidth / 3 * 2;
				canvasHeight = canvasHeight / 6 * 5;

				newCanvasCtx.beginPath();

				newCanvasCtx.arc(canvasX + (canvasWidth / 2), canvasY + (canvasHeight / 5), canvasHeight / 5, 0, 2 * Math.PI);
				newCanvasCtx.fill();

				newCanvasCtx.moveTo(canvasX + canvasWidth, canvasY + canvasHeight);
				newCanvasCtx.lineTo(canvasX + canvasWidth, canvasY + (canvasHeight / 5 * 2) + canvasRadius);
				newCanvasCtx.arcTo(canvasX + canvasWidth, canvasY + (canvasHeight / 5 * 2), canvasX + canvasWidth - canvasRadius, canvasY + (canvasHeight / 5 * 2), canvasRadius);
				newCanvasCtx.lineTo(canvasX + canvasRadius, canvasY + (canvasHeight / 5 * 2));
				newCanvasCtx.arcTo(canvasX, canvasY + (canvasHeight / 5 * 2), canvasX, canvasY + canvasHeight, canvasRadius);
				newCanvasCtx.lineTo(canvasX, canvasY + canvasHeight);
				newCanvasCtx.fill();

				newCanvasCtx.closePath();
			} else if (this.CONST_CANVASTYPE_SWIMLANE == type) {
				canvasX = canvasWidth / 8;
				canvasY = canvasHeight / 4;
				canvasWidth = canvasWidth / 4 * 3;
				canvasHeight = canvasHeight / 2;

				newCanvasCtx.beginPath();

				newCanvasCtx.fillRect(canvasX, canvasY, canvasWidth, canvasHeight / 10 * 3);

				newCanvasCtx.fillRect(canvasX, canvasY + (canvasHeight / 10 * 4), canvasWidth, canvasHeight / 10 * 6);

				newCanvasCtx.closePath();
			} else if (this.CONST_CANVASTYPE_POINTER == type) {
				canvasX = canvasWidth / 6;
				canvasY = canvasHeight / 6;
				canvasWidth = canvasWidth / 3 * 2;
				canvasHeight = canvasHeight / 3 * 2;

				newCanvasCtx.fillStyle = "#000000";
				newCanvasCtx.strokeStyle = "#000000";

				newCanvasCtx.beginPath();

				newCanvasCtx.moveTo(canvasX, canvasY);
				newCanvasCtx.lineTo(canvasX + (canvasWidth / 4 * 3), canvasY + (canvasHeight / 6));
				newCanvasCtx.lineTo(canvasX + (canvasWidth / 4), canvasY + (canvasHeight / 4));
				newCanvasCtx.lineTo(canvasX + (canvasWidth / 6), canvasY + (canvasHeight / 4 * 3));
				newCanvasCtx.lineTo(canvasX, canvasY);
				newCanvasCtx.fill();

				newCanvasCtx.moveTo(canvasX + (canvasWidth / 10), canvasY);
				newCanvasCtx.lineTo(canvasX, canvasY + (canvasHeight / 10));
				newCanvasCtx.lineTo(canvasX + (canvasWidth / 10 * 9), canvasY + canvasHeight);
				newCanvasCtx.lineTo(canvasX + canvasWidth, canvasY + (canvasHeight / 10 * 9));
				newCanvasCtx.lineTo(canvasX + (canvasWidth / 10), canvasY);
				newCanvasCtx.fill();

				newCanvasCtx.closePath();
			} else if (this.CONST_CANVASTYPE_ZOOMIN == type) {
				canvasX = canvasWidth / 8;
				canvasY = canvasHeight / 8;
				canvasWidth = canvasWidth / 4 * 3;
				canvasHeight = canvasHeight / 4 * 3;

				newCanvasCtx.beginPath();

				newCanvasCtx.moveTo(canvasX + (canvasWidth / 3), canvasY);
				newCanvasCtx.lineTo(canvasX + (canvasWidth / 3 * 2), canvasY);
				newCanvasCtx.lineTo(canvasX + (canvasWidth / 3 * 2), canvasY + (canvasHeight / 3));
				newCanvasCtx.lineTo(canvasX + canvasWidth, canvasY + (canvasHeight / 3));
				newCanvasCtx.lineTo(canvasX + canvasWidth, canvasY + (canvasHeight / 3 * 2));
				newCanvasCtx.lineTo(canvasX + (canvasWidth / 3 * 2), canvasY + (canvasHeight / 3 * 2));
				newCanvasCtx.lineTo(canvasX + (canvasWidth / 3 * 2), canvasY + canvasHeight);
				newCanvasCtx.lineTo(canvasX + (canvasWidth / 3), canvasY + canvasHeight);
				newCanvasCtx.lineTo(canvasX + (canvasWidth / 3), canvasY + (canvasHeight / 3 * 2));
				newCanvasCtx.lineTo(canvasX, canvasY + (canvasHeight / 3 * 2));
				newCanvasCtx.lineTo(canvasX, canvasY + (canvasHeight / 3));
				newCanvasCtx.lineTo(canvasX + (canvasWidth / 3), canvasY + (canvasHeight / 3));
				newCanvasCtx.lineTo(canvasX + (canvasWidth / 3), canvasY);

				newCanvasCtx.fill();

				newCanvasCtx.closePath();
			} else if (this.CONST_CANVASTYPE_ZOOMOUT == type) {
				canvasX = canvasWidth / 8;
				canvasY = canvasHeight / 8;
				canvasWidth = canvasWidth / 4 * 3;
				canvasHeight = canvasHeight / 4 * 3;

				newCanvasCtx.beginPath();

				newCanvasCtx.fillRect(canvasX, canvasY + (canvasHeight / 3), canvasWidth, canvasHeight / 3);

				newCanvasCtx.closePath();
			} else if (this.CONST_CANVASTYPE_HELP == type) {
				canvasX = canvasWidth / 8;
				canvasY = canvasHeight / 8;
				canvasWidth = canvasWidth / 4 * 3;
				canvasHeight = canvasHeight / 4 * 3;

				newCanvasCtx.beginPath();

				newCanvasCtx.moveTo(canvasX + (canvasWidth / 2), canvasY + (canvasHeight / 2));
				newCanvasCtx.arcTo(canvasX + (canvasWidth / 4 * 3), canvasY + (canvasHeight / 2), canvasX + (canvasWidth / 4 * 3), canvasY + (canvasHeight / 4), canvasWidth / 4);
				newCanvasCtx.arcTo(canvasX + (canvasWidth / 4 * 3), canvasY, canvasX + (canvasWidth / 2), canvasY, canvasWidth / 4);
				newCanvasCtx.arcTo(canvasX + (canvasWidth / 4), canvasY, canvasX + (canvasWidth / 4), canvasY + (canvasHeight / 4), canvasWidth / 4);
				newCanvasCtx.lineTo(canvasX + (canvasWidth / 8 * 3), canvasY + (canvasHeight / 4));
				newCanvasCtx.arcTo(canvasX + (canvasWidth / 8 * 3), canvasY + (canvasHeight / 8), canvasX + (canvasWidth / 2), canvasY + (canvasHeight / 8), canvasWidth / 8);
				newCanvasCtx.arcTo(canvasX + (canvasWidth / 8 * 5), canvasY + (canvasHeight / 8), canvasX + (canvasWidth / 8 * 5), canvasY + (canvasHeight / 4), canvasWidth / 8);
				newCanvasCtx.arcTo(canvasX + (canvasWidth / 8 * 5), canvasY + (canvasHeight / 8), canvasX + (canvasWidth / 8 * 5), canvasY + (canvasHeight / 4), canvasWidth / 8);
				newCanvasCtx.arcTo(canvasX + (canvasWidth / 8 * 5), canvasY + (canvasHeight / 8 * 3), canvasX + (canvasWidth / 2), canvasY + (canvasHeight / 8 * 3), canvasWidth / 8);
				newCanvasCtx.lineTo(canvasX + (canvasWidth / 16 * 7), canvasY + (canvasHeight / 8 * 3));
				newCanvasCtx.lineTo(canvasX + (canvasWidth / 16 * 7), canvasY + (canvasHeight / 16 * 12));
				newCanvasCtx.lineTo(canvasX + (canvasWidth / 16 * 9), canvasY + (canvasHeight / 16 * 12));
				newCanvasCtx.lineTo(canvasX + (canvasWidth / 16 * 9), canvasY + (canvasHeight / 8 * 3));

				newCanvasCtx.fill();

				newCanvasCtx.fillRect(canvasX + (canvasWidth / 16 * 7), canvasY + (canvasHeight / 8 * 7), canvasWidth / 8, canvasHeight / 8);

				newCanvasCtx.closePath();
			} else if (this.CONST_CANVASTYPE_CONNECTOR_AUTO == type) {
				canvasX = canvasWidth / 10;
				canvasY = canvasHeight / 10;
				canvasWidth = canvasWidth / 5 * 4;
				canvasHeight = canvasHeight / 5 * 4;

				newCanvasCtx.beginPath();

				newCanvasCtx.moveTo(canvasX, canvasY);
				newCanvasCtx.lineTo(canvasX + (canvasWidth / 8 * 2), canvasY);
				newCanvasCtx.lineTo(canvasX + (canvasWidth / 8 * 2), canvasY + (canvasHeight / 8 * 5));
				newCanvasCtx.lineTo(canvasX + (canvasWidth / 8 * 6), canvasY + (canvasHeight / 8 * 5));
				newCanvasCtx.lineTo(canvasX + (canvasWidth / 8 * 6), canvasY + (canvasHeight / 8 * 4));
				newCanvasCtx.lineTo(canvasX + canvasWidth, canvasY + (canvasHeight / 8 * 6));
				newCanvasCtx.lineTo(canvasX + (canvasWidth / 8 * 6), canvasY + canvasHeight);
				newCanvasCtx.lineTo(canvasX + (canvasWidth / 8 * 6), canvasY + (canvasHeight / 8 * 7));
				newCanvasCtx.lineTo(canvasX, canvasY + (canvasHeight / 8 * 7));
				newCanvasCtx.lineTo(canvasX, canvasY);

				newCanvasCtx.fill();

				newCanvasCtx.closePath();

				newCanvasCtx.beginPath();

				newCanvasCtx.moveTo(canvasX + (canvasWidth / 8 * 3), canvasY);
				newCanvasCtx.lineTo(canvasX + (canvasWidth / 8 * 6), canvasY);
				newCanvasCtx.lineTo(canvasX + (canvasWidth / 8 * 7), canvasY + (canvasHeight / 8 * 4));
				newCanvasCtx.lineTo(canvasX + (canvasWidth / 8 * 6), canvasY + (canvasHeight / 8 * 5));
				newCanvasCtx.lineTo(canvasX + (canvasWidth / 8 * 5), canvasY + (canvasHeight / 8));
				newCanvasCtx.lineTo(canvasX + (canvasWidth / 8 * 4), canvasY + (canvasHeight / 8));
				newCanvasCtx.lineTo(canvasX + (canvasWidth / 8 * 3), canvasY + (canvasHeight / 8 * 5));
				newCanvasCtx.lineTo(canvasX + (canvasWidth / 8 * 2), canvasY + (canvasHeight / 8 * 4));
				newCanvasCtx.lineTo(canvasX + (canvasWidth / 8 * 3), canvasY);

				newCanvasCtx.fill();

				newCanvasCtx.fillRect(canvasX + (canvasWidth / 8 * 3), canvasY + (canvasHeight / 8 * 2), canvasWidth / 8 * 3, canvasHeight / 8);

				newCanvasCtx.closePath();
			} else if (this.CONST_CANVASTYPE_CONNECTOR_LOOP == type) {
				canvasX = canvasWidth / 10;
				canvasY = canvasHeight / 10;
				canvasWidth = canvasWidth / 5 * 4;
				canvasHeight = canvasHeight / 5 * 4;

				newCanvasCtx.beginPath();

				newCanvasCtx.moveTo(canvasX, canvasY + (canvasHeight / 8 * 2));
				newCanvasCtx.lineTo(canvasX + (canvasWidth / 8), canvasY + (canvasHeight / 8 * 2));
				newCanvasCtx.lineTo(canvasX + (canvasWidth / 8 * 2), canvasY);
				newCanvasCtx.lineTo(canvasX + (canvasWidth / 8 * 6), canvasY);
				newCanvasCtx.lineTo(canvasX + (canvasWidth / 8 * 5), canvasY + (canvasHeight / 8 * 5));
				newCanvasCtx.lineTo(canvasX + (canvasWidth / 8 * 6), canvasY + (canvasHeight / 8 * 5));
				newCanvasCtx.lineTo(canvasX + (canvasWidth / 8 * 6), canvasY + (canvasHeight / 8 * 4));
				newCanvasCtx.lineTo(canvasX + canvasWidth, canvasY + (canvasHeight / 8 * 6));
				newCanvasCtx.lineTo(canvasX + (canvasWidth / 8 * 6), canvasY + canvasHeight);
				newCanvasCtx.lineTo(canvasX + (canvasWidth / 8 * 6), canvasY + (canvasHeight / 8 * 7));
				newCanvasCtx.lineTo(canvasX + (canvasWidth / 8 * 3), canvasY + (canvasHeight / 8 * 7));
				newCanvasCtx.lineTo(canvasX + (canvasWidth / 8 * 4), canvasY + (canvasHeight / 8 * 2));
				newCanvasCtx.lineTo(canvasX + (canvasWidth / 8 * 3), canvasY + (canvasHeight / 8 * 2));
				newCanvasCtx.lineTo(canvasX + (canvasWidth / 8 * 2), canvasY + (canvasHeight / 8 * 4));
				newCanvasCtx.lineTo(canvasX, canvasY + (canvasHeight / 8 * 4));
				newCanvasCtx.lineTo(canvasX, canvasY + (canvasHeight / 8 * 2));

				newCanvasCtx.fill();

				newCanvasCtx.closePath();
			} else if (this.CONST_CANVASTYPE_CONNECTOR_RELATION == type) {
				canvasX = canvasWidth / 10;
				canvasY = canvasHeight / 10;
				canvasWidth = canvasWidth / 5 * 4;
				canvasHeight = canvasHeight / 5 * 4;

				newCanvasCtx.beginPath();

				newCanvasCtx.moveTo(canvasX, canvasY);
				newCanvasCtx.lineTo(canvasX + (canvasWidth / 8 * 2), canvasY);
				newCanvasCtx.lineTo(canvasX + (canvasWidth / 8 * 5), canvasY + (canvasWidth / 8 * 5));
				newCanvasCtx.lineTo(canvasX + (canvasWidth / 8 * 6), canvasY + (canvasHeight / 8 * 5));
				newCanvasCtx.lineTo(canvasX + (canvasWidth / 8 * 6), canvasY + (canvasHeight / 8 * 4));
				newCanvasCtx.lineTo(canvasX + canvasWidth, canvasY + (canvasHeight / 8 * 6));
				newCanvasCtx.lineTo(canvasX + (canvasWidth / 8 * 6), canvasY + canvasHeight);
				newCanvasCtx.lineTo(canvasX + (canvasWidth / 8 * 6), canvasY + (canvasHeight / 8 * 7));
				newCanvasCtx.lineTo(canvasX + (canvasWidth / 8 * 4), canvasY + (canvasHeight / 8 * 7));
				newCanvasCtx.lineTo(canvasX + (canvasWidth / 8), canvasY + (canvasHeight / 8 * 2));
				newCanvasCtx.lineTo(canvasX, canvasY + (canvasHeight / 8 * 2));
				newCanvasCtx.lineTo(canvasX, canvasY);

				newCanvasCtx.fill();

				newCanvasCtx.closePath();
			} else if (this.CONST_CANVASTYPE_CONNECTOR_SIDETOSIDE == type) {
				canvasX = canvasWidth / 10;
				canvasY = canvasHeight / 10;
				canvasWidth = canvasWidth / 5 * 4;
				canvasHeight = canvasHeight / 5 * 4;

				newCanvasCtx.beginPath();

				newCanvasCtx.moveTo(canvasX, canvasY);
				newCanvasCtx.lineTo(canvasX + (canvasWidth / 8 * 4), canvasY);
				newCanvasCtx.lineTo(canvasX + (canvasWidth / 8 * 4), canvasY + (canvasHeight / 8 * 5));
				newCanvasCtx.lineTo(canvasX + (canvasWidth / 8 * 6), canvasY + (canvasHeight / 8 * 5));
				newCanvasCtx.lineTo(canvasX + (canvasWidth / 8 * 6), canvasY + (canvasHeight / 8 * 4));
				newCanvasCtx.lineTo(canvasX + canvasWidth, canvasY + (canvasHeight / 8 * 6));
				newCanvasCtx.lineTo(canvasX + (canvasWidth / 8 * 6), canvasY + canvasHeight);
				newCanvasCtx.lineTo(canvasX + (canvasWidth / 8 * 6), canvasY + (canvasHeight / 8 * 7));
				newCanvasCtx.lineTo(canvasX + (canvasWidth / 8 * 2), canvasY + (canvasHeight / 8 * 7));
				newCanvasCtx.lineTo(canvasX + (canvasWidth / 8 * 2), canvasY + (canvasHeight / 8 * 2));
				newCanvasCtx.lineTo(canvasX, canvasY + (canvasHeight / 8 * 2));
				newCanvasCtx.lineTo(canvasX, canvasY);

				newCanvasCtx.fill();

				newCanvasCtx.closePath();
			} else if (this.CONST_CANVASTYPE_CONNECTOR_TOPTOBOTTOM == type) {
				canvasX = canvasWidth / 10;
				canvasY = canvasHeight / 10;
				canvasWidth = canvasWidth / 5 * 4;
				canvasHeight = canvasHeight / 5 * 4;

				newCanvasCtx.beginPath();

				newCanvasCtx.moveTo(canvasX, canvasY);
				newCanvasCtx.lineTo(canvasX + (canvasWidth / 8 * 2), canvasY);
				newCanvasCtx.lineTo(canvasX + (canvasWidth / 8 * 2), canvasY + (canvasHeight / 8 * 2));
				newCanvasCtx.lineTo(canvasX + (canvasWidth / 8 * 7), canvasY + (canvasHeight / 8 * 2));
				newCanvasCtx.lineTo(canvasX + (canvasWidth / 8 * 7), canvasY + (canvasHeight / 8 * 6));
				newCanvasCtx.lineTo(canvasX + canvasWidth, canvasY + (canvasHeight / 8 * 6));
				newCanvasCtx.lineTo(canvasX + (canvasWidth / 8 * 6), canvasY + canvasHeight);
				newCanvasCtx.lineTo(canvasX + (canvasWidth / 8 * 4), canvasY + (canvasHeight / 8 * 6));
				newCanvasCtx.lineTo(canvasX + (canvasWidth / 8 * 5), canvasY + (canvasHeight / 8 * 6));
				newCanvasCtx.lineTo(canvasX + (canvasWidth / 8 * 5), canvasY + (canvasHeight / 8 * 4));
				newCanvasCtx.lineTo(canvasX, canvasY + (canvasHeight / 8 * 4));
				newCanvasCtx.lineTo(canvasX, canvasY);

				newCanvasCtx.fill();

				newCanvasCtx.closePath();
			} else if (this.CONST_CANVASTYPE_CONNECTOR_ORTHOGONAL == type) {
				canvasX = canvasWidth / 10;
				canvasY = canvasHeight / 10;
				canvasWidth = canvasWidth / 5 * 4;
				canvasHeight = canvasHeight / 5 * 4;

				newCanvasCtx.beginPath();

				newCanvasCtx.moveTo(canvasX, canvasY);
				newCanvasCtx.lineTo(canvasX + (canvasWidth / 8 * 7), canvasY);
				newCanvasCtx.lineTo(canvasX + (canvasWidth / 8 * 7), canvasY + (canvasHeight / 8 * 6));
				newCanvasCtx.lineTo(canvasX + canvasWidth, canvasY + (canvasHeight / 8 * 6));
				newCanvasCtx.lineTo(canvasX + (canvasWidth / 8 * 6), canvasY + canvasHeight);
				newCanvasCtx.lineTo(canvasX + (canvasWidth / 8 * 4), canvasY + (canvasHeight / 8 * 6));
				newCanvasCtx.lineTo(canvasX + (canvasWidth / 8 * 5), canvasY + (canvasHeight / 8 * 6));
				newCanvasCtx.lineTo(canvasX + (canvasWidth / 8 * 5), canvasY + (canvasHeight / 8 * 2));
				newCanvasCtx.lineTo(canvasX, canvasY + (canvasHeight / 8 * 2));
				newCanvasCtx.lineTo(canvasX, canvasY);

				newCanvasCtx.fill();

				newCanvasCtx.closePath();

				newCanvasCtx.beginPath();

				newCanvasCtx.moveTo(canvasX + (canvasWidth / 8 * 2), canvasY + (canvasHeight / 8 * 2));
				newCanvasCtx.lineTo(canvasX + (canvasWidth / 8 * 4), canvasY + (canvasHeight / 8 * 2));
				newCanvasCtx.lineTo(canvasX + (canvasWidth / 8 * 4), canvasY + (canvasHeight / 8 * 5));
				newCanvasCtx.lineTo(canvasX + (canvasWidth / 8 * 6), canvasY + (canvasHeight / 8 * 5));
				newCanvasCtx.lineTo(canvasX + (canvasWidth / 8 * 6), canvasY + (canvasHeight / 8 * 7));
				newCanvasCtx.lineTo(canvasX + (canvasWidth / 8 * 2), canvasY + (canvasHeight / 8 * 7));
				newCanvasCtx.lineTo(canvasX + (canvasWidth / 8 * 2), canvasY + (canvasHeight / 8 * 2));

				newCanvasCtx.fill();

				newCanvasCtx.closePath();
			} else if (this.CONST_CANVASTYPE_CONNECTOR_SEGMENT == type) {
				canvasX = canvasWidth / 10;
				canvasY = canvasHeight / 10;
				canvasWidth = canvasWidth / 5 * 4;
				canvasHeight = canvasHeight / 5 * 4;

				newCanvasCtx.beginPath();

				newCanvasCtx.moveTo(canvasX, canvasY);
				newCanvasCtx.lineTo(canvasX + (canvasWidth / 8 * 7), canvasY);
				newCanvasCtx.lineTo(canvasX + (canvasWidth / 8 * 7), canvasY + (canvasHeight / 8 * 6));
				newCanvasCtx.lineTo(canvasX + canvasWidth, canvasY + (canvasHeight / 8 * 6));
				newCanvasCtx.lineTo(canvasX + (canvasWidth / 8 * 6), canvasY + canvasHeight);
				newCanvasCtx.lineTo(canvasX + (canvasWidth / 8 * 4), canvasY + (canvasHeight / 8 * 6));
				newCanvasCtx.lineTo(canvasX + (canvasWidth / 8 * 5), canvasY + (canvasHeight / 8 * 6));
				newCanvasCtx.lineTo(canvasX + (canvasWidth / 8 * 5), canvasY + (canvasHeight / 8 * 2));
				newCanvasCtx.lineTo(canvasX, canvasY + (canvasHeight / 8 * 2));
				newCanvasCtx.lineTo(canvasX, canvasY);

				newCanvasCtx.fill();

				newCanvasCtx.closePath();
			} else if (this.CONST_CANVASTYPE_CUSTOM == type) {
				//自定义
			} else {
				console.error({ msg: "参数类型无效", param: type });
			}
		}

		return newCanvas;
	},
	/**
	 * @description 填充工具箱元件数组
	 */
	fillToolBoxCells: function () {
		if (this.isEmpty(this.divToolBox)) {
			console.error("获取DIV元素" + CONST_DIV_MGTOOLBOX + "失败");

			return;
		}

		//清空工具箱元件数组
		if (this.isEmpty(this.toolBoxCells)) {
			this.toolBoxCells = new Array();
		}

		//获取浮动按钮组方向（默认：横向）
		var groupDirection = this.divToolBox.getAttribute(this.CONST_ATTRIBUTE_FLATBUTTONGROUPDIRECTION);

		if (this.isEmptyString(groupDirection)) groupDirection = this.CONST_FLATBUTTONGROUP_VERTICALDIRECTION;

		//获取工具箱所有子项，添加到工具箱元件数组中
		var groupChildren = this.divToolBox.children;

		if (this.isEmpty(groupChildren)) {
			console.error({ msg: "获取浮动按钮组的子项为空", param: this.divToolBox });

			return;
		}

		var groupChildrenLength = groupChildren.length;

		if (!this.isNumber(groupChildrenLength)) {
			console.error({ msg: "获取浮动按钮组的子项为空", param: this.divToolBox });

			return;
		}

		if (groupChildrenLength < 4) {
			console.error({ msg: "获取的浮动按钮组子项异常", param: groupChildren });

			return;
		}

		if (groupChildrenLength == 4) {
			console.error({ msg: "获取的浮动按钮组没有子项需要排列", param: groupChildren });

			return;
		}

		var startIndex = 2;

		var endIndex = groupChildrenLength - 2;

		for (var index = startIndex; index < endIndex; index++) {
			var groupChild = groupChildren[index];

			if (this.isEmpty(groupChild)) {
				console.error({ msg: "获取浮动按钮组第" + index + "项为空", param: groupChildren });

				continue;
			}

			var groupChildChildren = groupChild.children;

			if (this.isEmpty(groupChildChildren)) {
				console.error({ msg: "获取浮动按钮组第" + index + "项的子项为空", param: groupChild });

				continue;
			}

			groupChild = groupChildChildren[0];

			if (this.isEmpty(groupChild)) {
				console.error({ msg: "获取浮动按钮组第" + index + "项为空", param: groupChildren });

				continue;
			}

			this.toolBoxCells.push(groupChild);
		}
	},
	/**
	 * @description 设置画板是否可编辑
	 * @param editable 是否可编辑
	 */
	setEditable: function (editable) {
		if (!this.isBoolean(editable)) {
			console.error("参数是否可编辑不是有效的数字");

			return;
		}

		//获取工具箱DIV
		if (this.isEmpty(this.divToolBox)) {
			console.error("获取DIV元素" + this.CONST_DIVTOOLBOX + "失败");

			return;
		}

		//获取工具栏DIV
		if (this.isEmpty(this.divToolbar)) {
			console.error("获取DIV元素" + this.CONST_DIVTOOLBAR + "失败");

			return;
		}

		//获取连接线样式DIV
		if (this.isEmpty(this.divConnectorStyle)) {
			console.error("获取DIV元素" + this.CONST_DIVCONNECTORSTYLE + "失败");

			return;
		}

		//获取向上移动按钮DIV
		if (this.isEmpty(this.divMoveUp)) {
			console.error("获取DIV元素" + this.CONST_DIVMOVEUP + "失败");

			return;
		}

		//获取向下移动按钮DIV
		if (this.isEmpty(this.divMoveDown)) {
			console.error("获取DIV元素" + this.CONST_DIVMOVEDOWN + "失败");

			return;
		}

		//获取向左移动按钮DIV
		if (this.isEmpty(this.divMoveLeft)) {
			console.error("获取DIV元素" + this.CONST_DIVMOVELEFT + "失败");

			return;
		}

		//获取向右移动按钮DIV
		if (this.isEmpty(this.divMoveRight)) {
			console.error("获取DIV元素" + this.CONST_DIVMOVERIGHT + "失败");

			return;
		}

		//检查mxGraph画板是否正常
		if (!this.checkGraph()) return;

		if (editable) {
			this.divToolBox.style.visibility = "visible";
			this.divToolbar.style.visibility = "visible";
			this.divMoveUp.style.visibility = "visible";
			this.divMoveDown.style.visibility = "visible";
			this.divMoveLeft.style.visibility = "visible";
			this.divMoveRight.style.visibility = "visible";
		} else {
			this.divToolBox.style.visibility = "hidden";
			this.divToolbar.style.visibility = "hidden";
			this.divConnectorStyle.style.visibility = "hidden";
			this.divMoveUp.style.visibility = "hidden";
			this.divMoveDown.style.visibility = "hidden";
			this.divMoveLeft.style.visibility = "hidden";
			this.divMoveRight.style.visibility = "hidden";
		}

		if (!this.isEmpty(this.graph)) this.graph.setEnabled(editable);
	},
	/**
	 * @description 设置浮动按钮组子项最大显示数
	 * @param group 浮动按钮组
	 * @param count 最大显示数
	 */
	setFlatButtonGroupMaxDisplayChildren: function (group, count) {
		if (this.isEmpty(group)) {
			console.error("参数浮动按钮组为空");

			return;
		}

		if (!this.isNumber(count)) {
			console.error("参数最大显示数不是有效的数字");

			return;
		}

		this.CONST_TOOLBOXMAXDISPLAYCHILDREN = Number.parseInt(count);

		group.setAttribute(this.CONST_ATTRIBUTE_FLATBUTTONGROUPMAXDISPLAYCHILDREN, this.CONST_TOOLBOXMAXDISPLAYCHILDREN.toString());
		group.setAttribute(this.CONST_ATTRIBUTE_FLATBUTTONGROUPSCROLLFROMINDEX, "0");

		//重新排列浮动按钮组的内容
		this.arrangeFlatButtonGroup(group);
	},

	/**
	 * @description 创建工具箱
	 */
	createToolBox: function () {
		//获取设计器主体DIV
		if (this.isEmpty(this.divBody)) {
			console.error("获取DIV元素" + this.CONST_DIVBODY + "失败");

			return;
		}

		//清空工具箱元件数组
		if (this.isEmpty(this.toolBoxCells)) {
			this.toolBoxCells = new Array();
		}

		//工具箱元件单击函数
		var cellOnClickFunc = function () {
			if (!this.pdd) return;
			var pdd = this.pdd;

			//设置选中的浮动按钮组子项
			pdd.setSelectedFlatButtonGroupChild([this], pdd.toolBoxCells);

			pdd.divToolBoxSelectedCell = this;
		};

		this.divToolBox = this.createFlatButtonGroup(this.CONST_DIVTOOLBOXID, null, null, this.CONST_FLATBUTTONGROUP_VERTICALDIRECTION, true, this.CONST_TOOLBOXMAXDISPLAYCHILDREN, 0);

		this.divBody.appendChild(this.divToolBox);

		this.divToolBoxCellPointer = this.createFlatButtonGroupChild(this.divToolBox, "pointer", this.CONST_CANVASTYPE_POINTER, null, null, this.CONST_CSSSTYLE_BUTTON, "指针", null, null, null, true, cellOnClickFunc);

		//填充工具箱元件数组
		this.fillToolBoxCells();

		//选中工具箱元件指针
		this.selectToolBoxCellPointer();

		//重新排列浮动网页元素
		this.arrangeFlatElement();
	},

	/**
	 * @description 检查连接线样式浮动按钮组是否正常
	 * @return boolean 是否正常
	 */
	checkConnectorStyle: function () {
		//获取连接线样式DIV
		if (this.isEmpty(this.divConnectorStyle)) {
			console.error("获取DIV元素" + this.CONST_DIVCONNECTORSTYLE + "失败");

			return false;
		}

		//获取连接线样式_自动DIV
		if (this.isEmpty(this.divConnectorStyleAuto)) {
			console.error("获取DIV元素" + this.CONST_DIVCONNECTORSTYLEAUTO + "失败");

			return false;
		}

		//获取连接线样式_关联DIV
		if (this.isEmpty(this.divConnectorStyleRelation)) {
			console.error("获取DIV元素" + this.CONST_DIVCONNECTORSTYLERELATION + "失败");

			return false;
		}

		//获取连接线样式_侧边对侧边DIV
		if (this.isEmpty(this.divConnectorStyleSideToSide)) {
			console.error("获取DIV元素" + this.CONST_DIVCONNECTORSTYLESIDETOSIDE + "失败");

			return false;
		}

		//获取连接线样式_上下连接DIV
		if (this.isEmpty(this.divConnectorStyleTopToBottom)) {
			console.error("获取DIV元素" + this.CONST_DIVCONNECTORSTYLETOPTOBOTTOM + "失败");

			return false;
		}

		//获取连接线样式_环DIV
		if (this.isEmpty(this.divConnectorStyleLoop)) {
			console.error("获取DIV元素" + this.CONST_DIVCONNECTORSTYLELOOP + "失败");

			return false;
		}

		//获取连接线样式_正交DIV
		if (this.isEmpty(this.divConnectorStyleOrthogonal)) {
			console.error("获取DIV元素" + this.CONST_DIVCONNECTORSTYLEORTHOGONAL + "失败");

			return false;
		}

		//获取连接线样式_分割DIV
		if (this.isEmpty(this.divConnectorStyleSegment)) {
			console.error("获取DIV元素" + this.CONST_DIVCONNECTORSTYLESEGMENT + "失败");

			return false;
		}

		return true;
	},
	/**
	 * @description 检查mxGraph画板是否正常
	 * @return boolean 是否正常
	 */
	checkGraph: function () {
		if (this.isEmpty(this.graph)) {
			console.error("未创建mxGraph画板");

			return false;
		}

		if (this.isEmpty(this.graphModel)) {
			console.error({ msg: "获取mxGraphModel画板模型失败", param: this.graph });

			return false;
		}

		if (this.isEmpty(this.graphSelectionModel)) {
			console.error({ msg: "获取mxGraphSelectionModel画板选择模型失败", param: this.graph });

			return false;
		}

		if (this.isEmpty(this.graphView)) {
			console.error({ msg: "获取mxGraphView画板视图失败", param: this.graph });

			return false;
		}

		if (this.isEmpty(this.graphParent)) {
			console.error({ msg: "获取mxGraphParent画板父项失败", param: this.graph });

			return false;
		}

		if (this.isEmpty(this.graphStylesheet)) {
			console.error({ msg: "获取mxGraphParent画板样式表失败", param: this.graph });

			return false;
		}

		if (this.isEmpty(this.undoManager)) {
			console.error("获取mxUndoManager画板撤销管理器失败");

			return false;
		}

		return true
	},
	/**
	 * @description 设置连接线样式
	 * @param style 连接线样式
	 */
	setConnectorStyle: function (style) {
		if (this.isEmptyString(style)) {
			console.log("参数连接线样式为空");

			return;
		}

		//检查mxGraph画板是否正常
		if (!this.checkGraph()) return;

		var selectedCells = this.graph.getSelectionCells();

		if (this.isEmptyArray(selectedCells)) {
			console.log("没有选中的画板的元件");

			return;
		}

		var selectedCellsLength = selectedCells.length;

		for (var index = 0; index < selectedCellsLength; index++) {
			var selectedCell = selectedCells[index];

			if (this.isEmpty(selectedCell)) continue;

			if (selectedCell.isVertex()) continue;

			this.setGraphCellAttribute(selectedCell, this.CONST_ATTRIBUTE_GRAPHCELLCONNECTORSTYLE, style);

			this.graphModel.setStyle(selectedCell, mxConstants.STYLE_EDGE + "=" + style);

			this.graph.refresh(selectedCell);
		}

	},
	/**
	 * @description 刷新连接线样式选中状态
	 */
	refreshConnectorStyle: function () {
		//检查mxGraph画板是否正常
		if (!this.checkGraph()) return;

		var selectedCells = this.graph.getSelectionCells();

		if (this.isEmptyArray(selectedCells)) {
			console.log("没有选中的画板的元件");

			return;
		}

		var styles = [];

		var selectedCellsLength = selectedCells.length;

		for (var index = 0; index < selectedCellsLength; index++) {
			var selectedCell = selectedCells[index];

			if (this.isEmpty(selectedCell)) continue;

			if (selectedCell.isVertex()) continue;

			var style = this.graphModel.getStyle(selectedCell);

			if (this.isEmptyString(style)) style = this.CONST_EDGE_STYLE_AUTO;

			style = style.replace(mxConstants.STYLE_EDGE + "=", "");

			styles.push(style);
		}

		var stylesLength = styles.length;

		var divSelectedConnectorStyles = new Array();

		for (var index = 0; index < stylesLength; index++) {
			var style = styles[index];

			if (this.isEmptyString(style)) continue;

			if (this.CONST_EDGE_STYLE_AUTO == style) {
				//连接线样式为自动
				if (!this.isEmpty(this.divConnectorStyleAuto)) divSelectedConnectorStyles.push(this.divConnectorStyleAuto);
			} else if (mxConstants.EDGESTYLE_ENTITY_RELATION == style) {
				//连接线样式为关联
				if (!this.isEmpty(this.divConnectorStyleRelation)) divSelectedConnectorStyles.push(this.divConnectorStyleRelation);
			} else if (mxConstants.EDGESTYLE_SIDETOSIDE == style) {
				//连接线样式为侧边对侧边
				if (!this.isEmpty(this.divConnectorStyleSideToSide)) divSelectedConnectorStyles.push(this.divConnectorStyleSideToSide);
			} else if (mxConstants.EDGESTYLE_TOPTOBOTTOM == style) {
				//连接线样式为上下连接
				if (!this.isEmpty(this.divConnectorStyleTopToBottom)) divSelectedConnectorStyles.push(this.divConnectorStyleTopToBottom);
			} else if (mxConstants.EDGESTYLE_LOOP == style) {
				//连接线样式为环
				if (!this.isEmpty(this.divConnectorStyleLoop)) divSelectedConnectorStyles.push(this.divConnectorStyleLoop);
			} else if (mxConstants.EDGESTYLE_ORTHOGONAL == style) {
				//连接线样式为正交
				if (!this.isEmpty(this.divConnectorStyleOrthogonal)) divSelectedConnectorStyles.push(this.divConnectorStyleOrthogonal);
			} else if (mxConstants.EDGESTYLE_SEGMENT == style) {
				//连接线样式为分割
				if (!this.isEmpty(this.divConnectorStyleSegment)) divSelectedConnectorStyles.push(this.divConnectorStyleSegment);
			}
		}

		if (!this.isEmptyArray(divSelectedConnectorStyles)) {
			this.setSelectedFlatButtonGroupChild(divSelectedConnectorStyles, this.connectorStyleCells);
		}
	},
	/**
	 * @description 删除选中的画板元件
	 */
	deleteSelectedGraphCells: function () {
		var pdd = this.pdd ? this.pdd : this;

		//检查mxGraph画板是否正常
		if (!pdd.checkGraph()) return;

		if (!pdd.graph.isEnabled()) return;

		var selectedCells = pdd.graph.getSelectionCells();

		if (pdd.isEmptyArray(selectedCells)) {
			console.log("没有选中的画板的元件");

			return;
		}

		pdd.graph.removeCells(selectedCells, false);
	},
	/**
	 * @description 刷新撤销重置按钮
	 */
	refreshUndoRedo: function () {
		if (this.isEmpty(this.undoManager)) {
			console.error("获取画板撤销管理器失败");
			return;
		}

		if (this.isEmpty(this.divUndo)) {
			console.error("获取画板撤销按钮失败");
			return;
		}

		if (this.isEmpty(this.divRedo)) {
			console.error("获取画板重置按钮失败");
			return;
		}

		if (this.undoManager.canUndo()) {
			this.divUndo.setAttribute("class", this.CONST_CSSSTYLE_BUTTON);
		} else {
			this.divUndo.setAttribute("class", this.CONST_CSSSTYLE_BUTTONDISABLED);
		}

		if (this.undoManager.canRedo()) {
			this.divRedo.setAttribute("class", this.CONST_CSSSTYLE_BUTTON);
		} else {
			this.divRedo.setAttribute("class", this.CONST_CSSSTYLE_BUTTONDISABLED);
		}
	},
	/**
	 * @description 刷新复制粘贴按钮
	 */
	refreshCopyCutPaste: function () {
		if (this.isEmpty(this.divCopy)) {
			console.error("获取画板复制按钮失败");
			return;
		}

		if (this.isEmpty(this.divPaste)) {
			console.error("获取画板粘贴按钮失败");
			return;
		}

		if (!this.checkGraph()) return;

		var selectedCells = this.graph.getSelectionCells();

		if (this.isEmptyArray(selectedCells)) {
			this.divCopy.setAttribute("class", this.CONST_CSSSTYLE_BUTTONDISABLED);
			this.divCut.setAttribute("class", this.CONST_CSSSTYLE_BUTTONDISABLED);
		} else {
			this.divCopy.setAttribute("class", this.CONST_CSSSTYLE_BUTTON);
			this.divCut.setAttribute("class", this.CONST_CSSSTYLE_BUTTON);
		}

		if (this.isClipboardEmpty()) {
			this.divPaste.setAttribute("class", this.CONST_CSSSTYLE_BUTTONDISABLED);
		} else {
			this.divPaste.setAttribute("class", this.CONST_CSSSTYLE_BUTTON);
		}
	},
	/**
	 * @description 撤销画板元件变更
	 */
	undo: function () {
		var pdd = this.pdd ? this.pdd : this;

		//检查mxGraph画板是否正常
		if (!pdd.checkGraph()) return;

		if (!pdd.graph.isEnabled()) return;

		pdd.undoManager.undo();

		pdd.refreshUndoRedo();
	},
	/**
	 * @description 重置画板元件变更
	 */
	redo: function () {
		var pdd = this.pdd ? this.pdd : this;

		//检查mxGraph画板是否正常
		if (!pdd.checkGraph()) return;

		if (!pdd.graph.isEnabled()) return;

		pdd.undoManager.redo();

		pdd.refreshUndoRedo();
	},
	/**
	 * @description 复制画板元件
	 */
	copy: function () {
		var pdd = this.pdd ? this.pdd : this;

		//检查mxGraph画板是否正常
		if (!pdd.checkGraph()) return;

		if (!pdd.graph.isEnabled()) return;

		pdd.copyClipboard();

		pdd.refreshCopyCutPaste();
	},
	/**
	 * @description 剪贴画板元件
	 */
	cut: function () {
		var pdd = this.pdd ? this.pdd : this;

		//检查mxGraph画板是否正常
		if (!pdd.checkGraph()) return;

		if (!pdd.graph.isEnabled()) return;

		pdd.cutClipboard();

		pdd.refreshCopyCutPaste();
	},
	/**
	 * @description 粘贴画板元件
	 */
	paste: function () {
		var pdd = this.pdd ? this.pdd : this;

		//检查mxGraph画板是否正常
		if (!pdd.checkGraph()) return;

		if (!pdd.graph.isEnabled()) return;

		pdd.pasteClipboard();

		pdd.refreshCopyCutPaste();
	},
	/**
	 * @description 选中所有画板元件
	 */
	selectAllGraphCells: function () {
		var pdd = this.pdd ? this.pdd : this;

		//检查mxGraph画板是否正常
		if (!pdd.checkGraph()) return;

		pdd.graph.selectAll(pdd.graphParent, true);
	},
	/**
	 * @description 选中的画板元件移动
	 * @param keyCode 按键码
	 */
	selectedGraphCellsMove: function (keyCode) {
		//检查mxGraph画板是否正常
		if (!this.checkGraph()) return;

		if (this.graph.isSelectionEmpty()) {
			console.log("没有选中的画板的元件");

			return;
		}

		if (!this.graph.isEnabled()) return;

		var selectedCells = this.graph.getSelectionCells();

		if (this.isEmptyArray(selectedCells)) {
			console.log("没有选中的画板的元件");

			return;
		}

		var selectedVertexes = new Array();

		var selectedCellsLength = selectedCells.length;

		for (var index = 0; index < selectedCellsLength; index++) {
			var selectedCell = selectedCells[index];

			if (this.isEmpty(selectedCell)) continue;

			if (selectedCell.isEdge()) continue;

			selectedVertexes.push(selectedCell);
		}

		if (this.isEmptyArray(selectedVertexes)) {
			console.log("没有选中的画板的图形元件");

			return;
		}

		var dx = 0;
		var dy = 0;

		if (keyCode == 37) {
			//左
			dx = this.CONST_GRAPHCELL_MOVESTEP * -1;
		} else if (keyCode == 38) {
			//上
			dy = this.CONST_GRAPHCELL_MOVESTEP * -1;
		} else if (keyCode == 39) {
			//右
			dx = this.CONST_GRAPHCELL_MOVESTEP;
		} else if (keyCode == 40) {
			//下
			dy = this.CONST_GRAPHCELL_MOVESTEP;
		}

		this.graph.moveCells(selectedVertexes, dx, dy);

		if (keyCode == 37) {
			//左
			this.triggerFlatButtonHover(this.divMoveLeft, this.CONST_HOVERTIMEOUT);
		} else if (keyCode == 38) {
			//上
			this.triggerFlatButtonHover(this.divMoveUp, this.CONST_HOVERTIMEOUT);
		} else if (keyCode == 39) {
			//右
			this.triggerFlatButtonHover(this.divMoveRight, this.CONST_HOVERTIMEOUT);
		} else if (keyCode == 40) {
			//下
			this.triggerFlatButtonHover(this.divMoveDown, this.CONST_HOVERTIMEOUT);
		}
	},
	/**
	 * @description 选中指针工具箱元件
	 */
	selectToolBoxCellPointer: function () {
		if (this.isEmpty(this.divToolBox)) {
			console.error("未创建工具箱");

			return;
		}

		if (this.isEmpty(this.toolBoxCells)) {
			this.toolbBxCells = new Array();
		}

		if (this.isEmpty(this.divToolBoxCellPointer)) {
			console.log("未创建工具箱元件 - 指针");

			return;
		} else {
			this.setSelectedFlatButtonGroupChild([this.divToolBoxCellPointer], this.toolBoxCells);

			this.divToolBoxSelectedCell = this.divToolBoxCellPointer;
		}
	},
	/**
	 * @description 设置选中的浮动按钮组子项
	 * @param selectedCells 选中的浮动按钮组子项
	 * @param cells 浮动按钮组子项集合
	 */
	setSelectedFlatButtonGroupChild: function (selectedCells, cells) {
		if (this.isEmptyArray(selectedCells)) {
			console.error("参数选中的浮动按钮组子项为空");

			return;
		}

		if (this.isEmptyArray(cells)) {
			console.error("参数浮动按钮组子项集合为空");

			return;
		}

		var selectedCellsLength = selectedCells.length;

		var selectedCellsIDArray = new Array();

		for (var index = 0; index < selectedCellsLength; index++) {
			var selectedCell = selectedCells[index];

			if (this.isEmpty(selectedCell)) continue;

			var selectedCellID = selectedCell.id;

			if (this.isEmptyString(selectedCellID)) {
				console.error({ msg: "参数选中的浮动按钮组子项ID为空", param: selectedCell });

				return;
			}

			if (selectedCellsIDArray.indexOf(selectedCellID) < 0) selectedCellsIDArray.push(selectedCellID);
		}

		if (this.isEmptyArray(selectedCellsIDArray)) return;

		var cellsLength = cells.length;

		for (var index = 0; index < cellsLength; index++) {
			var tmpCell = cells[index];

			if (this.isEmpty(tmpCell)) {
				console.error({ msg: "浮动按钮组子项第" + index + "项未空", param: cells });

				continue;
			}

			var tmpCellID = tmpCell.id;

			if (this.isEmptyString(tmpCellID)) {
				console.error({ msg: "浮动按钮组子项第" + index + "项的ID为空", param: cells });

				continue;
			}

			if (selectedCellsIDArray.indexOf(tmpCellID) >= 0) {
				tmpCell.setAttribute("class", "pddButton pddButtonSelected");
			} else {
				tmpCell.setAttribute("class", this.CONST_CSSSTYLE_BUTTON);
			}
		}
	},
	/**
	 * @description 创建画板元件
	 * @param sender 发送对象
	 * @param evt 事件
	 */
	createGraphCell: function (sender, evt) {
		if (this.isEmpty(sender) || this.isEmpty(evt)) {
			console.error({ msg: "参数发送对象和参数事件变量无效", param: [sender, evt] });

			return;
		}

		var evtEvent = evt.getProperty("event");

		if (this.isEmpty(evtEvent)) {
			console.error({ msg: "获取点击事件对象失败", param: evt });

			return;
		}

		var offsetX = evtEvent.offsetX ? evtEvent.offsetX : 0;
		var offsetY = evtEvent.offsetY ? evtEvent.offsetY : 0;

		var layerX = evtEvent.layerX ? evtEvent.layerX : 0;
		var layerY = evtEvent.layerY ? evtEvent.layerY : 0;

		var evtX = offsetX;
		var evtY = offsetY;

		//如果点中画板元件则不执行
		var evtCell = evt.getProperty("cell");

		//检查mxGraph画板是否正常
		if (!this.checkGraph()) return;

		var parentVertex = this.graphParent;

		if (!this.isEmpty(evtCell)) {
			if (evtCell.isVertex()) {
				//获取画板元件类型属性
				var evtCellType = this.getCellAttribute(evtCell, this.CONST_ATTRIBUTE_GRAPHCELLTYPE);

				if (!this.isEmptyString(evtCellType)) {
					if (this.CONST_CANVASTYPE_SWIMLANE == evtCellType) {
						var evtCellGeometry = evtCell.getGeometry();

						if (this.isEmpty(evtCellGeometry)) {
							console.error({ msg: "获取选中的画板元件的几何属性为空", param: evtCell });
						} else {

							var evtCellX = evtCellGeometry.x;

							var evtCellY = evtCellGeometry.y;

							if (this.isEmpty(evtCellX) || this.isEmpty(evtCellY)) {
								console.error({ msg: "获取选中的画板元件的集合属性中的X，Y坐标为空", param: evtCellGeometry });
							} else {
								if ((!this.isNumber(evtCellX)) || (!this.isNumber(evtCellY)) || evtCellX <= 0 || evtCellY <= 0) {
									console.error({ msg: "获取选中的画板元件的集合属性中的X，Y坐标不是有效的数字", param: evtCellGeometry });
								} else {
									evtX = layerX - evtCellX;

									evtY = layerY - evtCellY;

									parentVertex = evtCell;
								}
							}
						}
					}
				}
			}
		}

		if (this.isEmpty(this.divToolBoxSelectedCell)) {
			console.log("没有选中的工具箱元件");

			return;
		}

		//获取浮动按钮的ID属性
		var id = this.divToolBoxSelectedCell.getAttribute(this.CONST_ATTRIBUTE_FLATBUTTONID);

		//获取浮动按钮的节点ID属性
		var nodeID = this.divToolBoxSelectedCell.getAttribute(this.CONST_ATTRIBUTE_FLATBUTTONNODEID);

		//获取浮动按钮的提示属性
		var tips = this.divToolBoxSelectedCell.getAttribute(this.CONST_ATTRIBUTE_FLATBUTTONTIPS);

		//获取画板元件的工具箱图标类型属性
		var type = this.divToolBoxSelectedCell.getAttribute(this.CONST_ATTRIBUTE_FLATBUTTONTYPE);

		//获取浮动按钮的属性配置表单属性
		var propForm = this.divToolBoxSelectedCell.getAttribute(this.CONST_ATTRIBUTE_FLATBUTTONPROPFORM);

		//获取画板元件的工具箱填充颜色属性
		var fillColor = this.divToolBoxSelectedCell.getAttribute(this.CONST_ATTRIBUTE_FLATBUTTONCANVASFILLCOLOR);

		//获取画板元件的工具箱字体颜色属性
		var fontColor = this.divToolBoxSelectedCell.getAttribute(this.CONST_ATTRIBUTE_FLATBUTTONCANVASFONTCOLOR);

		//获取画板元件的工具箱图片属性
		var image = this.divToolBoxSelectedCell.getAttribute(this.CONST_ATTRIBUTE_FLATBUTTONIMAGE);

		if (this.isEmptyString(id)) {
			console.error({ msg: "工具箱元件的" + this.CONST_ATTRIBUTE_FLATBUTTONID + "属性值为空", param: this.divToolBoxSelectedCell });

			return;
		}

		if (this.isEmptyString(nodeID)) {
			console.error({ msg: "工具箱元件的" + this.CONST_ATTRIBUTE_FLATBUTTONNODEID + "属性值为空", param: this.divToolBoxSelectedCell });

			return;
		}

		if (this.isEmptyString(tips)) {
			console.error({ msg: "工具箱元件的" + this.CONST_ATTRIBUTE_FLATBUTTONTIPS + "属性值为空", param: this.divToolBoxSelectedCell });

			return;
		}

		if (this.isEmptyString(type)) {
			console.error({ msg: "工具箱元件的" + this.CONST_ATTRIBUTE_FLATBUTTONTYPE + "属性值为空", param: this.divToolBoxSelectedCell });

			return;
		}

		//如果工具箱元件类型为指针则跳过
		if (this.CONST_CANVASTYPE_POINTER == type) {
			return;
		}

		var newMGVertexWidth = this.CONST_VERTEX_WIDTH;
		var newMGVertexHeight = this.CONST_VERTEX_HEIGHT;

		if (this.CONST_CANVASTYPE_ROUNDRECT == type) {
			newMGVertexWidth = this.CONST_VERTEX_ROUNDRECT_WIDTH;
			newMGVertexHeight = this.CONST_VERTEX_ROUNDRECT_HEIGHT;
		} else if (this.CONST_CANVASTYPE_CIRCULAR == type) {
			newMGVertexWidth = this.CONST_VERTEX_CIRCULAR_WIDTH;
			newMGVertexHeight = this.CONST_VERTEX_CIRCULAR_HEIGHT;
		} else if (this.CONST_CANVASTYPE_RECT == type) {
			newMGVertexWidth = this.CONST_VERTEX_RECT_WIDTH;
			newMGVertexHeight = this.CONST_VERTEX_RECT_HEIGHT;
		} else if (this.CONST_CANVASTYPE_RHOMBUS == type) {
			newMGVertexWidth = this.CONST_VERTEX_RHOMBUS_WIDTH;
			newMGVertexHeight = this.CONST_VERTEX_RHOMBUS_HEIGHT;
		} else if (this.CONST_CANVASTYPE_TRIANGLE == type) {
			newMGVertexWidth = this.CONST_VERTEX_TRIANGLE_WIDTH;
			newMGVertexHeight = this.CONST_VERTEX_TRIANGLE_HEIGHT;
		} else if (this.CONST_CANVASTYPE_CYLINDER == type) {
			newMGVertexWidth = this.CONST_VERTEX_CYLINDER_WIDTH;
			newMGVertexHeight = this.CONST_VERTEX_CYLINDER_HEIGHT;
		} else if (this.CONST_CANVASTYPE_ACTOR == type) {
			newMGVertexWidth = this.CONST_VERTEX_ACTOR_WIDTH;
			newMGVertexHeight = this.CONST_VERTEX_ACTOR_HEIGHT;
		} else if (this.CONST_CANVASTYPE_SWIMLANE == type) {
			newMGVertexWidth = this.CONST_VERTEX_SWIMLANE_WIDTH;
			newMGVertexHeight = this.CONST_VERTEX_SWIMLANE_HEIGHT;
		} else if (this.CONST_CANVASTYPE_CUSTOM == type) {
			newMGVertexWidth = this.CONST_VERTEX_CUSTOM_WIDTH;
			newMGVertexHeight = this.CONST_VERTEX_CUSTOM_HEIGHT;
		}

		//获取鼠标的X，Y坐标
		var x = evtX + this.CONST_GRAPH_MARGIN < newMGVertexWidth / 2 ? this.CONST_GRAPH_MARGIN : evtX - (newMGVertexWidth / 2);
		var y = evtY + this.CONST_GRAPH_MARGIN < newMGVertexHeight / 2 ? this.CONST_GRAPH_MARGIN : evtY - (newMGVertexHeight / 2);

		this.graphModel.beginUpdate();

		try {
			newMGVertex = this.graph.insertVertex(parentVertex, null, tips, x, y, newMGVertexWidth, newMGVertexHeight, this.CONST_PREFIX_VERTEX_STYLE + nodeID);

			if (this.isEmpty(newMGVertex)) {
				console.error({ msg: "创建画板元件失败", param: this.divToolBoxSelectedCell });

				return;
			}

			newMGVertex[this.CONST_ATTRIBUTE_DESIGNERID] = this.designerID;

			//设置新画板元件的属性
			//获取画板元件mxCellID
			var newMGVertexID = newMGVertex.getId();

			if (this.isEmpty(newMGVertexID)) {
				console.error({ msg: "获取创建的画板元件的ID失败", param: newMGVertex });

				return;
			} else {
				//设计器ID=工具栏元件ID+画板元件mxCellID
				var mgID = id + newMGVertexID;

				this.setGraphCellAttribute(newMGVertex, this.CONST_ATTRIBUTE_GRAPHCELLMGID, mgID.toString());
				this.setGraphCellAttribute(newMGVertex, this.CONST_ATTRIBUTE_GRAPHCELLTYPE, type);
				this.setGraphCellAttribute(newMGVertex, this.CONST_ATTRIBUTE_GRAPHCELLNODETYPE, tips);
				this.setGraphCellAttribute(newMGVertex, this.CONST_ATTRIBUTE_GRAPHCELLNODEID, nodeID.toString());
				this.setGraphCellAttribute(newMGVertex, this.CONST_ATTRIBUTE_GRAPHCELLPROPFORM, propForm);
				this.setGraphCellAttribute(newMGVertex, this.CONST_ATTRIBUTE_GRAPHCELLCANVASFILLCOLOR, this.isEmptyString(fillColor) ? "" : fillColor);
				this.setGraphCellAttribute(newMGVertex, this.CONST_ATTRIBUTE_GRAPHCELLCANVASFONTCOLOR, this.isEmptyString(fontColor) ? "" : fontColor);
				this.setGraphCellAttribute(newMGVertex, this.CONST_ATTRIBUTE_GRAPHCELLIMAGE, this.isEmptyString(image) ? "" : image);

				//选中新建的画板元件
				this.graph.setSelectionCell(newMGVertex);
			}
		} finally {
			this.graphModel.endUpdate();
		}

		//恢复成选中指针工具箱元件
		this.selectToolBoxCellPointer();
	},
	/**
	 * @description 在画板中鼠标点击
	 * @param sender 发送对象
	 * @param evt 事件
	 */
	clickGraph: function (sender, evt) {
		if (this.isEmpty(sender) || this.isEmpty(evt)) {
			console.error({ msg: "参数发送对象和参数事件变量无效", param: [sender, evt] });

			return;
		}

		//根据选中的工具箱元件创建画板元件
		this.createGraphCell(sender, evt);
	},
	/**
	 * @description 画板键击Escape后
	 * @param sender 发送对象
	 * @param evt 事件
	 */
	graphKeyEscape: function (sender, evt) {
		if (this.isEmpty(sender) || this.isEmpty(evt)) {
			console.error({ msg: "参数发送对象和参数事件变量无效", param: [sender, evt] });

			return;
		}

		//恢复选中指针工具箱元件
		this.selectToolBoxCellPointer();
	},
	/**
	 * @description 画板内容变动后
	 * @param sender 发送对象
	 * @param evt 事件
	 */
	graphChange: function (sender, evt) {
		if (this.isEmpty(sender) || this.isEmpty(evt)) {
			console.error({ msg: "参数发送对象和参数事件变量无效", param: [sender, evt] });

			return;
		}

		var root = sender.root;

		if (this.isEmpty(root)) {
			console.error({ msg: "获取发送对象的根项为空", param: sender });

			return;
		}

		//检查mxGraph画板是否正常
		if (!this.checkGraph()) return;

		var evtEdit = evt.getProperty("edit");

		var evtEditChanges = this.isEmpty(evtEdit) ? null : evtEdit.changes;

		//动画展示画板内容变动
		if (this.CONST_GRAPH_ANIMATION && (!this.isEmpty(evtEditChanges))) mxEffects.animateChanges(this.graph, evtEditChanges);

		//如果是元件或连接线移动，或新增连接线，则根据连接线来源和目标调整连接线的显示样式
		if (!this.isEmptyArray(evtEditChanges)) {
			var evtEditChangesLength = evtEditChanges.length;

			for (var index = 0; index < evtEditChangesLength; index++) {
				var evtEditChange = evtEditChanges[index];

				if (this.isEmpty(evtEditChange)) continue;

				//修改的画板元件
				var changeCell = evtEditChange.cell;

				//修改的画板子项
				var changeChild = evtEditChange.child;

				//画板元件修改之前的状态
				var changePrevious = evtEditChange.previous;

				var cellID = "";

				if (this.isEmpty(changeChild) && (!this.isEmpty(changeCell))) {
					//修改元件
					cellID = changeCell.getId();

					if (this.isEmptyString(cellID)) continue;

				} else if (this.isEmpty(changeCell) && (!this.isEmpty(changeChild) && this.isEmpty(changePrevious))) {
					//新增元件
					changeChild[this.CONST_ATTRIBUTE_DESIGNERID] = this.designerID;

					cellID = changeChild.getId();

					if (this.isEmptyString(cellID)) continue;

					//设置新建元件的透明度
					var cellOpacity = this.getCellAttribute(changeChild, this.CONST_ATTRIBUTE_GRAPHCELLOPACITY);

					if (this.isEmptyString(cellOpacity)) cellOpacity = this.CONST_GRAPHCELL_OPACITY;

					cellOpacity = Number(cellOpacity);

					if (!this.isNumber(cellOpacity)) cellOpacity = this.CONST_GRAPHCELL_OPACITY;

					if (cellOpacity < 0) cellOpacity = 0;

					if (cellOpacity < 100) {
						var cellState = this.graphView.getState(changeChild);

						var cellShape = this.isEmpty(cellState) ? null : cellState.shape;

						var cellNode = this.isEmpty(cellShape) ? null : cellShape.node;

						if (!this.isEmpty(cellNode)) {
							mxUtils.setOpacity(cellNode, cellOpacity);
						}
					}
				} else if (!(this.isEmpty(changeChild) || this.isEmpty(changePrevious))) {
					//删除元件
					cellID = changeChild.getId();

					if (this.isEmptyString(cellID)) continue;

					if (changeChild.isVertex()) {
						//删除元件关联的连接线
					}
				}

				var evtEditChangeConstructorName = this.isEmpty(evtEditChange.constructor) ? null : evtEditChange.constructor.name;

				if (!this.isEmptyString(evtEditChangeConstructorName)) {
					if (mxStyleChange.name == evtEditChangeConstructorName) {
						//刷新连接线样式选中状态
						this.refreshConnectorStyle();
					}
				}
			}
		}

		if (!this.graph.isImporting) {

			//任何改动都实时传递给设计器控件
			var xml = "";

			if (this.graphParent.getChildCount() > 0) {
				xml = this.getXML();
			}

			if (this.isEmptyString(xml)) xml = "";

			if (this.isEmpty(this.designer)) {
				console.error("获取设计器失败");
			} else {
				this.designer.invoke(this.CONST_RESPONSE_UPDATEXML, xml);
			}
		}
	},
	/**
	 * @description 画板元件选中后
	 * @param sender 发送对象
	 * @param evt 事件
	 */
	graphCellSelected: function (sender, evt) {
		if (this.isEmpty(sender) || this.isEmpty(evt)) {
			console.error({ msg: "参数发送对象和参数事件变量无效", param: [sender, evt] });

			return;
		}

		if (this.isEmpty(this.graph)) return;

		//检查mxGraph画板是否正常
		if (!this.checkGraph()) return;

		//检查连接线样式浮动按钮组是否正常
		if (!this.checkConnectorStyle()) return;

		this.refreshCopyCutPaste();

		var cells = sender.cells;

		if (this.isEmptyArray(cells)) {
			//隐藏连接线样式浮动按钮组
			this.switchFlatButtonGroup(this.divConnectorStyle, false);

			//隐藏透明度浮动按钮组
			this.switchFlatButtonGroup(this.divOpacity, false);

			console.error({ msg: "获取选中的画板元件数组为空", param: sender });

			if (this.isEmpty(this.designer)) {
				console.error("获取设计器失败");

				return;
			}

			//如果未选择画板元件
			this.designer.invoke(this.CONST_RESPONSE_SELECTEDNONE, 0);

			return;
		}

		var cellsLength = cells.length;

		var existsEdge = false;

		for (var index = 0; index < cellsLength; index++) {
			var cell = cells[index];

			if (this.isEmpty(cell)) {
				console.error({ msg: "获取选中的首个画板元件为空", param: cells });

				return;
			}

			if (this.isEmptyString(cell[this.CONST_ATTRIBUTE_DESIGNERID])) cell[this.CONST_ATTRIBUTE_DESIGNERID] = this.designerID;

			//如果是选中了连接线，则显示该连接线的样式
			if (cell.isEdge()) {
				existsEdge = true;
			}
		}

		if (existsEdge) {
			//显示连接线样式浮动按钮组
			this.switchFlatButtonGroup(this.divConnectorStyle, true);

			//设置连接线样式选中状态
			this.refreshConnectorStyle();
		} else {
			//隐藏连接线样式浮动按钮组
			this.switchFlatButtonGroup(this.divConnectorStyle, false);
		}

		//显示透明度浮动按钮组
		this.switchFlatButtonGroup(this.divOpacity, true);

		this.divOpacityValue.innerHTML = "-";

		if (cellsLength == 1) {
			//如果只选中一个画板元件，则将该画板元件信息传给设计器
			var cell = cells[0];

			if (this.isEmpty(cell)) {
				console.error({ msg: "获取选中的首个画板元件为空", param: cells });

				return;
			}

			//获取元件透明度属性
			var cellOpacity = this.getCellAttribute(cell, this.CONST_ATTRIBUTE_GRAPHCELLOPACITY);

			if (this.isEmptyString(cellOpacity)) cellOpacity = this.CONST_GRAPHCELL_OPACITY;

			cellOpacity = Number(cellOpacity);

			if (!this.isNumber(cellOpacity)) cellOpacity = this.CONST_GRAPHCELL_OPACITY;

			this.divOpacityValue.innerHTML = 100 - cellOpacity < 0 ? "0%" : 100 - cellOpacity > 100 ? "100%" : (100 - cellOpacity).toString() + "%";

			this.refreshOpacity(cellOpacity);

			var cellAttributes = this.checkGraphCellAttributes(cell);

			if (this.isEmpty(this.designer)) {
				console.error("获取设计器失败");

				return;
			} else {
				this.designer.invoke(this.CONST_RESPONSE_UPDATEPROP, cellAttributes);
			}
		} else {
			if (this.isEmpty(this.designer)) {
				console.error("获取设计器失败");

				return;
			} else {
				//如果选择了多个画板元件
				this.designer.invoke(this.CONST_RESPONSE_UPDATEPROPS, cellsLength);
			}
		}
	},
	/**
	 * @description 设置画板元件属性
	 * @param cell 画板元件
	 * @param attrKey 画板元件属性主键
	 * @param attrValue 画板元件属性值
	 */
	setGraphCellAttribute: function (cell, attrKey, attrValue) {
		if (this.isEmpty(cell)) {
			console.error("参数画板元件为空");

			return;
		}

		var cellID = cell.id;

		if (this.isEmptyString(cellID)) {
			console.error({ msg: "获取画板元件的ID为空", param: cell });

			return;
		}

		if (this.isEmpty(this.graphModel)) {
			console.error("获取画板模型失败");

			return;
		}

		if (this.isEmptyString(attrKey)) {
			console.error("参数画板元件属性主键为空");

			return;
		}

		this.checkGraphCellAttributes(cell);

		if (this.isEmptyString(attrValue)) attrValue = "";

		cell[attrKey] = attrValue;

		//如果是元件标签变更则调用mxGraphModel的修改元件标签方法
		if (attrKey == this.CONST_ATTRIBUTE_GRAPHCELLNAME) {
			this.graphModel.setValue(cell, attrValue);
		}
	},
	/**
	 * @descrition 设置画板元件属性
	 * @param attrs 画板元件属性数组
	 */
	setGraphCellAttributes: function (attrs) {
		if (this.isEmpty(this.graphModel)) {
			console.error("获取画板模型失败");

			return;
		}

		if (this.isEmptyArray(attrs)) {
			console.error("参数画板元件属性数组为空");

			return;
		}

		if (!this.checkGraph()) return;

		var attrsLength = attrs.length;

		for (var index = 0; index < attrsLength; index++) {
			var attr = attrs[index];

			if (this.isEmpty(attr)) {
				console.error({ msg: "参数画板元件属性第" + index + "项为空或不是obj类型", param: attrs });

				continue;
			}

			if (!attr.hasOwnProperty(this.CONST_ATTRIBUTE_GRAPHCELLID)) {
				console.error({ msg: "参数画板元件属性第" + index + "项没有定义" + this.CONST_ATTRIBUTE_GRAPHCELLID + "属性", param: attr });

				return;
			}

			var id = attr[this.CONST_ATTRIBUTE_GRAPHCELLID];

			if (this.isEmptyString(id)) {
				console.error({ msg: "参数画板元件属性第" + index + "项的" + this.CONST_ATTRIBUTE_GRAPHCELLID + "属性值为空", param: attr });

				continue;
			}

			var cell = this.graphModel.getCell(id);

			if (this.isEmpty(cell)) {
				console.error({ msg: "根据ID=" + id + "获取画板元件失败", param: id });

				continue;
			}

			this.checkGraphCellAttributes(cell);

			//将参数画板元件属性中新的属性增加到元件属性
			var attrKeys = Object.keys(attr);

			if (this.isEmptyArray(attrKeys)) {
				console.error({ msg: "获取的画板元件属性第" + index + "项没有定义键值", param: attr });

				continue;
			}

			var attrKeysLength = attrKeys.length;

			for (var aIndex = 0; aIndex < attrKeysLength; aIndex++) {
				var attrKey = attrKeys[aIndex];

				if (this.isEmptyString(attrKey)) {
					console.error({ msg: "获取的画板元件属性第" + index + "项的第" + aIndex + "项属性为空", param: attrKeys });

					continue;
				}

				var attrValue = attr[attrKey];

				if (this.isEmptyString(attrValue)) {
					console.error({ msg: "获取的画板元件属性第" + index + "项的第" + aIndex + "项属性" + attrKey + "的值为空", param: attr });

					continue;
				}

				//如果是元件标签变更则调用mxGraphModel的修改元件标签方法
				if (attrKey == this.CONST_ATTRIBUTE_GRAPHCELLNAME) {
					this.graphModel.setValue(cell, attrValue);
				}

				cell[attrKey] = attrValue;
			}
		}
	},
	/**
	 * @description 检查画板元件属性
	 * @param cell 画板元件
	 * @return Object 画板元件所有属性
	 */
	checkGraphCellAttributes: function (cell) {
		if (this.isEmpty(cell)) {
			console.error("参数画板元件为空");

			return;
		}

		var cellID = cell.getId();

		if (this.isEmptyString(cellID)) {
			console.error({ msg: "获取画板元件的ID为空", param: cell });

			return;
		}

		var attr = new Object();

		//元件ID属性
		cell[this.CONST_ATTRIBUTE_GRAPHCELLID] = cellID;
		attr[this.CONST_ATTRIBUTE_GRAPHCELLID] = cellID;

		//类型属性，节点类型属性
		var cellType = cell[this.CONST_ATTRIBUTE_GRAPHCELLTYPE];
		var cellNodeType = cell[this.CONST_ATTRIBUTE_GRAPHCELLNODETYPE];
		var cellConnectorStyle = cell[this.CONST_ATTRIBUTE_GRAPHCELLCONNECTORSTYLE];

		if (cell.isEdge(cell)) {
			if (this.isEmptyString(cellType)) {
				cell[this.CONST_ATTRIBUTE_GRAPHCELLTYPE] = this.CONST_CANVASTYPE_CONNECTOR;
				attr[this.CONST_ATTRIBUTE_GRAPHCELLTYPE] = this.CONST_CANVASTYPE_CONNECTOR;
			} else {
				attr[this.CONST_ATTRIBUTE_GRAPHCELLTYPE] = cellType;
			}

			if (this.isEmptyString(cellNodeType)) {
				cell[this.CONST_ATTRIBUTE_GRAPHCELLNODETYPE] = this.CONST_GRAPHCELLNODETYPE_CONNECTOR;
				attr[this.CONST_ATTRIBUTE_GRAPHCELLNODETYPE] = this.CONST_GRAPHCELLNODETYPE_CONNECTOR;
			} else {
				attr[this.CONST_ATTRIBUTE_GRAPHCELLNODETYPE] = cellNodeType;
			}

			if (this.isEmptyString(cellConnectorStyle)) {
				cell[this.CONST_ATTRIBUTE_GRAPHCELLCONNECTORSTYLE] = this.CONST_EDGE_STYLE_AUTO;
				attr[this.CONST_ATTRIBUTE_GRAPHCELLCONNECTORSTYLE] = this.CONST_EDGE_STYLE_AUTO;
			} else {
				attr[this.CONST_ATTRIBUTE_GRAPHCELLCONNECTORSTYLE] = cellConnectorStyle;
			}
		} else if (cell.isVertex(cell)) {
			if (this.isEmptyString(cellType)) {
				cell[this.CONST_ATTRIBUTE_GRAPHCELLTYPE] = this.CONST_CANVASTYPE_RECT;
				attr[this.CONST_ATTRIBUTE_GRAPHCELLTYPE] = this.CONST_CANVASTYPE_RECT;
			} else {
				attr[this.CONST_ATTRIBUTE_GRAPHCELLTYPE] = cellType;
			}

			if (this.isEmptyString(cellNodeType)) {
				cell[this.CONST_ATTRIBUTE_GRAPHCELLNODETYPE] = this.CONST_GRAPHCELLNODETYPE_NONE;
				attr[this.CONST_ATTRIBUTE_GRAPHCELLNODETYPE] = this.CONST_GRAPHCELLNODETYPE_NONE;
			} else {
				attr[this.CONST_ATTRIBUTE_GRAPHCELLNODETYPE] = cellNodeType;
			}
		}

		//名称属性
		var cellValue = cell.getValue();

		cell[this.CONST_ATTRIBUTE_GRAPHCELLNAME] = this.isEmptyString(cellValue) ? "" : cellValue;
		attr[this.CONST_ATTRIBUTE_GRAPHCELLNAME] = this.isEmptyString(cellValue) ? "" : cellValue;

		//透明度属性
		var cellOpacity = cell[this.CONST_ATTRIBUTE_GRAPHCELLOPACITY];
		if (this.isEmptyString(cellOpacity)) {
			cell[this.CONST_ATTRIBUTE_GRAPHCELLOPACITY] = this.CONST_GRAPHCELL_OPACITY.toString();
			attr[this.CONST_ATTRIBUTE_GRAPHCELLOPACITY] = this.CONST_GRAPHCELL_OPACITY.toString();
		} else {
			attr[this.CONST_ATTRIBUTE_GRAPHCELLOPACITY] = cellOpacity;
		}

		return attr;
	},
	/**
	 * @description 获取画板元件属性
	 * @param cell 画板元件
	 * @param attrKey 画板元件属性
	 * @return string 画板元件属性值
	 */
	getCellAttribute: function (cell, attrKey) {
		if (this.isEmpty(cell)) {
			console.error("参数画板元件为空");

			return;
		}

		var cellID = cell.id;

		if (this.isEmptyString(cellID)) {
			console.error({ msg: "获取画板元件的ID为空", param: cell });

			return;
		}

		if (this.isEmptyString(attrKey)) {
			console.error("参数画板元件属性为空");

			return;
		}

		//检查画板元件属性
		this.checkGraphCellAttributes(cell);

		var value = cell[attrKey];

		return value;
	},
	/**
	 * @description 移动画板中元件后
	 * @param sender 发送对象
	 * @param evt 事件
	 */
	graphCellsMoved: function (sender, evt) {
		if (this.isEmpty(sender) || this.isEmpty(evt)) {
			console.error({ msg: "参数发送对象和参数事件变量无效", param: [sender, evt] });

			return;
		}

		if (!this.checkGraph()) return;

		var evtTarget = evt.getProperty("target");

		if (evtTarget) {
			console.log({ msg: "有移动目标", param: evtTarget });

			return;
		}

		var evtEvent = evt.getProperty("event");

		if (this.isEmpty(evtEvent)) {
			console.error({ msg: "获取点击事件对象失败", param: evt });

			return;
		}

		var x = evtEvent.clientX;
		var y = evtEvent.clientY;

		var evtCells = evt.getProperty("cells");

		if (this.isEmptyArray(evtCells)) {
			console.error({ msg: "获取画板元件数组失败", param: evt });

			return;
		}

		var evtCellsLength = evtCells.length;

		this.graphModel.beginUpdate();

		for (var index = 0; index < evtCellsLength; index++) {
			var evtCell = evtCells[index];

			if (this.isEmpty(evtCell)) {
				console.error({ msg: "获取画板元件数组第" + index + "项对象为空", param: evtCells });

				continue;
			}

			var evtCellID = evtCell.id;

			if (this.isEmptyString(evtCellID)) {
				console.error({ msg: "获取画板元件的ID为空", param: evtCell });

				continue;
			}

			var evtCellParent = evtCell.getParent();

			if (this.isEmpty(evtCellParent)) {
				console.error({ msg: "获取画板元件的父元件失败", param: evtCell });

				continue;
			}

			var evtCellParentChildren = evtCellParent.children;

			if (this.isEmptyArray(evtCellParentChildren)) {
				console.error({ msg: "获取画板元件的父元件的所有子项元件失败", param: evtCellParent });

				continue;
			}

			var evtCellParentChildrenLength = evtCellParentChildren.length;

			for (var cIndex = 0; cIndex < evtCellParentChildrenLength; cIndex++) {
				var evtCellParentChild = evtCellParentChildren[cIndex];

				if (this.isEmpty(evtCellParentChild)) {
					console.error({ msg: "获取画板元件父元件第" + index + "项子元件为空", param: evtCellParentChildren });

					continue;
				}

				var evtCellParentChildID = evtCellParentChild.id;

				if (this.isEmptyString(evtCellParentChildID)) {
					console.error({ msg: "获取画板元件的ID为空", param: evtCellParentChild });

					continue;
				}

				if (evtCellParentChildID == evtCellID) continue;

				//获取画板元件类型属性
				var evtCellParentChildType = this.getCellAttribute(evtCellParentChild, this.CONST_ATTRIBUTE_GRAPHCELLTYPE);

				if (this.isEmptyString(evtCellParentChildType)) continue;

				//如果元件类型不是泳道则跳过
				if (this.CONST_CANVASTYPE_SWIMLANE != evtCellParentChildType) continue;

				var evtCellParentChildState = this.graphView.getState(evtCellParentChild);

				if (this.isEmpty(evtCellParentChildState)) {
					console.error({ msg: "获取画板元件的状态对象为空", param: evtCellParentChild });

					continue;
				}

				var cp = mxUtils.convertPoint(this.graph.container, x, y);

				if (this.isEmpty(cp)) {
					console.error({ msg: "根据画板以及X，Y坐标获取转换点对象失败", param: [this.graph.container, x, y] });

					continue;
				}

				//如果移动的目标位置在同级的某个元件范围内，则转换成该元件的子元件
				if (mxUtils.contains(evtCellParentChildState, cp.x, cp.y)) {
					var cellIndex = this.graphModel.getChildCount(evtCellParentChild);

					this.graph.cellsAdded([evtCell], evtCellParentChild, cellIndex, null, null, true);
				}
			}
		}

		this.graphModel.endUpdate();
	},
	/**
	 * @description 画板缩放到指定比例
	 * @param scale 缩放比例
	 */
	graphZoomTo: function (scale) {
		if (!this.isNumber(scale)) {
			console.error("参数缩放比例为空或不是有效的数字");

			return;
		}

		if (!this.checkGraph()) return;

		scale = scale <= 0 ? this.CONST_GRAPH_ZOOMSTEP : scale > 2 ? 2 : scale;

		if (this.isEmpty(this.graph)) {
			console.error("获取画板失败");

			return;
		}

		this.graph.zoomTo(scale, true);

		this.updateGraphZoomSize(scale);
	},
	/**
	 * @description 画板放大
	 */
	graphZoomIn: function () {
		if (!this.checkGraph()) return;

		var mgGraphScale = this.isNumber(this.graphView.scale) ? this.graphView.scale <= 0 ? 1 : this.graphView.scale : 1;

		var newScale = Number((mgGraphScale + this.CONST_GRAPH_ZOOMSTEP).toFixed(1)) > 2 ? 2 : Number((mgGraphScale + this.CONST_GRAPH_ZOOMSTEP).toFixed(1));

		this.graph.zoomTo(newScale, true);

		this.updateGraphZoomSize(newScale);
	},
	/**
	 * @description 画板缩小
	 */
	graphZoomOut: function () {
		if (!this.checkGraph()) return;

		var mgGraphScale = this.isNumber(this.graphView.scale) ? this.graphView.scale <= 0 ? 1 : this.graphView.scale : 1;

		var newScale = mgGraphScale <= this.CONST_GRAPH_ZOOMSTEP ? this.CONST_GRAPH_ZOOMSTEP : Number((mgGraphScale - this.CONST_GRAPH_ZOOMSTEP).toFixed(1));

		this.graph.zoomTo(newScale, true);

		this.updateGraphZoomSize(newScale);
	},
	/**
	 * @description 更新画板缩放比例文字
	 * @param scale 缩放比例
	 */
	updateGraphZoomSize: function (scale) {
		if (!this.isNumber(scale)) {
			console.error("参数缩放比例为空或不是有效的数字");

			return;
		}

		if (this.isEmpty(this.divZoomSize)) {
			console.error("获取DIV" + this.CONST_DIVZOOMSIZE + "失败");

			return;
		}

		if (this.isEmpty(this.divZoomIn)) {
			console.error("获取DIV" + this.CONST_DIVZOOMIN + "失败");

			return;
		}

		if (this.isEmpty(this.divZoomOut)) {
			console.error("获取DIV" + this.CONST_DIVZOOMOUT + "失败");

			return;
		}

		this.divZoomSize.innerHTML = (scale * 100) + "%";

		var backgroundImage;

		if (scale <= 0.2) {
			this.divZoomOut.setAttribute("class", this.CONST_CSSSTYLE_BLANK);

			backgroundImage = this.divZoomOut.style.backgroundImage;

			if (!this.isEmptyString(backgroundImage)) {
				this.divZoomOut.setAttribute("background-image", backgroundImage);
				this.divZoomOut.style.backgroundImage = "";
			}

			this.divZoomOut.style.boxShadow = "none";

			this.divZoomOut.onclick = {};

			this.divZoomOut.title = "";
		} else {
			this.divZoomOut.setAttribute("class", this.CONST_CSSSTYLE_BUTTON);

			backgroundImage = this.divZoomOut.getAttribute("background-image")

			if (!this.isEmptyString(backgroundImage)) {
				this.divZoomOut.style.backgroundImage = backgroundImage;
				this.divZoomOut.setAttribute("background-image", "");
			}

			this.divZoomOut.style.boxShadow = "2px 0 4px -1px " + this.CONST_CSS_SHADOWCOLOR;

			this.divZoomOut.onclick = function () {
				//画板缩小
				if (!this.pdd) return;
				this.pdd.graphZoomOut();
			}

			this.divZoomOut.title = "缩小";
		}

		if (scale >= 2) {
			this.divZoomIn.setAttribute("class", this.CONST_CSSSTYLE_BLANK);

			backgroundImage = this.divZoomIn.style.backgroundImage;

			if (!this.isEmptyString(backgroundImage)) {
				this.divZoomIn.setAttribute("background-image", backgroundImage);
				this.divZoomIn.style.backgroundImage = "";
			}

			this.divZoomIn.style.boxShadow = "none";

			this.divZoomIn.onclick = {};

			this.divZoomIn.title = "";
		} else {
			this.divZoomIn.setAttribute("class", this.CONST_CSSSTYLE_BUTTON);

			backgroundImage = this.divZoomIn.getAttribute("background-image")

			if (!this.isEmptyString(backgroundImage)) {
				this.divZoomIn.style.backgroundImage = backgroundImage;
				this.divZoomIn.setAttribute("background-image", "");
			}

			this.divZoomIn.style.boxShadow = "-2px 0 4px -1px " + this.CONST_CSS_SHADOWCOLOR;

			this.divZoomIn.onclick = function () {
				//画板放大
				if (!this.pdd) return;
				this.pdd.graphZoomIn();
			}

			this.divZoomIn.title = "放大";
		}
	},
	/**
	 * @description 创建浮动按钮组
	 * @param id ID
	 * @param width 宽度
	 * @param height 高度
	 * @param direction 方向（默认：横向）
	 * @param scrollButton 滚动按钮（默认：false）
	 * @param maxDisplayChildren 最大显示子项数（默认：-1 不限制）
	 * @param startDisplayIndex 开始显示项位置（默认：-1）
	 * @param endDisplayIndex 结束显示项位置（默认：-1）
	 * @return HTMLElement 按钮组HTML元素
	 */
	createFlatButtonGroup: function (id, width, height, direction, scrollButton, maxDisplayChildren, startDisplayIndex, endDisplayIndex) {
		if (this.isEmptyString(id)) {
			console.error("参数ID为空");

			return;
		}

		var nodeID = id;

		id += this.CONST_SPLITSYMBOL + this.designerID;

		//默认浮动按钮宽度
		if (!this.isNumber(width)) width = -1;

		//默认浮动按钮高度
		if (!this.isNumber(height)) height = -1;

		//默认浮动按钮组方向：横向
		if (this.isEmptyString(direction)) direction = this.CONST_FLATBUTTONGROUP_HORIZONDIRECTION;

		if (direction != this.CONST_FLATBUTTONGROUP_HORIZONDIRECTION && direction != this.CONST_FLATBUTTONGROUP_VERTICALDIRECTION) direction = this.CONST_FLATBUTTONGROUP_HORIZONDIRECTION;

		//默认显示滚动按钮：false
		if (!this.isBoolean(scrollButton)) scrollButton = false;

		//默认最大显示子项数：-1 不限制
		if (!this.isNumber(maxDisplayChildren)) maxDisplayChildren = -1;

		//默认开始显示项位置：-1 不控制
		if (!this.isNumber(startDisplayIndex)) startDisplayIndex = -1;

		//默认结束显示项位置：-1 不控制
		if (!this.isNumber(endDisplayIndex)) endDisplayIndex = -1;

		if (endDisplayIndex < startDisplayIndex) endDisplayIndex = -1;

		var newDIV = document.getElementById(id);

		if (this.isEmpty(newDIV)) newDIV = document.createElement("div");

		if (this.isEmpty(newDIV)) {
			console.error("创建DIV元素" + id + "失败");

			return;
		}

		newDIV.id = id;
		newDIV.style.display = "table";
		newDIV.style.borderRadius = this.CONST_CSS_ROUNDEDCORNERBORDERRADIUS + this.CONST_SIZEUNIT;
		newDIV.style.boxShadow = "0 0 4px 1px " + this.CONST_CSS_SHADOWCOLOR;
		newDIV.style.position = "absolute";
		newDIV.style.backgroundColor = "#ffffff";
		newDIV.style.overflow = "hidden";
		newDIV.style.zIndex = "1";

		if (direction == this.CONST_FLATBUTTONGROUP_HORIZONDIRECTION) {
			if (height > 0) {
				newDIV.style.height = height + this.CONST_SIZEUNIT;
				newDIV.style.minHeight = height + this.CONST_SIZEUNIT;
				newDIV.style.maxHeight = height + this.CONST_SIZEUNIT;
			} else {
				newDIV.style.height = this.CONST_FLATBUTTON_SIZE + this.CONST_SIZEUNIT;
				newDIV.style.minHeight = this.CONST_FLATBUTTON_SIZE + this.CONST_SIZEUNIT;
				newDIV.style.maxHeight = this.CONST_FLATBUTTON_SIZE + this.CONST_SIZEUNIT;
			}
		} else {
			if (width > 0) {
				newDIV.style.width = width + this.CONST_SIZEUNIT;
				newDIV.style.minWidth = width + this.CONST_SIZEUNIT;
				newDIV.style.maxWidth = width + this.CONST_SIZEUNIT;
			} else {
				newDIV.style.width = this.CONST_FLATBUTTON_SIZE + this.CONST_SIZEUNIT;
				newDIV.style.minWidth = this.CONST_FLATBUTTON_SIZE + this.CONST_SIZEUNIT;
				newDIV.style.maxWidth = this.CONST_FLATBUTTON_SIZE + this.CONST_SIZEUNIT;
			}
		}

		newDIV.setAttribute(this.CONST_ATTRIBUTE_DESIGNERID, this.designerID);
		newDIV.setAttribute(this.CONST_ATTRIBUTE_FLATBUTTONNODEID, nodeID);
		newDIV.setAttribute(this.CONST_ATTRIBUTE_FLATBUTTONWIDTH, width);
		newDIV.setAttribute(this.CONST_ATTRIBUTE_FLATBUTTONHEIGHT, height);
		newDIV.setAttribute(this.CONST_ATTRIBUTE_FLATBUTTONGROUPDIRECTION, direction);
		newDIV.setAttribute(this.CONST_ATTRIBUTE_FLATBUTTONGROUPSCROLLBUTTON, scrollButton);
		newDIV.setAttribute(this.CONST_ATTRIBUTE_FLATBUTTONGROUPMAXDISPLAYCHILDREN, maxDisplayChildren);
		newDIV.setAttribute(this.CONST_ATTRIBUTE_FLATBUTTONGROUPSTARTDISPLAYINDEX, startDisplayIndex);
		newDIV.setAttribute(this.CONST_ATTRIBUTE_FLATBUTTONGROUPENDDISPLAYINDEX, endDisplayIndex);
		newDIV.setAttribute(this.CONST_ATTRIBUTE_FLATBUTTONGROUPSCROLLFROMINDEX, 0);
		newDIV.setAttribute(this.CONST_ATTRIBUTE_FLATBUTTONGROUPSCROLLTOINDEX, 0);

		//向上滚动按钮
		var scrollUpID = id + this.CONST_SUFFIX_SCROLLUP;
		var scrollUpShadowID = scrollUpID + this.CONST_SUFFIX_SHADOW;

		var scrollUpOnClickFunc = function () {
			//浮动按钮组滚动
			if (!this.pdd) return;
			var pdd = this.pdd;

			pdd.flatButtonGroupScroll(this, -1);
		};

		var scrollUp = this.createFlatButtonGroupChild(newDIV, scrollUpID, direction == this.CONST_FLATBUTTONGROUP_HORIZONDIRECTION ? this.CONST_CANVASTYPE_SCROLLLEFT : this.CONST_CANVASTYPE_SCROLLUP, "", "", this.CONST_CSSSTYLE_BUTTON, "", this.CONST_CANVASSIZE_8, null, null, null, scrollUpOnClickFunc);

		if (this.isEmpty(scrollUp)) {
			console.error("创建浮动按钮组的向上滚动按钮失败");

			return;
		}

		if (direction == this.CONST_FLATBUTTONGROUP_HORIZONDIRECTION) {
			scrollUp.style.boxShadow = "2px 0 4px -1px " + this.CONST_CSS_SHADOWCOLOR;
			scrollUp.style.borderRadius = this.CONST_CSS_ROUNDEDCORNERBORDERRADIUS + this.CONST_SIZEUNIT + " 0 0 " + this.CONST_CSS_ROUNDEDCORNERBORDERRADIUS + this.CONST_SIZEUNIT;
			scrollUp.style.width = this.CONST_FLATBUTTONGROUP_SCROLLBUTTONSIZE + this.CONST_SIZEUNIT;
			scrollUp.style.minWidth = this.CONST_FLATBUTTONGROUP_SCROLLBUTTONSIZE + this.CONST_SIZEUNIT;
			scrollUp.style.maxWidth = this.CONST_FLATBUTTONGROUP_SCROLLBUTTONSIZE + this.CONST_SIZEUNIT;
		} else {
			scrollUp.style.boxShadow = "0 2px 4px -1px " + this.CONST_CSS_SHADOWCOLOR;
			scrollUp.style.borderRadius = this.CONST_CSS_ROUNDEDCORNERBORDERRADIUS + this.CONST_SIZEUNIT + " " + this.CONST_CSS_ROUNDEDCORNERBORDERRADIUS + this.CONST_SIZEUNIT + " 0 0";
			scrollUp.style.height = this.CONST_FLATBUTTONGROUP_SCROLLBUTTONSIZE + this.CONST_SIZEUNIT;
			scrollUp.style.minHeight = this.CONST_FLATBUTTONGROUP_SCROLLBUTTONSIZE + this.CONST_SIZEUNIT;
			scrollUp.style.maxHeight = this.CONST_FLATBUTTONGROUP_SCROLLBUTTONSIZE + this.CONST_SIZEUNIT;
		}

		//向上滚动按钮阴影
		var scrollUpShadow = this.createFlatButtonGroupChild(newDIV, scrollUpShadowID);

		if (this.isEmpty(scrollUpShadow)) {
			console.error("创建浮动按钮组的向上滚动按钮阴影失败");

			return;
		}

		if (direction == this.CONST_FLATBUTTONGROUP_HORIZONDIRECTION) {
			scrollUpShadow.style.width = this.CONST_FLATBUTTONGROUP_SHADOWSIZE + this.CONST_SIZEUNIT;
			scrollUpShadow.style.minWidth = this.CONST_FLATBUTTONGROUP_SHADOWSIZE + this.CONST_SIZEUNIT;
			scrollUpShadow.style.maxWidth = this.CONST_FLATBUTTONGROUP_SHADOWSIZE + this.CONST_SIZEUNIT;
		} else {
			scrollUpShadow.style.height = this.CONST_FLATBUTTONGROUP_SHADOWSIZE + this.CONST_SIZEUNIT;
			scrollUpShadow.style.minHeight = this.CONST_FLATBUTTONGROUP_SHADOWSIZE + this.CONST_SIZEUNIT;
			scrollUpShadow.style.maxHeight = this.CONST_FLATBUTTONGROUP_SHADOWSIZE + this.CONST_SIZEUNIT;
		}

		//向下滚动按钮阴影
		var scrollDownID = id + this.CONST_SUFFIX_SCROLLDOWN;
		var scrollDownShadowID = scrollDownID + this.CONST_SUFFIX_SHADOW;

		var scrollDownShadow = this.createFlatButtonGroupChild(newDIV, scrollDownShadowID);

		if (this.isEmpty(scrollDownShadow)) {
			console.error("创建浮动按钮组的向下滚动按钮阴影失败");

			return;
		}

		if (direction == this.CONST_FLATBUTTONGROUP_HORIZONDIRECTION) {
			scrollDownShadow.style.width = this.CONST_FLATBUTTONGROUP_SHADOWSIZE + this.CONST_SIZEUNIT;
			scrollDownShadow.style.minWidth = this.CONST_FLATBUTTONGROUP_SHADOWSIZE + this.CONST_SIZEUNIT;
			scrollDownShadow.style.maxWidth = this.CONST_FLATBUTTONGROUP_SHADOWSIZE + this.CONST_SIZEUNIT;
		} else {
			scrollDownShadow.style.height = this.CONST_FLATBUTTONGROUP_SHADOWSIZE + this.CONST_SIZEUNIT;
			scrollDownShadow.style.minHeight = this.CONST_FLATBUTTONGROUP_SHADOWSIZE + this.CONST_SIZEUNIT;
			scrollDownShadow.style.maxHeight = this.CONST_FLATBUTTONGROUP_SHADOWSIZE + this.CONST_SIZEUNIT;
		}

		//向下滚动按钮
		var scrollDownOnClickFunc = function () {
			//浮动按钮组滚动
			if (!this.pdd) return;
			var pdd = this.pdd;

			pdd.flatButtonGroupScroll(this, 1);
		};

		var scrollDown = this.createFlatButtonGroupChild(newDIV, scrollDownID, direction == this.CONST_FLATBUTTONGROUP_HORIZONDIRECTION ? this.CONST_CANVASTYPE_SCROLLRIGHT : this.CONST_CANVASTYPE_SCROLLDOWN, "", "", this.CONST_CSSSTYLE_BUTTON, "", this.CONST_CANVASSIZE_8, null, null, null, scrollDownOnClickFunc);

		if (this.isEmpty(scrollDown)) {
			console.error("创建浮动按钮组的向下滚动按钮失败");

			return;
		}

		if (direction == this.CONST_FLATBUTTONGROUP_HORIZONDIRECTION) {
			scrollDown.style.boxShadow = "-2px 0 4px -1px " + this.CONST_CSS_SHADOWCOLOR;
			scrollDown.style.borderRadius = "0 " + this.CONST_CSS_ROUNDEDCORNERBORDERRADIUS + this.CONST_SIZEUNIT + " " + this.CONST_CSS_ROUNDEDCORNERBORDERRADIUS + this.CONST_SIZEUNIT + " 0";
			scrollDown.style.width = this.CONST_FLATBUTTONGROUP_SCROLLBUTTONSIZE + this.CONST_SIZEUNIT;
			scrollDown.style.minWidth = this.CONST_FLATBUTTONGROUP_SCROLLBUTTONSIZE + this.CONST_SIZEUNIT;
			scrollDown.style.maxWidth = this.CONST_FLATBUTTONGROUP_SCROLLBUTTONSIZE + this.CONST_SIZEUNIT;
		} else {
			scrollDown.style.boxShadow = "0 -2px 4px -1px " + this.CONST_CSS_SHADOWCOLOR;
			scrollDown.style.borderRadius = "0 0 " + this.CONST_CSS_ROUNDEDCORNERBORDERRADIUS + this.CONST_SIZEUNIT + " " + this.CONST_CSS_ROUNDEDCORNERBORDERRADIUS + this.CONST_SIZEUNIT;
			scrollDown.style.height = this.CONST_FLATBUTTONGROUP_SCROLLBUTTONSIZE + this.CONST_SIZEUNIT;
			scrollDown.style.minHeight = this.CONST_FLATBUTTONGROUP_SCROLLBUTTONSIZE + this.CONST_SIZEUNIT;
			scrollDown.style.maxHeight = this.CONST_FLATBUTTONGROUP_SCROLLBUTTONSIZE + this.CONST_SIZEUNIT;
		}

		//默认隐藏滚动按钮
		scrollUp.style.display = "none";
		scrollUpShadow.style.display = "none";
		scrollDown.style.display = "none";
		scrollDownShadow.style.display = "none";

		return newDIV;
	},
	/**
	 * @description 导入浮动按钮组子项
	 * @param group 浮动按钮组
	 * @param children 子项集合
	 */
	importFlatButtonGroupChildren: function (group, children) {
		if (this.isEmpty(group)) {
			console.error("参数浮动按钮组为空");

			return;
		}

		if (this.isEmptyArray(children)) {
			console.error("参数子项集合为空");

			return;
		}

		var childrenLength = children.length;

		for (var index = 0; index < childrenLength; index++) {
			var child = children[index];

			if (this.isEmpty(child)) {
				console.error({ msg: "导入的浮动按钮子项集合第" + index + "项为空", param: children });

				continue;
			}

			var id = child[this.CONST_ATTRIBUTE_FLATBUTTONID];

			if (this.isEmptyString(id)) {
				console.error({ msg: "导入的浮动按钮子项集合第" + index + "项的" + this.CONST_ATTRIBUTE_FLATBUTTONID + "属性为空", param: child });

				continue;
			}

			var type = child[this.CONST_ATTRIBUTE_FLATBUTTONTYPE];

			var image = child[this.CONST_ATTRIBUTE_FLATBUTTONIMAGE];

			var text = child[this.CONST_ATTRIBUTE_FLATBUTTONTEXT];

			var styleClass = child[this.CONST_ATTRIBUTE_FLATBUTTONSTYLECLASS];

			var tips = child[this.CONST_ATTRIBUTE_FLATBUTTONTIPS];

			var canvasSize = child[this.CONST_ATTRIBUTE_FLATBUTTONCANVASSIZE];

			var canvasFillColor = child[this.CONST_ATTRIBUTE_FLATBUTTONCANVASFILLCOLOR];

			var canvasFontColor = child[this.CONST_ATTRIBUTE_FLATBUTTONCANVASFONTCOLOR];

			var propForm = child[this.CONST_ATTRIBUTE_FLATBUTTONPROPFORM];

			var onClickFunc = child[this.CONST_ATTRIBUTE_FLATBUTTONONCLICKFUNC];

			divChild = this.createFlatButtonGroupChild(group, id, type, image, text, styleClass, tips, canvasSize, canvasFillColor, canvasFontColor, true, onClickFunc);

			if (this.isEmpty(divChild)) {
				console.error({ msg: "导入的浮动按钮子项集合第" + index + "项失败", param: children });

				continue;
			}

			divChild.setAttribute(this.CONST_ATTRIBUTE_FLATBUTTONPROPFORM, this.isEmptyString(propForm) ? "" : propForm);
		}
	},
	/**
	 * @description 创建浮动按钮组子项
	 * @param group 浮动按钮组
	 * @param id ID
	 * @param type 类型
	 * @param image 图片
	 * @param text 文本
	 * @param styleClass 样式类
	 * @param tips 提示
	 * @param canvasSize 画布大小
	 * @param canvasFillColor 画布填充颜色
	 * @param canvasFontColor 画布字体颜色
	 * @param registerCanvasStyle 注册画布样式（默认：false）
	 * @param onClickFunc 单击函数
	 * @return HTMLElement 按钮组子项HTML元素
	 */
	createFlatButtonGroupChild: function (group, id, type, image, text, styleClass, tips, canvasSize, canvasFillColor, canvasFontColor, registerCanvasStyle, onClickFunc) {
		if (this.isEmpty(group)) {
			console.error("参数浮动按钮组为空");

			return;
		}

		if (this.isEmptyString(id)) {
			console.error("参数ID为空");

			return;
		}

		var nodeID = id;

		id += this.CONST_SPLITSYMBOL + this.designerID;

		var exists = !this.isEmpty(document.getElementById(id));

		//获取浮动按钮组ID
		var groupID = group.id;

		if (this.isEmptyString(groupID)) {
			console.error({ msg: "获取浮动按钮组的ID为空", param: group });

			return;
		}

		if (this.isEmpty(this.graphStylesheet)) {
			console.error("获取mxGraphParent画板样式表失败");

			return false;
		}


		//默认画布大小
		if (!this.isNumber(canvasSize)) canvasSize = this.CONST_CANVASSIZE_24;

		//默认不注册画布样式
		if (!this.isBoolean(registerCanvasStyle)) registerCanvasStyle = false;

		//获取浮动按钮宽度
		var groupChildWidth = group.getAttribute(this.CONST_ATTRIBUTE_FLATBUTTONWIDTH);

		if (this.isEmptyString(groupChildWidth)) groupChildWidth = this.CONST_FLATBUTTON_SIZE;

		groupChildWidth = Number(groupChildWidth);

		if (!this.isNumber(groupChildWidth)) groupChildWidth = this.CONST_FLATBUTTON_SIZE;

		//获取浮动按钮高度
		var groupChildHeight = group.getAttribute(this.CONST_ATTRIBUTE_FLATBUTTONHEIGHT);

		if (this.isEmptyString(groupChildHeight)) groupChildHeight = this.CONST_FLATBUTTON_SIZE;

		groupChildHeight = Number(groupChildHeight);

		if (!this.isNumber(groupChildHeight)) groupChildHeight = this.CONST_FLATBUTTON_SIZE;

		//获取浮动按钮组方向（默认：横向）
		var groupDirection = group.getAttribute(this.CONST_ATTRIBUTE_FLATBUTTONGROUPDIRECTION);

		if (this.isEmptyString(groupDirection)) {
			groupDirection = this.CONST_FLATBUTTONGROUP_HORIZONDIRECTION;
		} else {
			if (groupDirection == this.CONST_FLATBUTTONGROUP_VERTICALDIRECTION) {
				groupDirection = this.CONST_FLATBUTTONGROUP_VERTICALDIRECTION;
			} else {
				groupDirection = this.CONST_FLATBUTTONGROUP_HORIZONDIRECTION;
			}
		}

		//获取浮动按钮组所有子项
		var groupChildren = group.children;

		var groupChildrenLength = groupChildren ? groupChildren.length : 0;

		if (!this.isNumber(groupChildrenLength)) groupChildrenLength = 0;

		var groupRowID = groupDirection == this.CONST_FLATBUTTONGROUP_VERTICALDIRECTION ? groupID + this.CONST_SUFFIX_ROW + (groupChildrenLength + 1) : groupID + this.CONST_SUFFIX_ROW + 1;

		var groupRow = groupDirection == this.CONST_FLATBUTTONGROUP_HORIZONDIRECTION && groupChildrenLength > 0 ? groupChildren[0] : null;

		if (!exists) {
			if (this.isEmpty(groupRow)) {
				groupRow = document.createElement("div");

				groupRow.id = groupRowID;
				groupRow.style.display = "table-row";

				if (groupDirection == this.CONST_FLATBUTTONGROUP_VERTICALDIRECTION) {
					if (groupChildrenLength >= 4) {
						var beforeRow = groupChildren[groupChildrenLength - 2];

						if (!beforeRow) {
							console.error({ msg: "获取浮动按钮组第" + (groupChildrenLength - 2) + "项子项为空", param: groupChildren });

							return;
						}

						group.insertBefore(groupRow, beforeRow);
					} else {
						group.appendChild(groupRow);
					}
				} else {
					group.appendChild(groupRow);
				}
			}

			if (this.isEmpty(groupRow)) {
				console.error({ msg: "获取浮动按钮组第" + row + "行失败", param: group });

				return;
			}
		}

		var groupRowChildren = groupRow ? groupRow.children : null;

		var groupRowChildrenLength = groupRowChildren ? groupRowChildren.length : 0;

		if (!this.isNumber(groupRowChildrenLength)) groupRowChildrenLength = 0;

		var beforeNode = groupRowChildrenLength >= 4 ? groupRowChildren[groupRowChildrenLength - 2] : null;

		var newDIV = document.getElementById(id);

		if (this.isEmpty(newDIV)) newDIV = document.createElement("div");

		if (this.isEmpty(newDIV)) {
			console.error("创建DIV元素" + id + "失败");

			return;
		}

		newDIV.id = id;
		newDIV.style.display = "table-cell";
		newDIV.pdd = this;

		newDIV.setAttribute(this.CONST_ATTRIBUTE_FLATBUTTONGROUPID, groupID);

		newDIV.setAttribute(this.CONST_ATTRIBUTE_DESIGNERID, this.designerID);
		newDIV.setAttribute(this.CONST_ATTRIBUTE_FLATBUTTONID, id);
		newDIV.setAttribute(this.CONST_ATTRIBUTE_FLATBUTTONNODEID, nodeID);
		newDIV.setAttribute(this.CONST_ATTRIBUTE_FLATBUTTONTYPE, this.isEmptyString(type) ? "" : type);
		newDIV.setAttribute(this.CONST_ATTRIBUTE_FLATBUTTONIMAGE, this.isEmptyString(image) ? "" : image);
		newDIV.setAttribute(this.CONST_ATTRIBUTE_FLATBUTTONTEXT, this.isEmptyString(text) ? "" : text);
		newDIV.setAttribute(this.CONST_ATTRIBUTE_FLATBUTTONTIPS, this.isEmptyString(tips) ? "" : tips);
		newDIV.setAttribute(this.CONST_ATTRIBUTE_FLATBUTTONCANVASFILLCOLOR, this.isEmptyString(canvasFillColor) ? "" : canvasFillColor);
		newDIV.setAttribute(this.CONST_ATTRIBUTE_FLATBUTTONCANVASFONTCOLOR, this.isEmptyString(canvasFontColor) ? "" : canvasFontColor);

		if (!this.isEmpty(onClickFunc)) newDIV.onclick = onClickFunc;

		if (groupChildHeight > 0) {
			newDIV.style.height = groupChildHeight + this.CONST_SIZEUNIT;
			newDIV.style.minHeight = groupChildHeight + this.CONST_SIZEUNIT;
			newDIV.style.maxHeight = groupChildHeight + this.CONST_SIZEUNIT;
		} else {
			newDIV.style.height = this.CONST_FLATBUTTON_SIZE + this.CONST_SIZEUNIT;
			newDIV.style.minHeight = this.CONST_FLATBUTTON_SIZE + this.CONST_SIZEUNIT;
			newDIV.style.maxHeight = this.CONST_FLATBUTTON_SIZE + this.CONST_SIZEUNIT;
		}

		if (groupChildWidth > 0) {
			newDIV.style.width = groupChildWidth + this.CONST_SIZEUNIT;
			newDIV.style.minWidth = groupChildWidth + this.CONST_SIZEUNIT;
			newDIV.style.maxWidth = groupChildWidth + this.CONST_SIZEUNIT;
		} else {
			if (this.isEmptyString(text)) {
				newDIV.style.width = this.CONST_FLATBUTTON_SIZE + this.CONST_SIZEUNIT;
				newDIV.style.minWidth = this.CONST_FLATBUTTON_SIZE + this.CONST_SIZEUNIT;
				newDIV.style.maxWidth = this.CONST_FLATBUTTON_SIZE + this.CONST_SIZEUNIT;
			}
		}

		if (!this.isEmptyString(styleClass)) newDIV.setAttribute("class", styleClass);

		if (!this.isEmptyString(tips)) newDIV.title = tips;

		if (this.isEmptyString(image)) {
			if (!this.isEmptyString(type)) {
				var canvasFlatButton = this.createCanvas(this.CONST_PREFIX_CANVAS + nodeID, canvasSize, type, canvasFillColor);

				if (this.isEmpty(canvasFlatButton)) {
					console.error({ msg: "创建浮动按钮组子项画布失败", param: type });
				} else {
					canvasFlatButtonData = canvasFlatButton.toDataURL();

					if (!this.isEmptyString(canvasFlatButtonData)) newDIV.style.backgroundImage = "url(" + canvasFlatButtonData + ")";
				}
			}
		} else {
			newDIV.style.backgroundImage = "url('" + image + "')";
			newDIV.style.backgroundSize = canvasSize + this.CONST_SIZEUNIT + " " + canvasSize + this.CONST_SIZEUNIT;

			if (image.indexOf("data:image") < 0) {
				if (!this.isEmptyString(this.basePath)) {
					newDIV.style.backgroundImage = "url('" + this.basePath + "/" + image + "')";
				}
			}
		}

		if (registerCanvasStyle && !this.isEmptyString(type)) {
			var defaultMGVertexStyle = this.graphStylesheet.getDefaultVertexStyle();

			if (this.isEmpty(defaultMGVertexStyle)) defaultMGVertexStyle = this.graphStylesheet.createDefaultVertexStyle();

			var newMGVertexStyle = mxUtils.clone(defaultMGVertexStyle);

			if (this.CONST_CANVASTYPE_ROUNDRECT == type) {
				newMGVertexStyle[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_RECTANGLE;
				newMGVertexStyle[mxConstants.STYLE_ROUNDED] = true;
			} else if (this.CONST_CANVASTYPE_CIRCULAR == type) {
				newMGVertexStyle[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_ELLIPSE;
			} else if (this.CONST_CANVASTYPE_RECT == type) {
				newMGVertexStyle[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_RECTANGLE;
			} else if (this.CONST_CANVASTYPE_RHOMBUS == type) {
				newMGVertexStyle[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_RHOMBUS;
			} else if (this.CONST_CANVASTYPE_TRIANGLE == type) {
				newMGVertexStyle[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_TRIANGLE;
			} else if (this.CONST_CANVASTYPE_CYLINDER == type) {
				newMGVertexStyle[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_CYLINDER;
			} else if (this.CONST_CANVASTYPE_ACTOR == type) {
				newMGVertexStyle[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_ACTOR;
			} else if (this.CONST_CANVASTYPE_SWIMLANE == type) {
				newMGVertexStyle[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_SWIMLANE;
				newMGVertexStyle[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter;
				newMGVertexStyle[mxConstants.STYLE_ALIGN] = mxConstants.ALIGN_CENTER;
				newMGVertexStyle[mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_TOP;
				newMGVertexStyle[mxConstants.STYLE_SWIMLANE_FILLCOLOR] = this.CONST_STYLE_VERTEX_SWIMLANEFILLCOLOR;
				newMGVertexStyle[mxConstants.STYLE_STARTSIZE] = this.CONST_STYLE_VERTEX_SWIMLANESTARTSIZE;
				newMGVertexStyle[mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_MIDDLE;
			} else if (this.CONST_CANVASTYPE_CUSTOM == type) {
				newMGVertexStyle[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_IMAGE;
				newMGVertexStyle[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter;

				if (!this.isEmptyString(image)) {
					newMGVertexStyle[mxConstants.STYLE_IMAGE] = image;

					if (image.indexOf("data:image") < 0) {
						if (!this.isEmptyString(this.basePath)) {
							newMGVertexStyle[mxConstants.STYLE_IMAGE] = this.basePath + "/" + image;
						}
					}
				}
			}

			if (!this.isEmptyString(canvasFillColor)) {
				newMGVertexStyle[mxConstants.STYLE_STROKECOLOR] = canvasFillColor;
				newMGVertexStyle[mxConstants.STYLE_FILLCOLOR] = canvasFillColor;
			}

			if (!this.isEmptyString(canvasFontColor)) newMGVertexStyle[mxConstants.STYLE_FONTCOLOR] = canvasFontColor;

			this.graphStylesheet.putCellStyle(this.CONST_PREFIX_VERTEX_STYLE + nodeID, newMGVertexStyle);
		}

		if (!this.isEmptyString(text)) newDIV.innerHTML = text;

		if (!exists) {
			if (groupDirection == this.CONST_FLATBUTTONGROUP_VERTICALDIRECTION) {
				groupRow.appendChild(newDIV);
			} else if (groupDirection == this.CONST_FLATBUTTONGROUP_HORIZONDIRECTION) {
				if (beforeNode) {
					groupRow.insertBefore(newDIV, beforeNode);
				} else {
					groupRow.appendChild(newDIV);
				}
			}
		}

		//重新排列浮动按钮组的内容
		this.arrangeFlatButtonGroup(group);

		return newDIV;
	},
	/**
	 * @description 重新排列浮动按钮组的子项
	 * @param group 浮动按钮组
	 */
	arrangeFlatButtonGroup: function (group) {
		if (this.isEmpty(group)) {
			console.error("参数浮动按钮组为空");

			return;
		}

		var groupID = group.id;

		if (this.isEmptyString(groupID)) {
			console.error({ msg: "获取浮动按钮组ID为空", param: group });

			return;
		}

		//获取浮动按钮组方向（默认：横向）
		var groupDirection = group.getAttribute(this.CONST_ATTRIBUTE_FLATBUTTONGROUPDIRECTION);

		if (this.isEmptyString(groupDirection)) {
			groupDirection = this.CONST_FLATBUTTONGROUP_HORIZONDIRECTION;
		} else {
			if (groupDirection == this.CONST_FLATBUTTONGROUP_VERTICALDIRECTION) {
				groupDirection = this.CONST_FLATBUTTONGROUP_VERTICALDIRECTION;
			} else {
				groupDirection = this.CONST_FLATBUTTONGROUP_HORIZONDIRECTION;
			}
		}

		//获取浮动按钮组是否显示滚动按钮（默认：false）
		var groupScrollButton = group.getAttribute(this.CONST_ATTRIBUTE_FLATBUTTONGROUPSCROLLBUTTON);

		if (this.isEmptyString(groupScrollButton)) groupScrollButton = false;

		groupScrollButton = groupScrollButton == "true" ? true : false;

		//获取浮动按钮组所有子项
		var groupChildren = group.children;

		if (groupDirection == this.CONST_FLATBUTTONGROUP_HORIZONDIRECTION) {
			var groupChildrenChildren = groupChildren ? groupChildren[0] ? groupChildren[0].children : null : null;

			if (this.isEmpty(groupChildrenChildren)) {
				console.error({ msg: "获取浮动按钮组第1项的子项为空", param: groupChildren });

				return;
			}

			groupChildren = groupChildrenChildren;
		}

		if (this.isEmpty(groupChildren)) {
			console.error({ msg: "获取浮动按钮组的子项为空", param: group });

			return;
		}

		var groupChildrenLength = groupChildren.length;

		if (!this.isNumber(groupChildrenLength)) {
			console.error({ msg: "获取浮动按钮组的子项为空", param: group });

			return;
		}

		if (groupChildrenLength < 4) {
			console.error({ msg: "获取的浮动按钮组子项异常", param: groupChildren });

			return;
		}

		if (groupChildrenLength == 4) {
			console.error({ msg: "获取的浮动按钮组没有子项需要排列", param: groupChildren });

			return;
		}

		var groupScrollUp;

		var groupScrollUpShadow;

		var groupScrollDown;

		var groupScrollDownShadow;

		if (groupDirection == this.CONST_FLATBUTTONGROUP_HORIZONDIRECTION) {
			groupScrollUp = groupChildren[0];

			groupScrollUpShadow = groupChildren[1];

			groupScrollDown = groupChildren[groupChildrenLength - 1];

			groupScrollDownShadow = groupChildren[groupChildrenLength - 2];
		} else {
			groupScrollUp = groupChildren[0] ? groupChildren[0].children ? groupChildren[0].children[0] : null : null;

			groupScrollUpShadow = groupChildren[1] ? groupChildren[1].children ? groupChildren[1].children[0] : null : null;

			groupScrollDown = groupChildren[groupChildrenLength - 1] ? groupChildren[groupChildrenLength - 1].children ? groupChildren[groupChildrenLength - 1].children[0] : null : null;

			groupScrollDownShadow = groupChildren[groupChildrenLength - 2] ? groupChildren[groupChildrenLength - 2].children ? groupChildren[groupChildrenLength - 2].children[0] : null : null;
		}

		if (this.isEmpty(groupScrollUp)) {
			console.error({ msg: "获取的浮动按钮组的第" + 0 + "项向上滚动按钮失败", param: groupChildren });

			return;
		}

		if (this.isEmpty(groupScrollUpShadow)) {
			console.error({ msg: "获取的浮动按钮组的第" + 1 + "项向上滚动按钮阴影失败", param: groupChildren });

			return;
		}

		if (this.isEmpty(groupScrollDown)) {
			console.error({ msg: "获取的浮动按钮组的第" + (groupChildrenLength - 1) + "项向下滚动按钮失败", param: groupChildren });

			return;
		}

		if (this.isEmpty(groupScrollDownShadow)) {
			console.error({ msg: "获取的浮动按钮组的第" + (groupChildrenLength - 2) + "项向下滚动按钮阴影失败", param: groupChildren });

			return;
		}

		//获取浮动按钮组最大显示子项数
		var maxDisplayChildren = group.getAttribute(this.CONST_ATTRIBUTE_FLATBUTTONGROUPMAXDISPLAYCHILDREN);

		if (this.isEmptyString(maxDisplayChildren)) maxDisplayChildren = 0;

		maxDisplayChildren = Number(maxDisplayChildren);

		if (!this.isNumber(maxDisplayChildren)) maxDisplayChildren = 0;

		//获取浮动按钮组首项显示位置
		var scrollFromIndex = group.getAttribute(this.CONST_ATTRIBUTE_FLATBUTTONGROUPSCROLLFROMINDEX);

		if (this.isEmptyString(scrollFromIndex)) scrollFromIndex = 0;

		scrollFromIndex = Number(scrollFromIndex);

		if (!this.isNumber(scrollFromIndex)) scrollFromIndex = 0;

		//浮动按钮组末项显示位置
		var scrollToIndex;

		//首个显示项位置
		var firstDisplayIndex = 0;

		//最后显示项位置
		var lastDisplayIndex = 0;

		//获取浮动按钮组开始显示位置
		var startDisplayIndex = group.getAttribute(this.CONST_ATTRIBUTE_FLATBUTTONGROUPSTARTDISPLAYINDEX);

		if (this.isEmptyString(startDisplayIndex)) startDisplayIndex = -1;

		startDisplayIndex = Number(startDisplayIndex);

		if (!this.isNumber(startDisplayIndex)) startDisplayIndex = -1;

		//获取浮动按钮组结束显示位置
		var endDisplayIndex = group.getAttribute(this.CONST_ATTRIBUTE_FLATBUTTONGROUPENDDISPLAYINDEX);

		if (this.isEmptyString(endDisplayIndex)) endDisplayIndex = -1;

		endDisplayIndex = Number(endDisplayIndex);

		if (!this.isNumber(endDisplayIndex)) endDisplayIndex = -1;

		var startIndex = 2;

		var endIndex = groupChildrenLength - 2;

		var displayCount = 0;

		for (var index = startIndex; index < endIndex; index++) {
			var groupChild = groupChildren[index];

			if (this.isEmpty(groupChild)) {
				console.error({ msg: "获取浮动按钮组第" + index + "项为空", param: groupChildren });

				continue;
			}

			if (groupDirection == this.CONST_FLATBUTTONGROUP_VERTICALDIRECTION) {
				var groupChildChildren = groupChild.children;

				if (this.isEmpty(groupChildChildren)) {
					console.error({ msg: "获取浮动按钮组第" + index + "项的子项为空", param: groupChild });

					continue;
				}

				groupChild = groupChildChildren[0];
			}

			if (this.isEmpty(groupChild)) {
				console.error({ msg: "获取浮动按钮组第" + index + "项为空", param: groupChildren });

				continue;
			}

			groupChild.style.borderRadius = "0";

			if ((index <= startDisplayIndex + startIndex && startDisplayIndex >= 0) || (index >= endIndex - endDisplayIndex - 1 && endDisplayIndex >= 0)) {
				groupChild.style.display = "table-cell";

				if (firstDisplayIndex <= 0) firstDisplayIndex = index;

				lastDisplayIndex = index;
			} else {
				if (index < scrollFromIndex || (displayCount >= maxDisplayChildren && maxDisplayChildren > 0)) {
					groupChild.style.display = "none";
				} else {
					groupChild.style.display = "table-cell";

					if (scrollFromIndex <= 0) scrollFromIndex = index;

					scrollToIndex = index;

					if (firstDisplayIndex <= 0) firstDisplayIndex = index;

					lastDisplayIndex = index;

					displayCount++;
				}
			}
		}

		group.setAttribute(this.CONST_ATTRIBUTE_FLATBUTTONGROUPSCROLLFROMINDEX, scrollFromIndex);
		group.setAttribute(this.CONST_ATTRIBUTE_FLATBUTTONGROUPSCROLLTOINDEX, scrollToIndex);

		if (groupScrollButton) {
			//显示滚动按钮
			groupScrollUp.style.display = "table-cell";
			groupScrollUpShadow.style.display = "table-cell";
			groupScrollDown.style.display = "table-cell";
			groupScrollDownShadow.style.display = "table-cell";

			if ((scrollFromIndex > startIndex && startDisplayIndex < 0) || (scrollFromIndex - (startDisplayIndex + startIndex) > 1 && startDisplayIndex >= 0)) {
				//显示向上滚动按钮
				groupScrollUp.setAttribute("class", this.CONST_CSSSTYLE_BUTTON);

				backgroundImage = groupScrollUp.getAttribute("background-image")

				if (!this.isEmptyString(backgroundImage)) {
					groupScrollUp.style.backgroundImage = backgroundImage;
					groupScrollUp.setAttribute("background-image", "");
				}

				if (groupDirection == this.CONST_FLATBUTTONGROUP_HORIZONDIRECTION) {
					groupScrollUp.style.boxShadow = "2px 0 4px -1px " + this.CONST_CSS_SHADOWCOLOR;
				} else {
					groupScrollUp.style.boxShadow = "0 2px 4px -1px " + this.CONST_CSS_SHADOWCOLOR;
				}

				groupScrollUp.onclick = function () {
					//浮动按钮组滚动
					if (!this.pdd) return;
					this.pdd.flatButtonGroupScroll(this, -1);
				}
			} else {
				//隐藏向上滚动按钮
				groupScrollUp.setAttribute("class", this.CONST_CSSSTYLE_BLANK);

				backgroundImage = groupScrollUp.style.backgroundImage;

				if (!this.isEmptyString(backgroundImage)) {
					groupScrollUp.setAttribute("background-image", backgroundImage);
					groupScrollUp.style.backgroundImage = "";
				}

				groupScrollUp.style.boxShadow = "none";

				groupScrollUp.onclick = {};
			}

			if ((scrollToIndex < endIndex - 1 && endDisplayIndex < 0)
				|| (endIndex - endDisplayIndex - 1 - scrollToIndex > 1 && endDisplayIndex >= 0)) {
				//显示向下滚动按钮
				groupScrollDown.setAttribute("class", this.CONST_CSSSTYLE_BUTTON);

				backgroundImage = groupScrollDown.getAttribute("background-image")

				if (!this.isEmptyString(backgroundImage)) {
					groupScrollDown.style.backgroundImage = backgroundImage;
					groupScrollDown.setAttribute("background-image", "");
				}

				if (groupDirection == this.CONST_FLATBUTTONGROUP_HORIZONDIRECTION) {
					groupScrollDown.style.boxShadow = "-2px 0 4px -1px " + this.CONST_CSS_SHADOWCOLOR;
				} else {
					groupScrollDown.style.boxShadow = "0 -2px 4px -1px " + this.CONST_CSS_SHADOWCOLOR;
				}

				groupScrollDown.onclick = function () {
					//浮动按钮组滚动
					if (!this.pdd) return;
					this.pdd.flatButtonGroupScroll(this, 1);
				}
			} else {
				//隐藏向下滚动按钮
				groupScrollDown.setAttribute("class", this.CONST_CSSSTYLE_BLANK);

				backgroundImage = groupScrollDown.style.backgroundImage;

				if (!this.isEmptyString(backgroundImage)) {
					groupScrollDown.setAttribute("background-image", backgroundImage);
					groupScrollDown.style.backgroundImage = "";
				}

				groupScrollDown.style.boxShadow = "none";

				groupScrollDown.onclick = {};
			}
		} else {
			//隐藏滚动按钮
			groupScrollUp.style.display = "none";
			groupScrollUpShadow.style.display = "none";
			groupScrollDown.style.display = "none";
			groupScrollDownShadow.style.display = "none";

			//如果不显示滚动按钮，则需调整首个显示项和最后显示项的边框弧度
			for (var index = startIndex; index < endIndex; index++) {
				if (index != firstDisplayIndex && index != lastDisplayIndex) continue;

				var groupChild = groupChildren[index];

				if (this.isEmpty(groupChild)) {
					console.error({ msg: "获取浮动按钮组第" + index + "项为空", param: groupChildren });

					continue;
				}

				if (groupDirection == this.CONST_FLATBUTTONGROUP_VERTICALDIRECTION) {
					var groupChildChildren = groupChild.children;

					if (this.isEmpty(groupChildChildren)) {
						console.error({ msg: "获取浮动按钮组第" + index + "项的子项为空", param: groupChild });

						continue;
					}

					groupChild = groupChildChildren[0];
				}

				if (this.isEmpty(groupChild)) {
					console.error({ msg: "获取浮动按钮组第" + index + "项为空", param: groupChildren });

					continue;
				}

				if (firstDisplayIndex == lastDisplayIndex) {
					groupChild.style.borderRadius = this.CONST_CSS_ROUNDEDCORNERBORDERRADIUS + this.CONST_SIZEUNIT;
				} else {
					if (index == firstDisplayIndex) {
						if (groupDirection == this.CONST_FLATBUTTONGROUP_HORIZONDIRECTION) {
							groupChild.style.borderRadius = this.CONST_CSS_ROUNDEDCORNERBORDERRADIUS + this.CONST_SIZEUNIT + " 0 0 " + this.CONST_CSS_ROUNDEDCORNERBORDERRADIUS + this.CONST_SIZEUNIT;
						} else {
							groupChild.style.borderRadius = this.CONST_CSS_ROUNDEDCORNERBORDERRADIUS + this.CONST_SIZEUNIT + " " + this.CONST_CSS_ROUNDEDCORNERBORDERRADIUS + this.CONST_SIZEUNIT + " 0 0";
						}
					} else if (index == lastDisplayIndex) {
						if (groupDirection == this.CONST_FLATBUTTONGROUP_HORIZONDIRECTION) {
							groupChild.style.borderRadius = "0 " + this.CONST_CSS_ROUNDEDCORNERBORDERRADIUS + this.CONST_SIZEUNIT + " " + this.CONST_CSS_ROUNDEDCORNERBORDERRADIUS + this.CONST_SIZEUNIT + " 0";
						} else {
							groupChild.style.borderRadius = "0 0 " + this.CONST_CSS_ROUNDEDCORNERBORDERRADIUS + this.CONST_SIZEUNIT + " " + this.CONST_CSS_ROUNDEDCORNERBORDERRADIUS + this.CONST_SIZEUNIT;
						}
					}
				}
			}
		}
	},
	/**
	 * @description 浮动按钮组滚动
	 * @param scrollButton 滚动按钮
	 * @param scrollStep 滚动步伐
	 */
	flatButtonGroupScroll: function (scrollButton, scrollStep) {
		if (this.isEmpty(scrollButton)) {
			console.error("参数滚动按钮为空");

			return;
		}

		var groupID = scrollButton.getAttribute(this.CONST_ATTRIBUTE_FLATBUTTONGROUPID);

		if (this.isEmptyString(groupID)) {
			console.error({ msg: "根据滚动按钮获取所属的浮动按钮组ID为空", param: scrollButton });

			return;
		}

		if (!this.isNumber(scrollStep)) {
			console.error("参数滚动步伐为空");

			return
		}

		if (scrollStep == 0) {
			console.error("参数滚动步伐为0");

			return
		}

		var group = document.getElementById(groupID);

		if (this.isEmpty(group)) {
			console.error("获取DIV " + groupID + " 失败");

			return
		}

		var scrollFromIndex = group.getAttribute(this.CONST_ATTRIBUTE_FLATBUTTONGROUPSCROLLFROMINDEX);

		if (this.isEmptyString(scrollFromIndex)) scrollFromIndex = 0;

		scrollFromIndex = Number(scrollFromIndex);

		if (!this.isNumber(scrollFromIndex)) scrollFromIndex = 0;

		scrollFromIndex += scrollStep;

		group.setAttribute(this.CONST_ATTRIBUTE_FLATBUTTONGROUPSCROLLFROMINDEX, scrollFromIndex);

		//重新排列浮动按钮组的内容
		this.arrangeFlatButtonGroup(group);
	},
	/**
	 * @description 创建浮动按钮
	 * @param id ID
	 * @param type 类型
	 * @param image 图片
	 * @param text 文本
	 * @param onClickFunc 点击函数
	 * @return HTMLElement 按钮HTML元素
	 */
	createFlatButton: function (id, type, image, text, onClickFunc) {
		if (this.isEmptyString(id)) {
			console.error("参数ID为空");

			return
		}

		var nodeID = id;

		id += this.CONST_SPLITSYMBOL + this.designerID;

		var newDIV = document.getElementById(id);

		if (this.isEmpty(newDIV)) newDIV = document.createElement("div");

		if (this.isEmpty(newDIV)) {
			console.error("创建DIV元素" + id + "失败");

			return;
		}

		newDIV.id = id;
		newDIV.pdd = this;

		newDIV.style.display = "block";
		newDIV.style.width = this.CONST_FLATBUTTON_SIZE + this.CONST_SIZEUNIT;
		newDIV.style.height = this.CONST_FLATBUTTON_SIZE + this.CONST_SIZEUNIT;
		newDIV.style.boxShadow = "0 0 4px 1px " + this.CONST_CSS_SHADOWCOLOR;
		newDIV.style.position = "absolute";
		newDIV.setAttribute("class", this.CONST_CSSSTYLE_BUTTON);

		newDIV.setAttribute(this.CONST_ATTRIBUTE_DESIGNERID, this.designerID);
		newDIV.setAttribute(this.CONST_ATTRIBUTE_FLATBUTTONID, id);
		newDIV.setAttribute(this.CONST_ATTRIBUTE_FLATBUTTONNODEID, nodeID);
		newDIV.setAttribute(this.CONST_ATTRIBUTE_FLATBUTTONTYPE, this.isEmptyString(type) ? "" : type);
		newDIV.setAttribute(this.CONST_ATTRIBUTE_FLATBUTTONIMAGE, this.isEmptyString(image) ? "" : image);
		newDIV.setAttribute(this.CONST_ATTRIBUTE_FLATBUTTONTEXT, this.isEmptyString(text) ? "" : text);

		if (this.isEmptyString(image)) {
			if (!this.isEmptyString(type)) {
				var canvasFlatButton = this.createCanvas(this.CONST_PREFIX_CANVAS + nodeID, this.CONST_CANVASSIZE_24, type);

				if (this.isEmpty(canvasFlatButton)) {
					console.error("创建浮动按钮画布失败");

					return;
				} else {
					canvasFlatButtonData = canvasFlatButton.toDataURL();

					if (!this.isEmptyString(canvasFlatButtonData)) newDIV.style.backgroundImage = "url(" + canvasFlatButtonData + ")";
				}
			}
		} else {
			newDIV.style.backgroundImage = "url('" + image + "')";

			if (!this.isEmptyString(this.basePath)) {
				newDIV.style.backgroundImage = "url('" + this.basePath + "/" + image + "')";
			}
		}

		if (!this.isEmptyString(text)) newDIV.innerHTML = text;

		if (!this.isEmpty(onClickFunc)) newDIV.onclick = onClickFunc;

		return newDIV;
	},
	/**
	 * @description 根据画板主体的大小重新排列浮动元素
	 */
	arrangeFlatElement: function () {
		if (this.isEmpty(this.divBody)) {
			console.error("获取DIV元素" + this.CONST_DIVBODYID + "失败");

			return;
		}

		var divBodyRect = this.divBody.getBoundingClientRect();

		var divBodyHeight = divBodyRect ? divBodyRect.height : null;

		var divBodyWidth = divBodyRect ? divBodyRect.width : null;

		if (!this.isNumber(divBodyWidth)) {
			console.error({ msg: "获取DIV元素" + this.CONST_DIVBODYID + "的宽度失败", param: this.divBody });

			return;
		}

		if (!this.isNumber(divBodyHeight)) {
			console.error({ msg: "获取DIV元素" + this.CONST_DIVBODYID + "的高度失败", param: this.divBody });

			return;
		}

		var y = 0;

		var x = 0;

		if (!this.isEmpty(this.divToolBox)) {

			var divToolBoxRect = this.divToolBox.getBoundingClientRect();

			var divToolBoxHeight = divToolBoxRect ? divToolBoxRect.height : null;

			var divToolBoxWidth = divToolBoxRect ? divToolBoxRect.width : null;

			if (this.isNumber(divToolBoxWidth) && this.isNumber(divToolBoxHeight)) {
				if (divToolBoxWidth > 0 && divToolBoxHeight > 0) {
					if (divBodyWidth <= 0) {
						this.divToolBox.style.visibility = "hidden";
					} else {
						y = (divToolBoxHeight + ((divBodyHeight - divToolBoxHeight) / 2)) * -1;

						x = this.CONST_BODYSPACING_SIZE;

						if (Math.abs(y) > divBodyHeight || Math.abs(x) > divBodyWidth) {
							this.divToolBox.style.visibility = "hidden";
						} else {
							this.divToolBox.style.visibility = "visible";

							this.divToolBox.style.marginTop = y + this.CONST_SIZEUNIT;
							this.divToolBox.style.marginLeft = x + this.CONST_SIZEUNIT;
						}
					}
				}
			} else {
				console.error({ msg: "获取DIV元素" + this.CONST_DIVTOOLBOXID + "的宽度/高度失败", param: this.divToolBox });
			}
		} else {
			console.error("获取DIV元素" + this.CONST_DIVTOOLBOXID + "失败");
		}

		if (!this.isEmpty(this.divMoveUp)) {
			if (divBodyWidth <= 0) {
				this.divMoveUp.style.visibility = "hidden";
			} else {
				y = (divBodyHeight - this.CONST_BODYSPACING_SIZE) * -1;

				x = divBodyWidth - this.CONST_BODYSPACING_SIZE - (this.CONST_FLATBUTTON_SIZE * 2);

				if (Math.abs(y) > divBodyHeight || Math.abs(x) > divBodyWidth) {
					this.divMoveUp.style.visibility = "hidden";
				} else {
					this.divMoveUp.style.visibility = "visible";

					this.divMoveUp.style.marginTop = y + this.CONST_SIZEUNIT;
					this.divMoveUp.style.marginLeft = x + this.CONST_SIZEUNIT;
				}
			}
		} else {
			console.error("获取DIV元素" + this.CONST_DIVMOVEUPID + "失败");
		}

		if (!this.isEmpty(this.divMoveDown)) {
			if (divBodyWidth <= 0) {
				this.divMoveDown.style.visibility = "hidden";
			} else {
				y = (divBodyHeight - this.CONST_BODYSPACING_SIZE - (this.CONST_FLATBUTTON_SIZE * 2)) * -1;

				x = divBodyWidth - this.CONST_BODYSPACING_SIZE - (this.CONST_FLATBUTTON_SIZE * 2);

				if (Math.abs(y) > divBodyHeight || Math.abs(x) > divBodyWidth) {
					this.divMoveDown.style.visibility = "hidden";
				} else {
					this.divMoveDown.style.visibility = "visible";

					this.divMoveDown.style.marginTop = y + this.CONST_SIZEUNIT;
					this.divMoveDown.style.marginLeft = x + this.CONST_SIZEUNIT;
				}
			}
		} else {
			console.error("获取DIV元素" + this.CONST_DIVMOVEDOWNID + "失败");
		}

		if (!this.isEmpty(this.divMoveLeft)) {
			if (divBodyWidth <= 0) {
				this.divMoveLeft.style.visibility = "hidden";
			} else {
				y = (divBodyHeight - this.CONST_BODYSPACING_SIZE - this.CONST_FLATBUTTON_SIZE) * -1;

				x = divBodyWidth - this.CONST_BODYSPACING_SIZE - (this.CONST_FLATBUTTON_SIZE * 3);

				if (Math.abs(y) > divBodyHeight || Math.abs(x) > divBodyWidth) {
					this.divMoveLeft.style.visibility = "hidden";
				} else {
					this.divMoveLeft.style.visibility = "visible";

					this.divMoveLeft.style.marginTop = y + this.CONST_SIZEUNIT;
					this.divMoveLeft.style.marginLeft = x + this.CONST_SIZEUNIT;
				}
			}
		} else {
			console.error("获取DIV元素" + this.CONST_DIVMOVEUPID + "失败");
		}

		if (!this.isEmpty(this.divMoveRight)) {
			if (divBodyWidth <= 0) {
				this.divMoveRight.style.visibility = "hidden";
			} else {
				y = (divBodyHeight - this.CONST_BODYSPACING_SIZE - this.CONST_FLATBUTTON_SIZE) * -1;

				x = divBodyWidth - this.CONST_FLATBUTTON_SIZE - this.CONST_BODYSPACING_SIZE;

				if (Math.abs(y) > divBodyHeight || Math.abs(x) > divBodyWidth) {
					this.divMoveRight.style.visibility = "hidden";
				} else {
					this.divMoveRight.style.visibility = "visible";

					this.divMoveRight.style.marginTop = y + this.CONST_SIZEUNIT;
					this.divMoveRight.style.marginLeft = x + this.CONST_SIZEUNIT;
				}
			}
		} else {
			console.error("获取DIV元素" + this.CONST_DIVMOVEUPID + "失败");
		}

		if (!this.isEmpty(this.divToolbar)) {

			var divToolbarRect = this.divToolbar.getBoundingClientRect();

			var divToolbarHeight = divToolbarRect ? divToolbarRect.height : null;

			var divToolbarWidth = divToolbarRect ? divToolbarRect.width : null;

			if (this.isNumber(divToolbarWidth) && this.isNumber(divToolbarHeight)) {
				if (divToolbarWidth > 0 && divToolbarHeight > 0) {
					if (divBodyWidth <= 0) {
						this.divToolbar.style.visibility = "hidden";
					} else {
						y = (divBodyHeight - this.CONST_BODYSPACING_SIZE) * -1;

						x = (divBodyWidth - divToolbarWidth) / 2;

						if (Math.abs(y) > divBodyHeight || Math.abs(x) > divBodyWidth) {
							this.divToolbar.style.visibility = "hidden";
						} else {
							this.divToolbar.style.visibility = "visible";

							this.divToolbar.style.marginTop = y + this.CONST_SIZEUNIT;
							this.divToolbar.style.marginLeft = x + this.CONST_SIZEUNIT;
						}
					}
				}
			} else {
				console.error({ msg: "获取DIV元素" + this.CONST_DIVTOOLBARID + "的宽度/高度失败", param: this.divToolbar });
			}
		} else {
			console.error("获取DIV元素" + this.CONST_DIVTOOLBARID + "失败");
		}

		if (!(this.isEmpty(this.divConnectorStyle) || this.isEmpty(this.divToolbar))) {

			var divConnectorStyleRect = this.divConnectorStyle.getBoundingClientRect();

			var divConnectorStyleHeight = divConnectorStyleRect ? divConnectorStyleRect.height : null;

			var divConnectorStyleWidth = divConnectorStyleRect ? divConnectorStyleRect.width : null;

			var divToolbarRect = this.divToolbar.getBoundingClientRect();

			var divToolbarHeight = divToolbarRect ? divToolbarRect.height : null;

			if (this.isNumber(divConnectorStyleWidth) && this.isNumber(divConnectorStyleHeight)) {
				if (divConnectorStyleWidth > 0 && divConnectorStyleHeight > 0) {
					if (divBodyWidth <= 0) {
						this.divConnectorStyle.style.visibility = "hidden";
					} else {
						y = (divBodyHeight - this.CONST_BODYSPACING_SIZE * 2 - divToolbarHeight) * -1;

						x = (divBodyWidth - divConnectorStyleWidth) / 2;

						if (Math.abs(y) > divBodyHeight || Math.abs(x) > divBodyWidth) {
							this.divConnectorStyle.style.visibility = "hidden";
						} else {
							this.divConnectorStyle.style.marginTop = y + this.CONST_SIZEUNIT;
							this.divConnectorStyle.style.marginLeft = x + this.CONST_SIZEUNIT;
						}
					}
				}
			} else {
				console.error({ msg: "获取DIV元素" + this.CONST_DIVCONNECTORSTYLEID + "的宽度/高度失败", param: this.divConnectorStyle });
			}
		} else {
			console.error("获取DIV元素" + this.CONST_DIVCONNECTORSTYLEID + "失败");
		}

		if (!this.isEmpty(this.divHelp)) {
			if (divBodyWidth <= 0) {
				this.divHelp.style.visibility = "hidden";
			} else {
				y = (this.CONST_FLATBUTTON_SIZE + this.CONST_BODYSPACING_SIZE) * -1;

				x = divBodyWidth - this.CONST_FLATBUTTON_SIZE - this.CONST_BODYSPACING_SIZE;

				if (Math.abs(y) > divBodyHeight || Math.abs(x) > divBodyWidth) {
					this.divHelp.style.visibility = "hidden";
				} else {
					this.divHelp.style.visibility = "visible";

					this.divHelp.style.marginTop = y + this.CONST_SIZEUNIT;
					this.divHelp.style.marginLeft = x + this.CONST_SIZEUNIT;
				}
			}
		} else {
			console.error("获取DIV元素" + this.CONST_DIVHELPID + "失败");
		}

		if (!this.isEmpty(this.divZoom)) {

			var divZoomRect = this.divZoom.getBoundingClientRect();

			var divZoomHeight = divZoomRect ? divZoomRect.height : null;

			var divZoomWidth = divZoomRect ? divZoomRect.width : null;

			if (this.isNumber(divZoomWidth) && this.isNumber(divZoomHeight)) {
				if (divZoomWidth > 0 && divZoomHeight > 0) {
					if (divBodyWidth <= 0) {
						this.divZoom.style.visibility = "hidden";
					} else {
						y = (this.CONST_FLATBUTTON_SIZE + this.CONST_BODYSPACING_SIZE) * -1;

						x = divBodyWidth - divZoomWidth - (this.CONST_BODYSPACING_SIZE * 2) - this.CONST_FLATBUTTON_SIZE;

						if (Math.abs(y) > divBodyHeight || Math.abs(x) > divBodyWidth) {
							this.divZoom.style.visibility = "hidden";
						} else {
							this.divZoom.style.visibility = "visible";

							this.divZoom.style.marginTop = y + this.CONST_SIZEUNIT;
							this.divZoom.style.marginLeft = x + this.CONST_SIZEUNIT;
						}
					}
				}
			} else {
				console.error({ msg: "获取DIV元素" + this.CONST_DIVZOOMID + "的宽度/高度失败", param: this.divZoom });
			}
		} else {
			console.error("获取DIV元素" + this.CONST_DIVZOOMID + "失败");
		}

		if (!(this.isEmpty(this.divZoom) || this.isEmpty(this.divOpacity))) {

			var divOpacityRect = this.divOpacity.getBoundingClientRect();

			var divOpacityHeight = divOpacityRect ? divOpacityRect.height : null;

			var divOpacityWidth = divOpacityRect ? divOpacityRect.width : null;

			var divZoomRect = this.divZoom.getBoundingClientRect();

			var divZoomWidth = divZoomRect ? divZoomRect.width : null;

			if (this.isNumber(divOpacityHeight) && this.isNumber(divOpacityWidth)) {
				if (divOpacityWidth > 0 && divOpacityHeight > 0) {
					if (divBodyWidth <= 0) {
						this.divOpacity.style.visibility = "hidden";
					} else {
						y = (this.CONST_FLATBUTTON_SIZE + this.CONST_BODYSPACING_SIZE) * -1;

						x = divBodyWidth - divOpacityWidth - divZoomWidth - (this.CONST_BODYSPACING_SIZE * 3) - this.CONST_FLATBUTTON_SIZE;

						if (Math.abs(y) > divBodyHeight || Math.abs(x) > divBodyWidth) {
							this.divOpacity.style.visibility = "hidden";
						} else {
							this.divOpacity.style.marginTop = y + this.CONST_SIZEUNIT;
							this.divOpacity.style.marginLeft = x + this.CONST_SIZEUNIT;
						}
					}
				}
			} else {
				console.error({ msg: "获取DIV元素" + this.CONST_DIVOPACITYID + "的宽度/高度失败", param: this.divOpacity });
			}
		} else {
			console.error("获取DIV元素" + this.CONST_DIVOPACITYID + "失败");
		}
	},
	/**
	 * @description 初始化
	 * @param  ctrl 控件
	 */
	initial: function (ctrl) {
		if (this.isEmpty(ctrl)) {
			console.error("参数控件为空");

			return;
		}

		this.designer = ctrl;

		var ctrlDOM = ctrl.dom;

		if (this.isEmpty(ctrlDOM)) {
			console.error("获取控件DOM失败");

			return;
		}

		var suffix = this.CONST_SPLITSYMBOL + this.designerID;

		if (!mxClient.isBrowserSupported()) {
			mxUtils.error("浏览器不支持", this.CONST_MXERROR_WIDTH, false);

			return;
		}

		//如果已初始化mxGraph则不重复执行
		if (!this.isEmpty(this.graph)) return;

		window.onresize = function () {
			var pddButtons = document.getElementsByClassName("pddButton");

			if (!pddButtons) return;

			if (pddButtons.length == 0) return;

			var pddButtonsLength = pddButtons.length;

			var pddIDArray = [];

			for (var index = 0; index < pddButtonsLength; index++) {
				var pddButton = pddButtons[index];

				if (!pddButton) continue;

				if (!pddButton.pdd) continue;

				var tmpDesignerID = pddButton.pdd.designerID;

				if (pddIDArray.indexOf(tmpDesignerID) >= 0) continue;

				pddIDArray.push(tmpDesignerID);

				//重新排列浮动元素
				pddButton.pdd.arrangeFlatElement();
			}
		};

		//获取设计器调试浮动按钮组DIV
		var divDebugID = this.CONST_DIVDEBUGID + suffix;
		this.divDebug = document.getElementById(divDebugID);

		if (this.isEmpty(this.divDebug)) {
			this.divDebug = document.createElement("div");
			this.divDebug.id = divDebugID;

			this.divDebug.style.display = "block";
			this.divDebug.style.width = "100%";
			this.divDebug.style.height = this.CONST_FLATBUTTON_SIZE + this.CONST_SIZEUNIT;
			this.divDebug.style.minHeight = this.CONST_FLATBUTTON_SIZE + this.CONST_SIZEUNIT;
			this.divDebug.style.maxHeight = this.CONST_FLATBUTTON_SIZE + this.CONST_SIZEUNIT;
			this.divDebug.style.marginBottom = this.CONST_GRAPH_MARGIN + this.CONST_SIZEUNIT;

			ctrlDOM.appendChild(this.divDebug);
		}

		//获取设计器主面板DIV
		var divMainID = this.CONST_DIVMAINID + suffix;
		this.divMain = document.getElementById(divMainID);

		if (this.isEmpty(this.divMain)) {
			this.divMain = document.createElement("div");
			this.divMain.id = divMainID;

			this.divMain.style.display = "table";
			this.divMain.style.width = "100%";
			this.divMain.style.height = "100%";
			this.divMain.style.borderRadius = this.CONST_CSS_ROUNDEDCORNERBORDERRADIUS + this.CONST_SIZEUNIT;
			this.divMain.style.boxShadow = "0 0 4px 1px " + this.CONST_CSS_SHADOWCOLOR;
			this.divMain.style.backgroundColor = this.CONST_CSS_MAINBACKGROUNDCOLOR;

			ctrlDOM.appendChild(this.divMain);
		}

		//获取设计器顶端面板DIV
		var divTopPanelID = this.CONST_DIVTOPPANELID + suffix;
		this.divTopPanel = document.getElementById(divTopPanelID);

		if (this.isEmpty(this.divTopPanel)) {
			this.divTopPanel = document.createElement("div");
			this.divTopPanel.id = divTopPanelID;

			this.divTopPanel.style.display = "table-row";
			this.divTopPanel.style.borderRadius = this.CONST_CSS_ROUNDEDCORNERBORDERRADIUS + this.CONST_SIZEUNIT + " " + this.CONST_CSS_ROUNDEDCORNERBORDERRADIUS + this.CONST_SIZEUNIT + " 0 0";
			this.divTopPanel.style.boxShadow = "0 2px 4px -1px " + this.CONST_CSS_SHADOWCOLOR;
			this.divTopPanel.style.height = this.CONST_FLATBUTTON_SIZE + this.CONST_SIZEUNIT;
			this.divTopPanel.style.minHeight = this.CONST_FLATBUTTON_SIZE + this.CONST_SIZEUNIT;
			this.divTopPanel.style.maxHeight = this.CONST_FLATBUTTON_SIZE + this.CONST_SIZEUNIT;

			this.divMain.appendChild(this.divTopPanel);

			var tmpCell = document.createElement("div");

			tmpCell.style.display = "table-cell";

			this.divTopPanel.appendChild(tmpCell);

			var tmpTable = document.createElement("div");

			tmpTable.style.display = "table";
			tmpTable.style.width = "100%";
			tmpTable.style.height = "100%";

			tmpCell.appendChild(tmpTable);

			var divLogoID = this.CONST_DIVLOGOID + suffix;
			this.divLogo = document.createElement("div");
			this.divLogo.id = divLogoID;

			this.divLogo.setAttribute("class", "pddLogo");
			this.divLogo.style.display = "table-cell";
			this.divLogo.style.width = "150px";
			this.divLogo.style.boxShadow = "2px 0 4px -1px #cccccc";

			tmpTable.appendChild(this.divLogo);

			var divTitleID = this.CONST_DIVTITLEID + suffix;
			this.divTitle = document.createElement("div");
			this.divTitle.id = divTitleID;

			this.divTitle.setAttribute("class", "pddTitle");
			this.divTitle.style.display = "table-cell";
			this.divTitle.style.width = "250px";
			this.divTitle.innerHTML = "流程标题";

			tmpTable.appendChild(this.divTitle);

			var divSearchID = this.CONST_DIVSEARCHID + suffix;
			this.divSearch = document.createElement("div");
			this.divSearch.id = divSearchID;

			this.divSearch.style.display = "table-cell";
			this.divSearch.style.backgroundImage = "url('src/res/ic_search_black_18dp.png')";
			this.divSearch.style.backgroundPosition = "right";
			this.divSearch.style.backgroundRepeat = "no-repeat";

			tmpTable.appendChild(this.divSearch);

			var tmpSplitCell = document.createElement("div");

			tmpSplitCell.style.display = "table-cell";
			tmpSplitCell.style.width = "5px";

			tmpTable.appendChild(tmpSplitCell);

			var divNotificationID = this.CONST_DIVNOTIFICATIONID + suffix;
			this.divNotification = document.createElement("div");
			this.divNotification.id = divNotificationID;

			this.divNotification.style.display = "table-cell";
			this.divNotification.style.width = "150px";

			tmpTable.appendChild(this.divNotification);

			var divUserID = this.CONST_DIVUSERID + suffix;
			this.divUser = document.createElement("div");
			this.divUser.id = divUserID;

			this.divUser.style.display = "table-cell";
			this.divUser.style.width = "50px";
			this.divUser.style.backgroundImage = "url('src/res/ic_person_black_18dp.png')";
			this.divUser.style.backgroundPosition = "center";
			this.divUser.style.backgroundRepeat = "no-repeat";
			this.divUser.style.cursor = "pointer";

			tmpTable.appendChild(this.divUser);

			tmpTable = document.createElement("div");

			tmpTable.style.display = "table";
			tmpTable.style.width = "100%";
			tmpTable.style.height = "100%";

			this.divNotification.appendChild(tmpTable);

			tmpRow = document.createElement("div");

			tmpRow.style.display = "table-row";

			tmpTable.appendChild(tmpRow);

			divQuestion = document.createElement("div");

			divQuestion.style.display = "table-cell";
			divQuestion.style.width = "50px";
			divQuestion.style.backgroundColor = "#ffffff";
			divQuestion.style.backgroundImage = "url('src/res/ic_question_answer_black_18dp.png')";
			divQuestion.style.backgroundPosition = "center";
			divQuestion.style.backgroundRepeat = "no-repeat";
			divQuestion.style.cursor = "pointer";

			tmpRow.appendChild(divQuestion);

			divMessage = document.createElement("div");

			divMessage.style.display = "table-cell";
			divMessage.style.width = "50px";
			divMessage.style.backgroundColor = "#ffffff";
			divMessage.style.backgroundImage = "url('src/res/ic_notifications_black_18dp.png')";
			divMessage.style.backgroundPosition = "center";
			divMessage.style.backgroundRepeat = "no-repeat";
			divMessage.style.cursor = "pointer";

			tmpRow.appendChild(divMessage);

			divSetting = document.createElement("div");

			divSetting.style.display = "table-cell";
			divSetting.style.width = "50px";
			divSetting.style.backgroundColor = "#ffffff";
			divSetting.style.backgroundImage = "url('src/res/ic_settings_black_18dp.png')";
			divSetting.style.backgroundPosition = "center";
			divSetting.style.backgroundRepeat = "no-repeat";
			divSetting.style.cursor = "pointer";

			tmpRow.appendChild(divSetting);
		}

		//获取设计器主体DIV
		var divBodyID = this.CONST_DIVBODYID + suffix;
		this.divBody = document.getElementById(divBodyID);

		if (this.isEmpty(this.divBody)) {
			tmpRow = document.createElement("div");

			tmpRow.style.display = "table-row";

			this.divMain.appendChild(tmpRow);

			this.divBody = document.createElement("div");
			this.divBody.id = divBodyID;

			this.divBody.style.display = "table-cell";
			this.divBody.style.padding = "0px 0";

			tmpRow.appendChild(this.divBody);
		}

		//获取设计器内容DIV
		var divContentID = this.CONST_DIVCONTENTID + suffix;
		this.divContent = document.getElementById(divContentID);

		if (this.isEmpty(this.divContent)) {
			this.divContent = document.createElement("div");
			this.divContent.id = divContentID;

			this.divContent.style.display = "table";
			this.divContent.style.width = "100%";
			this.divContent.style.height = "100%";

			this.divBody.appendChild(this.divContent);
		}

		//获取画板DIV
		var divGraphID = this.CONST_DIVGRAPHID + suffix;
		this.divGraph = document.getElementById(divGraphID);

		if (this.isEmpty(this.divGraph)) {
			var tmpCell = document.createElement("div");

			tmpCell.style.display = "table-cell";

			this.divContent.appendChild(tmpCell);

			this.divGraph = document.createElement("div");
			this.divGraph.id = divGraphID;

			this.divGraph.style.width = "100%";
			this.divGraph.style.height = "100%";

			tmpCell.appendChild(this.divGraph);
		}

		//获取画布DIV
		var divCanvasID = this.CONST_DIVCANVASID + suffix;
		this.divCanvas = document.getElementById(divCanvasID);

		if (this.isEmpty(this.divCanvas)) {
			this.divCanvas = document.createElement("div");
			this.divCanvas.id = divCanvasID;

			this.divCanvas.style.display = "none";
			this.divCanvas.style.width = "100%";
			this.divCanvas.style.height = this.CONST_FLATBUTTON_SIZE + this.CONST_SIZEUNIT;
			this.divCanvas.style.minHeight = this.CONST_FLATBUTTON_SIZE + this.CONST_SIZEUNIT;
			this.divCanvas.style.maxHeight = this.CONST_FLATBUTTON_SIZE + this.CONST_SIZEUNIT;

			ctrlDOM.appendChild(this.divCanvas);
		}

		//初始化mxGraph画板
		this.graph = new mxGraph(this.divGraph);

		if (this.isEmpty(this.graph)) {
			console.error({ msg: "创建mxGraph画板失败", param: this.divGraph });

			return;
		}

		this.graph[this.CONST_ATTRIBUTE_DESIGNERID] = this.designerID;

		this.graph.pdd = this;

		//设置画板元件可连接
		this.graph.setConnectable(true);

		//画板连接线标签设置为不可移动
		this.graph.edgeLabelsMovable = false;

		//增加画板鼠标点击监听
		this.graph.addListener(mxEvent.CLICK, function (sender, evt) {
			if (!this.pdd) return;
			var pdd = this.pdd;

			pdd.clickGraph(sender, evt);
		});

		//增加画板元件移动监听
		this.graph.addListener(mxEvent.MOVE_CELLS, function (sender, evt) {
			if (!this.pdd) return;
			var pdd = this.pdd;

			pdd.graphCellsMoved(sender, evt);
		});

		//按Eas键取消当前选中的工具箱元件恢复成选中指针工具箱元件
		this.graph.addListener(mxEvent.ESCAPE, function (sender, evt) {
			if (!this.pdd) return;
			var pdd = this.pdd;

			pdd.graphKeyEscape(sender, evt);
		});

		//屏蔽双击画板元件编辑元件标签的功能
		this.graph.setCellsEditable(false);

		this.graphModel = this.graph.getModel();

		this.graphModel.pdd = this;

		//动画展示画板内的变动
		this.graphModel.addListener(mxEvent.CHANGE, function (sender, evt) {
			if (!this.pdd) return;
			var pdd = this.pdd;

			pdd.graphChange(sender, evt);
		});

		var graphModelRoot = this.graphModel.root;

		if (this.isEmpty(graphModelRoot)) {
			console.error({ msg: "获取mgGraphModelRoot画板模型根项失败", param: this.graphModel });

			return;
		}

		graphModelRoot[this.CONST_ATTRIBUTE_DESIGNERID] = this.designerID;

		this.graphParent = this.graph.getDefaultParent();

		this.graphStylesheet = this.graph.getStylesheet();

		//创建连接线样式_自动
		if (this.isEmpty(mxStyleRegistry.getValue(this.CONST_EDGE_STYLE_AUTO.toString()))) {
			mxEdgeStyle.AutoStyle = function (state, source, target, points, result) {

				var sourceCellBounds = source ? source.getCellBounds() : null;
				var targetCellBounds = target ? target.getCellBounds() : null;

				if (!(sourceCellBounds && targetCellBounds)) return;

				var sourceCellY = sourceCellBounds.getCenterY();
				var sourceCellHeight = sourceCellBounds.height;

				var targetCellY = targetCellBounds.getCenterY();
				var targetCellHeight = targetCellBounds.height;

				var yDiff = sourceCellY - targetCellY;

				if (yDiff >= 0) {
					if (yDiff > targetCellHeight + 30) {
						mxEdgeStyle.TopToBottom(state, source, target, points, result);
					} else {
						mxEdgeStyle.EntityRelation(state, source, target, points, result);
					}
				} else {
					if (Math.abs(yDiff) > sourceCellHeight + 30) {
						mxEdgeStyle.TopToBottom(state, source, target, points, result);
					} else {
						mxEdgeStyle.EntityRelation(state, source, target, points, result);
					}
				}
			};

			mxStyleRegistry.putValue(this.CONST_EDGE_STYLE_AUTO.toString(), mxEdgeStyle.AutoStyle);
		}

		//画板元件默认样式
		var defaultMGVertexStyle = this.graphStylesheet.getDefaultVertexStyle();

		defaultMGVertexStyle[mxConstants.STYLE_STROKECOLOR] = this.CONST_STYLE_VERTEX_STROKECOLOR;
		defaultMGVertexStyle[mxConstants.STYLE_FILLCOLOR] = this.CONST_STYLE_VERTEX_FILLCOLOR;
		defaultMGVertexStyle[mxConstants.STYLE_SHADOW] = this.CONST_STYLE_VERTEX_SHADOW;
		defaultMGVertexStyle[mxConstants.STYLE_STROKEWIDTH] = this.CONST_STYLE_VERTEX_STROKEWIDTH;
		defaultMGVertexStyle[mxConstants.STYLE_FONTCOLOR] = this.CONST_STYLE_VERTEX_FONTCOLOR;
		defaultMGVertexStyle[mxConstants.STYLE_FONTSIZE] = this.CONST_STYLE_VERTEX_FONTSIZE;
		defaultMGVertexStyle[mxConstants.STYLE_FONTSTYLE] = this.CONST_STYLE_VERTEX_FONTSTYLE;

		this.graphStylesheet.putDefaultVertexStyle(defaultMGVertexStyle);

		var defaultMGEdgeStyle = this.graphStylesheet.getDefaultEdgeStyle();

		defaultMGEdgeStyle[mxConstants.STYLE_SHADOW] = this.CONST_STYLE_EDGE_SHADOW;
		defaultMGEdgeStyle[mxConstants.STYLE_STROKEWIDTH] = this.CONST_STYLE_EDGE_STROKEWIDTH;
		defaultMGEdgeStyle[mxConstants.STYLE_STROKECOLOR] = this.CONST_STYLE_EDGE_STROKECOLOR;
		defaultMGEdgeStyle[mxConstants.STYLE_LABEL_BACKGROUNDCOLOR] = this.CONST_STYLE_EDGE_STROKECOLOR;
		defaultMGEdgeStyle[mxConstants.STYLE_FONTCOLOR] = this.CONST_STYLE_EDGE_FONTCOLOR;
		defaultMGEdgeStyle[mxConstants.STYLE_FONTSIZE] = this.CONST_STYLE_EDGE_FONTSIZE;
		defaultMGEdgeStyle[mxConstants.STYLE_FONTSTYLE] = this.CONST_STYLE_EDGE_FONTSTYLE;
		defaultMGEdgeStyle[mxConstants.STYLE_EDGE] = this.CONST_EDGE_STYLE_AUTO;
		defaultMGEdgeStyle[mxConstants.STYLE_ROUNDED] = this.CONST_STYLE_EDGE_ROUNDED;

		this.graphStylesheet.putDefaultEdgeStyle(defaultMGEdgeStyle);

		this.graphSelectionModel = this.graph.getSelectionModel();

		this.graphSelectionModel.pdd = this;

		//增加画板元件选择监听
		this.graphSelectionModel.addListener(mxEvent.CHANGE, function (sender, evt) {
			if (!this.pdd) return;
			var pdd = this.pdd;

			pdd.graphCellSelected(sender, evt);
		});

		this.graphView = this.graph.getView();

		//初始化剪贴板
		this.setClipboardCells(null);

		//创建画板撤销管理器
		this.undoManager = new mxUndoManager(this.CONST_UNDOHISTORYSIZE);

		this.undoManager.clear();

		var undoListener = function (sender, evt) {
			if (!(sender && evt)) return;

			var pdd = sender.pdd ? sender.pdd : this;
			var evtEdit = evt.getProperty("edit");

			if (!(pdd && evtEdit)) return;

			pdd.undoManager.undoableEditHappened(evtEdit);

			pdd.refreshUndoRedo();
		};

		this.graphModel.addListener(mxEvent.UNDO, undoListener);
		this.graphView.addListener(mxEvent.UNDO, undoListener);

		if (!this.checkGraph()) return;

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

		//画板元件启用旋转
		mxVertexHandler.prototype.rotationEnabled = true;

		//画板旋转，调整大小控制器尺寸
		mxConstants.HANDLE_SIZE = this.CONST_GRAPH_HANDLESIZE;

		//画板圆角矩形弧度
		mxConstants.RECTANGLE_ROUNDING_FACTOR = 0.25;

		//实时预览画板元件旋转，调整大小后的结果
		mxVertexHandler.prototype.livePreview = true;

		//如果有定义画板旋转，调整大小控制图标，则使用定义的图标
		if (!this.isEmptyString(this.CONST_GRAPH_HANDLEIMAGE)) {
			var handleImage = new mxImage(this.CONST_GRAPH_HANDLEIMAGE, this.CONST_GRAPH_HANDLEIMAGEWIDTH, this.CONST_GRAPH_HANDLEIMAGEHEIGHT);

			//画板节点元件控制器图标
			mxVertexHandler.prototype.handleImage = handleImage;
			//画板连接线元件控制器图标
			mxEdgeHandler.prototype.handleImage = handleImage;
		}

		if (!this.isEmptyString(this.CONST_GRAPH_SIZERIMAGE)) {
			var sizerImage = new mxImage(this.CONST_GRAPH_SIZERIMAGE, this.CONST_GRAPH_SIZERIMAGEWIDTH, this.CONST_GRAPH_SIZERIMAGEHEIGHT);

			//画板大纲元件控制器图标
			mxOutline.prototype.sizerImage = sizerImage;
		}

		//启用画板元件移动时显示标尺
		mxGraphHandler.prototype.guidesEnabled = true;

		//画板元件移动时标尺颜色
		mxConstants.GUIDE_COLOR = this.CONST_GUIDE_COLOR;

		//画板元件移动时标尺线条宽度
		mxConstants.GUIDE_STROKEWIDTH = this.CONST_GUIDE_STROKEWIDTH;

		//启用画板单击拖选框
		this.rubberband = new mxRubberband(this.graph);

		//增加画板按键控制器
		this.keyHandler = new mxKeyHandler(this.graph);

		this.keyHandler[this.CONST_ATTRIBUTE_DESIGNERID] = this.designerID;

		if (this.isEmpty(this.keyHandler)) {
			console.error({ msg: "创建mxKeyHandler按键控制器失败", param: this.graph });

			return;
		}

		//按Del键时执行删除选中的画板元件
		this.keyHandler.bindKey(46, function (evt) {
			if (!evt.pdd) return;
			var pdd = evt.pdd;

			pdd.deleteSelectedGraphCells();

			//触发按钮悬停效果
			if (pdd.isEmpty(pdd.divDelete)) {
				console.error({ msg: "获取删除工具栏" + pdd.CONST_DIV_MGDELETE + "按钮失败", param: pdd.designerID });
				return;
			}

			pdd.triggerFlatButtonHover(pdd.divDelete, pdd.CONST_HOVERTIMEOUT);
		});

		//按Ctrl+A键时执行选中所有画板元件
		this.keyHandler.bindControlKey(65, function (evt) {
			if (!evt.pdd) return;
			var pdd = evt.pdd;

			pdd.selectAllGraphCells();
		});

		//按方向键移动选中的画板元件
		var moveKeyDownFunc = function (evt) {
			if (!evt.pdd) return;
			var pdd = evt.pdd;

			if (!pdd.isNumber(evt.keyCode)) return;

			pdd.selectedGraphCellsMove(evt.keyCode);
		};

		//左
		this.keyHandler.bindKey(37, moveKeyDownFunc);

		//上
		this.keyHandler.bindKey(38, moveKeyDownFunc);

		//右
		this.keyHandler.bindKey(39, moveKeyDownFunc);

		//下
		this.keyHandler.bindKey(40, moveKeyDownFunc);

		var divBodyRect = this.divBody.getBoundingClientRect();

		var divBodyWidth = this.isEmpty(divBodyRect) ? null : divBodyRect.width;

		if (!this.isNumber(divBodyWidth)) divBodyWidth = 0;

		if (divBodyWidth > 0) {
			//创建工具箱
			this.createToolBox();

			var moveOnClickFunc = function () {
				var pdd = this.pdd ? this.pdd : this;

				if (!pdd) return;

				var keyCode = this.getAttribute(pdd.CONST_ATTRIBUTE_KEYCODE);

				if (pdd.isEmptyString(keyCode)) return;

				keyCode = Number(keyCode);

				if (!pdd.isNumber(keyCode)) return;

				pdd.selectedGraphCellsMove(keyCode);
			};

			//创建向上移动按钮
			this.divMoveUp = this.createFlatButton(this.CONST_DIVMOVEUPID, null, "res/ic_arrow_upward_black_18dp.png", null, moveOnClickFunc);

			if (this.isEmpty(this.divMoveUp)) {
				console.error("创建DIV元素" + this.CONST_DIVMOVEUPID + "失败");

				return;
			}

			this.divMoveUp.style.borderRadius = this.CONST_CSS_CIRCULARBORDERRADIUS;
			this.divMoveUp.title = "向上移动";
			this.divMoveUp.setAttribute(this.CONST_ATTRIBUTE_KEYCODE, "38");

			this.divBody.appendChild(this.divMoveUp);

			//创建向下移动按钮
			this.divMoveDown = this.createFlatButton(this.CONST_DIVMOVEDOWNID, null, "res/ic_arrow_downward_black_18dp.png", null, moveOnClickFunc);

			if (this.isEmpty(this.divMoveDown)) {
				console.error("创建DIV元素" + this.CONST_DIVMOVEDOWNID + "失败");

				return;
			}

			this.divMoveDown.style.borderRadius = this.CONST_CSS_CIRCULARBORDERRADIUS;
			this.divMoveDown.title = "向下移动";
			this.divMoveDown.setAttribute(this.CONST_ATTRIBUTE_KEYCODE, "40");

			this.divBody.appendChild(this.divMoveDown);

			//创建向左移动按钮
			this.divMoveLeft = this.createFlatButton(this.CONST_DIVMOVELEFTID, null, "res/ic_arrow_back_black_18dp.png", null, moveOnClickFunc);

			if (this.isEmpty(this.divMoveLeft)) {
				console.error("创建DIV元素" + this.CONST_DIVMOVELEFTID + "失败");

				return;
			}

			this.divMoveLeft.style.borderRadius = this.CONST_CSS_CIRCULARBORDERRADIUS;
			this.divMoveLeft.title = "向左移动";
			this.divMoveLeft.setAttribute(this.CONST_ATTRIBUTE_KEYCODE, "37");

			this.divBody.appendChild(this.divMoveLeft);

			//创建向右移动按钮
			this.divMoveRight = this.createFlatButton(this.CONST_DIVMOVERIGHTID, null, "res/ic_arrow_forward_black_18dp.png", null, moveOnClickFunc);

			if (this.isEmpty(this.divMoveRight)) {
				console.error("创建DIV元素" + this.CONST_DIVMOVERIGHTID + "失败");

				return;
			}

			this.divMoveRight.style.borderRadius = this.CONST_CSS_CIRCULARBORDERRADIUS;
			this.divMoveRight.title = "向右移动";
			this.divMoveRight.setAttribute(this.CONST_ATTRIBUTE_KEYCODE, "39");

			this.divBody.appendChild(this.divMoveRight);

			//创建帮助按钮
			this.divHelp = this.createFlatButton(this.CONST_DIVHELPID, this.CONST_CANVASTYPE_HELP);

			if (this.isEmpty(this.divHelp)) {
				console.error("创建DIV元素" + this.CONST_DIVHELPID + "失败");

				return;
			}

			this.divHelp.style.borderRadius = this.CONST_CSS_CIRCULARBORDERRADIUS;
			this.divHelp.title = "帮助";

			this.divBody.appendChild(this.divHelp);

			//创建工具栏按钮组
			this.divToolbar = this.createFlatButtonGroup(this.CONST_DIVTOOLBARID);

			if (this.isEmpty(this.divToolbar)) {
				console.error("创建DIV元素" + this.CONST_DIVTOOLBARID + "失败");

				return;
			}

			this.divBody.appendChild(this.divToolbar);

			//创建撤销按钮
			this.divUndo = this.createFlatButtonGroupChild(this.divToolbar, this.CONST_DIVUNDOID, null, "res/ic_undo_black_18dp.png", "", this.CONST_CSSSTYLE_BUTTONDISABLED, "撤销", null, null, null, null, this.undo);

			if (this.isEmpty(this.divUndo)) {
				console.error("创建DIV元素" + this.CONST_DIVUNDOID + "失败");

				return;
			}

			//创建重置按钮
			this.divRedo = this.createFlatButtonGroupChild(this.divToolbar, this.CONST_DIVREDOID, null, "res/ic_redo_black_18dp.png", "", this.CONST_CSSSTYLE_BUTTONDISABLED, "重置", null, null, null, null, this.redo);

			if (this.isEmpty(this.divRedo)) {
				console.error("创建DIV元素" + this.CONST_DIVREDOID + "失败");

				return;
			}

			//创建复制按钮
			this.divCopy = this.createFlatButtonGroupChild(this.divToolbar, this.CONST_DIVCOPYID, null, "res/ic_content_copy_black_18dp.png", "", this.CONST_CSSSTYLE_BUTTONDISABLED, "复制", null, null, null, null, this.copy);

			if (this.isEmpty(this.divCopy)) {
				console.error("创建DIV元素" + this.CONST_DIVCOPYID + "失败");

				return;
			}

			//创建剪贴按钮
			this.divCut = this.createFlatButtonGroupChild(this.divToolbar, this.CONST_DIVCUTID, null, "res/ic_content_cut_black_18dp.png", "", this.CONST_CSSSTYLE_BUTTONDISABLED, "剪贴", null, null, null, null, this.cut);

			if (this.isEmpty(this.divCut)) {
				console.error("创建DIV元素" + this.CONST_DIVCUTID + "失败");

				return;
			}

			//创建粘贴按钮
			this.divPaste = this.createFlatButtonGroupChild(this.divToolbar, this.CONST_DIVPASTEID, null, "res/ic_content_paste_black_18dp.png", "", this.CONST_CSSSTYLE_BUTTONDISABLED, "粘贴", null, null, null, null, this.paste);

			if (this.isEmpty(this.divPaste)) {
				console.error("创建DIV元素" + this.CONST_DIVPASTEID + "失败");

				return;
			}

			//创建删除按钮
			this.divDelete = this.createFlatButtonGroupChild(this.divToolbar, this.CONST_DIVDELETEID, null, "res/ic_delete_black_18dp.png", "", this.CONST_CSSSTYLE_BUTTON, "删除", null, null, null, null, this.deleteSelectedGraphCells);

			if (this.isEmpty(this.divDelete)) {
				console.error("创建DIV元素" + this.CONST_DIVDELETEID + "失败");

				return;
			}

			//创建连接线样式按钮组
			var connectorStyleOnClickFunc = function () {
				var pdd = this.pdd ? this.pdd : this;

				if (!pdd) return;

				var connectorStyle = this.getAttribute(pdd.CONST_ATTRIBUTE_CONNECTORSTYLE);

				if (pdd.isEmptyString(connectorStyle)) return;

				pdd.setConnectorStyle(connectorStyle);
			};

			this.divConnectorStyle = this.createFlatButtonGroup(this.CONST_DIVCONNECTORSTYLEID);

			if (this.isEmpty(this.divConnectorStyle)) {
				console.error("创建DIV元素" + this.CONST_DIVCONNECTORSTYLEID + "失败");

				return;
			}

			this.divBody.appendChild(this.divConnectorStyle);

			if (this.isEmpty(this.connectorStyleCells)) this.connectorStyleCells = new Array();

			//创建连接线样式_自动按钮
			this.divConnectorStyleAuto = this.createFlatButtonGroupChild(this.divConnectorStyle, this.CONST_DIVCONNECTORSTYLEAUTOID, this.CONST_CANVASTYPE_CONNECTOR_AUTO, "", "", this.CONST_CSSSTYLE_BUTTON, "自动", null, null, null, null, connectorStyleOnClickFunc);

			if (this.isEmpty(this.divConnectorStyleAuto)) {
				console.error("创建DIV元素" + this.CONST_DIVCONNECTORSTYLEAUTOID + "失败");

				return;
			}

			this.divConnectorStyleAuto.setAttribute(this.CONST_ATTRIBUTE_CONNECTORSTYLE, this.CONST_EDGE_STYLE_AUTO);

			this.connectorStyleCells.push(this.divConnectorStyleAuto);

			//创建连接线样式_关联按钮
			this.divConnectorStyleRelation = this.createFlatButtonGroupChild(this.divConnectorStyle, this.CONST_DIVCONNECTORSTYLERELATIONID, this.CONST_CANVASTYPE_CONNECTOR_RELATION, "", "", this.CONST_CSSSTYLE_BUTTON, "关联", null, null, null, null, connectorStyleOnClickFunc);

			if (this.isEmpty(this.divConnectorStyleRelation)) {
				console.error("创建DIV元素" + this.CONST_DIVCONNECTORSTYLERELATIONID + "失败");

				return;
			}

			this.divConnectorStyleRelation.setAttribute(this.CONST_ATTRIBUTE_CONNECTORSTYLE, mxConstants.EDGESTYLE_ENTITY_RELATION);

			this.connectorStyleCells.push(this.divConnectorStyleRelation);

			//创建连接线样式_侧边对侧边按钮
			this.divConnectorStyleSideToSide = this.createFlatButtonGroupChild(this.divConnectorStyle, this.CONST_DIVCONNECTORSTYLESIDETOSIDEID, this.CONST_CANVASTYPE_CONNECTOR_SIDETOSIDE, "", "", this.CONST_CSSSTYLE_BUTTON, "侧边对侧边", null, null, null, null, connectorStyleOnClickFunc);

			if (this.isEmpty(this.divConnectorStyleSideToSide)) {
				console.error("创建DIV元素" + this.CONST_DIVCONNECTORSTYLESIDETOSIDEID + "失败");

				return;
			}

			this.divConnectorStyleSideToSide.setAttribute(this.CONST_ATTRIBUTE_CONNECTORSTYLE, mxConstants.EDGESTYLE_SIDETOSIDE);

			this.connectorStyleCells.push(this.divConnectorStyleSideToSide);

			//创建连接线样式_上下连接按钮
			this.divConnectorStyleTopToBottom = this.createFlatButtonGroupChild(this.divConnectorStyle, this.CONST_DIVCONNECTORSTYLETOPTOBOTTOMID, this.CONST_CANVASTYPE_CONNECTOR_TOPTOBOTTOM, "", "", this.CONST_CSSSTYLE_BUTTON, "上下连接", null, null, null, null, connectorStyleOnClickFunc);

			if (this.isEmpty(this.divConnectorStyleTopToBottom)) {
				console.error("创建DIV元素" + this.CONST_DIVCONNECTORSTYLETOPTOBOTTOMID + "失败");

				return;
			}

			this.divConnectorStyleTopToBottom.setAttribute(this.CONST_ATTRIBUTE_CONNECTORSTYLE, mxConstants.EDGESTYLE_TOPTOBOTTOM);

			this.connectorStyleCells.push(this.divConnectorStyleTopToBottom);

			//创建连接线样式_环按钮
			this.divConnectorStyleLoop = this.createFlatButtonGroupChild(this.divConnectorStyle, this.CONST_DIVCONNECTORSTYLELOOPID, this.CONST_CANVASTYPE_CONNECTOR_LOOP, "", "", this.CONST_CSSSTYLE_BUTTON, "环", null, null, null, null, connectorStyleOnClickFunc);

			if (this.isEmpty(this.divConnectorStyleLoop)) {
				console.error("创建DIV元素" + this.CONST_DIVCONNECTORSTYLELOOPID + "失败");

				return;
			}

			this.divConnectorStyleLoop.setAttribute(this.CONST_ATTRIBUTE_CONNECTORSTYLE, mxConstants.EDGESTYLE_LOOP);

			this.connectorStyleCells.push(this.divConnectorStyleLoop);

			//创建连接线样式_正交按钮
			this.divConnectorStyleOrthogonal = this.createFlatButtonGroupChild(this.divConnectorStyle, this.CONST_DIVCONNECTORSTYLEORTHOGONALID, this.CONST_CANVASTYPE_CONNECTOR_ORTHOGONAL, "", "", this.CONST_CSSSTYLE_BUTTON, "正交", null, null, null, null, connectorStyleOnClickFunc);

			if (this.isEmpty(this.divConnectorStyleOrthogonal)) {
				console.error("创建DIV元素" + this.CONST_DIVCONNECTORSTYLEORTHOGONALID + "失败");

				return;
			}

			this.divConnectorStyleOrthogonal.setAttribute(this.CONST_ATTRIBUTE_CONNECTORSTYLE, mxConstants.EDGESTYLE_ORTHOGONAL);

			this.connectorStyleCells.push(this.divConnectorStyleOrthogonal);

			//创建连接线样式_分割按钮
			this.divConnectorStyleSegment = this.createFlatButtonGroupChild(this.divConnectorStyle, this.CONST_DIVCONNECTORSTYLESEGMENTID, this.CONST_CANVASTYPE_CONNECTOR_SEGMENT, "", "", this.CONST_CSSSTYLE_BUTTON, "分割", null, null, null, null, connectorStyleOnClickFunc);

			if (this.isEmpty(this.divConnectorStyleSegment)) {
				console.error("创建DIV元素" + this.CONST_DIVCONNECTORSTYLESEGMENTID + "失败");

				return;
			}

			this.divConnectorStyleSegment.setAttribute(this.CONST_ATTRIBUTE_CONNECTORSTYLE, mxConstants.EDGESTYLE_SEGMENT);

			this.connectorStyleCells.push(this.divConnectorStyleSegment);

			//隐藏连接线样式浮动按钮组
			this.switchFlatButtonGroup(this.divConnectorStyle, false);

			//创建缩放按钮组
			this.divZoom = this.createFlatButtonGroup(this.CONST_DIVZOOMID);

			if (this.isEmpty(this.divZoom)) {
				console.error("创建DIV元素" + this.CONST_DIVZOOMID + "失败");

				return;
			}

			this.divBody.appendChild(this.divZoom);

			//创建缩小按钮
			var zoomOutOnClickFunc = function () {
				//画板缩小
				if (!this.pdd) return;
				var pdd = this.pdd;

				pdd.graphZoomOut();
			};

			this.divZoomOut = this.createFlatButtonGroupChild(this.divZoom, this.CONST_DIVZOOMOUTID, this.CONST_CANVASTYPE_ZOOMOUT, "res/ic_zoom_out_black_18dp.png", "", this.CONST_CSSSTYLE_BUTTON, "缩小", null, null, null, null, zoomOutOnClickFunc);

			if (this.isEmpty(this.divZoomOut)) {
				console.error("创建DIV元素" + this.CONST_DIVZOOMOUTID + "失败");

				return;
			}

			var divZoomOutShadow = this.createFlatButtonGroupChild(this.divZoom, this.CONST_DIVZOOMOUTID + this.CONST_SUFFIX_SHADOW);

			if (this.isEmpty(divZoomOutShadow)) {
				console.error("创建DIV元素" + this.CONST_DIVZOOMOUTID + "失败");

				return;
			}

			divZoomOutShadow.style.width = this.CONST_FLATBUTTONGROUP_SHADOWSIZE + this.CONST_SIZEUNIT;
			divZoomOutShadow.style.minWidth = this.CONST_FLATBUTTONGROUP_SHADOWSIZE + this.CONST_SIZEUNIT;
			divZoomOutShadow.style.maxWidth = this.CONST_FLATBUTTONGROUP_SHADOWSIZE + this.CONST_SIZEUNIT;

			//创建缩放比例按钮
			var graphScale = this.isNumber(this.graphView.scale) ? this.graphView.scale <= 0 ? 1 : this.graphView.scale : 1;

			this.divZoomSize = this.createFlatButtonGroupChild(this.divZoom, this.CONST_DIVZOOMSIZEID, "", "", (graphScale * 100) + "%", this.CONST_CSSSTYLE_BUTTON, "缩放比例");

			if (this.isEmpty(this.divZoomSize)) {
				console.error("创建DIV元素" + this.CONST_DIVZOOMSIZEID + "失败");

				return;
			}

			this.divZoomSize.style.height = this.CONST_FLATBUTTON_SIZE + this.CONST_SIZEUNIT;
			this.divZoomSize.style.width = (this.CONST_FLATBUTTON_SIZE * 3) + this.CONST_SIZEUNIT;

			//创建放大按钮
			var divZoomInShadow = this.createFlatButtonGroupChild(this.divZoom, this.CONST_DIVZOOMINID + this.CONST_SUFFIX_SHADOW);

			if (this.isEmpty(divZoomInShadow)) {
				console.error("创建DIV元素" + this.CONST_DIVZOOMINID + "失败");

				return;
			}

			divZoomInShadow.style.width = this.CONST_FLATBUTTONGROUP_SHADOWSIZE + this.CONST_SIZEUNIT;
			divZoomInShadow.style.minWidth = this.CONST_FLATBUTTONGROUP_SHADOWSIZE + this.CONST_SIZEUNIT;
			divZoomInShadow.style.maxWidth = this.CONST_FLATBUTTONGROUP_SHADOWSIZE + this.CONST_SIZEUNIT;

			var zoomInOnClickFunc = function () {
				//画板放大
				if (!this.pdd) return;
				var pdd = this.pdd;

				pdd.graphZoomIn();
			};

			this.divZoomIn = this.createFlatButtonGroupChild(this.divZoom, this.CONST_DIVZOOMINID, this.CONST_CANVASTYPE_ZOOMIN, "res/ic_zoom_in_black_18dp.png", "", this.CONST_CSSSTYLE_BUTTON, "放大", null, null, null, null, zoomInOnClickFunc);

			if (this.isEmpty(this.divZoomIn)) {
				console.error("创建DIV元素" + this.CONST_DIVZOOMINID + "失败");

				return;
			}

			this.graphZoomTo(1);

			//创建透明度按钮组
			this.divOpacity = this.createFlatButtonGroup(this.CONST_DIVOPACITYID);

			if (this.isEmpty(this.divOpacity)) {
				console.error("创建DIV元素" + this.CONST_DIVOPACITYID + "失败");

				return;
			}

			this.divBody.appendChild(this.divOpacity);

			//创建透明度减少按钮
			var opacityIncreaseOnClickFunc = function () {
				if (!this.pdd) return;
				var pdd = this.pdd;

				pdd.setGraphSelectedCellsOpacity(pdd.CONST_GRAPH_OPACITYSTEP);
			};

			this.divOpacityIncrease = this.createFlatButtonGroupChild(this.divOpacity, this.CONST_DIVOPACITYINCREASEID, null, "res/ic_opacity_increase_black_18dp.png", "", this.CONST_CSSSTYLE_BUTTON, "减少透明度", null, null, null, null, opacityIncreaseOnClickFunc);

			if (this.isEmpty(this.divOpacityIncrease)) {
				console.error("创建DIV元素" + this.CONST_DIVOPACITYINCREASEID + "失败");

				return;
			}

			var divOpacityIncreaseShadow = this.createFlatButtonGroupChild(this.divOpacity, this.CONST_DIVOPACITYINCREASEID + this.CONST_SUFFIX_SHADOW);

			if (this.isEmpty(divOpacityIncreaseShadow)) {
				console.error("创建DIV元素" + this.CONST_DIVOPACITYINCREASEID + "失败");

				return;
			}

			divOpacityIncreaseShadow.style.width = this.CONST_FLATBUTTONGROUP_SHADOWSIZE + this.CONST_SIZEUNIT;
			divOpacityIncreaseShadow.style.minWidth = this.CONST_FLATBUTTONGROUP_SHADOWSIZE + this.CONST_SIZEUNIT;
			divOpacityIncreaseShadow.style.maxWidth = this.CONST_FLATBUTTONGROUP_SHADOWSIZE + this.CONST_SIZEUNIT;

			//创建透明度按钮
			this.divOpacityValue = this.createFlatButtonGroupChild(this.divOpacity, this.CONST_DIVOPACITYVALUEID, "", "", "-", this.CONST_CSSSTYLE_BUTTON, "透明度");

			if (this.isEmpty(this.divOpacityValue)) {
				console.error("创建DIV元素" + this.CONST_DIVOPACITYVALUEID + "失败");

				return;
			}

			this.divOpacityValue.style.height = this.CONST_FLATBUTTON_SIZE + this.CONST_SIZEUNIT;
			this.divOpacityValue.style.width = (this.CONST_FLATBUTTON_SIZE * 3) + this.CONST_SIZEUNIT;

			//透明度增加按钮
			var divOpacityDecreaseShadow = this.createFlatButtonGroupChild(this.divOpacity, this.CONST_DIVOPACITYDECREASEID + this.CONST_SUFFIX_SHADOW);

			if (this.isEmpty(divOpacityDecreaseShadow)) {
				console.error("创建DIV元素" + this.CONST_DIVOPACITYDECREASEID + "失败");

				return;
			}

			divOpacityDecreaseShadow.style.width = this.CONST_FLATBUTTONGROUP_SHADOWSIZE + this.CONST_SIZEUNIT;
			divOpacityDecreaseShadow.style.minWidth = this.CONST_FLATBUTTONGROUP_SHADOWSIZE + this.CONST_SIZEUNIT;
			divOpacityDecreaseShadow.style.maxWidth = this.CONST_FLATBUTTONGROUP_SHADOWSIZE + this.CONST_SIZEUNIT;

			var opacityDecreaseOnClickFunc = function () {
				if (!this.pdd) return;
				var pdd = this.pdd;

				pdd.setGraphSelectedCellsOpacity(pdd.CONST_GRAPH_OPACITYSTEP * -1);
			};

			this.divOpacityDecrease = this.createFlatButtonGroupChild(this.divOpacity, this.CONST_DIVOPACITYDECREASEID, null, "res/ic_opacity_decrease_black_18dp.png", "", this.CONST_CSSSTYLE_BUTTON, "增加透明度", null, null, null, null, opacityDecreaseOnClickFunc);

			if (this.isEmpty(this.divOpacityDecrease)) {
				console.error("创建DIV元素" + this.CONST_DIVOPACITYDECREASEID + "失败");

				return;
			}

			//隐藏透明度浮动按钮组
			this.switchFlatButtonGroup(this.divOpacity, false);

			//重新排列浮动元素
			this.arrangeFlatElement();
		}

		//初始化调试浮动按钮组
		this.initialDebugFlatButtonGroup();
	},
	/**
	 * @description 关闭
	 */
	destory: function () {
		var parentDIV = this.isEmpty(this.divCanvas) ? null : this.divCanvas.parentElement;

		if (!this.isEmpty(parentDIV)) {
			while (parentDIV.childElementCount > 0) {
				parentDIV.removeChild(parentDIV.children[0]);
			};
		}

	},
	/**
	 * @description 初始化调试浮动按钮组
	 */
	initialDebugFlatButtonGroup: function () {
		if (this.isEmpty(this.divDebug)) return;

		//创建调试浮动按钮组
		var divDebugGroup = this.createFlatButtonGroup("pddDebugGroup", this.CONST_FLATBUTTON_SIZE * 3, null, this.CONST_FLATBUTTONGROUP_HORIZONDIRECTION, true, 5);

		if (this.isEmpty(divDebugGroup)) {
			console.error("创建DIV元素mgDebug失败");

			return;
		}

		this.divDebug.appendChild(divDebugGroup);

		var debugGroupChildren = new Array();

		var debugShowXML = new Object();

		debugShowXML[this.CONST_ATTRIBUTE_FLATBUTTONID] = "pddDebugDisplayXML";
		debugShowXML[this.CONST_ATTRIBUTE_FLATBUTTONSTYLECLASS] = this.CONST_CSSSTYLE_BUTTON;
		debugShowXML[this.CONST_ATTRIBUTE_FLATBUTTONTEXT] = "显示XML";
		debugShowXML[this.CONST_ATTRIBUTE_FLATBUTTONTIPS] = "显示XML";
		debugShowXML[this.CONST_ATTRIBUTE_FLATBUTTONONCLICKFUNC] = function () {
			if (!this.pdd) return;
			var pdd = this.pdd;

			var xml = pdd.getXML();

			mxUtils.popup(pdd.isEmptyString(xml) ? "" : xml, true);
		};

		debugGroupChildren.push(debugShowXML);

		var debugImportFromXML = new Object();

		debugImportFromXML[this.CONST_ATTRIBUTE_FLATBUTTONID] = "pddDebugImportFromXML";
		debugImportFromXML[this.CONST_ATTRIBUTE_FLATBUTTONSTYLECLASS] = this.CONST_CSSSTYLE_BUTTON;
		debugImportFromXML[this.CONST_ATTRIBUTE_FLATBUTTONTEXT] = "从XML导入";
		debugImportFromXML[this.CONST_ATTRIBUTE_FLATBUTTONTIPS] = "从XML导入";
		debugImportFromXML[this.CONST_ATTRIBUTE_FLATBUTTONONCLICKFUNC] = function () {
			if (!this.pdd) return;
			var pdd = this.pdd;

			var xml = "<root>" +
				"<mxCell id='2' value='开始' style='vertex-style_rounded-rect' vertex='1' parent='1' graph-cell-id='2' graph-cell-type='rounded-rect' graph-cell-name='开始' graph-cell-opacity='20' graph-cell-mg-id='0012'>" +
				"<mxGeometry x='596' y='189' width='100' height='40' as='geometry'/>" +
				"</mxCell>" +
				"<mxCell id='4' value='判定' style='vertex-style_rhombus' vertex='1' parent='1' graph-cell-id='4' graph-cell-type='rhombus' graph-cell-name='判定' graph-cell-opacity='50' graph-cell-mg-id='0034' graph-cell-node-id='task'>" +
				"<mxGeometry x='1280' y='550' width='70' height='70' as='geometry'/>" +
				"</mxCell>" +
				"<mxCell id='5' value='子流程' style='vertex-style_swimlane' vertex='1' parent='1' graph-cell-id='5' graph-cell-type='swimlane' graph-cell-name='子流程' graph-cell-opacity='70' graph-cell-mg-id='0045'>" +
				"<mxGeometry x='746' y='220' width='394' height='220' as='geometry'/>" +
				"</mxCell>" +
				"<mxCell id='3' value='流程' style='vertex-style_rect' vertex='1' parent='5' graph-cell-id='3' graph-cell-type='rect' graph-cell-name='流程' graph-cell-opacity='100' graph-cell-mg-id='0023' graph-cell-node-type='任务'>" +
				"<mxGeometry x='184' y='110' width='100' height='40' as='geometry'/>" +
				"</mxCell>" +
				"<mxCell id='6' edge='1' parent='1' source='2' target='3' graph-cell-id='6' graph-cell-type='connector' graph-cell-name='' graph-cell-opacity='100'>" +
				"<mxGeometry relative='1' as='geometry'/>" +
				"</mxCell>" +
				"<mxCell id='7' edge='1' parent='1' source='3' target='4' graph-cell-id='7' graph-cell-type='connector' graph-cell-name='' graph-cell-opacity='60'>" +
				"<mxGeometry relative='1' as='geometry'/>" +
				"</mxCell>" +
				"<mxCell id='8' value='结束' style='vertex-style_rounded-rect' vertex='1' parent='1' graph-cell-id='8' graph-cell-type='rounded-rect' graph-cell-name='结束' graph-cell-opacity='100' graph-cell-mg-id='0018'>" +
				"<mxGeometry x='584' y='685' width='100' height='40' as='geometry'/>" +
				"</mxCell>" +
				"<mxCell id='9' edge='1' parent='1' source='4' target='8' graph-cell-id='9' graph-cell-type='connector' graph-cell-name='' graph-cell-opacity='40'>" +
				"<mxGeometry relative='1' as='geometry'/>" +
				"</mxCell>" +
				"<mxCell id='10' value='图形' style='vertex-style_toolbox-cell_image' vertex='1' parent='1' designer-id='Test' graph-cell-id='10' graph-cell-type='custom' graph-cell-node-type='图形' graph-cell-name='图形' graph-cell-opacity='100' graph-cell-mg-id='toolbox-cell_image-Test2' graph-cell-node-id='toolbox-cell_image' graph-cell-prop-form='' graph-cell-canvas-fill-color='' graph-cell-canvas-font-color='#336699' graph-cell-image='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAEsCAYAAAB5fY51AAAOSUlEQVR4Xu3cW5JUNxBF0WJynpDnH+GgbXADXVX3ISkfWvzw4Svl0T7JDowJf3v4gQACCOQn8Nfj8fj7W/6cEiKAwMYEPkT1eDy+//wgrI03wdMRSEzgF1H9yElYiRsTDYENCXwpKsLacBM8GYHEBF6KirASNycaAhsROCQqwtpoIzwVgYQETomKsBI2KBICGxC4JCrC2mAzPBGBRARuiYqwEjUpCgKNCQwRFWE13hBPQyABgaGiIqwEjYqAQEMCU0RFWA03xZMQCCQwVVSEFdis0Qg0IrBEVITVaGM8BYEAAktFRVgBDRuJQAMCIaIirAab4wkILCQQKirCWti0UQgUJpBCVIRVeINER2ABgVSiIqwFjRuBQEECKUVFWAU3SWQEJhJILSrCmti8qxEoRKCEqAir0EaJisAEAqVERVgTNsCVCBQgUFJUhFVgs0REYCCB0qIirIGb4CoEEhNoISrCSrxhoiEwgEArURHWgI1wBQIJCbQUFWEl3DSRELhBoLWoCOvGZjiKQCICW4iKsBJtnCgIXCCwlagI68KGOIJAAgJbioqwEmyeCAicILC1qAjrxKb4FIFAAkT1Cf63wCKMRgCB5wSI6gs2hOWXDAK5CBDViz4IK9eySrMvAaI60D1hHYDkEwQmEiCqE3AJ6wQsnyIwkABRXYBJWBegOYLADQJEdQMeYd2A5ygCJwgQ1QlYzz4lrAEQXYHACwJENXA9CGsgTFch8IkAUU1YB8KaANWVWxMgqon1E9ZEuK7eigBRLaibsBZANqI1AaJaWC9hLYRtVCsCRBVQJ2EFQDeyNAGiCqyPsALhG12KAFElqIuwEpQgQmoCRJWoHsJKVIYoqQgQVao6/g1DWAlLESmUAFGF4n89nLASlyPaUgJEtRT3tWGEdY2bU30IEFWhLgmrUFmiDiVAVENxrrmMsNZwNiUPAaLK08XpJIR1GpkDRQkQVdHiPscmrAYlesJLAkTVaEEIq1GZnvILAaJquBCE1bDUzZ9EVI0XgLAal7vZ04hqg8IJa4OSmz+RqJoX7A/dNyq48VOJqnG5z57md1gbll78yURVvMA78QnrDj1nVxIgqpW0k84irKTFiPWTAFFZhp8ECMsyZCVAVFmbCcxFWIHwjf6SAFFZjKcECMtyZCFAVFmaSJyDsBKXs0k0otqk6BHPJKwRFN1xhQBRXaG2+RnC2nwBAp5PVAHQu4wkrC5N5n8HUeXvKH1CwkpfUfmARFW+wjwPIKw8XXRLQlTdGk3wHsJKUEKzCETVrNBMzyGsTG3UzkJUtfsrkZ6wStSUOiRRpa6nVzjC6tXnytcQ1UraZn0QICyLcJYAUZ0l5vthBAhrGMr2FxFV+4rzP5Cw8ncUnZCoohsw/ycBwrIMzwgQld1IR4Cw0lUSHoiowisQ4BkBwrIbPwgQlV1IT4Cw0lc0PSBRTUdswCgChDWKZL17iKpeZ9snJqz9VoCo9uu8zYsJq02Vbx9CVG8R+SA7AcLK3tD9fER1n6EbkhAgrCRFTIhBVBOgujKWAGHF8p8xnahmUHVnCgKElaKGISGIaghGl2QmQFiZ2zmWjaiOcfJVAwKEVbdEoqrbneQXCRDWRXCBx4gqEL7RsQQIK5b/melEdYaWb1sSIKz8tRJV/o4kXESAsBaBvjCGqC5Ac6Q3AcLK1y9R5etEoiQECCtJEY/Hg6jydCFJUgKEFV8MUcV3IEERAoQVVxRRxbE3uSgBwlpfHFGtZ25iEwKEta5IolrH2qSmBAhrfrFENZ+xCZsQIKx5RRPVPLZu3pQAYY0vnqjGM3UjAh8ECGvcIhDVOJZuQuBLAoR1fzGI6j5DNyBwiABhHcL05UdEdZ2dkwhcIkBY57ER1XlmTiAwhABhHcdIVMdZ+RKBKQQI6z1WonrPyBcILCFAWM8xE9WSFTQEgeMECOtPVkR1fH98icBSAoT1P26iWrp6hiFwngBh+R/nnd8aJxAIIrCzsPyOKmjpjEXgKoEdhUVUV7fFOQSCCewkLKIKXjbjEbhLYAdhEdXdLXEegSQEOguLqJIsmRgIjCLQUVhENWo73INAMgKdhEVUyZZLHARGE+ggLKIavRXuQyApgcrCIqqkSyUWArMIVBQWUc3aBvcikJxAJWERVfJlEg+B2QQqCIuoZm+B+xEoQiCzsIiqyBKJicAqAhmFRVSr2jcHgWIEMgmLqIotj7gIrCaQQVhEtbp18xAoSiBSWERVdGnERiCKQISwiCqqbXMRKE5gpbCIqviyiI9ANIEVwiKq6JbNR6AJgZnCIqomS+IZCGQhMENYRJWlXTkQaEZgpLCIqtlyeA4C2QiMEBZRZWtVHgSaErgjLKJquhSehUBWAleERVRZ25QLgeYEzgiLqJovg+chkJ3AEWERVfYW5UNgEwKvhEVUmyyBZyJQhcBXwiKqKu3JicBmBD4Li6g2K99zEahG4LuwiKpaa/IisCkBwtq0eM9GoCIB/0pYsTWZEdiUgD9037R4z0agIgF/raFiazIjsCkBf3F00+I9G4GKBI4I68e7/NfEig3LjEAjAmeERVyNivcUBCoSuCIs4qrYtMwINCBwR1jE1WABPAGBSgRGCIu4KjUuKwKFCYwUFnEVXgTREahAYIawiKtC8zIiUJDATGERV8GFEBmBzARWCIu4Mm+AbAgUIrBSWMRVaDFERSAjgQhhEVfGTZAJgQIEIoVFXAUWREQEMhHIICziyrQRsiCQmEAmYRFX4kURDYEMBDIKi7gybIYMCCQkkFlYxJVwYURCIJJABWERV+SGmI1AIgKVhEVciRZHFAQiCFQUFnFFbIqZCCQgUFlYxJVggURAYCWBDsIirpUbYxYCgQQ6CYu4AhfJaARWEOgoLOJasTlmIBBAoLOwiCtgoYxEYCaBHYRFXDM3yN0ILCSwk7CIa+FiGYXADAI7Cou4ZmySOxFYQGBnYRHXggUzAoGRBAjrf5p/PR6Pvx+Px/ef/UAAgYQECOvPUogr4aKKhMB3AoT1fA+Iy68RBJIRIKz3hRDXe0a+QGAJAcI6jpm4jrPyJQJTCBDWeazEdZ6ZEwgMIUBY1zES13V2TiJwiQBhXcL2yyHius/QDQgcIkBYhzAd+oi4DmHyEQLXCRDWdXbPThLXeKZuROCDAGHNWwTimsfWzZsSIKz5xRPXfMYmbEKAsNYVTVzrWJvUlABhrS+WuNYzN7EJAcKKK5K44tibXJQAYcUXR1zxHUhQhABh5SmKuPJ0IUlSAoSVrxjiyteJREkIEFaSIr6IQVx5u5EsiABhBYE/MZa4TsDyaW8ChFWnX+Kq05WkkwgQ1iSwE68lrolwXZ2bAGHl7udVOuKq253kFwkQ1kVwiY4RV6IyRJlLgLDm8l15O3GtpG1WCAHCCsE+dShxTcXr8kgChBVJf+5s4prL1+0BBAgrAPrikcS1GLhx8wgQ1jy22W4mrmyNyHOaAGGdRlb+AHGVr3DfBxDWvt0T177dl305YZWtblhw4hqG0kWzCRDWbMJ17ieuOl1tm5Swtq3+6cOJy06kJUBYaasJD0Zc4RUI8DsBwrIT7wgQ1ztC/vkyAoS1DHX5QcRVvsL6DyCs+h2ufgFxrSZu3k8ChGUZrhIgrqvknLtMgLAuo3PwPwLEZRWWESCsZajbDyKu9hXHP5Cw4jvoloC4ujWa6D2ElaiMZlGIq1mhGZ5DWBla6J2BuHr3u/R1hLUU99bDiGvr+sc8nrDGcHTLcQLEdZyVL38jQFhWIooAcUWRLzyXsAqX1yQ6cTUpcsUzCGsFZTOOECCuI5Q2/4awNl+AhM8nroSlZIlEWFmakON3AsRlJ/4gQFiWIjsB4sre0MJ8hLUQtlG3CBDXLXw9DhNWjx53egVx7dT2b28lrI3LL/504ipe4JX4hHWFmjOZCBBXpjYmZyGsyYBdv4wAcS1DHTeIsOLYmzyHAHHN4ZriVsJKUYMQEwgQ1wSo0VcSVnQD5s8mQFyzCS+8n7AWwjYqlABxheIfM5ywxnB0Sx0CxFWnqz+SElbh8kS/RYC4buGLOUxYMdxNzUOAuPJ08TYJYb1F5INNCBBXgaIJq0BJIi4lQFxLcZ8bRljnePl6HwLElbBrwkpYikipCBBXojoIK1EZoqQmQFwJ6iGsBCWIUIoAcQXWRViB8I0uTYC4AuojrADoRrYiQFwL6ySshbCNak2AuBbUS1gLIBuxFQHimlg3YU2E6+qtCRDXhPoJawJUVyLwiQBxDVwHwhoI01UIvCBAXAPWg7AGQHQFAicIENcJWL9/Slg34DmKwA0CxHUBHmFdgOYIAgMJENcJmIR1ApZPEZhIgLgOwCWsA5B8gsBCAsT1AjZhLdxEoxA4QYC4voBFWCc2yKcIBBAgrk/QCStgA41E4AIB4no8HoR1YXMcQSCQwNbiIqzAzTMagRsEthQXYd3YGEcRSEBgK3ERVoKNEwGBAQS2EBdhDdgUVyCQiEBrcRFWok0TBYGBBFqKi7AGboirEEhIoJW4CCvhhomEwAQCLcRFWBM2w5UIJCZQWlyElXizRENgIoGS4iKsiRvhagQKECglLsIqsFEiIrCAQAlxEdaCTTACgUIEUouLsAptkqgILCSQUlyEtXADjEKgIIFU4iKsghskMgIBBFKIi7ACmjcSgcIEQsVFWIU3R3QEAgmEiIuwAhs3GoEGBJaKi7AabIwnIJCAwBJxEVaCpkVAoBGBqeIirEab4ikIJCIwRVyElahhURBoSGCouAir4YZ4EgIJCQwRF2ElbFYkBBoTuCUuwmq8GZ6GQGICl8RFWIkbFQ2BDQicEhdhbbARnohAAQKHxEVYBZoUEYGNCLwUF2FttAmeikAhAl+Ki7AKNSgqAhsS+EVchLXhBngyAgUJfIjrHyJAK4SK6guMAAAAAElFTkSuQmCC'>" +
				"<mxGeometry x='401' y='280' width='70' height='70' as='geometry'/>" +
				"</mxCell>" +
				"</root>";

			//根据XML导入画板内容
			pdd.importGraphFromXML(xml);
		};

		debugGroupChildren.push(debugImportFromXML);

		var debugImportToolBoxCells = new Object();

		debugImportToolBoxCells[this.CONST_ATTRIBUTE_FLATBUTTONID] = "pddDebugImportToolbarCells";
		debugImportToolBoxCells[this.CONST_ATTRIBUTE_FLATBUTTONSTYLECLASS] = this.CONST_CSSSTYLE_BUTTON;
		debugImportToolBoxCells[this.CONST_ATTRIBUTE_FLATBUTTONTEXT] = "导入工具栏项";
		debugImportToolBoxCells[this.CONST_ATTRIBUTE_FLATBUTTONTIPS] = "导入工具栏项";
		debugImportToolBoxCells[this.CONST_ATTRIBUTE_FLATBUTTONONCLICKFUNC] = function () {
			if (!this.pdd) return;
			var pdd = this.pdd;

			//工具箱元件信息数组
			var toolboxCells = new Array();

			var toolboxCell_Task = new Object();

			toolboxCell_Task[pdd.CONST_ATTRIBUTE_FLATBUTTONID] = "task";
			toolboxCell_Task[pdd.CONST_ATTRIBUTE_FLATBUTTONTIPS] = "任务";
			toolboxCell_Task[pdd.CONST_ATTRIBUTE_FLATBUTTONTYPE] = pdd.CONST_CANVASTYPE_RECT;
			toolboxCell_Task[pdd.CONST_ATTRIBUTE_FLATBUTTONCANVASFILLCOLOR] = "#d9454b";
			toolboxCell_Task[pdd.CONST_ATTRIBUTE_FLATBUTTONCANVASFONTCOLOR] = "#ffffff";

			toolboxCells.push(toolboxCell_Task);

			var toolboxCell_Audit = new Object();

			toolboxCell_Audit[pdd.CONST_ATTRIBUTE_FLATBUTTONID] = "audit";
			toolboxCell_Audit[pdd.CONST_ATTRIBUTE_FLATBUTTONTIPS] = "审批";
			toolboxCell_Audit[pdd.CONST_ATTRIBUTE_FLATBUTTONTYPE] = pdd.CONST_CANVASTYPE_ROUNDRECT;
			toolboxCell_Audit[pdd.CONST_ATTRIBUTE_FLATBUTTONCANVASFILLCOLOR] = "#4879f6";
			toolboxCell_Audit[pdd.CONST_ATTRIBUTE_FLATBUTTONCANVASFONTCOLOR] = "#ffffff";

			toolboxCells.push(toolboxCell_Audit);

			var toolboxCell_Scan = new Object();

			toolboxCell_Scan[pdd.CONST_ATTRIBUTE_FLATBUTTONID] = "scan";
			toolboxCell_Scan[pdd.CONST_ATTRIBUTE_FLATBUTTONTIPS] = "扫描";
			toolboxCell_Scan[pdd.CONST_ATTRIBUTE_FLATBUTTONTYPE] = pdd.CONST_CANVASTYPE_CIRCULAR;

			toolboxCells.push(toolboxCell_Scan);

			var toolboxCell_Route = new Object();

			toolboxCell_Route[pdd.CONST_ATTRIBUTE_FLATBUTTONID] = "route";
			toolboxCell_Route[pdd.CONST_ATTRIBUTE_FLATBUTTONTIPS] = "路由";
			toolboxCell_Route[pdd.CONST_ATTRIBUTE_FLATBUTTONTYPE] = pdd.CONST_CANVASTYPE_RHOMBUS;

			toolboxCells.push(toolboxCell_Route);

			var toolboxCell_Execute = new Object();

			toolboxCell_Execute[pdd.CONST_ATTRIBUTE_FLATBUTTONID] = "execute";
			toolboxCell_Execute[pdd.CONST_ATTRIBUTE_FLATBUTTONTIPS] = "运行";
			toolboxCell_Execute[pdd.CONST_ATTRIBUTE_FLATBUTTONTYPE] = pdd.CONST_CANVASTYPE_TRIANGLE;
			toolboxCell_Execute[pdd.CONST_ATTRIBUTE_FLATBUTTONSTYLECLASS] = pdd.CONST_CSSSTYLE_BUTTON;

			toolboxCells.push(toolboxCell_Execute);

			var toolboxCell_Storage = new Object();

			toolboxCell_Storage[pdd.CONST_ATTRIBUTE_FLATBUTTONID] = "storage";
			toolboxCell_Storage[pdd.CONST_ATTRIBUTE_FLATBUTTONTIPS] = "存储";
			toolboxCell_Storage[pdd.CONST_ATTRIBUTE_FLATBUTTONTYPE] = pdd.CONST_CANVASTYPE_CYLINDER;

			toolboxCells.push(toolboxCell_Storage);

			var toolboxCell_User = new Object();

			toolboxCell_User[pdd.CONST_ATTRIBUTE_FLATBUTTONID] = "user";
			toolboxCell_User[pdd.CONST_ATTRIBUTE_FLATBUTTONTIPS] = "用户";
			toolboxCell_User[pdd.CONST_ATTRIBUTE_FLATBUTTONTYPE] = pdd.CONST_CANVASTYPE_ACTOR;

			toolboxCells.push(toolboxCell_User);

			var canvasImage = document.getElementById(pdd.CONST_PREFIX_CANVAS + "image");

			if (pdd.isEmpty(canvasImage)) {
				canvasImage = pdd.createCanvas(pdd.CONST_PREFIX_CANVAS + "image", 300, pdd.CONST_CANVASTYPE_CUSTOM);
			}

			if (!pdd.isEmpty(canvasImage)) {
				var canvasImageCtx = canvasImage.getContext("2d");

				if (!pdd.isEmpty(canvasImageCtx)) {
					var canvasX = 0;
					var canvasY = 0;
					var canvasWidth = 300;
					var canvasHeight = 300;

					canvasImageCtx.beginPath();

					canvasImageCtx.moveTo(canvasX, canvasHeight / 2);
					canvasImageCtx.lineTo(canvasWidth, canvasY);
					canvasImageCtx.lineTo(canvasWidth, canvasHeight);
					canvasImageCtx.lineTo(canvasX, canvasHeight / 2);
					canvasImageCtx.fill();

					canvasImageCtx.closePath();

					var toolboxCell_Image = new Object();

					toolboxCell_Image[pdd.CONST_ATTRIBUTE_FLATBUTTONID] = "image";
					toolboxCell_Image[pdd.CONST_ATTRIBUTE_FLATBUTTONTIPS] = "图形";
					toolboxCell_Image[pdd.CONST_ATTRIBUTE_FLATBUTTONTYPE] = pdd.CONST_CANVASTYPE_CUSTOM;
					toolboxCell_Image[pdd.CONST_ATTRIBUTE_FLATBUTTONCANVASFONTCOLOR] = "#aaaaaa";
					toolboxCell_Image[pdd.CONST_ATTRIBUTE_FLATBUTTONIMAGE] = canvasImage.toDataURL();

					toolboxCells.push(toolboxCell_Image);
				}
			}

			var toolboxCell_Child = new Object();

			toolboxCell_Child[pdd.CONST_ATTRIBUTE_FLATBUTTONID] = "child";
			toolboxCell_Child[pdd.CONST_ATTRIBUTE_FLATBUTTONTIPS] = "子流程";
			toolboxCell_Child[pdd.CONST_ATTRIBUTE_FLATBUTTONTYPE] = pdd.CONST_CANVASTYPE_SWIMLANE;

			toolboxCells.push(toolboxCell_Child);

			var toolboxCell_Link = new Object();

			toolboxCell_Link[pdd.CONST_ATTRIBUTE_FLATBUTTONID] = "link";
			toolboxCell_Link[pdd.CONST_ATTRIBUTE_FLATBUTTONTIPS] = "链接";
			toolboxCell_Link[pdd.CONST_ATTRIBUTE_FLATBUTTONTYPE] = pdd.CONST_CANVASTYPE_RECT;
			toolboxCell_Link[pdd.CONST_ATTRIBUTE_FLATBUTTONCANVASFILLCOLOR] = "#00ff00";
			toolboxCell_Link[pdd.CONST_ATTRIBUTE_FLATBUTTONCANVASFONTCOLOR] = "#ffffff";

			toolboxCells.push(toolboxCell_Link);

			pdd.importToolBoxCells(toolboxCells);

			pdd.fillToolBoxCells();

			pdd.arrangeFlatElement();
		};

		debugGroupChildren.push(debugImportToolBoxCells);

		var debugExecuteJS = new Object();

		debugExecuteJS[this.CONST_ATTRIBUTE_FLATBUTTONID] = "pddDebugExecuteJS";
		debugExecuteJS[this.CONST_ATTRIBUTE_FLATBUTTONSTYLECLASS] = this.CONST_CSSSTYLE_BUTTON;
		debugExecuteJS[this.CONST_ATTRIBUTE_FLATBUTTONTEXT] = "执行JS";
		debugExecuteJS[this.CONST_ATTRIBUTE_FLATBUTTONTIPS] = "执行JS";
		debugExecuteJS[this.CONST_ATTRIBUTE_FLATBUTTONONCLICKFUNC] = function () {
			if (!this.pdd) return;
			var pdd = this.pdd;

			var jsCode =
				"this.graphModel.beginUpdate();\r\n" +
				"try{\r\n" +
				"	var dynVertexHostRect=this.graph.insertVertex(this.graphParent,null,\"Eval动态创建父矩形\",60,60,100,60);\r\n" +
				"	var dynVertexChildRect=this.graph.insertVertex(dynVertexHostRect,null,\"Eval动态创建子矩形\",90,40,60,20);\r\n" +
				"}finally{\r\n" +
				"	this.graphModel.endUpdate();\r\n" +
				"}\r\n";

			pdd.executeScript(jsCode);
		};

		debugGroupChildren.push(debugExecuteJS);

		var debugSetCellAttribute = new Object();

		debugSetCellAttribute[this.CONST_ATTRIBUTE_FLATBUTTONID] = "pddDebugSetCellAttribute";
		debugSetCellAttribute[this.CONST_ATTRIBUTE_FLATBUTTONSTYLECLASS] = this.CONST_CSSSTYLE_BUTTON;
		debugSetCellAttribute[this.CONST_ATTRIBUTE_FLATBUTTONTEXT] = "设置元件属性";
		debugSetCellAttribute[this.CONST_ATTRIBUTE_FLATBUTTONTIPS] = "设置元件属性";
		debugSetCellAttribute[this.CONST_ATTRIBUTE_FLATBUTTONONCLICKFUNC] = function () {
			if (!this.pdd) return;
			var pdd = this.pdd;

			if (!pdd.checkGraph()) return;

			var selectedCells = pdd.graph.getSelectionCells();

			if (pdd.isEmptyArray(selectedCells)) return;

			var selectedCellsLength = selectedCells.length;

			var attrs = new Array();

			for (var index = 0; index < selectedCellsLength; index++) {
				var selectedCell = selectedCells[index];

				if (pdd.isEmpty(selectedCell)) continue;

				var selectedCellID = selectedCell.id;

				if (pdd.isEmptyString(selectedCellID)) continue;

				var attr = new Object();

				attr[pdd.CONST_ATTRIBUTE_GRAPHCELLID] = selectedCellID;

				attr[pdd.CONST_ATTRIBUTE_GRAPHCELLNAME] = "ABC123测试";

				attrs.push(attr);
			}

			if (pdd.isEmptyArray(attrs)) return;

			pdd.setGraphCellAttributes(attrs);
		};

		debugGroupChildren.push(debugSetCellAttribute);

		var debugSetCellAnimation = new Object();

		debugSetCellAnimation[this.CONST_ATTRIBUTE_FLATBUTTONID] = "pddDebugSetCellAnimation";
		debugSetCellAnimation[this.CONST_ATTRIBUTE_FLATBUTTONSTYLECLASS] = this.CONST_CSSSTYLE_BUTTON;
		debugSetCellAnimation[this.CONST_ATTRIBUTE_FLATBUTTONTEXT] = "设置元件动画";
		debugSetCellAnimation[this.CONST_ATTRIBUTE_FLATBUTTONTIPS] = "设置元件动画";
		debugSetCellAnimation[this.CONST_ATTRIBUTE_FLATBUTTONONCLICKFUNC] = function () {
			if (!this.pdd) return;
			var pdd = this.pdd;

			if (!pdd.checkGraph()) return;

			var selectedCells = pdd.graph.getSelectionCells();

			if (pdd.isEmptyArray(selectedCells)) return;

			var selectedCellsLength = selectedCells.length;

			var selectedCellIDArray = new Array();

			for (var index = 0; index < selectedCellsLength; index++) {
				var selectedCell = selectedCells[index];

				if (!selectedCell) continue;

				var selectedCellID = selectedCell.id;

				if (pdd.isEmptyString(selectedCellID)) continue;

				selectedCellIDArray.push(selectedCellID);
			}

			//启用/禁用画板元件动画
			pdd.switchGraphCellsAnimationByID(selectedCellIDArray, true, false, true, false, true);
		};

		debugGroupChildren.push(debugSetCellAnimation);

		var debugUnsetCellAnimation = new Object();

		debugUnsetCellAnimation[this.CONST_ATTRIBUTE_FLATBUTTONID] = "pddDebugUnsetCellAnimation";
		debugUnsetCellAnimation[this.CONST_ATTRIBUTE_FLATBUTTONSTYLECLASS] = this.CONST_CSSSTYLE_BUTTON;
		debugUnsetCellAnimation[this.CONST_ATTRIBUTE_FLATBUTTONTEXT] = "取消元件动画";
		debugUnsetCellAnimation[this.CONST_ATTRIBUTE_FLATBUTTONTIPS] = "取消元件动画";
		debugUnsetCellAnimation[this.CONST_ATTRIBUTE_FLATBUTTONONCLICKFUNC] = function () {
			if (!this.pdd) return;
			var pdd = this.pdd;

			if (!pdd.checkGraph()) return;

			var selectedCells = pdd.graph.getSelectionCells();

			if (pdd.isEmptyArray(selectedCells)) return;

			var selectedCellsLength = selectedCells.length;

			var selectedCellIDArray = new Array();

			for (var index = 0; index < selectedCellsLength; index++) {
				var selectedCell = selectedCells[index];

				if (pdd.isEmpty(selectedCell)) continue;

				var selectedCellID = selectedCell.id;

				if (pdd.isEmptyString(selectedCellID)) continue;

				selectedCellIDArray.push(selectedCellID);

			}

			//启用/禁用画板元件动画
			pdd.switchGraphCellsAnimationByID(selectedCellIDArray, false, false, true, false, true);
		};

		debugGroupChildren.push(debugUnsetCellAnimation);

		var debugIncreaseOpacity = new Object();

		debugIncreaseOpacity[this.CONST_ATTRIBUTE_FLATBUTTONID] = "pddDebugIncreaseOpacity";
		debugIncreaseOpacity[this.CONST_ATTRIBUTE_FLATBUTTONSTYLECLASS] = this.CONST_CSSSTYLE_BUTTON;
		debugIncreaseOpacity[this.CONST_ATTRIBUTE_FLATBUTTONTEXT] = "减少元件透明度";
		debugIncreaseOpacity[this.CONST_ATTRIBUTE_FLATBUTTONTIPS] = "减少元件透明度";
		debugIncreaseOpacity[this.CONST_ATTRIBUTE_FLATBUTTONONCLICKFUNC] = function () {
			if (!this.pdd) return;

			//设置画板元件透明度
			this.pdd.setGraphSelectedCellsOpacity(this.pdd.CONST_GRAPH_OPACITYSTEP);
		};

		debugGroupChildren.push(debugIncreaseOpacity);

		var debugDecreaseOpacity = new Object();

		debugDecreaseOpacity[this.CONST_ATTRIBUTE_FLATBUTTONID] = "pddDebugDecreaseOpacity";
		debugDecreaseOpacity[this.CONST_ATTRIBUTE_FLATBUTTONSTYLECLASS] = this.CONST_CSSSTYLE_BUTTON;
		debugDecreaseOpacity[this.CONST_ATTRIBUTE_FLATBUTTONTEXT] = "增加元件透明度";
		debugDecreaseOpacity[this.CONST_ATTRIBUTE_FLATBUTTONTIPS] = "增加元件透明度";
		debugDecreaseOpacity[this.CONST_ATTRIBUTE_FLATBUTTONONCLICKFUNC] = function () {
			if (!this.pdd) return;

			//设置画板元件透明度
			this.pdd.setGraphSelectedCellsOpacity(this.pdd.CONST_GRAPH_OPACITYSTEP * -1);
		};

		debugGroupChildren.push(debugDecreaseOpacity);

		var debugSetEditable = new Object();

		debugSetEditable[this.CONST_ATTRIBUTE_FLATBUTTONID] = "pddDebugSetEditable";
		debugSetEditable[this.CONST_ATTRIBUTE_FLATBUTTONSTYLECLASS] = this.CONST_CSSSTYLE_BUTTON;
		debugSetEditable[this.CONST_ATTRIBUTE_FLATBUTTONTEXT] = "设置画板可编辑";
		debugSetEditable[this.CONST_ATTRIBUTE_FLATBUTTONTIPS] = "设置画板可编辑";
		debugSetEditable[this.CONST_ATTRIBUTE_FLATBUTTONONCLICKFUNC] = function () {
			if (!this.pdd) return;
			var pdd = this.pdd;

			//设置画板是否可编辑
			pdd.setEditable(true);
		};

		debugGroupChildren.push(debugSetEditable);

		var debugSetReadOnly = new Object();

		debugSetReadOnly[this.CONST_ATTRIBUTE_FLATBUTTONID] = "pddDebugSetReadOnly";
		debugSetReadOnly[this.CONST_ATTRIBUTE_FLATBUTTONSTYLECLASS] = this.CONST_CSSSTYLE_BUTTON;
		debugSetReadOnly[this.CONST_ATTRIBUTE_FLATBUTTONTEXT] = "设置画板为只读";
		debugSetReadOnly[this.CONST_ATTRIBUTE_FLATBUTTONTIPS] = "设置画板为只读";
		debugSetReadOnly[this.CONST_ATTRIBUTE_FLATBUTTONONCLICKFUNC] = function () {
			if (!this.pdd) return;
			var pdd = this.pdd;

			//设置画板是否可编辑
			pdd.setEditable(false);
		};

		debugGroupChildren.push(debugSetReadOnly);

		var debugSetToolBoxMaxDisplayChildren = new Object();

		debugSetToolBoxMaxDisplayChildren[this.CONST_ATTRIBUTE_FLATBUTTONID] = "pddDebugSetToolBoxMaxDisplayChildren";
		debugSetToolBoxMaxDisplayChildren[this.CONST_ATTRIBUTE_FLATBUTTONSTYLECLASS] = this.CONST_CSSSTYLE_BUTTON;
		debugSetToolBoxMaxDisplayChildren[this.CONST_ATTRIBUTE_FLATBUTTONTEXT] = "设置工具箱子项最大显示数";
		debugSetToolBoxMaxDisplayChildren[this.CONST_ATTRIBUTE_FLATBUTTONTIPS] = "设置工具箱子项最大显示数";
		debugSetToolBoxMaxDisplayChildren[this.CONST_ATTRIBUTE_FLATBUTTONONCLICKFUNC] = function () {
			if (!this.pdd) return;
			var pdd = this.pdd;

			if (pdd.isEmpty(pdd.divToolBox)) return;

			//设置工具箱最大子项显示数
			pdd.setFlatButtonGroupMaxDisplayChildren(pdd.divToolBox, 3);
		};

		debugGroupChildren.push(debugSetToolBoxMaxDisplayChildren);

		this.importFlatButtonGroupChildren(divDebugGroup, debugGroupChildren);
	},
	/**
	 * @description 设置画板选中元件透明度
	 * @param step 透明增加步长
	 */
	setGraphSelectedCellsOpacity: function (step) {
		if (!this.checkGraph()) return;

		if (!this.isNumber(step)) step = this.CONST_GRAPH_OPACITYSTEP;

		var selectedCells = this.graph.getSelectionCells();

		if (this.isEmptyArray(selectedCells)) return;

		var selectedCellsLength = selectedCells.length;

		var selectedCellIDArray = new Array();

		for (var index = 0; index < selectedCellsLength; index++) {
			var selectedCell = selectedCells[index];

			if (!selectedCell) continue;

			var selectedCellID = selectedCell.id;

			if (this.isEmptyString(selectedCellID)) continue;

			selectedCellIDArray.push(selectedCellID);
		}

		//设置画板元件透明度
		this.setGraphCellsOpacityByID(selectedCellIDArray, step);
	},
	/**
	 * @description 设置画板元件透明度通过元件ID
	 * @param idArray 元件ID数组
	 * @param step 透明增加步长
	 */
	setGraphCellsOpacityByID: function (idArray, step) {
		if (!this.checkGraph()) return;

		if (this.isEmptyArray(idArray)) {
			console.error("参数画板元件ID数组为空");

			return;
		}

		if (!this.isNumber(step)) step = this.CONST_GRAPH_OPACITYSTEP;

		var idArrayLength = idArray.length;

		var displayOpacity = null;

		for (var index = 0; index < idArrayLength; index++) {
			var id = idArray[index];

			if (this.isEmptyString(id)) {
				console.error({ msg: "画板元件ID数组的第" + index + "项为空", param: idArray });

				continue;
			}

			var cell = this.graphModel.getCell(id);

			if (this.isEmpty(cell)) {
				console.error({ msg: "根据ID=" + id + "获取画板元件失败", param: id });

				continue;
			}

			//获取元件透明度属性
			var cellOpacity = this.getCellAttribute(cell, this.CONST_ATTRIBUTE_GRAPHCELLOPACITY);

			if (this.isEmptyString(cellOpacity)) cellOpacity = this.CONST_GRAPHCELL_OPACITY;

			cellOpacity = Number(cellOpacity);

			if (!this.isNumber(cellOpacity)) cellOpacity = this.CONST_GRAPHCELL_OPACITY;

			var newCellOpacity = cellOpacity + step;

			newCellOpacity = newCellOpacity > 100 ? 100 : newCellOpacity < 0 ? 0 : newCellOpacity;

			var cellState = this.graphView.getState(cell);

			var cellShape = this.isEmpty(cellState) ? null : cellState.shape;

			var cellNode = this.isEmpty(cellShape) ? null : cellShape.node;

			if (this.isEmpty(cellNode)) continue;

			mxUtils.setOpacity(cellNode, newCellOpacity);

			displayOpacity = newCellOpacity;

			//设置元件透明度属性
			this.setGraphCellAttribute(cell, this.CONST_ATTRIBUTE_GRAPHCELLOPACITY, newCellOpacity.toString());
		}

		if (idArrayLength == 1 && this.isNumber(displayOpacity)) {
			if (this.isEmpty(this.divOpacityValue)) {
				console.error("获取DIV" + this.CONST_DIVOPACITYVALUEID + "失败");

				return;
			}

			if (this.isEmpty(this.divOpacityDecrease)) {
				console.error("获取DIV" + this.CONST_DIVOPACITYDECREASEID + "失败");

				return;
			}

			if (this.isEmpty(this.divOpacityIncrease)) {
				console.error("获取DIV" + this.CONST_DIVOPACITYINCREASEID + "失败");

				return;
			}

			this.divOpacityValue.innerHTML = 100 - displayOpacity < 0 ? "0%" : 100 - displayOpacity > 100 ? "100%" : (100 - displayOpacity).toString() + "%";

			this.refreshOpacity(displayOpacity);
		}
	},
	/**
	 * @description 刷新透明度
	 * @param opacity 透明度
	 */
	refreshOpacity: function (opacity) {
		if (!this.isNumber(opacity)) {
			console.error("参数透明度不是有效的数字");
			return;
		}

		var backgroundImage;

		if (opacity == 0) {
			this.divOpacityDecrease.setAttribute("class", this.CONST_CSSSTYLE_BLANK);

			backgroundImage = this.divOpacityDecrease.style.backgroundImage;

			if (!this.isEmptyString(backgroundImage)) {
				this.divOpacityDecrease.setAttribute("background-image", backgroundImage);
				this.divOpacityDecrease.style.backgroundImage = "";
			}

			this.divOpacityDecrease.style.boxShadow = "none";

			this.divOpacityDecrease.onclick = {};

			this.divOpacityDecrease.title = "";
		} else {
			this.divOpacityDecrease.setAttribute("class", this.CONST_CSSSTYLE_BUTTON);

			backgroundImage = this.divOpacityDecrease.getAttribute("background-image")

			if (!this.isEmptyString(backgroundImage)) {
				this.divOpacityDecrease.style.backgroundImage = backgroundImage;
				this.divOpacityDecrease.setAttribute("background-image", "");
			}

			this.divOpacityDecrease.style.boxShadow = "-2px 0 4px -1px " + this.CONST_CSS_SHADOWCOLOR;

			this.divOpacityDecrease.onclick = function () {
				if (!this.pdd) return;

				this.pdd.setGraphSelectedCellsOpacity(this.pdd.CONST_GRAPH_OPACITYSTEP * -1);
			}

			this.divOpacityDecrease.title = "增加透明度";
		}

		if (opacity >= 100) {
			this.divOpacityIncrease.setAttribute("class", this.CONST_CSSSTYLE_BLANK);

			backgroundImage = this.divOpacityIncrease.style.backgroundImage;

			if (!this.isEmptyString(backgroundImage)) {
				this.divOpacityIncrease.setAttribute("background-image", backgroundImage);
				this.divOpacityIncrease.style.backgroundImage = "";
			}

			this.divOpacityIncrease.style.boxShadow = "none";

			this.divOpacityIncrease.onclick = {};

			this.divOpacityIncrease.title = "";
		} else {
			this.divOpacityIncrease.setAttribute("class", this.CONST_CSSSTYLE_BUTTON);

			backgroundImage = this.divOpacityIncrease.getAttribute("background-image")

			if (!this.isEmptyString(backgroundImage)) {
				this.divOpacityIncrease.style.backgroundImage = backgroundImage;
				this.divOpacityIncrease.setAttribute("background-image", "");
			}

			this.divOpacityIncrease.style.boxShadow = "2px 0 4px -1px " + this.CONST_CSS_SHADOWCOLOR;

			this.divOpacityIncrease.onclick = function () {
				if (!this.pdd) return;

				this.pdd.setGraphSelectedCellsOpacity(this.pdd.CONST_GRAPH_OPACITYSTEP);
			}

			this.divOpacityIncrease.title = "减少透明度";
		}
	},
	/**
	 * @description 启用/禁用画板元件动画通过元件ID
	 * @param graphCellsIDArray 画板元件ID数组
	 * @param switchButton 启用/禁用开关（默认：true）
	 * @param incomingEdge 图形输入连接线（默认：false）
	 * @param outgoingEdge 图形输出连接线（默认：false）
	 * @param sourceVertex 连接线来源图形（默认：false）
	 * @param targetVertex 连接线目标图形（默认：false）
	 */
	switchGraphCellsAnimationByID: function (graphCellsIDArray, switchButton, incomingEdge, outgoingEdge, sourceVertex, targetVertex) {
		if (this.isEmptyArray(graphCellsIDArray)) {
			console.error("参数画板元件ID数组为空");

			return;
		}

		if (!this.isBoolean(switchButton)) switchButton = true;
		if (!this.isBoolean(incomingEdge)) incomingEdge = false;
		if (!this.isBoolean(outgoingEdge)) outgoingEdge = false;
		if (!this.isBoolean(sourceVertex)) sourceVertex = false;
		if (!this.isBoolean(targetVertex)) targetVertex = false;

		//检查mxGraph画板是否正常
		if (!this.checkGraph()) return;

		var graphCellsIDArrayLength = graphCellsIDArray.length;

		var graphCells = new Array();

		for (var index = 0; index < graphCellsIDArrayLength; index++) {
			var graphCellID = graphCellsIDArray[index];

			if (this.isEmptyString(graphCellID)) {
				console.error({ msg: "画板元件ID数组的第" + index + "项为空", param: graphCellsIDArray });

				continue;
			}

			var graphCell = this.graphModel.getCell(graphCellID);

			if (this.isEmpty(graphCell)) {
				console.error({ msg: "根据ID=" + graphCellID + "获取画板元件失败", param: graphCellID });

				continue;
			}

			graphCells.push(graphCell);
		}

		//启用/禁用画板元件动画
		this.switchGraphCellsAnimation(graphCells, switchButton, incomingEdge, outgoingEdge, sourceVertex, targetVertex);
	},
	/**
	 * @description 启用/禁用画板元件动画
	 * @param graphCells 画板元件数组
	 * @param switchButton 启用/禁用按钮（默认：true）
	 * @param incomingEdge 图形输入连接线（默认：false）
	 * @param outgoingEdge 图形输出连接线（默认：false）
	 * @param sourceVertex 连接线来源图形（默认：false）
	 * @param targetVertex 连接线目标图形（默认：false）
	 */
	switchGraphCellsAnimation: function (graphCells, switchButton, incomingEdge, outgoingEdge, sourceVertex, targetVertex) {
		if (this.isEmptyArray(graphCells)) {
			console.error("参数画板元件数组为空");

			return;
		}

		if (!this.isBoolean(switchButton)) switchButton = true;
		if (!this.isBoolean(incomingEdge)) incomingEdge = false;
		if (!this.isBoolean(outgoingEdge)) outgoingEdge = false;
		if (!this.isBoolean(sourceVertex)) sourceVertex = false;
		if (!this.isBoolean(targetVertex)) targetVertex = false;

		//检查mxGraph画板是否正常
		if (!this.checkGraph()) return;

		var graphCellsLength = graphCells.length;

		for (var index = 0; index < graphCellsLength; index++) {
			var graphCell = graphCells[index];

			if (this.isEmpty(graphCell)) {
				console.error({ msg: "画板元件数组的第" + index + "项为空", param: graphCells });

				continue;
			}

			var graphCellState = this.graphView.getState(graphCell);

			var graphCellShape = graphCellState ? graphCellState.shape : null;

			var graphCellNode = graphCellShape ? graphCellShape.node : null;

			if (this.isEmpty(graphCellNode)) {
				console.error({ msg: "获取画板元件的节点为空", param: graphCell });

				return;
			} else {
				//画板元件对应的HTML元素
				var graphCellNodeHTMLElement;

				if (this.graphModel.isVertex(graphCell)) {
					var graphCellNodeChildren = graphCellNode.children;

					if (this.isEmpty(graphCellNodeChildren)) {
						console.error({ msg: "获取画板元件节点的子项为空", param: edgeNode })

						return;
					}

					var graphCellNodeChildLength = graphCellNodeChildren.length;

					if (!this.isNumber(graphCellNodeChildLength) || graphCellNodeChildLength <= 0) {
						console.error({ msg: "获取画板元件节点的子项为空", param: edgeNode })

						return;
					}

					graphCellNodeHTMLElement = graphCellNodeChildren[0];
				} else if (mgGraphModel.isEdge(graphCell)) {
					var edgePaths = graphCellNode.getElementsByTagName("path");

					if (typeof (edgePaths) != "object") {
						console.error({ msg: "获取连接线的路径无效", param: edgeNode });

						return;
					}

					if (this.isEmpty(edgePaths.length) || edgePaths.length < 2) {
						console.error({ msg: "获取连接线的路径无效", param: edgePaths });

						return;
					}

					graphCellNodeHTMLElement = edgePaths[1];

				} else {
					console.error({ msg: "参数画板元件无效", param: graphCell });

					return;
				}

				if (this.isEmpty(graphCellNodeHTMLElement)) {
					console.error({ msg: "获取画板元件对应的HTML元素失败", param: graphCellNode });

					return;
				}

				if (switchButton) {
					graphCellNodeHTMLElement.setAttribute("class", "pddBorderRun");
				} else {
					graphCellNodeHTMLElement.removeAttribute("class");
				}
			}

			if (graphCell.isVertex() && (incomingEdge || outgoingEdge)) {
				//如果画板元件为图形
				var edges = this.graphModel.getEdges(graphCell, incomingEdge, outgoingEdge, false);

				if (this.isEmpty(edges)) {
					console.log({ msg: "指定的画板元件没有关联的连接线", param: graphCell });

					continue;
				}

				//启用/禁用画板元件动画
				this.switchGraphCellsAnimation(edges, switchButton);
			} else if (graphCell.isEdge() && (sourceVertex || targetVertex)) {
				//如果画板元件为连接线
				var vertexes = new Array();

				if (sourceVertex) {
					var edgeSource = graphCell.source;

					if (edgeSource) {
						vertexes.push(edgeSource);
					} else {
						console.log({ msg: "获取连接线的来源图形为空", param: graphCell });
					}
				}

				if (targetVertex) {
					var edgeTarget = graphCell.target;

					if (edgeTarget) {
						vertexes.push(edgeTarget);
					} else {
						console.log({ msg: "获取连接线的目标图形为空", param: graphCell });
					}
				}

				//启用/禁用画板元件动画
				this.switchGraphCellsAnimation(vertexes, switchButton);
			}
		}
	},
	/**
	 * @description 执行脚本
	 */
	executeScript: function (script) {
		if (this.isEmptyString(script)) {
			console.error("参数脚本为空");

			return;
		}

		eval(script);
	},
	/**
	 * @description 根据XML导入画板内容
	 * @param xml XML内容
	 */
	importGraphFromXML: function (xml) {
		if (this.isEmptyString(xml)) {
			console.log("参数XML为空");

			return;
		}

		//检查mxGraph画板是否正常
		if (!this.checkGraph()) return;

		var xmlDOC = mxUtils.parseXml(xml);

		if (this.isEmpty(xmlDOC)) {
			console.error({ msg: "解析XML失败", param: xml });

			return;
		}

		var mgCodec = new mxCodec(xmlDOC);

		if (this.isEmpty(mgCodec)) {
			console.error({ msg: "根据解析的XML创建mxCodec失败", param: xmlDOC });

			return;
		}

		var xmlDOCTopElement = xmlDOC.documentElement;

		if (this.isEmpty(xmlDOCTopElement)) {
			console.error({ msg: "根据解析的XML获取主元素失败", param: xmlDOC });

			return;
		}

		var xmlDOCElement = xmlDOCTopElement.firstChild;

		if (this.isEmpty(xmlDOCElement)) {
			console.error({ msg: "根据XML主元素获取第一个子元素失败", param: xmlDOCTopElement });

			return;
		}

		this.graph.isImporting = true;

		//清楚画板模型上所有内容
		this.graphModel.clear();

		//清除画板模型后需要重新赋值画板父项
		this.graphParent = this.graph.getDefaultParent();

		var graphModelRoot = this.graphModel.root;

		if (this.isEmpty(graphModelRoot)) {
			console.error({ msg: "获取mgGraphModelRoot画板模型根项失败", param: this.graphModel });

			return;
		}

		graphModelRoot[this.CONST_ATTRIBUTE_DESIGNERID] = this.designerID;

		while (xmlDOCElement) {
			var decodeXMLDOCElement = mgCodec.decode(xmlDOCElement);

			if (this.isEmpty(decodeXMLDOCElement)) {
				console.error({ msg: "解码XML元素失败", param: xmlDOCElement });

				xmlDOCElement = xmlDOCElement.nextSibling;

				continue;
			}

			var decodeXMLDOCElementParent = decodeXMLDOCElement.getParent();

			if (this.isEmpty(decodeXMLDOCElementParent)) {
				this.graph.addCell(decodeXMLDOCElement);
			} else {
				var childCount = this.graphModel.getChildCount(decodeXMLDOCElementParent);

				this.graph.addCell(decodeXMLDOCElement, decodeXMLDOCElementParent, childCount);
			}

			xmlDOCElement = xmlDOCElement.nextSibling;
		}

		//重新验证画板视图的所有元件状态，解决通过XML导入后，有子项的元件上无法显示展开，收缩按钮
		this.graphView.revalidate();

		this.undoManager.clear();

		this.refreshUndoRedo();

		this.setClipboardCells(null);

		this.refreshCopyCutPaste();

		this.graph.isImporting = false;
	},
	/**
	 * @description 输出可直接使用的XML
	 * @return string XML字符串
	 */
	getXML: function () {
		//检查mxGraph画板是否正常
		if (!this.checkGraph()) return;

		var xmlDOC = mxUtils.createXmlDocument();

		if (this.isEmpty(xmlDOC)) {
			console.error("调用mxUtils的创建XML文档模板函数 createXmlDocument 失败");

			return;
		}

		var mgCodec = new mxCodec(xmlDOC);

		if (this.isEmpty(mgCodec)) {
			console.error({ msg: "根据mxUtils创建的XML文档模板创建mxCodec失败", param: xmlDOC });

			return;
		}

		var encodeMGGraphModel = mgCodec.encode(this.graphModel);

		if (this.isEmpty(encodeMGGraphModel)) {
			console.error({ msg: "调用mxCodec的编码函数 encode 编码画板模型 mgGraphModel 失败", param: this.graphModel });

			return;
		}

		var xml = this.convertToXML(encodeMGGraphModel);

		if (this.isEmptyString(xml)) {
			console.log({ msg: "根据编码的画板模型 mgGraphModel 输出XML内容失败", param: encodeMGGraphModel });

			return;
		}

		return xml;
	},
	/**
	 * @description 根据画板模型节点将画板的内容转换成可直接使用的XML
	 * @param node 节点
	 * @param tab Tab字符（默认 "  "）
	 * @param indent 缩进字符串
	 * @param newline 新行字符（默认 "\r\n"）
	 * @param nameSpace 名称空间
	 * @return string XML字符串
	 */
	convertToXML: function (node, tab, indent, newline, nameSpace) {
		if (this.isEmpty(node)) {
			console.error("参数节点为空");

			return;
		}

		var result = new Array();

		tab = (this.isEmptyString(tab)) ? "  " : tab;
		indent = (this.isEmptyString(indent)) ? "" : indent;
		newline = (this.isEmptyString(newline)) ? "\r\n" : newline;

		var nodeName = node.nodeName;

		if (this.isEmptyString(nodeName)) {
			console.log({ msg: "节点名称为空", param: node });

			return;
		}

		var nodeID = node.id;

		//如果节点ID是0或1则不需要输出，这两个元件是画板自带的导入时不需要生成
		if (nodeID && ("0" == nodeID || "1" == nodeID)) return;

		//如果节点的名称空间不为空，且与参数名称空间不同，则赋值节点的xmlns属性为节点的名称空间
		if ((!this.isEmpty(node.namespaceURI)) && node.namespaceURI != nameSpace) {
			nameSpace = node.namespaceURI;

			if (node.getAttribute('xmlns') == null) {
				node.setAttribute('xmlns', nameSpace);
			}
		}

		//根据节点类型，输出不同内容
		if (node.nodeType == mxConstants.NODETYPE_TEXT) {
			//节点类型是文字

			var textContent = mxUtils.getTextContent(node);

			if (textContent.length > 0) result.push(indent + mxUtils.htmlEntities(mxUtils.trim(textContent), false));
		} else {
			//节点类型不是文字

			//如果节点名称=mxGraphModel，则不输出，因为会导致无法直接导入
			if ("mxGraphModel" != nodeName) result.push(indent + "<" + nodeName);

			//获取节点属性数组
			var nodeAttrs = node.attributes;

			//如果有节点属性，则循环输出所有属性
			if (!this.isEmptyArray(nodeAttrs)) {
				var nodeAttrsLength = nodeAttrs.length;

				for (var index = 0; index < nodeAttrsLength; index++) {
					var nodeAttr = nodeAttrs[index];

					if (!nodeAttr) {
						console.log({ msg: "获取的第" + index + "个节点属性无效", param: [nodeAttr, index] });

						continue;
					}

					var nodeAttrName = nodeAttr.nodeName;

					var nodeAttrValue = nodeAttr.value;

					if (this.isEmptyString(nodeAttrName) || !nodeAttrValue) continue;

					var nodeAttrValueHTML = mxUtils.htmlEntities(nodeAttrValue);

					if (this.isEmptyString(nodeAttrValueHTML)) continue;

					result.push(" " + nodeAttrName + "=\"" + nodeAttrValueHTML + "\"");
				}
			}

			var childNode = node.firstChild;

			if (!this.isEmpty(childNode)) {
				//如果节点名称=mxGraphModel，则不输出，因为会导致无法直接导入
				if ("mxGraphModel" != nodeName) result.push(">" + newline);

				//循环输出所有子节点
				while (!this.isEmpty(childNode)) {
					//如果节点名称=mxGraphModel，则不输出，因为会导致无法直接导入
					result.push(this.convertToXML(childNode, tab, "mxGraphModel" != nodeName ? indent + tab : "", newline, nameSpace));

					childNode = childNode.nextSibling;
				}

				if ("mxGraphModel" != nodeName) result.push(indent + "</" + nodeName + ">" + newline);
			} else {
				result.push("/>" + newline);
			}
		}

		return result.join("");
	},
	/**
	 * @description 切换显示调试浮动按钮组
	 * @param switchButton 切换显示（默认：false）
	 */
	switchDebug: function (switchButton) {
		if (!this.isBoolean(switchButton)) switchButton = false;

		if (this.isEmpty(this.divDebug)) {
			console.error("获取DIV " + this.CONST_DIVDEBUGID + " 失败");

			return;
		}

		if (switchButton) {
			this.divDebug.style.display = "block";
		} else {
			this.divDebug.style.display = "none";
		}
	},
	/**
	 * @description 切换显示浮动按钮组
	 * @param divGroup 浮动按钮组
	 * @param switchButton 切换显示（默认：false）
	 */
	switchFlatButtonGroup: function (divGroup, switchButton) {
		if (this.isEmpty(divGroup)) {
			console.error("参数浮动按钮组为空");

			return;
		}

		if (!this.isBoolean(switchButton)) switchButton = true;

		if (switchButton) {
			divGroup.style.visibility = "visible";
		} else {
			divGroup.style.visibility = "hidden";
		}
	},
	/**
	 * @description 切换显示设计器顶端面板
	 * @param switchButton 切换显示（默认：false）
	 */
	switchTopPanel: function (switchButton) {
		if (!this.isBoolean(switchButton)) switchButton = false;

		if (this.isEmpty(this.divTopPanel)) {
			console.error("获取DIV " + this.CONST_DIVTOPPANELID + " 失败");

			return;
		}

		if (switchButton) {
			this.divTopPanel.style.display = "table-row";
		} else {
			this.divTopPanel.style.display = "none";
		}
	},
	/**
	 * @description 导入工具箱元件
	 * @param cells 工具箱元件集合
	 */
	importToolBoxCells: function (cells) {
		if (this.isEmptyArray(cells)) {
			console.error("参数工具箱元件集合为空");

			return;
		}

		if (this.isEmpty(this.divToolBox)) {
			console.error("获取DIV " + this.CONST_DIVTOOLBOXID + " 失败");

			return;
		}

		//工具箱元件点击函数
		var toolboxCellOnClickFunc = function () {
			if (!this.pdd) return;
			var pdd = this.pdd;

			pdd.setSelectedFlatButtonGroupChild([this], pdd.toolBoxCells);

			pdd.divToolBoxSelectedCell = this;
		};

		var cellsLength = cells.length;

		for (var index = 0; index < cellsLength; index++) {
			var cell = cells[index];

			if (this.isEmpty(cell)) {
				console.error({ msg: "参数工具箱元件集合第" + index + "项为空", param: cells });
				continue;
			}

			var id = cell[this.CONST_ATTRIBUTE_FLATBUTTONID];

			if (this.isEmptyString(id)) {
				console.error({ msg: "参数工具箱元件集合第" + index + "项的" + this.CONST_ATTRIBUTE_FLATBUTTONID + "属性为空", param: cell });

				continue;
			}

			cell[this.CONST_ATTRIBUTE_FLATBUTTONID] = this.CONST_PREFIX_TOOLBOXCELL + id;
			cell[this.CONST_ATTRIBUTE_FLATBUTTONSTYLECLASS] = this.CONST_CSSSTYLE_BUTTON;
			cell[this.CONST_ATTRIBUTE_FLATBUTTONONCLICKFUNC] = toolboxCellOnClickFunc;
		}

		this.importFlatButtonGroupChildren(this.divToolBox, cells);

		this.fillToolBoxCells();

		this.arrangeFlatElement();
	},
	/**
	 * @description 触发按钮悬停效果
	 * @param button 按钮
	 * @param timeout 时限（毫秒）
	 */
	triggerFlatButtonHover: function (button, timeout) {
		if (this.isEmpty(button)) {
			console.error("参数按钮为空");

			return;
		}

		if (this.isEmpty(button.style)) {
			console.error("参数按钮不是有效的HTML元素");

			return;
		}

		button.style.backgroundColor = "#efefef"

		if (this.isNumber(timeout)) {
			if (timeout > 0) {
				window.setTimeout(this.cancelFlatButtonHover, timeout, button, this);
			}
		}
	},
	/**
	 * @description 取消按钮悬停效果
	 * @param button 按钮
	 */
	cancelFlatButtonHover: function (button, pdd) {
		if (!pdd) pdd = this;

		if (pdd.isEmpty(button)) {
			console.error("参数按钮为空");

			return;
		}

		if (pdd.isEmpty(button.style)) {
			console.error("参数按钮不是有效的HTML元素");

			return;
		}

		button.style.backgroundColor = "#ffffff"
	},
	/**
	 * @description 测试
	 */
	test: function () {
		if (this.isEmptyString(this.designerID)) {
			console.error("参数设计器ID为空");

			return;
		}

		var divDebugImportToolbarCells = document.getElementById("pddDebugImportToolbarCells-" + this.designerID);

		if (!this.isEmpty(divDebugImportToolbarCells)) {
			divDebugImportToolbarCells.onclick.call(divDebugImportToolbarCells);
		}

		var divDebugImportFromXML = document.getElementById("pddDebugImportFromXML-" + this.designerID);

		if (!this.isEmpty(divDebugImportFromXML)) {
			divDebugImportFromXML.onclick.call(divDebugImportFromXML);
		}

		//检查mxGraph画板是否正常
		if (!this.checkGraph()) return;

		if (!this.graph.isEnabled()) return;

		var graphParentChildren = this.graphParent.children;

		if (this.isEmptyArray(graphParentChildren)) {
			console.error({ msg: "画板中没有任何元件", param: this.graphParent });

			return;
		}

		this.graph.setSelectionCell(graphParentChildren[0]);
	},
	/**
	 * @description 设置剪贴板元件集合
	 * @param cells 元件集合
	 */
	setClipboardCells: function (cells) {
		this.clipboardCells = cells;
	},
	/**
	 * @description 获取剪贴板元件集合
	 * @return Array 剪贴板元件集合
	 */
	getClipboardCells: function () {
		return this.clipboardCells;
	},
	/**
	 * @description 检查剪贴板是否为空
	 * @return boolean 剪贴板是否为空
	 */
	isClipboardEmpty: function () {
		return this.getClipboardCells() == null;
	},
	/**
	 * @description 剪贴元件到剪贴板
	 * @param cells 元件集合
	 * @return Array 剪贴元件集合
	 */
	cutClipboard: function (cells) {
		var cells = this.copyClipboard(cells);
		this.clipboardInsertCount = 0;
		this.removeGraphCells(cells);

		return cells;
	},
	/**
	 * @description 删除画板元件
	 * @param cells 元件集合
	 */
	removeGraphCells: function (cells) {
		if (!this.checkGraph()) return;
		this.graph.removeCells(cells);
	},
	/**
	 * @description 复制元件到剪贴板
	 * @param cells 元件集合
	 * @return Array 复制元件集合
	 */
	copyClipboard: function (cells) {
		if (!this.checkGraph()) return;
		var cells = cells || this.graph.getSelectionCells();
		var result = this.graph.getExportableCells(this.graph.model.getTopmostCells(cells));
		this.clipboardInsertCount = 1;
		this.setClipboardCells(this.graph.cloneCells(result));

		return result;
	},
	/**
	 * @description 将剪贴板内容粘贴到画板上
	 * @return Array 粘贴元件集合
	 */
	pasteClipboard: function () {
		if (!this.checkGraph()) return;
		var cells = null;

		if (!this.isClipboardEmpty()) {
			cells = this.graph.getImportableCells(this.getClipboardCells());
			var delta = this.clipboardInsertCount * this.CONST_CLIPBOARDSTEPSIZE;
			var parent = this.graph.getDefaultParent();
			cells = this.graph.importCells(cells, delta, delta, parent);

			this.clipboardInsertCount++;
			this.graph.setSelectionCells(cells);
		}

		return cells;
	}
}

