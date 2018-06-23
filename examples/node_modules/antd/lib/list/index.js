'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var React = _interopRequireWildcard(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _LocaleReceiver = require('../locale-provider/LocaleReceiver');

var _LocaleReceiver2 = _interopRequireDefault(_LocaleReceiver);

var _default = require('../locale-provider/default');

var _default2 = _interopRequireDefault(_default);

var _spin = require('../spin');

var _spin2 = _interopRequireDefault(_spin);

var _pagination = require('../pagination');

var _pagination2 = _interopRequireDefault(_pagination);

var _grid = require('../grid');

var _Item = require('./Item');

var _Item2 = _interopRequireDefault(_Item);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var __rest = undefined && undefined.__rest || function (s, e) {
    var t = {};
    for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    }if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0) t[p[i]] = s[p[i]];
    }return t;
};

var List = function (_React$Component) {
    (0, _inherits3['default'])(List, _React$Component);

    function List() {
        (0, _classCallCheck3['default'])(this, List);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (List.__proto__ || Object.getPrototypeOf(List)).apply(this, arguments));

        _this.state = {
            paginationCurrent: 1
        };
        _this.defaultPaginationProps = {
            current: 1,
            pageSize: 10,
            onChange: function onChange(page, pageSize) {
                var pagination = _this.props.pagination;

                _this.setState({
                    paginationCurrent: page
                });
                if (pagination && pagination.onChange) {
                    pagination.onChange(page, pageSize);
                }
            },
            total: 0
        };
        _this.keys = {};
        _this.renderItem = function (item, index) {
            var _this$props = _this.props,
                dataSource = _this$props.dataSource,
                renderItem = _this$props.renderItem,
                rowKey = _this$props.rowKey;

            var key = void 0;
            if (typeof rowKey === 'function') {
                key = rowKey(dataSource[index]);
            } else if (typeof rowKey === 'string') {
                key = dataSource[rowKey];
            } else {
                key = dataSource.key;
            }
            if (!key) {
                key = 'list-item-' + index;
            }
            _this.keys[index] = key;
            return renderItem(item, index);
        };
        _this.renderEmpty = function (contextLocale) {
            var locale = (0, _extends3['default'])({}, contextLocale, _this.props.locale);
            return React.createElement(
                'div',
                { className: _this.props.prefixCls + '-empty-text' },
                locale.emptyText
            );
        };
        return _this;
    }

    (0, _createClass3['default'])(List, [{
        key: 'getChildContext',
        value: function getChildContext() {
            return {
                grid: this.props.grid
            };
        }
    }, {
        key: 'isSomethingAfterLastItem',
        value: function isSomethingAfterLastItem() {
            var _props = this.props,
                loadMore = _props.loadMore,
                pagination = _props.pagination,
                footer = _props.footer;

            return !!(loadMore || pagination || footer);
        }
    }, {
        key: 'render',
        value: function render() {
            var _classNames,
                _this2 = this;

            var paginationCurrent = this.state.paginationCurrent;
            var _a = this.props,
                bordered = _a.bordered,
                split = _a.split,
                className = _a.className,
                children = _a.children,
                itemLayout = _a.itemLayout,
                loadMore = _a.loadMore,
                pagination = _a.pagination,
                prefixCls = _a.prefixCls,
                grid = _a.grid,
                dataSource = _a.dataSource,
                size = _a.size,
                rowKey = _a.rowKey,
                renderItem = _a.renderItem,
                header = _a.header,
                footer = _a.footer,
                loading = _a.loading,
                locale = _a.locale,
                rest = __rest(_a, ["bordered", "split", "className", "children", "itemLayout", "loadMore", "pagination", "prefixCls", "grid", "dataSource", "size", "rowKey", "renderItem", "header", "footer", "loading", "locale"]);
            var loadingProp = loading;
            if (typeof loadingProp === 'boolean') {
                loadingProp = {
                    spinning: loadingProp
                };
            }
            var isLoading = loadingProp && loadingProp.spinning;
            // large => lg
            // small => sm
            var sizeCls = '';
            switch (size) {
                case 'large':
                    sizeCls = 'lg';
                    break;
                case 'small':
                    sizeCls = 'sm';
                default:
                    break;
            }
            var classString = (0, _classnames2['default'])(prefixCls, className, (_classNames = {}, (0, _defineProperty3['default'])(_classNames, prefixCls + '-vertical', itemLayout === 'vertical'), (0, _defineProperty3['default'])(_classNames, prefixCls + '-' + sizeCls, sizeCls), (0, _defineProperty3['default'])(_classNames, prefixCls + '-split', split), (0, _defineProperty3['default'])(_classNames, prefixCls + '-bordered', bordered), (0, _defineProperty3['default'])(_classNames, prefixCls + '-loading', isLoading), (0, _defineProperty3['default'])(_classNames, prefixCls + '-grid', grid), (0, _defineProperty3['default'])(_classNames, prefixCls + '-something-after-last-item', this.isSomethingAfterLastItem()), _classNames));
            var paginationProps = (0, _extends3['default'])({}, this.defaultPaginationProps, { total: dataSource.length, current: paginationCurrent }, pagination || {});
            var largestPage = Math.ceil(paginationProps.total / paginationProps.pageSize);
            if (paginationProps.current > largestPage) {
                paginationProps.current = largestPage;
            }
            var paginationContent = pagination ? React.createElement(
                'div',
                { className: prefixCls + '-pagination' },
                React.createElement(_pagination2['default'], (0, _extends3['default'])({}, paginationProps, { onChange: this.defaultPaginationProps.onChange }))
            ) : null;
            var splitDataSource = [].concat((0, _toConsumableArray3['default'])(dataSource));
            if (pagination) {
                if (dataSource.length > (paginationProps.current - 1) * paginationProps.pageSize) {
                    splitDataSource = [].concat((0, _toConsumableArray3['default'])(dataSource)).splice((paginationProps.current - 1) * paginationProps.pageSize, paginationProps.pageSize);
                }
            }
            var childrenContent = void 0;
            childrenContent = isLoading && React.createElement('div', { style: { minHeight: 53 } });
            if (splitDataSource.length > 0) {
                var items = splitDataSource.map(function (item, index) {
                    return _this2.renderItem(item, index);
                });
                var childrenList = React.Children.map(items, function (child, index) {
                    return React.cloneElement(child, {
                        key: _this2.keys[index]
                    });
                });
                childrenContent = grid ? React.createElement(
                    _grid.Row,
                    { gutter: grid.gutter },
                    childrenList
                ) : childrenList;
            } else if (!children && !isLoading) {
                childrenContent = React.createElement(
                    _LocaleReceiver2['default'],
                    { componentName: 'Table', defaultLocale: _default2['default'].Table },
                    this.renderEmpty
                );
            }
            var paginationPosition = paginationProps.position || 'bottom';
            return React.createElement(
                'div',
                (0, _extends3['default'])({ className: classString }, rest),
                (paginationPosition === 'top' || paginationPosition === 'both') && paginationContent,
                header && React.createElement(
                    'div',
                    { className: prefixCls + '-header' },
                    header
                ),
                React.createElement(
                    _spin2['default'],
                    loadingProp,
                    childrenContent,
                    children
                ),
                footer && React.createElement(
                    'div',
                    { className: prefixCls + '-footer' },
                    footer
                ),
                loadMore || (paginationPosition === 'bottom' || paginationPosition === 'both') && paginationContent
            );
        }
    }]);
    return List;
}(React.Component);

exports['default'] = List;

List.Item = _Item2['default'];
List.childContextTypes = {
    grid: _propTypes2['default'].any
};
List.defaultProps = {
    dataSource: [],
    prefixCls: 'ant-list',
    bordered: false,
    split: true,
    loading: false,
    pagination: false
};
module.exports = exports['default'];