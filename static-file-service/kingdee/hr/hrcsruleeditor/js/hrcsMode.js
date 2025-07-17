(function (mod) {
  if (typeof exports === 'object' && typeof module === 'object') // CommonJS
  { mod(require('../../lib/codemirror')) } else if (typeof define === 'function' && define.amd) // AMD
  { define(['../../lib/codemirror'], mod) } else // Plain browser env
  { mod(window.CodeMirror) }
})(function (CodeMirror) {
  'use strict'

  CodeMirror.defineMode('hrcs', function(config, parserConfig){
    if (!parserConfig.propertyKeyWord) {
      parserConfig = CodeMirror.resolveMode('text/hrcs')
    }
    var conditionKey = parserConfig.conditionKey || []
    var joinKey = parserConfig.joinKey || []
    var calItemKey = parserConfig.calItemKey || []
    var funcKey = parserConfig.funcKey || []
    var resultKey = parserConfig.resultKey || []
    var tokenHooks = parserConfig.tokenHooks

    function tokenBase(stream, state){
      var ch = stream.next()
      if (tokenHooks[ch]) {
        var result = tokenHooks[ch](stream, state)
        if (result !== false) return result
      }
      if (ch === '"') {
        state.tokenize = tokenString(ch)
        return tokenString(ch)(stream, state)
      }
	  if(ch === '['){
		  state.tokenize = tokenItem(']');
		  return tokenItem(']')(stream, state);
	  }
      var unSplitReg = /[^-<=!>+*, /{}\(\)\[\]\s]/
      if(unSplitReg.test(ch)) {
        stream.eatWhile(unSplitReg)
        var cur = stream.current().trim()
        if(/^(-?\d+)(\.\d+)?$/.test(cur)){
          stream.backUp(1)
          return 'number'
        }
        if(isKeywordValue(conditionKey, cur) || isKeywordValue(joinKey, cur)) {
          stream.backUp(1)
          return 'quote'
        }
        if(isKeywordValue(calItemKey, cur)) {
          stream.backUp(1)
          return 'header'
        }
        if (isKeywordValue(funcKey, cur)) {
          stream.backUp(1)
          return 'variable-2'
        }
        if(isKeywordValue(resultKey, cur)) {
          stream.backUp(1)
          return 'error'
        }
        return null
      } else {
        stream.eatWhile(/[-<=!>+*, /{}\(\)\[\]]/)
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
        return 'string'
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
			if(isKeywordValue(calItemKey, cur)) {
			  stream.backUp(1);
			  return 'header';
			}
			stream.backUp(1);
			return null;
		}
	}

    function isKeywordValue (keywordArray, value) {
      return keywordArray.indexOf(value) !== -1
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
