import React, { useContext, useEffect } from 'react'
import ListContext from '../context'
import { ListLifeCycleTypes } from '@alist/core'
import FilterModeContext from '../context/filterMode'
import useForceUpdate from '../hooks/useForceUpdate'

const getFormatName = (name) => {
    return name
}

const getValidateConfigByName = (validateConfig: any, name: string) => {
    // TODO: 对象表单 
    // TODO: 数组类表单
    return validateConfig[name]
}

const FieldProvider: React.FC<any> = (props = {}) => {
    const { children, name } = props
    const list = useContext(ListContext)
    const { mode } = useContext(FilterModeContext)
    const formatName = getFormatName(name)
    const formValidateConfig = list.getValidateConfig()
    const validateConfig = getValidateConfigByName(formValidateConfig, formatName)

    const forceUpdate = useForceUpdate()
    const refresh = (names) => {
        if (names === '*' || names.some(n => n === name)) {
            forceUpdate()
        }
    }

    useEffect(() => {
        const id = list.subscribe(ListLifeCycleTypes.ON_LIST_FILTER_REFRESH, refresh)
        return function cleanup() {
            list.unSubscribe(id)
        }
    }, [])

    let element
    if (typeof children === 'function') {
        element = children({
            validateConfig,
            mode,
        }, list)
    } else {
        element = children || React.Fragment
    }
    return element
}

export default FieldProvider