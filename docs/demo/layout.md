# 搜索区域布局

## 布局分类

`AList` 会有以下布局类型

* **推荐** 等分自动换行布局
* **推荐** 等分自动换行布局 + inset
* 纵向布局（默认布局）
* 行内布局，设置 `inline=true`

> AList， Formily布局均基于 MegaLayout
> 由于列表场景比较固定，可以理解 Layout 为 默认启用了 栅格模式(grid=true)及自动换行(autoRow=true)的MegaLayout

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
  const url = 'https://alist-wiki.oss-cn-beijing.aliyuncs.com/data.json'

  return <div>
    <List
      actions={actions}
      url={url}
      pageSize={5}
    >
      <h4>等分自动换行布局</h4>
      <Filter >
        <Layout columns={4}>
          <Filter.Item type="input" name="a" title="a"/>
          <Filter.Item type="input" name="b" title="b" x-mega-props={{ span: 2 }}/>
          <Filter.Item type="input" name="c" title="c"/>
          <Filter.Item type="input" name="d" title="d"/>
          <Filter.Item type="input" name="e" title="e" x-mega-props={{ span: 3 }} />
          <Filter.Item type="input" name="f" title="f" x-mega-props={{ span: 2 }}/>
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
  const url = 'https://alist-wiki.oss-cn-beijing.aliyuncs.com/data.json'

  return <div>
    <List
      actions={actions}
      url={url}
      pageSize={5}      
    >
        <Filter>
          <Layout inset columns={3}>
            <Filter.Item
              // required
              type="input"
              title="input"
              name="input"
            />
            <Filter.Item
              type="radio"
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
              x-mega-props={{ span: 2 }}
              type="daterange"
              title="日期范围"
              default={['2018-12-19', '2018-12-19']}
              name="daterange"
            />
            <Filter.Item type="number" title="数字选择" name="number" />
            <Filter.Item type="boolean" title="开关选择" name="boolean" x-mega-props={{ full: false }} />
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

### 按钮在同一行

```jsx
import React from 'react'
import {
  List, Table, Pagination,
  createListActions, Filter,
  Search, Clear,
  Layout, FormSlot,
  SchemaMarkupField,
  FormBlock,
  FormCard,
  SchemaForm,
} from '@alist/antd'
import'antd/dist/antd.css'

const actions = createListActions()
const App = () => {  
  const url = 'https://alist-wiki.oss-cn-beijing.aliyuncs.com/data.json'

  return <div>
    <List
      actions={actions}
      url={url}
      pageSize={5}
    >
        <Filter>
          <Layout inset columns={3}>            
            <Filter.Item type="number" title="数字选择" name="number" />
            <Filter.Item type="boolean" title="开关选择" name="boolean" x-mega-props={{ full: false }} />
            <Filter.Item type="date" title="日期选择" name="date" />            
            <Filter.Item type="year" title="年份" name="year" />
            <Filter.Item type="time" title="时间" name="time" />
            <FormSlot>
              <Layout.ButtonGroup style={{ flex: 1, margin: '8px 16px' }} align="right">
                  <Search>搜索</Search>
                  <Clear>重置</Clear>
              </Layout.ButtonGroup>
            </FormSlot>          
          </Layout>          
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
import { DatePicker } from '@formily/next-components'
import'@alifd/next/dist/next.css'

const DateRangePicker = DatePicker.RangePicker
const actions = createListActions()
const App = () => {  
  const url = 'https://alist-wiki.oss-cn-beijing.aliyuncs.com/data.json'

  return <div>
    <List
      actions={actions}
      url={url}
      pageSize={5}      
    >
        <Filter components={{ DateRangePicker }}>
          <Layout inset columns={3} full>
            <Filter.Item
              required
              // asterisk
              // x-props={{ asterisk: true }}
              type="input"
              title="input"
              name="input"
            />
            <Filter.Item
              type="radio"
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
              x-mega-props={{ span: 2 }}
              type="daterange"
              title="日期范围"
              default={['2018-12-19', '2018-12-19']}
              name="daterange"
            />
            <Filter.Item type="number" title="数字选择" name="number"/>
            <Filter.Item type="boolean" title="开关选择" name="boolean" x-mega-props={{ full: false }} />
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
  const url = 'https://alist-wiki.oss-cn-beijing.aliyuncs.com/data.json'

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
  const url = 'https://alist-wiki.oss-cn-beijing.aliyuncs.com/data.json'

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


```jsx
import React, { useEffect, useState } from 'react'
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
import { Tabs, Button } from 'antd'
import'antd/dist/antd.css'

const { TabPane } = Tabs;

const actions1 = createListActions()
const actions2 = createListActions()
const App = () => {  
  const url = 'https://alist-wiki.oss-cn-beijing.aliyuncs.com/data.json'
  const [visible, setVisible] = useState(true)

  const btn = <Button onClick={() => {
      setVisible(!visible)
    }}>show/hide</Button>
  if (!visible) {
    return btn
  }

  return <div>
    {btn}
    <Tabs defaultActiveKey="1">
      <TabPane tab="Tab 1" key="1" forceRender>
        <List
          actions={actions1}
          url={url}
          pageSize={5}
        >
          <h4>#1</h4>
          <Filter inline>
            <Filter.Item type="input" name="username" title="username"/>
            <Filter.Item type="input" name="age" title="age"/>
            <Layout.ButtonGroup>
              <Search>搜索</Search>
              <Clear>重置</Clear>
            </Layout.ButtonGroup>
          </Filter>
          <Table>
            <Table.Column sortable title="label" dataIndex="label" sorter/>
            <Table.Column title="value" dataIndex="value"/>
          </Table>
          <Pagination />
        </List>
      </TabPane>
      <TabPane tab="Tab 2" key="2" forceRender>
        <List
          actions={actions2}
          url={url}
          pageSize={5}
        >
          <h4>#2</h4>
          <Filter inline>
            <Filter.Item type="input" name="username" title="username"/>
            <Filter.Item type="input" name="age" title="age"/>
            <Layout.ButtonGroup>
              <Search>搜索</Search>
              <Clear>重置</Clear>
            </Layout.ButtonGroup>
          </Filter>
          <Table>
            <Table.Column title="label" dataIndex="label" sorter/>
            <Table.Column title="value" dataIndex="value"/>
          </Table>
          <Pagination />
        </List>
      </TabPane>
    </Tabs>
  </div>
}

ReactDOM.render(<App />, document.getElementById('root'))
```