import React from 'react'
import { Consumer } from '@alist/react'
import { createVirtualBox } from '@formily/antd'
import { Button } from 'antd'

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