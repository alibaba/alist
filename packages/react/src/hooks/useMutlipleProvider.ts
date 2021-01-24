import { useContext, useEffect } from 'react'
import ListContext from '../context/'
import { ListLifeCycleTypes } from '@alist/core'
import useForceUpdate from '../hooks/useForceUpdate'
import { IMultipleProps, IMultipleHook } from '../types'

export const useMultipleProvider = (props: IMultipleProps): IMultipleHook => {
    const { id, pageSize = 10 } = props
    const list = useContext(ListContext)

    useEffect(() => {
        list && list.setMultiplePageSize({ [id]: pageSize })
    }, [])

    const forceUpdate = useForceUpdate()
    const refresh = () => {
        forceUpdate()
    }
    
    useEffect(() => {
        if (list) {
            const id = list.subscribe(ListLifeCycleTypes.ON_LIST_MULTIPLE_REFRESH, refresh)
            return function cleanup() {
                list.unSubscribe(id)
            }
        }
    }, [list])

    return {
        id,
        pageSize,
        list,
    }
}

export default useMultipleProvider
