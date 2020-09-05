import React from 'react'
import { Consumer, ListLifeCycleTypes } from '@alist/react'
import { Button } from '@alifd/next'
import { createVirtualBox, createControllerBox } from '@formily/next'

const noop = () => {}
const InternalSearch = (props) => {
    const { form, enableLoading, render, content, children, ...others } = props
    return <Consumer
        form={form}
        reducer={(state, action) => {
            switch (action.type) {
                case ListLifeCycleTypes.ON_LIST_BEFORE_QUERY:
                    return {
                        ...state,
                        loading: true
                    }
                case ListLifeCycleTypes.ON_LIST_ERROR:
                case ListLifeCycleTypes.DID_LIST_UPDATE:
                    return {
                        ...state,
                        loading: false
                    }
                default:
                    return state
            }
        }}
    >
        {(list, { state }) => {
            const filterInstance = form || list.getFilterInstance()
            const { loading } = state
            const search = list?.search || noop
            if (typeof render === 'function') {
                return render(search)
            }

            return <Button
                loading={enableLoading ? list ? list.getLoading() : loading : undefined}
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