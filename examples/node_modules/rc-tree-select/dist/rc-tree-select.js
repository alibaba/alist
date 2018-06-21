(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-dom"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "react-dom"], factory);
	else if(typeof exports === 'object')
		exports["rc-tree-select"] = factory(require("react"), require("react-dom"));
	else
		root["rc-tree-select"] = factory(root["React"], root["ReactDOM"]);
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE_0__, __WEBPACK_EXTERNAL_MODULE_6__) {
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 71);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof2 = __webpack_require__(21);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _setPrototypeOf = __webpack_require__(101);

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = __webpack_require__(105);

var _create2 = _interopRequireDefault(_create);

var _typeof2 = __webpack_require__(21);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
  }

  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (process.env.NODE_ENV !== 'production') {
  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
    Symbol.for &&
    Symbol.for('react.element')) ||
    0xeac7;

  var isValidElement = function(object) {
    return typeof object === 'object' &&
      object !== null &&
      object.$$typeof === REACT_ELEMENT_TYPE;
  };

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = __webpack_require__(116)(isValidElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __webpack_require__(118)();
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(17)))

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _assign = __webpack_require__(108);

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _assign2.default || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_6__;

/***/ }),
/* 7 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 8 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.5' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(19);
var IE8_DOM_DEFINE = __webpack_require__(49);
var toPrimitive = __webpack_require__(31);
var dP = Object.defineProperty;

exports.f = __webpack_require__(10) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(20)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 11 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(7);
var core = __webpack_require__(8);
var ctx = __webpack_require__(48);
var hide = __webpack_require__(13);
var has = __webpack_require__(11);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && has(exports, key)) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(9);
var createDesc = __webpack_require__(22);
module.exports = __webpack_require__(10) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(53);
var defined = __webpack_require__(29);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(35)('wks');
var uid = __webpack_require__(24);
var Symbol = __webpack_require__(7).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 17 */
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
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__propertyUtils__ = __webpack_require__(134);
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };



var RE_NUM = /[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source;

var getComputedStyleX = void 0;

// https://stackoverflow.com/a/3485654/3040605
function forceRelayout(elem) {
  var originalStyle = elem.style.display;
  elem.style.display = 'none';
  elem.offsetHeight; // eslint-disable-line
  elem.style.display = originalStyle;
}

function css(el, name, v) {
  var value = v;
  if ((typeof name === 'undefined' ? 'undefined' : _typeof(name)) === 'object') {
    for (var i in name) {
      if (name.hasOwnProperty(i)) {
        css(el, i, name[i]);
      }
    }
    return undefined;
  }
  if (typeof value !== 'undefined') {
    if (typeof value === 'number') {
      value = value + 'px';
    }
    el.style[name] = value;
    return undefined;
  }
  return getComputedStyleX(el, name);
}

function getClientPosition(elem) {
  var box = void 0;
  var x = void 0;
  var y = void 0;
  var doc = elem.ownerDocument;
  var body = doc.body;
  var docElem = doc && doc.documentElement;
  // 根据 GBS 最新数据，A-Grade Browsers 都已支持 getBoundingClientRect 方法，不用再考虑传统的实现方式
  box = elem.getBoundingClientRect();

  // 注：jQuery 还考虑减去 docElem.clientLeft/clientTop
  // 但测试发现，这样反而会导致当 html 和 body 有边距/边框样式时，获取的值不正确
  // 此外，ie6 会忽略 html 的 margin 值，幸运地是没有谁会去设置 html 的 margin

  x = box.left;
  y = box.top;

  // In IE, most of the time, 2 extra pixels are added to the top and left
  // due to the implicit 2-pixel inset border.  In IE6/7 quirks mode and
  // IE6 standards mode, this border can be overridden by setting the
  // document element's border to zero -- thus, we cannot rely on the
  // offset always being 2 pixels.

  // In quirks mode, the offset can be determined by querying the body's
  // clientLeft/clientTop, but in standards mode, it is found by querying
  // the document element's clientLeft/clientTop.  Since we already called
  // getClientBoundingRect we have already forced a reflow, so it is not
  // too expensive just to query them all.

  // ie 下应该减去窗口的边框吧，毕竟默认 absolute 都是相对窗口定位的
  // 窗口边框标准是设 documentElement ,quirks 时设置 body
  // 最好禁止在 body 和 html 上边框 ，但 ie < 9 html 默认有 2px ，减去
  // 但是非 ie 不可能设置窗口边框，body html 也不是窗口 ,ie 可以通过 html,body 设置
  // 标准 ie 下 docElem.clientTop 就是 border-top
  // ie7 html 即窗口边框改变不了。永远为 2
  // 但标准 firefox/chrome/ie9 下 docElem.clientTop 是窗口边框，即使设了 border-top 也为 0

  x -= docElem.clientLeft || body.clientLeft || 0;
  y -= docElem.clientTop || body.clientTop || 0;

  return {
    left: x,
    top: y
  };
}

function getScroll(w, top) {
  var ret = w['page' + (top ? 'Y' : 'X') + 'Offset'];
  var method = 'scroll' + (top ? 'Top' : 'Left');
  if (typeof ret !== 'number') {
    var d = w.document;
    // ie6,7,8 standard mode
    ret = d.documentElement[method];
    if (typeof ret !== 'number') {
      // quirks mode
      ret = d.body[method];
    }
  }
  return ret;
}

function getScrollLeft(w) {
  return getScroll(w);
}

function getScrollTop(w) {
  return getScroll(w, true);
}

function getOffset(el) {
  var pos = getClientPosition(el);
  var doc = el.ownerDocument;
  var w = doc.defaultView || doc.parentWindow;
  pos.left += getScrollLeft(w);
  pos.top += getScrollTop(w);
  return pos;
}

/**
 * A crude way of determining if an object is a window
 * @member util
 */
function isWindow(obj) {
  // must use == for ie8
  /* eslint eqeqeq:0 */
  return obj !== null && obj !== undefined && obj == obj.window;
}

function getDocument(node) {
  if (isWindow(node)) {
    return node.document;
  }
  if (node.nodeType === 9) {
    return node;
  }
  return node.ownerDocument;
}

function _getComputedStyle(elem, name, cs) {
  var computedStyle = cs;
  var val = '';
  var d = getDocument(elem);
  computedStyle = computedStyle || d.defaultView.getComputedStyle(elem, null);

  // https://github.com/kissyteam/kissy/issues/61
  if (computedStyle) {
    val = computedStyle.getPropertyValue(name) || computedStyle[name];
  }

  return val;
}

var _RE_NUM_NO_PX = new RegExp('^(' + RE_NUM + ')(?!px)[a-z%]+$', 'i');
var RE_POS = /^(top|right|bottom|left)$/;
var CURRENT_STYLE = 'currentStyle';
var RUNTIME_STYLE = 'runtimeStyle';
var LEFT = 'left';
var PX = 'px';

function _getComputedStyleIE(elem, name) {
  // currentStyle maybe null
  // http://msdn.microsoft.com/en-us/library/ms535231.aspx
  var ret = elem[CURRENT_STYLE] && elem[CURRENT_STYLE][name];

  // 当 width/height 设置为百分比时，通过 pixelLeft 方式转换的 width/height 值
  // 一开始就处理了! CUSTOM_STYLE.height,CUSTOM_STYLE.width ,cssHook 解决@2011-08-19
  // 在 ie 下不对，需要直接用 offset 方式
  // borderWidth 等值也有问题，但考虑到 borderWidth 设为百分比的概率很小，这里就不考虑了

  // From the awesome hack by Dean Edwards
  // http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291
  // If we're not dealing with a regular pixel number
  // but a number that has a weird ending, we need to convert it to pixels
  // exclude left right for relativity
  if (_RE_NUM_NO_PX.test(ret) && !RE_POS.test(name)) {
    // Remember the original values
    var style = elem.style;
    var left = style[LEFT];
    var rsLeft = elem[RUNTIME_STYLE][LEFT];

    // prevent flashing of content
    elem[RUNTIME_STYLE][LEFT] = elem[CURRENT_STYLE][LEFT];

    // Put in the new values to get a computed value out
    style[LEFT] = name === 'fontSize' ? '1em' : ret || 0;
    ret = style.pixelLeft + PX;

    // Revert the changed values
    style[LEFT] = left;

    elem[RUNTIME_STYLE][LEFT] = rsLeft;
  }
  return ret === '' ? 'auto' : ret;
}

if (typeof window !== 'undefined') {
  getComputedStyleX = window.getComputedStyle ? _getComputedStyle : _getComputedStyleIE;
}

function getOffsetDirection(dir, option) {
  if (dir === 'left') {
    return option.useCssRight ? 'right' : dir;
  }
  return option.useCssBottom ? 'bottom' : dir;
}

function oppositeOffsetDirection(dir) {
  if (dir === 'left') {
    return 'right';
  } else if (dir === 'right') {
    return 'left';
  } else if (dir === 'top') {
    return 'bottom';
  } else if (dir === 'bottom') {
    return 'top';
  }
}

// 设置 elem 相对 elem.ownerDocument 的坐标
function setLeftTop(elem, offset, option) {
  // set position first, in-case top/left are set even on static elem
  if (css(elem, 'position') === 'static') {
    elem.style.position = 'relative';
  }
  var presetH = -999;
  var presetV = -999;
  var horizontalProperty = getOffsetDirection('left', option);
  var verticalProperty = getOffsetDirection('top', option);
  var oppositeHorizontalProperty = oppositeOffsetDirection(horizontalProperty);
  var oppositeVerticalProperty = oppositeOffsetDirection(verticalProperty);

  if (horizontalProperty !== 'left') {
    presetH = 999;
  }

  if (verticalProperty !== 'top') {
    presetV = 999;
  }
  var originalTransition = '';
  var originalOffset = getOffset(elem);
  if ('left' in offset || 'top' in offset) {
    originalTransition = Object(__WEBPACK_IMPORTED_MODULE_0__propertyUtils__["c" /* getTransitionProperty */])(elem) || '';
    Object(__WEBPACK_IMPORTED_MODULE_0__propertyUtils__["e" /* setTransitionProperty */])(elem, 'none');
  }
  if ('left' in offset) {
    elem.style[oppositeHorizontalProperty] = '';
    elem.style[horizontalProperty] = presetH + 'px';
  }
  if ('top' in offset) {
    elem.style[oppositeVerticalProperty] = '';
    elem.style[verticalProperty] = presetV + 'px';
  }
  // force relayout
  forceRelayout(elem);
  var old = getOffset(elem);
  var originalStyle = {};
  for (var key in offset) {
    if (offset.hasOwnProperty(key)) {
      var dir = getOffsetDirection(key, option);
      var preset = key === 'left' ? presetH : presetV;
      var off = originalOffset[key] - old[key];
      if (dir === key) {
        originalStyle[dir] = preset + off;
      } else {
        originalStyle[dir] = preset - off;
      }
    }
  }
  css(elem, originalStyle);
  // force relayout
  forceRelayout(elem);
  if ('left' in offset || 'top' in offset) {
    Object(__WEBPACK_IMPORTED_MODULE_0__propertyUtils__["e" /* setTransitionProperty */])(elem, originalTransition);
  }
  var ret = {};
  for (var _key in offset) {
    if (offset.hasOwnProperty(_key)) {
      var _dir = getOffsetDirection(_key, option);
      var _off = offset[_key] - originalOffset[_key];
      if (_key === _dir) {
        ret[_dir] = originalStyle[_dir] + _off;
      } else {
        ret[_dir] = originalStyle[_dir] - _off;
      }
    }
  }
  css(elem, ret);
}

function setTransform(elem, offset) {
  var originalOffset = getOffset(elem);
  var originalXY = Object(__WEBPACK_IMPORTED_MODULE_0__propertyUtils__["b" /* getTransformXY */])(elem);
  var resultXY = { x: originalXY.x, y: originalXY.y };
  if ('left' in offset) {
    resultXY.x = originalXY.x + offset.left - originalOffset.left;
  }
  if ('top' in offset) {
    resultXY.y = originalXY.y + offset.top - originalOffset.top;
  }
  Object(__WEBPACK_IMPORTED_MODULE_0__propertyUtils__["d" /* setTransformXY */])(elem, resultXY);
}

function setOffset(elem, offset, option) {
  if (option.useCssRight || option.useCssBottom) {
    setLeftTop(elem, offset, option);
  } else if (option.useCssTransform && Object(__WEBPACK_IMPORTED_MODULE_0__propertyUtils__["a" /* getTransformName */])() in document.body.style) {
    setTransform(elem, offset, option);
  } else {
    setLeftTop(elem, offset, option);
  }
}

function each(arr, fn) {
  for (var i = 0; i < arr.length; i++) {
    fn(arr[i]);
  }
}

function isBorderBoxFn(elem) {
  return getComputedStyleX(elem, 'boxSizing') === 'border-box';
}

var BOX_MODELS = ['margin', 'border', 'padding'];
var CONTENT_INDEX = -1;
var PADDING_INDEX = 2;
var BORDER_INDEX = 1;
var MARGIN_INDEX = 0;

function swap(elem, options, callback) {
  var old = {};
  var style = elem.style;
  var name = void 0;

  // Remember the old values, and insert the new ones
  for (name in options) {
    if (options.hasOwnProperty(name)) {
      old[name] = style[name];
      style[name] = options[name];
    }
  }

  callback.call(elem);

  // Revert the old values
  for (name in options) {
    if (options.hasOwnProperty(name)) {
      style[name] = old[name];
    }
  }
}

function getPBMWidth(elem, props, which) {
  var value = 0;
  var prop = void 0;
  var j = void 0;
  var i = void 0;
  for (j = 0; j < props.length; j++) {
    prop = props[j];
    if (prop) {
      for (i = 0; i < which.length; i++) {
        var cssProp = void 0;
        if (prop === 'border') {
          cssProp = '' + prop + which[i] + 'Width';
        } else {
          cssProp = prop + which[i];
        }
        value += parseFloat(getComputedStyleX(elem, cssProp)) || 0;
      }
    }
  }
  return value;
}

var domUtils = {};

each(['Width', 'Height'], function (name) {
  domUtils['doc' + name] = function (refWin) {
    var d = refWin.document;
    return Math.max(
    // firefox chrome documentElement.scrollHeight< body.scrollHeight
    // ie standard mode : documentElement.scrollHeight> body.scrollHeight
    d.documentElement['scroll' + name],
    // quirks : documentElement.scrollHeight 最大等于可视窗口多一点？
    d.body['scroll' + name], domUtils['viewport' + name](d));
  };

  domUtils['viewport' + name] = function (win) {
    // pc browser includes scrollbar in window.innerWidth
    var prop = 'client' + name;
    var doc = win.document;
    var body = doc.body;
    var documentElement = doc.documentElement;
    var documentElementProp = documentElement[prop];
    // 标准模式取 documentElement
    // backcompat 取 body
    return doc.compatMode === 'CSS1Compat' && documentElementProp || body && body[prop] || documentElementProp;
  };
});

/*
 得到元素的大小信息
 @param elem
 @param name
 @param {String} [extra]  'padding' : (css width) + padding
 'border' : (css width) + padding + border
 'margin' : (css width) + padding + border + margin
 */
function getWH(elem, name, ex) {
  var extra = ex;
  if (isWindow(elem)) {
    return name === 'width' ? domUtils.viewportWidth(elem) : domUtils.viewportHeight(elem);
  } else if (elem.nodeType === 9) {
    return name === 'width' ? domUtils.docWidth(elem) : domUtils.docHeight(elem);
  }
  var which = name === 'width' ? ['Left', 'Right'] : ['Top', 'Bottom'];
  var borderBoxValue = name === 'width' ? elem.getBoundingClientRect().width : elem.getBoundingClientRect().height;
  var computedStyle = getComputedStyleX(elem);
  var isBorderBox = isBorderBoxFn(elem, computedStyle);
  var cssBoxValue = 0;
  if (borderBoxValue === null || borderBoxValue === undefined || borderBoxValue <= 0) {
    borderBoxValue = undefined;
    // Fall back to computed then un computed css if necessary
    cssBoxValue = getComputedStyleX(elem, name);
    if (cssBoxValue === null || cssBoxValue === undefined || Number(cssBoxValue) < 0) {
      cssBoxValue = elem.style[name] || 0;
    }
    // Normalize '', auto, and prepare for extra
    cssBoxValue = parseFloat(cssBoxValue) || 0;
  }
  if (extra === undefined) {
    extra = isBorderBox ? BORDER_INDEX : CONTENT_INDEX;
  }
  var borderBoxValueOrIsBorderBox = borderBoxValue !== undefined || isBorderBox;
  var val = borderBoxValue || cssBoxValue;
  if (extra === CONTENT_INDEX) {
    if (borderBoxValueOrIsBorderBox) {
      return val - getPBMWidth(elem, ['border', 'padding'], which, computedStyle);
    }
    return cssBoxValue;
  } else if (borderBoxValueOrIsBorderBox) {
    if (extra === BORDER_INDEX) {
      return val;
    }
    return val + (extra === PADDING_INDEX ? -getPBMWidth(elem, ['border'], which, computedStyle) : getPBMWidth(elem, ['margin'], which, computedStyle));
  }
  return cssBoxValue + getPBMWidth(elem, BOX_MODELS.slice(extra), which, computedStyle);
}

var cssShow = {
  position: 'absolute',
  visibility: 'hidden',
  display: 'block'
};

// fix #119 : https://github.com/kissyteam/kissy/issues/119
function getWHIgnoreDisplay() {
  for (var _len = arguments.length, args = Array(_len), _key2 = 0; _key2 < _len; _key2++) {
    args[_key2] = arguments[_key2];
  }

  var val = void 0;
  var elem = args[0];
  // in case elem is window
  // elem.offsetWidth === undefined
  if (elem.offsetWidth !== 0) {
    val = getWH.apply(undefined, args);
  } else {
    swap(elem, cssShow, function () {
      val = getWH.apply(undefined, args);
    });
  }
  return val;
}

each(['width', 'height'], function (name) {
  var first = name.charAt(0).toUpperCase() + name.slice(1);
  domUtils['outer' + first] = function (el, includeMargin) {
    return el && getWHIgnoreDisplay(el, name, includeMargin ? MARGIN_INDEX : BORDER_INDEX);
  };
  var which = name === 'width' ? ['Left', 'Right'] : ['Top', 'Bottom'];

  domUtils[name] = function (elem, v) {
    var val = v;
    if (val !== undefined) {
      if (elem) {
        var computedStyle = getComputedStyleX(elem);
        var isBorderBox = isBorderBoxFn(elem);
        if (isBorderBox) {
          val += getPBMWidth(elem, ['padding', 'border'], which, computedStyle);
        }
        return css(elem, name, val);
      }
      return undefined;
    }
    return elem && getWHIgnoreDisplay(elem, name, CONTENT_INDEX);
  };
});

function mix(to, from) {
  for (var i in from) {
    if (from.hasOwnProperty(i)) {
      to[i] = from[i];
    }
  }
  return to;
}

var utils = {
  getWindow: function getWindow(node) {
    if (node && node.document && node.setTimeout) {
      return node;
    }
    var doc = node.ownerDocument || node;
    return doc.defaultView || doc.parentWindow;
  },

  getDocument: getDocument,
  offset: function offset(el, value, option) {
    if (typeof value !== 'undefined') {
      setOffset(el, value, option || {});
    } else {
      return getOffset(el);
    }
  },

  isWindow: isWindow,
  each: each,
  css: css,
  clone: function clone(obj) {
    var i = void 0;
    var ret = {};
    for (i in obj) {
      if (obj.hasOwnProperty(i)) {
        ret[i] = obj[i];
      }
    }
    var overflow = obj.overflow;
    if (overflow) {
      for (i in obj) {
        if (obj.hasOwnProperty(i)) {
          ret.overflow[i] = obj.overflow[i];
        }
      }
    }
    return ret;
  },

  mix: mix,
  getWindowScrollLeft: function getWindowScrollLeft(w) {
    return getScrollLeft(w);
  },
  getWindowScrollTop: function getWindowScrollTop(w) {
    return getScrollTop(w);
  },
  merge: function merge() {
    var ret = {};

    for (var _len2 = arguments.length, args = Array(_len2), _key3 = 0; _key3 < _len2; _key3++) {
      args[_key3] = arguments[_key3];
    }

    for (var i = 0; i < args.length; i++) {
      utils.mix(ret, args[i]);
    }
    return ret;
  },

  viewportWidth: 0,
  viewportHeight: 0
};

mix(utils, domUtils);

/* harmony default export */ __webpack_exports__["a"] = (utils);

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(14);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _iterator = __webpack_require__(75);

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__(91);

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(52);
var enumBugKeys = __webpack_require__(36);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 24 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 25 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
  Copyright (c) 2016 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg)) {
				classes.push(classNames.apply(null, arg));
			} else if (argType === 'object') {
				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes.push(key);
					}
				}
			}
		}

		return classes.join(' ');
	}

	if (typeof module !== 'undefined' && module.exports) {
		module.exports = classNames;
	} else if (true) {
		// register as 'classnames', consistent with npm package name
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
			return classNames;
		}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {
		window.classNames = classNames;
	}
}());


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(58);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

/***/ }),
/* 28 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 29 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 30 */
/***/ (function(module, exports) {

module.exports = true;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(14);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 32 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(19);
var dPs = __webpack_require__(81);
var enumBugKeys = __webpack_require__(36);
var IE_PROTO = __webpack_require__(34)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(50)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(85).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(35)('keys');
var uid = __webpack_require__(24);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(7);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};


/***/ }),
/* 36 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(9).f;
var has = __webpack_require__(11);
var TAG = __webpack_require__(16)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(16);


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(7);
var core = __webpack_require__(8);
var LIBRARY = __webpack_require__(30);
var wksExt = __webpack_require__(38);
var defineProperty = __webpack_require__(9).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),
/* 40 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

/***/ }),
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_prop_types__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ChildrenUtils__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__AnimateChild__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__util__ = __webpack_require__(62);










var defaultKey = 'rc_animate_' + Date.now();


function getChildrenFromProps(props) {
  var children = props.children;
  if (__WEBPACK_IMPORTED_MODULE_6_react___default.a.isValidElement(children)) {
    if (!children.key) {
      return __WEBPACK_IMPORTED_MODULE_6_react___default.a.cloneElement(children, {
        key: defaultKey
      });
    }
  }
  return children;
}

function noop() {}

var Animate = function (_React$Component) {
  __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits___default()(Animate, _React$Component);

  // eslint-disable-line

  function Animate(props) {
    __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default()(this, Animate);

    var _this = __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn___default()(this, (Animate.__proto__ || Object.getPrototypeOf(Animate)).call(this, props));

    _initialiseProps.call(_this);

    _this.currentlyAnimatingKeys = {};
    _this.keysToEnter = [];
    _this.keysToLeave = [];

    _this.state = {
      children: Object(__WEBPACK_IMPORTED_MODULE_8__ChildrenUtils__["e" /* toArrayChildren */])(getChildrenFromProps(props))
    };

    _this.childrenRefs = {};
    return _this;
  }

  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default()(Animate, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var showProp = this.props.showProp;
      var children = this.state.children;
      if (showProp) {
        children = children.filter(function (child) {
          return !!child.props[showProp];
        });
      }
      children.forEach(function (child) {
        if (child) {
          _this2.performAppear(child.key);
        }
      });
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _this3 = this;

      this.nextProps = nextProps;
      var nextChildren = Object(__WEBPACK_IMPORTED_MODULE_8__ChildrenUtils__["e" /* toArrayChildren */])(getChildrenFromProps(nextProps));
      var props = this.props;
      // exclusive needs immediate response
      if (props.exclusive) {
        Object.keys(this.currentlyAnimatingKeys).forEach(function (key) {
          _this3.stop(key);
        });
      }
      var showProp = props.showProp;
      var currentlyAnimatingKeys = this.currentlyAnimatingKeys;
      // last props children if exclusive
      var currentChildren = props.exclusive ? Object(__WEBPACK_IMPORTED_MODULE_8__ChildrenUtils__["e" /* toArrayChildren */])(getChildrenFromProps(props)) : this.state.children;
      // in case destroy in showProp mode
      var newChildren = [];
      if (showProp) {
        currentChildren.forEach(function (currentChild) {
          var nextChild = currentChild && Object(__WEBPACK_IMPORTED_MODULE_8__ChildrenUtils__["a" /* findChildInChildrenByKey */])(nextChildren, currentChild.key);
          var newChild = void 0;
          if ((!nextChild || !nextChild.props[showProp]) && currentChild.props[showProp]) {
            newChild = __WEBPACK_IMPORTED_MODULE_6_react___default.a.cloneElement(nextChild || currentChild, __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty___default()({}, showProp, true));
          } else {
            newChild = nextChild;
          }
          if (newChild) {
            newChildren.push(newChild);
          }
        });
        nextChildren.forEach(function (nextChild) {
          if (!nextChild || !Object(__WEBPACK_IMPORTED_MODULE_8__ChildrenUtils__["a" /* findChildInChildrenByKey */])(currentChildren, nextChild.key)) {
            newChildren.push(nextChild);
          }
        });
      } else {
        newChildren = Object(__WEBPACK_IMPORTED_MODULE_8__ChildrenUtils__["d" /* mergeChildren */])(currentChildren, nextChildren);
      }

      // need render to avoid update
      this.setState({
        children: newChildren
      });

      nextChildren.forEach(function (child) {
        var key = child && child.key;
        if (child && currentlyAnimatingKeys[key]) {
          return;
        }
        var hasPrev = child && Object(__WEBPACK_IMPORTED_MODULE_8__ChildrenUtils__["a" /* findChildInChildrenByKey */])(currentChildren, key);
        if (showProp) {
          var showInNext = child.props[showProp];
          if (hasPrev) {
            var showInNow = Object(__WEBPACK_IMPORTED_MODULE_8__ChildrenUtils__["b" /* findShownChildInChildrenByKey */])(currentChildren, key, showProp);
            if (!showInNow && showInNext) {
              _this3.keysToEnter.push(key);
            }
          } else if (showInNext) {
            _this3.keysToEnter.push(key);
          }
        } else if (!hasPrev) {
          _this3.keysToEnter.push(key);
        }
      });

      currentChildren.forEach(function (child) {
        var key = child && child.key;
        if (child && currentlyAnimatingKeys[key]) {
          return;
        }
        var hasNext = child && Object(__WEBPACK_IMPORTED_MODULE_8__ChildrenUtils__["a" /* findChildInChildrenByKey */])(nextChildren, key);
        if (showProp) {
          var showInNow = child.props[showProp];
          if (hasNext) {
            var showInNext = Object(__WEBPACK_IMPORTED_MODULE_8__ChildrenUtils__["b" /* findShownChildInChildrenByKey */])(nextChildren, key, showProp);
            if (!showInNext && showInNow) {
              _this3.keysToLeave.push(key);
            }
          } else if (showInNow) {
            _this3.keysToLeave.push(key);
          }
        } else if (!hasNext) {
          _this3.keysToLeave.push(key);
        }
      });
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      var keysToEnter = this.keysToEnter;
      this.keysToEnter = [];
      keysToEnter.forEach(this.performEnter);
      var keysToLeave = this.keysToLeave;
      this.keysToLeave = [];
      keysToLeave.forEach(this.performLeave);
    }
  }, {
    key: 'isValidChildByKey',
    value: function isValidChildByKey(currentChildren, key) {
      var showProp = this.props.showProp;
      if (showProp) {
        return Object(__WEBPACK_IMPORTED_MODULE_8__ChildrenUtils__["b" /* findShownChildInChildrenByKey */])(currentChildren, key, showProp);
      }
      return Object(__WEBPACK_IMPORTED_MODULE_8__ChildrenUtils__["a" /* findChildInChildrenByKey */])(currentChildren, key);
    }
  }, {
    key: 'stop',
    value: function stop(key) {
      delete this.currentlyAnimatingKeys[key];
      var component = this.childrenRefs[key];
      if (component) {
        component.stop();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var props = this.props;
      this.nextProps = props;
      var stateChildren = this.state.children;
      var children = null;
      if (stateChildren) {
        children = stateChildren.map(function (child) {
          if (child === null || child === undefined) {
            return child;
          }
          if (!child.key) {
            throw new Error('must set key for <rc-animate> children');
          }
          return __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_9__AnimateChild__["a" /* default */],
            {
              key: child.key,
              ref: function ref(node) {
                return _this4.childrenRefs[child.key] = node;
              },
              animation: props.animation,
              transitionName: props.transitionName,
              transitionEnter: props.transitionEnter,
              transitionAppear: props.transitionAppear,
              transitionLeave: props.transitionLeave
            },
            child
          );
        });
      }
      var Component = props.component;
      if (Component) {
        var passedProps = props;
        if (typeof Component === 'string') {
          passedProps = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({
            className: props.className,
            style: props.style
          }, props.componentProps);
        }
        return __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
          Component,
          passedProps,
          children
        );
      }
      return children[0] || null;
    }
  }]);

  return Animate;
}(__WEBPACK_IMPORTED_MODULE_6_react___default.a.Component);

Animate.isAnimate = true;
Animate.propTypes = {
  component: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.any,
  componentProps: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.object,
  animation: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.object,
  transitionName: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.string, __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.object]),
  transitionEnter: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.bool,
  transitionAppear: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.bool,
  exclusive: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.bool,
  transitionLeave: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.bool,
  onEnd: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.func,
  onEnter: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.func,
  onLeave: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.func,
  onAppear: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.func,
  showProp: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.string
};
Animate.defaultProps = {
  animation: {},
  component: 'span',
  componentProps: {},
  transitionEnter: true,
  transitionLeave: true,
  transitionAppear: false,
  onEnd: noop,
  onEnter: noop,
  onLeave: noop,
  onAppear: noop
};

var _initialiseProps = function _initialiseProps() {
  var _this5 = this;

  this.performEnter = function (key) {
    // may already remove by exclusive
    if (_this5.childrenRefs[key]) {
      _this5.currentlyAnimatingKeys[key] = true;
      _this5.childrenRefs[key].componentWillEnter(_this5.handleDoneAdding.bind(_this5, key, 'enter'));
    }
  };

  this.performAppear = function (key) {
    if (_this5.childrenRefs[key]) {
      _this5.currentlyAnimatingKeys[key] = true;
      _this5.childrenRefs[key].componentWillAppear(_this5.handleDoneAdding.bind(_this5, key, 'appear'));
    }
  };

  this.handleDoneAdding = function (key, type) {
    var props = _this5.props;
    delete _this5.currentlyAnimatingKeys[key];
    // if update on exclusive mode, skip check
    if (props.exclusive && props !== _this5.nextProps) {
      return;
    }
    var currentChildren = Object(__WEBPACK_IMPORTED_MODULE_8__ChildrenUtils__["e" /* toArrayChildren */])(getChildrenFromProps(props));
    if (!_this5.isValidChildByKey(currentChildren, key)) {
      // exclusive will not need this
      _this5.performLeave(key);
    } else {
      if (type === 'appear') {
        if (__WEBPACK_IMPORTED_MODULE_10__util__["a" /* default */].allowAppearCallback(props)) {
          props.onAppear(key);
          props.onEnd(key, true);
        }
      } else {
        if (__WEBPACK_IMPORTED_MODULE_10__util__["a" /* default */].allowEnterCallback(props)) {
          props.onEnter(key);
          props.onEnd(key, true);
        }
      }
    }
  };

  this.performLeave = function (key) {
    // may already remove by exclusive
    if (_this5.childrenRefs[key]) {
      _this5.currentlyAnimatingKeys[key] = true;
      _this5.childrenRefs[key].componentWillLeave(_this5.handleDoneLeaving.bind(_this5, key));
    }
  };

  this.handleDoneLeaving = function (key) {
    var props = _this5.props;
    delete _this5.currentlyAnimatingKeys[key];
    // if update on exclusive mode, skip check
    if (props.exclusive && props !== _this5.nextProps) {
      return;
    }
    var currentChildren = Object(__WEBPACK_IMPORTED_MODULE_8__ChildrenUtils__["e" /* toArrayChildren */])(getChildrenFromProps(props));
    // in case state change is too fast
    if (_this5.isValidChildByKey(currentChildren, key)) {
      _this5.performEnter(key);
    } else {
      var end = function end() {
        if (__WEBPACK_IMPORTED_MODULE_10__util__["a" /* default */].allowLeaveCallback(props)) {
          props.onLeave(key);
          props.onEnd(key, false);
        }
      };
      if (!Object(__WEBPACK_IMPORTED_MODULE_8__ChildrenUtils__["c" /* isSameChildren */])(_this5.state.children, currentChildren, props.showProp)) {
        _this5.setState({
          children: currentChildren
        }, end);
      } else {
        end();
      }
    }
  };
};

