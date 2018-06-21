'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createReactClass = require('create-react-class');

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _TabBarMixin = require('./TabBarMixin');

var _TabBarMixin2 = _interopRequireDefault(_TabBarMixin);

var _RefMixin = require('./RefMixin');

var _RefMixin2 = _interopRequireDefault(_RefMixin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var TabBar = (0, _createReactClass2['default'])({
  displayName: 'TabBar',
  mixins: [_RefMixin2['default'], _TabBarMixin2['default']],
  render: function render() {
    var tabs = this.getTabs();
    return this.getRootNode(tabs);
  }
});

exports['default'] = TabBar;
module.exports = exports['default'];