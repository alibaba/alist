import React from 'react'
import useConsumer from '../hooks/useConsumer'

const ConsumerProvider: React.FC<any> = (props = {}) => {
    const { children, ...others } = props
    const list = useConsumer(others)

    let element
    if (typeof children === 'function') {
        element = children(list)
    } else {
        element = children || React.Fragment
    }

    return element
}

export default ConsumerProvider