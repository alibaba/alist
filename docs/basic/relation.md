# 联动

联动是表单领域不可回避的问题，复杂的联动常常让开发者抓耳挠腮，
NoForm通过If组件，提供最基础、使用的联动能力，助力开发者应对联动问题。

# 示例

```onlydemo

    const { default: Form, FormItem, FormCore, If } = noform;
    const { antd: antdWrapper } = noformWrapper;
    const { Input, Button } = antdWrapper(antd);

    class App extends React.Component {
        componentWillMount = () => { // 初始化表单核心
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

        render() { // 注入核心        
            return <Form core={this.core} layout={{ label: 6, control: 18 }}>
                <FormItem label="username" name="username"><Input /></FormItem>
                <FormItem label="age" name="age"><Input /></FormItem>                

                <FormItem label="">
                    <div>
                        <div>1. username为bobby时，触发第一层if</div>
                        <div>2. username为bobby, age为23时，触发嵌套if</div>
                    </div>
                </FormItem>

                <If when={(values, { globalStatus }) => {
                    return values.username === 'bobby';
                }}>
                    <FormItem label="" style={{ margin: '12px 0' }}>
                        <div>
                            hello bobby!
                            <If when={(values, { globalStatus }) => {
                                return values.age == 23;
                            }}>
                                <FormItem label="" >
                                    <div>Congratulation! You've solved the last maze!</div>
                                </FormItem>
                            </If>
                        </div>
                    </FormItem>                  
                </If>

                <FormItem label="全局status">
                    <div >
                        <Button style={{ marginRight: 12 }} onClick={this.triggerIf}>触发If</Button>
                        <Button style={{ marginRight: 12 }} onClick={this.depIf}>触发嵌套if</Button>
                        <Button style={{ marginRight: 12 }} onClick={this.clear}>清空</Button>
                    </div>
                </FormItem>
            </Form>
        }
    }
    
    ReactDOM.render(<App />, document.getElementById('demo'));
```

### If 显示隐藏联动

```jsx
    <Form core={this.core} layout={{ label: 6, control: 18 }}>
        <FormItem label="username" name="username"><Input /></FormItem>
        <FormItem label="age" name="age"><Input /></FormItem>                

        <FormItem label="">
            <div>
                <div>1. username为bobby时，触发第一层if</div>
                <div>2. username为bobby, age为23时，触发嵌套if</div>
            </div>
        </FormItem>

        <If when={(values, { globalStatus }) => {
            return values.username === 'bobby';
        }}>
            <FormItem label="" style={{ margin: '12px 0' }}>
                <div>
                    hello bobby!
                    <If when={(values, { globalStatus }) => {
                        return values.age == 23;
                    }}>
                        <FormItem label="" >Congratulation! You've solved the last maze!</FormItem>
                    </If>
                </div>
            </FormItem>                    
        </If>
    </Form>
```

如上所示，If通过when函数来判断是否显示，when的入参为：

* values 表单的值集合
* core 表单核心

当values改变的时候，when就会去判断是否命中，如果命中就会重新渲染这部分。

> If支持嵌套If，如上述代码块所示，并且不限制返回的内容。

### Item 逻辑联动

通过FormItem/Item的render属性，可以自定义控制渲染的内容，如下所示：

```onlydemo

    const { default: Form, FormItem, FormCore, If } = noform;
    const { antd: antdWrapper } = noformWrapper;
    const { Input, Select, Button } = antdWrapper(antd);

    const dataSource = [
      { label: 'USD', value: 'USD'},
      { label: 'CNY', value: 'CNY'}
    ];

    class App extends React.Component {
        componentWillMount = () => { // 初始化表单核心
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

        render() { // 注入核心        
            return <Form core={this.core} layout={{ label: 6, control: 18 }}>
                <FormItem label="单价" name="price"><Input /></FormItem>
                <FormItem label="数量" name="quantity"><Input /></FormItem>
                <FormItem label="单位" name="unit"><Select options={dataSource}/></FormItem>

                <FormItem render={(values, { globalStatus }) => {
                    const { price, quantity } = values;
                    const amount = parseInt(price ||  0) * parseInt(quantity ||  0);
                    return <div style={{ lineHeight: '28px' }}>总价: {amount}</div>
                }} props={(props, formCore) => {
                    const unit = formCore.getValue('unit');
                    return {
                        suffix: unit || ''
                    };
                }} label="combo拼装" />

                <FormItem label="全局status">
                    <div >
                        <Button style={{ marginRight: 12 }} onClick={this.depIf}>赋值</Button>
                        <Button style={{ marginRight: 12 }} onClick={this.clear}>清空</Button>
                    </div>
                </FormItem>
            </Form>
        }
    }
    
    ReactDOM.render(<App />, document.getElementById('demo'));
```

### 核心代码

```jsx

<FormItem label="单价" name="price"><Input /></FormItem>
<FormItem label="数量" name="quantity"><Input /></FormItem>
<FormItem label="单位" name="unit"><Select options={dataSource}/></FormItem>

<FormItem render={(values, { globalStatus }) => { /** 上述任意组件改变时都会触发render **/
    const { price, quantity } = values;
    const amount = parseInt(price ||  0) * parseInt(quantity ||  0);
    return <div style={{ lineHeight: '28px' }}>总价: {amount}</div>
}} props={(props, formCore) => {
    const unit = formCore.getValue('unit');
    return {
        suffix: unit || ''
    };
}} label="combo拼装" />
```