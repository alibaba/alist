import React from 'react'
import { Consumer } from '@alist/react'
import { Button } from 'antd'
import { createVirtualBox } from '@formily/antd'
import { Submit } from '@formily/antd'

const InternalSearch = (props) => {
    const { render, content, children, ...others } = props
    return <Consumer>
        {(list) => {
            if (list) {
                const { search } = list
                const filterInstance = list.getFilterInstance()
                if (typeof render === 'function') {
                    return render(search)
                }

                return <Button
                    // loading={list.getLoading()}
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