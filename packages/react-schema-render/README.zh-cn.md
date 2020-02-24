```jsx
import React, { useState, useEffect, useRef } from 'react'
import {
  ListProvider, TableProvider, PaginationProvider, MultipleProvider,
  createListActions,
  ListLifeCycleTypes,
  ListEffectHooks,
  createListEffectHook
} from '@alist/react'

const Input = (props) => {
  const [value, setValue] = useState(props.value)
  useEffect(() => {
    if (props.value !== value) {
      setValue(props.value)
    }
  }, [props.value])

  return <input type="number" value={value} onChange={(e) => {
    setValue(e.target.value)
    props.onChange(e.target.value)
  }} />
}

const Pagination = () => {
  const [currentPage, setCurrentPage] = useState(1)
  return <PaginationProvider>
    {(props) => <div>
      当前页面：{props.currentPage} , 
      分页尺寸：{props.pageSize} , 
      总条目数：{props.total} , 
      总页面数：{props.totalPages}
      <div>
        <Input value={props.currentPage} onChange={setCurrentPage} />
        <button onClick={() => {
          props.setCurrentPage(currentPage)
        }}>跳转到</button>
      </div>
    </div>}
  </PaginationProvider>
}

const App = () => {
  const actions = createListActions()
  const url = 'https://mocks.alibaba-inc.com/mock/alist/data'

  return <div>
    <h1>最基本的用法</h1>
    <h5>打开控制台查看Network发起的请求</h5>

    <ListProvider actions={actions} url={url} pageSize={5}>
      <Pagination />
      <TableProvider>
        {(props) => {
          if (props.loading) return <div>loading...</div>
          return props.dataSource.map((item, index) => <div key={index}>{item.label}, {item.name}</div>)
        }}
      </TableProvider>
      <Pagination />
    </ListProvider>
  </div>
}

ReactDOM.render(<App />, document.getElementById('root'))
```