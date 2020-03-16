import { useContext, useEffect, useMemo } from 'react'
import ListContext from '../context'
import MultipleContext from '../context/multiple'
import { ListLifeCycleTypes, IListKVMap, IListResponse, IList } from '@alist/core'
import useForceUpdate from './useForceUpdate'
import { ITableProps, ITableHook } from '../types'

export const useTable = (props: ITableProps = {}, propList?: IList): ITableHook => {
    const { pickInitialTableProps, multipleId: propsMultipleId } = props
    const list = propList || useContext(ListContext)
    const { id: contextMultipleId } = useContext(MultipleContext) || {}
    const multipleId = propsMultipleId || contextMultipleId
    const loading = list ? list.getLoading() : props.loading
    let dataSource: any[]

    let primaryKey: any

    useMemo(() => {
        // 初始化加载时收集tableProps相关信息
        if (typeof pickInitialTableProps === 'function') {
            const initialTableProps = pickInitialTableProps(props)
            primaryKey = initialTableProps.primaryKey
            list.setTableProps(initialTableProps)
        }
    }, [])

    // 多列表实例模式
    if (multipleId !== undefined) {
        const multipleData = list.getMultipleData()
        const { paginationDataList } = multipleData[multipleId] as IListKVMap<IListResponse> || {}
        dataSource = paginationDataList as any [] || []
    } else {
        if (list) {
            dataSource = list.getPaginationDataSource()
        } else {
            dataSource = props.dataSource
        }        
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
        if (list) {
            const id = list.subscribe(ListLifeCycleTypes.ON_LIST_TABLE_REFRESH, refresh)
            return function cleanup () {
                list.unSubscribe(id)
            }
        }
    })

    const tableProps = list.getTableProps()

    return {
        tableProps,
        list,
        dataSource,
        loading,
        primaryKey,
    }
}

export default useTable
