import { Consumer } from '@alist/react'
import { registerListComponent } from '@alist/react-schema-renderer'
import List from './components/List'
import SchemaList from './components/SchemaList'
import Filter from './components/Filter'
import Table from './components/Table'
import Pagination from './components/Pagination'
import Layout from './components/Layout'
import Clear from './components/Clear'
import Search from './components/Search'
import Reset from './components/Reset'
import Selection from './components/Selection'
import ExpandContainer from './components/ExpandContainer'
import ExpandTrigger from './components/ExpandTrigger'
import ToggleTrigger from './components/ToggleTrigger'
import { createAntdListActions, createAntdAsyncListActions } from './shared'
import './fields'
export * from '@formily/antd'
export * from '@alist/react'

// 传入默认组件
registerListComponent({
  List,
  Table,
  Filter,
  Clear,
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
  createAntdListActions as createListActions,
  createAntdAsyncListActions as createAsyncListActions,
  Consumer,
  Search,
  Reset
}
