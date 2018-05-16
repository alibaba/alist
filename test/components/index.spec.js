import React from 'react';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';

import Form, { FormItem, Item, If, Repeater } from '../../src';

// status: edit, preview, hidden

function Input(props) {
    let { value, status, error, ...othersProps } = props;
    if (value === null || value === undefined) {
        value = '';
    }
    if (status === 'preview') {
        return <span>{value}</span>;
    }
    return <input type="text" {...othersProps} value={value} />;
}

function Select(props) {
    let showName = '';
    const value = props.value || '';
    const children = React.Children.map(props.children, child => {
        if (child.props.value === value) {
            return React.cloneElement(child, { checked: true });
            showName = child.props.children;
        }
        return child;
    });
    if (props.status === 'preview') {
        return <span>{showName || ''}</span>;
    }
    return <select {...props} value={value}>{ children }</select>;
}


describe('component/form basic function', () => {
    let form, formcore, handler;
    let defaultValue = {
        username: 'username',
        age: '18',
        gender: 'male',
    };
    let validateConfig = {
        username: { type: 'string', required: true },
        age: [
            { type: 'number', required: true, transform(value) {
              return parseInt(value);
            } },
            { validator(rule, value, callback, source, options) {
                if (value < 18) {
                    callback([ 'too young' ]);
                }
                callback([]);
            } },
        ],
        gender: { type: 'enum', required: true, enum: [ 'male', 'female' ] },
    };

    beforeEach(() => {
        handler = sinon.spy();
        form = mount(<Form value={defaultValue}
                onMount={core => formcore = core}
                onChange={handler}
                validateConfig={validateConfig}>
            <FormItem label="username" name="username">
                <Input />
            </FormItem>
            <FormItem label="age" name="age" {...{
                top: 'age top',
                prefix: 'age prefix',
                suffix: 'age suffix',
                help: 'age help',
            }}>
                <Input />
            </FormItem>
            <FormItem label="gender" name="gender">
                <Input />
            </FormItem>
        </Form>);
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
        expect(form.find(FormItem).at(0).render().find('.no-form-item-top').text()).toEqual(usernameProps.top);
        expect(form.find(FormItem).at(0).render().find('.no-form-item-content-prefix').text()).toEqual(usernameProps.prefix);
        expect(form.find(FormItem).at(0).render().find('.no-form-item-content-suffix').text()).toEqual(usernameProps.suffix);
        expect(form.find(FormItem).at(0).render().find('.no-form-item-help').text()).toEqual(usernameProps.help);

        formcore.setProps('username', { disabled: true });
        form.mount();
        expect(form.find(FormItem).at(0).render().find('input').prop('disabled')).toEqual(true);
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
        expect(handler.calledWith({ username: 'phoebe', age: '18', gender: 'male' })).toEqual(true);
    });

    it('should trigger on onChange when control elem changed', () => {
        const event = {
            target: {
                value: 'phoebe',
            }
        };
        
        form.find('input[name="username"]').simulate('change', event);
        expect(handler.calledOnce).toEqual(true);
        expect(handler.calledWith({ username: 'phoebe', age: '18', gender: 'male' })).toEqual(true);
    });
    it('should not trigger onChange', () => {
        formcore.setValueSilent({
            username: 'phoebe',
        });

        expect(handler.notCalled).toEqual(true);
    });

    it('should support validate', async () => {
        formcore.validate(errors => {
            expect(errors).toEqual(null);
        });
        formcore.setValue('age', 'aaa');
        const errors = await formcore.validate();
        form.mount();
        expect(errors).toEqual({ age: 'age is not a number' });
        expect(form.find('FormItem[name="age"]').render().find('.no-form-item-error').text()).toEqual('age is not a number');
    });
});


describe('component/if basic function', () => {
    let form, formcore, handler;
    let defaultValue = {
        username: 'username',
        age: '18',
        gender: 'male',
    };

    beforeEach(() => {
        handler = sinon.spy();
        form = mount(<Form value={defaultValue}
                onMount={core => formcore = core}
                onChange={handler}>
            <FormItem label="username" name="username">
                <Input />
            </FormItem>
            <FormItem label="zero" name={0}>
                <Input />
            </FormItem>
            <FormItem label="age" name="age" {...{
                top: 'age top',
                prefix: 'age prefix',
                suffix: 'age suffix',
                help: 'age help',
            }}>
                <Input />
            </FormItem>
            <FormItem label="gender" name="gender" when={value => {
                return value.age > 18;
            }}>
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
        let form = mount(<Form onMount={core => formcore = core} value={defaultValue}>
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
        let form = mount(<Form onMount={core => formcore = core} value={defaultValue} onChange={onChange}>
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
        let form = mount(<Form onMount={core => formcore = core} value={defaultValue} onChange={onChange}>
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
        let form = mount(<Form onMount={core => formcore = core} value={defaultValue}>
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
        let form = mount(<Form onMount={core => formcore = core} value={defaultValue}>
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
        let form = mount(<Form onMount={core => formcore = core} value={defaultValue}>
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
        let form = mount(<Form onMount={core => formcore = core} value={defaultValue}>
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
        let form = mount(<Form onMount={core => formcore = core} value={defaultValue}>
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
        let form = mount(<Form onMount={core => formcore = core} value={defaultValue}>
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
});


describe('component/form status', () => {
    it('status切换', () => {
        const defaultValue = {
            username: 'username',
            password: 'password',
        };
        let formcore;
        let form = mount(<Form onMount={core => formcore = core} value={defaultValue}>
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
        let form = mount(<Form globalStatus="preview" onMount={core => formcore = core} value={defaultValue}>
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
        let form = mount(<Form onMount={core => formcore = core} value={defaultValue}>
            <Item name="username"><Input /></Item>
            <If when={value =>  value.username == 'bojoy'}>
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
            }
        };

        let formcore;
        let form = mount(<Form onMount={core => formcore = core} value={defaultValue}>
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
        let form = mount(<Form onMount={core => formcore = core} value={defaultValue}>
            <Item name="username"><Input /></Item>
            <Item name="password" status={value => {
                if (value.username === 'bojoy') {
                    return 'preview';
                } else if (value.username === 'username') {
                    return 'disabled';
                }

                return 'edit';
            }}><Input /></Item>
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
        let render = sinon.spy();
        let formcore;
        let form = mount(<Form onMount={core => formcore = core} value={defaultValue}>
            <Item name="username"><Input /></Item>
            <Item name="password"><Input /></Item>
            <Item render={(...args) => {
                render(...args);
                const value = args[0];
                return <div id={value.username} />;
            }} />
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
        let form = mount(<Form onMount={core => formcore = core} value={defaultValue}>
            <Item name="username"><Input /></Item>
            <Item name="password"><Input /></Item>
            <Item name="age" validateConfig={(config, ff) => {
                if (ff.getValue('username') === 'bojoyzhou') {
                    return null;
                }
                return {
                    type: 'string',
                    required: true,
                };
            }}><Input /></Item>
        </Form>);

        formcore.validate(err => {
            expect(err).toEqual({ age: 'age is required' });
        });
        formcore.setValue({
            username: 'bojoyzhou',
            password: 'eee',
        });
        form.mount();
        formcore.validate(err => {
            expect(err).toEqual(null);
        });
    });
});
