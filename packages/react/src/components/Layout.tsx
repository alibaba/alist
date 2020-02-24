import React from 'react'
import styled, { css } from 'styled-components'
import LayoutContext from '../context/layoutContext'
import { normalizeNumPx, isValidNumber } from '../utils';

const defaultGap = 16
const defualtColumns = 3
const defaultSpan = 1

const normalizeGap = (gap, inline) => {
    const defaultVerGap = (inline ? 0 : defaultGap)
    if (Array.isArray(gap)) {
        const [horizontalGap = defaultGap, verticalGap = defaultVerGap] = gap
        return {
            horizontalGap, verticalGap
        }
    }

    return {
        horizontalGap: gap || defaultGap,
        verticalGap: defaultVerGap,
    }
}

const ContextBaseLayout = (props) => {
    let inline = props.inline;
    if (props.mode === 'columns') {
        inline = true;
    }

    return <LayoutContext.Consumer>
        {(contextProps) => {
            const { uniHeight, verticalGap, horizontalGap, labelWidth, wrapperWidth, labelCol, wrapperCol, ...others } = contextProps
            return <BaseLayout
                {...others}
                layoutProps={{
                    uniHeight,
                    labelWidth, wrapperWidth,
                    labelCol, wrapperCol,
                    verticalGap, horizontalGap
                }}
                {...props}                
                inline={inline}
            />
        }}
    </LayoutContext.Consumer>
}

const BaseLayout = styled(props => {
    const {
        mode,
        title,
        inline,
        labelAlign,
        full,
        flex,
        labelCol, wrapperCol,
        description, suffix,
        labelWidth, wrapperWidth, inset, gap, columns = defualtColumns, className, children, style, uniHeight
    } = props

    const { verticalGap, horizontalGap } = normalizeGap(gap, inline);
	return <LayoutContext.Provider value={{
        mode,
        labelCol, wrapperCol, flex,
        full, labelAlign, labelWidth, wrapperWidth,
        verticalGap, horizontalGap, columns, inset, uniHeight
    }}>
        <div className={`base-layout-wrapper ${className}`} style={style}>
            {title ? <div className="base-layout-label">{title}</div> : null }
            <div className="base-layout-content">
                {children}
                {description ? <div className="base-layout-description">{description}</div> : null}
            </div>
            {suffix ? <div className="base-layout-suffix">{suffix}</div> : null}
        </div>
    </LayoutContext.Provider>
})`
    width: 100%;
    display: flex;
    
    ${props => isValidNumber(props.layoutProps.horizontalGap) && css`
        padding-left: ${props => Number(props.layoutProps.horizontalGap / 2)}px;
        padding-right: ${props => Number(props.layoutProps.horizontalGap / 2)}px;
    `}

    ${props => isValidNumber(props.layoutProps.verticalGap) && css`
        padding-top: ${props => Number(props.layoutProps.verticalGap / 2)}px;
        padding-bottom: ${props => Number(props.layoutProps.verticalGap / 2)}px;
    `}

    .base-layout-description {
        flex: 0 0 100%;
        ${props => isValidNumber(props.layoutProps.verticalGap) && css`
            padding-top: -${props => Number(props.layoutProps.verticalGap / 2)}px;
            padding-bottom: ${props => Number(props.layoutProps.verticalGap / 2)}px;
        `}
    }

    .base-layout-suffix {
        padding-left: ${props => Number(props.layoutProps.horizontalGap)}px;
    }

    .base-layout-label {
        flex: initial;
        text-align: right;

        ${props => isValidNumber(props.layoutProps.labelCol) && css`
            width: ${normalizeNumPx(((Number(props.layoutProps.labelCol) / 24) * 100).toFixed(2))}%;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        `};

        ${props => isValidNumber(props.layoutProps.labelWidth) && css`
            width: ${normalizeNumPx(props.layoutProps.labelWidth)}px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        `};

        line-height: ${props => props.layoutProps.uniHeight}px;
        ${props => isValidNumber(props.layoutProps.uniHeight) && css`
            line-height: ${props => normalizeNumPx(props.layoutProps.uniHeight)}px;
        `};
    }    

    .base-layout-content {
        flex: 1;
        display: flex;
        flex-direction: ${props => props.inline ? 'row' : 'column'};
        flex-wrap: wrap;
        margin-left: -${props => Number(normalizeGap(props.gap, props.inline).horizontalGap / 2)}px;
        margin-right: -${props => Number(normalizeGap(props.gap, props.inline).horizontalGap / 2)}px;
        margin-top: -${props => Number(normalizeGap(props.gap, props.inline).verticalGap / 2)}px;
        margin-bottom: ${props => Number(normalizeGap(props.gap, props.inline).verticalGap / 2)}px;

        .base-layout-content {
            margin-bottom: 0;
        }

        .base-layout-wrapper {
            padding-bottom: 0;
        }
    }
`

const Layout = (props) => {
    const { inline = true, full = false, flex = true, inset = false, ...others } = props
    const finalFull = inset ? true : full
    return <ContextBaseLayout
        {...others}
        inset={inset}
        mode={props.mode || 'columns'}
        labelAlign={props.labelAlign || 'top'}
        inline={inline}
        full={finalFull}
        flex={flex}
    />
}

const Item = (props) => {
    return <LayoutContext.Consumer>
        {(contextProps) => <InternalItem {...contextProps} {...props} />}
    </LayoutContext.Consumer>
}

const InternalItem = styled(props => {
    const { span = defaultSpan, className, children, style, mode } = props
    const modeCls = mode ?`base-layout-item-${mode}` : ''
	return <div className={`base-layout-item ${className} ${modeCls}`} style={style} data-span={span}>
        {children}
    </div>
})`    
    ${props => (props.mode === 'normal' && props.flex) && css`
        flex: ${props => props.span ? Number(props.span) : 1};
    `}

    ${props => isValidNumber(props.horizontalGap) && css`
        padding-left: ${props => Number(props.horizontalGap / 2)}px;
        padding-right: ${props => Number(props.horizontalGap / 2)}px;
    `}

    ${props => isValidNumber(props.verticalGap) && css`
        padding-top: ${props => Number(props.verticalGap / 2)}px;
        padding-bottom: ${props => Number(props.verticalGap / 2)}px;
    `}

    ${props => props.mode === 'columns' && css`
        display: inline-block;
        width: ${props => (Number(props.span || defaultSpan) * (Number((1 / Number(props.columns)).toFixed(2)) * 100))}%;
        max-width: ${props => (Number(props.span || defaultSpan) * (Number((1 / Number(props.columns)).toFixed(2)) * 100))}%;
        flex: 0 0 ${props => (Number(props.span || defaultSpan) * (Number((1 / Number(props.columns)).toFixed(2)) * 100))}%;
    `}
`

Object.assign(Layout, {
    Item,
    normalizeGap,
    BaseLayout,
})

export default Layout;
