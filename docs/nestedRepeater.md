# 基本

- layout: default
- order: 0

最简单的用法。

---

## 可执行 DEMO

````js
import Form, { FormItem, Item, FormCore, If } from '../src';
import repeater  from '../src/repeater';
import * as Antd from 'antd';
import wrapper from '../src/wrapper/antd';
import dialogWrapper from '../src/dialog/antd';
import "./repeater.scss";

const { Modal, Button, Input, Checkbox, Radio, Switch }  = wrapper(Antd);
const Dialog = dialogWrapper(Antd)
const { TableRepeater, InlineRepeater, Selectify, ActionButton } = repeater({ Dialog, Button, Input, Checkbox, Radio });
const { Group: RadioGroup } = Radio;

const SelectRepeater = Selectify(TableRepeater);
const SelectRepeaterInline = Selectify(InlineRepeater);

const formCore = new FormCore({
    autoValidate: true,
    onChange: (fireKeys, values) => {
        // console.log('[top onchange]', fireKeys, values);
        const vprops = {
            locale: values.locale
        };
    },
    values: {
        selectRepeater: {
            dataSource: [
                { username: 'hhh' }
            ],
            value: []
        }
    },
});

window.formCore = formCore;
const validateConfig = {
    drawerName: { type: 'string', required: true }
};

const formConfig = {
    // validateConfig,
    // autoValidate: true,
    onChange: (fireKeys, values) => {
        // console.log('repeater change', fireKeys, values);
    },
    initialized: (core) => {
        core.setValues({ happy: true,  });
    }
};


const formConfig2 = {
    initialized: (core) => {
        core.setValues({ happy: false,  });
    }
};

window.formConfig = formConfig;
window.formConfig2 = formConfig2;

setTimeout(() => {
    formCore.setItemProps('selectRepeater', {
        happy: false,
        usernameData: 'abcd',
    });

    formCore.setItemProps('selectRepeater', {
        formConfig: {
            initialized: (core) => {
                const { usernameData, happy} = formCore.getItemProps('selectRepeater');
                core.setValues({ username: usernameData, happy });
            }
        }
    })
}, 300);

ReactDOM.render(<Form defaultMinWidth={false} core={formCore}>    
    <Item name="repeater" >
        <InlineRepeater multiple formConfig={formConfig} >
            <FormItem label="username" name="username"><Input /></FormItem>
            
            <FormItem label="hello" multiple>
                <If when={({ happy }) => {
                    return !!happy;
                } }>
                    <FormItem name="hello"><Input /></FormItem>
                </If>
            </FormItem>
        </InlineRepeater>
    </Item>
    <Item name="selectRepeater" >
        <SelectRepeaterInline multiple formConfig={formConfig} >
            <FormItem label="username" name="username"><Input /></FormItem>
            <FormItem label="hello" multiple>
                <If when={({ happy }) => {
                    return !!happy;
                } }>
                    <FormItem name="hello"><Input /></FormItem>
                </If>
            </FormItem>
        </SelectRepeaterInline>
    </Item>
</Form>, mountNode);
````
