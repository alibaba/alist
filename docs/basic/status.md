```i18n

# 状态控制

状态是NoForm中非常重要的一环，通过状态的控制，能够在传统的
`新建`、`编辑`、`详情` 的场景中，使用同一份代码，提高开发效率。

除此之外，引入状态的表单，也能够轻松地去应对纷繁复杂的业务需求。

# 示例

@sep


# Status Management

Status is play an very important part in NoForm.
We can easily make different scene such as `draft`, `edit`, `detail` by using the same code but different status.

Besides, Status Management also help you solve complex demand.

# Example

```

```onlydemo

const { default: Form, FormItem, FormCore } = noform;
    const { antd: antdWrapper } = noformWrapper;
    const { Input, Button } = antdWrapper(antd);

    class App extends React.Component {
        componentWillMount = () => { // initialized core instance
          this.core = new FormCore();
        }
    
        setStatus = (status) => {
          this.core.setGlobalStatus(status);
        }

        setItemStatus = (name, status) => {
          this.core.setStatus(name, status);
          console.log('====>', name, status);
        }

        render() { // inject core instance        
            return <Form core={this.core} layout={{ label: 6, control: 18 }}>
                <FormItem label="username" name="username" value="username"><Input /></FormItem>
                <FormItem label="age" name="age" value="age"><Input /></FormItem>
                <FormItem label="gender" name="gender" value="gender"><Input /></FormItem>

                <FormItem label="Global Status">
                    <div >
                        <Button style={{ marginRight: 12 }} onClick={this.setStatus.bind(this, 'edit')}>Edit</Button>
                        <Button style={{ marginRight: 12 }} onClick={this.setStatus.bind(this, 'preview')}>Preview</Button>
                        <Button style={{ marginRight: 12 }} onClick={this.setStatus.bind(this, 'disabled')}>Disabled</Button>
                    </div>
                </FormItem>
                <FormItem label="username - status">
                    <div >
                        <Button style={{ marginRight: 12 }} onClick={this.setItemStatus.bind(this, 'username', 'edit')}>Edit</Button>
                        <Button style={{ marginRight: 12 }} onClick={this.setItemStatus.bind(this, 'username', 'preview')}>Preview</Button>
                        <Button style={{ marginRight: 12 }} onClick={this.setItemStatus.bind(this, 'username', 'disabled')}>Disabled</Button>
                    </div>
                </FormItem>
                <FormItem label="age - status">
                    <div >
                        <Button style={{ marginRight: 12 }} onClick={this.setItemStatus.bind(this, 'age', 'edit')}>Edit</Button>
                        <Button style={{ marginRight: 12 }} onClick={this.setItemStatus.bind(this, 'age', 'preview')}>Preview</Button>
                        <Button style={{ marginRight: 12 }} onClick={this.setItemStatus.bind(this, 'age', 'disabled')}>Disabled</Button>
                    </div>
                </FormItem>
                <FormItem label="gender - status">
                    <div >
                        <Button style={{ marginRight: 12 }} onClick={this.setItemStatus.bind(this, 'gender', 'edit')}>Edit</Button>
                        <Button style={{ marginRight: 12 }} onClick={this.setItemStatus.bind(this, 'gender', 'preview')}>Preview</Button>
                        <Button style={{ marginRight: 12 }} onClick={this.setItemStatus.bind(this, 'gender', 'disabled')}>Disabled</Button>
                    </div>
                </FormItem>
            </Form>
        }
    }
    
    ReactDOM.render(<App />, document.getElementById('demo'));
```

```i18n

# 状态枚举

NoForm 认为表单状态分为以下三种类型：`edit(编辑态)`, `preview(预览态)`, `disabled(禁用态)`

# 全局维度

@sep

# Status Enum

`edit`, `preview`, `disabled`

# Global Status

```



```jsx

this.core.setGlobalStatus('edit'); // set up global status
this.core.getGlobalStatus(); // get global status

```

```i18n
# 组件维度（视图控制）
@sep
# Change Status(JSX Way)

```

```jsx
<Form>
    // status(function): (value, core) => ['edit'|'preview'|'disabled'] 
    <FormItem name="username" status={(values, core) => {
        return 'preview'; // edit/preview|disabled
    }}>
        <Input />
    </FormItem>
    
    // status(string['edit'|'preview'|'disabled'] )
    <FormItem name="age" status="preview"><Input /></FormItem>
</Form>

```

```i18n

视图控制状态在`动态生成组件` 或 `处理复杂状态` 时比较常用。

### 组件维度（核心控制)
@sep
用。
It is helpful using FormCore instance to modify status.

# Change Status(FormCore Way)

```

```jsx

this.core.setStatus('username', 'edit'); // modify single item's status
this.core.getStatus('username'); // get single item's status

```

```i18n
# 组件适配

为了能够更好实现状态控制，开发者需要对引入的组件进行 `"适配"`。
常用的表单组件通常只具有`编辑态`，因此要达到状态控制的目的，我们需要对他们进行改造。

目前我们已经对社区流行的组件库进行了统一的适配，开发者只需要引入这些适配层就可以直接使用了。

* [Ant Design 适配层](/docs?md=advanced/antd)

对于需要自定义适配层的开发者，请参见[接入自定义组件章节](/docs?md=component/custom)了解更多。

@sep

# Component Adaptation

For better control status of 3rd party library's components, Developer need to adapt these components since most of these components only have `edit` status.

Now we have already got an adaptor for Ant Design.

* [Ant Design Adaptor](/docs?md=advanced/antd)

For those developer who need custom config adaptor, please check [Custom Adaptor](/docs?md=component/custom) for more information.

```
