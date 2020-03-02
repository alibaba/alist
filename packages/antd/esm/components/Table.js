var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import React, { useContext, useEffect } from 'react';
import { TableProvider, ListLifeCycleTypes, useToggle, ToggleContext, ListContext } from '@alist/react';
import { Table } from 'antd';
import styled from 'styled-components';
import moment from 'moment';
var pickInitialTableProps = function (props) {
    var result = {};
    var attrs = ['rowSelection', 'className', { name: 'rowKey', alias: 'primaryKey' }];
    attrs.forEach(function (k) {
        if (typeof k === 'object') {
            var name_1 = k.name, alias = k.alias;
            if (name_1 in props) {
                result[alias] = props[name_1];
            }
        }
        else {
            if (k in props) {
                result[k] = props[k];
            }
        }
    });
    return result;
};
var RecursionTable = function (props) {
    var dataSource = props.dataSource, _a = props.isLoop, isLoop = _a === void 0 ? false : _a, _b = props.loopProps, loopProps = _b === void 0 ? {} : _b, isRoot = props.isRoot, others = __rest(props, ["dataSource", "isLoop", "loopProps", "isRoot"]);
    var hasExtraRow = (dataSource || []).find(function (item) { return Array.isArray(item.children) && item.children.length > 0; });
    var _c = useToggle(__assign(__assign({}, props), { toggleeKey: 'expandedRowKeys' })), enableHookCrtl = _c.enableHookCrtl, openRowKeys = _c.openRowKeys, toggle = _c.toggle, toggleAll = _c.toggleAll, toggleState = _c.toggleState;
    var expandProps = {};
    var list = useContext(ListContext);
    useEffect(function () {
        if (isRoot) {
            list.actions.addAPI('toggle', toggle);
            list.actions.addAPI('toggleAll', toggleAll);
            list.actions.addAPI('getToggleState', function () { return toggleState; });
        }
    });
    var loopDataSource = __spreadArrays((dataSource || []));
    if (isLoop) {
        expandProps.childrenColumnName = '_children_';
        if (hasExtraRow) {
            expandProps.expandedRowRender = function (record) {
                return React.createElement(RecursionTable, __assign({ showHeader: false, bordered: true, dataSource: record.children }, others, loopProps, { isLoop: true }));
            };
        }
    }
    if (enableHookCrtl) {
        expandProps.expandedRowKeys = props.expandedRowKeys || openRowKeys;
    }
    return React.createElement(ToggleContext.Provider, { value: { toggle: toggle, toggleAll: toggleAll, toggleState: toggleState, openRowKeys: openRowKeys } },
        React.createElement(Table, __assign({ className: (props.className || '') + " " + (isLoop ? '.alist-recursion-loop' : ''), dataSource: loopDataSource }, expandProps, others)));
};
var TableStyledWrapper = styled(function (props) {
    return React.createElement("div", __assign({}, props));
})(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    margin-bottom: 16px;\n\n    .alist-recursion-table {\n        .alist-recursion-loop {\n            table {\n                .ant-table-row-expand-icon-cell,\n                .ant-table-expand-icon-th,\n                .ant-table-expand-icon-col {\n                    display: none;\n                }\n\n                .ant-table-expanded-row > td:first-child {\n                    display: none;\n                }\n            }\n        }\n        table {\n            .ant-table-expanded-row {        \n                td {\n                    border-width: ", "px;\n                }\n\n                td {\n                    border-bottom-width: 1px;\n                }\n        \n                & > td {\n                    border-left-width: 0;\n                    border-right-width: 0;\n                }\n                \n                & > td {\n                    border-bottom-width: 0;\n                }\n            }\n\n            table {\n                border: none;\n            }\n        }\n    }\n\n    & > .ant-table > table > .ant-table-body > .ant-table-expanded-row:last-child > td{\n        border-bottom-width: ", "px;\n    }\n"], ["\n    margin-bottom: 16px;\n\n    .alist-recursion-table {\n        .alist-recursion-loop {\n            table {\n                .ant-table-row-expand-icon-cell,\n                .ant-table-expand-icon-th,\n                .ant-table-expand-icon-col {\n                    display: none;\n                }\n\n                .ant-table-expanded-row > td:first-child {\n                    display: none;\n                }\n            }\n        }\n        table {\n            .ant-table-expanded-row {        \n                td {\n                    border-width: ", "px;\n                }\n\n                td {\n                    border-bottom-width: 1px;\n                }\n        \n                & > td {\n                    border-left-width: 0;\n                    border-right-width: 0;\n                }\n                \n                & > td {\n                    border-bottom-width: 0;\n                }\n            }\n\n            table {\n                border: none;\n            }\n        }\n    }\n\n    & > .ant-table > table > .ant-table-body > .ant-table-expanded-row:last-child > td{\n        border-bottom-width: ", "px;\n    }\n"])), function (props) { return ((props.bordered === undefined ? false : !!props.bordered) ? 1 : 0); }, function (props) { return ((props.bordered === undefined ? false : !!props.bordered) ? 1 : 0); });
var momentify = function (val, propsMoment) {
    var format = typeof propsMoment === 'string' ? propsMoment : 'YYYY-MM-DD HH:mm:ss';
    return val ? moment(isNaN(val) ? val : Number(val)).format(format) : null;
};
var Component = function (props) {
    var children = props.children, columns = props.columns, others = __rest(props, ["children", "columns"]);
    var renderProps = {};
    if (children) {
        renderProps.children = React.Children.map(props.children, function (item) {
            var cloneProps = __assign({}, item.props);
            if (item.props.moment) {
                if (item.props.moment) {
                    cloneProps.render = function (val) { return momentify(val, item.props.moment); };
                }
                return React.cloneElement(item, __assign({}, cloneProps));
            }
            else {
                return item;
            }
        });
    }
    else {
        renderProps.columns = columns.map(function (item) {
            if (item.moment) {
                return __assign(__assign({}, item), { render: function (val) { return momentify(val, item.moment); } });
            }
            else {
                return item;
            }
        });
    }
    return React.createElement(TableStyledWrapper, { bordered: props.bordered },
        React.createElement(TableProvider, __assign({ pickInitialTableProps: pickInitialTableProps }, others), function (connectProps, list) {
            return React.createElement(RecursionTable, __assign({ pagination: false }, connectProps, props, renderProps, { isRoot: true, onChange: function (_, filters, sorter) {
                    var _a;
                    var columnKey = sorter.columnKey, order = sorter.order;
                    list.notify(ListLifeCycleTypes.ON_LIST_SORT, {
                        sorter: (_a = {},
                            _a[columnKey] = order,
                            _a)
                    });
                    list.notify(ListLifeCycleTypes.ON_LIST_FILTER, filters);
                }, className: (connectProps.className || '') + " " + (props.className || '') + " alist-recursion-table" }));
        }));
};
Object.assign(Component, {
    Column: Table.Column,
    ColumnGroup: Table.ColumnGroup,
});
export default Component;
var templateObject_1;
