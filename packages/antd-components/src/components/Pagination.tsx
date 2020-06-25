import React from 'react'
import { PaginationProvider } from '@alist/react'
import { Pagination as AntdPagination } from 'antd'
import { createVirtualBox } from '@formily/antd'
import styled from 'styled-components'

const InternalPagination = styled(props => {
	return <PaginationProvider>
		{(connectProps) => {
			const { currentPage, setCurrentPage, setPageSize, ...other } = connectProps;
			return <AntdPagination current={currentPage} onChange={setCurrentPage} onPageSizeChange={setPageSize} {...other} {...props} />
		}}
	</PaginationProvider>
})`
	margin: 16px 0;
	text-align: ${props => (props.align || 'right')};
`

const Pagination = createVirtualBox('alist-pagination', InternalPagination)

export {
	Pagination,
	InternalPagination,
}