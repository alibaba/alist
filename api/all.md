# API

# 初始化

### 构建

目前noform暴露的入口有以下：基础入口， wrapper， dialog

```jsx
import Form, { FormItem, Item, If, FormCore } = noform; // 基础
import antdWrapper from 'noform/dist/wrapper/antd';
import DialogWrapper from 'noform/dist/dialog/antd';
```

### 接入外部组件库

```jsx
import * as antd from 'antd';

const DialogForm = noformDialog.antd(antd);
const { Select, Button, Input ...需要的组件 } = antdWrapper(antd);

```

### 构建核心

```jsx

componentDidMount = () => {
    const opts = { // 构建入参        
        values, // 所有表单空间的值 { username: 'bobby', age: 18 }
        status, // 所有表单控件状态 { username: 'edit', age, 'preview' ... }
        globalStatus, // 全局状态 ['edit', 'preview', 'disabled']
        interceptor, // 拦截器
        onChange, // 表单控件值发生变化时触发
        validateConfig, // 校验规则
    };
    this.core = new FormCore(opts);
}

```

# onChange 监听变更

两种注册onChange的方法，一种在构建时设定，一种监听`change`事件。

```jsx

// 入参分别为:
// * changeKeys: array    本次变动的key数组
// * value:      object   当前表单的所有值
// * core:       FormCore 表单核心 
const handler = (changeKeys, value, core) => {}

// 方法1： 构建时设定
this.core = new FormCore({
    onChange: handler
})

// 方法2： 调用
this.core.on('change', handler)// 直接注册
```

# interceptor 拦截器

拦截器能够在设置值之前做自定义的修改, interceptor接受方法，返回值可以是 `值` 或 `promise`

```jsx
new FormCore({
    interceptor: {
        money: (rawMoney) => {
            return parseInt(rawMoney); // or Promise
        }
    }
})
```

# 核心操作

### 获取/修改值(values)

每次执行setValue/setValues方法会触发`onChange`变更

```jsx
this.core.getValues(); // 获取整体表单的值
this.core.getValue('username'); // 获取单字段值
this.core.setValues({ username: 'bobby' }); // 设置整体表单的值
this.core.setValue('username', 'bobby'); // 设置单字段的值
```

### 获取/修改状态(status)

状态枚举包含: `edit`, `preview`, `disabled` 三种状态

```jsx
this.core.getStatus(); // 获取整体表单的状态
this.core.getStatus('username'); // 获取单字段状态
this.core.setStatus({ username: 'preview' }); // 设置整体表单的状态
this.core.setStatus('username', 'disabled'); // 设置单字段的状态
this.core.getGlobalStatus(); // 获取全局状态
this.core.setGlobalStatus('edit'); // 设置全局状态
```

### 获取/修改属性信息(props)

FormItem属性保留字为： `label`, `prefix`, `suffix`, `help`, `hint`, `top`, `required`

```js
this.core.getProps('username'); // 获取单字段属性
this.core.setProps('username', { dataSource: [
    { label: 'bobby', value: 'bobby'},
    { label: 'leslie', value: 'leslie'}
] }); // 获取单字段状态
```

setProps最常用的场景是替换类似`<Select>`组件的dataSource，并且不会像setState引起全局的渲染。
NoForm的治理思想是state和core不混用，表单页面仅仅使用core来控制，避免不必要的渲染。

### 获取/修改错误信息(error)

注： 错误信息的空值为null

```jsx
this.core.getError(); // 获取整体表单的错误信息
this.core.getError('username'); // 获取单字段错误信息
this.core.setError({ username: 'username is required' }); // 设置整体表单的错误信息
this.core.setError('username', 'username is required'); // 设置单字段的错误信息
```
> 注：setError是实现校验的底层的方法，如需校验表单，请查看[校验章节](/docs?md=basic/validation)了解更多。

