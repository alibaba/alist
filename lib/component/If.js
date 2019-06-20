(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "@babel/runtime/helpers/extends", "@babel/runtime/helpers/classCallCheck", "@babel/runtime/helpers/createClass", "@babel/runtime/helpers/possibleConstructorReturn", "@babel/runtime/helpers/getPrototypeOf", "@babel/runtime/helpers/assertThisInitialized", "@babel/runtime/helpers/inherits", "@babel/runtime/helpers/defineProperty", "react", "prop-types", "../static", "../context/form", "../context/if"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("@babel/runtime/helpers/extends"), require("@babel/runtime/helpers/classCallCheck"), require("@babel/runtime/helpers/createClass"), require("@babel/runtime/helpers/possibleConstructorReturn"), require("@babel/runtime/helpers/getPrototypeOf"), require("@babel/runtime/helpers/assertThisInitialized"), require("@babel/runtime/helpers/inherits"), require("@babel/runtime/helpers/defineProperty"), require("react"), require("prop-types"), require("../static"), require("../context/form"), require("../context/if"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global._extends, global.classCallCheck, global.createClass, global.possibleConstructorReturn, global.getPrototypeOf, global.assertThisInitialized, global.inherits, global.defineProperty, global.react, global.propTypes, global._static, global.form, global._if);
    global.unknown = mod.exports;
  }
})(this, function (_exports, _extends2, _classCallCheck2, _createClass2, _possibleConstructorReturn2, _getPrototypeOf2, _assertThisInitialized2, _inherits2, _defineProperty2, _react, _propTypes, _static, _form, _if) {
  "use strict";

  var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _extends2 = _interopRequireDefault(_extends2);
  _classCallCheck2 = _interopRequireDefault(_classCallCheck2);
  _createClass2 = _interopRequireDefault(_createClass2);
  _possibleConstructorReturn2 = _interopRequireDefault(_possibleConstructorReturn2);
  _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf2);
  _assertThisInitialized2 = _interopRequireDefault(_assertThisInitialized2);
  _inherits2 = _interopRequireDefault(_inherits2);
  _defineProperty2 = _interopRequireDefault(_defineProperty2);
  _react = _interopRequireDefault(_react);
  _propTypes = _interopRequireDefault(_propTypes);
  _form = _interopRequireDefault(_form);
  _if = _interopRequireDefault(_if);
  var Component = _react.default.PureComponent;

  var If =
  /*#__PURE__*/
  function (_Component) {
    (0, _inherits2.default)(If, _Component);

    function If(props) {
      var _this;

      (0, _classCallCheck2.default)(this, If);
      _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(If).call(this, props));
      (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "update", function (type, name) {
        var hit = _this.hitListenKeys(name);

        if (_this.didMount && (type === 'value' || type === 'status') && hit) {
          _this.forceUpdate();
        }
      });
      (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "hitListenKeys", function (key) {
        var listenKeys = _this.props.listenKeys;

        if (listenKeys.length === 0) {
          return true;
        } else {
          return listenKeys.indexOf(key) !== -1;
        }
      });
      var when = props.when,
          form = props.form,
          ifCore = props.ifCore,
          _name = props.name;
      _this.form = form;
      _this.core = form.addField({
        when: when,
        name: _name,
        isIf: true
      });
      _this.core.jsx = (0, _assertThisInitialized2.default)(_this);
      _this.core.parentIf = ifCore;
      return _this;
    }

    (0, _createClass2.default)(If, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        this.didMount = true;
        this.forceUpdate();
        this.core.on(_static.ANY_CHANGE, this.update);
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        this.didMount = false;
        this.core.removeListener(_static.ANY_CHANGE, this.update);
      }
    }, {
      key: "render",
      value: function render() {
        if (this.didMount && this.core.status === 'hidden') {
          return null;
        }

        var _this$props = this.props,
            children = _this$props.children,
            style = _this$props.style,
            className = _this$props.className,
            Com = _this$props.Com; // REACT15,REACT16

        var ftcls = "".concat(className || '', " no-form-item");
        var contextValue = {
          if: this.core
        };

        if (_react.default.isValidElement(children)) {
          var child = _react.default.Children.only(children);

          return _react.default.createElement(_if.default.Provider, {
            value: contextValue
          }, child);
        }

        return _react.default.createElement(_if.default.Provider, {
          value: contextValue
        }, _react.default.createElement(Com, {
          style: style,
          className: ftcls
        }, children));
      }
    }]);
    return If;
  }(Component);

  (0, _defineProperty2.default)(If, "propTypes", {
    when: _propTypes.default.any,
    children: _propTypes.default.any,
    style: _propTypes.default.object,
    className: _propTypes.default.string,
    // listenKeys: PropTypes.Array,
    name: _propTypes.default.any,
    Com: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.func])
  });
  (0, _defineProperty2.default)(If, "defaultProps", {
    when: true,
    children: null,
    style: {},
    className: '',
    Com: 'span',
    listenKeys: []
  });

  var ConnectIf = function ConnectIf(props) {
    return _react.default.createElement(_form.default.Consumer, null, function (formContext) {
      var form = formContext.form;
      return _react.default.createElement(If, (0, _extends2.default)({}, props, {
        form: form
      }));
    });
  };

  ConnectIf.displayName = 'If';
  var _default = ConnectIf;
  _exports.default = _default;
});