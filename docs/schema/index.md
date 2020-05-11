## 理解Schema

## 结构定义

`AList` 可以通过 `JSON-Schema` 来渲染列表，以下是规范及定义：

| 变量名       | 描述                             | 类型                 |
|:----------|:---------------------------------|:--------------------|
| componentsTree    |  组件树                 | Array<Component`|`string> |
| i18n    |  国际化文案集                 | {[i18n-key]: { [string]: string } } |

* Component

| 变量名       | 描述                             | 类型                 |
|:----------|:---------------------------------|:--------------------|
| componentName    |  组件名称                 | string |
| props    |  组件属性                 | { [string]: any } |
| children    |  组件内容                 | Array<Component`|`string> |

1. **children** 下的字符串内容，及 **props** 内所有带有 `$i18n.` 的文字，都会尝试去 `i18n` 配置内查找并替换。
2. **props** 内所有的属性，带有 `$func.` 的属性，都会尝试从 `<List>` 的 `funcRegistry` 内查找并替换。

## 结构示例

```json
{
  "componentsTree": [
    {
      "componentName": "div",
      "props": {
        "onClick": "$func.onClick",
      },
      "children": [
        "hello",
        {
          "componentName": "span",
          "children": ["$i18n.china"]
        }
      ]
    }
  ],
  "i18n": {
    "zh-CN": {
      "hello": "你好",
      "china": "中国"
    },
    "en-US": {
      "hello": "Hello",
      "china": "China"
    }
  }
}
```

## 用法

通过 `<SchemaList>` 来渲染 **schema** 模式下的 **AList**，核心属性如下：

| 变量名       | 描述                             | 类型                 |
|:----------|:---------------------------------|:--------------------|
| schema    | 描述AList的schema                  | IListSchema |
| funcRegistry    | 自定义注册方法列表                  | { [string]: function } |
| componentsRegistry    | 自定义注册组件类型                  | { [string]: ReactElement } |

```tsx
import { SchemaList } from '@alist/antd'

const App = () => {
  return <SchemaList
    schema={schema}
    funcRegistry={{ // 自定义注册方法列表
      onClick: () => {}
    }}
    componentsRegistry={{ // 自定义注册组件类型
      CustomComponent: (props) => <div>{props.children}</div>
    }}
  />
}
```

## 预注册

还可以通过预注册的方法来提前注册方法及组件类型

```tsx
import { registerListFuncs, registerListComponent } from '@alist/antd'

// 预注册moment处理函数
registerListFuncs({
  moment: (val, format) => moment(val).format(format || 'YYYY-MM-DD HH:mm:ss')
})

// 预注册组件类型
registerListComponent({
  CustomComponent: (props) => <div>{props.children}</div>
})

```

## 内置组件类型

| 变量名       | 描述                             |
|:----------|:---------------------------------|
| List    |  AList容器                 |
| Table    |  Table组件                 |
| Table.Column    |  Table子组件                 |
| Pagination    |  Pagination组件                 |
| Filter    |  Filter组件                 |
| Filter.Item    |  Filter字段                 |
| Consumer    |  Consumer组件                 |
| div    |  html组件                 |
| span    |  html组件                 |
| img    |  html组件                 |
| a    |  html组件                 |
| a    |  html组件                 |
| b    |  html组件                 |
| i    |  html组件                 |
| p    |  html组件                 |
| hr    |  html组件                 |
| br    |  html组件                 |

