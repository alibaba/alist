## 与Formily配合


```jsx
import React from 'react'
import { useAList } from '@alist/next'
import { Table, Pagination } from '@alifd/next'
import '@alifd/next/dist/next.css'

const App = () => {
    const { actions, table, pagiantion } = useAList({
        dataSource: [
          { id: '1', label: 'label-a', value: 'a' },
          { id: '2', label: 'label-b', value: 'b' }
      ]
    })

  return <div>
    <Table {...table}>
        <Table.Column title="label" dataIndex="label" />
        <Table.Column title="value" dataIndex="value" />
    </Table>
    <Pagination {...pagiantion} />
  </div>
}

ReactDOM.render(<App />, document.getElementById('root'))
```