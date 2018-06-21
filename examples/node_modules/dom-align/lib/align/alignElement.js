'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _align = require('./align');

var _align2 = _interopRequireDefault(_align);

var _getOffsetParent = require('../getOffsetParent');

var _getOffsetParent2 = _interopRequireDefault(_getOffsetParent);

var _getVisibleRectForElement = require('../getVisibleRectForElement');

var _getVisibleRectForElement2 = _interopRequireDefault(_getVisibleRectForElement);

var _getRegion = require('../getRegion');

var _getRegion2 = _interopRequireDefault(_getRegion);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function isOutOfVisibleRect(target) {
  var visibleRect = (0, _getVisibleRectForElement2['default'])(target);
  var targetRegion = (0, _getRegion2['default'])(target);

  return !visibleRect || targetRegion.left + targetRegion.width <= visibleRect.left || targetRegion.top + targetRegion.height <= visibleRect.top || targetRegion.left >= visibleRect.right || targetRegion.top >= visibleRect.bottom;
}

function alignElement(el, refNode, align) {
  var target = align.target || refNode;
  var refNodeRegion = (0, _getRegion2['default'])(target);

  var isTargetNotOutOfVisible = !isOutOfVisibleRect(target);

  return (0, _align2['default'])(el, refNodeRegion, align, isTargetNotOutOfVisible);
}

alignElement.__getOffsetParent = _getOffsetParent2['default'];

alignElement.__getVisibleRectForElement = _getVisibleRectForElement2['default'];

exports['default'] = alignElement;
module.exports = exports['default'];