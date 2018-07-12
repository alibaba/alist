```i18n

# 接入 Ant Design(非按需加载)

由于 Ant Design 拥有众多较高质量的组件，因此 NoForm有面向 Ant Design 的插件机制。
这个插件使的NoForm无缝使用 Ant Design 的表单组件，提升开发效率。

插件将 Ant Design 涉及表单的组件的数据返回和状态都进行了适配, 结合NoForm达到开箱即用的效果，

@sep

# Ant Design(not demand)

Since Ant Design have so many high quality components.There is no need for NoForm to waste time to repeat these components.

NoForm already have adaptor for Ant Design, developer can easily to format all these component.
```

### import


```i18n
这种wrapper的形式一定程度会造成`代码冗余`，如果使用了Ant Design的按需加载的话，建议查看[按需加载](/docs?md=advanced/antd-demand)小节。

@sep

Since wrapper needed to import all components which will cause redundancy.
If you want to use `babel-plugin-import` to solve the redundancy, please check this [NoForm and Ant Design - onDemand import](/docs?md=advanced/antd-demand)。

```

```jsx
import { default: Form, FormItem, FormCore } from 'noform';
import * as Antd from 'antd';
import { antd: antdWrapper } from 'noform/lib/wrapper/antd';
import dialogWrapper from 'noform/lib/wrapper/antd';
import repeater from 'noform/lib/repeater/antd';

// Get standard component from wrapper
const { Input, Select, Checkbox, Radio, Switch, Slider, DatePicker, TimePicker,
    Rate, Cascader, TreeSelect, Upload, Button, Modal, Icon, InputNumber } = antdWrapper(Antd);

const Dialog = dialogWrapper(Antd); // Get dialog
const { TableRepeater, InlineRepeater } = repeater({ Dialog, Button, Input }); // Get Repeater

```

```i18n
### 效果

下面是示例效果：
@sep
### Example

```

```onlydemo

const { default: Form, FormItem, FormCore } = noform;
    const { antd: antdWrapper } = noformWrapper;
    const { Input, Select, Checkbox, Radio, Switch, Slider, DatePicker, TimePicker,
  Rate, Cascader, TreeSelect, Upload, Button, Modal, Icon, InputNumber, AutoComplete, Mention } = antdWrapper(antd);

    const { Textarea } = Input;
    const { Group: RadioGroup } = Radio;
    const { Group: CheckboxGroup } = Checkbox;
  
    const dataSource = [
      { label: 'optA', value: 'optA'},
      { label: 'optB', value: 'optB'}
    ];

    const fileList = [
      { uid: 1, name: 'xxx.png', url: 'http://www.baidu.com/xxx.png', },
      { uid: 3, name: 'zzz.png', status: 'error', reponse: 'Server Error 500' }
    ];
    
    class App extends React.Component {
        componentWillMount = () => { // initialized formCore instance
          this.core = new FormCore();
        }
    
        setStatus = (status) => {
          this.core.setGlobalStatus(status);
        }

        render() { // inject core        
            return <Form core={this.core} layout={{ label: 6, control: 18 }}>
                <FormItem label="input" name="input"><Input /></FormItem>
                <FormItem label="AutoComplete" name="AutoComplete"><AutoComplete options={dataSource} /></FormItem>                
                <FormItem label="Textarea" name="Textarea"><Textarea /></FormItem>
                <FormItem label="select" name="select"><Select options={dataSource} /></FormItem>
                <FormItem label="Checkbox" name="Checkbox"><Checkbox >Selected</Checkbox></FormItem>
                <FormItem label="Radio" name="Radio"><Radio >Selected</Radio></FormItem>
                <FormItem label="Switch" name="Switch"><Switch /></FormItem>
                <FormItem label="CheckboxGroup" name="CheckboxGroup"><CheckboxGroup options={dataSource} /></FormItem>
                <FormItem label="RadioGroup" name="RadioGroup"><RadioGroup options={dataSource} /></FormItem>
                <FormItem label="Slider" name="Slider"><Slider /></FormItem>
                <FormItem label="Rate" name="Rate"><Rate /></FormItem>
                <FormItem label="DatePicker" name="DatePicker"><DatePicker /></FormItem>
                <FormItem label="TimePicker" name="TimePicker"><TimePicker /></FormItem>
                <FormItem label="InputNumber" name="InputNumber"><InputNumber /></FormItem>
                <FormItem label="Cascader" name="Cascader"><Cascader options={dataSource} /></FormItem>
                <FormItem label="TreeSelect" name="TreeSelect"><TreeSelect treeData={dataSource} /></FormItem>
                <FormItem label="Upload" name="Upload" value={fileList}>
                    <Upload >
                        <Button><Icon type="upload" /> Click to Upload</Button>
                      </Upload>
                </FormItem>

                <FormItem label="Change Status">
                    <div >
                        <Button style={{ marginRight: 12 }} onClick={this.setStatus.bind(this, 'edit')}>Edit</Button>
                        <Button style={{ marginRight: 12 }} onClick={this.setStatus.bind(this, 'preview')}>Preview</Button>
                        <Button style={{ marginRight: 12 }} onClick={this.setStatus.bind(this, 'disabled')}>Disbaled</Button>
                    </div>
                </FormItem>
            </Form>
        }
    }
    
    ReactDOM.render(<App />, document.getElementById('demo'));
```

```i18n

### 核心代码

要结合antd使用，主要代码如下图所示：

@sep

### Code

```

```jsx

    import { default: Form, FormItem, FormCore } from 'noform';
    import * as antd from 'antd';
    import { antd: antdWrapper } from 'noform/lib/wrapper/antd';
    const { Input, Select, Checkbox, Radio, Switch, Slider, DatePicker, TimePicker,
  Rate, Cascader, TreeSelect, Upload, Button, Modal, Icon, InputNumber } = antdWrapper(antd);

    const dataSource = [
      { label: 'optA', value: 'optA'},
      { label: 'optB', value: 'optB'}
    ];
    
    class App extends React.Component {
        componentWillMount = () => { // initialized FormCore
          this.core = new FormCore();
        }
    
        setStatus = (status) => {
          this.core.setGlobalStatus(status);
        }

        render() { // inject FormCore instance
            return <Form core={this.core} layout={{ label: 6, control: 18 }}>
                <FormItem label="input" name="input"><Input /></FormItem>
                <FormItem label="select" name="select"><Select options={dataSource} /></FormItem>
                
                { /* ... antd components... */}

                <FormItem label="Change Status">
                    <div >
                        <Button style={{ marginRight: 12 }} onClick={this.setStatus.bind(this, 'edit')}>Edit</Button>
                        <Button style={{ marginRight: 12 }} onClick={this.setStatus.bind(this, 'preview')}>Preview</Button>
                        <Button style={{ marginRight: 12 }} onClick={this.setStatus.bind(this, 'disabled')}>Disabled</Button>
                    </div>
                </FormItem>
            </Form>
        }
    }
    
    ReactDOM.render(<App />, document.getElementById('demo'));

```