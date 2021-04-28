import React from 'react'
import useLoading from '../hooks/useLoading'

const LoadingProvider: React.FC<any> = (props = {}) => {
    const { children } = props
    const { loading } = useLoading(props)

    let element
    if (typeof children === 'function') {
        element = children(loading)
    } else {
        element = children || React.Fragment
    }

    return element;
}

export default LoadingProvider