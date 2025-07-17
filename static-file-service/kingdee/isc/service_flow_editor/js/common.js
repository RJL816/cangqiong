var M = {};
M.btnCancel = null;

M.src = function(event, ctrl) {
	if (event) {
		M.target = event.target || event.srcElement;
	}
	if (!M.target) {
		M.target = ctrl;
	}
};

/**
 * 显示帮助信息，用于个性化覆盖
 */
M.showHelp = function(help, event) {
	var e = _("__help_tips");
	if (!e) {
		var html = "<div class='__help_container'><div id='__help_tips' class='__help_tips'></div><div class='__help_pos_flag'></div></div>";
		$(document.body).append(html);
		e = _("__help_tips");
	}

	$(e).text(help);
	M.showMenu(e.parentNode, event.target || event.srcElement, 'top');
};

$(window).unload(function() {
	M.target = null;
});

M.tipsTimeout = 0;

// 显示提示信息
M.showTips = function(tips, type) {
	if (typeof (tips) !== 'string') {// 如果是错误对象，则
		if (tips.text && tips.type) {// 来自 MESSAGE_BOX 的消息
			type = tips.type;
			tips = tips.text;
		} else {// 错误对象
			var stacktrace = tips.stacktrace ? tips.stacktrace : tips.stack;
			if (stacktrace) {
				tips = tips.message + "\r\n\r\n" + stacktrace;
			} else {
				tips = tips.message;
			}

			if (!type) {
				type = "error";
			}

			// 向浏览器控制台输出错误日志
			if (window.console && window.console.error) {
				console.error(tips);
			}
		}
	}

	var form = _("TIPS");
	if (!form) {
		alert(tips);
		return;
	}

	var div = getChild("DIV", form);
	div.className = type ? type : "info";

	div.innerHTML = "<div><table><tr height='32'><td class='FLAG' width='32'></td>"
			+ "<td id='_tips_content' class='MESSAGE'>"
			+ M.escape(tips)
			+ "</td></tr></table></div>";

	var delay = type == "warn" ? 3000 : (type == "error" ? 4000 : 3000);
	if (!M.tipsTimeout) {
		window.clearTimeout(M.tipsTimeout);
	}

	$(form).fadeIn();

	// 优化隐藏，当多次重复调用时取消尚未到期的定时器
	M.tipsTimeout = window.setTimeout(function() {
		M.tipsTimeout = 0;
		$(form).fadeOut();
	}, delay);
};

/**
 * 在当前提示上附加提示信息。
 */
M.appendTips = function(text) {
	var container = $(_("_tips_content", _("TIPS")));
	container.text(container.text() + " " + text);
};

// 显示消息提示
M.showMessage = function(message, title, ok, width, height, dialogClass) {
	M.target = null;
	if (!title) {
		title = res("life.sys.title.info");
	}

	var msg = _("MESSAGE");
	if (!msg) {
		alert(message);
		return;
	}

	if (message.substring(0, 1) != '<') {
		message = "<div class='content simple-message'>" + M.escape(message)
				+ "</div>";
		height = Math.min(150, (Math.ceil(message.length / 20) * 2 + 10) * 14);
	} else {
		if (!height) {
			height = 150;
		}
	}
	msg.innerHTML = message;

	if (!width) {
		width = 520;
	}

	var dialog = msg.parentNode;
	if (!dialogClass) {
		dialogClass = "dialog";
	} else {
		dialogClass += " dialog";
	}
	dialog.className = dialogClass;

	$(".header", dialog).text(title);

	M.moveCenter(dialog, width, height);

	$(".ok", dialog).val(res("life.sys.label.ok"));
	M.showMask();

	if (ok) {
		_("CLOSE", dialog).style.display = "none";
	} else {
		_("CLOSE", dialog).style.display = "";
	}

	M.ok = function() {
		if (ok && ok() === false) {
			return;
		}

		dialog.style.display = "none";
		M.hideMask();
	};
	return;
};

M.moveCenter = function(dialog, width, height) {
	var body = $(window);
	var left = (body.width() - width) / 2;
	var top = (body.height() - height) / 2;
	if (left < 0) {
		left = 0;
	}
	if (top < 0) {
		top = 0;
	}

	/*dialog.style.left = left + 'px';
	dialog.style.top = document.body.scrollTop + top + 'px';*/
	dialog.style.display = "block";
};

/**
 * 显示确认
 */
