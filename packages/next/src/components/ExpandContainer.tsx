import { createExpandContainer } from '@alist/react'
import { createControllerBox, InternalVirtualField } from '@formily/next'

const NextExpandContainer = createExpandContainer({ VirtualField: InternalVirtualField, createControllerBox })

export default NextExpandContainer;