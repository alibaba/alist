import React, { useContext, useRef } from 'react';
import { ListProvider, ListContext } from '@alist/react'
import { createControllerBox, useFormEffects } from '@formily/next'
import useNextList from '../hooks/useNextList';

const InternalList = (props) => {
    const opts = useNextList(props)
    return <ListProvider {...props} {...opts} />
}

const ListFilterSpy = (props) => {
    const settingRef = useRef(null)
    
    const { form } = props    
    const list = useContext(ListContext)
    const effects = list.getFilterEffects()
    if (!settingRef.current) {
        list.setFilterInstance(form)        
        list.initSyncFilterData(true)        
        settingRef.current = true
    }

    useFormEffects(effects)

    return null
}

const VirtualList = (props) => {
    const { form, children, schema } = props
    const componentProps = schema.getExtendsComponentProps()

    return <InternalList {...componentProps}>
        <ListFilterSpy form={form} />
        {children}
    </InternalList>
}
const List = createControllerBox('alist', VirtualList)

export {
    List,
    VirtualList,
    InternalList,
}