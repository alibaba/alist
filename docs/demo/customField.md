# 三种数据模式

## URL 模式

**推荐** 传入 `url` 会自动设置为 `URL 模式` 并自动发起请求。 可以打开 控制台 - network 查看请求格式。

```jsx
import React, { useState } from 'react'
import {
  List, Table, Pagination, Filter,
  Layout, Search, Clear, ListEffectHooks,
  createListActions,
} from '@alist/antd'
import { Select } from 'antd'
import'antd/dist/antd.css'

const { onListClear$ } = ListEffectHooks
const actions = createListActions()
const App = () => {  
  const url = 'https://mocks.alibaba-inc.com/mock/alist/data'

  const [value, setValue] = useState('')
  const changeHandler = (val) => {
      setValue(val)
      actions.setFilterData({ 'custom': val })
      actions.refresh()
  }

  return <div>
    <List
        actions={actions}
        url={url}
        effects={() => {
            onListClear$().subscribe(() => {
                changeHandler(null)
            })
        }}
    >
      <Filter inline>
        <Filter.Item type="input" name="username" title="username"/>
        <Filter.Item type="input" name="age" title="age"/>
        <Layout.ButtonGroup>
          <Search>搜索</Search>
          <Clear>重置</Clear>
        </Layout.ButtonGroup>
      </Filter>
      <div>
        <h5>自定义组件搜索</h5>
        <Select style={{ width: '200px' }} onChange={changeHandler} value={value}>
            <Select.Option value="a">a</Select.Option>
            <Select.Option value="b">b</Select.Option>
        </Select>
      </div>
      <Table>
        <Table.Column title="label" dataIndex="label" sorter/>
        <Table.Column title="value" dataIndex="value"/>
      </Table>
      <Pagination />
    </List>
  </div>
}

ReactDOM.render(<App />, document.getElementById('root'))
```