import { useContext, useEffect } from 'react'
import ListContext from '../context'
import { ListLifeCycleTypes } from '@alist/core'
import useForceUpdate from './useForceUpdate'
import { IConsumerProps } from '../types'

export const useExpand = (props: IConsumerProps) => {
    const list = useContext(ListContext)
    const forceUpdate = useForceUpdate()
    const refresh = () => {
        forceUpdate()
    }
    useEffect(() => {
        const idExpand = list.subscribe(ListLifeCycleTypes.ON_LIST_FILTER_ITEM_EXPAND, () => {
            refresh()
        })
        const idCollapse = list.subscribe(ListLifeCycleTypes.ON_LIST_FILTER_ITEM_COLLAPSE, () => {
            refresh()
        })

        return function cleanup() {
            list.unSubscribe(idExpand)
            list.unSubscribe(idCollapse)
        }
    })

    const expandStatus = list.getExpandStatus()

    return {
        toggleExpandStatus: list.toggleExpandStatus,
        expandStatus,
        list
    }
}

export default useExpand
