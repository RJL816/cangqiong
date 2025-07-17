if (typeof String.prototype.startsWith != 'function') {
	String.prototype.startsWith = function(prefix) {
		return this.slice(0, prefix.length) === prefix;
	};
}
if (typeof String.prototype.endsWith != 'function') {
	String.prototype.endsWith = function(suffix) {
		return this.indexOf(suffix, this.length - suffix.length) !== -1;
	};
}

var params = document.location.search;
var editorId = params.substring(params.indexOf("=") + 1);
var cache = window.parent.ISC_SCRIPT_CACHE[editorId];
var SCRIPT_DATA = cache.data;
var editorModel = cache.editor;//自定义控件

var JSHints = {};
var JSKeywords = SCRIPT_DATA.keywords || {};
var AllKeywords = SCRIPT_DATA.all_keys || {};
var for_debugger = SCRIPT_DATA.for_debugger;

function getJSKeywords () {
	return JSKeywords;
};

var GlobalObjs = {
	"String" : [],
}

function makeMarker(is_current) {
  var marker = document.createElement("div");
  marker.style.color = is_current?"#00F":"#822";
  marker.style.marginLeft = "-10px";
  marker.style.zIndex = 10000;
  marker.innerHTML = "●";
  return marker;
}
function getGutters(){
	if(for_debugger){
		return [ "CodeMirror-linenumbers", "CodeMirror-foldgutter", "breakpoints"];
	}else{
		return [ "CodeMirror-linenumbers", "CodeMirror-foldgutter"];
	}
}
var editor;

function init() {	
	var myTextarea = document.getElementById('editor');
	
	editor = CodeMirror.fromTextArea(myTextarea, {
		mode : {
			name : "javascript",
			globalVars : true
		},
		smartIndent : true,
		theme : "idea",
		lineNumbers : true,
		keyMap : "sublime",
		highlightSelectionMatches : {
			showToken : /\w/
		},
		styleActiveLine : true,
		annotateScrollbar : true,
		readOnly : !SCRIPT_DATA.editable,
		autoCloseBrackets : true,
		showCursorWhenSelecting : true,
		lineWrapping : true,
		cursorHeight : 0.85,
		foldGutter : true,
		gutters : getGutters(),
		matchBrackets : true,
		hintOptions : {
			hint : getJSHint
		},
		extraKeys : {
			"Ctrl" : "autocomplete"
		}
	});
	
	editor.on('change', function() {
		editor.showHint({
			completeSingle : false
		}); // 满足自动触发自动联想功能
	});
	
	if(for_debugger){
		editor.on("gutterClick", function(cm, n) {
			var info = cm.lineInfo(n);
			var breakpoints = info.gutterMarkers && info.gutterMarkers.breakpoints;
			var cmd = breakpoints ? "detach_breakpoint" : "attach_breakpoint";
			editorModel.invoke(cmd, n + 1);//n - 行号，从0开始编号
		});		
	}

	
	var height = SCRIPT_DATA.height - 6;
	document.getElementsByClassName("CodeMirror")[0].style.height = height + 'px';
	
	var tips = SCRIPT_DATA.tips || [];
	
	JSHints[""] = tips;// 全局函数或变量
	for(var i=0,j=tips.length; i<j;++i){
		var item = tips[i];
		item.lower = item.title.toLowerCase();
		if(item.children){
			var children = JSHints[item.group] = item.children;
			for(var a=0,b=children.length; a<b; ++a){
				var e = children[a];
				e.lower = e.title.toLowerCase();
			}			
			item.children = null;
		}
	}
	
	var script = SCRIPT_DATA.script;
	var breakpoints = SCRIPT_DATA.breakpoints;
	setValue(script, breakpoints);
}

function setValue(script, breakpoints){
	if(script){
		editor.setValue(script);
	}
	
	if(breakpoints){
		for(var i=0; i<breakpoints.length;++i){
			var p = breakpoints[i];
			var n = p.line - 1; // 行号
			var is_current = p.is_current; // 是否当前断点
			editor.setGutterMarker(n, "breakpoints", makeMarker(is_current));
			if(is_current){
				editor.setSelection({line:n, ch:0});
			}
		}
	}
}

