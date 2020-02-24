import React from 'react'
import usePagination from '../hooks/usePagination'

const PaginationProvider: React.FC<any> = (props = {}) => {
    const { children } = props
    const { list, pageData, setCurrentPage, setPageSize } = usePagination(props)

    let element
    if (typeof children === 'function') {
        element = children({
            ...pageData,
            setCurrentPage,
            setPageSize,
        }, list)
    } else {
        element = children || React.Fragment
    }

    return element
}

export default PaginationProvider