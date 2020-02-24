import { createExpandContainer } from '@alist/react'
import { createControllerBox, InternalVirtualField } from '@formily/antd'

const NextExpandContainer = createExpandContainer({ VirtualField: InternalVirtualField, createControllerBox })

export default NextExpandContainer;