function findPriorToken(line, end, idOnly){
	var identifierChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_#$1234567890";		
	for(var i = end - 1; i >= 0; --i){
		if(identifierChars.indexOf(line.charAt(i)) < 0){
			break;
		}
	}
	var start = i + 1;
	if(start < end){ return line.substring(start, end);	} // 标识符
	
	if(idOnly){ return "";}
	
	
	for(var i = end - 1; i >= 0; --i){
		if(identifierChars.indexOf(line.charAt(i)) >= 0){
			break;
		}
	}
	var start = i + 1;
	if(start < end){ return line.substring(start, end);	} // 操作符
	
	return "";
}

function getJSHint(cm) {
	var founds = [];
	var cursor = cm.getCursor();
	var token = cm.getTokenAt(cursor).string;
	var line = cm.getLine(cursor.line);
	var prefix = ""; // 关键字前缀
	
	if (token.length) {
		var group = "";// 关键字组
		var key = "";
		if (token === ".") {// Key.___
			var key = findPriorToken(line, cursor.ch - 1);
			group = key + ".";
		} else if(token == " "){// key ___
			var key = findPriorToken(line, cursor.ch - 1, true);
			if(key){
				group = key + " ";
			}
		} else  {
			prefix = token;
			var end = cursor.ch - token.length - 1;
			if(end > 0){
				var key = findPriorToken(line, end, true);
				if(key){
					if(line.charAt(end) == '.'){// key.token___
						group = key + ".";
					}else if(line.charAt(end) == ' '){// key token___
						group = key + " ";
					}
				}				
			}
		}
		
		var candidates = JSHints[group];
		if(candidates === undefined && AllKeywords[key] === undefined){
			candidates = JSHints[token];
		}
			
		if(candidates){
			var lower = prefix.toLowerCase();
			for(var i=0,j = candidates.length; i<j; ++i){
				var item = candidates[i];
				if (item.lower.startsWith(lower)) {
					var value = item.text || item.title;
					founds.push({displayText: item.title, text : value});
				}
			}
		}
	}
	
	var hint = {
		list : founds,
		from : {line : cursor.line, ch : cursor.ch - prefix.length},
		to : cursor
	};
	return hint;
}

// 获取BASE64编码后的脚本，防止服务器的WAF拦截
function getEncodedScript(){
	var s = editor.doc.getValue();
	return base64Encode(s);
}

//点击脚本片段节点后 在光标位置插入数据  
function insertScriptExample(str){
	var pos = editor.getCursor();
	var s = {};
    if (pos) {
        s.line = pos.line;
        s.ch = pos.ch;
        editor.setCursor(s); // 设置光标位置
		editor.replaceRange(str, s) // 替换光标位置的内容
	}
}
function setReadOnly(value){
		editor.setOption('readOnly',value);
}
 




//BASE64编码用的字符
var B64 = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_-";
var SN = new Array();
for ( var i = 0; i < 256; i++) {
	SN[i] = -1;
}
for ( var i = 0; i < B64.length; i++) {
	SN[B64.charCodeAt(i)] = i;
}

// BASE64编码
function base64Encode(str) {
	var i, result = ''/* 编码结果 */
	, c = 0/* 剩余内容，2或4位 */
	, r = 0/* 剩余位数 */;
	for (i = 0; i < str.length; i++) {
		c = (c << 16) + str.charCodeAt(i);
		for (r += 16; r >= 6; r -= 6) {
			result += B64.charAt((c >>> (r - 6)) & 63);
		}
	}
	if (r > 0) {
		result += B64.charAt((c << (6 - r)) & 63);
	}
	return result;
}

// BASE64解码
function base64Decode(str) {
	var i, result = ''/* 解码结果 */
	, c = 0/* 剩余内容，2,4,6位 */
	, r = 0/* 剩余位数 */;
	for (i = 0; i < str.length; i++) {
		c = (c << 6) + SN[str.charCodeAt(i)];
		for (r += 6; r >= 16; r -= 16) {
			result += String.fromCharCode((c >>> (r - 16)) & 0xFFFF);
		}
	}
	return result;
}

function handleKeyPressed(e){
	if(e.ctrlKey && e.keyCode === 66){//CTRL + B
		var cursor = editor.getCursor();
		if(cursor){
			var n = cursor.line;
			var info = editor.lineInfo(n);
			var breakpoints = info.gutterMarkers && info.gutterMarkers.breakpoints;
			var cmd = breakpoints ? "detach_breakpoint" : "attach_breakpoint";
			editorModel.invoke(cmd, n + 1);//n - 行号，从0开始编号
		}
	}
}
