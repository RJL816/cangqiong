(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["ScanFiles"] = factory();
	else
		root["ScanFiles"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var asyncScanfiles = __webpack_require__(1);

module.exports = {
  PwyAsyncScanFiles: asyncScanfiles.AsyncScanFiles
};

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AsyncScanFiles", function() { return AsyncScanFiles; });
/* harmony import */ var _piaozone_com_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _allowLocales__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(21);
var _excluded = ["data"];

var _this = undefined;

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, catch: function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }



var syncUse = _piaozone_com_utils__WEBPACK_IMPORTED_MODULE_0__["loadJs"].syncUse;

var async = __webpack_require__(22);

function AsyncScanFiles(opt) {
  var staticUrl = opt.staticUrl;
  var staticPathUrl = opt.staticPathUrl;
  this.uploadUrl = opt.uploadUrl;
  this.uploadingIds = []; // 正常上传的

  this.uploadFinishedIds = [];
  this.addUploadProgressList = []; // 防止重复执行添加队列

  this.queueScanIndex = [];
  this.queueFileInfo = {};
  this.uploadData = opt.uploadData;
  this.fileIndex = 0;
  this.initFlag = false;
  this.limit = opt.limit || 2;
  this.PixelType = opt.PixelType; //彩色模式

  this.Resolution = opt.Resolution || 300; //300dpi

  this.version = opt.version || 15; // 默认15版本

  this.dyName = 'WebTwainEnv';

  if (opt.version == 17) {
    this.dyName = 'DWT';
  }

  this.scanFileStaticJs = opt.scanFileStaticJs || (staticPathUrl ? ["".concat(staticPathUrl, "/scanner-").concat(this.version, "/dynamsoft.webtwain.config.js"), "".concat(staticPathUrl, "/scanner-").concat(this.version, "/dynamsoft.webtwain.initiate.js")] : ["".concat(staticPathUrl, "/scanner-").concat(this.version, "/dynamsoft.webtwain.config.js"), "".concat(staticPathUrl, "/scanner-").concat(this.version, "/dynamsoft.webtwain.initiate.js")]);
  this.needRegonizeQr = opt.needRegonizeQr; // 通知需要识别二维码，加载相关库文件

  this.imageWidth = 1920;
  this.imageHeight = 1080;
  this.uploadDataType = opt.uploadDataType || 'json';
  this.locale = opt.locale || 'zh_CN';
  this.localeDict = __webpack_require__(28)("./" + this.locale).default;
  this.debug = opt.debug;
  this.IfDuplexEnabled = opt.ifDuplexEnabled; // 设置单面扫描

  this.IfAutoDiscardBlankpages = opt.ifAutoDiscardBlankpages; // 自动丢弃空白页

  this.isAutoSelectSource = opt.isAutoSelectSource || false; // 是否自动选择扫描来源: 当只有一个扫描源时,无需选择.多个时,切换后记住当前操作的

  this.isDynamsoftDiscardBlankpages = opt.isDynamsoftDiscardBlankpages || false; // 是否需要sdk过滤空白页

  if (typeof opt.removeScanImagesFlag === 'undefined') {
    this.removeScanImagesFlag = false; // 默认，每次扫描结束不删除扫描的数据
  } else {
    this.removeScanImagesFlag = opt.removeScanImagesFlag;
  }

  if (!window.File || _typeof(window.File) === 'object') {
    // 扫描仪不支持多个并发上传，当存在File对象时，使用blobFile对象上传, 否则并发限制为1, 使用扫描仪上传
    this.limit = 1;
  }

  if (this.needRegonizeQr) {
    if (staticPathUrl) {
      this.scanFileStaticJs.push(staticPathUrl + '/gallery/llqrcode.min.js');
    } else {
      this.scanFileStaticJs.push(staticUrl + '/static/gallery/llqrcode.min.js');
    }
  }
}
AsyncScanFiles.prototype = {
  setQrcodeRecognize: function setQrcodeRecognize(isQrcode) {
    this.needRegonizeQr = isQrcode;
  },
  setLocale: function setLocale(l) {
    if (l && _this.locale !== l && _allowLocales__WEBPACK_IMPORTED_MODULE_1__["default"].indexOf(l) !== -1) {
      _this.locale = l;
      _this.localeDict = __webpack_require__(28)("./" + _this.locale).default;
    }
  },
  setDuplexEnabled: function setDuplexEnabled(isDuplex) {
    this.IfDuplexEnabled = isDuplex;
  },
  getUUId: function getUUId() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == 'x' ? r : r & 0x3 | 0x8).toString(16);
    });
    return uuid;
  },
  myDebug: function myDebug(title, info) {
    if (window.console && this.debug) {
      console.log(title, info);
    }
  },
  setDiscardBlankpages: function setDiscardBlankpages(autoDiscard) {
    // 是否丢弃空白页
    this.IfAutoDiscardBlankpages = autoDiscard;
  },
  init: function init() {
    var _this2 = this;

    return new Promise(function (resolve) {
      if (window.Dynamsoft) {
        resolve({
          errcode: '0000',
          description: 'success'
        });
      } else {
        localStorage.removeItem('isInstallService');
        syncUse(_this2.scanFileStaticJs, function () {
          var Dynamsoft = window.Dynamsoft;

          Dynamsoft[_this2.dyName].RegisterEvent('OnWebTwainReady', function () {
            localStorage['isInstallService'] = 1; // 注册成功说明已安装软件

            window.DWObject = Dynamsoft[_this2.dyName].GetWebTwain('dwtcontrolContainer');

            if (window.DWObject) {
              _this2.removeAllImages();

              resolve({
                errcode: '0000',
                description: 'success'
              });
            } else {
              resolve({
                errcode: 'initError',
                description: _this2.localeDict.initFail
              });
            }
          });
        });
      }
    });
  },
  _convertImage: function _convertImage(i) {
    var _this3 = this;

    return new Promise(function (resolve) {
      // 1 B&W,8-Gray,24-RGB
      var picFormat = window.Dynamsoft[_this3.dyName].EnumDWT_ImageType.IT_JPG;
      var bitdepth = window.DWObject.GetImageBitDepth(i); // 黑白使用png输出

      console.log('==>bitdepth', bitdepth);

      if (bitdepth == 1) {
        picFormat = window.Dynamsoft[_this3.dyName].EnumDWT_ImageType.IT_PNG;
      } else {
        window.DWObject.ConvertToBlob([i], picFormat, function (result) {
          resolve({
            errcode: '0000',
            data: result
          });
        }, function (errorCode, errorString) {
          console.warn(errorCode, errorString);
          resolve({
            errcode: 'covertErr',
            description: errorString
          });
        });
      }
    });
  },
  uploadByIds: function uploadByIds(ids, otherData, filename) {
    var _this4 = this;

    return new Promise(function (resolve) {
      async.mapLimit(ids, _this4.limit, /*#__PURE__*/function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(index, callback) {
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return _this4.handlerStepUploadStart(index, otherData, filename);

                case 2:
                  callback(null, {});

                case 3:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        return function (_x, _x2) {
          return _ref.apply(this, arguments);
        };
      }(), /*#__PURE__*/function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(err) {
          return _regeneratorRuntime().wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  if (err) {
                    console.error(err);
                  }

                  resolve({
                    errcode: '0000'
                  });

                case 2:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        }));

        return function (_x3) {
          return _ref2.apply(this, arguments);
        };
      }());
    });
  },
  handlerAddUploadProgress: function () {
    var _handlerAddUploadProgress = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
      var i, curIndex, fileInfo;
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              i = 0;

            case 1:
              if (!(i < this.queueScanIndex.length)) {
                _context3.next = 27;
                break;
              }

              curIndex = this.queueScanIndex[i];
              fileInfo = this.queueFileInfo['k' + curIndex];

              if (!(typeof fileInfo === 'undefined')) {
                _context3.next = 8;
                break;
              }

              return _context3.abrupt("break", 27);

            case 8:
              if (!(typeof fileInfo === '')) {
                _context3.next = 12;
                break;
              }

              return _context3.abrupt("continue", 24);

            case 12:
              if (!(_typeof(fileInfo) === 'object' && this.addUploadProgressList.indexOf(curIndex) === -1)) {
                _context3.next = 24;
                break;
              }

              this.addUploadProgressList.push(curIndex);
              this.myDebug('handlerAddUploadProgress addUploadProgressCallback', curIndex);

              if (!(typeof this.addUploadProgress === 'function')) {
                _context3.next = 24;
                break;
              }

              _context3.prev = 16;
              _context3.next = 19;
              return this.addUploadProgress(fileInfo);

            case 19:
              _context3.next = 24;
              break;

            case 21:
              _context3.prev = 21;
              _context3.t0 = _context3["catch"](16);
              console.error(_context3.t0);

            case 24:
              i++;
              _context3.next = 1;
              break;

            case 27:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this, [[16, 21]]);
    }));

    function handlerAddUploadProgress() {
      return _handlerAddUploadProgress.apply(this, arguments);
    }

    return handlerAddUploadProgress;
  }(),
  loopGetFileInfo: function () {
    var _loopGetFileInfo = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
      var _this5 = this;

      var i, curIndex, fileInfo;
      return _regeneratorRuntime().wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              i = 0;

            case 1:
              if (!(i < this.queueScanIndex.length)) {
                _context4.next = 10;
                break;
              }

              curIndex = this.queueScanIndex[i];
              fileInfo = this.queueFileInfo['k' + curIndex];

              if (!(_typeof(fileInfo) !== 'object')) {
                _context4.next = 7;
                break;
              }

              _context4.next = 7;
              return this.getFileInfo(curIndex);

            case 7:
              i++;
              _context4.next = 1;
              break;

            case 10:
              this.tick3 = setTimeout(function () {
                _this5.loopGetFileInfo();
              }, 500);

            case 11:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function loopGetFileInfo() {
      return _loopGetFileInfo.apply(this, arguments);
    }

    return loopGetFileInfo;
  }(),
  handlerStepUploadStart: function () {
    var _handlerStepUploadStart = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(index, otherData, filename) {
      var fileInfo, preRes, res;
      return _regeneratorRuntime().wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              fileInfo = this.queueFileInfo['k' + index];

              if (!(_typeof(fileInfo) === 'object')) {
                _context5.next = 22;
                break;
              }

              preRes = {};

              if (!(typeof this.stepUploadStart === 'function')) {
                _context5.next = 16;
                break;
              }

              _context5.prev = 4;
              _context5.next = 7;
              return this.stepUploadStart(fileInfo);

            case 7:
              _context5.t0 = _context5.sent;

              if (_context5.t0) {
                _context5.next = 10;
                break;
              }

              _context5.t0 = {};

            case 10:
              preRes = _context5.t0;
              _context5.next = 16;
              break;

            case 13:
              _context5.prev = 13;
              _context5.t1 = _context5["catch"](4);
              console.error('stepUploadStart处理失败：', _context5.t1);

            case 16:
              _context5.next = 18;
              return this.handlerUpload(preRes, index, otherData, filename);

            case 18:
              res = _context5.sent;

              if (!res) {
                _context5.next = 22;
                break;
              }

              _context5.next = 22;
              return this.handlerStepUploadFinish(index, fileInfo, res);

            case 22:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, this, [[4, 13]]);
    }));

    function handlerStepUploadStart(_x4, _x5, _x6) {
      return _handlerStepUploadStart.apply(this, arguments);
    }

    return handlerStepUploadStart;
  }(),
  handlerUpload: function () {
    var _handlerUpload = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(preRes, index, otherData, filename) {
      var fileInfo, stopStepUpload, result, res, newData, upOtherData, spliceIndex;
      return _regeneratorRuntime().wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              fileInfo = this.queueFileInfo['k' + index]; // 防止重复上传，处理的准备数据必须都准备好

              stopStepUpload = !!preRes.stopStepUpload;
              result = '';

              if (!stopStepUpload) {
                _context6.next = 7;
                break;
              }

              result = [preRes, {}];
              _context6.next = 22;
              break;

            case 7:
              res = {};
              newData = {};

              if (!fileInfo.file) {
                _context6.next = 21;
                break;
              }

              upOtherData = preRes.otherData || {};
              newData = _objectSpread(_objectSpread({}, otherData), upOtherData);
              _context6.prev = 12;
              _context6.next = 15;
              return this.uploadFile(fileInfo, newData, filename);

            case 15:
              res = _context6.sent;
              _context6.next = 21;
              break;

            case 18:
              _context6.prev = 18;
              _context6.t0 = _context6["catch"](12);
              console.error('uploadFile 处理失败', _context6.t0);

            case 21:
              result = [res, newData];

            case 22:
              spliceIndex = this.uploadingIds.indexOf(index);

              if (spliceIndex !== -1) {
                this.uploadingIds.splice(spliceIndex, 1);
              }

              return _context6.abrupt("return", result);

            case 25:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, this, [[12, 18]]);
    }));

    function handlerUpload(_x7, _x8, _x9, _x10) {
      return _handlerUpload.apply(this, arguments);
    }

    return handlerUpload;
  }(),
  handlerStepUploadFinish: function () {
    var _handlerStepUploadFinish = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(index, fileInfo, res) {
      return _regeneratorRuntime().wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              if (!(typeof this.stepUploadFinish === 'function')) {
                _context7.next = 10;
                break;
              }

              _context7.prev = 1;

              // http请求出现异常
              if (!res[0].errcode) {
                this.scanHttpHasError = true;
              }

              _context7.next = 5;
              return this.stepUploadFinish(res[0], fileInfo, res[1]);

            case 5:
              _context7.next = 10;
              break;

            case 7:
              _context7.prev = 7;
              _context7.t0 = _context7["catch"](1);
              console.error('stepUploadFinish 处理失败', _context7.t0);

            case 10:
              // 一个文件完全处理完成，清理相关数据减少内存占用
              this.uploadFinishedIds.push(index);

            case 11:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, this, [[1, 7]]);
    }));

    function handlerStepUploadFinish(_x11, _x12, _x13) {
      return _handlerStepUploadFinish.apply(this, arguments);
    }

    return handlerStepUploadFinish;
  }(),
  getNeedUploadIds: function getNeedUploadIds() {
    var _this6 = this;

    var limitLen = this.limit - this.uploadingIds.length;
    var result = [];

    if (limitLen > 0) {
      var waitIds = this.addUploadProgressList.filter(function (index) {
        return _this6.uploadFinishedIds.indexOf(index) === -1 && _this6.uploadingIds.indexOf(index) === -1;
      });
      this.myDebug('getNeedUploadIds addUploadProgressList', this.addUploadProgressList);
      this.myDebug('getNeedUploadIds waitIds', waitIds);
      this.myDebug('getNeedUploadIds uploadFinishedIds', this.uploadFinishedIds);
      this.myDebug('getNeedUploadIds uploadingIds', this.uploadingIds);
      var maxLen = waitIds.length > limitLen ? limitLen : waitIds.length;
      result = waitIds.splice(0, maxLen);
    }

    return result;
  },
  checkAndUpload: function () {
    var _checkAndUpload = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(otherData, filename) {
      var _this7 = this;

      var ids;
      return _regeneratorRuntime().wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _context10.next = 2;
              return this.handlerAddUploadProgress();

            case 2:
              ids = this.getNeedUploadIds();
              this.myDebug('checkAndUpload', ids);

              if (ids.length > 0) {
                this.uploadingIds = this.uploadingIds.concat(ids);
                async.mapLimit(ids, this.limit, /*#__PURE__*/function () {
                  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(index, callback) {
                    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
                      while (1) {
                        switch (_context8.prev = _context8.next) {
                          case 0:
                            _context8.next = 2;
                            return _this7.handlerStepUploadStart(index, otherData, filename);

                          case 2:
                            callback(null, {});

                          case 3:
                          case "end":
                            return _context8.stop();
                        }
                      }
                    }, _callee8);
                  }));

                  return function (_x16, _x17) {
                    return _ref3.apply(this, arguments);
                  };
                }(), /*#__PURE__*/function () {
                  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(err) {
                    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
                      while (1) {
                        switch (_context9.prev = _context9.next) {
                          case 0:
                            if (err) {
                              console.error(err);
                            }

                          case 1:
                          case "end":
                            return _context9.stop();
                        }
                      }
                    }, _callee9);
                  }));

                  return function (_x18) {
                    return _ref4.apply(this, arguments);
                  };
                }());
              }

              if (!this.isOnPostAllTransfers) {
                this.tick1 = window.setTimeout(function () {
                  _this7.checkAndUpload(otherData, filename);
                }, 1000);
              }

            case 6:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10, this);
    }));

    function checkAndUpload(_x14, _x15) {
      return _checkAndUpload.apply(this, arguments);
    }

    return checkAndUpload;
  }(),
  scanEndHanlder: function scanEndHanlder() {
    var totalNum = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var errInfo = arguments.length > 1 ? arguments[1] : undefined;
    // 还原初始化变量
    this.uploadingIds = []; // 当前正在上传的数量，用于控制onPostTransferAsync中的并发数量

    this.queueScanIndex = []; // 顺序数组

    this.addUploadProgressList = [];
    this.uploadFinishedIds = [];
    this.queueFileInfo = {};
    this.isOnPostAllTransfers = false;
    var ErrorCode = DWObject.ErrorCode;
    var ErrorString = DWObject.ErrorString;
    var errcode = '0000';
    var description = 'success';

    if (_typeof(errInfo) === 'object') {
      errcode = errInfo.errcode || 'scanErr';
      description = errInfo.description || this.localeDict.scannerException;
    } else if (!this.scanHttpHasError) {
      // 每一步请求都有http返回认为整个扫描正常结束
      errcode = '0000';
      description = 'success';
    } else if (ErrorCode !== 0 && ErrorCode !== -2115) {
      // Cancel file dialog
      console.error(ErrorCode, ErrorString);
      errcode = 'scanErr';
      description = this.localeDict.scannerException;
    }

    window.clearTimeout(this.tick1);
    window.clearTimeout(this.tick2);
    window.clearTimeout(this.tick3);

    if (typeof this.uploadFinish === 'function') {
      try {
        this.uploadFinish({
          errcode: errcode,
          description: description,
          data: {
            imagesNum: totalNum,
            howManyImagesInBuffer: window.DWObject.HowManyImagesInBuffer,
            startHowManyImagesInBuffer: this.startHowManyImagesInBuffer
          }
        });
      } catch (error) {
        console.warn(error);
      }
    }
  },
  checkScanFinish: function () {
    var _checkScanFinish = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13(otherData, filename) {
      var _this8 = this;

      var totalNum, fileInfoListLen, finishIds, ids;
      return _regeneratorRuntime().wrap(function _callee13$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              totalNum = window.DWObject.HowManyImagesInBuffer - this.startHowManyImagesInBuffer; // 处理完成的文件必须大于等于这个
              // file对象还未生成完，防止重复生成文件对象

              fileInfoListLen = this.queueScanIndex.filter(function (fileIndex) {
                return typeof _this8.queueFileInfo['k' + fileIndex] === 'undefined';
              }); // 防止id重复,找出已经完成的

              finishIds = this.queueScanIndex.filter(function (fileIndex) {
                return _this8.uploadFinishedIds.indexOf(fileIndex) !== -1;
              });
              this.myDebug('checkScanFinish finishIds', finishIds);
              this.myDebug('checkScanFinish fileInfoListLen', fileInfoListLen); // 处理完成

              if (!(finishIds.length >= totalNum)) {
                _context13.next = 9;
                break;
              }

              this.scanEndHanlder(totalNum);
              _context13.next = 19;
              break;

            case 9:
              if (!(fileInfoListLen.length === 0)) {
                _context13.next = 18;
                break;
              }

              _context13.next = 12;
              return this.handlerAddUploadProgress();

            case 12:
              ids = this.getNeedUploadIds();
              this.uploadingIds = this.uploadingIds.concat(ids);
              async.mapLimit(ids, this.limit, /*#__PURE__*/function () {
                var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(index, callback) {
                  return _regeneratorRuntime().wrap(function _callee11$(_context11) {
                    while (1) {
                      switch (_context11.prev = _context11.next) {
                        case 0:
                          _context11.next = 2;
                          return _this8.handlerStepUploadStart(index, otherData, filename);

                        case 2:
                          callback(null, {});

                        case 3:
                        case "end":
                          return _context11.stop();
                      }
                    }
                  }, _callee11);
                }));

                return function (_x21, _x22) {
                  return _ref5.apply(this, arguments);
                };
              }(), /*#__PURE__*/function () {
                var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12(err) {
                  return _regeneratorRuntime().wrap(function _callee12$(_context12) {
                    while (1) {
                      switch (_context12.prev = _context12.next) {
                        case 0:
                          if (err) {
                            console.error(err);
                          }

                        case 1:
                        case "end":
                          return _context12.stop();
                      }
                    }
                  }, _callee12);
                }));

                return function (_x23) {
                  return _ref6.apply(this, arguments);
                };
              }());
              this.tick2 = setTimeout(function () {
                _this8.checkScanFinish(otherData, filename);
              }, 800);
              _context13.next = 19;
              break;

            case 18:
              this.tick2 = setTimeout(function () {
                _this8.checkScanFinish(otherData, filename);
              }, 1000);

            case 19:
            case "end":
              return _context13.stop();
          }
        }
      }, _callee13, this);
    }));

    function checkScanFinish(_x19, _x20) {
      return _checkScanFinish.apply(this, arguments);
    }

    return checkScanFinish;
  }(),
  getFileInfo: function () {
    var _getFileInfo = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee14(imgIndex) {
      var imgUrl, res, fileInfo, qrcodeResult, fileUid, localUrl, qrRes;
      return _regeneratorRuntime().wrap(function _callee14$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              if (!(_typeof(this.queueFileInfo['k' + imgIndex]) === 'object')) {
                _context14.next = 2;
                break;
              }

              return _context14.abrupt("return", this.queueFileInfo['k' + imgIndex]);

            case 2:
              this.myDebug('start getFileInfo', imgIndex);
              imgUrl = window.DWObject.GetImageURL(imgIndex, this.imageWidth, this.imageHeight);
              _context14.next = 6;
              return this._convertImage(imgIndex);

            case 6:
              res = _context14.sent;
              fileInfo = {};
              qrcodeResult = '';
              fileUid = this.getUUId() + '-' + imgIndex;

              if (!(res.errcode === '0000')) {
                _context14.next = 20;
                break;
              }

              localUrl = window.URL.createObjectURL(res.data);

              if (!this.needRegonizeQr) {
                _context14.next = 17;
                break;
              }

              _context14.next = 15;
              return this.regonizeQr(localUrl);

            case 15:
              qrRes = _context14.sent;

              if (qrRes.errcode === '0000') {
                qrcodeResult = qrRes.data;
              }

            case 17:
              fileInfo = {
                name: fileUid + '.jpg',
                index: imgIndex,
                status: 'init',
                id: fileUid,
                errcode: res.errcode || '0000',
                description: res.description,
                file: res.data,
                localUrl: imgUrl,
                qrcodeResult: qrcodeResult
              };
              _context14.next = 21;
              break;

            case 20:
              fileInfo = {
                name: fileUid + '.jpg',
                index: imgIndex,
                id: fileUid,
                status: 'init',
                errcode: res.errcode,
                description: res.description,
                qrcodeResult: '',
                localUrl: imgUrl
              };

            case 21:
              this.myDebug('getFileInfo success', imgIndex);
              this.queueFileInfo['k' + imgIndex] = fileInfo;
              return _context14.abrupt("return", fileInfo);

            case 24:
            case "end":
              return _context14.stop();
          }
        }
      }, _callee14, this);
    }));

    function getFileInfo(_x24) {
      return _getFileInfo.apply(this, arguments);
    }

    return getFileInfo;
  }(),
  _AcquireImage: function _AcquireImage(_ref7) {
    var _this9 = this;

    var _ref7$otherData = _ref7.otherData,
        otherData = _ref7$otherData === void 0 ? {} : _ref7$otherData,
        _ref7$filename = _ref7.filename,
        filename = _ref7$filename === void 0 ? 'file' : _ref7$filename,
        stepUploadStart = _ref7.stepUploadStart,
        stepUploadFinish = _ref7.stepUploadFinish,
        uploadFinish = _ref7.uploadFinish,
        addUploadProgress = _ref7.addUploadProgress,
        onProgress = _ref7.onProgress;
    return new Promise(function (resolve) {
      var DWObject = window.DWObject;

      if (typeof onProgress === 'function') {
        _this9.onProgress = onProgress;
      }

      if (typeof addUploadProgress === 'function') {
        _this9.addUploadProgress = addUploadProgress;
      }

      if (typeof stepUploadStart === 'function') {
        _this9.stepUploadStart = stepUploadStart;
      }

      if (typeof stepUploadFinish === 'function') {
        _this9.stepUploadFinish = stepUploadFinish;
      }

      if (typeof uploadFinish === 'function') {
        _this9.uploadFinish = uploadFinish;
      }

      if (DWObject) {
        DWObject.IfUseTwainDSM = true; // 不加载WIA的驱动来源

        var sourceIndex = localStorage['sourceIndex'] || ''; // 获取上次的sourceIndex

        if (!localStorage['scanSources']) {
          // 保存扫描源
          var sources = DWObject.GetSourceNames();
          localStorage['scanSources'] = JSON.stringify(sources);
        }

        if (_this9.isAutoSelectSource && sourceIndex) {
          // 是否选择扫描来源
          DWObject.SelectSourceByIndex(sourceIndex);

          _this9.initConfig(otherData, filename);
        } else {
          DWObject.SelectSource( /*#__PURE__*/function () {
            var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee15(sourceIndex) {
              return _regeneratorRuntime().wrap(function _callee15$(_context15) {
                while (1) {
                  switch (_context15.prev = _context15.next) {
                    case 0:
                      localStorage['sourceIndex'] = sourceIndex; // 记住上次的选择

                      _this9.initConfig(otherData, filename);

                    case 2:
                    case "end":
                      return _context15.stop();
                  }
                }
              }, _callee15);
            }));

            return function (_x25) {
              return _ref8.apply(this, arguments);
            };
          }(), function () {
            _this9.scanEndHanlder(0);
          });
        }
      }
    });
  },
  initConfig: function initConfig(otherData, filename) {
    var _this10 = this;

    this.startHowManyImagesInBuffer = window.DWObject.HowManyImagesInBuffer; // 初始扫描时的文件数

    this.queueScanIndex = []; // 顺序数组,用于控制addProgress的顺序执行

    this.uploadingIds = []; // 当前正在上传的数量，用于控制onPostTransferAsync中的并发数量

    this.addUploadProgressList = [];
    this.uploadFinishedIds = [];
    this.isOnPostAllTransfers = false;
    this.queueFileInfo = {};
    DWObject.OpenSource();
    DWObject.IfDisableSourceAfterAcquire = true;
    DWObject.PixelType = this.PixelType || window.Dynamsoft[this.dyName].EnumDWT_PixelType.TWPT_RGB; //彩色模式

    DWObject.Resolution = this.Resolution; //300dpi

    DWObject.IfShowUI = false;
    DWObject.IfShowProgressBar = false;
    DWObject.IfShowCancelDialogWhenImageTransfer = false;
    DWObject.IfShowFileDialog = false;
    DWObject.IfFeederEnabled = true;
    DWObject.IfDuplexEnabled = this.IfDuplexEnabled; // 是否多页扫描

    try {
      if (this.IfDuplexEnabled) {
        DWObject.IfAutoDiscardBlankpages = this.IfAutoDiscardBlankpages; //自动丢弃空白页
        //赋予自动丢弃空白页的能力

        DWObject.Capability = 4404;
        DWObject.CapType = 5;
        DWObject.CapValue = -1; //Auto

        if (DWObject.CapSet) {
          console.log('自动废弃空白页设置成功');
        }
      }
    } catch (err) {
      console.warn('设置自动丢弃空白页失败', err);
    } // 异步事件存在异常，暂时不用
    // DWObject.RegisterEvent('OnPostTransferAsync', (outputInfo) => {
    //     const index = DWObject.ImageIDToIndex(outputInfo.imageId);
    //     this.myDebug('OnPostTransferAsync index', index);
    //     this.queueScanIndex.push(index);
    //     this.handlerAddUploadProgress(index);
    // });


    DWObject.RegisterEvent('OnPostTransfer', function () {
      var index = DWObject.CurrentImageIndexInBuffer; // 需要过滤空白页，当扫描仪不支持api设置时，直接通过sdk过滤

      if (_this10.IfAutoDiscardBlankpages && _this10.isDynamsoftDiscardBlankpages && DWObject.IsBlankImageExpress(index)) {
        DWObject.BlankImageMaxStdDev = 0; // 0: 单色,不包含任何噪点.

        DWObject.RemoveImage(index);
      } else {
        _this10.queueScanIndex.push(index);
      }

      _this10.myDebug('OnPostTransfer index', index);
    });
    DWObject.RegisterEvent('OnPostAllTransfers', function () {
      _this10.isOnPostAllTransfers = true;
      window.DWObject.CloseSource();

      _this10.checkScanFinish(otherData, filename);
    });
    window.DWObject.AcquireImage(function () {}, function (err, msg) {
      if (err) {
        console.warn('扫描出错：', err, msg);
		/******
        var description = _this10.localeDict.scannerException;

        if (err === -1003) {
          description = _this10.localeDict.unFindScanner;
        }

        _this10.scanEndHanlder(0, {
          errcode: 'scanErr',
          description: msg
        });

        return; ****/
      }

      window.DWObject.CloseSource();
	  /*****
      resolve({
        errcode: '0000',
        description: 'success'
      });
	  ****/
    });
  },
  uploadBlobFile: function () {
    var _uploadBlobFile = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee16(info, otherData) {
      var _this11 = this;

      var filename,
          upFile,
          formData,
          allKeys,
          i,
          key,
          value,
          requestParam,
          res,
          _args16 = arguments;
      return _regeneratorRuntime().wrap(function _callee16$(_context16) {
        while (1) {
          switch (_context16.prev = _context16.next) {
            case 0:
              filename = _args16.length > 2 && _args16[2] !== undefined ? _args16[2] : 'file';
              // ie10 及高版本浏览器使用blob转换为file上传
              upFile = _piaozone_com_utils__WEBPACK_IMPORTED_MODULE_0__["tools"].blobToFile(info.file, info.name);
              formData = new FormData();
              allKeys = Object.keys(otherData);

              for (i = 0; i < allKeys.length; i++) {
                formData.append(allKeys[i], otherData[allKeys[i]]);
              }

              formData.append(filename, upFile);
              formData.append('originalFilename', info.name);

              if (this.uploadData) {
                for (key in this.uploadData) {
                  value = this.uploadData[key];
                  formData.append(key, value);
                }
              }

              requestParam = {
                method: 'post',
                data: formData,
                contentType: 'file'
              }; // 需要进度提示

              if (typeof this.onProgress === 'function') {
                // 上传进度显示
                requestParam.onRequestProgress = function (loaded, total) {
                  try {
                    _this11.onProgress(info, loaded, total);
                  } catch (error) {
                    _typeof(window.console) && console.error(error);
                  }
                };
              }

              _context16.next = 12;
              return Object(_piaozone_com_utils__WEBPACK_IMPORTED_MODULE_0__["pwyFetch"])(this.uploadUrl, requestParam);

            case 12:
              res = _context16.sent;

              if (!(['gatewayTimeout', 'serverErr', 'requestErr', 'timeoutErr'].indexOf(res.errcode) !== -1)) {
                _context16.next = 17;
                break;
              }

              return _context16.abrupt("return", _objectSpread(_objectSpread({}, res), {}, {
                description: this.localeDict[res.errcode]
              }));

            case 17:
              return _context16.abrupt("return", res);

            case 18:
            case "end":
              return _context16.stop();
          }
        }
      }, _callee16, this);
    }));

    function uploadBlobFile(_x26, _x27) {
      return _uploadBlobFile.apply(this, arguments);
    }

    return uploadBlobFile;
  }(),
  uploadFile: function () {
    var _uploadFile = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee17(info, otherData) {
      var _this12 = this;

      var filename,
          res,
          _args17 = arguments;
      return _regeneratorRuntime().wrap(function _callee17$(_context17) {
        while (1) {
          switch (_context17.prev = _context17.next) {
            case 0:
              filename = _args17.length > 2 && _args17[2] !== undefined ? _args17[2] : 'file';

              if (!(window.File && typeof window.File === 'function')) {
                _context17.next = 8;
                break;
              }

              _context17.next = 4;
              return this.uploadBlobFile(info, otherData, filename);

            case 4:
              res = _context17.sent;
              return _context17.abrupt("return", res);

            case 8:
              return _context17.abrupt("return", new Promise(function (resolve) {
                var port = window.location.port || '';

                if (port) {
                  window.DWObject.HTTPPort = parseInt(port);
                }

                window.DWObject.ClearAllHTTPFormField();
                var allKeys = Object.keys(otherData);

                for (var i = 0; i < allKeys.length; i++) {
                  window.DWObject.SetHTTPFormField(allKeys[i], otherData[allKeys[i]]);
                }

                window.DWObject.HttpFieldNameOfUploadedImage = filename;

                if (window.location.protocol === 'https:') {
                  window.DWObject.IfSSL = true;
                }

                var scanPath = _this12.uploadUrl.replace(/^https?:\/\/.*?\/(.*)/, '/$1');

                var parseResult = function parseResult(result) {
                  if (result) {
                    var _res;

                    if (_this12.uploadDataType === 'json') {
                      try {
                        _res = JSON.parse(result);
                        resolve(_res);
                      } catch (err) {
                        console.warn(err);
                        resolve({
                          errcode: '500',
                          description: _this12.localeDict.scannerException
                        });
                      }
                    } else {
                      resolve(result);
                    }
                  } else {
                    resolve({
                      errcode: '500',
                      description: _this12.localeDict.scannerException
                    });
                  }
                };

                window.DWObject.HTTPUploadThroughPostEx(window.location.hostname, info.index, scanPath, info.name, 1, //jpg格式
                function (httpResponse) {
                  parseResult(httpResponse);
                }, function (errorCode, errorString, httpResponse) {
                  if (httpResponse) {
                    parseResult(httpResponse);
                  } else {
                    console.warn(errorCode, errorString);
                    resolve({
                      errcode: 'errorCode',
                      description: errorString
                    });
                  }
                });
              }));

            case 9:
            case "end":
              return _context17.stop();
          }
        }
      }, _callee17, this);
    }));

    function uploadFile(_x28, _x29) {
      return _uploadFile.apply(this, arguments);
    }

    return uploadFile;
  }(),
  regonizeQr: function () {
    var _regonizeQr = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee18(url) {
      return _regeneratorRuntime().wrap(function _callee18$(_context18) {
        while (1) {
          switch (_context18.prev = _context18.next) {
            case 0:
              return _context18.abrupt("return", new Promise(function (resolve) {
                var pwyQrcode = window.qrcode;
                /**
                 * result.indexOf(',') === -1; 过滤增值税发票二维码(包含,)
                 * result.indexOf('-') === -1; 过滤火车票二维码(只包含数字)
                 * result.indexOf('^') === -1; 过滤轮船票二维码(包含^)
                 */

                try {
                  pwyQrcode.result = '';
                  pwyQrcode.decode(url);

                  pwyQrcode.callback = function (result) {
                    var isMatchChars = result.match(/(\|)|}|;|,|(\^)/); // 包含

                    if (result && result.indexOf('error') === -1 && result.indexOf('-') !== -1 && !isMatchChars) {
                      resolve({
                        errcode: '0000',
                        data: result
                      });
                    } else {
                      resolve({
                        errcode: 'empty',
                        data: ''
                      });
                    }
                  };
                } catch (err) {
                  console.warn(err);
                  resolve({
                    errcode: 'empty',
                    data: ''
                  });
                }
              }));

            case 1:
            case "end":
              return _context18.stop();
          }
        }
      }, _callee18);
    }));

    function regonizeQr(_x30) {
      return _regonizeQr.apply(this, arguments);
    }

    return regonizeQr;
  }(),
  removeAllImages: function removeAllImages() {
    if (window.DWObject) {
      window.DWObject.RemoveAllImages();
      this.fileIndex = 0;
    }
  },
  startScan: function () {
    var _startScan = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee19(opt) {
      var _opt$data, data, otherOpt, initRes, res;

      return _regeneratorRuntime().wrap(function _callee19$(_context19) {
        while (1) {
          switch (_context19.prev = _context19.next) {
            case 0:
              _opt$data = opt.data, data = _opt$data === void 0 ? {} : _opt$data, otherOpt = _objectWithoutProperties(opt, _excluded);

              if (window.Dynamsoft) {
                _context19.next = 7;
                break;
              }

              _context19.next = 4;
              return this.init();

            case 4:
              initRes = _context19.sent;

              if (!(initRes.errcode !== '0000')) {
                _context19.next = 7;
                break;
              }

              return _context19.abrupt("return", initRes);

            case 7:
              if (!(!localStorage['isInstallService'] && window.Dynamsoft)) {
                _context19.next = 11;
                break;
              }

              window.Dynamsoft[this.dyName].Unload();
              window.Dynamsoft[this.dyName].Load(); // 重新加载配置

              return _context19.abrupt("return", {
                errcode: 'initError',
                description: this.localeDict.initFail
              });

            case 11:
              this.isOnPostAllTransfers = false;
              this.scanHttpHasError = false;
              window.clearTimeout(this.tick1);
              window.clearTimeout(this.tick2);
              window.clearTimeout(this.tick3);
              this.checkAndUpload(data, opt.filename);
              this.loopGetFileInfo();
              _context19.next = 20;
              return this._AcquireImage(_objectSpread({
                otherData: data
              }, otherOpt));

            case 20:
              res = _context19.sent;
              return _context19.abrupt("return", res);

            case 22:
            case "end":
              return _context19.stop();
          }
        }
      }, _callee19, this);
    }));

    function startScan(_x31) {
      return _startScan.apply(this, arguments);
    }

    return startScan;
  }()
};

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "baseExt", function() { return baseExt; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cookieHelp", function() { return cookieHelp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cacheHelp", function() { return cacheHelp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadJs", function() { return loadJs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "urlHandler", function() { return urlHandler; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tools", function() { return tools; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "checkInvoiceType", function() { return checkInvoiceType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "checkInvoiceTypeFull", function() { return checkInvoiceTypeFull; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "blockchain_filter", function() { return blockchain_filter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "crossHttp", function() { return crossHttp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clientCheck", function() { return clientCheck; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "kdRequest", function() { return kdRequest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pwyFetch", function() { return pwyFetch; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pwyRequest", function() { return pwyRequest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "paramJson", function() { return paramJson; });
const request = __webpack_require__(3);
const pwyRequestLib = __webpack_require__(5);

const baseExt = __webpack_require__(13);
const cookieHelp = __webpack_require__(4);
const cacheHelp = __webpack_require__(15);
const loadJs = __webpack_require__(16);
const urlHandler = __webpack_require__(17);
const tools = __webpack_require__(6);
const checkInvoiceType = __webpack_require__(18).checkInvoiceType;
const checkInvoiceTypeFull = __webpack_require__(18).checkInvoiceTypeFull;
const blockchain_filter = __webpack_require__(18).blockchain_filter;
const crossHttp = __webpack_require__(19).default;
const clientCheck = __webpack_require__(20).default;
const kdRequest = request.kdRequest;
const pwyFetch = pwyRequestLib.pwyFetch;
const pwyRequest = pwyRequestLib.kdRequest;
const paramJson = request.param;


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "prePath", function() { return prePath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "param", function() { return param; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "kdRequest", function() { return kdRequest; });
/* harmony import */ var _cookie_helps__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);


const prePath = '/';
const param = function(data){
	if(typeof data === 'string'){
		try{
			data = JSON.parse(data);
		}catch(e){ //非json对象
			return data;
		}
	}

	let result = [];
	for(const item in data){
		if(data.hasOwnProperty(item)){
			result.push(item+'='+ encodeURIComponent(data[item]));
		}
	}
	return result.join('&');
}


const myFetch = ({
    method='GET',
    url='',
    data='',
    mode='cors',
    timeout = 60000,
    redirect = 'follow',
    dataType='json',
    credentials='include',
    headers = {'Content-Type': 'application/json'}
}) => {
    let requestObj = {
        method,
        mode,
        credentials,
        redirect
    };

    if(method === 'GET'){
        data = param(data);
    }else if(typeof data === 'object' && dataType === 'json'){
        data = JSON.stringify(data);
    }

    if(method === 'GET'){
        if(url.indexOf('?') === -1){
            url +='?' + data;
        }else{
            url +='&' + data;
        }
    }else if(method === 'POST'){
        requestObj.body = data;
    }

    if(dataType === 'json'){
        requestObj.headers = headers;
    }

    return fetch(url, requestObj);
}

function myXhr({
    method='GET',
    url='',
    data='',
    timeout = 60000,
    credentials='include',
    contentType,
    headers,
    success
}){
    contentType = headers['Content-Type'] || 'application/json;charset=UTF-8';
    return new Promise((resolve, reject) => {
        let xhr;

        if(XMLHttpRequest){
            xhr = new XMLHttpRequest();
        }
        if(!xhr && typeof XDomainRequest !== 'undefined'){
            // 检查是否是IE，并且使用IE的XDomainRequest
            xhr = new XDomainRequest();
        }

        try{
            xhr.timeout = timeout;
            //xhr.contentLength = data.length;
        }catch(e){
            console.warn('设置超时时间异常');
        }

        xhr.ontimeout = function(){
            resolve({errcode: 'timeoutErr', description:'请求超时！'});
        };

        if(contentType){
            try{
                xhr.contentType = contentType;
            }catch(e){
                console.warn('设置contentType异常');
            }
        }

        xhr.onload = function(){
            if(xhr.readyState === 4){
                const status = xhr.status;
                if(status === 200){
                    let resData = xhr.responseText;
                    try{
                        resData = JSON.parse(resData);
                        resolve(resData);
                    }catch(e){
                    	resolve({errcode: 'innerErr', description:'返回数据出错！'});
                    }
                }else{
                	resolve({errcode: 'requestErr', description:`请求出错${status}`});
                }
            }
        };

        xhr.onerror = function(error){
            resolve({errcode: 'requestErr', description:`请求异常`});
        };

        xhr.open(method, url, true);

        try {
            xhr.setRequestHeader('Content-Type', contentType);
            if (headers['x-csrf-token']) xhr.setRequestHeader('x-csrf-token', headers['x-csrf-token']);
        } catch (error) {
            //console.log(error);
        }

        xhr.send(data);
    })
}

async function kdRequest({
    urlPre='',
    method='GET',
    url='',
    data='',
    mode='cors',
    timeout = 60000,
    redirect = 'follow',
    dataType='json',
    credentials='include',
    handlerError,
    headers = {'Content-Type': 'application/json'}
}) {

	if(!/^http/.test(url)){
		url = urlPre + url;
	}

    let csrfToken = Object(_cookie_helps__WEBPACK_IMPORTED_MODULE_0__["getCookie"])('csrfToken');
    if (!csrfToken) csrfToken = window.__INITIAL_STATE__ && window.__INITIAL_STATE__.csrfToken;

    if(url.indexOf('?') === -1){
    	url = url + '?_csrf=' + csrfToken;
    }else{
    	url = url + '&_csrf=' + csrfToken;
    }

    if(csrfToken){
    	try{
    		headers['x-csrf-token'] = csrfToken;
    		Object(_cookie_helps__WEBPACK_IMPORTED_MODULE_0__["setCookie"])('csrfToken', csrfToken, 30*60);
    	}catch(e){
    		//TODO handle the exception
    		Object(_cookie_helps__WEBPACK_IMPORTED_MODULE_0__["setCookie"])('csrfToken', csrfToken, 30*60);
    	}
    }

    if(window.fetch){ //fetch方法存在

        const response = await myFetch({
            url,
            data,
            dataType,
            headers,
            method
        });

        if(response.status !== 200) {
        	return {errcode: '5000', description: `请求出错(${response.status})`};
        }else{
    		return await response.text().then((res) => {
    			if(dataType === 'json'){
    				try{
    					res = JSON.parse(res);
    					return res;
    				}catch(e){
    					return {errcode: 'jsonErr', description: '返回数据格式异常', data: res};
    				}
    			}else{
    				return res;
    			}
           	}).catch((error) => {
            	return {errcode: 'serverErr', description: error};
            });
        }
    }else{

        if(method === 'GET'){
            data = param(data);
        }else if(typeof data === 'object' && dataType === 'json'){
            data = JSON.stringify(data);
        }

        const resData = await myXhr({
            method,
            url,
            data,
            timeout,
            credentials,
            headers
        });

        return resData;
    }
}

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCookie", function() { return getCookie; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clearCookie", function() { return clearCookie; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setCookie", function() { return setCookie; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clearAllCookie", function() { return clearAllCookie; });

const getCookie = function(name){
	var nameEQ=name+'=';
	var str=document.cookie.split(';');

	for(var i=0;i<str.length;i++){
		var c=str[i];
		while(c.charAt(0)===' '){
			c=c.substring(1,c.length);
		}
		if(c.indexOf(nameEQ) === 0){
			return unescape(c.substring(nameEQ.length,c.length));
		}
	}
	return '';
}

const clearCookie = function(name) {
	setCookie(name, '', -1);
}

const setCookie = function(name, value, seconds, otherStr = '') {
	seconds = seconds || 0;
	var expires = "";
	if(seconds !== 0 ){
		var date = new Date();
		date.setTime(date.getTime()+(seconds*1000));
        expires = "; expires="+date.toGMTString();
        if (otherStr) {
            expires +='; ' + otherStr;
        }
	}
	document.cookie = name+"="+escape(value)+expires +"; path=/";
}

const clearAllCookie = function(){
	var strCookie = document.cookie;
	var arrCookie = strCookie.split("; ");

	for(var i=0,len = arrCookie.length;i<len;i++){ // 遍历cookie数组，处理每个cookie对
	    var arr = arrCookie[i].split("=");
	    if(arr.length>0){
	    	setCookie(arr[0],'',-1);
	    }
	}
}



/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "errcodeInfo", function() { return errcodeInfo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pwyFetch", function() { return pwyFetch; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "kdRequest", function() { return kdRequest; });
/* harmony import */ var _cookie_helps__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _kdRequest__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _tools__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6);




const defaultTimeout = 90000;

const errcodeInfo = {
    gatewayTimeout: {
        errcode: 'gatewayTimeout',
        description: '网关超时，请稍后再试!'
    },
    serverErr: {
        errcode: 'serverErr',
        description: '服务端异常, 请稍后再试！'
    },
    requestErr: {
        errcode: 'requestErr',
        description: '请求错误, 请检查网络或参数！'
    },
    timeoutErr: {
        errcode: 'timeoutErr',
        description: '请求超时, 请检查网络是否正常！'
    }
};


const createFetch = (url, options) => {
    return new Promise((resolve) => {
        const {dataType = 'json', method, headers={}, mode='cors', credentials='include', redirect = 'follow', body, onResponseProgress, callback } = options || {};
        const requestObj = {
            method,
            mode,
            credentials,
            redirect
        };

        const handler = (res) => {
			if(typeof callback === 'function'){
				callback(res)
			}else{
				resolve(res);
			}
        }

        const upperMethod = method.toUpperCase();

        if(dataType === 'json' || dataType === 'text'){
            requestObj.dataType = 'text';
        }

        requestObj.headers = headers;

        //GET请求不需要body参数
        if(upperMethod !== 'GET'){
            requestObj.body = body;
        }

        fetch(url, requestObj).then((response) => {
            if (response.status === 504) {
                handler(errcodeInfo.gatewayTimeout);
            } else if(response.status === 500) {
                handler(errcodeInfo.serverErr);
            } else if(response.status === 400 || response.status === 404) {
                handler(errcodeInfo.requestErr);
            } else {
                // 需要处理进度提示
                const handlerRes = (resText) => {
                    let res;
                    if(dataType === 'json') {
                        try {
                            res = JSON.parse(resText);
                        } catch (err1) {
                            Object(_tools__WEBPACK_IMPORTED_MODULE_2__["consoleLog"])(err1);
                            res = { ...errcodeInfo.serverErr };
                        }
                        handler(res);
                    } else {
                        handler(resText);
                    }
                }

                if (typeof onResponseProgress === 'function' && typeof TextDecoder === 'function') {
                    const reader = response.body.getReader();
                    const decoder = new TextDecoder();
                    let bytesReceived = 0;
                    let resText = '';
                    let conentLength = response.headers.get('content-length');
                    conentLength = parseInt(conentLength);
                    return reader.read().then(function processResult(result) {
                        if (result.done) {
                            onResponseProgress(bytesReceived, conentLength);
                            handlerRes(resText);
                            return;
                        }
                        bytesReceived += result.value.length;
                        resText += decoder.decode(result.value);
                        onResponseProgress(bytesReceived, conentLength);
                        return reader.read().then(processResult);
                    });
                } else {
                    response.text().then((resText) => {
                        handlerRes(resText);
                    }).catch ((err2) => {
                        Object(_tools__WEBPACK_IMPORTED_MODULE_2__["consoleLog"])(err2);
                        handler(errcodeInfo.requestErr);
                    });
                }
            }
        }).catch((err3) => {
            Object(_tools__WEBPACK_IMPORTED_MODULE_2__["consoleLog"])(err3);
            handler(errcodeInfo.requestErr);
        });
    })
}

const __createTimeoutFetch = async (url, options) => {
    return await Promise.race([
		createFetch(url, options),
		new Promise(function(resolve){
			setTimeout(()=> {
                const res = { ...errcodeInfo.timeoutErr };
                if (typeof options.callback === 'function') {
                    options.callback(res);
                } else {
                    resolve(res);
                }
            }, options.timeout || defaultTimeout)
		})
	]);
}


const __XMLHttpRequest = function(url, options){
	return new Promise((resolve) => {
		let xhr = new window.XMLHttpRequest();
		const { method = 'GET', body = null, dataType='json', headers, callback, onRequestProgress, onResponseProgress, onProgress } = options;

        const handler = (res) => {
			if(typeof callback === 'function'){
				callback(res)
			}else{
				resolve(res);
			}
        }

        const handlerOnProgress = (loaded = '', total = '') => {
            if (typeof onProgress === 'function') {
                try {
                    onProgress(xhr.readyState, xhr.status, loaded, total);
                } catch (error) {
                    Object(_tools__WEBPACK_IMPORTED_MODULE_2__["consoleLog"])(error);
                }

            }
        }

        handlerOnProgress();
        xhr.open(method, url, true);
        handlerOnProgress();
		xhr.ontimeout = () => {
            handler(errcodeInfo.timeoutErr);
            handlerOnProgress();
        };

        if (typeof onRequestProgress === 'function' || typeof onProgress === 'function') {
            xhr.upload.onprogress = (evt = {}) => {
                if (typeof onRequestProgress === 'function') {
                    try {
                        onRequestProgress(evt.loaded, evt.total);
                    } catch (error) {
                        Object(_tools__WEBPACK_IMPORTED_MODULE_2__["consoleLog"])(error);
                    }
                }
                handlerOnProgress(evt.loaded, evt.total);
            }
        }

        if (typeof onResponseProgress === 'function' || typeof onProgress === 'function' ) {
            xhr.onprogress = (evt = {}) => {
                if (typeof onResponseProgress === 'function') {
                    try {
                        onResponseProgress(evt.loaded, evt.total);
                    } catch (error) {
                        Object(_tools__WEBPACK_IMPORTED_MODULE_2__["consoleLog"])(error);
                    }
                }
                handlerOnProgress(evt.loaded, evt.total);
            }
        }

        xhr.onreadystatechange = () => {
            handlerOnProgress();
            const readyState = xhr.readyState;
            const status = xhr.status;
            if(readyState === 4 && status === 200) {
                const resText = xhr.responseText;
                let res;
                if(dataType === 'json') {
                    try {
                        res = JSON.parse(resText);
                    } catch (err1) {
                        Object(_tools__WEBPACK_IMPORTED_MODULE_2__["consoleLog"])(err1);
                        res = { ...errcodeInfo.serverErr };
                    }
                    handler(res);
                } else {
                    console && console.warn('xhr onreadystatechange resText', resText);
                    handler(resText);
                }
                xhr = null;
			}
        }

		xhr.onerror = (error) => {
			Object(_tools__WEBPACK_IMPORTED_MODULE_2__["consoleLog"])('xhr error: ', error);
            handler(errcodeInfo.requestErr);
            handlerOnProgress();
		};

		if(headers && headers['Content-Type']){
			xhr.setRequestHeader('Content-Type', headers['Content-Type']);
		}

		if(headers && headers['x-csrf-token']){
			xhr.setRequestHeader('x-csrf-token', headers['x-csrf-token']);
		}

		if(dataType === 'json'){
			xhr.responseType = 'text';
        }

		xhr.timeout = options.timeout || defaultTimeout;
		if(method.toLowerCase() === 'post'){
			xhr.send(body);
		}else{
			xhr.send(null);
        }
        handlerOnProgress();
	});
}

const __XDomainRequest = async function(url, options){
	const __innerXdr = new Promise((resolve) => {
		let xdr = new window.XDomainRequest();
		const { method = 'GET', body = null, callback, dataType = 'json' } = options;
		const handler = (res) => {
			if(typeof callback === 'function'){
				callback(res)
			}else{
				resolve(res);
			}
		}

		xdr.open(method, url);

		xdr.ontimeout = () => {
			handler(errcodeInfo.timeoutErr);
		};

		xdr.onerror =  (error) => {
			Object(_tools__WEBPACK_IMPORTED_MODULE_2__["consoleLog"])(error);
			handler(errcodeInfo.requestErr);
		};

		xdr.onload = () => {
            const resText = xhr.responseText;
            let res;
            if(dataType === 'json') {
                try {
                    res = JSON.parse(resText);
                } catch (err1) {
                    Object(_tools__WEBPACK_IMPORTED_MODULE_2__["consoleLog"])(err1);
                    res = { ...errcodeInfo.serverErr };
                }
                handler(res);
            } else {
                handler(resText);
            }
		}

		if(method.toLowerCase() === 'post'){
			xdr.send(body);
		}else{
			xdr.send(null);
		}
	});

	return await Promise.race([
		__innerXdr,
		new Promise((r) => {
			setTimeout(() => {
                const res = { ...errcodeInfo.timeoutErr };
                if (typeof callback === 'function') {
                    callback(res);
                } else {
                    r(res);
                }
            }, options.timeout || defaultTimeout)
		})
	])
}


const pwyFetch = async function(url, options) {
	const method = options.method || 'GET'
	let body =  options.data || options.body;
	const headers = options.headers || {};
	const upperMethod = method.toUpperCase();
    const contentType = options.contentType || 'json';

    if(contentType === 'json') {
        headers['Content-Type'] = 'application/json; charset=UTF-8';
    }

    let csrfToken = Object(_cookie_helps__WEBPACK_IMPORTED_MODULE_0__["getCookie"])('csrfToken');
    if (!csrfToken) csrfToken = window.__INITIAL_STATE__ && window.__INITIAL_STATE__.csrfToken;

    if (url.indexOf('?') === -1) {
        url = url + '?_csrf=' + csrfToken;
    } else {
        url = url + '&_csrf=' + csrfToken;
    }

    if (csrfToken) {
        try {
            headers['x-csrf-token'] = csrfToken;
            Object(_cookie_helps__WEBPACK_IMPORTED_MODULE_0__["setCookie"])('csrfToken', csrfToken, 30 * 60);
        } catch (e) {
            //TODO handle the exception
            Object(_cookie_helps__WEBPACK_IMPORTED_MODULE_0__["setCookie"])('csrfToken', csrfToken, 30 * 60);
        }
    }

    options = {...options, headers, body };

	if(upperMethod === 'GET'){
		//GET禁止缓存
        if (typeof options.disabledCache === 'undefined' || options.disabledCache === false) {
            if(url.indexOf('?') === -1){
                url = url+'?random=' + Math.random();
            }else{
                url = url+'&random=' + Math.random();
            }
        }

		if(body && typeof body === 'object'){
			body = Object(_kdRequest__WEBPACK_IMPORTED_MODULE_1__["param"])(body, true); //GET参数编码处理，并拼装到URl
			if(body){
				url +='&' + body;
			}
		}
	}

	if(upperMethod === 'POST' && body && typeof body === 'object' && contentType === 'json') {
		options = {...options, body: JSON.stringify(body)};
	}

	let res;
	if(window.fetch && !options.onRequestProgress && !options.disabledFetch && !options.onProgress) { // fetch不支持上传进度，但支持下载进度回调
        res = __createTimeoutFetch(url, options);
	}else if(window.XMLHttpRequest) {
		res = await __XMLHttpRequest(url, options);
	}else if(window.XDomainRequest){
		res = await __XDomainRequest(url, options);
    }
    return res;
}

//兼容以前的版本
async function kdRequest({
	method = 'GET',
	url = '',
	data = {},
	timeout = 90000,
	dataType = 'json', //返回的数据格式
	headers = {'Content-Type': 'application/json'}
}) {
	return await pwyFetch(url, {body: data, headers, timeout, dataType, method: method.toUpperCase()});
}

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getInvoiceTypeName", function() { return getInvoiceTypeName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "checkInvoiceTitle", function() { return checkInvoiceTitle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "checkInvoiceTin", function() { return checkInvoiceTin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getInvoiceQrInfo", function() { return getInvoiceQrInfo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getInvoiceQrInfoNew", function() { return getInvoiceQrInfoNew; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "blobToFile", function() { return blobToFile; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "downloadFile", function() { return downloadFile; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getUUId", function() { return getUUId; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "consoleLog", function() { return consoleLog; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isInVisualArea", function() { return isInVisualArea; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getInvoiceErrInfo", function() { return getInvoiceErrInfo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "readAsBinaryString", function() { return readAsBinaryString; });
/* harmony import */ var _kdRequest__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _cookie_helps__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var _piaozone_com_pwyConstants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7);
/* harmony import */ var _piaozone_com_pwyConstants__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_piaozone_com_pwyConstants__WEBPACK_IMPORTED_MODULE_2__);





const INPUT_INVOICE_TYPES_DICT = _piaozone_com_pwyConstants__WEBPACK_IMPORTED_MODULE_2__["invoiceTypes"].INPUT_INVOICE_TYPES_DICT;
/**
 * @description 根据发票类型获取发票的中文名称
 * @param {int} i 发票类型
 * @returns {string} 如果未匹配到任何发票，返回'--'
 */
const getInvoiceTypeName = function(i){
	const dict = {
		'k1': '普通电子发票',
		'k2': '电子发票专票',
		'k3': '普通纸质发票',
		'k4': '专用纸质发票',
		'k5': '普通纸质卷式发票',
		'k7': '通用机打票',
		'k8': '的士票',
		'k9': '火车票',
		'k10': '飞机票',
		'k11': '其他票',
		'k12': '机动车发票',
		'k13': '二手车发票',
		'k14': '定额发票',
		'k15': '通行费电子发票',
		'k16': '客运发票',
    	'k17': '过路过桥费'
	}

	return dict['k'+i] || '--';
}


/**
 * @description	检测采集的发票抬头和企业名称是否一致
 * @param {int} fplx 发票类型，int类型
 * @param {string} invoiceGhf_mc 发票的购方名称
 * @param {string} ghf_mc 购方企业名称
 * @param {string} checkMode 校验模式，严格或简单模式：strict, simple（少于6个字符的发票抬头默认抬头一致）
 * @returns {int} 1、发票抬头和企业抬头一致, 2、发票抬头和企业抬头不一致 3、该票种不需要校验发票抬头
 *
 */
const checkInvoiceTitle = function(fplx, invoiceGhf_mc='', ghf_mc='', checkMode='simple'){

	//需要校验发票抬头的发票类型
	const checkInvoiceTypes = [
		1, //普通电子发票
		3, //普通纸质发票
		4, //专用纸质发票
		5, //普通纸质卷票
		15 //通行费
	];

	const filterReg = /[^A-Za-z0-9\u4e00-\u9fa5]/g;

	if(checkInvoiceTypes.indexOf(parseInt(fplx)) !== -1){
		invoiceGhf_mc = invoiceGhf_mc.replace(filterReg, '').trim();
		ghf_mc = ghf_mc.replace(filterReg, '').trim();

		if(checkMode === 'strict'){
			if(invoiceGhf_mc === ghf_mc){
				return 1; //发票抬头和企业抬头一致
			}else{
				return 2; //发票抬头和企业抬头不一致
			}
		}else if(checkMode === 'simple'){
			if(invoiceGhf_mc.length <6 || invoiceGhf_mc === ghf_mc){
				return 1;
			}else{
				return 2;
			}
		}
	}else{
		return 3; //该票种不需要校验发票抬头
	}

}

/**
 * @description	检测企业采集的发票是否和企业税号一致
 * @param {int} fplx 发票类型
 * @param {string} invoiceGhf_tin 发票的购货方税号
 * @param {string} ghf_tin 企业税号
 * @param {string} checkMode 校验模式，严格或简单模式：strict, simple（少于6个字符的发票抬头不做税号校验）
 * @returns {int} 1、发票购方税号和企业税号一致，2、发票购方税号和企业税号不一致，3、该票种不需要校验发票购方税号
 */
const checkInvoiceTin = function(fplx, invoiceGhf_tin='', ghf_tin='', invoiceGhf_mc='', checkMode='simple'){
	//需要校验发票税号的发票类型
	const checkInvoiceTypes = [
		1, //普通电子发票
		3, //普通纸质发票
		4, //专用纸质发票
		5, //普通纸质卷票
		15 //通行费
	];

	const filterReg = /[^A-Za-z0-9\u4e00-\u9fa5]/g;

	if(checkInvoiceTypes.indexOf(parseInt(fplx)) !== -1){
		if(checkMode === 'strict'){
			if(invoiceGhf_tin === ghf_tin){
				return 1; //发票购方税号和企业税号一致
			}else{
				return 2; //发票购方税号和企业税号不一致
			}
		}else if(checkMode === 'simple'){
			invoiceGhf_mc = invoiceGhf_mc.replace(filterReg, '').trim();
			if(invoiceGhf_mc.length <6 || invoiceGhf_tin === ghf_tin){
				return 1;
			}else{
				return 2; //发票购方税号和企业税号不一致
			}
		}

	}else{
		return 3; //该票种不需要校验发票购方税号
	}
}

/**
 * @description 解析发票二维码中的关键字段
 * @param {string} qrStr 扫描发票二维码获取到的字符串
 * @returns {object|false} 如果能够正常界面二维码中发票数据，返回object, 否则返回false
 */
const getInvoiceQrInfo = function(qrStr){
	var fpInfo = qrStr.replace(/[，]/g, ',').split(',');
	try{
		var fpdm = fpInfo[2];
		var fphm = fpInfo[3];
		var kprq = fpInfo[5];
		var amount = fpInfo[4];
		var jym = fpInfo[6].substr(-6);
		if(!fpdm || !fphm || !kprq){ //二维码数据格式有误
			return false;
		}else{
			return fpInfo = {
				fpdm: fpdm,
				fphm: fphm,
				kprq: kprq,
				amount: amount,
				jym: jym
			};
		}
	}catch(e){
	   return false;
	}
}

/**
 *获取地址后的参数
 */
function urlSearch(search = '') {
    search = search.replace('?', '&');
    if (typeof search !== "string" || !search) return search;
    return search.split("&").reduce((res, cur) => {
        const arr = cur.split("=");
        return Object.assign({ [arr[0]]: arr[1] }, res);
    }, {})
}

//根据发票代码判断专票或普票
function checkInvoiceType(fpdm) {
    const last3Str = fpdm.substr(fpdm.length - 3);
    const last2Str = fpdm.substr(fpdm.length - 2);
    const firstStr = fpdm.substr(0, 1);
    const eighthStr = fpdm.substr(7, 1);
    const sixthStr = fpdm.substr(5, 1);
    if (fpdm.length == '10') {
        if (last3Str === '130' || last3Str === '140' || last3Str === '160' || last3Str === '170') {
            return 4; //专票
        } else {
            return 3
        }
    } else {
        if (fpdm.length == 12) {
            if (firstStr == '0' && last2Str == '12') {
                return 15; //通行费
            }
            if (firstStr == '0' && last2Str == '11') {
                return 1; //电普票
            }
            if (firstStr == '0' && last2Str == '06') {
                return 5; //卷式
            }
            if (firstStr == '0' && last2Str == '07') {
                return 5; //卷式
            }
            if (firstStr == '0' && last2Str == '17') { //二手车发票
                return 13;
            }
            if (sixthStr == '1' || sixthStr == '2') {
                if (eighthStr == '2') { //机动车销售票
                    return 12;
                }
            }
            if (firstStr == '0' && last2Str == '13') {
                return 2; //电专票
            }
        }
    }
    return 3
}

const getInvoiceQrInfoNew = function(qrStr) { //最新处理扫码抢扫二维码
    if (qrStr.indexOf('https' || false) > -1 && qrStr.indexOf('?')) {
        const { bill_num = '', total_amount = '', hash = '' } = urlSearch(qrStr);
        if (bill_num != '' && total_amount != '' && hash != '') {//新型区块链电子票
            return { errcode: '0000', qrcodeType: 'web', data: { bill_num, total_amount, hash }, description: '成功' };
        } else {
            return { errcode: 'fail', qrcodeType: 'web', description: '请扫描发票（电，普，专）' };
        }
    } else {
        var fpInfo = qrStr.replace(/[，]/g, ',').split(',');
        try {
            const index = fpInfo[6].indexOf('20');
            const fpdm = fpInfo[2];
            const fphm = fpInfo[3];
            if (fpInfo[6].length == 8 && index == 0) {//区块链电子发票
                const kprq = fpInfo[6];
                const amount = fpInfo[5];
                const jym = fpInfo[7].substr(-5);
                return { errcode: '0000', qrcodeType: 'string', data: { fpdm, fphm, kprq, amount, jym }, description:'成功' }
            } else {
                const kprq = fpInfo[5];
                const amount = fpInfo[4];
                const jym = fpInfo[6].substr(-6);
                if (!fpdm || !fphm || !kprq) { //二维码数据格式有误
                    return { errcode: 'fail', qrcodeType: 'string', description: '请扫描发票（电，普，专）' };
                } else {
                    if (amount == '' && jym == '') {
                        return { errcode: 'fail', description: '请扫描发票（电，普，专）' };
                    }else{
                        const fplxArr = [1, 2, 3, 4, 15];
                        const fplx = checkInvoiceType(fpdm);
                        if (fplxArr.indexOf(fplx) == '-1') {
                            return { errcode: 'fail', description: '请扫描发票（电，普，专）' };
                        } else {
                            return { errcode: '0000', qrcodeType: 'string', data: { fpdm, fphm, kprq, amount, jym }, description:'成功' }
                        }
                    }
                }
            }
        } catch (e) {
            return { errcode: 'fail', description: '请扫描发票（电，普，专）' };
        }
    }
};

/**
 * @description 将blob数据转换为file对象
 * @param {blob} blobData 需要转换的blob数据
 * @param {string}} filename 转换后的文件名称
 */
const blobToFile = function(blobData, filename) {
    const nameArr = filename.split('.');
    const ext = nameArr[nameArr.length - 1];
    let type = 'image/jpeg';
    if (ext === 'png') {
        type = 'image/png';
    } else if (ext === 'bmp') {
        type = 'image/bmp';
    } else if (ext === 'jpg') {
        type = 'image/jpeg';
    } else if(ext === 'pdf') {
        type = 'application/pdf';
    } else {
        type = 'application/octet-stream';
    }

    if (window.File && typeof window.File === 'function') {
        const targetFile = new window.File([blobData], filename, { type: type });
        return targetFile;
    } else {
        return false;
    }
}


/**
 * @description 通过XMLHttpRequest方式处理下载，要求支持XMLHttpRequest、blob、FileReader
 * @param { string } url 请求的路径
 * @param { string } key 请求的数据key
 * @param { string|object } data 请求的数据, 支持string和object
 * @param { string } method 请求的方法，默认post
 * @param { function } startCallback 开始下载前的回调
 * @param { function } endCallback 请求完成结束后的回调，如果有失败可以根据返回的json提示
 */
const downloadFileXhr = function({ url, key = 'downloadParams', data = {}, method = 'POST', startCallback, endCallback, timeout = 60000 }) {
    method = method.toLocaleLowerCase();
    startCallback();

    const myEndCallback = (res) => {
        Object(_cookie_helps__WEBPACK_IMPORTED_MODULE_1__["clearCookie"])('downloadResult');
        typeof endCallback === 'function' && endCallback(res);
    };

    const xhr = new window.XMLHttpRequest();

    let csrfToken = Object(_cookie_helps__WEBPACK_IMPORTED_MODULE_1__["getCookie"])('csrfToken');
    if (!csrfToken) csrfToken = window.__INITIAL_STATE__ && window.__INITIAL_STATE__.csrfToken;

    if(url.indexOf('?') === -1){
    	url = url + '?_csrf=' + csrfToken;
    }else{
    	url = url + '&_csrf=' + csrfToken;
    }

    if (method === 'get') url += '&' + Object(_kdRequest__WEBPACK_IMPORTED_MODULE_0__["param"])(data);

    xhr.open(method, url, true);
    xhr.responseType = 'blob'; // 返回类型blob
    xhr.setRequestHeader('Content-Type', 'application/json');
    if (csrfToken) {
        try {
            xhr.setRequestHeader('x-csrf-token', csrfToken);
            Object(_cookie_helps__WEBPACK_IMPORTED_MODULE_1__["setCookie"])('csrfToken', csrfToken, 30 * 60);
        } catch (e) {
            //TODO handle the exception
            Object(_cookie_helps__WEBPACK_IMPORTED_MODULE_1__["setCookie"])('csrfToken', csrfToken, 30 * 60);
        }
    }
    xhr.timeout = timeout; // 超时时间，单位是毫秒
    xhr.onerror = () => {
        myEndCallback({ errcode: '5000', description: '服务端异常，请稍后再试' });
    };

    xhr.ontimeout = () => {
        myEndCallback({ errcode: '5004', description: '请求超时，请稍后再试' });
    };

    xhr.onload = () => {
        if (xhr.status === 200) {
            const blob = xhr.response;
            const ctype = xhr.getResponseHeader('Content-Type');
            if (ctype.indexOf('text/html') !== -1) {
                myEndCallback({ errcode: '5000', description: '服务端异常，请稍后再试' });
            } else if (ctype.indexOf('application/json') !== -1) {
                const reader = new window.FileReader();
                reader.onload = function() {
                    let content = reader.result;//内容就在这里
                    try {
                        content = JSON.parse(content);
                    } catch (error) {
                        content = { errcode: '5000', description: '服务端异常，请稍后再试' };
                        console.error(error);
                    }
                    myEndCallback(content);
                };
                reader.readAsText(blob);
            } else {
                const disposition = xhr.getResponseHeader('Content-Disposition');

                const dispositionArr = disposition.replace(/\s/g, '').split(';');
                const dispositionObj = {};
                for(let i = 0, len = dispositionArr.length; i < len; i++){
                    const param = dispositionArr[i].split('=');
                    let temValue = '';
                    if (param[1]) temValue = param[1].replace(/^"/, '').replace(/"$/, '');
                    dispositionObj[param[0]] = temValue;
                }
                const filename = (dispositionObj['filename*'] || dispositionObj.filename || 'file');

                if (navigator.msSaveOrOpenBlob) {
                    navigator.msSaveOrOpenBlob(new Blob([blob]), filename);
                } else {
                    const eleLink = document.createElement('a');
                    eleLink.download = decodeURIComponent(filename);
                    eleLink.style.display = 'none';
                    eleLink.href = URL.createObjectURL(new Blob([blob]));
                    document.body.appendChild(eleLink);
                    eleLink.click();
                    document.body.removeChild(eleLink);
                }
                myEndCallback({ errcode: '0000', description: '下载成功' });
            }
        } else {
            myEndCallback({ errcode: '5000', description: '请求异常，请稍后再试' });
        }
    };

    if (method === 'post') {
        const dataStr = JSON.stringify(data);
        const newData = {};
        newData[key] = dataStr;
        xhr.send(JSON.stringify(newData));
    } else {
        xhr.send();
    }
};


/**
 *
 * @param { string } url 请求的路径
 * @param { string } key 请求的数据key, 默认downloadParams，post发送数据时将会以这个key发送数据给后台，get无关
 * @param { string|object } data 请求的数据, 支持string和object
 * @param { string } method 请求的方法，默认post
 * @param { function } startCallback 开始下载前的回调
 * @param { function } endCallback 请求完成结束后的回调，如果有失败可以根据返回的json提示
 * 可以选择前端的处理方式，默认为form形式选择，兼容性好一些，当浏览器不支持blob等对象时会自动选择form形式，还支持直接form形式（兼容性更好）
 * 注意form形式需要后台配合处理成功后写入cookie: downloadResult=1, 不成功则不需要处理，
 * node层可以参考发票管理中心publicDownload中间件
 * @param { string} downloadType 选择前端的处理方式，xhr|form
 * @param { number } timeout 超时设置
 */

const downloadFile = function(opt) {
    const { url, key = 'downloadParams', data = {}, method = 'POST', startCallback, endCallback, downloadType = 'xhr', timeout = 60000 } = opt;
    if (window.XMLHttpRequest && window.Blob && window.FileReader && downloadType === 'xhr') {
        downloadFileXhr(opt);
    } else {
        startCallback();
        const iframeId = 'tempDownloadIframe' + (+new Date());
        const formId = 'tempFormId_' + (+new Date());
        Object(_cookie_helps__WEBPACK_IMPORTED_MODULE_1__["clearCookie"])('downloadResult');
        const myEndCallback = (res) => {
            const iframEl = document.getElementById(iframeId);
            const formEl = document.getElementById(formId);
            Object(_cookie_helps__WEBPACK_IMPORTED_MODULE_1__["clearCookie"])('downloadResult');
            iframEl.innerHTML = '';
            iframEl.parentNode.removeChild(iframEl);
            formEl.parentNode.removeChild(formEl);
            typeof endCallback === 'function' && endCallback(res);
        };

        const checkStatus = (startTime) => {
            if (((+new Date()) - startTime) > timeout) {
                myEndCallback({ errcode: '5004', description: '请求超时，请稍后再试！' });
            } else {
                let result = Object(_cookie_helps__WEBPACK_IMPORTED_MODULE_1__["getCookie"])('downloadResult');
                if (result) {
                    if (result === '1') {
                        myEndCallback({ errcode: '0000', description: '下载成功' });
                    } else {
                        result = JSON.parse(unescape(result));
                        myEndCallback(result);
                    }
                } else {
                    setTimeout(function () {
                        checkStatus(startTime);
                    }, 1000);
                }
            }
        };
        const iframe = document.createElement('iframe');
        iframe.id = iframeId;
        iframe.name = iframeId;
        iframe.enctype = 'application/x-www-form-urlencoded';
        iframe.style.display = 'none';
        document.body.appendChild(iframe);
        const formEl = document.createElement('form');
        formEl.id = formId;
        formEl.target = iframeId;
        formEl.style.display = 'none';
        formEl.method = method;
        formEl.action = url;
        const inputEl = document.createElement('input');
        inputEl.type = 'hidden';
        inputEl.name = key;
        inputEl.value = typeof data === 'object' ? JSON.stringify(data) : data;
        formEl.appendChild(inputEl);
        document.body.appendChild(formEl);
        formEl.submit();
        checkStatus(+new Date());
    }
};

const getUUId = () => {
    let d = new Date().getTime();
    const uuid = 'xxxxxxxxxxxxxxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
};

// 日志打印
const consoleLog = (tip, level = 'error', title='') => {
    if (typeof window.console === 'object') {
        if (level === 'error') {
            if (title) {
                window.console.error(title, tip);
            } else {
                window.console.error(tip);
            }
        } else if (level === 'warn'){
            if (title) {
                window.console.warn(title, tip);
            } else {
                window.console.warn(tip);
            }
        } else {
            if (title) {
                window.console.log(title, tip);
            } else {
                window.console.log(tip);
            }
        }
    }
}

// 校验指定class元素是否在地址显示区域类，可以用于动态懒加载图像等
const isInVisualArea = (elCls, pObj) => {
    const items = pObj.getElementsByClassName(elCls);
    const boxInfo = pObj.getBoundingClientRect();
    const { top, left, bottom, right } = boxInfo;
    const result = [];
    for (let i = 0; i < items.length; i++) {
        const itemInfo = items[i].getBoundingClientRect();
        // 只要有部分区域在指定区域内，则认为应该显示
        if (itemInfo.top >= top && itemInfo.left >= left && itemInfo.top <= bottom && itemInfo.left <= right) {
            result.push(true);
        } else {
            result.push(false);
        }
    }
    return result;
};


// 校验发票的校验信息
const getInvoiceErrInfo = function(invoice) {
    const waringResult = [];
    const errorResult = [];

    const invoiceStatusDict = {
        k1: '该发票已失控',
        k2: '该发票已作废',
        k3: '该发票已红冲',
        k4: '该处于异常状态'
    };

    const {
        invoiceType,
        invoiceStatus,
        // 红色提醒字段
        checkStatus, // 查验状态1：通过，2，不通过，3：未查验
        isNotEqualTaxNo, // 税号不一致
        isNotEqualBuyerName, // 抬头不一致
        repeatBx, // 1、非重复报销；2、是重复报销
        isBlacklist, // 1、非黑名单；2、是黑名单
        // 黄色提醒字段
        isSensitiveWords, // 1、非敏感词；2、是敏感词
        // isContinuousNumber, // 1、非连号发票；2、是连号发票
        continuousNos = [], // 1、非连号发票；2、是连号发票
        warningCode = '', //1.正常；2.疑似旧的监制章发票；3.疑似串号
        isOverdueInvoice,  //1、非发票过期；2、是发票过期
        isRevise // 非增票手动修改：1、未修改；2、已修改
    } = invoice;

    const invoiceTypeInfo = INPUT_INVOICE_TYPES_DICT['k' + invoiceType] || {};
    if (invoiceTypeInfo.isAddedTax) {
        if(parseInt(checkStatus) === 2) {
            errorResult.push('查验数据不相符！');
        } else if(parseInt(checkStatus) === 3) {
            errorResult.push('发票还未进行查验！');
        }

        if (invoiceStatusDict['k' + invoiceStatus]) {
            errorResult.push(invoiceStatusDict['k' + invoiceStatus]);
        }
    }

    if (isNotEqualTaxNo) {
        errorResult.push('企业税号与发票购方税号不一致！');
    }

    if (isNotEqualBuyerName) {
        errorResult.push('企业抬头与发票抬头不一致！');
    }

    if (repeatBx === 2) {
        errorResult.push('发票重复报销！');
    }

    if (isBlacklist === 2) {
        errorResult.push('该发票在黑名单中！');
    }

    if (isSensitiveWords === 2) {
        waringResult.push('发票中包含敏感词！');
    }

    if (continuousNos && continuousNos.length > 0) {
        // 的士票连号提示
        if (parseInt(invoiceType) === 8) {
            waringResult.push('的士票连号，连号号码' + continuousNos.join(','));
        }
    }

    const warningCodeArr = warningCode.split(',');
    // if (warningCodeArr.indexOf('2') !== -1) {
    //    waringResult.push('疑似旧的监制章发票！');
    // }
    if (warningCodeArr.indexOf('3') !== -1) {
        waringResult.push('疑似串号发票！');
    }

    if (isOverdueInvoice === 2) {
        waringResult.push('该发票已过期！');
    }

    if (isRevise === 2) {
        waringResult.push('手工修改过发票字段！');
    }

    return {
        errorResult,
        waringResult
    };
}

// 已二进制方式读取文件
const readAsBinaryString = (file) => {
    return new Promise((resolve) => {
        const reader = new FileReader();
        if (typeof FileReader.prototype.readAsBinaryString === 'function') {
            reader.onload = function (e) {
                resolve(reader.result);
            }
            reader.onerror = function() {
                resolve(null);
            }
            reader.readAsBinaryString(file);
        } else { // ie版本没有原生的方法，通过readAsArrayBuffer兼容
            let binary = '';
            reader.onload = function (e) {
                var bytes = new Uint8Array(reader.result);
                var length = bytes.byteLength;
                for (var i = 0; i < length; i++) {
                    binary += String.fromCharCode(bytes[i]);
                }
                resolve(binary);
            }
            reader.onerror = function() {
                resolve(null);
            }
            reader.readAsArrayBuffer(file);
        }
    });
}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

const invoiceEditInfo = __webpack_require__(8);
const invoiceTypes = __webpack_require__(10);
const selectSource = __webpack_require__(9);
const invoiceStatus = __webpack_require__(11);
const warningCodesInfo = __webpack_require__(12);

module.exports = {
    invoiceEditInfo,
    invoiceTypes,
    selectSource,
    invoiceStatus,
    waringCodes: warningCodesInfo.waringCodes,
    getWaringCodesResult: warningCodesInfo.getWaringCodesResult
}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

const { trainSeatSelectSource, airSeatSelectSource, currencySelectSource } = __webpack_require__(9);

// 禁止选择的日期
const disabledDate = (d) => {
    return moment(d.format('YYYY-MM-DD')).format('X') > moment().format('X');
};

// 字符串长度最长控制
const maxStringLength = 50;
const bigStringLength = 200;

// 增值税发票,通过校验码查验
const invoiceAdded1 = [
    { title: '发票代码', dataIndex: 'invoiceCode', type: 'string', maxLength: 12, required: true },
    { title: '发票号码', dataIndex: 'invoiceNo', type: 'string', maxLength: 10, required: true },
    { title: '开票日期', dataIndex: 'invoiceDate', type: 'date', disabledDate, required: true },
    { title: '校验码后六位', dataIndex: 'checkCode', type: 'string', maxLength: 6, required: true } // 注意区块链发票类型是1，校验码为5位
];

// 增值税发票,通过不含税金额查验
const invoiceAdded2 = [
    { title: '发票代码', dataIndex: 'invoiceCode', type: 'string', maxLength: 12, required: true },
    { title: '发票号码', dataIndex: 'invoiceNo', type: 'string', maxLength: 10, required: true },
    { title: '开票日期', dataIndex: 'invoiceDate', type: 'date', disabledDate, required: true },
    { title: '不含税金额', dataIndex: 'invoiceAmount', type: 'number', required: true }
];

// 飞机票
const airBill = [
    { title: '电子客票号', dataIndex: 'electronicTicketNum', type: 'string', maxLength: maxStringLength, required: true },
    { title: '身份证号码', dataIndex: 'customerIdentityNum', type: 'string', maxLength: 18, required: true },
    { 
        title: '行程', 
        subCols: [
            { title: '开始行程', dataIndex: 'placeOfDeparture', type: 'string', maxLength: maxStringLength, required: true },
            { title: '结束行程', dataIndex: 'destination', type: 'string', maxLength: maxStringLength, required: true }
        ]
    },
    { title: '票价', dataIndex: 'invoiceAmount', type: 'number', required: true },
    { title: '顾客姓名', dataIndex: 'customerName', type: 'string', maxLength: maxStringLength, required: true },    
    { title: '乘机日期', dataIndex: 'invoiceDate', type: 'date', disabledDate, required: true },
    { title: '航班号', dataIndex: 'flightNum', type: 'string', maxLength: maxStringLength },
    { title: '机场建设费', dataIndex: 'airportConstructionFee', type: 'number' },
    { title: '燃油附加费', dataIndex: 'fuelSurcharge', type: 'number' },
    { title: '印刷序列号', dataIndex: 'printNum', type: 'string', maxLength: maxStringLength },
    { title: '座位等级', dataIndex: 'seatGrade', type: 'select', selectSource: airSeatSelectSource}
];

// 通用机打
const generalMachineBill = [
    { title: '发票代码', dataIndex: 'invoiceCode', type: 'string', maxLength: 12, required: true },
    { title: '发票号码', dataIndex: 'invoiceNo', type: 'string', maxLength: 10, required: true },
    { title: '开票日期', dataIndex: 'invoiceDate', type: 'date', disabledDate, required: true },
    { title: '合计金额', dataIndex: 'totalAmount', type: 'number', required: true },
    { title: '销方名称', dataIndex: 'salerName', type: 'string', maxLength: bigStringLength },
    { title: '销方税号', dataIndex: 'salerTaxNo', type: 'string', maxLength: maxStringLength },
    { title: '购方名称', dataIndex: 'buyerName', type: 'string', maxLength: bigStringLength }
];

// 其它发票
const otherBill = [
    { title: '金额', dataIndex: 'totalAmount', type: 'number', required: true },
    { title: '备注', dataIndex: 'salerName', type: 'string', maxLength: bigStringLength, required: true },
    { title: '发票代码', dataIndex: 'invoiceCode', type: 'string', maxLength: 12},
    { title: '发票号码', dataIndex: 'invoiceNo', type: 'string', maxLength: 10 },
    { title: '开票日期', dataIndex: 'invoiceDate', type: 'date', disabledDate }    
];

// 购置税发票
const purchaseTaxBill = [
    { title: '纳税人识别号', dataIndex: 'buyerTaxNo', type: 'string', maxLength: maxStringLength, required: true },
    { title: '完税证明号码', dataIndex: 'taxPaidProofNo', type: 'string', maxLength: maxStringLength, required: true },
    { title: '填发日期', dataIndex: 'invoiceDate', type: 'date', disabledDate, required: true },
    { title: '税务机关名称', dataIndex: 'taxAuthorityName', type: 'string', maxLength: bigStringLength, required: true },
    { title: '金额', dataIndex: 'totalAmount', type: 'number', required: true }
];

// 定额发票
const quotaBill = [
    { title: '发票代码', dataIndex: 'invoiceCode', type: 'string', maxLength: 12, required: true },
    { title: '发票号码', dataIndex: 'invoiceNo', type: 'string', maxLength: 10, required: true },    
    { title: '金额', dataIndex: 'totalAmount', type: 'number', required: true },
    { title: '所在地', dataIndex: 'place', type: 'string', maxLength: maxStringLength, required: true }
];

// 过路过桥
const roadBridgeBill = [
    { title: '发票代码', dataIndex: 'invoiceCode', type: 'string', maxLength: 12},
    { title: '发票号码', dataIndex: 'invoiceNo', type: 'string', maxLength: 10, required: true },
    { title: '开票日期', dataIndex: 'invoiceDate', type: 'date', disabledDate, required: true },
    { title: '金额', dataIndex: 'totalAmount', type: 'number', required: true },
    { title: '入口', dataIndex: 'entrance', type: 'string', maxLength: maxStringLength },
    { title: '出口', dataIndex: 'exit', type: 'string', maxLength: maxStringLength, required: true },
    { title: '时间', dataIndex: 'time', type: 'time' },
    { title: '所在地', dataIndex: 'place', type: 'string', maxLength: maxStringLength }
];

// 轮船票
const shipBill = [
    { title: '发票代码', dataIndex: 'invoiceCode', type: 'string', maxLength: 12, required: true},
    { title: '发票号码', dataIndex: 'invoiceNo', type: 'string', maxLength: 10, required: true },
    { title: '乘船人', dataIndex: 'passengerName', type: 'string', maxLength: maxStringLength, required: true },
    { title: '乘船日期', dataIndex: 'invoiceDate', type: 'date', disabledDate, required: true },    
    { title: '出发地', dataIndex: 'stationGetOn', type: 'string', maxLength: maxStringLength },
    { title: '到达地', dataIndex: 'stationGetOff', type: 'string', maxLength: maxStringLength, required: true },
    { title: '金额', dataIndex: 'totalAmount', type: 'number', required: true },    
    { title: '币别', dataIndex: 'currency', type: 'select', selectSource: currencySelectSource }
];


// 的士票
const taxBill = [
    { title: '发票代码', dataIndex: 'invoiceCode', type: 'string', maxLength: 12, required: true},
    { title: '发票号码', dataIndex: 'invoiceNo', type: 'string', maxLength: 10, required: true },
    { title: '乘车日期', dataIndex: 'invoiceDate', type: 'date', disabledDate, required: true },
    { title: '金额（含税）', dataIndex: 'totalAmount', type: 'number', required: true },
    { title: '所在地', dataIndex: 'place', type: 'string', maxLength: maxStringLength, required: true },
    { title: '打车里程', dataIndex: 'mileage', type: 'number' },    
    { title: '上车时间', dataIndex: 'timeGetOn', type: 'time' },
    { title: '下车时间', dataIndex: 'timeGetOff', type: 'time' }
];

// 客运票
const trafficBill = [
    { title: '发票代码', dataIndex: 'invoiceCode', type: 'string', maxLength: 12, required: true},
    { title: '发票号码', dataIndex: 'invoiceNo', type: 'string', maxLength: 10, required: true },
    { title: '日期', dataIndex: 'invoiceDate', type: 'date', disabledDate, required: true },
    { title: '票价', dataIndex: 'totalAmount', type: 'number', required: true },
    { title: '出发站', dataIndex: 'stationGetOn', type: 'string', maxLength: maxStringLength, required: true },
    { title: '到达站', dataIndex: 'stationGetOff', type: 'string', maxLength: maxStringLength, required: true },
    { title: '姓名', dataIndex: 'passengerName', type: 'string', maxLength: maxStringLength, required: true },
    { title: '时间', dataIndex: 'timeGetOn', type: 'time' },
    { title: '币别', dataIndex: 'currency', type: 'select', selectSource: currencySelectSource }
];


// 高铁票
const trainBill = [
    { title: '姓名', dataIndex: 'passengerName', type: 'string', maxLength: maxStringLength, required: true},
    { title: '车次', dataIndex: 'trainNum', type: 'string', maxLength: maxStringLength, required: true },    
    { title: '印刷序号', dataIndex: 'printingSequenceNo', type: 'string', maxLength: maxStringLength, required: true },
    { title: '乘车日期', dataIndex: 'invoiceDate', type: 'date', disabledDate, required: true },    
    { title: '金额（含税）', dataIndex: 'totalAmount', type: 'number', required: true },
    { 
        title: '行程', 
        subCols: [
            { title: '开始行程', dataIndex: 'stationGetOn', type: 'string', maxLength: maxStringLength, required: true },
            { title: '结束行程', dataIndex: 'stationGetOff', type: 'string', maxLength: maxStringLength, required: true }
        ]
    },    
    { title: '座位等级', dataIndex: 'currency', type: 'select', selectSource: trainSeatSelectSource }
];

module.exports = {
    k1: invoiceAdded1,
    k3: invoiceAdded1,
    k4: invoiceAdded2,
    k5: invoiceAdded1,
    k12: invoiceAdded2,
    k13: invoiceAdded2,
    k15: invoiceAdded1,
    k7: generalMachineBill,
    k8: taxBill,
    k9: trainBill,
    k10: airBill,
    k14: quotaBill,
    k16: trafficBill,
    k17: roadBridgeBill,
    k19: purchaseTaxBill,
    k20: shipBill,
    k23: generalMachineBill,
    k11: otherBill
}

/***/ }),
/* 9 */
/***/ (function(module, exports) {

const trainSeatSelectSource = ['二等座', '一等座', '特等座', '商务座', '无座'];
const airSeatSelectSource = [{
    value: 'F',
    text: '头等舱'
}, {
    value: 'C',
    text: '公务舱（商务舱）'
}, {
    value: 'Y',
    text: '普通舱（经济舱）'
}];

const currencySelectSource = [{
    value: 'CNY',
    text: '人民币'
}, {
    value: 'HKD',
    text: '港币'
}, {
    value: 'USD',
    text: '美元'
}];

module.exports = {
    trainSeatSelectSource,
    airSeatSelectSource,
    currencySelectSource
}


/***/ }),
/* 10 */
/***/ (function(module, exports) {

const INPUT_INVOICE_TYPES = [
    { text: '电子普通发票', value: 1, allowDeduction: 1, isAddedTax: true },
    { text: '电子专用发票', value: 2, allowDeduction: 1, isAddedTax: true, allowGovdk: 1 },
    { text: '增值税普通发票', value: 3, isAddedTax: true },
    { text: '增值税专用发票', value: 4, allowDeduction: 1, isAddedTax: true, allowGovdk: 1 },
    { text: '普通纸质卷票', value: 5, isAddedTax: true },
    { text: '通用机打发票', value: 7 },
    { text: '出租车票', value: 8 },
    { text: '火车/高铁票', value: 9, allowDeduction: 1 },
    { text: '飞机行程单', value: 10, allowDeduction: 1 },
    { text: '其它票', value: 11, allowDeduction: 1 },
    { text: '机动车销售发票', value: 12, allowDeduction: 1, isAddedTax: true, allowGovdk: 1 },
    { text: '二手车销售发票', value: 13, isAddedTax: true },
    { text: '定额发票', value: 14 },
    { text: '通行费电子发票', value: 15, allowDeduction: 1, isAddedTax: true, allowGovdk: 1 }, // 允许抵扣，增值税发票
    { text: '公路汽车票', value: 16, allowDeduction: 1 },
    { text: '过路桥费发票', value: 17 },
    { text: '完税证明', value: 19 },
    { text: '轮船票', value: 20, allowDeduction: 1 }, // 允许抵扣
    { text: '通用机打电子发票', value: 23 },
	{ text: '海关缴款书', value: 21,  allowDeduction: 1, allowGovdk: 1 },
    { text: '火车票退票凭证', value: 24 },
    { text: '财政电子票据', value: 25 },
    { text: '全电普票', value: 26, allowDeduction: 1, isAddedTax: true },
    { text: '全电专票', value: 27, allowDeduction: 1, isAddedTax: true, allowGovdk: 1 }
];

const inputFullInvoiceDict = {};
const addedInvoiceTypes = [];
const allowDkInvoiceTypes = [];
const otherInvoiceTypes = [];
for (let i = 0; i < INPUT_INVOICE_TYPES.length; i++) {
    const curData = INPUT_INVOICE_TYPES[i];
    inputFullInvoiceDict['k' + curData.value] = curData;
    if (curData.isAddedTax) {
        addedInvoiceTypes.push(curData.value);
    } else {
        otherInvoiceTypes.push(curData.value);
    }

    if (curData.allowDeduction === 1) {
        allowDkInvoiceTypes.push(curData.value);
    }
}

module.exports = {
    INPUT_INVOICE_TYPES,
    INPUT_INVOICE_TYPES_DICT: inputFullInvoiceDict, // INPUT_INVOICE__TYPES_DICT
    ADDED_INVOICE_TYPES: addedInvoiceTypes,
    OTHER_INVOICE_TYPES: otherInvoiceTypes,
    ALLOW_DK_TYPES: allowDkInvoiceTypes
}

/***/ }),
/* 11 */
/***/ (function(module, exports) {

const invoiceStatus = [
    {
        text: '正常',
        value: 0
    },
    {
        text: '失控',
        value: 1
    },
    {
        text: '作废',
        value: 2
    },
    {
        text: '红冲',
        value: 3
    },
    {
        text: '异常',
        value: 4
    }
];
const invoiceStatuDict = {};
for (let i = 0; i < invoiceStatus.length; i++) {
    invoiceStatuDict['k' + invoiceStatus[i].value] = invoiceStatus[i].text;
}

module.exports = {
    INVOICE_STATUS: invoiceStatus,
    INVOICE_STATUS_DICT: invoiceStatuDict
}

/***/ }),
/* 12 */
/***/ (function(module, exports) {

const waringCodes = {
    'k1': '', //正常
    'k2': ''  //'疑似使用旧的监制章'
};

function getWaringCodesResult(codeStr='') {
    const codeArr = codeStr.split(',');
    const result = [];
    for (let i = 0; i < codeArr.length; i++) {
        const curCode = codeArr[i];
        const description = waringCodes['k' + curCode] || '';
        if (description) {
            result.push(description);
        }
    }

    return result;
}

module.exports = {
    waringCodes,
    getWaringCodesResult
}

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

Object.setPrototypeOf = __webpack_require__(14);

if(typeof window === 'object'){
	window.requestAnimationFrame = (function(){
		return window.requestAnimationFrame || window.requestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame || function(func){return setTimeout(func,1/60);};
	})();
}


Function.prototype.method = function(name, func){
	if(!this.prototype[name]){
		this.prototype[name] = func;
	}
	return this;
}

//获取数字的整数部分
Number.method('integer', function(){
	return Math[this<0?'ceil':'floor'](this);
});

//去除字符串前后空白
String.method('trim', function(){
	return this.replace(/^\s+/g,'').replace(/\s+$/g,'');
});

//把中文括弧统一转换为英文，方便比较
String.method('replaceInclude', function(){
	return this.replace('）', ')').replace('（', '(');
});

//过滤JSON数据中的<>等敏感字符
String.method('entityify', function(opt){
	var entity = {
		'"':'&quot;',
		'<':'&lt;',
		'>':'&gt;',
		'&':'&amp;'
	}
	if(typeof opt !== undefined){
		entity = opt;
	}
	return function(){
		return this.replace(/(["<>&])/g, function(c){
			return entity[c];
		});
	}
}());

String.method('isEmail', function(){
	return (/^([a-zA-Z0-9_\.-]+)@([a-zA-Z0-9\.-]+)\.([a-zA-Z\.]{2,6})$/.test(this));
});

String.method('isEmpty', function(){
	return (/^[\s]*$/.test(this));
});
String.method('isNotEmpty', function(){
	return (/[\S]+/.test(this));
});

String.method('isPhone',function(){
	return /^(1[0-9]{10}$)/.test(this);
});
String.method('isPhoneOrMail',function(){
	if(this.isEmail()){
		return 2;
	}else if(this.isPhone()){
		return 1;
	}else{
		return false;
	}
});

String.method('getLength',function(){
	var r=/[\x00-\xff]/g;
	var cnLen = this.replace(r,'').length;
	return this.length + cnLen;
});

String.method('isNumber',function(){
	return /[0-9.]*/.test(this) && isFinite(this);
});

String.method('getSub',function(n,flag){
	var r=/[^\x00-\xff]/g;
		if(this.replace(r,"mm").length<=n){
			return this;
		}
		var m=Math.floor(n/2);
		for(var i=m;i<this.length;i++){
			if(this.substr(0,i).replace(r,"mm").length>=n){
				if(flag){
					return this.substr(0,i) +'...';
				}else{
					return this.substr(0,i);
				}
			}
		}
		return this;
});

String.method('trimUnNumber', function() {
    var v = parseFloat(this.trim());
    if (isNaN(v)) {
        return '';
    } else {
        return v + '';
    }
});

//某些浏览器不支持IndexOf
Array.method('indexOf', function(value){
	var i,
		len = this.length;
	for(i=0;i<len;i++){
		if(this[i] === value){
			return i;
		}
	}
	return -1;
});

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* eslint no-proto: 0 */
module.exports = Object.setPrototypeOf || ({ __proto__: [] } instanceof Array ? setProtoOf : mixinProperties)

function setProtoOf (obj, proto) {
  obj.__proto__ = proto
  return obj
}

function mixinProperties (obj, proto) {
  for (var prop in proto) {
    if (!Object.prototype.hasOwnProperty.call(obj, prop)) {
      obj[prop] = proto[prop]
    }
  }
  return obj
}


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setCache", function() { return setCache; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCache", function() { return getCache; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clearCache", function() { return clearCache; });
/* harmony import */ var _cookie_helps__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);


//默认sessionStorage
const setCache = function(key, value, flag){
    if(typeof value === 'object'){
        value = escape(JSON.stringify(value));
    }else{
        value = escape(value);
    }

    if(!localStorage && !sessionStorage){
        try{
            var timeout = 60*60;
            if(!isNaN(parseInt(flag))){
                timeout = flag;
            }
            Object(_cookie_helps__WEBPACK_IMPORTED_MODULE_0__["setCookie"])(key, value, timeout);
            return true;
        }catch(e){
            return false;
        }
    }else{
        if(flag == 'localStorage' && localStorage){
            try{
                localStorage.setItem(key, value);
                return true;
            }catch(e){
                return false;
            }
        }else if(!isNaN(parseInt(flag))){ //如果传入为数字，则表示未cookie的保留时间
            try{
                Object(_cookie_helps__WEBPACK_IMPORTED_MODULE_0__["setCookie"])(key, value, flag);
                return true;
            }catch(e){
                return false;
            }
        }else{
            try{
                sessionStorage.setItem(key, value);
                return true;
            }catch(e){
                return false;
            }
        }
    }


}

//默认sessionStorage
const getCache = function (key, flag, type){
    if(!localStorage && !sessionStorage){
        if(type === 'string'){
            return unescape(getCookie(key));
        }else{
            try{
                var v = unescape(getCookie(key));
                return JSON.parse(v);
            }catch(e){
                return v;
            }
        }
    }else{
        if(flag == 'localStorage' && localStorage){
            if(type === 'string'){
                return unescape(localStorage.getItem(key));
            }else{
                try{
                    var v = unescape(localStorage.getItem(key));
                    return JSON.parse(v);
                }catch(e){
                    return v;
                }
            }

        }else if(flag == 'cookie' || !isNaN(parseInt(flag))){
            if(type === 'string'){
                return unescape(getCookie(key));
            }else{
                try{
                    var v = unescape(getCookie(key));
                    return JSON.parse(v);
                }catch(e){
                    return v;
                }
            }

        }else{//默认使用session storage
            if(type === 'string'){
                return unescape(sessionStorage.getItem(key));
            }else{
                try{
                    var v = unescape(sessionStorage.getItem(key));
                    return JSON.parse(v);
                }catch(e){
                    return v;
                }
            }

        }
    }
}

const clearCache = function(key,flag){
    if(!localStorage && !sessionStorage){
        try{
            Object(_cookie_helps__WEBPACK_IMPORTED_MODULE_0__["clearCookie"])(key);
            return true;
        }catch(e){
            return false;
        }
    }else{
        if(flag == 'localStorage' && localStorage){
            try{
                localStorage.removeItem(key);
                return true;
            }catch(e){
                return false;
            }
        }else if(flag == 'cookie' || !isNaN(parseInt(flag))){
            try{
                Object(_cookie_helps__WEBPACK_IMPORTED_MODULE_0__["clearCookie"])(key);
                return true;
            }catch(e){
                return false;
            }
        }else{ //默认清理sessionStorage
            try{
                sessionStorage.removeItem(key);
                return true;
            }catch(e){
                return false;
            }
        }
    }

}

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getLoadedJs", function() { return getLoadedJs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "syncUse", function() { return syncUse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "use", function() { return use; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadScripts", function() { return loadScripts; });
const getLoadedJs = function() {
    const loadedUnAMDScripts = [];
    // 防止服务端使用时出现异常
    if (typeof document === 'object' && document.getElementsByTagName) {
        const scriptsObj = document.getElementsByTagName('script');
        for (var i = scriptsObj.length; i--;) {
            var src = scriptsObj[i].src || '';
            if (src != '') {
                loadedUnAMDScripts.push(src);
            }
        }
    }
    return loadedUnAMDScripts;
}



//获取地址的绝对路径
const getFullPath = function(path, basePath) {
    if (/^https?:\/\/.*$/.test(path)) {
        return path;
    }
    basePath = basePath || (window.location.href).replace(/\/[0-0a-zA-Z._-]*$/, '');
    var rootPath = window.location.origin;
    if (/^\/.*$/.test(path)) { //以斜杠开始
        return rootPath + path; //以.开始
    } else if (/^\.\/.*$/.test(path)) {
        return basePath + path.replace(/^\./, '');
    } else if (/^\.\.\/.*/.test(path)) { //以..开始
        var puri = path.split('/');
        var newUri = [];
        for (var i = 0; i < puri.length; i++) {
            if (puri[i] == '..' && rootPath != basePath) {
                basePath = basePath.replace(/\/[0-0a-zA-Z._-]*$/, '');
            } else if (puri[i] != '.' && puri[i] != '..') {
                newUri.push(puri[i]);
            }
        }
        return basePath + '/' + newUri.join('/');
    } else { //path开始没有特殊字符
        return basePath + path;
    }
};

//同步加载，urls之间有前后依赖关系时可以选择这种方式，速度稍微慢些
//如果前面的一个url地址找不到，后续的则不会加载
const syncUse = function(sUrls, callback) {
    var loadedUnAMDScripts = getLoadedJs();
    var urls = [];
    if (typeof sUrls === 'string') {
        urls.push(getFullPath(sUrls));
    } else {
        for (var i = 0, len = sUrls.length; i < len; i++) { //转换路径
            urls.push(getFullPath(sUrls[i]));
        }
    }

    return (function next(i) {
        if (loadedUnAMDScripts.indexOf(urls[i]) == -1) { //判断是否已经加载过
            if (i < urls.length) {
                var script = document.createElement('script');
                script.type = 'text/javascript';
                if (script.readyState) { //IE
                    script.onreadystatechange = function() {
                        if (script.readyState == 'loaded' || script.readyState == 'complete') {
                            script.onreadystatechange = null;
                            next(i + 1);
                        }
                    };
                } else { //Others
                    script.onload = function() {
                        next(i + 1);
                    };
                }
                script.src = urls[i];
                if (/^.*sea\.js\/?$/.test(urls[i])) {
                    script.id = 'seajsnode';
                }
                document.getElementsByTagName('head')[0].appendChild(script);
                loadedUnAMDScripts.push(urls[i]);
            } else {
                callback();
            }
        } else { //如果已经加载过则直接加载下一个
            next(i + 1);
        }
    }(0));
};


//异步加载，urls之间不相互依赖时可以选择这种方式, 不保证urls的加载顺序
//如果前面的一个url地址找不到，后续会继续加载，但callback不会执行
//如果有重复的url无法控制是否已经加载
const use = function(sUrls, callback) { //异步加载
    var loadedUnAMDScripts = getLoadedJs();
    var loadedNumber = 0;
    var jsNumber;
    var urls = [];

    if (typeof sUrls === 'string') {
        urls.push(getFullPath(sUrls));
    } else {
        for (let i = sUrls.length; i--;) { //转换路径
            urls.push(getFullPath(sUrls[i]));
        }
    }
    jsNumber = urls.length;
    for (let i = jsNumber; i--;) {
        var jsSrc = urls[i];
        if (loadedUnAMDScripts.indexOf(jsSrc) == -1) { //判断是否已经加载过
            var script = document.createElement('script');
            script.type = 'text/javascript';
            if (script.readyState) { //IE
                script.onreadystatechange = function() {
                    if (script.readyState == 'loaded' || script.readyState == 'complete') {
                        script.onreadystatechange = null;
                        if (++loadedNumber == jsNumber) {
                            callback();
                        }
                    }
                };
            } else { //Others
                script.onload = function() {
                    if (++loadedNumber == jsNumber) {
                        callback();
                    }
                };
            }
            script.src = urls[i];
            if (/^.*sea\.js\/?$/.test(jsSrc)) {
                script.id = 'seajsnode';
            }
            document.getElementsByTagName('head')[0].appendChild(script);
            loadedUnAMDScripts.push(urls[i]);
        } else {
            if (++loadedNumber == jsNumber) {
                callback();
            }
        }
    }
};

// 加载lib库文件，返回promise对象
const loadScripts = function(sUrls, syncFlag) {
    return new Promise(function(resolve) {
        try {
            if (syncFlag) {
                syncUse(sUrls, function() {
                    resolve(true);
                });
            } else {
                use(sUrls, function() {
                    resolve(true);
                });
            }
        } catch (error) {
            resolve(false);
        }
    });
}

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "urlSearch", function() { return urlSearch; });
const urlSearch = function(search=''){
    search = search.replace(/^\?/, '');
    const urlParams = {};
    const urlParamArr = search.split('&');
    for(let i=0,len = urlParamArr.length; i<len;i++){
        const param = urlParamArr[i].split('=');
        let tempValue = '';
        if(param.length > 1){
            tempValue = param[1];
        }
        urlParams[param[0]] = tempValue;
    }    
    return urlParams;
}


/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "blockchain_filter", function() { return blockchain_filter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "checkInvoiceType", function() { return checkInvoiceType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "checkInvoiceTypeFull", function() { return checkInvoiceTypeFull; });
const blockchain_filter = function(fpInfo){//区块链点击发票区分
    let flag = false;
    const { invoiceCode, invoiceNo } = fpInfo;
    if (invoiceCode && invoiceNo){
        if (invoiceCode.length == 12 && invoiceNo.length == 8) {
            const str5 = invoiceCode.substr(0, 5);
            const str9 = invoiceCode.substr(8, 1);
            if (str5 == '14403' && str9 == '9') {
                flag = true;
            }
        }
    }
    return flag
}

//根据发票代码判断专票或普票
const checkInvoiceType = function(fpdm, fphm){ 
    if (fpdm) {
        fpdm +='';
    }
    if (fphm) {
        fphm +='';
    }
    // const isBlockchain = blockchain_filter({invoiceCode: fpdm, invoiceNo: fphm});
    // if(isBlockchain){
    //     return 11; //区块链发票
    // }
	const last3Str = fpdm.substr(fpdm.length - 3);
	const last2Str = fpdm.substr(fpdm.length - 2);
	const firstStr = fpdm.substr(0,1);
    const sixthStr = fpdm.substr(5, 1);
    const eighthStr = fpdm.substr(7, 1);
	if (last3Str === '130' || last3Str === '140' || last3Str === '160' || last3Str === '170') {
	    return 4; //纸质专票
	}

    if (fpdm.length == 12) {
        if (firstStr == '0' && last2Str == '12') {
            return 15; //通行费
        }

        if (firstStr === '0' && last2Str === '17') {
            return 13; // 二手车
        }

        if (firstStr === '0' && (last2Str === '06' || last2Str === '07')) {
            return 5; //卷式
        }
        if (firstStr === '0' && last2Str === '13') {
            return 2; // 电子专票
        }
        if (sixthStr == '1' || sixthStr == '2') {
            if (eighthStr == '2') { //机动车销售票
              return 12;
            }
        }
    }
	return 3;
}


function checkInvoiceTypeFull(fpdm, fphm) {
    if (fpdm) {
        fpdm +='';
    }

    if (fphm) {
        fphm +='';
    }

    if (!fphm || !fpdm) {
        return 5; // 普通纸质卷票
    }

    const fpdmLength = fpdm.length;

    //长度为12位的都是
    if (fpdmLength == 12) {
        //如果是区块链发票 区块链发票五要素查验 区块链发票暂时定为1--电子发票类型
        if (fpdm.length == 12 && fphm.length == 8) {
            //发票代码12位  发票号码8位
            if (fpdm.startsWith('14403') && '9' === fpdm.substr(8, 9)) {
                return 1;
            }
            if (fpdm.startsWith('0') && fpdm.endsWith('13')) {
                return 2; //电专票
            }
        }

        if (fpdm.startsWith('1') && fpdm.substr(7, 8).equals('2')) {
            return 12; // 机动车
        }

        if (fpdm.endsWith('11') && fpdm.startsWith('0')) {
            return 1; // 普通电子发票
        }

        if (fpdm.endsWith('12') && fpdm.startsWith('0')) {
            return 15; // 通行费
        }

        if (fpdm.endsWith('04') || fpdm.endsWith('05')) {
            return 3; // 普通纸质发票
        }

        if (fpdm.endsWith('06') || fpdm.endsWith('07')) {
            return 5; // 普通纸质卷票
        }

        if (fpdm.endsWith('17') && fpdm.startsWith('0')) {
            return 13; // 二手车
        } else {
            return 3; // 普票
        }
    } else if (fpdmLength == 10) {
        if (fpdm.endsWith('130') || fpdm.endsWith('140') || fpdm.endsWith('160') || fpdm.endsWith('170')) {
            return 4; // 纸质专用发票
        } else {
            return 3; // 普票
        }
    } else {
        return 3;
    }
}

/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const crossHttp = ({
    method = 'POST',
    data = '',
    withCredentials = false,
    dataType='json',
    contentType = 'text/plain',
    timeout = 60000,
    url = 'http://127.0.0.1:52320/cryptctl',
    onTimeout,
    onError,
    success
}) => {
    return new Promise((resolve, reject) => {
        let xhr = null;
        if(XMLHttpRequest){
            xhr = new XMLHttpRequest();
        }

        if(withCredentials && typeof xhr.withCredentials !== 'undefined'){
            xhr.withCredentials = true;
        }

        if(!xhr && typeof XDomainRequest !== 'undefined'){
            // 检查是否是IE，并且使用IE的XDomainRequest
            xhr = new XDomainRequest();
        }

        if(xhr){

            try{
                xhr.timeout = timeout;
                xhr.contentLength = data.length;
            }catch(e){
                console.warn('设置超时时间异常');
            }

            try{
                xhr.contentType = contentType;
            }catch(e){
                console.warn('设置contentType异常');
            }

            xhr.onload = function(){
                let result = xhr.responseText;
                if(dataType === 'json') {
                    try{
                        result = JSON.parse(result);
                        resolve(result);
                    }catch(e){
                        //TODO handle the exception
                        resolve({description: '服务端异常', errcode: 'serverErr'});
                    }
                } else {
                    resolve(result);
                }

            };

            xhr.ontimeout = function(){
                resolve({errcode:'timeout', description:'请求超时,请安装且启动“金蝶发票管理组件”后重试！'}, xhr);
            };

            xhr.onerror = function(){
                resolve({errcode:'err', description:'请求异常,请安装且启动“金蝶发票管理组件”后重试！'},xhr);
            };

            xhr.open(method, url, true); //窗口上下文的同步模式中不支持使用 XMLHttpRequest 的 timeout 属性

            if(typeof data === 'object'){
                data = JSON.stringify(data);
            }

            if(typeof data === 'string'){
                xhr.send(data);
            }else{
                resolve({errcode:'argsErr',description:'参数格式不正确'});
            }
        }else{
            xhr = null;
            resolve({errcode:'accessErr', description:'税盘不支持访问'});
        }
    })

}

/* harmony default export */ __webpack_exports__["default"] = (crossHttp);

/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//client check
const clientCheck = function() {
    //rendering engines
    var engine = {
        ie: 0,
        gecko: 0,
        webkit: 0,
        khtml: 0,
        opera: 0,
        ver: null
    };

    //browsers
    var browser = {
        ie: 0,
        firefox: 0,
        safari: 0,
        konq: 0,
        opera: 0,
        chrome: 0,
        ver: null
    };


    //platform/device/OS
    var system = {
        win: false,
        mac: false,
        x11: false,
        //mobile devices
        iphone: false,
        ipod: false,
        ipad: false,
        ios: false,
        android: false,
        nokiaN: false,
        winMobile: false,
        //game systems
        wii: false,
        ps: false
    };

    //detect rendering engines/browsers
    var ua = navigator.userAgent;
    if (window.opera){
        engine.ver = browser.ver = window.opera.version();
        engine.opera = browser.opera = parseFloat(engine.ver);
    } else if (/AppleWebKit\/(\S+)/.test(ua)){
        engine.ver = RegExp['$1'];
        engine.webkit = parseFloat(engine.ver);

        //figure out if it's Chrome or Safari
        if (/Chrome\/(\S+)/.test(ua)){
            browser.ver = RegExp['$1'];
            browser.chrome = parseFloat(browser.ver);
        } else if (/Version\/(\S+)/.test(ua)){
            browser.ver = RegExp['$1'];
            browser.safari = parseFloat(browser.ver);
        } else {
            //approximate version
            var safariVersion = 1;
            if (engine.webkit < 100){
                safariVersion = 1;
            } else if (engine.webkit < 312){
                safariVersion = 1.2;
            } else if (engine.webkit < 412){
                safariVersion = 1.3;
            } else {
                safariVersion = 2;
            }

            browser.safari = browser.ver = safariVersion;
        }
    } else if (/KHTML\/(\S+)/.test(ua) || /Konqueror\/([^;]+)/.test(ua)){
        engine.ver = browser.ver = RegExp['$1'];
        engine.khtml = browser.konq = parseFloat(engine.ver);
    } else if (/rv:([^\)]+)\) Gecko\/\d{8}/.test(ua)){
        engine.ver = RegExp['$1'];
        engine.gecko = parseFloat(engine.ver);

        //determine if it's Firefox
        if (/Firefox\/(\S+)/.test(ua)){
            browser.ver = RegExp['$1'];
            browser.firefox = parseFloat(browser.ver);
        }
    } else if (/MSIE ([^;]+)/.test(ua)){
        engine.ver = browser.ver = RegExp['$1'];
        engine.ie = browser.ie = parseFloat(engine.ver);
    } else if (/Trident\/7.0/.test(ua) && /rv:([^\)]+)\)/.test(ua)) { // edge 11版本
        engine.ver = browser.ver = RegExp['$1'];
        engine.ie = browser.ie = parseFloat(engine.ver);
    } else if (/Edge\/(\S+)/.test(ua)) { // edge 12或者更高版本
        engine.ver = browser.ver = RegExp['$1'];
        engine.ie = browser.ie = parseFloat(engine.ver);
    }

    //detect browsers
    browser.ie = engine.ie;
    browser.opera = engine.opera;


    //detect platform
    var p = navigator.platform;
    system.win = p.indexOf('Win') == 0;
    system.mac = p.indexOf('Mac') == 0;
    system.x11 = (p == 'X11') || (p.indexOf('Linux') == 0);

    //detect windows operating systems
    if (system.win){
        if (/Win(?:dows )?([^do]{2})\s?(\d+\.\d+)?/.test(ua)){
            if (RegExp['$1'] == 'NT'){
                switch(RegExp['$2']){
                    case '5.0':
                        system.win = '2000';
                        break;
                    case '5.1':
                        system.win = 'XP';
                        break;
                    case '6.0':
                        system.win = 'Vista';
                        break;
                    case '6.1':
                        system.win = '7';
                        break;
                    default:
                        system.win = 'NT';
                        break;
                }
            } else if (RegExp['$1'] == '9x'){
                system.win = 'ME';
            } else {
                system.win = RegExp['$1'];
            }
        }
    }

    //mobile devices
    system.iphone = ua.indexOf('iPhone') > -1;
    system.ipod = ua.indexOf('iPod') > -1;
    system.ipad = ua.indexOf('iPad') > -1;
    system.nokiaN = ua.indexOf('NokiaN') > -1;

    //windows mobile
    if (system.win == 'CE'){
        system.winMobile = system.win;
    } else if (system.win == 'Ph'){
        if(/Windows Phone OS (\d+.\d+)/.test(ua)){;
            system.win = 'Phone';
            system.winMobile = parseFloat(RegExp['$1']);
        }
    }


    //determine iOS version
    if (system.mac && ua.indexOf('Mobile') > -1){
        if (/CPU (?:iPhone )?OS (\d+_\d+)/.test(ua)){
            system.ios = parseFloat(RegExp.$1.replace('_', '.'));
        } else {
            system.ios = 2;  //can't really detect - so guess
        }
    }

    //determine Android version
    if (/Android (\d+\.\d+)/.test(ua)){
        system.android = parseFloat(RegExp.$1);
    }

    //gaming systems
    system.wii = ua.indexOf('Wii') > -1;
    system.ps = /playstation/i.test(ua);

    return {
        engine,
        browser,
        system
    };
};

/* harmony default export */ __webpack_exports__["default"] = (clientCheck);

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// 支持的所有语言
/* harmony default export */ __webpack_exports__["default"] = (['zh_CN', // 中文
'en_US', // 英文（美式）
'en_GB', // 英文
'es_ES' // 西班牙语
]);

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(setImmediate, process, global, module) {(function (global, factory) {
   true ? factory(exports) :
  undefined;
}(this, (function (exports) { 'use strict';

function slice(arrayLike, start) {
    start = start|0;
    var newLen = Math.max(arrayLike.length - start, 0);
    var newArr = Array(newLen);
    for(var idx = 0; idx < newLen; idx++)  {
        newArr[idx] = arrayLike[start + idx];
    }
    return newArr;
}

/**
 * Creates a continuation function with some arguments already applied.
 *
 * Useful as a shorthand when combined with other control flow functions. Any
 * arguments passed to the returned function are added to the arguments
 * originally passed to apply.
 *
 * @name apply
 * @static
 * @memberOf module:Utils
 * @method
 * @category Util
 * @param {Function} fn - The function you want to eventually apply all
 * arguments to. Invokes with (arguments...).
 * @param {...*} arguments... - Any number of arguments to automatically apply
 * when the continuation is called.
 * @returns {Function} the partially-applied function
 * @example
 *
 * // using apply
 * async.parallel([
 *     async.apply(fs.writeFile, 'testfile1', 'test1'),
 *     async.apply(fs.writeFile, 'testfile2', 'test2')
 * ]);
 *
 *
 * // the same process without using apply
 * async.parallel([
 *     function(callback) {
 *         fs.writeFile('testfile1', 'test1', callback);
 *     },
 *     function(callback) {
 *         fs.writeFile('testfile2', 'test2', callback);
 *     }
 * ]);
 *
 * // It's possible to pass any number of additional arguments when calling the
 * // continuation:
 *
 * node> var fn = async.apply(sys.puts, 'one');
 * node> fn('two', 'three');
 * one
 * two
 * three
 */
var apply = function(fn/*, ...args*/) {
    var args = slice(arguments, 1);
    return function(/*callArgs*/) {
        var callArgs = slice(arguments);
        return fn.apply(null, args.concat(callArgs));
    };
};

var initialParams = function (fn) {
    return function (/*...args, callback*/) {
        var args = slice(arguments);
        var callback = args.pop();
        fn.call(this, args, callback);
    };
};

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

var hasSetImmediate = typeof setImmediate === 'function' && setImmediate;
var hasNextTick = typeof process === 'object' && typeof process.nextTick === 'function';

function fallback(fn) {
    setTimeout(fn, 0);
}

function wrap(defer) {
    return function (fn/*, ...args*/) {
        var args = slice(arguments, 1);
        defer(function () {
            fn.apply(null, args);
        });
    };
}

var _defer;

if (hasSetImmediate) {
    _defer = setImmediate;
} else if (hasNextTick) {
    _defer = process.nextTick;
} else {
    _defer = fallback;
}

var setImmediate$1 = wrap(_defer);

/**
 * Take a sync function and make it async, passing its return value to a
 * callback. This is useful for plugging sync functions into a waterfall,
 * series, or other async functions. Any arguments passed to the generated
 * function will be passed to the wrapped function (except for the final
 * callback argument). Errors thrown will be passed to the callback.
 *
 * If the function passed to `asyncify` returns a Promise, that promises's
 * resolved/rejected state will be used to call the callback, rather than simply
 * the synchronous return value.
 *
 * This also means you can asyncify ES2017 `async` functions.
 *
 * @name asyncify
 * @static
 * @memberOf module:Utils
 * @method
 * @alias wrapSync
 * @category Util
 * @param {Function} func - The synchronous function, or Promise-returning
 * function to convert to an {@link AsyncFunction}.
 * @returns {AsyncFunction} An asynchronous wrapper of the `func`. To be
 * invoked with `(args..., callback)`.
 * @example
 *
 * // passing a regular synchronous function
 * async.waterfall([
 *     async.apply(fs.readFile, filename, "utf8"),
 *     async.asyncify(JSON.parse),
 *     function (data, next) {
 *         // data is the result of parsing the text.
 *         // If there was a parsing error, it would have been caught.
 *     }
 * ], callback);
 *
 * // passing a function returning a promise
 * async.waterfall([
 *     async.apply(fs.readFile, filename, "utf8"),
 *     async.asyncify(function (contents) {
 *         return db.model.create(contents);
 *     }),
 *     function (model, next) {
 *         // `model` is the instantiated model object.
 *         // If there was an error, this function would be skipped.
 *     }
 * ], callback);
 *
 * // es2017 example, though `asyncify` is not needed if your JS environment
 * // supports async functions out of the box
 * var q = async.queue(async.asyncify(async function(file) {
 *     var intermediateStep = await processFile(file);
 *     return await somePromise(intermediateStep)
 * }));
 *
 * q.push(files);
 */
function asyncify(func) {
    return initialParams(function (args, callback) {
        var result;
        try {
            result = func.apply(this, args);
        } catch (e) {
            return callback(e);
        }
        // if result is Promise object
        if (isObject(result) && typeof result.then === 'function') {
            result.then(function(value) {
                invokeCallback(callback, null, value);
            }, function(err) {
                invokeCallback(callback, err.message ? err : new Error(err));
            });
        } else {
            callback(null, result);
        }
    });
}

function invokeCallback(callback, error, value) {
    try {
        callback(error, value);
    } catch (e) {
        setImmediate$1(rethrow, e);
    }
}

function rethrow(error) {
    throw error;
}

var supportsSymbol = typeof Symbol === 'function';

function isAsync(fn) {
    return supportsSymbol && fn[Symbol.toStringTag] === 'AsyncFunction';
}

function wrapAsync(asyncFn) {
    return isAsync(asyncFn) ? asyncify(asyncFn) : asyncFn;
}

function applyEach$1(eachfn) {
    return function(fns/*, ...args*/) {
        var args = slice(arguments, 1);
        var go = initialParams(function(args, callback) {
            var that = this;
            return eachfn(fns, function (fn, cb) {
                wrapAsync(fn).apply(that, args.concat(cb));
            }, callback);
        });
        if (args.length) {
            return go.apply(this, args);
        }
        else {
            return go;
        }
    };
}

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Built-in value references. */
var Symbol$1 = root.Symbol;

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag$1 = Symbol$1 ? Symbol$1.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag$1),
      tag = value[symToStringTag$1];

  try {
    value[symToStringTag$1] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag$1] = tag;
    } else {
      delete value[symToStringTag$1];
    }
  }
  return result;
}

/** Used for built-in method references. */
var objectProto$1 = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString$1 = objectProto$1.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString$1.call(value);
}

/** `Object#toString` result references. */
var nullTag = '[object Null]';
var undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol$1 ? Symbol$1.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]';
var funcTag = '[object Function]';
var genTag = '[object GeneratorFunction]';
var proxyTag = '[object Proxy]';

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

// A temporary value used to identify if the loop should be broken.
// See #1064, #1293
var breakLoop = {};

/**
 * This method returns `undefined`.
 *
 * @static
 * @memberOf _
 * @since 2.3.0
 * @category Util
 * @example
 *
 * _.times(2, _.noop);
 * // => [undefined, undefined]
 */
function noop() {
  // No operation performed.
}

function once(fn) {
    return function () {
        if (fn === null) return;
        var callFn = fn;
        fn = null;
        callFn.apply(this, arguments);
    };
}

var iteratorSymbol = typeof Symbol === 'function' && Symbol.iterator;

var getIterator = function (coll) {
    return iteratorSymbol && coll[iteratorSymbol] && coll[iteratorSymbol]();
};

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

/** `Object#toString` result references. */
var argsTag = '[object Arguments]';

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag;
}

/** Used for built-in method references. */
var objectProto$3 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$2 = objectProto$3.hasOwnProperty;

/** Built-in value references. */
var propertyIsEnumerable = objectProto$3.propertyIsEnumerable;

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
  return isObjectLike(value) && hasOwnProperty$2.call(value, 'callee') &&
    !propertyIsEnumerable.call(value, 'callee');
};

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || stubFalse;

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER$1 = 9007199254740991;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER$1 : length;

  return !!length &&
    (type == 'number' ||
      (type != 'symbol' && reIsUint.test(value))) &&
        (value > -1 && value % 1 == 0 && value < length);
}

/** `Object#toString` result references. */
var argsTag$1 = '[object Arguments]';
var arrayTag = '[object Array]';
var boolTag = '[object Boolean]';
var dateTag = '[object Date]';
var errorTag = '[object Error]';
var funcTag$1 = '[object Function]';
var mapTag = '[object Map]';
var numberTag = '[object Number]';
var objectTag = '[object Object]';
var regexpTag = '[object RegExp]';
var setTag = '[object Set]';
var stringTag = '[object String]';
var weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]';
var dataViewTag = '[object DataView]';
var float32Tag = '[object Float32Array]';
var float64Tag = '[object Float64Array]';
var int8Tag = '[object Int8Array]';
var int16Tag = '[object Int16Array]';
var int32Tag = '[object Int32Array]';
var uint8Tag = '[object Uint8Array]';
var uint8ClampedTag = '[object Uint8ClampedArray]';
var uint16Tag = '[object Uint16Array]';
var uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag$1] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
typedArrayTags[errorTag] = typedArrayTags[funcTag$1] =
typedArrayTags[mapTag] = typedArrayTags[numberTag] =
typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
typedArrayTags[setTag] = typedArrayTags[stringTag] =
typedArrayTags[weakMapTag] = false;

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
  return isObjectLike(value) &&
    isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

