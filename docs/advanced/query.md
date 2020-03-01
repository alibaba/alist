# 实现自定义请求组件

由于 `AList` 有自己的请求规范，有可能和开发者业务团队的标准有差异，此时需要包装有业务含义的请求组件。

## 覆盖式

1. 封装符合业务团队接口规范的 `BizList` 

```tsx
import * as AList from '@alist/antd'

const bizFormatBefore = () => {}
const bizFormatAfter = () => {}

const BizList = (props) => {
    const { formatBefore, formatAfter } = props
    return <AList.List
        {...others}
        formatBefore={formatBefore || bizFormatBefore}
        formatAfter={formatAfter || bizFormatAfter}
    />
}

export {
    ...AList,
    List: BizList
}
```

2. 由于 `BizList` 已经是规范化处理完成，其他开发者只需要传入`url` 即可以

```tsx
import { List } from 'biz-list'

const App = () => {
    return <List url="" />
}

```