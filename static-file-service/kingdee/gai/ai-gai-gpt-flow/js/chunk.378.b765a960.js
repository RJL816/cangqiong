// Build date: 2024/8/28 19:42:15
 // Version: 0.0.0
 (self["webpackChunkreact_flow_plan"] = self["webpackChunkreact_flow_plan"] || []).push([[378],{

/***/ 89183:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var getNative = __webpack_require__(17963),
  root = __webpack_require__(58222);

/* Built-in method references that are verified to be native. */
var DataView = getNative(root, 'DataView');
module.exports = DataView;

/***/ }),

/***/ 17466:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var hashClear = __webpack_require__(53305),
  hashDelete = __webpack_require__(34577),
  hashGet = __webpack_require__(71000),
  hashHas = __webpack_require__(50476),
  hashSet = __webpack_require__(12796);

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
    length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;
module.exports = Hash;

/***/ }),

/***/ 32922:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var listCacheClear = __webpack_require__(52409),
  listCacheDelete = __webpack_require__(44017),
  listCacheGet = __webpack_require__(10584),
  listCacheHas = __webpack_require__(68876),
  listCacheSet = __webpack_require__(89564);

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
    length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;
module.exports = ListCache;

/***/ }),

/***/ 2090:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var getNative = __webpack_require__(17963),
  root = __webpack_require__(58222);

/* Built-in method references that are verified to be native. */
var Map = getNative(root, 'Map');
module.exports = Map;

/***/ }),

/***/ 73706:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var mapCacheClear = __webpack_require__(54793),
  mapCacheDelete = __webpack_require__(59009),
  mapCacheGet = __webpack_require__(41512),
  mapCacheHas = __webpack_require__(21500),
  mapCacheSet = __webpack_require__(53676);

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
    length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;
module.exports = MapCache;

/***/ }),

/***/ 64085:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var getNative = __webpack_require__(17963),
  root = __webpack_require__(58222);

/* Built-in method references that are verified to be native. */
var Promise = getNative(root, 'Promise');
module.exports = Promise;

/***/ }),

/***/ 45360:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var getNative = __webpack_require__(17963),
  root = __webpack_require__(58222);

/* Built-in method references that are verified to be native. */
var Set = getNative(root, 'Set');
module.exports = Set;

/***/ }),

/***/ 57980:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var ListCache = __webpack_require__(32922),
  stackClear = __webpack_require__(41111),
  stackDelete = __webpack_require__(79427),
  stackGet = __webpack_require__(28770),
  stackHas = __webpack_require__(71830),
  stackSet = __webpack_require__(74094);

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
  var data = this.__data__ = new ListCache(entries);
  this.size = data.size;
}

// Add methods to `Stack`.
Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;
module.exports = Stack;

/***/ }),

/***/ 71298:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var root = __webpack_require__(58222);

/** Built-in value references. */
var _Symbol = root.Symbol;
module.exports = _Symbol;

/***/ }),

/***/ 1047:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var root = __webpack_require__(58222);

/** Built-in value references. */
var Uint8Array = root.Uint8Array;
module.exports = Uint8Array;

/***/ }),

/***/ 97334:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var getNative = __webpack_require__(17963),
  root = __webpack_require__(58222);

/* Built-in method references that are verified to be native. */
var WeakMap = getNative(root, 'WeakMap');
module.exports = WeakMap;

/***/ }),

/***/ 8176:
/***/ (function(module) {

/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0:
      return func.call(thisArg);
    case 1:
      return func.call(thisArg, args[0]);
    case 2:
      return func.call(thisArg, args[0], args[1]);
    case 3:
      return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}
module.exports = apply;

/***/ }),

/***/ 42384:
/***/ (function(module) {

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
module.exports = arrayEach;

/***/ }),

/***/ 45879:
/***/ (function(module) {

/**
 * A specialized version of `_.filter` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */
function arrayFilter(array, predicate) {
  var index = -1,
    length = array == null ? 0 : array.length,
    resIndex = 0,
    result = [];
  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}
module.exports = arrayFilter;

/***/ }),

/***/ 87782:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseTimes = __webpack_require__(48713),
  isArguments = __webpack_require__(60387),
  isArray = __webpack_require__(27334),
  isBuffer = __webpack_require__(94621),
  isIndex = __webpack_require__(58864),
  isTypedArray = __webpack_require__(6570);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

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
    if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && (
    // Safari 9 has enumerable `arguments.length` in strict mode.
    key == 'length' ||
    // Node.js 0.10 has enumerable non-index properties on buffers.
    isBuff && (key == 'offset' || key == 'parent') ||
    // PhantomJS 2 has enumerable non-index properties on typed arrays.
    isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset') ||
    // Skip index properties.
    isIndex(key, length)))) {
      result.push(key);
    }
  }
  return result;
}
module.exports = arrayLikeKeys;

/***/ }),

/***/ 83079:
/***/ (function(module) {

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
module.exports = arrayMap;

/***/ }),

/***/ 96841:
/***/ (function(module) {

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
    length = values.length,
    offset = array.length;
  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}
module.exports = arrayPush;

/***/ }),

/***/ 38254:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseAssignValue = __webpack_require__(34593),
  eq = __webpack_require__(48285);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) || value === undefined && !(key in object)) {
    baseAssignValue(object, key, value);
  }
}
module.exports = assignValue;

/***/ }),

/***/ 95322:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var eq = __webpack_require__(48285);

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}
module.exports = assocIndexOf;

/***/ }),

/***/ 34522:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var copyObject = __webpack_require__(5288),
  keys = __webpack_require__(21611);

/**
 * The base implementation of `_.assign` without support for multiple sources
 * or `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @returns {Object} Returns `object`.
 */
function baseAssign(object, source) {
  return object && copyObject(source, keys(source), object);
}
module.exports = baseAssign;

/***/ }),

/***/ 43357:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var copyObject = __webpack_require__(5288),
  keysIn = __webpack_require__(49592);

/**
 * The base implementation of `_.assignIn` without support for multiple sources
 * or `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @returns {Object} Returns `object`.
 */
function baseAssignIn(object, source) {
  return object && copyObject(source, keysIn(source), object);
}
module.exports = baseAssignIn;

/***/ }),

/***/ 34593:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var defineProperty = __webpack_require__(84548);

/**
 * The base implementation of `assignValue` and `assignMergeValue` without
 * value checks.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function baseAssignValue(object, key, value) {
  if (key == '__proto__' && defineProperty) {
    defineProperty(object, key, {
      'configurable': true,
      'enumerable': true,
      'value': value,
      'writable': true
    });
  } else {
    object[key] = value;
  }
}
module.exports = baseAssignValue;

/***/ }),

/***/ 48966:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var Stack = __webpack_require__(57980),
  arrayEach = __webpack_require__(42384),
  assignValue = __webpack_require__(38254),
  baseAssign = __webpack_require__(34522),
  baseAssignIn = __webpack_require__(43357),
  cloneBuffer = __webpack_require__(89627),
  copyArray = __webpack_require__(18194),
  copySymbols = __webpack_require__(11786),
  copySymbolsIn = __webpack_require__(38669),
  getAllKeys = __webpack_require__(90713),
  getAllKeysIn = __webpack_require__(76162),
  getTag = __webpack_require__(61910),
  initCloneArray = __webpack_require__(30486),
  initCloneByTag = __webpack_require__(39400),
  initCloneObject = __webpack_require__(14988),
  isArray = __webpack_require__(27334),
  isBuffer = __webpack_require__(94621),
  isMap = __webpack_require__(66593),
  isObject = __webpack_require__(60188),
  isSet = __webpack_require__(54423),
  keys = __webpack_require__(21611),
  keysIn = __webpack_require__(49592);

/** Used to compose bitmasks for cloning. */
var CLONE_DEEP_FLAG = 1,
  CLONE_FLAT_FLAG = 2,
  CLONE_SYMBOLS_FLAG = 4;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
  arrayTag = '[object Array]',
  boolTag = '[object Boolean]',
  dateTag = '[object Date]',
  errorTag = '[object Error]',
  funcTag = '[object Function]',
  genTag = '[object GeneratorFunction]',
  mapTag = '[object Map]',
  numberTag = '[object Number]',
  objectTag = '[object Object]',
  regexpTag = '[object RegExp]',
  setTag = '[object Set]',
  stringTag = '[object String]',
  symbolTag = '[object Symbol]',
  weakMapTag = '[object WeakMap]';
var arrayBufferTag = '[object ArrayBuffer]',
  dataViewTag = '[object DataView]',
  float32Tag = '[object Float32Array]',
  float64Tag = '[object Float64Array]',
  int8Tag = '[object Int8Array]',
  int16Tag = '[object Int16Array]',
  int32Tag = '[object Int32Array]',
  uint8Tag = '[object Uint8Array]',
  uint8ClampedTag = '[object Uint8ClampedArray]',
  uint16Tag = '[object Uint16Array]',
  uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values supported by `_.clone`. */
var cloneableTags = {};
cloneableTags[argsTag] = cloneableTags[arrayTag] = cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] = cloneableTags[boolTag] = cloneableTags[dateTag] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[mapTag] = cloneableTags[numberTag] = cloneableTags[objectTag] = cloneableTags[regexpTag] = cloneableTags[setTag] = cloneableTags[stringTag] = cloneableTags[symbolTag] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
cloneableTags[errorTag] = cloneableTags[funcTag] = cloneableTags[weakMapTag] = false;

/**
 * The base implementation of `_.clone` and `_.cloneDeep` which tracks
 * traversed objects.
 *
 * @private
 * @param {*} value The value to clone.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Deep clone
 *  2 - Flatten inherited properties
 *  4 - Clone symbols
 * @param {Function} [customizer] The function to customize cloning.
 * @param {string} [key] The key of `value`.
 * @param {Object} [object] The parent object of `value`.
 * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
 * @returns {*} Returns the cloned value.
 */
function baseClone(value, bitmask, customizer, key, object, stack) {
  var result,
    isDeep = bitmask & CLONE_DEEP_FLAG,
    isFlat = bitmask & CLONE_FLAT_FLAG,
    isFull = bitmask & CLONE_SYMBOLS_FLAG;
  if (customizer) {
    result = object ? customizer(value, key, object, stack) : customizer(value);
  }
  if (result !== undefined) {
    return result;
  }
  if (!isObject(value)) {
    return value;
  }
  var isArr = isArray(value);
  if (isArr) {
    result = initCloneArray(value);
    if (!isDeep) {
      return copyArray(value, result);
    }
  } else {
    var tag = getTag(value),
      isFunc = tag == funcTag || tag == genTag;
    if (isBuffer(value)) {
      return cloneBuffer(value, isDeep);
    }
    if (tag == objectTag || tag == argsTag || isFunc && !object) {
      result = isFlat || isFunc ? {} : initCloneObject(value);
      if (!isDeep) {
        return isFlat ? copySymbolsIn(value, baseAssignIn(result, value)) : copySymbols(value, baseAssign(result, value));
      }
    } else {
      if (!cloneableTags[tag]) {
        return object ? value : {};
      }
      result = initCloneByTag(value, tag, isDeep);
    }
  }
  // Check for circular references and return its corresponding clone.
  stack || (stack = new Stack());
  var stacked = stack.get(value);
  if (stacked) {
    return stacked;
  }
  stack.set(value, result);
  if (isSet(value)) {
    value.forEach(function (subValue) {
      result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
    });
  } else if (isMap(value)) {
    value.forEach(function (subValue, key) {
      result.set(key, baseClone(subValue, bitmask, customizer, key, value, stack));
    });
  }
  var keysFunc = isFull ? isFlat ? getAllKeysIn : getAllKeys : isFlat ? keysIn : keys;
  var props = isArr ? undefined : keysFunc(value);
  arrayEach(props || value, function (subValue, key) {
    if (props) {
      key = subValue;
      subValue = value[key];
    }
    // Recursively populate clone (susceptible to call stack limits).
    assignValue(result, key, baseClone(subValue, bitmask, customizer, key, value, stack));
  });
  return result;
}
module.exports = baseClone;

/***/ }),

/***/ 84691:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isObject = __webpack_require__(60188);

/** Built-in value references. */
var objectCreate = Object.create;

/**
 * The base implementation of `_.create` without support for assigning
 * properties to the created object.
 *
 * @private
 * @param {Object} proto The object to inherit from.
 * @returns {Object} Returns the new object.
 */
var baseCreate = function () {
  function object() {}
  return function (proto) {
    if (!isObject(proto)) {
      return {};
    }
    if (objectCreate) {
      return objectCreate(proto);
    }
    object.prototype = proto;
    var result = new object();
    object.prototype = undefined;
    return result;
  };
}();
module.exports = baseCreate;

/***/ }),

/***/ 90649:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var arrayPush = __webpack_require__(96841),
  isFlattenable = __webpack_require__(32282);

/**
 * The base implementation of `_.flatten` with support for restricting flattening.
 *
 * @private
 * @param {Array} array The array to flatten.
 * @param {number} depth The maximum recursion depth.
 * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
 * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
 * @param {Array} [result=[]] The initial result value.
 * @returns {Array} Returns the new flattened array.
 */
function baseFlatten(array, depth, predicate, isStrict, result) {
  var index = -1,
    length = array.length;
  predicate || (predicate = isFlattenable);
  result || (result = []);
  while (++index < length) {
    var value = array[index];
    if (depth > 0 && predicate(value)) {
      if (depth > 1) {
        // Recursively flatten arrays (susceptible to call stack limits).
        baseFlatten(value, depth - 1, predicate, isStrict, result);
      } else {
        arrayPush(result, value);
      }
    } else if (!isStrict) {
      result[result.length] = value;
    }
  }
  return result;
}
module.exports = baseFlatten;

/***/ }),

/***/ 91603:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var castPath = __webpack_require__(21958),
  toKey = __webpack_require__(83816);

/**
 * The base implementation of `_.get` without support for default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @returns {*} Returns the resolved value.
 */
function baseGet(object, path) {
  path = castPath(path, object);
  var index = 0,
    length = path.length;
  while (object != null && index < length) {
    object = object[toKey(path[index++])];
  }
  return index && index == length ? object : undefined;
}
module.exports = baseGet;

/***/ }),

/***/ 68900:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var arrayPush = __webpack_require__(96841),
  isArray = __webpack_require__(27334);

/**
 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @param {Function} symbolsFunc The function to get the symbols of `object`.
 * @returns {Array} Returns the array of property names and symbols.
 */
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
}
module.exports = baseGetAllKeys;

/***/ }),

/***/ 77859:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var _Symbol = __webpack_require__(71298),
  getRawTag = __webpack_require__(92054),
  objectToString = __webpack_require__(52029);

/** `Object#toString` result references. */
var nullTag = '[object Null]',
  undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = _Symbol ? _Symbol.toStringTag : undefined;

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
  return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
}
module.exports = baseGetTag;

/***/ }),

/***/ 95595:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseGetTag = __webpack_require__(77859),
  isObjectLike = __webpack_require__(72275);

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
module.exports = baseIsArguments;

/***/ }),

/***/ 63673:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var getTag = __webpack_require__(61910),
  isObjectLike = __webpack_require__(72275);

/** `Object#toString` result references. */
var mapTag = '[object Map]';

/**
 * The base implementation of `_.isMap` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a map, else `false`.
 */
function baseIsMap(value) {
  return isObjectLike(value) && getTag(value) == mapTag;
}
module.exports = baseIsMap;

/***/ }),

/***/ 10376:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isFunction = __webpack_require__(50503),
  isMasked = __webpack_require__(83943),
  isObject = __webpack_require__(60188),
  toSource = __webpack_require__(90642);

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for built-in method references. */
var funcProto = Function.prototype,
  objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' + funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}
module.exports = baseIsNative;

/***/ }),

/***/ 59327:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var getTag = __webpack_require__(61910),
  isObjectLike = __webpack_require__(72275);

/** `Object#toString` result references. */
var setTag = '[object Set]';

/**
 * The base implementation of `_.isSet` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a set, else `false`.
 */
function baseIsSet(value) {
  return isObjectLike(value) && getTag(value) == setTag;
}
module.exports = baseIsSet;

/***/ }),

/***/ 45666:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseGetTag = __webpack_require__(77859),
  isLength = __webpack_require__(58331),
  isObjectLike = __webpack_require__(72275);

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
  arrayTag = '[object Array]',
  boolTag = '[object Boolean]',
  dateTag = '[object Date]',
  errorTag = '[object Error]',
  funcTag = '[object Function]',
  mapTag = '[object Map]',
  numberTag = '[object Number]',
  objectTag = '[object Object]',
  regexpTag = '[object RegExp]',
  setTag = '[object Set]',
  stringTag = '[object String]',
  weakMapTag = '[object WeakMap]';
var arrayBufferTag = '[object ArrayBuffer]',
  dataViewTag = '[object DataView]',
  float32Tag = '[object Float32Array]',
  float64Tag = '[object Float64Array]',
  int8Tag = '[object Int8Array]',
  int16Tag = '[object Int16Array]',
  int32Tag = '[object Int32Array]',
  uint8Tag = '[object Uint8Array]',
  uint8ClampedTag = '[object Uint8ClampedArray]',
  uint16Tag = '[object Uint16Array]',
  uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
  return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}
module.exports = baseIsTypedArray;

/***/ }),

/***/ 72819:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isPrototype = __webpack_require__(14306),
  nativeKeys = __webpack_require__(74873);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

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
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}
module.exports = baseKeys;

/***/ }),

/***/ 77536:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isObject = __webpack_require__(60188),
  isPrototype = __webpack_require__(14306),
  nativeKeysIn = __webpack_require__(43810);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeysIn(object) {
  if (!isObject(object)) {
    return nativeKeysIn(object);
  }
  var isProto = isPrototype(object),
    result = [];
  for (var key in object) {
    if (!(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}
module.exports = baseKeysIn;

/***/ }),

/***/ 37723:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var constant = __webpack_require__(59307),
  defineProperty = __webpack_require__(84548),
  identity = __webpack_require__(83573);

/**
 * The base implementation of `setToString` without support for hot loop shorting.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var baseSetToString = !defineProperty ? identity : function (func, string) {
  return defineProperty(func, 'toString', {
    'configurable': true,
    'enumerable': false,
    'value': constant(string),
    'writable': true
  });
};
module.exports = baseSetToString;

/***/ }),

/***/ 27053:
/***/ (function(module) {

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
    start = -start > length ? 0 : length + start;
  }
  end = end > length ? length : end;
  if (end < 0) {
    end += length;
  }
  length = start > end ? 0 : end - start >>> 0;
  start >>>= 0;
  var result = Array(length);
  while (++index < length) {
    result[index] = array[index + start];
  }
  return result;
}
module.exports = baseSlice;

/***/ }),

/***/ 48713:
/***/ (function(module) {

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
module.exports = baseTimes;

/***/ }),

/***/ 50963:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var _Symbol = __webpack_require__(71298),
  arrayMap = __webpack_require__(83079),
  isArray = __webpack_require__(27334),
  isSymbol = __webpack_require__(24131);

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/** Used to convert symbols to primitives and strings. */
var symbolProto = _Symbol ? _Symbol.prototype : undefined,
  symbolToString = symbolProto ? symbolProto.toString : undefined;

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
  var result = value + '';
  return result == '0' && 1 / value == -INFINITY ? '-0' : result;
}
module.exports = baseToString;

/***/ }),

/***/ 30212:
/***/ (function(module) {

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function (value) {
    return func(value);
  };
}
module.exports = baseUnary;

/***/ }),

/***/ 85954:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var castPath = __webpack_require__(21958),
  last = __webpack_require__(63767),
  parent = __webpack_require__(19814),
  toKey = __webpack_require__(83816);

/**
 * The base implementation of `_.unset`.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {Array|string} path The property path to unset.
 * @returns {boolean} Returns `true` if the property is deleted, else `false`.
 */
function baseUnset(object, path) {
  path = castPath(path, object);
  object = parent(object, path);
  return object == null || delete object[toKey(last(path))];
}
module.exports = baseUnset;

/***/ }),

/***/ 21958:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isArray = __webpack_require__(27334),
  isKey = __webpack_require__(79283),
  stringToPath = __webpack_require__(24189),
  toString = __webpack_require__(55835);

/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @param {Object} [object] The object to query keys on.
 * @returns {Array} Returns the cast property path array.
 */
function castPath(value, object) {
  if (isArray(value)) {
    return value;
  }
  return isKey(value, object) ? [value] : stringToPath(toString(value));
}
module.exports = castPath;

/***/ }),

/***/ 15810:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var Uint8Array = __webpack_require__(1047);

/**
 * Creates a clone of `arrayBuffer`.
 *
 * @private
 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
 * @returns {ArrayBuffer} Returns the cloned array buffer.
 */
function cloneArrayBuffer(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new Uint8Array(result).set(new Uint8Array(arrayBuffer));
  return result;
}
module.exports = cloneArrayBuffer;

/***/ }),

/***/ 89627:
/***/ (function(module, exports, __webpack_require__) {

/* module decorator */ module = __webpack_require__.nmd(module);
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var root = __webpack_require__(58222);

/** Detect free variable `exports`. */
var freeExports = ( false ? 0 : _typeof(exports)) == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && ( false ? 0 : _typeof(module)) == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined,
  allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined;

/**
 * Creates a clone of  `buffer`.
 *
 * @private
 * @param {Buffer} buffer The buffer to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Buffer} Returns the cloned buffer.
 */
function cloneBuffer(buffer, isDeep) {
  if (isDeep) {
    return buffer.slice();
  }
  var length = buffer.length,
    result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
  buffer.copy(result);
  return result;
}
module.exports = cloneBuffer;

/***/ }),

/***/ 75024:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var cloneArrayBuffer = __webpack_require__(15810);

/**
 * Creates a clone of `dataView`.
 *
 * @private
 * @param {Object} dataView The data view to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned data view.
 */
function cloneDataView(dataView, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
}
module.exports = cloneDataView;

/***/ }),

/***/ 24148:
/***/ (function(module) {

/** Used to match `RegExp` flags from their coerced string values. */
var reFlags = /\w*$/;

/**
 * Creates a clone of `regexp`.
 *
 * @private
 * @param {Object} regexp The regexp to clone.
 * @returns {Object} Returns the cloned regexp.
 */
function cloneRegExp(regexp) {
  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
  result.lastIndex = regexp.lastIndex;
  return result;
}
module.exports = cloneRegExp;

/***/ }),

/***/ 12069:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var _Symbol = __webpack_require__(71298);

/** Used to convert symbols to primitives and strings. */
var symbolProto = _Symbol ? _Symbol.prototype : undefined,
  symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

/**
 * Creates a clone of the `symbol` object.
 *
 * @private
 * @param {Object} symbol The symbol object to clone.
 * @returns {Object} Returns the cloned symbol object.
 */
function cloneSymbol(symbol) {
  return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
}
module.exports = cloneSymbol;

/***/ }),

/***/ 38296:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var cloneArrayBuffer = __webpack_require__(15810);

/**
 * Creates a clone of `typedArray`.
 *
 * @private
 * @param {Object} typedArray The typed array to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned typed array.
 */
function cloneTypedArray(typedArray, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}
module.exports = cloneTypedArray;

/***/ }),

/***/ 18194:
/***/ (function(module) {

/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */
function copyArray(source, array) {
  var index = -1,
    length = source.length;
  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}
module.exports = copyArray;

/***/ }),

/***/ 5288:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var assignValue = __webpack_require__(38254),
  baseAssignValue = __webpack_require__(34593);

/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property identifiers to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @param {Function} [customizer] The function to customize copied values.
 * @returns {Object} Returns `object`.
 */
function copyObject(source, props, object, customizer) {
  var isNew = !object;
  object || (object = {});
  var index = -1,
    length = props.length;
  while (++index < length) {
    var key = props[index];
    var newValue = customizer ? customizer(object[key], source[key], key, object, source) : undefined;
    if (newValue === undefined) {
      newValue = source[key];
    }
    if (isNew) {
      baseAssignValue(object, key, newValue);
    } else {
      assignValue(object, key, newValue);
    }
  }
  return object;
}
module.exports = copyObject;

/***/ }),

/***/ 11786:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var copyObject = __webpack_require__(5288),
  getSymbols = __webpack_require__(48331);

/**
 * Copies own symbols of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy symbols from.
 * @param {Object} [object={}] The object to copy symbols to.
 * @returns {Object} Returns `object`.
 */
function copySymbols(source, object) {
  return copyObject(source, getSymbols(source), object);
}
module.exports = copySymbols;

/***/ }),

/***/ 38669:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var copyObject = __webpack_require__(5288),
  getSymbolsIn = __webpack_require__(11640);

/**
 * Copies own and inherited symbols of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy symbols from.
 * @param {Object} [object={}] The object to copy symbols to.
 * @returns {Object} Returns `object`.
 */
function copySymbolsIn(source, object) {
  return copyObject(source, getSymbolsIn(source), object);
}
module.exports = copySymbolsIn;

/***/ }),

/***/ 67470:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var root = __webpack_require__(58222);

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];
module.exports = coreJsData;

/***/ }),

/***/ 3899:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isPlainObject = __webpack_require__(45560);

/**
 * Used by `_.omit` to customize its `_.cloneDeep` use to only clone plain
 * objects.
 *
 * @private
 * @param {*} value The value to inspect.
 * @param {string} key The key of the property to inspect.
 * @returns {*} Returns the uncloned value or `undefined` to defer cloning to `_.cloneDeep`.
 */
function customOmitClone(value) {
  return isPlainObject(value) ? undefined : value;
}
module.exports = customOmitClone;

/***/ }),

/***/ 84548:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var getNative = __webpack_require__(17963);
var defineProperty = function () {
  try {
    var func = getNative(Object, 'defineProperty');
    func({}, '', {});
    return func;
  } catch (e) {}
}();
module.exports = defineProperty;

/***/ }),

/***/ 44111:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var flatten = __webpack_require__(91937),
  overRest = __webpack_require__(50674),
  setToString = __webpack_require__(89388);

/**
 * A specialized version of `baseRest` which flattens the rest array.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @returns {Function} Returns the new function.
 */
function flatRest(func) {
  return setToString(overRest(func, undefined, flatten), func + '');
}
module.exports = flatRest;

/***/ }),

/***/ 23847:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
/** Detect free variable `global` from Node.js. */
var freeGlobal = (typeof __webpack_require__.g === "undefined" ? "undefined" : _typeof(__webpack_require__.g)) == 'object' && __webpack_require__.g && __webpack_require__.g.Object === Object && __webpack_require__.g;
module.exports = freeGlobal;

/***/ }),

/***/ 90713:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseGetAllKeys = __webpack_require__(68900),
  getSymbols = __webpack_require__(48331),
  keys = __webpack_require__(21611);

/**
 * Creates an array of own enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeys(object) {
  return baseGetAllKeys(object, keys, getSymbols);
}
module.exports = getAllKeys;

/***/ }),

/***/ 76162:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseGetAllKeys = __webpack_require__(68900),
  getSymbolsIn = __webpack_require__(11640),
  keysIn = __webpack_require__(49592);

/**
 * Creates an array of own and inherited enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeysIn(object) {
  return baseGetAllKeys(object, keysIn, getSymbolsIn);
}
module.exports = getAllKeysIn;

/***/ }),

/***/ 64140:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isKeyable = __webpack_require__(38411);

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key) ? data[typeof key == 'string' ? 'string' : 'hash'] : data.map;
}
module.exports = getMapData;

/***/ }),

/***/ 17963:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseIsNative = __webpack_require__(10376),
  getValue = __webpack_require__(12875);

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}
module.exports = getNative;

/***/ }),

/***/ 92496:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var overArg = __webpack_require__(41254);

/** Built-in value references. */
var getPrototype = overArg(Object.getPrototypeOf, Object);
module.exports = getPrototype;

/***/ }),

/***/ 92054:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var _Symbol = __webpack_require__(71298);

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
var symToStringTag = _Symbol ? _Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
    tag = value[symToStringTag];
  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}
  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}
module.exports = getRawTag;

/***/ }),

/***/ 48331:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var arrayFilter = __webpack_require__(45879),
  stubArray = __webpack_require__(66650);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols;

/**
 * Creates an array of the own enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbols = !nativeGetSymbols ? stubArray : function (object) {
  if (object == null) {
    return [];
  }
  object = Object(object);
  return arrayFilter(nativeGetSymbols(object), function (symbol) {
    return propertyIsEnumerable.call(object, symbol);
  });
};
module.exports = getSymbols;

/***/ }),

/***/ 11640:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var arrayPush = __webpack_require__(96841),
  getPrototype = __webpack_require__(92496),
  getSymbols = __webpack_require__(48331),
  stubArray = __webpack_require__(66650);

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols;

/**
 * Creates an array of the own and inherited enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbolsIn = !nativeGetSymbols ? stubArray : function (object) {
  var result = [];
  while (object) {
    arrayPush(result, getSymbols(object));
    object = getPrototype(object);
  }
  return result;
};
module.exports = getSymbolsIn;

/***/ }),

/***/ 61910:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var DataView = __webpack_require__(89183),
  Map = __webpack_require__(2090),
  Promise = __webpack_require__(64085),
  Set = __webpack_require__(45360),
  WeakMap = __webpack_require__(97334),
  baseGetTag = __webpack_require__(77859),
  toSource = __webpack_require__(90642);

/** `Object#toString` result references. */
var mapTag = '[object Map]',
  objectTag = '[object Object]',
  promiseTag = '[object Promise]',
  setTag = '[object Set]',
  weakMapTag = '[object WeakMap]';
var dataViewTag = '[object DataView]';

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = toSource(DataView),
  mapCtorString = toSource(Map),
  promiseCtorString = toSource(Promise),
  setCtorString = toSource(Set),
  weakMapCtorString = toSource(WeakMap);

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
var getTag = baseGetTag;

// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
if (DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag || Map && getTag(new Map()) != mapTag || Promise && getTag(Promise.resolve()) != promiseTag || Set && getTag(new Set()) != setTag || WeakMap && getTag(new WeakMap()) != weakMapTag) {
  getTag = function getTag(value) {
    var result = baseGetTag(value),
      Ctor = result == objectTag ? value.constructor : undefined,
      ctorString = Ctor ? toSource(Ctor) : '';
    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString:
          return dataViewTag;
        case mapCtorString:
          return mapTag;
        case promiseCtorString:
          return promiseTag;
        case setCtorString:
          return setTag;
        case weakMapCtorString:
          return weakMapTag;
      }
    }
    return result;
  };
}
module.exports = getTag;

/***/ }),

/***/ 12875:
/***/ (function(module) {

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}
module.exports = getValue;

/***/ }),

/***/ 53305:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var nativeCreate = __webpack_require__(67793);

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
  this.size = 0;
}
module.exports = hashClear;

/***/ }),

/***/ 34577:
/***/ (function(module) {

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}
module.exports = hashDelete;

/***/ }),

/***/ 71000:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var nativeCreate = __webpack_require__(67793);

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}
module.exports = hashGet;

/***/ }),

/***/ 50476:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var nativeCreate = __webpack_require__(67793);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
}
module.exports = hashHas;

/***/ }),

/***/ 12796:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var nativeCreate = __webpack_require__(67793);

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = nativeCreate && value === undefined ? HASH_UNDEFINED : value;
  return this;
}
module.exports = hashSet;

/***/ }),

/***/ 30486:
/***/ (function(module) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Initializes an array clone.
 *
 * @private
 * @param {Array} array The array to clone.
 * @returns {Array} Returns the initialized clone.
 */
function initCloneArray(array) {
  var length = array.length,
    result = new array.constructor(length);

  // Add properties assigned by `RegExp#exec`.
  if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
    result.index = array.index;
    result.input = array.input;
  }
  return result;
}
module.exports = initCloneArray;

/***/ }),

/***/ 39400:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var cloneArrayBuffer = __webpack_require__(15810),
  cloneDataView = __webpack_require__(75024),
  cloneRegExp = __webpack_require__(24148),
  cloneSymbol = __webpack_require__(12069),
  cloneTypedArray = __webpack_require__(38296);

/** `Object#toString` result references. */
var boolTag = '[object Boolean]',
  dateTag = '[object Date]',
  mapTag = '[object Map]',
  numberTag = '[object Number]',
  regexpTag = '[object RegExp]',
  setTag = '[object Set]',
  stringTag = '[object String]',
  symbolTag = '[object Symbol]';
var arrayBufferTag = '[object ArrayBuffer]',
  dataViewTag = '[object DataView]',
  float32Tag = '[object Float32Array]',
  float64Tag = '[object Float64Array]',
  int8Tag = '[object Int8Array]',
  int16Tag = '[object Int16Array]',
  int32Tag = '[object Int32Array]',
  uint8Tag = '[object Uint8Array]',
  uint8ClampedTag = '[object Uint8ClampedArray]',
  uint16Tag = '[object Uint16Array]',
  uint32Tag = '[object Uint32Array]';

/**
 * Initializes an object clone based on its `toStringTag`.
 *
 * **Note:** This function only supports cloning values with tags of
 * `Boolean`, `Date`, `Error`, `Map`, `Number`, `RegExp`, `Set`, or `String`.
 *
 * @private
 * @param {Object} object The object to clone.
 * @param {string} tag The `toStringTag` of the object to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneByTag(object, tag, isDeep) {
  var Ctor = object.constructor;
  switch (tag) {
    case arrayBufferTag:
      return cloneArrayBuffer(object);
    case boolTag:
    case dateTag:
      return new Ctor(+object);
    case dataViewTag:
      return cloneDataView(object, isDeep);
    case float32Tag:
    case float64Tag:
    case int8Tag:
    case int16Tag:
    case int32Tag:
    case uint8Tag:
    case uint8ClampedTag:
    case uint16Tag:
    case uint32Tag:
      return cloneTypedArray(object, isDeep);
    case mapTag:
      return new Ctor();
    case numberTag:
    case stringTag:
      return new Ctor(object);
    case regexpTag:
      return cloneRegExp(object);
    case setTag:
      return new Ctor();
    case symbolTag:
      return cloneSymbol(object);
  }
}
module.exports = initCloneByTag;

/***/ }),

/***/ 14988:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseCreate = __webpack_require__(84691),
  getPrototype = __webpack_require__(92496),
  isPrototype = __webpack_require__(14306);

/**
 * Initializes an object clone.
 *
 * @private
 * @param {Object} object The object to clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneObject(object) {
  return typeof object.constructor == 'function' && !isPrototype(object) ? baseCreate(getPrototype(object)) : {};
}
module.exports = initCloneObject;

/***/ }),

/***/ 32282:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var _Symbol = __webpack_require__(71298),
  isArguments = __webpack_require__(60387),
  isArray = __webpack_require__(27334);

/** Built-in value references. */
var spreadableSymbol = _Symbol ? _Symbol.isConcatSpreadable : undefined;

/**
 * Checks if `value` is a flattenable `arguments` object or array.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
 */
function isFlattenable(value) {
  return isArray(value) || isArguments(value) || !!(spreadableSymbol && value && value[spreadableSymbol]);
}
module.exports = isFlattenable;

/***/ }),

/***/ 58864:
/***/ (function(module) {

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

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
  var type = _typeof(value);
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length && (type == 'number' || type != 'symbol' && reIsUint.test(value)) && value > -1 && value % 1 == 0 && value < length;
}
module.exports = isIndex;

/***/ }),

/***/ 79283:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var isArray = __webpack_require__(27334),
  isSymbol = __webpack_require__(24131);

/** Used to match property names within property paths. */
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
  reIsPlainProp = /^\w*$/;

/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */
function isKey(value, object) {
  if (isArray(value)) {
    return false;
  }
  var type = _typeof(value);
  if (type == 'number' || type == 'symbol' || type == 'boolean' || value == null || isSymbol(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
}
module.exports = isKey;

/***/ }),

/***/ 38411:
/***/ (function(module) {

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = _typeof(value);
  return type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean' ? value !== '__proto__' : value === null;
}
module.exports = isKeyable;

/***/ }),

/***/ 83943:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var coreJsData = __webpack_require__(67470);

/** Used to detect methods masquerading as native. */
var maskSrcKey = function () {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? 'Symbol(src)_1.' + uid : '';
}();

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && maskSrcKey in func;
}
module.exports = isMasked;

/***/ }),

/***/ 14306:
/***/ (function(module) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
    proto = typeof Ctor == 'function' && Ctor.prototype || objectProto;
  return value === proto;
}
module.exports = isPrototype;

/***/ }),

/***/ 52409:
/***/ (function(module) {

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}
module.exports = listCacheClear;

/***/ }),

/***/ 44017:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(95322);

/** Used for built-in method references. */
var arrayProto = Array.prototype;

/** Built-in value references. */
var splice = arrayProto.splice;

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
    index = assocIndexOf(data, key);
  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}
module.exports = listCacheDelete;

/***/ }),

/***/ 10584:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(95322);

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
    index = assocIndexOf(data, key);
  return index < 0 ? undefined : data[index][1];
}
module.exports = listCacheGet;

/***/ }),

/***/ 68876:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(95322);

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}
module.exports = listCacheHas;

/***/ }),

/***/ 89564:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(95322);

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
    index = assocIndexOf(data, key);
  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}
module.exports = listCacheSet;

/***/ }),

/***/ 54793:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var Hash = __webpack_require__(17466),
  ListCache = __webpack_require__(32922),
  Map = __webpack_require__(2090);

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new Hash(),
    'map': new (Map || ListCache)(),
    'string': new Hash()
  };
}
module.exports = mapCacheClear;

/***/ }),

/***/ 59009:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var getMapData = __webpack_require__(64140);

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  var result = getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}
module.exports = mapCacheDelete;

/***/ }),

/***/ 41512:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var getMapData = __webpack_require__(64140);

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}
module.exports = mapCacheGet;

/***/ }),

/***/ 21500:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var getMapData = __webpack_require__(64140);

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}
module.exports = mapCacheHas;

/***/ }),

/***/ 53676:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var getMapData = __webpack_require__(64140);

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  var data = getMapData(this, key),
    size = data.size;
  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}
module.exports = mapCacheSet;

/***/ }),

/***/ 56485:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var memoize = __webpack_require__(35811);

/** Used as the maximum memoize cache size. */
var MAX_MEMOIZE_SIZE = 500;

/**
 * A specialized version of `_.memoize` which clears the memoized function's
 * cache when it exceeds `MAX_MEMOIZE_SIZE`.
 *
 * @private
 * @param {Function} func The function to have its output memoized.
 * @returns {Function} Returns the new memoized function.
 */
function memoizeCapped(func) {
  var result = memoize(func, function (key) {
    if (cache.size === MAX_MEMOIZE_SIZE) {
      cache.clear();
    }
    return key;
  });
  var cache = result.cache;
  return result;
}
module.exports = memoizeCapped;

/***/ }),

/***/ 67793:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var getNative = __webpack_require__(17963);

/* Built-in method references that are verified to be native. */
var nativeCreate = getNative(Object, 'create');
module.exports = nativeCreate;

/***/ }),

/***/ 74873:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var overArg = __webpack_require__(41254);

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = overArg(Object.keys, Object);
module.exports = nativeKeys;

/***/ }),

/***/ 43810:
/***/ (function(module) {

/**
 * This function is like
 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * except that it includes inherited enumerable properties.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function nativeKeysIn(object) {
  var result = [];
  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }
  return result;
}
module.exports = nativeKeysIn;

/***/ }),

/***/ 70546:
/***/ (function(module, exports, __webpack_require__) {

/* module decorator */ module = __webpack_require__.nmd(module);
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var freeGlobal = __webpack_require__(23847);

/** Detect free variable `exports`. */
var freeExports = ( false ? 0 : _typeof(exports)) == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && ( false ? 0 : _typeof(module)) == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = function () {
  try {
    // Use `util.types` for Node.js 10+.
    var types = freeModule && freeModule.require && freeModule.require('util').types;
    if (types) {
      return types;
    }

    // Legacy `process.binding('util')` for Node.js < 10.
    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
}();
module.exports = nodeUtil;

/***/ }),

/***/ 52029:
/***/ (function(module) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}
module.exports = objectToString;

/***/ }),

/***/ 41254:
/***/ (function(module) {

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function (arg) {
    return func(transform(arg));
  };
}
module.exports = overArg;

/***/ }),

/***/ 50674:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var apply = __webpack_require__(8176);

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * A specialized version of `baseRest` which transforms the rest array.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @param {Function} transform The rest array transform.
 * @returns {Function} Returns the new function.
 */
function overRest(func, start, transform) {
  start = nativeMax(start === undefined ? func.length - 1 : start, 0);
  return function () {
    var args = arguments,
      index = -1,
      length = nativeMax(args.length - start, 0),
      array = Array(length);
    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = transform(array);
    return apply(func, this, otherArgs);
  };
}
module.exports = overRest;

/***/ }),

/***/ 19814:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseGet = __webpack_require__(91603),
  baseSlice = __webpack_require__(27053);

/**
 * Gets the parent value at `path` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array} path The path to get the parent value of.
 * @returns {*} Returns the parent value.
 */
function parent(object, path) {
  return path.length < 2 ? object : baseGet(object, baseSlice(path, 0, -1));
}
module.exports = parent;

/***/ }),

/***/ 58222:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var freeGlobal = __webpack_require__(23847);

/** Detect free variable `self`. */
var freeSelf = (typeof self === "undefined" ? "undefined" : _typeof(self)) == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();
module.exports = root;

/***/ }),

/***/ 89388:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseSetToString = __webpack_require__(37723),
  shortOut = __webpack_require__(91108);

/**
 * Sets the `toString` method of `func` to return `string`.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var setToString = shortOut(baseSetToString);
module.exports = setToString;

/***/ }),

/***/ 91108:
/***/ (function(module) {

/** Used to detect hot functions by number of calls within a span of milliseconds. */
var HOT_COUNT = 800,
  HOT_SPAN = 16;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeNow = Date.now;

/**
 * Creates a function that'll short out and invoke `identity` instead
 * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
 * milliseconds.
 *
 * @private
 * @param {Function} func The function to restrict.
 * @returns {Function} Returns the new shortable function.
 */
function shortOut(func) {
  var count = 0,
    lastCalled = 0;
  return function () {
    var stamp = nativeNow(),
      remaining = HOT_SPAN - (stamp - lastCalled);
    lastCalled = stamp;
    if (remaining > 0) {
      if (++count >= HOT_COUNT) {
        return arguments[0];
      }
    } else {
      count = 0;
    }
    return func.apply(undefined, arguments);
  };
}
module.exports = shortOut;

/***/ }),

/***/ 41111:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var ListCache = __webpack_require__(32922);

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = new ListCache();
  this.size = 0;
}
module.exports = stackClear;

/***/ }),

/***/ 79427:
/***/ (function(module) {

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  var data = this.__data__,
    result = data['delete'](key);
  this.size = data.size;
  return result;
}
module.exports = stackDelete;

/***/ }),

/***/ 28770:
/***/ (function(module) {

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}
module.exports = stackGet;

/***/ }),

/***/ 71830:
/***/ (function(module) {

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}
module.exports = stackHas;

/***/ }),

/***/ 74094:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var ListCache = __webpack_require__(32922),
  Map = __webpack_require__(2090),
  MapCache = __webpack_require__(73706);

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache) {
    var pairs = data.__data__;
    if (!Map || pairs.length < LARGE_ARRAY_SIZE - 1) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}
module.exports = stackSet;

/***/ }),

/***/ 24189:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var memoizeCapped = __webpack_require__(56485);

/** Used to match property names within property paths. */
var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

/** Used to match backslashes in property paths. */
var reEscapeChar = /\\(\\)?/g;

/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */
var stringToPath = memoizeCapped(function (string) {
  var result = [];
  if (string.charCodeAt(0) === 46 /* . */) {
    result.push('');
  }
  string.replace(rePropName, function (match, number, quote, subString) {
    result.push(quote ? subString.replace(reEscapeChar, '$1') : number || match);
  });
  return result;
});
module.exports = stringToPath;

/***/ }),

/***/ 83816:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isSymbol = __webpack_require__(24131);

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */
function toKey(value) {
  if (typeof value == 'string' || isSymbol(value)) {
    return value;
  }
  var result = value + '';
  return result == '0' && 1 / value == -INFINITY ? '-0' : result;
}
module.exports = toKey;

/***/ }),

/***/ 90642:
/***/ (function(module) {

/** Used for built-in method references. */
var funcProto = Function.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return func + '';
    } catch (e) {}
  }
  return '';
}
module.exports = toSource;

/***/ }),

/***/ 59307:
/***/ (function(module) {

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
function constant(value) {
  return function () {
    return value;
  };
}
module.exports = constant;

/***/ }),

/***/ 48285:
/***/ (function(module) {

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || value !== value && other !== other;
}
module.exports = eq;

/***/ }),

/***/ 91937:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseFlatten = __webpack_require__(90649);

/**
 * Flattens `array` a single level deep.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to flatten.
 * @returns {Array} Returns the new flattened array.
 * @example
 *
 * _.flatten([1, [2, [3, [4]], 5]]);
 * // => [1, 2, [3, [4]], 5]
 */
function flatten(array) {
  var length = array == null ? 0 : array.length;
  return length ? baseFlatten(array, 1) : [];
}
module.exports = flatten;

/***/ }),

/***/ 83573:
/***/ (function(module) {

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
module.exports = identity;

/***/ }),

/***/ 60387:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseIsArguments = __webpack_require__(95595),
  isObjectLike = __webpack_require__(72275);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

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
var isArguments = baseIsArguments(function () {
  return arguments;
}()) ? baseIsArguments : function (value) {
  return isObjectLike(value) && hasOwnProperty.call(value, 'callee') && !propertyIsEnumerable.call(value, 'callee');
};
module.exports = isArguments;

/***/ }),

/***/ 27334:
/***/ (function(module) {

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
module.exports = isArray;

/***/ }),

/***/ 59969:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isFunction = __webpack_require__(50503),
  isLength = __webpack_require__(58331);

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
module.exports = isArrayLike;

/***/ }),

/***/ 94621:
/***/ (function(module, exports, __webpack_require__) {

/* module decorator */ module = __webpack_require__.nmd(module);
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var root = __webpack_require__(58222),
  stubFalse = __webpack_require__(86436);

/** Detect free variable `exports`. */
var freeExports = ( false ? 0 : _typeof(exports)) == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && ( false ? 0 : _typeof(module)) == 'object' && module && !module.nodeType && module;

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
module.exports = isBuffer;

/***/ }),

/***/ 50503:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseGetTag = __webpack_require__(77859),
  isObject = __webpack_require__(60188);

/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]',
  funcTag = '[object Function]',
  genTag = '[object GeneratorFunction]',
  proxyTag = '[object Proxy]';

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
module.exports = isFunction;

/***/ }),

/***/ 58331:
/***/ (function(module) {

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
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}
module.exports = isLength;

/***/ }),

/***/ 66593:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseIsMap = __webpack_require__(63673),
  baseUnary = __webpack_require__(30212),
  nodeUtil = __webpack_require__(70546);

/* Node.js helper references. */
var nodeIsMap = nodeUtil && nodeUtil.isMap;

/**
 * Checks if `value` is classified as a `Map` object.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a map, else `false`.
 * @example
 *
 * _.isMap(new Map);
 * // => true
 *
 * _.isMap(new WeakMap);
 * // => false
 */
var isMap = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap;
module.exports = isMap;

/***/ }),

/***/ 60188:
/***/ (function(module) {

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
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
  var type = _typeof(value);
  return value != null && (type == 'object' || type == 'function');
}
module.exports = isObject;

/***/ }),

/***/ 72275:
/***/ (function(module) {

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
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
  return value != null && _typeof(value) == 'object';
}
module.exports = isObjectLike;

/***/ }),

/***/ 45560:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseGetTag = __webpack_require__(77859),
  getPrototype = __webpack_require__(92496),
  isObjectLike = __webpack_require__(72275);

/** `Object#toString` result references. */
var objectTag = '[object Object]';

/** Used for built-in method references. */
var funcProto = Function.prototype,
  objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to infer the `Object` constructor. */
var objectCtorString = funcToString.call(Object);

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject(value) {
  if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
    return false;
  }
  var proto = getPrototype(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
  return typeof Ctor == 'function' && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
}
module.exports = isPlainObject;

/***/ }),

/***/ 54423:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseIsSet = __webpack_require__(59327),
  baseUnary = __webpack_require__(30212),
  nodeUtil = __webpack_require__(70546);

/* Node.js helper references. */
var nodeIsSet = nodeUtil && nodeUtil.isSet;

/**
 * Checks if `value` is classified as a `Set` object.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a set, else `false`.
 * @example
 *
 * _.isSet(new Set);
 * // => true
 *
 * _.isSet(new WeakSet);
 * // => false
 */
var isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;
module.exports = isSet;

/***/ }),

/***/ 24131:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var baseGetTag = __webpack_require__(77859),
  isObjectLike = __webpack_require__(72275);

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
  return _typeof(value) == 'symbol' || isObjectLike(value) && baseGetTag(value) == symbolTag;
}
module.exports = isSymbol;

/***/ }),

/***/ 6570:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseIsTypedArray = __webpack_require__(45666),
  baseUnary = __webpack_require__(30212),
  nodeUtil = __webpack_require__(70546);

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
module.exports = isTypedArray;

/***/ }),

/***/ 21611:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var arrayLikeKeys = __webpack_require__(87782),
  baseKeys = __webpack_require__(72819),
  isArrayLike = __webpack_require__(59969);

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
module.exports = keys;

/***/ }),

/***/ 49592:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var arrayLikeKeys = __webpack_require__(87782),
  baseKeysIn = __webpack_require__(77536),
  isArrayLike = __webpack_require__(59969);

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
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
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn(object) {
  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
}
module.exports = keysIn;

/***/ }),

/***/ 63767:
/***/ (function(module) {

/**
 * Gets the last element of `array`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to query.
 * @returns {*} Returns the last element of `array`.
 * @example
 *
 * _.last([1, 2, 3]);
 * // => 3
 */
function last(array) {
  var length = array == null ? 0 : array.length;
  return length ? array[length - 1] : undefined;
}
module.exports = last;

/***/ }),

/***/ 35811:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var MapCache = __webpack_require__(73706);

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `clear`, `delete`, `get`, `has`, and `set`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 * var other = { 'c': 3, 'd': 4 };
 *
 * var values = _.memoize(_.values);
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b']);
 * values(object);
 * // => ['a', 'b']
 *
 * // Replace `_.memoize.Cache`.
 * _.memoize.Cache = WeakMap;
 */
function memoize(func, resolver) {
  if (typeof func != 'function' || resolver != null && typeof resolver != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var memoized = function memoized() {
    var args = arguments,
      key = resolver ? resolver.apply(this, args) : args[0],
      cache = memoized.cache;
    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result) || cache;
    return result;
  };
  memoized.cache = new (memoize.Cache || MapCache)();
  return memoized;
}

// Expose `MapCache`.
memoize.Cache = MapCache;
module.exports = memoize;

/***/ }),

/***/ 53870:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var arrayMap = __webpack_require__(83079),
  baseClone = __webpack_require__(48966),
  baseUnset = __webpack_require__(85954),
  castPath = __webpack_require__(21958),
  copyObject = __webpack_require__(5288),
  customOmitClone = __webpack_require__(3899),
  flatRest = __webpack_require__(44111),
  getAllKeysIn = __webpack_require__(76162);

/** Used to compose bitmasks for cloning. */
var CLONE_DEEP_FLAG = 1,
  CLONE_FLAT_FLAG = 2,
  CLONE_SYMBOLS_FLAG = 4;

/**
 * The opposite of `_.pick`; this method creates an object composed of the
 * own and inherited enumerable property paths of `object` that are not omitted.
 *
 * **Note:** This method is considerably slower than `_.pick`.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The source object.
 * @param {...(string|string[])} [paths] The property paths to omit.
 * @returns {Object} Returns the new object.
 * @example
 *
 * var object = { 'a': 1, 'b': '2', 'c': 3 };
 *
 * _.omit(object, ['a', 'c']);
 * // => { 'b': '2' }
 */
var omit = flatRest(function (object, paths) {
  var result = {};
  if (object == null) {
    return result;
  }
  var isDeep = false;
  paths = arrayMap(paths, function (path) {
    path = castPath(path, object);
    isDeep || (isDeep = path.length > 1);
    return path;
  });
  copyObject(object, getAllKeysIn(object), result);
  if (isDeep) {
    result = baseClone(result, CLONE_DEEP_FLAG | CLONE_FLAT_FLAG | CLONE_SYMBOLS_FLAG, customOmitClone);
  }
  var length = paths.length;
  while (length--) {
    baseUnset(result, paths[length]);
  }
  return result;
});
module.exports = omit;

/***/ }),

/***/ 66650:
/***/ (function(module) {

/**
 * This method returns a new empty array.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Array} Returns the new empty array.
 * @example
 *
 * var arrays = _.times(2, _.stubArray);
 *
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 */
function stubArray() {
  return [];
}
module.exports = stubArray;

/***/ }),

/***/ 86436:
/***/ (function(module) {

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
module.exports = stubFalse;

/***/ }),

/***/ 55835:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseToString = __webpack_require__(50963);

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
module.exports = toString;

/***/ }),

/***/ 49242:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
/**
 * @license React
 * use-sync-external-store-shim.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


var e = __webpack_require__(14552);
function h(a, b) {
  return a === b && (0 !== a || 1 / a === 1 / b) || a !== a && b !== b;
}
var k = "function" === typeof Object.is ? Object.is : h,
  l = e.useState,
  m = e.useEffect,
  n = e.useLayoutEffect,
  p = e.useDebugValue;
function q(a, b) {
  var d = b(),
    f = l({
      inst: {
        value: d,
        getSnapshot: b
      }
    }),
    c = f[0].inst,
    g = f[1];
  n(function () {
    c.value = d;
    c.getSnapshot = b;
    r(c) && g({
      inst: c
    });
  }, [a, d, b]);
  m(function () {
    r(c) && g({
      inst: c
    });
    return a(function () {
      r(c) && g({
        inst: c
      });
    });
  }, [a]);
  p(d);
  return d;
}
function r(a) {
  var b = a.getSnapshot;
  a = a.value;
  try {
    var d = b();
    return !k(a, d);
  } catch (f) {
    return !0;
  }
}
function t(a, b) {
  return b();
}
var u = "undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement ? t : q;
exports.useSyncExternalStore = void 0 !== e.useSyncExternalStore ? e.useSyncExternalStore : u;

/***/ }),

/***/ 84821:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


var h = __webpack_require__(14552),
  n = __webpack_require__(67819);
function p(a, b) {
  return a === b && (0 !== a || 1 / a === 1 / b) || a !== a && b !== b;
}
var q = "function" === typeof Object.is ? Object.is : p,
  r = n.useSyncExternalStore,
  t = h.useRef,
  u = h.useEffect,
  v = h.useMemo,
  w = h.useDebugValue;
exports.useSyncExternalStoreWithSelector = function (a, b, e, l, g) {
  var c = t(null);
  if (null === c.current) {
    var f = {
      hasValue: !1,
      value: null
    };
    c.current = f;
  } else f = c.current;
  c = v(function () {
    function a(a) {
      if (!c) {
        c = !0;
        d = a;
        a = l(a);
        if (void 0 !== g && f.hasValue) {
          var b = f.value;
          if (g(b, a)) return k = b;
        }
        return k = a;
      }
      b = k;
      if (q(d, a)) return b;
      var e = l(a);
      if (void 0 !== g && g(b, e)) return b;
      d = a;
      return k = e;
    }
    var c = !1,
      d,
      k,
      m = void 0 === e ? null : e;
    return [function () {
      return a(b());
    }, null === m ? void 0 : function () {
      return a(m());
    }];
  }, [b, e, l, g]);
  var d = r(a, c[0], c[1]);
  u(function () {
    f.hasValue = !0;
    f.value = d;
  }, [d]);
  w(d);
  return d;
};

/***/ }),

/***/ 67819:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


if (true) {
  module.exports = __webpack_require__(49242);
} else {}

/***/ }),

/***/ 79121:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


if (true) {
  module.exports = __webpack_require__(84821);
} else {}

/***/ }),

/***/ 66799:
/***/ (function() {

"use strict";
// extracted by mini-css-extract-plugin


/***/ }),

/***/ 16254:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var has = (__webpack_require__(53452).has);

// Perform ? RequireInternalSlot(M, [[MapData]])
module.exports = function (it) {
  has(it);
  return it;
};

/***/ }),

/***/ 7263:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var classof = __webpack_require__(5647);
var hasOwn = __webpack_require__(64661);
var isNullOrUndefined = __webpack_require__(46905);
var wellKnownSymbol = __webpack_require__(27527);
var Iterators = __webpack_require__(70057);
var ITERATOR = wellKnownSymbol('iterator');
var $Object = Object;
module.exports = function (it) {
  if (isNullOrUndefined(it)) return false;
  var O = $Object(it);
  return O[ITERATOR] !== undefined || '@@iterator' in O || hasOwn(Iterators, classof(O));
};

/***/ }),

/***/ 88331:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var uncurryThis = __webpack_require__(43452);
var iterateSimple = __webpack_require__(47631);
var MapHelpers = __webpack_require__(53452);
var Map = MapHelpers.Map;
var MapPrototype = MapHelpers.proto;
var forEach = uncurryThis(MapPrototype.forEach);
var entries = uncurryThis(MapPrototype.entries);
var next = entries(new Map()).next;
module.exports = function (map, fn, interruptible) {
  return interruptible ? iterateSimple({
    iterator: entries(map),
    next: next
  }, function (entry) {
    return fn(entry[1], entry[0]);
  }) : forEach(map, fn);
};

/***/ }),

/***/ 46209:
/***/ (function(module) {

"use strict";


// `SameValueZero` abstract operation
// https://tc39.es/ecma262/#sec-samevaluezero
module.exports = function (x, y) {
  // eslint-disable-next-line no-self-compare -- NaN check
  return x === y || x !== x && y !== y;
};

/***/ }),

/***/ 16366:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var getBuiltIn = __webpack_require__(9091);
var isCallable = __webpack_require__(74297);
var isIterable = __webpack_require__(7263);
var isObject = __webpack_require__(16126);
var Set = getBuiltIn('Set');
var isSetLike = function isSetLike(it) {
  return isObject(it) && typeof it.size == 'number' && isCallable(it.has) && isCallable(it.keys);
};

// fallback old -> new set methods proposal arguments
module.exports = function (it) {
  if (isSetLike(it)) return it;
  return isIterable(it) ? new Set(it) : it;
};

/***/ }),

/***/ 21969:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(49538);
var aMap = __webpack_require__(16254);
var remove = (__webpack_require__(53452).remove);

// `Map.prototype.deleteAll` method
// https://github.com/tc39/proposal-collection-methods
$({
  target: 'Map',
  proto: true,
  real: true,
  forced: true
}, {
  deleteAll: function deleteAll( /* ...elements */
  ) {
    var collection = aMap(this);
    var allDeleted = true;
    var wasDeleted;
    for (var k = 0, len = arguments.length; k < len; k++) {
      wasDeleted = remove(collection, arguments[k]);
      allDeleted = allDeleted && wasDeleted;
    }
    return !!allDeleted;
  }
});

/***/ }),

/***/ 24941:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(49538);
var bind = __webpack_require__(97412);
var aMap = __webpack_require__(16254);
var iterate = __webpack_require__(88331);

// `Map.prototype.every` method
// https://github.com/tc39/proposal-collection-methods
$({
  target: 'Map',
  proto: true,
  real: true,
  forced: true
}, {
  every: function every(callbackfn /* , thisArg */) {
    var map = aMap(this);
    var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    return iterate(map, function (value, key) {
      if (!boundFunction(value, key, map)) return false;
    }, true) !== false;
  }
});

/***/ }),

/***/ 89514:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(49538);
var bind = __webpack_require__(97412);
var aMap = __webpack_require__(16254);
var MapHelpers = __webpack_require__(53452);
var iterate = __webpack_require__(88331);
var Map = MapHelpers.Map;
var set = MapHelpers.set;

// `Map.prototype.filter` method
// https://github.com/tc39/proposal-collection-methods
$({
  target: 'Map',
  proto: true,
  real: true,
  forced: true
}, {
  filter: function filter(callbackfn /* , thisArg */) {
    var map = aMap(this);
    var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    var newMap = new Map();
    iterate(map, function (value, key) {
      if (boundFunction(value, key, map)) set(newMap, key, value);
    });
    return newMap;
  }
});

/***/ }),

/***/ 31861:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(49538);
var bind = __webpack_require__(97412);
var aMap = __webpack_require__(16254);
var iterate = __webpack_require__(88331);

// `Map.prototype.findKey` method
// https://github.com/tc39/proposal-collection-methods
$({
  target: 'Map',
  proto: true,
  real: true,
  forced: true
}, {
  findKey: function findKey(callbackfn /* , thisArg */) {
    var map = aMap(this);
    var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    var result = iterate(map, function (value, key) {
      if (boundFunction(value, key, map)) return {
        key: key
      };
    }, true);
    return result && result.key;
  }
});

/***/ }),

/***/ 33995:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(49538);
var bind = __webpack_require__(97412);
var aMap = __webpack_require__(16254);
var iterate = __webpack_require__(88331);

// `Map.prototype.find` method
// https://github.com/tc39/proposal-collection-methods
$({
  target: 'Map',
  proto: true,
  real: true,
  forced: true
}, {
  find: function find(callbackfn /* , thisArg */) {
    var map = aMap(this);
    var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    var result = iterate(map, function (value, key) {
      if (boundFunction(value, key, map)) return {
        value: value
      };
    }, true);
    return result && result.value;
  }
});

/***/ }),

/***/ 63469:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(49538);
var sameValueZero = __webpack_require__(46209);
var aMap = __webpack_require__(16254);
var iterate = __webpack_require__(88331);

// `Map.prototype.includes` method
// https://github.com/tc39/proposal-collection-methods
$({
  target: 'Map',
  proto: true,
  real: true,
  forced: true
}, {
  includes: function includes(searchElement) {
    return iterate(aMap(this), function (value) {
      if (sameValueZero(value, searchElement)) return true;
    }, true) === true;
  }
});

/***/ }),

/***/ 28163:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(49538);
var aMap = __webpack_require__(16254);
var iterate = __webpack_require__(88331);

// `Map.prototype.keyOf` method
// https://github.com/tc39/proposal-collection-methods
$({
  target: 'Map',
  proto: true,
  real: true,
  forced: true
}, {
  keyOf: function keyOf(searchElement) {
    var result = iterate(aMap(this), function (value, key) {
      if (value === searchElement) return {
        key: key
      };
    }, true);
    return result && result.key;
  }
});

/***/ }),

/***/ 47469:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(49538);
var bind = __webpack_require__(97412);
var aMap = __webpack_require__(16254);
var MapHelpers = __webpack_require__(53452);
var iterate = __webpack_require__(88331);
var Map = MapHelpers.Map;
var set = MapHelpers.set;

// `Map.prototype.mapKeys` method
// https://github.com/tc39/proposal-collection-methods
$({
  target: 'Map',
  proto: true,
  real: true,
  forced: true
}, {
  mapKeys: function mapKeys(callbackfn /* , thisArg */) {
    var map = aMap(this);
    var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    var newMap = new Map();
    iterate(map, function (value, key) {
      set(newMap, boundFunction(value, key, map), value);
    });
    return newMap;
  }
});

/***/ }),

/***/ 66875:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(49538);
var bind = __webpack_require__(97412);
var aMap = __webpack_require__(16254);
var MapHelpers = __webpack_require__(53452);
var iterate = __webpack_require__(88331);
var Map = MapHelpers.Map;
var set = MapHelpers.set;

// `Map.prototype.mapValues` method
// https://github.com/tc39/proposal-collection-methods
$({
  target: 'Map',
  proto: true,
  real: true,
  forced: true
}, {
  mapValues: function mapValues(callbackfn /* , thisArg */) {
    var map = aMap(this);
    var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    var newMap = new Map();
    iterate(map, function (value, key) {
      set(newMap, key, boundFunction(value, key, map));
    });
    return newMap;
  }
});

/***/ }),

/***/ 40486:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(49538);
var aMap = __webpack_require__(16254);
var iterate = __webpack_require__(63672);
var set = (__webpack_require__(53452).set);

// `Map.prototype.merge` method
// https://github.com/tc39/proposal-collection-methods
$({
  target: 'Map',
  proto: true,
  real: true,
  arity: 1,
  forced: true
}, {
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  merge: function merge(iterable /* ...iterables */) {
    var map = aMap(this);
    var argumentsLength = arguments.length;
    var i = 0;
    while (i < argumentsLength) {
      iterate(arguments[i++], function (key, value) {
        set(map, key, value);
      }, {
        AS_ENTRIES: true
      });
    }
    return map;
  }
});

/***/ }),

/***/ 3458:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(49538);
var aCallable = __webpack_require__(98070);
var aMap = __webpack_require__(16254);
var iterate = __webpack_require__(88331);
var $TypeError = TypeError;

// `Map.prototype.reduce` method
// https://github.com/tc39/proposal-collection-methods
$({
  target: 'Map',
  proto: true,
  real: true,
  forced: true
}, {
  reduce: function reduce(callbackfn /* , initialValue */) {
    var map = aMap(this);
    var noInitial = arguments.length < 2;
    var accumulator = noInitial ? undefined : arguments[1];
    aCallable(callbackfn);
    iterate(map, function (value, key) {
      if (noInitial) {
        noInitial = false;
        accumulator = value;
      } else {
        accumulator = callbackfn(accumulator, value, key, map);
      }
    });
    if (noInitial) throw new $TypeError('Reduce of empty map with no initial value');
    return accumulator;
  }
});

/***/ }),

/***/ 19928:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(49538);
var bind = __webpack_require__(97412);
var aMap = __webpack_require__(16254);
var iterate = __webpack_require__(88331);

// `Map.prototype.some` method
// https://github.com/tc39/proposal-collection-methods
$({
  target: 'Map',
  proto: true,
  real: true,
  forced: true
}, {
  some: function some(callbackfn /* , thisArg */) {
    var map = aMap(this);
    var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    return iterate(map, function (value, key) {
      if (boundFunction(value, key, map)) return true;
    }, true) === true;
  }
});

/***/ }),

/***/ 36161:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(49538);
var aCallable = __webpack_require__(98070);
var aMap = __webpack_require__(16254);
var MapHelpers = __webpack_require__(53452);
var $TypeError = TypeError;
var get = MapHelpers.get;
var has = MapHelpers.has;
var set = MapHelpers.set;

// `Map.prototype.update` method
// https://github.com/tc39/proposal-collection-methods
$({
  target: 'Map',
  proto: true,
  real: true,
  forced: true
}, {
  update: function update(key, callback /* , thunk */) {
    var map = aMap(this);
    var length = arguments.length;
    aCallable(callback);
    var isPresentInMap = has(map, key);
    if (!isPresentInMap && length < 3) {
      throw new $TypeError('Updating absent value');
    }
    var value = isPresentInMap ? get(map, key) : aCallable(length > 2 ? arguments[2] : undefined)(key, map);
    set(map, key, callback(value, key, map));
    return map;
  }
});

/***/ }),

/***/ 1705:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(49538);
var aSet = __webpack_require__(56700);
var add = (__webpack_require__(74126).add);

// `Set.prototype.addAll` method
// https://github.com/tc39/proposal-collection-methods
$({
  target: 'Set',
  proto: true,
  real: true,
  forced: true
}, {
  addAll: function addAll( /* ...elements */
  ) {
    var set = aSet(this);
    for (var k = 0, len = arguments.length; k < len; k++) {
      add(set, arguments[k]);
    }
    return set;
  }
});

/***/ }),

/***/ 49331:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(49538);
var aSet = __webpack_require__(56700);
var remove = (__webpack_require__(74126).remove);

// `Set.prototype.deleteAll` method
// https://github.com/tc39/proposal-collection-methods
$({
  target: 'Set',
  proto: true,
  real: true,
  forced: true
}, {
  deleteAll: function deleteAll( /* ...elements */
  ) {
    var collection = aSet(this);
    var allDeleted = true;
    var wasDeleted;
    for (var k = 0, len = arguments.length; k < len; k++) {
      wasDeleted = remove(collection, arguments[k]);
      allDeleted = allDeleted && wasDeleted;
    }
    return !!allDeleted;
  }
});

/***/ }),

/***/ 99933:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(49538);
var call = __webpack_require__(26289);
var toSetLike = __webpack_require__(16366);
var $difference = __webpack_require__(83428);

// `Set.prototype.difference` method
// https://github.com/tc39/proposal-set-methods
// TODO: Obsolete version, remove from `core-js@4`
$({
  target: 'Set',
  proto: true,
  real: true,
  forced: true
}, {
  difference: function difference(other) {
    return call($difference, this, toSetLike(other));
  }
});

/***/ }),

/***/ 71323:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(49538);
var bind = __webpack_require__(97412);
var aSet = __webpack_require__(56700);
var iterate = __webpack_require__(4505);

// `Set.prototype.every` method
// https://github.com/tc39/proposal-collection-methods
$({
  target: 'Set',
  proto: true,
  real: true,
  forced: true
}, {
  every: function every(callbackfn /* , thisArg */) {
    var set = aSet(this);
    var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    return iterate(set, function (value) {
      if (!boundFunction(value, value, set)) return false;
    }, true) !== false;
  }
});

/***/ }),

/***/ 48788:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(49538);
var bind = __webpack_require__(97412);
var aSet = __webpack_require__(56700);
var SetHelpers = __webpack_require__(74126);
var iterate = __webpack_require__(4505);
var Set = SetHelpers.Set;
var add = SetHelpers.add;

// `Set.prototype.filter` method
// https://github.com/tc39/proposal-collection-methods
$({
  target: 'Set',
  proto: true,
  real: true,
  forced: true
}, {
  filter: function filter(callbackfn /* , thisArg */) {
    var set = aSet(this);
    var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    var newSet = new Set();
    iterate(set, function (value) {
      if (boundFunction(value, value, set)) add(newSet, value);
    });
    return newSet;
  }
});

/***/ }),

/***/ 44453:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(49538);
var bind = __webpack_require__(97412);
var aSet = __webpack_require__(56700);
var iterate = __webpack_require__(4505);

// `Set.prototype.find` method
// https://github.com/tc39/proposal-collection-methods
$({
  target: 'Set',
  proto: true,
  real: true,
  forced: true
}, {
  find: function find(callbackfn /* , thisArg */) {
    var set = aSet(this);
    var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    var result = iterate(set, function (value) {
      if (boundFunction(value, value, set)) return {
        value: value
      };
    }, true);
    return result && result.value;
  }
});

/***/ }),

/***/ 37135:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(49538);
var call = __webpack_require__(26289);
var toSetLike = __webpack_require__(16366);
var $intersection = __webpack_require__(95490);

// `Set.prototype.intersection` method
// https://github.com/tc39/proposal-set-methods
// TODO: Obsolete version, remove from `core-js@4`
$({
  target: 'Set',
  proto: true,
  real: true,
  forced: true
}, {
  intersection: function intersection(other) {
    return call($intersection, this, toSetLike(other));
  }
});

/***/ }),

/***/ 98592:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(49538);
var call = __webpack_require__(26289);
var toSetLike = __webpack_require__(16366);
var $isDisjointFrom = __webpack_require__(94789);

// `Set.prototype.isDisjointFrom` method
// https://github.com/tc39/proposal-set-methods
// TODO: Obsolete version, remove from `core-js@4`
$({
  target: 'Set',
  proto: true,
  real: true,
  forced: true
}, {
  isDisjointFrom: function isDisjointFrom(other) {
    return call($isDisjointFrom, this, toSetLike(other));
  }
});

/***/ }),

/***/ 7551:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(49538);
var call = __webpack_require__(26289);
var toSetLike = __webpack_require__(16366);
var $isSubsetOf = __webpack_require__(51874);

// `Set.prototype.isSubsetOf` method
// https://github.com/tc39/proposal-set-methods
// TODO: Obsolete version, remove from `core-js@4`
$({
  target: 'Set',
  proto: true,
  real: true,
  forced: true
}, {
  isSubsetOf: function isSubsetOf(other) {
    return call($isSubsetOf, this, toSetLike(other));
  }
});

/***/ }),

/***/ 96038:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(49538);
var call = __webpack_require__(26289);
var toSetLike = __webpack_require__(16366);
var $isSupersetOf = __webpack_require__(86251);

// `Set.prototype.isSupersetOf` method
// https://github.com/tc39/proposal-set-methods
// TODO: Obsolete version, remove from `core-js@4`
$({
  target: 'Set',
  proto: true,
  real: true,
  forced: true
}, {
  isSupersetOf: function isSupersetOf(other) {
    return call($isSupersetOf, this, toSetLike(other));
  }
});

/***/ }),

/***/ 89298:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(49538);
var uncurryThis = __webpack_require__(43452);
var aSet = __webpack_require__(56700);
var iterate = __webpack_require__(4505);
var toString = __webpack_require__(84987);
var arrayJoin = uncurryThis([].join);
var push = uncurryThis([].push);

// `Set.prototype.join` method
// https://github.com/tc39/proposal-collection-methods
$({
  target: 'Set',
  proto: true,
  real: true,
  forced: true
}, {
  join: function join(separator) {
    var set = aSet(this);
    var sep = separator === undefined ? ',' : toString(separator);
    var array = [];
    iterate(set, function (value) {
      push(array, value);
    });
    return arrayJoin(array, sep);
  }
});

/***/ }),

/***/ 3402:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(49538);
var bind = __webpack_require__(97412);
var aSet = __webpack_require__(56700);
var SetHelpers = __webpack_require__(74126);
var iterate = __webpack_require__(4505);
var Set = SetHelpers.Set;
var add = SetHelpers.add;

// `Set.prototype.map` method
// https://github.com/tc39/proposal-collection-methods
$({
  target: 'Set',
  proto: true,
  real: true,
  forced: true
}, {
  map: function map(callbackfn /* , thisArg */) {
    var set = aSet(this);
    var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    var newSet = new Set();
    iterate(set, function (value) {
      add(newSet, boundFunction(value, value, set));
    });
    return newSet;
  }
});

/***/ }),

/***/ 50996:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(49538);
var aCallable = __webpack_require__(98070);
var aSet = __webpack_require__(56700);
var iterate = __webpack_require__(4505);
var $TypeError = TypeError;

// `Set.prototype.reduce` method
// https://github.com/tc39/proposal-collection-methods
$({
  target: 'Set',
  proto: true,
  real: true,
  forced: true
}, {
  reduce: function reduce(callbackfn /* , initialValue */) {
    var set = aSet(this);
    var noInitial = arguments.length < 2;
    var accumulator = noInitial ? undefined : arguments[1];
    aCallable(callbackfn);
    iterate(set, function (value) {
      if (noInitial) {
        noInitial = false;
        accumulator = value;
      } else {
        accumulator = callbackfn(accumulator, value, value, set);
      }
    });
    if (noInitial) throw new $TypeError('Reduce of empty set with no initial value');
    return accumulator;
  }
});

/***/ }),

/***/ 78546:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(49538);
var bind = __webpack_require__(97412);
var aSet = __webpack_require__(56700);
var iterate = __webpack_require__(4505);

// `Set.prototype.some` method
// https://github.com/tc39/proposal-collection-methods
$({
  target: 'Set',
  proto: true,
  real: true,
  forced: true
}, {
  some: function some(callbackfn /* , thisArg */) {
    var set = aSet(this);
    var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    return iterate(set, function (value) {
      if (boundFunction(value, value, set)) return true;
    }, true) === true;
  }
});

/***/ }),

/***/ 80839:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(49538);
var call = __webpack_require__(26289);
var toSetLike = __webpack_require__(16366);
var $symmetricDifference = __webpack_require__(33598);

// `Set.prototype.symmetricDifference` method
// https://github.com/tc39/proposal-set-methods
// TODO: Obsolete version, remove from `core-js@4`
$({
  target: 'Set',
  proto: true,
  real: true,
  forced: true
}, {
  symmetricDifference: function symmetricDifference(other) {
    return call($symmetricDifference, this, toSetLike(other));
  }
});

/***/ }),

/***/ 70963:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(49538);
var call = __webpack_require__(26289);
var toSetLike = __webpack_require__(16366);
var $union = __webpack_require__(71520);

// `Set.prototype.union` method
// https://github.com/tc39/proposal-set-methods
// TODO: Obsolete version, remove from `core-js@4`
$({
  target: 'Set',
  proto: true,
  real: true,
  forced: true
}, {
  union: function union(other) {
    return call($union, this, toSetLike(other));
  }
});

/***/ }),

/***/ 53673:
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   V: function() { return /* binding */ Background$1; },
/* harmony export */   _: function() { return /* binding */ BackgroundVariant; }
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(14552);
/* harmony import */ var classcat__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(47754);
/* harmony import */ var _reactflow_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(95594);
/* harmony import */ var zustand_shallow__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(33753);
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }




var BackgroundVariant;
(function (BackgroundVariant) {
  BackgroundVariant["Lines"] = "lines";
  BackgroundVariant["Dots"] = "dots";
  BackgroundVariant["Cross"] = "cross";
})(BackgroundVariant || (BackgroundVariant = {}));
function LinePattern(_ref) {
  var color = _ref.color,
    dimensions = _ref.dimensions,
    lineWidth = _ref.lineWidth;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    stroke: color,
    strokeWidth: lineWidth,
    d: "M".concat(dimensions[0] / 2, " 0 V").concat(dimensions[1], " M0 ").concat(dimensions[1] / 2, " H").concat(dimensions[0])
  });
}
function DotPattern(_ref2) {
  var color = _ref2.color,
    radius = _ref2.radius;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle", {
    cx: radius,
    cy: radius,
    r: radius,
    fill: color
  });
}
var defaultColor = _defineProperty(_defineProperty(_defineProperty({}, BackgroundVariant.Dots, '#91919a'), BackgroundVariant.Lines, '#eee'), BackgroundVariant.Cross, '#e2e2e2');
var defaultSize = _defineProperty(_defineProperty(_defineProperty({}, BackgroundVariant.Dots, 1), BackgroundVariant.Lines, 1), BackgroundVariant.Cross, 6);
var selector = function selector(s) {
  return {
    transform: s.transform,
    patternId: "pattern-".concat(s.rfId)
  };
};
function Background(_ref3) {
  var id = _ref3.id,
    _ref3$variant = _ref3.variant,
    variant = _ref3$variant === void 0 ? BackgroundVariant.Dots : _ref3$variant,
    _ref3$gap = _ref3.gap,
    gap = _ref3$gap === void 0 ? 20 : _ref3$gap,
    size = _ref3.size,
    _ref3$lineWidth = _ref3.lineWidth,
    lineWidth = _ref3$lineWidth === void 0 ? 1 : _ref3$lineWidth,
    _ref3$offset = _ref3.offset,
    offset = _ref3$offset === void 0 ? 2 : _ref3$offset,
    color = _ref3.color,
    style = _ref3.style,
    className = _ref3.className;
  var ref = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  var _useStore = (0,_reactflow_core__WEBPACK_IMPORTED_MODULE_1__/* .useStore */ .Pj)(selector, zustand_shallow__WEBPACK_IMPORTED_MODULE_2__/* .shallow */ .x),
    transform = _useStore.transform,
    patternId = _useStore.patternId;
  var patternColor = color || defaultColor[variant];
  var patternSize = size || defaultSize[variant];
  var isDots = variant === BackgroundVariant.Dots;
  var isCross = variant === BackgroundVariant.Cross;
  var gapXY = Array.isArray(gap) ? gap : [gap, gap];
  var scaledGap = [gapXY[0] * transform[2] || 1, gapXY[1] * transform[2] || 1];
  var scaledSize = patternSize * transform[2];
  var patternDimensions = isCross ? [scaledSize, scaledSize] : scaledGap;
  var patternOffset = isDots ? [scaledSize / offset, scaledSize / offset] : [patternDimensions[0] / offset, patternDimensions[1] / offset];
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg", {
    className: (0,classcat__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A)(['react-flow__background', className]),
    style: _objectSpread(_objectSpread({}, style), {}, {
      position: 'absolute',
      width: '100%',
      height: '100%',
      top: 0,
      left: 0
    }),
    ref: ref,
    "data-testid": "rf__background"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("pattern", {
    id: patternId + id,
    x: transform[0] % scaledGap[0],
    y: transform[1] % scaledGap[1],
    width: scaledGap[0],
    height: scaledGap[1],
    patternUnits: "userSpaceOnUse",
    patternTransform: "translate(-".concat(patternOffset[0], ",-").concat(patternOffset[1], ")")
  }, isDots ? ( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(DotPattern, {
    color: patternColor,
    radius: scaledSize / offset
  })) : ( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(LinePattern, {
    dimensions: patternDimensions,
    color: patternColor,
    lineWidth: lineWidth
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("rect", {
    x: "0",
    y: "0",
    width: "100%",
    height: "100%",
    fill: "url(#".concat(patternId + id, ")")
  }));
}
Background.displayName = 'Background';
var Background$1 = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.memo)(Background);


/***/ }),

/***/ 19504:
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   H: function() { return /* binding */ Controls$1; },
/* harmony export */   a: function() { return /* binding */ ControlButton; }
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(14552);
/* harmony import */ var classcat__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(47754);
/* harmony import */ var zustand_shallow__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(33753);
/* harmony import */ var _reactflow_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(95594);
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _excluded = ["children", "className"];
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }




function PlusIcon() {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    d: "M32 18.133H18.133V32h-4.266V18.133H0v-4.266h13.867V0h4.266v13.867H32z"
  }));
}
function MinusIcon() {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 5"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    d: "M0 0h32v4.2H0z"
  }));
}
function FitViewIcon() {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 30"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    d: "M3.692 4.63c0-.53.4-.938.939-.938h5.215V0H4.708C2.13 0 0 2.054 0 4.63v5.216h3.692V4.631zM27.354 0h-5.2v3.692h5.17c.53 0 .984.4.984.939v5.215H32V4.631A4.624 4.624 0 0027.354 0zm.954 24.83c0 .532-.4.94-.939.94h-5.215v3.768h5.215c2.577 0 4.631-2.13 4.631-4.707v-5.139h-3.692v5.139zm-23.677.94c-.531 0-.939-.4-.939-.94v-5.138H0v5.139c0 2.577 2.13 4.707 4.708 4.707h5.138V25.77H4.631z"
  }));
}
function LockIcon() {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 25 32"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    d: "M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0 8 0 4.571 3.429 4.571 7.619v3.048H3.048A3.056 3.056 0 000 13.714v15.238A3.056 3.056 0 003.048 32h18.285a3.056 3.056 0 003.048-3.048V13.714a3.056 3.056 0 00-3.048-3.047zM12.19 24.533a3.056 3.056 0 01-3.047-3.047 3.056 3.056 0 013.047-3.048 3.056 3.056 0 013.048 3.048 3.056 3.056 0 01-3.048 3.047zm4.724-13.866H7.467V7.619c0-2.59 2.133-4.724 4.723-4.724 2.591 0 4.724 2.133 4.724 4.724v3.048z"
  }));
}
function UnlockIcon() {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 25 32"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    d: "M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0c-4.114 1.828-1.37 2.133.305 2.438 1.676.305 4.42 2.59 4.42 5.181v3.048H3.047A3.056 3.056 0 000 13.714v15.238A3.056 3.056 0 003.048 32h18.285a3.056 3.056 0 003.048-3.048V13.714a3.056 3.056 0 00-3.048-3.047zM12.19 24.533a3.056 3.056 0 01-3.047-3.047 3.056 3.056 0 013.047-3.048 3.056 3.056 0 013.048 3.048 3.056 3.056 0 01-3.048 3.047z"
  }));
}
var ControlButton = function ControlButton(_ref) {
  var children = _ref.children,
    className = _ref.className,
    rest = _objectWithoutProperties(_ref, _excluded);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", _objectSpread({
    type: "button",
    className: (0,classcat__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A)(['react-flow__controls-button', className])
  }, rest), children);
};
ControlButton.displayName = 'ControlButton';
var selector = function selector(s) {
  return {
    isInteractive: s.nodesDraggable || s.nodesConnectable || s.elementsSelectable,
    minZoomReached: s.transform[2] <= s.minZoom,
    maxZoomReached: s.transform[2] >= s.maxZoom
  };
};
var Controls = function Controls(_ref2) {
  var style = _ref2.style,
    _ref2$showZoom = _ref2.showZoom,
    showZoom = _ref2$showZoom === void 0 ? true : _ref2$showZoom,
    _ref2$showFitView = _ref2.showFitView,
    showFitView = _ref2$showFitView === void 0 ? true : _ref2$showFitView,
    _ref2$showInteractive = _ref2.showInteractive,
    showInteractive = _ref2$showInteractive === void 0 ? true : _ref2$showInteractive,
    fitViewOptions = _ref2.fitViewOptions,
    onZoomIn = _ref2.onZoomIn,
    onZoomOut = _ref2.onZoomOut,
    onFitView = _ref2.onFitView,
    onInteractiveChange = _ref2.onInteractiveChange,
    className = _ref2.className,
    children = _ref2.children,
    _ref2$position = _ref2.position,
    position = _ref2$position === void 0 ? 'bottom-left' : _ref2$position;
  var store = (0,_reactflow_core__WEBPACK_IMPORTED_MODULE_2__/* .useStoreApi */ .PI)();
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    isVisible = _useState2[0],
    setIsVisible = _useState2[1];
  var _useStore = (0,_reactflow_core__WEBPACK_IMPORTED_MODULE_2__/* .useStore */ .Pj)(selector, zustand_shallow__WEBPACK_IMPORTED_MODULE_3__/* .shallow */ .x),
    isInteractive = _useStore.isInteractive,
    minZoomReached = _useStore.minZoomReached,
    maxZoomReached = _useStore.maxZoomReached;
  var _useReactFlow = (0,_reactflow_core__WEBPACK_IMPORTED_MODULE_2__/* .useReactFlow */ .VH)(),
    zoomIn = _useReactFlow.zoomIn,
    zoomOut = _useReactFlow.zoomOut,
    fitView = _useReactFlow.fitView;
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    setIsVisible(true);
  }, []);
  if (!isVisible) {
    return null;
  }
  var onZoomInHandler = function onZoomInHandler() {
    zoomIn();
    onZoomIn === null || onZoomIn === void 0 || onZoomIn();
  };
  var onZoomOutHandler = function onZoomOutHandler() {
    zoomOut();
    onZoomOut === null || onZoomOut === void 0 || onZoomOut();
  };
  var onFitViewHandler = function onFitViewHandler() {
    fitView(fitViewOptions);
    onFitView === null || onFitView === void 0 || onFitView();
  };
  var onToggleInteractivity = function onToggleInteractivity() {
    store.setState({
      nodesDraggable: !isInteractive,
      nodesConnectable: !isInteractive,
      elementsSelectable: !isInteractive
    });
    onInteractiveChange === null || onInteractiveChange === void 0 || onInteractiveChange(!isInteractive);
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_reactflow_core__WEBPACK_IMPORTED_MODULE_2__/* .Panel */ .Zk, {
    className: (0,classcat__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A)(['react-flow__controls', className]),
    position: position,
    style: style,
    "data-testid": "rf__controls"
  }, showZoom && ( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(ControlButton, {
    onClick: onZoomInHandler,
    className: "react-flow__controls-zoomin",
    title: "zoom in",
    "aria-label": "zoom in",
    disabled: maxZoomReached
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(PlusIcon, null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(ControlButton, {
    onClick: onZoomOutHandler,
    className: "react-flow__controls-zoomout",
    title: "zoom out",
    "aria-label": "zoom out",
    disabled: minZoomReached
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(MinusIcon, null)))), showFitView && ( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(ControlButton, {
    className: "react-flow__controls-fitview",
    onClick: onFitViewHandler,
    title: "fit view",
    "aria-label": "fit view"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(FitViewIcon, null))), showInteractive && ( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(ControlButton, {
    className: "react-flow__controls-interactive",
    onClick: onToggleInteractivity,
    title: "toggle interactivity",
    "aria-label": "toggle interactivity"
  }, isInteractive ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(UnlockIcon, null) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(LockIcon, null))), children);
};
Controls.displayName = 'Controls';
var Controls$1 = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.memo)(Controls);


/***/ }),

/***/ 95594:
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  tE: function() { return /* binding */ BaseEdge; },
  Do: function() { return /* binding */ ConnectionLineType; },
  rV: function() { return /* binding */ EdgeLabelRenderer; },
  h7: function() { return /* binding */ Handle$1; },
  TG: function() { return /* binding */ MarkerType; },
  Zk: function() { return /* binding */ Panel; },
  yX: function() { return /* binding */ Position; },
  Gc: function() { return /* binding */ ReactFlow; },
  Ln: function() { return /* binding */ ReactFlowProvider; },
  Fp: function() { return /* binding */ getBezierPath; },
  Mi: function() { return /* binding */ getBoundsOfRects; },
  Cz: function() { return /* binding */ getNodePositionWithOrigin; },
  Jo: function() { return /* binding */ getNodesBounds; },
  fM: function() { return /* binding */ useEdgesState; },
  ck: function() { return /* binding */ useNodesState; },
  p4: function() { return /* binding */ useOnSelectionChange; },
  VH: function() { return /* binding */ useReactFlow; },
  Pj: function() { return /* binding */ useStore; },
  PI: function() { return /* binding */ useStoreApi; }
});

// UNUSED EXPORTS: BezierEdge, ConnectionMode, EdgeText, PanOnScrollMode, SelectionMode, SimpleBezierEdge, SmoothStepEdge, StepEdge, StraightEdge, addEdge, applyEdgeChanges, applyNodeChanges, boxToRect, clamp, getConnectedEdges, getIncomers, getMarkerEnd, getOutgoers, getRectOfNodes, getSimpleBezierPath, getSmoothStepPath, getStraightPath, getTransformForBounds, getViewportForBounds, handleParentExpand, internalsSymbol, isEdge, isNode, rectToBox, updateEdge, useEdges, useGetPointerPosition, useKeyPress, useNodeId, useNodes, useNodesInitialized, useOnViewportChange, useUpdateNodeInternals, useViewport

// EXTERNAL MODULE: ./node_modules/.pnpm/react@17.0.2/node_modules/react/index.js
var react = __webpack_require__(14552);
// EXTERNAL MODULE: ./node_modules/.pnpm/classcat@5.0.4/node_modules/classcat/index.js
var classcat = __webpack_require__(47754);
// EXTERNAL MODULE: ./node_modules/.pnpm/use-sync-external-store@1.2.0_react@17.0.2/node_modules/use-sync-external-store/shim/with-selector.js
var with_selector = __webpack_require__(79121);
// EXTERNAL MODULE: ./node_modules/.pnpm/zustand@4.5.2_@types+react@17.0.80_immer@10.1.1_react@17.0.2/node_modules/zustand/esm/vanilla.mjs
var vanilla = __webpack_require__(2268);
;// CONCATENATED MODULE: ./node_modules/.pnpm/zustand@4.5.2_@types+react@17.0.80_immer@10.1.1_react@17.0.2/node_modules/zustand/esm/traditional.mjs



var useDebugValue = react.useDebugValue;
var useSyncExternalStoreWithSelector = with_selector.useSyncExternalStoreWithSelector;
var identity = function identity(arg) {
  return arg;
};
function useStoreWithEqualityFn(api) {
  var selector = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : identity;
  var equalityFn = arguments.length > 2 ? arguments[2] : undefined;
  var slice = useSyncExternalStoreWithSelector(api.subscribe, api.getState, api.getServerState || api.getInitialState, selector, equalityFn);
  useDebugValue(slice);
  return slice;
}
var createWithEqualityFnImpl = function createWithEqualityFnImpl(createState, defaultEqualityFn) {
  var api = (0,vanilla/* createStore */.y)(createState);
  var useBoundStoreWithEqualityFn = function useBoundStoreWithEqualityFn(selector) {
    var equalityFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultEqualityFn;
    return useStoreWithEqualityFn(api, selector, equalityFn);
  };
  Object.assign(useBoundStoreWithEqualityFn, api);
  return useBoundStoreWithEqualityFn;
};
var createWithEqualityFn = function createWithEqualityFn(createState, defaultEqualityFn) {
  return createState ? createWithEqualityFnImpl(createState, defaultEqualityFn) : createWithEqualityFnImpl;
};

// EXTERNAL MODULE: ./node_modules/.pnpm/zustand@4.5.2_@types+react@17.0.80_immer@10.1.1_react@17.0.2/node_modules/zustand/esm/shallow.mjs
var esm_shallow = __webpack_require__(33753);
// EXTERNAL MODULE: ./node_modules/.pnpm/d3-zoom@3.0.0/node_modules/d3-zoom/src/index.js + 49 modules
var src = __webpack_require__(69741);
// EXTERNAL MODULE: ./node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/select.js
var src_select = __webpack_require__(65633);
// EXTERNAL MODULE: ./node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/pointer.js + 1 modules
var pointer = __webpack_require__(71137);
// EXTERNAL MODULE: ./node_modules/.pnpm/d3-dispatch@3.0.1/node_modules/d3-dispatch/src/dispatch.js
var dispatch = __webpack_require__(11378);
// EXTERNAL MODULE: ./node_modules/.pnpm/d3-drag@3.0.0/node_modules/d3-drag/src/nodrag.js
var nodrag = __webpack_require__(98582);
// EXTERNAL MODULE: ./node_modules/.pnpm/d3-drag@3.0.0/node_modules/d3-drag/src/noevent.js
var noevent = __webpack_require__(1958);
;// CONCATENATED MODULE: ./node_modules/.pnpm/d3-drag@3.0.0/node_modules/d3-drag/src/constant.js
/* harmony default export */ var constant = (function (x) {
  return function () {
    return x;
  };
});
;// CONCATENATED MODULE: ./node_modules/.pnpm/d3-drag@3.0.0/node_modules/d3-drag/src/event.js
function DragEvent(type, _ref) {
  var sourceEvent = _ref.sourceEvent,
    subject = _ref.subject,
    target = _ref.target,
    identifier = _ref.identifier,
    active = _ref.active,
    x = _ref.x,
    y = _ref.y,
    dx = _ref.dx,
    dy = _ref.dy,
    dispatch = _ref.dispatch;
  Object.defineProperties(this, {
    type: {
      value: type,
      enumerable: true,
      configurable: true
    },
    sourceEvent: {
      value: sourceEvent,
      enumerable: true,
      configurable: true
    },
    subject: {
      value: subject,
      enumerable: true,
      configurable: true
    },
    target: {
      value: target,
      enumerable: true,
      configurable: true
    },
    identifier: {
      value: identifier,
      enumerable: true,
      configurable: true
    },
    active: {
      value: active,
      enumerable: true,
      configurable: true
    },
    x: {
      value: x,
      enumerable: true,
      configurable: true
    },
    y: {
      value: y,
      enumerable: true,
      configurable: true
    },
    dx: {
      value: dx,
      enumerable: true,
      configurable: true
    },
    dy: {
      value: dy,
      enumerable: true,
      configurable: true
    },
    _: {
      value: dispatch
    }
  });
}
DragEvent.prototype.on = function () {
  var value = this._.on.apply(this._, arguments);
  return value === this._ ? this : value;
};
;// CONCATENATED MODULE: ./node_modules/.pnpm/d3-drag@3.0.0/node_modules/d3-drag/src/drag.js







// Ignore right-click, since that should open the context menu.
function defaultFilter(event) {
  return !event.ctrlKey && !event.button;
}
function defaultContainer() {
  return this.parentNode;
}
function defaultSubject(event, d) {
  return d == null ? {
    x: event.x,
    y: event.y
  } : d;
}
function defaultTouchable() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
/* harmony default export */ function drag() {
  var filter = defaultFilter,
    container = defaultContainer,
    subject = defaultSubject,
    touchable = defaultTouchable,
    gestures = {},
    listeners = (0,dispatch/* default */.A)("start", "drag", "end"),
    active = 0,
    mousedownx,
    mousedowny,
    mousemoving,
    touchending,
    clickDistance2 = 0;
  function drag(selection) {
    selection.on("mousedown.drag", mousedowned).filter(touchable).on("touchstart.drag", touchstarted).on("touchmove.drag", touchmoved, noevent/* nonpassive */.vr).on("touchend.drag touchcancel.drag", touchended).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  function mousedowned(event, d) {
    if (touchending || !filter.call(this, event, d)) return;
    var gesture = beforestart(this, container.call(this, event, d), event, d, "mouse");
    if (!gesture) return;
    (0,src_select/* default */.A)(event.view).on("mousemove.drag", mousemoved, noevent/* nonpassivecapture */.Rw).on("mouseup.drag", mouseupped, noevent/* nonpassivecapture */.Rw);
    (0,nodrag/* default */.A)(event.view);
    (0,noevent/* nopropagation */.GK)(event);
    mousemoving = false;
    mousedownx = event.clientX;
    mousedowny = event.clientY;
    gesture("start", event);
  }
  function mousemoved(event) {
    (0,noevent/* default */.Ay)(event);
    if (!mousemoving) {
      var dx = event.clientX - mousedownx,
        dy = event.clientY - mousedowny;
      mousemoving = dx * dx + dy * dy > clickDistance2;
    }
    gestures.mouse("drag", event);
  }
  function mouseupped(event) {
    (0,src_select/* default */.A)(event.view).on("mousemove.drag mouseup.drag", null);
    (0,nodrag/* yesdrag */.y)(event.view, mousemoving);
    (0,noevent/* default */.Ay)(event);
    gestures.mouse("end", event);
  }
  function touchstarted(event, d) {
    if (!filter.call(this, event, d)) return;
    var touches = event.changedTouches,
      c = container.call(this, event, d),
      n = touches.length,
      i,
      gesture;
    for (i = 0; i < n; ++i) {
      if (gesture = beforestart(this, c, event, d, touches[i].identifier, touches[i])) {
        (0,noevent/* nopropagation */.GK)(event);
        gesture("start", event, touches[i]);
      }
    }
  }
  function touchmoved(event) {
    var touches = event.changedTouches,
      n = touches.length,
      i,
      gesture;
    for (i = 0; i < n; ++i) {
      if (gesture = gestures[touches[i].identifier]) {
        (0,noevent/* default */.Ay)(event);
        gesture("drag", event, touches[i]);
      }
    }
  }
  function touchended(event) {
    var touches = event.changedTouches,
      n = touches.length,
      i,
      gesture;
    if (touchending) clearTimeout(touchending);
    touchending = setTimeout(function () {
      touchending = null;
    }, 500); // Ghost clicks are delayed!
    for (i = 0; i < n; ++i) {
      if (gesture = gestures[touches[i].identifier]) {
        (0,noevent/* nopropagation */.GK)(event);
        gesture("end", event, touches[i]);
      }
    }
  }
  function beforestart(that, container, event, d, identifier, touch) {
    var dispatch = listeners.copy(),
      p = (0,pointer/* default */.A)(touch || event, container),
      dx,
      dy,
      s;
    if ((s = subject.call(that, new DragEvent("beforestart", {
      sourceEvent: event,
      target: drag,
      identifier: identifier,
      active: active,
      x: p[0],
      y: p[1],
      dx: 0,
      dy: 0,
      dispatch: dispatch
    }), d)) == null) return;
    dx = s.x - p[0] || 0;
    dy = s.y - p[1] || 0;
    return function gesture(type, event, touch) {
      var p0 = p,
        n;
      switch (type) {
        case "start":
          gestures[identifier] = gesture, n = active++;
          break;
        case "end":
          delete gestures[identifier], --active;
        // falls through
        case "drag":
          p = (0,pointer/* default */.A)(touch || event, container), n = active;
          break;
      }
      dispatch.call(type, that, new DragEvent(type, {
        sourceEvent: event,
        subject: s,
        target: drag,
        identifier: identifier,
        active: n,
        x: p[0] + dx,
        y: p[1] + dy,
        dx: p[0] - p0[0],
        dy: p[1] - p0[1],
        dispatch: dispatch
      }), d);
    };
  }
  drag.filter = function (_) {
    return arguments.length ? (filter = typeof _ === "function" ? _ : constant(!!_), drag) : filter;
  };
  drag.container = function (_) {
    return arguments.length ? (container = typeof _ === "function" ? _ : constant(_), drag) : container;
  };
  drag.subject = function (_) {
    return arguments.length ? (subject = typeof _ === "function" ? _ : constant(_), drag) : subject;
  };
  drag.touchable = function (_) {
    return arguments.length ? (touchable = typeof _ === "function" ? _ : constant(!!_), drag) : touchable;
  };
  drag.on = function () {
    var value = listeners.on.apply(listeners, arguments);
    return value === listeners ? drag : value;
  };
  drag.clickDistance = function (_) {
    return arguments.length ? (clickDistance2 = (_ = +_) * _, drag) : Math.sqrt(clickDistance2);
  };
  return drag;
}
// EXTERNAL MODULE: ./node_modules/.pnpm/react-dom@17.0.2_react@17.0.2/node_modules/react-dom/index.js
var react_dom = __webpack_require__(39098);
;// CONCATENATED MODULE: ./node_modules/.pnpm/@reactflow+core@11.10.4_@types+react@17.0.80_immer@10.1.1_react-dom@17.0.2_react@17.0.2__react@17.0.2/node_modules/@reactflow/core/dist/esm/index.mjs
var _excluded = ["position", "children", "className", "style"],
  _excluded2 = ["x", "y", "label", "labelStyle", "labelShowBg", "labelBgStyle", "labelBgPadding", "labelBgBorderRadius", "children", "className"],
  _excluded3 = (/* unused pure expression or super */ null && (["id"])),
  _excluded4 = ["type", "position", "isValidConnection", "isConnectable", "isConnectableStart", "isConnectableEnd", "id", "onConnect", "children", "className", "onMouseDown", "onTouchStart"],
  _excluded5 = ["nodes", "edges", "defaultNodes", "defaultEdges", "className", "nodeTypes", "edgeTypes", "onNodeClick", "onEdgeClick", "onInit", "onMove", "onMoveStart", "onMoveEnd", "onConnect", "onConnectStart", "onConnectEnd", "onClickConnectStart", "onClickConnectEnd", "onNodeMouseEnter", "onNodeMouseMove", "onNodeMouseLeave", "onNodeContextMenu", "onNodeDoubleClick", "onNodeDragStart", "onNodeDrag", "onNodeDragStop", "onNodesDelete", "onEdgesDelete", "onSelectionChange", "onSelectionDragStart", "onSelectionDrag", "onSelectionDragStop", "onSelectionContextMenu", "onSelectionStart", "onSelectionEnd", "connectionMode", "connectionLineType", "connectionLineStyle", "connectionLineComponent", "connectionLineContainerStyle", "deleteKeyCode", "selectionKeyCode", "selectionOnDrag", "selectionMode", "panActivationKeyCode", "multiSelectionKeyCode", "zoomActivationKeyCode", "snapToGrid", "snapGrid", "onlyRenderVisibleElements", "selectNodesOnDrag", "nodesDraggable", "nodesConnectable", "nodesFocusable", "nodeOrigin", "edgesFocusable", "edgesUpdatable", "elementsSelectable", "defaultViewport", "minZoom", "maxZoom", "translateExtent", "preventScrolling", "nodeExtent", "defaultMarkerColor", "zoomOnScroll", "zoomOnPinch", "panOnScroll", "panOnScrollSpeed", "panOnScrollMode", "zoomOnDoubleClick", "panOnDrag", "onPaneClick", "onPaneMouseEnter", "onPaneMouseMove", "onPaneMouseLeave", "onPaneScroll", "onPaneContextMenu", "children", "onEdgeUpdate", "onEdgeContextMenu", "onEdgeDoubleClick", "onEdgeMouseEnter", "onEdgeMouseMove", "onEdgeMouseLeave", "onEdgeUpdateStart", "onEdgeUpdateEnd", "edgeUpdaterRadius", "onNodesChange", "onEdgesChange", "noDragClassName", "noWheelClassName", "noPanClassName", "fitView", "fitViewOptions", "connectOnClick", "attributionPosition", "proOptions", "defaultEdgeOptions", "elevateNodesOnSelect", "elevateEdgesOnSelect", "disableKeyboardA11y", "autoPanOnConnect", "autoPanOnNodeDrag", "connectionRadius", "isValidConnection", "onError", "style", "id", "nodeDragThreshold"];
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }








var StoreContext = /*#__PURE__*/(0,react.createContext)(null);
var Provider$1 = StoreContext.Provider;
var errorMessages = {
  error001: function error001() {
    return '[React Flow]: Seems like you have not used zustand provider as an ancestor. Help: https://reactflow.dev/error#001';
  },
  error002: function error002() {
    return "It looks like you've created a new nodeTypes or edgeTypes object. If this wasn't on purpose please define the nodeTypes/edgeTypes outside of the component or memoize them.";
  },
  error003: function error003(nodeType) {
    return "Node type \"".concat(nodeType, "\" not found. Using fallback type \"default\".");
  },
  error004: function error004() {
    return 'The React Flow parent container needs a width and a height to render the graph.';
  },
  error005: function error005() {
    return 'Only child nodes can use a parent extent.';
  },
  error006: function error006() {
    return "Can't create edge. An edge needs a source and a target.";
  },
  error007: function error007(id) {
    return "The old edge with id=".concat(id, " does not exist.");
  },
  error009: function error009(type) {
    return "Marker type \"".concat(type, "\" doesn't exist.");
  },
  error008: function error008(sourceHandle, edge) {
    return "Couldn't create edge for ".concat(!sourceHandle ? 'source' : 'target', " handle id: \"").concat(!sourceHandle ? edge.sourceHandle : edge.targetHandle, "\", edge id: ").concat(edge.id, ".");
  },
  error010: function error010() {
    return 'Handle: No node id found. Make sure to only use a Handle inside a custom Node.';
  },
  error011: function error011(edgeType) {
    return "Edge type \"".concat(edgeType, "\" not found. Using fallback type \"default\".");
  },
  error012: function error012(id) {
    return "Node with id \"".concat(id, "\" does not exist, it may have been removed. This can happen when a node is deleted before the \"onNodeClick\" handler is called.");
  }
};
var zustandErrorMessage = errorMessages['error001']();
function useStore(selector, equalityFn) {
  var store = (0,react.useContext)(StoreContext);
  if (store === null) {
    throw new Error(zustandErrorMessage);
  }
  return useStoreWithEqualityFn(store, selector, equalityFn);
}
var useStoreApi = function useStoreApi() {
  var store = (0,react.useContext)(StoreContext);
  if (store === null) {
    throw new Error(zustandErrorMessage);
  }
  return (0,react.useMemo)(function () {
    return {
      getState: store.getState,
      setState: store.setState,
      subscribe: store.subscribe,
      destroy: store.destroy
    };
  }, [store]);
};
var selector$g = function selector$g(s) {
  return s.userSelectionActive ? 'none' : 'all';
};
function Panel(_ref) {
  var position = _ref.position,
    children = _ref.children,
    className = _ref.className,
    style = _ref.style,
    rest = _objectWithoutProperties(_ref, _excluded);
  var pointerEvents = useStore(selector$g);
  var positionClasses = "".concat(position).split('-');
  return /*#__PURE__*/react.createElement("div", _objectSpread({
    className: (0,classcat/* default */.A)(['react-flow__panel', className].concat(_toConsumableArray(positionClasses))),
    style: _objectSpread(_objectSpread({}, style), {}, {
      pointerEvents: pointerEvents
    })
  }, rest), children);
}
function Attribution(_ref2) {
  var proOptions = _ref2.proOptions,
    _ref2$position = _ref2.position,
    position = _ref2$position === void 0 ? 'bottom-right' : _ref2$position;
  if (proOptions !== null && proOptions !== void 0 && proOptions.hideAttribution) {
    return null;
  }
  return /*#__PURE__*/react.createElement(Panel, {
    position: position,
    className: "react-flow__attribution",
    "data-message": "Please only hide this attribution when you are subscribed to React Flow Pro: https://reactflow.dev/pro"
  }, /*#__PURE__*/react.createElement("a", {
    href: "https://reactflow.dev",
    target: "_blank",
    rel: "noopener noreferrer",
    "aria-label": "React Flow attribution"
  }, "React Flow"));
}
var EdgeText = function EdgeText(_ref3) {
  var x = _ref3.x,
    y = _ref3.y,
    label = _ref3.label,
    _ref3$labelStyle = _ref3.labelStyle,
    labelStyle = _ref3$labelStyle === void 0 ? {} : _ref3$labelStyle,
    _ref3$labelShowBg = _ref3.labelShowBg,
    labelShowBg = _ref3$labelShowBg === void 0 ? true : _ref3$labelShowBg,
    _ref3$labelBgStyle = _ref3.labelBgStyle,
    labelBgStyle = _ref3$labelBgStyle === void 0 ? {} : _ref3$labelBgStyle,
    _ref3$labelBgPadding = _ref3.labelBgPadding,
    labelBgPadding = _ref3$labelBgPadding === void 0 ? [2, 4] : _ref3$labelBgPadding,
    _ref3$labelBgBorderRa = _ref3.labelBgBorderRadius,
    labelBgBorderRadius = _ref3$labelBgBorderRa === void 0 ? 2 : _ref3$labelBgBorderRa,
    children = _ref3.children,
    className = _ref3.className,
    rest = _objectWithoutProperties(_ref3, _excluded2);
  var edgeRef = (0,react.useRef)(null);
  var _useState = (0,react.useState)({
      x: 0,
      y: 0,
      width: 0,
      height: 0
    }),
    _useState2 = _slicedToArray(_useState, 2),
    edgeTextBbox = _useState2[0],
    setEdgeTextBbox = _useState2[1];
  var edgeTextClasses = (0,classcat/* default */.A)(['react-flow__edge-textwrapper', className]);
  (0,react.useEffect)(function () {
    if (edgeRef.current) {
      var textBbox = edgeRef.current.getBBox();
      setEdgeTextBbox({
        x: textBbox.x,
        y: textBbox.y,
        width: textBbox.width,
        height: textBbox.height
      });
    }
  }, [label]);
  if (typeof label === 'undefined' || !label) {
    return null;
  }
  return /*#__PURE__*/react.createElement("g", _objectSpread({
    transform: "translate(".concat(x - edgeTextBbox.width / 2, " ").concat(y - edgeTextBbox.height / 2, ")"),
    className: edgeTextClasses,
    visibility: edgeTextBbox.width ? 'visible' : 'hidden'
  }, rest), labelShowBg && ( /*#__PURE__*/react.createElement("rect", {
    width: edgeTextBbox.width + 2 * labelBgPadding[0],
    x: -labelBgPadding[0],
    y: -labelBgPadding[1],
    height: edgeTextBbox.height + 2 * labelBgPadding[1],
    className: "react-flow__edge-textbg",
    style: labelBgStyle,
    rx: labelBgBorderRadius,
    ry: labelBgBorderRadius
  })), /*#__PURE__*/react.createElement("text", {
    className: "react-flow__edge-text",
    y: edgeTextBbox.height / 2,
    dy: "0.3em",
    ref: edgeRef,
    style: labelStyle
  }, label), children);
};
var EdgeText$1 = /*#__PURE__*/(0,react.memo)(EdgeText);
var getDimensions = function getDimensions(node) {
  return {
    width: node.offsetWidth,
    height: node.offsetHeight
  };
};
var clamp = function clamp(val) {
  var min = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var max = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  return Math.min(Math.max(val, min), max);
};
var clampPosition = function clampPosition() {
  var position = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    x: 0,
    y: 0
  };
  var extent = arguments.length > 1 ? arguments[1] : undefined;
  return {
    x: clamp(position.x, extent[0][0], extent[1][0]),
    y: clamp(position.y, extent[0][1], extent[1][1])
  };
};
// returns a number between 0 and 1 that represents the velocity of the movement
// when the mouse is close to the edge of the canvas
var calcAutoPanVelocity = function calcAutoPanVelocity(value, min, max) {
  if (value < min) {
    return clamp(Math.abs(value - min), 1, 50) / 50;
  } else if (value > max) {
    return -clamp(Math.abs(value - max), 1, 50) / 50;
  }
  return 0;
};
var calcAutoPan = function calcAutoPan(pos, bounds) {
  var xMovement = calcAutoPanVelocity(pos.x, 35, bounds.width - 35) * 20;
  var yMovement = calcAutoPanVelocity(pos.y, 35, bounds.height - 35) * 20;
  return [xMovement, yMovement];
};
var getHostForElement = function getHostForElement(element) {
  var _element$getRootNode, _window;
  return ((_element$getRootNode = element.getRootNode) === null || _element$getRootNode === void 0 ? void 0 : _element$getRootNode.call(element)) || ((_window = window) === null || _window === void 0 ? void 0 : _window.document);
};
var getBoundsOfBoxes = function getBoundsOfBoxes(box1, box2) {
  return {
    x: Math.min(box1.x, box2.x),
    y: Math.min(box1.y, box2.y),
    x2: Math.max(box1.x2, box2.x2),
    y2: Math.max(box1.y2, box2.y2)
  };
};
var rectToBox = function rectToBox(_ref4) {
  var x = _ref4.x,
    y = _ref4.y,
    width = _ref4.width,
    height = _ref4.height;
  return {
    x: x,
    y: y,
    x2: x + width,
    y2: y + height
  };
};
var boxToRect = function boxToRect(_ref5) {
  var x = _ref5.x,
    y = _ref5.y,
    x2 = _ref5.x2,
    y2 = _ref5.y2;
  return {
    x: x,
    y: y,
    width: x2 - x,
    height: y2 - y
  };
};
var nodeToRect = function nodeToRect(node) {
  return _objectSpread(_objectSpread({}, node.positionAbsolute || {
    x: 0,
    y: 0
  }), {}, {
    width: node.width || 0,
    height: node.height || 0
  });
};
var getBoundsOfRects = function getBoundsOfRects(rect1, rect2) {
  return boxToRect(getBoundsOfBoxes(rectToBox(rect1), rectToBox(rect2)));
};
var getOverlappingArea = function getOverlappingArea(rectA, rectB) {
  var xOverlap = Math.max(0, Math.min(rectA.x + rectA.width, rectB.x + rectB.width) - Math.max(rectA.x, rectB.x));
  var yOverlap = Math.max(0, Math.min(rectA.y + rectA.height, rectB.y + rectB.height) - Math.max(rectA.y, rectB.y));
  return Math.ceil(xOverlap * yOverlap);
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
var isRectObject = function isRectObject(obj) {
  return isNumeric(obj.width) && isNumeric(obj.height) && isNumeric(obj.x) && isNumeric(obj.y);
};
/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
var isNumeric = function isNumeric(n) {
  return !isNaN(n) && isFinite(n);
};
var internalsSymbol = Symbol.for('internals');
// used for a11y key board controls for nodes and edges
var elementSelectionKeys = ['Enter', ' ', 'Escape'];
var devWarn = function devWarn(id, message) {
  if (false) {}
};
var isReactKeyboardEvent = function isReactKeyboardEvent(event) {
  return 'nativeEvent' in event;
};
function isInputDOMNode(event) {
  var _kbEvent$composedPath;
  var kbEvent = isReactKeyboardEvent(event) ? event.nativeEvent : event;
  // using composed path for handling shadow dom
  var target = ((_kbEvent$composedPath = kbEvent.composedPath) === null || _kbEvent$composedPath === void 0 || (_kbEvent$composedPath = _kbEvent$composedPath.call(kbEvent)) === null || _kbEvent$composedPath === void 0 ? void 0 : _kbEvent$composedPath[0]) || event.target;
  var isInput = ['INPUT', 'SELECT', 'TEXTAREA'].includes(target === null || target === void 0 ? void 0 : target.nodeName) || (target === null || target === void 0 ? void 0 : target.hasAttribute('contenteditable'));
  // when an input field is focused we don't want to trigger deletion or movement of nodes
  return isInput || !!(target !== null && target !== void 0 && target.closest('.nokey'));
}
var isMouseEvent = function isMouseEvent(event) {
  return 'clientX' in event;
};
var getEventPosition = function getEventPosition(event, bounds) {
  var _event$touches, _event$touches2, _bounds$left, _bounds$top;
  var isMouseTriggered = isMouseEvent(event);
  var evtX = isMouseTriggered ? event.clientX : (_event$touches = event.touches) === null || _event$touches === void 0 ? void 0 : _event$touches[0].clientX;
  var evtY = isMouseTriggered ? event.clientY : (_event$touches2 = event.touches) === null || _event$touches2 === void 0 ? void 0 : _event$touches2[0].clientY;
  return {
    x: evtX - ((_bounds$left = bounds === null || bounds === void 0 ? void 0 : bounds.left) !== null && _bounds$left !== void 0 ? _bounds$left : 0),
    y: evtY - ((_bounds$top = bounds === null || bounds === void 0 ? void 0 : bounds.top) !== null && _bounds$top !== void 0 ? _bounds$top : 0)
  };
};
var isMacOs = function isMacOs() {
  var _navigator;
  return typeof navigator !== 'undefined' && ((_navigator = navigator) === null || _navigator === void 0 || (_navigator = _navigator.userAgent) === null || _navigator === void 0 ? void 0 : _navigator.indexOf('Mac')) >= 0;
};
var BaseEdge = function BaseEdge(_ref6) {
  var id = _ref6.id,
    path = _ref6.path,
    labelX = _ref6.labelX,
    labelY = _ref6.labelY,
    label = _ref6.label,
    labelStyle = _ref6.labelStyle,
    labelShowBg = _ref6.labelShowBg,
    labelBgStyle = _ref6.labelBgStyle,
    labelBgPadding = _ref6.labelBgPadding,
    labelBgBorderRadius = _ref6.labelBgBorderRadius,
    style = _ref6.style,
    markerEnd = _ref6.markerEnd,
    markerStart = _ref6.markerStart,
    _ref6$interactionWidt = _ref6.interactionWidth,
    interactionWidth = _ref6$interactionWidt === void 0 ? 20 : _ref6$interactionWidt;
  return /*#__PURE__*/react.createElement(react.Fragment, null, /*#__PURE__*/react.createElement("path", {
    id: id,
    style: style,
    d: path,
    fill: "none",
    className: "react-flow__edge-path",
    markerEnd: markerEnd,
    markerStart: markerStart
  }), interactionWidth && ( /*#__PURE__*/react.createElement("path", {
    d: path,
    fill: "none",
    strokeOpacity: 0,
    strokeWidth: interactionWidth,
    className: "react-flow__edge-interaction"
  })), label && isNumeric(labelX) && isNumeric(labelY) ? ( /*#__PURE__*/react.createElement(EdgeText$1, {
    x: labelX,
    y: labelY,
    label: label,
    labelStyle: labelStyle,
    labelShowBg: labelShowBg,
    labelBgStyle: labelBgStyle,
    labelBgPadding: labelBgPadding,
    labelBgBorderRadius: labelBgBorderRadius
  })) : null);
};
BaseEdge.displayName = 'BaseEdge';
var getMarkerEnd = function getMarkerEnd(markerType, markerEndId) {
  if (typeof markerEndId !== 'undefined' && markerEndId) {
    return "url(#".concat(markerEndId, ")");
  }
  return typeof markerType !== 'undefined' ? "url(#react-flow__".concat(markerType, ")") : 'none';
};
function getMouseHandler$1(id, getState, handler) {
  return handler === undefined ? handler : function (event) {
    var edge = getState().edges.find(function (e) {
      return e.id === id;
    });
    if (edge) {
      handler(event, _objectSpread({}, edge));
    }
  };
}
// this is used for straight edges and simple smoothstep edges (LTR, RTL, BTT, TTB)
function getEdgeCenter(_ref7) {
  var sourceX = _ref7.sourceX,
    sourceY = _ref7.sourceY,
    targetX = _ref7.targetX,
    targetY = _ref7.targetY;
  var xOffset = Math.abs(targetX - sourceX) / 2;
  var centerX = targetX < sourceX ? targetX + xOffset : targetX - xOffset;
  var yOffset = Math.abs(targetY - sourceY) / 2;
  var centerY = targetY < sourceY ? targetY + yOffset : targetY - yOffset;
  return [centerX, centerY, xOffset, yOffset];
}
function getBezierEdgeCenter(_ref8) {
  var sourceX = _ref8.sourceX,
    sourceY = _ref8.sourceY,
    targetX = _ref8.targetX,
    targetY = _ref8.targetY,
    sourceControlX = _ref8.sourceControlX,
    sourceControlY = _ref8.sourceControlY,
    targetControlX = _ref8.targetControlX,
    targetControlY = _ref8.targetControlY;
  // cubic bezier t=0.5 mid point, not the actual mid point, but easy to calculate
  // https://stackoverflow.com/questions/67516101/how-to-find-distance-mid-point-of-bezier-curve
  var centerX = sourceX * 0.125 + sourceControlX * 0.375 + targetControlX * 0.375 + targetX * 0.125;
  var centerY = sourceY * 0.125 + sourceControlY * 0.375 + targetControlY * 0.375 + targetY * 0.125;
  var offsetX = Math.abs(centerX - sourceX);
  var offsetY = Math.abs(centerY - sourceY);
  return [centerX, centerY, offsetX, offsetY];
}
var ConnectionMode;
(function (ConnectionMode) {
  ConnectionMode["Strict"] = "strict";
  ConnectionMode["Loose"] = "loose";
})(ConnectionMode || (ConnectionMode = {}));
var PanOnScrollMode;
(function (PanOnScrollMode) {
  PanOnScrollMode["Free"] = "free";
  PanOnScrollMode["Vertical"] = "vertical";
  PanOnScrollMode["Horizontal"] = "horizontal";
})(PanOnScrollMode || (PanOnScrollMode = {}));
var SelectionMode;
(function (SelectionMode) {
  SelectionMode["Partial"] = "partial";
  SelectionMode["Full"] = "full";
})(SelectionMode || (SelectionMode = {}));
var ConnectionLineType;
(function (ConnectionLineType) {
  ConnectionLineType["Bezier"] = "default";
  ConnectionLineType["Straight"] = "straight";
  ConnectionLineType["Step"] = "step";
  ConnectionLineType["SmoothStep"] = "smoothstep";
  ConnectionLineType["SimpleBezier"] = "simplebezier";
})(ConnectionLineType || (ConnectionLineType = {}));
var MarkerType;
(function (MarkerType) {
  MarkerType["Arrow"] = "arrow";
  MarkerType["ArrowClosed"] = "arrowclosed";
})(MarkerType || (MarkerType = {}));
var Position;
(function (Position) {
  Position["Left"] = "left";
  Position["Top"] = "top";
  Position["Right"] = "right";
  Position["Bottom"] = "bottom";
})(Position || (Position = {}));
function getControl(_ref9) {
  var pos = _ref9.pos,
    x1 = _ref9.x1,
    y1 = _ref9.y1,
    x2 = _ref9.x2,
    y2 = _ref9.y2;
  if (pos === Position.Left || pos === Position.Right) {
    return [0.5 * (x1 + x2), y1];
  }
  return [x1, 0.5 * (y1 + y2)];
}
function getSimpleBezierPath(_ref10) {
  var sourceX = _ref10.sourceX,
    sourceY = _ref10.sourceY,
    _ref10$sourcePosition = _ref10.sourcePosition,
    sourcePosition = _ref10$sourcePosition === void 0 ? Position.Bottom : _ref10$sourcePosition,
    targetX = _ref10.targetX,
    targetY = _ref10.targetY,
    _ref10$targetPosition = _ref10.targetPosition,
    targetPosition = _ref10$targetPosition === void 0 ? Position.Top : _ref10$targetPosition;
  var _getControl = getControl({
      pos: sourcePosition,
      x1: sourceX,
      y1: sourceY,
      x2: targetX,
      y2: targetY
    }),
    _getControl2 = _slicedToArray(_getControl, 2),
    sourceControlX = _getControl2[0],
    sourceControlY = _getControl2[1];
  var _getControl3 = getControl({
      pos: targetPosition,
      x1: targetX,
      y1: targetY,
      x2: sourceX,
      y2: sourceY
    }),
    _getControl4 = _slicedToArray(_getControl3, 2),
    targetControlX = _getControl4[0],
    targetControlY = _getControl4[1];
  var _getBezierEdgeCenter = getBezierEdgeCenter({
      sourceX: sourceX,
      sourceY: sourceY,
      targetX: targetX,
      targetY: targetY,
      sourceControlX: sourceControlX,
      sourceControlY: sourceControlY,
      targetControlX: targetControlX,
      targetControlY: targetControlY
    }),
    _getBezierEdgeCenter2 = _slicedToArray(_getBezierEdgeCenter, 4),
    labelX = _getBezierEdgeCenter2[0],
    labelY = _getBezierEdgeCenter2[1],
    offsetX = _getBezierEdgeCenter2[2],
    offsetY = _getBezierEdgeCenter2[3];
  return ["M".concat(sourceX, ",").concat(sourceY, " C").concat(sourceControlX, ",").concat(sourceControlY, " ").concat(targetControlX, ",").concat(targetControlY, " ").concat(targetX, ",").concat(targetY), labelX, labelY, offsetX, offsetY];
}
var SimpleBezierEdge = /*#__PURE__*/(0,react.memo)(function (_ref11) {
  var sourceX = _ref11.sourceX,
    sourceY = _ref11.sourceY,
    targetX = _ref11.targetX,
    targetY = _ref11.targetY,
    _ref11$sourcePosition = _ref11.sourcePosition,
    sourcePosition = _ref11$sourcePosition === void 0 ? Position.Bottom : _ref11$sourcePosition,
    _ref11$targetPosition = _ref11.targetPosition,
    targetPosition = _ref11$targetPosition === void 0 ? Position.Top : _ref11$targetPosition,
    label = _ref11.label,
    labelStyle = _ref11.labelStyle,
    labelShowBg = _ref11.labelShowBg,
    labelBgStyle = _ref11.labelBgStyle,
    labelBgPadding = _ref11.labelBgPadding,
    labelBgBorderRadius = _ref11.labelBgBorderRadius,
    style = _ref11.style,
    markerEnd = _ref11.markerEnd,
    markerStart = _ref11.markerStart,
    interactionWidth = _ref11.interactionWidth;
  var _getSimpleBezierPath = getSimpleBezierPath({
      sourceX: sourceX,
      sourceY: sourceY,
      sourcePosition: sourcePosition,
      targetX: targetX,
      targetY: targetY,
      targetPosition: targetPosition
    }),
    _getSimpleBezierPath2 = _slicedToArray(_getSimpleBezierPath, 3),
    path = _getSimpleBezierPath2[0],
    labelX = _getSimpleBezierPath2[1],
    labelY = _getSimpleBezierPath2[2];
  return /*#__PURE__*/react.createElement(BaseEdge, {
    path: path,
    labelX: labelX,
    labelY: labelY,
    label: label,
    labelStyle: labelStyle,
    labelShowBg: labelShowBg,
    labelBgStyle: labelBgStyle,
    labelBgPadding: labelBgPadding,
    labelBgBorderRadius: labelBgBorderRadius,
    style: style,
    markerEnd: markerEnd,
    markerStart: markerStart,
    interactionWidth: interactionWidth
  });
});
SimpleBezierEdge.displayName = 'SimpleBezierEdge';
var handleDirections = _defineProperty(_defineProperty(_defineProperty(_defineProperty({}, Position.Left, {
  x: -1,
  y: 0
}), Position.Right, {
  x: 1,
  y: 0
}), Position.Top, {
  x: 0,
  y: -1
}), Position.Bottom, {
  x: 0,
  y: 1
});
var getDirection = function getDirection(_ref12) {
  var source = _ref12.source,
    _ref12$sourcePosition = _ref12.sourcePosition,
    sourcePosition = _ref12$sourcePosition === void 0 ? Position.Bottom : _ref12$sourcePosition,
    target = _ref12.target;
  if (sourcePosition === Position.Left || sourcePosition === Position.Right) {
    return source.x < target.x ? {
      x: 1,
      y: 0
    } : {
      x: -1,
      y: 0
    };
  }
  return source.y < target.y ? {
    x: 0,
    y: 1
  } : {
    x: 0,
    y: -1
  };
};
var distance = function distance(a, b) {
  return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
};
// ith this function we try to mimic a orthogonal edge routing behaviour
// It's not as good as a real orthogonal edge routing but it's faster and good enough as a default for step and smooth step edges
function getPoints(_ref13) {
  var source = _ref13.source,
    _ref13$sourcePosition = _ref13.sourcePosition,
    sourcePosition = _ref13$sourcePosition === void 0 ? Position.Bottom : _ref13$sourcePosition,
    target = _ref13.target,
    _ref13$targetPosition = _ref13.targetPosition,
    targetPosition = _ref13$targetPosition === void 0 ? Position.Top : _ref13$targetPosition,
    center = _ref13.center,
    offset = _ref13.offset;
  var sourceDir = handleDirections[sourcePosition];
  var targetDir = handleDirections[targetPosition];
  var sourceGapped = {
    x: source.x + sourceDir.x * offset,
    y: source.y + sourceDir.y * offset
  };
  var targetGapped = {
    x: target.x + targetDir.x * offset,
    y: target.y + targetDir.y * offset
  };
  var dir = getDirection({
    source: sourceGapped,
    sourcePosition: sourcePosition,
    target: targetGapped
  });
  var dirAccessor = dir.x !== 0 ? 'x' : 'y';
  var currDir = dir[dirAccessor];
  var points = [];
  var centerX, centerY;
  var sourceGapOffset = {
    x: 0,
    y: 0
  };
  var targetGapOffset = {
    x: 0,
    y: 0
  };
  var _getEdgeCenter = getEdgeCenter({
      sourceX: source.x,
      sourceY: source.y,
      targetX: target.x,
      targetY: target.y
    }),
    _getEdgeCenter2 = _slicedToArray(_getEdgeCenter, 4),
    defaultCenterX = _getEdgeCenter2[0],
    defaultCenterY = _getEdgeCenter2[1],
    defaultOffsetX = _getEdgeCenter2[2],
    defaultOffsetY = _getEdgeCenter2[3];
  // opposite handle positions, default case
  if (sourceDir[dirAccessor] * targetDir[dirAccessor] === -1) {
    centerX = center.x || defaultCenterX;
    centerY = center.y || defaultCenterY;
    //    --->
    //    |
    // >---
    var verticalSplit = [{
      x: centerX,
      y: sourceGapped.y
    }, {
      x: centerX,
      y: targetGapped.y
    }];
    //    |
    //  ---
    //  |
    var horizontalSplit = [{
      x: sourceGapped.x,
      y: centerY
    }, {
      x: targetGapped.x,
      y: centerY
    }];
    if (sourceDir[dirAccessor] === currDir) {
      points = dirAccessor === 'x' ? verticalSplit : horizontalSplit;
    } else {
      points = dirAccessor === 'x' ? horizontalSplit : verticalSplit;
    }
  } else {
    // sourceTarget means we take x from source and y from target, targetSource is the opposite
    var sourceTarget = [{
      x: sourceGapped.x,
      y: targetGapped.y
    }];
    var targetSource = [{
      x: targetGapped.x,
      y: sourceGapped.y
    }];
    // this handles edges with same handle positions
    if (dirAccessor === 'x') {
      points = sourceDir.x === currDir ? targetSource : sourceTarget;
    } else {
      points = sourceDir.y === currDir ? sourceTarget : targetSource;
    }
    if (sourcePosition === targetPosition) {
      var diff = Math.abs(source[dirAccessor] - target[dirAccessor]);
      // if an edge goes from right to right for example (sourcePosition === targetPosition) and the distance between source.x and target.x is less than the offset, the added point and the gapped source/target will overlap. This leads to a weird edge path. To avoid this we add a gapOffset to the source/target
      if (diff <= offset) {
        var gapOffset = Math.min(offset - 1, offset - diff);
        if (sourceDir[dirAccessor] === currDir) {
          sourceGapOffset[dirAccessor] = (sourceGapped[dirAccessor] > source[dirAccessor] ? -1 : 1) * gapOffset;
        } else {
          targetGapOffset[dirAccessor] = (targetGapped[dirAccessor] > target[dirAccessor] ? -1 : 1) * gapOffset;
        }
      }
    }
    // these are conditions for handling mixed handle positions like Right -> Bottom for example
    if (sourcePosition !== targetPosition) {
      var dirAccessorOpposite = dirAccessor === 'x' ? 'y' : 'x';
      var isSameDir = sourceDir[dirAccessor] === targetDir[dirAccessorOpposite];
      var sourceGtTargetOppo = sourceGapped[dirAccessorOpposite] > targetGapped[dirAccessorOpposite];
      var sourceLtTargetOppo = sourceGapped[dirAccessorOpposite] < targetGapped[dirAccessorOpposite];
      var flipSourceTarget = sourceDir[dirAccessor] === 1 && (!isSameDir && sourceGtTargetOppo || isSameDir && sourceLtTargetOppo) || sourceDir[dirAccessor] !== 1 && (!isSameDir && sourceLtTargetOppo || isSameDir && sourceGtTargetOppo);
      if (flipSourceTarget) {
        points = dirAccessor === 'x' ? sourceTarget : targetSource;
      }
    }
    var sourceGapPoint = {
      x: sourceGapped.x + sourceGapOffset.x,
      y: sourceGapped.y + sourceGapOffset.y
    };
    var targetGapPoint = {
      x: targetGapped.x + targetGapOffset.x,
      y: targetGapped.y + targetGapOffset.y
    };
    var maxXDistance = Math.max(Math.abs(sourceGapPoint.x - points[0].x), Math.abs(targetGapPoint.x - points[0].x));
    var maxYDistance = Math.max(Math.abs(sourceGapPoint.y - points[0].y), Math.abs(targetGapPoint.y - points[0].y));
    // we want to place the label on the longest segment of the edge
    if (maxXDistance >= maxYDistance) {
      centerX = (sourceGapPoint.x + targetGapPoint.x) / 2;
      centerY = points[0].y;
    } else {
      centerX = points[0].x;
      centerY = (sourceGapPoint.y + targetGapPoint.y) / 2;
    }
  }
  var pathPoints = [source, {
    x: sourceGapped.x + sourceGapOffset.x,
    y: sourceGapped.y + sourceGapOffset.y
  }].concat(_toConsumableArray(points), [{
    x: targetGapped.x + targetGapOffset.x,
    y: targetGapped.y + targetGapOffset.y
  }, target]);
  return [pathPoints, centerX, centerY, defaultOffsetX, defaultOffsetY];
}
function getBend(a, b, c, size) {
  var bendSize = Math.min(distance(a, b) / 2, distance(b, c) / 2, size);
  var x = b.x,
    y = b.y;
  // no bend
  if (a.x === x && x === c.x || a.y === y && y === c.y) {
    return "L".concat(x, " ").concat(y);
  }
  // first segment is horizontal
  if (a.y === y) {
    var _xDir = a.x < c.x ? -1 : 1;
    var _yDir = a.y < c.y ? 1 : -1;
    return "L ".concat(x + bendSize * _xDir, ",").concat(y, "Q ").concat(x, ",").concat(y, " ").concat(x, ",").concat(y + bendSize * _yDir);
  }
  var xDir = a.x < c.x ? 1 : -1;
  var yDir = a.y < c.y ? -1 : 1;
  return "L ".concat(x, ",").concat(y + bendSize * yDir, "Q ").concat(x, ",").concat(y, " ").concat(x + bendSize * xDir, ",").concat(y);
}
function getSmoothStepPath(_ref14) {
  var sourceX = _ref14.sourceX,
    sourceY = _ref14.sourceY,
    _ref14$sourcePosition = _ref14.sourcePosition,
    sourcePosition = _ref14$sourcePosition === void 0 ? Position.Bottom : _ref14$sourcePosition,
    targetX = _ref14.targetX,
    targetY = _ref14.targetY,
    _ref14$targetPosition = _ref14.targetPosition,
    targetPosition = _ref14$targetPosition === void 0 ? Position.Top : _ref14$targetPosition,
    _ref14$borderRadius = _ref14.borderRadius,
    borderRadius = _ref14$borderRadius === void 0 ? 5 : _ref14$borderRadius,
    centerX = _ref14.centerX,
    centerY = _ref14.centerY,
    _ref14$offset = _ref14.offset,
    offset = _ref14$offset === void 0 ? 20 : _ref14$offset;
  var _getPoints = getPoints({
      source: {
        x: sourceX,
        y: sourceY
      },
      sourcePosition: sourcePosition,
      target: {
        x: targetX,
        y: targetY
      },
      targetPosition: targetPosition,
      center: {
        x: centerX,
        y: centerY
      },
      offset: offset
    }),
    _getPoints2 = _slicedToArray(_getPoints, 5),
    points = _getPoints2[0],
    labelX = _getPoints2[1],
    labelY = _getPoints2[2],
    offsetX = _getPoints2[3],
    offsetY = _getPoints2[4];
  var path = points.reduce(function (res, p, i) {
    var segment = '';
    if (i > 0 && i < points.length - 1) {
      segment = getBend(points[i - 1], p, points[i + 1], borderRadius);
    } else {
      segment = "".concat(i === 0 ? 'M' : 'L').concat(p.x, " ").concat(p.y);
    }
    res += segment;
    return res;
  }, '');
  return [path, labelX, labelY, offsetX, offsetY];
}
var SmoothStepEdge = /*#__PURE__*/(0,react.memo)(function (_ref15) {
  var sourceX = _ref15.sourceX,
    sourceY = _ref15.sourceY,
    targetX = _ref15.targetX,
    targetY = _ref15.targetY,
    label = _ref15.label,
    labelStyle = _ref15.labelStyle,
    labelShowBg = _ref15.labelShowBg,
    labelBgStyle = _ref15.labelBgStyle,
    labelBgPadding = _ref15.labelBgPadding,
    labelBgBorderRadius = _ref15.labelBgBorderRadius,
    style = _ref15.style,
    _ref15$sourcePosition = _ref15.sourcePosition,
    sourcePosition = _ref15$sourcePosition === void 0 ? Position.Bottom : _ref15$sourcePosition,
    _ref15$targetPosition = _ref15.targetPosition,
    targetPosition = _ref15$targetPosition === void 0 ? Position.Top : _ref15$targetPosition,
    markerEnd = _ref15.markerEnd,
    markerStart = _ref15.markerStart,
    pathOptions = _ref15.pathOptions,
    interactionWidth = _ref15.interactionWidth;
  var _getSmoothStepPath = getSmoothStepPath({
      sourceX: sourceX,
      sourceY: sourceY,
      sourcePosition: sourcePosition,
      targetX: targetX,
      targetY: targetY,
      targetPosition: targetPosition,
      borderRadius: pathOptions === null || pathOptions === void 0 ? void 0 : pathOptions.borderRadius,
      offset: pathOptions === null || pathOptions === void 0 ? void 0 : pathOptions.offset
    }),
    _getSmoothStepPath2 = _slicedToArray(_getSmoothStepPath, 3),
    path = _getSmoothStepPath2[0],
    labelX = _getSmoothStepPath2[1],
    labelY = _getSmoothStepPath2[2];
  return /*#__PURE__*/react.createElement(BaseEdge, {
    path: path,
    labelX: labelX,
    labelY: labelY,
    label: label,
    labelStyle: labelStyle,
    labelShowBg: labelShowBg,
    labelBgStyle: labelBgStyle,
    labelBgPadding: labelBgPadding,
    labelBgBorderRadius: labelBgBorderRadius,
    style: style,
    markerEnd: markerEnd,
    markerStart: markerStart,
    interactionWidth: interactionWidth
  });
});
SmoothStepEdge.displayName = 'SmoothStepEdge';
var StepEdge = /*#__PURE__*/(0,react.memo)(function (props) {
  var _props$pathOptions2;
  return /*#__PURE__*/react.createElement(SmoothStepEdge, _objectSpread(_objectSpread({}, props), {}, {
    pathOptions: (0,react.useMemo)(function () {
      var _props$pathOptions;
      return {
        borderRadius: 0,
        offset: (_props$pathOptions = props.pathOptions) === null || _props$pathOptions === void 0 ? void 0 : _props$pathOptions.offset
      };
    }, [(_props$pathOptions2 = props.pathOptions) === null || _props$pathOptions2 === void 0 ? void 0 : _props$pathOptions2.offset])
  }));
});
StepEdge.displayName = 'StepEdge';
function getStraightPath(_ref16) {
  var sourceX = _ref16.sourceX,
    sourceY = _ref16.sourceY,
    targetX = _ref16.targetX,
    targetY = _ref16.targetY;
  var _getEdgeCenter3 = getEdgeCenter({
      sourceX: sourceX,
      sourceY: sourceY,
      targetX: targetX,
      targetY: targetY
    }),
    _getEdgeCenter4 = _slicedToArray(_getEdgeCenter3, 4),
    labelX = _getEdgeCenter4[0],
    labelY = _getEdgeCenter4[1],
    offsetX = _getEdgeCenter4[2],
    offsetY = _getEdgeCenter4[3];
  return ["M ".concat(sourceX, ",").concat(sourceY, "L ").concat(targetX, ",").concat(targetY), labelX, labelY, offsetX, offsetY];
}
var StraightEdge = /*#__PURE__*/(0,react.memo)(function (_ref17) {
  var sourceX = _ref17.sourceX,
    sourceY = _ref17.sourceY,
    targetX = _ref17.targetX,
    targetY = _ref17.targetY,
    label = _ref17.label,
    labelStyle = _ref17.labelStyle,
    labelShowBg = _ref17.labelShowBg,
    labelBgStyle = _ref17.labelBgStyle,
    labelBgPadding = _ref17.labelBgPadding,
    labelBgBorderRadius = _ref17.labelBgBorderRadius,
    style = _ref17.style,
    markerEnd = _ref17.markerEnd,
    markerStart = _ref17.markerStart,
    interactionWidth = _ref17.interactionWidth;
  var _getStraightPath = getStraightPath({
      sourceX: sourceX,
      sourceY: sourceY,
      targetX: targetX,
      targetY: targetY
    }),
    _getStraightPath2 = _slicedToArray(_getStraightPath, 3),
    path = _getStraightPath2[0],
    labelX = _getStraightPath2[1],
    labelY = _getStraightPath2[2];
  return /*#__PURE__*/react.createElement(BaseEdge, {
    path: path,
    labelX: labelX,
    labelY: labelY,
    label: label,
    labelStyle: labelStyle,
    labelShowBg: labelShowBg,
    labelBgStyle: labelBgStyle,
    labelBgPadding: labelBgPadding,
    labelBgBorderRadius: labelBgBorderRadius,
    style: style,
    markerEnd: markerEnd,
    markerStart: markerStart,
    interactionWidth: interactionWidth
  });
});
StraightEdge.displayName = 'StraightEdge';
function calculateControlOffset(distance, curvature) {
  if (distance >= 0) {
    return 0.5 * distance;
  }
  return curvature * 25 * Math.sqrt(-distance);
}
function getControlWithCurvature(_ref18) {
  var pos = _ref18.pos,
    x1 = _ref18.x1,
    y1 = _ref18.y1,
    x2 = _ref18.x2,
    y2 = _ref18.y2,
    c = _ref18.c;
  switch (pos) {
    case Position.Left:
      return [x1 - calculateControlOffset(x1 - x2, c), y1];
    case Position.Right:
      return [x1 + calculateControlOffset(x2 - x1, c), y1];
    case Position.Top:
      return [x1, y1 - calculateControlOffset(y1 - y2, c)];
    case Position.Bottom:
      return [x1, y1 + calculateControlOffset(y2 - y1, c)];
  }
}
function getBezierPath(_ref19) {
  var sourceX = _ref19.sourceX,
    sourceY = _ref19.sourceY,
    _ref19$sourcePosition = _ref19.sourcePosition,
    sourcePosition = _ref19$sourcePosition === void 0 ? Position.Bottom : _ref19$sourcePosition,
    targetX = _ref19.targetX,
    targetY = _ref19.targetY,
    _ref19$targetPosition = _ref19.targetPosition,
    targetPosition = _ref19$targetPosition === void 0 ? Position.Top : _ref19$targetPosition,
    _ref19$curvature = _ref19.curvature,
    curvature = _ref19$curvature === void 0 ? 0.25 : _ref19$curvature;
  var _getControlWithCurvat = getControlWithCurvature({
      pos: sourcePosition,
      x1: sourceX,
      y1: sourceY,
      x2: targetX,
      y2: targetY,
      c: curvature
    }),
    _getControlWithCurvat2 = _slicedToArray(_getControlWithCurvat, 2),
    sourceControlX = _getControlWithCurvat2[0],
    sourceControlY = _getControlWithCurvat2[1];
  var _getControlWithCurvat3 = getControlWithCurvature({
      pos: targetPosition,
      x1: targetX,
      y1: targetY,
      x2: sourceX,
      y2: sourceY,
      c: curvature
    }),
    _getControlWithCurvat4 = _slicedToArray(_getControlWithCurvat3, 2),
    targetControlX = _getControlWithCurvat4[0],
    targetControlY = _getControlWithCurvat4[1];
  var _getBezierEdgeCenter3 = getBezierEdgeCenter({
      sourceX: sourceX,
      sourceY: sourceY,
      targetX: targetX,
      targetY: targetY,
      sourceControlX: sourceControlX,
      sourceControlY: sourceControlY,
      targetControlX: targetControlX,
      targetControlY: targetControlY
    }),
    _getBezierEdgeCenter4 = _slicedToArray(_getBezierEdgeCenter3, 4),
    labelX = _getBezierEdgeCenter4[0],
    labelY = _getBezierEdgeCenter4[1],
    offsetX = _getBezierEdgeCenter4[2],
    offsetY = _getBezierEdgeCenter4[3];
  return ["M".concat(sourceX, ",").concat(sourceY, " C").concat(sourceControlX, ",").concat(sourceControlY, " ").concat(targetControlX, ",").concat(targetControlY, " ").concat(targetX, ",").concat(targetY), labelX, labelY, offsetX, offsetY];
}
var BezierEdge = /*#__PURE__*/(0,react.memo)(function (_ref20) {
  var sourceX = _ref20.sourceX,
    sourceY = _ref20.sourceY,
    targetX = _ref20.targetX,
    targetY = _ref20.targetY,
    _ref20$sourcePosition = _ref20.sourcePosition,
    sourcePosition = _ref20$sourcePosition === void 0 ? Position.Bottom : _ref20$sourcePosition,
    _ref20$targetPosition = _ref20.targetPosition,
    targetPosition = _ref20$targetPosition === void 0 ? Position.Top : _ref20$targetPosition,
    label = _ref20.label,
    labelStyle = _ref20.labelStyle,
    labelShowBg = _ref20.labelShowBg,
    labelBgStyle = _ref20.labelBgStyle,
    labelBgPadding = _ref20.labelBgPadding,
    labelBgBorderRadius = _ref20.labelBgBorderRadius,
    style = _ref20.style,
    markerEnd = _ref20.markerEnd,
    markerStart = _ref20.markerStart,
    pathOptions = _ref20.pathOptions,
    interactionWidth = _ref20.interactionWidth;
  var _getBezierPath = getBezierPath({
      sourceX: sourceX,
      sourceY: sourceY,
      sourcePosition: sourcePosition,
      targetX: targetX,
      targetY: targetY,
      targetPosition: targetPosition,
      curvature: pathOptions === null || pathOptions === void 0 ? void 0 : pathOptions.curvature
    }),
    _getBezierPath2 = _slicedToArray(_getBezierPath, 3),
    path = _getBezierPath2[0],
    labelX = _getBezierPath2[1],
    labelY = _getBezierPath2[2];
  return /*#__PURE__*/react.createElement(BaseEdge, {
    path: path,
    labelX: labelX,
    labelY: labelY,
    label: label,
    labelStyle: labelStyle,
    labelShowBg: labelShowBg,
    labelBgStyle: labelBgStyle,
    labelBgPadding: labelBgPadding,
    labelBgBorderRadius: labelBgBorderRadius,
    style: style,
    markerEnd: markerEnd,
    markerStart: markerStart,
    interactionWidth: interactionWidth
  });
});
BezierEdge.displayName = 'BezierEdge';
var NodeIdContext = /*#__PURE__*/(0,react.createContext)(null);
var Provider = NodeIdContext.Provider;
NodeIdContext.Consumer;
var useNodeId = function useNodeId() {
  var nodeId = (0,react.useContext)(NodeIdContext);
  return nodeId;
};
var isEdge = function isEdge(element) {
  return 'id' in element && 'source' in element && 'target' in element;
};
var isNode = function isNode(element) {
  return 'id' in element && !('source' in element) && !('target' in element);
};
var getOutgoers = function getOutgoers(node, nodes, edges) {
  if (!isNode(node)) {
    return [];
  }
  var outgoerIds = edges.filter(function (e) {
    return e.source === node.id;
  }).map(function (e) {
    return e.target;
  });
  return nodes.filter(function (n) {
    return outgoerIds.includes(n.id);
  });
};
var getIncomers = function getIncomers(node, nodes, edges) {
  if (!isNode(node)) {
    return [];
  }
  var incomersIds = edges.filter(function (e) {
    return e.target === node.id;
  }).map(function (e) {
    return e.source;
  });
  return nodes.filter(function (n) {
    return incomersIds.includes(n.id);
  });
};
var getEdgeId = function getEdgeId(_ref21) {
  var source = _ref21.source,
    sourceHandle = _ref21.sourceHandle,
    target = _ref21.target,
    targetHandle = _ref21.targetHandle;
  return "reactflow__edge-".concat(source).concat(sourceHandle || '', "-").concat(target).concat(targetHandle || '');
};
var getMarkerId = function getMarkerId(marker, rfId) {
  if (typeof marker === 'undefined') {
    return '';
  }
  if (typeof marker === 'string') {
    return marker;
  }
  var idPrefix = rfId ? "".concat(rfId, "__") : '';
  return "".concat(idPrefix).concat(Object.keys(marker).sort().map(function (key) {
    return "".concat(key, "=").concat(marker[key]);
  }).join('&'));
};
var connectionExists = function connectionExists(edge, edges) {
  return edges.some(function (el) {
    return el.source === edge.source && el.target === edge.target && (el.sourceHandle === edge.sourceHandle || !el.sourceHandle && !edge.sourceHandle) && (el.targetHandle === edge.targetHandle || !el.targetHandle && !edge.targetHandle);
  });
};
var addEdge = function addEdge(edgeParams, edges) {
  if (!edgeParams.source || !edgeParams.target) {
    devWarn('006', errorMessages['error006']());
    return edges;
  }
  var edge;
  if (isEdge(edgeParams)) {
    edge = _objectSpread({}, edgeParams);
  } else {
    edge = _objectSpread(_objectSpread({}, edgeParams), {}, {
      id: getEdgeId(edgeParams)
    });
  }
  if (connectionExists(edge, edges)) {
    return edges;
  }
  return edges.concat(edge);
};
var updateEdge = function updateEdge(oldEdge, newConnection, edges) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {
    shouldReplaceId: true
  };
  var oldEdgeId = oldEdge.id,
    rest = _objectWithoutProperties(oldEdge, _excluded3);
  if (!newConnection.source || !newConnection.target) {
    devWarn('006', errorMessages['error006']());
    return edges;
  }
  var foundEdge = edges.find(function (e) {
    return e.id === oldEdgeId;
  });
  if (!foundEdge) {
    devWarn('007', errorMessages['error007'](oldEdgeId));
    return edges;
  }
  // Remove old edge and create the new edge with parameters of old edge.
  var edge = _objectSpread(_objectSpread({}, rest), {}, {
    id: options.shouldReplaceId ? getEdgeId(newConnection) : oldEdgeId,
    source: newConnection.source,
    target: newConnection.target,
    sourceHandle: newConnection.sourceHandle,
    targetHandle: newConnection.targetHandle
  });
  return edges.filter(function (e) {
    return e.id !== oldEdgeId;
  }).concat(edge);
};
var pointToRendererPoint = function pointToRendererPoint(_ref22, _ref23, snapToGrid, _ref24) {
  var x = _ref22.x,
    y = _ref22.y;
  var _ref25 = _slicedToArray(_ref23, 3),
    tx = _ref25[0],
    ty = _ref25[1],
    tScale = _ref25[2];
  var _ref26 = _slicedToArray(_ref24, 2),
    snapX = _ref26[0],
    snapY = _ref26[1];
  var position = {
    x: (x - tx) / tScale,
    y: (y - ty) / tScale
  };
  if (snapToGrid) {
    return {
      x: snapX * Math.round(position.x / snapX),
      y: snapY * Math.round(position.y / snapY)
    };
  }
  return position;
};
var rendererPointToPoint = function rendererPointToPoint(_ref27, _ref28) {
  var x = _ref27.x,
    y = _ref27.y;
  var _ref29 = _slicedToArray(_ref28, 3),
    tx = _ref29[0],
    ty = _ref29[1],
    tScale = _ref29[2];
  return {
    x: x * tScale + tx,
    y: y * tScale + ty
  };
};
var getNodePositionWithOrigin = function getNodePositionWithOrigin(node) {
  var _node$width, _node$height;
  var nodeOrigin = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [0, 0];
  if (!node) {
    return {
      x: 0,
      y: 0,
      positionAbsolute: {
        x: 0,
        y: 0
      }
    };
  }
  var offsetX = ((_node$width = node.width) !== null && _node$width !== void 0 ? _node$width : 0) * nodeOrigin[0];
  var offsetY = ((_node$height = node.height) !== null && _node$height !== void 0 ? _node$height : 0) * nodeOrigin[1];
  var position = {
    x: node.position.x - offsetX,
    y: node.position.y - offsetY
  };
  return _objectSpread(_objectSpread({}, position), {}, {
    positionAbsolute: node.positionAbsolute ? {
      x: node.positionAbsolute.x - offsetX,
      y: node.positionAbsolute.y - offsetY
    } : position
  });
};
var getNodesBounds = function getNodesBounds(nodes) {
  var nodeOrigin = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [0, 0];
  if (nodes.length === 0) {
    return {
      x: 0,
      y: 0,
      width: 0,
      height: 0
    };
  }
  var box = nodes.reduce(function (currBox, node) {
    var _getNodePositionWithO = getNodePositionWithOrigin(node, nodeOrigin).positionAbsolute,
      x = _getNodePositionWithO.x,
      y = _getNodePositionWithO.y;
    return getBoundsOfBoxes(currBox, rectToBox({
      x: x,
      y: y,
      width: node.width || 0,
      height: node.height || 0
    }));
  }, {
    x: Infinity,
    y: Infinity,
    x2: -Infinity,
    y2: -Infinity
  });
  return boxToRect(box);
};
// @deprecated Use `getNodesBounds`.
var getRectOfNodes = function getRectOfNodes(nodes) {
  var nodeOrigin = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [0, 0];
  console.warn('[DEPRECATED] `getRectOfNodes` is deprecated. Instead use `getNodesBounds` https://reactflow.dev/api-reference/utils/get-nodes-bounds.');
  return getNodesBounds(nodes, nodeOrigin);
};
var getNodesInside = function getNodesInside(nodeInternals, rect) {
  var _ref30 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [0, 0, 1],
    _ref31 = _slicedToArray(_ref30, 3),
    tx = _ref31[0],
    ty = _ref31[1],
    tScale = _ref31[2];
  var partially = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var excludeNonSelectableNodes = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  var nodeOrigin = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : [0, 0];
  var paneRect = {
    x: (rect.x - tx) / tScale,
    y: (rect.y - ty) / tScale,
    width: rect.width / tScale,
    height: rect.height / tScale
  };
  var visibleNodes = [];
  nodeInternals.forEach(function (node) {
    var width = node.width,
      height = node.height,
      _node$selectable = node.selectable,
      selectable = _node$selectable === void 0 ? true : _node$selectable,
      _node$hidden = node.hidden,
      hidden = _node$hidden === void 0 ? false : _node$hidden;
    if (excludeNonSelectableNodes && !selectable || hidden) {
      return false;
    }
    var _getNodePositionWithO2 = getNodePositionWithOrigin(node, nodeOrigin),
      positionAbsolute = _getNodePositionWithO2.positionAbsolute;
    var nodeRect = {
      x: positionAbsolute.x,
      y: positionAbsolute.y,
      width: width || 0,
      height: height || 0
    };
    var overlappingArea = getOverlappingArea(paneRect, nodeRect);
    var notInitialized = typeof width === 'undefined' || typeof height === 'undefined' || width === null || height === null;
    var partiallyVisible = partially && overlappingArea > 0;
    var area = (width || 0) * (height || 0);
    var isVisible = notInitialized || partiallyVisible || overlappingArea >= area;
    if (isVisible || node.dragging) {
      visibleNodes.push(node);
    }
  });
  return visibleNodes;
};
var getConnectedEdges = function getConnectedEdges(nodes, edges) {
  var nodeIds = nodes.map(function (node) {
    return node.id;
  });
  return edges.filter(function (edge) {
    return nodeIds.includes(edge.source) || nodeIds.includes(edge.target);
  });
};
// @deprecated Use `getViewportForBounds`.
var getTransformForBounds = function getTransformForBounds(bounds, width, height, minZoom, maxZoom) {
  var padding = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0.1;
  var _getViewportForBounds = getViewportForBounds(bounds, width, height, minZoom, maxZoom, padding),
    x = _getViewportForBounds.x,
    y = _getViewportForBounds.y,
    zoom = _getViewportForBounds.zoom;
  console.warn('[DEPRECATED] `getTransformForBounds` is deprecated. Instead use `getViewportForBounds`. Beware that the return value is type Viewport (`{ x: number, y: number, zoom: number }`) instead of Transform (`[number, number, number]`). https://reactflow.dev/api-reference/utils/get-viewport-for-bounds');
  return [x, y, zoom];
};
var getViewportForBounds = function getViewportForBounds(bounds, width, height, minZoom, maxZoom) {
  var padding = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0.1;
  var xZoom = width / (bounds.width * (1 + padding));
  var yZoom = height / (bounds.height * (1 + padding));
  var zoom = Math.min(xZoom, yZoom);
  var clampedZoom = clamp(zoom, minZoom, maxZoom);
  var boundsCenterX = bounds.x + bounds.width / 2;
  var boundsCenterY = bounds.y + bounds.height / 2;
  var x = width / 2 - boundsCenterX * clampedZoom;
  var y = height / 2 - boundsCenterY * clampedZoom;
  return {
    x: x,
    y: y,
    zoom: clampedZoom
  };
};
var getD3Transition = function getD3Transition(selection) {
  var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  return selection.transition().duration(duration);
};

// this functions collects all handles and adds an absolute position
// so that we can later find the closest handle to the mouse position
function getHandles(node, handleBounds, type, currentHandle) {
  return (handleBounds[type] || []).reduce(function (res, h) {
    if ("".concat(node.id, "-").concat(h.id, "-").concat(type) !== currentHandle) {
      var _node$positionAbsolut, _node$positionAbsolut2, _node$positionAbsolut3, _node$positionAbsolut4;
      res.push({
        id: h.id || null,
        type: type,
        nodeId: node.id,
        x: ((_node$positionAbsolut = (_node$positionAbsolut2 = node.positionAbsolute) === null || _node$positionAbsolut2 === void 0 ? void 0 : _node$positionAbsolut2.x) !== null && _node$positionAbsolut !== void 0 ? _node$positionAbsolut : 0) + h.x + h.width / 2,
        y: ((_node$positionAbsolut3 = (_node$positionAbsolut4 = node.positionAbsolute) === null || _node$positionAbsolut4 === void 0 ? void 0 : _node$positionAbsolut4.y) !== null && _node$positionAbsolut3 !== void 0 ? _node$positionAbsolut3 : 0) + h.y + h.height / 2
      });
    }
    return res;
  }, []);
}
function getClosestHandle(event, doc, pos, connectionRadius, handles, validator) {
  // we always want to prioritize the handle below the mouse cursor over the closest distance handle,
  // because it could be that the center of another handle is closer to the mouse pointer than the handle below the cursor
  var _getEventPosition = getEventPosition(event),
    x = _getEventPosition.x,
    y = _getEventPosition.y;
  var domNodes = doc.elementsFromPoint(x, y);
  var handleBelow = domNodes.find(function (el) {
    return el.classList.contains('react-flow__handle');
  });
  if (handleBelow) {
    var handleNodeId = handleBelow.getAttribute('data-nodeid');
    if (handleNodeId) {
      var handleType = getHandleType(undefined, handleBelow);
      var handleId = handleBelow.getAttribute('data-handleid');
      var validHandleResult = validator({
        nodeId: handleNodeId,
        id: handleId,
        type: handleType
      });
      if (validHandleResult) {
        var handle = handles.find(function (h) {
          return h.nodeId === handleNodeId && h.type === handleType && h.id === handleId;
        });
        return {
          handle: {
            id: handleId,
            type: handleType,
            nodeId: handleNodeId,
            x: (handle === null || handle === void 0 ? void 0 : handle.x) || pos.x,
            y: (handle === null || handle === void 0 ? void 0 : handle.y) || pos.y
          },
          validHandleResult: validHandleResult
        };
      }
    }
  }
  // if we couldn't find a handle below the mouse cursor we look for the closest distance based on the connectionRadius
  var closestHandles = [];
  var minDistance = Infinity;
  handles.forEach(function (handle) {
    var distance = Math.sqrt(Math.pow(handle.x - pos.x, 2) + Math.pow(handle.y - pos.y, 2));
    if (distance <= connectionRadius) {
      var _validHandleResult = validator(handle);
      if (distance <= minDistance) {
        if (distance < minDistance) {
          closestHandles = [{
            handle: handle,
            validHandleResult: _validHandleResult
          }];
        } else if (distance === minDistance) {
          // when multiple handles are on the same distance we collect all of them
          closestHandles.push({
            handle: handle,
            validHandleResult: _validHandleResult
          });
        }
        minDistance = distance;
      }
    }
  });
  if (!closestHandles.length) {
    return {
      handle: null,
      validHandleResult: defaultResult()
    };
  }
  if (closestHandles.length === 1) {
    return closestHandles[0];
  }
  var hasValidHandle = closestHandles.some(function (_ref32) {
    var validHandleResult = _ref32.validHandleResult;
    return validHandleResult.isValid;
  });
  var hasTargetHandle = closestHandles.some(function (_ref33) {
    var handle = _ref33.handle;
    return handle.type === 'target';
  });
  // if multiple handles are layouted on top of each other we prefer the one with type = target and the one that is valid
  return closestHandles.find(function (_ref34) {
    var handle = _ref34.handle,
      validHandleResult = _ref34.validHandleResult;
    return hasTargetHandle ? handle.type === 'target' : hasValidHandle ? validHandleResult.isValid : true;
  }) || closestHandles[0];
}
var nullConnection = {
  source: null,
  target: null,
  sourceHandle: null,
  targetHandle: null
};
var defaultResult = function defaultResult() {
  return {
    handleDomNode: null,
    isValid: false,
    connection: nullConnection,
    endHandle: null
  };
};
// checks if  and returns connection in fom of an object { source: 123, target: 312 }
function isValidHandle(handle, connectionMode, fromNodeId, fromHandleId, fromType, isValidConnection, doc) {
  var isTarget = fromType === 'target';
  var handleToCheck = doc.querySelector(".react-flow__handle[data-id=\"".concat(handle === null || handle === void 0 ? void 0 : handle.nodeId, "-").concat(handle === null || handle === void 0 ? void 0 : handle.id, "-").concat(handle === null || handle === void 0 ? void 0 : handle.type, "\"]"));
  var result = _objectSpread(_objectSpread({}, defaultResult()), {}, {
    handleDomNode: handleToCheck
  });
  if (handleToCheck) {
    var handleType = getHandleType(undefined, handleToCheck);
    var handleNodeId = handleToCheck.getAttribute('data-nodeid');
    var handleId = handleToCheck.getAttribute('data-handleid');
    var connectable = handleToCheck.classList.contains('connectable');
    var connectableEnd = handleToCheck.classList.contains('connectableend');
    var connection = {
      source: isTarget ? handleNodeId : fromNodeId,
      sourceHandle: isTarget ? handleId : fromHandleId,
      target: isTarget ? fromNodeId : handleNodeId,
      targetHandle: isTarget ? fromHandleId : handleId
    };
    result.connection = connection;
    var isConnectable = connectable && connectableEnd;
    // in strict mode we don't allow target to target or source to source connections
    var isValid = isConnectable && (connectionMode === ConnectionMode.Strict ? isTarget && handleType === 'source' || !isTarget && handleType === 'target' : handleNodeId !== fromNodeId || handleId !== fromHandleId);
    if (isValid) {
      result.endHandle = {
        nodeId: handleNodeId,
        handleId: handleId,
        type: handleType
      };
      result.isValid = isValidConnection(connection);
    }
  }
  return result;
}
function getHandleLookup(_ref35) {
  var nodes = _ref35.nodes,
    nodeId = _ref35.nodeId,
    handleId = _ref35.handleId,
    handleType = _ref35.handleType;
  return nodes.reduce(function (res, node) {
    if (node[internalsSymbol]) {
      var handleBounds = node[internalsSymbol].handleBounds;
      var sourceHandles = [];
      var targetHandles = [];
      if (handleBounds) {
        sourceHandles = getHandles(node, handleBounds, 'source', "".concat(nodeId, "-").concat(handleId, "-").concat(handleType));
        targetHandles = getHandles(node, handleBounds, 'target', "".concat(nodeId, "-").concat(handleId, "-").concat(handleType));
      }
      res.push.apply(res, _toConsumableArray(sourceHandles).concat(_toConsumableArray(targetHandles)));
    }
    return res;
  }, []);
}
function getHandleType(edgeUpdaterType, handleDomNode) {
  if (edgeUpdaterType) {
    return edgeUpdaterType;
  } else if (handleDomNode !== null && handleDomNode !== void 0 && handleDomNode.classList.contains('target')) {
    return 'target';
  } else if (handleDomNode !== null && handleDomNode !== void 0 && handleDomNode.classList.contains('source')) {
    return 'source';
  }
  return null;
}
function resetRecentHandle(handleDomNode) {
  handleDomNode === null || handleDomNode === void 0 || handleDomNode.classList.remove('valid', 'connecting', 'react-flow__handle-valid', 'react-flow__handle-connecting');
}
function getConnectionStatus(isInsideConnectionRadius, isHandleValid) {
  var connectionStatus = null;
  if (isHandleValid) {
    connectionStatus = 'valid';
  } else if (isInsideConnectionRadius && !isHandleValid) {
    connectionStatus = 'invalid';
  }
  return connectionStatus;
}
function handlePointerDown(_ref36) {
  var event = _ref36.event,
    handleId = _ref36.handleId,
    nodeId = _ref36.nodeId,
    onConnect = _ref36.onConnect,
    isTarget = _ref36.isTarget,
    getState = _ref36.getState,
    setState = _ref36.setState,
    isValidConnection = _ref36.isValidConnection,
    edgeUpdaterType = _ref36.edgeUpdaterType,
    onEdgeUpdateEnd = _ref36.onEdgeUpdateEnd;
  // when react-flow is used inside a shadow root we can't use document
  var doc = getHostForElement(event.target);
  var _getState = getState(),
    connectionMode = _getState.connectionMode,
    domNode = _getState.domNode,
    autoPanOnConnect = _getState.autoPanOnConnect,
    connectionRadius = _getState.connectionRadius,
    onConnectStart = _getState.onConnectStart,
    panBy = _getState.panBy,
    getNodes = _getState.getNodes,
    cancelConnection = _getState.cancelConnection;
  var autoPanId = 0;
  var closestHandle;
  var _getEventPosition2 = getEventPosition(event),
    x = _getEventPosition2.x,
    y = _getEventPosition2.y;
  var clickedHandle = doc === null || doc === void 0 ? void 0 : doc.elementFromPoint(x, y);
  var handleType = getHandleType(edgeUpdaterType, clickedHandle);
  var containerBounds = domNode === null || domNode === void 0 ? void 0 : domNode.getBoundingClientRect();
  if (!containerBounds || !handleType) {
    return;
  }
  var prevActiveHandle;
  var connectionPosition = getEventPosition(event, containerBounds);
  var autoPanStarted = false;
  var connection = null;
  var isValid = false;
  var handleDomNode = null;
  var handleLookup = getHandleLookup({
    nodes: getNodes(),
    nodeId: nodeId,
    handleId: handleId,
    handleType: handleType
  });
  // when the user is moving the mouse close to the edge of the canvas while connecting we move the canvas
  var autoPan = function autoPan() {
    if (!autoPanOnConnect) {
      return;
    }
    var _calcAutoPan = calcAutoPan(connectionPosition, containerBounds),
      _calcAutoPan2 = _slicedToArray(_calcAutoPan, 2),
      xMovement = _calcAutoPan2[0],
      yMovement = _calcAutoPan2[1];
    panBy({
      x: xMovement,
      y: yMovement
    });
    autoPanId = requestAnimationFrame(autoPan);
  };
  setState({
    connectionPosition: connectionPosition,
    connectionStatus: null,
    // connectionNodeId etc will be removed in the next major in favor of connectionStartHandle
    connectionNodeId: nodeId,
    connectionHandleId: handleId,
    connectionHandleType: handleType,
    connectionStartHandle: {
      nodeId: nodeId,
      handleId: handleId,
      type: handleType
    },
    connectionEndHandle: null
  });
  onConnectStart === null || onConnectStart === void 0 || onConnectStart(event, {
    nodeId: nodeId,
    handleId: handleId,
    handleType: handleType
  });
  function onPointerMove(event) {
    var _getState2 = getState(),
      transform = _getState2.transform;
    connectionPosition = getEventPosition(event, containerBounds);
    var _getClosestHandle = getClosestHandle(event, doc, pointToRendererPoint(connectionPosition, transform, false, [1, 1]), connectionRadius, handleLookup, function (handle) {
        return isValidHandle(handle, connectionMode, nodeId, handleId, isTarget ? 'target' : 'source', isValidConnection, doc);
      }),
      handle = _getClosestHandle.handle,
      validHandleResult = _getClosestHandle.validHandleResult;
    closestHandle = handle;
    if (!autoPanStarted) {
      autoPan();
      autoPanStarted = true;
    }
    handleDomNode = validHandleResult.handleDomNode;
    connection = validHandleResult.connection;
    isValid = validHandleResult.isValid;
    setState({
      connectionPosition: closestHandle && isValid ? rendererPointToPoint({
        x: closestHandle.x,
        y: closestHandle.y
      }, transform) : connectionPosition,
      connectionStatus: getConnectionStatus(!!closestHandle, isValid),
      connectionEndHandle: validHandleResult.endHandle
    });
    if (!closestHandle && !isValid && !handleDomNode) {
      return resetRecentHandle(prevActiveHandle);
    }
    if (connection.source !== connection.target && handleDomNode) {
      resetRecentHandle(prevActiveHandle);
      prevActiveHandle = handleDomNode;
      // @todo: remove the old class names "react-flow__handle-" in the next major version
      handleDomNode.classList.add('connecting', 'react-flow__handle-connecting');
      handleDomNode.classList.toggle('valid', isValid);
      handleDomNode.classList.toggle('react-flow__handle-valid', isValid);
    }
  }
  function onPointerUp(event) {
    var _getState$onConnectEn, _getState3;
    if ((closestHandle || handleDomNode) && connection && isValid) {
      onConnect === null || onConnect === void 0 || onConnect(connection);
    }
    // it's important to get a fresh reference from the store here
    // in order to get the latest state of onConnectEnd
    (_getState$onConnectEn = (_getState3 = getState()).onConnectEnd) === null || _getState$onConnectEn === void 0 || _getState$onConnectEn.call(_getState3, event);
    if (edgeUpdaterType) {
      onEdgeUpdateEnd === null || onEdgeUpdateEnd === void 0 || onEdgeUpdateEnd(event);
    }
    resetRecentHandle(prevActiveHandle);
    cancelConnection();
    cancelAnimationFrame(autoPanId);
    autoPanStarted = false;
    isValid = false;
    connection = null;
    handleDomNode = null;
    doc.removeEventListener('mousemove', onPointerMove);
    doc.removeEventListener('mouseup', onPointerUp);
    doc.removeEventListener('touchmove', onPointerMove);
    doc.removeEventListener('touchend', onPointerUp);
  }
  doc.addEventListener('mousemove', onPointerMove);
  doc.addEventListener('mouseup', onPointerUp);
  doc.addEventListener('touchmove', onPointerMove);
  doc.addEventListener('touchend', onPointerUp);
}
var alwaysValid = function alwaysValid() {
  return true;
};
var selector$f = function selector$f(s) {
  return {
    connectionStartHandle: s.connectionStartHandle,
    connectOnClick: s.connectOnClick,
    noPanClassName: s.noPanClassName
  };
};
var connectingSelector = function connectingSelector(nodeId, handleId, type) {
  return function (state) {
    var startHandle = state.connectionStartHandle,
      endHandle = state.connectionEndHandle,
      clickHandle = state.connectionClickStartHandle;
    return {
      connecting: (startHandle === null || startHandle === void 0 ? void 0 : startHandle.nodeId) === nodeId && (startHandle === null || startHandle === void 0 ? void 0 : startHandle.handleId) === handleId && (startHandle === null || startHandle === void 0 ? void 0 : startHandle.type) === type || (endHandle === null || endHandle === void 0 ? void 0 : endHandle.nodeId) === nodeId && (endHandle === null || endHandle === void 0 ? void 0 : endHandle.handleId) === handleId && (endHandle === null || endHandle === void 0 ? void 0 : endHandle.type) === type,
      clickConnecting: (clickHandle === null || clickHandle === void 0 ? void 0 : clickHandle.nodeId) === nodeId && (clickHandle === null || clickHandle === void 0 ? void 0 : clickHandle.handleId) === handleId && (clickHandle === null || clickHandle === void 0 ? void 0 : clickHandle.type) === type
    };
  };
};
var Handle = /*#__PURE__*/(0,react.forwardRef)(function (_ref37, ref) {
  var _ref37$type = _ref37.type,
    type = _ref37$type === void 0 ? 'source' : _ref37$type,
    _ref37$position = _ref37.position,
    position = _ref37$position === void 0 ? Position.Top : _ref37$position,
    isValidConnection = _ref37.isValidConnection,
    _ref37$isConnectable = _ref37.isConnectable,
    isConnectable = _ref37$isConnectable === void 0 ? true : _ref37$isConnectable,
    _ref37$isConnectableS = _ref37.isConnectableStart,
    isConnectableStart = _ref37$isConnectableS === void 0 ? true : _ref37$isConnectableS,
    _ref37$isConnectableE = _ref37.isConnectableEnd,
    isConnectableEnd = _ref37$isConnectableE === void 0 ? true : _ref37$isConnectableE,
    id = _ref37.id,
    onConnect = _ref37.onConnect,
    children = _ref37.children,
    className = _ref37.className,
    onMouseDown = _ref37.onMouseDown,
    onTouchStart = _ref37.onTouchStart,
    rest = _objectWithoutProperties(_ref37, _excluded4);
  var handleId = id || null;
  var isTarget = type === 'target';
  var store = useStoreApi();
  var nodeId = useNodeId();
  var _useStore = useStore(selector$f, esm_shallow/* shallow */.x),
    connectOnClick = _useStore.connectOnClick,
    noPanClassName = _useStore.noPanClassName;
  var _useStore2 = useStore(connectingSelector(nodeId, handleId, type), esm_shallow/* shallow */.x),
    connecting = _useStore2.connecting,
    clickConnecting = _useStore2.clickConnecting;
  if (!nodeId) {
    var _store$getState$onErr, _store$getState;
    (_store$getState$onErr = (_store$getState = store.getState()).onError) === null || _store$getState$onErr === void 0 || _store$getState$onErr.call(_store$getState, '010', errorMessages['error010']());
  }
  var onConnectExtended = function onConnectExtended(params) {
    var _store$getState2 = store.getState(),
      defaultEdgeOptions = _store$getState2.defaultEdgeOptions,
      onConnectAction = _store$getState2.onConnect,
      hasDefaultEdges = _store$getState2.hasDefaultEdges;
    var edgeParams = _objectSpread(_objectSpread({}, defaultEdgeOptions), params);
    if (hasDefaultEdges) {
      var _store$getState3 = store.getState(),
        edges = _store$getState3.edges,
        setEdges = _store$getState3.setEdges;
      setEdges(addEdge(edgeParams, edges));
    }
    onConnectAction === null || onConnectAction === void 0 || onConnectAction(edgeParams);
    onConnect === null || onConnect === void 0 || onConnect(edgeParams);
  };
  var onPointerDown = function onPointerDown(event) {
    if (!nodeId) {
      return;
    }
    var isMouseTriggered = isMouseEvent(event);
    if (isConnectableStart && (isMouseTriggered && event.button === 0 || !isMouseTriggered)) {
      handlePointerDown({
        event: event,
        handleId: handleId,
        nodeId: nodeId,
        onConnect: onConnectExtended,
        isTarget: isTarget,
        getState: store.getState,
        setState: store.setState,
        isValidConnection: isValidConnection || store.getState().isValidConnection || alwaysValid
      });
    }
    if (isMouseTriggered) {
      onMouseDown === null || onMouseDown === void 0 || onMouseDown(event);
    } else {
      onTouchStart === null || onTouchStart === void 0 || onTouchStart(event);
    }
  };
  var onClick = function onClick(event) {
    var _store$getState4 = store.getState(),
      onClickConnectStart = _store$getState4.onClickConnectStart,
      onClickConnectEnd = _store$getState4.onClickConnectEnd,
      connectionClickStartHandle = _store$getState4.connectionClickStartHandle,
      connectionMode = _store$getState4.connectionMode,
      isValidConnectionStore = _store$getState4.isValidConnection;
    if (!nodeId || !connectionClickStartHandle && !isConnectableStart) {
      return;
    }
    if (!connectionClickStartHandle) {
      onClickConnectStart === null || onClickConnectStart === void 0 || onClickConnectStart(event, {
        nodeId: nodeId,
        handleId: handleId,
        handleType: type
      });
      store.setState({
        connectionClickStartHandle: {
          nodeId: nodeId,
          type: type,
          handleId: handleId
        }
      });
      return;
    }
    var doc = getHostForElement(event.target);
    var isValidConnectionHandler = isValidConnection || isValidConnectionStore || alwaysValid;
    var _isValidHandle = isValidHandle({
        nodeId: nodeId,
        id: handleId,
        type: type
      }, connectionMode, connectionClickStartHandle.nodeId, connectionClickStartHandle.handleId || null, connectionClickStartHandle.type, isValidConnectionHandler, doc),
      connection = _isValidHandle.connection,
      isValid = _isValidHandle.isValid;
    if (isValid) {
      onConnectExtended(connection);
    }
    onClickConnectEnd === null || onClickConnectEnd === void 0 || onClickConnectEnd(event);
    store.setState({
      connectionClickStartHandle: null
    });
  };
  return /*#__PURE__*/react.createElement("div", _objectSpread({
    "data-handleid": handleId,
    "data-nodeid": nodeId,
    "data-handlepos": position,
    "data-id": "".concat(nodeId, "-").concat(handleId, "-").concat(type),
    className: (0,classcat/* default */.A)(['react-flow__handle', "react-flow__handle-".concat(position), 'nodrag', noPanClassName, className, {
      source: !isTarget,
      target: isTarget,
      connectable: isConnectable,
      connectablestart: isConnectableStart,
      connectableend: isConnectableEnd,
      connecting: clickConnecting,
      // this class is used to style the handle when the user is connecting
      connectionindicator: isConnectable && (isConnectableStart && !connecting || isConnectableEnd && connecting)
    }]),
    onMouseDown: onPointerDown,
    onTouchStart: onPointerDown,
    onClick: connectOnClick ? onClick : undefined,
    ref: ref
  }, rest), children);
});
Handle.displayName = 'Handle';
var Handle$1 = /*#__PURE__*/(0,react.memo)(Handle);
var DefaultNode = function DefaultNode(_ref38) {
  var data = _ref38.data,
    isConnectable = _ref38.isConnectable,
    _ref38$targetPosition = _ref38.targetPosition,
    targetPosition = _ref38$targetPosition === void 0 ? Position.Top : _ref38$targetPosition,
    _ref38$sourcePosition = _ref38.sourcePosition,
    sourcePosition = _ref38$sourcePosition === void 0 ? Position.Bottom : _ref38$sourcePosition;
  return /*#__PURE__*/react.createElement(react.Fragment, null, /*#__PURE__*/react.createElement(Handle$1, {
    type: "target",
    position: targetPosition,
    isConnectable: isConnectable
  }), data === null || data === void 0 ? void 0 : data.label, /*#__PURE__*/react.createElement(Handle$1, {
    type: "source",
    position: sourcePosition,
    isConnectable: isConnectable
  }));
};
DefaultNode.displayName = 'DefaultNode';
var DefaultNode$1 = /*#__PURE__*/(0,react.memo)(DefaultNode);
var InputNode = function InputNode(_ref39) {
  var data = _ref39.data,
    isConnectable = _ref39.isConnectable,
    _ref39$sourcePosition = _ref39.sourcePosition,
    sourcePosition = _ref39$sourcePosition === void 0 ? Position.Bottom : _ref39$sourcePosition;
  return /*#__PURE__*/react.createElement(react.Fragment, null, data === null || data === void 0 ? void 0 : data.label, /*#__PURE__*/react.createElement(Handle$1, {
    type: "source",
    position: sourcePosition,
    isConnectable: isConnectable
  }));
};
InputNode.displayName = 'InputNode';
var InputNode$1 = /*#__PURE__*/(0,react.memo)(InputNode);
var OutputNode = function OutputNode(_ref40) {
  var data = _ref40.data,
    isConnectable = _ref40.isConnectable,
    _ref40$targetPosition = _ref40.targetPosition,
    targetPosition = _ref40$targetPosition === void 0 ? Position.Top : _ref40$targetPosition;
  return /*#__PURE__*/react.createElement(react.Fragment, null, /*#__PURE__*/react.createElement(Handle$1, {
    type: "target",
    position: targetPosition,
    isConnectable: isConnectable
  }), data === null || data === void 0 ? void 0 : data.label);
};
OutputNode.displayName = 'OutputNode';
var OutputNode$1 = /*#__PURE__*/(0,react.memo)(OutputNode);
var GroupNode = function GroupNode() {
  return null;
};
GroupNode.displayName = 'GroupNode';
var selector$e = function selector$e(s) {
  return {
    selectedNodes: s.getNodes().filter(function (n) {
      return n.selected;
    }),
    selectedEdges: s.edges.filter(function (e) {
      return e.selected;
    })
  };
};
var selectId = function selectId(obj) {
  return obj.id;
};
function areEqual(a, b) {
  return (0,esm_shallow/* shallow */.x)(a.selectedNodes.map(selectId), b.selectedNodes.map(selectId)) && (0,esm_shallow/* shallow */.x)(a.selectedEdges.map(selectId), b.selectedEdges.map(selectId));
}
// This is just a helper component for calling the onSelectionChange listener.
// @TODO: Now that we have the onNodesChange and on EdgesChange listeners, do we still need this component?
var SelectionListener = /*#__PURE__*/(0,react.memo)(function (_ref41) {
  var onSelectionChange = _ref41.onSelectionChange;
  var store = useStoreApi();
  var _useStore3 = useStore(selector$e, areEqual),
    selectedNodes = _useStore3.selectedNodes,
    selectedEdges = _useStore3.selectedEdges;
  (0,react.useEffect)(function () {
    var params = {
      nodes: selectedNodes,
      edges: selectedEdges
    };
    onSelectionChange === null || onSelectionChange === void 0 || onSelectionChange(params);
    store.getState().onSelectionChange.forEach(function (fn) {
      return fn(params);
    });
  }, [selectedNodes, selectedEdges, onSelectionChange]);
  return null;
});
SelectionListener.displayName = 'SelectionListener';
var changeSelector = function changeSelector(s) {
  return !!s.onSelectionChange;
};
function Wrapper$1(_ref42) {
  var onSelectionChange = _ref42.onSelectionChange;
  var storeHasSelectionChange = useStore(changeSelector);
  if (onSelectionChange || storeHasSelectionChange) {
    return /*#__PURE__*/react.createElement(SelectionListener, {
      onSelectionChange: onSelectionChange
    });
  }
  return null;
}
var selector$d = function selector$d(s) {
  return {
    setNodes: s.setNodes,
    setEdges: s.setEdges,
    setDefaultNodesAndEdges: s.setDefaultNodesAndEdges,
    setMinZoom: s.setMinZoom,
    setMaxZoom: s.setMaxZoom,
    setTranslateExtent: s.setTranslateExtent,
    setNodeExtent: s.setNodeExtent,
    reset: s.reset
  };
};
function useStoreUpdater(value, setStoreState) {
  (0,react.useEffect)(function () {
    if (typeof value !== 'undefined') {
      setStoreState(value);
    }
  }, [value]);
}
// updates with values in store that don't have a dedicated setter function
function useDirectStoreUpdater(key, value, setState) {
  (0,react.useEffect)(function () {
    if (typeof value !== 'undefined') {
      setState(_defineProperty({}, key, value));
    }
  }, [value]);
}
var StoreUpdater = function StoreUpdater(_ref43) {
  var nodes = _ref43.nodes,
    edges = _ref43.edges,
    defaultNodes = _ref43.defaultNodes,
    defaultEdges = _ref43.defaultEdges,
    onConnect = _ref43.onConnect,
    onConnectStart = _ref43.onConnectStart,
    onConnectEnd = _ref43.onConnectEnd,
    onClickConnectStart = _ref43.onClickConnectStart,
    onClickConnectEnd = _ref43.onClickConnectEnd,
    nodesDraggable = _ref43.nodesDraggable,
    nodesConnectable = _ref43.nodesConnectable,
    nodesFocusable = _ref43.nodesFocusable,
    edgesFocusable = _ref43.edgesFocusable,
    edgesUpdatable = _ref43.edgesUpdatable,
    elevateNodesOnSelect = _ref43.elevateNodesOnSelect,
    minZoom = _ref43.minZoom,
    maxZoom = _ref43.maxZoom,
    nodeExtent = _ref43.nodeExtent,
    onNodesChange = _ref43.onNodesChange,
    onEdgesChange = _ref43.onEdgesChange,
    elementsSelectable = _ref43.elementsSelectable,
    connectionMode = _ref43.connectionMode,
    snapGrid = _ref43.snapGrid,
    snapToGrid = _ref43.snapToGrid,
    translateExtent = _ref43.translateExtent,
    connectOnClick = _ref43.connectOnClick,
    defaultEdgeOptions = _ref43.defaultEdgeOptions,
    fitView = _ref43.fitView,
    fitViewOptions = _ref43.fitViewOptions,
    onNodesDelete = _ref43.onNodesDelete,
    onEdgesDelete = _ref43.onEdgesDelete,
    onNodeDrag = _ref43.onNodeDrag,
    onNodeDragStart = _ref43.onNodeDragStart,
    onNodeDragStop = _ref43.onNodeDragStop,
    onSelectionDrag = _ref43.onSelectionDrag,
    onSelectionDragStart = _ref43.onSelectionDragStart,
    onSelectionDragStop = _ref43.onSelectionDragStop,
    noPanClassName = _ref43.noPanClassName,
    nodeOrigin = _ref43.nodeOrigin,
    rfId = _ref43.rfId,
    autoPanOnConnect = _ref43.autoPanOnConnect,
    autoPanOnNodeDrag = _ref43.autoPanOnNodeDrag,
    onError = _ref43.onError,
    connectionRadius = _ref43.connectionRadius,
    isValidConnection = _ref43.isValidConnection,
    nodeDragThreshold = _ref43.nodeDragThreshold;
  var _useStore4 = useStore(selector$d, esm_shallow/* shallow */.x),
    setNodes = _useStore4.setNodes,
    setEdges = _useStore4.setEdges,
    setDefaultNodesAndEdges = _useStore4.setDefaultNodesAndEdges,
    setMinZoom = _useStore4.setMinZoom,
    setMaxZoom = _useStore4.setMaxZoom,
    setTranslateExtent = _useStore4.setTranslateExtent,
    setNodeExtent = _useStore4.setNodeExtent,
    reset = _useStore4.reset;
  var store = useStoreApi();
  (0,react.useEffect)(function () {
    var edgesWithDefaults = defaultEdges === null || defaultEdges === void 0 ? void 0 : defaultEdges.map(function (e) {
      return _objectSpread(_objectSpread({}, e), defaultEdgeOptions);
    });
    setDefaultNodesAndEdges(defaultNodes, edgesWithDefaults);
    return function () {
      reset();
    };
  }, []);
  useDirectStoreUpdater('defaultEdgeOptions', defaultEdgeOptions, store.setState);
  useDirectStoreUpdater('connectionMode', connectionMode, store.setState);
  useDirectStoreUpdater('onConnect', onConnect, store.setState);
  useDirectStoreUpdater('onConnectStart', onConnectStart, store.setState);
  useDirectStoreUpdater('onConnectEnd', onConnectEnd, store.setState);
  useDirectStoreUpdater('onClickConnectStart', onClickConnectStart, store.setState);
  useDirectStoreUpdater('onClickConnectEnd', onClickConnectEnd, store.setState);
  useDirectStoreUpdater('nodesDraggable', nodesDraggable, store.setState);
  useDirectStoreUpdater('nodesConnectable', nodesConnectable, store.setState);
  useDirectStoreUpdater('nodesFocusable', nodesFocusable, store.setState);
  useDirectStoreUpdater('edgesFocusable', edgesFocusable, store.setState);
  useDirectStoreUpdater('edgesUpdatable', edgesUpdatable, store.setState);
  useDirectStoreUpdater('elementsSelectable', elementsSelectable, store.setState);
  useDirectStoreUpdater('elevateNodesOnSelect', elevateNodesOnSelect, store.setState);
  useDirectStoreUpdater('snapToGrid', snapToGrid, store.setState);
  useDirectStoreUpdater('snapGrid', snapGrid, store.setState);
  useDirectStoreUpdater('onNodesChange', onNodesChange, store.setState);
  useDirectStoreUpdater('onEdgesChange', onEdgesChange, store.setState);
  useDirectStoreUpdater('connectOnClick', connectOnClick, store.setState);
  useDirectStoreUpdater('fitViewOnInit', fitView, store.setState);
  useDirectStoreUpdater('fitViewOnInitOptions', fitViewOptions, store.setState);
  useDirectStoreUpdater('onNodesDelete', onNodesDelete, store.setState);
  useDirectStoreUpdater('onEdgesDelete', onEdgesDelete, store.setState);
  useDirectStoreUpdater('onNodeDrag', onNodeDrag, store.setState);
  useDirectStoreUpdater('onNodeDragStart', onNodeDragStart, store.setState);
  useDirectStoreUpdater('onNodeDragStop', onNodeDragStop, store.setState);
  useDirectStoreUpdater('onSelectionDrag', onSelectionDrag, store.setState);
  useDirectStoreUpdater('onSelectionDragStart', onSelectionDragStart, store.setState);
  useDirectStoreUpdater('onSelectionDragStop', onSelectionDragStop, store.setState);
  useDirectStoreUpdater('noPanClassName', noPanClassName, store.setState);
  useDirectStoreUpdater('nodeOrigin', nodeOrigin, store.setState);
  useDirectStoreUpdater('rfId', rfId, store.setState);
  useDirectStoreUpdater('autoPanOnConnect', autoPanOnConnect, store.setState);
  useDirectStoreUpdater('autoPanOnNodeDrag', autoPanOnNodeDrag, store.setState);
  useDirectStoreUpdater('onError', onError, store.setState);
  useDirectStoreUpdater('connectionRadius', connectionRadius, store.setState);
  useDirectStoreUpdater('isValidConnection', isValidConnection, store.setState);
  useDirectStoreUpdater('nodeDragThreshold', nodeDragThreshold, store.setState);
  useStoreUpdater(nodes, setNodes);
  useStoreUpdater(edges, setEdges);
  useStoreUpdater(minZoom, setMinZoom);
  useStoreUpdater(maxZoom, setMaxZoom);
  useStoreUpdater(translateExtent, setTranslateExtent);
  useStoreUpdater(nodeExtent, setNodeExtent);
  return null;
};
var style = {
  display: 'none'
};
var ariaLiveStyle = {
  position: 'absolute',
  width: 1,
  height: 1,
  margin: -1,
  border: 0,
  padding: 0,
  overflow: 'hidden',
  clip: 'rect(0px, 0px, 0px, 0px)',
  clipPath: 'inset(100%)'
};
var ARIA_NODE_DESC_KEY = 'react-flow__node-desc';
var ARIA_EDGE_DESC_KEY = 'react-flow__edge-desc';
var ARIA_LIVE_MESSAGE = 'react-flow__aria-live';
var selector$c = function selector$c(s) {
  return s.ariaLiveMessage;
};
function AriaLiveMessage(_ref44) {
  var rfId = _ref44.rfId;
  var ariaLiveMessage = useStore(selector$c);
  return /*#__PURE__*/react.createElement("div", {
    id: "".concat(ARIA_LIVE_MESSAGE, "-").concat(rfId),
    "aria-live": "assertive",
    "aria-atomic": "true",
    style: ariaLiveStyle
  }, ariaLiveMessage);
}
function A11yDescriptions(_ref45) {
  var rfId = _ref45.rfId,
    disableKeyboardA11y = _ref45.disableKeyboardA11y;
  return /*#__PURE__*/react.createElement(react.Fragment, null, /*#__PURE__*/react.createElement("div", {
    id: "".concat(ARIA_NODE_DESC_KEY, "-").concat(rfId),
    style: style
  }, "Press enter or space to select a node.", !disableKeyboardA11y && 'You can then use the arrow keys to move the node around.', " Press delete to remove it and escape to cancel.", ' '), /*#__PURE__*/react.createElement("div", {
    id: "".concat(ARIA_EDGE_DESC_KEY, "-").concat(rfId),
    style: style
  }, "Press enter or space to select an edge. You can then press delete to remove it or escape to cancel."), !disableKeyboardA11y && /*#__PURE__*/react.createElement(AriaLiveMessage, {
    rfId: rfId
  }));
}

// the keycode can be a string 'a' or an array of strings ['a', 'a+d']
// a string means a single key 'a' or a combination when '+' is used 'a+d'
// an array means different possibilities. Explainer: ['a', 'd+s'] here the
// user can use the single key 'a' or the combination 'd' + 's'
var useKeyPress = function useKeyPress() {
  var keyCode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    actInsideInputWithModifier: true
  };
  var _useState3 = (0,react.useState)(false),
    _useState4 = _slicedToArray(_useState3, 2),
    keyPressed = _useState4[0],
    setKeyPressed = _useState4[1];
  // we need to remember if a modifier key is pressed in order to track it
  var modifierPressed = (0,react.useRef)(false);
  // we need to remember the pressed keys in order to support combinations
  var pressedKeys = (0,react.useRef)(new Set([]));
  // keyCodes = array with single keys [['a']] or key combinations [['a', 's']]
  // keysToWatch = array with all keys flattened ['a', 'd', 'ShiftLeft']
  // used to check if we store event.code or event.key. When the code is in the list of keysToWatch
  // we use the code otherwise the key. Explainer: When you press the left "command" key, the code is "MetaLeft"
  // and the key is "Meta". We want users to be able to pass keys and codes so we assume that the key is meant when
  // we can't find it in the list of keysToWatch.
  var _useMemo = (0,react.useMemo)(function () {
      if (keyCode !== null) {
        var keyCodeArr = Array.isArray(keyCode) ? keyCode : [keyCode];
        var keys = keyCodeArr.filter(function (kc) {
          return typeof kc === 'string';
        }).map(function (kc) {
          return kc.split('+');
        });
        var keysFlat = keys.reduce(function (res, item) {
          return res.concat.apply(res, _toConsumableArray(item));
        }, []);
        return [keys, keysFlat];
      }
      return [[], []];
    }, [keyCode]),
    _useMemo2 = _slicedToArray(_useMemo, 2),
    keyCodes = _useMemo2[0],
    keysToWatch = _useMemo2[1];
  (0,react.useEffect)(function () {
    var doc = typeof document !== 'undefined' ? document : null;
    var target = (options === null || options === void 0 ? void 0 : options.target) || doc;
    if (keyCode !== null) {
      var downHandler = function downHandler(event) {
        modifierPressed.current = event.ctrlKey || event.metaKey || event.shiftKey;
        var preventAction = (!modifierPressed.current || modifierPressed.current && !options.actInsideInputWithModifier) && isInputDOMNode(event);
        if (preventAction) {
          return false;
        }
        var keyOrCode = useKeyOrCode(event.code, keysToWatch);
        pressedKeys.current.add(event[keyOrCode]);
        if (isMatchingKey(keyCodes, pressedKeys.current, false)) {
          event.preventDefault();
          setKeyPressed(true);
        }
      };
      var upHandler = function upHandler(event) {
        var preventAction = (!modifierPressed.current || modifierPressed.current && !options.actInsideInputWithModifier) && isInputDOMNode(event);
        if (preventAction) {
          return false;
        }
        var keyOrCode = useKeyOrCode(event.code, keysToWatch);
        if (isMatchingKey(keyCodes, pressedKeys.current, true)) {
          setKeyPressed(false);
          pressedKeys.current.clear();
        } else {
          pressedKeys.current.delete(event[keyOrCode]);
        }
        // fix for Mac: when cmd key is pressed, keyup is not triggered for any other key, see: https://stackoverflow.com/questions/27380018/when-cmd-key-is-kept-pressed-keyup-is-not-triggered-for-any-other-key
        if (event.key === 'Meta') {
          pressedKeys.current.clear();
        }
        modifierPressed.current = false;
      };
      var resetHandler = function resetHandler() {
        pressedKeys.current.clear();
        setKeyPressed(false);
      };
      target === null || target === void 0 || target.addEventListener('keydown', downHandler);
      target === null || target === void 0 || target.addEventListener('keyup', upHandler);
      window.addEventListener('blur', resetHandler);
      return function () {
        target === null || target === void 0 || target.removeEventListener('keydown', downHandler);
        target === null || target === void 0 || target.removeEventListener('keyup', upHandler);
        window.removeEventListener('blur', resetHandler);
      };
    }
  }, [keyCode, setKeyPressed]);
  return keyPressed;
};
// utils
function isMatchingKey(keyCodes, pressedKeys, isUp) {
  return keyCodes
  // we only want to compare same sizes of keyCode definitions
  // and pressed keys. When the user specified 'Meta' as a key somewhere
  // this would also be truthy without this filter when user presses 'Meta' + 'r'
  .filter(function (keys) {
    return isUp || keys.length === pressedKeys.size;
  })
  // since we want to support multiple possibilities only one of the
  // combinations need to be part of the pressed keys
  .some(function (keys) {
    return keys.every(function (k) {
      return pressedKeys.has(k);
    });
  });
}
function useKeyOrCode(eventCode, keysToWatch) {
  return keysToWatch.includes(eventCode) ? 'code' : 'key';
}
function calculateXYZPosition(node, nodeInternals, result, nodeOrigin) {
  var _result$x, _result$y, _parentNode$internals, _parentNode$internals2, _result$z, _parentNode$internals3, _parentNode$internals4, _result$z2;
  if (!node.parentNode) {
    return result;
  }
  var parentNode = nodeInternals.get(node.parentNode);
  var parentNodePosition = getNodePositionWithOrigin(parentNode, nodeOrigin);
  return calculateXYZPosition(parentNode, nodeInternals, {
    x: ((_result$x = result.x) !== null && _result$x !== void 0 ? _result$x : 0) + parentNodePosition.x,
    y: ((_result$y = result.y) !== null && _result$y !== void 0 ? _result$y : 0) + parentNodePosition.y,
    z: ((_parentNode$internals = (_parentNode$internals2 = parentNode[internalsSymbol]) === null || _parentNode$internals2 === void 0 ? void 0 : _parentNode$internals2.z) !== null && _parentNode$internals !== void 0 ? _parentNode$internals : 0) > ((_result$z = result.z) !== null && _result$z !== void 0 ? _result$z : 0) ? (_parentNode$internals3 = (_parentNode$internals4 = parentNode[internalsSymbol]) === null || _parentNode$internals4 === void 0 ? void 0 : _parentNode$internals4.z) !== null && _parentNode$internals3 !== void 0 ? _parentNode$internals3 : 0 : (_result$z2 = result.z) !== null && _result$z2 !== void 0 ? _result$z2 : 0
  }, nodeOrigin);
}
function updateAbsoluteNodePositions(nodeInternals, nodeOrigin, parentNodes) {
  nodeInternals.forEach(function (node) {
    if (node.parentNode && !nodeInternals.has(node.parentNode)) {
      throw new Error("Parent node ".concat(node.parentNode, " not found"));
    }
    if (node.parentNode || parentNodes !== null && parentNodes !== void 0 && parentNodes[node.id]) {
      var _node$internalsSymbol, _node$internalsSymbol2;
      var _calculateXYZPosition = calculateXYZPosition(node, nodeInternals, _objectSpread(_objectSpread({}, node.position), {}, {
          z: (_node$internalsSymbol = (_node$internalsSymbol2 = node[internalsSymbol]) === null || _node$internalsSymbol2 === void 0 ? void 0 : _node$internalsSymbol2.z) !== null && _node$internalsSymbol !== void 0 ? _node$internalsSymbol : 0
        }), nodeOrigin),
        x = _calculateXYZPosition.x,
        y = _calculateXYZPosition.y,
        z = _calculateXYZPosition.z;
      node.positionAbsolute = {
        x: x,
        y: y
      };
      node[internalsSymbol].z = z;
      if (parentNodes !== null && parentNodes !== void 0 && parentNodes[node.id]) {
        node[internalsSymbol].isParent = true;
      }
    }
  });
}
function createNodeInternals(nodes, nodeInternals, nodeOrigin, elevateNodesOnSelect) {
  var nextNodeInternals = new Map();
  var parentNodes = {};
  var selectedNodeZ = elevateNodesOnSelect ? 1000 : 0;
  nodes.forEach(function (node) {
    var _currInternals$intern;
    var z = (isNumeric(node.zIndex) ? node.zIndex : 0) + (node.selected ? selectedNodeZ : 0);
    var currInternals = nodeInternals.get(node.id);
    var internals = _objectSpread(_objectSpread({}, node), {}, {
      positionAbsolute: {
        x: node.position.x,
        y: node.position.y
      }
    });
    if (node.parentNode) {
      parentNodes[node.parentNode] = true;
    }
    var resetHandleBounds = (currInternals === null || currInternals === void 0 ? void 0 : currInternals.type) && (currInternals === null || currInternals === void 0 ? void 0 : currInternals.type) !== node.type;
    Object.defineProperty(internals, internalsSymbol, {
      enumerable: false,
      value: {
        handleBounds: resetHandleBounds ? undefined : currInternals === null || currInternals === void 0 || (_currInternals$intern = currInternals[internalsSymbol]) === null || _currInternals$intern === void 0 ? void 0 : _currInternals$intern.handleBounds,
        z: z
      }
    });
    nextNodeInternals.set(node.id, internals);
  });
  updateAbsoluteNodePositions(nextNodeInternals, nodeOrigin, parentNodes);
  return nextNodeInternals;
}
function _fitView(get) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var _get = get(),
    getNodes = _get.getNodes,
    width = _get.width,
    height = _get.height,
    minZoom = _get.minZoom,
    maxZoom = _get.maxZoom,
    d3Zoom = _get.d3Zoom,
    d3Selection = _get.d3Selection,
    fitViewOnInitDone = _get.fitViewOnInitDone,
    fitViewOnInit = _get.fitViewOnInit,
    nodeOrigin = _get.nodeOrigin;
  var isInitialFitView = options.initial && !fitViewOnInitDone && fitViewOnInit;
  var d3initialized = d3Zoom && d3Selection;
  if (d3initialized && (isInitialFitView || !options.initial)) {
    var nodes = getNodes().filter(function (n) {
      var _options$nodes;
      var isVisible = options.includeHiddenNodes ? n.width && n.height : !n.hidden;
      if ((_options$nodes = options.nodes) !== null && _options$nodes !== void 0 && _options$nodes.length) {
        return isVisible && options.nodes.some(function (optionNode) {
          return optionNode.id === n.id;
        });
      }
      return isVisible;
    });
    var nodesInitialized = nodes.every(function (n) {
      return n.width && n.height;
    });
    if (nodes.length > 0 && nodesInitialized) {
      var _options$minZoom, _options$maxZoom, _options$padding;
      var bounds = getNodesBounds(nodes, nodeOrigin);
      var _getViewportForBounds2 = getViewportForBounds(bounds, width, height, (_options$minZoom = options.minZoom) !== null && _options$minZoom !== void 0 ? _options$minZoom : minZoom, (_options$maxZoom = options.maxZoom) !== null && _options$maxZoom !== void 0 ? _options$maxZoom : maxZoom, (_options$padding = options.padding) !== null && _options$padding !== void 0 ? _options$padding : 0.1),
        x = _getViewportForBounds2.x,
        y = _getViewportForBounds2.y,
        _zoom = _getViewportForBounds2.zoom;
      var nextTransform = src/* zoomIdentity */.GS.translate(x, y).scale(_zoom);
      if (typeof options.duration === 'number' && options.duration > 0) {
        d3Zoom.transform(getD3Transition(d3Selection, options.duration), nextTransform);
      } else {
        d3Zoom.transform(d3Selection, nextTransform);
      }
      return true;
    }
  }
  return false;
}
function handleControlledNodeSelectionChange(nodeChanges, nodeInternals) {
  nodeChanges.forEach(function (change) {
    var node = nodeInternals.get(change.id);
    if (node) {
      nodeInternals.set(node.id, _objectSpread(_objectSpread({}, node), {}, _defineProperty(_defineProperty({}, internalsSymbol, node[internalsSymbol]), "selected", change.selected)));
    }
  });
  return new Map(nodeInternals);
}
function handleControlledEdgeSelectionChange(edgeChanges, edges) {
  return edges.map(function (e) {
    var change = edgeChanges.find(function (change) {
      return change.id === e.id;
    });
    if (change) {
      e.selected = change.selected;
    }
    return e;
  });
}
function updateNodesAndEdgesSelections(_ref46) {
  var changedNodes = _ref46.changedNodes,
    changedEdges = _ref46.changedEdges,
    get = _ref46.get,
    set = _ref46.set;
  var _get2 = get(),
    nodeInternals = _get2.nodeInternals,
    edges = _get2.edges,
    onNodesChange = _get2.onNodesChange,
    onEdgesChange = _get2.onEdgesChange,
    hasDefaultNodes = _get2.hasDefaultNodes,
    hasDefaultEdges = _get2.hasDefaultEdges;
  if (changedNodes !== null && changedNodes !== void 0 && changedNodes.length) {
    if (hasDefaultNodes) {
      set({
        nodeInternals: handleControlledNodeSelectionChange(changedNodes, nodeInternals)
      });
    }
    onNodesChange === null || onNodesChange === void 0 || onNodesChange(changedNodes);
  }
  if (changedEdges !== null && changedEdges !== void 0 && changedEdges.length) {
    if (hasDefaultEdges) {
      set({
        edges: handleControlledEdgeSelectionChange(changedEdges, edges)
      });
    }
    onEdgesChange === null || onEdgesChange === void 0 || onEdgesChange(changedEdges);
  }
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
var noop = function noop() {};
var initialViewportHelper = {
  zoomIn: noop,
  zoomOut: noop,
  zoomTo: noop,
  getZoom: function getZoom() {
    return 1;
  },
  setViewport: noop,
  getViewport: function getViewport() {
    return {
      x: 0,
      y: 0,
      zoom: 1
    };
  },
  fitView: function fitView() {
    return false;
  },
  setCenter: noop,
  fitBounds: noop,
  project: function project(position) {
    return position;
  },
  screenToFlowPosition: function screenToFlowPosition(position) {
    return position;
  },
  flowToScreenPosition: function flowToScreenPosition(position) {
    return position;
  },
  viewportInitialized: false
};
var selector$b = function selector$b(s) {
  return {
    d3Zoom: s.d3Zoom,
    d3Selection: s.d3Selection
  };
};
var useViewportHelper = function useViewportHelper() {
  var store = useStoreApi();
  var _useStore5 = useStore(selector$b, esm_shallow/* shallow */.x),
    d3Zoom = _useStore5.d3Zoom,
    d3Selection = _useStore5.d3Selection;
  var viewportHelperFunctions = (0,react.useMemo)(function () {
    if (d3Selection && d3Zoom) {
      return {
        zoomIn: function zoomIn(options) {
          return d3Zoom.scaleBy(getD3Transition(d3Selection, options === null || options === void 0 ? void 0 : options.duration), 1.2);
        },
        zoomOut: function zoomOut(options) {
          return d3Zoom.scaleBy(getD3Transition(d3Selection, options === null || options === void 0 ? void 0 : options.duration), 1 / 1.2);
        },
        zoomTo: function zoomTo(zoomLevel, options) {
          return d3Zoom.scaleTo(getD3Transition(d3Selection, options === null || options === void 0 ? void 0 : options.duration), zoomLevel);
        },
        getZoom: function getZoom() {
          return store.getState().transform[2];
        },
        setViewport: function setViewport(transform, options) {
          var _transform$x, _transform$y, _transform$zoom;
          var _store$getState$trans = _slicedToArray(store.getState().transform, 3),
            x = _store$getState$trans[0],
            y = _store$getState$trans[1],
            zoom = _store$getState$trans[2];
          var nextTransform = src/* zoomIdentity */.GS.translate((_transform$x = transform.x) !== null && _transform$x !== void 0 ? _transform$x : x, (_transform$y = transform.y) !== null && _transform$y !== void 0 ? _transform$y : y).scale((_transform$zoom = transform.zoom) !== null && _transform$zoom !== void 0 ? _transform$zoom : zoom);
          d3Zoom.transform(getD3Transition(d3Selection, options === null || options === void 0 ? void 0 : options.duration), nextTransform);
        },
        getViewport: function getViewport() {
          var _store$getState$trans2 = _slicedToArray(store.getState().transform, 3),
            x = _store$getState$trans2[0],
            y = _store$getState$trans2[1],
            zoom = _store$getState$trans2[2];
          return {
            x: x,
            y: y,
            zoom: zoom
          };
        },
        fitView: function fitView(options) {
          return _fitView(store.getState, options);
        },
        setCenter: function setCenter(x, y, options) {
          var _store$getState5 = store.getState(),
            width = _store$getState5.width,
            height = _store$getState5.height,
            maxZoom = _store$getState5.maxZoom;
          var nextZoom = typeof (options === null || options === void 0 ? void 0 : options.zoom) !== 'undefined' ? options.zoom : maxZoom;
          var centerX = width / 2 - x * nextZoom;
          var centerY = height / 2 - y * nextZoom;
          var transform = src/* zoomIdentity */.GS.translate(centerX, centerY).scale(nextZoom);
          d3Zoom.transform(getD3Transition(d3Selection, options === null || options === void 0 ? void 0 : options.duration), transform);
        },
        fitBounds: function fitBounds(bounds, options) {
          var _options$padding2;
          var _store$getState6 = store.getState(),
            width = _store$getState6.width,
            height = _store$getState6.height,
            minZoom = _store$getState6.minZoom,
            maxZoom = _store$getState6.maxZoom;
          var _getViewportForBounds3 = getViewportForBounds(bounds, width, height, minZoom, maxZoom, (_options$padding2 = options === null || options === void 0 ? void 0 : options.padding) !== null && _options$padding2 !== void 0 ? _options$padding2 : 0.1),
            x = _getViewportForBounds3.x,
            y = _getViewportForBounds3.y,
            zoom = _getViewportForBounds3.zoom;
          var transform = src/* zoomIdentity */.GS.translate(x, y).scale(zoom);
          d3Zoom.transform(getD3Transition(d3Selection, options === null || options === void 0 ? void 0 : options.duration), transform);
        },
        // @deprecated Use `screenToFlowPosition`.
        project: function project(position) {
          var _store$getState7 = store.getState(),
            transform = _store$getState7.transform,
            snapToGrid = _store$getState7.snapToGrid,
            snapGrid = _store$getState7.snapGrid;
          console.warn('[DEPRECATED] `project` is deprecated. Instead use `screenToFlowPosition`. There is no need to subtract the react flow bounds anymore! https://reactflow.dev/api-reference/types/react-flow-instance#screen-to-flow-position');
          return pointToRendererPoint(position, transform, snapToGrid, snapGrid);
        },
        screenToFlowPosition: function screenToFlowPosition(position) {
          var _store$getState8 = store.getState(),
            transform = _store$getState8.transform,
            snapToGrid = _store$getState8.snapToGrid,
            snapGrid = _store$getState8.snapGrid,
            domNode = _store$getState8.domNode;
          if (!domNode) {
            return position;
          }
          var _domNode$getBoundingC = domNode.getBoundingClientRect(),
            domX = _domNode$getBoundingC.x,
            domY = _domNode$getBoundingC.y;
          var relativePosition = {
            x: position.x - domX,
            y: position.y - domY
          };
          return pointToRendererPoint(relativePosition, transform, snapToGrid, snapGrid);
        },
        flowToScreenPosition: function flowToScreenPosition(position) {
          var _store$getState9 = store.getState(),
            transform = _store$getState9.transform,
            domNode = _store$getState9.domNode;
          if (!domNode) {
            return position;
          }
          var _domNode$getBoundingC2 = domNode.getBoundingClientRect(),
            domX = _domNode$getBoundingC2.x,
            domY = _domNode$getBoundingC2.y;
          var rendererPosition = rendererPointToPoint(position, transform);
          return {
            x: rendererPosition.x + domX,
            y: rendererPosition.y + domY
          };
        },
        viewportInitialized: true
      };
    }
    return initialViewportHelper;
  }, [d3Zoom, d3Selection]);
  return viewportHelperFunctions;
};

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
function useReactFlow() {
  var viewportHelper = useViewportHelper();
  var store = useStoreApi();
  var getNodes = (0,react.useCallback)(function () {
    return store.getState().getNodes().map(function (n) {
      return _objectSpread({}, n);
    });
  }, []);
  var getNode = (0,react.useCallback)(function (id) {
    return store.getState().nodeInternals.get(id);
  }, []);
  var getEdges = (0,react.useCallback)(function () {
    var _store$getState10 = store.getState(),
      _store$getState10$edg = _store$getState10.edges,
      edges = _store$getState10$edg === void 0 ? [] : _store$getState10$edg;
    return edges.map(function (e) {
      return _objectSpread({}, e);
    });
  }, []);
  var getEdge = (0,react.useCallback)(function (id) {
    var _store$getState11 = store.getState(),
      _store$getState11$edg = _store$getState11.edges,
      edges = _store$getState11$edg === void 0 ? [] : _store$getState11$edg;
    return edges.find(function (e) {
      return e.id === id;
    });
  }, []);
  var setNodes = (0,react.useCallback)(function (payload) {
    var _store$getState12 = store.getState(),
      getNodes = _store$getState12.getNodes,
      setNodes = _store$getState12.setNodes,
      hasDefaultNodes = _store$getState12.hasDefaultNodes,
      onNodesChange = _store$getState12.onNodesChange;
    var nodes = getNodes();
    var nextNodes = typeof payload === 'function' ? payload(nodes) : payload;
    if (hasDefaultNodes) {
      setNodes(nextNodes);
    } else if (onNodesChange) {
      var changes = nextNodes.length === 0 ? nodes.map(function (node) {
        return {
          type: 'remove',
          id: node.id
        };
      }) : nextNodes.map(function (node) {
        return {
          item: node,
          type: 'reset'
        };
      });
      onNodesChange(changes);
    }
  }, []);
  var setEdges = (0,react.useCallback)(function (payload) {
    var _store$getState13 = store.getState(),
      _store$getState13$edg = _store$getState13.edges,
      edges = _store$getState13$edg === void 0 ? [] : _store$getState13$edg,
      setEdges = _store$getState13.setEdges,
      hasDefaultEdges = _store$getState13.hasDefaultEdges,
      onEdgesChange = _store$getState13.onEdgesChange;
    var nextEdges = typeof payload === 'function' ? payload(edges) : payload;
    if (hasDefaultEdges) {
      setEdges(nextEdges);
    } else if (onEdgesChange) {
      var changes = nextEdges.length === 0 ? edges.map(function (edge) {
        return {
          type: 'remove',
          id: edge.id
        };
      }) : nextEdges.map(function (edge) {
        return {
          item: edge,
          type: 'reset'
        };
      });
      onEdgesChange(changes);
    }
  }, []);
  var addNodes = (0,react.useCallback)(function (payload) {
    var nodes = Array.isArray(payload) ? payload : [payload];
    var _store$getState14 = store.getState(),
      getNodes = _store$getState14.getNodes,
      setNodes = _store$getState14.setNodes,
      hasDefaultNodes = _store$getState14.hasDefaultNodes,
      onNodesChange = _store$getState14.onNodesChange;
    if (hasDefaultNodes) {
      var currentNodes = getNodes();
      var nextNodes = [].concat(_toConsumableArray(currentNodes), _toConsumableArray(nodes));
      setNodes(nextNodes);
    } else if (onNodesChange) {
      var changes = nodes.map(function (node) {
        return {
          item: node,
          type: 'add'
        };
      });
      onNodesChange(changes);
    }
  }, []);
  var addEdges = (0,react.useCallback)(function (payload) {
    var nextEdges = Array.isArray(payload) ? payload : [payload];
    var _store$getState15 = store.getState(),
      _store$getState15$edg = _store$getState15.edges,
      edges = _store$getState15$edg === void 0 ? [] : _store$getState15$edg,
      setEdges = _store$getState15.setEdges,
      hasDefaultEdges = _store$getState15.hasDefaultEdges,
      onEdgesChange = _store$getState15.onEdgesChange;
    if (hasDefaultEdges) {
      setEdges([].concat(_toConsumableArray(edges), _toConsumableArray(nextEdges)));
    } else if (onEdgesChange) {
      var changes = nextEdges.map(function (edge) {
        return {
          item: edge,
          type: 'add'
        };
      });
      onEdgesChange(changes);
    }
  }, []);
  var toObject = (0,react.useCallback)(function () {
    var _store$getState16 = store.getState(),
      getNodes = _store$getState16.getNodes,
      _store$getState16$edg = _store$getState16.edges,
      edges = _store$getState16$edg === void 0 ? [] : _store$getState16$edg,
      transform = _store$getState16.transform;
    var _transform = _slicedToArray(transform, 3),
      x = _transform[0],
      y = _transform[1],
      zoom = _transform[2];
    return {
      nodes: getNodes().map(function (n) {
        return _objectSpread({}, n);
      }),
      edges: edges.map(function (e) {
        return _objectSpread({}, e);
      }),
      viewport: {
        x: x,
        y: y,
        zoom: zoom
      }
    };
  }, []);
  var deleteElements = (0,react.useCallback)(function (_ref47) {
    var nodesDeleted = _ref47.nodes,
      edgesDeleted = _ref47.edges;
    var _store$getState17 = store.getState(),
      nodeInternals = _store$getState17.nodeInternals,
      getNodes = _store$getState17.getNodes,
      edges = _store$getState17.edges,
      hasDefaultNodes = _store$getState17.hasDefaultNodes,
      hasDefaultEdges = _store$getState17.hasDefaultEdges,
      onNodesDelete = _store$getState17.onNodesDelete,
      onEdgesDelete = _store$getState17.onEdgesDelete,
      onNodesChange = _store$getState17.onNodesChange,
      onEdgesChange = _store$getState17.onEdgesChange;
    var nodeIds = (nodesDeleted || []).map(function (node) {
      return node.id;
    });
    var edgeIds = (edgesDeleted || []).map(function (edge) {
      return edge.id;
    });
    var nodesToRemove = getNodes().reduce(function (res, node) {
      var parentHit = !nodeIds.includes(node.id) && node.parentNode && res.find(function (n) {
        return n.id === node.parentNode;
      });
      var deletable = typeof node.deletable === 'boolean' ? node.deletable : true;
      if (deletable && (nodeIds.includes(node.id) || parentHit)) {
        res.push(node);
      }
      return res;
    }, []);
    var deletableEdges = edges.filter(function (e) {
      return typeof e.deletable === 'boolean' ? e.deletable : true;
    });
    var initialHitEdges = deletableEdges.filter(function (e) {
      return edgeIds.includes(e.id);
    });
    if (nodesToRemove || initialHitEdges) {
      var connectedEdges = getConnectedEdges(nodesToRemove, deletableEdges);
      var edgesToRemove = [].concat(_toConsumableArray(initialHitEdges), _toConsumableArray(connectedEdges));
      var edgeIdsToRemove = edgesToRemove.reduce(function (res, edge) {
        if (!res.includes(edge.id)) {
          res.push(edge.id);
        }
        return res;
      }, []);
      if (hasDefaultEdges || hasDefaultNodes) {
        if (hasDefaultEdges) {
          store.setState({
            edges: edges.filter(function (e) {
              return !edgeIdsToRemove.includes(e.id);
            })
          });
        }
        if (hasDefaultNodes) {
          nodesToRemove.forEach(function (node) {
            nodeInternals.delete(node.id);
          });
          store.setState({
            nodeInternals: new Map(nodeInternals)
          });
        }
      }
      if (edgeIdsToRemove.length > 0) {
        onEdgesDelete === null || onEdgesDelete === void 0 || onEdgesDelete(edgesToRemove);
        if (onEdgesChange) {
          onEdgesChange(edgeIdsToRemove.map(function (id) {
            return {
              id: id,
              type: 'remove'
            };
          }));
        }
      }
      if (nodesToRemove.length > 0) {
        onNodesDelete === null || onNodesDelete === void 0 || onNodesDelete(nodesToRemove);
        if (onNodesChange) {
          var nodeChanges = nodesToRemove.map(function (n) {
            return {
              id: n.id,
              type: 'remove'
            };
          });
          onNodesChange(nodeChanges);
        }
      }
    }
  }, []);
  var getNodeRect = (0,react.useCallback)(function (nodeOrRect) {
    var isRect = isRectObject(nodeOrRect);
    var node = isRect ? null : store.getState().nodeInternals.get(nodeOrRect.id);
    if (!isRect && !node) {
      return [null, null, isRect];
    }
    var nodeRect = isRect ? nodeOrRect : nodeToRect(node);
    return [nodeRect, node, isRect];
  }, []);
  var getIntersectingNodes = (0,react.useCallback)(function (nodeOrRect) {
    var partially = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    var nodes = arguments.length > 2 ? arguments[2] : undefined;
    var _getNodeRect = getNodeRect(nodeOrRect),
      _getNodeRect2 = _slicedToArray(_getNodeRect, 3),
      nodeRect = _getNodeRect2[0],
      node = _getNodeRect2[1],
      isRect = _getNodeRect2[2];
    if (!nodeRect) {
      return [];
    }
    return (nodes || store.getState().getNodes()).filter(function (n) {
      if (!isRect && (n.id === node.id || !n.positionAbsolute)) {
        return false;
      }
      var currNodeRect = nodeToRect(n);
      var overlappingArea = getOverlappingArea(currNodeRect, nodeRect);
      var partiallyVisible = partially && overlappingArea > 0;
      return partiallyVisible || overlappingArea >= nodeRect.width * nodeRect.height;
    });
  }, []);
  var isNodeIntersecting = (0,react.useCallback)(function (nodeOrRect, area) {
    var partially = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    var _getNodeRect3 = getNodeRect(nodeOrRect),
      _getNodeRect4 = _slicedToArray(_getNodeRect3, 1),
      nodeRect = _getNodeRect4[0];
    if (!nodeRect) {
      return false;
    }
    var overlappingArea = getOverlappingArea(nodeRect, area);
    var partiallyVisible = partially && overlappingArea > 0;
    return partiallyVisible || overlappingArea >= nodeRect.width * nodeRect.height;
  }, []);
  return (0,react.useMemo)(function () {
    return _objectSpread(_objectSpread({}, viewportHelper), {}, {
      getNodes: getNodes,
      getNode: getNode,
      getEdges: getEdges,
      getEdge: getEdge,
      setNodes: setNodes,
      setEdges: setEdges,
      addNodes: addNodes,
      addEdges: addEdges,
      toObject: toObject,
      deleteElements: deleteElements,
      getIntersectingNodes: getIntersectingNodes,
      isNodeIntersecting: isNodeIntersecting
    });
  }, [viewportHelper, getNodes, getNode, getEdges, getEdge, setNodes, setEdges, addNodes, addEdges, toObject, deleteElements, getIntersectingNodes, isNodeIntersecting]);
}
var deleteKeyOptions = {
  actInsideInputWithModifier: false
};
var useGlobalKeyHandler = function useGlobalKeyHandler(_ref48) {
  var deleteKeyCode = _ref48.deleteKeyCode,
    multiSelectionKeyCode = _ref48.multiSelectionKeyCode;
  var store = useStoreApi();
  var _useReactFlow = useReactFlow(),
    deleteElements = _useReactFlow.deleteElements;
  var deleteKeyPressed = useKeyPress(deleteKeyCode, deleteKeyOptions);
  var multiSelectionKeyPressed = useKeyPress(multiSelectionKeyCode);
  (0,react.useEffect)(function () {
    if (deleteKeyPressed) {
      var _store$getState18 = store.getState(),
        edges = _store$getState18.edges,
        getNodes = _store$getState18.getNodes;
      var selectedNodes = getNodes().filter(function (node) {
        return node.selected;
      });
      var selectedEdges = edges.filter(function (edge) {
        return edge.selected;
      });
      deleteElements({
        nodes: selectedNodes,
        edges: selectedEdges
      });
      store.setState({
        nodesSelectionActive: false
      });
    }
  }, [deleteKeyPressed]);
  (0,react.useEffect)(function () {
    store.setState({
      multiSelectionActive: multiSelectionKeyPressed
    });
  }, [multiSelectionKeyPressed]);
};
function useResizeHandler(rendererNode) {
  var store = useStoreApi();
  (0,react.useEffect)(function () {
    var resizeObserver;
    var updateDimensions = function updateDimensions() {
      if (!rendererNode.current) {
        return;
      }
      var size = getDimensions(rendererNode.current);
      if (size.height === 0 || size.width === 0) {
        var _store$getState$onErr2, _store$getState19;
        (_store$getState$onErr2 = (_store$getState19 = store.getState()).onError) === null || _store$getState$onErr2 === void 0 || _store$getState$onErr2.call(_store$getState19, '004', errorMessages['error004']());
      }
      store.setState({
        width: size.width || 500,
        height: size.height || 500
      });
    };
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    if (rendererNode.current) {
      resizeObserver = new ResizeObserver(function () {
        return updateDimensions();
      });
      resizeObserver.observe(rendererNode.current);
    }
    return function () {
      window.removeEventListener('resize', updateDimensions);
      if (resizeObserver && rendererNode.current) {
        resizeObserver.unobserve(rendererNode.current);
      }
    };
  }, []);
}
var containerStyle = {
  position: 'absolute',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0
};

/* eslint-disable @typescript-eslint/ban-ts-comment */
var viewChanged = function viewChanged(prevViewport, eventTransform) {
  return prevViewport.x !== eventTransform.x || prevViewport.y !== eventTransform.y || prevViewport.zoom !== eventTransform.k;
};
var eventToFlowTransform = function eventToFlowTransform(eventTransform) {
  return {
    x: eventTransform.x,
    y: eventTransform.y,
    zoom: eventTransform.k
  };
};
var isWrappedWithClass = function isWrappedWithClass(event, className) {
  return event.target.closest(".".concat(className));
};
var isRightClickPan = function isRightClickPan(panOnDrag, usedButton) {
  return usedButton === 2 && Array.isArray(panOnDrag) && panOnDrag.includes(2);
};
var wheelDelta = function wheelDelta(event) {
  var factor = event.ctrlKey && isMacOs() ? 10 : 1;
  return -event.deltaY * (event.deltaMode === 1 ? 0.05 : event.deltaMode ? 1 : 0.002) * factor;
};
var selector$a = function selector$a(s) {
  return {
    d3Zoom: s.d3Zoom,
    d3Selection: s.d3Selection,
    d3ZoomHandler: s.d3ZoomHandler,
    userSelectionActive: s.userSelectionActive
  };
};
var ZoomPane = function ZoomPane(_ref49) {
  var onMove = _ref49.onMove,
    onMoveStart = _ref49.onMoveStart,
    onMoveEnd = _ref49.onMoveEnd,
    onPaneContextMenu = _ref49.onPaneContextMenu,
    _ref49$zoomOnScroll = _ref49.zoomOnScroll,
    zoomOnScroll = _ref49$zoomOnScroll === void 0 ? true : _ref49$zoomOnScroll,
    _ref49$zoomOnPinch = _ref49.zoomOnPinch,
    zoomOnPinch = _ref49$zoomOnPinch === void 0 ? true : _ref49$zoomOnPinch,
    _ref49$panOnScroll = _ref49.panOnScroll,
    panOnScroll = _ref49$panOnScroll === void 0 ? false : _ref49$panOnScroll,
    _ref49$panOnScrollSpe = _ref49.panOnScrollSpeed,
    panOnScrollSpeed = _ref49$panOnScrollSpe === void 0 ? 0.5 : _ref49$panOnScrollSpe,
    _ref49$panOnScrollMod = _ref49.panOnScrollMode,
    panOnScrollMode = _ref49$panOnScrollMod === void 0 ? PanOnScrollMode.Free : _ref49$panOnScrollMod,
    _ref49$zoomOnDoubleCl = _ref49.zoomOnDoubleClick,
    zoomOnDoubleClick = _ref49$zoomOnDoubleCl === void 0 ? true : _ref49$zoomOnDoubleCl,
    elementsSelectable = _ref49.elementsSelectable,
    _ref49$panOnDrag = _ref49.panOnDrag,
    panOnDrag = _ref49$panOnDrag === void 0 ? true : _ref49$panOnDrag,
    defaultViewport = _ref49.defaultViewport,
    translateExtent = _ref49.translateExtent,
    minZoom = _ref49.minZoom,
    maxZoom = _ref49.maxZoom,
    zoomActivationKeyCode = _ref49.zoomActivationKeyCode,
    _ref49$preventScrolli = _ref49.preventScrolling,
    preventScrolling = _ref49$preventScrolli === void 0 ? true : _ref49$preventScrolli,
    children = _ref49.children,
    noWheelClassName = _ref49.noWheelClassName,
    noPanClassName = _ref49.noPanClassName;
  var timerId = (0,react.useRef)();
  var store = useStoreApi();
  var isZoomingOrPanning = (0,react.useRef)(false);
  var zoomedWithRightMouseButton = (0,react.useRef)(false);
  var zoomPane = (0,react.useRef)(null);
  var prevTransform = (0,react.useRef)({
    x: 0,
    y: 0,
    zoom: 0
  });
  var _useStore6 = useStore(selector$a, esm_shallow/* shallow */.x),
    d3Zoom = _useStore6.d3Zoom,
    d3Selection = _useStore6.d3Selection,
    d3ZoomHandler = _useStore6.d3ZoomHandler,
    userSelectionActive = _useStore6.userSelectionActive;
  var zoomActivationKeyPressed = useKeyPress(zoomActivationKeyCode);
  var mouseButton = (0,react.useRef)(0);
  var isPanScrolling = (0,react.useRef)(false);
  var panScrollTimeout = (0,react.useRef)();
  useResizeHandler(zoomPane);
  (0,react.useEffect)(function () {
    if (zoomPane.current) {
      var bbox = zoomPane.current.getBoundingClientRect();
      var d3ZoomInstance = (0,src/* zoom */.s_)().scaleExtent([minZoom, maxZoom]).translateExtent(translateExtent);
      var selection = (0,src_select/* default */.A)(zoomPane.current).call(d3ZoomInstance);
      var updatedTransform = src/* zoomIdentity */.GS.translate(defaultViewport.x, defaultViewport.y).scale(clamp(defaultViewport.zoom, minZoom, maxZoom));
      var extent = [[0, 0], [bbox.width, bbox.height]];
      var constrainedTransform = d3ZoomInstance.constrain()(updatedTransform, extent, translateExtent);
      d3ZoomInstance.transform(selection, constrainedTransform);
      d3ZoomInstance.wheelDelta(wheelDelta);
      store.setState({
        d3Zoom: d3ZoomInstance,
        d3Selection: selection,
        d3ZoomHandler: selection.on('wheel.zoom'),
        // we need to pass transform because zoom handler is not registered when we set the initial transform
        transform: [constrainedTransform.x, constrainedTransform.y, constrainedTransform.k],
        domNode: zoomPane.current.closest('.react-flow')
      });
    }
  }, []);
  (0,react.useEffect)(function () {
    if (d3Selection && d3Zoom) {
      if (panOnScroll && !zoomActivationKeyPressed && !userSelectionActive) {
        d3Selection.on('wheel.zoom', function (event) {
          if (isWrappedWithClass(event, noWheelClassName)) {
            return false;
          }
          event.preventDefault();
          event.stopImmediatePropagation();
          var currentZoom = d3Selection.property('__zoom').k || 1;
          var _isMacOs = isMacOs();
          // macos sets ctrlKey=true for pinch gesture on a trackpad
          if (event.ctrlKey && zoomOnPinch && _isMacOs) {
            var point = (0,pointer/* default */.A)(event);
            var pinchDelta = wheelDelta(event);
            var _zoom2 = currentZoom * Math.pow(2, pinchDelta);
            // @ts-ignore
            d3Zoom.scaleTo(d3Selection, _zoom2, point, event);
            return;
          }
          // increase scroll speed in firefox
          // firefox: deltaMode === 1; chrome: deltaMode === 0
          var deltaNormalize = event.deltaMode === 1 ? 20 : 1;
          var deltaX = panOnScrollMode === PanOnScrollMode.Vertical ? 0 : event.deltaX * deltaNormalize;
          var deltaY = panOnScrollMode === PanOnScrollMode.Horizontal ? 0 : event.deltaY * deltaNormalize;
          // this enables vertical scrolling with shift + scroll on windows
          if (!_isMacOs && event.shiftKey && panOnScrollMode !== PanOnScrollMode.Vertical) {
            deltaX = event.deltaY * deltaNormalize;
            deltaY = 0;
          }
          d3Zoom.translateBy(d3Selection, -(deltaX / currentZoom) * panOnScrollSpeed, -(deltaY / currentZoom) * panOnScrollSpeed,
          // @ts-ignore
          {
            internal: true
          });
          var nextViewport = eventToFlowTransform(d3Selection.property('__zoom'));
          var _store$getState20 = store.getState(),
            onViewportChangeStart = _store$getState20.onViewportChangeStart,
            onViewportChange = _store$getState20.onViewportChange,
            onViewportChangeEnd = _store$getState20.onViewportChangeEnd;
          clearTimeout(panScrollTimeout.current);
          // for pan on scroll we need to handle the event calls on our own
          // we can't use the start, zoom and end events from d3-zoom
          // because start and move gets called on every scroll event and not once at the beginning
          if (!isPanScrolling.current) {
            isPanScrolling.current = true;
            onMoveStart === null || onMoveStart === void 0 || onMoveStart(event, nextViewport);
            onViewportChangeStart === null || onViewportChangeStart === void 0 || onViewportChangeStart(nextViewport);
          }
          if (isPanScrolling.current) {
            onMove === null || onMove === void 0 || onMove(event, nextViewport);
            onViewportChange === null || onViewportChange === void 0 || onViewportChange(nextViewport);
            panScrollTimeout.current = setTimeout(function () {
              onMoveEnd === null || onMoveEnd === void 0 || onMoveEnd(event, nextViewport);
              onViewportChangeEnd === null || onViewportChangeEnd === void 0 || onViewportChangeEnd(nextViewport);
              isPanScrolling.current = false;
            }, 150);
          }
        }, {
          passive: false
        });
      } else if (typeof d3ZoomHandler !== 'undefined') {
        d3Selection.on('wheel.zoom', function (event, d) {
          if (!preventScrolling || isWrappedWithClass(event, noWheelClassName)) {
            return null;
          }
          event.preventDefault();
          d3ZoomHandler.call(this, event, d);
        }, {
          passive: false
        });
      }
    }
  }, [userSelectionActive, panOnScroll, panOnScrollMode, d3Selection, d3Zoom, d3ZoomHandler, zoomActivationKeyPressed, zoomOnPinch, preventScrolling, noWheelClassName, onMoveStart, onMove, onMoveEnd]);
  (0,react.useEffect)(function () {
    if (d3Zoom) {
      d3Zoom.on('start', function (event) {
        var _event$sourceEvent, _event$sourceEvent2;
        if (!event.sourceEvent || event.sourceEvent.internal) {
          return null;
        }
        // we need to remember it here, because it's always 0 in the "zoom" event
        mouseButton.current = (_event$sourceEvent = event.sourceEvent) === null || _event$sourceEvent === void 0 ? void 0 : _event$sourceEvent.button;
        var _store$getState21 = store.getState(),
          onViewportChangeStart = _store$getState21.onViewportChangeStart;
        var flowTransform = eventToFlowTransform(event.transform);
        isZoomingOrPanning.current = true;
        prevTransform.current = flowTransform;
        if (((_event$sourceEvent2 = event.sourceEvent) === null || _event$sourceEvent2 === void 0 ? void 0 : _event$sourceEvent2.type) === 'mousedown') {
          store.setState({
            paneDragging: true
          });
        }
        onViewportChangeStart === null || onViewportChangeStart === void 0 || onViewportChangeStart(flowTransform);
        onMoveStart === null || onMoveStart === void 0 || onMoveStart(event.sourceEvent, flowTransform);
      });
    }
  }, [d3Zoom, onMoveStart]);
  (0,react.useEffect)(function () {
    if (d3Zoom) {
      if (userSelectionActive && !isZoomingOrPanning.current) {
        d3Zoom.on('zoom', null);
      } else if (!userSelectionActive) {
        d3Zoom.on('zoom', function (event) {
          var _mouseButton$current, _event$sourceEvent3;
          var _store$getState22 = store.getState(),
            onViewportChange = _store$getState22.onViewportChange;
          store.setState({
            transform: [event.transform.x, event.transform.y, event.transform.k]
          });
          zoomedWithRightMouseButton.current = !!(onPaneContextMenu && isRightClickPan(panOnDrag, (_mouseButton$current = mouseButton.current) !== null && _mouseButton$current !== void 0 ? _mouseButton$current : 0));
          if ((onMove || onViewportChange) && !((_event$sourceEvent3 = event.sourceEvent) !== null && _event$sourceEvent3 !== void 0 && _event$sourceEvent3.internal)) {
            var flowTransform = eventToFlowTransform(event.transform);
            onViewportChange === null || onViewportChange === void 0 || onViewportChange(flowTransform);
            onMove === null || onMove === void 0 || onMove(event.sourceEvent, flowTransform);
          }
        });
      }
    }
  }, [userSelectionActive, d3Zoom, onMove, panOnDrag, onPaneContextMenu]);
  (0,react.useEffect)(function () {
    if (d3Zoom) {
      d3Zoom.on('end', function (event) {
        var _mouseButton$current2;
        if (!event.sourceEvent || event.sourceEvent.internal) {
          return null;
        }
        var _store$getState23 = store.getState(),
          onViewportChangeEnd = _store$getState23.onViewportChangeEnd;
        isZoomingOrPanning.current = false;
        store.setState({
          paneDragging: false
        });
        if (onPaneContextMenu && isRightClickPan(panOnDrag, (_mouseButton$current2 = mouseButton.current) !== null && _mouseButton$current2 !== void 0 ? _mouseButton$current2 : 0) && !zoomedWithRightMouseButton.current) {
          onPaneContextMenu(event.sourceEvent);
        }
        zoomedWithRightMouseButton.current = false;
        if ((onMoveEnd || onViewportChangeEnd) && viewChanged(prevTransform.current, event.transform)) {
          var flowTransform = eventToFlowTransform(event.transform);
          prevTransform.current = flowTransform;
          clearTimeout(timerId.current);
          timerId.current = setTimeout(function () {
            onViewportChangeEnd === null || onViewportChangeEnd === void 0 || onViewportChangeEnd(flowTransform);
            onMoveEnd === null || onMoveEnd === void 0 || onMoveEnd(event.sourceEvent, flowTransform);
          }, panOnScroll ? 150 : 0);
        }
      });
    }
  }, [d3Zoom, panOnScroll, panOnDrag, onMoveEnd, onPaneContextMenu]);
  (0,react.useEffect)(function () {
    if (d3Zoom) {
      d3Zoom.filter(function (event) {
        var zoomScroll = zoomActivationKeyPressed || zoomOnScroll;
        var pinchZoom = zoomOnPinch && event.ctrlKey;
        if ((panOnDrag === true || Array.isArray(panOnDrag) && panOnDrag.includes(1)) && event.button === 1 && event.type === 'mousedown' && (isWrappedWithClass(event, 'react-flow__node') || isWrappedWithClass(event, 'react-flow__edge'))) {
          return true;
        }
        // if all interactions are disabled, we prevent all zoom events
        if (!panOnDrag && !zoomScroll && !panOnScroll && !zoomOnDoubleClick && !zoomOnPinch) {
          return false;
        }
        // during a selection we prevent all other interactions
        if (userSelectionActive) {
          return false;
        }
        // if zoom on double click is disabled, we prevent the double click event
        if (!zoomOnDoubleClick && event.type === 'dblclick') {
          return false;
        }
        // if the target element is inside an element with the nowheel class, we prevent zooming
        if (isWrappedWithClass(event, noWheelClassName) && event.type === 'wheel') {
          return false;
        }
        // if the target element is inside an element with the nopan class, we prevent panning
        if (isWrappedWithClass(event, noPanClassName) && (event.type !== 'wheel' || panOnScroll && event.type === 'wheel' && !zoomActivationKeyPressed)) {
          return false;
        }
        if (!zoomOnPinch && event.ctrlKey && event.type === 'wheel') {
          return false;
        }
        // when there is no scroll handling enabled, we prevent all wheel events
        if (!zoomScroll && !panOnScroll && !pinchZoom && event.type === 'wheel') {
          return false;
        }
        // if the pane is not movable, we prevent dragging it with mousestart or touchstart
        if (!panOnDrag && (event.type === 'mousedown' || event.type === 'touchstart')) {
          return false;
        }
        // if the pane is only movable using allowed clicks
        if (Array.isArray(panOnDrag) && !panOnDrag.includes(event.button) && (event.type === 'mousedown' || event.type === 'touchstart')) {
          return false;
        }
        // We only allow right clicks if pan on drag is set to right click
        var buttonAllowed = Array.isArray(panOnDrag) && panOnDrag.includes(event.button) || !event.button || event.button <= 1;
        // default filter for d3-zoom
        return (!event.ctrlKey || event.type === 'wheel') && buttonAllowed;
      });
    }
  }, [userSelectionActive, d3Zoom, zoomOnScroll, zoomOnPinch, panOnScroll, zoomOnDoubleClick, panOnDrag, elementsSelectable, zoomActivationKeyPressed]);
  return /*#__PURE__*/react.createElement("div", {
    className: "react-flow__renderer",
    ref: zoomPane,
    style: containerStyle
  }, children);
};
var selector$9 = function selector$9(s) {
  return {
    userSelectionActive: s.userSelectionActive,
    userSelectionRect: s.userSelectionRect
  };
};
function UserSelection() {
  var _useStore7 = useStore(selector$9, esm_shallow/* shallow */.x),
    userSelectionActive = _useStore7.userSelectionActive,
    userSelectionRect = _useStore7.userSelectionRect;
  var isActive = userSelectionActive && userSelectionRect;
  if (!isActive) {
    return null;
  }
  return /*#__PURE__*/react.createElement("div", {
    className: "react-flow__selection react-flow__container",
    style: {
      width: userSelectionRect.width,
      height: userSelectionRect.height,
      transform: "translate(".concat(userSelectionRect.x, "px, ").concat(userSelectionRect.y, "px)")
    }
  });
}
function handleParentExpand(res, updateItem) {
  var parent = res.find(function (e) {
    return e.id === updateItem.parentNode;
  });
  if (parent) {
    var extendWidth = updateItem.position.x + updateItem.width - parent.width;
    var extendHeight = updateItem.position.y + updateItem.height - parent.height;
    if (extendWidth > 0 || extendHeight > 0 || updateItem.position.x < 0 || updateItem.position.y < 0) {
      var _parent$style$width, _parent$style$height;
      parent.style = _objectSpread({}, parent.style) || {};
      parent.style.width = (_parent$style$width = parent.style.width) !== null && _parent$style$width !== void 0 ? _parent$style$width : parent.width;
      parent.style.height = (_parent$style$height = parent.style.height) !== null && _parent$style$height !== void 0 ? _parent$style$height : parent.height;
      if (extendWidth > 0) {
        parent.style.width += extendWidth;
      }
      if (extendHeight > 0) {
        parent.style.height += extendHeight;
      }
      if (updateItem.position.x < 0) {
        var xDiff = Math.abs(updateItem.position.x);
        parent.position.x = parent.position.x - xDiff;
        parent.style.width += xDiff;
        updateItem.position.x = 0;
      }
      if (updateItem.position.y < 0) {
        var yDiff = Math.abs(updateItem.position.y);
        parent.position.y = parent.position.y - yDiff;
        parent.style.height += yDiff;
        updateItem.position.y = 0;
      }
      parent.width = parent.style.width;
      parent.height = parent.style.height;
    }
  }
}
function applyChanges(changes, elements) {
  // we need this hack to handle the setNodes and setEdges function of the useReactFlow hook for controlled flows
  if (changes.some(function (c) {
    return c.type === 'reset';
  })) {
    return changes.filter(function (c) {
      return c.type === 'reset';
    }).map(function (c) {
      return c.item;
    });
  }
  var initElements = changes.filter(function (c) {
    return c.type === 'add';
  }).map(function (c) {
    return c.item;
  });
  return elements.reduce(function (res, item) {
    var currentChanges = changes.filter(function (c) {
      return c.id === item.id;
    });
    if (currentChanges.length === 0) {
      res.push(item);
      return res;
    }
    var updateItem = _objectSpread({}, item);
    var _iterator = _createForOfIteratorHelper(currentChanges),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var currentChange = _step.value;
        if (currentChange) {
          switch (currentChange.type) {
            case 'select':
              {
                updateItem.selected = currentChange.selected;
                break;
              }
            case 'position':
              {
                if (typeof currentChange.position !== 'undefined') {
                  updateItem.position = currentChange.position;
                }
                if (typeof currentChange.positionAbsolute !== 'undefined') {
                  updateItem.positionAbsolute = currentChange.positionAbsolute;
                }
                if (typeof currentChange.dragging !== 'undefined') {
                  updateItem.dragging = currentChange.dragging;
                }
                if (updateItem.expandParent) {
                  handleParentExpand(res, updateItem);
                }
                break;
              }
            case 'dimensions':
              {
                if (typeof currentChange.dimensions !== 'undefined') {
                  updateItem.width = currentChange.dimensions.width;
                  updateItem.height = currentChange.dimensions.height;
                }
                if (typeof currentChange.updateStyle !== 'undefined') {
                  updateItem.style = _objectSpread(_objectSpread({}, updateItem.style || {}), currentChange.dimensions);
                }
                if (typeof currentChange.resizing === 'boolean') {
                  updateItem.resizing = currentChange.resizing;
                }
                if (updateItem.expandParent) {
                  handleParentExpand(res, updateItem);
                }
                break;
              }
            case 'remove':
              {
                return res;
              }
          }
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    res.push(updateItem);
    return res;
  }, initElements);
}
function applyNodeChanges(changes, nodes) {
  return applyChanges(changes, nodes);
}
function applyEdgeChanges(changes, edges) {
  return applyChanges(changes, edges);
}
var createSelectionChange = function createSelectionChange(id, selected) {
  return {
    id: id,
    type: 'select',
    selected: selected
  };
};
function getSelectionChanges(items, selectedIds) {
  return items.reduce(function (res, item) {
    var willBeSelected = selectedIds.includes(item.id);
    if (!item.selected && willBeSelected) {
      item.selected = true;
      res.push(createSelectionChange(item.id, true));
    } else if (item.selected && !willBeSelected) {
      item.selected = false;
      res.push(createSelectionChange(item.id, false));
    }
    return res;
  }, []);
}

/**
 * The user selection rectangle gets displayed when a user drags the mouse while pressing shift
 */
var wrapHandler = function wrapHandler(handler, containerRef) {
  return function (event) {
    if (event.target !== containerRef.current) {
      return;
    }
    handler === null || handler === void 0 || handler(event);
  };
};
var selector$8 = function selector$8(s) {
  return {
    userSelectionActive: s.userSelectionActive,
    elementsSelectable: s.elementsSelectable,
    dragging: s.paneDragging
  };
};
var Pane = /*#__PURE__*/(0,react.memo)(function (_ref50) {
  var isSelecting = _ref50.isSelecting,
    _ref50$selectionMode = _ref50.selectionMode,
    selectionMode = _ref50$selectionMode === void 0 ? SelectionMode.Full : _ref50$selectionMode,
    panOnDrag = _ref50.panOnDrag,
    onSelectionStart = _ref50.onSelectionStart,
    onSelectionEnd = _ref50.onSelectionEnd,
    onPaneClick = _ref50.onPaneClick,
    onPaneContextMenu = _ref50.onPaneContextMenu,
    onPaneScroll = _ref50.onPaneScroll,
    onPaneMouseEnter = _ref50.onPaneMouseEnter,
    onPaneMouseMove = _ref50.onPaneMouseMove,
    onPaneMouseLeave = _ref50.onPaneMouseLeave,
    children = _ref50.children;
  var container = (0,react.useRef)(null);
  var store = useStoreApi();
  var prevSelectedNodesCount = (0,react.useRef)(0);
  var prevSelectedEdgesCount = (0,react.useRef)(0);
  var containerBounds = (0,react.useRef)();
  var _useStore8 = useStore(selector$8, esm_shallow/* shallow */.x),
    userSelectionActive = _useStore8.userSelectionActive,
    elementsSelectable = _useStore8.elementsSelectable,
    dragging = _useStore8.dragging;
  var resetUserSelection = function resetUserSelection() {
    store.setState({
      userSelectionActive: false,
      userSelectionRect: null
    });
    prevSelectedNodesCount.current = 0;
    prevSelectedEdgesCount.current = 0;
  };
  var onClick = function onClick(event) {
    onPaneClick === null || onPaneClick === void 0 || onPaneClick(event);
    store.getState().resetSelectedElements();
    store.setState({
      nodesSelectionActive: false
    });
  };
  var onContextMenu = function onContextMenu(event) {
    if (Array.isArray(panOnDrag) && panOnDrag !== null && panOnDrag !== void 0 && panOnDrag.includes(2)) {
      event.preventDefault();
      return;
    }
    onPaneContextMenu === null || onPaneContextMenu === void 0 || onPaneContextMenu(event);
  };
  var onWheel = onPaneScroll ? function (event) {
    return onPaneScroll(event);
  } : undefined;
  var onMouseDown = function onMouseDown(event) {
    var _store$getState24 = store.getState(),
      resetSelectedElements = _store$getState24.resetSelectedElements,
      domNode = _store$getState24.domNode;
    containerBounds.current = domNode === null || domNode === void 0 ? void 0 : domNode.getBoundingClientRect();
    if (!elementsSelectable || !isSelecting || event.button !== 0 || event.target !== container.current || !containerBounds.current) {
      return;
    }
    var _getEventPosition3 = getEventPosition(event, containerBounds.current),
      x = _getEventPosition3.x,
      y = _getEventPosition3.y;
    resetSelectedElements();
    store.setState({
      userSelectionRect: {
        width: 0,
        height: 0,
        startX: x,
        startY: y,
        x: x,
        y: y
      }
    });
    onSelectionStart === null || onSelectionStart === void 0 || onSelectionStart(event);
  };
  var onMouseMove = function onMouseMove(event) {
    var _userSelectionRect$st, _userSelectionRect$st2;
    var _store$getState25 = store.getState(),
      userSelectionRect = _store$getState25.userSelectionRect,
      nodeInternals = _store$getState25.nodeInternals,
      edges = _store$getState25.edges,
      transform = _store$getState25.transform,
      onNodesChange = _store$getState25.onNodesChange,
      onEdgesChange = _store$getState25.onEdgesChange,
      nodeOrigin = _store$getState25.nodeOrigin,
      getNodes = _store$getState25.getNodes;
    if (!isSelecting || !containerBounds.current || !userSelectionRect) {
      return;
    }
    store.setState({
      userSelectionActive: true,
      nodesSelectionActive: false
    });
    var mousePos = getEventPosition(event, containerBounds.current);
    var startX = (_userSelectionRect$st = userSelectionRect.startX) !== null && _userSelectionRect$st !== void 0 ? _userSelectionRect$st : 0;
    var startY = (_userSelectionRect$st2 = userSelectionRect.startY) !== null && _userSelectionRect$st2 !== void 0 ? _userSelectionRect$st2 : 0;
    var nextUserSelectRect = _objectSpread(_objectSpread({}, userSelectionRect), {}, {
      x: mousePos.x < startX ? mousePos.x : startX,
      y: mousePos.y < startY ? mousePos.y : startY,
      width: Math.abs(mousePos.x - startX),
      height: Math.abs(mousePos.y - startY)
    });
    var nodes = getNodes();
    var selectedNodes = getNodesInside(nodeInternals, nextUserSelectRect, transform, selectionMode === SelectionMode.Partial, true, nodeOrigin);
    var selectedEdgeIds = getConnectedEdges(selectedNodes, edges).map(function (e) {
      return e.id;
    });
    var selectedNodeIds = selectedNodes.map(function (n) {
      return n.id;
    });
    if (prevSelectedNodesCount.current !== selectedNodeIds.length) {
      prevSelectedNodesCount.current = selectedNodeIds.length;
      var changes = getSelectionChanges(nodes, selectedNodeIds);
      if (changes.length) {
        onNodesChange === null || onNodesChange === void 0 || onNodesChange(changes);
      }
    }
    if (prevSelectedEdgesCount.current !== selectedEdgeIds.length) {
      prevSelectedEdgesCount.current = selectedEdgeIds.length;
      var _changes = getSelectionChanges(edges, selectedEdgeIds);
      if (_changes.length) {
        onEdgesChange === null || onEdgesChange === void 0 || onEdgesChange(_changes);
      }
    }
    store.setState({
      userSelectionRect: nextUserSelectRect
    });
  };
  var onMouseUp = function onMouseUp(event) {
    if (event.button !== 0) {
      return;
    }
    var _store$getState26 = store.getState(),
      userSelectionRect = _store$getState26.userSelectionRect;
    // We only want to trigger click functions when in selection mode if
    // the user did not move the mouse.
    if (!userSelectionActive && userSelectionRect && event.target === container.current) {
      onClick === null || onClick === void 0 || onClick(event);
    }
    store.setState({
      nodesSelectionActive: prevSelectedNodesCount.current > 0
    });
    resetUserSelection();
    onSelectionEnd === null || onSelectionEnd === void 0 || onSelectionEnd(event);
  };
  var onMouseLeave = function onMouseLeave(event) {
    if (userSelectionActive) {
      store.setState({
        nodesSelectionActive: prevSelectedNodesCount.current > 0
      });
      onSelectionEnd === null || onSelectionEnd === void 0 || onSelectionEnd(event);
    }
    resetUserSelection();
  };
  var hasActiveSelection = elementsSelectable && (isSelecting || userSelectionActive);
  return /*#__PURE__*/react.createElement("div", {
    className: (0,classcat/* default */.A)(['react-flow__pane', {
      dragging: dragging,
      selection: isSelecting
    }]),
    onClick: hasActiveSelection ? undefined : wrapHandler(onClick, container),
    onContextMenu: wrapHandler(onContextMenu, container),
    onWheel: wrapHandler(onWheel, container),
    onMouseEnter: hasActiveSelection ? undefined : onPaneMouseEnter,
    onMouseDown: hasActiveSelection ? onMouseDown : undefined,
    onMouseMove: hasActiveSelection ? onMouseMove : onPaneMouseMove,
    onMouseUp: hasActiveSelection ? onMouseUp : undefined,
    onMouseLeave: hasActiveSelection ? onMouseLeave : onPaneMouseLeave,
    ref: container,
    style: containerStyle
  }, children, /*#__PURE__*/react.createElement(UserSelection, null));
});
Pane.displayName = 'Pane';
function isParentSelected(node, nodeInternals) {
  if (!node.parentNode) {
    return false;
  }
  var parentNode = nodeInternals.get(node.parentNode);
  if (!parentNode) {
    return false;
  }
  if (parentNode.selected) {
    return true;
  }
  return isParentSelected(parentNode, nodeInternals);
}
function hasSelector(target, selector, nodeRef) {
  var current = target;
  do {
    var _current;
    if ((_current = current) !== null && _current !== void 0 && _current.matches(selector)) return true;
    if (current === nodeRef.current) return false;
    current = current.parentElement;
  } while (current);
  return false;
}
// looks for all selected nodes and created a NodeDragItem for each of them
function getDragItems(nodeInternals, nodesDraggable, mousePos, nodeId) {
  return Array.from(nodeInternals.values()).filter(function (n) {
    return (n.selected || n.id === nodeId) && (!n.parentNode || !isParentSelected(n, nodeInternals)) && (n.draggable || nodesDraggable && typeof n.draggable === 'undefined');
  }).map(function (n) {
    var _n$positionAbsolute$x, _n$positionAbsolute, _n$positionAbsolute$y, _n$positionAbsolute2;
    return {
      id: n.id,
      position: n.position || {
        x: 0,
        y: 0
      },
      positionAbsolute: n.positionAbsolute || {
        x: 0,
        y: 0
      },
      distance: {
        x: mousePos.x - ((_n$positionAbsolute$x = (_n$positionAbsolute = n.positionAbsolute) === null || _n$positionAbsolute === void 0 ? void 0 : _n$positionAbsolute.x) !== null && _n$positionAbsolute$x !== void 0 ? _n$positionAbsolute$x : 0),
        y: mousePos.y - ((_n$positionAbsolute$y = (_n$positionAbsolute2 = n.positionAbsolute) === null || _n$positionAbsolute2 === void 0 ? void 0 : _n$positionAbsolute2.y) !== null && _n$positionAbsolute$y !== void 0 ? _n$positionAbsolute$y : 0)
      },
      delta: {
        x: 0,
        y: 0
      },
      extent: n.extent,
      parentNode: n.parentNode,
      width: n.width,
      height: n.height,
      expandParent: n.expandParent
    };
  });
}
function clampNodeExtent(node, extent) {
  if (!extent || extent === 'parent') {
    return extent;
  }
  return [extent[0], [extent[1][0] - (node.width || 0), extent[1][1] - (node.height || 0)]];
}
function calcNextPosition(node, nextPosition, nodeInternals, nodeExtent) {
  var nodeOrigin = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : [0, 0];
  var onError = arguments.length > 5 ? arguments[5] : undefined;
  var clampedNodeExtent = clampNodeExtent(node, node.extent || nodeExtent);
  var currentExtent = clampedNodeExtent;
  if (node.extent === 'parent' && !node.expandParent) {
    if (node.parentNode && node.width && node.height) {
      var parent = nodeInternals.get(node.parentNode);
      var _getNodePositionWithO3 = getNodePositionWithOrigin(parent, nodeOrigin).positionAbsolute,
        parentX = _getNodePositionWithO3.x,
        parentY = _getNodePositionWithO3.y;
      currentExtent = parent && isNumeric(parentX) && isNumeric(parentY) && isNumeric(parent.width) && isNumeric(parent.height) ? [[parentX + node.width * nodeOrigin[0], parentY + node.height * nodeOrigin[1]], [parentX + parent.width - node.width + node.width * nodeOrigin[0], parentY + parent.height - node.height + node.height * nodeOrigin[1]]] : currentExtent;
    } else {
      onError === null || onError === void 0 || onError('005', errorMessages['error005']());
      currentExtent = clampedNodeExtent;
    }
  } else if (node.extent && node.parentNode && node.extent !== 'parent') {
    var _parent = nodeInternals.get(node.parentNode);
    var _getNodePositionWithO4 = getNodePositionWithOrigin(_parent, nodeOrigin).positionAbsolute,
      _parentX = _getNodePositionWithO4.x,
      _parentY = _getNodePositionWithO4.y;
    currentExtent = [[node.extent[0][0] + _parentX, node.extent[0][1] + _parentY], [node.extent[1][0] + _parentX, node.extent[1][1] + _parentY]];
  }
  var parentPosition = {
    x: 0,
    y: 0
  };
  if (node.parentNode) {
    var parentNode = nodeInternals.get(node.parentNode);
    parentPosition = getNodePositionWithOrigin(parentNode, nodeOrigin).positionAbsolute;
  }
  var positionAbsolute = currentExtent && currentExtent !== 'parent' ? clampPosition(nextPosition, currentExtent) : nextPosition;
  return {
    position: {
      x: positionAbsolute.x - parentPosition.x,
      y: positionAbsolute.y - parentPosition.y
    },
    positionAbsolute: positionAbsolute
  };
}
// returns two params:
// 1. the dragged node (or the first of the list, if we are dragging a node selection)
// 2. array of selected nodes (for multi selections)
function getEventHandlerParams(_ref51) {
  var nodeId = _ref51.nodeId,
    dragItems = _ref51.dragItems,
    nodeInternals = _ref51.nodeInternals;
  var extentedDragItems = dragItems.map(function (n) {
    var node = nodeInternals.get(n.id);
    return _objectSpread(_objectSpread({}, node), {}, {
      position: n.position,
      positionAbsolute: n.positionAbsolute
    });
  });
  return [nodeId ? extentedDragItems.find(function (n) {
    return n.id === nodeId;
  }) : extentedDragItems[0], extentedDragItems];
}
var getHandleBounds = function getHandleBounds(selector, nodeElement, zoom, nodeOrigin) {
  var handles = nodeElement.querySelectorAll(selector);
  if (!handles || !handles.length) {
    return null;
  }
  var handlesArray = Array.from(handles);
  var nodeBounds = nodeElement.getBoundingClientRect();
  var nodeOffset = {
    x: nodeBounds.width * nodeOrigin[0],
    y: nodeBounds.height * nodeOrigin[1]
  };
  return handlesArray.map(function (handle) {
    var handleBounds = handle.getBoundingClientRect();
    return _objectSpread({
      id: handle.getAttribute('data-handleid'),
      position: handle.getAttribute('data-handlepos'),
      x: (handleBounds.left - nodeBounds.left - nodeOffset.x) / zoom,
      y: (handleBounds.top - nodeBounds.top - nodeOffset.y) / zoom
    }, getDimensions(handle));
  });
};
function getMouseHandler(id, getState, handler) {
  return handler === undefined ? handler : function (event) {
    var node = getState().nodeInternals.get(id);
    if (node) {
      handler(event, _objectSpread({}, node));
    }
  };
}
// this handler is called by
// 1. the click handler when node is not draggable or selectNodesOnDrag = false
// or
// 2. the on drag start handler when node is draggable and selectNodesOnDrag = true
function handleNodeClick(_ref52) {
  var id = _ref52.id,
    store = _ref52.store,
    _ref52$unselect = _ref52.unselect,
    unselect = _ref52$unselect === void 0 ? false : _ref52$unselect,
    nodeRef = _ref52.nodeRef;
  var _store$getState27 = store.getState(),
    addSelectedNodes = _store$getState27.addSelectedNodes,
    unselectNodesAndEdges = _store$getState27.unselectNodesAndEdges,
    multiSelectionActive = _store$getState27.multiSelectionActive,
    nodeInternals = _store$getState27.nodeInternals,
    onError = _store$getState27.onError;
  var node = nodeInternals.get(id);
  if (!node) {
    onError === null || onError === void 0 || onError('012', errorMessages['error012'](id));
    return;
  }
  store.setState({
    nodesSelectionActive: false
  });
  if (!node.selected) {
    addSelectedNodes([id]);
  } else if (unselect || node.selected && multiSelectionActive) {
    unselectNodesAndEdges({
      nodes: [node],
      edges: []
    });
    requestAnimationFrame(function () {
      var _nodeRef$current;
      return nodeRef === null || nodeRef === void 0 || (_nodeRef$current = nodeRef.current) === null || _nodeRef$current === void 0 ? void 0 : _nodeRef$current.blur();
    });
  }
}
function useGetPointerPosition() {
  var store = useStoreApi();
  // returns the pointer position projected to the RF coordinate system
  var getPointerPosition = (0,react.useCallback)(function (_ref53) {
    var sourceEvent = _ref53.sourceEvent;
    var _store$getState28 = store.getState(),
      transform = _store$getState28.transform,
      snapGrid = _store$getState28.snapGrid,
      snapToGrid = _store$getState28.snapToGrid;
    var x = sourceEvent.touches ? sourceEvent.touches[0].clientX : sourceEvent.clientX;
    var y = sourceEvent.touches ? sourceEvent.touches[0].clientY : sourceEvent.clientY;
    var pointerPos = {
      x: (x - transform[0]) / transform[2],
      y: (y - transform[1]) / transform[2]
    };
    // we need the snapped position in order to be able to skip unnecessary drag events
    return _objectSpread({
      xSnapped: snapToGrid ? snapGrid[0] * Math.round(pointerPos.x / snapGrid[0]) : pointerPos.x,
      ySnapped: snapToGrid ? snapGrid[1] * Math.round(pointerPos.y / snapGrid[1]) : pointerPos.y
    }, pointerPos);
  }, []);
  return getPointerPosition;
}
function wrapSelectionDragFunc(selectionFunc) {
  return function (event, _, nodes) {
    return selectionFunc === null || selectionFunc === void 0 ? void 0 : selectionFunc(event, nodes);
  };
}
function useDrag(_ref54) {
  var nodeRef = _ref54.nodeRef,
    _ref54$disabled = _ref54.disabled,
    disabled = _ref54$disabled === void 0 ? false : _ref54$disabled,
    noDragClassName = _ref54.noDragClassName,
    handleSelector = _ref54.handleSelector,
    nodeId = _ref54.nodeId,
    isSelectable = _ref54.isSelectable,
    selectNodesOnDrag = _ref54.selectNodesOnDrag;
  var store = useStoreApi();
  var _useState5 = (0,react.useState)(false),
    _useState6 = _slicedToArray(_useState5, 2),
    dragging = _useState6[0],
    setDragging = _useState6[1];
  var dragItems = (0,react.useRef)([]);
  var lastPos = (0,react.useRef)({
    x: null,
    y: null
  });
  var autoPanId = (0,react.useRef)(0);
  var containerBounds = (0,react.useRef)(null);
  var mousePosition = (0,react.useRef)({
    x: 0,
    y: 0
  });
  var dragEvent = (0,react.useRef)(null);
  var autoPanStarted = (0,react.useRef)(false);
  var dragStarted = (0,react.useRef)(false);
  var getPointerPosition = useGetPointerPosition();
  (0,react.useEffect)(function () {
    if (nodeRef !== null && nodeRef !== void 0 && nodeRef.current) {
      var selection = (0,src_select/* default */.A)(nodeRef.current);
      var updateNodes = function updateNodes(_ref55) {
        var x = _ref55.x,
          y = _ref55.y;
        var _store$getState29 = store.getState(),
          nodeInternals = _store$getState29.nodeInternals,
          onNodeDrag = _store$getState29.onNodeDrag,
          onSelectionDrag = _store$getState29.onSelectionDrag,
          updateNodePositions = _store$getState29.updateNodePositions,
          nodeExtent = _store$getState29.nodeExtent,
          snapGrid = _store$getState29.snapGrid,
          snapToGrid = _store$getState29.snapToGrid,
          nodeOrigin = _store$getState29.nodeOrigin,
          onError = _store$getState29.onError;
        lastPos.current = {
          x: x,
          y: y
        };
        var hasChange = false;
        var nodesBox = {
          x: 0,
          y: 0,
          x2: 0,
          y2: 0
        };
        if (dragItems.current.length > 1 && nodeExtent) {
          var rect = getNodesBounds(dragItems.current, nodeOrigin);
          nodesBox = rectToBox(rect);
        }
        dragItems.current = dragItems.current.map(function (n) {
          var nextPosition = {
            x: x - n.distance.x,
            y: y - n.distance.y
          };
          if (snapToGrid) {
            nextPosition.x = snapGrid[0] * Math.round(nextPosition.x / snapGrid[0]);
            nextPosition.y = snapGrid[1] * Math.round(nextPosition.y / snapGrid[1]);
          }
          // if there is selection with multiple nodes and a node extent is set, we need to adjust the node extent for each node
          // based on its position so that the node stays at it's position relative to the selection.
          var adjustedNodeExtent = [[nodeExtent[0][0], nodeExtent[0][1]], [nodeExtent[1][0], nodeExtent[1][1]]];
          if (dragItems.current.length > 1 && nodeExtent && !n.extent) {
            var _n$width, _n$height;
            adjustedNodeExtent[0][0] = n.positionAbsolute.x - nodesBox.x + nodeExtent[0][0];
            adjustedNodeExtent[1][0] = n.positionAbsolute.x + ((_n$width = n.width) !== null && _n$width !== void 0 ? _n$width : 0) - nodesBox.x2 + nodeExtent[1][0];
            adjustedNodeExtent[0][1] = n.positionAbsolute.y - nodesBox.y + nodeExtent[0][1];
            adjustedNodeExtent[1][1] = n.positionAbsolute.y + ((_n$height = n.height) !== null && _n$height !== void 0 ? _n$height : 0) - nodesBox.y2 + nodeExtent[1][1];
          }
          var updatedPos = calcNextPosition(n, nextPosition, nodeInternals, adjustedNodeExtent, nodeOrigin, onError);
          // we want to make sure that we only fire a change event when there is a change
          hasChange = hasChange || n.position.x !== updatedPos.position.x || n.position.y !== updatedPos.position.y;
          n.position = updatedPos.position;
          n.positionAbsolute = updatedPos.positionAbsolute;
          return n;
        });
        if (!hasChange) {
          return;
        }
        updateNodePositions(dragItems.current, true, true);
        setDragging(true);
        var onDrag = nodeId ? onNodeDrag : wrapSelectionDragFunc(onSelectionDrag);
        if (onDrag && dragEvent.current) {
          var _getEventHandlerParam = getEventHandlerParams({
              nodeId: nodeId,
              dragItems: dragItems.current,
              nodeInternals: nodeInternals
            }),
            _getEventHandlerParam2 = _slicedToArray(_getEventHandlerParam, 2),
            currentNode = _getEventHandlerParam2[0],
            nodes = _getEventHandlerParam2[1];
          onDrag(dragEvent.current, currentNode, nodes);
        }
      };
      var autoPan = function autoPan() {
        if (!containerBounds.current) {
          return;
        }
        var _calcAutoPan3 = calcAutoPan(mousePosition.current, containerBounds.current),
          _calcAutoPan4 = _slicedToArray(_calcAutoPan3, 2),
          xMovement = _calcAutoPan4[0],
          yMovement = _calcAutoPan4[1];
        if (xMovement !== 0 || yMovement !== 0) {
          var _lastPos$current$x, _lastPos$current$y;
          var _store$getState30 = store.getState(),
            transform = _store$getState30.transform,
            panBy = _store$getState30.panBy;
          lastPos.current.x = ((_lastPos$current$x = lastPos.current.x) !== null && _lastPos$current$x !== void 0 ? _lastPos$current$x : 0) - xMovement / transform[2];
          lastPos.current.y = ((_lastPos$current$y = lastPos.current.y) !== null && _lastPos$current$y !== void 0 ? _lastPos$current$y : 0) - yMovement / transform[2];
          if (panBy({
            x: xMovement,
            y: yMovement
          })) {
            updateNodes(lastPos.current);
          }
        }
        autoPanId.current = requestAnimationFrame(autoPan);
      };
      var startDrag = function startDrag(event) {
        var _store$getState31 = store.getState(),
          nodeInternals = _store$getState31.nodeInternals,
          multiSelectionActive = _store$getState31.multiSelectionActive,
          nodesDraggable = _store$getState31.nodesDraggable,
          unselectNodesAndEdges = _store$getState31.unselectNodesAndEdges,
          onNodeDragStart = _store$getState31.onNodeDragStart,
          onSelectionDragStart = _store$getState31.onSelectionDragStart;
        dragStarted.current = true;
        var onStart = nodeId ? onNodeDragStart : wrapSelectionDragFunc(onSelectionDragStart);
        if ((!selectNodesOnDrag || !isSelectable) && !multiSelectionActive && nodeId) {
          var _nodeInternals$get;
          if (!((_nodeInternals$get = nodeInternals.get(nodeId)) !== null && _nodeInternals$get !== void 0 && _nodeInternals$get.selected)) {
            // we need to reset selected nodes when selectNodesOnDrag=false
            unselectNodesAndEdges();
          }
        }
        if (nodeId && isSelectable && selectNodesOnDrag) {
          handleNodeClick({
            id: nodeId,
            store: store,
            nodeRef: nodeRef
          });
        }
        var pointerPos = getPointerPosition(event);
        lastPos.current = pointerPos;
        dragItems.current = getDragItems(nodeInternals, nodesDraggable, pointerPos, nodeId);
        if (onStart && dragItems.current) {
          var _getEventHandlerParam3 = getEventHandlerParams({
              nodeId: nodeId,
              dragItems: dragItems.current,
              nodeInternals: nodeInternals
            }),
            _getEventHandlerParam4 = _slicedToArray(_getEventHandlerParam3, 2),
            currentNode = _getEventHandlerParam4[0],
            nodes = _getEventHandlerParam4[1];
          onStart(event.sourceEvent, currentNode, nodes);
        }
      };
      if (disabled) {
        selection.on('.drag', null);
      } else {
        var dragHandler = drag().on('start', function (event) {
          var _store$getState32 = store.getState(),
            domNode = _store$getState32.domNode,
            nodeDragThreshold = _store$getState32.nodeDragThreshold;
          if (nodeDragThreshold === 0) {
            startDrag(event);
          }
          var pointerPos = getPointerPosition(event);
          lastPos.current = pointerPos;
          containerBounds.current = (domNode === null || domNode === void 0 ? void 0 : domNode.getBoundingClientRect()) || null;
          mousePosition.current = getEventPosition(event.sourceEvent, containerBounds.current);
        }).on('drag', function (event) {
          var pointerPos = getPointerPosition(event);
          var _store$getState33 = store.getState(),
            autoPanOnNodeDrag = _store$getState33.autoPanOnNodeDrag,
            nodeDragThreshold = _store$getState33.nodeDragThreshold;
          if (!autoPanStarted.current && dragStarted.current && autoPanOnNodeDrag) {
            autoPanStarted.current = true;
            autoPan();
          }
          if (!dragStarted.current) {
            var _lastPos$current$x2, _lastPos$current, _lastPos$current$y2, _lastPos$current2;
            var x = pointerPos.xSnapped - ((_lastPos$current$x2 = lastPos === null || lastPos === void 0 || (_lastPos$current = lastPos.current) === null || _lastPos$current === void 0 ? void 0 : _lastPos$current.x) !== null && _lastPos$current$x2 !== void 0 ? _lastPos$current$x2 : 0);
            var y = pointerPos.ySnapped - ((_lastPos$current$y2 = lastPos === null || lastPos === void 0 || (_lastPos$current2 = lastPos.current) === null || _lastPos$current2 === void 0 ? void 0 : _lastPos$current2.y) !== null && _lastPos$current$y2 !== void 0 ? _lastPos$current$y2 : 0);
            var _distance = Math.sqrt(x * x + y * y);
            if (_distance > nodeDragThreshold) {
              startDrag(event);
            }
          }
          // skip events without movement
          if ((lastPos.current.x !== pointerPos.xSnapped || lastPos.current.y !== pointerPos.ySnapped) && dragItems.current && dragStarted.current) {
            dragEvent.current = event.sourceEvent;
            mousePosition.current = getEventPosition(event.sourceEvent, containerBounds.current);
            updateNodes(pointerPos);
          }
        }).on('end', function (event) {
          if (!dragStarted.current) {
            return;
          }
          setDragging(false);
          autoPanStarted.current = false;
          dragStarted.current = false;
          cancelAnimationFrame(autoPanId.current);
          if (dragItems.current) {
            var _store$getState34 = store.getState(),
              updateNodePositions = _store$getState34.updateNodePositions,
              nodeInternals = _store$getState34.nodeInternals,
              onNodeDragStop = _store$getState34.onNodeDragStop,
              onSelectionDragStop = _store$getState34.onSelectionDragStop;
            var onStop = nodeId ? onNodeDragStop : wrapSelectionDragFunc(onSelectionDragStop);
            updateNodePositions(dragItems.current, false, false);
            if (onStop) {
              var _getEventHandlerParam5 = getEventHandlerParams({
                  nodeId: nodeId,
                  dragItems: dragItems.current,
                  nodeInternals: nodeInternals
                }),
                _getEventHandlerParam6 = _slicedToArray(_getEventHandlerParam5, 2),
                currentNode = _getEventHandlerParam6[0],
                nodes = _getEventHandlerParam6[1];
              onStop(event.sourceEvent, currentNode, nodes);
            }
          }
        }).filter(function (event) {
          var target = event.target;
          var isDraggable = !event.button && (!noDragClassName || !hasSelector(target, ".".concat(noDragClassName), nodeRef)) && (!handleSelector || hasSelector(target, handleSelector, nodeRef));
          return isDraggable;
        });
        selection.call(dragHandler);
        return function () {
          selection.on('.drag', null);
        };
      }
    }
  }, [nodeRef, disabled, noDragClassName, handleSelector, isSelectable, store, nodeId, selectNodesOnDrag, getPointerPosition]);
  return dragging;
}
function useUpdateNodePositions() {
  var store = useStoreApi();
  var updatePositions = (0,react.useCallback)(function (params) {
    var _store$getState35 = store.getState(),
      nodeInternals = _store$getState35.nodeInternals,
      nodeExtent = _store$getState35.nodeExtent,
      updateNodePositions = _store$getState35.updateNodePositions,
      getNodes = _store$getState35.getNodes,
      snapToGrid = _store$getState35.snapToGrid,
      snapGrid = _store$getState35.snapGrid,
      onError = _store$getState35.onError,
      nodesDraggable = _store$getState35.nodesDraggable;
    var selectedNodes = getNodes().filter(function (n) {
      return n.selected && (n.draggable || nodesDraggable && typeof n.draggable === 'undefined');
    });
    // by default a node moves 5px on each key press, or 20px if shift is pressed
    // if snap grid is enabled, we use that for the velocity.
    var xVelo = snapToGrid ? snapGrid[0] : 5;
    var yVelo = snapToGrid ? snapGrid[1] : 5;
    var factor = params.isShiftPressed ? 4 : 1;
    var positionDiffX = params.x * xVelo * factor;
    var positionDiffY = params.y * yVelo * factor;
    var nodeUpdates = selectedNodes.map(function (n) {
      if (n.positionAbsolute) {
        var nextPosition = {
          x: n.positionAbsolute.x + positionDiffX,
          y: n.positionAbsolute.y + positionDiffY
        };
        if (snapToGrid) {
          nextPosition.x = snapGrid[0] * Math.round(nextPosition.x / snapGrid[0]);
          nextPosition.y = snapGrid[1] * Math.round(nextPosition.y / snapGrid[1]);
        }
        var _calcNextPosition = calcNextPosition(n, nextPosition, nodeInternals, nodeExtent, undefined, onError),
          positionAbsolute = _calcNextPosition.positionAbsolute,
          position = _calcNextPosition.position;
        n.position = position;
        n.positionAbsolute = positionAbsolute;
      }
      return n;
    });
    updateNodePositions(nodeUpdates, true, false);
  }, []);
  return updatePositions;
}
var arrowKeyDiffs = {
  ArrowUp: {
    x: 0,
    y: -1
  },
  ArrowDown: {
    x: 0,
    y: 1
  },
  ArrowLeft: {
    x: -1,
    y: 0
  },
  ArrowRight: {
    x: 1,
    y: 0
  }
};
var wrapNode = function wrapNode(NodeComponent) {
  var NodeWrapper = function NodeWrapper(_ref56) {
    var id = _ref56.id,
      type = _ref56.type,
      data = _ref56.data,
      xPos = _ref56.xPos,
      yPos = _ref56.yPos,
      xPosOrigin = _ref56.xPosOrigin,
      yPosOrigin = _ref56.yPosOrigin,
      selected = _ref56.selected,
      onClick = _ref56.onClick,
      onMouseEnter = _ref56.onMouseEnter,
      onMouseMove = _ref56.onMouseMove,
      onMouseLeave = _ref56.onMouseLeave,
      onContextMenu = _ref56.onContextMenu,
      onDoubleClick = _ref56.onDoubleClick,
      style = _ref56.style,
      className = _ref56.className,
      isDraggable = _ref56.isDraggable,
      isSelectable = _ref56.isSelectable,
      isConnectable = _ref56.isConnectable,
      isFocusable = _ref56.isFocusable,
      selectNodesOnDrag = _ref56.selectNodesOnDrag,
      sourcePosition = _ref56.sourcePosition,
      targetPosition = _ref56.targetPosition,
      hidden = _ref56.hidden,
      resizeObserver = _ref56.resizeObserver,
      dragHandle = _ref56.dragHandle,
      zIndex = _ref56.zIndex,
      isParent = _ref56.isParent,
      noDragClassName = _ref56.noDragClassName,
      noPanClassName = _ref56.noPanClassName,
      initialized = _ref56.initialized,
      disableKeyboardA11y = _ref56.disableKeyboardA11y,
      ariaLabel = _ref56.ariaLabel,
      rfId = _ref56.rfId,
      hasHandleBounds = _ref56.hasHandleBounds;
    var store = useStoreApi();
    var nodeRef = (0,react.useRef)(null);
    var prevSourcePosition = (0,react.useRef)(sourcePosition);
    var prevTargetPosition = (0,react.useRef)(targetPosition);
    var prevType = (0,react.useRef)(type);
    var hasPointerEvents = isSelectable || isDraggable || onClick || onMouseEnter || onMouseMove || onMouseLeave;
    var updatePositions = useUpdateNodePositions();
    var onMouseEnterHandler = getMouseHandler(id, store.getState, onMouseEnter);
    var onMouseMoveHandler = getMouseHandler(id, store.getState, onMouseMove);
    var onMouseLeaveHandler = getMouseHandler(id, store.getState, onMouseLeave);
    var onContextMenuHandler = getMouseHandler(id, store.getState, onContextMenu);
    var onDoubleClickHandler = getMouseHandler(id, store.getState, onDoubleClick);
    var onSelectNodeHandler = function onSelectNodeHandler(event) {
      var _store$getState36 = store.getState(),
        nodeDragThreshold = _store$getState36.nodeDragThreshold;
      if (isSelectable && (!selectNodesOnDrag || !isDraggable || nodeDragThreshold > 0)) {
        // this handler gets called within the drag start event when selectNodesOnDrag=true
        handleNodeClick({
          id: id,
          store: store,
          nodeRef: nodeRef
        });
      }
      if (onClick) {
        var node = store.getState().nodeInternals.get(id);
        if (node) {
          onClick(event, _objectSpread({}, node));
        }
      }
    };
    var onKeyDown = function onKeyDown(event) {
      if (isInputDOMNode(event)) {
        return;
      }
      if (elementSelectionKeys.includes(event.key) && isSelectable) {
        var unselect = event.key === 'Escape';
        handleNodeClick({
          id: id,
          store: store,
          unselect: unselect,
          nodeRef: nodeRef
        });
      } else if (!disableKeyboardA11y && isDraggable && selected && Object.prototype.hasOwnProperty.call(arrowKeyDiffs, event.key)) {
        store.setState({
          ariaLiveMessage: "Moved selected node ".concat(event.key.replace('Arrow', '').toLowerCase(), ". New position, x: ").concat(~~xPos, ", y: ").concat(~~yPos)
        });
        updatePositions({
          x: arrowKeyDiffs[event.key].x,
          y: arrowKeyDiffs[event.key].y,
          isShiftPressed: event.shiftKey
        });
      }
    };
    (0,react.useEffect)(function () {
      return function () {
        if (nodeRef.current) {
          resizeObserver === null || resizeObserver === void 0 || resizeObserver.unobserve(nodeRef.current);
        }
      };
    }, []);
    (0,react.useEffect)(function () {
      if (nodeRef.current && !hidden) {
        var currNode = nodeRef.current;
        if (!initialized || !hasHandleBounds) {
          // At this point we always want to make sure that the node gets re-measured / re-initialized.
          // We need to unobserve it first in case it is still observed
          resizeObserver === null || resizeObserver === void 0 || resizeObserver.unobserve(currNode);
          resizeObserver === null || resizeObserver === void 0 || resizeObserver.observe(currNode);
        }
      }
    }, [hidden, initialized, hasHandleBounds]);
    (0,react.useEffect)(function () {
      // when the user programmatically changes the source or handle position, we re-initialize the node
      var typeChanged = prevType.current !== type;
      var sourcePosChanged = prevSourcePosition.current !== sourcePosition;
      var targetPosChanged = prevTargetPosition.current !== targetPosition;
      if (nodeRef.current && (typeChanged || sourcePosChanged || targetPosChanged)) {
        if (typeChanged) {
          prevType.current = type;
        }
        if (sourcePosChanged) {
          prevSourcePosition.current = sourcePosition;
        }
        if (targetPosChanged) {
          prevTargetPosition.current = targetPosition;
        }
        store.getState().updateNodeDimensions([{
          id: id,
          nodeElement: nodeRef.current,
          forceUpdate: true
        }]);
      }
    }, [id, type, sourcePosition, targetPosition]);
    var dragging = useDrag({
      nodeRef: nodeRef,
      disabled: hidden || !isDraggable,
      noDragClassName: noDragClassName,
      handleSelector: dragHandle,
      nodeId: id,
      isSelectable: isSelectable,
      selectNodesOnDrag: selectNodesOnDrag
    });
    if (hidden) {
      return null;
    }
    return /*#__PURE__*/react.createElement("div", {
      className: (0,classcat/* default */.A)(['react-flow__node', "react-flow__node-".concat(type), _defineProperty({}, noPanClassName, isDraggable), className, {
        selected: selected,
        selectable: isSelectable,
        parent: isParent,
        dragging: dragging
      }]),
      ref: nodeRef,
      style: _objectSpread({
        zIndex: zIndex,
        transform: "translate(".concat(xPosOrigin, "px,").concat(yPosOrigin, "px)"),
        pointerEvents: hasPointerEvents ? 'all' : 'none',
        visibility: initialized ? 'visible' : 'hidden'
      }, style),
      "data-id": id,
      "data-testid": "rf__node-".concat(id),
      onMouseEnter: onMouseEnterHandler,
      onMouseMove: onMouseMoveHandler,
      onMouseLeave: onMouseLeaveHandler,
      onContextMenu: onContextMenuHandler,
      onClick: onSelectNodeHandler,
      onDoubleClick: onDoubleClickHandler,
      onKeyDown: isFocusable ? onKeyDown : undefined,
      tabIndex: isFocusable ? 0 : undefined,
      role: isFocusable ? 'button' : undefined,
      "aria-describedby": disableKeyboardA11y ? undefined : "".concat(ARIA_NODE_DESC_KEY, "-").concat(rfId),
      "aria-label": ariaLabel
    }, /*#__PURE__*/react.createElement(Provider, {
      value: id
    }, /*#__PURE__*/react.createElement(NodeComponent, {
      id: id,
      data: data,
      type: type,
      xPos: xPos,
      yPos: yPos,
      selected: selected,
      isConnectable: isConnectable,
      sourcePosition: sourcePosition,
      targetPosition: targetPosition,
      dragging: dragging,
      dragHandle: dragHandle,
      zIndex: zIndex
    })));
  };
  NodeWrapper.displayName = 'NodeWrapper';
  return /*#__PURE__*/(0,react.memo)(NodeWrapper);
};

/**
 * The nodes selection rectangle gets displayed when a user
 * made a selection with on or several nodes
 */
var selector$7 = function selector$7(s) {
  var selectedNodes = s.getNodes().filter(function (n) {
    return n.selected;
  });
  return _objectSpread(_objectSpread({}, getNodesBounds(selectedNodes, s.nodeOrigin)), {}, {
    transformString: "translate(".concat(s.transform[0], "px,").concat(s.transform[1], "px) scale(").concat(s.transform[2], ")"),
    userSelectionActive: s.userSelectionActive
  });
};
function NodesSelection(_ref58) {
  var onSelectionContextMenu = _ref58.onSelectionContextMenu,
    noPanClassName = _ref58.noPanClassName,
    disableKeyboardA11y = _ref58.disableKeyboardA11y;
  var store = useStoreApi();
  var _useStore9 = useStore(selector$7, esm_shallow/* shallow */.x),
    width = _useStore9.width,
    height = _useStore9.height,
    left = _useStore9.x,
    top = _useStore9.y,
    transformString = _useStore9.transformString,
    userSelectionActive = _useStore9.userSelectionActive;
  var updatePositions = useUpdateNodePositions();
  var nodeRef = (0,react.useRef)(null);
  (0,react.useEffect)(function () {
    if (!disableKeyboardA11y) {
      var _nodeRef$current2;
      (_nodeRef$current2 = nodeRef.current) === null || _nodeRef$current2 === void 0 || _nodeRef$current2.focus({
        preventScroll: true
      });
    }
  }, [disableKeyboardA11y]);
  useDrag({
    nodeRef: nodeRef
  });
  if (userSelectionActive || !width || !height) {
    return null;
  }
  var onContextMenu = onSelectionContextMenu ? function (event) {
    var selectedNodes = store.getState().getNodes().filter(function (n) {
      return n.selected;
    });
    onSelectionContextMenu(event, selectedNodes);
  } : undefined;
  var onKeyDown = function onKeyDown(event) {
    if (Object.prototype.hasOwnProperty.call(arrowKeyDiffs, event.key)) {
      updatePositions({
        x: arrowKeyDiffs[event.key].x,
        y: arrowKeyDiffs[event.key].y,
        isShiftPressed: event.shiftKey
      });
    }
  };
  return /*#__PURE__*/react.createElement("div", {
    className: (0,classcat/* default */.A)(['react-flow__nodesselection', 'react-flow__container', noPanClassName]),
    style: {
      transform: transformString
    }
  }, /*#__PURE__*/react.createElement("div", {
    ref: nodeRef,
    className: "react-flow__nodesselection-rect",
    onContextMenu: onContextMenu,
    tabIndex: disableKeyboardA11y ? undefined : -1,
    onKeyDown: disableKeyboardA11y ? undefined : onKeyDown,
    style: {
      width: width,
      height: height,
      top: top,
      left: left
    }
  }));
}
var NodesSelection$1 = /*#__PURE__*/(0,react.memo)(NodesSelection);
var selector$6 = function selector$6(s) {
  return s.nodesSelectionActive;
};
var FlowRenderer = function FlowRenderer(_ref59) {
  var children = _ref59.children,
    onPaneClick = _ref59.onPaneClick,
    onPaneMouseEnter = _ref59.onPaneMouseEnter,
    onPaneMouseMove = _ref59.onPaneMouseMove,
    onPaneMouseLeave = _ref59.onPaneMouseLeave,
    onPaneContextMenu = _ref59.onPaneContextMenu,
    onPaneScroll = _ref59.onPaneScroll,
    deleteKeyCode = _ref59.deleteKeyCode,
    onMove = _ref59.onMove,
    onMoveStart = _ref59.onMoveStart,
    onMoveEnd = _ref59.onMoveEnd,
    selectionKeyCode = _ref59.selectionKeyCode,
    selectionOnDrag = _ref59.selectionOnDrag,
    selectionMode = _ref59.selectionMode,
    onSelectionStart = _ref59.onSelectionStart,
    onSelectionEnd = _ref59.onSelectionEnd,
    multiSelectionKeyCode = _ref59.multiSelectionKeyCode,
    panActivationKeyCode = _ref59.panActivationKeyCode,
    zoomActivationKeyCode = _ref59.zoomActivationKeyCode,
    elementsSelectable = _ref59.elementsSelectable,
    zoomOnScroll = _ref59.zoomOnScroll,
    zoomOnPinch = _ref59.zoomOnPinch,
    _panOnScroll = _ref59.panOnScroll,
    panOnScrollSpeed = _ref59.panOnScrollSpeed,
    panOnScrollMode = _ref59.panOnScrollMode,
    zoomOnDoubleClick = _ref59.zoomOnDoubleClick,
    _panOnDrag = _ref59.panOnDrag,
    defaultViewport = _ref59.defaultViewport,
    translateExtent = _ref59.translateExtent,
    minZoom = _ref59.minZoom,
    maxZoom = _ref59.maxZoom,
    preventScrolling = _ref59.preventScrolling,
    onSelectionContextMenu = _ref59.onSelectionContextMenu,
    noWheelClassName = _ref59.noWheelClassName,
    noPanClassName = _ref59.noPanClassName,
    disableKeyboardA11y = _ref59.disableKeyboardA11y;
  var nodesSelectionActive = useStore(selector$6);
  var selectionKeyPressed = useKeyPress(selectionKeyCode);
  var panActivationKeyPressed = useKeyPress(panActivationKeyCode);
  var panOnDrag = panActivationKeyPressed || _panOnDrag;
  var panOnScroll = panActivationKeyPressed || _panOnScroll;
  var isSelecting = selectionKeyPressed || selectionOnDrag && panOnDrag !== true;
  useGlobalKeyHandler({
    deleteKeyCode: deleteKeyCode,
    multiSelectionKeyCode: multiSelectionKeyCode
  });
  return /*#__PURE__*/react.createElement(ZoomPane, {
    onMove: onMove,
    onMoveStart: onMoveStart,
    onMoveEnd: onMoveEnd,
    onPaneContextMenu: onPaneContextMenu,
    elementsSelectable: elementsSelectable,
    zoomOnScroll: zoomOnScroll,
    zoomOnPinch: zoomOnPinch,
    panOnScroll: panOnScroll,
    panOnScrollSpeed: panOnScrollSpeed,
    panOnScrollMode: panOnScrollMode,
    zoomOnDoubleClick: zoomOnDoubleClick,
    panOnDrag: !selectionKeyPressed && panOnDrag,
    defaultViewport: defaultViewport,
    translateExtent: translateExtent,
    minZoom: minZoom,
    maxZoom: maxZoom,
    zoomActivationKeyCode: zoomActivationKeyCode,
    preventScrolling: preventScrolling,
    noWheelClassName: noWheelClassName,
    noPanClassName: noPanClassName
  }, /*#__PURE__*/react.createElement(Pane, {
    onSelectionStart: onSelectionStart,
    onSelectionEnd: onSelectionEnd,
    onPaneClick: onPaneClick,
    onPaneMouseEnter: onPaneMouseEnter,
    onPaneMouseMove: onPaneMouseMove,
    onPaneMouseLeave: onPaneMouseLeave,
    onPaneContextMenu: onPaneContextMenu,
    onPaneScroll: onPaneScroll,
    panOnDrag: panOnDrag,
    isSelecting: !!isSelecting,
    selectionMode: selectionMode
  }, children, nodesSelectionActive && ( /*#__PURE__*/react.createElement(NodesSelection$1, {
    onSelectionContextMenu: onSelectionContextMenu,
    noPanClassName: noPanClassName,
    disableKeyboardA11y: disableKeyboardA11y
  }))));
};
FlowRenderer.displayName = 'FlowRenderer';
var FlowRenderer$1 = /*#__PURE__*/(0,react.memo)(FlowRenderer);
function useVisibleNodes(onlyRenderVisible) {
  var nodes = useStore((0,react.useCallback)(function (s) {
    return onlyRenderVisible ? getNodesInside(s.nodeInternals, {
      x: 0,
      y: 0,
      width: s.width,
      height: s.height
    }, s.transform, true) : s.getNodes();
  }, [onlyRenderVisible]));
  return nodes;
}
function createNodeTypes(nodeTypes) {
  var standardTypes = {
    input: wrapNode(nodeTypes.input || InputNode$1),
    default: wrapNode(nodeTypes.default || DefaultNode$1),
    output: wrapNode(nodeTypes.output || OutputNode$1),
    group: wrapNode(nodeTypes.group || GroupNode)
  };
  var wrappedTypes = {};
  var specialTypes = Object.keys(nodeTypes).filter(function (k) {
    return !['input', 'default', 'output', 'group'].includes(k);
  }).reduce(function (res, key) {
    res[key] = wrapNode(nodeTypes[key] || DefaultNode$1);
    return res;
  }, wrappedTypes);
  return _objectSpread(_objectSpread({}, standardTypes), specialTypes);
}
var getPositionWithOrigin = function getPositionWithOrigin(_ref60) {
  var x = _ref60.x,
    y = _ref60.y,
    width = _ref60.width,
    height = _ref60.height,
    origin = _ref60.origin;
  if (!width || !height) {
    return {
      x: x,
      y: y
    };
  }
  if (origin[0] < 0 || origin[1] < 0 || origin[0] > 1 || origin[1] > 1) {
    return {
      x: x,
      y: y
    };
  }
  return {
    x: x - width * origin[0],
    y: y - height * origin[1]
  };
};
var selector$5 = function selector$5(s) {
  return {
    nodesDraggable: s.nodesDraggable,
    nodesConnectable: s.nodesConnectable,
    nodesFocusable: s.nodesFocusable,
    elementsSelectable: s.elementsSelectable,
    updateNodeDimensions: s.updateNodeDimensions,
    onError: s.onError
  };
};
var NodeRenderer = function NodeRenderer(props) {
  var _useStore10 = useStore(selector$5, esm_shallow/* shallow */.x),
    nodesDraggable = _useStore10.nodesDraggable,
    nodesConnectable = _useStore10.nodesConnectable,
    nodesFocusable = _useStore10.nodesFocusable,
    elementsSelectable = _useStore10.elementsSelectable,
    updateNodeDimensions = _useStore10.updateNodeDimensions,
    onError = _useStore10.onError;
  var nodes = useVisibleNodes(props.onlyRenderVisibleElements);
  var resizeObserverRef = (0,react.useRef)();
  var resizeObserver = (0,react.useMemo)(function () {
    if (typeof ResizeObserver === 'undefined') {
      return null;
    }
    var observer = new ResizeObserver(function (entries) {
      var updates = entries.map(function (entry) {
        return {
          id: entry.target.getAttribute('data-id'),
          nodeElement: entry.target,
          forceUpdate: true
        };
      });
      updateNodeDimensions(updates);
    });
    resizeObserverRef.current = observer;
    return observer;
  }, []);
  (0,react.useEffect)(function () {
    return function () {
      var _resizeObserverRef$cu;
      resizeObserverRef === null || resizeObserverRef === void 0 || (_resizeObserverRef$cu = resizeObserverRef.current) === null || _resizeObserverRef$cu === void 0 || _resizeObserverRef$cu.disconnect();
    };
  }, []);
  return /*#__PURE__*/react.createElement("div", {
    className: "react-flow__nodes",
    style: containerStyle
  }, nodes.map(function (node) {
    var _clampedPosition$x, _clampedPosition$y, _node$width2, _node$height2, _node$internalsSymbol3, _node$internalsSymbol4, _node$internalsSymbol5, _node$internalsSymbol6;
    var nodeType = node.type || 'default';
    if (!props.nodeTypes[nodeType]) {
      onError === null || onError === void 0 || onError('003', errorMessages['error003'](nodeType));
      nodeType = 'default';
    }
    var NodeComponent = props.nodeTypes[nodeType] || props.nodeTypes.default;
    var isDraggable = !!(node.draggable || nodesDraggable && typeof node.draggable === 'undefined');
    var isSelectable = !!(node.selectable || elementsSelectable && typeof node.selectable === 'undefined');
    var isConnectable = !!(node.connectable || nodesConnectable && typeof node.connectable === 'undefined');
    var isFocusable = !!(node.focusable || nodesFocusable && typeof node.focusable === 'undefined');
    var clampedPosition = props.nodeExtent ? clampPosition(node.positionAbsolute, props.nodeExtent) : node.positionAbsolute;
    var posX = (_clampedPosition$x = clampedPosition === null || clampedPosition === void 0 ? void 0 : clampedPosition.x) !== null && _clampedPosition$x !== void 0 ? _clampedPosition$x : 0;
    var posY = (_clampedPosition$y = clampedPosition === null || clampedPosition === void 0 ? void 0 : clampedPosition.y) !== null && _clampedPosition$y !== void 0 ? _clampedPosition$y : 0;
    var posOrigin = getPositionWithOrigin({
      x: posX,
      y: posY,
      width: (_node$width2 = node.width) !== null && _node$width2 !== void 0 ? _node$width2 : 0,
      height: (_node$height2 = node.height) !== null && _node$height2 !== void 0 ? _node$height2 : 0,
      origin: props.nodeOrigin
    });
    return /*#__PURE__*/react.createElement(NodeComponent, {
      key: node.id,
      id: node.id,
      className: node.className,
      style: node.style,
      type: nodeType,
      data: node.data,
      sourcePosition: node.sourcePosition || Position.Bottom,
      targetPosition: node.targetPosition || Position.Top,
      hidden: node.hidden,
      xPos: posX,
      yPos: posY,
      xPosOrigin: posOrigin.x,
      yPosOrigin: posOrigin.y,
      selectNodesOnDrag: props.selectNodesOnDrag,
      onClick: props.onNodeClick,
      onMouseEnter: props.onNodeMouseEnter,
      onMouseMove: props.onNodeMouseMove,
      onMouseLeave: props.onNodeMouseLeave,
      onContextMenu: props.onNodeContextMenu,
      onDoubleClick: props.onNodeDoubleClick,
      selected: !!node.selected,
      isDraggable: isDraggable,
      isSelectable: isSelectable,
      isConnectable: isConnectable,
      isFocusable: isFocusable,
      resizeObserver: resizeObserver,
      dragHandle: node.dragHandle,
      zIndex: (_node$internalsSymbol3 = (_node$internalsSymbol4 = node[internalsSymbol]) === null || _node$internalsSymbol4 === void 0 ? void 0 : _node$internalsSymbol4.z) !== null && _node$internalsSymbol3 !== void 0 ? _node$internalsSymbol3 : 0,
      isParent: !!((_node$internalsSymbol5 = node[internalsSymbol]) !== null && _node$internalsSymbol5 !== void 0 && _node$internalsSymbol5.isParent),
      noDragClassName: props.noDragClassName,
      noPanClassName: props.noPanClassName,
      initialized: !!node.width && !!node.height,
      rfId: props.rfId,
      disableKeyboardA11y: props.disableKeyboardA11y,
      ariaLabel: node.ariaLabel,
      hasHandleBounds: !!((_node$internalsSymbol6 = node[internalsSymbol]) !== null && _node$internalsSymbol6 !== void 0 && _node$internalsSymbol6.handleBounds)
    });
  }));
};
NodeRenderer.displayName = 'NodeRenderer';
var NodeRenderer$1 = /*#__PURE__*/(0,react.memo)(NodeRenderer);
var shiftX = function shiftX(x, shift, position) {
  if (position === Position.Left) return x - shift;
  if (position === Position.Right) return x + shift;
  return x;
};
var shiftY = function shiftY(y, shift, position) {
  if (position === Position.Top) return y - shift;
  if (position === Position.Bottom) return y + shift;
  return y;
};
var EdgeUpdaterClassName = 'react-flow__edgeupdater';
var EdgeAnchor = function EdgeAnchor(_ref61) {
  var position = _ref61.position,
    centerX = _ref61.centerX,
    centerY = _ref61.centerY,
    _ref61$radius = _ref61.radius,
    radius = _ref61$radius === void 0 ? 10 : _ref61$radius,
    onMouseDown = _ref61.onMouseDown,
    onMouseEnter = _ref61.onMouseEnter,
    onMouseOut = _ref61.onMouseOut,
    type = _ref61.type;
  return /*#__PURE__*/react.createElement("circle", {
    onMouseDown: onMouseDown,
    onMouseEnter: onMouseEnter,
    onMouseOut: onMouseOut,
    className: (0,classcat/* default */.A)([EdgeUpdaterClassName, "".concat(EdgeUpdaterClassName, "-").concat(type)]),
    cx: shiftX(centerX, radius, position),
    cy: shiftY(centerY, radius, position),
    r: radius,
    stroke: "transparent",
    fill: "transparent"
  });
};
var alwaysValidConnection = function alwaysValidConnection() {
  return true;
};
var wrapEdge = function wrapEdge(EdgeComponent) {
  var EdgeWrapper = function EdgeWrapper(_ref62) {
    var id = _ref62.id,
      className = _ref62.className,
      type = _ref62.type,
      data = _ref62.data,
      onClick = _ref62.onClick,
      onEdgeDoubleClick = _ref62.onEdgeDoubleClick,
      selected = _ref62.selected,
      animated = _ref62.animated,
      label = _ref62.label,
      labelStyle = _ref62.labelStyle,
      labelShowBg = _ref62.labelShowBg,
      labelBgStyle = _ref62.labelBgStyle,
      labelBgPadding = _ref62.labelBgPadding,
      labelBgBorderRadius = _ref62.labelBgBorderRadius,
      style = _ref62.style,
      source = _ref62.source,
      target = _ref62.target,
      sourceX = _ref62.sourceX,
      sourceY = _ref62.sourceY,
      targetX = _ref62.targetX,
      targetY = _ref62.targetY,
      sourcePosition = _ref62.sourcePosition,
      targetPosition = _ref62.targetPosition,
      elementsSelectable = _ref62.elementsSelectable,
      hidden = _ref62.hidden,
      sourceHandleId = _ref62.sourceHandleId,
      targetHandleId = _ref62.targetHandleId,
      onContextMenu = _ref62.onContextMenu,
      onMouseEnter = _ref62.onMouseEnter,
      onMouseMove = _ref62.onMouseMove,
      onMouseLeave = _ref62.onMouseLeave,
      edgeUpdaterRadius = _ref62.edgeUpdaterRadius,
      onEdgeUpdate = _ref62.onEdgeUpdate,
      onEdgeUpdateStart = _ref62.onEdgeUpdateStart,
      onEdgeUpdateEnd = _ref62.onEdgeUpdateEnd,
      markerEnd = _ref62.markerEnd,
      markerStart = _ref62.markerStart,
      rfId = _ref62.rfId,
      ariaLabel = _ref62.ariaLabel,
      isFocusable = _ref62.isFocusable,
      isUpdatable = _ref62.isUpdatable,
      pathOptions = _ref62.pathOptions,
      interactionWidth = _ref62.interactionWidth;
    var edgeRef = (0,react.useRef)(null);
    var _useState7 = (0,react.useState)(false),
      _useState8 = _slicedToArray(_useState7, 2),
      updateHover = _useState8[0],
      setUpdateHover = _useState8[1];
    var _useState9 = (0,react.useState)(false),
      _useState10 = _slicedToArray(_useState9, 2),
      updating = _useState10[0],
      setUpdating = _useState10[1];
    var store = useStoreApi();
    var markerStartUrl = (0,react.useMemo)(function () {
      return "url('#".concat(getMarkerId(markerStart, rfId), "')");
    }, [markerStart, rfId]);
    var markerEndUrl = (0,react.useMemo)(function () {
      return "url('#".concat(getMarkerId(markerEnd, rfId), "')");
    }, [markerEnd, rfId]);
    if (hidden) {
      return null;
    }
    var onEdgeClick = function onEdgeClick(event) {
      var _store$getState37 = store.getState(),
        edges = _store$getState37.edges,
        addSelectedEdges = _store$getState37.addSelectedEdges,
        unselectNodesAndEdges = _store$getState37.unselectNodesAndEdges,
        multiSelectionActive = _store$getState37.multiSelectionActive;
      var edge = edges.find(function (e) {
        return e.id === id;
      });
      if (!edge) {
        return;
      }
      if (elementsSelectable) {
        store.setState({
          nodesSelectionActive: false
        });
        if (edge.selected && multiSelectionActive) {
          var _edgeRef$current;
          unselectNodesAndEdges({
            nodes: [],
            edges: [edge]
          });
          (_edgeRef$current = edgeRef.current) === null || _edgeRef$current === void 0 || _edgeRef$current.blur();
        } else {
          addSelectedEdges([id]);
        }
      }
      if (onClick) {
        onClick(event, edge);
      }
    };
    var onEdgeDoubleClickHandler = getMouseHandler$1(id, store.getState, onEdgeDoubleClick);
    var onEdgeContextMenu = getMouseHandler$1(id, store.getState, onContextMenu);
    var onEdgeMouseEnter = getMouseHandler$1(id, store.getState, onMouseEnter);
    var onEdgeMouseMove = getMouseHandler$1(id, store.getState, onMouseMove);
    var onEdgeMouseLeave = getMouseHandler$1(id, store.getState, onMouseLeave);
    var handleEdgeUpdater = function handleEdgeUpdater(event, isSourceHandle) {
      // avoid triggering edge updater if mouse btn is not left
      if (event.button !== 0) {
        return;
      }
      var _store$getState38 = store.getState(),
        edges = _store$getState38.edges,
        isValidConnectionStore = _store$getState38.isValidConnection;
      var nodeId = isSourceHandle ? target : source;
      var handleId = (isSourceHandle ? targetHandleId : sourceHandleId) || null;
      var handleType = isSourceHandle ? 'target' : 'source';
      var isValidConnection = isValidConnectionStore || alwaysValidConnection;
      var isTarget = isSourceHandle;
      var edge = edges.find(function (e) {
        return e.id === id;
      });
      setUpdating(true);
      onEdgeUpdateStart === null || onEdgeUpdateStart === void 0 || onEdgeUpdateStart(event, edge, handleType);
      var _onEdgeUpdateEnd = function _onEdgeUpdateEnd(evt) {
        setUpdating(false);
        onEdgeUpdateEnd === null || onEdgeUpdateEnd === void 0 || onEdgeUpdateEnd(evt, edge, handleType);
      };
      var onConnectEdge = function onConnectEdge(connection) {
        return onEdgeUpdate === null || onEdgeUpdate === void 0 ? void 0 : onEdgeUpdate(edge, connection);
      };
      handlePointerDown({
        event: event,
        handleId: handleId,
        nodeId: nodeId,
        onConnect: onConnectEdge,
        isTarget: isTarget,
        getState: store.getState,
        setState: store.setState,
        isValidConnection: isValidConnection,
        edgeUpdaterType: handleType,
        onEdgeUpdateEnd: _onEdgeUpdateEnd
      });
    };
    var onEdgeUpdaterSourceMouseDown = function onEdgeUpdaterSourceMouseDown(event) {
      return handleEdgeUpdater(event, true);
    };
    var onEdgeUpdaterTargetMouseDown = function onEdgeUpdaterTargetMouseDown(event) {
      return handleEdgeUpdater(event, false);
    };
    var onEdgeUpdaterMouseEnter = function onEdgeUpdaterMouseEnter() {
      return setUpdateHover(true);
    };
    var onEdgeUpdaterMouseOut = function onEdgeUpdaterMouseOut() {
      return setUpdateHover(false);
    };
    var inactive = !elementsSelectable && !onClick;
    var onKeyDown = function onKeyDown(event) {
      if (elementSelectionKeys.includes(event.key) && elementsSelectable) {
        var _store$getState39 = store.getState(),
          unselectNodesAndEdges = _store$getState39.unselectNodesAndEdges,
          addSelectedEdges = _store$getState39.addSelectedEdges,
          edges = _store$getState39.edges;
        var unselect = event.key === 'Escape';
        if (unselect) {
          var _edgeRef$current2;
          (_edgeRef$current2 = edgeRef.current) === null || _edgeRef$current2 === void 0 || _edgeRef$current2.blur();
          unselectNodesAndEdges({
            edges: [edges.find(function (e) {
              return e.id === id;
            })]
          });
        } else {
          addSelectedEdges([id]);
        }
      }
    };
    return /*#__PURE__*/react.createElement("g", {
      className: (0,classcat/* default */.A)(['react-flow__edge', "react-flow__edge-".concat(type), className, {
        selected: selected,
        animated: animated,
        inactive: inactive,
        updating: updateHover
      }]),
      onClick: onEdgeClick,
      onDoubleClick: onEdgeDoubleClickHandler,
      onContextMenu: onEdgeContextMenu,
      onMouseEnter: onEdgeMouseEnter,
      onMouseMove: onEdgeMouseMove,
      onMouseLeave: onEdgeMouseLeave,
      onKeyDown: isFocusable ? onKeyDown : undefined,
      tabIndex: isFocusable ? 0 : undefined,
      role: isFocusable ? 'button' : 'img',
      "data-testid": "rf__edge-".concat(id),
      "aria-label": ariaLabel === null ? undefined : ariaLabel ? ariaLabel : "Edge from ".concat(source, " to ").concat(target),
      "aria-describedby": isFocusable ? "".concat(ARIA_EDGE_DESC_KEY, "-").concat(rfId) : undefined,
      ref: edgeRef
    }, !updating && ( /*#__PURE__*/react.createElement(EdgeComponent, {
      id: id,
      source: source,
      target: target,
      selected: selected,
      animated: animated,
      label: label,
      labelStyle: labelStyle,
      labelShowBg: labelShowBg,
      labelBgStyle: labelBgStyle,
      labelBgPadding: labelBgPadding,
      labelBgBorderRadius: labelBgBorderRadius,
      data: data,
      style: style,
      sourceX: sourceX,
      sourceY: sourceY,
      targetX: targetX,
      targetY: targetY,
      sourcePosition: sourcePosition,
      targetPosition: targetPosition,
      sourceHandleId: sourceHandleId,
      targetHandleId: targetHandleId,
      markerStart: markerStartUrl,
      markerEnd: markerEndUrl,
      pathOptions: pathOptions,
      interactionWidth: interactionWidth
    })), isUpdatable && ( /*#__PURE__*/react.createElement(react.Fragment, null, (isUpdatable === 'source' || isUpdatable === true) && ( /*#__PURE__*/react.createElement(EdgeAnchor, {
      position: sourcePosition,
      centerX: sourceX,
      centerY: sourceY,
      radius: edgeUpdaterRadius,
      onMouseDown: onEdgeUpdaterSourceMouseDown,
      onMouseEnter: onEdgeUpdaterMouseEnter,
      onMouseOut: onEdgeUpdaterMouseOut,
      type: "source"
    })), (isUpdatable === 'target' || isUpdatable === true) && ( /*#__PURE__*/react.createElement(EdgeAnchor, {
      position: targetPosition,
      centerX: targetX,
      centerY: targetY,
      radius: edgeUpdaterRadius,
      onMouseDown: onEdgeUpdaterTargetMouseDown,
      onMouseEnter: onEdgeUpdaterMouseEnter,
      onMouseOut: onEdgeUpdaterMouseOut,
      type: "target"
    })))));
  };
  EdgeWrapper.displayName = 'EdgeWrapper';
  return /*#__PURE__*/(0,react.memo)(EdgeWrapper);
};
function createEdgeTypes(edgeTypes) {
  var standardTypes = {
    default: wrapEdge(edgeTypes.default || BezierEdge),
    straight: wrapEdge(edgeTypes.bezier || StraightEdge),
    step: wrapEdge(edgeTypes.step || StepEdge),
    smoothstep: wrapEdge(edgeTypes.step || SmoothStepEdge),
    simplebezier: wrapEdge(edgeTypes.simplebezier || SimpleBezierEdge)
  };
  var wrappedTypes = {};
  var specialTypes = Object.keys(edgeTypes).filter(function (k) {
    return !['default', 'bezier'].includes(k);
  }).reduce(function (res, key) {
    res[key] = wrapEdge(edgeTypes[key] || BezierEdge);
    return res;
  }, wrappedTypes);
  return _objectSpread(_objectSpread({}, standardTypes), specialTypes);
}
function getHandlePosition(position, nodeRect) {
  var handle = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var x = ((handle === null || handle === void 0 ? void 0 : handle.x) || 0) + nodeRect.x;
  var y = ((handle === null || handle === void 0 ? void 0 : handle.y) || 0) + nodeRect.y;
  var width = (handle === null || handle === void 0 ? void 0 : handle.width) || nodeRect.width;
  var height = (handle === null || handle === void 0 ? void 0 : handle.height) || nodeRect.height;
  switch (position) {
    case Position.Top:
      return {
        x: x + width / 2,
        y: y
      };
    case Position.Right:
      return {
        x: x + width,
        y: y + height / 2
      };
    case Position.Bottom:
      return {
        x: x + width / 2,
        y: y + height
      };
    case Position.Left:
      return {
        x: x,
        y: y + height / 2
      };
  }
}
function getHandle(bounds, handleId) {
  if (!bounds) {
    return null;
  }
  if (bounds.length === 1 || !handleId) {
    return bounds[0];
  } else if (handleId) {
    return bounds.find(function (d) {
      return d.id === handleId;
    }) || null;
  }
  return null;
}
var getEdgePositions = function getEdgePositions(sourceNodeRect, sourceHandle, sourcePosition, targetNodeRect, targetHandle, targetPosition) {
  var sourceHandlePos = getHandlePosition(sourcePosition, sourceNodeRect, sourceHandle);
  var targetHandlePos = getHandlePosition(targetPosition, targetNodeRect, targetHandle);
  return {
    sourceX: sourceHandlePos.x,
    sourceY: sourceHandlePos.y,
    targetX: targetHandlePos.x,
    targetY: targetHandlePos.y
  };
};
function isEdgeVisible(_ref63) {
  var sourcePos = _ref63.sourcePos,
    targetPos = _ref63.targetPos,
    sourceWidth = _ref63.sourceWidth,
    sourceHeight = _ref63.sourceHeight,
    targetWidth = _ref63.targetWidth,
    targetHeight = _ref63.targetHeight,
    width = _ref63.width,
    height = _ref63.height,
    transform = _ref63.transform;
  var edgeBox = {
    x: Math.min(sourcePos.x, targetPos.x),
    y: Math.min(sourcePos.y, targetPos.y),
    x2: Math.max(sourcePos.x + sourceWidth, targetPos.x + targetWidth),
    y2: Math.max(sourcePos.y + sourceHeight, targetPos.y + targetHeight)
  };
  if (edgeBox.x === edgeBox.x2) {
    edgeBox.x2 += 1;
  }
  if (edgeBox.y === edgeBox.y2) {
    edgeBox.y2 += 1;
  }
  var viewBox = rectToBox({
    x: (0 - transform[0]) / transform[2],
    y: (0 - transform[1]) / transform[2],
    width: width / transform[2],
    height: height / transform[2]
  });
  var xOverlap = Math.max(0, Math.min(viewBox.x2, edgeBox.x2) - Math.max(viewBox.x, edgeBox.x));
  var yOverlap = Math.max(0, Math.min(viewBox.y2, edgeBox.y2) - Math.max(viewBox.y, edgeBox.y));
  var overlappingArea = Math.ceil(xOverlap * yOverlap);
  return overlappingArea > 0;
}
function getNodeData(node) {
  var _node$internalsSymbol7, _node$positionAbsolut5, _node$positionAbsolut6, _node$positionAbsolut7, _node$positionAbsolut8;
  var handleBounds = (node === null || node === void 0 || (_node$internalsSymbol7 = node[internalsSymbol]) === null || _node$internalsSymbol7 === void 0 ? void 0 : _node$internalsSymbol7.handleBounds) || null;
  var isValid = handleBounds && (node === null || node === void 0 ? void 0 : node.width) && (node === null || node === void 0 ? void 0 : node.height) && typeof (node === null || node === void 0 || (_node$positionAbsolut5 = node.positionAbsolute) === null || _node$positionAbsolut5 === void 0 ? void 0 : _node$positionAbsolut5.x) !== 'undefined' && typeof (node === null || node === void 0 || (_node$positionAbsolut6 = node.positionAbsolute) === null || _node$positionAbsolut6 === void 0 ? void 0 : _node$positionAbsolut6.y) !== 'undefined';
  return [{
    x: (node === null || node === void 0 || (_node$positionAbsolut7 = node.positionAbsolute) === null || _node$positionAbsolut7 === void 0 ? void 0 : _node$positionAbsolut7.x) || 0,
    y: (node === null || node === void 0 || (_node$positionAbsolut8 = node.positionAbsolute) === null || _node$positionAbsolut8 === void 0 ? void 0 : _node$positionAbsolut8.y) || 0,
    width: (node === null || node === void 0 ? void 0 : node.width) || 0,
    height: (node === null || node === void 0 ? void 0 : node.height) || 0
  }, handleBounds, !!isValid];
}
var defaultEdgeTree = [{
  level: 0,
  isMaxLevel: true,
  edges: []
}];
function groupEdgesByZLevel(edges, nodeInternals) {
  var elevateEdgesOnSelect = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var maxLevel = -1;
  var levelLookup = edges.reduce(function (tree, edge) {
    var hasZIndex = isNumeric(edge.zIndex);
    var z = hasZIndex ? edge.zIndex : 0;
    if (elevateEdgesOnSelect) {
      var _sourceNode$internals, _targetNode$internals;
      var targetNode = nodeInternals.get(edge.target);
      var sourceNode = nodeInternals.get(edge.source);
      var edgeOrConnectedNodeSelected = edge.selected || (targetNode === null || targetNode === void 0 ? void 0 : targetNode.selected) || (sourceNode === null || sourceNode === void 0 ? void 0 : sourceNode.selected);
      var selectedZIndex = Math.max((sourceNode === null || sourceNode === void 0 || (_sourceNode$internals = sourceNode[internalsSymbol]) === null || _sourceNode$internals === void 0 ? void 0 : _sourceNode$internals.z) || 0, (targetNode === null || targetNode === void 0 || (_targetNode$internals = targetNode[internalsSymbol]) === null || _targetNode$internals === void 0 ? void 0 : _targetNode$internals.z) || 0, 1000);
      z = (hasZIndex ? edge.zIndex : 0) + (edgeOrConnectedNodeSelected ? selectedZIndex : 0);
    }
    if (tree[z]) {
      tree[z].push(edge);
    } else {
      tree[z] = [edge];
    }
    maxLevel = z > maxLevel ? z : maxLevel;
    return tree;
  }, {});
  var edgeTree = Object.entries(levelLookup).map(function (_ref64) {
    var _ref65 = _slicedToArray(_ref64, 2),
      key = _ref65[0],
      edges = _ref65[1];
    var level = +key;
    return {
      edges: edges,
      level: level,
      isMaxLevel: level === maxLevel
    };
  });
  if (edgeTree.length === 0) {
    return defaultEdgeTree;
  }
  return edgeTree;
}
function useVisibleEdges(onlyRenderVisible, nodeInternals, elevateEdgesOnSelect) {
  var edges = useStore((0,react.useCallback)(function (s) {
    if (!onlyRenderVisible) {
      return s.edges;
    }
    return s.edges.filter(function (e) {
      var sourceNode = nodeInternals.get(e.source);
      var targetNode = nodeInternals.get(e.target);
      return (sourceNode === null || sourceNode === void 0 ? void 0 : sourceNode.width) && (sourceNode === null || sourceNode === void 0 ? void 0 : sourceNode.height) && (targetNode === null || targetNode === void 0 ? void 0 : targetNode.width) && (targetNode === null || targetNode === void 0 ? void 0 : targetNode.height) && isEdgeVisible({
        sourcePos: sourceNode.positionAbsolute || {
          x: 0,
          y: 0
        },
        targetPos: targetNode.positionAbsolute || {
          x: 0,
          y: 0
        },
        sourceWidth: sourceNode.width,
        sourceHeight: sourceNode.height,
        targetWidth: targetNode.width,
        targetHeight: targetNode.height,
        width: s.width,
        height: s.height,
        transform: s.transform
      });
    });
  }, [onlyRenderVisible, nodeInternals]));
  return groupEdgesByZLevel(edges, nodeInternals, elevateEdgesOnSelect);
}
var ArrowSymbol = function ArrowSymbol(_ref66) {
  var _ref66$color = _ref66.color,
    color = _ref66$color === void 0 ? 'none' : _ref66$color,
    _ref66$strokeWidth = _ref66.strokeWidth,
    strokeWidth = _ref66$strokeWidth === void 0 ? 1 : _ref66$strokeWidth;
  return /*#__PURE__*/react.createElement("polyline", {
    style: {
      stroke: color,
      strokeWidth: strokeWidth
    },
    strokeLinecap: "round",
    strokeLinejoin: "round",
    fill: "none",
    points: "-5,-4 0,0 -5,4"
  });
};
var ArrowClosedSymbol = function ArrowClosedSymbol(_ref67) {
  var _ref67$color = _ref67.color,
    color = _ref67$color === void 0 ? 'none' : _ref67$color,
    _ref67$strokeWidth = _ref67.strokeWidth,
    strokeWidth = _ref67$strokeWidth === void 0 ? 1 : _ref67$strokeWidth;
  return /*#__PURE__*/react.createElement("polyline", {
    style: {
      stroke: color,
      fill: color,
      strokeWidth: strokeWidth
    },
    strokeLinecap: "round",
    strokeLinejoin: "round",
    points: "-5,-4 0,0 -5,4 -5,-4"
  });
};
var MarkerSymbols = _defineProperty(_defineProperty({}, MarkerType.Arrow, ArrowSymbol), MarkerType.ArrowClosed, ArrowClosedSymbol);
function useMarkerSymbol(type) {
  var store = useStoreApi();
  var symbol = (0,react.useMemo)(function () {
    var symbolExists = Object.prototype.hasOwnProperty.call(MarkerSymbols, type);
    if (!symbolExists) {
      var _store$getState$onErr3, _store$getState40;
      (_store$getState$onErr3 = (_store$getState40 = store.getState()).onError) === null || _store$getState$onErr3 === void 0 || _store$getState$onErr3.call(_store$getState40, '009', errorMessages['error009'](type));
      return null;
    }
    return MarkerSymbols[type];
  }, [type]);
  return symbol;
}
var Marker = function Marker(_ref68) {
  var id = _ref68.id,
    type = _ref68.type,
    color = _ref68.color,
    _ref68$width = _ref68.width,
    width = _ref68$width === void 0 ? 12.5 : _ref68$width,
    _ref68$height = _ref68.height,
    height = _ref68$height === void 0 ? 12.5 : _ref68$height,
    _ref68$markerUnits = _ref68.markerUnits,
    markerUnits = _ref68$markerUnits === void 0 ? 'strokeWidth' : _ref68$markerUnits,
    strokeWidth = _ref68.strokeWidth,
    _ref68$orient = _ref68.orient,
    orient = _ref68$orient === void 0 ? 'auto-start-reverse' : _ref68$orient;
  var _Symbol = useMarkerSymbol(type);
  if (!_Symbol) {
    return null;
  }
  return /*#__PURE__*/react.createElement("marker", {
    className: "react-flow__arrowhead",
    id: id,
    markerWidth: "".concat(width),
    markerHeight: "".concat(height),
    viewBox: "-10 -10 20 20",
    markerUnits: markerUnits,
    orient: orient,
    refX: "0",
    refY: "0"
  }, /*#__PURE__*/react.createElement(_Symbol, {
    color: color,
    strokeWidth: strokeWidth
  }));
};
var markerSelector = function markerSelector(_ref69) {
  var defaultColor = _ref69.defaultColor,
    rfId = _ref69.rfId;
  return function (s) {
    var ids = [];
    return s.edges.reduce(function (markers, edge) {
      [edge.markerStart, edge.markerEnd].forEach(function (marker) {
        if (marker && _typeof(marker) === 'object') {
          var markerId = getMarkerId(marker, rfId);
          if (!ids.includes(markerId)) {
            markers.push(_objectSpread({
              id: markerId,
              color: marker.color || defaultColor
            }, marker));
            ids.push(markerId);
          }
        }
      });
      return markers;
    }, []).sort(function (a, b) {
      return a.id.localeCompare(b.id);
    });
  };
};
// when you have multiple flows on a page and you hide the first one, the other ones have no markers anymore
// when they do have markers with the same ids. To prevent this the user can pass a unique id to the react flow wrapper
// that we can then use for creating our unique marker ids
var MarkerDefinitions = function MarkerDefinitions(_ref70) {
  var defaultColor = _ref70.defaultColor,
    rfId = _ref70.rfId;
  var markers = useStore((0,react.useCallback)(markerSelector({
    defaultColor: defaultColor,
    rfId: rfId
  }), [defaultColor, rfId]),
  // the id includes all marker options, so we just need to look at that part of the marker
  function (a, b) {
    return !(a.length !== b.length || a.some(function (m, i) {
      return m.id !== b[i].id;
    }));
  });
  return /*#__PURE__*/react.createElement("defs", null, markers.map(function (marker) {
    return /*#__PURE__*/react.createElement(Marker, {
      id: marker.id,
      key: marker.id,
      type: marker.type,
      color: marker.color,
      width: marker.width,
      height: marker.height,
      markerUnits: marker.markerUnits,
      strokeWidth: marker.strokeWidth,
      orient: marker.orient
    });
  }));
};
MarkerDefinitions.displayName = 'MarkerDefinitions';
var MarkerDefinitions$1 = /*#__PURE__*/(0,react.memo)(MarkerDefinitions);
var selector$4 = function selector$4(s) {
  return {
    nodesConnectable: s.nodesConnectable,
    edgesFocusable: s.edgesFocusable,
    edgesUpdatable: s.edgesUpdatable,
    elementsSelectable: s.elementsSelectable,
    width: s.width,
    height: s.height,
    connectionMode: s.connectionMode,
    nodeInternals: s.nodeInternals,
    onError: s.onError
  };
};
var EdgeRenderer = function EdgeRenderer(_ref71) {
  var defaultMarkerColor = _ref71.defaultMarkerColor,
    onlyRenderVisibleElements = _ref71.onlyRenderVisibleElements,
    elevateEdgesOnSelect = _ref71.elevateEdgesOnSelect,
    rfId = _ref71.rfId,
    edgeTypes = _ref71.edgeTypes,
    noPanClassName = _ref71.noPanClassName,
    onEdgeUpdate = _ref71.onEdgeUpdate,
    onEdgeContextMenu = _ref71.onEdgeContextMenu,
    onEdgeMouseEnter = _ref71.onEdgeMouseEnter,
    onEdgeMouseMove = _ref71.onEdgeMouseMove,
    onEdgeMouseLeave = _ref71.onEdgeMouseLeave,
    onEdgeClick = _ref71.onEdgeClick,
    edgeUpdaterRadius = _ref71.edgeUpdaterRadius,
    onEdgeDoubleClick = _ref71.onEdgeDoubleClick,
    onEdgeUpdateStart = _ref71.onEdgeUpdateStart,
    onEdgeUpdateEnd = _ref71.onEdgeUpdateEnd,
    children = _ref71.children;
  var _useStore11 = useStore(selector$4, esm_shallow/* shallow */.x),
    edgesFocusable = _useStore11.edgesFocusable,
    edgesUpdatable = _useStore11.edgesUpdatable,
    elementsSelectable = _useStore11.elementsSelectable,
    width = _useStore11.width,
    height = _useStore11.height,
    connectionMode = _useStore11.connectionMode,
    nodeInternals = _useStore11.nodeInternals,
    onError = _useStore11.onError;
  var edgeTree = useVisibleEdges(onlyRenderVisibleElements, nodeInternals, elevateEdgesOnSelect);
  if (!width) {
    return null;
  }
  return /*#__PURE__*/react.createElement(react.Fragment, null, edgeTree.map(function (_ref72) {
    var level = _ref72.level,
      edges = _ref72.edges,
      isMaxLevel = _ref72.isMaxLevel;
    return /*#__PURE__*/react.createElement("svg", {
      key: level,
      style: {
        zIndex: level
      },
      width: width,
      height: height,
      className: "react-flow__edges react-flow__container"
    }, isMaxLevel && /*#__PURE__*/react.createElement(MarkerDefinitions$1, {
      defaultColor: defaultMarkerColor,
      rfId: rfId
    }), /*#__PURE__*/react.createElement("g", null, edges.map(function (edge) {
      var _targetHandleBounds$t, _targetHandleBounds$s;
      var _getNodeData = getNodeData(nodeInternals.get(edge.source)),
        _getNodeData2 = _slicedToArray(_getNodeData, 3),
        sourceNodeRect = _getNodeData2[0],
        sourceHandleBounds = _getNodeData2[1],
        sourceIsValid = _getNodeData2[2];
      var _getNodeData3 = getNodeData(nodeInternals.get(edge.target)),
        _getNodeData4 = _slicedToArray(_getNodeData3, 3),
        targetNodeRect = _getNodeData4[0],
        targetHandleBounds = _getNodeData4[1],
        targetIsValid = _getNodeData4[2];
      if (!sourceIsValid || !targetIsValid) {
        return null;
      }
      var edgeType = edge.type || 'default';
      if (!edgeTypes[edgeType]) {
        onError === null || onError === void 0 || onError('011', errorMessages['error011'](edgeType));
        edgeType = 'default';
      }
      var EdgeComponent = edgeTypes[edgeType] || edgeTypes.default;
      // when connection type is loose we can define all handles as sources and connect source -> source
      var targetNodeHandles = connectionMode === ConnectionMode.Strict ? targetHandleBounds.target : ((_targetHandleBounds$t = targetHandleBounds.target) !== null && _targetHandleBounds$t !== void 0 ? _targetHandleBounds$t : []).concat((_targetHandleBounds$s = targetHandleBounds.source) !== null && _targetHandleBounds$s !== void 0 ? _targetHandleBounds$s : []);
      var sourceHandle = getHandle(sourceHandleBounds.source, edge.sourceHandle);
      var targetHandle = getHandle(targetNodeHandles, edge.targetHandle);
      var sourcePosition = (sourceHandle === null || sourceHandle === void 0 ? void 0 : sourceHandle.position) || Position.Bottom;
      var targetPosition = (targetHandle === null || targetHandle === void 0 ? void 0 : targetHandle.position) || Position.Top;
      var isFocusable = !!(edge.focusable || edgesFocusable && typeof edge.focusable === 'undefined');
      var isUpdatable = typeof onEdgeUpdate !== 'undefined' && (edge.updatable || edgesUpdatable && typeof edge.updatable === 'undefined');
      if (!sourceHandle || !targetHandle) {
        onError === null || onError === void 0 || onError('008', errorMessages['error008'](sourceHandle, edge));
        return null;
      }
      var _getEdgePositions = getEdgePositions(sourceNodeRect, sourceHandle, sourcePosition, targetNodeRect, targetHandle, targetPosition),
        sourceX = _getEdgePositions.sourceX,
        sourceY = _getEdgePositions.sourceY,
        targetX = _getEdgePositions.targetX,
        targetY = _getEdgePositions.targetY;
      return /*#__PURE__*/react.createElement(EdgeComponent, {
        key: edge.id,
        id: edge.id,
        className: (0,classcat/* default */.A)([edge.className, noPanClassName]),
        type: edgeType,
        data: edge.data,
        selected: !!edge.selected,
        animated: !!edge.animated,
        hidden: !!edge.hidden,
        label: edge.label,
        labelStyle: edge.labelStyle,
        labelShowBg: edge.labelShowBg,
        labelBgStyle: edge.labelBgStyle,
        labelBgPadding: edge.labelBgPadding,
        labelBgBorderRadius: edge.labelBgBorderRadius,
        style: edge.style,
        source: edge.source,
        target: edge.target,
        sourceHandleId: edge.sourceHandle,
        targetHandleId: edge.targetHandle,
        markerEnd: edge.markerEnd,
        markerStart: edge.markerStart,
        sourceX: sourceX,
        sourceY: sourceY,
        targetX: targetX,
        targetY: targetY,
        sourcePosition: sourcePosition,
        targetPosition: targetPosition,
        elementsSelectable: elementsSelectable,
        onEdgeUpdate: onEdgeUpdate,
        onContextMenu: onEdgeContextMenu,
        onMouseEnter: onEdgeMouseEnter,
        onMouseMove: onEdgeMouseMove,
        onMouseLeave: onEdgeMouseLeave,
        onClick: onEdgeClick,
        edgeUpdaterRadius: edgeUpdaterRadius,
        onEdgeDoubleClick: onEdgeDoubleClick,
        onEdgeUpdateStart: onEdgeUpdateStart,
        onEdgeUpdateEnd: onEdgeUpdateEnd,
        rfId: rfId,
        ariaLabel: edge.ariaLabel,
        isFocusable: isFocusable,
        isUpdatable: isUpdatable,
        pathOptions: 'pathOptions' in edge ? edge.pathOptions : undefined,
        interactionWidth: edge.interactionWidth
      });
    })));
  }), children);
};
EdgeRenderer.displayName = 'EdgeRenderer';
var EdgeRenderer$1 = /*#__PURE__*/(0,react.memo)(EdgeRenderer);
var selector$3 = function selector$3(s) {
  return "translate(".concat(s.transform[0], "px,").concat(s.transform[1], "px) scale(").concat(s.transform[2], ")");
};
function Viewport(_ref73) {
  var children = _ref73.children;
  var transform = useStore(selector$3);
  return /*#__PURE__*/react.createElement("div", {
    className: "react-flow__viewport react-flow__container",
    style: {
      transform: transform
    }
  }, children);
}
function useOnInitHandler(onInit) {
  var rfInstance = useReactFlow();
  var isInitialized = (0,react.useRef)(false);
  (0,react.useEffect)(function () {
    if (!isInitialized.current && rfInstance.viewportInitialized && onInit) {
      setTimeout(function () {
        return onInit(rfInstance);
      }, 1);
      isInitialized.current = true;
    }
  }, [onInit, rfInstance.viewportInitialized]);
}
var oppositePosition = _defineProperty(_defineProperty(_defineProperty(_defineProperty({}, Position.Left, Position.Right), Position.Right, Position.Left), Position.Top, Position.Bottom), Position.Bottom, Position.Top);
var ConnectionLine = function ConnectionLine(_ref74) {
  var _fromNode$internalsSy, _fromNode$width, _fromNode$height, _fromNode$positionAbs, _fromNode$positionAbs2, _fromNode$positionAbs3, _fromNode$positionAbs4;
  var nodeId = _ref74.nodeId,
    handleType = _ref74.handleType,
    style = _ref74.style,
    _ref74$type = _ref74.type,
    type = _ref74$type === void 0 ? ConnectionLineType.Bezier : _ref74$type,
    CustomComponent = _ref74.CustomComponent,
    connectionStatus = _ref74.connectionStatus;
  var _useStore12 = useStore((0,react.useCallback)(function (s) {
      return {
        fromNode: s.nodeInternals.get(nodeId),
        handleId: s.connectionHandleId,
        toX: (s.connectionPosition.x - s.transform[0]) / s.transform[2],
        toY: (s.connectionPosition.y - s.transform[1]) / s.transform[2],
        connectionMode: s.connectionMode
      };
    }, [nodeId]), esm_shallow/* shallow */.x),
    fromNode = _useStore12.fromNode,
    handleId = _useStore12.handleId,
    toX = _useStore12.toX,
    toY = _useStore12.toY,
    connectionMode = _useStore12.connectionMode;
  var fromHandleBounds = fromNode === null || fromNode === void 0 || (_fromNode$internalsSy = fromNode[internalsSymbol]) === null || _fromNode$internalsSy === void 0 ? void 0 : _fromNode$internalsSy.handleBounds;
  var handleBounds = fromHandleBounds === null || fromHandleBounds === void 0 ? void 0 : fromHandleBounds[handleType];
  if (connectionMode === ConnectionMode.Loose) {
    handleBounds = handleBounds ? handleBounds : fromHandleBounds === null || fromHandleBounds === void 0 ? void 0 : fromHandleBounds[handleType === 'source' ? 'target' : 'source'];
  }
  if (!fromNode || !handleBounds) {
    return null;
  }
  var fromHandle = handleId ? handleBounds.find(function (d) {
    return d.id === handleId;
  }) : handleBounds[0];
  var fromHandleX = fromHandle ? fromHandle.x + fromHandle.width / 2 : ((_fromNode$width = fromNode.width) !== null && _fromNode$width !== void 0 ? _fromNode$width : 0) / 2;
  var fromHandleY = fromHandle ? fromHandle.y + fromHandle.height / 2 : (_fromNode$height = fromNode.height) !== null && _fromNode$height !== void 0 ? _fromNode$height : 0;
  var fromX = ((_fromNode$positionAbs = (_fromNode$positionAbs2 = fromNode.positionAbsolute) === null || _fromNode$positionAbs2 === void 0 ? void 0 : _fromNode$positionAbs2.x) !== null && _fromNode$positionAbs !== void 0 ? _fromNode$positionAbs : 0) + fromHandleX;
  var fromY = ((_fromNode$positionAbs3 = (_fromNode$positionAbs4 = fromNode.positionAbsolute) === null || _fromNode$positionAbs4 === void 0 ? void 0 : _fromNode$positionAbs4.y) !== null && _fromNode$positionAbs3 !== void 0 ? _fromNode$positionAbs3 : 0) + fromHandleY;
  var fromPosition = fromHandle === null || fromHandle === void 0 ? void 0 : fromHandle.position;
  var toPosition = fromPosition ? oppositePosition[fromPosition] : null;
  if (!fromPosition || !toPosition) {
    return null;
  }
  if (CustomComponent) {
    return /*#__PURE__*/react.createElement(CustomComponent, {
      connectionLineType: type,
      connectionLineStyle: style,
      fromNode: fromNode,
      fromHandle: fromHandle,
      fromX: fromX,
      fromY: fromY,
      toX: toX,
      toY: toY,
      fromPosition: fromPosition,
      toPosition: toPosition,
      connectionStatus: connectionStatus
    });
  }
  var dAttr = '';
  var pathParams = {
    sourceX: fromX,
    sourceY: fromY,
    sourcePosition: fromPosition,
    targetX: toX,
    targetY: toY,
    targetPosition: toPosition
  };
  if (type === ConnectionLineType.Bezier) {
    // we assume the destination position is opposite to the source position
    var _getBezierPath3 = getBezierPath(pathParams);
    var _getBezierPath4 = _slicedToArray(_getBezierPath3, 1);
    dAttr = _getBezierPath4[0];
  } else if (type === ConnectionLineType.Step) {
    var _getSmoothStepPath3 = getSmoothStepPath(_objectSpread(_objectSpread({}, pathParams), {}, {
      borderRadius: 0
    }));
    var _getSmoothStepPath4 = _slicedToArray(_getSmoothStepPath3, 1);
    dAttr = _getSmoothStepPath4[0];
  } else if (type === ConnectionLineType.SmoothStep) {
    var _getSmoothStepPath5 = getSmoothStepPath(pathParams);
    var _getSmoothStepPath6 = _slicedToArray(_getSmoothStepPath5, 1);
    dAttr = _getSmoothStepPath6[0];
  } else if (type === ConnectionLineType.SimpleBezier) {
    var _getSimpleBezierPath3 = getSimpleBezierPath(pathParams);
    var _getSimpleBezierPath4 = _slicedToArray(_getSimpleBezierPath3, 1);
    dAttr = _getSimpleBezierPath4[0];
  } else {
    dAttr = "M".concat(fromX, ",").concat(fromY, " ").concat(toX, ",").concat(toY);
  }
  return /*#__PURE__*/react.createElement("path", {
    d: dAttr,
    fill: "none",
    className: "react-flow__connection-path",
    style: style
  });
};
ConnectionLine.displayName = 'ConnectionLine';
var selector$2 = function selector$2(s) {
  return {
    nodeId: s.connectionNodeId,
    handleType: s.connectionHandleType,
    nodesConnectable: s.nodesConnectable,
    connectionStatus: s.connectionStatus,
    width: s.width,
    height: s.height
  };
};
function ConnectionLineWrapper(_ref75) {
  var containerStyle = _ref75.containerStyle,
    style = _ref75.style,
    type = _ref75.type,
    component = _ref75.component;
  var _useStore13 = useStore(selector$2, esm_shallow/* shallow */.x),
    nodeId = _useStore13.nodeId,
    handleType = _useStore13.handleType,
    nodesConnectable = _useStore13.nodesConnectable,
    width = _useStore13.width,
    height = _useStore13.height,
    connectionStatus = _useStore13.connectionStatus;
  var isValid = !!(nodeId && handleType && width && nodesConnectable);
  if (!isValid) {
    return null;
  }
  return /*#__PURE__*/react.createElement("svg", {
    style: containerStyle,
    width: width,
    height: height,
    className: "react-flow__edges react-flow__connectionline react-flow__container"
  }, /*#__PURE__*/react.createElement("g", {
    className: (0,classcat/* default */.A)(['react-flow__connection', connectionStatus])
  }, /*#__PURE__*/react.createElement(ConnectionLine, {
    nodeId: nodeId,
    handleType: handleType,
    style: style,
    type: type,
    CustomComponent: component,
    connectionStatus: connectionStatus
  })));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function useNodeOrEdgeTypes(nodeOrEdgeTypes, createTypes) {
  var typesKeysRef = (0,react.useRef)(null);
  var store = useStoreApi();
  var typesParsed = (0,react.useMemo)(function () {
    if (false) { var _store$getState$onErr4, _store$getState41, typeKeys; }
    return createTypes(nodeOrEdgeTypes);
  }, [nodeOrEdgeTypes]);
  return typesParsed;
}
var GraphView = function GraphView(_ref76) {
  var nodeTypes = _ref76.nodeTypes,
    edgeTypes = _ref76.edgeTypes,
    onMove = _ref76.onMove,
    onMoveStart = _ref76.onMoveStart,
    onMoveEnd = _ref76.onMoveEnd,
    onInit = _ref76.onInit,
    onNodeClick = _ref76.onNodeClick,
    onEdgeClick = _ref76.onEdgeClick,
    onNodeDoubleClick = _ref76.onNodeDoubleClick,
    onEdgeDoubleClick = _ref76.onEdgeDoubleClick,
    onNodeMouseEnter = _ref76.onNodeMouseEnter,
    onNodeMouseMove = _ref76.onNodeMouseMove,
    onNodeMouseLeave = _ref76.onNodeMouseLeave,
    onNodeContextMenu = _ref76.onNodeContextMenu,
    onSelectionContextMenu = _ref76.onSelectionContextMenu,
    onSelectionStart = _ref76.onSelectionStart,
    onSelectionEnd = _ref76.onSelectionEnd,
    connectionLineType = _ref76.connectionLineType,
    connectionLineStyle = _ref76.connectionLineStyle,
    connectionLineComponent = _ref76.connectionLineComponent,
    connectionLineContainerStyle = _ref76.connectionLineContainerStyle,
    selectionKeyCode = _ref76.selectionKeyCode,
    selectionOnDrag = _ref76.selectionOnDrag,
    selectionMode = _ref76.selectionMode,
    multiSelectionKeyCode = _ref76.multiSelectionKeyCode,
    panActivationKeyCode = _ref76.panActivationKeyCode,
    zoomActivationKeyCode = _ref76.zoomActivationKeyCode,
    deleteKeyCode = _ref76.deleteKeyCode,
    onlyRenderVisibleElements = _ref76.onlyRenderVisibleElements,
    elementsSelectable = _ref76.elementsSelectable,
    selectNodesOnDrag = _ref76.selectNodesOnDrag,
    defaultViewport = _ref76.defaultViewport,
    translateExtent = _ref76.translateExtent,
    minZoom = _ref76.minZoom,
    maxZoom = _ref76.maxZoom,
    preventScrolling = _ref76.preventScrolling,
    defaultMarkerColor = _ref76.defaultMarkerColor,
    zoomOnScroll = _ref76.zoomOnScroll,
    zoomOnPinch = _ref76.zoomOnPinch,
    panOnScroll = _ref76.panOnScroll,
    panOnScrollSpeed = _ref76.panOnScrollSpeed,
    panOnScrollMode = _ref76.panOnScrollMode,
    zoomOnDoubleClick = _ref76.zoomOnDoubleClick,
    panOnDrag = _ref76.panOnDrag,
    onPaneClick = _ref76.onPaneClick,
    onPaneMouseEnter = _ref76.onPaneMouseEnter,
    onPaneMouseMove = _ref76.onPaneMouseMove,
    onPaneMouseLeave = _ref76.onPaneMouseLeave,
    onPaneScroll = _ref76.onPaneScroll,
    onPaneContextMenu = _ref76.onPaneContextMenu,
    onEdgeUpdate = _ref76.onEdgeUpdate,
    onEdgeContextMenu = _ref76.onEdgeContextMenu,
    onEdgeMouseEnter = _ref76.onEdgeMouseEnter,
    onEdgeMouseMove = _ref76.onEdgeMouseMove,
    onEdgeMouseLeave = _ref76.onEdgeMouseLeave,
    edgeUpdaterRadius = _ref76.edgeUpdaterRadius,
    onEdgeUpdateStart = _ref76.onEdgeUpdateStart,
    onEdgeUpdateEnd = _ref76.onEdgeUpdateEnd,
    noDragClassName = _ref76.noDragClassName,
    noWheelClassName = _ref76.noWheelClassName,
    noPanClassName = _ref76.noPanClassName,
    elevateEdgesOnSelect = _ref76.elevateEdgesOnSelect,
    disableKeyboardA11y = _ref76.disableKeyboardA11y,
    nodeOrigin = _ref76.nodeOrigin,
    nodeExtent = _ref76.nodeExtent,
    rfId = _ref76.rfId;
  var nodeTypesWrapped = useNodeOrEdgeTypes(nodeTypes, createNodeTypes);
  var edgeTypesWrapped = useNodeOrEdgeTypes(edgeTypes, createEdgeTypes);
  useOnInitHandler(onInit);
  return /*#__PURE__*/react.createElement(FlowRenderer$1, {
    onPaneClick: onPaneClick,
    onPaneMouseEnter: onPaneMouseEnter,
    onPaneMouseMove: onPaneMouseMove,
    onPaneMouseLeave: onPaneMouseLeave,
    onPaneContextMenu: onPaneContextMenu,
    onPaneScroll: onPaneScroll,
    deleteKeyCode: deleteKeyCode,
    selectionKeyCode: selectionKeyCode,
    selectionOnDrag: selectionOnDrag,
    selectionMode: selectionMode,
    onSelectionStart: onSelectionStart,
    onSelectionEnd: onSelectionEnd,
    multiSelectionKeyCode: multiSelectionKeyCode,
    panActivationKeyCode: panActivationKeyCode,
    zoomActivationKeyCode: zoomActivationKeyCode,
    elementsSelectable: elementsSelectable,
    onMove: onMove,
    onMoveStart: onMoveStart,
    onMoveEnd: onMoveEnd,
    zoomOnScroll: zoomOnScroll,
    zoomOnPinch: zoomOnPinch,
    zoomOnDoubleClick: zoomOnDoubleClick,
    panOnScroll: panOnScroll,
    panOnScrollSpeed: panOnScrollSpeed,
    panOnScrollMode: panOnScrollMode,
    panOnDrag: panOnDrag,
    defaultViewport: defaultViewport,
    translateExtent: translateExtent,
    minZoom: minZoom,
    maxZoom: maxZoom,
    onSelectionContextMenu: onSelectionContextMenu,
    preventScrolling: preventScrolling,
    noDragClassName: noDragClassName,
    noWheelClassName: noWheelClassName,
    noPanClassName: noPanClassName,
    disableKeyboardA11y: disableKeyboardA11y
  }, /*#__PURE__*/react.createElement(Viewport, null, /*#__PURE__*/react.createElement(EdgeRenderer$1, {
    edgeTypes: edgeTypesWrapped,
    onEdgeClick: onEdgeClick,
    onEdgeDoubleClick: onEdgeDoubleClick,
    onEdgeUpdate: onEdgeUpdate,
    onlyRenderVisibleElements: onlyRenderVisibleElements,
    onEdgeContextMenu: onEdgeContextMenu,
    onEdgeMouseEnter: onEdgeMouseEnter,
    onEdgeMouseMove: onEdgeMouseMove,
    onEdgeMouseLeave: onEdgeMouseLeave,
    onEdgeUpdateStart: onEdgeUpdateStart,
    onEdgeUpdateEnd: onEdgeUpdateEnd,
    edgeUpdaterRadius: edgeUpdaterRadius,
    defaultMarkerColor: defaultMarkerColor,
    noPanClassName: noPanClassName,
    elevateEdgesOnSelect: !!elevateEdgesOnSelect,
    disableKeyboardA11y: disableKeyboardA11y,
    rfId: rfId
  }, /*#__PURE__*/react.createElement(ConnectionLineWrapper, {
    style: connectionLineStyle,
    type: connectionLineType,
    component: connectionLineComponent,
    containerStyle: connectionLineContainerStyle
  })), /*#__PURE__*/react.createElement("div", {
    className: "react-flow__edgelabel-renderer"
  }), /*#__PURE__*/react.createElement(NodeRenderer$1, {
    nodeTypes: nodeTypesWrapped,
    onNodeClick: onNodeClick,
    onNodeDoubleClick: onNodeDoubleClick,
    onNodeMouseEnter: onNodeMouseEnter,
    onNodeMouseMove: onNodeMouseMove,
    onNodeMouseLeave: onNodeMouseLeave,
    onNodeContextMenu: onNodeContextMenu,
    selectNodesOnDrag: selectNodesOnDrag,
    onlyRenderVisibleElements: onlyRenderVisibleElements,
    noPanClassName: noPanClassName,
    noDragClassName: noDragClassName,
    disableKeyboardA11y: disableKeyboardA11y,
    nodeOrigin: nodeOrigin,
    nodeExtent: nodeExtent,
    rfId: rfId
  })));
};
GraphView.displayName = 'GraphView';
var GraphView$1 = /*#__PURE__*/(0,react.memo)(GraphView);
var infiniteExtent = [[Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY], [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY]];
var initialState = {
  rfId: '1',
  width: 0,
  height: 0,
  transform: [0, 0, 1],
  nodeInternals: new Map(),
  edges: [],
  onNodesChange: null,
  onEdgesChange: null,
  hasDefaultNodes: false,
  hasDefaultEdges: false,
  d3Zoom: null,
  d3Selection: null,
  d3ZoomHandler: undefined,
  minZoom: 0.5,
  maxZoom: 2,
  translateExtent: infiniteExtent,
  nodeExtent: infiniteExtent,
  nodesSelectionActive: false,
  userSelectionActive: false,
  userSelectionRect: null,
  connectionNodeId: null,
  connectionHandleId: null,
  connectionHandleType: 'source',
  connectionPosition: {
    x: 0,
    y: 0
  },
  connectionStatus: null,
  connectionMode: ConnectionMode.Strict,
  domNode: null,
  paneDragging: false,
  noPanClassName: 'nopan',
  nodeOrigin: [0, 0],
  nodeDragThreshold: 0,
  snapGrid: [15, 15],
  snapToGrid: false,
  nodesDraggable: true,
  nodesConnectable: true,
  nodesFocusable: true,
  edgesFocusable: true,
  edgesUpdatable: true,
  elementsSelectable: true,
  elevateNodesOnSelect: true,
  fitViewOnInit: false,
  fitViewOnInitDone: false,
  fitViewOnInitOptions: undefined,
  onSelectionChange: [],
  multiSelectionActive: false,
  connectionStartHandle: null,
  connectionEndHandle: null,
  connectionClickStartHandle: null,
  connectOnClick: true,
  ariaLiveMessage: '',
  autoPanOnConnect: true,
  autoPanOnNodeDrag: true,
  connectionRadius: 20,
  onError: devWarn,
  isValidConnection: undefined
};
var createRFStore = function createRFStore() {
  return createWithEqualityFn(function (set, get) {
    return _objectSpread(_objectSpread({}, initialState), {}, {
      setNodes: function setNodes(nodes) {
        var _get3 = get(),
          nodeInternals = _get3.nodeInternals,
          nodeOrigin = _get3.nodeOrigin,
          elevateNodesOnSelect = _get3.elevateNodesOnSelect;
        set({
          nodeInternals: createNodeInternals(nodes, nodeInternals, nodeOrigin, elevateNodesOnSelect)
        });
      },
      getNodes: function getNodes() {
        return Array.from(get().nodeInternals.values());
      },
      setEdges: function setEdges(edges) {
        var _get4 = get(),
          _get4$defaultEdgeOpti = _get4.defaultEdgeOptions,
          defaultEdgeOptions = _get4$defaultEdgeOpti === void 0 ? {} : _get4$defaultEdgeOpti;
        set({
          edges: edges.map(function (e) {
            return _objectSpread(_objectSpread({}, defaultEdgeOptions), e);
          })
        });
      },
      setDefaultNodesAndEdges: function setDefaultNodesAndEdges(nodes, edges) {
        var hasDefaultNodes = typeof nodes !== 'undefined';
        var hasDefaultEdges = typeof edges !== 'undefined';
        var nodeInternals = hasDefaultNodes ? createNodeInternals(nodes, new Map(), get().nodeOrigin, get().elevateNodesOnSelect) : new Map();
        var nextEdges = hasDefaultEdges ? edges : [];
        set({
          nodeInternals: nodeInternals,
          edges: nextEdges,
          hasDefaultNodes: hasDefaultNodes,
          hasDefaultEdges: hasDefaultEdges
        });
      },
      updateNodeDimensions: function updateNodeDimensions(updates) {
        var _get5 = get(),
          onNodesChange = _get5.onNodesChange,
          nodeInternals = _get5.nodeInternals,
          fitViewOnInit = _get5.fitViewOnInit,
          fitViewOnInitDone = _get5.fitViewOnInitDone,
          fitViewOnInitOptions = _get5.fitViewOnInitOptions,
          domNode = _get5.domNode,
          nodeOrigin = _get5.nodeOrigin;
        var viewportNode = domNode === null || domNode === void 0 ? void 0 : domNode.querySelector('.react-flow__viewport');
        if (!viewportNode) {
          return;
        }
        var style = window.getComputedStyle(viewportNode);
        var _window$DOMMatrixRead = new window.DOMMatrixReadOnly(style.transform),
          zoom = _window$DOMMatrixRead.m22;
        var changes = updates.reduce(function (res, update) {
          var node = nodeInternals.get(update.id);
          if (node) {
            var dimensions = getDimensions(update.nodeElement);
            var doUpdate = !!(dimensions.width && dimensions.height && (node.width !== dimensions.width || node.height !== dimensions.height || update.forceUpdate));
            if (doUpdate) {
              nodeInternals.set(node.id, _objectSpread(_objectSpread({}, node), {}, _defineProperty({}, internalsSymbol, _objectSpread(_objectSpread({}, node[internalsSymbol]), {}, {
                handleBounds: {
                  source: getHandleBounds('.source', update.nodeElement, zoom, nodeOrigin),
                  target: getHandleBounds('.target', update.nodeElement, zoom, nodeOrigin)
                }
              })), dimensions));
              res.push({
                id: node.id,
                type: 'dimensions',
                dimensions: dimensions
              });
            }
          }
          return res;
        }, []);
        updateAbsoluteNodePositions(nodeInternals, nodeOrigin);
        var nextFitViewOnInitDone = fitViewOnInitDone || fitViewOnInit && !fitViewOnInitDone && _fitView(get, _objectSpread({
          initial: true
        }, fitViewOnInitOptions));
        set({
          nodeInternals: new Map(nodeInternals),
          fitViewOnInitDone: nextFitViewOnInitDone
        });
        if ((changes === null || changes === void 0 ? void 0 : changes.length) > 0) {
          onNodesChange === null || onNodesChange === void 0 || onNodesChange(changes);
        }
      },
      updateNodePositions: function updateNodePositions(nodeDragItems) {
        var positionChanged = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
        var dragging = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        var _get6 = get(),
          triggerNodeChanges = _get6.triggerNodeChanges;
        var changes = nodeDragItems.map(function (node) {
          var change = {
            id: node.id,
            type: 'position',
            dragging: dragging
          };
          if (positionChanged) {
            change.positionAbsolute = node.positionAbsolute;
            change.position = node.position;
          }
          return change;
        });
        triggerNodeChanges(changes);
      },
      triggerNodeChanges: function triggerNodeChanges(changes) {
        var _get7 = get(),
          onNodesChange = _get7.onNodesChange,
          nodeInternals = _get7.nodeInternals,
          hasDefaultNodes = _get7.hasDefaultNodes,
          nodeOrigin = _get7.nodeOrigin,
          getNodes = _get7.getNodes,
          elevateNodesOnSelect = _get7.elevateNodesOnSelect;
        if (changes !== null && changes !== void 0 && changes.length) {
          if (hasDefaultNodes) {
            var nodes = applyNodeChanges(changes, getNodes());
            var nextNodeInternals = createNodeInternals(nodes, nodeInternals, nodeOrigin, elevateNodesOnSelect);
            set({
              nodeInternals: nextNodeInternals
            });
          }
          onNodesChange === null || onNodesChange === void 0 || onNodesChange(changes);
        }
      },
      addSelectedNodes: function addSelectedNodes(selectedNodeIds) {
        var _get8 = get(),
          multiSelectionActive = _get8.multiSelectionActive,
          edges = _get8.edges,
          getNodes = _get8.getNodes;
        var changedNodes;
        var changedEdges = null;
        if (multiSelectionActive) {
          changedNodes = selectedNodeIds.map(function (nodeId) {
            return createSelectionChange(nodeId, true);
          });
        } else {
          changedNodes = getSelectionChanges(getNodes(), selectedNodeIds);
          changedEdges = getSelectionChanges(edges, []);
        }
        updateNodesAndEdgesSelections({
          changedNodes: changedNodes,
          changedEdges: changedEdges,
          get: get,
          set: set
        });
      },
      addSelectedEdges: function addSelectedEdges(selectedEdgeIds) {
        var _get9 = get(),
          multiSelectionActive = _get9.multiSelectionActive,
          edges = _get9.edges,
          getNodes = _get9.getNodes;
        var changedEdges;
        var changedNodes = null;
        if (multiSelectionActive) {
          changedEdges = selectedEdgeIds.map(function (edgeId) {
            return createSelectionChange(edgeId, true);
          });
        } else {
          changedEdges = getSelectionChanges(edges, selectedEdgeIds);
          changedNodes = getSelectionChanges(getNodes(), []);
        }
        updateNodesAndEdgesSelections({
          changedNodes: changedNodes,
          changedEdges: changedEdges,
          get: get,
          set: set
        });
      },
      unselectNodesAndEdges: function unselectNodesAndEdges() {
        var _ref77 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          nodes = _ref77.nodes,
          edges = _ref77.edges;
        var _get10 = get(),
          storeEdges = _get10.edges,
          getNodes = _get10.getNodes;
        var nodesToUnselect = nodes ? nodes : getNodes();
        var edgesToUnselect = edges ? edges : storeEdges;
        var changedNodes = nodesToUnselect.map(function (n) {
          n.selected = false;
          return createSelectionChange(n.id, false);
        });
        var changedEdges = edgesToUnselect.map(function (edge) {
          return createSelectionChange(edge.id, false);
        });
        updateNodesAndEdgesSelections({
          changedNodes: changedNodes,
          changedEdges: changedEdges,
          get: get,
          set: set
        });
      },
      setMinZoom: function setMinZoom(minZoom) {
        var _get11 = get(),
          d3Zoom = _get11.d3Zoom,
          maxZoom = _get11.maxZoom;
        d3Zoom === null || d3Zoom === void 0 || d3Zoom.scaleExtent([minZoom, maxZoom]);
        set({
          minZoom: minZoom
        });
      },
      setMaxZoom: function setMaxZoom(maxZoom) {
        var _get12 = get(),
          d3Zoom = _get12.d3Zoom,
          minZoom = _get12.minZoom;
        d3Zoom === null || d3Zoom === void 0 || d3Zoom.scaleExtent([minZoom, maxZoom]);
        set({
          maxZoom: maxZoom
        });
      },
      setTranslateExtent: function setTranslateExtent(translateExtent) {
        var _get$d3Zoom;
        (_get$d3Zoom = get().d3Zoom) === null || _get$d3Zoom === void 0 || _get$d3Zoom.translateExtent(translateExtent);
        set({
          translateExtent: translateExtent
        });
      },
      resetSelectedElements: function resetSelectedElements() {
        var _get13 = get(),
          edges = _get13.edges,
          getNodes = _get13.getNodes;
        var nodes = getNodes();
        var nodesToUnselect = nodes.filter(function (e) {
          return e.selected;
        }).map(function (n) {
          return createSelectionChange(n.id, false);
        });
        var edgesToUnselect = edges.filter(function (e) {
          return e.selected;
        }).map(function (e) {
          return createSelectionChange(e.id, false);
        });
        updateNodesAndEdgesSelections({
          changedNodes: nodesToUnselect,
          changedEdges: edgesToUnselect,
          get: get,
          set: set
        });
      },
      setNodeExtent: function setNodeExtent(nodeExtent) {
        var _get14 = get(),
          nodeInternals = _get14.nodeInternals;
        nodeInternals.forEach(function (node) {
          node.positionAbsolute = clampPosition(node.position, nodeExtent);
        });
        set({
          nodeExtent: nodeExtent,
          nodeInternals: new Map(nodeInternals)
        });
      },
      panBy: function panBy(delta) {
        var _get15 = get(),
          transform = _get15.transform,
          width = _get15.width,
          height = _get15.height,
          d3Zoom = _get15.d3Zoom,
          d3Selection = _get15.d3Selection,
          translateExtent = _get15.translateExtent;
        if (!d3Zoom || !d3Selection || !delta.x && !delta.y) {
          return false;
        }
        var nextTransform = src/* zoomIdentity */.GS.translate(transform[0] + delta.x, transform[1] + delta.y).scale(transform[2]);
        var extent = [[0, 0], [width, height]];
        var constrainedTransform = d3Zoom === null || d3Zoom === void 0 ? void 0 : d3Zoom.constrain()(nextTransform, extent, translateExtent);
        d3Zoom.transform(d3Selection, constrainedTransform);
        var transformChanged = transform[0] !== constrainedTransform.x || transform[1] !== constrainedTransform.y || transform[2] !== constrainedTransform.k;
        return transformChanged;
      },
      cancelConnection: function cancelConnection() {
        return set({
          connectionNodeId: initialState.connectionNodeId,
          connectionHandleId: initialState.connectionHandleId,
          connectionHandleType: initialState.connectionHandleType,
          connectionStatus: initialState.connectionStatus,
          connectionStartHandle: initialState.connectionStartHandle,
          connectionEndHandle: initialState.connectionEndHandle
        });
      },
      reset: function reset() {
        return set(_objectSpread({}, initialState));
      }
    });
  }, Object.is);
};
var ReactFlowProvider = function ReactFlowProvider(_ref78) {
  var children = _ref78.children;
  var storeRef = (0,react.useRef)(null);
  if (!storeRef.current) {
    storeRef.current = createRFStore();
  }
  return /*#__PURE__*/react.createElement(Provider$1, {
    value: storeRef.current
  }, children);
};
ReactFlowProvider.displayName = 'ReactFlowProvider';
var Wrapper = function Wrapper(_ref79) {
  var children = _ref79.children;
  var isWrapped = (0,react.useContext)(StoreContext);
  if (isWrapped) {
    // we need to wrap it with a fragment because it's not allowed for children to be a ReactNode
    // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/18051
    return /*#__PURE__*/react.createElement(react.Fragment, null, children);
  }
  return /*#__PURE__*/react.createElement(ReactFlowProvider, null, children);
};
Wrapper.displayName = 'ReactFlowWrapper';
var defaultNodeTypes = {
  input: InputNode$1,
  default: DefaultNode$1,
  output: OutputNode$1,
  group: GroupNode
};
var defaultEdgeTypes = {
  default: BezierEdge,
  straight: StraightEdge,
  step: StepEdge,
  smoothstep: SmoothStepEdge,
  simplebezier: SimpleBezierEdge
};
var initNodeOrigin = [0, 0];
var initSnapGrid = [15, 15];
var initDefaultViewport = {
  x: 0,
  y: 0,
  zoom: 1
};
var wrapperStyle = {
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  position: 'relative',
  zIndex: 0
};
var ReactFlow = /*#__PURE__*/(0,react.forwardRef)(function (_ref80, ref) {
  var nodes = _ref80.nodes,
    edges = _ref80.edges,
    defaultNodes = _ref80.defaultNodes,
    defaultEdges = _ref80.defaultEdges,
    className = _ref80.className,
    _ref80$nodeTypes = _ref80.nodeTypes,
    nodeTypes = _ref80$nodeTypes === void 0 ? defaultNodeTypes : _ref80$nodeTypes,
    _ref80$edgeTypes = _ref80.edgeTypes,
    edgeTypes = _ref80$edgeTypes === void 0 ? defaultEdgeTypes : _ref80$edgeTypes,
    onNodeClick = _ref80.onNodeClick,
    onEdgeClick = _ref80.onEdgeClick,
    onInit = _ref80.onInit,
    onMove = _ref80.onMove,
    onMoveStart = _ref80.onMoveStart,
    onMoveEnd = _ref80.onMoveEnd,
    onConnect = _ref80.onConnect,
    onConnectStart = _ref80.onConnectStart,
    onConnectEnd = _ref80.onConnectEnd,
    onClickConnectStart = _ref80.onClickConnectStart,
    onClickConnectEnd = _ref80.onClickConnectEnd,
    onNodeMouseEnter = _ref80.onNodeMouseEnter,
    onNodeMouseMove = _ref80.onNodeMouseMove,
    onNodeMouseLeave = _ref80.onNodeMouseLeave,
    onNodeContextMenu = _ref80.onNodeContextMenu,
    onNodeDoubleClick = _ref80.onNodeDoubleClick,
    onNodeDragStart = _ref80.onNodeDragStart,
    onNodeDrag = _ref80.onNodeDrag,
    onNodeDragStop = _ref80.onNodeDragStop,
    onNodesDelete = _ref80.onNodesDelete,
    onEdgesDelete = _ref80.onEdgesDelete,
    onSelectionChange = _ref80.onSelectionChange,
    onSelectionDragStart = _ref80.onSelectionDragStart,
    onSelectionDrag = _ref80.onSelectionDrag,
    onSelectionDragStop = _ref80.onSelectionDragStop,
    onSelectionContextMenu = _ref80.onSelectionContextMenu,
    onSelectionStart = _ref80.onSelectionStart,
    onSelectionEnd = _ref80.onSelectionEnd,
    _ref80$connectionMode = _ref80.connectionMode,
    connectionMode = _ref80$connectionMode === void 0 ? ConnectionMode.Strict : _ref80$connectionMode,
    _ref80$connectionLine = _ref80.connectionLineType,
    connectionLineType = _ref80$connectionLine === void 0 ? ConnectionLineType.Bezier : _ref80$connectionLine,
    connectionLineStyle = _ref80.connectionLineStyle,
    connectionLineComponent = _ref80.connectionLineComponent,
    connectionLineContainerStyle = _ref80.connectionLineContainerStyle,
    _ref80$deleteKeyCode = _ref80.deleteKeyCode,
    deleteKeyCode = _ref80$deleteKeyCode === void 0 ? 'Backspace' : _ref80$deleteKeyCode,
    _ref80$selectionKeyCo = _ref80.selectionKeyCode,
    selectionKeyCode = _ref80$selectionKeyCo === void 0 ? 'Shift' : _ref80$selectionKeyCo,
    _ref80$selectionOnDra = _ref80.selectionOnDrag,
    selectionOnDrag = _ref80$selectionOnDra === void 0 ? false : _ref80$selectionOnDra,
    _ref80$selectionMode = _ref80.selectionMode,
    selectionMode = _ref80$selectionMode === void 0 ? SelectionMode.Full : _ref80$selectionMode,
    _ref80$panActivationK = _ref80.panActivationKeyCode,
    panActivationKeyCode = _ref80$panActivationK === void 0 ? 'Space' : _ref80$panActivationK,
    _ref80$multiSelection = _ref80.multiSelectionKeyCode,
    multiSelectionKeyCode = _ref80$multiSelection === void 0 ? isMacOs() ? 'Meta' : 'Control' : _ref80$multiSelection,
    _ref80$zoomActivation = _ref80.zoomActivationKeyCode,
    zoomActivationKeyCode = _ref80$zoomActivation === void 0 ? isMacOs() ? 'Meta' : 'Control' : _ref80$zoomActivation,
    _ref80$snapToGrid = _ref80.snapToGrid,
    snapToGrid = _ref80$snapToGrid === void 0 ? false : _ref80$snapToGrid,
    _ref80$snapGrid = _ref80.snapGrid,
    snapGrid = _ref80$snapGrid === void 0 ? initSnapGrid : _ref80$snapGrid,
    _ref80$onlyRenderVisi = _ref80.onlyRenderVisibleElements,
    onlyRenderVisibleElements = _ref80$onlyRenderVisi === void 0 ? false : _ref80$onlyRenderVisi,
    _ref80$selectNodesOnD = _ref80.selectNodesOnDrag,
    selectNodesOnDrag = _ref80$selectNodesOnD === void 0 ? true : _ref80$selectNodesOnD,
    nodesDraggable = _ref80.nodesDraggable,
    nodesConnectable = _ref80.nodesConnectable,
    nodesFocusable = _ref80.nodesFocusable,
    _ref80$nodeOrigin = _ref80.nodeOrigin,
    nodeOrigin = _ref80$nodeOrigin === void 0 ? initNodeOrigin : _ref80$nodeOrigin,
    edgesFocusable = _ref80.edgesFocusable,
    edgesUpdatable = _ref80.edgesUpdatable,
    elementsSelectable = _ref80.elementsSelectable,
    _ref80$defaultViewpor = _ref80.defaultViewport,
    defaultViewport = _ref80$defaultViewpor === void 0 ? initDefaultViewport : _ref80$defaultViewpor,
    _ref80$minZoom = _ref80.minZoom,
    minZoom = _ref80$minZoom === void 0 ? 0.5 : _ref80$minZoom,
    _ref80$maxZoom = _ref80.maxZoom,
    maxZoom = _ref80$maxZoom === void 0 ? 2 : _ref80$maxZoom,
    _ref80$translateExten = _ref80.translateExtent,
    translateExtent = _ref80$translateExten === void 0 ? infiniteExtent : _ref80$translateExten,
    _ref80$preventScrolli = _ref80.preventScrolling,
    preventScrolling = _ref80$preventScrolli === void 0 ? true : _ref80$preventScrolli,
    nodeExtent = _ref80.nodeExtent,
    _ref80$defaultMarkerC = _ref80.defaultMarkerColor,
    defaultMarkerColor = _ref80$defaultMarkerC === void 0 ? '#b1b1b7' : _ref80$defaultMarkerC,
    _ref80$zoomOnScroll = _ref80.zoomOnScroll,
    zoomOnScroll = _ref80$zoomOnScroll === void 0 ? true : _ref80$zoomOnScroll,
    _ref80$zoomOnPinch = _ref80.zoomOnPinch,
    zoomOnPinch = _ref80$zoomOnPinch === void 0 ? true : _ref80$zoomOnPinch,
    _ref80$panOnScroll = _ref80.panOnScroll,
    panOnScroll = _ref80$panOnScroll === void 0 ? false : _ref80$panOnScroll,
    _ref80$panOnScrollSpe = _ref80.panOnScrollSpeed,
    panOnScrollSpeed = _ref80$panOnScrollSpe === void 0 ? 0.5 : _ref80$panOnScrollSpe,
    _ref80$panOnScrollMod = _ref80.panOnScrollMode,
    panOnScrollMode = _ref80$panOnScrollMod === void 0 ? PanOnScrollMode.Free : _ref80$panOnScrollMod,
    _ref80$zoomOnDoubleCl = _ref80.zoomOnDoubleClick,
    zoomOnDoubleClick = _ref80$zoomOnDoubleCl === void 0 ? true : _ref80$zoomOnDoubleCl,
    _ref80$panOnDrag = _ref80.panOnDrag,
    panOnDrag = _ref80$panOnDrag === void 0 ? true : _ref80$panOnDrag,
    onPaneClick = _ref80.onPaneClick,
    onPaneMouseEnter = _ref80.onPaneMouseEnter,
    onPaneMouseMove = _ref80.onPaneMouseMove,
    onPaneMouseLeave = _ref80.onPaneMouseLeave,
    onPaneScroll = _ref80.onPaneScroll,
    onPaneContextMenu = _ref80.onPaneContextMenu,
    children = _ref80.children,
    onEdgeUpdate = _ref80.onEdgeUpdate,
    onEdgeContextMenu = _ref80.onEdgeContextMenu,
    onEdgeDoubleClick = _ref80.onEdgeDoubleClick,
    onEdgeMouseEnter = _ref80.onEdgeMouseEnter,
    onEdgeMouseMove = _ref80.onEdgeMouseMove,
    onEdgeMouseLeave = _ref80.onEdgeMouseLeave,
    onEdgeUpdateStart = _ref80.onEdgeUpdateStart,
    onEdgeUpdateEnd = _ref80.onEdgeUpdateEnd,
    _ref80$edgeUpdaterRad = _ref80.edgeUpdaterRadius,
    edgeUpdaterRadius = _ref80$edgeUpdaterRad === void 0 ? 10 : _ref80$edgeUpdaterRad,
    onNodesChange = _ref80.onNodesChange,
    onEdgesChange = _ref80.onEdgesChange,
    _ref80$noDragClassNam = _ref80.noDragClassName,
    noDragClassName = _ref80$noDragClassNam === void 0 ? 'nodrag' : _ref80$noDragClassNam,
    _ref80$noWheelClassNa = _ref80.noWheelClassName,
    noWheelClassName = _ref80$noWheelClassNa === void 0 ? 'nowheel' : _ref80$noWheelClassNa,
    _ref80$noPanClassName = _ref80.noPanClassName,
    noPanClassName = _ref80$noPanClassName === void 0 ? 'nopan' : _ref80$noPanClassName,
    _ref80$fitView = _ref80.fitView,
    fitView = _ref80$fitView === void 0 ? false : _ref80$fitView,
    fitViewOptions = _ref80.fitViewOptions,
    _ref80$connectOnClick = _ref80.connectOnClick,
    connectOnClick = _ref80$connectOnClick === void 0 ? true : _ref80$connectOnClick,
    attributionPosition = _ref80.attributionPosition,
    proOptions = _ref80.proOptions,
    defaultEdgeOptions = _ref80.defaultEdgeOptions,
    _ref80$elevateNodesOn = _ref80.elevateNodesOnSelect,
    elevateNodesOnSelect = _ref80$elevateNodesOn === void 0 ? true : _ref80$elevateNodesOn,
    _ref80$elevateEdgesOn = _ref80.elevateEdgesOnSelect,
    elevateEdgesOnSelect = _ref80$elevateEdgesOn === void 0 ? false : _ref80$elevateEdgesOn,
    _ref80$disableKeyboar = _ref80.disableKeyboardA11y,
    disableKeyboardA11y = _ref80$disableKeyboar === void 0 ? false : _ref80$disableKeyboar,
    _ref80$autoPanOnConne = _ref80.autoPanOnConnect,
    autoPanOnConnect = _ref80$autoPanOnConne === void 0 ? true : _ref80$autoPanOnConne,
    _ref80$autoPanOnNodeD = _ref80.autoPanOnNodeDrag,
    autoPanOnNodeDrag = _ref80$autoPanOnNodeD === void 0 ? true : _ref80$autoPanOnNodeD,
    _ref80$connectionRadi = _ref80.connectionRadius,
    connectionRadius = _ref80$connectionRadi === void 0 ? 20 : _ref80$connectionRadi,
    isValidConnection = _ref80.isValidConnection,
    onError = _ref80.onError,
    style = _ref80.style,
    id = _ref80.id,
    nodeDragThreshold = _ref80.nodeDragThreshold,
    rest = _objectWithoutProperties(_ref80, _excluded5);
  var rfId = id || '1';
  return /*#__PURE__*/react.createElement("div", _objectSpread(_objectSpread({}, rest), {}, {
    style: _objectSpread(_objectSpread({}, style), wrapperStyle),
    ref: ref,
    className: (0,classcat/* default */.A)(['react-flow', className]),
    "data-testid": "rf__wrapper",
    id: id
  }), /*#__PURE__*/react.createElement(Wrapper, null, /*#__PURE__*/react.createElement(GraphView$1, {
    onInit: onInit,
    onMove: onMove,
    onMoveStart: onMoveStart,
    onMoveEnd: onMoveEnd,
    onNodeClick: onNodeClick,
    onEdgeClick: onEdgeClick,
    onNodeMouseEnter: onNodeMouseEnter,
    onNodeMouseMove: onNodeMouseMove,
    onNodeMouseLeave: onNodeMouseLeave,
    onNodeContextMenu: onNodeContextMenu,
    onNodeDoubleClick: onNodeDoubleClick,
    nodeTypes: nodeTypes,
    edgeTypes: edgeTypes,
    connectionLineType: connectionLineType,
    connectionLineStyle: connectionLineStyle,
    connectionLineComponent: connectionLineComponent,
    connectionLineContainerStyle: connectionLineContainerStyle,
    selectionKeyCode: selectionKeyCode,
    selectionOnDrag: selectionOnDrag,
    selectionMode: selectionMode,
    deleteKeyCode: deleteKeyCode,
    multiSelectionKeyCode: multiSelectionKeyCode,
    panActivationKeyCode: panActivationKeyCode,
    zoomActivationKeyCode: zoomActivationKeyCode,
    onlyRenderVisibleElements: onlyRenderVisibleElements,
    selectNodesOnDrag: selectNodesOnDrag,
    defaultViewport: defaultViewport,
    translateExtent: translateExtent,
    minZoom: minZoom,
    maxZoom: maxZoom,
    preventScrolling: preventScrolling,
    zoomOnScroll: zoomOnScroll,
    zoomOnPinch: zoomOnPinch,
    zoomOnDoubleClick: zoomOnDoubleClick,
    panOnScroll: panOnScroll,
    panOnScrollSpeed: panOnScrollSpeed,
    panOnScrollMode: panOnScrollMode,
    panOnDrag: panOnDrag,
    onPaneClick: onPaneClick,
    onPaneMouseEnter: onPaneMouseEnter,
    onPaneMouseMove: onPaneMouseMove,
    onPaneMouseLeave: onPaneMouseLeave,
    onPaneScroll: onPaneScroll,
    onPaneContextMenu: onPaneContextMenu,
    onSelectionContextMenu: onSelectionContextMenu,
    onSelectionStart: onSelectionStart,
    onSelectionEnd: onSelectionEnd,
    onEdgeUpdate: onEdgeUpdate,
    onEdgeContextMenu: onEdgeContextMenu,
    onEdgeDoubleClick: onEdgeDoubleClick,
    onEdgeMouseEnter: onEdgeMouseEnter,
    onEdgeMouseMove: onEdgeMouseMove,
    onEdgeMouseLeave: onEdgeMouseLeave,
    onEdgeUpdateStart: onEdgeUpdateStart,
    onEdgeUpdateEnd: onEdgeUpdateEnd,
    edgeUpdaterRadius: edgeUpdaterRadius,
    defaultMarkerColor: defaultMarkerColor,
    noDragClassName: noDragClassName,
    noWheelClassName: noWheelClassName,
    noPanClassName: noPanClassName,
    elevateEdgesOnSelect: elevateEdgesOnSelect,
    rfId: rfId,
    disableKeyboardA11y: disableKeyboardA11y,
    nodeOrigin: nodeOrigin,
    nodeExtent: nodeExtent
  }), /*#__PURE__*/react.createElement(StoreUpdater, {
    nodes: nodes,
    edges: edges,
    defaultNodes: defaultNodes,
    defaultEdges: defaultEdges,
    onConnect: onConnect,
    onConnectStart: onConnectStart,
    onConnectEnd: onConnectEnd,
    onClickConnectStart: onClickConnectStart,
    onClickConnectEnd: onClickConnectEnd,
    nodesDraggable: nodesDraggable,
    nodesConnectable: nodesConnectable,
    nodesFocusable: nodesFocusable,
    edgesFocusable: edgesFocusable,
    edgesUpdatable: edgesUpdatable,
    elementsSelectable: elementsSelectable,
    elevateNodesOnSelect: elevateNodesOnSelect,
    minZoom: minZoom,
    maxZoom: maxZoom,
    nodeExtent: nodeExtent,
    onNodesChange: onNodesChange,
    onEdgesChange: onEdgesChange,
    snapToGrid: snapToGrid,
    snapGrid: snapGrid,
    connectionMode: connectionMode,
    translateExtent: translateExtent,
    connectOnClick: connectOnClick,
    defaultEdgeOptions: defaultEdgeOptions,
    fitView: fitView,
    fitViewOptions: fitViewOptions,
    onNodesDelete: onNodesDelete,
    onEdgesDelete: onEdgesDelete,
    onNodeDragStart: onNodeDragStart,
    onNodeDrag: onNodeDrag,
    onNodeDragStop: onNodeDragStop,
    onSelectionDrag: onSelectionDrag,
    onSelectionDragStart: onSelectionDragStart,
    onSelectionDragStop: onSelectionDragStop,
    noPanClassName: noPanClassName,
    nodeOrigin: nodeOrigin,
    rfId: rfId,
    autoPanOnConnect: autoPanOnConnect,
    autoPanOnNodeDrag: autoPanOnNodeDrag,
    onError: onError,
    connectionRadius: connectionRadius,
    isValidConnection: isValidConnection,
    nodeDragThreshold: nodeDragThreshold
  }), /*#__PURE__*/react.createElement(Wrapper$1, {
    onSelectionChange: onSelectionChange
  }), children, /*#__PURE__*/react.createElement(Attribution, {
    proOptions: proOptions,
    position: attributionPosition
  }), /*#__PURE__*/react.createElement(A11yDescriptions, {
    rfId: rfId,
    disableKeyboardA11y: disableKeyboardA11y
  })));
});
ReactFlow.displayName = 'ReactFlow';
var selector$1 = function selector$1(s) {
  var _s$domNode;
  return (_s$domNode = s.domNode) === null || _s$domNode === void 0 ? void 0 : _s$domNode.querySelector('.react-flow__edgelabel-renderer');
};
function EdgeLabelRenderer(_ref81) {
  var children = _ref81.children;
  var edgeLabelRenderer = useStore(selector$1);
  if (!edgeLabelRenderer) {
    return null;
  }
  return /*#__PURE__*/(0,react_dom.createPortal)(children, edgeLabelRenderer);
}
function useUpdateNodeInternals() {
  var store = useStoreApi();
  return useCallback(function (id) {
    var _store$getState42 = store.getState(),
      domNode = _store$getState42.domNode,
      updateNodeDimensions = _store$getState42.updateNodeDimensions;
    var updateIds = Array.isArray(id) ? id : [id];
    var updates = updateIds.reduce(function (res, updateId) {
      var nodeElement = domNode === null || domNode === void 0 ? void 0 : domNode.querySelector(".react-flow__node[data-id=\"".concat(updateId, "\"]"));
      if (nodeElement) {
        res.push({
          id: updateId,
          nodeElement: nodeElement,
          forceUpdate: true
        });
      }
      return res;
    }, []);
    requestAnimationFrame(function () {
      return updateNodeDimensions(updates);
    });
  }, []);
}
var nodesSelector = function nodesSelector(state) {
  return state.getNodes();
};
function useNodes() {
  var nodes = useStore(nodesSelector, shallow);
  return nodes;
}
var edgesSelector = function edgesSelector(state) {
  return state.edges;
};
function useEdges() {
  var edges = useStore(edgesSelector, shallow);
  return edges;
}
var viewportSelector = function viewportSelector(state) {
  return {
    x: state.transform[0],
    y: state.transform[1],
    zoom: state.transform[2]
  };
};
function useViewport() {
  var viewport = useStore(viewportSelector, shallow);
  return viewport;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
function createUseItemsState(applyChanges) {
  return function (initialItems) {
    var _useState11 = (0,react.useState)(initialItems),
      _useState12 = _slicedToArray(_useState11, 2),
      items = _useState12[0],
      setItems = _useState12[1];
    var onItemsChange = (0,react.useCallback)(function (changes) {
      return setItems(function (items) {
        return applyChanges(changes, items);
      });
    }, []);
    return [items, setItems, onItemsChange];
  };
}
var useNodesState = createUseItemsState(applyNodeChanges);
var useEdgesState = createUseItemsState(applyEdgeChanges);
function useOnViewportChange(_ref82) {
  var onStart = _ref82.onStart,
    onChange = _ref82.onChange,
    onEnd = _ref82.onEnd;
  var store = useStoreApi();
  useEffect(function () {
    store.setState({
      onViewportChangeStart: onStart
    });
  }, [onStart]);
  useEffect(function () {
    store.setState({
      onViewportChange: onChange
    });
  }, [onChange]);
  useEffect(function () {
    store.setState({
      onViewportChangeEnd: onEnd
    });
  }, [onEnd]);
}
function useOnSelectionChange(_ref83) {
  var onChange = _ref83.onChange;
  var store = useStoreApi();
  (0,react.useEffect)(function () {
    var nextSelectionChangeHandlers = [].concat(_toConsumableArray(store.getState().onSelectionChange), [onChange]);
    store.setState({
      onSelectionChange: nextSelectionChangeHandlers
    });
    return function () {
      var nextHandlers = store.getState().onSelectionChange.filter(function (fn) {
        return fn !== onChange;
      });
      store.setState({
        onSelectionChange: nextHandlers
      });
    };
  }, [onChange]);
}
var selector = function selector(options) {
  return function (s) {
    if (s.nodeInternals.size === 0) {
      return false;
    }
    return s.getNodes().filter(function (n) {
      return options.includeHiddenNodes ? true : !n.hidden;
    }).every(function (n) {
      var _n$internalsSymbol;
      return ((_n$internalsSymbol = n[internalsSymbol]) === null || _n$internalsSymbol === void 0 ? void 0 : _n$internalsSymbol.handleBounds) !== undefined;
    });
  };
};
var defaultOptions = {
  includeHiddenNodes: false
};
function useNodesInitialized() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultOptions;
  var initialized = useStore(selector(options));
  return initialized;
}


/***/ }),

/***/ 89039:
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   o: function() { return /* binding */ MiniMap$1; }
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(14552);
/* harmony import */ var classcat__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(47754);
/* harmony import */ var zustand_shallow__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(33753);
/* harmony import */ var d3_zoom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(69741);
/* harmony import */ var d3_selection__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(65633);
/* harmony import */ var d3_selection__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(71137);
/* harmony import */ var _reactflow_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(95594);






var MiniMapNode = function MiniMapNode(_ref) {
  var id = _ref.id,
    x = _ref.x,
    y = _ref.y,
    width = _ref.width,
    height = _ref.height,
    style = _ref.style,
    color = _ref.color,
    strokeColor = _ref.strokeColor,
    strokeWidth = _ref.strokeWidth,
    className = _ref.className,
    borderRadius = _ref.borderRadius,
    shapeRendering = _ref.shapeRendering,
    onClick = _ref.onClick,
    selected = _ref.selected;
  var _ref2 = style || {},
    background = _ref2.background,
    backgroundColor = _ref2.backgroundColor;
  var fill = color || background || backgroundColor;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("rect", {
    className: (0,classcat__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A)(['react-flow__minimap-node', {
      selected: selected
    }, className]),
    x: x,
    y: y,
    rx: borderRadius,
    ry: borderRadius,
    width: width,
    height: height,
    fill: fill,
    stroke: strokeColor,
    strokeWidth: strokeWidth,
    shapeRendering: shapeRendering,
    onClick: onClick ? function (event) {
      return onClick(event, id);
    } : undefined
  });
};
MiniMapNode.displayName = 'MiniMapNode';
var MiniMapNode$1 = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.memo)(MiniMapNode);

/* eslint-disable @typescript-eslint/ban-ts-comment */
var selector$1 = function selector$1(s) {
  return s.nodeOrigin;
};
var selectorNodes = function selectorNodes(s) {
  return s.getNodes().filter(function (node) {
    return !node.hidden && node.width && node.height;
  });
};
var getAttrFunction = function getAttrFunction(func) {
  return func instanceof Function ? func : function () {
    return func;
  };
};
function MiniMapNodes(_ref3) {
  var _ref3$nodeStrokeColor = _ref3.nodeStrokeColor,
    nodeStrokeColor = _ref3$nodeStrokeColor === void 0 ? 'transparent' : _ref3$nodeStrokeColor,
    _ref3$nodeColor = _ref3.nodeColor,
    nodeColor = _ref3$nodeColor === void 0 ? '#e2e2e2' : _ref3$nodeColor,
    _ref3$nodeClassName = _ref3.nodeClassName,
    nodeClassName = _ref3$nodeClassName === void 0 ? '' : _ref3$nodeClassName,
    _ref3$nodeBorderRadiu = _ref3.nodeBorderRadius,
    nodeBorderRadius = _ref3$nodeBorderRadiu === void 0 ? 5 : _ref3$nodeBorderRadiu,
    _ref3$nodeStrokeWidth = _ref3.nodeStrokeWidth,
    nodeStrokeWidth = _ref3$nodeStrokeWidth === void 0 ? 2 : _ref3$nodeStrokeWidth,
    _ref3$nodeComponent = _ref3.nodeComponent,
    NodeComponent = _ref3$nodeComponent === void 0 ? MiniMapNode$1 : _ref3$nodeComponent,
    onClick = _ref3.onClick;
  var nodes = (0,_reactflow_core__WEBPACK_IMPORTED_MODULE_3__/* .useStore */ .Pj)(selectorNodes, zustand_shallow__WEBPACK_IMPORTED_MODULE_4__/* .shallow */ .x);
  var nodeOrigin = (0,_reactflow_core__WEBPACK_IMPORTED_MODULE_3__/* .useStore */ .Pj)(selector$1);
  var nodeColorFunc = getAttrFunction(nodeColor);
  var nodeStrokeColorFunc = getAttrFunction(nodeStrokeColor);
  var nodeClassNameFunc = getAttrFunction(nodeClassName);
  var shapeRendering = typeof window === 'undefined' || !!window.chrome ? 'crispEdges' : 'geometricPrecision';
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, nodes.map(function (node) {
    var _getNodePositionWithO = (0,_reactflow_core__WEBPACK_IMPORTED_MODULE_3__/* .getNodePositionWithOrigin */ .Cz)(node, nodeOrigin).positionAbsolute,
      x = _getNodePositionWithO.x,
      y = _getNodePositionWithO.y;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(NodeComponent, {
      key: node.id,
      x: x,
      y: y,
      width: node.width,
      height: node.height,
      style: node.style,
      selected: node.selected,
      className: nodeClassNameFunc(node),
      color: nodeColorFunc(node),
      borderRadius: nodeBorderRadius,
      strokeColor: nodeStrokeColorFunc(node),
      strokeWidth: nodeStrokeWidth,
      shapeRendering: shapeRendering,
      onClick: onClick,
      id: node.id
    });
  }));
}
var MiniMapNodes$1 = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.memo)(MiniMapNodes);

/* eslint-disable @typescript-eslint/ban-ts-comment */
var defaultWidth = 200;
var defaultHeight = 150;
var selector = function selector(s) {
  var nodes = s.getNodes();
  var viewBB = {
    x: -s.transform[0] / s.transform[2],
    y: -s.transform[1] / s.transform[2],
    width: s.width / s.transform[2],
    height: s.height / s.transform[2]
  };
  return {
    viewBB: viewBB,
    boundingRect: nodes.length > 0 ? (0,_reactflow_core__WEBPACK_IMPORTED_MODULE_3__/* .getBoundsOfRects */ .Mi)((0,_reactflow_core__WEBPACK_IMPORTED_MODULE_3__/* .getNodesBounds */ .Jo)(nodes, s.nodeOrigin), viewBB) : viewBB,
    rfId: s.rfId
  };
};
var ARIA_LABEL_KEY = 'react-flow__minimap-desc';
function MiniMap(_ref4) {
  var _style$width, _style$height;
  var style = _ref4.style,
    className = _ref4.className,
    _ref4$nodeStrokeColor = _ref4.nodeStrokeColor,
    nodeStrokeColor = _ref4$nodeStrokeColor === void 0 ? 'transparent' : _ref4$nodeStrokeColor,
    _ref4$nodeColor = _ref4.nodeColor,
    nodeColor = _ref4$nodeColor === void 0 ? '#e2e2e2' : _ref4$nodeColor,
    _ref4$nodeClassName = _ref4.nodeClassName,
    nodeClassName = _ref4$nodeClassName === void 0 ? '' : _ref4$nodeClassName,
    _ref4$nodeBorderRadiu = _ref4.nodeBorderRadius,
    nodeBorderRadius = _ref4$nodeBorderRadiu === void 0 ? 5 : _ref4$nodeBorderRadiu,
    _ref4$nodeStrokeWidth = _ref4.nodeStrokeWidth,
    nodeStrokeWidth = _ref4$nodeStrokeWidth === void 0 ? 2 : _ref4$nodeStrokeWidth,
    nodeComponent = _ref4.nodeComponent,
    _ref4$maskColor = _ref4.maskColor,
    maskColor = _ref4$maskColor === void 0 ? 'rgb(240, 240, 240, 0.6)' : _ref4$maskColor,
    _ref4$maskStrokeColor = _ref4.maskStrokeColor,
    maskStrokeColor = _ref4$maskStrokeColor === void 0 ? 'none' : _ref4$maskStrokeColor,
    _ref4$maskStrokeWidth = _ref4.maskStrokeWidth,
    maskStrokeWidth = _ref4$maskStrokeWidth === void 0 ? 1 : _ref4$maskStrokeWidth,
    _ref4$position = _ref4.position,
    position = _ref4$position === void 0 ? 'bottom-right' : _ref4$position,
    onClick = _ref4.onClick,
    onNodeClick = _ref4.onNodeClick,
    _ref4$pannable = _ref4.pannable,
    pannable = _ref4$pannable === void 0 ? false : _ref4$pannable,
    _ref4$zoomable = _ref4.zoomable,
    zoomable = _ref4$zoomable === void 0 ? false : _ref4$zoomable,
    _ref4$ariaLabel = _ref4.ariaLabel,
    ariaLabel = _ref4$ariaLabel === void 0 ? 'React Flow mini map' : _ref4$ariaLabel,
    _ref4$inversePan = _ref4.inversePan,
    inversePan = _ref4$inversePan === void 0 ? false : _ref4$inversePan,
    _ref4$zoomStep = _ref4.zoomStep,
    zoomStep = _ref4$zoomStep === void 0 ? 10 : _ref4$zoomStep,
    _ref4$offsetScale = _ref4.offsetScale,
    offsetScale = _ref4$offsetScale === void 0 ? 5 : _ref4$offsetScale;
  var store = (0,_reactflow_core__WEBPACK_IMPORTED_MODULE_3__/* .useStoreApi */ .PI)();
  var svg = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  var _useStore = (0,_reactflow_core__WEBPACK_IMPORTED_MODULE_3__/* .useStore */ .Pj)(selector, zustand_shallow__WEBPACK_IMPORTED_MODULE_4__/* .shallow */ .x),
    boundingRect = _useStore.boundingRect,
    viewBB = _useStore.viewBB,
    rfId = _useStore.rfId;
  var elementWidth = (_style$width = style === null || style === void 0 ? void 0 : style.width) !== null && _style$width !== void 0 ? _style$width : defaultWidth;
  var elementHeight = (_style$height = style === null || style === void 0 ? void 0 : style.height) !== null && _style$height !== void 0 ? _style$height : defaultHeight;
  var scaledWidth = boundingRect.width / elementWidth;
  var scaledHeight = boundingRect.height / elementHeight;
  var viewScale = Math.max(scaledWidth, scaledHeight);
  var viewWidth = viewScale * elementWidth;
  var viewHeight = viewScale * elementHeight;
  var offset = offsetScale * viewScale;
  var x = boundingRect.x - (viewWidth - boundingRect.width) / 2 - offset;
  var y = boundingRect.y - (viewHeight - boundingRect.height) / 2 - offset;
  var width = viewWidth + offset * 2;
  var height = viewHeight + offset * 2;
  var labelledBy = "".concat(ARIA_LABEL_KEY, "-").concat(rfId);
  var viewScaleRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(0);
  viewScaleRef.current = viewScale;
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (svg.current) {
      var selection = (0,d3_selection__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A)(svg.current);
      var zoomHandler = function zoomHandler(event) {
        var _store$getState = store.getState(),
          transform = _store$getState.transform,
          d3Selection = _store$getState.d3Selection,
          d3Zoom = _store$getState.d3Zoom;
        if (event.sourceEvent.type !== 'wheel' || !d3Selection || !d3Zoom) {
          return;
        }
        var pinchDelta = -event.sourceEvent.deltaY * (event.sourceEvent.deltaMode === 1 ? 0.05 : event.sourceEvent.deltaMode ? 1 : 0.002) * zoomStep;
        var zoom = transform[2] * Math.pow(2, pinchDelta);
        d3Zoom.scaleTo(d3Selection, zoom);
      };
      var panHandler = function panHandler(event) {
        var _store$getState2 = store.getState(),
          transform = _store$getState2.transform,
          d3Selection = _store$getState2.d3Selection,
          d3Zoom = _store$getState2.d3Zoom,
          translateExtent = _store$getState2.translateExtent,
          width = _store$getState2.width,
          height = _store$getState2.height;
        if (event.sourceEvent.type !== 'mousemove' || !d3Selection || !d3Zoom) {
          return;
        }
        // @TODO: how to calculate the correct next position? Math.max(1, transform[2]) is a workaround.
        var moveScale = viewScaleRef.current * Math.max(1, transform[2]) * (inversePan ? -1 : 1);
        var position = {
          x: transform[0] - event.sourceEvent.movementX * moveScale,
          y: transform[1] - event.sourceEvent.movementY * moveScale
        };
        var extent = [[0, 0], [width, height]];
        var nextTransform = d3_zoom__WEBPACK_IMPORTED_MODULE_1__/* .zoomIdentity */ .GS.translate(position.x, position.y).scale(transform[2]);
        var constrainedTransform = d3Zoom.constrain()(nextTransform, extent, translateExtent);
        d3Zoom.transform(d3Selection, constrainedTransform);
      };
      var zoomAndPanHandler = (0,d3_zoom__WEBPACK_IMPORTED_MODULE_1__/* .zoom */ .s_)()
      // @ts-ignore
      .on('zoom', pannable ? panHandler : null)
      // @ts-ignore
      .on('zoom.wheel', zoomable ? zoomHandler : null);
      selection.call(zoomAndPanHandler);
      return function () {
        selection.on('zoom', null);
      };
    }
  }, [pannable, zoomable, inversePan, zoomStep]);
  var onSvgClick = onClick ? function (event) {
    var rfCoord = (0,d3_selection__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A)(event);
    onClick(event, {
      x: rfCoord[0],
      y: rfCoord[1]
    });
  } : undefined;
  var onSvgNodeClick = onNodeClick ? function (event, nodeId) {
    var node = store.getState().nodeInternals.get(nodeId);
    onNodeClick(event, node);
  } : undefined;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_reactflow_core__WEBPACK_IMPORTED_MODULE_3__/* .Panel */ .Zk, {
    position: position,
    style: style,
    className: (0,classcat__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A)(['react-flow__minimap', className]),
    "data-testid": "rf__minimap"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg", {
    width: elementWidth,
    height: elementHeight,
    viewBox: "".concat(x, " ").concat(y, " ").concat(width, " ").concat(height),
    role: "img",
    "aria-labelledby": labelledBy,
    ref: svg,
    onClick: onSvgClick
  }, ariaLabel && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("title", {
    id: labelledBy
  }, ariaLabel), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(MiniMapNodes$1, {
    onClick: onSvgNodeClick,
    nodeColor: nodeColor,
    nodeStrokeColor: nodeStrokeColor,
    nodeBorderRadius: nodeBorderRadius,
    nodeClassName: nodeClassName,
    nodeStrokeWidth: nodeStrokeWidth,
    nodeComponent: nodeComponent
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    className: "react-flow__minimap-mask",
    d: "M".concat(x - offset, ",").concat(y - offset, "h").concat(width + offset * 2, "v").concat(height + offset * 2, "h").concat(-width - offset * 2, "z\n        M").concat(viewBB.x, ",").concat(viewBB.y, "h").concat(viewBB.width, "v").concat(viewBB.height, "h").concat(-viewBB.width, "z"),
    fill: maskColor,
    fillRule: "evenodd",
    stroke: maskStrokeColor,
    strokeWidth: maskStrokeWidth,
    pointerEvents: "none"
  })));
}
MiniMap.displayName = 'MiniMap';
var MiniMap$1 = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.memo)(MiniMap);


/***/ }),

/***/ 47754:
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: function() { return /* binding */ cc; }
/* harmony export */ });
function cc(names) {
  if (typeof names === "string" || typeof names === "number") return "" + names;
  var out = "";
  if (Array.isArray(names)) {
    for (var i = 0, tmp; i < names.length; i++) {
      if ((tmp = cc(names[i])) !== "") {
        out += (out && " ") + tmp;
      }
    }
  } else {
    for (var k in names) {
      if (names[k]) out += (out && " ") + k;
    }
  }
  return out;
}

/***/ }),

/***/ 11378:
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__) {

"use strict";
var noop = {
  value: function value() {}
};
function dispatch() {
  for (var i = 0, n = arguments.length, _ = {}, t; i < n; ++i) {
    if (!(t = arguments[i] + "") || t in _ || /[\s.]/.test(t)) throw new Error("illegal type: " + t);
    _[t] = [];
  }
  return new Dispatch(_);
}
function Dispatch(_) {
  this._ = _;
}
function parseTypenames(typenames, types) {
  return typenames.trim().split(/^|\s+/).map(function (t) {
    var name = "",
      i = t.indexOf(".");
    if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
    if (t && !types.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    return {
      type: t,
      name: name
    };
  });
}
Dispatch.prototype = dispatch.prototype = {
  constructor: Dispatch,
  on: function on(typename, callback) {
    var _ = this._,
      T = parseTypenames(typename + "", _),
      t,
      i = -1,
      n = T.length;

    // If no callback was specified, return the callback of the given type and name.
    if (arguments.length < 2) {
      while (++i < n) if ((t = (typename = T[i]).type) && (t = get(_[t], typename.name))) return t;
      return;
    }

    // If a type was specified, set the callback for the given type and name.
    // Otherwise, if a null callback was specified, remove callbacks of the given name.
    if (callback != null && typeof callback !== "function") throw new Error("invalid callback: " + callback);
    while (++i < n) {
      if (t = (typename = T[i]).type) _[t] = set(_[t], typename.name, callback);else if (callback == null) for (t in _) _[t] = set(_[t], typename.name, null);
    }
    return this;
  },
  copy: function copy() {
    var copy = {},
      _ = this._;
    for (var t in _) copy[t] = _[t].slice();
    return new Dispatch(copy);
  },
  call: function call(type, that) {
    if ((n = arguments.length - 2) > 0) for (var args = new Array(n), i = 0, n, t; i < n; ++i) args[i] = arguments[i + 2];
    if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
    for (t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
  },
  apply: function apply(type, that, args) {
    if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
    for (var t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
  }
};
function get(type, name) {
  for (var i = 0, n = type.length, c; i < n; ++i) {
    if ((c = type[i]).name === name) {
      return c.value;
    }
  }
}
function set(type, name, callback) {
  for (var i = 0, n = type.length; i < n; ++i) {
    if (type[i].name === name) {
      type[i] = noop, type = type.slice(0, i).concat(type.slice(i + 1));
      break;
    }
  }
  if (callback != null) type.push({
    name: name,
    value: callback
  });
  return type;
}
/* harmony default export */ __webpack_exports__.A = (dispatch);

/***/ }),

/***/ 98582:
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: function() { return /* export default binding */ __WEBPACK_DEFAULT_EXPORT__; },
/* harmony export */   y: function() { return /* binding */ yesdrag; }
/* harmony export */ });
/* harmony import */ var d3_selection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(65633);
/* harmony import */ var _noevent_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1958);


/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(view) {
  var root = view.document.documentElement,
    selection = (0,d3_selection__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(view).on("dragstart.drag", _noevent_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Ay, _noevent_js__WEBPACK_IMPORTED_MODULE_1__/* .nonpassivecapture */ .Rw);
  if ("onselectstart" in root) {
    selection.on("selectstart.drag", _noevent_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Ay, _noevent_js__WEBPACK_IMPORTED_MODULE_1__/* .nonpassivecapture */ .Rw);
  } else {
    root.__noselect = root.style.MozUserSelect;
    root.style.MozUserSelect = "none";
  }
}
function yesdrag(view, noclick) {
  var root = view.document.documentElement,
    selection = (0,d3_selection__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(view).on("dragstart.drag", null);
  if (noclick) {
    selection.on("click.drag", _noevent_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Ay, _noevent_js__WEBPACK_IMPORTED_MODULE_1__/* .nonpassivecapture */ .Rw);
    setTimeout(function () {
      selection.on("click.drag", null);
    }, 0);
  }
  if ("onselectstart" in root) {
    selection.on("selectstart.drag", null);
  } else {
    root.style.MozUserSelect = root.__noselect;
    delete root.__noselect;
  }
}

/***/ }),

/***/ 1958:
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Ay: function() { return /* export default binding */ __WEBPACK_DEFAULT_EXPORT__; },
/* harmony export */   GK: function() { return /* binding */ nopropagation; },
/* harmony export */   Rw: function() { return /* binding */ nonpassivecapture; },
/* harmony export */   vr: function() { return /* binding */ nonpassive; }
/* harmony export */ });
// These are typically used in conjunction with noevent to ensure that we can
// preventDefault on the event.
var nonpassive = {
  passive: false
};
var nonpassivecapture = {
  capture: true,
  passive: false
};
function nopropagation(event) {
  event.stopImmediatePropagation();
}
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(event) {
  event.preventDefault();
  event.stopImmediatePropagation();
}

/***/ }),

/***/ 19635:
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: function() { return /* export default binding */ __WEBPACK_DEFAULT_EXPORT__; },
/* harmony export */   j: function() { return /* binding */ childMatcher; }
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(selector) {
  return function () {
    return this.matches(selector);
  };
}
function childMatcher(selector) {
  return function (node) {
    return node.matches(selector);
  };
}

/***/ }),

/***/ 49910:
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: function() { return /* export default binding */ __WEBPACK_DEFAULT_EXPORT__; }
/* harmony export */ });
/* harmony import */ var _namespaces_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(70557);

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(name) {
  var prefix = name += "",
    i = prefix.indexOf(":");
  if (i >= 0 && (prefix = name.slice(0, i)) !== "xmlns") name = name.slice(i + 1);
  return _namespaces_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.hasOwnProperty(prefix) ? {
    space: _namespaces_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A[prefix],
    local: name
  } : name; // eslint-disable-line no-prototype-builtins
}

/***/ }),

/***/ 70557:
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   g: function() { return /* binding */ xhtml; }
/* harmony export */ });
var xhtml = "http://www.w3.org/1999/xhtml";
/* harmony default export */ __webpack_exports__.A = ({
  svg: "http://www.w3.org/2000/svg",
  xhtml: xhtml,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
});

/***/ }),

/***/ 71137:
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  A: function() { return /* binding */ pointer; }
});

;// CONCATENATED MODULE: ./node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/sourceEvent.js
/* harmony default export */ function sourceEvent(event) {
  var sourceEvent;
  while (sourceEvent = event.sourceEvent) event = sourceEvent;
  return event;
}
;// CONCATENATED MODULE: ./node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/pointer.js

/* harmony default export */ function pointer(event, node) {
  event = sourceEvent(event);
  if (node === undefined) node = event.currentTarget;
  if (node) {
    var svg = node.ownerSVGElement || node;
    if (svg.createSVGPoint) {
      var point = svg.createSVGPoint();
      point.x = event.clientX, point.y = event.clientY;
      point = point.matrixTransform(node.getScreenCTM().inverse());
      return [point.x, point.y];
    }
    if (node.getBoundingClientRect) {
      var rect = node.getBoundingClientRect();
      return [event.clientX - rect.left - node.clientLeft, event.clientY - rect.top - node.clientTop];
    }
  }
  return [event.pageX, event.pageY];
}

/***/ }),

/***/ 65633:
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: function() { return /* export default binding */ __WEBPACK_DEFAULT_EXPORT__; }
/* harmony export */ });
/* harmony import */ var _selection_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1350);

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(selector) {
  return typeof selector === "string" ? new _selection_index_js__WEBPACK_IMPORTED_MODULE_0__/* .Selection */ .LN([[document.querySelector(selector)]], [document.documentElement]) : new _selection_index_js__WEBPACK_IMPORTED_MODULE_0__/* .Selection */ .LN([[selector]], _selection_index_js__WEBPACK_IMPORTED_MODULE_0__/* .root */ .zr);
}

/***/ }),

/***/ 1350:
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  LN: function() { return /* binding */ Selection; },
  Ay: function() { return /* binding */ src_selection; },
  zr: function() { return /* binding */ root; }
});

// EXTERNAL MODULE: ./node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selector.js
var selector = __webpack_require__(84120);
;// CONCATENATED MODULE: ./node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/select.js


/* harmony default export */ function selection_select(select) {
  if (typeof select !== "function") select = (0,selector/* default */.A)(select);
  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
      if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
        if ("__data__" in node) subnode.__data__ = node.__data__;
        subgroup[i] = subnode;
      }
    }
  }
  return new Selection(subgroups, this._parents);
}
;// CONCATENATED MODULE: ./node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/array.js
// Given something array like (or null), returns something that is strictly an
// array. This is used to ensure that array-like objects passed to d3.selectAll
// or selection.selectAll are converted into proper arrays when creating a
// selection; we don’t ever want to create a selection backed by a live
// HTMLCollection or NodeList. However, note that selection.selectAll will use a
// static NodeList as a group, since it safely derived from querySelectorAll.
function array(x) {
  return x == null ? [] : Array.isArray(x) ? x : Array.from(x);
}
// EXTERNAL MODULE: ./node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selectorAll.js
var selectorAll = __webpack_require__(59561);
;// CONCATENATED MODULE: ./node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/selectAll.js



function arrayAll(select) {
  return function () {
    return array(select.apply(this, arguments));
  };
}
/* harmony default export */ function selectAll(select) {
  if (typeof select === "function") select = arrayAll(select);else select = (0,selectorAll/* default */.A)(select);
  for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        subgroups.push(select.call(node, node.__data__, i, group));
        parents.push(node);
      }
    }
  }
  return new Selection(subgroups, parents);
}
// EXTERNAL MODULE: ./node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/matcher.js
var matcher = __webpack_require__(19635);
;// CONCATENATED MODULE: ./node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/selectChild.js

var find = Array.prototype.find;
function childFind(match) {
  return function () {
    return find.call(this.children, match);
  };
}
function childFirst() {
  return this.firstElementChild;
}
/* harmony default export */ function selectChild(match) {
  return this.select(match == null ? childFirst : childFind(typeof match === "function" ? match : (0,matcher/* childMatcher */.j)(match)));
}
;// CONCATENATED MODULE: ./node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/selectChildren.js

var filter = Array.prototype.filter;
function children() {
  return Array.from(this.children);
}
function childrenFilter(match) {
  return function () {
    return filter.call(this.children, match);
  };
}
/* harmony default export */ function selectChildren(match) {
  return this.selectAll(match == null ? children : childrenFilter(typeof match === "function" ? match : (0,matcher/* childMatcher */.j)(match)));
}
;// CONCATENATED MODULE: ./node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/filter.js


/* harmony default export */ function selection_filter(match) {
  if (typeof match !== "function") match = (0,matcher/* default */.A)(match);
  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
      if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
        subgroup.push(node);
      }
    }
  }
  return new Selection(subgroups, this._parents);
}
;// CONCATENATED MODULE: ./node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/sparse.js
/* harmony default export */ function sparse(update) {
  return new Array(update.length);
}
;// CONCATENATED MODULE: ./node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/enter.js


/* harmony default export */ function enter() {
  return new Selection(this._enter || this._groups.map(sparse), this._parents);
}
function EnterNode(parent, datum) {
  this.ownerDocument = parent.ownerDocument;
  this.namespaceURI = parent.namespaceURI;
  this._next = null;
  this._parent = parent;
  this.__data__ = datum;
}
EnterNode.prototype = {
  constructor: EnterNode,
  appendChild: function appendChild(child) {
    return this._parent.insertBefore(child, this._next);
  },
  insertBefore: function insertBefore(child, next) {
    return this._parent.insertBefore(child, next);
  },
  querySelector: function querySelector(selector) {
    return this._parent.querySelector(selector);
  },
  querySelectorAll: function querySelectorAll(selector) {
    return this._parent.querySelectorAll(selector);
  }
};
;// CONCATENATED MODULE: ./node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/constant.js
/* harmony default export */ function constant(x) {
  return function () {
    return x;
  };
}
;// CONCATENATED MODULE: ./node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/data.js
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }



function bindIndex(parent, group, enter, update, exit, data) {
  var i = 0,
    node,
    groupLength = group.length,
    dataLength = data.length;

  // Put any non-null nodes that fit into update.
  // Put any null nodes into enter.
  // Put any remaining data into enter.
  for (; i < dataLength; ++i) {
    if (node = group[i]) {
      node.__data__ = data[i];
      update[i] = node;
    } else {
      enter[i] = new EnterNode(parent, data[i]);
    }
  }

  // Put any non-null nodes that don’t fit into exit.
  for (; i < groupLength; ++i) {
    if (node = group[i]) {
      exit[i] = node;
    }
  }
}
function bindKey(parent, group, enter, update, exit, data, key) {
  var i,
    node,
    nodeByKeyValue = new Map(),
    groupLength = group.length,
    dataLength = data.length,
    keyValues = new Array(groupLength),
    keyValue;

  // Compute the key for each node.
  // If multiple nodes have the same key, the duplicates are added to exit.
  for (i = 0; i < groupLength; ++i) {
    if (node = group[i]) {
      keyValues[i] = keyValue = key.call(node, node.__data__, i, group) + "";
      if (nodeByKeyValue.has(keyValue)) {
        exit[i] = node;
      } else {
        nodeByKeyValue.set(keyValue, node);
      }
    }
  }

  // Compute the key for each datum.
  // If there a node associated with this key, join and add it to update.
  // If there is not (or the key is a duplicate), add it to enter.
  for (i = 0; i < dataLength; ++i) {
    keyValue = key.call(parent, data[i], i, data) + "";
    if (node = nodeByKeyValue.get(keyValue)) {
      update[i] = node;
      node.__data__ = data[i];
      nodeByKeyValue.delete(keyValue);
    } else {
      enter[i] = new EnterNode(parent, data[i]);
    }
  }

  // Add any remaining nodes that were not bound to data to exit.
  for (i = 0; i < groupLength; ++i) {
    if ((node = group[i]) && nodeByKeyValue.get(keyValues[i]) === node) {
      exit[i] = node;
    }
  }
}
function datum(node) {
  return node.__data__;
}
/* harmony default export */ function data(value, key) {
  if (!arguments.length) return Array.from(this, datum);
  var bind = key ? bindKey : bindIndex,
    parents = this._parents,
    groups = this._groups;
  if (typeof value !== "function") value = constant(value);
  for (var m = groups.length, update = new Array(m), enter = new Array(m), exit = new Array(m), j = 0; j < m; ++j) {
    var parent = parents[j],
      group = groups[j],
      groupLength = group.length,
      data = arraylike(value.call(parent, parent && parent.__data__, j, parents)),
      dataLength = data.length,
      enterGroup = enter[j] = new Array(dataLength),
      updateGroup = update[j] = new Array(dataLength),
      exitGroup = exit[j] = new Array(groupLength);
    bind(parent, group, enterGroup, updateGroup, exitGroup, data, key);

    // Now connect the enter nodes to their following update node, such that
    // appendChild can insert the materialized enter node before this node,
    // rather than at the end of the parent node.
    for (var i0 = 0, i1 = 0, previous, next; i0 < dataLength; ++i0) {
      if (previous = enterGroup[i0]) {
        if (i0 >= i1) i1 = i0 + 1;
        while (!(next = updateGroup[i1]) && ++i1 < dataLength);
        previous._next = next || null;
      }
    }
  }
  update = new Selection(update, parents);
  update._enter = enter;
  update._exit = exit;
  return update;
}

// Given some data, this returns an array-like view of it: an object that
// exposes a length property and allows numeric indexing. Note that unlike
// selectAll, this isn’t worried about “live” collections because the resulting
// array will only be used briefly while data is being bound. (It is possible to
// cause the data to change while iterating by using a key function, but please
// don’t; we’d rather avoid a gratuitous copy.)
function arraylike(data) {
  return _typeof(data) === "object" && "length" in data ? data // Array, TypedArray, NodeList, array-like
  : Array.from(data); // Map, Set, iterable, string, or anything else
}
;// CONCATENATED MODULE: ./node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/exit.js


/* harmony default export */ function exit() {
  return new Selection(this._exit || this._groups.map(sparse), this._parents);
}
;// CONCATENATED MODULE: ./node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/join.js
/* harmony default export */ function join(onenter, onupdate, onexit) {
  var enter = this.enter(),
    update = this,
    exit = this.exit();
  if (typeof onenter === "function") {
    enter = onenter(enter);
    if (enter) enter = enter.selection();
  } else {
    enter = enter.append(onenter + "");
  }
  if (onupdate != null) {
    update = onupdate(update);
    if (update) update = update.selection();
  }
  if (onexit == null) exit.remove();else onexit(exit);
  return enter && update ? enter.merge(update).order() : update;
}
;// CONCATENATED MODULE: ./node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/merge.js

/* harmony default export */ function merge(context) {
  var selection = context.selection ? context.selection() : context;
  for (var groups0 = this._groups, groups1 = selection._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
    for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group0[i] || group1[i]) {
        merge[i] = node;
      }
    }
  }
  for (; j < m0; ++j) {
    merges[j] = groups0[j];
  }
  return new Selection(merges, this._parents);
}
;// CONCATENATED MODULE: ./node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/order.js
/* harmony default export */ function order() {
  for (var groups = this._groups, j = -1, m = groups.length; ++j < m;) {
    for (var group = groups[j], i = group.length - 1, next = group[i], node; --i >= 0;) {
      if (node = group[i]) {
        if (next && node.compareDocumentPosition(next) ^ 4) next.parentNode.insertBefore(node, next);
        next = node;
      }
    }
  }
  return this;
}
;// CONCATENATED MODULE: ./node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/sort.js

/* harmony default export */ function sort(compare) {
  if (!compare) compare = ascending;
  function compareNode(a, b) {
    return a && b ? compare(a.__data__, b.__data__) : !a - !b;
  }
  for (var groups = this._groups, m = groups.length, sortgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, sortgroup = sortgroups[j] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        sortgroup[i] = node;
      }
    }
    sortgroup.sort(compareNode);
  }
  return new Selection(sortgroups, this._parents).order();
}
function ascending(a, b) {
  return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
}
;// CONCATENATED MODULE: ./node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/call.js
/* harmony default export */ function call() {
  var callback = arguments[0];
  arguments[0] = this;
  callback.apply(null, arguments);
  return this;
}
;// CONCATENATED MODULE: ./node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/nodes.js
/* harmony default export */ function nodes() {
  return Array.from(this);
}
;// CONCATENATED MODULE: ./node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/node.js
/* harmony default export */ function node() {
  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length; i < n; ++i) {
      var node = group[i];
      if (node) return node;
    }
  }
  return null;
}
;// CONCATENATED MODULE: ./node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/size.js
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
/* harmony default export */ function size() {
  var size = 0;
  var _iterator = _createForOfIteratorHelper(this),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var node = _step.value;
      ++size;
    } // eslint-disable-line no-unused-vars
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return size;
}
;// CONCATENATED MODULE: ./node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/empty.js
/* harmony default export */ function empty() {
  return !this.node();
}
;// CONCATENATED MODULE: ./node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/each.js
/* harmony default export */ function each(callback) {
  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
      if (node = group[i]) callback.call(node, node.__data__, i, group);
    }
  }
  return this;
}
// EXTERNAL MODULE: ./node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/namespace.js
var namespace = __webpack_require__(49910);
;// CONCATENATED MODULE: ./node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/attr.js

function attrRemove(name) {
  return function () {
    this.removeAttribute(name);
  };
}
function attrRemoveNS(fullname) {
  return function () {
    this.removeAttributeNS(fullname.space, fullname.local);
  };
}
function attrConstant(name, value) {
  return function () {
    this.setAttribute(name, value);
  };
}
function attrConstantNS(fullname, value) {
  return function () {
    this.setAttributeNS(fullname.space, fullname.local, value);
  };
}
function attrFunction(name, value) {
  return function () {
    var v = value.apply(this, arguments);
    if (v == null) this.removeAttribute(name);else this.setAttribute(name, v);
  };
}
function attrFunctionNS(fullname, value) {
  return function () {
    var v = value.apply(this, arguments);
    if (v == null) this.removeAttributeNS(fullname.space, fullname.local);else this.setAttributeNS(fullname.space, fullname.local, v);
  };
}
/* harmony default export */ function attr(name, value) {
  var fullname = (0,namespace/* default */.A)(name);
  if (arguments.length < 2) {
    var node = this.node();
    return fullname.local ? node.getAttributeNS(fullname.space, fullname.local) : node.getAttribute(fullname);
  }
  return this.each((value == null ? fullname.local ? attrRemoveNS : attrRemove : typeof value === "function" ? fullname.local ? attrFunctionNS : attrFunction : fullname.local ? attrConstantNS : attrConstant)(fullname, value));
}
// EXTERNAL MODULE: ./node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/style.js
var style = __webpack_require__(94585);
;// CONCATENATED MODULE: ./node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/property.js
function propertyRemove(name) {
  return function () {
    delete this[name];
  };
}
function propertyConstant(name, value) {
  return function () {
    this[name] = value;
  };
}
function propertyFunction(name, value) {
  return function () {
    var v = value.apply(this, arguments);
    if (v == null) delete this[name];else this[name] = v;
  };
}
/* harmony default export */ function property(name, value) {
  return arguments.length > 1 ? this.each((value == null ? propertyRemove : typeof value === "function" ? propertyFunction : propertyConstant)(name, value)) : this.node()[name];
}
;// CONCATENATED MODULE: ./node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/classed.js
function classArray(string) {
  return string.trim().split(/^|\s+/);
}
function classList(node) {
  return node.classList || new ClassList(node);
}
function ClassList(node) {
  this._node = node;
  this._names = classArray(node.getAttribute("class") || "");
}
ClassList.prototype = {
  add: function add(name) {
    var i = this._names.indexOf(name);
    if (i < 0) {
      this._names.push(name);
      this._node.setAttribute("class", this._names.join(" "));
    }
  },
  remove: function remove(name) {
    var i = this._names.indexOf(name);
    if (i >= 0) {
      this._names.splice(i, 1);
      this._node.setAttribute("class", this._names.join(" "));
    }
  },
  contains: function contains(name) {
    return this._names.indexOf(name) >= 0;
  }
};
function classedAdd(node, names) {
  var list = classList(node),
    i = -1,
    n = names.length;
  while (++i < n) list.add(names[i]);
}
function classedRemove(node, names) {
  var list = classList(node),
    i = -1,
    n = names.length;
  while (++i < n) list.remove(names[i]);
}
function classedTrue(names) {
  return function () {
    classedAdd(this, names);
  };
}
function classedFalse(names) {
  return function () {
    classedRemove(this, names);
  };
}
function classedFunction(names, value) {
  return function () {
    (value.apply(this, arguments) ? classedAdd : classedRemove)(this, names);
  };
}
/* harmony default export */ function classed(name, value) {
  var names = classArray(name + "");
  if (arguments.length < 2) {
    var list = classList(this.node()),
      i = -1,
      n = names.length;
    while (++i < n) if (!list.contains(names[i])) return false;
    return true;
  }
  return this.each((typeof value === "function" ? classedFunction : value ? classedTrue : classedFalse)(names, value));
}
;// CONCATENATED MODULE: ./node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/text.js
function textRemove() {
  this.textContent = "";
}
function textConstant(value) {
  return function () {
    this.textContent = value;
  };
}
function textFunction(value) {
  return function () {
    var v = value.apply(this, arguments);
    this.textContent = v == null ? "" : v;
  };
}
/* harmony default export */ function selection_text(value) {
  return arguments.length ? this.each(value == null ? textRemove : (typeof value === "function" ? textFunction : textConstant)(value)) : this.node().textContent;
}
;// CONCATENATED MODULE: ./node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/html.js
function htmlRemove() {
  this.innerHTML = "";
}
function htmlConstant(value) {
  return function () {
    this.innerHTML = value;
  };
}
function htmlFunction(value) {
  return function () {
    var v = value.apply(this, arguments);
    this.innerHTML = v == null ? "" : v;
  };
}
/* harmony default export */ function html(value) {
  return arguments.length ? this.each(value == null ? htmlRemove : (typeof value === "function" ? htmlFunction : htmlConstant)(value)) : this.node().innerHTML;
}
;// CONCATENATED MODULE: ./node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/raise.js
function raise() {
  if (this.nextSibling) this.parentNode.appendChild(this);
}
/* harmony default export */ function selection_raise() {
  return this.each(raise);
}
;// CONCATENATED MODULE: ./node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/lower.js
function lower() {
  if (this.previousSibling) this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
/* harmony default export */ function selection_lower() {
  return this.each(lower);
}
// EXTERNAL MODULE: ./node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/namespaces.js
var namespaces = __webpack_require__(70557);
;// CONCATENATED MODULE: ./node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/creator.js


function creatorInherit(name) {
  return function () {
    var document = this.ownerDocument,
      uri = this.namespaceURI;
    return uri === namespaces/* xhtml */.g && document.documentElement.namespaceURI === namespaces/* xhtml */.g ? document.createElement(name) : document.createElementNS(uri, name);
  };
}
function creatorFixed(fullname) {
  return function () {
    return this.ownerDocument.createElementNS(fullname.space, fullname.local);
  };
}
/* harmony default export */ function creator(name) {
  var fullname = (0,namespace/* default */.A)(name);
  return (fullname.local ? creatorFixed : creatorInherit)(fullname);
}
;// CONCATENATED MODULE: ./node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/append.js

/* harmony default export */ function append(name) {
  var create = typeof name === "function" ? name : creator(name);
  return this.select(function () {
    return this.appendChild(create.apply(this, arguments));
  });
}
;// CONCATENATED MODULE: ./node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/insert.js


function constantNull() {
  return null;
}
/* harmony default export */ function insert(name, before) {
  var create = typeof name === "function" ? name : creator(name),
    select = before == null ? constantNull : typeof before === "function" ? before : (0,selector/* default */.A)(before);
  return this.select(function () {
    return this.insertBefore(create.apply(this, arguments), select.apply(this, arguments) || null);
  });
}
;// CONCATENATED MODULE: ./node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/remove.js
function remove() {
  var parent = this.parentNode;
  if (parent) parent.removeChild(this);
}
/* harmony default export */ function selection_remove() {
  return this.each(remove);
}
;// CONCATENATED MODULE: ./node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/clone.js
function selection_cloneShallow() {
  var clone = this.cloneNode(false),
    parent = this.parentNode;
  return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
}
function selection_cloneDeep() {
  var clone = this.cloneNode(true),
    parent = this.parentNode;
  return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
}
/* harmony default export */ function clone(deep) {
  return this.select(deep ? selection_cloneDeep : selection_cloneShallow);
}
;// CONCATENATED MODULE: ./node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/datum.js
/* harmony default export */ function selection_datum(value) {
  return arguments.length ? this.property("__data__", value) : this.node().__data__;
}
;// CONCATENATED MODULE: ./node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/on.js
function contextListener(listener) {
  return function (event) {
    listener.call(this, event, this.__data__);
  };
}
function parseTypenames(typenames) {
  return typenames.trim().split(/^|\s+/).map(function (t) {
    var name = "",
      i = t.indexOf(".");
    if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
    return {
      type: t,
      name: name
    };
  });
}
function onRemove(typename) {
  return function () {
    var on = this.__on;
    if (!on) return;
    for (var j = 0, i = -1, m = on.length, o; j < m; ++j) {
      if (o = on[j], (!typename.type || o.type === typename.type) && o.name === typename.name) {
        this.removeEventListener(o.type, o.listener, o.options);
      } else {
        on[++i] = o;
      }
    }
    if (++i) on.length = i;else delete this.__on;
  };
}
function onAdd(typename, value, options) {
  return function () {
    var on = this.__on,
      o,
      listener = contextListener(value);
    if (on) for (var j = 0, m = on.length; j < m; ++j) {
      if ((o = on[j]).type === typename.type && o.name === typename.name) {
        this.removeEventListener(o.type, o.listener, o.options);
        this.addEventListener(o.type, o.listener = listener, o.options = options);
        o.value = value;
        return;
      }
    }
    this.addEventListener(typename.type, listener, options);
    o = {
      type: typename.type,
      name: typename.name,
      value: value,
      listener: listener,
      options: options
    };
    if (!on) this.__on = [o];else on.push(o);
  };
}
/* harmony default export */ function on(typename, value, options) {
  var typenames = parseTypenames(typename + ""),
    i,
    n = typenames.length,
    t;
  if (arguments.length < 2) {
    var on = this.node().__on;
    if (on) for (var j = 0, m = on.length, o; j < m; ++j) {
      for (i = 0, o = on[j]; i < n; ++i) {
        if ((t = typenames[i]).type === o.type && t.name === o.name) {
          return o.value;
        }
      }
    }
    return;
  }
  on = value ? onAdd : onRemove;
  for (i = 0; i < n; ++i) this.each(on(typenames[i], value, options));
  return this;
}
// EXTERNAL MODULE: ./node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/window.js
var src_window = __webpack_require__(78237);
;// CONCATENATED MODULE: ./node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/dispatch.js

function dispatchEvent(node, type, params) {
  var window = (0,src_window/* default */.A)(node),
    event = window.CustomEvent;
  if (typeof event === "function") {
    event = new event(type, params);
  } else {
    event = window.document.createEvent("Event");
    if (params) event.initEvent(type, params.bubbles, params.cancelable), event.detail = params.detail;else event.initEvent(type, false, false);
  }
  node.dispatchEvent(event);
}
function dispatchConstant(type, params) {
  return function () {
    return dispatchEvent(this, type, params);
  };
}
function dispatchFunction(type, params) {
  return function () {
    return dispatchEvent(this, type, params.apply(this, arguments));
  };
}
/* harmony default export */ function dispatch(type, params) {
  return this.each((typeof params === "function" ? dispatchFunction : dispatchConstant)(type, params));
}
;// CONCATENATED MODULE: ./node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/iterator.js
function iterator_typeof(o) { "@babel/helpers - typeof"; return iterator_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, iterator_typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == iterator_typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(iterator_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, catch: function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
var _marked = /*#__PURE__*/_regeneratorRuntime().mark(_callee);
function _callee() {
  var groups, j, m, group, i, n, node;
  return _regeneratorRuntime().wrap(function _callee$(_context) {
    while (1) switch (_context.prev = _context.next) {
      case 0:
        groups = this._groups, j = 0, m = groups.length;
      case 1:
        if (!(j < m)) {
          _context.next = 13;
          break;
        }
        group = groups[j], i = 0, n = group.length;
      case 3:
        if (!(i < n)) {
          _context.next = 10;
          break;
        }
        if (!(node = group[i])) {
          _context.next = 7;
          break;
        }
        _context.next = 7;
        return node;
      case 7:
        ++i;
        _context.next = 3;
        break;
      case 10:
        ++j;
        _context.next = 1;
        break;
      case 13:
      case "end":
        return _context.stop();
    }
  }, _marked, this);
}
;// CONCATENATED MODULE: ./node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/index.js
function selection_typeof(o) { "@babel/helpers - typeof"; return selection_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, selection_typeof(o); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == selection_typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != selection_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != selection_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }


































var root = [null];
function Selection(groups, parents) {
  this._groups = groups;
  this._parents = parents;
}
function selection() {
  return new Selection([[document.documentElement]], root);
}
function selection_selection() {
  return this;
}
Selection.prototype = selection.prototype = _defineProperty({
  constructor: Selection,
  select: selection_select,
  selectAll: selectAll,
  selectChild: selectChild,
  selectChildren: selectChildren,
  filter: selection_filter,
  data: data,
  enter: enter,
  exit: exit,
  join: join,
  merge: merge,
  selection: selection_selection,
  order: order,
  sort: sort,
  call: call,
  nodes: nodes,
  node: node,
  size: size,
  empty: empty,
  each: each,
  attr: attr,
  style: style/* default */.A,
  property: property,
  classed: classed,
  text: selection_text,
  html: html,
  raise: selection_raise,
  lower: selection_lower,
  append: append,
  insert: insert,
  remove: selection_remove,
  clone: clone,
  datum: selection_datum,
  on: on,
  dispatch: dispatch
}, Symbol.iterator, _callee);
/* harmony default export */ var src_selection = (selection);

/***/ }),

/***/ 94585:
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: function() { return /* export default binding */ __WEBPACK_DEFAULT_EXPORT__; },
/* harmony export */   j: function() { return /* binding */ styleValue; }
/* harmony export */ });
/* harmony import */ var _window_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(78237);

function styleRemove(name) {
  return function () {
    this.style.removeProperty(name);
  };
}
function styleConstant(name, value, priority) {
  return function () {
    this.style.setProperty(name, value, priority);
  };
}
function styleFunction(name, value, priority) {
  return function () {
    var v = value.apply(this, arguments);
    if (v == null) this.style.removeProperty(name);else this.style.setProperty(name, v, priority);
  };
}
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(name, value, priority) {
  return arguments.length > 1 ? this.each((value == null ? styleRemove : typeof value === "function" ? styleFunction : styleConstant)(name, value, priority == null ? "" : priority)) : styleValue(this.node(), name);
}
function styleValue(node, name) {
  return node.style.getPropertyValue(name) || (0,_window_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(node).getComputedStyle(node, null).getPropertyValue(name);
}

/***/ }),

/***/ 84120:
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: function() { return /* export default binding */ __WEBPACK_DEFAULT_EXPORT__; }
/* harmony export */ });
function none() {}
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(selector) {
  return selector == null ? none : function () {
    return this.querySelector(selector);
  };
}

/***/ }),

/***/ 59561:
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: function() { return /* export default binding */ __WEBPACK_DEFAULT_EXPORT__; }
/* harmony export */ });
function empty() {
  return [];
}
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(selector) {
  return selector == null ? empty : function () {
    return this.querySelectorAll(selector);
  };
}

/***/ }),

/***/ 78237:
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: function() { return /* export default binding */ __WEBPACK_DEFAULT_EXPORT__; }
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(node) {
  return node.ownerDocument && node.ownerDocument.defaultView // node is a Node
  || node.document && node // node is a Window
  || node.defaultView; // node is a Document
}

/***/ }),

/***/ 69741:
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  s_: function() { return /* reexport */ zoom; },
  GS: function() { return /* reexport */ transform_identity; }
});

// UNUSED EXPORTS: ZoomTransform, zoomTransform

// EXTERNAL MODULE: ./node_modules/.pnpm/d3-dispatch@3.0.1/node_modules/d3-dispatch/src/dispatch.js
var dispatch = __webpack_require__(11378);
// EXTERNAL MODULE: ./node_modules/.pnpm/d3-drag@3.0.0/node_modules/d3-drag/src/nodrag.js
var nodrag = __webpack_require__(98582);
;// CONCATENATED MODULE: ./node_modules/.pnpm/d3-interpolate@3.0.1/node_modules/d3-interpolate/src/zoom.js
var epsilon2 = 1e-12;
function cosh(x) {
  return ((x = Math.exp(x)) + 1 / x) / 2;
}
function sinh(x) {
  return ((x = Math.exp(x)) - 1 / x) / 2;
}
function tanh(x) {
  return ((x = Math.exp(2 * x)) - 1) / (x + 1);
}
/* harmony default export */ var src_zoom = ((function zoomRho(rho, rho2, rho4) {
  // p0 = [ux0, uy0, w0]
  // p1 = [ux1, uy1, w1]
  function zoom(p0, p1) {
    var ux0 = p0[0],
      uy0 = p0[1],
      w0 = p0[2],
      ux1 = p1[0],
      uy1 = p1[1],
      w1 = p1[2],
      dx = ux1 - ux0,
      dy = uy1 - uy0,
      d2 = dx * dx + dy * dy,
      i,
      S;

    // Special case for u0 ≅ u1.
    if (d2 < epsilon2) {
      S = Math.log(w1 / w0) / rho;
      i = function i(t) {
        return [ux0 + t * dx, uy0 + t * dy, w0 * Math.exp(rho * t * S)];
      };
    }

    // General case.
    else {
      var d1 = Math.sqrt(d2),
        b0 = (w1 * w1 - w0 * w0 + rho4 * d2) / (2 * w0 * rho2 * d1),
        b1 = (w1 * w1 - w0 * w0 - rho4 * d2) / (2 * w1 * rho2 * d1),
        r0 = Math.log(Math.sqrt(b0 * b0 + 1) - b0),
        r1 = Math.log(Math.sqrt(b1 * b1 + 1) - b1);
      S = (r1 - r0) / rho;
      i = function i(t) {
        var s = t * S,
          coshr0 = cosh(r0),
          u = w0 / (rho2 * d1) * (coshr0 * tanh(rho * s + r0) - sinh(r0));
        return [ux0 + u * dx, uy0 + u * dy, w0 * coshr0 / cosh(rho * s + r0)];
      };
    }
    i.duration = S * 1000 * rho / Math.SQRT2;
    return i;
  }
  zoom.rho = function (_) {
    var _1 = Math.max(1e-3, +_),
      _2 = _1 * _1,
      _4 = _2 * _2;
    return zoomRho(_1, _2, _4);
  };
  return zoom;
})(Math.SQRT2, 2, 4));
// EXTERNAL MODULE: ./node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/select.js
var src_select = __webpack_require__(65633);
// EXTERNAL MODULE: ./node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/pointer.js + 1 modules
var pointer = __webpack_require__(71137);
// EXTERNAL MODULE: ./node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/index.js + 37 modules
var selection = __webpack_require__(1350);
;// CONCATENATED MODULE: ./node_modules/.pnpm/d3-timer@3.0.1/node_modules/d3-timer/src/timer.js
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var timer_frame = 0,
  // is an animation frame pending?
  timeout = 0,
  // is a timeout pending?
  interval = 0,
  // are any timers active?
  pokeDelay = 1000,
  // how frequently we check for clock skew
  taskHead,
  taskTail,
  clockLast = 0,
  clockNow = 0,
  clockSkew = 0,
  clock = (typeof performance === "undefined" ? "undefined" : _typeof(performance)) === "object" && performance.now ? performance : Date,
  setFrame = (typeof window === "undefined" ? "undefined" : _typeof(window)) === "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function (f) {
    setTimeout(f, 17);
  };
function now() {
  return clockNow || (setFrame(clearNow), clockNow = clock.now() + clockSkew);
}
function clearNow() {
  clockNow = 0;
}
function Timer() {
  this._call = this._time = this._next = null;
}
Timer.prototype = timer.prototype = {
  constructor: Timer,
  restart: function restart(callback, delay, time) {
    if (typeof callback !== "function") throw new TypeError("callback is not a function");
    time = (time == null ? now() : +time) + (delay == null ? 0 : +delay);
    if (!this._next && taskTail !== this) {
      if (taskTail) taskTail._next = this;else taskHead = this;
      taskTail = this;
    }
    this._call = callback;
    this._time = time;
    sleep();
  },
  stop: function stop() {
    if (this._call) {
      this._call = null;
      this._time = Infinity;
      sleep();
    }
  }
};
function timer(callback, delay, time) {
  var t = new Timer();
  t.restart(callback, delay, time);
  return t;
}
function timerFlush() {
  now(); // Get the current time, if not already set.
  ++timer_frame; // Pretend we’ve set an alarm, if we haven’t already.
  var t = taskHead,
    e;
  while (t) {
    if ((e = clockNow - t._time) >= 0) t._call.call(undefined, e);
    t = t._next;
  }
  --timer_frame;
}
function wake() {
  clockNow = (clockLast = clock.now()) + clockSkew;
  timer_frame = timeout = 0;
  try {
    timerFlush();
  } finally {
    timer_frame = 0;
    nap();
    clockNow = 0;
  }
}
function poke() {
  var now = clock.now(),
    delay = now - clockLast;
  if (delay > pokeDelay) clockSkew -= delay, clockLast = now;
}
function nap() {
  var t0,
    t1 = taskHead,
    t2,
    time = Infinity;
  while (t1) {
    if (t1._call) {
      if (time > t1._time) time = t1._time;
      t0 = t1, t1 = t1._next;
    } else {
      t2 = t1._next, t1._next = null;
      t1 = t0 ? t0._next = t2 : taskHead = t2;
    }
  }
  taskTail = t0;
  sleep(time);
}
function sleep(time) {
  if (timer_frame) return; // Soonest alarm already set, or will be.
  if (timeout) timeout = clearTimeout(timeout);
  var delay = time - clockNow; // Strictly less than if we recomputed clockNow.
  if (delay > 24) {
    if (time < Infinity) timeout = setTimeout(wake, time - clock.now() - clockSkew);
    if (interval) interval = clearInterval(interval);
  } else {
    if (!interval) clockLast = clock.now(), interval = setInterval(poke, pokeDelay);
    timer_frame = 1, setFrame(wake);
  }
}
;// CONCATENATED MODULE: ./node_modules/.pnpm/d3-timer@3.0.1/node_modules/d3-timer/src/timeout.js

/* harmony default export */ function src_timeout(callback, delay, time) {
  var t = new Timer();
  delay = delay == null ? 0 : +delay;
  t.restart(function (elapsed) {
    t.stop();
    callback(elapsed + delay);
  }, delay, time);
  return t;
}
;// CONCATENATED MODULE: ./node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/schedule.js


var emptyOn = (0,dispatch/* default */.A)("start", "end", "cancel", "interrupt");
var emptyTween = [];
var CREATED = 0;
var SCHEDULED = 1;
var STARTING = 2;
var STARTED = 3;
var RUNNING = 4;
var ENDING = 5;
var ENDED = 6;
/* harmony default export */ function schedule(node, name, id, index, group, timing) {
  var schedules = node.__transition;
  if (!schedules) node.__transition = {};else if (id in schedules) return;
  create(node, id, {
    name: name,
    index: index,
    // For context during callback.
    group: group,
    // For context during callback.
    on: emptyOn,
    tween: emptyTween,
    time: timing.time,
    delay: timing.delay,
    duration: timing.duration,
    ease: timing.ease,
    timer: null,
    state: CREATED
  });
}
function init(node, id) {
  var schedule = get(node, id);
  if (schedule.state > CREATED) throw new Error("too late; already scheduled");
  return schedule;
}
function set(node, id) {
  var schedule = get(node, id);
  if (schedule.state > STARTED) throw new Error("too late; already running");
  return schedule;
}
function get(node, id) {
  var schedule = node.__transition;
  if (!schedule || !(schedule = schedule[id])) throw new Error("transition not found");
  return schedule;
}
function create(node, id, self) {
  var schedules = node.__transition,
    tween;

  // Initialize the self timer when the transition is created.
  // Note the actual delay is not known until the first callback!
  schedules[id] = self;
  self.timer = timer(schedule, 0, self.time);
  function schedule(elapsed) {
    self.state = SCHEDULED;
    self.timer.restart(start, self.delay, self.time);

    // If the elapsed delay is less than our first sleep, start immediately.
    if (self.delay <= elapsed) start(elapsed - self.delay);
  }
  function start(elapsed) {
    var i, j, n, o;

    // If the state is not SCHEDULED, then we previously errored on start.
    if (self.state !== SCHEDULED) return stop();
    for (i in schedules) {
      o = schedules[i];
      if (o.name !== self.name) continue;

      // While this element already has a starting transition during this frame,
      // defer starting an interrupting transition until that transition has a
      // chance to tick (and possibly end); see d3/d3-transition#54!
      if (o.state === STARTED) return src_timeout(start);

      // Interrupt the active transition, if any.
      if (o.state === RUNNING) {
        o.state = ENDED;
        o.timer.stop();
        o.on.call("interrupt", node, node.__data__, o.index, o.group);
        delete schedules[i];
      }

      // Cancel any pre-empted transitions.
      else if (+i < id) {
        o.state = ENDED;
        o.timer.stop();
        o.on.call("cancel", node, node.__data__, o.index, o.group);
        delete schedules[i];
      }
    }

    // Defer the first tick to end of the current frame; see d3/d3#1576.
    // Note the transition may be canceled after start and before the first tick!
    // Note this must be scheduled before the start event; see d3/d3-transition#16!
    // Assuming this is successful, subsequent callbacks go straight to tick.
    src_timeout(function () {
      if (self.state === STARTED) {
        self.state = RUNNING;
        self.timer.restart(tick, self.delay, self.time);
        tick(elapsed);
      }
    });

    // Dispatch the start event.
    // Note this must be done before the tween are initialized.
    self.state = STARTING;
    self.on.call("start", node, node.__data__, self.index, self.group);
    if (self.state !== STARTING) return; // interrupted
    self.state = STARTED;

    // Initialize the tween, deleting null tween.
    tween = new Array(n = self.tween.length);
    for (i = 0, j = -1; i < n; ++i) {
      if (o = self.tween[i].value.call(node, node.__data__, self.index, self.group)) {
        tween[++j] = o;
      }
    }
    tween.length = j + 1;
  }
  function tick(elapsed) {
    var t = elapsed < self.duration ? self.ease.call(null, elapsed / self.duration) : (self.timer.restart(stop), self.state = ENDING, 1),
      i = -1,
      n = tween.length;
    while (++i < n) {
      tween[i].call(node, t);
    }

    // Dispatch the end event.
    if (self.state === ENDING) {
      self.on.call("end", node, node.__data__, self.index, self.group);
      stop();
    }
  }
  function stop() {
    self.state = ENDED;
    self.timer.stop();
    delete schedules[id];
    for (var i in schedules) return; // eslint-disable-line no-unused-vars
    delete node.__transition;
  }
}
;// CONCATENATED MODULE: ./node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/interrupt.js

/* harmony default export */ function interrupt(node, name) {
  var schedules = node.__transition,
    schedule,
    active,
    empty = true,
    i;
  if (!schedules) return;
  name = name == null ? null : name + "";
  for (i in schedules) {
    if ((schedule = schedules[i]).name !== name) {
      empty = false;
      continue;
    }
    active = schedule.state > STARTING && schedule.state < ENDING;
    schedule.state = ENDED;
    schedule.timer.stop();
    schedule.on.call(active ? "interrupt" : "cancel", node, node.__data__, schedule.index, schedule.group);
    delete schedules[i];
  }
  if (empty) delete node.__transition;
}
;// CONCATENATED MODULE: ./node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/selection/interrupt.js

/* harmony default export */ function selection_interrupt(name) {
  return this.each(function () {
    interrupt(this, name);
  });
}
;// CONCATENATED MODULE: ./node_modules/.pnpm/d3-interpolate@3.0.1/node_modules/d3-interpolate/src/number.js
/* harmony default export */ function number(a, b) {
  return a = +a, b = +b, function (t) {
    return a * (1 - t) + b * t;
  };
}
;// CONCATENATED MODULE: ./node_modules/.pnpm/d3-interpolate@3.0.1/node_modules/d3-interpolate/src/transform/decompose.js
var degrees = 180 / Math.PI;
var identity = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
/* harmony default export */ function decompose(a, b, c, d, e, f) {
  var scaleX, scaleY, skewX;
  if (scaleX = Math.sqrt(a * a + b * b)) a /= scaleX, b /= scaleX;
  if (skewX = a * c + b * d) c -= a * skewX, d -= b * skewX;
  if (scaleY = Math.sqrt(c * c + d * d)) c /= scaleY, d /= scaleY, skewX /= scaleY;
  if (a * d < b * c) a = -a, b = -b, skewX = -skewX, scaleX = -scaleX;
  return {
    translateX: e,
    translateY: f,
    rotate: Math.atan2(b, a) * degrees,
    skewX: Math.atan(skewX) * degrees,
    scaleX: scaleX,
    scaleY: scaleY
  };
}
;// CONCATENATED MODULE: ./node_modules/.pnpm/d3-interpolate@3.0.1/node_modules/d3-interpolate/src/transform/parse.js

var svgNode;

/* eslint-disable no-undef */
function parseCss(value) {
  var m = new (typeof DOMMatrix === "function" ? DOMMatrix : WebKitCSSMatrix)(value + "");
  return m.isIdentity ? identity : decompose(m.a, m.b, m.c, m.d, m.e, m.f);
}
function parseSvg(value) {
  if (value == null) return identity;
  if (!svgNode) svgNode = document.createElementNS("http://www.w3.org/2000/svg", "g");
  svgNode.setAttribute("transform", value);
  if (!(value = svgNode.transform.baseVal.consolidate())) return identity;
  value = value.matrix;
  return decompose(value.a, value.b, value.c, value.d, value.e, value.f);
}
;// CONCATENATED MODULE: ./node_modules/.pnpm/d3-interpolate@3.0.1/node_modules/d3-interpolate/src/transform/index.js


function interpolateTransform(parse, pxComma, pxParen, degParen) {
  function pop(s) {
    return s.length ? s.pop() + " " : "";
  }
  function translate(xa, ya, xb, yb, s, q) {
    if (xa !== xb || ya !== yb) {
      var i = s.push("translate(", null, pxComma, null, pxParen);
      q.push({
        i: i - 4,
        x: number(xa, xb)
      }, {
        i: i - 2,
        x: number(ya, yb)
      });
    } else if (xb || yb) {
      s.push("translate(" + xb + pxComma + yb + pxParen);
    }
  }
  function rotate(a, b, s, q) {
    if (a !== b) {
      if (a - b > 180) b += 360;else if (b - a > 180) a += 360; // shortest path
      q.push({
        i: s.push(pop(s) + "rotate(", null, degParen) - 2,
        x: number(a, b)
      });
    } else if (b) {
      s.push(pop(s) + "rotate(" + b + degParen);
    }
  }
  function skewX(a, b, s, q) {
    if (a !== b) {
      q.push({
        i: s.push(pop(s) + "skewX(", null, degParen) - 2,
        x: number(a, b)
      });
    } else if (b) {
      s.push(pop(s) + "skewX(" + b + degParen);
    }
  }
  function scale(xa, ya, xb, yb, s, q) {
    if (xa !== xb || ya !== yb) {
      var i = s.push(pop(s) + "scale(", null, ",", null, ")");
      q.push({
        i: i - 4,
        x: number(xa, xb)
      }, {
        i: i - 2,
        x: number(ya, yb)
      });
    } else if (xb !== 1 || yb !== 1) {
      s.push(pop(s) + "scale(" + xb + "," + yb + ")");
    }
  }
  return function (a, b) {
    var s = [],
      // string constants and placeholders
      q = []; // number interpolators
    a = parse(a), b = parse(b);
    translate(a.translateX, a.translateY, b.translateX, b.translateY, s, q);
    rotate(a.rotate, b.rotate, s, q);
    skewX(a.skewX, b.skewX, s, q);
    scale(a.scaleX, a.scaleY, b.scaleX, b.scaleY, s, q);
    a = b = null; // gc
    return function (t) {
      var i = -1,
        n = q.length,
        o;
      while (++i < n) s[(o = q[i]).i] = o.x(t);
      return s.join("");
    };
  };
}
var interpolateTransformCss = interpolateTransform(parseCss, "px, ", "px)", "deg)");
var interpolateTransformSvg = interpolateTransform(parseSvg, ", ", ")", ")");
// EXTERNAL MODULE: ./node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/namespace.js
var namespace = __webpack_require__(49910);
;// CONCATENATED MODULE: ./node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/tween.js

function tweenRemove(id, name) {
  var tween0, tween1;
  return function () {
    var schedule = set(this, id),
      tween = schedule.tween;

    // If this node shared tween with the previous node,
    // just assign the updated shared tween and we’re done!
    // Otherwise, copy-on-write.
    if (tween !== tween0) {
      tween1 = tween0 = tween;
      for (var i = 0, n = tween1.length; i < n; ++i) {
        if (tween1[i].name === name) {
          tween1 = tween1.slice();
          tween1.splice(i, 1);
          break;
        }
      }
    }
    schedule.tween = tween1;
  };
}
function tweenFunction(id, name, value) {
  var tween0, tween1;
  if (typeof value !== "function") throw new Error();
  return function () {
    var schedule = set(this, id),
      tween = schedule.tween;

    // If this node shared tween with the previous node,
    // just assign the updated shared tween and we’re done!
    // Otherwise, copy-on-write.
    if (tween !== tween0) {
      tween1 = (tween0 = tween).slice();
      for (var t = {
          name: name,
          value: value
        }, i = 0, n = tween1.length; i < n; ++i) {
        if (tween1[i].name === name) {
          tween1[i] = t;
          break;
        }
      }
      if (i === n) tween1.push(t);
    }
    schedule.tween = tween1;
  };
}
/* harmony default export */ function tween(name, value) {
  var id = this._id;
  name += "";
  if (arguments.length < 2) {
    var tween = get(this.node(), id).tween;
    for (var i = 0, n = tween.length, t; i < n; ++i) {
      if ((t = tween[i]).name === name) {
        return t.value;
      }
    }
    return null;
  }
  return this.each((value == null ? tweenRemove : tweenFunction)(id, name, value));
}
function tweenValue(transition, name, value) {
  var id = transition._id;
  transition.each(function () {
    var schedule = set(this, id);
    (schedule.value || (schedule.value = {}))[name] = value.apply(this, arguments);
  });
  return function (node) {
    return get(node, id).value[name];
  };
}
;// CONCATENATED MODULE: ./node_modules/.pnpm/d3-color@3.1.0/node_modules/d3-color/src/define.js
/* harmony default export */ function src_define(constructor, factory, prototype) {
  constructor.prototype = factory.prototype = prototype;
  prototype.constructor = constructor;
}
function extend(parent, definition) {
  var prototype = Object.create(parent.prototype);
  for (var key in definition) prototype[key] = definition[key];
  return prototype;
}
;// CONCATENATED MODULE: ./node_modules/.pnpm/d3-color@3.1.0/node_modules/d3-color/src/color.js

function Color() {}
var _darker = 0.7;

var _brighter = 1 / _darker;

var reI = "\\s*([+-]?\\d+)\\s*",
  reN = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",
  reP = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
  reHex = /^#([0-9a-f]{3,8})$/,
  reRgbInteger = new RegExp("^rgb\\(".concat(reI, ",").concat(reI, ",").concat(reI, "\\)$")),
  reRgbPercent = new RegExp("^rgb\\(".concat(reP, ",").concat(reP, ",").concat(reP, "\\)$")),
  reRgbaInteger = new RegExp("^rgba\\(".concat(reI, ",").concat(reI, ",").concat(reI, ",").concat(reN, "\\)$")),
  reRgbaPercent = new RegExp("^rgba\\(".concat(reP, ",").concat(reP, ",").concat(reP, ",").concat(reN, "\\)$")),
  reHslPercent = new RegExp("^hsl\\(".concat(reN, ",").concat(reP, ",").concat(reP, "\\)$")),
  reHslaPercent = new RegExp("^hsla\\(".concat(reN, ",").concat(reP, ",").concat(reP, ",").concat(reN, "\\)$"));
var named = {
  aliceblue: 0xf0f8ff,
  antiquewhite: 0xfaebd7,
  aqua: 0x00ffff,
  aquamarine: 0x7fffd4,
  azure: 0xf0ffff,
  beige: 0xf5f5dc,
  bisque: 0xffe4c4,
  black: 0x000000,
  blanchedalmond: 0xffebcd,
  blue: 0x0000ff,
  blueviolet: 0x8a2be2,
  brown: 0xa52a2a,
  burlywood: 0xdeb887,
  cadetblue: 0x5f9ea0,
  chartreuse: 0x7fff00,
  chocolate: 0xd2691e,
  coral: 0xff7f50,
  cornflowerblue: 0x6495ed,
  cornsilk: 0xfff8dc,
  crimson: 0xdc143c,
  cyan: 0x00ffff,
  darkblue: 0x00008b,
  darkcyan: 0x008b8b,
  darkgoldenrod: 0xb8860b,
  darkgray: 0xa9a9a9,
  darkgreen: 0x006400,
  darkgrey: 0xa9a9a9,
  darkkhaki: 0xbdb76b,
  darkmagenta: 0x8b008b,
  darkolivegreen: 0x556b2f,
  darkorange: 0xff8c00,
  darkorchid: 0x9932cc,
  darkred: 0x8b0000,
  darksalmon: 0xe9967a,
  darkseagreen: 0x8fbc8f,
  darkslateblue: 0x483d8b,
  darkslategray: 0x2f4f4f,
  darkslategrey: 0x2f4f4f,
  darkturquoise: 0x00ced1,
  darkviolet: 0x9400d3,
  deeppink: 0xff1493,
  deepskyblue: 0x00bfff,
  dimgray: 0x696969,
  dimgrey: 0x696969,
  dodgerblue: 0x1e90ff,
  firebrick: 0xb22222,
  floralwhite: 0xfffaf0,
  forestgreen: 0x228b22,
  fuchsia: 0xff00ff,
  gainsboro: 0xdcdcdc,
  ghostwhite: 0xf8f8ff,
  gold: 0xffd700,
  goldenrod: 0xdaa520,
  gray: 0x808080,
  green: 0x008000,
  greenyellow: 0xadff2f,
  grey: 0x808080,
  honeydew: 0xf0fff0,
  hotpink: 0xff69b4,
  indianred: 0xcd5c5c,
  indigo: 0x4b0082,
  ivory: 0xfffff0,
  khaki: 0xf0e68c,
  lavender: 0xe6e6fa,
  lavenderblush: 0xfff0f5,
  lawngreen: 0x7cfc00,
  lemonchiffon: 0xfffacd,
  lightblue: 0xadd8e6,
  lightcoral: 0xf08080,
  lightcyan: 0xe0ffff,
  lightgoldenrodyellow: 0xfafad2,
  lightgray: 0xd3d3d3,
  lightgreen: 0x90ee90,
  lightgrey: 0xd3d3d3,
  lightpink: 0xffb6c1,
  lightsalmon: 0xffa07a,
  lightseagreen: 0x20b2aa,
  lightskyblue: 0x87cefa,
  lightslategray: 0x778899,
  lightslategrey: 0x778899,
  lightsteelblue: 0xb0c4de,
  lightyellow: 0xffffe0,
  lime: 0x00ff00,
  limegreen: 0x32cd32,
  linen: 0xfaf0e6,
  magenta: 0xff00ff,
  maroon: 0x800000,
  mediumaquamarine: 0x66cdaa,
  mediumblue: 0x0000cd,
  mediumorchid: 0xba55d3,
  mediumpurple: 0x9370db,
  mediumseagreen: 0x3cb371,
  mediumslateblue: 0x7b68ee,
  mediumspringgreen: 0x00fa9a,
  mediumturquoise: 0x48d1cc,
  mediumvioletred: 0xc71585,
  midnightblue: 0x191970,
  mintcream: 0xf5fffa,
  mistyrose: 0xffe4e1,
  moccasin: 0xffe4b5,
  navajowhite: 0xffdead,
  navy: 0x000080,
  oldlace: 0xfdf5e6,
  olive: 0x808000,
  olivedrab: 0x6b8e23,
  orange: 0xffa500,
  orangered: 0xff4500,
  orchid: 0xda70d6,
  palegoldenrod: 0xeee8aa,
  palegreen: 0x98fb98,
  paleturquoise: 0xafeeee,
  palevioletred: 0xdb7093,
  papayawhip: 0xffefd5,
  peachpuff: 0xffdab9,
  peru: 0xcd853f,
  pink: 0xffc0cb,
  plum: 0xdda0dd,
  powderblue: 0xb0e0e6,
  purple: 0x800080,
  rebeccapurple: 0x663399,
  red: 0xff0000,
  rosybrown: 0xbc8f8f,
  royalblue: 0x4169e1,
  saddlebrown: 0x8b4513,
  salmon: 0xfa8072,
  sandybrown: 0xf4a460,
  seagreen: 0x2e8b57,
  seashell: 0xfff5ee,
  sienna: 0xa0522d,
  silver: 0xc0c0c0,
  skyblue: 0x87ceeb,
  slateblue: 0x6a5acd,
  slategray: 0x708090,
  slategrey: 0x708090,
  snow: 0xfffafa,
  springgreen: 0x00ff7f,
  steelblue: 0x4682b4,
  tan: 0xd2b48c,
  teal: 0x008080,
  thistle: 0xd8bfd8,
  tomato: 0xff6347,
  turquoise: 0x40e0d0,
  violet: 0xee82ee,
  wheat: 0xf5deb3,
  white: 0xffffff,
  whitesmoke: 0xf5f5f5,
  yellow: 0xffff00,
  yellowgreen: 0x9acd32
};
src_define(Color, color, {
  copy: function copy(channels) {
    return Object.assign(new this.constructor(), this, channels);
  },
  displayable: function displayable() {
    return this.rgb().displayable();
  },
  hex: color_formatHex,
  // Deprecated! Use color.formatHex.
  formatHex: color_formatHex,
  formatHex8: color_formatHex8,
  formatHsl: color_formatHsl,
  formatRgb: color_formatRgb,
  toString: color_formatRgb
});
function color_formatHex() {
  return this.rgb().formatHex();
}
function color_formatHex8() {
  return this.rgb().formatHex8();
}
function color_formatHsl() {
  return hslConvert(this).formatHsl();
}
function color_formatRgb() {
  return this.rgb().formatRgb();
}
function color(format) {
  var m, l;
  format = (format + "").trim().toLowerCase();
  return (m = reHex.exec(format)) ? (l = m[1].length, m = parseInt(m[1], 16), l === 6 ? rgbn(m) // #ff0000
  : l === 3 ? new Rgb(m >> 8 & 0xf | m >> 4 & 0xf0, m >> 4 & 0xf | m & 0xf0, (m & 0xf) << 4 | m & 0xf, 1) // #f00
  : l === 8 ? rgba(m >> 24 & 0xff, m >> 16 & 0xff, m >> 8 & 0xff, (m & 0xff) / 0xff) // #ff000000
  : l === 4 ? rgba(m >> 12 & 0xf | m >> 8 & 0xf0, m >> 8 & 0xf | m >> 4 & 0xf0, m >> 4 & 0xf | m & 0xf0, ((m & 0xf) << 4 | m & 0xf) / 0xff) // #f000
  : null // invalid hex
  ) : (m = reRgbInteger.exec(format)) ? new Rgb(m[1], m[2], m[3], 1) // rgb(255, 0, 0)
  : (m = reRgbPercent.exec(format)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) // rgb(100%, 0%, 0%)
  : (m = reRgbaInteger.exec(format)) ? rgba(m[1], m[2], m[3], m[4]) // rgba(255, 0, 0, 1)
  : (m = reRgbaPercent.exec(format)) ? rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) // rgb(100%, 0%, 0%, 1)
  : (m = reHslPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) // hsl(120, 50%, 50%)
  : (m = reHslaPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) // hsla(120, 50%, 50%, 1)
  : named.hasOwnProperty(format) ? rgbn(named[format]) // eslint-disable-line no-prototype-builtins
  : format === "transparent" ? new Rgb(NaN, NaN, NaN, 0) : null;
}
function rgbn(n) {
  return new Rgb(n >> 16 & 0xff, n >> 8 & 0xff, n & 0xff, 1);
}
function rgba(r, g, b, a) {
  if (a <= 0) r = g = b = NaN;
  return new Rgb(r, g, b, a);
}
function rgbConvert(o) {
  if (!(o instanceof Color)) o = color(o);
  if (!o) return new Rgb();
  o = o.rgb();
  return new Rgb(o.r, o.g, o.b, o.opacity);
}
function color_rgb(r, g, b, opacity) {
  return arguments.length === 1 ? rgbConvert(r) : new Rgb(r, g, b, opacity == null ? 1 : opacity);
}
function Rgb(r, g, b, opacity) {
  this.r = +r;
  this.g = +g;
  this.b = +b;
  this.opacity = +opacity;
}
src_define(Rgb, color_rgb, extend(Color, {
  brighter: function brighter(k) {
    k = k == null ? _brighter : Math.pow(_brighter, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  darker: function darker(k) {
    k = k == null ? _darker : Math.pow(_darker, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  rgb: function rgb() {
    return this;
  },
  clamp: function clamp() {
    return new Rgb(clampi(this.r), clampi(this.g), clampi(this.b), clampa(this.opacity));
  },
  displayable: function displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: rgb_formatHex,
  // Deprecated! Use color.formatHex.
  formatHex: rgb_formatHex,
  formatHex8: rgb_formatHex8,
  formatRgb: rgb_formatRgb,
  toString: rgb_formatRgb
}));
function rgb_formatHex() {
  return "#".concat(hex(this.r)).concat(hex(this.g)).concat(hex(this.b));
}
function rgb_formatHex8() {
  return "#".concat(hex(this.r)).concat(hex(this.g)).concat(hex(this.b)).concat(hex((isNaN(this.opacity) ? 1 : this.opacity) * 255));
}
function rgb_formatRgb() {
  var a = clampa(this.opacity);
  return "".concat(a === 1 ? "rgb(" : "rgba(").concat(clampi(this.r), ", ").concat(clampi(this.g), ", ").concat(clampi(this.b)).concat(a === 1 ? ")" : ", ".concat(a, ")"));
}
function clampa(opacity) {
  return isNaN(opacity) ? 1 : Math.max(0, Math.min(1, opacity));
}
function clampi(value) {
  return Math.max(0, Math.min(255, Math.round(value) || 0));
}
function hex(value) {
  value = clampi(value);
  return (value < 16 ? "0" : "") + value.toString(16);
}
function hsla(h, s, l, a) {
  if (a <= 0) h = s = l = NaN;else if (l <= 0 || l >= 1) h = s = NaN;else if (s <= 0) h = NaN;
  return new Hsl(h, s, l, a);
}
function hslConvert(o) {
  if (o instanceof Hsl) return new Hsl(o.h, o.s, o.l, o.opacity);
  if (!(o instanceof Color)) o = color(o);
  if (!o) return new Hsl();
  if (o instanceof Hsl) return o;
  o = o.rgb();
  var r = o.r / 255,
    g = o.g / 255,
    b = o.b / 255,
    min = Math.min(r, g, b),
    max = Math.max(r, g, b),
    h = NaN,
    s = max - min,
    l = (max + min) / 2;
  if (s) {
    if (r === max) h = (g - b) / s + (g < b) * 6;else if (g === max) h = (b - r) / s + 2;else h = (r - g) / s + 4;
    s /= l < 0.5 ? max + min : 2 - max - min;
    h *= 60;
  } else {
    s = l > 0 && l < 1 ? 0 : h;
  }
  return new Hsl(h, s, l, o.opacity);
}
function hsl(h, s, l, opacity) {
  return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s, l, opacity == null ? 1 : opacity);
}
function Hsl(h, s, l, opacity) {
  this.h = +h;
  this.s = +s;
  this.l = +l;
  this.opacity = +opacity;
}
src_define(Hsl, hsl, extend(Color, {
  brighter: function brighter(k) {
    k = k == null ? _brighter : Math.pow(_brighter, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  darker: function darker(k) {
    k = k == null ? _darker : Math.pow(_darker, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  rgb: function rgb() {
    var h = this.h % 360 + (this.h < 0) * 360,
      s = isNaN(h) || isNaN(this.s) ? 0 : this.s,
      l = this.l,
      m2 = l + (l < 0.5 ? l : 1 - l) * s,
      m1 = 2 * l - m2;
    return new Rgb(hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2), hsl2rgb(h, m1, m2), hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2), this.opacity);
  },
  clamp: function clamp() {
    return new Hsl(clamph(this.h), clampt(this.s), clampt(this.l), clampa(this.opacity));
  },
  displayable: function displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl: function formatHsl() {
    var a = clampa(this.opacity);
    return "".concat(a === 1 ? "hsl(" : "hsla(").concat(clamph(this.h), ", ").concat(clampt(this.s) * 100, "%, ").concat(clampt(this.l) * 100, "%").concat(a === 1 ? ")" : ", ".concat(a, ")"));
  }
}));
function clamph(value) {
  value = (value || 0) % 360;
  return value < 0 ? value + 360 : value;
}
function clampt(value) {
  return Math.max(0, Math.min(1, value || 0));
}

/* From FvD 13.37, CSS Color Module Level 3 */
function hsl2rgb(h, m1, m2) {
  return (h < 60 ? m1 + (m2 - m1) * h / 60 : h < 180 ? m2 : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60 : m1) * 255;
}
;// CONCATENATED MODULE: ./node_modules/.pnpm/d3-interpolate@3.0.1/node_modules/d3-interpolate/src/basis.js
function basis(t1, v0, v1, v2, v3) {
  var t2 = t1 * t1,
    t3 = t2 * t1;
  return ((1 - 3 * t1 + 3 * t2 - t3) * v0 + (4 - 6 * t2 + 3 * t3) * v1 + (1 + 3 * t1 + 3 * t2 - 3 * t3) * v2 + t3 * v3) / 6;
}
/* harmony default export */ function src_basis(values) {
  var n = values.length - 1;
  return function (t) {
    var i = t <= 0 ? t = 0 : t >= 1 ? (t = 1, n - 1) : Math.floor(t * n),
      v1 = values[i],
      v2 = values[i + 1],
      v0 = i > 0 ? values[i - 1] : 2 * v1 - v2,
      v3 = i < n - 1 ? values[i + 2] : 2 * v2 - v1;
    return basis((t - i / n) * n, v0, v1, v2, v3);
  };
}
;// CONCATENATED MODULE: ./node_modules/.pnpm/d3-interpolate@3.0.1/node_modules/d3-interpolate/src/basisClosed.js

/* harmony default export */ function basisClosed(values) {
  var n = values.length;
  return function (t) {
    var i = Math.floor(((t %= 1) < 0 ? ++t : t) * n),
      v0 = values[(i + n - 1) % n],
      v1 = values[i % n],
      v2 = values[(i + 1) % n],
      v3 = values[(i + 2) % n];
    return basis((t - i / n) * n, v0, v1, v2, v3);
  };
}
;// CONCATENATED MODULE: ./node_modules/.pnpm/d3-interpolate@3.0.1/node_modules/d3-interpolate/src/constant.js
/* harmony default export */ var src_constant = (function (x) {
  return function () {
    return x;
  };
});
;// CONCATENATED MODULE: ./node_modules/.pnpm/d3-interpolate@3.0.1/node_modules/d3-interpolate/src/color.js

function linear(a, d) {
  return function (t) {
    return a + t * d;
  };
}
function exponential(a, b, y) {
  return a = Math.pow(a, y), b = Math.pow(b, y) - a, y = 1 / y, function (t) {
    return Math.pow(a + t * b, y);
  };
}
function hue(a, b) {
  var d = b - a;
  return d ? linear(a, d > 180 || d < -180 ? d - 360 * Math.round(d / 360) : d) : constant(isNaN(a) ? b : a);
}
function gamma(y) {
  return (y = +y) === 1 ? nogamma : function (a, b) {
    return b - a ? exponential(a, b, y) : src_constant(isNaN(a) ? b : a);
  };
}
function nogamma(a, b) {
  var d = b - a;
  return d ? linear(a, d) : src_constant(isNaN(a) ? b : a);
}
;// CONCATENATED MODULE: ./node_modules/.pnpm/d3-interpolate@3.0.1/node_modules/d3-interpolate/src/rgb.js




/* harmony default export */ var rgb = ((function rgbGamma(y) {
  var color = gamma(y);
  function rgb(start, end) {
    var r = color((start = color_rgb(start)).r, (end = color_rgb(end)).r),
      g = color(start.g, end.g),
      b = color(start.b, end.b),
      opacity = nogamma(start.opacity, end.opacity);
    return function (t) {
      start.r = r(t);
      start.g = g(t);
      start.b = b(t);
      start.opacity = opacity(t);
      return start + "";
    };
  }
  rgb.gamma = rgbGamma;
  return rgb;
})(1));
function rgbSpline(spline) {
  return function (colors) {
    var n = colors.length,
      r = new Array(n),
      g = new Array(n),
      b = new Array(n),
      i,
      color;
    for (i = 0; i < n; ++i) {
      color = color_rgb(colors[i]);
      r[i] = color.r || 0;
      g[i] = color.g || 0;
      b[i] = color.b || 0;
    }
    r = spline(r);
    g = spline(g);
    b = spline(b);
    color.opacity = 1;
    return function (t) {
      color.r = r(t);
      color.g = g(t);
      color.b = b(t);
      return color + "";
    };
  };
}
var rgbBasis = rgbSpline(src_basis);
var rgbBasisClosed = rgbSpline(basisClosed);
;// CONCATENATED MODULE: ./node_modules/.pnpm/d3-interpolate@3.0.1/node_modules/d3-interpolate/src/string.js

var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
  reB = new RegExp(reA.source, "g");
function zero(b) {
  return function () {
    return b;
  };
}
function one(b) {
  return function (t) {
    return b(t) + "";
  };
}
/* harmony default export */ function string(a, b) {
  var bi = reA.lastIndex = reB.lastIndex = 0,
    // scan index for next number in b
    am,
    // current match in a
    bm,
    // current match in b
    bs,
    // string preceding current number in b, if any
    i = -1,
    // index in s
    s = [],
    // string constants and placeholders
    q = []; // number interpolators

  // Coerce inputs to strings.
  a = a + "", b = b + "";

  // Interpolate pairs of numbers in a & b.
  while ((am = reA.exec(a)) && (bm = reB.exec(b))) {
    if ((bs = bm.index) > bi) {
      // a string precedes the next number in b
      bs = b.slice(bi, bs);
      if (s[i]) s[i] += bs; // coalesce with previous string
      else s[++i] = bs;
    }
    if ((am = am[0]) === (bm = bm[0])) {
      // numbers in a & b match
      if (s[i]) s[i] += bm; // coalesce with previous string
      else s[++i] = bm;
    } else {
      // interpolate non-matching numbers
      s[++i] = null;
      q.push({
        i: i,
        x: number(am, bm)
      });
    }
    bi = reB.lastIndex;
  }

  // Add remains of b.
  if (bi < b.length) {
    bs = b.slice(bi);
    if (s[i]) s[i] += bs; // coalesce with previous string
    else s[++i] = bs;
  }

  // Special optimization for only a single match.
  // Otherwise, interpolate each of the numbers and rejoin the string.
  return s.length < 2 ? q[0] ? one(q[0].x) : zero(b) : (b = q.length, function (t) {
    for (var i = 0, o; i < b; ++i) s[(o = q[i]).i] = o.x(t);
    return s.join("");
  });
}
;// CONCATENATED MODULE: ./node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/interpolate.js


/* harmony default export */ function interpolate(a, b) {
  var c;
  return (typeof b === "number" ? number : b instanceof color ? rgb : (c = color(b)) ? (b = c, rgb) : string)(a, b);
}
;// CONCATENATED MODULE: ./node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/attr.js




function attrRemove(name) {
  return function () {
    this.removeAttribute(name);
  };
}
function attrRemoveNS(fullname) {
  return function () {
    this.removeAttributeNS(fullname.space, fullname.local);
  };
}
function attrConstant(name, interpolate, value1) {
  var string00,
    string1 = value1 + "",
    interpolate0;
  return function () {
    var string0 = this.getAttribute(name);
    return string0 === string1 ? null : string0 === string00 ? interpolate0 : interpolate0 = interpolate(string00 = string0, value1);
  };
}
function attrConstantNS(fullname, interpolate, value1) {
  var string00,
    string1 = value1 + "",
    interpolate0;
  return function () {
    var string0 = this.getAttributeNS(fullname.space, fullname.local);
    return string0 === string1 ? null : string0 === string00 ? interpolate0 : interpolate0 = interpolate(string00 = string0, value1);
  };
}
function attrFunction(name, interpolate, value) {
  var string00, string10, interpolate0;
  return function () {
    var string0,
      value1 = value(this),
      string1;
    if (value1 == null) return void this.removeAttribute(name);
    string0 = this.getAttribute(name);
    string1 = value1 + "";
    return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
  };
}
function attrFunctionNS(fullname, interpolate, value) {
  var string00, string10, interpolate0;
  return function () {
    var string0,
      value1 = value(this),
      string1;
    if (value1 == null) return void this.removeAttributeNS(fullname.space, fullname.local);
    string0 = this.getAttributeNS(fullname.space, fullname.local);
    string1 = value1 + "";
    return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
  };
}
/* harmony default export */ function attr(name, value) {
  var fullname = (0,namespace/* default */.A)(name),
    i = fullname === "transform" ? interpolateTransformSvg : interpolate;
  return this.attrTween(name, typeof value === "function" ? (fullname.local ? attrFunctionNS : attrFunction)(fullname, i, tweenValue(this, "attr." + name, value)) : value == null ? (fullname.local ? attrRemoveNS : attrRemove)(fullname) : (fullname.local ? attrConstantNS : attrConstant)(fullname, i, value));
}
;// CONCATENATED MODULE: ./node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/attrTween.js

function attrInterpolate(name, i) {
  return function (t) {
    this.setAttribute(name, i.call(this, t));
  };
}
function attrInterpolateNS(fullname, i) {
  return function (t) {
    this.setAttributeNS(fullname.space, fullname.local, i.call(this, t));
  };
}
function attrTweenNS(fullname, value) {
  var t0, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0) t0 = (i0 = i) && attrInterpolateNS(fullname, i);
    return t0;
  }
  tween._value = value;
  return tween;
}
function attrTween(name, value) {
  var t0, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0) t0 = (i0 = i) && attrInterpolate(name, i);
    return t0;
  }
  tween._value = value;
  return tween;
}
/* harmony default export */ function transition_attrTween(name, value) {
  var key = "attr." + name;
  if (arguments.length < 2) return (key = this.tween(key)) && key._value;
  if (value == null) return this.tween(key, null);
  if (typeof value !== "function") throw new Error();
  var fullname = (0,namespace/* default */.A)(name);
  return this.tween(key, (fullname.local ? attrTweenNS : attrTween)(fullname, value));
}
;// CONCATENATED MODULE: ./node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/delay.js

function delayFunction(id, value) {
  return function () {
    init(this, id).delay = +value.apply(this, arguments);
  };
}
function delayConstant(id, value) {
  return value = +value, function () {
    init(this, id).delay = value;
  };
}
/* harmony default export */ function delay(value) {
  var id = this._id;
  return arguments.length ? this.each((typeof value === "function" ? delayFunction : delayConstant)(id, value)) : get(this.node(), id).delay;
}
;// CONCATENATED MODULE: ./node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/duration.js

function durationFunction(id, value) {
  return function () {
    set(this, id).duration = +value.apply(this, arguments);
  };
}
function durationConstant(id, value) {
  return value = +value, function () {
    set(this, id).duration = value;
  };
}
/* harmony default export */ function duration(value) {
  var id = this._id;
  return arguments.length ? this.each((typeof value === "function" ? durationFunction : durationConstant)(id, value)) : get(this.node(), id).duration;
}
;// CONCATENATED MODULE: ./node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/ease.js

function easeConstant(id, value) {
  if (typeof value !== "function") throw new Error();
  return function () {
    set(this, id).ease = value;
  };
}
/* harmony default export */ function ease(value) {
  var id = this._id;
  return arguments.length ? this.each(easeConstant(id, value)) : get(this.node(), id).ease;
}
;// CONCATENATED MODULE: ./node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/easeVarying.js

function easeVarying(id, value) {
  return function () {
    var v = value.apply(this, arguments);
    if (typeof v !== "function") throw new Error();
    set(this, id).ease = v;
  };
}
/* harmony default export */ function transition_easeVarying(value) {
  if (typeof value !== "function") throw new Error();
  return this.each(easeVarying(this._id, value));
}
// EXTERNAL MODULE: ./node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/matcher.js
var matcher = __webpack_require__(19635);
;// CONCATENATED MODULE: ./node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/filter.js


/* harmony default export */ function filter(match) {
  if (typeof match !== "function") match = (0,matcher/* default */.A)(match);
  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
      if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
        subgroup.push(node);
      }
    }
  }
  return new Transition(subgroups, this._parents, this._name, this._id);
}
;// CONCATENATED MODULE: ./node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/merge.js

/* harmony default export */ function merge(transition) {
  if (transition._id !== this._id) throw new Error();
  for (var groups0 = this._groups, groups1 = transition._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
    for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group0[i] || group1[i]) {
        merge[i] = node;
      }
    }
  }
  for (; j < m0; ++j) {
    merges[j] = groups0[j];
  }
  return new Transition(merges, this._parents, this._name, this._id);
}
;// CONCATENATED MODULE: ./node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/on.js

function start(name) {
  return (name + "").trim().split(/^|\s+/).every(function (t) {
    var i = t.indexOf(".");
    if (i >= 0) t = t.slice(0, i);
    return !t || t === "start";
  });
}
function onFunction(id, name, listener) {
  var on0,
    on1,
    sit = start(name) ? init : set;
  return function () {
    var schedule = sit(this, id),
      on = schedule.on;

    // If this node shared a dispatch with the previous node,
    // just assign the updated shared dispatch and we’re done!
    // Otherwise, copy-on-write.
    if (on !== on0) (on1 = (on0 = on).copy()).on(name, listener);
    schedule.on = on1;
  };
}
/* harmony default export */ function on(name, listener) {
  var id = this._id;
  return arguments.length < 2 ? get(this.node(), id).on.on(name) : this.each(onFunction(id, name, listener));
}
;// CONCATENATED MODULE: ./node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/remove.js
function removeFunction(id) {
  return function () {
    var parent = this.parentNode;
    for (var i in this.__transition) if (+i !== id) return;
    if (parent) parent.removeChild(this);
  };
}
/* harmony default export */ function remove() {
  return this.on("end.remove", removeFunction(this._id));
}
// EXTERNAL MODULE: ./node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selector.js
var selector = __webpack_require__(84120);
;// CONCATENATED MODULE: ./node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/select.js



/* harmony default export */ function transition_select(select) {
  var name = this._name,
    id = this._id;
  if (typeof select !== "function") select = (0,selector/* default */.A)(select);
  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
      if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
        if ("__data__" in node) subnode.__data__ = node.__data__;
        subgroup[i] = subnode;
        schedule(subgroup[i], name, id, i, subgroup, get(node, id));
      }
    }
  }
  return new Transition(subgroups, this._parents, name, id);
}
// EXTERNAL MODULE: ./node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selectorAll.js
var selectorAll = __webpack_require__(59561);
;// CONCATENATED MODULE: ./node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/selectAll.js



/* harmony default export */ function selectAll(select) {
  var name = this._name,
    id = this._id;
  if (typeof select !== "function") select = (0,selectorAll/* default */.A)(select);
  for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        for (var children = select.call(node, node.__data__, i, group), child, inherit = get(node, id), k = 0, l = children.length; k < l; ++k) {
          if (child = children[k]) {
            schedule(child, name, id, k, children, inherit);
          }
        }
        subgroups.push(children);
        parents.push(node);
      }
    }
  }
  return new Transition(subgroups, parents, name, id);
}
;// CONCATENATED MODULE: ./node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/selection.js

var Selection = selection/* default */.Ay.prototype.constructor;
/* harmony default export */ function transition_selection() {
  return new Selection(this._groups, this._parents);
}
// EXTERNAL MODULE: ./node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/style.js
var style = __webpack_require__(94585);
;// CONCATENATED MODULE: ./node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/style.js





function styleNull(name, interpolate) {
  var string00, string10, interpolate0;
  return function () {
    var string0 = (0,style/* styleValue */.j)(this, name),
      string1 = (this.style.removeProperty(name), (0,style/* styleValue */.j)(this, name));
    return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : interpolate0 = interpolate(string00 = string0, string10 = string1);
  };
}
function styleRemove(name) {
  return function () {
    this.style.removeProperty(name);
  };
}
function styleConstant(name, interpolate, value1) {
  var string00,
    string1 = value1 + "",
    interpolate0;
  return function () {
    var string0 = (0,style/* styleValue */.j)(this, name);
    return string0 === string1 ? null : string0 === string00 ? interpolate0 : interpolate0 = interpolate(string00 = string0, value1);
  };
}
function styleFunction(name, interpolate, value) {
  var string00, string10, interpolate0;
  return function () {
    var string0 = (0,style/* styleValue */.j)(this, name),
      value1 = value(this),
      string1 = value1 + "";
    if (value1 == null) string1 = value1 = (this.style.removeProperty(name), (0,style/* styleValue */.j)(this, name));
    return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
  };
}
function styleMaybeRemove(id, name) {
  var on0,
    on1,
    listener0,
    key = "style." + name,
    event = "end." + key,
    remove;
  return function () {
    var schedule = set(this, id),
      on = schedule.on,
      listener = schedule.value[key] == null ? remove || (remove = styleRemove(name)) : undefined;

    // If this node shared a dispatch with the previous node,
    // just assign the updated shared dispatch and we’re done!
    // Otherwise, copy-on-write.
    if (on !== on0 || listener0 !== listener) (on1 = (on0 = on).copy()).on(event, listener0 = listener);
    schedule.on = on1;
  };
}
/* harmony default export */ function transition_style(name, value, priority) {
  var i = (name += "") === "transform" ? interpolateTransformCss : interpolate;
  return value == null ? this.styleTween(name, styleNull(name, i)).on("end.style." + name, styleRemove(name)) : typeof value === "function" ? this.styleTween(name, styleFunction(name, i, tweenValue(this, "style." + name, value))).each(styleMaybeRemove(this._id, name)) : this.styleTween(name, styleConstant(name, i, value), priority).on("end.style." + name, null);
}
;// CONCATENATED MODULE: ./node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/styleTween.js
function styleInterpolate(name, i, priority) {
  return function (t) {
    this.style.setProperty(name, i.call(this, t), priority);
  };
}
function styleTween(name, value, priority) {
  var t, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0) t = (i0 = i) && styleInterpolate(name, i, priority);
    return t;
  }
  tween._value = value;
  return tween;
}
/* harmony default export */ function transition_styleTween(name, value, priority) {
  var key = "style." + (name += "");
  if (arguments.length < 2) return (key = this.tween(key)) && key._value;
  if (value == null) return this.tween(key, null);
  if (typeof value !== "function") throw new Error();
  return this.tween(key, styleTween(name, value, priority == null ? "" : priority));
}
;// CONCATENATED MODULE: ./node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/text.js

function textConstant(value) {
  return function () {
    this.textContent = value;
  };
}
function textFunction(value) {
  return function () {
    var value1 = value(this);
    this.textContent = value1 == null ? "" : value1;
  };
}
/* harmony default export */ function transition_text(value) {
  return this.tween("text", typeof value === "function" ? textFunction(tweenValue(this, "text", value)) : textConstant(value == null ? "" : value + ""));
}
;// CONCATENATED MODULE: ./node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/textTween.js
function textInterpolate(i) {
  return function (t) {
    this.textContent = i.call(this, t);
  };
}
function textTween(value) {
  var t0, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0) t0 = (i0 = i) && textInterpolate(i);
    return t0;
  }
  tween._value = value;
  return tween;
}
/* harmony default export */ function transition_textTween(value) {
  var key = "text";
  if (arguments.length < 1) return (key = this.tween(key)) && key._value;
  if (value == null) return this.tween(key, null);
  if (typeof value !== "function") throw new Error();
  return this.tween(key, textTween(value));
}
;// CONCATENATED MODULE: ./node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/transition.js


/* harmony default export */ function transition() {
  var name = this._name,
    id0 = this._id,
    id1 = newId();
  for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        var inherit = get(node, id0);
        schedule(node, name, id1, i, group, {
          time: inherit.time + inherit.delay + inherit.duration,
          delay: 0,
          duration: inherit.duration,
          ease: inherit.ease
        });
      }
    }
  }
  return new Transition(groups, this._parents, name, id1);
}
;// CONCATENATED MODULE: ./node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/end.js

/* harmony default export */ function end() {
  var on0,
    on1,
    that = this,
    id = that._id,
    size = that.size();
  return new Promise(function (resolve, reject) {
    var cancel = {
        value: reject
      },
      end = {
        value: function value() {
          if (--size === 0) resolve();
        }
      };
    that.each(function () {
      var schedule = set(this, id),
        on = schedule.on;

      // If this node shared a dispatch with the previous node,
      // just assign the updated shared dispatch and we’re done!
      // Otherwise, copy-on-write.
      if (on !== on0) {
        on1 = (on0 = on).copy();
        on1._.cancel.push(cancel);
        on1._.interrupt.push(cancel);
        on1._.end.push(end);
      }
      schedule.on = on1;
    });

    // The selection was empty, resolve end immediately
    if (size === 0) resolve();
  });
}
;// CONCATENATED MODULE: ./node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/index.js
function transition_typeof(o) { "@babel/helpers - typeof"; return transition_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, transition_typeof(o); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == transition_typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != transition_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != transition_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }





















var id = 0;
function Transition(groups, parents, name, id) {
  this._groups = groups;
  this._parents = parents;
  this._name = name;
  this._id = id;
}
function transition_transition(name) {
  return (0,selection/* default */.Ay)().transition(name);
}
function newId() {
  return ++id;
}
var selection_prototype = selection/* default */.Ay.prototype;
Transition.prototype = transition_transition.prototype = _defineProperty({
  constructor: Transition,
  select: transition_select,
  selectAll: selectAll,
  selectChild: selection_prototype.selectChild,
  selectChildren: selection_prototype.selectChildren,
  filter: filter,
  merge: merge,
  selection: transition_selection,
  transition: transition,
  call: selection_prototype.call,
  nodes: selection_prototype.nodes,
  node: selection_prototype.node,
  size: selection_prototype.size,
  empty: selection_prototype.empty,
  each: selection_prototype.each,
  on: on,
  attr: attr,
  attrTween: transition_attrTween,
  style: transition_style,
  styleTween: transition_styleTween,
  text: transition_text,
  textTween: transition_textTween,
  remove: remove,
  tween: tween,
  delay: delay,
  duration: duration,
  ease: ease,
  easeVarying: transition_easeVarying,
  end: end
}, Symbol.iterator, selection_prototype[Symbol.iterator]);
;// CONCATENATED MODULE: ./node_modules/.pnpm/d3-ease@3.0.1/node_modules/d3-ease/src/cubic.js
function cubicIn(t) {
  return t * t * t;
}
function cubicOut(t) {
  return --t * t * t + 1;
}
function cubicInOut(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
;// CONCATENATED MODULE: ./node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/selection/transition.js




var defaultTiming = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: cubicInOut
};
function inherit(node, id) {
  var timing;
  while (!(timing = node.__transition) || !(timing = timing[id])) {
    if (!(node = node.parentNode)) {
      throw new Error("transition ".concat(id, " not found"));
    }
  }
  return timing;
}
/* harmony default export */ function selection_transition(name) {
  var id, timing;
  if (name instanceof Transition) {
    id = name._id, name = name._name;
  } else {
    id = newId(), (timing = defaultTiming).time = now(), name = name == null ? null : name + "";
  }
  for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        schedule(node, name, id, i, group, timing || inherit(node, id));
      }
    }
  }
  return new Transition(groups, this._parents, name, id);
}
;// CONCATENATED MODULE: ./node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/selection/index.js



selection/* default */.Ay.prototype.interrupt = selection_interrupt;
selection/* default */.Ay.prototype.transition = selection_transition;
;// CONCATENATED MODULE: ./node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/index.js




;// CONCATENATED MODULE: ./node_modules/.pnpm/d3-zoom@3.0.0/node_modules/d3-zoom/src/constant.js
/* harmony default export */ var d3_zoom_src_constant = (function (x) {
  return function () {
    return x;
  };
});
;// CONCATENATED MODULE: ./node_modules/.pnpm/d3-zoom@3.0.0/node_modules/d3-zoom/src/event.js
function ZoomEvent(type, _ref) {
  var sourceEvent = _ref.sourceEvent,
    target = _ref.target,
    transform = _ref.transform,
    dispatch = _ref.dispatch;
  Object.defineProperties(this, {
    type: {
      value: type,
      enumerable: true,
      configurable: true
    },
    sourceEvent: {
      value: sourceEvent,
      enumerable: true,
      configurable: true
    },
    target: {
      value: target,
      enumerable: true,
      configurable: true
    },
    transform: {
      value: transform,
      enumerable: true,
      configurable: true
    },
    _: {
      value: dispatch
    }
  });
}
;// CONCATENATED MODULE: ./node_modules/.pnpm/d3-zoom@3.0.0/node_modules/d3-zoom/src/transform.js
function Transform(k, x, y) {
  this.k = k;
  this.x = x;
  this.y = y;
}
Transform.prototype = {
  constructor: Transform,
  scale: function scale(k) {
    return k === 1 ? this : new Transform(this.k * k, this.x, this.y);
  },
  translate: function translate(x, y) {
    return x === 0 & y === 0 ? this : new Transform(this.k, this.x + this.k * x, this.y + this.k * y);
  },
  apply: function apply(point) {
    return [point[0] * this.k + this.x, point[1] * this.k + this.y];
  },
  applyX: function applyX(x) {
    return x * this.k + this.x;
  },
  applyY: function applyY(y) {
    return y * this.k + this.y;
  },
  invert: function invert(location) {
    return [(location[0] - this.x) / this.k, (location[1] - this.y) / this.k];
  },
  invertX: function invertX(x) {
    return (x - this.x) / this.k;
  },
  invertY: function invertY(y) {
    return (y - this.y) / this.k;
  },
  rescaleX: function rescaleX(x) {
    return x.copy().domain(x.range().map(this.invertX, this).map(x.invert, x));
  },
  rescaleY: function rescaleY(y) {
    return y.copy().domain(y.range().map(this.invertY, this).map(y.invert, y));
  },
  toString: function toString() {
    return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
  }
};
var transform_identity = new Transform(1, 0, 0);
transform.prototype = Transform.prototype;
function transform(node) {
  while (!node.__zoom) if (!(node = node.parentNode)) return transform_identity;
  return node.__zoom;
}
;// CONCATENATED MODULE: ./node_modules/.pnpm/d3-zoom@3.0.0/node_modules/d3-zoom/src/noevent.js
function nopropagation(event) {
  event.stopImmediatePropagation();
}
/* harmony default export */ function noevent(event) {
  event.preventDefault();
  event.stopImmediatePropagation();
}
;// CONCATENATED MODULE: ./node_modules/.pnpm/d3-zoom@3.0.0/node_modules/d3-zoom/src/zoom.js










// Ignore right-click, since that should open the context menu.
// except for pinch-to-zoom, which is sent as a wheel+ctrlKey event
function defaultFilter(event) {
  return (!event.ctrlKey || event.type === 'wheel') && !event.button;
}
function defaultExtent() {
  var e = this;
  if (e instanceof SVGElement) {
    e = e.ownerSVGElement || e;
    if (e.hasAttribute("viewBox")) {
      e = e.viewBox.baseVal;
      return [[e.x, e.y], [e.x + e.width, e.y + e.height]];
    }
    return [[0, 0], [e.width.baseVal.value, e.height.baseVal.value]];
  }
  return [[0, 0], [e.clientWidth, e.clientHeight]];
}
function defaultTransform() {
  return this.__zoom || transform_identity;
}
function defaultWheelDelta(event) {
  return -event.deltaY * (event.deltaMode === 1 ? 0.05 : event.deltaMode ? 1 : 0.002) * (event.ctrlKey ? 10 : 1);
}
function defaultTouchable() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function defaultConstrain(transform, extent, translateExtent) {
  var dx0 = transform.invertX(extent[0][0]) - translateExtent[0][0],
    dx1 = transform.invertX(extent[1][0]) - translateExtent[1][0],
    dy0 = transform.invertY(extent[0][1]) - translateExtent[0][1],
    dy1 = transform.invertY(extent[1][1]) - translateExtent[1][1];
  return transform.translate(dx1 > dx0 ? (dx0 + dx1) / 2 : Math.min(0, dx0) || Math.max(0, dx1), dy1 > dy0 ? (dy0 + dy1) / 2 : Math.min(0, dy0) || Math.max(0, dy1));
}
/* harmony default export */ function zoom() {
  var filter = defaultFilter,
    extent = defaultExtent,
    constrain = defaultConstrain,
    wheelDelta = defaultWheelDelta,
    touchable = defaultTouchable,
    scaleExtent = [0, Infinity],
    translateExtent = [[-Infinity, -Infinity], [Infinity, Infinity]],
    duration = 250,
    interpolate = src_zoom,
    listeners = (0,dispatch/* default */.A)("start", "zoom", "end"),
    touchstarting,
    touchfirst,
    touchending,
    touchDelay = 500,
    wheelDelay = 150,
    clickDistance2 = 0,
    tapDistance = 10;
  function zoom(selection) {
    selection.property("__zoom", defaultTransform).on("wheel.zoom", wheeled, {
      passive: false
    }).on("mousedown.zoom", mousedowned).on("dblclick.zoom", dblclicked).filter(touchable).on("touchstart.zoom", touchstarted).on("touchmove.zoom", touchmoved).on("touchend.zoom touchcancel.zoom", touchended).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  zoom.transform = function (collection, transform, point, event) {
    var selection = collection.selection ? collection.selection() : collection;
    selection.property("__zoom", defaultTransform);
    if (collection !== selection) {
      schedule(collection, transform, point, event);
    } else {
      selection.interrupt().each(function () {
        gesture(this, arguments).event(event).start().zoom(null, typeof transform === "function" ? transform.apply(this, arguments) : transform).end();
      });
    }
  };
  zoom.scaleBy = function (selection, k, p, event) {
    zoom.scaleTo(selection, function () {
      var k0 = this.__zoom.k,
        k1 = typeof k === "function" ? k.apply(this, arguments) : k;
      return k0 * k1;
    }, p, event);
  };
  zoom.scaleTo = function (selection, k, p, event) {
    zoom.transform(selection, function () {
      var e = extent.apply(this, arguments),
        t0 = this.__zoom,
        p0 = p == null ? centroid(e) : typeof p === "function" ? p.apply(this, arguments) : p,
        p1 = t0.invert(p0),
        k1 = typeof k === "function" ? k.apply(this, arguments) : k;
      return constrain(translate(scale(t0, k1), p0, p1), e, translateExtent);
    }, p, event);
  };
  zoom.translateBy = function (selection, x, y, event) {
    zoom.transform(selection, function () {
      return constrain(this.__zoom.translate(typeof x === "function" ? x.apply(this, arguments) : x, typeof y === "function" ? y.apply(this, arguments) : y), extent.apply(this, arguments), translateExtent);
    }, null, event);
  };
  zoom.translateTo = function (selection, x, y, p, event) {
    zoom.transform(selection, function () {
      var e = extent.apply(this, arguments),
        t = this.__zoom,
        p0 = p == null ? centroid(e) : typeof p === "function" ? p.apply(this, arguments) : p;
      return constrain(transform_identity.translate(p0[0], p0[1]).scale(t.k).translate(typeof x === "function" ? -x.apply(this, arguments) : -x, typeof y === "function" ? -y.apply(this, arguments) : -y), e, translateExtent);
    }, p, event);
  };
  function scale(transform, k) {
    k = Math.max(scaleExtent[0], Math.min(scaleExtent[1], k));
    return k === transform.k ? transform : new Transform(k, transform.x, transform.y);
  }
  function translate(transform, p0, p1) {
    var x = p0[0] - p1[0] * transform.k,
      y = p0[1] - p1[1] * transform.k;
    return x === transform.x && y === transform.y ? transform : new Transform(transform.k, x, y);
  }
  function centroid(extent) {
    return [(+extent[0][0] + +extent[1][0]) / 2, (+extent[0][1] + +extent[1][1]) / 2];
  }
  function schedule(transition, transform, point, event) {
    transition.on("start.zoom", function () {
      gesture(this, arguments).event(event).start();
    }).on("interrupt.zoom end.zoom", function () {
      gesture(this, arguments).event(event).end();
    }).tween("zoom", function () {
      var that = this,
        args = arguments,
        g = gesture(that, args).event(event),
        e = extent.apply(that, args),
        p = point == null ? centroid(e) : typeof point === "function" ? point.apply(that, args) : point,
        w = Math.max(e[1][0] - e[0][0], e[1][1] - e[0][1]),
        a = that.__zoom,
        b = typeof transform === "function" ? transform.apply(that, args) : transform,
        i = interpolate(a.invert(p).concat(w / a.k), b.invert(p).concat(w / b.k));
      return function (t) {
        if (t === 1) t = b; // Avoid rounding error on end.
        else {
          var l = i(t),
            k = w / l[2];
          t = new Transform(k, p[0] - l[0] * k, p[1] - l[1] * k);
        }
        g.zoom(null, t);
      };
    });
  }
  function gesture(that, args, clean) {
    return !clean && that.__zooming || new Gesture(that, args);
  }
  function Gesture(that, args) {
    this.that = that;
    this.args = args;
    this.active = 0;
    this.sourceEvent = null;
    this.extent = extent.apply(that, args);
    this.taps = 0;
  }
  Gesture.prototype = {
    event: function event(_event) {
      if (_event) this.sourceEvent = _event;
      return this;
    },
    start: function start() {
      if (++this.active === 1) {
        this.that.__zooming = this;
        this.emit("start");
      }
      return this;
    },
    zoom: function zoom(key, transform) {
      if (this.mouse && key !== "mouse") this.mouse[1] = transform.invert(this.mouse[0]);
      if (this.touch0 && key !== "touch") this.touch0[1] = transform.invert(this.touch0[0]);
      if (this.touch1 && key !== "touch") this.touch1[1] = transform.invert(this.touch1[0]);
      this.that.__zoom = transform;
      this.emit("zoom");
      return this;
    },
    end: function end() {
      if (--this.active === 0) {
        delete this.that.__zooming;
        this.emit("end");
      }
      return this;
    },
    emit: function emit(type) {
      var d = (0,src_select/* default */.A)(this.that).datum();
      listeners.call(type, this.that, new ZoomEvent(type, {
        sourceEvent: this.sourceEvent,
        target: zoom,
        type: type,
        transform: this.that.__zoom,
        dispatch: listeners
      }), d);
    }
  };
  function wheeled(event) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    if (!filter.apply(this, arguments)) return;
    var g = gesture(this, args).event(event),
      t = this.__zoom,
      k = Math.max(scaleExtent[0], Math.min(scaleExtent[1], t.k * Math.pow(2, wheelDelta.apply(this, arguments)))),
      p = (0,pointer/* default */.A)(event);

    // If the mouse is in the same location as before, reuse it.
    // If there were recent wheel events, reset the wheel idle timeout.
    if (g.wheel) {
      if (g.mouse[0][0] !== p[0] || g.mouse[0][1] !== p[1]) {
        g.mouse[1] = t.invert(g.mouse[0] = p);
      }
      clearTimeout(g.wheel);
    }

    // If this wheel event won’t trigger a transform change, ignore it.
    else if (t.k === k) return;

    // Otherwise, capture the mouse point and location at the start.
    else {
      g.mouse = [p, t.invert(p)];
      interrupt(this);
      g.start();
    }
    noevent(event);
    g.wheel = setTimeout(wheelidled, wheelDelay);
    g.zoom("mouse", constrain(translate(scale(t, k), g.mouse[0], g.mouse[1]), g.extent, translateExtent));
    function wheelidled() {
      g.wheel = null;
      g.end();
    }
  }
  function mousedowned(event) {
    for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }
    if (touchending || !filter.apply(this, arguments)) return;
    var currentTarget = event.currentTarget,
      g = gesture(this, args, true).event(event),
      v = (0,src_select/* default */.A)(event.view).on("mousemove.zoom", mousemoved, true).on("mouseup.zoom", mouseupped, true),
      p = (0,pointer/* default */.A)(event, currentTarget),
      x0 = event.clientX,
      y0 = event.clientY;
    (0,nodrag/* default */.A)(event.view);
    nopropagation(event);
    g.mouse = [p, this.__zoom.invert(p)];
    interrupt(this);
    g.start();
    function mousemoved(event) {
      noevent(event);
      if (!g.moved) {
        var dx = event.clientX - x0,
          dy = event.clientY - y0;
        g.moved = dx * dx + dy * dy > clickDistance2;
      }
      g.event(event).zoom("mouse", constrain(translate(g.that.__zoom, g.mouse[0] = (0,pointer/* default */.A)(event, currentTarget), g.mouse[1]), g.extent, translateExtent));
    }
    function mouseupped(event) {
      v.on("mousemove.zoom mouseup.zoom", null);
      (0,nodrag/* yesdrag */.y)(event.view, g.moved);
      noevent(event);
      g.event(event).end();
    }
  }
  function dblclicked(event) {
    for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      args[_key3 - 1] = arguments[_key3];
    }
    if (!filter.apply(this, arguments)) return;
    var t0 = this.__zoom,
      p0 = (0,pointer/* default */.A)(event.changedTouches ? event.changedTouches[0] : event, this),
      p1 = t0.invert(p0),
      k1 = t0.k * (event.shiftKey ? 0.5 : 2),
      t1 = constrain(translate(scale(t0, k1), p0, p1), extent.apply(this, args), translateExtent);
    noevent(event);
    if (duration > 0) (0,src_select/* default */.A)(this).transition().duration(duration).call(schedule, t1, p0, event);else (0,src_select/* default */.A)(this).call(zoom.transform, t1, p0, event);
  }
  function touchstarted(event) {
    for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
      args[_key4 - 1] = arguments[_key4];
    }
    if (!filter.apply(this, arguments)) return;
    var touches = event.touches,
      n = touches.length,
      g = gesture(this, args, event.changedTouches.length === n).event(event),
      started,
      i,
      t,
      p;
    nopropagation(event);
    for (i = 0; i < n; ++i) {
      t = touches[i], p = (0,pointer/* default */.A)(t, this);
      p = [p, this.__zoom.invert(p), t.identifier];
      if (!g.touch0) g.touch0 = p, started = true, g.taps = 1 + !!touchstarting;else if (!g.touch1 && g.touch0[2] !== p[2]) g.touch1 = p, g.taps = 0;
    }
    if (touchstarting) touchstarting = clearTimeout(touchstarting);
    if (started) {
      if (g.taps < 2) touchfirst = p[0], touchstarting = setTimeout(function () {
        touchstarting = null;
      }, touchDelay);
      interrupt(this);
      g.start();
    }
  }
  function touchmoved(event) {
    if (!this.__zooming) return;
    for (var _len5 = arguments.length, args = new Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
      args[_key5 - 1] = arguments[_key5];
    }
    var g = gesture(this, args).event(event),
      touches = event.changedTouches,
      n = touches.length,
      i,
      t,
      p,
      l;
    noevent(event);
    for (i = 0; i < n; ++i) {
      t = touches[i], p = (0,pointer/* default */.A)(t, this);
      if (g.touch0 && g.touch0[2] === t.identifier) g.touch0[0] = p;else if (g.touch1 && g.touch1[2] === t.identifier) g.touch1[0] = p;
    }
    t = g.that.__zoom;
    if (g.touch1) {
      var p0 = g.touch0[0],
        l0 = g.touch0[1],
        p1 = g.touch1[0],
        l1 = g.touch1[1],
        dp = (dp = p1[0] - p0[0]) * dp + (dp = p1[1] - p0[1]) * dp,
        dl = (dl = l1[0] - l0[0]) * dl + (dl = l1[1] - l0[1]) * dl;
      t = scale(t, Math.sqrt(dp / dl));
      p = [(p0[0] + p1[0]) / 2, (p0[1] + p1[1]) / 2];
      l = [(l0[0] + l1[0]) / 2, (l0[1] + l1[1]) / 2];
    } else if (g.touch0) p = g.touch0[0], l = g.touch0[1];else return;
    g.zoom("touch", constrain(translate(t, p, l), g.extent, translateExtent));
  }
  function touchended(event) {
    for (var _len6 = arguments.length, args = new Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
      args[_key6 - 1] = arguments[_key6];
    }
    if (!this.__zooming) return;
    var g = gesture(this, args).event(event),
      touches = event.changedTouches,
      n = touches.length,
      i,
      t;
    nopropagation(event);
    if (touchending) clearTimeout(touchending);
    touchending = setTimeout(function () {
      touchending = null;
    }, touchDelay);
    for (i = 0; i < n; ++i) {
      t = touches[i];
      if (g.touch0 && g.touch0[2] === t.identifier) delete g.touch0;else if (g.touch1 && g.touch1[2] === t.identifier) delete g.touch1;
    }
    if (g.touch1 && !g.touch0) g.touch0 = g.touch1, delete g.touch1;
    if (g.touch0) g.touch0[1] = this.__zoom.invert(g.touch0[0]);else {
      g.end();
      // If this was a dbltap, reroute to the (optional) dblclick.zoom handler.
      if (g.taps === 2) {
        t = (0,pointer/* default */.A)(t, this);
        if (Math.hypot(touchfirst[0] - t[0], touchfirst[1] - t[1]) < tapDistance) {
          var p = (0,src_select/* default */.A)(this).on("dblclick.zoom");
          if (p) p.apply(this, arguments);
        }
      }
    }
  }
  zoom.wheelDelta = function (_) {
    return arguments.length ? (wheelDelta = typeof _ === "function" ? _ : d3_zoom_src_constant(+_), zoom) : wheelDelta;
  };
  zoom.filter = function (_) {
    return arguments.length ? (filter = typeof _ === "function" ? _ : d3_zoom_src_constant(!!_), zoom) : filter;
  };
  zoom.touchable = function (_) {
    return arguments.length ? (touchable = typeof _ === "function" ? _ : d3_zoom_src_constant(!!_), zoom) : touchable;
  };
  zoom.extent = function (_) {
    return arguments.length ? (extent = typeof _ === "function" ? _ : d3_zoom_src_constant([[+_[0][0], +_[0][1]], [+_[1][0], +_[1][1]]]), zoom) : extent;
  };
  zoom.scaleExtent = function (_) {
    return arguments.length ? (scaleExtent[0] = +_[0], scaleExtent[1] = +_[1], zoom) : [scaleExtent[0], scaleExtent[1]];
  };
  zoom.translateExtent = function (_) {
    return arguments.length ? (translateExtent[0][0] = +_[0][0], translateExtent[1][0] = +_[1][0], translateExtent[0][1] = +_[0][1], translateExtent[1][1] = +_[1][1], zoom) : [[translateExtent[0][0], translateExtent[0][1]], [translateExtent[1][0], translateExtent[1][1]]];
  };
  zoom.constrain = function (_) {
    return arguments.length ? (constrain = _, zoom) : constrain;
  };
  zoom.duration = function (_) {
    return arguments.length ? (duration = +_, zoom) : duration;
  };
  zoom.interpolate = function (_) {
    return arguments.length ? (interpolate = _, zoom) : interpolate;
  };
  zoom.on = function () {
    var value = listeners.on.apply(listeners, arguments);
    return value === listeners ? zoom : value;
  };
  zoom.clickDistance = function (_) {
    return arguments.length ? (clickDistance2 = (_ = +_) * _, zoom) : Math.sqrt(clickDistance2);
  };
  zoom.tapDistance = function (_) {
    return arguments.length ? (tapDistance = +_, zoom) : tapDistance;
  };
  return zoom;
}
;// CONCATENATED MODULE: ./node_modules/.pnpm/d3-zoom@3.0.0/node_modules/d3-zoom/src/index.js



/***/ }),

/***/ 61513:
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Pj: function() { return /* binding */ useStore; }
/* harmony export */ });
/* unused harmony exports create, default */
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(14552);
/* harmony import */ var use_sync_external_store_shim_with_selector_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(79121);




var useDebugValue = react__WEBPACK_IMPORTED_MODULE_0__.useDebugValue;
var useSyncExternalStoreWithSelector = use_sync_external_store_shim_with_selector_js__WEBPACK_IMPORTED_MODULE_1__.useSyncExternalStoreWithSelector;
var didWarnAboutEqualityFn = false;
var identity = function identity(arg) {
  return arg;
};
function useStore(api) {
  var selector = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : identity;
  var equalityFn = arguments.length > 2 ? arguments[2] : undefined;
  if (( false ? 0 : void 0) !== "production" && equalityFn && !didWarnAboutEqualityFn) {
    console.warn("[DEPRECATED] Use `createWithEqualityFn` instead of `create` or use `useStoreWithEqualityFn` instead of `useStore`. They can be imported from 'zustand/traditional'. https://github.com/pmndrs/zustand/discussions/1937");
    didWarnAboutEqualityFn = true;
  }
  var slice = useSyncExternalStoreWithSelector(api.subscribe, api.getState, api.getServerState || api.getInitialState, selector, equalityFn);
  useDebugValue(slice);
  return slice;
}
var createImpl = function createImpl(createState) {
  if (( false ? 0 : void 0) !== "production" && typeof createState !== "function") {
    console.warn("[DEPRECATED] Passing a vanilla store will be unsupported in a future version. Instead use `import { useStore } from 'zustand'`.");
  }
  var api = typeof createState === "function" ? createStore(createState) : createState;
  var useBoundStore = function useBoundStore(selector, equalityFn) {
    return useStore(api, selector, equalityFn);
  };
  Object.assign(useBoundStore, api);
  return useBoundStore;
};
var create = function create(createState) {
  return createState ? createImpl(createState) : createImpl;
};
var react = function react(createState) {
  if (( false ? 0 : void 0) !== "production") {
    console.warn("[DEPRECATED] Default export is deprecated. Instead use `import { create } from 'zustand'`.");
  }
  return create(createState);
};


/***/ }),

/***/ 26897:
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   k: function() { return /* binding */ useShallow; }
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(14552);
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }

function shallow(objA, objB) {
  if (Object.is(objA, objB)) {
    return true;
  }
  if (_typeof(objA) !== "object" || objA === null || _typeof(objB) !== "object" || objB === null) {
    return false;
  }
  if (objA instanceof Map && objB instanceof Map) {
    if (objA.size !== objB.size) return false;
    var _iterator = _createForOfIteratorHelper(objA),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var _step$value = _slicedToArray(_step.value, 2),
          key = _step$value[0],
          value = _step$value[1];
        if (!Object.is(value, objB.get(key))) {
          return false;
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    return true;
  }
  if (objA instanceof Set && objB instanceof Set) {
    if (objA.size !== objB.size) return false;
    var _iterator2 = _createForOfIteratorHelper(objA),
      _step2;
    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var _value = _step2.value;
        if (!objB.has(_value)) {
          return false;
        }
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
    return true;
  }
  var keysA = Object.keys(objA);
  if (keysA.length !== Object.keys(objB).length) {
    return false;
  }
  for (var _i = 0, _keysA = keysA; _i < _keysA.length; _i++) {
    var keyA = _keysA[_i];
    if (!Object.prototype.hasOwnProperty.call(objB, keyA) || !Object.is(objA[keyA], objB[keyA])) {
      return false;
    }
  }
  return true;
}
var useRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef;
function useShallow(selector) {
  var prev = useRef();
  return function (state) {
    var next = selector(state);
    return shallow(prev.current, next) ? prev.current : prev.current = next;
  };
}


/***/ }),

/***/ 33753:
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   x: function() { return /* binding */ shallow$1; }
/* harmony export */ });
/* unused harmony export default */
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function shallow$1(objA, objB) {
  if (Object.is(objA, objB)) {
    return true;
  }
  if (_typeof(objA) !== "object" || objA === null || _typeof(objB) !== "object" || objB === null) {
    return false;
  }
  if (objA instanceof Map && objB instanceof Map) {
    if (objA.size !== objB.size) return false;
    var _iterator = _createForOfIteratorHelper(objA),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var _step$value = _slicedToArray(_step.value, 2),
          key = _step$value[0],
          value = _step$value[1];
        if (!Object.is(value, objB.get(key))) {
          return false;
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    return true;
  }
  if (objA instanceof Set && objB instanceof Set) {
    if (objA.size !== objB.size) return false;
    var _iterator2 = _createForOfIteratorHelper(objA),
      _step2;
    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var _value = _step2.value;
        if (!objB.has(_value)) {
          return false;
        }
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
    return true;
  }
  var keysA = Object.keys(objA);
  if (keysA.length !== Object.keys(objB).length) {
    return false;
  }
  for (var _i = 0, _keysA = keysA; _i < _keysA.length; _i++) {
    var keyA = _keysA[_i];
    if (!Object.prototype.hasOwnProperty.call(objB, keyA) || !Object.is(objA[keyA], objB[keyA])) {
      return false;
    }
  }
  return true;
}
var shallow = function shallow(objA, objB) {
  if (( false ? 0 : void 0) !== "production") {
    console.warn("[DEPRECATED] Default export is deprecated. Instead use `import { shallow } from 'zustand/shallow'`.");
  }
  return shallow$1(objA, objB);
};


/***/ })

}]);
//# sourceMappingURL=chunk.378.b765a960.js.map