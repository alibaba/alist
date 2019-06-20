(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "@babel/runtime/helpers/classCallCheck", "@babel/runtime/helpers/createClass", "@babel/runtime/helpers/possibleConstructorReturn", "@babel/runtime/helpers/getPrototypeOf", "@babel/runtime/helpers/assertThisInitialized", "@babel/runtime/helpers/inherits", "@babel/runtime/helpers/defineProperty", "react", "../static", "../util/is"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("@babel/runtime/helpers/classCallCheck"), require("@babel/runtime/helpers/createClass"), require("@babel/runtime/helpers/possibleConstructorReturn"), require("@babel/runtime/helpers/getPrototypeOf"), require("@babel/runtime/helpers/assertThisInitialized"), require("@babel/runtime/helpers/inherits"), require("@babel/runtime/helpers/defineProperty"), require("react"), require("../static"), require("../util/is"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.classCallCheck, global.createClass, global.possibleConstructorReturn, global.getPrototypeOf, global.assertThisInitialized, global.inherits, global.defineProperty, global.react, global._static, global.is);
    global.unknown = mod.exports;
  }
})(this, function (_exports, _classCallCheck2, _createClass2, _possibleConstructorReturn2, _getPrototypeOf2, _assertThisInitialized2, _inherits2, _defineProperty2, _react, _static, _is) {
  "use strict";

  var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _classCallCheck2 = _interopRequireDefault(_classCallCheck2);
  _createClass2 = _interopRequireDefault(_createClass2);
  _possibleConstructorReturn2 = _interopRequireDefault(_possibleConstructorReturn2);
  _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf2);
  _assertThisInitialized2 = _interopRequireDefault(_assertThisInitialized2);
  _inherits2 = _interopRequireDefault(_inherits2);
  _defineProperty2 = _interopRequireDefault(_defineProperty2);
  _react = _interopRequireDefault(_react);

  var Section =
  /*#__PURE__*/
  function (_React$Component) {
    (0, _inherits2.default)(Section, _React$Component);

    function Section(props) {
      var _this;

      (0, _classCallCheck2.default)(this, Section);
      _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Section).call(this, props));
      (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "update", function (type, name, value) {
        var silent = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

        if (type === _this.type && _this.didMount && _this.core.name === name && !silent) {
          _this.forceUpdate();
        }
      });
      (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "renderPropsItem", function () {
        var _this$props = _this.props,
            className = _this$props.className,
            name = _this$props.name,
            field = _this$props.field,
            pure = _this$props.pure;
        var dynamicProps = _this.form.getItemProps(name) || {}; // 动态props

        var propsField = _this.props[field];
        var currentProps = dynamicProps[field] || propsField;

        if (pure) {
          return _react.default.createElement(_react.default.Fragment, null, currentProps);
        }

        return currentProps ? _react.default.createElement("span", {
          className: className
        }, currentProps) : null;
      });
      (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "renderErrorItem", function () {
        var _this$props2 = _this.props,
            errorRender = _this$props2.errorRender,
            className = _this$props2.className,
            name = _this$props2.name,
            propsError = _this$props2.error;
        var error = null;

        if (name) {
          var itemError = _this.form.getItemError(name);

          error = itemError || propsError;
        } else {
          error = propsError;
        }

        var errInfo = error;
        var hasError = !!errInfo;
        var hasMainError = !!errInfo;
        var hasSubError = false;

        if ((0, _is.isObject)(error)) {
          // 对象的情况
          errInfo = error.__error || error.main;
          hasMainError = error.main;
          hasSubError = error.sub;
          hasError = hasMainError || hasSubError;
        }

        if (errorRender) {
          errInfo = errorRender(errInfo, error);
        }

        return hasError ? _react.default.createElement("span", {
          className: className
        }, errInfo) : null;
      });
      var core = props.core,
          form = props.form,
          _type = props.type,
          _field = props.field;
      _this.form = form;
      _this.type = _type;
      _this.core = core;
      _this.field = _field;
      return _this;
    }

    (0, _createClass2.default)(Section, [{
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
        var type = this.props.type;
        var element = null;

        switch (type) {
          case 'props':
            element = this.renderPropsItem();
            break;

          case 'error':
            element = this.renderErrorItem();
            break;

          default:
            break;
        }

        return element;
      }
    }]);
    return Section;
  }(_react.default.Component);

  var _default = Section;
  _exports.default = _default;
});