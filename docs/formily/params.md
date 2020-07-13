## 快速开启筛选状态及消费筛选状态(Ant-Design)

```jsx
import React, { useEffect, useRef, useContext } from 'react'
import {
  List,
  Table,
  Pagination,
  Search,
  Clear,
  Reset,
  ListSpy,
  ButtonGroup,
  createListActions,
  ListLifeCycleTypes,
  ListSelection,
} from '@alist/antd-components'
import {
    SchemaForm,
    SchemaMarkupField as Field,
    createFormActions,
} from '@formily/antd'
import { FormMegaLayout, Input } from '@formily/antd-components'
import Printer from '@formily/printer'
import 'antd/dist/antd.css'

const listActions = createListActions()
const actions = createFormActions()

const App = () => {  
  const url = 'https://alist-wiki.oss-cn-beijing.aliyuncs.com/data.json'

  return <div>
    <Printer>
        <SchemaForm
            actions={actions}
            components={{ Input }}
            expressionScope={{
                customRender: (list) => {
                    const p = new URLSearchParams(location.search)
                    p.delete('path')
                    return <div>url params: {p.toString()}</div>
                }
            }}
        >
            <List
                url={url}
                actions={listActions}
                paramsFields={['username']}
                params={{
                    username: '123'
                }}
            >
                <FormMegaLayout grid autoRow full labelAlign="top">
                    <Field name="username" title="username" x-component="Input" />
                    <Field name="age" title="age" x-component="Input" />
                </FormMegaLayout>

                <ListSpy selector="*" render="{{customRender}}" />
                <Table primaryKey="value">
                    <Table.Column title="标题" dataIndex="label"/>
                    <Table.Column title="value" dataIndex="value" />
                </Table>
                <Pagination />
            </List>
        </SchemaForm>
    </Printer>
  </div>
}

ReactDOM.render(<App />, document.getElementById('root'))
```


## 快速开启筛选状态及消费筛选状态(Fusion-Next)

```jsx
import React, { useEffect, useRef, useContext } from 'react'
import {
  List,
  Table,
  Pagination,
  Search,
  Clear,
  Reset,
  ListSpy,
  ButtonGroup,
  createListActions,
  ListLifeCycleTypes,
  ListSelection,
} from '@alist/next-components'
import {
    SchemaForm,
    SchemaMarkupField as Field,
    createFormActions,
} from '@formily/next'
import { FormMegaLayout, Input } from '@formily/next-components'
import { Icon, Button } from '@alifd/next'
import Printer from '@formily/printer'
import '@alifd/next/dist/next.css'

const listActions = createListActions()
const actions = createFormActions()

const App = () => {  
  const url = 'https://alist-wiki.oss-cn-beijing.aliyuncs.com/data.json'

  return <div>
    <Printer>
        <SchemaForm
            actions={actions}
            components={{ Input }}
            expressionScope={{
                customRender: (list) => {
                    const p = new URLSearchParams(location.search)
                    p.delete('path')
                    return <div>url params: {p.toString()}</div>
                }
            }}
        >
            <List
                url={url}
                actions={listActions}
                paramsFields={['username']}
                params={{
                    username: '123'
                }}
            >
                <FormMegaLayout grid autoRow full labelAlign="top">
                    <Field name="username" title="username" x-component="Input" />
                    <Field name="age" title="age" x-component="Input" />
                </FormMegaLayout>

                <ListSpy selector="*" render="{{customRender}}" />
                <Table primaryKey="value">
                    <Table.Column title="标题" dataIndex="label"/>
                    <Table.Column title="value" dataIndex="value" />
                </Table>
                <Pagination />
            </List>
        </SchemaForm>
    </Printer>
  </div>
}

ReactDOM.render(<App />, document.getElementById('root'))
```


