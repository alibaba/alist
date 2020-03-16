import { useContext, useEffect } from 'react'
import ListContext from '../context'
import { ListLifeCycleTypes } from '@alist/core'
import useForceUpdate from './useForceUpdate'
import { IFilterItemProps, IFilterItemHook } from '../types'

const getFormatName = (name) => {
    return name
}

const getValidateConfigByName = (validateConfig: any, name: string) => {
    // TODO: 对象表单 
    // TODO: 数组类表单
    return validateConfig[name]
}

export const useFilterItem = (props: IFilterItemProps): IFilterItemHook => {
    const { name } = props
    const list = useContext(ListContext)
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


    return {
        list,
        validateConfig,
    }
}

export default useFilterItem
