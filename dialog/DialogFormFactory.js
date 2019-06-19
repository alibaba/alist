(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "@babel/runtime/helpers/extends", "@babel/runtime/helpers/createClass", "@babel/runtime/helpers/possibleConstructorReturn", "@babel/runtime/helpers/getPrototypeOf", "@babel/runtime/helpers/assertThisInitialized", "@babel/runtime/helpers/inherits", "@babel/runtime/helpers/objectWithoutProperties", "@babel/runtime/helpers/objectSpread", "@babel/runtime/helpers/classCallCheck", "@babel/runtime/helpers/defineProperty", "react", "prop-types"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("@babel/runtime/helpers/extends"), require("@babel/runtime/helpers/createClass"), require("@babel/runtime/helpers/possibleConstructorReturn"), require("@babel/runtime/helpers/getPrototypeOf"), require("@babel/runtime/helpers/assertThisInitialized"), require("@babel/runtime/helpers/inherits"), require("@babel/runtime/helpers/objectWithoutProperties"), require("@babel/runtime/helpers/objectSpread"), require("@babel/runtime/helpers/classCallCheck"), require("@babel/runtime/helpers/defineProperty"), require("react"), require("prop-types"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global._extends, global.createClass, global.possibleConstructorReturn, global.getPrototypeOf, global.assertThisInitialized, global.inherits, global.objectWithoutProperties, global.objectSpread, global.classCallCheck, global.defineProperty, global.react, global.propTypes);
    global.unknown = mod.exports;
  }
})(this, function (_exports, _extends2, _createClass2, _possibleConstructorReturn2, _getPrototypeOf2, _assertThisInitialized2, _inherits2, _objectWithoutProperties2, _objectSpread2, _classCallCheck2, _defineProperty2, _react, _propTypes) {
  "use strict";

  var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _extends2 = _interopRequireDefault(_extends2);
  _createClass2 = _interopRequireDefault(_createClass2);
  _possibleConstructorReturn2 = _interopRequireDefault(_possibleConstructorReturn2);
  _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf2);
  _assertThisInitialized2 = _interopRequireDefault(_assertThisInitialized2);
  _inherits2 = _interopRequireDefault(_inherits2);
  _objectWithoutProperties2 = _interopRequireDefault(_objectWithoutProperties2);
  _objectSpread2 = _interopRequireDefault(_objectSpread2);
  _classCallCheck2 = _interopRequireDefault(_classCallCheck2);
  _defineProperty2 = _interopRequireDefault(_defineProperty2);
  _react = _interopRequireDefault(_react);
  _propTypes = _interopRequireDefault(_propTypes);

  var noop = function noop() {};

  var isPromise = function isPromise(content) {
    return Promise.resolve(content) === content;
  };

  var DialogForm = function DialogForm(options, getDialogInstance) {
    var _this = this;

    (0, _classCallCheck2.default)(this, DialogForm);
    (0, _defineProperty2.default)(this, "hide", function () {
      var dialogInstance = _this.getDialogInstance();

      dialogInstance.hide();
    });
    (0, _defineProperty2.default)(this, "handleOk", function () {
      var _this$options = _this.options,
          _this$options$onOk = _this$options.onOk,
          onOk = _this$options$onOk === void 0 ? noop : _this$options$onOk,
          enableValidate = _this$options.enableValidate;
      var values = {};
      if (_this.dialogCore) values = _this.dialogCore.getValues();
      var params = [values, _this.hide, _this.dialogCore];

      if (enableValidate && _this.dialogCore) {
        return _this.dialogCore.validate(function (err) {
          if (!err) return onOk.apply(void 0, params);
          return null;
        });
      }

      return onOk.apply(void 0, params);
    });
    (0, _defineProperty2.default)(this, "renderFooter", function (Button) {
      var _this$options2 = _this.options,
          btnAlign = _this$options2.btnAlign,
          _this$options2$hasCan = _this$options2.hasCancel,
          hasCancel = _this$options2$hasCan === void 0 ? true : _this$options2$hasCan,
          footer = _this$options2.footer,
          _this$options2$okText = _this$options2.okText,
          okText = _this$options2$okText === void 0 ? 'OK' : _this$options2$okText,
          _this$options2$cancel = _this$options2.cancelText,
          cancelText = _this$options2$cancel === void 0 ? 'Cancel' : _this$options2$cancel,
          btnLoadingPropsName = _this$options2.btnLoadingPropsName;
      var footerElement = null;

      if (footer) {
        footerElement = footer(_this.hide);
      } else {
        footerElement = _react.default.createElement("div", {
          key: "footer",
          className: "ant-custom-btns noform-dialog-custom-btns noform-dialog-btns-align-".concat(btnAlign)
        }, _react.default.createElement(ActionButton, {
          btnLoadingPropsName: btnLoadingPropsName,
          btnOrigin: Button,
          type: "primary",
          onClick: _this.handleOk
        }, okText), hasCancel ? _react.default.createElement("span", {
          style: {
            marginRight: '12px'
          }
        }) : null, hasCancel ? _react.default.createElement(ActionButton, {
          btnLoadingPropsName: btnLoadingPropsName,
          btnOrigin: Button,
          onClick: _this.hide
        }, cancelText) : null);
      }

      return footerElement;
    });
    (0, _defineProperty2.default)(this, "renderContent", function (Button) {
      var content = _this.options.content;
      var formInstance = null;

      var footer = _this.renderFooter(Button);

      if (typeof content === 'function') {
        formInstance = content(footer);
      } else {
        formInstance = content;
      }

      var formInstanceProps = formInstance.props;
      var onMount = formInstanceProps.onMount,
          children = formInstanceProps.children,
          propCore = formInstanceProps.core;

      var hijackCore = function hijackCore(core) {
        if (!propCore) {
          _this.dialogCore = core;
        }

        if (onMount) {
          onMount(core);
        }
      };

      _this.dialogCore = propCore;
      var mixFooterContent = [].concat(children, footer);
      var onMountProps = {}; // 只允许本身是NoForm以及方法返回的是NoForm

      if (formInstance.displayName === 'NoForm' || formInstance.type && formInstance.type.displayName === 'NoForm') {
        onMountProps.onMount = hijackCore;
      }

      var modalContent = _react.default.cloneElement(formInstance, (0, _objectSpread2.default)({}, formInstanceProps, onMountProps, {
        children: mixFooterContent
      }));

      return modalContent;
    });
    this.options = options;
    this.dialogCore = null;
    this.getDialogInstance = getDialogInstance;
  };

  var DialogFormFactory = function DialogFormFactory(_ref) {
    var _this2 = this;

    var _Dialog = _ref.Dialog,
        _Button = _ref.Button,
        _compatiMap = _ref.compatiMap;
    (0, _classCallCheck2.default)(this, DialogFormFactory);
    (0, _defineProperty2.default)(this, "show", function (options) {
      var Dialog = _this2.Dialog,
          Button = _this2.Button,
          compatiMap = _this2.compatiMap;

      if (!Dialog || !Button) {
        throw Error('DialogForm initialize failed, make sure you have passed antd components');
      }

      var title = options.title,
          className = options.className,
          width = options.width,
          others = (0, _objectWithoutProperties2.default)(options, ["title", "className", "width"]);
      var dialogInstance = null; // 按钮loading属性

      var btnLoadingPropsName = compatiMap.btnLoadingProps || 'loading';
      var dialogForm = new DialogForm((0, _objectSpread2.default)({}, options, {
        btnLoadingPropsName: btnLoadingPropsName
      }), function () {
        return dialogInstance;
      });
      var content = dialogForm.renderContent(Button); // 入口属性

      var entryProps = compatiMap.show((0, _objectSpread2.default)({}, options, {
        title: title,
        content: content
      }));
      dialogInstance = Dialog.show((0, _objectSpread2.default)({}, others, entryProps));
      dialogInstance = compatiMap.dialogInstance(dialogInstance);
      return dialogInstance;
    });
    this.Dialog = _Dialog;
    this.Button = _Button;
    this.compatiMap = _compatiMap;

    var show = _Dialog.show,
        _others = (0, _objectWithoutProperties2.default)(_Dialog, ["show"]);

    Object.keys(_others).forEach(function (key) {
      _this2[key] = _others[key];
    });
  };

  _exports.default = DialogFormFactory;

  var ActionButton =
  /*#__PURE__*/
  function (_React$Component) {
    (0, _inherits2.default)(ActionButton, _React$Component);

    function ActionButton(props, context) {
      var _this3;

      (0, _classCallCheck2.default)(this, ActionButton);
      _this3 = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ActionButton).call(this, props, context));
      (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this3), "enableLoading", function () {
        var onLoading = _this3.props.onLoading;

        if (onLoading) {
          onLoading();
        }

        _this3.setState({
          isLoading: true
        });
      });
      (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this3), "disableLoading", function () {
        var offLoading = _this3.props.offLoading;

        if (offLoading) {
          offLoading();
        }

        _this3.setState({
          isLoading: false
        });
      });
      (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this3), "handleAction", function () {
        var onClick = _this3.props.onClick;

        if (typeof onClick === 'function') {
          _this3.enableLoading();

          var actionResult = onClick();

          if (isPromise(actionResult)) {
            actionResult.then(_this3.disableLoading, _this3.disableLoading).catch(_this3.disableLoading);
          } else {
            _this3.disableLoading();
          }
        }
      });
      _this3.state = {
        isLoading: false
      };
      return _this3;
    }

    (0, _createClass2.default)(ActionButton, [{
      key: "render",
      value: function render() {
        var _this$props = this.props,
            onClick = _this$props.onClick,
            _this$props$btnLoadin = _this$props.btnLoadingPropsName,
            btnLoadingPropsName = _this$props$btnLoadin === void 0 ? 'loading' : _this$props$btnLoadin,
            btnOrigin = _this$props.btnOrigin,
            others = (0, _objectWithoutProperties2.default)(_this$props, ["onClick", "btnLoadingPropsName", "btnOrigin"]);
        var Button = btnOrigin;
        var isLoading = this.state.isLoading;
        var btnLoadingProps = (0, _defineProperty2.default)({}, btnLoadingPropsName, isLoading);
        return _react.default.createElement(Button, (0, _extends2.default)({
          onClick: this.handleAction
        }, others, btnLoadingProps));
      }
    }]);
    return ActionButton;
  }(_react.default.Component);

  (0, _defineProperty2.default)(ActionButton, "propTypes", {
    onLoading: _propTypes.default.func,
    offLoading: _propTypes.default.func,
    onClick: _propTypes.default.func,
    btnLoadingPropsName: _propTypes.default.string,
    btnOrigin: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.func])
  });
});