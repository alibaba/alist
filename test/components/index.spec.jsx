import React from 'react';
import * as Antd from 'antd';
import sinon from 'sinon';
import { mount } from 'enzyme';
import wrapper from '../../src/wrapper/antd';
import Form, { FormItem, Item, If } from '../../src';

// status: edit, preview, hidden
const { Select } = wrapper(Antd);

function Input(props) {
    let {
        value, status, error, ...othersProps
    } = props;
    if (value === null || value === undefined) {
        value = '';
    }
    if (status === 'preview') {
        return <span>{value}</span>;
    }
    return <input type="text" {...othersProps} value={value} />;
}

describe('component/form basic function', () => {
    let form;
    let formcore;
    let handler;
    const defaultValue = {
        username: 'username',
        age: '18',
        gender: 'male',
    };
    const validateConfig = {
        username: { type: 'string', required: true },
        age: [
            {
                type: 'number',
                required: true,
                transform(value) {
                    return parseInt(value, 10);
                },
            },
            {
                validator(rule, value, callback, source, options) {
                    if (value < 18) {
                        callback(['too young']);
                    }
                    callback([]);
                },
            },
        ],
        gender: { type: 'enum', required: true, enum: ['male', 'female'] },
    };

    const options = [
        { label: 1, value: 1 },
        { label: 0, value: 0 },
    ];

    beforeEach(() => {
        handler = sinon.spy();
        form = mount(<Form
            value={defaultValue}
            onMount={core => formcore = core}
            onChange={handler}
            validateConfig={validateConfig}
        >
            <FormItem label="username" name="username">
                <Input />
            </FormItem>
            <FormItem
                label="age"
                name="age"
                {...{
                    top: 'age top',
                    prefix: 'age prefix',
                    suffix: 'age suffix',
                    help: 'age help',
                }}
            >
                <Input />
            </FormItem>
            <FormItem label="gender" name="gender">
                <Input />
            </FormItem>
            <FormItem label="opts" name="opts" defaultValue={0}>
                <Select options={options} />
            </FormItem>
        </Form>);
    });

    it('Form should support style', () => {
        const styleForm = mount(<Form style={{ marginBottom: 12 }}>
            <FormItem label="username" name="username">
                <Input />
            </FormItem>
        </Form>);
        styleForm.mount();
        expect(styleForm.find('.no-form').prop('style')).toEqual({ marginBottom: 12 });
    });

    it('FormItem should support style', () => {
        const styleForm = mount(<Form>
            <FormItem label="username" name="username" style={{ marginBottom: 16 }}>
                <Input />
            </FormItem>
        </Form>);
        styleForm.mount();
        expect(styleForm.find('FormItem[name="username"]').prop('style')).toEqual({ marginBottom: 16 });
    });

    it('FormItem should support full props', () => {
        expect(form.find('FormItem[name="username"] .no-form-full').length).toEqual(0);
        formcore.setProps({
            username: {
                full: true,
            },
        });
        form.mount();
        expect(form.find('FormItem[name="username"] .no-form-full').length).toEqual(1);
    });

    it('should support label', () => {
        expect(form.find('FormItem[name="username"] .no-form-item-label').render().text()).toEqual('username');
        expect(form.find('FormItem[name="age"] .no-form-item-label').render().text()).toEqual('age');
        expect(form.find('FormItem[name="gender"] .no-form-item-label').render().text()).toEqual('gender');
    });
    it('should support props', () => {
        expect(form.find('FormItem[name="age"] .no-form-item-top').text()).toEqual('age top');
        expect(form.find('FormItem[name="age"] .no-form-item-content-prefix').text()).toEqual('age prefix');
        expect(form.find('FormItem[name="age"] .no-form-item-content-suffix').text()).toEqual('age suffix');
        expect(form.find('FormItem[name="age"] .no-form-item-help').text()).toEqual('age help');
    });

    it('should work with default value', () => {
        expect(form.find('input[name="username"]').render().val()).toEqual(defaultValue.username);
        expect(form.find('input[name="age"]').render().val()).toEqual(defaultValue.age);
        expect(form.find('input[name="gender"]').render().val()).toEqual(defaultValue.gender);
    });

    it('should work with default value 0', () => {
        expect(form.find('.ant-select-selection-selected-value').render().text()).toEqual('0');
        expect(formcore.getValue('opts')).toEqual(0);
    });

    it('should work when setValue', () => {
        formcore.setValue('username', 'bojoy');
        formcore.setValue('age', '12');
        formcore.setValue('gender', 'unknown');
        form.mount();
        expect(form.find('input[name="username"]').render().val()).toEqual('bojoy');
        expect(form.find('input[name="age"]').render().val()).toEqual('12');
        expect(form.find('input[name="gender"]').render().val()).toEqual('unknown');
        const newValue = {
            username: 'phoebe',
            gender: 'female',
            age: '18',
        };
        formcore.setValue(newValue);
        form.mount();
        expect(form.find('input[name="username"]').render().val()).toEqual(newValue.username);
        expect(form.find('input[name="age"]').render().val()).toEqual(newValue.age);
        expect(form.find('input[name="gender"]').render().val()).toEqual(newValue.gender);
    });

    it('should work when setProps', () => {
        const usernameProps = {
            top: 'username top',
            prefix: 'username prefix',
            suffix: 'username suffix',
            help: 'username help',
        };
        formcore.setProps('username', usernameProps);
        form.mount();
        expect(form.find(FormItem).at(0).render().find('.no-form-item-top')
            .text()).toEqual(usernameProps.top);
        expect(form.find(FormItem).at(0).render().find('.no-form-item-content-prefix')
            .text()).toEqual(usernameProps.prefix);
        expect(form.find(FormItem).at(0).render().find('.no-form-item-content-suffix')
            .text()).toEqual(usernameProps.suffix);
        expect(form.find(FormItem).at(0).render().find('.no-form-item-help')
            .text()).toEqual(usernameProps.help);

        formcore.setProps('username', { disabled: true });
        form.mount();
        expect(form.find(FormItem).at(0).render().find('input')
            .prop('disabled')).toEqual(true);
    });
    it('should work when setStatus(single)', () => {
        formcore.setStatus('username', 'preview');
        expect(form.find('FormItem[name="username"] .no-form-item-content-elem').text()).toEqual(defaultValue.username);
    });

    it('should work when setStatus(global)', () => {
        formcore.setGlobalStatus('preview');
        expect(form.find('FormItem[name="username"] .no-form-item-content-elem').text()).toEqual(defaultValue.username);
        expect(form.find('FormItem[name="age"] .no-form-item-content-elem').text()).toEqual(defaultValue.age);
        expect(form.find('FormItem[name="gender"] .no-form-item-content-elem').text()).toEqual(defaultValue.gender);
    });

    it('should trigger onChange', () => {
        formcore.setValue({
            username: 'phoebe',
        });

        expect(handler.calledOnce).toEqual(true);
        expect(handler.calledWith({
            username: 'phoebe', age: '18', gender: 'male', opts: 0,
        })).toEqual(true);
    });

    it('should trigger on onChange when control elem changed', () => {
        const event = {
            target: {
                value: 'phoebe',
            },
        };

        form.find('input[name="username"]').simulate('change', event);
        expect(handler.calledOnce).toEqual(true);
        expect(handler.calledWith({
            username: 'phoebe', age: '18', gender: 'male', opts: 0,
        })).toEqual(true);
    });
    it('should not trigger onChange', () => {
        formcore.setValueSilent({
            username: 'phoebe',
        });

        expect(handler.notCalled).toEqual(true);
    });

    it('should support validate', async () => {
        formcore.validate((errors) => {
            expect(errors).toEqual(null);
        });
        formcore.setValue('age', 'aaa');
        const errors = await formcore.validate();
        form.mount();
        expect(errors).toEqual({ age: 'age is not a number' });
        expect(form.find('FormItem[name="age"]').render().find('.no-form-item-error').text()).toEqual('age is not a number');
    });
});

