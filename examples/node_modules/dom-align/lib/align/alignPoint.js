'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _utils = require('../utils');

var _utils2 = _interopRequireDefault(_utils);

var _align = require('./align');

var _align2 = _interopRequireDefault(_align);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * `tgtPoint`: { pageX, pageY } or { clientX, clientY }.
 * If client position provided, will internal convert to page position.
 */

function alignPoint(el, tgtPoint, align) {
  var pageX = void 0;
  var pageY = void 0;

  var doc = _utils2['default'].getDocument(el);
  var win = doc.defaultView || doc.parentWindow;

  var scrollX = _utils2['default'].getWindowScrollLeft(win);
  var scrollY = _utils2['default'].getWindowScrollTop(win);
  var viewportWidth = _utils2['default'].viewportWidth(win);
  var viewportHeight = _utils2['default'].viewportHeight(win);

  if ('pageX' in tgtPoint) {
    pageX = tgtPoint.pageX;
  } else {
    pageX = scrollX + tgtPoint.clientX;
  }

  if ('pageY' in tgtPoint) {
    pageY = tgtPoint.pageY;
  } else {
    pageY = scrollY + tgtPoint.clientY;
  }

  var tgtRegion = {
    left: pageX,
    top: pageY,
    width: 0,
    height: 0
  };

  var pointInView = pageX >= 0 && pageX <= scrollX + viewportWidth && pageY >= 0 && pageY <= scrollY + viewportHeight;

  // Provide default target point
  var points = [align.points[0], 'cc'];

  return (0, _align2['default'])(el, tgtRegion, _extends({}, align, { points: points }), pointInView);
}

exports['default'] = alignPoint;
module.exports = exports['default'];