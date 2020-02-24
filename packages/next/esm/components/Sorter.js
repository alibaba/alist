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
import React from 'react';
import { SorterProvider } from '@alist/react';
import styled from 'styled-components';
var defaultAscIcon = React.createElement("svg", { viewBox: "0 0 1024 1024", focusable: "false", "data-icon": "caret-up", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true" },
    React.createElement("path", { d: "M858.9 689L530.5 308.2c-9.4-10.9-27.5-10.9-37 0L165.1 689c-12.2 14.2-1.2 35 18.5 35h656.8c19.7 0 30.7-20.8 18.5-35z" }));
var defaultDescIcon = React.createElement("svg", { viewBox: "0 0 1024 1024", focusable: "false", "data-icon": "caret-down", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true" },
    React.createElement("path", { d: "M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z" }));
var noop = function () { };
var Sorter = styled(function (props) {
    var className = props.className, render = props.render, style = props.style, _a = props.ascIcon, ascIcon = _a === void 0 ? defaultAscIcon : _a, _b = props.descIcon, descIcon = _b === void 0 ? defaultDescIcon : _b, _c = props.onSort, onSort = _c === void 0 ? noop : _c, others = __rest(props, ["className", "render", "style", "ascIcon", "descIcon", "onSort"]);
    return React.createElement(SorterProvider, __assign({}, others), function (_a) {
        var order = _a.order, setOrder = _a.setOrder;
        if (typeof render === 'function') {
            return render({ order: order, setOrder: setOrder });
        }
        return React.createElement("span", { className: "next-table-header-icon next-table-sort " + className, style: style },
            React.createElement("a", { className: "" + (order === 'asc' ? 'current' : '') },
                React.createElement("i", { className: "next-icon alist-sorter asc ", onClick: function () {
                        var nextOrder = setOrder('asc');
                        onSort(props.dataIndex, nextOrder);
                    } }, ascIcon)),
            React.createElement("a", { className: "" + (order === 'desc' ? 'current' : '') },
                React.createElement("i", { className: "next-icon alist-sorter desc  ", onClick: function () {
                        var nextOrder = setOrder('desc');
                        onSort(props.dataIndex, nextOrder);
                    } }, descIcon)));
    });
})(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    display: inline-block;\n    line-height: 1;\n    margin-left: 6px;\n    position: relative;\n    vertical-align: middle;\n    height: 1rem;\n    cursor: pointer;\n    \n    .alist-sorter {\n        transform: scale(0.91666667) rotate(0deg);\n    }\n\n    .alist-sorter.asc {\n        top: 0px;\n    }\n\n    .alist-sorter.desc {\n        top: 6.5px;\n    }\n"], ["\n    display: inline-block;\n    line-height: 1;\n    margin-left: 6px;\n    position: relative;\n    vertical-align: middle;\n    height: 1rem;\n    cursor: pointer;\n    \n    .alist-sorter {\n        transform: scale(0.91666667) rotate(0deg);\n    }\n\n    .alist-sorter.asc {\n        top: 0px;\n    }\n\n    .alist-sorter.desc {\n        top: 6.5px;\n    }\n"])));
export default Sorter;
var templateObject_1;
