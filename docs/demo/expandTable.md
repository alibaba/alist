## Table区域展开收起

## Fusion-Next

通过 `ToggleTrigger` 可以快速实现

```jsx
import React from 'react'
import {
  List, Table,
  ToggleTrigger,
} from '@alist/next'
import '@alifd/next/dist/next.css'

const App = () => {  
  return <div>
    <List
      dataSource={[
          { id: '1', label: 'label-a', value: 'a' },
          { id: '2', label: 'label-b', value: 'b' }
      ]}
    >
      <Table
        expandedRowRender={(record) => (record.label + '-' + record.value)}
        hasExpandedRowCtrl={false}
      >
        <Table.Column title="label" dataIndex="label" />
        <Table.Column title="value" dataIndex="value" />
        <Table.Column title="op" dataIndex="id" cell={(val, idx, record) => {
            return <ToggleTrigger id={record.id} expandText="展开" unExpandText="收起" />
        }} />
      </Table>
    </List>
  </div>
}

ReactDOM.render(<App />, document.getElementById('root'))
```

## Ant-Design

通过 `ToggleTrigger` 可以快速实现

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
  ToggleTrigger,
} from '@alist/antd'
import'antd/dist/antd.css'

const actions = createListActions()
const App = () => {  
  return <div>
    <List
      actions={actions}
      dataSource={[
          { id: '1', label: 'label-a', value: 'a' },
          { id: '2', label: 'label-b', value: 'b' }
      ]}
    >
      <Table
        rowKey="id"
        // expandIcon={() => null}
        expandedRowRender={(record) => (record.label + '-' + record.value)}
      >
        <Table.Column title="label" dataIndex="label" />
        <Table.Column title="value" dataIndex="value" />
        <Table.Column title="op" dataIndex="id" render={(val, record) => {
            return <ToggleTrigger id={record.id} expandText="展开" unExpandText="收起" />
        }} />
      </Table>
    </List>
  </div>
}

ReactDOM.render(<App />, document.getElementById('root'))
```