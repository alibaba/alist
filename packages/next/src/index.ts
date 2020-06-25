import { registerListComponent } from '@alist/react-schema-renderer'
export * from '@alist/react'
import {
  InternalList as List,
  InternalSelection as Selection,
  InternalSorter as Sorter,
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
} from '@alist/next-components'

import SchemaList from './components/SchemaList'
import Filter from './components/Filter'
import Layout from './components/Layout'

import './fields'
export * from '@alist/react-schema-renderer'
export * from '@formily/next-components'
export * from '@formily/next'

import { FormSlot } from '@formily/next'

// 传入默认组件
registerListComponent({
  FormSlot,
  List,
  Table,
  Filter,
  Clear,
  Reset,
  Search,
  Layout,
  Pagination,
  ToggleTrigger,
  ExpandTrigger,
  ExpandContainer,
  Selection,
  Consumer
})

export {
  List,
  Selection,
  Sorter,
  Layout,
  ExpandContainer,
  ExpandTrigger,
  SchemaList,
  ToggleTrigger,
  Filter,
  Table,
  Pagination,
  Clear,
  createListActions,
  createAsyncListActions,
  Consumer,
  Search,
  Reset
}
