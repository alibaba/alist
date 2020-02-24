import { useContext, useEffect, useRef } from 'react'
import ListContext from '../context'
import { ListLifeCycleTypes } from '@alist/core'
import useForceUpdate from '../hooks/useForceUpdate'
import { IFilterHook, IFilterProps } from '../types'

const useFilter = (props: IFilterProps): IFilterHook => {
    const filterRef = useRef(props.form || null)
    const { useForm, effects } = props
    const list = useContext(ListContext)
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
