# 实现自定义静默埋点

## 覆盖式

1. 封装符合业务团队埋点规范的的能力。

```tsx
import * as AList from '@alist/antd'

const noop = () => {}
const BizList = (props) => {
    const { effects = noop } = props
    return <AList.List
        {...others}
        effects={($, actions) => {
        // 请求前埋点
        $(ListLifeCycleTypes.ON_LIST_BEFORE_QUERY).subscribe(() => {
          
        });

        // 请求后埋点，需要关心是否为空，和是否请求发生异常
        $(ListLifeCycleTypes.ON_LIST_AFTER_QUERY).subscribe(payload => {
          const { empty, hasError, error } = payload;
          
        });

        // 请求前校验埋点
        $(ListLifeCycleTypes.ON_LIST_VALIDATE_END).subscribe(payload => {
          const { success, errors } = payload;          
        });

        // 点击清空埋点
        $(ListLifeCycleTypes.ON_LIST_CLEAR).subscribe(() => {
          
        });

        // 点击重置埋点
        $(ListLifeCycleTypes.ON_LIST_RESET).subscribe(() => {

        });

        effects($, actions);
      }}
    />
}

export {
    ...AList,
    List: BizList
}
```

2. 由于 `BizList` 已经包含埋点功能，其他开发者无须单独埋点，直接使用即可

```tsx
import { List } from 'biz-list'

const App = () => {
    return <List url="" />
}

```