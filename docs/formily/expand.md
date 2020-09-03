## 展开收起搜索及 Table 区域（Antd-Design）

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
  InternalListSpy,
  SchemaListToggleTrigger
} from '@alist/antd-components'
import {
  SchemaForm,
  SchemaMarkupField as Field,
  Submit,
  createFormActions,
  createVirtualBox
} from '@formily/antd'
import { FormMegaLayout, Input } from '@formily/antd-components'
import Printer from '@formily/printer'
import { Button } from 'antd'
import 'antd/dist/antd.css'

const listActions = createListActions()
const actions = createFormActions()

const App = () => {
  const url = 'https://alist-wiki.oss-cn-beijing.aliyuncs.com/data.json'

  return (
    <div>
      <Printer>
        <SchemaForm
          actions={actions}
          components={{ Input }}
          initialValues={{
            f1: 'default value1',
            f2: 'default value2'
          }}
          expressionScope={{
            renderToggle: (val, record) => (
              <ListToggleTrigger
                id={record.value}
                expandText="展开"
                unExpandText="收起"
              />
            ),
            expandedRender: record => record.label + '-' + record.value,
            onRowOpen: (
              openRowKeys,
              currentRowKey,
              expanded,
              currentRecord
            ) => {
              console.log(openRowKeys, currentRowKey, expanded, currentRecord)
            }
          }}
        >
          <FormMegaLayout grid autoRow full labelAlign="top">
            <Field name="f1" title="f1" x-component="Input" />
            <Field name="f2" title="f2" x-component="Input" />
            <Field name="f3" title="f3" x-component="Input" />
            <Field name="f4" title="f4" x-component="Input" />
            <ListExpandContainer expandStatus="expand">
              <Field name="f5" title="f5" x-component="Input" />
              <Field name="f6" title="f6" x-component="Input" />
            </ListExpandContainer>
          </FormMegaLayout>

          <ListExpandTrigger
            expandText="展开搜索字段"
            unExpandText="收起搜索字段"
          />

          <List
            url={url}
            // dataSource={[
            //   { id: '1', label: 'label-a', value: '0' },
            //   { id: '2', label: 'label-b', value: '1' }
            // ]}
            actions={listActions}
          >
            <ButtonGroup align="center" style={{ marginBottom: '20px' }}>
              <Search content="搜索" />
              <SchemaListToggleTrigger
                expandText="展开全部"
                unExpandText="收起全部"
              />
              {/* <ListExpandTrigger expandText="展开搜索字段" unExpandText="收起搜索字段" />                     */}
            </ButtonGroup>

            <Table
              defaultOpenAll
              expandedRowRender="{{expandedRender}}"
              rowKey="value"
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
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

## 展开收起搜索及 Table 区域（Fusion-Next)

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
  InternalListSpy,
  SchemaListToggleTrigger
} from '@alist/next-components'
import {
  SchemaForm,
  SchemaMarkupField as Field,
  Submit,
  createFormActions,
  createVirtualBox
} from '@formily/next'
import { FormMegaLayout, Input } from '@formily/next-components'
import Printer from '@formily/printer'
import { Button } from '@alifd/next'
import '@alifd/next/dist/next.css'

const listActions = createListActions()
const actions = createFormActions()
const App = () => {
  const url = 'https://alist-wiki.oss-cn-beijing.aliyuncs.com/data.json'
  return (
    <div>
      <Printer>
        <SchemaForm
          actions={actions}
          components={{ Input }}
          initialValues={{
            f1: 'default value1',
            f2: 'default value2'
          }}
          expressionScope={{
            renderToggle: (val, idx, record) => (
              <ListToggleTrigger
                id={record.value}
                expandText="展开"
                unExpandText="收起"
              />
            ),
            // handleDefaultOpen: (dataSource) => {

            // },
            expandedRender: record => record.label + '-' + record.value,
            onRowOpen: (
              openRowKeys,
              currentRowKey,
              expanded,
              currentRecord
            ) => {
              console.log(openRowKeys, currentRowKey, expanded, currentRecord)
            }
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
            url={url}
            // dataSource={[
            //   { id: '1', label: 'label-a', value: 'a' },
            //   { id: '2', label: 'label-b', value: 'b' }
            // ]}
            actions={listActions}
          >
            <ButtonGroup align="center" style={{ marginBottom: '20px' }}>
              <Search content="搜索" />
              <ListExpandTrigger
                expandText="展开搜索字段"
                unExpandText="收起搜索字段"
              />

              <SchemaListToggleTrigger
                expandText="展开全部"
                unExpandText="收起全部"
              />
            </ButtonGroup>

            <Table
              primaryKey="value"
              // defaultOpenAll
              // hasExpandedRowCtrl={false}
              expandedRowRender="{{expandedRender}}"
              expandedRowIndent={[0, 0]}
              onRowOpen="{{onRowOpen}}"
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
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```
