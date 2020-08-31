import React from 'react'
import useToggle from '../hooks/useToggle'

const ToggleProvider: React.FC<any> = (props = {}) => {
    const { children } = props
    const { toggle, toggleAll, openRowKeys } = useToggle(props)
    
    let element
    if (typeof children === 'function') {
        element = children({ toggle, toggleAll, openRowKeys })
    } else {
        element = children || React.Fragment
    }

    return element
}

export default ToggleProvider