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
    const { children, name, connectMode = false, defaultEmptyValue = null, searchOnChange = false } = props
    const list = useContext(ListContext)
    const { mode } = useContext(FilterModeContext) || {}
    const formatName = getFormatName(name)
    const formValidateConfig = list.getValidateConfig()
    const validateConfig = getValidateConfigByName(formValidateConfig, formatName)

    const forceUpdate = useForceUpdate()
    const refresh = (names) => {
        if (names === '*' || names.some(n => n === name)) {
            forceUpdate()
        }
    }

    const clean = () => {
        if (connectMode && name) {
            list.setFilterData({ [name]: defaultEmptyValue })
            refresh([name])
        }
    }

    const setValue = (value) => {
        if (connectMode && name) {
            list.setFilterData({ [name]: value })
            refresh([name])
            if (searchOnChange) {                
                list.refresh()
            }
        }
    }

    const filterData = list.getFilterData()
    const value = name ? (filterData[name] === undefined ? defaultEmptyValue :filterData[name]) : defaultEmptyValue

    useEffect(() => {
        const id = list.subscribe(ListLifeCycleTypes.ON_LIST_FILTER_REFRESH, refresh)
        return function cleanup() {
            list.unSubscribe(id)
        }
    }, [])

    useEffect(() => {
        const id = list.subscribe(ListLifeCycleTypes.ON_LIST_CLEAR, clean)
        return function cleanup() {
            list.unSubscribe(id)
        }
    }, [])

    let element
    if (typeof children === 'function') {
        element = children({
            validateConfig,
            mode,
            setValue,
            value,
        }, list)
    } else {
        element = children || React.Fragment
    }
    return element
}

export default FieldProvider