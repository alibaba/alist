import React from 'react'
import { ListLifeCycleTypes } from '@alist/core'
import useConsumer from '../hooks/useConsumer'

const Selection: React.FC<any> = (props = {}) => {
    const { children, selector, ...others } = props
    const { list } = useConsumer({
        ...others,
        selector: selector || [ListLifeCycleTypes.ON_LIST_SELECTION_REFRESH, ListLifeCycleTypes.ON_LIST_TABLE_REFRESH]
    })

    let element
    if (typeof children === 'function') {
        const selectionConfig = list.getSelectionConfig()        
        let config = null
        if (selectionConfig) {
            const dataSource = list.getPaginationDataSource()
            const { ids, allIds, validRecords } = selectionConfig
            config = {
                ...selectionConfig,
                allIds,
                dataSource,
                selectedAll: (validRecords.length === (ids || []).length) && validRecords.length > 0,
                selectedNone: (ids || []).length === 0
            }
        }
        
        element = children(config, list)
    } else {
        element = children || React.Fragment
    }

    return element
}

export default Selection