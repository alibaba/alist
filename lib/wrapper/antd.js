(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "@babel/runtime/helpers/objectSpread", "@babel/runtime/helpers/extends", "@babel/runtime/helpers/classCallCheck", "@babel/runtime/helpers/defineProperty", "react", "./util"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("@babel/runtime/helpers/objectSpread"), require("@babel/runtime/helpers/extends"), require("@babel/runtime/helpers/classCallCheck"), require("@babel/runtime/helpers/defineProperty"), require("react"), require("./util"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.objectSpread, global._extends, global.classCallCheck, global.defineProperty, global.react, global.util);
    global.unknown = mod.exports;
  }
})(this, function (_exports, _objectSpread2, _extends2, _classCallCheck2, _defineProperty2, _react, _util) {
  "use strict";

  var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _objectSpread2 = _interopRequireDefault(_objectSpread2);
  _extends2 = _interopRequireDefault(_extends2);
  _classCallCheck2 = _interopRequireDefault(_classCallCheck2);
  _defineProperty2 = _interopRequireDefault(_defineProperty2);
  _react = _interopRequireDefault(_react);
  var IS_REACT_GREATER_FITHTEEN = parseInt(_react.default.version, 10) > 15;
  var prefix = 'ant';

  function renderValue(value) {
    if (value === null || value === undefined) return null; // 空值直接返回

    if (Array.isArray(value)) {
      // 数组需要判断版本号返回
      var arrValue = value.map(function (valItem) {
        return _react.default.createElement("span", {
          className: "multi-value-item"
        }, valItem);
      });
      return _react.default.createElement("div", {
        className: "multi-value-item-wrapper"
      }, arrValue);
    }

    return IS_REACT_GREATER_FITHTEEN ? value : _react.default.createElement("span", {
      className: "multi-value-item"
    }, value);
  }

  function renderOption() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    // 处理
    var value = (0, _util.formatValue)(props.value); // 格式化值

    var arrValue = [].concat(value); // 处理多选, 如checkbox

    if (Array.isArray(props.dataSource) || Array.isArray(props.options)) {
      // dataSource模式
      var dataSource = props.dataSource || props.options;
      var hitLabel = [];
      dataSource.forEach(function (item) {
        if (arrValue.indexOf(item.value) !== -1) {
          hitLabel.push(item.label);
        }
      });
      return renderValue(hitLabel);
    } else if (Array.isArray(props.children)) {
      // children模式
      var _hitLabel = [];
      props.children.forEach(function (item) {
        if (item.props && item.props.children && arrValue.indexOf(item.props.value) !== -1) {
          _hitLabel.push(item.props.children);
        }
      });
      return renderValue(_hitLabel);
    }

    return null;
  }

  var defaultFileUploadProps = {
    fileList: [],
    beforeUpload: function beforeUpload() {},
    onChange: function onChange() {},
    onSuccess: function onSuccess() {}
  };

  var insetify = function insetify(props) {
    var insetProps = {};

    var _ref = props || {},
        className = _ref.className,
        inset = _ref.inset;

    if (inset) insetProps.className = "".concat(className || '', " inset-component");
    return insetProps;
  };

  var WrapperClass = function WrapperClass(AntdSource) {
    var _this = this;

    (0, _classCallCheck2.default)(this, WrapperClass);
    (0, _defineProperty2.default)(this, "Input", function (props) {
      var status = props.status,
          value = props.value;
      var otherProps = (0, _util.getCleanProps)(props);
      var valueProps = (0, _util.getValueProps)(props);
      if (status === 'preview') return renderValue((0, _util.formatValue)(value)); // 处理预览态

      return _react.default.createElement(_this.Antd.Input, (0, _extends2.default)({}, otherProps, valueProps, insetify(props)));
    });
    (0, _defineProperty2.default)(this, "TextArea", function () {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var status = props.status,
          value = props.value;
      var otherProps = (0, _util.getCleanProps)(props);
      var valueProps = (0, _util.getValueProps)(props);
      if (status === 'preview') return renderValue((0, _util.formatValue)(value)); // 处理预览态

      return _react.default.createElement(_this.Antd.Input.TextArea, (0, _extends2.default)({}, otherProps, valueProps, insetify(props)));
    });
    (0, _defineProperty2.default)(this, "Select", function (props) {
      var status = props.status,
          options = props.options,
          _props$className = props.className,
          className = _props$className === void 0 ? '' : _props$className,
          value = props.value,
          children = props.children;
      var otherProps = (0, _util.getCleanProps)(props);
      var opts = {};

      if (options && Array.isArray(options) && !children) {
        opts.children = options.map(function (item) {
          var label = item.label,
              itemVal = item.value;
          return _react.default.createElement(_this.Antd.Select.Option, {
            key: "".concat(itemVal, "_").concat(label),
            value: itemVal
          }, label);
        });
      }

      var valueProps = (0, _util.getValueProps)(props, {
        defaultValue: undefined
      });
      if (status === 'preview') return _react.default.createElement(_this.Antd.Select, (0, _extends2.default)({
        placeholder: ""
      }, otherProps, {
        disabled: true,
        className: "".concat(className || '', " ").concat(prefix, "-preview-select"),
        value: (0, _util.formatValue)(value)
      }));
      return _react.default.createElement(_this.Antd.Select, (0, _extends2.default)({}, otherProps, opts, valueProps, insetify(props)));
    });
    (0, _defineProperty2.default)(this, "CheckboxGroup", function (props) {
      var otherProps = (0, _util.getCleanProps)(props);
      var valueProps = (0, _util.getValueProps)(props, {
        format: _util.formatArray
      });
      if (props.status === 'preview') return renderOption(props);
      return _react.default.createElement(_this.Antd.Checkbox.Group, (0, _extends2.default)({}, otherProps, valueProps, insetify(props)));
    });
    (0, _defineProperty2.default)(this, "RadioGroup", function (props) {
      var otherProps = (0, _util.getCleanProps)(props);
      var valueProps = (0, _util.getValueProps)(props);
      if (props.status === 'preview') return renderOption(props);
      return _react.default.createElement(_this.Antd.Radio.Group, (0, _extends2.default)({}, otherProps, valueProps, insetify(props)));
    });
    (0, _defineProperty2.default)(this, "Checkbox", function (props) {
      var onChange = props.onChange,
          status = props.status,
          children = props.children,
          value = props.value;
      var otherProps = (0, _util.getCleanProps)(props);
      var valueProps = (0, _util.getValueProps)(props, {
        format: _util.formatBoolValue,
        keyname: 'checked'
      });

      if (status === 'preview') {
        var checked = (0, _util.formatBoolValue)(value);

        if (children) {
          // 存在label
          return checked ? renderValue(children) : null;
        } // 不存在


        window && window.console && window.console.warn('label必须写在Checkbox内，如需编写外部label, 请使用suffix、prefix等属性'); // 给出警告

        return null;
      }

      var beforeChange = function beforeChange(e) {
        var checkedVal = e.target.checked;
        onChange && onChange(checkedVal);
      };

      return _react.default.createElement(_this.Antd.Checkbox, (0, _extends2.default)({}, otherProps, valueProps, {
        onChange: beforeChange
      }));
    });
    (0, _defineProperty2.default)(this, "Radio", function (props) {
      var value = props.value,
          status = props.status,
          children = props.children,
          onChange = props.onChange;
      var otherProps = (0, _util.getCleanProps)(props);
      var valueProps = (0, _util.getValueProps)(props, {
        format: _util.formatBoolValue,
        keyname: 'checked'
      });

      if (status === 'preview') {
        var checked = (0, _util.formatBoolValue)(value);

        if (children) {
          // 存在label
          return checked ? renderValue(children) : null;
        } // 不存在


        window && window.console && window.console.warn('label必须写在Radio内，如需编写外部label, 请使用suffix、prefix等属性'); // 给出警告

        return null;
      }

      var beforeChange = function beforeChange(e) {
        var checkedVal = e.target.checked;
        onChange && onChange(checkedVal);
      };

      return _react.default.createElement(_this.Antd.Radio, (0, _extends2.default)({}, otherProps, valueProps, {
        onChange: beforeChange
      }));
    });
    (0, _defineProperty2.default)(this, "Switch", function (props) {
      var status = props.status,
          value = props.value,
          checkedChildren = props.checkedChildren,
          unCheckedChildren = props.unCheckedChildren;
      var otherProps = (0, _util.getCleanProps)(props);
      var valueProps = (0, _util.getValueProps)(props, {
        format: _util.formatBoolValue,
        keyname: 'checked'
      });

      if (status === 'preview') {
        var checked = (0, _util.formatBoolValue)(value);

        if (checkedChildren || unCheckedChildren) {
          // 存在label
          var checkedStr = checked ? checkedChildren : unCheckedChildren;
          return renderValue(checkedStr);
        } // 不存在


        return renderValue("".concat(checked));
      }

      return _react.default.createElement(_this.Antd.Switch, (0, _extends2.default)({}, otherProps, valueProps));
    });
    (0, _defineProperty2.default)(this, "Slider", function (props) {
      var status = props.status,
          _props$className2 = props.className,
          className = _props$className2 === void 0 ? '' : _props$className2,
          value = props.value;
      var otherProps = (0, _util.getCleanProps)(props);
      var valueProps = (0, _util.getValueProps)(props, {
        format: _util.formatNumber
      });

      if (status === 'preview') {
        return _react.default.createElement(_this.Antd.Slider, (0, _extends2.default)({
          className: "".concat(className || '', " ").concat(prefix, "-preview-slider")
        }, otherProps, {
          disabled: true,
          value: (0, _util.formatValue)(value)
        }));
      }

      return _react.default.createElement(_this.Antd.Slider, (0, _extends2.default)({}, otherProps, valueProps));
    });
    (0, _defineProperty2.default)(this, "DatePicker", function (props) {
      var onChange = props.onChange,
          status = props.status,
          _props$className3 = props.className,
          className = _props$className3 === void 0 ? '' : _props$className3,
          value = props.value;
      var otherProps = (0, _util.getCleanProps)(props);
      var valueProps = (0, _util.getValueProps)(props, {
        format: function format(val) {
          return !val ? null : val;
        }
      });

      if (status === 'preview') {
        var placeholderClearer = {
          datePlaceholder: '',
          monthPlaceholder: '',
          yearPlaceholder: '',
          rangeStartPlaceholder: '',
          rangeEndPlaceholder: ''
        };
        return _react.default.createElement(_this.Antd.DatePicker, (0, _extends2.default)({
          placeholder: ""
        }, otherProps, {
          value: value,
          locale: placeholderClearer,
          disabled: true,
          className: "".concat(className || '', " ").concat(prefix, "-preview-datepicker")
        }));
      }

      var beforeChange = function beforeChange(momentVal) {
        onChange && onChange(momentVal, {
          escape: true
        });
      };

      return _react.default.createElement(_this.Antd.DatePicker, (0, _extends2.default)({}, otherProps, valueProps, {
        onChange: beforeChange
      }, insetify(props)));
    });
    (0, _defineProperty2.default)(this, "SubDatePicker", function (subType, props) {
      var showTime = props.showTime,
          status = props.status,
          onChange = props.onChange,
          _props$className4 = props.className,
          className = _props$className4 === void 0 ? '' : _props$className4,
          value = props.value,
          format = props.format;
      var defaultFormat = 'YYYY-MM-DD';
      var ftFormat = format || (showTime ? "".concat(defaultFormat, " HH:mm:ss") : defaultFormat);
      var otherProps = (0, _util.getCleanProps)(props);
      var valueProps = (0, _util.getValueProps)(props, {
        format: function format(val) {
          return !val ? null : val;
        }
      });
      var SubDatePicker = _this.Antd.DatePicker[subType];

      if (status === 'preview') {
        var placeholderClearer = {
          datePlaceholder: '',
          monthPlaceholder: '',
          yearPlaceholder: '',
          rangeStartPlaceholder: '',
          rangeEndPlaceholder: ''
        };

        if (value === null || Array.isArray(value) && value.length === 0) {
          return null;
        }

        if (Array.isArray(value) && value.length === 2) {
          return _react.default.createElement("div", {
            className: "".concat(className || '', " ").concat(prefix, "-preview-datepicker")
          }, [value[0], {
            sep: true
          }, value[1]].map(function (item) {
            if (item.sep) {
              return _react.default.createElement("span", {
                className: "ant-calendar-range-picker-separator"
              }, " ~ ");
            }

            return renderValue((0, _util.moment2value)(item, ftFormat));
          }));
        }

        return _react.default.createElement(SubDatePicker, (0, _extends2.default)({}, otherProps, valueProps, {
          locale: placeholderClearer,
          disabled: true,
          className: "".concat(className || '', " ").concat(prefix, "-preview-datepicker"),
          placeholder: ""
        }));
      }

      var beforeChange = function beforeChange(momentVal) {
        onChange && onChange(momentVal, {
          escape: true
        });
      };

      return _react.default.createElement(SubDatePicker, (0, _extends2.default)({}, otherProps, valueProps, {
        onChange: beforeChange
      }, insetify(props)));
    });
    (0, _defineProperty2.default)(this, "TimePicker", function (props) {
      var otherProps = (0, _util.getCleanProps)(props);
      var onChange = props.onChange,
          status = props.status,
          _props$className5 = props.className,
          className = _props$className5 === void 0 ? '' : _props$className5,
          value = props.value;
      var valueProps = (0, _util.getValueProps)(props, {
        format: function format(val) {
          return !val ? null : val;
        }
      });

      if (status === 'preview') {
        var placeholderClearer = {
          placeholder: ''
        };
        return _react.default.createElement(_this.Antd.TimePicker, (0, _extends2.default)({
          placeholder: ""
        }, otherProps, {
          value: value,
          locale: placeholderClearer,
          disabled: true,
          className: "".concat(className || '', " ").concat(prefix, "-preview-datepicker")
        }));
      }

      var beforeChange = function beforeChange(momentVal) {
        onChange && onChange(momentVal, {
          escape: true
        });
      };

      return _react.default.createElement(_this.Antd.TimePicker, (0, _extends2.default)({}, otherProps, valueProps, {
        onChange: beforeChange
      }, insetify(props)));
    });
    (0, _defineProperty2.default)(this, "InputNumber", function (props) {
      var status = props.status,
          value = props.value;
      var otherProps = (0, _util.getCleanProps)(props);
      var valueProps = (0, _util.getValueProps)(props);
      if (status === 'preview') return renderValue(value); // 处理预览态

      return _react.default.createElement(_this.Antd.InputNumber, (0, _extends2.default)({}, otherProps, valueProps, insetify(props)));
    });
    (0, _defineProperty2.default)(this, "Rate", function (props) {
      var status = props.status,
          value = props.value;
      var otherProps = (0, _util.getCleanProps)(props);
      var valueProps = (0, _util.getValueProps)(props, {
        format: _util.formatNumber
      });

      if (status === 'preview') {
        return _react.default.createElement(_this.Antd.Rate, (0, _extends2.default)({}, otherProps, {
          disabled: true,
          value: (0, _util.formatValue)(value)
        }));
      }

      return _react.default.createElement(_this.Antd.Rate, (0, _extends2.default)({}, otherProps, valueProps));
    });
    (0, _defineProperty2.default)(this, "Cascader", function (props) {
      var status = props.status,
          _props$className6 = props.className,
          className = _props$className6 === void 0 ? '' : _props$className6,
          value = props.value;
      var valueProps = (0, _util.getValueProps)(props);
      var otherProps = (0, _util.getCleanProps)(props);

      if (status === 'preview') {
        return _react.default.createElement(_this.Antd.Cascader, (0, _extends2.default)({}, otherProps, {
          className: "".concat(className || '', " ").concat(prefix, "-preview-select"),
          disabled: true,
          value: (0, _util.formatValue)(value),
          placeholder: ""
        }));
      }

      return _react.default.createElement(_this.Antd.Cascader, (0, _extends2.default)({}, otherProps, valueProps, insetify(props)));
    });
    (0, _defineProperty2.default)(this, "TreeSelect", function (props) {
      var status = props.status,
          _props$className7 = props.className,
          className = _props$className7 === void 0 ? '' : _props$className7,
          value = props.value;
      var otherProps = (0, _util.getCleanProps)(props);
      var valueProps = (0, _util.getValueProps)(props);

      if (status === 'preview') {
        return _react.default.createElement(_this.Antd.TreeSelect, (0, _extends2.default)({
          placeholder: ""
        }, otherProps, {
          className: "".concat(className || '', " ").concat(prefix, "-preview-select"),
          disabled: true,
          value: (0, _util.formatValue)(value)
        }));
      }

      return _react.default.createElement(_this.Antd.TreeSelect, (0, _extends2.default)({}, otherProps, valueProps, insetify(props)));
    });
    (0, _defineProperty2.default)(this, "Upload", function (props) {
      var onChange = props.onChange,
          status = props.status,
          value = props.value,
          _props$className8 = props.className,
          className = _props$className8 === void 0 ? '' : _props$className8;
      var otherProps = (0, _util.getCleanProps)(props);
      var uploadValue = (0, _util.formatArray)(value);

      if (status === 'preview') {
        return _react.default.createElement(_this.Antd.Upload, (0, _extends2.default)({}, defaultFileUploadProps, otherProps, {
          className: "".concat(className || '', " ").concat(prefix, "-preview-upload"),
          disabled: true,
          fileList: uploadValue
        }));
      }

      var beforeChange = function beforeChange(origin) {
        var _ref2 = origin || {},
            _ref2$fileList = _ref2.fileList,
            fileList = _ref2$fileList === void 0 ? [] : _ref2$fileList;

        onChange && onChange(fileList);
      };

      return _react.default.createElement(_this.Antd.Upload, (0, _extends2.default)({}, defaultFileUploadProps, otherProps, {
        onChange: beforeChange,
        fileList: uploadValue
      }));
    });
    (0, _defineProperty2.default)(this, "AutoComplete", function (props) {
      var status = props.status,
          options = props.options,
          _props$className9 = props.className,
          className = _props$className9 === void 0 ? '' : _props$className9;
      var otherProps = (0, _util.getCleanProps)(props);
      var valueProps = (0, _util.getValueProps)(props);
      var opts = {};

      if (options && Array.isArray(options) && !props.children) {
        opts.children = options.map(function (item) {
          var label = item.label,
              value = item.value;
          return _react.default.createElement(_this.Antd.AutoComplete.Option, {
            key: value
          }, label);
        });
      }

      if (status === 'preview') return _react.default.createElement(_this.Antd.AutoComplete, (0, _extends2.default)({
        placeholder: ""
      }, otherProps, {
        disabled: true,
        className: "".concat(className || '', " ").concat(prefix, "-preview-select")
      }, valueProps, insetify(props)));
      return _react.default.createElement(_this.Antd.AutoComplete, (0, _extends2.default)({}, otherProps, opts, valueProps, insetify(props)));
    });
    (0, _defineProperty2.default)(this, "format", function () {
      var result = ['Input', 'Select', 'Checkbox', 'Radio', 'AutoComplete', 'Switch', 'Slider', 'DatePicker', 'TimePicker', 'InputNumber', 'Rate', 'Cascader', 'TreeSelect', 'Upload'].reduce(function (ret, key) {
        _this[key].displayName = "wrapper(".concat(key, ")");
        var extraProps = {};

        if (_this.Antd[key]) {
          extraProps = (0, _objectSpread2.default)({}, _this.Antd[key]);
        }

        var that = _this;
        Object.keys(extraProps).forEach(function (extraKey) {
          that[key][extraKey] = extraProps[extraKey];
        });
        ret[key] = _this[key];
        return ret;
      }, {});
      result.Checkbox.Group = _this.CheckboxGroup;
      result.Radio.Group = _this.RadioGroup;
      result.Input.TextArea = _this.TextArea;
      result.DatePicker.RangePicker = _this.SubDatePicker.bind(_this, 'RangePicker');
      result.DatePicker.MonthPicker = _this.SubDatePicker.bind(_this, 'MonthPicker');
      result.DatePicker.WeekPicker = _this.SubDatePicker.bind(_this, 'WeekPicker');

      if (_this.Antd.Select) {
        result.Select.Option.displayName = 'wrapper(Option)';
      }

      return (0, _objectSpread2.default)({}, _this.Antd, result);
    });
    this.Antd = AntdSource;
  };

  function wrapper(AntdSource) {
    var instance = new WrapperClass(AntdSource);
    return instance.format();
  }

  var _default = wrapper;
  _exports.default = _default;
});