# Core控制

# Core是什么？

Core是表单的抽象概念，它包含了表单的所有数据（`包含值(values)`，`状态(status)`，`错误(errors)`等等），
同时它提供了一系列的API去控制这些数据。

因此表单就变成两部分，`View 视图层` 和 `Core 数据层`，View视图层对逻辑无感知，仅仅单纯显示 Core的数据。
因此通过对Core的操作就能完成视图的变更。

```onlydemo

const { default: Form, FormItem, FormCore } = noform;
    const { antd: antdWrapper } = noformWrapper;
    const { Select, Button } = antdWrapper(antd);

    const dataSource = [
      { label: 'optA', value: 'optA'},
      { label: 'optB', value: 'optB'}
    ];
    
    class App extends React.Component {
        componentWillMount = () => { // 初始化表单核心
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

        render() { // 注入核心        
            return <Form core={this.core} layout={{ label: 6, control: 18 }}>
                <FormItem label="select" name="select"><Select options={dataSource} /></FormItem>                

                <FormItem label="操作status">
                    <div >
                        <Button style={{ marginRight: 12 }} onClick={this.setStatus.bind(this, 'edit')}>编辑态</Button>
                        <Button style={{ marginRight: 12 }} onClick={this.setStatus.bind(this, 'preview')}>预览态</Button>
                        <Button style={{ marginRight: 12 }} onClick={this.setStatus.bind(this, 'disabled')}>禁用态</Button>
                    </div>
                </FormItem>

                <FormItem label="操作values">
                    <div >
                        <Button style={{ marginRight: 12 }} onClick={this.setValue}>改变值</Button>                        
                    </div>
                </FormItem>

                <FormItem label="操作error">
                    <div >
                        <Button style={{ marginRight: 12 }} onClick={this.setError}>改变错误提醒</Button>                        
                    </div>
                </FormItem>

                <FormItem label="操作props">
                    <div >
                        <Button style={{ marginRight: 12 }} onClick={this.setProps.bind(this, 'prefix')}>改变prefix</Button>
                        <Button style={{ marginRight: 12 }} onClick={this.setProps.bind(this, 'suffix')}>改变suffix</Button>
                        <Button style={{ marginRight: 12 }} onClick={this.setProps.bind(this, 'top')}>改变top</Button>
                        <Button style={{ marginRight: 12 }} onClick={this.setProps.bind(this, 'help')}>改变help</Button>
                    </div>
                </FormItem>

                <FormItem label="操作props-改变select数据源">
                    <Button style={{ marginRight: 12 }} onClick={this.setProps.bind(this, 'options')}>改变options</Button>
                </FormItem>
            </Form>
        }
    }
    
    ReactDOM.render(<App />, document.getElementById('demo'));
```


# 获取Core

获取Core有两种方式，通过

1. 自定义初始化核心并绑定到表单
2. 表单自动生成后通过onMount挂载

```jsx
// 外部初始化
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
// 内部自动生成
class Demo extends React.Component {
    mountCore = (core) => { this.core = core }
    render() {
        return <Form onMount={this.mountCore}>
            <FormItem name="username"><Input /></FormItem>
        </Form>
    }
}
```

# 监听变更

```jsx
    this.core.on('change', (value) => { // 
        // 执行相应的操作
        this.core.setValue('isBobby', true);
        this.core.setStatus('username', 'disabled');
        ...
    })
```

> onChange函数中更多的是进行对核心的操作，如果需要控制组件的显示或隐藏，参见[联动章节](/docs?md=basic/relation)

# 获取/修改值(values)

```jsx
    this.core.getValues(); // 获取整体表单的值
    this.core.getValue('username'); // 获取单字段值
    this.core.setValues({ username: 'bobby' }); // 设置整体表单的值
    this.core.setValue('username', 'bobby'); // 设置单字段的值
```

> 每次执行setValue/setValues方法会触发onChange变更

# 获取/修改状态(status)

> 状态枚举包含: edit, preview, disabled 三种状态

```jsx
    this.core.getStatus(); // 获取整体表单的状态
    this.core.getStatus('username'); // 获取单字段状态
    this.core.setStatus({ username: 'preview' }); // 设置整体表单的状态
    this.core.setStatus('username', 'disabled'); // 设置单字段的状态
```
> 状态的控制离不开底层组件的支持，请参考[接入自定义组件章节](/docs?md=components/cusom)了解如何实现主题控制。

> 执行setStatus是其中一种控制视图的方法，参见[状态控制章节](/docs?md=basic/status)了解更多。

# 获取/修改属性信息(props)

```js
    this.core.getProps('username'); // 获取单字段属性
    this.core.setProps('username', {}); // 获取单字段状态
```

> FormItem属性保留字为： label, prefix, suffix, help, hint, top, required

setProps最常用的场景是替换类似`<Select>`组件的dataSource，并且不会像setState引起全局的渲染。
NoForm的治理思想是state和core不混用，表单页面仅仅使用core来控制，避免不必要的渲染。

# 获取/修改错误信息(error)

> 注： 错误信息的空值为null

```jsx
    this.core.getError(); // 获取整体表单的错误信息
    this.core.getError('username'); // 获取单字段错误信息
    this.core.setError({ username: 'username is required' }); // 设置整体表单的错误信息
    this.core.setError('username', 'username is required'); // 设置单字段的错误信息
```
> 注：setError是实现校验的底层的方法，如需校验表单，请查看[校验章节](/docs?md=basic/validation)了解更多。