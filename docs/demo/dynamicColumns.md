# 动态设置列

## API 实例

- getAllColumns 获取当前所有列
- setColumns 动态设置列
- getColumns 获取当前所有列

```tsx
const actions = createListActions()

;<Button
  onClick={() => {
    const allCols = actions.getAllColumns()
    actions.setColumns(allCols.filter(item => item.props.title !== 'hello'))
  }}
>
  过滤掉Title为hello的列
</Button>
```

## 动态设置列（Ant-Design）

```jsx
import ReactDOM from 'react-dom'
import { Button } from 'antd'
import React, { useEffect } from 'react'
import {
  ListLifeCycleTypes,
  createListActions,
  Selection,
  List,
  Table,
  Pagination,
  Filter,
  Layout,
  Search,
  Clear
} from '@alist/antd'
import 'antd/dist/antd.css'

const actions = createListActions()

const App = props => {
  const { children, ...others } = props
  const url = 'https://alist-wiki.oss-cn-beijing.aliyuncs.com/data.json'

  return (
    <List
      actions={actions}
      url={url}
      effects={($, actions) => {
        $(ListLifeCycleTypes.ON_LIST_MOUNTED).subscribe(payload => {
          actions.setRowSelection() // 启用筛选模式
        })
      }}
    >
      <Selection>
        {(opts, list) => {
          const { allIds, ids, selectedAll, selectedNone, dataSource } =
            opts || {}
          return (
            <div>
              <Button
                onClick={() => {
                  const columns = actions.getAllColumns()
                  actions.setColumns(
                    columns.filter(item => {
                      return item.props.title !== 'value2'
                    })
                  )
                }}
              >
                动态减少一列
              </Button>

              <Button
                onClick={() => {
                  const columns = actions.getAllColumns()
                  actions.setColumns(columns)
                }}
              >
                恢复动态列
              </Button>
            </div>
          )
        }}
      </Selection>
      <Table rowKey="value">
        {/* <Table primaryKey="value"> */}
        <Table.Column title="标题" dataIndex="label" />
        <Table.Column title="value" dataIndex="value" />
        <Table.Column title="value2" dataIndex="value" />
        <Table.Column title="value3" dataIndex="value" />
      </Table>
    </List>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

## 动态设置列

```jsx
import ReactDOM from 'react-dom'
import { Button } from '@alifd/next'
import React, { useEffect, useState } from 'react'
import {
  ListLifeCycleTypes,
  createListActions,
  Selection,
  List,
  Table,
  Pagination,
  Filter,
  Layout,
  Search,
  Clear
} from '@alist/next'
import '@alifd/next/dist/next.css'

const actions = createListActions()

const App = props => {
  const { children, ...others } = props
  const url = 'https://alist-wiki.oss-cn-beijing.aliyuncs.com/data.json'

  const [cols, setCols] = useState(['k1'])

  useEffect(() => {
    setTimeout(() => {
      setCols(['k2', 'k3'])
    }, 1000)
  }, [])

  return (
    <List
      actions={actions}
      url={url}
      effects={($, actions) => {
        $(ListLifeCycleTypes.ON_LIST_MOUNTED).subscribe(payload => {
          actions.setRowSelection() // 启用筛选模式
        })
      }}
    >
      <Table primaryKey="value">
        {cols.map(item => (
          <Table.Column dataIndex={item} title={item} />
        ))}
      </Table>
    </List>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```
