import React, { useContext } from 'react'
import { ListLifeCycleTypes } from '@alist/core'
import ToggleContext from '../context/toggle'
import { useConsumer } from '../hooks/useConsumer'

const isValidId = (id) => ([null, undefined].indexOf(id) === -1)

const Toggle = (props) => {
    const { id, children, ...others } = props
    const { list, state }= useConsumer({
        ...others,
        selector: [
            ListLifeCycleTypes.ON_LIST_TOGGLE,
            ListLifeCycleTypes.ON_LIST_TABLE_REFRESH,
            'onSetOpenRowKeys'
        ],
        reducer: (state, action: any) => {
            if (action.type === 'onSetOpenRowKeys') {
                const { payload } = action || {}
                const { expanded, expandedAll, defaultExpandAll } = payload || {}                
                const nextState = {
                    ...state,
                    expanded,
                    expandedAll,
                }

                if ('defaultExpandAll' in payload) {
                    nextState.defaultExpandAll = defaultExpandAll
                }

                return nextState
            } else {
                return state
            }
        }
    })
    const { toggle, openRowKeys } = useContext(ToggleContext) || {}
    let expandStatus
    let expandedAllStatus
    if (isValidId(id)) {
        expandStatus = openRowKeys.indexOf(id) !== -1 ? 'expand' : 'collapse'
    } else {
        if (state) {
            if (state.expandedAll === 'none') {
                expandedAllStatus = 'collapse'
            } else if (state.expandedAll === 'all') {
                expandedAllStatus = 'expand'
            } else {
                expandedAllStatus = state.defaultExpandAll ? 'expand' : 'collapse'
            }
        }
    }

    let element
    if (typeof children === 'function') {
        element = children({
            toggle: () => {
                if (isValidId(id)) {
                    id && toggle(id)
                }                
            },
            toggleAll : (...args) => {
                if (list && list.actions && list.actions.toggleAll) {
                    list.actions.toggleAll(...args)
                }
            },
            expandStatus,
            expandedAllStatus,
        })
    } else {
        element = children || React.Fragment
    }

    return element
}

export default Toggle