/** Detect free variable `exports`. */
var freeExports$1 = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule$1 = freeExports$1 && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports$1 = freeModule$1 && freeModule$1.exports === freeExports$1;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports$1 && freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    // Use `util.types` for Node.js 10+.
    var types = freeModule$1 && freeModule$1.require && freeModule$1.require('util').types;

    if (types) {
      return types;
    }

    // Legacy `process.binding('util')` for Node.js < 10.
    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
}());

/* Node.js helper references. */
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

/** Used for built-in method references. */
var objectProto$2 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$1 = objectProto$2.hasOwnProperty;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  var isArr = isArray(value),
      isArg = !isArr && isArguments(value),
      isBuff = !isArr && !isArg && isBuffer(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty$1.call(value, key)) &&
        !(skipIndexes && (
           // Safari 9 has enumerable `arguments.length` in strict mode.
           key == 'length' ||
           // Node.js 0.10 has enumerable non-index properties on buffers.
           (isBuff && (key == 'offset' || key == 'parent')) ||
           // PhantomJS 2 has enumerable non-index properties on typed arrays.
           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
           // Skip index properties.
           isIndex(key, length)
        ))) {
      result.push(key);
    }
  }
  return result;
}

/** Used for built-in method references. */
var objectProto$5 = Object.prototype;

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto$5;

  return value === proto;
}

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = overArg(Object.keys, Object);

