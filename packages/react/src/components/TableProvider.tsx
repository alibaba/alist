import React from 'react'
import useTable from '../hooks/useTable'
import { ITableProps } from '../types'
import TableContext from '../context/table'

const TableProvider: React.FC<any> = (props: ITableProps = {}) => {
    const { children } = props
    const { loading, dataSource, list, tableProps, primaryKey } = useTable(props)
    
    let element
    if (typeof children === 'function') {
        element = children({ dataSource, loading, ...tableProps }, list)
    } else {
        element = children || React.Fragment
    }

    return <TableContext.Provider value={{ loading, dataSource, list, tableProps, primaryKey }}>
        {element}
    </TableContext.Provider>
}

export default TableProvider