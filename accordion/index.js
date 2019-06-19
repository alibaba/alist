(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "@babel/runtime/helpers/classCallCheck", "@babel/runtime/helpers/createClass", "@babel/runtime/helpers/possibleConstructorReturn", "@babel/runtime/helpers/getPrototypeOf", "@babel/runtime/helpers/assertThisInitialized", "@babel/runtime/helpers/inherits", "@babel/runtime/helpers/defineProperty", "react"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("@babel/runtime/helpers/classCallCheck"), require("@babel/runtime/helpers/createClass"), require("@babel/runtime/helpers/possibleConstructorReturn"), require("@babel/runtime/helpers/getPrototypeOf"), require("@babel/runtime/helpers/assertThisInitialized"), require("@babel/runtime/helpers/inherits"), require("@babel/runtime/helpers/defineProperty"), require("react"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.classCallCheck, global.createClass, global.possibleConstructorReturn, global.getPrototypeOf, global.assertThisInitialized, global.inherits, global.defineProperty, global.react);
    global.unknown = mod.exports;
  }
})(this, function (_exports, _classCallCheck2, _createClass2, _possibleConstructorReturn2, _getPrototypeOf2, _assertThisInitialized2, _inherits2, _defineProperty2, _react) {
  "use strict";

  var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

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
  _react = _interopRequireWildcard(_react);

  var Accordion =
  /*#__PURE__*/
  function (_Component) {
    (0, _inherits2.default)(Accordion, _Component);

    function Accordion(props) {
      var _this;

      (0, _classCallCheck2.default)(this, Accordion);
      _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Accordion).call(this, props));
      (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "bindSetCurrent", function (current) {
        if (_this.beforeLeave(_this.state.current) !== false && _this.beforeEnter(current) !== false) {
          _this.setState({
            current: current
          }, function () {
            if (_this.props.onStep) {
              _this.props.onStep(_this.state.current);
            }
          });
        }
      });
      (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "check", function (child, idx, current) {
        var active = idx === current;
        var Button = _this.props.Button || 'button';
        var accordionStatus = _this.props.status;

        if (accordionStatus === 'preview') {
          return {
            showElement: true,
            status: accordionStatus
          };
        }

        var showElement = false;
        var nextButton = null;
        var editButton = null;
        var status = 'edit';

        if (active) {
          nextButton = _react.default.createElement(Button, {
            type: "primary"
          }, "\u4E0B\u4E00\u6B65");
        } else {
          status = 'preview';
          editButton = _react.default.createElement("a", {
            href: "javascript:;"
          }, "\u7F16\u8F91");
        }

        var hasValue = false;

        try {
          var value = _this.props.core[idx].getValue();

          hasValue = Object.keys(value).filter(function (key) {
            return value[key];
          }).length > 0;
        } catch (e) {//
        }

        if (idx < current || active || hasValue || status === 'preview') {
          showElement = true;
        }

        if (!showElement) {
          editButton = null;
        }

        return {
          status: status,
          active: active,
          showElement: showElement,
          nextButton: nextButton,
          editButton: editButton
        };
      });
      (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "beforeEnter", function () {
        return true;
      });
      (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "beforeLeave", function (current) {
        if (!_this.props.core[current]) {
          return true;
        }

        var error = _this.props.core[current].validate();

        return !error;
      });
      _this.state = {
        current: props.current || 0
      };
      _this.coreStatus = [];
      return _this;
    }

    (0, _createClass2.default)(Accordion, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        var _this2 = this;

        this.coreStatus.forEach(function (status, idx) {
          _this2.props.core[idx].setGlobalStatus(status);
        });
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate() {
        var _this3 = this;

        this.coreStatus.forEach(function (status, idx) {
          _this3.props.core[idx].setGlobalStatus(status);
        });
      }
    }, {
      key: "render",
      value: function render() {
        var _this4 = this;

        var _this$props = this.props,
            className = _this$props.className,
            children = _this$props.children,
            _this$props$layout = _this$props.layout,
            layout = _this$props$layout === void 0 ? {
          label: 6,
          control: 18
        } : _this$props$layout;
        var current = this.state.current;

        var elements = _react.default.Children.map(children, function (child, idx) {
          var _this4$check = _this4.check(child, idx, current),
              active = _this4$check.active,
              showElement = _this4$check.showElement,
              nextButton = _this4$check.nextButton,
              editButton = _this4$check.editButton,
              status = _this4$check.status;

          _this4.coreStatus[idx] = status;

          var nbutton = nextButton && _react.default.cloneElement(nextButton, {
            onClick: _this4.bindSetCurrent.bind(_this4, idx + 1)
          });

          var ebutton = editButton && _react.default.cloneElement(editButton, {
            onClick: _this4.bindSetCurrent.bind(_this4, idx)
          });

          return _react.default.createElement("div", {
            className: "accordion-step-item ".concat(active && ' is-active')
          }, _react.default.createElement("div", {
            className: "accordion-step-num"
          }, idx + 1), _react.default.createElement("div", {
            className: "accordion-step-content"
          }, _react.default.createElement("div", null, _react.default.createElement("div", {
            className: "accordion-step-label"
          }, child.props.label), _react.default.createElement("div", {
            className: "accordion-step-edit"
          }, ebutton)), _react.default.createElement("div", {
            className: "accordion-step-children ".concat(!showElement ? 'is-hidden' : '')
          }, child, _react.default.createElement("div", {
            className: "no-form-item no-form-accordion-next"
          }, _react.default.createElement("div", {
            className: "no-form-item-label col-".concat(layout.label)
          }), _react.default.createElement("div", {
            className: "no-form-item-control col-".concat(layout.control)
          }, nbutton)))));
        });

        return _react.default.createElement("div", {
          className: className
        }, elements);
      }
    }]);
    return Accordion;
  }(_react.Component);

  _exports.default = Accordion;
});