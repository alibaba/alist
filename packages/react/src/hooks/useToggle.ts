import { useState, useContext, useEffect, useRef } from "react"
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

        if (allKeys.find(item => item === key)) {
            if (openRowKeys.indexOf(key) === -1) {
                setOpenRowKeys([...openRowKeys, key])
            } else {
                setOpenRowKeys([...openRowKeys].filter(k => k !== key))
            }
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