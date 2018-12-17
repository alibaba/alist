import React from 'react';
import { DataGrid,TableWrapper, Filter, Any, PaginationWrapper } from '../index';

const NextTable = require('@alifd/next/lib/table/index.js');
const NextPagination = require('@alifd/next/lib/pagination/index.js');

const next = {
    Table: NextTable,
    Pagination: NextPagination,
};

const component = {
    Table: (props) => {
        const ListTable = TableWrapper(NextTable);
        return <ListTable isZebra={true} hasBorder={false} {...props} pagination={false} />;
    },
    Pagination: (props) => {
        // 由于antd和nolist的参数基本一致(currentPage, pageSize, total) 因此这里只展示有差异的
        const HOCPagination = (hocProps) => {
            const { currentPage, ...others } = hocProps;
            return <NextPagination current={currentPage} {...others} />;
        };

        const ListPagination = PaginationWrapper(HOCPagination);
        return <ListPagination {...props} />;
    },
};

Object.keys(component).forEach((key) => {
    const nextComponent = next[key];
    Object.keys(nextComponent).forEach((attr) => {
        component[key][attr] = nextComponent[attr];
    });
});

const { Table, Pagination } = component;

export {
    DataGrid as default,
    Table,
    Pagination,
    Filter,
    Any,
};