describe('component/FormItem 嵌套', () => {
    it('IF-item内为Item嵌套，form,form内有嵌套的if item嵌套', () => {
        let formcore;
        const form = mount(<Form onMount={core => formcore = core}>
            <FormItem label="username" name="username"><Input /></FormItem>
            <FormItem label="age" name="age"><Input /></FormItem>

            <FormItem label="">
                <div>
                    <div>1. username为bobby时，触发第一层if</div>
                    <div>2. username为bobby, age为23时，触发嵌套if</div>
                </div>
            </FormItem>

            <If when={(values, { globalStatus }) => values.username === 'bobby'}>
                <FormItem name="firstLayer" label="" style={{ margin: '12px 0' }}>
                    <div>
                        <div id="hellobobby">hello bobby!</div>
                        <If when={(values, { globalStatus }) => values.age == 23}>
                            <FormItem label="" name="finalMaze">
                                <div>Congratulation! You've solved the last maze!</div>
                            </FormItem>
                        </If>
                    </div>
                </FormItem>
            </If>
        </Form>);
        expect(form.find('Input[name="username"]').prop('value')).toEqual(null);
        expect(form.find('Item[name="firstLayer"]').length).toEqual(0);

        formcore.setValue({
            username: 'bobby',
        });
        form.mount();
        expect(form.find('Item[name="firstLayer"]').length).toEqual(1);
        expect(form.find('Item[name="firstLayer"] div#hellobobby').prop('children')).toEqual('hello bobby!');
        expect(form.find('Item[name="finalMaze"]').length).toEqual(0);
        formcore.setValue({
            age: 23,
        });
        form.mount();
        expect(form.find('Item[name="finalMaze"]').length).toEqual(1);
        expect(form.find('Item[name="finalMaze"] div').prop('children')).toEqual('Congratulation! You\'ve solved the last maze!');
    });
});


