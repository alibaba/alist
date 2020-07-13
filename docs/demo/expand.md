# 展开收起 ExpandContainer/ExpandTrigger

通过 `<ExpandTrigger>` 可以控制被 `<ExpandContainer>` 包裹的搜索组件。

```jsx
import React from 'react'
import {
  List,
  Table,
  Pagination,
  createListActions,
  Filter,
  Search,
  Clear,
  Layout,
  SchemaMarkupField,
  FormBlock,
  FormCard,
  SchemaForm,
  ExpandContainer,
  ExpandTrigger,
} from '@alist/antd'
import'antd/dist/antd.css'

const actions = createListActions()
const App = () => {
  const url = 'https://alist-wiki.oss-cn-beijing.aliyuncs.com/data.json'

  return (
    <div>
      <List actions={actions} url={url} pageSize={5}>
        <Filter>
          <Layout inset columns={4}>
            <Filter.Item type="number" title="数字选择" name="number" />
            <Filter.Item type="boolean" title="开关选择" name="boolean" x-mega-props={{ full: false }}/>
            <Filter.Item type="date" title="日期选择" name="date" />            
            <Filter.Item type="year" title="年份" name="year" />
            <ExpandContainer>
              <Filter.Item type="time" title="时间" name="time" />
              <Filter.Item type="rating" title="等级" name="rating" />            
            </ExpandContainer>
          </Layout>
          <Layout.ButtonGroup>
              <Search>搜索</Search>
              <Clear>重置</Clear>
              <ExpandTrigger expandText="展开" unExpandText="收起" />
          </Layout.ButtonGroup>
        </Filter>
      </List>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```