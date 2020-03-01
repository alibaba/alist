import { useContext } from 'react'
import { ListLifeCycleTypes, useEva, ITableProps, ITableHook, IListSelectionConfig, ListContext } from '@alist/react'
import { useMemo, useRef } from 'react'
import { createAntdListActions, setSelectionsByInstance } from '../shared'

const useAntdList = (props: ITableProps = {}): ITableHook => {
    const actionsRef = useRef<any>(null)
    const reuseList = useContext(ListContext)
    actionsRef.current = actionsRef.current || props.actions || reuseList || createAntdListActions()

    const { implementActions } = useEva({
        actions: actionsRef.current
    })

    const hasRowSelectionCls = 'has-row-selection'

    useMemo(() => {
        implementActions({
            setSelections: (ids, records) => {
                setSelectionsByInstance(actionsRef, ids, records)                
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
                            type: mode === 'multiple' ? 'checkbox' : 'radio',
                            selectedRowKeys: ids,
                            key: primaryKey,
                            onSelect: (record, selected, records) => {
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
                                        selections: records,
                                    }
                                })
                            },
                            getCheckboxProps: getProps,
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

export default useAntdList
