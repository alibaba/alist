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
import React from 'react';
import { FormButtonGroup, createVirtualBox, } from '@formily/antd';
import { FormItemGrid, MegaLayout } from '@formily/antd-components';
import { compatLayoutProps } from '@alist/react';
var Layout;
var CompatMegaLayout = function (props) {
    var compatProps = compatLayoutProps(props);
    return React.createElement(MegaLayout, __assign({}, compatProps));
};
Layout = (function () {
    var LayoutExport = createVirtualBox('filter-flex-layout', CompatMegaLayout);
    LayoutExport.ButtonGroup = FormButtonGroup;
    LayoutExport.Grid = FormItemGrid;
    return LayoutExport;
})();
export default Layout;
