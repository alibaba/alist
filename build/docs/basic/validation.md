# 校验

NoForm使用[async-validator](https://github.com/yiminghe/async-validator)作为校验器，
所有的校验相关的API和规则与该校验器一致。

NoForm集成了校验器后，在表单中启用校验是非常方便的，下面一步步来介绍。

# 1. 定义校验规则

```jsx
const validateConfig = {
    username: {type: "string", required: true},
    age: [
        {type: "number", required: true, transform(value) {
            return parseInt(value, 10)
        }},
        {validator(rule, value, callback, source, options) {
            if(value < 18){
                callback(['too young']);
            }
            callback([])
        }}
    ],
    gender: {type: "string", required: true, min: '1'}
}
```

> validateConfig完全与async-validator一致，更多的校验规则请参考[async-validator](https://github.com/yiminghe/async-validator)

# 2. 启用校验

```jsx
class Demo extends React.Component {
    mountCore = (core) => { this.core = core }
    render() {
        // 传入validateConfig来启用校验
        return <Form onMount={this.mountCore} validateConfig={validateConfig} >
            <FormItem name="username"><Input /></FormItem>
        </Form>
    }
}


```

# 3. 触发校验

```jsx
this.core.validate((errors) => {
    if (!errors) {
        // 校验通过
    } else {
        console.log(errors); // { username: '用户名不能为空', age: '年龄必须为数字' }
    }
});

```

NoForm会根据校验结果自动为命中/未命中的表单元素显示/清理错误信息。

# 进阶

### 多字段校验


### 动态校验