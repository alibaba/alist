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
import { mergeActions, createActions, createAsyncActions, createListActions, createAsyncListActions } from '@alist/react';
export var createAntdListActions = function () {
    return mergeActions(createListActions(), createActions('setSelections', 'setRowSelection', 'disableRowSelection'));
};
export var createAntdAsyncListActions = function () {
    return mergeActions(createAsyncListActions(), createAsyncActions('setSelections', 'setRowSelection', 'disableRowSelection'));
};
export var setSelectionsByInstance = function (instance, ids, records) {
    var rowSelection = instance.getTableProps().rowSelection;
    instance.setTableProps({
        rowSelection: __assign(__assign({}, rowSelection), { selectedRowKeys: ids })
    });
    instance.setSelectionConfig({
        ids: ids,
        records: records,
    });
};
