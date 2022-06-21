import { useEva, useList, ListLifeCycleTypes, ITableProps, ITableHook, IListSelectionConfig, ListContext } from '@alist/react'
import { useRef, useContext } from 'react'
import { createAntdListActions, setSelectionsByInstance, actionsRetHandler } from '../shared'

const useAntdList = (props: ITableProps = {}): ITableHook => {
    const actionsRef = useRef<any>(null)
    const reuseList = useContext(ListContext)
    actionsRef.current = actionsRef.current || props.actions || reuseList || createAntdListActions()

    const { implementActions } = useEva({
        actions: actionsRef.current,
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
        getRowSelection: () => {
            const selectionConfig = actionsRef.current.getSelectionConfig()
            let config = null
            if (selectionConfig) {
                const dataSource = actionsRef.current.getPaginationDataSource()
                const { ids, allIds, validRecords } = selectionConfig
                config = {
                    ...selectionConfig,
                    allIds,
                    dataSource,
                    selectedAll: (validRecords.length === (ids || []).length) && validRecords.length > 0,
                    selectedNone: (ids || []).length === 0
                }
            }

            return config
        },
        setRowSelection: (selectionConfig: IListSelectionConfig) => {
            actionsRef.current.setSelectionConfig(selectionConfig)
            const getSelectionConfigRet = actionsRef.current.getSelectionConfig()
            actionsRetHandler(getSelectionConfigRet, (config) => {
                const getTablePropsRet = actionsRef.current.getTableProps()
                actionsRetHandler(getTablePropsRet, ({ className = '' }) => {
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
                                    const getTablePropsRet = actionsRef.current.getTableProps()
                                    actionsRetHandler(getTablePropsRet, ({ rowSelection }) => {
                                        actionsRef.current.setTableProps({
                                            rowSelection: {
                                                ...rowSelection,
                                                selectedRowKeys: changeIds,
                                                selections: records,
                                            }
                                        })
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
                })
            });
        }
    })
    const { effects } = props
    return {
        actions: actionsRef.current,
        list: useList({
            ...props,
            actions: actionsRef.current,
            effects: ($, actions) => {
                if (typeof effects === 'function') {
                    effects($, actions)
                }
            }
        })
    }
}

export default useAntdList
