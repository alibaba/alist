import React from 'react'
import { Consumer } from '@alist/react'
import { createVirtualBox } from '@formily/next'
import { Button } from '@alifd/next'

const InternalReset = (props) => {
    const { render, content, children, ...others } = props
    return <Consumer>
        {({ reset }) => {
            if (typeof render === 'function') {
                return render(reset)
            }
            return <Button {...others} onClick={() => {
                reset()
            }}>
                {content || children}
            </Button>
        }}
    </Consumer>
}

createVirtualBox('reset', InternalReset)
const Reset = createVirtualBox('alist-reset', InternalReset)

export {
    InternalReset,
    Reset
}