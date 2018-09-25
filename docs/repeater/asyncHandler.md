```i18n

### 钩子与拦截函数

查看DEMO可以直接看到更详细的配置，请参考[Repeater 钩子](https://alibaba.github.io/noform/examples/build/#/RepeaterAdvanced)

该配置函数能够控制 Repeater的以下操作： `add`, `update`, `save`, `remove`

通用格式如下：

@sep

### Hook and Interceptor

Check this DEMO for more detail[Repeater Advanced](https://alibaba.github.io/noform/examples/build/#/RepeaterAdvanced)

This config can control these operate: `add`, `update`, `save`, `remove`

Common Useage: 

```

```jsx

const asyncHandler = {
    add: () => {},
    update: () => {},
    save: () => {},
    remove: () => {}
};

<Repeater asyncHandler={asyncHandler}>

```

```i18n

asyncHandler 函数可以用 `async` 或 返回 `promise`

### 1. 简单返回 Boolean

`true` 代表成功， `false` 表示失败。

@sep

asyncHandler function can be `async` function or return `Promise`

### 1. Return Boolean

`true` means success, `false` means failed.

```

```jsx

add: async () => {
    return true;
}

```

```i18n

### 2. 返回Object

> 注意：返回object不能混用 `values` 和 `item`, 只能使用其中的一个。

@sep

### 2. Return Object

> Notice: object can not mixed up `values` and `item`. You can only use one of them each time.

```

* success(true|false)
* values(Array) 
* item(Object)

```jsx

add: async () => {
    // #0 failed
    return {
        success: false
    }

    // #1 replace all
    return {
        success: true,
        values: []
    }

    // #2 replace current item
    return {
        success: true,
        item: singleItem
    }
}

```