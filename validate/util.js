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
  _exports.format = format;

  // eslint-disable-next-line
  function format(str) {
    var param = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return str.replace(/(\{([^}{]+?)})/g, function (a, b, key) {
      if (key in param) {
        return param[key];
      }

      return a;
    });
  }
});