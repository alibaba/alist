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
// import '../src/repeater/index.scss';
// import "antd/dist/antd.css";
import "./repeater.scss";

const { Select, Modal, Button, Input, Checkbox, Radio, Switch }  = wrapper(Antd);
const Dialog = dialogWrapper(Antd)
const { TableRepeater, InlineRepeater, Selectify, ActionButton } = repeater({ Dialog, Button, Input, Checkbox, Radio });
const { Group: RadioGroup } = Radio;

const SelectRepeater = Selectify(TableRepeater);
const SelectRepeaterInline = Selectify(InlineRepeater);

// 自定义的过滤函数
function filter(value, key){
    return value.filter(item => item.drawerName && item.drawerName.startsWith(key))
}

function filterX(value, key){
    return value.filter(item => item.threshold && item.threshold.startsWith(key))
}

function filterUsername(value, key){
    return value.filter(item => item.username && item.username.startsWith(key))
}

const tCore = new FormCore({
    onChange: (fireKeys, values) => {
        // console.log('ffff', fireKeys, values);
    }
});

setTimeout(() => {
    tCore.setValues({
        a: 'a',
        b: 'b',
        c: 'c',
        d: 'd',
    });
});


const formCore = new FormCore({
    autoValidate: true,
    validateConfig: {
        irn: [
            // { required: true, message: 'errrrrrrr' },
            { validator: (rule, value, callback) => {
                console.log(rule, value);
                if (value && value.length > 1) {
                    callback(['mammmmmmx']);
                } else {
                    callback([]);
                }
            }}
            // return new Promise((resolve, reject) => {
            //         setTimeout(() => {
            //             if (value && value.length > 1) {
            //                 reject('iii');
            //             } else {
            //                 resolve('null');
            //             }
                        
            //             // resolve(null);
            //         }, 200);
            //     });
        ]
    },
    onChange: (fireKeys, values) => {
        // console.log('[top onchange]', fireKeys, values);
        const vprops = {
            locale: values.locale
        };

        formCore.setProps({
            rulesx: vprops,
            // selectRepeaterInlinemultiple: vprops,
            // deepselect: vprops,
        });
    },
    // values: {
    //     rules: [{ price: '', threshold: '' }]
    // }
});

// formCore.setValues({
//     rules: [{ price: '', threshold: '' }]
// });

window.formCore = formCore;
const validateConfig = {
    drawerName: { type: 'string', required: true }
};

const formConfig = {
    validateConfig,
    autoValidate: true,
    onChange: (fireKeys, values) => {
        // console.log('====>', fireKeys, values);
    },
    values: {
        // drawerName: 'box',
    }
};

const deepFormConfig = {
    ...formConfig,
    onChange: (fireKeys, values, ctx) => {
        const { dataSource } = values;
        if (fireKeys.indexOf('dataSource') !== -1) {
            
        }
    }
};

const deepCore = new FormCore();
const fuzzCore = new FormCore();
window.deepCore = deepCore;

const dialogConfig = {
    // full: true,
    // layout: { label: 10, control: 14 },
    // custom: (core, type) => {
    //     let title = '';
    //     if (type === 'add') {
    //         title = '增加xxx';
    //     } else if (type === 'update') {
    //         title = '修改xxx';
    //     }

    //     return {
    //         title
    //     }
    // }
    width: 940
};

const easyAdd = (values) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const newValues = {
                ...values,
                id: 'add' + Math.random().toString(36).slice(2)
            };

            const { deep } = formCore.getValues();
            const { dataSource } = deep;
            fuzzCore.setValues({
                deep: {
                    ...deep,
                    value: [newValues]
                }
            });

            resolve({
                success: true,
                values: [...dataSource, newValues]
            });
        }, 1500);
    });
};

const asyncAdd = (values) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const newValues = {
                ...values,
                id: 'add' + Math.random().toString(36).slice(2)
            };

            // const { address } = fuzzCore.getValues();
            // const { dataSource } = address;
            // fuzzCore.setValues({
            //     address: {
            //         ...address,
            //         value: [newValues]
            //     }
            // });

            resolve({
                success: true,
                // values: [...dataSource, newValues]
                item: newValues
            });
        }, 1500);
    });
};

const asyncHandler = {
    add: asyncAdd,
    // add: easyAdd,
    save: asyncAdd,
    update: (values) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // resolve({
                //     success: true,
                //     values
                // });
                resolve(true);
            }, 500);
        });
    },
    remove: () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(true);
            }, 500);
        });
    }
};

