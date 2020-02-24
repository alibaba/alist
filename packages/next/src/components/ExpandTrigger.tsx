import React from 'react'
import { ExpandTrigger } from '@alist/react'
import { createVirtualBox } from '@formily/next'
import { Button } from '@alifd/next'

const NextExpandTrigger = (props) => {
    const { render, expandText, unExpandText, ...others } = props
    return <ExpandTrigger>
        {({ toggleExpandStatus, expandStatus }) => {
            if (typeof render === 'function') {
                return render({ toggleExpandStatus, expandStatus })
            }
            return <Button {...others} onClick={toggleExpandStatus}>
                {expandStatus === 'expand' ?  unExpandText : expandText}
            </Button>
        }}
    </ExpandTrigger>
}

createVirtualBox('filter-expand-trigger', NextExpandTrigger)

export default NextExpandTrigger;