## 多列表实例模式

## 控制接口返回数据控制

通过控制返回的数据结构中有 `multipleData` 激活多实例模式，并且配合 `MultipleProvider` 进行本地分页处理。

请查看源码中的 `formatAfter` 部分

> MultipleProvider 默认分页大小为10

```jsx
import React, { useEffect } from 'react'
import {
  List, Table, Pagination, MultipleProvider,
  createListActions,
} from '@alist/antd'
import'antd/dist/antd.css'

const actions = createListActions() 
const App = () => {  
  const url = 'https://alist-wiki.oss-cn-beijing.aliyuncs.com/data.json'

  return <div>
    <List url={url} actions={actions} formatAfter={(resp) => {
        const { dataList, ...others } = resp;
        const multipleData = {
            a1: [],
            a2: [],
        };
        dataList.forEach((item, idx) => {
            if (idx < 6) {
                multipleData.a1.push(item)
            } else {
                multipleData.a2.push(item)
            }
        })

        return {
            ...resp,
            multipleData,
        };        
    }}>
      <h3>List 1 pageSize: 5</h3>
      <MultipleProvider id="a1" pageSize={5}>
        <Table>
        <Table.Column title="label" dataIndex="label" />
        <Table.Column title="value" dataIndex="value" />
      </Table>
        <Pagination />
      </MultipleProvider>      

      <h3>List 2 pageSize: 3</h3>
      <MultipleProvider id="a2" pageSize={3}>
        <Table>
          <Table.Column title="label" dataIndex="label" />
          <Table.Column title="value" dataIndex="value" />
        </Table>
        <Pagination />
      </MultipleProvider>
    </List>
  </div>
}

ReactDOM.render(<App />, document.getElementById('root'))
```

## 手动设置

使用 `MultipleProvider` 配合 `setMultipleData` 将同一个接口的数据让多个列表消费。

请查看源码中的 `setMultipleData` 部分

> MultipleProvider 默认分页大小为10

```jsx
import React, { useEffect } from 'react'
import {
  List, Table, Pagination, MultipleProvider,
  createListActions,
} from '@alist/antd'
import'antd/dist/antd.css'

const getDataSource = (len) => {
  const dataSource = []
  for ( let i = 0; i < len; i++ ) {
    dataSource.push({ label: `id: #${Math.random().toString(36).slice(-8)}`, value: i })
  }

  return dataSource
}

const actions = createListActions() 
const App = () => {  
  useEffect(() => {
    actions.setMultipleData({
      a1: getDataSource(15),
      a2: getDataSource(15),
    })
  }, [])

  return <div>
    <h5>同一份接口数据，多个列表实例消费</h5>
    <List actions={actions}>
      <h3>List 1 pageSize: 10</h3>
      <MultipleProvider id="a1">
        <Table>
        <Table.Column title="label" dataIndex="label" />
        <Table.Column title="value" dataIndex="value" />
      </Table>
        <Pagination />
      </MultipleProvider>      

      <h3>List 2 pageSize: 3</h3>
      <MultipleProvider id="a2" pageSize={3}>
        <Table>
          <Table.Column title="label" dataIndex="label" />
          <Table.Column title="value" dataIndex="value" />
        </Table>
        <Pagination />
      </MultipleProvider>
    </List>
  </div>
}

ReactDOM.render(<App />, document.getElementById('root'))
```