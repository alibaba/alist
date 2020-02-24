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
import { Toggle } from '@alist/react';
import { Button } from 'antd';
import styled from 'styled-components';
var unExpandIcon = React.createElement("svg", { viewBox: "0 0 1024 1024", focusable: "false", "data-icon": "caret-up", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true" },
    React.createElement("path", { d: "M858.9 689L530.5 308.2c-9.4-10.9-27.5-10.9-37 0L165.1 689c-12.2 14.2-1.2 35 18.5 35h656.8c19.7 0 30.7-20.8 18.5-35z" }));
var expandIcon = React.createElement("svg", { viewBox: "0 0 1024 1024", focusable: "false", "data-icon": "caret-down", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true" },
    React.createElement("path", { d: "M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z" }));
var ToggleActionText = styled(function (props) {
    return React.createElement("div", { className: props.className },
        React.createElement("div", { className: "alist-toggle-action-text" }, props.children));
})(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    display: inline-block;\n\n    .alist-toggle-action-text {\n        display: flex;\n        align-items: center;\n    }\n"], ["\n    display: inline-block;\n\n    .alist-toggle-action-text {\n        display: flex;\n        align-items: center;\n    }\n"])));
var StyledBtn = styled(function (props) {
    return React.createElement(Button, __assign({}, props));
})(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    &.ant-btn {\n        padding: 0;\n    }    \n"], ["\n    &.ant-btn {\n        padding: 0;\n    }    \n"])));
var ToggleTrigger = function (props) {
    var id = props.id, render = props.render, expandText = props.expandText, unExpandText = props.unExpandText, children = props.children, hideIcon = props.hideIcon, others = __rest(props, ["id", "render", "expandText", "unExpandText", "children", "hideIcon"]);
    return React.createElement(Toggle, { id: id }, function (_a) {
        var toggle = _a.toggle, expandStatus = _a.expandStatus;
        if (typeof render === 'function') {
            return render({ toggle: toggle, expandStatus: expandStatus });
        }
        return React.createElement(StyledBtn, __assign({ type: "link" }, others, { onClick: toggle }),
            React.createElement(ToggleActionText, null,
                children,
                expandStatus === 'expand' ? unExpandText : expandText,
                hideIcon ? null : (expandStatus === 'expand' ? unExpandIcon : expandIcon)));
    });
};
export default ToggleTrigger;
var templateObject_1, templateObject_2;
