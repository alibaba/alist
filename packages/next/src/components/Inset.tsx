import React from 'react'
import styled, { css } from 'styled-components';

const normalizeNumPx = (numpx) => {
    return `${numpx}`.replace('px', '')
}

const InsetFormItem = styled(props => {
    const { inset, errors, warnings, children, className, others } = props
    const insetCls = inset ? 'inset-form-item' : ''
    const messages = [].concat(errors || [], warnings || [])
    const help = messages.length ? <span className="inset-form-item-help">{messages[0]}</span> : null
    const errCls = (errors || []).length ? 'has-error' : ''
    const warnCls = (warnings || []).length ? 'has-warning' : ''

    return <div className={`${insetCls} ${errCls} ${warnCls} ${className}`} {...others}>
        {children}
        {help}
    </div>
})`
    &.has-error {
        .next-form-item {
            border-color: red;
        }
        .inset-form-item-help {
            color: red;
        }       
    }

    &.has-warning {
        .next-form-item {
            border-color: #FF6A00;
        }

        .inset-form-item-help {
            color: #FF6A00;
        }
    }

    ${props => (props.asterisk === false) && css `
        .next-form-item-label label[required]:before {
            content: none;
        }
    `}

    ${props => props.inset && css`
        .next-range-picker-trigger,
        .next-input {
            border: none;
        }

        .next-form-item {
            height: 36px;
        }
    `}

    ${props => props.full && css`
        .next-date-picker, .next-time-picker, .next-year-picker,
        .next-range-picker, .next-number-picker,
        .next-number-picker.next-number-picker-normal,
        .next-input, .next-select {
            width: 100%;
        }
    `}

    .next-form-item {
        display: flex;        
        align-items: start;

        ${props => props.hasBorder && css `
            border: 1px solid #D8D8D8;
            border-radius: 4px;
        `}

        ${props => props.labelAlign === 'top' && css `
            flex-direction: column;
            align-items: start;

            .next-form-item-control {
                width: 100%;
            }
        `}

        ${props => props.inset && css `
            flex-direction: row;
            margin-bottom: 0;
            padding-left: 12px;
            align-items: center;
        `}

        .next-rating-base,
        .next-radio-wrapper,
        .next-checkbox-wrapper {
            height: ${props => normalizeNumPx(props.uniHeight)}px;
        }

        .next-range-picker-trigger-separator,
        .next-range-picker-panel-input-separator {
            line-height: 28px;
        }

        .next-input {
            input {
                height: ${props => normalizeNumPx(props.uniHeight)}px;
                line-height: ${props => normalizeNumPx(props.uniHeight)}px;
            }
        }

        .next-range-picker-trigger {
            display: flex;
        }

        .next-form-item-label {
            flex: initial;

            ${props => props.labelCol && css`
                width: ${normalizeNumPx(((Number(props.labelCol) / 24) * 100).toFixed(2))}%;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            `}

            ${props => props.labelWidth && css`
                width: ${normalizeNumPx(props.labelWidth)}px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            `};

            label {
                color: #999;
            }

            ${props => props.uniHeight && css`
                line-height: ${props => normalizeNumPx(props.uniHeight)}px;
            `}
        }

        .next-form-item-control {
            ${props => (!props.wrapperCol && !props.wrapperWidth) && css`
                flex: 1;
            `}
            display: flex;
            align-items: start;
            flex-direction: column;

            ${props => props.wrapperCol && css`
                width: ${normalizeNumPx(((Number(props.wrapperCol) / 24) * 100).toFixed(2))}%;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            `}

            ${props => props.wrapperWidth && css`
                width: ${normalizeNumPx(props.wrapperWidth)}px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            `};
        }
    }
`

export default InsetFormItem