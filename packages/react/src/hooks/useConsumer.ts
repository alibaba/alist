import { useState, useContext, useEffect, useReducer } from 'react'
import ListContext from '../context'
import { ListLifeCycleTypes, IList } from '@alist/core'
// import useForceUpdate from './useForceUpdate'
import { IConsumerProps } from '../types'

const noop = s => s
export const useConsumer = (props: IConsumerProps, propsList?: IList): {
    list: IList,
    type: string,
    state: any
} => {
    const { selector, reducer = noop } = props
    const formatSelector = selector || ['*']
    const list = propsList || useContext(ListContext)
    const [type, setType] = useState<string>(ListLifeCycleTypes.ON_LIST_INIT)

    const [state, dispatch] = useReducer(
        (state, action) => reducer(state, action, list),
        props.initialState || {}
    )

    // const forceUpdate = useForceUpdate()
    // const refresh = () => {
    //     forceUpdate()
    // }

    useEffect(() => {
        // 上帝模式，默认所有事件都监听, 命中相关事件会触发重绘
    
        if (list) {
            const id = list.subscribe(ListLifeCycleTypes.LIST_LIFECYCLES_GOD_MODE, ({ type: currentType, payload, ctx }) => {
                if (formatSelector.indexOf('*') !== -1 || (formatSelector.indexOf(currentType) !== -1)) {
                    setType(currentType)
                    dispatch({
                        type: currentType,
                        payload
                    })
                    // refresh()
                }
            })
            return function cleanup() {
                list.unSubscribe(id)
            }
        }        
    })

    return {
        list,
        type,
        state
    }
}

export default useConsumer