const renderList = () => {
    const fuzzValues = fuzzCore.getValues();
    const { address } = fuzzValues || {};
    const { dataSource, value } = address || {};

    const tmp = new FormCore({
        values: {
            list: address
        },
        onChange: (fireKeys, values) => {
            const { list } = values;
            console.log('list change....', list);
            // fuzzCore.setValues({
            //     address: list
            // });
        }
    });
    Dialog.show({
        title: 'hello',
        content: <Form core={tmp}>
            <Item name="list">
                <SelectRepeater selectMode="single" asyncHandler={asyncHandler} formConfig={formConfig} hasAdd={false}>
                    <FormItem label="开票人" name="drawerName"><Input /></FormItem>
                    <FormItem label="税号" name="taxpayerNumber"><Input /></FormItem>
                </SelectRepeater>
            </Item>                
        </Form>,
        // onOk: (values, hide) => {
        //     hide();
        // }
        footer: (hide) => {
            return <div><Button onClick={hide}>xxx</Button></div>
        }
    });
}

const customView = (_, ctx) => {
    const fuzzValues = fuzzCore.getValues();
    const { address } = fuzzValues || {};
    const { dataSource, value } = address || {};

    let selectElement = null;
    if (value && value.length > 0) {
        selectElement = <a href="#" onClick={renderList}>重新选择</a>
    }

    let addElement = null;
    if (!(dataSource && dataSource.length === 5)) {
        addElement = <ActionButton type="add">添加新地址</ActionButton>;
    }
    
    return <div>
        {selectElement}{addElement}
    </div>
}

const CustomEle = ({ onChange }) => {
    return <Form core={fuzzCore} onChange={onChange}>
        <Item name="address">
            <SelectRepeater dialogConfig={dialogConfig} selectFormConfig={deepFormConfig} selectMode="single" asyncHandler={asyncHandler} formConfig={formConfig} view={customView} hasAdd={false}>
                <FormItem label="开票人" name="drawerName"><Input /></FormItem>
                <FormItem label="税号" name="taxpayerNumber"><Input /></FormItem>
            </SelectRepeater>
        </Item>
    </Form>
}

const defaultValue = {
    deep: {
        dataSource: [
            { drawerName: 'aa', taxpayerNumber: 'bb', id: 1 },
            { drawerName: 'cc', taxpayerNumber: 'dd', id: 2 },
            { drawerName: 'ee', taxpayerNumber: 'ff', id: 3 }
        ],
        value: []
    },
    fuzz: {
        address: {
            dataSource: [
                { drawerName: 'aa', taxpayerNumber: 'bb', id: 1 },
                { drawerName: 'cc', taxpayerNumber: 'dd', id: 2 },
                { drawerName: 'ee', taxpayerNumber: 'ff', id: 3 }
            ],
            value: []
        }
    },
}; 

formCore.setValues({
    ir: [
        {  drawerName: '1' },
        {  drawerName: '2' }
    ],
    irn: [
        {  drawerName: '1' },
        {  drawerName: '2' }
    ],
    name: 'billy'
});

const inlineAsyncHandler = {
    add: () => {
        return {
            success: true,
            // item: { drawerName: 'abcd' }
            // values: [{
            //     drawerName: 'abcd'
            // }]
        }
    },
    save: (values) => {
        console.log('save===>', values);
        return true;
    }
};

const extraProps = {
    maxLength: 5
};

const sleep = (time) => {
    return new Promise((resolve) => {
        setTimeout(resolve, time);
    });
}

const selectAsyncHandler = {
    // select: async (checked, values, arr) => {
    //     // await sleep(1000);
    //     return true;
    // }
};

const dasyncHandler = {
    add: (values) => {
        return ({
            success: true,
            item: {
                ...values,
                id: 'add' + Math.random().toString(36).slice(2)
            }
        });
    }
};

const hasDelete = (values, index) => {
    return index > 0;
};


const renderOper = (btnList, core) => {
    const showValue = () => {
        console.log('showValue:', core.getValues());
    }
    return <div>
        <a href="javascript:void(0)" onClick={showValue}>查看</a>
        {btnList}
    </div>
};

const checkChangeConfig = {
    onChange: (fireKey, values, ctx) => {
        console.log('fireKey', fireKey, values);
    }
}

const rpOnMount = (rp) => {
    window.rp = rp;
};

// const hasDelete = false;

