import { useContext, useEffect } from 'react'
import ListContext from '../context'
import ListPropsContext from '../context/listProps'
import MultipleContext from '../context/multiple'
import { ListLifeCycleTypes, IListKVMap, IListResponse, IList } from '@alist/core'
import useForceUpdate from './useForceUpdate'
import { IPaginationProps, IPaginationHook } from '../types'

export const usePagination = (props: IPaginationProps = {}, propList?: IList): IPaginationHook => {
    const { multipleId: propsMultipleId } = props
    const list = propList || useContext(ListContext)
    const { id: contextMultipleId } = useContext(MultipleContext) || {}
    const multipleId = propsMultipleId || contextMultipleId
    const listProps = useContext(ListPropsContext) || {}
    let hideWhenInvalid = listProps.hideWhenInvalid || false

    let pageData
    let setCurrentPage
    // 多实例列表的跳转页面通过setMultipleData实现
    if (multipleId !== undefined) {
        const multipleData = list.getMultipleData()
        const { dataList, ...others } = multipleData[multipleId] as IListKVMap<IListResponse> || {}
        setCurrentPage = (currentPage: number) => list.setMultipleData({ [multipleId]: { currentPage }})
        pageData = { ...others }
    // 常规的跳转页面方法
    } else {
        pageData = list.getPageData()
        setCurrentPage = list.setCurrentPage
    }
        
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
        const id = list.subscribe(ListLifeCycleTypes.ON_LIST_PAGINATION_REFRESH, refresh)
        return function cleanup () {
            list.unSubscribe(id)
        }
    }, [list])

    return {
        list,
        pageData,
        setCurrentPage,
        setPageSize: list.setPageSize,
        hideWhenInvalid,
    }
}

export default usePagination
