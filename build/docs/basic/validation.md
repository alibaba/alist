# 校验

NoForm使用[async-validator](https://github.com/yiminghe/async-validator)作为校验器，
所有的校验相关的API和规则与该校验器一致。

NoForm集成了校验器后，在表单中启用校验是非常方便的，下面一步步来介绍。

# DEMO

```onlydemo

    const { default: Form, FormItem, FormCore, If } = noform;
    const { antd: antdWrapper } = noformWrapper;
    const { Input, Button } = antdWrapper(antd);

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

    class App extends React.Component {
        componentWillMount = () => { // 初始化表单核心
            this.core = new FormCore({ validateConfig });
            this.core.onChange = (fireKeys, values, context) => {
                context.validateItem(fireKeys);
            }
        }

        clear = () => {
            this.core.reset();
        }

        validate = () => {
            this.core.validate((err) => {
                if (!err) {

                }
            });
        }

        render() { // 注入核心        
            return <Form core={this.core} layout={{ label: 6, control: 18 }}>
                <FormItem label="username" name="username"><Input /></FormItem>
                <FormItem label="age" name="age"><Input /></FormItem>                
                <FormItem label="操作">
                    <div >
                        <Button style={{ marginRight: 12 }} onClick={this.validate}>校验</Button>
                        <Button style={{ marginRight: 12 }} onClick={this.clear}>清空</Button>
                    </div>
                </FormItem>
            </Form>
        }
    }
    
    ReactDOM.render(<App />, document.getElementById('demo'));

```

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

启用校验同样有两种方式，基于核心或JSX属性，推荐核心的形式。

### 核心形式(推荐)

```jsx
class Demo extends React.Component {
    componentWillMount = () => { // 初始化表单核心
        this.core = new FormCore({ validateConfig }); // 传入validateConfig来启用校验
    }
    render() {
        return <Form core={this.core}>
            <FormItem name="username"><Input /></FormItem>
        </Form>
    }
}

```


### JSX属性

```jsx
class Demo extends React.Component {
    mountCore = (core) => { this.core = core }
    render() { // 传入validateConfig来启用校验
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

# 4. 按需校验

```jsx

this.core = new FormCore({ validateConfig });
this.core.onChange = (fireKeys, values, context) => {
    context.validateItem(fireKeys);
}

```


NoForm会根据校验结果, 自动为 `命中/未命中` 的表单元素 `显示/清理` 错误信息。

# 进阶

### 动态校验

目前可以通过在FormItem上编写validateConfig来设定动态规则

```jsx
const dynamicValidateConfig = (config, formCore) => { // 如果为bobby则不校验， 否则校验必填    
    return (formCore.getValue('username') === 'bobby') ? null : { type: 'string', required: true };
};

const dynamicProps = (props, formCore) => { // required属性也需要动态变化    
    return { required: (formCore.getValue('username') === 'bobby') };    
};

<FormItem label="age" name="age" validateConfig={dynamicValidateConfig} props={dynamicProps}>
    <Input />
</FormItem>

```