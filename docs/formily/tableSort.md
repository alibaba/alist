## Table 排序(Ant-Design)

```jsx
import React, { useRef, useContext } from 'react'
import {
  List,
  Table,
  Pagination,
  createListActions,
  Search
} from '@alist/antd-components'
import {
  SchemaForm,
  SchemaMarkupField as Field,
  Submit,
  createFormActions
} from '@formily/antd'
import { FormMegaLayout, Input } from '@formily/antd-components'
import Printer from '@formily/printer'
import 'antd/dist/antd.css'

const listActions = createListActions()
const actions = createFormActions()
const App = () => {
  return (
    <div>
      <Printer>
        <SchemaForm actions={actions} components={{ Input }}>
          <List
            actions={listActions}
            dataSource={[
              { id: '1', label: 'label-a', value: 'a' },
              { id: '2', label: 'label-b', value: 'b' }
            ]}
          >
            <Table>
              <Table.Column title="label" sorter dataIndex="label" />
              <Table.Column title="value" dataIndex="value" />
            </Table>
            <Pagination />
          </List>
        </SchemaForm>
      </Printer>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

## Table 排序(Fusion-Design)

```jsx
import React, { useRef, useContext } from 'react'
import {
  List,
  Table,
  Pagination,
  createListActions,
  Search
} from '@alist/next-components'
import {
  SchemaForm,
  SchemaMarkupField as Field,
  Submit,
  createFormActions
} from '@formily/next'
import { FormMegaLayout, Input } from '@formily/next-components'
import Printer from '@formily/printer'
import '@alifd/next/dist/next.css'

const listActions = createListActions()
const actions = createFormActions()
const App = () => {
  return (
    <div>
      <Printer>
        <SchemaForm actions={actions} components={{ Input }}>
          <List
            actions={listActions}
            dataSource={[
              { id: '1', label: 'label-a', value: 'a' },
              { id: '2', label: 'label-b', value: 'b' }
            ]}
          >
            <Table>
              <Table.Column title="label" sortable dataIndex="label" />
              <Table.Column title="value" dataIndex="value" />
            </Table>
            <Pagination />
          </List>
        </SchemaForm>
      </Printer>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```
