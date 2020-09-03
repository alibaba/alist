import React from 'react'
import MultipleContext from '../context/multiple'
import useMultipleProvider from '../hooks/useMutlipleProvider'

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
        const emptyStatus = list.getEmptyStatus()
        const hit = [...hideWhen].findIndex(item => item === emptyStatus) !== -1
        if (hit) {
            element = null 
        }
    }

    return <MultipleContext.Provider value={{ id, pageSize }}>
        {element}
    </MultipleContext.Provider>
}

export default MultipleProvider