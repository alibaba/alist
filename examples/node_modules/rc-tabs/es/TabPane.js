import _extends from 'babel-runtime/helpers/extends';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import classnames from 'classnames';
import { getDataAttr } from './utils';

var TabPane = createReactClass({
  displayName: 'TabPane',
  propTypes: {
    className: PropTypes.string,
    active: PropTypes.bool,
    style: PropTypes.any,
    destroyInactiveTabPane: PropTypes.bool,
    forceRender: PropTypes.bool,
    placeholder: PropTypes.node
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
        restProps = _objectWithoutProperties(_props, ['className', 'destroyInactiveTabPane', 'active', 'forceRender', 'rootPrefixCls', 'style', 'children', 'placeholder']);

    this._isActived = this._isActived || active;
    var prefixCls = rootPrefixCls + '-tabpane';
    var cls = classnames((_classnames = {}, _defineProperty(_classnames, prefixCls, 1), _defineProperty(_classnames, prefixCls + '-inactive', !active), _defineProperty(_classnames, prefixCls + '-active', active), _defineProperty(_classnames, className, className), _classnames));
    var isRender = destroyInactiveTabPane ? active : this._isActived;
    return React.createElement(
      'div',
      _extends({
        style: style,
        role: 'tabpanel',
        'aria-hidden': active ? 'false' : 'true',
        className: cls
      }, getDataAttr(restProps)),
      isRender || forceRender ? children : placeholder
    );
  }
});

export default TabPane;