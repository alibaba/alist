import React from 'react'
import { Input, Icon, Cascader } from 'antd'
import { setup, Select as ConnectedSelect } from '@formily/antd-components'
import {
  registerFormField,
  mapStyledProps,
  mapTextComponent,
  connect
} from '@formily/antd'

// 内置formily组件
setup()

// 搜索框的样式
const presetSearchStyle = component => {
  return props => {
    return React.createElement(component, {
      innerBefore: <Icon type="search" style={{ margin: 4 }} />,
      ...props
    })
  }
}

// 注册Cascader组件
registerFormField(
  'cascaderSelect',
  connect({
    getProps: mapStyledProps,
    getComponent: mapTextComponent
  })(Cascader)
)

// 注册输入组件
registerFormField(
  'input',
  connect({
    getProps: mapStyledProps,
    getComponent: mapTextComponent
  })(Input)
)

// 注册搜索组件
registerFormField(
  'search',
  connect({
    getProps: mapStyledProps,
    getComponent: mapTextComponent
  })(presetSearchStyle(Input))
)

// 注册select组件
registerFormField('select', ConnectedSelect)

const Preview = (props) => <p style={{ padding: 0, margin: 0, lineHeight: '28px' }} className="preview-text">
  {props.content}
</p>

// 注册select组件
registerFormField(
  'preview',
  connect({
    getProps: (props: any, fieldProps) => {
      const { content } = fieldProps.props || {}
      props.content = content
    }
  })(Preview)
)
