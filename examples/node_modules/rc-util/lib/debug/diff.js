'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports['default'] = diff;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/* eslint no-proto: 0 */

function createArray() {
  var arr = [];
  arr.__proto__ = new Array();
  arr.__proto__.format = function toString() {
    return this.map(function (obj) {
      return (0, _extends3['default'])({}, obj, {
        path: obj.path.join(' > ')
      });
    });
  };
  arr.__proto__.toString = function toString() {
    return JSON.stringify(this.format(), null, 2);
  };
  return arr;
}

function diff(obj1, obj2) {
  var depth = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;
  var path = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
  var diffList = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : createArray();

  if (depth <= 0) return diffList;

  var keys = new Set([].concat((0, _toConsumableArray3['default'])(Object.keys(obj1)), (0, _toConsumableArray3['default'])(Object.keys(obj2))));
  keys.forEach(function (key) {
    var value1 = obj1[key];
    var value2 = obj2[key];

    // Same value
    if (value1 === value2) return;

    var type1 = typeof value1 === 'undefined' ? 'undefined' : (0, _typeof3['default'])(value1);
    var type2 = typeof value2 === 'undefined' ? 'undefined' : (0, _typeof3['default'])(value2);

    // Diff type
    if (type1 !== type2) {
      diffList.push({
        path: path.concat(key),
        value1: value1,
        value2: value2
      });
      return;
    }

    // NaN
    if (Number.isNaN(value1) && Number.isNaN(value2)) {
      return;
    }

    // Object & Array
    if (type1 === 'object' && value1 !== null && value2 !== null) {
      diff(value1, value2, depth - 1, path.concat(key), diffList);
      return;
    }

    // Rest
    diffList.push({
      path: path.concat(key),
      value1: value1,
      value2: value2
    });
  });

  return diffList;
}
module.exports = exports['default'];