M.showConfirm = function(message, title, ok, width, height, hideCancel, src,
		hideOK) {
	// if (!title)
	// title = res("life.sys.label.confirm");
	title = "·操作确认";
	var body = $(window);

	if (!width) {
		width = Math.min(250, body.width() - 50);
	}

	var msg = _("CONFIRM");

	var html = "";
	if (message.substring(0, 1) != '<') {
		html = "<div class='content' style='width:" + width
				+ "px;min-height:80px; max-height:200px;overflow:auto;'>"
				+ M.escape(message) + "</div>";
	} else {
		html = message;

	}
	msg.innerHTML = html;

	if (!height) {
		height = (Math.ceil(message.length / 20) * 2 + 10) * 14;
		if (height > 300) {
			height = 300;
		}
	}
	height += 30;// 下方工具条位置

	var dialog = msg.parentNode;
	if (title) {
		$(".header", dialog).html(title).show();
		_("CLOSE", dialog).style.display = "";
	} else {
		$(".header", dialog).hide();
		_("CLOSE", dialog).style.display = 'none';
	}

	var left = (body.width() - width) / 2 - 2;
	var top = (body.height() - height) / 2 - 2;

	if (left < 0) {
		left = 0;
	}
	if (top < 0) {
		top = 0;
	}

	var bottom = null;
	if (!src) {// 没有提供事件源, 则遮盖页面
		M.showMask();
	} else {// 否则不遮盖页面
		var el = $(src);
		var pos = el.offset();
		left = pos.left;
		top = pos.top + el.height() + 2;

		var maxHeight = body.height();
		if (maxHeight < top + height) {
			bottom = body.height() - pos.top;
		}

		if (bottom + height > maxHeight) {
			top = (body.height() - height) / 2 - 2;
			bottom = null;
		}
	}

	if (left + width > body.width()) {
		left = Math.floor(body.width() - width) / 2;
	}

	/*dialog.style.left = left + 'px';
	if (bottom !== null) {
		dialog.style.bottom = document.body.scrollTop + bottom + 'px';
		dialog.style.top = '';
	} else {
		dialog.style.bottom = '';
		dialog.style.top = document.body.scrollTop + top + 'px';
	}*/
	dialog.style.display = "block";

	if (hideOK && hideCancel) {
		$(".footer", dialog).hide();
	} else {
		$(".footer", dialog).show();

		var btnOK = $(".ok", dialog);
		if (hideOK) {
			btnOK.hide();
		} else {
			btnOK.val(res("life.sys.label.ok"));
			btnOK.show();
			btnOK.focus();
		}

		var btnCancel = $(".cancel", dialog);
		if (hideCancel) {
			btnCancel.hide();
		} else {
			btnCancel.val(res("life.sys.label.cancel"));
			btnCancel.show();
			M.btnCancel = btnCancel;
		}
	}

	M.ok = function() {
		if (ok() === false) {
			return;
		}
		M.close();
	};
	return;
};

M.ok = function() {
	//
};

M.close = function() {
	M.btnCancel = null;
	var msg = _("CONFIRM");
	if (msg) {
		msg.innerHTML = "";
		var dialog = msg.parentNode;
		dialog.style.display = 'none';
	}
	M.hideMask();
};

M.mask_stack = 0;

// 遮住窗口
M.showMask = function() {
	var pageContainer = _("PAGE_MASK");
	if (pageContainer) {
		pageContainer.style.display = "none";
	}

	var div = _("MASK_DIV");
	if (div == null) {
		var html = "<div id='MASK_DIV'></div>";
		$(document.body).append(html);
		div = _("MASK_DIV");
	}
	div.style.display = "block";

	M.mask_stack++;

	if (!M.isXS() && window.parent != window.self) {
		if (window.parent.M && window.parent.M.hideDialogHeaderAndFooter) {
			window.parent.M.hideDialogHeaderAndFooter();
		}
	}
};

M.isMaskShown = function() {
	var div = _("MASK_DIV");
	if (div) {
		return !div.style.display;
	} else {
		return false;
	}
}

M.hideMask = function() {
	M.mask_stack--;
	if (M.mask_stack > 0) {
		return;// 防止多次调用MASK掩蔽时，过早的把掩蔽层给隐藏掉
	}

	var div = _("MASK_DIV");
	if (div) {
		div.style.display = 'none';
	}

	var pageContainer = _("PAGE_MASK");
	if (pageContainer) {
		pageContainer.style.display = "block";
	}

	if (!M.isXS() && window.parent != window.self) {
		if (window.parent.M && window.parent.M.showDialogHeaderAndFooter) {
			window.parent.M.showDialogHeaderAndFooter();
		}
	}
};

M.hideDialogHeaderAndFooter = function() {
	var c = _("CONFIRM");
	if (!c) {
		return;
	}

	var dialog = c.parentNode;
	var el = _("CLOSE", dialog);
	el.DISPLAY = el.style.display;
	el.style.display = 'none';

	var el = _("CONFIRM_HEADER", dialog);
	el.DISPLAY = el.style.display;
	el.style.display = 'none';

	var el = _("CONFIRM_FOOTER", dialog);
	el.DISPLAY = el.style.display;
	el.style.display = 'none';
};

M.showDialogHeaderAndFooter = function() {
	var c = _("CONFIRM");
	if (!c) {
		return;
	}

	var dialog = c.parentNode;
	var el = _("CLOSE", dialog);
	var display = el.DISPLAY;
	el.style.display = display ? display : "";

	var el = _("CONFIRM_HEADER", dialog);
	var display = el.DISPLAY;
	el.style.display = display ? display : "";

	var el = _("CONFIRM_FOOTER", dialog);
	var display = el.DISPLAY;
	el.style.display = display ? display : "";
};

M.this_page_url = null;

/**
 * 根据ID找HTML元素
 * 
 * @param id
 * @returns
 */
function _(id, container) {
	if (!container) {
		return document.getElementById(id);
	}

	var children = container.childNodes;
	if (!children) {
		return null;
	}

	for (var i = 0; i < children.length; i++) {
		var el = children[i];
		if (el.id == id) {
			return el;
		}
	}

	for (var i = 0; i < children.length; i++) {
		var el = _(id, children[i]);
		if (el != null) {
			return el;
		}
	}

	return null;
}

/**
 * 根据TAG名称找子节点
 */
function getChild(name, parent) {
	var children = parent.childNodes;
	for (var i = 0; i < children.length; i++) {
		if (children[i].tagName == name) {
			return children[i];
		}
	}
	return null;
}
/**
 * 根据TAG名称查找父节点
 * 
 * @param name
 * @param child
 */
function getParent(name, child) {
	var parent = child.parentNode;
	while (parent.tagName != name) {
		parent = parent.parentNode;
	}
	return parent;
}

