# 基本

- layout: default
- order: 0

最简单的用法。

---

## 可执行 DEMO

````js
import Form, { FormItem, Item, FormCore } from '../src';
import repeater  from '../src/repeater';
import * as Antd from 'antd';
import wrapper from '../src/wrapper/antd';
import dialogWrapper from '../src/dialog/antd';
// import '../src/repeater/index.scss';
// import "antd/dist/antd.css";
import "./repeater.scss";

const { Modal, Button, Input, Checkbox, Radio }  = wrapper(Antd);
const Dialog = dialogWrapper(Antd)
const { TableRepeater, InlineRepeater, Selectify, ActionButton } = repeater({ Dialog, Button, Input, Checkbox, Radio });
// const { TableRepeater, InlineRepeater } = repeater({ Dialog, Button, Input });
// 自定义的过滤函数
function filter(value, key){
    return value.filter(item => item.drawerName.startsWith(key))
}

const SelectRepeater = Selectify(TableRepeater);

let formCore = null;
function formmount(core) {
    formCore = core;
    window.formCore = core;
}

const validateConfig = {
    drawerName: { type: 'string', required: true }
};

const formConfig = {
    validateConfig,
    autoValidate: true
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
window.deepCore = deepCore;

const asyncAdd = (values) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Number(values.taxpayerNumber) > 10) {
                resolve({
                    success: true,
                    values: {
                        ...values,
                        id: 'add' + Math.random().toString(36).slice(2)
                    }
                });
            } else {
                reject({
                    success: false,
                    values: null
                });
            }                
        }, 1500);
    });
};

const asyncHandler = {
    add: asyncAdd,
    save: asyncAdd,
    update: (values) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({
                    success: true,
                    values: {
                        ...values,
                        id: 'update' + Math.random().toString(36).slice(2)
                    }
                });
            }, 1500);
        });
    },
    remove: () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(true);
            }, 1500);
        });
    }
};

const fuzzCore = new FormCore();

const customView = (_, ctx) => {
    const fuzzValues = fuzzCore.getValues();
    const { address } = fuzzValues || {};
    const { dataSource } = address || {};

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
                fuzzCore.setValues({
                    address: list
                });
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
            onOk: (values, hide) => {
                hide();
            }
        });
    }

    let selectElement = null;
    // if (value && value.length > 0) {
        selectElement = <a href="#" onClick={renderList}>重新选择</a>
    // }

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
            <SelectRepeater selectFormConfig={deepFormConfig} selectMode="single" asyncHandler={asyncHandler} formConfig={formConfig} view={customView} hasAdd={false}>
                <FormItem label="开票人" name="drawerName"><Input /></FormItem>
                <FormItem label="税号" name="taxpayerNumber"><Input /></FormItem>
            </SelectRepeater>
        </Item>
    </Form>
}

ReactDOM.render(<Form onMount={formmount} onChange={console.log}>
    {/* <Item name="tableRepeat" >
        <TableRepeater formConfig={formConfig}>
            <FormItem label="开票人" name="drawerName"><Input /></FormItem>
            <FormItem label="税号" name="taxpayerNumber"><Input /></FormItem>
            <FormItem label="子公司" name="branchName"><Input /></FormItem>
            <FormItem label="核查结果" name="checkResultName"><Input /></FormItem>
            <FormItem label="拒绝原因" name="denyReason"><Input /></FormItem>
            <FormItem label="创建人" name="creatorName"><Input /></FormItem>
        </TableRepeater>
    </Item> */}

    {/* <Item name="inlineRepeat">
        <InlineRepeater filter={filter} formConfig={formConfig} addPosition="bottom">
            <FormItem required label="开票人" name="drawerName"><Input /></FormItem>
            <FormItem required label="税号" name="taxpayerNumber"><Input /></FormItem>
            <FormItem required label="子公司" name="branchName"><Input /></FormItem>
            <FormItem required label="核查结果" name="checkResultName"><Input /></FormItem>
            <FormItem required label="拒绝原因" name="denyReason"><Input /></FormItem>
            <FormItem required label="创建人" name="creatorName"><Input /></FormItem>
        </InlineRepeater>
    </Item> */}

    <br/>
    <hr/>

    {/* <FormItem name="deep">
        <SelectRepeater selectMode="multiple" asyncHandler={asyncHandler} formConfig={formConfig}>
            <FormItem label="开票人" name="drawerName"><Input /></FormItem>
            <FormItem label="税号" name="taxpayerNumber"><Input /></FormItem>
        </SelectRepeater>        
    </FormItem> */}

    {/* <FormItem name="fuzz">
        <CustomEle />
    </FormItem> */}

    
    <Item name="inlineRepeatMultiple">
        <InlineRepeater multiple filter={filter} formConfig={formConfig} addPosition="bottom">
            <FormItem label="开票人" name="drawerName"><Input /></FormItem>
            <FormItem label="multi" multiple required>
                <div>
                    <FormItem name="aaa"><Input addonBefore="xxoo" style={{ width: '100px' }}  /></FormItem>
                    <FormItem name="bbb"><Input /></FormItem>
                </div>
            </FormItem>
            <FormItem label="税号" name="taxpayerNumber"><Input /></FormItem>
            <FormItem label="子公司" name="branchName"><Input /></FormItem>
            <FormItem label="核查结果" name="checkResultName"><Input /></FormItem>
            <FormItem label="拒绝原因" name="denyReason"><Input /></FormItem>
            <FormItem label="创建人" name="creatorName"><Input /></FormItem>
        </InlineRepeater>
    </Item>
</Form>, mountNode);
````

````css
body {
    background-color: #FFF;
}
````