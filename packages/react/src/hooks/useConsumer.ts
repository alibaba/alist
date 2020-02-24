import { useContext, useEffect } from 'react'
import ListContext from '../context'
import { ListLifeCycleTypes, IList } from '@alist/core'
import useForceUpdate from './useForceUpdate'
import { IConsumerProps } from '../types'

const useConsumer = (props: IConsumerProps): IList => {
    const { selector } = props
    const formatSelector = selector || ['*']
    const list = useContext(ListContext)

    const forceUpdate = useForceUpdate()
    const refresh = () => {
        forceUpdate()
    }
    useEffect(() => {
        // 上帝模式，默认所有事件都监听, 命中相关事件会触发重绘
        // todo: reducer机制
        const id = list.subscribe(ListLifeCycleTypes.LIST_LIFECYCLES_GOD_MODE, ({ type, payload, ctx }) => {
            if (formatSelector.indexOf('*') !== -1 || (formatSelector.indexOf(type) !== -1)) {
                refresh()
            }
        })
        return function cleanup() {
            list.unSubscribe(id)
        }
    })

    return list
}

export default useConsumer
