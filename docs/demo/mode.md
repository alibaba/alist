# 三种数据模式

## URL 模式

**推荐** 传入 `url` 会自动设置为 `URL 模式` 并自动发起请求。 可以打开 控制台 - network 查看请求格式。

```jsx
import React from 'react'
import { List, Table, Pagination, createListActions } from '@alist/antd'
import 'antd/dist/antd.css'

const actions = createListActions()
const App = () => {
  const url = 'https://alist-wiki.oss-cn-beijing.aliyuncs.com/data.json'
  return (
    <div>
      <List
        actions={actions}
        url={url}
        pageSize={5}
        sortConfig={{
          sortLocal: sortConfig => {
            return [{ label: 'a', value: 'a' }]
          }
        }}
      >
        <Pagination />
        <Table>
          <Table.Column title="label" dataIndex="label" sorter />
          <Table.Column title="value" dataIndex="value" />
        </Table>
        <Pagination />
      </List>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

## 本地 dataSource 模式

传入 `dataSource` 就会设置为 `本地DataSource模式`，并且会根据传入的分页大小自动完成数据分页。

> 不传入 url, query 时也会默认置为 `本地DataSource模式`

```jsx
import React from 'react'
import { List, Table, Pagination, createListActions } from '@alist/antd'

const getDataSource = len => {
  const dataSource = []
  for (let i = 0; i < len; i++) {
    dataSource.push({
      label: `id: #${Math.random()
        .toString(36)
        .slice(-8)}`,
      value: i
    })
  }

  return dataSource
}

const actions = createListActions()
const App = () => {
  const dataSource = getDataSource(20)

  return (
    <div>
      <List actions={actions} dataSource={dataSource} pageSize={5}>
        <Table>
          <Table.Column title="label" dataIndex="label" />
          <Table.Column title="value" dataIndex="value" />
        </Table>
        <Pagination />
      </List>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

## 自定义请求 Query 模式

自定义请求模式，`query`模式必须要传入`url`， 可以打开 控制台 - network 查看请求格式。

```jsx
import React from 'react'
import { List, Table, Pagination, createListActions, Search } from '@alist/antd'
import 'antd/dist/antd.css'

const getDataSource = len => {
  const dataSource = []
  for (let i = 0; i < len; i++) {
    dataSource.push({
      label: `id: #${Math.random()
        .toString(36)
        .slice(-8)}`,
      value: i
    })
  }

  return dataSource
}

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
const actions = createListActions()
const App = () => {
  const url = 'https://alist-wiki.oss-cn-beijing.aliyuncs.com/data.json'

  const customQuery = async opts => {
    const { data, url, method } = opts
    const { currentPage } = data
    await sleep(500)
    return {
      dataList: getDataSource(10),
      pageSize: 5,
      total: 20,
      totalPages: 4,
      currentPage
    }
  }

  return (
    <div>
      <List actions={actions} url={url} pageSize={5} query={customQuery}>
        <Search>搜索</Search>
        <Table>
          <Table.Column title="label" dataIndex="label" />
          <Table.Column title="value" dataIndex="value" />
        </Table>
        <Pagination />
      </List>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

## 多实例 multiple 模式

使用 `MultipleProvider` 配合 `setMultipleData` 将同一个接口数据让多个列表消费。

```jsx
import React, { useEffect } from 'react'
import {
  List,
  Table,
  Pagination,
  MultipleProvider,
  createListActions
} from '@alist/antd'

const getDataSource = len => {
  const dataSource = []
  for (let i = 0; i < len; i++) {
    dataSource.push({
      label: `id: #${Math.random()
        .toString(36)
        .slice(-8)}`,
      value: i
    })
  }

  return dataSource
}

const actions = createListActions()
const App = () => {
  useEffect(() => {
    actions.setMultipleData({
      a1: getDataSource(15),
      a2: getDataSource(15)
    })
  }, [])

  return (
    <div>
      <List actions={actions}>
        <p>List 1 pageSize: 10</p>
        <MultipleProvider id="a1">
          <Table>
            <Table.Column title="label" dataIndex="label" />
            <Table.Column title="value" dataIndex="value" />
          </Table>
          <Pagination />
        </MultipleProvider>

        <p>List 2 pageSize: 3</p>
        <MultipleProvider id="a2" pageSize={3}>
          <Table>
            <Table.Column title="label" dataIndex="label" />
            <Table.Column title="value" dataIndex="value" />
          </Table>
          <Pagination />
        </MultipleProvider>
      </List>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```
