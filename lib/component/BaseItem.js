(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "@babel/runtime/helpers/objectSpread", "@babel/runtime/helpers/objectWithoutProperties", "@babel/runtime/helpers/classCallCheck", "@babel/runtime/helpers/createClass", "@babel/runtime/helpers/possibleConstructorReturn", "@babel/runtime/helpers/getPrototypeOf", "@babel/runtime/helpers/assertThisInitialized", "@babel/runtime/helpers/inherits", "@babel/runtime/helpers/defineProperty", "react", "../static"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("@babel/runtime/helpers/objectSpread"), require("@babel/runtime/helpers/objectWithoutProperties"), require("@babel/runtime/helpers/classCallCheck"), require("@babel/runtime/helpers/createClass"), require("@babel/runtime/helpers/possibleConstructorReturn"), require("@babel/runtime/helpers/getPrototypeOf"), require("@babel/runtime/helpers/assertThisInitialized"), require("@babel/runtime/helpers/inherits"), require("@babel/runtime/helpers/defineProperty"), require("react"), require("../static"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.objectSpread, global.objectWithoutProperties, global.classCallCheck, global.createClass, global.possibleConstructorReturn, global.getPrototypeOf, global.assertThisInitialized, global.inherits, global.defineProperty, global.react, global._static);
    global.unknown = mod.exports;
  }
})(this, function (_exports, _objectSpread2, _objectWithoutProperties2, _classCallCheck2, _createClass2, _possibleConstructorReturn2, _getPrototypeOf2, _assertThisInitialized2, _inherits2, _defineProperty2, _react, _static) {
  "use strict";

  var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _objectSpread2 = _interopRequireDefault(_objectSpread2);
  _objectWithoutProperties2 = _interopRequireDefault(_objectWithoutProperties2);
  _classCallCheck2 = _interopRequireDefault(_classCallCheck2);
  _createClass2 = _interopRequireDefault(_createClass2);
  _possibleConstructorReturn2 = _interopRequireDefault(_possibleConstructorReturn2);
  _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf2);
  _assertThisInitialized2 = _interopRequireDefault(_assertThisInitialized2);
  _inherits2 = _interopRequireDefault(_inherits2);
  _defineProperty2 = _interopRequireDefault(_defineProperty2);
  _react = _interopRequireDefault(_react);

  var BaseItem =
  /*#__PURE__*/
  function (_React$Component) {
    (0, _inherits2.default)(BaseItem, _React$Component);

    function BaseItem(props) {
      var _this;

      (0, _classCallCheck2.default)(this, BaseItem);
      _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(BaseItem).call(this, props));
      (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "update", function (type, name, value) {
        var silent = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

        if (['value', 'props'].indexOf(type) !== -1 && _this.didMount && _this.name === name && !silent) {
          _this.forceUpdate();
        }
      });
      var form = props.form,
          _name = props.name;
      _this.form = form;
      _this.name = _name;
      return _this;
    }

    (0, _createClass2.default)(BaseItem, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        this.form.on(_static.ANY_CHANGE, this.update);
        this.didMount = true;
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        // 解绑
        this.form.removeListener(_static.ANY_CHANGE, this.update);
        this.didMount = false;
      }
    }, {
      key: "render",
      value: function render() {
        var _this$props = this.props,
            children = _this$props.children,
            render = _this$props.render,
            didMount = _this$props.didMount,
            form = _this$props.form,
            onChange = _this$props.onChange,
            onBlur = _this$props.onBlur,
            onFocus = _this$props.onFocus,
            name = _this$props.name,
            formProps = _this$props.formProps,
            inset = _this$props.inset,
            predictChildForm = _this$props.predictChildForm,
            _this$props$eventProp = _this$props.eventProps,
            eventProps = _this$props$eventProp === void 0 ? {} : _this$props$eventProp;

        if (render) {
          if (!didMount) {
            return null;
          }

          var values = form.getValue();
          return render(values, form);
        }

        var itemProps = {
          value: form.getItemValue(name),
          status: form.getItemStatus(name),
          error: form.getItemError(name)
        };
        var status = itemProps.status;

        if (didMount && status === 'hidden') {
          return null;
        }

        if (typeof children === 'string') {
          throw new Error('string is not allowed as Item/FormItem\'s children.');
        }

        var component = null;

        if (children === null) {
          return null;
        }

        var props = form.getItemProps(name);

        var _ref = props || {},
            className = _ref.className,
            label = _ref.label,
            top = _ref.top,
            prefix = _ref.prefix,
            suffix = _ref.suffix,
            help = _ref.help,
            validateConfig = _ref.validateConfig,
            full = _ref.full,
            layout = _ref.layout,
            when = _ref.when,
            others = (0, _objectWithoutProperties2.default)(_ref, ["className", "label", "top", "prefix", "suffix", "help", "validateConfig", "full", "layout", "when"]);

        var comboFormProps = (0, _objectSpread2.default)({}, formProps);
        component = _react.default.Children.only(this.props.children);

        if (predictChildForm) {
          comboFormProps = (0, _objectSpread2.default)({}, comboFormProps, component.props);
        }

        var cloneProps = (0, _objectSpread2.default)({}, eventProps, comboFormProps, {
          inset: inset,
          // disabled: status === 'disabled',
          name: name
        }, itemProps, {
          onChange: onChange,
          onBlur: onBlur,
          onFocus: onFocus
        }, others);

        if (status === 'disabled') {
          cloneProps.disabled = true;
        }

        if (component && component.type && component.type.displayName === 'If') {
          delete cloneProps.name;
        }

        delete cloneProps.defaultMinWidth;
        delete cloneProps.colon;
        return _react.default.cloneElement(component, cloneProps);
      }
    }]);
    return BaseItem;
  }(_react.default.Component);

  var _default = BaseItem;
  _exports.default = _default;
});