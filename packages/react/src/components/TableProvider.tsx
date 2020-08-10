import React from 'react'
import useTable from '../hooks/useTable'
import { ITableProps } from '../types'
import TableContext from '../context/table'

const TableProvider: React.FC<any> = (props: ITableProps = {}) => {
    const { children } = props
    const { hideWhenInvalid = false, loading, dataSource, list, tableProps, primaryKey } = useTable(props)
    
    let element
    if (typeof children === 'function') {
        element = children({ dataSource, loading, ...tableProps }, list)
    } else {
        element = children || React.Fragment
    }

    if (hideWhenInvalid && dataSource.length === 0) {
        element = null
    }

    return <TableContext.Provider value={{ loading, dataSource, list, tableProps, primaryKey }}>
        {element}
    </TableContext.Provider>
}

export default TableProvider