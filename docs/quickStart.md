## 安装

根据您正在使用的UI库做选择，目前支持 `Fusion-Next` 及 
`Ant-Design`。

#### Ant-Design

```shell
$ npm install @alist/antd
```

#### Fusion-Next

```shell
$ npm install @alist/next
```

## 引入及使用

项目以 `Ant-Deisgn` 为例，`Fusion-Next` 同理。

> 查看源码可以点击右下角到 `codesandbox查看` 或者 `本地查看`。

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
} from '@alist/antd'
import'antd/dist/antd.css'

const actions = createListActions()
const App = () => {  
  const url = 'https://alist-wiki.oss-cn-beijing.aliyuncs.com/data.json'

  return <div>
    <h5>打开控制台查看Network发起的请求</h5>

    <List
      actions={actions}
      url={url}
      pageSize={5}
      effects={($) => {
        // triggered when filterItem change
        $(ListLifeCycleTypes.ON_LIST_FILTER_ITEM_CHANGE).subscribe((state) => {
          console.log(state)
        });
      }}
    >
      <Filter>
        <Layout inline>
            <Filter.Item type="input" name="username" title="username"/>
            <Filter.Item type="input" name="age" title="age"/>
        </Layout>
        <Layout.ButtonGroup>
          <Search>搜索</Search>
          <Clear>重置</Clear>
        </Layout.ButtonGroup>
      </Filter>
      <Table>
        <Table.Column title="label" dataIndex="label" />
        <Table.Column title="value" dataIndex="value" />
      </Table>
      <Pagination showSizeChanger/>
    </List>
  </div>
}

ReactDOM.render(<App />, document.getElementById('root'))
```