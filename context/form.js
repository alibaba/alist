(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "react", "../core/form"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("react"), require("../core/form"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.form);
    global.unknown = mod.exports;
  }
})(this, function (_exports, _react, _form) {
  "use strict";

  var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _react = _interopRequireDefault(_react);
  _form = _interopRequireDefault(_form);

  var context = _react.default.createContext({
    form: new _form.default()
  });

  var _default = context;
  _exports.default = _default;
});