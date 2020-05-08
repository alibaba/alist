# 定制搜索条件

非常常见的场景，定制搜索条件显示或隐藏（不影响值，仅影响显示）

```jsx
import React, { useState, useEffect } from 'react'
import {
  List, Table, Pagination, Filter,
  Layout, Search, Clear, Reset,
  createListActions, ConnectProvider,
  FormSpy,
  FormEffectHooks,
} from '@alist/antd'
import { Select, Drawer, Button, Transfer } from 'antd'
import'antd/dist/antd.css'

const { onFieldChange$ } = FormEffectHooks

const fieldList = [];
for (let i = 0; i < 10; i++) {
    fieldList.push({
        label: `field${i}`,
        value: `${i}`,
        key: `${i}`
    });
}

const actions = createListActions()
const App = () => {  
  const url = 'https://mocks.alibaba-inc.com/mock/alist/data'
  const [visible, setVisible] = useState(false)
  const [displayFields, setDisplayFields] = useState(['1', '2', '3', '4'])

  return <div>
    <Transfer dataSource={fieldList} targetKeys={displayFields} onChange={setDisplayFields} render={item => item.label}/>
    <List actions={actions} url={url} defaultFilterValues={{ username: 'hello' }}>
      <Filter>
        <Layout gap={[12,16]} columns={3}>
          {fieldList.map(field => {
            return <Filter.Item
              type="input"
              name={field.value}
              title={field.label}
              display={displayFields.indexOf(field.value) !== -1}
            />
          })}
        </Layout>
        <Layout.ButtonGroup>
          <Search>搜索</Search>
          <Clear>清空</Clear>
        </Layout.ButtonGroup>        
      </Filter>      
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


# 镜像搜索区域

常用于全量搜索场景

```jsx
import React, { useState, useEffect, useRef } from 'react'
import {
  List, Table, Pagination, Filter,
  Layout, Search, Clear, Reset,
  createListActions, ConnectProvider,
  FormSpy,
  FormEffectHooks,
} from '@alist/antd'
import { Select, Drawer, Button, Transfer } from 'antd'
import'antd/dist/antd.css'

const { onFieldChange$ } = FormEffectHooks

const fieldList = [];
for (let i = 0; i < 10; i++) {
    fieldList.push({
        label: `field${i}`,
        value: `${i}`,
        key: `${i}`
    });
}

const actions = createListActions()
const App = () => {  
  const url = 'https://mocks.alibaba-inc.com/mock/alist/data'
  const latestFields = useRef([])
  const [visible, setVisible] = useState(false)
  const [displayFields, setDisplayFields] = useState(['0', '1', '2', '3', '4'])

  return <div>
    <Transfer dataSource={fieldList} targetKeys={displayFields} onChange={setDisplayFields} render={item => item.label}/>
    <List actions={actions} url={url} defaultFilterValues={{ username: 'hello' }}>
      <Filter>
        <Layout gap={[12,16]} columns={3}>
          {fieldList.map(field => {
            return <Filter.Item
              type="input"
              name={field.value}
              title={field.label}
              display={displayFields.indexOf(field.value) !== -1}
            />
          })}
        </Layout>
        <Layout.ButtonGroup>
          <Search>搜索</Search>
          <Clear>清空</Clear>
          <Button onClick={() => {
            setVisible(true)
            latestFields.current = displayFields
            setDisplayFields(fieldList.map(item => item.value))
          }}>全量搜索</Button>
          <Drawer width={720} title="搜索区域镜像" visible={visible} onClose={() => {
            setVisible(false)
            setDisplayFields(latestFields.current)
          }}>
            <FormSpy>
                {({ form }) => {
                    return <Filter form={form}>
                        <Layout gap={[12,16]} columns={3}>
                            {fieldList.map(field => {
                              return <Filter.Item
                                type="input"
                                name={field.value}
                                title={field.label}
                              />
                            })}
                        </Layout>
                        <Layout.ButtonGroup>
                            <Search>搜索</Search>
                            <Clear>清空</Clear>
                            <Reset>重置</Reset>
                        </Layout.ButtonGroup>
                    </Filter>
                }}
            </FormSpy>            
        </Drawer>
        </Layout.ButtonGroup>        
      </Filter>      
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
