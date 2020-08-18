import React from 'react'
import { ExpandTrigger } from '@alist/react'
import { createVirtualBox, createControllerBox, FormSpy } from '@formily/next'
import { Button } from '@alifd/next'

const InternalExpandTrigger = (props) => {
    const { render, expandText, unExpandText, ...others } = props

    return <FormSpy selector={[]}>
      {({ form }) => {
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
      }}
    </FormSpy>
}

createVirtualBox('filter-expand-trigger', InternalExpandTrigger)
const ListExpandTrigger = createControllerBox('alist-expand-trigger', (props) => {
    const { schema } = props
    const componentProps = schema.getExtendsComponentProps()
    return <InternalExpandTrigger {...componentProps} />
})

export {
    ListExpandTrigger,
    InternalExpandTrigger,
}