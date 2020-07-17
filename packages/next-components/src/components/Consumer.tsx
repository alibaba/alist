import { Consumer as InternalConsumer } from '@alist/react'
import { createVirtualBox } from '@formily/next'

const ListSpy = createVirtualBox('alist-consumer', InternalConsumer)

export {
    ListSpy,
    ListSpy as ListConsumer,
    InternalConsumer as InternalListSpy,
    InternalConsumer,
}