import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import PropTypes from 'prop-types';

var DOMWrap = function (_React$Component) {
  _inherits(DOMWrap, _React$Component);

  function DOMWrap() {
    _classCallCheck(this, DOMWrap);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  DOMWrap.prototype.render = function render() {
    var props = _extends({}, this.props);
    if (!props.visible) {
      props.className += ' ' + props.hiddenClassName;
    }
    var Tag = props.tag;
    delete props.tag;
    delete props.hiddenClassName;
    delete props.visible;
    return React.createElement(Tag, props);
  };

  return DOMWrap;
}(React.Component);

DOMWrap.propTypes = {
  tag: PropTypes.string,
  hiddenClassName: PropTypes.string,
  visible: PropTypes.bool
};
DOMWrap.defaultProps = {
  tag: 'div',
  className: ''
};
export default DOMWrap;