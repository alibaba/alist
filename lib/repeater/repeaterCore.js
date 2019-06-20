(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "@babel/runtime/regenerator", "@babel/runtime/helpers/asyncToGenerator", "@babel/runtime/helpers/objectSpread", "@babel/runtime/helpers/classCallCheck", "@babel/runtime/helpers/defineProperty", "../core/form", "../util/is"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("@babel/runtime/regenerator"), require("@babel/runtime/helpers/asyncToGenerator"), require("@babel/runtime/helpers/objectSpread"), require("@babel/runtime/helpers/classCallCheck"), require("@babel/runtime/helpers/defineProperty"), require("../core/form"), require("../util/is"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.regenerator, global.asyncToGenerator, global.objectSpread, global.classCallCheck, global.defineProperty, global.form, global.is);
    global.unknown = mod.exports;
  }
})(this, function (_exports, _regenerator, _asyncToGenerator2, _objectSpread2, _classCallCheck2, _defineProperty2, _form, _is) {
  "use strict";

  var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _regenerator = _interopRequireDefault(_regenerator);
  _asyncToGenerator2 = _interopRequireDefault(_asyncToGenerator2);
  _objectSpread2 = _interopRequireDefault(_objectSpread2);
  _classCallCheck2 = _interopRequireDefault(_classCallCheck2);
  _defineProperty2 = _interopRequireDefault(_defineProperty2);
  _form = _interopRequireDefault(_form);

  var noop = function noop() {};

  var RepeaterCore = function RepeaterCore(props) {
    var _this = this;

    (0, _classCallCheck2.default)(this, RepeaterCore);
    (0, _defineProperty2.default)(this, "setLoading", function (loading) {
      _this.loading = loading;
    });
    (0, _defineProperty2.default)(this, "updateStatus", function (status) {
      _this.status = status;
    });
    (0, _defineProperty2.default)(this, "notify", function () {});
    (0, _defineProperty2.default)(this, "handleFormError", function (error) {
      if (!error) return null;
      var err = null;

      if (Array.isArray(error)) {
        var errList = error.map(function (item) {
          return _this.handleFormError(item);
        }).filter(function (v) {
          return !!v;
        });
        return errList[0];
      }

      Object.keys(error).forEach(function (key) {
        if (error[key] && !err) {
          err = error[key];
        }
      });
      return err;
    });
    (0, _defineProperty2.default)(this, "validate", function () {
      var cb = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function (e) {
        return e;
      };
      var opts = arguments.length > 1 ? arguments[1] : undefined;

      var _ref = opts || {},
          _ref$changeKeys = _ref.changeKeys,
          changeKeys = _ref$changeKeys === void 0 ? null : _ref$changeKeys,
          _ref$index = _ref.index,
          index = _ref$index === void 0 ? -1 : _ref$index,
          _ref$withRender = _ref.withRender,
          withRender = _ref$withRender === void 0 ? true : _ref$withRender;

      var hasPromise = false;
      var promiseValidator = [];

      _this.formList.forEach(function (item, coreIdx) {
        var result = null;

        if (index !== -1) {
          // 只为特定的core的特定字段做校验
          if (coreIdx === index && Array.isArray(changeKeys)) {
            result = item.validateItem(changeKeys, undefined, opts);

            if ((0, _is.isPromise)(result)) {
              hasPromise = true;
            }

            promiseValidator.push(result);
          }
        } else {
          if (withRender) {
            result = item.validate();
          } else {
            result = item.validateWithoutRender();
          }

          if ((0, _is.isPromise)(result)) {
            hasPromise = true;
          }

          promiseValidator.push(result);
        }
      });

      if (hasPromise) {
        return Promise.all(promiseValidator).then(_this.handleFormError).then(cb);
      }

      var errList = promiseValidator.map(_this.handleFormError).filter(function (v) {
        return !!v;
      });
      return cb(errList[0]);
    });
    (0, _defineProperty2.default)(this, "updateFormConfig", function (formConfig) {
      _this.formConfig = formConfig || {};
    });
    (0, _defineProperty2.default)(this, "setEditWhenFocus", function () {
      _this.formList.forEach(function (core) {
        if (core.$focus) {
          core.setGlobalStatus('edit');
        } else {
          core.setGlobalStatus('preview');
        }
      });
    });
    (0, _defineProperty2.default)(this, "generateCore", function (raw) {
      var _this$formConfig = _this.formConfig,
          userValues = _this$formConfig.values,
          _this$formConfig$onCh = _this$formConfig.onChange,
          _onChange = _this$formConfig$onCh === void 0 ? noop : _this$formConfig$onCh,
          _this$formConfig$init = _this$formConfig.initialized,
          _initialized = _this$formConfig$init === void 0 ? noop : _this$formConfig$init;

      var values = {};

      if (raw) {
        values = (0, _objectSpread2.default)({}, raw);
      } else if (userValues) {
        values = (0, _objectSpread2.default)({}, userValues);
      }

      var instance = new _form.default((0, _objectSpread2.default)({}, _this.formConfig, {
        onChange: function onChange(fks, v, ctx) {
          ctx.repeater = _this;
          ctx.repeaterIndex = _this.formList.findIndex(function (item) {
            return item.id === ctx.id;
          });

          _onChange(fks, v, ctx);
        },
        initialized: function initialized(ctx) {
          ctx.repeater = _this;
          ctx.repeaterIndex = _this.formList.findIndex(function (item) {
            return item.id === ctx.id;
          });

          _initialized(ctx);
        },
        values: values,
        globalStatus: _this.status,
        disabledSyncChildForm: true,
        repeaterRowCore: true
      }));
      instance.repeater = _this;

      if (_this.multiple) {
        instance.$focus = true;
        instance.$multiple = true;
        instance = _this.multipleSyncHandler(instance);
      }

      return instance;
    });
    (0, _defineProperty2.default)(this, "hasValidateError",
    /*#__PURE__*/
    (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee() {
      var validateArr;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return Promise.all(_this.formList.map(function (core) {
                return core.validate();
              }));

            case 2:
              validateArr = _context.sent;
              validateArr = validateArr.filter(function (errors) {
                var hasError = false;

                if (errors) {
                  Object.keys(errors).forEach(function (errkey) {
                    if (errors[errkey]) {
                      hasError = true;
                    }
                  });
                }

                return hasError;
              });
              return _context.abrupt("return", validateArr.length > 0);

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));
    (0, _defineProperty2.default)(this, "getValues", function () {
      var values = [];

      _this.formList.forEach(function (core) {
        var currentVal = core.getValues();

        if (core.$multiple) {
          values.push(currentVal);
        } else if (core.$focus) {
          if (core.$backup) {
            values.push(core.$backup);
          }
        } else {
          values.push(currentVal);
        }
      });

      return values;
    });
    (0, _defineProperty2.default)(this, "autoSaveInline",
    /*#__PURE__*/
    (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee2() {
      var canSync;
      return _regenerator.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              canSync = false;
              _this.formList = _this.formList.map(function (core) {
                if (core.$focus) {
                  canSync = true;
                  delete core.$focus;
                  delete core.$backup;
                }

                return core;
              });
              return _context2.abrupt("return", canSync);

            case 3:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })));
    (0, _defineProperty2.default)(this, "beforeAsyncHandler", function (_ref4) {// this.setLoadingSideEffect(true);

      var type = _ref4.type,
          _ref4$inline = _ref4.inline,
          inline = _ref4$inline === void 0 ? false : _ref4$inline;
    });
    (0, _defineProperty2.default)(this, "afterAsyncHandler", function () {} // this.setLoadingSideEffect(false);
    // 增加临时编辑项
    );
    (0, _defineProperty2.default)(this, "addInline",
    /*#__PURE__*/
    (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee3() {
      var values, success, hasError, tmp, index, result, _this$handleAsyncResu, _this$handleAsyncResu2, res, item, rv;

      return _regenerator.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              values = null;
              success = true;
              _context3.next = 4;
              return _this.hasValidateError();

            case 4:
              hasError = _context3.sent;

              if (!hasError) {
                _context3.next = 7;
                break;
              }

              return _context3.abrupt("return", false);

            case 7:
              _this.autoSaveInline();

              tmp = _this.generateCore();

              if (!_this.asyncHandler.add) {
                _context3.next = 27;
                break;
              }

              _this.beforeAsyncHandler({
                type: 'add',
                inline: true
              });

              index = _this.formList.length - 1 < 0 ? 0 : _this.formList.length - 1;
              result = true;
              _context3.prev = 13;
              _context3.next = 16;
              return _this.asyncHandler.add(tmp.getValues(), tmp, index);

            case 16:
              result = _context3.sent;
              _context3.next = 22;
              break;

            case 19:
              _context3.prev = 19;
              _context3.t0 = _context3["catch"](13);
              result = false;

            case 22:
              _this$handleAsyncResu = _this.handleAsyncResult(result), _this$handleAsyncResu2 = _this$handleAsyncResu.success, res = _this$handleAsyncResu2 === void 0 ? true : _this$handleAsyncResu2, item = _this$handleAsyncResu.item, rv = _this$handleAsyncResu.values;
              success = res;

              if (item) {
                tmp.setValueSilent(item);
              }

              if (rv) {
                values = rv;
              }

              _this.afterAsyncHandler({
                type: 'add',
                inline: true
              });

            case 27:
              if (success) {
                if (values) {
                  _this.updateValue(values);
                } else {
                  tmp.$focus = true;

                  _this.formList.push(tmp);

                  _this.setEditWhenFocus();
                }
              }

              return _context3.abrupt("return", success);

            case 29:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[13, 19]]);
    })));
    (0, _defineProperty2.default)(this, "updateMultiple", function () {
      var cb = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function (x) {
        return x;
      };
      return function (v, keys, ctx) {
        var list = _this.formList;
        var index = list.findIndex(function (item) {
          return item.id === ctx.id;
        });
        cb(index);

        if (_this.asyncHandler.update) {
          // this.beforeAsyncHandler({ type: 'update', multiple: true });
          _this.asyncHandler.update(v, ctx, index, keys); // this.afterAsyncHandler({ type: 'update', multiple: true });

        }
      };
    });
    (0, _defineProperty2.default)(this, "addMultipleInline",
    /*#__PURE__*/
    (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee4() {
      var values, success, hasError, tmp, index, result, _this$handleAsyncResu3, _this$handleAsyncResu4, res, item, rv;

      return _regenerator.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              values = null;
              success = true;
              _context4.next = 4;
              return _this.hasValidateError();

            case 4:
              hasError = _context4.sent;

              if (!hasError) {
                _context4.next = 7;
                break;
              }

              return _context4.abrupt("return", false);

            case 7:
              tmp = _this.generateCore();

              if (!_this.asyncHandler.add) {
                _context4.next = 26;
                break;
              }

              _this.beforeAsyncHandler({
                type: 'add'
              });

              index = _this.formList.length - 1 < 0 ? 0 : _this.formList.length - 1;
              result = true;
              _context4.prev = 12;
              _context4.next = 15;
              return _this.asyncHandler.add(tmp.getValues(), tmp, index);

            case 15:
              result = _context4.sent;
              _context4.next = 21;
              break;

            case 18:
              _context4.prev = 18;
              _context4.t0 = _context4["catch"](12);
              result = false;

            case 21:
              _this$handleAsyncResu3 = _this.handleAsyncResult(result), _this$handleAsyncResu4 = _this$handleAsyncResu3.success, res = _this$handleAsyncResu4 === void 0 ? true : _this$handleAsyncResu4, item = _this$handleAsyncResu3.item, rv = _this$handleAsyncResu3.values;
              success = res;

              if (item) {
                tmp.setValueSilent(item);
              }

              if (rv) {
                values = rv;
              }

              _this.afterAsyncHandler({
                type: 'add'
              });

            case 26:
              if (success) {
                if (values) {
                  _this.updateValue(values);
                } else {
                  _this.formList.push(tmp);
                }
              }

              return _context4.abrupt("return", success);

            case 28:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[12, 18]]);
    })));
    (0, _defineProperty2.default)(this, "updateInline",
    /*#__PURE__*/
    function () {
      var _ref7 = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee5(lastCore, id) {
        var success, values, currentValues, hasError, index, result, _this$handleAsyncResu5, _this$handleAsyncResu6, res, item, rv;

        return _regenerator.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                success = true;
                values = null;
                currentValues = lastCore.getValues();
                _context5.next = 5;
                return _this.hasValidateError();

              case 5:
                hasError = _context5.sent;

                if (!hasError) {
                  _context5.next = 8;
                  break;
                }

                return _context5.abrupt("return", false);

              case 8:
                if (!_this.asyncHandler.update) {
                  _context5.next = 26;
                  break;
                }

                _this.beforeAsyncHandler({
                  type: 'update',
                  inline: true
                });

                index = _this.formList.findIndex(function (rp) {
                  return rp.id === id;
                });
                result = true;
                _context5.prev = 12;
                _context5.next = 15;
                return _this.asyncHandler.update(currentValues, lastCore, index);

              case 15:
                result = _context5.sent;
                _context5.next = 21;
                break;

              case 18:
                _context5.prev = 18;
                _context5.t0 = _context5["catch"](12);
                result = false;

              case 21:
                _this$handleAsyncResu5 = _this.handleAsyncResult(result), _this$handleAsyncResu6 = _this$handleAsyncResu5.success, res = _this$handleAsyncResu6 === void 0 ? true : _this$handleAsyncResu6, item = _this$handleAsyncResu5.item, rv = _this$handleAsyncResu5.values;
                success = res;

                if (rv) {
                  values = rv;
                }

                if (item) {
                  currentValues = item;
                }

                _this.afterAsyncHandler({
                  type: 'update',
                  inline: true
                });

              case 26:
                if (success) {
                  if (values) {
                    _this.updateValue(values);
                  } else {
                    _this.formList = _this.formList.map(function (core) {
                      if (core.id === id) {
                        core.$focus = true;
                        core.$backup = core.getValues();
                        return core;
                      }

                      if (core.$focus) delete core.$focus;
                      return core;
                    });

                    _this.setEditWhenFocus();
                  }
                }

                return _context5.abrupt("return", success);

              case 28:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[12, 18]]);
      }));

      return function (_x, _x2) {
        return _ref7.apply(this, arguments);
      };
    }());
    (0, _defineProperty2.default)(this, "saveInline",
    /*#__PURE__*/
    function () {
      var _ref8 = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee6(id) {
        var hasError, success, values, lastCore, index, result, _this$handleAsyncResu7, _this$handleAsyncResu8, res, item, rv;

        return _regenerator.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return _this.hasValidateError();

              case 2:
                hasError = _context6.sent;

                if (!hasError) {
                  _context6.next = 5;
                  break;
                }

                return _context6.abrupt("return", false);

              case 5:
                success = true;
                values = null;
                lastCore = _this.formList.find(function (rp) {
                  return rp.id === id;
                });

                if (!lastCore) {
                  _context6.next = 27;
                  break;
                }

                if (!_this.asyncHandler.save) {
                  _context6.next = 27;
                  break;
                }

                _this.beforeAsyncHandler({
                  type: 'save',
                  inline: true
                });

                index = _this.formList.findIndex(function (rp) {
                  return rp.id === id;
                });
                result = true;
                _context6.prev = 13;
                _context6.next = 16;
                return _this.asyncHandler.save(lastCore.getValues(), lastCore, index);

              case 16:
                result = _context6.sent;
                _context6.next = 22;
                break;

              case 19:
                _context6.prev = 19;
                _context6.t0 = _context6["catch"](13);
                result = false;

              case 22:
                _this$handleAsyncResu7 = _this.handleAsyncResult(result), _this$handleAsyncResu8 = _this$handleAsyncResu7.success, res = _this$handleAsyncResu8 === void 0 ? true : _this$handleAsyncResu8, item = _this$handleAsyncResu7.item, rv = _this$handleAsyncResu7.values;
                success = res;

                if (item) {
                  lastCore.setValueSilent(item);
                }

                if (rv) {
                  values = rv;
                }

                _this.afterAsyncHandler({
                  type: 'save',
                  inline: true
                });

              case 27:
                if (success) {
                  if (values) {
                    _this.updateValue(values);
                  } else {
                    _this.formList = _this.formList.map(function (core) {
                      if (core.id === id) {
                        delete lastCore.$focus;
                        delete lastCore.$backup;
                        return lastCore;
                      }

                      return core;
                    });
                  }

                  _this.setEditWhenFocus();
                }

                return _context6.abrupt("return", success);

              case 29:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, null, [[13, 19]]);
      }));

      return function (_x3) {
        return _ref8.apply(this, arguments);
      };
    }());
    (0, _defineProperty2.default)(this, "cancelInline",
    /*#__PURE__*/
    function () {
      var _ref9 = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee7(id) {
        var list;
        return _regenerator.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                list = [];

                _this.formList.forEach(function (core) {
                  if (core.id === id) {
                    delete core.$focus;

                    if (core.$backup) {
                      // 已有项
                      core.setValueSilent(core.$backup);
                      delete core.$backup;
                      list.push(core);
                    } else {// do nothing...
                    }
                  } else {
                    list.push(core);
                  }
                });

                _this.setEditWhenFocus();

                _this.formList = list;

              case 4:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }));

      return function (_x4) {
        return _ref9.apply(this, arguments);
      };
    }());
    (0, _defineProperty2.default)(this, "handleAsyncResult", function (res) {
      var success = true;
      var values = null;
      var item = null;

      if (typeof res === 'boolean') {
        success = res;
      } else if (res === undefined) {
        success = true;
      } else if (Object.prototype.toString.call(res) === '[object Object]') {
        var _ref10 = res || {},
            rs = _ref10.success,
            ri = _ref10.item,
            rv = _ref10.values;

        success = rs;
        values = rv;
        item = ri;
      }

      return {
        success: success,
        values: values,
        item: item
      };
    });
    (0, _defineProperty2.default)(this, "add",
    /*#__PURE__*/
    function () {
      var _ref11 = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee8(core) {
        var success, values, index, result, _this$handleAsyncResu9, _this$handleAsyncResu10, res, item, rv;

        return _regenerator.default.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                success = true;
                values = null;

                if (!_this.asyncHandler.add) {
                  _context8.next = 20;
                  break;
                }

                _this.beforeAsyncHandler({
                  type: 'add'
                });

                index = _this.formList.length - 1 < 0 ? 0 : _this.formList.length - 1;
                result = true;
                _context8.prev = 6;
                _context8.next = 9;
                return _this.asyncHandler.add(core.getValues(), core, index);

              case 9:
                result = _context8.sent;
                _context8.next = 15;
                break;

              case 12:
                _context8.prev = 12;
                _context8.t0 = _context8["catch"](6);
                result = false;

              case 15:
                _this$handleAsyncResu9 = _this.handleAsyncResult(result), _this$handleAsyncResu10 = _this$handleAsyncResu9.success, res = _this$handleAsyncResu10 === void 0 ? true : _this$handleAsyncResu10, item = _this$handleAsyncResu9.item, rv = _this$handleAsyncResu9.values;
                success = res;

                if (item) {
                  core.setValueSilent(item);
                }

                if (rv) {
                  values = rv;
                }

                _this.afterAsyncHandler({
                  type: 'add'
                });

              case 20:
                if (success) {
                  if (values) {
                    _this.updateValue(values);
                  } else {
                    _this.formList.push(core);
                  }
                }

                return _context8.abrupt("return", success);

              case 22:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, null, [[6, 12]]);
      }));

      return function (_x5) {
        return _ref11.apply(this, arguments);
      };
    }());
    (0, _defineProperty2.default)(this, "remove",
    /*#__PURE__*/
    function () {
      var _ref12 = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee9(lastCore, id) {
        var success, values, index, lastValues, result, _this$handleAsyncResu11, _this$handleAsyncResu12, res, rv;

        return _regenerator.default.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                success = true;
                values = null;

                if (!_this.asyncHandler.remove) {
                  _context9.next = 21;
                  break;
                }

                _this.beforeAsyncHandler({
                  type: 'remove'
                });

                index = _this.formList.findIndex(function (rp) {
                  return rp.id === id;
                });
                lastValues = lastCore.getValues();
                result = true;
                _context9.prev = 7;
                _context9.next = 10;
                return _this.asyncHandler.remove(lastValues, lastCore, index);

              case 10:
                result = _context9.sent;
                _context9.next = 17;
                break;

              case 13:
                _context9.prev = 13;
                _context9.t0 = _context9["catch"](7);
                console.error('e', _context9.t0);
                result = false;

              case 17:
                _this$handleAsyncResu11 = _this.handleAsyncResult(result), _this$handleAsyncResu12 = _this$handleAsyncResu11.success, res = _this$handleAsyncResu12 === void 0 ? true : _this$handleAsyncResu12, rv = _this$handleAsyncResu11.values;
                success = res;

                if (rv) {
                  values = rv;
                }

                _this.afterAsyncHandler({
                  type: 'remove'
                });

              case 21:
                if (success) {
                  if (values) {
                    _this.updateValue(values);
                  } else {
                    _this.formList = _this.formList.filter(function (core) {
                      return core.id !== id;
                    });
                  }
                }

                return _context9.abrupt("return", success);

              case 23:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, null, [[7, 13]]);
      }));

      return function (_x6, _x7) {
        return _ref12.apply(this, arguments);
      };
    }());
    (0, _defineProperty2.default)(this, "update",
    /*#__PURE__*/
    function () {
      var _ref13 = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee10(currentCore, id) {
        var success, currentValues, values, index, result, _this$handleAsyncResu13, _this$handleAsyncResu14, res, item, rv;

        return _regenerator.default.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                success = true;
                currentValues = currentCore.getValues();
                values = null;

                if (!_this.asyncHandler.update) {
                  _context10.next = 21;
                  break;
                }

                _this.beforeAsyncHandler({
                  type: 'update'
                });

                index = _this.formList.findIndex(function (rp) {
                  return rp.id === id;
                });
                result = true;
                _context10.prev = 7;
                _context10.next = 10;
                return _this.asyncHandler.update(currentValues, currentCore, index);

              case 10:
                result = _context10.sent;
                _context10.next = 16;
                break;

              case 13:
                _context10.prev = 13;
                _context10.t0 = _context10["catch"](7);
                result = false;

              case 16:
                _this$handleAsyncResu13 = _this.handleAsyncResult(result), _this$handleAsyncResu14 = _this$handleAsyncResu13.success, res = _this$handleAsyncResu14 === void 0 ? true : _this$handleAsyncResu14, item = _this$handleAsyncResu13.item, rv = _this$handleAsyncResu13.values;
                success = res;

                if (rv) {
                  values = rv;
                }

                if (item) {
                  currentValues = item;
                }

                _this.afterAsyncHandler({
                  type: 'update'
                });

              case 21:
                if (success) {
                  if (values) {
                    _this.updateValue(values);
                  } else {
                    _this.formList = _this.formList.map(function (core) {
                      if (id === core.id) {
                        if (success) {
                          core.setValueSilent(currentValues);
                        }

                        return core;
                      }

                      return core;
                    });
                  }
                }

                return _context10.abrupt("return", success);

              case 23:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, null, [[7, 13]]);
      }));

      return function (_x8, _x9) {
        return _ref13.apply(this, arguments);
      };
    }());
    (0, _defineProperty2.default)(this, "updateValue",
    /*#__PURE__*/
    function () {
      var _ref14 = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee11(valueArr, event) {
        var _ref15, type, index, multiple, inline, changeKeys, forceRegenerate;

        return _regenerator.default.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                _ref15 = event || {}, type = _ref15.type, index = _ref15.index, multiple = _ref15.multiple, inline = _ref15.inline, changeKeys = _ref15.changeKeys, forceRegenerate = _ref15.forceRegenerate;

                if (Array.isArray(valueArr)) {
                  if (!type || forceRegenerate) {
                    _this.formList = valueArr.map(function (values) {
                      var formValues = values || {};

                      var core = _this.generateCore(formValues);

                      return core;
                    });
                  } else if (multiple) {
                    _this.formList = _this.formList.map(function (old, idx) {
                      if (type === 'update' && index === idx) {
                        // 处理同步修改，只修改动的值
                        if (Array.isArray(changeKeys)) {
                          var changedValues = {};
                          changeKeys.forEach(function (ck) {
                            changedValues[ck] = valueArr[index][ck];
                          });
                          old.setValues(changedValues);
                        } else {
                          old.setValues(valueArr[index]);
                        }
                      } // old = cb(old);


                      return old;
                    });
                  }

                  if (_this.asyncHandler.afterSetting) {
                    _this.asyncHandler.afterSetting(event, _this);
                  }
                }

              case 2:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11);
      }));

      return function (_x10, _x11) {
        return _ref14.apply(this, arguments);
      };
    }());
    var value = props.value,
        _status = props.status,
        _formConfig = props.formConfig,
        asyncHandler = props.asyncHandler,
        _multiple = props.multiple,
        multipleSyncHandler = props.multipleSyncHandler,
        setLoadingSideEffect = props.setLoadingSideEffect;
    this.formList = [];
    this.loading = false;
    this.status = _status || 'preview';
    this.formConfig = _formConfig || {};
    this.asyncHandler = asyncHandler || {};
    this.multiple = _multiple;

    this.multipleSyncHandler = multipleSyncHandler || function (x) {
      return x;
    };

    this.setLoadingSideEffect = setLoadingSideEffect || function (x) {
      return x;
    };

    if (Array.isArray(value)) {
      this.formList = value.map(function (itemValues) {
        return _this.generateCore(itemValues);
      });
    }
  };

  var _default = RepeaterCore;
  _exports.default = _default;
});