import { useState, useContext, useEffect } from "react"
import TableContext from "../context/table"

export const useToggle = (props) => {
    const { dataSource, defaultOpen, defaultOpenAll } = props
    const { list, tableProps } = useContext(TableContext)
    const { primaryKey = 'id' } = tableProps
    const formatDataSource = dataSource || []

    let initOpenKey = []
    if (Array.isArray(defaultOpen)) {
        initOpenKey = defaultOpen
    } else if (typeof defaultOpen === 'function') {
        initOpenKey = defaultOpen(formatDataSource)
    }

    const allKeys = formatDataSource.map(item => item[primaryKey])
    if (defaultOpenAll) {
        initOpenKey = [...allKeys]
    }

    const [openRowKeys, setOpenRowKeys] = useState(initOpenKey || [])
    const toggle = (key: string | number) => {
        if (formatDataSource.find(item => item[primaryKey] === key)) {
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
        openRowKeys,
        toggleState: openRowKeys.length === 0 ? 'none' :
            (openRowKeys.length === allKeys.length && allKeys.length > 0) ? 'all' : 'some',
        toggle,
        toggleAll,
        list,
    }
}

export default useToggle