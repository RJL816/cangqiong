(function(KDApi, $) {
	function MyComponent(model) {
		this._setModel(model)
	}

	var themeColor // 顶层变量声明
	var isUpdate = false;

	// 成员变量
	var self = {};
	
	var text_collapse;
	var text_show;

	MyComponent.prototype = { // 内部函数不推荐修改
		_setModel : function(model) {
			this.model = model // 内部变量挂载
		},
		init : function(props) {
			console.log('-----init', this.model, props)
			var model = this.model;
			text_collapse = KDApi.getLangMsg(model, 'textcollapse');
			text_show = KDApi.getLangMsg(model, 'textshow');
			setHtml(model, props);
		},
		update : function(props) {
			console.log('-----update', this.model, props)
			themeColor = getThemeColor(props.theme)
			updateHtml(this.model, props)
		},
		destoryed : function() {
			console.log('-----destoryed', this.model)
		}

	}

	var collapse = false;
	var showClass = "_3paPDUA5";


	/*
	 * 外部函数声明
	 */
	var setHtml = function(model, props, isUpdate) {
		setTimeout(func, 1);
		function func() {
			var filterswitchpanel = $("#filterswitchpanel");
			if (filterswitchpanel.length > 0) {
				// 解析配置
				var configItems = props.configItems;
				var _collapse = false;
				if (configItems)
					for (var i = 0; i < configItems.length; i++) {
						var configItem = configItems[i];
						if (configItem.key == 'collapse') {
							if (configItem.value == 'true')
								_collapse = true;
						}
					}

				// 初始化DOM
				filterswitchpanel.parent().addClass("nKucKDtU");
				filterswitchpanel.addClass("_1-Uw1GAv _3paPDUA5")
				filterswitchpanel.append("<span id='filterswitch'>"
						+ (_collapse ? text_show : text_collapse) + "</span>");
				filterswitchpanel
						.append("<div class='_2t2gC2FF'><i class='_2fsBwKDY kdfont kdfont-xiala'></i></div>");
				filterswitchpanel.append(filterswitchpanel);


				initEvent(model, props);

				if (_collapse) {
					collapseFilterPanel();
				}
			} else {
				setTimeout(func, 1);
			}
		}
	}

	var updateHtml = function(model, props) {

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
		$("#filterswitchpanel").click(function() {
			if (collapse) {
				showFilterPanel();
			} else {
				collapseFilterPanel();
			}
		});
		$("#querybtn").click(function() {
			collapseFilterPanel();
		});
	}

	function showFilterPanel() {
		// 展开
		$("#filterswitchpanel").addClass(showClass);
		$("#filterswitch").text(text_collapse);
		$("#filterpanel").show();
		collapse = false;
	}

	function collapseFilterPanel() {
		// 收起
		$("#filterswitchpanel").removeClass(showClass);
		$("#filterswitch").text(text_show);
		$("#filterpanel").hide();
		collapse = true;
	}

	console.log('-----------------init')
	// 注册自定义控件
	KDApi.register('farealcardf7', MyComponent, {
		isMulLang : true
	})
})(window.KDApi, jQuery)