import React from 'react'
import {
    FormButtonGroup,
    FormItemGrid,
    createVirtualBox,
} from '@formily/next'
import { Layout as InternalLayout } from '@alist/react'
import styled from 'styled-components'

let Layout: React.FC<{
    name?: string;
    visible?: boolean;
    display?: boolean;
    gap?: number[];
    columns?: number;
    full?: boolean;
    label?: any;
    suffix?: any;
    labelAlign?: string;
    labelCol?: any;
    wrapperCol?: any;
    labelWidth?: any;
    mode?: string;
}> & {
    (): any;
    ButtonGroup: any;
    Grid: any;
    Item: any;
    Flex: any;
}

const StyledLayout = styled((props) => {
    return <InternalLayout {...props} gap={props.gap || [16, 16]} uniHeight={props.uniHeight || '28px'} />;
})`
    .base-layout-item-columns {
        .next-form-item {
            margin-bottom: 0;
        }
    }
    
    .base-layout-item-normal {
        .next-form-item {
            margin-bottom: 0;
        }
    }

    .base-layout-label {
        color: #999;
        padding-right: 12px;
    }

    .base-layout-description {
        font-size: 12px;
        line-height: 1.5;
        color: #999999;
    }
`

Layout = (() => {
    const LayoutExport: any = createVirtualBox('filter-flex-layout', StyledLayout)
    LayoutExport.InternalLayout = InternalLayout
    LayoutExport.Item = InternalLayout.Item
    LayoutExport.normalizeGap = InternalLayout.normalizeGap
    LayoutExport.ButtonGroup = FormButtonGroup    
    LayoutExport.Grid = FormItemGrid
    return LayoutExport
})() 


export default Layout