/* harmony default export */ __webpack_exports__["a"] = (Animate);

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

module.exports = emptyFunction;

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

if (process.env.NODE_ENV !== 'production') {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

module.exports = invariant;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(17)))

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),
/* 46 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SHOW_ALL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return SHOW_PARENT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return SHOW_CHILD; });
var SHOW_ALL = 'SHOW_ALL';
var SHOW_PARENT = 'SHOW_PARENT';
var SHOW_CHILD = 'SHOW_CHILD';

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(30);
var $export = __webpack_require__(12);
var redefine = __webpack_require__(51);
var hide = __webpack_require__(13);
var Iterators = __webpack_require__(32);
var $iterCreate = __webpack_require__(80);
var setToStringTag = __webpack_require__(37);
var getPrototypeOf = __webpack_require__(86);
var ITERATOR = __webpack_require__(16)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(79);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(10) && !__webpack_require__(20)(function () {
  return Object.defineProperty(__webpack_require__(50)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(14);
var document = __webpack_require__(7).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(13);


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(11);
var toIObject = __webpack_require__(15);
var arrayIndexOf = __webpack_require__(82)(false);
var IE_PROTO = __webpack_require__(34)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(54);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 54 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(29);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(52);
var hiddenKeys = __webpack_require__(36).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(25);
var createDesc = __webpack_require__(22);
var toIObject = __webpack_require__(15);
var toPrimitive = __webpack_require__(31);
var has = __webpack_require__(11);
var IE8_DOM_DEFINE = __webpack_require__(49);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(10) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(114), __esModule: true };

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var emptyFunction = __webpack_require__(43);

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = emptyFunction;

if (process.env.NODE_ENV !== 'production') {
  var printWarning = function printWarning(format) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var argIndex = 0;
    var message = 'Warning: ' + format.replace(/%s/g, function () {
      return args[argIndex++];
    });
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };

  warning = function warning(condition, format) {
    if (format === undefined) {
      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
    }

    if (format.indexOf('Failed Composite propType: ') === 0) {
      return; // Ignore CompositeComponent proptype check.
    }

    if (!condition) {
      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      printWarning.apply(undefined, [format].concat(args));
    }
  };
}

module.exports = warning;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(17)))

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),
/* 61 */
/***/ (function(module, exports) {

module.exports = function(arr, obj){
  if (arr.indexOf) return arr.indexOf(obj);
  for (var i = 0; i < arr.length; ++i) {
    if (arr[i] === obj) return i;
  }
  return -1;
};

/***/ }),
/* 62 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var util = {
  isAppearSupported: function isAppearSupported(props) {
    return props.transitionName && props.transitionAppear || props.animation.appear;
  },
  isEnterSupported: function isEnterSupported(props) {
    return props.transitionName && props.transitionEnter || props.animation.enter;
  },
  isLeaveSupported: function isLeaveSupported(props) {
    return props.transitionName && props.transitionLeave || props.animation.leave;
  },
  allowAppearCallback: function allowAppearCallback(props) {
    return props.transitionAppear || props.animation.appear;
  },
  allowEnterCallback: function allowEnterCallback(props) {
    return props.transitionEnter || props.animation.enter;
  },
  allowLeaveCallback: function allowLeaveCallback(props) {
    return props.transitionLeave || props.animation.leave;
  }
};
/* harmony default export */ __webpack_exports__["a"] = (util);

/***/ }),
/* 63 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["q"] = toTitle;
/* harmony export (immutable) */ __webpack_exports__["h"] = getValuePropValue;
/* harmony export (immutable) */ __webpack_exports__["f"] = getPropValue;
/* harmony export (immutable) */ __webpack_exports__["i"] = isMultiple;
/* harmony export (immutable) */ __webpack_exports__["p"] = toArray;
/* harmony export (immutable) */ __webpack_exports__["m"] = preventDefaultEvent;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return UNSELECTABLE_STYLE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UNSELECTABLE_ATTRIBUTE; });
/* harmony export (immutable) */ __webpack_exports__["k"] = labelCompatible;
/* unused harmony export isInclude */
/* harmony export (immutable) */ __webpack_exports__["j"] = isPositionPrefix;
/* harmony export (immutable) */ __webpack_exports__["l"] = loopAllChildren;
/* harmony export (immutable) */ __webpack_exports__["e"] = flatToHierarchy;
/* harmony export (immutable) */ __webpack_exports__["d"] = filterParentPosition;
/* unused harmony export handleCheckState */
/* harmony export (immutable) */ __webpack_exports__["g"] = getTreeNodesStates;
/* unused harmony export recursiveCloneChildren */
/* harmony export (immutable) */ __webpack_exports__["c"] = filterAllCheckedData;
/* harmony export (immutable) */ __webpack_exports__["n"] = processSimpleTreeData;
/* harmony export (immutable) */ __webpack_exports__["o"] = saveRef;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_objectWithoutProperties__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_objectWithoutProperties___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_objectWithoutProperties__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react__);


/* eslint no-loop-func: 0*/


function toTitle(title) {
  if (typeof title === 'string') {
    return title;
  }
  return null;
}

function getValuePropValue(child) {
  var props = child.props;
  if ('value' in props) {
    return props.value;
  }
  if (child.key) {
    return child.key;
  }
  throw new Error('no key or value for ' + child);
}

function getPropValue(child, prop) {
  if (prop === 'value') {
    return getValuePropValue(child);
  }
  return child.props[prop];
}

function isMultiple(props) {
  return !!(props.multiple || props.treeCheckable);
}

function toArray(value) {
  var ret = value;
  if (value === undefined) {
    ret = [];
  } else if (!Array.isArray(value)) {
    ret = [value];
  }
  return ret;
}

function preventDefaultEvent(e) {
  e.preventDefault();
}

var UNSELECTABLE_STYLE = {
  userSelect: 'none',
  WebkitUserSelect: 'none'
};

var UNSELECTABLE_ATTRIBUTE = {
  unselectable: 'unselectable'
};

function labelCompatible(prop) {
  var newProp = prop;
  if (newProp === 'label') {
    newProp = 'title';
  }
  return newProp;
}

function isInclude(smallArray, bigArray) {
  // attention: [0,0,1] [0,0,10]
  return smallArray.every(function (ii, i) {
    return ii === bigArray[i];
  });
}

function isPositionPrefix(smallPos, bigPos) {
  if (!bigPos || !smallPos) {
    // console.log(smallPos, bigPos);
    return false;
  }
  if (bigPos.length < smallPos.length) {
    return false;
  }
  // attention: "0-0-1" "0-0-10"
  if (bigPos.length > smallPos.length && bigPos.charAt(smallPos.length) !== '-') {
    return false;
  }
  return bigPos.substr(0, smallPos.length) === smallPos;
}

/*
export function getCheckedKeys(node, checkedKeys, allCheckedNodesKeys) {
  const nodeKey = node.props.eventKey;
  let newCks = [...checkedKeys];
  let nodePos;
  const unCheck = allCheckedNodesKeys.some(item => {
    if (item.key === nodeKey) {
      nodePos = item.pos;
      return true;
    }
  });
  if (unCheck) {
    newCks = [];
    allCheckedNodesKeys.forEach(item => {
      if (isPositionPrefix(item.pos, nodePos) || isPositionPrefix(nodePos, item.pos)) {
        return;
      }
      newCks.push(item.key);
    });
  } else {
    newCks.push(nodeKey);
  }
  return newCks;
}
*/

function getChildrenlength(children) {
  var len = 1;
  if (Array.isArray(children)) {
    len = children.length;
  }
  return len;
}

function getSiblingPosition(index, len, siblingPosition) {
  if (len === 1) {
    siblingPosition.first = true;
    siblingPosition.last = true;
  } else {
    siblingPosition.first = index === 0;
    siblingPosition.last = index === len - 1;
  }
  return siblingPosition;
}

function loopAllChildren(childs, callback, parent) {
  var loop = function loop(children, level, _parent) {
    var len = getChildrenlength(children);
    __WEBPACK_IMPORTED_MODULE_2_react___default.a.Children.forEach(children, function handler(item, index) {
      // eslint-disable-line
      var pos = level + '-' + index;
      if (item && item.props.children && item.type) {
        loop(item.props.children, pos, { node: item, pos: pos });
      }
      if (item) {
        callback(item, index, pos, item.key || pos, getSiblingPosition(index, len, {}), _parent);
      }
    });
  };
  loop(childs, 0, parent);
}

// export function loopAllChildren(childs, callback) {
//   const loop = (children, level) => {
//     React.Children.forEach(children, (item, index) => {
//       const pos = `${level}-${index}`;
//       if (item && item.props.children) {
//         loop(item.props.children, pos);
//       }
//       if (item) {
//         callback(item, index, pos, getValuePropValue(item));
//       }
//     });
//   };
//   loop(childs, 0);
// }

// TODO: Here has the side effect. Update node children data affect.
function flatToHierarchy(arr) {
  if (!arr.length) {
    return arr;
  }
  var hierarchyNodes = [];
  var levelObj = {};
  arr.forEach(function (item) {
    if (!item.pos) {
      return;
    }
    var posLen = item.pos.split('-').length;
    if (!levelObj[posLen]) {
      levelObj[posLen] = [];
    }
    levelObj[posLen].push(item);
  });
  var levelArr = Object.keys(levelObj).sort(function (a, b) {
    return b - a;
  });
  // const s = Date.now();
  // todo: there are performance issues!
  levelArr.reduce(function (pre, cur) {
    if (cur && cur !== pre) {
      levelObj[pre].forEach(function (item) {
        var haveParent = false;
        levelObj[cur].forEach(function (ii) {
          if (isPositionPrefix(ii.pos, item.pos)) {
            haveParent = true;
            if (!ii.children) {
              ii.children = [];
            }
            ii.children.push(item);
          }
        });
        if (!haveParent) {
          hierarchyNodes.push(item);
        }
      });
    }
    return cur;
  });
  // console.log(Date.now() - s);
  return levelObj[levelArr[levelArr.length - 1]].concat(hierarchyNodes);
}

// arr.length === 628, use time: ~20ms
function filterParentPosition(arr) {
  var levelObj = {};
  arr.forEach(function (item) {
    var posLen = item.split('-').length;
    if (!levelObj[posLen]) {
      levelObj[posLen] = [];
    }
    levelObj[posLen].push(item);
  });
  var levelArr = Object.keys(levelObj).sort();

  var _loop = function _loop(i) {
    if (levelArr[i + 1]) {
      levelObj[levelArr[i]].forEach(function (ii) {
        var _loop2 = function _loop2(j) {
          levelObj[levelArr[j]].forEach(function (_i, index) {
            if (isPositionPrefix(ii, _i)) {
              levelObj[levelArr[j]][index] = null;
            }
          });
          levelObj[levelArr[j]] = levelObj[levelArr[j]].filter(function (p) {
            return p;
          });
        };

        for (var j = i + 1; j < levelArr.length; j++) {
          _loop2(j);
        }
      });
    }
  };

  for (var i = 0; i < levelArr.length; i++) {
    _loop(i);
  }
  var nArr = [];
  levelArr.forEach(function (i) {
    nArr = nArr.concat(levelObj[i]);
  });
  return nArr;
}
// console.log(filterParentPosition(
// ['0-2', '0-3-3', '0-10', '0-10-0', '0-0-1', '0-0', '0-1-1', '0-1']
// ));

function stripTail(str) {
  var arr = str.match(/(.+)(-[^-]+)$/);
  var st = '';
  if (arr && arr.length === 3) {
    st = arr[1];
  }
  return st;
}
function splitPosition(pos) {
  return pos.split('-');
}

// todo: do optimization.
function handleCheckState(obj, checkedPositionArr, checkIt) {
  // console.log(stripTail('0-101-000'));
  // let s = Date.now();
  var objKeys = Object.keys(obj);

  objKeys.forEach(function (i, index) {
    var iArr = splitPosition(i);
    var saved = false;
    checkedPositionArr.forEach(function (_pos) {
      var _posArr = splitPosition(_pos);
      if (iArr.length > _posArr.length && isInclude(_posArr, iArr)) {
        obj[i].halfChecked = false;
        obj[i].checked = checkIt;
        objKeys[index] = null;
      }
      if (iArr[0] === _posArr[0] && iArr[1] === _posArr[1]) {
        saved = true;
      }
    });
    if (!saved) {
      objKeys[index] = null;
    }
  });
  objKeys = objKeys.filter(function (i) {
    return i;
  }); // filter non null;

  var _loop3 = function _loop3(_pIndex) {
    // loop to set ancestral nodes's `checked` or `halfChecked`
    var loop = function loop(__pos) {
      var _posLen = splitPosition(__pos).length;
      if (_posLen <= 2) {
        // e.g. '0-0', '0-1'
        return;
      }
      var sibling = 0;
      var siblingChecked = 0;
      var parentPosition = stripTail(__pos);
      objKeys.forEach(function (i /* , index*/) {
        var iArr = splitPosition(i);
        if (iArr.length === _posLen && isInclude(splitPosition(parentPosition), iArr)) {
          sibling++;
          if (obj[i].checked) {
            siblingChecked++;
            var _i = checkedPositionArr.indexOf(i);
            if (_i > -1) {
              checkedPositionArr.splice(_i, 1);
              if (_i <= _pIndex) {
                _pIndex--;
              }
            }
          } else if (obj[i].halfChecked) {
            siblingChecked += 0.5;
          }
          // objKeys[index] = null;
        }
      });
      // objKeys = objKeys.filter(i => i); // filter non null;
      var parent = obj[parentPosition];
      // not check, checked, halfChecked
      if (siblingChecked === 0) {
        parent.checked = false;
        parent.halfChecked = false;
      } else if (siblingChecked === sibling) {
        parent.checked = true;
        parent.halfChecked = false;
      } else {
        parent.halfChecked = true;
        parent.checked = false;
      }
      loop(parentPosition);
    };
    loop(checkedPositionArr[_pIndex], _pIndex);
    pIndex = _pIndex;
  };

  for (var pIndex = 0; pIndex < checkedPositionArr.length; pIndex++) {
    _loop3(pIndex);
  }
  // console.log(Date.now()-s, objKeys.length, checkIt);
}

function getCheck(treeNodesStates, checkedPositions) {
  var halfCheckedKeys = [];
  var checkedKeys = [];
  var checkedNodes = [];
  Object.keys(treeNodesStates).forEach(function (item) {
    var itemObj = treeNodesStates[item];
    if (itemObj.checked) {
      checkedKeys.push(itemObj.key);
      // checkedNodes.push(getValuePropValue(itemObj.node));
      checkedNodes.push(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends___default()({}, itemObj, { pos: item }));
    } else if (itemObj.halfChecked) {
      halfCheckedKeys.push(itemObj.key);
    }
  });
  return {
    halfCheckedKeys: halfCheckedKeys, checkedKeys: checkedKeys, checkedNodes: checkedNodes, treeNodesStates: treeNodesStates, checkedPositions: checkedPositions
  };
}

function getTreeNodesStates(children, values) {
  var checkedPositions = [];
  var treeNodesStates = {};
  loopAllChildren(children, function (item, index, pos, keyOrPos, siblingPosition) {
    treeNodesStates[pos] = {
      node: item,
      key: keyOrPos,
      checked: false,
      halfChecked: false,
      siblingPosition: siblingPosition
    };
    if (values.indexOf(getValuePropValue(item)) !== -1) {
      treeNodesStates[pos].checked = true;
      checkedPositions.push(pos);
    }
  });

  handleCheckState(treeNodesStates, filterParentPosition(checkedPositions.sort()), true);

  return getCheck(treeNodesStates, checkedPositions);
}

// can add extra prop to every node.
function recursiveCloneChildren(children) {
  var cb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (ch) {
    return ch;
  };

  // return React.Children.map(children, child => {
  return Array.from(children).map(function (child) {
    var newChild = cb(child);
    if (newChild && newChild.props && newChild.props.children) {
      return __WEBPACK_IMPORTED_MODULE_2_react___default.a.cloneElement(newChild, {}, recursiveCloneChildren(newChild.props.children, cb));
    }
    return newChild;
  });
}
// const newChildren = recursiveCloneChildren(children, child => {
//   const extraProps = {};
//   if (child && child.type && child.type.xxx) {
//     extraProps._prop = true;
//     return React.cloneElement(child, extraProps);
//   }
//   return child;
// });


function recursiveGen(children) {
  var level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  return __WEBPACK_IMPORTED_MODULE_2_react___default.a.Children.map(children, function (child, index) {
    var pos = level + '-' + index;

    var _child$props = child.props,
        title = _child$props.title,
        label = _child$props.label,
        value = _child$props.value,
        subChildren = _child$props.children,
        rest = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_objectWithoutProperties___default()(_child$props, ['title', 'label', 'value', 'children']);

    var o = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends___default()({}, rest, {
      title: title,
      label: label || title,
      value: value,
      key: child.key,
      _pos: pos
    });
    if (subChildren) {
      o.children = recursiveGen(subChildren, pos);
    }
    return o;
  });
}

function recursive(children, cb) {
  children.forEach(function (item) {
    cb(item);
    if (item.children) {
      recursive(item.children, cb);
    }
  });
}

// Get the tree's checkedNodes (todo: can merge to the `handleCheckState` function)
// If one node checked, it's all children nodes checked.
// If sibling nodes all checked, the parent checked.
function filterAllCheckedData(vs, treeNodes) {
  var vals = [].concat(vs);
  if (!vals.length) {
    return vals;
  }

  var data = recursiveGen(treeNodes);
  var checkedNodesPositions = [];

  function checkChildren(children) {
    children.forEach(function (item) {
      if (item.__checked) {
        return;
      }
      var ci = vals.indexOf(item.value);
      var childs = item.children;
      if (ci > -1) {
        item.__checked = true;
        checkedNodesPositions.push({ node: item, pos: item._pos });
        vals.splice(ci, 1);
        if (childs) {
          recursive(childs, function (child) {
            child.__checked = true;
            checkedNodesPositions.push({ node: child, pos: child._pos });
          });
        }
      } else {
        if (childs) {
          checkChildren(childs);
        }
      }
    });
  }

  function checkParent(children) {
    var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { root: true };

    var siblingChecked = 0;
    children.forEach(function (item) {
      var childs = item.children;
      if (childs && !item.__checked && !item.__halfChecked) {
        var p = checkParent(childs, item);
        if (p.__checked) {
          siblingChecked++;
        } else if (p.__halfChecked) {
          siblingChecked += 0.5;
        }
      } else if (item.__checked) {
        siblingChecked++;
      } else if (item.__halfChecked) {
        siblingChecked += 0.5;
      }
    });
    var len = children.length;
    if (siblingChecked === len) {
      parent.__checked = true;
      checkedNodesPositions.push({ node: parent, pos: parent._pos });
    } else if (siblingChecked < len && siblingChecked > 0) {
      parent.__halfChecked = true;
    }
    if (parent.root) {
      return children;
    }
    return parent;
  }
  checkChildren(data);
  checkParent(data);

  checkedNodesPositions.forEach(function (i, index) {
    // clear private metadata
    delete checkedNodesPositions[index].node.__checked;
    delete checkedNodesPositions[index].node._pos;
    // create the same structure of `onCheck`'s return.
    checkedNodesPositions[index].node.props = {
      title: checkedNodesPositions[index].node.title,
      label: checkedNodesPositions[index].node.label || checkedNodesPositions[index].node.title,
      value: checkedNodesPositions[index].node.value
    };
    if (checkedNodesPositions[index].node.children) {
      checkedNodesPositions[index].node.props.children = checkedNodesPositions[index].node.children;
    }
    delete checkedNodesPositions[index].node.title;
    delete checkedNodesPositions[index].node.label;
    delete checkedNodesPositions[index].node.value;
    delete checkedNodesPositions[index].node.children;
  });
  return checkedNodesPositions;
}

function processSimpleTreeData(treeData, format) {
  function unflatten2(array) {
    var _ref;

    var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : (_ref = {}, _ref[format.id] = format.rootPId, _ref);

    var children = [];
    for (var i = 0; i < array.length; i++) {
      array[i] = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends___default()({}, array[i]); // copy, can not corrupts original data
      if (array[i][format.pId] === parent[format.id]) {
        array[i].key = array[i][format.id];
        children.push(array[i]);
        array.splice(i--, 1);
      }
    }
    if (children.length) {
      parent.children = children;
      children.forEach(function (child) {
        return unflatten2(array, child);
      });
    }
    if (parent[format.id] === format.rootPId) {
      return children;
    }
  }
  return unflatten2(treeData);
}

function saveRef(instance, name) {
  if (!instance.saveRefs) {
    instance.saveRefs = {};
  }
  if (!instance.saveRefs[name]) {
    instance.saveRefs[name] = function (node) {
      instance[name] = node;
    };
  }
  return instance.saveRefs[name];
}

/***/ }),
/* 64 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = addEventListenerWrap;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_add_dom_event_listener__ = __webpack_require__(127);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_add_dom_event_listener___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_add_dom_event_listener__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_dom__);



function addEventListenerWrap(target, eventType, cb) {
  /* eslint camelcase: 2 */
  var callback = __WEBPACK_IMPORTED_MODULE_1_react_dom___default.a.unstable_batchedUpdates ? function run(e) {
    __WEBPACK_IMPORTED_MODULE_1_react_dom___default.a.unstable_batchedUpdates(cb, e);
  } : cb;
  return __WEBPACK_IMPORTED_MODULE_0_add_dom_event_listener___default()(target, eventType, callback);
}

/***/ }),
/* 65 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(18);


/**
 * 得到会导致元素显示不全的祖先元素
 */

function getOffsetParent(element) {
  if (__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* default */].isWindow(element) || element.nodeType === 9) {
    return null;
  }
  // ie 这个也不是完全可行
  /*
   <div style="width: 50px;height: 100px;overflow: hidden">
   <div style="width: 50px;height: 100px;position: relative;" id="d6">
   元素 6 高 100px 宽 50px<br/>
   </div>
   </div>
   */
  // element.offsetParent does the right thing in ie7 and below. Return parent with layout!
  //  In other browsers it only includes elements with position absolute, relative or
  // fixed, not elements with overflow set to auto or scroll.
  //        if (UA.ie && ieMode < 8) {
  //            return element.offsetParent;
  //        }
  // 统一的 offsetParent 方法
  var doc = __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* default */].getDocument(element);
  var body = doc.body;
  var parent = void 0;
  var positionStyle = __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* default */].css(element, 'position');
  var skipStatic = positionStyle === 'fixed' || positionStyle === 'absolute';

  if (!skipStatic) {
    return element.nodeName.toLowerCase() === 'html' ? null : element.parentNode;
  }

  for (parent = element.parentNode; parent && parent !== body; parent = parent.parentNode) {
    positionStyle = __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* default */].css(parent, 'position');
    if (positionStyle !== 'static') {
      return parent;
    }
  }
  return null;
}

/* harmony default export */ __webpack_exports__["a"] = (getOffsetParent);

/***/ }),
/* 66 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_objectWithoutProperties__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_objectWithoutProperties___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_objectWithoutProperties__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_prop_types__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_prop_types__);







var LazyRenderBox = function (_Component) {
  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default()(LazyRenderBox, _Component);

  function LazyRenderBox() {
    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, LazyRenderBox);

    return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default()(this, _Component.apply(this, arguments));
  }

  LazyRenderBox.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
    return nextProps.hiddenClassName || nextProps.visible;
  };

  LazyRenderBox.prototype.render = function render() {
    var _props = this.props,
        hiddenClassName = _props.hiddenClassName,
        visible = _props.visible,
        props = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_objectWithoutProperties___default()(_props, ['hiddenClassName', 'visible']);

    if (hiddenClassName || __WEBPACK_IMPORTED_MODULE_4_react___default.a.Children.count(props.children) > 1) {
      if (!visible && hiddenClassName) {
        props.className += ' ' + hiddenClassName;
      }
      return __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement('div', props);
    }

    return __WEBPACK_IMPORTED_MODULE_4_react___default.a.Children.only(props.children);
  };

  return LazyRenderBox;
}(__WEBPACK_IMPORTED_MODULE_4_react__["Component"]);

LazyRenderBox.propTypes = {
  children: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.any,
  className: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.string,
  visible: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.bool,
  hiddenClassName: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.string
};


/* harmony default export */ __webpack_exports__["a"] = (LazyRenderBox);

/***/ }),
/* 67 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getAlignFromPlacement;
/* harmony export (immutable) */ __webpack_exports__["b"] = getPopupClassNameFromAlign;
/* harmony export (immutable) */ __webpack_exports__["c"] = saveRef;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);

function isPointsEq(a1, a2) {
  return a1[0] === a2[0] && a1[1] === a2[1];
}

function getAlignFromPlacement(builtinPlacements, placementStr, align) {
  var baseAlign = builtinPlacements[placementStr] || {};
  return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, baseAlign, align);
}

function getPopupClassNameFromAlign(builtinPlacements, prefixCls, align) {
  var points = align.points;
  for (var placement in builtinPlacements) {
    if (builtinPlacements.hasOwnProperty(placement)) {
      if (isPointsEq(builtinPlacements[placement].points, points)) {
        return prefixCls + '-placement-' + placement;
      }
    }
  }
  return '';
}

function saveRef(name, component) {
  this[name] = component;
}

