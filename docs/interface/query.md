## 标准请求格式

![standard-query-flow](https://img.alicdn.com/tfs/TB1.w1EwQL0gK0jSZFxXXXWHVXa-2002-290.png)

如图所示为一次请求的过程，请求的参数为 [IListQueryData](#IListQueryData)，返回结果为 [IListResponse](#IListResponse)。

#### IListQueryData

| 参数       | 说明                             | 类型                 | 默认值               |
|:----------|:---------------------------------|:--------------------|:--------------------|
| sort    |排序配置                  | { [key: string]: 'desc' `|` 'asc' } |                |
| currentPage    |当前页                  | number |                |
| pageSize    |分页大小                  | number |   10             |
| filterData    |搜索区域表单values                  | {[key]: any} |   {}             |


#### IListResponse

| 参数       | 说明                             | 类型                 | 默认值               |
|:----------|:---------------------------------|:--------------------|:--------------------|
| dataList    |数据列表，对应Table的`dataSource`                  | any[] |                |
| multipleData    |如果有此字段，即为多实例模式                  | { string: any[] } |                |
| total    |总条目数                  | number |                |
| pageSize    |分页大小                  | number | 10               |
| currentPage    |当前页数                  | number |                |
| totalPages    |总页面数                  | number |                |


## 修改请求流程

只需要满足入参及出参均符合标准，`AList` 会负责相关数据和渲染的工作，用户能够通过以下几种方式影响流程：

> 更多示例可以查看 [定制请求](#)

* `formatFilter` 修改搜索数据，即 `filterData`
* `formatBefore` 修改请求前的数据，即 `IListQueryData`
* `formatAfter` 修改请求返回后的数据，返回值 **必须** 为 `IListResponse`。
* `query` 直接代理整个网络请求的过程，输入为 `IListQueryData`, 返回值 **必须** 为 `IListResponse`。

## formatFilter

常用于根据搜索区域组件值做请求前的调整, 例子：根据code补齐label数据

```tsx
<List formatFilter={(filterData, list) => {
    const [val, objValue] = list.getFieldState('gender', state => state.values)
    return {
        ...filterData,
        genderLabeel: objValue.label
    } 
}}>
    <Filter>
        <Filter.Item type="select" name="gender" enum={[
            { label: 'male', value: 'male' },
            { label: 'female', value: 'female' }
        ]}>
    </Filter>
</List>
```

## formatBefore

最常用的方法，用于调整请求前的数据调整，入参类型为 [IListQueryData](#IListQueryData)。 例子：修改请求数据，打平放入json字段中

```tsx
<List formatBefore={(queryData) => {
    const { filterData, currentPage, pageSize, sort } = queryData
    return {
        json: {
            ...filterData,
            currentPage,
            pageSize,
            sort
        }
    }
}}>
    ...
</List>
```

## formatAfter

用于修改请求返回后的数据, 必须保证返回的数据格式为 [IListResponse](#IListResponse)

```tsx
<List formatAfter={(resp) => {
    const { dataList, multipleData, total, totalPages, currentPage, pageSzie } = resp;
    return resp;
}}>
    ...
</List>
```


## query

直接替换掉默认的请求过程，发生于 **formatBefore** 之后，**formatAfter** 之前。

```tsx
<List query={async (queryData) => {
    const resp = await yourFetch('someApiUrl', {
        json: queryData
    })
    return resp;
}}>
    ...
</List>
```