describe('component/if basic function', () => {
    let form,
        formcore,
        handler;
    const defaultValue = {
        username: 'username',
        age: '18',
        gender: 'male',
    };

    beforeEach(() => {
        handler = sinon.spy();
        form = mount(<Form
            value={defaultValue}
            onMount={core => formcore = core}
            onChange={handler}
        >
            <FormItem label="username" name="username">
                <Input />
            </FormItem>
            <FormItem label="zero" name={0}>
                <Input />
            </FormItem>
            <FormItem
                label="age"
                name="age"
                {...{
                    top: 'age top',
                    prefix: 'age prefix',
                    suffix: 'age suffix',
                    help: 'age help',
                }}
            >
                <Input />
            </FormItem>
            <FormItem
                label="gender"
                name="gender"
                when={value => value.age > 18}
            >
                <Input />
            </FormItem>
        </Form>);
    });

    it('should support name as number', () => {
        expect(true).toEqual(true);
    });

    it('should not display gender', () => {
        expect(form.find('FormItem[name="gender"]').render().html()).toEqual(null);
    });

    it('should display gender', () => {
        formcore.setValue('age', '20');
        form.mount();
        expect(form.render().find('input[name="gender"]').length).toEqual(1);
    });

    it('should display gender and have value', () => {
        formcore.setValue({ age: '20', gender: 'unknown' });
        form.mount();
        expect(form.render().find('input[name="gender"]').length).toEqual(1);
        expect(form.render().find('input[name="gender"]').val()).toEqual('unknown');
    });
});

