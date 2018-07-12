```i18n
# 校验

NoForm使用[async-validator](https://github.com/yiminghe/async-validator)作为校验器，
所有的校验相关的API和规则与该校验器一致。

NoForm集成了校验器后，在表单中启用校验是非常方便的，下面一步步来介绍。

@sep
# Validation

NoForm use [async-validator](https://github.com/yiminghe/async-validator)as its validator and rules and api are consistent with `async-validator`.


```

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
        componentWillMount = () => { // initialized formCore instance
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

        render() { // inject formCore instance        
            return <Form core={this.core} layout={{ label: 6, control: 18 }}>
                <FormItem label="username" name="username"><Input /></FormItem>
                <FormItem label="age" name="age"><Input /></FormItem>                
                <FormItem label="Operation">
                    <div >
                        <Button style={{ marginRight: 12 }} onClick={this.validate}>Validate</Button>
                        <Button style={{ marginRight: 12 }} onClick={this.clear}>Clear</Button>
                    </div>
                </FormItem>
            </Form>
        }
    }
    
    ReactDOM.render(<App />, document.getElementById('demo'));

```

```i18n

# 1. 定义校验规则
@sep

# 1. Validate Config

```

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

```i18n

> validateConfig完全与async-validator一致，更多的校验规则请参考[async-validator](https://github.com/yiminghe/async-validator)

@sep

> validator and rules and api are consistent with `async-validator`. Check[async-validator](https://github.com/yiminghe/async-validator) for more infomations.

```


```i18n

# 2. 启用校验

启用校验同样有两种方式，基于核心或JSX属性，推荐核心的形式。

### 核心形式(推荐)

@sep

# 2. Enable validate

there are 2 ways to add validate Config.

### Use FormCore instance(Recommanded)

```

```jsx
class Demo extends React.Component {
    componentWillMount = () => { // Initialized
        this.core = new FormCore({ validateConfig }); // enable validate by config
    }
    render() {
        return <Form core={this.core}>
            <FormItem name="username"><Input /></FormItem>
        </Form>
    }
}

```

### JSX属性


@sep

### Use JSX props

```


```jsx
class Demo extends React.Component {
    mountCore = (core) => { this.core = core }
    render() { // pass validateConfig as jsx props
        return <Form onMount={this.mountCore} validateConfig={validateConfig} >
            <FormItem name="username"><Input /></FormItem>
        </Form>
    }
}

```

```i18n

# 3. 触发校验
@sep
# 3. Trigger validate

```

```jsx
this.core.validate((errors) => {
    if (!errors) {
        // no error
    } else {
        console.log(errors); // { username: 'username is required', age: 'age is required' }
    }
});

```

```i18n

# 4. 按需校验

@sep

# 4. Validate onChange

```

```jsx

this.core = new FormCore({ validateConfig });
this.core.onChange = (fireKeys, values, context) => {
    context.validateItem(fireKeys);
}

```

```i18n

NoForm会根据校验结果, 自动为 `命中/未命中` 的表单元素 `显示/清理` 错误信息。

# 进阶

### 动态校验

目前可以通过在FormItem上编写validateConfig来设定动态规则

@sep

NoForm will auto `show` or `hide` error message when result of validate changed.

# Advanced

### Dynamic Validate

Now we support JSX props `validateConfig` to implement Dynamic Validate.

```

```jsx
const dynamicValidateConfig = (config, formCore) => { // null means disabled validate    
    return (formCore.getValue('username') === 'bobby') ? null : { type: 'string', required: true };
};

const dynamicProps = (props, formCore) => { // change required props dynamically    
    return { required: (formCore.getValue('username') === 'bobby') };    
};

<FormItem label="age" name="age" validateConfig={dynamicValidateConfig} props={dynamicProps}>
    <Input />
</FormItem>

```