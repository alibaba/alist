import React from 'react'
import { Selection } from '@alist/react'
import { setSelectionsByInstance } from '../shared'

const NextSelection = (props) => {
    const { children, ...others } = props
    return <Selection {...others}>
        {(opts, list) => {
            let element
            if (typeof children === 'function') {
                list.setSelections = (ids, records) => {
                    setSelectionsByInstance(list, ids, records)
                }
                element = children(opts, list)
            } else {
                element = children || React.Fragment
            }
            return element
        }}
    </Selection>
}

export default NextSelection;