/***/ }),
/* 68 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return contextTypes; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_prop_types__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_classnames__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_warning__ = __webpack_require__(147);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_warning___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_warning__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__util__ = __webpack_require__(148);










function noop() {}

var contextTypes = {
  rcTree: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.shape({
    selectable: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.bool
  })
};

var Tree = function (_React$Component) {
  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default()(Tree, _React$Component);

  function Tree(props) {
    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, Tree);

    var _this = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default()(this, _React$Component.call(this, props));

    _initialiseProps.call(_this);

    var checkedKeys = _this.calcCheckedKeys(props);
    _this.state = {
      expandedKeys: _this.calcExpandedKeys(props),
      checkedKeys: checkedKeys.checkedKeys,
      halfCheckedKeys: checkedKeys.halfCheckedKeys,
      selectedKeys: _this.calcSelectedKeys(props),
      dragNodesKeys: '',
      dragOverNodeKey: '',
      dropNodeKey: ''
    };
    return _this;
  }

  Tree.prototype.getChildContext = function getChildContext() {
    var selectable = this.props.selectable;

    return {
      rcTree: {
        selectable: selectable
      }
    };
  };

  Tree.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var props = this.props;

    var newState = {};
    var expandedKeys = nextProps.expandedKeys !== props.expandedKeys ? this.calcExpandedKeys(nextProps, true) : undefined;
    if (expandedKeys) {
      newState.expandedKeys = expandedKeys;
    }

    var checkedKeys = nextProps.checkedKeys !== props.checkedKeys || props.loadData ? this.calcCheckedKeys(nextProps, true) : undefined;
    if (checkedKeys) {
      newState.checkedKeys = checkedKeys.checkedKeys;
      newState.halfCheckedKeys = checkedKeys.halfCheckedKeys;
    }

    var selectedKeys = nextProps.selectedKeys !== props.selectedKeys ? this.calcSelectedKeys(nextProps, true) : undefined;
    if (selectedKeys) {
      newState.selectedKeys = selectedKeys;
    }
    this.setState(newState);
  };

  Tree.prototype.onDragStart = function onDragStart(e, treeNode) {
    this.dragNode = treeNode;
    var newState = {
      dragNodesKeys: this.getDragNodesKeys(treeNode)
    };
    var expandedKeys = this.getExpandedKeys(treeNode, false);
    if (expandedKeys) {
      newState.expandedKeys = expandedKeys;
    }
    this.setState(newState);
    this.props.onDragStart({
      event: e,
      node: treeNode
    });
  };

  Tree.prototype.onDragEnter = function onDragEnter(e, treeNode) {
    var _this2 = this;

    var dropPosition = this.calcDropPosition(e, treeNode);
    if (this.dragNode.props.eventKey === treeNode.props.eventKey && dropPosition === 0) {
      this.setState({
        dragOverNodeKey: '',
        dropPosition: null
      });
      return;
    }
    this.setState({
      dragOverNodeKey: treeNode.props.eventKey,
      dropPosition: dropPosition
    });

    if (!this.delayedDragEnterLogic) {
      this.delayedDragEnterLogic = {};
    }
    Object.keys(this.delayedDragEnterLogic).forEach(function (key) {
      clearTimeout(_this2.delayedDragEnterLogic[key]);
    });
    this.delayedDragEnterLogic[treeNode.props.pos] = setTimeout(function () {
      var expandedKeys = _this2.getExpandedKeys(treeNode, true);
      if (expandedKeys) {
        _this2.setState({ expandedKeys: expandedKeys });
      }
      _this2.props.onDragEnter({
        event: e,
        node: treeNode,
        expandedKeys: expandedKeys && [].concat(expandedKeys) || [].concat(_this2.state.expandedKeys)
      });
    }, 400);
  };

  Tree.prototype.onDragOver = function onDragOver(e, treeNode) {
    this.props.onDragOver({ event: e, node: treeNode });
  };

  Tree.prototype.onDragLeave = function onDragLeave(e, treeNode) {
    this.props.onDragLeave({ event: e, node: treeNode });
  };

  Tree.prototype.onDrop = function onDrop(e, treeNode) {
    var state = this.state;

    var eventKey = treeNode.props.eventKey;
    this.setState({
      dragOverNodeKey: '',
      dropNodeKey: eventKey
    });
    if (state.dragNodesKeys.indexOf(eventKey) > -1) {
      __WEBPACK_IMPORTED_MODULE_7_warning___default()(false, 'Can not drop to dragNode(include it\'s children node)');
      return;
    }

    var posArr = treeNode.props.pos.split('-');
    var res = {
      event: e,
      node: treeNode,
      dragNode: this.dragNode,
      dragNodesKeys: [].concat(state.dragNodesKeys),
      dropPosition: state.dropPosition + Number(posArr[posArr.length - 1])
    };
    if (state.dropPosition !== 0) {
      res.dropToGap = true;
    }
    this.props.onDrop(res);
  };

  Tree.prototype.onDragEnd = function onDragEnd(e, treeNode) {
    this.setState({
      dragOverNodeKey: ''
    });
    this.props.onDragEnd({ event: e, node: treeNode });
  };

  Tree.prototype.onExpand = function onExpand(treeNode) {
    var _this3 = this;

    var props = this.props,
        state = this.state;

    var expanded = !treeNode.props.expanded;
    var expandedKeys = [].concat(state.expandedKeys);
    var eventKey = treeNode.props.eventKey;

    var index = expandedKeys.indexOf(eventKey);
    if (expanded && index === -1) {
      expandedKeys.push(eventKey);
    } else if (!expanded && index > -1) {
      expandedKeys.splice(index, 1);
    }

    var controlled = 'expandedKeys' in props;
    if (!controlled) {
      this.setState({ expandedKeys: expandedKeys });
    }
    props.onExpand(expandedKeys, { node: treeNode, expanded: expanded });

    // After data loaded, need set new expandedKeys
    if (expanded && props.loadData) {
      return props.loadData(treeNode).then(function () {
        if (!controlled) {
          _this3.setState({ expandedKeys: expandedKeys });
        }
      });
    }
  };

  Tree.prototype.onSelect = function onSelect(treeNode) {
    var props = this.props,
        state = this.state;

    var eventKey = treeNode.props.eventKey;
    var selected = !treeNode.props.selected;

    var selectedKeys = [].concat(state.selectedKeys);
    if (!selected) {
      var index = selectedKeys.indexOf(eventKey);
      selectedKeys.splice(index, 1);
    } else if (!props.multiple) {
      selectedKeys = [eventKey];
    } else {
      selectedKeys.push(eventKey);
    }

    // TODO: can be optimized if we remove selectedNodes in API
    var selectedNodes = [];
    if (selectedKeys.length) {
      Object(__WEBPACK_IMPORTED_MODULE_8__util__["e" /* traverseTreeNodes */])(props.children, function (item) {
        if (selectedKeys.indexOf(item.key) !== -1) {
          selectedNodes.push(item);
        }
      });
    }

    if (!('selectedKeys' in props)) {
      this.setState({
        selectedKeys: selectedKeys
      });
    }

    var eventObj = {
      event: 'select',
      selected: selected,
      node: treeNode,
      selectedNodes: selectedNodes
    };
    props.onSelect(selectedKeys, eventObj);
  };

  Tree.prototype.onMouseEnter = function onMouseEnter(e, treeNode) {
    this.props.onMouseEnter({ event: e, node: treeNode });
  };

  Tree.prototype.onMouseLeave = function onMouseLeave(e, treeNode) {
    this.props.onMouseLeave({ event: e, node: treeNode });
  };

  Tree.prototype.onContextMenu = function onContextMenu(e, treeNode) {
    if (this.props.onRightClick) {
      e.preventDefault();
      this.props.onRightClick({ event: e, node: treeNode });
    }
  };

  // all keyboard events callbacks run from here at first


  Tree.prototype.getOpenTransitionName = function getOpenTransitionName() {
    var props = this.props;
    var transitionName = props.openTransitionName;
    var animationName = props.openAnimation;
    if (!transitionName && typeof animationName === 'string') {
      return props.prefixCls + '-open-' + animationName;
    }
    return transitionName;
  };

  Tree.prototype.getDragNodesKeys = function getDragNodesKeys(treeNode) {
    var dragNodesKeys = [];
    Object(__WEBPACK_IMPORTED_MODULE_8__util__["e" /* traverseTreeNodes */])(treeNode.props.children, function (item, index, pos, key) {
      if (Object(__WEBPACK_IMPORTED_MODULE_8__util__["d" /* isPositionPrefix */])(treeNode.props.pos, pos)) {
        dragNodesKeys.push(key);
      }
    });
    dragNodesKeys.push(treeNode.props.eventKey || treeNode.props.pos);
    return dragNodesKeys;
  };

  Tree.prototype.getExpandedKeys = function getExpandedKeys(treeNode, expand) {
    var eventKey = treeNode.props.eventKey;
    var expandedKeys = this.state.expandedKeys;
    var expandedIndex = expandedKeys.indexOf(eventKey);
    if (!expand && expandedIndex > -1) {
      var exKeys = [].concat(expandedKeys);
      exKeys.splice(expandedIndex, 1);
      return exKeys;
    }
    if (expand && expandedKeys.indexOf(eventKey) === -1) {
      return expandedKeys.concat([eventKey]);
    }
  };

  Tree.prototype.generateTreeNodesStates = function generateTreeNodesStates(children, checkedKeys) {
    var checkedPositions = [];
    var treeNodesStates = {};
    Object(__WEBPACK_IMPORTED_MODULE_8__util__["e" /* traverseTreeNodes */])(children, function (item, _, pos, key, childrenPos, parentPos) {
      treeNodesStates[pos] = {
        node: item,
        key: key,
        checked: false,
        halfChecked: false,
        disabled: item.props.disabled,
        disableCheckbox: item.props.disableCheckbox,
        childrenPos: childrenPos,
        parentPos: parentPos
      };
      if (checkedKeys.indexOf(key) !== -1) {
        treeNodesStates[pos].checked = true;
        checkedPositions.push(pos);
      }
    });
    checkedPositions.forEach(function (checkedPosition) {
      Object(__WEBPACK_IMPORTED_MODULE_8__util__["f" /* updateCheckState */])(treeNodesStates, checkedPosition, true);
    });
    return treeNodesStates;
  };

  Tree.prototype.calcExpandedKeys = function calcExpandedKeys(props, isNotInit) {
    var expandedKeys = props.expandedKeys || (isNotInit ? undefined : props.defaultExpandedKeys);
    if (!expandedKeys) {
      return undefined;
    }
    var expandAll = isNotInit ? false : props.defaultExpandAll;
    if (!expandAll && !props.autoExpandParent) {
      return expandedKeys;
    }

    var expandedPositionArr = [];
    if (props.autoExpandParent) {
      Object(__WEBPACK_IMPORTED_MODULE_8__util__["e" /* traverseTreeNodes */])(props.children, function (item, index, pos, key) {
        if (expandedKeys.indexOf(key) > -1) {
          expandedPositionArr.push(pos);
        }
      });
    }
    var filterExpandedKeysSet = {};
    Object(__WEBPACK_IMPORTED_MODULE_8__util__["e" /* traverseTreeNodes */])(props.children, function (item, index, pos, key) {
      if (expandAll) {
        filterExpandedKeysSet[key] = true;
      } else if (props.autoExpandParent) {
        var isCurrentParentOfExpanded = expandedPositionArr.some(function (p) {
          return Object(__WEBPACK_IMPORTED_MODULE_8__util__["d" /* isPositionPrefix */])(pos, p);
        });
        if (isCurrentParentOfExpanded) {
          filterExpandedKeysSet[key] = true;
        }
      }
    });
    var filterExpandedKeys = Object.keys(filterExpandedKeysSet);
    return filterExpandedKeys.length ? filterExpandedKeys : expandedKeys;
  };

  Tree.prototype.calcCheckedKeys = function calcCheckedKeys(props, isNotInit) {
    if (!props.checkable) {
      return { checkedKeys: [], halfCheckedKeys: [] };
    }

    var checkedKeys = props.checkedKeys || (isNotInit && !props.loadData ? undefined : props.defaultCheckedKeys);
    if (!checkedKeys) {
      return undefined;
    }
    if (Array.isArray(checkedKeys)) {
      checkedKeys = { checkedKeys: checkedKeys, halfCheckedKeys: [] };
    } else if (typeof checkedKeys === 'object') {
      checkedKeys = { checkedKeys: checkedKeys.checked, halfCheckedKeys: checkedKeys.halfChecked };
    }

    if (!props.checkStrictly) {
      var checked = checkedKeys.checkedKeys || [];
      var treeNodesStates = this.generateTreeNodesStates(props.children, checked);
      return Object(__WEBPACK_IMPORTED_MODULE_8__util__["a" /* getCheck */])(treeNodesStates);
    }

    return checkedKeys;
  };

  Tree.prototype.calcSelectedKeys = function calcSelectedKeys(props, isNotInit) {
    var selectedKeys = props.selectedKeys || (isNotInit ? undefined : props.defaultSelectedKeys);
    if (!selectedKeys) {
      return undefined;
    }
    if (props.multiple) {
      return [].concat(selectedKeys);
    }
    if (selectedKeys.length) {
      return [selectedKeys[0]];
    }
    return selectedKeys;
  };

  Tree.prototype.calcDropPosition = function calcDropPosition(e, treeNode) {
    var offsetTop = Object(__WEBPACK_IMPORTED_MODULE_8__util__["b" /* getOffset */])(treeNode.selectHandle).top;
    var offsetHeight = treeNode.selectHandle.offsetHeight;
    var pageY = e.pageY;
    var gapHeight = 2; // TODO: remove hard code
    if (pageY > offsetTop + offsetHeight - gapHeight) {
      return 1;
    }
    if (pageY < offsetTop + gapHeight) {
      return -1;
    }
    return 0;
  };

  Tree.prototype.renderTreeNode = function renderTreeNode(child, index) {
    var level = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var state = this.state,
        props = this.props;

    var pos = level + '-' + index;
    var key = child.key || pos;

    var childProps = {
      root: this,
      eventKey: key,
      pos: pos,
      loadData: props.loadData,
      prefixCls: props.prefixCls,
      showIcon: props.showIcon,
      draggable: props.draggable,
      dragOver: state.dragOverNodeKey === key && state.dropPosition === 0,
      dragOverGapTop: state.dragOverNodeKey === key && state.dropPosition === -1,
      dragOverGapBottom: state.dragOverNodeKey === key && state.dropPosition === 1,
      expanded: state.expandedKeys.indexOf(key) !== -1,
      selected: state.selectedKeys.indexOf(key) !== -1,
      openTransitionName: this.getOpenTransitionName(),
      openAnimation: props.openAnimation,
      filterTreeNode: this.filterTreeNode
    };
    if (props.checkable) {
      childProps.checkable = props.checkable;
      childProps.checked = state.checkedKeys.indexOf(key) !== -1;
      childProps.halfChecked = state.halfCheckedKeys.indexOf(key) !== -1;
    }
    return __WEBPACK_IMPORTED_MODULE_4_react___default.a.cloneElement(child, childProps);
  };

  Tree.prototype.render = function render() {
    var _classNames;

    var props = this.props;
    var className = __WEBPACK_IMPORTED_MODULE_6_classnames___default()(props.prefixCls, props.className, (_classNames = {}, _classNames[props.prefixCls + '-show-line'] = props.showLine, _classNames));
    var domProps = {};
    if (props.focusable) {
      domProps.tabIndex = '0';
      domProps.onKeyDown = this.onKeyDown;
    }

    return __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
      'ul',
      __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, domProps, {
        className: className,
        role: 'tree-node',
        unselectable: 'on'
      }),
      __WEBPACK_IMPORTED_MODULE_4_react___default.a.Children.map(props.children, this.renderTreeNode, this)
    );
  };

  return Tree;
}(__WEBPACK_IMPORTED_MODULE_4_react___default.a.Component);

Tree.propTypes = {
  prefixCls: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.string,
  children: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.any,
  showLine: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.bool,
  showIcon: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.bool,
  selectable: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.bool,
  multiple: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.bool,
  checkable: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.bool, __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.node]),
  checkStrictly: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.bool,
  draggable: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.bool,
  autoExpandParent: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.bool,
  defaultExpandAll: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.bool,
  defaultExpandedKeys: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.string),
  expandedKeys: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.string),
  defaultCheckedKeys: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.string),
  checkedKeys: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.string), __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.object]),
  defaultSelectedKeys: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.string),
  selectedKeys: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.string),
  onExpand: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.func,
  onCheck: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.func,
  onSelect: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.func,
  loadData: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.func,
  onMouseEnter: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.func,
  onMouseLeave: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.func,
  onRightClick: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.func,
  onDragStart: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.func,
  onDragEnter: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.func,
  onDragOver: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.func,
  onDragLeave: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.func,
  onDrop: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.func,
  onDragEnd: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.func,
  filterTreeNode: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.func,
  openTransitionName: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.string,
  openAnimation: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.string, __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.object])
};
Tree.childContextTypes = contextTypes;
Tree.defaultProps = {
  prefixCls: 'rc-tree',
  showLine: false,
  showIcon: true,
  selectable: true,
  multiple: false,
  checkable: false,
  checkStrictly: false,
  draggable: false,
  autoExpandParent: true,
  defaultExpandAll: false,
  defaultExpandedKeys: [],
  defaultCheckedKeys: [],
  defaultSelectedKeys: [],
  onExpand: noop,
  onCheck: noop,
  onSelect: noop,
  onDragStart: noop,
  onDragEnter: noop,
  onDragOver: noop,
  onDragLeave: noop,
  onDrop: noop,
  onDragEnd: noop,
  onMouseEnter: noop,
  onMouseLeave: noop
};

var _initialiseProps = function _initialiseProps() {
  var _this4 = this;

  this.onCheck = function (treeNode) {
    var props = _this4.props,
        state = _this4.state;

    var checked = !treeNode.props.checked || treeNode.props.halfChecked;
    var eventObj = {
      event: 'check',
      node: treeNode,
      checked: checked
    };

    if (props.checkStrictly) {
      var eventKey = treeNode.props.eventKey;
      var checkedKeys = [].concat(state.checkedKeys);
      var index = checkedKeys.indexOf(eventKey);
      if (checked && index === -1) {
        checkedKeys.push(eventKey);
      }
      if (!checked && index > -1) {
        checkedKeys.splice(index, 1);
      }

      eventObj.checkedNodes = [];
      Object(__WEBPACK_IMPORTED_MODULE_8__util__["e" /* traverseTreeNodes */])(props.children, function (item) {
        if (checkedKeys.indexOf(item.key) !== -1) {
          eventObj.checkedNodes.push(item);
        }
      });

      if (!('checkedKeys' in props)) {
        _this4.setState({
          checkedKeys: checkedKeys
        });
      }
      props.onCheck(Object(__WEBPACK_IMPORTED_MODULE_8__util__["c" /* getStrictlyValue */])(checkedKeys, state.halfCheckedKeys), eventObj);
    } else {
      var treeNodesStates = _this4.generateTreeNodesStates(props.children, state.checkedKeys);
      treeNodesStates[treeNode.props.pos].checked = checked;
      treeNodesStates[treeNode.props.pos].halfChecked = false;
      Object(__WEBPACK_IMPORTED_MODULE_8__util__["f" /* updateCheckState */])(treeNodesStates, treeNode.props.pos, checked);

      var checkKeys = Object(__WEBPACK_IMPORTED_MODULE_8__util__["a" /* getCheck */])(treeNodesStates);
      eventObj.checkedNodes = checkKeys.checkedNodes;
      eventObj.checkedNodesPositions = checkKeys.checkedNodesPositions; // TODO: not in API
      eventObj.halfCheckedKeys = checkKeys.halfCheckedKeys; // TODO: not in API

      if (!('checkedKeys' in props)) {
        _this4.setState({
          checkedKeys: checkKeys.checkedKeys,
          halfCheckedKeys: checkKeys.halfCheckedKeys
        });
      }
      props.onCheck(checkKeys.checkedKeys, eventObj);
    }
  };

  this.onKeyDown = function (e) {
    e.preventDefault();
  };

  this.filterTreeNode = function (treeNode) {
    var filterTreeNode = _this4.props.filterTreeNode;
    if (typeof filterTreeNode !== 'function' || treeNode.props.disabled) {
      return false;
    }
    return filterTreeNode.call(_this4, treeNode);
  };
};

/* harmony default export */ __webpack_exports__["b"] = (Tree);

/***/ }),
/* 69 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = toArray;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function toArray(children) {
  var ret = [];
  __WEBPACK_IMPORTED_MODULE_0_react___default.a.Children.forEach(children, function (c) {
    ret.push(c);
  });
  return ret;
}

/***/ }),
/* 70 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_inherits__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_prop_types__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_prop_types__);






var TreeNode = function (_React$Component) {
  __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_inherits___default()(TreeNode, _React$Component);

  function TreeNode() {
    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, TreeNode);

    return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_possibleConstructorReturn___default()(this, _React$Component.apply(this, arguments));
  }

  return TreeNode;
}(__WEBPACK_IMPORTED_MODULE_3_react___default.a.Component);

TreeNode.propTypes = {
  value: __WEBPACK_IMPORTED_MODULE_4_prop_types___default.a.string
};
/* harmony default export */ __webpack_exports__["a"] = (TreeNode);

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(72);
module.exports = __webpack_require__(73);


/***/ }),
/* 72 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 73 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Select__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__TreeNode__ = __webpack_require__(70);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "TreeNode", function() { return __WEBPACK_IMPORTED_MODULE_1__TreeNode__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__strategies__ = __webpack_require__(46);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "SHOW_ALL", function() { return __WEBPACK_IMPORTED_MODULE_2__strategies__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "SHOW_PARENT", function() { return __WEBPACK_IMPORTED_MODULE_2__strategies__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "SHOW_CHILD", function() { return __WEBPACK_IMPORTED_MODULE_2__strategies__["b"]; });
// export this package's api



__WEBPACK_IMPORTED_MODULE_0__Select__["a" /* default */].TreeNode = __WEBPACK_IMPORTED_MODULE_1__TreeNode__["a" /* default */];

/* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_0__Select__["a" /* default */]);



/***/ }),
/* 74 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_inherits__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_extends__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_objectWithoutProperties__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_objectWithoutProperties___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_objectWithoutProperties__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react_dom__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rc_util_es_KeyCode__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_classnames__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rc_animate__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__util__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__SelectTrigger__ = __webpack_require__(124);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__TreeNode__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__strategies__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__PropTypes__ = __webpack_require__(150);
















function noop() {}

function filterFn(input, child) {
  return String(Object(__WEBPACK_IMPORTED_MODULE_10__util__["f" /* getPropValue */])(child, Object(__WEBPACK_IMPORTED_MODULE_10__util__["k" /* labelCompatible */])(this.props.treeNodeFilterProp))).indexOf(input) > -1;
}

function loopTreeData(data) {
  var level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var treeCheckable = arguments[2];

  return data.map(function (item, index) {
    var pos = level + '-' + index;

    var label = item.label,
        value = item.value,
        disabled = item.disabled,
        key = item.key,
        hasOwnProperty = item.hasOwnProperty,
        selectable = item.selectable,
        children = item.children,
        isLeaf = item.isLeaf,
        otherProps = __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_objectWithoutProperties___default()(item, ['label', 'value', 'disabled', 'key', 'hasOwnProperty', 'selectable', 'children', 'isLeaf']);

    var props = __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_extends___default()({
      value: value,
      title: label,
      // value: value || String(key || label), // cause onChange callback error
      key: key || value || pos,
      disabled: disabled || false,
      selectable: selectable === false ? selectable : !treeCheckable
    }, otherProps);
    var ret = void 0;
    if (children && children.length) {
      ret = __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_12__TreeNode__["a" /* default */],
        props,
        loopTreeData(children, pos, treeCheckable)
      );
    } else {
      ret = __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_12__TreeNode__["a" /* default */], __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_extends___default()({}, props, { isLeaf: isLeaf }));
    }
    return ret;
  });
}

