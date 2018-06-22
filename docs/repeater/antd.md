# 接入 Ant Design

Repeater可以说是复杂表单的象征了，非常实用的功能，在NoForm中的使用也非常方便。

### import （按需加载， 推荐）

使用按需加载的方式，请查看[接入Ant Design 按需加载](/docs?md=advanced/antd-demand)小节。

```jsx
import { TableRepeater, InlineRepeater } from 'noform/lib/repeater/antd'; // Repeater
```

### import （非按需加载）

```jsx
import * as Antd from 'antd';
import dialogWrapper from 'noform/lib/wrapper/antd';
import repeater from 'noform/lib/repeater/antd';

const Dialog = dialogWrapper(Antd); // Dialog获取
const { TableRepeater, InlineRepeater } = repeater({ Dialog, Button, Input }); // repeater获
```


```onlydemo

    const { default: Form, FormItem, FormCore } = noform;
    const { antd: antdWrapper } = noformWrapper;
    const { Input, Select, Checkbox, Radio, Switch, Button, Modal } = antdWrapper(antd);
    const Dialog = noformDialog.antd(antd);
    const { TableRepeater, InlineRepeater } = noformRepeater.antd(antd);

    const { Group: RadioGroup } = Radio;

    const dataSource = [{ label: 'male', value: 'male' }, { label: 'female', value: 'female' }];

    function filter(value, key) {
        return value.filter(item => item.drawerName.startsWith(key));
    }

    const validateConfig = {
        username: { type: 'string', required: true },
    };

    class App extends React.Component {

        render() { // 注入核心        
            const inlineStyle = { style: { width: '100px', minWidth: '100px' } };
            return <Form core={this.core} layout={{ label: 8, control: 16 }}>
                <FormItem label="repeater" name="repeater">
                    <TableRepeater filter={filter} validateConfig={validateConfig}>
                        <FormItem label="username" name="username"><Input {...inlineStyle} /></FormItem>
                        <FormItem label="gender" name="gender"><RadioGroup {...inlineStyle} options={dataSource} /></FormItem>
                    </TableRepeater>
                </FormItem>

                <FormItem label="inlineRepeater" name="inlineRepeater">
                    <InlineRepeater filter={filter} validateConfig={validateConfig}>
                        <FormItem label="username" name="username"><Input {...inlineStyle} /></FormItem>
                        <FormItem label="gender" name="gender"><RadioGroup {...inlineStyle} options={dataSource} /></FormItem>
                    </InlineRepeater>
                </FormItem>
            </Form>
        }
    }
    
    ReactDOM.render(<App />, document.getElementById('demo'));
```

### 代码实现

要结合antd使用，主要代码如下图所示：

```jsx

    import React, { Component } from 'react';
    import Form, { FormItem, FormCore } from 'noform';
    import * as Antd from 'antd';
    import dialogWrapper from 'noform/lib/wrapper/antd';
    import repeater from 'noform/lib/repeater/antd';

    const Dialog = dialogWrapper(Antd); // Dialog获取
    const { TableRepeater, InlineRepeater } = repeater({ Dialog, Button, Input }); // repeater获

    const { Group: RadioGroup } = Radio;

    const dataSource = [{ label: 'male', value: 'male' }, { label: 'female', value: 'female' }];

    function filter(value, key) {
        return value.filter(item => item.drawerName.startsWith(key));
    }

    // 校验规则
    const validateConfig = {
        username: { type: 'string', required: true },
    };

    class App extends React.Component {

        render() { // 注入核心        
            return <Form core={this.core} layout={{ label: 8, control: 16 }}>
                <FormItem label="repeater" name="repeater">
                    <TableRepeater filter={filter} validateConfig={validateConfig}>
                        <FormItem label="username" name="username"><Input {...inlineStyle} /></FormItem>
                        <FormItem label="gender" name="gender"><RadioGroup {...inlineStyle} options={dataSource} /></FormItem>
                    </TableRepeater>
                </FormItem>

                <FormItem label="inlineRepeater" name="inlineRepeater">
                    <InlineRepeater filter={filter} validateConfig={validateConfig}>
                        <FormItem label="username" name="username"><Input {...inlineStyle} /></FormItem>
                        <FormItem label="gender" name="gender"><RadioGroup {...inlineStyle} options={dataSource} /></FormItem>
                    </InlineRepeater>
                </FormItem>
            </Form>
        }
    }
    
    ReactDOM.render(<App />, document.getElementById('demo'));

```