/** Used for built-in method references. */
var objectProto$4 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$3 = objectProto$4.hasOwnProperty;

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty$3.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

function createArrayIterator(coll) {
    var i = -1;
    var len = coll.length;
    return function next() {
        return ++i < len ? {value: coll[i], key: i} : null;
    }
}

function createES2015Iterator(iterator) {
    var i = -1;
    return function next() {
        var item = iterator.next();
        if (item.done)
            return null;
        i++;
        return {value: item.value, key: i};
    }
}

function createObjectIterator(obj) {
    var okeys = keys(obj);
    var i = -1;
    var len = okeys.length;
    return function next() {
        var key = okeys[++i];
        if (key === '__proto__') {
            return next();
        }
        return i < len ? {value: obj[key], key: key} : null;
    };
}

function iterator(coll) {
    if (isArrayLike(coll)) {
        return createArrayIterator(coll);
    }

    var iterator = getIterator(coll);
    return iterator ? createES2015Iterator(iterator) : createObjectIterator(coll);
}

function onlyOnce(fn) {
    return function() {
        if (fn === null) throw new Error("Callback was already called.");
        var callFn = fn;
        fn = null;
        callFn.apply(this, arguments);
    };
}

function _eachOfLimit(limit) {
    return function (obj, iteratee, callback) {
        callback = once(callback || noop);
        if (limit <= 0 || !obj) {
            return callback(null);
        }
        var nextElem = iterator(obj);
        var done = false;
        var running = 0;
        var looping = false;

        function iterateeCallback(err, value) {
            running -= 1;
            if (err) {
                done = true;
                callback(err);
            }
            else if (value === breakLoop || (done && running <= 0)) {
                done = true;
                return callback(null);
            }
            else if (!looping) {
                replenish();
            }
        }

        function replenish () {
            looping = true;
            while (running < limit && !done) {
                var elem = nextElem();
                if (elem === null) {
                    done = true;
                    if (running <= 0) {
                        callback(null);
                    }
                    return;
                }
                running += 1;
                iteratee(elem.value, elem.key, onlyOnce(iterateeCallback));
            }
            looping = false;
        }

        replenish();
    };
}

