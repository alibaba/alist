# 设置及消费筛选状态

## 启用筛选状态

通过 [setRowSelection](#setRowSelection) 快速启用

```tsx

const actions = createListActions();

const App = () => {
    
    useEffect(() => {
        actions.setRowSelection(); // 启用筛选项
    }, []);
}
```

## 消费筛选状态

通过 [Selection](#Selection) 消费筛选状态

> 需要注意的是当没有启用筛选状态时，第一个参数为 `null`，需要做兼容处理。



```tsx

import { Selection } from '@alist/antd'

```

## 消费筛选状态例子（Ant-Design）

```jsx
import ReactDOM from 'react-dom'
import { Button } from 'antd'
import React, { useEffect } from 'react'
import { ListLifeCycleTypes, createListActions, Selection, List, Table, Pagination, Filter, Layout, Search, Clear } from '@alist/antd'
import'antd/dist/antd.css'

const actions = createListActions()

const App = props => {
  const { children, ...others } = props
  const url = 'https://alist-wiki.oss-cn-beijing.aliyuncs.com/data.json'

  return (
    <List
      // actions={actions}
      url={url}
      effects={($, actions) => {
        $(ListLifeCycleTypes.ON_LIST_MOUNTED).subscribe((payload) => {
          actions.setRowSelection() // 启用筛选模式
        });
        $(ListLifeCycleTypes.ON_LIST_SELECTION_REFRESH).subscribe((payload) => {
          console.log('ON_LIST_SELECTION_REFRESH', payload)
        });
        $(ListLifeCycleTypes.ON_LIST_SELECT).subscribe((payload) => {
          console.log('ON_LIST_SELECT', payload)
        });
        $(ListLifeCycleTypes.ON_LIST_SELECT_CHANGE).subscribe((payload) => {
          console.log('ON_LIST_SELECT_CHANGE', payload)
        });
      }}
    >
      <Selection>
        {(opts, list) => {
          const { allIds, ids, selectedAll, selectedNone, dataSource } = opts || {};
          return <div>已选中 {(ids || []).length} 条结果</div>
        }}
      </Selection>
      <Table rowKey="value">
      {/* <Table primaryKey="value"> */}
          <Table.Column title="label" dataIndex="label" />
          <Table.Column title="value" dataIndex="value" />
        </Table>
    </List>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```
