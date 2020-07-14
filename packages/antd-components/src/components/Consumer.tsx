import { Consumer as InternalConsumer } from '@alist/react'
import { createVirtualBox } from '@formily/antd'

const ListSpy = createVirtualBox('alist-consumer', InternalConsumer)

export {
    ListSpy,
    InternalConsumer as InternalListSpy,
    InternalConsumer,
}