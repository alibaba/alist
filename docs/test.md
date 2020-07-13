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

    <List actions={actions} url={url}>
      <Filter>
        <Layout inset gap={[12, 16]}>
            <Filter.Item type="input" name="username" title="username"/>
            <Filter.Item
              type="radio"
              enum={['1', '2', '3', '4']}
              title="Radio"
              required
              name="radio"
            />
            <Filter.Item
              type="checkbox"
              enum={['1', '2', '3', '4']}
              title="Radio"
              required
              name="checkbox"
            />
            <Filter.Item
              type="select"
              enum={['1', '2', '3', '4']}
              required
              title="Select"
              name="select"
            />
            <Filter.Item
              span={2}
              type="daterange"
              title="日期范围"
              // default={['2018-12-19', '2018-12-19']}
              name="daterange"
            />
            <Filter.Item type="number" title="数字选择" name="number" />
            <Filter.Item type="boolean" title="开关选择" name="boolean" hasBorder={false} />
            <Filter.Item type="date" title="日期选择" name="date" />            
            <Filter.Item type="year" title="年份" name="year" />
            <Filter.Item type="time" title="时间" name="time" />
            <Filter.Item type="rating" title="等级" name="rating" />   
        </Layout>
        <Layout.ButtonGroup>
          <Search>搜索</Search>
          <Clear>重置</Clear>
        </Layout.ButtonGroup>
      </Filter>
    </List>
  </div>
}

ReactDOM.render(<App />, document.getElementById('root'))
```

```jsx
import React from 'react'
import {
  List, Table,
  ToggleTrigger,
} from '@alist/next'
import '@alifd/next/dist/next.css'

const App = () => {  
  return <div>
    <List
      dataSource={[
          { id: '1', label: 'label-a', value: 'a' },
          { id: '2', label: 'label-b', value: 'b' }
      ]}
    >
      <Table
        expandedRowIndent={[0,0]}
        expandedRowRender={(record) => (record.label + '-' + record.value)}
        hasExpandedRowCtrl={false}
        primaryKey="value"
      >
        <Table.Column title="label" dataIndex="label" />
        <Table.Column title="value" dataIndex="value" />
        <Table.Column title="op" dataIndex="id" cell={(val, idx, record) => {
            return <ToggleTrigger id={record.value} expandText="展开" unExpandText="收起" />
        }} />
      </Table>
    </List>
  </div>
}

ReactDOM.render(<App />, document.getElementById('root'))
```