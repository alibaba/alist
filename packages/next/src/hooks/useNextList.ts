import { useList, ListLifeCycleTypes, useEva, ITableProps, ITableHook, IListSelectionConfig } from '@alist/react'
import { useRef } from 'react'
import { createNextListActions, setSelectionsByInstance } from '../shared'

const useNextList = (props: ITableProps = {}): ITableHook => {
    const actionsRef = useRef<any>(null)
    actionsRef.current = actionsRef.current || props.actions || createNextListActions()

    const { implementActions } = useEva({
        actions: actionsRef.current
    })

    const hasRowSelectionCls = 'has-row-selection'

    implementActions({
        setSelections: (ids, records) => {
            setSelectionsByInstance(actionsRef.current, ids, records)
        },
        disableRowSelection: () => {
            const { className = '' } = actionsRef.current.getTableProps()
            actionsRef.current.setSelectionConfig(null)
            actionsRef.current.setTableProps({ // 刷新
                className: className.replace(` ${hasRowSelectionCls}`, ''),
                rowSelection: undefined
            })
        },
        setRowSelection: (selectionConfig: IListSelectionConfig) => {
            actionsRef.current.setSelectionConfig(selectionConfig)
            const config = actionsRef.current.getSelectionConfig()
            const { className = '' } = actionsRef.current.getTableProps()
            if (config) {                    
                const { mode, ids, primaryKey, getProps, ...others } = config
                actionsRef.current.setTableProps({ // 刷新
                    className: className.indexOf(hasRowSelectionCls) !== -1 ? className : `${className} ${hasRowSelectionCls}`,
                    rowSelection: {
                        ...others,
                        mode,
                        selectedRowKeys: ids,
                        primaryKey,
                        onSelect: (selected, record, records) => {
                            actionsRef.current.notify(ListLifeCycleTypes.ON_LIST_SELECT, {
                                selected, record, records
                            })
                        },
                        onSelectAll: (selected, records) => {
                            actionsRef.current.notify(ListLifeCycleTypes.ON_LIST_SELECT_ALL, {
                                selected, records
                            })
                        },
                        onChange: (changeIds: string[], records: any[]) => {
                            actionsRef.current.setSelectionConfig({
                                ids: changeIds,
                                records,
                            })
                            actionsRef.current.notify(ListLifeCycleTypes.ON_LIST_SELECT_CHANGE, {
                                ids: changeIds, records
                            })
                            const { rowSelection } = actionsRef.current.getTableProps()
                            actionsRef.current.setTableProps({
                                rowSelection: {
                                    ...rowSelection,
                                    selectedRowKeys: changeIds,
                                }
                            })
                        },
                        getProps,
                    }
                })
            } else {
                actionsRef.current.setTableProps({ // 刷新
                    className: className.replace(` ${hasRowSelectionCls}`, ''),
                    rowSelection: undefined
                })
            }
        }
    })
    const { effects } = props
    return {
        actions: actionsRef.current,
        list: useList({
            ...props,
            effects: ($, actions) => {
                if (typeof effects === 'function') {
                    effects($, actions)
                }
            }
        })
    }
}

export default useNextList
