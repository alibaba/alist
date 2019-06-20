(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "@babel/runtime/helpers/objectSpread"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("@babel/runtime/helpers/objectSpread"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.objectSpread);
    global.unknown = mod.exports;
  }
})(this, function (_exports, _objectSpread2) {
  "use strict";

  var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.formatValue = formatValue;
  _exports.formatArray = formatArray;
  _exports.formatNumber = formatNumber;
  _exports.formatBoolValue = formatBoolValue;
  _exports.getValueProps = getValueProps;
  _exports.formatDate = formatDate;
  _exports.getCleanProps = getCleanProps;
  _exports.moment2value = moment2value;
  _exports.log = log;
  _objectSpread2 = _interopRequireDefault(_objectSpread2);

  var noop = function noop(v) {
    return v;
  };

  function formatValue(value) {
    if ([null, undefined].indexOf(value) !== -1) return null;
    return value; // 0 或 []直接返回
  }

  function formatArray(value) {
    if (['', null, undefined].indexOf(value) !== -1) return [];
    return value;
  }

  function moment2value(value, format) {
    if (value && value._isAMomentObject) {
      return value.format(format);
    }

    return null;
  }

  function formatNumber(value) {
    if (['0', 0, '', null, undefined].indexOf(value) !== -1) return 0;
    return Number(value);
  }

  function formatBoolValue(value) {
    if (['', null, undefined].indexOf(value) !== -1) return false;

    if ("".concat(value) === 'true') {
      return true;
    } else if ("".concat(value) === 'false') {
      return false;
    }

    return false;
  }

  function getCleanProps(props) {
    var otherProps = (0, _objectSpread2.default)({}, props);
    delete otherProps.status;
    delete otherProps.value;
    delete otherProps.inset;
    delete otherProps.error;
    return otherProps;
  }

  function getValueProps(props) {
    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var valueProps = {};
    var _opts$keyname = opts.keyname,
        keyname = _opts$keyname === void 0 ? 'value' : _opts$keyname,
        _opts$format = opts.format,
        format = _opts$format === void 0 ? noop : _opts$format;
    var defaultValue = 'defaultValue' in opts ? opts.defaultValue : '';

    if ('value' in props) {
      var propVal = props.value;

      if ([null, undefined].indexOf(propVal) !== -1) {
        valueProps[keyname] = format(defaultValue);
      } else {
        valueProps[keyname] = format(propVal);
      }
    }

    return valueProps;
  }

  function formatDate(value) {
    if (value === null || value === undefined) return ''; // if (Next && Next.moment) {
    //     return Next.moment(value).format('YYYY-MM-DD');
    // }

    return value;
  }

  function log() {}
});