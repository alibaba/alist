import { useRef, useMemo, useContext } from 'react'
import createList, { ListLifeCycle, ListLifeCycleTypes } from '@alist/core'
import { useEva } from "react-eva";
import { IList } from '@alist/core/lib/types'
import ListDomain from '../context/listDomain'
import { createListEffects, createListActions } from '../shared'
import { IListUIProps } from '../types'

const useList = (options: IListUIProps): IList & { actions: any } => {
    const optionsRef = useRef<IListUIProps>(options)
    const actionsRef = useRef<any>(options.actions)
    const listDomain = useContext(ListDomain)
    actionsRef.current = actionsRef.current || createListActions()

    // 延迟实现
    const { implementActions, dispatch } = useEva({
        actions: actionsRef.current,
        effects: createListEffects(options.effects, actionsRef.current)
    })

    const lifeCycles = [
        new ListLifeCycle(
          ({ type, payload }) => {
            dispatch.lazy(type, () => payload)
          }
        ),
        new ListLifeCycle(
          ListLifeCycleTypes.ON_LIST_WILL_INIT,
          ({ payload, ctx }) => {
            const actions = {
              ...ctx,
              dispatch: ctx.notify
            }
            implementActions(actions)
            actionsRef.current.addAPI = (name, fn) => {
              actionsRef.current[name] = fn
            }

            if (listDomain) {
              listDomain.setContext({ actions })
            }
          }
        )
      ]

    optionsRef.current.lifeCycles = lifeCycles
    const list = useMemo(() => {
        const originList = createList(optionsRef.current)
        return {
          ...originList,
          actions: actionsRef.current,
        }
    }, [])
    
    // 这里是为了在next/antd/其他顶层去实现搜索区域
    if (optionsRef.current.afterInitialized) {
        optionsRef.current.afterInitialized(list)
    }

    return list
}

export default useList
