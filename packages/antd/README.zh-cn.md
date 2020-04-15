# @alist/antd

> @alist/antd 是基于 `@alist/react` 在 `Ant-Design` 的实现。 提供了 组件用于渲染 以及 API 用于操作列表数据。
> 主要包括以下：
>
> - `<List/>`
> - `<Filter/>`
> - `<Pagination/>`
> - `<Table/>`
> - `<Layout/>`
> - `<Consumer/>`
> - `<MultipleProvider/>`


### 安装

```bash
npm install --save @alist/next
```

```jsx
import React from 'react'
import {
  List,
  Table,
  Pagination,
  Filter,
  Layout,
  Search,
  Clear,
  createListActions,
  ListLifeCycleTypes,
  FormSlot
} from '@alist/antd'
import'antd/dist/antd.css'

const App = () => {
  return (
    <List>
      <Filter>
        <FormSlot>labelAlign</FormSlot>        
        <Filter.Item type="select" name="l1" title="left" />
        <Filter.Item type="select" name="l2" title="left+full" full/>
        <Filter.Item type="select" name="t1" title="top" labelAlign="top"/>        
        <Filter.Item type="select" name="t2" title="top+full" labelAlign="top" full/>

        <FormSlot>full</FormSlot>        
        <Filter.Item type="select" name="f1" title="full:false" />
        <Filter.Item type="select" name="f2" title="full:true" full/>

        <FormSlot>labelWidth + full</FormSlot>        
        <Filter.Item type="select" name="fw1" title="labelWidth:normal" />
        <Filter.Item type="select" name="fw2" title="labelWidth:150" labelWidth="150px" />
        <Filter.Item type="select" name="fw3" title="labelWidth:150+full" labelWidth="150px" full/>

        <FormSlot>labelCol/wrapperCol</FormSlot>
        <Filter.Item type="select" name="lw2" title="6/10" labelCol={6} wrapperCol={10} />
        <Filter.Item type="select" name="lw3" title="6/10+full" labelCol={6} wrapperCol={10} full/>

        <FormSlot>mode: columns</FormSlot>
        <Layout>
          <Filter.Item type="select" name="s1" title="s1" full/>
          <Filter.Item type="select" name="s2f" title="span2+full" span={2} full/>
          <Filter.Item type="select" name="s3f" title="span3+full" span={3} full/>
        </Layout>

        <FormSlot>mode: normal</FormSlot>
        <Layout mode="normal">
          <Filter.Item type="select" name="n1" title="n1" />
          <Filter.Item type="select" name="n2" title="n3" />
        </Layout>

        <FormSlot>mode: normal + full</FormSlot>
        <Layout mode="normal" full>
          <Filter.Item type="select" name="nl3" title="n3" />
          <Filter.Item type="select" name="nl4" title="n4" />
          <Filter.Item type="select" name="nl5" title="n5" />
        </Layout>

        <FormSlot>mode: normal + labelAlign:left + full</FormSlot>
        <Layout mode="normal" labelAlign="left" full>
          <Filter.Item type="select" name="nf5" title="nf5" />
          <Filter.Item type="select" name="nf6" title="nf6" />
          <Filter.Item type="select" name="nf7" title="nf7" />
        </Layout>

        <FormSlot>complex mix</FormSlot>
        <Layout mode="normal" labelAlign="left" inline={false} full labelWidth={100}>
          <Filter.Item type="select" name="n5" title="n5" />
          <Filter.Item type="select" name="n6" title="n6" />
          <Filter.Item type="preview" name="p1" title="p1" content="preview"/>
          <Layout mode="normal" labelAlign="left" inline full label="inline" description="hello" suffix="suffix1">
            <Filter.Item type="select" name="n7" title="n7" description="world"/>
            <Filter.Item type="select" name="n8" title="n8" />
          </Layout>
          <Filter.Item type="select" name="n9" title="n9" description="hello2" />
          <Layout mode="columns" columns={2} labelAlign="left" inline full label="inline" description="hello3" suffix="suffix2">
            <Filter.Item type="select" name="n11" title="n11" description="world2"/>
            <Filter.Item type="select" name="n12" title="n12" />
            <Filter.Item type="select" name="n13" title="n13" />
          </Layout>
          <Filter.Item type="select" name="n10" title="n10" />
        </Layout>
      </Filter>
    </List>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

### 目录

<!-- toc -->

- [`Usage`](#Usage)
  - [`快速开始(URL模式)`](#快速开始(URL模式))
  - [`搜索区域`](#搜索区域)
  - [`搜索区域布局`](#搜索区域布局)
  - [`展开收起 ExpandContainer/ExpandTrigger`](#展开收起-ExpandContainer/ExpandTrigger)
  - [`DataSource模式`](#本地DataSource模式)
  - [`Multiple模式`](#多列表实例模式)
  - [`标准化请求格式`](#标准化请求格式)
  - [`自定义请求`](#自定义请求)
  - [`生命周期监听`](#生命周期监听)
  - [`自定义生命周期`](#自定义生命周期)
  - [`列表监听组件`](#列表监听组件)
  - [`重绘Table`](#重绘Table)
  - [`RowSelection`](#RowSelection)
  - [`Consumer`](#Consumer)
  - [`isLoop`](#isLoop)
- [Components](#components)
  - [`<List/>`](#List)
  - [`<Filter/>`](#Filter)
  - [`<Consumer/>`](#Consumer)
  - [`<MultipleProvider/>`](#MultipleProvider)
  - [`<Pagination/>`](#Pagination)
  - [`<Table/>`](#Table)
- [Hook](#Hook)
  - [`useList`](#useList)
- [API](#API)
  - [`createListActions`](#createListActions)
  - [`createAsyncListActions`](#createAsyncListActions)
  - [`ListEffectHooks`](#ListEffectHooks)
  - [`createListEffectHook`](#createListEffectHook)
- [Interfaces](#Interfaces)
  - [`IListMode`](#IListMode)
  - [`IList`](#IList)
  - [`IListActions`](#IListActions)
  - [`IListAsyncActions`](#IListAsyncActions)
  - [`IListUIProps`](#IListUIProps)
  - [`ITableProps`](#ITableProps)

### Usage

---

#### 快速开始(URL模式)

传入 `url` 会自动设置为 `URL 模式` 并自动发起请求。 点击 [标准化请求格式](#标准化请求格式) 查看默认请求格式.

```jsx
import React from 'react'
import {
  List, Table, Pagination,
  createListActions,
} from '@alist/antd'
import'antd/dist/antd.css'

