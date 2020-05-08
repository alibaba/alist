import React from 'react';
import { Table } from 'antd';
import { TableProps } from 'antd/lib/table';
declare type AListTable = React.FunctionComponent<TableProps<any> & {
    loopBackground?: boolean;
}> & {
    Column: typeof Table.Column;
    ColumnGroup: typeof Table.ColumnGroup;
};
declare const Component: AListTable;
export default Component;
