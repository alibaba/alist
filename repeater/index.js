(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "./factory", "./Repeater", "./SelectRepeater", "./ActionButton"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("./factory"), require("./Repeater"), require("./SelectRepeater"), require("./ActionButton"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.factory, global.Repeater, global.SelectRepeater, global.ActionButton);
    global.unknown = mod.exports;
  }
})(this, function (_exports, _factory, _Repeater, _SelectRepeater, _ActionButton) {
  "use strict";

  var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = wrapper;
  _factory = _interopRequireDefault(_factory);
  _Repeater = _interopRequireDefault(_Repeater);
  _SelectRepeater = _interopRequireDefault(_SelectRepeater);
  _ActionButton = _interopRequireDefault(_ActionButton);

  function wrapper(source) {
    return {
      TableRepeater: (0, _factory.default)(_Repeater.default, 'table', source),
      InlineRepeater: (0, _factory.default)(_Repeater.default, 'inline', source),
      Selectify: _SelectRepeater.default.bind(null, source),
      ActionButton: _ActionButton.default
    };
  }
});