(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "@babel/runtime/helpers/objectSpread", "@babel/runtime/helpers/objectWithoutProperties", "@babel/runtime/helpers/classCallCheck", "@babel/runtime/helpers/defineProperty", "./DialogFormFactory"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("@babel/runtime/helpers/objectSpread"), require("@babel/runtime/helpers/objectWithoutProperties"), require("@babel/runtime/helpers/classCallCheck"), require("@babel/runtime/helpers/defineProperty"), require("./DialogFormFactory"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.objectSpread, global.objectWithoutProperties, global.classCallCheck, global.defineProperty, global.DialogFormFactory);
    global.unknown = mod.exports;
  }
})(this, function (_exports, _objectSpread2, _objectWithoutProperties2, _classCallCheck2, _defineProperty2, _DialogFormFactory) {
  "use strict";

  var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _objectSpread2 = _interopRequireDefault(_objectSpread2);
  _objectWithoutProperties2 = _interopRequireDefault(_objectWithoutProperties2);
  _classCallCheck2 = _interopRequireDefault(_classCallCheck2);
  _defineProperty2 = _interopRequireDefault(_defineProperty2);
  _DialogFormFactory = _interopRequireDefault(_DialogFormFactory);

  var CompatiMap = function CompatiMap(Dialog) {
    var _this = this;

    (0, _classCallCheck2.default)(this, CompatiMap);
    (0, _defineProperty2.default)(this, "getUniqueId", function () {
      return Math.random().toString(36).slice(2).slice(2);
    });
    (0, _defineProperty2.default)(this, "show", function (options) {
      var className = options.className,
          content = options.content,
          footer = options.footer,
          others = (0, _objectWithoutProperties2.default)(options, ["className", "content", "footer"]);

      var dialogId = _this.getUniqueId();

      var footerElements = null;

      if (footer) {
        footerElements = footer(_this.hide);
      }

      return (0, _objectSpread2.default)({}, others, {
        dialogId: dialogId,
        children: content,
        footer: footerElements,
        className: "".concat(className || '', " zent-dialog-form-wrapper")
      });
    });
    (0, _defineProperty2.default)(this, "dialogInstance", function (hide) {
      var dialogInstance = {};
      dialogInstance.hide = hide;
      return dialogInstance;
    });
    this.btnLoadingProps = 'loading';
    this.Dialog = Dialog;
  };

  var DialogFormWrapper = function DialogFormWrapper(ZentSource) {
    var Dialog = ZentSource.Dialog,
        Button = ZentSource.Button;
    Dialog.show = Dialog.openDialog;
    var compatiMap = new CompatiMap(Dialog);
    return new _DialogFormFactory.default({
      Dialog: Dialog,
      Button: Button,
      compatiMap: compatiMap
    });
  };

  var _default = DialogFormWrapper;
  _exports.default = _default;
});