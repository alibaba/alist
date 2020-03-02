import React from 'react'
import styled, { css } from 'styled-components';

const normalizeNumPx = (numpx) => {
    return `${numpx}`.replace('px', '')
}

const InsetFormItem = styled(props => {
    const { full, inset, errors, warnings, children, className, others } = props
    const insetCls = inset ? 'inset-form-item' : ''
    const messages = [].concat(errors || [], warnings || [])
    const help = messages.length ? <span className="inset-form-item-help">{messages[0]}</span> : null
    const errCls = (errors || []).length ? 'has-error' : ''
    const warnCls = (warnings || []).length ? 'has-warning' : ''
    const fullCls = full ? 'base-form-item-full' : ''

    return <div className={`${fullCls} ${insetCls} ${errCls} ${warnCls} ${className}`} {...others}>
        {children}
        {help}
    </div>
})`
    &.has-error {
        .ant-form-item {
            border-color: red;
        }
        .inset-form-item-help {
            color: red;
        }       
    }

    &.has-warning {
        .ant-form-item {
            border-color: #FF6A00;
        }

        .inset-form-item-help {
            color: #FF6A00;
        }
    }

    ${props => props.inset && css`
        .ant-form-item {
            height: 36px;
        }
    `}

    ${props => props.full && css`
        .ant-form-item-control, .ant-input-number,
        .ant-calendar-picker, .ant-time-picker,
        .ant-input, .ant-select-selection {
            width: 100%;
        }
    `}
    
    .ant-form-item {
        display: flex;
        align-items: start;

        ${props => props.hasBorder && css `
            border: 1px solid #D8D8D8;
            border-radius: 4px;
        `}

        ${props => props.labelAlign === 'top' && css `
            flex-direction: column;
            align-items: start;

            .ant-form-item-control-wrapper {
                width: 100%;
            }
        `}

        ${props => props.inset && css `
            flex-direction: row;
            margin-bottom: 0;
            padding-left: 12px;
            align-items: center;

            .ant-form-item-control {
                flex: 1;
            }

            .ant-picker,
            .ant-select-single:not(.ant-select-customize-input) .ant-select-selector,
            .ant-select-selector,
            .ant-picker-input input,
            .ant-input-number,
            .ant-time-picker-input,
            .ant-select-selection,
            .ant-input {
                border: none;
                box-shadow: none;
            }

            .ant-picker {
                width: 100%;
                padding-right: 0;
            }

            .ant-checkbox-group {
                padding-left: 11px;
                padding-left: 0;
            }

            .ant-picker-range {
                display: flex;
                padding-right: 11px;
                .ant-picker-input {
                    flex: 1;
                }
            }

            .ant-picker-input {
                display: flex;
                padding: 0 11px;
                > input {
                    flex: 1;
                }

                .ant-picker-suffix {
                    flex: initial;
                }
            }
        `}

        .ant-form-item-control {
            line-height: 32px;
        }

        ${props => !props.asterisk && css `
            .ant-form-item-required::before {
                content: none;
            }
        `}

        .ant-form-item-label {
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

        .ant-form-item-control-wrapper {
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