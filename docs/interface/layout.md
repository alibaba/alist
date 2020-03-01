# 搜索区域 - 布局

本小节主要关注于搜索区域的布局，使用 `Ant-Design` 演示， `Fusion-Next` 同理。

## 基本使用

```tsx
import { List, Filter, Layout } from '@alist/antd'

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

## 搜索区域布局

默认情况下，推荐使用`Layout`，该组件是对应 `等分自定换行布局`，默认列数为 `3` 列，每个表单组件都占 `1` 列。因此上述例子实际等价于：

```tsx
<Layout columns={3}>
    <Filter.Item type="string" title="姓名" name="username" span={1} />
    <Filter.Item type="string" title="出生日期" name="date" span={1} />
</Layout>
```

## 单个表单组件布局

通过控制 `<Filter.Item>` 组件的属性进行布局

<img src="https://img.alicdn.com/tfs/TB1.q04vEz1gK0jSZLeXXb9kVXa-1346-1012.png" width="900px" />

## 多个表单组件布局

通过 `<Layout>` 和 `<Filter.Item>` 配合

<img src="https://img.alicdn.com/tfs/TB1YTJ4vpP7gK0jSZFjXXc5aXXa-1366-836.png" width="900px" />

## Field布局相关属性

| 属性名       | 描述                             | 类型                 | 默认值  |
|:--------------|:----------------------------------|:----------------------|:---------|
| full   | 表单组件是否占满剩余空间                     | boolean         | false    |
| labelAlign   | label的位置                     | 'left' | 'top'         | 'left'    |
| span   | 组件跨列数, 当外层有Layout时才有效                     | number         | 1    |
| hasBorder   | 是否有边框                     | boolean         | true    |
| labelCol   | label 跨越列数, 1-24，优先级高于labelWidth                    | number         | true    |
| wrapperCol   | 内容 跨越列数, 1-24                     | number         | undefined    |
| labelWidth   | label的宽度，优先级低于labelCol                     | number         | undefined    |

## Layout布局相关属性

| 属性名       | 描述                             | 类型                 | 默认值  |
|:--------------|:----------------------------------|:----------------------|:---------|
| full   | 表单组件是否占满一行`(透传到Filter.Item)`                   | boolean         | false    |
| label   | 布局的label                     | string | JSX.Element         | null    |
| suffix   | 布局的suffix                     | string | JSX.Element         | null    |
| labelAlign   | label的位置`(透传到Filter.Item)`                    | 'left' | 'top'         | 'left'    |
| labelCol   | label 跨越列数, 1-24，优先级高于labelWidth`(透传到Filter.Item)`                    | number         | true    |
| wrapperCol   | 内容 跨越列数, 1-24`(透传到Filter.Item)`                     | number         | undefined    |
| labelWidth   | label的宽度，优先级低于labelCol`(透传到Filter.Item)`                     | number         | undefined    |
| mode   | 布局模式，分为等分布局(normal) 和 等分自动换行布局(columns)                     | 'normal' | 'columns'         | 'columns'    |
| columns   | 模式为等分自动换行布局(columns)时有效                     | number         | 3    |




