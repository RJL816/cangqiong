(function (mod) {
  if (typeof exports === 'object' && typeof module === 'object') // CommonJS
  { mod(require('../../lib/codemirror')) } else if (typeof define === 'function' && define.amd) // AMD
  { define(['../../lib/codemirror'], mod) } else // Plain browser env
  { mod(window.CodeMirror) }
})(function (CodeMirror) {
  'use strict'

  CodeMirror.defineMode('swc', function(config, parserConfig){
    if (!parserConfig.propertyKeyWord) {
      parserConfig = CodeMirror.resolveMode('text/swc')
    }
    var conditionKey = parserConfig.conditionKey || []
	var itemKey = parserConfig.itemKey || []
	var preKey = parserConfig.preKey || []
    var tokenHooks = parserConfig.tokenHooks

    function tokenBase(stream, state){
      var ch = stream.next()
      if (tokenHooks[ch]) {
        var result = tokenHooks[ch](stream, state)
        if (result !== false) return result
      }
      if (ch === '"' || ch === '“') {
        state.tokenize = tokenString()
        return tokenString()(stream, state)
      }
      var unSplitReg = /[^-<=!>+*, /{}\(\)\（\）\，\"\“\”\[\]\【\】\s]/
      if(unSplitReg.test(ch)) {
        stream.eatWhile(unSplitReg)
        var cur = stream.current().trim()
        if(/^(-?\d+)(\.\d+)?$/.test(cur)){
          stream.backUp(1)
          return 'commenttext'
        }
		if(isKeywordValue(preKey, cur.toUpperCase())) {
			ch = stream.next()
			if (ch === '[' || ch === '【') {
				state.tokenize = tokenItem();
				return tokenItem()(stream, state);
			}
		} else if (cur.toUpperCase() === 'VR') {
		    ch = stream.next()
			if (ch === '[' || ch === '【') {
				state.tokenize = tokenVRItem();
				return tokenVRItem()(stream, state)
			}
		}
        if(isKeywordValue(conditionKey, cur.toUpperCase())) {
          stream.backUp(1)
          return 'conditionkey'
        }
        return null
      } else {
        stream.eatWhile(/[-<=!>+*, /{}\(\)\[\]]/)
        stream.backUp(1)
        return 'commenttext'
      }
    }

    function tokenString () {
      return function (stream, state) {
        var escaped = false;
        var ch
        while ((ch = stream.next()) != null) {
          if ((ch === '"' || ch === '”') && !escaped) {
            break
          }
          escaped = !escaped && ch === '\\'
        }
        if (ch === '"' || ch === '”' || !escaped ){
            state.tokenize = null;
            stream.backUp(1)
            return 'itemkey';
        } else{
            return 'commenttext';
        }

      }
    }
	
	function tokenItem(){
		return function(stream, state){
			var escaped = false; 
			var ch;
			while ((ch = stream.next()) != null) {
                if ((ch === ']' || ch === '】') && !escaped) {
					break;
                }
                escaped = !escaped && ch === '\\';
            }
            if((ch === ']' || ch === '】') || !escaped ){
				state.tokenize = null;
			}	
			var cur = stream.current().trim();
            var curnew = cur.substring(0,2).toUpperCase() + '[' + cur.substring(3,cur.length-1) + ']';
			var propcur = cur.substring(0,1).toUpperCase() + '[' + cur.substring(2,cur.length-1) + ']';
			if(isKeywordValue(itemKey, curnew) || isKeywordValue(itemKey, propcur)) {
			  stream.backUp(1);
			  return 'itemkey';
			}
			return 'commenttext';
		}
	}
	
	function tokenVRItem(){
		return function(stream, state){
			var escaped = false; 
			var ch;
			while ((ch = stream.next()) != null) {
                if ((ch === ']' || ch === '】') && !escaped) {
					break;
                }
                escaped = !escaped && ch === '\\';
            }
            if((ch === ']' || ch === '】')|| !escaped ){
				state.tokenize = null;
			}	
			var cur = stream.current().trim();
			if(cur === 'VR[]') {
			  return 'commenttext';
			} else {
			  stream.backUp(1);
			  return 'itemkey';
			}
			
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