/**
 * 获取正确的完整URL
 * 
 * @returns
 */
function getURL(path) {
	return getApp() + "/" + path;
}

/**
 * 获取当前页面的Web应用URL，格式为：http://{server:port}/{app}
 * 
 * @returns
 */
function getApp() {
	if (M.this_page_url == null) {
		M.this_page_url = window.location.href;
	}

	var url = M.this_page_url;
	var j = url.indexOf("/", 9);
	var i = url.indexOf("/", j + 1);
	return url.substring(j, i);
}

/**
 * 对话框特征描述
 * 
 * @param width
 * @param height
 * @returns {String}
 */
function getDialogFeature(width, height) {
	var w = screen.width;
	var h = screen.height;
	var left = Math.floor((w - width) / 2);
	var top = Math.floor((h - height) / 2);
	return "dialogLeft:" + left + "px;"//
			+ "dialogTop:" + top + "px;"//
			+ "dialogWidth:" + width + "px;" //
			+ "dialogHeight:" + height + "px;"//
			+ "resizable:no;status:no;scroll:no";
}

/**
 * 窗口特征描述
 * 
 * @param width
 * @param height
 * @param resizable
 * @returns {String}
 */
function getWindowFeature(width, height, resizable) {
	var w = screen.width;
	if (width > w) {
		width = w;
	}
	var h = screen.height - 100;
	if (height > h) {
		height = h;
	}

	var left = Math.floor((w - width) / 2);
	var top = Math.floor((h - height) / 2);
	return "left=" + left + "," + "top=" + top + "," //
			+ "width=" + width + "," + "height=" + height + ","
			+ "toolbar=no, menubar=no, scrollbars=no,location=no, status=yes,"
			+ "resizable=" + (resizable ? "yes" : "no");
}

// 对参数值进行编码
function encodeParams(params) {
	switch ($getType(params)) {
	case $OTHER:
		return params.toString();
	case $DATE:
		return $dateToString(params);
	default:
		return "json:" + $toString(params);
	}
}

M.isEmpty = function(value) {
	if (value === null) {
		return true;
	} else if (value === undefined) {
		return true;
	} else if (value === '') {
		return true;
	}

	switch ($getType(value)) {
	case $OTHER:
		return false;
	case $DATE:
		return false;
	case $ARRAY:
		return l.length == 0;
	case $MAP:
		for ( var key in value) {
			if (value[key] !== undefined) {
				return false;
			}
		}
		return true;
	}
};

/**
 * 当元素内容太长时, 显示在 tips 中.
 * 
 * @param e
 */
function showTips(e) {
	var el = e.srcElement;
	if (!el)
		el = e.target;
	if (el.tagName == "A")
		el = el.parentNode;

	if (el.tagName == 'PRE' || el.tagName == 'DIV') {
		if (!el.title && (el.scrollWidth > el.clientWidth + 1)) {
			el.title = $(el).text();
		}
	}
}

/**
 * 获取事件的鼠标位置偏移量
 * 
 * @param evt
 * @returns
 */
function getOffset(evt) {
	var target = evt.target;
	if (target.offsetLeft == undefined) {
		target = target.parentNode;
	}
	var pageCoord = getPageCoord(target);
	var eventCoord = {
		x : window.pageXOffset + evt.clientX,
		y : window.pageYOffset + evt.clientY
	};
	var offset = {
		offsetX : eventCoord.x - pageCoord.x,
		offsetY : eventCoord.y - pageCoord.y
	};
	return offset;
}

/**
 * 获取元素在页面上的位置
 * 
 * @param element
 * @returns
 */
function getPageCoord(element) {
	var coord = {
		x : 0,
		y : 0
	};
	while (element) {
		coord.x += element.offsetLeft;
		coord.y += element.offsetTop;
		element = element.offsetParent;
	}
	return coord;
}

/**
 * 对给定数值格式化, 按3个数字一组以逗号分隔.
 * 
 * @param n
 * @returns {String}
 */
function formatNumber(n) {
	if (n === null || n === undefined) {
		return "";
	}

	n = n.toString();
	if (n.length <= 3 || n.indexOf(",") > 0) {
		return n;
	}

	var j = n.indexOf(".");
	if (j < 0) {// 整数
		return formatLeftPart(n, n.length);
	} else {// 小数
		return formatLeftPart(n, j) + "." + formatRightPart(n, j + 1);
	}
}

function formatLeftPart(n, k) {
	var sgn = "";
	if (n.substring(0, 1) === '-') {
		sgn = "-";
		n = n.substring(1);
		k--;
	}

	var i = k - 3;
	var s = "";

	while (k > 0) {
		if (s.length > 0)
			s = "," + s;
		if (i < 0)
			i = 0;
		s = n.substring(i, k) + s;
		k = i;
		i = k - 3;
	}
	return sgn + s;
}

function formatRightPart(n, k) {
	return n.substring(k);// 小数点后部分不需要加分隔符

	// var i = k + 3;
	// var s = "";
	// while (k < n.length) {
	// if (s.length > 0)
	// s += ",";
	// if (i > n.length)
	// i = n.length;
	// s += n.substring(k, i);
	// k = i;
	// i = k + 3;
	// }
	// return s;
}

/**
 * 复制MAP
 * 
 * @param map
 */
function copyMap(map) {
	var x = {};
	for ( var key in map) {
		x[key] = map[key];
	}
	return x;
}

/**
 * 将 from 中的值全部复制到 to 中
 * 
 * @param from
 * @param to
 */
function putAll(from, to) {
	if (!from) {
		return to;
	}

	for ( var key in from) {
		to[key] = from[key];
	}

	return to;
}

