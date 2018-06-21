# 接入 Ant Design

由于弹窗表单的使用频率非常高，并且常常和UI代码是分离的，因此NoForm也将其设置为OO的形式去使用，具体效果如下：

```onlydemo

const { default: Form, FormItem, FormCore } = noform;
    const { antd: antdWrapper } = noformWrapper;
    const { Input, Select, Checkbox, Radio, Switch, Button, Modal } = antdWrapper(antd);
    const DialogForm = noformDialog.antd(antd);

    const dataSource = [
      { label: 'optA', value: 'optA'},
      { label: 'optB', value: 'optB'}
    ];
    
    class App extends React.Component {    
        popupDialog = () => {
            const innerForm = <Form core={this.core} layout={{ label: 8, control: 16 }}>
                <FormItem label="input" name="input"><Input /></FormItem>
                <FormItem label="select" name="select"><Select options={dataSource} /></FormItem>
                <FormItem label="Checkbox" name="Checkbox"><Checkbox /></FormItem>
                <FormItem label="Radio" name="Radio"><Radio /></FormItem>
                <FormItem label="Switch" name="Switch"><Switch /></FormItem>
            </Form>

            // 模拟 fetch / Request
            const mockRequest = () => {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                    const isBigger5 = (Math.random() * 10) > 4;
                        if (isBigger5) {
                            resolve('success');
                        } else {
                            reject('reject');
                        }
                    }, 500);
                });
            };

            DialogForm.show({
                title: 'title',
                content: innerForm,
                onOk: (values, hide) => { // 返回promise, 代替原有的preSubmit、responseCb、successCb
                    return new Promise(async (resolve, reject) => {
                        try {
                            const result = await mockRequest('url', values);
                            resolve();
                            Modal.success({ title: 'success', onOk: hide });
                        } catch (e) {
                            reject();
                            Modal.error({ title: 'error' });            
                        }
                    });
                }
            });
        }

        render() {
            return <div style={{ height: 480 }}>
                <Button onClick={this.popupDialog}>弹窗表单</Button>
            </div>
        }
    }
    
    ReactDOM.render(<App />, document.getElementById('demo'));
```

### 代码实现

要结合antd使用，主要代码如下图所示：

```jsx

    import { default: Form, FormItem, FormCore } from 'noform';
    import * as antd from 'antd';
    import antdWrapper from 'noform/dist/wrapper/antd';
    import DialogWrapper from 'noform/dist/dialog/antd';    
    const { Input, Select, Checkbox, Radio, Switch, Slider, DatePicker, TimePicker,
  Rate, Cascader, TreeSelect, Upload, Button, Modal, Icon, InputNumber } = antdWrapper(antd);
    const DialogForm = noformDialog.antd(antd);

    const dataSource = [
      { label: 'optA', value: 'optA'},
      { label: 'optB', value: 'optB'}
    ];
    
    class App extends React.Component {
        popupDialog = () => {
            const innerForm = <Form core={this.core} layout={{ label: 8, control: 16 }}>
                <FormItem label="input" name="input"><Input /></FormItem>
                <FormItem label="select" name="select"><Select options={dataSource} /></FormItem>
                <FormItem label="Checkbox" name="Checkbox"><Checkbox /></FormItem>
                <FormItem label="Radio" name="Radio"><Radio /></FormItem>
                <FormItem label="Switch" name="Switch"><Switch /></FormItem>
            </Form>

            // 模拟 fetch / Request
            const mockRequest = () => {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                    const isBigger5 = (Math.random() * 10) > 4;
                        if (isBigger5) {
                            resolve('success');
                        } else {
                            reject('reject');
                        }
                    }, 500);
                });
            };

            DialogForm.show({
                title: 'title',
                content: innerForm,
                onOk: (values, hide) => { // 返回promise, 代替原有的preSubmit、responseCb、successCb
                    return new Promise(async (resolve, reject) => {
                        try {
                            const result = await mockRequest('url', values);
                            resolve();
                            Modal.success({ title: 'success', onOk: hide });
                        } catch (e) {
                            reject();
                            Modal.error({ title: 'error' });            
                        }
                    });
                }
            });
        }

        render() { // 注入核心        
            return <div style={{ height: 480 }}>
                <Button onClick={this.popupDialog}>弹窗表单</Button>
            </div>
        }
    }
    
    ReactDOM.render(<App />, document.getElementById('demo'));

```

### 关键部分

`表单的values` 和 `隐藏弹窗的hide` 方法在onOk的入参中分别是参数 1 和 2 。
onOk 接受promise返回，在这个promise里面，你可以自由控制发送的请求，控制成功和失败的相应行为，


```jsx
DialogForm.show({
    title: 'title',
    content: innerForm,
    onOk: (values, hide) => { // 返回promise, 代替原有的preSubmit、responseCb、successCb
        return new Promise(async (resolve, reject) => {
            try {
                const result = await mockRequest('url', values);
                resolve();
                Modal.success({ title: 'success', onOk: hide });
            } catch (e) {
                reject();
                Modal.error({ title: 'error' });            
            }
        });
    }
});

```