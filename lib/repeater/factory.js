(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "@babel/runtime/regenerator", "@babel/runtime/helpers/asyncToGenerator", "@babel/runtime/helpers/extends", "@babel/runtime/helpers/objectSpread", "@babel/runtime/helpers/objectWithoutProperties", "@babel/runtime/helpers/classCallCheck", "@babel/runtime/helpers/createClass", "@babel/runtime/helpers/possibleConstructorReturn", "@babel/runtime/helpers/getPrototypeOf", "@babel/runtime/helpers/assertThisInitialized", "@babel/runtime/helpers/inherits", "@babel/runtime/helpers/defineProperty", "react", "prop-types", "react-fast-compare", "./repeaterCore", "./locale", "..", "../context/item", "../context/repeater", "../context/selectRepeater"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("@babel/runtime/regenerator"), require("@babel/runtime/helpers/asyncToGenerator"), require("@babel/runtime/helpers/extends"), require("@babel/runtime/helpers/objectSpread"), require("@babel/runtime/helpers/objectWithoutProperties"), require("@babel/runtime/helpers/classCallCheck"), require("@babel/runtime/helpers/createClass"), require("@babel/runtime/helpers/possibleConstructorReturn"), require("@babel/runtime/helpers/getPrototypeOf"), require("@babel/runtime/helpers/assertThisInitialized"), require("@babel/runtime/helpers/inherits"), require("@babel/runtime/helpers/defineProperty"), require("react"), require("prop-types"), require("react-fast-compare"), require("./repeaterCore"), require("./locale"), require(".."), require("../context/item"), require("../context/repeater"), require("../context/selectRepeater"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.regenerator, global.asyncToGenerator, global._extends, global.objectSpread, global.objectWithoutProperties, global.classCallCheck, global.createClass, global.possibleConstructorReturn, global.getPrototypeOf, global.assertThisInitialized, global.inherits, global.defineProperty, global.react, global.propTypes, global.reactFastCompare, global.repeaterCore, global.locale, global._, global.item, global.repeater, global.selectRepeater);
    global.unknown = mod.exports;
  }
})(this, function (_exports, _regenerator, _asyncToGenerator2, _extends2, _objectSpread2, _objectWithoutProperties2, _classCallCheck2, _createClass2, _possibleConstructorReturn2, _getPrototypeOf2, _assertThisInitialized2, _inherits2, _defineProperty2, _react, _propTypes, _reactFastCompare, _repeaterCore, _locale, _2, _item2, _repeater, _selectRepeater) {
  "use strict";

  var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

  var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = CreateRepeater;
  _regenerator = _interopRequireDefault(_regenerator);
  _asyncToGenerator2 = _interopRequireDefault(_asyncToGenerator2);
  _extends2 = _interopRequireDefault(_extends2);
  _objectSpread2 = _interopRequireDefault(_objectSpread2);
  _objectWithoutProperties2 = _interopRequireDefault(_objectWithoutProperties2);
  _classCallCheck2 = _interopRequireDefault(_classCallCheck2);
  _createClass2 = _interopRequireDefault(_createClass2);
  _possibleConstructorReturn2 = _interopRequireDefault(_possibleConstructorReturn2);
  _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf2);
  _assertThisInitialized2 = _interopRequireDefault(_assertThisInitialized2);
  _inherits2 = _interopRequireDefault(_inherits2);
  _defineProperty2 = _interopRequireDefault(_defineProperty2);
  _react = _interopRequireWildcard(_react);
  _propTypes = _interopRequireDefault(_propTypes);
  _reactFastCompare = _interopRequireDefault(_reactFastCompare);
  _repeaterCore = _interopRequireDefault(_repeaterCore);
  _locale = _interopRequireDefault(_locale);
  _2 = _interopRequireWildcard(_2);
  _item2 = _interopRequireDefault(_item2);
  _repeater = _interopRequireDefault(_repeater);
  _selectRepeater = _interopRequireDefault(_selectRepeater);

  // import deepEqual from 'deep-equal';
  var isObject = function isObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]';
  };

  var assignItem = function assignItem(obj) {
    if (!obj) return obj;
    return isObject(obj) ? Object.assign({}, obj) : obj;
  };

  var assignListItem = function assignListItem(arr) {
    if (!arr) return arr;
    return Array.isArray(arr) ? arr.map(function (item) {
      return assignItem(item);
    }) : arr;
  };

  function CreateRepeater(bindSource, type, source) {
    var Repeater = bindSource(type, source);
    var Dialog = source.Dialog;

    var InnerRepeater =
    /*#__PURE__*/
    function (_Component) {
      (0, _inherits2.default)(InnerRepeater, _Component);

      function InnerRepeater(_props) {
        var _this;

        (0, _classCallCheck2.default)(this, InnerRepeater);
        _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(InnerRepeater).call(this, _props));
        (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onChange", function (val, opts) {
          // val是onChange后的值
          // thisVal是onChange前的值，跟实际值合并之后存入value
          // 主要是考虑存在filter的情况, thisVal是过滤之后的值
          // this.props.value或者this.getValue()是过滤之前的值
          // 这种情况主要的值还是this.props.value，所以这里需要进行处理
          var value = [];
          var thisVal = _this.value;
          var i = 0; // i是thisVal的游标

          var j = 0; // j是val的游标

          _this.getValue().forEach(function (item) {
            // $idx是值在this.props.value中的下标
            if (i < thisVal.length && item.$idx < thisVal[i].$idx || i >= _this.value.length) {
              // 没有修改的项
              value.push(item);
            } else if (i < thisVal.length && item.$idx === thisVal[i].$idx) {
              // 有修改或删除的项
              if (j < val.length && item.$idx === val[j].$idx) {
                // 项被更新
                value.push(val[j]);
                j += 1;
              }

              i += 1; // 项被删除
            }
          }); // 新增的项


          while (val.length > i) {
            value.push(val[i]);
            i += 1;
            opts.withRender = false;
          }

          _this.props.onChange(value, opts);
        });
        (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "getSuperFormProps", function (core) {
          var formProps = {};

          if (core.form && core.form.jsx.props) {
            var _core$form$jsx$props = core.form.jsx.props,
                defaultMinWidth = _core$form$jsx$props.defaultMinWidth,
                full = _core$form$jsx$props.full,
                inline = _core$form$jsx$props.inline,
                inset = _core$form$jsx$props.inset,
                layout = _core$form$jsx$props.layout,
                colon = _core$form$jsx$props.colon;
            formProps = {
              defaultMinWidth: defaultMinWidth,
              full: full,
              inline: inline,
              inset: inset,
              layout: layout,
              colon: colon
            };
          }

          return formProps;
        });
        (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "getValue", function () {
          return _this.props.value || [];
        });
        (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "getDialogConfig", function (core, props) {
          var _this$props = _this.props,
              dialogConfig = _this$props.dialogConfig,
              selectRepeater = _this$props.selectRepeater;

          var _this$getText = _this.getText(),
              okText = _this$getText.okText,
              cancelText = _this$getText.cancelText;

          var _ref = dialogConfig || {},
              title = _ref.title,
              custom = _ref.custom,
              otherDialogProps = (0, _objectWithoutProperties2.default)(_ref, ["title", "custom"]);

          var dialogType = props.type,
              content = props.content;
          core.selectRepeater = selectRepeater;
          var rewriteProps = custom ? custom(core, dialogType, props) : {};
          return (0, _objectSpread2.default)({}, otherDialogProps, props, {
            title: title || props.title,
            okText: okText,
            cancelText: cancelText,
            content: content || _this.getForm(core)
          }, rewriteProps);
        });
        (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "getForm", function (core) {
          var _this$props2 = _this.props,
              dialogConfig = _this$props2.dialogConfig,
              children = _this$props2.children;

          var _ref2 = dialogConfig || {},
              style = _ref2.style,
              layout = _ref2.layout,
              full = _ref2.full,
              custom = _ref2.custom,
              className = _ref2.className,
              width = _ref2.width,
              others = (0, _objectWithoutProperties2.default)(_ref2, ["style", "layout", "full", "custom", "className", "width"]);

          var formProps = (0, _objectSpread2.default)({}, others);
          formProps.layout = layout || {
            label: 8,
            control: 16
          };
          formProps.full = !!full;
          return _react.default.createElement(_2.default, (0, _extends2.default)({
            core: core
          }, formProps, {
            repeaterRow: true
          }), children);
        });
        (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "getText", function () {
          var locale = _this.props.locale;
          var map = _locale.default[locale];
          var textMap = {};
          Object.keys(map).forEach(function (key) {
            if (key in _this.props && _this.props[key]) {
              textMap[key] = _this.props[key];
            } else {
              textMap[key] = map[key];
            }
          });
          return textMap;
        });
        (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "genManualEvent", function () {
          var currentEvent = _this.manualEvent || {};
          var multiple = _this.props.multiple;
          return (0, _objectSpread2.default)({}, currentEvent, {
            multiple: multiple
          });
        });
        (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handleCoreUpdate", function (core) {
          var multiple = _this.props.multiple;

          if (multiple) {
            core.$focus = true;

            if (!core.settingChangeHandler) {
              core.on('change', function (v, fireKeys, ctx) {
                _this.repeaterCore.updateMultiple(function (index) {
                  _this.sync({
                    type: 'update',
                    index: index,
                    multiple: true,
                    changeKeys: fireKeys
                  });
                })(v, fireKeys, ctx);
              });
              core.settingChangeHandler = true;
            }

            core.$multiple = true;
          }

          return core;
        });
        (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handleFilter",
        /*#__PURE__*/
        function () {
          var _ref3 = (0, _asyncToGenerator2.default)(
          /*#__PURE__*/
          _regenerator.default.mark(function _callee(value, key) {
            var filter, result;
            return _regenerator.default.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    filter = _this.props.filter;

                    if (!filter) {
                      _context.next = 6;
                      break;
                    }

                    _context.next = 4;
                    return filter(value, key);

                  case 4:
                    result = _context.sent;
                    return _context.abrupt("return", result);

                  case 6:
                    return _context.abrupt("return", value);

                  case 7:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee);
          }));

          return function (_x, _x2) {
            return _ref3.apply(this, arguments);
          };
        }());
        (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handleSearch",
        /*#__PURE__*/
        function () {
          var _ref4 = (0, _asyncToGenerator2.default)(
          /*#__PURE__*/
          _regenerator.default.mark(function _callee2(e) {
            var key, filter;
            return _regenerator.default.wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    key = e.target ? e.target.value : e;
                    filter = _this.props.filter;

                    if (key === undefined) {
                      key = _this.key || '';
                    } else {
                      _this.key = key;
                    } // 使用过滤函数进行过滤, 正在创建或更新临时项时，不进行搜索


                    if (!(filter && key)) {
                      _context2.next = 9;
                      break;
                    }

                    _context2.next = 6;
                    return _this.handleFilter(_this.getValue(), key);

                  case 6:
                    _this.value = _context2.sent;
                    _context2.next = 10;
                    break;

                  case 9:
                    _this.value = _this.getValue();

                  case 10:
                    _this.repeaterCore.updateValue(_this.value);

                    _this.forceUpdate();

                  case 12:
                  case "end":
                    return _context2.stop();
                }
              }
            }, _callee2);
          }));

          return function (_x3) {
            return _ref4.apply(this, arguments);
          };
        }());
        (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "setLoading", function (loading) {
          _this.repeaterCore.setLoading(loading);

          _this.forceUpdate();
        });
        (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "sync", function (opts) {
          _this.manualEvent = opts || {};

          var values = _this.repeaterCore.getValues();

          _this.onChange(values, opts);
        });
        (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "doSave",
        /*#__PURE__*/
        function () {
          var _ref5 = (0, _asyncToGenerator2.default)(
          /*#__PURE__*/
          _regenerator.default.mark(function _callee3(id) {
            var success, index;
            return _regenerator.default.wrap(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    _context3.next = 2;
                    return _this.repeaterCore.saveInline(id);

                  case 2:
                    success = _context3.sent;

                    if (success) {
                      index = _this.repeaterCore.formList.findIndex(function (core) {
                        return core.id === id;
                      });

                      _this.sync({
                        type: 'save',
                        index: index
                      });

                      _this.forceUpdate();
                    }

                  case 4:
                  case "end":
                    return _context3.stop();
                }
              }
            }, _callee3);
          }));

          return function (_x4) {
            return _ref5.apply(this, arguments);
          };
        }());
        (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "doCancel",
        /*#__PURE__*/
        function () {
          var _ref6 = (0, _asyncToGenerator2.default)(
          /*#__PURE__*/
          _regenerator.default.mark(function _callee4(id) {
            var index;
            return _regenerator.default.wrap(function _callee4$(_context4) {
              while (1) {
                switch (_context4.prev = _context4.next) {
                  case 0:
                    index = _this.repeaterCore.formList.findIndex(function (core) {
                      return core.id === id;
                    });
                    _context4.next = 3;
                    return _this.repeaterCore.cancelInline(id);

                  case 3:
                    _this.sync({
                      type: 'cancel',
                      index: index
                    });

                    _this.forceUpdate();

                  case 5:
                  case "end":
                    return _context4.stop();
                }
              }
            }, _callee4);
          }));

          return function (_x5) {
            return _ref6.apply(this, arguments);
          };
        }());
        (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "doAdd",
        /*#__PURE__*/
        function () {
          var _ref7 = (0, _asyncToGenerator2.default)(
          /*#__PURE__*/
          _regenerator.default.mark(function _callee5(core) {
            var _assertThisInitialize, repeaterCore, success, addCore;

            return _regenerator.default.wrap(function _callee5$(_context5) {
              while (1) {
                switch (_context5.prev = _context5.next) {
                  case 0:
                    _assertThisInitialize = (0, _assertThisInitialized2.default)(_this), repeaterCore = _assertThisInitialize.repeaterCore;
                    success = true;
                    addCore = core instanceof _2.FormCore ? core : repeaterCore.generateCore(core);
                    _context5.next = 5;
                    return repeaterCore.add(addCore);

                  case 5:
                    success = _context5.sent;

                    if (success) {
                      _this.sync({
                        type: 'add',
                        index: repeaterCore.formList.length - 1
                      });
                    }

                    return _context5.abrupt("return", success);

                  case 8:
                  case "end":
                    return _context5.stop();
                }
              }
            }, _callee5);
          }));

          return function (_x6) {
            return _ref7.apply(this, arguments);
          };
        }());
        (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "doMultipleInline",
        /*#__PURE__*/
        (0, _asyncToGenerator2.default)(
        /*#__PURE__*/
        _regenerator.default.mark(function _callee6() {
          var canSync;
          return _regenerator.default.wrap(function _callee6$(_context6) {
            while (1) {
              switch (_context6.prev = _context6.next) {
                case 0:
                  _context6.next = 2;
                  return _this.repeaterCore.addMultipleInline();

                case 2:
                  canSync = _context6.sent;

                  if (canSync) {
                    _this.sync({
                      type: 'add',
                      multiple: true,
                      index: _this.repeaterCore.formList.length - 1
                    });
                  }

                  _this.forceUpdate();

                case 5:
                case "end":
                  return _context6.stop();
              }
            }
          }, _callee6);
        })));
        (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "doAddInline",
        /*#__PURE__*/
        (0, _asyncToGenerator2.default)(
        /*#__PURE__*/
        _regenerator.default.mark(function _callee7() {
          var canSync;
          return _regenerator.default.wrap(function _callee7$(_context7) {
            while (1) {
              switch (_context7.prev = _context7.next) {
                case 0:
                  _context7.next = 2;
                  return _this.repeaterCore.addInline();

                case 2:
                  canSync = _context7.sent;

                  if (canSync) {
                    _this.sync({
                      type: 'add',
                      inline: true,
                      index: _this.repeaterCore.formList.length - 1
                    });
                  }

                  _this.forceUpdate();

                case 5:
                case "end":
                  return _context7.stop();
              }
            }
          }, _callee7);
        })));
        (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "doUpdateInline",
        /*#__PURE__*/
        function () {
          var _ref10 = (0, _asyncToGenerator2.default)(
          /*#__PURE__*/
          _regenerator.default.mark(function _callee8(core, id) {
            return _regenerator.default.wrap(function _callee8$(_context8) {
              while (1) {
                switch (_context8.prev = _context8.next) {
                  case 0:
                    _context8.next = 2;
                    return _this.repeaterCore.updateInline(core, id);

                  case 2:
                    _this.forceUpdate();

                  case 3:
                  case "end":
                    return _context8.stop();
                }
              }
            }, _callee8);
          }));

          return function (_x7, _x8) {
            return _ref10.apply(this, arguments);
          };
        }());
        (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "doUpdate",
        /*#__PURE__*/
        function () {
          var _ref11 = (0, _asyncToGenerator2.default)(
          /*#__PURE__*/
          _regenerator.default.mark(function _callee9(core, id) {
            var success, index;
            return _regenerator.default.wrap(function _callee9$(_context9) {
              while (1) {
                switch (_context9.prev = _context9.next) {
                  case 0:
                    _context9.next = 2;
                    return _this.repeaterCore.update(core, id);

                  case 2:
                    success = _context9.sent;

                    if (success) {
                      index = _this.repeaterCore.formList.findIndex(function (rp) {
                        return rp.id === id;
                      });

                      _this.sync({
                        type: 'update',
                        index: index
                      });
                    }

                    return _context9.abrupt("return", success);

                  case 5:
                  case "end":
                    return _context9.stop();
                }
              }
            }, _callee9);
          }));

          return function (_x9, _x10) {
            return _ref11.apply(this, arguments);
          };
        }());
        (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "doDelete",
        /*#__PURE__*/
        function () {
          var _ref12 = (0, _asyncToGenerator2.default)(
          /*#__PURE__*/
          _regenerator.default.mark(function _callee11(core, id) {
            var _this$props$hasDelete, hasDeleteConfirm, textMap, index, currentDelete, event, dialogConfig, success;

            return _regenerator.default.wrap(function _callee11$(_context11) {
              while (1) {
                switch (_context11.prev = _context11.next) {
                  case 0:
                    _this$props$hasDelete = _this.props.hasDeleteConfirm, hasDeleteConfirm = _this$props$hasDelete === void 0 ? true : _this$props$hasDelete;
                    textMap = _this.getText();
                    index = _this.repeaterCore.formList.findIndex(function (rp) {
                      return rp.id === id;
                    });
                    currentDelete = _this.repeaterCore.formList.find(function (rp) {
                      return rp.id === id;
                    });
                    event = {
                      type: 'delete',
                      index: index,
                      item: currentDelete
                    };

                    if (!hasDeleteConfirm) {
                      _context11.next = 10;
                      break;
                    }

                    dialogConfig = _this.getDialogConfig(core, {
                      title: textMap.dialogDeleteText,
                      content: _react.default.createElement("div", {
                        style: {
                          minWidth: '280px'
                        }
                      }, textMap.deleteConfirmText),
                      onOk: function () {
                        var _onOk = (0, _asyncToGenerator2.default)(
                        /*#__PURE__*/
                        _regenerator.default.mark(function _callee10(_, hide) {
                          var success;
                          return _regenerator.default.wrap(function _callee10$(_context10) {
                            while (1) {
                              switch (_context10.prev = _context10.next) {
                                case 0:
                                  _context10.next = 2;
                                  return _this.repeaterCore.remove(core, id);

                                case 2:
                                  success = _context10.sent;

                                  if (success) {
                                    hide();

                                    _this.sync(event);
                                  }

                                case 4:
                                case "end":
                                  return _context10.stop();
                              }
                            }
                          }, _callee10);
                        }));

                        function onOk(_x13, _x14) {
                          return _onOk.apply(this, arguments);
                        }

                        return onOk;
                      }(),
                      type: 'remove'
                    });
                    Dialog.show(dialogConfig);
                    _context11.next = 14;
                    break;

                  case 10:
                    _context11.next = 12;
                    return _this.repeaterCore.remove(core, id);

                  case 12:
                    success = _context11.sent;

                    if (success) {
                      _this.sync(event);
                    }

                  case 14:
                  case "end":
                    return _context11.stop();
                }
              }
            }, _callee11);
          }));

          return function (_x11, _x12) {
            return _ref12.apply(this, arguments);
          };
        }());
        (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "doAddDialog",
        /*#__PURE__*/
        function () {
          var _ref13 = (0, _asyncToGenerator2.default)(
          /*#__PURE__*/
          _regenerator.default.mark(function _callee13(core) {
            var textMap, dialogConfig;
            return _regenerator.default.wrap(function _callee13$(_context13) {
              while (1) {
                switch (_context13.prev = _context13.next) {
                  case 0:
                    textMap = _this.getText();
                    dialogConfig = _this.getDialogConfig(core, {
                      title: textMap.dialogAddText,
                      onOk: function () {
                        var _onOk2 = (0, _asyncToGenerator2.default)(
                        /*#__PURE__*/
                        _regenerator.default.mark(function _callee12(_, hide) {
                          var error, success;
                          return _regenerator.default.wrap(function _callee12$(_context12) {
                            while (1) {
                              switch (_context12.prev = _context12.next) {
                                case 0:
                                  _context12.next = 2;
                                  return core.validate();

                                case 2:
                                  error = _context12.sent;

                                  if (!error) {
                                    _context12.next = 5;
                                    break;
                                  }

                                  return _context12.abrupt("return");

                                case 5:
                                  _context12.next = 7;
                                  return _this.doAdd(core.getValues());

                                case 7:
                                  success = _context12.sent;

                                  // const success = await this.doAdd(core);
                                  if (success) {
                                    hide();
                                  }

                                case 9:
                                case "end":
                                  return _context12.stop();
                              }
                            }
                          }, _callee12);
                        }));

                        function onOk(_x16, _x17) {
                          return _onOk2.apply(this, arguments);
                        }

                        return onOk;
                      }(),
                      type: 'add'
                    });
                    Dialog.show(dialogConfig);

                  case 3:
                  case "end":
                    return _context13.stop();
                }
              }
            }, _callee13);
          }));

          return function (_x15) {
            return _ref13.apply(this, arguments);
          };
        }());
        (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "doUpdateDialog",
        /*#__PURE__*/
        function () {
          var _ref14 = (0, _asyncToGenerator2.default)(
          /*#__PURE__*/
          _regenerator.default.mark(function _callee15(core, id) {
            var textMap, dialogConfig;
            return _regenerator.default.wrap(function _callee15$(_context15) {
              while (1) {
                switch (_context15.prev = _context15.next) {
                  case 0:
                    textMap = _this.getText();
                    dialogConfig = _this.getDialogConfig(core, {
                      title: textMap.dialogUpdateText,
                      type: 'update',
                      onOk: function () {
                        var _onOk3 = (0, _asyncToGenerator2.default)(
                        /*#__PURE__*/
                        _regenerator.default.mark(function _callee14(_, hide) {
                          var error, success;
                          return _regenerator.default.wrap(function _callee14$(_context14) {
                            while (1) {
                              switch (_context14.prev = _context14.next) {
                                case 0:
                                  _context14.next = 2;
                                  return core.validate();

                                case 2:
                                  error = _context14.sent;

                                  if (!error) {
                                    _context14.next = 5;
                                    break;
                                  }

                                  return _context14.abrupt("return");

                                case 5:
                                  _context14.next = 7;
                                  return _this.doUpdate(core, id);

                                case 7:
                                  success = _context14.sent;

                                  if (success) {
                                    hide();
                                  }

                                case 9:
                                case "end":
                                  return _context14.stop();
                              }
                            }
                          }, _callee14);
                        }));

                        function onOk(_x20, _x21) {
                          return _onOk3.apply(this, arguments);
                        }

                        return onOk;
                      }()
                    });
                    Dialog.show(dialogConfig);

                  case 3:
                  case "end":
                    return _context15.stop();
                }
              }
            }, _callee15);
          }));

          return function (_x18, _x19) {
            return _ref14.apply(this, arguments);
          };
        }());
        var _value = _props.value,
            status = _props.status,
            formConfig = _props.formConfig,
            asyncHandler = _props.asyncHandler,
            _core = _props.core,
            _item = _props.item,
            _multiple = _props.multiple;
        _this.value = _value || [];
        _this.status = status;
        _this.multiple = _multiple;
        _this.formConfig = formConfig || {};
        _this.asyncHandler = asyncHandler || {};
        _this.manualEvent = _this.genManualEvent();
        _this.repeaterCore = _core || new _repeaterCore.default({
          value: _this.value,
          status: _this.status,
          formConfig: _this.formConfig,
          asyncHandler: _this.asyncHandler,
          multiple: _multiple,
          multipleSyncHandler: _this.handleCoreUpdate,
          setLoadingSideEffect: _this.setLoading
        });
        _this.superFormProps = {};

        if (_item) {
          _this.contextItem = _item;

          _this.contextItem.addSubField(_this.repeaterCore);

          _this.superFormProps = _this.getSuperFormProps(_item);
        }

        return _this;
      }

      (0, _createClass2.default)(InnerRepeater, [{
        key: "componentDidMount",
        value: function componentDidMount() {
          var onMount = this.props.onMount;
          var _this$repeaterCore = this.repeaterCore,
              multiple = _this$repeaterCore.multiple,
              formList = _this$repeaterCore.formList;
          var afterSetting = this.asyncHandler.afterSetting;

          if (afterSetting && Array.isArray(formList) && formList.length > 0) {
            afterSetting({
              type: 'initialize',
              multiple: multiple
            }, this.repeaterCore);
          }

          if (onMount) {
            onMount(this.repeaterCore);
          }
        }
      }, {
        key: "componentWillReceiveProps",
        value: function () {
          var _componentWillReceiveProps = (0, _asyncToGenerator2.default)(
          /*#__PURE__*/
          _regenerator.default.mark(function _callee16(nextProps) {
            var _this$props3, filter, asyncHandler, formConfig, manualEvent, filteredValue, forceRegenerate;

            return _regenerator.default.wrap(function _callee16$(_context16) {
              while (1) {
                switch (_context16.prev = _context16.next) {
                  case 0:
                    _this$props3 = this.props, filter = _this$props3.filter, asyncHandler = _this$props3.asyncHandler, formConfig = _this$props3.formConfig;
                    manualEvent = this.genManualEvent();

                    if (!((0, _reactFastCompare.default)(this.props, nextProps) && !manualEvent.type)) {
                      _context16.next = 4;
                      break;
                    }

                    return _context16.abrupt("return");

                  case 4:
                    if (!(0, _reactFastCompare.default)(asyncHandler, nextProps.asyncHandler)) {
                      this.repeaterCore.asyncHandler = nextProps.asyncHandler;
                    } // 没有过滤函数或者没有关键字


                    if (!(!filter || !this.key)) {
                      _context16.next = 9;
                      break;
                    }

                    this.value = assignListItem(nextProps.value || []);
                    _context16.next = 14;
                    break;

                  case 9:
                    if (!(nextProps.value !== this.props.value)) {
                      _context16.next = 14;
                      break;
                    }

                    _context16.next = 12;
                    return this.handleFilter(nextProps.value, this.key);

                  case 12:
                    filteredValue = _context16.sent;
                    this.value = assignListItem(filteredValue);

                  case 14:
                    forceRegenerate = false;

                    if (!(0, _reactFastCompare.default)(formConfig, nextProps.formConfig)) {
                      this.repeaterCore.updateFormConfig(nextProps.formConfig);
                      forceRegenerate = true;
                    } // 是否强制刷新所有core


                    manualEvent.forceRegenerate = forceRegenerate;
                    this.repeaterCore.updateValue(this.value, manualEvent);
                    this.forceUpdate();
                    this.manualEvent = {};

                  case 20:
                  case "end":
                    return _context16.stop();
                }
              }
            }, _callee16, this);
          }));

          function componentWillReceiveProps(_x22) {
            return _componentWillReceiveProps.apply(this, arguments);
          }

          return componentWillReceiveProps;
        }()
      }, {
        key: "render",
        value: function render() {
          // createRepeater 有几个作用:
          // 1. 传递外部的source，如antd，ice，next等
          // 2. 作为repeaterCore数据源的处理中间层(ui-data)
          // 3. 提供中间层的方法（实际渲染请参考Repeater.jsx)
          var contextValue = {
            repeater: {
              doAddDialog: this.doAddDialog,
              doAddInline: this.doAddInline,
              doMultipleInline: this.doMultipleInline,
              doUpdateDialog: this.doUpdateDialog,
              doUpdateInline: this.doUpdateInline,
              setLoading: this.setLoading,
              doSave: this.doSave,
              doCancel: this.doCancel,
              doDelete: this.doDelete,
              repeaterCore: this.repeaterCore,
              getText: this.getText,
              type: type,
              handleSearch: this.handleSearch
            }
          };
          return _react.default.createElement(_repeater.default.Provider, {
            value: contextValue
          }, _react.default.createElement(Repeater, (0, _extends2.default)({}, this.props, contextValue.repeater)));
        }
      }]);
      return InnerRepeater;
    }(_react.Component);

    (0, _defineProperty2.default)(InnerRepeater, "propTypes", {
      view: _propTypes.default.any,
      core: _propTypes.default.any,
      status: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.object]),
      locale: _propTypes.default.string,
      asyncHandler: _propTypes.default.object,
      dialogConfig: _propTypes.default.object,
      formConfig: _propTypes.default.object,
      className: _propTypes.default.string,
      style: _propTypes.default.object,
      multiple: _propTypes.default.bool,
      filter: _propTypes.default.func,
      onMount: _propTypes.default.func,
      full: _propTypes.default.bool,
      value: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object]),
      onChange: _propTypes.default.func,
      children: _propTypes.default.any
    });
    (0, _defineProperty2.default)(InnerRepeater, "defaultProps", {
      onChange: function onChange() {},
      full: false,
      status: 'edit',
      locale: 'en' // en | zh

    });

    var OtRepeater = _react.default.forwardRef(function (props, ref) {
      return _react.default.createElement(_item2.default.Consumer, null, function (itemContext) {
        var item = itemContext.item;
        return _react.default.createElement(_selectRepeater.default.Consumer, null, function (_ref15) {
          var selectRepeater = _ref15.selectRepeater;
          return _react.default.createElement(InnerRepeater, (0, _extends2.default)({
            ref: ref
          }, props, {
            item: item,
            selectRepeater: selectRepeater
          }));
        });
      });
    });

    OtRepeater.displayName = 'OtRepeater';
    return OtRepeater;
  }
});