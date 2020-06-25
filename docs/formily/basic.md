## 安装

根据您正在使用的UI库做选择，目前支持 `Fusion-Next` 及 
`Ant-Design`。

#### Ant-Design

```shell
$ npm install @alist/antd-components
```

#### Fusion-Next

```shell
$ npm install @alist/next-components
```

## 引入及使用 (Ant-Design)

> 查看源码可以点击右下角到 `codesandbox查看` 或者 `本地查看`。

```jsx
import React, { useRef, useContext } from 'react'
import {
  List,
  Table,
  Pagination,
  Search,
  Clear,
  Reset,
  Consumer,
  ButtonGroup,
  createListActions,  
  ListLifeCycleTypes,
} from '@alist/antd-components'
import {
    SchemaForm,
    SchemaMarkupField as Field,
    Submit,
    createFormActions,
} from '@formily/antd'
import { FormMegaLayout, Input } from '@formily/antd-components'
import { HomeOutlined } from '@ant-design/icons';
import Printer from '@formily/printer'
import 'antd/dist/antd.css'

const listActions = createListActions()
const actions = createFormActions()
const App = () => {  
  const url = 'https://mocks.alibaba-inc.com/mock/alist/data'

  return <div>
    <h5>打开控制台查看Network发起的请求</h5>
    <Printer>
        <SchemaForm
            actions={actions}
            components={{ Input }}
            expressionScope={{
                renderLabel: (val, idx, record) => <div>---{val}</div>,
                renderLabelTitle: (title) => <div><HomeOutlined  />{title}</div>
            }}
            initialValues={{
                f1: 'default value1',
                f2: 'default value2'
            }}
        >
            <FormMegaLayout grid autoRow full labelAlign="top">
                <Field name="f1" title="f1" x-component="Input" />
                <Field name="f2" title="f2" x-component="Input" />
                <Field name="f3" title="f3" x-component="Input" />
                <Field name="f4" title="f4" x-component="Input" />
                <Field name="f5" title="f5" x-component="Input" />
                <Field name="f6" title="f6" x-component="Input" />
            </FormMegaLayout>
            
            <List url={url} actions={listActions}>
                <ButtonGroup align="center" style={{ marginBottom: '20px' }}>
                    <Search content="搜索"/>
                    <Reset content="重置"/>
                    <Clear content="清空"/>
                </ButtonGroup>
                <Table>
                    <Table.Column title="{{renderLabelTitle('标题')}}" dataIndex="label" cell="{{renderLabel}}" />
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




## 引入及使用 (Fusion-Next)

> 查看源码可以点击右下角到 `codesandbox查看` 或者 `本地查看`。

```jsx
import React, { useRef, useContext } from 'react'
import {
  List,
  Table,
  Pagination,
  Search,
  Clear,
  Reset,
  Consumer,
  ButtonGroup,
  createListActions,  
  ListLifeCycleTypes,
} from '@alist/next-components'
import {
    SchemaForm,
    SchemaMarkupField as Field,
    Submit,
    createFormActions,
} from '@formily/next'
import { FormMegaLayout, Input } from '@formily/next-components'
import { Icon } from '@alifd/next'
import Printer from '@formily/printer'
import '@alifd/next/dist/next.css'

const listActions = createListActions()
const actions = createFormActions()
const App = () => {  
  const url = 'https://mocks.alibaba-inc.com/mock/alist/data'

  return <div>
    <h5>打开控制台查看Network发起的请求</h5>
    <Printer>
        <SchemaForm
            actions={actions}
            components={{ Input }}
            expressionScope={{
                renderLabel: (val, idx, record) => <div>---{val}</div>,
                renderLabelTitle: (title) => <div><Icon type="favorites-filling" size="xs" />{title}</div>
            }}
            initialValues={{
                f1: 'default value1',
                f2: 'default value2'
            }}
        >
            <FormMegaLayout grid autoRow full labelAlign="top">
                <Field name="f1" title="f1" x-component="Input" />
                <Field name="f2" title="f2" x-component="Input" />
                <Field name="f3" title="f3" x-component="Input" />
                <Field name="f4" title="f4" x-component="Input" />
                <Field name="f5" title="f5" x-component="Input" />
                <Field name="f6" title="f6" x-component="Input" />
            </FormMegaLayout>
            
            <List url={url} actions={listActions}>
                <ButtonGroup align="center" style={{ marginBottom: '20px' }}>
                    <Search content="搜索"/>
                    <Reset content="重置"/>
                    <Clear content="清空"/>
                </ButtonGroup>
                <Table>
                    <Table.Column title="{{renderLabelTitle('标题')}}" dataIndex="label" cell="{{renderLabel}}" />
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


