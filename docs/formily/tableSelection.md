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
  Consumer,
  ButtonGroup,
  createListActions,
  ListLifeCycleTypes,
  ListSelection
} from '@alist/antd-components'
import {
  SchemaForm,
  FormButtonGroup,
  SchemaMarkupField as Field,
  createControllerBox,
  createVirtualBox,
  Submit,
  createFormActions,
  complieExpression,
  FormExpressionScopeContext,
  FormSlot
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
      <h5>打开控制台查看Network发起的请求</h5>
      <Printer>
        <SchemaForm
          actions={actions}
          components={{ Input }}
          expressionScope={{
            selectionRender: (opts, { actions: listActions }) => {
              const { allIds, ids, selectedAll, selectedNone, dataSource } =
                opts || {}
              return (
                <div>
                  已选中 {(ids || []).length} 条结果
                  <Button
                    onClick={() => {
                      listActions.setRowSelection({ ids: allIds })
                    }}
                  >
                    全选
                  </Button>
                  <Button
                    onClick={() => {
                      listActions.setRowSelection({ ids: [] })
                    }}
                  >
                    全不选
                  </Button>
                  <Button
                    onClick={() => {
                      listActions.disableRowSelection()
                    }}
                  >
                    关闭筛选
                  </Button>
                  <Button
                    onClick={() => {
                      listActions.setRowSelection()
                    }}
                  >
                    启用筛选
                  </Button>
                  <Button
                    onClick={() => {
                      const selections = listActions.getRowSelection()
                      console.log('当前筛选项', selections)
                    }}
                  >
                    获取当前筛选
                  </Button>
                </div>
              )
            },
            listEffects: ($, listActions) => {
              $(ListLifeCycleTypes.ON_LIST_MOUNTED).subscribe(payload => {
                listActions.setRowSelection() // 启用筛选模式
              })
              $(ListLifeCycleTypes.ON_LIST_SELECTION_REFRESH).subscribe(
                payload => {
                  console.log('ON_LIST_SELECTION_REFRESH', payload)
                }
              )
              $(ListLifeCycleTypes.ON_LIST_SELECT).subscribe(payload => {
                console.log('ON_LIST_SELECT', payload)
              })
              $(ListLifeCycleTypes.ON_LIST_SELECT_CHANGE).subscribe(payload => {
                console.log('ON_LIST_SELECT_CHANGE', payload)
              })
            }
          }}
        >
          <List url={url} actions={listActions} effects="{{listEffects}}">
            <ListSelection render="{{selectionRender}}" />
            <Table rowKey="value">
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
  Consumer,
  ButtonGroup,
  createListActions,
  ListLifeCycleTypes,
  ListSelection
} from '@alist/next-components'
import {
  SchemaForm,
  FormButtonGroup,
  SchemaMarkupField as Field,
  createControllerBox,
  createVirtualBox,
  Submit,
  createFormActions,
  complieExpression,
  FormExpressionScopeContext,
  FormSlot
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
      <h5>打开控制台查看Network发起的请求</h5>
      <Printer>
        <SchemaForm
          actions={actions}
          components={{ Input }}
          expressionScope={{
            selectionRender: (opts, { actions: listActions }) => {
              const { allIds, ids, selectedAll, selectedNone, dataSource } =
                opts || {}
              return (
                <div>
                  已选中 {(ids || []).length} 条结果
                  <Button
                    onClick={() => {
                      listActions.setRowSelection({ ids: allIds })
                    }}
                  >
                    全选
                  </Button>
                  <Button
                    onClick={() => {
                      listActions.setRowSelection({ ids: [] })
                    }}
                  >
                    全不选
                  </Button>
                  <Button
                    onClick={() => {
                      listActions.disableRowSelection()
                    }}
                  >
                    关闭筛选
                  </Button>
                  <Button
                    onClick={() => {
                      listActions.setRowSelection()
                    }}
                  >
                    启用筛选
                  </Button>
                  <Button
                    onClick={() => {
                      const selections = listActions.getRowSelection()
                      console.log('当前筛选项', selections)
                    }}
                  >
                    获取当前筛选
                  </Button>
                </div>
              )
            },
            listEffects: ($, listActions) => {
              $(ListLifeCycleTypes.ON_LIST_MOUNTED).subscribe(payload => {
                listActions.setRowSelection({
                  getProps: (record, idx) => {
                    return {
                      disabled: idx % 2 === 0
                    }
                  }
                }) // 启用筛选模式
              })
              $(ListLifeCycleTypes.ON_LIST_SELECTION_REFRESH).subscribe(
                payload => {
                  console.log('ON_LIST_SELECTION_REFRESH', payload)
                }
              )
              $(ListLifeCycleTypes.ON_LIST_SELECT).subscribe(payload => {
                console.log('ON_LIST_SELECT', payload)
              })
              $(ListLifeCycleTypes.ON_LIST_SELECT_CHANGE).subscribe(payload => {
                console.log('ON_LIST_SELECT_CHANGE', payload)
              })
            }
          }}
        >
          <List url={url} actions={listActions} effects="{{listEffects}}">
            <ListSelection render="{{selectionRender}}" />
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
