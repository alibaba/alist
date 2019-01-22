# 基本

- layout: default
- order: 0

最简单的用法。

---

## 可执行 DEMO

````js
import Form, { FormItem, FormCore } from 'noform';
import repeater  from '../src/repeater';
import * as Antd from 'antd';
import wrapper from '../src/wrapper/antd';
import dialogWrapper from '../src/dialog/antd';
import "./repeater.scss";

const { Button, Input, Radio, Checkbox, Select }  = wrapper(Antd);
const Dialog = dialogWrapper(Antd)
const { InlineRepeater, Selectify, ActionButton } = repeater({ Dialog, Button, Input, Checkbox, Radio });

const validateConfig = {
    username: { type: 'string', required: true },
};

const repeatValues = [
    { username: 'lily', gender: 'female', id: 'lily' },
    { username: 'bobby', gender: 'male', id: 'bobby' }
];

const publicCountry = [
    { label: 'US', value: 'US' },
    { label: 'GB', value: 'GB' },
    { label: 'AU', value: 'AU' },
    { label: 'CN', value: 'CN' },
    { label: 'BR', value: 'BR' },
    { label: 'EG', value: 'EG' },
    { label: 'DE', value: 'DE' },
];

const sleep = (mills) => new Promise(resolve => setTimeout(resolve, mills));

class Example extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.core = new FormCore({
            values: {
                // countryRepeater: [],
                countryRepeater: [
                    { country: ['US'] },
                    { country: ['AU', 'GB'] }
                ],
            },
        });

        window.core = this.core;
        this.formConfig = {
            validateConfig,
            autoValidate: true,
        };

        // TODO 影响设置值
        // this.core.setItemProps('countryRepeater', { hasAdd: (restCountry.length !== 0) });
        this.asyncHandler = {
            add: (values, ctx, index) => {
                const { repeater } = ctx;
                const { formList } = repeater;
                const restCountry = this.getRestCountry(formList);

                // TODO: 不生效
                ctx.setItemProps('country', { options: restCountry });

                this.core.setItemValue('restCountryDEMO', restCountry);
            },
            update: (values, ctx, index, keys) => {
                if (keys.indexOf('country') !== -1) {
                    const { repeater } = ctx;
                    const { formList } = repeater;
                    const options = this.getRestCountry(formList);
                    ctx.setItemProps('country', { options });

                    const repeaterIndex = formList.findIndex(item => item.id === ctx.id);
                    formList.forEach((fc, fcIndex) => {
                        if (fcIndex !== repeaterIndex) {
                            fc.setItemProps('country', { options });
                        }
                    });

                    this.core.setItemValue('restCountryDEMO', restCountry);
                }
            },
            remove: (values, ctx, index) => {
                const { repeater } = ctx;
                const { formList } = repeater;
                const otherList = formList.filter(fc => fc.id !== ctx.id);
                const options = this.getRestCountry(otherList);
                otherList.forEach(fc => {
                    fc.setItemProps('country', { options });
                });

                this.core.setItemValue('restCountryDEMO', restCountry);
            },
        };
    }

    syncCountry = () => {

    }

    getRestCountry = (formList) => {
        let restCountry = [...publicCountry];

        // 公共池去除本次已选取的
        formList.forEach(fc => {
            const countryCode = fc.getItemValue('country') || [];
            restCountry = restCountry.filter(r => countryCode.indexOf(r.value) === -1);
        });

        return restCountry;
    }

    render() {
        return (<Form core={this.core} layout={{ label: 6, control: 18 }} defaultMinWidth={false}>
            <div className="app-wrapper-2">
                <div className="example-item-wrapper">
                    <div className="example-title">Master Repeater Examples</div>                    
                    {/* <FormItem label="Public Country Repeater" name="countryRepeater">
                        <InlineRepeater asyncHandler={this.asyncHandler} multiple formConfig={this.formConfig}>
                            <FormItem label="country" name="country">
                                <Select mode="multiple" options={[]} />
                            </FormItem>
                        </InlineRepeater>
                    </FormItem> */}
                    <FormItem label="Public Country Repeater" name="countryRepeater">
                        <InlineRepeater asyncHandler={this.asyncHandler} multiple>
                            <FormItem label="country" name="country">
                                <Select mode="multiple" options={publicCountry} />
                            </FormItem>
                            <FormItem label="username" name="username">
                                <Input />
                            </FormItem>
                        </InlineRepeater>
                    </FormItem>
                    <FormItem render={(values) => {
                        const { restCountryDEMO } = values;
                        console.log('values', values);
                        const availableCountry = (restCountryDEMO || []).map(item => item.label).join(', ');
                        return <div>
                            Available Country: <span style={{ color: 'red' }}>{availableCountry}</span>
                        </div>
                    }} />
                </div>
            </div>
        </Form>);
    }
}

ReactDOM.render(<Example />, mountNode);

````

````css
body {
    /* background-color: #000; */
    /* background: #000 !important; */
    /* color: #fff !important; */
}
````