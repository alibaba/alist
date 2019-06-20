(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "@babel/runtime/helpers/objectSpread", "@babel/runtime/helpers/objectWithoutProperties", "./DialogFormFactory"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("@babel/runtime/helpers/objectSpread"), require("@babel/runtime/helpers/objectWithoutProperties"), require("./DialogFormFactory"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.objectSpread, global.objectWithoutProperties, global.DialogFormFactory);
    global.unknown = mod.exports;
  }
})(this, function (_exports, _objectSpread2, _objectWithoutProperties2, _DialogFormFactory) {
  "use strict";

  var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _objectSpread2 = _interopRequireDefault(_objectSpread2);
  _objectWithoutProperties2 = _interopRequireDefault(_objectWithoutProperties2);
  _DialogFormFactory = _interopRequireDefault(_DialogFormFactory);

  var DialogFormWrapper = function DialogFormWrapper(AntdSource) {
    var Modal = AntdSource.Modal,
        Button = AntdSource.Button;
    Modal.show = Modal.confirm;
    var compatiMap = {
      show: function show(options) {
        var className = options.className,
            _options$btnAlign = options.btnAlign,
            btnAlign = _options$btnAlign === void 0 ? 'right' : _options$btnAlign,
            others = (0, _objectWithoutProperties2.default)(options, ["className", "btnAlign"]);
        return (0, _objectSpread2.default)({
          btnAlign: btnAlign
        }, others, {
          className: "".concat(className || '', " dialog-form-wrapper"),
          iconType: true
        });
      },
      dialogInstance: function dialogInstance(_dialogInstance) {
        _dialogInstance.hide = _dialogInstance.destroy;
        return _dialogInstance;
      },
      btnLoadingProps: 'loading'
    };
    return new _DialogFormFactory.default({
      Dialog: Modal,
      Button: Button,
      compatiMap: compatiMap
    });
  };

  var _default = DialogFormWrapper;
  _exports.default = _default;
});