var Select = function (_Component) {
  __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_inherits___default()(Select, _Component);

  function Select(props) {
    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, Select);

    var _this = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_possibleConstructorReturn___default()(this, _Component.call(this, props));

    _initialiseProps.call(_this);

    var value = [];
    if ('value' in props) {
      value = Object(__WEBPACK_IMPORTED_MODULE_10__util__["p" /* toArray */])(props.value);
    } else {
      value = Object(__WEBPACK_IMPORTED_MODULE_10__util__["p" /* toArray */])(props.defaultValue);
    }
    // save parsed treeData, for performance (treeData may be very big)
    _this.renderedTreeData = _this.renderTreeData();
    value = _this.addLabelToValue(props, value);
    value = _this.getValue(props, value, props.inputValue ? '__strict' : true);
    var inputValue = props.inputValue || '';
    // if (props.combobox) {
    //   inputValue = value.length ? String(value[0].value) : '';
    // }
    _this.state = {
      value: value,
      inputValue: inputValue,
      open: props.open || props.defaultOpen,
      focused: false
    };
    return _this;
  }

  Select.prototype.componentDidMount = function componentDidMount() {
    var _props2 = this.props,
        autoFocus = _props2.autoFocus,
        disabled = _props2.disabled;

    if (Object(__WEBPACK_IMPORTED_MODULE_10__util__["i" /* isMultiple */])(this.props)) {
      var inputNode = this.getInputDOMNode();
      if (inputNode.value) {
        inputNode.style.width = '';
        inputNode.style.width = this.inputMirrorInstance.clientWidth + 'px';
      } else {
        inputNode.style.width = '';
      }
    }
    if (autoFocus && !disabled) {
      this.focus();
    }
  };

  Select.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    // save parsed treeData, for performance (treeData may be very big)
    this.renderedTreeData = this.renderTreeData(nextProps);
    // Detecting whether the object of `onChange`'s argument  is old ref.
    // Better to do a deep equal later.
    this._cacheTreeNodesStates = this._cacheTreeNodesStates !== 'no' && this._savedValue && nextProps.value === this._savedValue;
    if (this.props.treeData !== nextProps.treeData || this.props.children !== nextProps.children) {
      // refresh this._treeNodesStates cache
      this._treeNodesStates = Object(__WEBPACK_IMPORTED_MODULE_10__util__["g" /* getTreeNodesStates */])(this.renderedTreeData || nextProps.children, this.state.value.map(function (item) {
        return item.value;
      }));
    }
    if ('value' in nextProps) {
      var value = Object(__WEBPACK_IMPORTED_MODULE_10__util__["p" /* toArray */])(nextProps.value);
      value = this.addLabelToValue(nextProps, value);
      value = this.getValue(nextProps, value);
      this.setState({
        value: value
      }, this.forcePopupAlign);
      // if (nextProps.combobox) {
      //   this.setState({
      //     inputValue: value.length ? String(value[0].key) : '',
      //   });
      // }
    }
    if (nextProps.inputValue !== this.props.inputValue) {
      this.setState({
        inputValue: nextProps.inputValue
      });
    }
    if ('open' in nextProps) {
      this.setState({
        open: nextProps.open
      });
    }
  };

  Select.prototype.componentWillUpdate = function componentWillUpdate(nextProps) {
    if (this._savedValue && nextProps.value && nextProps.value !== this._savedValue && nextProps.value === this.props.value) {
      this._cacheTreeNodesStates = false;
      this.getValue(nextProps, this.addLabelToValue(nextProps, Object(__WEBPACK_IMPORTED_MODULE_10__util__["p" /* toArray */])(nextProps.value)));
    }
  };

  Select.prototype.componentDidUpdate = function componentDidUpdate() {
    var state = this.state;
    var props = this.props;
    if (state.open && Object(__WEBPACK_IMPORTED_MODULE_10__util__["i" /* isMultiple */])(props)) {
      var inputNode = this.getInputDOMNode();
      if (inputNode.value) {
        inputNode.style.width = '';
        inputNode.style.width = this.inputMirrorInstance.clientWidth + 'px';
      } else {
        inputNode.style.width = '';
      }
    }
  };

  Select.prototype.componentWillUnmount = function componentWillUnmount() {
    this.clearDelayTimer();
    if (this.dropdownContainer) {
      __WEBPACK_IMPORTED_MODULE_6_react_dom___default.a.unmountComponentAtNode(this.dropdownContainer);
      document.body.removeChild(this.dropdownContainer);
      this.dropdownContainer = null;
    }
  };

  // combobox ignore


  Select.prototype.getLabelFromNode = function getLabelFromNode(child) {
    return Object(__WEBPACK_IMPORTED_MODULE_10__util__["f" /* getPropValue */])(child, this.props.treeNodeLabelProp);
  };

  Select.prototype.getLabelFromProps = function getLabelFromProps(props, value) {
    var _this2 = this;

    if (value === undefined) {
      return null;
    }
    var label = null;
    Object(__WEBPACK_IMPORTED_MODULE_10__util__["l" /* loopAllChildren */])(this.renderedTreeData || props.children, function (item) {
      if (Object(__WEBPACK_IMPORTED_MODULE_10__util__["h" /* getValuePropValue */])(item) === value) {
        label = _this2.getLabelFromNode(item);
      }
    });
    if (label === null) {
      return value;
    }
    return label;
  };

  Select.prototype.getDropdownContainer = function getDropdownContainer() {
    if (!this.dropdownContainer) {
      this.dropdownContainer = document.createElement('div');
      document.body.appendChild(this.dropdownContainer);
    }
    return this.dropdownContainer;
  };

  Select.prototype.getSearchPlaceholderElement = function getSearchPlaceholderElement(hidden) {
    var props = this.props;
    var placeholder = void 0;
    if (Object(__WEBPACK_IMPORTED_MODULE_10__util__["i" /* isMultiple */])(props)) {
      placeholder = props.placeholder || props.searchPlaceholder;
    } else {
      placeholder = props.searchPlaceholder;
    }
    if (placeholder) {
      return __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
        'span',
        {
          style: { display: hidden ? 'none' : 'block' },
          onClick: this.onPlaceholderClick,
          className: props.prefixCls + '-search__field__placeholder'
        },
        placeholder
      );
    }
    return null;
  };

  Select.prototype.getInputElement = function getInputElement() {
    var inputValue = this.state.inputValue;
    var _props3 = this.props,
        prefixCls = _props3.prefixCls,
        disabled = _props3.disabled;

    return __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
      'span',
      { className: prefixCls + '-search__field__wrap' },
      __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement('input', {
        ref: Object(__WEBPACK_IMPORTED_MODULE_10__util__["o" /* saveRef */])(this, 'inputInstance'),
        onChange: this.onInputChange,
        onKeyDown: this.onInputKeyDown,
        value: inputValue,
        disabled: disabled,
        className: prefixCls + '-search__field',
        role: 'textbox'
      }),
      __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
        'span',
        {
          ref: Object(__WEBPACK_IMPORTED_MODULE_10__util__["o" /* saveRef */])(this, 'inputMirrorInstance'),
          className: prefixCls + '-search__field__mirror'
        },
        inputValue,
        '\xA0'
      ),
      Object(__WEBPACK_IMPORTED_MODULE_10__util__["i" /* isMultiple */])(this.props) ? null : this.getSearchPlaceholderElement(!!inputValue)
    );
  };

  Select.prototype.getInputDOMNode = function getInputDOMNode() {
    return this.inputInstance;
  };

  Select.prototype.getPopupDOMNode = function getPopupDOMNode() {
    return this.trigger.getPopupDOMNode();
  };

  Select.prototype.getPopupComponentRefs = function getPopupComponentRefs() {
    return this.trigger.getPopupEleRefs();
  };

  Select.prototype.getValue = function getValue(_props, val) {
    var _this3 = this;

    var init = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

    var value = val;
    // if inputValue existing, tree is checkStrictly
    var _strict = init === '__strict' || init && (this.state && this.state.inputValue || this.props.inputValue !== _props.inputValue);
    if (_props.treeCheckable && (_props.treeCheckStrictly || _strict)) {
      this.halfCheckedValues = [];
      value = [];
      val.forEach(function (i) {
        if (!i.halfChecked) {
          value.push(i);
        } else {
          _this3.halfCheckedValues.push(i);
        }
      });
    }
    // if (!(_props.treeCheckable && !_props.treeCheckStrictly)) {
    if (!!!_props.treeCheckable || _props.treeCheckable && (_props.treeCheckStrictly || _strict)) {
      return value;
    }
    var checkedTreeNodes = void 0;
    if (this._cachetreeData && this._cacheTreeNodesStates && this._checkedNodes && this.state && !this.state.inputValue) {
      this.checkedTreeNodes = checkedTreeNodes = this._checkedNodes;
    } else {
      /**
       * Note: `this._treeNodesStates`'s treeNodesStates must correspond to nodes of the
       * final tree (`processTreeNode` function from SelectTrigger.jsx produce the final tree).
       *
       * And, `this._treeNodesStates` from `onSelect` is previous value,
       * so it perhaps only have a few nodes, but the newly filtered tree can have many nodes,
       * thus, you cannot use previous _treeNodesStates.
       */
      // getTreeNodesStates is not effective.
      this._treeNodesStates = Object(__WEBPACK_IMPORTED_MODULE_10__util__["g" /* getTreeNodesStates */])(this.renderedTreeData || _props.children, value.map(function (item) {
        return item.value;
      }));
      this.checkedTreeNodes = checkedTreeNodes = this._treeNodesStates.checkedNodes;
    }
    var mapLabVal = function mapLabVal(arr) {
      return arr.map(function (itemObj) {
        return {
          value: Object(__WEBPACK_IMPORTED_MODULE_10__util__["h" /* getValuePropValue */])(itemObj.node),
          label: Object(__WEBPACK_IMPORTED_MODULE_10__util__["f" /* getPropValue */])(itemObj.node, _props.treeNodeLabelProp)
        };
      });
    };
    var props = this.props;
    var checkedValues = [];
    if (props.showCheckedStrategy === __WEBPACK_IMPORTED_MODULE_13__strategies__["a" /* SHOW_ALL */]) {
      checkedValues = mapLabVal(checkedTreeNodes);
    } else if (props.showCheckedStrategy === __WEBPACK_IMPORTED_MODULE_13__strategies__["c" /* SHOW_PARENT */]) {
      var posArr = Object(__WEBPACK_IMPORTED_MODULE_10__util__["d" /* filterParentPosition */])(checkedTreeNodes.map(function (itemObj) {
        return itemObj.pos;
      }));
      checkedValues = mapLabVal(checkedTreeNodes.filter(function (itemObj) {
        return posArr.indexOf(itemObj.pos) !== -1;
      }));
    } else {
      checkedValues = mapLabVal(checkedTreeNodes.filter(function (itemObj) {
        return !itemObj.node.props.children;
      }));
    }
    return checkedValues;
  };

  Select.prototype.getCheckedNodes = function getCheckedNodes(info, props) {
    // TODO treeCheckable does not support tags/dynamic
    var checkedNodes = info.checkedNodes;
    // if inputValue existing, tree is checkStrictly

    if (props.treeCheckStrictly || this.state.inputValue) {
      return checkedNodes;
    }
    var checkedNodesPositions = info.checkedNodesPositions;
    if (props.showCheckedStrategy === __WEBPACK_IMPORTED_MODULE_13__strategies__["a" /* SHOW_ALL */]) {
      checkedNodes = checkedNodes;
    } else if (props.showCheckedStrategy === __WEBPACK_IMPORTED_MODULE_13__strategies__["c" /* SHOW_PARENT */]) {
      var posArr = Object(__WEBPACK_IMPORTED_MODULE_10__util__["d" /* filterParentPosition */])(checkedNodesPositions.map(function (itemObj) {
        return itemObj.pos;
      }));
      checkedNodes = checkedNodesPositions.filter(function (itemObj) {
        return posArr.indexOf(itemObj.pos) !== -1;
      }).map(function (itemObj) {
        return itemObj.node;
      });
    } else {
      checkedNodes = checkedNodes.filter(function (n) {
        return !n.props.children;
      });
    }
    return checkedNodes;
  };

  Select.prototype.getDeselectedValue = function getDeselectedValue(selectedValue) {
    var checkedTreeNodes = this.checkedTreeNodes;
    var unCheckPos = void 0;
    checkedTreeNodes.forEach(function (itemObj) {
      if (itemObj.node.props.value === selectedValue) {
        unCheckPos = itemObj.pos;
      }
    });
    var newVals = [];
    var newCkTns = [];
    checkedTreeNodes.forEach(function (itemObj) {
      if (Object(__WEBPACK_IMPORTED_MODULE_10__util__["j" /* isPositionPrefix */])(itemObj.pos, unCheckPos) || Object(__WEBPACK_IMPORTED_MODULE_10__util__["j" /* isPositionPrefix */])(unCheckPos, itemObj.pos)) {
        // Filter ancestral and children nodes when uncheck a node.
        return;
      }
      newCkTns.push(itemObj);
      newVals.push(itemObj.node.props.value);
    });
    this.checkedTreeNodes = this._checkedNodes = newCkTns;
    var nv = this.state.value.filter(function (val) {
      return newVals.indexOf(val.value) !== -1;
    });
    this.fireChange(nv, { triggerValue: selectedValue, clear: true });
  };

  Select.prototype.setOpenState = function setOpenState(open, needFocus) {
    var _this4 = this;

    var documentClickClose = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    this.clearDelayTimer();
    var props = this.props;
    // can not optimize, if children is empty
    // if (this.state.open === open) {
    //   return;
    // }

    if (!this.props.onDropdownVisibleChange(open, { documentClickClose: documentClickClose })) {
      return;
    }
    this.setState({
      open: open
    }, function () {
      if (needFocus || open) {
        // Input dom init after first time component render
        // Add delay for this to get focus
        Promise.resolve().then(function () {
          if (open || Object(__WEBPACK_IMPORTED_MODULE_10__util__["i" /* isMultiple */])(props)) {
            var input = _this4.getInputDOMNode();
            if (input && document.activeElement !== input) {
              input.focus();
            }
          } else if (_this4.selection) {
            _this4.selection.focus();
          }
        });
      }
    });
  };

  Select.prototype.clearSearchInput = function clearSearchInput() {
    this.getInputDOMNode().focus();
    if (!('inputValue' in this.props)) {
      this.setState({ inputValue: '' });
    }
  };

  Select.prototype.addLabelToValue = function addLabelToValue(props, value_) {
    var _this5 = this;

    var value = value_;
    if (this.isLabelInValue()) {
      value.forEach(function (v, i) {
        if (Object.prototype.toString.call(value[i]) !== '[object Object]') {
          value[i] = {
            value: '',
            label: ''
          };
          return;
        }
        v.label = v.label || _this5.getLabelFromProps(props, v.value);
      });
    } else {
      value = value.map(function (v) {
        return {
          value: v,
          label: _this5.getLabelFromProps(props, v)
        };
      });
    }
    return value;
  };

  Select.prototype.clearDelayTimer = function clearDelayTimer() {
    if (this.delayTimer) {
      clearTimeout(this.delayTimer);
      this.delayTimer = null;
    }
  };

  Select.prototype.removeSelected = function removeSelected(selectedVal, e) {
    var props = this.props;
    if (props.disabled) {
      return;
    }

    // Do not trigger Trigger popup
    if (e && e.stopPropagation) {
      e.stopPropagation();
    }

    this._cacheTreeNodesStates = 'no';
    if (props.treeCheckable && (props.showCheckedStrategy === __WEBPACK_IMPORTED_MODULE_13__strategies__["a" /* SHOW_ALL */] || props.showCheckedStrategy === __WEBPACK_IMPORTED_MODULE_13__strategies__["c" /* SHOW_PARENT */]) && !(props.treeCheckStrictly || this.state.inputValue)) {
      this.getDeselectedValue(selectedVal);
      return;
    }
    // click the node's `x`(in select box), likely trigger the TreeNode's `unCheck` event,
    // cautiously, they are completely different, think about it, the tree may not render at first,
    // but the nodes in select box are ready.
    var label = void 0;
    var value = this.state.value.filter(function (singleValue) {
      if (singleValue.value === selectedVal) {
        label = singleValue.label;
      }
      return singleValue.value !== selectedVal;
    });
    var canMultiple = Object(__WEBPACK_IMPORTED_MODULE_10__util__["i" /* isMultiple */])(props);

    if (canMultiple) {
      var event = selectedVal;
      if (this.isLabelInValue()) {
        event = {
          value: selectedVal,
          label: label
        };
      }
      props.onDeselect(event);
    }
    if (props.treeCheckable) {
      if (this.checkedTreeNodes && this.checkedTreeNodes.length) {
        this.checkedTreeNodes = this._checkedNodes = this.checkedTreeNodes.filter(function (item) {
          return value.some(function (i) {
            return i.value === item.node.props.value;
          });
        });
      }
    }

    this.fireChange(value, { triggerValue: selectedVal, clear: true });
  };

  Select.prototype.openIfHasChildren = function openIfHasChildren() {
    var props = this.props;
    if (__WEBPACK_IMPORTED_MODULE_5_react___default.a.Children.count(props.children) || !Object(__WEBPACK_IMPORTED_MODULE_10__util__["i" /* isMultiple */])(props)) {
      this.setOpenState(true);
    }
  };

  Select.prototype.fireChange = function fireChange(value) {
    var _this6 = this;

    var extraInfo = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var props = this.props;
    var vals = value.map(function (i) {
      return i.value;
    });
    var sv = this.state.value.map(function (i) {
      return i.value;
    });
    if (vals.length !== sv.length || !vals.every(function (val, index) {
      return sv[index] === val;
    })) {
      var ex = __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_extends___default()({
        preValue: [].concat(this.state.value)
      }, extraInfo);
      var labs = null;
      var vls = value;
      if (!this.isLabelInValue()) {
        labs = value.map(function (i) {
          return i.label;
        });
        vls = vls.map(function (v) {
          return v.value;
        });
      } else if (this.halfCheckedValues && this.halfCheckedValues.length) {
        this.halfCheckedValues.forEach(function (i) {
          if (!vls.some(function (v) {
            return v.value === i.value;
          })) {
            vls.push(i);
          }
        });
      }
      if (props.treeCheckable && ex.clear) {
        var treeData = this.renderedTreeData || props.children;
        ex.allCheckedNodes = Object(__WEBPACK_IMPORTED_MODULE_10__util__["e" /* flatToHierarchy */])(Object(__WEBPACK_IMPORTED_MODULE_10__util__["c" /* filterAllCheckedData */])(vals, treeData));
      }
      if (props.treeCheckable && this.state.inputValue) {
        var _vls = [].concat(this.state.value);
        if (ex.checked) {
          value.forEach(function (i) {
            if (_vls.every(function (ii) {
              return ii.value !== i.value;
            })) {
              _vls.push(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_extends___default()({}, i));
            }
          });
        } else {
          var index = void 0;
          var includeVal = _vls.some(function (i, ind) {
            if (i.value === ex.triggerValue) {
              index = ind;
              return true;
            }
          });
          if (includeVal) {
            _vls.splice(index, 1);
          }
        }
        vls = _vls;
        if (!this.isLabelInValue()) {
          labs = _vls.map(function (v) {
            return v.label;
          });
          vls = _vls.map(function (v) {
            return v.value;
          });
        }
      }
      this._savedValue = Object(__WEBPACK_IMPORTED_MODULE_10__util__["i" /* isMultiple */])(props) ? vls : vls[0];
      props.onChange(this._savedValue, labs, ex);
      if (!('value' in props)) {
        this._cacheTreeNodesStates = false;
        this.setState({
          value: this.getValue(props, Object(__WEBPACK_IMPORTED_MODULE_10__util__["p" /* toArray */])(this._savedValue).map(function (v, i) {
            return _this6.isLabelInValue() ? v : {
              value: v,
              label: labs && labs[i]
            };
          }))
        }, this.forcePopupAlign);
      }
    }
  };

  Select.prototype.isLabelInValue = function isLabelInValue() {
    var _props4 = this.props,
        treeCheckable = _props4.treeCheckable,
        treeCheckStrictly = _props4.treeCheckStrictly,
        labelInValue = _props4.labelInValue;

    if (treeCheckable && treeCheckStrictly) {
      return true;
    }
    return labelInValue || false;
  };

  Select.prototype.focus = function focus() {
    if (!Object(__WEBPACK_IMPORTED_MODULE_10__util__["i" /* isMultiple */])(this.props)) {
      this.selection.focus();
    } else {
      this.getInputDOMNode().focus();
    }
  };

  Select.prototype.blur = function blur() {
    if (!Object(__WEBPACK_IMPORTED_MODULE_10__util__["i" /* isMultiple */])(this.props)) {
      this.selection.blur();
    } else {
      this.getInputDOMNode().blur();
    }
  };

  Select.prototype.renderTopControlNode = function renderTopControlNode() {
    var _this7 = this;

    var value = this.state.value;

    var props = this.props;
    var choiceTransitionName = props.choiceTransitionName,
        prefixCls = props.prefixCls,
        maxTagTextLength = props.maxTagTextLength;

    var multiple = Object(__WEBPACK_IMPORTED_MODULE_10__util__["i" /* isMultiple */])(props);

    // single and not combobox, input is inside dropdown
    if (!multiple) {
      var innerNode = __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
        'span',
        {
          key: 'placeholder',
          className: prefixCls + '-selection__placeholder'
        },
        props.placeholder
      );
      if (value.length) {
        innerNode = __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
          'span',
          {
            key: 'value',
            title: Object(__WEBPACK_IMPORTED_MODULE_10__util__["q" /* toTitle */])(value[0].label),
            className: prefixCls + '-selection-selected-value'
          },
          value[0].label
        );
      }
      return __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
        'span',
        { className: prefixCls + '-selection__rendered' },
        innerNode
      );
    }

    var selectedValueNodes = value.map(function (singleValue) {
      var content = singleValue.label;
      var title = content;
      if (maxTagTextLength && typeof content === 'string' && content.length > maxTagTextLength) {
        content = content.slice(0, maxTagTextLength) + '...';
      }
      return __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
        'li',
        __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_extends___default()({
          style: __WEBPACK_IMPORTED_MODULE_10__util__["b" /* UNSELECTABLE_STYLE */]
        }, __WEBPACK_IMPORTED_MODULE_10__util__["a" /* UNSELECTABLE_ATTRIBUTE */], {
          onMouseDown: __WEBPACK_IMPORTED_MODULE_10__util__["m" /* preventDefaultEvent */],
          className: prefixCls + '-selection__choice',
          key: singleValue.value,
          title: Object(__WEBPACK_IMPORTED_MODULE_10__util__["q" /* toTitle */])(title)
        }),
        __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement('span', {
          className: prefixCls + '-selection__choice__remove',
          onClick: function onClick(event) {
            _this7.removeSelected(singleValue.value, event);
          }
        }),
        __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
          'span',
          { className: prefixCls + '-selection__choice__content' },
          content
        )
      );
    });

    selectedValueNodes.push(__WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
      'li',
      {
        className: prefixCls + '-search ' + prefixCls + '-search--inline',
        key: '__input'
      },
      this.getInputElement()
    ));
    var className = prefixCls + '-selection__rendered';
    if (choiceTransitionName) {
      return __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_9_rc_animate__["a" /* default */],
        {
          className: className,
          component: 'ul',
          transitionName: choiceTransitionName,
          onLeave: this.onChoiceAnimationLeave
        },
        selectedValueNodes
      );
    }
    return __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
      'ul',
      { className: className },
      selectedValueNodes
    );
  };

  Select.prototype.renderTreeData = function renderTreeData(props) {
    var validProps = props || this.props;
    if (validProps.treeData) {
      if (props && props.treeData === this.props.treeData && this.renderedTreeData) {
        // cache and use pre data.
        this._cachetreeData = true;
        return this.renderedTreeData;
      }
      this._cachetreeData = false;
      var treeData = [].concat(validProps.treeData);
      // process treeDataSimpleMode
      if (validProps.treeDataSimpleMode) {
        var simpleFormat = {
          id: 'id',
          pId: 'pId',
          rootPId: null
        };
        if (Object.prototype.toString.call(validProps.treeDataSimpleMode) === '[object Object]') {
          simpleFormat = __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_extends___default()({}, simpleFormat, validProps.treeDataSimpleMode);
        }
        treeData = Object(__WEBPACK_IMPORTED_MODULE_10__util__["n" /* processSimpleTreeData */])(treeData, simpleFormat);
      }
      return loopTreeData(treeData, undefined, this.props.treeCheckable);
    }
  };

  Select.prototype.render = function render() {
    var _rootCls;

    var props = this.props;
    var multiple = Object(__WEBPACK_IMPORTED_MODULE_10__util__["i" /* isMultiple */])(props);
    var state = this.state;
    var className = props.className,
        disabled = props.disabled,
        allowClear = props.allowClear,
        prefixCls = props.prefixCls;

    var ctrlNode = this.renderTopControlNode();
    var extraSelectionProps = {};
    if (!multiple) {
      extraSelectionProps = {
        onKeyDown: this.onKeyDown,
        tabIndex: 0
      };
    }
    var rootCls = (_rootCls = {}, _rootCls[className] = !!className, _rootCls[prefixCls] = 1, _rootCls[prefixCls + '-open'] = state.open, _rootCls[prefixCls + '-focused'] = state.open || state.focused, _rootCls[prefixCls + '-disabled'] = disabled, _rootCls[prefixCls + '-enabled'] = !disabled, _rootCls[prefixCls + '-allow-clear'] = !!props.allowClear, _rootCls);

    var clear = __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement('span', {
      key: 'clear',
      className: prefixCls + '-selection__clear',
      onClick: this.onClearSelection
    });
    return __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
      __WEBPACK_IMPORTED_MODULE_11__SelectTrigger__["a" /* default */],
      __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_extends___default()({}, props, {
        treeNodes: props.children,
        treeData: this.renderedTreeData,
        _cachetreeData: this._cachetreeData,
        _treeNodesStates: this._treeNodesStates,
        halfCheckedValues: this.halfCheckedValues,
        multiple: multiple,
        disabled: disabled,
        visible: state.open,
        inputValue: state.inputValue,
        inputElement: this.getInputElement(),
        value: state.value,
        onDropdownVisibleChange: this.onDropdownVisibleChange,
        getPopupContainer: props.getPopupContainer,
        onSelect: this.onSelect,
        ref: Object(__WEBPACK_IMPORTED_MODULE_10__util__["o" /* saveRef */])(this, 'trigger')
      }),
      __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
        'span',
        {
          style: props.style,
          onClick: props.onClick,
          className: __WEBPACK_IMPORTED_MODULE_8_classnames___default()(rootCls),
          onBlur: props.onBlur,
          onFocus: props.onFocus
        },
        __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
          'span',
          __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_extends___default()({
            ref: Object(__WEBPACK_IMPORTED_MODULE_10__util__["o" /* saveRef */])(this, 'selection'),
            key: 'selection',
            className: prefixCls + '-selection\n            ' + prefixCls + '-selection--' + (multiple ? 'multiple' : 'single'),
            role: 'combobox',
            'aria-autocomplete': 'list',
            'aria-haspopup': 'true',
            'aria-expanded': state.open
          }, extraSelectionProps),
          ctrlNode,
          allowClear && this.state.value.length && this.state.value[0].value ? clear : null,
          multiple || !props.showArrow ? null : __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
            'span',
            {
              key: 'arrow',
              className: prefixCls + '-arrow',
              style: { outline: 'none' }
            },
            __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement('b', null)
          ),
          multiple ? this.getSearchPlaceholderElement(!!this.state.inputValue || this.state.value.length) : null
        )
      )
    );
  };

  return Select;
}(__WEBPACK_IMPORTED_MODULE_5_react__["Component"]);

Select.propTypes = __WEBPACK_IMPORTED_MODULE_14__PropTypes__["a" /* SelectPropTypes */];
Select.defaultProps = {
  prefixCls: 'rc-tree-select',
  filterTreeNode: filterFn, // [Legacy] TODO: Set false and filter not hide?
  showSearch: true,
  allowClear: false,
  placeholder: '',
  searchPlaceholder: '',
  labelInValue: false,
  onClick: noop,
  onChange: noop,
  onSelect: noop,
  onDeselect: noop,
  onSearch: noop,
  showArrow: true,
  dropdownMatchSelectWidth: true,
  dropdownStyle: {},
  onDropdownVisibleChange: function onDropdownVisibleChange() {
    return true;
  },
  notFoundContent: 'Not Found',
  showCheckedStrategy: __WEBPACK_IMPORTED_MODULE_13__strategies__["b" /* SHOW_CHILD */],
  // skipHandleInitValue: false, // Deprecated (use treeCheckStrictly)
  treeCheckStrictly: false,
  treeIcon: false,
  treeLine: false,
  treeDataSimpleMode: false,
  treeDefaultExpandAll: false,
  treeCheckable: false,
  treeNodeFilterProp: 'value',
  treeNodeLabelProp: 'title'
};

var _initialiseProps = function _initialiseProps() {
  var _this8 = this;

  this.onInputChange = function (event) {
    var val = event.target.value;
    var props = _this8.props;

    _this8.setState({
      inputValue: val,
      open: true
    }, _this8.forcePopupAlign);
    if (props.treeCheckable && !val) {
      _this8.setState({
        value: _this8.getValue(props, [].concat(_this8.state.value), false)
      });
    }
    props.onSearch(val);
  };

  this.onDropdownVisibleChange = function (open) {
    // selection inside combobox cause click
    if (!open && document.activeElement === _this8.getInputDOMNode()) {
      // return;
    }
    _this8.setOpenState(open, undefined, !open);
  };

  this.onKeyDown = function (event) {
    var props = _this8.props;
    if (props.disabled) {
      return;
    }
    var keyCode = event.keyCode;
    if (_this8.state.open && !_this8.getInputDOMNode()) {
      _this8.onInputKeyDown(event);
    } else if (keyCode === __WEBPACK_IMPORTED_MODULE_7_rc_util_es_KeyCode__["a" /* default */].ENTER || keyCode === __WEBPACK_IMPORTED_MODULE_7_rc_util_es_KeyCode__["a" /* default */].DOWN) {
      _this8.setOpenState(true);
      event.preventDefault();
    }
  };

  this.onInputKeyDown = function (event) {
    var props = _this8.props;
    if (props.disabled) {
      return;
    }
    var state = _this8.state;
    var keyCode = event.keyCode;
    if (Object(__WEBPACK_IMPORTED_MODULE_10__util__["i" /* isMultiple */])(props) && !event.target.value && keyCode === __WEBPACK_IMPORTED_MODULE_7_rc_util_es_KeyCode__["a" /* default */].BACKSPACE) {
      var value = state.value.concat();
      if (value.length) {
        var popValue = value.pop();
        _this8.removeSelected(_this8.isLabelInValue() ? popValue : popValue.value);
      }
      return;
    }
    if (keyCode === __WEBPACK_IMPORTED_MODULE_7_rc_util_es_KeyCode__["a" /* default */].DOWN) {
      if (!state.open) {
        _this8.openIfHasChildren();
        event.preventDefault();
        event.stopPropagation();
        return;
      }
    } else if (keyCode === __WEBPACK_IMPORTED_MODULE_7_rc_util_es_KeyCode__["a" /* default */].ESC) {
      if (state.open) {
        _this8.setOpenState(false);
        event.preventDefault();
        event.stopPropagation();
      }
      return;
    }
  };

  this.onSelect = function (selectedKeys, info) {
    var item = info.node;
    var value = _this8.state.value;
    var props = _this8.props;
    var selectedValue = Object(__WEBPACK_IMPORTED_MODULE_10__util__["h" /* getValuePropValue */])(item);
    var selectedLabel = _this8.getLabelFromNode(item);
    var checkableSelect = props.treeCheckable && info.event === 'select';
    var event = selectedValue;
    if (_this8.isLabelInValue()) {
      event = {
        value: event,
        label: selectedLabel
      };
    }
    if (info.selected === false) {
      _this8.onDeselect(info);
      if (!checkableSelect) return;
    }
    props.onSelect(event, item, info);

    var checkEvt = info.event === 'check';
    if (Object(__WEBPACK_IMPORTED_MODULE_10__util__["i" /* isMultiple */])(props)) {
      _this8.clearSearchInput();
      if (checkEvt) {
        value = _this8.getCheckedNodes(info, props).map(function (n) {
          return {
            value: Object(__WEBPACK_IMPORTED_MODULE_10__util__["h" /* getValuePropValue */])(n),
            label: _this8.getLabelFromNode(n)
          };
        });
      } else {
        if (value.some(function (i) {
          return i.value === selectedValue;
        })) {
          return;
        }
        value = value.concat([{
          value: selectedValue,
          label: selectedLabel
        }]);
      }
    } else {
      if (value.length && value[0].value === selectedValue) {
        _this8.setOpenState(false);
        return;
      }
      value = [{
        value: selectedValue,
        label: selectedLabel
      }];
      _this8.setOpenState(false);
    }

    var extraInfo = {
      triggerValue: selectedValue,
      triggerNode: item
    };
    if (checkEvt) {
      extraInfo.checked = info.checked;
      // if inputValue existing, tree is checkStrictly
      extraInfo.allCheckedNodes = props.treeCheckStrictly || _this8.state.inputValue ? info.checkedNodes : Object(__WEBPACK_IMPORTED_MODULE_10__util__["e" /* flatToHierarchy */])(info.checkedNodesPositions);
      _this8._checkedNodes = info.checkedNodesPositions;
      var _tree = _this8.trigger.popupEle;
      _this8._treeNodesStates = _tree.checkKeys;
    } else {
      extraInfo.selected = info.selected;
    }

    _this8.fireChange(value, extraInfo);
    if (props.inputValue === null) {
      _this8.setState({
        inputValue: ''
      });
    }
  };

  this.onDeselect = function (info) {
    _this8.removeSelected(Object(__WEBPACK_IMPORTED_MODULE_10__util__["h" /* getValuePropValue */])(info.node));
    if (!Object(__WEBPACK_IMPORTED_MODULE_10__util__["i" /* isMultiple */])(_this8.props)) {
      _this8.setOpenState(false);
    } else {
      _this8.clearSearchInput();
    }
  };

  this.onPlaceholderClick = function () {
    _this8.getInputDOMNode().focus();
  };

  this.onClearSelection = function (event) {
    var props = _this8.props;
    var state = _this8.state;
    if (props.disabled) {
      return;
    }
    event.stopPropagation();
    _this8._cacheTreeNodesStates = 'no';
    _this8._checkedNodes = [];
    if (state.inputValue || state.value.length) {
      _this8.setOpenState(false);
      if (typeof props.inputValue === 'undefined') {
        _this8.setState({
          inputValue: ''
        }, function () {
          _this8.fireChange([]);
        });
      } else {
        _this8.fireChange([]);
      }
    }
  };

  this.onChoiceAnimationLeave = function () {
    _this8.forcePopupAlign();
  };

  this.forcePopupAlign = function () {
    _this8.trigger.trigger.forcePopupAlign();
  };
};

Select.SHOW_ALL = __WEBPACK_IMPORTED_MODULE_13__strategies__["a" /* SHOW_ALL */];
Select.SHOW_PARENT = __WEBPACK_IMPORTED_MODULE_13__strategies__["c" /* SHOW_PARENT */];
Select.SHOW_CHILD = __WEBPACK_IMPORTED_MODULE_13__strategies__["b" /* SHOW_CHILD */];

/* harmony default export */ __webpack_exports__["a"] = (Select);

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(76), __esModule: true };

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(77);
__webpack_require__(87);
module.exports = __webpack_require__(38).f('iterator');


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(78)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(47)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(28);
var defined = __webpack_require__(29);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 79 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(33);
var descriptor = __webpack_require__(22);
var setToStringTag = __webpack_require__(37);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(13)(IteratorPrototype, __webpack_require__(16)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(9);
var anObject = __webpack_require__(19);
var getKeys = __webpack_require__(23);

module.exports = __webpack_require__(10) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(15);
var toLength = __webpack_require__(83);
var toAbsoluteIndex = __webpack_require__(84);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(28);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(28);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(7).document;
module.exports = document && document.documentElement;


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(11);
var toObject = __webpack_require__(55);
var IE_PROTO = __webpack_require__(34)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(88);
var global = __webpack_require__(7);
var hide = __webpack_require__(13);
var Iterators = __webpack_require__(32);
var TO_STRING_TAG = __webpack_require__(16)('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(89);
var step = __webpack_require__(90);
var Iterators = __webpack_require__(32);
var toIObject = __webpack_require__(15);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(47)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 89 */
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),
/* 90 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(92), __esModule: true };

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(93);
__webpack_require__(98);
__webpack_require__(99);
__webpack_require__(100);
module.exports = __webpack_require__(8).Symbol;


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(7);
var has = __webpack_require__(11);
var DESCRIPTORS = __webpack_require__(10);
var $export = __webpack_require__(12);
var redefine = __webpack_require__(51);
var META = __webpack_require__(94).KEY;
var $fails = __webpack_require__(20);
var shared = __webpack_require__(35);
var setToStringTag = __webpack_require__(37);
var uid = __webpack_require__(24);
var wks = __webpack_require__(16);
var wksExt = __webpack_require__(38);
var wksDefine = __webpack_require__(39);
var enumKeys = __webpack_require__(95);
var isArray = __webpack_require__(96);
var anObject = __webpack_require__(19);
var isObject = __webpack_require__(14);
var toIObject = __webpack_require__(15);
var toPrimitive = __webpack_require__(31);
var createDesc = __webpack_require__(22);
var _create = __webpack_require__(33);
var gOPNExt = __webpack_require__(97);
var $GOPD = __webpack_require__(57);
var $DP = __webpack_require__(9);
var $keys = __webpack_require__(23);
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(56).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(25).f = $propertyIsEnumerable;
  __webpack_require__(40).f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(30)) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(13)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(24)('meta');
var isObject = __webpack_require__(14);
var has = __webpack_require__(11);
var setDesc = __webpack_require__(9).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(20)(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(23);
var gOPS = __webpack_require__(40);
var pIE = __webpack_require__(25);
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(54);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(15);
var gOPN = __webpack_require__(56).f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 98 */
/***/ (function(module, exports) {



/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(39)('asyncIterator');


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(39)('observable');


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(102), __esModule: true };

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(103);
module.exports = __webpack_require__(8).Object.setPrototypeOf;


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(12);
$export($export.S, 'Object', { setPrototypeOf: __webpack_require__(104).set });


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(14);
var anObject = __webpack_require__(19);
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__(48)(Function.call, __webpack_require__(57).f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(106), __esModule: true };

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(107);
var $Object = __webpack_require__(8).Object;
module.exports = function create(P, D) {
  return $Object.create(P, D);
};


/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(12);
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: __webpack_require__(33) });


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(109), __esModule: true };

/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(110);
module.exports = __webpack_require__(8).Object.assign;


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(12);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(111) });


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(23);
var gOPS = __webpack_require__(40);
var pIE = __webpack_require__(25);
var toObject = __webpack_require__(55);
var IObject = __webpack_require__(53);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(20)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),
/* 112 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * @ignore
 * some key-codes definition and utils from closure-library
 * @author yiminghe@gmail.com
 */

var KeyCode = {
  /**
   * MAC_ENTER
   */
  MAC_ENTER: 3,
  /**
   * BACKSPACE
   */
  BACKSPACE: 8,
  /**
   * TAB
   */
  TAB: 9,
  /**
   * NUMLOCK on FF/Safari Mac
   */
  NUM_CENTER: 12, // NUMLOCK on FF/Safari Mac
  /**
   * ENTER
   */
  ENTER: 13,
  /**
   * SHIFT
   */
  SHIFT: 16,
  /**
   * CTRL
   */
  CTRL: 17,
  /**
   * ALT
   */
  ALT: 18,
  /**
   * PAUSE
   */
  PAUSE: 19,
  /**
   * CAPS_LOCK
   */
  CAPS_LOCK: 20,
  /**
   * ESC
   */
  ESC: 27,
  /**
   * SPACE
   */
  SPACE: 32,
  /**
   * PAGE_UP
   */
  PAGE_UP: 33, // also NUM_NORTH_EAST
  /**
   * PAGE_DOWN
   */
  PAGE_DOWN: 34, // also NUM_SOUTH_EAST
  /**
   * END
   */
  END: 35, // also NUM_SOUTH_WEST
  /**
   * HOME
   */
  HOME: 36, // also NUM_NORTH_WEST
  /**
   * LEFT
   */
  LEFT: 37, // also NUM_WEST
  /**
   * UP
   */
  UP: 38, // also NUM_NORTH
  /**
   * RIGHT
   */
  RIGHT: 39, // also NUM_EAST
  /**
   * DOWN
   */
  DOWN: 40, // also NUM_SOUTH
  /**
   * PRINT_SCREEN
   */
  PRINT_SCREEN: 44,
  /**
   * INSERT
   */
  INSERT: 45, // also NUM_INSERT
  /**
   * DELETE
   */
  DELETE: 46, // also NUM_DELETE
  /**
   * ZERO
   */
  ZERO: 48,
  /**
   * ONE
   */
  ONE: 49,
  /**
   * TWO
   */
  TWO: 50,
  /**
   * THREE
   */
  THREE: 51,
  /**
   * FOUR
   */
  FOUR: 52,
  /**
   * FIVE
   */
  FIVE: 53,
  /**
   * SIX
   */
  SIX: 54,
  /**
   * SEVEN
   */
  SEVEN: 55,
  /**
   * EIGHT
   */
  EIGHT: 56,
  /**
   * NINE
   */
  NINE: 57,
  /**
   * QUESTION_MARK
   */
  QUESTION_MARK: 63, // needs localization
  /**
   * A
   */
  A: 65,
  /**
   * B
   */
  B: 66,
  /**
   * C
   */
  C: 67,
  /**
   * D
   */
  D: 68,
  /**
   * E
   */
  E: 69,
  /**
   * F
   */
  F: 70,
  /**
   * G
   */
  G: 71,
  /**
   * H
   */
  H: 72,
  /**
   * I
   */
  I: 73,
  /**
   * J
   */
  J: 74,
  /**
   * K
   */
  K: 75,
  /**
   * L
   */
  L: 76,
  /**
   * M
   */
  M: 77,
  /**
   * N
   */
  N: 78,
  /**
   * O
   */
  O: 79,
  /**
   * P
   */
  P: 80,
  /**
   * Q
   */
  Q: 81,
  /**
   * R
   */
  R: 82,
  /**
   * S
   */
  S: 83,
  /**
   * T
   */
  T: 84,
  /**
   * U
   */
  U: 85,
  /**
   * V
   */
  V: 86,
  /**
   * W
   */
  W: 87,
  /**
   * X
   */
  X: 88,
  /**
   * Y
   */
  Y: 89,
  /**
   * Z
   */
  Z: 90,
  /**
   * META
   */
  META: 91, // WIN_KEY_LEFT
  /**
   * WIN_KEY_RIGHT
   */
  WIN_KEY_RIGHT: 92,
  /**
   * CONTEXT_MENU
   */
  CONTEXT_MENU: 93,
  /**
   * NUM_ZERO
   */
  NUM_ZERO: 96,
  /**
   * NUM_ONE
   */
  NUM_ONE: 97,
  /**
   * NUM_TWO
   */
  NUM_TWO: 98,
  /**
   * NUM_THREE
   */
  NUM_THREE: 99,
  /**
   * NUM_FOUR
   */
  NUM_FOUR: 100,
  /**
   * NUM_FIVE
   */
  NUM_FIVE: 101,
  /**
   * NUM_SIX
   */
  NUM_SIX: 102,
  /**
   * NUM_SEVEN
   */
  NUM_SEVEN: 103,
  /**
   * NUM_EIGHT
   */
  NUM_EIGHT: 104,
  /**
   * NUM_NINE
   */
  NUM_NINE: 105,
  /**
   * NUM_MULTIPLY
   */
  NUM_MULTIPLY: 106,
  /**
   * NUM_PLUS
   */
  NUM_PLUS: 107,
  /**
   * NUM_MINUS
   */
  NUM_MINUS: 109,
  /**
   * NUM_PERIOD
   */
  NUM_PERIOD: 110,
  /**
   * NUM_DIVISION
   */
  NUM_DIVISION: 111,
  /**
   * F1
   */
  F1: 112,
  /**
   * F2
   */
  F2: 113,
  /**
   * F3
   */
  F3: 114,
  /**
   * F4
   */
  F4: 115,
  /**
   * F5
   */
  F5: 116,
  /**
   * F6
   */
  F6: 117,
  /**
   * F7
   */
  F7: 118,
  /**
   * F8
   */
  F8: 119,
  /**
   * F9
   */
  F9: 120,
  /**
   * F10
   */
  F10: 121,
  /**
   * F11
   */
  F11: 122,
  /**
   * F12
   */
  F12: 123,
  /**
   * NUMLOCK
   */
  NUMLOCK: 144,
  /**
   * SEMICOLON
   */
  SEMICOLON: 186, // needs localization
  /**
   * DASH
   */
  DASH: 189, // needs localization
  /**
   * EQUALS
   */
  EQUALS: 187, // needs localization
  /**
   * COMMA
   */
  COMMA: 188, // needs localization
  /**
   * PERIOD
   */
  PERIOD: 190, // needs localization
  /**
   * SLASH
   */
  SLASH: 191, // needs localization
  /**
   * APOSTROPHE
   */
  APOSTROPHE: 192, // needs localization
  /**
   * SINGLE_QUOTE
   */
  SINGLE_QUOTE: 222, // needs localization
  /**
   * OPEN_SQUARE_BRACKET
   */
  OPEN_SQUARE_BRACKET: 219, // needs localization
  /**
   * BACKSLASH
   */
  BACKSLASH: 220, // needs localization
  /**
   * CLOSE_SQUARE_BRACKET
   */
  CLOSE_SQUARE_BRACKET: 221, // needs localization
  /**
   * WIN_KEY
   */
  WIN_KEY: 224,
  /**
   * MAC_FF_META
   */
  MAC_FF_META: 224, // Firefox (Gecko) fires this for the meta key instead of 91
  /**
   * WIN_IME
   */
  WIN_IME: 229
};