/**
 * 
 * @param el
 * @param event
 */
function focusNext(el, event) {
	if (event.keyCode != 13) {
		return;
	}

	var parent = document.body;
	var next = findNextInput(el, parent, 0);
	if (next != 0 && next != 1) {
		// try {
		next.focus();
		// } catch (e) {
		// 可能由于找到的是隐藏的输入框而报错
		// 忽略异常
		// }
	}
	return false;
}

function findNextInput(el, parent, step) {
	var children = parent.childNodes;
	if (!children)
		return step;

	for (var i = 0; i < children.length; i++) {
		var c = children[i];
		if (step == 0) {// 寻找 el
			if (c == el) {// 找到了 el
				step = 1;
				continue;
			} else {
				var returns = findNextInput(el, c, step);
				if (returns == 1) {// 在字节点中找到了 el
					step = 1;
				} else if (returns != 0) {// 找到下一个 input
					return returns;
				}
			}
		} else {
			if ((c.tagName == 'INPUT' && c.type != 'hidden' && c.type != 'button')
					|| c.tagName == "TEXTAREA") {// 找到了下一个 input 或 textarea
				return c;
			}
			var returns = findNextInput(el, c, step);
			if (returns != 1) {
				return returns;
			}
		}
	}
	return step;
}

function resizeWindow(width, height) {
	var w = screen.width;
	var h = screen.height;
	if (width > screen.availWidth) {
		width = screen.availWidth;
	}
	if (height > screen.availHeight) {
		height = screen.availHeight;
	}
	var left = Math.floor((w - width) / 2);
	var top = Math.floor((h - height) / 2);
	window.moveTo(left, top);
	window.resizeTo(width, height);
}

