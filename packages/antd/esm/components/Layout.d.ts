import React from 'react';
declare let Layout: React.FC<{
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
};
export default Layout;