/*
 whether text and modified key is entered at the same time.
 */
KeyCode.isTextModifyingKeyEvent = function isTextModifyingKeyEvent(e) {
  var keyCode = e.keyCode;
  if (e.altKey && !e.ctrlKey || e.metaKey ||
  // Function keys don't generate text
  keyCode >= KeyCode.F1 && keyCode <= KeyCode.F12) {
    return false;
  }

  // The following keys are quite harmless, even in combination with
  // CTRL, ALT or SHIFT.
  switch (keyCode) {
    case KeyCode.ALT:
    case KeyCode.CAPS_LOCK:
    case KeyCode.CONTEXT_MENU:
    case KeyCode.CTRL:
    case KeyCode.DOWN:
    case KeyCode.END:
    case KeyCode.ESC:
    case KeyCode.HOME:
    case KeyCode.INSERT:
    case KeyCode.LEFT:
    case KeyCode.MAC_FF_META:
    case KeyCode.META:
    case KeyCode.NUMLOCK:
    case KeyCode.NUM_CENTER:
    case KeyCode.PAGE_DOWN:
    case KeyCode.PAGE_UP:
    case KeyCode.PAUSE:
    case KeyCode.PRINT_SCREEN:
    case KeyCode.RIGHT:
    case KeyCode.SHIFT:
    case KeyCode.UP:
    case KeyCode.WIN_KEY:
    case KeyCode.WIN_KEY_RIGHT:
      return false;
    default:
      return true;
  }
};

/*
 whether character is entered.
 */
KeyCode.isCharacterKey = function isCharacterKey(keyCode) {
  if (keyCode >= KeyCode.ZERO && keyCode <= KeyCode.NINE) {
    return true;
  }

  if (keyCode >= KeyCode.NUM_ZERO && keyCode <= KeyCode.NUM_MULTIPLY) {
    return true;
  }

  if (keyCode >= KeyCode.A && keyCode <= KeyCode.Z) {
    return true;
  }

  // Safari sends zero key code for non-latin characters.
  if (window.navigation.userAgent.indexOf('WebKit') !== -1 && keyCode === 0) {
    return true;
  }

  switch (keyCode) {
    case KeyCode.SPACE:
    case KeyCode.QUESTION_MARK:
    case KeyCode.NUM_PLUS:
    case KeyCode.NUM_MINUS:
    case KeyCode.NUM_PERIOD:
    case KeyCode.NUM_DIVISION:
    case KeyCode.SEMICOLON:
    case KeyCode.DASH:
    case KeyCode.EQUALS:
    case KeyCode.COMMA:
    case KeyCode.PERIOD:
    case KeyCode.SLASH:
    case KeyCode.APOSTROPHE:
    case KeyCode.SINGLE_QUOTE:
    case KeyCode.OPEN_SQUARE_BRACKET:
    case KeyCode.BACKSLASH:
    case KeyCode.CLOSE_SQUARE_BRACKET:
      return true;
    default:
      return false;
  }
};

/* harmony default export */ __webpack_exports__["a"] = (KeyCode);

/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(58);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (obj, key, value) {
  if (key in obj) {
    (0, _defineProperty2.default)(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(115);
var $Object = __webpack_require__(8).Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(12);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(10), 'Object', { defineProperty: __webpack_require__(9).f });


/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var emptyFunction = __webpack_require__(43);
var invariant = __webpack_require__(44);
var warning = __webpack_require__(59);
var assign = __webpack_require__(60);

var ReactPropTypesSecret = __webpack_require__(45);
var checkPropTypes = __webpack_require__(117);

module.exports = function(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker,
    exact: createStrictShapeTypeChecker,
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message) {
    this.message = message;
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (process.env.NODE_ENV !== 'production') {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          invariant(
            false,
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
        } else if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            warning(
              false,
              'You are manually calling a React.PropTypes validation ' +
              'function for the `%s` prop on `%s`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.',
              propFullName,
              componentName
            );
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunction.thatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOf, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues);
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (propValue.hasOwnProperty(key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        warning(
          false,
          'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
          'received %s at index %s.',
          getPostfixForTypeWarning(checker),
          i
        );
        return emptyFunction.thatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
          return null;
        }
      }

      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createStrictShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      // We need to check all keys in case some are required but missing from
      // props.
      var allKeys = assign({}, props[propName], shapeTypes);
      for (var key in allKeys) {
        var checker = shapeTypes[key];
        if (!checker) {
          return new PropTypeError(
            'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
            '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
            '\nValid keys: ' +  JSON.stringify(Object.keys(shapeTypes), null, '  ')
          );
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(17)))

/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



if (process.env.NODE_ENV !== 'production') {
  var invariant = __webpack_require__(44);
  var warning = __webpack_require__(59);
  var ReactPropTypesSecret = __webpack_require__(45);
  var loggedTypeFailures = {};
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (process.env.NODE_ENV !== 'production') {
    for (var typeSpecName in typeSpecs) {
      if (typeSpecs.hasOwnProperty(typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          invariant(typeof typeSpecs[typeSpecName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'the `prop-types` package, but received `%s`.', componentName || 'React class', location, typeSpecName, typeof typeSpecs[typeSpecName]);
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error);
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          warning(false, 'Failed %s type: %s%s', location, error.message, stack != null ? stack : '');
        }
      }
    }
  }
}

module.exports = checkPropTypes;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(17)))

/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var emptyFunction = __webpack_require__(43);
var invariant = __webpack_require__(44);
var ReactPropTypesSecret = __webpack_require__(45);

module.exports = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }
    invariant(
      false,
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
  };
  shim.isRequired = shim;
  function getShim() {
    return shim;
  };
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim
  };

  ReactPropTypes.checkPropTypes = emptyFunction;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),
/* 119 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["e"] = toArrayChildren;
/* harmony export (immutable) */ __webpack_exports__["a"] = findChildInChildrenByKey;
/* harmony export (immutable) */ __webpack_exports__["b"] = findShownChildInChildrenByKey;
/* unused harmony export findHiddenChildInChildrenByKey */
/* harmony export (immutable) */ __webpack_exports__["c"] = isSameChildren;
/* harmony export (immutable) */ __webpack_exports__["d"] = mergeChildren;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function toArrayChildren(children) {
  var ret = [];
  __WEBPACK_IMPORTED_MODULE_0_react___default.a.Children.forEach(children, function (child) {
    ret.push(child);
  });
  return ret;
}

function findChildInChildrenByKey(children, key) {
  var ret = null;
  if (children) {
    children.forEach(function (child) {
      if (ret) {
        return;
      }
      if (child && child.key === key) {
        ret = child;
      }
    });
  }
  return ret;
}

function findShownChildInChildrenByKey(children, key, showProp) {
  var ret = null;
  if (children) {
    children.forEach(function (child) {
      if (child && child.key === key && child.props[showProp]) {
        if (ret) {
          throw new Error('two child with same key for <rc-animate> children');
        }
        ret = child;
      }
    });
  }
  return ret;
}

function findHiddenChildInChildrenByKey(children, key, showProp) {
  var found = 0;
  if (children) {
    children.forEach(function (child) {
      if (found) {
        return;
      }
      found = child && child.key === key && !child.props[showProp];
    });
  }
  return found;
}

function isSameChildren(c1, c2, showProp) {
  var same = c1.length === c2.length;
  if (same) {
    c1.forEach(function (child, index) {
      var child2 = c2[index];
      if (child && child2) {
        if (child && !child2 || !child && child2) {
          same = false;
        } else if (child.key !== child2.key) {
          same = false;
        } else if (showProp && child.props[showProp] !== child2.props[showProp]) {
          same = false;
        }
      }
    });
  }
  return same;
}

function mergeChildren(prev, next) {
  var ret = [];

  // For each key of `next`, the list of keys to insert before that key in
  // the combined list
  var nextChildrenPending = {};
  var pendingChildren = [];
  prev.forEach(function (child) {
    if (child && findChildInChildrenByKey(next, child.key)) {
      if (pendingChildren.length) {
        nextChildrenPending[child.key] = pendingChildren;
        pendingChildren = [];
      }
    } else {
      pendingChildren.push(child);
    }
  });

  next.forEach(function (child) {
    if (child && nextChildrenPending.hasOwnProperty(child.key)) {
      ret = ret.concat(nextChildrenPending[child.key]);
    }
    ret.push(child);
  });

  ret = ret.concat(pendingChildren);

  return ret;
}

/***/ }),
/* 120 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react_dom__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_prop_types__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_css_animation__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__util__ = __webpack_require__(62);











var transitionMap = {
  enter: 'transitionEnter',
  appear: 'transitionAppear',
  leave: 'transitionLeave'
};

var AnimateChild = function (_React$Component) {
  __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default()(AnimateChild, _React$Component);

  function AnimateChild() {
    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, AnimateChild);

    return __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default()(this, (AnimateChild.__proto__ || Object.getPrototypeOf(AnimateChild)).apply(this, arguments));
  }

  __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(AnimateChild, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.stop();
    }
  }, {
    key: 'componentWillEnter',
    value: function componentWillEnter(done) {
      if (__WEBPACK_IMPORTED_MODULE_9__util__["a" /* default */].isEnterSupported(this.props)) {
        this.transition('enter', done);
      } else {
        done();
      }
    }
  }, {
    key: 'componentWillAppear',
    value: function componentWillAppear(done) {
      if (__WEBPACK_IMPORTED_MODULE_9__util__["a" /* default */].isAppearSupported(this.props)) {
        this.transition('appear', done);
      } else {
        done();
      }
    }
  }, {
    key: 'componentWillLeave',
    value: function componentWillLeave(done) {
      if (__WEBPACK_IMPORTED_MODULE_9__util__["a" /* default */].isLeaveSupported(this.props)) {
        this.transition('leave', done);
      } else {
        // always sync, do not interupt with react component life cycle
        // update hidden -> animate hidden ->
        // didUpdate -> animate leave -> unmount (if animate is none)
        done();
      }
    }
  }, {
    key: 'transition',
    value: function transition(animationType, finishCallback) {
      var _this2 = this;

      var node = __WEBPACK_IMPORTED_MODULE_6_react_dom___default.a.findDOMNode(this);
      var props = this.props;
      var transitionName = props.transitionName;
      var nameIsObj = (typeof transitionName === 'undefined' ? 'undefined' : __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof___default()(transitionName)) === 'object';
      this.stop();
      var end = function end() {
        _this2.stopper = null;
        finishCallback();
      };
      if ((__WEBPACK_IMPORTED_MODULE_8_css_animation__["b" /* isCssAnimationSupported */] || !props.animation[animationType]) && transitionName && props[transitionMap[animationType]]) {
        var name = nameIsObj ? transitionName[animationType] : transitionName + '-' + animationType;
        var activeName = name + '-active';
        if (nameIsObj && transitionName[animationType + 'Active']) {
          activeName = transitionName[animationType + 'Active'];
        }
        this.stopper = Object(__WEBPACK_IMPORTED_MODULE_8_css_animation__["a" /* default */])(node, {
          name: name,
          active: activeName
        }, end);
      } else {
        this.stopper = props.animation[animationType](node, end);
      }
    }
  }, {
    key: 'stop',
    value: function stop() {
      var stopper = this.stopper;
      if (stopper) {
        this.stopper = null;
        stopper.stop();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return this.props.children;
    }
  }]);

  return AnimateChild;
}(__WEBPACK_IMPORTED_MODULE_5_react___default.a.Component);

AnimateChild.propTypes = {
  children: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.any
};
/* harmony default export */ __webpack_exports__["a"] = (AnimateChild);

/***/ }),
/* 121 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return isCssAnimationSupported; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Event__ = __webpack_require__(122);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_component_classes__ = __webpack_require__(123);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_component_classes___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_component_classes__);




var isCssAnimationSupported = __WEBPACK_IMPORTED_MODULE_1__Event__["a" /* default */].endEvents.length !== 0;
var capitalPrefixes = ['Webkit', 'Moz', 'O',
// ms is special .... !
'ms'];
var prefixes = ['-webkit-', '-moz-', '-o-', 'ms-', ''];

function getStyleProperty(node, name) {
  // old ff need null, https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle
  var style = window.getComputedStyle(node, null);
  var ret = '';
  for (var i = 0; i < prefixes.length; i++) {
    ret = style.getPropertyValue(prefixes[i] + name);
    if (ret) {
      break;
    }
  }
  return ret;
}

function fixBrowserByTimeout(node) {
  if (isCssAnimationSupported) {
    var transitionDelay = parseFloat(getStyleProperty(node, 'transition-delay')) || 0;
    var transitionDuration = parseFloat(getStyleProperty(node, 'transition-duration')) || 0;
    var animationDelay = parseFloat(getStyleProperty(node, 'animation-delay')) || 0;
    var animationDuration = parseFloat(getStyleProperty(node, 'animation-duration')) || 0;
    var time = Math.max(transitionDuration + transitionDelay, animationDuration + animationDelay);
    // sometimes, browser bug
    node.rcEndAnimTimeout = setTimeout(function () {
      node.rcEndAnimTimeout = null;
      if (node.rcEndListener) {
        node.rcEndListener();
      }
    }, time * 1000 + 200);
  }
}

function clearBrowserBugTimeout(node) {
  if (node.rcEndAnimTimeout) {
    clearTimeout(node.rcEndAnimTimeout);
    node.rcEndAnimTimeout = null;
  }
}

var cssAnimation = function cssAnimation(node, transitionName, endCallback) {
  var nameIsObj = (typeof transitionName === 'undefined' ? 'undefined' : __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof___default()(transitionName)) === 'object';
  var className = nameIsObj ? transitionName.name : transitionName;
  var activeClassName = nameIsObj ? transitionName.active : transitionName + '-active';
  var end = endCallback;
  var start = void 0;
  var active = void 0;
  var nodeClasses = __WEBPACK_IMPORTED_MODULE_2_component_classes___default()(node);

  if (endCallback && Object.prototype.toString.call(endCallback) === '[object Object]') {
    end = endCallback.end;
    start = endCallback.start;
    active = endCallback.active;
  }

  if (node.rcEndListener) {
    node.rcEndListener();
  }

  node.rcEndListener = function (e) {
    if (e && e.target !== node) {
      return;
    }

    if (node.rcAnimTimeout) {
      clearTimeout(node.rcAnimTimeout);
      node.rcAnimTimeout = null;
    }

    clearBrowserBugTimeout(node);

    nodeClasses.remove(className);
    nodeClasses.remove(activeClassName);

    __WEBPACK_IMPORTED_MODULE_1__Event__["a" /* default */].removeEndEventListener(node, node.rcEndListener);
    node.rcEndListener = null;

    // Usually this optional end is used for informing an owner of
    // a leave animation and telling it to remove the child.
    if (end) {
      end();
    }
  };

  __WEBPACK_IMPORTED_MODULE_1__Event__["a" /* default */].addEndEventListener(node, node.rcEndListener);

  if (start) {
    start();
  }
  nodeClasses.add(className);

  node.rcAnimTimeout = setTimeout(function () {
    node.rcAnimTimeout = null;
    nodeClasses.add(activeClassName);
    if (active) {
      setTimeout(active, 0);
    }
    fixBrowserByTimeout(node);
    // 30ms for firefox
  }, 30);

  return {
    stop: function stop() {
      if (node.rcEndListener) {
        node.rcEndListener();
      }
    }
  };
};

cssAnimation.style = function (node, style, callback) {
  if (node.rcEndListener) {
    node.rcEndListener();
  }

  node.rcEndListener = function (e) {
    if (e && e.target !== node) {
      return;
    }

    if (node.rcAnimTimeout) {
      clearTimeout(node.rcAnimTimeout);
      node.rcAnimTimeout = null;
    }

    clearBrowserBugTimeout(node);

    __WEBPACK_IMPORTED_MODULE_1__Event__["a" /* default */].removeEndEventListener(node, node.rcEndListener);
    node.rcEndListener = null;

    // Usually this optional callback is used for informing an owner of
    // a leave animation and telling it to remove the child.
    if (callback) {
      callback();
    }
  };

  __WEBPACK_IMPORTED_MODULE_1__Event__["a" /* default */].addEndEventListener(node, node.rcEndListener);

  node.rcAnimTimeout = setTimeout(function () {
    for (var s in style) {
      if (style.hasOwnProperty(s)) {
        node.style[s] = style[s];
      }
    }
    node.rcAnimTimeout = null;
    fixBrowserByTimeout(node);
  }, 0);
};

cssAnimation.setTransition = function (node, p, value) {
  var property = p;
  var v = value;
  if (value === undefined) {
    v = property;
    property = '';
  }
  property = property || '';
  capitalPrefixes.forEach(function (prefix) {
    node.style[prefix + 'Transition' + property] = v;
  });
};

cssAnimation.isCssAnimationSupported = isCssAnimationSupported;



/* harmony default export */ __webpack_exports__["a"] = (cssAnimation);

/***/ }),
/* 122 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var EVENT_NAME_MAP = {
  transitionend: {
    transition: 'transitionend',
    WebkitTransition: 'webkitTransitionEnd',
    MozTransition: 'mozTransitionEnd',
    OTransition: 'oTransitionEnd',
    msTransition: 'MSTransitionEnd'
  },

  animationend: {
    animation: 'animationend',
    WebkitAnimation: 'webkitAnimationEnd',
    MozAnimation: 'mozAnimationEnd',
    OAnimation: 'oAnimationEnd',
    msAnimation: 'MSAnimationEnd'
  }
};

var endEvents = [];

function detectEvents() {
  var testEl = document.createElement('div');
  var style = testEl.style;

  if (!('AnimationEvent' in window)) {
    delete EVENT_NAME_MAP.animationend.animation;
  }

  if (!('TransitionEvent' in window)) {
    delete EVENT_NAME_MAP.transitionend.transition;
  }

  for (var baseEventName in EVENT_NAME_MAP) {
    if (EVENT_NAME_MAP.hasOwnProperty(baseEventName)) {
      var baseEvents = EVENT_NAME_MAP[baseEventName];
      for (var styleName in baseEvents) {
        if (styleName in style) {
          endEvents.push(baseEvents[styleName]);
          break;
        }
      }
    }
  }
}

if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  detectEvents();
}

function addEventListener(node, eventName, eventListener) {
  node.addEventListener(eventName, eventListener, false);
}

function removeEventListener(node, eventName, eventListener) {
  node.removeEventListener(eventName, eventListener, false);
}

var TransitionEvents = {
  addEndEventListener: function addEndEventListener(node, eventListener) {
    if (endEvents.length === 0) {
      window.setTimeout(eventListener, 0);
      return;
    }
    endEvents.forEach(function (endEvent) {
      addEventListener(node, endEvent, eventListener);
    });
  },


  endEvents: endEvents,

  removeEndEventListener: function removeEndEventListener(node, eventListener) {
    if (endEvents.length === 0) {
      return;
    }
    endEvents.forEach(function (endEvent) {
      removeEventListener(node, endEvent, eventListener);
    });
  }
};

/* harmony default export */ __webpack_exports__["a"] = (TransitionEvents);

/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Module dependencies.
 */

try {
  var index = __webpack_require__(61);
} catch (err) {
  var index = __webpack_require__(61);
}

/**
 * Whitespace regexp.
 */

var re = /\s+/;

/**
 * toString reference.
 */

var toString = Object.prototype.toString;

/**
 * Wrap `el` in a `ClassList`.
 *
 * @param {Element} el
 * @return {ClassList}
 * @api public
 */

module.exports = function(el){
  return new ClassList(el);
};

/**
 * Initialize a new ClassList for `el`.
 *
 * @param {Element} el
 * @api private
 */

function ClassList(el) {
  if (!el || !el.nodeType) {
    throw new Error('A DOM element reference is required');
  }
  this.el = el;
  this.list = el.classList;
}

/**
 * Add class `name` if not already present.
 *
 * @param {String} name
 * @return {ClassList}
 * @api public
 */

ClassList.prototype.add = function(name){
  // classList
  if (this.list) {
    this.list.add(name);
    return this;
  }

  // fallback
  var arr = this.array();
  var i = index(arr, name);
  if (!~i) arr.push(name);
  this.el.className = arr.join(' ');
  return this;
};

/**
 * Remove class `name` when present, or
 * pass a regular expression to remove
 * any which match.
 *
 * @param {String|RegExp} name
 * @return {ClassList}
 * @api public
 */

ClassList.prototype.remove = function(name){
  if ('[object RegExp]' == toString.call(name)) {
    return this.removeMatching(name);
  }

  // classList
  if (this.list) {
    this.list.remove(name);
    return this;
  }

  // fallback
  var arr = this.array();
  var i = index(arr, name);
  if (~i) arr.splice(i, 1);
  this.el.className = arr.join(' ');
  return this;
};

/**
 * Remove all classes matching `re`.
 *
 * @param {RegExp} re
 * @return {ClassList}
 * @api private
 */

ClassList.prototype.removeMatching = function(re){
  var arr = this.array();
  for (var i = 0; i < arr.length; i++) {
    if (re.test(arr[i])) {
      this.remove(arr[i]);
    }
  }
  return this;
};

/**
 * Toggle class `name`, can force state via `force`.
 *
 * For browsers that support classList, but do not support `force` yet,
 * the mistake will be detected and corrected.
 *
 * @param {String} name
 * @param {Boolean} force
 * @return {ClassList}
 * @api public
 */

ClassList.prototype.toggle = function(name, force){
  // classList
  if (this.list) {
    if ("undefined" !== typeof force) {
      if (force !== this.list.toggle(name, force)) {
        this.list.toggle(name); // toggle again to correct
      }
    } else {
      this.list.toggle(name);
    }
    return this;
  }

  // fallback
  if ("undefined" !== typeof force) {
    if (!force) {
      this.remove(name);
    } else {
      this.add(name);
    }
  } else {
    if (this.has(name)) {
      this.remove(name);
    } else {
      this.add(name);
    }
  }

  return this;
};

/**
 * Return an array of classes.
 *
 * @return {Array}
 * @api public
 */

ClassList.prototype.array = function(){
  var className = this.el.getAttribute('class') || '';
  var str = className.replace(/^\s+|\s+$/g, '');
  var arr = str.split(re);
  if ('' === arr[0]) arr.shift();
  return arr;
};

/**
 * Check if class `name` is present.
 *
 * @param {String} name
 * @return {ClassList}
 * @api public
 */

ClassList.prototype.has =
ClassList.prototype.contains = function(name){
  return this.list
    ? this.list.contains(name)
    : !! ~index(this.array(), name);
};


/***/ }),
/* 124 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_prop_types__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react_dom__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_classnames__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rc_trigger__ = __webpack_require__(125);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rc_tree__ = __webpack_require__(146);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__util__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_rc_util_es_Children_toArray__ = __webpack_require__(69);













var BUILT_IN_PLACEMENTS = {
  bottomLeft: {
    points: ['tl', 'bl'],
    offset: [0, 4],
    overflow: {
      adjustX: 0,
      adjustY: 1
    }
  },
  topLeft: {
    points: ['bl', 'tl'],
    offset: [0, -4],
    overflow: {
      adjustX: 0,
      adjustY: 1
    }
  }
};

var SelectTrigger = function (_Component) {
  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default()(SelectTrigger, _Component);

  function SelectTrigger() {
    var _temp, _this, _ret;

    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, SelectTrigger);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default()(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
      _expandedKeys: [],
      fireOnExpand: false,
      dropdownWidth: null
    }, _this.onExpand = function (expandedKeys) {
      // rerender
      _this.setState({
        _expandedKeys: expandedKeys,
        fireOnExpand: true
      }, function () {
        // Fix https://github.com/ant-design/ant-design/issues/5689
        if (_this.trigger && _this.trigger.forcePopupAlign) {
          _this.trigger.forcePopupAlign();
        }
      });
    }, _this.highlightTreeNode = function (treeNode) {
      var props = _this.props;
      var filterVal = treeNode.props[Object(__WEBPACK_IMPORTED_MODULE_10__util__["k" /* labelCompatible */])(props.treeNodeFilterProp)];
      if (typeof filterVal === 'string') {
        return props.inputValue && filterVal.indexOf(props.inputValue) > -1;
      }
      return false;
    }, _this.filterTreeNode = function (input, child) {
      if (!input) {
        return true;
      }
      var filterTreeNode = _this.props.filterTreeNode;
      if (!filterTreeNode) {
        return true;
      }
      if (child.props.disabled) {
        return false;
      }
      return filterTreeNode.call(_this, input, child);
    }, _temp), __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default()(_this, _ret);
  }

  SelectTrigger.prototype.componentDidMount = function componentDidMount() {
    this.setDropdownWidth();
  };

  SelectTrigger.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (nextProps.inputValue && nextProps.inputValue !== this.props.inputValue) {
      // set autoExpandParent to true
      this.setState({
        _expandedKeys: [],
        fireOnExpand: false
      });
    }
  };

  SelectTrigger.prototype.componentDidUpdate = function componentDidUpdate() {
    this.setDropdownWidth();
  };

  SelectTrigger.prototype.setDropdownWidth = function setDropdownWidth() {
    var width = __WEBPACK_IMPORTED_MODULE_6_react_dom___default.a.findDOMNode(this).offsetWidth;
    if (width !== this.state.dropdownWidth) {
      this.setState({ dropdownWidth: width });
    }
  };

  SelectTrigger.prototype.getPopupEleRefs = function getPopupEleRefs() {
    return this.popupEle;
  };

  SelectTrigger.prototype.getPopupDOMNode = function getPopupDOMNode() {
    return this.trigger.getPopupDomNode();
  };

  SelectTrigger.prototype.getDropdownTransitionName = function getDropdownTransitionName() {
    var props = this.props;
    var transitionName = props.transitionName;
    if (!transitionName && props.animation) {
      transitionName = this.getDropdownPrefixCls() + '-' + props.animation;
    }
    return transitionName;
  };

  SelectTrigger.prototype.getDropdownPrefixCls = function getDropdownPrefixCls() {
    return this.props.prefixCls + '-dropdown';
  };

  SelectTrigger.prototype.processTreeNode = function processTreeNode(treeNodes) {
    var _this2 = this;

    var filterPoss = [];
    this._expandedKeys = [];
    Object(__WEBPACK_IMPORTED_MODULE_10__util__["l" /* loopAllChildren */])(treeNodes, function (child, index, pos) {
      if (_this2.filterTreeNode(_this2.props.inputValue, child)) {
        filterPoss.push(pos);
        _this2._expandedKeys.push(child.key);
      }
    });

    // Include the filtered nodes's ancestral nodes.
    var processedPoss = [];
    filterPoss.forEach(function (pos) {
      var arr = pos.split('-');
      arr.reduce(function (pre, cur) {
        var res = pre + '-' + cur;
        if (processedPoss.indexOf(res) < 0) {
          processedPoss.push(res);
        }
        return res;
      });
    });
    var filterNodesPositions = [];
    Object(__WEBPACK_IMPORTED_MODULE_10__util__["l" /* loopAllChildren */])(treeNodes, function (child, index, pos) {
      if (processedPoss.indexOf(pos) > -1) {
        filterNodesPositions.push({ node: child, pos: pos });
      }
    });

    var hierarchyNodes = Object(__WEBPACK_IMPORTED_MODULE_10__util__["e" /* flatToHierarchy */])(filterNodesPositions);

    var recursive = function recursive(children) {
      return children.map(function (child) {
        if (child.children) {
          return __WEBPACK_IMPORTED_MODULE_4_react___default.a.cloneElement(child.node, {}, recursive(child.children));
        }
        return child.node;
      });
    };
    return recursive(hierarchyNodes);
  };

  SelectTrigger.prototype.renderTree = function renderTree(keys, halfCheckedKeys, newTreeNodes, multiple) {
    var props = this.props;

    var trProps = {
      multiple: multiple,
      prefixCls: props.prefixCls + '-tree',
      showIcon: props.treeIcon,
      showLine: props.treeLine,
      defaultExpandAll: props.treeDefaultExpandAll,
      defaultExpandedKeys: props.treeDefaultExpandedKeys,
      filterTreeNode: this.highlightTreeNode
    };

    if (props.treeCheckable) {
      trProps.selectable = false;
      trProps.checkable = props.treeCheckable;
      trProps.onCheck = props.onSelect;
      trProps.checkStrictly = props.treeCheckStrictly;
      if (props.inputValue) {
        // enable checkStrictly when search tree.
        trProps.checkStrictly = true;
      } else {
        trProps._treeNodesStates = props._treeNodesStates;
      }
      if (trProps.treeCheckStrictly && halfCheckedKeys.length) {
        trProps.checkedKeys = { checked: keys, halfChecked: halfCheckedKeys };
      } else {
        trProps.checkedKeys = keys;
      }
    } else {
      trProps.selectedKeys = keys;
      trProps.onSelect = props.onSelect;
    }

    // expand keys
    if (!trProps.defaultExpandAll && !trProps.defaultExpandedKeys && !props.loadData) {
      trProps.expandedKeys = keys;
    }
    trProps.autoExpandParent = true;
    trProps.onExpand = this.onExpand;
    if (this._expandedKeys && this._expandedKeys.length) {
      trProps.expandedKeys = this._expandedKeys;
    }
    if (this.state.fireOnExpand) {
      trProps.expandedKeys = this.state._expandedKeys;
      trProps.autoExpandParent = false;
    }

    // async loadData
    if (props.loadData) {
      trProps.loadData = props.loadData;
    }

    return __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
      __WEBPACK_IMPORTED_MODULE_9_rc_tree__["b" /* default */],
      __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({ ref: Object(__WEBPACK_IMPORTED_MODULE_10__util__["o" /* saveRef */])(this, 'popupEle') }, trProps),
      newTreeNodes
    );
  };

  SelectTrigger.prototype.render = function render() {
    var _popupClassName;

    var props = this.props;
    var multiple = props.multiple;
    var dropdownPrefixCls = this.getDropdownPrefixCls();
    var popupClassName = (_popupClassName = {}, _popupClassName[props.dropdownClassName] = !!props.dropdownClassName, _popupClassName[dropdownPrefixCls + '--' + (multiple ? 'multiple' : 'single')] = 1, _popupClassName);
    var visible = props.visible;
    var search = multiple || !props.showSearch ? null : __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
      'span',
      { className: dropdownPrefixCls + '-search' },
      props.inputElement
    );

    var recursive = function recursive(children) {
      // Note: if use `React.Children.map`, the node's key will be modified.
      return Object(__WEBPACK_IMPORTED_MODULE_11_rc_util_es_Children_toArray__["a" /* default */])(children).map(function handler(child) {
        // eslint-disable-line
        if (!child) {
          return null;
        }
        if (child && child.props.children) {
          // null or String has no Prop
          return __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_9_rc_tree__["a" /* TreeNode */],
            __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, child.props, { key: child.key }),
            recursive(child.props.children)
          );
        }
        return __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_9_rc_tree__["a" /* TreeNode */], __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, child.props, { key: child.key }));
      });
    };
    // const s = Date.now();
    var treeNodes = void 0;
    if (props._cachetreeData && this.treeNodes) {
      treeNodes = this.treeNodes;
    } else {
      treeNodes = recursive(props.treeData || props.treeNodes);
      this.treeNodes = treeNodes;
    }
    // console.log(Date.now()-s);

    if (props.inputValue) {
      treeNodes = this.processTreeNode(treeNodes);
    }

    var keys = [];
    var halfCheckedKeys = [];
    Object(__WEBPACK_IMPORTED_MODULE_10__util__["l" /* loopAllChildren */])(treeNodes, function (child) {
      if (props.value.some(function (item) {
        return item.value === Object(__WEBPACK_IMPORTED_MODULE_10__util__["h" /* getValuePropValue */])(child);
      })) {
        keys.push(child.key);
      }
      if (props.halfCheckedValues && props.halfCheckedValues.some(function (item) {
        return item.value === Object(__WEBPACK_IMPORTED_MODULE_10__util__["h" /* getValuePropValue */])(child);
      })) {
        halfCheckedKeys.push(child.key);
      }
    });

    var notFoundContent = void 0;
    if (!treeNodes.length) {
      if (props.notFoundContent) {
        notFoundContent = __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
          'span',
          { className: props.prefixCls + '-not-found' },
          props.notFoundContent
        );
      } else if (!search) {
        visible = false;
      }
    }
    var popupElement = __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
      'div',
      null,
      search,
      notFoundContent || this.renderTree(keys, halfCheckedKeys, treeNodes, multiple)
    );

    var popupStyle = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, props.dropdownStyle);
    var widthProp = props.dropdownMatchSelectWidth ? 'width' : 'minWidth';
    if (this.state.dropdownWidth) {
      popupStyle[widthProp] = this.state.dropdownWidth + 'px';
    }

    return __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
      __WEBPACK_IMPORTED_MODULE_8_rc_trigger__["a" /* default */],
      {
        action: props.disabled ? [] : ['click'],
        ref: Object(__WEBPACK_IMPORTED_MODULE_10__util__["o" /* saveRef */])(this, 'trigger'),
        popupPlacement: 'bottomLeft',
        builtinPlacements: BUILT_IN_PLACEMENTS,
        popupAlign: props.dropdownPopupAlign,
        prefixCls: dropdownPrefixCls,
        popupTransitionName: this.getDropdownTransitionName(),
        onPopupVisibleChange: props.onDropdownVisibleChange,
        popup: popupElement,
        popupVisible: visible,
        getPopupContainer: props.getPopupContainer,
        popupClassName: __WEBPACK_IMPORTED_MODULE_7_classnames___default()(popupClassName),
        popupStyle: popupStyle
      },
      this.props.children
    );
  };

  return SelectTrigger;
}(__WEBPACK_IMPORTED_MODULE_4_react__["Component"]);

