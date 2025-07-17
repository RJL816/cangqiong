(function(KDApi, $) {
	function MyComponent(model) {
		this._setModel(model)
	}

	var themeColor // 顶层变量声明
	var isUpdate = false;

	// 成员变量
	var self = {};

	// 节点信息
	var nodeInfos;
	var inited = false;

	var key1;
	var key2;
	var key3;
	var key4;
	var key5;
	var key6;
	var key7;
	var key8;
	var key9;

	function initWords(model) {
		nodeInfos = KDApi.getLangMsg(model, 'nodeInfos');
		key1 = KDApi.getLangMsg(model, 'key0001');
		key2 = KDApi.getLangMsg(model, 'key0002');
		key3 = KDApi.getLangMsg(model, 'key0003');
		key4 = KDApi.getLangMsg(model, 'key0004');
		key5 = KDApi.getLangMsg(model, 'key0005');
		key6 = KDApi.getLangMsg(model, 'key0006');
		key7 = KDApi.getLangMsg(model, 'key0007');
		key8 = KDApi.getLangMsg(model, 'key0008');
		key9 = KDApi.getLangMsg(model, 'key0009');
	}

	MyComponent.prototype = { // 内部函数不推荐修改
		_setModel : function(model) {
			this.model = model // 内部变量挂载
		},
		init : function(props) {
			console.log('-----init', this.model, props)
			var model = this.model
			inited = false;
			initWords(model);
			setHtml(model, props);
		},
		update : function(props) {
			console.log('-----update', this.model, props)
			themeColor = getThemeColor(props.theme)
			var model = this.model
			initWords(model);
			updateHtml(model, props);
		},
		destoryed : function() {
			console.log('-----destoryed', this.model)
		}

	}

	/*
	 * 外部函数声明
	 */
	var setHtml = function(model, props, isUpdate) {
		var prefix = model.pageId + "_node_"; 
		setTimeout(func, 1);

		function func() {
			if (getObj(prefix, "link").length > 0  // 等到模板节点的最后一个子元素加载完成才判定为平台初始化完成
					&& $("#node_template .lazy-component").length <= 0) {
				setCtrlHtml(model, props, isUpdate);
				setNodeHtml(model, props, isUpdate);
				initEvent(model, props);
				inited = true;
			} else {
				setTimeout(func, 1);
			}
		}
	}

	function setCtrlHtml(model, props, isUpdate) {
		var div = $('<div id="guideTipsTxt" class="_1ir-IzK4 _3wxkawCQ" style="color: rgb(130, 130, 130); font-size: 16px;"></div>');
		div.append('<span>' + key1 + '</span>');
		div
				.append('<span id="itemcount" style="color: rgb(85, 130, 243);"></span>');
		div.append('<span>' + key2 + '</span>');
		$("div#guidetips")
				.append(div)
				.append(
						$('<div id="nodeTipsTxt" class="_1ir-IzK4 _3wxkawCQ" style="color: rgb(130, 130, 130); font-size: 16px; display:none"></div>'));
	}

	function setNodeHtml(model, props, isUpdate) {
		var templateNode = $("#node_template");
		var node_panel = $("#node_panel");
		var nodesHtml = "";
		for ( var key in nodeInfos) {
			var html = templateNode.prop("outerHTML");
			html = html.replace("node_template", key);
			html = html.replace("node_lock", key + "_lock");
			html = html.replace("flex_label", key + "_flex_label");
			html = html.replace("node_confirmed", key + "_confirmed");
			html = html.replace("node_label", key + "_label");
			html = html.replace("node_desc", key + "_desc");
			html = html.replace("node_link", key + "_link");
			nodesHtml = nodesHtml + html;
			self[key] = {};
		}
		var nodes = $(nodesHtml);
		nodes.css("display", "inherit").find("div").removeAttr("title");
		node_panel.append(nodes);
		templateNode.css("display", "none");
	}

	var translateX = 0;
	function moveLeftOrRight(dir) {
		var containerWidth = $("#nodepanelcontainer").prop("clientWidth");
		var offset = Math.floor(containerWidth / 170) * 170;
		var nodePanel = $("#node_panel");
		var panelWidth = nodePanel.prop("clientWidth");
		translateX = translateX + offset * dir * -1;
		if (translateX > 0) {
			translateX = 0;
		} else if (translateX < (containerWidth - panelWidth)) {
			translateX = containerWidth - panelWidth;
		}
		nodePanel.animate({
			"left" : translateX + "px"
		}, 500);
	}
	var updateHtml = function(model, props) {
		setTimeout(func, 1);
		function func() {
			if (inited) {
				updateCtrlHtml(model, props);
				updateNodeHtml(model, props);
			} else {
				setTimeout(func, 1);
			}
		}
	}
	function updateCtrlHtml(model, props) {
		var data = props.data;
		if (!data)
			return;
		if (data.itemcount != undefined) {
			$("span#itemcount").text(data.itemcount);
		}
	}

	var unconfirmedCSS = {
		"background-color" : "#FBFBFC",
		"border" : "1px solid #CCCCCC"
	};

	var confirmedCSS = {
		"background-color" : "#E6F5F1",
		"border" : "1px solid #2EBE7F"
	};
	function updateNodeHtml(model, props) {
		var data = props.data;
		if (!data)
			return;
		if (data.refreshNodes != undefined) {
			for ( var index in data.refreshNodes) {
				refreshNode(model, data.refreshNodes[index]);
			}
		} else {
			refreshNode(model, data);
		}
	}

	function refreshNode(model, data) {
		var prefix = model.pageId + "_" + data.nodeKey + "_";
		if (data.label) {
			getObj(prefix, "label").text(data.label);
		}

		if (data.lock) {
			getObj(prefix, "desc").css("display", "inherit");
			getObj(prefix, "link").css("display", "none");
			$("#" + data.nodeKey + "_lock").css("display", "inherit");
			$("#" + data.nodeKey + "_confirmed").css("display", "none");
			$("#" + data.nodeKey + "_flex_label").css("border-bottom",
					"1px dashed #C7CBD3");
			getObj(prefix, "desc").text(key3);
			getObj(prefix, "link").text("");
		} else if (data.nodeKey == 'node_endinit') {
			getObj(prefix, "desc").css("display", "none");
			$("#" + data.nodeKey + "_lock").css("display", "none");
			$("#" + data.nodeKey + "_confirmed").css("display", "none");
			getObj(prefix, "link").css("display", "inherit");
			getObj(prefix, "link").text(key4);
		} else {
			if (data.confirmed != undefined) {
				$("#" + data.nodeKey).css(
						data.confirmed ? confirmedCSS : unconfirmedCSS);
				$("#" + data.nodeKey + "_confirmed").css("display",
						data.confirmed ? "inherit" : "none");
				$("#" + data.nodeKey + "_flex_label").css(
						"border-bottom",
						"1px dashed "
								+ (data.confirmed ? "#3FD7C2" : "#C7CBD3"));
				getObj(prefix, "label").css("color",
						data.confirmed ? "#26B175" : "#666666");
			}
			if (data.dataStatus != undefined) {
				self[data.nodeKey].dataStatus = data.dataStatus;
				if (self[data.nodeKey].dataStatus == '0') {
					getObj(prefix, "desc").css("display", "inherit");
					getObj(prefix, "link").css("display", "inherit");
					$("#" + data.nodeKey + "_lock").css("display", "none");
					getObj(prefix, "desc").text(key5);
					getObj(prefix, "link").text(key6);
				} else if (self[data.nodeKey].dataStatus == '1') {
					getObj(prefix, "desc").css("display", "none");
					getObj(prefix, "link").css("display", "inherit");
					$("#" + data.nodeKey + "_lock").css("display", "none");
					getObj(prefix, "desc").text("");
					getObj(prefix, "link").text(key9);
				}
			}
		}

		if (data.visible != undefined) {
			$("#" + data.nodeKey).css("display",
					data.visible ? "inherit" : "none");
		}
	}

	// 标签类控件没有id属性，因此用 data-page-id 获取
	function getObj(prefix, suffix) {
		return $("[data-page-id=" + prefix + suffix + "]");
	}

	/*
	 * 将主题色转为对应色值
	 */
	function getThemeColor(themeColor) {
		switch (themeColor) {
		case 'blue':
			return '#5582F3'
			break
		case 'green':
			return '#29C392'
			break
		case 'orange':
			return '#FC8555'
			break
		case 'purple':
			return '#6869FB'
			break
		}
	}

	/*
	 * 通过自定义控件，向平台后端发送点击事件
	 */
	var initEvent = function(model, props) {
		initCtrlEvent(model, props);
		initNodeEvent(model, props);
	}
	function initCtrlEvent(model, props) {
		$("div#prev").click(function() {
			moveLeftOrRight(-1);
		});
		$("div#next").click(function() {
			moveLeftOrRight(1);
		});
	}
	var inNode;
	function initNodeEvent(model, props) {
		var selector = "";
		var clickSelector = "";
		for ( var key in nodeInfos) {
			selector = selector += ("#" + key + ",")
			clickSelector = clickSelector + "[data-page-id=" + model.pageId
					+ "_" + key + "_link],";
		}
		$(selector.substr(0, selector.length - 1)).mouseenter(function() {
			inNode = true;

			var guideTipsObj = $("div#guidetips")
			var guideTipsTxt = $("div#guideTipsTxt");
			var nodeTipsTxt = $("div#nodeTipsTxt");

			guideTipsObj.hide();
			nodeTipsTxt.html(nodeInfos[this.id][1]);
			nodeTipsTxt.css("display", "inherit");
			guideTipsTxt.css("display", "none");
			guideTipsObj.fadeIn(100);
		}).mouseleave(function() {
			inNode = false;
			setTimeout(function() {
				if (inNode) {
					return;
				}
				var guideTipsObj = $("div#guidetips")
				var guideTipsTxt = $("div#guideTipsTxt");
				var nodeTipsTxt = $("div#nodeTipsTxt");

				guideTipsObj.hide();
				nodeTipsTxt.css("display", "none");
				guideTipsTxt.css("display", "inherit");
				guideTipsObj.fadeIn(100);
			}, 100);
		});

		$(clickSelector.substr(0, clickSelector.length - 1)).click(function() {
			var nodeKey = this.parentElement.parentElement.id;
			model.invoke('click', {
				"initGuideEvent" : true,
				"nodeKey" : nodeKey,
				"type" : "clicklink",
				"dataStatus" : self[nodeKey].dataStatus,
				"top.outerWidth" : top.outerWidth,
				"top.outerHeight" : top.outerHeight
			})
		});
	}
	console.log('-----------------init')
	// 注册自定义控件
	KDApi.register('fainitguidectrl', MyComponent, {
		isMulLang : true
	})
})(window.KDApi, jQuery)