const actions = createListActions()
const App = () => {  
  const url = 'https://mocks.alibaba-inc.com/mock/alist/data'

  return <div>
    <h1>最基本的用法</h1>
    <h5>打开控制台查看Network发起的请求</h5>

    <List
      actions={actions}
      url={url}
      pageSize={5}
      sortConfig={{
        sortLocal: (sortConfig) => {
          return [{ label: 'a', value: 'a' }]
        },
      }}
    >
      <Pagination />
      <Table>
        <Table.Column title="label" dataIndex="label" sorter/>
        <Table.Column title="value" dataIndex="value"/>
      </Table>
      <Pagination />
    </List>
  </div>
}

ReactDOM.render(<App />, document.getElementById('root'))
```

#### 搜索区域

搜索区域使用`UForm`作为其内核，用法等价。命名上有语义的区分：

* `SchemaForm` 对应 `Filter`
* `SchemaMarkupField` 或 `Field` 对应 `Filter.Item`

```jsx
import React from 'react'
import {
  List, Table, Pagination,
  Filter,
  Layout,
  Search,
  Clear,
  createListActions,
  ListLifeCycleTypes,
} from '@alist/antd'
import'antd/dist/antd.css'

const actions = createListActions()
const App = () => {  
  const url = 'https://mocks.alibaba-inc.com/mock/alist/data'

  return <div>
    <h1>结合搜索框的用法</h1>
    <h5>打开控制台查看Network发起的请求</h5>

    <List
      actions={actions}
      url={url}
      pageSize={5}
      effects={($) => {
        // triggered when filterItem
        $(ListLifeCycleTypes.ON_LIST_FILTER_ITEM_CHANGE).subscribe((state) => {
          console.log(state)
        });
      }}
    >
      <Filter>
        <Filter.Item type="input" name="username" title="username"/>
        <Filter.Item type="input" name="age" title="age"/>
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

#### 搜索区域布局

* 纵向布局（默认布局）
* 行内布局，设置 `inline=true`
* 等分自动换行布局，使用`Layout`
* 按钮布局 `ButtonGroup`

```jsx
import React from 'react'
import {
  List, Table, Pagination,
  createListActions, Filter,
  Search, Clear,
  Layout,
  SchemaMarkupField,
  FormBlock,
  FormCard,
  SchemaForm,
} from '@alist/antd'
import'antd/dist/antd.css'

const actions = createListActions()
const App = () => {  
  const url = 'https://mocks.alibaba-inc.com/mock/alist/data'

  return <div>
    <List
      actions={actions}
      url={url}
      pageSize={5}
    >
      <h4>行内布局(inline=true)</h4>
      <Filter inline>
        <Filter.Item type="input" name="username" title="username"/>
        <Filter.Item type="input" name="age" title="age"/>
        <Layout.ButtonGroup>
          <Search>搜索</Search>
          <Clear>重置</Clear>
        </Layout.ButtonGroup>
      </Filter>
      <h4>等分自动换行布局</h4>
      <Filter >
        <Layout gap={[12,16]} columns={4}>
          <Filter.Item type="input" name="a" title="a"/>
          <Filter.Item span={2} type="input" name="b" title="b"/>
          <Filter.Item type="input" name="c" title="c"/>
          <Filter.Item type="input" name="d" title="d"/>
          <Filter.Item type="input" name="e" title="e" span={3} />
          <Filter.Item type="input" name="f" title="f" span={2}/>
        </Layout>
      </Filter>
      <h4>等分自动换行布局(标签内嵌)</h4>
        <Filter>
          <Layout inset gap={[12, 16]} columns={4}>
            <Filter.Item
              required
              type="input"
              title="input"
              name="input"
            />
            <Filter.Item
              type="radio"
              enum={['1', '2', '3', '4']}
              title="Radio"
              name="radio"
            />
            <Filter.Item
              type="select"
              enum={['1', '2', '3', '4']}
              required
              title="Select"
              name="select"
            />
            <Filter.Item
              type="checkbox"
              enum={['1', '2', '3', '4']}
              required
              title="Checkbox"
              name="checkbox"
            />
            <Filter.Item
              span={2}
              type="daterange"
              title="日期范围"
              default={['2018-12-19', '2018-12-19']}
              name="daterange"
            />
            <Filter.Item type="number" title="数字选择" name="number" />
            <Filter.Item type="boolean" title="开关选择" name="boolean" />
            <Filter.Item type="date" title="日期选择" name="date" />            
            <Filter.Item type="year" title="年份" name="year" />
            <Filter.Item type="time" title="时间" name="time" />
            <Filter.Item type="rating" title="等级" name="rating" />            
          </Layout>
          <Layout.ButtonGroup>
              <Search>搜索</Search>
              <Clear>重置</Clear>
          </Layout.ButtonGroup>
        </Filter>
      <h4>纵向布局(inline=false)</h4>
      <Filter>
        <Filter.Item type="input" name="username" title="username" />
        <Filter.Item type="input" name="age" title="age"/>
        <Layout.ButtonGroup>
          <Search>搜索</Search>
          <Clear>重置</Clear>
        </Layout.ButtonGroup>
      </Filter>
    </List>
  </div>
}

ReactDOM.render(<App />, document.getElementById('root'))
```

#### 展开收起 ExpandContainer/ExpandTrigger

```jsx
import React from 'react'
import {
  List,
  Table,
  Pagination,
  createListActions,
  Filter,
  Search,
  Clear,
  Layout,
  SchemaMarkupField,
  FormBlock,
  FormCard,
  SchemaForm,
  ExpandContainer,
  ExpandTrigger,
} from '@alist/next'
import '@alifd/next/dist/next.css'

const actions = createListActions()
const App = () => {
  const url = 'https://mocks.alibaba-inc.com/mock/alist/data'

  return (
    <div>
      <List actions={actions} url={url} pageSize={5}>
        <Filter>
          <Layout inset gap={[12, 16]} columns={4}>
            <Filter.Item type="number" title="数字选择" name="number" />
            <Filter.Item type="boolean" title="开关选择" name="boolean" />
            <Filter.Item type="date" title="日期选择" name="date" />            
            <Filter.Item type="year" title="年份" name="year" />
            <ExpandContainer>
              <Filter.Item type="time" title="时间" name="time" />
              <Filter.Item type="rating" title="等级" name="rating" />            
            </ExpandContainer>
          </Layout>
          <Layout.ButtonGroup>
              <Search>搜索</Search>
              <Clear>重置</Clear>
              <ExpandTrigger expandText="展开" unExpandText="收起" />
          </Layout.ButtonGroup>
        </Filter>
      </List>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

#### 本地DataSource模式

传入 `dataSource` 就会设置为 `本地DataSource模式`，并且会根据传入的分页大小自动完成数据分页。

```jsx
import React from 'react'
import {
  List, Table, Pagination,
  createListActions,
} from '@alist/antd'

const getDataSource = (len) => {
  const dataSource = []
  for ( let i = 0; i < len; i++ ) {
    dataSource.push({ label: `id: #${Math.random().toString(36).slice(-8)}`, value: i })
  }

  return dataSource
}

const actions = createListActions()
const App = () => {  
  const dataSource = getDataSource(20)
        
  return <div>
    <h1>本地DataSource模式</h1>
    <h5>自动处理数据分页</h5>
    <List
      actions={actions}
      dataSource={dataSource}
      pageSize={5}
    >
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

#### 多列表实例模式


使用 `MultipleProvider` 配合 `setMultipleData` 将同一个接口数据让多个列表消费。

```jsx
import React, { useEffect } from 'react'
import {
  List, Table, Pagination, MultipleProvider,
  createListActions,
} from '@alist/antd'

const getDataSource = (len) => {
  const dataSource = []
  for ( let i = 0; i < len; i++ ) {
    dataSource.push({ label: `id: #${Math.random().toString(36).slice(-8)}`, value: i })
  }

  return dataSource
}

