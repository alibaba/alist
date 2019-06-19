(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "@babel/runtime/helpers/extends", "@babel/runtime/helpers/objectWithoutProperties", "@babel/runtime/regenerator", "@babel/runtime/helpers/asyncToGenerator", "@babel/runtime/helpers/classCallCheck", "@babel/runtime/helpers/createClass", "@babel/runtime/helpers/possibleConstructorReturn", "@babel/runtime/helpers/getPrototypeOf", "@babel/runtime/helpers/assertThisInitialized", "@babel/runtime/helpers/inherits", "@babel/runtime/helpers/defineProperty", "react", "prop-types", "../context/repeater", "../context/repeaterRow"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("@babel/runtime/helpers/extends"), require("@babel/runtime/helpers/objectWithoutProperties"), require("@babel/runtime/regenerator"), require("@babel/runtime/helpers/asyncToGenerator"), require("@babel/runtime/helpers/classCallCheck"), require("@babel/runtime/helpers/createClass"), require("@babel/runtime/helpers/possibleConstructorReturn"), require("@babel/runtime/helpers/getPrototypeOf"), require("@babel/runtime/helpers/assertThisInitialized"), require("@babel/runtime/helpers/inherits"), require("@babel/runtime/helpers/defineProperty"), require("react"), require("prop-types"), require("../context/repeater"), require("../context/repeaterRow"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global._extends, global.objectWithoutProperties, global.regenerator, global.asyncToGenerator, global.classCallCheck, global.createClass, global.possibleConstructorReturn, global.getPrototypeOf, global.assertThisInitialized, global.inherits, global.defineProperty, global.react, global.propTypes, global.repeater, global.repeaterRow);
    global.unknown = mod.exports;
  }
})(this, function (_exports, _extends2, _objectWithoutProperties2, _regenerator, _asyncToGenerator2, _classCallCheck2, _createClass2, _possibleConstructorReturn2, _getPrototypeOf3, _assertThisInitialized2, _inherits2, _defineProperty2, _react, _propTypes, _repeater, _repeaterRow) {
  "use strict";

  var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

  var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _extends2 = _interopRequireDefault(_extends2);
  _objectWithoutProperties2 = _interopRequireDefault(_objectWithoutProperties2);
  _regenerator = _interopRequireDefault(_regenerator);
  _asyncToGenerator2 = _interopRequireDefault(_asyncToGenerator2);
  _classCallCheck2 = _interopRequireDefault(_classCallCheck2);
  _createClass2 = _interopRequireDefault(_createClass2);
  _possibleConstructorReturn2 = _interopRequireDefault(_possibleConstructorReturn2);
  _getPrototypeOf3 = _interopRequireDefault(_getPrototypeOf3);
  _assertThisInitialized2 = _interopRequireDefault(_assertThisInitialized2);
  _inherits2 = _interopRequireDefault(_inherits2);
  _defineProperty2 = _interopRequireDefault(_defineProperty2);
  _react = _interopRequireWildcard(_react);
  _propTypes = _interopRequireDefault(_propTypes);
  _repeater = _interopRequireDefault(_repeater);
  _repeaterRow = _interopRequireDefault(_repeaterRow);

  var InnerActionButton =
  /*#__PURE__*/
  function (_Component) {
    (0, _inherits2.default)(InnerActionButton, _Component);

    function InnerActionButton() {
      var _getPrototypeOf2;

      var _this;

      (0, _classCallCheck2.default)(this, InnerActionButton);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(InnerActionButton)).call.apply(_getPrototypeOf2, [this].concat(args)));
      (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "getId", function () {
        return _this.props.id;
      });
      (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "getCore", function () {
        var _this$props = _this.props,
            repeaterCore = _this$props.repeaterCore,
            findBy = _this$props.findBy,
            core = _this$props.core;
        return core || repeaterCore.formList.find(findBy);
      });
      (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handleAddMultipleInline",
      /*#__PURE__*/
      (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee() {
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _this.props.doMultipleInline();

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      })));
      (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handleAddInline",
      /*#__PURE__*/
      (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee2() {
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _this.props.doAddInline();

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      })));
      (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handleUpdateInline",
      /*#__PURE__*/
      (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee3() {
        var core;
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                core = _this.getCore();
                _context3.next = 3;
                return _this.props.doUpdateInline(core, core.id);

              case 3:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      })));
      (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handleUpdate",
      /*#__PURE__*/
      (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee4() {
        var core, copyCore;
        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                core = _this.getCore();
                copyCore = _this.props.repeaterCore.generateCore(core.getValues());
                _context4.next = 4;
                return _this.props.doUpdateDialog(copyCore, core.id);

              case 4:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      })));
      (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handleDelete",
      /*#__PURE__*/
      (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee5() {
        var core;
        return _regenerator.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                core = _this.getCore();
                _context5.next = 3;
                return _this.props.doDelete(core, core.id);

              case 3:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      })));
      (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handleSave",
      /*#__PURE__*/
      (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee6() {
        return _regenerator.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return _this.props.doSave(_this.getId());

              case 2:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      })));
      (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handleCancel",
      /*#__PURE__*/
      (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee7() {
        return _regenerator.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return _this.props.doCancel(_this.getId());

              case 2:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      })));
      (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handleAdd",
      /*#__PURE__*/
      (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee8() {
        var core;
        return _regenerator.default.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                core = _this.props.repeaterCore.generateCore();
                _context8.next = 3;
                return _this.props.doAddDialog(core);

              case 3:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
      })));
      (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "renderBtn", function () {
        var _this$props2 = _this.props,
            type = _this$props2.type,
            children = _this$props2.children,
            getText = _this$props2.getText;

        var _getText = getText(),
            addText = _getText.addText,
            updateText = _getText.updateText,
            saveText = _getText.saveText,
            cancelText = _getText.cancelText,
            deleteText = _getText.deleteText;

        var ele = null;

        switch (type) {
          case 'add':
            ele = _react.default.createElement("button", {
              className: "repeater-action-btn repeater-add",
              onClick: _this.handleAdd
            }, children || addText);
            break;

          case 'addInline':
            ele = _react.default.createElement("button", {
              className: "repeater-action-btn repeater-add",
              onClick: _this.handleAddInline
            }, children || addText);
            break;

          case 'addMultipleInline':
            ele = _react.default.createElement("button", {
              className: "repeater-action-btn repeater-add",
              onClick: _this.handleAddMultipleInline
            }, children || addText);
            break;

          case 'update':
            ele = _react.default.createElement("button", {
              className: "repeater-action-btn repeater-update",
              onClick: _this.handleUpdate
            }, children || updateText);
            break;

          case 'updateInline':
            ele = _react.default.createElement("button", {
              className: "repeater-action-btn repeater-update",
              onClick: _this.handleUpdateInline
            }, children || updateText);
            break;

          case 'save':
            ele = _react.default.createElement("button", {
              className: "repeater-action-btn repeater-save",
              onClick: _this.handleSave
            }, children || saveText);
            break;

          case 'cancel':
            ele = _react.default.createElement("button", {
              className: "repeater-action-btn repeater-cancel",
              onClick: _this.handleCancel
            }, children || cancelText);
            break;

          case 'remove':
          case 'delete':
            ele = _react.default.createElement("button", {
              className: "repeater-action-btn repeater-delete",
              onClick: _this.handleDelete
            }, children || deleteText);
            break;

          default:
            break;
        }

        return ele;
      });
      return _this;
    }

    (0, _createClass2.default)(InnerActionButton, [{
      key: "render",
      value: function render() {
        return this.renderBtn();
      }
    }]);
    return InnerActionButton;
  }(_react.Component);

  (0, _defineProperty2.default)(InnerActionButton, "propTypes", {
    doAddDialog: _propTypes.default.func,
    doUpdateDialog: _propTypes.default.func,
    doDelete: _propTypes.default.func,
    doSave: _propTypes.default.func,
    doCancel: _propTypes.default.func,
    doAddInline: _propTypes.default.func,
    doMultipleInline: _propTypes.default.func,
    doUpdateInline: _propTypes.default.func,
    repeaterCore: _propTypes.default.object,
    id: _propTypes.default.string,
    core: _propTypes.default.object,
    findBy: _propTypes.default.func,
    getText: _propTypes.default.func,
    children: _propTypes.default.any,
    type: _propTypes.default.string
  });

  var ActionButton = function ActionButton(props) {
    return _react.default.createElement(_repeater.default.Consumer, null, function (repeaterAction) {
      var actionProps = repeaterAction || {};
      var repeater = actionProps.repeater;

      var _ref9 = repeater || {},
          type = _ref9.type,
          others = (0, _objectWithoutProperties2.default)(_ref9, ["type"]);

      var _ref10 = props || {},
          propCore = _ref10.core,
          otherProps = (0, _objectWithoutProperties2.default)(_ref10, ["core"]);

      return _react.default.createElement(_repeaterRow.default.Consumer, null, function (rowCtx) {
        var _ref11 = rowCtx || {},
            core = _ref11.core,
            otherCtx = (0, _objectWithoutProperties2.default)(_ref11, ["core"]);

        return _react.default.createElement(InnerActionButton, (0, _extends2.default)({}, otherProps, others, otherCtx, {
          core: core || propCore
        }));
      });
    });
  };

  ActionButton.displayName = 'ActionButton';
  var _default = ActionButton;
  _exports.default = _default;
});