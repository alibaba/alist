import React from 'react'
import { Consumer } from '@alist/react'
import { createVirtualBox } from '@formily/next'
import { Button } from '@alifd/next'

const Reset = (props) => {
    const { render, children, ...others } = props
    return <Consumer>
        {({ reset }) => {
            if (typeof render === 'function') {
                return render(reset)
            }
            return <Button {...others} onClick={() => {
                reset()
            }}>
                {children}
            </Button>
        }}
    </Consumer>
}

createVirtualBox('reset', Reset)

export default Reset;