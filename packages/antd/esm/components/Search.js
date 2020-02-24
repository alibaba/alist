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
import { Consumer } from '@alist/react';
import { createVirtualBox } from '@formily/antd';
import { Submit } from '@formily/antd';
var Search = function (props) {
    var render = props.render, children = props.children, others = __rest(props, ["render", "children"]);
    return React.createElement(Consumer, null, function (_a) {
        var search = _a.search;
        if (typeof render === 'function') {
            return render(search);
        }
        return React.createElement(Submit, __assign({}, others, { htmlType: "search", onSubmit: function (values) {
                search();
            } }), children);
    });
};
createVirtualBox('search', Search);
export default Search;
