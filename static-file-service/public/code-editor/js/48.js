"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkcode_editor"] = self["webpackChunkcode_editor"] || []).push([[48],{

/***/ "../../node_modules/monaco-editor/esm/vs/basic-languages/ini/ini.js":
/*!**************************************************************************!*\
  !*** ../../node_modules/monaco-editor/esm/vs/basic-languages/ini/ini.js ***!
  \**************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   conf: function() { return /* binding */ conf; },\n/* harmony export */   language: function() { return /* binding */ language; }\n/* harmony export */ });\n/*!-----------------------------------------------------------------------------\n * Copyright (c) Microsoft Corporation. All rights reserved.\n * Version: 0.38.0(0e330ae453813de4e6cf272460fb79c7117073d0)\n * Released under the MIT license\n * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt\n *-----------------------------------------------------------------------------*/\n\n// src/basic-languages/ini/ini.ts\nvar conf = {\n  comments: {\n    lineComment: \"#\"\n  },\n  brackets: [\n    [\"{\", \"}\"],\n    [\"[\", \"]\"],\n    [\"(\", \")\"]\n  ],\n  autoClosingPairs: [\n    { open: \"{\", close: \"}\" },\n    { open: \"[\", close: \"]\" },\n    { open: \"(\", close: \")\" },\n    { open: '\"', close: '\"' },\n    { open: \"'\", close: \"'\" }\n  ],\n  surroundingPairs: [\n    { open: \"{\", close: \"}\" },\n    { open: \"[\", close: \"]\" },\n    { open: \"(\", close: \")\" },\n    { open: '\"', close: '\"' },\n    { open: \"'\", close: \"'\" }\n  ]\n};\nvar language = {\n  defaultToken: \"\",\n  tokenPostfix: \".ini\",\n  escapes: /\\\\(?:[abfnrtv\\\\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,\n  tokenizer: {\n    root: [\n      [/^\\[[^\\]]*\\]/, \"metatag\"],\n      [/(^\\w+)(\\s*)(\\=)/, [\"key\", \"\", \"delimiter\"]],\n      { include: \"@whitespace\" },\n      [/\\d+/, \"number\"],\n      [/\"([^\"\\\\]|\\\\.)*$/, \"string.invalid\"],\n      [/'([^'\\\\]|\\\\.)*$/, \"string.invalid\"],\n      [/\"/, \"string\", '@string.\"'],\n      [/'/, \"string\", \"@string.'\"]\n    ],\n    whitespace: [\n      [/[ \\t\\r\\n]+/, \"\"],\n      [/^\\s*[#;].*$/, \"comment\"]\n    ],\n    string: [\n      [/[^\\\\\"']+/, \"string\"],\n      [/@escapes/, \"string.escape\"],\n      [/\\\\./, \"string.escape.invalid\"],\n      [\n        /[\"']/,\n        {\n          cases: {\n            \"$#==$S2\": { token: \"string\", next: \"@pop\" },\n            \"@default\": \"string\"\n          }\n        }\n      ]\n    ]\n  }\n};\n\n\n\n//# sourceURL=webpack://code-editor/../../node_modules/monaco-editor/esm/vs/basic-languages/ini/ini.js?");

/***/ })

}]);