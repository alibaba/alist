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
import { PaginationProvider } from '@alist/react';
import { Pagination } from 'antd';
import styled from 'styled-components';
var Component = styled(function (props) {
    return React.createElement(PaginationProvider, null, function (connectProps) {
        var currentPage = connectProps.currentPage, setCurrentPage = connectProps.setCurrentPage, setPageSize = connectProps.setPageSize, other = __rest(connectProps, ["currentPage", "setCurrentPage", "setPageSize"]);
        return React.createElement(Pagination, __assign({ current: currentPage, onChange: setCurrentPage, onPageSizeChange: setPageSize }, other, props));
    });
})(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n\tmargin: 16px 0;\n\ttext-align: ", ";\n"], ["\n\tmargin: 16px 0;\n\ttext-align: ", ";\n"])), function (props) { return (props.align || 'right'); });
export default Component;
var templateObject_1;
