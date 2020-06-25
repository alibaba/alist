import { createExpandContainer } from '@alist/react'
import { createControllerBox, InternalVirtualField } from '@formily/next'

const ExpandContainer = createExpandContainer({ VirtualField: InternalVirtualField, createControllerBox })

export {
    ExpandContainer,
    ExpandContainer as ListExpandContainer,
};