(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.unknown = mod.exports;
  }
})(this, function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.ON_EVENT = _exports.INITIALIZED = _exports.HIDDEN = _exports.DISABLED = _exports.PREVIEW = _exports.EDIT = _exports.STATUS_ENUMS = _exports.STATUS_CHANGE = _exports.PROPS_CHANGE = _exports.ERROR_CHANGE = _exports.VALUE_CHANGE = _exports.FOCUS = _exports.BLUR = _exports.CHANGE = _exports.BASIC_EVENT = _exports.ANY_CHANGE = void 0;
  // 组件变更
  var ANY_CHANGE = 'ANY_CHANGE'; // 组件属性

  _exports.ANY_CHANGE = ANY_CHANGE;
  var CHANGE = 'change';
  _exports.CHANGE = CHANGE;
  var FOCUS = 'FOCUS';
  _exports.FOCUS = FOCUS;
  var BLUR = 'BLUR';
  _exports.BLUR = BLUR;
  var ON_EVENT = 'ON_EVENT'; // 基础属性变更

  _exports.ON_EVENT = ON_EVENT;
  var VALUE_CHANGE = 'VALUE_CHANGE';
  _exports.VALUE_CHANGE = VALUE_CHANGE;
  var ERROR_CHANGE = 'ERROR_CHANGE';
  _exports.ERROR_CHANGE = ERROR_CHANGE;
  var PROPS_CHANGE = 'PROPS_CHANGE';
  _exports.PROPS_CHANGE = PROPS_CHANGE;
  var STATUS_CHANGE = 'STATUS_CHANGE';
  _exports.STATUS_CHANGE = STATUS_CHANGE;
  var INITIALIZED = 'INITIALIZED';
  _exports.INITIALIZED = INITIALIZED;
  var GLOBAL_STATUS_CHANGE = 'GLOBAL_STATUS_CHANGE';
  var BASIC_EVENT = {
    value: VALUE_CHANGE,
    error: ERROR_CHANGE,
    props: PROPS_CHANGE,
    status: STATUS_CHANGE,
    globalStatus: GLOBAL_STATUS_CHANGE
  }; // 状态枚举

  _exports.BASIC_EVENT = BASIC_EVENT;
  var EDIT = 'edit';
  _exports.EDIT = EDIT;
  var PREVIEW = 'preview';
  _exports.PREVIEW = PREVIEW;
  var DISABLED = 'disabled';
  _exports.DISABLED = DISABLED;
  var HIDDEN = 'hidden';
  _exports.HIDDEN = HIDDEN;
  var STATUS_ENUMS = new Set([EDIT, PREVIEW, DISABLED, HIDDEN]);
  _exports.STATUS_ENUMS = STATUS_ENUMS;
});