const actions = createListActions() 
const App = () => {  
  useEffect(() => {
    actions.setMultipleData({
      a1: getDataSource(15),
      a2: getDataSource(15),
    })
  }, [])

  return <div>
    <h1>多列表实例模式</h1>
    <h5>同一份接口数据，多个列表实例消费</h5>
    <List actions={actions}>
      <h3>List 1 pageSize: 10</h3>
      <MultipleProvider id="a1">
        <Table>
        <Table.Column title="label" dataIndex="label" />
        <Table.Column title="value" dataIndex="value" />
      </Table>
        <Pagination />
      </MultipleProvider>      

      <h3>List 2 pageSize: 3</h3>
      <MultipleProvider id="a2" pageSize={3}>
        <Table>
          <Table.Column title="label" dataIndex="label" />
          <Table.Column title="value" dataIndex="value" />
        </Table>
        <Pagination />
      </MultipleProvider>
    </List>
  </div>
}

ReactDOM.render(<App />, document.getElementById('root'))
```

#### 标准化请求格式

![standard-query-flow](https://img.alicdn.com/tfs/TB15V_PtLb2gK0jSZK9XXaEgFXa-986-473.png)

如图所示，可以将请求的过程看成是黑盒，请求参数为 [IListQueryData](#IListQueryData), 其中用户能够通过以下三种方式影响流程：

* formatBefore 修改请求前的数据
* formatAfter 修改请求返回后的数据
* query 直接代理整个请求过程

只需要保证最终的返回结果是 [IListResponse](#IListResponse)即可，其他渲相关的动作 AList都会帮您完成。

#### 自定义请求

传入 `query` 完全自定义请求格式

```jsx
import React, { useState, useEffect, useRef } from 'react'
import {
  List, Table, Pagination,
  createListActions,
} from '@alist/antd'


const getDataSource = (len) => {
  const dataSource = []
  for ( let i = 0; i < len; i++ ) {
    dataSource.push({ label: `id: #${Math.random().toString(36).slice(-8)}`, value: i })
  }

  return dataSource
}

