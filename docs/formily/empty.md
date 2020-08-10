## 未查询，查询为空，查询出错(Ant-Design)

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
  InternalListSpy,
  EmptyStatusType
} from '@alist/antd-components'
import {
  SchemaForm,
  FormButtonGroup,
  SchemaMarkupField as Field,
  Submit,
  createFormActions
} from '@formily/antd'
import { FormMegaLayout, Input } from '@formily/antd-components'
import { Button } from 'antd'
import Printer from '@formily/printer'
import 'antd/dist/antd.css'

const listActions = createListActions()
const actions = createFormActions()

const App = () => {
  const url = 'https://alist-wiki.oss-cn-beijing.aliyuncs.com/emptyData.json'

  return (
    <div>
      <Printer>
        <SchemaForm
          actions={actions}
          components={{ Input }}
          expressionScope={{
            customRender: (
              <InternalListSpy
                selector="*"
                render={list => {
                  const emptyStatus = list.getEmptyStatus()
                  let status
                  switch (emptyStatus) {
                    case EmptyStatusType.INIT:
                      status = '未查询，请点击搜索开始查询'
                      break
                    case EmptyStatusType.ERROR:
                      status = '查询出错'
                      break
                    case EmptyStatusType.EMPTY:
                      status = '无数据'
                      break
                  }

                  return <div>{status}</div>
                }}
              />
            )
          }}
        >
          <Search enableLoading content="搜索" />
          <List url={url} actions={listActions} autoLoad={false}>
            <Table
              primaryKey="value"
              locale={{
                emptyText: '{{customRender}}'
              }}
            >
              <Table.Column title="标题" dataIndex="label" />
              <Table.Column title="value" dataIndex="value" />
            </Table>
            <Pagination />
          </List>
        </SchemaForm>
      </Printer>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

## 未查询，查询为空，查询出错(Fusion-Next)

```jsx
import React, { useEffect, useRef, useContext } from 'react'
import {
  List,
  Table,
  Pagination,
  Search,
  Clear,
  Reset,
  ButtonGroup,
  createListActions,
  ListLifeCycleTypes,
  ListSelection,
  InternalListSpy,
  EmptyStatusType
} from '@alist/next-components'
import {
  SchemaForm,
  FormButtonGroup,
  SchemaMarkupField as Field,
  Submit,
  createFormActions
} from '@formily/next'
import { FormMegaLayout, Input } from '@formily/next-components'
import { Icon, Button } from '@alifd/next'
import Printer from '@formily/printer'
import '@alifd/next/dist/next.css'

const listActions = createListActions()
const actions = createFormActions()

const App = () => {
  const url = 'https://alist-wiki.oss-cn-beijing.aliyuncs.com/emptyData.json'

  return (
    <div>
      <Printer>
        <SchemaForm
          actions={actions}
          components={{ Input }}
          expressionScope={{
            customRender: (
              <InternalListSpy
                selector="*"
                render={list => {
                  const emptyStatus = list.getEmptyStatus()
                  let status
                  switch (emptyStatus) {
                    case EmptyStatusType.INIT:
                      status = '未查询，请点击搜索开始查询'
                      break
                    case EmptyStatusType.ERROR:
                      status = '查询出错'
                      break
                    case EmptyStatusType.EMPTY:
                      status = '无数据'
                      break
                  }

                  return <div>{status}</div>
                }}
              />
            )
          }}
        >
          <Search enableLoading content="搜索" />
          <List url={url} actions={listActions} autoLoad={false}>
            <Table primaryKey="value" emptyContent="{{customRender}}">
              <Table.Column title="标题" dataIndex="label" />
              <Table.Column title="value" dataIndex="value" />
            </Table>
            <Pagination />
          </List>
        </SchemaForm>
      </Printer>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

## 无数据时隐藏 Table

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
  InternalListSpy,
  EmptyStatusType
} from '@alist/antd-components'
import {
  SchemaForm,
  FormButtonGroup,
  SchemaMarkupField as Field,
  Submit,
  createFormActions
} from '@formily/antd'
import { FormMegaLayout, Input } from '@formily/antd-components'
import { Button } from 'antd'
import Printer from '@formily/printer'
import 'antd/dist/antd.css'

const listActions = createListActions()
const actions = createFormActions()

const App = () => {
  const url = 'https://alist-wiki.oss-cn-beijing.aliyuncs.com/data.json'

  return (
    <div>
      <Printer>
        <SchemaForm actions={actions} components={{ Input }}>
          <Search enableLoading content="搜索" />
          <List
            hideWhenInvalid
            url={url}
            actions={listActions}
            autoLoad={false}
          >
            <Table primaryKey="value">
              <Table.Column title="标题" dataIndex="label" />
              <Table.Column title="value" dataIndex="value" />
            </Table>
            <Pagination />
          </List>
        </SchemaForm>
      </Printer>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

## 无数据时隐藏 Table

```jsx
import React, { useEffect, useRef, useContext } from 'react'
import {
  List,
  Table,
  Pagination,
  Search,
  Clear,
  Reset,
  ButtonGroup,
  createListActions,
  ListLifeCycleTypes,
  ListSelection,
  InternalListSpy,
  EmptyStatusType
} from '@alist/next-components'
import {
  SchemaForm,
  FormButtonGroup,
  SchemaMarkupField as Field,
  Submit,
  createFormActions
} from '@formily/next'
import { FormMegaLayout, Input } from '@formily/next-components'
import { Icon, Button } from '@alifd/next'
import Printer from '@formily/printer'
import '@alifd/next/dist/next.css'

const listActions = createListActions()
const actions = createFormActions()

const App = () => {
  const url = 'https://alist-wiki.oss-cn-beijing.aliyuncs.com/data.json'

  return (
    <div>
      <Printer>
        <SchemaForm actions={actions} components={{ Input }}>
          <Search enableLoading content="搜索" />
          <List
            hideWhenInvalid
            url={url}
            actions={listActions}
            autoLoad={false}
          >
            <Table primaryKey="value">
              <Table.Column title="标题" dataIndex="label" />
              <Table.Column title="value" dataIndex="value" />
            </Table>
            <Pagination />
          </List>
        </SchemaForm>
      </Printer>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```
