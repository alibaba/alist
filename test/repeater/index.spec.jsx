import * as Antd from 'antd';
import { mount } from 'enzyme';
import React from 'react';
import Form, { FormItem, Item } from '../../src';

import repeaterWrapper from '../../src/repeater';
import wrapper from '../../src/wrapper/antd';
import dialogWrapper from '../../src/dialog/antd';

// import simulateEvent from 'simulate-event';
const { TableRepeater } = repeaterWrapper(dialogWrapper(Antd));

const { Input } = wrapper(Antd);
function filter(value, key) {
    return value.filter(item => item.drawerName.startsWith(key));
}
describe('Repeater', () => {
    let form = null;
    let formCore = null;
    function formmount(core) {
        formCore = core;
    }
    beforeEach(() => {
        form = mount(<Form onMount={formmount}>
            <Item name="repeat">
                <TableRepeater filter={filter}>
                    <FormItem label="开票人" name="drawerName"><Input /></FormItem>
                    <FormItem label="税号" name="taxpayerNumber"><Input /></FormItem>
                    <FormItem label="子公司" name="branchName"><Input /></FormItem>
                    <FormItem label="核查结果" name="checkResultName"><Input /></FormItem>
                    <FormItem label="拒绝原因" name="denyReason"><Input /></FormItem>
                    <FormItem label="创建人" name="creatorName"><Input /></FormItem>
                </TableRepeater>
            </Item>
        </Form>);
    });
    it('should render', () => {
        formCore.setValue('repeat', [{}]);
    });
    it('should add', () => {
        // console.log(form.find(TableRepeater).instance().doAdd);
        form.find(TableRepeater).instance().doAdd({
            drawerName: '开票人',
            taxpayerNumber: '税号',
            branchName: '子公司',
            checkResultName: '核查结果',
            denyReason: '拒绝原因',
            creatorName: '创建人',
        });

        expect(JSON.stringify(formCore.getValue())).toEqual(JSON.stringify({
            repeat: [{
                drawerName: '开票人',
                taxpayerNumber: '税号',
                branchName: '子公司',
                checkResultName: '核查结果',
                denyReason: '拒绝原因',
                creatorName: '创建人',
                $idx: 0,
            }],
        }));
    });
    it('should update', () => {
        // console.log(form.find(TableRepeater).instance().doAdd);
        form.find(TableRepeater).instance().doAdd({
            drawerName: '开票人',
            taxpayerNumber: '税号',
            branchName: '子公司',
            checkResultName: '核查结果',
            denyReason: '拒绝原因',
            creatorName: '创建人',
        });

        expect(JSON.stringify(formCore.getValue())).toEqual(JSON.stringify({
            repeat: [{
                drawerName: '开票人',
                taxpayerNumber: '税号',
                branchName: '子公司',
                checkResultName: '核查结果',
                denyReason: '拒绝原因',
                creatorName: '创建人',
                $idx: 0,
            }],
        }));


        form.find(TableRepeater).instance().doUpdate({
            drawerName: 'xxxxx',
            taxpayerNumber: '税号',
            branchName: '子公司',
            checkResultName: '核查结果',
            denyReason: '拒绝原因',
            creatorName: '创建人',
        }, 0);
        expect(JSON.stringify(formCore.getValue())).toEqual(JSON.stringify({
            repeat: [{
                drawerName: 'xxxxx',
                taxpayerNumber: '税号',
                branchName: '子公司',
                checkResultName: '核查结果',
                denyReason: '拒绝原因',
                creatorName: '创建人',
                $idx: 0,
            }],
        }));
    });
    it('should delete', () => {
        form.find(TableRepeater).instance().doAdd({
            drawerName: '开票人',
            taxpayerNumber: '税号',
            branchName: '子公司',
            checkResultName: '核查结果',
            denyReason: '拒绝原因',
            creatorName: '创建人',
        });

        expect(JSON.stringify(formCore.getValue())).toEqual(JSON.stringify({
            repeat: [{
                drawerName: '开票人',
                taxpayerNumber: '税号',
                branchName: '子公司',
                checkResultName: '核查结果',
                denyReason: '拒绝原因',
                creatorName: '创建人',
                $idx: 0,
            }],
        }));


        form.find(TableRepeater).instance().doDelete(0);
        expect(JSON.stringify(formCore.getValue())).toEqual(JSON.stringify({
            repeat: [],
        }));
    });
    it('should add by click add button', async () => {
        form.find('button[role="repeater-add"]').simulate('click');
        // simulateEvent.simulate(document.querySelector('.next-dialog-footer .next-btn-primary'), 'click');
        // console.log('@@@@', form.getValue());
    });
    return;
    it('should update by click update', () => {
        form.find(TableRepeater).instance().doAdd({
            drawerName: '开票人',
            taxpayerNumber: '税号',
            branchName: '子公司',
            checkResultName: '核查结果',
            denyReason: '拒绝原因',
            creatorName: '创建人',
        });

        form.find('[role="repeater-update"]').simulate('click');
        document.querySelector('.next-dialog-footer .next-btn-primary').click();
    });
    it('should delete by click delete', () => {
        form.find(TableRepeater).instance().doAdd({
            drawerName: '开票人',
            taxpayerNumber: '税号',
            branchName: '子公司',
            checkResultName: '核查结果',
            denyReason: '拒绝原因',
            creatorName: '创建人',
        });

        form.find('[role="repeater-delete"]').simulate('click');
        expect(JSON.stringify(formCore.getValue())).toEqual(JSON.stringify({
            repeat: [],
        }));
    });
});
