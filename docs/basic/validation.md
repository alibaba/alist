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


```i18n
### 通过JSX属性


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

注意：执行validate方法如果有错误会显示在FormItem底部，如果只希望得到错误而不触发错误渲染，请使用`validateWithoutRender`

@sep

# 3. Trigger validate

Notice：execute validate will cause error render. Use `validateWithoutRender` to get clean validate result.

```

```jsx
const errors = await this.core.validate(); // cause error render
const cleanErrors = await this.core.validateWithoutRender(); // just return error result

```

```i18n

# 4. 按需校验

有两种方式执行按需校验，一种直接在构建函数中传入`autoValidate` 为 `true`, 另一种执行在onhange中执行validateItem。

@sep

# 4. Validate when field Change

There are two ways to execute validate when field change.
One is set `autoValidate` `true` in constructor and andother one is manually execute API `validateItem` in onChange.

```

```jsx

// 1st
this.core = new FormCore({
    validateConfig,
    autoValidate: true
});


// 2nd
this.core = new FormCore({ validateConfig });
this.core.onChange = (fireKeys, values, context) => {
    context.validateItem(fireKeys);
}

```

```i18n

# 5. 自动滚动到错误位置

当发生错误时，聚焦到某个field是非常常见的功能。目前会自动滚动到第一个错误的位置。

@sep

# 5. Scroll to error

It's very common to focus and scroll to first field which has error When error occur.

```

```jsx

core.scrollToError();


```


```i18n

NoForm会根据校验结果, 自动为 `命中/未命中` 的表单元素 `显示/清理` 错误信息。

# 进阶

### 动态校验(推荐)

通过方法来定义动态校验规则

@sep

NoForm will auto `show` or `hide` error message when result of validate changed.

# Advanced

### Dynamic Validate(Recommand)

We recommand use function as dynamic validate config.

```

```jsx

const validateConfig = {
    username: {type: "string", required: true},
    age: (values, context) => { // dynamic validate config
        const { username } = values;
        return {type: "string", required: !!username };
    }
}

```

```i18n
### 动态校验（备选方案)

目前可以通过在FormItem上编写validateConfig来设定动态规则

@sep

### Dynamic Validate(Backup)

We also support JSX props `validateConfig` to implement Dynamic Validate.

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

```i18n

### 子项校验

NoForm支持自定义组件(value/onChange受控规范) 并且通常当做简单组件input/select去校验它们。
但是很多时候我们会写一些非常复杂的组件，这些组件内部也会进行校验，NoForm提供一套子项校验的标准让你方便去接入。

@sep

### SubItem Validate

NoForm support custom component(value/onChange standard) and validate it as simple input/select element.
But sometimes we will write complex component has its own validation. NoForm provide sub-item validate standard for this case.

```

```jsx

class ComplexComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
        const { item } = context;
        if (item && item.core) { // bind item core
            item.core.addSubField({
                validate: this.validate // item core will execute validate
            });
        }
    }

    async validate = () => {
        const error = await somemethod();
        return error;
    }
}


```

```i18n

### 自定义错误信息

你可以自定义错误信息的渲染，尤其是在使用了子项校验的时候

@sep

### Custom Error Render

You can custom error msg espacially use feature like sub-item validate.

```

```jsx

errorRender = (errMsg, error) => {
    const { main, sub } = error; // sub-item validate
    return sub ? <span style={{ color: 'blue' }}>{sub}</span> : null;
}

render() {
    return <FormItem errorRender={this.errorRender} />
}

```