function htmlEncode(str) {
	if (!str)
		return "";

	var s = str.replace(/\&/g, "&gt;");
	s = s.replace(/\</g, "&lt;");
	s = s.replace(/\>/g, "&gt;");
	s = s.replace(/\"/g, "&quot;");
	s = s.replace(/\'/g, "&apos;");
	return s;
}

/**
 * 资源转换
 * 
 * @param code
 * @returns
 */
function res(code) {
	if (!window.RES) { // alert("当前页面未定义 RES 变量!");
		return code + "(0)";
	}

	var text = RES[code];
	if (!text) { // alert("资源 " + code + " 未在 RES 变量中定义!");
		return code + "(1)";
	} else if (arguments.length <= 1) {
		return text;
	} else {
		for (var i = 1; i < arguments.length; i++) {
			var s = "#{" + (i - 1) + "}";
			var j = text.indexOf(s);
			if (j >= 0) {
				text = text.substring(0, j) + arguments[i]
						+ text.substring(j + s.length);
			}
		}
		return text;
	}
}

/**
 * 替换字符串中的占位符，格式为 #{0}, #{1}, ...
 * 
 * 参考 TkUtil.translateURL
 * 
 * @param text
 * @returns
 */
function translateURL(text) {
	var params = [ getApp() ];// 固定参数
	for (var i = 0; i < params.length; i++) {
		var s = "#{" + i + "}";
		var j = text.indexOf(s);
		if (j >= 0) {
			text = text.substring(0, j) + params[i]
					+ text.substring(j + s.length);
		}
	}
	return text;
}

M.checkWindow = function(url) {
	if (M.isXS()) {// 跨域的情况，不予检查
		return true;
	}

	var d = window;
	while (d != d.parent) {
		if (url == d.location.href) {
			return false;
		}
		d = d.parent;
	}
	return true;
};

M.showError = function(err) {
	var message = (typeof (err) == 'string' ? err : err.message);
	// 不对消息进行额外处理以免给消息查看人带来误会
	// message = message.replace(/,/g, ', ');
	// message = message.replace(/=/g, ' = ');

	var stacktrace = err.stacktrace ? err.stacktrace : err.stack;
	var cid = err.cid;
	var title = window.res ? window.res("life.sys.title.error") : "错误提示";
	if (stacktrace) {
		var html = "<div class='content simple-message'>"
				+ "<div class='ERROR_MESSAGE_ICON'></div>"
				+ "<div style='margin-bottom:5px;'>" + M.escape(message)
				+ "</div>";
		html += "<div class='error_stacktrace'>"
				+ "<a href='#' onclick='_$$_showStackTrace(this);return false;'>◇"
				+ (window.res ? window.res("life.sys.label.stack_trace")
						: "详细信息") + "</a>";
		if (err.error_url) {
			var text = window.res ? window.res("life.sys.label.more_help")
					: "更多帮助";
			html += "&nbsp;&nbsp;&nbsp;&nbsp;<a href='" + err.error_url
					+ "' target='_blank'>◇" + text + "</a>";
		}
		html += "<textarea class='stacktrace' readonly='true' onfocus='this.select()'"
				+ " style='display:none;width:100%;height:100px;margin-top:5px;'>"
				+ (cid ? res("life.sys.label.call_code") + ": " + cid + "\r\n"
						: "")
				+ M.escape(stacktrace, true)
				+ "</textarea></div></div>";
		M.showMessage(html, title, null, null, null, "ERROR_MESSAGE_BOX");
	} else {
		var html = "<div class='content simple-message'>"
				+ "<div class='ERROR_MESSAGE_ICON'></div>"
				+ "<div style='margin-bottom:5px;'>" + M.escape(message)
				+ "</div>";
		if (cid) {
			html += "<div class='call-id'>" + res("life.sys.label.call_code")
					+ ": " + cid + "</div>";
		}
		html += "</div>";
		M.showMessage(html, title, null, null, null, "ERROR_MESSAGE_BOX");
	}
};

M.closeDialog = function(btn) {
	btn.parentNode.style.display = 'none';
	M.hideMask();
};

M.escape = function(s, notStrict) {
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

	if (notStrict) {
		// 如果不进行特别严格的转换，则仅不对引号（'，"）进行替换
		return s;
	}

	if (s.indexOf("\r\n") >= 0)
		s = s.replace(/\r\n/g, "<br>");

	if (s.indexOf("\n") >= 0)
		s = s.replace(/\n/g, "<br>");

	if (s.indexOf("\r") >= 0)
		s = s.replace(/\r/g, "<br>");

	if (s.indexOf("\t") >= 0)
		s = s.replace(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;");

	if (s.indexOf("  ") >= 0)
		s = s.replace(/\s\s/g, "&nbsp;&nbsp;");

	if (s.indexOf("'") >= 0) {
		s = s.replace(/\'/g, "&apos;");
	}
	if (s.indexOf("\"") >= 0) {
		s = s.replace(/\"/g, "&quot;");
	}
	return s;
};

M.hideCtrl = function(ctrl, view) {
	if (ctrl) {
		if (view && view.meta.type == 'grid_view') {
			ctrl.style.visibility = "hidden";
		} else {
			ctrl.style.display = "none";
		}
	}
};

M.showCtrl = function(ctrl, view) {
	if (ctrl) {
		if (view && view.meta.type == 'grid_view') {
			ctrl.style.visibility = "";
		} else {
			ctrl.style.display = "";
		}
	}
};

var WEEK_LONG = [ "life.sys.label.sunday", "life.sys.label.monday",
		"life.sys.label.tuesday", "life.sys.label.wednesday",
		"life.sys.label.thursday", "life.sys.label.friday",
		"life.sys.label.saturday" ];

var WEEK_SHORT = [ "life.sys.label.sunday_short",
		"life.sys.label.monday_short", "life.sys.label.tuesday_short",
		"life.sys.label.wednesday_short", "life.sys.label.thursday_short",
		"life.sys.label.friday_short", "life.sys.label.saturday_short" ];
var MONTH = [ "life.sys.month.January", "life.sys.month.February",
		"life.sys.month.March", "life.sys.month.April", "life.sys.month.May",
		"life.sys.month.June", "life.sys.month.July", "life.sys.month.August",
		"life.sys.month.September", "life.sys.month.October",
		"life.sys.month.November", "life.sys.month.December" ];

// /////////////用来在浏览器端缓存数据，以便在不同页面之间共享////////////////////
M.saveData = function(key, value) {
	if (!$.jStorage) {
		$(document).append(
				"<script src='" + getApp() + "/js/jStorage.js'></script>");
	}

	$.jStorage.set(key, value);
};

M.getData = function(key) {
	if (!$.jStorage) {
		$(document).append(
				"<script src='" + getApp() + "/js/jStorage.js'></script>");
	}
	return $.jStorage.get(key);
};

M.clearData = function() {
	if (!$.jStorage) {
		$(document).append(
				"<script src='" + getApp() + "/js/jStorage.js'></script>");
	}
	$.jStorage.flush();
};

M.md5 = function(s) {
	if (!s) {
		s = "";
	}

	// 对字符串进行UTF-8编码
	var t = encodeURI(s);
	if (t != s) {// 如果其中存在需编码的字符，则需要还原
		var a = [];
		for (var j = 0, i = t.indexOf("%", j); i >= 0; j = i + 3, i = t
				.indexOf("%", j)) {
			if (j < i) {
				a.push(t.substring(j, i));
			}
			a.push(eval("'\\x" + t.substring(i + 1, i + 3) + "'"));
		}
		if (j < t.length) {
			a.push(t.substring(j));
		}
		// t = a.join("");
		// alert(s + "\r\n\r\n" + t + "\r\n\r\n" + a.join(""));
		t = a.join("");
	}

	// 对UTF-8编码后的字符串计算MD5哈希值
	if (!window.hex_md5) {
		$(document)
				.append("<script src='" + getApp() + "/js/MD5.js'></script>");
	}

	return hex_md5(t);
};

/**
 * 保存客户端加密的KEY
 */
M.saveKey = function(key) {
	M.saveData("token", key);
};

/**
 * 加密
 */
M.encrypt = function(text) {
	var key = M.getData("token");
	if (!window.TEAencrypt) {
		$(document)
				.append("<script src='" + getApp() + "/js/TEA.js'></script>");
	}
	return TEAencrypt(text, key);
};

/**
 * 服务器当前时间，可能存在几十毫秒的差异。
 */
M.now = function() {
	if (window.TIME_DIFF === undefined) {
		alert(M.this_page_url + " 没有定义TIME_DIFF");
		return new Date().getTime();
	}
	return new Date().getTime() + TIME_DIFF;
};

/**
 * 对URL进行包装，添加访问时间戳
 */
M.wrap = function(url, data) {
	// url 中使用 #{0} 表示 当前Web应用的名称，后续再视需要增加其他,
	// 参考 MenuDispatcher 的 Format.parse(url) 行 //
	url = translateURL(url);

	var key = M.getData("token");
	if (!key || key == "null") {// 客户端没有密码，那么不做处理
		return url;
	}

	if (url.indexOf("http://") < 0 && url.indexOf("https://") < 0
			&& url.indexOf("/") != 0) {
		// 如果不是绝对路径则应以当前页面URL构造一个完整的绝对路径

		var href = M.this_page_url;
		if (href.indexOf("?") > 0) {
			href = href.substring(0, href.indexOf("?"));
		}

		if (url.indexOf("./") == 0) {// 本级目录
			url = url.substring(2);
		} else if (url.indexOf("../") == 0) {// 上溯一级目录
			url = url.substring(3);
			href = href.substring(0, href.lastIndexOf("/"));
		}

		url = href.substring(0, href.lastIndexOf("/") + 1) + url;
	}

	var i = url.indexOf(getApp() + "/");
	if (i < 0) {// 不是本应用的页面，不需要添加时间戳
		return url;
	} else if (i > 0) {// 排除URL中的 http://{server}:{port}/ 前缀
		url = url.substring(i);
	}

	var i = url.lastIndexOf("__TK__=");
	if (i > 0) {
		url = url.substring(0, i - 1);
	}

	// alert(url);

	var token = M.md5(url) + ",";// URL的MD5

	if (data) {// 如果有数据，那么把数据也MD5
		token += M.md5(data) + ",";
	}

	token += M.now();// 再附加服务器的当前时间

	var cipher = M.encrypt(token);
	return url + (url.indexOf('?') > 0 ? "&" : "?") + "__TK__=" + cipher;
};

M.openLink = function(a, event, width, height) {
	var target = !event ? "_blank" : (event.ctrlKey ? "_blank" : a.target);

	if (!target) {
		target = "_self";
	}

	if (width && height) {
		var features = getWindowFeature(width * FONT_SIZE, height * FONT_SIZE);
		window.open(M.wrap(a.href), target, features);
	} else {
		window.open(M.wrap(a.href), target);
	}
	return false;
};

M.showOpenDialog = function() {
	var html = "<form onsubmit='return false;'><table width='500'><tr><td>URL:</td>"
			+ "<td><input id='__my_url__' style='width:400px;' value='"
			+ getApp()
			+ "/biz/' onfocus='this.select()'></td></tr>"
			+ "<tr><td colspan='2'>UI Style:　"
			+ "<a href='"
			+ getApp()
			+ "/sys/classic/frame.jsp' onclick='return M.openLink(this,event)' target='_blank'>Classic</a>,　"
			+ "<a href='"
			+ getApp()
			+ "/sys/modern/frame.jsp' onclick='return M.openLink(this,event)' target='_blank'>Modern</a>,　"
			+ "<a href='"
			+ getApp()
			+ "/sys/default/frame.jsp' onclick='return M.openLink(this,event)' target='_blank'>Default</a>,　"
			+ "<a href='"
			+ getApp()
			+ "/sys/modest/frame.jsp' onclick='return M.openLink(this,event)' target='_blank'>Modest</a><br>";

	if (window.OP && OP.isDeveloper()) {// 仅对开发人员显示以下URL
		html += "API Log:　" //
				+ "<a href='"
				+ getApp()
				+ "/util/api_log.jsp?ON'"
				+ " onclick='return M.openLink(this,event)'"
				+ " target='_blank'>ON</a>,　"
				+ "<a href='"
				+ getApp()
				+ "/util/api_log.jsp?OFF'"
				+ " onclick='return M.openLink(this,event)'"
				+ " target='_blank'>OFF</a>　　"
				+ "Perf. Log:　"
				+ "<a href='"
				+ getApp()
				+ "/util/perform.jsp?ON'"
				+ " onclick='return M.openLink(this,event)'"
				+ " target='_blank'>ON</a>,　"
				+ "<a href='"
				+ getApp()
				+ "/util/perform.jsp?OFF'"
				+ " onclick='return M.openLink(this,event)'"
				+ " target='_blank'>OFF</a>,　"
				+ "<a href='"
				+ getApp()
				+ "/util/op_log.jsp?2000'"
				+ " onclick='_(\"__my_url__\").value=this.href;return false;'"
				+ " title='设置操作日志阈值，执行时长超过此值记录操作日志，单位：毫秒。'>OP Log</a><br>"
				+ "SQL Trace:　"
				+ "<a href='"
				+ getApp()
				+ "/util/sqltrace.jsp?ON'"
				+ " onclick='return M.openLink(this,event)'"
				+ " target='_blank'>ON</a>,　"
				+ "<a href='"
				+ getApp()
				+ "/util/sqltrace.jsp?OFF'"
				+ " onclick='return M.openLink(this,event)'"
				+ " target='_blank'>OFF</a>　　"
				+ "MetaRes:　"
				+ "<a href='"
				+ getApp()
				+ "/util/meta_meta_res.jsp?ON'"
				+ " onclick='return M.openLink(this,event)'"
				+ " target='_blank'>ON</a>,　"
				+ "<a href='"
				+ getApp()
				+ "/util/meta_meta_res.jsp?OFF'"
				+ " onclick='return M.openLink(this,event)'"
				+ " target='_blank'>OFF</a><br>"
				+ "View Logs:　"
				+ "<a href='"
				+ getApp()
				+ "/client_logger'"
				+ " onclick='return M.openLink(this,event)'"
				+ " target='_blank'>Current</a>,　"
				+ "<a href='"
				+ getApp()
				+ "/client_logger?last'"
				+ " onclick='return M.openLink(this,event)'"
				+ " target='_blank'>Last & Current</a>, 　"
				+ "<a href='"
				+ getApp()
				+ "/client_logger?last_only'"
				+ " onclick='return M.openLink(this,event)'"
				+ " target='_blank'>Last Only</a>"
				+ "<br>Env. Info:　"
				+ "<a href='"
				+ getApp()
				+ "/util/dumpthread.jsp'"
				+ " onclick='return M.openLink(this,event)'"
				+ " target='_blank'>Thread</a>,　"
				+ "<a href='"
				+ getApp()
				+ "/util/env.jsp'"
				+ " onclick='return M.openLink(this,event)'"
				+ " target='_blank'>Env.</a>,　"
				+ "<a href='"
				+ getApp()
				+ "/util/sysinfo.jsp'"
				+ " onclick='return M.openLink(this,event)'"
				+ " target='_blank'>System</a>,　"
				+ "<a href='"
				+ getApp()
				+ "/util/time.jsp'"
				+ " onclick='return M.openLink(this,event)'"
				+ " target='_blank'>Time</a>,　"
				+ "<a href='"
				+ getApp()
				+ "/util/index.jsp'"
				+ " onclick='return M.openLink(this,event)'"
				+ " target='_blank'>Index</a>"

				+ "<br>DevOps:　" //
				+ "<a href='"
				+ getApp()
				+ "/util/dumpdb.jsp'"
				+ " onclick='return M.openLink(this,event)'"
				+ " target='_blank'>Dump DB.zip</a>,　"//
				+ "<a href='"
				+ getApp()
				+ "/util/dumpmeta.jsp'"
				+ " onclick='return M.openLink(this,event)'"
				+ " target='_blank'>Dump Meta.zip</a>,　"//
				+ "<a href='"
				+ getApp()
				+ "/util/build.jsp'"
				+ " onclick='return M.openLink(this,event)'"
				+ " target='_blank'>Build Metas.jar</a>"//

				+ "<br>Util:　"
				+ "<a href='"
				+ getApp()
				+ "/util/encode.jsp'"
				+ " target='_blank'>Encoder</a>, 　"
				+ "<a href='"
				+ getApp()
				+ "/util/qr_code.jsp?content=Life+is+created+by+Yuxichu!"
				+ "&size=200&logo="
				+ getApp()
				+ "/z/icon-small.png'"
				+ " target='_blank'>QR Code</a>,　"
				+ "<a href='"
				+ getApp()
				+ "/util/path.jsp?class_name'"
				+ " onclick='_(\"__my_url__\").value=this.href;return false;'>Class Path</a><br>"//				
				+ "Other:　" //
				+ "<a href='" + getApp() + "/util/source_compare.jsp'"
				+ " onclick='return M.openLink(this,event)' "
				+ " target='_blank' title='"
				+ res("life.sys.title.source_compare") + "'>Compare</a>";

		if (CLIENT_DECORATION_ENABLED) {
			html += ", <img class='client_config' style='cursor:pointer;vertical-align:bottom'"
					+ " src='"
					+ getApp()
					+ "/ico/config.png'"
					+ " onclick='window.open(M.wrap(M.getClientConfigURL()),\"client_config\")'"//
					+ " title='" + res("life.sys.title.client_config") + "'>";
		}
	} else {
		html += "Other:　<a href='"
				+ getApp()
				+ "/util/source_compare.jsp'"
				+ " onclick='return M.openLink(this,event)' target='_blank' title='"
				+ res("life.sys.title.source_compare") + "'>Comp</a>";
		if (CLIENT_DECORATION_ENABLED) {
			html += ", <img class='client_config' style='cursor:pointer;vertical-align:bottom'"
					+ " src='"
					+ getApp()
					+ "/ico/config.png'"
					+ " onclick='window.open(M.wrap(M.getClientConfigURL()),\"client_config\")'"//
					+ " title='" + res("life.sys.title.client_config") + "'>";
		}
	}

	html += "</td></tr></table></form>";

	M.showConfirm(html, "Open URL", function() {
		var url = _("__my_url__").value;
		if (!url) {
			return false;
		}

		window.open(M.wrap(url), "_blank");
		return true;
	});
};

if (window.$) {
	if (!$.evalJSON) {
		$.evalJSON = function(s) {
			return eval("(" + s + ")");
		};
	}

	if (!$.toJSON) {
		$.toJSON = function(o) {
			return $toString(o);
		};
	}
}






M.showAbortBtn = function(show) {
	var msg = _("MESSAGE");
	var dialog = msg.parentNode;
	if (show) {
		$(".abort", dialog).show();
	} else {
		$(".abort", dialog).hide();
	}
};


M.escape2 = function(s) {
	if (!s) {
		return;
	}
	var len = s.length;
	if (s.substring(0, 1) === "<" && s.substring(len - 1, len) === ">") {
		return s;// 如果 s 以 < 开头且以 > 结尾表示使用HTML标签，则不转换
	} else {
		return M.escape(s, true);
	}
};



M.beforeSelectStart = function(event) {
	var e = event.target || event.srcElement;
	if (e.tagName && e.id == "MASK_DIV") {
		// 如果选定的是MASK背景，则禁止选择，以免在Chrome上双击时出现蓝屏。
		return false;
	} else {
		return true;
	}
};

M.moveTaget = null;

M.showMoveMask = function(el) {
	M.moveTaget = el;
	var mask = M.prepareMoveMask();
	var e = $(el);
	var p = e.position();
	mask.style.left = p.left;
	mask.style.top = p.top;
	mask.style.width = (e.width() - 100) + "px";
	mask.style.height = "36px";
	mask.style.display = "block";
};

M.prepareMoveMask = function() {
	var mask = _("_MOVABLE_MASK_");
	if (mask) {
		return mask;
	}

	var html = "<div id='_MOVABLE_MASK_' onmouseout='M.hideMoveMask()'></div>";
	$(document.body).append(html);
	mask = _("_MOVABLE_MASK_");
	$(mask).draggable({
		containment : document.body,
		scroll : false,
		drag : function(event, ui) {
			var p = ui.position;
			M.moveTaget.style.left = p.left + "px";
			M.moveTaget.style.top = p.top + "px";
		}
	});
	return mask;
};

M.hideMoveMask = function() {
	var mask = _("_MOVABLE_MASK_");
	if (mask) {
		mask.style.display = 'none';
	}
};

M.menus = [];
M.disableMenuHidden = false;

M.showMenu = function(menu, btn, pos) {
	var exists = false;
	for (var i = 0; i < M.menus.length; i++) {
		if (M.menus[i] === menu) {
			exists = true;
			break;
		}
	}
	if (!exists) {
		M.menus.push(menu);
	}

	btn = $(btn);
	menu.style.top = "0px";
	menu.style.left = "0px";
	menu.style.display = "";

	var $w = $(window);
	var width = $w.width();
	var $m = $(menu);
	var WIDTH = $m.width();
	var left = btn.offset().left;
	if (width < left + WIDTH + 10) {
		left = width - WIDTH - 20;
	}
	if (pos == "right") {
		menu.style.left = left + btn.width() + 2 + "px";
	} else {
		menu.style.left = left + "px";
	}

	var top = btn.offset().top + btn.outerHeight();
	var height = $w.height();// 窗口高度
	var HEIGHT = $m.height();
	if ("top" == pos || height < top + HEIGHT + 10) {
		top = btn.offset().top - HEIGHT;
	}

	if (top < 0) {
		top = 0;
	}

	if (pos == "right") {
		menu.style.top = top - btn.height() + "px";
	} else {
		menu.style.top = top + "px";
	}

	// 暂时禁止隐藏菜单，20毫秒后点击任意位置则可隐藏菜单
	M.disableMenuHidden = true;
	window.setTimeout(function() {
		M.disableMenuHidden = false;
	}, 20);
};

M.equals = function(a, b) {
	if (a === b) {
		return true;
	}

	var ta = $getType(a);
	var tb = $getType(b);
	if (ta !== tb) {// 类型不同
		return false;
	}

	switch (ta) {
	case $ARRAY:
		return M.equalsArray(a, b);
	case $MAP:
		return M.equalsMap(a, b);
	default:
		return false;
	}
};

/*
 * 标记不同项，将不同项登记在 #changed 属性中
 */
M.markDiff = function(a, b) {
	if (a === b) {// 相同
		return false;
	}

	var ta = $getType(a);
	var tb = $getType(b);
	if (ta !== tb) {// 类型不同
		return true;
	}

	switch (ta) {
	case $ARRAY:
		return M.markArrayDiff(a, b);
	case $MAP:
		return M.markMapDiff(a, b);
	default:// 不同值
		return true;
	}
};

M.markArrayDiff = function(a, b) {
	var diff = false;
	for (var i = 0, len = Math.min(a.length, b.length); i < len; i++) {
		if (M.markDiff(a[i], b[i])) {
			diff = true;// 内容不同
		}
	}

	if (a.length !== b.length) {
		return true;// 长度不同
	} else {
		return diff;
	}
};

M.equalsArray = function(a, b) {
	if (a.length !== b.length) {
		return false;
	}

	for (var i = 0; i < a.length; i++) {
		if (!M.equals(a[i], b[i])) {
			return false;
		}
	}

	return true;
};

/**
 * 不同项登记在 a 的 __changed__ 中
 */
M.markMapDiff = function(a, b) {
	var diff = false;
	var changed = {};
	for ( var key in a) {
		if (M.markDiff(a[key], b[key])) {
			diff = true;
			changed[key] = true;
		}
	}

	if (diff) {// 将不同的项登记在 a 对象中
		a.__changed__ = changed;
	}

	return diff;
};

M.equalsMap = function(a, b) {
	for ( var key in a) {
		if (!M.equals(a[key], b[key])) {
			return false;
		}
	}

	for ( var key in b) {
		if (!M.equals(a[key], b[key])) {
			return false;
		}
	}

	return true;
};

/**
 * 比较 array 中各元素的 key 值，如果全部相等，则返回 null, 否则返回序号数组，表示各元素与哪个元素相等
 */
M.diff = function(array, key) {
	var same = true;
	var colors = [];
	colors[0] = 0;
	// 检查各元素是否与前一个相等
	for (var i = 1; i < array.length; i++) {
		if (M.equals(array[i - 1][key], array[i][key])) {
			colors[i] = colors[i - 1];
		} else {
			colors[i] = i;
			same = false;
		}
	}
	if (same) {// 全部相同
		return null;
	}

	// 检查各元素是否与前一个之前的元素相等
	for (var i = 2; i < array.length; i++) {
		var b = array[i][key];
		for (var j = 0; j <= i - 2; j++) {
			if (M.equals(array[j][key], b)) {
				colors[i] = colors[j];
				break;
			}
		}
	}

	return colors;
};



M.parentOK = function() {
	if (M.isXS()) {
		XS.send_confirmOK(window.parent);
	} else {
		window.parent.M.ok();
	}
};

M.parentClose = function() {
	if (M.isXS()) {
		XS.send_closeConfirm(window.parent);
	} else {
		if (window.parent.EVENT) {
			window.parent.EVENT.callback = null;
		}
		window.parent.M.close();
	}
}

/**
 * 是否跨域检查
 */
M.isXS = function() {
	return window.IS_XS;// IS_XS 在css.jsp 中设置
}

M.area = {};
M.getSize = function(entity, operation) {
	var key = entity + "." + operation;
	var area = M.area[key];
	if (!area) {
		area = OP.getUserInterfaceSize(entity, operation);
		M.area[key] = area;
	}
	return area;
};