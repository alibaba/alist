import { useState, useContext, useEffect, useReducer, useCallback } from 'react'
import ListContext from '../context'
import ListDomainContext from '../context/listDomain'
import { ListLifeCycleTypes, IList } from '@alist/core'
import useForceUpdate from './useForceUpdate'
import { ListDomain } from '../shared'
import { IConsumerProps } from '../types'

const noop = s => s
export const useConsumer = (props: IConsumerProps, propsList?: IList): {
    list: IList,
    type: string,
    state: any,
    listDomain: ListDomain
} => {
    const { form, selector, reducer = noop } = props
    const formatSelector = selector || ['*']
    const list = propsList || useContext(ListContext)
    const listDomain = useContext(ListDomainContext) || {} as ListDomain
    const [type, setType] = useState<string>(ListLifeCycleTypes.ON_LIST_INIT)

    const [state, dispatch] = useReducer(
        (state, action) => reducer(state, action, list),
        props.initialState || {}
    )

    const forceUpdate = useForceUpdate()
    const refresh = () => {
        forceUpdate()
    }

    // 上帝模式，默认所有事件都监听, 命中相关事件会触发重绘
    const eventHandler = useCallback(({ type: currentType, payload, ctx }) => {
        if (formatSelector.indexOf('*') !== -1 || (formatSelector.indexOf(currentType) !== -1)) {
            setType(currentType)
            dispatch({
                type: currentType,
                payload
            })
            refresh()
        }
    }, [dispatch])

    useEffect(() => {
        if (list) {
            const id = list.subscribe(ListLifeCycleTypes.LIST_LIFECYCLES_GOD_MODE, eventHandler)
            return function cleanup() {
                list.unSubscribe(id)
            }
        }     
    }, [list])

    useEffect(() => {
        if (form) {
            const id = form.subscribe(({ type, payload }) => {
                if (type === ListLifeCycleTypes.LIST_LIFECYCLES_FORM_GOD_MODE) {
                    eventHandler(payload)
                }
            })
            return function cleanup() {
                form.unsubscribe(id)
            }
        }
    }, [form])

    return {
        list,
        type,
        state,
        listDomain,
    }
}

export default useConsumer