describe('component/form value', () => {
    it('基础的-默认值', () => {
        const defaultValue = {
            username: 'username',
            password: 'password',
        };
        let formcore;
        const form = mount(<Form onMount={core => formcore = core} value={defaultValue}>
            <Item name="username"><Input /></Item>
            <Item name="password"><Input /></Item>
        </Form>);
        expect(form.find('Item[name="username"] Input').prop('value')).toEqual(defaultValue.username);
        expect(form.find('Item[name="password"] Input').prop('value')).toEqual(defaultValue.password);
    });
    it('基础的-调用setValue', () => {
        const onChange = sinon.spy();
        const defaultValue = {
            username: 'username',
            password: 'password',
        };
        const newValue = {
            username: 'newuser',
            password: 'newpass',
        };
        let formcore;
        const form = mount(<Form onMount={core => formcore = core} value={defaultValue} onChange={onChange}>
            <Item name="username"><Input /></Item>
            <Item name="password"><Input /></Item>
        </Form>);
        expect(form.find('Item[name="username"] Input').prop('value')).toEqual(defaultValue.username);
        expect(form.find('Item[name="password"] Input').prop('value')).toEqual(defaultValue.password);
        expect(onChange.notCalled).toEqual(true);

        formcore.setValue(newValue);
        form.mount();
        expect(form.find('Item[name="username"] Input').prop('value')).toEqual(newValue.username);
        expect(form.find('Item[name="password"] Input').prop('value')).toEqual(newValue.password);
        expect(onChange.calledOnce).toEqual(true);
    });
    it('基础的-从上层调用setValue', () => {
        const onChange = sinon.spy();
        const defaultValue = {
            user: {
                username: 'username',
                password: 'password',
            },
        };

        const newValue = {
            user: {
                username: 'newuser',
                password: 'newpass',
            },
        };

        let formcore;
        const form = mount(<Form onMount={core => formcore = core} value={defaultValue} onChange={onChange}>
            <Item name="user">
                <Form>
                    <Item name="username">
                        <Input />
                    </Item>
                    <Item name="password">
                        <Input />
                    </Item>
                </Form>
            </Item>
        </Form>);

        expect(form.find('Item[name="user"] Item[name="username"] Input').prop('value')).toEqual(defaultValue.user.username);
        expect(form.find('Item[name="user"] Item[name="password"] Input').prop('value')).toEqual(defaultValue.user.password);
        expect(onChange.notCalled).toEqual(true);

        formcore.setValue(newValue);
        form.mount();
        expect(form.find('Item[name="user"] Item[name="username"] Input').prop('value')).toEqual(newValue.user.username);
        expect(form.find('Item[name="user"] Item[name="password"] Input').prop('value')).toEqual(newValue.user.password);
        expect(onChange.calledOnce).toEqual(true);
    });
});

