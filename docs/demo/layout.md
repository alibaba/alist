# 搜索区域布局

## 布局分类

`AList` 会有以下布局类型

* **推荐** 等分自动换行布局
* **推荐** 等分自动换行布局 + inset
* 纵向布局（默认布局）
* 行内布局，设置 `inline=true`

### （推荐）等分自动换行布局 Layout

```jsx
import React from 'react'
import {
  List, Table, Pagination,
  createListActions, Filter,
  Search, Clear,
  Layout,
  SchemaMarkupField,
  FormBlock,
  FormCard,
  SchemaForm,
} from '@alist/antd'
import'antd/dist/antd.css'

const actions = createListActions()
const App = () => {  
  const url = 'https://mocks.alibaba-inc.com/mock/alist/data'

  return <div>
    <List
      actions={actions}
      url={url}
      pageSize={5}
    >
      <h4>等分自动换行布局</h4>
      <Filter >
        <Layout gap={[12,16]} columns={4}>
          <Filter.Item type="input" name="a" title="a"/>
          <Filter.Item span={2} type="input" name="b" title="b"/>
          <Filter.Item type="input" name="c" title="c"/>
          <Filter.Item type="input" name="d" title="d"/>
          <Filter.Item type="input" name="e" title="e" span={3} />
          <Filter.Item type="input" name="f" title="f" span={2}/>
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

### 等分自动换行布局 + inset

```jsx
import React from 'react'
import {
  List, Table, Pagination,
  createListActions, Filter,
  Search, Clear,
  Layout,
  SchemaMarkupField,
  FormBlock,
  FormCard,
  SchemaForm,
} from '@alist/antd'
import'antd/dist/antd.css'

const actions = createListActions()
const App = () => {  
  const url = 'https://mocks.alibaba-inc.com/mock/alist/data'

  return <div>
    <List
      actions={actions}
      url={url}
      pageSize={5}
    >
        <Filter>
          <Layout inset gap={[12, 16]} columns={3}>
            <Filter.Item
              // required
              type="input"
              title="input"
              name="input"
            />
            <Filter.Item
              // type="radio"
              enum={['1', '2', '3', '4']}
              title="Radio"
              name="radio"
            />
            <Filter.Item
              type="select"
              enum={['1', '2', '3', '4']}
              // required
              title="Select"
              name="select"
            />
            <Filter.Item
              type="checkbox"
              enum={['1', '2', '3', '4']}
              // required
              title="Checkbox"
              name="checkbox"
            />
            <Filter.Item
              span={2}
              type="daterange"
              title="日期范围"
              default={['2018-12-19', '2018-12-19']}
              name="daterange"
            />
            <Filter.Item type="number" title="数字选择" name="number" />
            <Filter.Item type="boolean" title="开关选择" name="boolean" />
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
  List, Table, Pagination,
  createListActions, Filter,
  Search, Clear,
  Layout,
  SchemaMarkupField,
  FormBlock,
  FormCard,
  SchemaForm,
} from '@alist/next'
import'@alifd/next/dist/next.css'

const actions = createListActions()
const App = () => {  
  const url = 'https://mocks.alibaba-inc.com/mock/alist/data'

  return <div>
    <List
      actions={actions}
      url={url}
      pageSize={5}
    >
        <Filter>
          <Layout inset gap={[12, 16]} columns={3}>
            <Filter.Item
              // required
              type="input"
              title="input"
              name="input"
            />
            <Filter.Item
              // type="radio"
              enum={['1', '2', '3', '4']}
              title="Radio"
              name="radio"
            />
            <Filter.Item
              type="select"
              enum={['1', '2', '3', '4']}
              // required
              title="Select"
              name="select"
            />
            <Filter.Item
              type="checkbox"
              enum={['1', '2', '3', '4']}
              // required
              title="Checkbox"
              name="checkbox"
            />
            <Filter.Item
              span={2}
              type="daterange"
              title="日期范围"
              default={['2018-12-19', '2018-12-19']}
              name="daterange"
            />
            <Filter.Item type="number" title="数字选择" name="number" />
            <Filter.Item type="boolean" title="开关选择" name="boolean" />
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

### 纵向布局(默认布局)

```jsx
import React from 'react'
import {
  List, Table, Pagination,
  createListActions, Filter,
  Search, Clear,
  Layout,
  SchemaMarkupField,
  FormBlock,
  FormCard,
  SchemaForm,
} from '@alist/antd'
import'antd/dist/antd.css'

const actions = createListActions()
const App = () => {  
  const url = 'https://mocks.alibaba-inc.com/mock/alist/data'

  return <div>
    <List
      actions={actions}
      url={url}
      pageSize={5}
    >      
      <Filter>
        <Filter.Item type="input" name="username" title="username" />
        <Filter.Item type="input" name="age" title="age"/>
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

### 行内布局

```jsx
import React from 'react'
import {
  List, Table, Pagination,
  createListActions, Filter,
  Search, Clear,
  Layout,
  SchemaMarkupField,
  FormBlock,
  FormCard,
  SchemaForm,
} from '@alist/antd'
import'antd/dist/antd.css'

const actions = createListActions()
const App = () => {  
  const url = 'https://mocks.alibaba-inc.com/mock/alist/data'

  return <div>
    <List
      actions={actions}
      url={url}
      pageSize={5}
    >
      <h4>行内布局(inline=true)</h4>
      <Filter inline>
        <Filter.Item type="input" name="username" title="username"/>
        <Filter.Item type="input" name="age" title="age"/>
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
