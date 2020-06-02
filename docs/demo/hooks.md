# Hooks 使用

## Fusion Form 与 Table 联动

useTable 接收 field 实例后，会返回 search 对象。这是一个 Fusion Design 的示例。
本质上是 useTable 依赖于 [ahooks use-fusion-table](https://ahooks.js.org/zh-CN/hooks/table/use-fusion-table)。

```jsx
import React from 'react'
import {
  Table,
  Pagination,
  Field,
  Form,
  Input,
  Button,
  Select,
  Icon
} from '@alifd/next'
import { useFusionTable } from 'ahooks'
import '@alifd/next/dist/next.css'

const getTableData = ({ current, pageSize }, formData) => {
  let query = `page=${current}&size=${pageSize}`
  Object.entries(formData).forEach(([key, value]) => {
    if (value) {
      query += `&${key}=${value}`
    }
  })
  return fetch(`https://randomuser.me/api?results=${pageSize}&${query}`)
    .then(res => res.json())
    .then(res => ({
      total: 55,
      list: res.results.slice(0, 10)
    }))
}
const App = () => {
  const field = Field.useField([])
  const { paginationProps, tableProps, search, loading } = useFusionTable(
    getTableData,
    {
      field
    }
  )
  const { type, changeType, submit, reset } = search
  const advanceSearchForm = (
    <div>
      <Form
        inline
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end'
        }}
        field={field}
      >
        <Form.Item label="name:">
          <Input name="name" placeholder="name" />
        </Form.Item>
        <Form.Item label="email:">
          <Input name="email" placeholder="email" />
        </Form.Item>
        <Form.Item label="phone:">
          <Input name="phone" placeholder="phone" />
        </Form.Item>
        <Form.Item label=" ">
          <Form.Submit loading={loading} type="primary" onClick={submit}>
            Search
          </Form.Submit>
        </Form.Item>
        <Form.Item label=" ">
          <Button onClick={reset}>reset</Button>
        </Form.Item>
        <Form.Item label=" ">
          <Button text type="primary" onClick={changeType}>
            Simple Search
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
  const searchForm = (
    <div>
      <Form
        inline
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end'
        }}
        field={field}
      >
        <Form.Item label=" ">
          <Select name="gender" defaultValue="all" onChange={submit}>
            <Select.Option value="all">all</Select.Option>
            <Select.Option value="male">male</Select.Option>
            <Select.Option value="female">female</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label=" ">
          <Input
            name="name"
            innerAfter={
              <Icon
                type="search"
                size="xs"
                onClick={submit}
                style={{ margin: 4 }}
              />
            }
            placeholder="enter name"
            onPressEnter={submit}
          />
        </Form.Item>
        <Form.Item label=" ">
          <Button text type="primary" onClick={changeType}>
            Advanced Search
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
  return (
    <>
      {type === 'simple' ? searchForm : advanceSearchForm}
      <Table {...tableProps} primaryKey="email">
        <Table.Column title="name" dataIndex="name.last" width={140} />
        <Table.Column title="email" dataIndex="email" width={500} />
        <Table.Column title="phone" dataIndex="phone" width={500} />
        <Table.Column title="gender" dataIndex="gender" width={500} />
      </Table>
      <Pagination style={{ marginTop: 16 }} {...paginationProps} />
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

## Formliy 与 Fusion Table 联动

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

  return (
    <div>
      <Table {...table}>
        <Table.Column title="label" dataIndex="label" />
        <Table.Column title="value" dataIndex="value" />
      </Table>
      <Pagination {...pagiantion} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```
