import React from 'react'
import {
    FormButtonGroup,
    createVirtualBox,
} from '@formily/next'
import { FormItemGrid, MegaLayout } from '@formily/next-components'
import { compatLayoutProps } from '@alist/react'
import { ILayoutProps } from '..'

let Layout: React.FC<ILayoutProps> & {
    (): any;
    ButtonGroup: any;
    Grid: any;
    Flex: any;
}

const CompatMegaLayout = (props) => {
    const compatProps = compatLayoutProps(props)
    return <MegaLayout {...compatProps} />
}

Layout = (() => {
    const LayoutExport: any = createVirtualBox('filter-flex-layout', CompatMegaLayout)
    LayoutExport.ButtonGroup = FormButtonGroup    
    LayoutExport.Grid = FormItemGrid

    return LayoutExport
})() 


export default Layout


