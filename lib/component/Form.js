(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "@babel/runtime/helpers/extends", "@babel/runtime/helpers/objectSpread", "@babel/runtime/helpers/classCallCheck", "@babel/runtime/helpers/createClass", "@babel/runtime/helpers/possibleConstructorReturn", "@babel/runtime/helpers/getPrototypeOf", "@babel/runtime/helpers/assertThisInitialized", "@babel/runtime/helpers/inherits", "@babel/runtime/helpers/defineProperty", "react", "prop-types", "deep-equal", "../core/form", "../static", "../context/form", "../context/if", "../context/item", "../context/dialogForm"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("@babel/runtime/helpers/extends"), require("@babel/runtime/helpers/objectSpread"), require("@babel/runtime/helpers/classCallCheck"), require("@babel/runtime/helpers/createClass"), require("@babel/runtime/helpers/possibleConstructorReturn"), require("@babel/runtime/helpers/getPrototypeOf"), require("@babel/runtime/helpers/assertThisInitialized"), require("@babel/runtime/helpers/inherits"), require("@babel/runtime/helpers/defineProperty"), require("react"), require("prop-types"), require("deep-equal"), require("../core/form"), require("../static"), require("../context/form"), require("../context/if"), require("../context/item"), require("../context/dialogForm"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global._extends, global.objectSpread, global.classCallCheck, global.createClass, global.possibleConstructorReturn, global.getPrototypeOf, global.assertThisInitialized, global.inherits, global.defineProperty, global.react, global.propTypes, global.deepEqual, global.form, global._static, global.form, global._if, global.item, global.dialogForm);
    global.unknown = mod.exports;
  }
})(this, function (_exports, _extends2, _objectSpread2, _classCallCheck2, _createClass2, _possibleConstructorReturn2, _getPrototypeOf2, _assertThisInitialized2, _inherits2, _defineProperty2, _react, _propTypes, _deepEqual, _form, _static, _form2, _if, _item, _dialogForm) {
  "use strict";

  var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _extends2 = _interopRequireDefault(_extends2);
  _objectSpread2 = _interopRequireDefault(_objectSpread2);
  _classCallCheck2 = _interopRequireDefault(_classCallCheck2);
  _createClass2 = _interopRequireDefault(_createClass2);
  _possibleConstructorReturn2 = _interopRequireDefault(_possibleConstructorReturn2);
  _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf2);
  _assertThisInitialized2 = _interopRequireDefault(_assertThisInitialized2);
  _inherits2 = _interopRequireDefault(_inherits2);
  _defineProperty2 = _interopRequireDefault(_defineProperty2);
  _react = _interopRequireDefault(_react);
  _propTypes = _interopRequireDefault(_propTypes);
  _deepEqual = _interopRequireDefault(_deepEqual);
  _form = _interopRequireDefault(_form);
  _form2 = _interopRequireDefault(_form2);
  _if = _interopRequireDefault(_if);
  _item = _interopRequireDefault(_item);
  _dialogForm = _interopRequireDefault(_dialogForm);

  var noop = function noop() {};

  var noopEle = function noopEle() {
    return null;
  };

  var Component = _react.default.PureComponent;

  var Form =
  /*#__PURE__*/
  function (_Component) {
    (0, _inherits2.default)(Form, _Component);

    function Form(props) {
      var _this;

      (0, _classCallCheck2.default)(this, Form);
      _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Form).call(this, props));
      (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onChange", function (val, fireKey) {
        _this.props.onChange(val, fireKey, _this.core);
      });
      (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "getTopForm", function () {
        var top = _this.core;
        var current = _this.core;

        while (current.parent) {
          if (current.parent.form) {
            current = current.parent.form;
            top = current;
          }
        }

        return top;
      });
      (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "getLeapNestProps", function () {
        var result = {};

        if (_this.item) {
          var _this$item = _this.item,
              predictChildForm = _this$item.predictChildForm,
              jsx = _this$item.jsx,
              form = _this$item.form,
              name = _this$item.name;

          if (!predictChildForm) {// if (jsx) result.onChange = jsx.onChange;
            // if (form && name) result.value = form.getValue(name);
          }
        }

        return result;
      });
      (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "renderFooter", function () {
        var _this$props = _this.props,
            layout = _this$props.layout,
            taskPayload = _this$props.taskPayload;
        var dialogFooter = _this.props.dialogFooter;
        return dialogFooter((0, _objectSpread2.default)({
          layout: layout
        }, taskPayload || {}));
      });
      var item = props.item,
          value = props.value,
          onChange = props.onChange,
          repeaterRow = props.repeaterRow,
          propValidate = props.validate; // 初始化core

      if (props.core) {
        _this.core = props.core;
      } else {
        // 无core则自定义生成不需要处理onChange, 使用jsx上的
        var mrProps = (0, _objectSpread2.default)({}, props);
        delete mrProps.onChange;
        _this.core = new _form.default(mrProps);
      } // 绑定事件和视图


      _this.didMount = false;
      _this.core.jsx = (0, _assertThisInitialized2.default)(_this);

      _this.core.on(_static.CHANGE, _this.onChange);

      _this.core.on(_static.FOCUS, _this.props.onFocus);

      _this.core.on(_static.BLUR, _this.props.onBlur);

      _this.core.on(_static.ON_EVENT, _this.props.onEvent); // 嵌套Form


      if (item) {
        _this.item = item;
        _this.core.parent = item;

        if (repeaterRow || _this.core.repeaterRowCore) {// repeater 最外层表单不应该影响 validate，尤其是自定义视图view时
        } else {
          item.addSubField({
            validate: propValidate || _this.core.validate.bind(_this.core)
          });
        }

        if (!_this.item.predictChildForm) {// this.core.value = this.item.value; // 补齐
        }
      }

      _this.core.top = _this.getTopForm();
      return _this;
    }

    (0, _createClass2.default)(Form, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        var _this$props2 = this.props,
            validateConfig = _this$props2.validateConfig,
            map = _this$props2.map,
            value = _this$props2.value,
            core = _this$props2.core;
        this.didMount = true;
        this.props.onMount(this.core); // 返回core

        this.props.onDialogMount(this.core);
        this.core.emit(_static.INITIALIZED, this.core); // 校验规则

        if ('validateConfig' in this.props && validateConfig) {
          this.core.setValidateConfig(validateConfig);
        } else if (core && 'validateConfig' in core && core.validateConfig) {
          this.core.setValidateConfig(core.validateConfig);
        } // 初始化赋值，map为格式化方法


        if ('value' in this.props && value) {
          this.core.setValueSilent(map(value));
        } // 静默更新初始化interceptor


        if (Object.keys(this.core.interceptor).length > 0) {
          this.core.setValueSilent({});
        } // 嵌套绑定当前form


        if (this.item) {
          this.item.bindForm(this.core);
        } // 强制渲染一次


        this.forceUpdate();
      }
    }, {
      key: "componentWillReceiveProps",
      value: function componentWillReceiveProps(nextProps) {
        // 根据属性来配置
        if (!(0, _deepEqual.default)(nextProps.value, this.props.value)) {
          if ([null, undefined].indexOf(nextProps.value) !== -1) {
            this.core.reset();
          } else {
            this.core.setValueSilent(nextProps.value);
          }
        }

        if (!(0, _deepEqual.default)(nextProps.props, this.props.props)) {
          this.core.setProps(nextProps.props);
        }

        if (!(0, _deepEqual.default)(nextProps.status, this.props.status)) {
          this.core.setStatus(nextProps.status);
        }

        if (!(0, _deepEqual.default)(nextProps.globalStatus, this.props.globalStatus)) {
          this.core.setGlobalStatus(nextProps.globalStatus);
        }

        if (!(0, _deepEqual.default)(nextProps.error, this.props.error)) {
          this.core.setError(nextProps.error);
        }
      } // 核心变化时，通知jsx属性绑定的onChange

    }, {
      key: "render",
      value: function render() {
        // 默认布局为垂直布局
        var _this$props3 = this.props,
            Com = _this$props3.Com,
            full = _this$props3.full,
            _this$props3$style = _this$props3.style,
            style = _this$props3$style === void 0 ? {} : _this$props3$style,
            children = _this$props3.children,
            _this$props3$classNam = _this$props3.className,
            className = _this$props3$classNam === void 0 ? '' : _this$props3$classNam,
            _this$props3$directio = _this$props3.direction,
            direction = _this$props3$directio === void 0 ? 'vertical' : _this$props3$directio;
        var contextValue = {
          form: this.core
        };
        var leapNestProps = this.getLeapNestProps();
        return _react.default.createElement(_if.default.Provider, {
          value: null
        }, _react.default.createElement(_form2.default.Provider, {
          value: contextValue
        }, _react.default.createElement(Com, (0, _extends2.default)({
          style: style,
          className: "no-form no-form-".concat(direction, " ").concat(className, " no-form-").concat(full ? 'full' : 'auto')
        }, leapNestProps), children, this.renderFooter())));
      }
    }]);
    return Form;
  }(Component); // props是外部props，继承item时需要带上


  (0, _defineProperty2.default)(Form, "propTypes", {
    onChange: _propTypes.default.func,
    onFocus: _propTypes.default.func,
    onBlur: _propTypes.default.func,
    onMount: _propTypes.default.func,
    map: _propTypes.default.func,
    full: _propTypes.default.bool,
    colon: _propTypes.default.bool,
    style: _propTypes.default.object,
    children: _propTypes.default.any,
    className: _propTypes.default.any,
    direction: _propTypes.default.string,
    dialogFooter: _propTypes.default.func,
    onDialogMount: _propTypes.default.func,
    core: _propTypes.default.instanceOf(_form.default),
    validateConfig: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.array]),
    value: _propTypes.default.object,
    error: _propTypes.default.object,
    status: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.string]),
    globalStatus: _propTypes.default.string,
    props: _propTypes.default.object,
    Com: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.func])
  });
  (0, _defineProperty2.default)(Form, "defaultProps", {
    onChange: noop,
    onFocus: noop,
    onBlur: noop,
    onMount: noop,
    onEvent: noop,
    onDialogMount: noop,
    dialogFooter: noopEle,
    colon: true,
    map: function map(v) {
      return v;
    },
    core: null,
    validateConfig: null,
    value: null,
    error: null,
    status: _static.STATUS_ENUMS.EDIT,
    globalStatus: _static.STATUS_ENUMS.EDIT,
    props: null,
    Com: 'div'
  });

  var ConnectForm = function ConnectForm(props) {
    return _react.default.createElement(_item.default.Consumer, null, function (upperItem) {
      var _ref = upperItem || {},
          item = _ref.item;

      return _react.default.createElement(_dialogForm.default.Consumer, null, function (dialogProps) {
        var rootFormDialogProps = item ? {} : dialogProps || {};
        return _react.default.createElement(Form, (0, _extends2.default)({}, props, {
          item: item
        }, rootFormDialogProps));
      });
    });
  };

  ConnectForm.displayName = 'NoForm';
  var _default = ConnectForm;
  _exports.default = _default;
});