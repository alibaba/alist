'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.alignPoint = exports.alignElement = undefined;

var _alignElement = require('./align/alignElement');

var _alignElement2 = _interopRequireDefault(_alignElement);

var _alignPoint = require('./align/alignPoint');

var _alignPoint2 = _interopRequireDefault(_alignPoint);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

exports.alignElement = _alignElement2['default'];
exports.alignPoint = _alignPoint2['default'];
exports['default'] = _alignElement2['default'];