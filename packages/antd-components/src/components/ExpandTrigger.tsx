import React from 'react'
import { ExpandTrigger } from '@alist/react'
import { createVirtualBox, createControllerBox } from '@formily/antd'
import { Button } from 'antd'

const InternalExpandTrigger = (props) => {
    const { render, expandText, unExpandText, form, ...others } = props

    return <ExpandTrigger form={form}>
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

createVirtualBox('filter-expand-trigger', InternalExpandTrigger)
const ListExpandTrigger = createControllerBox('alist-expand-trigger', (props) => {
    const { form, schema } = props
    const componentProps = schema.getExtendsComponentProps()
    return <InternalExpandTrigger {...componentProps} form={form} />
})

export {
    ListExpandTrigger,
    InternalExpandTrigger,
}