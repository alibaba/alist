'use strict';

exports.__esModule = true;

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

var Divider = function (_React$Component) {
  (0, _inherits3['default'])(Divider, _React$Component);

  function Divider() {
    (0, _classCallCheck3['default'])(this, Divider);
    return (0, _possibleConstructorReturn3['default'])(this, _React$Component.apply(this, arguments));
  }

  Divider.prototype.render = function render() {
    var _props = this.props,
        _props$className = _props.className,
        className = _props$className === undefined ? '' : _props$className,
        rootPrefixCls = _props.rootPrefixCls;

    return _react2['default'].createElement('li', { className: className + ' ' + rootPrefixCls + '-item-divider' });
  };

  return Divider;
}(_react2['default'].Component);

Divider.propTypes = {
  className: _propTypes2['default'].string,
  rootPrefixCls: _propTypes2['default'].string
};
Divider.defaultProps = {
  // To fix keyboard UX.
  disabled: true
};
exports['default'] = Divider;
module.exports = exports['default'];