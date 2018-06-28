```i18n

# 联动

联动是表单领域不可回避的问题，复杂的联动常常让开发者抓耳挠腮，
NoForm通过If组件，提供最基础、使用的联动能力，助力开发者应对联动问题。

@sep

# Condition

NoForm use `If` Component to decide which component should show.
What's more, `Item/FormItem` Component's `render` method is very powerful and you can conrtol the output.

```

# DEMO

```onlydemo

    const { default: Form, FormItem, FormCore, If } = noform;
    const { antd: antdWrapper } = noformWrapper;
    const { Input, Button } = antdWrapper(antd);

    class App extends React.Component {
        componentWillMount = () => { // initialized core instance
          this.core = new FormCore();
        }

        triggerIf = () => {
            this.core.setValue('username', 'bobby');
        }

        depIf = () => {
            this.core.setValues({
                username: 'bobby',
                age: 23
            });
        }

        clear = () => {
            this.core.reset();
        }

        render() { // pass core instance to form        
            return <Form core={this.core} layout={{ label: 8, control: 16 }}>
                <div className="example-title">Condition Examples</div>
                <Alert style={{ marginBottom: 12 }} message={<div>
                    <div>1. username = bobby, you get <span>🤖</span></div>
                    <div>2. username = bobby and age = 23, yout get <span>👇🏼</span></div>
                    <div>2. username = bobby and age = 23, password = noform yout get <span>🌈</span></div>
                </div>} type="info" showIcon />

                <FormItem label="username" name="username"><Input /></FormItem>
                <FormItem label="age" name="age"><Input /></FormItem>                                

                <If when={(values, { globalStatus }) => {
                    return values.username === 'bobby';
                }}>
                    <FormItem label="" style={{ margin: '12px 0' }}>
                        <div>
                        <span>🤖</span>
                            <If when={(values, { globalStatus }) => {
                                return values.age == 23;
                            }}>
                                <div>
                                    <span>👇🏼</span>
                                    <FormItem label="password" name="password"><Input /></FormItem>
                                    <If when={(values, { globalStatus }) => {
                                        return values.password === 'noform';
                                    }}>
                                        <span>🌈</span>
                                    </If>
                                </div>
                            </If>
                        </div>
                    </FormItem>                  
                </If>

                <FormItem label="trigger">
                    <div >
                        <Button style={{ marginRight: 12 }} onClick={this.triggerIf}>1st</Button>
                        <Button style={{ marginRight: 12 }} onClick={this.depIf}>2nd</Button>
                        <Button style={{ marginRight: 12 }} onClick={this.finalIf}>3rd</Button>
                        <Button style={{ marginRight: 12 }} onClick={this.clear}>clear</Button>
                    </div>
                </FormItem>
            </Form>
        }
    }
    
    ReactDOM.render(<App />, document.getElementById('demo'));
```

```i18n

### If 控制显示隐藏

@sep

### hide/show By <If>

```

```jsx
    <Form core={this.core} layout={{ label: 8, control: 16 }}>
        <div className="example-title">Condition Examples</div>
        <Alert style={{ marginBottom: 12 }} message={<div>
            <div>1. username = bobby, you get <span>🤖</span></div>
            <div>2. username = bobby and age = 23, yout get <span>👇🏼</span></div>
            <div>2. username = bobby and age = 23, password = noform yout get <span>🌈</span></div>
        </div>} type="info" showIcon />

        <FormItem label="username" name="username"><Input /></FormItem>
        <FormItem label="age" name="age"><Input /></FormItem>                                

        <If when={(values, { globalStatus }) => {
            return values.username === 'bobby';
        }}>
            <FormItem label="" style={{ margin: '12px 0' }}>
                <div>
                <span>🤖</span>
                    <If when={(values, { globalStatus }) => {
                        return values.age == 23;
                    }}>
                        <div>
                            <span>👇🏼</span>
                            <FormItem label="password" name="password"><Input /></FormItem>
                            <If when={(values, { globalStatus }) => {
                                return values.password === 'noform';
                            }}>
                                <span>🌈</span>
                            </If>
                        </div>
                    </If>
                </div>
            </FormItem>                  
        </If>

        <FormItem label="trigger">
            <div >
                <Button style={{ marginRight: 12 }} onClick={this.triggerIf}>1st</Button>
                <Button style={{ marginRight: 12 }} onClick={this.depIf}>2nd</Button>
                <Button style={{ marginRight: 12 }} onClick={this.finalIf}>3rd</Button>
                <Button style={{ marginRight: 12 }} onClick={this.clear}>clear</Button>
            </div>
        </FormItem>
    </Form>
```

