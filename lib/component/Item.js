(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "@babel/runtime/helpers/extends", "react", "./FormItem"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("@babel/runtime/helpers/extends"), require("react"), require("./FormItem"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global._extends, global.react, global.FormItem);
    global.unknown = mod.exports;
  }
})(this, function (_exports, _extends2, _react, _FormItem) {
  "use strict";

  var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _extends2 = _interopRequireDefault(_extends2);
  _react = _interopRequireDefault(_react);
  _FormItem = _interopRequireDefault(_FormItem);

  var Item = function Item(props) {
    return _react.default.createElement(_FormItem.default, (0, _extends2.default)({}, props, {
      noLayout: true
    }));
  };

  Item.displayName = 'Item';
  var _default = Item;
  _exports.default = _default;
});