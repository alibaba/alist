## 列表 + 弹窗 常见场景

> 查看源码可以点击右下角到 `codesandbox查看` 或者 `本地查看`。

```jsx
import React, { useRef, useContext, useEffect } from 'react'
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
  ListLifeCycleTypes
} from '@alist/next-components'
import {
  SchemaForm,
  SchemaMarkupField as Field,
  SchemaField,
  Submit,
  createFormActions,
  createVirtualBox,
  createControllerBox,
  FormButtonGroup,
  Schema
} from '@formily/next'
import { ArrayTable, FormMegaLayout, Input } from '@formily/next-components'
import { Dialog, Message, Icon, Button } from '@alifd/next'
import Printer from '@formily/printer'
import '@alifd/next/dist/next.css'

const SchemaDialog = createControllerBox('Dialog', props => {
  const { schema, form } = props
  const componentProps = schema.getExtendsComponentProps()
  const { properties } = schema.toJSON()
  const nestedSchema = new Schema({
    type: 'object',
    properties
  })

  useEffect(() => {
    form.ignoreValidationKeys = [
      ...(form.ignoreValidationKeys || []),
      ...nestedSchema.getOrderProperties().map(item => `${item.key}~`)
    ]
  }, [])

  const { visible, title, onCancel, footer, ...others } = componentProps
  return (
    <Dialog
      visible={visible}
      title={title}
      onCancel={() => onCancel()}
      onClose={() => onCancel()}
      footer={() => null}
    >
      <SchemaForm {...others}>
        <SchemaField schema={nestedSchema} />
      </SchemaForm>
    </Dialog>
  )
})
const SchemaButton = createVirtualBox('schema-btn', Button)
const SchemaFormButtonGroup = createVirtualBox(
  'schema-button-group',
  FormButtonGroup
)
const SchemaSubmit = createVirtualBox('submit', Submit)

const listActions = createListActions()
const actions = createFormActions()
const actions2 = createFormActions()

window.listActions = listActions
window.actions = actions
window.actions2 = actions2

const toggleDialogShow = values => {
  const targetValues = values && 'target' in values ? {} : values
  actions.setFieldState('dialog', state => {
    state.props['x-component-props'].visible = !state.props['x-component-props']
      .visible
    state.props['x-component-props'].value = targetValues
  })
}

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
const components = { Input, ArrayTable }

const App = () => {
  const url = 'https://alist-wiki.oss-cn-beijing.aliyuncs.com/data.json'

  return (
    <div>
      <h5>打开控制台查看Network发起的请求</h5>
      <Printer>
        <SchemaForm
          actions={actions}
          components={components}
          expressionScope={{
            components,
            actions2,
            renderLabel: (val, idx, record) => <div>---{val}</div>,
            renderLabelTitle: title => (
              <div>
                <Icon type="favorites-filling" size="xs" />
                {title}
              </div>
            ),
            setDataSource: () => {
              listActions.setDataSource([
                { label: 'hello', value: 'world' },
                { label: 'alist', value: 'table' }
              ])
            },
            toggleDialogShow,
            renderOperation: (val, idx, record) => {
              return (
                <Button
                  onClick={() => {
                    toggleDialogShow(record)
                  }}
                >
                  编辑
                </Button>
              )
            },
            onDialogSubmit: async values => {
              console.log('====弹窗表单 values===', values)
              await sleep(500)
              Message.success('弹窗提交成功')
              toggleDialogShow()
            }
          }}
          initialValues={{
            f1: 'default value1',
            f2: 'default value2'
          }}
        >
          <FormMegaLayout grid autoRow full labelAlign="top">
            <Field name="f1" title="f1" x-component="Input" required />
            <Field name="f2" title="f2" x-component="Input" />
            <Field name="f3" title="f3" x-component="Input" />
            <Field name="f4" title="f4" x-component="Input" />
            <Field name="f5" title="f5" x-component="Input" />
            <Field name="f6" title="f6" x-component="Input" />
          </FormMegaLayout>

          <ButtonGroup align="center" style={{ marginBottom: '24px' }}>
            <Search enableLoading content="搜索" />
            <Reset content="重置" />
            <Clear content="清空" />
          </ButtonGroup>

          <List url={url} actions={listActions}>
            <Table>
              <Table.Column
                title="{{renderLabelTitle('标题')}}"
                dataIndex="label"
                cell="{{renderLabel}}"
              />
              <Table.Column title="value" dataIndex="value" />
              <Table.Column title="value" cell="{{renderOperation}}" />
            </Table>
            <Pagination />
          </List>

          {/* 弹窗表单 */}
          <SchemaDialog
            name="dialog"
            title="弹窗"
            onCancel="{{toggleDialogShow}}"
            components="{{components}}"
            onSubmit="{{onDialogSubmit}}"
            actions="{{actions2}}"
            style={{ width: '480px' }}
          >
            <FormMegaLayout labelCol={4}>
              <Field
                name="username"
                title="姓名"
                x-component="Input"
                required
              />
              <Field name="age" title="年龄" x-component="Input" required />
              <Field name="arr" title="arr" x-component="ArrayTable" required>
                <Field name="hh" title="hh" x-component="Input" required />
              </Field>
            </FormMegaLayout>

            <ButtonGroup align="center">
              <SchemaSubmit>提交</SchemaSubmit>
              <Reset>重置</Reset>
            </ButtonGroup>
          </SchemaDialog>
        </SchemaForm>
      </Printer>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```
