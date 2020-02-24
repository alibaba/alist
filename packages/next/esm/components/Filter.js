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
import React, { useContext } from 'react';
import { FilterProvider, FieldProvider, LayoutContext } from '@alist/react';
import Layout from './Layout';
import { InternalField as Field, FormItem as CompatNextFormItem, SchemaForm, SchemaMarkupField, getRegistry, registerFormItemComponent, useForm } from '@formily/next';
import Search from './Search';
import Reset from './Reset';
import Clear from './Clear';
import InsetFormItem from './Inset';
import styled from 'styled-components';
var computeAttr = function (markupProps, contextProps, key) {
    return key in markupProps ? markupProps[key] : contextProps[key];
};
var formItemComponent = getRegistry().formItemComponent;
registerFormItemComponent(function (props) {
    var markupProps = props.props;
    var errors = props.errors, warnings = props.warnings, others = __rest(props, ["errors", "warnings"]);
    var contextProps = useContext(LayoutContext);
    var _a = markupProps.asterisk, asterisk = _a === void 0 ? false : _a, span = markupProps.span, _b = markupProps.hasBorder, hasBorderProps = _b === void 0 ? true : _b;
    var inset = computeAttr(markupProps, contextProps, 'inset');
    var full = computeAttr(markupProps, contextProps, 'full');
    var labelAlign = computeAttr(markupProps, contextProps, 'labelAlign');
    var labelWidth = computeAttr(markupProps, contextProps, 'labelWidth');
    var labelCol = computeAttr(markupProps, contextProps, 'labelCol');
    var wrapperCol = computeAttr(markupProps, contextProps, 'wrapperCol');
    var uniHeight = computeAttr(markupProps, contextProps, 'uniHeight') || '28px';
    var hasBorder = inset ? hasBorderProps : false;
    var formItemProps = {};
    var insetProps = {};
    if (inset) {
        insetProps.errors = errors;
        insetProps.warnings = warnings;
    }
    else {
        formItemProps.errors = errors;
        formItemProps.warnings = warnings;
    }
    var internalFormItem = React.createElement(InsetFormItem, __assign({ inset: inset, full: full, labelAlign: labelAlign, labelCol: labelCol, wrapperCol: wrapperCol, hasBorder: hasBorder, asterisk: asterisk, labelWidth: labelWidth, uniHeight: uniHeight }, insetProps), React.createElement(formItemComponent, __assign(__assign(__assign({}, others), formItemProps), { asterisk: asterisk })));
    return React.createElement(Layout.Item, { span: span }, internalFormItem);
});
var pickupFieldProps = function (props) {
    var ignoreKeys = ['children'];
    var commonKeys = ['required'];
    var fieldPropsKeys = ['triggerType', 'name', 'value', 'initialValue', 'props', 'rules', 'editable', 'onChange'];
    var result = {
        field: {},
        others: {},
    };
    Object.keys(props || {}).forEach(function (key) {
        if (commonKeys.indexOf(key) !== -1) {
            result.field[key] = props[key];
            result.others[key] = props[key];
        }
        else if (fieldPropsKeys.indexOf(key) !== -1) {
            result.field[key] = props[key];
        }
        else {
            if (ignoreKeys.indexOf(key) === -1) {
                result.others[key] = props[key];
            }
        }
    });
    return result;
};
var Item = function (props) {
    var children = props.children;
    var _a = pickupFieldProps(props), field = _a.field, others = _a.others;
    return React.createElement(FieldProvider, { name: props.name }, function (_a) {
        var mode = _a.mode;
        var element;
        if (mode === 'schema') {
            element = React.createElement(SchemaMarkupField, __assign({}, props));
        }
        else {
            element = React.createElement(Field, __assign({}, field), function (connectProps) {
                var element;
                if (typeof children === 'function') {
                    element = children(connectProps);
                }
                else {
                    element = React.cloneElement(children || React.Fragment, connectProps);
                }
                return React.createElement(CompatNextFormItem, __assign({}, others), element);
            });
        }
        return element;
    });
};
var Filter = styled(function (props) {
    var _a = props.mode, mode = _a === void 0 ? 'schema' : _a, children = props.children, effects = props.effects, others = __rest(props, ["mode", "children", "effects"]);
    return React.createElement(FilterProvider, { mode: mode, useForm: useForm, effects: effects }, function (connectProps) {
        var filterInstance = connectProps.filterInstance;
        return React.createElement(SchemaForm, __assign({ form: filterInstance }, others), children);
    });
})(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    margin-bottom: 16px;\n    \n    &.next-form.next-inline {\n        .base-layout-item {\n            display: inline-block;\n            margin-right: 20px;\n            vertical-align: top;\n        }\n    }\n"], ["\n    margin-bottom: 16px;\n    \n    &.next-form.next-inline {\n        .base-layout-item {\n            display: inline-block;\n            margin-right: 20px;\n            vertical-align: top;\n        }\n    }\n"])));
Object.assign(Filter, { Item: Item, Reset: Reset, Search: Search, Clear: Clear });
export default Filter;
var templateObject_1;
