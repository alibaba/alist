import React from 'react'
import { Consumer } from '@alist/react'
import { createVirtualBox } from '@formily/antd'
import { Submit } from '@formily/antd'

const InternalSearch = (props) => {
    const { render, content, children, ...others } = props
    return <Consumer>
        {(list) => {
            if (list) {
                const { search } = list
                if (typeof render === 'function') {
                    return render(search)
                }

                return <Submit {...others} onSubmit={(values) => {
                    search()
                }}>
                    {content || children}
                </Submit>
            } else {
                return <Submit {...others}>{content || children}</Submit>
            }
        }}
    </Consumer>
}

createVirtualBox('search', InternalSearch)
const Search = createVirtualBox('alist-search', InternalSearch)

export {
    Search,
    InternalSearch,
}