import { useContext, useEffect, useRef } from 'react'
import ListContext from '../context'
import { ListLifeCycleTypes, IList } from '@alist/core'
import useForceUpdate from '../hooks/useForceUpdate'
import { IFilterHook, IFilterProps } from '../types'

export const useFilter = (props: IFilterProps, propsList?: IList): IFilterHook => {
    const filterRef = useRef(props.form || null)
    const { useForm, effects } = props
    const list = propsList || useContext(ListContext)
    const filterProps = list.getFilterProps()
    const filterInstance = useForm({
        ...props,
        ...filterProps,
        form: filterRef.current,
        effects: list.getFilterEffects({ effects }),
    })

    filterRef.current = filterRef.current || filterInstance
    list.setFilterInstance(filterInstance)

    const forceUpdate = useForceUpdate()
    const refresh = () => {
        forceUpdate()
    }

    useEffect(() => {
        const id = list.subscribe(ListLifeCycleTypes.ON_LIST_FILTER_REFRESH, refresh)
        return function cleanup() {
            list.unSubscribe(id)
        }
    }, [])

    return {
        list,
        filterInstance,
    }
}

export default useFilter
