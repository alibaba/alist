# 性能测试

```jsx
import React from 'react'
import { createListActions, List, Table, Pagination, ToggleTrigger, Filter, Layout, Search, Clear } from '@alist/next'
import { Button, Table as NextTable } from '@alifd/next'
import '@alifd/next/dist/next.css'

const actions = createListActions()
const App = () => {  
  const url = 'https://alist-wiki.oss-cn-beijing.aliyuncs.com/data.json'

  return <div>
    <h5>打开控制台查看Network发起的请求</h5>

    <List
      actions={actions}
      url={url}
      pageSize={5}
    >
      <Filter>
        <Layout inline>
            <Filter.Item type="input" name="username" title="username"/>
            <Filter.Item type="input" name="age" title="age"/>
        </Layout>
        <Layout.ButtonGroup>
          <Search>搜索</Search>
          <Clear>重置</Clear>
        </Layout.ButtonGroup>
      </Filter>
      <Table>
        <Table.Column title="label" dataIndex="label" />
        <Table.Column title="value" dataIndex="value" />
      </Table>
      <Pagination />
    </List>
  </div>
}

ReactDOM.render(<App />, document.getElementById('root'))
```

```jsx

import React, { useState, useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { ListProvider, TableProvider, createListActions } from '@alist/react'
import { List, Table, Pagination, ToggleTrigger, Filter, Layout, Search, Clear } from '@alist/next'
import { Button, Table as NextTable } from '@alifd/next'
import '@alifd/next/dist/next.css'

const rows = 50;
const actions = createListActions()

const generateKey = () => 'field_' + `${Math.random()}`.slice(2, 6)
const generateData = () => 'data_' + `${Math.random()}`.slice(2)
const generateId = () => 'id_' + `${Math.random()}`.slice(2)

const generateColumns = (col) => {
  let result = [];
  for(let i = 0; i < col; i++) {
    const dataIndex = generateKey();
    result.push({ title: dataIndex, dataIndex });
  }
  return result;
}

const columns = generateColumns(20);

const getDataSource = (row, withId) => {  
  let result = [];
  for(let i = 0; i < row; i++) {
    const item = {};
    columns.forEach(column => {
      if (withId) {
        item.id = generateId();
      }
      
      item[column.dataIndex] = generateData();
    })
    result.push(item);
  }
  return result;
}

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
const customQuery = async opts => {
  const { data, url, method } = opts
  const { currentPage } = data

  console.log('query====>')

  await sleep(500)
    
  return {
    dataList: getDataSource(rows),
    pageSize: rows,
    total: rows,
    totalPages: 1,
    currentPage
  }
}


const url = 'void';

const useSlow = () => {
    useEffect(() => {

    })
}

const App = () => {  
    const [ds, setDs] = useState([]);
    // useSlow();

  return <div>
    <Button onClick={() => {
      // setDs(getDataSource(50));
      actions.setDataSource(getDataSource(50))
      // actions.refresh()
    }}>测试50条</Button>

    <Button onClick={() => {
      // setDs(getDataSource(50));
      actions.setDataSource(getDataSource(50, true))
      // actions.refresh()
    }}>测试50条带id</Button>

    <Button onClick={() => {
      // setDs(getDataSource(50));
      // actions.setDataSource(getDataSource(50))
      actions.refresh()
    }}>刷新</Button>

    <Button onClick={() => {
      // setDs(getDataSource(100));
      actions.setDataSource(getDataSource(100))
    }}>测试100条</Button>

    <Button onClick={() => {
      // setDs(getDataSource(200));
      actions.setDataSource(getDataSource(200))
    }}>测试200条</Button>

    {/* <List actions={actions} pageSize={50}> */}
    {/* <List actions={actions} pageSize={200}> */}
    <List actions={actions} url="test" query={customQuery}> 
      <Filter >
        <Layout columns={4}>
          <Filter.Item type="input" name="a" title="a"/>
          <Filter.Item type="input" name="b" title="b" x-mega-props={{ span: 2 }}/>
          <Filter.Item type="input" name="c" title="c"/>
          <Filter.Item type="input" name="d" title="d"/>
          <Filter.Item type="input" name="e" title="e" x-mega-props={{ span: 3 }} />
          <Filter.Item type="input" name="f" title="f" x-mega-props={{ span: 2 }}/>
        </Layout>
        <Layout.ButtonGroup>
          <Search>搜索</Search>
          <Clear>重置</Clear>
        </Layout.ButtonGroup>
      </Filter> 
        <Pagination />
        <Table
          // defaultOpenAll
          // defaultOpen={(ds) => {
          //   return ds.slice(0,5).map(item => item.id);
          // }}
          // expandedRowRender={(record) => {
          //   const [d1, d2] = Object.keys(record)
          //   return record[d1] + '-' + record[d2]
          // }}
          // hasExpandedRowCtrl={false}
        >
            <Table.Column sortable title="op" dataIndex="id" cell={(val, idx, record) => {
                return <ToggleTrigger id={record.id} expandText="展开" unExpandText="收起" />
            }} />
            {columns.map(column => <Table.Column {...column} />)}
        </Table>
    </List>

    
  </div>
}

ReactDOM.render(<App />, document.getElementById('root'))
```