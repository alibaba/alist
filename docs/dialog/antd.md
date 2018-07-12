```i18n

# 接入 Ant Design

由于弹窗表单的使用频率非常高，并且常常和UI代码是分离的，因此NoForm也将其设置为OO的形式去使用，更符合常规使用习惯。

### import （按需加载， 推荐）

使用按需加载的方式，请查看[接入Ant Design 按需加载](/docs?md=advanced/antd-demand)小节。

@sep

# Ant Design

Dialog Form is very common use in our daily work.
NoForm provide "OO" way to implement it which is more suitable for developer's habits.

### Import on demand (Recommanded)

Check [Ant Design - import on demand](/docs?md=advanced/antd-demand) for more information about importing components on demand.

```

```jsx
import DialogForm from 'noform/lib/dialog/antd'; // DialogForm
```

```i18n

### import （非按需加载）

@sep

### import (Not on demand)

```

```jsx
import * as Antd from 'antd';
import dialogWrapper from 'noform/lib/wrapper/antd';
const Dialog = dialogWrapper(Antd); // get Dialog
```


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

            // mock fetch / Request
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
                onOk: (values, hide) => { // return promise
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
                <Button onClick={this.popupDialog}>Dialog Form</Button>
            </div>
        }
    }
    
    ReactDOM.render(<App />, document.getElementById('demo'));
```

```i18n

### 代码实现

要结合antd使用，主要代码如下图所示：

@sep

### Implement

```

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

            // mock fetch / Request
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
                onOk: (values, hide) => { // return promise
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

        render() { // inject core        
            return <div style={{ height: 480 }}>
                <Button onClick={this.popupDialog}>Dialog Form</Button>
            </div>
        }
    }
    
    ReactDOM.render(<App />, document.getElementById('demo'));

```

```i18n

### 关键部分

`表单的values` 和 `隐藏弹窗的hide` 方法在onOk的入参中分别是参数 1 和 2 。
onOk 接受promise返回，在这个promise里面，你可以自由控制发送的请求，控制成功和失败的相应行为，

@sep

### Key Parts

1. onOk params: (values, hide), values means Form's values, and hide for dialog.
2. onOk receive promise which you can control you own action of success or failed.

```


```jsx
DialogForm.show({
    title: 'title',
    content: innerForm,
    onOk: (values, hide) => { // return promise
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