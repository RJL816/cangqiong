(function (mod) {
  if (typeof exports === 'object' && typeof module === 'object') // CommonJS
  { mod(require('../../lib/codemirror')) } else if (typeof define === 'function' && define.amd) // AMD
  { define(['../../lib/codemirror'], mod) } else // Plain browser env
  { mod(window.TargetExpressionCodeMirror) }
})(function (CodeMirror) {
  'use strict'

  CodeMirror.defineMode('customTarget', function(config, parserConfig){
    if (!parserConfig.propertyKeyWord) {
		parserConfig = CodeMirror.resolveMode('text/customTarget')
    }
    //var conditionKey = parserConfig.conditionKey || []
    //var joinKey = parserConfig.joinKey || []
    //var sItemKey = parserConfig.sItemKey || []
    //var bItemKey = parserConfig.bItemKey || []
    //var funcKey = parserConfig.funcKey || []
    //var resultKey = parserConfig.resultKey || []

    function tokenBase(stream, state){
      var ch = stream.next()
      if (ch === '"') {
        state.tokenize = tokenString(ch)
        return tokenString(ch)(stream, state)
      }
      var unSplitReg = /[^, ()\s]/
      if(unSplitReg.test(ch)) {
        stream.eatWhile(unSplitReg)
        var cur = stream.current().trim()
		if (ch == "." && stream.match(/^\d[\d_]*(?:[eE][+\-]?[\d_]+)?/)) {
			return ret("number", "number");
		}
		if(/\d/.test(ch)) {
		   return 'number'
		}
        if(isInputParam(parserConfig.inputParams, cur)){
          stream.backUp(1)
          return 'variable-2'
        }
        if(isKeywordValue(parserConfig.propertyKeyWord, cur)) {
          stream.backUp(1)
          return 'header'
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
  })
})