describe('component/form if', () => {
    it('IF-单层if-setvalue-设置为支持if展示', () => {
        const defaultValue = {
            username: 'username',
            password: 'password',
        };
        const newValue = {
            username: 'bojoy',
            password: 'password',
            gender: 'male',
        };
        let formcore;
        const form = mount(<Form onMount={core => formcore = core} value={defaultValue}>
            <Item name="username"><Input /></Item>
            <Item name="password"><Input /></Item>
            <If when={value => value.username == 'bojoy'}>
                <Item name="gender"><Input /></Item>
            </If>
        </Form>);
        expect(form.find('Item[name="gender"] Input').length).toEqual(0);
        formcore.setValue(newValue);
        form.mount();
        expect(form.find('Item[name="gender"] Input').prop('value')).toEqual(newValue.gender);
    });
    it('IF-单层if-setvalue-设置为不支持if展示', () => {
        const defaultValue = {
            username: 'bojoy',
            password: 'password',
            gender: 'male',
        };
        const newValue = {
            username: 'username',
            password: 'password',
        };
        let formcore;
        const form = mount(<Form onMount={core => formcore = core} value={defaultValue}>
            <Item name="username"><Input /></Item>
            <Item name="password"><Input /></Item>
            <If when={value => value.username == 'bojoy'}>
                <Item name="gender"><Input /></Item>
            </If>
        </Form>);
        expect(form.find('Item[name="gender"] Input').prop('value')).toEqual(defaultValue.gender);
        formcore.setValue(newValue);
        form.mount();
        expect(form.find('Item[name="gender"] Input').length).toEqual(0);
    });
    it('IF-嵌套if', () => {
        const defaultValue = {
            username: 'nouser',
            password: 'nopass',
        };
        let formcore;
        const form = mount(<Form onMount={core => formcore = core} value={defaultValue}>
            <Item name="username"><Input /></Item>
            <Item name="password"><Input /></Item>
            <If when={value => value.username === 'bojoy'}>
                <Item name="gender"><Input /></Item>
                <If when={value => value.password === 'password'}>
                    <div id="success">登录成功</div>
                </If>
            </If>
        </Form>);
        expect(form.find('Item[name="gender"] Input').length).toEqual(0);
        expect(form.find('#success').length).toEqual(0);
        formcore.setValue({
            username: 'bojoy',
            password: 'nopass',
        });
        form.mount();
        expect(form.find('Item[name="gender"] Input').length).toEqual(1);
        expect(form.find('#success').length).toEqual(0);

        formcore.setValue({
            username: 'nouser',
            password: 'password',
        });
        form.mount();
        expect(form.find('Item[name="gender"] Input').length).toEqual(0);
        expect(form.find('#success').length).toEqual(0);

        formcore.setValue({
            username: 'bojoy',
            password: 'password',
        });
        form.mount();
        expect(form.find('Item[name="gender"] Input').length).toEqual(1);
        expect(form.find('#success').length).toEqual(1);
    });
    it('IF-if内嵌套form', () => {
        const defaultValue = {
            age: 15,
            user: {
                username: 'lily',
            },
        };
        let formcore;
        const form = mount(<Form onMount={core => formcore = core} value={defaultValue}>
            <Item name="age"><Input /></Item>
            <If when={value => value.age < 18}>
                <Item name="user">
                    <Form>
                        <Item name="username"><Input /></Item>
                    </Form>
                </Item>
            </If>
        </Form>);
        expect(form.find('Item[name="user"] Input[name="username"]').prop('value')).toEqual(defaultValue.user.username);
        formcore.setValue({
            age: 19,
        });
        form.mount();
        expect(form.find('Item[name="user"]').length).toEqual(0);
        formcore.setValue({
            age: 14,
            user: {
                username: 'hello',
            },
        });
        form.mount();
        expect(form.find('Item[name="user"] Input[name="username"]').prop('value')).toEqual('hello');
    });
    it('IF-item内为form,form内有if', () => {
        const defaultValue = {
            age: 15,
            user: {
                username: 'lily',
            },
        };
        let formcore;
        const form = mount(<Form onMount={core => formcore = core} value={defaultValue}>
            <Item name="age"><Input /></Item>
            <If when={value => value.age < 18}>
                <Item name="user">
                    <Form>
                        <Item name="username"><Input /></Item>
                        <If when={value => value.username == 'bojoy'}>
                            <Item name="gender"><Input /></Item>
                        </If>
                    </Form>
                </Item>
            </If>
        </Form>);
        expect(form.find('Item[name="user"] Input[name="username"]').prop('value')).toEqual(defaultValue.user.username);
        formcore.setValue({
            age: 19,
        });
        form.mount();
        expect(form.find('Item[name="user"]').length).toEqual(0);
        formcore.setValue({
            age: 14,
            user: {
                username: 'hello',
            },
        });
        form.mount();
        expect(form.find('Item[name="user"] Input[name="username"]').prop('value')).toEqual('hello');
        formcore.setValue({
            age: 14,
            user: {
                username: 'bojoy',
                gender: 'male',
            },
        });
        form.mount();
        expect(form.find('Item[name="user"] Input[name="username"]').prop('value')).toEqual('bojoy');
        expect(form.find('Item[name="user"] Input[name="gender"]').prop('value')).toEqual('male');
    });
    it('IF-item内为form,form内有嵌套的if', () => {
        const defaultValue = {
            age: 15,
            user: {
                username: 'lily',
            },
        };
        let formcore;
        const form = mount(<Form onMount={core => formcore = core} value={defaultValue}>
            <Item name="age"><Input /></Item>
            <If when={value => value.age < 18}>
                <Item name="user">
                    <Form>
                        <Item name="username"><Input /></Item>
                        <If when={value => value.username == 'bojoy'}>
                            <Item name="gender"><Input /></Item>
                            <If when={value => value.gender == 'female'}>
                                <div id="success" />
                            </If>
                        </If>
                    </Form>
                </Item>
            </If>
        </Form>);
        expect(form.find('Item[name="user"] Input[name="username"]').prop('value')).toEqual(defaultValue.user.username);
        formcore.setValue({
            age: 19,
        });
        form.mount();
        expect(form.find('Item[name="user"]').length).toEqual(0);
        formcore.setValue({
            age: 14,
            user: {
                username: 'hello',
            },
        });
        form.mount();
        expect(form.find('Item[name="user"] Input[name="username"]').prop('value')).toEqual('hello');
        formcore.setValue({
            age: 14,
            user: {
                username: 'bojoy',
                gender: 'male',
            },
        });
        form.mount();
        expect(form.find('Item[name="user"] Input[name="username"]').prop('value')).toEqual('bojoy');
        expect(form.find('Item[name="user"] Input[name="gender"]').prop('value')).toEqual('male');
        expect(form.find('Item[name="user"] #success').length).toEqual(0);
        formcore.setValue({
            age: 14,
            user: {
                username: 'bojoy',
                gender: 'female',
            },
        });
        form.mount();
        expect(form.find('Item[name="user"] Input[name="username"]').prop('value')).toEqual('bojoy');
        expect(form.find('Item[name="user"] Input[name="gender"]').prop('value')).toEqual('female');
        expect(form.find('Item[name="user"] #success').length).toEqual(1);
    });

    it('IF-item内为Item嵌套，form,form内有嵌套的if item嵌套', () => {
        const defaultValue = {
            username: 'bobby',
        };
        let formcore;
        const form = mount(<Form onMount={core => formcore = core} value={defaultValue}>
            <FormItem label="username" name="username"><Input /></FormItem>
            <If when={values => values.username === 'bobby'}>
                <FormItem label="" style={{ margin: '12px 0' }} name="wrapper">
                    <div>
                        hello bobby!
                        <FormItem label="" name="deep">
                            <Input />
                        </FormItem>

                        <If when={values => values.deep === 'abcd'}>
                            <FormItem label="" name="deepForm">
                                <Form layout={{ label: 5, control: 19 }} full>
                                    <FormItem label="nif" name="nif"><Input /></FormItem>
                                    <FormItem label="dif" name="dif">
                                        <If when={values => values.nif === 100}>
                                            <FormItem label="nifDeep" name="nifDeep">
                                                <div>nif 100!!!</div>
                                            </FormItem>
                                        </If>
                                    </FormItem>
                                </Form>
                            </FormItem>
                        </If>
                    </div>
                </FormItem>
            </If>
        </Form>);
        expect(form.find('Input[name="username"]').prop('value')).toEqual(defaultValue.username);
        expect(form.find('Item[name="deepForm"]').length).toEqual(0);
        formcore.setValue({
            deep: 'abcd',
            deepForm: {
                nif: 'hello',
            },
        });
        form.mount();
        expect(form.find('Item[name="deepForm"]').length).toEqual(1);
        expect(form.find('Item[name="deepForm"] Input[name="nif"]').prop('value')).toEqual('hello');
        expect(form.find('Item[name="nifDeep"]').length).toEqual(0);
        formcore.setValue({
            deepForm: {
                nif: 100,
            },
        });
        form.mount();
        expect(form.find('Item[name="deepForm"] Item[name="nifDeep"]').length).toEqual(1);
    });
});


