var editor;
var params = document.location.search;
var editorId = params.substring(params.indexOf("=") + 1);
var cache = window.parent.BCM_SCRIPT_CACHE[editorId];
var SCRIPT_DATA = cache.data;
var editorHeight = cache.height;
var request = new XMLHttpRequest();
var server;
request.open("get", "ecmascript.json");
// 不发送数据到服务器
request.send(null);
request.onload = function () {
    // 解析获取到的数据
    var data = JSON.parse(request.responseText);
    for (prop in SCRIPT_DATA.bcm_ecmascript) {
        data[prop] = SCRIPT_DATA.bcm_ecmascript[prop];
    }
    server = new CodeMirror.TernServer({ defs: [data] });
}


function init() {
    var myTextarea = document.getElementById('editor');
    editor = CodeMirror.fromTextArea(myTextarea, {
        lineNumbers: true,
        lineWrapping: true,
        styleActiveLine: true,
		
        theme: "idea",
        autofocus: true,
        smartIndent: true,  // 是否智能缩进
        autoCloseBrackets: true,
        matchBrackets: true,
        foldGutter: true,
        gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
        extraKeys: {
            "Ctrl-I": function (cm) { server.showType(cm); },
            "Ctrl-O": function (cm) { server.showDocs(cm); },
            "Ctrl-Enter": function (cm) { server.complete(cm); },
			"Ctrl-F": "findPersistent",
			"Ctrl-/": "toggleComment",
			"Ctrl-L": function(cm) {
				setValue(js_beautify(editor.doc.getValue()))
			}
        },
        highlightSelectionMatches: {
            showToken: /\w/
        },
        hintOptions: {
            completeSingle: false,
            alignWithWord: false,
            // hint: (cm)=>{
            // 	CodeMirror.hint.javascript(cm,{
            // 		useGlobalScope:false
            // 	})
            // }
            hint: getJsHint
        }
    });
    editor.on('keypress', function () {
        server.complete(editor)
    });
    editor.setSize('100%', editorHeight ? (editorHeight < 200 ? '400' : editorHeight) : '400' );
    // 设置高度
    editor.setValue(SCRIPT_DATA.script);
    editor.on("cursorActivity", function (cm) {
        //这里与上面的键盘点击事件冲突，只能存在一个
        server.updateArgHints(cm);
    });
}



function getJsHint(cm) {
    server.complete(cm)
    return {};
}


function setValue(script) {
    if (script) {
        editor.setValue(script);
        editor.setCursor({ line: editor.lineCount(), ch: 0 });
    }
}


// 获取BASE64编码后的脚本，防止服务器的WAF拦截
function getScript() {
    return editor.doc.getValue();
}

function getEnCodeScript() {
    var s = editor.doc.getValue();
    return base64Encode(s);
}



//BASE64编码用的字符
var B64 = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_-";
var SN = new Array();
for (var i = 0; i < 256; i++) {
    SN[i] = -1;
}
for (var i = 0; i < B64.length; i++) {
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


function reSize(height) {
    if (editor != null) {
		debugger
        editor.setSize('100%', height == 0 ? 400 : height);
    }
}
