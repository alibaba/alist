import React from 'react'
import { Consumer } from '@alist/react'
import { Button } from 'antd'
import { createVirtualBox, createControllerBox } from '@formily/antd'

const noop = () => {}
const InternalSearch = (props) => {
    const { form, enableLoading, render, content, children, ...others } = props
    return <Consumer>
        {(list) => {
            const filterInstance = form || list.getFilterInstance()
            const search = list?.search || noop
            if (typeof render === 'function') {
                return render(search)
            }

            return <Button
                loading={enableLoading ? list?.getLoading() : undefined}
                type="primary"
                {...others}
                onClick={(...args) => {
                    if (filterInstance) {
                        filterInstance.submit(() => {
                            search()
                        })
                    } else {
                        search()
                    }
                    
                    if (typeof props.onClick === 'function') {
                        props.onClick(...args)   
                    }
                }}
            >
                {content || children}
            </Button>
        }}
    </Consumer>
}

createVirtualBox('search', InternalSearch)
const Search = createControllerBox('alist-search', (props) => {
    const { form, schema } = props
    const componentProps = schema.getExtendsComponentProps()
    return <InternalSearch {...componentProps} form={form} />
})

export {
    Search,
    InternalSearch,
}