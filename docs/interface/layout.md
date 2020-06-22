# 搜索区域 - 布局

本小节主要关注于搜索区域的布局，使用 `Ant-Design` 演示，`Fusion-Next` 同理。

> AList， Formily布局均基于 MegaLayout
> 由于列表场景比较固定，可以理解 **Layout** 为 默认启用了 栅格模式(grid=true) 及 自动换行(autoRow=true) 的 **MegaLayout**

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
    <Filter.Item type="string" title="姓名" name="username" x-mega-props={{ span: 1 }} />
    <Filter.Item type="string" title="出生日期" name="date" x-mega-props={{ span: 1 }} />
</Layout>
```

## 单个表单组件布局

通过控制 `<Filter.Item>` 组件的属性进行布局

<img src="https://img.alicdn.com/tfs/TB1.q04vEz1gK0jSZLeXXb9kVXa-1346-1012.png" width="900px" />

## 多个表单组件布局

通过 `<Layout>` 和 `<Filter.Item>` 配合

<img src="https://img.alicdn.com/tfs/TB1YTJ4vpP7gK0jSZFjXXc5aXXa-1366-836.png" width="900px" />

## Field布局相关属性

| 字段名     | 描述           | 类型                   | 默认值  |
| :--------- | :------------- | :--------------------- | :------ |
| ['x-mega-props'].labelAlign | label 对齐方式 | `left`, `right`, `top` | `right` |
| ['x-mega-props'].full   | 表单组件是否撑满 | boolean | false  |
| ['x-mega-props'].hasBorder   | 内嵌布局情况下，是否显示边框 | boolean | true  |
| ['x-mega-props'].labelCol   | label 所占列数   | number(0-24) |        |
| ['x-mega-props'].wrapperCol | wrapper 所占列数 | number(0-24) |        |
| ['x-mega-props'].labelWidth   | label 宽度   | number |        |
| ['x-mega-props'].wrapperWidth | wrapper 宽度 | number |        |
| ['x-mega-props'].addonBefore  | FormMegaLayout 前辅助文案   | any  |        |
| ['x-mega-props'].addonAfter   | FormMegaLayout 后辅助文案   | any  |        |
| ['x-mega-props'].description | FormMegaLayout 底部辅助文案 | any  |        |
| ['x-mega-props'].span | 所占列数 | number | 1      |

## Layout布局相关属性

| 字段名     | 描述           | 类型                   | 默认值  |
| :--------- | :------------- | :--------------------- | :------ |
| labelAlign | label 对齐方式 | `left`, `right`, `top` | `right` |
| full   | 表单组件是否撑满 | boolean | false  |
| labelCol   | label 所占列数   | number(0-24) |        |
| wrapperCol | wrapper 所占列数 | number(0-24) |        |
| labelWidth   | label 宽度   | number |        |
| wrapperWidth | wrapper 宽度 | number |        |
| addonBefore  | FormMegaLayout 前辅助文案   | any  |        |
| addonAfter   | FormMegaLayout 后辅助文案   | any  |        |
| description | FormMegaLayout 底部辅助文案 | any  |        |
| inline | 是否启用行内布局 | boolean | false  |
| inset | 是否启用内嵌布局 | boolean | false  |
| hasBorder | 内嵌布局情况下，是否显示边框 | boolean | true  |
| grid    | 是否启用栅格布局 | boolean | true  |
| columns | 栅格布局总共列数 | number  | 3      |
| autoRow | 是否自动换行     | boolean | true  |
| responsive.s  | 媒体查询断点，视口宽度 <=720px，响应式栅格             | Number | Column 值 |
| responsive.m  | 媒体查询断点，720px <= 视口宽度 <= 1200px ，响应式栅格 | Number | Column 值 |
| responsive.lg | 媒体查询断点，视口宽度 >=1200px，响应式栅格            | Number | Column 值 |
| layoutProps.labelCol | 改变自身布局属性, wrapper 比例 | number(0-24) |        |
| layoutProps.wrapperCol | 改变自身布局属性, label 比例 | number(0-24) |        |
| layoutProps.labelWidth | 改变自身布局属性, label 宽度 | number |        |
| layoutProps.wrapperWidth | 改变自身布局属性, wrapper 宽度 | number |        |
| layoutProps.labelAlign | 改变自身label对齐方式 | 'right', 'left', 'top' |        |




