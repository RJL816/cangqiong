"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkcode_editor"] = self["webpackChunkcode_editor"] || []).push([[2092],{

/***/ "../../node_modules/monaco-editor/esm/vs/basic-languages/azcli/azcli.js":
/*!******************************************************************************!*\
  !*** ../../node_modules/monaco-editor/esm/vs/basic-languages/azcli/azcli.js ***!
  \******************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   conf: function() { return /* binding */ conf; },\n/* harmony export */   language: function() { return /* binding */ language; }\n/* harmony export */ });\n/*!-----------------------------------------------------------------------------\n * Copyright (c) Microsoft Corporation. All rights reserved.\n * Version: 0.38.0(0e330ae453813de4e6cf272460fb79c7117073d0)\n * Released under the MIT license\n * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt\n *-----------------------------------------------------------------------------*/\n\n// src/basic-languages/azcli/azcli.ts\nvar conf = {\n  comments: {\n    lineComment: \"#\"\n  }\n};\nvar language = {\n  defaultToken: \"keyword\",\n  ignoreCase: true,\n  tokenPostfix: \".azcli\",\n  str: /[^#\\s]/,\n  tokenizer: {\n    root: [\n      { include: \"@comment\" },\n      [\n        /\\s-+@str*\\s*/,\n        {\n          cases: {\n            \"@eos\": { token: \"key.identifier\", next: \"@popall\" },\n            \"@default\": { token: \"key.identifier\", next: \"@type\" }\n          }\n        }\n      ],\n      [\n        /^-+@str*\\s*/,\n        {\n          cases: {\n            \"@eos\": { token: \"key.identifier\", next: \"@popall\" },\n            \"@default\": { token: \"key.identifier\", next: \"@type\" }\n          }\n        }\n      ]\n    ],\n    type: [\n      { include: \"@comment\" },\n      [\n        /-+@str*\\s*/,\n        {\n          cases: {\n            \"@eos\": { token: \"key.identifier\", next: \"@popall\" },\n            \"@default\": \"key.identifier\"\n          }\n        }\n      ],\n      [\n        /@str+\\s*/,\n        {\n          cases: {\n            \"@eos\": { token: \"string\", next: \"@popall\" },\n            \"@default\": \"string\"\n          }\n        }\n      ]\n    ],\n    comment: [\n      [\n        /#.*$/,\n        {\n          cases: {\n            \"@eos\": { token: \"comment\", next: \"@popall\" }\n          }\n        }\n      ]\n    ]\n  }\n};\n\n\n\n//# sourceURL=webpack://code-editor/../../node_modules/monaco-editor/esm/vs/basic-languages/azcli/azcli.js?");

/***/ })

}]);