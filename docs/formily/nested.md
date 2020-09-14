## 多实例展开收起（Ant-Design)

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
  MultipleProvider,
  EmptyStatusType
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
import 'antd/dist/antd.css'

const actions = createFormActions()
const listActions = createListActions()

const Desc = createVirtualBox('desc', props => <h3 {...props} />)

const App = () => {
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
            renderProvider: (val, record) => {
              const obj = {
                children: (
                  <React.Fragment>
                    <div>{val}</div>
                    {record.children && (
                      <ListToggleTrigger
                        id={record.id}
                        expandText="展开所有航空公司"
                        unExpandText="收起所有航空公司"
                      />
                    )}
                  </React.Fragment>
                ),
                props: {}
              }
              if (record.type === 'error') {
                obj.props.colSpan = 0
              }
              return obj
            },
            renderRoute: (val, record) => {
              if (record.type === 'error') {
                return {
                  children: (
                    <div style={{ textAlign: 'center' }}>
                      <ListToggleTrigger
                        id={record.id}
                        expandText="展开所有无报价方案"
                        unExpandText="收起所有无报价方案"
                      />
                    </div>
                  ),
                  props: {
                    colSpan: 3
                  }
                }
              }
              return record.children ? val : ''
            },
            renderPrice: (val, record) => {
              const ele = record.error ? (
                <span style={{ color: 'red' }}>{record.error}</span>
              ) : (
                val
              )
              const obj = {
                children: ele,
                props: {}
              }
              if (record.type === 'error') {
                obj.props.colSpan = 0
              }
              return obj
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

          {/* <Search enableLoading content="搜索" /> */}

          <List url="https://alist-wiki.oss-cn-beijing.aliyuncs.com/multiple.json">
            <ButtonGroup align="center" style={{ marginBottom: '20px' }}>
              <Search content="搜索" />
              <ListExpandTrigger
                expandText="展开搜索字段"
                unExpandText="收起搜索字段"
              />
            </ButtonGroup>

            <MultipleProvider
              hideWhen={[EmptyStatusType.INIT, EmptyStatusType.EMPTY]}
              id="premium"
            >
              <Desc>优选</Desc>
              <Table indentSize={0} rowKey="id" hasTreeCtrl={false} isTree>
                <Table.Column
                  title="路线"
                  dataIndex="route"
                  render="{{renderRoute}}"
                />
                <Table.Column
                  title="航空公司"
                  dataIndex="serviceProvider"
                  render="{{renderProvider}}"
                />
                <Table.Column
                  width="200px"
                  title="价格"
                  dataIndex="price"
                  render="{{renderPrice}}"
                />
              </Table>
            </MultipleProvider>
          </List>
        </SchemaForm>
      </Printer>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

## 多实例展开收起（Fusion-Next)

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
  MultipleProvider
} from '@alist/next-components'
import {
  SchemaForm,
  SchemaMarkupField as Field,
  Submit,
  createFormActions,
  createVirtualBox
} from '@formily/next'
import { Button } from '@alifd/next'
import { FormMegaLayout, Input } from '@formily/next-components'
import Printer from '@formily/printer'
import '@alifd/next/dist/next.css'

const actions = createFormActions()
const listActions = createListActions()
window.listActions = listActions

const SchemaButton = createVirtualBox('xxx', Button)

const Desc = createVirtualBox('desc', props => <h3 {...props} />)

const App = () => {
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
            renderProvider: (val, idx, record) => {
              return (
                <React.Fragment>
                  <div>{val}</div>
                  {record.children && (
                    <ListToggleTrigger
                      id={record.id}
                      expandText="展开所有航空公司"
                      unExpandText="收起所有航空公司"
                    />
                  )}
                </React.Fragment>
              )
            },
            renderRoute: (val, idx, record) => {
              if (record.type === 'error') {
                return (
                  <div style={{ textAlign: 'center' }}>
                    <ListToggleTrigger
                      id={record.id}
                      expandText="展开所有无报价方案"
                      unExpandText="收起所有无报价方案"
                    />
                  </div>
                )
              }
              return record.children ? val : ''
            },
            renderPrice: (val, idx, record) => {
              if (record.error) {
                return <span style={{ color: 'red' }}>{record.error}</span>
              }

              return val
            },
            cellProps: (colIdx, rowIdx, dataIndex, record) => {
              if (record.type === 'error') {
                return {
                  colSpan: 3
                }
              }
            },
            show: () => {
              actions.setFieldState('list', state => (state.visible = true))
              setTimeout(() => {
                listActions.setMultipleData(window.tmp)
                listActions.notify('onListMultipleRefresh')
              })
            },
            hide: () => {
              window.tmp = listActions.getMultipleData()
              actions.setFieldState('list', state => (state.visible = false))
            },
            listActions
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

          {/* <Search enableLoading content="搜索" /> */}
          <SchemaButton onClick="{{hide}}">隐藏</SchemaButton>
          <SchemaButton onClick="{{show}}">恢复</SchemaButton>

          <List
            name="list"
            url="https://alist-wiki.oss-cn-beijing.aliyuncs.com/multiple.json"
            actions="{{listActions}}"
            autoLoad={false}
          >
            <ButtonGroup align="center" style={{ marginBottom: '20px' }}>
              <Search enableLoading content="搜索" />
              <ListExpandTrigger
                expandText="展开搜索字段"
                unExpandText="收起搜索字段"
              />
            </ButtonGroup>

            <Desc>优选</Desc>
            <MultipleProvider id="premium">
              <Table
                hasTreeCtrl={false}
                indent={0}
                isTree
                cellProps="{{cellProps}}"
              >
                <Table.Column
                  title="路线"
                  dataIndex="route"
                  cell="{{renderRoute}}"
                />
                <Table.Column
                  title="航空公司"
                  dataIndex="serviceProvider"
                  cell="{{renderProvider}}"
                />
                <Table.Column
                  width="200px"
                  title="价格"
                  dataIndex="price"
                  cell="{{renderPrice}}"
                />
              </Table>
            </MultipleProvider>
          </List>
        </SchemaForm>
      </Printer>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```
