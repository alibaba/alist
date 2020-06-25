import React from 'react'
import { PaginationProvider } from '@alist/react'
import { Pagination as NextPagination } from '@alifd/next'
import { createVirtualBox } from '@formily/next'
import styled from 'styled-components'

const InternalPagination = styled(props => {
	return <PaginationProvider>
		{(connectProps) => {
			const { currentPage, setCurrentPage, setPageSize, totalPages, ...other } = connectProps;
			return <NextPagination current={currentPage} onChange={setCurrentPage} onPageSizeChange={setPageSize} {...other} {...props} />
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