```i18n

如上所示，If通过when函数来判断是否显示，when的入参为：

* values 表单的值集合
* core 表单核心

当values改变的时候，when就会去判断是否命中，如果命中就会重新渲染这部分。

> If支持嵌套If，如上述代码块所示，并且不限制返回的内容。

### Item 逻辑联动

通过FormItem/Item的render属性，可以自定义控制渲染的内容，如下所示：

@sep

As you can see, If use when to decide component show or not, and the arguments of when is:

* values
* core 

`when` will be triggered when values changed, and the tyepe of its return value is Boolean, true means show, false means hide.

```

```onlydemo

    const { default: Form, FormItem, FormCore, If } = noform;
    const { antd: antdWrapper } = noformWrapper;
    const { Input, Select, Button } = antdWrapper(antd);

    const dataSource = [
      { label: 'USD', value: 'USD'},
      { label: 'CNY', value: 'CNY'}
    ];

    class App extends React.Component {
        componentWillMount = () => { // initialized core instance
          this.core = new FormCore();
        }

        triggerIf = () => {
            this.core.setValue('username', 'bobby');
        }

        depIf = () => {
            this.core.setValues({
                price: 100,
                quantity: 3,
                unit: 'USD'
            });
        }

        clear = () => {
            this.core.reset();
        }

        render() { // pass core instance        
            return <Form core={this.core} layout={{ label: 6, control: 18 }}>
                <FormItem label="Price" name="price"><Input /></FormItem>
                <FormItem label="Quantity" name="quantity"><Input /></FormItem>
                <FormItem label="Unit" name="unit"><Select options={dataSource}/></FormItem>

                <FormItem render={(values, { globalStatus }) => {
                    const { price, quantity } = values;
                    const amount = parseInt(price ||  0) * parseInt(quantity ||  0);
                    return <div style={{ lineHeight: '28px' }}>Sum: {amount}</div>
                }} props={(props, formCore) => {
                    const unit = formCore.getValue('unit');
                    return {
                        suffix: unit || ''
                    };
                }} label="Combo" />

                <FormItem label="Global Status">
                    <div >
                        <Button style={{ marginRight: 12 }} onClick={this.depIf}>Trigger Condition</Button>
                        <Button style={{ marginRight: 12 }} onClick={this.clear}>Clear</Button>
                    </div>
                </FormItem>
            </Form>
        }
    }
    
    ReactDOM.render(<App />, document.getElementById('demo'));
```

```i18n

### 核心代码

@sep

### Code

```

```jsx

<FormItem label="Price" name="price"><Input /></FormItem>
<FormItem label="Quantitty" name="quantity"><Input /></FormItem>
<FormItem label="Unit" name="unit"><Select options={dataSource}/></FormItem>

<FormItem render={(values, { globalStatus }) => { /** Each field's change will trigger render **/
    const { price, quantity } = values;
    const amount = parseInt(price ||  0) * parseInt(quantity ||  0);
    return <div style={{ lineHeight: '28px' }}>Sum: {amount}</div>
}} props={(props, formCore) => {
    const unit = formCore.getValue('unit');
    return {
        suffix: unit || ''
    };
}} label="Combo" />
```