import React, { useContext } from 'react'
import { FilterProvider, FieldProvider, LayoutContext } from '@alist/react';
import Layout from './Layout'
import { InternalField as Field, FormItem as CompatAntdFormItem, useForm, SchemaForm, SchemaMarkupField, getRegistry, registerFormItemComponent } from '@formily/antd';
import Search from './Search';
import Reset from './Reset';
import Clear from './Clear';
import InsetFormItem from './Inset';
import styled from 'styled-components';

const computeAttr = (markupProps, contextProps, key) => {
    return key in markupProps ? markupProps[key] : contextProps[key]
}

const { formItemComponent } = getRegistry();
registerFormItemComponent((props) => {
    const { props: markupProps } = props;
    const { errors, warnings, ...others } = props    
    const contextProps = useContext(LayoutContext)
    const { span, hasBorder: hasBorderProps = true } = markupProps

    const inset = computeAttr(markupProps, contextProps, 'inset')
    const full = computeAttr(markupProps, contextProps, 'full')
    const labelAlign = computeAttr(markupProps, contextProps, 'labelAlign')
    const labelWidth = computeAttr(markupProps, contextProps, 'labelWidth')
    const labelCol = computeAttr(markupProps, contextProps, 'labelCol')
    const wrapperCol = computeAttr(markupProps, contextProps, 'wrapperCol')
    const uniHeight = computeAttr(markupProps, contextProps, 'uniHeight') || '28px'
    const hasBorder = inset ? hasBorderProps : false

    const formItemProps: any = {};
    const insetProps: any = {};
    if (inset) {
        insetProps.errors = errors
        insetProps.warnings = warnings        
    } else {
        formItemProps.errors = errors
        formItemProps.warnings = warnings
    }

    const internalFormItem = <InsetFormItem
        inset={inset}
        full={full}
        labelAlign={labelAlign}
        labelCol={labelCol}
        wrapperCol={wrapperCol}
        hasBorder={hasBorder}
        labelWidth={labelWidth}
        uniHeight={uniHeight}
        {...insetProps}
    >
        {React.createElement(formItemComponent, {
            ...others,
            ...formItemProps,
        })}
    </InsetFormItem>

    return <Layout.Item span={span}>
        {internalFormItem}
    </Layout.Item>
})

const pickupFieldProps = (props) => {
    const ignoreKeys = ['children']
    const commonKeys = ['required']
    const fieldPropsKeys = ['triggerType', 'name', 'value', 'initialValue', 'props', 'rules', 'editable', 'onChange']
    const result = {
        field: {},
        others: {},
    };

    Object.keys(props || {}).forEach(key => {
        if (commonKeys.indexOf(key) !== -1) {
            result.field[key] = props[key]
            result.others[key] = props[key]
        } else if (fieldPropsKeys.indexOf(key) !== -1) {
            result.field[key] = props[key]
        } else {
            if (ignoreKeys.indexOf(key) === -1) {
                result.others[key] = props[key]
            }
        }
    })

    return result;
}

const Item = (props) => {
    const { children } = props
    const { field, others } = pickupFieldProps(props)
    return <FieldProvider name={props.name}>
        {({ mode }) => {
            let element
            if (mode === 'schema') {
                element = <SchemaMarkupField {...props} />
            } else {
                element = <Field {...field}>
                    {(connectProps) => {
                        let element
                        if (typeof children === 'function') {
                            element = children(connectProps)
                        } else {
                            element = React.cloneElement(children || React.Fragment, connectProps)
                        }
                        return <CompatAntdFormItem {...others}>
                            {element}
                        </CompatAntdFormItem>
                    }}
                </Field>
            }
            return element
        }}
    </FieldProvider>    
};

const Filter: any = styled(props => {
    const { mode = 'schema', children, effects, ...others } = props
    return <FilterProvider mode={mode} useForm={useForm} effects={effects}>
        {(connectProps) => {
            const { filterInstance } = connectProps
            return <SchemaForm form={filterInstance} {...others}>
                {children}
            </SchemaForm>
        }}
    </FilterProvider>
})`
    margin-bottom: 16px;

    &.ant-form.ant-form-inline {
        .base-layout-item {
            display: inline-block;
            margin-right: 20px;
            vertical-align: top;
        }
    }
`


Object.assign(Filter, { Item, Reset, Search, Clear })

export default Filter


