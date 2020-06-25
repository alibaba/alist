import React from 'react'
import { Selection } from '@alist/react'
import { createVirtualBox } from '@formily/antd'
import { setSelectionsByInstance } from '../shared'

const InternalSelection = (props) => {
    const { children, render, ...others } = props
    const compatChildren = render || children
    return <Selection {...others}>
        {(opts, list) => {
            let element
            if (typeof compatChildren === 'function') {
                list.setSelections = (ids, records) => {
                    setSelectionsByInstance(list, ids, records)
                }
                element = compatChildren(opts, list)
            } else {
                element = compatChildren || React.Fragment
            }
            return element
        }}
    </Selection>
}

const ListSelection = createVirtualBox('alist-selection', InternalSelection)

export {
    ListSelection,
    InternalSelection,
}