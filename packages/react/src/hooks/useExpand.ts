import { useContext, useEffect } from 'react'
import ListContext from '../context'
import { ListLifeCycleTypes } from '@alist/core'
import useForceUpdate from './useForceUpdate'
import { IConsumerProps } from '../types'

export const useExpand = (props: IConsumerProps) => {
    const { form } = props
    const list = useContext(ListContext)
    const formInstance = form || list.getFilterInstance()
    const forceUpdate = useForceUpdate()
    const refresh = () => {
        forceUpdate()
    }

    useEffect(() => {
        const fnRef = formInstance.subscribe(({ type }) => {
            if ([ListLifeCycleTypes.ON_LIST_FILTER_ITEM_EXPAND,
                ListLifeCycleTypes.ON_LIST_FILTER_ITEM_COLLAPSE].includes(type)) {
                refresh()
            }
        })
        return function cleanup() {
            formInstance.unsubscribe(fnRef)
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
