import React from 'react'
import { Consumer } from '@alist/react'
import { Button } from '@alifd/next'
import { createVirtualBox, createControllerBox } from '@formily/next'

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
                        let cb = () => {
                            search()
                        }
                        if (list && list.getMode() === 'dataSource') {
                            cb = undefined
                        }

                        filterInstance.submit(cb)
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