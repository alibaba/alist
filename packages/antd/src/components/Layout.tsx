import React from 'react'
import {
    FormButtonGroup,
    FormItemGrid,
    createVirtualBox,
} from '@formily/antd'
import { Layout as InternalLayout } from '@alist/react'
import styled from 'styled-components'

let Layout: {
    (): any;
    ButtonGroup: any;
    Grid: any;
    Item: any;
    Flex: any;
}

const StyledLayout = styled((props) => {
    return <InternalLayout gap={props.gap || [16, 24]} {...props} uniHeight={props.uniHeight || '28px'}/>;
})`
    .base-layout-item-columns {
        .ant-form-item {
            margin-bottom: 0;
        }

        .ant-form-item-control {
            width: 100%;
            flex: initial;
        }
    }
    
    .base-layout-item-normal {
        .ant-form-item {
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


