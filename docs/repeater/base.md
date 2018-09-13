```i18n

# Repeater

Repeater 的使用场景非常广，甚至可以延伸至传统的操作型List/Table，总之，Repeater被视为复杂表单的标志。

NoForm 提供以下类型的 Repeater: `TableRepeater`, `InlineRepeater(single/mutlple)`, `SelectifyRepeater`

@sep

# Repeater

Repeater is kind of symbol of complex form. You can even extend Repeater to List/Table which need data manipulation.

NoForm provide these type of Repeater: `TableRepeater`, `InlineRepeater(single/mutlple)`, `SelectifyRepeater`

```

```i18n

# 简介

@sep

# Brief Introduction

```

```onlydemo

    const { default: Form, FormItem, FormCore } = noform;
    const { antd: antdWrapper } = noformWrapper;
    const formatAntd = antdWrapper(antd);
    const { Input, Select, Checkbox, Radio, Switch, Button, Modal } = formatAntd;
    const Dialog = noformDialog.antd(antd);
    const { TableRepeater, InlineRepeater, Selectify } = noformRepeater.antd({ ...formatAntd, Dialog });
    const SelectifyRepeater = Selectify(TableRepeater);

    const { Group: RadioGroup } = Radio;
    const dataSource = [{ label: 'male', value: 'male' }, { label: 'female', value: 'female' }];

    const formConfig = {
        autoValidate: true,
        validateConfig: {
            username: { type: 'string', required: true },
        }
    };

    const initvalue = [
        { username: 'abcd', id: 'abcd' },
        { username: 'efgh', id: 'efgh' },
    ];

    class App extends React.Component {

        render() { // inject core        
            const inlineStyle = { style: { width: '100px', minWidth: '100px' } };
            return <Form style={{ height: '600px' }} core={this.core} layout={{ label: 8, control: 16 }}>
                <FormItem value={initvalue} label="tableRepeater" name="tableRepeater">
                    <TableRepeater formConfig={formConfig}>
                        <FormItem label="username" name="username"><Input {...inlineStyle} /></FormItem>
                    </TableRepeater>
                </FormItem>

                <FormItem value={initvalue} label="inlineRepeater(single)" name="inlineRepeater">
                    <InlineRepeater formConfig={formConfig}>
                        <FormItem label="username" name="username"><Input {...inlineStyle} /></FormItem>
                    </InlineRepeater>
                </FormItem>

                <FormItem defaultValue={initvalue} label="inlineRepeater(multiple)" name="inlineRepeaterMultiple">
                    <InlineRepeater multiple formConfig={formConfig}>
                        <FormItem label="username" name="username"><Input {...inlineStyle} /></FormItem>
                    </InlineRepeater>
                </FormItem>

                <FormItem value={{ dataSource: initvalue }} label="selectifyRepeater" name="selectifyRepeater">
                    <SelectifyRepeater selectMode="single" formConfig={formConfig}>
                        <FormItem label="username" name="username"><Input {...inlineStyle} /></FormItem>
                    </SelectifyRepeater>
                </FormItem>
            </Form>
        }
    }
    
    ReactDOM.render(<App />, document.getElementById('demo'));
```


```i18n

用法

@sep

Usage

```

```jsx

render() {
    return <Form>
        
        <FormItem name="products" >
            <TableRepeater formConfig={formConfig}>
                <FormItem label="name" name="name"><Input /></FormItem>
                <FormItem label="price" name="price"><Input /></FormItem>
            </TableRepeater>
        </FormItem>
        <FormItem name="package" >
            <InlineRepeater multiple formConfig={formConfig}>
                <FormItem label="weight" name="weight"><Input /></FormItem>
                <FormItem label="height" name="height"><Input /></FormItem>
            </InlineRepeater>
        </FormItem>
        <FormItem name="address">
            <SelectRepeater selectMode="single" asyncHandler={asyncHandler} formConfig={formConfig}>
                <FormItem label="country" name="country"><Input /></FormItem>
                <FormItem label="province" name="province"><Input /></FormItem>
            </SelectRepeater>        
        </FormItem>
    </Form>
}


```


```i18n

Repeater也提供以下钩子函数。详细情况请查看[asyncHandler](/docs?md=repeater/asyncHandler)

@sep

Rpeater also provides these hook funtion.Please check [asyncHandler](/docs?md=repeater/asyncHandler) for more informations.

```

```jsx

const asyncHandler = {
    add: () => {
        return {
            success: true,
            values: [], // return values means update the whole array
            item: {} // return item means update values of current row
        };
    },
    save: () => {
        return true; // boolean means success or not
    },
    ...
};

<Repeater asyncHandler={asyncHandler} >

```

```i18n

Rpeater 还能够定义单行的Form的配置`formConfig`，配置方式与独立的[core](/docs?md=basic/core)完全一致。更多配置请查看[Config](/docs?md=repeater/config)


@sep

Rpeater also provide `formConfig` to decalre form of each row. FormConfig is compatible with [core](/docs?md=basic/core). Please check [Config](/docs?md=repeater/config) for more configuration.

```

```jsx

const formConfig = {
    validateConfig: {},
    autoValidate: true,
    ...
};

<Repeater asyncHandler={asyncHandler} formConfig={formConfig}>
```