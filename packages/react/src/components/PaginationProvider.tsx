import React from 'react'
import usePagination from '../hooks/usePagination'

const PaginationProvider: React.FC<any> = (props = {}) => {
    const { children } = props
    const { hideWhenInvalid, list, pageData, setCurrentPage, setPageSize } = usePagination(props)

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

    if (hideWhenInvalid && pageData.total === 0) {
        element = null
    }

    return element
}

export default PaginationProvider