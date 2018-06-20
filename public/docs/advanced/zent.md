# 接入Zent

[Zent](https://github.com/youzan/zent)来自有赞，它是个很酷的组件库。
有人说是迷你版的antd，总之，结合zentWrapper可以达到开箱即用的效果。

```onlydemo

const { default: Form, FormItem, FormCore } = noform;
    const { zent: zentWrapper } = noformWrapper;
    const { Input, Select, Checkbox, Radio, Switch, Slider, DatePicker, TimePicker,
  Rate, Cascader, TreeSelect, Upload, Button, Modal, Icon, InputNumber, AutoComplete, Mention } = zentWrapper(zent);

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
        componentWillMount = () => { // 初始化表单核心
          this.core = new FormCore();
        }
    
        setStatus = (status) => {
          this.core.setGlobalStatus(status);
        }

        render() { // 注入核心        
            return <Form core={this.core} layout={{ label: 6, control: 18 }}>
                <FormItem label="input" name="input"><Input /></FormItem>
                { /* <FormItem label="AutoComplete" name="AutoComplete"><AutoComplete options={dataSource} /></FormItem> */ }
                { /* <FormItem label="Mention" name="Mention"><Mention suggestions={['aaaaa', 'bbbbb', 'cccc']} /></FormItem> */ }
                <FormItem label="Textarea" name="Textarea"><Textarea /></FormItem>
                <FormItem label="select" name="select"><Select options={dataSource} /></FormItem>
                <FormItem label="Checkbox" name="Checkbox"><Checkbox >选中</Checkbox></FormItem>
                <FormItem label="Radio" name="Radio"><Radio >选中</Radio></FormItem>
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

                <FormItem label="切换状态">
                    <div >
                        <Button style={{ marginRight: 12 }} onClick={this.setStatus.bind(this, 'edit')}>编辑态</Button>
                        <Button style={{ marginRight: 12 }} onClick={this.setStatus.bind(this, 'preview')}>预览态</Button>
                        <Button style={{ marginRight: 12 }} onClick={this.setStatus.bind(this, 'disabled')}>禁用态</Button>
                    </div>
                </FormItem>
            </Form>
        }
    }
    
    ReactDOM.render(<App />, document.getElementById('demo'));
```

### 核心代码

要结合antd使用，主要代码如下图所示：

```jsx

    import { default: Form, FormItem, FormCore } from 'noform';
    import * as antd from 'antd';
    import { antd: antdWrapper } from 'noform/dist/wrapper/zent';
    const { Input, Select, Checkbox, Radio, Switch, Slider, DatePicker, TimePicker,
  Rate, Cascader, TreeSelect, Upload, Button, Modal, Icon, InputNumber } = antdWrapper(antd);

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

        render() { // 注入核心        
            return <Form core={this.core} layout={{ label: 6, control: 18 }}>
                <FormItem label="input" name="input"><Input /></FormItem>
                <FormItem label="select" name="select"><Select options={dataSource} /></FormItem>
                
                { /* ... 省略众多antd组件 */}

                <FormItem label="切换状态">
                    <div >
                        <Button style={{ marginRight: 12 }} onClick={this.setStatus.bind(this, 'edit')}>编辑态</Button>
                        <Button style={{ marginRight: 12 }} onClick={this.setStatus.bind(this, 'preview')}>预览态</Button>
                        <Button style={{ marginRight: 12 }} onClick={this.setStatus.bind(this, 'disabled')}>禁用态</Button>
                    </div>
                </FormItem>
            </Form>
        }
    }
    
    ReactDOM.render(<App />, document.getElementById('demo'));

```