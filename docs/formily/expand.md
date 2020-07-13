## 展开收起搜索及Table区域（Antd-Design）

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
  ListExpandContainer,
  ListExpandTrigger,
  ListToggleTrigger,
  InternalExpandTrigger,
} from '@alist/antd-components'
import {
    SchemaForm,
    SchemaMarkupField as Field,
    Submit,
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
            initialValues={{
                f1: 'default value1',
                f2: 'default value2'
            }}
            expressionScope={{
                renderToggle: (val, record) => (<ListToggleTrigger
                    id={record.id}
                    expandText="展开"
                    unExpandText="收起"
                />),
                expandedRender: (record) => (record.label + '-' + record.value)
            }}
        >
            <FormMegaLayout grid autoRow full labelAlign="top">
                <Field name="f1" title="f1" x-component="Input" />
                <Field name="f2" title="f2" x-component="Input" />
                <Field name="f3" title="f3" x-component="Input" />
                <Field name="f4" title="f4" x-component="Input" />
                <ListExpandContainer>
                    <Field name="f5" title="f5" x-component="Input" />
                    <Field name="f6" title="f6" x-component="Input" />
                </ListExpandContainer>
            </FormMegaLayout>
            
            <List 
                dataSource={[
                    { id: '1', label: 'label-a', value: 'a' },
                    { id: '2', label: 'label-b', value: 'b' }
                ]}
                actions={listActions}
            >
                <ButtonGroup align="center" style={{ marginBottom: '20px' }}>
                    <Search content="搜索"/>
                    <ListExpandTrigger expandText="展开搜索字段" unExpandText="收起搜索字段" />                    
                </ButtonGroup>

                <Table
                    expandedRowRender="{{expandedRender}}"
                    rowKey="id"
                >
                    <Table.Column title="label" dataIndex="label" />
                    <Table.Column title="value" dataIndex="value" />
                    <Table.Column title="操作" render="{{renderToggle}}" />
                </Table>
                <Pagination />
            </List>            
        </SchemaForm>
    </Printer>
  </div>
}

ReactDOM.render(<App />, document.getElementById('root'))
```

## 展开收起搜索及Table区域（Fusion-Next)

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
  ListExpandContainer,
  ListExpandTrigger,
  ListToggleTrigger,
  InternalExpandTrigger,
} from '@alist/next-components'
import {
    SchemaForm,
    SchemaMarkupField as Field,
    Submit,
    createFormActions,
} from '@formily/next'
import { FormMegaLayout, Input } from '@formily/next-components'
import Printer from '@formily/printer'
import '@alifd/next/dist/next.css'

const listActions = createListActions()
const actions = createFormActions()
const App = () => {  
  return <div>
    <Printer>
        <SchemaForm
            actions={actions}
            components={{ Input }}
            initialValues={{
                f1: 'default value1',
                f2: 'default value2'
            }}
            expressionScope={{
                renderToggle: (val, idx, record) => (<ListToggleTrigger
                    id={record.id}
                    expandText="展开"
                    unExpandText="收起"
                />),
                expandedRender: (record) => (record.label + '-' + record.value)
            }}
        >
            <FormMegaLayout grid autoRow full labelAlign="top">
                <Field name="f1" title="f1" x-component="Input" />
                <Field name="f2" title="f2" x-component="Input" />
                <Field name="f3" title="f3" x-component="Input" />
                <Field name="f4" title="f4" x-component="Input" />
                <ListExpandContainer>
                    <Field name="f5" title="f5" x-component="Input" />
                    <Field name="f6" title="f6" x-component="Input" />
                </ListExpandContainer>
            </FormMegaLayout>
            
            <List 
                dataSource={[
                    { id: '1', label: 'label-a', value: 'a' },
                    { id: '2', label: 'label-b', value: 'b' }
                ]}
                actions={listActions}
            >
                <ButtonGroup align="center" style={{ marginBottom: '20px' }}>
                    <Search content="搜索"/>
                    <ListExpandTrigger expandText="展开搜索字段" unExpandText="收起搜索字段" />                    
                </ButtonGroup>

                <Table
                    hasExpandedRowCtrl={false}
                    expandedRowRender="{{expandedRender}}"
                    expandedRowIndent={[0,0]}
                >
                    <Table.Column title="label" dataIndex="label" />
                    <Table.Column title="value" dataIndex="value" />
                    <Table.Column title="操作" cell="{{renderToggle}}" />
                </Table>
                <Pagination />
            </List>            
        </SchemaForm>
    </Printer>
  </div>
}

ReactDOM.render(<App />, document.getElementById('root'))
```
