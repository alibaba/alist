```i18n

# 接入 Ant Design

Repeater可以说是复杂表单的象征了，非常实用的功能，在NoForm中的使用也非常方便。

### import （按需加载， 推荐）

使用按需加载的方式，请查看[接入Ant Design 按需加载](/docs?md=advanced/antd-demand)小节。

@sep

# Ant Design

Repeater is kind of symbol of complex form and it is practical and also common use in our daily work.

### Import on demand (Recommanded)

Check [Ant Design - import on demand](/docs?md=advanced/antd-demand) for more information about importing components on demand.

```

```jsx
import { TableRepeater, InlineRepeater } from 'noform/lib/repeater/antd'; // Repeater
```

```i18n

### import （非按需加载）

@sep

### import (Not on demand)

```

```jsx
import * as Antd from 'antd';
import dialogWrapper from 'noform/lib/wrapper/antd';
import repeater from 'noform/lib/repeater/antd';

const Dialog = dialogWrapper(Antd); // get Dialog
const { TableRepeater, InlineRepeater } = repeater({ Dialog, Button, Input }); // get Repeater
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

        render() { // inject core        
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

```i18n

### 代码实现

要结合antd使用，主要代码如下图所示：

@sep

### Implement

```

```jsx

    import React, { Component } from 'react';
    import Form, { FormItem, FormCore } from 'noform';
    import * as Antd from 'antd';
    import dialogWrapper from 'noform/lib/wrapper/antd';
    import repeater from 'noform/lib/repeater/antd';

    const Dialog = dialogWrapper(Antd); // get Dialog
    const { TableRepeater, InlineRepeater } = repeater({ Dialog, Button, Input }); // get repeater

    const { Group: RadioGroup } = Radio;

    const dataSource = [{ label: 'male', value: 'male' }, { label: 'female', value: 'female' }];

    function filter(value, key) {
        return value.filter(item => item.drawerName.startsWith(key));
    }

    // validate rules
    const validateConfig = {
        username: { type: 'string', required: true },
    };

    class App extends React.Component {

        render() { // inject core        
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