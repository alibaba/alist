import React from 'react'
import MultipleContext from '../context/multiple'
import useMultipleProvider from '../hooks/useMutlipleProvider'

const MultipleProvider: React.FC<any> = (props = {}) => {
    const { children } = props
    const { list, id, pageSize } = useMultipleProvider(props)

    let element
    if (typeof children === 'function') {
        element = children(list)
    } else {
        element = children || React.Fragment
    }

    return <MultipleContext.Provider value={{ id, pageSize }}>
        {element}
    </MultipleContext.Provider>
}

export default MultipleProvider