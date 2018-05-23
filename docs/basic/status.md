# 状态控制

状态是NoForm中非常重要的一环，通过状态的控制，能够在传统的
`新建`、`编辑`、`详情` 的场景中，使用同一份代码，提高开发效率。

除此之外，引入状态的表单，也能够轻松地去应对纷繁复杂的业务需求。

# 示例

```onlydemo

const { default: Form, FormItem, FormCore } = noform;
    const { antd: antdWrapper } = noformWrapper;
    const { Input, Button } = antdWrapper(antd);

    class App extends React.Component {
        componentWillMount = () => { // 初始化表单核心
          this.core = new FormCore();
        }
    
        setStatus = (status) => {
          this.core.setGlobalStatus(status);
        }

        setItemStatus = (name, status) => {
          this.core.setStatus(name, status);
          console.log('====>', name, status);
        }

        render() { // 注入核心        
            return <Form core={this.core} layout={{ label: 6, control: 18 }}>
                <FormItem label="username" name="username" value="username"><Input /></FormItem>
                <FormItem label="age" name="age" value="age"><Input /></FormItem>
                <FormItem label="gender" name="gender" value="gender"><Input /></FormItem>

                <FormItem label="全局status">
                    <div >
                        <Button style={{ marginRight: 12 }} onClick={this.setStatus.bind(this, 'edit')}>编辑态</Button>
                        <Button style={{ marginRight: 12 }} onClick={this.setStatus.bind(this, 'preview')}>预览态</Button>
                        <Button style={{ marginRight: 12 }} onClick={this.setStatus.bind(this, 'disabled')}>禁用态</Button>
                    </div>
                </FormItem>
                <FormItem label="username - status">
                    <div >
                        <Button style={{ marginRight: 12 }} onClick={this.setItemStatus.bind(this, 'username', 'edit')}>编辑态</Button>
                        <Button style={{ marginRight: 12 }} onClick={this.setItemStatus.bind(this, 'username', 'preview')}>预览态</Button>
                        <Button style={{ marginRight: 12 }} onClick={this.setItemStatus.bind(this, 'username', 'disabled')}>禁用态</Button>
                    </div>
                </FormItem>
                <FormItem label="age - status">
                    <div >
                        <Button style={{ marginRight: 12 }} onClick={this.setItemStatus.bind(this, 'age', 'edit')}>编辑态</Button>
                        <Button style={{ marginRight: 12 }} onClick={this.setItemStatus.bind(this, 'age', 'preview')}>预览态</Button>
                        <Button style={{ marginRight: 12 }} onClick={this.setItemStatus.bind(this, 'age', 'disabled')}>禁用态</Button>
                    </div>
                </FormItem>
                <FormItem label="gender - status">
                    <div >
                        <Button style={{ marginRight: 12 }} onClick={this.setItemStatus.bind(this, 'gender', 'edit')}>编辑态</Button>
                        <Button style={{ marginRight: 12 }} onClick={this.setItemStatus.bind(this, 'gender', 'preview')}>预览态</Button>
                        <Button style={{ marginRight: 12 }} onClick={this.setItemStatus.bind(this, 'gender', 'disabled')}>禁用态</Button>
                    </div>
                </FormItem>
            </Form>
        }
    }
    
    ReactDOM.render(<App />, document.getElementById('demo'));
```


# 状态枚举

NoForm 认为表单状态分为以下三种类型：`edit(编辑态)`, `preview(预览态)`, `disabled(禁用态)`

# 全局维度

```jsx

this.core.setGlobalStatus('edit'); // 全局设置状态
this.core.getGlobalStatus(); // 获取全局状态

```

# 组件维度（视图控制）

```jsx
<Form>
    <FormItem name="username" status={(values, core) => { // 通过方法返回状态控制
        // 根据values或从core获取到的信息返回一个符合状态枚举的值
        // 不合法的值会被忽略
        return 'preview'; // edit/preview|disabled
    }}>
        <Input />
    </FormItem>
    
    <FormItem name="age" status="preview"><Input /></FormItem> // 直接写状态控制
</Form>

```

视图控制状态在`动态生成组件` 或 `处理复杂状态` 时比较常用。

### 组件维度（核心控制)

```jsx

this.core.setStatus('username', 'edit'); // 设置单个组件的状态
this.core.getStatus('username'); // 获取单个组件的状态

```

# 组件适配

为了能够更好实现状态控制，开发者需要对引入的组件进行 `"适配"`。
常用的表单组件通常只具有`编辑态`，因此要达到状态控制的目的，我们需要对他们进行改造。

目前我们已经对社区流行的组件库进行了统一的适配，开发者只需要引入这些适配层就可以直接使用了。

* [ant.design适配层](/docs?md=advanced/antd)

对于需要自定义适配层的开发者，请参见[接入自定义组件章节](/docs?md=component/custom)了解更多。
