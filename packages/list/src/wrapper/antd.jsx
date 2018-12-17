import React from 'react';
import AntdTable from 'antd/lib/table';
import AntdPagination from 'antd/lib/pagination';
import { DataGrid, TableWrapper, Filter, Any, PaginationWrapper } from '../index';

const antd = {
    Table: AntdTable,
    Pagination: AntdPagination,
};

const component = {
    Table: (props) => {
        const ListTable = TableWrapper(AntdTable);
        return <ListTable {...props} pagination={false} />;
    },
    Pagination: (props) => {
        // 由于antd和nolist的参数基本一致(currentPage, pageSize, total) 因此这里只展示有差异的
        const HOCPagination = (hocProps) => {
            const { currentPage, ...others } = hocProps;
            return <AntdPagination current={currentPage} {...others} />;
        };

        const ListPagination = PaginationWrapper(HOCPagination);
        return <ListPagination {...props} />;
    },
};

Object.keys(component).forEach((key) => {
    const antdComponent = antd[key];
    Object.keys(antdComponent).forEach((attr) => {
        component[key][attr] = antdComponent[attr];
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