SelectTrigger.propTypes = {
  dropdownMatchSelectWidth: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.bool,
  dropdownPopupAlign: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.object,
  visible: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.bool,
  filterTreeNode: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.any,
  treeNodes: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.any,
  inputValue: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.string,
  prefixCls: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.string,
  popupClassName: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.string,
  children: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.any
};


/* harmony default export */ __webpack_exports__["a"] = (SelectTrigger);

/***/ }),
/* 125 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_prop_types__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react_dom__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rc_util_es_Dom_contains__ = __webpack_require__(126);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rc_util_es_Dom_addEventListener__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__Popup__ = __webpack_require__(130);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__utils__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_rc_util_es_ContainerRender__ = __webpack_require__(144);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_rc_util_es_Portal__ = __webpack_require__(145);














function noop() {}

function returnEmptyString() {
  return '';
}

function returnDocument() {
  return window.document;
}

var ALL_HANDLERS = ['onClick', 'onMouseDown', 'onTouchStart', 'onMouseEnter', 'onMouseLeave', 'onFocus', 'onBlur', 'onContextMenu'];

var IS_REACT_16 = !!__WEBPACK_IMPORTED_MODULE_6_react_dom__["createPortal"];

var Trigger = function (_React$Component) {
  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default()(Trigger, _React$Component);

  function Trigger(props) {
    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, Trigger);

    var _this = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default()(this, _React$Component.call(this, props));

    _initialiseProps.call(_this);

    var popupVisible = void 0;
    if ('popupVisible' in props) {
      popupVisible = !!props.popupVisible;
    } else {
      popupVisible = !!props.defaultPopupVisible;
    }

    _this.prevPopupVisible = popupVisible;

    _this.state = {
      popupVisible: popupVisible
    };
    return _this;
  }

  Trigger.prototype.componentWillMount = function componentWillMount() {
    var _this2 = this;

    ALL_HANDLERS.forEach(function (h) {
      _this2['fire' + h] = function (e) {
        _this2.fireEvents(h, e);
      };
    });
  };

  Trigger.prototype.componentDidMount = function componentDidMount() {
    this.componentDidUpdate({}, {
      popupVisible: this.state.popupVisible
    });
  };

  Trigger.prototype.componentWillReceiveProps = function componentWillReceiveProps(_ref) {
    var popupVisible = _ref.popupVisible;

    if (popupVisible !== undefined) {
      this.setState({
        popupVisible: popupVisible
      });
    }
  };

  Trigger.prototype.componentDidUpdate = function componentDidUpdate(_, prevState) {
    var props = this.props;
    var state = this.state;
    var triggerAfterPopupVisibleChange = function triggerAfterPopupVisibleChange() {
      if (prevState.popupVisible !== state.popupVisible) {
        props.afterPopupVisibleChange(state.popupVisible);
      }
    };
    if (!IS_REACT_16) {
      this.renderComponent(null, triggerAfterPopupVisibleChange);
    }

    this.prevPopupVisible = prevState.popupVisible;

    // We must listen to `mousedown` or `touchstart`, edge case:
    // https://github.com/ant-design/ant-design/issues/5804
    // https://github.com/react-component/calendar/issues/250
    // https://github.com/react-component/trigger/issues/50
    if (state.popupVisible) {
      var currentDocument = void 0;
      if (!this.clickOutsideHandler && (this.isClickToHide() || this.isContextMenuToShow())) {
        currentDocument = props.getDocument();
        this.clickOutsideHandler = Object(__WEBPACK_IMPORTED_MODULE_8_rc_util_es_Dom_addEventListener__["a" /* default */])(currentDocument, 'mousedown', this.onDocumentClick);
      }
      // always hide on mobile
      if (!this.touchOutsideHandler) {
        currentDocument = currentDocument || props.getDocument();
        this.touchOutsideHandler = Object(__WEBPACK_IMPORTED_MODULE_8_rc_util_es_Dom_addEventListener__["a" /* default */])(currentDocument, 'touchstart', this.onDocumentClick);
      }
      // close popup when trigger type contains 'onContextMenu' and document is scrolling.
      if (!this.contextMenuOutsideHandler1 && this.isContextMenuToShow()) {
        currentDocument = currentDocument || props.getDocument();
        this.contextMenuOutsideHandler1 = Object(__WEBPACK_IMPORTED_MODULE_8_rc_util_es_Dom_addEventListener__["a" /* default */])(currentDocument, 'scroll', this.onContextMenuClose);
      }
      // close popup when trigger type contains 'onContextMenu' and window is blur.
      if (!this.contextMenuOutsideHandler2 && this.isContextMenuToShow()) {
        this.contextMenuOutsideHandler2 = Object(__WEBPACK_IMPORTED_MODULE_8_rc_util_es_Dom_addEventListener__["a" /* default */])(window, 'blur', this.onContextMenuClose);
      }
      return;
    }

    this.clearOutsideHandler();
  };

  Trigger.prototype.componentWillUnmount = function componentWillUnmount() {
    this.clearDelayTimer();
    this.clearOutsideHandler();
  };

  Trigger.prototype.getPopupDomNode = function getPopupDomNode() {
    // for test
    if (this._component && this._component.getPopupDomNode) {
      return this._component.getPopupDomNode();
    }
    return null;
  };

  Trigger.prototype.getPopupAlign = function getPopupAlign() {
    var props = this.props;
    var popupPlacement = props.popupPlacement,
        popupAlign = props.popupAlign,
        builtinPlacements = props.builtinPlacements;

    if (popupPlacement && builtinPlacements) {
      return Object(__WEBPACK_IMPORTED_MODULE_10__utils__["a" /* getAlignFromPlacement */])(builtinPlacements, popupPlacement, popupAlign);
    }
    return popupAlign;
  };

  Trigger.prototype.setPopupVisible = function setPopupVisible(popupVisible) {
    this.clearDelayTimer();
    if (this.state.popupVisible !== popupVisible) {
      if (!('popupVisible' in this.props)) {
        this.setState({
          popupVisible: popupVisible
        });
      }
      this.props.onPopupVisibleChange(popupVisible);
    }
  };

  Trigger.prototype.delaySetPopupVisible = function delaySetPopupVisible(visible, delayS) {
    var _this3 = this;

    var delay = delayS * 1000;
    this.clearDelayTimer();
    if (delay) {
      this.delayTimer = setTimeout(function () {
        _this3.setPopupVisible(visible);
        _this3.clearDelayTimer();
      }, delay);
    } else {
      this.setPopupVisible(visible);
    }
  };

  Trigger.prototype.clearDelayTimer = function clearDelayTimer() {
    if (this.delayTimer) {
      clearTimeout(this.delayTimer);
      this.delayTimer = null;
    }
  };

  Trigger.prototype.clearOutsideHandler = function clearOutsideHandler() {
    if (this.clickOutsideHandler) {
      this.clickOutsideHandler.remove();
      this.clickOutsideHandler = null;
    }

    if (this.contextMenuOutsideHandler1) {
      this.contextMenuOutsideHandler1.remove();
      this.contextMenuOutsideHandler1 = null;
    }

    if (this.contextMenuOutsideHandler2) {
      this.contextMenuOutsideHandler2.remove();
      this.contextMenuOutsideHandler2 = null;
    }

    if (this.touchOutsideHandler) {
      this.touchOutsideHandler.remove();
      this.touchOutsideHandler = null;
    }
  };

  Trigger.prototype.createTwoChains = function createTwoChains(event) {
    var childPros = this.props.children.props;
    var props = this.props;
    if (childPros[event] && props[event]) {
      return this['fire' + event];
    }
    return childPros[event] || props[event];
  };

  Trigger.prototype.isClickToShow = function isClickToShow() {
    var _props = this.props,
        action = _props.action,
        showAction = _props.showAction;

    return action.indexOf('click') !== -1 || showAction.indexOf('click') !== -1;
  };

  Trigger.prototype.isContextMenuToShow = function isContextMenuToShow() {
    var _props2 = this.props,
        action = _props2.action,
        showAction = _props2.showAction;

    return action.indexOf('contextMenu') !== -1 || showAction.indexOf('contextMenu') !== -1;
  };

  Trigger.prototype.isClickToHide = function isClickToHide() {
    var _props3 = this.props,
        action = _props3.action,
        hideAction = _props3.hideAction;

    return action.indexOf('click') !== -1 || hideAction.indexOf('click') !== -1;
  };

  Trigger.prototype.isMouseEnterToShow = function isMouseEnterToShow() {
    var _props4 = this.props,
        action = _props4.action,
        showAction = _props4.showAction;

    return action.indexOf('hover') !== -1 || showAction.indexOf('mouseEnter') !== -1;
  };

  Trigger.prototype.isMouseLeaveToHide = function isMouseLeaveToHide() {
    var _props5 = this.props,
        action = _props5.action,
        hideAction = _props5.hideAction;

    return action.indexOf('hover') !== -1 || hideAction.indexOf('mouseLeave') !== -1;
  };

  Trigger.prototype.isFocusToShow = function isFocusToShow() {
    var _props6 = this.props,
        action = _props6.action,
        showAction = _props6.showAction;

    return action.indexOf('focus') !== -1 || showAction.indexOf('focus') !== -1;
  };

  Trigger.prototype.isBlurToHide = function isBlurToHide() {
    var _props7 = this.props,
        action = _props7.action,
        hideAction = _props7.hideAction;

    return action.indexOf('focus') !== -1 || hideAction.indexOf('blur') !== -1;
  };

  Trigger.prototype.forcePopupAlign = function forcePopupAlign() {
    if (this.state.popupVisible && this._component && this._component.alignInstance) {
      this._component.alignInstance.forceAlign();
    }
  };

  Trigger.prototype.fireEvents = function fireEvents(type, e) {
    var childCallback = this.props.children.props[type];
    if (childCallback) {
      childCallback(e);
    }
    var callback = this.props[type];
    if (callback) {
      callback(e);
    }
  };

  Trigger.prototype.close = function close() {
    this.setPopupVisible(false);
  };

  Trigger.prototype.render = function render() {
    var _this4 = this;

    var popupVisible = this.state.popupVisible;

    var props = this.props;
    var children = props.children;
    var child = __WEBPACK_IMPORTED_MODULE_4_react___default.a.Children.only(children);
    var newChildProps = { key: 'trigger' };

    if (this.isContextMenuToShow()) {
      newChildProps.onContextMenu = this.onContextMenu;
    } else {
      newChildProps.onContextMenu = this.createTwoChains('onContextMenu');
    }

    if (this.isClickToHide() || this.isClickToShow()) {
      newChildProps.onClick = this.onClick;
      newChildProps.onMouseDown = this.onMouseDown;
      newChildProps.onTouchStart = this.onTouchStart;
    } else {
      newChildProps.onClick = this.createTwoChains('onClick');
      newChildProps.onMouseDown = this.createTwoChains('onMouseDown');
      newChildProps.onTouchStart = this.createTwoChains('onTouchStart');
    }
    if (this.isMouseEnterToShow()) {
      newChildProps.onMouseEnter = this.onMouseEnter;
    } else {
      newChildProps.onMouseEnter = this.createTwoChains('onMouseEnter');
    }
    if (this.isMouseLeaveToHide()) {
      newChildProps.onMouseLeave = this.onMouseLeave;
    } else {
      newChildProps.onMouseLeave = this.createTwoChains('onMouseLeave');
    }
    if (this.isFocusToShow() || this.isBlurToHide()) {
      newChildProps.onFocus = this.onFocus;
      newChildProps.onBlur = this.onBlur;
    } else {
      newChildProps.onFocus = this.createTwoChains('onFocus');
      newChildProps.onBlur = this.createTwoChains('onBlur');
    }

    var trigger = __WEBPACK_IMPORTED_MODULE_4_react___default.a.cloneElement(child, newChildProps);

    if (!IS_REACT_16) {
      return __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_11_rc_util_es_ContainerRender__["a" /* default */],
        {
          parent: this,
          visible: popupVisible,
          autoMount: false,
          forceRender: props.forceRender,
          getComponent: this.getComponent,
          getContainer: this.getContainer
        },
        function (_ref2) {
          var renderComponent = _ref2.renderComponent;

          _this4.renderComponent = renderComponent;
          return trigger;
        }
      );
    }

    var portal = void 0;
    // prevent unmounting after it's rendered
    if (popupVisible || this._component || props.forceRender) {
      portal = __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_12_rc_util_es_Portal__["a" /* default */],
        {
          key: 'portal',
          getContainer: this.getContainer,
          didUpdate: this.handlePortalUpdate
        },
        this.getComponent()
      );
    }

    return [trigger, portal];
  };

  return Trigger;
}(__WEBPACK_IMPORTED_MODULE_4_react___default.a.Component);

Trigger.propTypes = {
  children: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.any,
  action: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.string, __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.string)]),
  showAction: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.any,
  hideAction: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.any,
  getPopupClassNameFromAlign: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.any,
  onPopupVisibleChange: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.func,
  afterPopupVisibleChange: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.func,
  popup: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.node, __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.func]).isRequired,
  popupStyle: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.object,
  prefixCls: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.string,
  popupClassName: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.string,
  popupPlacement: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.string,
  builtinPlacements: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.object,
  popupTransitionName: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.string, __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.object]),
  popupAnimation: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.any,
  mouseEnterDelay: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.number,
  mouseLeaveDelay: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.number,
  zIndex: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.number,
  focusDelay: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.number,
  blurDelay: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.number,
  getPopupContainer: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.func,
  getDocument: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.func,
  forceRender: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.bool,
  destroyPopupOnHide: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.bool,
  mask: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.bool,
  maskClosable: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.bool,
  onPopupAlign: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.func,
  popupAlign: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.object,
  popupVisible: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.bool,
  defaultPopupVisible: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.bool,
  maskTransitionName: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.string, __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.object]),
  maskAnimation: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.string
};
Trigger.defaultProps = {
  prefixCls: 'rc-trigger-popup',
  getPopupClassNameFromAlign: returnEmptyString,
  getDocument: returnDocument,
  onPopupVisibleChange: noop,
  afterPopupVisibleChange: noop,
  onPopupAlign: noop,
  popupClassName: '',
  mouseEnterDelay: 0,
  mouseLeaveDelay: 0.1,
  focusDelay: 0,
  blurDelay: 0.15,
  popupStyle: {},
  destroyPopupOnHide: false,
  popupAlign: {},
  defaultPopupVisible: false,
  mask: false,
  maskClosable: true,
  action: [],
  showAction: [],
  hideAction: []
};

var _initialiseProps = function _initialiseProps() {
  var _this5 = this;

  this.onMouseEnter = function (e) {
    _this5.fireEvents('onMouseEnter', e);
    _this5.delaySetPopupVisible(true, _this5.props.mouseEnterDelay);
  };

  this.onMouseLeave = function (e) {
    _this5.fireEvents('onMouseLeave', e);
    _this5.delaySetPopupVisible(false, _this5.props.mouseLeaveDelay);
  };

  this.onPopupMouseEnter = function () {
    _this5.clearDelayTimer();
  };

  this.onPopupMouseLeave = function (e) {
    // https://github.com/react-component/trigger/pull/13
    // react bug?
    if (e.relatedTarget && !e.relatedTarget.setTimeout && _this5._component && _this5._component.getPopupDomNode && Object(__WEBPACK_IMPORTED_MODULE_7_rc_util_es_Dom_contains__["a" /* default */])(_this5._component.getPopupDomNode(), e.relatedTarget)) {
      return;
    }
    _this5.delaySetPopupVisible(false, _this5.props.mouseLeaveDelay);
  };

  this.onFocus = function (e) {
    _this5.fireEvents('onFocus', e);
    // incase focusin and focusout
    _this5.clearDelayTimer();
    if (_this5.isFocusToShow()) {
      _this5.focusTime = Date.now();
      _this5.delaySetPopupVisible(true, _this5.props.focusDelay);
    }
  };

  this.onMouseDown = function (e) {
    _this5.fireEvents('onMouseDown', e);
    _this5.preClickTime = Date.now();
  };

  this.onTouchStart = function (e) {
    _this5.fireEvents('onTouchStart', e);
    _this5.preTouchTime = Date.now();
  };

  this.onBlur = function (e) {
    _this5.fireEvents('onBlur', e);
    _this5.clearDelayTimer();
    if (_this5.isBlurToHide()) {
      _this5.delaySetPopupVisible(false, _this5.props.blurDelay);
    }
  };

  this.onContextMenu = function (e) {
    e.preventDefault();
    _this5.fireEvents('onContextMenu', e);
    _this5.setPopupVisible(true);
  };

  this.onContextMenuClose = function () {
    if (_this5.isContextMenuToShow()) {
      _this5.close();
    }
  };

  this.onClick = function (event) {
    _this5.fireEvents('onClick', event);
    // focus will trigger click
    if (_this5.focusTime) {
      var preTime = void 0;
      if (_this5.preClickTime && _this5.preTouchTime) {
        preTime = Math.min(_this5.preClickTime, _this5.preTouchTime);
      } else if (_this5.preClickTime) {
        preTime = _this5.preClickTime;
      } else if (_this5.preTouchTime) {
        preTime = _this5.preTouchTime;
      }
      if (Math.abs(preTime - _this5.focusTime) < 20) {
        return;
      }
      _this5.focusTime = 0;
    }
    _this5.preClickTime = 0;
    _this5.preTouchTime = 0;
    event.preventDefault();
    var nextVisible = !_this5.state.popupVisible;
    if (_this5.isClickToHide() && !nextVisible || nextVisible && _this5.isClickToShow()) {
      _this5.setPopupVisible(!_this5.state.popupVisible);
    }
  };

  this.onDocumentClick = function (event) {
    if (_this5.props.mask && !_this5.props.maskClosable) {
      return;
    }
    var target = event.target;
    var root = Object(__WEBPACK_IMPORTED_MODULE_6_react_dom__["findDOMNode"])(_this5);
    var popupNode = _this5.getPopupDomNode();
    if (!Object(__WEBPACK_IMPORTED_MODULE_7_rc_util_es_Dom_contains__["a" /* default */])(root, target) && !Object(__WEBPACK_IMPORTED_MODULE_7_rc_util_es_Dom_contains__["a" /* default */])(popupNode, target)) {
      _this5.close();
    }
  };

  this.getRootDomNode = function () {
    return Object(__WEBPACK_IMPORTED_MODULE_6_react_dom__["findDOMNode"])(_this5);
  };

  this.getPopupClassNameFromAlign = function (align) {
    var className = [];
    var props = _this5.props;
    var popupPlacement = props.popupPlacement,
        builtinPlacements = props.builtinPlacements,
        prefixCls = props.prefixCls;

    if (popupPlacement && builtinPlacements) {
      className.push(Object(__WEBPACK_IMPORTED_MODULE_10__utils__["b" /* getPopupClassNameFromAlign */])(builtinPlacements, prefixCls, align));
    }
    if (props.getPopupClassNameFromAlign) {
      className.push(props.getPopupClassNameFromAlign(align));
    }
    return className.join(' ');
  };

  this.getComponent = function () {
    var props = _this5.props,
        state = _this5.state;

    var mouseProps = {};
    if (_this5.isMouseEnterToShow()) {
      mouseProps.onMouseEnter = _this5.onPopupMouseEnter;
    }
    if (_this5.isMouseLeaveToHide()) {
      mouseProps.onMouseLeave = _this5.onPopupMouseLeave;
    }
    return __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
      __WEBPACK_IMPORTED_MODULE_9__Popup__["a" /* default */],
      __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({
        prefixCls: props.prefixCls,
        destroyPopupOnHide: props.destroyPopupOnHide,
        visible: state.popupVisible,
        className: props.popupClassName,
        action: props.action,
        align: _this5.getPopupAlign(),
        onAlign: props.onPopupAlign,
        animation: props.popupAnimation,
        getClassNameFromAlign: _this5.getPopupClassNameFromAlign
      }, mouseProps, {
        getRootDomNode: _this5.getRootDomNode,
        style: props.popupStyle,
        mask: props.mask,
        zIndex: props.zIndex,
        transitionName: props.popupTransitionName,
        maskAnimation: props.maskAnimation,
        maskTransitionName: props.maskTransitionName,
        ref: _this5.savePopup
      }),
      typeof props.popup === 'function' ? props.popup() : props.popup
    );
  };

  this.getContainer = function () {
    var props = _this5.props;

    var popupContainer = document.createElement('div');
    // Make sure default popup container will never cause scrollbar appearing
    // https://github.com/react-component/trigger/issues/41
    popupContainer.style.position = 'absolute';
    popupContainer.style.top = '0';
    popupContainer.style.left = '0';
    popupContainer.style.width = '100%';
    var mountNode = props.getPopupContainer ? props.getPopupContainer(Object(__WEBPACK_IMPORTED_MODULE_6_react_dom__["findDOMNode"])(_this5)) : props.getDocument().body;
    mountNode.appendChild(popupContainer);
    return popupContainer;
  };

  this.handlePortalUpdate = function () {
    if (_this5.prevPopupVisible !== _this5.state.popupVisible) {
      _this5.props.afterPopupVisibleChange(_this5.state.popupVisible);
    }
  };

  this.savePopup = function (node) {
    _this5._component = node;
  };
};

/* harmony default export */ __webpack_exports__["a"] = (Trigger);

/***/ }),
/* 126 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = contains;
function contains(root, n) {
  var node = n;
  while (node) {
    if (node === root) {
      return true;
    }
    node = node.parentNode;
  }

  return false;
}

/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = addEventListener;

var _EventObject = __webpack_require__(128);

var _EventObject2 = _interopRequireDefault(_EventObject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function addEventListener(target, eventType, callback) {
  function wrapCallback(e) {
    var ne = new _EventObject2["default"](e);
    callback.call(target, ne);
  }

  if (target.addEventListener) {
    target.addEventListener(eventType, wrapCallback, false);
    return {
      remove: function remove() {
        target.removeEventListener(eventType, wrapCallback, false);
      }
    };
  } else if (target.attachEvent) {
    target.attachEvent('on' + eventType, wrapCallback);
    return {
      remove: function remove() {
        target.detachEvent('on' + eventType, wrapCallback);
      }
    };
  }
}
module.exports = exports['default'];

/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _EventBaseObject = __webpack_require__(129);

var _EventBaseObject2 = _interopRequireDefault(_EventBaseObject);

var _objectAssign = __webpack_require__(60);

var _objectAssign2 = _interopRequireDefault(_objectAssign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @ignore
 * event object for dom
 * @author yiminghe@gmail.com
 */

var TRUE = true;
var FALSE = false;
var commonProps = ['altKey', 'bubbles', 'cancelable', 'ctrlKey', 'currentTarget', 'eventPhase', 'metaKey', 'shiftKey', 'target', 'timeStamp', 'view', 'type'];

function isNullOrUndefined(w) {
  return w === null || w === undefined;
}

var eventNormalizers = [{
  reg: /^key/,
  props: ['char', 'charCode', 'key', 'keyCode', 'which'],
  fix: function fix(event, nativeEvent) {
    if (isNullOrUndefined(event.which)) {
      event.which = !isNullOrUndefined(nativeEvent.charCode) ? nativeEvent.charCode : nativeEvent.keyCode;
    }

    // add metaKey to non-Mac browsers (use ctrl for PC 's and Meta for Macs)
    if (event.metaKey === undefined) {
      event.metaKey = event.ctrlKey;
    }
  }
}, {
  reg: /^touch/,
  props: ['touches', 'changedTouches', 'targetTouches']
}, {
  reg: /^hashchange$/,
  props: ['newURL', 'oldURL']
}, {
  reg: /^gesturechange$/i,
  props: ['rotation', 'scale']
}, {
  reg: /^(mousewheel|DOMMouseScroll)$/,
  props: [],
  fix: function fix(event, nativeEvent) {
    var deltaX = void 0;
    var deltaY = void 0;
    var delta = void 0;
    var wheelDelta = nativeEvent.wheelDelta;
    var axis = nativeEvent.axis;
    var wheelDeltaY = nativeEvent.wheelDeltaY;
    var wheelDeltaX = nativeEvent.wheelDeltaX;
    var detail = nativeEvent.detail;

    // ie/webkit
    if (wheelDelta) {
      delta = wheelDelta / 120;
    }

    // gecko
    if (detail) {
      // press control e.detail == 1 else e.detail == 3
      delta = 0 - (detail % 3 === 0 ? detail / 3 : detail);
    }

    // Gecko
    if (axis !== undefined) {
      if (axis === event.HORIZONTAL_AXIS) {
        deltaY = 0;
        deltaX = 0 - delta;
      } else if (axis === event.VERTICAL_AXIS) {
        deltaX = 0;
        deltaY = delta;
      }
    }

    // Webkit
    if (wheelDeltaY !== undefined) {
      deltaY = wheelDeltaY / 120;
    }
    if (wheelDeltaX !== undefined) {
      deltaX = -1 * wheelDeltaX / 120;
    }

    // 默认 deltaY (ie)
    if (!deltaX && !deltaY) {
      deltaY = delta;
    }

    if (deltaX !== undefined) {
      /**
       * deltaX of mousewheel event
       * @property deltaX
       * @member Event.DomEvent.Object
       */
      event.deltaX = deltaX;
    }

    if (deltaY !== undefined) {
      /**
       * deltaY of mousewheel event
       * @property deltaY
       * @member Event.DomEvent.Object
       */
      event.deltaY = deltaY;
    }

    if (delta !== undefined) {
      /**
       * delta of mousewheel event
       * @property delta
       * @member Event.DomEvent.Object
       */
      event.delta = delta;
    }
  }
}, {
  reg: /^mouse|contextmenu|click|mspointer|(^DOMMouseScroll$)/i,
  props: ['buttons', 'clientX', 'clientY', 'button', 'offsetX', 'relatedTarget', 'which', 'fromElement', 'toElement', 'offsetY', 'pageX', 'pageY', 'screenX', 'screenY'],
  fix: function fix(event, nativeEvent) {
    var eventDoc = void 0;
    var doc = void 0;
    var body = void 0;
    var target = event.target;
    var button = nativeEvent.button;

    // Calculate pageX/Y if missing and clientX/Y available
    if (target && isNullOrUndefined(event.pageX) && !isNullOrUndefined(nativeEvent.clientX)) {
      eventDoc = target.ownerDocument || document;
      doc = eventDoc.documentElement;
      body = eventDoc.body;
      event.pageX = nativeEvent.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
      event.pageY = nativeEvent.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0);
    }

    // which for click: 1 === left; 2 === middle; 3 === right
    // do not use button
    if (!event.which && button !== undefined) {
      if (button & 1) {
        event.which = 1;
      } else if (button & 2) {
        event.which = 3;
      } else if (button & 4) {
        event.which = 2;
      } else {
        event.which = 0;
      }
    }

    // add relatedTarget, if necessary
    if (!event.relatedTarget && event.fromElement) {
      event.relatedTarget = event.fromElement === target ? event.toElement : event.fromElement;
    }

    return event;
  }
}];

