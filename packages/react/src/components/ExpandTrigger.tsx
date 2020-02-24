import React from 'react'
import useExpand from '../hooks/useExpand'

const ExpandTrigger: React.FC<any> = (props = {}) => {
    const { children } = props
    const { expandStatus, list, toggleExpandStatus } = useExpand(props)
    
    let element
    if (typeof children === 'function') {
        element = children({ expandStatus, toggleExpandStatus }, list)
    } else {
        element = children || React.Fragment
    }

    return element
}

export default ExpandTrigger