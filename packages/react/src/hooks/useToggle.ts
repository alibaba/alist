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
    const isDefaultExpandMode = (('expandedRowRender' in props || 'isTree' in props) && !(toggleeKey in props))

    let initOpenKey = []
    if (Array.isArray(defaultOpen)) {
        initOpenKey = defaultOpen
    } else if (typeof defaultOpen === 'function') {
        initOpenKey = defaultOpen(formatDataSource)
    }

    const allKeys = getFlatIds(formatDataSource, primaryKey)
    if (defaultOpenAll) {
        initOpenKey = [...allKeys]
    }

    const [openRowKeys, setOpenRowKeys] = useState(initOpenKey || [])
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
            
            setOpenRowKeys(nextOpenRowKeys)
        }
    }

    const toggleAll = () => {
        if (openRowKeys.length === 0) {
            setOpenRowKeys([...allKeys])
        } else {
            setOpenRowKeys([])
        }
    }

    useEffect(() => {
        setOpenRowKeys(initOpenKey)
    }, [dataSource])

    return {
        enableHookCrtl: isDefaultExpandMode && manualTriggered.current,
        openRowKeys,
        toggleState: openRowKeys.length === 0 ? 'none' :
            (openRowKeys.length === allKeys.length && allKeys.length > 0) ? 'all' : 'some',
        toggle,
        toggleAll,
        list,
    }
}

export default useToggle