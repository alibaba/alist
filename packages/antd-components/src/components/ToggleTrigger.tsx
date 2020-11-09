import React, { forwardRef } from 'react'
import { Toggle } from '@alist/react'
import { Button } from 'antd'
import { createVirtualBox } from '@formily/antd'
import styled, { css } from 'styled-components'

const unExpandIconDefault = <svg viewBox="0 0 1024 1024" focusable="false" data-icon="caret-up" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M858.9 689L530.5 308.2c-9.4-10.9-27.5-10.9-37 0L165.1 689c-12.2 14.2-1.2 35 18.5 35h656.8c19.7 0 30.7-20.8 18.5-35z"></path></svg>
const expandIconDefault = <svg viewBox="0 0 1024 1024" focusable="false" data-icon="caret-down" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z"></path></svg>

const ToggleActionText = styled(forwardRef((props, ref) => {
    return <div className={props.className} ref={ref}>
        <div className="alist-toggle-action-text">{props.children}</div>
    </div>
}))`
    display: inline-block;

    .alist-toggle-action-text {
        display: flex;
        align-items: center;
    }

    ${props => props.color && css`color: ${props.color}` }
    ${props => props.fontSize && css`font-size: ${props.fontSize}` }
`

const StyledBtn = styled(forwardRef((props, ref) => {
    return <Button {...props} ref={ref} />
}))`
    &.ant-btn {
        padding: 0;
    }    
`

const InternalToggleTrigger = (props) => {
    const { id, render,
        expandText, unExpandText,
        unExpandIcon = unExpandIconDefault, expandIcon = expandIconDefault,
        children, hideIcon, color, fontSize, ...others } = props
    return <Toggle id={id}>
        {({ toggle, toggleAll, expandStatus, expandedAllStatus }) => {
            if (typeof render === 'function') {
                return render({ toggle, toggleAll, expandStatus, expandedAllStatus })
            }

            return <StyledBtn type="link" {...others} onClick={id ? toggle : () => {
                toggleAll(expandedAllStatus)
            }}>
                <ToggleActionText color={color} fontSize={fontSize}>
                    {children}
                    {id ? (expandStatus === 'expand' ?  unExpandText : expandText) : null }
                    {!id ? (expandedAllStatus === 'expand' ?  unExpandText : expandText) : null }
                    {hideIcon ? null : (expandStatus === 'expand' ?  unExpandIcon : expandIcon )}
                </ToggleActionText>
            </StyledBtn>
        }}
    </Toggle>
}

const SchemaListToggleTrigger = createVirtualBox('alist-toggle-trigger', InternalToggleTrigger)

export {
    InternalToggleTrigger,
    InternalToggleTrigger as ListToggleTrigger,
    SchemaListToggleTrigger,
}