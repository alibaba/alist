(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "@babel/runtime/helpers/extends", "@babel/runtime/helpers/objectWithoutProperties", "@babel/runtime/helpers/objectSpread", "@babel/runtime/helpers/classCallCheck", "@babel/runtime/helpers/createClass", "@babel/runtime/helpers/possibleConstructorReturn", "@babel/runtime/helpers/getPrototypeOf", "@babel/runtime/helpers/assertThisInitialized", "@babel/runtime/helpers/inherits", "@babel/runtime/helpers/defineProperty", "react", "prop-types", "./BaseItem", "../static", "../util/random", "../util/is", "../context/form", "../context/if", "../context/item", "./Section"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("@babel/runtime/helpers/extends"), require("@babel/runtime/helpers/objectWithoutProperties"), require("@babel/runtime/helpers/objectSpread"), require("@babel/runtime/helpers/classCallCheck"), require("@babel/runtime/helpers/createClass"), require("@babel/runtime/helpers/possibleConstructorReturn"), require("@babel/runtime/helpers/getPrototypeOf"), require("@babel/runtime/helpers/assertThisInitialized"), require("@babel/runtime/helpers/inherits"), require("@babel/runtime/helpers/defineProperty"), require("react"), require("prop-types"), require("./BaseItem"), require("../static"), require("../util/random"), require("../util/is"), require("../context/form"), require("../context/if"), require("../context/item"), require("./Section"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global._extends, global.objectWithoutProperties, global.objectSpread, global.classCallCheck, global.createClass, global.possibleConstructorReturn, global.getPrototypeOf, global.assertThisInitialized, global.inherits, global.defineProperty, global.react, global.propTypes, global.BaseItem, global._static, global.random, global.is, global.form, global._if, global.item, global.Section);
    global.unknown = mod.exports;
  }
})(this, function (_exports, _extends2, _objectWithoutProperties2, _objectSpread2, _classCallCheck2, _createClass2, _possibleConstructorReturn2, _getPrototypeOf2, _assertThisInitialized2, _inherits2, _defineProperty2, _react, _propTypes, _BaseItem, _static, _random, _is, _form2, _if, _item, _Section) {
  "use strict";

  var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _extends2 = _interopRequireDefault(_extends2);
  _objectWithoutProperties2 = _interopRequireDefault(_objectWithoutProperties2);
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
  _BaseItem = _interopRequireDefault(_BaseItem);
  _random = _interopRequireDefault(_random);
  _form2 = _interopRequireDefault(_form2);
  _if = _interopRequireDefault(_if);
  _item = _interopRequireDefault(_item);
  _Section = _interopRequireDefault(_Section);
  var formItemPrefix = 'no-form';

  var noop = function noop() {};

  var getValue = function getValue(jsxProps) {
    var hasVal = 'value' in jsxProps;

    if (hasVal) {
      return jsxProps.value;
    }

    return null;
  };

  var getDefaultValue = function getDefaultValue(jsxProps) {
    var hasDefaultVal = 'defaultValue' in jsxProps;

    if (hasDefaultVal) {
      return jsxProps.defaultValue;
    }

    return null;
  };

  var BaseFormItem =
  /*#__PURE__*/
  function (_React$Component) {
    (0, _inherits2.default)(BaseFormItem, _React$Component);

    function BaseFormItem(_props) {
      var _this;

      (0, _classCallCheck2.default)(this, BaseFormItem);
      _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(BaseFormItem).call(this, _props));
      (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "componentWillReceiveProps", function (nextProps) {
        var _this$core = _this.core,
            jsx_status = _this$core.jsx_status,
            func_status = _this$core.func_status;
        var status = nextProps.status;
        var needConsist = false;

        if (typeof status === 'function' && func_status !== status) {
          _this.core.func_status = status;
          needConsist = true;
        } else if (_static.STATUS_ENUMS.has(status) && status !== jsx_status) {
          _this.core.jsx_status = status;
          needConsist = true;
        }

        if (needConsist) {
          var value = _this.form.getAll('value');

          var silent = true;

          _this.core.consistStatus(value, silent);
        }
      });
      (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onChange", function () {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        var e = args[0],
            _args$ = args[1],
            opts = _args$ === void 0 ? {} : _args$;
        var _opts$escape = opts.escape,
            escape = _opts$escape === void 0 ? false : _opts$escape; // 直接用原生对象不进行判断

        var val = e;

        if (!escape) {
          if (e && e.target) {
            if ('value' in e.target) {
              val = e.target.value;
            } else if ('checked' in e.target) {
              val = e.target.checked;
            }
          }

          if ((0, _is.isObject)(val)) {
            var tmpStr = JSON.stringify(val);

            try {
              val = JSON.parse(tmpStr);
            } catch (exception) {
              val = {};
            }
          }
        }

        _this.form.currentCore = _this.core;
        _this.form.currentEventOpts = opts;
        _this.form.currentEventType = 'manual';

        _this.core.set('value', val, escape);

        Promise.resolve().then(function () {
          _this.form.currentCore = null;
          _this.form.currentEventOpts = null;
          _this.form.currentEventType = 'api';
        });
        var onChange = _this.props.onChange;

        _this.onEvent('onChange', args);

        if (onChange) onChange.apply(void 0, args); // 把原本劫持的方法提供api供开发者使用
      });
      (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onBlur", function () {
        _this.core.emit(_static.BLUR, _this.core.name);

        _this.onEvent('onBlur', []);

        if (typeof _this.props.onBlur === 'function') {
          _this.props.onBlur();
        }
      });
      (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onFocus", function () {
        _this.core.emit(_static.FOCUS, _this.core.name);

        _this.onEvent('onFocus', []);

        if (typeof _this.props.onFocus === 'function') {
          _this.props.onFocus();
        }
      });
      (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onEvent", function (functionName, args) {
        _this.core.emit(_static.ON_EVENT, {
          fireKey: _this.core.name,
          fn: functionName,
          args: args
        });
      });
      (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "getBaseProps", function () {
        Object.keys(_this.props || {}).forEach(function (propKey) {
          if (typeof propKey === 'string' && propKey.startsWith('on') && ['onChange', 'onBlur', 'onFocus', 'onEvent'].indexOf(propKey) === -1 && typeof _this.props[propKey] === 'function') {
            if (!_this[propKey]) {
              _this.eventProps[propKey] = function () {
                var _this$props;

                for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                  args[_key2] = arguments[_key2];
                }

                _this.onEvent(propKey, args);

                if (_this.props[propKey]) (_this$props = _this.props)[propKey].apply(_this$props, args);
              };
            }
          }
        });
        return {
          eventProps: _this.eventProps,
          predictChildForm: _this.predictChildForm,
          children: _this.props.children,
          render: _this.props.render,
          didMount: _this.didMount,
          form: _this.form,
          onChange: _this.onChange,
          onBlur: _this.onBlur,
          onFocus: _this.onFocus,
          inset: _this.props.inset,
          name: _this.core.name,
          formProps: _this.predictChildForm ? _this.getSuperFormProps() : {}
        };
      });
      (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "getSuperFormProps", function () {
        var formProps = {};

        if (_this.core.form && _this.core.form.jsx.props) {
          var _this$core$form$jsx$p = _this.core.form.jsx.props,
              defaultMinWidth = _this$core$form$jsx$p.defaultMinWidth,
              full = _this$core$form$jsx$p.full,
              inline = _this$core$form$jsx$p.inline,
              inset = _this$core$form$jsx$p.inset,
              layout = _this$core$form$jsx$p.layout,
              colon = _this$core$form$jsx$p.colon;
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
      (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "getWrapperClassName", function () {
        var isFlex = _this.getIsFlexMode();

        var _this$props2 = _this.props,
            name = _this$props2.name,
            propError = _this$props2.error;
        var inset = _this.props.inset || _this.form.jsx.props.inset;

        var error = _this.form.getItemError(name); // 动态error


        if (!name) {
          error = propError;
        } // 处理错误信息


        var hasMainError = !!error;
        var hasSubError = false;

        if ((0, _is.isObject)(error)) {
          // 对象的情况
          hasMainError = error.main;
          hasSubError = error.sub;
        }

        var flexCls = '';

        if (isFlex) {
          flexCls = "".concat(formItemPrefix, "-item-flex");
        }

        var insetCls = inset ? "".concat(formItemPrefix, "-item-inset") : '';
        var errCls = hasMainError ? "".concat(formItemPrefix, "-item-has-error") : '';
        var subErrCls = hasSubError ? "".concat(formItemPrefix, "-item-has-sub-error") : '';
        return "".concat(insetCls, " ").concat(errCls, " ").concat(subErrCls, " ").concat(flexCls);
      });
      (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "getLabelClassName", function () {
        var _this$props3 = _this.props,
            name = _this$props3.name,
            propStatus = _this$props3.status;
        var props = _this.form.getItemProps(name) || {}; // 动态props

        var status = name ? _this.form.getItemStatus(name) : propStatus; // 动态status

        var layoutProps = (0, _objectSpread2.default)({}, _this.form.jsx.props, _this.props); // 保留item关键字属性

        var _this$props$props = (0, _objectSpread2.default)({}, _this.props, props),
            required = _this$props$props.required;

        var requiredCls = '';

        if (required && (status === _static.EDIT || "".concat(name) === '')) {
          requiredCls = ' required';
        }

        var layout = layoutProps.layout || {};
        return "".concat(formItemPrefix, "-item-label ").concat(requiredCls, " ").concat(layout.label ? "col-".concat(layout.label) : '');
      });
      (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "getDirectionClassName", function () {
        var isFlex = _this.getIsFlexMode();

        var direction = _this.props.direction || _this.form.jsx.props.direction || 'vertical';
        var directionCls = "".concat(formItemPrefix, "-item-direction-").concat(direction);
        return "".concat(directionCls);
      });
      (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "getIsFlexMode", function () {
        var _this$props$flex = _this.props.flex,
            flex = _this$props$flex === void 0 ? false : _this$props$flex;
        return flex;
      });
      (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "getFullClassName", function () {
        var name = _this.props.name;
        var props = _this.form.getItemProps(name) || {}; // 动态props
        // 保留item关键字属性

        var _this$props$props2 = (0, _objectSpread2.default)({}, _this.props, props),
            coreFull = _this$props$props2.full; // 处理布局


        var _this$form$jsx$props$ = (0, _objectSpread2.default)({}, _this.form.jsx.props, _this.props),
            _this$form$jsx$props$2 = _this$form$jsx$props$.inset,
            inset = _this$form$jsx$props$2 === void 0 ? false : _this$form$jsx$props$2,
            jsxFull = _this$form$jsx$props$.full;

        var full = jsxFull || coreFull || inset;
        return "".concat(formItemPrefix, "-item-content ").concat(full ? "".concat(formItemPrefix, "-item-content-full") : '');
      });
      (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "pickupComponentProps", function (props) {
        var reservedWords = ['name', 'value', 'error', 'props', 'label', 'required', 'suffix', 'prefix', 'top', 'help', 'onChange', 'onBlur', 'onFocus', 'key', 'children'];
        var comp = {};
        Object.keys(props || {}).forEach(function (key) {
          if (reservedWords.indexOf(key) === -1) {
            comp[key] = props[key];
          }
        });
        return comp;
      });
      (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "initialCore", function (props) {
        var componentProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var name = props.name,
            error = props.error,
            itemProps = props.props,
            status = props.status,
            form = props.form,
            ifCore = props.ifCore;
        var value = getValue(props);
        var defaultValue = getDefaultValue(props);
        var option = {
          error: error,
          value: value,
          name: name,
          defaultValue: defaultValue
        }; // 上有if item

        if (ifCore) {
          option.when = ifCore.when;
          option.parentIf = ifCore.parentIf;
        } // 处理props


        if ('props' in props) {
          if ((0, _is.isFunction)(itemProps)) {
            option.func_props = itemProps;
            option.props = {};
          } else {
            option.props = (0, _objectSpread2.default)({}, componentProps, itemProps);
          }
        } else {
          option.props = (0, _objectSpread2.default)({}, componentProps);
        } // 处理status


        if ('status' in props) {
          if ((0, _is.isFunction)(status)) {
            option.func_status = status;
          } else {
            option.status = status;
          }
        } // 校验规则, 拦截器，when, 及id


        ['validateConfig', 'interceptor', 'id', 'when'].forEach(function (key) {
          if (key in props) {
            option[key] = props[key];
          }
        });
        var core = form.addField(option);
        return core;
      });
      (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handlePredictForm", function (props, sideEffect) {
        // 构建时提前知道子类，比didmount再来通知，把控性好很多
        var children = props.children;
        _this.displayName = '';

        if (children) {
          if (_react.default.isValidElement(children)) {
            var jsxComponent = _react.default.Children.only(children);

            if (jsxComponent) {
              sideEffect(jsxComponent);
            }

            if (jsxComponent && jsxComponent.type && jsxComponent.type.displayName) {
              _this.displayName = jsxComponent.type.displayName;
            }
          }
        }

        var predictForm = _this.displayName === 'NoForm';
        return predictForm;
      });
      (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "hitListenKeys", function (key) {
        var _this$props4 = _this.props,
            listenKeys = _this$props4.listenKeys,
            render = _this$props4.render;

        if (render) {
          if (listenKeys.length === 0) {
            return true;
          }

          return listenKeys.indexOf(key) !== -1;
        }

        return _this.core.name === key;
      });
      (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "update", function (type, name, value) {
        var silent = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
        // value, props, error, status
        var _this$props5 = _this.props,
            _this$props5$listenEr = _this$props5.listenError,
            listenError = _this$props5$listenEr === void 0 ? false : _this$props5$listenEr,
            _this$props5$listenPr = _this$props5.listenProps,
            listenProps = _this$props5$listenPr === void 0 ? false : _this$props5$listenPr;

        var hitListen = _this.hitListenKeys(name);

        var canUpdate = _this.didMount && hitListen && !silent;

        if (canUpdate) {
          switch (type) {
            case 'status':
              _this.forceUpdate();

              break;

            case 'error':
              if (_this.wrapperElement.current) {
                _this.wrapperElement.current.className = _this.getWrapperClassName();
              }

              if (listenError) {
                _this.forceUpdate();
              }

              break;

            case 'props':
              if (_this.fullElement.current) {
                _this.fullElement.current.className = _this.getFullClassName();
                _this.labelElement.current.className = _this.getLabelClassName();
              }

              if (listenProps) {
                _this.forceUpdate();
              }

              break;

            case 'value':
              if (_this.props.render && canUpdate) {
                _this.forceUpdate();
              }

              break;

            default:
              break;
          }
        }
      });
      var _form = _props.form,
          _ifCore = _props.ifCore;

      if (!_form) {
        return (0, _possibleConstructorReturn2.default)(_this, (0, _assertThisInitialized2.default)(_this));
      }

      _this.form = _form;
      _this.compProps = {};
      _this.eventProps = {};
      _this.predictChildForm = _this.handlePredictForm(_props, function (component) {
        var _ref = component || {},
            _ref$props = _ref.props,
            comProps = _ref$props === void 0 ? {} : _ref$props; // 自动获取jsx组件属性，下个y位版本自动升级


        if (_this.form.enableReceiveProps) {
          _this.compProps = _this.pickupComponentProps(comProps);
        }
      });
      _this.core = _this.initialCore(_props, _this.compProps);
      _this.core.predictChildForm = _this.predictChildForm;
      _this.core.jsx = (0, _assertThisInitialized2.default)(_this);
      _this.core.getSuperFormProps = _this.getSuperFormProps.bind((0, _assertThisInitialized2.default)(_this)); // 引用，提升渲染性能，避免重复渲染子类

      _this.wrapperElement = _react.default.createRef();
      _this.labelElement = _react.default.createRef();
      _this.fullElement = _react.default.createRef();
      _this.ifCore = _ifCore;
      _this.id = _this.core.id || "__noform__item__".concat((0, _random.default)());

      if (_props.name) {
        _this.name = _props.name;
      }

      return _this;
    }

    (0, _createClass2.default)(BaseFormItem, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        var _this2 = this;

        // 绑定set事件就会执行更新 TODO：优化渲染
        this.form.on(_static.ANY_CHANGE, this.update);
        var childForm = this.core.childForm;

        if (childForm && !childForm.disabledSyncChildForm) {
          this.form.setValueSilent(this.core.name, childForm.getAll('value'));
          this.form.setProps(this.core.name, childForm.getAll('props'));
          this.form.setStatus(this.core.name, childForm.getAll('status'));
          this.form.setError(this.core.name, childForm.getAll('error'));
          childForm.on(_static.ANY_CHANGE, function (type) {
            if (type === 'value') {
              return;
            }

            _this2.form.set(type, _this2.core.name, childForm.getAll(type));
          });
        }

        this.didMount = true;
        this.forceUpdate();
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
        var _this$props6 = this.props,
            noLayout = _this$props6.noLayout,
            children = _this$props6.children,
            itemProps = (0, _objectWithoutProperties2.default)(_this$props6, ["noLayout", "children"]);
        var errorRender = itemProps.errorRender,
            _itemProps$className = itemProps.className,
            className = _itemProps$className === void 0 ? '' : _itemProps$className,
            name = itemProps.name,
            _itemProps$style = itemProps.style,
            style = _itemProps$style === void 0 ? {} : _itemProps$style,
            propStatus = itemProps.status;
        var status = name ? this.form.getItemStatus(name) : propStatus; // 动态status        
        // 状态隐藏

        if (status === _static.HIDDEN) {
          return null;
        } // 处理布局


        var _this$form$jsx$props$3 = (0, _objectSpread2.default)({}, this.form.jsx.props, itemProps),
            _this$form$jsx$props$4 = _this$form$jsx$props$3.inline,
            inline = _this$form$jsx$props$4 === void 0 ? false : _this$form$jsx$props$4,
            _this$form$jsx$props$5 = _this$form$jsx$props$3.inset,
            inset = _this$form$jsx$props$5 === void 0 ? false : _this$form$jsx$props$5,
            colon = _this$form$jsx$props$3.colon,
            originLayout = _this$form$jsx$props$3.layout,
            labelWidth = _this$form$jsx$props$3.labelWidth,
            _this$form$jsx$props$6 = _this$form$jsx$props$3.defaultMinWidth,
            defaultMinWidth = _this$form$jsx$props$6 === void 0 ? true : _this$form$jsx$props$6;

        var layout = originLayout || {};
        var defaultMinCls = defaultMinWidth ? "".concat(formItemPrefix, "-item-default-width") : "".concat(formItemPrefix, "-item-no-default-width");
        var layoutCls = layout.label && layout.control ? "".concat(formItemPrefix, "-item-has-layout") : '';
        var colonCls = colon ? '' : "".concat(formItemPrefix, "-item-no-colon");
        var inlineCls = inline ? "".concat(formItemPrefix, "-item-inline") : '';
        var baseProps = this.getBaseProps();
        var itemContext = {
          item: this.core
        };

        var baseElement = _react.default.createElement(_item.default.Provider, {
          value: itemContext
        }, _react.default.createElement(_BaseItem.default, baseProps));

        if (noLayout) {
          return baseElement;
        } // 以下组件的渲染不与formItem公用，避免重复渲染(label, top, suffix, prefix, help, required, full)
        // error比较特殊, 需要考虑自定义errorRender


        var sectionValue = (0, _objectSpread2.default)({
          form: this.form
        }, itemProps, {
          core: this.core
        });
        delete sectionValue.className;

        var labelElement = _react.default.createElement(_Section.default, (0, _extends2.default)({
          type: "props",
          field: "label"
        }, sectionValue, {
          pure: true
        }));

        var prefixElement = _react.default.createElement(_Section.default, (0, _extends2.default)({
          type: "props",
          field: "prefix",
          className: "".concat(formItemPrefix, "-item-content-prefix")
        }, sectionValue));

        var suffixElement = _react.default.createElement(_Section.default, (0, _extends2.default)({
          type: "props",
          field: "suffix",
          className: "".concat(formItemPrefix, "-item-content-suffix")
        }, sectionValue));

        var topElement = _react.default.createElement(_Section.default, (0, _extends2.default)({
          type: "props",
          field: "top",
          className: "".concat(formItemPrefix, "-item-top")
        }, sectionValue));

        var helpElement = _react.default.createElement(_Section.default, (0, _extends2.default)({
          type: "props",
          field: "help",
          className: "".concat(formItemPrefix, "-item-help")
        }, sectionValue));

        var errElement = _react.default.createElement(_Section.default, (0, _extends2.default)({
          type: "error",
          className: "".concat(formItemPrefix, "-item-error")
        }, sectionValue, {
          errorRender: errorRender
        })); // 避免重复渲染


        var wrapperCls = this.getWrapperClassName(); // no-form-item

        var labelCls = this.getLabelClassName(); // no-form-item-label

        var fullCls = this.getFullClassName(); // no-form-item-content

        var directionCls = this.getDirectionClassName(); // no-form-item-direction

        var idProps = {};

        if (itemContext.item && itemContext.item.id && this.id !== itemContext.item.id) {
          idProps.id = itemContext.item.id;
        }

        var labelWidthStyle = {};

        if (labelWidth) {
          labelWidthStyle.style = {
            width: labelWidth,
            display: 'inline-block'
          };
        }

        return _react.default.createElement("div", {
          id: this.id,
          name: "form-item-".concat(name),
          className: "".concat(formItemPrefix, "-item ").concat(directionCls, " ").concat(className, " ").concat(layoutCls, " ").concat(colonCls, " ").concat(inlineCls, " ").concat(defaultMinCls),
          style: style
        }, _react.default.createElement("div", (0, _extends2.default)({}, idProps, {
          className: wrapperCls,
          ref: this.wrapperElement
        }), _react.default.createElement("span", (0, _extends2.default)({
          className: labelCls,
          ref: this.labelElement
        }, labelWidthStyle), labelElement), _react.default.createElement("span", {
          className: "".concat(formItemPrefix, "-item-control ").concat(layout.control ? "col-".concat(layout.control) : '')
        }, topElement, _react.default.createElement("span", {
          className: fullCls,
          ref: this.fullElement
        }, prefixElement, _react.default.createElement("span", {
          className: "".concat(formItemPrefix, "-item-content-elem is-").concat(status)
        }, baseElement), suffixElement), helpElement, !inset ? errElement : null)), inset ? errElement : null);
      }
    }]);
    return BaseFormItem;
  }(_react.default.Component);

  (0, _defineProperty2.default)(BaseFormItem, "propTypes", {
    name: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
    value: _propTypes.default.any,
    children: _propTypes.default.any,
    onBlur: _propTypes.default.func,
    onFocus: _propTypes.default.func,
    render: _propTypes.default.func,
    inset: _propTypes.default.bool,
    listenKeys: _propTypes.default.array
  });
  (0, _defineProperty2.default)(BaseFormItem, "defaultProps", {
    name: '',
    children: null,
    onBlur: noop,
    onFocus: noop,
    listenKeys: []
  });

  var ConnectFormItem = function ConnectFormItem(props) {
    return _react.default.createElement(_form2.default.Consumer, null, function (formContext) {
      var _ref2 = formContext || {},
          form = _ref2.form;

      return _react.default.createElement(_if.default.Consumer, null, function (ifCoreContext) {
        var _ref3 = ifCoreContext || {},
            ifCore = _ref3.if;

        return _react.default.createElement(BaseFormItem, (0, _extends2.default)({}, props, {
          form: form,
          ifCore: ifCore
        }));
      });
    });
  };

  ConnectFormItem.displayName = 'FormItem';
  var _default = ConnectFormItem;
  _exports.default = _default;
});