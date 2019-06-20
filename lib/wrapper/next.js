(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "@babel/runtime/helpers/objectWithoutProperties", "@babel/runtime/helpers/objectSpread", "@babel/runtime/helpers/extends", "react", "./util"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("@babel/runtime/helpers/objectWithoutProperties"), require("@babel/runtime/helpers/objectSpread"), require("@babel/runtime/helpers/extends"), require("react"), require("./util"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.objectWithoutProperties, global.objectSpread, global._extends, global.react, global.util);
    global.unknown = mod.exports;
  }
})(this, function (_exports, _objectWithoutProperties2, _objectSpread2, _extends2, _react, _util) {
  "use strict";

  var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _objectWithoutProperties2 = _interopRequireDefault(_objectWithoutProperties2);
  _objectSpread2 = _interopRequireDefault(_objectSpread2);
  _extends2 = _interopRequireDefault(_extends2);
  _react = _interopRequireDefault(_react);
  var IS_REACT_GREATER_FITHTEEN = parseInt(_react.default.version, 10) > 15;
  var Next;

  function renderValue(value) {
    if (value === null || value === undefined) return null; // 空值直接返回

    if (Array.isArray(value)) {
      // 数组需要判断版本号返回
      var arrValue = value.map(function (valItem) {
        return _react.default.createElement("span", {
          className: "multi-value-item"
        }, valItem);
      });
      return IS_REACT_GREATER_FITHTEEN ? arrValue : _react.default.createElement("span", {
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

    if (Array.isArray(props.dataSource)) {
      // dataSource模式
      var hitLabel = [];
      props.dataSource.forEach(function (item) {
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

  var insetify = function insetify(props) {
    var insetProps = {};

    var _ref = props || {},
        className = _ref.className,
        inset = _ref.inset;

    if (inset) insetProps.className = "".concat(className || '', " inset-component");
    return insetProps;
  };

  var fetchFileUrl = '';
  var defaultFileUploadProps = {
    prefix: 'next-',
    type: 'file',
    fileList: [],
    language: 'zh-cn',
    uploadBtnText: '',
    fetchFileUrl: fetchFileUrl,
    className: '',
    limit: 10,
    formatter: function formatter(res) {
      // 函数里面根据当前服务器返回的响应数据
      // 重新拼装符合组件要求的数据格式
      return {
        code: res.code,
        imgURL: fetchFileUrl + res.fs_url,
        imgUrl: fetchFileUrl + res.fs_url,
        // downloadURL 是提交给后端，后端可能获取这个值，用于兼容
        downloadURL: fetchFileUrl + res.fs_url,
        // downloadUrl 是针对于上传成功以后的下载链接
        downloadUrl: fetchFileUrl + res.fs_url,
        fileURL: fetchFileUrl + res.fs_url,
        size: res.size,
        fileMd5: res.hash,
        fs_url: res.fs_url
      };
    },
    beforeUpload: function beforeUpload() {},
    onChange: function onChange() {},
    onSuccess: function onSuccess() {}
  };

  function Input(props) {
    var value = props.value || '';
    if (props.status === 'preview') return renderValue(value); // 处理预览态

    return _react.default.createElement(Next.Input, (0, _extends2.default)({}, props, {
      value: value
    }, insetify(props)));
  }

  function TextArea(props) {
    var newProps = (0, _objectSpread2.default)({}, props);

    if ('value' in props) {
      newProps.value = props.value || '';
    }

    var value = props.value || '';
    if (props.status === 'preview') return renderValue(value); // 处理预览态

    return _react.default.createElement(Next.Input.TextArea, (0, _extends2.default)({}, newProps, insetify(props)));
  }

  function Select(props) {
    var _props$className = props.className,
        className = _props$className === void 0 ? '' : _props$className;
    var value = (0, _util.formatValue)(props.value); // 格式化值

    if (props.status === 'preview') return _react.default.createElement(Next.Select, (0, _extends2.default)({}, props, {
      disabled: true,
      className: "".concat(className || '', " next-preview-select"),
      value: value
    }));
    return _react.default.createElement(Next.Select, (0, _extends2.default)({}, props, {
      value: value
    }, insetify(props)));
  }

  function CheckboxGroup(props) {
    var value = (0, _util.formatArray)(props.value); // 格式化值

    if (props.status === 'preview') return renderOption(props);
    return _react.default.createElement(Next.Checkbox.Group, (0, _extends2.default)({}, props, {
      value: value
    }, insetify(props)));
  }

  function RadioGroup(props) {
    var newProps = (0, _objectSpread2.default)({}, props);

    if (newProps.hasOwnProperty('value')) {
      newProps.value = (0, _util.formatValue)(props.value); // 格式化值
    }

    if (props.status === 'preview') return renderOption(props);
    return _react.default.createElement(Next.Radio.Group, (0, _extends2.default)({}, newProps, insetify(props)));
  }

  function Checkbox(props) {
    var checked = (0, _util.formatBoolValue)(props.value);

    if (props.status === 'preview') {
      if (props.children) {
        // 存在label
        return checked ? renderValue(props.children) : null;
      } // 不存在


      console.warn('label必须写在Checkbox内，如需编写外部label, 请使用suffix、prefix等熟悉'); // 给出警告

      return null;
    }

    return _react.default.createElement(Next.Checkbox, (0, _extends2.default)({}, props, {
      checked: checked
    }, insetify(props)));
  }

  function Radio(props) {
    var checked = (0, _util.formatBoolValue)(props.value);

    if (props.status === 'preview') {
      if (props.children) {
        // 存在label
        return checked ? renderValue(props.children) : null;
      } // 不存在


      console.warn('label必须写在Radio内，如需编写外部label, 请使用suffix、prefix等熟悉'); // 给出警告

      return null;
    }

    return _react.default.createElement(Next.Radio, (0, _extends2.default)({}, props, {
      checked: checked
    }, insetify(props)));
  }

  function Switch(props) {
    var checked = (0, _util.formatBoolValue)(props.value);

    if (props.status === 'preview') {
      if (props.checkedChildren || props.unCheckedChildren) {
        // 存在label
        var checkedStr = checked ? props.checkedChildren : props.unCheckedChildren;
        return renderValue(checkedStr);
      } // 不存在


      return renderValue("".concat(checked));
    }

    return _react.default.createElement(Next.Switch, (0, _extends2.default)({}, props, {
      checked: checked
    }, insetify(props)));
  }

  function Range(props) {
    var value = (0, _util.formatValue)(props.value);

    if (props.status === 'preview') {
      return _react.default.createElement(Next.Range, (0, _extends2.default)({}, props, {
        disabled: true,
        value: value
      }));
    }

    return _react.default.createElement(Next.Range, (0, _extends2.default)({}, props, {
      value: value
    }, insetify(props)));
  }

  function DatePicker(props) {
    var _props$className2 = props.className,
        className = _props$className2 === void 0 ? '' : _props$className2;
    var value = (0, _util.formatValue)(props.value);

    if (props.status === 'preview') {
      var placeholderClearer = {
        datePlaceholder: '',
        monthPlaceholder: '',
        yearPlaceholder: '',
        rangeStartPlaceholder: '',
        rangeEndPlaceholder: ''
      };
      return _react.default.createElement(Next.DatePicker, (0, _extends2.default)({}, props, {
        value: value,
        locale: placeholderClearer,
        disabled: true,
        className: "".concat(className || '', " next-preview-datepicker")
      }));
    }

    var onChange = function onChange(_, formatDate) {
      props.onChange && props.onChange(formatDate);
    };

    return _react.default.createElement(Next.DatePicker, (0, _extends2.default)({}, props, {
      value: value,
      onChange: onChange
    }, insetify(props)));
  }

  function TimePicker(props) {
    var _props$className3 = props.className,
        className = _props$className3 === void 0 ? '' : _props$className3;
    var value = (0, _util.formatValue)(props.value);

    if (props.status === 'preview') {
      var placeholderClearer = {
        placeholder: ''
      };
      return _react.default.createElement(Next.TimePicker, (0, _extends2.default)({}, props, {
        value: value,
        locale: placeholderClearer,
        disabled: true,
        className: "".concat(className || '', " next-preview-datepicker")
      }));
    }

    var onChange = function onChange(_, formatDate) {
      props.onChange && props.onChange(formatDate);
    };

    return _react.default.createElement(Next.TimePicker, (0, _extends2.default)({}, props, {
      value: value,
      onChange: onChange
    }, insetify(props)));
  }

  function NumberPicker(props) {
    var value = (0, _util.formatValue)(props.value);
    if (props.status === 'preview') return renderValue(value); // 处理预览态

    return _react.default.createElement(Next.NumberPicker, (0, _extends2.default)({}, props, {
      value: value
    }, insetify(props)));
  }

  function Rating(props) {
    var value = (0, _util.formatValue)(props.value);

    if (props.status === 'preview') {
      return _react.default.createElement(Next.Rating, (0, _extends2.default)({}, props, {
        disabled: true,
        value: value
      }));
    }

    return _react.default.createElement(Next.Rating, (0, _extends2.default)({}, props, {
      value: value
    }, insetify(props)));
  }

  function Search(props) {
    var value = (0, _util.formatValue)(props.value);
    if (props.status === 'preview') return renderValue(value); // 处理预览态

    return _react.default.createElement(Next.Search, (0, _extends2.default)({}, props, {
      value: value
    }, insetify(props)));
  }

  function CascaderSelect(props) {
    var _props$className4 = props.className,
        className = _props$className4 === void 0 ? '' : _props$className4;
    var value = (0, _util.formatValue)(props.value);

    if (props.status === 'preview') {
      return _react.default.createElement(Next.CascaderSelect, (0, _extends2.default)({}, props, {
        className: "".concat(className || '', " next-preview-select"),
        disabled: true,
        value: value
      }));
    }

    return _react.default.createElement(Next.CascaderSelect, (0, _extends2.default)({}, props, {
      value: value
    }, insetify(props)));
  }

  function TreeSelect(props) {
    var _props$className5 = props.className,
        className = _props$className5 === void 0 ? '' : _props$className5;
    var value = (0, _util.formatValue)(props.value);

    if (props.status === 'preview') {
      return _react.default.createElement(Next.TreeSelect, (0, _extends2.default)({}, props, {
        className: "".concat(className || '', " next-preview-select"),
        disabled: true,
        value: value
      }));
    }

    return _react.default.createElement(Next.TreeSelect, (0, _extends2.default)({}, props, {
      value: value
    }, insetify(props)));
  }

  function Upload(props) {
    var value = (0, _util.formatArray)(props.value);
    var name = props.name,
        others = (0, _objectWithoutProperties2.default)(props, ["name"]);
    var _props$className6 = props.className,
        className = _props$className6 === void 0 ? '' : _props$className6;

    if (props.status === 'preview') {
      return _react.default.createElement(Next.Upload, (0, _extends2.default)({}, defaultFileUploadProps, others, {
        onChange: onChange,
        className: "".concat(className || '', " next-preview-upload"),
        disabled: true,
        fileList: value
      }));
    }

    var onChange = function onChange(origin) {
      var _ref2 = origin || {},
          _ref2$fileList = _ref2.fileList,
          fileList = _ref2$fileList === void 0 ? [] : _ref2$fileList;

      props.onChange && props.onChange(fileList);
    };

    return _react.default.createElement(Next.Upload, (0, _extends2.default)({}, defaultFileUploadProps, others, {
      onChange: onChange,
      fileList: value
    }, insetify(props)));
  }

  function ImageUpload(props) {
    var value = (0, _util.formatArray)(props.value);
    var name = props.name,
        others = (0, _objectWithoutProperties2.default)(props, ["name"]);
    var _props$className7 = props.className,
        className = _props$className7 === void 0 ? '' : _props$className7;

    if (props.status === 'preview') {
      return _react.default.createElement(Next.Upload.ImageUpload, (0, _extends2.default)({}, others, {
        onChange: onChange,
        className: "".concat(className || '', " next-preview-upload"),
        disabled: true,
        fileList: value
      }));
    }

    var onChange = function onChange(origin) {
      var _ref3 = origin || {},
          _ref3$fileList = _ref3.fileList,
          fileList = _ref3$fileList === void 0 ? [] : _ref3$fileList;

      props.onChange && props.onChange(fileList);
    };

    return _react.default.createElement(Next.Upload.ImageUpload, (0, _extends2.default)({}, others, {
      onChange: onChange,
      fileList: value
    }, insetify(props)));
  }

  function AutoComplete(props) {
    return _react.default.createElement(Next.Select.AutoComplete, (0, _extends2.default)({}, props, insetify(props)));
  }

  function wrapper(NextSource) {
    Next = NextSource;
    if (Next.Select && Next.Select.Option) Select.Option = Next.Select.Option;
    Checkbox.Group = CheckboxGroup;
    Radio.Group = RadioGroup;
    if (Next.TreeSelect) TreeSelect.Node = Next.TreeSelect.Node;
    Upload.ImageUpload = ImageUpload;
    Select.AutoComplete = AutoComplete;
    Input.TextArea = TextArea;
    return (0, _objectSpread2.default)({}, NextSource, {
      Input: Input,
      Select: Select,
      Checkbox: Checkbox,
      Radio: Radio,
      Switch: Switch,
      Range: Range,
      DatePicker: DatePicker,
      TimePicker: TimePicker,
      NumberPicker: NumberPicker,
      Rating: Rating,
      Search: Search,
      CascaderSelect: CascaderSelect,
      TreeSelect: TreeSelect,
      Upload: Upload
    });
  }

  var _default = wrapper;
  _exports.default = _default;
});