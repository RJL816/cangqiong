// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

(function(mod) {
	if (typeof exports == "object" && typeof module == "object") // CommonJS
		mod(require("../../lib/codemirror"));
	else if (typeof define == "function" && define.amd) // AMD
		define([ "../../lib/codemirror" ], mod);
	else
		// Plain browser env
		mod(CodeMirror);
})
		(function(CodeMirror) {
			"use strict";

			CodeMirror
					.defineMode(
							"javascript",
							function(config, parserConfig) {
								var indentUnit = config.indentUnit;
								var statementIndent = parserConfig.statementIndent;
								var jsonldMode = parserConfig.jsonld;
								var jsonMode = parserConfig.json || jsonldMode;
								var isTS = parserConfig.typescript;
								var wordRE = parserConfig.wordCharacters || /[\w$\xa1-\uffff]/;
								var keywords = getJSKeywords();

								var isOperatorChar = /[+\-*&%=<>!?|~^]/;
								var isJsonldKeyword = /^@(context|id|value|language|type|container|list|set|reverse|index|base|vocab|graph)"/;

								function readRegexp(stream) {
									var escaped = false, next, inSet = false;
									while ((next = stream.next()) != null) {
										if (!escaped) {
											if (next == "/" && !inSet)
												return;
											if (next == "[")
												inSet = true;
											else if (inSet && next == "]")
												inSet = false;
										}
										escaped = !escaped && next == "\\";
									}
								}

								// Used as scratch variables to communicate
								// multiple values without
								// consing up tons of objects.
								var type, content;
								function ret(tp, style, cont) {
									type = tp;
									content = cont;
									return style;
								}
								function tokenBase(stream, state) {
									var ch = stream.next();
									if (ch == '"' || ch == "'") {
										state.tokenize = tokenString(ch);
										return state.tokenize(stream, state);
									} else if (ch == "."
											&& stream
													.match(/^\d+(?:[eE][+\-]?\d+)?/)) {
										return ret("number", "number");
									} else if (ch == "." && stream.match("..")) {
										return ret("spread", "meta");
									} else if (/[\[\]{}\(\),;\:\.]/.test(ch)) {
										return ret(ch);
									} else if (ch == "=" && stream.eat(">")) {
										return ret("=>", "operator");
									} else if (ch == "0" && stream.eat(/x/i)) {
										stream.eatWhile(/[\da-f]/i);
										return ret("number", "number");
									} else if (ch == "0" && stream.eat(/o/i)) {
										stream.eatWhile(/[0-7]/i);
										return ret("number", "number");
									} else if (ch == "0" && stream.eat(/b/i)) {
										stream.eatWhile(/[01]/i);
										return ret("number", "number");
									} else if (/\d/.test(ch)) {
										stream
												.match(/^\d*(?:\.\d*)?(?:[eE][+\-]?\d+)?/);
										return ret("number", "number");
									} else if (ch == "/") {
										if (stream.eat("*")) {
											state.tokenize = tokenComment;
											return tokenComment(stream, state);
										} else if (stream.eat("/")) {
											stream.skipToEnd();
											return ret("comment", "comment");
										} else if (expressionAllowed(stream,
												state, 1)) {
											readRegexp(stream);
											stream
													.match(/^\b(([gimyu])(?![gimyu]*\2))+\b/);
											return ret("regexp", "string-2");
										} else {
											stream.eat("=");
											return ret("operator", "operator",
													stream.current());
										}
									} else if (ch == "`") {
										state.tokenize = tokenQuasi;
										return tokenQuasi(stream, state);
									} else if (wordRE.test(ch)) {
										stream.eatWhile(wordRE);
										var word = stream.current()
										if (state.lastType != ".") {
											if (keywords
													.propertyIsEnumerable(word)) {
												var kw = keywords[word]
												return ret(kw.type, kw.style,
														word)
											}
											if (word == "async"
													&& stream
															.match(
																	/^(\s|\/\*.*?\*\/)*[\[\(\w]/,
																	false))
												return ret("async", "keyword",
														word)
										}
										return ret("variable", "variable", word)
									}
								}

								function tokenString(quote) {
									return function(stream, state) {
										var escaped = false, next;
										if (jsonldMode
												&& stream.peek() == "@"
												&& stream
														.match(isJsonldKeyword)) {
											state.tokenize = tokenBase;
											return ret("jsonld-keyword", "meta");
										}
										while ((next = stream.next()) != null) {
											if (next == quote && !escaped)
												break;
											escaped = !escaped && next == "\\";
										}
										if (!escaped)
											state.tokenize = tokenBase;
										return ret("string", "string");
									};
								}

								function tokenComment(stream, state) {
									var maybeEnd = false, ch;
									while (ch = stream.next()) {
										if (ch == "/" && maybeEnd) {
											state.tokenize = tokenBase;
											break;
										}
										maybeEnd = (ch == "*");
									}
									return ret("comment", "comment");
								}

								function tokenQuasi(stream, state) {
									var escaped = false, next;
									while ((next = stream.next()) != null) {
										if (!escaped
												&& (next == "`" || next == "$"
														&& stream.eat("{"))) {
											state.tokenize = tokenBase;
											break;
										}
										escaped = !escaped && next == "\\";
									}
									return ret("quasi", "string-2", stream
											.current());
								}

								var brackets = "([{}])";
								// This is a crude lookahead trick to try and
								// notice that we're
								// parsing the argument patterns for a fat-arrow
								// function before we
								// actually hit the arrow token. It only works
								// if the arrow is on
								// the same line as the arguments and there's no
								// strange noise
								// (comments) in between. Fallback is to only
								// notice when we hit the
								// arrow, and not declare the arguments as
								// locals for the arrow
								// body.
								function findFatArrow(stream, state) {
									if (state.fatArrowAt)
										state.fatArrowAt = null;
									var arrow = stream.string.indexOf("=>",
											stream.start);
									if (arrow < 0)
										return;

									if (isTS) { // Try to skip TypeScript return
										// type declarations after the
										// arguments
										var m = /:\s*(?:\w+(?:<[^>]*>|\[\])?|\{[^}]*\})\s*$/
												.exec(stream.string.slice(
														stream.start, arrow))
										if (m)
											arrow = m.index
									}

									var depth = 0, sawSomething = false;
									for (var pos = arrow - 1; pos >= 0; --pos) {
										var ch = stream.string.charAt(pos);
										var bracket = brackets.indexOf(ch);
										if (bracket >= 0 && bracket < 3) {
											if (!depth) {
												++pos;
												break;
											}
											if (--depth == 0) {
												if (ch == "(")
													sawSomething = true;
												break;
											}
										} else if (bracket >= 3 && bracket < 6) {
											++depth;
										} else if (wordRE.test(ch)) {
											sawSomething = true;
										} else if (/["'\/]/.test(ch)) {
											return;
										} else if (sawSomething && !depth) {
											++pos;
											break;
										}
									}
									if (sawSomething && !depth)
										state.fatArrowAt = pos;
								}

								// Parser

								var atomicTypes = {
									"atom" : true,
									"spec" : true,
									"global" : true,
									"func" : true,
									"number" : true,
									"variable" : true,
									"string" : true,
									"regexp" : true,
									"this" : true,
									"jsonld-keyword" : true
								};

								function JSLexical(indented, column, type,
										align, prev, info) {
									this.indented = indented;
									this.column = column;
									this.type = type;
									this.prev = prev;
									this.info = info;
									if (align != null)
										this.align = align;
								}

								function inScope(state, varname) {
									for (var v = state.localVars; v; v = v.next)
										if (v.name == varname)
											return true;
									for (var cx = state.context; cx; cx = cx.prev) {
										for (var v = cx.vars; v; v = v.next)
											if (v.name == varname)
												return true;
									}
								}

								function parseJS(state, style, type, content,
										stream) {
									var cc = state.cc;
									// Communicate our context to the
									// combinators.
									// (Less wasteful than consing up a hundred
									// closures on every call.)
									cx.state = state;
									cx.stream = stream;
									cx.marked = null, cx.cc = cc;
									cx.style = style;

									if (!state.lexical.hasOwnProperty("align"))
										state.lexical.align = true;

									while (true) {
										var combinator = cc.length ? cc.pop()
												: jsonMode ? expression
														: statement;
										if (combinator(type, content)) {
											while (cc.length
													&& cc[cc.length - 1].lex)
												cc.pop()();
											if (cx.marked)
												return cx.marked;
											if (type == "variable"
													&& inScope(state, content))
												return "variable-2";
											return style;
										}
									}
								}

								// Combinator utils

								var cx = {
									state : null,
									column : null,
									marked : null,
									cc : null
								};
								function pass() {
									for (var i = arguments.length - 1; i >= 0; i--)
										cx.cc.push(arguments[i]);
								}
								function cont() {
									pass.apply(null, arguments);
									return true;
								}
								function register(varname) {
									function inList(list) {
										for (var v = list; v; v = v.next)
											if (v.name == varname)
												return true;
										return false;
									}
									var state = cx.state;
									cx.marked = "def";
									if (state.context) {
										if (inList(state.localVars))
											return;
										state.localVars = {
											name : varname,
											next : state.localVars
										};
									} else {
										if (inList(state.globalVars))
											return;
										if (parserConfig.globalVars)
											state.globalVars = {
												name : varname,
												next : state.globalVars
											};
									}
								}

								function isModifier(name) {
									return name == "public"
											|| name == "private"
											|| name == "protected"
											|| name == "abstract"
											|| name == "readonly"
								}

								// Combinators

								var defaultVars = {
									name : "this",
									next : {
										name : "arguments"
									}
								};
								function pushcontext() {
									cx.state.context = {
										prev : cx.state.context,
										vars : cx.state.localVars
									};
									cx.state.localVars = defaultVars;
								}
								function popcontext() {
									cx.state.localVars = cx.state.context.vars;
									cx.state.context = cx.state.context.prev;
								}
								function pushlex(type, info) {
									var result = function() {
										var state = cx.state, indent = state.indented;
										if (state.lexical.type == "stat")
											indent = state.lexical.indented;
										else
											for (var outer = state.lexical; outer
													&& outer.type == ")"
													&& outer.align; outer = outer.prev)
												indent = outer.indented;
										state.lexical = new JSLexical(indent,
												cx.stream.column(), type, null,
												state.lexical, info);
									};
									result.lex = true;
									return result;
								}
								function poplex() {
									var state = cx.state;
									if (state.lexical.prev) {
										if (state.lexical.type == ")")
											state.indented = state.lexical.indented;
										state.lexical = state.lexical.prev;
									}
								}
								poplex.lex = true;

								function expect(wanted) {
									function exp(type) {
										if (type == wanted)
											return cont();
										else if (wanted == ";")
											return pass();
										else
											return cont(exp);
									}
									;
									return exp;
								}

								function statement(type, value) {
									if (type == "var")
										return cont(pushlex("vardef",
												value.length), vardef,
												expect(";"), poplex);
									if (type == "keyword a")
										return cont(pushlex("form"), parenExpr,
												statement, poplex);
									if (type == "keyword b")
										return cont(pushlex("form"), statement,
												poplex);
									if (type == "keyword d")
										return cx.stream.match(/^\s*$/, false) ? cont()
												: cont(pushlex("stat"),
														maybeexpression,
														expect(";"), poplex);
									if (type == "debugger")
										return cont(expect(";"));
									if (type == "{")
										return cont(pushlex("}"), block, poplex);
									if (type == ";")
										return cont();
									if (type == "if") {
										if (cx.state.lexical.info == "else"
												&& cx.state.cc[cx.state.cc.length - 1] == poplex)
											cx.state.cc.pop()();
										return cont(pushlex("form"), parenExpr,
												statement, poplex, maybeelse);
									}
									if (type == "function")
										return cont(functiondef);
									if (type == "for")
										return cont(pushlex("form"), forspec,
												statement, poplex);
									if (type == "class"
											|| (isTS && value == "interface")) {
										cx.marked = "keyword";
										return cont(pushlex("form"), className,
												poplex);
									}
									if (type == "variable") {
										if (isTS && value == "declare") {
											cx.marked = "keyword"
											return cont(statement)
										} else if (isTS
												&& (value == "module"
														|| value == "enum" || value == "type")
												&& cx.stream.match(/^\s*\w/,
														false)) {
											cx.marked = "keyword"
											if (value == "enum")
												return cont(enumdef);
											else if (value == "type")
												return cont(typeexpr,
														expect("operator"),
														typeexpr, expect(";"));
											else
												return cont(pushlex("form"),
														pattern, expect("{"),
														pushlex("}"), block,
														poplex, poplex)
										} else if (isTS && value == "namespace") {
											cx.marked = "keyword"
											return cont(pushlex("form"),
													expression, block, poplex)
										} else if (isTS && value == "abstract") {
											cx.marked = "keyword"
											return cont(statement)
										} else {
											return cont(pushlex("stat"),
													maybelabel);
										}
									}
									if (type == "switch")
										return cont(pushlex("form"), parenExpr,
												expect("{"), pushlex("}",
														"switch"), block,
												poplex, poplex);
									if (type == "case")
										return cont(expression, expect(":"));
									if (type == "default")
										return cont(expect(":"));
									if (type == "catch")
										return cont(pushlex("form"),
												pushcontext, expect("("),
												funarg, expect(")"), statement,
												poplex, popcontext);
									if (type == "export")
										return cont(pushlex("stat"),
												afterExport, poplex);
									if (type == "import")
										return cont(pushlex("stat"),
												afterImport, poplex);
									if (type == "async")
										return cont(statement)
									if (value == "@")
										return cont(expression, statement)
									return pass(pushlex("stat"), expression,
											expect(";"), poplex);
								}
								function expression(type, value) {
									return expressionInner(type, value, false);
								}
								function expressionNoComma(type, value) {
									return expressionInner(type, value, true);
								}
								function parenExpr(type) {
									if (type != "(")
										return pass()
									return cont(pushlex(")"), expression,
											expect(")"), poplex)
								}
								function expressionInner(type, value, noComma) {
									if (cx.state.fatArrowAt == cx.stream.start) {
										var body = noComma ? arrowBodyNoComma
												: arrowBody;
										if (type == "(")
											return cont(pushcontext,
													pushlex(")"), commasep(
															funarg, ")"),
													poplex, expect("=>"), body,
													popcontext);
										else if (type == "variable")
											return pass(pushcontext, pattern,
													expect("=>"), body,
													popcontext);
									}

									var maybeop = noComma ? maybeoperatorNoComma
											: maybeoperatorComma;
									if (atomicTypes.hasOwnProperty(type))
										return cont(maybeop);
									if (type == "function")
										return cont(functiondef, maybeop);
									if (type == "class"
											|| (isTS && value == "interface")) {
										cx.marked = "keyword";
										return cont(pushlex("form"),
												classExpression, poplex);
									}
									if (type == "keyword c" || type == "async")
										return cont(noComma ? expressionNoComma
												: expression);
									if (type == "(")
										return cont(pushlex(")"),
												maybeexpression, expect(")"),
												poplex, maybeop);
									if (type == "operator" || type == "spread")
										return cont(noComma ? expressionNoComma
												: expression);
									if (type == "[")
										return cont(pushlex("]"), arrayLiteral,
												poplex, maybeop);
									if (type == "{")
										return contCommasep(objprop, "}", null,
												maybeop);
									if (type == "quasi")
										return pass(quasi, maybeop);
									if (type == "new")
										return cont(maybeTarget(noComma));
									if (type == "import")
										return cont(expression);
									return cont();
								}
								function maybeexpression(type) {
									if (type.match(/[;\}\)\],]/))
										return pass();
									return pass(expression);
								}

								function maybeoperatorComma(type, value) {
									if (type == ",")
										return cont(expression);
									return maybeoperatorNoComma(type, value,
											false);
								}
								function maybeoperatorNoComma(type, value,
										noComma) {
									var me = noComma == false ? maybeoperatorComma
											: maybeoperatorNoComma;
									var expr = noComma == false ? expression
											: expressionNoComma;
									if (type == "=>")
										return cont(pushcontext,
												noComma ? arrowBodyNoComma
														: arrowBody, popcontext);
									if (type == "operator") {
										if (/\+\+|--/.test(value) || isTS
												&& value == "!")
											return cont(me);
										if (isTS
												&& value == "<"
												&& cx.stream.match(
														/^([^>]|<.*?>)*>\s*\(/,
														false))
											return cont(pushlex(">"), commasep(
													typeexpr, ">"), poplex, me);
										if (value == "?")
											return cont(expression,
													expect(":"), expr);
										return cont(expr);
									}
									if (type == "quasi") {
										return pass(quasi, me);
									}
									if (type == ";")
										return;
									if (type == "(")
										return contCommasep(expressionNoComma,
												")", "call", me);
									if (type == ".")
										return cont(property, me);
									if (type == "[")
										return cont(pushlex("]"),
												maybeexpression, expect("]"),
												poplex, me);
									if (isTS && value == "as") {
										cx.marked = "keyword";
										return cont(typeexpr, me)
									}
									if (type == "regexp") {
										cx.state.lastType = cx.marked = "operator"
										cx.stream.backUp(cx.stream.pos
												- cx.stream.start - 1)
										return cont(expr)
									}
								}
								function quasi(type, value) {
									if (type != "quasi")
										return pass();
									if (value.slice(value.length - 2) != "${")
										return cont(quasi);
									return cont(expression, continueQuasi);
								}
								function continueQuasi(type) {
									if (type == "}") {
										cx.marked = "string-2";
										cx.state.tokenize = tokenQuasi;
										return cont(quasi);
									}
								}
								function arrowBody(type) {
									findFatArrow(cx.stream, cx.state);
									return pass(type == "{" ? statement
											: expression);
								}
								function arrowBodyNoComma(type) {
									findFatArrow(cx.stream, cx.state);
									return pass(type == "{" ? statement
											: expressionNoComma);
								}
								function maybeTarget(noComma) {
									return function(type) {
										if (type == ".")
											return cont(noComma ? targetNoComma
													: target);
										else if (type == "variable" && isTS)
											return cont(
													maybeTypeArgs,
													noComma ? maybeoperatorNoComma
															: maybeoperatorComma)
										else
											return pass(noComma ? expressionNoComma
													: expression);
									};
								}
								function target(_, value) {
									if (value == "target") {
										cx.marked = "keyword";
										return cont(maybeoperatorComma);
									}
								}
								function targetNoComma(_, value) {
									if (value == "target") {
										cx.marked = "keyword";
										return cont(maybeoperatorNoComma);
									}
								}
								function maybelabel(type) {
									if (type == ":")
										return cont(poplex, statement);
									return pass(maybeoperatorComma,
											expect(";"), poplex);
								}
								function property(type) {
									if (type == "variable") {
										cx.marked = "property";
										return cont();
									}
								}
								function objprop(type, value) {
									if (type == "async") {
										cx.marked = "property";
										return cont(objprop);
									} else if (type == "variable"
											|| cx.style == "keyword") {
										cx.marked = "property";
										if (value == "get" || value == "set")
											return cont(getterSetter);
										var m // Work around
										// fat-arrow-detection
										// complication for detecting
										// typescript typed arrow params
										if (isTS
												&& cx.state.fatArrowAt == cx.stream.start
												&& (m = cx.stream.match(
														/^\s*:\s*/, false)))
											cx.state.fatArrowAt = cx.stream.pos
													+ m[0].length
										return cont(afterprop);
									} else if (type == "number"
											|| type == "string") {
										cx.marked = jsonldMode ? "property"
												: (cx.style + " property");
										return cont(afterprop);
									} else if (type == "jsonld-keyword") {
										return cont(afterprop);
									} else if (isTS && isModifier(value)) {
										cx.marked = "keyword"
										return cont(objprop)
									} else if (type == "[") {
										return cont(expression, maybetype,
												expect("]"), afterprop);
									} else if (type == "spread") {
										return cont(expressionNoComma,
												afterprop);
									} else if (value == "*") {
										cx.marked = "keyword";
										return cont(objprop);
									} else if (type == ":") {
										return pass(afterprop)
									}
								}
								function getterSetter(type) {
									if (type != "variable")
										return pass(afterprop);
									cx.marked = "property";
									return cont(functiondef);
								}
								function afterprop(type) {
									if (type == ":")
										return cont(expressionNoComma);
									if (type == "(")
										return pass(functiondef);
								}
								function commasep(what, end, sep) {
									function proceed(type, value) {
										if (sep ? sep.indexOf(type) > -1
												: type == ",") {
											var lex = cx.state.lexical;
											if (lex.info == "call")
												lex.pos = (lex.pos || 0) + 1;
											return cont(
													function(type, value) {
														if (type == end
																|| value == end)
															return pass()
														return pass(what)
													}, proceed);
										}
										if (type == end || value == end)
											return cont();
										return cont(expect(end));
									}
									return function(type, value) {
										if (type == end || value == end)
											return cont();
										return pass(what, proceed);
									};
								}
								function contCommasep(what, end, info) {
									for (var i = 3; i < arguments.length; i++)
										cx.cc.push(arguments[i]);
									return cont(pushlex(end, info), commasep(
											what, end), poplex);
								}
								function block(type) {
									if (type == "}")
										return cont();
									return pass(statement, block);
								}
								function maybetype(type, value) {
									if (isTS) {
										if (type == ":")
											return cont(typeexpr);
										if (value == "?")
											return cont(maybetype);
									}
								}
								function mayberettype(type) {
									if (isTS && type == ":") {
										if (cx.stream.match(/^\s*\w+\s+is\b/,
												false))
											return cont(expression, isKW,
													typeexpr)
										else
											return cont(typeexpr)
									}
								}
								function isKW(_, value) {
									if (value == "is") {
										cx.marked = "keyword"
										return cont()
									}
								}
								function typeexpr(type, value) {
									if (value == "keyof" || value == "typeof") {
										cx.marked = "keyword"
										return cont(value == "keyof" ? typeexpr
												: expressionNoComma)
									}
									if (type == "variable" || value == "void") {
										cx.marked = "type"
										return cont(afterType)
									}
									if (type == "string" || type == "number"
											|| type == "atom" || type == "spec"
											|| type == "global"
											|| type == "func")
										return cont(afterType);
									if (type == "[")
										return cont(pushlex("]"), commasep(
												typeexpr, "]", ","), poplex,
												afterType)
									if (type == "{")
										return cont(pushlex("}"), commasep(
												typeprop, "}", ",;"), poplex,
												afterType)
									if (type == "(")
										return cont(commasep(typearg, ")"),
												maybeReturnType)
									if (type == "<")
										return cont(commasep(typeexpr, ">"),
												typeexpr)
								}
								function maybeReturnType(type) {
									if (type == "=>")
										return cont(typeexpr)
								}
								function typeprop(type, value) {
									if (type == "variable"
											|| cx.style == "keyword") {
										cx.marked = "property"
										return cont(typeprop)
									} else if (value == "?") {
										return cont(typeprop)
									} else if (type == ":") {
										return cont(typeexpr)
									} else if (type == "[") {
										return cont(expression, maybetype,
												expect("]"), typeprop)
									}
								}
								function typearg(type, value) {
									if (type == "variable"
											&& cx.stream.match(/^\s*[?:]/,
													false) || value == "?")
										return cont(typearg)
									if (type == ":")
										return cont(typeexpr)
									return pass(typeexpr)
								}
								function afterType(type, value) {
									if (value == "<")
										return cont(pushlex(">"), commasep(
												typeexpr, ">"), poplex,
												afterType)
									if (value == "|" || type == "."
											|| value == "&")
										return cont(typeexpr)
									if (type == "[")
										return cont(expect("]"), afterType)
									if (value == "extends"
											|| value == "implements") {
										cx.marked = "keyword";
										return cont(typeexpr)
									}
								}
								function maybeTypeArgs(_, value) {
									if (value == "<")
										return cont(pushlex(">"), commasep(
												typeexpr, ">"), poplex,
												afterType)
								}
								function typeparam() {
									return pass(typeexpr, maybeTypeDefault)
								}
								function maybeTypeDefault(_, value) {
									if (value == "=")
										return cont(typeexpr)
								}
								function vardef(_, value) {
									if (value == "enum") {
										cx.marked = "keyword";
										return cont(enumdef)
									}
									return pass(pattern, maybetype,
											maybeAssign, vardefCont);
								}
								function pattern(type, value) {
									if (isTS && isModifier(value)) {
										cx.marked = "keyword";
										return cont(pattern)
									}
									if (type == "variable") {
										register(value);
										return cont();
									}
									if (type == "spread")
										return cont(pattern);
									if (type == "[")
										return contCommasep(pattern, "]");
									if (type == "{")
										return contCommasep(proppattern, "}");
								}
								function proppattern(type, value) {
									if (type == "variable"
											&& !cx.stream.match(/^\s*:/, false)) {
										register(value);
										return cont(maybeAssign);
									}
									if (type == "variable")
										cx.marked = "property";
									if (type == "spread")
										return cont(pattern);
									if (type == "}")
										return pass();
									return cont(expect(":"), pattern,
											maybeAssign);
								}
								function maybeAssign(_type, value) {
									if (value == "=")
										return cont(expressionNoComma);
								}
								function vardefCont(type) {
									if (type == ",")
										return cont(vardef);
								}
								function maybeelse(type, value) {
									if (type == "keyword b" && value == "else")
										return cont(pushlex("form", "else"),
												statement, poplex);
								}
								function forspec(type, value) {
									if (value == "await")
										return cont(forspec);
									if (type == "(")
										return cont(pushlex(")"), forspec1,
												expect(")"), poplex);
								}
								function forspec1(type) {
									if (type == "var")
										return cont(vardef, expect(";"),
												forspec2);
									if (type == ";")
										return cont(forspec2);
									if (type == "variable")
										return cont(formaybeinof);
									return pass(expression, expect(";"),
											forspec2);
								}
								function formaybeinof(_type, value) {
									if (value == "in" || value == "of") {
										cx.marked = "keyword";
										return cont(expression);
									}
									return cont(maybeoperatorComma, forspec2);
								}
								function forspec2(type, value) {
									if (type == ";")
										return cont(forspec3);
									if (value == "in" || value == "of") {
										cx.marked = "keyword";
										return cont(expression);
									}
									return pass(expression, expect(";"),
											forspec3);
								}
								function forspec3(type) {
									if (type != ")")
										cont(expression);
								}
								function functiondef(type, value) {
									if (value == "*") {
										cx.marked = "keyword";
										return cont(functiondef);
									}
									if (type == "variable") {
										register(value);
										return cont(functiondef);
									}
									if (type == "(")
										return cont(pushcontext, pushlex(")"),
												commasep(funarg, ")"), poplex,
												mayberettype, statement,
												popcontext);
									if (isTS && value == "<")
										return cont(pushlex(">"), commasep(
												typeparam, ">"), poplex,
												functiondef)
								}
								function funarg(type, value) {
									if (value == "@")
										cont(expression, funarg)
									if (type == "spread")
										return cont(funarg);
									if (isTS && isModifier(value)) {
										cx.marked = "keyword";
										return cont(funarg);
									}
									return pass(pattern, maybetype, maybeAssign);
								}
								function classExpression(type, value) {
									// Class expressions may have an optional
									// name.
									if (type == "variable")
										return className(type, value);
									return classNameAfter(type, value);
								}
								function className(type, value) {
									if (type == "variable") {
										register(value);
										return cont(classNameAfter);
									}
								}
								function classNameAfter(type, value) {
									if (value == "<")
										return cont(pushlex(">"), commasep(
												typeparam, ">"), poplex,
												classNameAfter)
									if (value == "extends"
											|| value == "implements"
											|| (isTS && type == ",")) {
										if (value == "implements")
											cx.marked = "keyword";
										return cont(isTS ? typeexpr
												: expression, classNameAfter);
									}
									if (type == "{")
										return cont(pushlex("}"), classBody,
												poplex);
								}
								function classBody(type, value) {
									if (type == "async"
											|| (type == "variable"
													&& (value == "static"
															|| value == "get"
															|| value == "set" || (isTS && isModifier(value))) && cx.stream
													.match(
															/^\s+[\w$\xa1-\uffff]/,
															false))) {
										cx.marked = "keyword";
										return cont(classBody);
									}
									if (type == "variable"
											|| cx.style == "keyword") {
										cx.marked = "property";
										return cont(isTS ? classfield
												: functiondef, classBody);
									}
									if (type == "[")
										return cont(expression, maybetype,
												expect("]"), isTS ? classfield
														: functiondef,
												classBody)
									if (value == "*") {
										cx.marked = "keyword";
										return cont(classBody);
									}
									if (type == ";")
										return cont(classBody);
									if (type == "}")
										return cont();
									if (value == "@")
										return cont(expression, classBody)
								}
								function classfield(type, value) {
									if (value == "?")
										return cont(classfield)
									if (type == ":")
										return cont(typeexpr, maybeAssign)
									if (value == "=")
										return cont(expressionNoComma)
									return pass(functiondef)
								}
								function afterExport(type, value) {
									if (value == "*") {
										cx.marked = "keyword";
										return cont(maybeFrom, expect(";"));
									}
									if (value == "default") {
										cx.marked = "keyword";
										return cont(expression, expect(";"));
									}
									if (type == "{")
										return cont(commasep(exportField, "}"),
												maybeFrom, expect(";"));
									return pass(statement);
								}
								function exportField(type, value) {
									if (value == "as") {
										cx.marked = "keyword";
										return cont(expect("variable"));
									}
									if (type == "variable")
										return pass(expressionNoComma,
												exportField);
								}
								function afterImport(type) {
									if (type == "string")
										return cont();
									if (type == "(")
										return pass(expression);
									return pass(importSpec, maybeMoreImports,
											maybeFrom);
								}
								function importSpec(type, value) {
									if (type == "{")
										return contCommasep(importSpec, "}");
									if (type == "variable")
										register(value);
									if (value == "*")
										cx.marked = "keyword";
									return cont(maybeAs);
								}
								function maybeMoreImports(type) {
									if (type == ",")
										return cont(importSpec,
												maybeMoreImports)
								}
								function maybeAs(_type, value) {
									if (value == "as") {
										cx.marked = "keyword";
										return cont(importSpec);
									}
								}
								function maybeFrom(_type, value) {
									if (value == "from") {
										cx.marked = "keyword";
										return cont(expression);
									}
								}
								function arrayLiteral(type) {
									if (type == "]")
										return cont();
									return pass(commasep(expressionNoComma, "]"));
								}
								function enumdef() {
									return pass(pushlex("form"), pattern,
											expect("{"), pushlex("}"),
											commasep(enummember, "}"), poplex,
											poplex)
								}
								function enummember() {
									return pass(pattern, maybeAssign);
								}

								function isContinuedStatement(state, textAfter) {
									return state.lastType == "operator"
											|| state.lastType == ","
											|| isOperatorChar.test(textAfter
													.charAt(0))
											|| /[,.]/.test(textAfter.charAt(0));
								}

								function expressionAllowed(stream, state,
										backUp) {
									return state.tokenize == tokenBase
											&& /^(?:operator|sof|keyword [bcd]|case|new|export|default|spread|[\[{}\(,;:]|=>)$/
													.test(state.lastType)
											|| (state.lastType == "quasi" && /\{\s*$/
													.test(stream.string
															.slice(
																	0,
																	stream.pos
																			- (backUp || 0))))
								}

								// Interface

								return {
									startState : function(basecolumn) {
										var state = {
											tokenize : tokenBase,
											lastType : "sof",
											cc : [],
											lexical : new JSLexical(
													(basecolumn || 0)
															- indentUnit, 0,
													"block", false),
											localVars : parserConfig.localVars,
											context : parserConfig.localVars
													&& {
														vars : parserConfig.localVars
													},
											indented : basecolumn || 0
										};
										if (parserConfig.globalVars
												&& typeof parserConfig.globalVars == "object")
											state.globalVars = parserConfig.globalVars;
										return state;
									},

									token : function(stream, state) {
										if (stream.sol()) {
											if (!state.lexical
													.hasOwnProperty("align"))
												state.lexical.align = false;
											state.indented = stream
													.indentation();
											findFatArrow(stream, state);
										}
										if (state.tokenize != tokenComment
												&& stream.eatSpace())
											return null;
										var style = state.tokenize(stream,
												state);
										if (type == "comment")
											return style;
										state.lastType = type == "operator"
												&& (content == "++" || content == "--") ? "incdec"
												: type;
										return parseJS(state, style, type,
												content, stream);
									},

									indent : function(state, textAfter) {
										if (state.tokenize == tokenComment)
											return CodeMirror.Pass;
										if (state.tokenize != tokenBase)
											return 0;
										var firstChar = textAfter
												&& textAfter.charAt(0), lexical = state.lexical, top
										// Kludge to prevent 'maybelse' from
										// blocking lexical scope pops
										if (!/^\s*else\b/.test(textAfter))
											for (var i = state.cc.length - 1; i >= 0; --i) {
												var c = state.cc[i];
												if (c == poplex)
													lexical = lexical.prev;
												else if (c != maybeelse)
													break;
											}
										while ((lexical.type == "stat" || lexical.type == "form")
												&& (firstChar == "}" || ((top = state.cc[state.cc.length - 1])
														&& (top == maybeoperatorComma || top == maybeoperatorNoComma) && !/^[,\.=+\-*:?[\(]/
														.test(textAfter))))
											lexical = lexical.prev;
										if (statementIndent
												&& lexical.type == ")"
												&& lexical.prev.type == "stat")
											lexical = lexical.prev;
										var type = lexical.type, closing = firstChar == type;

										if (type == "vardef")
											return lexical.indented
													+ (state.lastType == "operator"
															|| state.lastType == "," ? lexical.info + 1
															: 0);
										else if (type == "form"
												&& firstChar == "{")
											return lexical.indented;
										else if (type == "form")
											return lexical.indented
													+ indentUnit;
										else if (type == "stat")
											return lexical.indented
													+ (isContinuedStatement(
															state, textAfter) ? statementIndent
															|| indentUnit
															: 0);
										else if (lexical.info == "switch"
												&& !closing
												&& parserConfig.doubleIndentSwitch != false)
											return lexical.indented
													+ (/^(?:case|default)\b/
															.test(textAfter) ? indentUnit
															: 2 * indentUnit);
										else if (lexical.align)
											return lexical.column
													+ (closing ? 0 : 1);
										else
											return lexical.indented
													+ (closing ? 0 : indentUnit);
									},

									electricInput : /^\s*(?:case .*?:|default:|\{|\})$/,
									blockCommentStart : jsonMode ? null : "/*",
									blockCommentEnd : jsonMode ? null : "*/",
									blockCommentContinue : jsonMode ? null
											: " * ",
									lineComment : jsonMode ? null : "//",
									fold : "brace",
									closeBrackets : "()[]{}''\"\"``",

									helperType : jsonMode ? "json"
											: "javascript",
									jsonldMode : jsonldMode,
									jsonMode : jsonMode,

									expressionAllowed : expressionAllowed,

									skipExpression : function(state) {
										var top = state.cc[state.cc.length - 1]
										if (top == expression
												|| top == expressionNoComma)
											state.cc.pop()
									}
								};
							});

			CodeMirror.registerHelper("wordChars", "javascript", /[\w$]/);

			CodeMirror.defineMIME("text/javascript", "javascript");
			CodeMirror.defineMIME("text/ecmascript", "javascript");
			CodeMirror.defineMIME("application/javascript", "javascript");
			CodeMirror.defineMIME("application/x-javascript", "javascript");
			CodeMirror.defineMIME("application/ecmascript", "javascript");
			CodeMirror.defineMIME("application/json", {
				name : "javascript",
				json : true
			});
			CodeMirror.defineMIME("application/x-json", {
				name : "javascript",
				json : true
			});
			CodeMirror.defineMIME("application/ld+json", {
				name : "javascript",
				jsonld : true
			});
			CodeMirror.defineMIME("text/typescript", {
				name : "javascript",
				typescript : true
			});
			CodeMirror.defineMIME("application/typescript", {
				name : "javascript",
				typescript : true
			});

		});
