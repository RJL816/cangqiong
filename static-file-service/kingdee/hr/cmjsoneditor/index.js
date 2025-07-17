(function (KDApi, $) {
    function JsonEditor (model) {
		this._setModel(model)
    }
	
    JsonEditor.prototype = {
		_setModel: function (model) {
			this.model = model
		},
		init: function (props) {
			initFunc(this.model, props)
		},
		update: function (props) {
			updateFunc(this.model, props)
        },
		destroy: function (props) {
			
		}
    }
	
    var initFunc = function (model, props) {
		KDApi.loadFile(['./js/codemirror.js','./css/codemirror.css','./css/foldgutter.css'], model, function(){
			KDApi.loadFile(['./js/foldgutter.js','./js/javascript.js','./js/foldcode.js','./js/brace-fold.js','./js/formatting.js'], model, function () {
				var dataPageId = model.pageId + '_' + 'jsoneditor'
				var template = '<textarea id="jsoneditor" data-page-id="' + dataPageId + '"></textarea>'
				model.dom.innerHTML = KDApi.getHTMLStringBytemplate(template, {})
				$(model.dom).css({
					'display': 'flex',
					'flex-direction': 'column'
				})
				
				model.jsoneditor = CmJsonEditorCodeMirror.fromTextArea($('[data-page-id="' + dataPageId + '"]')[0], {
					mode: {name: "javascript", json: true},
					lineNumbers: true,
					lineWrapping: true,
					extraKeys: {"Ctrl-Q": function(cm){ cm.foldCode(cm.getCursor()); }},
					foldGutter: true,
					viewportMargin: Infinity,//
					gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
					foldOptions: {
						widget: (from, to) => {
							var count = undefined;

							// Get open / close token
							var startToken = '{', endToken = '}';        
							var prevLine = model.jsoneditor.getLine(from.line);
							if (prevLine.lastIndexOf('[') > prevLine.lastIndexOf('{')) {
							  startToken = '[', endToken = ']';
							}

							// Get json content
							var internal = model.jsoneditor.getRange(from, to);
							var toParse = startToken + internal + endToken;

							// Get key count
							try {
							  var parsed = JSON.parse(toParse);
							  count = Object.keys(parsed).length;
							} catch(e) { }        

							return count ? `\u21A4${count}\u21A6` : '\u2194';
						}
					},
					extraKeys:{
						"F7": function autoFormat(editor) {
							var totalLines = editor.lineCount();
							editor.autoFormatRange({line:0, ch:0}, {line:totalLines});
						}
					},
				});
				// 格式化json时，不自动定位到光标行
				model.jsoneditor.on("scrollCursorIntoView", function(cm, args){  
					args.defaultPrevented = true;
				}); 
				
				setValue(model, props);
			})      
		})
    }
	
	var updateFunc = function(model, props){
		setValue(model, props);		
		$(".CodeMirror-linenumbers", model.dom).css("width", "20px");
		$(".CodeMirror-gutters", model.dom).css("left", "0px");
	}
	
	var setValue = function(model, props){
		if(props.data && props.data.json){
			model.jsoneditor.setValue(props.data.json)
			model.jsoneditor.autoFormatRange({line:0, ch:0}, {line:model.jsoneditor.lineCount()});
		}		
	}
	
    KDApi.register('cmjsoneditor', JsonEditor)
})(window.KDApi, jQuery)
  