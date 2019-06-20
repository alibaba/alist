(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "@babel/runtime/helpers/typeof", "@babel/runtime/helpers/objectSpread", "@babel/runtime/regenerator", "@babel/runtime/helpers/asyncToGenerator", "@babel/runtime/helpers/classCallCheck", "@babel/runtime/helpers/createClass", "@babel/runtime/helpers/defineProperty", "async-validator", "events", "../static", "./item", "../util/random", "../util/scroll", "../util/is"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("@babel/runtime/helpers/typeof"), require("@babel/runtime/helpers/objectSpread"), require("@babel/runtime/regenerator"), require("@babel/runtime/helpers/asyncToGenerator"), require("@babel/runtime/helpers/classCallCheck"), require("@babel/runtime/helpers/createClass"), require("@babel/runtime/helpers/defineProperty"), require("async-validator"), require("events"), require("../static"), require("./item"), require("../util/random"), require("../util/scroll"), require("../util/is"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global._typeof, global.objectSpread, global.regenerator, global.asyncToGenerator, global.classCallCheck, global.createClass, global.defineProperty, global.asyncValidator, global.events, global._static, global.item, global.random, global.scroll, global.is);
    global.unknown = mod.exports;
  }
})(this, function (_exports, _typeof2, _objectSpread2, _regenerator, _asyncToGenerator2, _classCallCheck2, _createClass2, _defineProperty2, _asyncValidator, _events, _static, _item, _random, _scroll, _is) {
  "use strict";

  var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _typeof2 = _interopRequireDefault(_typeof2);
  _objectSpread2 = _interopRequireDefault(_objectSpread2);
  _regenerator = _interopRequireDefault(_regenerator);
  _asyncToGenerator2 = _interopRequireDefault(_asyncToGenerator2);
  _classCallCheck2 = _interopRequireDefault(_classCallCheck2);
  _createClass2 = _interopRequireDefault(_createClass2);
  _defineProperty2 = _interopRequireDefault(_defineProperty2);
  _asyncValidator = _interopRequireDefault(_asyncValidator);
  _events = _interopRequireDefault(_events);
  _item = _interopRequireDefault(_item);
  _random = _interopRequireDefault(_random);
  _scroll = _interopRequireDefault(_scroll);

  var genName = function genName() {
    return "__anonymouse__".concat((0, _random.default)());
  };

  var noop = function noop() {};

  var Form =
  /*#__PURE__*/
  function () {
    function Form() {
      var _this = this;

      var option = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      (0, _classCallCheck2.default)(this, Form);
      (0, _defineProperty2.default)(this, "handleChange", function (name) {
        if (!_this.silent && !_this.hasEmitted) {
          // 变化的keys必须为数组
          var relatedKeys = _this.settingBatchKeys || [name];

          if (_this.autoValidate) {
            // 按需校验
            var opts = _this.currentEventOpts || {};

            _this.validateItem(relatedKeys, undefined, opts);
          }

          _this.onChange(relatedKeys, _this.value, _this);

          _this.emit(_static.CHANGE, _this.value, relatedKeys, _this);
        }

        if (_this.silent) _this.hasEmitted = false;
        if (_this.isSetting) _this.hasEmitted = true;
      });
      (0, _defineProperty2.default)(this, "validateAll", function () {
        var cb = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function (x) {
          return x;
        };
        return _this.validatePure(_this.value, cb);
      });
      (0, _defineProperty2.default)(this, "validatePure", function (values) {
        var cb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (x) {
          return x;
        };
        var fillValidateConfig = {};
        Object.keys(_this.validateConfig).forEach(function (key) {
          if (typeof _this.validateConfig[key] === 'function') {
            fillValidateConfig[key] = _this.validateConfig[key](values, _this);
          } else {
            fillValidateConfig[key] = _this.validateConfig[key];
          }
        });
        var validator = new _asyncValidator.default(fillValidateConfig);
        var walked = false;
        var errors = null;
        var prom = new Promise(function (resolve) {
          validator.validate(values, function (err) {
            errors = err ? err[0].message : errors;
            walked = true;
            resolve(errors);
          });
        });

        if (walked) {
          return cb(errors);
        }

        return prom.then(function (errs) {
          return cb(errs);
        });
      });
      (0, _defineProperty2.default)(this, "handleErrors", function (errs, childList) {
        var errors = {};
        var retErr = {};
        var hasError = false;
        _this.validatng = false;
        var children = childList || _this.children;
        children.forEach(function (child, idx) {
          var currentHasError = false;
          var currentError = errs[idx];

          if ((0, _is.isObject)(errs[idx])) {
            var _errs$idx = errs[idx],
                main = _errs$idx.main,
                sub = _errs$idx.sub;

            if ((main || sub) && child.status !== 'hidden') {
              hasError = true;
              currentHasError = true;
            }
          } else if (currentError && child.status !== 'hidden') {
            hasError = true;
            currentHasError = true;
          }

          if (currentHasError && child.status !== 'hidden') {
            retErr[child.name] = currentError;
          }

          if (child.status === 'hidden') {
            errors[child.name] = null;
          } else {
            errors[child.name] = currentError || null;
          }
        });
        return {
          success: !hasError,
          errors4Setting: errors,
          errors4User: retErr
        };
      });

      var _ref = option || {},
          validateConfig = _ref.validateConfig,
          onChange = _ref.onChange,
          props = _ref.props,
          value = _ref.value,
          _values = _ref.values,
          status = _ref.status,
          globalStatus = _ref.globalStatus,
          interceptor = _ref.interceptor,
          uniqueId = _ref.uniqueId,
          onEvent = _ref.onEvent,
          onFocus = _ref.onFocus,
          onBlur = _ref.onBlur,
          initialized = _ref.initialized,
          autoValidate = _ref.autoValidate,
          disabledSyncChildForm = _ref.disabledSyncChildForm,
          enableReceiveProps = _ref.enableReceiveProps,
          initValues = _ref.initValues,
          exts = _ref.exts,
          _ref$repeaterRowCore = _ref.repeaterRowCore,
          repeaterRowCore = _ref$repeaterRowCore === void 0 ? false : _ref$repeaterRowCore;

      this.onChange = onChange || noop;
      this.children = [];
      this.childrenMap = {};
      this.currentEventType = 'api';
      this.autoValidate = autoValidate || false;
      this.exts = exts || {};
      this.enableReceiveProps = enableReceiveProps || false; // breakChange 下个y位升级

      this.repeaterRowCore = repeaterRowCore; // 避免JSX和core定位不清

      this.initValues = initValues;
      this.globalStatus = globalStatus || 'edit'; // 基础属性

      this.value = Object.assign({}, _values || value || initValues || {});
      this.status = (0, _is.isObject)(status) ? status : {}; // 避免jsx传入单值status

      this.props = Object.assign({}, props || {});
      this.error = {};
      this.public = {}; // 公共属性，由最顶层form维护

      this.escape = {}; // 用于避免嵌套form的filter逻辑的map

      this.interceptor = interceptor || {}; // 拦截器

      this.validateConfig = validateConfig;
      this.defaultSettingMap = {};
      this.onEvent = onEvent || noop;
      this.onFocus = onFocus || noop;
      this.onBlur = onBlur || noop;
      this.disabledSyncChildForm = disabledSyncChildForm || false; // 禁止子Form自动向Item同步数据

      this.id = uniqueId || "__noform__".concat((0, _random.default)());
      this.emitter = new _events.default();
      this.emitter.setMaxListeners(1000); // TODO: 最大值

      Array.from(['Value', 'Status', 'Error', 'Props', 'Public']).forEach(function (name) {
        // 多字段
        _this["set".concat(name)] = _this.set.bind(_this, name.toLowerCase());
        _this["get".concat(name)] = _this.get.bind(_this, name.toLowerCase()); // 单字段

        _this["setItem".concat(name)] = _this.setItem.bind(_this, name.toLowerCase());
        _this["getItem".concat(name)] = _this.get.bind(_this, name.toLowerCase());
      });
      this.initialized = initialized || noop; // 别名

      this.setValues = this.setValue;
      this.getValues = this.getValue; // 处理item的setValue事件

      this.on(_static.VALUE_CHANGE, this.handleChange);
      this.on(_static.INITIALIZED, this.initialized);
      this.on(_static.ON_EVENT, this.onEvent);
      this.on(_static.FOCUS, this.onFocus);
      this.on(_static.BLUR, this.onBlur);
    } // 上报change事件到JSX


    (0, _createClass2.default)(Form, [{
      key: "on",
      // 事件处理相关
      value: function on() {
        var _this$emitter;

        (_this$emitter = this.emitter).on.apply(_this$emitter, arguments);
      }
    }, {
      key: "emit",
      value: function emit() {
        var _this$emitter2;

        (_this$emitter2 = this.emitter).emit.apply(_this$emitter2, arguments);
      }
    }, {
      key: "removeListener",
      value: function removeListener() {
        var _this$emitter3;

        (_this$emitter3 = this.emitter).removeListener.apply(_this$emitter3, arguments);
      } // 检验单项

    }, {
      key: "validateItem",
      value: function () {
        var _validateItem = (0, _asyncToGenerator2.default)(
        /*#__PURE__*/
        _regenerator.default.mark(function _callee(name) {
          var cb,
              opts,
              _ref2,
              _ref2$withRender,
              withRender,
              arrName,
              validators,
              validatorIdxMap,
              childList,
              errs,
              _this$handleErrors,
              success,
              errors4Setting,
              errors4User,
              _args = arguments;

          return _regenerator.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  cb = _args.length > 1 && _args[1] !== undefined ? _args[1] : function (x) {
                    return x;
                  };
                  opts = _args.length > 2 && _args[2] !== undefined ? _args[2] : {};
                  _ref2 = opts || {}, _ref2$withRender = _ref2.withRender, withRender = _ref2$withRender === void 0 ? true : _ref2$withRender;
                  arrName = [].concat(name);
                  validators = [];
                  validatorIdxMap = {};
                  childList = [];
                  this.children.forEach(function (child) {
                    if (arrName.indexOf(child.name) !== -1) {
                      validatorIdxMap[child.name] = validators.length;
                      validators.push(child.validate(undefined, opts || {}));
                      childList.push(child);
                    }
                  });
                  this.validatng = true;
                  _context.next = 11;
                  return Promise.all(validators);

                case 11:
                  errs = _context.sent;
                  this.validatng = false;
                  _this$handleErrors = this.handleErrors(errs, childList), success = _this$handleErrors.success, errors4Setting = _this$handleErrors.errors4Setting, errors4User = _this$handleErrors.errors4User;

                  if (withRender) {
                    this.setError(errors4Setting);
                  }

                  if (!success) {
                    _context.next = 19;
                    break;
                  }

                  return _context.abrupt("return", cb(null));

                case 19:
                  return _context.abrupt("return", cb(errors4User));

                case 20:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        function validateItem(_x) {
          return _validateItem.apply(this, arguments);
        }

        return validateItem;
      }() // 纯净的校验方法, ui无关，不会涉及页面error 展示
      // 有别于validate方法是，不进行挂载，直接校验值

    }, {
      key: "validateBase",
      // 表单校验,返回错误对象
      value: function validateBase(cb, withRender) {
        var allkey = this.children.map(function (item) {
          return item.name;
        });
        return this.validateItem(allkey, cb, {
          withRender: withRender
        });
      }
    }, {
      key: "validateWithoutRender",
      value: function validateWithoutRender(cb) {
        return this.validateBase(cb, false);
      } // 表单校验,返回错误对象

    }, {
      key: "validate",
      value: function validate() {
        var cb = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function (x) {
          return x;
        };
        return this.validateBase(cb, true);
      }
    }, {
      key: "scrollToError",
      value: function scrollToError() {
        var _this2 = this;

        // 滚动到第一个报错的地方
        var errKeys = Object.keys(this.error).filter(function (key) {
          if ((0, _is.isObject)(_this2.error[key])) {
            var _this2$error$key = _this2.error[key],
                main = _this2$error$key.main,
                sub = _this2$error$key.sub;
            return main || sub;
          } else if (_this2.error[key]) {
            return true;
          }

          return false;
        });

        if (errKeys[0]) {
          var errorItem = this.children.find(function (item) {
            return item.name === errKeys[0];
          });

          if (errorItem && errorItem.id) {
            (0, _scroll.default)("#".concat(errorItem.id));
          }
        }
      }
    }, {
      key: "setValueSilent",
      // 静默设值
      value: function setValueSilent() {
        this.silent = true;

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        this.set.apply(this, ['value'].concat(args));
        this.silent = false;
      } // 设置单子段

    }, {
      key: "setItem",
      value: function setItem(type, name, value) {
        this.isSetting = true;
        var formatValue = value; // 处理props的情况，merge合并

        if (type === 'props') {
          var lastProps = this[type][name] || {};
          formatValue = value || {};
          formatValue = (0, _objectSpread2.default)({}, lastProps, formatValue);
        }

        this[type][name] = formatValue;
        var targetItem = this.children.find(function (child) {
          return child.name === name;
        });
        if (targetItem) targetItem.set(type, formatValue);

        if (type === 'value') {
          // 处理不在childNames里的值
          var childNames = this.children.map(function (child) {
            return child.name;
          });

          if (childNames.indexOf(name) === -1) {
            this.emit(_static.BASIC_EVENT[type], name, formatValue);
            this.emit(_static.ANY_CHANGE, type, name, formatValue);
          }
        }

        this.isSetting = false;
        this.hasEmitted = false;
      } // 重置value

    }, {
      key: "reset",
      value: function reset(keys) {
        var emptyValue = {};
        var resetKeys = [];

        if (Array.isArray(keys) && !this.initValues) {
          resetKeys = keys;
        } else {
          resetKeys = Object.keys(this.value);
        }

        resetKeys.forEach(function (key) {
          emptyValue[key] = null;
        });

        if (this.initValues) {
          emptyValue = (0, _objectSpread2.default)({}, emptyValue, this.initValues);
        }

        this.setValue(emptyValue);
      } // 重置错误信息

    }, {
      key: "resetError",
      value: function resetError(keys) {
        var emptyValue = {};
        var resetKeys = [];

        if (Array.isArray(keys)) {
          resetKeys = keys;
        } else {
          resetKeys = Object.keys(this.value);
        }

        resetKeys.forEach(function (key) {
          emptyValue[key] = null;
        });
        this.setError(emptyValue);
      } // 设置多字段

    }, {
      key: "set",
      value: function set(type, value) {
        var _this3 = this;

        // 设置单字段
        if ((0, _is.isSingleItemSet)(arguments)) {
          this.setItem(type, value, arguments[2]);
          return;
        }

        if (type === 'status' && typeof value === 'string') {
          this.setGlobalStatus(value);
          return;
        }

        this.isSetting = true; // 异常情况

        if ((0, _typeof2.default)(value) !== 'object') {
          this.isSetting = false;
          this.hasEmitted = false;
          return;
        } // 处理props的情况，merge合并


        var formatValue = value;

        if (type === 'props') {
          formatValue = value || {};
          Object.keys(formatValue).forEach(function (propsKey) {
            var targetProps = formatValue[propsKey] || {};
            var lastProps = _this3[type][propsKey] || {};
            formatValue[propsKey] = (0, _objectSpread2.default)({}, lastProps, targetProps);
          });
        }

        this[type] = (0, _objectSpread2.default)({}, this[type], formatValue);

        if (type === 'value') {
          this.settingBatchKeys = Object.keys(value); // 批量变化的值
        }

        var childNames = [];
        this.children.forEach(function (child) {
          child.set(type, _this3[type][child.name]);
          childNames.push(child.name);
        });

        if (type === 'value') {
          // 处理不在childNames里的值
          if (Array.isArray(this.settingBatchKeys)) {
            this.settingBatchKeys.forEach(function (setKey) {
              if (childNames.indexOf(setKey) === -1) {
                _this3.emit(_static.BASIC_EVENT[type], setKey, _this3[type][setKey]);

                _this3.emit(_static.ANY_CHANGE, type, setKey, _this3[type][setKey]);
              }
            });
          }
        }

        this.isSetting = false;
        this.hasEmitted = false;
        this.settingBatchKeys = null;
      } // 全局状态

    }, {
      key: "setGlobalStatus",
      value: function setGlobalStatus(targetStatus) {
        if (this.globalStatus === targetStatus) {
          return this;
        }

        this.globalStatus = targetStatus;
        var status = {};
        this.children.forEach(function (child) {
          status[child.name] = targetStatus;
        });
        return this.setStatus(status);
      }
    }, {
      key: "getGlobalStatus",
      value: function getGlobalStatus() {
        return this.globalStatus;
      } // 获取多值

    }, {
      key: "getAll",
      value: function getAll(type, name) {
        if (name) {
          return this[type][name];
        }

        return this[type];
      } // 获取值

    }, {
      key: "get",
      value: function get(type, name) {
        if (name) {
          return this[type][name];
        }

        var ret = this.filter(this.getAll(type));

        if (type === 'error') {
          var hasError = false;
          Object.keys(ret).forEach(function (key) {
            if (ret[key]) {
              hasError = true;
            }
          });
          if (!hasError) ret = null;
        }

        return ret;
      }
    }, {
      key: "filter",
      value: function filter(obj) {
        var _this4 = this;

        if (!(0, _is.isObject)(obj)) {
          return obj;
        } // filter的原意是去除隐藏 和 匿名字段的值，但是和之前处理嵌套Form的逻辑有冲突（实际上遍历key处理实际上意义不大）
        // TODO: 单测衡量一下去除filter处理对象的逻辑，解决后升y位


        var ret = {};
        Object.keys(obj).forEach(function (key) {
          if (_this4.escape[key]) {
            ret[key] = obj[key];
          } else if (key.indexOf('__anonymouse__') !== 0 && _this4.get('status', key) !== 'hidden') {
            ret[key] = _this4.filter(obj[key]);
          }
        });
        return ret;
      }
    }, {
      key: "addField",
      value: function addField(fieldProps) {
        var _this5 = this;

        // 处理非数组情况，考虑null,undefined
        if (!Array.isArray(fieldProps)) {
          // eslint-disable-next-line
          fieldProps = [fieldProps];
        }

        var ret = fieldProps.map(function (option) {
          var mrOption = Object.assign({}, option);
          var value = option.value,
              name = option.name,
              status = option.status,
              error = option.error,
              props = option.props,
              func_status = option.func_status,
              _option$defaultValue = option.defaultValue,
              defaultValue = _option$defaultValue === void 0 ? null : _option$defaultValue,
              localInterceptor = option.interceptor;

          if (_this5.childrenMap[name]) {
            return _this5.childrenMap[name];
          } // name特殊处理


          if (typeof name === 'number') mrOption.name = "".concat(name);
          if (!name) mrOption.name = genName(); // JSX 属性 > core默认值 > 默认属性(globalStatus) > 空值

          mrOption.jsx_status = status || func_status;
          var itemGlobalValue = (0, _is.isInvalidVal)(_this5.value[name]) ? null : _this5.value[name];
          var itemValue = itemGlobalValue; // undefined 作为未定义的标志，null作为未赋值的标志

          if (!_this5.defaultSettingMap[name] && !(name in _this5.value)) {
            itemValue = (0, _is.isInvalidVal)(itemGlobalValue) ? defaultValue : itemGlobalValue;
            _this5.defaultSettingMap[name] = true;
          }

          mrOption.value = (0, _is.isInvalidVal)(value) ? itemValue : value;
          _this5.value[mrOption.name] = mrOption.value; // eslint-disable-next-line

          _this5.status[mrOption.name] = mrOption.status = status || _this5.status[name] || _this5.globalStatus;
          var presetProps = (0, _objectSpread2.default)({}, _this5.props[mrOption.name] || {}, props || {});
          _this5.props[mrOption.name] = mrOption.props = presetProps;
          _this5.error[mrOption.name] = mrOption.error = error || null;
          var item = new _item.default((0, _objectSpread2.default)({}, mrOption, {
            on: _this5.on.bind(_this5),
            emit: _this5.emit.bind(_this5),
            removeListener: _this5.removeListener.bind(_this5),
            interceptor: localInterceptor || _this5.interceptor[mrOption.name],
            form: _this5
          }));
          _this5.childrenMap[item.name] = item;

          _this5.children.push(item);

          return item;
        });

        if (ret.length === 1) {
          return ret[0];
        }

        return ret;
      }
    }, {
      key: "updateField",
      value: function updateField(props) {
        var _this6 = this;

        if (!Array.isArray(props)) {
          // eslint-disable-next-line
          props = [props];
        }

        props.forEach(function (option) {
          if (!option.name) {
            throw Error('updateField must specify name');
          }

          _this6.childrenMap[option.name].updateField(option);
        });
      }
    }, {
      key: "setValidateConfig",
      value: function setValidateConfig(config) {
        var replace = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        if ((0, _is.isObject)(config)) {
          this.validateConfig = config;
          this.children.forEach(function (child) {
            if (child.name in config) {
              child.setValidateConfig(config[child.name]);
            } else if (replace) {
              child.setValidateConfig({});
            }
          });
        }
      }
    }]);
    return Form;
  }();

  var _default = Form;
  _exports.default = _default;
});