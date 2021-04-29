import React, { forwardRef } from 'react'
import { PaginationProvider } from '@alist/react'
import { Pagination as NextPagination } from '@alifd/next'
import { PaginationProps } from '@alifd/next/types/pagination'
import { createVirtualBox } from '@formily/next'
import styled from 'styled-components'

const InternalPagination = styled(forwardRef((props: PaginationProps & { align: string }, ref) => {
	return <PaginationProvider>
		{(connectProps) => {
			const { currentPage, setCurrentPage, setPageSize, totalPages, ...other } = connectProps;
			return <NextPagination ref={ref} current={currentPage} onChange={setCurrentPage} onPageSizeChange={setPageSize} {...other} {...props} />
		}}
	</PaginationProvider>
}))`
	margin: 16px 0;
	text-align: ${props => (props.align || 'right')};
`

const Pagination = createVirtualBox<PaginationProps>('alist-pagination', InternalPagination)

export {
	Pagination,
	InternalPagination,
}