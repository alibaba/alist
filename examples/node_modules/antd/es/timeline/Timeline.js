import _extends from 'babel-runtime/helpers/extends';
import _toConsumableArray from 'babel-runtime/helpers/toConsumableArray';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
var __rest = this && this.__rest || function (s, e) {
    var t = {};
    for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    }if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0) t[p[i]] = s[p[i]];
    }return t;
};
import * as React from 'react';
import classNames from 'classnames';
import TimelineItem from './TimelineItem';
import Icon from '../icon';

var Timeline = function (_React$Component) {
    _inherits(Timeline, _React$Component);

    function Timeline() {
        _classCallCheck(this, Timeline);

        return _possibleConstructorReturn(this, (Timeline.__proto__ || Object.getPrototypeOf(Timeline)).apply(this, arguments));
    }

    _createClass(Timeline, [{
        key: 'render',
        value: function render() {
            var _classNames;

            var _a = this.props,
                prefixCls = _a.prefixCls,
                _a$pending = _a.pending,
                pending = _a$pending === undefined ? null : _a$pending,
                pendingDot = _a.pendingDot,
                children = _a.children,
                className = _a.className,
                reverse = _a.reverse,
                restProps = __rest(_a, ["prefixCls", "pending", "pendingDot", "children", "className", "reverse"]);
            var pendingNode = typeof pending === 'boolean' ? null : pending;
            var classString = classNames(prefixCls, (_classNames = {}, _defineProperty(_classNames, prefixCls + '-pending', !!pending), _defineProperty(_classNames, prefixCls + '-reverse', !!reverse), _classNames), className);
            var pendingItem = !!pending ? React.createElement(
                TimelineItem,
                { pending: !!pending, dot: pendingDot || React.createElement(Icon, { type: 'loading' }) },
                pendingNode
            ) : null;
            var timeLineItems = !!reverse ? [pendingItem].concat(_toConsumableArray(React.Children.toArray(children).reverse())) : [].concat(_toConsumableArray(React.Children.toArray(children)), [pendingItem]);
            // Remove falsy items
            var truthyItems = timeLineItems.filter(function (item) {
                return !!item;
            });
            var itemsCount = React.Children.count(truthyItems);
            var lastCls = prefixCls + '-item-last';
            var items = React.Children.map(truthyItems, function (ele, idx) {
                return React.cloneElement(ele, {
                    className: classNames([ele.props.className, !reverse && !!pending ? idx === itemsCount - 2 ? lastCls : '' : idx === itemsCount - 1 ? lastCls : ''])
                });
            });
            return React.createElement(
                'ul',
                _extends({}, restProps, { className: classString }),
                items
            );
        }
    }]);

    return Timeline;
}(React.Component);

export default Timeline;

Timeline.Item = TimelineItem;
Timeline.defaultProps = {
    prefixCls: 'ant-timeline',
    reverse: false
};