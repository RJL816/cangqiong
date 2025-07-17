/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackJsonp_bos-platform"] = self["webpackJsonp_bos-platform"] || []).push([[7112],{

/***/ "./node_modules/crypto-js/hmac-sha256.js":
/*!***********************************************!*\
  !*** ./node_modules/crypto-js/hmac-sha256.js ***!
  \***********************************************/
/***/ (function(module, exports, __webpack_require__) {

eval(";(function (root, factory, undef) {\n\tif (true) {\n\t\t// CommonJS\n\t\tmodule.exports = exports = factory(__webpack_require__(/*! ./core */ \"./node_modules/crypto-js/core.js\"), __webpack_require__(/*! ./sha256 */ \"./node_modules/crypto-js/sha256.js\"), __webpack_require__(/*! ./hmac */ \"./node_modules/crypto-js/hmac.js\"));\n\t}\n\telse {}\n}(this, function (CryptoJS) {\n\n\treturn CryptoJS.HmacSHA256;\n\n}));\n\n//# sourceURL=webpack://bos-platform/./node_modules/crypto-js/hmac-sha256.js?");

/***/ }),

/***/ "./node_modules/crypto-js/hmac.js":
/*!****************************************!*\
  !*** ./node_modules/crypto-js/hmac.js ***!
  \****************************************/
/***/ (function(module, exports, __webpack_require__) {

eval(";(function (root, factory) {\n\tif (true) {\n\t\t// CommonJS\n\t\tmodule.exports = exports = factory(__webpack_require__(/*! ./core */ \"./node_modules/crypto-js/core.js\"));\n\t}\n\telse {}\n}(this, function (CryptoJS) {\n\n\t(function () {\n\t    // Shortcuts\n\t    var C = CryptoJS;\n\t    var C_lib = C.lib;\n\t    var Base = C_lib.Base;\n\t    var C_enc = C.enc;\n\t    var Utf8 = C_enc.Utf8;\n\t    var C_algo = C.algo;\n\n\t    /**\n\t     * HMAC algorithm.\n\t     */\n\t    var HMAC = C_algo.HMAC = Base.extend({\n\t        /**\n\t         * Initializes a newly created HMAC.\n\t         *\n\t         * @param {Hasher} hasher The hash algorithm to use.\n\t         * @param {WordArray|string} key The secret key.\n\t         *\n\t         * @example\n\t         *\n\t         *     var hmacHasher = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, key);\n\t         */\n\t        init: function (hasher, key) {\n\t            // Init hasher\n\t            hasher = this._hasher = new hasher.init();\n\n\t            // Convert string to WordArray, else assume WordArray already\n\t            if (typeof key == 'string') {\n\t                key = Utf8.parse(key);\n\t            }\n\n\t            // Shortcuts\n\t            var hasherBlockSize = hasher.blockSize;\n\t            var hasherBlockSizeBytes = hasherBlockSize * 4;\n\n\t            // Allow arbitrary length keys\n\t            if (key.sigBytes > hasherBlockSizeBytes) {\n\t                key = hasher.finalize(key);\n\t            }\n\n\t            // Clamp excess bits\n\t            key.clamp();\n\n\t            // Clone key for inner and outer pads\n\t            var oKey = this._oKey = key.clone();\n\t            var iKey = this._iKey = key.clone();\n\n\t            // Shortcuts\n\t            var oKeyWords = oKey.words;\n\t            var iKeyWords = iKey.words;\n\n\t            // XOR keys with pad constants\n\t            for (var i = 0; i < hasherBlockSize; i++) {\n\t                oKeyWords[i] ^= 0x5c5c5c5c;\n\t                iKeyWords[i] ^= 0x36363636;\n\t            }\n\t            oKey.sigBytes = iKey.sigBytes = hasherBlockSizeBytes;\n\n\t            // Set initial values\n\t            this.reset();\n\t        },\n\n\t        /**\n\t         * Resets this HMAC to its initial state.\n\t         *\n\t         * @example\n\t         *\n\t         *     hmacHasher.reset();\n\t         */\n\t        reset: function () {\n\t            // Shortcut\n\t            var hasher = this._hasher;\n\n\t            // Reset\n\t            hasher.reset();\n\t            hasher.update(this._iKey);\n\t        },\n\n\t        /**\n\t         * Updates this HMAC with a message.\n\t         *\n\t         * @param {WordArray|string} messageUpdate The message to append.\n\t         *\n\t         * @return {HMAC} This HMAC instance.\n\t         *\n\t         * @example\n\t         *\n\t         *     hmacHasher.update('message');\n\t         *     hmacHasher.update(wordArray);\n\t         */\n\t        update: function (messageUpdate) {\n\t            this._hasher.update(messageUpdate);\n\n\t            // Chainable\n\t            return this;\n\t        },\n\n\t        /**\n\t         * Finalizes the HMAC computation.\n\t         * Note that the finalize operation is effectively a destructive, read-once operation.\n\t         *\n\t         * @param {WordArray|string} messageUpdate (Optional) A final message update.\n\t         *\n\t         * @return {WordArray} The HMAC.\n\t         *\n\t         * @example\n\t         *\n\t         *     var hmac = hmacHasher.finalize();\n\t         *     var hmac = hmacHasher.finalize('message');\n\t         *     var hmac = hmacHasher.finalize(wordArray);\n\t         */\n\t        finalize: function (messageUpdate) {\n\t            // Shortcut\n\t            var hasher = this._hasher;\n\n\t            // Compute HMAC\n\t            var innerHash = hasher.finalize(messageUpdate);\n\t            hasher.reset();\n\t            var hmac = hasher.finalize(this._oKey.clone().concat(innerHash));\n\n\t            return hmac;\n\t        }\n\t    });\n\t}());\n\n\n}));\n\n//# sourceURL=webpack://bos-platform/./node_modules/crypto-js/hmac.js?");

/***/ })

}]);