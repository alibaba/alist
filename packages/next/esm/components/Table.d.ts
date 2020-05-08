import React from 'react';
import { TableProps } from '@alifd/next/types/table';
import { Table } from '@alifd/next';
declare type AListTable = React.FunctionComponent<TableProps & {
    loopBackground?: boolean;
}> & {
    Column: typeof Table.Column;
    ColumnGroup: typeof Table.ColumnGroup;
    GroupHeader: typeof Table.GroupHeader;
    GroupFooter: typeof Table.GroupFooter;
};
declare const Component: AListTable;
export default Component;
