(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "@babel/runtime/regenerator", "@babel/runtime/helpers/asyncToGenerator", "@babel/runtime/helpers/objectSpread", "@babel/runtime/helpers/classCallCheck", "@babel/runtime/helpers/createClass", "@babel/runtime/helpers/defineProperty", "async-validator", "deep-equal", "../static", "../util/random", "../util/is"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("@babel/runtime/regenerator"), require("@babel/runtime/helpers/asyncToGenerator"), require("@babel/runtime/helpers/objectSpread"), require("@babel/runtime/helpers/classCallCheck"), require("@babel/runtime/helpers/createClass"), require("@babel/runtime/helpers/defineProperty"), require("async-validator"), require("deep-equal"), require("../static"), require("../util/random"), require("../util/is"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.regenerator, global.asyncToGenerator, global.objectSpread, global.classCallCheck, global.createClass, global.defineProperty, global.asyncValidator, global.deepEqual, global._static, global.random, global.is);
    global.unknown = mod.exports;
  }
})(this, function (_exports, _regenerator, _asyncToGenerator2, _objectSpread2, _classCallCheck2, _createClass2, _defineProperty2, _asyncValidator, _deepEqual, _static, _random, _is) {
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
  _createClass2 = _interopRequireDefault(_createClass2);
  _defineProperty2 = _interopRequireDefault(_defineProperty2);
  _asyncValidator = _interopRequireDefault(_asyncValidator);
  _deepEqual = _interopRequireDefault(_deepEqual);
  _random = _interopRequireDefault(_random);

  function isFunction(func) {
    return typeof func === 'function';
  }

  var Item =
  /*#__PURE__*/
  function () {
    function Item(option) {
      var _this = this;

      (0, _classCallCheck2.default)(this, Item);
      (0, _defineProperty2.default)(this, "bindForm", function (childForm) {
        // console.log('item inner exec bindForm ...');
        _this.childForm = childForm;
      });
      if (!option) return; // context的机制，这里不做真实的操作

      this.option = option;
      this.initWith(option);
      this.on(_static.ANY_CHANGE, function () {
        if (!_this.consistenting) {
          _this.selfConsistent();
        }
      });
    }

    (0, _createClass2.default)(Item, [{
      key: "validate",
      value: function validate() {
        var _this2 = this;

        var cb = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function (e) {
          return e;
        };
        var opts = arguments.length > 1 ? arguments[1] : undefined;
        var validateConfig = this.validateConfig;
        var subField = this.subField;
        var errors = null;

        if (typeof validateConfig === 'function') {
          validateConfig = validateConfig(this.form.value, this.form);
        }

        if (!validateConfig && !subField) {
          return cb(errors); // 直接返回空
        } // 需要判断是否有更下层的校验(组件层面)


        var subValidator = null;
        var hasSubPromise = false;

        if (subField) {
          errors = {
            // 错误需要增加一个维度，才能满足子项校验
            main: null,
            sub: null
          };
          var result = subField.validate(undefined, opts);

          if ((0, _is.isPromise)(result)) {
            hasSubPromise = true;
          }

          subValidator = result;
        }

        var walked = false;
        var prom = null;

        if (validateConfig) {
          this.validator = new _asyncValidator.default((0, _defineProperty2.default)({}, this.name, validateConfig));
          prom = new Promise(function (resolve) {
            _this2.validator.validate((0, _defineProperty2.default)({}, _this2.name, _this2.get('value')), function (err) {
              if (err) {
                var mainError = err[0].message;

                if (subField) {
                  errors.main = mainError;
                } else {
                  errors = mainError;
                }
              }

              walked = true;
              resolve(errors);
            });
          }).catch(function () {// do nothing...
          });
        } else {
          walked = true;
        } // 处理子项是promise的情况


        var subPromiseHandler = function subPromiseHandler() {
          return Promise.resolve(subValidator).then(function (subErr) {
            errors.sub = subErr;
            return errors;
          }).then(cb);
        };

        if (walked) {
          if (hasSubPromise) {
            return subPromiseHandler(errors);
          }

          if (subField) {
            errors.sub = subValidator;
          }

          return cb(errors);
        }

        if (prom) {
          return prom.then(function (errs) {
            if (hasSubPromise) {
              return subPromiseHandler(errs);
            }

            return cb(errs);
          });
        }

        return cb(errors);
      }
    }, {
      key: "updateField",
      value: function updateField(option) {
        this.initWith((0, _objectSpread2.default)({}, this, option));
      }
    }, {
      key: "addSubField",
      // 通用组件层，目前主要用于层级校验
      // 需要commonField实现validate
      value: function addSubField(subField) {
        subField.parent = this;
        this.subField = subField;
      }
    }, {
      key: "initWith",
      value: function initWith(option) {
        var form = option.form,
            on = option.on,
            emit = option.emit,
            removeListener = option.removeListener,
            isIf = option.isIf;
        this.form = form;
        this.on = on;
        this.emit = emit;
        this.removeListener = removeListener;
        var id = option.id,
            interceptor = option.interceptor,
            name = option.name,
            value = option.value,
            props = option.props,
            error = option.error,
            status = option.status,
            _option$when = option.when,
            when = _option$when === void 0 ? null : _option$when,
            validateConfig = option.validateConfig,
            parentIf = option.parentIf,
            func_status = option.func_status,
            func_props = option.func_props,
            jsx_status = option.jsx_status;
        this.isIf = !!isIf;
        this.name = name;
        this.value = value;
        this.props = props;
        this.status = status;
        this.when = when;
        this.parentIf = parentIf;
        this.error = error;
        this.validateConfig = validateConfig;
        this.interceptor = interceptor;
        this.subField = null;
        this.id = id || "__noform__item__".concat((0, _random.default)());
        this.func_props = func_props;
        this.func_status = func_status;
        this.jsx_status = jsx_status;

        if (validateConfig) {
          this.jsxValidate = true;
        }

        this.selfConsistent();
      }
    }, {
      key: "consistValidate",
      value: function consistValidate() {
        if (this.name && this.form && this.form.validateConfig && this.name in this.form.validateConfig && !this.jsxValidate) {
          var currentValidateConfig = this.form.validateConfig[this.name];
          this.validateConfig = currentValidateConfig;
        }
      }
    }, {
      key: "consistWhen",
      value: function consistWhen(value, status) {
        var when = this.when,
            parentIf = this.parentIf;
        var whenResultFlag = this.calulateWhen(value, when); // 计算上层if链路结果，如果上层链路的结果不成功，则不需要计算了

        var upperWhenResult = true;

        if (parentIf) {
          upperWhenResult = this.calculateIfList(value);
        }

        if (!upperWhenResult) {
          whenResultFlag = false;
        }

        if (whenResultFlag === true) {
          this.set('status', status);
        } else if (whenResultFlag === false) {
          this.set('status', 'hidden');
        }
      }
    }, {
      key: "calculateIfList",
      value: function calculateIfList(value) {
        var _this3 = this;

        var parentIf = this.parentIf;
        var upperIfList = [];
        var item = {
          parentIf: parentIf
        };

        while (item.parentIf) {
          upperIfList.push(item.parentIf);
          item = item.parentIf;
        } // result表示上层整体的when的结果，如果有任意false，则整体结果为false，反之为true


        var boolList = upperIfList.map(function (ifCore) {
          return _this3.calulateWhen(value, ifCore.when);
        });
        return boolList.reduce(function (before, after) {
          return before && after;
        });
      }
    }, {
      key: "calulateWhen",
      value: function calulateWhen(value, when) {
        var form = this.form;
        var whenResult = when;
        if (isFunction(when)) whenResult = when(value, form); // 可能为promise

        return whenResult;
      }
    }, {
      key: "consistStatus",
      value: function consistStatus(value) {
        var _this4 = this;

        var silent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var form = this.form,
            func_status = this.func_status,
            when = this.when,
            jsx_status = this.jsx_status,
            calulateWhen = this.calulateWhen;
        var syncSetting = true;
        var escape = false;
        var whenResult = when ? this.calulateWhen(value, when) : false;
        var canConsistWhen = when === null || whenResult;
        var statusResult = form.globalStatus;

        if (canConsistWhen && !this.isIf) {
          var localstatus = this.name ? form ? form.status[this.name] : this.status : null;

          if (localstatus !== 'hidden' && statusResult !== localstatus) {
            statusResult = localstatus;
          }
        }

        if (jsx_status) {
          // 可能为promise
          if (isFunction(func_status)) {
            statusResult = func_status(value, form);

            if ((0, _is.isPromise)(statusResult)) {
              syncSetting = false;
              statusResult.then(function (dynamicResult) {
                if (dynamicResult && _static.STATUS_ENUMS.has(dynamicResult) && canConsistWhen) {
                  // if (dynamicResult && STATUS_ENUMS.has(dynamicResult) && when === null) {
                  _this4.set('status', dynamicResult, escape, silent);
                }
              });
            }
          } else if (jsx_status && _static.STATUS_ENUMS.has(jsx_status)) {
            // 写死JSX状态
            statusResult = jsx_status;
          } // if (syncSetting && statusResult && STATUS_ENUMS.has(statusResult) && when === null) {


          if (syncSetting && statusResult && _static.STATUS_ENUMS.has(statusResult) && canConsistWhen) {
            this.set('status', statusResult, escape, silent);
          }
        }

        return statusResult;
      }
    }, {
      key: "consistProps",
      value: function consistProps() {
        var _this5 = this;

        var form = this.form,
            func_props = this.func_props;

        if (isFunction(func_props)) {
          var props = form.getAll('props', this.name);
          var propsResult = func_props(props, form);

          if ((0, _is.isPromise)(propsResult)) {
            propsResult.then(function (dynamicPropResult) {
              _this5.set('props', dynamicPropResult);
            });
          } else {
            this.set('props', propsResult);
          }
        }
      } // 自我调整

    }, {
      key: "selfConsistent",
      value: function selfConsistent() {
        this.consistenting = true; // debounce

        var value = this.form.getAll('value');
        var status = this.consistStatus(value); // 调整状态

        this.consistValidate(); // 调整校验规则

        this.consistWhen(value, status); // 调整联动判断

        this.consistProps(); // 调整属性

        this.consistenting = false;
      }
    }, {
      key: "setValidateConfig",
      value: function setValidateConfig(config) {
        this.validateConfig = config;
      }
    }, {
      key: "get",
      value: function get(type) {
        return this.form[type][this.name];
      }
    }, {
      key: "set",
      value: function () {
        var _set = (0, _asyncToGenerator2.default)(
        /*#__PURE__*/
        _regenerator.default.mark(function _callee(type, value) {
          var escape,
              silent,
              ftValue,
              ftResult,
              ftValTmp,
              _args = arguments;
          return _regenerator.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  escape = _args.length > 2 && _args[2] !== undefined ? _args[2] : false;
                  silent = _args.length > 3 && _args[3] !== undefined ? _args[3] : false;
                  ftValue = value; // interceptor一般为function, 在类型为value时处理

                  if (!(type === 'value' && typeof this.interceptor === 'function')) {
                    _context.next = 13;
                    break;
                  }

                  ftResult = this.interceptor(value);

                  if (!(0, _is.isPromise)(ftResult)) {
                    _context.next = 12;
                    break;
                  }

                  _context.next = 8;
                  return ftResult;

                case 8:
                  ftValTmp = _context.sent;
                  if (ftValTmp !== undefined) ftValue = ftValTmp;
                  _context.next = 13;
                  break;

                case 12:
                  if (ftResult !== undefined) {
                    ftValue = ftResult;
                  }

                case 13:
                  if (!(0, _deepEqual.default)(this[type], ftValue)) {
                    _context.next = 15;
                    break;
                  }

                  return _context.abrupt("return", false);

                case 15:
                  this.form[type][this.name] = ftValue;
                  this[type] = ftValue;
                  this.form.escape[this.name] = escape;

                  if (!silent) {
                    this.emit(_static.BASIC_EVENT[type], this.name, ftValue);
                    this.emit(_static.ANY_CHANGE, type, this.name, ftValue);
                  }

                  return _context.abrupt("return", true);

                case 20:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        function set(_x, _x2) {
          return _set.apply(this, arguments);
        }

        return set;
      }()
    }]);
    return Item;
  }();

  var _default = Item;
  _exports.default = _default;
});