function retTrue() {
  return TRUE;
}

function retFalse() {
  return FALSE;
}

function DomEventObject(nativeEvent) {
  var type = nativeEvent.type;

  var isNative = typeof nativeEvent.stopPropagation === 'function' || typeof nativeEvent.cancelBubble === 'boolean';

  _EventBaseObject2["default"].call(this);

  this.nativeEvent = nativeEvent;

  // in case dom event has been mark as default prevented by lower dom node
  var isDefaultPrevented = retFalse;
  if ('defaultPrevented' in nativeEvent) {
    isDefaultPrevented = nativeEvent.defaultPrevented ? retTrue : retFalse;
  } else if ('getPreventDefault' in nativeEvent) {
    // https://bugzilla.mozilla.org/show_bug.cgi?id=691151
    isDefaultPrevented = nativeEvent.getPreventDefault() ? retTrue : retFalse;
  } else if ('returnValue' in nativeEvent) {
    isDefaultPrevented = nativeEvent.returnValue === FALSE ? retTrue : retFalse;
  }

  this.isDefaultPrevented = isDefaultPrevented;

  var fixFns = [];
  var fixFn = void 0;
  var l = void 0;
  var prop = void 0;
  var props = commonProps.concat();

  eventNormalizers.forEach(function (normalizer) {
    if (type.match(normalizer.reg)) {
      props = props.concat(normalizer.props);
      if (normalizer.fix) {
        fixFns.push(normalizer.fix);
      }
    }
  });

  l = props.length;

  // clone properties of the original event object
  while (l) {
    prop = props[--l];
    this[prop] = nativeEvent[prop];
  }

  // fix target property, if necessary
  if (!this.target && isNative) {
    this.target = nativeEvent.srcElement || document; // srcElement might not be defined either
  }

  // check if target is a text node (safari)
  if (this.target && this.target.nodeType === 3) {
    this.target = this.target.parentNode;
  }

  l = fixFns.length;

  while (l) {
    fixFn = fixFns[--l];
    fixFn(this, nativeEvent);
  }

  this.timeStamp = nativeEvent.timeStamp || Date.now();
}

var EventBaseObjectProto = _EventBaseObject2["default"].prototype;

(0, _objectAssign2["default"])(DomEventObject.prototype, EventBaseObjectProto, {
  constructor: DomEventObject,

  preventDefault: function preventDefault() {
    var e = this.nativeEvent;

    // if preventDefault exists run it on the original event
    if (e.preventDefault) {
      e.preventDefault();
    } else {
      // otherwise set the returnValue property of the original event to FALSE (IE)
      e.returnValue = FALSE;
    }

    EventBaseObjectProto.preventDefault.call(this);
  },
  stopPropagation: function stopPropagation() {
    var e = this.nativeEvent;

    // if stopPropagation exists run it on the original event
    if (e.stopPropagation) {
      e.stopPropagation();
    } else {
      // otherwise set the cancelBubble property of the original event to TRUE (IE)
      e.cancelBubble = TRUE;
    }

    EventBaseObjectProto.stopPropagation.call(this);
  }
});

exports["default"] = DomEventObject;
module.exports = exports['default'];

/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * @ignore
 * base event object for custom and dom event.
 * @author yiminghe@gmail.com
 */

function returnFalse() {
  return false;
}

function returnTrue() {
  return true;
}

function EventBaseObject() {
  this.timeStamp = Date.now();
  this.target = undefined;
  this.currentTarget = undefined;
}

EventBaseObject.prototype = {
  isEventObject: 1,

  constructor: EventBaseObject,

  isDefaultPrevented: returnFalse,

  isPropagationStopped: returnFalse,

  isImmediatePropagationStopped: returnFalse,

  preventDefault: function preventDefault() {
    this.isDefaultPrevented = returnTrue;
  },
  stopPropagation: function stopPropagation() {
    this.isPropagationStopped = returnTrue;
  },
  stopImmediatePropagation: function stopImmediatePropagation() {
    this.isImmediatePropagationStopped = returnTrue;
    // fixed 1.2
    // call stopPropagation implicitly
    this.stopPropagation();
  },
  halt: function halt(immediate) {
    if (immediate) {
      this.stopImmediatePropagation();
    } else {
      this.stopPropagation();
    }
    this.preventDefault();
  }
};

exports["default"] = EventBaseObject;
module.exports = exports['default'];

/***/ }),
/* 130 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_prop_types__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react_dom__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rc_align__ = __webpack_require__(131);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rc_animate__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__PopupInner__ = __webpack_require__(143);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__LazyRenderBox__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__utils__ = __webpack_require__(67);













var Popup = function (_Component) {
  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default()(Popup, _Component);

  function Popup(props) {
    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, Popup);

    var _this = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default()(this, _Component.call(this, props));

    _initialiseProps.call(_this);

    _this.savePopupRef = __WEBPACK_IMPORTED_MODULE_11__utils__["c" /* saveRef */].bind(_this, 'popupInstance');
    _this.saveAlignRef = __WEBPACK_IMPORTED_MODULE_11__utils__["c" /* saveRef */].bind(_this, 'alignInstance');
    return _this;
  }

  Popup.prototype.componentDidMount = function componentDidMount() {
    this.rootNode = this.getPopupDomNode();
  };

  Popup.prototype.getPopupDomNode = function getPopupDomNode() {
    return __WEBPACK_IMPORTED_MODULE_6_react_dom___default.a.findDOMNode(this.popupInstance);
  };

  Popup.prototype.getMaskTransitionName = function getMaskTransitionName() {
    var props = this.props;
    var transitionName = props.maskTransitionName;
    var animation = props.maskAnimation;
    if (!transitionName && animation) {
      transitionName = props.prefixCls + '-' + animation;
    }
    return transitionName;
  };

  Popup.prototype.getTransitionName = function getTransitionName() {
    var props = this.props;
    var transitionName = props.transitionName;
    if (!transitionName && props.animation) {
      transitionName = props.prefixCls + '-' + props.animation;
    }
    return transitionName;
  };

  Popup.prototype.getClassName = function getClassName(currentAlignClassName) {
    return this.props.prefixCls + ' ' + this.props.className + ' ' + currentAlignClassName;
  };

  Popup.prototype.getPopupElement = function getPopupElement() {
    var savePopupRef = this.savePopupRef,
        props = this.props;
    var align = props.align,
        style = props.style,
        visible = props.visible,
        prefixCls = props.prefixCls,
        destroyPopupOnHide = props.destroyPopupOnHide;

    var className = this.getClassName(this.currentAlignClassName || props.getClassNameFromAlign(align));
    var hiddenClassName = prefixCls + '-hidden';
    if (!visible) {
      this.currentAlignClassName = null;
    }
    var newStyle = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, style, this.getZIndexStyle());
    var popupInnerProps = {
      className: className,
      prefixCls: prefixCls,
      ref: savePopupRef,
      onMouseEnter: props.onMouseEnter,
      onMouseLeave: props.onMouseLeave,
      style: newStyle
    };
    if (destroyPopupOnHide) {
      return __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_8_rc_animate__["a" /* default */],
        {
          component: '',
          exclusive: true,
          transitionAppear: true,
          transitionName: this.getTransitionName()
        },
        visible ? __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_7_rc_align__["a" /* default */],
          {
            target: this.getTarget,
            key: 'popup',
            ref: this.saveAlignRef,
            monitorWindowResize: true,
            align: align,
            onAlign: this.onAlign
          },
          __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_9__PopupInner__["a" /* default */],
            __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({
              visible: true
            }, popupInnerProps),
            props.children
          )
        ) : null
      );
    }
    return __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
      __WEBPACK_IMPORTED_MODULE_8_rc_animate__["a" /* default */],
      {
        component: '',
        exclusive: true,
        transitionAppear: true,
        transitionName: this.getTransitionName(),
        showProp: 'xVisible'
      },
      __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_7_rc_align__["a" /* default */],
        {
          target: this.getTarget,
          key: 'popup',
          ref: this.saveAlignRef,
          monitorWindowResize: true,
          xVisible: visible,
          childrenProps: { visible: 'xVisible' },
          disabled: !visible,
          align: align,
          onAlign: this.onAlign
        },
        __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_9__PopupInner__["a" /* default */],
          __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({
            hiddenClassName: hiddenClassName
          }, popupInnerProps),
          props.children
        )
      )
    );
  };

  Popup.prototype.getZIndexStyle = function getZIndexStyle() {
    var style = {};
    var props = this.props;
    if (props.zIndex !== undefined) {
      style.zIndex = props.zIndex;
    }
    return style;
  };

  Popup.prototype.getMaskElement = function getMaskElement() {
    var props = this.props;
    var maskElement = void 0;
    if (props.mask) {
      var maskTransition = this.getMaskTransitionName();
      maskElement = __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_10__LazyRenderBox__["a" /* default */], {
        style: this.getZIndexStyle(),
        key: 'mask',
        className: props.prefixCls + '-mask',
        hiddenClassName: props.prefixCls + '-mask-hidden',
        visible: props.visible
      });
      if (maskTransition) {
        maskElement = __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_8_rc_animate__["a" /* default */],
          {
            key: 'mask',
            showProp: 'visible',
            transitionAppear: true,
            component: '',
            transitionName: maskTransition
          },
          maskElement
        );
      }
    }
    return maskElement;
  };

  Popup.prototype.render = function render() {
    return __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
      'div',
      null,
      this.getMaskElement(),
      this.getPopupElement()
    );
  };

  return Popup;
}(__WEBPACK_IMPORTED_MODULE_4_react__["Component"]);

Popup.propTypes = {
  visible: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.bool,
  style: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.object,
  getClassNameFromAlign: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.func,
  onAlign: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.func,
  getRootDomNode: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.func,
  onMouseEnter: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.func,
  align: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.any,
  destroyPopupOnHide: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.bool,
  className: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.string,
  prefixCls: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.string,
  onMouseLeave: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.func
};

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.onAlign = function (popupDomNode, align) {
    var props = _this2.props;
    var currentAlignClassName = props.getClassNameFromAlign(align);
    // FIX: https://github.com/react-component/trigger/issues/56
    // FIX: https://github.com/react-component/tooltip/issues/79
    if (_this2.currentAlignClassName !== currentAlignClassName) {
      _this2.currentAlignClassName = currentAlignClassName;
      popupDomNode.className = _this2.getClassName(currentAlignClassName);
    }
    props.onAlign(popupDomNode, align);
  };

  this.getTarget = function () {
    return _this2.props.getRootDomNode();
  };
};

/* harmony default export */ __webpack_exports__["a"] = (Popup);

/***/ }),
/* 131 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Align__ = __webpack_require__(132);
// export this package's api

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__Align__["a" /* default */]);

/***/ }),
/* 132 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_inherits__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_prop_types__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react_dom__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_dom_align__ = __webpack_require__(133);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rc_util_es_Dom_addEventListener__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_shallowequal__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_shallowequal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_shallowequal__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__isWindow__ = __webpack_require__(142);











function buffer(fn, ms) {
  var timer = void 0;

  function clear() {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  }

  function bufferFn() {
    clear();
    timer = setTimeout(fn, ms);
  }

  bufferFn.clear = clear;

  return bufferFn;
}

var Align = function (_Component) {
  __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_inherits___default()(Align, _Component);

  function Align() {
    var _temp, _this, _ret;

    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, Align);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_possibleConstructorReturn___default()(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.forceAlign = function () {
      var props = _this.props;
      if (!props.disabled) {
        var source = __WEBPACK_IMPORTED_MODULE_5_react_dom___default.a.findDOMNode(_this);
        props.onAlign(source, Object(__WEBPACK_IMPORTED_MODULE_6_dom_align__["a" /* default */])(source, props.target(), props.align));
      }
    }, _temp), __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_possibleConstructorReturn___default()(_this, _ret);
  }

  Align.prototype.componentDidMount = function componentDidMount() {
    var props = this.props;
    // if parent ref not attached .... use document.getElementById
    this.forceAlign();
    if (!props.disabled && props.monitorWindowResize) {
      this.startMonitorWindowResize();
    }
  };

  Align.prototype.componentDidUpdate = function componentDidUpdate(prevProps) {
    var reAlign = false;
    var props = this.props;

    if (!props.disabled) {
      if (prevProps.disabled || !__WEBPACK_IMPORTED_MODULE_8_shallowequal___default()(prevProps.align, props.align)) {
        reAlign = true;
      } else {
        var lastTarget = prevProps.target();
        var currentTarget = props.target();
        if (Object(__WEBPACK_IMPORTED_MODULE_9__isWindow__["a" /* default */])(lastTarget) && Object(__WEBPACK_IMPORTED_MODULE_9__isWindow__["a" /* default */])(currentTarget)) {
          reAlign = false;
        } else if (lastTarget !== currentTarget) {
          reAlign = true;
        }
      }
    }

    if (reAlign) {
      this.forceAlign();
    }

    if (props.monitorWindowResize && !props.disabled) {
      this.startMonitorWindowResize();
    } else {
      this.stopMonitorWindowResize();
    }
  };

  Align.prototype.componentWillUnmount = function componentWillUnmount() {
    this.stopMonitorWindowResize();
  };

  Align.prototype.startMonitorWindowResize = function startMonitorWindowResize() {
    if (!this.resizeHandler) {
      this.bufferMonitor = buffer(this.forceAlign, this.props.monitorBufferTime);
      this.resizeHandler = Object(__WEBPACK_IMPORTED_MODULE_7_rc_util_es_Dom_addEventListener__["a" /* default */])(window, 'resize', this.bufferMonitor);
    }
  };

  Align.prototype.stopMonitorWindowResize = function stopMonitorWindowResize() {
    if (this.resizeHandler) {
      this.bufferMonitor.clear();
      this.resizeHandler.remove();
      this.resizeHandler = null;
    }
  };

  Align.prototype.render = function render() {
    var _props = this.props,
        childrenProps = _props.childrenProps,
        children = _props.children;

    var child = __WEBPACK_IMPORTED_MODULE_3_react___default.a.Children.only(children);
    if (childrenProps) {
      var newProps = {};
      for (var prop in childrenProps) {
        if (childrenProps.hasOwnProperty(prop)) {
          newProps[prop] = this.props[childrenProps[prop]];
        }
      }
      return __WEBPACK_IMPORTED_MODULE_3_react___default.a.cloneElement(child, newProps);
    }
    return child;
  };

  return Align;
}(__WEBPACK_IMPORTED_MODULE_3_react__["Component"]);

Align.propTypes = {
  childrenProps: __WEBPACK_IMPORTED_MODULE_4_prop_types___default.a.object,
  align: __WEBPACK_IMPORTED_MODULE_4_prop_types___default.a.object.isRequired,
  target: __WEBPACK_IMPORTED_MODULE_4_prop_types___default.a.func,
  onAlign: __WEBPACK_IMPORTED_MODULE_4_prop_types___default.a.func,
  monitorBufferTime: __WEBPACK_IMPORTED_MODULE_4_prop_types___default.a.number,
  monitorWindowResize: __WEBPACK_IMPORTED_MODULE_4_prop_types___default.a.bool,
  disabled: __WEBPACK_IMPORTED_MODULE_4_prop_types___default.a.bool,
  children: __WEBPACK_IMPORTED_MODULE_4_prop_types___default.a.any
};
Align.defaultProps = {
  target: function target() {
    return window;
  },
  onAlign: function onAlign() {},
  monitorBufferTime: 50,
  monitorWindowResize: false,
  disabled: false
};


/* harmony default export */ __webpack_exports__["a"] = (Align);

/***/ }),
/* 133 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__getOffsetParent__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__getVisibleRectForElement__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__adjustForViewport__ = __webpack_require__(137);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__getRegion__ = __webpack_require__(138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__getElFuturePos__ = __webpack_require__(139);
/**
 * align dom node flexibly
 * @author yiminghe@gmail.com
 */








// http://yiminghe.iteye.com/blog/1124720

function isFailX(elFuturePos, elRegion, visibleRect) {
  return elFuturePos.left < visibleRect.left || elFuturePos.left + elRegion.width > visibleRect.right;
}

function isFailY(elFuturePos, elRegion, visibleRect) {
  return elFuturePos.top < visibleRect.top || elFuturePos.top + elRegion.height > visibleRect.bottom;
}

function isCompleteFailX(elFuturePos, elRegion, visibleRect) {
  return elFuturePos.left > visibleRect.right || elFuturePos.left + elRegion.width < visibleRect.left;
}

function isCompleteFailY(elFuturePos, elRegion, visibleRect) {
  return elFuturePos.top > visibleRect.bottom || elFuturePos.top + elRegion.height < visibleRect.top;
}

function isOutOfVisibleRect(target) {
  var visibleRect = Object(__WEBPACK_IMPORTED_MODULE_2__getVisibleRectForElement__["a" /* default */])(target);
  var targetRegion = Object(__WEBPACK_IMPORTED_MODULE_4__getRegion__["a" /* default */])(target);

  return !visibleRect || targetRegion.left + targetRegion.width <= visibleRect.left || targetRegion.top + targetRegion.height <= visibleRect.top || targetRegion.left >= visibleRect.right || targetRegion.top >= visibleRect.bottom;
}

function flip(points, reg, map) {
  var ret = [];
  __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* default */].each(points, function (p) {
    ret.push(p.replace(reg, function (m) {
      return map[m];
    }));
  });
  return ret;
}

function flipOffset(offset, index) {
  offset[index] = -offset[index];
  return offset;
}

function convertOffset(str, offsetLen) {
  var n = void 0;
  if (/%$/.test(str)) {
    n = parseInt(str.substring(0, str.length - 1), 10) / 100 * offsetLen;
  } else {
    n = parseInt(str, 10);
  }
  return n || 0;
}

function normalizeOffset(offset, el) {
  offset[0] = convertOffset(offset[0], el.width);
  offset[1] = convertOffset(offset[1], el.height);
}

function domAlign(el, refNode, align) {
  var points = align.points;
  var offset = align.offset || [0, 0];
  var targetOffset = align.targetOffset || [0, 0];
  var overflow = align.overflow;
  var target = align.target || refNode;
  var source = align.source || el;
  offset = [].concat(offset);
  targetOffset = [].concat(targetOffset);
  overflow = overflow || {};
  var newOverflowCfg = {};
  var fail = 0;
  // 当前节点可以被放置的显示区域
  var visibleRect = Object(__WEBPACK_IMPORTED_MODULE_2__getVisibleRectForElement__["a" /* default */])(source);
  // 当前节点所占的区域, left/top/width/height
  var elRegion = Object(__WEBPACK_IMPORTED_MODULE_4__getRegion__["a" /* default */])(source);
  // 参照节点所占的区域, left/top/width/height
  var refNodeRegion = Object(__WEBPACK_IMPORTED_MODULE_4__getRegion__["a" /* default */])(target);
  // 将 offset 转换成数值，支持百分比
  normalizeOffset(offset, elRegion);
  normalizeOffset(targetOffset, refNodeRegion);
  // 当前节点将要被放置的位置
  var elFuturePos = Object(__WEBPACK_IMPORTED_MODULE_5__getElFuturePos__["a" /* default */])(elRegion, refNodeRegion, points, offset, targetOffset);
  // 当前节点将要所处的区域
  var newElRegion = __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* default */].merge(elRegion, elFuturePos);

  var isTargetNotOutOfVisible = !isOutOfVisibleRect(target);

  // 如果可视区域不能完全放置当前节点时允许调整
  if (visibleRect && (overflow.adjustX || overflow.adjustY) && isTargetNotOutOfVisible) {
    if (overflow.adjustX) {
      // 如果横向不能放下
      if (isFailX(elFuturePos, elRegion, visibleRect)) {
        // 对齐位置反下
        var newPoints = flip(points, /[lr]/ig, {
          l: 'r',
          r: 'l'
        });
        // 偏移量也反下
        var newOffset = flipOffset(offset, 0);
        var newTargetOffset = flipOffset(targetOffset, 0);
        var newElFuturePos = Object(__WEBPACK_IMPORTED_MODULE_5__getElFuturePos__["a" /* default */])(elRegion, refNodeRegion, newPoints, newOffset, newTargetOffset);

        if (!isCompleteFailX(newElFuturePos, elRegion, visibleRect)) {
          fail = 1;
          points = newPoints;
          offset = newOffset;
          targetOffset = newTargetOffset;
        }
      }
    }

    if (overflow.adjustY) {
      // 如果纵向不能放下
      if (isFailY(elFuturePos, elRegion, visibleRect)) {
        // 对齐位置反下
        var _newPoints = flip(points, /[tb]/ig, {
          t: 'b',
          b: 't'
        });
        // 偏移量也反下
        var _newOffset = flipOffset(offset, 1);
        var _newTargetOffset = flipOffset(targetOffset, 1);
        var _newElFuturePos = Object(__WEBPACK_IMPORTED_MODULE_5__getElFuturePos__["a" /* default */])(elRegion, refNodeRegion, _newPoints, _newOffset, _newTargetOffset);

        if (!isCompleteFailY(_newElFuturePos, elRegion, visibleRect)) {
          fail = 1;
          points = _newPoints;
          offset = _newOffset;
          targetOffset = _newTargetOffset;
        }
      }
    }

    // 如果失败，重新计算当前节点将要被放置的位置
    if (fail) {
      elFuturePos = Object(__WEBPACK_IMPORTED_MODULE_5__getElFuturePos__["a" /* default */])(elRegion, refNodeRegion, points, offset, targetOffset);
      __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* default */].mix(newElRegion, elFuturePos);
    }
    var isStillFailX = isFailX(elFuturePos, elRegion, visibleRect);
    var isStillFailY = isFailY(elFuturePos, elRegion, visibleRect);
    // 检查反下后的位置是否可以放下了，如果仍然放不下：
    // 1. 复原修改过的定位参数
    if (isStillFailX || isStillFailY) {
      points = align.points;
      offset = align.offset || [0, 0];
      targetOffset = align.targetOffset || [0, 0];
    }
    // 2. 只有指定了可以调整当前方向才调整
    newOverflowCfg.adjustX = overflow.adjustX && isStillFailX;
    newOverflowCfg.adjustY = overflow.adjustY && isStillFailY;

    // 确实要调整，甚至可能会调整高度宽度
    if (newOverflowCfg.adjustX || newOverflowCfg.adjustY) {
      newElRegion = Object(__WEBPACK_IMPORTED_MODULE_3__adjustForViewport__["a" /* default */])(elFuturePos, elRegion, visibleRect, newOverflowCfg);
    }
  }

  // need judge to in case set fixed with in css on height auto element
  if (newElRegion.width !== elRegion.width) {
    __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* default */].css(source, 'width', __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* default */].width(source) + newElRegion.width - elRegion.width);
  }

  if (newElRegion.height !== elRegion.height) {
    __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* default */].css(source, 'height', __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* default */].height(source) + newElRegion.height - elRegion.height);
  }

  // https://github.com/kissyteam/kissy/issues/190
  // 相对于屏幕位置没变，而 left/top 变了
  // 例如 <div 'relative'><el absolute></div>
  __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* default */].offset(source, {
    left: newElRegion.left,
    top: newElRegion.top
  }, {
    useCssRight: align.useCssRight,
    useCssBottom: align.useCssBottom,
    useCssTransform: align.useCssTransform
  });

  return {
    points: points,
    offset: offset,
    targetOffset: targetOffset,
    overflow: newOverflowCfg
  };
}

domAlign.__getOffsetParent = __WEBPACK_IMPORTED_MODULE_1__getOffsetParent__["a" /* default */];

domAlign.__getVisibleRectForElement = __WEBPACK_IMPORTED_MODULE_2__getVisibleRectForElement__["a" /* default */];

/* harmony default export */ __webpack_exports__["a"] = (domAlign);
/**
 *  2012-04-26 yiminghe@gmail.com
 *   - 优化智能对齐算法
 *   - 慎用 resizeXX
 *
 *  2011-07-13 yiminghe@gmail.com note:
 *   - 增加智能对齐，以及大小调整选项
 **/

/***/ }),
/* 134 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getTransformName;
/* harmony export (immutable) */ __webpack_exports__["e"] = setTransitionProperty;
/* harmony export (immutable) */ __webpack_exports__["c"] = getTransitionProperty;
/* harmony export (immutable) */ __webpack_exports__["b"] = getTransformXY;
/* harmony export (immutable) */ __webpack_exports__["d"] = setTransformXY;
var vendorPrefix = void 0;

var jsCssMap = {
  Webkit: '-webkit-',
  Moz: '-moz-',
  // IE did it wrong again ...
  ms: '-ms-',
  O: '-o-'
};

function getVendorPrefix() {
  if (vendorPrefix !== undefined) {
    return vendorPrefix;
  }
  vendorPrefix = '';
  var style = document.createElement('p').style;
  var testProp = 'Transform';
  for (var key in jsCssMap) {
    if (key + testProp in style) {
      vendorPrefix = key;
    }
  }
  return vendorPrefix;
}

function getTransitionName() {
  return getVendorPrefix() ? getVendorPrefix() + 'TransitionProperty' : 'transitionProperty';
}

function getTransformName() {
  return getVendorPrefix() ? getVendorPrefix() + 'Transform' : 'transform';
}

function setTransitionProperty(node, value) {
  var name = getTransitionName();
  if (name) {
    node.style[name] = value;
    if (name !== 'transitionProperty') {
      node.style.transitionProperty = value;
    }
  }
}

function setTransform(node, value) {
  var name = getTransformName();
  if (name) {
    node.style[name] = value;
    if (name !== 'transform') {
      node.style.transform = value;
    }
  }
}

function getTransitionProperty(node) {
  return node.style.transitionProperty || node.style[getTransitionName()];
}

function getTransformXY(node) {
  var style = window.getComputedStyle(node, null);
  var transform = style.getPropertyValue('transform') || style.getPropertyValue(getTransformName());
  if (transform && transform !== 'none') {
    var matrix = transform.replace(/[^0-9\-.,]/g, '').split(',');
    return { x: parseFloat(matrix[12] || matrix[4], 0), y: parseFloat(matrix[13] || matrix[5], 0) };
  }
  return {
    x: 0,
    y: 0
  };
}

var matrix2d = /matrix\((.*)\)/;
var matrix3d = /matrix3d\((.*)\)/;

function setTransformXY(node, xy) {
  var style = window.getComputedStyle(node, null);
  var transform = style.getPropertyValue('transform') || style.getPropertyValue(getTransformName());
  if (transform && transform !== 'none') {
    var arr = void 0;
    var match2d = transform.match(matrix2d);
    if (match2d) {
      match2d = match2d[1];
      arr = match2d.split(',').map(function (item) {
        return parseFloat(item, 10);
      });
      arr[4] = xy.x;
      arr[5] = xy.y;
      setTransform(node, 'matrix(' + arr.join(',') + ')');
    } else {
      var match3d = transform.match(matrix3d)[1];
      arr = match3d.split(',').map(function (item) {
        return parseFloat(item, 10);
      });
      arr[12] = xy.x;
      arr[13] = xy.y;
      setTransform(node, 'matrix3d(' + arr.join(',') + ')');
    }
  } else {
    setTransform(node, 'translateX(' + xy.x + 'px) translateY(' + xy.y + 'px) translateZ(0)');
  }
}

/***/ }),
/* 135 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__getOffsetParent__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__isAncestorFixed__ = __webpack_require__(136);




/**
 * 获得元素的显示部分的区域
 */
function getVisibleRectForElement(element) {
  var visibleRect = {
    left: 0,
    right: Infinity,
    top: 0,
    bottom: Infinity
  };
  var el = Object(__WEBPACK_IMPORTED_MODULE_1__getOffsetParent__["a" /* default */])(element);
  var doc = __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* default */].getDocument(element);
  var win = doc.defaultView || doc.parentWindow;
  var body = doc.body;
  var documentElement = doc.documentElement;

  // Determine the size of the visible rect by climbing the dom accounting for
  // all scrollable containers.
  while (el) {
    // clientWidth is zero for inline block elements in ie.
    if ((navigator.userAgent.indexOf('MSIE') === -1 || el.clientWidth !== 0) &&
    // body may have overflow set on it, yet we still get the entire
    // viewport. In some browsers, el.offsetParent may be
    // document.documentElement, so check for that too.
    el !== body && el !== documentElement && __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* default */].css(el, 'overflow') !== 'visible') {
      var pos = __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* default */].offset(el);
      // add border
      pos.left += el.clientLeft;
      pos.top += el.clientTop;
      visibleRect.top = Math.max(visibleRect.top, pos.top);
      visibleRect.right = Math.min(visibleRect.right,
      // consider area without scrollBar
      pos.left + el.clientWidth);
      visibleRect.bottom = Math.min(visibleRect.bottom, pos.top + el.clientHeight);
      visibleRect.left = Math.max(visibleRect.left, pos.left);
    } else if (el === body || el === documentElement) {
      break;
    }
    el = Object(__WEBPACK_IMPORTED_MODULE_1__getOffsetParent__["a" /* default */])(el);
  }

  // Set element position to fixed
  // make sure absolute element itself don't affect it's visible area
  // https://github.com/ant-design/ant-design/issues/7601
  var originalPosition = null;
  if (!__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* default */].isWindow(element) && element.nodeType !== 9) {
    originalPosition = element.style.position;
    var position = __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* default */].css(element, 'position');
    if (position === 'absolute') {
      element.style.position = 'fixed';
    }
  }

  var scrollX = __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* default */].getWindowScrollLeft(win);
  var scrollY = __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* default */].getWindowScrollTop(win);
  var viewportWidth = __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* default */].viewportWidth(win);
  var viewportHeight = __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* default */].viewportHeight(win);
  var documentWidth = documentElement.scrollWidth;
  var documentHeight = documentElement.scrollHeight;

  // Reset element position after calculate the visible area
  if (element.style) {
    element.style.position = originalPosition;
  }

  if (Object(__WEBPACK_IMPORTED_MODULE_2__isAncestorFixed__["a" /* default */])(element)) {
    // Clip by viewport's size.
    visibleRect.left = Math.max(visibleRect.left, scrollX);
    visibleRect.top = Math.max(visibleRect.top, scrollY);
    visibleRect.right = Math.min(visibleRect.right, scrollX + viewportWidth);
    visibleRect.bottom = Math.min(visibleRect.bottom, scrollY + viewportHeight);
  } else {
    // Clip by document's size.
    var maxVisibleWidth = Math.max(documentWidth, scrollX + viewportWidth);
    visibleRect.right = Math.min(visibleRect.right, maxVisibleWidth);

    var maxVisibleHeight = Math.max(documentHeight, scrollY + viewportHeight);
    visibleRect.bottom = Math.min(visibleRect.bottom, maxVisibleHeight);
  }

  return visibleRect.top >= 0 && visibleRect.left >= 0 && visibleRect.bottom > visibleRect.top && visibleRect.right > visibleRect.left ? visibleRect : null;
}

