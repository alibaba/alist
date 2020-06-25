import React from 'react'
import { Consumer } from '@alist/react'
import { createVirtualBox } from '@formily/next'
import { Button } from '@alifd/next'

const InternalClear = (props) => {
    const { render, children, content, ...others } = props
    return <Consumer>
        {({ clear }) => {
            if (typeof render === 'function') {
                return render(clear)
            }
            return <Button {...others} onClick={() => {
                clear()
            }}>
                {content || children}
            </Button>
        }}
    </Consumer>
}

const Clear = createVirtualBox('alist-clear', InternalClear)

export {
    Clear,
    InternalClear,
}