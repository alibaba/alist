import React from 'react';

declare interface PaginationProps {
    pageSize: Number;
    currentPage: Number;
    total: Number;
    onChange:Function;
}
export default class Pagination extends React.Component<PaginationProps, any> {}