ReactDOM.render(<Form defaultMinWidth={false} core={formCore} value={defaultValue}>
    {/* <FormItem name="tabledemo" defaultValue={[{ username: 'a' }, { username: 'b' }]}>
        <TableRepeater hasDeleteConfirm={false} hasOrder filter={filterUsername} formConfig={formConfig}>
            <FormItem status="hidden" label="order" renderCell={(_, { index: order }) => <div>{order+1}</div> } />
            <FormItem label="username" name="username"><Input /></FormItem>
        </TableRepeater>
    </FormItem>
    <FormItem name="tabledemoff" defaultValue={[{ username: 'a' }, { username: 'b' }]}>
        <InlineRepeater hasOrder filter={filterUsername} formConfig={formConfig}>
            <FormItem status="hidden" label="order" renderCell={(_, { index: order }) => <div>{order+1}</div> } />
            <FormItem suffix="USD" label="username" name="username"><Input /></FormItem>
        </InlineRepeater>
    </FormItem>
    <FormItem label="locale" name="locale" defaultValue="en"><RadioGroup options={[
        { label: 'en', value: 'en' },
        { label: 'zh', value: 'zh' }
    ]} /></FormItem>
    <FormItem name="deepselect">
        <SelectRepeater selectMode="single" asyncHandler={asyncHandler} formConfig={formConfig}>
            <FormItem label="username" name="username"><Input /></FormItem>
        </SelectRepeater>        
    </FormItem> */}

    {/* <FormItem defaultValue={{ dataSource: [{username: 'a', id: 'a'}, {username: 'b', id: 'b'}] }} name="deepselectxxxxx">
        <SelectRepeater selectMode="single" formConfig={formConfig}>
            <FormItem label="username" name="username"><Input /></FormItem>
        </SelectRepeater>        
    </FormItem> */}

    {/* <FormItem name="deepselect">
         <InlineRepeater filter={filter} formConfig={formConfig} addPosition="bottom">
            <FormItem required label="开票人" name="drawerName"><Input /></FormItem>
       </InlineRepeater>      
    </FormItem>
    
    <Item name="tableRepeat" >
        <TableRepeater formConfig={formConfig} dialogConfig={dialogConfig}>
            <FormItem label="开票人" name="drawerName"><Input /></FormItem>
            <FormItem label="税号" name="taxpayerNumber"><Input /></FormItem>
            <FormItem label="子公司" name="branchName"><Input /></FormItem>
            <FormItem label="核查结果" name="checkResultName"><Input /></FormItem>
            <FormItem label="拒绝原因" name="denyReason"><Input /></FormItem>
            <FormItem label="创建人" name="creatorName"><Input /></FormItem>
        </TableRepeater>
    </Item>

    <FormItem label="inlineRepeat" name="inlineRepeat">
        <InlineRepeater formConfig={formConfig} addPosition="bottom">
            <FormItem required label="开票人" name="drawerName"><Input /></FormItem>
            <FormItem required label="税号" name="taxpayerNumber"><Input /></FormItem>
            <FormItem required label="子公司" name="branchName"><Input /></FormItem>
            <FormItem required label="核查结果" name="checkResultName"><Input /></FormItem>
            <FormItem required label="拒绝原因" name="denyReason"><Input /></FormItem>
            <FormItem required label="创建人" name="creatorName"><Input /></FormItem>
        </InlineRepeater>
    </FormItem> */}

    {/* <FormItem required label="username" name="username"><Input /></FormItem>
    <If when={(values) => {
        const { username } = values || {};
        return username === 'billy';
    }}>
        <FormItem label="inlineRepeat" name="inlineRepeat">
            <InlineRepeater addPosition="bottom">
                <FormItem required label="开票人" name="drawerName"><Input /></FormItem>
            </InlineRepeater>
        </FormItem>
    </If> */}

    <br/>
    <hr/>

    {/* <FormItem name="deep2">
        <SelectRepeater formConfig={formConfig}>
            <FormItem label="isCheck" name="isCheck" status="preview"><Switch /></FormItem>
            <FormItem label="isCheckText" name="isCheckText"><Switch checkedChildren="开" unCheckedChildren="关" /></FormItem>
            <FormItem label="drawerName" name="drawerName"><Input /></FormItem>
            <FormItem label="age" name="age"><Input /></FormItem>
        </SelectRepeater>        
    </FormItem> */}

    {/* <FormItem name="deep2">
        <SelectRepeater selectMode="multiple" asyncHandler={asyncHandler} formConfig={formConfig}>
            <FormItem label="username" name="username"><Input /></FormItem>
            <FormItem label="age" name="age"><Input /></FormItem>
        </SelectRepeater>        
    </FormItem>
    <FormItem name="deep3">
        <SelectRepeater selectMode="single" asyncHandler={asyncHandler} formConfig={formConfig}>
            <FormItem label="username" name="username"><Input /></FormItem>
            <FormItem label="age" name="age"><Input /></FormItem>
        </SelectRepeater>        
    </FormItem> */}
    {/* <FormItem name="deep3">
        <SelectRepeaterInline selectMode="single" asyncHandler={asyncHandler} formConfig={formConfig}>
            <FormItem label="username" name="username"><Input /></FormItem>
            <FormItem label="age" name="age"><Input /></FormItem>
        </SelectRepeaterInline>
    </FormItem> */}

    {/* <FormItem name="deep">
        <SelectRepeaterInline asyncHandler={selectAsyncHandler} formConfig={formConfig} maxLength={3}>
            <FormItem label="开票人" name="drawerName"><Input /></FormItem>
            <FormItem label="税号" name="taxpayerNumber"><Input /></FormItem>
        </SelectRepeaterInline>
    </FormItem> */}

    {/* <FormItem label="SelectTableRepeater" name="selectTableRepeater">
        <SelectRepeater asyncHandler={dasyncHandler}>
            <FormItem label="username" name="username"><Input style={{ width: 100 }} /></FormItem>
            <FormItem label="gender" name="gender"><Input style={{ width: 100 }}/></FormItem>
        </SelectRepeater>
    </FormItem>

    <FormItem label="SelectTableRepeater" name="selectRepeaterInline">
        <SelectRepeaterInline asyncHandler={dasyncHandler}>
            <FormItem label="username" name="username"><Input style={{ width: 100 }} /></FormItem>
            <FormItem label="gender" name="gender"><Input style={{ width: 100 }}/></FormItem>
        </SelectRepeaterInline>
    </FormItem> */}

    {/* <FormItem label="selectRepeaterInlinemultiple" name="selectRepeaterInlinemultiple">
        <SelectRepeaterInline multiple asyncHandler={dasyncHandler}>
            <FormItem label="username" name="username"><Input style={{ width: 100 }} /></FormItem>
            <FormItem label="gender" name="gender"><Input style={{ width: 100 }}/></FormItem>
        </SelectRepeaterInline>
    </FormItem> */}

    {/* <FormItem name="rules">
        <InlineRepeater {...extraProps} formConfig={formConfig}>
            <FormItem prefix="满" suffix="元" label="threshold" name="threshold"><Input style={{ width: '100px' }}/></FormItem>
            <FormItem defaultMinWidth prefix="减" suffix="元" label="price" name="price"><Input style={{ width: '100px' }} /></FormItem>
        </InlineRepeater>
    </FormItem> */}

    {/* <FormItem defaultMinWidth={false} label="out" name="out"><Input style={{ width: '100px' }} /></FormItem> */}
    {/* <FormItem label="InlineRepeater" name="inlineRepeaterx">
        <InlineRepeater >
            <FormItem defaultMinWidth={false} label="username" name="username"><Input style={{ width: '100px' }} /></FormItem>
             <If when={(values, ctx) => {
                 return values.username === 'abc';
             }}>
                <FormItem defaultMinWidth={false} label="age" name="age"><Input style={{ width: '100px' }} /></FormItem>
             </If>
        </InlineRepeater>
    </FormItem> */}

    {/* <If when={(values) => {
        return !!values.out;
    }}>
        <FormItem name="rulesx">
            <InlineRepeater {...extraProps} formConfig={formConfig} filter={filterX} hasDelete>
                <FormItem defaultMinWidth={false} label="step1" name="step1"><Input style={{ width: '100px' }} /></FormItem>
                <FormItem defaultMinWidth={false} label="step2" name="step2"><Input style={{ width: '100px' }} /></FormItem>
                <FormItem defaultMinWidth={false} label="step3" name="step3"><Input style={{ width: '100px' }} /></FormItem>
            </InlineRepeater>
        </FormItem>
    </If> */}

    {/* <FormItem label="InlineRepeater" name="inlineRepeaterx">
        <InlineRepeater multiple >
            <FormItem label="username" name="username"><Input /></FormItem>
            <FormItem label="开关" name="isOpen"><Switch checkedChildren="开" unCheckedChildren="关" /></FormItem>
             <FormItem label="价格" multiple>
                <div>
                    <FormItem name="price"><Input/></FormItem>
                    <If when={(values, ctx) => !!values.isOpen}>
                        <FormItem label="age" name="age"><Input /></FormItem>
                    </If>
                </div>
            </FormItem>
        </InlineRepeater>
    </FormItem> */}

    {/* <If when={(values) => {
        return values.casewhen === 'a';
    }}> */}
        <FormItem label="rpnested" name="rpnested">
            <InlineRepeater filter={filterUsername} asyncHandler={dasyncHandler} onMount={rpOnMount} multiple renderOper={renderOper} formConfig={checkChangeConfig}>
                <FormItem status="hidden" label="order" renderCell={(_, { index: order }) => {
                    console.log('===', _);
                    return <div>{order+1}</div>;
                } } />
                <FormItem label="username" name="username"><Input /></FormItem>
                <FormItem label="age" name="age"><Input /></FormItem>
            </InlineRepeater>
        </FormItem>
    {/* </If> */}

    <FormItem label="casewhen" name="casewhen">
        <Select options={[{ label: 'a', value: 'a' }, { label: 'b', value: 'b' }]} />
    </FormItem>

    {/* <FormItem name="rulesy">
        <InlineRepeater {...extraProps} formConfig={formConfig} filter={filterX} hasDelete>
            <FormItem defaultMinWidth={false} label="step1" name="step1"><Input style={{ width: '100px' }} /></FormItem>
            <FormItem defaultMinWidth={false} label="step2" name="step2"><Input style={{ width: '100px' }} /></FormItem>
            <FormItem defaultMinWidth={false} label="step3" name="step3"><Input style={{ width: '100px' }} /></FormItem>
        </InlineRepeater>
    </FormItem> */}

    {/* <FormItem label="InlineRepeater" name="inlineRepeaterx">
        <InlineRepeater multiple>
            <FormItem label="username" name="username"><Input /></FormItem>
            <FormItem label="开关" name="isOpen"><Switch checkedChildren="开" unCheckedChildren="关" /></FormItem>
            
             <If when={(values, ctx) => {
                 return values.username === 'abc';
             }}>
                <FormItem label="age" name="age"><Input /></FormItem>
             </If>

             <FormItem label="list" name="list">
                <TableRepeater >
                    <FormItem label="iii" name="iii"><Input /></FormItem>
                </TableRepeater >
             </FormItem>
        </InlineRepeater>
    </FormItem> */}

    {/* <FormItem name="rulesx" status="preview">
        <InlineRepeater multiple {...extraProps} formConfig={formConfig} filter={filterX} hasDelete>
            <FormItem defaultMinWidth={false} label="isCheckText" name="isCheckText"><Switch checkedChildren="开" unCheckedChildren="关" /></FormItem>
            <FormItem defaultMinWidth={false} label="isRadio" name="isRadio"><Radio>选中</Radio></FormItem>
            <FormItem defaultMinWidth={false} label="isCheckbox" name="isCheckbox"><Checkbox>选中</Checkbox></FormItem>
            <FormItem prefix="满" suffix="元" label="threshold" name="threshold123"><Input style={{ width: '100px' }}/></FormItem>
            <FormItem prefix="满" suffix="元" status="preview" label="threshold" name="threshold"><Input style={{ width: '100px' }}/></FormItem>
            <FormItem defaultMinWidth prefix="减" suffix="元" label="price" name="price"><Input style={{ width: '100px' }} /></FormItem>
        </InlineRepeater>
    </FormItem> */}


    {/* <FormItem name="fuzz">
        <CustomEle />
    </FormItem> */}

    {/* <FormItem name="irn">
        <InlineRepeater multiple asyncHandler={inlineAsyncHandler} filter={filter} formConfig={formConfig} addPosition="bottom">
            <FormItem label="开票人" name="drawerName"><Input /></FormItem>
            <FormItem label="multi" multiple required>
                <div>
                    <FormItem name="aaa"><Input addonBefore="xxoo" style={{ width: '100px' }}  /></FormItem>
                    <FormItem name="bbb"><Input /></FormItem>
                </div>
            </FormItem>
            <FormItem label="税号" name="taxpayerNumber"><Input /></FormItem>
        </InlineRepeater>
    </FormItem> */}

{/*     
    <If when={(values) => {
        return values.name === 'billy';
    }}>
        <FormItem name="ir">
            <InlineRepeater multiple filter={filter} formConfig={formConfig} addPosition="bottom">
                <FormItem label="开票人" name="drawerName"><Input /></FormItem>
            </InlineRepeater>
        </FormItem>
    </If> */}
</Form>, mountNode);
````

````css
body {
    /* background-color: #000; */
    /* background: #000 !important; */
    /* color: #fff !important; */
}
````