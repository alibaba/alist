import { useContext, useEffect } from 'react'
import ListContext from '../context'
import { ListLifeCycleTypes } from '@alist/core'
import { IExpandProps } from '../types'

export const useExpandContainer = (props: IExpandProps) => {
    const list = useContext(ListContext)
    const { targetPath, form, schema } = props
    const componentProps = schema.getExtendsComponentProps()
    const { expandStatus: propExpandStatus } = componentProps
    const setDisplay = (display) => {
        form.setFormState(state => state.expandStatus = display ? 'expand' : 'collapse')
        form.notify(ListLifeCycleTypes.ON_LIST_EXPAND_STATUS_SYNC)
        form.setFieldState(targetPath, state => {
            state.display = display
        })
    }

    useEffect(() => {
        let expandStatus
        if (list) {
            expandStatus = list.getExpandStatus()
        } else if (form) {
            expandStatus = propExpandStatus || 'collapse'
            form.setFormState(state => state.expandStatus = expandStatus)
        }
        
        setDisplay(expandStatus === 'expand')
    }, [])

    useEffect(() => {
        const fnRef = form.subscribe(({ type }) => {
            if (type === ListLifeCycleTypes.ON_LIST_FILTER_ITEM_EXPAND) {
                setDisplay(true)
            } else if (type === ListLifeCycleTypes.ON_LIST_FILTER_ITEM_COLLAPSE) {
                setDisplay(false)
            }
        })
        return function cleanup() {
            form.unsubscribe(fnRef)
        }
    }, [form])
}

export default useExpandContainer