/**
 * The same as [`eachOf`]{@link module:Collections.eachOf} but runs a maximum of `limit` async operations at a
 * time.
 *
 * @name eachOfLimit
 * @static
 * @memberOf module:Collections
 * @method
 * @see [async.eachOf]{@link module:Collections.eachOf}
 * @alias forEachOfLimit
 * @category Collection
 * @param {Array|Iterable|Object} coll - A collection to iterate over.
 * @param {number} limit - The maximum number of async operations at a time.
 * @param {AsyncFunction} iteratee - An async function to apply to each
 * item in `coll`. The `key` is the item's key, or index in the case of an
 * array.
 * Invoked with (item, key, callback).
 * @param {Function} [callback] - A callback which is called when all
 * `iteratee` functions have finished, or an error occurs. Invoked with (err).
 */
function eachOfLimit(coll, limit, iteratee, callback) {
    _eachOfLimit(limit)(coll, wrapAsync(iteratee), callback);
}

function doLimit(fn, limit) {
    return function (iterable, iteratee, callback) {
        return fn(iterable, limit, iteratee, callback);
    };
}

// eachOf implementation optimized for array-likes
function eachOfArrayLike(coll, iteratee, callback) {
    callback = once(callback || noop);
    var index = 0,
        completed = 0,
        length = coll.length;
    if (length === 0) {
        callback(null);
    }

    function iteratorCallback(err, value) {
        if (err) {
            callback(err);
        } else if ((++completed === length) || value === breakLoop) {
            callback(null);
        }
    }

    for (; index < length; index++) {
        iteratee(coll[index], index, onlyOnce(iteratorCallback));
    }
}

// a generic version of eachOf which can handle array, object, and iterator cases.
var eachOfGeneric = doLimit(eachOfLimit, Infinity);

/**
 * Like [`each`]{@link module:Collections.each}, except that it passes the key (or index) as the second argument
 * to the iteratee.
 *
 * @name eachOf
 * @static
 * @memberOf module:Collections
 * @method
 * @alias forEachOf
 * @category Collection
 * @see [async.each]{@link module:Collections.each}
 * @param {Array|Iterable|Object} coll - A collection to iterate over.
 * @param {AsyncFunction} iteratee - A function to apply to each
 * item in `coll`.
 * The `key` is the item's key, or index in the case of an array.
 * Invoked with (item, key, callback).
 * @param {Function} [callback] - A callback which is called when all
 * `iteratee` functions have finished, or an error occurs. Invoked with (err).
 * @example
 *
 * var obj = {dev: "/dev.json", test: "/test.json", prod: "/prod.json"};
 * var configs = {};
 *
 * async.forEachOf(obj, function (value, key, callback) {
 *     fs.readFile(__dirname + value, "utf8", function (err, data) {
 *         if (err) return callback(err);
 *         try {
 *             configs[key] = JSON.parse(data);
 *         } catch (e) {
 *             return callback(e);
 *         }
 *         callback();
 *     });
 * }, function (err) {
 *     if (err) console.error(err.message);
 *     // configs is now a map of JSON data
 *     doSomethingWith(configs);
 * });
 */
var eachOf = function(coll, iteratee, callback) {
    var eachOfImplementation = isArrayLike(coll) ? eachOfArrayLike : eachOfGeneric;
    eachOfImplementation(coll, wrapAsync(iteratee), callback);
};

function doParallel(fn) {
    return function (obj, iteratee, callback) {
        return fn(eachOf, obj, wrapAsync(iteratee), callback);
    };
}

function _asyncMap(eachfn, arr, iteratee, callback) {
    callback = callback || noop;
    arr = arr || [];
    var results = [];
    var counter = 0;
    var _iteratee = wrapAsync(iteratee);

    eachfn(arr, function (value, _, callback) {
        var index = counter++;
        _iteratee(value, function (err, v) {
            results[index] = v;
            callback(err);
        });
    }, function (err) {
        callback(err, results);
    });
}

/**
 * Produces a new collection of values by mapping each value in `coll` through
 * the `iteratee` function. The `iteratee` is called with an item from `coll`
 * and a callback for when it has finished processing. Each of these callback
 * takes 2 arguments: an `error`, and the transformed item from `coll`. If
 * `iteratee` passes an error to its callback, the main `callback` (for the
 * `map` function) is immediately called with the error.
 *
 * Note, that since this function applies the `iteratee` to each item in
 * parallel, there is no guarantee that the `iteratee` functions will complete
 * in order. However, the results array will be in the same order as the
 * original `coll`.
 *
 * If `map` is passed an Object, the results will be an Array.  The results
 * will roughly be in the order of the original Objects' keys (but this can
 * vary across JavaScript engines).
 *
 * @name map
 * @static
 * @memberOf module:Collections
 * @method
 * @category Collection
 * @param {Array|Iterable|Object} coll - A collection to iterate over.
 * @param {AsyncFunction} iteratee - An async function to apply to each item in
 * `coll`.
 * The iteratee should complete with the transformed item.
 * Invoked with (item, callback).
 * @param {Function} [callback] - A callback which is called when all `iteratee`
 * functions have finished, or an error occurs. Results is an Array of the
 * transformed items from the `coll`. Invoked with (err, results).
 * @example
 *
 * async.map(['file1','file2','file3'], fs.stat, function(err, results) {
 *     // results is now an array of stats for each file
 * });
 */
