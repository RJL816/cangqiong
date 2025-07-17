"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackJsonp_bos-platform"] = self["webpackJsonp_bos-platform"] || []).push([[7368],{

/***/ "./src/plugin/mobile/vplus/plugin.js":
/*!*******************************************!*\
  !*** ./src/plugin/mobile/vplus/plugin.js ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\n\n__webpack_require__(/*! core-js/modules/es.object.define-property.js */ \"../../node_modules/core-js/modules/es.object.define-property.js\");\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports[\"default\"] = main;\nvar _PluginManager = __webpack_require__(/*! @/plugin/PluginManager */ \"./src/plugin/PluginManager.js\");\n/**\n *  v+app环境插件，目前只有关闭轻应用窗口方法\n * @author daosheng_chen\n */\n\n/**\n *\n * 插件入口函数\n * @export\n * @param {*} { loadjs, releaseResource }\n * @param {*} callback\n */\n\nfunction main(_ref, callback) {\n  var loadjs = _ref.loadjs,\n    releaseResource = _ref.releaseResource;\n  var plugin = {\n    closeWebView: function closeWebView() {\n      try {\n        releaseResource(); // 通知释放服务器页面资源\n      } catch (error) {\n        console.error('releaseResource', error);\n      }\n      console.log('v+ closeWebView');\n      // v+app的特殊关闭方式\n      console.log('关闭轻应用窗口');\n      window.location.href = 'http://mc_exit//';\n    }\n  };\n  (0, _PluginManager.loadDynamicPlugin)(plugin); // 把插件api挂载在全局指定的插件名上\n  callback && callback(true); // 插件安装完，回调\n}\n\n//# sourceURL=webpack://bos-platform/./src/plugin/mobile/vplus/plugin.js?");

/***/ })

}]);