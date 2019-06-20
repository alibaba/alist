(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "react", "../core/item"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("react"), require("../core/item"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.item);
    global.unknown = mod.exports;
  }
})(this, function (_exports, _react, _item) {
  "use strict";

  var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _react = _interopRequireDefault(_react);
  _item = _interopRequireDefault(_item);

  var context = _react.default.createContext({
    item: null
  });

  var _default = context;
  _exports.default = _default;
});