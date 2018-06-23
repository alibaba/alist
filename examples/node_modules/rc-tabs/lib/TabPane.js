'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _createReactClass = require('create-react-class');

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var TabPane = (0, _createReactClass2['default'])({
  displayName: 'TabPane',
  propTypes: {
    className: _propTypes2['default'].string,
    active: _propTypes2['default'].bool,
    style: _propTypes2['default'].any,
    destroyInactiveTabPane: _propTypes2['default'].bool,
    forceRender: _propTypes2['default'].bool,
    placeholder: _propTypes2['default'].node
  },
  getDefaultProps: function getDefaultProps() {
    return { placeholder: null };
  },
  render: function render() {
    var _classnames;

    var _props = this.props,
        className = _props.className,
        destroyInactiveTabPane = _props.destroyInactiveTabPane,
        active = _props.active,
        forceRender = _props.forceRender,
        rootPrefixCls = _props.rootPrefixCls,
        style = _props.style,
        children = _props.children,
        placeholder = _props.placeholder,
        restProps = (0, _objectWithoutProperties3['default'])(_props, ['className', 'destroyInactiveTabPane', 'active', 'forceRender', 'rootPrefixCls', 'style', 'children', 'placeholder']);

    this._isActived = this._isActived || active;
    var prefixCls = rootPrefixCls + '-tabpane';
    var cls = (0, _classnames3['default'])((_classnames = {}, (0, _defineProperty3['default'])(_classnames, prefixCls, 1), (0, _defineProperty3['default'])(_classnames, prefixCls + '-inactive', !active), (0, _defineProperty3['default'])(_classnames, prefixCls + '-active', active), (0, _defineProperty3['default'])(_classnames, className, className), _classnames));
    var isRender = destroyInactiveTabPane ? active : this._isActived;
    return _react2['default'].createElement(
      'div',
      (0, _extends3['default'])({
        style: style,
        role: 'tabpanel',
        'aria-hidden': active ? 'false' : 'true',
        className: cls
      }, (0, _utils.getDataAttr)(restProps)),
      isRender || forceRender ? children : placeholder
    );
  }
});

exports['default'] = TabPane;
module.exports = exports['default'];