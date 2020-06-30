import React from 'react'
import { Consumer, ListLifeCycleTypes } from '@alist/react'
import { createControllerBox } from '@formily/next'
import { Button } from '@alifd/next'

const InternalClear = (props) => {
    const { form, render, children, content, ...others } = props
    return <Consumer>
        {(list) => {            
            if (list) {
                const { clear } = list
                if (typeof render === 'function') {
                    return render(clear)
                }
                return <Button {...others} onClick={() => {
                    clear()
                }}>
                    {content || children}
                </Button>
            } else {
                return <Button {...others} onClick={() => {
                    form.notify(ListLifeCycleTypes.ON_FORM_LIST_CLEAR, form)
                }}>
                    {content || children}
                </Button>
            }
        }}
    </Consumer>
}

const Clear = createControllerBox('alist-clear', (props) => {
    const { form, schema } = props
    const componentProps = schema.getExtendsComponentProps()
    return <InternalClear {...componentProps} form={form} />
})

export {
    Clear,
    InternalClear,
}