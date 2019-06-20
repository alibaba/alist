(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "@babel/runtime/helpers/objectSpread", "./DialogFormFactory"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("@babel/runtime/helpers/objectSpread"), require("./DialogFormFactory"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.objectSpread, global.DialogFormFactory);
    global.unknown = mod.exports;
  }
})(this, function (_exports, _objectSpread2, _DialogFormFactory) {
  "use strict";

  var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _objectSpread2 = _interopRequireDefault(_objectSpread2);
  _DialogFormFactory = _interopRequireDefault(_DialogFormFactory);

  var DialogFormWrapper = function DialogFormWrapper(NextSource) {
    var Dialog = NextSource.Dialog,
        Button = NextSource.Button;
    Dialog.show = Dialog.confirm;
    var compatiMap = {
      show: function show(options) {
        var width = options.width,
            className = options.className,
            _options$btnAlign = options.btnAlign,
            btnAlign = _options$btnAlign === void 0 ? 'left' : _options$btnAlign;
        return (0, _objectSpread2.default)({
          btnAlign: btnAlign
        }, options, {
          width: width,
          className: "".concat(className || '', " dialog-form-wrapper"),
          needWrapper: false,
          footer: function footer() {
            return null;
          }
        });
      },
      dialogInstance: function dialogInstance(_dialogInstance) {
        return _dialogInstance;
      },
      btnLoadingProps: 'loading'
    };
    return new _DialogFormFactory.default({
      Dialog: Dialog,
      Button: Button,
      compatiMap: compatiMap
    });
  };

  var _default = DialogFormWrapper;
  _exports.default = _default;
});