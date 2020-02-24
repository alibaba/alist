import React from 'react'
import { Toggle } from '@alist/react'
import { Button } from 'antd'
import styled from 'styled-components'

const unExpandIcon = <svg viewBox="0 0 1024 1024" focusable="false" data-icon="caret-up" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M858.9 689L530.5 308.2c-9.4-10.9-27.5-10.9-37 0L165.1 689c-12.2 14.2-1.2 35 18.5 35h656.8c19.7 0 30.7-20.8 18.5-35z"></path></svg>
const expandIcon = <svg viewBox="0 0 1024 1024" focusable="false" data-icon="caret-down" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z"></path></svg>

const ToggleActionText = styled((props) => {
    return <div className={props.className}>
        <div className="alist-toggle-action-text">{props.children}</div>
    </div>
})`
    display: inline-block;

    .alist-toggle-action-text {
        display: flex;
        align-items: center;
    }
`

const StyledBtn = styled(props => {
    return <Button {...props} />
})`
    &.ant-btn {
        padding: 0;
    }    
`

const ToggleTrigger = (props) => {
    const { id, render, expandText, unExpandText, children, hideIcon, ...others } = props
    return <Toggle id={id}>
        {({ toggle, expandStatus }) => {
            if (typeof render === 'function') {
                return render({ toggle, expandStatus })
            }

            return <StyledBtn type="link" {...others} onClick={toggle}>
                <ToggleActionText>
                    {children}
                    {expandStatus === 'expand' ?  unExpandText : expandText }
                    {hideIcon ? null : (expandStatus === 'expand' ?  unExpandIcon : expandIcon )}
                </ToggleActionText>
            </StyledBtn>
        }}
    </Toggle>
}

export default ToggleTrigger;