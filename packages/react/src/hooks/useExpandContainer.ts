import { useContext, useEffect } from 'react'
import ListContext from '../context'
import { ListLifeCycleTypes } from '@alist/core'
import { IExpandProps } from '../types'

const useExpandContainer = (props: IExpandProps) => {
    const list = useContext(ListContext)
    const { targetPath } = props  
    const setDisplay = (display) => {
        const filterInstance = list.getFilterInstance()     
        filterInstance.setFieldState(targetPath, state => {
            state.display = display
        })
    }

    useEffect(() => {
        const expandStatus = list.getExpandStatus()
        setDisplay(expandStatus === 'expand')
    }, [])

    useEffect(() => {        
        const idExpand = list.subscribe(ListLifeCycleTypes.ON_LIST_FILTER_ITEM_EXPAND, () => {      
            setDisplay(true)
        })
        const idCollapse = list.subscribe(ListLifeCycleTypes.ON_LIST_FILTER_ITEM_COLLAPSE, () => {
            setDisplay(false)
        })
        return function cleanup() {
            list.unSubscribe(idExpand)
            list.unSubscribe(idCollapse)
        }
    })
}

export default useExpandContainer
