"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkcode_editor"] = self["webpackChunkcode_editor"] || []).push([[9204],{

/***/ "../../node_modules/monaco-editor/esm/vs/basic-languages/csp/csp.js":
/*!**************************************************************************!*\
  !*** ../../node_modules/monaco-editor/esm/vs/basic-languages/csp/csp.js ***!
  \**************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   conf: function() { return /* binding */ conf; },\n/* harmony export */   language: function() { return /* binding */ language; }\n/* harmony export */ });\n/*!-----------------------------------------------------------------------------\n * Copyright (c) Microsoft Corporation. All rights reserved.\n * Version: 0.38.0(0e330ae453813de4e6cf272460fb79c7117073d0)\n * Released under the MIT license\n * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt\n *-----------------------------------------------------------------------------*/\n\n// src/basic-languages/csp/csp.ts\nvar conf = {\n  brackets: [],\n  autoClosingPairs: [],\n  surroundingPairs: []\n};\nvar language = {\n  keywords: [],\n  typeKeywords: [],\n  tokenPostfix: \".csp\",\n  operators: [],\n  symbols: /[=><!~?:&|+\\-*\\/\\^%]+/,\n  escapes: /\\\\(?:[abfnrtv\\\\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,\n  tokenizer: {\n    root: [\n      [/child-src/, \"string.quote\"],\n      [/connect-src/, \"string.quote\"],\n      [/default-src/, \"string.quote\"],\n      [/font-src/, \"string.quote\"],\n      [/frame-src/, \"string.quote\"],\n      [/img-src/, \"string.quote\"],\n      [/manifest-src/, \"string.quote\"],\n      [/media-src/, \"string.quote\"],\n      [/object-src/, \"string.quote\"],\n      [/script-src/, \"string.quote\"],\n      [/style-src/, \"string.quote\"],\n      [/worker-src/, \"string.quote\"],\n      [/base-uri/, \"string.quote\"],\n      [/plugin-types/, \"string.quote\"],\n      [/sandbox/, \"string.quote\"],\n      [/disown-opener/, \"string.quote\"],\n      [/form-action/, \"string.quote\"],\n      [/frame-ancestors/, \"string.quote\"],\n      [/report-uri/, \"string.quote\"],\n      [/report-to/, \"string.quote\"],\n      [/upgrade-insecure-requests/, \"string.quote\"],\n      [/block-all-mixed-content/, \"string.quote\"],\n      [/require-sri-for/, \"string.quote\"],\n      [/reflected-xss/, \"string.quote\"],\n      [/referrer/, \"string.quote\"],\n      [/policy-uri/, \"string.quote\"],\n      [/'self'/, \"string.quote\"],\n      [/'unsafe-inline'/, \"string.quote\"],\n      [/'unsafe-eval'/, \"string.quote\"],\n      [/'strict-dynamic'/, \"string.quote\"],\n      [/'unsafe-hashed-attributes'/, \"string.quote\"]\n    ]\n  }\n};\n\n\n\n//# sourceURL=webpack://code-editor/../../node_modules/monaco-editor/esm/vs/basic-languages/csp/csp.js?");

/***/ })

}]);