const actions = createListActions()
const App = () => {
  const query = async ({ url, method, data }) => {
    const { currentPage, pageSize } = data
    return fetch(`${url}?_t=${new Date().getTime()}&sort=%7B%7D&pageSize=${pageSize}&currentPage=${currentPage}&filterData=%7B%7D`,
      {
        "credentials":"include",
        "headers": {
          "accept":"application/json, text/plain, */*",
          "accept-language":"en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7,zh-TW;q=0.6",
          "content-type":"application/x-www-form-urlencoded charset=UTF-8",
          "sec-fetch-mode":"cors",
          "sec-fetch-site":"cross-site"
        },
        "referrer": location.href,
        "referrerPolicy":"no-referrer-when-downgrade",
        "body":null,
        "method":"GET",
        "mode":"cors"
      }).then((resp) => {
        return resp.json()              
      }).then(resp => {
        const { code, data: respData, message } = resp
        if ([ 0, 200, '0', '200' ].indexOf(code) === -1) {
            throw new Error(message || 'System Error')
        } else {
            const total = 6
            const totalPages = Math.ceil(total / pageSize)  
            let dataList
            if (currentPage > totalPages) {
              dataList = []
            } else if (currentPage === totalPages) {
              dataList = getDataSource(total % pageSize)
            } else {
              dataList = getDataSource(pageSize)
            }

            return {
              dataList,
              currentPage,
              pageSize,
              total,
              totalPages,
            }
            return respData
        }
      });
  }

  const url = 'https://mocks.alibaba-inc.com/mock/alist/data'
  return <div>
    <h1>自定义请求</h1>
    <List actions={actions} url={url} query={query} pageSize={5}>
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

#### 生命周期监听


通过 `effects` 来监听列表生命周期的变化. 点击 [ListLifeCycleTypes](#ListLifeCycleTypes) 查看完整的生命周期。

```jsx
import React, { useState, useEffect, useRef } from 'react'
import {
  List, Table, Pagination,
  createListActions,
  ListLifeCycleTypes,
  ListEffectHooks,
  createListEffectHook
} from '@alist/antd'

const App = () => {
  const actions = createListActions()
  const url = 'https://mocks.alibaba-inc.com/mock/alist/data'

  return <div>
    <h1>基本用法</h1>
    <h5>打开控制台查看相应输出</h5>

    <List
      effects={($, actions) => {
        $(ListLifeCycleTypes.ON_LIST_WILL_INIT).subscribe(() => {
          console.log('list will init')
        })
        $(ListLifeCycleTypes.ON_LIST_INIT).subscribe(() => {
          console.log('list init')
        })
        $(ListLifeCycleTypes.ON_LIST_BEFORE_QUERY).subscribe((queryData) => {
          console.log('list before query', queryData)
        })

        $(ListLifeCycleTypes.ON_LIST_AFTER_QUERY).subscribe((resp) => {
          console.log('list after query', resp)
        })
      }}
      actions={actions}
      url={url}
      pageSize={5}
    >
      <Table>
        <Table.Column title="label" dataIndex="label" />
        <Table.Column title="value" dataIndex="value" />
      </Table>
    </List>
  </div>
}

ReactDOM.render(<App />, document.getElementById('root'))
```

#### 重绘Table

`getTableProps`, `setTableProps` 用于代替Table需要setState的属性变更

```jsx
import React, { useEffect } from 'react'
import { Button } from 'antd'
import { List, Table, Pagination, Selection, createListActions } from '@alist/antd'
import'antd/dist/antd.css'

const actions = createListActions()
const App = () => {
  const url = 'https://mocks.alibaba-inc.com/mock/alist/data'

  return (
    <div>
      <List actions={actions} url={url} pageSize={5}>
        <Button style={{ marginRight: '8px' }} onClick={() => {
          actions.setTableProps({
            rowSelection: {
              primaryKey: 'value',
              selectedRowKeys: [],
              onChange: (ids) => {
                const { rowSelection } = actions.getTableProps()
                actions.setTableProps({                  
                  rowSelection: {
                    ...rowSelection,
                    selectedRowKeys: ids,
                  }
                })
              }
            }
          })
        }}>enable RowSelection</Button>

        <Selection>
          {(opts) => {
            const { ids, selectedAll, selectedNone } = opts || {}
            return <div>current selected items{(ids || []).length}, selectedAll: {`${selectedAll}`} selecedNone: {`${selectedNone}`}</div>
          }}
        </Selection>
        <Table primaryKey="value">
          <Table.Column title="label" dataIndex="label" />
          <Table.Column title="value" dataIndex="value" />
        </Table>
      </List>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

#### RowSelection

针对选择受控的场景，有特定的受控API `setRowSelection` 启用选择模式, `disableRowSelection` 关闭选择模式。

`setRowSelection`参数请查看: [selectionConfig](#selectionConfig)。
如有不满足的场景，可以使用 `setTableProps`

```jsx
import React, { useEffect } from 'react'
import { Button, Checkbox } from 'antd'
import { List, Table, Pagination, Selection, createListActions } from '@alist/antd'
import'antd/dist/antd.css'

const actions = createListActions()
window.acc = actions
const App = () => {
  const url = 'https://mocks.alibaba-inc.com/mock/alist/data'

  return (
    <div>
      <List actions={actions} url={url} pageSize={5}>
        <Button style={{ marginRight: '8px' }} onClick={() => {
          actions.setRowSelection({ primaryKey: 'value' })
        }}>enable RowSelection</Button>

        <Button style={{ marginRight: '8px' }} onClick={() => {
          actions.disableRowSelection()
        }}>disabled RowSelection</Button>

        <Button style={{ marginRight: '8px' }} onClick={() => {
          const { mode } = actions.getSelectionConfig()
          actions.setRowSelection({ mode: mode === 'multiple' ? 'single' : 'multiple' })
        }}>toggle mode</Button>

        <Selection>
          {(opts) => {
            const { ids, selectedAll, selectedNone } = opts || {}
            return <div>current selected items{(ids || []).length}, selectedAll: {`${selectedAll}`} selecedNone: {`${selectedNone}`}</div>
          }}
        </Selection>
        <Selection>
            {(opts, list) => {
            const { allIds, ids, selectedAll, selectedNone, dataSource, } = opts || {}
            const text = `已选中${(ids || []).length}结果`
            const checkedProps = {}
            if (selectedAll) { // 全选
                checkedProps.checked = true
                checkedProps.indeterminate = false
            } else if (selectedNone) { // 不选
                checkedProps.checked = false
                checkedProps.indeterminate = false
            } else if ((ids || []).length > 0) { // 部分选中
                checkedProps.checked = false
                checkedProps.indeterminate = true
            }
            return <div style={{ color: '#333' }}>
                <Checkbox {...checkedProps} onChange={(e) => {
                    if (e.target.checked) {
                        list.setSelections(allIds, dataSource)    
                    } else {
                        list.setSelections([], [])
                    }
                }} />
                {text}
            </div>
            }}
        </Selection>
        <Table rowKey="value">
          <Table.Column title="label" dataIndex="label" />
          <Table.Column title="value" dataIndex="value" />
        </Table>
      </List>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

#### Consumer

```jsx
import { createListActions, Consumer, List, Table, Pagination, Filter, Layout, Search, Clear } from '@alist/antd'

const actions = createListActions()
window.cc = actions
const App = props => {
  const { children, ...others } = props
  const url = 'https://mocks.alibaba-inc.com/mock/alist/data'

  return (
    <List actions={actions} url={url}>
      <Consumer>
        {list => {
          const { currentPage, pageSize } = list.getPageData()
          const filterData = list.getFilterData()
          const paginationedData = list.getPaginationDataSource()
          const originData = list.getDataSource()
          return (
            <div>
              dataSource: {paginationedData.length} <br />
              age: {filterData.age} <br />
              username: {filterData.username} <br />
              currentPage:{currentPage} <br />
              pageSize:{pageSize} <br />
            </div>
          )
        }}
      </Consumer>
      <Filter>
          <Filter.Item type="input" name="username" title="username" />
          <Filter.Item type="input" name="age" title="age" />
          <Layout.ButtonGroup>
            <Search>Search</Search>
            <Clear>Clear</Clear>
          </Layout.ButtonGroup>
        </Filter>
      <Table primaryKey="value">
          <Table.Column title="label" dataIndex="label" />
          <Table.Column title="value" dataIndex="value" />
        </Table>
    </List>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

#### isLoop

`isLoop` 处理有`children`并且格式一致的数据，自动生成嵌套Table结构。
配合 `defaultOpenAll` 和 `ToggleTrigger` 可以控制嵌套Table的展开收起。

```jsx
import React from 'react'
import { ToggleTrigger, List, Table, Pagination, createListActions } from '@alist/antd'
import '@alifd/next/dist/next.css'

const actions = createListActions()

const App = () => {
  
  const ds = [
    { 
        id: 'c1', cate: 'premium', name: 'Route 1', warehouse: 'Warehouse 1', price: '$100',
        children: [
            { id: 'c1-1', cate: 'premium', name: 'Route 1-1', warehouse: 'Warehouse 1-1', price: '$101' },
            { id: 'c1-2', cate: 'premium', name: 'Route 1-2', warehouse: 'Warehouse 1-2', price: '$102' },
            { id: 'c1-3', cate: 'premium', name: 'Route 1-3', warehouse: 'Warehouse 1-3', price: '$103' }
        ]
    },
    {
        id: 'err',
        isErrorRoot: true,
        children: [
            { 
                id: 'c2', cate: 'premium', name: 'Route 2', warehouse: 'Warehouse 2', errMsg: 'out of service',
                children: [
                    { id: 'c2-1', cate: 'premium', name: 'Route 2-1', warehouse: 'Warehouse 2-1', errMsg: 'out of service' },
                    { id: 'c2-2', cate: 'premium', name: 'Route 2-2', warehouse: 'Warehouse 2-2', errMsg: 'out of service' },
                    { id: 'c2-3', cate: 'premium', name: 'Route 2-3', warehouse: 'Warehouse 2-3', errMsg: 'out of service' },
                ]
            },
            { 
                id: 'c3', cate: 'premium', name: 'Route 3', warehouse: 'Warehouse 3', errMsg: 'out of service',
                children: [
                    { id: 'c3-1', cate: 'premium', name: 'Route 3-1', warehouse: 'Warehouse 3-1', errMsg: 'out of service' },
                    { id: 'c3-2', cate: 'premium', name: 'Route 3-2', warehouse: 'Warehouse 3-2', errMsg: 'out of service' },
                    { id: 'c3-3', cate: 'premium', name: 'Route 3-3', warehouse: 'Warehouse 3-3', errMsg: 'out of service' }
                ]
            },
        ]
    }
]

  return (
    <div>
      <List dataSource={ds} >
        <Table isLoop
          defaultOpenAll
          rowKey="id"
        >
          <Table.Column width={200} title="Category" dataIndex="category" render={(val, record, index) => {
              if (record.isErrorRoot) {
                  return {
                    children: <ToggleTrigger id={record.id} expandText="show invalid route" unExpandText="hide invalid route" />,
                    props: {
                      colSpan: 3
                    }
                  }
              } else {
                  return {
                    children: record.cate,
                    props: { colSpan: 1 }
                  }
              }
          }} />
          <Table.Column title="Warehouse" dataIndex="warehouse" render={(val, record, index) => {
              if (record.isErrorRoot) {
                return {
                  chidlren: null,
                  props: { colSpan: 0 }
                }
              }

              return <div>
                  { record.children ? <ToggleTrigger
                      id={record.id}
                      expandText="expand"
                      unExpandText="collapse"
                  >{record.warehouse}</ToggleTrigger> : record.warehouse }
              </div>
          }} />
          <Table.Column width={200} title="Price" dataIndex="price" render={(val, record, index) => {
              if (record.isErrorRoot) {
                return {
                  chidlren: null,
                  props: { colSpan: 0 }
                }
              }

              if (record.errMsg) {
                return <div style={{ color: 'red' }}>{record.errMsg}</div>
              } else {
                return val
              }
          }} />
        </Table>
        <Pagination />
      </List>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

### Components

#### List

列表容器组件，用法及参数如下：

**用法**

```tsx
import { List, Table, Pagination } from '@alist/antd'

const App = (props) => {
  return <List dataSource={[]}>
    <Table>
        <Table.Column title="label" dataIndex="label" />
        <Table.Column title="value" dataIndex="value" />
      </Table>
    <Pagination />
  </List>
}
```

| 属性名称 | 属性描述 | 属性类型 | 默认值 |
| ---- | ---- | ---- | --- |
| url | 列表发起请求的url，若设置则为请求模式 | `string` |  |
| dataSource | 将列表变为受控模式，dataSource会自动根据pageSize进行分页 | `Array<any>` |  |
| effects | 副作用处理函数 | `Effects`|  |
| actions | 列表操作api实例，只接收通过[createListActions](#/97UlUl/XEFAF7HoHV)/[createAsyncListActions](#createAsyncListActions)创建出来的actions | `ListActions|AsyncListActions` |  |
| style | 容器样式 | `React.CSSProperties` | {} |


#### Filter

搜索框， 用法及参数如下：

**用法**

```tsx
import { List, Table, Pagination, Filter } from '@alist/antd'

const App = (props) => {
  const { children, ...others } = props
  return <List dataSource={[]}>
    <Filter>
      <Filter.Item name="useranme" title="useranme" type="input">
    </Filter>
    <Table>
        <Table.Column title="label" dataIndex="label" />
        <Table.Column title="value" dataIndex="value" />
      </Table>
    <Pagination />
  </List>
}
```

**参数**

| 属性名称 | 属性描述 | 属性类型 | 默认值 |  |
| ---- | ---- | ---- | --- | --- |
| autoAddColon | 是否自动添加冒号 | `boolean` |  |  |
| className | className | `string` |  |  |
| inline | 是否是单行布局 | `boolean` | false |  |
| layout | 表单布局(horizontal/vertical/inline)，只有@uform/antd支持 | `'horizontal'|'vertical'|'inline'`  | horizontal|
| maxTipsNum | 针对Field description的最大提示字符数，如果超出该字符数，则会以PopTips的形式展示 | `number` | 30 |
| labelAlign | 标签的位置<br /><br />可选值:<br />'top'(上)<br />'left'(左)<br /> | `'top'|'left'` | 'left' |  |
| labelCol | 控制所有子节点的labelCol | `number|{span: number, offset: number}` |  | |
| labelTextAlign | 标签的左右对齐方式<br /><br />可选值:<br />'left'(左)<br />'right'(右) | `'left'|'right'` |  |  |
| prefix | className前缀 | string | 'next-' | 'antd-' |
| size | 表单尺寸 <br /><br />可选值:<br />'large'(大)<br />'medium'(中)<br />'small'(小) | `'large'|'medium'|'small'` | 'medium' |  |
| style | 样式对象 | `React.CSSProperties` |  |  |
| wrapperCol | 控制所有子节点wrapperCol |  `number|{span: number, offset: number}`  |  | |


#### Consumer

动态消费列表实例的组件，用法及参数如下：

**用法**

```tsx
import { Consumer, List, Table, Pagination, Filter } from '@alist/antd'

const App = (props) => {
  const { children, ...others } = props
  return <List dataSource={[]}>
    <Consumer>
      {(list) => {
        const { currentPage, pageSize, } = list.getPageData()
        const paginationedData = list.getPaginationDataSource()
        const originData = list.getDataSource() 
        return <div>
          currentPage:{currentPage} <br/>
          pageSize:{pageSize} <br/>
        </div>
      }}
    </Consumer>
  </List>
}
```

**参数**

| 属性名称 | 属性描述 | 属性类型 | 默认值 |  |
| ---- | ---- | ---- | --- | --- |
| children | 渲染内容 | `(list : IList) => JSX.Element|null` |  |


#### MultipleProvider

多实例列表容器，用法及参数如下：

```tsx
import React, { useEffect } from 'react'
import {
  List, Table, Pagination, MultipleProvider,
  createListActions,
} from '@alist/antd'

const actions = createListActions() 
const App = () => {  
  useEffect(() => {
    actions.setMultipleData({
      a1: getDataSource(15), // mock data
      a2: getDataSource(15), // mock data
    })
  }, [])

  return <div>
    <h1>多列表实例模式</h1>
    <h5>同一份接口数据，多个列表实例消费</h5>
    <List actions={actions}>
      <h3>List 1 pageSize: 10</h3>
      <MultipleProvider id="a1">
        <Table>
        <Table.Column title="label" dataIndex="label" />
        <Table.Column title="value" dataIndex="value" />
      </Table>
        <Pagination />
      </MultipleProvider>      

      <h3>List 2 pageSize: 3</h3>
      <MultipleProvider id="a2" pageSize={3}>
        <Table>
          <Table.Column title="label" dataIndex="label" />
          <Table.Column title="value" dataIndex="value" />
        </Table>
        <Pagination />
      </MultipleProvider>
    </List>
  </div>
}
```

**参数**

| 属性名称 | 属性描述 | 属性类型 | 默认值 |  |
| ---- | ---- | ---- | --- | --- |
| id | 多实例数据id | `string` |  |
| pageSize | 多实例数据分页大小 | `number` |  |

#### Pagination

分页占位符, 不需要填写参数，由列表自动控制参数，用法如下：

```tsx
import { List, Table, Pagination } from '@alist/antd'

const App = (props) => {
  return <List dataSource={[]}>
    <Pagination />
    <Table>
      <Table.Column title="label" dataIndex="label" />
      <Table.Column title="value" dataIndex="value" />
    </Table>
    <Pagination />
  </List>
}
```

#### Table

真正的列表实体，由列表组件控制数据, 其他参数完全透传到 `@alifd/next` 的 `<Table>`

```tsx
import { List, Table, Pagination } from '@alist/antd'

const App = (props) => {
  return <List dataSource={[]}>
    <Table>
      <Table.Column title="label" dataIndex="label" />
      <Table.Column title="value" dataIndex="value" />
    </Table>
  </List>
}
```



### Hook

#### useList

获取 `List` 实例, `<List/>` 中已内置此方法

**签名**

```typescript
type useList = (options: IListUIProps): IList
```

**用法**

```typescript
import { useList } from '@alist/antd'

const List: React.FC<any> = (props = {}) => {
  const { children, ...others } = props || {};
  const list = useList(others)
  let element
  if (typeof children === 'function') {
      element = children(list)
  } else {
      element = children || React.Fragment
  }
  
  return (
    <ListContext.Provider value={list}>
      {element}
    </ListContext.Provider>
  )
}
```


### API

> API 完全继承自 @alist/react. 下方为 @alist/next 特有的API

---


#### `createListActions`

> 返回 [IListActions](#IListActions)

**签名**

```typescript
createListActions(): IListActions
```

**用法**

```typescript
import { createListActions } from '@alist/antd'

const actions = createListActions()
console.log(actions.getPageData())
console.log(actions.getDataSource())
```

#### `createAsyncListActions`

> 返回 [IListAsyncActions](#IListAsyncActions)

**签名**

```typescript
createAsyncListActions(): IListAsyncActions
```

**用法**

```typescript
import { createAsyncListActions } from '@alist/antd'

const actions = createAsyncListActions()
console.log(actions.getPageData().then(val => console.log(val))
console.log(actions.getDataSource().then(val => console.log(val))
```

#### `ListEffectHooks`

> 返回所有 @alist/core 的lifeCycles hook

**用法**

```tsx
import { ListEffectHooks, List } from '@alist/antd'
const {
  /**
   * List 生命周期管理
   **/
  // 开始初始化
  onListWillInit$,
  // 完成初始化
  onListInit$,
} = ListEffectHooks

const App = () => {
  return (
    <List
      effects={() => {
        onListInit$().subscribe(() => {
          console.log('initialized')
        })
      }}
    >
      ...
    </List>
  )
}
```

#### createListEffectHook

> 自定义effect hook

**签名**

```typescript
(type: string): Observable<TResult>
```

**用法**

```jsx
import { List, createListEffectHook, createListActions } from '@alist/antd'

const actions = createListActions()
const diyHook1$ = createListEffectHook('diy1')
const diyHook2$ = createListEffectHook('diy2')

const App = () => {
  return (
    <List
      actions={actions}
      effects={() => {
        diyHook1$().subscribe((payload) => {
          console.log('diy1 hook triggered', payload)
        })

        diyHook2$().subscribe((payload) => {
          console.log('diy2 hook triggered', payload)
        })
      }}
    >
      <button onClick={() => {
        actions.notify('diy1', { index: 1 })
      }}>notify diy1</button>
      <button onClick={() => {
        actions.notify('diy2', { index: 2 })
      }}>notify diy2</button>
    </List>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```


### Interfaces

> Interfaces 完成继承自 @alist/core. 下列为 @alist/next 特有的Interfaces。

---

#### IListMode

```typescript
declare enum ModeType {
    DATASOURCE = "dataSource",
    URL = "url",
    QUERY = "query"
}
declare type IListMode = ModeType.DATASOURCE | ModeType.URL | ModeType.QUERY;
```

#### IList

```typescript
interface IList {
    // set dataSource raw data
    getDataSource: () => IListDataSource;
    // set dataSource raw data
    setDataSource: (data: IListDataSource) => void;
    // set dataSource pagninated data
    setPaginationDataSource: (data: IListDataSource) => void;
    // set dataSource pagninated data
    getPaginationDataSource: () => IListDataSource;
    // get mode: dataSource | url | mutliple
    getMode: () => IListMode;
    // get search area data
    getFilterData: () => IListFilterData;
    // set search area data
    setFilterData: (data: IListFilterData) => void;
    // get uform instance
    getFilterInstance: () => any;
    // get uform instance construct params
    getFilterProps: () => IFilterInitProps;
    // set uform instance
    setFilterInstance: (form?: any) => void;
    // get pagination data
    getPageData: () => IListPageData;
    // set pagination data
    setPageData: (data: IListPageData) => void;
    // get multiple data which enable in multiple mode
    getMultipleData: () => IListMultipleData;
    // set multiple data which enable in multiple mode
    setMultipleData: (data: IListMultipleDataParams) => void;
    // set pageSize of multiple data which enable in multiple mode
    setMultiplePageSize: (data: IListMultiplePageSize) => void;
    // get validate config of search area
    getValidateConfig: () => IListKVMap<any>;
    // set validate config of search area
    setValidateConfig: (validateConfig?: IListKVMap<any>) => void;
    // clear search area data
    clear: () => void;
    // request
    search: () => void;
    // reset search area data
    reset: () => void;
    // 
    refresh: () => void;
    // set loading status of list
    setLoading: (loading: boolean, fnOpts?: IListFunctionOptions) => void;
    // get loading status of list
    getLoading: () => boolean;
    // set url
    setUrl: (url: string, fnOpts?: IListFunctionOptions) => void;
    // customize query
    setQuery: (query: IListQuery, fnOpts?: IListFunctionOptions) => void;
    // set params which will automatically change url params
    setParams: (params: IListParams, fnOpts?: IListFunctionOptions) => void;
    // get from url params
    getParams: () => IListParams;
    // set current page
    setCurrentPage: (currentPage: number, fnOpts?: IListFunctionOptions) => void;
    // set page size
    setPageSize: (pageSize: number) => void;
    // trigger list effects or customize effects
    notify: (type: ListLifeCycleTypes, paylaod?: any) => void;
    // triggered when lifeCycle function been notified
    on: (key: EventType, cb?: IListEvent) => void;
    // remove listening function
    removeListener: (key: EventType, cb?: IListEvent) => void;
}
```

#### IListActions

```typescript
export interface IListActions {
  getDataSource: () => IListDataSource,
  setDataSource: (data: IListDataSource) => void,
  setPaginationDataSource: (data: IListDataSource) => void,
  getPaginationDataSource: () => IListDataSource,
  getMode: () => IListMode,
  getFilterData: () => IListFilterData,
  setFilterData: (data: IListFilterData) => void,
  getFilterInstance: () => any,
  getFilterProps: () => IFilterInitProps,
  setFilterInstance: (form?: any) => void,
  getPageData: () => IListPageData,
  setPageData: (data: IListPageData) => void,
  getMultipleData: () => IListMultipleData,
  setMultipleData: (data: IListMultipleDataParams) => void,
  setMultiplePageSize: (data: IListMultiplePageSize) => void,
  getValidateConfig: () => IListKVMap<any>,
  setValidateConfig: (validateConfig?: IListKVMap<any>) => void,
  clear: () => void,
  search: () => void,
  reset: () => void,
  refresh: () => void,
  setLoading: (loading: boolean, fnOpts?: IListFunctionOptions) => void,
  getLoading: () => boolean,
  setUrl: (url: string, fnOpts?: IListFunctionOptions) => void,
  setQuery: (query: IListQuery, fnOpts?: IListFunctionOptions) => void,
  setParams: (params: IListParams, fnOpts?: IListFunctionOptions) => void,
  getParams: () => IListParams,
  setCurrentPage: (currentPage: number, fnOpts?: IListFunctionOptions) => void,
  setPageSize: (pageSize: number) => void,
  on: (key: EventType, cb?: IListEvent) => void
  notify: (type: ListLifeCycleTypes, paylaod?: any) => void,
  removeListener: (key: EventType, cb?: IListEvent) => void,
}
```

#### IListAsyncActions

```typescript
export interface IListAsyncActions {
  getDataSource: () => Promise<IListDataSource>,
  setDataSource: (data: IListDataSource) => Promise<void>,
  setPaginationDataSource: (data: IListDataSource) => Promise<void>,
  getPaginationDataSource: () => Promise<IListDataSource>,
  getMode: () => Promise<IListMode>,
  getFilterData: () => Promise<IListFilterData>,
  setFilterData: (data: IListFilterData) => Promise<void>,
  getFilterInstance: () => Promise<any>,
  getFilterProps: () => Promise<IFilterInitProps>,
  setFilterInstance: (form?: any) => Promise<void>,
  getPageData: () => Promise<IListPageData>,
  setPageData: (data: IListPageData) => Promise<void>,
  getMultipleData: () => Promise<IListMultipleData>,
  setMultipleData: (data: IListMultipleDataParams) => Promise<void>,
  setMultiplePageSize: (data: IListMultiplePageSize) => Promise<void>,
  getValidateConfig: () => Promise<IListKVMap<any>>,
  setValidateConfig: (validateConfig?: IListKVMap<any>) => Promise<void>,
  clear: () => Promise<void>,
  search: () => Promise<void>,
  reset: () => Promise<void>,
  refresh: () => Promise<void>,
  setLoading: (loading: boolean, fnOpts?: IListFunctionOptions) => Promise<void>,
  getLoading: () => Promise<boolean>,
  setUrl: (url: string, fnOpts?: IListFunctionOptions) => Promise<void>,
  setQuery: (query: IListQuery, fnOpts?: IListFunctionOptions) => Promise<void>,
  setParams: (params: IListParams, fnOpts?: IListFunctionOptions) => Promise<void>,
  getParams: () => Promise<IListParams>,
  setCurrentPage: (currentPage: number, fnOpts?: IListFunctionOptions) => Promise<void>,
  setPageSize: (pageSize: number) => Promise<void>,
  on: (key: EventType, cb?: IListEvent) => Promise<void>
  notify: (type: ListLifeCycleTypes, paylaod?: any) => Promise<void>,
  removeListener: (key: EventType, cb?: IListEvent) => Promise<void>,
}
```

#### IListUIProps

```typescript
interface IListUIProps {
    dataSource?: any;
    validateConfig?: IListKVMap<any>;
    url?: string;
    method?: IListQueryMethod;
    params?: any;
    paramsFields?: string | string[];
    pageSize?: number;
    currentPage?: number;
    total?: number;
    totalPages?: number;
    autoLoad?: boolean;
    defaultFilterValues?: any;
    multiple?: boolean;
    filterConfig?: any;
    query?: IListQuery;
    formatBefore?: (queryData: IListQueryData) => any | void;
    formatAfter?: (response: any) => any | void;
    formatFilter?: (filterData: IListFilterData) => any | void;
    lifeCycles?: ListLifeCycle[];
    effects?: IListEffect,
    actions?: any,
    afterInitialized?: (list: IList) => void
}
```

#### ITableProps

```typescript
interface ITableProps {
    children?: React.ReactElement | ((...args: any) => React.ReactElement),
    multipleId?: string
}
```
