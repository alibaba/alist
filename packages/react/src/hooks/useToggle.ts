import { useState, useContext, useEffect, useRef, useCallback } from "react"
import { ListLifeCycleTypes, IListKVMap, IListResponse } from '@alist/core'
import TableContext from "../context/table"
import MultipleContext from '../context/multiple';

const getFlatIds = (dataSource, primaryKey) => {
    return (dataSource || []).reduce((buf, current) => {
        const { children } = current
        const id = current[primaryKey]
        return [...buf, id, ...getFlatIds(children, primaryKey)]
    }, [])
}

export const useToggle = (props) => {
    const { defaultOpen, defaultOpenAll, toggleeKey, multipleId: propsMultipleId } = props
    const { list, tableProps } = useContext(TableContext)
    const { id: contextMultipleId } = useContext(MultipleContext) || {}
    const multipleId = propsMultipleId || contextMultipleId
    
    const getDataSource = useCallback(() => {
        let dataSource = [];
        // 多列表实例模式
        if (multipleId !== undefined) {
            const multipleData = list.getMultipleData()
            const { paginationDataList } = multipleData[multipleId] as IListKVMap<IListResponse> || {}
            dataSource = paginationDataList as any [] || []
        } else {
            if (list) {
                dataSource = list.getPaginationDataSource()
            } else {
                dataSource = props.dataSource
            }
        }

        return dataSource || [];
    }, [list])

    const { primaryKey = 'id' } = tableProps
    const manualTriggered = useRef(false)
    const isDefaultExpandMode = (('expandedRowRender' in props || 'isTree' in props) && !(toggleeKey in props))    

    const getDefaultOptions = useCallback(() => {
        const dataSource = getDataSource();
        const allKeys = getFlatIds(dataSource, primaryKey);
        let defaultOpenKey = []
        let isDefaultOpen = false;
        if (Array.isArray(defaultOpen)) {
            defaultOpenKey = defaultOpen
            isDefaultOpen = true
        } else if (typeof defaultOpen === 'function') {
            defaultOpenKey = defaultOpen(dataSource)
            isDefaultOpen = true
        }

        if (defaultOpenAll) {
            defaultOpenKey = [...allKeys]
            isDefaultOpen = true
        }

        return {
            isDefaultOpen,
            defaultOpenKey,
            allKeys,
        }
    }, [defaultOpen])

    const { isDefaultOpen, defaultOpenKey, allKeys } = getDefaultOptions();

    const [openRowKeys, setOpenRowKeys] = useState(defaultOpenKey || [])

    const applyOpenRowKeys = (keys, opts) => {
        setOpenRowKeys(keys)
        if (list) {
            list.notify("onSetOpenRowKeys", opts)
        }        
    }

    const toggle = (key: string | number) => {
        const dataSource = getDataSource();
        const allKeys = getFlatIds(dataSource, primaryKey);
        if (!manualTriggered.current) {
            manualTriggered.current = true
        }

        const currentRowKey = allKeys.find(item => item === key)
        const currentRecord = dataSource.find(item => item[primaryKey] === key)
        if (currentRowKey) {
            const isHide = openRowKeys.indexOf(key) === -1
            const nextOpenRowKeys = isHide ? [...openRowKeys, key] : [...openRowKeys].filter(k => k !== key)
            list.notify(ListLifeCycleTypes.ON_LIST_TOGGLE, {
                openRowKeys: nextOpenRowKeys,
                expanded: isHide,
                currentRecord,
                currentRowKey
            })
            
            applyOpenRowKeys(nextOpenRowKeys, {
                expanded: isHide,
                expandedAll: nextOpenRowKeys.length === 0 ? 'none' : (nextOpenRowKeys.length === allKeys.length && allKeys.length > 0) ? 'all' : 'some',
            })
        }
    }

    const toggleAll = (status) => {
        const dataSource = getDataSource();
        const allKeys = getFlatIds(dataSource, primaryKey);
        if (!manualTriggered.current) {
            manualTriggered.current = true
        }

        const nextOpenRowKeys = status === 'expand' ? [] : [...allKeys]
        list.notify(ListLifeCycleTypes.ON_LIST_TOGGLE, {
            openRowKeys: nextOpenRowKeys,
            expanded: nextOpenRowKeys.length === 0,
        })

        applyOpenRowKeys(nextOpenRowKeys, {
            expandedAll: nextOpenRowKeys.length === 0 ? 'none' : (nextOpenRowKeys.length === allKeys.length && allKeys.length > 0) ? 'all' : 'some',
        })
    }


    const refresh = () => {
        const { defaultOpenKey: initOpenKey, allKeys } = getDefaultOptions();
        const expandedAll = initOpenKey.length === 0 ? 'none' : (initOpenKey.length === allKeys.length && allKeys.length > 0) ? 'all' : 'some'
        applyOpenRowKeys(initOpenKey, {
            expandedAll,
            defaultExpandAll: expandedAll === 'all'
        })
    }

    useEffect(() => {
        if (list) {
            const id = list.subscribe(ListLifeCycleTypes.ON_LIST_TABLE_REFRESH, refresh)
            return function cleanup () {
                list.unSubscribe(id)
            }
        }
    }, [list])

    return {
        enableHookCrtl: isDefaultOpen || (isDefaultExpandMode && manualTriggered.current),
        openRowKeys,
        toggleState: openRowKeys.length === 0 ? 'none' : (openRowKeys.length === allKeys.length && allKeys.length > 0) ? 'all' : 'some',
        toggle,
        toggleAll,
        list,
    }
}

export default useToggle