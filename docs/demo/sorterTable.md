## Table区域支持排序

## Fusion-Next

通过 `Sorter` 可以快速实现

```jsx
import React from 'react'
import {
  List, Table,
  Sorter, ListLifeCycleTypes
} from '@alist/next'
import '@alifd/next/dist/next.css'

const App = () => {  
  return <div>
    <List
      effects={($, actions) => {
        $(ListLifeCycleTypes.ON_LIST_SORT).subscribe((payload) => {
          console.log('ON_LIST_SORT', payload)
        });
      }}
      dataSource={[
          { id: '1', label: 'label-a', value: 'a' },
          { id: '2', label: 'label-b', value: 'b' }
      ]}
    >
      <Table>
        <Table.Column title="label" sortable dataIndex="label" />
        <Table.Column title="value" dataIndex="value" />
      </Table>
    </List>
  </div>
}

ReactDOM.render(<App />, document.getElementById('root'))
```

## Ant-Design

通过 `Sorter` 可以快速实现

```jsx
import React from 'react'
import {
  List, Table, Pagination,
  Filter,
  Layout,
  Search,
  Clear,
  createListActions,
  ListLifeCycleTypes,
  Sorter,
} from '@alist/antd'
import'antd/dist/antd.css'

const actions = createListActions()
const App = () => {  
  return <div>
    <List
      effects={($, actions) => {
        $(ListLifeCycleTypes.ON_LIST_SORT).subscribe((payload) => {
          console.log('ON_LIST_SORT', payload)
        });
      }}
      actions={actions}
      dataSource={[
          { id: '1', label: 'label-a', value: 'a' },
          { id: '2', label: 'label-b', value: 'b' }
      ]}
    >
      <Table rowKey="id">
        <Table.Column title="label" sorter dataIndex="label" />
        <Table.Column title="value" dataIndex="value" />
      </Table>
    </List>
  </div>
}

ReactDOM.render(<App />, document.getElementById('root'))
```