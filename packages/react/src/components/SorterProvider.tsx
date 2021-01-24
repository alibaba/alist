import React from 'react'
import { ListLifeCycleTypes } from '@alist/core'
import useConsumer from '../hooks/useConsumer'

const Sorter: React.FC<any> = (props = {}) => {
    const { dataIndex, children, ...others } = props
    const { list } = useConsumer({
        ...others,
        selector: [ListLifeCycleTypes.ON_LIST_SORT, ListLifeCycleTypes.ON_LIST_TABLE_REFRESH]
    })

    if (!dataIndex) {
        return null
    }

    let element
    if (typeof children === 'function') {
        const sortConfig = list.getSortConfig()
        const { sorter } = sortConfig
        const order = sorter[dataIndex]
        const setOrder = (nextOrder) => {
            const formatOrder = (nextOrder === order) ? undefined : nextOrder
            list.notify(ListLifeCycleTypes.ON_LIST_SORT, { sorter: { [dataIndex]: formatOrder }})
            return formatOrder
        }
        element = children({ order, setOrder }, list)
    } else {
        element = children || React.Fragment
    }

    return element
}

export default Sorter