var map = doParallel(_asyncMap);

/**
 * Applies the provided arguments to each function in the array, calling
 * `callback` after all functions have completed. If you only provide the first
 * argument, `fns`, then it will return a function which lets you pass in the
 * arguments as if it were a single function call. If more arguments are
 * provided, `callback` is required while `args` is still optional.
 *
 * @name applyEach
 * @static
 * @memberOf module:ControlFlow
 * @method
 * @category Control Flow
 * @param {Array|Iterable|Object} fns - A collection of {@link AsyncFunction}s
 * to all call with the same arguments
 * @param {...*} [args] - any number of separate arguments to pass to the
 * function.
 * @param {Function} [callback] - the final argument should be the callback,
 * called when all functions have completed processing.
 * @returns {Function} - If only the first argument, `fns`, is provided, it will
 * return a function which lets you pass in the arguments as if it were a single
 * function call. The signature is `(..args, callback)`. If invoked with any
 * arguments, `callback` is required.
 * @example
 *
 * async.applyEach([enableSearch, updateSchema], 'bucket', callback);
 *
 * // partial application example:
 * async.each(
 *     buckets,
 *     async.applyEach([enableSearch, updateSchema]),
 *     callback
 * );
 */
var applyEach = applyEach$1(map);

function doParallelLimit(fn) {
    return function (obj, limit, iteratee, callback) {
        return fn(_eachOfLimit(limit), obj, wrapAsync(iteratee), callback);
    };
}

/**
 * The same as [`map`]{@link module:Collections.map} but runs a maximum of `limit` async operations at a time.
 *
 * @name mapLimit
 * @static
 * @memberOf module:Collections
 * @method
 * @see [async.map]{@link module:Collections.map}
 * @category Collection
 * @param {Array|Iterable|Object} coll - A collection to iterate over.
 * @param {number} limit - The maximum number of async operations at a time.
 * @param {AsyncFunction} iteratee - An async function to apply to each item in
 * `coll`.
 * The iteratee should complete with the transformed item.
 * Invoked with (item, callback).
 * @param {Function} [callback] - A callback which is called when all `iteratee`
 * functions have finished, or an error occurs. Results is an array of the
 * transformed items from the `coll`. Invoked with (err, results).
 */
var mapLimit = doParallelLimit(_asyncMap);

/**
 * The same as [`map`]{@link module:Collections.map} but runs only a single async operation at a time.
 *
 * @name mapSeries
 * @static
 * @memberOf module:Collections
 * @method
 * @see [async.map]{@link module:Collections.map}
 * @category Collection
 * @param {Array|Iterable|Object} coll - A collection to iterate over.
 * @param {AsyncFunction} iteratee - An async function to apply to each item in
 * `coll`.
 * The iteratee should complete with the transformed item.
 * Invoked with (item, callback).
 * @param {Function} [callback] - A callback which is called when all `iteratee`
 * functions have finished, or an error occurs. Results is an array of the
 * transformed items from the `coll`. Invoked with (err, results).
 */
var mapSeries = doLimit(mapLimit, 1);

/**
 * The same as [`applyEach`]{@link module:ControlFlow.applyEach} but runs only a single async operation at a time.
 *
 * @name applyEachSeries
 * @static
 * @memberOf module:ControlFlow
 * @method
 * @see [async.applyEach]{@link module:ControlFlow.applyEach}
 * @category Control Flow
 * @param {Array|Iterable|Object} fns - A collection of {@link AsyncFunction}s to all
 * call with the same arguments
 * @param {...*} [args] - any number of separate arguments to pass to the
 * function.
 * @param {Function} [callback] - the final argument should be the callback,
 * called when all functions have completed processing.
 * @returns {Function} - If only the first argument is provided, it will return
 * a function which lets you pass in the arguments as if it were a single
 * function call.
 */
var applyEachSeries = applyEach$1(mapSeries);

/**
 * A specialized version of `_.forEach` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */
function arrayEach(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}

/**
 * Creates a base function for methods like `_.forIn` and `_.forOwn`.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseFor(fromRight) {
  return function(object, iteratee, keysFunc) {
    var index = -1,
        iterable = Object(object),
        props = keysFunc(object),
        length = props.length;

    while (length--) {
      var key = props[fromRight ? length : ++index];
      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object;
  };
}

/**
 * The base implementation of `baseForOwn` which iterates over `object`
 * properties returned by `keysFunc` and invokes `iteratee` for each property.
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @returns {Object} Returns `object`.
 */
var baseFor = createBaseFor();

/**
 * The base implementation of `_.forOwn` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Object} Returns `object`.
 */
function baseForOwn(object, iteratee) {
  return object && baseFor(object, iteratee, keys);
}

/**
 * The base implementation of `_.findIndex` and `_.findLastIndex` without
 * support for iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} predicate The function invoked per iteration.
 * @param {number} fromIndex The index to search from.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseFindIndex(array, predicate, fromIndex, fromRight) {
  var length = array.length,
      index = fromIndex + (fromRight ? 1 : -1);

  while ((fromRight ? index-- : ++index < length)) {
    if (predicate(array[index], index, array)) {
      return index;
    }
  }
  return -1;
}

/**
 * The base implementation of `_.isNaN` without support for number objects.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
 */
function baseIsNaN(value) {
  return value !== value;
}

/**
 * A specialized version of `_.indexOf` which performs strict equality
 * comparisons of values, i.e. `===`.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function strictIndexOf(array, value, fromIndex) {
  var index = fromIndex - 1,
      length = array.length;

  while (++index < length) {
    if (array[index] === value) {
      return index;
    }
  }
  return -1;
}

/**
 * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseIndexOf(array, value, fromIndex) {
  return value === value
    ? strictIndexOf(array, value, fromIndex)
    : baseFindIndex(array, baseIsNaN, fromIndex);
}

/**
 * Determines the best order for running the {@link AsyncFunction}s in `tasks`, based on
 * their requirements. Each function can optionally depend on other functions
 * being completed first, and each function is run as soon as its requirements
 * are satisfied.
 *
 * If any of the {@link AsyncFunction}s pass an error to their callback, the `auto` sequence
 * will stop. Further tasks will not execute (so any other functions depending
 * on it will not run), and the main `callback` is immediately called with the
 * error.
 *
 * {@link AsyncFunction}s also receive an object containing the results of functions which
 * have completed so far as the first argument, if they have dependencies. If a
 * task function has no dependencies, it will only be passed a callback.
 *
 * @name auto
 * @static
 * @memberOf module:ControlFlow
 * @method
 * @category Control Flow
 * @param {Object} tasks - An object. Each of its properties is either a
 * function or an array of requirements, with the {@link AsyncFunction} itself the last item
 * in the array. The object's key of a property serves as the name of the task
 * defined by that property, i.e. can be used when specifying requirements for
 * other tasks. The function receives one or two arguments:
 * * a `results` object, containing the results of the previously executed
 *   functions, only passed if the task has any dependencies,
 * * a `callback(err, result)` function, which must be called when finished,
 *   passing an `error` (which can be `null`) and the result of the function's
 *   execution.
 * @param {number} [concurrency=Infinity] - An optional `integer` for
 * determining the maximum number of tasks that can be run in parallel. By
 * default, as many as possible.
 * @param {Function} [callback] - An optional callback which is called when all
 * the tasks have been completed. It receives the `err` argument if any `tasks`
 * pass an error to their callback. Results are always returned; however, if an
 * error occurs, no further `tasks` will be performed, and the results object
 * will only contain partial results. Invoked with (err, results).
 * @returns undefined
 * @example
 *
 * async.auto({
 *     // this function will just be passed a callback
 *     readData: async.apply(fs.readFile, 'data.txt', 'utf-8'),
 *     showData: ['readData', function(results, cb) {
 *         // results.readData is the file's contents
 *         // ...
 *     }]
 * }, callback);
 *
 * async.auto({
 *     get_data: function(callback) {
 *         console.log('in get_data');
 *         // async code to get some data
 *         callback(null, 'data', 'converted to array');
 *     },
 *     make_folder: function(callback) {
 *         console.log('in make_folder');
 *         // async code to create a directory to store a file in
 *         // this is run at the same time as getting the data
 *         callback(null, 'folder');
 *     },
 *     write_file: ['get_data', 'make_folder', function(results, callback) {
 *         console.log('in write_file', JSON.stringify(results));
 *         // once there is some data and the directory exists,
 *         // write the data to a file in the directory
 *         callback(null, 'filename');
 *     }],
 *     email_link: ['write_file', function(results, callback) {
 *         console.log('in email_link', JSON.stringify(results));
 *         // once the file is written let's email a link to it...
 *         // results.write_file contains the filename returned by write_file.
 *         callback(null, {'file':results.write_file, 'email':'user@example.com'});
 *     }]
 * }, function(err, results) {
 *     console.log('err = ', err);
 *     console.log('results = ', results);
 * });
 */
var auto = function (tasks, concurrency, callback) {
    if (typeof concurrency === 'function') {
        // concurrency is optional, shift the args.
        callback = concurrency;
        concurrency = null;
    }
    callback = once(callback || noop);
    var keys$$1 = keys(tasks);
    var numTasks = keys$$1.length;
    if (!numTasks) {
        return callback(null);
    }
    if (!concurrency) {
        concurrency = numTasks;
    }

    var results = {};
    var runningTasks = 0;
    var hasError = false;

    var listeners = Object.create(null);

    var readyTasks = [];

    // for cycle detection:
    var readyToCheck = []; // tasks that have been identified as reachable
    // without the possibility of returning to an ancestor task
    var uncheckedDependencies = {};

    baseForOwn(tasks, function (task, key) {
        if (!isArray(task)) {
            // no dependencies
            enqueueTask(key, [task]);
            readyToCheck.push(key);
            return;
        }

        var dependencies = task.slice(0, task.length - 1);
        var remainingDependencies = dependencies.length;
        if (remainingDependencies === 0) {
            enqueueTask(key, task);
            readyToCheck.push(key);
            return;
        }
        uncheckedDependencies[key] = remainingDependencies;

        arrayEach(dependencies, function (dependencyName) {
            if (!tasks[dependencyName]) {
                throw new Error('async.auto task `' + key +
                    '` has a non-existent dependency `' +
                    dependencyName + '` in ' +
                    dependencies.join(', '));
            }
            addListener(dependencyName, function () {
                remainingDependencies--;
                if (remainingDependencies === 0) {
                    enqueueTask(key, task);
                }
            });
        });
    });

    checkForDeadlocks();
    processQueue();

    function enqueueTask(key, task) {
        readyTasks.push(function () {
            runTask(key, task);
        });
    }

    function processQueue() {
        if (readyTasks.length === 0 && runningTasks === 0) {
            return callback(null, results);
        }
        while(readyTasks.length && runningTasks < concurrency) {
            var run = readyTasks.shift();
            run();
        }

    }

    function addListener(taskName, fn) {
        var taskListeners = listeners[taskName];
        if (!taskListeners) {
            taskListeners = listeners[taskName] = [];
        }

        taskListeners.push(fn);
    }

    function taskComplete(taskName) {
        var taskListeners = listeners[taskName] || [];
        arrayEach(taskListeners, function (fn) {
            fn();
        });
        processQueue();
    }


    function runTask(key, task) {
        if (hasError) return;

        var taskCallback = onlyOnce(function(err, result) {
            runningTasks--;
            if (arguments.length > 2) {
                result = slice(arguments, 1);
            }
            if (err) {
                var safeResults = {};
                baseForOwn(results, function(val, rkey) {
                    safeResults[rkey] = val;
                });
                safeResults[key] = result;
                hasError = true;
                listeners = Object.create(null);

                callback(err, safeResults);
            } else {
                results[key] = result;
                taskComplete(key);
            }
        });

        runningTasks++;
        var taskFn = wrapAsync(task[task.length - 1]);
        if (task.length > 1) {
            taskFn(results, taskCallback);
        } else {
            taskFn(taskCallback);
        }
    }

    function checkForDeadlocks() {
        // Kahn's algorithm
        // https://en.wikipedia.org/wiki/Topological_sorting#Kahn.27s_algorithm
        // http://connalle.blogspot.com/2013/10/topological-sortingkahn-algorithm.html
        var currentTask;
        var counter = 0;
        while (readyToCheck.length) {
            currentTask = readyToCheck.pop();
            counter++;
            arrayEach(getDependents(currentTask), function (dependent) {
                if (--uncheckedDependencies[dependent] === 0) {
                    readyToCheck.push(dependent);
                }
            });
        }

        if (counter !== numTasks) {
            throw new Error(
                'async.auto cannot execute tasks due to a recursive dependency'
            );
        }
    }

    function getDependents(taskName) {
        var result = [];
        baseForOwn(tasks, function (task, key) {
            if (isArray(task) && baseIndexOf(task, taskName, 0) >= 0) {
                result.push(key);
            }
        });
        return result;
    }
};

/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && baseGetTag(value) == symbolTag);
}

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol$1 ? Symbol$1.prototype : undefined;
var symbolToString = symbolProto ? symbolProto.toString : undefined;

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isArray(value)) {
    // Recursively convert values (susceptible to call stack limits).
    return arrayMap(value, baseToString) + '';
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

/**
 * The base implementation of `_.slice` without an iteratee call guard.
 *
 * @private
 * @param {Array} array The array to slice.
 * @param {number} [start=0] The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns the slice of `array`.
 */
function baseSlice(array, start, end) {
  var index = -1,
      length = array.length;

  if (start < 0) {
    start = -start > length ? 0 : (length + start);
  }
  end = end > length ? length : end;
  if (end < 0) {
    end += length;
  }
  length = start > end ? 0 : ((end - start) >>> 0);
  start >>>= 0;

  var result = Array(length);
  while (++index < length) {
    result[index] = array[index + start];
  }
  return result;
}

/**
 * Casts `array` to a slice if it's needed.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {number} start The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns the cast slice.
 */
function castSlice(array, start, end) {
  var length = array.length;
  end = end === undefined ? length : end;
  return (!start && end >= length) ? array : baseSlice(array, start, end);
}

/**
 * Used by `_.trim` and `_.trimEnd` to get the index of the last string symbol
 * that is not found in the character symbols.
 *
 * @private
 * @param {Array} strSymbols The string symbols to inspect.
 * @param {Array} chrSymbols The character symbols to find.
 * @returns {number} Returns the index of the last unmatched string symbol.
 */
function charsEndIndex(strSymbols, chrSymbols) {
  var index = strSymbols.length;

  while (index-- && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {}
  return index;
}

/**
 * Used by `_.trim` and `_.trimStart` to get the index of the first string symbol
 * that is not found in the character symbols.
 *
 * @private
 * @param {Array} strSymbols The string symbols to inspect.
 * @param {Array} chrSymbols The character symbols to find.
 * @returns {number} Returns the index of the first unmatched string symbol.
 */
function charsStartIndex(strSymbols, chrSymbols) {
  var index = -1,
      length = strSymbols.length;

  while (++index < length && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {}
  return index;
}

/**
 * Converts an ASCII `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */
function asciiToArray(string) {
  return string.split('');
}

/** Used to compose unicode character classes. */
var rsAstralRange = '\\ud800-\\udfff';
var rsComboMarksRange = '\\u0300-\\u036f';
var reComboHalfMarksRange = '\\ufe20-\\ufe2f';
var rsComboSymbolsRange = '\\u20d0-\\u20ff';
var rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange;
var rsVarRange = '\\ufe0e\\ufe0f';

/** Used to compose unicode capture groups. */
var rsZWJ = '\\u200d';

/** Used to detect strings with [zero-width joiners or code points from the astral planes](http://eev.ee/blog/2015/09/12/dark-corners-of-unicode/). */
var reHasUnicode = RegExp('[' + rsZWJ + rsAstralRange  + rsComboRange + rsVarRange + ']');

/**
 * Checks if `string` contains Unicode symbols.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {boolean} Returns `true` if a symbol is found, else `false`.
 */
function hasUnicode(string) {
  return reHasUnicode.test(string);
}

/** Used to compose unicode character classes. */
var rsAstralRange$1 = '\\ud800-\\udfff';
var rsComboMarksRange$1 = '\\u0300-\\u036f';
var reComboHalfMarksRange$1 = '\\ufe20-\\ufe2f';
var rsComboSymbolsRange$1 = '\\u20d0-\\u20ff';
var rsComboRange$1 = rsComboMarksRange$1 + reComboHalfMarksRange$1 + rsComboSymbolsRange$1;
var rsVarRange$1 = '\\ufe0e\\ufe0f';

/** Used to compose unicode capture groups. */
var rsAstral = '[' + rsAstralRange$1 + ']';
var rsCombo = '[' + rsComboRange$1 + ']';
var rsFitz = '\\ud83c[\\udffb-\\udfff]';
var rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')';
var rsNonAstral = '[^' + rsAstralRange$1 + ']';
var rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}';
var rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]';
var rsZWJ$1 = '\\u200d';

/** Used to compose unicode regexes. */
var reOptMod = rsModifier + '?';
var rsOptVar = '[' + rsVarRange$1 + ']?';
var rsOptJoin = '(?:' + rsZWJ$1 + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*';
var rsSeq = rsOptVar + reOptMod + rsOptJoin;
var rsSymbol = '(?:' + [rsNonAstral + rsCombo + '?', rsCombo, rsRegional, rsSurrPair, rsAstral].join('|') + ')';

/** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */
var reUnicode = RegExp(rsFitz + '(?=' + rsFitz + ')|' + rsSymbol + rsSeq, 'g');

/**
 * Converts a Unicode `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */
function unicodeToArray(string) {
  return string.match(reUnicode) || [];
}

/**
 * Converts `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */
function stringToArray(string) {
  return hasUnicode(string)
    ? unicodeToArray(string)
    : asciiToArray(string);
}

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  return value == null ? '' : baseToString(value);
}

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/**
 * Removes leading and trailing whitespace or specified characters from `string`.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to trim.
 * @param {string} [chars=whitespace] The characters to trim.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
 * @returns {string} Returns the trimmed string.
 * @example
 *
 * _.trim('  abc  ');
 * // => 'abc'
 *
 * _.trim('-_-abc-_-', '_-');
 * // => 'abc'
 *
 * _.map(['  foo  ', '  bar  '], _.trim);
 * // => ['foo', 'bar']
 */
function trim(string, chars, guard) {
  string = toString(string);
  if (string && (guard || chars === undefined)) {
    return string.replace(reTrim, '');
  }
  if (!string || !(chars = baseToString(chars))) {
    return string;
  }
  var strSymbols = stringToArray(string),
      chrSymbols = stringToArray(chars),
      start = charsStartIndex(strSymbols, chrSymbols),
      end = charsEndIndex(strSymbols, chrSymbols) + 1;

  return castSlice(strSymbols, start, end).join('');
}

var FN_ARGS = /^(?:async\s+)?(function)?\s*[^\(]*\(\s*([^\)]*)\)/m;
var FN_ARG_SPLIT = /,/;
var FN_ARG = /(=.+)?(\s*)$/;
var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;

function parseParams(func) {
    func = func.toString().replace(STRIP_COMMENTS, '');
    func = func.match(FN_ARGS)[2].replace(' ', '');
    func = func ? func.split(FN_ARG_SPLIT) : [];
    func = func.map(function (arg){
        return trim(arg.replace(FN_ARG, ''));
    });
    return func;
}

/**
 * A dependency-injected version of the [async.auto]{@link module:ControlFlow.auto} function. Dependent
 * tasks are specified as parameters to the function, after the usual callback
 * parameter, with the parameter names matching the names of the tasks it
 * depends on. This can provide even more readable task graphs which can be
 * easier to maintain.
 *
 * If a final callback is specified, the task results are similarly injected,
 * specified as named parameters after the initial error parameter.
 *
 * The autoInject function is purely syntactic sugar and its semantics are
 * otherwise equivalent to [async.auto]{@link module:ControlFlow.auto}.
 *
 * @name autoInject
 * @static
 * @memberOf module:ControlFlow
 * @method
 * @see [async.auto]{@link module:ControlFlow.auto}
 * @category Control Flow
 * @param {Object} tasks - An object, each of whose properties is an {@link AsyncFunction} of
 * the form 'func([dependencies...], callback). The object's key of a property
 * serves as the name of the task defined by that property, i.e. can be used
 * when specifying requirements for other tasks.
 * * The `callback` parameter is a `callback(err, result)` which must be called
 *   when finished, passing an `error` (which can be `null`) and the result of
 *   the function's execution. The remaining parameters name other tasks on
 *   which the task is dependent, and the results from those tasks are the
 *   arguments of those parameters.
 * @param {Function} [callback] - An optional callback which is called when all
 * the tasks have been completed. It receives the `err` argument if any `tasks`
 * pass an error to their callback, and a `results` object with any completed
 * task results, similar to `auto`.
 * @example
 *
 * //  The example from `auto` can be rewritten as follows:
 * async.autoInject({
 *     get_data: function(callback) {
 *         // async code to get some data
 *         callback(null, 'data', 'converted to array');
 *     },
 *     make_folder: function(callback) {
 *         // async code to create a directory to store a file in
 *         // this is run at the same time as getting the data
 *         callback(null, 'folder');
 *     },
 *     write_file: function(get_data, make_folder, callback) {
 *         // once there is some data and the directory exists,
 *         // write the data to a file in the directory
 *         callback(null, 'filename');
 *     },
 *     email_link: function(write_file, callback) {
 *         // once the file is written let's email a link to it...
 *         // write_file contains the filename returned by write_file.
 *         callback(null, {'file':write_file, 'email':'user@example.com'});
 *     }
 * }, function(err, results) {
 *     console.log('err = ', err);
 *     console.log('email_link = ', results.email_link);
 * });
 *
 * // If you are using a JS minifier that mangles parameter names, `autoInject`
 * // will not work with plain functions, since the parameter names will be
 * // collapsed to a single letter identifier.  To work around this, you can
 * // explicitly specify the names of the parameters your task function needs
 * // in an array, similar to Angular.js dependency injection.
 *
 * // This still has an advantage over plain `auto`, since the results a task
 * // depends on are still spread into arguments.
 * async.autoInject({
 *     //...
 *     write_file: ['get_data', 'make_folder', function(get_data, make_folder, callback) {
 *         callback(null, 'filename');
 *     }],
 *     email_link: ['write_file', function(write_file, callback) {
 *         callback(null, {'file':write_file, 'email':'user@example.com'});
 *     }]
 *     //...
 * }, function(err, results) {
 *     console.log('err = ', err);
 *     console.log('email_link = ', results.email_link);
 * });
 */
function autoInject(tasks, callback) {
    var newTasks = {};

    baseForOwn(tasks, function (taskFn, key) {
        var params;
        var fnIsAsync = isAsync(taskFn);
        var hasNoDeps =
            (!fnIsAsync && taskFn.length === 1) ||
            (fnIsAsync && taskFn.length === 0);

        if (isArray(taskFn)) {
            params = taskFn.slice(0, -1);
            taskFn = taskFn[taskFn.length - 1];

            newTasks[key] = params.concat(params.length > 0 ? newTask : taskFn);
        } else if (hasNoDeps) {
            // no dependencies, use the function as-is
            newTasks[key] = taskFn;
        } else {
            params = parseParams(taskFn);
            if (taskFn.length === 0 && !fnIsAsync && params.length === 0) {
                throw new Error("autoInject task functions require explicit parameters.");
            }

            // remove callback param
            if (!fnIsAsync) params.pop();

            newTasks[key] = params.concat(newTask);
        }

        function newTask(results, taskCb) {
            var newArgs = arrayMap(params, function (name) {
                return results[name];
            });
            newArgs.push(taskCb);
            wrapAsync(taskFn).apply(null, newArgs);
        }
    });

    auto(newTasks, callback);
}

// Simple doubly linked list (https://en.wikipedia.org/wiki/Doubly_linked_list) implementation
// used for queues. This implementation assumes that the node provided by the user can be modified
// to adjust the next and last properties. We implement only the minimal functionality
// for queue support.
function DLL() {
    this.head = this.tail = null;
    this.length = 0;
}

function setInitial(dll, node) {
    dll.length = 1;
    dll.head = dll.tail = node;
}

DLL.prototype.removeLink = function(node) {
    if (node.prev) node.prev.next = node.next;
    else this.head = node.next;
    if (node.next) node.next.prev = node.prev;
    else this.tail = node.prev;

    node.prev = node.next = null;
    this.length -= 1;
    return node;
};

DLL.prototype.empty = function () {
    while(this.head) this.shift();
    return this;
};

DLL.prototype.insertAfter = function(node, newNode) {
    newNode.prev = node;
    newNode.next = node.next;
    if (node.next) node.next.prev = newNode;
    else this.tail = newNode;
    node.next = newNode;
    this.length += 1;
};

DLL.prototype.insertBefore = function(node, newNode) {
    newNode.prev = node.prev;
    newNode.next = node;
    if (node.prev) node.prev.next = newNode;
    else this.head = newNode;
    node.prev = newNode;
    this.length += 1;
};

DLL.prototype.unshift = function(node) {
    if (this.head) this.insertBefore(this.head, node);
    else setInitial(this, node);
};

DLL.prototype.push = function(node) {
    if (this.tail) this.insertAfter(this.tail, node);
    else setInitial(this, node);
};

DLL.prototype.shift = function() {
    return this.head && this.removeLink(this.head);
};

DLL.prototype.pop = function() {
    return this.tail && this.removeLink(this.tail);
};

DLL.prototype.toArray = function () {
    var arr = Array(this.length);
    var curr = this.head;
    for(var idx = 0; idx < this.length; idx++) {
        arr[idx] = curr.data;
        curr = curr.next;
    }
    return arr;
};

DLL.prototype.remove = function (testFn) {
    var curr = this.head;
    while(!!curr) {
        var next = curr.next;
        if (testFn(curr)) {
            this.removeLink(curr);
        }
        curr = next;
    }
    return this;
};

function queue(worker, concurrency, payload) {
    if (concurrency == null) {
        concurrency = 1;
    }
    else if(concurrency === 0) {
        throw new Error('Concurrency must not be zero');
    }

    var _worker = wrapAsync(worker);
    var numRunning = 0;
    var workersList = [];

    var processingScheduled = false;
    function _insert(data, insertAtFront, callback) {
        if (callback != null && typeof callback !== 'function') {
            throw new Error('task callback must be a function');
        }
        q.started = true;
        if (!isArray(data)) {
            data = [data];
        }
        if (data.length === 0 && q.idle()) {
            // call drain immediately if there are no tasks
            return setImmediate$1(function() {
                q.drain();
            });
        }

        for (var i = 0, l = data.length; i < l; i++) {
            var item = {
                data: data[i],
                callback: callback || noop
            };

            if (insertAtFront) {
                q._tasks.unshift(item);
            } else {
                q._tasks.push(item);
            }
        }

        if (!processingScheduled) {
            processingScheduled = true;
            setImmediate$1(function() {
                processingScheduled = false;
                q.process();
            });
        }
    }

    function _next(tasks) {
        return function(err){
            numRunning -= 1;

            for (var i = 0, l = tasks.length; i < l; i++) {
                var task = tasks[i];

                var index = baseIndexOf(workersList, task, 0);
                if (index === 0) {
                    workersList.shift();
                } else if (index > 0) {
                    workersList.splice(index, 1);
                }

                task.callback.apply(task, arguments);

                if (err != null) {
                    q.error(err, task.data);
                }
            }

            if (numRunning <= (q.concurrency - q.buffer) ) {
                q.unsaturated();
            }

            if (q.idle()) {
                q.drain();
            }
            q.process();
        };
    }

    var isProcessing = false;
    var q = {
        _tasks: new DLL(),
        concurrency: concurrency,
        payload: payload,
        saturated: noop,
        unsaturated:noop,
        buffer: concurrency / 4,
        empty: noop,
        drain: noop,
        error: noop,
        started: false,
        paused: false,
        push: function (data, callback) {
            _insert(data, false, callback);
        },
        kill: function () {
            q.drain = noop;
            q._tasks.empty();
        },
        unshift: function (data, callback) {
            _insert(data, true, callback);
        },
        remove: function (testFn) {
            q._tasks.remove(testFn);
        },
        process: function () {
            // Avoid trying to start too many processing operations. This can occur
            // when callbacks resolve synchronously (#1267).
            if (isProcessing) {
                return;
            }
            isProcessing = true;
            while(!q.paused && numRunning < q.concurrency && q._tasks.length){
                var tasks = [], data = [];
                var l = q._tasks.length;
                if (q.payload) l = Math.min(l, q.payload);
                for (var i = 0; i < l; i++) {
                    var node = q._tasks.shift();
                    tasks.push(node);
                    workersList.push(node);
                    data.push(node.data);
                }

                numRunning += 1;

                if (q._tasks.length === 0) {
                    q.empty();
                }

                if (numRunning === q.concurrency) {
                    q.saturated();
                }

                var cb = onlyOnce(_next(tasks));
                _worker(data, cb);
            }
            isProcessing = false;
        },
        length: function () {
            return q._tasks.length;
        },
        running: function () {
            return numRunning;
        },
        workersList: function () {
            return workersList;
        },
        idle: function() {
            return q._tasks.length + numRunning === 0;
        },
        pause: function () {
            q.paused = true;
        },
        resume: function () {
            if (q.paused === false) { return; }
            q.paused = false;
            setImmediate$1(q.process);
        }
    };
    return q;
}

/**
 * A cargo of tasks for the worker function to complete. Cargo inherits all of
 * the same methods and event callbacks as [`queue`]{@link module:ControlFlow.queue}.
 * @typedef {Object} CargoObject
 * @memberOf module:ControlFlow
 * @property {Function} length - A function returning the number of items
 * waiting to be processed. Invoke like `cargo.length()`.
 * @property {number} payload - An `integer` for determining how many tasks
 * should be process per round. This property can be changed after a `cargo` is
 * created to alter the payload on-the-fly.
 * @property {Function} push - Adds `task` to the `queue`. The callback is
 * called once the `worker` has finished processing the task. Instead of a
 * single task, an array of `tasks` can be submitted. The respective callback is
 * used for every task in the list. Invoke like `cargo.push(task, [callback])`.
 * @property {Function} saturated - A callback that is called when the
 * `queue.length()` hits the concurrency and further tasks will be queued.
 * @property {Function} empty - A callback that is called when the last item
 * from the `queue` is given to a `worker`.
 * @property {Function} drain - A callback that is called when the last item
 * from the `queue` has returned from the `worker`.
 * @property {Function} idle - a function returning false if there are items
 * waiting or being processed, or true if not. Invoke like `cargo.idle()`.
 * @property {Function} pause - a function that pauses the processing of tasks
 * until `resume()` is called. Invoke like `cargo.pause()`.
 * @property {Function} resume - a function that resumes the processing of
 * queued tasks when the queue is paused. Invoke like `cargo.resume()`.
 * @property {Function} kill - a function that removes the `drain` callback and
 * empties remaining tasks from the queue forcing it to go idle. Invoke like `cargo.kill()`.
 */

/**
 * Creates a `cargo` object with the specified payload. Tasks added to the
 * cargo will be processed altogether (up to the `payload` limit). If the
 * `worker` is in progress, the task is queued until it becomes available. Once
 * the `worker` has completed some tasks, each callback of those tasks is
 * called. Check out [these](https://camo.githubusercontent.com/6bbd36f4cf5b35a0f11a96dcd2e97711ffc2fb37/68747470733a2f2f662e636c6f75642e6769746875622e636f6d2f6173736574732f313637363837312f36383130382f62626330636662302d356632392d313165322d393734662d3333393763363464633835382e676966) [animations](https://camo.githubusercontent.com/f4810e00e1c5f5f8addbe3e9f49064fd5d102699/68747470733a2f2f662e636c6f75642e6769746875622e636f6d2f6173736574732f313637363837312f36383130312f38346339323036362d356632392d313165322d383134662d3964336430323431336266642e676966)
 * for how `cargo` and `queue` work.
 *
 * While [`queue`]{@link module:ControlFlow.queue} passes only one task to one of a group of workers
 * at a time, cargo passes an array of tasks to a single worker, repeating
 * when the worker is finished.
 *
 * @name cargo
 * @static
 * @memberOf module:ControlFlow
 * @method
 * @see [async.queue]{@link module:ControlFlow.queue}
 * @category Control Flow
 * @param {AsyncFunction} worker - An asynchronous function for processing an array
 * of queued tasks. Invoked with `(tasks, callback)`.
 * @param {number} [payload=Infinity] - An optional `integer` for determining
 * how many tasks should be processed per round; if omitted, the default is
 * unlimited.
 * @returns {module:ControlFlow.CargoObject} A cargo object to manage the tasks. Callbacks can
 * attached as certain properties to listen for specific events during the
 * lifecycle of the cargo and inner queue.
 * @example
 *
 * // create a cargo object with payload 2
 * var cargo = async.cargo(function(tasks, callback) {
 *     for (var i=0; i<tasks.length; i++) {
 *         console.log('hello ' + tasks[i].name);
 *     }
 *     callback();
 * }, 2);
 *
 * // add some items
 * cargo.push({name: 'foo'}, function(err) {
 *     console.log('finished processing foo');
 * });
 * cargo.push({name: 'bar'}, function(err) {
 *     console.log('finished processing bar');
 * });
 * cargo.push({name: 'baz'}, function(err) {
 *     console.log('finished processing baz');
 * });
 */
function cargo(worker, payload) {
    return queue(worker, 1, payload);
}

/**
 * The same as [`eachOf`]{@link module:Collections.eachOf} but runs only a single async operation at a time.
 *
 * @name eachOfSeries
 * @static
 * @memberOf module:Collections
 * @method
 * @see [async.eachOf]{@link module:Collections.eachOf}
 * @alias forEachOfSeries
 * @category Collection
 * @param {Array|Iterable|Object} coll - A collection to iterate over.
 * @param {AsyncFunction} iteratee - An async function to apply to each item in
 * `coll`.
 * Invoked with (item, key, callback).
 * @param {Function} [callback] - A callback which is called when all `iteratee`
 * functions have finished, or an error occurs. Invoked with (err).
 */
var eachOfSeries = doLimit(eachOfLimit, 1);

