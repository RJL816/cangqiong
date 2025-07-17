(function (mod) {
  if (typeof exports === 'object' && typeof module === 'object') // CommonJS
  { mod(require('../../lib/codemirror')) } else if (typeof define === 'function' && define.amd) // AMD
  { define(['../../lib/codemirror'], mod) } else // Plain browser env
  { mod(window.TargetExpressionCodeMirror) }
})(function (CodeMirror) {
  'use strict'

  CodeMirror.defineMode('msgTitleTarget', function(config, parserConfig){
	 if (!parserConfig.propertyKeyWord) {
		parserConfig = CodeMirror.resolveMode('text/msgTitleTarget')
    }
    function tokenBase(stream, state){
      var ch = stream.next()
      if (ch === '"') {
        state.tokenize = tokenString(ch)
        return tokenString(ch)(stream, state)
      }
      if(ch == '[') {
		// eat(match: string|regexp|function(char: string) → boolean) → string。match 可以是字符串、正则表达式或一个参数为字符串并返回 boolean 值的函数。 如果 stream 中的下一个字符与参数项匹配，将会被消耗掉并返回。否则返回 undefined 。
		// eatWhile(match: string|regexp|function(char: string) → boolean) → boolean。 重复调用 eat 直到截止。当所有的单词都被消耗掉后返回 true。
        stream.eatWhile(function(key){
			if(key == ']'){
				return false
			}else{
				return true
			}
		})
		stream.next()
        var cur = stream.current().trim()
		if (ch == "." && stream.match(/^\d[\d_]*(?:[eE][+\-]?[\d_]+)?/)) {
			return ret("number", "number");
		}
		if(/\d/.test(ch)) {
		   return 'number'
		}
        if(isInputParam(parserConfig.inputParams, cur)){
          stream.backUp(1)
          return 'variable-9'
        }
		
        return null
      } else {
        stream.eatWhile(/[, ()]/)
        stream.backUp(1)
        return null
      }
    }

    function tokenString (quote) {
      return function (stream, state) {
        var escaped = false; var ch
        while ((ch = stream.next()) != null) {
          if (ch === quote && !escaped) {
            if (quote === ')') stream.backUp(1)
            break
          }
          escaped = !escaped && ch === '\\'
        }
        if (ch === quote || !escaped && quote !== ')') state.tokenize = null
        stream.backUp(1)
        return 'string-2'
      }
    }
	
	function tokenItem(quote){
		return function(stream, state){
			var escaped = false; 
			var ch;
			while ((ch = stream.next()) != null) {
                if (ch === quote && !escaped) {
					break;
                }
                escaped = !escaped && ch === '\\';
            }
            if(ch === quote || !escaped ){ 
				state.tokenize = null;
			}	
			var cur = stream.current().trim();
			cur = cur.substring(1,cur.length-1);
			stream.backUp(1);
			return null;
		}
	}

    function isKeywordValue (keywordArray, value) {
      return keywordArray.indexOf(value) !== -1
    }
	
	function isInputParam(inputParams, value) {
	  return inputParams.indexOf(value) !== -1
	}

    return {
      startState: function () {
        return {
          tokenize: null,
          state: {},
          stateArg: null
        }
      },
      token: function(stream, state){
        if (!state.tokenize && stream.eatSpace()) {
          return null
        }
        var style = (state.tokenize || tokenBase)(stream, state)
        stream.next()
        return style
      }
    }
  });
  
  CodeMirror.defineOption("placeholder", "", function(cm, val, old) {
    var prev = old && old != CodeMirror.Init;
    if (val && !prev) {
      cm.on("blur", onBlur);
      cm.on("change", onChange);
      cm.on("swapDoc", onChange);
      onChange(cm);
    } else if (!val && prev) {
      cm.off("blur", onBlur);
      cm.off("change", onChange);
      cm.off("swapDoc", onChange);
      clearPlaceholder(cm);
      var wrapper = cm.getWrapperElement();
      wrapper.className = wrapper.className.replace(" CodeMirror-empty", "");
    }

    if (val && !cm.hasFocus()) onBlur(cm);
  });

  function clearPlaceholder(cm) {
    if (cm.state.placeholder) {
      cm.state.placeholder.parentNode.removeChild(cm.state.placeholder);
      cm.state.placeholder = null;
    }
  }
  function setPlaceholder(cm) {
    clearPlaceholder(cm);
    var elt = cm.state.placeholder = document.createElement("pre");
    elt.style.cssText = "height: 0; overflow: visible";
    elt.style.direction = cm.getOption("direction");
    elt.className = "CodeMirror-placeholder";
    var placeHolder = cm.getOption("placeholder")
    if (typeof placeHolder == "string") placeHolder = document.createTextNode(placeHolder)
    elt.appendChild(placeHolder)
    cm.display.lineSpace.insertBefore(elt, cm.display.lineSpace.firstChild);
  }

  function onBlur(cm) {
    if (isEmpty(cm)) setPlaceholder(cm);
  }
  function onChange(cm) {
    var wrapper = cm.getWrapperElement(), empty = isEmpty(cm);
    wrapper.className = wrapper.className.replace(" CodeMirror-empty", "") + (empty ? " CodeMirror-empty" : "");

    if (empty) setPlaceholder(cm);
    else clearPlaceholder(cm);
  }

  function isEmpty(cm) {
    return (cm.lineCount() === 1) && (cm.getLine(0) === "");
  }
})
