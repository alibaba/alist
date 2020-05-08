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
import React, { useEffect, useContext } from 'react';
import { TableProvider, ListLifeCycleTypes, useToggle, ToggleContext, ListContext } from '@alist/react';
import { Table } from '@alifd/next';
import moment from 'moment';
import styled, { css } from 'styled-components';
import Sorter from './Sorter';
var pickInitialTableProps = function (props) {
    var result = {};
    var attrs = ['rowSelection', 'className', 'primaryKey'];
    attrs.forEach(function (k) {
        if (k in props) {
            result[k] = props[k];
        }
    });
    return result;
};
var VerCenterTitle = styled(function (props) { return React.createElement("div", __assign({}, props)); })(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    display: flex;\n    align-items: center;\n"], ["\n    display: flex;\n    align-items: center;\n"])));
var RecursionTable = function (props) {
    var dataSource = props.dataSource, _a = props.hasExpandedRowCtrl, hasExpandedRowCtrl = _a === void 0 ? true : _a, expandedRowIndent = props.expandedRowIndent, _b = props.isLoop, isLoop = _b === void 0 ? false : _b, _c = props.loopProps, loopProps = _c === void 0 ? {} : _c, isRoot = props.isRoot, others = __rest(props, ["dataSource", "hasExpandedRowCtrl", "expandedRowIndent", "isLoop", "loopProps", "isRoot"]);
    var hasExtraRow = (dataSource || []).find(function (item) { return Array.isArray(item.children) && item.children.length > 0; });
    var _d = useToggle(__assign(__assign({}, props), { toggleeKey: 'openRowKeys' })), enableHookCrtl = _d.enableHookCrtl, openRowKeys = _d.openRowKeys, toggle = _d.toggle, toggleAll = _d.toggleAll, toggleState = _d.toggleState;
    var expandProps = {};
    var list = useContext(ListContext);
    useEffect(function () {
        if (isRoot) {
            list.actions.addAPI('toggle', toggle);
            list.actions.addAPI('toggleAll', toggleAll);
            list.actions.addAPI('getToggleState', function () { return toggleState; });
        }
    });
    var defaultExpandedRowIndent = [1, 0];
    if (isLoop) {
        defaultExpandedRowIndent = [0, 0];
        if (hasExtraRow) {
            expandProps.expandedRowRender = function (record) { return React.createElement(RecursionTable, __assign({ hasHeader: false, hasBorder: true, dataSource: record.children }, others, loopProps, { isLoop: true })); };
        }
    }
    if (enableHookCrtl) {
        expandProps.openRowKeys = props.openRowKeys || openRowKeys;
    }
    return React.createElement(ToggleContext.Provider, { value: { toggle: toggle, openRowKeys: openRowKeys, toggleAll: toggleAll, toggleState: toggleState } },
        React.createElement(Table, __assign({ dataSource: dataSource }, expandProps, others, { hasExpandedRowCtrl: hasExpandedRowCtrl, expandedRowIndent: expandedRowIndent || defaultExpandedRowIndent })));
};
var TableStyledWrapper = styled(function (props) {
    return React.createElement("div", __assign({}, props));
})(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n    margin-bottom: 16px;\n\n    .alist-recursion-table {\n        table {\n            .next-table-expanded-row {        \n                td {\n                    border-width: ", "px;\n                }\n        \n                & > td {\n                    border-left-width: 0;\n                    border-right-width: 0;\n                }\n\n                .next-table-row:last-child td {\n                    border-bottom-width: 0;\n                }\n\n                & > td {\n                    border-bottom-width: 0;\n                }\n\n                tr {\n                    ", "\n                }\n            }\n        }\n    \n        .next-table.no-header table {\n            tr:first-child td {\n                border-top-width: 0;\n            }\n        }   \n    }\n\n    & > .next-table > table > .next-table-body > .next-table-expanded-row:last-child > td{\n        border-bottom-width: ", "px;\n    }\n"], ["\n    margin-bottom: 16px;\n\n    .alist-recursion-table {\n        table {\n            .next-table-expanded-row {        \n                td {\n                    border-width: ", "px;\n                }\n        \n                & > td {\n                    border-left-width: 0;\n                    border-right-width: 0;\n                }\n\n                .next-table-row:last-child td {\n                    border-bottom-width: 0;\n                }\n\n                & > td {\n                    border-bottom-width: 0;\n                }\n\n                tr {\n                    ",
    "\n                }\n            }\n        }\n    \n        .next-table.no-header table {\n            tr:first-child td {\n                border-top-width: 0;\n            }\n        }   \n    }\n\n    & > .next-table > table > .next-table-body > .next-table-expanded-row:last-child > td{\n        border-bottom-width: ", "px;\n    }\n"])), function (props) { return ((props.hasBorder === undefined ? true : !!props.hasBorder) ? 1 : 0); }, function (props) { return props.loopBackground && css(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n                        background: ", "\n                    "], ["\n                        background: ", "\n                    "])), props.loopBackground); }, function (props) { return ((props.hasBorder === undefined ? true : !!props.hasBorder) ? 1 : 0); });
var noop = function () { };
var Component = function (props) {
    var _a = props.onSort, onSort = _a === void 0 ? noop : _a, _b = props.onFilter, onFilter = _b === void 0 ? noop : _b, others = __rest(props, ["onSort", "onFilter"]);
    var columns = React.Children.map(props.children, function (item) {
        if (!item)
            return item;
        var cloneProps = __assign({}, item.props);
        if (item.props.sortable || item.props.moment) {
            if (item.props.sortable) {
                cloneProps.sortable = undefined;
                cloneProps.title = React.createElement(VerCenterTitle, null,
                    item.props.title,
                    React.createElement(Sorter, { dataIndex: item.props.dataIndex, onSort: function (dataIndex, order) {
                            onSort(dataIndex, order);
                        } }));
            }
            if (item.props.moment) {
                cloneProps.cell = function (val) {
                    var format = typeof item.props.moment === 'string' ? item.props.moment : 'YYYY-MM-DD HH:mm:ss';
                    return val ? moment(isNaN(val) ? val : Number(val)).format(format) : null;
                };
            }
            return React.cloneElement(item, __assign({}, cloneProps));
        }
        else {
            return item;
        }
    });
    return React.createElement(TableStyledWrapper, { hasBorder: props.hasBorder, loopBackground: props.loopBackground },
        React.createElement(TableProvider, __assign({ pickInitialTableProps: pickInitialTableProps }, others), function (connectProps, list) {
            return React.createElement(RecursionTable, __assign({}, connectProps, props, { children: columns, isRoot: true, onFilter: function (filterParams) {
                    onFilter(filterParams);
                    list.notify(ListLifeCycleTypes.ON_LIST_FILTER, filterParams);
                }, className: (connectProps.className || '') + " " + (props.className || '') + " alist-recursion-table" }));
        }));
};
Component.Column = Table.Column;
Component.ColumnGroup = Table.ColumnGroup,
    Component.GroupHeader = Table.GroupHeader;
Component.GroupFooter = Table.GroupFooter;
export default Component;
var templateObject_1, templateObject_2, templateObject_3;