/**
 * Reduces `coll` into a single value using an async `iteratee` to return each
 * successive step. `memo` is the initial state of the reduction. This function
 * only operates in series.
 *
 * For performance reasons, it may make sense to split a call to this function
 * into a parallel map, and then use the normal `Array.prototype.reduce` on the
 * results. This function is for situations where each step in the reduction
 * needs to be async; if you can get the data before reducing it, then it's
 * probably a good idea to do so.
 *
 * @name reduce
 * @static
 * @memberOf module:Collections
 * @method
 * @alias inject
 * @alias foldl
 * @category Collection
 * @param {Array|Iterable|Object} coll - A collection to iterate over.
 * @param {*} memo - The initial state of the reduction.
 * @param {AsyncFunction} iteratee - A function applied to each item in the
 * array to produce the next step in the reduction.
 * The `iteratee` should complete with the next state of the reduction.
 * If the iteratee complete with an error, the reduction is stopped and the
 * main `callback` is immediately called with the error.
 * Invoked with (memo, item, callback).
 * @param {Function} [callback] - A callback which is called after all the
 * `iteratee` functions have finished. Result is the reduced value. Invoked with
 * (err, result).
 * @example
 *
 * async.reduce([1,2,3], 0, function(memo, item, callback) {
 *     // pointless async:
 *     process.nextTick(function() {
 *         callback(null, memo + item)
 *     });
 * }, function(err, result) {
 *     // result is now equal to the last value of memo, which is 6
 * });
 */
function reduce(coll, memo, iteratee, callback) {
    callback = once(callback || noop);
    var _iteratee = wrapAsync(iteratee);
    eachOfSeries(coll, function(x, i, callback) {
        _iteratee(memo, x, function(err, v) {
            memo = v;
            callback(err);
        });
    }, function(err) {
        callback(err, memo);
    });
}

/**
 * Version of the compose function that is more natural to read. Each function
 * consumes the return value of the previous function. It is the equivalent of
 * [compose]{@link module:ControlFlow.compose} with the arguments reversed.
 *
 * Each function is executed with the `this` binding of the composed function.
 *
 * @name seq
 * @static
 * @memberOf module:ControlFlow
 * @method
 * @see [async.compose]{@link module:ControlFlow.compose}
 * @category Control Flow
 * @param {...AsyncFunction} functions - the asynchronous functions to compose
 * @returns {Function} a function that composes the `functions` in order
 * @example
 *
 * // Requires lodash (or underscore), express3 and dresende's orm2.
 * // Part of an app, that fetches cats of the logged user.
 * // This example uses `seq` function to avoid overnesting and error
 * // handling clutter.
 * app.get('/cats', function(request, response) {
 *     var User = request.models.User;
 *     async.seq(
 *         _.bind(User.get, User),  // 'User.get' has signature (id, callback(err, data))
 *         function(user, fn) {
 *             user.getCats(fn);      // 'getCats' has signature (callback(err, data))
 *         }
 *     )(req.session.user_id, function (err, cats) {
 *         if (err) {
 *             console.error(err);
 *             response.json({ status: 'error', message: err.message });
 *         } else {
 *             response.json({ status: 'ok', message: 'Cats found', data: cats });
 *         }
 *     });
 * });
 */
function seq(/*...functions*/) {
    var _functions = arrayMap(arguments, wrapAsync);
    return function(/*...args*/) {
        var args = slice(arguments);
        var that = this;

        var cb = args[args.length - 1];
        if (typeof cb == 'function') {
            args.pop();
        } else {
            cb = noop;
        }

        reduce(_functions, args, function(newargs, fn, cb) {
            fn.apply(that, newargs.concat(function(err/*, ...nextargs*/) {
                var nextargs = slice(arguments, 1);
                cb(err, nextargs);
            }));
        },
        function(err, results) {
            cb.apply(that, [err].concat(results));
        });
    };
}

/**
 * Creates a function which is a composition of the passed asynchronous
 * functions. Each function consumes the return value of the function that
 * follows. Composing functions `f()`, `g()`, and `h()` would produce the result
 * of `f(g(h()))`, only this version uses callbacks to obtain the return values.
 *
 * Each function is executed with the `this` binding of the composed function.
 *
 * @name compose
 * @static
 * @memberOf module:ControlFlow
 * @method
 * @category Control Flow
 * @param {...AsyncFunction} functions - the asynchronous functions to compose
 * @returns {Function} an asynchronous function that is the composed
 * asynchronous `functions`
 * @example
 *
 * function add1(n, callback) {
 *     setTimeout(function () {
 *         callback(null, n + 1);
 *     }, 10);
 * }
 *
 * function mul3(n, callback) {
 *     setTimeout(function () {
 *         callback(null, n * 3);
 *     }, 10);
 * }
 *
 * var add1mul3 = async.compose(mul3, add1);
 * add1mul3(4, function (err, result) {
 *     // result now equals 15
 * });
 */
var compose = function(/*...args*/) {
    return seq.apply(null, slice(arguments).reverse());
};

var _concat = Array.prototype.concat;

/**
 * The same as [`concat`]{@link module:Collections.concat} but runs a maximum of `limit` async operations at a time.
 *
 * @name concatLimit
 * @static
 * @memberOf module:Collections
 * @method
 * @see [async.concat]{@link module:Collections.concat}
 * @category Collection
 * @param {Array|Iterable|Object} coll - A collection to iterate over.
 * @param {number} limit - The maximum number of async operations at a time.
 * @param {AsyncFunction} iteratee - A function to apply to each item in `coll`,
 * which should use an array as its result. Invoked with (item, callback).
 * @param {Function} [callback] - A callback which is called after all the
 * `iteratee` functions have finished, or an error occurs. Results is an array
 * containing the concatenated results of the `iteratee` function. Invoked with
 * (err, results).
 */
var concatLimit = function(coll, limit, iteratee, callback) {
    callback = callback || noop;
    var _iteratee = wrapAsync(iteratee);
    mapLimit(coll, limit, function(val, callback) {
        _iteratee(val, function(err /*, ...args*/) {
            if (err) return callback(err);
            return callback(null, slice(arguments, 1));
        });
    }, function(err, mapResults) {
        var result = [];
        for (var i = 0; i < mapResults.length; i++) {
            if (mapResults[i]) {
                result = _concat.apply(result, mapResults[i]);
            }
        }

        return callback(err, result);
    });
};

/**
 * Applies `iteratee` to each item in `coll`, concatenating the results. Returns
 * the concatenated list. The `iteratee`s are called in parallel, and the
 * results are concatenated as they return. There is no guarantee that the
 * results array will be returned in the original order of `coll` passed to the
 * `iteratee` function.
 *
 * @name concat
 * @static
 * @memberOf module:Collections
 * @method
 * @category Collection
 * @param {Array|Iterable|Object} coll - A collection to iterate over.
 * @param {AsyncFunction} iteratee - A function to apply to each item in `coll`,
 * which should use an array as its result. Invoked with (item, callback).
 * @param {Function} [callback(err)] - A callback which is called after all the
 * `iteratee` functions have finished, or an error occurs. Results is an array
 * containing the concatenated results of the `iteratee` function. Invoked with
 * (err, results).
 * @example
 *
 * async.concat(['dir1','dir2','dir3'], fs.readdir, function(err, files) {
 *     // files is now a list of filenames that exist in the 3 directories
 * });
 */
var concat = doLimit(concatLimit, Infinity);

/**
 * The same as [`concat`]{@link module:Collections.concat} but runs only a single async operation at a time.
 *
 * @name concatSeries
 * @static
 * @memberOf module:Collections
 * @method
 * @see [async.concat]{@link module:Collections.concat}
 * @category Collection
 * @param {Array|Iterable|Object} coll - A collection to iterate over.
 * @param {AsyncFunction} iteratee - A function to apply to each item in `coll`.
 * The iteratee should complete with an array an array of results.
 * Invoked with (item, callback).
 * @param {Function} [callback(err)] - A callback which is called after all the
 * `iteratee` functions have finished, or an error occurs. Results is an array
 * containing the concatenated results of the `iteratee` function. Invoked with
 * (err, results).
 */
var concatSeries = doLimit(concatLimit, 1);

/**
 * Returns a function that when called, calls-back with the values provided.
 * Useful as the first function in a [`waterfall`]{@link module:ControlFlow.waterfall}, or for plugging values in to
 * [`auto`]{@link module:ControlFlow.auto}.
 *
 * @name constant
 * @static
 * @memberOf module:Utils
 * @method
 * @category Util
 * @param {...*} arguments... - Any number of arguments to automatically invoke
 * callback with.
 * @returns {AsyncFunction} Returns a function that when invoked, automatically
 * invokes the callback with the previous given arguments.
 * @example
 *
 * async.waterfall([
 *     async.constant(42),
 *     function (value, next) {
 *         // value === 42
 *     },
 *     //...
 * ], callback);
 *
 * async.waterfall([
 *     async.constant(filename, "utf8"),
 *     fs.readFile,
 *     function (fileData, next) {
 *         //...
 *     }
 *     //...
 * ], callback);
 *
 * async.auto({
 *     hostname: async.constant("https://server.net/"),
 *     port: findFreePort,
 *     launchServer: ["hostname", "port", function (options, cb) {
 *         startServer(options, cb);
 *     }],
 *     //...
 * }, callback);
 */
var constant = function(/*...values*/) {
    var values = slice(arguments);
    var args = [null].concat(values);
    return function (/*...ignoredArgs, callback*/) {
        var callback = arguments[arguments.length - 1];
        return callback.apply(this, args);
    };
};

/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

function _createTester(check, getResult) {
    return function(eachfn, arr, iteratee, cb) {
        cb = cb || noop;
        var testPassed = false;
        var testResult;
        eachfn(arr, function(value, _, callback) {
            iteratee(value, function(err, result) {
                if (err) {
                    callback(err);
                } else if (check(result) && !testResult) {
                    testPassed = true;
                    testResult = getResult(true, value);
                    callback(null, breakLoop);
                } else {
                    callback();
                }
            });
        }, function(err) {
            if (err) {
                cb(err);
            } else {
                cb(null, testPassed ? testResult : getResult(false));
            }
        });
    };
}

function _findGetResult(v, x) {
    return x;
}

/**
 * Returns the first value in `coll` that passes an async truth test. The
 * `iteratee` is applied in parallel, meaning the first iteratee to return
 * `true` will fire the detect `callback` with that result. That means the
 * result might not be the first item in the original `coll` (in terms of order)
 * that passes the test.

 * If order within the original `coll` is important, then look at
 * [`detectSeries`]{@link module:Collections.detectSeries}.
 *
 * @name detect
 * @static
 * @memberOf module:Collections
 * @method
 * @alias find
 * @category Collections
 * @param {Array|Iterable|Object} coll - A collection to iterate over.
 * @param {AsyncFunction} iteratee - A truth test to apply to each item in `coll`.
 * The iteratee must complete with a boolean value as its result.
 * Invoked with (item, callback).
 * @param {Function} [callback] - A callback which is called as soon as any
 * iteratee returns `true`, or after all the `iteratee` functions have finished.
 * Result will be the first item in the array that passes the truth test
 * (iteratee) or the value `undefined` if none passed. Invoked with
 * (err, result).
 * @example
 *
 * async.detect(['file1','file2','file3'], function(filePath, callback) {
 *     fs.access(filePath, function(err) {
 *         callback(null, !err)
 *     });
 * }, function(err, result) {
 *     // result now equals the first file in the list that exists
 * });
 */
var detect = doParallel(_createTester(identity, _findGetResult));

/**
 * The same as [`detect`]{@link module:Collections.detect} but runs a maximum of `limit` async operations at a
 * time.
 *
 * @name detectLimit
 * @static
 * @memberOf module:Collections
 * @method
 * @see [async.detect]{@link module:Collections.detect}
 * @alias findLimit
 * @category Collections
 * @param {Array|Iterable|Object} coll - A collection to iterate over.
 * @param {number} limit - The maximum number of async operations at a time.
 * @param {AsyncFunction} iteratee - A truth test to apply to each item in `coll`.
 * The iteratee must complete with a boolean value as its result.
 * Invoked with (item, callback).
 * @param {Function} [callback] - A callback which is called as soon as any
 * iteratee returns `true`, or after all the `iteratee` functions have finished.
 * Result will be the first item in the array that passes the truth test
 * (iteratee) or the value `undefined` if none passed. Invoked with
 * (err, result).
 */
var detectLimit = doParallelLimit(_createTester(identity, _findGetResult));

/**
 * The same as [`detect`]{@link module:Collections.detect} but runs only a single async operation at a time.
 *
 * @name detectSeries
 * @static
 * @memberOf module:Collections
 * @method
 * @see [async.detect]{@link module:Collections.detect}
 * @alias findSeries
 * @category Collections
 * @param {Array|Iterable|Object} coll - A collection to iterate over.
 * @param {AsyncFunction} iteratee - A truth test to apply to each item in `coll`.
 * The iteratee must complete with a boolean value as its result.
 * Invoked with (item, callback).
 * @param {Function} [callback] - A callback which is called as soon as any
 * iteratee returns `true`, or after all the `iteratee` functions have finished.
 * Result will be the first item in the array that passes the truth test
 * (iteratee) or the value `undefined` if none passed. Invoked with
 * (err, result).
 */
var detectSeries = doLimit(detectLimit, 1);

function consoleFunc(name) {
    return function (fn/*, ...args*/) {
        var args = slice(arguments, 1);
        args.push(function (err/*, ...args*/) {
            var args = slice(arguments, 1);
            if (typeof console === 'object') {
                if (err) {
                    if (console.error) {
                        console.error(err);
                    }
                } else if (console[name]) {
                    arrayEach(args, function (x) {
                        console[name](x);
                    });
                }
            }
        });
        wrapAsync(fn).apply(null, args);
    };
}

/**
 * Logs the result of an [`async` function]{@link AsyncFunction} to the
 * `console` using `console.dir` to display the properties of the resulting object.
 * Only works in Node.js or in browsers that support `console.dir` and
 * `console.error` (such as FF and Chrome).
 * If multiple arguments are returned from the async function,
 * `console.dir` is called on each argument in order.
 *
 * @name dir
 * @static
 * @memberOf module:Utils
 * @method
 * @category Util
 * @param {AsyncFunction} function - The function you want to eventually apply
 * all arguments to.
 * @param {...*} arguments... - Any number of arguments to apply to the function.
 * @example
 *
 * // in a module
 * var hello = function(name, callback) {
 *     setTimeout(function() {
 *         callback(null, {hello: name});
 *     }, 1000);
 * };
 *
 * // in the node repl
 * node> async.dir(hello, 'world');
 * {hello: 'world'}
 */
var dir = consoleFunc('dir');

/**
 * The post-check version of [`during`]{@link module:ControlFlow.during}. To reflect the difference in
 * the order of operations, the arguments `test` and `fn` are switched.
 *
 * Also a version of [`doWhilst`]{@link module:ControlFlow.doWhilst} with asynchronous `test` function.
 * @name doDuring
 * @static
 * @memberOf module:ControlFlow
 * @method
 * @see [async.during]{@link module:ControlFlow.during}
 * @category Control Flow
 * @param {AsyncFunction} fn - An async function which is called each time
 * `test` passes. Invoked with (callback).
 * @param {AsyncFunction} test - asynchronous truth test to perform before each
 * execution of `fn`. Invoked with (...args, callback), where `...args` are the
 * non-error args from the previous callback of `fn`.
 * @param {Function} [callback] - A callback which is called after the test
 * function has failed and repeated execution of `fn` has stopped. `callback`
 * will be passed an error if one occurred, otherwise `null`.
 */
function doDuring(fn, test, callback) {
    callback = onlyOnce(callback || noop);
    var _fn = wrapAsync(fn);
    var _test = wrapAsync(test);

    function next(err/*, ...args*/) {
        if (err) return callback(err);
        var args = slice(arguments, 1);
        args.push(check);
        _test.apply(this, args);
    }

    function check(err, truth) {
        if (err) return callback(err);
        if (!truth) return callback(null);
        _fn(next);
    }

    check(null, true);

}

/**
 * The post-check version of [`whilst`]{@link module:ControlFlow.whilst}. To reflect the difference in
 * the order of operations, the arguments `test` and `iteratee` are switched.
 *
 * `doWhilst` is to `whilst` as `do while` is to `while` in plain JavaScript.
 *
 * @name doWhilst
 * @static
 * @memberOf module:ControlFlow
 * @method
 * @see [async.whilst]{@link module:ControlFlow.whilst}
 * @category Control Flow
 * @param {AsyncFunction} iteratee - A function which is called each time `test`
 * passes. Invoked with (callback).
 * @param {Function} test - synchronous truth test to perform after each
 * execution of `iteratee`. Invoked with any non-error callback results of
 * `iteratee`.
 * @param {Function} [callback] - A callback which is called after the test
 * function has failed and repeated execution of `iteratee` has stopped.
 * `callback` will be passed an error and any arguments passed to the final
 * `iteratee`'s callback. Invoked with (err, [results]);
 */
function doWhilst(iteratee, test, callback) {
    callback = onlyOnce(callback || noop);
    var _iteratee = wrapAsync(iteratee);
    var next = function(err/*, ...args*/) {
        if (err) return callback(err);
        var args = slice(arguments, 1);
        if (test.apply(this, args)) return _iteratee(next);
        callback.apply(null, [null].concat(args));
    };
    _iteratee(next);
}

/**
 * Like ['doWhilst']{@link module:ControlFlow.doWhilst}, except the `test` is inverted. Note the
 * argument ordering differs from `until`.
 *
 * @name doUntil
 * @static
 * @memberOf module:ControlFlow
 * @method
 * @see [async.doWhilst]{@link module:ControlFlow.doWhilst}
 * @category Control Flow
 * @param {AsyncFunction} iteratee - An async function which is called each time
 * `test` fails. Invoked with (callback).
 * @param {Function} test - synchronous truth test to perform after each
 * execution of `iteratee`. Invoked with any non-error callback results of
 * `iteratee`.
 * @param {Function} [callback] - A callback which is called after the test
 * function has passed and repeated execution of `iteratee` has stopped. `callback`
 * will be passed an error and any arguments passed to the final `iteratee`'s
 * callback. Invoked with (err, [results]);
 */
function doUntil(iteratee, test, callback) {
    doWhilst(iteratee, function() {
        return !test.apply(this, arguments);
    }, callback);
}

/**
 * Like [`whilst`]{@link module:ControlFlow.whilst}, except the `test` is an asynchronous function that
 * is passed a callback in the form of `function (err, truth)`. If error is
 * passed to `test` or `fn`, the main callback is immediately called with the
 * value of the error.
 *
 * @name during
 * @static
 * @memberOf module:ControlFlow
 * @method
 * @see [async.whilst]{@link module:ControlFlow.whilst}
 * @category Control Flow
 * @param {AsyncFunction} test - asynchronous truth test to perform before each
 * execution of `fn`. Invoked with (callback).
 * @param {AsyncFunction} fn - An async function which is called each time
 * `test` passes. Invoked with (callback).
 * @param {Function} [callback] - A callback which is called after the test
 * function has failed and repeated execution of `fn` has stopped. `callback`
 * will be passed an error, if one occurred, otherwise `null`.
 * @example
 *
 * var count = 0;
 *
 * async.during(
 *     function (callback) {
 *         return callback(null, count < 5);
 *     },
 *     function (callback) {
 *         count++;
 *         setTimeout(callback, 1000);
 *     },
 *     function (err) {
 *         // 5 seconds have passed
 *     }
 * );
 */
function during(test, fn, callback) {
    callback = onlyOnce(callback || noop);
    var _fn = wrapAsync(fn);
    var _test = wrapAsync(test);

    function next(err) {
        if (err) return callback(err);
        _test(check);
    }

    function check(err, truth) {
        if (err) return callback(err);
        if (!truth) return callback(null);
        _fn(next);
    }

    _test(check);
}

function _withoutIndex(iteratee) {
    return function (value, index, callback) {
        return iteratee(value, callback);
    };
}

/**
 * Applies the function `iteratee` to each item in `coll`, in parallel.
 * The `iteratee` is called with an item from the list, and a callback for when
 * it has finished. If the `iteratee` passes an error to its `callback`, the
 * main `callback` (for the `each` function) is immediately called with the
 * error.
 *
 * Note, that since this function applies `iteratee` to each item in parallel,
 * there is no guarantee that the iteratee functions will complete in order.
 *
 * @name each
 * @static
 * @memberOf module:Collections
 * @method
 * @alias forEach
 * @category Collection
 * @param {Array|Iterable|Object} coll - A collection to iterate over.
 * @param {AsyncFunction} iteratee - An async function to apply to
 * each item in `coll`. Invoked with (item, callback).
 * The array index is not passed to the iteratee.
 * If you need the index, use `eachOf`.
 * @param {Function} [callback] - A callback which is called when all
 * `iteratee` functions have finished, or an error occurs. Invoked with (err).
 * @example
 *
 * // assuming openFiles is an array of file names and saveFile is a function
 * // to save the modified contents of that file:
 *
 * async.each(openFiles, saveFile, function(err){
 *   // if any of the saves produced an error, err would equal that error
 * });
 *
 * // assuming openFiles is an array of file names
 * async.each(openFiles, function(file, callback) {
 *
 *     // Perform operation on file here.
 *     console.log('Processing file ' + file);
 *
 *     if( file.length > 32 ) {
 *       console.log('This file name is too long');
 *       callback('File name too long');
 *     } else {
 *       // Do work to process file here
 *       console.log('File processed');
 *       callback();
 *     }
 * }, function(err) {
 *     // if any of the file processing produced an error, err would equal that error
 *     if( err ) {
 *       // One of the iterations produced an error.
 *       // All processing will now stop.
 *       console.log('A file failed to process');
 *     } else {
 *       console.log('All files have been processed successfully');
 *     }
 * });
 */
function eachLimit(coll, iteratee, callback) {
    eachOf(coll, _withoutIndex(wrapAsync(iteratee)), callback);
}

/**
 * The same as [`each`]{@link module:Collections.each} but runs a maximum of `limit` async operations at a time.
 *
 * @name eachLimit
 * @static
 * @memberOf module:Collections
 * @method
 * @see [async.each]{@link module:Collections.each}
 * @alias forEachLimit
 * @category Collection
 * @param {Array|Iterable|Object} coll - A collection to iterate over.
 * @param {number} limit - The maximum number of async operations at a time.
 * @param {AsyncFunction} iteratee - An async function to apply to each item in
 * `coll`.
 * The array index is not passed to the iteratee.
 * If you need the index, use `eachOfLimit`.
 * Invoked with (item, callback).
 * @param {Function} [callback] - A callback which is called when all
 * `iteratee` functions have finished, or an error occurs. Invoked with (err).
 */
function eachLimit$1(coll, limit, iteratee, callback) {
    _eachOfLimit(limit)(coll, _withoutIndex(wrapAsync(iteratee)), callback);
}

/**
 * The same as [`each`]{@link module:Collections.each} but runs only a single async operation at a time.
 *
 * @name eachSeries
 * @static
 * @memberOf module:Collections
 * @method
 * @see [async.each]{@link module:Collections.each}
 * @alias forEachSeries
 * @category Collection
 * @param {Array|Iterable|Object} coll - A collection to iterate over.
 * @param {AsyncFunction} iteratee - An async function to apply to each
 * item in `coll`.
 * The array index is not passed to the iteratee.
 * If you need the index, use `eachOfSeries`.
 * Invoked with (item, callback).
 * @param {Function} [callback] - A callback which is called when all
 * `iteratee` functions have finished, or an error occurs. Invoked with (err).
 */
var eachSeries = doLimit(eachLimit$1, 1);

/**
 * Wrap an async function and ensure it calls its callback on a later tick of
 * the event loop.  If the function already calls its callback on a next tick,
 * no extra deferral is added. This is useful for preventing stack overflows
 * (`RangeError: Maximum call stack size exceeded`) and generally keeping
 * [Zalgo](http://blog.izs.me/post/59142742143/designing-apis-for-asynchrony)
 * contained. ES2017 `async` functions are returned as-is -- they are immune
 * to Zalgo's corrupting influences, as they always resolve on a later tick.
 *
 * @name ensureAsync
 * @static
 * @memberOf module:Utils
 * @method
 * @category Util
 * @param {AsyncFunction} fn - an async function, one that expects a node-style
 * callback as its last argument.
 * @returns {AsyncFunction} Returns a wrapped function with the exact same call
 * signature as the function passed in.
 * @example
 *
 * function sometimesAsync(arg, callback) {
 *     if (cache[arg]) {
 *         return callback(null, cache[arg]); // this would be synchronous!!
 *     } else {
 *         doSomeIO(arg, callback); // this IO would be asynchronous
 *     }
 * }
 *
 * // this has a risk of stack overflows if many results are cached in a row
 * async.mapSeries(args, sometimesAsync, done);
 *
 * // this will defer sometimesAsync's callback if necessary,
 * // preventing stack overflows
 * async.mapSeries(args, async.ensureAsync(sometimesAsync), done);
 */
function ensureAsync(fn) {
    if (isAsync(fn)) return fn;
    return initialParams(function (args, callback) {
        var sync = true;
        args.push(function () {
            var innerArgs = arguments;
            if (sync) {
                setImmediate$1(function () {
                    callback.apply(null, innerArgs);
                });
            } else {
                callback.apply(null, innerArgs);
            }
        });
        fn.apply(this, args);
        sync = false;
    });
}

function notId(v) {
    return !v;
}

/**
 * Returns `true` if every element in `coll` satisfies an async test. If any
 * iteratee call returns `false`, the main `callback` is immediately called.
 *
 * @name every
 * @static
 * @memberOf module:Collections
 * @method
 * @alias all
 * @category Collection
 * @param {Array|Iterable|Object} coll - A collection to iterate over.
 * @param {AsyncFunction} iteratee - An async truth test to apply to each item
 * in the collection in parallel.
 * The iteratee must complete with a boolean result value.
 * Invoked with (item, callback).
 * @param {Function} [callback] - A callback which is called after all the
 * `iteratee` functions have finished. Result will be either `true` or `false`
 * depending on the values of the async tests. Invoked with (err, result).
 * @example
 *
 * async.every(['file1','file2','file3'], function(filePath, callback) {
 *     fs.access(filePath, function(err) {
 *         callback(null, !err)
 *     });
 * }, function(err, result) {
 *     // if result is true then every file exists
 * });
 */
var every = doParallel(_createTester(notId, notId));

/**
 * The same as [`every`]{@link module:Collections.every} but runs a maximum of `limit` async operations at a time.
 *
 * @name everyLimit
 * @static
 * @memberOf module:Collections
 * @method
 * @see [async.every]{@link module:Collections.every}
 * @alias allLimit
 * @category Collection
 * @param {Array|Iterable|Object} coll - A collection to iterate over.
 * @param {number} limit - The maximum number of async operations at a time.
 * @param {AsyncFunction} iteratee - An async truth test to apply to each item
 * in the collection in parallel.
 * The iteratee must complete with a boolean result value.
 * Invoked with (item, callback).
 * @param {Function} [callback] - A callback which is called after all the
 * `iteratee` functions have finished. Result will be either `true` or `false`
 * depending on the values of the async tests. Invoked with (err, result).
 */
var everyLimit = doParallelLimit(_createTester(notId, notId));

/**
 * The same as [`every`]{@link module:Collections.every} but runs only a single async operation at a time.
 *
 * @name everySeries
 * @static
 * @memberOf module:Collections
 * @method
 * @see [async.every]{@link module:Collections.every}
 * @alias allSeries
 * @category Collection
 * @param {Array|Iterable|Object} coll - A collection to iterate over.
 * @param {AsyncFunction} iteratee - An async truth test to apply to each item
 * in the collection in series.
 * The iteratee must complete with a boolean result value.
 * Invoked with (item, callback).
 * @param {Function} [callback] - A callback which is called after all the
 * `iteratee` functions have finished. Result will be either `true` or `false`
 * depending on the values of the async tests. Invoked with (err, result).
 */
var everySeries = doLimit(everyLimit, 1);

/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new accessor function.
 */
function baseProperty(key) {
  return function(object) {
    return object == null ? undefined : object[key];
  };
}

function filterArray(eachfn, arr, iteratee, callback) {
    var truthValues = new Array(arr.length);
    eachfn(arr, function (x, index, callback) {
        iteratee(x, function (err, v) {
            truthValues[index] = !!v;
            callback(err);
        });
    }, function (err) {
        if (err) return callback(err);
        var results = [];
        for (var i = 0; i < arr.length; i++) {
            if (truthValues[i]) results.push(arr[i]);
        }
        callback(null, results);
    });
}

function filterGeneric(eachfn, coll, iteratee, callback) {
    var results = [];
    eachfn(coll, function (x, index, callback) {
        iteratee(x, function (err, v) {
            if (err) {
                callback(err);
            } else {
                if (v) {
                    results.push({index: index, value: x});
                }
                callback();
            }
        });
    }, function (err) {
        if (err) {
            callback(err);
        } else {
            callback(null, arrayMap(results.sort(function (a, b) {
                return a.index - b.index;
            }), baseProperty('value')));
        }
    });
}

function _filter(eachfn, coll, iteratee, callback) {
    var filter = isArrayLike(coll) ? filterArray : filterGeneric;
    filter(eachfn, coll, wrapAsync(iteratee), callback || noop);
}

/**
 * Returns a new array of all the values in `coll` which pass an async truth
 * test. This operation is performed in parallel, but the results array will be
 * in the same order as the original.
 *
 * @name filter
 * @static
 * @memberOf module:Collections
 * @method
 * @alias select
 * @category Collection
 * @param {Array|Iterable|Object} coll - A collection to iterate over.
 * @param {Function} iteratee - A truth test to apply to each item in `coll`.
 * The `iteratee` is passed a `callback(err, truthValue)`, which must be called
 * with a boolean argument once it has completed. Invoked with (item, callback).
 * @param {Function} [callback] - A callback which is called after all the
 * `iteratee` functions have finished. Invoked with (err, results).
 * @example
 *
 * async.filter(['file1','file2','file3'], function(filePath, callback) {
 *     fs.access(filePath, function(err) {
 *         callback(null, !err)
 *     });
 * }, function(err, results) {
 *     // results now equals an array of the existing files
 * });
 */
var filter = doParallel(_filter);

/**
 * The same as [`filter`]{@link module:Collections.filter} but runs a maximum of `limit` async operations at a
 * time.
 *
 * @name filterLimit
 * @static
 * @memberOf module:Collections
 * @method
 * @see [async.filter]{@link module:Collections.filter}
 * @alias selectLimit
 * @category Collection
 * @param {Array|Iterable|Object} coll - A collection to iterate over.
 * @param {number} limit - The maximum number of async operations at a time.
 * @param {Function} iteratee - A truth test to apply to each item in `coll`.
 * The `iteratee` is passed a `callback(err, truthValue)`, which must be called
 * with a boolean argument once it has completed. Invoked with (item, callback).
 * @param {Function} [callback] - A callback which is called after all the
 * `iteratee` functions have finished. Invoked with (err, results).
 */
var filterLimit = doParallelLimit(_filter);

/**
 * The same as [`filter`]{@link module:Collections.filter} but runs only a single async operation at a time.
 *
 * @name filterSeries
 * @static
 * @memberOf module:Collections
 * @method
 * @see [async.filter]{@link module:Collections.filter}
 * @alias selectSeries
 * @category Collection
 * @param {Array|Iterable|Object} coll - A collection to iterate over.
 * @param {Function} iteratee - A truth test to apply to each item in `coll`.
 * The `iteratee` is passed a `callback(err, truthValue)`, which must be called
 * with a boolean argument once it has completed. Invoked with (item, callback).
 * @param {Function} [callback] - A callback which is called after all the
 * `iteratee` functions have finished. Invoked with (err, results)
 */
var filterSeries = doLimit(filterLimit, 1);

/**
 * Calls the asynchronous function `fn` with a callback parameter that allows it
 * to call itself again, in series, indefinitely.

 * If an error is passed to the callback then `errback` is called with the
 * error, and execution stops, otherwise it will never be called.
 *
 * @name forever
 * @static
 * @memberOf module:ControlFlow
 * @method
 * @category Control Flow
 * @param {AsyncFunction} fn - an async function to call repeatedly.
 * Invoked with (next).
 * @param {Function} [errback] - when `fn` passes an error to it's callback,
 * this function will be called, and execution stops. Invoked with (err).
 * @example
 *
 * async.forever(
 *     function(next) {
 *         // next is suitable for passing to things that need a callback(err [, whatever]);
 *         // it will result in this function being called again.
 *     },
 *     function(err) {
 *         // if next is called with a value in its first parameter, it will appear
 *         // in here as 'err', and execution will stop.
 *     }
 * );
 */
function forever(fn, errback) {
    var done = onlyOnce(errback || noop);
    var task = wrapAsync(ensureAsync(fn));

    function next(err) {
        if (err) return done(err);
        task(next);
    }
    next();
}

/**
 * The same as [`groupBy`]{@link module:Collections.groupBy} but runs a maximum of `limit` async operations at a time.
 *
 * @name groupByLimit
 * @static
 * @memberOf module:Collections
 * @method
 * @see [async.groupBy]{@link module:Collections.groupBy}
 * @category Collection
 * @param {Array|Iterable|Object} coll - A collection to iterate over.
 * @param {number} limit - The maximum number of async operations at a time.
 * @param {AsyncFunction} iteratee - An async function to apply to each item in
 * `coll`.
 * The iteratee should complete with a `key` to group the value under.
 * Invoked with (value, callback).
 * @param {Function} [callback] - A callback which is called when all `iteratee`
 * functions have finished, or an error occurs. Result is an `Object` whoses
 * properties are arrays of values which returned the corresponding key.
 */
var groupByLimit = function(coll, limit, iteratee, callback) {
    callback = callback || noop;
    var _iteratee = wrapAsync(iteratee);
    mapLimit(coll, limit, function(val, callback) {
        _iteratee(val, function(err, key) {
            if (err) return callback(err);
            return callback(null, {key: key, val: val});
        });
    }, function(err, mapResults) {
        var result = {};
        // from MDN, handle object having an `hasOwnProperty` prop
        var hasOwnProperty = Object.prototype.hasOwnProperty;

        for (var i = 0; i < mapResults.length; i++) {
            if (mapResults[i]) {
                var key = mapResults[i].key;
                var val = mapResults[i].val;

                if (hasOwnProperty.call(result, key)) {
                    result[key].push(val);
                } else {
                    result[key] = [val];
                }
            }
        }

        return callback(err, result);
    });
};

