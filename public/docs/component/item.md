# FormItem与Item

NoForm认为一个完整的表单元素是FormItem而不是Input, Select这些实际的组件。

NoForm中包含FormItem和Item，这两者的区别是

* FormItem拥有NoForm定制的布局样式及表单元素的额外属性（prefix, suffix...)
* Item是纯粹的表单元素，它不具有任何布局样式。

# FormItem长什么样

![form-item](https://img.alicdn.com/tfs/TB1a1PWs_tYBeNjy1XdXXXXyVXa-567-158.png)

完整的FormItem包含prefix, suffix, top, help, error等表单元素的额外属性。
其中content则为真实的表单组件，如Input，Select之类的。

> 在上图中，Item实际上只包含content

# DEMO

```onlydemo
const { default: Form, FormItem, FormCore } = noform;
const { antd: antdWrapper } = noformWrapper;
const { Input, Button, Switch } = antdWrapper(antd);

class App extends React.Component {
    componentWillMount = () => { // 初始化表单核心
      this.core = new FormCore();
    }

    fillProps = () => {
        this.core.setValues({
            _required: true,
            _prefix: '$',
            _suffix: 'USD',
            _top: 'top info message',
            _help: 'help message'
        });
    }

    render() { // 注入核心        
        return <Form core={this.core} layout={{ label: 6, control: 18 }}>
            <FormItem label=""><div>尝试改改一下属性看看效果</div></FormItem>
            <FormItem name="_required" label="required"><Switch /></FormItem>
            <FormItem name="_prefix" label="prefix"><Input /></FormItem>
            <FormItem name="_suffix" label="suffix"><Input /></FormItem>
            <FormItem name="_top" label="top"><Input /></FormItem>
            <FormItem name="_help" label="help"><Input /></FormItem>

            <hr/>

          <FormItem label="FormItem" name="formItem" props={(props, context) => {
              const values = context.getValues();
              const { _prefix, _suffix, _top, _help, _required } = values;
              return {
                  required: _required || false,
                  prefix: _prefix || null,
                  suffix: _suffix || null,
                  top: _top || null,
                  help: _help || null
              }
          }}>
            <Input />
          </FormItem>

          <FormItem label="">
            <Button onClick={this.fillProps}>随便试试</Button>
          </FormItem>
        </Form>
    }
}

ReactDOM.render(<App />, document.getElementById('demo'));
```

# FormItem接入组件标准

`非常重要: FormItem下只能接入一个表单元素（Input, Select...)`

FormItem通过onChange 和 value来控制表单元素值的显示。

因此onChange和value都是保留字，因此在FormItem上编写onChange和value是不被允许的。

> 如需在值发生变化时执行一些操作，请参考[核心控制章节](/docs?md=basic/core) 中的onChange部分和setValue部分了解更多。

* [最简规范组件Input实现](#)
* [复杂规范组件TodoList实现](#)

# 样式/layout

FormItem采用栅格布局来设置样式，默认为24列。可以通过以下两种方式设置

```jsx
<Form layout={{ label: 8, control: 16}}> // 全局设置
    <FormItem layout={{ label: 10, control: 14 }} /> // 局部设置
</Form>

```

# 行内样式

