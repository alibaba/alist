import { ListLifeCycleTypes, useEva, ITableProps, ITableHook, IListSelectionConfig } from '@alist/react'
import { useMemo, useRef } from 'react'
import { createNextListActions, setSelectionsByInstance } from '../shared'

const useNextList = (props: ITableProps = {}): ITableHook => {
    const actionsRef = useRef<any>(null)
    actionsRef.current = actionsRef.current || props.actions || createNextListActions()

    const { implementActions } = useEva({
        actions: actionsRef.current
    })

    const hasRowSelectionCls = 'has-row-selection'

    useMemo(() => {
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
                                actionsRef.current.notify({ type: ListLifeCycleTypes.ON_LIST_SELECT, payload: {
                                    selected, record, records
                                } })
                            },
                            onSelectAll: (selected, records) => {
                                actionsRef.current.notify({ type: ListLifeCycleTypes.ON_LIST_SELECT_ALL, payload: {
                                    selected, records
                                } })
                            },
                            onChange: (changeIds: string[], records: any[]) => {
                                actionsRef.current.setSelectionConfig({
                                    ids: changeIds,
                                    records,
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
    }, [])

    return actionsRef.current
}

export default useNextList
