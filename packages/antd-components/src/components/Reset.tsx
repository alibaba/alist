import React from 'react'
import { Consumer, ListLifeCycleTypes } from '@alist/react'
import { createVirtualBox, createControllerBox } from '@formily/antd'
import { Button } from 'antd'

const InternalReset = (props) => {
    const { form, render, content, children, ...others } = props
    return <Consumer>
        {(list) => {            
            if (list) {
                const { reset } = list
                if (typeof render === 'function') {
                    return render(reset)
                }
                return <Button {...others} onClick={() => {
                    reset()
                }}>
                    {content || children}
                </Button>
            } else {
                return <Button {...others} onClick={() => {
                    form.notify(ListLifeCycleTypes.ON_FORM_LIST_RESET, form)
                }}>
                    {content || children}
                </Button>
            }
        }}
    </Consumer>
}

createVirtualBox('reset', InternalReset)
const Reset = createControllerBox('alist-reset', (props) => {
    const { form, schema } = props
    const componentProps = schema.getExtendsComponentProps()
    return <InternalReset {...componentProps} form={form} />
})

export {
    InternalReset,
    Reset
}