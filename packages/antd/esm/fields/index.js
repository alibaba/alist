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
import { Select, Input, Icon, Cascader } from 'antd';
import { setup } from '@formily/antd-components';
import { registerFormField, mapStyledProps, mapTextComponent, connect } from '@formily/antd';
setup();
var presetSearchStyle = function (component) {
    return function (props) {
        return React.createElement(component, __assign({ innerBefore: React.createElement(Icon, { type: "search", style: { margin: 4 } }) }, props));
    };
};
var acceptEnum = function (component) {
    return function (_a) {
        var dataSource = _a.dataSource, others = __rest(_a, ["dataSource"]);
        if (dataSource) {
            return React.createElement(Select, __assign({ dataSource: dataSource }, others));
        }
        else {
            return React.createElement(component, others);
        }
    };
};
registerFormField('cascaderSelect', connect({
    getProps: mapStyledProps,
    getComponent: mapTextComponent
})(Cascader));
registerFormField('input', connect({
    getProps: mapStyledProps,
    getComponent: mapTextComponent
})(Input));
registerFormField('search', connect({
    getProps: mapStyledProps,
    getComponent: mapTextComponent
})(presetSearchStyle(Input)));
registerFormField('select', connect({
    getProps: mapStyledProps,
    getComponent: mapTextComponent
})(acceptEnum(Select)));
var Preview = function (props) { return React.createElement("p", { style: { padding: 0, margin: 0, lineHeight: '28px' }, className: "preview-text" }, props.content); };
registerFormField('preview', connect({
    getProps: function (props, fieldProps) {
        var content = (fieldProps.props || {}).content;
        props.content = content;
    }
})(Preview));
