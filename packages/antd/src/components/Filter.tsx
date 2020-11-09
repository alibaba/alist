import React, { forwardRef } from 'react'
import { FilterProvider, FieldProvider, compatLayoutItemProps } from '@alist/react'
import { InternalField as Field,
    FormItem as CompatAntdFormItem, useForm,
    SchemaForm, SchemaMarkupField, getRegistry, registerFormItemComponent } from '@formily/antd'
import {
    InternalClear as Clear,
    InternalSearch as Search,
    InternalReset as Reset,
} from '@alist/antd-components'
import styled from 'styled-components'

const { formItemComponent } = getRegistry();
registerFormItemComponent((props) => {
    const compatProps = compatLayoutItemProps(props)
    return React.createElement(formItemComponent, compatProps)
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

const Filter: any = styled(forwardRef(((props, ref) => {
    const { mode = 'schema', children, effects, mirror, ...others } = props
    return <FilterProvider mirror={mirror} mode={mode} {...others} useForm={useForm} effects={effects}>
        {(connectProps) => {
            const { filterInstance } = connectProps
            return <SchemaForm form={filterInstance} {...others} ref={ref}>
                {children}
            </SchemaForm>
        }}
    </FilterProvider>
})))`
    margin-bottom: 16px;

    &.ant-form.ant-form-inline {
        .base-layout-item {
            display: inline-block;
            margin-right: 20px;
            vertical-align: top;
        }

        .ant-form-item-control {
            display: inline-block;
            vertical-align: top;
        }

        .ant-form-item {
            .ant-form-item-control {
                line-height: 32px;
            }
        }
    }
`


Object.assign(Filter, { Item, Reset, Search, Clear })

export default Filter


