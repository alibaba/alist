import React from 'react'
import { MultipleProvider as InternalMultipleProvider } from '@alist/react'
import { createControllerBox } from '@formily/antd'

const MultipleProvider = createControllerBox('alist-multipleProvider', (props) => {
    const { form, schema, children } = props
    const componentProps = schema.getExtendsComponentProps()
    return <InternalMultipleProvider {...componentProps} form={form}>
		{children}
	</InternalMultipleProvider>
})

export {
	MultipleProvider,
	InternalMultipleProvider,
}