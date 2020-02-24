import React from 'react'
import { PaginationProvider } from '@alist/react'
import { Pagination } from 'antd'
import styled from 'styled-components'

const Component = styled(props => {
	return <PaginationProvider>
		{(connectProps) => {
			const { currentPage, setCurrentPage, setPageSize, ...other } = connectProps;
			return <Pagination current={currentPage} onChange={setCurrentPage} onPageSizeChange={setPageSize} {...other} {...props} />
		}}
	</PaginationProvider>
})`
	margin: 16px 0;
	text-align: ${props => (props.align || 'right')};
`

export default Component;