/**
 * Returns a new object, where each value corresponds to an array of items, from
 * `coll`, that returned the corresponding key. That is, the keys of the object
 * correspond to the values passed to the `iteratee` callback.
 *
 * Note: Since this function applies the `iteratee` to each item in parallel,
 * there is no guarantee that the `iteratee` functions will complete in order.
 * However, the values for each key in the `result` will be in the same order as
 * the original `coll`. For Objects, the values will roughly be in the order of
 * the original Objects' keys (but this can vary across JavaScript engines).
 *
 * @name groupBy
 * @static
 * @memberOf module:Collections
 * @method
 * @category Collection
 * @param {Array|Iterable|Object} coll - A collection to iterate over.
 * @param {AsyncFunction} iteratee - An async function to apply to each item in
 * `coll`.
 * The iteratee should complete with a `key` to group the value under.
 * Invoked with (value, callback).
 * @param {Function} [callback] - A callback which is called when all `iteratee`
 * functions have finished, or an error occurs. Result is an `Object` whoses
 * properties are arrays of values which returned the corresponding key.
 * @example
 *
 * async.groupBy(['userId1', 'userId2', 'userId3'], function(userId, callback) {
 *     db.findById(userId, function(err, user) {
 *         if (err) return callback(err);
 *         return callback(null, user.age);
 *     });
 * }, function(err, result) {
 *     // result is object containing the userIds grouped by age
 *     // e.g. { 30: ['userId1', 'userId3'], 42: ['userId2']};
 * });
 */
var groupBy = doLimit(groupByLimit, Infinity);

/**
 * The same as [`groupBy`]{@link module:Collections.groupBy} but runs only a single async operation at a time.
 *
 * @name groupBySeries
 * @static
 * @memberOf module:Collections
 * @method
 * @see [async.groupBy]{@link module:Collections.groupBy}
 * @category Collection
 * @param {Array|Iterable|Object} coll - A collection to iterate over.
 * @param {number} limit - The maximum number of async operations at a time.
 * @param {AsyncFunction} iteratee - An async function to apply to each item in
 * `coll`.
 * The iteratee should complete with a `key` to group the value under.
 * Invoked with (value, callback).
 * @param {Function} [callback] - A callback which is called when all `iteratee`
 * functions have finished, or an error occurs. Result is an `Object` whoses
 * properties are arrays of values which returned the corresponding key.
 */
var groupBySeries = doLimit(groupByLimit, 1);

/**
 * Logs the result of an `async` function to the `console`. Only works in
 * Node.js or in browsers that support `console.log` and `console.error` (such
 * as FF and Chrome). If multiple arguments are returned from the async
 * function, `console.log` is called on each argument in order.
 *
 * @name log
 * @static
 * @memberOf module:Utils
 * @method
 * @category Util
 * @param {AsyncFunction} function - The function you want to eventually apply
 * all arguments to.
 * @param {...*} arguments... - Any number of arguments to apply to the function.
 * @example
 *
 * // in a module
 * var hello = function(name, callback) {
 *     setTimeout(function() {
 *         callback(null, 'hello ' + name);
 *     }, 1000);
 * };
 *
 * // in the node repl
 * node> async.log(hello, 'world');
 * 'hello world'
 */
var log = consoleFunc('log');

/**
 * The same as [`mapValues`]{@link module:Collections.mapValues} but runs a maximum of `limit` async operations at a
 * time.
 *
 * @name mapValuesLimit
 * @static
 * @memberOf module:Collections
 * @method
 * @see [async.mapValues]{@link module:Collections.mapValues}
 * @category Collection
 * @param {Object} obj - A collection to iterate over.
 * @param {number} limit - The maximum number of async operations at a time.
 * @param {AsyncFunction} iteratee - A function to apply to each value and key
 * in `coll`.
 * The iteratee should complete with the transformed value as its result.
 * Invoked with (value, key, callback).
 * @param {Function} [callback] - A callback which is called when all `iteratee`
 * functions have finished, or an error occurs. `result` is a new object consisting
 * of each key from `obj`, with each transformed value on the right-hand side.
 * Invoked with (err, result).
 */
function mapValuesLimit(obj, limit, iteratee, callback) {
    callback = once(callback || noop);
    var newObj = {};
    var _iteratee = wrapAsync(iteratee);
    eachOfLimit(obj, limit, function(val, key, next) {
        _iteratee(val, key, function (err, result) {
            if (err) return next(err);
            newObj[key] = result;
            next();
        });
    }, function (err) {
        callback(err, newObj);
    });
}

/**
 * A relative of [`map`]{@link module:Collections.map}, designed for use with objects.
 *
 * Produces a new Object by mapping each value of `obj` through the `iteratee`
 * function. The `iteratee` is called each `value` and `key` from `obj` and a
 * callback for when it has finished processing. Each of these callbacks takes
 * two arguments: an `error`, and the transformed item from `obj`. If `iteratee`
 * passes an error to its callback, the main `callback` (for the `mapValues`
 * function) is immediately called with the error.
 *
 * Note, the order of the keys in the result is not guaranteed.  The keys will
 * be roughly in the order they complete, (but this is very engine-specific)
 *
 * @name mapValues
 * @static
 * @memberOf module:Collections
 * @method
 * @category Collection
 * @param {Object} obj - A collection to iterate over.
 * @param {AsyncFunction} iteratee - A function to apply to each value and key
 * in `coll`.
 * The iteratee should complete with the transformed value as its result.
 * Invoked with (value, key, callback).
 * @param {Function} [callback] - A callback which is called when all `iteratee`
 * functions have finished, or an error occurs. `result` is a new object consisting
 * of each key from `obj`, with each transformed value on the right-hand side.
 * Invoked with (err, result).
 * @example
 *
 * async.mapValues({
 *     f1: 'file1',
 *     f2: 'file2',
 *     f3: 'file3'
 * }, function (file, key, callback) {
 *   fs.stat(file, callback);
 * }, function(err, result) {
 *     // result is now a map of stats for each file, e.g.
 *     // {
 *     //     f1: [stats for file1],
 *     //     f2: [stats for file2],
 *     //     f3: [stats for file3]
 *     // }
 * });
 */

var mapValues = doLimit(mapValuesLimit, Infinity);

/**
 * The same as [`mapValues`]{@link module:Collections.mapValues} but runs only a single async operation at a time.
 *
 * @name mapValuesSeries
 * @static
 * @memberOf module:Collections
 * @method
 * @see [async.mapValues]{@link module:Collections.mapValues}
 * @category Collection
 * @param {Object} obj - A collection to iterate over.
 * @param {AsyncFunction} iteratee - A function to apply to each value and key
 * in `coll`.
 * The iteratee should complete with the transformed value as its result.
 * Invoked with (value, key, callback).
 * @param {Function} [callback] - A callback which is called when all `iteratee`
 * functions have finished, or an error occurs. `result` is a new object consisting
 * of each key from `obj`, with each transformed value on the right-hand side.
 * Invoked with (err, result).
 */
var mapValuesSeries = doLimit(mapValuesLimit, 1);

function has(obj, key) {
    return key in obj;
}

/**
 * Caches the results of an async function. When creating a hash to store
 * function results against, the callback is omitted from the hash and an
 * optional hash function can be used.
 *
 * If no hash function is specified, the first argument is used as a hash key,
 * which may work reasonably if it is a string or a data type that converts to a
 * distinct string. Note that objects and arrays will not behave reasonably.
 * Neither will cases where the other arguments are significant. In such cases,
 * specify your own hash function.
 *
 * The cache of results is exposed as the `memo` property of the function
 * returned by `memoize`.
 *
 * @name memoize
 * @static
 * @memberOf module:Utils
 * @method
 * @category Util
 * @param {AsyncFunction} fn - The async function to proxy and cache results from.
 * @param {Function} hasher - An optional function for generating a custom hash
 * for storing results. It has all the arguments applied to it apart from the
 * callback, and must be synchronous.
 * @returns {AsyncFunction} a memoized version of `fn`
 * @example
 *
 * var slow_fn = function(name, callback) {
 *     // do something
 *     callback(null, result);
 * };
 * var fn = async.memoize(slow_fn);
 *
 * // fn can now be used as if it were slow_fn
 * fn('some name', function() {
 *     // callback
 * });
 */
function memoize(fn, hasher) {
    var memo = Object.create(null);
    var queues = Object.create(null);
    hasher = hasher || identity;
    var _fn = wrapAsync(fn);
    var memoized = initialParams(function memoized(args, callback) {
        var key = hasher.apply(null, args);
        if (has(memo, key)) {
            setImmediate$1(function() {
                callback.apply(null, memo[key]);
            });
        } else if (has(queues, key)) {
            queues[key].push(callback);
        } else {
            queues[key] = [callback];
            _fn.apply(null, args.concat(function(/*args*/) {
                var args = slice(arguments);
                memo[key] = args;
                var q = queues[key];
                delete queues[key];
                for (var i = 0, l = q.length; i < l; i++) {
                    q[i].apply(null, args);
                }
            }));
        }
    });
    memoized.memo = memo;
    memoized.unmemoized = fn;
    return memoized;
}

/**
 * Calls `callback` on a later loop around the event loop. In Node.js this just
 * calls `process.nextTick`.  In the browser it will use `setImmediate` if
 * available, otherwise `setTimeout(callback, 0)`, which means other higher
 * priority events may precede the execution of `callback`.
 *
 * This is used internally for browser-compatibility purposes.
 *
 * @name nextTick
 * @static
 * @memberOf module:Utils
 * @method
 * @see [async.setImmediate]{@link module:Utils.setImmediate}
 * @category Util
 * @param {Function} callback - The function to call on a later loop around
 * the event loop. Invoked with (args...).
 * @param {...*} args... - any number of additional arguments to pass to the
 * callback on the next tick.
 * @example
 *
 * var call_order = [];
 * async.nextTick(function() {
 *     call_order.push('two');
 *     // call_order now equals ['one','two']
 * });
 * call_order.push('one');
 *
 * async.setImmediate(function (a, b, c) {
 *     // a, b, and c equal 1, 2, and 3
 * }, 1, 2, 3);
 */
var _defer$1;

if (hasNextTick) {
    _defer$1 = process.nextTick;
} else if (hasSetImmediate) {
    _defer$1 = setImmediate;
} else {
    _defer$1 = fallback;
}

var nextTick = wrap(_defer$1);

function _parallel(eachfn, tasks, callback) {
    callback = callback || noop;
    var results = isArrayLike(tasks) ? [] : {};

    eachfn(tasks, function (task, key, callback) {
        wrapAsync(task)(function (err, result) {
            if (arguments.length > 2) {
                result = slice(arguments, 1);
            }
            results[key] = result;
            callback(err);
        });
    }, function (err) {
        callback(err, results);
    });
}

/**
 * Run the `tasks` collection of functions in parallel, without waiting until
 * the previous function has completed. If any of the functions pass an error to
 * its callback, the main `callback` is immediately called with the value of the
 * error. Once the `tasks` have completed, the results are passed to the final
 * `callback` as an array.
 *
 * **Note:** `parallel` is about kicking-off I/O tasks in parallel, not about
 * parallel execution of code.  If your tasks do not use any timers or perform
 * any I/O, they will actually be executed in series.  Any synchronous setup
 * sections for each task will happen one after the other.  JavaScript remains
 * single-threaded.
 *
 * **Hint:** Use [`reflect`]{@link module:Utils.reflect} to continue the
 * execution of other tasks when a task fails.
 *
 * It is also possible to use an object instead of an array. Each property will
 * be run as a function and the results will be passed to the final `callback`
 * as an object instead of an array. This can be a more readable way of handling
 * results from {@link async.parallel}.
 *
 * @name parallel
 * @static
 * @memberOf module:ControlFlow
 * @method
 * @category Control Flow
 * @param {Array|Iterable|Object} tasks - A collection of
 * [async functions]{@link AsyncFunction} to run.
 * Each async function can complete with any number of optional `result` values.
 * @param {Function} [callback] - An optional callback to run once all the
 * functions have completed successfully. This function gets a results array
 * (or object) containing all the result arguments passed to the task callbacks.
 * Invoked with (err, results).
 *
 * @example
 * async.parallel([
 *     function(callback) {
 *         setTimeout(function() {
 *             callback(null, 'one');
 *         }, 200);
 *     },
 *     function(callback) {
 *         setTimeout(function() {
 *             callback(null, 'two');
 *         }, 100);
 *     }
 * ],
 * // optional callback
 * function(err, results) {
 *     // the results array will equal ['one','two'] even though
 *     // the second function had a shorter timeout.
 * });
 *
 * // an example using an object instead of an array
 * async.parallel({
 *     one: function(callback) {
 *         setTimeout(function() {
 *             callback(null, 1);
 *         }, 200);
 *     },
 *     two: function(callback) {
 *         setTimeout(function() {
 *             callback(null, 2);
 *         }, 100);
 *     }
 * }, function(err, results) {
 *     // results is now equals to: {one: 1, two: 2}
 * });
 */
function parallelLimit(tasks, callback) {
    _parallel(eachOf, tasks, callback);
}

/**
 * The same as [`parallel`]{@link module:ControlFlow.parallel} but runs a maximum of `limit` async operations at a
 * time.
 *
 * @name parallelLimit
 * @static
 * @memberOf module:ControlFlow
 * @method
 * @see [async.parallel]{@link module:ControlFlow.parallel}
 * @category Control Flow
 * @param {Array|Iterable|Object} tasks - A collection of
 * [async functions]{@link AsyncFunction} to run.
 * Each async function can complete with any number of optional `result` values.
 * @param {number} limit - The maximum number of async operations at a time.
 * @param {Function} [callback] - An optional callback to run once all the
 * functions have completed successfully. This function gets a results array
 * (or object) containing all the result arguments passed to the task callbacks.
 * Invoked with (err, results).
 */
function parallelLimit$1(tasks, limit, callback) {
    _parallel(_eachOfLimit(limit), tasks, callback);
}

/**
 * A queue of tasks for the worker function to complete.
 * @typedef {Object} QueueObject
 * @memberOf module:ControlFlow
 * @property {Function} length - a function returning the number of items
 * waiting to be processed. Invoke with `queue.length()`.
 * @property {boolean} started - a boolean indicating whether or not any
 * items have been pushed and processed by the queue.
 * @property {Function} running - a function returning the number of items
 * currently being processed. Invoke with `queue.running()`.
 * @property {Function} workersList - a function returning the array of items
 * currently being processed. Invoke with `queue.workersList()`.
 * @property {Function} idle - a function returning false if there are items
 * waiting or being processed, or true if not. Invoke with `queue.idle()`.
 * @property {number} concurrency - an integer for determining how many `worker`
 * functions should be run in parallel. This property can be changed after a
 * `queue` is created to alter the concurrency on-the-fly.
 * @property {Function} push - add a new task to the `queue`. Calls `callback`
 * once the `worker` has finished processing the task. Instead of a single task,
 * a `tasks` array can be submitted. The respective callback is used for every
 * task in the list. Invoke with `queue.push(task, [callback])`,
 * @property {Function} unshift - add a new task to the front of the `queue`.
 * Invoke with `queue.unshift(task, [callback])`.
 * @property {Function} remove - remove items from the queue that match a test
 * function.  The test function will be passed an object with a `data` property,
 * and a `priority` property, if this is a
 * [priorityQueue]{@link module:ControlFlow.priorityQueue} object.
 * Invoked with `queue.remove(testFn)`, where `testFn` is of the form
 * `function ({data, priority}) {}` and returns a Boolean.
 * @property {Function} saturated - a callback that is called when the number of
 * running workers hits the `concurrency` limit, and further tasks will be
 * queued.
 * @property {Function} unsaturated - a callback that is called when the number
 * of running workers is less than the `concurrency` & `buffer` limits, and
 * further tasks will not be queued.
 * @property {number} buffer - A minimum threshold buffer in order to say that
 * the `queue` is `unsaturated`.
 * @property {Function} empty - a callback that is called when the last item
 * from the `queue` is given to a `worker`.
 * @property {Function} drain - a callback that is called when the last item
 * from the `queue` has returned from the `worker`.
 * @property {Function} error - a callback that is called when a task errors.
 * Has the signature `function(error, task)`.
 * @property {boolean} paused - a boolean for determining whether the queue is
 * in a paused state.
 * @property {Function} pause - a function that pauses the processing of tasks
 * until `resume()` is called. Invoke with `queue.pause()`.
 * @property {Function} resume - a function that resumes the processing of
 * queued tasks when the queue is paused. Invoke with `queue.resume()`.
 * @property {Function} kill - a function that removes the `drain` callback and
 * empties remaining tasks from the queue forcing it to go idle. No more tasks
 * should be pushed to the queue after calling this function. Invoke with `queue.kill()`.
 */

/**
 * Creates a `queue` object with the specified `concurrency`. Tasks added to the
 * `queue` are processed in parallel (up to the `concurrency` limit). If all
 * `worker`s are in progress, the task is queued until one becomes available.
 * Once a `worker` completes a `task`, that `task`'s callback is called.
 *
 * @name queue
 * @static
 * @memberOf module:ControlFlow
 * @method
 * @category Control Flow
 * @param {AsyncFunction} worker - An async function for processing a queued task.
 * If you want to handle errors from an individual task, pass a callback to
 * `q.push()`. Invoked with (task, callback).
 * @param {number} [concurrency=1] - An `integer` for determining how many
 * `worker` functions should be run in parallel.  If omitted, the concurrency
 * defaults to `1`.  If the concurrency is `0`, an error is thrown.
 * @returns {module:ControlFlow.QueueObject} A queue object to manage the tasks. Callbacks can
 * attached as certain properties to listen for specific events during the
 * lifecycle of the queue.
 * @example
 *
 * // create a queue object with concurrency 2
 * var q = async.queue(function(task, callback) {
 *     console.log('hello ' + task.name);
 *     callback();
 * }, 2);
 *
 * // assign a callback
 * q.drain = function() {
 *     console.log('all items have been processed');
 * };
 *
 * // add some items to the queue
 * q.push({name: 'foo'}, function(err) {
 *     console.log('finished processing foo');
 * });
 * q.push({name: 'bar'}, function (err) {
 *     console.log('finished processing bar');
 * });
 *
 * // add some items to the queue (batch-wise)
 * q.push([{name: 'baz'},{name: 'bay'},{name: 'bax'}], function(err) {
 *     console.log('finished processing item');
 * });
 *
 * // add some items to the front of the queue
 * q.unshift({name: 'bar'}, function (err) {
 *     console.log('finished processing bar');
 * });
 */
var queue$1 = function (worker, concurrency) {
    var _worker = wrapAsync(worker);
    return queue(function (items, cb) {
        _worker(items[0], cb);
    }, concurrency, 1);
};

/**
 * The same as [async.queue]{@link module:ControlFlow.queue} only tasks are assigned a priority and
 * completed in ascending priority order.
 *
 * @name priorityQueue
 * @static
 * @memberOf module:ControlFlow
 * @method
 * @see [async.queue]{@link module:ControlFlow.queue}
 * @category Control Flow
 * @param {AsyncFunction} worker - An async function for processing a queued task.
 * If you want to handle errors from an individual task, pass a callback to
 * `q.push()`.
 * Invoked with (task, callback).
 * @param {number} concurrency - An `integer` for determining how many `worker`
 * functions should be run in parallel.  If omitted, the concurrency defaults to
 * `1`.  If the concurrency is `0`, an error is thrown.
 * @returns {module:ControlFlow.QueueObject} A priorityQueue object to manage the tasks. There are two
 * differences between `queue` and `priorityQueue` objects:
 * * `push(task, priority, [callback])` - `priority` should be a number. If an
 *   array of `tasks` is given, all tasks will be assigned the same priority.
 * * The `unshift` method was removed.
 */
var priorityQueue = function(worker, concurrency) {
    // Start with a normal queue
    var q = queue$1(worker, concurrency);

    // Override push to accept second parameter representing priority
    q.push = function(data, priority, callback) {
        if (callback == null) callback = noop;
        if (typeof callback !== 'function') {
            throw new Error('task callback must be a function');
        }
        q.started = true;
        if (!isArray(data)) {
            data = [data];
        }
        if (data.length === 0) {
            // call drain immediately if there are no tasks
            return setImmediate$1(function() {
                q.drain();
            });
        }

        priority = priority || 0;
        var nextNode = q._tasks.head;
        while (nextNode && priority >= nextNode.priority) {
            nextNode = nextNode.next;
        }

        for (var i = 0, l = data.length; i < l; i++) {
            var item = {
                data: data[i],
                priority: priority,
                callback: callback
            };

            if (nextNode) {
                q._tasks.insertBefore(nextNode, item);
            } else {
                q._tasks.push(item);
            }
        }
        setImmediate$1(q.process);
    };

    // Remove unshift function
    delete q.unshift;

    return q;
};

/**
 * Runs the `tasks` array of functions in parallel, without waiting until the
 * previous function has completed. Once any of the `tasks` complete or pass an
 * error to its callback, the main `callback` is immediately called. It's
 * equivalent to `Promise.race()`.
 *
 * @name race
 * @static
 * @memberOf module:ControlFlow
 * @method
 * @category Control Flow
 * @param {Array} tasks - An array containing [async functions]{@link AsyncFunction}
 * to run. Each function can complete with an optional `result` value.
 * @param {Function} callback - A callback to run once any of the functions have
 * completed. This function gets an error or result from the first function that
 * completed. Invoked with (err, result).
 * @returns undefined
 * @example
 *
 * async.race([
 *     function(callback) {
 *         setTimeout(function() {
 *             callback(null, 'one');
 *         }, 200);
 *     },
 *     function(callback) {
 *         setTimeout(function() {
 *             callback(null, 'two');
 *         }, 100);
 *     }
 * ],
 * // main callback
 * function(err, result) {
 *     // the result will be equal to 'two' as it finishes earlier
 * });
 */
function race(tasks, callback) {
    callback = once(callback || noop);
    if (!isArray(tasks)) return callback(new TypeError('First argument to race must be an array of functions'));
    if (!tasks.length) return callback();
    for (var i = 0, l = tasks.length; i < l; i++) {
        wrapAsync(tasks[i])(callback);
    }
}

/**
 * Same as [`reduce`]{@link module:Collections.reduce}, only operates on `array` in reverse order.
 *
 * @name reduceRight
 * @static
 * @memberOf module:Collections
 * @method
 * @see [async.reduce]{@link module:Collections.reduce}
 * @alias foldr
 * @category Collection
 * @param {Array} array - A collection to iterate over.
 * @param {*} memo - The initial state of the reduction.
 * @param {AsyncFunction} iteratee - A function applied to each item in the
 * array to produce the next step in the reduction.
 * The `iteratee` should complete with the next state of the reduction.
 * If the iteratee complete with an error, the reduction is stopped and the
 * main `callback` is immediately called with the error.
 * Invoked with (memo, item, callback).
 * @param {Function} [callback] - A callback which is called after all the
 * `iteratee` functions have finished. Result is the reduced value. Invoked with
 * (err, result).
 */
function reduceRight (array, memo, iteratee, callback) {
    var reversed = slice(array).reverse();
    reduce(reversed, memo, iteratee, callback);
}

/**
 * Wraps the async function in another function that always completes with a
 * result object, even when it errors.
 *
 * The result object has either the property `error` or `value`.
 *
 * @name reflect
 * @static
 * @memberOf module:Utils
 * @method
 * @category Util
 * @param {AsyncFunction} fn - The async function you want to wrap
 * @returns {Function} - A function that always passes null to it's callback as
 * the error. The second argument to the callback will be an `object` with
 * either an `error` or a `value` property.
 * @example
 *
 * async.parallel([
 *     async.reflect(function(callback) {
 *         // do some stuff ...
 *         callback(null, 'one');
 *     }),
 *     async.reflect(function(callback) {
 *         // do some more stuff but error ...
 *         callback('bad stuff happened');
 *     }),
 *     async.reflect(function(callback) {
 *         // do some more stuff ...
 *         callback(null, 'two');
 *     })
 * ],
 * // optional callback
 * function(err, results) {
 *     // values
 *     // results[0].value = 'one'
 *     // results[1].error = 'bad stuff happened'
 *     // results[2].value = 'two'
 * });
 */
function reflect(fn) {
    var _fn = wrapAsync(fn);
    return initialParams(function reflectOn(args, reflectCallback) {
        args.push(function callback(error, cbArg) {
            if (error) {
                reflectCallback(null, { error: error });
            } else {
                var value;
                if (arguments.length <= 2) {
                    value = cbArg;
                } else {
                    value = slice(arguments, 1);
                }
                reflectCallback(null, { value: value });
            }
        });

        return _fn.apply(this, args);
    });
}

/**
 * A helper function that wraps an array or an object of functions with `reflect`.
 *
 * @name reflectAll
 * @static
 * @memberOf module:Utils
 * @method
 * @see [async.reflect]{@link module:Utils.reflect}
 * @category Util
 * @param {Array|Object|Iterable} tasks - The collection of
 * [async functions]{@link AsyncFunction} to wrap in `async.reflect`.
 * @returns {Array} Returns an array of async functions, each wrapped in
 * `async.reflect`
 * @example
 *
 * let tasks = [
 *     function(callback) {
 *         setTimeout(function() {
 *             callback(null, 'one');
 *         }, 200);
 *     },
 *     function(callback) {
 *         // do some more stuff but error ...
 *         callback(new Error('bad stuff happened'));
 *     },
 *     function(callback) {
 *         setTimeout(function() {
 *             callback(null, 'two');
 *         }, 100);
 *     }
 * ];
 *
 * async.parallel(async.reflectAll(tasks),
 * // optional callback
 * function(err, results) {
 *     // values
 *     // results[0].value = 'one'
 *     // results[1].error = Error('bad stuff happened')
 *     // results[2].value = 'two'
 * });
 *
 * // an example using an object instead of an array
 * let tasks = {
 *     one: function(callback) {
 *         setTimeout(function() {
 *             callback(null, 'one');
 *         }, 200);
 *     },
 *     two: function(callback) {
 *         callback('two');
 *     },
 *     three: function(callback) {
 *         setTimeout(function() {
 *             callback(null, 'three');
 *         }, 100);
 *     }
 * };
 *
 * async.parallel(async.reflectAll(tasks),
 * // optional callback
 * function(err, results) {
 *     // values
 *     // results.one.value = 'one'
 *     // results.two.error = 'two'
 *     // results.three.value = 'three'
 * });
 */
function reflectAll(tasks) {
    var results;
    if (isArray(tasks)) {
        results = arrayMap(tasks, reflect);
    } else {
        results = {};
        baseForOwn(tasks, function(task, key) {
            results[key] = reflect.call(this, task);
        });
    }
    return results;
}

function reject$1(eachfn, arr, iteratee, callback) {
    _filter(eachfn, arr, function(value, cb) {
        iteratee(value, function(err, v) {
            cb(err, !v);
        });
    }, callback);
}

/**
 * The opposite of [`filter`]{@link module:Collections.filter}. Removes values that pass an `async` truth test.
 *
 * @name reject
 * @static
 * @memberOf module:Collections
 * @method
 * @see [async.filter]{@link module:Collections.filter}
 * @category Collection
 * @param {Array|Iterable|Object} coll - A collection to iterate over.
 * @param {Function} iteratee - An async truth test to apply to each item in
 * `coll`.
 * The should complete with a boolean value as its `result`.
 * Invoked with (item, callback).
 * @param {Function} [callback] - A callback which is called after all the
 * `iteratee` functions have finished. Invoked with (err, results).
 * @example
 *
 * async.reject(['file1','file2','file3'], function(filePath, callback) {
 *     fs.access(filePath, function(err) {
 *         callback(null, !err)
 *     });
 * }, function(err, results) {
 *     // results now equals an array of missing files
 *     createFiles(results);
 * });
 */
var reject = doParallel(reject$1);

/**
 * The same as [`reject`]{@link module:Collections.reject} but runs a maximum of `limit` async operations at a
 * time.
 *
 * @name rejectLimit
 * @static
 * @memberOf module:Collections
 * @method
 * @see [async.reject]{@link module:Collections.reject}
 * @category Collection
 * @param {Array|Iterable|Object} coll - A collection to iterate over.
 * @param {number} limit - The maximum number of async operations at a time.
 * @param {Function} iteratee - An async truth test to apply to each item in
 * `coll`.
 * The should complete with a boolean value as its `result`.
 * Invoked with (item, callback).
 * @param {Function} [callback] - A callback which is called after all the
 * `iteratee` functions have finished. Invoked with (err, results).
 */
var rejectLimit = doParallelLimit(reject$1);

/**
 * The same as [`reject`]{@link module:Collections.reject} but runs only a single async operation at a time.
 *
 * @name rejectSeries
 * @static
 * @memberOf module:Collections
 * @method
 * @see [async.reject]{@link module:Collections.reject}
 * @category Collection
 * @param {Array|Iterable|Object} coll - A collection to iterate over.
 * @param {Function} iteratee - An async truth test to apply to each item in
 * `coll`.
 * The should complete with a boolean value as its `result`.
 * Invoked with (item, callback).
 * @param {Function} [callback] - A callback which is called after all the
 * `iteratee` functions have finished. Invoked with (err, results).
 */
var rejectSeries = doLimit(rejectLimit, 1);

/**
 * Creates a function that returns `value`.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {*} value The value to return from the new function.
 * @returns {Function} Returns the new constant function.
 * @example
 *
 * var objects = _.times(2, _.constant({ 'a': 1 }));
 *
 * console.log(objects);
 * // => [{ 'a': 1 }, { 'a': 1 }]
 *
 * console.log(objects[0] === objects[1]);
 * // => true
 */
function constant$1(value) {
  return function() {
    return value;
  };
}

/**
 * Attempts to get a successful response from `task` no more than `times` times
 * before returning an error. If the task is successful, the `callback` will be
 * passed the result of the successful task. If all attempts fail, the callback
 * will be passed the error and result (if any) of the final attempt.
 *
 * @name retry
 * @static
 * @memberOf module:ControlFlow
 * @method
 * @category Control Flow
 * @see [async.retryable]{@link module:ControlFlow.retryable}
 * @param {Object|number} [opts = {times: 5, interval: 0}| 5] - Can be either an
 * object with `times` and `interval` or a number.
 * * `times` - The number of attempts to make before giving up.  The default
 *   is `5`.
 * * `interval` - The time to wait between retries, in milliseconds.  The
 *   default is `0`. The interval may also be specified as a function of the
 *   retry count (see example).
 * * `errorFilter` - An optional synchronous function that is invoked on
 *   erroneous result. If it returns `true` the retry attempts will continue;
 *   if the function returns `false` the retry flow is aborted with the current
 *   attempt's error and result being returned to the final callback.
 *   Invoked with (err).
 * * If `opts` is a number, the number specifies the number of times to retry,
 *   with the default interval of `0`.
 * @param {AsyncFunction} task - An async function to retry.
 * Invoked with (callback).
 * @param {Function} [callback] - An optional callback which is called when the
 * task has succeeded, or after the final failed attempt. It receives the `err`
 * and `result` arguments of the last attempt at completing the `task`. Invoked
 * with (err, results).
 *
 * @example
 *
 * // The `retry` function can be used as a stand-alone control flow by passing
 * // a callback, as shown below:
 *
 * // try calling apiMethod 3 times
 * async.retry(3, apiMethod, function(err, result) {
 *     // do something with the result
 * });
 *
 * // try calling apiMethod 3 times, waiting 200 ms between each retry
 * async.retry({times: 3, interval: 200}, apiMethod, function(err, result) {
 *     // do something with the result
 * });
 *
 * // try calling apiMethod 10 times with exponential backoff
 * // (i.e. intervals of 100, 200, 400, 800, 1600, ... milliseconds)
 * async.retry({
 *   times: 10,
 *   interval: function(retryCount) {
 *     return 50 * Math.pow(2, retryCount);
 *   }
 * }, apiMethod, function(err, result) {
 *     // do something with the result
 * });
 *
 * // try calling apiMethod the default 5 times no delay between each retry
 * async.retry(apiMethod, function(err, result) {
 *     // do something with the result
 * });
 *
 * // try calling apiMethod only when error condition satisfies, all other
 * // errors will abort the retry control flow and return to final callback
 * async.retry({
 *   errorFilter: function(err) {
 *     return err.message === 'Temporary error'; // only retry on a specific error
 *   }
 * }, apiMethod, function(err, result) {
 *     // do something with the result
 * });
 *
 * // to retry individual methods that are not as reliable within other
 * // control flow functions, use the `retryable` wrapper:
 * async.auto({
 *     users: api.getUsers.bind(api),
 *     payments: async.retryable(3, api.getPayments.bind(api))
 * }, function(err, results) {
 *     // do something with the results
 * });
 *
 */
function retry(opts, task, callback) {
    var DEFAULT_TIMES = 5;
    var DEFAULT_INTERVAL = 0;

    var options = {
        times: DEFAULT_TIMES,
        intervalFunc: constant$1(DEFAULT_INTERVAL)
    };

    function parseTimes(acc, t) {
        if (typeof t === 'object') {
            acc.times = +t.times || DEFAULT_TIMES;

            acc.intervalFunc = typeof t.interval === 'function' ?
                t.interval :
                constant$1(+t.interval || DEFAULT_INTERVAL);

            acc.errorFilter = t.errorFilter;
        } else if (typeof t === 'number' || typeof t === 'string') {
            acc.times = +t || DEFAULT_TIMES;
        } else {
            throw new Error("Invalid arguments for async.retry");
        }
    }

    if (arguments.length < 3 && typeof opts === 'function') {
        callback = task || noop;
        task = opts;
    } else {
        parseTimes(options, opts);
        callback = callback || noop;
    }

    if (typeof task !== 'function') {
        throw new Error("Invalid arguments for async.retry");
    }

    var _task = wrapAsync(task);

    var attempt = 1;
    function retryAttempt() {
        _task(function(err) {
            if (err && attempt++ < options.times &&
                (typeof options.errorFilter != 'function' ||
                    options.errorFilter(err))) {
                setTimeout(retryAttempt, options.intervalFunc(attempt));
            } else {
                callback.apply(null, arguments);
            }
        });
    }

    retryAttempt();
}

