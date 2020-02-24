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
import React from 'react';
import { FormButtonGroup, FormItemGrid, createVirtualBox, } from '@formily/next';
import { Layout as InternalLayout } from '@alist/react';
import styled from 'styled-components';
var Layout;
var StyledLayout = styled(function (props) {
    return React.createElement(InternalLayout, __assign({}, props, { gap: props.gap || [16, 16], uniHeight: props.uniHeight || '28px' }));
})(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    .base-layout-item-columns {\n        .next-form-item {\n            margin-bottom: 0;\n        }\n    }\n    \n    .base-layout-item-normal {\n        .next-form-item {\n            margin-bottom: 0;\n        }\n    }\n\n    .base-layout-label {\n        color: #999;\n        padding-right: 12px;\n    }\n\n    .base-layout-description {\n        font-size: 12px;\n        line-height: 1.5;\n        color: #999999;\n    }\n"], ["\n    .base-layout-item-columns {\n        .next-form-item {\n            margin-bottom: 0;\n        }\n    }\n    \n    .base-layout-item-normal {\n        .next-form-item {\n            margin-bottom: 0;\n        }\n    }\n\n    .base-layout-label {\n        color: #999;\n        padding-right: 12px;\n    }\n\n    .base-layout-description {\n        font-size: 12px;\n        line-height: 1.5;\n        color: #999999;\n    }\n"])));
Layout = (function () {
    var LayoutExport = createVirtualBox('filter-flex-layout', StyledLayout);
    LayoutExport.InternalLayout = InternalLayout;
    LayoutExport.Item = InternalLayout.Item;
    LayoutExport.normalizeGap = InternalLayout.normalizeGap;
    LayoutExport.ButtonGroup = FormButtonGroup;
    LayoutExport.Grid = FormItemGrid;
    return LayoutExport;
})();
export default Layout;
var templateObject_1;
