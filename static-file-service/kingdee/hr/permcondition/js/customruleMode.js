(function (mod) {
  if (typeof exports === 'object' && typeof module === 'object') // CommonJS
  { mod(require('../../lib/codemirror')) } else if (typeof define === 'function' && define.amd) // AMD
  { define(['../../lib/codemirror'], mod) } else // Plain browser env
  { mod(window.PermConditionCodeMirror) }
})(function (CodeMirror) {
  'use strict'

	var propertyKeyWord = ['并且', '或者', '(', ')'];
		  
	var tokenCComment = function (stream, state) {
		var maybeEnd = false; var ch
		while ((ch = stream.next()) != null) {
			if (maybeEnd && ch === '/') {
				state.tokenize = null
				break
			}
			maybeEnd = (ch === '*')
		}
		stream.backUp(1)
		return 'comment'
	}
	  
	var tokenLineComment = function (stream, state) {
		var maybeEnd = false; var ch
		while ((ch = stream.next()) != null) {
			if (maybeEnd && /\n/.test(ch)) {
				state.tokenize = null
				break
			}
			maybeEnd = /\n/.test(ch)
		}
		return 'comment'
	}			
	  
	PermConditionCodeMirror.defineMIME('text/customrule', {
		propertyKeyWord: propertyKeyWord,
		lineComment: '//',
		tokenHooks: {
			'/': function (stream, state) {
				if (stream.eat('/')) return tokenLineComment(stream, state)
				if (!stream.eat('*')) return false
				state.tokenize = tokenCComment
				return tokenCComment(stream, state)
			}
		},
		name: 'customrule'
	})
		
  CodeMirror.defineMode('customrule', function(config, parserConfig){
    if (!parserConfig.propertyKeyWord) {
		parserConfig = CodeMirror.resolveMode('text/customrule')
    }
    //var conditionKey = parserConfig.conditionKey || []
    //var joinKey = parserConfig.joinKey || []
    //var sItemKey = parserConfig.sItemKey || []
    //var bItemKey = parserConfig.bItemKey || []
    //var funcKey = parserConfig.funcKey || []
    //var resultKey = parserConfig.resultKey || []
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
      var unSplitReg = /[^-<=!>+*, /{}\[\]\s]/
      if(unSplitReg.test(ch)) {
        stream.eatWhile(unSplitReg)
        var cur = stream.current().trim()
        if(/^T(\d+)(\.\d+)?$/.test(cur)){
          stream.backUp(1)
          return 'quote'
        }
        if(isKeywordValue(parserConfig.propertyKeyWord, cur)) {
          stream.backUp(1)
          return 'header'
        }
		/*
        if(isKeywordValue(sItemKey, cur)) {
          stream.backUp(1)
          return 'header'
        }
        if (isKeywordValue(bItemKey, cur)) {
          stream.backUp(1)
          return 'negative'
        }
        if (isKeywordValue(funcKey, cur)) {
          stream.backUp(1)
          return 'variable-2'
        }
        if(isKeywordValue(resultKey, cur)) {
          stream.backUp(1)
          return 'error'
        }
		*/
        return null
      } else {
        stream.eatWhile(/[-<=!>+*, /{}\[\]]/)
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
			/*
			if(isKeywordValue(sItemKey, cur)) {
			  stream.backUp(1);
			  return 'header';
			}
			if (isKeywordValue(bItemKey, cur)) {
			  stream.backUp(1);
			  return 'negative';
			}
			*/
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
