import React from 'react'
import { Consumer } from '@alist/react'
import { createVirtualBox } from '@formily/antd'
import { Submit } from '@formily/antd'

const Search = (props) => {
    const { render, children, ...others } = props
    return <Consumer>
        {({ search }) => {
            if (typeof render === 'function') {
                return render(search)
            }

            return <Submit {...others} htmlType="search" onSubmit={(values) => {
                search()
            }}>
                {children}
            </Submit>
        }}
    </Consumer>
}

createVirtualBox('search', Search)

export default Search;