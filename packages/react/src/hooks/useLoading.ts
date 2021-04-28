import { useContext, useEffect } from 'react'
import ListContext from '../context'
import MultipleContext from '../context/multiple'
import { ListLifeCycleTypes, IList } from '@alist/core'
import useForceUpdate from './useForceUpdate'
import { ITableProps, ILoadingHook } from '../types'

export const useLoading = (props: ITableProps = {}, propList?: IList): ILoadingHook => {
    const { multipleId: propsMultipleId } = props
    const list = propList || useContext(ListContext)
    const { id: contextMultipleId } = useContext(MultipleContext) || {}
    const multipleId = propsMultipleId || contextMultipleId
    const loading = list ? list.getLoading() : props.loading
    
    const forceUpdate = useForceUpdate()
    const refresh = (opts) => {
        const { payload } = opts;
        const { notifyId } = payload || {}
        if (notifyId) {
            if (multipleId !== undefined) {
                if (notifyId && notifyId.some(id => id === multipleId)) {
                    forceUpdate()
                }
            } else {
                forceUpdate()
            }
        } else {
            forceUpdate()
        }
    }

    useEffect(() => {
        if (list) {
            const id = list.subscribe(ListLifeCycleTypes.ON_LIST_LOADING_REFRESH, refresh)
            return function cleanup () {
                list.unSubscribe(id)
            }
        }
    }, [list])

    return {
        loading,
    }
}

export default useLoading
