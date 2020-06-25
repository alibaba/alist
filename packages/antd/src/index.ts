import { registerListComponent } from '@alist/react-schema-renderer'
export * from '@alist/react'
import {
  InternalList as List,
  InternalSelection as Selection,
  ExpandContainer,
  InternalExpandTrigger as ExpandTrigger,
  InternalToggleTrigger as ToggleTrigger,
  InternalTable as Table,
  InternalPagination as Pagination,
  InternalClear as Clear,
  InternalConsumer as Consumer,
  InternalSearch as Search,
  InternalReset as Reset,
  createListActions,
  createAsyncListActions
} from '@alist/antd-components'

import SchemaList from './components/SchemaList'
import Filter from './components/Filter'
import Layout from './components/Layout'

import './fields'
export * from '@alist/react-schema-renderer'
export * from '@formily/antd-components'
export * from '@formily/antd'

import { FormSlot } from '@formily/antd'

// 传入默认组件
registerListComponent({
  FormSlot,
  List,
  Table,
  Filter,
  Clear,
  Search,
  Reset,
  Layout,
  Pagination,
  ToggleTrigger,
  ExpandTrigger,
  ExpandContainer,
  Selection,
  Consumer
})

export {
  Selection,
  ExpandContainer,
  ExpandTrigger,
  ToggleTrigger,
  List,
  SchemaList,
  Filter,
  Table,
  Pagination,
  Clear,
  Layout,
  createListActions,
  createAsyncListActions,
  Consumer,
  Search,
  Reset
}
