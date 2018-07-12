# Core

```i18n

# Core是什么？

> 涉及到核心的操作，请查看 [API章节](/api?md=all)

Core是表单的抽象概念，它包含了表单的所有数据（`包含值(values)`，`状态(status)`，`错误(errors)`等等），
同时它提供了一系列的API去控制这些数据。

因此表单就变成两部分，`View 视图层` 和 `Core 数据层`，View视图层对逻辑无感知，仅仅单纯显示 Core的数据。
因此通过对Core的操作就能完成视图的变更。

@sep

# Abount Core

> More informations about [API](/api?md=all)

Core is abstract of form logic. It covers all dimensions of form's data, such as 
`values`, `status`, `errors`, `props`. And Core provide a series of API to control these data.

Since form's view based on Core's data, it is easy to update view through Core's API.

```

```onlydemo

const { default: Form, FormItem, FormCore } = noform;
    const { antd: antdWrapper } = noformWrapper;
    const { Select, Button } = antdWrapper(antd);

    const dataSource = [
      { label: 'optA', value: 'optA'},
      { label: 'optB', value: 'optB'}
    ];
    
    class App extends React.Component {
        componentWillMount = () => { // initialized core instance
          this.core = new FormCore();
        }
    
        setStatus = (status) => {
          this.core.setGlobalStatus(status);
        }

        setError = () => {
            const error = this.core.getError('select');
            this.core.setError('select', !!error ? null : 'something go wrong');
        }

        setValue = () => {
            const value = this.core.getValue('select');
            this.core.setValue('select', value === 'optA' ? 'optB' : 'optA');
        }

        setProps = (type) => {       
            const lastVal = this.core.getProps('select')[type];
            let nextVal = {};
            switch (type) {
                case 'prefix':
                case 'suffix':
                case 'top':
                case 'help': 
                    nextVal = !!lastVal ? {} : { [type]: `${Math.random()}`.slice(12) };
                    break;
                case 'options':
                    nextVal = (!!lastVal && lastVal.length > 1 || !lastVal) ? { [type]: [...dataSource.slice(1)] } : { [type]: dataSource };
                    break;
            }

            console.log('lastVal', lastVal);
            this.core.setProps('select', nextVal);
        }

        render() { // pass the core        
            return <Form core={this.core} layout={{ label: 6, control: 18 }}>
                <FormItem label="select" name="select"><Select options={dataSource} /></FormItem>                

                <FormItem label="change status">
                    <div >
                        <Button style={{ marginRight: 12 }} onClick={this.setStatus.bind(this, 'edit')}>edit</Button>
                        <Button style={{ marginRight: 12 }} onClick={this.setStatus.bind(this, 'preview')}>preview</Button>
                        <Button style={{ marginRight: 12 }} onClick={this.setStatus.bind(this, 'disabled')}>disabled</Button>
                    </div>
                </FormItem>

                <FormItem label="change values">
                    <div >
                        <Button style={{ marginRight: 12 }} onClick={this.setValue}>setValues</Button>                        
                    </div>
                </FormItem>

                <FormItem label="change error">
                    <div >
                        <Button style={{ marginRight: 12 }} onClick={this.setError}>setErrors</Button>                        
                    </div>
                </FormItem>

                <FormItem label="change props">
                    <div >
                        <Button style={{ marginRight: 12 }} onClick={this.setProps.bind(this, 'prefix')}>prefix</Button>
                        <Button style={{ marginRight: 12 }} onClick={this.setProps.bind(this, 'suffix')}>suffix</Button>
                        <Button style={{ marginRight: 12 }} onClick={this.setProps.bind(this, 'top')}>top</Button>
                        <Button style={{ marginRight: 12 }} onClick={this.setProps.bind(this, 'help')}>help</Button>
                    </div>
                </FormItem>

                <FormItem label="change props - select options">
                    <Button style={{ marginRight: 12 }} onClick={this.setProps.bind(this, 'options')}>change options</Button>
                </FormItem>
            </Form>
        }
    }
    
    ReactDOM.render(<App />, document.getElementById('demo'));
```


```i18n

# 获取Core

获取Core有两种方式，通过

1. 自定义初始化核心并绑定到表单
2. 表单自动生成后通过onMount挂载

@sep

# Generate Core

There are two way to generate core instance.

1. manual initialized core instance and pass to Form
2. do nothing and Form will initialized core instance automatically.

```


```jsx
// manual initialized
class Demo extends React.Component {
    componentWillMount = () => {
        this.core = new FormCore();
    }

    render() {
        return <Form core={this.core}>
            <FormItem name="username"><Input /></FormItem>
        </Form>
    }
}

```

```jsx
// initizled automatically
class Demo extends React.Component {
    mountCore = (core) => { this.core = core }
    render() {
        return <Form onMount={this.mountCore}>
            <FormItem name="username"><Input /></FormItem>
        </Form>
    }
}
```



```i18n

# 监听变更

@sep

# Listening Change Event

```

```jsx
    this.core.on('change', (value) => { // 
        // listen the change event
        this.core.setValue('isBobby', true);
        this.core.setStatus('username', 'disabled');
        ...
    })
```

```i18n

> onChange函数中更多的是进行对核心的操作，如果需要控制组件的显示或隐藏，参见[联动章节](/docs?md=basic/relation)

@sep

> You can manipluate Core's data in onChange, but if you wan to controll view's hide/show, check [Condition](/docs?md=basic/relation)

```