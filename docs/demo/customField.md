# 使用 ConnectProvider(推荐)

无须手动维护组件与 AList 的关系，简单包裹即可，方便在页面任何脱离搜索区域的地方使用改变搜索条件的组件。

| 属性名            | 描述                     | 类型                  | 默认值 |
| :---------------- | :----------------------- | :-------------------- | :----- |
| name              | 表单组件名               | string                |        |
| searchOnChange    | 值改变时是否立即发起请求 | boolean               | false  |
| children          | 设置返回内容             | ({ value, setValue }) |        |
| defaultEmptyValue | 设置默认空值             | any                   | null   |

```jsx
import React, { useState } from 'react'
import {
  List,
  Table,
  Pagination,
  Filter,
  Layout,
  Search,
  Clear,
  Reset,
  createListActions,
  ConnectProvider
} from '@alist/antd'
import { Select } from 'antd'
import 'antd/dist/antd.css'

const actions = createListActions()
const App = () => {
  const url = 'https://alist-wiki.oss-cn-beijing.aliyuncs.com/data.json'

  return (
    <div>
      <List
        actions={actions}
        url={url}
        defaultFilterValues={{ username: 'hello' }}
      >
        <Filter inline>
          <Filter.Item type="input" name="username" title="username" />
          <Filter.Item type="input" name="age" title="age" />
          <Layout.ButtonGroup>
            <Search>搜索</Search>
            <Clear>清空</Clear>
            <Reset>重置</Reset>
          </Layout.ButtonGroup>
        </Filter>
        <div>
          <h5>自定义组件搜索</h5>
          <ConnectProvider name="custom" searchOnChange>
            {({ value, setValue }) => {
              return (
                <Select
                  style={{ width: '200px' }}
                  onChange={setValue}
                  value={value}
                >
                  <Select.Option value="a">a</Select.Option>
                  <Select.Option value="b">b</Select.Option>
                </Select>
              )
            }}
          </ConnectProvider>
        </div>
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

# 手动维护绑定关系

1. 通过 `setFilterData` 来设置自定义表单组件的值
2. 监听 `onListClear` 或 `onListReset` 的钩子来清空自定义表单组件的值

```jsx
import React, { useState } from 'react'
import {
  List,
  Table,
  Pagination,
  Filter,
  Layout,
  Search,
  Clear,
  Reset,
  ListEffectHooks,
  createListActions
} from '@alist/antd'
import { Select } from 'antd'
import 'antd/dist/antd.css'

const { onListClear$ } = ListEffectHooks
const actions = createListActions()
const App = () => {
  const url = 'https://alist-wiki.oss-cn-beijing.aliyuncs.com/data.json'

  const [value, setValue] = useState('')
  const changeHandler = val => {
    setValue(val)
    actions.setFilterData({ custom: val })
    actions.refresh()
  }

  return (
    <div>
      <List
        actions={actions}
        url={url}
        effects={() => {
          onListClear$().subscribe(() => {
            changeHandler(null)
          })
        }}
      >
        <Filter inline initialValues={{ username: 'hello' }}>
          <Filter.Item type="input" name="username" title="username" />
          <Filter.Item type="input" name="age" title="age" />
          <Layout.ButtonGroup>
            <Search enableLoading>搜索</Search>
            <Clear>清空</Clear>
            <Reset>重置</Reset>
          </Layout.ButtonGroup>
        </Filter>
        <div>
          <h5>自定义组件搜索</h5>
          <Select
            style={{ width: '200px' }}
            onChange={changeHandler}
            value={value}
          >
            <Select.Option value="a">a</Select.Option>
            <Select.Option value="b">b</Select.Option>
          </Select>
        </div>
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