describe('component/form status', () => {
    it('status切换', () => {
        const defaultValue = {
            username: 'username',
            password: 'password',
        };
        let formcore;
        const form = mount(<Form onMount={core => formcore = core} value={defaultValue}>
            <Item name="username"><Input /></Item>
            <Item name="password"><Input /></Item>
        </Form>);
        expect(form.find('Item[name="username"] Input').prop('status')).toEqual('edit');
        expect(form.find('Item[name="password"] Input').prop('status')).toEqual('edit');
        formcore.setGlobalStatus('preview');
        form.mount();
        expect(form.find('Item[name="username"] Input').prop('status')).toEqual('preview');
        expect(form.find('Item[name="password"] Input').prop('status')).toEqual('preview');
        formcore.setStatus({
            username: 'edit',
            password: 'preview',
        });
        form.mount();
        expect(form.find('Item[name="username"] Input').prop('status')).toEqual('edit');
        expect(form.find('Item[name="password"] Input').prop('status')).toEqual('preview');
        formcore.setItemStatus('password', 'disabled');
        form.mount();
        expect(form.find('Item[name="username"] Input').prop('status')).toEqual('edit');
        expect(form.find('Item[name="password"] Input').prop('status')).toEqual('disabled');
        expect(form.find('Item[name="password"] Input').prop('disabled')).toEqual(true);
    });
    it('default status', () => {
        const defaultValue = {
            username: 'username',
            password: 'password',
        };
        let formcore;
        const form = mount(<Form globalStatus="preview" onMount={core => formcore = core} value={defaultValue}>
            <Item name="username"><Input /></Item>
            <Item name="password"><Input /></Item>
        </Form>);
        expect(formcore.getStatus('username')).toEqual('preview');
        expect(formcore.getStatus('password')).toEqual('preview');
    });
    it('status切换 If', () => {
        const defaultValue = {
            username: 'bojoyz',
            password: 'password',
        };

        let formcore;
        const form = mount(<Form onMount={core => formcore = core} value={defaultValue}>
            <Item name="username"><Input /></Item>
            <If when={value => value.username == 'bojoy'}>
                <Item name="password"><Input /></Item>
            </If>
        </Form>);
        expect(form.find('Item[name="username"] Input').prop('status')).toEqual('edit');
        expect(form.find('Item[name="password"] Input').length).toEqual(0);

        formcore.setGlobalStatus('preview');
        formcore.setValue('username', 'bojoy');
        form.mount();
        expect(form.find('Item[name="username"] Input').prop('status')).toEqual('preview');
        expect(form.find('Item[name="password"] Input').prop('status')).toEqual('preview');
    });
    it('status切换 form嵌套', () => {
        const defaultValue = {
            user: {
                username: 'bojoyz',
                password: 'password',
            },
        };

        let formcore;
        const form = mount(<Form onMount={core => formcore = core} value={defaultValue}>
            <Item name="user">
                <Form>
                    <Item name="username">
                        <Input />
                    </Item>
                    <Item name="password">
                        <Input />
                    </Item>
                </Form>
            </Item>
        </Form>);

        expect(form.find('Item[name="username"] Input').prop('status')).toEqual('edit');
        expect(form.find('Item[name="password"] Input').prop('status')).toEqual('edit');
        formcore.setGlobalStatus('preview');
        form.mount();

        expect(form.find('Item[name="username"] Input').prop('status')).toEqual('preview');
        expect(form.find('Item[name="password"] Input').prop('status')).toEqual('preview');
        expect(form.find('Item[name="user"] Form').prop('status')).toEqual({
            username: 'preview',
            password: 'preview',
        });
    });
    it('status为function', () => {
        const defaultValue = {
            username: 'bojoyz',
            password: 'password',
        };

        let formcore;
        const form = mount(<Form onMount={core => formcore = core} value={defaultValue}>
            <Item name="username"><Input /></Item>
            <Item
                name="password"
                status={(value) => {
                    if (value.username === 'bojoy') {
                        return 'preview';
                    } else if (value.username === 'username') {
                        return 'disabled';
                    }

                    return 'edit';
                }}
            ><Input />
            </Item>
        </Form>);

        expect(form.find('Item[name="username"] Input').prop('status')).toEqual('edit');
        expect(form.find('Item[name="password"] Input').prop('status')).toEqual('edit');

        formcore.setItemValue('username', 'bojoy');
        form.mount();
        console.log('====', formcore.getStatus());
        expect(form.find('Item[name="password"] Input').prop('status')).toEqual('preview');

        formcore.setItemValue('username', 'username');
        form.mount();
        expect(form.find('Item[name="password"] Input').prop('status')).toEqual('disabled');
    });
});
describe('component/form render', () => {
    it('dynamic render', () => {
        const defaultValue = {
            username: 'username',
            password: 'password',
        };
        const render = sinon.spy();
        let formcore;
        const form = mount(<Form onMount={core => formcore = core} value={defaultValue}>
            <Item name="username"><Input /></Item>
            <Item name="password"><Input /></Item>
            <Item render={(...args) => {
                render(...args);
                const value = args[0];
                return <div id={value.username} />;
            }}
            />
        </Form>);
        expect(render.callCount).toEqual(1);
        expect(render.calledWith(formcore.getValue(), formcore)).toEqual(true);
        formcore.setValue({
            username: 'hhh',
            password: 'eee',
        });
        form.mount();
        expect(form.find('#hhh').length).toEqual(1);
    });
});
describe('validateConfig function', () => {
    it('validateConfig function', () => {
        const defaultValue = {
            username: 'username',
            password: 'password',
        };
        let formcore;
        const form = mount(<Form onMount={core => formcore = core} value={defaultValue}>
            <Item name="username"><Input /></Item>
            <Item name="password"><Input /></Item>
            <Item
                name="age"
                validateConfig={(values) => {
                    if (values.username === 'bojoyzhou') {
                        return null;
                    }
                    return {
                        type: 'string',
                        required: true,
                    };
                }}
            ><Input />
            </Item>
        </Form>);

        formcore.validate((err) => {
            expect(err).toEqual({ age: 'age is required' });
        });
        formcore.setValue({
            username: 'bojoyzhou',
            password: 'eee',
        });
        form.mount();
        formcore.validate((err) => {
            expect(err).toEqual(null);
        });
    });
});
