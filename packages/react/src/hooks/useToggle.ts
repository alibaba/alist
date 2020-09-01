import { useState, useContext, useEffect, useRef } from "react"
import { ListLifeCycleTypes } from '@alist/core'
import TableContext from "../context/table"

const getFlatIds = (dataSource, primaryKey) => {
    return (dataSource || []).reduce((buf, current) => {
        const { children } = current
        const id = current[primaryKey]
        return [...buf, id, ...getFlatIds(children, primaryKey)]
    }, [])
}

export const useToggle = (props) => {
    const { dataSource, defaultOpen, defaultOpenAll, toggleeKey } = props
    const { list, tableProps } = useContext(TableContext)
    const { primaryKey = 'id' } = tableProps
    const formatDataSource = dataSource || []
    const manualTriggered = useRef(false)
    const isDefaultOpen = useRef(false)
    const isDefaultExpandMode = (('expandedRowRender' in props || 'isTree' in props) && !(toggleeKey in props))

    let initOpenKey = []
    if (Array.isArray(defaultOpen)) {
        initOpenKey = defaultOpen
        isDefaultOpen.current = true
    } else if (typeof defaultOpen === 'function') {
        initOpenKey = defaultOpen(formatDataSource)
        isDefaultOpen.current = true
    }

    const allKeys = getFlatIds(formatDataSource, primaryKey)
    if (defaultOpenAll) {
        initOpenKey = [...allKeys]
        isDefaultOpen.current = true
    }

    const [openRowKeys, setOpenRowKeys] = useState(initOpenKey || [])

    const applyOpenRowKeys = (keys, opts) => {
        setOpenRowKeys(keys)
        if (list) {
            list.notify("onSetOpenRowKeys", opts)
        }        
    }

    const toggle = (key: string | number) => {
        if (!manualTriggered.current) {
            manualTriggered.current = true
        }

        const currentRowKey = allKeys.find(item => item === key)
        const currentRecord = formatDataSource.find(item => item[primaryKey] === key)
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

    useEffect(() => {
        const expandedAll = initOpenKey.length === 0 ? 'none' : (initOpenKey.length === allKeys.length && allKeys.length > 0) ? 'all' : 'some'
        applyOpenRowKeys(initOpenKey, {
            expandedAll,
            defaultExpandAll: expandedAll === 'all'
        })
    }, [dataSource])

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