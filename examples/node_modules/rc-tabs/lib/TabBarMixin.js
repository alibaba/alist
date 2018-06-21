'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

exports['default'] = {
  getDefaultProps: function getDefaultProps() {
    return {
      styles: {}
    };
  },
  onTabClick: function onTabClick(key) {
    this.props.onTabClick(key);
  },
  getTabs: function getTabs() {
    var _this = this;

    var _props = this.props,
        children = _props.panels,
        activeKey = _props.activeKey,
        prefixCls = _props.prefixCls,
        tabBarGutter = _props.tabBarGutter;

    var rst = [];

    _react2['default'].Children.forEach(children, function (child, index) {
      if (!child) {
        return;
      }
      var key = child.key;
      var cls = activeKey === key ? prefixCls + '-tab-active' : '';
      cls += ' ' + prefixCls + '-tab';
      var events = {};
      if (child.props.disabled) {
        cls += ' ' + prefixCls + '-tab-disabled';
      } else {
        events = {
          onClick: _this.onTabClick.bind(_this, key)
        };
      }
      var ref = {};
      if (activeKey === key) {
        ref.ref = _this.saveRef('activeTab');
      }
      (0, _warning2['default'])('tab' in child.props, 'There must be `tab` property on children of Tabs.');
      rst.push(_react2['default'].createElement(
        'div',
        (0, _extends3['default'])({
          role: 'tab',
          'aria-disabled': child.props.disabled ? 'true' : 'false',
          'aria-selected': activeKey === key ? 'true' : 'false'
        }, events, {
          className: cls,
          key: key,
          style: { marginRight: tabBarGutter && index === children.length - 1 ? 0 : tabBarGutter }
        }, ref),
        child.props.tab
      ));
    });

    return rst;
  },
  getRootNode: function getRootNode(contents) {
    var _props2 = this.props,
        prefixCls = _props2.prefixCls,
        onKeyDown = _props2.onKeyDown,
        className = _props2.className,
        extraContent = _props2.extraContent,
        style = _props2.style,
        tabBarPosition = _props2.tabBarPosition,
        restProps = (0, _objectWithoutProperties3['default'])(_props2, ['prefixCls', 'onKeyDown', 'className', 'extraContent', 'style', 'tabBarPosition']);

    var cls = (0, _classnames3['default'])(prefixCls + '-bar', (0, _defineProperty3['default'])({}, className, !!className));
    var topOrBottom = tabBarPosition === 'top' || tabBarPosition === 'bottom';
    var tabBarExtraContentStyle = topOrBottom ? { float: 'right' } : {};
    var extraContentStyle = extraContent && extraContent.props ? extraContent.props.style : {};
    var children = contents;
    if (extraContent) {
      children = [(0, _react.cloneElement)(extraContent, {
        key: 'extra',
        style: (0, _extends3['default'])({}, tabBarExtraContentStyle, extraContentStyle)
      }), (0, _react.cloneElement)(contents, { key: 'content' })];
      children = topOrBottom ? children : children.reverse();
    }
    return _react2['default'].createElement(
      'div',
      (0, _extends3['default'])({
        role: 'tablist',
        className: cls,
        tabIndex: '0',
        ref: this.saveRef('root'),
        onKeyDown: onKeyDown,
        style: style
      }, (0, _utils.getDataAttr)(restProps)),
      children
    );
  }
};
module.exports = exports['default'];