(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "react", "prop-types"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("react"), require("prop-types"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.propTypes);
    global.unknown = mod.exports;
  }
})(this, function (_exports, _react, _propTypes) {
  "use strict";

  var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _react = _interopRequireDefault(_react);
  _propTypes = _interopRequireDefault(_propTypes);

  function TableCom(_ref) {
    var header = _ref.header,
        children = _ref.children,
        hasHeader = _ref.hasHeader;
    return _react.default.createElement("table", null, hasHeader ? _react.default.createElement("thead", null, _react.default.createElement("tr", null, header)) : null, _react.default.createElement("tbody", null, children));
  }

  TableCom.propTypes = {
    header: _propTypes.default.any,
    children: _propTypes.default.any,
    hasHeader: _propTypes.default.bool
  };
  var _default = TableCom;
  _exports.default = _default;
});