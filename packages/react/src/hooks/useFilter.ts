import { useContext, useEffect, useRef } from 'react'
import ListContext from '../context'
import { ListLifeCycleTypes, IList } from '@alist/core'
import useForceUpdate from '../hooks/useForceUpdate'
import { IFilterHook, IFilterProps } from '../types'

export const useFilter = (props: IFilterProps, propsList?: IList): IFilterHook => {
    const filterRef = useRef(props.form || null)
    const { useForm, effects, mirror } = props
    const list = propsList || useContext(ListContext)
    const filterProps = list.getFilterProps()
    const latestInstance = list.getFilterInstance()
    const mirrorProps: any = mirror ? { value: latestInstance.getFormState(state => state.values) } : {}

    const filterInstance = useForm({
        ...mirrorProps,
        ...props,
        ...filterProps,
        form: filterRef.current,
        effects: list.getFilterEffects({ effects: mirror ? latestInstance.originalEffects : effects }),
    })

    if (mirror && !filterRef.current) {
        list.appendMirrorFilterInstance(filterInstance)
    }
    
    filterRef.current = filterRef.current || filterInstance
    if (!latestInstance) {
        filterInstance.originalEffects = effects
        list.setFilterInstance(filterInstance)
    }

    useEffect(() => {
        if (mirror) {
            const idMirror = filterInstance.subscribe(({ type, payload }) => {
                if (type === 'onFieldChange') {
                    const fieldState = payload.getState()
                    const { name, value, props, values, editable } = fieldState
                    latestInstance.setFieldState(name, state => {
                        state.value = value
                        state.values = values
                        state.editable = editable
                        state.props = props
                    })
                }
            })
            return function cleanup() {
                filterInstance.unsubscribe(idMirror)
            }
        }        
    }, [])

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
