import React from 'react'
import MultipleContext from '../context/multiple'
import useMultipleProvider from '../hooks/useMutlipleProvider'
import { EmptyStatusType } from '@alist/core'

const MultipleProvider: React.FC<any> = (props = {}) => {
    const { children, hideWhen } = props
    const { list, id, pageSize } = useMultipleProvider(props)

    let element
    if (typeof children === 'function') {
        element = children(list)
    } else {
        element = children || React.Fragment
    }

    if (hideWhen) {
        const arrHideWhen = [...hideWhen]
        const emptyStatus = list.getEmptyStatus()
        let needHide = arrHideWhen.findIndex(item => item === emptyStatus) !== -1

        if (hideWhen.indexOf(EmptyStatusType.EMPTY)) {
            const multipleData = list.getMultipleData()
            const { paginationDataList } = multipleData[id] || {}
            if ((paginationDataList || []).length === 0) {
                needHide = true
            }
        }

        if (needHide) {
            element = null 
        }
    }

    return <MultipleContext.Provider value={{ id, pageSize }}>
        {element}
    </MultipleContext.Provider>
}

export default MultipleProvider