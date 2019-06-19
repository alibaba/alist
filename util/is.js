(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "../static/index"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("../static/index"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.index);
    global.unknown = mod.exports;
  }
})(this, function (_exports, _index) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.isValidStatus = _exports.isFunction = _exports.isPromise = _exports.isSingleItemSet = _exports.isInvalidVal = _exports.isObject = void 0;

  var isObject = function isObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]';
  };

  _exports.isObject = isObject;

  var isPromise = function isPromise(p) {
    return p && p.then && typeof p.then === 'function';
  };

  _exports.isPromise = isPromise;

  var isInvalidVal = function isInvalidVal(val) {
    return typeof val === 'number' ? false : !val;
  };

  _exports.isInvalidVal = isInvalidVal;

  var isSingleItemSet = function isSingleItemSet(arg) {
    return arg.length >= 3 && typeof arg[1] === 'string';
  };

  _exports.isSingleItemSet = isSingleItemSet;

  var isFunction = function isFunction(func) {
    return typeof func === 'function';
  };

  _exports.isFunction = isFunction;

  var isValidStatus = function isValidStatus(status) {
    return typeof status === 'function' || [_index.EDIT, _index.PREVIEW, _index.DISABLED, _index.HIDDEN].indexOf(status) !== -1;
  };

  _exports.isValidStatus = isValidStatus;
});