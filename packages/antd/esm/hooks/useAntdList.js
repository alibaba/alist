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
import { useContext } from 'react';
import { ListLifeCycleTypes, useEva, ListContext } from '@alist/react';
import { useMemo, useRef } from 'react';
import { createAntdListActions, setSelectionsByInstance } from '../shared';
var useAntdList = function (props) {
    if (props === void 0) { props = {}; }
    var actionsRef = useRef(null);
    var reuseList = useContext(ListContext);
    actionsRef.current = actionsRef.current || props.actions || reuseList || createAntdListActions();
    var implementActions = useEva({
        actions: actionsRef.current
    }).implementActions;
    var hasRowSelectionCls = 'has-row-selection';
    useMemo(function () {
        implementActions({
            setSelections: function (ids, records) {
                setSelectionsByInstance(actionsRef, ids, records);
            },
            disableRowSelection: function () {
                var _a = actionsRef.current.getTableProps().className, className = _a === void 0 ? '' : _a;
                actionsRef.current.setSelectionConfig(null);
                actionsRef.current.setTableProps({
                    className: className.replace(" " + hasRowSelectionCls, ''),
                    rowSelection: undefined
                });
            },
            setRowSelection: function (selectionConfig) {
                actionsRef.current.setSelectionConfig(selectionConfig);
                var config = actionsRef.current.getSelectionConfig();
                var _a = actionsRef.current.getTableProps().className, className = _a === void 0 ? '' : _a;
                if (config) {
                    var mode = config.mode, ids = config.ids, primaryKey = config.primaryKey, getProps = config.getProps, others = __rest(config, ["mode", "ids", "primaryKey", "getProps"]);
                    actionsRef.current.setTableProps({
                        className: className.indexOf(hasRowSelectionCls) !== -1 ? className : className + " " + hasRowSelectionCls,
                        rowSelection: __assign(__assign({}, others), { type: mode === 'multiple' ? 'checkbox' : 'radio', selectedRowKeys: ids, key: primaryKey, onSelect: function (record, selected, records) {
                                actionsRef.current.notify({ type: ListLifeCycleTypes.ON_LIST_SELECT, payload: {
                                        selected: selected, record: record, records: records
                                    } });
                            }, onSelectAll: function (selected, records) {
                                actionsRef.current.notify({ type: ListLifeCycleTypes.ON_LIST_SELECT_ALL, payload: {
                                        selected: selected, records: records
                                    } });
                            }, onChange: function (changeIds, records) {
                                actionsRef.current.setSelectionConfig({
                                    ids: changeIds,
                                    records: records,
                                });
                                actionsRef.current.notify({ type: ListLifeCycleTypes.ON_LIST_SELECT_CHANGE, payload: {
                                        ids: changeIds, records: records
                                    } });
                                var rowSelection = actionsRef.current.getTableProps().rowSelection;
                                actionsRef.current.setTableProps({
                                    rowSelection: __assign(__assign({}, rowSelection), { selectedRowKeys: changeIds, selections: records })
                                });
                            }, getCheckboxProps: getProps })
                    });
                }
                else {
                    actionsRef.current.setTableProps({
                        className: className.replace(" " + hasRowSelectionCls, ''),
                        rowSelection: undefined
                    });
                }
            }
        });
    }, []);
    return actionsRef.current;
};
export default useAntdList;
