# 组件列表

以下组件使用 `Ant-Design` 来示意，`Fusion-Next` 完全一致。

## List

> AList 容器组件

引入

```tsx
import { List } from '@alist/antd'
```

属性

| 属性名       | 描述                             | 类型                 | 默认值                 |
|:----------|:---------------------------------|:--------------------|:--------------------|
| effects    | 副作用配置                  | IListEffect |  |
| schema    | 通过schema渲染列表                  | IListSchema |  |
| actions    | 列表操作API                  | [IList](https://github.com/alibaba/AList/blob/master/packages/core/src/types.ts#L228) |  |
| url    | 请求接口URL，优先级高于 `dataSource`                  | string |  |
| dataSource    | 设置此值则默认为 `手动控制数据模式`                  | string |  |
| defaultFilterValues    | 初始化搜索区域值，设置此值后，执行`reset`方法将恢复                  | {[key:string]:any} |  |
| filterValues    | 设置搜索区域值                 | {[key:string]:any} |  |
| params    | 初始化绑定搜索字段的URL参数                  | {[key:string]: string} |  |
| paramsFields    | 需要绑定URL参数的搜索字段列表                  | string[] |  |
| method    |  请求类型                  | GET `or` POST |  |
| autoLoad    |  是否初始化发起请求                  | boolean | true |
| formatFilter    |  格式化搜索区域值                  | () => {[key:string]:any} |  |
| formatBefore    |  格式化请求前参数                  | ([IListQueryData](https://github.com/alibaba/AList/blob/master/packages/core/src/types.ts#L11)) => any |  |
| formatAfter    |  格式化请求返回结果                  | (any) => [IListResponse](https://github.com/alibaba/AList/blob/master/packages/core/src/types.ts#L69) |  |
| query    |  代理整个请求过程                  | () => [IListQuery](https://github.com/alibaba/AList/blob/master/packages/core/src/types.ts#L8) |  |
| expandStatus    |  初始化搜索条件展开状态                  | 'collapse' `or` 'expand' | collapse |

## Filter/Filter.Item

> AList 搜索区域，`Filter` / `Filter.Item` 完全等价于 [Formily](#https://formilyjs.org/) 的 `SchemaForm` 和 `SchemaMarkupField`。

引入

```tsx
import { Filter } from '@alist/antd'
const FilterItem = Filter.Item
```

## Table

> AList 核心内容展示区域，无须关心 `dataSource`，AList会负责管理， 属性通过 `setTableProps` 管理。

引入

```tsx
import { Table } from '@alist/antd'
```

## Pagination

> AList 分页区域，无须管理页面配置，AList会负责管理，在这里仅做占位符，可以自由选定出现的位置。

## Clear

> 清空按钮

属性

| 属性名       | 描述                             | 类型                 | 默认值                 |
|:----------|:---------------------------------|:--------------------|:--------------------|
| render    |自定义渲染清空按钮内容，默认为Button                  | clear方法 |  |


用法

```tsx
import { Clear, List, Filter } from '@alist/antd'
const App = () => (<List>
    <Filter>
        <Filter.Item type="input" name="username" />
        <Clear>清空</Clear>
    </Filter>
</List>)
```

## Reset

> 重置按钮, 与 `defaultFilterValues` 配合使用, 如果有此属性则恢复，若无则与 `clear` 一致。

属性

| 属性名       | 描述                             | 类型                 | 默认值                 |
|:----------|:---------------------------------|:--------------------|:--------------------|
| render    |自定义渲染清空按钮内容，默认为Button                  | (reset) => React.ReactElement |  |


用法

```tsx
import { Reset, List, Filter } from '@alist/antd'
const App = () => (<List>
    <Filter>
        <Filter.Item type="input" name="username" />
        <Reset>重置</Reset>
    </Filter>
</List>)
```

## Search

> 搜索按钮

属性

| 属性名       | 描述                             | 类型                 | 默认值                 |
|:----------|:---------------------------------|:--------------------|:--------------------|
| render    |自定义渲染搜索按钮内容，默认为Button                  | (search) => React.ReactElement |  |


用法

```tsx
import { Search, List, Filter } from '@alist/antd'
const App = () => (<List>
    <Filter>
        <Filter.Item type="input" name="username" />
        <Search>搜索</Search>
    </Filter>
</List>)
```

## ConnectProvider

无须手动维护组件与AList的关系，简单包裹即可，方便在页面任何脱离搜索区域的地方使用改变搜索条件的组件。

| 属性名       | 描述                             | 类型                 | 默认值                 |
|:----------|:---------------------------------|:--------------------|:--------------------|
| name    | 表单组件名                  | string |  |
| searchOnChange    | 值改变时是否立即发起请求                  | boolean | false |
| children    | 设置返回内容                  | ({ value, setValue }) |  |
| defaultEmptyValue    | 设置默认空值                  | any | null |

```jsx
import React, { useState } from 'react'
import {
  List, Table, Pagination, Filter,
  Layout, Search, Clear,
  createListActions, ConnectProvider
} from '@alist/antd'
import { Select } from 'antd'
import'antd/dist/antd.css'

const actions = createListActions()
const App = () => {  
  const url = 'https://alist-wiki.oss-cn-beijing.aliyuncs.com/data.json'

  return <div>
    <List actions={actions} url={url}>
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
        <ConnectProvider name="custom" searchOnChange>
            {({ value, setValue }) => {
                console.log('===', value)
                return <Select style={{ width: '200px' }} onChange={setValue} value={value}>
                    <Select.Option value="a">a</Select.Option>
                    <Select.Option value="b">b</Select.Option>
                </Select>
            }}
        </ConnectProvider>
      </div>
    </List>
  </div>
}

ReactDOM.render(<App />, document.getElementById('root'))
```

## Consumer

> 自定义消费列表状态组件

属性

| 属性名       | 描述                             | 类型                 | 默认值                 |
|:----------|:---------------------------------|:--------------------|:--------------------|
| selector    | 监听变更的生命周期                  | [ListLifeCycleTypes](#ListLifeCycleTypes) | * |
| children    | 监听变更的生命周期                  | (list) => React.ReactElement |  |


用法

```tsx
import { Consumer, List, Filter, ListLifeCycleTypes } from '@alist/antd'
const App = () => (<List>
    <Filter>
        <Filter.Item type="input" name="username" />
        <Reset>重置</Reset>
    </Filter>
    <Consumer selector={[ListLifeCycleTypes.ON_LIST_FILTER_ITEM_CHANGE]}>
        {(list) => {
            const username = list.getFieldState('username', state => state.value)
            return <div>username: {username}</div>
        }}
    </Consumer>
</List>)
```

## ExpandContainer

> 搜索区域折叠字段容器, 被包裹的搜索字段会被默认收起。初始化状态根据 `<List>` 传入的 `expandStatus` 决定。

用法

```tsx
import { List, Filter, ExpandContainer } from '@alist/antd'
const App = () => (<List expandStatus="expand">
    <Filter>
        <ExpandContainer>
            <Filter.Item type="input" name="username" />
        </ExpandContainer>
    </Filter>
</List>)
```

## ExpandTrigger

> 搜索区域折叠字段触发器，与 `<ExpandContainer>` 配合

| 属性名       | 描述                             | 类型                 | 默认值                 |
|:----------|:---------------------------------|:--------------------|:--------------------|
| render    |自定义渲染内容，默认为Button                  | ({ toggleExpandStatus, expandStatus }) => React.ReactElement |  |
| unExpandText    | 监听变更的生命周期                  | (list) => React.ReactElement |  |
| expandText    | 监听变更的生命周期                  | (list) => React.ReactElement |  |


用法

```tsx
import { List, Filter, ExpandContainer, ExpandTrigger } from '@alist/antd'
const App = () => (<List expandStatus="expand">
    <Filter>
        <ExpandContainer>
            <Filter.Item type="input" name="username" />
        </ExpandContainer>
        <ExpandTrigger expandText="展开" unExpandText="收起" />
    </Filter>
</List>)
```

## ToggleTrigger

> 内容区域展开收起的触发器, 与 `expandedRowRender` 配合， 此模式对于 `Fusion-Next` 更合适。

用法

```tsx
import { Table, List, Filter, ToggleTrigger } from '@alist/next'
const App = () => (<List
    dataSource={[
        { id: '1', username: 'username-a' },
        { id: '2', username: 'username-b' }
    ]}
>
    <Table
        expandedRowRender={(record) => (record.id + '-' + record.username)}
        hasExpandedRowCtrl={false}
    >
    <Table.Column title="username" dataIndex="username" />
    <Table.Column title="operation" dataIndex="id" cell={(val, idx, record) => {
        return <ToggleTrigger id={record.id} expandText="展开" unExpandText="收起" />
    }} />
    </Table>
</List>)
```




