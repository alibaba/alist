import React from 'react'
import useConsumer from '../hooks/useConsumer'

const ConsumerProvider: React.FC<any> = (props = {}) => {
    const { children, render, ...others } = props
    const list = useConsumer(others)
    const comaptChildren = render || children

    let element
    if (typeof comaptChildren === 'function') {
        element = comaptChildren(list)
    } else {
        element = comaptChildren || React.Fragment
    }

    return element
}

export default ConsumerProvider