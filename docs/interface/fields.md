# 搜索区域 - 组件

搜索区域基于[Formily](https://github.com/alibaba/uform)实现，`AList`的用法是基于 `JSON Schema` 实现。

## 基本使用

```tsx
import { List, Filter, Layout } from '@alist/next'

const App = () => {
    return <List>
        <Filter>
            <Layout>
                <Filter.Item type="string" title="姓名" name="username" />
                <Filter.Item type="string" title="出生日期" name="date" />
            </Layout>
        </Filter>
    </List>
}
```

## 内置组件

下面表格是内置表单组件的类型和对应组件关系表

| type类型       | 对应组件                             | 描述                 |
|:--------------|:----------------------------------|:----------------------|
| input   |  Input                    | 输入框         |
| select   | Select                     | 下拉框         |
| checkbox   | CheckboxGroup                     | Checkbox         |
| radio   | RadioGroup                     | Radio         |
| boolean   | Switch                     | 开关组件         |
| date   | DatePicker                     | 日期选择器         |
| time   | TimePicker                     | 时间选择器         |
| daterange   | DatePicker x 2                     | 范围日期选择器         |
| rating   | Rating                     | 评价组件         |

## Filter.Item属性

| 属性名       | 描述                             | 类型                 | 默认值  |
|:--------------|:----------------------------------|:----------------------|:---------|
| title   | 表单组件Label                     | string         | ""    |
| name   | 表单组件key                     | string         | ""    |
| enum   | 相当于传入组件的dataSource                     | Array        | []s    |
| x-component-props   | 透传到表单组件的属性                     | Object         | {}    |
| required   | 是否必填，会触发校验                     | boolean         | false    |
| rules   | 校验规则，请参考[校验规则文档](https://uform-next.netlify.com/#/MpI2Ij/rRCmCPsOHO)                     |    ValidateDescription      | null    |
| span   | 组件跨列数                     | number         | 1    |
| hasBorder   | 是否有边框                     | boolean         | true    |

## 使用实例

```tsx
    <Filter.Item type="select" title="商品尺寸" name="size" enum={[        
        { label: 'l', value: 'l' },
        { label: 'm', value: 'm' },
        { label: 's', value: 's' },
    ]} />

    <Filter.Item type="date" title="日期时间" name="size" x-component-props={{
        showTime: true
    }} />
```

## 自定义组件

这一块的文档和 `Formily` 完全一致，请参考[注册自定义组件](https://uformjs.org/#/97UlUl/JNcMcBuYuy)

```tsx
import { registerFormField, connect } from '@alife/scm-list'

registerFormField(
    "custom",
    connect({
        getProps: (props, fieldProps) => {
            // 对传入组件的props进行自定义
        },
        getComponent: (Component, props, fieldProps) => {
            // 做预览态的操作可以在这里完成
        }
    })(Input)
);

```