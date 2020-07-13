# 同步URL参数

下面例子中，`username` 与URL参数绑定，初始化设置 `params` 会设置搜索字段初始值。随着字段变化，也会影响URL参数。

```jsx
import React, { useEffect } from 'react'
import {
  List, Table, Pagination, Filter,
  createListActions, Consumer,
} from '@alist/antd'
import'antd/dist/antd.css'

const actions = createListActions() 
const App = () => {  
  const url = 'https://alist-wiki.oss-cn-beijing.aliyuncs.com/data.json'

  return <div>
    <List
        paramsFields={['username']}
        params={{
            username: '123'
        }}
    >
      <Filter>
        <Filter.Item name="username" type="input" title="username" />
        <Filter.Item name="age" type="input" title="age" />
      </Filter>
      <Consumer>
        {() => {
            const p = new URLSearchParams(location.search)
            p.delete('path')
            return <div>url params: {p.toString()}</div>
        }}
      </Consumer>
    </List>
  </div>
}

ReactDOM.render(<App />, document.getElementById('root'))
```