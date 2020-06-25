import React, { useContext, useRef } from 'react';
import { ListProvider, ListContext } from '@alist/react'
import { createControllerBox, useFormEffects } from '@formily/antd'
import useAntdList from '../hooks/useAntdList';

const InternalList = (props) => {
    const opts = useAntdList(props)
    return <ListProvider {...props} {...opts} />
}

const ListFilterSpy = (props) => {
    const settingRef = useRef(null)
    
    const { form } = props    
    const list = useContext(ListContext)
    const effects = list.getFilterEffects()
    if (!settingRef.current) {
        list.setFilterInstance(form)        
        const syncFilterData = list.initSyncFilterData(true)        
        settingRef.current = true
    }

    useFormEffects(effects)

    return null
}

const List = createControllerBox('alist', (props) => {
    const { form, children, schema } = props
    const componentProps = schema.getExtendsComponentProps()

    return <InternalList {...componentProps}>
        <ListFilterSpy form={form} />
        {children}
    </InternalList>
})

export {
    List,
    InternalList,
}