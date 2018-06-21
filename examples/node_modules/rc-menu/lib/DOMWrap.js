'use strict';

exports.__esModule = true;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var DOMWrap = function (_React$Component) {
  (0, _inherits3['default'])(DOMWrap, _React$Component);

  function DOMWrap() {
    (0, _classCallCheck3['default'])(this, DOMWrap);
    return (0, _possibleConstructorReturn3['default'])(this, _React$Component.apply(this, arguments));
  }

  DOMWrap.prototype.render = function render() {
    var props = (0, _extends3['default'])({}, this.props);
    if (!props.visible) {
      props.className += ' ' + props.hiddenClassName;
    }
    var Tag = props.tag;
    delete props.tag;
    delete props.hiddenClassName;
    delete props.visible;
    return _react2['default'].createElement(Tag, props);
  };

  return DOMWrap;
}(_react2['default'].Component);

DOMWrap.propTypes = {
  tag: _propTypes2['default'].string,
  hiddenClassName: _propTypes2['default'].string,
  visible: _propTypes2['default'].bool
};
DOMWrap.defaultProps = {
  tag: 'div',
  className: ''
};
exports['default'] = DOMWrap;
module.exports = exports['default'];