(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "./index"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("./index"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.index);
    global.unknown = mod.exports;
  }
})(this, function (_exports, _index) {
  "use strict";

  var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _index = _interopRequireDefault(_index);
  var _default = _index.default;
  _exports.default = _default;
});