/* harmony default export */ __webpack_exports__["a"] = (getVisibleRectForElement);

/***/ }),
/* 136 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = isAncestorFixed;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(18);


function isAncestorFixed(element) {
  if (__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* default */].isWindow(element) || element.nodeType === 9) {
    return false;
  }

  var doc = __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* default */].getDocument(element);
  var body = doc.body;
  var parent = null;
  for (parent = element.parentNode; parent && parent !== body; parent = parent.parentNode) {
    var positionStyle = __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* default */].css(parent, 'position');
    if (positionStyle === 'fixed') {
      return true;
    }
  }
  return false;
}

/***/ }),
/* 137 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(18);


function adjustForViewport(elFuturePos, elRegion, visibleRect, overflow) {
  var pos = __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* default */].clone(elFuturePos);
  var size = {
    width: elRegion.width,
    height: elRegion.height
  };

  if (overflow.adjustX && pos.left < visibleRect.left) {
    pos.left = visibleRect.left;
  }

  // Left edge inside and right edge outside viewport, try to resize it.
  if (overflow.resizeWidth && pos.left >= visibleRect.left && pos.left + size.width > visibleRect.right) {
    size.width -= pos.left + size.width - visibleRect.right;
  }

  // Right edge outside viewport, try to move it.
  if (overflow.adjustX && pos.left + size.width > visibleRect.right) {
    // 保证左边界和可视区域左边界对齐
    pos.left = Math.max(visibleRect.right - size.width, visibleRect.left);
  }

  // Top edge outside viewport, try to move it.
  if (overflow.adjustY && pos.top < visibleRect.top) {
    pos.top = visibleRect.top;
  }

  // Top edge inside and bottom edge outside viewport, try to resize it.
  if (overflow.resizeHeight && pos.top >= visibleRect.top && pos.top + size.height > visibleRect.bottom) {
    size.height -= pos.top + size.height - visibleRect.bottom;
  }

  // Bottom edge outside viewport, try to move it.
  if (overflow.adjustY && pos.top + size.height > visibleRect.bottom) {
    // 保证上边界和可视区域上边界对齐
    pos.top = Math.max(visibleRect.bottom - size.height, visibleRect.top);
  }

  return __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* default */].mix(pos, size);
}

/* harmony default export */ __webpack_exports__["a"] = (adjustForViewport);

/***/ }),
/* 138 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(18);


function getRegion(node) {
  var offset = void 0;
  var w = void 0;
  var h = void 0;
  if (!__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* default */].isWindow(node) && node.nodeType !== 9) {
    offset = __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* default */].offset(node);
    w = __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* default */].outerWidth(node);
    h = __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* default */].outerHeight(node);
  } else {
    var win = __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* default */].getWindow(node);
    offset = {
      left: __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* default */].getWindowScrollLeft(win),
      top: __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* default */].getWindowScrollTop(win)
    };
    w = __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* default */].viewportWidth(win);
    h = __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* default */].viewportHeight(win);
  }
  offset.width = w;
  offset.height = h;
  return offset;
}

/* harmony default export */ __webpack_exports__["a"] = (getRegion);

/***/ }),
/* 139 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__getAlignOffset__ = __webpack_require__(140);


function getElFuturePos(elRegion, refNodeRegion, points, offset, targetOffset) {
  var p1 = Object(__WEBPACK_IMPORTED_MODULE_0__getAlignOffset__["a" /* default */])(refNodeRegion, points[1]);
  var p2 = Object(__WEBPACK_IMPORTED_MODULE_0__getAlignOffset__["a" /* default */])(elRegion, points[0]);
  var diff = [p2.left - p1.left, p2.top - p1.top];

  return {
    left: elRegion.left - diff[0] + offset[0] - targetOffset[0],
    top: elRegion.top - diff[1] + offset[1] - targetOffset[1]
  };
}

/* harmony default export */ __webpack_exports__["a"] = (getElFuturePos);

/***/ }),
/* 140 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * 获取 node 上的 align 对齐点 相对于页面的坐标
 */

function getAlignOffset(region, align) {
  var V = align.charAt(0);
  var H = align.charAt(1);
  var w = region.width;
  var h = region.height;

  var x = region.left;
  var y = region.top;

  if (V === 'c') {
    y += h / 2;
  } else if (V === 'b') {
    y += h;
  }

  if (H === 'c') {
    x += w / 2;
  } else if (H === 'r') {
    x += w;
  }

  return {
    left: x,
    top: y
  };
}

/* harmony default export */ __webpack_exports__["a"] = (getAlignOffset);

/***/ }),
/* 141 */
/***/ (function(module, exports) {

module.exports = function shallowEqual(objA, objB, compare, compareContext) {

    var ret = compare ? compare.call(compareContext, objA, objB) : void 0;

    if(ret !== void 0) {
        return !!ret;
    }

    if(objA === objB) {
        return true;
    }

    if(typeof objA !== 'object' || !objA ||
       typeof objB !== 'object' || !objB) {
        return false;
    }

    var keysA = Object.keys(objA);
    var keysB = Object.keys(objB);

    if(keysA.length !== keysB.length) {
        return false;
    }

    var bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);

    // Test for A's keys different from B.
    for(var idx = 0; idx < keysA.length; idx++) {

        var key = keysA[idx];

        if(!bHasOwnProperty(key)) {
            return false;
        }

        var valueA = objA[key];
        var valueB = objB[key];

        ret = compare ? compare.call(compareContext, valueA, valueB, key) : void 0;

        if(ret === false ||
           ret === void 0 && valueA !== valueB) {
            return false;
        }

    }

    return true;

};


/***/ }),
/* 142 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = isWindow;
function isWindow(obj) {
  /* eslint no-eq-null: 0 */
  /* eslint eqeqeq: 0 */
  return obj != null && obj == obj.window;
}

/***/ }),
/* 143 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_inherits__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_prop_types__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__LazyRenderBox__ = __webpack_require__(66);







var PopupInner = function (_Component) {
  __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_inherits___default()(PopupInner, _Component);

  function PopupInner() {
    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, PopupInner);

    return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_possibleConstructorReturn___default()(this, _Component.apply(this, arguments));
  }

  PopupInner.prototype.render = function render() {
    var props = this.props;
    var className = props.className;
    if (!props.visible) {
      className += ' ' + props.hiddenClassName;
    }
    return __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
      'div',
      {
        className: className,
        onMouseEnter: props.onMouseEnter,
        onMouseLeave: props.onMouseLeave,
        style: props.style
      },
      __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_5__LazyRenderBox__["a" /* default */],
        { className: props.prefixCls + '-content', visible: props.visible },
        props.children
      )
    );
  };

  return PopupInner;
}(__WEBPACK_IMPORTED_MODULE_3_react__["Component"]);

PopupInner.propTypes = {
  hiddenClassName: __WEBPACK_IMPORTED_MODULE_4_prop_types___default.a.string,
  className: __WEBPACK_IMPORTED_MODULE_4_prop_types___default.a.string,
  prefixCls: __WEBPACK_IMPORTED_MODULE_4_prop_types___default.a.string,
  onMouseEnter: __WEBPACK_IMPORTED_MODULE_4_prop_types___default.a.func,
  onMouseLeave: __WEBPACK_IMPORTED_MODULE_4_prop_types___default.a.func,
  children: __WEBPACK_IMPORTED_MODULE_4_prop_types___default.a.any
};


/* harmony default export */ __webpack_exports__["a"] = (PopupInner);

/***/ }),
/* 144 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react_dom__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_prop_types__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_prop_types__);








var ContainerRender = function (_React$Component) {
  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default()(ContainerRender, _React$Component);

  function ContainerRender() {
    var _ref;

    var _temp, _this, _ret;

    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, ContainerRender);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default()(this, (_ref = ContainerRender.__proto__ || Object.getPrototypeOf(ContainerRender)).call.apply(_ref, [this].concat(args))), _this), _this.removeContainer = function () {
      if (_this.container) {
        __WEBPACK_IMPORTED_MODULE_5_react_dom___default.a.unmountComponentAtNode(_this.container);
        _this.container.parentNode.removeChild(_this.container);
        _this.container = null;
      }
    }, _this.renderComponent = function (props, ready) {
      var _this$props = _this.props,
          visible = _this$props.visible,
          getComponent = _this$props.getComponent,
          forceRender = _this$props.forceRender,
          getContainer = _this$props.getContainer,
          parent = _this$props.parent;

      if (visible || parent._component || forceRender) {
        if (!_this.container) {
          _this.container = getContainer();
        }
        __WEBPACK_IMPORTED_MODULE_5_react_dom___default.a.unstable_renderSubtreeIntoContainer(parent, getComponent(props), _this.container, function callback() {
          if (ready) {
            ready.call(this);
          }
        });
      }
    }, _temp), __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default()(_this, _ret);
  }

  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(ContainerRender, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.autoMount) {
        this.renderComponent();
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (this.props.autoMount) {
        this.renderComponent();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.props.autoDestroy) {
        this.removeContainer();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return this.props.children({
        renderComponent: this.renderComponent,
        removeContainer: this.removeContainer
      });
    }
  }]);

  return ContainerRender;
}(__WEBPACK_IMPORTED_MODULE_4_react___default.a.Component);

ContainerRender.propTypes = {
  autoMount: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.bool,
  autoDestroy: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.bool,
  visible: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.bool,
  forceRender: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.bool,
  parent: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.any,
  getComponent: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.func.isRequired,
  getContainer: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.func.isRequired,
  children: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.func.isRequired
};
ContainerRender.defaultProps = {
  autoMount: true,
  autoDestroy: true,
  forceRender: false
};
/* harmony default export */ __webpack_exports__["a"] = (ContainerRender);

/***/ }),
/* 145 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react_dom__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_prop_types__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_prop_types__);








var Portal = function (_React$Component) {
  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default()(Portal, _React$Component);

  function Portal() {
    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, Portal);

    return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default()(this, (Portal.__proto__ || Object.getPrototypeOf(Portal)).apply(this, arguments));
  }

  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(Portal, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.createContainer();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      var didUpdate = this.props.didUpdate;

      if (didUpdate) {
        didUpdate(prevProps);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.removeContainer();
    }
  }, {
    key: 'createContainer',
    value: function createContainer() {
      this._container = this.props.getContainer();
      this.forceUpdate();
    }
  }, {
    key: 'removeContainer',
    value: function removeContainer() {
      if (this._container) {
        this._container.parentNode.removeChild(this._container);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      if (this._container) {
        return __WEBPACK_IMPORTED_MODULE_5_react_dom___default.a.createPortal(this.props.children, this._container);
      }
      return null;
    }
  }]);

  return Portal;
}(__WEBPACK_IMPORTED_MODULE_4_react___default.a.Component);

Portal.propTypes = {
  getContainer: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.func.isRequired,
  children: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.node.isRequired,
  didUpdate: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.func
};
/* harmony default export */ __webpack_exports__["a"] = (Portal);

/***/ }),
/* 146 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Tree__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__TreeNode__ = __webpack_require__(149);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__TreeNode__["a"]; });


__WEBPACK_IMPORTED_MODULE_0__Tree__["b" /* default */].TreeNode = __WEBPACK_IMPORTED_MODULE_1__TreeNode__["a" /* default */];


/* harmony default export */ __webpack_exports__["b"] = (__WEBPACK_IMPORTED_MODULE_0__Tree__["b" /* default */]);

/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = function() {};

if (process.env.NODE_ENV !== 'production') {
  warning = function(condition, format, args) {
    var len = arguments.length;
    args = new Array(len > 2 ? len - 2 : 0);
    for (var key = 2; key < len; key++) {
      args[key - 2] = arguments[key];
    }
    if (format === undefined) {
      throw new Error(
        '`warning(condition, format, ...args)` requires a warning ' +
        'message argument'
      );
    }

    if (format.length < 10 || (/^[s\W]*$/).test(format)) {
      throw new Error(
        'The warning format should be able to uniquely identify this ' +
        'warning. Please, use a more descriptive format than: ' + format
      );
    }

    if (!condition) {
      var argIndex = 0;
      var message = 'Warning: ' +
        format.replace(/%s/g, function() {
          return args[argIndex++];
        });
      if (typeof console !== 'undefined') {
        console.error(message);
      }
      try {
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        throw new Error(message);
      } catch(x) {}
    }
  };
}

module.exports = warning;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(17)))

/***/ }),
/* 148 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = getOffset;
/* harmony export (immutable) */ __webpack_exports__["e"] = traverseTreeNodes;
/* harmony export (immutable) */ __webpack_exports__["f"] = updateCheckState;
/* harmony export (immutable) */ __webpack_exports__["a"] = getCheck;
/* harmony export (immutable) */ __webpack_exports__["c"] = getStrictlyValue;
/* harmony export (immutable) */ __webpack_exports__["d"] = isPositionPrefix;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* eslint no-loop-func: 0*/


function getOffset(ele) {
  if (!ele.getClientRects().length) {
    return { top: 0, left: 0 };
  }

  var rect = ele.getBoundingClientRect();
  if (rect.width || rect.height) {
    var doc = ele.ownerDocument;
    var win = doc.defaultView;
    var docElem = doc.documentElement;

    return {
      top: rect.top + win.pageYOffset - docElem.clientTop,
      left: rect.left + win.pageXOffset - docElem.clientLeft
    };
  }

  return rect;
}

function traverseTreeNodes(treeNodes, callback) {
  var traverse = function traverse(subTreeNodes, level, parentsChildrenPos, parentPos) {
    if (Array.isArray(subTreeNodes)) {
      subTreeNodes = subTreeNodes.filter(function (item) {
        return !!item;
      });
    }
    __WEBPACK_IMPORTED_MODULE_0_react__["Children"].forEach(subTreeNodes, function (item, index) {
      var pos = level + '-' + index;
      parentsChildrenPos.push(pos); // Note: side effect

      var childrenPos = [];
      if (item.props.children && item.type && item.type.isTreeNode) {
        traverse(item.props.children, pos, childrenPos, pos);
      }
      callback(item, index, pos, item.key || pos, childrenPos, parentPos);
    });
  };
  traverse(treeNodes, 0, []);
}

function updateCheckState(obj, checkedPosition, checkIt) {
  var childrenLoop = function childrenLoop(parentObj) {
    parentObj.childrenPos.forEach(function (childPos) {
      var childObj = obj[childPos];
      // User click don't change disabled item checked state
      if (!childObj.disableCheckbox && !childObj.disabled) {
        childObj.halfChecked = false;
        childObj.checked = checkIt;
      }
      childrenLoop(childObj);
    });
  };

  childrenLoop(obj[checkedPosition]);

  var parentLoop = function parentLoop(childObj) {
    if (!childObj.parentPos) return;
    var parentObj = obj[childObj.parentPos];

    var childrenCount = parentObj.childrenPos.length;

    var checkedChildrenCount = 0;
    parentObj.childrenPos.forEach(function (childPos) {
      if (obj[childPos].disableCheckbox) {
        childrenCount -= 1;
        return;
      }
      if (obj[childPos].checked === true) checkedChildrenCount++;else if (obj[childPos].halfChecked === true) checkedChildrenCount += 0.5;
    });

    if (checkedChildrenCount === childrenCount) {
      parentObj.checked = true;
      parentObj.halfChecked = false;
    } else if (checkedChildrenCount > 0) {
      parentObj.halfChecked = true;
      parentObj.checked = false;
    } else {
      parentObj.checked = false;
      parentObj.halfChecked = false;
    }
    parentLoop(parentObj);
  };

  parentLoop(obj[checkedPosition]);
}

function getCheck(treeNodesStates) {
  var halfCheckedKeys = [];
  var checkedKeys = [];
  var checkedNodes = [];
  var checkedNodesPositions = [];
  Object.keys(treeNodesStates).forEach(function (item) {
    var itemObj = treeNodesStates[item];
    if (itemObj.checked) {
      checkedKeys.push(itemObj.key);
      checkedNodes.push(itemObj.node);
      checkedNodesPositions.push({ node: itemObj.node, pos: item });
    } else if (itemObj.halfChecked) {
      halfCheckedKeys.push(itemObj.key);
    }
  });
  return {
    halfCheckedKeys: halfCheckedKeys,
    checkedKeys: checkedKeys,
    checkedNodes: checkedNodes,
    checkedNodesPositions: checkedNodesPositions
  };
}

function getStrictlyValue(checkedKeys, halfChecked) {
  if (halfChecked) {
    return { checked: checkedKeys, halfChecked: halfChecked };
  }
  return checkedKeys;
}

function isPositionPrefix(smallPos, bigPos) {
  if (bigPos.length < smallPos.length) {
    return false;
  }
  // attention: "0-0-1" "0-0-10"
  if (bigPos.length > smallPos.length && bigPos.charAt(smallPos.length) !== '-') {
    return false;
  }
  return bigPos.substr(0, smallPos.length) === smallPos;
}

/***/ }),
/* 149 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_prop_types__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_classnames__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rc_animate__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rc_util_es_Children_toArray__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__Tree__ = __webpack_require__(68);











var defaultTitle = '---';

var TreeNode = function (_React$Component) {
  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default()(TreeNode, _React$Component);

  function TreeNode(props) {
    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, TreeNode);

    var _this = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default()(this, _React$Component.call(this, props));

    _this.onCheck = function () {
      _this.props.root.onCheck(_this);
    };

    _this.onMouseEnter = function (e) {
      e.preventDefault();
      _this.props.root.onMouseEnter(e, _this);
    };

    _this.onMouseLeave = function (e) {
      e.preventDefault();
      _this.props.root.onMouseLeave(e, _this);
    };

    _this.onContextMenu = function (e) {
      _this.props.root.onContextMenu(e, _this);
    };

    _this.onDragStart = function (e) {
      e.stopPropagation();
      _this.setState({
        dragNodeHighlight: true
      });
      _this.props.root.onDragStart(e, _this);
      try {
        // ie throw error
        // firefox-need-it
        e.dataTransfer.setData('text/plain', '');
      } catch (error) {
        // empty
      }
    };

    _this.onDragEnter = function (e) {
      e.preventDefault();
      e.stopPropagation();
      _this.props.root.onDragEnter(e, _this);
    };

    _this.onDragOver = function (e) {
      e.preventDefault();
      e.stopPropagation();
      _this.props.root.onDragOver(e, _this);
    };

    _this.onDragLeave = function (e) {
      e.stopPropagation();
      _this.props.root.onDragLeave(e, _this);
    };

    _this.onDrop = function (e) {
      e.preventDefault();
      e.stopPropagation();
      _this.setState({
        dragNodeHighlight: false
      });
      _this.props.root.onDrop(e, _this);
    };

    _this.onDragEnd = function (e) {
      e.stopPropagation();
      _this.setState({
        dragNodeHighlight: false
      });
      _this.props.root.onDragEnd(e, _this);
    };

    _this.onExpand = function () {
      var callbackPromise = _this.props.root.onExpand(_this);
      if (callbackPromise && typeof callbackPromise === 'object') {
        var setLoading = function setLoading(dataLoading) {
          _this.setState({ dataLoading: dataLoading });
        };
        setLoading(true);
        callbackPromise.then(function () {
          setLoading(false);
        }, function () {
          setLoading(false);
        });
      }
    };

    _this.saveSelectHandle = function (node) {
      _this.selectHandle = node;
    };

    _this.state = {
      dataLoading: false,
      dragNodeHighlight: false
    };
    return _this;
  }

  TreeNode.prototype.onSelect = function onSelect() {
    this.props.root.onSelect(this);
  };

  // keyboard event support
  TreeNode.prototype.onKeyDown = function onKeyDown(e) {
    e.preventDefault();
  };

  TreeNode.prototype.isSelectable = function isSelectable() {
    var props = this.props,
        context = this.context;

    return 'selectable' in props ? props.selectable : context.rcTree.selectable;
  };

  TreeNode.prototype.renderSwitcher = function renderSwitcher(props, expandedState) {
    var prefixCls = props.prefixCls;
    var switcherCls = __WEBPACK_IMPORTED_MODULE_6_classnames___default()(prefixCls + '-switcher', prefixCls + '-switcher_' + expandedState);
    return __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement('span', { className: switcherCls, onClick: this.onExpand });
  };

  TreeNode.prototype.renderCheckbox = function renderCheckbox(props) {
    var _checkboxCls;

    var prefixCls = props.prefixCls;
    var checkboxCls = (_checkboxCls = {}, _checkboxCls[prefixCls + '-checkbox'] = true, _checkboxCls);
    if (props.checked) {
      checkboxCls[prefixCls + '-checkbox-checked'] = true;
    } else if (props.halfChecked) {
      checkboxCls[prefixCls + '-checkbox-indeterminate'] = true;
    }
    var customEle = null;
    if (typeof props.checkable !== 'boolean') {
      customEle = props.checkable;
    }
    if (props.disabled || props.disableCheckbox) {
      checkboxCls[prefixCls + '-checkbox-disabled'] = true;
      return __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
        'span',
        { className: __WEBPACK_IMPORTED_MODULE_6_classnames___default()(checkboxCls) },
        customEle
      );
    }
    return __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
      'span',
      {
        className: __WEBPACK_IMPORTED_MODULE_6_classnames___default()(checkboxCls),
        onClick: this.onCheck
      },
      customEle
    );
  };

  TreeNode.prototype.renderChildren = function renderChildren(props) {
    var renderFirst = this.renderFirst;
    this.renderFirst = 1;
    var transitionAppear = true;
    if (!renderFirst && props.expanded) {
      transitionAppear = false;
    }
    var children = null;
    if (props.children) {
      children = Object(__WEBPACK_IMPORTED_MODULE_8_rc_util_es_Children_toArray__["a" /* default */])(props.children).filter(function (item) {
        return !!item;
      });
    }
    var newChildren = children;
    if (children && (Array.isArray(children) && children.length && children.every(function (item) {
      return item.type && item.type.isTreeNode;
    }) || children.type && children.type.isTreeNode)) {
      var _classNames;

      var animProps = {};
      if (props.openTransitionName) {
        animProps.transitionName = props.openTransitionName;
      } else if (typeof props.openAnimation === 'object') {
        animProps.animation = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, props.openAnimation);
        if (!transitionAppear) {
          delete animProps.animation.appear;
        }
      }
      var cls = __WEBPACK_IMPORTED_MODULE_6_classnames___default()(props.prefixCls + '-child-tree', (_classNames = {}, _classNames[props.prefixCls + '-child-tree-open'] = props.expanded, _classNames));
      newChildren = __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_7_rc_animate__["a" /* default */],
        __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, animProps, {
          showProp: 'data-expanded',
          transitionAppear: transitionAppear,
          component: ''
        }),
        !props.expanded ? null : __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
          'ul',
          { className: cls, 'data-expanded': props.expanded },
          __WEBPACK_IMPORTED_MODULE_4_react___default.a.Children.map(children, function (item, index) {
            return props.root.renderTreeNode(item, index, props.pos);
          }, props.root)
        )
      );
    }
    return newChildren;
  };

  TreeNode.prototype.render = function render() {
    var _iconEleCls,
        _this2 = this;

    var props = this.props;

    var prefixCls = props.prefixCls;
    var expandedState = props.expanded ? 'open' : 'close';
    var iconState = expandedState;

    var canRenderSwitcher = true;
    var content = props.title;
    var newChildren = this.renderChildren(props);
    if (!newChildren || newChildren === props.children) {
      // content = newChildren;
      newChildren = null;
      if (!props.loadData || props.isLeaf) {
        canRenderSwitcher = false;
        iconState = 'docu';
      }
    }
    // For performance, does't render children into dom when `!props.expanded` (move to Animate)
    // if (!props.expanded) {
    //   newChildren = null;
    // }

    var iconEleCls = (_iconEleCls = {}, _iconEleCls[prefixCls + '-iconEle'] = true, _iconEleCls[prefixCls + '-icon_loading'] = this.state.dataLoading, _iconEleCls[prefixCls + '-icon__' + iconState] = true, _iconEleCls);

    var selectHandle = function selectHandle() {
      var icon = props.showIcon || props.loadData && _this2.state.dataLoading ? __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement('span', { className: __WEBPACK_IMPORTED_MODULE_6_classnames___default()(iconEleCls) }) : null;
      var title = __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
        'span',
        { className: prefixCls + '-title' },
        content
      );
      var wrap = prefixCls + '-node-content-wrapper';
      var domProps = {
        className: wrap + ' ' + wrap + '-' + (iconState === expandedState ? iconState : 'normal'),
        onMouseEnter: _this2.onMouseEnter,
        onMouseLeave: _this2.onMouseLeave,
        onContextMenu: _this2.onContextMenu
      };
      if (!props.disabled) {
        if (props.selected || _this2.state.dragNodeHighlight) {
          domProps.className += ' ' + prefixCls + '-node-selected';
        }
        domProps.onClick = function (e) {
          if (_this2.isSelectable()) {
            e.preventDefault();
            _this2.onSelect();
          } else if (props.checkable && !props.disableCheckbox) {
            e.preventDefault();
            // && !props.disabled is checked on line 259
            _this2.onCheck();
          }
        };
        if (props.draggable) {
          domProps.className += ' draggable';
          domProps.draggable = true;
          domProps['aria-grabbed'] = true;
          domProps.onDragStart = _this2.onDragStart;
        }
      }
      return __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
        'span',
        __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({
          ref: _this2.saveSelectHandle,
          title: typeof content === 'string' ? content : ''
        }, domProps),
        icon,
        title
      );
    };

    var liProps = {};
    if (props.draggable) {
      liProps.onDragEnter = this.onDragEnter;
      liProps.onDragOver = this.onDragOver;
      liProps.onDragLeave = this.onDragLeave;
      liProps.onDrop = this.onDrop;
      liProps.onDragEnd = this.onDragEnd;
    }

    var disabledCls = '';
    var dragOverCls = '';
    if (props.disabled) {
      disabledCls = prefixCls + '-treenode-disabled';
    } else if (props.dragOver) {
      dragOverCls = 'drag-over';
    } else if (props.dragOverGapTop) {
      dragOverCls = 'drag-over-gap-top';
    } else if (props.dragOverGapBottom) {
      dragOverCls = 'drag-over-gap-bottom';
    }

    var filterCls = props.filterTreeNode(this) ? 'filter-node' : '';

    var renderNoopSwitcher = function renderNoopSwitcher() {
      return __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement('span', { className: prefixCls + '-switcher ' + prefixCls + '-switcher-noop' });
    };

    return __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
      'li',
      __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, liProps, {
        className: __WEBPACK_IMPORTED_MODULE_6_classnames___default()(props.className, disabledCls, dragOverCls, filterCls)
      }),
      canRenderSwitcher ? this.renderSwitcher(props, expandedState) : renderNoopSwitcher(),
      props.checkable ? this.renderCheckbox(props) : null,
      selectHandle(),
      newChildren
    );
  };

  return TreeNode;
}(__WEBPACK_IMPORTED_MODULE_4_react___default.a.Component);

TreeNode.propTypes = {
  prefixCls: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.string,
  disabled: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.bool,
  disableCheckbox: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.bool,
  expanded: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.bool,
  isLeaf: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.bool,
  root: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.object,
  onSelect: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.func
};
TreeNode.contextTypes = __WEBPACK_IMPORTED_MODULE_9__Tree__["a" /* contextTypes */];
TreeNode.defaultProps = {
  title: defaultTitle
};


TreeNode.isTreeNode = 1;

/* harmony default export */ __webpack_exports__["a"] = (TreeNode);

/***/ }),
/* 150 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SelectPropTypes; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_prop_types__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__strategies__ = __webpack_require__(46);



function nonEmptyStringType(props, propsName) {
  var value = props[propsName];
  if (typeof value !== 'string' || !value) {
    return new Error(); // Just a flag, so don't need message.
  }
}

function valueType(props, propName, componentName) {
  var labelInValueShape = __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.shape({
    value: nonEmptyStringType,
    label: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.node
  });
  if (props.labelInValue) {
    var validate = __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.arrayOf(labelInValueShape), labelInValueShape]);
    var error = validate.apply(undefined, arguments);
    if (error) {
      return new Error('Invalid prop `' + propName + '` supplied to `' + componentName + '`, ' + ('when `labelInValue` is `true`, `' + propName + '` should in ') + 'shape of `{ value: string, label?: string }`.');
    }
  } else if (props.treeCheckable && props.treeCheckStrictly) {
    var _validate = __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.arrayOf(labelInValueShape), labelInValueShape]);
    var _error = _validate.apply(undefined, arguments);
    if (_error) {
      return new Error('Invalid prop `' + propName + '` supplied to `' + componentName + '`, ' + 'when `treeCheckable` and `treeCheckStrictly` are `true`, ' + ('`' + propName + '` should in shape of `{ value: string, label?: string }`.'));
    }
  } else if (props.multiple && props[propName] === '') {
    return new Error('Invalid prop `' + propName + '` of type `string` supplied to `' + componentName + '`, ' + 'expected `array` when `multiple` is `true`.');
  } else {
    var _validate2 = __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.string), __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.string]);
    return _validate2.apply(undefined, arguments);
  }
}

var SelectPropTypes = {
  className: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.string,
  prefixCls: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.string,
  multiple: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.bool,
  filterTreeNode: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.any,
  showSearch: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.bool,
  disabled: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.bool,
  showArrow: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.bool,
  allowClear: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.bool,
  defaultOpen: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.bool,
  open: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.bool,
  transitionName: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.string,
  animation: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.string,
  choiceTransitionName: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.string,
  onClick: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func,
  onChange: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func,
  onSelect: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func,
  onDeselect: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func,
  onSearch: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func,
  searchPlaceholder: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.string,
  placeholder: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.any,
  inputValue: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.any,
  value: valueType,
  defaultValue: valueType,
  label: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.node,
  defaultLabel: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.any,
  labelInValue: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.bool,
  dropdownStyle: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.object,
  dropdownPopupAlign: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.object,
  onDropdownVisibleChange: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func,
  maxTagTextLength: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.number,
  showCheckedStrategy: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.oneOf([__WEBPACK_IMPORTED_MODULE_1__strategies__["a" /* SHOW_ALL */], __WEBPACK_IMPORTED_MODULE_1__strategies__["c" /* SHOW_PARENT */], __WEBPACK_IMPORTED_MODULE_1__strategies__["b" /* SHOW_CHILD */]]),
  treeCheckStrictly: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.bool,
  treeIcon: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.bool,
  treeLine: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.bool,
  treeDefaultExpandAll: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.bool,
  treeCheckable: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.bool, __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.node]),
  treeNodeLabelProp: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.string,
  treeNodeFilterProp: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.string,
  treeData: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.array,
  treeDataSimpleMode: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.bool, __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.object]),
  loadData: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func
};

/***/ })
/******/ ])["default"];
});
//# sourceMappingURL=rc-tree-select.js.map