/**
 * A close relative of [`retry`]{@link module:ControlFlow.retry}.  This method
 * wraps a task and makes it retryable, rather than immediately calling it
 * with retries.
 *
 * @name retryable
 * @static
 * @memberOf module:ControlFlow
 * @method
 * @see [async.retry]{@link module:ControlFlow.retry}
 * @category Control Flow
 * @param {Object|number} [opts = {times: 5, interval: 0}| 5] - optional
 * options, exactly the same as from `retry`
 * @param {AsyncFunction} task - the asynchronous function to wrap.
 * This function will be passed any arguments passed to the returned wrapper.
 * Invoked with (...args, callback).
 * @returns {AsyncFunction} The wrapped function, which when invoked, will
 * retry on an error, based on the parameters specified in `opts`.
 * This function will accept the same parameters as `task`.
 * @example
 *
 * async.auto({
 *     dep1: async.retryable(3, getFromFlakyService),
 *     process: ["dep1", async.retryable(3, function (results, cb) {
 *         maybeProcessData(results.dep1, cb);
 *     })]
 * }, callback);
 */
var retryable = function (opts, task) {
    if (!task) {
        task = opts;
        opts = null;
    }
    var _task = wrapAsync(task);
    return initialParams(function (args, callback) {
        function taskFn(cb) {
            _task.apply(null, args.concat(cb));
        }

        if (opts) retry(opts, taskFn, callback);
        else retry(taskFn, callback);

    });
};

/**
 * Run the functions in the `tasks` collection in series, each one running once
 * the previous function has completed. If any functions in the series pass an
 * error to its callback, no more functions are run, and `callback` is
 * immediately called with the value of the error. Otherwise, `callback`
 * receives an array of results when `tasks` have completed.
 *
 * It is also possible to use an object instead of an array. Each property will
 * be run as a function, and the results will be passed to the final `callback`
 * as an object instead of an array. This can be a more readable way of handling
 *  results from {@link async.series}.
 *
 * **Note** that while many implementations preserve the order of object
 * properties, the [ECMAScript Language Specification](http://www.ecma-international.org/ecma-262/5.1/#sec-8.6)
 * explicitly states that
 *
 * > The mechanics and order of enumerating the properties is not specified.
 *
 * So if you rely on the order in which your series of functions are executed,
 * and want this to work on all platforms, consider using an array.
 *
 * @name series
 * @static
 * @memberOf module:ControlFlow
 * @method
 * @category Control Flow
 * @param {Array|Iterable|Object} tasks - A collection containing
 * [async functions]{@link AsyncFunction} to run in series.
 * Each function can complete with any number of optional `result` values.
 * @param {Function} [callback] - An optional callback to run once all the
 * functions have completed. This function gets a results array (or object)
 * containing all the result arguments passed to the `task` callbacks. Invoked
 * with (err, result).
 * @example
 * async.series([
 *     function(callback) {
 *         // do some stuff ...
 *         callback(null, 'one');
 *     },
 *     function(callback) {
 *         // do some more stuff ...
 *         callback(null, 'two');
 *     }
 * ],
 * // optional callback
 * function(err, results) {
 *     // results is now equal to ['one', 'two']
 * });
 *
 * async.series({
 *     one: function(callback) {
 *         setTimeout(function() {
 *             callback(null, 1);
 *         }, 200);
 *     },
 *     two: function(callback){
 *         setTimeout(function() {
 *             callback(null, 2);
 *         }, 100);
 *     }
 * }, function(err, results) {
 *     // results is now equal to: {one: 1, two: 2}
 * });
 */
function series(tasks, callback) {
    _parallel(eachOfSeries, tasks, callback);
}

/**
 * Returns `true` if at least one element in the `coll` satisfies an async test.
 * If any iteratee call returns `true`, the main `callback` is immediately
 * called.
 *
 * @name some
 * @static
 * @memberOf module:Collections
 * @method
 * @alias any
 * @category Collection
 * @param {Array|Iterable|Object} coll - A collection to iterate over.
 * @param {AsyncFunction} iteratee - An async truth test to apply to each item
 * in the collections in parallel.
 * The iteratee should complete with a boolean `result` value.
 * Invoked with (item, callback).
 * @param {Function} [callback] - A callback which is called as soon as any
 * iteratee returns `true`, or after all the iteratee functions have finished.
 * Result will be either `true` or `false` depending on the values of the async
 * tests. Invoked with (err, result).
 * @example
 *
 * async.some(['file1','file2','file3'], function(filePath, callback) {
 *     fs.access(filePath, function(err) {
 *         callback(null, !err)
 *     });
 * }, function(err, result) {
 *     // if result is true then at least one of the files exists
 * });
 */
var some = doParallel(_createTester(Boolean, identity));

/**
 * The same as [`some`]{@link module:Collections.some} but runs a maximum of `limit` async operations at a time.
 *
 * @name someLimit
 * @static
 * @memberOf module:Collections
 * @method
 * @see [async.some]{@link module:Collections.some}
 * @alias anyLimit
 * @category Collection
 * @param {Array|Iterable|Object} coll - A collection to iterate over.
 * @param {number} limit - The maximum number of async operations at a time.
 * @param {AsyncFunction} iteratee - An async truth test to apply to each item
 * in the collections in parallel.
 * The iteratee should complete with a boolean `result` value.
 * Invoked with (item, callback).
 * @param {Function} [callback] - A callback which is called as soon as any
 * iteratee returns `true`, or after all the iteratee functions have finished.
 * Result will be either `true` or `false` depending on the values of the async
 * tests. Invoked with (err, result).
 */
var someLimit = doParallelLimit(_createTester(Boolean, identity));

/**
 * The same as [`some`]{@link module:Collections.some} but runs only a single async operation at a time.
 *
 * @name someSeries
 * @static
 * @memberOf module:Collections
 * @method
 * @see [async.some]{@link module:Collections.some}
 * @alias anySeries
 * @category Collection
 * @param {Array|Iterable|Object} coll - A collection to iterate over.
 * @param {AsyncFunction} iteratee - An async truth test to apply to each item
 * in the collections in series.
 * The iteratee should complete with a boolean `result` value.
 * Invoked with (item, callback).
 * @param {Function} [callback] - A callback which is called as soon as any
 * iteratee returns `true`, or after all the iteratee functions have finished.
 * Result will be either `true` or `false` depending on the values of the async
 * tests. Invoked with (err, result).
 */
var someSeries = doLimit(someLimit, 1);

/**
 * Sorts a list by the results of running each `coll` value through an async
 * `iteratee`.
 *
 * @name sortBy
 * @static
 * @memberOf module:Collections
 * @method
 * @category Collection
 * @param {Array|Iterable|Object} coll - A collection to iterate over.
 * @param {AsyncFunction} iteratee - An async function to apply to each item in
 * `coll`.
 * The iteratee should complete with a value to use as the sort criteria as
 * its `result`.
 * Invoked with (item, callback).
 * @param {Function} callback - A callback which is called after all the
 * `iteratee` functions have finished, or an error occurs. Results is the items
 * from the original `coll` sorted by the values returned by the `iteratee`
 * calls. Invoked with (err, results).
 * @example
 *
 * async.sortBy(['file1','file2','file3'], function(file, callback) {
 *     fs.stat(file, function(err, stats) {
 *         callback(err, stats.mtime);
 *     });
 * }, function(err, results) {
 *     // results is now the original array of files sorted by
 *     // modified date
 * });
 *
 * // By modifying the callback parameter the
 * // sorting order can be influenced:
 *
 * // ascending order
 * async.sortBy([1,9,3,5], function(x, callback) {
 *     callback(null, x);
 * }, function(err,result) {
 *     // result callback
 * });
 *
 * // descending order
 * async.sortBy([1,9,3,5], function(x, callback) {
 *     callback(null, x*-1);    //<- x*-1 instead of x, turns the order around
 * }, function(err,result) {
 *     // result callback
 * });
 */
function sortBy (coll, iteratee, callback) {
    var _iteratee = wrapAsync(iteratee);
    map(coll, function (x, callback) {
        _iteratee(x, function (err, criteria) {
            if (err) return callback(err);
            callback(null, {value: x, criteria: criteria});
        });
    }, function (err, results) {
        if (err) return callback(err);
        callback(null, arrayMap(results.sort(comparator), baseProperty('value')));
    });

    function comparator(left, right) {
        var a = left.criteria, b = right.criteria;
        return a < b ? -1 : a > b ? 1 : 0;
    }
}

/**
 * Sets a time limit on an asynchronous function. If the function does not call
 * its callback within the specified milliseconds, it will be called with a
 * timeout error. The code property for the error object will be `'ETIMEDOUT'`.
 *
 * @name timeout
 * @static
 * @memberOf module:Utils
 * @method
 * @category Util
 * @param {AsyncFunction} asyncFn - The async function to limit in time.
 * @param {number} milliseconds - The specified time limit.
 * @param {*} [info] - Any variable you want attached (`string`, `object`, etc)
 * to timeout Error for more information..
 * @returns {AsyncFunction} Returns a wrapped function that can be used with any
 * of the control flow functions.
 * Invoke this function with the same parameters as you would `asyncFunc`.
 * @example
 *
 * function myFunction(foo, callback) {
 *     doAsyncTask(foo, function(err, data) {
 *         // handle errors
 *         if (err) return callback(err);
 *
 *         // do some stuff ...
 *
 *         // return processed data
 *         return callback(null, data);
 *     });
 * }
 *
 * var wrapped = async.timeout(myFunction, 1000);
 *
 * // call `wrapped` as you would `myFunction`
 * wrapped({ bar: 'bar' }, function(err, data) {
 *     // if `myFunction` takes < 1000 ms to execute, `err`
 *     // and `data` will have their expected values
 *
 *     // else `err` will be an Error with the code 'ETIMEDOUT'
 * });
 */
function timeout(asyncFn, milliseconds, info) {
    var fn = wrapAsync(asyncFn);

    return initialParams(function (args, callback) {
        var timedOut = false;
        var timer;

        function timeoutCallback() {
            var name = asyncFn.name || 'anonymous';
            var error  = new Error('Callback function "' + name + '" timed out.');
            error.code = 'ETIMEDOUT';
            if (info) {
                error.info = info;
            }
            timedOut = true;
            callback(error);
        }

        args.push(function () {
            if (!timedOut) {
                callback.apply(null, arguments);
                clearTimeout(timer);
            }
        });

        // setup timer and call original function
        timer = setTimeout(timeoutCallback, milliseconds);
        fn.apply(null, args);
    });
}

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeCeil = Math.ceil;
var nativeMax = Math.max;

/**
 * The base implementation of `_.range` and `_.rangeRight` which doesn't
 * coerce arguments.
 *
 * @private
 * @param {number} start The start of the range.
 * @param {number} end The end of the range.
 * @param {number} step The value to increment or decrement by.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Array} Returns the range of numbers.
 */
function baseRange(start, end, step, fromRight) {
  var index = -1,
      length = nativeMax(nativeCeil((end - start) / (step || 1)), 0),
      result = Array(length);

  while (length--) {
    result[fromRight ? length : ++index] = start;
    start += step;
  }
  return result;
}

/**
 * The same as [times]{@link module:ControlFlow.times} but runs a maximum of `limit` async operations at a
 * time.
 *
 * @name timesLimit
 * @static
 * @memberOf module:ControlFlow
 * @method
 * @see [async.times]{@link module:ControlFlow.times}
 * @category Control Flow
 * @param {number} count - The number of times to run the function.
 * @param {number} limit - The maximum number of async operations at a time.
 * @param {AsyncFunction} iteratee - The async function to call `n` times.
 * Invoked with the iteration index and a callback: (n, next).
 * @param {Function} callback - see [async.map]{@link module:Collections.map}.
 */
function timeLimit(count, limit, iteratee, callback) {
    var _iteratee = wrapAsync(iteratee);
    mapLimit(baseRange(0, count, 1), limit, _iteratee, callback);
}

/**
 * Calls the `iteratee` function `n` times, and accumulates results in the same
 * manner you would use with [map]{@link module:Collections.map}.
 *
 * @name times
 * @static
 * @memberOf module:ControlFlow
 * @method
 * @see [async.map]{@link module:Collections.map}
 * @category Control Flow
 * @param {number} n - The number of times to run the function.
 * @param {AsyncFunction} iteratee - The async function to call `n` times.
 * Invoked with the iteration index and a callback: (n, next).
 * @param {Function} callback - see {@link module:Collections.map}.
 * @example
 *
 * // Pretend this is some complicated async factory
 * var createUser = function(id, callback) {
 *     callback(null, {
 *         id: 'user' + id
 *     });
 * };
 *
 * // generate 5 users
 * async.times(5, function(n, next) {
 *     createUser(n, function(err, user) {
 *         next(err, user);
 *     });
 * }, function(err, users) {
 *     // we should now have 5 users
 * });
 */
var times = doLimit(timeLimit, Infinity);

/**
 * The same as [times]{@link module:ControlFlow.times} but runs only a single async operation at a time.
 *
 * @name timesSeries
 * @static
 * @memberOf module:ControlFlow
 * @method
 * @see [async.times]{@link module:ControlFlow.times}
 * @category Control Flow
 * @param {number} n - The number of times to run the function.
 * @param {AsyncFunction} iteratee - The async function to call `n` times.
 * Invoked with the iteration index and a callback: (n, next).
 * @param {Function} callback - see {@link module:Collections.map}.
 */
var timesSeries = doLimit(timeLimit, 1);

/**
 * A relative of `reduce`.  Takes an Object or Array, and iterates over each
 * element in series, each step potentially mutating an `accumulator` value.
 * The type of the accumulator defaults to the type of collection passed in.
 *
 * @name transform
 * @static
 * @memberOf module:Collections
 * @method
 * @category Collection
 * @param {Array|Iterable|Object} coll - A collection to iterate over.
 * @param {*} [accumulator] - The initial state of the transform.  If omitted,
 * it will default to an empty Object or Array, depending on the type of `coll`
 * @param {AsyncFunction} iteratee - A function applied to each item in the
 * collection that potentially modifies the accumulator.
 * Invoked with (accumulator, item, key, callback).
 * @param {Function} [callback] - A callback which is called after all the
 * `iteratee` functions have finished. Result is the transformed accumulator.
 * Invoked with (err, result).
 * @example
 *
 * async.transform([1,2,3], function(acc, item, index, callback) {
 *     // pointless async:
 *     process.nextTick(function() {
 *         acc.push(item * 2)
 *         callback(null)
 *     });
 * }, function(err, result) {
 *     // result is now equal to [2, 4, 6]
 * });
 *
 * @example
 *
 * async.transform({a: 1, b: 2, c: 3}, function (obj, val, key, callback) {
 *     setImmediate(function () {
 *         obj[key] = val * 2;
 *         callback();
 *     })
 * }, function (err, result) {
 *     // result is equal to {a: 2, b: 4, c: 6}
 * })
 */
function transform (coll, accumulator, iteratee, callback) {
    if (arguments.length <= 3) {
        callback = iteratee;
        iteratee = accumulator;
        accumulator = isArray(coll) ? [] : {};
    }
    callback = once(callback || noop);
    var _iteratee = wrapAsync(iteratee);

    eachOf(coll, function(v, k, cb) {
        _iteratee(accumulator, v, k, cb);
    }, function(err) {
        callback(err, accumulator);
    });
}

/**
 * It runs each task in series but stops whenever any of the functions were
 * successful. If one of the tasks were successful, the `callback` will be
 * passed the result of the successful task. If all tasks fail, the callback
 * will be passed the error and result (if any) of the final attempt.
 *
 * @name tryEach
 * @static
 * @memberOf module:ControlFlow
 * @method
 * @category Control Flow
 * @param {Array|Iterable|Object} tasks - A collection containing functions to
 * run, each function is passed a `callback(err, result)` it must call on
 * completion with an error `err` (which can be `null`) and an optional `result`
 * value.
 * @param {Function} [callback] - An optional callback which is called when one
 * of the tasks has succeeded, or all have failed. It receives the `err` and
 * `result` arguments of the last attempt at completing the `task`. Invoked with
 * (err, results).
 * @example
 * async.tryEach([
 *     function getDataFromFirstWebsite(callback) {
 *         // Try getting the data from the first website
 *         callback(err, data);
 *     },
 *     function getDataFromSecondWebsite(callback) {
 *         // First website failed,
 *         // Try getting the data from the backup website
 *         callback(err, data);
 *     }
 * ],
 * // optional callback
 * function(err, results) {
 *     Now do something with the data.
 * });
 *
 */
function tryEach(tasks, callback) {
    var error = null;
    var result;
    callback = callback || noop;
    eachSeries(tasks, function(task, callback) {
        wrapAsync(task)(function (err, res/*, ...args*/) {
            if (arguments.length > 2) {
                result = slice(arguments, 1);
            } else {
                result = res;
            }
            error = err;
            callback(!err);
        });
    }, function () {
        callback(error, result);
    });
}

/**
 * Undoes a [memoize]{@link module:Utils.memoize}d function, reverting it to the original,
 * unmemoized form. Handy for testing.
 *
 * @name unmemoize
 * @static
 * @memberOf module:Utils
 * @method
 * @see [async.memoize]{@link module:Utils.memoize}
 * @category Util
 * @param {AsyncFunction} fn - the memoized function
 * @returns {AsyncFunction} a function that calls the original unmemoized function
 */
function unmemoize(fn) {
    return function () {
        return (fn.unmemoized || fn).apply(null, arguments);
    };
}

/**
 * Repeatedly call `iteratee`, while `test` returns `true`. Calls `callback` when
 * stopped, or an error occurs.
 *
 * @name whilst
 * @static
 * @memberOf module:ControlFlow
 * @method
 * @category Control Flow
 * @param {Function} test - synchronous truth test to perform before each
 * execution of `iteratee`. Invoked with ().
 * @param {AsyncFunction} iteratee - An async function which is called each time
 * `test` passes. Invoked with (callback).
 * @param {Function} [callback] - A callback which is called after the test
 * function has failed and repeated execution of `iteratee` has stopped. `callback`
 * will be passed an error and any arguments passed to the final `iteratee`'s
 * callback. Invoked with (err, [results]);
 * @returns undefined
 * @example
 *
 * var count = 0;
 * async.whilst(
 *     function() { return count < 5; },
 *     function(callback) {
 *         count++;
 *         setTimeout(function() {
 *             callback(null, count);
 *         }, 1000);
 *     },
 *     function (err, n) {
 *         // 5 seconds have passed, n = 5
 *     }
 * );
 */
function whilst(test, iteratee, callback) {
    callback = onlyOnce(callback || noop);
    var _iteratee = wrapAsync(iteratee);
    if (!test()) return callback(null);
    var next = function(err/*, ...args*/) {
        if (err) return callback(err);
        if (test()) return _iteratee(next);
        var args = slice(arguments, 1);
        callback.apply(null, [null].concat(args));
    };
    _iteratee(next);
}

/**
 * Repeatedly call `iteratee` until `test` returns `true`. Calls `callback` when
 * stopped, or an error occurs. `callback` will be passed an error and any
 * arguments passed to the final `iteratee`'s callback.
 *
 * The inverse of [whilst]{@link module:ControlFlow.whilst}.
 *
 * @name until
 * @static
 * @memberOf module:ControlFlow
 * @method
 * @see [async.whilst]{@link module:ControlFlow.whilst}
 * @category Control Flow
 * @param {Function} test - synchronous truth test to perform before each
 * execution of `iteratee`. Invoked with ().
 * @param {AsyncFunction} iteratee - An async function which is called each time
 * `test` fails. Invoked with (callback).
 * @param {Function} [callback] - A callback which is called after the test
 * function has passed and repeated execution of `iteratee` has stopped. `callback`
 * will be passed an error and any arguments passed to the final `iteratee`'s
 * callback. Invoked with (err, [results]);
 */
function until(test, iteratee, callback) {
    whilst(function() {
        return !test.apply(this, arguments);
    }, iteratee, callback);
}

/**
 * Runs the `tasks` array of functions in series, each passing their results to
 * the next in the array. However, if any of the `tasks` pass an error to their
 * own callback, the next function is not executed, and the main `callback` is
 * immediately called with the error.
 *
 * @name waterfall
 * @static
 * @memberOf module:ControlFlow
 * @method
 * @category Control Flow
 * @param {Array} tasks - An array of [async functions]{@link AsyncFunction}
 * to run.
 * Each function should complete with any number of `result` values.
 * The `result` values will be passed as arguments, in order, to the next task.
 * @param {Function} [callback] - An optional callback to run once all the
 * functions have completed. This will be passed the results of the last task's
 * callback. Invoked with (err, [results]).
 * @returns undefined
 * @example
 *
 * async.waterfall([
 *     function(callback) {
 *         callback(null, 'one', 'two');
 *     },
 *     function(arg1, arg2, callback) {
 *         // arg1 now equals 'one' and arg2 now equals 'two'
 *         callback(null, 'three');
 *     },
 *     function(arg1, callback) {
 *         // arg1 now equals 'three'
 *         callback(null, 'done');
 *     }
 * ], function (err, result) {
 *     // result now equals 'done'
 * });
 *
 * // Or, with named functions:
 * async.waterfall([
 *     myFirstFunction,
 *     mySecondFunction,
 *     myLastFunction,
 * ], function (err, result) {
 *     // result now equals 'done'
 * });
 * function myFirstFunction(callback) {
 *     callback(null, 'one', 'two');
 * }
 * function mySecondFunction(arg1, arg2, callback) {
 *     // arg1 now equals 'one' and arg2 now equals 'two'
 *     callback(null, 'three');
 * }
 * function myLastFunction(arg1, callback) {
 *     // arg1 now equals 'three'
 *     callback(null, 'done');
 * }
 */
var waterfall = function(tasks, callback) {
    callback = once(callback || noop);
    if (!isArray(tasks)) return callback(new Error('First argument to waterfall must be an array of functions'));
    if (!tasks.length) return callback();
    var taskIndex = 0;

    function nextTask(args) {
        var task = wrapAsync(tasks[taskIndex++]);
        args.push(onlyOnce(next));
        task.apply(null, args);
    }

    function next(err/*, ...args*/) {
        if (err || taskIndex === tasks.length) {
            return callback.apply(null, arguments);
        }
        nextTask(slice(arguments, 1));
    }

    nextTask([]);
};

/**
 * An "async function" in the context of Async is an asynchronous function with
 * a variable number of parameters, with the final parameter being a callback.
 * (`function (arg1, arg2, ..., callback) {}`)
 * The final callback is of the form `callback(err, results...)`, which must be
 * called once the function is completed.  The callback should be called with a
 * Error as its first argument to signal that an error occurred.
 * Otherwise, if no error occurred, it should be called with `null` as the first
 * argument, and any additional `result` arguments that may apply, to signal
 * successful completion.
 * The callback must be called exactly once, ideally on a later tick of the
 * JavaScript event loop.
 *
 * This type of function is also referred to as a "Node-style async function",
 * or a "continuation passing-style function" (CPS). Most of the methods of this
 * library are themselves CPS/Node-style async functions, or functions that
 * return CPS/Node-style async functions.
 *
 * Wherever we accept a Node-style async function, we also directly accept an
 * [ES2017 `async` function]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function}.
 * In this case, the `async` function will not be passed a final callback
 * argument, and any thrown error will be used as the `err` argument of the
 * implicit callback, and the return value will be used as the `result` value.
 * (i.e. a `rejected` of the returned Promise becomes the `err` callback
 * argument, and a `resolved` value becomes the `result`.)
 *
 * Note, due to JavaScript limitations, we can only detect native `async`
 * functions and not transpilied implementations.
 * Your environment must have `async`/`await` support for this to work.
 * (e.g. Node > v7.6, or a recent version of a modern browser).
 * If you are using `async` functions through a transpiler (e.g. Babel), you
 * must still wrap the function with [asyncify]{@link module:Utils.asyncify},
 * because the `async function` will be compiled to an ordinary function that
 * returns a promise.
 *
 * @typedef {Function} AsyncFunction
 * @static
 */

/**
 * Async is a utility module which provides straight-forward, powerful functions
 * for working with asynchronous JavaScript. Although originally designed for
 * use with [Node.js](http://nodejs.org) and installable via
 * `npm install --save async`, it can also be used directly in the browser.
 * @module async
 * @see AsyncFunction
 */


/**
 * A collection of `async` functions for manipulating collections, such as
 * arrays and objects.
 * @module Collections
 */

/**
 * A collection of `async` functions for controlling the flow through a script.
 * @module ControlFlow
 */

/**
 * A collection of `async` utility functions.
 * @module Utils
 */

var index = {
    apply: apply,
    applyEach: applyEach,
    applyEachSeries: applyEachSeries,
    asyncify: asyncify,
    auto: auto,
    autoInject: autoInject,
    cargo: cargo,
    compose: compose,
    concat: concat,
    concatLimit: concatLimit,
    concatSeries: concatSeries,
    constant: constant,
    detect: detect,
    detectLimit: detectLimit,
    detectSeries: detectSeries,
    dir: dir,
    doDuring: doDuring,
    doUntil: doUntil,
    doWhilst: doWhilst,
    during: during,
    each: eachLimit,
    eachLimit: eachLimit$1,
    eachOf: eachOf,
    eachOfLimit: eachOfLimit,
    eachOfSeries: eachOfSeries,
    eachSeries: eachSeries,
    ensureAsync: ensureAsync,
    every: every,
    everyLimit: everyLimit,
    everySeries: everySeries,
    filter: filter,
    filterLimit: filterLimit,
    filterSeries: filterSeries,
    forever: forever,
    groupBy: groupBy,
    groupByLimit: groupByLimit,
    groupBySeries: groupBySeries,
    log: log,
    map: map,
    mapLimit: mapLimit,
    mapSeries: mapSeries,
    mapValues: mapValues,
    mapValuesLimit: mapValuesLimit,
    mapValuesSeries: mapValuesSeries,
    memoize: memoize,
    nextTick: nextTick,
    parallel: parallelLimit,
    parallelLimit: parallelLimit$1,
    priorityQueue: priorityQueue,
    queue: queue$1,
    race: race,
    reduce: reduce,
    reduceRight: reduceRight,
    reflect: reflect,
    reflectAll: reflectAll,
    reject: reject,
    rejectLimit: rejectLimit,
    rejectSeries: rejectSeries,
    retry: retry,
    retryable: retryable,
    seq: seq,
    series: series,
    setImmediate: setImmediate$1,
    some: some,
    someLimit: someLimit,
    someSeries: someSeries,
    sortBy: sortBy,
    timeout: timeout,
    times: times,
    timesLimit: timeLimit,
    timesSeries: timesSeries,
    transform: transform,
    tryEach: tryEach,
    unmemoize: unmemoize,
    until: until,
    waterfall: waterfall,
    whilst: whilst,

    // aliases
    all: every,
    allLimit: everyLimit,
    allSeries: everySeries,
    any: some,
    anyLimit: someLimit,
    anySeries: someSeries,
    find: detect,
    findLimit: detectLimit,
    findSeries: detectSeries,
    forEach: eachLimit,
    forEachSeries: eachSeries,
    forEachLimit: eachLimit$1,
    forEachOf: eachOf,
    forEachOfSeries: eachOfSeries,
    forEachOfLimit: eachOfLimit,
    inject: reduce,
    foldl: reduce,
    foldr: reduceRight,
    select: filter,
    selectLimit: filterLimit,
    selectSeries: filterSeries,
    wrapSync: asyncify
};

exports['default'] = index;
exports.apply = apply;
exports.applyEach = applyEach;
exports.applyEachSeries = applyEachSeries;
exports.asyncify = asyncify;
exports.auto = auto;
exports.autoInject = autoInject;
exports.cargo = cargo;
exports.compose = compose;
exports.concat = concat;
exports.concatLimit = concatLimit;
exports.concatSeries = concatSeries;
exports.constant = constant;
exports.detect = detect;
exports.detectLimit = detectLimit;
exports.detectSeries = detectSeries;
exports.dir = dir;
exports.doDuring = doDuring;
exports.doUntil = doUntil;
exports.doWhilst = doWhilst;
exports.during = during;
exports.each = eachLimit;
exports.eachLimit = eachLimit$1;
exports.eachOf = eachOf;
exports.eachOfLimit = eachOfLimit;
exports.eachOfSeries = eachOfSeries;
exports.eachSeries = eachSeries;
exports.ensureAsync = ensureAsync;
exports.every = every;
exports.everyLimit = everyLimit;
exports.everySeries = everySeries;
exports.filter = filter;
exports.filterLimit = filterLimit;
exports.filterSeries = filterSeries;
exports.forever = forever;
exports.groupBy = groupBy;
exports.groupByLimit = groupByLimit;
exports.groupBySeries = groupBySeries;
exports.log = log;
exports.map = map;
exports.mapLimit = mapLimit;
exports.mapSeries = mapSeries;
exports.mapValues = mapValues;
exports.mapValuesLimit = mapValuesLimit;
exports.mapValuesSeries = mapValuesSeries;
exports.memoize = memoize;
exports.nextTick = nextTick;
exports.parallel = parallelLimit;
exports.parallelLimit = parallelLimit$1;
exports.priorityQueue = priorityQueue;
exports.queue = queue$1;
exports.race = race;
exports.reduce = reduce;
exports.reduceRight = reduceRight;
exports.reflect = reflect;
exports.reflectAll = reflectAll;
exports.reject = reject;
exports.rejectLimit = rejectLimit;
exports.rejectSeries = rejectSeries;
exports.retry = retry;
exports.retryable = retryable;
exports.seq = seq;
exports.series = series;
exports.setImmediate = setImmediate$1;
exports.some = some;
exports.someLimit = someLimit;
exports.someSeries = someSeries;
exports.sortBy = sortBy;
exports.timeout = timeout;
exports.times = times;
exports.timesLimit = timeLimit;
exports.timesSeries = timesSeries;
exports.transform = transform;
exports.tryEach = tryEach;
exports.unmemoize = unmemoize;
exports.until = until;
exports.waterfall = waterfall;
exports.whilst = whilst;
exports.all = every;
exports.allLimit = everyLimit;
exports.allSeries = everySeries;
exports.any = some;
exports.anyLimit = someLimit;
exports.anySeries = someSeries;
exports.find = detect;
exports.findLimit = detectLimit;
exports.findSeries = detectSeries;
exports.forEach = eachLimit;
exports.forEachSeries = eachSeries;
exports.forEachLimit = eachLimit$1;
exports.forEachOf = eachOf;
exports.forEachOfSeries = eachOfSeries;
exports.forEachOfLimit = eachOfLimit;
exports.inject = reduce;
exports.foldl = reduce;
exports.foldr = reduceRight;
exports.select = filter;
exports.selectLimit = filterLimit;
exports.selectSeries = filterSeries;
exports.wrapSync = asyncify;

Object.defineProperty(exports, '__esModule', { value: true });

})));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(23).setImmediate, __webpack_require__(26), __webpack_require__(24), __webpack_require__(27)(module)))

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var scope = (typeof global !== "undefined" && global) ||
            (typeof self !== "undefined" && self) ||
            window;
var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, scope, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, scope, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(scope, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(25);
// On some exotic environments, it's not clear which object `setimmediate` was
// able to install onto.  Search each possibility in the same order as the
// `setimmediate` library.
exports.setImmediate = (typeof self !== "undefined" && self.setImmediate) ||
                       (typeof global !== "undefined" && global.setImmediate) ||
                       (this && this.setImmediate);
exports.clearImmediate = (typeof self !== "undefined" && self.clearImmediate) ||
                         (typeof global !== "undefined" && global.clearImmediate) ||
                         (this && this.clearImmediate);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(24)))

/***/ }),
/* 24 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(24), __webpack_require__(26)))

/***/ }),
/* 26 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./en_GB": 29,
	"./en_GB.js": 29,
	"./en_US": 30,
	"./en_US.js": 30,
	"./es_ES": 31,
	"./es_ES.js": 31,
	"./zh_CN": 32,
	"./zh_CN.js": 32
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 28;

/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// 英语
/* harmony default export */ __webpack_exports__["default"] = ({
  locale: 'zh-cn',
  unSupportLocal: 'Unsupported language',
  scannerException: 'Scan was abnormal, please try again later',
  unSelectSanner: 'Please select the scanner you are currently using',
  initFail: 'Scanner initialization failed',
  gatewayTimeout: 'Gateway timeout, please try again later',
  serverErr: 'The server is abnormal. Please try again later',
  requestErr: 'Request error, please check the network or parameters',
  timeoutErr: 'The request timed out. Please check whether the network is normal',
  unFindScanner: 'Specified scanner not found'
});

/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// 英语（美式）
/* harmony default export */ __webpack_exports__["default"] = ({
  locale: 'en-US',
  unSupportLocal: 'Unsupported language',
  scannerException: 'Scan was abnormal, please try again later',
  unSelectSanner: 'Please select the scanner you are currently using',
  initFail: 'Scanner initialization failed',
  gatewayTimeout: 'Gateway timeout, please try again later',
  serverErr: 'The server is abnormal. Please try again later',
  requestErr: 'Request error, please check the network or parameters',
  timeoutErr: 'The request timed out. Please check whether the network is normal',
  unFindScanner: 'Specified scanner not found'
});

/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// 西班牙语
/* harmony default export */ __webpack_exports__["default"] = ({
  locale: 'es-ES',
  unSupportLocal: 'Lenguaje no soportado',
  scannerException: 'El escaneo fue anormal, intente nuevamente más tarde',
  unSelectSanner: 'Seleccione el escáner que está utilizando actualmente',
  initFail: 'La inicialización del escáner falló',
  gatewayTimeout: 'El portal está fuera de tiempo',
  serverErr: 'Anomalía de servicio. Por favor, inténtelo más tarde',
  requestErr: 'Error de solicitud. Compruebe la red o parámetro',
  timeoutErr: 'Pedir tiempo extra. Compruebe si la red está bien',
  unFindScanner: 'No hay escáner designado'
});

/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  locale: 'zh-cn',
  unSupportLocal: '不支持的语言',
  scannerException: '扫描异常，请稍后再试',
  unSelectSanner: '请选择当前需要使用的扫描仪',
  initFail: '初始化扫描仪失败',
  gatewayTimeout: '网关超时，请稍后再试！',
  serverErr: '服务端异常, 请稍后再试！',
  requestErr: '请求错误, 请检查网络或参数！',
  timeoutErr: '请求超时, 请检查网络是否正常！',
  unFindScanner: '未找到指定的扫描仪！'
});

/***/ })
/******/ ]);
});