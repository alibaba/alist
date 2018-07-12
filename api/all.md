# API

```i18n

# 初始化

### 构建

目前noform暴露的入口有以下：基础入口， wrapper， dialog

@sep

# Initialized

### Import

Now NoForm has these entry: `Fundation`, `Wrapper`, `Dialog`, `Repeater`

* Foundation: Form(Default), FormItem, Item, If, FormCore.

* Wrapper: noform/lib/dialog/antd

* Dialog: noform/lib/dialog/antd

* Repeater: noform/lib/repeater/antd

```

```jsx
import Form, { FormItem, Item, If, FormCore } = noform; // import
import antdWrapper from 'noform/lib/wrapper/antd';
import DialogWrapper from 'noform/lib/dialog/antd';
```

```i18n

### 接入外部组件库

@sep

### Combined with 3rd party library

```


```jsx
import * as antd from 'antd';

const DialogForm = noformDialog.antd(antd);
const { Select, Button, Input ...othersComponent } = antdWrapper(antd);

```

```i18n

### 构建核心

@sep

### Implement FormCore Instance

```

```jsx

componentDidMount = () => {
    const opts = { // constructor params
        values, // field's values eg. { username: 'bobby', age: 18 }
        status, // field's status eg. { username: 'edit', age, 'preview' ... }
        globalStatus, // global Status ENUM ['edit', 'preview', 'disabled']
        interceptor, // interceptor
        onChange, // handler when values change
        validateConfig, // validate rules
    };
    this.core = new FormCore(opts);
}

```

```i18n
# onChange 监听变更

两种注册onChange的方法，一种在构建时设定，一种监听`change`事件。

@sep

# onChange

There are 2 ways to register onChange handler:
1. Setting as consturctor arguments.
2. Register 'change' event.

```

```jsx

// Arguments:
// * changeKeys: array    keys of changed fields
// * value:      object   values of all the fields of form
// * core:       FormCore FormCore instance
const handler = (changeKeys, value, core) => {}

// way 1： Setting as consturctor arguments.
this.core = new FormCore({
    onChange: handler
})

// way 2： Register 'change' event.
this.core.on('change', handler)

```

```i18n

# interceptor 拦截器

拦截器能够在设置值之前做自定义的修改, interceptor接受方法，返回值可以是 `值` 或 `promise`

@sep

# interceptor

Interceptor can custom modify value when value changed.
Interceptor also receive promise as its result.

```

```jsx
new FormCore({
    interceptor: {
        money: (rawMoney) => {
            return parseInt(rawMoney); // or Promise
        }
    }
})
```

```i18n

# 核心操作

### 获取/修改值(values)

每次执行setValue/setValues方法会触发`onChange`变更

@sep

# Core Manuplation

### get/set (values)

execute setValue/setValues will trigger `onChange` event.

```

```i18n/jsx
this.core.getValues(); // 获取整体表单的值
this.core.getValue('username'); // 获取单字段值
this.core.setValues({ username: 'bobby' }); // 设置整体表单的值
this.core.setValue('username', 'bobby'); // 设置单字段的值

@sep

this.core.getValues(); // get values of all fields
this.core.getValue('username'); // get value of single item
this.core.setValues({ username: 'bobby' }); // set values of all fields
this.core.setValue('username', 'bobby'); // set value of single item
```

```i18n

### 获取/修改状态(status)

状态枚举包含: `edit`, `preview`, `disabled` 三种状态

@sep

### get/set (status)

Status Enum: `edit`, `preview`, `disabled`

```

```i18n/jsx
this.core.getStatus(); // 获取整体表单的状态
this.core.getStatus('username'); // 获取单字段状态
this.core.setStatus({ username: 'preview' }); // 设置整体表单的状态
this.core.setStatus('username', 'disabled'); // 设置单字段的状态
this.core.getGlobalStatus(); // 获取全局状态
this.core.setGlobalStatus('edit'); // 设置全局状态

@sep

this.core.getStatus(); // get status of all fields
this.core.getStatus('username'); // get status of single item
this.core.setStatus({ username: 'preview' }); // set status of all fields
this.core.setStatus('username', 'disabled'); // set status of single item
this.core.getGlobalStatus(); // get global status
this.core.setGlobalStatus('edit'); // set global status

```



```i18n

### 获取/修改属性信息(props)

FormItem属性保留字为： `label`, `prefix`, `suffix`, `help`, `hint`, `top`, `required`

@sep

### set/get(props)

The reserved word of FormItem is： `label`, `prefix`, `suffix`, `help`, `hint`, `top`, `required`

```

```i18n/jsx
this.core.getProps('username'); // get props of single item
this.core.setProps('username', { dataSource: [
    { label: 'bobby', value: 'bobby'},
    { label: 'leslie', value: 'leslie'}
] }); // set props of single item

@sep

this.core.getProps('username'); // 获取单字段属性
this.core.setProps('username', { dataSource: [
    { label: 'bobby', value: 'bobby'},
    { label: 'leslie', value: 'leslie'}
] }); // 获取单字段状态

```

```i18n

setProps最常用的场景是替换类似`<Select>`组件的dataSource，并且不会像setState引起全局的渲染。
NoForm的治理思想是state和core不混用，表单页面仅仅使用core来控制，避免不必要的渲染。

@sep

The most common scene for `setProps` is to change dataSource of component like `<Select>`, and it can avoid unnecessary render.

The philosophy of NoForm is seperate `state` and `core`.
In Form area, we recommand just use core to control, which avoid unnecessary render.

```



```i18n

### 获取/修改错误信息(error)

注： 错误信息的空值为null

@sep

### get/set (error)

NOTE： null means no error

```


```i18n/jsx
this.core.getError(); // 获取整体表单的错误信息
this.core.getError('username'); // 获取单字段错误信息
this.core.setError({ username: 'username is required' }); // 设置整体表单的错误信息
this.core.setError('username', 'username is required'); // 设置单字段的错误信息
@sep
this.core.getError(); // get errors of all fields
this.core.getError('username'); // get error of single item
this.core.setError({ username: 'username is required' }); // set errors of all fields
this.core.setError('username', 'username is required'); // set error of single item
```


```i18n

> 注：setError是实现校验的底层的方法，如需校验表单，请查看[校验章节](/docs?md=basic/validation)了解更多。

@sep

> NOTE：setError is more like inner method，If you need to dive deep to validaton of  NoForm, Please check [Validate](/docs?md=basic/validation) for more information.

```

